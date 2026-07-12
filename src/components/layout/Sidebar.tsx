'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Atendimentos', icon: '📝', path: '/' },
    { name: 'Central', icon: '🎧', path: '/atendimento' },
    { name: 'Clientes', icon: '👥', path: '/customers' },
    { name: 'CRM', icon: '🎯', path: '/crm' },
    { name: 'Fábrica', icon: '⚙️', path: '/mes' },
    { name: 'Itens', icon: '👕', path: '/catalog' },
    { name: 'Caixa PDV', icon: '💵', path: '/cash' },
    { name: 'Financeiro', icon: '💰', path: '/finance' },
    { name: 'Marketing', icon: '📣', path: '/marketing' },
    { name: 'Ajustes', icon: '🔧', path: '/settings' },
    { name: 'Painel', icon: '📊', path: '/dashboard' },
  ];

  return (
    <aside className="w-full md:w-64 bg-gradient-to-r md:bg-gradient-to-b from-blue-700 to-blue-900 md:from-blue-600 md:to-blue-800 text-white flex flex-row md:flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-xl z-20 shrink-0 h-20 md:h-screen">
      <div className="hidden md:flex p-6 items-center justify-center border-b border-blue-500/30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">L</div>
          <h1 className="font-bold text-2xl tracking-tight">LavaOS</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-x-auto md:overflow-y-auto overflow-y-hidden scrollbar-hide py-1 md:py-4 flex items-center md:items-stretch h-full">
        <ul className="flex flex-row md:flex-col space-x-1 md:space-x-0 md:space-y-1 px-2 md:px-0 h-full md:h-auto items-center md:items-stretch w-max md:w-full mx-auto md:mx-0">
          {menuItems.map(item => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
            return (
              <li key={item.name} className="h-full md:h-auto flex-shrink-0 flex items-center">
                <Link 
                  href={item.path}
                  className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-medium transition-all rounded-lg md:rounded-none ${
                  isActive 
                    ? 'bg-blue-600/50 md:bg-blue-900/40 text-white border-b-2 md:border-b-0 md:border-l-4 border-white' 
                    : 'text-blue-200 hover:bg-blue-600/30 md:hover:bg-blue-700/50 hover:text-white border-b-2 md:border-b-0 md:border-l-4 border-transparent'
                }`}>
                  <span className="text-xl md:text-lg block leading-none">{item.icon}</span>
                  <span className="truncate leading-none">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
