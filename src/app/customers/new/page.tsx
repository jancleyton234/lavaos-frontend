'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TABS = [
  { id: 'gerais', label: '01. Dados Gerais' },
  { id: 'contatos', label: '02. Contatos' },
  { id: 'enderecos', label: '03. Endereços' },
  { id: 'preferencias', label: '04. Preferências' },
  { id: 'marketing', label: '05. Marketing' },
  { id: 'financeiro', label: '06. Financeiro' },
  { id: 'documentos', label: '07. Documentos' },
  { id: 'historico', label: '08. Histórico' },
  { id: 'observacoes', label: '09. Observações' },
];

export default function NewCustomerPage() {
  const [activeTab, setActiveTab] = useState('gerais');

  return (
    <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/customers" className="text-sm text-blue-600 hover:underline mb-2 inline-block">
            &larr; Voltar para Clientes
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Novo Cliente</h1>
          <p className="text-slate-500">Preencha os dados para cadastrar um novo cliente no CRM.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            Cancelar
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Salvar Cliente
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
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 min-h-[500px]">
          {activeTab === 'gerais' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-semibold border-b pb-4">Dados Gerais</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <select className="w-full border p-2 rounded-md bg-transparent">
                    <option value="PF">Pessoa Física</option>
                    <option value="PJ">Pessoa Jurídica</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CPF / CNPJ</label>
                  <input type="text" className="w-full border p-2 rounded-md bg-transparent" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Nome / Razão Social</label>
                  <input type="text" className="w-full border p-2 rounded-md bg-transparent" placeholder="Nome Completo" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contatos' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-semibold border-b pb-4">Contatos</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">WhatsApp Principal</label>
                  <input type="text" className="w-full border p-2 rounded-md bg-transparent" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <input type="email" className="w-full border p-2 rounded-md bg-transparent" placeholder="contato@empresa.com" />
                </div>
              </div>
            </div>
          )}
          
          {/* Placeholder for other tabs */}
          {['enderecos', 'preferencias', 'marketing', 'financeiro', 'documentos', 'historico', 'observacoes'].includes(activeTab) && (
            <div className="flex items-center justify-center h-full text-slate-400">
              Interface da aba "{TABS.find(t => t.id === activeTab)?.label}" em construção.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
