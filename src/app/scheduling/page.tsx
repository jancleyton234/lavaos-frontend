'use client';

import React from 'react';

export default function SchedulingCommandCenterPage() {
  const technicians = [
    { name: 'João Silva', status: '🟢 Trabalhando', vehicle: 'Van LVE-8921', skill: 'Estofados / Tapetes' },
    { name: 'Carlos Moura', status: '🟡 Deslocamento', vehicle: 'Fiorino KJA-1234', skill: 'Coletas / Entregas' },
    { name: 'Marcos Almeida', status: '🔴 Atrasado 15m', vehicle: 'Moto Honda', skill: 'Orçamentos / Vistoria' },
    { name: 'Pedro Henrique', status: '⚫ Offline', vehicle: '-', skill: 'Manutenção' },
  ];

  return (
    <div className="flex-1 p-2 md:p-6 h-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900">
      <header className="mb-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Centro de Comando Logístico</h1>
          <p className="text-sm text-slate-500">IA Despachante & Agenda Drag and Drop (Módulo 008)</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-indigo-700 transition shadow-sm">
            Simular Otimização de Rota (IA)
          </button>
        </div>
      </header>

      {/* Simulador Header */}
      <div className="bg-slate-800 text-slate-200 p-3 rounded-lg mb-4 flex justify-between items-center shrink-0 shadow-sm border border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 font-bold">🤖 IA Despachante:</span>
          <span className="text-sm">Ao arrastar um card, o sistema simula Margem, Combustível e Risco antes de confirmar.</span>
        </div>
        <div className="flex gap-4 text-sm font-mono">
          <div>Prev. Faturamento: <span className="text-green-400 font-bold">R$ 4.250,00</span></div>
          <div>Custo Rota Previsto: <span className="text-red-400 font-bold">R$ 185,40</span></div>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Painel Esquerdo: Técnicos e Status */}
        <div className="w-64 bg-white dark:bg-slate-950 rounded-xl border shadow-sm p-4 flex flex-col shrink-0 overflow-y-auto">
          <h3 className="font-bold border-b pb-2 mb-4 text-sm uppercase text-slate-500 tracking-wider">Monitoramento (GPS)</h3>
          
          <div className="space-y-4">
            {technicians.map((tech, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-sm text-slate-800 dark:text-slate-200">{tech.name}</strong>
                </div>
                <div className="text-xs font-semibold mb-2">{tech.status}</div>
                <div className="text-[10px] text-slate-500 space-y-1">
                  <p>🚗 {tech.vehicle}</p>
                  <p>🛠️ {tech.skill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Painel Central: MAPA (Mock) */}
        <div className="flex-1 bg-white dark:bg-slate-950 rounded-xl border shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between pointer-events-none">
             <div className="bg-white/90 backdrop-blur border shadow-lg rounded px-3 py-1 text-xs font-bold pointer-events-auto">
               Visualização: Mapa Operacional
             </div>
             <div className="bg-white/90 backdrop-blur border shadow-lg rounded px-3 py-1 text-xs font-bold text-red-600 pointer-events-auto flex items-center gap-2">
               <span>⚠️ Alerta Conflito: João Silva (Trânsito pesado na Av. Brasil)</span>
             </div>
          </div>
          
          {/* Mock do Mapa */}
          <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-indigo-50/50 dark:bg-indigo-900/10 flex items-center justify-center relative">
             {/* Pins Mockados */}
             <div className="absolute top-1/4 left-1/4 text-3xl animate-bounce">🟢</div>
             <div className="absolute top-1/2 left-2/3 text-3xl">🟡</div>
             <div className="absolute bottom-1/3 left-1/2 text-3xl">🔴</div>
             
             {/* Rota Desenhada Mock */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
               <path d="M 25% 25% Q 40% 10% 50% 66% T 66% 50%" stroke="blue" strokeWidth="4" fill="none" strokeDasharray="5,5" />
             </svg>

             <div className="text-slate-400 font-bold opacity-50 select-none text-xl">Integração Maps API (Simulada)</div>
          </div>
        </div>

        {/* Painel Direito: Agenda Kanban Drag & Drop */}
        <div className="w-80 bg-white dark:bg-slate-950 rounded-xl border shadow-sm p-4 flex flex-col shrink-0 overflow-hidden">
          <h3 className="font-bold border-b pb-2 mb-4 text-sm uppercase text-slate-500 tracking-wider">Agenda do Dia (Arrastar)</h3>
          
          <div className="flex-1 overflow-y-auto space-y-3">
            
            {/* Card Drag & Drop */}
            <div className="bg-white dark:bg-slate-900 p-3 rounded border-2 border-indigo-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-indigo-400 transition">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">10:00 - 12:00</span>
                <span className="text-[10px] text-slate-500">OS-0045</span>
              </div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Higienização Sofá Retrátil</h4>
              <p className="text-xs text-slate-500 mt-1">Cliente: Marcos Almeida</p>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
                <span className="font-bold text-slate-600">👤 João Silva</span>
                <span className="text-indigo-500 font-bold">12 km dist.</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded border-2 border-slate-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-slate-400 transition">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">13:30 - 14:00</span>
                <span className="text-[10px] text-slate-500">OS-0089</span>
              </div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Coleta 3 Tapetes Persas</h4>
              <p className="text-xs text-slate-500 mt-1">Cliente: Cond. Alphaville</p>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
                <span className="font-bold text-slate-600">👤 Carlos Moura</span>
                <span className="text-indigo-500 font-bold">5 km dist.</span>
              </div>
            </div>

            {/* Simulação de Drop Zone */}
            <div className="h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-400 font-bold">
              Solte um card aqui para reatribuir
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
