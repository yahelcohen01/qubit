import Image from "next/image";

export const InnovationSection = () => {
  return (
    <section
      className="relative w-full py-16 mt-16 px-4 md:px-16 lg:px-24 xl:px-32 scroll-mt-30"
      id="innovation"
    >
      <div className="w-full">
        <Image
          src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/innovation-text.png"
          alt="Innovation-text"
          width={1200}
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="w-full">
        <Image
          src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/innovation-processor.png"
          alt="Innovation"
          width={1200}
          height={600}
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};
