import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';
import { buildMetadata } from '@/lib/seo';
import {
  BENEFIT_BLOCKS,
  HOW_IT_WORKS,
  TERMS_NOTE,
  REGIONS,
  PROVINCE,
  TAGLINE,
  STATS_STRIP,
  HERO_EYEBROW,
  HERO_TITLE,
  HERO_SUB,
  NEPAL_CALL_LINES,
  WHATSAPP_HREF_GENERIC,
  COMPARISON_ROWS,
  NEPAL_LIVE_SITES,
  META_TITLE,
  META_DESCRIPTION,
  type ServiceSlug,
} from '@/content/nepal-waas';
import { WaterAsAServiceClient } from './WaterAsAServiceClient';
import { CompactPlansTable } from './CompactPlansTable';
import { StickyMobileCTABar } from './StickyMobileCTABar';
import { NepalFAQ } from './NepalFAQ';
import { HeroCTAs } from './HeroCTAs';

/**
 * /nepal/water-as-a-service -- Meta-ads landing page for the East Nepal
 * Drinking Water as a Service + DM Water as a Service campaigns.
 *
 * Section order (top to bottom):
 *   1. Hero
 *   2. Stats strip                 -- trust beat directly under hero
 *   3. Comparison table            -- DWaaS vs jars vs capex
 *   4. What's included             -- 6 benefit cards
 *   5. CompactPlansTable           -- pricing tiers
 *   6. Testimonials                -- 2 named Biratnagar quotes
 *   7. Lead form                   -- WaterAsAServiceClient (tabs + DM card + form)
 *   8. How we run it               -- 4-step process
 *   9. Service area                -- 10 city pills
 *  10. FAQ                         -- 6 Q&As with FAQPage JSON-LD
 *  11. Terms                       -- short terms note
 *  (Sticky mobile CTA bar mounted at the end -- fixed bottom, mobile only.)
 *
 * Architecture: this file is a Server Component handling metadata + static
 * content blocks. WaterAsAServiceClient is the "use client" island that
 * owns the service tabs, ?service= query handling, plan selection, the
 * lead form (with UTM capture), and browser-side Meta Pixel events.
 */

interface PageProps {
  searchParams?: {
    service?: string;
    plan?: string;
  };
}

const baseMetadata = buildMetadata({
  path: '/nepal/water-as-a-service',
  title: META_TITLE,
  description: META_DESCRIPTION,
  image: '/og/og-nepal-waas.jpg',
});

// Override OG locale for this Nepal-specific route. The shared
// buildMetadata helper defaults to en_IN (correct for every other
// page); en_NP is the right locale tag for a Nepal-targeted landing.
// We spread the base so canonical / Twitter card / images stay intact.
export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    locale: 'en_NP',
  },
};

export default function NepalWaaSPage({ searchParams }: PageProps) {
  // Parse ?service= server-side so the first paint matches the intent and
  // there's no hydration flicker on the tab.
  const initialService: ServiceSlug | undefined =
    searchParams?.service === 'dm' || searchParams?.service === 'drinking'
      ? searchParams.service
      : undefined;

  const planParam = searchParams?.plan;
  const initialPlan =
    planParam && ['A', 'B', 'C', 'D', 'E'].includes(planParam)
      ? (planParam as 'A' | 'B' | 'C' | 'D' | 'E')
      : undefined;

  return (
    <>
      {/* ---------- 1. Hero ---------- */}
      {/* Hero -- new v3 product shots dropped 2026-06-08. Branded 100 LPH
          RO + UV plant + dispensing tank on a circular pedestal against a
          Himalayan lake backdrop. AVIF / WebP / JPG triple for each
          breakpoint. The mobile hero ships as 1:1 (aspect-square), tablet
          + desktop fall back to fixed heights. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden aspect-square min-h-[520px] md:aspect-auto md:min-h-0 md:h-[520px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" type="image/avif" srcSet="/images/hero/nepal-hero-v3-desktop.avif" />
          <source media="(min-width: 1024px)" type="image/webp" srcSet="/images/hero/nepal-hero-v3-desktop.webp" />
          <source media="(min-width: 1024px)" srcSet="/images/hero/nepal-hero-v3-desktop.jpg" />
          <source type="image/avif" srcSet="/images/hero/nepal-hero-v3-tablet.avif" />
          <source type="image/webp" srcSet="/images/hero/nepal-hero-v3-tablet.webp" />
          <img
            src="/images/hero/nepal-hero-v3-tablet.jpg"
            alt="Uniwater 100 LPH RO + UV drinking-water plant and dispensing tank on a circular pedestal, set against East Nepal's mountains and lake -- the on-site system every DWaaS contract installs."
            className="absolute inset-0 w-full h-full object-cover object-center md:object-[65%_center] lg:object-[70%_center]"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to bottom, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.18) 90%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.94) 0%, rgba(4,69,95,0.82) 35%, rgba(4,69,95,0.30) 65%, rgba(4,69,95,0.05) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full container-uw flex items-center">
          <div className="w-full lg:max-w-[800px] py-10 sm:py-12 lg:py-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
              {HERO_EYEBROW}
            </p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              {HERO_TITLE}
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/85 max-w-2xl">
              {HERO_SUB}
            </p>
            <p className="hidden sm:block text-caption text-offwhite/70 italic mt-2">{TAGLINE}</p>

            {/* Hero CTAs extracted into <HeroCTAs/> so the same pill +
                arrow-link grammar is reused by the DM card and the
                sticky bottom bar (theme switches handle the navy vs
                light backgrounds). */}
            <div className="mt-2">
              <HeroCTAs
                theme="on-navy"
                whatsappHref={WHATSAPP_HREF_GENERIC}
                secondaryHref="#lead-form"
              />
            </div>

            <p className="hidden sm:block text-caption text-offwhite/70 mt-3">
              Call: {NEPAL_CALL_LINES.map((line, i) => (
                <span key={line}>
                  <a href={`tel:${line.replace(/[^\d+]/g, '')}`} className="text-offwhite/90 hover:text-offwhite underline underline-offset-4 decoration-offwhite/30">
                    {line}
                  </a>
                  {i < NEPAL_CALL_LINES.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 2. Stats strip ---------- */}
      {/* Trust beat directly below the hero -- 4 numeric tiles. Was
          previously merged with the Biratnagar testimonial quotes in one
          band; reordering brought them apart so the stats sit under the
          hero and the named quotes follow the pricing section.

          md:!pb-6 override: section-tight defaults to 5rem bottom padding
          on desktop, which pushed the comparison table awkwardly far
          below this trust beat. Trimmed to 1.5rem so the stats read as
          a tight prelude to the comparison, not a standalone band. */}
      <Section padding="tight" tone="subtle" className="md:!pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline">
          {STATS_STRIP.map((stat) => (
            <div key={stat.label} className="bg-subtle p-5 md:p-6 flex flex-col gap-1 items-center text-center">
              <span className="font-numeric text-h2-m md:text-h2 text-navy leading-none">{stat.value}</span>
              <span className="text-caption text-mute">{stat.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 3. Comparison table ---------- */}
      {/* tone="plain" (was "subtle") -- breaks the subtle->subtle
          repeat that used to read as one long beige band running from
          Stats through Comparison. Plain offwhite gives the
          comparison its own visual frame. */}
      <Section padding="default" tone="plain" id="comparison">
        <div className="mb-10 max-w-3xl">
          <Eyebrow className="mb-4">Three ways to get drinking water</Eyebrow>
          <Heading level={2}>Why subscription beats jars and capex.</Heading>
          <Body className="text-mute mt-4">
            The water-jar economy adds up. Buying the plant is capex plus
            your team running it. Subscribing means we own the plant,
            run it, and bill against a meter — water held to spec, no
            firefighting.
          </Body>
        </div>

        {/* Single comparison table at every breakpoint. The previous
            mobile-only stacked-card layout was replaced because it
            forced the visitor to re-scan the same dimension list three
            times (one card per option) and lost the side-by-side
            comparison that's the section's whole point.

            Compact-mobile tactics:
              - Tighter padding (p-2 mobile, p-4 md+).
              - Smaller font on mobile (text-[11px] -> text-caption md+).
              - Header row abbreviates "Buying equipment" -> "Capex" and
                "Uniwater DWaaS" -> "DWaaS" on mobile so 4 columns fit
                a 360px viewport without horizontal scroll.
              - DWaaS column tinted at all widths so the recommended
                option still reads at a glance.
              - overflow-x-auto wrapper as a safety net for very narrow
                viewports (<320px) -- they get horizontal scroll
                rather than text-cramming. */}
        <div className="border border-hairline overflow-x-auto bg-offwhite">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-subtle border-b border-hairline">
                <th className="p-2 md:p-4 text-[10px] md:text-eyebrow font-ui font-medium uppercase tracking-wide text-mute w-[28%] md:w-1/4"></th>
                <th className="p-2 md:p-4 text-[10px] md:text-eyebrow font-ui font-medium uppercase tracking-wide text-mute">Jars</th>
                <th className="p-2 md:p-4 text-[10px] md:text-eyebrow font-ui font-medium uppercase tracking-wide text-mute">
                  <span className="md:hidden">Capex</span>
                  <span className="hidden md:inline">Buying equipment</span>
                </th>
                <th className="p-2 md:p-4 text-[10px] md:text-eyebrow font-ui font-medium uppercase tracking-wide bg-tint/40 text-teal">
                  <span className="md:hidden">DWaaS</span>
                  <span className="hidden md:inline">Uniwater DWaaS</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-hairline last:border-b-0 align-top">
                  <td className="p-2 md:p-4 text-[11px] md:text-body font-medium text-navy bg-subtle/40 leading-snug">{row.dimension}</td>
                  <td className="p-2 md:p-4 text-[11px] md:text-caption text-mute leading-snug">{row.jars}</td>
                  <td className="p-2 md:p-4 text-[11px] md:text-caption text-mute leading-snug">{row.buy}</td>
                  <td className="p-2 md:p-4 text-[11px] md:text-caption text-navy leading-snug bg-tint/30 font-medium">{row.dwaas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ---------- 4. What's included ---------- */}
      {/* Six benefit cards (every contract bundles these). The 4-step
          "How we run it" process was merged here previously; it's now its
          own section below the lead form so visitors see the offer
          (price + form) before the operational beat.

          Mobile compaction:
            - 2-column grid (was 1-col) -- benefit titles are 3-5 words
              and bodies are 1-2 short sentences, so they fit cleanly
              in a half-width card. Total section height drops from ~6
              full-width cards stacked to 3 rows of 2.
            - Tighter card padding (p-3 vs p-5) and gap (gap-2 vs gap-4).
            - Smaller h3 (text-body vs text-h3) on mobile only.
            - Section intro mb trimmed (mb-6 vs mb-10) on mobile only.
          Desktop layout (3-col grid, p-6 cards, full-size h3) is
          unchanged.
       */}
      <Section padding="default" tone="tint">
        <div className="mb-6 md:mb-10 max-w-3xl">
          <Eyebrow className="mb-3 md:mb-4">What&rsquo;s included</Eyebrow>
          <Heading level={2}>Plant to glass, on a fixed monthly bill.</Heading>
          <Body className="text-mute mt-3 md:mt-4">
            Every contract installs the plant on your site, pipes treated
            water to the dispensing tank, and runs a monthly preventive
            visit by a named engineer. You drink and pay by the litre.
          </Body>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
          {BENEFIT_BLOCKS.map((b) => (
            <div
              key={b.title}
              className="border border-hairline bg-offwhite p-3 md:p-6 flex flex-col gap-1.5 md:gap-3"
            >
              <h3 className="font-sans text-body md:text-h3 font-medium md:font-normal text-navy leading-snug [text-wrap:balance]">
                {b.title}
              </h3>
              <Body className="text-mute text-[12px] md:text-body leading-snug md:leading-normal">
                {b.body}
              </Body>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 5. Pricing (CompactPlansTable) ---------- */}
      <CompactPlansTable />

      {/* ---------- 6. Testimonials ---------- */}
      {/* Navy band (was plain offwhite). The page now has TWO dark
          beats: the Hero at the top and the Testimonials in the
          middle. Pullquotes pop on dark navy (the editorial italic
          face was designed for this kind of contrast), and the navy
          band breaks the long light stretch between Comparison and
          Lead form -- the rhythm convention the rest of the site uses
          (~1-2 dark sections per page).

          Card chrome inverted: border + figcaption divider use
          offwhite/20, body bg is offwhite/5 (a subtle lifted panel),
          and all text colours switch to offwhite. */}
      <Section padding="tight" tone="inverse">
        <div className="max-w-2xl mb-6">
          <Eyebrow inverse className="mb-2">Live in Biratnagar</Eyebrow>
          <Heading level={2} inverse>Two contracts already running, on the record.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEPAL_LIVE_SITES.map((site) => (
            <figure
              key={site.slug}
              className="border border-offwhite/20 bg-offwhite/5 p-5 md:p-6 flex flex-col gap-3"
            >
              <blockquote className="font-editorial italic text-body md:text-h3 text-offwhite leading-snug [text-wrap:balance]">
                &ldquo;{site.quote}&rdquo;
              </blockquote>
              <figcaption className="pt-3 border-t border-offwhite/20 flex flex-col gap-0.5">
                <Caption className="font-medium text-offwhite">
                  {site.personName} &middot; {site.personRole}
                </Caption>
                <Caption className="text-offwhite/70">
                  {site.name} &middot; {site.city}, Nepal
                </Caption>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ---------- 7. Lead form (+ service tabs + DM card) ---------- */}
      {/* Wrapped in Suspense because useSearchParams() in a Client
          Component requires it for the static-build path. */}
      <Suspense fallback={null}>
        <WaterAsAServiceClient
          initialService={initialService}
          initialPlan={initialPlan}
        />
      </Suspense>

      {/* ---------- 8. How we run it ---------- */}
      {/* 4-step process. Was previously inline beneath the benefit cards
          inside the "What's included" panel; now its own section so it
          can sit AFTER the lead form (operational reassurance is more
          useful as a closing beat than as an interruption between
          benefits and price).
          tone="subtle" (was plain) so it doesn't repeat the lead form's
          offwhite -- creates a soft step into the closing beats. */}
      <Section padding="default" tone="subtle">
        <div className="mb-10 max-w-3xl">
          <Eyebrow className="mb-3">How we run it</Eyebrow>
          <Heading level={2}>Survey to running water in four steps.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.n} className="flex flex-col gap-2">
              <div className="font-numeric text-[40px] md:text-[48px] font-light leading-none text-teal">{step.n}</div>
              <h3 className="font-sans text-body font-medium text-navy [text-wrap:balance]">{step.title}</h3>
              <Caption className="text-mute leading-relaxed">{step.body}</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 9. Service area ---------- */}
      {/* tone="plain" (was subtle) so it doesn't repeat the previous
          subtle band -- the page now reads
          subtle -> plain -> subtle -> plain across closing sections. */}
      <Section padding="default" tone="plain">
        <div className="max-w-3xl mb-6">
          <Eyebrow className="mb-3">Service area</Eyebrow>
          <Heading level={2}>Live across the Terai &mdash; Biratnagar to Birgunj.</Heading>
          <Body className="text-mute mt-3">
            {PROVINCE} Other locations between these towns on request &mdash; drop your address in the form and we&rsquo;ll confirm coverage.
          </Body>
        </div>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((region) => (
            <span
              key={region}
              className="inline-flex items-center gap-1.5 border border-hairline bg-subtle text-navy text-caption font-medium px-3.5 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal" aria-hidden="true" />
              {region}
            </span>
          ))}
        </div>
      </Section>

      {/* ---------- 10. FAQ (with FAQPage JSON-LD) ---------- */}
      <NepalFAQ />

      {/* ---------- 11. Terms ---------- */}
      <Section padding="tight">
        <div className="max-w-reading">
          <Eyebrow className="mb-3">Terms</Eyebrow>
          <Caption className="text-mute leading-relaxed">{TERMS_NOTE}</Caption>
        </div>
      </Section>

      {/* Mobile-only buffer so the sticky CTA bar at the very bottom of
          the viewport never visually covers the Terms note as the user
          scrolls to the page bottom. Calc accounts for the bar (two
          buttons + 8px wrapper padding ~ 72px) plus the iOS home-
          indicator safe-area inset. Tablet+ has no sticky bar and no
          buffer. */}
      <div
        className="md:hidden"
        aria-hidden="true"
        style={{ height: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}
      />

      {/* Sticky mobile CTA bar -- WhatsApp + Book-a-survey duo, fixed
          bottom on <md. Reads captured UTMs from sessionStorage to tag
          the WhatsApp prefill. */}
      <StickyMobileCTABar />
    </>
  );
}
