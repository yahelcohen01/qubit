export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export interface CarouselItem {
  readonly title: string;
  readonly img: string;
  readonly url?: string;
  readonly [key: string]: any;
}

export type Activity = {
  id: string;
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  location?: { name?: string; address?: string };
  tags?: string[];
  organizer?: { name?: string; email?: string };
  url?: string;
  capacity?: number;
  img: string;
  [k: string]: any;
};
