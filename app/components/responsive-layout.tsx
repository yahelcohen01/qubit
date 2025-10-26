"use client";
import React, { JSX } from "react";

type Breakpoint = "base" | "navbar" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ColumnsProp = Partial<Record<Breakpoint, number>> | number;

interface ResponsiveLayoutProps {
  columns?: ColumnsProp;
  gap?: string;
  className?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}

const BREAKPOINTS: Breakpoint[] = [
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "navbar",
];

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function columnsToClasses(columns?: ColumnsProp) {
  if (!columns) return "";

  // If a single number is provided, use grid-cols-{n} without breakpoint prefix
  if (typeof columns === "number") {
    const n = Math.min(Math.max(1, columns), 12);
    return `grid-cols-${n}`;
  }

  const classes: string[] = [];

  // Convert object like { sm:1, md:2, lg:4 } -> ["sm:grid-cols-1","md:grid-cols-2","lg:grid-cols-4"]
  for (const bp of BREAKPOINTS) {
    const val = columns[bp];
    if (val != null) {
      if (bp === "base") {
        const n = Math.min(Math.max(1, val), 12);
        classes.push(`grid-cols-${n}`);
        continue;
      }
      const n = Math.min(Math.max(1, val), 12);
      classes.push(`${bp}:grid-cols-${n}`);
    }
  }

  return classes.join(" ");
}

export function ResponsiveLayout({
  columns,
  gap = "gap-4",
  className,
  children,
  as = "div",
  id,
}: ResponsiveLayoutProps) {
  const Comp: any = as;
  const colsClass = columnsToClasses(columns);

  const classes = cn("grid", colsClass, gap, className);

  return (
    <Comp className={classes} id={id}>
      {children}
    </Comp>
  );
}
