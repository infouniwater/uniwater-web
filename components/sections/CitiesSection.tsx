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
    // 2026-06-02 rhythm fix: was tone="navy". Reverted to light so the
    // section preceding the navy FinalCTA isn't also dark.
    <Section padding="default">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Eyebrow>Where we work</Eyebrow>
          <Heading level={2}>
            Nine cities. Own teams. Not subcontracted.
          </Heading>
          <Body className="text-mute mt-2">
            Every Uniwater survey, install, and monthly service visit is delivered by our own engineers. We don&rsquo;t hand off to local contractors after the sale.
          </Body>

          <div className="mt-6 flex flex-col gap-3">
            <Eyebrow>India</Eyebrow>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {india.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="text-body text-navy hover:text-teal transition-colors duration-200 ease-calm"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-3">
            <Eyebrow>Nepal</Eyebrow>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {nepal.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="text-body text-navy hover:text-teal transition-colors duration-200 ease-calm"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {/* Map wrapped in a navy panel — the NineCityMap is designed
              against a navy canvas (offwhite labels, soft connector
              lines); putting it on the light section bg would hide
              everything. The panel becomes the section's only dark
              moment, so it reads as a curated artifact rather than a
              competing background. */}
          <div className="bg-navy p-6 md:p-8 border border-hairline">
            <NineCityMap />
          </div>
        </div>
      </div>
    </Section>
  );
}
