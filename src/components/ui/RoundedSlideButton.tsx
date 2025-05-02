import type { PropsWithChildren } from 'react';
import { FiLogIn } from 'react-icons/fi';

export const RoundedSlideButton = ({ children }: PropsWithChildren) => {
  return (
    <button
      className={`
        relative z-0 flex items-center gap-2 overflow-hidden border-[1px] 
        border-black px-2 py-2 font-normal
        uppercase text-black transition-all duration-500 h-8
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-[#17BEBB]
        before:transition-transform before:duration-1000
        before:content-[""]

        hover:scale-105 hover:text-neutral-900
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95`}
    >
      <FiLogIn />
      <span>{children}</span>
    </button>
  );
};
