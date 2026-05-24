import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { SolutionCard } from '@/components/ui/Card';

// 2026-05-25 — all five products in one inline row at lg+. Residential
// and commercial sit in the same grid at equal width; the card title
// and photo carry the audience signal. Below lg the grid collapses
// (sm: 2-per-row, mobile: stack).
const SOLUTIONS = [
  {
    href: '/solutions/bathroom-filter',
    title: 'Bathroom filters',
    description:
      'Stop iron staining and hard-water scale at the bathroom feed, in spaces you’d never expect to fit equipment.',
    photoDescription: 'BathSoft Trio installed in a plumbing shaft of a finished bathroom',
    photoRef: 'solution-bathroom',
    imgSrc: '/images/photography/bathroom-filter-hero.jpg',
    imgAlt: 'BathSoft installed in a marble luxury bathroom with brass freestanding bath, two stainless cylinders recessed behind a glass shower partition',
  },
  {
    href: '/solutions/whole-house-water-filter',
    title: 'Whole-house filtration',
    description:
      'Treat the water once, at the inlet — every tap, every shower, every appliance protected.',
    photoDescription: 'HomeSoft two-vessel install in a residential utility room',
    photoRef: 'solution-wholehouse',
    imgSrc: '/images/photography/whole-house-hero.jpg',
    imgAlt: 'HomeSoft whole-house water filter — two branded Uniwater vessels installed in a finished home corner near windows and plants',
  },
  {
    href: '/solutions/drinking-water-solution',
    title: 'Drinking water systems',
    description: 'RO, UV, or UF — sized to your actual TDS. Wall-mounted, under-sink, or centralised.',
    photoDescription: 'Premium chrome kitchen tap with filtered water flowing into glass',
    photoRef: 'solution-drinking',
    imgSrc: '/images/photography/drinking-water-home.jpg',
    imgAlt: 'Glass of Uniwater drinking water on a marble kitchen counter, family in soft focus in the background',
  },
  {
    href: '/industrial',
    title: 'Building & society water plants',
    description: '8,000 to 30,000 LPH, for apartment complexes, hotels, hospitals, schools.',
    photoDescription: 'WTP install in a gated complex plant room',
    photoRef: 'solution-wtp',
    imgSrc: '/images/photography/wtp-basement.jpg',
    imgAlt: 'Building water-treatment plant — three branded Uniwater vessels in a basement plant room with overhead piping',
  },
  {
    href: '/industrial',
    title: 'Industrial RO and DM plants',
    description: 'Engineered process water for manufacturing, pharmaceutical, institutional use.',
    photoDescription: 'Industrial RO/DM plant with SS vessels and instrumentation',
    photoRef: 'solution-industrial',
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

      {/* All five solutions in one row at lg+. Mobile stacks; tablet
          (sm/md) goes 2-per-row, which lands 5 cards as 2+2+1 — the
          5th card sits alone on its row, full grid-cell width. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 items-stretch">
        {SOLUTIONS.map((solution) => (
          <SolutionCard key={solution.title} {...solution} />
        ))}
      </div>
    </Section>
  );
}
