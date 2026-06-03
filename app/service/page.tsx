import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { Button } from '@/components/ui/Button';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { ServiceSection } from '@/components/sections/ServiceSection';
import { SERVICE_PROTOCOL, AMC_TIERS, TWELVE_MONTHS } from '@/content/service';
import { cn } from '@/lib/cn';

export const metadata: Metadata = buildMetadata({
  path: '/service',
  title: 'Water System Service & AMC',
  description:
    'The discipline that decides year four. Monthly preventive visits, same-day reports, 24-hour SLA on flagged faults. Uniwater\u2019s service protocol explained.',
  image: '/og/og-service.png',
});

export default function ServicePage() {
  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[560px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/plant-room-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/plant-room-tablet.jpg" />
          <img src="/images/hero/plant-room-mobile.jpg" alt="A Uniwater commercial install in a building plant room with steel piping." className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Service</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              The discipline that decides year four.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              In our experience, most premium-home water systems quietly stop performing within three to four years &mdash; rarely because of the equipment. The absence of service discipline is what compounds.
            </p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href="/book-survey"
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Book a free survey
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/sample-service-report" className="group inline-flex self-start sm:self-center text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full">
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  See a sample monthly report
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* "Service is the system" 3-pillar block — migrated from the homepage
          on 2026-05-21. Sits between the page hero and the detailed protocol
          block; the three pillars (Automated / Verified by an engineer / Owned
          by us) frame the more granular "Before / On site / After" content
          that follows. Copy unchanged from the homepage version. */}
      <ServiceSection light />

      {/* Service protocol — Before / On site / After */}
      <Section padding="default" tone="plain">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">The protocol</Eyebrow>
          <Heading level={2}>What&rsquo;s in a service visit?</Heading>
          <Body className="text-mute mt-4 text-lede font-light">
            Plenty &mdash; if you know what to look for. Before. On site. After.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {SERVICE_PROTOCOL.map((stage, i) => (
            <div key={stage.label} className="bg-offwhite p-8 md:p-10 flex flex-col gap-4">
              <div className="text-eyebrow font-medium uppercase text-teal">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-h2-m font-light text-navy">{stage.label}</h3>
              <Body className="text-mute">{stage.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Operational stats — kept LIGHT. Earlier flip-to-dark
          attempt created a D D adjacency with the next "Documented"
          section. Leaving the L L pair at ServiceSection + Stats. */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { value: '12', label: 'Preventive visits a year, Comprehensive AMC' },
            { value: '24h', label: 'SLA on flagged faults, Comprehensive AMC' },
            { value: 'Same day', label: 'Written report after every visit' },
            { value: '5', label: 'Parameters (TDS, hardness, iron, pH, FRC) at inlet + outlet, every visit' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className="text-[40px] md:text-[48px] font-light leading-none text-teal font-numeric">{s.value}</div>
              <div className="h-px w-12 bg-hairline" />
              <Caption className="uppercase tracking-wide text-eyebrow font-medium text-mute">{s.label}</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* What you receive in writing — flipped DARK for alternation. */}
      <Section tone="navy" padding="default" image={{ stem: 'industrial' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow inverse>Documented from day one</Eyebrow>
            <Heading level={2} inverse>What you receive in writing.</Heading>
            <Body inverse className="text-offwhite/80 mt-2">
              Six artifacts over the contract. None depend on the customer asking.
            </Body>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-offwhite/15">
              {[
                ['Pre-install water test', 'TDS, hardness, iron, pH, FRC — filed with the quote.'],
                ['Install diagram', 'Single-line drawing. Vessel sizes, media, pipe routes.'],
                ['Post-install parameter reading', 'Five-parameter repeat. The improvement, on paper, on day one.'],
                ['Monthly service report (PDF)', 'Parameters in/out, work performed, flags raised. Same day. Every visit.'],
                ['Twelve-month parameter trend', 'Year-end chart of hardness, iron, TDS at the tap.'],
                ['Annual independent water analysis', 'Premium tier. Third-party lab analysis alongside the in-house record.'],
              ].map(([label, body]) => (
                <li key={label} className="border-b border-offwhite/15 py-5 flex flex-col gap-2">
                  <div className="text-h3 font-normal text-offwhite [text-wrap:balance]">{label}</div>
                  <Body inverse>{body}</Body>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Twelve visits a year — calendar */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-4">Cadence</Eyebrow>
            <Heading level={2} className="mb-4">Twelve visits a year.</Heading>
            <Body className="text-mute mb-4">
              Monthly on Comprehensive. Quarterly on Standard. Same window, same protocol, same engineer where geography allows.
            </Body>
            <EditorialAccent className="mt-6">
              We show up every month. Not when something breaks.
            </EditorialAccent>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-px bg-hairline border border-hairline">
              {TWELVE_MONTHS.map((month, i) => (
                <div
                  key={month}
                  className="bg-offwhite aspect-square flex flex-col items-center justify-center p-2"
                >
                  <div className="text-caption text-mute">{month}</div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-2 text-teal">
                    <circle cx="10" cy="10" r="2.5" fill="currentColor" />
                  </svg>
                </div>
              ))}
            </div>
            <Caption className="mt-4 text-mute italic">
              24-hour notice. Date. Window. Engineer name. The visit happens when promised.
            </Caption>
          </div>
        </div>
      </Section>

      {/* AMC tiers — flipped DARK for alternation. */}
      <Section tone="navy" padding="default" image={{ stem: 'bathroom' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>AMC tiers</Eyebrow>
          <Heading level={2} inverse>Three tiers. Honest scope.</Heading>
          <Body inverse className="text-offwhite/80 mt-2">
            We don&rsquo;t promise monthly service to every customer at every price point. The cadence is tiered \u2014 explicitly \u2014 so you choose what fits your home and your water.
          </Body>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {AMC_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'p-8 flex flex-col gap-5 border',
                'recommended' in tier && tier.recommended
                  ? 'border-2 border-soft bg-navy/40'
                  : 'border-offwhite/15 bg-navy/30'
              )}
            >
              {'recommended' in tier && tier.recommended && (
                <div className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft -mb-2">
                  Most chosen
                </div>
              )}
              <h3 className="text-h2-m font-light text-offwhite">{tier.name}</h3>
              <p className="text-h3 font-medium text-soft">{tier.cadence}</p>
              <p className="text-caption text-offwhite/70">
                From{' '}
                <span className="text-offwhite font-medium">
                  ₹{tier.annualFromINR.toLocaleString('en-IN')}/year
                </span>
                {' '}+ GST · residential indicative · final price varies with system capacity
              </p>
              <Body inverse>{tier.summary}</Body>
              <ul className="flex flex-col gap-2 mt-4 pt-4 border-t border-offwhite/15">
                {tier.inclusions.map((inc) => (
                  <li key={inc} className="text-caption text-offwhite/85 flex gap-3">
                    <span className="text-soft flex-shrink-0">&mdash;</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Caption inverse className="mt-8 italic">
          AMC tier is set at handover. Re-tier on renewal if your draw or chemistry changes.
        </Caption>
      </Section>

      {/* What an engineer actually does — flipped LIGHT to follow the
          DARK "AMC tiers" above. */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="w-full overflow-hidden border border-hairline aspect-[16/9] sm:aspect-[1/1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/photography/service-testing-water.jpg"
                alt="Uniwater engineer in branded uniform performing on-site water parameter test at a system in a customer's utility room"
                className="block w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Eyebrow>On site</Eyebrow>
            <Heading level={2}>What an engineer actually does.</Heading>
            <div className="flex flex-col gap-4 mt-2">
              <Body className="text-mute">
                Pressure gauge, backwash, salt top-up, resin check, iron-spot test, TDS + hardness, leak inspection. Written report filed same day.
              </Body>
              <Body className="text-mute">
                If a flag is raised, the SLA kicks in: 24 hours Comprehensive, 12 hours Premium &mdash; we don&rsquo;t wait for the next monthly.
              </Body>
            </div>
          </div>
        </div>
      </Section>

      {/* Sample report download — flipped DARK with terrace overlay
          so the closing run alternates L D L (FinalCTA). */}
      <Section tone="navy" padding="default" image={{ stem: 'terrace' }}>
        <div className="border border-offwhite/15 bg-navy/30 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl flex flex-col gap-2">
            <h3 className="text-h2-m md:text-h2 font-normal text-offwhite [text-wrap:balance]">
              See a sample service report.
            </h3>
            <Body inverse>
              One anonymised real report from a Kolkata install. Parameters in, parameters out, work performed, flags raised.
            </Body>
          </div>
          <a
            href="/data-sheets/sample-service-report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
          >
            Download sample report
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
              <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </Section>

      <FinalCTA
        headline="Already a Uniwater customer?"
        sub="Your service history and parameter trends will live in the customer portal when it launches as a separate product."
        primaryCTA={{ label: 'Book a free survey', href: '/book-survey' }}
      />
    </>
  );
}
