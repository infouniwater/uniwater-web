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
    // 2026-06-02: dark per strict D L D L D L homepage alternation.
    // NineCityMap is designed for a navy canvas, so it sits flush.
    <Section tone="navy" padding="default">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Eyebrow inverse>Where we work</Eyebrow>
          <Heading level={2} inverse>
            Nine cities. Own teams. Not subcontracted.
          </Heading>
          <Body inverse className="text-offwhite/80 mt-2">
            Every Uniwater survey, install, and monthly service visit is delivered by our own engineers. We don&rsquo;t hand off to local contractors after the sale.
          </Body>

          <div className="mt-6 flex flex-col gap-3">
            <Eyebrow inverse>India</Eyebrow>
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

          <div className="mt-2 flex flex-col gap-3">
            <Eyebrow inverse>Nepal</Eyebrow>
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
