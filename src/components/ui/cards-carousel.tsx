import { useRef, type ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from '@carbon/icons-react'; // icon library (install via: `npm i lucide-react`)

interface CardData {
  id: number;
  title: string;
  content: string;
  header?: ReactNode;
  footer?: ReactNode;
  classes?: string;
}

interface CardContainerProps {
  cards: CardData[];
}

const SCROLL_AMOUNT = 300;

export const CardContainer = ({ cards }: CardContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const amount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
      containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute -left-10 top-1/2 transform -translate-y-1/2 p-2 z-10 cursor-pointer text-gray-800 hover:text-gray-500"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute -right-10 top-1/2 transform -translate-y-1/2 p-2 z-10 cursor-pointer text-gray-800 hover:text-gray-500"
      >
        <ChevronRight className="size-5" />
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto p-4 rounded-md scroll-smooth scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent"
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            content={card.content}
            animation="slide"
            header={card.header}
            footer={card.footer}
            classes={card.classes}
            size={'3xs'}
          />
        ))}
      </div>
    </div>
  );
};
