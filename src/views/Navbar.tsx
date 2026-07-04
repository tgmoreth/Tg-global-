/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial, ActiveView } from '../controllers/SocialContext';
import { Home, Tv, ShoppingBag, Users, User, Search, MessageSquare, Bell, Moon, Sun, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    selectedProfileUser,
    setSelectedProfileUser,
    searchTerm,
    setSearchTerm,
    isDarkMode,
    setIsDarkMode,
    activeChats,
    openChat
  } = useSocial();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);

  const navItems: { view: ActiveView; icon: React.ReactNode; label: string }[] = [
    { view: 'feed', icon: <Home className="w-6 h-6" />, label: 'Feed' },
    { view: 'watch', icon: <Tv className="w-6 h-6" />, label: 'Watch' },
    { view: 'marketplace', icon: <ShoppingBag className="w-6 h-6" />, label: 'Marketplace' },
    { view: 'groups', icon: <Users className="w-6 h-6" />, label: 'Grupos' },
    { view: 'profile', icon: <User className="w-6 h-6" />, label: 'Perfil' },
  ];

  const notifications = [
    { id: 1, text: 'Carolina Souza curtiu seu comentário no post de Glauber.', time: '5m atrás', unread: true },
    { id: 2, text: 'Glauber Lima publicou no grupo Desenvolvedores React Brasil.', time: '1h atrás', unread: true },
    { id: 3, text: 'Beatriz Silva marcou você em uma publicação.', time: '4h atrás', unread: false },
    { id: 4, text: 'O assistente de IA da TG Global enviou uma mensagem.', time: '1d atrás', unread: false },
  ];

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#242526] border-b border-neutral-200 dark:border-[#3e4042] shadow-sm transition-colors duration-200">
      <div className="max-w-[1920px] mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Left Side: Logo and Search Bar */}
        <div className="flex items-center gap-2 flex-1 max-w-[320px]">
          {/* Facebook Circle F Logo replica but styled with "TG" */}
          <div 
            id="tg_logo"
            onClick={() => {
              setSelectedProfileUser(null);
              setCurrentView('feed');
            }}
            className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
          >
            <span className="font-sans font-black text-white text-xl tracking-tighter">tg</span>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-full hidden md:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar no TG Global..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-neutral-100 dark:bg-[#3a3b3c] border-transparent text-neutral-800 dark:text-[#e4e6eb] placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/50 dark:focus:ring-[#1877f2]/70 transition-all"
            />
          </div>
        </div>

        {/* Center: Tabs navigation */}
        <div className="flex items-center justify-center h-full max-w-[600px] flex-1">
          {navItems.map((item) => {
            const isActive = currentView === item.view && !selectedProfileUser;
            return (
              <button
                key={item.view}
                onClick={() => {
                  setSelectedProfileUser(null);
                  setCurrentView(item.view);
                }}
                title={item.label}
                className={`relative flex items-center justify-center flex-1 h-full max-w-[110px] text-neutral-500 dark:text-[#b0b3b8] hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] hover:text-[#1877f2] dark:hover:text-[#1877f2] transition-all rounded-lg my-1 mx-0.5 group`}
              >
                <div className={`p-2 rounded-lg transition-transform duration-250 ${isActive ? 'text-[#1877f2]' : 'group-hover:scale-105'}`}>
                  {item.icon}
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1877f2] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Action utilities */}
        <div className="flex items-center gap-2 flex-1 justify-end shrink-0">
          
          {/* Quick Profile Tab Link */}
          <button
            onClick={() => {
              setSelectedProfileUser(null);
              setCurrentView('profile');
            }}
            className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] transition-colors cursor-pointer hidden lg:flex"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-7 h-7 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-semibold text-neutral-700 dark:text-[#e4e6eb] pr-1">
              {currentUser.name.split(' ')[0]}
            </span>
          </button>

          {/* Dark Mode toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-[#3a3b3c] hover:bg-neutral-200 dark:hover:bg-[#4e4f50] flex items-center justify-center text-neutral-600 dark:text-[#e4e6eb] transition-all cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Messenger dropdown button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessagesDropdown(!showMessagesDropdown);
                setShowNotifications(false);
              }}
              title="Mensagens"
              className={`w-9 h-9 rounded-full bg-neutral-100 dark:bg-[#3a3b3c] hover:bg-neutral-200 dark:hover:bg-[#4e4f50] flex items-center justify-center text-neutral-600 dark:text-[#e4e6eb] transition-all cursor-pointer ${showMessagesDropdown ? 'bg-[#e7f3ff] text-[#1877f2] dark:bg-[#2e3b4e]' : ''}`}
            >
              <MessageSquare className="w-4.5 h-4.5" />
            </button>

            {/* Quick Messenger Dropdown */}
            {showMessagesDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#242526] rounded-2xl shadow-xl border border-neutral-100 dark:border-[#3e4042] py-3 z-50 animate-fade-in text-neutral-800 dark:text-[#e4e6eb]">
                <div className="px-4 pb-2 border-b border-neutral-100 dark:border-[#3e4042] flex justify-between items-center">
                  <h3 className="font-bold text-lg">Conversas</h3>
                  <span className="text-xs text-[#1877f2] cursor-pointer hover:underline" onClick={() => openChat('u_tg_ai')}>Nova conversa</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div 
                    onClick={() => {
                      openChat('u_tg_ai');
                      setShowMessagesDropdown(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80" 
                      alt="AI Assistant" 
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">TG Global Assistant (IA)</p>
                      <p className="text-xs text-[#1877f2] truncate">Online · Assistente Inteligente</p>
                    </div>
                    <div className="w-2.5 h-2.5 bg-[#31a24c] rounded-full shrink-0" />
                  </div>

                  <div 
                    onClick={() => {
                      openChat('u_glauber');
                      setShowMessagesDropdown(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80" 
                      alt="Glauber" 
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">Glauber Lima</p>
                      <p className="text-xs text-neutral-500 dark:text-[#b0b3b8] truncate">Maravilha! Se precisar de ajuda para...</p>
                    </div>
                    <div className="w-2.5 h-2.5 bg-neutral-300 dark:bg-neutral-500 rounded-full shrink-0" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessagesDropdown(false);
              }}
              title="Notificações"
              className={`relative w-9 h-9 rounded-full bg-neutral-100 dark:bg-[#3a3b3c] hover:bg-neutral-200 dark:hover:bg-[#4e4f50] flex items-center justify-center text-neutral-600 dark:text-[#e4e6eb] transition-all cursor-pointer ${showNotifications ? 'bg-[#e7f3ff] text-[#1877f2] dark:bg-[#2e3b4e]' : ''}`}
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#242526] rounded-2xl shadow-xl border border-neutral-100 dark:border-[#3e4042] py-3 z-50 animate-fade-in text-neutral-800 dark:text-[#e4e6eb]">
                <div className="px-4 pb-2 border-b border-neutral-100 dark:border-[#3e4042] flex justify-between items-center">
                  <h3 className="font-bold text-lg">Notificações</h3>
                  <span className="text-xs text-[#1877f2] cursor-pointer hover:underline">Marcar tudo como lido</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`flex gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-[#3a3b3c] cursor-pointer transition-colors ${notif.unread ? 'bg-[#f0f8ff] dark:bg-[#2e353f]' : ''}`}
                    >
                      <div className="flex-1">
                        <p className="text-xs font-medium leading-tight">{notif.text}</p>
                        <span className="text-[10px] text-neutral-500 dark:text-[#b0b3b8] mt-1 inline-block">{notif.time}</span>
                      </div>
                      {notif.unread && (
                        <div className="w-2 h-2 bg-[#1877f2] rounded-full self-center shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick exit mock info */}
          <button
            onClick={() => {
              alert('TG Global: Você está logado na conta administrativa de Tiago Gomes.');
            }}
            title="Sessão Administrativa"
            className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-[#3a3b3c] hover:bg-neutral-200 dark:hover:bg-[#4e4f50] flex items-center justify-center text-neutral-600 dark:text-[#e4e6eb] hover:text-red-500 dark:hover:text-red-400 transition-all cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>

        </div>
      </div>
    </header>
  );
};
