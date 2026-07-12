'use client';

import React from 'react';

export default function QuotesAndOmnichannelPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      
      {/* Lado Esquerdo: Kanban de Vendas */}
      <div className="flex-1 flex flex-col min-w-[60%] border-r border-slate-200 dark:border-slate-800">
        
        <header className="p-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">CRM de Orçamentos</h1>
            <p className="text-sm text-slate-500">Funil de Vendas Inteligente (Módulo 011)</p>
          </div>
          <div className="flex gap-2 text-sm font-bold">
            <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded">Taxa de Conversão: 68%</div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded">Receita Prevista: R$ 12.450</div>
          </div>
        </header>

        {/* Board Kanban */}
        <div className="flex-1 overflow-x-auto p-6 flex gap-4 bg-slate-100 dark:bg-slate-900/50">
          
          {/* Coluna: Novos / IA Respondendo */}
          <div className="w-80 shrink-0 flex flex-col h-full">
            <h3 className="font-bold mb-3 text-slate-500 text-sm flex justify-between">
              <span>IA RESPONDENDO (WHATSAPP)</span>
              <span className="bg-slate-200 text-slate-700 rounded-full px-2">1</span>
            </h3>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer border-l-4 border-l-blue-500 animate-pulse">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>ORC-2026-000045</span>
                <span>Há 2 min</span>
              </div>
              <h4 className="font-bold text-sm">Cliente (11) 9999-8888</h4>
              <p className="text-xs text-slate-500 mt-1">🤖 IA Lendo imagem do Sofá...</p>
            </div>
          </div>

          {/* Coluna: Enviados */}
          <div className="w-80 shrink-0 flex flex-col h-full">
            <h3 className="font-bold mb-3 text-slate-500 text-sm flex justify-between">
              <span>ENVIADOS</span>
              <span className="bg-slate-200 text-slate-700 rounded-full px-2">2</span>
            </h3>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer border-l-4 border-l-yellow-500">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>ORC-2026-000044</span>
                <span className="text-red-500 font-bold">Follow-up Pendente</span>
              </div>
              <h4 className="font-bold text-sm">Condomínio Alphaville</h4>
              <p className="font-mono text-green-600 font-bold mt-1 text-sm">R$ 1.250,00</p>
            </div>
          </div>

          {/* Coluna: Em Negociação */}
          <div className="w-80 shrink-0 flex flex-col h-full">
            <h3 className="font-bold mb-3 text-slate-500 text-sm flex justify-between">
              <span>EM NEGOCIAÇÃO</span>
              <span className="bg-slate-200 text-slate-700 rounded-full px-2">1</span>
            </h3>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl shadow-sm border border-indigo-200 dark:border-indigo-800 cursor-pointer border-l-4 border-l-indigo-500 relative">
              <span className="absolute -top-2 -right-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 text-[8px] text-white items-center justify-center">1</span>
              </span>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>ORC-2026-000042</span>
                <span>Versão 2</span>
              </div>
              <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200">Maria Silva</h4>
              <p className="font-mono text-indigo-600 font-bold mt-1 text-sm">R$ 280,00</p>
              <p className="text-xs text-slate-500 mt-2">🧑 Humano assumiu o chat.</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Lado Direito: Omnichannel (WhatsApp Thread) */}
      <div className="w-[40%] bg-white dark:bg-slate-950 flex flex-col h-full shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10">
        
        {/* Cabeçalho do Chat */}
        <div className="h-16 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-indigo-200">
                <img src="https://i.pravatar.cc/150?img=5" alt="Maria" className="w-full h-full rounded-full" />
             </div>
             <div>
               <h3 className="font-bold text-sm leading-tight">Maria Silva</h3>
               <p className="text-xs text-slate-500">ORC-2026-000042 (V2)</p>
             </div>
          </div>
          <div className="text-green-500 font-bold text-xs">🟢 WhatsApp Online</div>
        </div>

        {/* Mensagens (Thread) */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] dark:bg-slate-800 space-y-4">
           {/* Balão Cliente */}
           <div className="flex justify-start">
             <div className="bg-white dark:bg-slate-700 p-3 rounded-xl rounded-tl-none max-w-[80%] shadow-sm text-sm">
               Oi, quanto fica pra lavar meu sofá?
               <div className="mt-2 w-48 h-32 bg-slate-200 rounded overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80" alt="Sofá Cliente" className="w-full h-full object-cover" />
               </div>
               <span className="text-[10px] text-slate-400 block text-right mt-1">10:42</span>
             </div>
           </div>

           {/* Balão IA (Automático) */}
           <div className="flex justify-end">
             <div className="bg-[#dcf8c6] dark:bg-indigo-900/50 p-3 rounded-xl rounded-tr-none max-w-[80%] shadow-sm text-sm">
               <span className="text-[10px] text-indigo-500 font-bold block mb-1">🤖 Assistente Virtual</span>
               Olá! Pela foto, parece ser um sofá retrátil de 3 lugares de suede. O valor da higienização fica **R$ 300,00**.<br/><br/>
               Você pode aprovar direto por este link: lavaos.com/orc/123
               <span className="text-[10px] text-slate-400 block text-right mt-1">10:43</span>
             </div>
           </div>

           {/* Balão Cliente Negociando */}
           <div className="flex justify-start">
             <div className="bg-white dark:bg-slate-700 p-3 rounded-xl rounded-tl-none max-w-[80%] shadow-sm text-sm">
               Tem desconto para pagamento no PIX? Faz por 280?
               <span className="text-[10px] text-slate-400 block text-right mt-1">10:55</span>
             </div>
           </div>
           
           {/* Aviso do Sistema */}
           <div className="text-center">
             <span className="bg-slate-200/50 dark:bg-slate-900/50 text-slate-500 text-xs px-3 py-1 rounded-full font-bold">
               A IA detectou negociação de preço e transferiu para um humano.
             </span>
           </div>
        </div>

        {/* Input de Mensagem */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <button className="text-slate-400 hover:text-indigo-500 p-2 text-xl">+</button>
            <input 
              type="text" 
              placeholder="Digite a mensagem ou gere a Versão 2..."
              className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button className="bg-indigo-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-indigo-700 transition shadow">
              ➤
            </button>
          </div>
          <div className="mt-2 flex justify-center gap-2">
             <button className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-200">Gerar Versão 2 (Desconto)</button>
             <button className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-1 rounded border border-slate-300">Inserir Template (Ex: PIX)</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
