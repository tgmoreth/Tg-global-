/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../controllers/SocialContext';
import { PostCard } from './FeedView'; // Reuse our PostCard!
import { Camera, Edit, MapPin, Calendar, Heart, Award, CheckCircle, Save, X, Briefcase, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    selectedProfileUser, 
    posts, 
    updateProfile, 
    openChat 
  } = useSocial();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [editedAvatar, setEditedAvatar] = useState('');
  const [editedCover, setEditedCover] = useState('');
  
  // Decide who is the active subject profile
  const isMe = !selectedProfileUser || selectedProfileUser.id === currentUser.id;
  const user = isMe ? currentUser : selectedProfileUser!;

  // SQL-like JOIN: Filter posts written ONLY by this user
  const userPosts = posts.filter(post => post.userId === user.id);

  const handleOpenEdit = () => {
    setEditedName(user.name);
    setEditedBio(user.bio);
    setEditedAvatar(user.avatar);
    setEditedCover(user.coverPhoto);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editedName, editedBio, editedAvatar, editedCover);
    setIsEditing(false);
  };

  // Preset avatars for quick customization
  const avatarPresets = [
    { name: 'Casual', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
    { name: 'Programador', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80' },
    { name: 'Fotógrafa', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
    { name: 'Moderna', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' }
  ];

  const coverPresets = [
    { name: 'Yosemite', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=400&q=80' },
    { name: 'Tech Neon', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=400&q=80' },
    { name: 'Espaço de Trabalho', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=400&q=80' }
  ];

  return (
    <div className="w-full max-w-[940px] mx-auto pb-16 text-neutral-800 dark:text-[#e4e6eb] select-none">
      
      {/* 1. Header Card (Cover, Avatar and Core Metadata) */}
      <div className="bg-white dark:bg-[#242526] rounded-2xl shadow-sm border border-neutral-150 dark:border-[#3e4042] overflow-hidden">
        
        {/* Cover Photo */}
        <div className="h-64 sm:h-80 bg-neutral-100 dark:bg-neutral-800 relative group">
          <img 
            src={user.coverPhoto} 
            alt="Capa de perfil" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isMe && (
            <button 
              onClick={handleOpenEdit}
              className="absolute bottom-4 right-4 bg-white hover:bg-neutral-50 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Editar capa</span>
            </button>
          )}
        </div>

        {/* Profile Details Overlay Section */}
        <div className="px-6 pb-6 relative flex flex-col md:flex-row items-center md:items-end justify-between gap-4 -mt-16 md:-mt-8">
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
            {/* Circular Overlapping Profile Picture */}
            <div className="relative w-36 h-36 rounded-full bg-white dark:bg-[#242526] p-1 shadow-xl shrink-0">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover border border-neutral-100 dark:border-neutral-700"
                referrerPolicy="no-referrer"
              />
              {isMe && (
                <button 
                  onClick={handleOpenEdit}
                  className="absolute bottom-1 right-1 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] border border-white dark:border-neutral-800 text-neutral-700 dark:text-[#e4e6eb] cursor-pointer shadow-md transition-all"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Core User identity metadata */}
            <div className="pb-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{user.name}</h2>
                <CheckCircle className="w-5 h-5 text-[#1877f2] fill-[#1877f2]/10" title="Verificado" />
              </div>
              <p className="text-xs text-[#1877f2] font-bold mt-1 uppercase tracking-wide">
                {user.isAI ? 'Inteligência Artificial Oficial' : 'Desenvolvedor TG'}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-neutral-500 dark:text-[#b0b3b8] mt-3">
                <span className="hover:underline cursor-pointer"><strong className="text-neutral-800 dark:text-[#e4e6eb]">{user.friendsCount}</strong> amigos</span>
                <span>•</span>
                <span className="hover:underline cursor-pointer"><strong className="text-neutral-800 dark:text-[#e4e6eb]">{user.followers.toLocaleString('pt-BR')}</strong> seguidores</span>
              </div>
            </div>
          </div>

          {/* Core Profile action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isMe ? (
              <>
                <button 
                  onClick={handleOpenEdit}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-250 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar perfil</span>
                </button>
                <button 
                  onClick={() => alert('Parabéns! Sua sessão TG Global está totalmente segura.')}
                  className="px-5 py-2.5 bg-[#1877f2] hover:bg-[#1565c0] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Criar anúncio</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => openChat(user.id)}
                  className="px-6 py-2.5 bg-[#1877f2] hover:bg-[#1565c0] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Enviar Mensagem</span>
                </button>
                <button 
                  onClick={() => alert(`Você já é amigo de ${user.name} na TG Global!`)}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Amigos
                </button>
              </>
            )}
          </div>

        </div>

        {/* Profile Tab Navigation Sub-bar */}
        <div className="px-6 border-t border-neutral-100 dark:border-[#3e4042] flex gap-6 text-xs font-bold text-neutral-500 dark:text-[#b0b3b8] overflow-x-auto scrollbar-none">
          <span className="py-4 border-b-3 border-[#1877f2] text-[#1877f2] whitespace-nowrap cursor-pointer">Publicações</span>
          <span className="py-4 hover:text-[#1877f2] whitespace-nowrap cursor-pointer" onClick={() => alert('Seção "Sobre" em manutenção cooperativa.')}>Sobre</span>
          <span className="py-4 hover:text-[#1877f2] whitespace-nowrap cursor-pointer" onClick={() => alert(`Exibindo todos os ${user.friendsCount} amigos cooperados.`)}>Amigos</span>
          <span className="py-4 hover:text-[#1877f2] whitespace-nowrap cursor-pointer" onClick={() => alert('Todas as fotos hospedadas na nuvem.')}>Fotos</span>
          <span className="py-4 hover:text-[#1877f2] whitespace-nowrap cursor-pointer" onClick={() => alert('Vídeos curtos e lives arquivadas.')}>Vídeos</span>
        </div>

      </div>

      {/* 2. Lower Split Section (Presentation details vs User specific posts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        
        {/* Left Column: Bio Presentation Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 shadow-sm border border-neutral-150 dark:border-[#3e4042]">
            <h3 className="text-base font-bold tracking-tight">Apresentação</h3>
            
            {/* Biography content */}
            <p className="text-sm mt-3 leading-relaxed text-center font-medium bg-neutral-50 dark:bg-[#1a1b1c] p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
              {user.bio || 'Sem biografia definida.'}
            </p>

            {isMe && (
              <button 
                onClick={handleOpenEdit}
                className="w-full mt-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] rounded-xl text-xs font-bold transition-all text-center"
              >
                Editar biografia
              </button>
            )}

            {/* List of mock user attributes */}
            <div className="space-y-3.5 mt-5 text-xs text-neutral-600 dark:text-[#b0b3b8] font-medium border-t border-neutral-100 dark:border-neutral-800 pt-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-4.5 h-4.5 text-neutral-400 shrink-0" />
                <span>Trabalha em <strong className="text-neutral-800 dark:text-[#e4e6eb]">TG Global Networks</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4.5 h-4.5 text-neutral-400 shrink-0" />
                <span>Mora em <strong className="text-neutral-800 dark:text-[#e4e6eb]">São Paulo, Brasil</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-4.5 h-4.5 text-neutral-400 shrink-0" />
                <span>Status de relacionamento: <strong className="text-neutral-800 dark:text-[#e4e6eb]">Em união estável</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4.5 h-4.5 text-neutral-400 shrink-0" />
                <span>Membro do TG desde <strong className="text-neutral-800 dark:text-[#e4e6eb]">Julho de 2026</strong></span>
              </div>
            </div>
          </div>

          {/* Static photos gallery snippet */}
          <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 shadow-sm border border-neutral-150 dark:border-[#3e4042]">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold tracking-tight">Fotos</h3>
              <span className="text-xs text-[#1877f2] font-semibold hover:underline cursor-pointer">Ver todas</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=150&q=80" alt="Galeria" className="w-full h-24 object-cover hover:opacity-95 cursor-pointer" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=150&q=80" alt="Galeria" className="w-full h-24 object-cover hover:opacity-95 cursor-pointer" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=150&q=80" alt="Galeria" className="w-full h-24 object-cover hover:opacity-95 cursor-pointer" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>

        {/* Right Column: User's posts feed list */}
        <div className="lg:col-span-7 space-y-5">
          {isMe && (
            <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 shadow-sm border border-neutral-150 dark:border-[#3e4042]">
              <h3 className="text-sm font-bold">Gerenciar Publicações</h3>
              <p className="text-xs text-neutral-400 mt-1">Exibindo apenas publicações feitas por você ou por este usuário ({userPosts.length} posts).</p>
            </div>
          )}

          {userPosts.length === 0 ? (
            <div className="bg-white dark:bg-[#242526] rounded-2xl p-12 text-center border text-neutral-500">
              <Award className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
              <p className="text-xs font-semibold">Nenhuma publicação encontrada para este usuário ainda.</p>
            </div>
          ) : (
            userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

      </div>

      {/* 3. Immersive Profile Customizer Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#242526] rounded-2xl border border-neutral-200 dark:border-[#3e4042] max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-5 py-4 border-b border-neutral-100 dark:border-[#3e4042] flex justify-between items-center bg-neutral-50 dark:bg-neutral-800">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Edit className="w-4.5 h-4.5 text-[#1877f2]" />
                  <span>Personalizar Meu Perfil TG</span>
                </h3>
                <button onClick={() => setIsEditing(false)} className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-[#3a3b3c] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs font-medium">
                
                {/* Name & Bio Form */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Nome de Exibição:</label>
                  <input 
                    type="text" 
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Seu nome..."
                    className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-lg p-2.5 font-semibold focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Minha Biografia:</label>
                  <textarea 
                    value={editedBio}
                    rows={3}
                    onChange={(e) => setEditedBio(e.target.value)}
                    placeholder="Fale um pouco sobre você..."
                    className="w-full bg-neutral-50 dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 rounded-lg p-2.5 font-semibold focus:outline-none focus:ring-1.5 focus:ring-[#1877f2] leading-relaxed"
                  />
                </div>

                {/* Custom Avatar Select Presets */}
                <div className="space-y-3.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Escolha um Avatar:</label>
                  <div className="grid grid-cols-4 gap-3">
                    {avatarPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => setEditedAvatar(preset.url)}
                        className={`p-1.5 rounded-xl border flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                          editedAvatar === preset.url ? 'border-[#1877f2] bg-blue-50/50 dark:bg-blue-950/20 text-[#1877f2]' : 'border-neutral-200 dark:border-[#3e4042] hover:bg-neutral-50 dark:hover:bg-[#3a3b3c]'
                        }`}
                      >
                        <img src={preset.url} alt="Preset avatar" className="w-12 h-12 rounded-full object-cover border border-neutral-200 dark:border-neutral-700" referrerPolicy="no-referrer" />
                        <span className="text-[10px] font-bold truncate max-w-full">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cover Photo Presets */}
                <div className="space-y-3.5 pt-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Escolha uma Foto de Capa:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {coverPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => setEditedCover(preset.url)}
                        className={`p-1 border rounded-xl overflow-hidden transition-colors cursor-pointer ${
                          editedCover === preset.url ? 'border-[#1877f2] bg-blue-50/50 dark:bg-blue-950/20 text-[#1877f2]' : 'border-neutral-200 dark:border-[#3e4042] hover:bg-neutral-50 dark:hover:bg-[#3a3b3c]'
                        }`}
                      >
                        <img src={preset.url} alt="Cover preset" className="w-full h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                        <span className="text-[10px] font-bold block text-center truncate mt-1">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal footer save buttons */}
              <div className="px-5 py-4 border-t border-neutral-100 dark:border-[#3e4042] flex items-center justify-end gap-2 shrink-0 bg-neutral-50 dark:bg-neutral-800">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] cursor-pointer font-bold"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="px-5 py-2 bg-[#1877f2] hover:bg-[#1565c0] text-white rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
