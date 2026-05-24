import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { SolutionCard } from '@/components/ui/Card';

// All five products in one inline grid (2026-05-25). Residential
// cards span 2 of 6 columns each (3 per row); commercial cards span
// 3 of 6 columns each (2 per row, wider, matches the bigger-scope
// audience). The category chip on each card carries the residential
// vs commercial distinction so the visitor sees both signals at once:
// the chip on the photo + the natural cell width.
type Solution = {
  href: string;
  title: string;
  description: string;
  photoDescription: string;
  photoRef: string;
  imgSrc: string;
  imgAlt: string;
  category: 'Residential' | 'Commercial';
};

const SOLUTIONS: Solution[] = [
  {
    href: '/solutions/bathroom-filter',
    title: 'Bathroom filters',
    description:
      'Stop iron staining and hard-water scale at the bathroom feed, in spaces you’d never expect to fit equipment.',
    photoDescription: 'BathSoft Trio installed in a plumbing shaft of a finished bathroom',
    photoRef: 'solution-bathroom',
    imgSrc: '/images/photography/bathroom-filter-hero.jpg',
    imgAlt: 'BathSoft installed in a marble luxury bathroom with brass freestanding bath, two stainless cylinders recessed behind a glass shower partition',
    category: 'Residential',
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
    category: 'Residential',
  },
  {
    href: '/solutions/drinking-water-solution',
    title: 'Drinking water systems',
    description: 'RO, UV, or UF — sized to your actual TDS. Wall-mounted, under-sink, or centralised.',
    photoDescription: 'Premium chrome kitchen tap with filtered water flowing into glass',
    photoRef: 'solution-drinking',
    imgSrc: '/images/photography/drinking-water-home.jpg',
    imgAlt: 'Glass of Uniwater drinking water on a marble kitchen counter, family in soft focus in the background',
    category: 'Residential',
  },
  {
    href: '/industrial',
    title: 'Building & society water plants',
    description: '8,000 to 30,000 litres per hour, for apartment complexes, hotels, hospitals, schools.',
    photoDescription: 'WTP install in a gated complex plant room',
    photoRef: 'solution-wtp',
    imgSrc: '/images/photography/wtp-basement.jpg',
    imgAlt: 'Building water-treatment plant — three branded Uniwater vessels in a basement plant room with overhead piping',
    category: 'Commercial',
  },
  {
    href: '/industrial',
    title: 'Industrial RO and DM plants',
    description: 'Engineered process water for manufacturing, pharmaceutical, institutional applications.',
    photoDescription: 'Industrial RO/DM plant with SS vessels and instrumentation',
    photoRef: 'solution-industrial',
    imgSrc: '/images/photography/wtp-terrace.jpg',
    imgAlt: 'Industrial water treatment plant on a terrace with stainless vessels and SCADA-ready instrumentation',
    category: 'Commercial',
  },
];

// Tailwind needs the col-span class names to be statically detectable,
// so map per-category col-span strings here rather than building them
// inline from category names. md+ uses a 6-col grid so the row maths
// works out clean: 3 × Residential (span 2) on row 1, 2 × Commercial
// (span 3) on row 2. Below md the grid collapses to single column.
const COL_SPAN: Record<Solution['category'], string> = {
  Residential: 'md:col-span-2',
  Commercial:  'md:col-span-3',
};

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

      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-6">
        {SOLUTIONS.map((solution) => (
          <div key={solution.title} className={COL_SPAN[solution.category]}>
            <SolutionCard {...solution} />
          </div>
        ))}
      </div>
    </Section>
  );
}
