'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body } from '@/components/ui/Typography';
import { SolutionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SOLUTIONS, SOLUTION_LIST } from '@/content/solutions';
import { cn } from '@/lib/cn';

// (Metadata is set in adjacent layout / parent, since this is a Client Component)

const HOME_TAB_SLUGS = [
  'bathroom-filter',
  'whole-house-water-filter',
  'drinking-water-solution',
] as const;

const INSTITUTIONAL_CARDS = [
  {
    href: '/industrial',
    title: 'Building & society water plants',
    description:
      '8,000 to 30,000 LPH inlet treatment for complexes, hotels, hospitals, schools, and townships.',
    photoDescription: 'WTP install in plant room of a gated complex',
    photoRef: 'building-wtp',
  },
  {
    href: '/industrial',
    title: 'Industrial RO plants',
    description:
      '500 \u2014 50,000 LPH. Drinking water, process water, boiler make-up, beverage.',
    photoDescription: 'Industrial RO skid with FRP vessels and instrumentation',
    photoRef: 'industrial-ro',
  },
  {
    href: '/industrial',
    title: 'Industrial DM plants',
    description:
      '100 \u2014 10,000 LPH. Boiler feed, pharma, lab water, battery manufacturing.',
    photoDescription: 'DM plant with SAC/SBA columns and conductivity meters',
    photoRef: 'industrial-dm',
  },
  {
    href: '/service',
    title: 'AMC services for institutions',
    description:
      'Monthly preventive visits, same-day reports, 24-hour SLA on flagged faults.',
    photoDescription: 'Engineer logging parameters on a tablet at an institutional site',
    photoRef: 'amc-institutional',
  },
];

export default function SolutionsHub() {
  const [tab, setTab] = useState<'home' | 'b2b'>('home');

  return (
    <>
      {/* Hero — image-with-scrim editorial register, matching the rest
          of the site. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[440px] md:h-[520px] lg:h-[calc(100vh-220px)] lg:min-h-[460px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/under-counter-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/under-counter-tablet.jpg" />
          <img
            src="/images/hero/under-counter-mobile.jpg"
            alt="A compact Uniwater filter mounted under a vanity counter behind a finish cabinet door."
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
          <div className="w-full lg:max-w-[720px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Solutions</p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[19ch] [text-wrap:balance]">
              What we install.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              From a single bathroom to a 30,000-litre-per-hour building plant. Every system surveyed before it&rsquo;s sold.
            </p>
          </div>
        </div>
      </section>

      {/* Tab switcher */}
      <div className="border-b border-hairline">
        <div className="container-uw">
          <div role="tablist" aria-label="Audience" className="flex gap-8">
            <button
              role="tab"
              aria-selected={tab === 'home'}
              onClick={() => setTab('home')}
              className={cn(
                'py-5 text-[15px] font-medium transition-colors duration-200 ease-calm border-b-2 -mb-px',
                tab === 'home'
                  ? 'border-teal text-navy'
                  : 'border-transparent text-mute hover:text-navy'
              )}
            >
              For your home
            </button>
            <button
              role="tab"
              aria-selected={tab === 'b2b'}
              onClick={() => setTab('b2b')}
              className={cn(
                'py-5 text-[15px] font-medium transition-colors duration-200 ease-calm border-b-2 -mb-px',
                tab === 'b2b'
                  ? 'border-teal text-navy'
                  : 'border-transparent text-mute hover:text-navy'
              )}
            >
              For institutions &amp; industry
            </button>
          </div>
        </div>
      </div>

      {tab === 'home' ? (
        <Section padding="default">
          <div className="mb-12 max-w-3xl">
            <Heading level={2} className="mb-4">For your home.</Heading>
            <Body className="text-mute">
              Three engineered families, each sized to the water and the home. Not sure which? Take the 60-second water check.
            </Body>
            <div className="mt-6">
              <Button href="/water-problem-checker" variant="secondary">
                Not sure which you need? Take the water check
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_TAB_SLUGS.map((slug) => {
              const sol = SOLUTIONS[slug];
              return (
                <SolutionCard
                  key={slug}
                  href={`/solutions/${slug}`}
                  title={sol.navLabel}
                  description={sol.shortHeadline}
                  photoDescription={`${sol.navLabel} solution`}
                  photoRef={`hub-${slug}`}
                />
              );
            })}
          </div>
        </Section>
      ) : (
        <Section padding="default">
          <div className="mb-12 max-w-3xl">
            <Heading level={2} className="mb-4">For institutions &amp; industry.</Heading>
            <Body className="text-mute">
              Capacity, SCADA-readiness, AMC tiers, SLAs. Components from named manufacturers. Same-day reports on every visit.
            </Body>
            <div className="mt-6">
              <Button href="/industrial" variant="secondary">
                See the industrial page
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INSTITUTIONAL_CARDS.map((card) => (
              <SolutionCard key={card.title} {...card} />
            ))}
          </div>
        </Section>
      )}

      <FinalCTA />
    </>
  );
}
