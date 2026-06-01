import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, EditorialAccent } from '@/components/ui/Typography';

/**
 * Day One vs Eighteen Months vs Ten Years.
 * Per BLUEPRINT §7 and the 2026 Homeowner Catalogue p.2.
 *
 * Three numbers, side-by-side. The argument IS the inversion across
 * the row: ₹50K saved → ₹40K spent → ₹10–12 LAKH lost. Big-type
 * numbers carry the message; one short sentence per card supplies
 * context, not detail.
 *
 * 2026-06-02 rhythm fix: reverted from navy image-with-scrim back to
 * a light (subtle-toned) surface. Two adjacent dark sections (the
 * just-redesigned AudienceRouter and this one) broke the dark/light
 * cadence rule — a dark section must always be followed by a white
 * one. DayOneArc is the better candidate to go light because its
 * numerical content reads cleanly on a light surface; AudienceRouter
 * (the ceremonial decision moment) keeps the dark treatment.
 */

interface Stage {
  /** Order marker (01 / 02 / 03). */
  marker: string;
  /** Time-horizon label. */
  label: string;
  /** Big-type number. */
  cost: string;
  /** Optional smaller unit suffix. */
  unit?: string;
  /** One-line framing of what that cost represents. */
  costLabel: string;
  /** Single short sentence — replaces the bullet list. */
  body: string;
  /** Tone of the card — drives the colour + weight of the big number. */
  tone: 'invested' | 'saved' | 'protected';
}

const STAGES: Stage[] = [
  {
    marker: '01',
    label: 'Day one',
    cost: 'Customised.',
    costLabel: 'engineered for your home',
    body: 'Plumber recommends Uniwater. Water tested, system specced, install engineered — decided on chemistry, not catalogue price.',
    tone: 'invested',
  },
  {
    marker: '02',
    label: 'Eighteen months',
    cost: '₹1',
    unit: 'lakh',
    costLabel: 'saved',
    body: 'Appliances pristine. Marble unstained. Skin and hair notice the difference. No emergency service calls.',
    tone: 'saved',
  },
  {
    marker: '03',
    label: 'Ten years',
    cost: '₹10–12',
    unit: 'lakh',
    costLabel: 'saved — plus what money can’t buy',
    body: 'Appliances on their original lifespan. Marble and fittings as they came. The family’s skin, hair, and the years they keep.',
    tone: 'protected',
  },
];

// On the light surface the progressive emphasis is delivered by
// weight, not colour: teal Book → teal Medium → navy Medium so the
// final stage carries the most ink.
const TONE: Record<Stage['tone'], string> = {
  invested:  'text-teal font-light',
  saved:     'text-teal font-normal',
  protected: 'text-navy font-normal',
};

export function DayOneArc() {
  return (
    <Section tone="subtle" padding="default">
      <div className="flex flex-col gap-3 sm:gap-4 mb-8 md:mb-14 max-w-3xl">
        <Eyebrow>The decision</Eyebrow>
        <Heading level={2}>
          Day one decisions, decade-long returns.
        </Heading>
        <Body className="text-mute text-lede font-light mt-2">
          The right system on day one compounds &mdash; lakhs saved over the years, plus the wellness money can&rsquo;t replace.
        </Body>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline">
        {STAGES.map((stage, i) => (
          <div
            key={stage.marker}
            className="bg-offwhite p-5 sm:p-8 md:p-10 flex flex-col gap-3 sm:gap-6 relative"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-eyebrow font-ui font-medium uppercase text-teal tracking-[0.18em]">
                {stage.marker}
              </span>
              <span className="text-eyebrow font-ui font-medium uppercase text-teal tracking-[0.18em]">
                {stage.label}
              </span>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="flex items-baseline gap-2 whitespace-nowrap font-numeric [font-feature-settings:'tnum']">
                <span className={`text-2xl sm:text-5xl leading-none ${TONE[stage.tone]}`}>
                  {stage.cost}
                </span>
                {stage.unit && (
                  <span className={`text-base sm:text-2xl leading-none ${TONE[stage.tone]}`}>
                    {stage.unit}
                  </span>
                )}
              </div>
              <span className="text-caption uppercase tracking-wider text-mute font-medium">
                {stage.costLabel}
              </span>
            </div>

            <p className="text-mute text-caption sm:text-body leading-snug [text-wrap:balance]">
              {stage.body}
            </p>

            {i < STAGES.length - 1 && (
              <span
                aria-hidden="true"
                className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center rounded-full bg-offwhite border border-teal/40 text-teal"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-16 max-w-reading">
        <EditorialAccent>
          Water treatment is the choice that runs underneath everything else. Done properly, it protects the fittings, the appliances &mdash; and the things money can&rsquo;t replace: the family&rsquo;s skin, hair, and the years they keep.
        </EditorialAccent>
      </div>
    </Section>
  );
}
