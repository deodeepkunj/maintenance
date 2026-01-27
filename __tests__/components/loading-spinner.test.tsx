import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '@/components/loading-spinner';

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-12 h-12');
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="small" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-6 h-6');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="large" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-16 h-16');
  });

  it('has appropriate accessibility attributes', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
  });

  it('contains SVG element', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
