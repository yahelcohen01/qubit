import Link from "next/link";
import React from "react";
import { socials } from "@shared/lib";
import { NavItem } from "@shared/types";
import { CloseIcon } from "@shared/icons";

interface SidebarProps {
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
}

export const Sidebar = ({ setIsMobileMenuOpen, navItems }: SidebarProps) => {
  return (
    <div className="p-8 space-y-2 absolute bg-neutral-900 w-[80vw] min-h-screen left-0 top-0">
      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="cursor-pointer my-4"
      >
        <CloseIcon />
      </button>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block py-2 rounded-md text-base sm:text-xl md:text-2xl font-normal "
        >
          {item.label}
        </Link>
      ))}
      <div className="absolute bottom-0 mb-8 flex space-x-3">
        {socials.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-full text-base font-medium bg-neutral-800 p-3 items-center cursor-pointer"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};
