import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';

/**
 * Sensory beat — the felt layer, placed high on the homepage before the
 * engineering argument. Leads with what soft, iron-free water feels like so
 * the page earns "Wellness starts with clean water" viscerally, in the
 * restrained brand voice (no cutesy phrasing, no exclamation).
 *
 * Dark band so the homepage keeps its dark/light alternation:
 * Hero(D) → TrustStripe(L) → SensoryBeat(D) → SymptomStrip(L) → AudienceRouter(D).
 * Image is an existing repo photograph; no new imagery generated.
 */
const LINES = [
  'Soft, iron-free water rinses clean. Soap lathers properly and then washes off. Skin stops feeling tight and hair stops feeling coated.',
  'The marble keeps its colour. The geyser stops furring up. Laundry comes out soft instead of stiff.',
];

export function SensoryBeat() {
  return (
    <Section padding="default" tone="navy">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="relative w-full overflow-hidden border border-offwhite/15 aspect-[16/10] sm:aspect-[3/2] lg:aspect-[4/5]">
            <Image
              src="/images/photography/bathroom-filter-floor-mounted.jpg"
              alt="A floor-mounted Uniwater bathroom filter in a finished bathroom, where soft, iron-free water keeps the stone and fittings clean"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-5">
          <Eyebrow inverse>After the install</Eyebrow>
          <Heading level={2} inverse>What changes once the water is treated.</Heading>
          <div className="flex flex-col gap-4 max-w-reading">
            {LINES.map((line, i) => (
              <Body key={i} inverse className="text-offwhite/80">{line}</Body>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
