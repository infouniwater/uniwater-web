import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Lede, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Card, StatTile } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { JsonLd } from '@/components/ui/JsonLd';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { serviceSchema, breadcrumbSchema } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import { PRIMARY_PHONE, PRIMARY_PHONE_HREF } from '@/content/site';
import {
  AUDIENCE_TRACKS,
  PILLARS,
  SERVICE_LINES,
  PROCESS_STEPS,
  LIVE_SITES,
  LIVE_SITES_COUNT,
  LIVE_COUNTRIES_COUNT,
  HOMES_ON_SOFT_WATER,
  SOFT_WATER_LAKH_LITRES_PER_DAY,
  STUDENTS_ON_DRINKING_WATER,
  DM_WATER_LAKH_LITRES_PER_MONTH,
  HERO_EYEBROW,
  HERO_TITLE,
  HERO_SUB,
  META_TITLE,
  META_DESCRIPTION,
  getProofForTrack,
  type WaterLineSlug,
} from '@/content/cwaas';

/**
 * /clean-water-as-a-service -- Uniwater's CWaaS landing.
 *
 * Audience: commercial / institutional buyers who would otherwise be
 * looking at a capex purchase. The page reframes that as an outcome
 * subscription: Uniwater owns the plant, runs it, and bills against an
 * SLA-backed water spec.
 *
 * All copy + data lives in content/cwaas.ts; markup here is presentation
 * only. Stats are DERIVED from LIVE_SITES rather than asserted, so the
 * page can't drift from the source data when sites are added / removed.
 *
 * CTA target: the existing /book-survey flow. Query string ?context=cwaas
 * is silently dropped by the form today; once the survey gains a context
 * field, that param will pre-tag the lead as CWaaS-intent.
 *
 * Cadence (restructured 2026-06-04 -- audience-led, proof-led):
 *   hero (D image-with-scrim) -> three audience tracks (L, the new lead:
 *   commercial / industrial / residential societies, each with named
 *   live sites) -> the model: three pillars (D) -> five water lines (L,
 *   Iron-Free foregrounded) -> process (D, image) -> deployments ledger
 *   + derived stats (L) -> monthly-visit differentiator (D) -> Final CTA
 *   (subtle).
 *
 * Why the reshuffle: the original cadence led with abstract pillars
 * ("zero capex / guaranteed to spec / fully managed") and buried the
 * proof at position 5. Per Rajat 2026-06-04, CWaaS sells to three
 * specific audiences (commercial, industrial, residential societies --
 * NOT individual homeowners), and the proof is what closes them.
 * Audience tracks at position 2 name the buyer in the first scroll
 * and show real deployments inline; pillars become "how the model
 * works" further down.
 */

const SURVEY_HREF = '/book-survey?context=cwaas';

const LINE_LABEL: Record<WaterLineSlug, string> = {
  drinking: 'Drinking',
  'iron-free': 'Iron-Free',
  soft: 'Soft',
  'ro-process': 'RO Process',
  dm: 'DM',
};

export const metadata: Metadata = buildMetadata({
  path: '/clean-water-as-a-service',
  title: META_TITLE,
  description: META_DESCRIPTION,
  image: '/og/og-home.png',
});

export default function CleanWaterAsAServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Clean Water as a Service',
            description: META_DESCRIPTION,
            url: '/clean-water-as-a-service',
            steps: PROCESS_STEPS.map((s) => ({
              name: s.title.replace(/\.$/, ''),
              text: s.body,
            })),
          }),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Industrial', url: '/industrial' },
            { name: 'Clean Water as a Service', url: '/clean-water-as-a-service' },
          ]),
        ]}
      />

      {/* Breadcrumb -- sits above the dark hero. */}
      <div className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-4 pb-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Industrial', href: '/industrial' },
              { label: 'Clean Water as a Service' },
            ]}
          />
        </div>
      </div>

      {/* Hero -- image-with-scrim editorial register. Same vocabulary as
          /industrial and the homepage. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[520px] md:h-[640px] lg:h-[calc(100vh-160px)] lg:min-h-[580px] border-b border-offwhite/10">
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
          <div className="w-full lg:max-w-[820px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
              {HERO_EYEBROW}
            </p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              {HERO_TITLE}
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-2xl">
              {HERO_SUB}
            </p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href={SURVEY_HREF}
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Book a free survey
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M5.5 4.5C5.5 4.5 7 4 8 4C8.5 4 9 4.5 9 5L9.5 7.5C9.5 8 9.5 8.5 9 9L7.5 10.5C8.5 13 11 15.5 13.5 16.5L15 15C15.5 14.5 16 14.5 16.5 14.5L19 15C19.5 15 20 15.5 20 16C20 17 19.5 18.5 19.5 18.5C19 19.5 18 20 17 20C10.5 20 4 13.5 4 7C4 6 4.5 5 5.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Audience tracks -- LIGHT band, three cards with inline proof.
          The new lead per Rajat 2026-06-04. Each track names the buyer
          (commercial / industrial / residential societies), pitches the
          deliverable in one sentence, then drops the actual live sites
          beneath it so the proof is in the first scroll, not buried
          five sections deep. */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>Who CWaaS is for</Eyebrow>
          <Heading level={2}>Three audiences. Three contracts. One model.</Heading>
          <Body className="text-mute mt-2">
            Clean Water as a Service is sold to commercial buyers,
            industrial buyers, and residential society management
            committees. Not to individual homeowners &mdash; for that we
            install BathSoft, HomeSoft, or a kitchen drinking-water
            system instead.
          </Body>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {AUDIENCE_TRACKS.map((track) => {
            const proof = getProofForTrack(track);
            return (
              <div
                key={track.slug}
                id={`for-${track.slug}`}
                className="border border-hairline bg-offwhite p-6 md:p-7 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-3">
                  <Eyebrow className="text-teal">{track.eyebrow}</Eyebrow>
                  <h3 className="text-h2-m font-light text-navy leading-snug [text-wrap:balance]">{track.headline}</h3>
                  <Body className="text-mute">{track.body}</Body>
                </div>

                <div className="pt-4 border-t border-hairline">
                  <Caption className="text-mute uppercase tracking-wide block mb-2">Water lines</Caption>
                  <div className="flex flex-wrap gap-2">
                    {track.lines.map((l) => (
                      <Link
                        key={l}
                        href={`#line-${l}`}
                        className="text-caption text-navy bg-subtle border border-hairline rounded-full px-3 py-1 hover:bg-tint/50 transition-colors duration-200 ease-calm"
                      >
                        {LINE_LABEL[l]}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline flex-grow">
                  <Caption className="text-mute uppercase tracking-wide block mb-3">Already running</Caption>
                  {proof.length > 0 ? (
                    <ul className="flex flex-col gap-2">
                      {proof.map((site) => (
                        <li key={site.slug} className="text-caption text-ink">
                          <span className="font-medium text-navy">{site.name}</span>
                          <span className="text-mute"> &mdash; {site.context}{site.volume ? `, ${site.volume}` : ''}</span>
                          <span className="text-mute"> ({site.city}, {site.country})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Caption className="text-mute italic">
                      First deployments signing now &mdash; we don&rsquo;t name reference sites that aren&rsquo;t live yet.
                    </Caption>
                  )}
                </div>

                <div className="pt-4 border-t border-hairline mt-auto">
                  <Link
                    href={track.ctaHref}
                    className="inline-flex items-center gap-2 text-teal text-caption font-medium hover:text-navy transition-colors duration-200 ease-calm"
                  >
                    {track.ctaLabel}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Pillars -- DARK band, three cards. The model in one screen.
          Moved DOWN from position 2 to position 3 as part of the
          2026-06-04 audience-led restructure -- it now answers "how
          does the model work" after the audience tracks have named
          the buyer. */}
      <Section tone="navy" padding="default" image={{ stem: 'utility' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>The model</Eyebrow>
          <Heading level={2} inverse>Three things change when water is a service.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-offwhite/15 border border-offwhite/15">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.title} className="bg-navy p-8 flex flex-col gap-3">
              <Eyebrow inverse>{String(i + 1).padStart(2, '0')}</Eyebrow>
              <h3 className="text-h3 font-normal text-offwhite [text-wrap:balance]">{pillar.title}</h3>
              <Body inverse className="text-offwhite/80">{pillar.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Service lines -- LIGHT band, five cards. Iron-Free foregrounded
          for the Bengal market via the featured: true flag in data. */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>The five lines</Eyebrow>
          <Heading level={2}>One contract. Five water lines, sized to what you need.</Heading>
          <Body className="text-mute mt-2">
            Drinking, iron-free, soft, RO process, and DM — each carries its
            own SLA, sized at survey to your demand and your supply chemistry.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_LINES.map((line) => (
            <div
              key={line.slug}
              id={`line-${line.slug}`}
              className={`bg-offwhite p-6 md:p-7 flex flex-col gap-4 transition-all duration-200 ease-calm ${
                line.featured
                  ? 'border-2 border-teal bg-tint/30 lg:row-span-2'
                  : 'border border-hairline'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <Eyebrow className={line.featured ? 'text-teal' : ''}>{line.name}</Eyebrow>
                {line.featured && (
                  <Caption className="text-teal font-medium uppercase tracking-wide">Flagship</Caption>
                )}
              </div>
              <h3 className={`text-h3 font-normal text-navy leading-snug [text-wrap:balance] ${line.featured ? 'lg:text-h2-m' : ''}`}>
                {line.promise}
              </h3>
              <div className="mt-2">
                <Caption className="text-mute uppercase tracking-wide block mb-2">Best for</Caption>
                <div className="flex flex-wrap gap-2">
                  {line.bestFor.map((b) => (
                    <span
                      key={b}
                      className="text-caption text-navy bg-subtle border border-hairline rounded-full px-3 py-1"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
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

      {/* Process -- DARK band with image overlay. 4 steps. */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>How it works</Eyebrow>
          <Heading level={2} inverse>Survey to running water, one decision at a time.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-4">
              <div className="text-[56px] md:text-[64px] font-light leading-none text-soft font-numeric">{step.n}</div>
              <Heading level={3} inverse>{step.title}</Heading>
              <Body inverse className="text-offwhite/80">{step.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Live deployments + derived stats -- LIGHT band. Honest about
          which lines have references and which don't yet. */}
      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>Already running</Eyebrow>
          <Heading level={2}>{LIVE_SITES_COUNT} live sites, {LIVE_COUNTRIES_COUNT} countries.</Heading>
          <Body className="text-mute mt-2">
            Every site below is a real deployment under contract. Soft,
            drinking and DM lines have running references; the iron-free and
            RO-process lines are signing their first deployments now and will
            appear here once commissioned — we don&rsquo;t name reference
            sites that don&rsquo;t exist yet.
          </Body>
        </div>

        {/* Derived stats row. Each figure is computed from LIVE_SITES so
            the page can't drift from the data. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pb-10 border-b border-hairline">
          <StatTile value={`${HOMES_ON_SOFT_WATER}`} label="Homes on managed soft water" />
          <StatTile value={`${SOFT_WATER_LAKH_LITRES_PER_DAY} lakh L`} label="Soft water delivered per day" />
          <StatTile value={`${STUDENTS_ON_DRINKING_WATER.toLocaleString('en-IN')}+`} label="Students on managed drinking water" />
          <StatTile value={`${DM_WATER_LAKH_LITRES_PER_MONTH} lakh L`} label="DM water delivered per month" />
        </div>

        {/* Site ledger. Card per deployment. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LIVE_SITES.map((site) => (
            <Card key={site.slug}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <Caption className="text-mute uppercase tracking-wide">{site.city}, {site.country}</Caption>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {site.lines.map((l) => (
                      <span
                        key={l}
                        className="text-[11px] text-teal bg-tint/50 border border-teal/30 rounded-full px-2 py-0.5 font-ui font-medium uppercase tracking-wide"
                      >
                        {LINE_LABEL[l]}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-h3 font-normal text-navy leading-snug [text-wrap:balance]">{site.name}</h3>
                <Body className="text-mute">{site.context}</Body>
                {site.volume && (
                  <Caption className="text-navy font-medium mt-1">{site.volume}</Caption>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Monthly-visit differentiator -- DARK band. The thing that makes
          "as a service" real, called out alone so it's not lost in the
          card lists above. */}
      <Section tone="navy" padding="default" image={{ stem: 'industrial' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow inverse>What makes it a service</Eyebrow>
            <Heading level={2} inverse>A named engineer visits every month.</Heading>
            <Body inverse className="text-offwhite/80">
              The same person, on the same schedule, doing preventive work
              before anything fails. Backwash verification, parameter
              testing, salt and media top-up, membrane checks, a written
              report you keep. The plant stays in spec because someone whose
              job is to keep it in spec is on site every month.
            </Body>
          </div>
          <div className="lg:col-span-7">
            <EditorialAccent inverse className="text-h2-m md:text-h2 leading-snug">
              Owning a plant is a project. Subscribing to water held to spec is a decision.
            </EditorialAccent>
          </div>
        </div>
      </Section>

      {/* Final CTA -- the existing FinalCTA component fires the same
          conversion path as the rest of the site. */}
      <FinalCTA
        headline="Get a free water survey for your site."
        sub="One business day to an engineer assignment; five working days to a site survey and water analysis. The survey is free; you only pay if you decide to subscribe."
        primaryCTA={{ label: 'Book a free survey', href: SURVEY_HREF }}
      />
    </>
  );
}
