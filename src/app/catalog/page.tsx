'use client';
import React, { useState } from 'react';
import { useGlobal } from '@/context/GlobalContext';

export default function CatalogPage() {
  const { catalogItems, addCatalogItem, removeCatalogItem } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<{name: string, cat: string, price: number, emoji: string, unit: 'unidade' | 'm2' | 'kg' | 'metro'}>({ name: '', cat: 'Vestuário Diário', price: 0, emoji: '🧺', unit: 'unidade' });

  const getEmojiForName = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('tapete') || n.includes('carpete')) return '🧵';
    if (n.includes('camisa') || n.includes('polo')) return '👔';
    if (n.includes('camiseta') || n.includes('blusa')) return '👕';
    if (n.includes('calça') || n.includes('bermuda') || n.includes('short')) return '👖';
    if (n.includes('vestido') || n.includes('saia')) return '👗';
    if (n.includes('terno') || n.includes('blazer') || n.includes('paletó')) return '🕴️';
    if (n.includes('casaco') || n.includes('jaqueta') || n.includes('moletom')) return '🧥';
    if (n.includes('edredom') || n.includes('cobertor') || n.includes('lençol') || n.includes('fronha')) return '🛏️';
    if (n.includes('toalha') || n.includes('banho')) return '🛁';
    if (n.includes('tênis') || n.includes('sapato') || n.includes('calçado')) return '👟';
    if (n.includes('cortina') || n.includes('persiana')) return '🪟';
    if (n.includes('bolsa') || n.includes('mala')) return '👜';
    return '🧺';
  };

  const handleAddItem = () => {
    if (!newItem.name || newItem.price <= 0) return alert('Preencha o nome e um preço válido.');
    addCatalogItem({
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      name: newItem.name,
      cat: newItem.cat,
      price: Number(newItem.price),
      emoji: newItem.emoji,
      unit: newItem.unit
    });
    setIsModalOpen(false);
    setNewItem({ name: '', cat: 'Vestuário Diário', price: 0, emoji: '🧺', unit: 'unidade' });
  };

  return (
    <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col">
      <div className="px-8 pt-10 pb-6 shrink-0 border-b border-slate-200 bg-white flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light text-slate-800 mb-2">Catálogo de Itens</h2>
          <p className="text-slate-500 text-sm">Gerencie os serviços, preços e produtos disponíveis na Lavanderia.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-md"
        >
          + Novo Item
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Adicionar Serviço</h3>
            
            <label className="block text-xs font-bold text-slate-500 mb-1">Nome do Item</label>
            <div className="flex gap-2 mb-3">
              <div className="w-12 bg-slate-100 border border-slate-300 rounded flex items-center justify-center text-xl">
                {newItem.emoji}
              </div>
              <input 
                type="text" 
                value={newItem.name} 
                onChange={e => {
                  const name = e.target.value;
                  setNewItem({...newItem, name, emoji: getEmojiForName(name)});
                }}
                className="flex-1 border border-slate-300 rounded p-2 text-sm" 
                placeholder="Ex: Blazer de Lã" 
              />
            </div>

            <label className="block text-xs font-bold text-slate-500 mb-1">Preço (R$)</label>
            <input 
              type="number" 
              value={newItem.price || ''} 
              onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
              className="w-full border border-slate-300 rounded p-2 mb-3 text-sm" 
              placeholder="0.00" 
            />

            <label className="block text-xs font-bold text-slate-500 mb-1">Categoria</label>
            <select 
              value={newItem.cat}
              onChange={e => setNewItem({...newItem, cat: e.target.value})}
              className="w-full border border-slate-300 rounded p-2 mb-3 text-sm"
            >
              <option>Vestuário Diário</option>
              <option>Cama e Banho</option>
              <option>Tapeçaria</option>
              <option>Especial</option>
            </select>

            <label className="block text-xs font-bold text-slate-500 mb-1">Tipo de Cobrança</label>
            <select 
              value={newItem.unit}
              onChange={e => setNewItem({...newItem, unit: e.target.value as any})}
              className="w-full border border-slate-300 rounded p-2 mb-4 text-sm bg-blue-50"
            >
              <option value="unidade">Por Unidade (Roupas comuns)</option>
              <option value="m2">Por Metro Quadrado (m² - Tapetes/Cortinas)</option>
              <option value="kg">Por Quilo (kg - Roupas em cesto)</option>
              <option value="metro">Por Metro Linear (Cortinas simples)</option>
            </select>

            <div className="flex gap-2">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold text-sm">Cancelar</button>
              <button onClick={handleAddItem} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-sm">Salvar</button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Código</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Descrição do Item</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Categoria</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Preço Base</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {catalogItems.length === 0 && (
                 <tr><td colSpan={5} className="py-8 text-center text-slate-400">Nenhum item cadastrado.</td></tr>
              )}
              {catalogItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-sm text-slate-500 font-mono">{item.id}</td>
                  <td className="py-4 px-6 text-sm text-slate-800 font-semibold">
                    {item.emoji} {item.name}
                    <span className="block text-[10px] text-slate-400 mt-0.5">Cobrança: {item.unit}</span>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                      {item.cat}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-700 text-right">R$ {item.price.toFixed(2).replace('.', ',')}</td>
                  <td className="py-4 px-6 text-sm text-right">
                    <button 
                      onClick={() => removeCatalogItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
