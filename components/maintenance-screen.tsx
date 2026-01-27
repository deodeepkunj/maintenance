'use client';

import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './loading-spinner';
import { CountdownDisplay } from './countdown-display';
import { StatusUpdates } from './status-updates';
import { ContactSection } from './contact-section';
import { RetryButton } from './retry-button';
import { useCountdown } from '@/hooks/use-countdown';

interface StatusUpdate {
  timestamp: Date;
  message: string;
  type: 'info' | 'progress' | 'warning';
}

interface MaintenanceScreenProps {
  title?: string;
  description?: string;
  expectedDowntimeMinutes?: number;
  contactEmail?: string;
  contactPhone?: string;
  supportUrl?: string;
  slackChannel?: string;
  onRetry?: () => void | Promise<void>;
}

/**
 * Main maintenance screen component
 * Displays downtime information, countdown, status updates, and contact info
 */
export function MaintenanceScreen({
  title = 'Scheduled Maintenance',
  description = 'We are currently updating our systems to improve your experience. Thank you for your patience!',
  expectedDowntimeMinutes = 15,
  contactEmail = 'support@example.com',
  contactPhone,
  supportUrl,
  slackChannel,
  onRetry,
}: MaintenanceScreenProps) {
  const { minutes, seconds, isComplete } = useCountdown(
    expectedDowntimeMinutes
  );
  const [updates, setUpdates] = useState<StatusUpdate[]>([
    {
      timestamp: new Date(),
      message: 'Maintenance started - deploying new version',
      type: 'progress',
    },
    {
      timestamp: new Date(Date.now() - 60000),
      message: 'Database migration in progress',
      type: 'info',
    },
  ]);

  useEffect(() => {
    // Simulate periodic status updates
    const interval = setInterval(() => {
      const messages = [
        'Configuring load balancers',
        'Running health checks',
        'Validating deployment',
        'Updating DNS records',
        'Finalizing configuration',
      ];
      const types: Array<'info' | 'progress' | 'warning'> = [
        'info',
        'progress',
        'info',
      ];

      const newUpdate: StatusUpdate = {
        timestamp: new Date(),
        message: messages[Math.floor(Math.random() * messages.length)],
        type: types[Math.floor(Math.random() * types.length)],
      };

      setUpdates((prev) => [newUpdate, ...prev]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRetry = async () => {
    if (onRetry) {
      await onRetry();
    } else {
      // Default retry behavior: reload page
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Content Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <LoadingSpinner size="large" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {description}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Countdown Section */}
          <div className="space-y-6">
            <CountdownDisplay
              minutes={minutes}
              seconds={seconds}
              isComplete={isComplete}
            />

            {/* Retry Button */}
            <div className="flex justify-center">
              <RetryButton onRetry={handleRetry} />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Status Updates and Contact Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <StatusUpdates updates={updates} />
            <ContactSection
              contactInfo={{
                email: contactEmail,
                phone: contactPhone,
                supportUrl,
                slackChannel,
              }}
            />
          </div>

          {/* Footer Info */}
          <div className="bg-secondary/50 rounded-lg p-4 text-center text-sm text-muted-foreground space-y-2">
            <p>
              We apologize for any inconvenience. Our team is working to restore
              service as quickly as possible.
            </p>
            <p className="text-xs">
              Last checked: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
