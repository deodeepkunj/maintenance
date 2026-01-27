'use client';

import { useEffect, useState } from 'react';

export interface CountdownState {
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

/**
 * Hook to manage countdown timer
 * @param initialMinutes - Initial countdown duration in minutes
 * @returns Current countdown state with minutes and seconds
 */
export function useCountdown(initialMinutes: number): CountdownState {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isComplete]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { minutes, seconds, isComplete };
}
