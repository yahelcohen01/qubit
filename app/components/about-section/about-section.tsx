import { DotIcon } from "@shared/icons";
import { Card } from "../card";
import { ResponsiveLayout } from "../responsive-layout";
import { stats } from "@shared/lib";

export const AboutSection = () => {
  return (
    <section className="bg-gray-bg rounded-b-3xl" id="about">
      {/* stats */}
      <ResponsiveLayout className="p-16 gap-6 grid-cols-2 navbar:grid-cols-5">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            title={stat.value}
            content={stat.content}
            className={stat.className}
          />
        ))}
      </ResponsiveLayout>

      {/* about */}
      <div className="max-w-5xl mx-auto px-6 lg:px-4 py-16 text-center">
        <h2 className="text-sm font-normal mb-4 text-black flex items-center justify-center gap-x-2">
          <DotIcon /> ABOUT US
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-black/50 max-w-4xl mx-auto font-poppins">
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
    </section>
  );
};
