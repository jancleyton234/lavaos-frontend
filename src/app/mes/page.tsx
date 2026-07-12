'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useGlobal, OrderStatus, Order } from '@/context/GlobalContext';

export default function ProcessoProdutivoPage() {
  const { orders, updateOrderStatus, updateOrderStages, addTransaction, updateOrderPayment } = useGlobal();
  const [configModalOrder, setConfigModalOrder] = useState<Order | null>(null);
  const [tempStages, setTempStages] = useState<OrderStatus[]>([]);
  
  const [paymentModalOrder, setPaymentModalOrder] = useState<Order | null>(null);
  const [finalPaymentMethod, setFinalPaymentMethod] = useState('PIX');

  const stages: { name: OrderStatus; color: string }[] = [
    { name: 'Triagem', color: 'bg-slate-200' },
    { name: 'Lavagem', color: 'bg-blue-100' },
    { name: 'Passadoria', color: 'bg-amber-100' },
    { name: 'Controle de Qualidade', color: 'bg-indigo-100' },
    { name: 'Pronto p/ Entrega', color: 'bg-emerald-100' },
  ];

  return (
    <div className="flex-1 flex overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        
        {/* Header Title */}
        <div className="px-8 pt-10 pb-6 shrink-0 flex items-end justify-between border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-3xl font-light text-slate-800 mb-2">Processo Produtivo</h2>
            <p className="text-slate-500 text-sm">Acompanhamento e rastreabilidade (Kanban) das Ordens de Serviço.</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm">
               Filtros Avançados
             </button>
             <Link href="/">
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-md">
                 + Nova OS
               </button>
             </Link>
          </div>
        </div>

        {/* Kanban Board Container */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-8">
          <div className="flex gap-6 h-full items-start pb-4">
            
            {stages.map((stage) => {
              const stageOrders = orders.filter(o => o.status === stage.name);
              
              return (
              <div key={stage.name} className="w-80 flex-shrink-0 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
                
                {/* Column Header */}
                <div className={`p-4 ${stage.color} border-b border-slate-200/50 flex justify-between items-center`}>
                  <h3 className="font-bold text-slate-700 text-sm">{stage.name}</h3>
                  <span className="bg-white/60 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm">
                    {stageOrders.length}
                  </span>
                </div>
                
                {/* Column Content (Scrollable Cards) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  
                  {stageOrders.length === 0 ? (
                    <div className="text-center p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold">
                      Sem OS nesta etapa
                    </div>
                  ) : (
                    stageOrders.map(order => (
                      <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-blue-500 cursor-pointer hover:shadow-md transition-shadow group relative">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-slate-400">{order.id}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            (order.paymentMethod === 'Pendente' || order.paymentMethod === 'Ficar Pendente') ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {(order.paymentMethod === 'Pendente' || order.paymentMethod === 'Ficar Pendente') ? 'A Pagar' : `Pago (${order.paymentMethod})`}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">{order.client}</h4>
                        <p className="text-xs text-slate-500 mb-2">{order.items.length}x Peças/Serviços - Prazo: {order.deadline}</p>
                        
                        {/* Vistoria Indicator */}
                        {order.items.some(i => i.beforePhoto) && (
                          <div className="flex gap-2 mb-3">
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                              📸 Antes
                            </span>
                            {stage.name !== 'Triagem' && stage.name !== 'Lavagem' && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  alert('Simulando envio de Foto do Depois para a nuvem...');
                                }}
                                className="text-[10px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                              >
                                + Anexar Depois
                              </button>
                            )}
                          </div>
                        )}

                        <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-2">
                          <span className="font-bold text-slate-800 text-sm">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => {
                                const currentIndex = stages.findIndex(s => s.name === stage.name);
                                const currentRequired = order.requiredStages || stages.map(s => s.name);
                                let prevStage: OrderStatus | null = null;
                                for (let i = currentIndex - 1; i >= 0; i--) {
                                  if (currentRequired.includes(stages[i].name)) {
                                    prevStage = stages[i].name;
                                    break;
                                  }
                                }
                                if (prevStage) updateOrderStatus(order.id, prevStage);
                              }}
                              title="Voltar etapa"
                              className="w-6 h-6 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded flex items-center justify-center font-bold"
                            >
                              ←
                            </button>
                            <button 
                              onClick={() => {
                                const currentIndex = stages.findIndex(s => s.name === stage.name);
                                const currentRequired = order.requiredStages || stages.map(s => s.name);
                                let nextStage: OrderStatus | null = null;
                                for (let i = currentIndex + 1; i < stages.length; i++) {
                                  if (currentRequired.includes(stages[i].name)) {
                                    nextStage = stages[i].name;
                                    break;
                                  }
                                }
                                if (nextStage) updateOrderStatus(order.id, nextStage);
                              }}
                              title="Avançar etapa"
                              className="w-6 h-6 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded flex items-center justify-center font-bold"
                            >
                              →
                            </button>
                          </div>
                        </div>

                        {stage.name === 'Triagem' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfigModalOrder(order);
                              setTempStages(order.requiredStages || stages.map(s => s.name));
                            }}
                            className="w-full mt-2 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 py-1.5 rounded border border-slate-200 transition-colors"
                          >
                            ⚙️ Configurar Etapas
                          </button>
                        )}
                        
                        {stage.name === 'Pronto p/ Entrega' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (order.paymentMethod === 'Pendente' || order.paymentMethod === 'Ficar Pendente') {
                                setPaymentModalOrder(order);
                              } else {
                                updateOrderStatus(order.id, 'Entregue');
                              }
                            }}
                            className="w-full mt-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 py-1.5 rounded shadow-sm transition-colors"
                          >
                            ✅ Dar Baixa (Entregue)
                          </button>
                        )}
                      </div>
                    ))
                  )}

                </div>
              </div>
            )})}
            
          </div>
        </div>

        {/* Modal de Configuração de Etapas */}
        {configModalOrder && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-full">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Configurar Etapas</h3>
              <p className="text-xs text-slate-500 mb-6 border-b border-slate-100 pb-2">Defina por quais etapas a OS {configModalOrder.id} precisa passar. Desmarque o que não for necessário (ex: Passadoria para Tapetes).</p>
              
              <div className="space-y-3 mb-6">
                {stages.map(stage => {
                  if (stage.name === 'Triagem' || stage.name === 'Pronto p/ Entrega') {
                    return (
                      <div key={stage.name} className="flex items-center gap-3 opacity-50">
                        <input type="checkbox" checked readOnly className="w-4 h-4 text-blue-600" />
                        <label className="text-sm font-bold text-slate-700">{stage.name} <span className="text-[10px] font-normal">(Obrigatório)</span></label>
                      </div>
                    );
                  }

                  return (
                    <div key={stage.name} className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={tempStages.includes(stage.name)} 
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempStages(prev => [...prev, stage.name]);
                          } else {
                            setTempStages(prev => prev.filter(s => s !== stage.name));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 cursor-pointer" 
                      />
                      <label className="text-sm font-bold text-slate-700 cursor-pointer" onClick={() => {
                        if (!tempStages.includes(stage.name)) {
                          setTempStages(prev => [...prev, stage.name]);
                        } else {
                          setTempStages(prev => prev.filter(s => s !== stage.name));
                        }
                      }}>{stage.name}</label>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setConfigModalOrder(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm">Cancelar</button>
                <button 
                  onClick={() => {
                    // Garantir que Triagem e Pronto p/ Entrega estejam incluídos
                    const finalStages = [...tempStages];
                    if (!finalStages.includes('Triagem')) finalStages.push('Triagem');
                    if (!finalStages.includes('Pronto p/ Entrega')) finalStages.push('Pronto p/ Entrega');
                    
                    updateOrderStages(configModalOrder.id, finalStages as OrderStatus[]);
                    setConfigModalOrder(null);
                  }} 
                  className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md"
                >
                  Salvar Etapas
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Acerto Financeiro na Baixa */}
        {paymentModalOrder && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-full">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Acerto Financeiro Pendente</h3>
              <p className="text-xs text-slate-500 mb-4 border-b border-slate-100 pb-2">A OS {paymentModalOrder.id} não foi paga na entrada. Qual a forma de pagamento do cliente na retirada?</p>
              
              <div className="mb-6">
                <div className="text-center bg-slate-50 py-3 rounded-lg border border-slate-200 mb-4">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Valor a Receber</span>
                  <div className="text-2xl font-bold text-slate-800">R$ {paymentModalOrder.total.toFixed(2).replace('.', ',')}</div>
                </div>

                <label className="block text-xs font-bold text-slate-500 mb-2">Forma de Pagamento</label>
                <select 
                  value={finalPaymentMethod}
                  onChange={e => setFinalPaymentMethod(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white focus:outline-none focus:border-blue-500"
                >
                  <option>PIX</option>
                  <option>Cartão</option>
                  <option>Dinheiro</option>
                  <option>Transferência</option>
                  <option>Boleto</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setPaymentModalOrder(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm">Cancelar</button>
                <button 
                  onClick={() => {
                    // Atualiza a OS
                    updateOrderPayment(paymentModalOrder.id, finalPaymentMethod);
                    updateOrderStatus(paymentModalOrder.id, 'Entregue');
                    
                    // Gera o lançamento financeiro automático
                    if (paymentModalOrder.total > 0) {
                      addTransaction({
                        id: `tr-${paymentModalOrder.id}-baixa`,
                        type: 'Receita',
                        description: `Acerto na Entrega (OS ${paymentModalOrder.id})`,
                        amount: paymentModalOrder.total,
                        paymentMethod: finalPaymentMethod,
                        date: new Date().toLocaleDateString('pt-BR')
                      });
                    }
                    
                    setPaymentModalOrder(null);
                  }} 
                  className="flex-[2] py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-sm shadow-md"
                >
                  Receber e Finalizar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
