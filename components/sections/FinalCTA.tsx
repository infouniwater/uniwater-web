import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading } from '@/components/ui/Typography';
import { CONTACT } from '@/content/site';

interface FinalCTAProps {
  headline?: string;
  sub?: string;
  primaryCTA?: { label: string; href: string };
  /** Use for B2B pages — secondary CTA verb changes per Blueprint §12.5 */
  audience?: 'residential' | 'industrial';
}

/**
 * Final CTA — light surface so the homepage cadence closes on L
 * (per the strict D L D L D L D L D L alternation). The navy pill
 * primary + phone-link secondary still carry the hero's CTA
 * vocabulary; the section frame just runs on offwhite instead of
 * the image-with-scrim canvas.
 */
export function FinalCTA({
  headline = 'Ready when you are.',
  sub = 'Tell us about your home. We’ll come to you.',
  primaryCTA,
  audience = 'residential',
}: FinalCTAProps) {
  const defaultCTA =
    audience === 'industrial'
      ? { label: 'Submit an RFQ', href: '/industrial#rfq' }
      : { label: 'Book a free survey', href: '/book-survey' };
  const cta = primaryCTA || defaultCTA;
  const eyebrow = audience === 'industrial' ? 'Engineering brief' : 'Your next step';

  return (
    <Section tone="subtle" padding="loose">
      <div className="max-w-3xl flex flex-col gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading level={2} className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.1] max-w-[22ch]">
          {headline}
        </Heading>
        <p className="text-[15px] leading-relaxed text-mute max-w-xl mt-1">
          {sub}
        </p>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-navy text-offwhite font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-teal"
          >
            {cta.label}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
              <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <a
            href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
            className="group inline-flex items-center gap-1.5 self-start text-[15px] text-mute hover:text-navy transition-colors duration-200 ease-calm max-w-full"
          >
            <span className="border-b border-hairline group-hover:border-navy/40 pb-1 transition-colors duration-200 ease-calm">
              Or call {CONTACT.phones[0]}
            </span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
              <path d="M5.5 4.5C5.5 4.5 7 4 8 4C8.5 4 9 4.5 9 5L9.5 7.5C9.5 8 9.5 8.5 9 9L7.5 10.5C8.5 13 11 15.5 13.5 16.5L15 15C15.5 14.5 16 14.5 16.5 14.5L19 15C19.5 15 20 15.5 20 16C20 17 19.5 18.5 19.5 18.5C19 19.5 18 20 17 20C10.5 20 4 13.5 4 7C4 6 4.5 5 5.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </Section>
  );
}
