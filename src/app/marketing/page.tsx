'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useGlobal, Customer } from '@/context/GlobalContext';
import Link from 'next/link';
import { io, Socket } from 'socket.io-client';

export default function MarketingPage() {
  const { customers, whatsappConnected, companyInfo, updateCustomerTags, leads, upcomingDates } = useGlobal();
  
  const [activeTab, setActiveTab] = useState<'manual' | 'dates' | 'drip_status'>('manual');
  
  const [template, setTemplate] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [dailyLimit, setDailyLimit] = useState<number>(50);
  const [campaignName, setCampaignName] = useState('Minha Campanha');
  
  // Filtros
  const [filterType, setFilterType] = useState<'Todos' | 'PF' | 'PJ'>('Todos');
  const [filterTag, setFilterTag] = useState<string>('');
  
  const [targetCustomers, setTargetCustomers] = useState<Customer[]>([]);
  
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  const [dripCampaigns, setDripCampaigns] = useState<any[]>([]);
  
  const [selectedCustomerForTag, setSelectedCustomerForTag] = useState<Customer | null>(null);
  const [newTagInput, setNewTagInput] = useState('');
  
  const [liveHistory, setLiveHistory] = useState<{text: string, sender: string}[] | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extrair todas as tags únicas dos clientes para o select de filtro
  const allAvailableTags = Array.from(new Set(customers.flatMap(c => c.tags || [])));

  // Conectar ao Socket
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040');
    setSocket(newSocket);

    newSocket.on('campaign_progress', (data: any) => {
      if (data.status === 'started') {
        setIsSending(true);
        setProgress(0);
        setLogs([`[${new Date().toLocaleTimeString()}] ${data.message}`]);
      } else if (data.status === 'progress') {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${data.message}`, ...prev]);
        if (data.current !== undefined && data.total !== undefined) {
          setProgress(Math.round((data.current / data.total) * 100));
        }
      } else if (data.status === 'finished' || data.status === 'error') {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${data.message}`, ...prev]);
        setProgress(100);
        setTimeout(() => setIsSending(false), 3000);
      }
    });

    newSocket.on('chat_history_result', (data: any) => {
      setLiveHistory(data.history);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Lógica de Filtro Dinâmico
  useEffect(() => {
    let filtered = [...customers];
    
    if (filterType !== 'Todos') {
      filtered = filtered.filter(c => c.type === filterType);
    }
    
    if (filterTag) {
      filtered = filtered.filter(c => c.tags && c.tags.includes(filterTag));
    }
    
    setTargetCustomers(filtered);
    setSelectedIds(new Set(filtered.map(c => c.id)));
  }, [filterType, filterTag, customers]);

  // Buscar campanhas graduais quando aba for selecionada
  useEffect(() => {
    if (activeTab === 'drip_status') {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040';
      fetch(`${baseUrl}/campaigns/1`)
        .then(r => r.json())
        .then(data => setDripCampaigns(data))
        .catch(err => console.error('Erro ao buscar campanhas', err));
    }
  }, [activeTab]);

  // Buscar histórico quando selecionar cliente
  useEffect(() => {
    if (selectedCustomerForTag && socket && whatsappConnected) {
      setLiveHistory(null);
      socket.emit('fetch_chat_history', { phone: selectedCustomerForTag.phone });
    } else {
      setLiveHistory(null);
    }
  }, [selectedCustomerForTag, socket, whatsappConnected]);

  const handleDisparar = async () => {
    const finalRecipients = targetCustomers.filter(c => selectedIds.has(c.id));
    if (finalRecipients.length === 0) return;
    
    setIsSending(true);
    setProgress(0);
    setLogs(['Criando Campanha Gradual no Servidor...']);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040';
      // 1. Criar Campanha
      const campRes = await fetch(`${baseUrl}/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: campaignName,
          channel: 'WHATSAPP',
          dailyLimit: dailyLimit,
          messageTemplate: template,
          imageBase64: images.length > 0 ? (images.length === 1 ? images[0] : JSON.stringify(images)) : null,
          tenantId: '1' // Simulando tenant autenticado
        })
      });
      const campaign = await campRes.json();

      setLogs(prev => [...prev, 'Adicionando clientes à fila...']);
      // 2. Adicionar Alvos
      await fetch(`${baseUrl}/campaigns/${campaign.id}/targets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targets: finalRecipients.map(c => ({
            customerId: c.id,
            phone: c.phone,
            name: c.name
          }))
        })
      });

      setLogs(prev => [...prev, 'Iniciando agendamento (Cron Job) da campanha...']);
      // 3. Iniciar Campanha
      await fetch(`${baseUrl}/campaigns/${campaign.id}/start`, {
        method: 'PATCH'
      });

      setLogs(prev => [...prev, `Campanha "${campaignName}" criada com sucesso! O robô enviará ${dailyLimit} msgs por dia.`]);
      setProgress(100);
      
      setTimeout(() => {
        setIsSending(false);
        setActiveTab('drip_status');
      }, 3000);
    } catch (err) {
      setLogs(prev => [...prev, 'Erro ao criar campanha.']);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
      // Clear input so user can add more of the same file if they wanted to (though rare)
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddTagToCustomer = () => {
    if (newTagInput.trim() && selectedCustomerForTag) {
      const currentTags = selectedCustomerForTag.tags || [];
      if (!currentTags.includes(newTagInput.trim())) {
        updateCustomerTags(selectedCustomerForTag.id, [...currentTags, newTagInput.trim()]);
        // Update local state to reflect immediately in the modal
        setSelectedCustomerForTag({...selectedCustomerForTag, tags: [...currentTags, newTagInput.trim()]});
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (selectedCustomerForTag) {
      const newTags = (selectedCustomerForTag.tags || []).filter(t => t !== tagToRemove);
      updateCustomerTags(selectedCustomerForTag.id, newTags);
      setSelectedCustomerForTag({...selectedCustomerForTag, tags: newTags});
    }
  };

  if (!whatsappConnected) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-50">
        <div className="w-24 h-24 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner animate-pulse">
          💬
        </div>
        <h2 className="text-3xl font-light text-slate-800 mb-3">WhatsApp Desconectado</h2>
        <p className="text-slate-500 max-w-md text-center mb-8">
          Para enviar campanhas de marketing automáticas (Headless), você precisa conectar o seu aparelho através do nosso pareamento de QR Code.
        </p>
        <Link href="/settings" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all">
          Ir para Configurações de Conexão
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 md:py-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <span>📣</span> CRM & Marketing
          </h1>
          <p className="text-slate-500 text-sm mt-1">Envie campanhas automatizadas via WhatsApp Oficial</p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap bg-slate-100 rounded-lg p-1 w-full md:w-auto overflow-x-auto">
          <button 
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${activeTab === 'manual' ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Nova Campanha
          </button>
          <button 
            onClick={() => setActiveTab('drip_status')}
            className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${activeTab === 'drip_status' ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Acompanhar Envios
          </button>
          <button 
            onClick={() => setActiveTab('dates')}
            className={`px-6 py-2 rounded-md font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'dates' ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Datas Comemorativas <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{upcomingDates?.length || 0}</span>
          </button>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-200 text-sm font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          WhatsApp Sincronizado
        </div>
      </header>

      <div className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Audiences */}
        <div className="w-full md:w-80 bg-white border-b md:border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-800">Filtro de Público</h3>
            <p className="text-xs text-slate-500 mt-1">Selecione quem receberá a campanha</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tipo de Cliente</label>
              <select 
                value={filterType} 
                onChange={e => setFilterType(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 text-sm"
              >
                <option value="Todos">Todos (PF e PJ)</option>
                <option value="PF">Pessoas Físicas (PF)</option>
                <option value="PJ">Empresas (PJ)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Filtrar por Tag / Interesse</label>
              <select 
                value={filterTag} 
                onChange={e => setFilterTag(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 text-sm"
              >
                <option value="">Todas as Tags</option>
                {allAvailableTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-2">Dica: Você pode adicionar tags aos clientes clicando neles na lista ao lado.</p>
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'dates' ? (
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-800">Calendário Inteligente</h2>
                  <p className="text-slate-500">Datas comemorativas locais e nacionais baseadas no endereço da empresa: <b>{companyInfo?.address}</b></p>
                </div>
                
                {(!upcomingDates || upcomingDates.length === 0) ? (
                  <div className="bg-white rounded-xl p-10 text-center border border-slate-200 shadow-sm">
                    <span className="text-4xl block mb-3">📅</span>
                    <h3 className="text-lg font-bold text-slate-700">Buscando datas...</h3>
                    <p className="text-slate-500 text-sm mt-2">O nosso motor de IA está pesquisando feriados municipais, estaduais e datas comemorativas gerais...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingDates.map((dateObj, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 hover:border-blue-400 p-5 rounded-xl shadow-sm transition-all hover:shadow-md cursor-pointer group"
                        onClick={() => {
                          setTemplate(`Olá! Está chegando o ${dateObj.name} e preparamos uma oferta especial de higienização para você! Confira...`);
                          setActiveTab('manual');
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${dateObj.type === 'Municipal' ? 'bg-purple-100 text-purple-700' : dateObj.type === 'Estadual' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                            Feriado {dateObj.type}
                          </span>
                          <span className="text-sm font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{dateObj.date}</span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">{dateObj.name}</h3>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">Aproveite esta data para criar promoções temáticas para seus clientes no WhatsApp.</p>
                        <div className="text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <span>Criar Campanha</span> <span className="text-lg">→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'drip_status' ? (
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 mb-1">Monitor de Campanhas Graduais</h2>
                      <p className="text-sm text-slate-500">Acompanhe as campanhas que o robô está enviando silenciosamente.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040';
                        fetch(`${baseUrl}/campaigns/1`).then(r => r.json()).then(setDripCampaigns);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-lg transition-colors"
                    >
                      🔄 Atualizar
                    </button>
                  </div>
                  
                  {dripCampaigns.length === 0 ? (
                    <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-xl">
                      <span className="text-4xl block mb-3">🤖</span>
                      <h3 className="text-lg font-bold text-slate-700">Sistema Drip Engine Ativo</h3>
                      <p className="text-slate-500 text-sm mt-2">Nenhuma campanha em andamento no momento.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dripCampaigns.map(camp => {
                        const total = camp._count.targets;
                        const sent = camp.targets.length;
                        const progressPct = total > 0 ? Math.round((sent / total) * 100) : 0;
                        
                        return (
                          <div key={camp.id} className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors bg-white">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-bold text-lg text-slate-800">{camp.name}</h3>
                                <p className="text-xs text-slate-500 font-mono mt-1">
                                  Limite: {camp.dailyLimit} msgs/dia • Canal: {camp.channel}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {camp.status === 'ACTIVE' && (
                                  <button 
                                    onClick={async () => {
                                      if(confirm('Tem certeza que deseja pausar esta campanha? O robô irá parar de enviar mensagens.')) {
                                        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040';
                                        await fetch(`${baseUrl}/campaigns/${camp.id}/pause`, { method: 'PATCH' });
                                        // Atualiza a lista
                                        fetch(`${baseUrl}/campaigns/1`).then(r => r.json()).then(setDripCampaigns);
                                      }
                                    }}
                                    className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-bold rounded cursor-pointer uppercase transition-colors"
                                  >
                                    Pausar
                                  </button>
                                )}
                                {camp.status === 'PAUSED' && (
                                  <button 
                                    onClick={async () => {
                                      if(confirm('Tem certeza que deseja retomar esta campanha? O robô voltará a enviar mensagens de onde parou.')) {
                                        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040';
                                        await fetch(`${baseUrl}/campaigns/${camp.id}/start`, { method: 'PATCH' });
                                        // Atualiza a lista
                                        fetch(`${baseUrl}/campaigns/1`).then(r => r.json()).then(setDripCampaigns);
                                      }
                                    }}
                                    className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-[10px] font-bold rounded cursor-pointer uppercase transition-colors"
                                  >
                                    Retomar
                                  </button>
                                )}
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${camp.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : camp.status === 'PAUSED' ? 'bg-amber-100 text-amber-700' : camp.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                  {camp.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                <span>Progresso Geral</span>
                                <span>{sent} / {total} enviadas ({progressPct}%)</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                                <div className="bg-blue-500 h-2 transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Target List Summary */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800">Público Alvo da Campanha</h3>
                    <p className="text-xs text-slate-500">Desmarque quem você não quer que receba a mensagem</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedIds(new Set(targetCustomers.map(c => c.id)))} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider">Marcar Todos</button>
                    <span className="text-slate-300">|</span>
                    <button onClick={() => setSelectedIds(new Set())} className="text-[11px] font-bold text-rose-500 hover:text-rose-700 uppercase tracking-wider">Desmarcar Todos</button>
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm ml-2">
                      {selectedIds.size} selecionados
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 bg-slate-50 rounded-lg border border-slate-100">
                  {targetCustomers.length === 0 && (
                     <span className="text-slate-400 text-sm p-2 w-full text-center">Nenhum cliente encontrado com estes filtros.</span>
                  )}
                  {targetCustomers.map(c => (
                    <div 
                      key={c.id}
                      className={`border px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer ${selectedIds.has(c.id) ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-sm' : 'bg-white border-slate-200 text-slate-400 opacity-60 hover:opacity-100'}`}
                      onClick={() => {
                        const next = new Set(selectedIds);
                        if (next.has(c.id)) next.delete(c.id);
                        else next.add(c.id);
                        setSelectedIds(next);
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedIds.has(c.id)} 
                        readOnly 
                        className="pointer-events-none accent-blue-600 w-3 h-3" 
                      />
                      <span className="text-xs font-semibold whitespace-nowrap">{c.name.split(' ')[0]}</span>
                      {c.tags && c.tags.length > 0 && (
                         <span className={`text-[9px] px-1.5 rounded font-bold ${selectedIds.has(c.id) ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-500'}`}>{c.tags.length} tags</span>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedCustomerForTag(c); }} 
                        className="text-slate-400 hover:text-blue-600 text-xs ml-1 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm" 
                        title="Ver Perfil/Histórico"
                      >
                        👁️
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Composer */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col relative">
                {isSending && (
                  <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Disparando Mensagens...</h3>
                    <div className="w-full max-w-md bg-slate-200 rounded-full h-4 mb-4 overflow-hidden">
                      <div className="bg-emerald-500 h-4 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="font-bold text-slate-600 mb-6">{progress}% Concluído</p>
                    <div className="w-full max-w-xl h-48 bg-slate-900 rounded text-left p-4 overflow-y-auto text-[11px] font-mono text-emerald-400 space-y-1.5 shadow-inner">
                      {logs.map((l, i) => (
                        <div key={i}>{l}</div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
                  <div className="flex-1 pr-6">
                    <h3 className="font-bold text-slate-800 mb-1">Configuração da Campanha (Drip Engine)</h3>
                    <p className="text-sm text-slate-500 mb-4">O robô enviará as mensagens aos poucos todos os dias para evitar bloqueios.</p>
                    
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-600 mb-1">Nome da Campanha</label>
                        <input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} className="w-full text-sm p-2 border border-slate-300 rounded focus:border-blue-500 outline-none" />
                      </div>
                      <div className="w-32">
                        <label className="block text-xs font-bold text-slate-600 mb-1">Limite/Dia</label>
                        <input type="number" min="1" max="500" value={dailyLimit} onChange={e => setDailyLimit(Number(e.target.value))} className="w-full text-sm p-2 border border-slate-300 rounded focus:border-blue-500 outline-none" />
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      <button onClick={() => setTemplate(prev => prev + '{nome}')} className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded hover:border-blue-500 text-slate-600 font-medium">{'{nome}'}</button>
                      <button onClick={() => setTemplate(prev => prev + '{empresa}')} className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded hover:border-blue-500 text-slate-600 font-medium">{'{empresa}'}</button>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mensagem (Com Variáveis)</label>
                      <div className="flex gap-2">
                        <button onClick={async () => {
                          if (!template) return alert('Digite uma mensagem primeiro para a IA humanizar.');
                          const btn = document.getElementById('btn-spintax');
                          if (btn) btn.innerHTML = '✨ Processando...';
                          try {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040'}/campaigns/spintaxify`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ text: template })
                            });
                            const data = await res.json();
                            if (data.spintax) setTemplate(data.spintax);
                          } catch (err) {
                            alert('Erro ao conectar com a Inteligência Artificial.');
                          }
                          if (btn) btn.innerHTML = '✨ IA: Blindar Mensagem';
                        }} id="btn-spintax" className="text-xs bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded hover:bg-indigo-100 hover:border-indigo-500 text-indigo-700 font-bold transition-all">✨ IA: Blindar Mensagem</button>
                        
                        <button onClick={() => setTemplate(prev => prev + '{Olá|Oi|Bom dia}')} className="text-xs bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded hover:border-emerald-500 text-emerald-700 font-bold">Adicionar Spintax</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Upload Area */}
                  <div className="flex gap-2 flex-wrap items-end">
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                    
                    {images.map((imgBase64, index) => (
                      <div key={index} className="relative group">
                        <img src={imgBase64} alt={`Upload ${index}`} className="w-24 h-24 object-cover rounded-lg border-2 border-blue-500 shadow-sm" />
                        <button 
                          onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md hover:scale-110"
                        >×</button>
                      </div>
                    ))}

                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-500 w-24 h-24 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors shrink-0"
                    >
                      <span className="text-2xl">+</span>
                      <span className="text-[10px] font-bold text-center leading-tight">Múltiplas<br/>Imagens</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <textarea 
                    value={template}
                    onChange={e => setTemplate(e.target.value)}
                    className="w-full h-48 border border-slate-300 rounded-xl p-4 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none font-sans"
                    placeholder="Digite a mensagem de texto aqui..."
                  ></textarea>
                </div>
                
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <button 
                    onClick={handleDisparar}
                    disabled={selectedIds.size === 0 || (!template.trim() && images.length === 0) || isSending}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span className="text-xl">🚀</span>
                    Disparar Campanha via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Modal de Perfil e Histórico para Tags */}
      {selectedCustomerForTag && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl flex flex-col w-[500px] max-w-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-xl font-black text-slate-800">{selectedCustomerForTag.name}</h3>
                <p className="text-slate-500 text-sm font-mono">{selectedCustomerForTag.phone}</p>
              </div>
              <button onClick={() => setSelectedCustomerForTag(null)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
            </div>
            
            <div className="p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Histórico Real (Sincronizado do Celular)</h4>
              <div className="bg-slate-100 border border-slate-200 rounded-lg h-64 overflow-y-auto p-4 mb-6 space-y-3 shadow-inner">
                {(() => {
                  if (!whatsappConnected) {
                     return <p className="text-sm text-slate-500 italic text-center mt-10">Conecte o WhatsApp para sincronizar o histórico.</p>;
                  }
                  if (liveHistory === null) {
                     return (
                        <div className="flex flex-col items-center justify-center h-full opacity-50">
                          <div className="w-8 h-8 border-4 border-slate-300 border-t-emerald-500 rounded-full animate-spin mb-2"></div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Baixando do Celular...</p>
                        </div>
                     );
                  }
                  if (liveHistory.length === 0) {
                    return <p className="text-sm text-slate-500 italic text-center mt-10">Nenhuma mensagem anterior encontrada neste WhatsApp.</p>;
                  }
                  return liveHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'agent' ? 'bg-[#d9fdd3] text-slate-800' : 'bg-white border border-slate-200 text-slate-700'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ));
                })()}
              </div>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tags do Cliente</h4>
              <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                {(!selectedCustomerForTag.tags || selectedCustomerForTag.tags.length === 0) && (
                  <span className="text-sm text-slate-400 italic">Nenhuma tag cadastrada.</span>
                )}
                {selectedCustomerForTag.tags?.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-rose-500 font-bold">×</button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newTagInput}
                  onChange={e => setNewTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddTagToCustomer()}
                  placeholder="Nova tag (ex: Tapete, Rico)" 
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
                <button onClick={handleAddTagToCustomer} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
