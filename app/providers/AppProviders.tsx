"use client";

import React from "react";
import { ThemeProvider } from "@/app/context";
import { CommunityWelcomeModal } from "@/app/components/community-welcome-modal";
import { useFirstVisit } from "@shared/hooks";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { isFirstVisit, isLoading, markAsVisited } = useFirstVisit();

  const handleCloseWelcomeModal = () => {
    markAsVisited();
  };

  return (
    <ThemeProvider>
      {children}
      {!isLoading && (
        <CommunityWelcomeModal
          isOpen={isFirstVisit}
          onClose={handleCloseWelcomeModal}
          forbiddenUrlGroups={["/legal"]}
        />
      )}
    </ThemeProvider>
  );
}
