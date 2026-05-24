import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, EditorialAccent } from '@/components/ui/Typography';

/**
 * Day One vs Eighteen Months vs Ten Years.
 * Per BLUEPRINT §7 and the 2026 Homeowner Catalogue p.2.
 *
 * Three numbers, side-by-side. The argument IS the inversion across
 * the row: ₹50K saved → ₹40K spent → ₹10–12 LAKH lost. Big-type
 * numbers carry the message; one short sentence per card supplies
 * context, not detail. No bullets.
 *
 * UI passes (2026-05-25):
 *   1. "₹10–12 LAKH" now splits into big numeric + smaller `lakh`
 *      suffix so all three cards' numbers sit on a single line at
 *      a consistent baseline (the previous version wrapped on card 3).
 *   2. Tone progression — saved stays soft-teal (positive), spent
 *      shifts to muted off-white (neutral), lost goes full off-white
 *      with bolder weight (the alarming punchline).
 *   3. Chevron connectors in the column gap so the row reads as an
 *      arc, not three independent rectangles. Mobile drops them
 *      since the cards stack vertically.
 */

interface Stage {
  /** Order marker (01 / 02 / 03). */
  marker: string;
  /** Time-horizon label. */
  label: string;
  /** Big-type number. */
  cost: string;
  /** Optional smaller unit suffix (used for "lakh" on cards 2 + 3 so
      "₹1 lakh" / "₹10–12 lakh" stay on one line with consistent
      typography across all three cards). */
  unit?: string;
  /** One-line framing of what that cost represents. */
  costLabel: string;
  /** Single short sentence — replaces the bullet list. */
  body: string;
  /** Tone of the card — drives the colour + weight of the big number.
      All three tones positive (this is the value-of-the-right-choice
      arc, not cost-of-doing-nothing). */
  tone: 'invested' | 'saved' | 'protected';
}

const STAGES: Stage[] = [
  {
    marker: '01',
    label: 'Day one',
    // Card 01 is the SETUP not an outcome — there's no monetary
    // amount to attach to "the right decision was made." The big-type
    // slot carries the qualitative anchor instead. Rendered at the
    // same scale as the ₹ amounts on cards 2 + 3 for row consistency.
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

// Per-card tone — all three positive, weight progressively bolder
// across the arc so the row visually reads as gains compounding
// (Day one → 18 months → 10 years).
const TONE: Record<Stage['tone'], string> = {
  invested:  'text-soft font-light',
  saved:     'text-soft font-normal',
  protected: 'text-offwhite font-normal',
};

export function DayOneArc() {
  return (
    <Section tone="navy" padding="default">
      <div className="flex flex-col gap-4 mb-10 md:mb-14 max-w-3xl">
        <Eyebrow className="!text-soft">The decision</Eyebrow>
        <Heading level={2} inverse>
          Day one decisions, decade-long returns.
        </Heading>
        <Body inverse className="text-offwhite/80 text-lede font-light mt-2">
          The right system on day one compounds &mdash; lakhs saved over the years, plus the wellness money can&rsquo;t replace.
        </Body>
      </div>

      {/* Three numbers, one short line each. The cost typography is
          the visual anchor; the chevrons in the gap make the row read
          as a compounding arc. */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-px bg-offwhite/15 border border-offwhite/15">
        {STAGES.map((stage, i) => (
          <div
            key={stage.marker}
            className="bg-navy p-6 sm:p-8 md:p-10 flex flex-col gap-5 sm:gap-6 relative"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-eyebrow font-medium uppercase text-soft tracking-wide">
                {stage.marker}
              </span>
              <span className="text-eyebrow font-medium uppercase text-soft tracking-wide">
                {stage.label}
              </span>
            </div>

            {/* The number — large, dominant. Suffix unit (e.g. "lakh")
                rendered smaller + inline so the whole expression stays
                on one line at a consistent baseline across all three
                cards. tabular-nums + whitespace-nowrap prevent any
                further wrapping or jitter. */}
            <div className="flex flex-col gap-2">
              {/* Cost typography 2026-05-25 — was text-5xl sm:text-6xl
                  (48 → 60 px). Felt too dominant against the card body;
                  bumped down one step on both breakpoints so the number
                  is still the visual anchor (~1.5× the section H2 scale)
                  without crowding the rest of the card. Suffix scaled
                  proportionally. */}
              <div className={`flex items-baseline gap-2 whitespace-nowrap [font-feature-settings:'tnum']`}>
                <span className={`text-4xl sm:text-5xl leading-none ${TONE[stage.tone]}`}>
                  {stage.cost}
                </span>
                {stage.unit && (
                  <span className={`text-xl sm:text-2xl leading-none ${TONE[stage.tone]}`}>
                    {stage.unit}
                  </span>
                )}
              </div>
              <span className="text-caption uppercase tracking-wider text-soft/80 font-medium">
                {stage.costLabel}
              </span>
            </div>

            <p className="text-offwhite/80 text-body leading-snug [text-wrap:balance]">
              {stage.body}
            </p>

            {/* Chevron connector — sits in the gap between this card
                and the next. Only renders for cards 1 and 2, and only
                on md+ where the grid is horizontal. The chevron is
                absolutely positioned so it doesn't take grid space. */}
            {i < STAGES.length - 1 && (
              <span
                aria-hidden="true"
                className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center rounded-full bg-navy border border-soft/40 text-soft"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-16 max-w-reading">
        <EditorialAccent className="!text-soft">
          Water treatment is the choice that runs underneath everything else. Done properly, it protects the fittings, the appliances &mdash; and the things money can&rsquo;t replace: the family&rsquo;s skin, hair, and the years they keep.
        </EditorialAccent>
      </div>
    </Section>
  );
}
