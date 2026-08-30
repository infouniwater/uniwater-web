import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { JsonLd } from '@/components/ui/JsonLd';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { serviceSchema, breadcrumbSchema } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import { PRIMARY_PHONE, PRIMARY_PHONE_HREF } from '@/content/site';
import { CASE_STUDIES } from '@/content/case-studies';
import {
  AUDIENCE_TRACKS,
  PILLARS,
  SERVICE_LINES,
  PROCESS_STEPS,
  HOMES_ON_SOFT_WATER,
  HOMES_ON_IRON_FREE_WATER,
  getProofForTrack,
  type WaterLineSlug,
} from '@/content/cwaas';

/**
 * /clean-water-as-a-service/residential-societies
 *
 * Site-survey critical fix (Zone B / Finding 4). The residential-societies
 * audience previously existed only as #for-residential-societies, an anchor
 * on the general CWaaS page -- fine for cross-linking, useless for ranking
 * "water treatment subscription for housing society" or for use as an ad
 * landing page. This is that page: a real URL with its own title and
 * description, built entirely from the existing
 * AUDIENCE_TRACKS['residential-societies'] record in content/cwaas.ts so
 * nothing here can drift from the data the parent page already uses.
 *
 * Deliberately leaner than the parent page: only the three water lines this
 * track actually uses (soft, iron-free, drinking) and only its own two
 * proof sites -- not a full duplicate of the five-line, three-audience
 * page, which would read as thin/duplicate content to search engines.
 *
 * The old anchor on the parent page is untouched; Header.tsx and
 * /residential now point here instead (see accompanying edits).
 */

const TRACK = AUDIENCE_TRACKS.find((t) => t.slug === 'residential-societies')!;
const PROOF_SITES = getProofForTrack(TRACK);
const RELEVANT_LINES = SERVICE_LINES.filter((line) =>
  TRACK.lines.includes(line.slug as WaterLineSlug)
);

const TITLE = 'Water Treatment Subscription for Housing Societies | Uniwater';
const DESCRIPTION =
  'Clean Water as a Service for residential societies and gated communities. Uniwater designs, funds, owns, and runs the plant — soft, iron-free, and drinking water held to spec, on one monthly bill. Zero capex for the committee. Live at 2 Kolkata societies, 404 flats.';

export const metadata: Metadata = buildMetadata({
  path: '/clean-water-as-a-service/residential-societies',
  title: TITLE,
  description: DESCRIPTION,
  image: '/og/og-clean-water-as-a-service.jpg',
});

export default function ResidentialSocietiesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Clean Water as a Service for Residential Societies',
            description: DESCRIPTION,
            url: '/clean-water-as-a-service/residential-societies',
            steps: PROCESS_STEPS.map((s) => ({
              name: s.title.replace(/\.$/, ''),
              text: s.body,
            })),
          }),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Clean Water as a Service', url: '/clean-water-as-a-service' },
            { name: 'Residential Societies', url: '/clean-water-as-a-service/residential-societies' },
          ]),
        ]}
      />

      {/* Breadcrumb -- sits above the dark hero. */}
      <div className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-4 pb-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Clean Water as a Service', href: '/clean-water-as-a-service' },
              { label: 'Residential Societies' },
            ]}
          />
        </div>
      </div>

      {/* Hero -- reuses the plant-room image set from the parent CWaaS
          page; no dedicated society-exterior asset exists yet. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[480px] md:h-[560px] lg:h-[calc(100vh-160px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/plant-room-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/plant-room-tablet.jpg" />
          <img
            src="/images/hero/plant-room-mobile.jpg"
            alt="A Uniwater building water-treatment plant in a basement plant room with stainless vessels and overhead piping."
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.94) 0%, rgba(4,69,95,0.78) 45%, rgba(4,69,95,0.30) 90%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 50%, rgba(4,69,95,0.25) 80%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[780px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
              Clean Water as a Service · {TRACK.eyebrow}
            </p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.25rem)] font-medium leading-[1.15] max-w-[20ch] [text-wrap:balance]">
              {TRACK.headline}
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">{TRACK.body}</p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href={TRACK.ctaHref}
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                {TRACK.ctaLabel}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={PRIMARY_PHONE_HREF}
                className="group inline-flex self-start sm:self-center text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full"
              >
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Or call {PRIMARY_PHONE}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The model, in committee terms. */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>Why societies choose this</Eyebrow>
          <Heading level={2}>The committee stops firefighting the plant.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.title} className="bg-offwhite p-8 flex flex-col gap-3">
              <Eyebrow className="text-teal">{String(i + 1).padStart(2, '0')}</Eyebrow>
              <h3 className="font-sans text-h3 font-normal text-navy [text-wrap:balance]">{pillar.title}</h3>
              <Body className="text-mute">{pillar.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Proof -- the two named societies, and the derived stats. Site cards
          below carry each site's own real water line and volume/capacity;
          this heading states the combined flat count only -- it doesn't
          blend the two different water lines into one figure, since BSM
          runs soft and Starwood runs iron-free, at different capacities. */}
      <Section padding="default" tone="subtle">
        <div className="mb-10 max-w-3xl flex flex-col gap-4">
          <Eyebrow>Already running</Eyebrow>
          <Heading level={2}>
            {HOMES_ON_SOFT_WATER + HOMES_ON_IRON_FREE_WATER} flats, two Kolkata societies, on contract today.
          </Heading>
          <Body className="text-mute mt-2">
            {HOMES_ON_SOFT_WATER} flats on managed soft water, {HOMES_ON_IRON_FREE_WATER} on managed
            iron-free water — real deployments under contract, not projections.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROOF_SITES.map((site) => {
            // Slugs are shared between LIVE_SITES and CASE_STUDIES by
            // design (see content/case-studies.ts) -- when a full case
            // study exists for this site, link to it instead of just
            // stating the facts inline. Closes the "two proof ledgers"
            // gap from the site survey for whichever sites have one.
            const caseStudy = CASE_STUDIES.find((cs) => cs.slug === site.slug && cs.fullDetail);
            return (
              <Card key={site.slug}>
                <div className="flex flex-col gap-3">
                  <Caption className="text-mute uppercase tracking-wide">
                    {site.city}, {site.country}
                  </Caption>
                  <h3 className="font-sans text-h3 font-normal text-navy leading-snug [text-wrap:balance]">
                    {site.name}
                  </h3>
                  <Body className="text-mute">{site.context}</Body>
                  {site.volume && <Caption className="text-navy font-medium mt-1">{site.volume}</Caption>}
                  {caseStudy && (
                    <Link
                      href={`/case-studies/${caseStudy.slug}`}
                      className="inline-flex items-center gap-2 text-teal text-caption font-medium hover:text-navy transition-colors duration-200 ease-calm mt-2 pt-3 border-t border-hairline"
                    >
                      Read the full case study
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Water lines relevant to societies only -- not the full five. */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>For your society</Eyebrow>
          <Heading level={2}>Three lines cover a residential complex end to end.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RELEVANT_LINES.map((line) => (
            <div
              key={line.slug}
              className={`bg-offwhite p-6 md:p-7 flex flex-col gap-4 ${
                line.featured ? 'border-2 border-teal bg-tint/30' : 'border border-hairline'
              }`}
            >
              <Eyebrow className={line.featured ? 'text-teal' : ''}>{line.name}</Eyebrow>
              <h3 className="font-sans text-h3 font-normal text-navy leading-snug [text-wrap:balance]">
                {line.promise}
              </h3>
              <div className="mt-1 pt-4 border-t border-hairline">
                <Caption className="text-mute uppercase tracking-wide block mb-2">We guarantee</Caption>
                <ul className="flex flex-col gap-1.5">
                  {line.guarantee.map((g) => (
                    <li key={g} className="flex gap-2 text-caption text-ink">
                      <span className="text-teal shrink-0">—</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Process -- same 4 steps every CWaaS track uses. */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>How it works</Eyebrow>
          <Heading level={2} inverse>
            Survey to running water, one decision at a time.
          </Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-4">
              <div className="text-[56px] md:text-[64px] font-light leading-none text-soft font-numeric">
                {step.n}
              </div>
              <Heading level={3} inverse>
                {step.title}
              </Heading>
              <Body inverse className="text-offwhite/80">
                {step.body}
              </Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Would rather own it? Bridge to the AMC path -- same "own vs
          subscribe" framing used sitewide, since some committees will. */}
      <Section padding="default" tone="tint">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <Eyebrow>The other option</Eyebrow>
            <Heading level={3}>Some committees would rather own the plant and take an AMC.</Heading>
            <Body className="text-mute">
              We build both ways. If a capex purchase with an annual maintenance
              contract fits your society better than a subscription, we&rsquo;ll
              quote it alongside this so you can compare on a per-litre basis.
            </Body>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/industrial"
              className="inline-flex items-center gap-2 whitespace-nowrap bg-navy text-offwhite font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 py-3.5 transition-colors duration-200 ease-calm hover:bg-navy/85"
            >
              Compare buy &amp; AMC
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </Section>

      <FinalCTA
        headline="Get a free water survey for your society."
        sub="One business day to an engineer assignment; five working days to a site survey and water analysis. The survey is free; you only pay if the committee decides to subscribe."
        primaryCTA={{ label: TRACK.ctaLabel, href: TRACK.ctaHref }}
      />
    </>
  );
}
