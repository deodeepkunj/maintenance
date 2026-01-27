import React from 'react';

interface StatusUpdate {
  timestamp: Date;
  message: string;
  type: 'info' | 'progress' | 'warning';
}

interface StatusUpdatesProps {
  updates: StatusUpdate[];
  maxVisible?: number;
}

/**
 * Displays recent maintenance status updates
 */
export function StatusUpdates({
  updates,
  maxVisible = 3,
}: StatusUpdatesProps) {
  const visibleUpdates = updates.slice(0, maxVisible);

  const typeStyles = {
    info: 'bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500',
    progress:
      'bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-100 border-l-4 border-amber-500',
    warning:
      'bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100 border-l-4 border-red-500',
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Recent Updates</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {visibleUpdates.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No updates yet. Please check back soon.
          </p>
        ) : (
          visibleUpdates.map((update, index) => (
            <div
              key={index}
              className={`p-3 rounded-md text-sm ${typeStyles[update.type]}`}
              role="status"
            >
              <div className="flex justify-between items-start gap-2">
                <span>{update.message}</span>
                <span className="text-xs opacity-75 whitespace-nowrap">
                  {update.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
