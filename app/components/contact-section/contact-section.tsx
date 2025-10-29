import {
  DotIcon,
  ExternalLinkIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@shared/icons";
import { ResponsiveLayout } from "../responsive-layout";
import { FadingText } from "../fading-text";
import { cn } from "@shared/lib";
import { ContactForm } from "./contact-form";
import { GlowingButton } from "../glowing-button";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full py-16 px-4 md:px-16 lg:px-24 xl:px-56 scroll-mt-30"
    >
      <div
        className={cn(
          "absolute right-0 -translate-y-1/2 pointer-events-none z-0 h-[90%] top-3/4 md:top-1/2"
        )}
      >
        <img
          src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/contact-section-bg.png"
          alt="contact-section-bg"
          className="w-auto h-auto max-h-full object-cover"
          style={{
            mask: `
      linear-gradient(to left, black 75%, transparent),
      linear-gradient(to bottom, black 75%, transparent)
    `,
            WebkitMask: `
      linear-gradient(to left, black 75%, transparent),
      linear-gradient(to bottom, black 75%, transparent)
    `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>
      <ResponsiveLayout
        className="text-center md:text-left"
        columns={{ base: 1, md: 2 }}
      >
        <div className="relative flex flex-col gap-6 justify-center md:justify-start items-center md:items-start">
          <FadingText className="text-3xl sm:text-3xl md:text-5xl xl:text-6xl font-normal flex flex-col">
            <div className="text-sm font-normal mb-4 flex items-center gap-x-2 mx-auto md:mx-0">
              <DotIcon color="white" /> CONTACT
            </div>
            Join the Quantum Revolution
          </FadingText>
          <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-4xl font-poppins">
            Reach out with any question, idea, or opportunity.
          </p>
          <h3 className="text-base sm:text-lg md:text-xl font-normal mt-4">
            Join Qubit Community
          </h3>
          <div className="flex gap-12">
            <GlowingButton
              color="#0277B5"
              icon={<LinkedinIcon className="size-4" />}
              link="https://www.linkedin.com/company/qubit-community"
            >
              LinkedIn
              <ExternalLinkIcon className="size-3" />
            </GlowingButton>

            <GlowingButton
              color="#57F573"
              icon={<WhatsappIcon className="size-4" />}
              link="https://docs.google.com/forms/d/e/1FAIpQLSdTxRV03uhpIRm4KsXp3eQMGXrCCnyCiDPOpRlpdOihiYklog/viewform"
            >
              WhatsApp
              <ExternalLinkIcon className="size-3" />
            </GlowingButton>
          </div>
        </div>
        <ContactForm />
      </ResponsiveLayout>
    </section>
  );
};
