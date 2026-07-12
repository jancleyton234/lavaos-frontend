'use client';

import { useState } from 'react';
import Link from 'next/link';

const TABS = [
  { id: 'basico', label: '01. Dados Básicos' },
  { id: 'precos', label: '02. Preços & Unidades' },
  { id: 'regras', label: '03. Regras e Tempos' },
  { id: 'composicao', label: '04. Composição (Materiais)' },
  { id: 'checklist', label: '05. Checklist Dinâmico' },
  { id: 'ia', label: '06. Inteligência Artificial' },
];

export default function NewCatalogItemPage() {
  const [activeTab, setActiveTab] = useState('basico');
  const [itemType, setItemType] = useState('SERVICO');

  return (
    <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/catalog" className="text-sm text-indigo-600 hover:underline mb-2 inline-block">
            &larr; Voltar para o Catálogo
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Novo Item do Catálogo</h1>
          <p className="text-slate-500">Cadastre um Serviço, Produto, Combo ou Pacote.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            Cancelar
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            Salvar Item
          </button>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border p-6 flex flex-col md:flex-row gap-8">
        
        {/* Tabs Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id 
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' 
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 min-h-[500px]">
          {activeTab === 'basico' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-semibold border-b pb-4">Dados Básicos</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Item</label>
                  <select 
                    className="w-full border p-2 rounded-md bg-transparent"
                    value={itemType}
                    onChange={e => setItemType(e.target.value)}
                  >
                    <option value="SERVICO">Serviço</option>
                    <option value="PRODUTO">Produto</option>
                    <option value="COMBO">Combo</option>
                    <option value="PACOTE">Pacote</option>
                    <option value="MATERIAL">Material de Consumo</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <select className="w-full border p-2 rounded-md bg-transparent">
                    <option value="">Selecione...</option>
                    <option value="1">Estofados</option>
                    <option value="2">Tapetes</option>
                    <option value="3">Automotivo</option>
                  </select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Nome do Item</label>
                  <input type="text" className="w-full border p-2 rounded-md bg-transparent" placeholder="Ex: Higienização de Colchão Casal" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Descrição Completa</label>
                  <textarea className="w-full border p-2 rounded-md bg-transparent h-24" placeholder="Descrição visível nos orçamentos..."></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'precos' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-semibold border-b pb-4">Preços e Unidade de Cobrança</h2>
              
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium">Como este item é cobrado?</label>
                <select className="w-full md:w-1/2 border p-2 rounded-md bg-transparent">
                  <option value="UNIDADE">Unidade (Valor Fixo)</option>
                  <option value="M2">Metro Quadrado (m²)</option>
                  <option value="ML">Metro Linear</option>
                  <option value="PECA">Por Peça / Assento</option>
                  <option value="HORA">Por Hora</option>
                </select>
                <p className="text-xs text-slate-500">Para m², o sistema pedirá Largura x Comprimento na hora da venda.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 border-b">
                    <tr>
                      <th className="px-4 py-2 font-medium">Tabela</th>
                      <th className="px-4 py-2 font-medium">Custo (R$)</th>
                      <th className="px-4 py-2 font-medium">Preço Mínimo</th>
                      <th className="px-4 py-2 font-medium">Preço Padrão</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3 font-medium">Tabela Padrão (Default)</td>
                      <td className="px-4 py-3"><input type="text" className="w-24 border rounded p-1" placeholder="0,00" /></td>
                      <td className="px-4 py-3"><input type="text" className="w-24 border rounded p-1" placeholder="0,00" /></td>
                      <td className="px-4 py-3"><input type="text" className="w-24 border rounded p-1 font-bold" placeholder="0,00" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Tabela B2B (Corporativo)</td>
                      <td className="px-4 py-3"><input type="text" className="w-24 border rounded p-1" placeholder="0,00" /></td>
                      <td className="px-4 py-3"><input type="text" className="w-24 border rounded p-1" placeholder="0,00" /></td>
                      <td className="px-4 py-3"><input type="text" className="w-24 border rounded p-1 font-bold" placeholder="0,00" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Outras abas ficariam aqui seguindo a mesma estrutura */}
          {['regras', 'composicao', 'checklist', 'ia'].includes(activeTab) && (
            <div className="flex items-center justify-center h-full text-slate-400">
              Interface da aba "{TABS.find(t => t.id === activeTab)?.label}" em construção.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
