'use client';
import React, { useState } from 'react';
import { useGlobal } from '@/context/GlobalContext';

export default function CashPage() {
  const { cashRegisterStatus, openCashRegister, closeCashRegister, transactions } = useGlobal();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  
  const [initialCash, setInitialCash] = useState('');

  // Para fechamento de caixa (resumo do dia atual simplificado)
  const todayTransactions = transactions.filter(t => t.date === new Date().toLocaleDateString('pt-BR'));
  const totalIn = todayTransactions.filter(t => t.type === 'Receita').reduce((sum, t) => sum + t.amount, 0);
  const totalOut = todayTransactions.filter(t => t.type === 'Despesa').reduce((sum, t) => sum + t.amount, 0);
  const saldoGaveta = totalIn - totalOut;

  // Mock histórico de caixas
  const pastRegisters = [
    { date: 'Ontem', openedBy: 'Jancleyton', closedBy: 'Jancleyton', initial: 100, final: 850.50, status: 'Fechado Corretamente' },
    { date: 'Anteontem', openedBy: 'Maria', closedBy: 'Jancleyton', initial: 50, final: 1200.00, status: 'Falta de Troco (R$ 5,00)' },
    { date: 'Semana Passada', openedBy: 'Jancleyton', closedBy: 'Jancleyton', initial: 150, final: 980.25, status: 'Fechado Corretamente' },
  ];

  const handleOpenCash = () => {
    if (!initialCash) return alert('Informe o fundo de troco para iniciar as vendas.');
    openCashRegister(parseFloat(initialCash));
    setInitialCash('');
  };

  const handleCloseCash = () => {
    if (confirm('Tem certeza que deseja encerrar o expediente? Novas vendas só poderão ser feitas após uma nova abertura de caixa amanhã.')) {
      closeCashRegister();
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="px-8 pt-10 pb-6 shrink-0 border-b border-slate-200 bg-white flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light text-slate-800 mb-2">Caixa PDV</h2>
          <p className="text-slate-500 text-sm">Controle de abertura, fechamento e balanço de gaveta da sua loja.</p>
        </div>
        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-bold text-sm ${cashRegisterStatus === 'open' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
          <span className={`w-3 h-3 rounded-full ${cashRegisterStatus === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
          STATUS: CAIXA {cashRegisterStatus === 'open' ? 'ABERTO' : 'FECHADO'}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-8 bg-white border-b border-slate-200 gap-8">
        <button 
          onClick={() => setActiveTab('current')}
          className={`py-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'current' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Caixa Atual
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`py-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Caixas Anteriores
        </button>
      </div>

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'current' ? (
          <div className="max-w-3xl mx-auto">
            {cashRegisterStatus === 'closed' ? (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  🔒
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">O Caixa está Fechado</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">Nenhuma operação de PDV (Ordem de Serviço) pode ser salva enquanto o caixa estiver fechado. Informe o fundo de troco para abrir o caixa do dia.</p>
                
                <div className="max-w-xs mx-auto text-left mb-6">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Dinheiro em Gaveta (Troco)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input 
                      type="number" 
                      value={initialCash}
                      onChange={e => setInitialCash(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-4 text-xl font-bold text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleOpenCash}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg px-12 py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                >
                  <span className="text-2xl">🔓</span> ABRIR CAIXA AGORA
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="bg-emerald-500 p-8 text-white text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                    ✅
                  </div>
                  <h3 className="text-3xl font-black mb-1">Caixa em Operação</h3>
                  <p className="text-emerald-100 font-medium">As vendas estão liberadas no PDV.</p>
                </div>
                
                <div className="p-8">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Resumo do Movimento Diário</h4>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-slate-500 text-sm font-bold mb-1">Entradas (Receitas)</p>
                      <p className="text-3xl font-black text-emerald-600">R$ {totalIn.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-slate-500 text-sm font-bold mb-1">Saídas (Despesas)</p>
                      <p className="text-3xl font-black text-rose-600">R$ {totalOut.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-6 bg-blue-50 rounded-xl border border-blue-100 mb-8">
                    <div>
                      <p className="text-blue-800 font-bold">Saldo Estimado (Gaveta)</p>
                      <p className="text-xs text-blue-600 mt-1">Soma de todas as entradas menos as saídas do dia</p>
                    </div>
                    <p className="text-4xl font-black text-blue-700">R$ {saldoGaveta.toFixed(2).replace('.', ',')}</p>
                  </div>

                  <button 
                    onClick={handleCloseCash}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-lg px-12 py-4 rounded-xl shadow-lg shadow-rose-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span className="text-2xl">🔒</span> ENCERRAR CAIXA E FINALIZAR DIA
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Histórico de Fechamentos</h3>
                <p className="text-xs text-slate-500 mt-1">Registro de todas as sessões de caixa anteriores.</p>
              </div>
              <button className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-50">
                Baixar Relatório (PDF)
              </button>
            </div>
            
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white border-b border-slate-200">
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Data</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Operadores</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Fundo Incial</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Saldo Final</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Auditoria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pastRegisters.map((reg, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition cursor-pointer">
                    <td className="py-4 px-6 text-sm text-slate-700 font-bold">{reg.date}</td>
                    <td className="py-4 px-6 text-xs">
                      <div className="flex flex-col gap-1">
                        <span className="text-emerald-600 font-bold">Abertura: {reg.openedBy}</span>
                        <span className="text-rose-600 font-bold">Fecho: {reg.closedBy}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium text-right">R$ {reg.initial.toFixed(2)}</td>
                    <td className="py-4 px-6 text-sm text-slate-800 font-black text-right">R$ {reg.final.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${reg.status.includes('Corretamente') ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
