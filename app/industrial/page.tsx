import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { StatTile } from '@/components/ui/Card';
import { Infographic } from '@/components/ui/Infographic';
import { TextField, TextArea, SelectField } from '@/components/ui/Form';
import { WHERE_WE_WORK, CAPACITY_BANDS, TECHNICAL_EDGE } from '@/content/industrial';
import { COMPONENT_MANUFACTURERS, NAMED_CLIENTS, CLIENT_LOGOS, STATS, PRIMARY_PHONE_HREF } from '@/content/site';
import { AUDIENCE_TRACKS, getProofForTrack, type AudienceTrack } from '@/content/cwaas';
import Image from 'next/image';
import { submitRFQ } from '@/app/actions/leads';
import { PincodeCheck } from '@/components/ui/PincodeCheck';

/**
 * /industrial -- redesigned 2026-06-04 as a DECISION PAGE.
 *
 * Previous version tried to be everything (13 sections; CWaaS hero
 * solution + the legacy capex/RFQ track + audience cards + applications
 * + tech edge + components + track record + RFQ form). It overlapped
 * heavily with /clean-water-as-a-service ("what we offer", "who we
 * serve", proof), and visitors couldn't tell which page carried which
 * truth.
 *
 * New role: /industrial is the GATEWAY. The visitor lands here, picks
 * a procurement model (Subscribe = CWaaS, or Specify = RFQ), then
 * deep-dives to the relevant page. /clean-water-as-a-service carries
 * the depth on the subscription model; /industrial carries the depth
 * on the capex/RFQ model and presents both options side-by-side.
 *
 * Cadence:
 *   1. Hero (D image-with-scrim) -- engineered water at scale
 *   2. Two paths (L) -- Subscribe vs Specify, equal-IA cards
 *   3. Who we serve (D, image) -- 3 audience tracks reused from
 *      content/cwaas.ts, but rendered briefly here (typical sites +
 *      named-client proof) without the full track depth
 *   4. What we install (L) -- 6 applications + engineering note
 *   5. Capacity & sizing (D) -- 5 LPH bands + ladder infographic
 *   6. The engineering edge (L) -- 4 technical USPs + named components
 *      logo wall, consolidated into one section
 *   7. Operating footprint (subtle) -- PincodeCheck for city
 *      availability
 *   8. Track record (D, image) -- stats + named clients
 *   9. RFQ form (L) -- the Specify path; submitRFQ unchanged
 *  10. Final CTA (tint) -- book a free survey (Subscribe path) or
 *      submit an RFQ (Specify path)
 *
 * Content preserved verbatim: WHERE_WE_WORK (now folded into audience-
 * track captions), CAPACITY_BANDS, TECHNICAL_EDGE, AUDIENCES (now
 * folded into the typical-sites list per audience track), APPLICATIONS,
 * COMPONENT_MANUFACTURERS, NAMED_CLIENTS, CLIENT_LOGOS, STATS,
 * PincodeCheck, RFQ form, FinalCTA.
 */

export const metadata: Metadata = buildMetadata({
  path: '/industrial',
  title: 'Industrial & Institutional Water Treatment Plants',
  description:
    'Engineered water systems for industry, hospitality, healthcare, residential societies. Two procurement models: subscribe (Clean Water as a Service) or specify and buy a plant. 8,000 LPH building plants to 50,000 LPH industrial RO.',
  image: '/og/og-industrial.jpg',
});

// Photos already shipped for the WHERE_WE_WORK 3-category treatment.
// Re-keyed by audience track slug so the new audience cards reuse the
// existing imagery without sourcing new shots:
//   commercial            -> rooftop enclosure (institutional context)
//   industrial            -> industrial shed (manufacturing context)
//   residential-societies -> WTP terrace (residential complex context)
const AUDIENCE_PHOTO: Record<AudienceTrack['slug'], { src: string; alt: string }> = {
  commercial: {
    src: '/images/photography/commercial-ro-rooftop-enclosure.jpg',
    alt: 'A Uniwater commercial RO plant installed inside a rooftop polycarbonate enclosure at an institutional site',
  },
  industrial: {
    src: '/images/photography/commercial-ro-industrial-shed.jpg',
    alt: 'A Uniwater commercial RO and softening plant installed inside an industrial shed',
  },
  'residential-societies': {
    src: '/images/photography/wtp-terrace.jpg',
    alt: 'A centralised water-treatment plant on the rooftop of a residential complex with stainless vessels and instrumentation',
  },
};

// The WHERE_WE_WORK content (industries / institutions / communities) is
// preserved by mapping each track to its closest match. This carries
// forward the "typical sites" lists Rajat curated in content/industrial.ts.
const TRACK_TO_WHERE_WE_WORK: Record<AudienceTrack['slug'], typeof WHERE_WE_WORK[number]> = {
  commercial: WHERE_WE_WORK[1],            // Institutions
  industrial: WHERE_WE_WORK[0],            // Industries
  'residential-societies': WHERE_WE_WORK[2], // Communities
};

const APPLICATIONS = [
  'Drinking water at scale',
  'Building inlet treatment',
  'Boiler feed',
  'Cooling tower make-up',
  'Process water',
  'Effluent / discharge treatment',
];

export default function IndustrialPage() {
  return (
    <>
      {/* 1. Hero -- image-with-scrim editorial register. Two-path CTAs:
              Subscribe (CWaaS) primary, Specify (RFQ) secondary. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[520px] md:h-[640px] lg:h-[calc(100vh-160px)] lg:min-h-[600px] border-b border-offwhite/10">
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
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Institutions &amp; industry</p>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[19ch] [text-wrap:balance]">
              Water that holds up at scale.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Engineered water systems for industry, hospitality, healthcare, education, and residential societies. Two procurement models: subscribe to water as a service, or specify and buy a plant.
            </p>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href="/clean-water-as-a-service"
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                See Clean Water as a Service
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link href="#rfq" className="group inline-flex self-start sm:self-center text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full">
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Or submit an RFQ
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>

            <p className="text-caption text-offwhite/65 mt-2">
              Or{' '}
              <a
                href="/downloads/uniwater-commercial-catalogue-2026.pdf"
                download
                className="text-offwhite/85 hover:text-offwhite transition-colors duration-200 ease-calm underline underline-offset-4 decoration-offwhite/30"
              >
                download the commercial catalogue (PDF, 7 MB)
              </a>
              {' '}or{' '}
              <a
                href="/sample-bom-industrial"
                className="text-offwhite/85 hover:text-offwhite transition-colors duration-200 ease-calm underline underline-offset-4 decoration-offwhite/30"
              >
                see a sample BOM
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 2. Two paths -- the central decision moment. Side-by-side
              cards present BOTH procurement models with equal IA;
              Subscribe is visually elevated as the modern recommendation
              (teal border + tint bg) but Specify gets equal narrative
              weight. Each card answers: when it's right, what's
              included, and where to go. */}
      <Section padding="default" tone="subtle">
        <div className="mb-10 max-w-3xl flex flex-col gap-4">
          <Eyebrow className="mb-2">Pick a procurement model</Eyebrow>
          <Heading level={2}>Two paths to engineered water.</Heading>
          <Lede className="text-mute mt-2">
            Subscribe to water as a service and we own the plant. Specify it and you own the plant. The water spec is the same; the procurement model isn&rsquo;t.
          </Lede>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Subscribe -- CWaaS. Visually elevated. */}
          <div className="border-2 border-teal bg-tint/30 p-6 md:p-8 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <Eyebrow className="text-teal">Subscribe</Eyebrow>
              <Caption className="text-teal font-medium uppercase tracking-wide">Recommended</Caption>
            </div>
            <h3 className="font-sans text-h2-m md:text-h2 font-light text-navy leading-snug [text-wrap:balance]">
              Clean Water as a Service.
            </h3>
            <Body className="text-mute">
              We design, fund, own, install and run the plant. You pay one predictable fee for water held to specification, with a monthly preventive engineer visit included.
            </Body>
            <div className="pt-4 border-t border-teal/30">
              <Caption className="text-mute uppercase tracking-wide block mb-2">Best for</Caption>
              <ul className="flex flex-col gap-1.5">
                <li className="flex gap-2 text-caption text-ink"><span className="text-teal shrink-0">—</span><span>Predictable opex; nothing on the capex sheet.</span></li>
                <li className="flex gap-2 text-caption text-ink"><span className="text-teal shrink-0">—</span><span>No procurement team to run a tender.</span></li>
                <li className="flex gap-2 text-caption text-ink"><span className="text-teal shrink-0">—</span><span>Operations and maintenance handled by us.</span></li>
              </ul>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                href="/clean-water-as-a-service"
                className="inline-flex items-center gap-2 bg-navy text-offwhite font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 py-3 transition-colors duration-200 ease-calm hover:bg-teal"
              >
                See the subscription model
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Specify -- RFQ. Equal IA, subtler treatment. */}
          <div className="border border-hairline bg-offwhite p-6 md:p-8 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <Eyebrow>Specify</Eyebrow>
              <Caption className="text-mute uppercase tracking-wide">Traditional</Caption>
            </div>
            <h3 className="font-sans text-h2-m md:text-h2 font-light text-navy leading-snug [text-wrap:balance]">
              Engineer it and buy it.
            </h3>
            <Body className="text-mute">
              We design and quote a plant to your site. You buy it via capex, with a Bill of Materials and a written single-line diagram. AMC priced at handover, available year one onward.
            </Body>
            <div className="pt-4 border-t border-hairline">
              <Caption className="text-mute uppercase tracking-wide block mb-2">Best for</Caption>
              <ul className="flex flex-col gap-1.5">
                <li className="flex gap-2 text-caption text-ink"><span className="text-teal shrink-0">—</span><span>Capex budget approved; plant on your books.</span></li>
                <li className="flex gap-2 text-caption text-ink"><span className="text-teal shrink-0">—</span><span>Procurement team running a vendor tender.</span></li>
                <li className="flex gap-2 text-caption text-ink"><span className="text-teal shrink-0">—</span><span>Custom plant requirements outside our standard catalogue.</span></li>
              </ul>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                href="#rfq"
                className="inline-flex items-center gap-2 border border-navy text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 py-3 transition-colors duration-200 ease-calm hover:bg-navy hover:text-offwhite"
              >
                Submit an RFQ
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </Section>

      {/* 3. Who we serve -- 3 audience tracks (reused from
              content/cwaas.ts so the audience definitions stay in sync
              with the CWaaS page). Brief version here: each card carries
              audience name + typical sites (from WHERE_WE_WORK) + named
              proof (from LIVE_SITES). The deep version with water lines
              + per-track CTA lives on /clean-water-as-a-service. */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Who we serve</Eyebrow>
          <Heading level={2} inverse>Three audiences. One protocol.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AUDIENCE_TRACKS.map((track) => {
            const where = TRACK_TO_WHERE_WE_WORK[track.slug];
            const photo = AUDIENCE_PHOTO[track.slug];
            const proof = getProofForTrack(track).slice(0, 3);
            return (
              <div key={track.slug} className="border border-offwhite/15 flex flex-col bg-navy/40">
                {photo && (
                  <div className="relative w-full overflow-hidden border-b border-offwhite/15" style={{ aspectRatio: '16 / 9' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="block w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="p-7 flex flex-col gap-4 flex-1">
                  <Eyebrow inverse>{where.number}</Eyebrow>
                  <h3 className="font-sans text-h2-m font-light text-offwhite [text-wrap:balance]">{track.eyebrow}.</h3>
                  <p className="text-soft text-caption italic">{where.subtitle}</p>
                  <Body inverse className="text-offwhite/85">{where.body}</Body>

                  <div className="mt-2 pt-4 border-t border-offwhite/15">
                    <Eyebrow inverse className="mb-3">Typical sites</Eyebrow>
                    <ul className="flex flex-col gap-1">
                      {where.typicalSites.map((site) => (
                        <li key={site} className="text-caption text-offwhite/85">
                          {site}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {proof.length > 0 && (
                    <div className="mt-2 pt-4 border-t border-offwhite/15 flex-grow">
                      <Eyebrow inverse className="mb-3">Already running</Eyebrow>
                      <ul className="flex flex-col gap-1.5">
                        {proof.map((site) => (
                          <li key={site.slug} className="text-caption text-offwhite/85">
                            <span className="font-medium text-offwhite">{site.name}</span>
                            <span className="text-offwhite/60"> &mdash; {site.city}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 4. What we install -- 6 applications + engineering note.
              Carries the APPLICATIONS chips verbatim. */}
      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow>What we install</Eyebrow>
            <Heading level={2}>Engineered to the load.</Heading>
            <Body className="text-mute mt-2">
              Every BOM follows from a feed-water analysis. TDS, hardness, iron, silica, conductivity, microbiological. The wrong sequence is worse than no sequence.
            </Body>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline border border-hairline">
              {APPLICATIONS.map((app) => (
                <li key={app} className="bg-offwhite p-6 text-body text-ink">
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 5. Capacity & sizing -- CAPACITY_BANDS ladder + infographic.
              Carries content verbatim. */}
      <Section tone="navy" padding="default" image={{ stem: 'industrial' }}>
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Capacity bands</Eyebrow>
          <Heading level={2} inverse>From boutique to industrial.</Heading>
          <Body inverse className="text-offwhite/80 mt-2">
            From 8,000 LPH building plants to 50,000 LPH industrial RO. Up to 10,000 LPH DM.
          </Body>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-offwhite/15 border border-offwhite/15">
          {CAPACITY_BANDS.map((band) => (
            <div key={band.capacity} className="bg-navy p-6 flex flex-col gap-3">
              <div className="text-[28px] md:text-[32px] font-light text-soft leading-none font-numeric">{band.capacity}</div>
              <div className="h-px w-10 bg-offwhite/30" />
              <Caption className="text-offwhite/80">{band.subtitle}</Caption>
            </div>
          ))}
        </div>
        <Infographic
          assetName="building-wtp-ladder.svg"
          description="Capacity ladder diagram — 8K to 30K LPH bands with site-type captions."
          className="mt-12"
        />
      </Section>

      {/* 6. The engineering edge -- consolidates TECHNICAL_EDGE (4 USPs)
              and COMPONENT_MANUFACTURERS (named-component logo wall)
              into one section. The two pieces argue the same thing
              ("we know what we're building") and now sit together. */}
      <Section padding="default" tone="subtle">
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow>The engineering edge</Eyebrow>
          <Heading level={2}>Four things commercial buyers should ask. Two ways to verify.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline mb-12">
          {TECHNICAL_EDGE.map((item) => (
            <div key={item.title} className="bg-offwhite p-7 flex flex-col gap-3">
              <h3 className="font-sans text-h3 font-normal text-navy [text-wrap:balance]">{item.title}</h3>
              <Body className="text-mute">{item.body}</Body>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Eyebrow>Component supply</Eyebrow>
            <Heading level={2}>Named manufacturers, not whitebox.</Heading>
            <Body className="text-mute mt-2">
              FRP and SS316 vessels rated for the duty cycle. RO membranes from Hydranautics, Dow, LG. Resins from Tulsion and Ionex. Pumps from Wilo and Grundfos.
            </Body>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-hairline border border-hairline">
              {COMPONENT_MANUFACTURERS.map((mfr) => (
                <div key={mfr} className="bg-offwhite aspect-[3/2] flex items-center justify-center p-4">
                  <span className="text-caption text-navy font-ui font-medium">{mfr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Operating footprint -- PincodeCheck for city availability.
              Bridges the engineering pitch to the conversion track:
              "we said we're engineered; here's whether we're at your
              door." */}
      <Section padding="tight">
        <div className="max-w-3xl">
          <PincodeCheck bookSurveyHref="/industrial#rfq" />
        </div>
      </Section>

      {/* 8. Track record -- stats + named-client logo wall. The proof
              the procurement officer needs. */}
      <Section tone="navy" padding="default" image={{ stem: 'industrial' }}>
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Track record</Eyebrow>
          <Heading level={2} inverse>What we&rsquo;ve put in. Where it runs.</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 pb-16 border-b border-offwhite/15">
          <StatTile value={STATS.yearsOperating} label="Years operating" inverse />
          <StatTile value={STATS.installations} label="Commercial installations" inverse />
          <StatTile value={String(STATS.citiesTotal)} label="Cities served" inverse />
          <StatTile value={String(STATS.skus)} label="Engineered configurations" inverse />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-4">
          {NAMED_CLIENTS.map((client) => {
            const logo = CLIENT_LOGOS[client];
            return (
              <div
                key={client}
                className="aspect-[3/2] border border-offwhite/15 bg-offwhite flex items-center justify-center p-4"
                aria-label={logo.alt}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(min-width: 640px) 20vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 9. RFQ form -- the Specify path. submitRFQ unchanged. */}
      <Section padding="loose" id="rfq">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow>Specify path · Submit an RFQ</Eyebrow>
            <Heading level={2}>Tell us the site, the application, the daily volume.</Heading>
            <Lede className="text-mute mt-2">
              We come back with a system layout, a bill of materials, and a price you can take to procurement.
            </Lede>
            <ul className="mt-8 flex flex-col gap-3 text-mute">
              <li className="flex gap-3 text-caption"><span className="text-teal">&mdash;</span> Engineer assigned within 1 business day</li>
              <li className="flex gap-3 text-caption"><span className="text-teal">&mdash;</span> Site visit and water analysis within 5 working days</li>
              <li className="flex gap-3 text-caption"><span className="text-teal">&mdash;</span> BOM &amp; quote within 5 working days of analysis</li>
              <li className="flex gap-3 text-caption"><span className="text-teal">&mdash;</span> 24-hour SLA on flagged faults, post-install</li>
            </ul>
            <Caption className="text-mute italic mt-6">
              Looking for the subscription model instead?{' '}
              <Link href="/clean-water-as-a-service" className="text-teal underline underline-offset-4">See Clean Water as a Service</Link>{' '}
              &mdash; we own and run the plant; you subscribe to the water.
            </Caption>
          </div>
          <div className="lg:col-span-7">
            <form action={submitRFQ} className="bg-offwhite border border-hairline p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="font-sans text-h2-m font-light text-navy mb-2">RFQ details</h3>
                <Caption className="text-mute">All fields marked * are required. Drawings, water test reports, and site photos can be sent to <a href="mailto:support@uniwater.co.in" className="text-teal underline underline-offset-4">support@uniwater.co.in</a> after submission.</Caption>
              </div>
              <TextField label="Name" name="name" required placeholder="Your name" />
              <TextField label="Organisation" name="org" required placeholder="Company / institution" />
              <TextField label="Mobile" name="mobile" type="tel" required placeholder="+91" />
              <TextField label="Email" name="email" type="email" required placeholder="you@company.com" />
              <SelectField
                label="Application"
                name="application"
                required
                placeholder="Select application"
                options={[
                  { value: 'drinking-water', label: 'Drinking water at scale' },
                  { value: 'inlet', label: 'Building inlet treatment' },
                  { value: 'boiler-feed', label: 'Boiler feed' },
                  { value: 'cooling', label: 'Cooling tower make-up' },
                  { value: 'process', label: 'Process water' },
                  { value: 'effluent', label: 'Effluent / discharge' },
                  { value: 'other', label: 'Other (specify in notes)' },
                ]}
              />
              <TextField label="Capacity required" name="capacity" placeholder="e.g. 12,000 LPH" />
              <TextField label="Site location" name="location" required placeholder="City, state" />
              <TextField label="Target timeline" name="timeline" placeholder="e.g. Q3 2026" />
              <TextArea
                label="Notes"
                name="notes"
                className="md:col-span-2"
                rows={5}
                placeholder="Water source, known parameters (TDS / hardness / iron), site readiness, anything else worth knowing"
              />
              {/* File upload for drawings + water test report still pending backend (Vercel Blob). Until then,
                  the form copy above directs RFQ submitters to email files to support@uniwater.co.in. */}
              <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-4 mt-2">
                <SubmitButton>Submit RFQ</SubmitButton>
                <Caption className="text-mute">
                  An engineer will respond within 1 business day.
                </Caption>
              </div>
            </form>
          </div>
        </div>
      </Section>

      {/* 10. Final CTA -- both paths represented. Subscribe is primary
               (matches the hero); Specify (RFQ) is the secondary phone
               link. */}
      <Section tone="tint" padding="loose">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center">
          <Heading level={2} className="text-display-m font-light">
            Ready to engineer a system?
          </Heading>
          <Lede className="text-mute">
            Subscribe to water on a service contract, or specify and buy the plant. Available across 7 cities in India and 2 in Nepal.
          </Lede>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
            <Button href="/clean-water-as-a-service">See Clean Water as a Service</Button>
            <Link
              href="#rfq"
              className="text-navy hover:text-teal transition-colors duration-200 ease-calm text-caption underline underline-offset-4"
            >
              Or submit an RFQ
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
