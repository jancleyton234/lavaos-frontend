'use client';
import React, { useEffect, useState, Suspense, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGlobal } from '@/context/GlobalContext';

// Como esta é uma página pública (cliente), nós simulamos a busca da OS pelo LocalStorage (em produção real viria de uma API sem autenticação)
function TrackOrderContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const osId = resolvedParams.id;
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('d');
  
  const { orders, companyInfo } = useGlobal();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchRealTimeOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${osId}?t=${Date.now()}`, { cache: 'no-store' });
        const text = await response.text();
        let result;
        try {
          result = JSON.parse(text);
        } catch (e) {
          setDebugInfo(`Parse error: ${text.substring(0, 50)}`);
          throw new Error('Invalid JSON');
        }
        
        let found = null;
        if (result.success && result.data) {
          found = result.data;
          setDebugInfo('');
        } else {
          setDebugInfo(`Error for ID [${osId}]: ${JSON.stringify(result).substring(0, 100)}`);
          // Fallbacks se a API falhar: URL Base64 ou LocalStorage
          if (dataParam) {
            try {
              const atobValue = typeof window !== 'undefined' ? window.atob(dataParam) : Buffer.from(dataParam, 'base64').toString();
              const decoded = decodeURIComponent(escape(atobValue));
              found = JSON.parse(decoded);
            } catch (e) {
              console.error('Falha ao decodificar a OS da URL', e);
            }
          }
          if (!found) {
            found = orders.find(o => o.osNumber === osId || o.id === osId);
          }
        }
        
        setOrder(found || null);
        setLoading(false);
      } catch (error: any) {
        setDebugInfo(prev => prev ? prev : `Fetch Error: ${error.message}`);
        console.error('API Error, using fallback', error);
        // Fallback: URL ou LocalStorage
        let found = null;
        if (dataParam) {
          try {
            const atobValue = typeof window !== 'undefined' ? window.atob(dataParam) : Buffer.from(dataParam, 'base64').toString();
            const decoded = decodeURIComponent(escape(atobValue));
            found = JSON.parse(decoded);
          } catch (e) {}
        }
        if (!found) found = orders.find(o => o.osNumber === osId || o.id === osId);
        setOrder(found || null);
        setLoading(false);
      }
    };

    fetchRealTimeOrder();
    
    // Configura o Polling a cada 5 segundos para tempo real
    intervalId = setInterval(fetchRealTimeOrder, 5000);

    return () => clearInterval(intervalId);
  }, [osId, orders, dataParam]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold">Localizando sua Ordem de Serviço...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-4xl mb-4">
          ❌
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-2">Comanda não encontrada</h1>
        <p className="text-slate-500 max-w-sm">A Ordem de Serviço <strong>{osId}</strong> não foi encontrada ou já foi removida do sistema.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      
      {debugInfo && (
        <div className="w-full max-w-md bg-red-100 text-red-600 text-xs p-2 mb-2 rounded border border-red-300 break-words">
          DEBUG: {debugInfo}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mt-4 mb-10 animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Header (Company) */}
        <div className="bg-slate-900 text-white p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          {(order.companyInfo?.logoUrl || companyInfo.logoUrl) && (
            <img src={order.companyInfo?.logoUrl || companyInfo.logoUrl} alt="Logo" className="w-16 h-16 object-contain mx-auto mb-3 relative z-10" />
          )}
          <h1 className="text-xl font-black relative z-10">{order.companyInfo?.name || companyInfo.name || 'Lavanderia'}</h1>
          <p className="text-slate-400 text-sm relative z-10">{order.companyInfo?.phone || companyInfo.phone}</p>
        </div>

        {/* OS Details */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Comanda</p>
              <h2 className="text-3xl font-black text-slate-800 tracking-wider">{order.osNumber || order.id}</h2>
            </div>
            
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase shadow-sm ${
                order.status === 'Pronto' ? 'bg-emerald-100 text-emerald-700' :
                order.status === 'Lavagem' ? 'bg-blue-100 text-blue-700' :
                order.status === 'Passadoria' ? 'bg-purple-100 text-purple-700' :
                order.status === 'Entregue' ? 'bg-slate-200 text-slate-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {order.status || 'Triagem'}
              </span>
            </div>
          </div>

          {/* Progress Bar / Stepper */}
          <div className="mb-8">
            <p className="text-sm font-bold text-slate-800 mb-4">Acompanhamento da Lavagem</p>
            <div className="relative flex justify-between items-center w-full">
              {/* Linha de fundo */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
              
              {(() => {
                const stages = [
                  { id: 'Triagem', icon: '📝', label: 'Triagem' },
                  { id: 'Lavagem', icon: '🫧', label: 'Lavando' },
                  { id: 'Passadoria', icon: '👕', label: 'Passando' },
                  { id: 'Pronto', icon: '✅', label: 'Pronto' },
                  { id: 'Entregue', icon: '🛍️', label: 'Entregue' }
                ];
                
                const currentStatus = order.status || 'Triagem';
                const currentIndex = Math.max(0, stages.findIndex(s => s.id === currentStatus));

                return (
                  <>
                    {/* Linha preenchida */}
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full z-0 transition-all duration-700 ease-in-out"
                      style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
                    ></div>
                    
                    {/* Bolinhas / Ícones */}
                    {stages.map((stage, index) => {
                      const isCompleted = index <= currentIndex;
                      const isCurrent = index === currentIndex;
                      
                      return (
                        <div key={stage.id} className="relative z-10 flex flex-col items-center group">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-md transition-all duration-500 ${
                            isCurrent ? 'bg-blue-600 text-white scale-110 ring-4 ring-blue-100' :
                            isCompleted ? 'bg-blue-500 text-white' : 
                            'bg-white text-slate-400 border-2 border-slate-200'
                          }`}>
                            {stage.icon}
                          </div>
                          <p className={`absolute -bottom-6 text-[10px] sm:text-xs font-bold whitespace-nowrap transition-colors duration-300 ${
                            isCurrent ? 'text-blue-600' : 
                            isCompleted ? 'text-slate-600' : 
                            'text-slate-400'
                          }`}>
                            {stage.label}
                          </p>
                        </div>
                      );
                    })}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                👤
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Cliente</p>
                <p className="font-bold text-slate-700">{order.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                📅
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Previsão de Entrega</p>
                <p className="font-bold text-slate-700">{order.deadline}</p>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-slate-800 mb-3 text-sm">ITENS DO PEDIDO</h3>
          <div className="space-y-3 mb-6">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-sm pb-3 border-b border-dashed border-slate-200 last:border-0 last:pb-0">
                <div>
                  <span className="font-bold text-slate-700 mr-2">{item.quantity}x</span>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">R$ {item.subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>

          {(() => {
            const subtotalItems = order.items.reduce((acc: any, it: any) => acc + it.subtotal, 0);
            const deliveryFee = order.deliveryFee || 0;
            const discountValue = order.discountValue || 0;
            const discountAmount = order.discountType === 'percent' ? subtotalItems * (discountValue / 100) : discountValue;
            
            if (discountAmount === 0 && deliveryFee === 0) return null;
            
            return (
              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 font-bold">Subtotal dos Itens</span>
                  <span className="font-bold text-slate-700">R$ {subtotalItems.toFixed(2).replace('.', ',')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center mb-2 text-emerald-600">
                    <span className="font-bold">Desconto</span>
                    <span className="font-bold">- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                {deliveryFee > 0 && (
                  <div className="flex justify-between items-center text-orange-600">
                    <span className="font-bold">Taxa de Entrega</span>
                    <span className="font-bold">+ R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
              </div>
            );
          })()}

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex justify-between items-center">
            <div>
              <p className="text-blue-800 font-black text-sm mb-1">TOTAL DA COMPRA</p>
              <p className="text-blue-600 text-xs font-medium">Pagamento: {order.paymentMethod || 'Pendente'}</p>
            </div>
            <p className="text-3xl font-black text-blue-700">R$ {order.total.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 text-center text-xs text-slate-500 font-medium border-t border-slate-100">
          Obrigado pela preferência! Mantenha essa página salva para acompanhar atualizações.
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
      <TrackOrderContent params={params} />
    </Suspense>
  );
}
