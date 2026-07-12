'use client';

import React from 'react';

export default function FranchisorDashboardPage() {
  return (
    <div className="flex h-screen bg-neutral-950 font-sans text-neutral-200">
      
      {/* Sidebar (God Mode) */}
      <aside className="w-64 bg-black border-r border-neutral-900 flex flex-col">
        <div className="p-6 border-b border-neutral-900">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] rounded-sm"></div>
            <h2 className="text-xl font-black text-white">LavaOS</h2>
          </div>
          <p className="text-[10px] text-purple-500 font-bold tracking-widest uppercase">Franchisor Hub (SaaS)</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 bg-purple-900/20 text-purple-400 px-4 py-3 rounded-lg font-bold border border-purple-500/20">
            <span>🌍</span> Visão Global
          </a>
          <a href="#" className="flex items-center gap-3 text-neutral-400 hover:text-white px-4 py-3 transition">
            <span>🏢</span> Minhas Franquias
          </a>
          <a href="#" className="flex items-center gap-3 text-neutral-400 hover:text-white px-4 py-3 transition">
            <span>💳</span> Faturamento (MRR)
          </a>
          <a href="#" className="flex items-center gap-3 text-neutral-400 hover:text-white px-4 py-3 transition">
            <span>⚙️</span> Templates Industriais
          </a>
          <a href="#" className="flex items-center gap-3 text-neutral-400 hover:text-white px-4 py-3 transition mt-8">
            <span>🛒</span> Marketplace (App Store)
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <header className="p-8 border-b border-neutral-900 bg-neutral-900/30">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-2">Central do Franqueador</h1>
              <p className="text-sm text-neutral-400">Visão consolidada de todas as franquias da rede Lava-Me.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-purple-500/20 transition flex items-center gap-2">
                <span>+</span> Nova Franquia
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          
          {/* Top KPIs */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <p className="text-sm text-neutral-500 font-bold mb-1">Franquias Ativas</p>
              <h2 className="text-4xl font-black text-white">42</h2>
              <p className="text-xs text-emerald-500 font-bold mt-2">+3 este mês</p>
            </div>
            
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <p className="text-sm text-neutral-500 font-bold mb-1">Faturamento da Rede (GMV)</p>
              <h2 className="text-4xl font-black text-emerald-400"><span className="text-xl text-neutral-500">R$</span> 308k</h2>
              <p className="text-xs text-emerald-500 font-bold mt-2">+12% vs último mês</p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <p className="text-sm text-neutral-500 font-bold mb-1">Royalties (5%)</p>
              <h2 className="text-4xl font-black text-amber-400"><span className="text-xl text-neutral-500">R$</span> 15.4k</h2>
              <p className="text-xs text-neutral-400 font-bold mt-2">A Receber</p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <p className="text-sm text-neutral-500 font-bold mb-1">SaaS MRR</p>
              <h2 className="text-4xl font-black text-blue-400"><span className="text-xl text-neutral-500">R$</span> 21.0k</h2>
              <p className="text-xs text-neutral-400 font-bold mt-2">Licenciamento de Software</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            
            {/* Tabela de Ranking de Franquias */}
            <div className="col-span-2 bg-black border border-neutral-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-white">Ranking de Franquias</h3>
                <button className="text-xs text-purple-400 font-bold hover:text-purple-300">Ver todas &rarr;</button>
              </div>
              
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-neutral-500 border-b border-neutral-800">
                    <th className="pb-3 font-medium">Franquia</th>
                    <th className="pb-3 font-medium">Plano SaaS</th>
                    <th className="pb-3 font-medium">Faturamento</th>
                    <th className="pb-3 font-medium">Status Operacional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  <tr>
                    <td className="py-4">
                      <div className="font-bold text-white">Lava-Me Itamaraju (Matriz)</div>
                      <div className="text-xs text-neutral-500">itamaraju.os.lavame.com.br</div>
                    </td>
                    <td className="py-4"><span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs font-bold border border-purple-500/20">ENTERPRISE</span></td>
                    <td className="py-4 font-bold text-emerald-400">R$ 85.000,00</td>
                    <td className="py-4"><span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> EXCELENTE</span></td>
                  </tr>
                  <tr>
                    <td className="py-4">
                      <div className="font-bold text-white">Lava-Me Teixeira de Freitas</div>
                      <div className="text-xs text-neutral-500">teixeira.os.lavame.com.br</div>
                    </td>
                    <td className="py-4"><span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs font-bold border border-blue-500/20">BUSINESS</span></td>
                    <td className="py-4 font-bold text-emerald-400">R$ 62.000,00</td>
                    <td className="py-4"><span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> BOM</span></td>
                  </tr>
                  <tr>
                    <td className="py-4">
                      <div className="font-bold text-white">Lava-Me Eunápolis</div>
                      <div className="text-xs text-neutral-500">eunapolis.os.lavame.com.br</div>
                    </td>
                    <td className="py-4"><span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs font-bold border border-blue-500/20">BUSINESS</span></td>
                    <td className="py-4 font-bold text-neutral-300">R$ 21.500,00</td>
                    <td className="py-4"><span className="text-amber-400 text-xs font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> ATENÇÃO</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* AI Insights */}
            <div className="col-span-1 bg-black border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
              <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
                <span>🧠</span> LavaMind Insights
              </h3>
              
              <div className="space-y-4">
                <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Risco Operacional
                  </h4>
                  <p className="text-xs text-neutral-400">
                    A Franquia <strong>Eunápolis</strong> teve queda de 18% no faturamento esta semana, acompanhada de um aumento em chamados de suporte técnico.
                  </p>
                  <button className="mt-3 text-xs bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded font-bold border border-amber-500/20 w-full hover:bg-amber-500/20 transition">
                    Acionar Fundo de Marketing
                  </button>
                </div>
                
                <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Expansão
                  </h4>
                  <p className="text-xs text-neutral-400">
                    A unidade Matriz atingiu o limite de licenças de usuários (15/15) por 3 dias seguidos. Há uma oportunidade clara de Upgrade SaaS.
                  </p>
                  <button className="mt-3 text-xs bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded font-bold border border-purple-500/20 w-full hover:bg-purple-500/20 transition">
                    Enviar Proposta de Upgrade
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
