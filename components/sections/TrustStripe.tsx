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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-x-8 divide-y md:divide-y-0 md:divide-x divide-hairline">
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              // pt-6 only applies to the SECOND-row cells on mobile (i>=2 in a
              // 2-col grid). The previous condition (i>0) wrongly pushed the
              // top-right cell ("9") 24px below the top-left cell ("200+"),
              // breaking the baseline alignment within row 1.
              // Desktop md:pl-8 still applies to every non-first cell to clear
              // the vertical divider on the 4-col single-row layout.
              className={`flex flex-col gap-1 ${i >= 2 ? 'pt-6' : ''} ${i > 0 ? 'md:pt-0 md:pl-8' : ''}`}
            >
              <div className="text-[28px] md:text-[32px] font-light leading-none text-navy">
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
