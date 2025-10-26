import { stats } from "@shared/lib";
import { Card } from "../card";
import { ResponsiveLayout } from "../responsive-layout";

export const Stats = () => {
  return (
    <ResponsiveLayout
      className="p-8 sm:p-12 md:p-16 gap-6 grid-cols-2 navbar:grid-cols-5 z-10 scroll-mt-30"
      as="div"
      id="stats"
    >
      {stats.map((stat) => (
        <Card
          key={stat.label}
          title={stat.value}
          content={stat.content}
          className={`${stat.className} z-10`}
        />
      ))}
    </ResponsiveLayout>
  );
};
