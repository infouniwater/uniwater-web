import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CASE_STUDIES } from '@/content/case-studies';

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Where Uniwater systems run today. Selected installations across healthcare, hospitality, education, manufacturing, and premium residential.',
};

export default function CaseStudiesIndex() {
  return (
    <>
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-4">Case studies</Eyebrow>
          <Display>Where Uniwater systems run today.</Display>
          <Lede className="text-mute mt-6">
            Six case studies published so far &mdash; two healthcare campuses, three manufacturing plants, and a premium residential development. More installations across hospitality and education are being written up.
          </Lede>
        </div>
      </section>

      <Section padding="default">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.filter((cs) => cs.fullDetail).map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group block bg-offwhite border border-hairline transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)]"
            >
              <Photo
                description={`${cs.client} install — ${cs.sector.toLowerCase()} sector, ${cs.city}`}
                assetRef={`case-${cs.slug}`}
                aspect="sixteen-ten"
              />
              <div className="p-8 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-eyebrow font-medium uppercase text-teal">{cs.sector}</span>
                  <span className="text-mute">&middot;</span>
                  <span className="text-caption text-mute">{cs.city}</span>
                </div>
                <h3 className="text-h2-m font-light text-navy">{cs.client}</h3>
                <Body className="text-mute">{cs.outcome}</Body>
                <div className="mt-2 flex items-center gap-2 text-teal text-caption font-medium">
                  <span>Read case study</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Caption className="text-mute mt-12 text-center">
          Ask us about a project in your sector.
        </Caption>
      </Section>

      <FinalCTA
        audience="industrial"
        headline="Have a similar challenge?"
        sub="Submit an RFQ with site details and we'll respond within one business day."
      />
    </>
  );
}
