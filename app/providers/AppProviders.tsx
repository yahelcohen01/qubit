"use client";

import React from "react";
import { ThemeProvider } from "@context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
