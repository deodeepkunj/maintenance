'use client';

import { useEffect, useState } from 'react';

export interface MaintenanceState {
  isUnderMaintenance: boolean;
  expectedDowntimeMinutes: number;
  statusMessage: string;
  lastChecked: Date | null;
}

const DEFAULT_MAINTENANCE_STATE: MaintenanceState = {
  isUnderMaintenance: false,
  expectedDowntimeMinutes: 15,
  statusMessage: 'We are currently updating our systems. Please check back soon.',
  lastChecked: null,
};

/**
 * Hook to check maintenance mode status
 * Supports multiple trigger mechanisms:
 * - MAINTENANCE_MODE env var (boolean)
 * - MAINTENANCE_API_URL for polling
 * - Server-side checks via RSC
 */
export function useMaintenanceMode(): MaintenanceState {
  const [maintenanceState, setMaintenanceState] = useState<MaintenanceState>(
    DEFAULT_MAINTENANCE_STATE
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMaintenanceStatus = async () => {
      try {
        // Check environment variable first
        const envMaintenanceMode =
          process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

        if (envMaintenanceMode) {
          setMaintenanceState((prev) => ({
            ...prev,
            isUnderMaintenance: true,
            expectedDowntimeMinutes:
              parseInt(
                process.env.NEXT_PUBLIC_MAINTENANCE_DURATION || '15',
                10
              ) || 15,
            lastChecked: new Date(),
          }));
          setIsLoading(false);
          return;
        }

        // Check API endpoint if configured
        const apiUrl = process.env.NEXT_PUBLIC_MAINTENANCE_API_URL;
        if (apiUrl) {
          const response = await fetch(apiUrl, { cache: 'no-store' });
          if (response.ok) {
            const data = await response.json();
            setMaintenanceState({
              isUnderMaintenance: data.isUnderMaintenance || false,
              expectedDowntimeMinutes: data.expectedDowntimeMinutes || 15,
              statusMessage:
                data.statusMessage ||
                DEFAULT_MAINTENANCE_STATE.statusMessage,
              lastChecked: new Date(),
            });
          }
        }
      } catch (error) {
        console.error('Failed to check maintenance status:', error);
        // Fail open - don't block user access if check fails
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenanceStatus();
  }, []);

  return maintenanceState;
}
