'use client';

import React from 'react';

export default function OrderDashboardPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      
      {/* Header Central de Pedidos */}
      <header className="p-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">Gestão de Pedidos</h1>
          <p className="text-sm text-slate-500">Módulo Comercial 013 (Pai das OSs)</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow hover:bg-indigo-700">
            Novo Pedido Manual
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Esquerda: Lista de Pedidos Recentes */}
        <div className="w-1/3 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 overflow-y-auto z-10 p-4">
           <h3 className="font-bold text-slate-500 mb-4 px-2">Pedidos de Hoje</h3>
           
           {/* Card Pedido Normal */}
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-3 cursor-pointer hover:border-indigo-500 transition">
             <div className="flex justify-between items-center mb-2">
               <span className="font-bold text-sm">PED-2026-000085</span>
               <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">CONFIRMADO</span>
             </div>
             <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Maria Antonieta</p>
             <p className="text-xs text-slate-500 mt-1">1x Sofá Retrátil, 1x Impermeabilização</p>
             <div className="mt-3 font-mono text-green-600 font-bold text-lg">R$ 350,00</div>
           </div>

           {/* Card Pedido ALTO RISCO */}
           <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 p-4 rounded-xl mb-3 cursor-pointer relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg">
               ALTO RISCO (IA)
             </div>
             <div className="flex justify-between items-center mb-2">
               <span className="font-bold text-sm">PED-2026-000086</span>
               <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded">AGUARDANDO APROVAÇÃO</span>
             </div>
             <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Carlos Almeida</p>
             <p className="text-xs text-slate-500 mt-1">1x Sofá Retrátil, 2x Tapete Persa</p>
             <div className="mt-3 font-mono text-red-600 font-bold text-lg">R$ 650,00</div>
           </div>
        </div>

        {/* Direita: Detalhes do Pedido e Árvore de OSs */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-8">
           
           <div className="max-w-4xl mx-auto">
             
             {/* Cabeçalho do Detalhe */}
             <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black">Pedido #PED-2026-000086</h2>
                    <p className="text-slate-500">Criado em 04/07/2026 via Omnichannel</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-mono font-black text-slate-800 dark:text-white">R$ 650,00</div>
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">Faturado 0/3</span>
                  </div>
                </div>

                {/* Alerta de Risco IA */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-4 items-start mb-6">
                  <div className="text-red-500 text-2xl">⚠️</div>
                  <div>
                    <h4 className="font-bold text-red-800">Alerta de Risco pela Inteligência Artificial</h4>
                    <p className="text-sm text-red-600 mt-1">Este cliente cancelou os 2 últimos orçamentos após agendamento. Risco elevado de não-pagamento ou "no-show". A IA bloqueou a geração automática das OSs.</p>
                    <button className="mt-3 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded shadow hover:bg-red-700 transition">
                      Aprovar com Senha de Gerente (Liberar Fábrica)
                    </button>
                  </div>
                </div>

                {/* Itens do Pedido Comercial */}
                <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 border-b pb-2">Itens Comprados (Comercial)</h4>
                <table className="w-full text-sm text-left mb-6">
                  <thead className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-900">
                    <tr>
                      <th className="py-2 px-3">Serviço/Produto</th>
                      <th className="py-2 px-3">Qtd</th>
                      <th className="py-2 px-3">Vl Unit</th>
                      <th className="py-2 px-3">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-3 font-bold">Lavagem de Sofá Retrátil</td>
                      <td className="py-3 px-3">1</td>
                      <td className="py-3 px-3 font-mono">R$ 250,00</td>
                      <td className="py-3 px-3 font-mono font-bold">R$ 250,00</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-3 font-bold">Lavagem de Tapete Persa M</td>
                      <td className="py-3 px-3">2</td>
                      <td className="py-3 px-3 font-mono">R$ 200,00</td>
                      <td className="py-3 px-3 font-mono font-bold">R$ 400,00</td>
                    </tr>
                  </tbody>
                </table>
             </div>

             {/* Árvore de Ordem de Serviço (A Mágica do LavaOS) */}
             <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-indigo-800 dark:text-indigo-400 text-lg">Árvore de Execução (Fábrica)</h3>
                  <span className="bg-indigo-200 text-indigo-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Orquestrador Inteligente</span>
                </div>
                
                <p className="text-sm text-indigo-700/70 dark:text-indigo-300 mb-4">
                  O sistema identificou que este Pedido possui itens residenciais e itens de logística. As seguintes OSs serão geradas:
                </p>

                <div className="space-y-4">
                  
                  {/* OS 1: Domiciliar */}
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl">🛋️</div>
                      <div>
                        <h4 className="font-bold text-sm">OS-1042 (Atendimento Domiciliar)</h4>
                        <p className="text-xs text-slate-500">Referente a: Lavagem de Sofá Retrátil</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded">AGUARDANDO APROVAÇÃO</span>
                      <p className="text-[10px] text-slate-400 mt-1">Valor: R$ 0,00 (Faturado no Pedido)</p>
                    </div>
                  </div>

                  {/* OS 2: Logística Coleta */}
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between ml-8 relative before:content-[''] before:absolute before:left-[-16px] before:top-1/2 before:w-4 before:h-[2px] before:bg-indigo-300 before:block">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center text-xl">🚚</div>
                      <div>
                        <h4 className="font-bold text-sm">OS-1043 (Logística de Coleta)</h4>
                        <p className="text-xs text-slate-500">Referente a: Tapetes (Busca na casa do cliente)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded">AGUARDANDO APROVAÇÃO</span>
                    </div>
                  </div>

                  {/* OS 3: Lavagem Interna */}
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between ml-8 relative before:content-[''] before:absolute before:left-[-16px] before:top-1/2 before:w-4 before:h-[2px] before:bg-indigo-300 before:block">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-xl">🏭</div>
                      <div>
                        <h4 className="font-bold text-sm">OS-1044 (Lavagem na Usina)</h4>
                        <p className="text-xs text-slate-500">Referente a: Tapetes (Operação Interna)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded">AGUARDANDO APROVAÇÃO</span>
                    </div>
                  </div>

                </div>

             </div>

           </div>
        </div>

      </div>
    </div>
  );
}
