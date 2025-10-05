import { cn, people } from "@shared/lib";
import { FadingText } from "../fading-text";
import { LinkedinIcon } from "@shared/icons";
import { useMedia } from "react-use";
import { Divider } from "../divider";

export const WhosWhoSection = () => {
  const isMobile = useMedia("(max-width: 768px)");
  return (
    <section
      className={cn(
        "grid py-16 items-center gap-8 px-4 scroll-mt-30",
        isMobile ? "" : "justify-center"
      )}
      id="whos-who"
    >
      <div className="grid items-center justify-center text-center">
        <FadingText className="text-3xl sm:text-3xl md:text-5xl xl:text-6xl font-normal leading-relaxed">
          Who’s who
        </FadingText>
        <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-4xl font-poppins">
          Meet the dedicated minds working together to shape and grow our
          community.
        </p>
      </div>
      {isMobile ? (
        <MobileGrid />
      ) : (
        <div className="grid grid-cols-3 justify-center-safe gap-16 px-16">
          {people.map((person) => (
            <div
              key={person.name}
              className="flex flex-col flex-shrink-0 max-w-82 gap-6"
            >
              <img
                src={person.img}
                alt={person.name}
                className="max-w-82 max-h-82 rounded-2xl object-cover"
              />
              <div className="grid grid-cols-3">
                <div className="flex flex-col col-span-2">
                  <h3 className="text-lg font-medium">{person.name}</h3>
                  <p className="text-sm text-white/50">{person.role}</p>
                </div>
                <button
                  onClick={() => window.open(person.linkedin, "_blank")}
                  className="my-auto justify-self-end mr-4 bg-white/15 p-2 rounded-full hover:bg-white/25 transition-colors cursor-pointer"
                >
                  <LinkedinIcon className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const MobileGrid = () => {
  return (
    <div className="grid grid-cols-1 justify-center-safe">
      {people.map((person, index) => (
        <div
          key={person.name}
          className="flex w-full relative justify-between py-4"
        >
          <div className="flex gap-4">
            <img
              src={person.img}
              alt={person.name}
              className="max-w-16 max-h-16 rounded-lg object-cover"
            />
            <div className="flex flex-col self-center">
              <h3 className="text-base font-medium leading-8">{person.name}</h3>
              <p className="font-poppins text-sm text-white/50">
                {person.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => window.open(person.linkedin, "_blank")}
            className="my-auto justify-self-end mr-4 bg-white/15 p-3 rounded-full hover:bg-white/25 transition-colors cursor-pointer"
          >
            <LinkedinIcon className="size-3" />
          </button>
          {index !== people.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};
