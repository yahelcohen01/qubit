import { createFileRoute } from '@tanstack/react-router';
import { TypingAnimation } from '@ui';
import Lottie from 'lottie-react';
import Waves from '../../public/waves.json';
import { MeetTheTeam } from '../components/pages/landing-page/meet-the-team';
import { About } from '../components/pages/landing-page/about';
import { UpdatesSlider } from '../components/pages/landing-page/updates-slider';
import { Partners } from '../components/pages/landing-page/partners';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="grid grid-rows-1 grid-cols-1 px-8 pb-24">
      <div className="row-start-1 col-start-1 row-span-1 col-span-1 flex flex-col w-full max-w-11/12 justify-center self-center justify-self-center">
        <div className="relative w-full h-[65vh] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Lottie
              animationData={Waves}
              className="w-full h-120 object-cover"
            />
          </div>

          <div className="relative w-full h-full p-10">
            <div className="flex h-[50vh] w-full items-center justify-center shrink-0">
              <div className="flex-col">
                <TypingAnimation
                  duration={50}
                  className="leading-tight items-center justify-center flex text-center text-5xl 2xl:text-6xl"
                >
                  Welcome to the Israeli Quantum Community!
                </TypingAnimation>
              </div>
            </div>
          </div>
        </div>

        <UpdatesSlider />

        <div className="flex flex-col items-center justify-center gap-40 pt-20 w-full self-center">
          <About />
          <MeetTheTeam />
          <Partners />
        </div>
      </div>
    </div>
  );
}
