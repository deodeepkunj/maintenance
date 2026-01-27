import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContactSection } from '@/components/contact-section';

describe('ContactSection', () => {
  const mockContactInfo = {
    email: 'support@example.com',
    phone: '+1-800-123-4567',
    supportUrl: 'https://support.example.com',
    slackChannel: '#support',
  };

  it('renders "Need Help?" heading', () => {
    render(<ContactSection contactInfo={mockContactInfo} />);

    expect(screen.getByText('Need Help?')).toBeInTheDocument();
  });

  it('renders email contact when provided', () => {
    render(<ContactSection contactInfo={mockContactInfo} />);

    const emailLink = screen.getByRole('link', {
      name: /support@example.com/i,
    });
    expect(emailLink).toHaveAttribute('href', 'mailto:support@example.com');
  });

  it('renders phone contact when provided', () => {
    render(<ContactSection contactInfo={mockContactInfo} />);

    const phoneLink = screen.getByRole('link', { name: /\+1-800-123-4567/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+1-800-123-4567');
  });

  it('renders support URL when provided', () => {
    render(<ContactSection contactInfo={mockContactInfo} />);

    const supportLink = screen.getByRole('link', {
      name: /Visit Support Portal/i,
    });
    expect(supportLink).toHaveAttribute('href', 'https://support.example.com');
    expect(supportLink).toHaveAttribute('target', '_blank');
    expect(supportLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders slack channel when provided', () => {
    render(<ContactSection contactInfo={mockContactInfo} />);

    expect(screen.getByText('#support')).toBeInTheDocument();
  });

  it('does not render email when not provided', () => {
    const contactInfo = { ...mockContactInfo };
    delete contactInfo.email;

    render(<ContactSection contactInfo={contactInfo} />);

    expect(
      screen.queryByRole('link', { name: /support@example.com/i })
    ).not.toBeInTheDocument();
  });

  it('does not render phone when not provided', () => {
    const contactInfo = { ...mockContactInfo };
    delete contactInfo.phone;

    render(<ContactSection contactInfo={contactInfo} />);

    expect(
      screen.queryByRole('link', { name: /\+1-800-123-4567/i })
    ).not.toBeInTheDocument();
  });

  it('renders partial contact info', () => {
    const minimalContactInfo = {
      email: 'help@example.com',
    };

    render(<ContactSection contactInfo={minimalContactInfo} />);

    expect(screen.getByRole('link', { name: /help@example.com/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Visit Support Portal/i }))
      .not.toBeInTheDocument();
  });

  it('has proper card styling', () => {
    const { container } = render(
      <ContactSection contactInfo={mockContactInfo} />
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv).toHaveClass('bg-card', 'border', 'border-border');
  });
});
