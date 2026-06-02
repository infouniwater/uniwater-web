import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading } from '@/components/ui/Typography';

// 2026-05-25 — UI matched to InstallationVersatility: same grid
// (grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6), same
// aspect-[3/4] portrait images, same numbered eyebrow + title +
// caption layout. Cards stay clickable via a Link wrapper. No
// borders, no bordered "card" panels, no Read-more chevron — the
// whole card is the affordance.
// Descriptions written in the same telegraphic register as
// InstallationVersatility — single focus per card, fragments OK,
// roughly 7–12 words. The card is a teaser; the destination page
// carries the full pitch.
const SOLUTIONS = [
  {
    href: '/solutions/bathroom-filter',
    title: 'Bathroom filters',
    description: 'At the bathroom feed. Stops iron staining and hard-water scale.',
    imgSrc: '/images/photography/bathroom-filter-hero.jpg',
    imgAlt: 'BathSoft installed in a marble luxury bathroom with brass freestanding bath, two stainless cylinders recessed behind a glass shower partition',
  },
  {
    href: '/solutions/whole-house-water-filter',
    title: 'Whole-house filtration',
    description: 'At the inlet. Treats the water once for every tap in the house.',
    imgSrc: '/images/photography/whole-house-hero.jpg',
    imgAlt: 'HomeSoft whole-house water filter — two branded Uniwater vessels installed in a finished home corner near windows and plants',
  },
  {
    href: '/solutions/drinking-water-solution',
    title: 'Drinking water systems',
    description: 'At the kitchen tap. RO, UV, or UF — sized to your TDS.',
    imgSrc: '/images/photography/drinking-water-home-2.jpg',
    imgAlt: 'Treated drinking water pouring from a dedicated chrome kitchen tap into a glass, family in soft focus at the dining table behind',
  },
  {
    href: '/industrial',
    title: 'Building & society water plants',
    description: 'For complexes, hotels, hospitals. 8,000 to 30,000 LPH.',
    imgSrc: '/images/photography/wtp-basement.jpg',
    imgAlt: 'Building water-treatment plant — three branded Uniwater vessels in a basement plant room with overhead piping',
  },
  {
    href: '/industrial',
    title: 'Industrial RO and DM plants',
    description: 'For manufacturing, pharma, institutional use. Engineered process water.',
    imgSrc: '/images/photography/commercial-ro-warehouse.jpg',
    imgAlt: 'Branded Uniwater commercial RO plant installed on a factory warehouse floor',
  },
];

export function SolutionsOverview() {
  return (
    // 2026-06-02: promoted to dark for strict D L D L D L homepage
    // alternation. Card photos stay portrait; the navy frame around
    // them gives the catalogue a gallery-wall feel.
    <Section tone="navy" padding="default" id="solutions-overview" image={{ stem: 'plant-room' }}>
      <div className="mb-8 md:mb-14 max-w-3xl flex flex-col gap-4">
        <Eyebrow inverse>Catalogue</Eyebrow>
        <Heading level={2} inverse>
          What we install.
        </Heading>
        <div className="text-[16px] md:text-lede text-offwhite/80 font-light flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline mt-2">
          <span>For your home</span>
          <span aria-hidden="true" className="hidden sm:inline text-offwhite/40 mx-2">&middot;</span>
          <span>For your building</span>
          <span aria-hidden="true" className="hidden sm:inline text-offwhite/40 mx-2">&middot;</span>
          <span>For your factory</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {SOLUTIONS.map((solution, i) => (
          <Link
            key={solution.title}
            href={solution.href}
            className="group flex flex-col gap-3 sm:gap-4"
          >
            <div className="relative w-full overflow-hidden bg-navy/40 aspect-[3/4] sm:aspect-[3/4]">
              <Image
                src={solution.imgSrc}
                alt={solution.imgAlt}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-calm group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Eyebrow inverse>{String(i + 1).padStart(2, '0')}</Eyebrow>
              <h3 className="text-body sm:text-h3 font-normal text-offwhite leading-snug [text-wrap:balance] transition-colors duration-200 ease-calm group-hover:text-soft">
                {solution.title}
              </h3>
              <p className="text-caption text-offwhite/70 leading-snug">{solution.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
