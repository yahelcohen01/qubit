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
