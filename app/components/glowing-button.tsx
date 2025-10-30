"use client";
import Link from "next/link";
import { cn } from "@shared/lib";

export const GlowingButton = ({
  children,
  className,
  link,
  color = "#f1f1f1",
  icon,
}: {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  link?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Link
      href={link || ""}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex underline items-center gap-1 font-poppins",
        className
      )}
    >
      <div
        className="my-auto justify-self-end p-3 rounded-full relative"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 15px ${color}`,
        }}
      >
        {icon}
      </div>
      {children}
    </Link>
  );
};
