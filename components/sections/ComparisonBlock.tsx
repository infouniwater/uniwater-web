import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';

/**
 * "What most sellers do · What Uniwater does." — a side-by-side that
 * gives a premium buyer the ammunition to defend the spend internally
 * (to their spouse, their architect, their facilities team).
 *
 * Per the §6.2 marketing benchmark (Tier 3.11). Lives between
 * SolutionsOverview and ServiceSection on the home page.
 */

interface Row {
  topic: string;
  market: string;
  uniwater: string;
}

const ROWS: Row[] = [
  {
    topic: 'How they price',
    market:
      'Quote first. Fit the catalogue SKU to the buyer. The water analysis comes after the sale, if at all.',
    uniwater:
      'Survey first. Test the water, map the plumbing, size the household. Then quote — to the specific water, not a generic SKU.',
  },
  {
    topic: 'Who installs',
    market:
      'Local plumbers on commission, swapped each visit. The sales person never sees the install.',
    uniwater:
      'A Uniwater engineer designs the system and the same team installs it. The person who quoted is on site at handover.',
  },
  {
    topic: 'After handover',
    market:
      'AMC at a flat rate. Service when something breaks. The engineer is a stranger to your system.',
    uniwater:
      'Monthly visit, every month, for the life of the contract. The same team owns the system. Service is the system.',
  },
  {
    topic: 'When water chemistry changes',
    market:
      'Resin clogs in year two. Output drops. You assume the unit failed. Buy a new one.',
    uniwater:
      'Monthly report flags the drift. Media swapped, settings adjusted, sequence verified — under the contract, not as an extra.',
  },
];

export function ComparisonBlock() {
  return (
    <Section padding="default" tone="subtle">
      <div className="mb-8 md:mb-12 max-w-3xl">
        <Eyebrow className="mb-4">Why we&rsquo;re different</Eyebrow>
        <Heading level={2}>
          What most water companies do. What we do.
        </Heading>
        <Body className="text-mute mt-4">
          The market sells systems. We sell the four things a system actually needs over its lifetime &mdash; a survey, the right design, an install that fits the house, and a service crew that does not change.
        </Body>
      </div>

      {/* Header row — desktop only */}
      <div className="hidden md:grid grid-cols-12 gap-px bg-hairline border border-hairline">
        <div className="col-span-3 bg-offwhite p-5">
          <Caption className="text-mute uppercase tracking-wide text-eyebrow font-medium">
            Topic
          </Caption>
        </div>
        <div className="col-span-4 bg-offwhite p-5">
          <Caption className="text-mute uppercase tracking-wide text-eyebrow font-medium">
            What most sellers do
          </Caption>
        </div>
        <div className="col-span-5 bg-tint/40 p-5">
          <Caption className="text-navy uppercase tracking-wide text-eyebrow font-medium">
            What Uniwater does
          </Caption>
        </div>
      </div>

      {/* Rows */}
      <div className="md:border-l md:border-r md:border-b md:border-hairline">
        {ROWS.map((row, i) => (
          <div
            key={row.topic}
            className={`grid grid-cols-1 md:grid-cols-12 gap-px bg-hairline ${i < ROWS.length - 1 ? 'border-b md:border-b-0' : ''} mb-px md:mb-0`}
          >
            <div className="col-span-3 bg-offwhite p-6 md:p-8 flex md:items-center">
              <h3 className="text-h3 font-normal text-navy leading-snug">
                {row.topic}
              </h3>
            </div>
            <div className="col-span-4 bg-offwhite p-6 md:p-8">
              <Caption className="text-mute uppercase tracking-wide text-eyebrow font-medium mb-2 md:hidden">
                What most sellers do
              </Caption>
              <Body className="text-mute leading-relaxed">{row.market}</Body>
            </div>
            <div className="col-span-5 bg-tint/40 p-6 md:p-8">
              <Caption className="text-navy uppercase tracking-wide text-eyebrow font-medium mb-2 md:hidden">
                What Uniwater does
              </Caption>
              <Body className="text-ink leading-relaxed">{row.uniwater}</Body>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
