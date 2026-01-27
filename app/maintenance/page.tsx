import { MaintenanceScreen } from '@/components/maintenance-screen';

export const metadata = {
  title: 'Scheduled Maintenance - Service Unavailable',
  description:
    'Our service is currently under maintenance. We will be back online shortly.',
  robots: 'noindex, nofollow',
};

export default function MaintenancePage() {
  return (
    <MaintenanceScreen
      title="Scheduled Maintenance"
      description="We are currently updating our systems to improve your experience. Thank you for your patience!"
      expectedDowntimeMinutes={parseInt(
        process.env.NEXT_PUBLIC_MAINTENANCE_DURATION || '15',
        10
      )}
      contactEmail={process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com'}
      contactPhone={process.env.NEXT_PUBLIC_SUPPORT_PHONE}
      supportUrl={process.env.NEXT_PUBLIC_SUPPORT_URL}
      slackChannel={process.env.NEXT_PUBLIC_SLACK_CHANNEL}
    />
  );
}
