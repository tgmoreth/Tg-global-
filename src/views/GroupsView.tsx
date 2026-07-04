/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../controllers/SocialContext';
import { Group } from '../models/types';
import { Users, Search, Plus, Grid, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [membersCount, setMembersCount] = useState(group.membersCount);

  const handleJoin = () => {
    if (isJoined) {
      setIsJoined(false);
      setMembersCount(membersCount - 1);
    } else {
      setIsJoined(true);
      setMembersCount(membersCount + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-[#242526] border border-neutral-150 dark:border-[#3e4042] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 text-neutral-800 dark:text-[#e4e6eb] flex flex-col justify-between">
      <div>
        <div className="h-32 bg-neutral-100 relative">
          <img 
            src={group.coverPhoto} 
            alt={group.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute top-3 left-3 bg-[#1877f2] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm border border-[#1877f2]/10 tracking-wider">
            {group.category}
          </span>
        </div>
        <div className="p-4 space-y-2">
          <h4 className="font-bold text-sm leading-snug hover:text-[#1877f2] transition-colors hover:underline cursor-pointer">{group.name}</h4>
          <span className="text-[10px] text-neutral-400 dark:text-[#b0b3b8] font-bold block">
            {membersCount.toLocaleString('pt-BR')} membros
          </span>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium line-clamp-3">{group.description}</p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={handleJoin}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            isJoined 
              ? 'bg-neutral-100 hover:bg-neutral-200 dark:bg-[#3a3b3c] text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-700' 
              : 'bg-[#1877f2] hover:bg-[#1565c0] text-white shadow-sm'
          }`}
        >
          {isJoined ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span>Participando</span>
            </>
          ) : (
            <span>Participar do grupo</span>
          )}
        </button>
      </div>
    </div>
  );
};

export const GroupsView: React.FC = () => {
  const { groups } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || g.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full text-neutral-800 dark:text-[#e4e6eb] select-none space-y-6">
      
      {/* View Header block */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-150 dark:border-[#3e4042]">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#1877f2]/10 text-[#1877f2] rounded-xl shrink-0">
            <Users className="w-5.5 h-5.5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">TG Global Grupos</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Participe de comunidades do seu interesse para compartilhar ideias e códigos.</p>
          </div>
        </div>
        
        <button 
          onClick={() => alert('Para criar um novo grupo, entre em contato com os administradores da TG Global!')}
          className="px-5 py-2.5 bg-[#1877f2] hover:bg-[#1565c0] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Criar novo grupo</span>
        </button>
      </div>

      {/* Grid filter layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left filter bar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#242526] p-4 rounded-2xl border border-neutral-150 dark:border-[#3e4042] shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Pesquisar grupos</h3>
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digitar grupo..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-[#3a3b3c] border-none text-xs rounded-xl focus:outline-none focus:ring-1"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-[#242526] p-4 rounded-2xl border border-neutral-150 dark:border-[#3e4042] shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Filtro por interesse</h3>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => setActiveTab('all')}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                  activeTab === 'all' ? 'bg-[#e7f3ff] dark:bg-blue-950/40 text-[#1877f2]' : 'hover:bg-neutral-50 dark:hover:bg-[#3a3b3c]'
                }`}
              >
                Todos os interesses
              </button>
              <button 
                onClick={() => setActiveTab('programming')}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                  activeTab === 'programming' ? 'bg-[#e7f3ff] dark:bg-blue-950/40 text-[#1877f2]' : 'hover:bg-neutral-50'
                }`}
              >
                Programação & Dev
              </button>
              <button 
                onClick={() => setActiveTab('gaming')}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                  activeTab === 'gaming' ? 'bg-[#e7f3ff] dark:bg-blue-950/40 text-[#1877f2]' : 'hover:bg-neutral-50'
                }`}
              >
                Jogos & Tecnologia
              </button>
              <button 
                onClick={() => setActiveTab('photography')}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                  activeTab === 'photography' ? 'bg-[#e7f3ff] dark:bg-blue-950/40 text-[#1877f2]' : 'hover:bg-neutral-50'
                }`}
              >
                Fotografia & Design
              </button>
            </div>
          </div>
        </div>

        {/* Right list groups bento */}
        <div className="lg:col-span-9">
          {filteredGroups.length === 0 ? (
            <div className="bg-white dark:bg-[#242526] border rounded-2xl p-12 text-center text-neutral-500">
              <Info className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
              <p className="text-xs font-semibold">Nenhum grupo encontrado com seus filtros atuais.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
