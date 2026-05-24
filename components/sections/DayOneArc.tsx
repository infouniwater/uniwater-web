import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, EditorialAccent } from '@/components/ui/Typography';

/**
 * Day One vs Eighteen Months vs Ten Years.
 * Per BLUEPRINT §7 and the 2026 Homeowner Catalogue p.2.
 *
 * Redesigned 2026-05-25 — the previous three-column bullet-list layout
 * forced the visitor through ~80 words per card before the punchline
 * (₹50K saved → ₹10–12 L lost) registered. The real argument is the
 * three NUMBERS and how they invert over time, so the numbers are now
 * the visual anchor: big-type cost on top, single descriptor line
 * below, no bullets. Total text per card drops ~70 %.
 */

interface Stage {
  /** Order marker (01 / 02 / 03). */
  marker: string;
  /** Time-horizon label. */
  label: string;
  /** Big-type cost — the visual hook. */
  cost: string;
  /** One-line framing of what that cost represents. */
  costLabel: string;
  /** Single short sentence summarising the stage. No bullets. */
  body: string;
  /** Sign of the cost — controls the colour tone of the big number. */
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
    cost: '₹10–12 LAKH',
    costLabel: 'compounded loss',
    body: 'Appliances replaced. Marble re-polished. Plus what money can’t fix — hair thinning, skin damage, premature ageing.',
    tone: 'lost',
  },
];

// Map the cost's "sign" to colour. Saved stays soft-teal (positive tone);
// spent + lost shift toward warmer / brighter to read as expense.
const TONE_COLOR: Record<Stage['tone'], string> = {
  saved: 'text-soft',
  spent: 'text-offwhite',
  lost:  'text-offwhite',
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
          the visual anchor; everything else supports it. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-offwhite/15 border border-offwhite/15">
        {STAGES.map((stage) => (
          <div key={stage.marker} className="bg-navy p-6 sm:p-8 md:p-10 flex flex-col gap-5 sm:gap-6">
            <div className="flex items-baseline gap-3">
              <span className="text-eyebrow font-medium uppercase text-soft tracking-wide">
                {stage.marker}
              </span>
              <span className="text-eyebrow font-medium uppercase text-soft tracking-wide">
                {stage.label}
              </span>
            </div>

            {/* The number — large, dominant, the actual message. */}
            <div className="flex flex-col gap-1">
              <span className={`text-4xl sm:text-5xl md:text-6xl font-light leading-none ${TONE_COLOR[stage.tone]} [font-feature-settings:'tnum']`}>
                {stage.cost}
              </span>
              <span className="text-caption uppercase tracking-wider text-soft/80 font-medium mt-2">
                {stage.costLabel}
              </span>
            </div>

            <p className="text-offwhite/80 text-body leading-snug [text-wrap:balance]">
              {stage.body}
            </p>
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
