'use client';

import Link from 'next/link';

export default function CarpetsPage() {
  // Mock data
  const carpets = [
    { code: '104859', customer: 'Marcos Almeida', type: 'Persa Retangular', area: '5.88 m²', location: 'Galpão A - Prateleira 3', status: 'Em Lavagem (OS-0001)' },
    { code: '104860', customer: 'Juliana Costa', type: 'Sintético Redondo', area: '3.14 m²', location: 'Expedição', status: 'Aguardando Entrega' },
    { code: '104861', customer: 'Condomínio Alpha', type: 'Passadeira', area: '12.00 m²', location: 'Cliente', status: 'Com Cliente' },
  ];

  return (
    <div className="flex-1 p-8 h-screen flex flex-col overflow-hidden">
      <header className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Tapetes</h1>
          <p className="text-slate-500">Patrimônios e Rastreamento Físico (Módulo 006)</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border text-slate-700 px-4 py-2 rounded-md hover:bg-slate-50 transition">
            Ler Etiqueta / QR
          </button>
        </div>
      </header>

      {/* KPIs Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 shrink-0">
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm">
          <p className="text-xs text-slate-500 font-bold uppercase">Total Base (Ativos)</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">1.245</p>
        </div>
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm border-l-4 border-l-blue-500">
          <p className="text-xs text-slate-500 font-bold uppercase">Na Fábrica Hoje</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">84</p>
        </div>
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm border-l-4 border-l-orange-500">
          <p className="text-xs text-slate-500 font-bold uppercase">Em Tratamento de Restauração</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">3</p>
        </div>
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm border-l-4 border-l-indigo-500">
          <p className="text-xs text-slate-500 font-bold uppercase">M² Total na Fábrica</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">452 m²</p>
        </div>
      </div>

      <div className="mb-6 flex gap-4 shrink-0">
        <input 
          type="text" 
          placeholder="Pesquisar por Código Único, Cliente ou Tipo..." 
          className="border rounded-md px-4 py-2 flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select className="border rounded-md px-4 py-2 text-sm bg-transparent w-48">
          <option value="">Status Físico</option>
          <option value="fabrica">Na Fábrica</option>
          <option value="cliente">Com Cliente</option>
        </select>
      </div>

      <div className="flex-1 overflow-auto bg-white dark:bg-slate-950 rounded-xl border">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b">
            <tr>
              <th className="px-4 py-3 font-medium">Cód. Patrimônio</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Tipo / Material</th>
              <th className="px-4 py-3 font-medium">Área</th>
              <th className="px-4 py-3 font-medium">Localização Atual</th>
              <th className="px-4 py-3 font-medium">Status Operacional</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {carpets.map(c => (
              <tr key={c.code} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="px-4 py-3">
                  <Link href={`/carpets/${c.code}`} className="font-bold text-indigo-600 hover:underline">
                    #{c.code}
                  </Link>
                </td>
                <td className="px-4 py-3 font-medium">{c.customer}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.type}</td>
                <td className="px-4 py-3 font-mono text-xs">{c.area}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  📍 {c.location}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${c.status.includes('Cliente') ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
