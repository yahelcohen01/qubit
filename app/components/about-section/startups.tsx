import { DotIcon } from "@shared/icons";
import { useMedia } from "react-use";
import { ResponsiveLayout } from "../responsive-layout";
import { Carousel } from "../carousel";
import { startups } from "@shared/lib";
import Image from "next/image";

export const Startups = () => {
  const isMobile = useMedia("(max-width: 1110px)");
  return (
    <div className="min-w-[95vw] max-w-[95vw] mx-auto px-6 lg:px-4 py-16 text-center relative z-10">
      <h2 className="text-sm font-normal mb-4 text-black flex items-center justify-center gap-x-2">
        <DotIcon /> STARTUPS
      </h2>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-black mb-6 z-10">
        <span className="text-black/20">The Heart of</span> Quantum Startups in
        Israel
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-black/50 max-w-4xl mx-auto font-poppins">
        The Israeli startups driving progress in the world of quantum computing.
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
  );
};
