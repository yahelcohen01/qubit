import { useState } from 'react';
import { Clock, MapPin, ChevronRight, Info } from 'lucide-react';

// TypeScript interfaces
interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  venue: string;
  category?: string;
  description?: string;
  isPromoted?: boolean;
}

interface EventsByDate {
  [date: string]: Event[];
}

type SortOption = 'date' | 'relevance' | 'location';

// Mock data - similar to the design in the image example
const eventData: Event[] = [
  {
    id: '1',
    title: 'Coldplay: Music Of The Spheres World Tour - delivered by DHL',
    date: new Date(2025, 5, 10), // June 10, 2025
    time: '6:00 PM',
    location: 'Denver, CO',
    venue: 'Empower Field At Mile High',
    category: 'Concert',
  },
  {
    id: '2',
    title: 'Coldplay: Music Of The Spheres World Tour - delivered by DHL',
    date: new Date(2025, 5, 6), // June 6, 2025
    time: '6:00 PM',
    location: 'Las Vegas, NV',
    venue: 'Allegiant Stadium',
    category: 'Concert',
  },
  {
    id: '3',
    title: "Luke Combs: Growin' Up and Gettin' Old Tour",
    date: new Date(2025, 4, 18), // May 18, 2025
    time: '5:30 PM',
    location: 'Chicago, IL',
    venue: 'Soldier Field',
    category: 'Concert',
  },
  {
    id: '4',
    title: 'Taylor Swift | The Eras Tour',
    date: new Date(2025, 4, 24), // May 24, 2025
    time: '7:00 PM',
    location: 'New York, NY',
    venue: 'MetLife Stadium',
    category: 'Concert',
  },
  {
    id: '5',
    title: 'EXCLUSIVE | Ticketmaster now offers hotel deals',
    date: new Date(2025, 5, 15), // June 15, 2025
    time: '',
    location: '',
    venue: '',
    description:
      'Save up to 57% off your stay when you bundle your ticket with a hotel',
    isPromoted: true,
  },
];

// Helper functions
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatDay = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const formatMonth = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
};

const groupEventsByDate = (events: Event[]): EventsByDate => {
  const grouped: EventsByDate = {};

  events.sort((a, b) => a.date.getTime() - b.date.getTime());

  events.forEach((event) => {
    const dateStr = event.date.toISOString().split('T')[0];
    if (!grouped[dateStr]) {
      grouped[dateStr] = [];
    }
    grouped[dateStr].push(event);
  });

  return grouped;
};

// Components
interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const monthStr = formatMonth(event.date);
  const dayNum = event.date.getDate();
  const dayStr = formatDay(event.date);

  // Handle promoted events differently
  if (event.isPromoted) {
    return (
      <div className="flex border-b border-gray-200 py-4 last:border-b-0 bg-gray-50">
        <div className="w-16 flex-shrink-0 flex justify-center items-center md:w-24">
          <div className="bg-blue-100 text-blue-800 p-2 rounded">
            <div className="flex items-center">
              <span className="font-bold text-lg">T</span>
              <span className="border-l ml-1 pl-1 text-lg">=</span>
            </div>
          </div>
        </div>

        <div className="flex-grow ml-3">
          <div className="flex items-center mb-1">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
              PROMOTED
            </span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1 md:text-xl">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600">{event.description}</p>
        </div>

        <div className="flex-shrink-0 ml-2 flex items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 md:font-medium md:py-2 md:px-6 md:rounded">
            <ChevronRight size={16} className="md:hidden" />
            <span className="hidden md:inline">Find Deals</span>
            <ChevronRight size={18} className="ml-1 hidden md:inline" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex border-b border-gray-200 py-4 last:border-b-0 hover:bg-blue-50 transition-colors duration-200">
      <div className="w-16 flex-shrink-0 md:w-24 md:mr-6">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-blue-600 md:text-gray-500">
            {monthStr}
          </span>
          <span className="text-2xl font-bold text-gray-900 md:text-4xl">
            {dayNum}
          </span>
          <span className="hidden md:block text-sm font-medium text-gray-500">
            {dayStr}
          </span>
        </div>
      </div>

      <div className="flex-grow ml-2 md:ml-0">
        <div className="flex items-center mb-1">
          <span className="text-sm text-gray-600">
            {dayStr} • {event.time}
            {event.time && (
              <Info size={14} className="inline-block ml-1 text-gray-400" />
            )}
          </span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-1 md:text-xl">
          {event.title}
        </h3>

        <div className="flex items-start">
          <span className="text-sm text-gray-600">
            {event.location}
            {event.venue && (
              <span className="hidden md:inline"> • {event.venue}</span>
            )}
          </span>
        </div>

        <div className="text-sm text-gray-600 md:hidden">{event.venue}</div>
      </div>

      <div className="flex-shrink-0 ml-2 flex items-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 md:font-medium md:py-2 md:px-6 md:rounded">
          <ChevronRight size={16} className="md:hidden" />
          <span className="hidden md:inline">Find Tickets</span>
          <ChevronRight size={18} className="ml-1 hidden md:inline" />
        </button>
      </div>
    </div>
  );
};

const EventsList: React.FC = () => {
  const [sortedEvents] = useState<Event[]>(
    eventData.sort((a, b) => a.date.getTime() - b.date.getTime()),
  );
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const eventsByDate = groupEventsByDate(sortedEvents);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 mr-2 md:text-2xl">
              EVENTS
            </h1>
            <span className="text-gray-500 text-sm md:text-base">
              • {sortedEvents.length} RESULTS
            </span>
          </div>

          <div className="relative">
            <button className="flex items-center border border-gray-300 rounded-md px-3 py-1 md:px-4 md:py-2 bg-white text-gray-700 hover:bg-gray-50 text-sm md:text-base">
              <span className="mr-2">Relevance</span>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-2 md:text-xl md:mb-4">
            United States
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
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

// Main App Component
export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EventsList />
    </div>
  );
}
