"use client";
import { useState } from "react";
import Link from "next/link";
import { useMedia } from "react-use";
import { ConditionalDiv } from "./conditional-div";
import { Sidebar } from "./mobile/sidebar";
import Image from "next/image";
import { navItems } from "@shared/lib";
import { MenuIcon } from "@shared/icons";
import { usePathname } from "next/navigation";
import { PulseButton } from "./pulse-button";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMobile = useMedia(`(max-width: 1110px)`);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null; // Do not render the navbar on admin routes
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black ">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-[110px] relative">
          <Link
            href="/"
            className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/navbar-logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="hidden navbar:block object-contain"
            />
            <Image
              src="https://t9rksicsjw7jr1ld.public.blob.vercel-storage.com/qubit-images/navbar-logo-mobile.png"
              alt="Logo"
              width={100}
              height={40}
              className="block navbar:hidden object-contain"
            />
          </Link>

          <ConditionalDiv condition={isMobile}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 cursor-pointer"
            >
              <MenuIcon />
            </button>
          </ConditionalDiv>

          {/* <ConditionalDiv condition={isMobile}>
            <button
              className="p-2 cursor-pointer"
              onClick={() => (window.location.href = "#contact")}
            >
              <HeadsetIcon />
            </button>
            <PulseButton
              childrenClassName="font-normal text-lg"
              onClick={() => (window.location.href = "#contact")}
            >
              JOIN US
            </PulseButton>
          </ConditionalDiv> */}

          <div className="hidden navbar:flex items-center space-x-8 font-medium">
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

          <div className="flex items-center space-x-4">
            <PulseButton
              childrenClassName="font-normal text-lg"
              onClick={() => (window.location.href = "#contact")}
            >
              JOIN US
            </PulseButton>
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
