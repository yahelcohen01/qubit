import type { ReactNode } from 'react';

export type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
export type GenericFunction = (arg: any) => any;

export type Event = {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  venue: string;
  description: string;
  additionalDescription?: string;
  isPromoted?: boolean;
  type: string;
};

export type SortOption = 'date' | 'relevance' | 'location';

export type AssetType =
  | 'article'
  | 'academic'
  | 'blog'
  | 'video'
  | 'case-study';

export type ContentBlock = {
  type: 'text' | 'image' | 'video' | 'code';
  content: ReactNode;
  title?: string; // For text blocks
  subtitle?: string; // For text blocks
  direction?: 'ltr' | 'rtl'; // For text blocks
  align?: 'left' | 'center' | 'right'; // For text blocks
  caption?: string;
  language?: string; // For code blocks
  url?: string; // For images and videos
  altText?: string; // For images
  thumbnailUrl?: string; // For videos
  width?: number; // For images
  height?: number; // For images
  duration?: string; // For videos
};

export interface Asset {
  id: string;
  title: string;
  type: AssetType;
  category: string;
  description?: string;
  location?: string;
  tags?: string[];
  readingTime?: string;
  date: string;
  titleImage?: string;
  authors?: string[];
  level?:
    | 'Basic'
    | 'Intermediate'
    | 'Advanced'
    | 'Professional'
    | 'Entry Level';

  content?: ContentBlock[];
}

export interface CardData {
  id: number;
  title: string;
  content: string;
  header?: ReactNode;
  footer?: ReactNode;
  classes?: { card?: string; content?: string; title?: string };
}

export interface Update {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface UpdatesRequest {
  page?: number;
  limit?: number;
  status?: string;
}

export interface UpdatesResponse {
  updates: Update[];
  total: number;
  page: number;
}
