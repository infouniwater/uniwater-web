import { Section } from '@/components/ui/Section';
import { Heading, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { CONTACT } from '@/content/site';

interface FinalCTAProps {
  headline?: string;
  sub?: string;
  primaryCTA?: { label: string; href: string };
  /** Use for B2B pages — secondary CTA verb changes per Blueprint §12.5 */
  audience?: 'residential' | 'industrial';
}

export function FinalCTA({
  headline = 'Ready to start?',
  sub = 'Tell us about your home. We\u2019ll come to you.',
  primaryCTA,
  audience = 'residential',
}: FinalCTAProps) {
  const defaultCTA =
    audience === 'industrial'
      ? { label: 'Submit an RFQ', href: '/industrial#rfq' }
      : { label: 'Book a free survey', href: '/book-survey' };
  const cta = primaryCTA || defaultCTA;

  return (
    // tone="subtle" (2026-05-25) — was "tint". tint was the only place on
    // the homepage using that token; subtle aligns the FinalCTA with the
    // TrustStripe at the top, giving the page a 3-tone palette
    // (offwhite / subtle / navy) rather than 4.
    <Section tone="subtle" padding="loose">
      <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center">
        <Heading level={2} className="text-display-m font-light">
          {headline}
        </Heading>
        <Body className="text-mute text-lede font-light">{sub}</Body>
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
          <Button href={cta.href} size="lg">
            {cta.label}
          </Button>
          <p className="text-caption text-mute">
            Or call{' '}
            <a
              href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
              className="text-navy hover:text-teal transition-colors duration-200 ease-calm underline underline-offset-4"
            >
              {CONTACT.phones[0]}
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
