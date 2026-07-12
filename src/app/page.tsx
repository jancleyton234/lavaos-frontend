'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PrintReceipt } from '@/components/ui/PrintReceipt';
import { PrintQuote } from '@/components/ui/PrintQuote';
import { useGlobal, CartItemType, CatalogItem } from '@/context/GlobalContext';
import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';

export default function PosHomePage() {
  const { addOrder, catalogItems, customers, addTransaction, cashRegisterStatus, osCounter, companyInfo } = useGlobal();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://37.60.227.236:4040');
    setSocket(newSocket);
    return () => { newSocket.close(); };
  }, []);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [selectedDeadline, setSelectedDeadline] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [customDate, setCustomDate] = useState('');
  const [rollSize, setRollSize] = useState<'58mm' | '80mm'>('80mm');
  const [printMode, setPrintMode] = useState<'receipt' | 'quote' | 'carpet_tag'>('receipt');
  
  // OS Options
  const [printCopies, setPrintCopies] = useState(1);
  const [printCarpetTag, setPrintCarpetTag] = useState(true);
  
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [activeConfigItem, setActiveConfigItem] = useState<CatalogItem | null>(null);
  const [activeConfig, setActiveConfig] = useState({ quantity: 1, width: '', length: '', weight: '', beforePhoto: '', customPrice: 0 });
  
  // Financial Options
  const [hasDelivery, setHasDelivery] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('fixed');
  const [discountValue, setDiscountValue] = useState(0);

  const [showFinalModal, setShowFinalModal] = useState(false);

  const [pendingOrderId, setPendingOrderId] = useState<string>(`OS-${Math.floor(1000 + Math.random() * 9000)}`);
  
  const predictedOsNumber = String(osCounter + 1).padStart(6, '0');
  const hasCarpet = cartItems.some(i => i.name.toLowerCase().includes('tapete'));

  const subtotalItems = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  
  const discountAmount = discountType === 'percent' 
    ? subtotalItems * (discountValue / 100) 
    : discountValue;

  const cartTotal = Math.max(0, subtotalItems - discountAmount) + (hasDelivery ? deliveryFee : 0);

  const steps = [
    { step: 1, label: 'Cliente' },
    { step: 2, label: 'Prazos' },
    { step: 3, label: 'Itens' },
    { step: 4, label: 'Valor' },
    { step: 5, label: 'Resumo' },
  ];

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="flex-1 overflow-y-auto px-8 pb-8 animate-in fade-in duration-300">
             <div className="px-0 pt-4 pb-6 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-light text-slate-800 mb-1">Escolher Cliente</h2>
                <p className="text-slate-500 text-sm">Selecione o cliente para iniciar o atendimento.</p>
              </div>
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
                className="bg-transparent border-b border-slate-300 py-1 w-64 text-sm focus:outline-none focus:border-blue-500" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <Link href="/customers" className="h-32 bg-blue-500 hover:bg-blue-600 transition-colors rounded-xl shadow-md flex flex-col items-center justify-center text-white group">
                <span className="text-4xl mb-1 font-light group-hover:scale-110 transition-transform">+</span>
                <span className="font-semibold text-sm tracking-wide">NOVO CLIENTE</span>
              </Link>
              {customers
                .filter(c => c.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) || c.phone.includes(customerSearchTerm))
                .map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => setSelectedClient(c.name)}
                  className={`h-32 rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all border ${
                    selectedClient === c.name 
                      ? 'bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-600/30 text-white scale-[1.02]' 
                      : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md text-slate-700'
                  }`}
                >
                  <h3 className={`font-semibold line-clamp-2 ${selectedClient === c.name ? 'text-white' : 'text-slate-800'}`}>
                    {c.name}
                  </h3>
                  <div className={`flex items-center gap-2 text-sm ${selectedClient === c.name ? 'text-emerald-100' : 'text-slate-500'}`}>
                    <span>📞</span> {c.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
           <div className="flex-1 overflow-y-auto px-8 pb-8 animate-in slide-in-from-right-4 duration-300">
             <div className="px-0 pt-4 pb-6">
                <h2 className="text-3xl font-light text-slate-800 mb-1">Prazos de Entrega</h2>
                <p className="text-slate-500 text-sm">Defina quando o serviço estará pronto.</p>
             </div>
             <div className="grid gap-6 max-w-4xl">
               <div 
                 onClick={() => setSelectedDeadline('Padrão (48h)')}
                 className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${selectedDeadline === 'Padrão (48h)' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'}`}
               >
                 <div>
                   <h3 className="text-xl font-bold text-slate-800">Entrega Padrão (48h)</h3>
                   <p className="text-slate-500 mt-1">Sem custo adicional. Pronto em dois dias úteis.</p>
                 </div>
                 <div className="text-right">
                   <p className="text-2xl font-bold text-slate-800">12/02</p>
                   <p className="text-sm text-slate-400 uppercase font-bold">18:00</p>
                 </div>
               </div>
               
               <div 
                 onClick={() => setSelectedDeadline('Express (24h)')}
                 className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${selectedDeadline === 'Express (24h)' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-white hover:border-amber-300'}`}
               >
                 <div>
                   <div className="flex gap-2 items-center mb-1">
                     <h3 className="text-xl font-bold text-slate-800">Express (24h)</h3>
                     <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">+20% TAXA</span>
                   </div>
                   <p className="text-slate-500">Prioridade na fila de produção.</p>
                 </div>
                 <div className="text-right">
                   <p className="text-2xl font-bold text-slate-800">11/02</p>
                   <p className="text-sm text-slate-400 uppercase font-bold">12:00</p>
                 </div>
               </div>

               <div 
                 onClick={() => {
                   setSelectedDeadline('Agendado');
                   if (customDate) setSelectedDeadline(`Agendado para ${customDate}`);
                 }}
                 className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                   selectedDeadline?.startsWith('Agendado') ? 'border-purple-500 bg-purple-50 shadow-purple-500/20' : 'border-slate-200 bg-white hover:border-purple-300'
                 }`}
               >
                 <div className="flex justify-between items-center mb-4">
                   <div>
                     <h3 className="text-xl font-bold text-slate-800">Agendar Data Específica</h3>
                     <p className="text-slate-500 mt-1">Escolher manualmente no calendário.</p>
                   </div>
                   <div className="text-4xl text-slate-300">📅</div>
                 </div>
                 
                 {selectedDeadline?.startsWith('Agendado') && (
                   <div className="animate-in fade-in pt-3 border-t border-purple-200 mt-2 flex items-center gap-4">
                     <label className="text-sm font-bold text-purple-800">Selecione a Data:</label>
                     <input 
                       type="date" 
                       value={customDate}
                       onChange={(e) => {
                         setCustomDate(e.target.value);
                         setSelectedDeadline(`Agendado para ${e.target.value.split('-').reverse().join('/')}`);
                       }}
                       className="bg-white border border-purple-300 rounded px-3 py-1.5 text-sm outline-none focus:border-purple-600 text-purple-900"
                     />
                   </div>
                 )}
               </div>
             </div>
           </div>
        );

      case 3:
        return (
          <div className="flex-1 flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-300">
             <div className="px-8 pt-4 pb-4 shrink-0 flex items-center justify-between border-b border-slate-200">
                <div>
                  <h2 className="text-3xl font-light text-slate-800 mb-1">Catálogo de Serviços</h2>
                </div>
                <div className="flex gap-2">
                  {['Dia a Dia', 'Cama/Banho', 'Tapetes', 'Social'].map(cat => (
                    <button key={cat} className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs hover:bg-slate-200">
                      {cat}
                    </button>
                  ))}
                </div>
             </div>
             <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-100/50">
               {cartItems.length > 0 && (
                 <div className="lg:hidden mb-6 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in">
                   <div className="bg-blue-50 p-3 border-b border-blue-100 flex justify-between items-center">
                     <h3 className="font-bold text-blue-800 text-sm flex items-center gap-2">🛒 Itens Adicionados</h3>
                     <span className="font-bold text-blue-700 text-sm">Total: R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                   </div>
                   <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
                     {cartItems.map((item, idx) => (
                       <div key={idx} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded border border-slate-100">
                         <div>
                           <span className="font-bold text-slate-700">{item.quantity}x {item.name}</span>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className="font-bold text-slate-800 text-xs">R$ {item.subtotal.toFixed(2).replace('.', ',')}</span>
                           <button onClick={() => setCartItems(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 font-bold px-2 text-lg hover:text-red-700">×</button>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {catalogItems.length === 0 ? (
                   <div className="col-span-full text-center p-8 border-2 border-dashed border-slate-300 rounded-xl text-slate-500">
                     O catálogo está vazio. Adicione itens no menu Catálogo.
                   </div>
                 ) : (
                   catalogItems.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        setActiveConfigItem(item);
                        setActiveConfig({ quantity: 1, width: '', length: '', weight: '', beforePhoto: '', customPrice: item.price });
                      }}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-400 transition-all group flex flex-col items-center text-center relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">+</div>
                      </div>
                      <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</span>
                      <h4 className="font-bold text-slate-700 text-sm mb-1">{item.name}</h4>
                      <p className="text-blue-600 font-bold mb-1">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{item.unit}</span>
                    </div>
                   ))
                 )}
               </div>
             </div>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 overflow-y-auto px-8 pb-8 animate-in slide-in-from-right-4 duration-300">
             <div className="px-0 pt-4 pb-6">
                <h2 className="text-3xl font-light text-slate-800 mb-1">Pagamento</h2>
                <p className="text-slate-500 text-sm">Como este serviço será acertado?</p>
             </div>
             
             <div className="grid md:grid-cols-2 gap-6 max-w-4xl mb-8">
               <div className={`p-6 bg-white border-2 rounded-xl relative shadow-sm cursor-pointer transition-all ${
                 ['PIX', 'Cartão', 'Dinheiro'].includes(selectedPayment || '') 
                  ? 'border-emerald-500 shadow-emerald-500/20' 
                  : 'border-slate-200 hover:border-emerald-300'
               }`}>
                 <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase">Sugerido</div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Pagar Agora</h3>
                 <p className="text-slate-500 text-sm mb-4">Lançar recebimento direto no caixa atual.</p>
                 <div className="flex gap-2">
                   <button 
                     onClick={() => setSelectedPayment('PIX')}
                     className={`flex-1 py-2 rounded font-bold text-sm transition-colors border ${
                       selectedPayment === 'PIX' ? 'bg-emerald-100 text-emerald-700 border-emerald-500' : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                     }`}
                   >PIX</button>
                   <button 
                     onClick={() => setSelectedPayment('Cartão')}
                     className={`flex-1 py-2 rounded font-bold text-sm transition-colors border ${
                       selectedPayment === 'Cartão' ? 'bg-emerald-100 text-emerald-700 border-emerald-500' : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                     }`}
                   >Cartão</button>
                   <button 
                     onClick={() => setSelectedPayment('Dinheiro')}
                     className={`flex-1 py-2 rounded font-bold text-sm transition-colors border ${
                       selectedPayment === 'Dinheiro' ? 'bg-emerald-100 text-emerald-700 border-emerald-500' : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                     }`}
                   >Dinheiro</button>
                 </div>
               </div>

               <div className={`p-6 bg-white border-2 rounded-xl cursor-pointer transition-all ${
                 selectedPayment === 'Ficar Pendente'
                  ? 'border-blue-500 shadow-blue-500/20'
                  : 'border-slate-200 hover:border-blue-400'
               }`}>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Faturar / Pagar na Retirada</h3>
                 <p className="text-slate-500 text-sm mb-4">A OS ficará em aberto até o cliente vir buscar, ou será adicionada ao faturamento mensal (Empresas).</p>
                 <button 
                   onClick={() => setSelectedPayment('Ficar Pendente')}
                   className={`w-full py-2 rounded font-bold text-sm transition-colors border ${
                     selectedPayment === 'Ficar Pendente' ? 'bg-blue-100 text-blue-700 border-blue-500' : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                   }`}
                 >
                   Ficar Pendente
                 </button>
               </div>
             </div>

             <div className="grid md:grid-cols-2 gap-6 max-w-4xl mb-8">
                {/* Descontos */}
                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-800">Desconto</h3>
                    <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
                      <button 
                        onClick={() => setDiscountType('percent')}
                        className={`px-3 py-1 text-xs font-bold rounded-md ${discountType === 'percent' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                      >%</button>
                      <button 
                        onClick={() => setDiscountType('fixed')}
                        className={`px-3 py-1 text-xs font-bold rounded-md ${discountType === 'fixed' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                      >R$</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                        {discountType === 'fixed' ? 'R$' : '%'}
                      </span>
                      <input 
                        type="number"
                        min="0"
                        step="0.01"
                        value={discountValue || ''}
                        onChange={(e) => setDiscountValue(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-800 font-bold"
                      />
                    </div>
                    {discountAmount > 0 && (
                      <span className="text-sm font-bold text-emerald-600">
                        - R$ {discountAmount.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Taxa de Entrega */}
                <div className={`p-5 bg-white border rounded-xl shadow-sm transition-colors ${hasDelivery ? 'border-orange-300 bg-orange-50/30' : 'border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-lg">🛵</span> Taxa de Entrega
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={hasDelivery} onChange={(e) => setHasDelivery(e.target.checked)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  {hasDelivery && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Valor da Taxa (R$)</label>
                      <input 
                        type="number"
                        min="0"
                        step="0.01"
                        value={deliveryFee || ''}
                        onChange={(e) => setDeliveryFee(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-orange-200 rounded-lg outline-none focus:border-orange-500 text-orange-700 font-bold"
                      />
                    </div>
                  )}
                </div>
              </div>
          </div>
        );

      case 5:
        return (
          <div className="flex-1 overflow-y-auto px-8 py-10 animate-in fade-in duration-500 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
               ✨
             </div>
             <h2 className="text-4xl font-light text-slate-800 mb-3">Tudo Pronto!</h2>
             <p className="text-slate-500 text-lg max-w-md mb-8">
               O atendimento para <span className="font-bold text-slate-700">{selectedClient || 'o Cliente'}</span> foi configurado. 
               Verifique o resumo na barra lateral e clique em Gerar Ordem de Serviço.
             </p>
             
             {/* Opções de Impressão (Centralizadas no passo 5) */}
             <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm max-w-md w-full text-left">
                <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Configurar Impressão Térmica</h3>
                <div className="flex gap-4">
                  <label className={`flex-1 border-2 rounded-lg p-3 cursor-pointer flex items-center gap-3 transition-colors ${rollSize === '58mm' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                    <input 
                      type="radio" 
                      name="roll" 
                      checked={rollSize === '58mm'} 
                      onChange={() => setRollSize('58mm')} 
                      className="hidden" 
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">Bobina 58mm</span>
                      <span className="text-xs text-slate-500">Padrão Compacto</span>
                    </div>
                  </label>
                  <label className={`flex-1 border-2 rounded-lg p-3 cursor-pointer flex items-center gap-3 transition-colors ${rollSize === '80mm' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                    <input 
                      type="radio" 
                      name="roll" 
                      checked={rollSize === '80mm'} 
                      onChange={() => setRollSize('80mm')} 
                      className="hidden" 
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">Bobina 80mm</span>
                      <span className="text-xs text-slate-500">Padrão Largo</span>
                    </div>
                  </label>
                </div>
             </div>
          </div>
        );
    }
  };

  const handleAddToCart = () => {
    if (!activeConfigItem) return;
    
    const priceToUse = Number(activeConfig.customPrice) || 0;
    let subtotal = priceToUse * activeConfig.quantity;
    
    if (activeConfigItem.unit === 'm2') {
      const w = Number(activeConfig.width) || 0;
      const l = Number(activeConfig.length) || 0;
      subtotal = (w * l) * priceToUse * activeConfig.quantity;
    } else if (activeConfigItem.unit === 'kg') {
      const kg = Number(activeConfig.weight) || 0;
      subtotal = kg * priceToUse * activeConfig.quantity;
    } else if (activeConfigItem.unit === 'metro') {
      const l = Number(activeConfig.length) || 0;
      subtotal = l * priceToUse * activeConfig.quantity;
    }

    setCartItems(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      name: activeConfigItem.name,
      pricePerUnit: priceToUse,
      unit: activeConfigItem.unit,
      quantity: activeConfig.quantity,
      width: Number(activeConfig.width) || undefined,
      length: Number(activeConfig.length) || undefined,
      weight: Number(activeConfig.weight) || undefined,
      subtotal,
      beforePhoto: activeConfig.beforePhoto || undefined
    }]);
    
    setActiveConfigItem(null);
  };

  return (
    <>
      {activeConfigItem && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-screen">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeConfigItem.emoji}</span>
                <div>
                  <h3 className="font-bold text-slate-800">{activeConfigItem.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500 font-bold text-sm">R$</span>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={activeConfig.customPrice} 
                      onChange={e => setActiveConfig(p => ({...p, customPrice: parseFloat(e.target.value) || 0}))} 
                      className="w-20 border border-blue-300 rounded px-2 py-0.5 text-sm font-bold text-blue-700 outline-none focus:border-blue-500" 
                    />
                    <span className="text-blue-600 font-bold text-sm"> / {activeConfigItem.unit}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setActiveConfigItem(null)} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold flex items-center justify-center">×</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5">
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700 text-sm">Quantidade</span>
                <div className="flex items-center gap-4">
                  <button onClick={() => setActiveConfig(p => ({...p, quantity: Math.max(1, p.quantity - 1)}))} className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold hover:bg-slate-100">-</button>
                  <span className="font-bold text-slate-800 text-lg w-4 text-center">{activeConfig.quantity}</span>
                  <button onClick={() => setActiveConfig(p => ({...p, quantity: p.quantity + 1}))} className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold hover:bg-slate-100">+</button>
                </div>
              </div>

              {activeConfigItem.unit === 'm2' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Largura (metros)</label>
                    <input type="number" step="0.01" value={activeConfig.width} onChange={e => setActiveConfig(p => ({...p, width: e.target.value}))} className="w-full border border-slate-300 rounded p-2 text-sm" placeholder="Ex: 1.50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Comprimento (metros)</label>
                    <input type="number" step="0.01" value={activeConfig.length} onChange={e => setActiveConfig(p => ({...p, length: e.target.value}))} className="w-full border border-slate-300 rounded p-2 text-sm" placeholder="Ex: 2.00" />
                  </div>
                </div>
              )}

              {activeConfigItem.unit === 'metro' && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Comprimento Linear (metros)</label>
                  <input type="number" step="0.01" value={activeConfig.length} onChange={e => setActiveConfig(p => ({...p, length: e.target.value}))} className="w-full border border-slate-300 rounded p-2 text-sm" placeholder="Ex: 2.50" />
                </div>
              )}

              {activeConfigItem.unit === 'kg' && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Peso (kg)</label>
                  <input type="number" step="0.1" value={activeConfig.weight} onChange={e => setActiveConfig(p => ({...p, weight: e.target.value}))} className="w-full border border-slate-300 rounded p-2 text-sm" placeholder="Ex: 5.5" />
                </div>
              )}

              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-2">Vistoria Fotográfica (Antes)</label>
                 {activeConfig.beforePhoto ? (
                   <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 group">
                     <div className="absolute inset-0 flex items-center justify-center text-4xl">📸</div>
                     <img src={activeConfig.beforePhoto} alt="Preview" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => setActiveConfig(p => ({...p, beforePhoto: ''}))} className="bg-red-500 text-white px-3 py-1 rounded font-bold text-xs">Remover Foto</button>
                     </div>
                   </div>
                 ) : (
                    <label className="w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 font-semibold text-sm hover:bg-slate-50 hover:border-blue-400 hover:text-blue-500 transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer">
                      <span className="text-2xl">📸</span>
                      Tirar Foto da Peça
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setActiveConfig(p => ({...p, beforePhoto: reader.result as string}));
                            };
                            reader.readAsDataURL(file);
                          }
                        }} 
                      />
                    </label>
                 )}
                 <p className="text-[10px] text-slate-400 mt-1">Obrigatório para tapeçaria e manchas preexistentes.</p>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-200 bg-white flex gap-3">
              <button onClick={() => setActiveConfigItem(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm">Cancelar</button>
              <button onClick={handleAddToCart} className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md">Adicionar ao Pedido</button>
            </div>
          </div>
        </div>
      )}

      {printMode === 'receipt' ? (
        <PrintReceipt 
          orderId={pendingOrderId} 
          osNumber={predictedOsNumber}
          client={selectedClient} 
          deadline={selectedDeadline} 
          items={cartItems} 
          total={cartTotal}
          deliveryFee={hasDelivery ? deliveryFee : 0}
          discountType={discountType}
          discountValue={discountValue} 
          paymentMethod={selectedPayment}
          rollSize={rollSize}
          copies={printCopies}
          onlyCarpetTag={false}
        />
      ) : printMode === 'carpet_tag' ? (
        <PrintReceipt 
          orderId={pendingOrderId} 
          osNumber={predictedOsNumber}
          client={selectedClient} 
          deadline={selectedDeadline} 
          items={cartItems} 
          total={cartTotal} 
          paymentMethod={selectedPayment}
          rollSize={rollSize}
          onlyCarpetTag={true}
        />
      ) : (
        <PrintQuote
          orderId={pendingOrderId} 
          client={selectedClient} 
          deadline={selectedDeadline} 
          items={cartItems} 
          total={cartTotal} 
        />
      )}

      {/* Interface Principal - Ocultada durante a impressão */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden print:hidden h-full">
        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col overflow-hidden bg-slate-50 ${currentStep === 5 ? 'hidden lg:flex' : 'flex'}`}>
        
        {/* Stepper Header */}
        <div className="py-6 px-10 bg-white border-b border-slate-200 shrink-0 shadow-sm z-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
            
            {steps.map((s) => (
              <div 
                key={s.step} 
                className="flex flex-col items-center bg-white px-3 cursor-pointer group"
                onClick={() => setCurrentStep(s.step)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                  currentStep === s.step 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110' 
                    : currentStep > s.step
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 group-hover:border-blue-300'
                }`}>
                  {currentStep > s.step ? '✓' : s.step}
                </div>
                <span className={`text-xs font-semibold ${currentStep === s.step ? 'text-blue-700' : currentStep > s.step ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Content */}
        {renderStepContent()}

        {/* Bottom Navigation */}
        <div className="p-6 bg-white border-t border-slate-200 flex justify-between items-center shrink-0">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`px-8 py-2.5 font-semibold rounded-full transition-colors text-sm ${
              currentStep === 1 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            VOLTAR
          </button>
          <button 
            onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
            disabled={currentStep === 5}
            className={`px-10 py-2.5 font-bold rounded-full shadow-md transition-all text-sm tracking-wide ${
              currentStep === 5 ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
            }`}
          >
            AVANÇAR
          </button>
        </div>
      </main>

      {/* Right Sidebar (Order Summary) */}
      <aside className={`${currentStep === 5 ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)] lg:shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] flex-col z-20 shrink-0 h-full overflow-y-auto`}>
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span>📋</span> Resumo da OS
          </h3>
          <button onClick={() => setCurrentStep(4)} className="lg:hidden text-xs font-bold text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-full transition-colors">
            ← Voltar
          </button>
        </div>
        <div className="p-6 space-y-8">
          
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cliente</p>
            {selectedClient ? (
              <h3 className="text-xl font-bold text-blue-700">{selectedClient}</h3>
            ) : (
              <p className="text-slate-400 italic text-sm">Nenhum cliente selecionado</p>
            )}
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Prazo de Entrega</p>
            {selectedDeadline ? (
              <p className="text-lg font-bold text-slate-800">{selectedDeadline}</p>
            ) : (
              <p className="text-slate-400 italic text-sm">A definir</p>
            )}
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Forma de Pagamento</p>
            {selectedPayment ? (
              <p className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded inline-block">{selectedPayment}</p>
            ) : (
              <p className="text-slate-400 italic text-sm">A definir</p>
            )}
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Itens ({cartItems.length})</p>
            {cartItems.length > 0 ? (
              <div className="space-y-3">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 relative group">
                    <button 
                      onClick={() => setCartItems(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 hover:bg-red-200 text-red-600 rounded-full font-bold flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-700 text-sm">{item.quantity}x {item.name}</h4>
                        {item.unit === 'm2' && <p className="text-[10px] text-slate-500 font-bold">{item.width}m x {item.length}m</p>}
                        {item.unit === 'kg' && <p className="text-[10px] text-slate-500 font-bold">{item.weight} kg</p>}
                        {item.unit === 'metro' && <p className="text-[10px] text-slate-500 font-bold">{item.length} m linear</p>}
                        {item.beforePhoto && <p className="text-[10px] text-blue-500 font-bold flex items-center gap-1 mt-1">📸 Foto Anexada</p>}
                      </div>
                      <span className="font-bold text-slate-800 text-sm">R$ {item.subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center">
                 <p className="text-xs text-slate-400 font-medium">Nenhuma peça inserida</p>
               </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Valor Total</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">R$ {cartTotal.toFixed(2).replace('.', ',')}</h2>
          
          <button 
            disabled={currentStep !== 5}
            onClick={() => {
              // Gerar OS real no banco local usando o ID que já foi gerado
              const newOrderId = pendingOrderId;
              addOrder({
                id: newOrderId,
                osNumber: predictedOsNumber,
                client: selectedClient || 'Cliente Avulso',
                deadline: selectedDeadline || 'Padrão',
                items: cartItems,
                total: cartTotal,
                deliveryFee: hasDelivery ? deliveryFee : 0,
                discountType: discountType,
                discountValue: discountValue,
                paymentMethod: selectedPayment || 'Pendente',
                status: 'Triagem',
                date: new Date().toLocaleDateString('pt-BR')
              });

              const nextCounter = osCounter + 1;
              localStorage.setItem('lavaos_os_counter', String(nextCounter));

              // Lançar no financeiro automaticamente se não for Pendente
              if (selectedPayment && selectedPayment !== 'Ficar Pendente' && cartTotal > 0 && cashRegisterStatus === 'open') {
                addTransaction({
                  id: `tr-${newOrderId}`,
                  type: 'Receita',
                  description: `Recebimento PDV (OS ${newOrderId})`,
                  amount: cartTotal,
                  paymentMethod: selectedPayment,
                  date: new Date().toLocaleDateString('pt-BR')
                });
              } else if (selectedPayment && selectedPayment !== 'Ficar Pendente' && cartTotal > 0 && cashRegisterStatus === 'closed') {
                console.log('Caixa fechado. Pedido salvo, mas recebimento não lançado no caixa atual.');
              }

              setShowFinalModal(true);
            }}
            className={`w-full py-4 font-bold rounded-lg text-lg text-white shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
              currentStep === 5 ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {currentStep === 5 ? 'Gerar Ordem de Serviço' : 'Preencha as Etapas'}
          </button>
        </div>
      </aside>
      </div>

    {showFinalModal && (
      <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 animate-in fade-in print:hidden">
        <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden flex flex-col transform scale-100 animate-in zoom-in-95 duration-200">
          <div className="p-6 text-center border-b border-slate-100 bg-emerald-50">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
              ✨
            </div>
            <h3 className="text-2xl font-black text-emerald-800">OS Gerada!</h3>
            <p className="text-emerald-600 font-semibold text-sm">O que deseja fazer agora?</p>
          </div>
          
          <div className="p-5 space-y-3 bg-slate-50">
            <button 
              onClick={() => {
                setPrintMode('receipt');
                setTimeout(() => window.print(), 50);
              }}
              className="w-full py-3 bg-white border border-slate-300 hover:bg-blue-50 hover:border-blue-300 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="text-xl">🖨️</span> Imprimir Ticket
            </button>
            
            {hasCarpet && (
              <button 
                onClick={() => {
                  setPrintMode('carpet_tag');
                  setTimeout(() => window.print(), 50);
                }}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span className="text-xl">🏷️</span> Imprimir Etiqueta (Tapete)
              </button>
            )}

            <button 
              onClick={() => {
                const clientData = customers.find(c => c.name === selectedClient);
                if (!clientData || !clientData.phone) {
                  alert('Cliente não possui telefone cadastrado.');
                  return;
                }
                const domainUrl = typeof window !== 'undefined' ? window.location.origin : 'https://lavaos-frontend-aw8c.vercel.app';
                const orderData = {
                  id: pendingOrderId,
                  osNumber: predictedOsNumber,
                  client: clientData.name,
                  deadline: selectedDeadline || 'Padrão',
                  items: cartItems,
                  total: cartTotal,
                  deliveryFee: hasDelivery ? deliveryFee : 0,
                  discountType,
                  discountValue,
                  paymentMethod: selectedPayment || 'Pendente',
                  status: 'Triagem',
                  date: new Date().toLocaleDateString('pt-BR')
                };
                const encoded = window.btoa(unescape(encodeURIComponent(JSON.stringify(orderData))));
                const trackUrl = `${domainUrl}/track/${pendingOrderId}?d=${encoded}`;
                const msg = `Olá ${clientData.name.split(' ')[0]}, sua Ordem de Serviço *${predictedOsNumber}* foi gerada com sucesso na ${companyInfo.name || 'nossa loja'}! 🧼\n\n💰 *Total:* R$ ${cartTotal.toFixed(2).replace('.', ',')}\n\nAcompanhe o status e detalhes do seu pedido no link abaixo:\n${trackUrl}`;
                let phone = clientData.phone.replace(/\D/g, '');
                if (!phone.startsWith('55')) phone = '55' + phone;
                window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span className="text-xl">💬</span> Enviar por WhatsApp
            </button>
          </div>
          
          <div className="p-5 border-t border-slate-100 bg-white">
            <button 
              onClick={() => {
                setCurrentStep(1);
                setSelectedClient(null);
                setSelectedDeadline(null);
                setSelectedPayment(null);
                setCartItems([]);
                setCustomDate('');
                setHasDelivery(false);
                setDeliveryFee(0);
                setDiscountType('fixed');
                setDiscountValue(0);
                setPendingOrderId(`OS-${Math.floor(1000 + Math.random() * 9000)}`);
                setShowFinalModal(false);
              }}
              className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-xl shadow-lg transition-all"
            >
              CONCLUIR ATENDIMENTO
            </button>
          </div>
        </div>
      </div>
    )}

    </>
  );
}
