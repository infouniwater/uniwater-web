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
import { CityWaterTable } from '@/components/sections/CityWaterTable';
import { FaqSection } from '@/components/sections/FaqSection';
import { CITIES, PRIMARY_PHONE_HREF } from '@/content/site';
import { CITY_CONTENT } from '@/content/cities';
import { CITY_FAQS } from '@/content/faqs';
import { CASE_STUDIES } from '@/content/case-studies';
import { SOLUTIONS, SOLUTION_SEO } from '@/content/solutions';
import { localBusinessSchema, breadcrumbSchema, jsonLd } from '@/lib/structured-data';
import { buildMetadata, resolveOgImage } from '@/lib/seo';

// City-page funnel: every residential solution the homeowner can pick.
const CITY_FEATURED_SOLUTIONS: Array<keyof typeof SOLUTIONS> = [
  'whole-house-water-filter',
  'bathroom-filter',
  'drinking-water-solution',
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
  return buildMetadata({
    path: `/cities/${content.slug}`,
    title: `Water Softener & Iron Filter in ${content.name}`,
    description: `Water softeners, iron-removal filters, and RO drinking-water systems in ${content.name}, ${content.country} \u2014 surveyed before sold and serviced monthly by Uniwater\u2019s local team.`,
    image: resolveOgImage(content.slug, 'cities'),
  });
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
            localBusinessSchema({ cityName: content.name, citySlug: content.slug, localities: content.localities }),
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Cities', url: '/cities' },
              { name: content.name, url: `/cities/${content.slug}` },
            ]),
          ]),
        }}
      />
      {/* Breadcrumb strip */}
      <div className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-4 pb-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cities', href: '/cities' },
              { label: content.name },
            ]}
          />
        </div>
      </div>

      {/* Hero — image-with-scrim editorial register. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[560px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
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
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">{content.country}</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Uniwater in {content.name}.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">{content.lede}</p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href="/book-survey"
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Book a free survey
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a href={PRIMARY_PHONE_HREF} className="group inline-flex self-start sm:self-center text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full">
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Call us
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M5.5 4.5C5.5 4.5 7 4 8 4C8.5 4 9 4.5 9 5L9.5 7.5C9.5 8 9.5 8.5 9 9L7.5 10.5C8.5 13 11 15.5 13.5 16.5L15 15C15.5 14.5 16 14.5 16.5 14.5L19 15C19.5 15 20 15.5 20 16C20 17 19.5 18.5 19.5 18.5C19 19.5 18 20 17 20C10.5 20 4 13.5 4 7C4 6 4.5 5 5.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                </span>
              </a>
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

      {/* Per-locality water data — renders only for cities with seeded
          data (currently Kolkata); other cities render nothing here. */}
      <CityWaterTable citySlug={content.slug} cityName={content.name} />

      {/* Local team */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Photo
              description={`Uniwater local team in ${content.name}, branded uniform, group portrait`}
              assetRef={`city-${content.slug}-team`}
              aspect="four-five"
              mobileAspect="sixteen-nine"
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
                  description={`${content.name} install #${i} — finished home with Uniwater system`}
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
                  <span>See the {SOLUTION_SEO[slug].anchor}</span>
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
                <span>Read the {featured.client} case study</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </Section>
        );
      })()}

      {/* Page-local FAQ — renders + emits FAQPage JSON-LD only for cities
          with a seeded set (currently Kolkata). */}
      <FaqSection
        items={CITY_FAQS[content.slug] ?? []}
        heading={`Water questions, answered for ${content.name}.`}
        inverse
        imageStem="utility"
      />

      <ServiceSection />

      <FinalCTA
        headline={`Ready for a free survey in ${content.name}?`}
        sub="A Uniwater engineer will visit, test your water, and respond within one business day."
      />
    </>
  );
}
