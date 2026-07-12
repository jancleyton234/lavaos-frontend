'use client';

import React from 'react';

export default function OmnichannelInboxPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      
      {/* 1. Esquerda: Lista de Chats (Bolsão Geral) */}
      <div className="w-80 bg-white dark:bg-slate-950 flex flex-col border-r border-slate-200 dark:border-slate-800 shrink-0 z-10">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-xl font-black text-indigo-600 dark:text-indigo-400">Caixa de Entrada</h1>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 bg-indigo-50 text-indigo-700 font-bold text-xs py-1 rounded">Meus Atendimentos</button>
            <button className="flex-1 bg-slate-100 text-slate-500 font-bold text-xs py-1 rounded">Fila Geral (3)</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Card de Conversa */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-900/10 cursor-pointer border-l-4 border-l-indigo-500 relative">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-sm">João Cardoso</h4>
              <span className="text-[10px] text-slate-400">10:45</span>
            </div>
            <p className="text-xs text-slate-500 truncate">Vou querer fazer a impermeabilização sim.</p>
            <div className="mt-2 flex gap-1">
               <span className="bg-green-100 text-green-700 text-[9px] px-1.5 py-0.5 rounded font-bold">WhatsApp</span>
               <span className="bg-purple-100 text-purple-700 text-[9px] px-1.5 py-0.5 rounded font-bold">TKT-1029</span>
            </div>
          </div>
          
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-sm text-slate-600">Mariana Costa</h4>
              <span className="text-[10px] text-slate-400">Ontem</span>
            </div>
            <p className="text-xs text-slate-500 truncate">Pode me mandar o PDF do laudo?</p>
            <div className="mt-2 flex gap-1">
               <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded font-bold">Instagram</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Centro: Chat Omnichannel */}
      <div className="flex-1 bg-[#e5ddd5] dark:bg-slate-900 flex flex-col relative z-0 shadow-inner">
        <div className="h-16 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-indigo-200">
                <img src="https://i.pravatar.cc/150?img=12" alt="João" className="w-full h-full rounded-full" />
             </div>
             <div>
               <h3 className="font-bold text-sm">João Cardoso</h3>
               <p className="text-xs text-slate-500">Atendido por: Você</p>
             </div>
          </div>
          <button className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow hover:bg-green-700">
            Resolver Atendimento
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
           {/* Info Sistema */}
           <div className="text-center">
             <span className="bg-slate-200/50 dark:bg-slate-900/50 text-slate-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide">
               Atendimento Assumido
             </span>
           </div>

           {/* Balão Humano */}
           <div className="flex justify-end">
             <div className="bg-[#dcf8c6] dark:bg-indigo-900/50 p-3 rounded-xl rounded-tr-none max-w-[70%] shadow-sm text-sm">
               Bom dia João! Analisei as fotos do seu sofá. Para remover a mancha de vinho, recomendo a lavagem profunda com oxigenação. Aproveita e já faz a impermeabilização?
               <span className="text-[10px] text-slate-400 block text-right mt-1">10:42 ✓✓</span>
             </div>
           </div>

           {/* Balão Cliente */}
           <div className="flex justify-start">
             <div className="bg-white dark:bg-slate-800 p-3 rounded-xl rounded-tl-none max-w-[70%] shadow-sm text-sm">
               Vou querer fazer a impermeabilização sim.
               <span className="text-[10px] text-slate-400 block text-right mt-1">10:45</span>
             </div>
           </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <button className="text-slate-400 hover:text-indigo-500 p-2 text-xl">📎</button>
            <input 
              type="text" 
              placeholder="Digite a mensagem via WhatsApp..."
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button className="bg-indigo-600 text-white rounded-lg px-6 py-3 font-bold hover:bg-indigo-700 transition shadow">
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* 3. Direita: Timeline 360 e Memória da IA */}
      <div className="w-[450px] bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-hidden z-10 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)]">
        
        <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <h2 className="font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            CRM 360: Timeline Unificada
          </h2>
          
          {/* Memória da IA */}
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3">
             <h3 className="text-xs font-bold text-yellow-800 dark:text-yellow-500 flex items-center gap-1 mb-2">
               🧠 Memória Comercial da IA
             </h3>
             <ul className="text-[10px] text-yellow-700 dark:text-yellow-400 space-y-1 font-medium list-disc pl-3">
               <li>Costuma responder apenas no período da noite (após 19h).</li>
               <li>Na última OS (0045) o motorista teve problema para achar o endereço. Lembre-o de confirmar ponto de referência.</li>
               <li>Alto índice de conversão para Up-Sell. Sempre ofereça impermeabilização.</li>
             </ul>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="relative border-l-2 border-indigo-100 dark:border-slate-800 ml-3 space-y-8">
            
            {/* Ponto na Timeline: WhatsApp */}
            <div className="relative pl-6">
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-slate-950"></span>
              <div className="text-xs text-slate-400 mb-1 font-bold">Hoje, 10:45 - Módulo 012 (Omnichannel)</div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded shadow-sm border border-slate-100 dark:border-slate-800 text-sm">
                Cliente enviou mensagem de aprovação no WhatsApp.
              </div>
            </div>

            {/* Ponto na Timeline: Orçamento */}
            <div className="relative pl-6">
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-slate-950"></span>
              <div className="text-xs text-slate-400 mb-1 font-bold">Hoje, 10:40 - Módulo 011 (Vendas)</div>
              <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded shadow-sm border border-blue-100 dark:border-blue-900 text-sm">
                <strong>Orçamento ORC-2026-000089 Enviado</strong><br/>
                Valor: R$ 450,00 (Sofá Retrátil + Impermeabilização)
              </div>
            </div>

            {/* Ponto na Timeline: PDV (Pagamento Antigo) */}
            <div className="relative pl-6">
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-white dark:border-slate-950"></span>
              <div className="text-xs text-slate-400 mb-1 font-bold">Há 11 Meses - Módulo 009 (Caixa)</div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded shadow-sm border border-slate-100 dark:border-slate-800 text-sm opacity-75">
                Pagamento aprovado via PIX (R$ 320,00). 
              </div>
            </div>

            {/* Ponto na Timeline: Ordem de Serviço */}
            <div className="relative pl-6">
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-400 border-2 border-white dark:border-slate-950"></span>
              <div className="text-xs text-slate-400 mb-1 font-bold">Há 11 Meses - Módulo 004 (OS)</div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded shadow-sm border border-slate-100 dark:border-slate-800 text-sm opacity-75">
                OS-0045 (Lavagem de Tapetes) <strong>FINALIZADA</strong>.<br/>
                Técnico: Carlos Moura.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
