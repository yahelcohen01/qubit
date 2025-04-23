import { createFileRoute } from '@tanstack/react-router';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import Lottie from 'lottie-react';
import Waves from '../../public/waves.json';
import { MeetTheTeam } from '@/components/MeetTheTeam';
import { About } from '@/components/About';
import { BlogPostCarousel } from '@/components/BlogPostCarousel';

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
      <div className="row-start-1 col-start-1 row-span-1 col-span-1 flex flex-col w-full">
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
        <About />
        <MeetTheTeam />
      </div>
    </div>
  );
}
{
  /* <p className="text-5xl font-medium">
              Welcome to the Israeli{' '}
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                Quantum
              </span>{' '}
              Community
            </p> */
}
{
  /* <p className="text-2xl font-normal mt-2">
            Empowering Israel's Quantum Frontier: Pioneering Qubits, Powering
            Israel's Future.
          </p> */
}
