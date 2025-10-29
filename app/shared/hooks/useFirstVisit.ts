"use client";

import { useEffect, useState } from "react";

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsFirstVisit(true);
    setIsLoading(false);
  }, []);

  const markAsVisited = () => {
    setIsFirstVisit(false);
  };

  return {
    isFirstVisit,
    isLoading,
    markAsVisited,
  };
}
