import { ResponsiveLayout } from "../responsive-layout";

export const ActivitiesSection = () => {
  return (
    <section className="" id="activities">
      <ResponsiveLayout columns={{ base: 1, md: 2 }}>
        <div className="relative rounded-3xl flex flex-col items-end">
          <img
            src="/assets/activities-bg.png"
            alt="Activities"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className=""></div>
        </div>
      </ResponsiveLayout>
    </section>
  );
};
