'use client';

import React from 'react';

export default function LavaMindPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 font-sans text-slate-200">
      
      {/* Esquerda: Terminal Multiagente (60%) */}
      <div className="flex-1 flex flex-col min-w-[60%] border-r border-slate-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        
        {/* Header LavaMind */}
        <header className="p-6 border-b border-slate-800/50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
               <span className="text-xl">🧠</span>
             </div>
             <div>
               <h1 className="text-2xl font-black tracking-tight text-white">LavaMind Master</h1>
               <p className="text-xs text-violet-400 font-bold uppercase tracking-widest">Inteligência Artificial Corporativa</p>
             </div>
          </div>
          <div className="flex gap-4 text-xs font-bold text-slate-500">
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Memória Semântica Ativa</span>
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Orquestrador Online</span>
          </div>
        </header>

        {/* Terminal de Chat Multiagente */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
           
           <div className="text-center text-[10px] text-slate-600 font-mono mb-8">CONEXÃO SEGURA ESTABELECIDA. 16 MÓDULOS SINCRONIZADOS.</div>

           {/* Pergunta Humano */}
           <div className="flex justify-end">
             <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg text-sm text-white">
               Identificamos uma queda na receita de Itamaraju. O que podemos fazer hoje para injetar caixa rápido?
             </div>
           </div>

           {/* Resposta LavaMind Master (Roteamento) */}
           <div className="flex justify-start">
             <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl rounded-tl-none max-w-[85%] shadow-lg text-sm">
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-6 h-6 rounded-full bg-violet-900/50 flex items-center justify-center text-[10px]">🧠</div>
                 <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">LavaMind Master Orquestrador</span>
               </div>
               <p className="text-slate-300">Recebido. Consultando o Data Warehouse e acionando o <strong>Especialista de Marketing</strong> e o <strong>Especialista em BI</strong> para elaborar uma Missão Inteligente.</p>
             </div>
           </div>

           {/* Resposta Especialista Marketing */}
           <div className="flex justify-start">
             <div className="bg-slate-900/80 border border-fuchsia-900/30 p-4 rounded-2xl rounded-tl-none max-w-[85%] shadow-[0_0_15px_rgba(192,38,211,0.05)] text-sm ml-8 relative">
               <div className="absolute -left-3 top-4 w-3 h-[1px] bg-slate-700"></div>
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-6 h-6 rounded-full bg-fuchsia-900/50 flex items-center justify-center text-[10px]">🎯</div>
                 <span className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Especialista de Marketing</span>
               </div>
               <p className="text-slate-300 mb-4">
                 Analisei o banco de dados. Temos <strong>52 clientes em Itamaraju</strong> que lavaram tapetes há mais de 11 meses. A probabilidade de fechamento é altíssima (82%) segundo nossa memória semântica.
               </p>
               <p className="text-slate-300 mb-4">
                 Preparei a <strong>Missão: Recuperação de Inativos</strong>. Se o senhor aprovar, eu criarei os textos personalizados e pedirei ao Módulo Omnichannel para disparar agora mesmo via WhatsApp.
               </p>
               
               {/* Missão Card Inline */}
               <div className="bg-black/50 border border-slate-800 rounded-xl p-4">
                 <div className="flex justify-between items-center mb-2">
                   <h4 className="font-bold text-white">Missão: Recuperação de Inativos</h4>
                   <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] px-2 py-1 rounded-full font-bold">AGUARDANDO APROVAÇÃO</span>
                 </div>
                 <p className="text-xs text-slate-400 mb-3">Retorno estimado: <strong className="text-emerald-400 font-mono">R$ 10.400,00</strong></p>
                 
                 <div className="flex gap-2">
                   <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg hover:opacity-90 transition w-full">
                     Autorizar Missão Inteligente (Human-in-the-Loop)
                   </button>
                 </div>
               </div>
             </div>
           </div>

        </main>

        {/* Input Master */}
        <div className="p-6 bg-slate-900/50 border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-3 relative">
            <input 
              type="text" 
              placeholder="Dê um comando ao LavaMind Master..."
              className="flex-1 bg-black/50 border border-slate-700 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-violet-500 transition shadow-inner"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-white text-black rounded-lg px-6 font-black hover:bg-slate-200 transition">
              Comandar
            </button>
          </div>
        </div>

      </div>

      {/* Direita: Painel de Controle de Missões (40%) */}
      <div className="w-[40%] bg-slate-950 flex flex-col h-full z-10 overflow-y-auto">
        
        <div className="p-6 border-b border-slate-800/50">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            🚀 Missões em Andamento
          </h2>
          <p className="text-xs text-slate-500 mt-1">Acompanhe a execução dos Agentes Autônomos.</p>
        </div>

        <div className="p-6 space-y-4">
           
           {/* Card Missão Ativa */}
           <div className="bg-slate-900 border border-slate-700 p-5 rounded-2xl shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-white text-sm">Campanha: Estofados Premium</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Líder: Especialista Comercial</p>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-500">
                  75%
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-slate-400 line-through">Segmentar público (Data Warehouse)</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-slate-400 line-through">Redigir copy (IA Marketing)</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-slate-400 line-through">Disparar WhatsApp (Módulo 012)</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-white bg-slate-800 p-2 rounded">
                  <span className="text-violet-500 animate-pulse">↻</span>
                  <span>Acompanhar conversões (CRM)</span>
                </div>
              </div>
           </div>

           {/* Memória Semântica Preview */}
           <div className="mt-8">
             <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Memória Semântica Recente</h2>
             <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
               <div className="text-xs">
                 <span className="text-emerald-400 font-bold">[Aprendizado CRM]</span>
                 <p className="text-slate-400 mt-1">Clientes de Teixeira de Freitas respondem 15% melhor a mensagens com imagens de "Antes/Depois" do que mensagens de texto puro.</p>
               </div>
               <div className="w-full h-[1px] bg-slate-800"></div>
               <div className="text-xs">
                 <span className="text-emerald-400 font-bold">[Aprendizado Fábrica]</span>
                 <p className="text-slate-400 mt-1">A Extratora IPC 01 falha quando alocada para tapetes persas grossos. O Agente de Produção ajustou o roteamento.</p>
               </div>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
