'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useGlobal, Lead, ChatMessage } from '@/context/GlobalContext';
import { io, Socket } from 'socket.io-client';

export default function AtendimentoPage() {
  const { 
    leads, 
    currentUser, 
    whatsappConnected, 
    companyInfo,
    lavaMindConfig,
    catalogItems,
    assumeChat, 
    finishChat, 
    addChatMessage,
    clearUnreadCount,
    wipeAllLeads
  } = useGlobal();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeTab, setActiveTab] = useState<'aguardando' | 'meus'>('aguardando');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040');
    setSocket(newSocket);
    return () => { newSocket.close(); };
  }, []);

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedLead?.messages]);

  // Limpar contador de não lidos ao abrir o chat
  useEffect(() => {
    if (selectedLeadId && selectedLead && (selectedLead.unreadCount || 0) > 0) {
      clearUnreadCount(selectedLeadId);
    }
  }, [selectedLeadId, selectedLead?.unreadCount, clearUnreadCount]);

  const waitingLeads = leads.filter(l => l.status === 'Atendimento' && !l.assignedTo);
  const myLeads = leads.filter(l => l.status === 'Atendimento' && l.assignedTo === currentUser?.id);

  const handleAssume = (leadId: string) => {
    if (!currentUser) return;
    assumeChat(leadId, currentUser.id);
    setSelectedLeadId(leadId);
    setActiveTab('meus');
  };

  const handleFinish = (leadId: string) => {
    finishChat(leadId);
    if (selectedLeadId === leadId) setSelectedLeadId(null);
  };

  const handleSendReply = () => {
    if (!socket || !selectedLead || !replyText.trim() || !currentUser) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: replyText,
      sender: 'agent',
      agentName: currentUser.name,
      date: new Date().toLocaleTimeString('pt-BR')
    };

    // 1. Atualiza o contexto imediatamente
    addChatMessage(selectedLead.id, newMsg);
    
    // 2. Envia para o backend (que enviará pro WhatsApp Oficial)
    socket.emit('send_chat_reply', {
      phone: selectedLead.phone,
      text: replyText,
      agentName: currentUser.name,
      companyName: companyInfo.name
    });

    setReplyText('');
  };

  const handleGenerateAI = () => {
    if (!selectedLead || isGenerating) return;
    
    setIsGenerating(true);
    
    // Simular o tempo de processamento da "IA"
    setTimeout(() => {
      const clientMessages = selectedLead.messages?.filter(m => m.sender === 'client') || [];
      const lastClientText = clientMessages.length > 0 ? clientMessages[clientMessages.length - 1].text.toLowerCase() : '';
      
      // Heurística de Busca no Catálogo
      const mentionedItems = catalogItems.filter(item => 
        lastClientText.includes(item.name.toLowerCase().split(' ')[0]) || 
        lastClientText.includes(item.cat.toLowerCase())
      );

      let generatedResponse = '';
      const isInformal = lavaMindConfig.tone.includes('Descontraído');
      const isFormal = lavaMindConfig.tone.includes('Formal');

      // Saudação baseada no tom
      if (isInformal) {
        generatedResponse = `Oi ${selectedLead.name.split(' ')[0]}! Tudo joia? ✨\n\n`;
      } else if (isFormal) {
        generatedResponse = `Prezado(a) ${selectedLead.name}, olá.\n\n`;
      } else {
        generatedResponse = `Olá ${selectedLead.name.split(' ')[0]}, tudo bem?\n\n`;
      }

      // Corpo da mensagem baseado no contexto
      if (mentionedItems.length > 0) {
        const item = mentionedItems[0];
        if (isInformal) {
          generatedResponse += `Vi que você perguntou sobre ${item.name}! O valor atual é de apenas R$ ${item.price.toFixed(2)} por ${item.unit}. Bora agendar a coleta? 🚚💨`;
        } else if (isFormal) {
          generatedResponse += `Informamos que o serviço de lavagem para ${item.name} possui o custo de R$ ${item.price.toFixed(2)} por ${item.unit}. Deseja prosseguir com o agendamento?`;
        } else {
          generatedResponse += `O valor para ${item.name} é R$ ${item.price.toFixed(2)} por ${item.unit}. Posso ajudar a agendar?`;
        }
      } else {
        if (isInformal) {
          generatedResponse += `Aqui é da ${companyInfo.name}! Como posso te ajudar hoje com suas roupas ou estofados? 😊`;
        } else if (isFormal) {
          generatedResponse += `Bem-vindo(a) ao atendimento da ${companyInfo.name}. Como podemos ser úteis hoje?`;
        } else {
          generatedResponse += `Como posso ajudar você com os serviços da ${companyInfo.name} hoje?`;
        }
      }

      setReplyText(generatedResponse);
      setIsGenerating(false);
    }, 1500);
  };

  if (!currentUser) {
    return <div className="p-8 text-center text-slate-500">Faça login para acessar o Atendimento.</div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-8 py-6 shrink-0 flex justify-between items-center z-10 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <span>🎧</span> Central de Atendimento
          </h1>
          <p className="text-slate-500 text-sm mt-1">Responda seus clientes em tempo real</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (window.confirm('Tem certeza que deseja apagar permanentemente todos os atendimentos? Esta ação não pode ser desfeita.')) {
                wipeAllLeads();
                setSelectedLeadId(null);
              }
            }}
            className="bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
            title="Limpar todos os atendimentos"
          >
            <span>🗑️</span> Zerar Fila
          </button>
          <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            👤 Operador: {currentUser.name}
          </div>
          {!whatsappConnected && (
            <div className="bg-rose-100 text-rose-700 px-4 py-2 rounded-full border border-rose-200 text-xs font-bold animate-pulse">
              WhatsApp Desconectado!
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        {/* Painel Lateral (Filas) */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="flex p-4 gap-2 border-b border-slate-100 bg-slate-50">
            <button 
              onClick={() => setActiveTab('aguardando')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all relative ${activeTab === 'aguardando' ? 'bg-white shadow border border-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-200/50'}`}
            >
              Aguardando
              {waitingLeads.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {waitingLeads.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('meus')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all relative ${activeTab === 'meus' ? 'bg-white shadow border border-slate-200 text-blue-600' : 'text-slate-500 hover:bg-slate-200/50'}`}
            >
              Meus Atendimentos
              {myLeads.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {myLeads.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {(activeTab === 'aguardando' ? waitingLeads : myLeads).length === 0 && (
              <div className="text-center p-8 text-slate-400 text-sm italic">
                Nenhum cliente nesta fila.
              </div>
            )}

            {(activeTab === 'aguardando' ? waitingLeads : myLeads).map(lead => (
              <div 
                key={lead.id} 
                onClick={() => activeTab === 'meus' ? setSelectedLeadId(lead.id) : null}
                className={`p-4 rounded-xl border transition-all cursor-pointer group ${selectedLeadId === lead.id ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800 text-sm truncate pr-2">{lead.name}</h4>
                  <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded">{lead.date}</span>
                </div>
                <p className="text-xs font-mono text-slate-500 mb-3">{lead.phone}</p>
                <div className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-2 rounded relative">
                   {lead.lastMessage || 'Nenhuma mensagem recebida ainda.'}
                   {lead.unreadCount && lead.unreadCount > 0 && (
                     <span className="absolute -top-2 -right-2 bg-emerald-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shadow-md">
                       {lead.unreadCount}
                     </span>
                   )}
                </div>

                {activeTab === 'aguardando' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleAssume(lead.id); }}
                    className="w-full mt-3 bg-slate-800 hover:bg-black text-white text-xs font-bold py-2 rounded transition-colors"
                  >
                    Assumir Atendimento
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Janela de Chat Principal */}
        <div className="flex-1 flex flex-col bg-[#e5ddd5] relative">
          {/* Fundo Padrão do WhatsApp */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')] mix-blend-multiply z-0 pointer-events-none"></div>

          {selectedLead ? (
            <>
              {/* Chat Header */}
              <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-xl shadow-inner">
                    👤
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">{selectedLead.name}</h2>
                    <p className="text-xs text-slate-500">{selectedLead.phone}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleFinish(selectedLead.id)}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors border border-emerald-300"
                >
                  <span className="text-lg">✅</span> Finalizar e Enviar p/ Funil
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10">
                <div className="text-center mb-8">
                  <span className="bg-[#E1F3FB] text-slate-600 text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm">
                    Hoje
                  </span>
                </div>

                {selectedLead.messages?.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[70%] rounded-2xl px-4 py-2.5 relative shadow-sm ${msg.sender === 'agent' ? 'bg-[#d9fdd3] text-slate-800 rounded-tr-sm' : 'bg-white text-slate-800 rounded-tl-sm'}`}
                    >
                      {msg.sender === 'agent' && msg.agentName && (
                        <div className="text-[10px] text-emerald-600 font-bold mb-0.5">
                           [{companyInfo.name} - {msg.agentName}]
                        </div>
                      )}
                      <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div className="text-[10px] text-slate-400 text-right mt-1 font-medium select-none">
                        {msg.date}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="bg-[#f0f2f5] px-6 py-4 flex flex-col gap-2 z-10 border-t border-slate-200">
                <div className="flex justify-between items-center px-1">
                  <button 
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="text-xs font-bold text-indigo-600 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <span className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <span>✨</span>
                    )}
                    {isGenerating ? 'LavaMind pensando...' : 'Gerar Resposta com LavaMind'}
                  </button>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Tom: {lavaMindConfig.tone.split(' ')[0]}
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-3">
                    <input 
                      type="text" 
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendReply()}
                      placeholder="Digite uma mensagem..."
                      className="flex-1 outline-none bg-transparent text-slate-700 text-[15px]"
                      autoFocus
                    />
                  </div>
                  <button 
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="w-12 h-12 shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl shadow-md transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🚀
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center z-10 text-slate-500">
              <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                💬
              </div>
              <h2 className="text-xl font-light text-slate-700">Nenhum Atendimento Selecionado</h2>
              <p className="text-sm mt-2">Clique em um cliente na fila "Meus Atendimentos" para conversar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
