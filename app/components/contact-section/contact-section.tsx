import {
  DotIcon,
  ExternalLinkIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@shared/icons";
import { ResponsiveLayout } from "../responsive-layout";
import { FadingText } from "../fading-text";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full py-16 px-4 md:px-16 lg:px-24 xl:px-56"
    >
      <ResponsiveLayout className="text-center" columns={{ base: 1, md: 2 }}>
        <div className="relative items-start justify-start grid text-left">
          <FadingText className="text-3xl sm:text-3xl md:text-5xl xl:text-6xl font-normal">
            <h2 className="text-sm font-normal mb-4 flex items-center gap-x-2">
              <DotIcon color="white" /> CONTACT
            </h2>
            Join the Quantum Revolution
          </FadingText>
          <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-4xl font-poppins">
            Reach out with any question, idea, or opportunity.
          </p>
          <h3 className="text-base sm:text-lg md:text-xl font-normal mt-4">
            Join Qubit Community
          </h3>
          <div className="flex gap-12">
            <div className="flex font-poppins items-center gap-2">
              <div className="my-auto justify-self-end bg-[#0277B5] p-3 rounded-full">
                <LinkedinIcon className="size-4" />
              </div>
              <a
                href="https://www.linkedin.com/company/qubit-community"
                target="_blank"
                rel="noopener noreferrer"
                className="flex underline items-center gap-1"
              >
                LinkedIn
                <ExternalLinkIcon className="size-3" />
              </a>
            </div>

            <div className="flex font-poppins items-center gap-2">
              <div className="my-auto justify-self-end bg-[#57F573] p-3 rounded-full">
                <WhatsappIcon className="size-4" />
              </div>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex underline items-center gap-1"
              >
                WhatsApp
                <ExternalLinkIcon className="size-3" />
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </ResponsiveLayout>
    </section>
  );
};

const ContactForm = () => {
  return (
    <form className="max-w-lg mx-auto bg-white/5 p-8 rounded-lg backdrop-blur-md">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Email"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-white"
        >
          Message
        </label>
        <textarea
          id="message"
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Message"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send Message
      </button>
    </form>
  );
};
