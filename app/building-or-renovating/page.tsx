import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { FinalCTA } from '@/components/sections/FinalCTA';

/**
 * Homeowner-facing landing for "I'm building or renovating" from the
 * homepage AudienceRouter. The trade-facing /for-architects page
 * (DWG / BIM / submittal-grade PDFs) is the wrong destination for a
 * homeowner who clicked that sentence -- this page speaks to the
 * homeowner directly, explains what changes when the water is
 * specified pre-tile, and namechecks the architect partnership at the
 * bottom rather than the top.
 */

export const metadata: Metadata = {
  title: 'Building or renovating',
  description:
    'Specify the water before the tile goes down. Uniwater surveys at the draft-drawing stage and routes the plumbing around the system, not the other way around. For homeowners building or renovating in India and Nepal.',
};

const WHY_NOW = [
  {
    title: 'Pre-tile beats post-tile.',
    body:
      'A vessel in a wall niche is a 15 mm decision at draft drawings. After tile, the same install means chiseled walls, exposed flexis, and a system that looks bolted on. Pre-tile is roughly a third of the cost of post-tile retrofit.',
  },
  {
    title: 'The plumbing routes around the system.',
    body:
      'False-ceiling void, plumbing shaft, utility-room corner — decided WITH the plumber, not after. Service access is built in, not negotiated later. We work from your draft drawings, not photos.',
  },
  {
    title: 'Architect-friendly, not architect-dependent.',
    body:
      'Your architect can call us directly; or we deal with you and send them the install drawings. Either way, the system lands in their plan instead of becoming a punch-list item.',
  },
];

const SURVEY_DELIVERABLES = [
  {
    label: 'On-site water test',
    body: 'TDS, hardness, iron, pH, free chlorine. Ten minutes at the tap. The result decides the chemistry; the chemistry decides the system.',
  },
  {
    label: 'Capacity sizing',
    body: 'Sized to bathroom count, peak draw, garden taps, future expansion. Right-sized matters: an oversized plant wastes money, an undersized one fails early.',
  },
  {
    label: 'Install-location options',
    body: 'Where the vessels can go given your plan -- utility room, balcony, terrace, basement, custom cabinet. Trade-offs spelt out.',
  },
  {
    label: 'Plumbing routing notes',
    body: 'What the plumber needs to leave open before tile -- inlet line, bypass, drain provision, electrical for the control head.',
  },
  {
    label: 'Written quote',
    body: 'Per-tier pricing, AMC tier, install timeline. Honest about what we recommend versus what you asked for.',
  },
];

const STAGES = [
  {
    n: '01',
    title: 'Call us at draft drawings.',
    body: 'Or any time before tile. The earlier the better; we have done useful work as late as one week before handover, but a month is better than a week.',
  },
  {
    n: '02',
    title: 'Survey + free water test.',
    body: 'An engineer visits site, reads your plans, runs the water test, walks the proposed install locations with you and the plumber.',
  },
  {
    n: '03',
    title: 'Install during finishing.',
    body: 'Vessels in before the false ceiling closes. Pipes in before tile. Control heads after MEP commissioning, before handover.',
  },
  {
    n: '04',
    title: 'Monthly service from month one.',
    body: 'Parameter testing, media check, salt top-up, same-day written report. Year one is included; AMC starts after.',
  },
];

export default function BuildingOrRenovatingPage() {
  return (
    <>
      {/* Hero -- image-with-scrim, same vocabulary as the rest of the
          site. The terrace image carries "your home, pre-finish" better
          than the bathroom shot (which would clash with the BathSoft
          page hero a few clicks away). */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[480px] md:h-[580px] lg:h-[calc(100vh-200px)] lg:min-h-[540px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/terrace-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/terrace-tablet.jpg" />
          <img
            src="/images/hero/terrace-mobile.jpg"
            alt="A finished home terrace under construction wrapping toward completion, the kind of pre-handover moment when the water system gets specified in"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.94) 0%, rgba(4,69,95,0.78) 45%, rgba(4,69,95,0.35) 90%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 50%, rgba(4,69,95,0.30) 85%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
              Building or renovating
            </p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Specify the water before the tile goes down.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              We survey at draft drawings. The plumbing routes around the
              system, not the other way around. A vessel in a wall niche
              is a 15&nbsp;mm decision at design; after tile it&rsquo;s
              chiseled walls. Get the call in early.
            </p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href="/book-survey?context=pre-construction"
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Book a pre-construction survey
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#what-changes" className="group inline-flex self-start sm:self-center text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full">
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  See what changes
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why now -- three reasons, LIGHT band. */}
      <Section padding="default" id="what-changes">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Why now, not later</Eyebrow>
          <Heading level={2}>Three things change when the system goes in before tile.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_NOW.map((item) => (
            <Card key={item.title}>
              <Heading level={3} className="mb-3">{item.title}</Heading>
              <Body className="text-mute">{item.body}</Body>
            </Card>
          ))}
        </div>
      </Section>

      {/* When to call -- DARK with image overlay. The 4-stage timeline
          but framed for a construction visitor (when to engage, not the
          generic "how it works" stages). */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>When to engage us</Eyebrow>
          <Heading level={2} inverse>Earlier is better. There is no &ldquo;too early.&rdquo;</Heading>
          <Body inverse className="text-offwhite/80 mt-2">
            The four stages of a construction-mode engagement. We have done useful work as late as a week before handover &mdash; but the same survey done four months earlier gives the architect and plumber room to route the system properly.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STAGES.map((step) => (
            <div key={step.n} className="flex flex-col gap-4">
              <div className="text-[56px] md:text-[64px] font-light leading-none text-soft">{step.n}</div>
              <Heading level={3} inverse>{step.title}</Heading>
              <Body inverse className="text-offwhite/80">{step.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* What the survey delivers -- LIGHT, five items. */}
      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">What you get at the survey</Eyebrow>
          <Heading level={2}>Five deliverables. No quote without all five.</Heading>
          <Body className="text-mute mt-4">
            The survey is free. The deliverables below are the same whether you build now or in eighteen months &mdash; we don&rsquo;t hide the water test behind a deposit.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SURVEY_DELIVERABLES.map((item) => (
            <div key={item.label} className="bg-offwhite border border-hairline p-6 flex flex-col gap-3">
              <div className="text-eyebrow font-medium uppercase text-teal">{item.label}</div>
              <Body className="text-mute">{item.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Architect bridge -- DARK band. The homeowner reaches the
          architect program from here without the architect page
          dominating the homeowner journey. */}
      <Section tone="navy" padding="default" image={{ stem: 'bathroom' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <Eyebrow inverse>Working with your architect</Eyebrow>
            <Heading level={2} inverse>Your architect can call us directly.</Heading>
            <Body inverse className="text-offwhite/80">
              We ship DWG vessel footprints, BIM blocks for the residential and building capacities, install-location drawings for the five canonical install patterns, and submittal-grade technical PDFs &mdash; everything a specifier needs to put the system on the plan. Send your architect to the trade program or have us send them the pack.
            </Body>
            <div className="mt-4">
              <Link
                href="/for-architects"
                className="inline-flex items-center gap-2 self-start text-[15px] text-offwhite/85 hover:text-offwhite transition-colors duration-200 ease-calm"
              >
                <span className="border-b border-offwhite/30 hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  See the architect program
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <EditorialAccent inverse className="text-h2-m md:text-h2 leading-snug">
              Designed into the build, not bolted onto the finish.
            </EditorialAccent>
          </div>
        </div>
      </Section>

      <FinalCTA
        headline="Book the pre-construction survey."
        sub="Free, on-site, with the water test. We work from your draft drawings; the architect and plumber loop in from the same call."
        primaryCTA={{ label: 'Book a pre-construction survey', href: '/book-survey?context=pre-construction' }}
      />
    </>
  );
}
