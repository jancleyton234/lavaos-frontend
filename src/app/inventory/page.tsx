'use client';

import React from 'react';

export default function InventoryDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      
      {/* Topo: Resumo e Alertas IA */}
      <header className="p-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black text-amber-600 dark:text-amber-500 tracking-tight">Estoque Industrial</h1>
            <p className="text-sm text-slate-500">Almoxarifado, Receitas e Desperdícios (Módulo 015)</p>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow hover:bg-amber-700">
              Registrar Compra / Lote
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-3 gap-6">
        
        {/* Coluna 1 e 2: Estoque e Receitas */}
        <div className="col-span-2 space-y-6">
          
          {/* Alerta de Compras IA */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 items-start shadow-sm">
            <div className="text-amber-500 text-2xl">🤖</div>
            <div>
              <h4 className="font-bold text-amber-800">Cotação Automática de Suprimentos</h4>
              <p className="text-sm text-amber-700 mt-1">O <strong>Detergente Neutro XT</strong> atingirá ruptura de estoque em 5 dias. O Fornecedor A tem prazo de entrega de 7 dias. Deseja que eu envie um email automático aprovando a compra do Lote Padrão?</p>
              <div className="mt-3 flex gap-2">
                 <button className="bg-amber-600 text-white text-xs px-3 py-1.5 rounded font-bold">Sim, autorizar compra</button>
                 <button className="bg-white border border-amber-300 text-amber-800 text-xs px-3 py-1.5 rounded font-bold">Ver análise completa</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Produtos Críticos */}
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
               <h3 className="font-black mb-4">Níveis Críticos</h3>
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm font-bold mb-1">
                     <span>Detergente Neutro XT</span>
                     <span className="text-red-500">15L (Mín: 50L)</span>
                   </div>
                   <div className="w-full bg-slate-200 rounded-full h-2">
                     <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                   </div>
                 </div>
                 
                 <div>
                   <div className="flex justify-between text-sm font-bold mb-1">
                     <span>Fita Adesiva</span>
                     <span className="text-yellow-500">10 rolos (Mín: 15)</span>
                   </div>
                   <div className="w-full bg-slate-200 rounded-full h-2">
                     <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Receitas Operacionais */}
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
               <h3 className="font-black mb-4">Receitas (Auto-Baixa)</h3>
               <div className="space-y-3">
                 <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded flex justify-between items-center">
                   <div>
                     <p className="font-bold text-sm">Lavagem Sofá Retrátil</p>
                     <p className="text-xs text-slate-500">120ml Det, 40ml Remov.</p>
                   </div>
                   <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">ATIVA</span>
                 </div>
                 <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded flex justify-between items-center">
                   <div>
                     <p className="font-bold text-sm">Impermeabilização M</p>
                     <p className="text-xs text-slate-500">500ml Selante</p>
                   </div>
                   <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">ATIVA</span>
                 </div>
               </div>
               <p className="text-[10px] text-slate-500 text-center mt-3">Sempre que a Fábrica finaliza uma OS, estes mLS são deduzidos do FIFO.</p>
            </div>

          </div>
        </div>

        {/* Coluna 3: Desperdícios e Máquinas */}
        <div className="space-y-6">
          
          {/* Monitor de Desperdício */}
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
             <h3 className="font-black mb-4 flex items-center gap-2">
               📉 Desperdício Adicional
             </h3>
             <p className="text-xs text-slate-500 mb-4">Mapeado pelos botões "Gasto Extra" reportados pelos técnicos no App (Módulo 005).</p>
             
             <div className="flex items-end gap-3 mb-4">
               <span className="text-3xl font-mono font-black text-red-500">R$ 125,50</span>
               <span className="text-xs text-slate-400 mb-1">Neste Mês</span>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-1">
                 <span className="text-slate-600">Téc. João</span>
                 <span className="font-bold text-red-500">+ 800ml (R$ 40)</span>
               </div>
               <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-1">
                 <span className="text-slate-600">Téc. Carlos</span>
                 <span className="font-bold text-red-500">+ 300ml (R$ 15)</span>
               </div>
             </div>
          </div>

          {/* Controle de Equipamentos */}
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
             <h3 className="font-black mb-4 flex items-center gap-2">
               ⚙️ Equipamentos & Ativos
             </h3>
             
             <div className="space-y-3">
               <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-bold text-sm">Extratora IPC 01</span>
                   <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">OPERANTE</span>
                 </div>
                 <p className="text-[10px] text-slate-500">Próx. Revisão Preventiva em 14 dias.</p>
               </div>

               <div className="p-3 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-bold text-sm text-red-800 dark:text-red-400">Extratora IPC 02</span>
                   <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">MANUTENÇÃO</span>
                 </div>
                 <p className="text-[10px] text-red-600 dark:text-red-400">Motor queimado. Orçamento R$ 450,00.</p>
               </div>
             </div>
          </div>

        </div>

      </main>
    </div>
  );
}
