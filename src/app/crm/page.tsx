'use client';

import React from 'react';
import { useGlobal, LeadStatus } from '@/context/GlobalContext';

const STATUSES: LeadStatus[] = ['Atendimento', 'Curioso', 'Orçamento Solicitado', 'Serviço Fechado', 'Perdido'];

const STATUS_COLORS: Record<LeadStatus, string> = {
  'Atendimento': 'bg-purple-100 text-purple-700 border-purple-200',
  'Curioso': 'bg-blue-100 text-blue-700 border-blue-200',
  'Orçamento Solicitado': 'bg-amber-100 text-amber-700 border-amber-200',
  'Serviço Fechado': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Perdido': 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function CRMPage() {
  const { leads, updateLeadStatus, whatsappConnected } = useGlobal();

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50 h-screen animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-200 bg-white flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-light text-slate-800 mb-1 flex items-center gap-3">
            <span>🎯</span> CRM & Funil de Vendas
          </h1>
          <p className="text-slate-500 text-sm">Contatos recebidos via WhatsApp caem direto aqui.</p>
        </div>
        
        <div>
          {whatsappConnected ? (
            <div className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-sm border border-emerald-300">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              WhatsApp Conectado
            </div>
          ) : (
            <div className="bg-rose-100 text-rose-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 border border-rose-200">
              <span className="text-xl">⚠️</span>
              WhatsApp Desconectado (Vá em Configurações)
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-8 relative z-0">
        <div className="flex gap-6 min-w-max h-full">
          {STATUSES.map(status => (
            <div key={status} className="w-80 flex flex-col h-full bg-slate-100/50 rounded-2xl border border-slate-200">
              <div className="p-4 border-b border-slate-200">
                <h3 className={`font-bold text-sm px-3 py-1 rounded-full border inline-block ${STATUS_COLORS[status]}`}>
                  {status}
                </h3>
                <div className="text-xs text-slate-500 mt-2 ml-1">
                  {leads.filter(l => l.status === status).length} contatos
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {leads.filter(l => l.status === status).map(lead => (
                  <div key={lead.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative">
                    <h4 className="font-bold text-slate-700 text-sm mb-1">{lead.name}</h4>
                    <p className="text-xs font-bold text-emerald-600 mb-2">📞 {lead.phone}</p>
                    <div className="bg-slate-50 p-2 rounded text-xs text-slate-600 italic border-l-2 border-slate-300 line-clamp-2">
                      "{lead.lastMessage}"
                    </div>
                    <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400 font-bold">
                      <span>{lead.date}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         {STATUSES.map(s => {
                           if (s === status) return null;
                           return (
                             <button 
                               key={s}
                               onClick={(e) => { e.stopPropagation(); updateLeadStatus(lead.id, s); }}
                               className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded"
                               title={`Mover para ${s}`}
                             >
                               {s.charAt(0)}
                             </button>
                           );
                         })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
