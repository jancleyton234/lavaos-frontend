'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useGlobal } from '@/context/GlobalContext';

interface AuthWrapperProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
}

export function AuthWrapper({ children, sidebar, topbar }: AuthWrapperProps) {
  const { isAuthenticated, login } = useGlobal();
  const [loginUser, setLoginUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  
  const isPublicRoute = pathname?.startsWith('/track');

  // Se for uma rota pública, renderiza apenas o conteúdo, sem painel lateral ou superior
  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setIsAnimating(true);
      
      setTimeout(() => {
        const success = login(loginUser, pwd);
        if (!success) {
          setError('Usuário ou senha incorretos.');
          setIsAnimating(false);
        }
      }, 800);
    };

    return (
      <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Fundo decorativo animado */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className={`w-full max-w-md relative z-10 transition-all duration-500 ${isAnimating ? 'scale-95 opacity-50 blur-sm' : 'scale-100 opacity-100 blur-0'}`}>
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-10 rounded-3xl shadow-2xl">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-900/50 mb-6 transform rotate-12">
                <span className="text-white text-4xl -rotate-12">🧼</span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">LavaOS</h1>
              <p className="text-slate-400 font-medium mt-1">Gestão Inteligente</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Usuário</label>
                <input 
                  type="text" 
                  value={loginUser}
                  onChange={(e) => { setLoginUser(e.target.value); setError(''); }}
                  placeholder="Digite seu login..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Senha de Acesso</label>
                <input 
                  type="password" 
                  value={pwd}
                  onChange={(e) => { setPwd(e.target.value); setError(''); }}
                  placeholder="Digite sua senha..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {error && <p className="text-rose-400 text-xs font-bold mt-2 animate-in fade-in slide-in-from-top-1">{error}</p>}
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-900/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4 flex justify-center items-center gap-2"
              >
                {isAnimating ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Entrar no Sistema →'
                )}
              </button>
            </form>
          </div>
          
          <p className="text-center text-slate-500 text-xs font-semibold mt-8">
            Desenvolvido por Antigravity AI © 2026<br/>
            Para acessar, use a senha <span className="text-slate-400">123456</span>
          </p>
        </div>
      </div>
    );
  }

  // Renderiza a estrutura normal do LavaOS se estiver autenticado
  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden print:h-auto print:overflow-visible print:bg-white animate-in fade-in duration-500">
      <div className="print:hidden h-auto md:h-full order-last md:order-first z-50">
        {sidebar}
      </div>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden print:h-auto print:overflow-visible print:block">
        <div className="print:hidden">
          {topbar}
        </div>
        {children}
      </div>
    </div>
  );
}
