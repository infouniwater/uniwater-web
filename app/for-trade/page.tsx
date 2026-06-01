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
    // Audience tag preserves the dealer context across the /contact
    // hop so inbound leads land tagged in the CRM (architect + plumber
    // get their own pages, so they self-segment by destination URL).
    href: '/contact?audience=dealer',
  },
  {
    eyebrow: 'Architect & interior designer',
    heading: 'Spec into the plan, not after tile.',
    body:
      'Documentation that survives a submittal review. DWG, BIM, install drawings — designed for the way you actually work.',
    bullets: [
      'Submittal-grade footprints and Revit families.',
      'Section drawings for the five install patterns.',
      'A single survey-led partner across every capacity.',
    ],
    cta: 'Open the architect deck',
    href: '/for-architects',
  },
  {
    eyebrow: 'Plumber & installer',
    heading: 'Partner programme with margin you can live on.',
    body:
      'Trade access to the catalogue, install support, and lead routing in your service area.',
    bullets: [
      'Plumber partner pricing with documented per-SKU margin.',
      'Install library and on-site engineering on first city installs.',
      'Service tier — own the AMC, or train into ours.',
    ],
    cta: 'Open the partner programme',
    href: '/for-plumbers',
  },
];

export default function ForTradePage() {
  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[440px] md:h-[520px] lg:h-[calc(100vh-220px)] lg:min-h-[460px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/utility-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/utility-tablet.jpg" />
          <img
            src="/images/hero/utility-mobile.jpg"
            alt="A Uniwater whole-house install in a finished home utility area."
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.85) 0%, rgba(4,69,95,0.55) 35%, rgba(4,69,95,0.0) 65%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.85) 0%, rgba(4,69,95,0.55) 35%, rgba(4,69,95,0.0) 60%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">For the trade</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Three ways to work with Uniwater.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Whether you sell the bathroom, draw the plan, or do the install &mdash; there&rsquo;s a Uniwater partnership shaped to your work. Pick the lane that fits.
            </p>
          </div>
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
