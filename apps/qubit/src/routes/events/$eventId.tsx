import { Event } from '../../components/pages/events-page/event';
import { eventData } from '../../components/pages/events-page/events-data';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/events/$eventId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { eventId } = useParams({ from: '/events/$eventId' });
  const event = eventData.find((event) => event.id === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Event event={event} />
    </div>
  );
}
