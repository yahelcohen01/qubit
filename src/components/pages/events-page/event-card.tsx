import { type Event } from '@/types';
import { ChevronRight } from '@carbon/icons-react';
import { AddToCalendarButton } from '@/components/ui';
import { useNavigate } from '@tanstack/react-router';

interface EventCardProps {
  event: Event;
}

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

export const EventCard = ({ event }: EventCardProps) => {
  const monthStr = formatMonth(event.date);
  const dayNum = event.date.getDate();
  const dayStr = formatDay(event.date);
  const navigate = useNavigate();

  return (
    <div className="flex border-b border-gray-200 py-4 last:border-b-0 hover:bg-gray-200 transition-colors duration-200">
      <div className="w-16 flex-shrink-0 md:w-24 md:mr-6">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-secondary md:text-gray-500">
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
        <AddToCalendarButton
          name={event.title}
          location={event.location}
          startDate={event.date.toISOString()}
          endDate={event.date.toISOString()}
          startTime={event.time}
          endTime={event.time}
          timeZone="Asia/Jerusalem"
          description={event.description}
          tooltip="Add to calendar"
        >
          <div className="flex items-center mb-1 cursor-pointer hover:underline">
            <span className="text-sm text-gray-600 items-center flex">
              {dayStr} • {event.time}
            </span>
          </div>
        </AddToCalendarButton>
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

      <div className="flex-shrink-0 flex items-center p-4">
        <button
          className="cursor-pointer bg-secondary hover:opacity-90 text-white rounded-full p-2 md:font-medium md:py-2 md:px-6 md:rounded"
          onClick={() => navigate({ to: `/events/${event.id}` })}
        >
          <ChevronRight size={16} className="md:hidden" />
          <span className="hidden md:inline">More info</span>
          <ChevronRight size={18} className="ml-1 hidden md:inline" />
        </button>
      </div>
    </div>
  );
};
