import { useMedia } from 'react-use';
import qc from '../../public/quantum-computer-Photoroom.png';
import { Fragment } from 'react';

export const About = () => {
  const isWide = useMedia('(min-width: 900px)');
  return (
    <Fragment>
      {isWide ? (
        <div className="relative flex justify-center mb-30">
          <div className="w-5/6">
            <div className="bg-[#17BEBB] py-16 rounded-tl-4xl rounded-br-4xl mr-24 flex justify-self-center">
              <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 grid-cols-2">
                <div className="max-w-full">
                  <h2 className="text-3xl font-semibold tracking-tight text-pretty text-white sm:text-4xl">
                    It's all about Quantum
                  </h2>
                  <p className="mt-6 text-lg/8 text-white">
                    Qubit-il is Israel’s hub for quantum tech—uniting academia,
                    industry, and education under one open, neutral, and vibrant
                    community. We host events, share knowledge, and spark
                    connections to push quantum innovation forward and help
                    position Israel as a global leader in the field.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bg-[#e8e8ea] rounded-br-4xl right-6 -bottom-14">
              <img
                src={qc}
                alt="bg"
                className="flex min-h-64 max-h-96 object-cover justify-self-end px-20"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-col mb-20">
          <div className="rounded-tl-4xl bg-[#e8e8ea]">
            <img
              src={qc}
              alt="bg"
              className="flex min-h-64 max-h-96 object-cover justify-self-center px-20"
            />
          </div>
          <div className="bg-[#17BEBB] rounded-br-4xl py-12">
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 grid-cols-1">
              <div className="max-w-full">
                <h2 className="text-3xl font-semibold tracking-tight text-pretty text-white sm:text-4xl">
                  It's all about Quantum
                </h2>
                <p className="mt-6 text-lg/8 text-white">
                  Qubit-il is Israel’s hub for quantum tech—uniting academia,
                  industry, and education under one open, neutral, and vibrant
                  community. We host events, share knowledge, and spark
                  connections to push quantum innovation forward and help
                  position Israel as a global leader in the field.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
