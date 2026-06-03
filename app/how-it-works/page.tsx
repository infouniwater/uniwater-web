import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, EditorialAccent } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { Card } from '@/components/ui/Card';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CustomerJourneyTimeline } from '@/components/sections/CustomerJourneyTimeline';
import { FOUR_STEPS } from '@/content/education';

export const metadata: Metadata = buildMetadata({
  path: '/how-it-works',
  title: 'How It Works — Survey, Design, Install, Service',
  description:
    'From first water test to monthly service: the four-step Uniwater process. Surveyed, designed, installed, and serviced by one team.',
  image: '/og/og-how-it-works.png',
});

const STEP_DETAIL = [
  {
    label: 'Stage 01 — Survey',
    headline: '30 minutes on site. 48 hours to a quote.',
    paragraphs: [
      'Engineer visits with a water-testing kit. Reads chemistry, maps plumbing, pressure, storage, and viable install locations.',
      'No quote until the survey is complete. If a smaller system fits, we say so.',
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
      'Your readings go into the 17-rule auto-suggest engine. It generates a BOM specific to your water, draw, and install location \u2014 not a generic SKU.',
      'Residential proposals are a single-line price. B2B proposals include the full itemised BOM.',
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
      'Equipment goes false ceiling, plumbing shaft, behind cabinet, under counter \u2014 wherever it disappears. The architecture stays intact.',
      'One to two days residential. One to four weeks B2B. Commissioned and parameter-tested before handover.',
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
      'Year one AMC included. Monthly visits on Comprehensive; quarterly on Standard. 24-hour notice; written report filed before the engineer leaves.',
      'SLA on flagged faults: 24 hours Comprehensive, 12 hours Premium. Not a sale we made \u2014 a relationship we maintain.',
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
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
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
            One engineer surveys your water, designs the system, installs it, and comes back every month &mdash; by name, for the life of the contract.
          </EditorialAccent>
          <p className="text-caption text-mute mt-6 max-w-2xl">
            Most water companies sell systems and outsource service. We sell the four things a system actually needs over its lifetime &mdash; survey, design, install, service.
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
              <h3 className="font-sans text-h3 font-semibold text-navy group-hover:text-teal transition-colors duration-200 ease-calm">
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

      {/* Editorial closer removed 2026-06-03 -- it was the third
          near-verbatim restatement of the "same team end to end"
          claim already carried by the hero sub-lede and the "Why
          this matters" pullquote above. FinalCTA picks up directly. */}

      <FinalCTA />
    </>
  );
}
