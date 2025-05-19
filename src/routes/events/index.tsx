import EventsPage from '@/components/pages/events-page/events';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/events/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <EventsPage />;
}
