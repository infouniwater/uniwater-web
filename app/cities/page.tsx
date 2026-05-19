import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { NineCityMap } from '@/components/ui/NineCityMap';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CITIES } from '@/content/site';
import { CITY_CONTENT } from '@/content/cities';

export const metadata: Metadata = {
  title: 'Cities',
  description:
    'Where Uniwater operates: 7 cities across India and 2 in Nepal. Own service teams in every city, not subcontracted.',
};

export default function CitiesIndex() {
  return (
    <>
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-4">Where we work</Eyebrow>
          <Display>Nine cities. Own teams.</Display>
          <Lede className="text-mute mt-6">
            Every Uniwater survey, install, and monthly service visit is delivered by our own engineers. No subcontracting after the sale.
          </Lede>
        </div>
      </section>

      <Section tone="navy" padding="default">
        <div className="max-w-5xl mx-auto">
          <NineCityMap />
        </div>
      </Section>

      <Section padding="default" tone="subtle">
        <div className="mb-12">
          <Eyebrow className="mb-4">India</Eyebrow>
          <Heading level={2}>Seven cities, growing.</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.filter((c) => c.country === 'India').map((c) => {
            const content = CITY_CONTENT[c.slug];
            return (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="group block bg-offwhite border border-hairline p-8 transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)]"
              >
                <Eyebrow className="mb-3">{c.country}</Eyebrow>
                <h3 className="text-h2-m font-light text-navy mb-3">{c.name}</h3>
                {content && <Caption className="text-mute">{content.lede}</Caption>}
                <div className="mt-6 flex items-center gap-2 text-teal text-caption font-medium">
                  <span>City page</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section padding="default">
        <div className="mb-12">
          <Eyebrow className="mb-4">Nepal</Eyebrow>
          <Heading level={2}>Two cities. Growing fast.</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CITIES.filter((c) => c.country === 'Nepal').map((c) => {
            const content = CITY_CONTENT[c.slug];
            return (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="group block bg-offwhite border border-hairline p-8 transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)]"
              >
                <Eyebrow className="mb-3">{c.country}</Eyebrow>
                <h3 className="text-h2-m font-light text-navy mb-3">{c.name}</h3>
                {content && <Caption className="text-mute">{content.lede}</Caption>}
                <div className="mt-6 flex items-center gap-2 text-teal text-caption font-medium">
                  <span>City page</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
