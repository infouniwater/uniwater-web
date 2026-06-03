import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { PRIMARY_PHONE, PRIMARY_PHONE_HREF } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

/**
 * /water-problem-checker -- repurposed 2026-06-03 per Rajat.
 *
 * Was: a 4-step "quiz" that pretended to size a water system from four
 * multiple-choice answers. The result was decorative -- the page itself
 * ended with "we'll test on site anyway." Rajat flagged it as both
 * confusing and dishonest; he wants the route kept but repurposed as a
 * lighter alternate hook to the full site survey.
 *
 * The real distinction:
 *   - Site survey  = engineer comes to your home, evaluates water AND
 *                    plumbing routing AND space AND architecture AND
 *                    sizes the system. The full pre-spec.
 *   - Water test   = engineer comes to you with the test kit and reads
 *                    TDS, hardness, pH, iron, free chlorine on the spot.
 *                    Faster. No system spec. No commitment. Tells you
 *                    whether you even need the full survey.
 *
 * This page is the entry for the water-test track. The form lives at
 * /book-survey (?context=water-test pre-fills the intent flag on the
 * Odoo submission); the secondary CTA is a direct phone call, because
 * some prospects prefer to speak to a person before any form.
 *
 * All copy below is DRAFT-marked for Rajat's review.
 */

export const metadata: Metadata = buildMetadata({
  path: '/water-problem-checker',
  title: 'Water test at home — TDS, hardness, iron, pH | Uniwater',
  description:
    'Book a 10-minute on-site water test: TDS, hardness, iron, pH, free chlorine — read at your tap by a Uniwater engineer. Free, no commitment, no system quote until you ask for one. Across nine Indian and Nepali cities.',
  image: '/og/og-home.png',
});

const WHAT_WE_TEST = [
  {
    label: 'TDS',
    body:
      'Total dissolved solids. The single number that decides RO vs UF + UV at the kitchen tap. Read by handheld meter; result in seconds.',
  },
  {
    label: 'Hardness',
    body:
      'Calcium and magnesium as CaCO3 ppm. The driver of scale on geysers, fittings, and glassware. Read by titration drops; takes about a minute.',
  },
  {
    label: 'Iron',
    body:
      'Dissolved iron in mg/L. The cause of yellow stains, metallic taste, and shortened softener life. Read by colourimetric strip and bench check.',
  },
  {
    label: 'pH',
    body:
      'Acidity / alkalinity. Mostly within range in Indian municipal supply, often shifted on deep borewells. Read by colour-coded probe.',
  },
  {
    label: 'Free chlorine',
    body:
      'Residual chlorine in mg/L. Drives the chemical taste at the kitchen tap and ages CP fittings over years. Read by DPD reagent.',
  },
];

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Book the test.',
    body:
      'Tell us your address, your supply (borewell, municipal, mixed), and a window that works. We confirm by phone or WhatsApp within the working day.',
  },
  {
    n: '02',
    title: 'Engineer arrives with the kit.',
    body:
      'A trained engineer, in branded gear, with a portable kit. No vans of sales staff, no upsell talk. One person, ten minutes at the tap.',
  },
  {
    n: '03',
    title: 'Read on the spot, written summary.',
    body:
      'Each reading is taken in front of you and noted on a one-page summary. We tell you what the chemistry says and whether a full survey would be useful. No quote unless you ask for one.',
  },
];

const TEST_VS_SURVEY = [
  {
    label: 'Water test',
    body:
      'Ten minutes at the tap. Reads the chemistry. Tells you whether you have an iron or hardness problem, and roughly what category of system would address it. No vessel sizing. No plumbing walk-through. No quote.',
    cta: { label: 'Book a water test', href: '/book-survey?context=water-test', primary: true },
  },
  {
    label: 'Full site survey',
    body:
      'Forty-five minutes to an hour. Includes the same water test, plus a walk of plumbing routes, install locations, electrical for the control head, and space for the vessels. Ends with a written quote sized to your home.',
    cta: { label: 'Book a full survey', href: '/book-survey', primary: false },
  },
];

export default function WaterCheckerPage() {
  return (
    <>
      {/* Hero -- image-with-scrim, same vocabulary as the rest of the site. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[540px] lg:h-[calc(100vh-200px)] lg:min-h-[500px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/utility-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/utility-tablet.jpg" />
          <img
            src="/images/hero/utility-mobile.jpg"
            alt="A Uniwater engineer arriving at a customer home with a portable water-testing kit -- the lighter alternative to a full site survey."
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.94) 0%, rgba(4,69,95,0.78) 45%, rgba(4,69,95,0.35) 90%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 50%, rgba(4,69,95,0.30) 85%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
              Water test &mdash; lighter than a survey
            </p>
            {/* DRAFT — review */}
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Not ready for a full survey? Start with a 10-minute water test.
            </h1>
            {/* DRAFT — review */}
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              A trained engineer arrives at your tap with a portable kit and
              reads the chemistry on the spot &mdash; TDS, hardness, iron,
              pH, free chlorine. Free. No quote unless you ask for one. The
              answer tells you whether you need a full home survey or not.
            </p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 max-w-full">
              <Link
                href="/book-survey?context=water-test"
                className="inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 sm:px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
              >
                Book a water test
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

      {/* What we test -- LIGHT band, 5 cards. Each is a real test panel, not
          marketing fluff. Visitor sees exactly what the engineer is bringing. */}
      {/* DRAFT — review */}
      <Section padding="default">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">What we measure</Eyebrow>
          <Heading level={2}>Five readings, all at your tap.</Heading>
          <Body className="text-mute mt-4">
            Each reading is taken with a calibrated handheld or strip kit, in
            front of you. No samples sent away; no lab waiting. The
            measurement matches what an Indian water-treatment system is
            sized against.
          </Body>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_WE_TEST.map((item) => (
            <Card key={item.label}>
              <Eyebrow className="text-teal mb-2">{item.label}</Eyebrow>
              <Body className="text-mute">{item.body}</Body>
            </Card>
          ))}
        </div>
      </Section>

      {/* How it works -- DARK band with image overlay. Three steps. */}
      {/* DRAFT — review */}
      <Section tone="navy" padding="default" image={{ stem: 'plant-room' }}>
        <div className="mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>How the test happens</Eyebrow>
          <Heading level={2} inverse>Booked, kit on site, read in front of you.</Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.n} className="flex flex-col gap-3">
              <div className="text-[48px] md:text-[56px] font-light leading-none text-soft">{step.n}</div>
              <Heading level={3} inverse>{step.title}</Heading>
              <Body inverse className="text-offwhite/80">{step.body}</Body>
            </div>
          ))}
        </div>
        <EditorialAccent inverse className="mt-10 md:mt-14">
          A test, not a sales pitch.
        </EditorialAccent>
      </Section>

      {/* Test vs full survey -- LIGHT band. Honest comparison so the visitor
          self-selects. */}
      {/* DRAFT — review */}
      <Section padding="default" tone="subtle">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-4">Test vs full survey</Eyebrow>
          <Heading level={2}>Two ways in. Pick the one that fits where you are.</Heading>
          <Body className="text-mute mt-4">
            The water test is faster and lighter. The full survey is what
            you book when you already know you want a system and want the
            spec. Most homeowners start with the test and graduate to the
            survey when the chemistry tells them they need one.
          </Body>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEST_VS_SURVEY.map((opt) => (
            <div
              key={opt.label}
              className={`border bg-offwhite p-8 flex flex-col gap-5 ${opt.cta.primary ? 'border-teal' : 'border-hairline'}`}
            >
              <Eyebrow className={opt.cta.primary ? 'text-teal' : ''}>{opt.label}</Eyebrow>
              <Body className="text-mute flex-grow">{opt.body}</Body>
              <Link
                href={opt.cta.href}
                className={`inline-flex items-center gap-2 self-start sm:self-center text-[15px] font-medium transition-colors duration-200 ease-calm ${
                  opt.cta.primary
                    ? 'whitespace-nowrap bg-navy text-offwhite rounded-full px-6 py-3.5 hover:bg-teal'
                    : 'text-teal hover:text-navy border-b border-teal/30 hover:border-navy/50 pb-1'
                }`}
              >
                {opt.cta.label}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* DRAFT — review */}
      <FinalCTA
        headline="Get the chemistry first. Decide the system after."
        sub="Ten minutes at your tap, no commitment. Engineer at your door within 48 hours across nine cities; faster in Kolkata."
        primaryCTA={{ label: 'Book a water test', href: '/book-survey?context=water-test' }}
      />
    </>
  );
}
