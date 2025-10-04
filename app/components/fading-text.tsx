import { PropsWithChildren } from "react";
import { cn } from "@shared/lib";

export const FadingText = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <h1
      className={cn(
        "font-normal bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h1>
  );
};
