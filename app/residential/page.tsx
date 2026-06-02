import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { SolutionCard } from '@/components/ui/Card';
import { InstallationVersatility } from '@/components/sections/InstallationVersatility';
import { ServiceSection } from '@/components/sections/ServiceSection';
import { CitiesSection } from '@/components/sections/CitiesSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { PincodeCheck } from '@/components/ui/PincodeCheck';
import { SOLUTIONS } from '@/content/solutions';
import { CITIES } from '@/content/site';

export const metadata: Metadata = {
  title: 'Water systems for the home',
  description:
    'Bathroom filters, whole-house systems, and drinking water for premium Indian homes. Surveyed, engineered, installed, and serviced monthly.',
};

// Problems → solutions. Iron / softening / scale are all answered by the
// whole-house inlet (HomeSoft pre-treatment train), not by standalone
// pages: those four media used to have their own pages but were merged
// into HomeSoft on 2026-06-03 because they aren't a buying decision a
// homeowner makes alone — they're stages inside the train.
const PROBLEM_SELECTOR = [
  { problem: 'Orange staining on tiles and grout', solution: 'whole-house-water-filter' },
  { problem: 'Dry skin, dull hair, hard-water feel', solution: 'whole-house-water-filter' },
  { problem: 'Drinking water taste, kitchen tap', solution: 'drinking-water-solution' },
  { problem: 'Scale on fittings, geyser failing early', solution: 'whole-house-water-filter' },
  { problem: 'Bathroom shower water — skin, hair, tile', solution: 'bathroom-filter' },
] as const;

const RESIDENTIAL_SLUGS = [
  'bathroom-filter',
  'whole-house-water-filter',
  'drinking-water-solution',
] as const;

export default function ResidentialPage() {
  return (
    <>
      {/* Hero — image-with-scrim editorial, same family as the homepage. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[520px] md:h-[640px] lg:h-[calc(100vh-160px)] lg:min-h-[600px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/bathroom-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/bathroom-tablet.jpg" />
          <img
            src="/images/hero/bathroom-mobile.jpg"
            alt="A luxury bathroom drinking-water filter in a marble niche beside a freestanding tub overlooking a tropical garden."
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
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">For your home</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[19ch] [text-wrap:balance]">
              Water systems for the home.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              For the homes you don&rsquo;t get to redo. Surveyed before the tile goes down. Hidden after.
            </p>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline gap-5 sm:gap-7 max-w-full">
              <Link
                href="/book-survey"
                className="inline-flex items-center gap-2 self-start whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Book a free survey
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link
                href="/water-problem-checker"
                className="group inline-flex items-center gap-1.5 self-start text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full"
              >
                <span className="border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Take the water check
                </span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <p className="text-caption text-offwhite/65 mt-2">
              Or{' '}
              <a
                href="/downloads/uniwater-homeowner-catalogue-2026.pdf"
                download
                className="text-offwhite/85 hover:text-offwhite transition-colors duration-200 ease-calm underline underline-offset-4 decoration-offwhite/30"
              >
                download the homeowner catalogue (PDF, 18 MB)
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Section padding="tight">
        <div className="max-w-3xl mx-auto">
          <PincodeCheck />
        </div>
      </Section>

      {/* Problem-led selector — promoted to dark per the "important
          sections in dark view" rule. This is the residential page's
          entry point for problem-aware visitors; the editorial
          treatment matches the hero's voice. */}
      <Section tone="navy" padding="default" image={{ stem: 'utility' }}>
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Start with the problem</Eyebrow>
          <Heading level={2} inverse>What are you trying to solve?</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-offwhite/15 border border-offwhite/15">
          {PROBLEM_SELECTOR.map((item, i) => (
            <Link
              key={item.problem}
              href={`/solutions/${item.solution}`}
              className="group bg-navy/40 p-6 lg:p-8 flex flex-col gap-4 transition-colors duration-200 ease-calm hover:bg-navy/70"
            >
              <span className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-body sm:text-h3 font-normal text-offwhite leading-snug [text-wrap:balance] flex-grow">{item.problem}</h3>
              <div className="flex items-baseline gap-2 text-soft text-caption font-ui font-medium pt-3 border-t border-offwhite/15">
                <span>See solution</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1 self-center shrink-0">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
          <Link
            href="/water-problem-checker"
            className="group bg-teal/15 p-6 lg:p-8 flex flex-col gap-4 transition-colors duration-200 ease-calm hover:bg-teal/25"
          >
            <span className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">06</span>
            <h3 className="text-body sm:text-h3 font-normal text-offwhite leading-snug [text-wrap:balance] flex-grow">
              Not sure. Take the 60-second water check.
            </h3>
            <div className="flex items-baseline gap-2 text-soft text-caption font-ui font-medium pt-3 border-t border-offwhite/15">
              <span>Start the check</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1 self-center shrink-0">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>
      </Section>

      {/* Residential solutions grid — kept LIGHT. The flip-to-dark
          attempt created a D D adjacency with the dark "Problem Selector"
          above; InstallationVersatility below is shared with the
          homepage where it has to stay light. The L L pair here is
          the least-bad option without restructuring. */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>What we install</Eyebrow>
          <Heading level={2}>Three engineered families. One survey to decide.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESIDENTIAL_SLUGS.map((slug) => {
            const sol = SOLUTIONS[slug];
            return (
              <SolutionCard
                key={slug}
                href={`/solutions/${slug}`}
                title={sol.navLabel}
                description={sol.shortHeadline}
                photoDescription={`${sol.navLabel} install in a home`}
                photoRef={`residential-${slug}`}
              />
            );
          })}
        </div>
      </Section>

      <InstallationVersatility />

      {/* Real installs gallery — flipped DARK with image overlay for
          residential alternation cadence. */}
      <Section tone="navy" padding="default" image={{ stem: 'terrace' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Real installs</Eyebrow>
          <Heading level={2} inverse>Eight installs from the last six months.</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <Photo
                description={`Real install at customer home #${i}`}
                assetRef={`real-install-${String(i).padStart(2, '0')}`}
                aspect="four-five"
              />
              <Caption inverse>
                {[
                  'Ballygunge, Kolkata',
                  'Salt Lake, Kolkata',
                  'Patia, Bhubaneswar',
                  'Kasba, Kolkata',
                  'Chandrasekharpur, Bhubaneswar',
                  'Lalmati, Guwahati',
                  'Hill Cart Road, Siliguri',
                  'Lalitpur, Kathmandu',
                ][i - 1]}
              </Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* Cities served */}
      <Section tone="subtle" padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Where we install</Eyebrow>
          <Heading level={2}>Nine cities. Own teams.</Heading>
          <Body className="text-mute mt-4">
            Every install, every service visit, delivered by our own engineers. No subcontracting after the sale.
          </Body>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-hairline border border-hairline">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="bg-offwhite p-6 hover:bg-tint/30 transition-colors duration-200 ease-calm"
            >
              <div className="text-h3 font-medium text-navy">{city.name}</div>
              <Caption className="text-mute">{city.country}</Caption>
            </Link>
          ))}
        </div>
      </Section>

      <ServiceSection />

      <FinalCTA />
    </>
  );
}
