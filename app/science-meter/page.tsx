import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { VerdictGrid } from '@/components/science-meter/VerdictGrid';
import { TECHNOLOGIES } from '@/content/science-meter';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/science-meter',
  title: 'Science Meter — which water technologies actually work',
  description:
    'Uniwater rates the water technologies people ask about — RO, softening, iron removal, magnetic descalers, alkaline and structured water — by what the evidence supports. Honest, engineering-led verdicts.',
  image: '/og/og-home.png',
});

// ItemList JSON-LD from the dataset (name + verdict only). No study counts.
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Uniwater Science Meter — water technology verdicts',
  itemListElement: TECHNOLOGIES.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    description: t.verdict,
  })),
};

const LENSES = [
  {
    title: 'Validated research',
    body: 'Does independent, peer-reviewed work support the claim — or only a brochure?',
  },
  {
    title: 'Real-world benefit',
    body: 'Does it solve a problem your supply actually has — hardness, iron, microbes — not a hypothetical one?',
  },
  {
    title: 'Measurable and testable',
    body: 'Can the effect be measured at the tap? If it cannot be tested, it cannot be trusted.',
  },
  {
    title: 'Safe for daily use',
    body: 'Is it safe to live with every day, for years, at the doses involved?',
  },
];

export default function ScienceMeterPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />

      {/* Hero */}
      <Section tone="navy" padding="default">
        <div className="max-w-3xl flex flex-col gap-5">
          <Eyebrow inverse>Evidence, not marketing</Eyebrow>
          <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[20ch] [text-wrap:balance]">
            The Science Meter
          </h1>
          <Lede inverse className="text-offwhite/80">
            Uniwater rates the water technologies people ask us about — what the evidence supports,
            what is conditional, and what is marketing. We will tell you when something is not worth
            your money, including things we could sell you.
          </Lede>
        </div>
      </Section>

      {/* Methodology */}
      <Section padding="default">
        <div className="mb-10 md:mb-12 max-w-3xl flex flex-col gap-4">
          <Eyebrow>How we judge it</Eyebrow>
          <Heading level={2}>Four lenses, every technology.</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline">
          {LENSES.map((lens, i) => (
            <div key={lens.title} className="bg-offwhite p-6 md:p-8 flex flex-col gap-3">
              <div className="text-eyebrow font-medium uppercase text-teal">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-h3 font-medium text-navy">{lens.title}</h3>
              <Caption className="text-mute">{lens.body}</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* Verdict grid — DARK band (alternation: hero D → methodology L →
          grid D → tie-in L). Light cards sit on navy like a gallery. */}
      <Section padding="default" tone="navy">
        <div className="mb-10 max-w-3xl flex flex-col gap-4">
          <Eyebrow inverse>The verdicts</Eyebrow>
          <Heading level={2} inverse>What the evidence says, technology by technology.</Heading>
        </div>
        <VerdictGrid />
        <Caption className="text-offwhite/60 mt-8 block">
          Study volumes shown on each card are indicative and reviewed periodically — a sense of how
          settled the evidence is, not an exact citation.
        </Caption>
      </Section>

      {/* Tie-in — LIGHT band to close the alternation. */}
      <Section tone="subtle" padding="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <Eyebrow>From verdict to system</Eyebrow>
            <Heading level={2}>
              For every technology we endorse, we engineer it into a real system.
            </Heading>
            <Body className="text-mute">
              Surveyed first, sized to your water. The verdict above is the easy part — building it to
              last is the work.
            </Body>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
            <Button href="/book-survey">Book a free survey</Button>
            <Button href="/water-problem-checker" variant="secondary">
              Take the 60-second water check
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
