import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

/**
 * Symptom-led self-diagnosis strip. Lets a visitor recognise themselves and
 * self-qualify, then routes them into the existing 60-second water checker.
 *
 * The checker has no symptom query-param today, so each card links plainly to
 * /water-problem-checker. Cards are real text (not images), keyboard-focusable
 * with a visible focus ring, and distinguishable by their text labels — not by
 * colour.
 */
const CHECK = '/water-problem-checker';

const SYMPTOMS: Array<{ label: string; cause: string }> = [
  { label: 'Yellow or rust stains', cause: 'Dissolved iron oxidising on contact with air.' },
  { label: 'Marble turning orange', cause: 'Iron settling into porous stone and fittings.' },
  { label: 'Scale on the geyser', cause: 'Hardness — calcium and magnesium baking onto the element.' },
  { label: 'Soap won’t lather', cause: 'Hardness binding the soap before it can work.' },
  { label: 'Stiff, dull laundry', cause: 'Minerals locking into the fibres wash after wash.' },
  { label: 'Tight skin, coated hair', cause: 'Mineral residue left behind after every rinse.' },
];

export function SymptomStrip() {
  return (
    <Section padding="default">
      <div className="mb-10 md:mb-12 max-w-3xl flex flex-col gap-4">
        <Heading level={2}>If your water is doing any of this, it is telling you something.</Heading>
        <Body className="text-mute">
          Pick what you are seeing. The 60-second check tells you why &mdash; and what order to fix it in.
        </Body>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline list-none pl-0">
        {SYMPTOMS.map((s) => (
          <li key={s.label}>
            <Link
              href={CHECK}
              aria-label={`${s.label} — take the 60-second water check`}
              className="group h-full bg-offwhite p-6 md:p-8 flex flex-col gap-2 transition-colors duration-200 ease-calm hover:bg-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-inset"
            >
              <h3 className="text-h3 font-medium text-navy">{s.label}</h3>
              <Caption className="text-mute">{s.cause}</Caption>
              <span className="mt-2 inline-flex items-center gap-1.5 text-teal text-caption font-medium">
                See why
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Button href={CHECK}>Take the 60-second water check</Button>
      </div>
    </Section>
  );
}
