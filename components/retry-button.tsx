'use client';

import React, { useState } from 'react';
import { LoadingSpinner } from './loading-spinner';

interface RetryButtonProps {
  onRetry: () => void | Promise<void>;
  disabled?: boolean;
  className?: string;
}

/**
 * Button that allows users to retry accessing the site
 */
export function RetryButton({
  onRetry,
  disabled = false,
  className = '',
}: RetryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await Promise.resolve(onRetry());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-3
        bg-primary text-primary-foreground font-medium rounded-lg
        hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
        transition-opacity duration-200
        ${className}
      `}
      aria-label="Retry accessing the site"
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="small" />
          <span>Checking...</span>
        </>
      ) : (
        'Retry Now'
      )}
    </button>
  );
}
