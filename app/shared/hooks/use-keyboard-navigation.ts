import { useEffect } from "react";

// app/shared/hooks/useKeyboardNavigation.ts
export function useKeyboardNavigation({
  onLeft,
  onRight,
  onEnter,
  onEscape,
  enabled = true,
}: {
  onLeft?: () => void;
  onRight?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          onLeft?.();
          break;
        case "ArrowRight":
          onRight?.();
          break;
        case "Enter":
          onEnter?.();
          break;
        case "Escape":
          onEscape?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onLeft, onRight, onEnter, onEscape, enabled]);
}
