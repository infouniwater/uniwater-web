import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Photo } from '@/components/ui/Photo';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CASE_STUDIES } from '@/content/case-studies';
import { breadcrumbSchema, jsonLd } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return CASE_STUDIES.filter((cs) => cs.fullDetail).map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug);
  if (!cs) return { title: 'Case study' };
  return buildMetadata({
    path: `/case-studies/${cs.slug}`,
    title: `${cs.client} \u2014 Case study`,
    description: cs.brief ?? `Uniwater case study: ${cs.client}.`,
    image: '/og/og-home.png',
  });
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const cs = CASE_STUDIES.find((c) => c.slug === params.slug);
  if (!cs || !cs.fullDetail || !cs.body) notFound();
  const content = cs.body;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Case studies', url: '/case-studies' },
              { name: cs.client, url: `/case-studies/${cs.slug}` },
            ]),
          ),
        }}
      />
      {/* Breadcrumb strip */}
      <div className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-4 pb-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Case studies', href: '/case-studies' },
              { label: cs.client },
            ]}
          />
        </div>
      </div>

      {/* Hero — image-with-scrim editorial register. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[440px] md:h-[540px] lg:h-[calc(100vh-220px)] lg:min-h-[480px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/industrial-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/industrial-tablet.jpg" />
          <img src="/images/hero/industrial-mobile.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">{cs.sector}</span>
              <span className="text-offwhite/40">&middot;</span>
              <span className="text-caption text-offwhite/70">{cs.city}</span>
            </div>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.1] max-w-[22ch] [text-wrap:balance]">
              {cs.client}
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">{cs.outcome}</p>
          </div>
        </div>
      </section>

      {/* Brief */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">Brief</Eyebrow>
            <Heading level={2}>The job, in one paragraph.</Heading>
          </div>
          <div className="lg:col-span-8 max-w-reading">
            <Body className="text-mute">{content.brief}</Body>
          </div>
        </div>
      </Section>

      {/* Challenge */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">The challenge</Eyebrow>
            <Heading level={2}>What needed fixing.</Heading>
          </div>
          <div className="lg:col-span-8 max-w-reading">
            <Body className="text-mute">{content.challenge}</Body>
          </div>
        </div>
      </Section>

      {/* Solution */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-4">The solution</Eyebrow>
            <Heading level={2}>What we built.</Heading>
          </div>
          <div className="lg:col-span-8 max-w-reading">
            <Body className="text-mute">{content.solution}</Body>
          </div>
        </div>
      </Section>

      {/* Outcomes */}
      <Section padding="default" tone="navy" image={{ stem: 'industrial' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Outcomes</Eyebrow>
          <Heading level={2} inverse>By the numbers, after handover.</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {content.outcomes.map((o) => (
            <div key={o.label} className="flex flex-col gap-2">
              <div className="text-[40px] md:text-[48px] font-light leading-none text-soft">
                {o.value}
              </div>
              <div className="h-px w-12 bg-offwhite/30" />
              <Caption inverse className="uppercase tracking-wide text-eyebrow font-medium">
                {o.label}
              </Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* Quote */}
      <Section padding="default">
        <div className="max-w-reading mx-auto text-center">
          <EditorialAccent className="mx-auto">&ldquo;{content.quote}&rdquo;</EditorialAccent>
          <Caption className="text-mute mt-6">&mdash; {content.attribution}</Caption>
        </div>
      </Section>

      {/* Photo gallery placeholder */}
      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Photographs</Eyebrow>
          <Heading level={2}>On site.</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Photo
              key={i}
              description={`${cs.client} install photo #${i}`}
              assetRef={`case-${cs.slug}-${i}`}
              aspect="sixteen-nine"
            />
          ))}
        </div>
      </Section>

      {/* Related case studies — same sector, current excluded. Detail-rendered only. */}
      {(() => {
        const related = CASE_STUDIES.filter(
          (other) => other.sector === cs.sector && other.slug !== cs.slug && other.fullDetail,
        );
        if (related.length === 0) return null;
        // Constrain width when only one match so a lone card doesn't span the full row.
        const gridClass =
          related.length === 1
            ? 'grid grid-cols-1 gap-6 max-w-xl'
            : 'grid grid-cols-1 md:grid-cols-2 gap-6';
        return (
          <Section padding="default">
            <div className="mb-12 max-w-3xl">
              <Eyebrow className="mb-4">Related case studies</Eyebrow>
              <Heading level={2}>Other {cs.sector.toLowerCase()} installations.</Heading>
            </div>
            <div className={gridClass}>
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/case-studies/${rel.slug}`}
                  className="group block bg-offwhite border border-hairline p-6 md:p-8 transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-eyebrow font-medium uppercase text-teal">{rel.sector}</span>
                    <span className="text-mute">&middot;</span>
                    <span className="text-caption text-mute">{rel.city}</span>
                  </div>
                  <h3 className="font-sans text-h3 font-semibold text-navy mb-3">{rel.client}</h3>
                  <Body className="text-mute text-caption">{rel.outcome}</Body>
                  <div className="mt-5 flex items-center gap-2 text-teal text-caption font-medium">
                    <span>Read case study</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        );
      })()}

      <FinalCTA
        audience="industrial"
        headline="Have a similar challenge?"
        sub="Submit an RFQ with your site details. We'll respond within one business day."
      />
    </>
  );
}
