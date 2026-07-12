'use client';

import React from 'react';

export default function CustomerPortalPage() {
  return (
    <div className="flex justify-center bg-slate-900 min-h-screen">
      
      {/* Container Mobile-First (PWA) */}
      <div className="w-full max-w-md bg-slate-50 min-h-screen flex flex-col relative shadow-2xl overflow-hidden font-sans text-slate-800">
        
        {/* Header App */}
        <header className="bg-indigo-600 text-white p-5 rounded-b-3xl shadow-md shrink-0 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black tracking-tight">Lava-Me</h1>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
              JL
            </div>
          </div>
          <h2 className="text-sm font-bold opacity-90">Olá, João,</h2>
          <p className="text-xs opacity-75">Bem-vindo ao seu portal de cuidados.</p>
        </header>

        {/* Corpo Scrollável */}
        <main className="flex-1 overflow-y-auto pb-24 space-y-6">
          
          {/* Rastreamento Ativo (Tracking) */}
          <div className="px-5 mt-[-20px] relative z-20">
            <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-slate-800">Rastreamento</h3>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded">OS #1045</span>
              </div>
              
              <div className="flex items-center justify-between relative">
                {/* Linha de fundo */}
                <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-slate-200 -z-10"></div>
                <div className="absolute left-0 w-1/2 top-1/2 h-[2px] bg-indigo-500 -z-10"></div>
                
                {/* Passos */}
                <div className="flex flex-col items-center gap-1 bg-white">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shadow">✓</div>
                  <span className="text-[10px] font-bold text-indigo-700">Coleta</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shadow animate-pulse">↻</div>
                  <span className="text-[10px] font-bold text-indigo-700">Fábrica</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-xs text-slate-400">3</div>
                  <span className="text-[10px] font-bold text-slate-400">Entrega</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-slate-500">Seu Tapete Persa está na estufa de secagem.</p>
                <p className="text-[10px] text-slate-400 mt-1">Previsão: Quarta, 18:00</p>
              </div>
            </div>
          </div>

          {/* Armário Digital Patrimonial */}
          <div className="px-5">
            <h3 className="font-black text-slate-800 mb-3 flex items-center gap-2">
              <span className="text-xl">🛋️</span> Meu Armário Digital
            </h3>
            
            <div className="space-y-3">
              
              <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                  <span className="text-2xl">🛋️</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Sofá Retrátil (Sala)</h4>
                  <p className="text-xs text-slate-500 mt-1">Última lavagem: 10/03/2026</p>
                  
                  {/* Dica da IA */}
                  <div className="mt-2 bg-emerald-50 border border-emerald-100 p-2 rounded text-[10px] text-emerald-800 flex gap-2 items-start">
                    <span>💡</span>
                    <span>IA: Está no momento ideal para renovar a impermeabilização.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="px-5">
            <h3 className="font-black text-slate-800 mb-3">Serviços</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white border border-indigo-100 p-4 rounded-2xl shadow-sm text-center active:scale-95 transition">
                <div className="text-3xl mb-2">✨</div>
                <p className="text-xs font-bold text-indigo-900">Novo Agendamento</p>
              </button>
              <button className="bg-white border border-indigo-100 p-4 rounded-2xl shadow-sm text-center active:scale-95 transition">
                <div className="text-3xl mb-2">📄</div>
                <p className="text-xs font-bold text-indigo-900">Meus Orçamentos</p>
              </button>
            </div>
          </div>
          
        </main>

        {/* Tab Bar Inferior */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex justify-around items-center pb-6 z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <button className="flex flex-col items-center gap-1 text-indigo-600">
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">Início</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <span className="text-xl">🛋️</span>
            <span className="text-[10px] font-bold">Armário</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <span className="text-xl">💳</span>
            <span className="text-[10px] font-bold">Financeiro</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <span className="text-xl">💬</span>
            <span className="text-[10px] font-bold">Suporte</span>
          </button>
        </div>

      </div>
    </div>
  );
}
