import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CASE_STUDIES } from '@/content/case-studies';

const SECTOR_PHOTO: Record<string, { src: string; alt: string }> = {
  Healthcare: {
    src: '/images/photography/wtp-basement.jpg',
    alt: 'A Uniwater water treatment plant installed in a healthcare facility plant room',
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
    src: '/images/photography/wtp-terrace.jpg',
    alt: 'A Uniwater water treatment plant on the rooftop of a hospitality property',
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
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-4">Testimonials</Eyebrow>
          <Display>What customers say.</Display>
          <Lede className="text-mute mt-6">
            The attributions below come from published case studies. Customers who have agreed to be named, in their own words, on the record. The wider review set, sourced from every install handover, is being collected systematically and will surface here as it lands.
          </Lede>
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
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-4">How reviews arrive</Eyebrow>
            <Heading level={2} className="mb-6">Collected at handover. Verified before publication.</Heading>
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4">
              <Body className="text-mute">
                Every install handover ends the same way: a written review request, with permission asked separately for naming and for using the response on this page. No incentive, no template &mdash; the customer&rsquo;s words, edited only for length where they consent.
              </Body>
              <Body className="text-mute">
                Reviews that name a person, organisation, or city are confirmed with that party before they appear here. Reviews that prefer to stay anonymous are published with sector and city only. The intent is what reads above: real homeowners and institutions, on the record, in their own language.
              </Body>
              <EditorialAccent className="mt-4">
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
