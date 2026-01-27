import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RetryButton } from '@/components/retry-button';
import jest from 'jest'; // Importing jest to declare the variable

describe('RetryButton', () => {
  it('renders button with "Retry Now" text', () => {
    const mockRetry = jest.fn();
    render(<RetryButton onRetry={mockRetry} />);

    expect(screen.getByText('Retry Now')).toBeInTheDocument();
  });

  it('calls onRetry when clicked', async () => {
    const mockRetry = jest.fn();
    render(<RetryButton onRetry={mockRetry} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });

  it('shows loading state while executing', async () => {
    const mockRetry = jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 100);
        })
    );
    render(<RetryButton onRetry={mockRetry} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Checking...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Retry Now')).toBeInTheDocument();
    });
  });

  it('is disabled while loading', async () => {
    const mockRetry = jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 100);
        })
    );
    render(<RetryButton onRetry={mockRetry} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it('accepts disabled prop', () => {
    const mockRetry = jest.fn();
    render(<RetryButton onRetry={mockRetry} disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('has correct accessibility attributes', () => {
    const mockRetry = jest.fn();
    render(<RetryButton onRetry={mockRetry} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Retry accessing the site');
  });

  it('applies custom className', () => {
    const mockRetry = jest.fn();
    const { container } = render(
      <RetryButton onRetry={mockRetry} className="custom-class" />
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('handles async onRetry function', async () => {
    const asyncRetry = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    render(<RetryButton onRetry={asyncRetry} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Checking...')).toBeInTheDocument();

    await waitFor(() => {
      expect(asyncRetry).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Retry Now')).toBeInTheDocument();
    });
  });

  it('renders loading spinner while executing', async () => {
    const mockRetry = jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 100);
        })
    );
    render(<RetryButton onRetry={mockRetry} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });
});
