'use client';

import React from 'react';

export default function MesTvModePage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white font-sans flex flex-col">
      
      {/* Header Escuro Modo TV */}
      <header className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-black text-indigo-400 tracking-tighter uppercase">LavaOS Fábrica</h1>
          <span className="bg-indigo-600 text-white text-sm px-3 py-1 font-bold rounded-full animate-pulse">
            AO VIVO
          </span>
        </div>
        <div className="flex gap-6 text-xl font-bold text-slate-400">
          <div><span className="text-white">42</span> na Fila</div>
          <div><span className="text-green-400">5</span> Operadores</div>
          <div><span className="text-red-400">1</span> Gargalo</div>
        </div>
      </header>

      {/* Body da Esteira */}
      <div className="flex-1 p-6 grid grid-cols-4 gap-6 overflow-hidden bg-slate-950">
        
        {/* Coluna Triagem */}
        <div className="flex flex-col bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-slate-800 p-4 border-b border-slate-700 text-center">
            <h2 className="text-2xl font-black text-slate-300">1. Triagem</h2>
            <p className="text-slate-500 font-bold">1 item</p>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
             <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-green-500 shadow text-lg">
               <p className="font-bold">Tapete São Carlos (2x2)</p>
               <p className="text-sm text-slate-400 mt-2">OS: 1045 - Entrou há 2h</p>
             </div>
          </div>
        </div>

        {/* Coluna Lavagem */}
        <div className="flex flex-col bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-slate-800 p-4 border-b border-slate-700 text-center">
            <h2 className="text-2xl font-black text-slate-300">2. Lavagem</h2>
            <p className="text-slate-500 font-bold">2 itens</p>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
             <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-green-500 shadow text-lg">
               <p className="font-bold">Sofá Retrátil (Almofadas)</p>
               <p className="text-sm text-slate-400 mt-2">OS: 1046 - Entrou há 30m</p>
             </div>
             <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-yellow-500 shadow text-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] px-2 py-1 font-black">ATENÇÃO</div>
               <p className="font-bold text-yellow-100">Tapete Felpudo 1x1</p>
               <p className="text-sm text-yellow-500 mt-2">OS: 1042 - Entrou há 4h</p>
             </div>
          </div>
        </div>

        {/* Coluna Secagem (Com Gargalo IA) */}
        <div className="flex flex-col bg-slate-900/50 rounded-xl border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)] overflow-hidden">
          <div className="bg-red-950 p-4 border-b border-red-900 text-center relative">
            <h2 className="text-2xl font-black text-red-400">3. Secagem (Estufa)</h2>
            <p className="text-red-500 font-bold">4 itens (GARGALO)</p>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-900">
             
             <div className="bg-red-950 p-4 rounded-lg border-l-4 border-red-500 shadow-lg text-lg animate-pulse">
               <p className="font-bold text-white">Tapete Persa 3x2</p>
               <p className="text-sm text-red-400 mt-2 font-black">⏳ TRAVADO HÁ 48H</p>
               <p className="text-xs text-red-300 mt-1">Sugestão IA: Prioridade Máxima na Estufa</p>
             </div>
             
             <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-yellow-500 shadow text-lg">
               <p className="font-bold">Tapete Belga</p>
               <p className="text-sm text-yellow-500 mt-2">OS: 1039 - Entrou há 22h</p>
             </div>
          </div>
        </div>

        {/* Coluna Expedição */}
        <div className="flex flex-col bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-slate-800 p-4 border-b border-slate-700 text-center">
            <h2 className="text-2xl font-black text-slate-300">4. Expedição</h2>
            <p className="text-slate-500 font-bold">0 itens</p>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center text-slate-600 font-bold text-xl">
             Vazio no momento
          </div>
        </div>

      </div>
    </div>
  );
}
