import { useState } from 'react';
import { type Event, type SortOption } from '@types';
import { EventCard } from './event-card';

interface EventsListProps {
  events: Event[];
}

const groupEventsByDate = (events: Event[]) => {
  const grouped: Record<string, Event[]> = {};

  events.sort((a, b) => b.date.getTime() - a.date.getTime());

  events.forEach((event) => {
    const dateStr = event.date.toISOString().split('T')[0];
    if (!grouped[dateStr]) {
      grouped[dateStr] = [];
    }
    grouped[dateStr].push(event);
  });

  return grouped;
};

export const EventsList = ({ events }: EventsListProps) => {
  const [sortOption] = useState<SortOption>('relevance');
  const eventsByDate = groupEventsByDate(events);

  return (
    <div className="">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 mr-2 md:text-2xl">
              EVENTS
            </h1>
            <span className="text-gray-500 text-sm md:text-base">
              ▪ {`${Object.keys(eventsByDate).length}`} RESULTS
            </span>
          </div>

          <div className="relative">
            <button className="flex items-center border border-gray-300 px-3 py-1 md:px-4 md:py-2  text-gray-700 hover:bg-gray-50 text-sm md:text-base">
              <span className="mr-2">{sortOption}</span>
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <div className="border border-gray-200 overflow-hidden">
            {Object.entries(eventsByDate).map(([dateStr, events]) => (
              <div key={dateStr}>
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
