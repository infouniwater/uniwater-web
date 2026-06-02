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
      <div className="container-uw py-8 md:py-14">
        {/* Mobile: single column stack with horizontal hairlines between
            stats so each number gets full width and the labels never
            wrap to two lines. md+: four columns with vertical dividers
            (the original editorial row). */}
        <div className="flex flex-col divide-y divide-hairline/60 md:divide-y-0 md:grid md:grid-cols-4 md:gap-x-10 md:divide-x md:divide-hairline/60">
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col gap-2 py-6 first:pt-0 last:pb-0 md:py-0 ${i > 0 ? 'md:pl-10' : ''}`}
            >
              <div className="text-[40px] md:text-[56px] font-numeric font-light leading-none text-navy tabular-nums">
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
