"use client";
import { DotIcon } from "@shared/icons";
import { ResponsiveLayout } from "../responsive-layout";
import { FadingText } from "../fading-text";
import { cn, institutes } from "@shared/lib";
import { useMedia } from "react-use";

export const InstitutesSection = () => {
  const isMobile = useMedia("(max-width: 768px)");
  return (
    <section
      className="relative w-full py-24 px-4 md:px-16 lg:px-24 xl:px-32"
      id="institutes"
    >
      <img
        src="/assets/left-ins-background.png"
        alt="Research Institutes"
        className={cn(
          "w-[40vw] absolute left-0 object-cover h-full -translate-y-24 -z-10",
          isMobile && "hidden"
        )}
        style={{
          mask: `
      linear-gradient(to right, black 75%, transparent),
      linear-gradient(to bottom, black 75%, transparent)
    `,
          WebkitMask: `
      linear-gradient(to right, black 75%, transparent),
      linear-gradient(to bottom, black 75%, transparent)
    `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {isMobile && (
        <img
          src="/assets/home-background.png"
          alt="Research Institutes"
          className={cn(
            "absolute top-0 w-full object-cover left-0 -translate-y-24 -z-10 h-1/2"
          )}
          style={{
            mask: "radial-gradient(ellipse 98% 95% at center top, black 60%, transparent 90%)",
            WebkitMask:
              "radial-gradient(ellipse 98% 95% at center top, black 60%, transparent 90%)",
          }}
        />
      )}
      <ResponsiveLayout
        columns={{ base: 1, md: 5 }}
        className="text-center md:text-left relative mt-72 md:my-0"
      >
        <div className="md:col-span-3 z-10">
          <h2 className="text-xs navbar:text-sm font-normal mb-4 text-white flex items-center justify-center gap-x-2">
            <DotIcon color="white" /> RESEARCH INSTITUTES
          </h2>
          <FadingText className="text-3xl sm:text-3xl md:text-5xl xl:text-6xl font-normal">
            Partnering with leading <br /> research institutes
          </FadingText>
          <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mt-6 font-poppins">
            We collaborate with Israel’s leading research institutes and
            universities, joining forces to advance quantum technologies
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:col-span-2">
          {institutes.map((institute) => (
            <div
              key={institute.name}
              className="grid bg-white/12 p-4 rounded-2xl w-auto items-center h-32"
            >
              <img
                src={institute.img}
                alt={institute.name}
                className="max-h-24 object-contain mx-auto"
              />
            </div>
          ))}
        </div>
      </ResponsiveLayout>
    </section>
  );
};
