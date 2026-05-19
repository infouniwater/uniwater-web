import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading, Body } from '@/components/ui/Typography';

interface Problem {
  imgSrc: string;
  imgAlt: string;
  title: string;
  body: string;
}

const PROBLEMS: Problem[] = [
  {
    imgSrc: '/images/photography/hairfall.jpg',
    imgAlt: 'A woman in the shower with her hands running through wet hair — the daily moment hard water shows up',
    title: 'Hair, skin, and the morning shower.',
    body:
      'Hard water and dissolved iron leave residue you can’t see. Scale in the geyser turns a 50°C shower into 35°C.',
  },
  {
    imgSrc: '/images/photography/scaling-on-taps.jpg',
    imgAlt: 'Close-up of a chrome bathroom tap with heavy scale and rust corrosion on the spout — what untreated water does to premium fittings',
    title: 'The fittings you spent money on.',
    body:
      'Imported chrome, marble, stone — they tarnish, stain, pit. Their spec assumes feed water that, in most Indian cities, doesn’t actually arrive.',
  },
  {
    imgSrc: '/images/photography/scaling-inside-geyser.jpg',
    imgAlt: 'Close-up of a geyser heating element completely coated in thick white calcium scale after years on untreated hard water',
    title: 'The appliances behind the wall.',
    body:
      'Geysers, washing machines, dishwashers degrade faster on hard or iron-bearing water. The brand brochures don’t say so.',
  },
  {
    imgSrc: '/images/photography/jars-stacked.jpg',
    imgAlt: 'Stacks of blue 20-litre water jars in the utility area beside the washing machine — the ongoing cost of bottled drinking water',
    title: 'The drinking water you already pay for.',
    body:
      'Bottled-jar deliveries cost ₹12,000–18,000 a year. A properly designed home system pays for itself in eighteen months.',
  },
];

export function ProblemGrid() {
  return (
    <Section padding="default">
      <div className="mb-8 md:mb-12 max-w-3xl">
        <Heading level={2}>
          The water in most Indian homes isn&rsquo;t doing what you think it&rsquo;s doing.
        </Heading>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-6">
        {PROBLEMS.map((problem) => (
          <div key={problem.title} className="flex flex-col gap-3 sm:gap-5">
            <div className="relative w-full overflow-hidden border border-hairline" style={{ aspectRatio: '1 / 1' }}>
              <Image
                src={problem.imgSrc}
                alt={problem.imgAlt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <Heading level={3} className="text-body sm:text-h3 leading-snug">{problem.title}</Heading>
            <Body className="text-caption sm:text-body text-mute leading-snug sm:leading-normal">{problem.body}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}
