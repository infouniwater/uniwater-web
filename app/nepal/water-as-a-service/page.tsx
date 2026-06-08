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

/**
 * /nepal/water-as-a-service -- Meta-ads landing page for the East Nepal
 * Drinking Water as a Service + DM Water as a Service campaigns.
 *
 * Conversion target: WhatsApp deeplinks (per-plan tagged) + a form that
 * submits via the existing submitNepalWaaS server action (Odoo + email +
 * sheet + Meta CAPI fan-out).
 *
 * Architecture: this file is a Server Component handling metadata + static
 * content blocks. WaterAsAServiceClient is the "use client" island that
 * owns the service tabs, ?service= query handling, plan selection,
 * WhatsApp deeplink wiring, and browser-side Meta Pixel events.
 *
 * Reference file (_reference/water-as-a-service.page.tsx) was NOT in the
 * repo when this was built; sections marked DRAFT in content/nepal-waas.ts
 * need to be replaced verbatim from the reference when Rajat drops it.
 */

interface PageProps {
  searchParams?: {
    service?: string;
    plan?: string;
  };
}

export const metadata: Metadata = buildMetadata({
  path: '/nepal/water-as-a-service',
  title: META_TITLE,
  description: META_DESCRIPTION,
  // Dedicated 1200x630 OG card for this page (built 2026-06-05 from
  // the desktop hero photo via Sharp + an SVG overlay). buildMetadata
  // already wires this into <meta property="og:image">, <meta
  // name="twitter:image">, and the OG width/height annotations, so
  // WhatsApp, Facebook, LinkedIn, X, Slack, Telegram and Discord all
  // pick it up when the URL is shared.
  image: '/og/og-nepal-waas.jpg',
});

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
      {/* Hero -- new v3 product shots dropped 2026-06-08. Branded 100 LPH
          RO + UV plant + dispensing tank on a circular pedestal against a
          Himalayan lake backdrop. Premium product-on-pedestal composition
          (no people, no factory clutter) gives the eye a single subject;
          the blue water + mountains carry "Nepal" without us having to
          name the geography in the eyebrow. AVIF / WebP / JPG triple
          for each breakpoint:
            desktop 1672x941 (16:9)   AVIF 63 KB
            tablet  1254x1254 (1:1)   AVIF 55 KB
            mobile  1086x1448 (3:4)   AVIF 67 KB */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden min-h-[620px] md:min-h-0 md:h-[520px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" type="image/avif" srcSet="/images/hero/nepal-hero-v3-desktop.avif" />
          <source media="(min-width: 1024px)" type="image/webp" srcSet="/images/hero/nepal-hero-v3-desktop.webp" />
          <source media="(min-width: 1024px)" srcSet="/images/hero/nepal-hero-v3-desktop.jpg" />
          <source media="(min-width: 768px)" type="image/avif" srcSet="/images/hero/nepal-hero-v3-tablet.avif" />
          <source media="(min-width: 768px)" type="image/webp" srcSet="/images/hero/nepal-hero-v3-tablet.webp" />
          <source media="(min-width: 768px)" srcSet="/images/hero/nepal-hero-v3-tablet.jpg" />
          <source type="image/avif" srcSet="/images/hero/nepal-hero-v3-mobile.avif" />
          <source type="image/webp" srcSet="/images/hero/nepal-hero-v3-mobile.webp" />
          <img
            src="/images/hero/nepal-hero-v3-mobile.jpg"
            alt="Uniwater 100 LPH RO + UV drinking-water plant and dispensing tank on a circular pedestal, set against East Nepal's mountains and lake -- the on-site system every DWaaS contract installs."
            className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:object-[65%_center] lg:object-[70%_center]"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        {/* Mobile + tablet: dark top -> partial transparency at bottom so
            the HTML headline sits on solid navy and the product / mountain
            backdrop reads underneath the lower half. Desktop: dark on the
            LEFT (where the headline lives) and clear on the RIGHT (where
            the product pedestal lives in the new shot) -- that lets the
            product land as its own visual anchor without text overlap. */}
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
          {/* Hero text block. 2026-06-05 fix: previously flex items-end
              on mobile pushed the text against the hero's bottom edge,
              so the eyebrow ended up touching the top of the visible
              image area (the text block is tall and there was nowhere
              to grow upward). Switched the parent to items-center and
              added symmetric py-10 / sm:py-12 / lg:py-0 padding so
              mobile sees comfortable breathing room above AND below
              the text block. */}
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
            {/* Italic brand tagline -- hidden on mobile so the hero
                stack fits in the 640px container; still shown on
                tablet+ where vertical room isn't a problem. */}
            <p className="hidden sm:block text-caption text-offwhite/70 italic mt-2">{TAGLINE}</p>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <a
                href={WHATSAPP_HREF_GENERIC}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Chat on WhatsApp
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
                </svg>
              </a>
              <a
                href="#lead-form"
                className="group inline-flex self-start sm:self-center text-[15px] text-offwhite/85 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full"
              >
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Or request a callback
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Call line hidden on mobile -- the sticky bottom
                WhatsApp CTA + the form-section copy already carry the
                "talk to us" path. Showing it on tablet+ where vertical
                room is plentiful. */}
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

      {/* Trust band -- collapsed from two stacked sections (Stats strip +
          Live in Biratnagar) into one above-the-fold credibility row.
          Numbers anchor scale; quotes anchor real customers. Reads in one
          breath, doesn't burn an extra scroll. */}
      <Section padding="tight" tone="subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline mb-6">
          {STATS_STRIP.map((stat) => (
            <div key={stat.label} className="bg-subtle p-5 md:p-6 flex flex-col gap-1 items-center text-center">
              <span className="font-numeric text-h2-m md:text-h2 text-navy leading-none">{stat.value}</span>
              <span className="text-caption text-mute">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEPAL_LIVE_SITES.map((site) => (
            <figure
              key={site.slug}
              className="border border-hairline bg-offwhite p-5 md:p-6 flex flex-col gap-3"
            >
              <blockquote className="font-editorial italic text-body md:text-h3 text-navy leading-snug [text-wrap:balance]">
                &ldquo;{site.quote}&rdquo;
              </blockquote>
              <figcaption className="pt-3 border-t border-hairline flex flex-col gap-0.5">
                <Caption className="font-medium text-navy">
                  {site.personName} &middot; {site.personRole}
                </Caption>
                <Caption className="text-mute">
                  {site.name} &middot; {site.city}, Nepal
                </Caption>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Client island -- service tabs + plans (or DM card) + lead form +
          sticky mobile WhatsApp CTA. Wrapped in Suspense because
          useSearchParams() in a Client Component requires it for the
          static-build path. */}
      <Suspense fallback={null}>
        <WaterAsAServiceClient
          initialService={initialService}
          initialPlan={initialPlan}
        />
      </Suspense>

      {/* Comparison: DWaaS vs Buying equipment vs Water jars.
          Added 2026-06-05 per Rajat. Desktop renders as a real
          comparison table (columns = options, rows = dimensions);
          mobile stacks one block per option for readability. The
          DWaaS column is visually elevated (teal accent) on both
          views so the visitor sees Uniwater's positioning at a
          glance. */}
      <Section padding="default" tone="subtle" id="comparison">
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

        {/* Desktop / tablet: real comparison table */}
        <div className="hidden md:block border border-hairline overflow-hidden bg-offwhite">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-subtle border-b border-hairline">
                <th className="p-4 text-eyebrow font-ui font-medium uppercase tracking-wide text-mute w-1/4"></th>
                <th className="p-4 text-eyebrow font-ui font-medium uppercase tracking-wide text-mute">Water jars</th>
                <th className="p-4 text-eyebrow font-ui font-medium uppercase tracking-wide text-mute">Buying equipment</th>
                <th className="p-4 text-eyebrow font-ui font-medium uppercase tracking-wide bg-tint/40 text-teal">Uniwater DWaaS</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-hairline last:border-b-0 align-top">
                  <td className="p-4 font-medium text-navy bg-subtle/40">{row.dimension}</td>
                  <td className="p-4 text-caption text-mute leading-snug">{row.jars}</td>
                  <td className="p-4 text-caption text-mute leading-snug">{row.buy}</td>
                  <td className="p-4 text-caption text-navy leading-snug bg-tint/30 font-medium">{row.dwaas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked columns (one per option, each block lists all
            dimensions). DWaaS goes FIRST so the conversion-relevant
            answer is what scrolls into view. */}
        <div className="md:hidden flex flex-col gap-4">
          {([
            { label: 'Uniwater DWaaS', getValue: (r: typeof COMPARISON_ROWS[number]) => r.dwaas, featured: true },
            { label: 'Buying equipment', getValue: (r: typeof COMPARISON_ROWS[number]) => r.buy, featured: false },
            { label: 'Water jars',       getValue: (r: typeof COMPARISON_ROWS[number]) => r.jars, featured: false },
          ] as const).map((opt) => (
            <div
              key={opt.label}
              className={`p-5 flex flex-col gap-4 ${
                opt.featured ? 'bg-tint/40 border-2 border-teal' : 'bg-offwhite border border-hairline'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`font-sans text-h3 font-medium ${opt.featured ? 'text-teal' : 'text-navy'}`}>
                  {opt.label}
                </h3>
                {opt.featured && (
                  <span className="text-[11px] font-ui font-semibold uppercase tracking-wide text-teal bg-offwhite border border-teal rounded-sm px-2 py-0.5">
                    Recommended
                  </span>
                )}
              </div>
              <dl className="flex flex-col gap-3">
                {COMPARISON_ROWS.map((row, i) => (
                  <div key={i} className="border-t border-hairline pt-3 first:border-t-0 first:pt-0">
                    <dt className="text-eyebrow font-ui font-medium uppercase tracking-wide text-mute mb-1">
                      {row.dimension}
                    </dt>
                    <dd className={`text-caption leading-snug ${opt.featured ? 'text-navy font-medium' : 'text-mute'}`}>
                      {opt.getValue(row)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      {/* What's included + How we run it -- collapsed from three stacked
          sections (Benefits, Engineer photo band, How-it-works, Why
          Uniwater = ~4 scroll-screens) into one tint-accented "value +
          process" panel. Benefits sit at the top in a 3-up grid (the
          inclusions); the 4-step process runs beneath them as a tight
          numbered row -- same content, half the scroll, no orphan photo
          band. The 8-point Why-Uniwater list was dropped entirely; it
          re-stated points already covered by the comparison table and
          the benefit cards. */}
      <Section padding="default" tone="tint">
        <div className="mb-10 max-w-3xl">
          <Eyebrow className="mb-4">What&rsquo;s included</Eyebrow>
          <Heading level={2}>Plant to glass, on a fixed monthly bill.</Heading>
          <Body className="text-mute mt-4">
            Every contract installs the plant on your site, pipes treated
            water to the dispensing tank, and runs a monthly preventive
            visit by a named engineer. You drink and pay by the litre.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {BENEFIT_BLOCKS.map((b) => (
            <div key={b.title} className="border border-hairline bg-offwhite p-5 md:p-6 flex flex-col gap-3">
              <h3 className="font-sans text-h3 font-normal text-navy [text-wrap:balance]">{b.title}</h3>
              <Body className="text-mute">{b.body}</Body>
            </div>
          ))}
        </div>

        {/* Process runs inside the same section as a tight 4-step row,
            visually separated from the benefit cards by a hairline +
            extra top margin -- one "what's included" block rather than
            two competing sections. */}
        <div className="mt-14 pt-10 border-t border-hairline">
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-3">How we run it</Eyebrow>
            <Heading level={3}>Survey to running water in four steps.</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.n} className="flex flex-col gap-2">
                <div className="font-numeric text-[40px] md:text-[48px] font-light leading-none text-teal">{step.n}</div>
                <h4 className="font-sans text-body font-medium text-navy [text-wrap:balance]">{step.title}</h4>
                <Caption className="text-mute leading-relaxed">{step.body}</Caption>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Coverage + Terms -- shrunk from two full sections into a single
          tight band. Cities render as inline pills (10 across one or two
          rows) instead of a 10-cell card grid -- much less visual weight
          for what's essentially a "you're covered" reassurance line.
          Terms tag along beneath as a hairline-separated micro-note. */}
      <Section padding="default">
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
        <div className="mt-12 pt-8 border-t border-hairline max-w-reading">
          <Eyebrow className="mb-3">Terms</Eyebrow>
          <Caption className="text-mute leading-relaxed">{TERMS_NOTE}</Caption>
        </div>
      </Section>
    </>
  );
}
