"use client";
import { cn, stats } from "@shared/lib";
import Image from "next/image";
import { useMedia } from "react-use";
import { Card } from "../card";
import { ResponsiveLayout } from "../responsive-layout";
import { AboutTypography } from "./about-typography";
import { Startups } from "./startups";
import { Stats } from "./stats";

export const AboutSection = () => {
  const isMobile = useMedia("(max-width: 1110px)");

  return (
    <section className="bg-gray-bg h-auto relative rounded-b-3xl">
      <Stats />

      {/* left side illustration */}
      <div
        className={cn(
          "absolute left-0 -translate-y-1/2 pointer-events-none z-0 h-max",
          isMobile ? "top-2/3" : "top-1/3"
        )}
      >
        <Image
          src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/left-side-illustration.png"
          alt="bg"
          width={isMobile ? 150 : 220}
          height={isMobile ? 120 : 220}
          className="w-auto h-auto max-h-full object-contain"
        />
      </div>

      {/* right side illustration */}
      <div
        className={cn(
          "absolute right-0 -translate-y-1/2 pointer-events-none z-0 h-max",
          isMobile ? "top-2/3" : "top-1/3"
        )}
      >
        <Image
          src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/right-side-illustration.png"
          alt="bg-2"
          width={isMobile ? 100 : 150}
          height={isMobile ? 100 : 150}
          className="w-auto h-auto max-h-full object-contain"
        />
      </div>

      <AboutTypography />
      <Startups />
    </section>
  );
};
