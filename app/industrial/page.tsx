import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { Card, StatTile } from '@/components/ui/Card';
import { Infographic } from '@/components/ui/Infographic';
import { TextField, TextArea, SelectField } from '@/components/ui/Form';
import { WHERE_WE_WORK, SYSTEM_TYPES, CAPACITY_BANDS, TECHNICAL_EDGE } from '@/content/industrial';
import { COMPONENT_MANUFACTURERS, NAMED_CLIENTS, CLIENT_LOGOS, STATS, PRIMARY_PHONE_HREF } from '@/content/site';
import Image from 'next/image';
import { submitRFQ } from '@/app/actions/leads';
import { PincodeCheck } from '@/components/ui/PincodeCheck';

export const metadata: Metadata = {
  title: 'Industrial &amp; institutional water systems',
  description:
    'Engineered water systems for industry, hospitality, healthcare. 8,000 LPH building plants to 50,000 LPH industrial RO. AMC-priced.',
};

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
    src: '/images/photography/residential-complex.jpg',
    alt: 'Gated residential complex served by a centralised water-treatment plant',
  },
};

const SYSTEM_CUTAWAY: Record<string, { src: string; alt: string }> = {
  RO: {
    src: '/images/product-cutaways/commercial-ro/landscape.svg',
    alt: 'Commercial reverse-osmosis system — engineering cross-section',
  },
  DM: {
    src: '/images/product-cutaways/dm/landscape.svg',
    alt: 'Commercial DM (demineralisation) system — engineering cross-section',
  },
  WTP: {
    src: '/images/product-cutaways/overview/all-landscape.svg',
    alt: 'Building water treatment plant — engineering overview showing major stages',
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
      {/* Dark hero — B2B mode per Critique §2.3 */}
      <section className="bg-navy text-offwhite border-b border-offwhite/15">
        <div className="container-uw">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-20 lg:py-28">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="text-eyebrow font-medium uppercase text-soft">Industrial &amp; institutional</div>
              <Heading level={1} inverse className="text-display-m md:text-display font-light leading-tight">
                Water that holds up at scale.
              </Heading>
              <Lede inverse>
                Engineered water systems for industry, hospitality, healthcare, and institutions. Surveyed before sold. Serviced after handover. Year five, the system still meets spec.
              </Lede>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                <Button href="#rfq" variant="ghost">Submit RFQ</Button>
                <a href={PRIMARY_PHONE_HREF} className="text-offwhite hover:text-soft transition-colors duration-200 ease-calm text-[15px] underline underline-offset-4">
                  Or talk to an engineer
                </a>
              </div>
              <p className="text-caption text-offwhite/70 mt-2">
                Or{' '}
                <a
                  href="/downloads/uniwater-commercial-catalogue-2026.pdf"
                  download
                  className="text-offwhite hover:text-soft transition-colors duration-200 ease-calm underline underline-offset-4 decoration-offwhite/30"
                >
                  download the commercial catalogue (PDF, 7 MB)
                </a>
                {' '}or{' '}
                <a
                  href="/sample-bom-industrial"
                  className="text-offwhite hover:text-soft transition-colors duration-200 ease-calm underline underline-offset-4 decoration-offwhite/30"
                >
                  see a sample BOM
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full overflow-hidden border border-offwhite/15 aspect-[16/9] sm:aspect-[1/1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/photography/commercial-ro-warehouse.jpg"
                  alt="Branded Uniwater commercial RO and softening plant installed on a factory warehouse floor — engineered water at industrial scale"
                  className="block w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity range strip */}
      <Section tone="navy" padding="tight">
        <div className="border-y border-offwhite/15 py-8 -my-8">
          <Lede inverse className="text-offwhite/85 max-w-4xl">
            From 8,000 LPH building plants to 50,000 LPH industrial RO. Up to 10,000 LPH DM. Designed by engineers; serviced by engineers.
          </Lede>
        </div>
      </Section>

      <Section tone="navy" padding="tight">
        <div className="max-w-3xl">
          <PincodeCheck tone="navy" bookSurveyHref="/industrial#rfq" />
        </div>
      </Section>

      {/* Where we work */}
      <Section tone="navy" padding="default">
        <div className="mb-12 max-w-3xl">
          <div className="text-eyebrow font-medium uppercase text-soft mb-4">Where we work</div>
          <Heading level={2} inverse className="mb-4">Three categories. One protocol.</Heading>
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
              <div className="text-eyebrow font-medium uppercase text-soft">{category.number}</div>
              <h3 className="text-h2-m font-light text-offwhite">{category.title}</h3>
              <p className="text-soft text-caption italic">{category.subtitle}</p>
              <Body inverse>{category.body}</Body>
              <div className="mt-4 pt-4 border-t border-offwhite/15">
                <div className="text-eyebrow font-medium uppercase text-soft mb-3">Typical sites</div>
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

      {/* Audience cards */}
      <Section tone="navy" padding="default">
        <div className="mb-12 max-w-3xl">
          <div className="text-eyebrow font-medium uppercase text-soft mb-4">Audience</div>
          <Heading level={2} inverse>Who we work with.</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCES.map((audience) => (
            <Card key={audience.name} inverse>
              <h3 className="text-h3 font-semibold text-offwhite mb-3">{audience.name}</h3>
              <Body inverse>{audience.body}</Body>
            </Card>
          ))}
        </div>
      </Section>

      {/* Applications */}
      <Section tone="navy" padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-eyebrow font-medium uppercase text-soft mb-4">Applications</div>
            <Heading level={2} inverse className="mb-4">Engineered to the load.</Heading>
            <Body inverse>
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

      {/* System types — three-up */}
      <Section tone="navy" padding="default" id="commercial-ro">
        <div className="mb-12 max-w-3xl">
          <div className="text-eyebrow font-medium uppercase text-soft mb-4">System types</div>
          <Heading level={2} inverse>Three systems. Different jobs. Sometimes in series.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SYSTEM_TYPES.map((sys) => {
            const cutaway = SYSTEM_CUTAWAY[sys.code];
            return (
            <div key={sys.code} className="border border-offwhite/15 flex flex-col bg-navy/40" id={sys.code === 'DM' ? 'commercial-dm' : sys.code === 'WTP' ? 'building-wtp' : undefined}>
              {cutaway && (
                <div className="bg-offwhite border-b border-offwhite/15 p-6 flex items-center justify-center" style={{ minHeight: '180px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cutaway.src}
                    alt={cutaway.alt}
                    className="block w-full h-auto max-h-40 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col gap-4">
              <div className="text-eyebrow font-medium uppercase text-soft">SYSTEM &mdash; {sys.code}</div>
              <h3 className="text-[56px] md:text-[64px] font-light text-soft leading-none">{sys.name}</h3>
              <p className="text-caption italic text-soft">{sys.description}</p>

              <div className="mt-4 pt-4 border-t border-offwhite/15">
                <div className="text-eyebrow font-medium uppercase text-soft mb-2">Application</div>
                <Body inverse className="mb-6">{sys.application}</Body>

                <div className="text-eyebrow font-medium uppercase text-soft mb-2">Capacity range</div>
                <p className="text-[20px] text-offwhite mb-6">{sys.capacityRange}</p>

                <div className="text-eyebrow font-medium uppercase text-soft mb-2">Key components</div>
                <ul className="flex flex-col gap-1">
                  {sys.components.map((c) => (
                    <li key={c} className="text-caption text-offwhite/85">{c}</li>
                  ))}
                </ul>
              </div>
              </div>
            </div>
            );
          })}
        </div>
      </Section>

      {/* Capacity ladder */}
      <Section tone="navy" padding="default">
        <div className="mb-12 max-w-3xl">
          <div className="text-eyebrow font-medium uppercase text-soft mb-4">Capacity bands</div>
          <Heading level={2} inverse>From boutique to industrial.</Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-offwhite/15 border border-offwhite/15">
          {CAPACITY_BANDS.map((band) => (
            <div key={band.capacity} className="bg-navy p-6 flex flex-col gap-3">
              <div className="text-[28px] md:text-[32px] font-light text-soft leading-none">{band.capacity}</div>
              <div className="h-px w-10 bg-offwhite/30" />
              <Caption inverse>{band.subtitle}</Caption>
            </div>
          ))}
        </div>
        <Infographic
          assetName="building-wtp-ladder.svg"
          description="Capacity ladder diagram — 8K to 30K LPH bands with site-type captions."
          className="mt-12"
        />
      </Section>

      {/* Technical edge */}
      <Section tone="navy" padding="default">
        <div className="mb-12 max-w-3xl">
          <div className="text-eyebrow font-medium uppercase text-soft mb-4">The technical edge</div>
          <Heading level={2} inverse>Four things commercial buyers should ask.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-offwhite/15 border border-offwhite/15">
          {TECHNICAL_EDGE.map((item) => (
            <div key={item.title} className="bg-navy p-8 flex flex-col gap-3">
              <h3 className="text-h3 font-semibold text-offwhite">{item.title}</h3>
              <Body inverse>{item.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      {/* Component manufacturers */}
      <Section tone="navy" padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <div className="text-eyebrow font-medium uppercase text-soft mb-4">Component supply</div>
            <Heading level={2} inverse className="mb-4">Named manufacturers, not whitebox.</Heading>
            <Body inverse>
              FRP and SS316 vessels rated for the duty cycle. RO membranes from Hydranautics, Dow, LG. Resins from Tulsion and Ionex. Pumps from Wilo and Grundfos.
            </Body>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-offwhite/15 border border-offwhite/15">
              {COMPONENT_MANUFACTURERS.map((mfr) => (
                <div key={mfr} className="bg-navy aspect-[3/2] flex items-center justify-center p-4">
                  <span className="text-caption text-offwhite font-medium">{mfr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Track record */}
      <Section tone="navy" padding="default">
        <div className="mb-12 max-w-3xl">
          <div className="text-eyebrow font-medium uppercase text-soft mb-4">Track record</div>
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

      {/* RFQ form */}
      <Section tone="navy" padding="loose" id="rfq">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-eyebrow font-medium uppercase text-soft mb-4">Submit an RFQ</div>
            <Heading level={2} inverse className="mb-6">Tell us the site, the application, the daily volume.</Heading>
            <Lede inverse>
              We come back with a system layout, a bill of materials, and a price you can take to procurement.
            </Lede>
            <ul className="mt-10 flex flex-col gap-3 text-offwhite/85">
              <li className="flex gap-3 text-caption"><span className="text-soft">&mdash;</span> Engineer assigned within 1 business day</li>
              <li className="flex gap-3 text-caption"><span className="text-soft">&mdash;</span> Site visit and water analysis within 5 working days</li>
              <li className="flex gap-3 text-caption"><span className="text-soft">&mdash;</span> BOM &amp; quote within 5 working days of analysis</li>
              <li className="flex gap-3 text-caption"><span className="text-soft">&mdash;</span> 24-hour SLA on flagged faults, post-install</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <form action={submitRFQ} className="bg-offwhite p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
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
