"use client";
import Image from "next/image";
import { FillingAnimatedButton } from "../filling-animated-button";
import Link from "next/link";
import { cn, socials } from "@shared/lib";
import { useMedia } from "react-use";
import { FadingText } from "../fading-text";
import { GlowingButton } from "../glowing-button";

export const HeroSection = () => {
  const isMobile = useMedia(`(max-width: 1110px)`);
  return (
    <section
      id="hero"
      className={cn(
        "min-h-full flex flex-col justify-start items-center text-center relative overflow-hidden",
        isMobile ? "pt-12" : ""
      )}
    >
      <FadingText className="mt-16 md:mt-36 tracking-tight text-4xl px-2 sm:px-0 sm:text-5xl md:text-7xl line-clamp-3 md:line-clamp-2 max-w-xl sm:max-w-3xl md:max-w-5xl">
        Shaping the Global Quantum Revolution from Israel
      </FadingText>

      <p className="mt-4 text-base sm:text-lg md:text-2xl text-white/80">
        Israel&apos;s Quantum Tech Association
      </p>
      <Link
        target="_blank"
        href={
          "https://docs.google.com/forms/d/e/1FAIpQLSdTxRV03uhpIRm4KsXp3eQMGXrCCnyCiDPOpRlpdOihiYklog/viewform"
        }
        className="mt-8"
      >
        <FillingAnimatedButton className="bg-gray-700/50 sm:px-9 sm:py-5 text-base">
          Join The Community
        </FillingAnimatedButton>
      </Link>

      <div className="absolute bottom-8 grid gap-6 w-[80vw] justify-center items-center grid-cols-1 sm:grid-cols-2 ">
        <Link
          href="/#stats"
          className="flex items-center justify-center sm:justify-start order-2 sm:order-2"
        >
          <button type="button" className="text-white/80 cursor-pointer">
            SCROLL DOWN
          </button>
        </Link>
        <div className="flex space-x-8 justify-center sm:justify-end order-1 sm:order-2">
          {socials
            .filter((item) => item.active)
            .map((item) => (
              <GlowingButton
                key={item.href}
                color={item.color}
                icon={item.icon}
                link={item.href}
              />
            ))}
        </div>
      </div>

      <Image
        src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/home-background-crop.png"
        alt="home-background-crop"
        width={1000}
        height={800}
        className="absolute bottom-0 -z-10 w-full object-cover h-2/3 md:h-full md:scale-110"
      />
    </section>
  );
};
