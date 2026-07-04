/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSocial } from '../controllers/SocialContext';
import { Video, Search, MoreHorizontal, Gift } from 'lucide-react';

export const SidebarRight: React.FC = () => {
  const { users, currentUser, openChat } = useSocial();

  // Filter contacts to show everyone except the current logged-in user
  const contacts = users.filter(user => user.id !== currentUser.id);

  const sponsoredAds = [
    {
      id: 1,
      title: 'Hospedagem de Sites TG Cloud',
      url: 'cloud.tgglobal.com',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=400&q=80',
      description: 'Hospede seus projetos em servidores com NVMe, largura de banda ilimitada e CDN global inclusa. 60% OFF hoje!'
    },
    {
      id: 2,
      title: 'Monitores Gamers Ultra-Wide 4K',
      url: 'shop.tgglobal.com',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80',
      description: 'Experiência imersiva total com painel IPS, 1ms de resposta e 165Hz. Parcele em até 12x sem juros!'
    }
  ];

  return (
    <aside className="w-[280px] shrink-0 sticky top-18 hidden lg:flex flex-col gap-5 self-start max-h-[calc(100vh-5rem)] overflow-y-auto pl-2 pr-1 scrollbar-thin text-neutral-800 dark:text-[#e4e6eb] select-none">
      
      {/* Sponsored Ads Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-neutral-500 dark:text-[#b0b3b8] tracking-wide">Patrocinado</h3>
        
        {sponsoredAds.map(ad => (
          <a 
            key={ad.id} 
            href={`https://${ad.url}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] transition-colors cursor-pointer group"
          >
            <img 
              src={ad.image} 
              alt={ad.title} 
              className="w-20 h-20 rounded-xl object-cover border border-neutral-200 dark:border-neutral-700 group-hover:opacity-90 transition-opacity shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-xs leading-tight group-hover:underline truncate">{ad.title}</span>
              <span className="text-[10px] text-neutral-400 dark:text-[#b0b3b8] mt-0.5 truncate">{ad.url}</span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug line-clamp-2">{ad.description}</span>
            </div>
          </a>
        ))}
      </div>

      <hr className="border-neutral-200 dark:border-[#3e4042] my-1" />

      {/* Birthdays Section */}
      <div className="flex items-start gap-3 p-2.5 bg-neutral-50 dark:bg-[#2e3032]/30 border border-neutral-150 dark:border-neutral-800 rounded-2xl">
        <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 shrink-0">
          <Gift className="w-5 h-5 animate-bounce" />
        </div>
        <div className="text-xs leading-relaxed">
          <span className="font-bold">Aniversários de hoje:</span>
          <p className="text-neutral-600 dark:text-[#b0b3b8] mt-0.5">
            <span className="font-semibold hover:underline cursor-pointer">Glauber Lima</span> e <span className="font-semibold hover:underline cursor-pointer">Carolina Souza</span> fazem aniversário hoje. Deseje parabéns!
          </p>
        </div>
      </div>

      <hr className="border-neutral-200 dark:border-[#3e4042] my-1" />

      {/* Contacts List Section (Facebook replica contacts header) */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-neutral-500 dark:text-[#b0b3b8] tracking-wide">Contatos</h3>
          <div className="flex items-center gap-2 text-neutral-500 dark:text-[#b0b3b8]">
            <button className="p-1 rounded-full hover:bg-neutral-150 dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors" title="Nova chamada de vídeo">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-full hover:bg-neutral-150 dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors" title="Pesquisar contato">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-full hover:bg-neutral-150 dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors" title="Opções">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contacts scrolling list */}
        <div className="flex flex-col gap-1">
          {contacts.map(user => (
            <div 
              key={user.id}
              onClick={() => openChat(user.id)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] cursor-pointer transition-all active:scale-98 group"
            >
              <div className="relative shrink-0">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8.5 h-8.5 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                {/* Active Green Dot over Avatar */}
                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#31a24c] ring-2 ring-white dark:ring-[#18191a]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold leading-none truncate block group-hover:text-[#1877f2] transition-colors">{user.name}</span>
                <span className="text-[10px] text-neutral-400 dark:text-[#b0b3b8] mt-0.5 block truncate">
                  {user.isAI ? 'Inteligência Artificial' : user.isOnline ? 'Disponível' : 'Ausente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
