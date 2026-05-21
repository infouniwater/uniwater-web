import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading } from '@/components/ui/Typography';

/**
 * Audience Router — per Critique §1.3 + Blueprint §7.
 *
 * Above-fold 30-second answer to "is this for me?" Cards are mindset-led,
 * not product-led: the visitor picks the sentence that matches their
 * current state, and we send them to the page that closes that state.
 */

const AUDIENCES = [
  {
    label: 'Something is wrong with my water.',
    body:
      'Yellow stains. Hair that doesn’t feel right. Scale on the geyser. Marble grout going orange. Start with a free survey — we test the chemistry before we propose anything.',
    cta: 'Find what fits',
    href: '/water-problem-checker',
  },
  {
    label: 'I’m building or renovating.',
    body:
      'Specify the water before the tile goes down. We survey at draft drawings and hand back a system the architect can route through the false ceiling and the plumbing shaft.',
    cta: 'Plan the system',
    href: '/for-architects',
  },
  {
    label: 'I run a building, hotel, or factory.',
    body:
      'Engineered water at scale. 8,000 to 50,000 LPH. RFQ today, BOM and price within five working days, AMC priced at handover.',
    cta: 'Submit an RFQ',
    href: '/industrial#rfq',
  },
  {
    label: 'I specify or install water systems.',
    // Trimmed the "Architect spec packs" sentence on 2026-05-22 when the
    // href moved from /for-architects to /for-plumbers — architects are
    // already served by the card above; this card is exclusively the
    // installer / trade-partner audience.
    body:
      'Partner programme with margin you can live on. Trade access to the catalogue and the install library.',
    cta: 'Open the partner programme',
    href: '/for-plumbers',
  },
];

export function AudienceRouter() {
  return (
    <Section padding="default">
      <div className="flex flex-col gap-4 mb-8 md:mb-12">
        <Eyebrow>Where would you like to start?</Eyebrow>
        <Heading level={2} className="max-w-3xl">
          Pick the sentence that sounds like you.
        </Heading>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline">
        {AUDIENCES.map((audience) => (
          <Link
            key={audience.label}
            href={audience.href}
            className="group bg-offwhite p-5 sm:p-7 lg:p-10 flex flex-col gap-3 sm:gap-4 transition-colors duration-200 ease-calm hover:bg-tint/30"
          >
            <h3 className="text-body sm:text-h3 font-semibold text-navy leading-snug [text-wrap:balance]">
              {audience.label}
            </h3>
            <p className="text-caption sm:text-body text-mute flex-grow leading-snug sm:leading-normal">{audience.body}</p>
            <div className="flex items-center gap-2 text-teal text-caption font-medium mt-2">
              <span>{audience.cta}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 ease-calm group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
