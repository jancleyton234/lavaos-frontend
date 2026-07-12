'use client';
import React, { useState, useEffect } from 'react';
import { useGlobal } from '@/context/GlobalContext';
import { QRCodeSVG } from 'qrcode.react';

export default function SettingsPage() {
  const { companyInfo, updateCompanyInfo, lavaMindConfig, updateLavaMindConfig, whatsappConnected, setWhatsappConnected, waQrCode, waPairingCode, waPairingError, requestWaPairingCode, users, addUser, deleteUser, currentUser } = useGlobal();
  const [activeTab, setActiveTab] = useState('Perfil da Empresa');
  const [openIntegration, setOpenIntegration] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [localCompany, setLocalCompany] = useState(companyInfo);
  const [localLavaMind, setLocalLavaMind] = useState(lavaMindConfig);
  
  const [pairingPhone, setPairingPhone] = useState('');
  
  // Modal states para Usuários
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', login: '', pwd: '', role: 'Operador' as const });

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const formatPhone = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length <= 10) {
      return v.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    return v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.substring(0, 11);
    
    let formatted = val;
    if (val.length > 2) formatted = `(${val.substring(0, 2)}) ${val.substring(2)}`;
    if (val.length > 7) formatted = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
    if (val.length === 10) formatted = `(${val.substring(0, 2)}) ${val.substring(2, 6)}-${val.substring(6)}`;
    
    setLocalCompany({...localCompany, phone: formatted});
  };

  const fetchCNPJData = async (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    if (cleanCNPJ.length === 14) {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
        if (response.ok) {
          const data = await response.json();
          
          let addressString = data.logradouro || '';
          if (data.numero) addressString += `, ${data.numero}`;
          if (data.complemento) addressString += ` - ${data.complemento}`;
          if (data.bairro) addressString += ` - ${data.bairro}`;
          if (data.municipio) addressString += `, ${data.municipio} - ${data.uf}`;

          let phoneString = data.ddd_telefone_1 || '';
          if (phoneString) {
             phoneString = formatPhone(phoneString);
          }

          setLocalCompany(prev => ({
            ...prev,
            name: data.razao_social || prev.name,
            address: addressString || prev.address,
            phone: phoneString || prev.phone
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CNPJ:', error);
      }
    }
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setLocalCompany({...localCompany, cnpj: formatted});
    if (formatted.replace(/\D/g, '').length === 14) {
      fetchCNPJData(formatted);
    }
  };

  const menuItems = [
    'Perfil da Empresa',
    'Usuários e Acessos',
    'Integrações (WhatsApp/API)',
    'Plano e Assinatura',
    'LavaMind AI Engine',
    'Configurações Fiscais'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      updateCompanyInfo(localCompany);
      updateLavaMindConfig(localLavaMind);
    }, 500);
    return () => clearTimeout(timer);
  }, [localCompany, localLavaMind, updateCompanyInfo, updateLavaMindConfig]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Perfil da Empresa':
        return (
          <div className="space-y-6 max-w-2xl animate-in fade-in duration-300">
            {/* Logo Upload Section */}
            <div className="flex items-center gap-6 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-24 h-24 bg-white rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden relative">
                {localCompany.logoUrl ? (
                  <img src={localCompany.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-3xl text-slate-300">🏢</span>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  title="Clique para alterar a logo"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLocalCompany({...localCompany, logoUrl: reader.result as string});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Logomarca da Empresa</h4>
                <p className="text-xs text-slate-500 mb-2">Clique no quadrado ao lado para enviar a sua logo. Formatos: PNG ou JPG.</p>
                {localCompany.logoUrl && (
                  <button 
                    onClick={() => setLocalCompany({...localCompany, logoUrl: ''})} 
                    className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    Remover Logo
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Razão Social</label>
              <input type="text" value={localCompany.name} onChange={e => setLocalCompany({...localCompany, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CNPJ</label>
                <input type="text" value={localCompany.cnpj} onChange={handleCNPJChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:border-blue-500 transition-colors" placeholder="00.000.000/0000-00" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Telefone de Contato (WhatsApp)</label>
                <input type="text" value={localCompany.phone} onChange={handlePhoneChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:border-blue-500 transition-colors" placeholder="(00) 00000-0000" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Endereço Completo</label>
              <input type="text" value={localCompany.address} onChange={e => setLocalCompany({...localCompany, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="pt-6 flex justify-end">
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Salvo automaticamente
              </span>
            </div>
          </div>
        );
      
      case 'Usuários e Acessos':
        return (
          <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <p className="text-slate-500 text-sm">Gerencie quem tem acesso ao LavaOS e seus respectivos níveis de permissão.</p>
              {currentUser?.role === 'Administrador' && (
                <button 
                  onClick={() => setIsUserModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
                >
                  + Novo Usuário
                </button>
              )}
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Nome do Usuário</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Login de Acesso</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Nível de Permissão</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-bold text-slate-700">{u.name} {currentUser?.id === u.id ? <span className="text-emerald-500 text-[10px] uppercase ml-2 bg-emerald-100 px-2 py-0.5 rounded-full">Você</span> : ''}</td>
                      <td className="py-3 px-4 text-sm text-slate-500 font-mono bg-slate-100 px-2 rounded-md my-2 inline-block ml-4">{u.login}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                          u.role === 'Administrador' ? 'bg-indigo-100 text-indigo-700' : 
                          u.role === 'Operador' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {currentUser?.role === 'Administrador' && u.id !== currentUser.id && (
                          <button 
                            onClick={() => {
                              if (confirm(`Tem certeza que deseja excluir o acesso de ${u.name}?`)) {
                                deleteUser(u.id);
                              }
                            }}
                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded text-sm font-bold transition-colors"
                          >
                            Excluir
                          </button>
                        )}
                        {u.id === currentUser?.id && (
                          <span className="text-slate-400 text-xs italic">Não pode se auto-excluir</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal de Novo Usuário */}
            {isUserModalOpen && (
              <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-[450px] max-w-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400"></div>
                  <h3 className="text-xl font-black text-slate-800 mb-6 border-b border-slate-100 pb-4">Criar Novo Acesso</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nome Completo</label>
                      <input 
                        type="text" 
                        value={newUser.name} 
                        onChange={e => setNewUser({...newUser, name: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" 
                        placeholder="Ex: João Silva"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nome de Login</label>
                        <input 
                          type="text" 
                          value={newUser.login} 
                          onChange={e => setNewUser({...newUser, login: e.target.value})}
                          className="w-full border border-slate-300 bg-slate-50 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-mono" 
                          placeholder="ex: joao.silva"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Senha Inicial</label>
                        <input 
                          type="text" 
                          value={newUser.pwd} 
                          onChange={e => setNewUser({...newUser, pwd: e.target.value})}
                          className="w-full border border-slate-300 bg-slate-50 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" 
                          placeholder="********"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nível de Permissão</label>
                      <div className="flex gap-2">
                        {['Administrador', 'Operador', 'Atendente'].map(role => (
                          <button 
                            key={role}
                            onClick={() => setNewUser({...newUser, role: role as any})}
                            className={`flex-1 py-2 text-[10px] uppercase font-black tracking-wider rounded-lg border transition-all ${
                              newUser.role === role 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                              : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setIsUserModalOpen(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-sm transition-colors">Cancelar</button>
                    <button 
                      onClick={() => {
                        if (!newUser.name || !newUser.login || !newUser.pwd) return alert('Preencha todos os campos.');
                        if (users.find(u => u.login === newUser.login)) return alert('Este login já existe.');
                        addUser({ id: Math.random().toString(), ...newUser });
                        setIsUserModalOpen(false);
                        setNewUser({ name: '', login: '', pwd: '', role: 'Operador' });
                      }} 
                      className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md transition-colors"
                    >
                      Cadastrar Usuário
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'Integrações (WhatsApp/API)':
        return (
          <div className="space-y-6 max-w-2xl animate-in fade-in duration-300">
            <p className="text-slate-500 text-sm mb-6">Conecte o LavaOS a serviços externos para automatizar a comunicação.</p>
            
            <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-4 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">💬</div>
                  <div>
                    <h4 className="font-bold text-slate-800">WhatsApp Oficial (Headless)</h4>
                    <p className="text-sm text-slate-500">
                      Status: {whatsappConnected 
                        ? <span className="text-emerald-500 font-semibold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sincronizado</span> 
                        : <span className="text-rose-500 font-semibold">Desconectado</span>}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setOpenIntegration(openIntegration === 'whatsapp' ? null : 'whatsapp');
                    setIsScanning(false);
                  }}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${openIntegration === 'whatsapp' ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'}`}
                >
                  {openIntegration === 'whatsapp' ? 'Fechar' : 'Gerenciar'}
                </button>
              </div>
              
              {openIntegration === 'whatsapp' && (
                <div className="pt-6 border-t border-slate-100 animate-in slide-in-from-top-2">
                  {!whatsappConnected ? (
                    <div className="flex gap-8 items-center bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-800 mb-2">Conectar Dispositivo</h5>
                        <p className="text-sm text-slate-500 mb-4">Escaneie o QR Code para conectar o WhatsApp da sua lavanderia. Isso permitirá o envio de campanhas em lote de forma invisível (Headless).</p>
                        <ol className="text-sm text-slate-600 space-y-2 mb-6 list-decimal list-inside">
                          <li>Abra o WhatsApp no seu celular</li>
                          <li>Toque em Mais opções ou Configurações</li>
                          <li>Toque em Aparelhos conectados</li>
                          <li>Aponte seu celular para essa tela</li>
                        </ol>
                        
                        {waQrCode ? (
                           <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl inline-block">
                             <QRCodeSVG value={waQrCode} size={150} />
                             <p className="text-xs text-center mt-2 text-slate-500 font-bold">Escaneie o QR Code acima</p>
                           </div>
                        ) : (
                          <div className="flex items-center gap-3 text-slate-500 font-bold bg-slate-100 p-3 rounded-lg border border-slate-200">
                            <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                            Aguardando geração do QR Code...
                          </div>
                        )}

                        {/* Pairing Code Section (Ideal for Mobile Devices) */}
                        <div className="mt-6 pt-6 border-t border-slate-200">
                           <h6 className="font-bold text-slate-700 text-sm mb-2">Está no celular? Conecte via código:</h6>
                           <p className="text-xs text-slate-500 mb-3">Digite seu número de WhatsApp com DDD para gerar um código de 8 letras. Depois abra seu WhatsApp &gt; Aparelhos Conectados &gt; Conectar com número de telefone.</p>
                           
                           {waPairingCode ? (
                             <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
                               <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Seu código de emparelhamento</p>
                               <p className="text-4xl font-black text-blue-700 tracking-[0.2em]">{waPairingCode.match(/.{1,4}/g)?.join('-') || waPairingCode}</p>
                             </div>
                           ) : (
                             <div className="flex flex-col md:flex-row gap-2">
                               <input 
                                 type="tel" 
                                 placeholder="Ex: 11999999999" 
                                 value={pairingPhone}
                                 onChange={e => setPairingPhone(e.target.value.replace(/\D/g, ''))}
                                 className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                               />
                               <button 
                                 onClick={() => {
                                   if (pairingPhone.length < 10) return alert('Digite um número válido com DDD');
                                   requestWaPairingCode(pairingPhone);
                                 }}
                                 className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                               >
                                 Gerar Código
                               </button>
                             </div>
                           )}
                           {waPairingError && <p className="text-xs font-bold text-rose-500 mt-2">{waPairingError}</p>}
                        </div>

                      </div>
                      <div className="hidden md:flex w-48 h-48 bg-slate-50 border border-slate-200 rounded-xl items-center justify-center p-2 relative overflow-hidden">
                         <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center">
                           <span className="text-4xl animate-bounce mb-2">📱</span>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-4">
                        <span className="text-2xl">✅</span>
                        <div>
                          <h5 className="font-bold text-emerald-800">Aparelho Conectado e Sincronizado</h5>
                          <p className="text-sm text-emerald-600 mb-3">O LavaOS agora pode enviar mensagens em massa no módulo de Marketing usando este número.</p>
                          <button 
                            onClick={() => setWhatsappConnected(false)}
                            className="border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 px-4 py-1.5 rounded font-bold transition-colors text-xs"
                          >
                            Desconectar Aparelho
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-4 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl">💳</div>
                  <div>
                    <h4 className="font-bold text-slate-800">Gateway de Pagamento (Stripe/Pagar.me)</h4>
                    <p className="text-sm text-slate-500">Status: <span className="text-rose-500 font-semibold">Desconectado</span></p>
                  </div>
                </div>
                <button 
                  onClick={() => setOpenIntegration(openIntegration === 'payment' ? null : 'payment')}
                  className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-sm hover:bg-blue-100 font-medium transition-colors"
                >
                  {openIntegration === 'payment' ? 'Cancelar' : 'Conectar'}
                </button>
              </div>

              {openIntegration === 'payment' && (
                <div className="pt-4 border-t border-slate-100 animate-in slide-in-from-top-2">
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">Selecione o provedor de pagamento para habilitar recebimentos via PIX e Cartão de Crédito.</p>
                    <div className="flex gap-4">
                      <label className="flex-1 border border-slate-200 rounded-lg p-3 cursor-pointer hover:border-blue-500 flex items-center gap-3">
                        <input type="radio" name="gateway" className="text-blue-500" />
                        <span className="font-bold text-slate-700">Pagar.me</span>
                      </label>
                      <label className="flex-1 border border-slate-200 rounded-lg p-3 cursor-pointer hover:border-blue-500 flex items-center gap-3">
                        <input type="radio" name="gateway" className="text-blue-500" />
                        <span className="font-bold text-slate-700">Stripe</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chave da API (Public Key)</label>
                      <input type="text" placeholder="pk_test_..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 outline-none text-sm focus:border-blue-500" />
                    </div>
                    <div className="pt-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-colors text-xs">
                        Autenticar Gateway
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'Plano e Assinatura':
        return (
          <div className="space-y-6 max-w-2xl animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-indigo-400 font-bold uppercase tracking-wider text-sm mb-1">Plano Atual</h3>
                  <h2 className="text-3xl font-bold">LavaOS Enterprise</h2>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">ATIVO</span>
              </div>
              <p className="text-slate-300 text-sm mb-6">Próxima renovação: 10/12/2026 (R$ 399,90/mês)</p>
              <div className="flex gap-4">
                <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">Mudar Plano</button>
                <button className="border border-slate-600 text-slate-300 px-6 py-2 rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors">Ver Faturas</button>
              </div>
            </div>
          </div>
        );

      case 'LavaMind AI Engine':
        return (
          <div className="space-y-6 max-w-2xl animate-in fade-in duration-300">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <h3 className="font-bold text-indigo-900 flex items-center gap-2 mb-2">
                <span>✨</span> Personalidade da Inteligência Artificial
              </h3>
              <p className="text-sm text-indigo-700/80 mb-6">Defina o comportamento do LavaMind ao analisar dados e gerar insights para sua equipe.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-indigo-900/60 uppercase tracking-wider mb-2">Nível de Autonomia</label>
                  <select 
                    value={localLavaMind.autonomy}
                    onChange={e => setLocalLavaMind({...localLavaMind, autonomy: e.target.value})}
                    className="w-full bg-white border border-indigo-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:border-indigo-500"
                  >
                    <option>Sugerir ações (Requer aprovação manual)</option>
                    <option>Autônomo (Executar ações triviais automaticamente)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-indigo-900/60 uppercase tracking-wider mb-2">Tom de Voz para Mensagens de Clientes</label>
                  <select 
                    value={localLavaMind.tone}
                    onChange={e => setLocalLavaMind({...localLavaMind, tone: e.target.value})}
                    className="w-full bg-white border border-indigo-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:border-indigo-500"
                  >
                    <option>Profissional e Direto</option>
                    <option>Amigável e Descontraído</option>
                    <option>Formal e Corporativo</option>
                  </select>
                </div>
                <div className="pt-2 flex justify-end">
                  <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Salvo automaticamente
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Configurações Fiscais':
        return (
          <div className="space-y-6 max-w-2xl animate-in fade-in duration-300">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3 text-amber-800">
              <span className="text-xl">⚠️</span>
              <p className="text-sm">A emissão automática de notas fiscais requer a configuração do Certificado Digital (A1).</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Regime Tributário</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none focus:border-blue-500">
                  <option>Simples Nacional</option>
                  <option>Lucro Presumido</option>
                  <option>Lucro Real</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Certificado Digital (A1)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl mb-2 opacity-50">🔐</span>
                  <p className="text-sm text-slate-600 font-medium">Arraste seu certificado (.pfx) ou clique para fazer upload.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Conteúdo não encontrado.</div>;
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col">
      <div className="px-8 pt-10 pb-6 shrink-0 border-b border-slate-200 bg-white">
        <h2 className="text-3xl font-light text-slate-800 mb-2">Configurações & Admin</h2>
        <p className="text-slate-500 text-sm">Painel de controle do LavaOS: Usuários, Integrações, Permissões e Empresa.</p>
      </div>

      <main className="flex-1 overflow-y-auto p-8 flex flex-col md:flex-row gap-8">
        {/* Settings Menu */}
        <div className="w-full md:w-64 shrink-0">
          <ul className="space-y-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <button 
                  onClick={() => setActiveTab(item)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
                }`}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-8 min-h-[400px]">
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
            {activeTab}
          </h3>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
