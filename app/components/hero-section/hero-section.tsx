"use client";
import Image from "next/image";
import { FillingAnimatedButton } from "../filling-animated-button";
import Link from "next/link";
import { socials } from "@shared/lib";
import { useMedia } from "react-use";
import { FadingText } from "../fading-text";

export const HeroSection = () => {
  const isMobile = useMedia(`(max-width: 1110px)`);
  return (
    <section
      id="hero"
      className="min-h-full flex flex-col justify-start items-center text-center relative overflow-hidden"
    >
      <FadingText className="mt-16 md:mt-36 tracking-tight text-4xl sm:text-5xl md:text-7xl line-clamp-3 md:line-clamp-2 max-w-xl sm:max-w-3xl md:max-w-5xl">
        Shaping the Global Quantum Revolution from Israel
      </FadingText>

      <p className="mt-4 text-base sm:text-lg md:text-2xl text-white/80">
        Israel&apos;s Quantum Tech Association
      </p>
      <FillingAnimatedButton className="mt-8 bg-gray-700/50 sm:px-9 sm:py-5 text-base">
        Learn About Us
      </FillingAnimatedButton>

      {!isMobile && (
        <div className="absolute bottom-0 mb-8 px-36 flex space-x-3 w-full justify-between">
          <button type="button" className="text-white/80 cursor-pointer">
            SCROLL DOWN
          </button>
          <div className="flex space-x-3">
            {socials.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-full text-base font-medium bg-gray-700/50 p-3 items-center cursor-pointer"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Image
        src="/assets/test-bg-test.png"
        alt="bg"
        width={1000}
        height={800}
        className="absolute bottom-0 -z-10 w-full object-cover h-2/3 md:h-full md:scale-110"
      />
    </section>
  );
};
