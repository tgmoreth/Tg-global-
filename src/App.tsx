/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SocialProvider, useSocial } from './controllers/SocialContext';
import { Navbar } from './views/Navbar';
import { SidebarLeft } from './views/SidebarLeft';
import { SidebarRight } from './views/SidebarRight';
import { FeedView } from './views/FeedView';
import { ProfileView } from './views/ProfileView';
import { MarketplaceView } from './views/MarketplaceView';
import { WatchView } from './views/WatchView';
import { GroupsView } from './views/GroupsView';
import { MessengerPopup } from './views/MessengerPopup';
import { AuthView } from './views/AuthView';

const SocialDashboard: React.FC = () => {
  const { currentView } = useSocial();

  const renderActiveView = () => {
    switch (currentView) {
      case 'feed':
        return <FeedView />;
      case 'profile':
        return <ProfileView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'watch':
        return <WatchView />;
      case 'groups':
        return <GroupsView />;
      default:
        return <FeedView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] flex flex-col justify-between transition-colors duration-200">
      
      {/* 1. Top Navbar */}
      <Navbar />

      {/* 2. Main content container split into 3 columns (Facebook Replica) */}
      <div className="max-w-[1920px] w-full mx-auto flex gap-6 px-4 py-5 flex-1 items-start justify-center">
        
        {/* Left Column Navigation Sidebar */}
        <SidebarLeft />

        {/* Center Main Flow Feed column */}
        <main className="flex-1 max-w-[680px] min-w-0">
          {renderActiveView()}
        </main>

        {/* Right Column Contacts Sidebar */}
        <SidebarRight />

      </div>

      {/* 3. Footer credit block */}
      <footer className="py-8 bg-white dark:bg-[#242526] border-t border-neutral-200 dark:border-[#3e4042] text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500 font-medium select-none">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-sans font-black text-[#1877f2] text-sm tracking-tight">tg global © {new Date().getFullYear()}</span>
            <span>•</span>
            <span>Segurança garantida por criptografia simétrica</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Termos de Uso</span>
            <span className="hover:underline cursor-pointer">Política de Dados</span>
            <span className="hover:underline cursor-pointer">Cookies</span>
            <span className="hover:underline cursor-pointer">Código MVC</span>
          </div>
        </div>
      </footer>

      {/* 4. Desktop Overlay floating Chat boxes */}
      <MessengerPopup />

    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SocialProvider>
      {isAuthenticated ? (
        <SocialDashboard />
      ) : (
        <AuthView onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </SocialProvider>
  );
}
