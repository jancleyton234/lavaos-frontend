'use client';

import React from 'react';

export default function MesKanbanPage() {
  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 overflow-hidden">
      
      {/* Header do Gestor de Produção */}
      <header className="p-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">Gestor de Produção (MES)</h1>
          <p className="text-sm text-slate-500">Módulo Bônus 016 - Controle de Workflow Interativo</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-300 transition">
            Configurar Rotas
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow hover:bg-indigo-700 transition">
            Abrir Modo TV
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-6 flex gap-6">
        
        {/* Coluna 1: Triagem */}
        <div className="w-80 shrink-0 flex flex-col bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-3 bg-slate-200/50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-bold flex justify-between items-center">
            <span>1. Triagem (Recepção)</span>
            <span className="bg-slate-300 dark:bg-slate-700 text-xs px-2 py-1 rounded-full">1</span>
          </div>
          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {/* Card Normal */}
            <div className="bg-white dark:bg-slate-950 p-3 rounded shadow-sm border-l-4 border-emerald-500 cursor-grab hover:shadow-md transition">
              <p className="font-bold text-sm">Tapete São Carlos</p>
              <p className="text-xs text-slate-500 mt-1">Ref: PED-2026-00085</p>
              <div className="mt-2 text-[10px] text-slate-400 font-mono">2h na fila</div>
            </div>
          </div>
        </div>

        {/* Coluna 2: Lavagem */}
        <div className="w-80 shrink-0 flex flex-col bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-3 bg-slate-200/50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-bold flex justify-between items-center">
            <span>2. Lavagem (Extratoras)</span>
            <span className="bg-slate-300 dark:bg-slate-700 text-xs px-2 py-1 rounded-full">2</span>
          </div>
          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            <div className="bg-white dark:bg-slate-950 p-3 rounded shadow-sm border-l-4 border-emerald-500 cursor-grab hover:shadow-md transition">
              <p className="font-bold text-sm">Sofá Retrátil</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] bg-blue-100 text-blue-700 px-1 rounded font-bold">Extratora 01</span>
                <span className="text-[10px] text-slate-400 font-mono">30m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 3: Secagem (Alerta) */}
        <div className="w-80 shrink-0 flex flex-col bg-red-50 dark:bg-red-900/10 rounded-xl border-2 border-red-300 dark:border-red-800 overflow-hidden">
          <div className="p-3 bg-red-100 dark:bg-red-900/40 border-b border-red-200 dark:border-red-800 font-bold flex justify-between items-center text-red-900 dark:text-red-200">
            <span>3. Secagem (Estufa)</span>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">2</span>
          </div>
          <div className="p-2 bg-red-500 text-white text-[10px] text-center font-bold">
            ⚠️ ALERTA IA: GARGALO DETECTADO
          </div>
          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            
            <div className="bg-white dark:bg-slate-950 p-3 rounded shadow-sm border-2 border-red-500 cursor-grab relative">
              <p className="font-bold text-sm">Tapete Persa 3x2</p>
              <p className="text-xs text-red-500 font-bold mt-1">48h paralisado</p>
              <button className="mt-2 w-full bg-red-100 text-red-700 text-[10px] font-bold py-1 rounded hover:bg-red-200">
                Pausar SLA e Analisar
              </button>
            </div>

            <div className="bg-white dark:bg-slate-950 p-3 rounded shadow-sm border-l-4 border-yellow-500 cursor-grab">
              <p className="font-bold text-sm">Tapete Belga</p>
              <p className="text-xs text-yellow-600 mt-1">22h na fila (Próx. de atrasar)</p>
            </div>

          </div>
        </div>

        {/* Coluna 4: Expedição */}
        <div className="w-80 shrink-0 flex flex-col bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden opacity-70">
          <div className="p-3 bg-slate-200/50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-bold flex justify-between items-center">
            <span>4. Expedição (Entrega)</span>
            <span className="bg-slate-300 dark:bg-slate-700 text-xs px-2 py-1 rounded-full">0</span>
          </div>
          <div className="flex-1 p-3 flex items-center justify-center text-slate-400 text-sm font-bold">
             Arraste os itens concluídos aqui
          </div>
        </div>

      </div>
    </div>
  );
}
