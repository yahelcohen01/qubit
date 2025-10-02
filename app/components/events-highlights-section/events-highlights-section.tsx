import { eventsHighlights } from "@shared/lib";
import { Carousel } from "../carousel";
import { FadingText } from "../fading-text";

export const EventHighlightsSection = () => {
  return (
    <section id="highlights">
      <div className="grid items-center justify-center text-center">
        <FadingText className="text-3xl sm:text-3xl md:text-5xl xl:text-6xl font-normal leading-relaxed">
          Highlights from our events
        </FadingText>
        <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl font-poppins">
          A look back at our recent conferences and events, capturing the ideas
          shaping the community.
        </p>
      </div>
      <Carousel
        items={eventsHighlights}
        navigation="arrows"
        variant="slides"
        renderItem={({ item, index }) => (
          <div className="flex flex-col">
            <div className="h-64 sm:h-80 md:h-96 xl:h-128">
              <img
                src={item.img}
                alt={item.title ?? `item-${index}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <h3 className="text-base sm:text-lg font-normal font-poppins text-white/80">
              {item.title}
            </h3>
          </div>
        )}
      />
    </section>
  );
};
