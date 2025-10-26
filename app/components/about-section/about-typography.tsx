import { DotIcon } from "@shared/icons";

export const AboutTypography = () => {
  return (
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
        Our vision is bold yet clear: to make Israel a top-10 quantum nation and
        ensure it plays a central role in the coming quantum revolution.
      </p>
    </div>
  );
};
