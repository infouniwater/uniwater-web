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
    alt: 'Two stainless cylinders recessed in a wall niche behind a marble shower glass, built into the bathroom wall',
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
  // Kept LIGHT because this component is used on both the homepage
  // (after the SolutionsOverview dark band) and /residential. Flipping
  // it dark would break the homepage's D L D L D L D L D L cadence.
  return (
    <Section padding="default">
      <div className="mb-8 md:mb-14 max-w-3xl flex flex-col gap-4">
        <Eyebrow>Hidden installs</Eyebrow>
        <Heading level={2}>
          Where the system goes in your house.
        </Heading>
        <Body className="text-mute text-lede font-light mt-2">
          We decide where the vessels go at the survey: false ceiling, plumbing shaft, wall niche, under the counter or the plant room. Planned early, nobody sees them and our engineer can still reach them for service.
        </Body>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {FIVE_PLACES.map((place, i) => {
          const photo = INSTALL_PHOTOS[i];
          return (
            <div key={place.location} className="group flex flex-col gap-3 sm:gap-4">
              <div className="relative w-full overflow-hidden bg-subtle aspect-[3/4] sm:aspect-[3/4]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-calm group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Eyebrow>{String(i + 1).padStart(2, '0')}</Eyebrow>
                <h3 className="font-sans text-body sm:text-h3 font-normal text-navy leading-snug [text-wrap:balance]">{place.location}</h3>
                <p className="text-caption text-mute leading-snug">{place.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <EditorialAccent className="mt-14 md:mt-20 text-xl md:text-2xl">
        The engineers who plan the install are the ones who do it.
      </EditorialAccent>
    </Section>
  );
}
