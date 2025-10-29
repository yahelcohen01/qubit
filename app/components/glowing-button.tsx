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
        className={cn(
          "my-auto justify-self-end p-3 rounded-full relative",
          `bg-[${color}] shadow-[0_0_15px_${color}]`
        )}
      >
        {icon}
      </div>
      {children}
    </Link>
  );
};

/*
WhatsApp
        <ExternalLinkIcon className="size-3" />
        <WhatsappIcon className="size-4 text-black" />
*/
