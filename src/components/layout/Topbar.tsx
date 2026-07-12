'use client';
import React, { useState } from 'react';
import { useGlobal, Order } from '@/context/GlobalContext';

export function Topbar() {
  const { currentUser, logout, cashRegisterStatus, openCashRegister, closeCashRegister, transactions, upcomingDates, orders } = useGlobal();
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [initialCash, setInitialCash] = useState('');
  const [hasPlayedSound, setHasPlayedSound] = useState(false);
  
  // OS Search State
  const [searchValue, setSearchValue] = useState('');
  const [selectedOs, setSelectedOs] = useState<Order | null>(null);

  const todayStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const isHolidayToday = upcomingDates && upcomingDates.length > 0 && upcomingDates[0].date === todayStr;
  const todayHoliday = isHolidayToday ? upcomingDates[0] : null;

  React.useEffect(() => {
    if (isHolidayToday && !hasPlayedSound) {
      try {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Autoplay do navegador bloqueado:', e));
        
        if ('speechSynthesis' in window && todayHoliday) {
           const utterance = new SpeechSynthesisUtterance(`Atenção equipe Lava Ó S. Hoje é dia de ${todayHoliday.name}. Preparem suas campanhas!`);
           utterance.lang = 'pt-BR';
           utterance.rate = 1.1;
           window.speechSynthesis.speak(utterance);
        }
        
        setHasPlayedSound(true);
      } catch (err) {}
    }
  }, [isHolidayToday, hasPlayedSound, todayHoliday]);
  
  // Para fechamento de caixa (resumo do dia atual simplificado)
  const todayTransactions = transactions.filter(t => t.date === new Date().toLocaleDateString('pt-BR'));
  const totalIn = todayTransactions.filter(t => t.type === 'Receita').reduce((sum, t) => sum + t.amount, 0);
  const totalOut = todayTransactions.filter(t => t.type === 'Despesa').reduce((sum, t) => sum + t.amount, 0);
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 md:px-6 shadow-sm z-10 shrink-0 w-full overflow-hidden">
      <div className="flex-1 max-w-2xl relative min-w-0 mr-2 md:mr-0">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input 
          type="text" 
          placeholder="Busca..." 
          value={searchValue}
          onChange={(e) => {
             const val = e.target.value;
             setSearchValue(val);
             // Verifica se digitou um número para buscar a OS (exato ou sem os zeros à esquerda)
             if (/^\d{1,6}$/.test(val)) {
                const paddedVal = val.padStart(6, '0');
                const foundOs = orders.find(o => o.osNumber === paddedVal || o.osNumber === val);
                if (foundOs) {
                   setSelectedOs(foundOs);
                   setSearchValue(''); // limpa barra após abrir
                }
             }
          }}
          className="w-full bg-slate-100 border-none rounded-lg pl-9 md:pl-10 pr-2 md:pr-4 py-2 focus:ring-2 focus:ring-blue-500 text-xs md:text-sm outline-none transition-shadow"
        />
      </div>
      <div className="flex items-center gap-2 md:gap-6 shrink-0">
        
        {/* Alerta de Inteligência de Feriados */}
        {upcomingDates && upcomingDates.length > 0 && (
          <div className="relative group hidden md:flex items-center cursor-help">
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold shadow-sm transition-all duration-1000 ${isHolidayToday ? 'bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white animate-pulse scale-105 shadow-rose-500/50' : 'bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100'}`}>
              <span className={isHolidayToday ? 'animate-bounce text-base' : 'animate-bounce'}>{isHolidayToday ? '🚨' : '🎉'}</span>
              <span>
                {isHolidayToday ? `HOJE É: ${todayHoliday?.name.toUpperCase()}!` : `${upcomingDates[0].name} (${upcomingDates[0].date})`}
              </span>
            </div>
            
            {/* Tooltip com a lista completa */}
            <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-slate-200 shadow-xl rounded-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pb-2 border-b border-slate-100">Datas Comerciais Restantes</h4>
              <ul className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {upcomingDates.map((date, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-bold text-slate-700">{date.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase">{date.type}</p>
                    </div>
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{date.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-3 md:bg-slate-50 p-1 md:px-3 md:py-1.5 rounded-full md:border md:border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors group relative shrink-0">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm uppercase shrink-0">
            {currentUser?.name.substring(0, 2)}
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-sm font-bold text-slate-700 leading-tight">{currentUser?.name}</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">{currentUser?.role}</span>
          </div>
          
          <button 
            onClick={logout}
            className="absolute -bottom-10 right-0 bg-white border border-slate-200 shadow-lg px-4 py-2 rounded-lg text-sm font-bold text-rose-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
          >
            Sair
          </button>
        </div>
      </div>


      {/* MODAL DE VISUALIZAÇÃO RÁPIDA DA OS */}
      {selectedOs && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header com OS GIGANTE */}
            <div className="bg-slate-800 text-white p-6 relative">
              <button 
                onClick={() => setSelectedOs(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
              >
                ×
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-xl border border-emerald-500/30">
                  <span className="text-4xl">🏷️</span>
                </div>
                <div>
                  <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-1">Ordem de Serviço</p>
                  <h2 className="text-5xl font-black tracking-tight">{selectedOs.osNumber || selectedOs.id}</h2>
                </div>
                <div className="ml-auto text-right">
                  <div className="inline-block bg-white/10 px-4 py-2 rounded-full border border-white/20">
                    <span className="font-bold">{selectedOs.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6 bg-slate-50">
              {/* Coluna 1: Dados do Cliente */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Dados do Cliente</h3>
                  <p className="font-bold text-slate-800 text-lg">{selectedOs.client}</p>
                  <p className="text-sm text-slate-500 mt-1">Data de Entrada: <span className="font-bold text-slate-700">{selectedOs.date}</span></p>
                  <p className="text-sm text-slate-500 mt-1">Previsão Entrega: <span className="font-bold text-blue-600">{selectedOs.deadline}</span></p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Financeiro</h3>
                  <p className="text-2xl font-bold text-emerald-600 mb-1">R$ {selectedOs.total.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs font-medium text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded">Pagamento: {selectedOs.paymentMethod}</p>
                </div>
              </div>

              {/* Coluna 2: Itens */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm max-h-[300px] overflow-y-auto">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Lista de Roupas/Itens ({selectedOs.items.reduce((acc, i) => acc + i.quantity, 0)} peças)</h3>
                <div className="space-y-3">
                  {selectedOs.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{item.quantity}x {item.name}</p>
                        {item.unit !== 'unidade' && (
                          <p className="text-[10px] text-slate-400">{item.width}x{item.length} / {item.weight}kg</p>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-slate-600">R$ {item.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white p-4 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setSelectedOs(null)}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
              >
                Fechar Visão Rápida
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
