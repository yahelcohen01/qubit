"use client";
import { DotIcon } from "@shared/icons";
import { Card } from "../card";
import { ResponsiveLayout } from "../responsive-layout";
import { cn, startups, stats } from "@shared/lib";
import Image from "next/image";
import { Carousel } from "../carousel";
import { useMedia } from "react-use";

export const AboutSection = () => {
  const isMobile = useMedia("(max-width: 1110px)");

  return (
    <section className="bg-gray-bg h-auto relative rounded-b-3xl">
      {/* stats */}
      <ResponsiveLayout className="p-8 sm:p-12 md:p-16 gap-6 grid-cols-2 navbar:grid-cols-5 z-10">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            title={stat.value}
            content={stat.content}
            className={`${stat.className} z-10`}
          />
        ))}
      </ResponsiveLayout>

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

      {/* about */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-4 py-16 text-center scroll-mt-30"
        id="about"
      >
        <h2 className="text-sm font-normal mb-4 text-black flex items-center justify-center gap-x-2">
          <DotIcon /> ABOUT US
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-black/50 max-w-4xl mx-auto font-poppins z-10">
          QUBIT is Israel’s first and only nonprofit dedicated exclusively to
          quantum computing. Founded by leaders from technology, academia, and
          policy, we are building a vibrant ecosystem that connects students,
          researchers, startups, corporates, and government.
          <br />
          <br />
          Through education, community events, partnerships, and grants, we are
          driving Israel’s position as a global quantum hub.
          <br />
          Our vision is bold yet clear: to make Israel a top-10 quantum nation
          and ensure it plays a central role in the coming quantum revolution.
        </p>
      </div>

      {/* startups */}
      <div className="min-w-[90vw] max-w-[90vw] mx-auto px-6 lg:px-4 py-16 text-center relative z-10">
        <h2 className="text-sm font-normal mb-4 text-black flex items-center justify-center gap-x-2">
          <DotIcon /> STARTUPS
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-black mb-6 z-10">
          <span className="text-black/20">The Heart of</span> Quantum Startups
          in Israel
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-black/50 max-w-4xl mx-auto font-poppins">
          The Israeli startups driving progress in the world of quantum
          computing.
        </p>

        {isMobile ? (
          <Carousel
            items={startups}
            cardsPerPage={6}
            autoplay
            navigation="dots"
          />
        ) : (
          <ResponsiveLayout
            className="py-8 grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7"
            // columns={{
            //   base: 3,
            //   sm: 5,
            //   md: 6,
            //   lg: 7,
            // }}
            gap="gap-4"
            as="div"
          >
            {startups.map((startup) => (
              <div
                key={startup.title}
                className="border-t border-t-white hover:bg-white transition-colors duration-500 items-center flex justify-center"
              >
                <Image
                  src={startup.img}
                  alt={startup.title}
                  width={224}
                  height={224}
                  className="max-h-full object-contain w-full"
                />
              </div>
            ))}
          </ResponsiveLayout>
        )}
      </div>
    </section>
  );
};
