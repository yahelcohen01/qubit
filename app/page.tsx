"use client";
import { HeroSection } from "@/app/components/hero-section/hero-section";
import { AboutSection } from "./components/about-section/about-section";

export default function MinimalistPortfolio() {
  return (
    <main className="h-[calc(100vh-110px)] flex flex-col mt-[110px]">
      <HeroSection />
      <AboutSection />
    </main>
  );
}
