import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';

/**
 * Homepage city-guides section -- surfaces the city-specific pillar pages
 * (long-form deep dives into the chemistry of a particular city).
 *
 * Data-driven so adding the next pillar (Guwahati iron, Noida hardness,
 * Salt Lake borewell, etc.) is a one-line append to CITY_GUIDES below --
 * no markup change needed.
 *
 * Renders nothing if no pillars exist (defensive). Currently the array
 * carries one entry: Kolkata iron. The leading editorial column carries
 * the "more cities being written" note so a single-card render doesn't
 * read as broken.
 */

interface CityGuide {
  /** City slug (matches /cities/[slug] and the existing CITIES list). */
  citySlug: string;
  /** Display name. */
  cityName: string;
  /** Pillar route -- root-relative, with leading slash. */
  pillarHref: string;
  /** One-word topic the pillar focuses on (e.g. "Iron", "Hardness"). */
  topic: string;
  /** Card title -- the H3 on the card. */
  title: string;
  /** Short pitch under the title (1-2 sentences). */
  description: string;
}

const CITY_GUIDES: CityGuide[] = [
  {
    citySlug: 'kolkata',
    cityName: 'Kolkata',
    pillarHref: '/kolkata-iron-water',
    topic: 'Iron',
    title: 'Iron in Kolkata water — stains, causes, removal.',
    description:
      'Why central KMC localities read low while Salt Lake, New Town, and Rajarhat run high; locality-level water bands; the order treatment has to go in to actually work.',
  },
  // Future pillars:
  // { citySlug: 'guwahati',  cityName: 'Guwahati',  pillarHref: '/guwahati-iron-water', topic: 'Iron',     ... },
  // { citySlug: 'noida',     cityName: 'Noida',     pillarHref: '/noida-hard-water',    topic: 'Hardness', ... },
];

export function CityGuides() {
  if (CITY_GUIDES.length === 0) return null;

  return (
    // Light band -- sits between the dark CitiesSection above and the
    // subtle FinalCTA below. Keeps the homepage cadence readable
    // (D L D L D L) without going dark twice in a row.
    <Section padding="default" tone="subtle" id="city-guides">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left -- editorial framing. */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Eyebrow className="mb-2">City guides</Eyebrow>
          <Heading level={2}>Deep reads, written for one city at a time.</Heading>
          <Body className="text-mute mt-2">
            Water chemistry changes block to block. These guides go deeper
            than a city page: what the supply actually carries, where it
            concentrates by locality, and how to treat it in the right
            order.
          </Body>
          <Caption className="text-mute italic mt-2">
            More city guides being written. Tell us where you live and we&rsquo;ll
            prioritise yours.
          </Caption>
        </div>

        {/* Right -- pillar cards. Grid widens to two cols once a second
            pillar lands; for the single-card state we keep the column
            narrower (max-w) so it doesn't read as a stretched panel. */}
        <div className="lg:col-span-8">
          <div
            className={`grid gap-6 ${
              CITY_GUIDES.length === 1
                ? 'grid-cols-1 max-w-xl'
                : CITY_GUIDES.length === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {CITY_GUIDES.map((guide) => (
              <Link
                key={guide.pillarHref}
                href={guide.pillarHref}
                className="group block border border-hairline bg-offwhite p-6 transition-all duration-200 ease-calm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(5,69,95,0.06)]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Eyebrow className="text-teal">{guide.cityName}</Eyebrow>
                    <span className="text-mute/40">·</span>
                    <Caption className="text-mute uppercase tracking-wide">{guide.topic}</Caption>
                  </div>
                  <Heading level={3}>{guide.title}</Heading>
                  <Body className="text-mute">{guide.description}</Body>
                  <Caption className="text-teal font-medium mt-2">Read the guide →</Caption>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
