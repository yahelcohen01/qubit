import { createFileRoute, Link } from '@tanstack/react-router';
import SchrodingerCat from '@root/public/schrodinger-cat.png';
import { ShareYourPodcastIdeasForm } from '@/components/pages/podcast-page/share-your-podcast-ideas-form';
import { useState } from 'react';
import { Dialog } from '@/components/ui';

export const Route = createFileRoute('/podcast')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-rows-[30%_70%] md:grid-rows-none md:grid-cols-[60%_40%] w-full min-h-[90vh]">
      <div className="flex-col order-2 md:order-1 p-8 md:pl-8 md:pt-8 text-left content-start md:py-0 md:content-center">
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold">Coming Soon!</h1>
        <p className="text-xl sm:text-2xl">
          <span className="font-bold">Qubit-IL</span> podcast about quantum
          computing and quantum information science.{' '}
          <a
            href="https://qubitil.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            Stay tuned for updates!
          </a>
        </p>
        <div className="flex flex-col mt-4 items-start gap-4 md:flex-row md:items-center">
          <p className="text-lg sm:text-xl font-light">
            If you have ideas for episodes or want to suggest yourself for an
            episode - you can contact us.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-secondary text-white hover:opacity-80 whitespace-nowrap px-2 h-10"
          >
            Share your ideas!
          </button>

          <Dialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Share your ideas"
            description="Let us know if you have any ideas for the podcast!"
            size="md"
          >
            <ShareYourPodcastIdeasForm />
          </Dialog>
        </div>
      </div>
      <div className="order-1 md:order-2 flex items-center justify-center">
        <img
          src={SchrodingerCat}
          className="h-11/12 md:h-auto lg:h-1/3 md:p-0 object-cover"
        />
      </div>
    </div>
  );
}
