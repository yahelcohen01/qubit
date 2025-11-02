"use client";
import { HeroSection } from "./components/hero-section/hero-section";
import { AboutSection } from "./components/about-section/about-section";
import { InstitutesSection } from "./components/institutes-section/institutes-section";
import { EventHighlightsSection } from "./components/events-highlights-section/events-highlights-section";
import { WhosWhoSection } from "./components/whos-who-section/whos-who-section";
import { ContactSection } from "./components/contact-section/contact-section";
import { InnovationSection } from "./components/innovation-section/innovation-section";
import { ActivitiesSection } from "./components/activities-section/activities-section";

export default function MinimalistPortfolio() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <InstitutesSection />
      <ContactSection />
      <ActivitiesSection />
      <EventHighlightsSection />
      <WhosWhoSection />
      <InnovationSection />
    </>
  );
}
