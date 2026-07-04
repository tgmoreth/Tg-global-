/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  friendsCount: number;
  followers: number;
  isOnline: boolean;
  isAI?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
  category?: 'general' | 'groups' | 'gaming' | 'memes' | 'news';
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  mediaType: 'image' | 'text';
  mediaUrl: string;
  text?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Group {
  id: string;
  name: string;
  coverPhoto: string;
  membersCount: number;
  description: string;
  category: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  category: string;
  description: string;
  sellerName: string;
  sellerAvatar: string;
  dateAdded: string;
}

export interface WatchVideo {
  id: string;
  title: string;
  videoUrl?: string;
  thumbnail: string;
  views: string;
  likesCount: number;
  commentsCount: number;
  creatorName: string;
  creatorAvatar: string;
  description: string;
  isLiked: boolean;
  createdAt: string;
}
