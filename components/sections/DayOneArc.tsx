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
  /** Optional smaller unit suffix (used for "lakh" on card 3 so the
      whole number stays on one line at a consistent size). */
  unit?: string;
  /** One-line framing of what that cost represents. */
  costLabel: string;
  /** Single short sentence — replaces the bullet list. */
  body: string;
  /** Sign of the cost — drives the colour + weight of the big number. */
  tone: 'saved' | 'spent' | 'lost';
}

const STAGES: Stage[] = [
  {
    marker: '01',
    label: 'Day one',
    cost: '₹50,000',
    costLabel: 'saved today',
    body: 'The five-minute pick with the plumber. Generic system, no survey, no long view.',
    tone: 'saved',
  },
  {
    marker: '02',
    label: 'Eighteen months',
    cost: '₹40,000',
    costLabel: 'first service & replacement bill',
    body: 'Geyser scaling. Marble grout going orange. Hair feels different. The house starts ageing.',
    tone: 'spent',
  },
  {
    marker: '03',
    label: 'Ten years',
    cost: '₹10–12',
    unit: 'lakh',
    costLabel: 'compounded loss',
    body: 'Appliances replaced. Marble re-polished. Plus what money can’t fix — hair thinning, skin damage, premature ageing.',
    tone: 'lost',
  },
];

// Per-card tone — colour + weight progression that visually echoes
// the compounding the section describes.
const TONE: Record<Stage['tone'], string> = {
  saved: 'text-soft font-light',
  spent: 'text-offwhite/70 font-light',
  lost:  'text-offwhite font-normal',
};

export function DayOneArc() {
  return (
    <Section tone="navy" padding="default">
      <div className="flex flex-col gap-4 mb-10 md:mb-14 max-w-3xl">
        <Eyebrow className="!text-soft">The decision</Eyebrow>
        <Heading level={2} inverse>
          Day one decisions, ten-year prices.
        </Heading>
        <Body inverse className="text-offwhite/80 text-lede font-light mt-2">
          The five-minute call with the plumber on day one is the most expensive decision in the house.
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
              <div className={`flex items-baseline gap-2 whitespace-nowrap [font-feature-settings:'tnum']`}>
                <span className={`text-5xl sm:text-6xl leading-none ${TONE[stage.tone]}`}>
                  {stage.cost}
                </span>
                {stage.unit && (
                  <span className={`text-2xl sm:text-3xl leading-none ${TONE[stage.tone]}`}>
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
          Water treatment is the choice that runs underneath everything else. Done properly, it protects the fittings, the appliances &mdash; and the things money can&rsquo;t replace: the family&rsquo;s skin, hair, and the years they don&rsquo;t get back.
        </EditorialAccent>
      </div>
    </Section>
  );
}
