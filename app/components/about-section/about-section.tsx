import { DotIcon } from "@shared/icons";
import { Card } from "../card";
import { ResponsiveLayout } from "../responsive-layout";
import { stats } from "@shared/lib";
import Image from "next/image";

export const AboutSection = () => {
  return (
    <section className="bg-gray-bg h-auto relative rounded-b-3xl" id="about">
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

      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 h-full">
        <Image
          src="/assets/left-side-illustration.png"
          alt="bg"
          width={220}
          height={220}
          className="w-auto h-auto max-h-full object-contain"
        />
      </div>
      {/* <div className="absolute right-0 top-1/3 -translate-y-1/2 pointer-events-none z-0 h-max">
        <Image
          src="/assets/right-side-illustration-3.png"
          alt="bg-2"
          width={350}
          height={350}
          className="w-auto h-auto max-h-full object-contain"
        />
      </div> */}

      {/* about */}
      <div className="max-w-5xl mx-auto px-6 lg:px-4 py-16 text-center z-10">
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
    </section>
  );
};
