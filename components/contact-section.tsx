import React from 'react';

interface ContactInfo {
  email?: string;
  phone?: string;
  supportUrl?: string;
  slackChannel?: string;
}

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

/**
 * Displays support contact information during maintenance
 */
export function ContactSection({ contactInfo }: ContactSectionProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Need Help?
      </h3>
      <div className="space-y-3 text-sm">
        {contactInfo.email && (
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">Email:</span>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-primary hover:underline font-medium"
            >
              {contactInfo.email}
            </a>
          </div>
        )}
        {contactInfo.phone && (
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">Phone:</span>
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-primary hover:underline font-medium"
            >
              {contactInfo.phone}
            </a>
          </div>
        )}
        {contactInfo.supportUrl && (
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">Support:</span>
            <a
              href={contactInfo.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Visit Support Portal
            </a>
          </div>
        )}
        {contactInfo.slackChannel && (
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">Slack:</span>
            <span className="font-medium text-foreground">
              {contactInfo.slackChannel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
