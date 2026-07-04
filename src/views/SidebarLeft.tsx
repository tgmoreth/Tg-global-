/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSocial, ActiveView } from '../controllers/SocialContext';
import { Home, Tv, ShoppingBag, Users, User, Bookmark, History, Flag, Calendar, Settings, Info, Database } from 'lucide-react';

export const SidebarLeft: React.FC = () => {
  const { currentView, setCurrentView, currentUser, setSelectedProfileUser } = useSocial();

  const handleProfileClick = () => {
    setSelectedProfileUser(null);
    setCurrentView('profile');
  };

  const navItems: { view: ActiveView; icon: React.ReactNode; label: string; color: string }[] = [
    { view: 'feed', icon: <Home className="w-5.5 h-5.5" />, label: 'Feed de Notícias', color: 'text-[#1877f2]' },
    { view: 'watch', icon: <Tv className="w-5.5 h-5.5" />, label: 'Watch (Vídeos)', color: 'text-[#54c7ec]' },
    { view: 'marketplace', icon: <ShoppingBag className="w-5.5 h-5.5" />, label: 'Marketplace', color: 'text-[#f7b928]' },
    { view: 'groups', icon: <Users className="w-5.5 h-5.5" />, label: 'Grupos', color: 'text-[#2abba7]' },
    { view: 'profile', icon: <User className="w-5.5 h-5.5" />, label: 'Meu Perfil', color: 'text-[#e94e77]' },
  ];

  const secondaryItems = [
    { icon: <History className="w-5.5 h-5.5 text-indigo-500" />, label: 'Lembranças' },
    { icon: <Bookmark className="w-5.5 h-5.5 text-purple-500" />, label: 'Salvos' },
    { icon: <Flag className="w-5.5 h-5.5 text-orange-500" />, label: 'Páginas' },
    { icon: <Calendar className="w-5.5 h-5.5 text-red-500" />, label: 'Eventos' },
    { icon: <Settings className="w-5.5 h-5.5 text-gray-500" />, label: 'Configurações' },
  ];

  return (
    <aside className="w-[300px] shrink-0 sticky top-18 hidden xl:flex flex-col gap-4 self-start max-h-[calc(100vh-5rem)] overflow-y-auto pr-2 scrollbar-thin text-neutral-800 dark:text-[#e4e6eb] select-none">
      
      {/* Current User Shortcut */}
      <div 
        onClick={handleProfileClick}
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors"
      >
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          className="w-9 h-9 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shadow-sm"
          referrerPolicy="no-referrer"
        />
        <span className="font-semibold text-sm leading-tight truncate">{currentUser.name}</span>
      </div>

      {/* Main navigation list */}
      <div className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => {
              setSelectedProfileUser(null);
              setCurrentView(item.view);
            }}
            className={`flex items-center gap-4 p-2.5 rounded-xl text-left text-sm font-semibold transition-all hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] ${
              currentView === item.view ? 'bg-neutral-100 dark:bg-[#3a3b3c] text-[#1877f2]' : ''
            }`}
          >
            <span className={item.color}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <hr className="border-neutral-200 dark:border-[#3e4042] my-1" />

      {/* Secondary items list */}
      <div className="flex flex-col gap-1">
        <h4 className="text-xs font-bold text-neutral-500 dark:text-[#b0b3b8] px-2.5 mb-1.5 uppercase tracking-wider">Atalhos do TG</h4>
        {secondaryItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors text-sm font-medium"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <hr className="border-neutral-200 dark:border-[#3e4042] my-1" />

      {/* Architectural & Technology Inspector Info Box */}
      <div className="bg-blue-50/50 dark:bg-[#1a2635] border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4 space-y-3.5 text-xs">
        <div className="flex items-center gap-2 text-[#1877f2] font-bold">
          <Info className="w-4.5 h-4.5 shrink-0" />
          <span>Inspecionar Arquitetura MVC</span>
        </div>
        
        <p className="text-neutral-600 dark:text-[#b0b3b8] leading-relaxed">
          Este sistema simula perfeitamente uma pilha full-stack dinâmica através do padrão MVC:
        </p>

        <div className="space-y-2">
          <div className="flex items-start gap-1.5">
            <span className="font-bold text-[#1877f2] shrink-0">[M]</span>
            <div>
              <span className="font-semibold text-neutral-800 dark:text-[#e4e6eb]">Model:</span>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Representado pela classe relacional <code className="bg-neutral-100 dark:bg-[#2d2e2f] px-1 py-0.2 rounded font-mono">SocialSQLDatabase</code> contendo esquemas de tabelas conectadas, persistidas reativamente.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="font-bold text-green-600 shrink-0">[V]</span>
            <div>
              <span className="font-semibold text-neutral-800 dark:text-[#e4e6eb]">View:</span>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Componentes React 19 estilizados pixel-a-pixel semelhantes à interface clássica e moderna do Facebook, com temas interativos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="font-bold text-purple-600 shrink-0">[C]</span>
            <div>
              <span className="font-semibold text-neutral-800 dark:text-[#e4e6eb]">Controller:</span>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                Orquestrado por <code className="bg-neutral-100 dark:bg-[#2d2e2f] px-1 py-0.2 rounded font-mono">SocialContext</code> que manipula os dados das tabelas baseando-se em ações do usuário.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="font-bold text-amber-600 shrink-0">[SQL]</span>
            <div>
              <span className="font-semibold text-neutral-800 dark:text-[#e4e6eb]">Queries de Banco:</span>
              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5 font-mono text-[10px] bg-neutral-100 dark:bg-[#2a2b2c] p-1.5 rounded">
                SELECT * FROM posts<br/>
                JOIN users ON posts.userId = users.id<br/>
                ORDER BY createdAt DESC;
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-[#8a8d91] font-mono border-t border-neutral-150 dark:border-neutral-800 pt-2">
          <Database className="w-3.5 h-3.5" />
          <span>Status: 100% Operacional</span>
        </div>
      </div>
    </aside>
  );
};
