import { cn } from '@utils';
import { type ReactNode } from 'react';
import { Skeleton } from './skeleton';

type CardProps = {
  title: string;
  content?: string;
  header?: ReactNode;
  footer?: ReactNode;
  animation?: 'slide' | 'grow' | 'border';
  size:
    | '3xs'
    | '2xs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | 'full'
    | (string & {});
  classes?: { card?: string; content?: string; title?: string };
  skeleton?: boolean;
};

export const Card = ({
  title,
  content,
  footer,
  header,
  animation,
  classes,
  size,
  skeleton,
}: CardProps) => {
  const animationClass = () => {
    switch (animation) {
      case 'slide':
        return 'transform hover:-translate-y-1 transition-all';
      case 'grow':
        return 'transform duration-300 hover:scale-105';
      case 'border':
        return 'border border-gray-200 hover:border-black transition-colors';
      default:
        return '';
    }
  };

  if (skeleton) {
    return (
      <Skeleton
        className={cn(
          `flex flex-none flex-col w-3xs h-40 m-4 rounded-sm justify-between`,
          classes?.card
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        `flex flex-none flex-col w-${size} m-4 bg-white rounded-sm cursor-pointer justify-between`,
        animationClass(),
        classes?.card
      )}
    >
      {header && header}
      <div className="p-4">
        <h2
          className={cn('text-lg font-semibold text-gray-800', classes?.title)}
        >
          {title}
        </h2>
        <p className={cn('text-sm text-gray-600', classes?.content)}>
          {content}
        </p>
      </div>
      {footer && footer}
    </div>
  );
};
