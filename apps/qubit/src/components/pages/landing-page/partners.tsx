import Amiti from '../../../../public/amiti.png';
import F2 from '../../../../public/f2.png';

export const Partners = () => {
  return (
    <div className="flex flex-col bg-transparent justify-start gap-6 w-full">
      <h1 className="font-semibold text-4xl">Our Contributors</h1>
      <hr className="border-2" />
      <div className="flex flex-row gap-14 justify-center items-center">
        <a
          target="_blank"
          href="https://amiti.vc/"
          aria-label="Amiti"
          rel="noreferrer"
        >
          <img src={Amiti} alt="Amiti" className="h-30" />
        </a>
        <a
          target="_blank"
          href="https://www.f2vc.com/"
          aria-label="F2"
          rel="noreferrer"
        >
          <img src={F2} alt="F2" className="h-30" />
        </a>
      </div>
    </div>
  );
};
