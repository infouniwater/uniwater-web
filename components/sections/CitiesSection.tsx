import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { NineCityMap } from '@/components/ui/NineCityMap';
import { CITIES } from '@/content/site';

/**
 * Where we work — the 9-city operating footprint, visibly.
 * Per Blueprint §6.9 and Critique §3.8.4 (operational sophistication legible).
 */
export function CitiesSection() {
  const india = CITIES.filter((c) => c.country === 'India');
  const nepal = CITIES.filter((c) => c.country === 'Nepal');

  return (
    <Section tone="navy" padding="default">
      {/* Asymmetric grid — text gets 2/5, map gets 3/5 so the
          NineCityMap reads larger on lg+. Below lg the grid stacks
          (text → map) and the map fills the container width. */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-2">
          <Eyebrow className="text-soft mb-5">Where we work</Eyebrow>
          <Heading level={2} inverse className="mb-6">
            Nine cities. Own teams. Not subcontracted.
          </Heading>
          <Body inverse className="mb-8">
            Every Uniwater survey, install, and monthly service visit is delivered by our own engineers. We don&rsquo;t hand off to local contractors after the sale.
          </Body>

          <div className="mb-8">
            <div className="text-eyebrow font-medium uppercase text-soft mb-4">India</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {india.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="text-body text-offwhite hover:text-soft transition-colors duration-200 ease-calm"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-eyebrow font-medium uppercase text-soft mb-4">Nepal</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {nepal.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="text-body text-offwhite hover:text-soft transition-colors duration-200 ease-calm"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <NineCityMap />
        </div>
      </div>
    </Section>
  );
}
