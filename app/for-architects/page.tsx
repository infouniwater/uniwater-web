import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Card } from '@/components/ui/Card';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { COMPONENT_MANUFACTURERS } from '@/content/site';

export const metadata: Metadata = {
  title: 'For architects & interior designers',
  description:
    'Engineered home water specified into your projects — vessel footprints, BIM blocks, install drawings, technical PDFs. One survey-led partner across every build.',
  openGraph: { images: ['/og/og-for-architects.svg'] },
  twitter: { images: ['/og/og-for-architects.svg'] },
};

const BENEFITS = [
  {
    title: 'Spec into the plan, not after tile.',
    body: 'A whole-house treatment system designed during construction routes plumbing cleanly, sites the plant in the utility area, and stays invisible. Specified after tile is repair work. Specified before tile is engineering.',
  },
  {
    title: 'A single supplier across the build.',
    body: 'One survey. One BOM. One handover. One AMC. From bathroom-level BathSoft up to building inlet WTP for the whole project, we are the same engineering team — not three vendors.',
  },
  {
    title: 'Documentation that holds up to scrutiny.',
    body: 'DWG vessel footprints, BIM blocks for the major capacities, install-location drawings, technical PDFs for procurement. Submittal-grade, version-controlled, available before tender.',
  },
];

const SPEC_LIBRARY = [
  { label: 'Vessel footprints', detail: 'DWG and PDF, every capacity from BathSoft Mono to HomeSoft 6K and the 8K–30K LPH building bands.' },
  { label: 'BIM blocks', detail: 'Revit families for the residential and building plant capacities. Layered for plumbing, electrical, structural.' },
  { label: 'Install-location drawings', detail: 'Architectural sections of the five install patterns — false ceiling, plumbing shaft, wall recess, under-counter, utility room.' },
  { label: 'Pre-construction water checklist', detail: 'What to test, when to test, what plumbing routes to leave open, what utility-room dimensions to plan for.' },
  { label: 'Technical PDFs', detail: 'Per-product data sheets with capacities, materials, dimensions, AMC scope. Submittal-ready.' },
  { label: 'Project-mode spec packs', detail: 'Bundled assets per project type — villa, mid-rise, gated complex, boutique hotel.' },
];

const PROCESS = [
  {
    n: '01',
    title: 'Brief us early.',
    body: 'A 15-minute call during DD or early CD is enough. Share the brief — number of bathrooms, water source, project location — and we send back a tentative system spec for your drawings.',
  },
  {
    n: '02',
    title: 'Spec into the drawings.',
    body: 'We supply DWG footprints, BIM blocks, and install-location drawings sized to your project. Your team integrates them into plumbing, electrical, and structural sheets.',
  },
  {
    n: '03',
    title: 'Site survey + free water test.',
    body: 'Before installation begins, our engineer visits the site, runs the water test, and confirms the design. Adjustments documented and shared with your team.',
  },
  {
    n: '04',
    title: 'Install + handover + AMC.',
    body: 'Our team installs, commissions, and signs off the system. Comprehensive AMC starts at handover. Your client gets the same engineering team for the next decade.',
  },
];

export default function ForArchitectsPage() {
  return (
    <>
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16 lg:py-24">
            <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
              <Eyebrow>For architects &amp; interior designers</Eyebrow>
              <Display>Engineered home water, specified into the build.</Display>
              <Lede className="text-mute">
                Pre-tile design. DWG, BIM, install drawings. A single survey-led partner from villa-level treatment to mid-rise WTP. So the fittings you specified perform the way the brand intended.
              </Lede>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                <Button href="/contact?audience=architect">Join the program</Button>
                <Button href="#spec-library" variant="tertiary">
                  Browse the spec library
                </Button>
              </div>
              <Caption className="text-mute mt-2">
                Are you a plumber or installer instead?{' '}
                <Link href="/for-plumbers" className="text-teal underline underline-offset-4">
                  Visit the plumber program &rarr;
                </Link>
              </Caption>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Photo
                description="Architect at a drafting table reviewing a Uniwater install-location drawing with a sample CP fitting alongside"
                assetRef="for-architects-hero"
                aspect="four-five"
                mobileAspect="sixteen-nine"
              />
            </div>
          </div>
        </div>
      </section>

      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Why specify UNIWATER</Eyebrow>
          <Heading level={2}>Three things specifiers actually need.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <Card key={b.title}>
              <Heading level={3} className="mb-3">{b.title}</Heading>
              <Body className="text-mute">{b.body}</Body>
            </Card>
          ))}
        </div>
      </Section>

      <Section padding="default" tone="subtle" id="spec-library">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Spec library</Eyebrow>
          <Heading level={2}>Everything you need on your drawings.</Heading>
          <Body className="text-mute mt-4">
            DWG, BIM, install drawings, and technical PDFs covering the full residential and building range. Submittal-grade documentation, version-controlled, available on request until the partner portal ships.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEC_LIBRARY.map((item) => (
            <div key={item.label} className="bg-offwhite border border-hairline p-6 flex flex-col gap-3">
              <div className="text-eyebrow font-medium uppercase text-teal">{item.label}</div>
              <Body className="text-mute">{item.detail}</Body>
            </div>
          ))}
        </div>
        <Caption className="mt-8 text-mute italic">
          Request packs via{' '}
          <a href="/contact?audience=architect" className="text-teal underline underline-offset-4">the contact form</a>{' '}
          with your project brief. We respond within one business day.
        </Caption>
      </Section>

      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Process</Eyebrow>
          <Heading level={2}>From brief to handover.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {PROCESS.map((step) => (
            <div key={step.n} className="flex flex-col gap-4">
              <div className="text-[56px] md:text-[64px] font-light leading-none text-teal">{step.n}</div>
              <Heading level={3}>{step.title}</Heading>
              <Body className="text-mute">{step.body}</Body>
            </div>
          ))}
        </div>
      </Section>

      <Section padding="default" tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <div className="text-eyebrow font-medium uppercase text-soft mb-4">Component supply</div>
            <Heading level={2} inverse className="mb-4">Named manufacturers, every project.</Heading>
            <Body inverse>
              FRP and SS316 vessels rated for the duty cycle. RO membranes from Hydranautics, Dow, LG. Resins from Tulsion and Ionex. Pumps from Wilo and Grundfos. Listed on every quote.
            </Body>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 gap-px bg-offwhite/15 border border-offwhite/15">
              {COMPONENT_MANUFACTURERS.map((mfr) => (
                <div key={mfr} className="bg-navy aspect-[3/2] flex items-center justify-center p-4">
                  <span className="text-caption text-offwhite font-medium">{mfr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section padding="default" tone="subtle">
        <div className="max-w-reading mx-auto text-center">
          <EditorialAccent className="mx-auto">
            The fittings you specified deserve the water they were engineered for.
          </EditorialAccent>
        </div>
      </Section>

      <FinalCTA
        headline="Specify UNIWATER into your next project."
        sub="Send your brief — bathrooms, water source, project location. We respond within one business day with a tentative system spec for your drawings."
        primaryCTA={{ label: 'Join the program', href: '/contact?audience=architect' }}
      />
    </>
  );
}
