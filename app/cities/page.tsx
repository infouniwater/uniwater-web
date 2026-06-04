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
  openGraph: {
    images: [{ url: '/og/og-cities.jpg', width: 1200, height: 630, alt: '' }],
  },
  twitter: {
    images: ['/og/og-cities.jpg'],
  },
};

export default function CitiesIndex() {
  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[400px] md:h-[480px] lg:h-[calc(100vh-260px)] lg:min-h-[420px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/terrace-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/terrace-tablet.jpg" />
          <img src="/images/hero/terrace-mobile.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Where we work</p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[19ch] [text-wrap:balance]">Nine cities. Own teams.</h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Every Uniwater survey, install, and monthly service visit is delivered by our own engineers. No subcontracting after the sale.
            </p>
          </div>
        </div>
      </section>

      {/* Map section sits LIGHT so the dark hero is followed by light
          (cardinal rule). NineCityMap is designed for a navy canvas,
          so it sits in a navy panel inside the light section. */}
      <Section padding="default">
        <div className="max-w-5xl mx-auto bg-navy border border-hairline p-6 md:p-8">
          <NineCityMap />
        </div>
      </Section>

      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-12 flex flex-col gap-4">
          <Eyebrow inverse>India</Eyebrow>
          <Heading level={2} inverse>Seven cities, growing.</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.filter((c) => c.country === 'India').map((c) => {
            const content = CITY_CONTENT[c.slug];
            return (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="group block bg-navy/30 border border-offwhite/15 p-8 transition-all duration-200 ease-calm hover:-translate-y-1 hover:bg-navy/60"
              >
                <Eyebrow inverse className="mb-3">{c.country}</Eyebrow>
                <h3 className="font-sans text-h2-m font-light text-offwhite mb-3">{c.name}</h3>
                {content && <Caption inverse>{content.lede}</Caption>}
                <div className="mt-6 flex items-center gap-2 text-soft text-caption font-medium">
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

      <Section padding="default" tone="subtle">
        <div className="mb-12 flex flex-col gap-4">
          <Eyebrow>Nepal</Eyebrow>
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
                <h3 className="font-sans text-h2-m font-light text-navy mb-3">{c.name}</h3>
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
