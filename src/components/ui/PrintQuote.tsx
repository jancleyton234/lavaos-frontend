import React from 'react';
import { CartItemType, useGlobal } from '@/context/GlobalContext';
import { QRCodeSVG } from 'qrcode.react';

interface PrintQuoteProps {
  orderId: string;
  client: string | null;
  deadline: string | null;
  items: CartItemType[];
  total: number;
}

export function PrintQuote({ orderId, client, deadline, items, total }: PrintQuoteProps) {
  const { companyInfo } = useGlobal();
  const currentDate = new Date().toLocaleDateString('pt-BR');
  
  return (
    <div className="hidden print:block bg-white text-black font-sans mx-auto w-[210mm] h-[297mm] p-12">
      {/* Cabecalho */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
        <div className="flex items-center gap-4">
          {companyInfo.logoUrl && (
            <img src={companyInfo.logoUrl} alt="Logo" className="w-20 h-20 object-contain" />
          )}
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">{companyInfo.name}</h1>
            <p className="text-slate-500 text-sm font-semibold mt-1">{companyInfo.address}</p>
            <p className="text-slate-500 text-sm">CNPJ: {companyInfo.cnpj}</p>
            <p className="text-slate-500 text-sm">WhatsApp: {companyInfo.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-light text-slate-400">ORÇAMENTO</h2>
          <p className="text-lg font-bold text-slate-700">{orderId}</p>
          <p className="text-sm text-slate-500">Data: {currentDate}</p>
        </div>
      </div>

      {/* Dados do Cliente */}
      <div className="mb-10 bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Dados do Cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 mb-1">Nome / Razão Social</p>
            <p className="font-bold text-slate-800 text-lg">{client || 'Consumidor Final'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Prazo Estimado de Entrega</p>
            <p className="font-bold text-slate-800 text-lg">{deadline || 'A definir'}</p>
          </div>
        </div>
      </div>

      {/* Tabela de Servicos */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Serviços Orçados</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-y border-slate-300">
              <th className="py-3 px-4 font-bold text-sm text-slate-700">Item</th>
              <th className="py-3 px-4 font-bold text-sm text-slate-700 text-center">Quantidade</th>
              <th className="py-3 px-4 font-bold text-sm text-slate-700 text-right">Valor Unitário</th>
              <th className="py-3 px-4 font-bold text-sm text-slate-700 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
             {items.length === 0 ? (
               <tr><td colSpan={4} className="py-4 text-center text-slate-500">Nenhum item inserido.</td></tr>
             ) : (
               items.map((item, idx) => (
                 <tr key={idx}>
                   <td className="py-3 px-4 font-bold">{item.quantity}</td>
                   <td className="py-3 px-4">
                     {item.name}
                     {item.unit === 'm2' && <span className="block text-xs text-slate-500">{item.width}m x {item.length}m</span>}
                     {item.unit === 'kg' && <span className="block text-xs text-slate-500">{item.weight} kg</span>}
                   </td>
                   <td className="py-3 px-4 text-right text-slate-600">R$ {item.pricePerUnit.toFixed(2).replace('.', ',')}</td>
                   <td className="py-3 px-4 text-right font-bold">R$ {item.subtotal.toFixed(2).replace('.', ',')}</td>
                 </tr>
               ))
             )}
          </tbody>
        </table>
      </div>

      {/* Totais */}
      <div className="flex justify-end mb-16">
        <div className="w-1/2 bg-slate-50 p-6 rounded-lg border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-600">Subtotal:</span>
            <span className="text-slate-800 font-semibold">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-600">Descontos:</span>
            <span className="text-slate-800 font-semibold">R$ 0,00</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-300 pt-3 mt-3">
            <span className="text-slate-800 font-bold text-lg">TOTAL FINAL:</span>
            <span className="text-blue-700 font-black text-2xl">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>

      {/* Footer com QR Code */}
      <div className="mt-auto pt-8 border-t border-slate-200">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-bold text-slate-800 mb-2">Acompanhe seu pedido</h3>
            <p className="text-sm text-slate-500 mb-2">Escaneie o código ao lado com a câmera do celular para rastrear em tempo real.</p>
            <p className="text-xs text-blue-600 font-bold">{typeof window !== 'undefined' ? `${window.location.origin}/track/${orderId}` : ''}</p>
          </div>
          <div>
             {typeof window !== 'undefined' && (
               <QRCodeSVG value={`${window.location.origin}/track/${orderId}`} size={100} level="M" className="border-4 border-white shadow-sm" />
             )}
          </div>
        </div>
      </div>

      {/* Rodape e Assinaturas */}
      <div className="mt-8 border-t border-slate-200 pt-8">
        <p className="text-slate-500 text-sm mb-12 text-center">
          Este orçamento é válido por 15 dias a partir da data de emissão.
        </p>
        <div className="flex justify-between px-12">
          <div className="text-center w-64">
            <div className="border-t border-slate-400 pt-2">
              <p className="text-sm font-bold text-slate-700">{companyInfo.name}</p>
              <p className="text-xs text-slate-500">Autorizado</p>
            </div>
          </div>
          <div className="text-center w-64">
            <div className="border-t border-slate-400 pt-2">
              <p className="text-sm font-bold text-slate-700">{client || 'Cliente'}</p>
              <p className="text-xs text-slate-500">De Acordo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
