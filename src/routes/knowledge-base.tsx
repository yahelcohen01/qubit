import { KnowledgeBase } from '@/components/pages/knowledge-base/knowledge-base';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/knowledge-base')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <KnowledgeBase />
    </div>
  );
}
