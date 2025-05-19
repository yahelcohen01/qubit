import { createFileRoute } from '@tanstack/react-router';
import { TypingAnimation } from '@/components/ui';
import Lottie from 'lottie-react';
import Waves from '@root/public/waves.json';
import { MeetTheTeam } from '@/components/pages/landing-page/meet-the-team';
import { About } from '@/components/pages/landing-page/about';
import { BlogPostCarousel } from '@/components/pages/landing-page/blog-post-carousel';
import { Partners } from '@/components/pages/landing-page/partners';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const animationData = {
    // Your Lottie JSON would go here
    // This is just a placeholder structure
    ...Waves,
    v: '5.7.6',
    fr: 30,
    ip: 0,
    op: 60,
    w: 512,
    h: 512,
    layers: [
      /* Your layers */
    ],
  };

  return (
    <div className="grid grid-rows-1 grid-cols-1 px-8 pb-24">
      {/* <div className="row-start-1 col-start-1 row-span-1 col-span-1 w-full justify-center grid">
        <Lottie
          animationData={Waves}
          loop={true}
          autoplay={true}
          className="-z-10 size-120 3xl:size-140 w-fit"
        />
      </div> */}
      <div className="row-start-1 col-start-1 row-span-1 col-span-1 flex flex-col w-full max-w-11/12 justify-center self-center justify-self-center">
        <div className="relative w-full h-[65vh] overflow-hidden">
          {/* Lottie animation positioned as background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Lottie
              animationData={Waves}
              className="w-full h-120 object-cover"
            />
          </div>

          {/* Your content goes here */}
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

        <BlogPostCarousel posts={samplePosts} />

        <div className="flex flex-col items-center justify-center gap-40 pt-20 w-full self-center">
          <About />
          <MeetTheTeam />
          <Partners />
        </div>
      </div>
    </div>
  );
}

const samplePosts = [
  {
    id: 1,
    author: 'JOHN ANDERSON',
    date: '2025-04-01',
    title: 'We built an AI chess bot with ChatGPT',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
  {
    id: 2,
    author: 'KYLE PARSONS',
    date: '2025-04-20',
    title: 'How to grow your personal brand as a web designer',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
  {
    id: 3,
    author: 'ANDREA BATES',
    date: '2025-05-05',
    title: 'Calm down, monetization can wait',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
  {
    id: 4,
    author: 'MICHAEL CHEN',
    date: '2025-05-12',
    title: 'The future of responsive web design in 2025',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
  {
    id: 5,
    author: 'SARAH JOHNSON',
    date: '2025-05-18',
    title: 'Why TypeScript is becoming essential for modern web development',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.',
  },
];
