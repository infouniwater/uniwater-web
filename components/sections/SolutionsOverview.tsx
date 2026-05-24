import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';

// 2026-05-25 — UI matched to InstallationVersatility: same grid
// (grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6), same
// aspect-[3/4] portrait images, same numbered eyebrow + title +
// caption layout. Cards stay clickable via a Link wrapper. No
// borders, no bordered "card" panels, no Read-more chevron — the
// whole card is the affordance.
const SOLUTIONS = [
  {
    href: '/solutions/bathroom-filter',
    title: 'Bathroom filters',
    description:
      'Stop iron staining and hard-water scale at the bathroom feed, in spaces you’d never expect to fit equipment.',
    imgSrc: '/images/photography/bathroom-filter-hero.jpg',
    imgAlt: 'BathSoft installed in a marble luxury bathroom with brass freestanding bath, two stainless cylinders recessed behind a glass shower partition',
  },
  {
    href: '/solutions/whole-house-water-filter',
    title: 'Whole-house filtration',
    description:
      'Treat the water once, at the inlet — every tap, every shower, every appliance protected.',
    imgSrc: '/images/photography/whole-house-hero.jpg',
    imgAlt: 'HomeSoft whole-house water filter — two branded Uniwater vessels installed in a finished home corner near windows and plants',
  },
  {
    href: '/solutions/drinking-water-solution',
    title: 'Drinking water systems',
    description: 'RO, UV, or UF — sized to your actual TDS. Wall-mounted, under-sink, or centralised.',
    imgSrc: '/images/photography/drinking-water-home.jpg',
    imgAlt: 'Glass of Uniwater drinking water on a marble kitchen counter, family in soft focus in the background',
  },
  {
    href: '/industrial',
    title: 'Building & society water plants',
    description: '8,000 to 30,000 LPH, for apartment complexes, hotels, hospitals, schools.',
    imgSrc: '/images/photography/wtp-basement.jpg',
    imgAlt: 'Building water-treatment plant — three branded Uniwater vessels in a basement plant room with overhead piping',
  },
  {
    href: '/industrial',
    title: 'Industrial RO and DM plants',
    description: 'Engineered process water for manufacturing, pharmaceutical, institutional use.',
    imgSrc: '/images/photography/wtp-terrace.jpg',
    imgAlt: 'Industrial water treatment plant on a terrace with stainless vessels and SCADA-ready instrumentation',
  },
];

export function SolutionsOverview() {
  return (
    <Section padding="default" id="solutions-overview">
      <div className="mb-8 md:mb-12 max-w-3xl">
        <Eyebrow className="mb-4">Catalogue</Eyebrow>
        <Heading level={2} className="mb-4">
          What we install.
        </Heading>
        <Body className="text-mute text-lede font-light">
          For your home. For your building. For your factory.
        </Body>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
        {SOLUTIONS.map((solution, i) => (
          <Link
            key={solution.title}
            href={solution.href}
            className="group flex flex-col gap-3 sm:gap-4 transition-opacity duration-200 ease-calm hover:opacity-90"
          >
            <div className="relative w-full overflow-hidden bg-subtle aspect-[3/4]">
              <Image
                src={solution.imgSrc}
                alt={solution.imgAlt}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 ease-calm group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <div className="text-eyebrow font-medium uppercase text-teal mb-1">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-body sm:text-h3 font-semibold text-navy mb-1 sm:mb-2 leading-snug">
                {solution.title}
              </h3>
              <p className="text-caption text-mute leading-snug">{solution.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
