import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, EditorialAccent } from '@/components/ui/Typography';
import { FIVE_PLACES } from '@/content/education';

// Order matches FIVE_PLACES from @/content/education.
const INSTALL_PHOTOS: Array<{ src: string; alt: string }> = [
  {
    src: '/images/photography/bathroom-filter-ceiling-installation.jpg',
    alt: 'Stainless cylinder mounted in the suspended-ceiling void of a finished bathroom, accessed via a removable panel',
  },
  {
    src: '/images/photography/bathroom-filter-hero.jpg',
    alt: 'Two stainless cylinders recessed in a wall niche behind a marble shower glass — part of the bathroom architecture, not bolted onto it',
  },
  {
    src: '/images/photography/bathroom-filter-wall-cabinet.jpg',
    alt: 'Stainless vessel housed inside a wall cabinet behind a finish door, flush with the bathroom wall',
  },
  {
    src: '/images/photography/bathroom-filter-under-basin.jpg',
    alt: 'Compact vessels installed under the vanity counter beside the trap, hidden behind the cabinet door',
  },
  {
    src: '/images/photography/whole-house-utility-area.jpg',
    alt: 'Two branded Uniwater vessels floor-mounted in the home utility area beside the washing machine',
  },
];

/**
 * Installation versatility — the single most defensible visual claim.
 * Per Blueprint §6.6. Promoted on the home page to scroll position 4 so
 * the brand's strongest USP — "the system disappears into your home" —
 * lands before the editorial bridge.
 */
export function InstallationVersatility() {
  return (
    <Section padding="default">
      <div className="mb-6 md:mb-12 max-w-3xl">
        <Eyebrow className="mb-4">What makes us different</Eyebrow>
        <Heading level={2} className="mb-5">
          Five places we&rsquo;ve put a water system &mdash; engineered into the architecture, not bolted to it.
        </Heading>
        <Body className="text-mute text-lede font-light">
          Most water companies bolt a vessel to a wall and call it done. Uniwater engineers the install into the building &mdash; false ceilings, shafts, niches, under-counter cavities, plant rooms. The system fits the house, not the other way around.
        </Body>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
        {FIVE_PLACES.map((place, i) => {
          const photo = INSTALL_PHOTOS[i];
          return (
            <div key={place.location} className="flex flex-col gap-3 sm:gap-4">
              {/* aspect: landscape on mobile (shorter card, section fits
                  closer to a single mobile frame), portrait sm+ where
                  there's vertical room. */}
              <div className="relative w-full overflow-hidden bg-subtle aspect-[4/3] sm:aspect-[3/4]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-eyebrow font-medium uppercase text-teal mb-1">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-body sm:text-h3 font-semibold text-navy mb-1 sm:mb-2 leading-snug">{place.location}</h3>
                <p className="text-caption text-mute leading-snug">{place.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-caption text-mute italic max-w-reading">
        Decided at site survey. Specified before tile. Installed by the engineers who designed it.
      </p>
    </Section>
  );
}
