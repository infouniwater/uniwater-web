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

const PROBLEM_SELECTOR = [
  { problem: 'Orange staining on tiles and grout', solution: 'iron-filter' },
  { problem: 'Dry skin, dull hair, hard-water feel', solution: 'water-softener' },
  { problem: 'Drinking water taste, kitchen tap', solution: 'drinking-water-solution' },
  { problem: 'Scale on fittings, geyser failing early', solution: 'whole-house-water-filter' },
  { problem: 'Multiple problems across the home', solution: 'whole-house-water-filter' },
] as const;

const RESIDENTIAL_SLUGS = [
  'bathroom-filter',
  'whole-house-water-filter',
  'drinking-water-solution',
  'iron-filter',
  'water-softener',
] as const;

export default function ResidentialPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16 lg:py-24">
            <div className="lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1">
              <Eyebrow>For your home</Eyebrow>
              <Display>Water systems for the home.</Display>
              <Lede className="text-mute">
                For the homes you don&rsquo;t get to redo. Surveyed before the tile goes down. Hidden after.
              </Lede>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                <Button href="/book-survey">Book a free survey</Button>
                <Button href="/water-problem-checker" variant="tertiary">
                  Take the water check
                </Button>
              </div>
              <p className="text-caption text-mute mt-2">
                Or{' '}
                <a
                  href="/downloads/uniwater-homeowner-catalogue-2026.pdf"
                  download
                  className="text-navy hover:text-teal transition-colors duration-200 ease-calm underline underline-offset-4 decoration-hairline"
                >
                  download the homeowner catalogue (PDF, 18 MB)
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <Photo
                description="Premium Indian home — wellness moment with family and water"
                assetRef="residential-hero"
                aspect="hero-desktop"
              />
            </div>
          </div>
        </div>
      </section>

      <Section padding="tight">
        <div className="max-w-3xl mx-auto">
          <PincodeCheck />
        </div>
      </Section>

      {/* Problem-led selector */}
      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Start with the problem</Eyebrow>
          <Heading level={2}>What are you trying to solve?</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
          {PROBLEM_SELECTOR.map((item, i) => (
            <Link
              key={item.problem}
              href={`/solutions/${item.solution}`}
              className="group bg-offwhite p-6 lg:p-8 flex flex-col gap-4 transition-colors duration-200 ease-calm hover:bg-tint/30"
            >
              <div className="text-eyebrow font-medium uppercase text-teal">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-h3 font-semibold text-navy [text-wrap:balance] flex-grow">{item.problem}</h3>
              <div className="flex items-center gap-2 text-teal text-caption font-medium">
                <span>See solution</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
          <Link
            href="/water-problem-checker"
            className="group bg-tint p-6 lg:p-8 flex flex-col gap-4 transition-colors duration-200 ease-calm hover:bg-tint/70"
          >
            <div className="text-eyebrow font-medium uppercase text-teal">06</div>
            <h3 className="text-h3 font-semibold text-navy [text-wrap:balance] flex-grow">
              Not sure. Take the 60-second water check.
            </h3>
            <div className="flex items-center gap-2 text-teal text-caption font-medium">
              <span>Start the check</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>
      </Section>

      {/* Residential solutions grid */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">What we install</Eyebrow>
          <Heading level={2}>Five engineered families. One survey to decide.</Heading>
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

      {/* Real installs gallery — placeholder grid */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Real installs</Eyebrow>
          <Heading level={2}>Eight installs from the last six months.</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <Photo
                description={`Real install at customer home #${i}`}
                assetRef={`real-install-${String(i).padStart(2, '0')}`}
                aspect="four-five"
              />
              <Caption className="text-mute">
                {[
                  'Whitefield, Bangalore',
                  'Salt Lake, Kolkata',
                  'Patia, Bhubaneswar',
                  'Kasba, Kolkata',
                  'Sarjapur, Bangalore',
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
