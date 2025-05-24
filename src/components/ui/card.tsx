import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type CardProps = {
  title: string;
  content: string;
  header?: ReactNode;
  footer?: ReactNode;
  animation?: 'slide' | 'grow';
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
  classes?: string;
};

export const Card = ({
  title,
  content,
  footer,
  header,
  animation,
  classes,
  size,
}: CardProps) => {
  const animationClass =
    animation === 'slide'
      ? 'transform hover:-translate-y-1 transition-all'
      : 'transform duration-300 hover:scale-105';

  return (
    <div
      className={cn(
        `flex-none w-${size} m-4 bg-white rounded-sm cursor-pointer`,
        animationClass,
        classes,
      )}
    >
      {header && <div className="p-4 border-b border-gray-200">{header}</div>}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{content}</p>
      </div>
      {footer && <div className="p-4 border-t border-gray-200">{footer}</div>}
    </div>
  );
};
