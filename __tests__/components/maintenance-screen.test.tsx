'use client';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MaintenanceScreen } from '@/components/maintenance-screen';
import jest from 'jest';

// Mock the child components to simplify testing
jest.mock('@/components/loading-spinner', () => ({
  LoadingSpinner: () => <div data-testid="spinner">Spinner</div>,
}));

jest.mock('@/components/countdown-display', () => ({
  CountdownDisplay: ({ minutes, seconds }: { minutes: number; seconds: number }) => (
    <div data-testid="countdown">
      {minutes}:{seconds}
    </div>
  ),
}));

jest.mock('@/components/status-updates', () => ({
  StatusUpdates: () => <div data-testid="updates">Updates</div>,
}));

jest.mock('@/components/contact-section', () => ({
  ContactSection: () => <div data-testid="contact">Contact</div>,
}));

jest.mock('@/components/retry-button', () => ({
  RetryButton: ({ onRetry }: { onRetry: () => void }) => (
    <button data-testid="retry" onClick={onRetry}>
      Retry
    </button>
  ),
}));

describe('MaintenanceScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders main title', () => {
    render(<MaintenanceScreen />);

    expect(screen.getByText('Scheduled Maintenance')).toBeInTheDocument();
  });

  it('renders custom title when provided', () => {
    render(
      <MaintenanceScreen title="Emergency Maintenance" />
    );

    expect(screen.getByText('Emergency Maintenance')).toBeInTheDocument();
  });

  it('renders description', () => {
    const description =
      'We are currently updating our systems to improve your experience. Thank you for your patience!';
    render(<MaintenanceScreen description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders custom description when provided', () => {
    const customDescription = 'Custom maintenance message';
    render(
      <MaintenanceScreen description={customDescription} />
    );

    expect(screen.getByText(customDescription)).toBeInTheDocument();
  });

  it('renders all child components', () => {
    render(<MaintenanceScreen />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('countdown')).toBeInTheDocument();
    expect(screen.getByTestId('updates')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('retry')).toBeInTheDocument();
  });

  it('renders apology message in footer', () => {
    render(<MaintenanceScreen />);

    expect(
      screen.getByText(
        /We apologize for any inconvenience/i
      )
    ).toBeInTheDocument();
  });

  it('accepts custom contact information', () => {
    const contactEmail = 'custom@example.com';
    const contactPhone = '555-1234';

    render(
      <MaintenanceScreen
        contactEmail={contactEmail}
        contactPhone={contactPhone}
      />
    );

    // Contact section is mocked, but props are passed
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  it('accepts custom downtime duration', () => {
    render(<MaintenanceScreen expectedDowntimeMinutes={30} />);

    // Countdown display would show 30 minutes
    expect(screen.getByTestId('countdown')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const mockRetry = jest.fn();
    render(<MaintenanceScreen onRetry={mockRetry} />);

    const retryButton = screen.getByTestId('retry');
    retryButton.click();

    expect(mockRetry).toHaveBeenCalled();
  });

  it('renders with proper responsive layout', () => {
    const { container } = render(<MaintenanceScreen />);

    const mainContainer = container.querySelector('.min-h-screen');
    expect(mainContainer).toHaveClass(
      'min-h-screen',
      'flex',
      'items-center',
      'justify-center'
    );
  });

  it('has proper semantic structure', () => {
    const { container } = render(<MaintenanceScreen />);

    const heading = screen.getByRole('heading', {
      name: /Scheduled Maintenance/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  it('includes last checked timestamp in footer', () => {
    render(<MaintenanceScreen />);

    expect(screen.getByText(/Last checked:/i)).toBeInTheDocument();
  });
});
