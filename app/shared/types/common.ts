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
  readonly [key: string]: any;
}
