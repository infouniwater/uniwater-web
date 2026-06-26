'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { FIVE_PLACES } from '@/content/education';

/**
 * Three-part spec for the residential hero-object: What's inside / Installed &
 * hidden / Serviced monthly. Tabs on desktop (ARIA tablist, arrow-key
 * operable), stacked accordion on mobile.
 *
 * Dark band so /residential keeps its dark/light alternation:
 * hero(D) → HomeSystemHero(L) → HomeSystemSpec(D) → PincodeCheck(L) → ProblemSelector(D).
 *
 * The "Installed & hidden" tab REUSES the five install-location names from
 * content/education.ts (FIVE_PLACES) rather than re-typing them, and points to
 * the full InstallationVersatility section below instead of duplicating it.
 */
const PLACES = FIVE_PLACES.map((p) => p.location);

interface Tab {
  key: string;
  title: string;
  paras: string[];
  places?: string[];
}

const TABS: Tab[] = [
  {
    key: 'inside',
    title: 'What’s inside',
    paras: [
      'Iron removal where the borewell needs it, ion-exchange softening for hardness, carbon polishing for chlorine and taste, and drinking-water treatment sized to your TDS.',
      'Configured from 100+ engineered options — not one box for every home. The survey decides the stages, the order, and the size.',
    ],
  },
  {
    key: 'hidden',
    title: 'Installed & hidden',
    paras: [
      'Decided at survey, specified before tile, and installed by the same engineers who designed it. Once it is in, you stop seeing it.',
    ],
    places: PLACES,
  },
  {
    key: 'serviced',
    title: 'Serviced monthly',
    paras: [
      'A relationship, not a sale-and-vanish. A named engineer visits every month to inspect, clean, backwash, and verify — not only when something breaks.',
      'Own teams across nine cities, never subcontracted. A written report lands the same day.',
    ],
  },
];

function Panel({ tab }: { tab: Tab }) {
  return (
    <div className="flex flex-col gap-4 max-w-reading">
      {tab.paras.map((p, i) => (
        <Body key={i} inverse className="text-offwhite/80">{p}</Body>
      ))}
      {tab.places && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {tab.places.map((loc) => (
            <span key={loc} className="text-caption text-offwhite bg-offwhite/10 border border-offwhite/20 rounded-full px-3 py-1">
              {loc}
            </span>
          ))}
          <span className="text-caption text-offwhite/60">&mdash; shown in detail below.</span>
        </div>
      )}
    </div>
  );
}

export function HomeSystemSpec() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const count = TABS.length;
    let next = active;
    if (e.key === 'ArrowRight') next = (active + 1) % count;
    else if (e.key === 'ArrowLeft') next = (active - 1 + count) % count;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = count - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section padding="default" tone="navy">
      <div className="mb-8 max-w-3xl flex flex-col gap-4">
        <Eyebrow inverse>The system, in three parts</Eyebrow>
        <Heading level={2} inverse>What is inside it, where it hides, and how it stays right.</Heading>
      </div>

      {/* Desktop: tabs */}
      <div className="hidden md:block max-w-4xl">
        <div role="tablist" aria-label="How the home system works" className="flex flex-wrap gap-1 border-b border-offwhite/15">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              id={`hs-tab-${t.key}`}
              aria-selected={active === i}
              aria-controls={`hs-panel-${t.key}`}
              tabIndex={active === i ? 0 : -1}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`-mb-px border-b-2 px-5 py-3 text-caption font-medium transition-colors duration-200 ease-calm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                active === i ? 'border-soft text-offwhite' : 'border-transparent text-offwhite/55 hover:text-offwhite'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
        {TABS.map((t, i) => (
          <div
            key={t.key}
            role="tabpanel"
            id={`hs-panel-${t.key}`}
            aria-labelledby={`hs-tab-${t.key}`}
            hidden={active !== i}
            className="pt-6"
          >
            <Panel tab={t} />
          </div>
        ))}
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden max-w-2xl">
        <Accordion inverse>
          {TABS.map((t, i) => (
            <AccordionItem inverse key={t.key} question={t.title} defaultOpen={i === 0}>
              <Panel tab={t} />
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
