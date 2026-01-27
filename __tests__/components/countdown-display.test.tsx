import React from 'react';
import { render, screen } from '@testing-library/react';
import { CountdownDisplay } from '@/components/countdown-display';

describe('CountdownDisplay', () => {
  it('displays formatted time correctly', () => {
    render(
      <CountdownDisplay minutes={5} seconds={30} isComplete={false} />
    );

    const timeDisplay = screen.getByRole('status');
    expect(timeDisplay).toHaveTextContent('05:30');
  });

  it('pads single digit values', () => {
    render(
      <CountdownDisplay minutes={0} seconds={5} isComplete={false} />
    );

    const timeDisplay = screen.getByRole('status');
    expect(timeDisplay).toHaveTextContent('00:05');
  });

  it('displays "Estimated downtime:" when not complete', () => {
    render(
      <CountdownDisplay minutes={10} seconds={0} isComplete={false} />
    );

    expect(screen.getByText('Estimated downtime:')).toBeInTheDocument();
  });

  it('displays "Checking service status..." when complete', () => {
    render(
      <CountdownDisplay minutes={0} seconds={0} isComplete={true} />
    );

    expect(screen.getByText('Checking service status...')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(
      <CountdownDisplay minutes={2} seconds={45} isComplete={false} />
    );

    const timeDisplay = screen.getByRole('status');
    expect(timeDisplay).toHaveAttribute(
      'aria-label',
      '2 minutes 45 seconds remaining'
    );
    expect(timeDisplay).toHaveAttribute('aria-live', 'polite');
  });

  it('updates accessibility label when complete', () => {
    const { rerender } = render(
      <CountdownDisplay minutes={0} seconds={30} isComplete={false} />
    );

    rerender(
      <CountdownDisplay minutes={0} seconds={0} isComplete={true} />
    );

    const timeDisplay = screen.getByRole('status');
    expect(timeDisplay).toHaveAttribute(
      'aria-label',
      '0 minutes 0 seconds remaining'
    );
  });
});
