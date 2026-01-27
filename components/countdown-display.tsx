'use client';

import React from 'react';

interface CountdownDisplayProps {
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

/**
 * Displays countdown timer in MM:SS format
 */
export function CountdownDisplay({
  minutes,
  seconds,
  isComplete,
}: CountdownDisplayProps) {
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-muted-foreground mb-2">
        {isComplete ? 'Checking service status...' : 'Estimated downtime:'}
      </p>
      <div
        className="font-mono text-4xl font-bold text-primary tracking-wider"
        role="status"
        aria-live="polite"
        aria-label={`${minutes} minutes ${seconds} seconds remaining`}
      >
        {formattedTime}
      </div>
    </div>
  );
}
