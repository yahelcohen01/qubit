import Image from "next/image";

export const InnovationSection = () => {
  return (
    <section
      className="relative w-full py-16 mt-16 px-4 md:px-16 lg:px-24 xl:px-32 scroll-mt-30"
      id="innovation"
    >
      <div className="relative w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto">
          <Image
            src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/innovation-text.png"
            alt="Innovation-text"
            width={1200}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full max-w-6xl mx-auto -mt-8 md:-mt-16 lg:-mt-24">
          <Image
            src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/qpu.png"
            alt="Innovation"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};
