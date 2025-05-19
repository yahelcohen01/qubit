import { EventsList } from './events-list';
import { eventData } from './events-data';

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <EventsList events={eventData} />
    </div>
  );
}
