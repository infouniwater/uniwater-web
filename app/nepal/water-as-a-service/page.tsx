import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Lede, Caption } from '@/components/ui/Typography';
import { buildMetadata } from '@/lib/seo';
import {
  BENEFIT_BLOCKS,
  HOW_IT_WORKS,
  WHY_UNIWATER,
  TERMS_NOTE,
  REGIONS,
  PROVINCE,
  TAGLINE,
  STATS_STRIP,
  MODEL_LINE,
  HERO_EYEBROW,
  HERO_TITLE,
  HERO_SUB,
  NEPAL_CALL_LINES,
  WHATSAPP_HREF_GENERIC,
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
  image: '/og/og-home.png',
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
      {/* Hero -- ad-page-grade image-with-scrim. Money shot: a worker
          drinking from a bottle just filled at the branded 100 LPH
          RO + UV plant + dispensing tank in a factory setting. Product
          + use case + person in one frame -- exactly the message-
          match an ad-clicker needs in the first scroll. Replaced the
          earlier clean-equipment shot on 2026-06-05 when Rajat
          dropped this image; the prior hero is preserved on disk at
          /images/photography/nepal-waas-plant-detail.png for a future
          slot. Single PNG used across breakpoints for now; TODO:
          convert to JPG and ship art-directed mobile/tablet/desktop
          crops at /images/hero/nepal-waas-{m,t,d}.jpg for the paid-
          traffic LCP budget. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[480px] md:h-[560px] lg:h-[calc(100vh-160px)] lg:min-h-[560px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/photography/nepal-waas-hero.png"
          alt="A worker drinking from a bottle filled at a branded Uniwater 100 LPH RO + UV drinking-water plant with its dispensing tank, in a commercial site -- exactly the system every DWaaS contract puts in."
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.94) 0%, rgba(4,69,95,0.78) 45%, rgba(4,69,95,0.30) 90%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 50%, rgba(4,69,95,0.25) 85%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[800px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
              {HERO_EYEBROW}
            </p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              {HERO_TITLE}
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/85 max-w-2xl">
              {HERO_SUB}
            </p>
            <p className="text-caption text-offwhite/70 italic mt-2">{TAGLINE}</p>

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

            <p className="text-caption text-offwhite/70 mt-3">
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

      {/* Stats strip (committed copy). */}
      <Section padding="tight" tone="subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline">
          {STATS_STRIP.map((stat) => (
            <div key={stat.label} className="bg-subtle p-6 flex flex-col gap-1 items-center text-center">
              <span className="font-numeric text-h2-m md:text-h2 text-navy leading-none">{stat.value}</span>
              <span className="text-caption text-mute">{stat.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-caption text-mute mt-4 italic">
          The model: {MODEL_LINE}.
        </p>
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

      {/* Six benefit blocks (DRAFT in content/nepal-waas.ts -- pending
          reference file). */}
      <Section padding="default">
        <div className="mb-10 max-w-3xl">
          <Eyebrow className="mb-4">What you get</Eyebrow>
          <Heading level={2}>Six things included in every contract.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFIT_BLOCKS.map((b) => (
            <div key={b.title} className="border border-hairline bg-offwhite p-6 flex flex-col gap-3">
              <h3 className="font-sans text-h3 font-normal text-navy [text-wrap:balance]">{b.title}</h3>
              <Body className="text-mute">{b.body}</Body>
            </div>
          ))}
        </div>
        <p className="text-caption text-mute italic mt-6">
          {/* DRAFT — replace verbatim from reference file */}
        </p>
      </Section>

      {/* Behind the service -- inline photo band between benefits and
          the 4-step process. Shows a branded Uniwater engineer dispensing
          drinking water from one of the smaller (25 LPH) RO + UV plants
          that ship under DWaaS Plans A/B. Single editorial caption
          reinforces the "monthly engineer visit" differentiator without
          repeating the benefits-list copy above. Image dropped by Rajat
          2026-06-05; TODO: convert PNG -> JPG + add art-directed crops
          for the mobile path. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden border-y border-offwhite/10">
        <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photography/nepal-waas-engineer-dispensing.png"
            alt="A Uniwater engineer in branded uniform dispensing drinking water from a wall-mounted 25 LPH RO + UV plant at a commercial site -- the monthly preventive visit in action."
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.82) 0%, rgba(4,69,95,0.35) 55%, rgba(4,69,95,0.10) 100%)' }}
            aria-hidden="true"
          />
          <div className="relative h-full container-uw flex items-center">
            <div className="max-w-md md:max-w-lg flex flex-col gap-3">
              <Eyebrow inverse>The work side</Eyebrow>
              <p className="font-editorial italic text-2xl md:text-3xl lg:text-4xl text-offwhite leading-snug [text-wrap:balance]">
                A named engineer. Same person. Same schedule. Written report on the spot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works -- 4 steps (DRAFT in content/nepal-waas.ts). */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>How it works</Eyebrow>
          <Heading level={2} inverse>Survey to running water in four steps.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.n} className="flex flex-col gap-3">
              <div className="font-numeric text-[56px] md:text-[64px] font-light leading-none text-soft">{step.n}</div>
              <Heading level={3} inverse>{step.title}</Heading>
              <Body inverse className="text-offwhite/85">{step.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Uniwater -- 8 points (DRAFT in content/nepal-waas.ts). */}
      <Section padding="default" tone="subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow>Why Uniwater</Eyebrow>
            <Heading level={2}>Eight reasons buyers pick the subscription.</Heading>
            <Body className="text-mute mt-2">
              Local team, refundable deposit, no surprise charges, monthly
              engineer, written report. The plant is ours; you subscribe
              to the water.
            </Body>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {WHY_UNIWATER.map((point, i) => (
                <li key={i} className="flex gap-3 text-caption">
                  <span className="font-numeric text-teal font-medium w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Regions -- where the service runs today. */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow>Service area</Eyebrow>
            <Heading level={2}>Live across East Nepal.</Heading>
            <Body className="text-mute mt-2">
              {PROVINCE}. Other locations in East Nepal on request — drop your address in the form and we&rsquo;ll confirm coverage.
            </Body>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-hairline border border-hairline">
              {REGIONS.map((region) => (
                <div key={region} className="bg-offwhite p-6 flex flex-col gap-1 items-center text-center">
                  <span className="font-sans text-h3 font-normal text-navy">{region}</span>
                  <Caption className="text-mute">Active</Caption>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Terms note (DRAFT in content/nepal-waas.ts -- pending reference). */}
      <Section padding="tight">
        <div className="max-w-reading mx-auto">
          <Eyebrow className="mb-4">Terms</Eyebrow>
          <Caption className="text-mute leading-relaxed">{TERMS_NOTE}</Caption>
        </div>
      </Section>
    </>
  );
}
