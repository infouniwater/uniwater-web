import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { FinalCTA } from '@/components/sections/FinalCTA';

/**
 * /for-trade — trade triage page. Audience-routing layer that the
 * homepage AudienceRouter sends "I specify or install water systems"
 * traffic into. Three cards, three audiences, three onward destinations:
 *
 *   1. Sanitary-ware seller / dealer → /contact (no dedicated page yet,
 *      enquiry routed through the standard contact form)
 *   2. Architect or interior designer → /for-architects
 *   3. Plumber or installer           → /for-plumbers
 *
 * Replaces the old AudienceRouter wiring that pointed both architect
 * and installer cards at /for-architects. Created 2026-05-22 per
 * Rajat's brief.
 */

export const metadata: Metadata = {
  title: 'For the trade — dealers, architects, plumbers',
  description:
    'Three ways to work with Uniwater. Sanitary-ware dealers stock the bathroom filter customers ask for. Architects spec the system into the plan. Plumbers join the partner programme. Pick the lane that fits you.',
};

interface TradeAudience {
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  cta: string;
  href: string;
}

const AUDIENCES: ReadonlyArray<TradeAudience> = [
  {
    eyebrow: 'Dealer & retailer',
    heading: 'Sell the water that completes the bathroom.',
    body:
      'Stock BathSoft as the wellness layer your customers ask for after the marble, the brass, and the rain shower.',
    bullets: [
      'Trade pricing on BathSoft Mono, Duo, and Trio.',
      'Install handled by a Uniwater engineer in your city — no plumbing risk for you.',
      'Lead routing within your service area — enquiries we receive in your city come back to you first.',
      'No inventory risk on commercial enquiries. We engineer the system; you keep the customer relationship.',
    ],
    cta: 'Open the dealer enquiry',
    href: '/contact',
  },
  {
    eyebrow: 'Architect & interior designer',
    heading: 'Spec into the plan, not after tile.',
    body:
      'Documentation that holds up to scrutiny — vessel footprints, BIM blocks, install drawings, technical PDFs.',
    bullets: [
      'Submittal-grade DWG and PDF vessel footprints across every capacity.',
      'Revit families for residential and building plant systems.',
      'Architectural section drawings of the five install patterns — false ceiling, shaft, recess, under-counter, utility room.',
      'A single survey-led partner from BathSoft Mono through 30,000 LPH building plant.',
    ],
    cta: 'Open the architect deck',
    href: '/for-architects',
  },
  {
    eyebrow: 'Plumber & installer',
    heading: 'Partner programme with margin you can live on.',
    body:
      'Trade access to the catalogue, the install library, and lead routing in your service area.',
    bullets: [
      'Plumber partner pricing with documented margin per SKU.',
      'Install library — section drawings, isometric routing, finished-bathroom photos.',
      'Engineering support on site for the first install in any new city or product line.',
      'Service tier: we own the AMC; you handle the install — or train into the AMC delivery if you want.',
    ],
    cta: 'Open the partner programme',
    href: '/for-plumbers',
  },
];

export default function ForTradePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-6">For the trade</Eyebrow>
          <Display>Three ways to work with Uniwater.</Display>
          <Lede className="text-mute mt-8">
            Whether you sell the bathroom, draw the plan, or do the install &mdash; there&rsquo;s a Uniwater partnership shaped to your work. Pick the lane that fits.
          </Lede>
        </div>
      </section>

      {/* Three triage cards */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {AUDIENCES.map((a) => (
            <div
              key={a.eyebrow}
              className="bg-offwhite border border-hairline p-6 md:p-8 flex flex-col gap-5"
            >
              <Eyebrow>{a.eyebrow}</Eyebrow>
              <h3 className="text-h3 font-semibold text-navy leading-snug [text-wrap:balance]">
                {a.heading}
              </h3>
              <Body className="text-mute">{a.body}</Body>
              <ul className="flex flex-col gap-2 mt-1 flex-grow">
                {a.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-caption text-mute leading-snug">
                    <span className="text-teal flex-shrink-0 mt-[2px]">&mdash;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <Button href={a.href} variant="secondary" size="md" className="w-full sm:w-auto">
                  {a.cta} &rarr;
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Editorial bridge — frames why we differentiate the three lanes */}
      <Section padding="default">
        <div className="max-w-reading">
          <Heading level={2} className="mb-4">
            Why three lanes, not one.
          </Heading>
          <Body className="text-mute mb-4">
            A sanitary-ware dealer needs trade pricing and an install partner. An architect needs documentation that survives a submittal review. A plumber needs lead routing and margin clarity. Same brand; three different commercial conversations.
          </Body>
          <Body className="text-mute">
            Across all three, the engineering, the install standards, and the monthly service are the same. The relationship is what shifts.
          </Body>
        </div>
      </Section>

      <FinalCTA
        headline="Not sure which lane?"
        sub="Tell us about your business in a sentence. We&rsquo;ll route you to the right desk."
        primaryCTA={{ label: 'Contact us', href: '/contact' }}
      />
    </>
  );
}
