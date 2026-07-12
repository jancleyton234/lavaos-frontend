'use client';

import React from 'react';

export default function PurchasingDashboardPage() {
  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-black text-white">LavaOS</h2>
          <p className="text-xs text-slate-500 font-bold tracking-widest mt-1">MÓDULO 023</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 bg-amber-600/10 text-amber-400 px-4 py-3 rounded-lg font-bold border border-amber-500/20">
            <span>🛒</span> Centro de Compras
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 transition">
            <span>🏭</span> Controle Químico
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 transition">
            <span>📸</span> Recebimento (QR)
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 transition">
            <span>🏢</span> Fornecedores
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <header className="p-8 border-b border-slate-800 bg-slate-900/50">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-2">Suprimentos & Compras</h1>
              <p className="text-sm text-slate-400">Garantindo a produção da Usina sem estourar o orçamento.</p>
            </div>
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-amber-500/20 transition flex items-center gap-2">
              <span>+</span> Novo Pedido
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          
          {/* Alertas de Compras (IA) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-20 text-5xl">🧠</div>
             <h3 className="text-lg font-black text-white flex items-center gap-2 mb-4 relative z-10">
               <span>⚠️</span> Cotação Inteligente (LavaMind)
             </h3>

             <div className="bg-slate-950 border border-amber-900/30 p-5 rounded-xl">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-amber-400 font-bold mb-1">Alerta: Impermeabilizante Pro-X</h4>
                    <p className="text-xs text-slate-400">Estoque Mínimo atingido. Necessário emitir pedido de 10 Galões.</p>
                  </div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded border border-slate-800 mb-4 text-xs">
                  <strong className="text-emerald-500 block mb-2">Análise de Fornecedores:</strong>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-slate-400">
                       <span>Fornecedor Atual (Chemical BR)</span>
                       <span className="text-rose-400">R$ 520,00 (Aumento de 12%)</span>
                    </li>
                    <li className="flex justify-between text-white font-bold bg-emerald-900/20 p-2 rounded border border-emerald-900/50">
                       <span>Recomendação IA (Química Nova)</span>
                       <span className="text-emerald-400">R$ 450,00 (Rating 4.8)</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-slate-500 italic">"Trocar de fornecedor reduzirá o Custo por Aplicação (CPA) de R$ 2,15 para R$ 2,10, gerando economia projetada de R$ 2.400 no ano."</p>
                </div>

                <div className="flex gap-2">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded shadow transition text-sm">
                    Aprovar Compra (Química Nova)
                  </button>
                  <button className="border border-slate-700 text-slate-400 hover:text-white py-2 px-6 rounded shadow transition text-sm">
                    Manter Fornecedor Atual
                  </button>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            
            {/* Controle de Produtos Químicos */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>🧪</span> Custo por Aplicação (Fábrica)
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                   <div>
                     <h4 className="font-bold text-sm text-white">Detergente Enzimático X</h4>
                     <p className="text-[10px] text-slate-400">Rendimento esperado: 50 m² / Litro</p>
                   </div>
                   <div className="text-right">
                     <span className="block text-lg font-black text-emerald-400">R$ 1,20</span>
                     <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">por Sofá (Custo Teórico)</span>
                   </div>
                </div>

                <div className="border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                   <div>
                     <h4 className="font-bold text-sm text-white">Impermeabilizante Premium</h4>
                     <p className="text-[10px] text-slate-400">Rendimento esperado: 15 m² / Litro</p>
                   </div>
                   <div className="text-right">
                     <span className="block text-lg font-black text-amber-400">R$ 15,50</span>
                     <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">por Sofá (Custo Teórico)</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Simulação de Recebimento Móvel (QR Code) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center text-center">
               <div className="w-20 h-20 mb-4 bg-slate-800 border-2 border-dashed border-amber-500/50 rounded-2xl flex items-center justify-center text-4xl">
                 📱
               </div>
               <h3 className="text-lg font-black text-white mb-2">Conferência Mobile Ativa</h3>
               <p className="text-xs text-slate-400 mb-6 max-w-[80%]">
                 Para receber a carga, o Auxiliar de Estoque deve apontar a câmera do Tablet para o QR Code da Nota Fiscal.
               </p>
               
               <div className="bg-slate-950 border border-emerald-900/30 p-3 rounded-lg w-full text-xs text-emerald-400 flex items-center justify-center gap-2">
                 <span className="animate-pulse">●</span> Aguardando escaneamento na Doca 1...
               </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
