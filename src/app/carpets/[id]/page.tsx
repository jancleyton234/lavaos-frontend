'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CarpetDetailsPage() {
  const { id } = useParams();

  // Mock
  const carpet = {
    uniqueCode: id,
    customer: 'Marcos Almeida',
    format: 'Retangular',
    material: 'Sintético (Nylon)',
    area: '5.88',
    weight: '12.5',
    value: 'R$ 850,00',
    location: 'Galpão A - Prateleira 3',
    status: 'Na Fábrica',
    history: [
      { date: '14/10/2026', action: 'Lavagem Finalizada', by: 'Equipe Produção', os: 'OS-0045' },
      { date: '12/10/2026', action: 'Coletado no Cliente', by: 'João (Técnico)', os: 'OS-0045' },
      { date: '10/05/2025', action: 'Entregue', by: 'Carlos (Técnico)', os: 'OS-0012' },
      { date: '08/05/2025', action: 'Cadastro Inicial do Patrimônio', by: 'Sistema', os: 'OS-0012' },
    ],
    damages: 'Leve desbotamento na borda direita. Fios soltos na franja inferior.'
  };

  return (
    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full h-full flex flex-col">
      <header className="mb-6 shrink-0">
        <Link href="/carpets" className="text-sm text-indigo-600 hover:underline mb-2 inline-block">
          &larr; Voltar para Gestão
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tapete #{carpet.uniqueCode}</h1>
            <p className="text-slate-500">Patrimônio de <span className="font-semibold text-slate-800 dark:text-slate-200">{carpet.customer}</span></p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-md font-bold text-sm">
              🖨️ Imprimir Etiqueta (ZPL)
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0 overflow-auto pb-8">
        
        {/* Coluna 1: Dados Físicos */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Especificações</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Formato:</span>
                <span className="font-semibold">{carpet.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Material:</span>
                <span className="font-semibold">{carpet.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Área:</span>
                <span className="font-mono font-bold bg-indigo-50 text-indigo-700 px-2 rounded">{carpet.area} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Peso Estimado:</span>
                <span className="font-semibold">{carpet.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valor Estimado:</span>
                <span className="font-semibold">{carpet.value}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b pb-2 text-red-600">Laudo / Avarias (Último)</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {carpet.damages}
            </p>
          </div>
        </div>

        {/* Coluna 2: Localização e Fotos */}
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 shadow-sm">
            <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2">Localização Física Atual</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📍</span>
              <div>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{carpet.location}</p>
                <p className="text-sm text-blue-700 mt-1">Lido há 2 horas via App</p>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-white text-blue-700 border border-blue-300 font-bold rounded-lg text-sm hover:bg-blue-100 transition">
              Movimentar Tapete
            </button>
          </div>

          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Galeria (Última OS)</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-500">Foto Frente</div>
              <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-500">Foto Avaria</div>
            </div>
          </div>
        </div>

        {/* Coluna 3: Ciclo de Vida */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Ciclo de Vida</h3>
          
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-6 mt-4">
            {carpet.history.map((evt, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow-sm"></div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <strong className="text-slate-800 dark:text-slate-200 text-sm">{evt.action}</strong>
                    <span className="text-[10px] text-slate-400">{evt.date}</span>
                  </div>
                  <p className="text-xs text-slate-500">Por: {evt.by}</p>
                  <Link href={`/orders/${evt.os}`} className="text-xs font-bold text-indigo-600 mt-1 block">
                    {evt.os}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
