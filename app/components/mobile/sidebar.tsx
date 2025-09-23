import Link from "next/link";
import React from "react";

interface SidebarProps {
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: { label: string; href: string }[];
}

export const Sidebar = ({ setIsMobileMenuOpen, navItems }: SidebarProps) => {
  const socials = [
    {
      label: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="18"
          fill="none"
          viewBox="0 0 20 18"
        >
          {" "}
          <path
            fill="#fff"
            d="M4.938 2a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002m.06 3.48h-4V18h4zm6.32 0h-3.98V18h3.94v-6.57c0-3.66 4.77-4 4.77 0V18h3.95v-7.93c0-6.17-7.06-5.94-8.72-2.91z"
          ></path>{" "}
        </svg>
      ),
      href: "https://www.linkedin.com/company/qubit-quantum-tech/",
    },
    {
      label: "Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 22 22"
        >
          {" "}
          <path
            fill="#fff"
            d="M15.102 14.062H12.64v7.329a10.5 10.5 0 1 0-3.282 0v-7.329H6.68V11h2.68V8.539q.219-4.867 6.344-3.719v2.57h-1.422q-1.586.056-1.64 1.641V11h2.925"
          ></path>{" "}
        </svg>
      ),
      href: "https://www.facebook.com/QubitQuantum",
    },
    {
      label: "YouTube",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="16"
          fill="none"
          viewBox="0 0 20 16"
        >
          {" "}
          <path
            fill="#fff"
            d="M10.244 0c.534.003 1.87.016 3.29.073l.503.022c1.43.067 2.858.183 3.567.38.945.266 1.687 1.04 1.938 2.022.4 1.56.45 4.602.456 5.339l.001.152v.174c-.007.737-.057 3.78-.457 5.339-.254.985-.997 1.76-1.938 2.022-.709.197-2.137.313-3.566.38l-.504.022c-1.42.057-2.756.07-3.29.073l-.235.001h-.255c-1.13-.007-5.856-.058-7.36-.476C1.45 15.257.708 14.483.457 13.5c-.4-1.56-.45-4.602-.456-5.338v-.327c.006-.737.056-3.78.456-5.339.254-.985.997-1.76 1.939-2.021C3.898.056 8.625.005 9.755 0zM7.999 4.5v7L14 8z"
          ></path>{" "}
        </svg>
      ),
      href: "https://www.youtube.com/@QubitQuantum",
    },
    {
      label: "Whatsapp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          {" "}
          <path
            fill="#fff"
            fillOpacity="0.8"
            d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.95 9.95 0 0 1-5.03-1.355L.004 20l1.352-4.969A9.95 9.95 0 0 1 0 10C0 4.477 4.477 0 10 0M6.391 5.308a1 1 0 0 0-.371.1 1.3 1.3 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.73 2.73 0 0 0 4.9 7.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.45 9.45 0 0 0 3.84 2.046l.569.087c.185.01.37-.004.556-.013a2 2 0 0 0 .833-.231c.166-.088.244-.132.383-.22q.001.002.125-.09c.135-.1.218-.171.33-.288q.126-.13.21-.302c.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.402-.621a.5.5 0 0 0-.176-.041.48.48 0 0 0-.378.127c-.005-.002-.072.055-.795.931a.35.35 0 0 1-.368.13 1.4 1.4 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.108a6 6 0 0 1-1.575-1.003c-.126-.11-.243-.23-.363-.346a6.3 6.3 0 0 1-1.02-1.268l-.059-.095a1 1 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.357-.41c.108-.14.202-.276.262-.373.118-.19.155-.385.093-.536q-.42-1.026-.868-2.041c-.059-.134-.234-.23-.393-.249q-.081-.01-.162-.016a3 3 0 0 0-.403.004"
          ></path>{" "}
        </svg>
      ),
      href: "https://wa.me/972546666888",
    },
  ];
  return (
    <div className="p-8 space-y-2 absolute bg-neutral-900 w-[80vw] min-h-screen left-0 top-0 backdrop-blur-3xl">
      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="cursor-pointer my-4"
      >
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
            className="block rounded-full text-base font-medium bg-neutral-800 p-3 items-center"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};
