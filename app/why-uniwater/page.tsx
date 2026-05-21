import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, EditorialAccent, Caption } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { Card } from '@/components/ui/Card';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SystemSelectorTree } from '@/components/sections/SystemSelectorTree';
import { THREE_CLAIMS, STATS, COMPONENT_MANUFACTURERS } from '@/content/site';

export const metadata: Metadata = {
  title: 'Why Uniwater',
  description:
    'Engineered home water — the category between kitchen-purifier brands and industrial EPC firms. Surveyed, hidden, serviced monthly.',
};

const DECISION_TREE = [
  {
    scenario: 'Single tap, drinking water only, municipal supply',
    answer: 'A Kent / Aquaguard / Zero B kitchen RO is fine.',
    why: 'For a single tap on a stable municipal supply, mass-market kitchen RO does the job. Don\u2019t overspend.',
  },
  {
    scenario: 'Hair / skin / fittings problems, no kitchen drinking-water issue',
    answer: 'BathSoft or HomeSoft — Uniwater is the right fit.',
    why: 'Kitchen-purifier brands don\u2019t address bathroom water. Whole-house and bathroom-level treatment is our category.',
  },
  {
    scenario: 'Borewell water with iron, hardness, and orange staining',
    answer: 'HomeSoft 2K–6K LPH, with iron pre-treatment — Uniwater.',
    why: 'Borewell chemistry needs sequence: iron first, then softening, then carbon. Kent / Aquaguard don\u2019t sell this.',
  },
  {
    scenario: 'You want monthly service with documented reports',
    answer: 'Uniwater. Comprehensive AMC.',
    why: 'Eureka Forbes offers AMC tiers but doesn\u2019t include monthly visits. Zero B services on demand. Monthly proactive service is our differentiator.',
  },
  {
    scenario: 'Building / hotel / hospital / factory water requirement',
    answer: 'Uniwater for engineered RO/DM/WTP; industrial EPC firm for very large turnkey projects.',
    why: 'We engineer up to 50,000 LPH RO, 10,000 LPH DM, 100 KLD WTP. For petrochemical-scale or municipal, the right answer is a tier-one EPC firm.',
  },
  {
    scenario: 'Lowest price, online order, no install or service expected',
    answer: 'Mass-market online brand. Not Uniwater.',
    why: 'We don\u2019t sell off-the-shelf. Every system is surveyed and sized. Survey-led is friction by design \u2014 it\u2019s the wrong brand if you don\u2019t want it.',
  },
];

export default function WhyUniwaterPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-6">Why Uniwater</Eyebrow>
          <Display>The water company that stays.</Display>
          <Lede className="text-mute mt-8">
            We&rsquo;re not a kitchen-purifier brand. We&rsquo;re not an industrial EPC firm. We sit in between &mdash; engineered home water for the homes you don&rsquo;t get to redo.
          </Lede>
        </div>
      </section>

      {/* The category */}
      <Section padding="default">
        <div className="max-w-reading">
          <Eyebrow className="mb-4">The category</Eyebrow>
          <Heading level={2} className="mb-6">Between two categories that don&rsquo;t fit.</Heading>
          <div className="flex flex-col gap-5">
            <Body className="text-mute">
              India&rsquo;s residential water market has two visible categories. The first is the kitchen-purifier brands &mdash; Aquaguard, Kent, Zero B, Eureka Forbes &mdash; mass-distributed, off-the-shelf, single-tap. The second is industrial EPC firms &mdash; project-based, brand-anonymous, B2B-only.
            </Body>
            <Body className="text-mute">
              Neither serves the premium homeowner who wants the bathroom water, the kitchen water, the appliance water, and the next decade of upkeep handled by one company that actually shows up. That&rsquo;s the gap Uniwater built into.
            </Body>
            <EditorialAccent className="mt-6">
              Engineered home water. Surveyed, installed, and serviced for the long term.
            </EditorialAccent>
          </div>
        </div>
      </Section>

      {/* Three claims */}
      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">The three claims</Eyebrow>
          <Heading level={2}>Three things. We repeat them across every page.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THREE_CLAIMS.map((claim, i) => (
            <div key={claim.label} className="bg-offwhite border border-hairline p-8 flex flex-col gap-4">
              <div className="text-eyebrow font-medium uppercase text-teal">
                Claim {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-h3 font-semibold text-navy">{claim.label}</h3>
              <Body className="text-mute">{claim.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* System selector — formerly SVG-005 (public/images/infographics/
          comparison-tree.svg). Replaced 2026-05-21 with the native
          <SystemSelectorTree /> component because the SVG had two
          unfixable bugs: line spacing smaller than font size (heading
          lines overlapped) and fixed-width columns that overflowed on
          any long copy. The native component uses CSS grid + auto-wrap,
          so the same data renders cleanly at every breakpoint. */}
      <Section padding="default" tone="subtle">
        <div className="mb-10 max-w-3xl">
          <Eyebrow className="mb-4">System selector</Eyebrow>
          <Heading level={2}>Which Uniwater system does your water need?</Heading>
          <Body className="text-mute mt-4">
            Three branches by water need. Every leaf is a real Uniwater product. Categories that fit below each need are named in the footnotes &mdash; we&rsquo;re honest about when we&rsquo;re not the right answer.
          </Body>
        </div>
        <SystemSelectorTree />
      </Section>

      {/* Decision tree comparison */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">How we compare</Eyebrow>
          <Heading level={2} className="mb-4">Which brand is right for which problem?</Heading>
          <Body className="text-mute">
            We&rsquo;ll be honest. Uniwater is not the right answer for every household. Here&rsquo;s a frank decision tree.
          </Body>
        </div>
        <Accordion>
          {DECISION_TREE.map((row, i) => (
            <AccordionItem key={i} question={row.scenario} defaultOpen={i === 1}>
              <div className="flex flex-col gap-4">
                <div className="text-h3 font-medium text-navy">{row.answer}</div>
                <Body className="text-mute">{row.why}</Body>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* What we don't claim */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-4">What we don&rsquo;t claim</Eyebrow>
            <Heading level={2} className="mb-6">The things you won&rsquo;t hear from us.</Heading>
            <Body className="text-mute">
              A premium-positioned brand earns trust partly by what it refuses to say. Here&rsquo;s our list.
            </Body>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-hairline">
              {[
                ['Lowest price.', 'Wrong audience. Premium homeowners expect good things to cost money.'],
                ['Largest range.', 'Internal pride. Translates to: 100+ engineered configurations \u2014 surveyed to your home.'],
                ['Patented technology.', 'Engineer-led brands don\u2019t lead with branded acronyms. We use technical names where they earn trust.'],
                ['#1 in India.', 'Aquaguard owns that category claim. We don\u2019t compete on it.'],
                ['EMI / exchange / 20% off.', 'Mass-market signalling. We don\u2019t discount; we survey.'],
              ].map(([label, body]) => (
                <li key={label} className="border-b border-hairline py-5 flex flex-col gap-2">
                  <div className="text-h3 font-semibold text-navy">{label}</div>
                  <Body className="text-mute">{body}</Body>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Components from — manufacturer trust strip */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">Components from</Eyebrow>
            <Heading level={2} className="mb-4">The names on the parts.</Heading>
            <Body className="text-mute">
              We don&rsquo;t manufacture our own pumps, resin, or membranes. We integrate from the vendors the industry actually trusts, and we name them &mdash; every quote, every spec sheet.
            </Body>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-hairline border border-hairline">
              {COMPONENT_MANUFACTURERS.map((mfr) => (
                <div
                  key={mfr}
                  className="bg-offwhite p-6 flex items-center justify-center min-h-[64px]"
                >
                  <span className="text-body font-medium text-navy">{mfr}</span>
                </div>
              ))}
            </div>
            <Caption className="text-mute mt-4">
              Pumps, resin, media, membranes, controls &mdash; specified per system at survey, never substituted post-quote.
            </Caption>
          </div>
        </div>
      </Section>

      {/* Track record callback */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-2">
            <div className="text-[56px] md:text-[64px] font-light leading-none text-teal">
              {STATS.homesServiced}
            </div>
            <div className="h-px w-12 bg-hairline" />
            <Caption className="uppercase tracking-wide text-eyebrow font-medium">Homes serviced</Caption>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[56px] md:text-[64px] font-light leading-none text-teal">
              {STATS.installations}
            </div>
            <div className="h-px w-12 bg-hairline" />
            <Caption className="uppercase tracking-wide text-eyebrow font-medium">Commercial installations</Caption>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[56px] md:text-[64px] font-light leading-none text-teal">
              {STATS.citiesTotal}
            </div>
            <div className="h-px w-12 bg-hairline" />
            <Caption className="uppercase tracking-wide text-eyebrow font-medium">Cities served</Caption>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[56px] md:text-[64px] font-light leading-none text-teal">
              Since {STATS.founded}
            </div>
            <div className="h-px w-12 bg-hairline" />
            <Caption className="uppercase tracking-wide text-eyebrow font-medium">Built for premium homes</Caption>
          </div>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
