/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../controllers/SocialContext';
import { MarketplaceProduct } from '../models/types';
import { Search, Tag, MapPin, Grid, Plus, X, Heart, Shield, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MarketplaceView: React.FC = () => {
  const { marketplaceProducts, addProduct, openChat, currentUser } = useSocial();
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [showCreateAd, setShowCreateAd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Ad Form States
  const [adTitle, setAdTitle] = useState('');
  const [adPrice, setAdPrice] = useState('');
  const [adCategory, setAdCategory] = useState('Eletrônicos');
  const [adLocation, setAdLocation] = useState('São Paulo, SP');
  const [adDesc, setAdDesc] = useState('');
  const [adImage, setAdImage] = useState('');

  const categories = ['Todos', 'Eletrônicos', 'Fotografia', 'Veículos', 'Imóveis', 'Hobbies'];

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle.trim() || !adPrice) return;

    const priceNum = parseFloat(adPrice);
    const defaultImage = adImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80';

    addProduct(adTitle, priceNum, adCategory, adLocation, adDesc, defaultImage);

    // Reset Form
    setAdTitle('');
    setAdPrice('');
    setAdCategory('Eletrônicos');
    setAdLocation('São Paulo, SP');
    setAdDesc('');
    setAdImage('');
    setShowCreateAd(false);
  };

  const filteredProducts = marketplaceProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Preset images for advertising form
  const productPresets = [
    { name: 'Console PS5', url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80' },
    { name: 'Óculos VR Quest', url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mochila Tech', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80' },
    { name: 'Cadeira Gamer', url: 'https://images.unsplash.com/photo-1598550476439-6847785fce6e?auto=format&fit=crop&w=500&q=80' }
  ];

  return (
    <div className="w-full text-neutral-800 dark:text-[#e4e6eb] select-none">
      
      {/* Marketplace header block */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-150 dark:border-[#3e4042]">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">TG Global Marketplace</h2>
          <p className="text-xs text-neutral-400 mt-1">Compre e venda itens novos e usados localmente com segurança.</p>
        </div>

        <button 
          onClick={() => setShowCreateAd(true)}
          className="px-5 py-2.5 bg-[#1877f2] hover:bg-[#1565c0] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Criar novo anúncio</span>
        </button>
      </div>

      {/* Main split dashboard with filters & items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left column filters */}
        <div className="lg:col-span-3 space-y-5">
          {/* Search bar inside view */}
          <div className="bg-white dark:bg-[#242526] p-4 rounded-2xl border border-neutral-150 dark:border-[#3e4042] shadow-sm">
            <h3 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-3">Filtros de busca</h3>
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar itens..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-[#3a3b3c] border-none text-xs rounded-xl focus:outline-none focus:ring-1"
              />
            </div>
          </div>

          {/* Categories Sidebar */}
          <div className="bg-white dark:bg-[#242526] p-4 rounded-2xl border border-neutral-150 dark:border-[#3e4042] shadow-sm">
            <h3 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-3">Categorias</h3>
            <div className="flex flex-col gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-[#e7f3ff] dark:bg-blue-950/40 text-[#1877f2]' 
                      : 'hover:bg-neutral-50 dark:hover:bg-[#3a3b3c]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column bento items grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-[#242526] rounded-2xl border p-12 text-center text-neutral-500">
              <AlertCircle className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <h4 className="font-bold text-sm">Nenhum item anunciado nesta categoria.</h4>
              <p className="text-xs text-neutral-400 mt-1">Que tal ser o primeiro a criar um anúncio para movimentar a rede?</p>
              <button 
                onClick={() => setShowCreateAd(true)} 
                className="mt-4 px-4 py-2 bg-[#1877f2] text-white text-xs font-bold rounded-xl"
              >
                Anunciar Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <motion.div
                  layoutId={`prod_${product.id}`}
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white dark:bg-[#242526] border border-neutral-200 dark:border-[#3e4042] rounded-2xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer group transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="h-44 bg-neutral-100 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-[#242526]/90 p-1.5 rounded-full shadow-sm hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-base font-extrabold text-neutral-900 dark:text-white block">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span className="text-xs font-bold leading-snug line-clamp-2 hover:text-[#1877f2] transition-colors">{product.title}</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-[#b0b3b8] font-bold">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{product.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 3. Product Detail Dialog Viewer */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`prod_${selectedProduct.id}`}
              className="bg-white dark:bg-[#242526] rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-250 dark:border-[#3e4042] overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
            >
              <div className="md:w-1/2 bg-neutral-100 flex items-center justify-center relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-64 md:h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="md:hidden absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-50 dark:bg-blue-950/40 text-[#1877f2] text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded border border-blue-100">
                      {selectedProduct.category}
                    </span>
                    <button 
                      onClick={() => setSelectedProduct(null)} 
                      className="hidden md:block p-1 hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] rounded-full cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-xl font-extrabold leading-snug">{selectedProduct.title}</h3>
                  <div className="text-2xl font-black text-[#1877f2]">R$ {selectedProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-[#b0b3b8] font-semibold">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    <span>Anunciado em {selectedProduct.location}</span>
                  </div>

                  <hr className="border-neutral-100 dark:border-[#3e4042]" />

                  <div className="space-y-1.5 text-xs font-semibold">
                    <span className="text-neutral-400">Descrição do vendedor:</span>
                    <p className="text-neutral-600 dark:text-[#e4e6eb] leading-relaxed font-medium">{selectedProduct.description || 'Nenhuma descrição adicional.'}</p>
                  </div>

                  <hr className="border-neutral-100 dark:border-[#3e4042]" />

                  {/* Seller info */}
                  <div className="flex items-center gap-3">
                    <img src={selectedProduct.sellerAvatar} alt="Vendedor" className="w-10 h-10 rounded-full object-cover border border-neutral-100" referrerPolicy="no-referrer" />
                    <div>
                      <h5 className="font-bold text-xs">{selectedProduct.sellerName}</h5>
                      <span className="text-[10px] text-neutral-400 block font-semibold">Membro Vendedor TG</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-2 text-xs">
                  <button
                    onClick={() => {
                      // Lookup user
                      alert('Isso abrirá um canal de conversa seguro com o anunciante. Mandaremos um "Olá" automático!');
                      openChat('u_glauber'); // Simulates seller chat
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3 bg-[#1877f2] hover:bg-[#1565c0] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4.5 h-4.5" />
                    <span>Enviar mensagem ao vendedor</span>
                  </button>
                  <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 justify-center font-bold">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Compra Protegida e Garantida por TG Global</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Advertisement Submission Drawer Modal */}
      <AnimatePresence>
        {showCreateAd && (
          <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#242526] rounded-2xl max-w-lg w-full shadow-2xl border border-neutral-200 dark:border-[#3e4042] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-5 py-4 border-b border-neutral-100 dark:border-[#3e4042] flex justify-between items-center bg-neutral-50 dark:bg-neutral-800">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Tag className="w-4.5 h-4.5 text-[#1877f2]" />
                  <span>Anunciar novo item no Marketplace</span>
                </h3>
                <button onClick={() => setShowCreateAd(false)} className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-[#3a3b3c] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAd} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs font-medium">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Título do Anúncio:</label>
                  <input 
                    type="text" 
                    required
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    placeholder="O que você está vendendo?"
                    className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-lg p-2.5 font-semibold focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Preço (R$):</label>
                    <input 
                      type="number" 
                      required
                      value={adPrice}
                      onChange={(e) => setAdPrice(e.target.value)}
                      placeholder="Ex: 150"
                      className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-lg p-2.5 font-semibold focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Categoria:</label>
                    <select
                      value={adCategory}
                      onChange={(e) => setAdCategory(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-lg p-2.5 font-semibold focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]"
                    >
                      <option value="Eletrônicos">Eletrônicos</option>
                      <option value="Fotografia">Fotografia</option>
                      <option value="Veículos">Veículos</option>
                      <option value="Imóveis">Imóveis</option>
                      <option value="Hobbies">Hobbies</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Localização:</label>
                  <input 
                    type="text" 
                    required
                    value={adLocation}
                    onChange={(e) => setAdLocation(e.target.value)}
                    placeholder="Ex: São Paulo, SP"
                    className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-lg p-2.5 font-semibold focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Descrição Detalhada:</label>
                  <textarea 
                    value={adDesc}
                    rows={3}
                    onChange={(e) => setAdDesc(e.target.value)}
                    placeholder="Descreva detalhes, marcas, uso e estado do seu produto..."
                    className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-lg p-2.5 font-semibold focus:outline-none focus:ring-1.5 focus:ring-[#1877f2] leading-relaxed"
                  />
                </div>

                {/* Pre-configured image presets */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Escolha uma imagem de amostra:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {productPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAdImage(preset.url)}
                        className={`p-1 rounded-lg border text-left truncate transition-colors ${
                          adImage === preset.url ? 'border-[#1877f2] bg-blue-50/50 dark:bg-blue-950/20 text-[#1877f2]' : 'border-neutral-200 dark:border-[#3e4042] hover:bg-neutral-50'
                        }`}
                      >
                        <img src={preset.url} alt="Preset prod" className="w-full h-12 object-cover rounded-md" referrerPolicy="no-referrer" />
                        <span className="text-[8px] font-bold block text-center truncate mt-1">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="text-[9px] text-neutral-400 font-semibold pt-1">Ou cole uma URL personalizada abaixo:</div>
                  <input 
                    type="text" 
                    value={adImage}
                    onChange={(e) => setAdImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]"
                  />
                </div>

                <div className="px-5 py-4 border-t border-neutral-100 dark:border-[#3e4042] flex items-center justify-end gap-2 shrink-0 pt-6">
                  <button 
                    type="button"
                    onClick={() => setShowCreateAd(false)}
                    className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-xl hover:bg-neutral-100 cursor-pointer font-bold animate-pulse"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-[#1877f2] hover:bg-[#1565c0] text-white rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer font-bold"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Publicar Anúncio</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
