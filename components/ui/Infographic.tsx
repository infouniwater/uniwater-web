import { cn } from '@/lib/cn';

/**
 * <Infographic> — renders the catalogue-grade SVG/PNG embeds per
 * BLUEPRINT §3.7 + §14. Hidden on mobile by default: the SVGs are
 * authored at 1920×1080 (or similar) with body text in the 25–34px range,
 * which compresses to ~4–6px on a 375px phone — illegible. Section
 * eyebrow + headline + body above the infographic already carry the
 * message in readable text on small screens. Mobile users see the
 * narrative; tablet+ users get the diagram. (User feedback 2026-05-19.)
 *
 * When real, dedicated portrait/mobile assets ship (≤500px wide canvas
 * with appropriately sized type), remove the hidden md:block wrappers
 * and let the existing <picture> media-query pick them up.
 *
 * Assets not in MANIFEST fall back to a labelled placeholder so the page
 * still works while commissioned art is in flight.
 */

interface InfographicProps {
  /** Asset slug keyed against MANIFEST (e.g. "decision-vs-eighteen-months.svg"). */
  assetName: string;
  /** Plain-English description used as alt text / aria-label. */
  description: string;
  className?: string;
  /** Used only by the placeholder fallback; real assets honour their intrinsic aspect. */
  aspect?: '16/9' | '4/3' | '3/2';
}

const BASE = '/images/infographics';

const MANIFEST: Record<string, { landscape: string; portrait?: string }> = {
  'decision-vs-eighteen-months.svg': {
    landscape: `${BASE}/landscape/decision-vs-eighteen-months.svg`,
    portrait: `${BASE}/portrait/decision-vs-eighteen-months.svg`,
  },
  'three-forces.svg': {
    landscape: `${BASE}/landscape/three-forces.svg`,
    portrait: `${BASE}/portrait/three-forces.svg`,
  },
  'five-places-and-monthly-service.svg': {
    landscape: `${BASE}/landscape/five-places-and-monthly-service.svg`,
    portrait: `${BASE}/portrait/five-places-and-monthly-service.svg`,
  },
  'hardness-scale.svg': {
    landscape: `${BASE}/landscape/hardness-scale.svg`,
    portrait: `${BASE}/portrait/hardness-scale.svg`,
  },
  'homesoft-four-stage.svg': {
    landscape: `${BASE}/landscape/homesoft-four-stage.svg`,
    portrait: `${BASE}/portrait/homesoft-four-stage.svg`,
  },
  'tds-decision-tree.svg': {
    landscape: `${BASE}/landscape/tds-decision-tree.svg`,
    portrait: `${BASE}/portrait/tds-decision-tree.svg`,
  },
  'ro-vs-dm.svg': {
    landscape: `${BASE}/landscape/ro-vs-dm.svg`,
    portrait: `${BASE}/portrait/ro-vs-dm.svg`,
  },
  'building-wtp-ladder.svg': {
    landscape: `${BASE}/landscape/building-wtp-ladder.svg`,
    portrait: `${BASE}/portrait/building-wtp-ladder.svg`,
  },
  'where-we-work.png': {
    landscape: `${BASE}/commercial/where-we-work.png`,
  },
  // Alias — the marketing map and the commercial "where we work" map are the
  // same geographic asset (India + Nepal, 9 cities). Until a marketing-specific
  // SVG ships, render the commercial PNG so call sites stay placeholder-free.
  'india-nepal-9-city-map.svg': {
    landscape: `${BASE}/commercial/where-we-work.png`,
  },
  'system-types.png': {
    landscape: `${BASE}/commercial/system-types.png`,
  },
  'track-record.png': {
    landscape: `${BASE}/commercial/track-record.png`,
  },
};

export function Infographic({
  assetName,
  description,
  className,
  aspect = '16/9',
}: InfographicProps) {
  const entry = MANIFEST[assetName];

  if (entry) {
    return (
      <picture
        className={cn('relative hidden md:block w-full bg-navy overflow-hidden', className)}
      >
        {entry.portrait && (
          <source media="(max-width: 767px)" srcSet={entry.portrait} />
        )}
        {/* <picture> with media-query <source> is the spec primitive; next/image cannot express it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.landscape}
          alt={description}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />
      </picture>
    );
  }

  return (
    <div
      role="img"
      aria-label={description}
      className={cn(
        'relative hidden md:block w-full bg-navy/60 border border-offwhite/15 overflow-hidden',
        className
      )}
      style={{ aspectRatio: aspect.replace('/', ' / ') }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="#FAFAF7" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#FAFAF7" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <p className="text-eyebrow font-medium uppercase text-soft mb-3">
            Infographic placeholder
          </p>
          <p className="text-offwhite/85 text-body leading-relaxed mb-3">
            {description}
          </p>
          <p className="text-[11px] font-mono text-offwhite/50">
            asset: {assetName}
          </p>
        </div>
      </div>
    </div>
  );
}
