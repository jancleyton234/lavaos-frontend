'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams();

  // Mock
  const order = {
    number: 'OS-2026-000001',
    customer: 'Marcos Almeida',
    status: 'EM_PRODUCAO',
    team: 'Equipe Alfa (Téc. João)',
    predictedEnd: 'Hoje às 17:30',
    total: 'R$ 450,00',
    items: [
      { id: 1, name: 'Tapete Persa (Sala)', status: 'LAVAGEM' },
      { id: 2, name: 'Sofá 3 Lugares', status: 'AGUARDANDO_PRODUCAO' }
    ],
    timeline: [
      { time: '14:30', user: 'João (Técnico)', action: 'Iniciou a Lavagem do Tapete Persa', gps: '-23.5505, -46.6333', icon: '💧' },
      { time: '14:15', user: 'João (Técnico)', action: 'Preencheu o Checklist de Entrada', gps: '-23.5505, -46.6333', icon: '✅' },
      { time: '14:10', user: 'João (Técnico)', action: 'Chegou ao local do cliente', gps: '-23.5505, -46.6333', icon: '📍' },
      { time: '13:40', user: 'Maria (Despachante)', action: 'Designou a OS para a Equipe Alfa', gps: 'Base Operacional', icon: '🚚' },
      { time: '09:00', user: 'Cliente', action: 'Aprovou o orçamento online', gps: 'IP: 192.168.1.1', icon: '👍' }
    ]
  };

  return (
    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full h-full flex flex-col">
      <header className="mb-6 shrink-0">
        <Link href="/orders" className="text-sm text-indigo-600 hover:underline mb-2 inline-block">
          &larr; Voltar para Ordens
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{order.number}</h1>
            <p className="text-slate-500">Cliente: <span className="font-semibold text-slate-800 dark:text-slate-200">{order.customer}</span></p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 font-bold rounded-lg text-sm flex items-center">
              STATUS GERAL: {order.status}
            </span>
          </div>
        </div>
      </header>

      {/* KPIs Rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shrink-0">
        <Kpi label="Equipe" value={order.team} />
        <Kpi label="Previsão de Entrega" value={order.predictedEnd} />
        <Kpi label="Total da OS" value={order.total} />
        <Kpi label="Itens na OS" value={order.items.length.toString()} />
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* Painel Central: Itens e Execução */}
        <div className="flex-1 bg-white dark:bg-slate-950 rounded-xl border shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-slate-50 dark:bg-slate-900 font-semibold">
            Itens em Execução
          </div>
          <div className="p-4 overflow-y-auto space-y-6">
            
            {order.items.map(item => (
              <div key={item.id} className="border rounded-lg p-4 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded font-bold">{item.status}</span>
                </div>
                
                {/* Ações da Etapa Atual */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded border">
                  <p className="text-sm text-slate-500 mb-3">Etapa Atual: <strong>{item.status}</strong></p>
                  
                  {item.status === 'LAVAGEM' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-indigo-600 hover:border-indigo-400 transition">
                          <span className="text-2xl mb-2">📸</span>
                          <span className="text-sm font-medium">Tirar Foto do Processo</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-indigo-600 hover:border-indigo-400 transition">
                          <span className="text-2xl mb-2">✅</span>
                          <span className="text-sm font-medium">Preencher Checklist (Químicos)</span>
                        </button>
                      </div>
                      <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">
                        Concluir Lavagem e Avançar para Secagem &rarr;
                      </button>
                    </div>
                  )}

                  {item.status === 'AGUARDANDO_PRODUCAO' && (
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
                      Iniciar Lavagem
                    </button>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Linha do Tempo Lateral (Timeline) */}
        <div className="w-full lg:w-96 bg-white dark:bg-slate-950 rounded-xl border shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b bg-slate-50 dark:bg-slate-900 font-semibold flex justify-between items-center">
            Auditoria (Timeline)
            <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">100% Rastreado</span>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-6">
            
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-6">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[17px] top-1 w-8 h-8 bg-white dark:bg-slate-950 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm shadow-sm">
                    {event.icon}
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <strong className="text-indigo-600 dark:text-indigo-400">{event.user}</strong>
                      <span className="text-xs text-slate-400">{event.time}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">{event.action}</p>
                    <p className="text-[10px] text-slate-400 font-mono">📍 GPS: {event.gps}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white dark:bg-slate-950 border rounded-lg p-3 shadow-sm">
      <p className="text-[11px] text-slate-500 font-semibold uppercase">{label}</p>
      <p className="font-bold text-sm mt-1 truncate">{value}</p>
    </div>
  );
}
