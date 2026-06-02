import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CASE_STUDIES } from '@/content/case-studies';

const SECTOR_PHOTO: Record<string, { src: string; alt: string }> = {
  Healthcare: {
    src: '/images/photography/commercial-ro-industrial-shed.jpg',
    alt: 'A Uniwater commercial RO and softening plant installed at a healthcare facility',
  },
  Manufacturing: {
    src: '/images/installs/hero-duo-iron-softener-ss316.jpg',
    alt: 'A Uniwater iron filter and softener duo in SS316 vessels — manufacturing-grade install',
  },
  Residential: {
    src: '/images/photography/residential-complex.jpg',
    alt: 'A premium residential complex at dusk — representative of the gated communities and luxury residences Uniwater services',
  },
  Hospitality: {
    src: '/images/photography/commercial-ro-rooftop-enclosure.jpg',
    alt: 'A Uniwater commercial RO plant in a rooftop enclosure at a hospitality property',
  },
};
const FALLBACK_PHOTO = {
  src: '/images/installs/hero-duo-iron-softener-ss316.jpg',
  alt: 'A representative Uniwater commercial install',
};

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'What Uniwater customers say. Real homeowners and institutions, real installs, real cities.',
};

// Derived from published case studies — keeps testimonials and case-study
// quotes from drifting. As the post-install collection flow lands, additional
// testimonials will surface here alongside these.
const CASE_STUDY_QUOTES = CASE_STUDIES.filter((cs) => cs.body && cs.testimonial).map((cs) => ({
  quote: cs.body!.quote,
  name: cs.testimonial!.name,
  org: cs.testimonial!.org,
  city: cs.testimonial!.city,
  sector: cs.sector,
  caseStudySlug: cs.slug,
}));

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[420px] md:h-[500px] lg:h-[calc(100vh-240px)] lg:min-h-[440px] border-b border-offwhite/10">
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
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Testimonials</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">What customers say.</h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Named customers, in their own words, on the record. Drawn from published case studies; the wider review set is collected systematically at every handover.
            </p>
          </div>
        </div>
      </section>

      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">From the case studies</Eyebrow>
          <Heading level={2}>Named, on the record.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {CASE_STUDY_QUOTES.map((t) => {
            const photo = SECTOR_PHOTO[t.sector] ?? FALLBACK_PHOTO;
            return (
            <div
              key={t.caseStudySlug}
              className="h-full border border-hairline bg-offwhite flex flex-col"
            >
              <div className="relative w-full overflow-hidden border-b border-hairline" style={{ aspectRatio: '16 / 9' }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
              <EditorialAccent className="text-h3 leading-snug">
                &ldquo;{t.quote}&rdquo;
              </EditorialAccent>
              <div className="pt-5 mt-auto border-t border-hairline flex flex-col gap-1">
                <Caption className="text-navy font-medium">{t.name}</Caption>
                <Caption className="text-mute">{t.org}</Caption>
                <Caption className="text-mute">{t.city}</Caption>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-eyebrow font-medium uppercase text-teal">{t.sector}</span>
                  <span className="text-mute/50">/</span>
                  <Link
                    href={`/case-studies/${t.caseStudySlug}`}
                    className="text-caption text-teal hover:underline underline-offset-4 transition-colors duration-200 ease-calm"
                  >
                    Full case study &rarr;
                  </Link>
                </div>
              </div>
              </div>
            </div>
            );
          })}
        </div>
      </Section>

      {/* The collection discipline — replaces the old "Placeholder content" label
          with an explanation of how reviews actually arrive. */}
      <Section tone="navy" padding="default" image={{ stem: 'utility' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow inverse>How reviews arrive</Eyebrow>
            <Heading level={2} inverse>Collected at handover. Verified before publication.</Heading>
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              <Body inverse>
                Every install handover ends the same way: a written review request, with permission asked separately for naming and for using the response on this page. No incentive, no template &mdash; the customer&rsquo;s words, edited only for length where they consent.
              </Body>
              <Body inverse>
                Reviews that name a person, organisation, or city are confirmed with that party before they appear here. Reviews that prefer to stay anonymous are published with sector and city only. The intent is what reads above: real homeowners and institutions, on the record, in their own language.
              </Body>
              <EditorialAccent inverse className="mt-4">
                Named. On the record. Or not at all.
              </EditorialAccent>
            </div>
          </div>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
