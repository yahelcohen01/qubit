import { Activity } from "@shared/types";
import { Carousel } from "../carousel";
import Activities from "@/data/activities.json";
import { DotIcon } from "@shared/icons";
import { FadingText } from "../fading-text";
import { FillingAnimatedButton } from "../filling-animated-button";
import { Divider } from "../divider";
import { DateUtils } from "@shared/lib";
import { useMemo } from "react";

const getLocationText = (activity: Activity) => {
  if (activity.location?.name === "Online") return "Online";
  return activity.location?.name?.split(",")[0] || "TBA";
};
const ActivityCard = ({
  activity,
  featured = false,
}: {
  activity: Activity;
  featured?: boolean;
}) => {
  if (featured) {
    return (
      <div className="relative rounded-3xl overflow-hidden flex flex-col items-end justify-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%), url(${activity.img})`,
          }}
        />
        <div className="relative h-fit flex flex-col justify-end p-8 backdrop-blur-xs">
          <div className="text-sm mb-3 flex items-center gap-2">
            {DateUtils.formatDate(activity.date)} • {getLocationText(activity)}
          </div>
          <FadingText className="text-3xl sm:text-2xl md:text-4xl xl:text-5xl font-normal line-clamp-2 leading-14">
            {activity.title}
          </FadingText>
          <p className="text-gray-300 text-base md:text-lg mb-6 line-clamp-2">
            {activity.description}
          </p>
          <FillingAnimatedButton className="w-fit">
            More details
          </FillingAnimatedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4 cursor-pointer group">
      <img
        src={activity.img}
        alt={activity.title}
        className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-cyan-500 text-xs mb-1">
          {DateUtils.formatDate(activity.date)} • {getLocationText(activity)}
        </div>

        <h3 className="text-white text-lg font-normal mb-2 group-hover:text-cyan-500 transition-colors line-clamp-1">
          {activity.title}
        </h3>
        <p className="text-white/50 text-sm line-clamp-1">
          {activity.description}
        </p>
      </div>
    </div>
  );
};

export const ActivitiesSection = () => {
  const activities: Activity[] = useMemo(
    () =>
      Activities.map((activity) => ({
        ...activity,
        date: activity.date || "TBA",
        img:
          activity.img.length === 0 ? "assets/activities-bg.jpg" : activity.img,
      })),
    []
  );

  return (
    <section
      className="bg-black text-white px-8 py-16 scroll-mt-30"
      id="activities"
    >
      <div className="max-w-7xl mx-auto">
        <div className="md:hidden relative">
          <div className="flex flex-col mb-8 md:mb-12 justify-center items-center text-center">
            <h2 className="text-sm font-normal mb-4 flex items-center justify-center gap-x-2">
              <DotIcon color="white" /> STARTUPS
            </h2>
            <FadingText className="text-4xl sm:text-5xl font-normal">
              Qubit events
            </FadingText>
          </div>
          <Carousel
            items={activities}
            variant="slides"
            navigation="dots"
            // autoplay
            pageInterval={5000}
            navigationClassName="bg-white hover:bg-white/20"
            renderItem={({ item, index }) => {
              return (
                <div
                  className="flex flex-col gap-4 p-4 cursor-pointer group"
                  key={index}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-64 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-cyan-500 text-xs mb-1">
                      {DateUtils.formatDate(item.date)} •{" "}
                      {getLocationText(item)}
                    </div>

                    <h3 className="text-white text-lg font-normal mb-2 group-hover:text-cyan-500 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            }}
          />
          {activities.length > 3 && (
            <FillingAnimatedButton className="flex mt-6 mx-auto justify-center text-center w-1/2 min-w-fit">
              Explore all activities
            </FillingAnimatedButton>
          )}
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-8 h-[80vh]">
          <ActivityCard activity={activities[0]} featured />

          <div className="flex flex-col max-h-[80vh]">
            <div className="mb-8 md:mb-12">
              <h2 className="text-sm font-normal mb-4 flex justify-self-start items-center justify-center gap-x-2">
                <DotIcon color="white" /> STARTUPS
              </h2>
              <FadingText className="text-3xl sm:text-3xl md:text-5xl xl:text-6xl font-normal">
                Qubit events
              </FadingText>
            </div>
            <div className="space-y-2 flex-1 max-h-fit overflow-y-auto">
              {activities.slice(1).map((activity, index) => {
                return (
                  <div key={activity.id} className="relative">
                    <ActivityCard key={activity.id} activity={activity} />
                    {index !== activities.length - 2 && <Divider />}
                  </div>
                );
              })}
            </div>
            {activities.length > 3 && (
              <FillingAnimatedButton className="mt-6">
                Explore all activities
              </FillingAnimatedButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
