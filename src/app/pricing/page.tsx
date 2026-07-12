'use client';

import React from 'react';
import Link from 'next/link';

export default function PricingEnginePage() {
  const rules = [
    { id: 1, name: 'Desconto Cliente VIP', priority: 10, status: 'Ativo', conditions: 'Cliente Tier == VIP', action: '-10% Subtotal' },
    { id: 2, name: 'Promoção Tapetes Atacado', priority: 5, status: 'Ativo', conditions: 'Área Total > 15m²', action: 'Aplicar Tabela Atacado' },
    { id: 3, name: 'Taxa Adicional Urgência 24h', priority: 20, status: 'Ativo', conditions: 'Prazo == EXPRESS', action: '+30% Adicional' },
  ];

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto w-full flex flex-col h-screen overflow-hidden text-slate-800 dark:text-slate-200">
      
      <header className="mb-6 flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">Motor de Precificação & Regras</h1>
          <p className="text-sm text-slate-500 mt-1">Nenhum módulo calcula preço sozinho. Tudo passa por aqui. (Módulo 010)</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-300">
            🧪 Simulador de Preço
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow hover:bg-indigo-700">
            + Nova Regra de Negócio
          </button>
        </div>
      </header>

      {/* Visão Dividida */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        
        {/* Lado Esquerdo: Lista de Regras */}
        <div className="lg:w-1/3 bg-white dark:bg-slate-950 rounded-2xl border shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
            <h3 className="font-bold">Regras Ativas (Ordem de Avaliação)</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {rules.sort((a, b) => b.priority - a.priority).map((rule) => (
              <div key={rule.id} className="p-3 border-2 border-slate-100 hover:border-indigo-300 rounded-xl cursor-pointer transition relative group">
                <div className="absolute top-2 right-2 bg-slate-100 text-[10px] px-2 py-0.5 rounded font-mono font-bold text-slate-500">
                  Prioridade {rule.priority}
                </div>
                <h4 className="font-bold text-sm mb-2 pr-16 text-indigo-700 dark:text-indigo-400">{rule.name}</h4>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p><span className="font-semibold text-slate-400">SE:</span> {rule.conditions}</p>
                  <p><span className="font-semibold text-slate-400">ENTÃO:</span> <span className="font-bold text-green-600">{rule.action}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lado Direito: Construtor Visual (Mock) */}
        <div className="lg:w-2/3 bg-slate-50 dark:bg-slate-900 rounded-2xl border shadow-inner flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold">Construtor Visual (Sem Código)</h2>
            <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded font-bold">Editando Regra #2</span>
          </div>

          <div className="space-y-6 max-w-2xl">
            {/* Bloco IF */}
            <div className="bg-white dark:bg-slate-950 border border-l-4 border-l-blue-500 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-500 text-white text-xs font-black px-2 py-1 rounded">SE (Condição)</span>
              </div>
              <div className="flex items-center gap-3">
                <select className="border p-2 rounded text-sm flex-1 bg-slate-50">
                  <option>Serviço.ÁreaTotal</option>
                  <option>Cliente.Tier</option>
                  <option>OS.Prazo</option>
                </select>
                <select className="border p-2 rounded text-sm bg-slate-50">
                  <option>Maior Que (&gt;)</option>
                  <option>Igual A (==)</option>
                </select>
                <input type="text" defaultValue="15" className="border p-2 rounded text-sm w-24 bg-slate-50 font-mono" />
              </div>
              <button className="text-xs text-blue-600 font-bold mt-3 hover:underline">+ Adicionar Condição "E"</button>
            </div>

            {/* Seta */}
            <div className="flex justify-center">
              <span className="text-slate-300 text-2xl">↓</span>
            </div>

            {/* Bloco THEN */}
            <div className="bg-white dark:bg-slate-950 border border-l-4 border-l-green-500 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-500 text-white text-xs font-black px-2 py-1 rounded">ENTÃO (Ação)</span>
              </div>
              <div className="flex items-center gap-3">
                <select className="border p-2 rounded text-sm flex-1 bg-slate-50">
                  <option>Aplicar Tabela Específica</option>
                  <option>Aplicar Desconto Percentual</option>
                  <option>Frete Grátis</option>
                </select>
                <select className="border p-2 rounded text-sm flex-1 bg-slate-50">
                  <option>Tabela Atacado</option>
                  <option>Tabela VIP</option>
                </select>
              </div>
            </div>

            {/* Configs Finais */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center mt-8">
              <label className="flex items-center gap-2 text-sm text-slate-600 font-bold cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600" />
                Interromper processamento de regras menores se esta for ativada
              </label>
              
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition">
                Salvar Regra
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
