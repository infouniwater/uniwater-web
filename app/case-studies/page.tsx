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
  openGraph: {
    images: [{ url: '/og/og-case-studies.jpg', width: 1200, height: 630, alt: '' }],
  },
  twitter: {
    images: ['/og/og-case-studies.jpg'],
  },
};

export default function CaseStudiesIndex() {
  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[440px] md:h-[520px] lg:h-[calc(100vh-220px)] lg:min-h-[460px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/industrial-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/industrial-tablet.jpg" />
          <img
            src="/images/hero/industrial-mobile.jpg"
            alt="A Uniwater commercial RO and softening plant installed on a factory warehouse floor."
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
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Case studies</p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Where Uniwater systems run today.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Seven case studies published so far &mdash; two healthcare campuses, three manufacturing plants, a premium residential development bought outright, and the first on Clean Water as a Service subscription. More are being written up as real detail comes in.
            </p>
          </div>
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
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-eyebrow font-medium uppercase text-teal">{cs.sector}</span>
                  <span className="text-mute">&middot;</span>
                  <span className="text-caption text-mute">{cs.city}</span>
                  {cs.model === 'subscription' && (
                    <span className="text-[11px] font-ui font-medium uppercase tracking-wide text-navy bg-tint/60 border border-teal/30 rounded-full px-2.5 py-0.5">
                      Subscription
                    </span>
                  )}
                </div>
                <h3 className="font-sans text-h2-m font-light text-navy">{cs.client}</h3>
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
