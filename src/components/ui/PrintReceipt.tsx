import React from 'react';
import { CartItemType, useGlobal } from '@/context/GlobalContext';
import { QRCodeSVG } from 'qrcode.react';

interface PrintReceiptProps {
  orderId: string;
  osNumber?: string;
  client: string | null;
  deadline: string | null;
  items: CartItemType[];
  total: number;
  deliveryFee?: number;
  discountType?: 'percent' | 'fixed';
  discountValue?: number;
  paymentMethod: string | null;
  rollSize: '58mm' | '80mm';
  copies?: number;
  onlyCarpetTag?: boolean;
}

export function PrintReceipt({ orderId, osNumber, client, deadline, items, total, deliveryFee = 0, discountType, discountValue = 0, paymentMethod, rollSize, copies = 1, onlyCarpetTag = false }: PrintReceiptProps) {
  const { companyInfo } = useGlobal();
  
  // Configurando a largura baseado na bobina. A área útil de 58mm é 48mm (aprox 180px).
  const maxWidthClass = rollSize === '58mm' ? 'w-[48mm] max-w-[180px]' : 'w-[72mm] max-w-[270px]';
  const textBase = rollSize === '58mm' ? 'text-[9px]' : 'text-xs';
  const textSm = rollSize === '58mm' ? 'text-[8px]' : 'text-[10px]';
  const textLg = rollSize === '58mm' ? 'text-sm' : 'text-lg';
  const textXl = rollSize === '58mm' ? 'text-lg' : 'text-xl';

  const carpetItems = items.filter(i => i.name.toLowerCase().includes('tapete'));

  const domainUrl = typeof window !== 'undefined' ? window.location.origin : 'https://lavaos-frontend-aw8c.vercel.app';
  const trackUrl = `${domainUrl}/track/${osNumber || orderId}`;

  const ReceiptContent = ({ isCopy }: { isCopy?: boolean }) => (
    <div className={`mb-8 bg-white text-black font-mono ${textBase} mx-auto relative ${maxWidthClass}`} style={{ overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            margin: 0;
            size: ${rollSize === '58mm' ? '58mm' : '80mm'} auto;
          }
          body {
            margin: 0;
            padding-left: ${rollSize === '58mm' ? '2mm' : '4mm'};
          }
        }
      `}} />
      <div className="text-center mb-4 px-1">
        {companyInfo.logoUrl ? (
          <img src={companyInfo.logoUrl} alt="Logo" className="w-12 h-12 object-contain mx-auto mb-2 grayscale" />
        ) : null}

        <h1 className={`font-black ${textLg} leading-tight uppercase mt-2`}>{companyInfo.name}</h1>
        {isCopy && <div className={`${textSm} font-bold bg-black text-white py-1 my-1`}>VIA DA LOJA</div>}

        <p className={`${textSm} leading-tight mt-1`}>CNPJ: {companyInfo.cnpj}</p>
        <p className={`${textSm} leading-tight mb-2`}>{companyInfo.address} - {companyInfo.phone}</p>
        <div className="border-t border-b border-dashed border-black py-1">
          <h2 className="font-bold">CUPOM DE SERVIÇO</h2>
          <p className={textSm}>{new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      <div className="mb-3 px-1">
        <p className="font-bold">Cliente: <span className="font-normal">{client || 'Consumidor'}</span></p>
        <p className="font-bold">Entrega: <span className="font-normal">{deadline || 'A combinar'}</span></p>
      </div>

      <div className="mb-3 px-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-dashed border-black">
              <th className={`font-bold pb-1 ${textSm}`}>QTD</th>
              <th className={`font-bold pb-1 ${textSm}`}>ITEM</th>
              <th className={`font-bold pb-1 text-right ${textSm}`}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
             {items.length === 0 ? (
               <tr><td colSpan={3} className={`text-center pt-2 ${textSm}`}>Sem itens</td></tr>
             ) : (
               items.map((item, idx) => (
                 <tr key={idx}>
                   <td className={`pt-1 ${textSm} align-top`}>{item.quantity}x</td>
                   <td className={`pt-1 ${textSm} align-top leading-tight truncate max-w-[80px]`}>
                     {item.name}
                     {item.unit === 'm2' && <div className="text-[7px] text-gray-500">{item.width}x{item.length}m</div>}
                     {item.unit === 'kg' && <div className="text-[7px] text-gray-500">{item.weight}kg</div>}
                   </td>
                   <td className={`pt-1 ${textSm} align-top text-right whitespace-nowrap`}>R$ {item.subtotal.toFixed(2).replace('.', ',')}</td>
                 </tr>
               ))
             )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-dashed border-black pt-2 mb-3 px-1">
        {(() => {
          const subtotalItems = items.reduce((acc, it) => acc + it.subtotal, 0);
          const discountAmount = discountType === 'percent' ? subtotalItems * (discountValue / 100) : discountValue;
          return (
            <>
              {(discountAmount > 0 || deliveryFee > 0) && (
                <>
                  <div className={`flex justify-between items-center mb-1 ${textSm}`}>
                    <span>Subtotal:</span>
                    <span>R$ {subtotalItems.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className={`flex justify-between items-center mb-1 ${textSm}`}>
                      <span>Desconto:</span>
                      <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  {deliveryFee > 0 && (
                    <div className={`flex justify-between items-center mb-1 ${textSm}`}>
                      <span>Entrega:</span>
                      <span>+ R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between items-center mb-1 mt-2 border-t border-dashed border-slate-300 pt-1">
                <span className="font-bold">TOTAL:</span>
                <span className="font-bold">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </>
          );
        })()}
        <div className={`flex justify-between items-center ${textSm}`}>
          <span>Pagamento:</span>
          <span className="truncate max-w-[80px] text-right">{paymentMethod || 'Pendente'}</span>
        </div>
      </div>

      <div className="text-center mt-4 px-1">
        <p className={`${textSm} mb-2 font-bold uppercase tracking-wide`}>Escaneie o QR Code</p>
        
        <div className="flex justify-center items-center gap-3 mb-2">
          {/* OS Number menor ao lado do QR Code */}
          <div className="text-left">
            <p className="text-[7px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Comanda</p>
            <p className={`${textXl} font-black tracking-widest leading-none`}>{osNumber || orderId}</p>
          </div>

          {/* QR Code Rastreamento */}
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(trackUrl)}`} 
            alt="QR Rastreio" 
            className="w-12 h-12"
          />
        </div>

        <p className="text-[7px] mt-4 text-justify leading-tight">
          TERMOS: Roupas não retiradas em 90 dias doação ref Lei XYZ.
        </p>
        <p className="text-[8px] mt-2 italic text-center font-bold">{companyInfo.name}</p>
      </div>
    </div>
  );

  return (
    <div className="hidden print:block">
      {/* Vias do Ticket Padrão */}
      {!onlyCarpetTag && Array.from({ length: copies }).map((_, i) => (
        <ReceiptContent key={i} isCopy={i > 0} />
      ))}

      {/* Etiqueta Lavável Premium para Tapetes (impressa no final de tudo) */}
      {onlyCarpetTag && carpetItems.map((carpet, idx) => {
        const returnDate = new Date();
        returnDate.setMonth(returnDate.getMonth() + 6);

        return (
          <div key={`carpet-${idx}`} className="page-break-after-always overflow-hidden bg-white text-black mx-auto border border-dashed border-slate-400 print:border-none relative" style={{ width: '50mm', height: '30mm', padding: '2mm', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Cabeçalho */}
            <div className="w-full text-center">
               <p className="text-[7px] font-black uppercase truncate leading-none">{companyInfo.name}</p>
               <p className="text-[5px] uppercase text-slate-500 leading-tight">Lavagem Especial de Tapetes</p>
            </div>
            
            {/* Meio: OS Gigante */}
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <p className="text-[6px] font-bold uppercase tracking-widest mb-0.5">Nº OS</p>
              <h1 className="text-2xl font-black tracking-widest leading-none">{osNumber || orderId}</h1>
            </div>

            {/* Rodapé: Cliente e Data */}
            <div className="w-full flex justify-between items-end border-t border-dashed border-black pt-1">
              <div className="text-left overflow-hidden">
                <p className="text-[5px] text-slate-500 uppercase leading-none">Cliente</p>
                <p className="text-[7px] font-bold truncate max-w-[28mm] leading-none">{client}</p>
              </div>
              <div className="text-right">
                <p className="text-[5px] text-slate-500 uppercase leading-none">Lavagem</p>
                <p className="text-[6px] font-bold leading-none">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}
