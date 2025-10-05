import Link from "next/link";
import { DotIcon } from "../shared/icons";
import { Divider } from "./divider";
import { navItems, socials } from "@shared/lib";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 py-16">
      <div className="w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2 justify-start md:justify-center items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-medium">Who we are</h3>
          <p className="text-sm text-white/50 font-poppins">
            Qubit IL is Israel’s quantum community, connecting researchers,
            industry, and policymakers to advance quantum technologies.
          </p>
          <div className="flex flex-col">
            <p className="text-sm text-white/50">Follow us:</p>
            <div className="flex space-x-3 mt-2">
              {socials.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-full text-base font-medium bg-gray-700/50 p-3 items-center cursor-pointer"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-around md:justify-center">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-medium">General</h3>
            {navItems.map((item) => (
              <button
                key={item.href}
                className="inline-flex items-center gap-x-1 text-sm/6 font-semibold"
              >
                <a
                  href={item.href}
                  className="text-base font-normal text-white/50 line-clamp-1 text-left fancy-link"
                >
                  {item.label}
                </a>
              </button>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-medium line-clamp-1">Contact Us</h3>
            <p className="text-sm text-white/50 font-poppins underline cursor-pointer">
              Email Us
            </p>
            <p className="text-sm text-white/50 font-poppins underline cursor-pointer">
              Message Us
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          <Divider />
        </div>
        <div className="flex">
          <p className="text-sm text-white/50 py-8">
            © {new Date().getFullYear()} all rights reserved QUBIT IL
          </p>
          <DotIcon color="white" className="size-1 my-auto mx-4" />
          <p className="text-sm text-white/50 py-8">Privacy Policy</p>
          <DotIcon color="white" className="size-1 my-auto mx-4" />
          <p className="text-sm text-white/50 py-8">Terms of Use</p>
        </div>
      </div>
    </footer>
  );
};
