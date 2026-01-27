import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Service Platform
          </h1>
          <div className="flex gap-4">
            <Link href="#features" className="text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/maintenance" className="text-muted-foreground hover:text-foreground">
              Demo Maintenance
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
            Professional Maintenance Screen
          </h2>
          <p className="text-xl text-muted-foreground">
            Keep your users informed during deployments with a beautiful,
            responsive maintenance page featuring real-time status updates and
            countdown timers.
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Link href="/maintenance">
              <Button size="lg">View Maintenance Screen</Button>
            </Link>
            <a href="#docs">
              <Button size="lg" variant="outline">
                Documentation
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-card border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground text-center mb-16">
            Key Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">
                Real-time Countdown
              </h4>
              <p className="text-muted-foreground">
                Displays accurate estimated downtime to set user expectations.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">
                Status Updates
              </h4>
              <p className="text-muted-foreground">
                Real-time progress updates keep users informed throughout the
                deployment.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">
                Contact Information
              </h4>
              <p className="text-muted-foreground">
                Provide support contact details for users needing assistance.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">
                Retry Mechanism
              </h4>
              <p className="text-muted-foreground">
                Allow users to retry accessing the site without manual refresh.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">
                Fully Responsive
              </h4>
              <p className="text-muted-foreground">
                Beautiful on all devices with mobile-first design and
                accessibility built in.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">
                Flexible Triggers
              </h4>
              <p className="text-muted-foreground">
                Environment variables, API endpoints, or server-side checks to
                activate maintenance mode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section id="docs" className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-foreground mb-8">
          Implementation Guide
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Environment Variables
              </h4>
              <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm space-y-1">
                <div className="text-muted-foreground">
                  <span className="text-primary">MAINTENANCE_MODE</span>
                  <span>=true|false</span>
                </div>
                <div className="text-muted-foreground">
                  <span className="text-primary">MAINTENANCE_DURATION</span>
                  <span>=15</span>
                </div>
                <div className="text-muted-foreground">
                  <span className="text-primary">SUPPORT_EMAIL</span>
                  <span>=support@example.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Middleware Setup
              </h4>
              <p className="text-muted-foreground mb-3">
                The included proxy.ts file automatically handles maintenance
                mode routing based on environment variables or custom headers.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                AWS CodeDeploy Integration
              </h4>
              <div className="bg-card border border-border rounded-lg p-4 text-sm space-y-2">
                <p className="text-muted-foreground">
                  Set <span className="font-mono">MAINTENANCE_MODE=true</span>{' '}
                  in CodeDeploy lifecycle events before deployment.
                </p>
                <p className="text-muted-foreground">
                  The application automatically displays the maintenance screen
                  while your deployment is running.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Testing
              </h4>
              <p className="text-muted-foreground">
                Run the full test suite with{' '}
                <span className="font-mono bg-secondary px-2 py-1 rounded">
                  npm test
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>
            Professional maintenance screen for modern web applications. Built
            with Next.js, React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
