import type { ReactNode } from 'react';

export type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

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
  authors?: string[];
  level?:
    | 'Basic'
    | 'Intermediate'
    | 'Advanced'
    | 'Professional'
    | 'Entry Level';
}

export interface CardData {
  id: number;
  title: string;
  content: string;
  header?: ReactNode;
  footer?: ReactNode;
  classes?: { card?: string; content?: string; title?: string };
}
