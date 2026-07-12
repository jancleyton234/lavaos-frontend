'use client';

import React from 'react';

export default function LoyaltyDashboardPage() {
  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200">
      
      {/* Sidebar - Menu (simulado) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-black text-white">LavaOS</h2>
          <p className="text-xs text-slate-500 font-bold tracking-widest mt-1">MÓDULO 021</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 bg-violet-600/10 text-violet-400 px-4 py-3 rounded-lg font-bold border border-violet-500/20">
            <span>📈</span> MRR & Assinaturas
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 transition">
            <span>🎁</span> Clube de Parceiros
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 transition">
            <span>🧠</span> IA Smart Plans
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <header className="p-8 border-b border-slate-800 bg-slate-900/50">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-2">Painel de Assinaturas (MRR)</h1>
              <p className="text-sm text-slate-400">Previsibilidade de receita e retenção ativa de clientes.</p>
            </div>
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-violet-500/20 transition flex items-center gap-2">
              <span>+</span> Novo Plano Recorrente
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          
          {/* Top KPIs */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">MRR (Receita Recorrente)</h3>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-emerald-400">R$ 12.500</span>
                <span className="text-xs text-emerald-500 mb-1 font-bold">+15% vs mês anterior</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assinantes Ativos</h3>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-white">120</span>
                <span className="text-xs text-emerald-500 mb-1 font-bold">+8 novos</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Churn Rate</h3>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-white">2.5%</span>
                <span className="text-xs text-rose-500 mb-1 font-bold">Atenção</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-110 transition duration-500 text-5xl">🧠</div>
              <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Planos Sugeridos (IA)</h3>
              <div className="flex items-end gap-3 relative z-10">
                <span className="text-3xl font-black text-white">45</span>
                <span className="text-xs text-slate-400 mb-1 font-bold">Aguardando aceite</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            
            {/* Tabela de Planos Inteligentes (LavaMind) */}
            <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>🧠</span> Motor de Planos (LavaMind)
                </h3>
              </div>
              
              <div className="space-y-4">
                {/* AI Plan Card */}
                <div className="bg-slate-950 border border-violet-900/50 p-5 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-violet-400 font-bold mb-1">Sugestão: Plano Sofá Sempre Novo</h4>
                      <p className="text-xs text-slate-400">Target: Cliente Residencial Frequente</p>
                    </div>
                    <span className="bg-violet-900/50 text-violet-300 border border-violet-700/50 text-xs px-3 py-1 rounded-full font-bold">
                      R$ 99,90 / mês
                    </span>
                  </div>
                  
                  <div className="bg-slate-900 p-3 rounded border border-slate-800 mb-4 text-xs">
                    <strong className="text-emerald-500 block mb-1">Justificativa da IA:</strong>
                    "Identifiquei 45 clientes que higienizam estofados a cada 6 meses (Custo aprox R$ 600/ano). Este plano dilui o custo e retém o cliente antes que a concorrência oferte o serviço."
                  </div>

                  <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 rounded shadow transition text-sm">
                    Aprovar Campanha de Oferta
                  </button>
                </div>
              </div>
            </div>

            {/* Marketplace de Benefícios */}
            <div className="col-span-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6">
               <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
                  <span>🎁</span> Clube de Parceiros
               </h3>
               
               <div className="space-y-4">
                 
                 <div className="border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                   <div className="w-12 h-12 bg-orange-900/20 text-orange-500 rounded-lg flex items-center justify-center border border-orange-900/50">
                     🛋️
                   </div>
                   <div className="flex-1">
                     <h4 className="font-bold text-sm text-white">Tok&Stok</h4>
                     <p className="text-[10px] text-slate-400">Voucher R$ 100,00</p>
                   </div>
                   <div className="text-right">
                     <span className="block text-sm font-black text-emerald-400">1.000</span>
                     <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Pontos</span>
                   </div>
                 </div>

                 <div className="border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-900/20 text-blue-500 rounded-lg flex items-center justify-center border border-blue-900/50">
                     📐
                   </div>
                   <div className="flex-1">
                     <h4 className="font-bold text-sm text-white">Arq. João Carlos</h4>
                     <p className="text-[10px] text-slate-400">15% OFF Projeto</p>
                   </div>
                   <div className="text-right">
                     <span className="block text-sm font-black text-emerald-400">500</span>
                     <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Pontos</span>
                   </div>
                 </div>

               </div>
               
               <button className="w-full mt-6 border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 font-bold py-3 rounded-xl transition text-sm">
                 + Cadastrar Novo Parceiro
               </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
