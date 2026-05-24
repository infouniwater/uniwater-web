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

// 2026-05-25 trim: each body cut to two short sentences max so the
// section reads as four picks at a glance instead of four paragraphs.
// Industrial SLA detail moved off this card — it lives canonically on
// /industrial. AudienceRouter is the chooser; the destination pages
// own the specifics.
const AUDIENCES = [
  {
    label: 'Something is wrong with my water.',
    body:
      'Yellow stains. Scale on the geyser. Marble going orange. We test the chemistry first.',
    cta: 'Find what fits',
    href: '/water-problem-checker',
  },
  {
    label: 'I’m building or renovating.',
    body:
      'Specify the water before the tile goes down. We survey at draft drawings, the architect routes the system through the shaft.',
    cta: 'Plan the system',
    href: '/for-architects',
  },
  {
    label: 'I run a building, hotel, or factory.',
    body:
      'Engineered water at scale. Building plants to 50K LPH industrial RO. AMC priced at handover.',
    cta: 'Submit an RFQ',
    href: '/industrial#rfq',
  },
  {
    label: 'I specify or install water systems.',
    // 2026-05-22: href moved from /for-plumbers → /for-trade so the trade
    // audience lands on a three-way chooser (sanitary-ware seller /
    // architect / plumber).
    body:
      'Three lanes — dealer, designer, installer. Trade pricing, install support, lead routing.',
    cta: 'See the trade programme',
    href: '/for-trade',
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
            className="group bg-offwhite p-4 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 transition-colors duration-200 ease-calm hover:bg-tint/30"
          >
            <h3 className="text-body sm:text-h3 font-semibold text-navy leading-snug [text-wrap:balance]">
              {audience.label}
            </h3>
            {/* Card body aligned to the homepage reference card-text scale
                (Solutions / Installation): flat text-caption, no grow at sm.
                flex-grow keeps the CTA pinned to the card bottom. */}
            <p className="text-caption text-mute leading-snug flex-grow">{audience.body}</p>
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
