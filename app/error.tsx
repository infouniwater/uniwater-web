'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Lede } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { PRIMARY_PHONE, PRIMARY_PHONE_HREF, WHATSAPP_HREF } from '@/content/site';

/**
 * Global error boundary. Catches any unhandled error thrown in the route tree
 * during render and renders a calm recovery surface. Must be a Client
 * Component per Next.js App Router requirements.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO Sprint 7 wider: pipe to Sentry once the integration ships.
    // For now, surface to console so a developer running locally sees the throw.
    if (typeof window !== 'undefined') {
      console.error('Route error:', error);
    }
  }, [error]);

  return (
    <Section padding="loose">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6 items-center">
        <Eyebrow>Something went wrong</Eyebrow>
        <Display>This page hit an unexpected snag.</Display>
        <Lede className="text-mute">
          Something broke on our side. Try again, or take one of the routes below.
        </Lede>
        <Lede className="text-mute">
          Need us now? Call{' '}
          <a href={PRIMARY_PHONE_HREF} className="text-teal underline underline-offset-4 whitespace-nowrap">
            {PRIMARY_PHONE}
          </a>{' '}
          or{' '}
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-teal underline underline-offset-4">
            WhatsApp us
          </a>
          .
        </Lede>
        {error?.digest && (
          <p className="text-caption text-mute font-mono">Reference: {error.digest}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button onClick={() => reset()}>Try again</Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
          <Button href="/contact" variant="tertiary">
            Contact us
          </Button>
        </div>
      </div>
    </Section>
  );
}
