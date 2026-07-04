/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AuthViewProps {
  onLoginSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('tgmoreth@gmail.com'); // Autofill user's email for custom feel!
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLoginSuccess();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#18191a] text-neutral-800 dark:text-neutral-200 flex items-center justify-center p-4 sm:p-12 transition-colors duration-200 select-none">
      <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
        
        {/* Left Side: Brand presentation */}
        <div className="md:col-span-7 space-y-4 text-center md:text-left">
          <h1 className="text-5xl font-black text-[#1877f2] tracking-tighter sm:text-6xl">
            tg global
          </h1>
          <p className="text-lg sm:text-2xl leading-normal font-semibold max-w-[500px] mx-auto md:mx-0 text-neutral-700 dark:text-neutral-300">
            O TG Global ajuda você a se conectar, interagir e compartilhar momentos reais com as pessoas que fazem parte da sua vida.
          </p>
          <div className="hidden md:flex items-center gap-2 pt-2.5 text-xs font-mono text-neutral-400">
            <span className="w-2.5 h-2.5 bg-[#31a24c] rounded-full animate-pulse" />
            <span>Servidor Cloud Run Node.js • MVC ativo</span>
          </div>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="md:col-span-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#242526] p-4.5 rounded-2xl shadow-xl border border-neutral-200/50 dark:border-neutral-800 space-y-4"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ou número de telefone"
                className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-1.5 focus:ring-[#1877f2] font-semibold text-neutral-800 dark:text-[#e4e6eb] placeholder-neutral-400"
              />

              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-1.5 focus:ring-[#1877f2] font-semibold text-neutral-800 dark:text-[#e4e6eb] placeholder-neutral-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1877f2] hover:bg-[#1565c0] disabled:bg-neutral-300 text-white rounded-xl text-sm font-extrabold shadow-md hover:shadow-lg hover:-translate-y-0.2 active:scale-98 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Entrar</span>
                )}
              </button>
            </form>

            <div className="text-center">
              <span className="text-xs text-[#1877f2] hover:underline cursor-pointer font-semibold">Esqueceu a senha?</span>
            </div>

            <hr className="border-neutral-150 dark:border-[#3e4042] my-1" />

            <div className="text-center pt-1.5">
              <button 
                onClick={handleSubmit}
                className="px-5 py-3.5 bg-[#42b72a] hover:bg-[#36a420] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Criar nova conta
              </button>
            </div>
          </motion.div>

          <p className="text-center text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-6 max-w-[280px] mx-auto leading-normal">
            <strong className="hover:underline cursor-pointer">Criar uma Página</strong> para uma celebridade, marca ou empresa na TG Global.
          </p>
        </div>

      </div>
    </div>
  );
};
