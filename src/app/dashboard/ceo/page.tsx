'use client';

import React from 'react';

export default function CeoCommandCenterPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      
      {/* Esquerda: Dashboard Consolidado (70%) */}
      <div className="flex-1 flex flex-col min-w-[70%] border-r border-slate-300 dark:border-slate-800 overflow-y-auto">
        
        {/* Header do CEO */}
        <header className="p-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg text-white font-black text-xl">L</div>
             <div>
               <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">Centro de Comando</h1>
               <p className="text-sm text-slate-500 font-bold">Lava-Me Group • Multiunidade</p>
             </div>
          </div>
          <div className="flex gap-2">
            <select className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm font-bold shadow-sm">
              <option>Todas as Unidades (Consolidado)</option>
              <option>Matriz Teixeira</option>
              <option>Filial Itamaraju</option>
            </select>
          </div>
        </header>

        <main className="p-6 space-y-6">
           
           {/* Topo: Score e Alertas */}
           <div className="grid grid-cols-3 gap-6">
             
             {/* Health Score da Empresa */}
             <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-[-20px] right-[-20px] text-white/10 text-9xl">🌿</div>
                <h3 className="font-bold text-emerald-100 relative z-10">Saúde da Empresa (IA)</h3>
                <div className="flex items-end gap-2 mt-4 relative z-10">
                  <span className="text-6xl font-black tracking-tighter">92</span>
                  <span className="text-emerald-200 font-bold mb-2">/ 100</span>
                </div>
                <div className="mt-4 flex gap-4 text-xs font-bold text-emerald-100 relative z-10">
                  <span>Finanças: 95</span>
                  <span>Vendas: 90</span>
                  <span>Fábrica: 85</span>
                </div>
             </div>

             {/* Smart Alerts */}
             <div className="col-span-2 bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="font-black mb-4 flex gap-2 items-center">
                  <span className="text-red-500">🔴</span> Alertas Críticos (Action Required)
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-red-900 dark:text-red-300">Ruptura de Estoque Iminente (Usina Matriz)</p>
                      <p className="text-xs text-red-700 dark:text-red-400 mt-1">Faltam 2 horas para vencer o estoque de sabão e a Usina vai parar.</p>
                    </div>
                    <button className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-red-700">Comprar Agora</button>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 rounded flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-yellow-900 dark:text-yellow-300">Gargalo de Produção (Secagem)</p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">Tapete Persa 3x2 está parado há 48h. Atraso previsto.</p>
                    </div>
                    <button className="bg-white border border-yellow-300 text-yellow-800 text-xs font-bold px-3 py-1.5 rounded">Notificar Líder</button>
                  </div>
                </div>
             </div>

           </div>

           {/* KPIs Macro */}
           <div className="grid grid-cols-4 gap-4">
             <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
               <p className="text-xs font-bold text-slate-500 mb-1">RECEITA BRUTA (MÊS)</p>
               <h3 className="text-xl font-black text-slate-800 dark:text-white">R$ 67.000,00</h3>
               <p className="text-[10px] text-emerald-500 font-bold mt-1">▲ +12% vs meta</p>
             </div>
             <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
               <p className="text-xs font-bold text-slate-500 mb-1">LUCRO LÍQUIDO</p>
               <h3 className="text-xl font-black text-slate-800 dark:text-white">R$ 24.500,00</h3>
               <p className="text-[10px] text-emerald-500 font-bold mt-1">▲ Margem de 36%</p>
             </div>
             <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
               <p className="text-xs font-bold text-slate-500 mb-1">OS NA FILA (FÁBRICA)</p>
               <h3 className="text-xl font-black text-slate-800 dark:text-white">42 itens</h3>
               <p className="text-[10px] text-red-500 font-bold mt-1">▼ 1 gargalo detectado</p>
             </div>
             <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
               <p className="text-xs font-bold text-slate-500 mb-1">NOVOS LEADS (CRM)</p>
               <h3 className="text-xl font-black text-slate-800 dark:text-white">125</h3>
               <p className="text-[10px] text-emerald-500 font-bold mt-1">▲ Conversão 65%</p>
             </div>
           </div>

           {/* Ranking de Unidades */}
           <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
             <h3 className="font-black mb-4">Ranking de Unidades (Franquias)</h3>
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-900 uppercase">
                  <tr>
                    <th className="py-2 px-3">Unidade</th>
                    <th className="py-2 px-3">Faturamento</th>
                    <th className="py-2 px-3">Lucro Líquido</th>
                    <th className="py-2 px-3">NPS (Qualidade)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-3 font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Matriz Teixeira
                    </td>
                    <td className="py-3 px-3 font-mono">R$ 45.000,00</td>
                    <td className="py-3 px-3 font-mono text-emerald-600 font-bold">R$ 16.200,00</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">9.4</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Filial Itamaraju
                    </td>
                    <td className="py-3 px-3 font-mono">R$ 22.000,00</td>
                    <td className="py-3 px-3 font-mono text-emerald-600 font-bold">R$ 8.300,00</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">8.9</td>
                  </tr>
                </tbody>
             </table>
           </div>

        </main>
      </div>

      {/* Direita: CEO Copilot (30%) */}
      <div className="w-[30%] bg-white dark:bg-slate-950 flex flex-col h-full shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10 border-l border-slate-200 dark:border-slate-800">
        
        {/* Header do Copilot */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white shrink-0 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl shadow ring-1 ring-white/20">
            🤖
          </div>
          <div>
            <h2 className="font-black text-lg">CEO Copilot</h2>
            <p className="text-xs text-slate-300">Assistente Omnisciente</p>
          </div>
        </div>

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50 dark:bg-slate-900 space-y-4">
           <div className="text-center text-[10px] text-slate-400 font-bold mb-6 uppercase tracking-widest">
             Conectado a todos os módulos
           </div>

           {/* Pergunta Humano */}
           <div className="flex justify-end">
             <div className="bg-slate-800 p-4 rounded-2xl rounded-tr-none max-w-[85%] shadow-md text-sm text-white">
               Quanto lucro tivemos apenas com higienização de estofados nesta semana?
             </div>
           </div>

           {/* Resposta IA */}
           <div className="flex justify-start">
             <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl rounded-tl-none max-w-[95%] shadow-md text-sm border border-slate-200 dark:border-slate-800">
               <span className="text-[10px] text-indigo-500 font-bold block mb-2 uppercase tracking-wide">🔍 Cruzando Módulo 014 (Financeiro) e 002 (Catálogo)</span>
               O lucro líquido com higienização de estofados nesta semana foi de <strong className="text-emerald-600 text-base">R$ 14.500,00</strong>.<br/><br/>
               Isto representa <strong>65% da sua margem líquida total</strong>. Notei que a unidade de <em>Itamaraju</em> puxou esse número para cima, superando a Matriz neste serviço específico em 15%.
               
               <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 rounded-lg text-indigo-800 dark:text-indigo-300">
                 <p className="text-xs font-bold mb-1">💡 Sugestão Estratégica</p>
                 <p className="text-xs">Deseja que eu crie uma campanha no WhatsApp (Módulo 012) oferecendo impermeabilização para os clientes de estofados que não contrataram o combo na Matriz?</p>
               </div>
               
               <div className="mt-3 flex gap-2">
                 <button className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-lg font-bold shadow hover:bg-indigo-700 transition">Aprovar Campanha</button>
               </div>
             </div>
           </div>
        </div>

        {/* Input da IA */}
        <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Pergunte ao LavaOS..."
              className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 font-bold hover:bg-indigo-700 transition shadow-lg">
              Enviar
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2">A IA lê os 16 módulos da empresa em tempo real.</p>
        </div>

      </div>
    </div>
  );
}
