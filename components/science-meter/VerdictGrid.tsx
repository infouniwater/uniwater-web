'use client';

import { useState } from 'react';
import { TECHNOLOGIES, TIER_META, TIER_ORDER } from '@/content/science-meter';
import type { Tier } from '@/content/science-meter';
import { VerdictCard } from './VerdictCard';

type Filter = 'all' | Tier;

const CHIPS: Array<{ key: Filter; label: string }> = [
  { key: 'all', label: 'All' },
  ...TIER_ORDER.map((t) => ({ key: t as Filter, label: TIER_META[t].label })),
];

/** Order: when filtered to a tier, by relevanceRank; when "All", grouped by
 *  tier (Endorsed → Worth watching → Avoid), each group by relevanceRank. */
function ordered(filter: Filter) {
  const byRank = (a: { relevanceRank: number }, b: { relevanceRank: number }) => a.relevanceRank - b.relevanceRank;
  if (filter === 'all') {
    return TIER_ORDER.flatMap((t) => TECHNOLOGIES.filter((x) => x.tier === t).sort(byRank));
  }
  return TECHNOLOGIES.filter((t) => t.tier === filter).sort(byRank);
}

export function VerdictGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const items = ordered(filter);

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter technologies by verdict" className="flex flex-wrap gap-2">
        {CHIPS.map((c) => {
          const active = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter(c.key)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-caption font-medium transition-colors duration-200 ease-calm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                active
                  ? 'bg-offwhite text-navy border-offwhite'
                  : 'bg-transparent text-offwhite/80 border-offwhite/30 hover:border-offwhite/60'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
        {items.map((t) => (
          <VerdictCard key={t.id} tech={t} />
        ))}
      </div>
    </div>
  );
}
