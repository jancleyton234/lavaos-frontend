'use client';

import React from 'react';

export default function UpholsteryDashboardPage() {
  const executions = [
    { id: '1', os: 'OS-2026-0002', customer: 'Fernanda Lima', type: 'Sofá Retrátil 3L', dirtLevel: 'ALTA', waterEfficiency: '85%', estDrying: '4h 30m', status: 'FINALIZADO' },
    { id: '2', os: 'OS-2026-0005', customer: 'Hotel Ibis', type: 'Poltrona Recepção', dirtLevel: 'MODERADA', waterEfficiency: 'Em andamento', estDrying: '-', status: 'EM EXECUÇÃO' },
  ];

  return (
    <div className="flex-1 p-8 h-screen flex flex-col overflow-hidden">
      <header className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Estofados</h1>
          <p className="text-slate-500">Métricas de Higienização e Eficiência Hídrica (Módulo 007)</p>
        </div>
      </header>

      {/* KPIs Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 shrink-0">
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm border-l-4 border-l-indigo-500">
          <p className="text-xs text-slate-500 font-bold uppercase">Eficiência Hídrica (Média)</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">82.4%</p>
          <p className="text-[10px] text-green-600 mt-1">▲ 2% vs Último Mês</p>
        </div>
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm border-l-4 border-l-blue-500">
          <p className="text-xs text-slate-500 font-bold uppercase">Tempo Médio de Secagem</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">5h 15m</p>
        </div>
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm border-l-4 border-l-orange-500">
          <p className="text-xs text-slate-500 font-bold uppercase">Sujidade Crítica (Mês)</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">14%</p>
        </div>
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border shadow-sm border-l-4 border-l-green-500">
          <p className="text-xs text-slate-500 font-bold uppercase">Taxa de Impermeabilização</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">45%</p>
          <p className="text-[10px] text-slate-500 mt-1">Upsell via Técnico</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white dark:bg-slate-950 rounded-xl border">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b">
            <tr>
              <th className="px-4 py-3 font-medium">Ordem (OS)</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Tipo Estofado</th>
              <th className="px-4 py-3 font-medium">Sujidade (Laudo)</th>
              <th className="px-4 py-3 font-medium">Extração de Água</th>
              <th className="px-4 py-3 font-medium">Prev. Secagem</th>
              <th className="px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {executions.map(ex => (
              <tr key={ex.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="px-4 py-3 font-bold text-indigo-600">{ex.os}</td>
                <td className="px-4 py-3 font-medium">{ex.customer}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{ex.type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${ex.dirtLevel === 'ALTA' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {ex.dirtLevel}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono">{ex.waterEfficiency}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{ex.estDrying}</td>
                <td className="px-4 py-3">
                  <button className="text-indigo-600 font-semibold text-xs hover:underline">Ver Laudo Técnico</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
