import { STATS, SURVEYS_BOOKED_TRAILING_12M } from '@/content/site';

/**
 * Narrow horizontal trust stripe shown immediately below the hero.
 *
 * Surfaces the four facts a first-time visitor needs before they trust
 * anything else on the page: scale (homes), reach (cities), method
 * (engineered, not boxed), and demand (this-month survey count).
 *
 * Per the §6.2 marketing benchmark vs Zero B — they anchor "350,000+ happy
 * customers" above the fold; we surface premium-scale equivalents without
 * the mass-market tone.
 */

interface TrustItem {
  value: string;
  label: string;
  /** Optional caveat in micro-copy below the label. */
  caveat?: string;
}

const ITEMS: TrustItem[] = [
  {
    value: STATS.homesServiced,
    label: 'Homes serviced',
    caveat: 'Across 9 cities in India & Nepal',
  },
  {
    value: String(STATS.citiesTotal),
    label: 'Cities, own teams',
    caveat: 'Not subcontracted',
  },
  {
    value: `${STATS.yearsOperating} years`,
    label: 'Engineering water',
    caveat: 'Surveyed before quoted',
  },
  {
    value: `${SURVEYS_BOOKED_TRAILING_12M.toLocaleString('en-IN')}+`,
    label: 'Surveys, last 12 months',
    caveat: 'Free of cost',
  },
];

export function TrustStripe() {
  return (
    <section
      aria-label="Operating proof — homes, cities, years, demand"
      className="bg-subtle border-b border-hairline"
    >
      <div className="container-uw py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-x-8 md:divide-x md:divide-hairline">
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              // Mobile 2-col grid: only the SECOND row gets a top divider —
              // applied as border-t on cells i=2 and i=3. The old `divide-y`
              // on the grid wrapped every non-first cell, which wrongly drew
              // a line above the top-right cell ("9") and shifted it 1px down
              // off the row-1 baseline.
              // Desktop md:pl-8 clears the vertical md:divide-x line.
              className={`flex flex-col gap-1 ${i >= 2 ? 'pt-6 border-t border-hairline md:border-t-0 md:pt-0' : ''} ${i > 0 ? 'md:pl-8' : ''}`}
            >
              {/* Stat values on the brand h2 scale (26 → 32px) instead of
                  the previous raw 28 → 32px arbitrary tokens. Same visual
                  weight, now governed by the design system. */}
              <div className="text-h2-m md:text-h2 font-numeric font-light leading-none text-navy">
                {item.value}
              </div>
              <div className="text-eyebrow font-medium uppercase tracking-wide text-teal">
                {item.label}
              </div>
              {item.caveat && (
                <div className="text-caption text-mute leading-snug">{item.caveat}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
