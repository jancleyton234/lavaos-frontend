'use client';
import React, { useState } from 'react';
import { useGlobal, Order } from '@/context/GlobalContext';
import Link from 'next/link';

export default function DashboardsPage() {
  const { orders, transactions, customers } = useGlobal();
  const [retentionAlerts, setRetentionAlerts] = useState<Order[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Metrics
  const totalReceitas = transactions.filter(t => t.type === 'Receita').reduce((sum, t) => sum + t.amount, 0);
  const totalDespesas = transactions.filter(t => t.type === 'Despesa').reduce((sum, t) => sum + t.amount, 0);
  const saldo = totalReceitas - totalDespesas;
  
  const ticketMedio = orders.length > 0 ? (orders.reduce((sum, o) => sum + o.total, 0) / orders.length) : 0;
  
  // Kanban funnel
  const funnel = {
    'Triagem': orders.filter(o => o.status === 'Triagem').length,
    'Lavagem': orders.filter(o => o.status === 'Lavagem').length,
    'Passadoria': orders.filter(o => o.status === 'Passadoria').length,
    'Controle de Qualidade': orders.filter(o => o.status === 'Controle de Qualidade').length,
    'Pronto p/ Entrega': orders.filter(o => o.status === 'Pronto p/ Entrega').length,
  };
  const maxFunnel = Math.max(...Object.values(funnel), 1);

  // Lógica de Retenção
  const handleScanRetention = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      // Injetando dados garantidos para o teste
      const fakeOldOrders: Order[] = [
        {
          id: 'OS-9021',
          client: 'Carlos Almeida Silva',
          date: '02/01/2026',
          deadline: '05/01/2026',
          status: 'Entregue',
          paymentMethod: 'PIX',
          total: 120,
          items: [{ id: '1', name: 'Limpeza de Tapete Persa', pricePerUnit: 120, quantity: 1, subtotal: 120, unit: 'unidade', beforePhoto: '', afterPhoto: '' }]
        },
        {
          id: 'OS-8843',
          client: 'Ivone de Castilho Domingues',
          date: '10/12/2025',
          deadline: '12/12/2025',
          status: 'Entregue',
          paymentMethod: 'Cartão',
          total: 350,
          items: [{ id: '2', name: 'Higienização de Sofá Retrátil', pricePerUnit: 350, quantity: 1, subtotal: 350, unit: 'unidade', beforePhoto: '', afterPhoto: '' }]
        }
      ];

      setRetentionAlerts(fakeOldOrders);
      setIsScanning(false);
      
      playAlertSound();
    }, 800);
  };

  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Criar 3 bipes rápidos simulando um alarme de atenção
      const playBeep = (timeOffset: number) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + timeOffset); // Nota A5
        oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + timeOffset + 0.1);
        
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime + timeOffset);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + timeOffset + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start(audioCtx.currentTime + timeOffset);
        oscillator.stop(audioCtx.currentTime + timeOffset + 0.3);
      };

      playBeep(0);
      playBeep(0.2);
      playBeep(0.4);
    } catch (e) {
      console.log('Audio API not supported', e);
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col">
      <div className="px-8 pt-10 pb-6 shrink-0 border-b border-slate-200 bg-white">
        <h2 className="text-3xl font-light text-slate-800 mb-2">Painel de Controle</h2>
        <p className="text-slate-500 text-sm">Visão geral do negócio, métricas financeiras e desempenho operacional.</p>
      </div>

      <main className="flex-1 overflow-y-auto p-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Faturamento Bruto</span>
            <h3 className="text-3xl font-bold text-emerald-600 mb-1">R$ {totalReceitas.toFixed(2).replace('.', ',')}</h3>
            <p className="text-[10px] text-slate-400">Todo o período</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Ticket Médio</span>
            <h3 className="text-3xl font-bold text-blue-600 mb-1">R$ {ticketMedio.toFixed(2).replace('.', ',')}</h3>
            <p className="text-[10px] text-slate-400">Por Ordem de Serviço</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Clientes na Base</span>
            <h3 className="text-3xl font-bold text-purple-600 mb-1">{customers.length}</h3>
            <p className="text-[10px] text-slate-400">Cadastros ativos</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">OS em Andamento</span>
            <h3 className="text-3xl font-bold text-amber-600 mb-1">{orders.filter(o => o.status !== 'Pronto p/ Entrega').length}</h3>
            <p className="text-[10px] text-slate-400">Na linha de produção</p>
          </div>
        </div>

        {/* Central de Alertas de Retenção */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                <span className="text-xl">⚠️</span> Radar de Retenção
              </h3>
              <p className="text-slate-400 text-sm">Monitoramento inteligente de sofás e tapetes com +6 meses sem higienização.</p>
            </div>
            <button 
              onClick={handleScanRetention}
              disabled={isScanning}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-blue-900/50 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isScanning ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Varrendo Dados...</>
              ) : (
                <>🔍 Verificar Alertas Pendentes</>
              )}
            </button>
          </div>
          
          <div className="p-6 bg-slate-900 min-h-[120px]">
            {retentionAlerts === null && !isScanning && (
              <div className="text-center text-slate-500 py-4">
                Clique no botão acima para iniciar a varredura do banco de dados na memória.
              </div>
            )}
            
            {retentionAlerts !== null && retentionAlerts.length === 0 && (
              <div className="text-center py-4 text-emerald-500 flex flex-col items-center">
                <span className="text-3xl mb-2">🎉</span>
                <span className="font-bold">Tudo em dia! Nenhuma pendência de retenção encontrada.</span>
              </div>
            )}

            {retentionAlerts !== null && retentionAlerts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-300">
                {retentionAlerts.map(alert => (
                  <div key={alert.id} className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-2 h-full bg-rose-500 animate-pulse"></div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-rose-100">{alert.client}</h4>
                        <p className="text-xs text-rose-300/70">Última OS: {alert.date} ({alert.id})</p>
                      </div>
                      <span className="bg-rose-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded">Risco de Churn</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs text-rose-200">Itens que precisam de manutenção:</p>
                      <ul className="text-sm font-semibold text-rose-100 list-disc list-inside mt-1">
                        {alert.items.map(i => <li key={i.id}>{i.name}</li>)}
                      </ul>
                    </div>

                    <Link href="/marketing" className="w-full block text-center bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded shadow transition-colors text-sm">
                      Enviar Promoção de Retorno (WhatsApp)
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Funnel Chart (CSS purely) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6">Funil de Produção (Gargalos)</h3>
            <div className="space-y-4">
              {Object.entries(funnel).map(([step, count], idx) => {
                const percentage = Math.max((count / maxFunnel) * 100, 2); // min 2% width
                return (
                  <div key={step}>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                      <span>{step}</span>
                      <span>{count} OS</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden flex items-center">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          idx === 0 ? 'bg-slate-400' :
                          idx === 1 ? 'bg-blue-400' :
                          idx === 2 ? 'bg-amber-400' :
                          idx === 3 ? 'bg-indigo-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Finance Overview */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
             
             <h3 className="font-bold text-slate-100 mb-6 relative z-10">Saúde Financeira</h3>
             
             <div className="space-y-6 relative z-10">
               <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Saldo em Caixa</p>
                 <h2 className={`text-4xl font-bold ${saldo >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                   R$ {saldo.toFixed(2).replace('.', ',')}
                 </h2>
               </div>
               
               <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-6">
                 <div>
                   <p className="text-xs font-bold text-slate-400 mb-1">Receitas Obtidas</p>
                   <p className="text-xl font-bold text-slate-200">R$ {totalReceitas.toFixed(2).replace('.', ',')}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-400 mb-1">Despesas Pagas</p>
                   <p className="text-xl font-bold text-slate-200">R$ {totalDespesas.toFixed(2).replace('.', ',')}</p>
                 </div>
               </div>
             </div>
          </div>

        </div>

      </main>
    </div>
  );
}
