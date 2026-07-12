'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

// Mock Data from Backend Simulation
const MOCK_DATA = {
  customer: {
    id: '1001',
    name: 'João Pedro Silva',
    photoUrl: 'https://i.pravatar.cc/150?u=1001',
    loyaltyLevel: 'OURO',
    status: 'ATIVO',
    whatsappPrimary: '(11) 98888-7777',
    email: 'joao.silva@email.com',
    city: 'São Paulo',
    state: 'SP'
  },
  metrics: {
    totalSpent: 'R$ 4.500,00',
    repurchaseProbability: '85%',
    avgDaysBetweenPurchases: 45,
    aiNextServiceRecommended: 'Higienização de Sofá Retrátil (3 Lugares)',
    aiCommercialApproach: 'O cliente costuma fechar pacotes combinados para a família toda no fim do ano. Ofereça 15% de desconto se ele incluir a limpeza dos tapetes da sala.'
  },
  services: [
    { id: 1, name: 'Higienização de Colchão King', date: '10/11/2025', value: 'R$ 350,00' },
    { id: 2, name: 'Impermeabilização de Sofá', date: '20/06/2025', value: 'R$ 800,00' },
  ],
  timeline: [
    { type: 'DELIVERY', title: 'Equipe finalizou o serviço no local', date: '10/11/2025 às 15:30' },
    { type: 'WHATSAPP', title: 'Cliente confirmou o agendamento', date: '09/11/2025 às 09:15' },
    { type: 'FINANCIAL', title: 'Pagamento via PIX recebido', date: '09/11/2025 às 09:20' }
  ],
  pendingBudgets: [
    { id: 1023, description: 'Limpeza de Carpetes (Escritório)', value: 'R$ 1.200,00', status: 'AGUARDANDO APROVAÇÃO' }
  ]
};

export default function Customer360Dashboard() {
  const { id } = useParams();
  const data = MOCK_DATA;

  return (
    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/customers" className="text-sm text-blue-600 hover:underline mb-2 inline-block">
            &larr; Voltar para Clientes
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Ficha 360º</h1>
          <p className="text-slate-500">Visão analítica completa do cliente.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            Editar Cadastro
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            WhatsApp
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Esquerda: Overview (1/3) */}
        <div className="space-y-6">
          {/* Card Perfil */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center">
            <img src={data.customer.photoUrl} alt="Foto" className="w-24 h-24 rounded-full mb-4 border-4 border-slate-100" />
            <h2 className="text-xl font-bold">{data.customer.name}</h2>
            <p className="text-slate-500 text-sm mb-4">{data.customer.city} - {data.customer.state}</p>
            
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 font-semibold rounded-full text-xs">
                NÍVEL {data.customer.loyaltyLevel}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full text-xs">
                {data.customer.status}
              </span>
            </div>

            <div className="w-full text-left space-y-2 text-sm mt-2 border-t pt-4">
              <p><strong>WhatsApp:</strong> {data.customer.whatsappPrimary}</p>
              <p><strong>E-mail:</strong> {data.customer.email}</p>
            </div>
          </div>

          {/* Card Inteligência Artificial */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🤖</span>
              <h3 className="font-bold">IA Commercial</h3>
            </div>
            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              {data.metrics.aiCommercialApproach}
            </p>
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wide opacity-80 mb-1">Sugestão Próximo Serviço:</p>
              <p className="font-semibold">{data.metrics.aiNextServiceRecommended}</p>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Detalhes & Timeline (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Métricas Financeiras / Comportamento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border shadow-sm">
              <p className="text-xs text-slate-500 font-medium uppercase">Total Gasto</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">{data.metrics.totalSpent}</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border shadow-sm">
              <p className="text-xs text-slate-500 font-medium uppercase">Prob. Recompra</p>
              <p className="text-2xl font-bold mt-1 text-blue-600">{data.metrics.repurchaseProbability}</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border shadow-sm">
              <p className="text-xs text-slate-500 font-medium uppercase">Tempo Médio</p>
              <p className="text-2xl font-bold mt-1">{data.metrics.avgDaysBetweenPurchases} dias</p>
            </div>
          </div>

          {/* Timeline e Orçamentos (Grid Interno) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Timeline */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Últimas Interações</h3>
              <div className="space-y-4">
                {data.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {item.type === 'WHATSAPP' && <span className="text-green-500 text-sm">💬</span>}
                      {item.type === 'FINANCIAL' && <span className="text-emerald-500 text-sm">💰</span>}
                      {item.type === 'DELIVERY' && <span className="text-blue-500 text-sm">🚚</span>}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orçamentos */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border shadow-sm flex flex-col">
              <h3 className="font-bold text-lg mb-4">Orçamentos Pendentes</h3>
              <div className="flex-1 space-y-3">
                {data.pendingBudgets.map(b => (
                  <div key={b.id} className="p-3 border rounded-lg bg-orange-50/50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">#{b.id} - {b.description}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-semibold">{b.status}</span>
                      <span className="font-bold">{b.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Serviços Anteriores (Mocked Map / Photos) */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border shadow-sm">
             <h3 className="font-bold text-lg mb-4">Últimos Serviços Executados</h3>
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b">
                  <tr>
                    <th className="px-4 py-2 font-medium">Serviço</th>
                    <th className="px-4 py-2 font-medium">Data</th>
                    <th className="px-4 py-2 font-medium text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.services.map((svc) => (
                    <tr key={svc.id}>
                      <td className="px-4 py-3">{svc.name}</td>
                      <td className="px-4 py-3 text-slate-500">{svc.date}</td>
                      <td className="px-4 py-3 text-right font-medium">{svc.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  );
}
