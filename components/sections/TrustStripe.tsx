import { STATS, SURVEYS_BOOKED_TRAILING_12M } from '@/content/site';
import { Eyebrow } from '@/components/ui/Typography';

/**
 * Narrow editorial trust stripe shown immediately below the hero. The
 * quiet exhale after the hero — same brand register (light Signika
 * numerals, Eyebrow label, mute caveat) but on the offwhite surface so
 * the page breathes.
 *
 * Surfaces the four facts a first-time visitor needs before they trust
 * anything else on the page: scale (homes), reach (cities), method
 * (engineered, not boxed), and demand (this-month survey count).
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
      className="bg-offwhite border-b border-hairline"
    >
      <div className="container-uw py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-10 md:divide-x md:divide-hairline/60">
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              // Mobile 2-col grid: only the SECOND row gets a top divider.
              // Desktop md:pl-10 clears the vertical md:divide-x line.
              className={`flex flex-col gap-2 ${i >= 2 ? 'pt-8 border-t border-hairline/60 md:border-t-0 md:pt-0' : ''} ${i > 0 ? 'md:pl-10' : ''}`}
            >
              {/* Stat values lifted to display scale — Signika light at
                  44 → 56 px, matching the hero's editorial weight. */}
              <div className="text-[44px] md:text-[56px] font-numeric font-light leading-none text-navy tabular-nums">
                {item.value}
              </div>
              <div className="h-px w-10 bg-hairline mt-1" aria-hidden="true" />
              <Eyebrow>{item.label}</Eyebrow>
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
