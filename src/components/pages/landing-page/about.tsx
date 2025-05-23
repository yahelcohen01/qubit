import { useMedia } from 'react-use';
import qc from '@root/public/quantum-computer-Photoroom.png';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import type { ClassValue } from 'clsx';

export const About = () => {
  const isWide = useMedia('(min-width: 900px)');

  return (
    <Fragment>
      {isWide ? (
        <div className="relative flex justify-center">
          <div className="w-full">
            <div className="bg-[#17BEBB] py-16 rounded-tl-4xl rounded-br-4xl mr-24 flex justify-self-center">
              <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 grid-cols-2">
                <TextSection />
              </div>
            </div>
            <div className="absolute bg-[#e8e8ea] rounded-br-4xl right-0 -bottom-14">
              <img
                src={qc}
                alt="bg"
                className="flex min-h-64 max-h-96 object-cover justify-self-end px-20"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-col">
          <div className="rounded-tl-4xl bg-[#e8e8ea]">
            <img
              src={qc}
              alt="bg"
              className="flex min-h-64 max-h-96 object-cover justify-self-center px-20"
            />
          </div>
          <div className="bg-[#17BEBB] rounded-br-4xl py-12">
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 grid-cols-1">
              <TextSection classes={{ desc: 'text-lg/10' }} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const TextSection = ({
  classes,
}: {
  classes?: {
    title?: ClassValue;
    desc?: ClassValue;
  };
}) => {
  return (
    <div className="max-w-full">
      <h2
        className={cn(
          'text-3xl font-semibold tracking-tight text-pretty text-white sm:text-4xl',
          classes?.title,
        )}
      >
        It's all about Quantum
      </h2>
      <p className={cn('mt-6 text-lg/8 text-white', classes?.desc)}>
        Qubit-il is Israel’s hub for quantum tech—uniting academia, industry,
        and education under one open, neutral, and vibrant community. We host
        events, share knowledge, and spark connections to push quantum
        innovation forward and help position Israel as a global leader in the
        field.
      </p>
    </div>
  );
};
