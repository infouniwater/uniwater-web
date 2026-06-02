'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { TextField, TextArea, SelectField } from '@/components/ui/Form';
import { cn } from '@/lib/cn';
import { submitRemoteSurvey } from '@/app/actions/leads';

/**
 * Remote site survey — multi-step form per BLUEPRINT §7.10.
 * For NRI buyers, out-of-city customers, pre-construction enquiries.
 *
 * 4 steps: property → symptoms → photos → contact.
 *
 * Implementation note: all four step blocks render to the DOM at once with
 * visibility toggled by CSS. This is what lets values entered on earlier
 * steps survive forward/back navigation — the inputs never unmount. Submit
 * happens once at step 3 against `submitRemoteSurvey`, which sees the full
 * FormData (every step's named field) and creates the Odoo lead.
 */

type Step = 0 | 1 | 2 | 3;

const STEP_LABELS = ['About the property', 'Symptoms', 'Photos & water test', 'Your contact details'] as const;

const SYMPTOMS = [
  'Orange / yellow staining',
  'White scale on geyser, kettle, fittings',
  'Hair and skin feel rough',
  'Metallic / chemical taste',
  'Visible particles in water',
  'Appliances failing early',
  'Bottled water dependence',
  'No symptoms - preventive build',
];

const UPLOAD_ITEMS = [
  'Visible water stains (if any)',
  'Bathroom layout / floor plan',
  'Plumbing room or shaft',
  'Water test report (optional)',
];

export default function RemoteSiteSurveyPage() {
  const [step, setStep] = useState<Step>(0);

  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[400px] md:h-[480px] lg:h-[calc(100vh-260px)] lg:min-h-[420px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/under-counter-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/under-counter-tablet.jpg" />
          <img src="/images/hero/under-counter-mobile.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Remote site survey</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">
              Out of our cities? Send a remote brief.
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              For NRI buyers, out-of-network projects, and pre-construction enquiries. Tell us about the property and your water symptoms; email photos and any water-test report after you submit. We respond within 48 hours.
            </p>
          </div>
        </div>
      </section>

      <Section padding="default">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-3">
            <Caption className="text-mute">Step {step + 1} of 4</Caption>
            <Caption className="text-mute">{STEP_LABELS[step]}</Caption>
          </div>
          <div className="h-1 bg-hairline relative overflow-hidden mb-12">
            <div
              className="absolute inset-y-0 left-0 bg-teal transition-all duration-250 ease-calm"
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            />
          </div>

          <form action={submitRemoteSurvey}>
            {/* STEP 0 — About the property */}
            <div className={cn('flex flex-col gap-6', step !== 0 && 'hidden')}>
              <Heading level={2} className="font-light">About the property.</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="Property type"
                  name="propertyType"
                  required
                  placeholder="Select"
                  options={[
                    { value: 'apartment', label: 'Apartment / flat' },
                    { value: 'independent', label: 'Independent house' },
                    { value: 'villa', label: 'Villa' },
                    { value: 'under-construction', label: 'Under construction' },
                  ]}
                />
                <SelectField
                  label="BHK / bedrooms"
                  name="bhk"
                  required
                  placeholder="Select"
                  options={[
                    { value: '1-2', label: '1 to 2' },
                    { value: '3-4', label: '3 to 4' },
                    { value: '5+', label: '5 or more' },
                  ]}
                />
                <TextField label="Number of bathrooms" name="bathrooms" type="number" required min={1} />
                <TextField label="Number of kitchens" name="kitchens" type="number" required min={1} />
                <SelectField
                  label="Water source"
                  name="source"
                  required
                  placeholder="Select"
                  className="md:col-span-2"
                  options={[
                    { value: 'municipal', label: 'Municipal supply' },
                    { value: 'borewell', label: 'Borewell' },
                    { value: 'mixed', label: 'Mixed' },
                    { value: 'tanker', label: 'Tanker' },
                  ]}
                />
                <TextField
                  label="Location"
                  name="location"
                  required
                  placeholder="City, state, country"
                  className="md:col-span-2"
                />
              </div>
              <div className="flex justify-end mt-6">
                <Button type="button" onClick={() => setStep(1)}>Continue</Button>
              </div>
            </div>

            {/* STEP 1 — Symptoms */}
            <div className={cn('flex flex-col gap-6', step !== 1 && 'hidden')}>
              <Heading level={2} className="font-light">Symptoms.</Heading>
              <Caption className="text-mute -mt-3">Select all that apply.</Caption>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SYMPTOMS.map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-3 p-4 border border-hairline cursor-pointer hover:border-teal transition-colors duration-200 ease-calm"
                  >
                    <input type="checkbox" name="symptoms" value={s} className="w-4 h-4 accent-teal" />
                    <span className="text-body text-ink">{s}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button type="button" variant="tertiary" onClick={() => setStep(0)}>
                  &larr; Back
                </Button>
                <Button type="button" onClick={() => setStep(2)}>Continue</Button>
              </div>
            </div>

            {/* STEP 2 — Photos & water test (email-based until upload backend ships) */}
            <div className={cn('flex flex-col gap-6', step !== 2 && 'hidden')}>
              <Heading level={2} className="font-light">Photos &amp; water test.</Heading>
              <Body className="text-mute">
                Email the items below to{' '}
                <a href="mailto:support@uniwater.co.in" className="text-teal underline underline-offset-4">
                  support@uniwater.co.in
                </a>{' '}
                after you submit the brief in step 4. Reference the same email address you give us next, and we will respond within 48 hours.
              </Body>
              <div className="flex flex-col gap-4">
                {UPLOAD_ITEMS.map((label, i) => (
                  <div key={label} className="border border-hairline p-6 flex items-start gap-4">
                    <span className="text-eyebrow font-medium uppercase text-teal flex-shrink-0 pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="text-body text-ink font-medium">{label}</div>
                      <Caption className="text-mute">JPG, PNG, or PDF up to 10 MB per attachment</Caption>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button type="button" variant="tertiary" onClick={() => setStep(1)}>
                  &larr; Back
                </Button>
                <Button type="button" onClick={() => setStep(3)}>Continue</Button>
              </div>
            </div>

            {/* STEP 3 — Contact details + submit */}
            <div className={cn('flex flex-col gap-6', step !== 3 && 'hidden')}>
              <Heading level={2} className="font-light">Your contact details.</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField label="Name" name="name" required />
                <TextField label="Mobile (with country code)" name="mobile" type="tel" required />
                <TextField label="Email" name="email" type="email" required className="md:col-span-2" />
                <TextArea
                  label="Notes (optional)"
                  name="notes"
                  rows={4}
                  className="md:col-span-2"
                  placeholder="Anything else worth knowing - architect details, project timeline, etc."
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                <Button type="button" variant="tertiary" onClick={() => setStep(2)}>
                  &larr; Back
                </Button>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <Caption className="text-mute">We respond within 48 hours.</Caption>
                  <SubmitButton>Submit remote brief</SubmitButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}
