'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { TextField, SelectField } from '@/components/ui/Form';
import { Infographic } from '@/components/ui/Infographic';
import { ProblemGrid } from '@/components/sections/ProblemGrid';
import { CITIES } from '@/content/site';
import { HARDNESS_BANDS } from '@/content/education';
import { cn } from '@/lib/cn';

/**
 * Water-problem checker — quiz UX per Blueprint §7.8.
 *
 * Single-question-per-screen pattern. Auto-advance on selection.
 * Result page shows hardness band (catalogue voice) + solution recommendation.
 *
 * Per Blueprint Sprint 0: embed hardness scale on result page.
 * No contact-details capture until result; minimal friction.
 */

type Step = 0 | 1 | 2 | 3 | 4;

interface Answers {
  source?: string;
  symptoms: string[];
  property?: string;
  city?: string;
}

const SOURCES = [
  { value: 'municipal', label: 'Municipal supply' },
  { value: 'borewell', label: 'Borewell' },
  { value: 'tanker', label: 'Tanker' },
  { value: 'mixed', label: 'Mixed sources' },
  { value: 'unknown', label: 'Don\u2019t know' },
];

const SYMPTOMS = [
  'Orange or yellow staining',
  'White scale on geyser / kettle',
  'Hair feels rough; skin feels dry',
  'Metallic / chemical taste or smell',
  'Visible particles in water',
  'Appliances failing early',
];

const PROPERTIES = [
  { value: '1-2-bhk', label: '1\u20132 BHK apartment' },
  { value: '3-4-bhk', label: '3\u20134 BHK apartment' },
  { value: 'independent', label: 'Independent house' },
  { value: 'villa', label: 'Villa / 5+ BHK' },
  { value: 'institutional', label: 'Institutional / commercial' },
];

export default function WaterCheckerPage() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Answers>({ symptoms: [] });

  const advance = (next: Step, patch: Partial<Answers>) => {
    setAnswers((a) => ({ ...a, ...patch }));
    setStep(next);
  };

  const toggleSymptom = (s: string) => {
    setAnswers((a) => ({
      ...a,
      symptoms: a.symptoms.includes(s)
        ? a.symptoms.filter((x) => x !== s)
        : [...a.symptoms, s],
    }));
  };

  const progress = (step / 4) * 100;

  return (
    <>
      {/* Problem grid — migrated from the homepage on 2026-05-21 to give
          visitors a symptom-first orientation before they enter the quiz.
          Same component as the home page used; copy unchanged. */}
      <ProblemGrid />

      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-8 md:py-10">
          <div className="flex items-center justify-between mb-6">
            <div className="text-eyebrow font-medium uppercase text-teal">
              Water-problem checker
            </div>
            <Caption className="text-mute">
              Step {Math.min(step + 1, 4)} of 4
            </Caption>
          </div>
          <div className="h-1 bg-hairline relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-teal transition-all duration-250 ease-calm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <Section padding="default">
        {step === 0 && (
          <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <Heading level={1} className="font-light">Where is your water from?</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOURCES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => advance(1, { source: s.value })}
                  className={cn(
                    'p-6 text-left border transition-all duration-200 ease-calm',
                    answers.source === s.value
                      ? 'border-navy bg-tint/40'
                      : 'border-hairline bg-offwhite hover:border-teal'
                  )}
                >
                  <span className="text-body text-ink font-medium">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <div>
              <Heading level={1} className="font-light mb-2">What have you noticed?</Heading>
              <Caption className="text-mute">Select all that apply.</Caption>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SYMPTOMS.map((s) => {
                const selected = answers.symptoms.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className={cn(
                      'p-6 text-left border transition-all duration-200 ease-calm',
                      selected
                        ? 'border-navy bg-tint/40'
                        : 'border-hairline bg-offwhite hover:border-teal'
                    )}
                  >
                    <span className="text-body text-ink">{s}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="tertiary" onClick={() => setStep(0)}>
                &larr; Back
              </Button>
              <Button onClick={() => setStep(2)}>Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <Heading level={1} className="font-light">How big is your home?</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROPERTIES.map((p) => (
                <button
                  key={p.value}
                  onClick={() => advance(3, { property: p.value })}
                  className={cn(
                    'p-6 text-left border transition-all duration-200 ease-calm',
                    answers.property === p.value
                      ? 'border-navy bg-tint/40'
                      : 'border-hairline bg-offwhite hover:border-teal'
                  )}
                >
                  <span className="text-body text-ink font-medium">{p.label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-start mt-6">
              <Button variant="tertiary" onClick={() => setStep(1)}>
                &larr; Back
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <Heading level={1} className="font-light">Which city?</Heading>
            <SelectField
              label="City"
              name="city"
              required
              placeholder="Select your city"
              options={[
                ...CITIES.map((c) => ({ value: c.slug, label: c.name })),
                { value: 'outside', label: 'Outside these cities' },
              ]}
              onChange={(e) => setAnswers((a) => ({ ...a, city: e.target.value }))}
            />
            <div className="flex justify-between mt-6">
              <Button variant="tertiary" onClick={() => setStep(2)}>
                &larr; Back
              </Button>
              <Button onClick={() => setStep(4)} disabled={!answers.city}>
                See the recommendation
              </Button>
            </div>
          </div>
        )}

        {step === 4 && <ResultView answers={answers} onReset={() => { setAnswers({ symptoms: [] }); setStep(0); }} />}
      </Section>
    </>
  );
}

function ResultView({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  // Tentative recommendation. Final answer comes from the on-site water test + survey.
  const recommendation = recommend(answers);
  const secondaryCta = recommendation.secondaryCta ?? { label: 'Book a free survey', href: '/book-survey' };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12">
      <div>
        <Eyebrow className="mb-3">Your recommendation</Eyebrow>
        <Heading level={1} className="font-light mb-4">
          {recommendation.headline}
        </Heading>
        <Lede className="text-mute">{recommendation.body}</Lede>
      </div>

      <div className="border border-hairline p-8 md:p-10 bg-tint/30">
        <div className="text-eyebrow font-medium uppercase text-teal mb-3">
          Recommended next step
        </div>
        <h3 className="text-h2-m md:text-h2 font-light text-navy mb-4">
          {recommendation.cta}
        </h3>
        <Body className="text-mute mb-6">{recommendation.ctaBody}</Body>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href={recommendation.href}>Read about {recommendation.solutionName}</Button>
          <Button href={secondaryCta.href} variant="secondary">
            {secondaryCta.label}
          </Button>
        </div>
      </div>

      {/* Hardness band — catalogue module per BLUEPRINT Sprint 0 + §3.7 (dark SVG as full-bleed band). */}
      <div>
        <Eyebrow className="mb-3">Where does your home sit?</Eyebrow>
        <Heading level={2} className="mb-3 font-light">Find your hardness band.</Heading>
        <Body className="text-mute max-w-reading mb-8">
          A ten-minute tap test confirms the ppm. The number decides the treatment, not the other way around.
        </Body>
        <Infographic
          assetName="hardness-scale.svg"
          description="Hardness scale from 0 to 300+ ppm across four bands: Soft (under 60 ppm), Moderately hard (60–120 ppm), Hard (120–180 ppm), Very hard (over 180 ppm). Each band lists typical sources and the consequence at that level."
          className="mb-8"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline">
          {HARDNESS_BANDS.map((band) => (
            <div key={band.band} className="bg-offwhite p-6 flex flex-col gap-3">
              <h4 className="text-h3 font-semibold text-navy">{band.band}</h4>
              <Caption className="text-teal font-medium">{band.range}</Caption>
              <Caption className="text-mute">{band.sources}</Caption>
              <Caption className="text-mute">{band.consequence}</Caption>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button variant="tertiary" onClick={onReset}>
          Start over
        </Button>
      </div>
    </div>
  );
}

interface RecommendResult {
  headline: string;
  body: string;
  solutionName: string;
  cta: string;
  ctaBody: string;
  href: string;
  /** Overrides the default residential "Book a free survey" secondary CTA. Used to flip to "Submit an RFQ" for institutional answers per BLUEPRINT §12.5. */
  secondaryCta?: { label: string; href: string };
}

// Cities in the arsenic-affected Gangetic / Brahmaputra belt where borewell water carries elevated risk.
const ARSENIC_RISK_CITIES = new Set(['siliguri', 'guwahati', 'biratnagar', 'outside']);

function recommend(answers: Answers): RecommendResult {
  const { source, symptoms, property, city } = answers;

  const has = (kw: string) => symptoms.some((s) => s.toLowerCase().includes(kw.toLowerCase()));
  const hasIron = has('orange') || has('yellow');
  const hasScale = has('scale') || has('hair') || has('rough');
  const hasTaste = has('metallic') || has('chemical');
  const hasParticles = has('particle');
  const hasAppliances = has('appliance');
  const noSymptoms = symptoms.length === 0;

  const isBorewell = source === 'borewell' || source === 'mixed';
  const isInstitutional = property === 'institutional';
  const isVilla = property === 'villa';
  const isIndependent = property === 'independent';
  const isLargeHome = isVilla || isIndependent;
  const isMidHome = property === '3-4-bhk';

  const arsenicRisk = isBorewell && ARSENIC_RISK_CITIES.has(city ?? '');

  // 1. Institutional / commercial — different funnel + different CTA verb (BLUEPRINT §12.5).
  if (isInstitutional) {
    return {
      headline: 'You should talk to our industrial team.',
      body: 'Institutional and commercial water needs are sized to peak occupancy, not residential draw. The RFQ flow connects you with an engineer who specs systems from 8K LPH building plants to 50K LPH industrial RO.',
      solutionName: 'industrial systems',
      cta: 'Recommended: industrial RFQ.',
      ctaBody: 'Tell us the site, the application, and the daily volume. We respond within one business day with a layout, a BOM, and a price you can take to procurement.',
      href: '/industrial',
      secondaryCta: { label: 'Submit an RFQ', href: '/industrial#rfq' },
    };
  }

  // 2. Arsenic-risk borewell — test before sizing. A drinking-water system at
  //    the kitchen tap is the right baseline; whole-house pre-treatment follows
  //    if levels are higher. The survey carries the test kit.
  if (arsenicRisk) {
    return {
      headline: 'Test the water first. Then design.',
      body: 'Your city and water source sit in the arsenic-affected belt. Arsenic is tasteless, odourless, and colourless. The only way to know is to test. If the test confirms it, treatment at the drinking-water tap is mandatory; whole-house pre-treatment follows if levels are higher.',
      solutionName: 'drinking-water system',
      cta: 'Recommended: drinking-water system at the kitchen, sized to confirmed levels.',
      ctaBody: 'A free survey includes the on-site water test. We size the system from the result.',
      href: '/solutions/drinking-water-solution',
    };
  }

  // 3. Iron + borewell — pretreatment first, sized by home.
  if (hasIron && isBorewell) {
    const size = isLargeHome
      ? 'HomeSoft with iron pre-treatment, 4K or 6K LPH'
      : isMidHome
      ? 'HomeSoft with iron pre-treatment, 2K LPH'
      : 'Iron filter at the bathroom or kitchen feed, with optional softening downstream';
    return {
      headline: 'Iron filter first. Softening second.',
      body: 'Borewell water with iron staining is the textbook case for sequenced treatment: oxidation and iron-media filtration upstream of softening. Treating tap-by-tap will fail because iron exhausts softening resin in months, not years. The order matters more than the equipment.',
      solutionName: 'iron filter',
      cta: 'Recommended: ' + size + '.',
      ctaBody: 'Sized to your bathroom count and household draw. Installed in the utility area or plumbing shaft. Monthly service from month one.',
      href: '/solutions/iron-filter',
    };
  }

  // 4. Scale-dominant problems — sized by property.
  if (hasScale) {
    if (isLargeHome) {
      const size = isVilla ? '6K LPH' : '4K LPH';
      return {
        headline: 'Whole-house treatment. HomeSoft ' + size + '.',
        body: 'For an independent house or villa, treating water at the inlet is the right answer. Every shower, every sink, every appliance protected from a single system. Four stages (sediment, iron, carbon, softening), sized to your peak draw including garden taps.',
        solutionName: 'whole-house filtration',
        cta: 'Recommended: HomeSoft ' + size + '.',
        ctaBody: 'Installed in the utility area. Architects coordinate before tile. Monthly service for the life of the contract.',
        href: '/solutions/whole-house-water-filter',
      };
    }
    if (isMidHome) {
      return {
        headline: 'Whole-house treatment. HomeSoft 2K.',
        body: 'For a 3 to 4 BHK apartment with hard-water symptoms across the home, inlet treatment is more cost-effective than per-bathroom retrofits. Four stages at 2K LPH covers a typical 3 to 4 bathroom flat.',
        solutionName: 'whole-house filtration',
        cta: 'Recommended: HomeSoft 2K LPH.',
        ctaBody: 'Installed in the utility area, the plumbing shaft, or the kitchen balcony. Decided at survey, not from the catalogue.',
        href: '/solutions/whole-house-water-filter',
      };
    }
    return {
      headline: 'Start with the bathroom. BathSoft.',
      body: 'For a 1 to 2 BHK apartment with hard-water symptoms, per-bathroom treatment is the most cost-effective entry point. The configuration (Mono, Duo, or Trio) depends on shower fittings and how much the bathroom asks of the water. We decide at survey.',
      solutionName: 'bathroom filter',
      cta: 'Recommended: BathSoft Mono / Duo / Trio.',
      ctaBody: 'Mono for a basic shower, Duo for rain shower plus body jets, Trio for a master suite with steam or jacuzzi. Fits in five install locations without breaking the bathroom lines.',
      href: '/solutions/bathroom-filter',
    };
  }

  // 5. Drinking-water taste / chemical smell / visible particles — kitchen-only treatment.
  if (hasTaste || hasParticles) {
    return {
      headline: 'Kitchen drinking-water system.',
      body: 'Metallic taste, chemical smell, or visible particles at the kitchen tap point to a drinking-water-only treatment need. The right answer (RO vs UF + UV) depends on TDS: RO above 500 ppm, UF + UV below 200, test-and-consult in between. We test at the survey.',
      solutionName: 'drinking water system',
      cta: 'Recommended: kitchen RO or UF + UV, sized to TDS.',
      ctaBody: 'A 10-minute TDS test at the kitchen tap decides. Wall-mounted, under-sink, or centralised. The plumbing decides where it goes.',
      href: '/solutions/drinking-water-solution',
    };
  }

  // 6. Appliances failing without an explicit scale or iron call-out — likely scale.
  if (hasAppliances) {
    const href = isLargeHome || isMidHome ? '/solutions/whole-house-water-filter' : '/solutions/water-softener';
    return {
      headline: 'Treat the water before the next appliance fails.',
      body: 'Geysers, washing machines, and dishwashers fail early on hard or iron-bearing water. The fix depends on the chemistry, the home size, and where the failures are concentrated. We test and size at the survey.',
      solutionName: isLargeHome || isMidHome ? 'whole-house filtration' : 'water softener',
      cta: 'Recommended: whole-house treatment or a per-bathroom softener, decided at survey.',
      ctaBody: 'A free survey runs the parameter test, identifies the cause, and recommends the cheapest effective fix.',
      href,
    };
  }

  // 7. No symptoms reported — preventive / pre-construction context.
  if (noSymptoms) {
    return {
      headline: 'You are at the right time to do this.',
      body: 'No specific symptom yet is the right time. Pre-tile, pre-construction, pre-handover. We test the water, map the plumbing, and recommend the right capacity for your home before any decision is locked into the architecture.',
      solutionName: 'how the four-step process works',
      cta: 'Recommended: free survey first.',
      ctaBody: 'An engineer visits within 48 hours. Free water test, written quote, no commitment. The system gets designed before tile, not after.',
      href: '/how-it-works',
    };
  }

  // 8. Fallback.
  return {
    headline: 'A site visit will narrow it down.',
    body: 'Your answers suggest treatment is needed, but the right configuration depends on the specific water chemistry. A 10-minute on-site test, no obligation, gives the answer.',
    solutionName: 'how the four-step process works',
    cta: 'Recommended: free survey.',
    ctaBody: 'An engineer visits within 48 hours. Free water test, written quote, no commitment.',
    href: '/how-it-works',
  };
}
