'use client';

import React from 'react';

export default function ComplianceDashboardPage() {
  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-black text-white">LavaOS</h2>
          <p className="text-xs text-slate-500 font-bold tracking-widest mt-1">MÓDULO 027</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 bg-red-600/10 text-red-400 px-4 py-3 rounded-lg font-bold border border-red-500/20">
            <span>🛡️</span> Risco e Compliance
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 transition">
            <span>🕵️</span> Auditoria de Logs
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 transition">
            <span>⚖️</span> Adequação LGPD
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 transition">
            <span>🤖</span> Decisões IA (XAI)
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <header className="p-8 border-b border-slate-800 bg-slate-900/50">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-2">Governança Corporativa</h1>
              <p className="text-sm text-slate-400">Proteção de dados, Rastreabilidade (Logs Imutáveis) e Painel de Riscos Operacionais.</p>
            </div>
            <div className="flex gap-4">
              <span className="bg-slate-800 border border-slate-700 text-slate-400 py-2 px-4 rounded-lg flex items-center gap-2 text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Modo Auditor: OFF
              </span>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-red-500/20 transition flex items-center gap-2">
                Exportar Logs (Cold Storage)
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          
          <div className="grid grid-cols-3 gap-8">
            
            {/* Painel de Risco Operacional */}
            <div className="col-span-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6">
               <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
                 <span>📈</span> Índice de Risco (LavaMind)
               </h3>
               
               <div className="flex flex-col items-center mb-6">
                 <div className="w-32 h-32 rounded-full border-8 border-emerald-500/20 flex items-center justify-center relative">
                   <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-t-transparent border-r-transparent transform -rotate-45"></div>
                   <span className="text-4xl font-black text-emerald-400">3.2</span>
                 </div>
                 <span className="text-xs font-bold text-slate-400 mt-2 tracking-widest uppercase">Risco Baixo</span>
               </div>

               <div className="space-y-4">
                 <div className="border-l-2 border-red-500 pl-3">
                   <h4 className="text-sm font-bold text-white flex justify-between">
                     Acesso Incomum <span className="text-red-400">+1.7 pts</span>
                   </h4>
                   <p className="text-xs text-slate-400 mt-1">3 logins realizados fora do horário comercial (Usuário: Atendente).</p>
                 </div>

                 <div className="border-l-2 border-amber-500 pl-3">
                   <h4 className="text-sm font-bold text-white flex justify-between">
                     Retrabalho (Garantia) <span className="text-amber-400">+1.5 pts</span>
                   </h4>
                   <p className="text-xs text-slate-400 mt-1">Aumento de 12% nos chamados de Garantia na última semana.</p>
                 </div>
               </div>
               
               <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                 <strong className="text-red-400 block mb-1">Recomendação IA (XAI):</strong>
                 Auditoria nas políticas de Home-Office e revisão de treinamento da Equipe de Higienização B.
               </div>
            </div>

            {/* Linha do Tempo de Auditoria */}
            <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>🕵️</span> Timeline Global de Auditoria
                </h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Buscar ID de Cliente ou Pedido..." className="bg-slate-950 border border-slate-800 rounded text-sm px-3 py-1 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 w-64" />
                </div>
              </div>
              
              <div className="relative border-l border-slate-800 ml-4 space-y-8 pb-4">
                
                {/* Evento 1 */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-slate-900 border-2 border-emerald-500 rounded-full -left-[1.5px] top-1"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500">04 Jul 2026, 14:00</span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">UPDATE</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Marcou como Pago (Pedido #1020)</h4>
                  <p className="text-xs text-slate-400">Usuário: Maria Financeiro (IP: 192.168.0.5)</p>
                </div>

                {/* Evento 2 (AI_DECISION) */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-slate-900 border-2 border-fuchsia-500 rounded-full -left-[1.5px] top-1"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500">04 Jul 2026, 10:30</span>
                    <span className="text-[9px] bg-fuchsia-900/30 border border-fuchsia-500/50 text-fuchsia-400 px-2 py-0.5 rounded font-bold">AI_DECISION</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Aprovou desconto de 15% (Pedido #1020)</h4>
                  <p className="text-xs text-slate-400 mb-2">Usuário: LAVAMIND_AI</p>
                  
                  <div className="bg-fuchsia-900/10 border border-fuchsia-500/20 p-3 rounded-lg text-xs">
                    <strong className="text-fuchsia-400 block mb-1">Explicabilidade da IA (XAI):</strong>
                    "Identifiquei que este é um Cliente Nível Ouro, mas com risco de churn alto (não compra há 9 meses). O desconto de 15% mantém a margem bruta da empresa acima do mínimo aceitável (42%) e garante a retenção."
                  </div>
                </div>

                {/* Evento 3 */}
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-slate-900 border-2 border-blue-500 rounded-full -left-[1.5px] top-1"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500">04 Jul 2026, 10:00</span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">CREATE</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Criou o Pedido #1020</h4>
                  <p className="text-xs text-slate-400">Usuário: João Silva (IP: 192.168.0.12)</p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
