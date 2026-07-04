/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../controllers/SocialContext';
import { WatchVideo } from '../models/types';
import { Play, ThumbsUp, MessageCircle, Share2, MoreHorizontal, Tv, Eye, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface VideoCardProps {
  video: WatchVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { toggleLikeVideo } = useSocial();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commText, setCommText] = useState('');
  const [localComments, setLocalComments] = useState<string[]>([]);

  const handleLike = () => {
    toggleLikeVideo(video.id);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commText.trim()) return;
    setLocalComments([...localComments, commText]);
    setCommText('');
  };

  return (
    <motion.div 
      layout
      className="bg-white dark:bg-[#242526] border border-neutral-150 dark:border-[#3e4042] rounded-2xl overflow-hidden shadow-sm text-neutral-800 dark:text-[#e4e6eb] space-y-4 p-4 transition-colors duration-200"
    >
      {/* Video Creator Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={video.creatorAvatar} 
            alt={video.creatorName} 
            className="w-10 h-10 rounded-full object-cover border border-neutral-100"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold cursor-pointer hover:underline hover:text-[#1877f2]">{video.creatorName}</h4>
              <CheckCircle className="w-3.5 h-3.5 text-[#1877f2] fill-[#1877f2]/10" />
            </div>
            <span className="text-xs text-neutral-400 dark:text-[#b0b3b8] block mt-0.5">{video.views} • 2d atrás</span>
          </div>
        </div>
        <button className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] cursor-pointer">
          <MoreHorizontal className="w-5 h-5 text-neutral-400" />
        </button>
      </div>

      {/* Video Title and Caption */}
      <div className="space-y-1">
        <h3 className="text-sm font-bold leading-snug">{video.title}</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">{video.description}</p>
      </div>

      {/* Immersive Mock Video Player Screen */}
      <div 
        onClick={handlePlayToggle}
        className="w-full h-80 sm:h-96 relative bg-black flex items-center justify-center cursor-pointer rounded-xl overflow-hidden group select-none border border-neutral-800"
      >
        {isPlaying ? (
          <div className="absolute inset-0 flex flex-col justify-between p-4 bg-neutral-950">
            {/* Playing screen layout */}
            <div className="flex items-center gap-2 text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full self-start">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping shrink-0" />
              <span>REPRODUZINDO VÍDEO</span>
            </div>
            
            {/* Playing visual simulator waves */}
            <div className="flex items-center justify-center flex-1">
              <div className="flex gap-1 h-12 items-end">
                <span className="w-1.5 bg-[#1877f2] animate-[bounce_0.8s_infinite_ease-in-out_100ms] rounded-full" />
                <span className="w-1.5 bg-[#1877f2] animate-[bounce_0.8s_infinite_ease-in-out_300ms] rounded-full h-10" />
                <span className="w-1.5 bg-[#1877f2] animate-[bounce_0.8s_infinite_ease-in-out_200ms] rounded-full h-6" />
                <span className="w-1.5 bg-[#1877f2] animate-[bounce_0.8s_infinite_ease-in-out_400ms] rounded-full h-12" />
                <span className="w-1.5 bg-[#1877f2] animate-[bounce_0.8s_infinite_ease-in-out_150ms] rounded-full h-8" />
              </div>
            </div>

            {/* Video timeline player bar overlay */}
            <div className="w-full space-y-2">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden w-full relative">
                <div className="h-full bg-[#1877f2] rounded-full animate-[progress_15s_linear_infinite]" />
              </div>
              <div className="flex justify-between text-[10px] text-white/70 font-semibold font-mono">
                <span>0:04</span>
                <span>3:45</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Video Poster Thumbnail Cover */}
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Absolute Play Floating Button */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-105 active:scale-95 text-[#1877f2] flex items-center justify-center shadow-2xl transition-all">
                <Play className="w-7 h-7 fill-[#1877f2] ml-1 shrink-0" />
              </div>
            </div>

            {/* Simulated Live views badge */}
            <span className="absolute bottom-4 left-4 bg-black/70 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-sans">
              <Eye className="w-3.5 h-3.5" />
              <span>{video.views}</span>
            </span>
          </>
        )}
      </div>

      {/* Reactions count summary */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-[#b0b3b8] border-b border-neutral-100 dark:border-[#3e4042] pb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="p-1 rounded-full bg-blue-500 text-white">
            <ThumbsUp className="w-3 h-3 fill-white" />
          </span>
          <span className="font-semibold">{video.likesCount} curtidas</span>
        </div>
        <div className="flex items-center gap-4 font-semibold">
          <button onClick={() => setShowComments(!showComments)} className="hover:underline cursor-pointer">
            {video.commentsCount + localComments.length} comentários
          </button>
          <span>45 compartilhamentos</span>
        </div>
      </div>

      {/* Action buttons bar */}
      <div className="flex items-center gap-1">
        <button 
          onClick={handleLike}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:bg-neutral-50 dark:hover:bg-[#3a3b3c] cursor-pointer ${
            video.isLiked ? 'text-[#1877f2] scale-102' : 'text-neutral-600 dark:text-[#b0b3b8]'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${video.isLiked ? 'fill-[#1877f2]' : ''}`} />
          <span>Curtir</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:bg-neutral-50 dark:hover:bg-[#3a3b3c] cursor-pointer ${
            showComments ? 'text-[#1877f2]' : 'text-neutral-600'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Comentar</span>
        </button>

        <button 
          onClick={() => alert('Link do vídeo copiado para a área de transferência!')}
          className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-neutral-600 dark:text-[#b0b3b8] hover:bg-neutral-50 dark:hover:bg-[#3a3b3c] cursor-pointer transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>Compartilhar</span>
        </button>
      </div>

      {/* Internal Comments Drawer */}
      {showComments && (
        <div className="bg-neutral-50/50 dark:bg-[#1a1b1c]/30 px-3.5 py-4.5 rounded-2xl border border-neutral-100 dark:border-[#3e4042] space-y-4">
          <form onSubmit={handleAddComment} className="flex gap-3">
            <input 
              type="text"
              value={commText}
              onChange={(e) => setCommText(e.target.value)}
              placeholder="Escreva um comentário sobre o vídeo..."
              className="flex-1 bg-white dark:bg-[#3a3b3c] border border-neutral-200 dark:border-neutral-700 text-xs rounded-xl px-4 py-2.5 focus:outline-none"
            />
            <button 
              type="submit" 
              disabled={!commText.trim()}
              className="px-4 py-2 bg-[#1877f2] hover:bg-[#1565c0] text-white text-xs font-bold rounded-xl disabled:opacity-30 transition-all cursor-pointer"
            >
              Postar
            </button>
          </form>

          {/* Video Comments list */}
          <div className="space-y-2.5">
            {localComments.map((comment, idx) => (
              <div key={idx} className="flex gap-3">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" alt="Me" className="w-7 h-7 rounded-full object-cover" />
                <div className="bg-white dark:bg-[#3a3b3c] px-3 py-2 rounded-xl text-xs max-w-full">
                  <span className="font-bold hover:underline cursor-pointer block text-[10px]">Tiago Gomes (Você)</span>
                  <p className="mt-0.5 leading-relaxed">{comment}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-3">
              <img src={video.creatorAvatar} alt="Creator" className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div className="bg-white dark:bg-[#3a3b3c] px-3 py-2 rounded-xl text-xs">
                <span className="font-bold hover:underline cursor-pointer block text-[10px]">{video.creatorName}</span>
                <p className="mt-0.5 leading-relaxed">Muito obrigado pelo apoio pessoal! Continuem compartilhando. 👍</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};

export const WatchView: React.FC = () => {
  const { watchVideos } = useSocial();

  return (
    <div className="w-full max-w-[680px] mx-auto pb-16 space-y-6 select-none text-neutral-800 dark:text-[#e4e6eb]">
      
      {/* Header Info Block */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-150 dark:border-[#3e4042]">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#1877f2]/10 text-[#1877f2] rounded-xl">
            <Tv className="w-5.5 h-5.5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">TG Global Watch</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Assista aos melhores vídeos recomendados e transmissões em alta.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-950/20 px-3 py-1.5 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
          <Sparkles className="w-4 h-4 fill-yellow-500/20" />
          <span>Feed de Criadores</span>
        </div>
      </div>

      {/* Videos stream list */}
      <div className="space-y-6">
        {watchVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

    </div>
  );
};
