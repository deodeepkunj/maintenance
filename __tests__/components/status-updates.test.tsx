import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusUpdates } from '@/components/status-updates';

describe('StatusUpdates', () => {
  const mockUpdates = [
    {
      timestamp: new Date('2024-01-01T10:00:00'),
      message: 'Deployment started',
      type: 'info' as const,
    },
    {
      timestamp: new Date('2024-01-01T10:05:00'),
      message: 'Database migration in progress',
      type: 'progress' as const,
    },
    {
      timestamp: new Date('2024-01-01T10:10:00'),
      message: 'Configuration error detected',
      type: 'warning' as const,
    },
  ];

  it('renders update messages', () => {
    render(<StatusUpdates updates={mockUpdates} />);

    expect(screen.getByText('Deployment started')).toBeInTheDocument();
    expect(screen.getByText('Database migration in progress')).toBeInTheDocument();
    expect(screen.getByText('Configuration error detected')).toBeInTheDocument();
  });

  it('displays "Recent Updates" heading', () => {
    render(<StatusUpdates updates={mockUpdates} />);

    expect(screen.getByText('Recent Updates')).toBeInTheDocument();
  });

  it('limits visible updates by maxVisible prop', () => {
    render(<StatusUpdates updates={mockUpdates} maxVisible={2} />);

    expect(screen.getByText('Deployment started')).toBeInTheDocument();
    expect(screen.getByText('Database migration in progress')).toBeInTheDocument();
    expect(
      screen.queryByText('Configuration error detected')
    ).not.toBeInTheDocument();
  });

  it('shows empty state message when no updates', () => {
    render(<StatusUpdates updates={[]} />);

    expect(
      screen.getByText('No updates yet. Please check back soon.')
    ).toBeInTheDocument();
  });

  it('renders timestamps correctly', () => {
    render(<StatusUpdates updates={mockUpdates} />);

    // Timestamps should be visible (formatted as time strings)
    const statusElements = screen.getAllByRole('status');
    expect(statusElements.length).toBe(3);
  });

  it('applies correct styling based on update type', () => {
    const { container } = render(<StatusUpdates updates={mockUpdates} />);

    const statusDivs = container.querySelectorAll('[role="status"]');
    expect(statusDivs[0]).toHaveClass('bg-blue-50', 'dark:bg-blue-950');
    expect(statusDivs[1]).toHaveClass('bg-amber-50', 'dark:bg-amber-950');
    expect(statusDivs[2]).toHaveClass('bg-red-50', 'dark:bg-red-950');
  });

  it('defaults maxVisible to 3', () => {
    const manyUpdates = Array.from({ length: 5 }, (_, i) => ({
      timestamp: new Date(),
      message: `Update ${i}`,
      type: 'info' as const,
    }));

    render(<StatusUpdates updates={manyUpdates} />);

    expect(screen.getByText('Update 0')).toBeInTheDocument();
    expect(screen.getByText('Update 1')).toBeInTheDocument();
    expect(screen.getByText('Update 2')).toBeInTheDocument();
    expect(screen.queryByText('Update 3')).not.toBeInTheDocument();
    expect(screen.queryByText('Update 4')).not.toBeInTheDocument();
  });
});
