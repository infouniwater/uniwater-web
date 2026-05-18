import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, EditorialAccent } from '@/components/ui/Typography';

/**
 * Day One vs Eighteen Months vs Ten Years.
 * Per BLUEPRINT §7 and the 2026 Homeowner Catalogue p.2.
 *
 * The catalogue's most powerful argument: cost-of-doing-nothing arc.
 * Rendered as three explicit columns so the message lands without the
 * SVG having to do all the work — the typography carries the timeline.
 */

interface Stage {
  marker: string;
  label: string;
  headline: string;
  bullets: string[];
  /** Indicative cost band — keeps the arc grounded in numbers, not adjectives. */
  cost: string;
}

const STAGES: Stage[] = [
  {
    marker: '01',
    label: 'Day one',
    headline: 'Decided on price.',
    bullets: [
      'Five minutes with the plumber.',
      'A generic softener off the catalogue.',
      'You save ₹50,000 today.',
    ],
    cost: 'You save ₹50,000',
  },
  {
    marker: '02',
    label: 'Eighteen months',
    headline: 'The house starts ageing.',
    bullets: [
      'Geyser scaling. Element starts to fail.',
      'CP fittings dulling, won’t come clean.',
      'Marble grout has an orange line.',
      'Hair feels different in the shower.',
      'Dishwasher on its second service call.',
    ],
    cost: 'First ₹40,000 in service & replacements',
  },
  {
    marker: '03',
    label: 'Ten years',
    headline: 'Lakhs in cumulative cost.',
    bullets: [
      'Appliances replaced — geyser, washing machine, dishwasher.',
      'Marble re-polished.',
      'Fittings dulled or swapped.',
      'Bottled-jar habit baked in.',
    ],
    cost: '₹3–6 lakh of compounded damage',
  },
];

export function DayOneArc() {
  return (
    <Section tone="navy" padding="default">
      <div className="flex flex-col gap-4 mb-12 max-w-3xl">
        <Eyebrow className="!text-soft">The decision</Eyebrow>
        <Heading level={2} inverse>
          Day one. Eighteen months. Ten years.
        </Heading>
        <Body inverse className="text-offwhite/80 text-lede font-light mt-2">
          The five-minute decision with the plumber on day one is the most expensive decision in the house. Not because of the system you skipped — because of everything downstream of it.
        </Body>
      </div>

      {/* Three-stage timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-offwhite/15 border border-offwhite/15">
        {STAGES.map((stage) => (
          <div key={stage.marker} className="bg-navy p-8 md:p-10 flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="text-eyebrow font-medium uppercase text-soft tracking-wide">
                {stage.marker}
              </span>
              <span className="text-eyebrow font-medium uppercase text-soft tracking-wide">
                {stage.label}
              </span>
            </div>

            <h3 className="text-h2-m font-light text-offwhite leading-snug [text-wrap:balance]">
              {stage.headline}
            </h3>

            <ul className="flex flex-col gap-3 mt-2">
              {stage.bullets.map((b) => (
                <li key={b} className="text-offwhite/85 text-body leading-snug flex gap-3">
                  <span className="text-soft flex-shrink-0">&mdash;</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6 border-t border-offwhite/15">
              <p className="text-caption uppercase tracking-wide text-soft font-medium">
                {stage.cost}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-reading">
        <EditorialAccent className="!text-soft">
          Water treatment is the choice that runs underneath everything else. Done properly, it protects the fittings, the appliances, the family&rsquo;s skin and hair, and your way of life &mdash; for decades. Done poorly, the house ages faster than it should.
        </EditorialAccent>
      </div>
    </Section>
  );
}
