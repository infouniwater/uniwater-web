import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { Card, StatTile } from '@/components/ui/Card';
import { Infographic } from '@/components/ui/Infographic';
import { TextField, TextArea, SelectField } from '@/components/ui/Form';
import { WHERE_WE_WORK, CAPACITY_BANDS, TECHNICAL_EDGE } from '@/content/industrial';
import { COMPONENT_MANUFACTURERS, NAMED_CLIENTS, CLIENT_LOGOS, STATS, PRIMARY_PHONE_HREF } from '@/content/site';
import Image from 'next/image';
import { submitRFQ } from '@/app/actions/leads';
import { PincodeCheck } from '@/components/ui/PincodeCheck';

export const metadata: Metadata = buildMetadata({
  path: '/industrial',
  title: 'Industrial & Institutional Water Treatment Plants',
  description:
    'Engineered water systems for industry, hospitality, healthcare. 8,000 LPH building plants to 50,000 LPH industrial RO. AMC-priced.',
  image: '/og/og-home.png',
});

const WHERE_WE_WORK_PHOTO: Record<string, { src: string; alt: string }> = {
  '01': {
    src: '/images/photography/commercial-ro-industrial-shed.jpg',
    alt: 'Branded Uniwater commercial RO and softening plant installed inside an industrial shed',
  },
  '02': {
    src: '/images/photography/commercial-ro-rooftop-enclosure.jpg',
    alt: 'Branded Uniwater commercial RO plant installed inside a rooftop polycarbonate enclosure',
  },
  '03': {
    src: '/images/photography/wtp-terrace.jpg',
    alt: 'Centralised water-treatment plant on the rooftop of a residential complex with stainless vessels and instrumentation',
  },
};

const AUDIENCES = [
  { name: 'Hospitals & clinics', body: 'Drinking-water RO at point of use. DM for sterile process.' },
  { name: 'Hotels & hospitality', body: 'WTP for whole-site treatment. RO for kitchen and laundry.' },
  { name: 'Schools & campuses', body: 'Centralised drinking water. Sized for peak occupancy.' },
  { name: 'Manufacturing', body: 'Process water, boiler feed, cooling-tower make-up, plating.' },
  { name: 'Pharmaceutical', body: 'High-purity DM water below 1 \u00b5S/cm. Validated handover.' },
  { name: 'Power & process', body: 'Boiler feed, condensate polishing, cooling-tower treatment.' },
];

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
      {/* Hero — image-with-scrim editorial register, matching the
          homepage and /residential heroes. B2B audience reads the
          same brand voice; only the eyebrow + heading + CTA verb
          change. */}
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
          <div className="w-full lg:max-w-[720px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Industrial &amp; institutional</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[19ch] [text-wrap:balance]">
              Water that holds up at scale.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Engineered water systems for industry, hospitality, healthcare, and institutions. Surveyed before sold. Serviced after handover. Year five, the system still meets spec.
            </p>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href="#rfq"
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Submit an RFQ
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <a href={PRIMARY_PHONE_HREF} className="group inline-flex self-start sm:self-center text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full">
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Or talk to an engineer
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </span>
              </a>
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

      {/* Capacity range strip — light surface, alternates with the
          dark hero per the dark/light cadence rule. */}
      <Section padding="tight">
        <div className="border-y border-hairline py-8 -my-8">
          <Lede className="text-mute max-w-4xl">
            From 8,000 LPH building plants to 50,000 LPH industrial RO. Up to 10,000 LPH DM. Designed by engineers; serviced by engineers.
          </Lede>
        </div>
      </Section>

      <Section padding="tight">
        <div className="max-w-3xl">
          <PincodeCheck bookSurveyHref="/industrial#rfq" />
        </div>
      </Section>

      {/* Where we work — important section, kept dark per the rule. */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>Where we work</Eyebrow>
          <Heading level={2} inverse>Three categories. One protocol.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHERE_WE_WORK.map((category) => {
            const photo = WHERE_WE_WORK_PHOTO[category.number];
            return (
            <div key={category.title} className="border border-offwhite/15 flex flex-col bg-navy/40">
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
              <div className="p-8 flex flex-col gap-4">
              <Eyebrow inverse>{category.number}</Eyebrow>
              <h3 className="text-h2-m font-light text-offwhite [text-wrap:balance]">{category.title}</h3>
              <p className="text-soft text-caption italic">{category.subtitle}</p>
              <Body inverse>{category.body}</Body>
              <div className="mt-4 pt-4 border-t border-offwhite/15">
                <Eyebrow inverse className="mb-3">Typical sites</Eyebrow>
                <ul className="flex flex-col gap-1">
                  {category.typicalSites.map((site) => (
                    <li key={site} className="text-caption text-offwhite/85">
                      {site}
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </div>
            );
          })}
        </div>
      </Section>

      {/* Audience cards — light surface to alternate with the dark
          "Where we work" above and the dark "Applications" below. */}
      <Section padding="default">
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow>Audience</Eyebrow>
          <Heading level={2}>Who we work with.</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCES.map((audience) => (
            <Card key={audience.name}>
              <h3 className="text-h3 font-normal text-navy mb-3">{audience.name}</h3>
              <Body className="text-mute">{audience.body}</Body>
            </Card>
          ))}
        </div>
      </Section>

      {/* Applications */}
      <Section tone="navy" padding="default" image={{ stem: 'industrial' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow inverse>Applications</Eyebrow>
            <Heading level={2} inverse>Engineered to the load.</Heading>
            <Body inverse className="mt-2">
              Every BOM follows from a feed-water analysis. TDS, hardness, iron, silica, conductivity, microbiological. The wrong sequence is worse than no sequence.
            </Body>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-offwhite/15 border border-offwhite/15">
              {APPLICATIONS.map((app) => (
                <li key={app} className="bg-navy p-6 text-body text-offwhite">
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Capacity ladder — light surface for alternation. */}
      <Section padding="default">
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow>Capacity bands</Eyebrow>
          <Heading level={2}>From boutique to industrial.</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-hairline border border-hairline">
          {CAPACITY_BANDS.map((band) => (
            <div key={band.capacity} className="bg-offwhite p-6 flex flex-col gap-3">
              <div className="text-[28px] md:text-[32px] font-light text-teal leading-none font-numeric">{band.capacity}</div>
              <div className="h-px w-10 bg-hairline" />
              <Caption>{band.subtitle}</Caption>
            </div>
          ))}
        </div>
        <Infographic
          assetName="building-wtp-ladder.svg"
          description="Capacity ladder diagram — 8K to 30K LPH bands with site-type captions."
          className="mt-12"
        />
      </Section>

      {/* Technical edge — USP, kept dark per "important sections dark" rule. */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-10 md:mb-14 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>The technical edge</Eyebrow>
          <Heading level={2} inverse>Four things commercial buyers should ask.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-offwhite/15 border border-offwhite/15">
          {TECHNICAL_EDGE.map((item) => (
            <div key={item.title} className="bg-navy p-8 flex flex-col gap-3">
              <h3 className="text-h3 font-normal text-offwhite [text-wrap:balance]">{item.title}</h3>
              <Body inverse>{item.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Component manufacturers — light surface for alternation. */}
      <Section padding="default">
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

      {/* Track record — proof, kept dark per "important sections dark" rule. */}
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

      {/* RFQ form — light surface for alternation. */}
      <Section padding="loose" id="rfq">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Eyebrow>Submit an RFQ</Eyebrow>
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
          </div>
          <div className="lg:col-span-7">
            <form action={submitRFQ} className="bg-offwhite border border-hairline p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-h2-m font-light text-navy mb-2">RFQ details</h3>
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

      {/* Final CTA — B2B verb */}
      <Section tone="tint" padding="loose">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center">
          <Heading level={1} className="text-display-m font-light">
            Ready to specify a system?
          </Heading>
          <Lede className="text-mute">
            Available across 7 cities in India and 2 in Nepal. We respond to RFQs within one business day.
          </Lede>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
            <Button href="#rfq">Submit an RFQ</Button>
            <a
              href={PRIMARY_PHONE_HREF}
              className="text-navy hover:text-teal transition-colors duration-200 ease-calm text-caption underline underline-offset-4"
            >
              Or call +91 97487 45193
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
