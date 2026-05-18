import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { TextField, TextArea, SelectField } from '@/components/ui/Form';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { Photo } from '@/components/ui/Photo';
import { CITIES, CONTACT, STATS } from '@/content/site';
import { submitBookSurvey } from '@/app/actions/leads';
import { PROBLEM_LABEL, type ProblemToken } from '@/content/cross-links';

export const metadata: Metadata = {
  title: 'Book a free survey',
  description:
    'Tell us about your home. A UNIWATER engineer will visit, test your water, and write a quote within 48 hours. Free, no obligation.',
};

const REASSURANCE = [
  'Free survey, no obligation.',
  'Engineer visits within 48 hours.',
  'Detailed water test report on the spot.',
  'No quote until the survey is done.',
];

const PROBLEM_LABELS_LIST = Object.values(PROBLEM_LABEL);

function getPrefilledProblemLabel(raw: string | string[] | undefined): string | null {
  const token = Array.isArray(raw) ? raw[0] : raw;
  if (!token) return null;
  return PROBLEM_LABEL[token as ProblemToken] ?? null;
}

export default function BookSurveyPage({
  searchParams,
}: {
  searchParams?: { problem?: string | string[] };
}) {
  const prefilled = getPrefilledProblemLabel(searchParams?.problem);

  return (
    <>
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-12 md:py-16 max-w-4xl">
          <Eyebrow className="mb-4">Book a survey</Eyebrow>
          <Display>Tell us about your home. We&rsquo;ll come to you.</Display>
          <Lede className="text-mute mt-6">
            Free site visit, free water test, and a written quote within 48 hours. No quote is sent without a survey.
          </Lede>
        </div>
      </section>

      <Section padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <form action={submitBookSurvey} className="bg-offwhite border border-hairline p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-h2-m font-light text-navy mb-2">Survey request</h2>
                <Caption className="text-mute">Fields marked * are required.</Caption>
              </div>

              <TextField label="Name" name="name" required placeholder="Your name" />
              <TextField label="Mobile" name="mobile" type="tel" required placeholder="+91" />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="md:col-span-2"
              />

              <SelectField
                label="City"
                name="city"
                required
                placeholder="Select your city"
                options={[
                  ...CITIES.map((c) => ({ value: c.slug, label: `${c.name}, ${c.country}` })),
                  { value: 'outside', label: 'Outside these cities (we\u2019ll route you to a remote survey)' },
                ]}
              />
              <SelectField
                label="Property type"
                name="propertyType"
                required
                placeholder="Select property type"
                options={[
                  { value: 'apartment', label: 'Apartment / flat' },
                  { value: 'independent-house', label: 'Independent house' },
                  { value: 'villa', label: 'Villa' },
                  { value: 'under-construction', label: 'Under construction' },
                  { value: 'institutional', label: 'Institutional / commercial' },
                ]}
              />

              <SelectField
                label="Water source"
                name="waterSource"
                placeholder="If you know it"
                className="md:col-span-2"
                options={[
                  { value: 'municipal', label: 'Municipal' },
                  { value: 'borewell', label: 'Borewell' },
                  { value: 'mixed', label: 'Mixed (both)' },
                  { value: 'tanker', label: 'Tanker' },
                  { value: 'unknown', label: 'Don\u2019t know' },
                ]}
              />

              <div className="md:col-span-2">
                <label className="text-caption font-medium text-navy block mb-3">
                  What are you trying to solve?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROBLEM_LABELS_LIST.map((label) => (
                    <label key={label} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="problems"
                        value={label}
                        defaultChecked={prefilled === label}
                        className="w-4 h-4 accent-teal"
                      />
                      <span className="text-caption text-ink">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <TextArea
                label="Notes (optional)"
                name="notes"
                rows={4}
                className="md:col-span-2"
                placeholder="Best time to visit, anything else worth knowing"
              />

              <div className="md:col-span-2 mt-2 pt-4 border-t border-hairline">
                <Caption className="text-mute mb-4 block">
                  {STATS.homesServiced} homes serviced &middot; {STATS.citiesTotal} cities &middot; No quote without a survey.
                </Caption>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <SubmitButton>Book a free survey</SubmitButton>
                  <Caption className="text-mute">
                    We&rsquo;ll call within one business day to confirm.
                  </Caption>
                </div>
              </div>
            </form>
          </div>

          {/* Reassurance aside */}
          <aside className="lg:col-span-5">
            <Photo
              description="UNIWATER engineer at customer home, taking water sample at kitchen tap"
              assetRef="book-survey-aside"
              aspect="four-five"
            />
            <div className="mt-6 border border-hairline bg-tint/30 p-6">
              <div className="text-eyebrow font-medium uppercase text-teal mb-4">
                What to expect
              </div>
              <ul className="flex flex-col gap-3">
                {REASSURANCE.map((item) => (
                  <li key={item} className="text-body text-ink flex gap-3">
                    <span className="text-teal flex-shrink-0">&mdash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-hairline">
                <Caption className="text-mute">
                  Prefer to call?{' '}
                  <a
                    href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
                    className="text-navy underline underline-offset-4"
                  >
                    {CONTACT.phones[0]}
                  </a>
                </Caption>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
