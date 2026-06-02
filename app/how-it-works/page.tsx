import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, EditorialAccent } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { Card } from '@/components/ui/Card';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CustomerJourneyTimeline } from '@/components/sections/CustomerJourneyTimeline';
import { FOUR_STEPS } from '@/content/education';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'From first water test to monthly service: the four-step Uniwater process. Surveyed, designed, installed, and serviced by one team.',
  openGraph: { images: ['/og/og-how-it-works.svg'] },
  twitter: { images: ['/og/og-how-it-works.svg'] },
};

const STEP_DETAIL = [
  {
    label: 'Stage 01 — Survey',
    headline: '30 minutes on site. 48 hours to a quote.',
    paragraphs: [
      'A Uniwater engineer visits your home or site with a water-testing kit. The visit takes between 30 and 60 minutes. We take a sample, run the test, and walk you through what the numbers mean before any quote is written.',
      'We also map the plumbing: where the inlet is, what the pressure runs at, what the storage looks like, and where the equipment could reasonably go without disrupting the architecture.',
      'No quote is written until the survey is complete. If the survey reveals the system doesn\u2019t need to be as large as you thought, we say so.',
    ],
    aside: {
      title: 'What the survey covers',
      items: [
        'On-site water test (TDS, hardness, iron, pH, FRC)',
        'Plumbing and pressure map',
        'Storage and draw audit',
        'Install-location options',
        'Architect / interior-design coordination notes',
      ],
    },
  },
  {
    label: 'Stage 02 — Design',
    headline: 'Configured from 100+ engineered options. Not pulled off a shelf.',
    paragraphs: [
      'Your survey readings go into the Uniwater auto-suggest engine \u2014 a 17-rule system built from years of installation data. It generates a bill of materials specific to your water, your draw, and your install location.',
      'The proposal includes the configuration name (Mono / Duo / Trio, or 2K / 4K / 6K LPH, etc.), the media selection, vessel grade, controls, install plan, and AMC terms.',
      'For residential customers, the quote is presented as a clean single-line price. For B2B customers, we include the full itemised BOM.',
    ],
    aside: {
      title: 'What\u2019s in the proposal',
      items: [
        'Configuration and capacity',
        'Vessel material and media specification',
        'Plumbing and electrical scope',
        'Installation plan with location diagram',
        'AMC tier options',
        'Warranty terms',
        'Single-line diagram on B2B quotes',
      ],
    },
  },
  {
    label: 'Stage 03 — Install',
    headline: 'In a day. Or three. Wherever it disappears.',
    paragraphs: [
      'Equipment goes in false ceilings, plumbing shafts, behind cabinets, under counters, or outside windows \u2014 wherever it disappears. The home keeps its lines. The architect\u2019s decisions stay intact.',
      'Most residential installs complete in one to two days. Industrial and building-scale installs run one to four weeks depending on scope and site readiness. The engineer commissions every system before handover, with parameter readings filed and shared.',
    ],
    aside: {
      title: 'On-site discipline',
      items: [
        'Branded uniform, named engineer',
        'Plumbing, electrical, mounting, commissioning',
        'Photos of every install location',
        'Pre-handover parameter test',
        'Customer signature on the handover document',
      ],
    },
  },
  {
    label: 'Stage 04 — Service',
    headline: 'Every month. 24-hour notice. Same window. Same protocol.',
    paragraphs: [
      'Year one of AMC is included with every install. From month one, an engineer visits on a defined schedule. Comprehensive tier customers get monthly visits; Standard tier customers get quarterly.',
      'Every visit follows the Before / On site / After protocol: 24-hour advance notice, parameter testing against design spec, written report filed before the engineer leaves your house.',
      'If a flag is raised, the SLA is 24 hours for Comprehensive and 12 hours for Premium. The system isn\u2019t a sale we made; it\u2019s a relationship we maintain.',
    ],
    aside: {
      title: 'What an engineer does',
      items: [
        'Parameter testing (TDS, hardness, iron, pH, FRC)',
        'Backwash and regeneration verification',
        'Salt top-up where applicable',
        'Resin and media inspection',
        'Pressure-gauge calibration',
        'Leak and joint inspection',
        'Same-day written report',
      ],
    },
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero — image-with-scrim editorial register, matching the rest
          of the site. The utility-area shot keeps the process page
          grounded in the install (vs. the more aspirational terrace
          hero used elsewhere). */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[560px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/plant-room-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/plant-room-tablet.jpg" />
          <img
            src="/images/hero/plant-room-mobile.jpg"
            alt="A Uniwater commercial install in a building plant room with steel piping and concrete walls."
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }}
          aria-hidden="true"
        />

        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">How it works</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              How a Uniwater system gets into your home.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              One company. Four stages. From first water test to monthly service, the same Uniwater team owns the system for the life of the contract.
            </p>
          </div>
        </div>
      </section>

      {/* The one sentence — surfaces the competitive positioning claim
          identified in the §6.2 marketing benchmark. The only differentiator
          no Indian residential competitor can credibly match without
          rebuilding their distribution model.
          Rendered on a light surface so the dark hero is followed by a
          light section per the homepage dark/light cadence rule. */}
      <Section padding="default">
        <div className="max-w-4xl mx-auto">
          <Eyebrow className="mb-5">Why this matters</Eyebrow>
          <EditorialAccent className="text-h2-m md:text-h2 leading-snug font-light">
            The only water-treatment company in India where the engineer who surveys your water is the same person who designs the system, installs it, and comes back every month &mdash; by name, for the life of the contract.
          </EditorialAccent>
          <p className="text-caption text-mute mt-6 max-w-2xl">
            Most water companies sell systems and outsource service. We sell the four things a system actually needs over its lifetime &mdash; a survey, the right design, an install that fits the house, and a service crew that does not change.
          </p>
        </div>
      </Section>

      {/* Process overview strip */}
      <Section padding="tight" tone="subtle">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {FOUR_STEPS.map((step) => (
            <a
              key={step.n}
              href={`#stage-${step.n}`}
              className="flex flex-col gap-3 group"
            >
              <div className="text-[40px] font-light text-teal leading-none">{step.n}</div>
              <h3 className="text-h3 font-semibold text-navy group-hover:text-teal transition-colors duration-200 ease-calm">
                {step.title}
              </h3>
              <Body className="text-mute">{step.body}</Body>
            </a>
          ))}
        </div>
      </Section>

      {/* Customer journey timeline — formerly SVG-004 (public/images/infographics/
          landscape|portrait/customer-journey.svg). Replaced 2026-05-21 with a
          native React component because the SVG used absolute pixel positioning
          that clipped text at the viewBox edges and overlapped multi-line copy
          when y-offsets fell short of the font size. The native version uses
          CSS grid + auto-wrap so the same data renders correctly at every
          breakpoint without fragile hand-tuned positions. */}
      <Section padding="default">
        <div className="mb-10 max-w-3xl">
          <Eyebrow className="mb-4">The journey, on one line</Eyebrow>
          <Heading level={2}>From the first survey to monthly service for life.</Heading>
        </div>
        <CustomerJourneyTimeline />
      </Section>

      {/* Long-form stages */}
      {STEP_DETAIL.map((stage, i) => (
        <Section
          key={i}
          padding="default"
          tone={i % 2 === 0 ? 'plain' : 'subtle'}
          id={`stage-${String(i + 1).padStart(2, '0')}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 max-w-reading">
              <Eyebrow className="mb-4">{stage.label}</Eyebrow>
              <Heading level={2} className="mb-6 font-light">
                {stage.headline}
              </Heading>
              <div className="flex flex-col gap-5">
                {stage.paragraphs.map((p, j) => (
                  <Body key={j} className="text-mute">{p}</Body>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Photo
                description={`${stage.label}: representative photograph (engineer at work / install in progress / monthly service visit)`}
                assetRef={`how-${stage.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                aspect="four-five"
                mobileAspect="sixteen-nine"
              />
              <div className="mt-6 border border-hairline p-6">
                <div className="text-eyebrow font-medium uppercase text-teal mb-4">
                  {stage.aside.title}
                </div>
                <ul className="flex flex-col gap-2">
                  {stage.aside.items.map((item) => (
                    <li key={item} className="text-caption text-ink flex gap-3">
                      <span className="text-teal flex-shrink-0">&mdash;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* Editorial closer */}
      <Section padding="default">
        <div className="max-w-reading mx-auto text-center">
          <EditorialAccent className="mx-auto">
            From start to monthly service, the same Uniwater team owns the system.
          </EditorialAccent>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
