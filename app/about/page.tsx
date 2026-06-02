import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, EditorialAccent, Caption } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { StatTile } from '@/components/ui/Card';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CitiesSection } from '@/components/sections/CitiesSection';
import { NAMED_CLIENTS, CLIENT_LOGOS, STATS, SITE } from '@/content/site';
import Image from 'next/image';

export const metadata: Metadata = buildMetadata({
  path: '/about',
  title: 'About Uniwater',
  description:
    'A water company built for premium homes. Founded 2020 in Kolkata. Now in 9 cities across India and Nepal.',
  image: '/og/og-about.png',
});

const MILESTONES = [
  { year: '2020', body: 'Founded in Kolkata.' },
  { year: '2021', body: 'First commercial installs in West Bengal.' },
  { year: '2023', body: 'Expanded to Bhubaneswar, Ranchi, Rourkela.' },
  { year: '2024', body: 'Crossed 100 commercial installs. Opened Nepal operations in Kathmandu and Biratnagar.' },
  { year: '2025', body: 'Reached 200+ residential homes serviced across India and Nepal.' },
  { year: '2026', body: '110-SKU catalogue published. Marketing site relaunch; customer portal under development as a separate product.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — image-with-scrim editorial register. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[560px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/terrace-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/terrace-tablet.jpg" />
          <img
            src="/images/hero/terrace-mobile.jpg"
            alt="Three Uniwater whole-house vessels installed on a residential terrace at sunset."
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
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">About</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              A water company built for premium homes.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Founded in Kolkata in {STATS.founded}. Now in {STATS.citiesTotal} cities across India and Nepal. We design, install, and service water systems for the homes you don&rsquo;t get to redo.
            </p>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">A note from the team</Eyebrow>
            <Caption className="text-mute italic mt-2">
              The story behind the company. Founder portrait + signed attribution land here in the next content update.
            </Caption>
          </div>
          <div className="lg:col-span-8 max-w-reading">
            <EditorialAccent className="mb-8">
              Customers were spending lakhs on premium fittings, then handing the water itself to whichever local plumber the architect knew.
            </EditorialAccent>
            <div className="flex flex-col gap-5">
              <Body className="text-mute">
                Kitchen got an Aquaguard or Kent. Bathroom got nothing. Two years later the geyser was scaled, the marble had an orange line, the Hansgrohe shower was dulling &mdash; and nobody quite knew why.
              </Body>
              <Body className="text-mute">
                The fix isn&rsquo;t a better kitchen RO. It&rsquo;s a survey before the sale, a system sized to the house, and an engineer who comes back every month. That&rsquo;s the company we built in 2020. Same one today.
              </Body>
              <Caption className="text-mute italic mt-4">
                &mdash; The Uniwater team
              </Caption>
            </div>
          </div>
        </div>
      </Section>

      {/* Traction stats — flipped DARK for alternation. */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>By the numbers</Eyebrow>
          <Heading level={2} inverse>Six years in. Compounding.</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatTile inverse value={STATS.homesServiced} label="Homes serviced" />
          <StatTile inverse value={STATS.installations} label="Commercial installations" />
          <StatTile inverse value={String(STATS.citiesTotal)} label="Cities served" />
          <StatTile inverse value={String(STATS.skus)} label="Engineered configurations" />
        </div>
      </Section>

      {/* Timeline */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Timeline</Eyebrow>
          <Heading level={2}>Where we&rsquo;ve been.</Heading>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <ol className="border-l border-hairline">
              {MILESTONES.map((m) => (
                <li key={m.year} className="pl-8 pb-10 relative">
                  <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-teal" aria-hidden="true" />
                  <div className="text-h3 font-medium text-navy">{m.year}</div>
                  <Body className="text-mute mt-2">{m.body}</Body>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <Photo
              description="Team or office photograph — Uniwater operations in Kolkata"
              assetRef="team-office"
              aspect="five-six"
              mobileAspect="sixteen-nine"
            />
          </div>
        </div>
      </Section>

      {/* Clients — flipped DARK for alternation. */}
      <Section tone="navy" padding="default" image={{ stem: 'industrial' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Selected clients</Eyebrow>
          <Heading level={2} inverse>Where Uniwater systems run today.</Heading>
          <Body inverse className="text-offwhite/80 mt-2">
            Hospitals, hotels, factories, schools, universities, premium residential complexes. A partial list, in no particular order:
          </Body>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-4">
          {NAMED_CLIENTS.map((client) => {
            const logo = CLIENT_LOGOS[client];
            return (
              <div
                key={client}
                className="aspect-[3/2] border border-hairline bg-offwhite flex items-center justify-center p-4"
                aria-label={logo.alt}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(min-width: 640px) 20vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Mission / values */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">Mission</Eyebrow>
            <Heading level={2}>What we&rsquo;re here to do.</Heading>
          </div>
          <div className="lg:col-span-8 max-w-reading flex flex-col gap-5">
            <Body className="text-mute">
              To make clean water effortless, dependable, and sustainable for every home, institution, and business we serve &mdash; by combining engineering, automation, and service into a single long-term partnership.
            </Body>
            <Body className="text-mute">
              We measure success not by units shipped, but by AMC retention. The customer whose water has been right for five years is the customer we&rsquo;re building for.
            </Body>
          </div>
        </div>
      </Section>

      <CitiesSection />

      <FinalCTA />
    </>
  );
}
