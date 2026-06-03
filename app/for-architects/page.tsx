import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Card } from '@/components/ui/Card';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { COMPONENT_MANUFACTURERS } from '@/content/site';

export const metadata: Metadata = buildMetadata({
  path: '/for-architects',
  title: 'For architects & interior designers',
  description:
    'Engineered home water specified into your projects — vessel footprints, BIM blocks, install drawings, technical PDFs. One survey-led partner across every build.',
  image: '/og/og-for-architects.png',
});

const BENEFITS = [
  {
    title: 'Spec into the plan, not after tile.',
    body: 'Designed during construction, the system routes cleanly and stays invisible. Specified after tile is repair work.',
  },
  {
    title: 'A single supplier across the build.',
    body: 'One survey, one BOM, one handover, one AMC — from BathSoft to building-inlet WTP. Not three vendors.',
  },
  {
    title: 'Documentation that holds up to scrutiny.',
    body: 'DWG, BIM, install drawings, submittal-grade PDFs. Version-controlled, available before tender.',
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
    body: 'A 15-minute call at DD or early CD. Share bathrooms, water source, project location — we send back a tentative system spec.',
  },
  {
    n: '02',
    title: 'Spec into the drawings.',
    body: 'DWG footprints, BIM blocks, install-location drawings sized to your project. Your team integrates into plumbing, electrical, structural sheets.',
  },
  {
    n: '03',
    title: 'Site survey + free water test.',
    body: 'Engineer visits site, tests water, confirms design. Adjustments documented and shared.',
  },
  {
    n: '04',
    title: 'Install + handover + AMC.',
    body: 'We install, commission, sign off. Comprehensive AMC starts at handover. Same team for the next decade.',
  },
];

export default function ForArchitectsPage() {
  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[560px] lg:h-[calc(100vh-200px)] lg:min-h-[520px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/bathroom-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/bathroom-tablet.jpg" />
          <img
            src="/images/hero/bathroom-mobile.jpg"
            alt="A bathroom drinking-water filter installed beside a luxury freestanding tub overlooking a tropical garden."
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
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">For architects &amp; interior designers</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Engineered home water, specified into the build.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Pre-tile design. DWG, BIM, install drawings. A single survey-led partner from villa-level treatment to mid-rise WTP. So the fittings you specified perform the way the brand intended.
            </p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href="/contact?audience=architect"
                className="inline-flex items-center gap-2 self-start whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Join the program
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#spec-library" className="group inline-flex self-start text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm max-w-full">
                <span className="inline-flex items-center gap-1.5 border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                  Browse the spec library
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </span>
              </Link>
            </div>
            <p className="text-caption text-offwhite/65 mt-2">
              Are you a plumber or installer instead?{' '}
              <Link href="/for-plumbers" className="text-offwhite/85 hover:text-offwhite transition-colors duration-200 ease-calm underline underline-offset-4 decoration-offwhite/30">
                Visit the plumber program &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Why specify Uniwater</Eyebrow>
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
            DWG, BIM, install drawings, technical PDFs. Submittal-grade, version-controlled, shared by email on request. A self-serve partner portal is in development.
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

      <Section padding="default" tone="navy" image={{ stem: 'bathroom' }}>
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
        headline="Specify Uniwater into your next project."
        sub="Send your brief — bathrooms, water source, project location. We respond within one business day with a tentative system spec for your drawings."
        primaryCTA={{ label: 'Join the program', href: '/contact?audience=architect' }}
      />
    </>
  );
}
