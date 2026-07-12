'use client';

import React from 'react';

export default function BiDashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      
      {/* Esquerda: Gráficos OLAP (65%) */}
      <div className="flex-1 flex flex-col min-w-[65%] border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
        
        <header className="p-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-black text-blue-600 dark:text-blue-500 tracking-tight">Data Warehouse & Analytics</h1>
              <p className="text-sm text-slate-500">Módulo 018 - Enterprise Business Intelligence</p>
            </div>
            <div className="flex gap-2">
              <select className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm font-bold shadow-sm">
                <option>Últimos 12 Meses</option>
                <option>YTD (Year to Date)</option>
                <option>Q3 2026</option>
              </select>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          
          <div className="grid grid-cols-2 gap-6">
            
            {/* Gráfico Simulado (Treemap) */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-black mb-4">Receita por Serviço (Treemap)</h3>
              <div className="flex flex-col gap-2 h-48">
                <div className="flex gap-2 h-[60%]">
                  <div className="bg-blue-500 text-white p-3 rounded-lg flex-1 flex flex-col justify-between">
                    <span className="font-bold text-sm">Sofá Retrátil</span>
                    <span className="text-2xl font-black">R$ 145K</span>
                  </div>
                  <div className="bg-indigo-500 text-white p-3 rounded-lg w-[35%] flex flex-col justify-between">
                    <span className="font-bold text-sm">Tapetes</span>
                    <span className="text-xl font-black">R$ 82K</span>
                  </div>
                </div>
                <div className="flex gap-2 h-[40%]">
                  <div className="bg-emerald-500 text-white p-2 rounded-lg w-[40%] flex flex-col justify-between">
                    <span className="font-bold text-xs">Impermeabilização</span>
                    <span className="text-lg font-black">R$ 45K</span>
                  </div>
                  <div className="bg-slate-500 text-white p-2 rounded-lg flex-1 flex flex-col justify-between">
                    <span className="font-bold text-xs">Outros</span>
                    <span className="text-lg font-black">R$ 12K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drill Down de Unidades */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-black mb-4 flex justify-between">
                <span>Performance de Franquias</span>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Drill Down (Filial)</span>
              </h3>
              <table className="w-full text-sm text-left">
                 <thead className="text-[10px] text-slate-400 uppercase">
                   <tr>
                     <th className="pb-2">Unidade</th>
                     <th className="pb-2">Lucro (YTD)</th>
                     <th className="pb-2">Var %</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr className="border-t border-slate-100 dark:border-slate-800">
                     <td className="py-3 font-bold">Matriz Teixeira</td>
                     <td className="py-3 font-mono">R$ 112.400</td>
                     <td className="py-3 text-emerald-500 font-bold">▲ 8%</td>
                   </tr>
                   <tr className="border-t border-slate-100 dark:border-slate-800">
                     <td className="py-3 font-bold">Filial Itamaraju</td>
                     <td className="py-3 font-mono">R$ 84.100</td>
                     <td className="py-3 text-red-500 font-bold">▼ 12%</td>
                   </tr>
                 </tbody>
              </table>
            </div>

          </div>
          
        </main>
      </div>

      {/* Direita: Business Advisor & Radar (35%) */}
      <div className="w-[35%] bg-slate-100 dark:bg-slate-900 flex flex-col h-full shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10 overflow-y-auto">
        
        {/* Radar de Oportunidades (Machine Learning) */}
        <div className="p-6">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <span className="text-2xl">📡</span> Radar de Oportunidades
          </h2>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 p-5 rounded-2xl shadow-sm">
            <span className="bg-emerald-500 text-white text-[10px] px-2 py-1 rounded font-black uppercase tracking-wider">Descoberta da IA</span>
            <h3 className="font-bold text-emerald-900 dark:text-emerald-400 mt-3 text-lg">Retenção de Tapetes</h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-300 mt-2">
              A varredura no DW encontrou <strong>52 clientes</strong> que lavaram tapetes entre 11 e 13 meses atrás e ainda não retornaram. O LTV (Lifetime Value) indica pico de recompra neste período.
            </p>
            <div className="mt-4 bg-white/50 dark:bg-black/20 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-[10px] text-emerald-600 uppercase font-bold">Receita Estimada</p>
                <p className="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400">R$ 10.400,00</p>
              </div>
              <button className="bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-emerald-700 transition">
                Aprovar Disparo 1-Click
              </button>
            </div>
            <p className="text-[10px] text-emerald-600 mt-3 text-center">Isso acionará o Módulo 012 (Omnichannel) via WhatsApp Oficial.</p>
          </div>
        </div>

        {/* Business Advisor (Diagnóstico) */}
        <div className="p-6 pt-0">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <span className="text-2xl">💼</span> Business Advisor
          </h2>

          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <h3 className="font-bold text-slate-800 dark:text-white">Alerta de Receita</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sua receita caiu <strong className="text-red-500">12% nesta semana</strong> na filial Itamaraju.
            </p>
            
            <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Causas Raízes Identificadas (ETL)</p>
              <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-red-400">↳</span> Aumento de 20% nos cancelamentos de orçamentos fechados (Módulo 011).
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">↳</span> Extratora IPC 01 quebrou, reduzindo capacidade em 15% (Módulo 015).
                </li>
              </ul>
            </div>

            <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Plano de Ação Sugerido</p>
              <div className="space-y-2">
                <button className="w-full text-left bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-lg hover:border-blue-500 transition">
                  <p className="text-sm font-bold text-blue-600">Aprovar conserto IPC 01</p>
                  <p className="text-xs text-slate-500">Custo: R$ 450,00 (Módulo 014)</p>
                </button>
                <button className="w-full text-left bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-lg hover:border-blue-500 transition">
                  <p className="text-sm font-bold text-blue-600">Oferecer 10% Off</p>
                  <p className="text-xs text-slate-500">Disparar cupom para orçamentos cancelados.</p>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
