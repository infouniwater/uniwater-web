import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';

/**
 * Home-page featured clients — a curated 8-card grid (2 rows × 4 on
 * desktop/tablet, 4 rows × 2 on mobile), ordered for visual rhythm and
 * brand recognition. Eight is intentional: it tiles cleanly at every
 * breakpoint, which avoids the orphan tile a 7-card grid produces on
 * 2-col mobile and 4-col tablet. NAMED_CLIENTS (the wider list of 14)
 * stays in /content/site.ts and is rendered verbatim on /industrial and
 * elsewhere; this section deliberately shows the strongest eight.
 */
const FEATURED_CLIENTS = [
  'Charnock Hospital',
  'Birat Medical College',
  'IIEST',
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
 * Stat tiles intentionally removed — TrustStripe (immediately below the
 * hero) now carries 200+ homes / 9 cities / 3+ years / surveys this month.
 * This section is the logo wall — visual recognition, not numbers.
 *
 * Drop client logos into /public/clients/<slug>.svg (or .png) and add the
 * path here. When a logo is present, it renders in place of the text tile;
 * otherwise the client name renders as a tasteful text tile. The team can
 * fill this in client-by-client as logos are sourced & permission cleared.
 */

const CLIENT_LOGOS: Record<string, { src: string; alt: string }> = {
  // Wikipedia commons + Google favicon service used as initial sources.
  // Replace any entry with a higher-resolution official mark when the
  // client supplies one (see /public/clients/README if added later).
  'Charnock Hospital':       { src: '/clients/charnock-hospital.png',       alt: 'Charnock Hospital logo' },
  'Birat Medical College':   { src: '/clients/birat-medical-college.png',   alt: 'Birat Medical College logo' },
  'Shyam Steel':             { src: '/clients/shyam-steel.png',             alt: 'Shyam Steel logo' },
  'Saburi Plywood':          { src: '/clients/saburi-plywood.png',          alt: 'Saburi Plywood logo' },
  'Techno India University': { src: '/clients/techno-india-university.png', alt: 'Techno India University logo' },
  'Marudhar Marble':         { src: '/clients/marudhar-marble.png',         alt: 'Marudhar Marble logo' },
  'Movash':                  { src: '/clients/movash.png',                  alt: 'Movash logo' },
  'Premier Wires':           { src: '/clients/premier-wires.png',           alt: 'Premier Wires logo' },
  'Kreamz':                  { src: '/clients/kreamz.png',                  alt: 'Kreamz logo' },
  'IIEST':                   { src: '/clients/iiest.png',                   alt: 'IIEST Shibpur logo' },
  // No clean public logo source for these four — fall through to a tasteful
  // text tile until the client provides their official mark:
  //   'GM Group'              (only had a 32×32 favicon, rendered hazy on upscale)
  //   'Acasa by Malani Group'
  //   'Azurre Surfaces'
  //   'Waterworks'
};

export function ProofSection() {
  return (
    <Section padding="default" tone="plain">
      <div className="mb-8 max-w-3xl">
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
              aria-label={logo ? logo.alt : client}
            >
              {logo ? (
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <Caption className="text-navy font-medium leading-tight text-center">
                  {client}
                </Caption>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
