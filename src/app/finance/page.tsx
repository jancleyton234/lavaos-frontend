'use client';
import React, { useState } from 'react';
import { useGlobal } from '@/context/GlobalContext';

export default function FinanceiroPage() {
  const { transactions, addTransaction } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrans, setNewTrans] = useState<{type: 'Receita' | 'Despesa', description: string, amount: string, paymentMethod: string}>({ type: 'Despesa', description: '', amount: '', paymentMethod: 'PIX' });

  const totalReceitas = transactions.filter(t => t.type === 'Receita').reduce((sum, t) => sum + t.amount, 0);
  const totalDespesas = transactions.filter(t => t.type === 'Despesa').reduce((sum, t) => sum + t.amount, 0);
  const saldoAtual = totalReceitas - totalDespesas;

  const handleAddTransaction = () => {
    if (!newTrans.description || !newTrans.amount) return alert('Preencha descrição e valor.');
    addTransaction({
      id: Math.floor(Math.random() * 9999).toString(),
      type: newTrans.type,
      description: newTrans.description,
      amount: parseFloat(newTrans.amount),
      paymentMethod: newTrans.paymentMethod,
      date: new Date().toLocaleDateString('pt-BR')
    });
    setIsModalOpen(false);
    setNewTrans({ type: 'Despesa', description: '', amount: '', paymentMethod: 'PIX' });
  };

  return (
    <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="px-8 pt-10 pb-6 shrink-0 border-b border-slate-200 bg-white">
        <h2 className="text-3xl font-light text-slate-800 mb-2">Controle Financeiro</h2>
        <p className="text-slate-500 text-sm">Visão geral de recebíveis, contas a pagar e fluxo de caixa consolidado.</p>
      </div>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-emerald-500 rounded-xl p-6 text-white shadow-lg shadow-emerald-500/20">
            <h4 className="text-sm font-medium mb-1 opacity-90">Receitas Recebidas</h4>
            <h2 className="text-4xl font-bold">R$ {totalReceitas.toFixed(2).replace('.', ',')}</h2>
          </div>
          <div className="bg-rose-500 rounded-xl p-6 text-white shadow-lg shadow-rose-500/20">
            <h4 className="text-sm font-medium mb-1 opacity-90">Despesas Pagas</h4>
            <h2 className="text-4xl font-bold">R$ {totalDespesas.toFixed(2).replace('.', ',')}</h2>
          </div>
          <div className={`rounded-xl p-6 text-white shadow-lg ${saldoAtual >= 0 ? 'bg-sky-500 shadow-sky-500/20' : 'bg-red-500 shadow-red-500/20'}`}>
            <h4 className="text-sm font-medium mb-1 opacity-90">Saldo Atual (Caixa)</h4>
            <h2 className="text-4xl font-bold">R$ {saldoAtual.toFixed(2).replace('.', ',')}</h2>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 p-4 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Centro de Custo</label>
            <select className="w-full border-b border-slate-300 pb-1 text-slate-700 bg-transparent outline-none focus:border-blue-500">
              <option>Todos</option>
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tipo</label>
            <select className="w-full border-b border-slate-300 pb-1 text-slate-700 bg-transparent outline-none focus:border-blue-500">
              <option>Receitas e Despesas</option>
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Inicial</label>
            <input type="date" className="w-full border-b border-slate-300 pb-1 text-slate-700 bg-transparent outline-none focus:border-blue-500" />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Final</label>
            <input type="date" className="w-full border-b border-slate-300 pb-1 text-slate-700 bg-transparent outline-none focus:border-blue-500" />
          </div>
          <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 transition">
            FILTRAR
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold text-white transition shadow-md">
            + NOVO LANÇAMENTO
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Data</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Lançamento</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Descrição</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Pagamento</th>
                <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">Nenhum lançamento encontrado.</td>
                </tr>
              ) : (
                transactions.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition cursor-pointer">
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">{t.date}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${t.type === 'Despesa' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-700">{t.description}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{t.paymentMethod}</td>
                    <td className={`py-4 px-6 text-sm font-bold text-right ${t.type === 'Despesa' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {t.type === 'Despesa' ? '-' : '+'} R$ {t.amount.toFixed(2).replace('.', ',')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Novo Lançamento */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-full">
              <h3 className="text-xl font-light text-slate-800 mb-6 border-b border-slate-100 pb-2">Novo Lançamento</h3>
              
              <label className="block text-xs font-bold text-slate-500 mb-1">Tipo</label>
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setNewTrans({...newTrans, type: 'Receita'})}
                  className={`flex-1 py-2 text-sm font-bold rounded border ${newTrans.type === 'Receita' ? 'bg-emerald-50 text-emerald-700 border-emerald-500' : 'bg-white border-slate-300 text-slate-600'}`}
                >Receita</button>
                <button 
                  onClick={() => setNewTrans({...newTrans, type: 'Despesa'})}
                  className={`flex-1 py-2 text-sm font-bold rounded border ${newTrans.type === 'Despesa' ? 'bg-rose-50 text-rose-700 border-rose-500' : 'bg-white border-slate-300 text-slate-600'}`}
                >Despesa</button>
              </div>

              <label className="block text-xs font-bold text-slate-500 mb-1">Descrição</label>
              <input 
                type="text" 
                value={newTrans.description} 
                onChange={e => setNewTrans({...newTrans, description: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 mb-4 text-sm" 
                placeholder="Ex: Compra de Sabão"
              />

              <label className="block text-xs font-bold text-slate-500 mb-1">Valor (R$)</label>
              <input 
                type="number" 
                step="0.01"
                value={newTrans.amount} 
                onChange={e => setNewTrans({...newTrans, amount: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 mb-4 text-sm" 
              />
              
              <label className="block text-xs font-bold text-slate-500 mb-1">Forma de Pagamento</label>
              <select 
                value={newTrans.paymentMethod}
                onChange={e => setNewTrans({...newTrans, paymentMethod: e.target.value})}
                className="w-full border border-slate-300 rounded p-2 mb-6 text-sm"
              >
                <option>PIX</option>
                <option>Cartão</option>
                <option>Dinheiro</option>
                <option>Transferência</option>
                <option>Boleto</option>
              </select>

              <div className="flex gap-2">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm">Cancelar</button>
                <button onClick={handleAddTransaction} className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md">Salvar Lançamento</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
