'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useGlobal, Customer } from '@/context/GlobalContext';
import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';

export default function CustomersPage() {
  const { customers, addCustomer, orders, syncManyCustomers, deleteCustomer, clearAllCustomers, whatsappConnected } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState<{name: string, phone: string, type: 'PF' | 'PJ'}>({ name: '', phone: '', type: 'PF' });
  const [selectedCustomerHistory, setSelectedCustomerHistory] = useState<Customer | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState<{current: number, total: number} | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040');
    setSocket(newSocket);

    newSocket.on('sync_progress', (data: any) => {
      if (data.current && data.total) {
        setSyncProgress({ current: data.current, total: data.total });
      }
      if (data.contact) {
        syncManyCustomers([data.contact]);
      }
      if (data.deepScanResult) {
        // Atualiza a lista com o cliente encontrado pelo Deep Scan noturno
        syncManyCustomers([data.deepScanResult]);
      }
    });

    newSocket.on('sync_contacts_result', (syncedContacts: any[]) => {
      setIsSyncing(false);
      setSyncProgress(null);
      alert(`Sincronização concluída! ${syncedContacts.length} contatos verificados e mesclados com sucesso.`);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSyncContacts = () => {
    if (!whatsappConnected) {
      alert('Conecte o WhatsApp primeiro (aba Integrações/Settings) para sincronizar.');
      return;
    }
    if (socket) {
      setIsSyncing(true);
      socket.emit('sync_contacts');
    }
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'Inativos (+6 Meses)') {
      return matchesSearch && c.lastContactTimestamp && (Date.now() - c.lastContactTimestamp > 180 * 24 * 60 * 60 * 1000);
    }
    if (filterType === 'Inativos (+1 Ano)') {
      return matchesSearch && c.lastContactTimestamp && (Date.now() - c.lastContactTimestamp > 365 * 24 * 60 * 60 * 1000);
    }
    if (filterType === 'Serviço Fechado (IA)') {
      return matchesSearch && c.tags?.includes('Serviço Fechado');
    }

    const matchesType = filterType === 'Todos' || c.type === (filterType === 'Pessoa Física (PF)' ? 'PF' : 'PJ');
    return matchesSearch && matchesType;
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) return alert('Preencha nome e telefone.');
    addCustomer({
      id: Math.floor(Math.random() * 9999).toString(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      type: newCustomer.type,
      ltv: 0
    });
    setIsModalOpen(false);
    setNewCustomer({ name: '', phone: '', type: 'PF' });
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        
        {/* Title & Filters */}
        <div className="px-8 pt-10 pb-6 shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-3xl font-light text-slate-800 mb-2 flex items-center gap-3">
              Base de Clientes
              <span className="text-sm font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                {filteredCustomers.length} {filteredCustomers.length === 1 ? 'cliente' : 'clientes'}
              </span>
            </h2>
            <p className="text-slate-500 text-sm">Gerencie sua carteira, visualize histórico e identifique perfis VIP.</p>
          </div>
          
          <div className="flex gap-4 items-end">
            <button 
              onClick={handleSyncContacts}
              disabled={isSyncing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors ${
                isSyncing ? 'bg-emerald-100 text-emerald-500 cursor-wait' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              {isSyncing ? (
                <>
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  {syncProgress ? `Lendo ${syncProgress.current} de ${syncProgress.total}...` : 'Sincronizando...'}
                </>
              ) : (
                <>
                  <span className="text-emerald-500 text-lg">↻</span> Sincronizar WhatsApp
                </>
              )}
            </button>
            <button 
              onClick={() => {
                if (window.confirm('Tem certeza que deseja apagar TODOS os clientes do sistema e zerar a fila? Isso não apagará contatos do seu WhatsApp.')) {
                  clearAllCustomers();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
              title="Zerar toda a fila de clientes"
            >
              <span className="text-rose-500 text-lg">🗑️</span> Zerar Fila
            </button>
            <button 
              onClick={() => {
                if (socket) {
                  alert('O Robô Deep Scan foi acionado. Ele lerá algumas conversas e adicionará a tag [Serviço Fechado] aos clientes. Acompanhe as mudanças na lista.');
                  socket.emit('test_deep_scan');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
              title="Testar o robô noturno agora"
            >
              <span className="text-indigo-500 text-lg">🤖</span> Testar Deep Scan
            </button>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filtro Rápido</label>
              <select 
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="bg-transparent border-b border-slate-300 py-1 pr-6 text-sm focus:outline-none focus:border-blue-500 text-slate-700"
              >
                <option>Todos</option>
                <option>Pessoa Física (PF)</option>
                <option>Pessoa Jurídica (PJ)</option>
                <option>Inativos (+6 Meses)</option>
                <option>Inativos (+1 Ano)</option>
                <option>Serviço Fechado (IA)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <input 
                type="text" 
                placeholder="Buscar por nome ou CPF..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-b border-slate-300 py-1 w-64 text-sm focus:outline-none focus:border-blue-500 text-slate-700" 
              />
            </div>
          </div>
        </div>

        {/* Customer Grid */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* New Customer Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-40 bg-blue-500 hover:bg-blue-600 transition-colors rounded-xl shadow-md flex flex-col items-center justify-center text-white group border-none"
            >
              <span className="text-5xl mb-2 font-light group-hover:scale-110 transition-transform">+</span>
              <span className="font-semibold text-sm tracking-wide">NOVO CLIENTE</span>
            </button>

            {filteredCustomers.map((c) => (
              <div 
                key={c.id} 
                onClick={() => setSelectedCustomerHistory(c)}
                className="h-40 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-emerald-400 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden"
              >
                {/* Decorative background shape */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                
                <div className="z-10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${c.type === 'PJ' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                        {c.type}
                      </span>
                      {c.tags?.includes('Serviço Fechado') && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm bg-emerald-500 text-white shadow-sm flex items-center gap-1" title="Encontrado pelo Deep Scan IA">
                          <span>✨</span> IA CONFIRMOU
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Tem certeza que deseja remover ${c.name} do sistema? (Isso não apagará o contato do seu WhatsApp)`)) {
                          deleteCustomer(c.id);
                        }
                      }}
                      className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="Excluir cliente do sistema"
                    >
                      <span className="text-sm">🗑️</span>
                    </button>
                  </div>
                  <h3 className="font-bold text-slate-800 line-clamp-2 text-lg leading-tight group-hover:text-emerald-700 transition-colors pr-6">
                    {c.name}
                  </h3>
                </div>
                
                <div className="z-10 flex justify-between items-end">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="opacity-70">📞</span> {c.phone}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">LTV</p>
                    <p className="text-sm font-bold text-slate-700">R$ {c.ltv.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Novo Cliente */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-full">
              <h3 className="text-xl font-light text-slate-800 mb-6 border-b border-slate-100 pb-2">Cadastrar Cliente</h3>
              
              <label className="block text-xs font-bold text-slate-500 mb-1">Tipo de Cliente</label>
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setNewCustomer({...newCustomer, type: 'PF'})}
                  className={`flex-1 py-2 text-sm font-bold rounded border ${newCustomer.type === 'PF' ? 'bg-blue-50 text-blue-700 border-blue-500' : 'bg-white border-slate-300 text-slate-600'}`}
                >PF (Física)</button>
                <button 
                  onClick={() => setNewCustomer({...newCustomer, type: 'PJ'})}
                  className={`flex-1 py-2 text-sm font-bold rounded border ${newCustomer.type === 'PJ' ? 'bg-indigo-50 text-indigo-700 border-indigo-500' : 'bg-white border-slate-300 text-slate-600'}`}
                >PJ (Jurídica)</button>
              </div>

              <label className="block text-xs font-bold text-slate-500 mb-1">Nome / Razão Social</label>
              <input 
                type="text" 
                value={newCustomer.name} 
                onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 mb-4 text-sm" 
              />

              <label className="block text-xs font-bold text-slate-500 mb-1">Telefone / WhatsApp</label>
              <input 
                type="text" 
                value={newCustomer.phone} 
                onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 mb-6 text-sm" 
              />

              <div className="flex gap-2">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm">Cancelar</button>
                <button onClick={handleAddCustomer} className="flex-[2] py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-sm shadow-md">Salvar Cliente</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Histórico do Cliente */}
        {selectedCustomerHistory && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] w-full max-w-2xl">
              <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-slate-800">Histórico de Ordens</h3>
                  <p className="text-slate-500 font-medium">{selectedCustomerHistory.name} - {selectedCustomerHistory.phone}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="text-right mr-4">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Gasto na Empresa</p>
                    <p className="text-lg font-black text-emerald-600">
                      R$ {orders.filter(o => o.client === selectedCustomerHistory.name).reduce((acc, curr) => acc + curr.total, 0).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedCustomerHistory(null)} 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
                {selectedOrderDetails ? (
                  <div className="animate-in slide-in-from-right-4">
                    <button 
                      onClick={() => setSelectedOrderDetails(null)}
                      className="mb-6 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                    >
                      ← Voltar para Histórico
                    </button>
                    
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
                      <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                        <div>
                          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">CÓDIGO DA OS</h4>
                          <p className="text-2xl font-black text-slate-800">{selectedOrderDetails.id}</p>
                        </div>
                        <div className="text-right">
                          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">STATUS</h4>
                          <span className={`px-3 py-1 text-sm font-bold rounded-full ${selectedOrderDetails.status === 'Entregue' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                            {selectedOrderDetails.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Data de Entrada</p>
                          <p className="font-semibold text-slate-700">{selectedOrderDetails.date}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Forma de Pagamento</p>
                          <p className="font-semibold text-slate-700">{selectedOrderDetails.paymentMethod}</p>
                        </div>
                      </div>

                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span>👕</span> Itens da Ordem de Serviço
                      </h4>
                      <div className="space-y-3">
                        {selectedOrderDetails.items.map((item: any) => (
                          <div key={item.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-500">
                                {item.quantity}x
                              </div>
                              <div>
                                <p className="font-bold text-slate-700">{item.name}</p>
                                <p className="text-xs text-slate-500">
                                  {item.width && item.length ? `${item.width}m x ${item.length}m` : ''} 
                                  {item.weight ? `${item.weight}kg` : ''}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-slate-800">R$ {item.subtotal.toFixed(2).replace('.', ',')}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-end">
                        <p className="font-bold text-slate-500 uppercase tracking-wider text-sm">Valor Total</p>
                        <p className="text-3xl font-black text-slate-800">R$ {selectedOrderDetails.total.toFixed(2).replace('.', ',')}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  (() => {
                    const historyOrders = orders.filter(o => o.client === selectedCustomerHistory.name);
                    
                    if (historyOrders.length === 0) {
                      return (
                        <div className="text-center py-10">
                          <span className="text-4xl block mb-4 opacity-50">📭</span>
                          <p className="text-slate-500 font-medium">Nenhuma Ordem de Serviço encontrada para este cliente.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        {historyOrders.map(order => (
                          <div 
                            key={order.id} 
                            onClick={() => setSelectedOrderDetails(order)}
                            className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 justify-between md:items-center shadow-sm cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{order.id}</span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${order.status === 'Entregue' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">{order.date} • {order.items.reduce((acc, i) => acc + i.quantity, 0)} peça(s)</p>
                            </div>
                            <div className="text-left md:text-right flex items-center gap-4">
                              <div>
                                <p className="font-bold text-slate-800">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                                <p className="text-[10px] font-bold uppercase text-slate-400">{order.paymentMethod}</p>
                              </div>
                              <span className="text-slate-300 group-hover:text-blue-500">➔</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
