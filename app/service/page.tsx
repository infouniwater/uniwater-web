import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { Button } from '@/components/ui/Button';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SERVICE_PROTOCOL, AMC_TIERS, TWELVE_MONTHS } from '@/content/service';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Service',
  description:
    'The discipline that decides year four. Monthly preventive visits, same-day reports, 24-hour SLA on flagged faults. UNIWATER\u2019s service protocol explained.',
  openGraph: { images: ['/og/og-service.svg'] },
  twitter: { images: ['/og/og-service.svg'] },
};

export default function ServicePage() {
  return (
    <>
      {/* Hero — inverse navy */}
      <section className="bg-navy text-offwhite border-b border-offwhite/15">
        <div className="container-uw py-20 md:py-28">
          <div className="max-w-4xl flex flex-col gap-6">
            <div className="text-eyebrow font-medium uppercase text-soft">Service</div>
            <h1 className="text-display-m md:text-display font-light leading-tight">
              The discipline that decides year four.
            </h1>
            <Lede inverse>
              Most water systems in Indian premium homes stop performing within three years. The reason is rarely the equipment. It&rsquo;s the absence of service discipline.
            </Lede>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Button href="/book-survey" variant="ghost">Book a free survey</Button>
              <a
                href="/sample-service-report"
                className="text-offwhite hover:text-soft transition-colors duration-200 ease-calm text-[15px] underline underline-offset-4 decoration-offwhite/30"
              >
                See a sample monthly report →
              </a>
            </div>
          </div>
        </div>
      </section>

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

      {/* Operational stats — provable, written-down commitments */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { value: '12', label: 'Preventive visits a year, Comprehensive AMC' },
            { value: '24h', label: 'SLA on flagged faults, Comprehensive AMC' },
            { value: 'Same day', label: 'Written report after every visit' },
            { value: '5', label: 'Parameters tested in and out, every visit' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className="text-[40px] md:text-[48px] font-light leading-none text-teal">{s.value}</div>
              <div className="h-px w-12 bg-hairline" />
              <Caption className="uppercase tracking-wide text-eyebrow font-medium text-mute">{s.label}</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* What you receive in writing — documentation trail */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-4">Documented from day one</Eyebrow>
            <Heading level={2} className="mb-4">What you receive in writing.</Heading>
            <Body className="text-mute">
              Six artifacts arrive over the life of the contract. None of them depend on the customer asking. The discipline of writing it down is what makes the relationship audit-able by either side.
            </Body>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-hairline">
              {[
                ['Pre-install water test', 'TDS, hardness, iron, pH, FRC — taken at survey, filed with the quote. The number that decides the design.'],
                ['Install diagram', 'Single-line drawing of the train, with vessel sizes, media types, and pipe routes. Signed off before commissioning.'],
                ['Post-install parameter reading', 'Repeat of the five-parameter test after commissioning. The improvement, on paper, on day one.'],
                ['Monthly service report (PDF)', 'Parameters in and out, work performed, flags raised, next visit date. Same day. Every visit.'],
                ['Twelve-month parameter trend', 'Year-end summary chart of hardness, iron, and TDS at the tap across the contract year.'],
                ['Annual independent water analysis', 'Premium tier. Third-party lab analysis filed alongside the in-house monthly record.'],
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

      {/* Twelve visits a year — calendar */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-4">Cadence</Eyebrow>
            <Heading level={2} className="mb-4">Twelve visits a year.</Heading>
            <Body className="text-mute mb-4">
              A scheduled visit every month for customers on the Comprehensive tier. Quarterly for Standard. Same window. Same protocol. Same engineer where geography allows.
            </Body>
            <EditorialAccent className="mt-6">
              We show up every month. Not when something breaks.
            </EditorialAccent>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-6 gap-px bg-hairline border border-hairline">
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
              24-hour notice. Date. Window. Technician name. The visit happens when promised.
            </Caption>
          </div>
        </div>
      </Section>

      {/* AMC tiers — tiered honestly per Blueprint §0 hardened decision 5 */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">AMC tiers</Eyebrow>
          <Heading level={2} className="mb-4">Three tiers. Honest scope.</Heading>
          <Body className="text-mute">
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
                  ? 'border-2 border-navy bg-tint/30'
                  : 'border-hairline bg-offwhite'
              )}
            >
              {'recommended' in tier && tier.recommended && (
                <div className="text-eyebrow font-medium uppercase text-teal -mb-2">
                  Most chosen
                </div>
              )}
              <h3 className="text-h2-m font-light text-navy">{tier.name}</h3>
              <p className="text-h3 font-medium text-teal">{tier.cadence}</p>
              <p className="text-caption text-mute">
                From{' '}
                <span className="text-navy font-medium">
                  ₹{tier.annualFromINR.toLocaleString('en-IN')}/year
                </span>
                {' '}+ GST · residential indicative · final price varies with system capacity
              </p>
              <Body className="text-mute">{tier.summary}</Body>
              <ul className="flex flex-col gap-2 mt-4 pt-4 border-t border-hairline">
                {tier.inclusions.map((inc) => (
                  <li key={inc} className="text-caption text-ink flex gap-3">
                    <span className="text-teal flex-shrink-0">&mdash;</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Caption className="mt-8 text-mute italic">
          AMC tier is set at handover. Re-tier on renewal if your draw or chemistry changes.
        </Caption>
      </Section>

      {/* What an engineer actually does — photo-led */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="w-full overflow-hidden border border-hairline" style={{ aspectRatio: '1 / 1' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/photography/service-testing-water.jpg"
                alt="UNIWATER engineer in branded uniform performing on-site water parameter test at a system in a customer's utility room"
                className="block w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow className="mb-4">On site</Eyebrow>
            <Heading level={2} className="mb-6">What an engineer actually does.</Heading>
            <div className="flex flex-col gap-4">
              <Body className="text-mute">
                Pressure gauge calibration. Backwash verification. Salt top-up. Resin assessment. Iron-spot test. TDS and hardness readings. Leak inspection along the install joints. Same-day written report filed to the customer.
              </Body>
              <Body className="text-mute">
                If a flag is raised &mdash; pressure low, resin exhausted, iron leak through the bed &mdash; we don&rsquo;t wait for the next monthly. The SLA kicks in: 24 hours on Comprehensive, 12 hours on Premium.
              </Body>
            </div>
          </div>
        </div>
      </Section>

      {/* Sample report download */}
      <Section padding="tight">
        <div className="border border-hairline p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-h2-m md:text-h2 font-light text-navy mb-2">
              See a sample service report.
            </h3>
            <Body className="text-mute">
              One anonymised real report from a Kolkata install. Parameters in, parameters out, work performed, flags raised.
            </Body>
          </div>
          <Button
            href="/data-sheets/sample-service-report.pdf"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download sample report
          </Button>
        </div>
      </Section>

      <FinalCTA
        headline="Already a UNIWATER customer?"
        sub="Your service history and parameter trends will live in the customer portal when it launches as a separate product."
        primaryCTA={{ label: 'Book a free survey', href: '/book-survey' }}
      />
    </>
  );
}
