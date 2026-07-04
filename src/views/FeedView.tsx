/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../controllers/SocialContext';
import { Post, Comment, Story } from '../models/types';
import { Video, Image as ImageIcon, Smile, MessageCircle, Share2, ThumbsUp, Globe, MoreHorizontal, Send, ChevronRight, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Story Immersive Modal Viewer
interface StoryViewerProps {
  story: Story;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose }) => {
  return (
    <div className="fixed inset-0 bg-neutral-950/95 z-50 flex flex-col justify-between p-4 text-white select-none animate-fade-in">
      {/* Top Bar progress & info */}
      <div className="max-w-md w-full mx-auto space-y-3">
        <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
          <div className="h-full bg-[#1877f2] rounded-full animate-[progress_5s_linear_forwards]" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={story.userAvatar} alt={story.userName} className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1877f2]" referrerPolicy="no-referrer" />
            <span className="font-bold text-sm shadow-sm">{story.userName}</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Story Image */}
      <div className="max-w-md w-full mx-auto flex-1 flex items-center justify-center py-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[70vh] aspect-[9/16] border border-white/10">
          <img src={story.mediaUrl} alt="Story" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          {story.text && (
            <div className="absolute inset-x-0 bottom-12 px-6 py-4 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent text-center">
              <p className="text-sm font-semibold leading-relaxed tracking-wide shadow-md">{story.text}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Reply block */}
      <div className="max-w-md w-full mx-auto pb-4 flex gap-3">
        <input 
          type="text" 
          placeholder={`Responder a ${story.userName}...`} 
          className="flex-1 bg-white/10 hover:bg-white/15 focus:bg-white/20 border-transparent text-sm rounded-full py-2.5 px-5 placeholder-white/60 focus:outline-none focus:ring-1.5 focus:ring-[#1877f2] transition-all"
        />
        <button onClick={onClose} className="px-5 bg-[#1877f2] hover:bg-[#1565c0] rounded-full text-xs font-bold transition-all shadow-md">Enviar</button>
      </div>
    </div>
  );
};

// Post Card Component
export interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost, addComment, comments, openChat, setCurrentView, setSelectedProfileUser, users } = useSocial();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  // SQL-like JOIN: Fetch comments belonging to this post
  const postComments = comments.filter(c => c.postId === post.id);

  const handleLike = () => {
    likePost(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  const handleUserClick = () => {
    const matchedUser = users.find(u => u.id === post.userId);
    if (matchedUser) {
      setSelectedProfileUser(matchedUser);
      setCurrentView('profile');
    }
  };

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="bg-white dark:bg-[#242526] rounded-2xl shadow-sm border border-neutral-150 dark:border-[#3e4042] overflow-hidden text-neutral-800 dark:text-[#e4e6eb] transition-colors duration-200"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={post.userAvatar} 
            alt={post.userName} 
            onClick={handleUserClick}
            className="w-10 h-10 rounded-full object-cover border border-neutral-100 dark:border-neutral-700 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 
              onClick={handleUserClick}
              className="text-sm font-bold cursor-pointer hover:text-[#1877f2] hover:underline transition-colors"
            >
              {post.userName}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-[#b0b3b8] mt-0.5">
              <span>{new Date(post.createdAt).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              <span>•</span>
              <Globe className="w-3.5 h-3.5" title="Público" />
              {post.category && post.category !== 'general' && (
                <>
                  <span>•</span>
                  <span className="bg-blue-50 dark:bg-blue-950/40 text-[#1877f2] text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded border border-blue-100 dark:border-blue-900/30 tracking-wide">
                    {post.category}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <button className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] text-neutral-500 dark:text-[#b0b3b8] cursor-pointer transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Body text */}
      <div className="px-4 pb-3.5 text-sm leading-relaxed whitespace-pre-wrap font-medium">
        {post.content}
      </div>

      {/* Post Image attachment */}
      {post.image && (
        <div className="w-full relative border-t border-b border-neutral-100 dark:border-[#3e4042] bg-neutral-50 dark:bg-[#18191a]/40 max-h-[500px] overflow-hidden flex items-center justify-center">
          <img 
            src={post.image} 
            alt="Anexo de post" 
            className="w-full max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Reactions stats summary bar */}
      <div className="px-4 py-2.5 flex items-center justify-between text-xs text-neutral-500 dark:text-[#b0b3b8] border-b border-neutral-100 dark:border-[#3e4042]">
        <div className="flex items-center gap-2">
          {post.likesCount > 0 && (
            <span className="p-1 rounded-full bg-[#1877f2] text-white flex items-center justify-center shadow-sm">
              <ThumbsUp className="w-3 h-3 fill-white" />
            </span>
          )}
          <span className="font-semibold">{post.likesCount} curtidas</span>
        </div>
        <div className="flex items-center gap-4 font-semibold">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="hover:underline cursor-pointer"
          >
            {postComments.length} comentários
          </button>
          <span>{post.sharesCount} compartilhamentos</span>
        </div>
      </div>

      {/* Interaction buttons bar */}
      <div className="px-2 py-1 flex items-center gap-1">
        <button 
          onClick={handleLike}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] cursor-pointer ${
            post.isLikedByCurrentUser 
              ? 'text-[#1877f2] scale-102 font-extrabold' 
              : 'text-neutral-600 dark:text-[#b0b3b8]'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${post.isLikedByCurrentUser ? 'fill-[#1877f2]' : ''}`} />
          <span>Curtir</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] cursor-pointer ${
            showComments ? 'text-[#1877f2]' : 'text-neutral-600 dark:text-[#b0b3b8]'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Comentar</span>
        </button>

        <button 
          onClick={() => {
            alert('Post compartilhado com sucesso no seu perfil TG Global!');
          }}
          className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-neutral-600 dark:text-[#b0b3b8] hover:bg-neutral-100 dark:hover:bg-[#3a3b3c] cursor-pointer transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>Compartilhar</span>
        </button>
      </div>

      {/* Nested Expandable Comment Section */}
      {showComments && (
        <div className="bg-neutral-50/50 dark:bg-[#1c1d1e]/30 px-4 py-4 border-t border-neutral-100 dark:border-[#3e4042] space-y-4">
          
          {/* Post Comment Input Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-3 items-center">
            <img 
              src={post.userAvatar} 
              alt="Avatar atual" 
              className="w-8.5 h-8.5 rounded-full object-cover border border-neutral-150 dark:border-neutral-700"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 relative flex items-center bg-neutral-100 dark:bg-[#3a3b3c] rounded-2xl border border-transparent focus-within:border-[#1877f2] transition-colors pr-10">
              <input 
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva um comentário..."
                className="w-full bg-transparent border-none text-xs px-4 py-2.5 text-neutral-800 dark:text-[#e4e6eb] placeholder-neutral-400 focus:outline-none"
              />
              <button 
                type="submit"
                disabled={!commentText.trim()}
                className="absolute right-2 p-1.5 text-neutral-400 hover:text-[#1877f2] disabled:opacity-30 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 pt-1">
            {postComments.length === 0 ? (
              <p className="text-xs text-neutral-400 text-center py-2 font-medium">Nenhum comentário. Seja o primeiro a comentar!</p>
            ) : (
              postComments.map((comm) => (
                <div key={comm.id} className="flex gap-3 items-start">
                  <img 
                    src={comm.userAvatar} 
                    alt={comm.userName} 
                    className="w-8 h-8 rounded-full object-cover border border-neutral-100 dark:border-neutral-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="bg-neutral-100 dark:bg-[#3a3b3c] px-3.5 py-2.5 rounded-2xl inline-block max-w-full">
                      <h5 className="font-bold text-xs hover:underline cursor-pointer hover:text-[#1877f2] inline mr-1">{comm.userName}</h5>
                      <p className="text-xs mt-1 text-neutral-700 dark:text-[#e4e6eb] leading-relaxed break-words">{comm.content}</p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-neutral-400 dark:text-[#b0b3b8] mt-1 pl-1 font-semibold">
                      <button className="hover:underline cursor-pointer">Curtir</button>
                      <span>•</span>
                      <button className="hover:underline cursor-pointer">Responder</button>
                      <span>•</span>
                      <span>{new Date(comm.createdAt).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </motion.article>
  );
};

export const FeedView: React.FC = () => {
  const { posts, stories, addPost, searchTerm, currentUser } = useSocial();
  const [postContent, setPostContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [postCategory, setPostCategory] = useState<Post['category']>('general');
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Filter posts dynamically in React view layer based on search keyword
  const filteredPosts = posts.filter(post => {
    const term = searchTerm.toLowerCase();
    return post.content.toLowerCase().includes(term) || post.userName.toLowerCase().includes(term);
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    addPost(postContent, imageUrl || undefined, postCategory);
    setPostContent('');
    setImageUrl('');
    setShowImageInput(false);
    setPostCategory('general');
  };

  // Image presets to easily attach gorgeous pictures in a single click!
  const imagePresets = [
    { name: 'Código / Tecnologia', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
    { name: 'Montanhas', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' },
    { name: 'Gaming Neon', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
    { name: 'Café da Manhã', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[680px] mx-auto pb-12 select-none text-neutral-800 dark:text-[#e4e6eb]">
      
      {/* 1. Stories Carousel */}
      <div className="relative w-full">
        <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-none">
          
          {/* Creator card */}
          <div className="w-28 h-44 rounded-2xl bg-white dark:bg-[#242526] border border-neutral-200 dark:border-[#3e4042] overflow-hidden flex flex-col justify-between shadow-sm cursor-pointer hover:scale-[1.02] active:scale-98 transition-all shrink-0">
            <div className="relative flex-1 bg-neutral-100 dark:bg-neutral-800">
              <img src={currentUser.avatar} alt="Seu Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="p-2 relative flex flex-col items-center justify-center shrink-0 h-14 text-center">
              <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#1877f2] border-4 border-white dark:border-[#242526] flex items-center justify-center text-white text-lg font-black shadow-md">
                +
              </div>
              <span className="text-[10px] font-bold mt-2 truncate max-w-full">Criar Story</span>
            </div>
          </div>

          {/* Seed stories */}
          {stories.map(story => (
            <div 
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="w-28 h-44 rounded-2xl relative overflow-hidden shadow-sm cursor-pointer hover:scale-[1.02] hover:brightness-105 active:scale-98 transition-all shrink-0 group border border-neutral-150 dark:border-neutral-800/50"
            >
              {/* Background cover */}
              <img src={story.mediaUrl} alt="Story cover" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
              {/* Dark overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />
              {/* User badge */}
              <img src={story.userAvatar} alt={story.userName} className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full border-2 border-[#1877f2] object-cover" referrerPolicy="no-referrer" />
              {/* Caption */}
              <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[10px] font-bold text-white leading-tight truncate">
                {story.userName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Post Creator Card */}
      <div className="bg-white dark:bg-[#242526] rounded-2xl shadow-sm border border-neutral-150 dark:border-[#3e4042] p-4 space-y-3.5">
        <div className="flex gap-3 items-center">
          <img 
            src={currentUser.avatar} 
            alt="Avatar" 
            className="w-10 h-10 rounded-full object-cover border border-neutral-100 dark:border-neutral-700 shadow-sm shrink-0"
            referrerPolicy="no-referrer"
          />
          <input 
            type="text" 
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={`No que você está pensando, ${currentUser.name.split(' ')[0]}?`}
            className="flex-1 bg-neutral-100 dark:bg-[#3a3b3c] hover:bg-neutral-1.5/70 dark:hover:bg-[#4e4f50]/40 rounded-full py-3 px-5 text-sm text-neutral-800 dark:text-[#e4e6eb] placeholder-neutral-500 cursor-pointer focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]/50 transition-all border-none"
          />
        </div>

        <hr className="border-neutral-100 dark:border-[#3e4042]" />

        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={() => alert('Sua transmissão ao vivo simulada começará em instantes!')}
            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-bold text-neutral-500 dark:text-[#b0b3b8] hover:bg-neutral-50 dark:hover:bg-[#3a3b3c] transition-colors cursor-pointer"
          >
            <Video className="w-5 h-5 text-red-500" />
            <span className="hidden sm:inline">Vídeo ao vivo</span>
          </button>

          <button 
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              showImageInput ? 'bg-blue-50 dark:bg-blue-950/30 text-[#1877f2]' : 'text-neutral-500 dark:text-[#b0b3b8] hover:bg-neutral-50 dark:hover:bg-[#3a3b3c]'
            }`}
          >
            <ImageIcon className="w-5 h-5 text-green-500" />
            <span className="hidden sm:inline">Foto/Vídeo</span>
          </button>

          <button 
            type="button"
            onClick={() => alert('Você está se sentindo Espetacular desenvolvendo na TG Global!')}
            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-bold text-neutral-500 dark:text-[#b0b3b8] hover:bg-neutral-50 dark:hover:bg-[#3a3b3c] transition-colors cursor-pointer"
          >
            <Smile className="w-5 h-5 text-yellow-500" />
            <span className="hidden sm:inline">Sentimento</span>
          </button>
        </div>

        {/* Dynamic Image Input Drawer */}
        {showImageInput && (
          <div className="bg-neutral-50 dark:bg-[#1a1b1c] p-3 rounded-xl border border-neutral-150 dark:border-[#3e4042] space-y-3">
            <div className="text-xs font-semibold text-neutral-500 dark:text-[#b0b3b8]">URL da imagem ou presets rápidos:</div>
            <input 
              type="text" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Cole uma URL de imagem (ex: Unsplash)..."
              className="w-full bg-white dark:bg-[#242526] border border-neutral-200 dark:border-[#3e4042] text-xs rounded-lg p-2 focus:outline-none focus:ring-1.5 focus:ring-[#1877f2]"
            />
            <div className="grid grid-cols-2 gap-2">
              {imagePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[10px] font-bold px-2 py-1.5 rounded-lg border text-left truncate transition-colors ${
                    imageUrl === preset.url 
                      ? 'border-[#1877f2] bg-blue-50 text-[#1877f2] dark:bg-blue-950/40' 
                      : 'border-neutral-200 dark:border-[#3e4042] hover:bg-neutral-100 dark:hover:bg-[#2a2b2c]'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category select and submit row */}
        {(postContent.trim() || showImageInput) && (
          <div className="flex items-center justify-between pt-1 flex-wrap gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-neutral-400 uppercase">Categoria:</span>
              <select
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value as Post['category'])}
                className="text-xs font-semibold bg-neutral-100 dark:bg-[#3a3b3c] border-none rounded-lg px-2 py-1 focus:outline-none focus:ring-1"
              >
                <option value="general">Geral / Amigos</option>
                <option value="groups">Grupos / Dúvidas</option>
                <option value="gaming">Jogos / Setup</option>
                <option value="memes">Memes / Humor</option>
                <option value="news">Notícias / Tech</option>
              </select>
            </div>

            <button
              onClick={handleCreatePost}
              disabled={!postContent.trim()}
              className="px-6 py-2 bg-[#1877f2] hover:bg-[#1565c0] disabled:bg-neutral-200 disabled:text-neutral-400 dark:disabled:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg disabled:shadow-none active:scale-98 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Publicar
            </button>
          </div>
        )}
      </div>

      {/* 3. Search status notification info */}
      {searchTerm && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-xs flex justify-between items-center text-neutral-700 dark:text-[#e4e6eb]">
          <p>Resultados filtrados para: <span className="font-bold">"{searchTerm}"</span> ({filteredPosts.length} posts)</p>
          <button 
            onClick={() => {}} // Reset handled by clearing input
            className="text-[#1877f2] font-bold hover:underline"
          >
            Ver tudo
          </button>
        </div>
      )}

      {/* 4. Scrollable list of posts (Feeds) */}
      <div className="flex flex-col gap-5">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-[#242526] rounded-2xl border p-12 text-center text-neutral-500 dark:text-[#b0b3b8]">
              <p className="font-semibold text-sm">Nenhum post corresponde à sua pesquisa.</p>
              <button 
                onClick={() => setPostContent('')} 
                className="mt-4 px-4 py-2 bg-[#1877f2] text-white text-xs font-bold rounded-xl"
              >
                Voltar ao Feed
              </button>
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Active Story Immersive Modals */}
      {activeStory && (
        <StoryViewer story={activeStory} onClose={() => setActiveStory(null)} />
      )}

    </div>
  );
};
