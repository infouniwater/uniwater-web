import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { CLIENT_LOGOS } from '@/content/site';

/**
 * Home-page featured clients — a curated 8-card grid (2 rows × 4 on
 * desktop/tablet, 4 rows × 2 on mobile). Eight is intentional: it tiles
 * cleanly at every breakpoint, which avoids the orphan tile a 7-card grid
 * produces on 2-col mobile and 4-col tablet. The wider list (NAMED_CLIENTS
 * in /content/site.ts) is rendered on /industrial and /about; this section
 * deliberately surfaces the strongest eight.
 */
const FEATURED_CLIENTS = [
  'Charnock Hospital',
  'Birat Medical College',
  'Path Bhavan',
  'Techno India University',
  'Shyam Steel',
  'Saburi Plywood',
  'GM Group',
  'Premier Wires',
] as const;

/**
 * Proof — the silent question, "Is this brand real?"
 * Per Blueprint §6.9 and one of the five operational truths
 * ("We have done this for real, at scale").
 *
 * Per Strategy/Critique: client names appear verbatim, never paraphrased.
 *
 * Logo lookup lives in /content/site.ts so /industrial and /about render
 * the same files. Every name in FEATURED_CLIENTS must have an entry there.
 */

export function ProofSection() {
  return (
    <Section padding="default" tone="plain">
      <div className="mb-8 md:mb-12 max-w-3xl">
        <Eyebrow className="mb-4">Selected clients</Eyebrow>
        <Heading level={2} className="mb-4">
          Hospitals. Hotels. Universities. Premium homes.
        </Heading>
        <Body className="text-mute max-w-3xl">
          We work with hospitals, hotels, factories, schools, universities, and premium residential developments across India and Nepal. A partial list of named clients:
        </Body>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        {FEATURED_CLIENTS.map((client) => {
          const logo = CLIENT_LOGOS[client];
          return (
            <div
              key={client}
              className="aspect-[3/2] border border-hairline flex items-center justify-center p-4 bg-offwhite"
              aria-label={logo.alt}
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
