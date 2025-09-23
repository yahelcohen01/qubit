"use client";
import { useState } from "react";
import Link from "next/link";
import { FillingAnimatedButton } from "./filling-animated-button";
import { useMedia } from "react-use";
import { ConditionalDiv } from "./conditional-div";
import { Sidebar } from "./mobile/sidebar";
import Image from "next/image";

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
                // Close icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#fff"
                    d="M7.995 6.35 13.77.577l1.65 1.65-5.775 5.775 5.775 5.775-1.65 1.65L7.995 9.65 2.22 15.425l-1.65-1.65 5.775-5.774L.57 2.226 2.22.576z"
                  ></path>
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 28 28"
                >
                  <path
                    fill="#fff"
                    d="M24.5 4.668h-21v2.333h21zm-7 8.167h-14v2.333h14zm7 8.166h-21v2.334h21z"
                  ></path>
                </svg>
              )}
            </button>
          </ConditionalDiv>

          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/navbar-logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="hidden navbar:block object-contain"
            />
            <Image
              src="/assets/navbar-logo-mobile.png"
              alt="Logo"
              width={100}
              height={40}
              className="block navbar:hidden object-contain"
            />
          </Link>

          <ConditionalDiv condition={isMobile}>
            <button className="p-2 cursor-pointer">
              {/* support icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 28 28"
              >
                <g clipPath="url(#clip0_247_2659)">
                  <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    d="M5.544 11.363v-.291c0-4.35 3.787-7.875 8.459-7.875s8.458 3.525 8.458 7.875v.291m-8.458 11.542v.708c0 .645.522 1.167 1.166 1.167h2.334c2.9 0 5.25-2.35 5.25-5.25M4.96 11.363h1.75v7.584H4.96a1.75 1.75 0 0 1-1.75-1.75v-4.084c0-.966.783-1.75 1.75-1.75m16.333 0h1.75c.967 0 1.75.784 1.75 1.75v4.084a1.75 1.75 0 0 1-1.75 1.75h-1.75z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_247_2659">
                    <path fill="#fff" d="M0 0h28v28H0z"></path>
                  </clipPath>
                </defs>
              </svg>
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

        <ConditionalDiv condition={isMobileMenuOpen}>
          <Sidebar
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            navItems={navItems}
          />
        </ConditionalDiv>
      </div>
    </nav>
  );
};
