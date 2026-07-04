/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, Comment, Story, Message, Group, MarketplaceProduct, WatchVideo } from '../models/types';
import { SocialSQLDatabase } from '../models/SocialModel';

export type ActiveView = 'feed' | 'profile' | 'marketplace' | 'watch' | 'groups';

interface SocialContextType {
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
  currentUser: User;
  selectedProfileUser: User | null;
  setSelectedProfileUser: (user: User | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  posts: Post[];
  stories: Story[];
  users: User[];
  groups: Group[];
  marketplaceProducts: MarketplaceProduct[];
  watchVideos: WatchVideo[];
  activeChats: string[]; // List of user IDs with open chat windows
  openChat: (userId: string) => void;
  closeChat: (userId: string) => void;
  getChatMessages: (userId: string) => Message[];
  addPost: (content: string, image?: string, category?: Post['category']) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  updateProfile: (name: string, bio: string, avatar?: string, coverPhoto?: string) => void;
  addProduct: (title: string, price: number, category: string, location: string, description: string, image: string) => void;
  toggleLikeVideo: (videoId: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db] = useState(() => new SocialSQLDatabase());
  const [currentView, setCurrentView] = useState<ActiveView>('feed');
  const [selectedProfileUser, setSelectedProfileUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('tg_global_dark_mode') === 'true';
  });

  // State slices synchronized with database
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [marketplaceProducts, setMarketplaceProducts] = useState<MarketplaceProduct[]>([]);
  const [watchVideos, setWatchVideos] = useState<WatchVideo[]>([]);

  // Synchronize state from database on initialization and whenever database changes
  const syncStates = () => {
    setUsers(db.tables.users);
    setPosts(db.queryFeedPosts());
    setComments(db.tables.comments);
    setStories(db.tables.stories);
    setMessages(db.tables.messages);
    setGroups(db.tables.groups);
    setMarketplaceProducts(db.tables.marketplace_products);
    setWatchVideos(db.tables.watch_videos);
  };

  useEffect(() => {
    syncStates();
  }, [db]);

  useEffect(() => {
    localStorage.setItem('tg_global_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Active user is always 'u_me' (Tiago Gomes)
  const currentUser = users.find(u => u.id === 'u_me') || {
    id: 'u_me',
    name: 'Tiago Gomes',
    email: 'tgmoreth@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=400&q=80',
    bio: 'Desenvolvedor Full-Stack | Criador do ecossistema TG Global. Apaixonado por tecnologia, design moderno e redes conectadas.',
    friendsCount: 1420,
    followers: 3512,
    isOnline: true
  };

  const openChat = (userId: string) => {
    if (!activeChats.includes(userId)) {
      // Keep at most 3 chats open at a time on desktop
      const updated = [...activeChats, userId];
      if (updated.length > 3) {
        updated.shift();
      }
      setActiveChats(updated);
    }
  };

  const closeChat = (userId: string) => {
    setActiveChats(activeChats.filter(id => id !== userId));
  };

  const getChatMessages = (userId: string) => {
    return db.queryChatHistory('u_me', userId);
  };

  const addPost = (content: string, image?: string, category: Post['category'] = 'general') => {
    db.insertPost({
      id: `p_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content,
      image,
      createdAt: new Date().toISOString(),
      category
    });
    syncStates();
  };

  const likePost = (postId: string) => {
    db.toggleLikePost(postId, currentUser.id);
    syncStates();
  };

  const addComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      postId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content,
      createdAt: new Date().toISOString()
    };
    db.insertComment(newComment);
    syncStates();
  };

  const sendMessage = async (receiverId: string, content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
      isRead: true
    };

    db.insertMessage(userMsg);
    syncStates();

    // Check if the recipient is the AI Assistant
    const recipient = users.find(u => u.id === receiverId);
    if (recipient?.isAI) {
      // Show artificial "typing" status or immediate mock reply, then call the real Gemini endpoint
      setTimeout(async () => {
        try {
          // Prepare history for API call
          const chatHistory = db.queryChatHistory('u_me', receiverId);
          const apiMessages = chatHistory.map(m => ({
            role: m.senderId === 'u_me' ? 'user' : 'assistant',
            content: m.content
          }));

          const res = await fetch('/api/assistant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages: apiMessages
            })
          });

          if (!res.ok) throw new Error('Falha ao comunicar com a IA');
          const data = await res.json();

          const aiMsg: Message = {
            id: `m_ai_${Date.now()}`,
            senderId: receiverId,
            receiverId: currentUser.id,
            content: data.text,
            createdAt: new Date().toISOString(),
            isRead: false
          };

          db.insertMessage(aiMsg);
          syncStates();
        } catch (err) {
          console.error('Erro de resposta do assistente de IA:', err);
          
          const errorMsg: Message = {
            id: `m_ai_err_${Date.now()}`,
            senderId: receiverId,
            receiverId: currentUser.id,
            content: 'Desculpe, meu processador central está instável ou o servidor local não pôde ser contatado. Mas lembre-se: eu sou o TG Global AI e sempre estarei aqui!',
            createdAt: new Date().toISOString(),
            isRead: false
          };
          db.insertMessage(errorMsg);
          syncStates();
        }
      }, 800);
    } else {
      // Simulate static automated response from other virtual friends so the app feels 100% alive!
      setTimeout(() => {
        const responses = [
          'Que legal! Vamos nos falando. 👍',
          'Interessante! Depois me conta mais sobre isso.',
          'Haha verdade! Concordo 100%.',
          'Opa! Estou meio ocupado programando na TG Global agora, mas nos falamos em breve!',
          'Sensacional, Tiago! Sempre inovando.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const autoMsg: Message = {
          id: `m_auto_${Date.now()}`,
          senderId: receiverId,
          receiverId: currentUser.id,
          content: randomResponse,
          createdAt: new Date().toISOString(),
          isRead: false
        };
        db.insertMessage(autoMsg);
        syncStates();
      }, 1500);
    }
  };

  const updateProfile = (name: string, bio: string, avatar?: string, coverPhoto?: string) => {
    const updatedUsers = db.tables.users.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          name: name || u.name,
          bio: bio || u.bio,
          avatar: avatar || u.avatar,
          coverPhoto: coverPhoto || u.coverPhoto
        };
      }
      return u;
    });

    db.tables.users = updatedUsers;

    // Also update current user details in posts
    db.tables.posts = db.tables.posts.map(p => {
      if (p.userId === currentUser.id) {
        return {
          ...p,
          userName: name || p.userName,
          userAvatar: avatar || p.userAvatar
        };
      }
      return p;
    });

    // Also update comments
    db.tables.comments = db.tables.comments.map(c => {
      if (c.userId === currentUser.id) {
        return {
          ...c,
          userName: name || c.userName,
          userAvatar: avatar || c.userAvatar
        };
      }
      return c;
    });

    db.saveChanges();
    syncStates();
  };

  const addProduct = (title: string, price: number, category: string, location: string, description: string, image: string) => {
    const newProduct: MarketplaceProduct = {
      id: `mp_${Date.now()}`,
      title,
      price,
      image,
      location,
      category,
      description,
      sellerName: currentUser.name,
      sellerAvatar: currentUser.avatar,
      dateAdded: new Date().toISOString()
    };
    db.insertMarketplaceProduct(newProduct);
    syncStates();
  };

  const toggleLikeVideo = (videoId: string) => {
    const video = db.tables.watch_videos.find(v => v.id === videoId);
    if (video) {
      video.isLiked = !video.isLiked;
      video.likesCount += video.isLiked ? 1 : -1;
      db.saveChanges();
      syncStates();
    }
  };

  return (
    <SocialContext.Provider value={{
      currentView,
      setCurrentView,
      currentUser,
      selectedProfileUser,
      setSelectedProfileUser,
      searchTerm,
      setSearchTerm,
      posts,
      stories,
      users,
      groups,
      marketplaceProducts,
      watchVideos,
      activeChats,
      openChat,
      closeChat,
      getChatMessages,
      addPost,
      likePost,
      addComment,
      sendMessage,
      updateProfile,
      addProduct,
      toggleLikeVideo,
      isDarkMode,
      setIsDarkMode
    }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial deve ser utilizado dentro de um SocialProvider');
  }
  return context;
};
