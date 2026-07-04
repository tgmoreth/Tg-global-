/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useSocial } from '../controllers/SocialContext';
import { Send, X, Minimize2, Sparkles, Smile, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatWindowProps {
  userId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ userId }) => {
  const { users, getChatMessages, sendMessage, closeChat, setCurrentView, setSelectedProfileUser } = useSocial();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const contactUser = users.find(u => u.id === userId);
  const messages = getChatMessages(userId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const messageToSend = inputText;
    setInputText('');
    
    if (contactUser?.isAI) {
      setIsTyping(true);
    }
    
    await sendMessage(userId, messageToSend);
  };

  useEffect(() => {
    // Turn off typing simulation when message count updates
    if (isTyping) {
      setIsTyping(false);
    }
    // Auto scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!contactUser) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      className="w-76 h-96 bg-white dark:bg-[#242526] border border-neutral-200 dark:border-[#3e4042] rounded-t-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-800 dark:text-[#e4e6eb]"
    >
      {/* Chat Window Header */}
      <div className="bg-white dark:bg-[#242526] px-3.5 py-2.5 border-b border-neutral-100 dark:border-[#3e4042] flex items-center justify-between shrink-0 shadow-sm">
        <div 
          onClick={() => {
            setSelectedProfileUser(contactUser);
            setCurrentView('profile');
          }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="relative">
            <img 
              src={contactUser.avatar} 
              alt={contactUser.name} 
              className="w-8 h-8 rounded-full object-cover border border-neutral-100 dark:border-neutral-700"
              referrerPolicy="no-referrer"
            />
            {contactUser.isOnline && (
              <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-[#31a24c] ring-1.5 ring-white dark:ring-[#242526]" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold truncate group-hover:text-[#1877f2] group-hover:underline transition-all">
              {contactUser.name}
            </h4>
            <span className="text-[9px] text-neutral-400 dark:text-[#b0b3b8] block">
              {contactUser.isAI ? 'Inteligência Artificial' : contactUser.isOnline ? 'Online' : 'Ausente'}
            </span>
          </div>
          {contactUser.isAI && (
            <Sparkles className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20 animate-pulse shrink-0 ml-1" />
          )}
        </div>

        {/* Header Options */}
        <div className="flex items-center gap-1.5 text-neutral-400 dark:text-[#b0b3b8]">
          <button className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] transition-colors cursor-pointer">
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => closeChat(userId)}
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-neutral-50/50 dark:bg-[#18191a]/30">
        
        {/* Helper starter message */}
        <p className="text-[10px] text-neutral-400 dark:text-[#b0b3b8] text-center my-2">
          Início da conversa com {contactUser.name}. Criptografado por TG Global.
        </p>

        {messages.map((msg) => {
          const isMe = msg.senderId === 'u_me';
          return (
            <div 
              key={msg.id}
              className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <img 
                  src={contactUser.avatar} 
                  alt={contactUser.name} 
                  className="w-6 h-6 rounded-full object-cover border border-neutral-100 dark:border-neutral-700 shrink-0 mb-1"
                  referrerPolicy="no-referrer"
                />
              )}
              <div 
                className={`max-w-[75%] px-3.5 py-2 text-xs rounded-2xl ${
                  isMe 
                    ? 'bg-[#1877f2] text-white rounded-br-none shadow-sm font-medium' 
                    : 'bg-neutral-200 dark:bg-[#3a3b3c] text-neutral-800 dark:text-[#e4e6eb] rounded-bl-none font-medium'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex items-end gap-2">
            <img 
              src={contactUser.avatar} 
              alt={contactUser.name} 
              className="w-6 h-6 rounded-full object-cover border border-neutral-100 dark:border-neutral-700 shrink-0 mb-1"
              referrerPolicy="no-referrer"
            />
            <div className="bg-neutral-200 dark:bg-[#3a3b3c] px-3.5 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-neutral-500 dark:bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-neutral-500 dark:bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-neutral-500 dark:bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Window Footer / Send Box */}
      <form onSubmit={handleSend} className="px-3 py-2 border-t border-neutral-100 dark:border-[#3e4042] flex items-center gap-2 shrink-0 bg-white dark:bg-[#242526]">
        <button type="button" className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] text-neutral-400 hover:text-neutral-600 dark:hover:text-[#e4e6eb] cursor-pointer" title="Anexar foto">
          <ImageIcon className="w-4 h-4" />
        </button>
        <button type="button" className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] text-neutral-400 hover:text-neutral-600 dark:hover:text-[#e4e6eb] cursor-pointer mr-1" title="Escolher emoji">
          <Smile className="w-4 h-4" />
        </button>
        
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Mensagem..."
          className="flex-1 bg-neutral-100 dark:bg-[#3a3b3c] rounded-full px-4 py-2 text-xs text-neutral-800 dark:text-[#e4e6eb] placeholder-neutral-400 focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]/50 transition-all border-none"
        />

        <button 
          type="submit"
          disabled={!inputText.trim()}
          className={`p-2 rounded-full flex items-center justify-center transition-all ${
            inputText.trim() 
              ? 'bg-[#1877f2] hover:bg-[#1565c0] text-white shadow-md active:scale-90 cursor-pointer' 
              : 'text-neutral-300 dark:text-neutral-600'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </motion.div>
  );
};

export const MessengerPopup: React.FC = () => {
  const { activeChats } = useSocial();

  return (
    <div className="fixed bottom-0 right-6 z-50 flex items-end gap-4 pointer-events-none max-w-[calc(100vw-3rem)]">
      <div className="flex items-end gap-4 pointer-events-auto">
        <AnimatePresence>
          {activeChats.map(userId => (
            <ChatWindow key={userId} userId={userId} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
