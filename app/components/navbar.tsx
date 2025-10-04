"use client";
import { useState } from "react";
import Link from "next/link";
import { FillingAnimatedButton } from "./filling-animated-button";
import { useMedia } from "react-use";
import { ConditionalDiv } from "./conditional-div";
import { Sidebar } from "./mobile/sidebar";
import Image from "next/image";
import { navItems } from "@shared/lib";
import { HeadsetIcon, MenuIcon } from "@shared/icons";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMobile = useMedia(`(max-width: 1110px)`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black ">
      <div className="max-w-[1624px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-[110px]">
          <ConditionalDiv condition={isMobile}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 cursor-pointer"
            >
              <MenuIcon />
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
              <HeadsetIcon />
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
            <FillingAnimatedButton
              className="font-normal"
              size="lg"
              onClick={() => (window.location.href = "#contact")}
            >
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
