/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Post, Comment, Story, Message, Group, MarketplaceProduct, WatchVideo } from './types';

// Mock Relational Database Engine in TypeScript (simulates SQL tables and operations)
export class SocialSQLDatabase {
  private static STORAGE_KEY = 'tg_global_social_db';

  public tables: {
    users: User[];
    posts: Post[];
    comments: Comment[];
    stories: Story[];
    messages: Message[];
    groups: Group[];
    marketplace_products: MarketplaceProduct[];
    watch_videos: WatchVideo[];
  };

  constructor() {
    this.tables = {
      users: [],
      posts: [],
      comments: [],
      stories: [],
      messages: [],
      groups: [],
      marketplace_products: [],
      watch_videos: []
    };

    this.initializeDB();
  }

  private initializeDB() {
    const saved = localStorage.getItem(SocialSQLDatabase.STORAGE_KEY);
    if (saved) {
      try {
        this.tables = JSON.parse(saved);
        return;
      } catch (e) {
        console.error('Error loading social database, re-seeding...', e);
      }
    }

    // Seed Initial Data (Relational Schema)
    const seedUsers: User[] = [
      {
        id: 'u_me',
        name: 'Tiago Gomes',
        email: 'tgmoreth@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        coverPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=400&q=80',
        bio: 'Desenvolvedor Full-Stack | Criador do ecossistema TG Global. Apaixonado por tecnologia, design moderno e redes conectadas.',
        friendsCount: 1420,
        followers: 3512,
        isOnline: true
      },
      {
        id: 'u_glauber',
        name: 'Glauber Lima',
        email: 'glauber@tgglobal.com',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        coverPhoto: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=400&q=80',
        bio: 'Arquiteto de Software na TG Global. Focado em soluções de alta performance e inovação digital.',
        friendsCount: 520,
        followers: 1200,
        isOnline: true
      },
      {
        id: 'u_carolina',
        name: 'Carolina Souza',
        email: 'carol@tgglobal.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        coverPhoto: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&h=400&q=80',
        bio: 'UI/UX Designer apaixonada por criar interfaces limpas, usabilidade intuitiva e paletas de cores harmônicas.',
        friendsCount: 912,
        followers: 4320,
        isOnline: true
      },
      {
        id: 'u_lucas',
        name: 'Lucas Rocha',
        email: 'lucas@tgglobal.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        coverPhoto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=400&q=80',
        bio: 'Gerente de Produto | Conectando pessoas e construindo o futuro da comunicação corporativa na TG Global.',
        friendsCount: 310,
        followers: 680,
        isOnline: false
      },
      {
        id: 'u_beatriz',
        name: 'Beatriz Silva',
        email: 'beatriz@tgglobal.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        coverPhoto: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&h=400&q=80',
        bio: 'Fotógrafa de natureza, mochileira e criadora de conteúdo digital. Viajando pelo mundo e registrando belas memórias.',
        friendsCount: 1845,
        followers: 12500,
        isOnline: true
      },
      {
        id: 'u_tg_ai',
        name: 'TG Global Assistant (IA)',
        email: 'ai@tgglobal.com',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
        coverPhoto: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&h=400&q=80',
        bio: 'Sou a Inteligência Artificial integrada do TG Global. Fale comigo no chat privado para gerar posts, tirar dúvidas ou conversar!',
        friendsCount: 9999,
        followers: 99999,
        isOnline: true,
        isAI: true
      }
    ];

    const seedPosts: Post[] = [
      {
        id: 'p_1',
        userId: 'u_carolina',
        userName: 'Carolina Souza',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        content: 'Acabei de finalizar a nova identidade visual do ecossistema de redes do TG Global! Buscamos uma paleta azul clássica e icônica que traz familiaridade, mas com uma tipografia super limpa (Inter + Space Grotesk) e cantos perfeitamente arredondados. O que vocês acharam do layout? 🎨✨',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        likesCount: 42,
        commentsCount: 3,
        sharesCount: 12,
        isLikedByCurrentUser: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        category: 'general'
      },
      {
        id: 'p_2',
        userId: 'u_beatriz',
        userName: 'Beatriz Silva',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        content: 'Bom dia mundo! Começando o dia com essa vista inexplicável do topo das montanhas. Estar conectada com a natureza é a melhor forma de recarregar as energias. Quem aí também ama uma aventura no fim de semana? ⛰️🚶‍♀️☀️',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        likesCount: 128,
        commentsCount: 4,
        sharesCount: 18,
        isLikedByCurrentUser: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        category: 'general'
      },
      {
        id: 'p_3',
        userId: 'u_glauber',
        userName: 'Glauber Lima',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        content: 'Montando meu novo setup de desenvolvimento e jogos em casa! Placa de vídeo de última geração, iluminação sutil vermelha/azul e um monitor ultrawide para melhorar o fluxo de trabalho de programação e design. Agora sim o código vai fluir sem barreiras! 💻🕹️🚀',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
        likesCount: 56,
        commentsCount: 2,
        sharesCount: 5,
        isLikedByCurrentUser: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
        category: 'gaming'
      },
      {
        id: 'p_4',
        userId: 'u_tg_ai',
        userName: 'TG Global Assistant (IA)',
        userAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
        content: 'Olá comunidade TG Global! Eu sou o assistente de Inteligência Artificial da rede. Vocês sabiam que podem iniciar um chat privado comigo a qualquer momento? Estou programada para ajudar vocês com ideias de publicações, códigos, resumos de livros, dicas de viagens e muito mais. É só clicar em meu nome na lista de contatos e mandar um "Olá"! 🤖💻🌟',
        likesCount: 310,
        commentsCount: 5,
        sharesCount: 95,
        isLikedByCurrentUser: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
        category: 'general'
      }
    ];

    const seedComments: Comment[] = [
      {
        id: 'c_1',
        postId: 'p_1',
        userId: 'u_glauber',
        userName: 'Glauber Lima',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        content: 'Ficou simplesmente incrível, Carol! A usabilidade está impecável e as cores transmitem muita modernidade. Parabéns pelo trabalho!',
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
      },
      {
        id: 'c_2',
        postId: 'p_1',
        userId: 'u_me',
        userName: 'Tiago Gomes',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'Concordo totalmente com o Glauber! Esse azul moderno deu um destaque muito legal. O TG Global está com a melhor cara possível!',
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      },
      {
        id: 'c_3',
        postId: 'p_1',
        userId: 'u_lucas',
        userName: 'Lucas Rocha',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'Excelente design! Ansioso para o lançamento oficial desse novo layout para todos os usuários.',
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      {
        id: 'c_4',
        postId: 'p_2',
        userId: 'u_me',
        userName: 'Tiago Gomes',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'Que lugar sensacional, Beatriz! Onde fica essa trilha? Fiquei com muita vontade de conhecer!',
        createdAt: new Date(Date.now() - 1000 * 60 * 100).toISOString()
      },
      {
        id: 'c_5',
        postId: 'p_2',
        userId: 'u_beatriz',
        userName: 'Beatriz Silva',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        content: '@Tiago Gomes Fica no Parque Nacional da Serra dos Órgãos! Super recomendo, a subida é pesada mas a vista compensa cada passo!',
        createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString()
      }
    ];

    const seedStories: Story[] = [
      {
        id: 's_1',
        userId: 'u_me',
        userName: 'Seu Story',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=300&h=500&q=80',
        text: 'Programando a noite toda!',
        createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString()
      },
      {
        id: 's_2',
        userId: 'u_carolina',
        userName: 'Carolina Souza',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&h=500&q=80',
        text: 'Bom dia floresta!',
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
      },
      {
        id: 's_3',
        userId: 'u_glauber',
        userName: 'Glauber Lima',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=300&h=500&q=80',
        text: 'Foco total no código ☕️',
        createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
      },
      {
        id: 's_4',
        userId: 'u_beatriz',
        userName: 'Beatriz Silva',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&h=500&q=80',
        text: 'Que paz...',
        createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
      }
    ];

    const seedMessages: Message[] = [
      {
        id: 'm_1',
        senderId: 'u_glauber',
        receiverId: 'u_me',
        content: 'E aí Tiago! Conseguiu dar uma olhada na nova rota da API que subi ontem à noite?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        isRead: true
      },
      {
        id: 'm_2',
        senderId: 'u_me',
        receiverId: 'u_glauber',
        content: 'Fala Glauber! Consegui sim, testei aqui e está rodando super rápido. Ficou excelente!',
        createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        isRead: true
      },
      {
        id: 'm_3',
        senderId: 'u_glauber',
        receiverId: 'u_me',
        content: 'Maravilha! Se precisar de ajuda para integrar o front-end com os controllers, só avisar.',
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        isRead: false
      },
      {
        id: 'm_4',
        senderId: 'u_tg_ai',
        receiverId: 'u_me',
        content: 'Olá Tiago! Eu sou o assistente oficial de IA da TG Global. Se quiser gerar um novo post fictício, tirar alguma dúvida ou testar minhas habilidades linguísticas, fique à vontade!',
        createdAt: new Date(Date.now() - 1000 * 60 * 700).toISOString(),
        isRead: true
      }
    ];

    const seedGroups: Group[] = [
      {
        id: 'g_1',
        name: 'Desenvolvedores React Brasil',
        coverPhoto: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        membersCount: 15400,
        description: 'Grupo voltado para troca de experiências, vagas, dicas e soluções envolvendo React, Vite, Next.js e TypeScript.',
        category: 'programming'
      },
      {
        id: 'g_2',
        name: 'Amantes de Fotografia e Natureza',
        coverPhoto: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
        membersCount: 8900,
        description: 'Compartilhe suas melhores capturas de paisagens, trilhas, animais e técnicas de edição fotográfica.',
        category: 'photography'
      },
      {
        id: 'g_3',
        name: 'Gamer Zone TG',
        coverPhoto: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
        membersCount: 4210,
        description: 'Comunidade oficial de gamers da TG Global. Debates, memes, lives e tudo sobre o mundo dos jogos eletrônicos.',
        category: 'gaming'
      }
    ];

    const seedProducts: MarketplaceProduct[] = [
      {
        id: 'mp_1',
        title: 'iPhone 15 Pro Max 256GB - Como Novo',
        price: 5499,
        image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80',
        location: 'São Paulo, SP',
        category: 'Eletrônicos',
        description: 'Aparelho impecável, sem marcas de uso. Saúde da bateria em 98%, acompanha caixa e cabo original. Nota fiscal inclusa.',
        sellerName: 'Carolina Souza',
        sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        dateAdded: new Date(Date.now() - 1000 * 60 * 1440).toISOString()
      },
      {
        id: 'mp_2',
        title: 'Teclado Mecânico Keychron K2 V2',
        price: 450,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80',
        location: 'Rio de Janeiro, RJ',
        category: 'Eletrônicos',
        description: 'Layout ANSI, switches Gateron Brown, retroiluminação RGB de alumínio. Conexão via bluetooth ou cabo. Perfeito estado.',
        sellerName: 'Glauber Lima',
        sellerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        dateAdded: new Date(Date.now() - 1000 * 60 * 2880).toISOString()
      },
      {
        id: 'mp_3',
        title: 'Câmera Mirrorless Sony Alpha A7 III (Apenas Corpo)',
        price: 8900,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
        location: 'Curitiba, PR',
        category: 'Fotografia',
        description: 'Apenas 12 mil cliques, sensor limpo, sem detalhes. Acompanha carregador, duas baterias originais e alça de pescoço.',
        sellerName: 'Beatriz Silva',
        sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        dateAdded: new Date(Date.now() - 1000 * 60 * 4320).toISOString()
      }
    ];

    const seedVideos: WatchVideo[] = [
      {
        id: 'v_1',
        title: 'Explorando as cavernas secretas do PETAR! 🥾⛰️',
        thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        views: '25K visualizações',
        likesCount: 1890,
        commentsCount: 245,
        creatorName: 'Beatriz Silva',
        creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        description: 'Nesse vídeo mostro a vocês as cavernas mais lindas do sul do estado de São Paulo, uma aventura fantástica com travessia de rios subterrâneos e formações rochosas espetaculares. Se curtiu se inscreve!',
        isLiked: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 2880).toISOString()
      },
      {
        id: 'v_2',
        title: 'Dicas de UI/UX: Como escolher a paleta de cores perfeita 🎨',
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        views: '12K visualizações',
        likesCount: 940,
        commentsCount: 88,
        creatorName: 'Carolina Souza',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        description: 'Aprenda de forma rápida e prática a criar contrastes harmônicos, aplicar a regra 60-30-10 e usar psicologia das cores para prender a atenção do seu usuário no layout da sua aplicação ou site.',
        isLiked: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 5760).toISOString()
      }
    ];

    this.tables = {
      users: seedUsers,
      posts: seedPosts,
      comments: seedComments,
      stories: seedStories,
      messages: seedMessages,
      groups: seedGroups,
      marketplace_products: seedProducts,
      watch_videos: seedVideos
    };

    this.saveChanges();
  }

  // Persists the relational store state to standard browser storage
  public saveChanges() {
    localStorage.setItem(SocialSQLDatabase.STORAGE_KEY, JSON.stringify(this.tables));
  }

  // Simulated SQL "SELECT * FROM posts JOIN users ON posts.userId = users.id ORDER BY createdAt DESC"
  public queryFeedPosts(): Post[] {
    // Sort posts from newest to oldest
    return [...this.tables.posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Simulated SQL "SELECT * FROM comments WHERE postId = ? ORDER BY createdAt ASC"
  public queryCommentsForPost(postId: string): Comment[] {
    return this.tables.comments
      .filter(c => c.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  // Simulated SQL "SELECT * FROM messages WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?) ORDER BY createdAt ASC"
  public queryChatHistory(userA: string, userB: string): Message[] {
    return this.tables.messages
      .filter(m => (m.senderId === userA && m.receiverId === userB) || (m.senderId === userB && m.receiverId === userA))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  // Simulated SQL "INSERT INTO posts (id, userId, userName, userAvatar, content, image, likesCount, commentsCount, sharesCount, isLikedByCurrentUser, createdAt, category) VALUES (...)"
  public insertPost(post: Omit<Post, 'likesCount' | 'commentsCount' | 'sharesCount' | 'isLikedByCurrentUser'>): Post {
    const newPost: Post = {
      ...post,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLikedByCurrentUser: false
    };
    this.tables.posts.push(newPost);
    this.saveChanges();
    return newPost;
  }

  // Simulated SQL "INSERT INTO comments (id, postId, userId, userName, userAvatar, content, createdAt) VALUES (...)"
  public insertComment(comment: Comment) {
    this.tables.comments.push(comment);
    
    // SQL: "UPDATE posts SET commentsCount = commentsCount + 1 WHERE id = comment.postId"
    const post = this.tables.posts.find(p => p.id === comment.postId);
    if (post) {
      post.commentsCount += 1;
    }
    
    this.saveChanges();
  }

  // Simulated SQL "UPDATE posts SET likesCount = likesCount + (isLiked ? 1 : -1), isLikedByCurrentUser = ? WHERE id = ?"
  public toggleLikePost(postId: string, userId: string): { likesCount: number; isLiked: boolean } | null {
    const post = this.tables.posts.find(p => p.id === postId);
    if (!post) return null;

    post.isLikedByCurrentUser = !post.isLikedByCurrentUser;
    if (post.isLikedByCurrentUser) {
      post.likesCount += 1;
    } else {
      post.likesCount = Math.max(0, post.likesCount - 1);
    }

    this.saveChanges();
    return { likesCount: post.likesCount, isLiked: post.isLikedByCurrentUser };
  }

  // Simulated SQL "INSERT INTO messages (id, senderId, receiverId, content, createdAt, isRead) VALUES (...)"
  public insertMessage(message: Message) {
    this.tables.messages.push(message);
    this.saveChanges();
  }

  // Simulated SQL "INSERT INTO marketplace_products (id, title, price, image, location, category, description, sellerName, sellerAvatar, dateAdded) VALUES (...)"
  public insertMarketplaceProduct(product: MarketplaceProduct) {
    this.tables.marketplace_products.push(product);
    this.saveChanges();
  }
}
