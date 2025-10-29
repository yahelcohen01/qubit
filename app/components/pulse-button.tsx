import React from "react";

import { cn } from "@shared/lib";

interface PulseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
  childrenClassName?: string;
  size?: "sm" | "md" | "lg";
}

export const PulseButton = React.forwardRef<
  HTMLButtonElement,
  PulseButtonProps
>(
  (
    {
      className,
      children,
      pulseColor = "#a1a1a1",
      duration = "1.5s",
      childrenClassName,
      size = "md",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "bg-neutral-200 border-1 border-white text-black relative flex cursor-pointer items-center justify-center rounded-lg text-center",
          sizeClasses[size],
          className
        )}
        style={
          {
            "--pulse-color": pulseColor,
            "--duration": duration,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={cn("relative z-10", childrenClassName)}>{children}</div>
        <div className="absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" />
      </button>
    );
  }
);

PulseButton.displayName = "PulseButton";
