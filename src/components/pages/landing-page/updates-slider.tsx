import { CardContainer } from '@/components/ui';
import type { CardData } from '@/types';

export const UpdatesSlider = () => {
  const cards = cardsData.map((card) => ({
    id: card.id,
    title: card.title,
    content: card.content,
    classes: { card: 'border border-gray-200' },
    header: (
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <span className="rounded-sm border-[1px] border-neutral-500 px-1.5 py-1 text-xs uppercase text-neutral-500 items-center">
          {card.author}
        </span>
        <span className="text-neutral-500 font-light text-xs">
          {new Date(card.date).toLocaleDateString()}
        </span>
      </div>
    ),
  }));

  return (
    <div className="py-8">
      <CardContainer cards={cards} />
    </div>
  );
};

const cardsData: (CardData & { author: string; date: string })[] = [
  {
    id: 1,
    author: 'JOHN ANDERSON',
    date: '2025-04-01',
    title: 'We built an AI chess bot with ChatGPT',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
  {
    id: 2,
    author: 'KYLE PARSONS',
    date: '2025-04-20',
    title: 'How to grow your personal brand as a web designer',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
  {
    id: 3,
    author: 'ANDREA BATES',
    date: '2025-05-05',
    title: 'Calm down, monetization can wait',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
  {
    id: 4,
    author: 'MICHAEL CHEN',
    date: '2025-05-12',
    title: 'The future of responsive web design in 2025',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
  {
    id: 5,
    author: 'SARAH JOHNSON',
    date: '2025-05-18',
    title: 'Why TypeScript is becoming essential for modern web development',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
];
