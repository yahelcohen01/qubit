"use client";
import { useState } from "react";
import Link from "next/link";
import { FillingAnimatedButton } from "./filling-animated-button";
import {
  Menu as MenuIcon,
  X as XIcon,
  Headset as HeadsetIcon,
} from "lucide-react";
import { useMedia } from "react-use";
import { ConditionalDiv } from "./conditional-div";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMobile = useMedia(`(max-width: 1110px)`);

  const navItems = [
    { label: "Israel in Quantum Tech", href: "/" },
    { label: "Who's Who", href: "#who" },
    { label: "Activities", href: "#activities" },
    { label: "Career", href: "#career" },
    { label: "About", href: "#about" },
    { label: "Content hub", href: "#content-hub" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black ">
      <div className="max-w-[1624px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-[110px]">
          <ConditionalDiv condition={isMobile}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </ConditionalDiv>

          {isMobile ? (
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/assets/navbar-logo-mobile.png"
                alt="Logo"
                className="size-max object-contain"
              />
            </Link>
          ) : (
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/assets/navbar-logo.png"
                alt="Logo"
                className="size-max object-contain"
              />
            </Link>
          )}

          <ConditionalDiv condition={isMobile}>
            <button className="p-2 cursor-pointer">
              <HeadsetIcon className="h-6 w-6" />
            </button>
          </ConditionalDiv>

          <div className="hidden navbar:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                className="inline-flex items-center gap-x-1 text-sm/6 font-semibold"
              >
                <a
                  href={item.href}
                  className="block text-base font-normal fancy-link"
                >
                  {item.label}
                </a>
              </button>
            ))}
          </div>

          <div className="hidden navbar:flex items-center space-x-4">
            <FillingAnimatedButton className="font-normal" size="lg">
              Contact Us
            </FillingAnimatedButton>
          </div>
        </div>

        <ConditionalDiv
          condition={isMobileMenuOpen}
          className="border-t border-gray-200 bg-white/95 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                    
                  `}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>
        </ConditionalDiv>
      </div>
    </nav>
  );
};
