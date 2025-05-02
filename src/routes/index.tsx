import { createFileRoute } from '@tanstack/react-router';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import Lottie from 'lottie-react';
import Waves from '@root/public/waves.json';
import { MeetTheTeam } from '@/components/MeetTheTeam';
import { About } from '@/components/About';
import { BlogPostCarousel } from '@/components/BlogPostCarousel';
import { Partners } from '@/components/Partners';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="grid grid-rows-1 grid-cols-1 px-8 pb-24">
      <div className="row-start-1 col-start-1 row-span-1 col-span-1 w-full justify-center grid">
        <Lottie
          animationData={Waves}
          loop={true}
          autoplay={true}
          className="-z-10 size-120 px-10"
        />
      </div>
      <div className="row-start-1 col-start-1 row-span-1 col-span-1 flex flex-col w-full max-w-11/12 justify-center self-center justify-self-center">
        <div className="flex h-[65vh] w-full items-center justify-center shrink-0">
          <div className="flex-col">
            <TypingAnimation
              duration={50}
              className="leading-tight items-center justify-center flex text-center text-5xl"
            >
              Welcome to the Israeli Quantum Community!
            </TypingAnimation>
          </div>
        </div>
        <BlogPostCarousel />
        <div className="flex flex-col items-center justify-center gap-40 pt-20 w-full self-center">
          <About />
          <MeetTheTeam />
          <Partners />
        </div>
      </div>
    </div>
  );
}
