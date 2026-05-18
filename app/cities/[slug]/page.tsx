import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { ServiceSection } from '@/components/sections/ServiceSection';
import { CITIES, PRIMARY_PHONE_HREF } from '@/content/site';
import { CITY_CONTENT } from '@/content/cities';
import { CASE_STUDIES } from '@/content/case-studies';
import { SOLUTIONS } from '@/content/solutions';
import { localBusinessSchema, breadcrumbSchema, jsonLd } from '@/lib/structured-data';

// Curated for residential city-page funnel — the four solutions homeowners actually act on.
const CITY_FEATURED_SOLUTIONS: Array<keyof typeof SOLUTIONS> = [
  'whole-house-water-filter',
  'bathroom-filter',
  'drinking-water-solution',
  'iron-filter',
];

export async function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const content = CITY_CONTENT[params.slug];
  if (!content) return { title: 'City' };
  return {
    title: `${content.name} \u2014 Water systems`,
    description: `UNIWATER water systems in ${content.name}, ${content.country}. ${content.lede}`,
  };
}

export default function CityDetailPage({ params }: { params: { slug: string } }) {
  const content = CITY_CONTENT[params.slug];
  if (!content) notFound();

  // Stub fallback for not-yet-fleshed-out cities — same template, lighter copy
  const isFull = content.fullContent;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            localBusinessSchema({ cityName: content.name, citySlug: content.slug }),
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Cities', url: '/cities' },
              { name: content.name, url: `/cities/${content.slug}` },
            ]),
          ]),
        }}
      />
      {/* Hero */}
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cities', href: '/cities' },
              { label: content.name },
            ]}
          />
        </div>
        <div className="container-uw">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-10 pb-16 lg:pt-12 lg:pb-24">
            <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="text-eyebrow font-medium uppercase text-teal">{content.country}</span>
              </div>
              <Display>UNIWATER in {content.name}.</Display>
              <Lede className="text-mute">{content.lede}</Lede>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                <Button href="/book-survey">Book a free survey</Button>
                <Button href={PRIMARY_PHONE_HREF} variant="tertiary">
                  Call us
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Photo
                description={`${content.name} cityscape or representative residential context`}
                assetRef={`city-${content.slug}-hero`}
                aspect="five-six"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Water context */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">The water</Eyebrow>
            <Heading level={2}>What {content.name} water actually looks like.</Heading>
          </div>
          <div className="lg:col-span-8 max-w-reading">
            <Body className="text-mute">{content.waterContext}</Body>
          </div>
        </div>
      </Section>

      {/* Localities */}
      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Service areas</Eyebrow>
          <Heading level={2}>Where we&rsquo;re active in {content.name}.</Heading>
          <Body className="text-mute mt-4">
            Not an exhaustive list. If your locality isn&rsquo;t mentioned, we likely still serve it &mdash; the survey response is the same.
          </Body>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {content.localities.map((locality) => (
            <div
              key={locality}
              className="border border-hairline bg-offwhite p-4 text-center"
            >
              <Caption className="text-ink font-medium">{locality}</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* Local team */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Photo
              description={`UNIWATER local team in ${content.name}, branded uniform, group portrait`}
              assetRef={`city-${content.slug}-team`}
              aspect="four-five"
            />
          </div>
          <div className="lg:col-span-7">
            <Eyebrow className="mb-4">The team</Eyebrow>
            <Heading level={2} className="mb-4">Local engineers. Not subcontracted.</Heading>
            <Body className="text-mute">{content.localTeam}</Body>
          </div>
        </div>
      </Section>

      {/* Real installs (when full content) */}
      {isFull && (
        <Section padding="default" tone="subtle">
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-4">Real installs</Eyebrow>
            <Heading level={2}>Recent installs in {content.name}.</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <Photo
                  description={`${content.name} install #${i} — finished home with UNIWATER system`}
                  assetRef={`city-${content.slug}-install-${i}`}
                  aspect="sixteen-nine"
                />
                <Caption className="text-mute">
                  {content.localities[i - 1] || content.name}
                </Caption>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Systems we install here — funnel from city → solutions. */}
      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Systems we install here</Eyebrow>
          <Heading level={2}>What goes into a {content.name} home, typically.</Heading>
          <Body className="text-mute mt-4">
            The right answer comes from the survey, not the catalogue. These are the four systems most commonly specified in {content.name}, in order of how often they appear on installation invoices.
          </Body>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CITY_FEATURED_SOLUTIONS.map((slug) => {
            const solution = SOLUTIONS[slug];
            return (
              <Link
                key={slug}
                href={`/solutions/${slug}`}
                className="group block bg-offwhite border border-hairline p-6 transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)]"
              >
                {solution.wordmark && (
                  <div className="text-eyebrow font-medium uppercase text-teal mb-2">
                    {solution.wordmark}
                  </div>
                )}
                <h3 className="text-h3 font-semibold text-navy mb-3">{solution.navLabel}</h3>
                <Caption className="text-mute">{solution.shortHeadline}</Caption>
                <div className="mt-4 flex items-center gap-2 text-teal text-caption font-medium">
                  <span>See solution</span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Nearest case study — same-country published reference. Falls back silently. */}
      {(() => {
        const sameCountry = CASE_STUDIES.filter(
          (c) => c.fullDetail && c.city.toLowerCase().includes(content.name.toLowerCase()),
        );
        const elsewhereInCountry = CASE_STUDIES.filter(
          (c) =>
            c.fullDetail &&
            !c.city.toLowerCase().includes(content.name.toLowerCase()) &&
            ((content.country === 'India' && !c.city.toLowerCase().includes('nepal')) ||
              (content.country === 'Nepal' && c.city.toLowerCase().includes('nepal'))),
        );
        const featured = sameCountry[0] ?? elsewhereInCountry[0];
        if (!featured) return null;
        const inThisCity = sameCountry[0] != null;
        return (
          <Section padding="default">
            <div className="border border-hairline bg-offwhite p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <div className="text-eyebrow font-medium uppercase text-teal mb-3">
                  {inThisCity ? `Case study in ${content.name}` : `Published case study — ${content.country}`}
                </div>
                <h3 className="text-h3 font-semibold text-navy mb-2">{featured.client}</h3>
                <Caption className="text-mute">{featured.outcome}</Caption>
              </div>
              <Link
                href={`/case-studies/${featured.slug}`}
                className="inline-flex items-center gap-2 text-teal text-caption font-medium whitespace-nowrap"
              >
                <span>Read case study</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </Section>
        );
      })()}

      <ServiceSection />

      <FinalCTA
        headline={`Ready for a free survey in ${content.name}?`}
        sub="A UNIWATER engineer will visit, test your water, and respond within one business day."
      />
    </>
  );
}
