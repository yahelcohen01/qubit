import { useEffect, useRef } from "react";

export function useInterval({
  callback,
  delay,
  enabled = true,
}: {
  callback: () => void;
  delay: number | null;
  enabled?: boolean;
}) {
  const savedCallback = useRef<() => void>(() => {});

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled || delay === null) return;

    function tick() {
      savedCallback.current?.();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, enabled]);
}
