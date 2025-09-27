export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export interface Card {
  readonly name: string;
  readonly img: string;
}
