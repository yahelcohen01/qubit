"use client";
import { HeroSection } from "./components/hero-section/hero-section";
import { AboutSection } from "./components/about-section/about-section";
import { InstitutesSection } from "./components/institutes-section/institutes-section";
import { EventHighlightsSection } from "./components/events-highlights-section/events-highlights-section";
import { WhosWhoSection } from "./components/whos-who-section/whos-who-section";
import { ContactSection } from "./components/contact-section/contact-section";
import { InnovationSection } from "./components/innovation-section/innovation-section";

export default function MinimalistPortfolio() {
  return (
    <main className="h-[calc(100vh-110px)] flex flex-col mt-[110px]">
      <HeroSection />
      <AboutSection />
      <InstitutesSection />
      <EventHighlightsSection />
      <WhosWhoSection />
      <ContactSection />
      <InnovationSection />
    </main>
  );
}
