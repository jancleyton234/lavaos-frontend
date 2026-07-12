'use client';

import React from 'react';

export default function DevelopersPortalPage() {
  return (
    <div className="flex h-screen bg-[#09090b] font-sans text-neutral-200">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#09090b] border-r border-neutral-900 flex flex-col">
        <div className="p-6 border-b border-neutral-900">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] rounded-sm"></div>
            <h2 className="text-xl font-black text-white">LavaOS</h2>
          </div>
          <p className="text-[10px] text-sky-500 font-bold tracking-widest uppercase">API & Developers</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 bg-sky-900/20 text-sky-400 px-4 py-3 rounded-lg font-bold border border-sky-500/20">
            <span>🔌</span> Marketplace
          </a>
          <a href="#" className="flex items-center gap-3 text-neutral-400 hover:text-white px-4 py-3 transition">
            <span>⚡</span> Webhooks (No-Code)
          </a>
          <a href="#" className="flex items-center gap-3 text-neutral-400 hover:text-white px-4 py-3 transition">
            <span>🔑</span> API Keys
          </a>
          <a href="#" className="flex items-center gap-3 text-neutral-400 hover:text-white px-4 py-3 transition">
            <span>❤️</span> Monitor de Saúde
          </a>
          <a href="#" className="flex items-center gap-3 text-neutral-400 hover:text-white px-4 py-3 transition mt-8 border-t border-neutral-900 pt-6">
            <span>📚</span> Documentação Oficial
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <header className="p-8 border-b border-neutral-900 bg-neutral-900/30">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-2">Marketplace de Integrações</h1>
              <p className="text-sm text-neutral-400">Conecte o LavaOS às suas ferramentas favoritas sem escrever código.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold py-2 px-6 rounded-lg transition flex items-center gap-2">
                <span>➕</span> Novo Webhook Personalizado
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          
          {/* Health Monitor Alert (Conditional) */}
          <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-xl flex items-start gap-4">
            <div className="mt-1 p-2 bg-red-900/50 rounded-lg text-red-500">❤️</div>
            <div>
              <h3 className="text-red-400 font-bold mb-1">Atenção no Monitor de Saúde</h3>
              <p className="text-sm text-red-300/80 mb-3">O webhook "Notificar ERP Omie" falhou 12 vezes consecutivas (Erro 429: Too Many Requests).</p>
              <button className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition">
                Ver Logs de Erro
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            
            {/* App Card 1 */}
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-6 flex flex-col group hover:border-sky-500/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-2xl border border-neutral-800 group-hover:border-sky-500/30">
                  💬
                </div>
                <span className="text-[10px] bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded font-bold border border-emerald-500/20">INSTALADO</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">WhatsApp Business API</h3>
              <p className="text-sm text-neutral-400 mb-6 flex-1">
                Dispare notificações automáticas de status de pedido e envie cobranças PIX via WhatsApp.
              </p>
              <button className="w-full bg-neutral-800 text-white font-bold py-2 rounded-lg text-sm hover:bg-neutral-700 transition">
                Configurar Fluxos
              </button>
            </div>

            {/* App Card 2 */}
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-6 flex flex-col group hover:border-sky-500/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-2xl border border-neutral-800 group-hover:border-sky-500/30">
                  💸
                </div>
                <span className="text-[10px] bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded font-bold border border-emerald-500/20">INSTALADO</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Asaas Pagamentos</h3>
              <p className="text-sm text-neutral-400 mb-6 flex-1">
                Emissão automática de boletos, PIX e links de cartão de crédito nativa no Gateway.
              </p>
              <button className="w-full bg-neutral-800 text-white font-bold py-2 rounded-lg text-sm hover:bg-neutral-700 transition">
                Configurar Credenciais
              </button>
            </div>

            {/* App Card 3 */}
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-6 flex flex-col group hover:border-sky-500/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-2xl border border-neutral-800 group-hover:border-sky-500/30">
                  📊
                </div>
                <span className="text-[10px] bg-neutral-900/50 text-neutral-500 px-2 py-1 rounded font-bold border border-neutral-800">DISPONÍVEL</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Meta Ads (Pixel / CAPI)</h3>
              <p className="text-sm text-neutral-400 mb-6 flex-1">
                Envie eventos de conversão (Pedidos Aprovados) diretamente para o algoritmo do Facebook/Instagram.
              </p>
              <button className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded-lg text-sm transition">
                Ativar Integração
              </button>
            </div>

            {/* App Card 4 */}
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-6 flex flex-col group hover:border-sky-500/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-2xl border border-neutral-800 group-hover:border-sky-500/30">
                  ⚡
                </div>
                <span className="text-[10px] bg-neutral-900/50 text-neutral-500 px-2 py-1 rounded font-bold border border-neutral-800">DISPONÍVEL</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Zapier / N8N</h3>
              <p className="text-sm text-neutral-400 mb-6 flex-1">
                Conecte o LavaOS a mais de 5.000 aplicativos usando gatilhos visuais.
              </p>
              <button className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded-lg text-sm transition">
                Ativar Integração
              </button>
            </div>

          </div>
          
          <div className="mt-12 bg-gradient-to-r from-sky-900/20 to-transparent p-8 rounded-2xl border border-sky-900/50">
            <h2 className="text-xl font-black text-white mb-2">Para Desenvolvedores</h2>
            <p className="text-sm text-neutral-400 mb-6 max-w-2xl">
              Acesse a documentação oficial da nossa API RESTful. Gere chaves de API (Bearer Tokens) para construir soluções customizadas em cima do motor do LavaOS.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black hover:bg-neutral-200 font-bold py-2 px-6 rounded-lg transition">
                Ler Documentação
              </button>
              <button className="bg-transparent border border-neutral-700 hover:border-white text-white font-bold py-2 px-6 rounded-lg transition">
                Gerar API Key
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
