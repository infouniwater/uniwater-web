/**
 * Solutions taxonomy.
 *
 * Maps nav slugs to:
 *   - the underlying catalogue SKU range
 *   - the brand-family wordmark (BathSoft / HomeSoft) per Blueprint §3.4 / §8
 *   - configuration tiers (Mono/Duo/Trio etc) — never expose SKU codes
 *   - MRP price range shown as "from X" per Critique §2.7 + Blueprint Sprint 0
 *
 * Per Blueprint §12.3: brand-family wordmarks appear on solution heroes,
 * but nav labels stay plain-language for SEO and clarity.
 */

// Iron / water-softener / sediment / activated-carbon were dropped as
// standalone solution pages 2026-06-03 because each media also lives
// inside the HomeSoft 4-stage train (whole-house) and inside BathSoft.
//
// Iron-filter and water-softener were RE-ADDED later the same day for the
// Tier-1 SEO/GEO pass: "does a water softener remove iron", "iron remover vs
// water softener", and "borewell water yellow/orange" are high-intent
// queries with no landing page otherwise. The two pages reuse the existing
// SolutionDetailTemplate via the pretreatment-stage / specialised-media
// install contexts. Sediment + activated-carbon stay folded into HomeSoft.
export type SolutionSlug =
  | 'bathroom-filter'
  | 'whole-house-water-filter'
  | 'drinking-water-solution'
  | 'iron-filter'
  | 'water-softener';

export interface Solution {
  slug: SolutionSlug;
  navLabel: string;          // Plain-language nav label
  wordmark?: string;          // BathSoft / HomeSoft where applicable
  shortHeadline: string;     // Hero one-liner
  problemBands: string[];    // 3-4 problem cards
  priceFromINR?: number;     // MRP "from" — residential only per Blueprint §12.5
  configurations: Array<{ name: string; subtitle: string; description: string }>;
  installContext:
    | 'bathroom-five-places'
    | 'whole-house-inlet'
    | 'industrial-skid'
    | 'point-of-use'
    | 'pretreatment-stage'
    | 'specialised-media';
  related: SolutionSlug[];
}

export const SOLUTIONS: Record<SolutionSlug, Solution> = {
  'bathroom-filter': {
    slug: 'bathroom-filter',
    navLabel: 'BathSoft',
    wordmark: 'BathSoft',
    shortHeadline:
      'A bathroom filter has to do three things at once: treat the water, fit the space, not announce itself.',
    // Problem bands tightened 2026-06-02 -- each band is one
    // punchy sentence now (was 40-55 words each). Per Rajat's
    // feedback the previous version read as four paragraphs;
    // each card is now scannable in under 5 seconds.
    problemBands: [
      // 01 \u00b7 TREAT
      'Removes hardness, particulate, and chlorine residual at the bathroom feed.',
      // 02 \u00b7 FIT
      'Engineered for 200 mm ceilings, 150 mm shafts, retro-fit niches \u2014 not the other way around.',
      // 03 \u00b7 HIDE
      'Inside cabinets, ceiling voids, wall recesses. Once installed, you stop seeing it.',
      // 04 \u00b7 SERVE
      'Monthly engineer visit. Same person. Named, for the life of the contract.',
    ],
    // priceFromINR removed 2026-06-02 -- the per-tier "from \u20b9X"
    // anchors now live inside each configuration subtitle (Mono \u20b914k
    // / Duo \u20b924k / Trio \u20b942k), which is more honest than one
    // hero anchor.
    configurations: [
      {
        name: 'Mono',
        subtitle: 'Single cylinder \u2014 from \u20b914,000',
        description: 'Single shower, standard fittings. ~1,200 LPH peak.',
      },
      {
        name: 'Duo',
        subtitle: 'Double cylinder \u2014 from \u20b924,000',
        description: 'Rain shower + body jets, or two showers in parallel. ~1,800 LPH peak.',
      },
      {
        name: 'Trio',
        subtitle: 'Triple cylinder \u2014 from \u20b942,000',
        description: 'Master suite \u2014 steam, jacuzzi, multiple high-flow outlets. ~2,400 LPH peak.',
      },
    ],
    installContext: 'bathroom-five-places',
    related: ['whole-house-water-filter', 'drinking-water-solution'],
  },
  'whole-house-water-filter': {
    slug: 'whole-house-water-filter',
    navLabel: 'HomeSoft',
    wordmark: 'HomeSoft',
    shortHeadline:
      'One softened, filtered supply for the whole house. Every shower, every sink, every appliance.',
    problemBands: [
      'Treating water tap-by-tap means six service contracts. Treating at the inlet means one.',
      'Geysers, washing machines, dishwashers fail early on hard or iron-bearing water.',
      'BathSoft helps the bathroom. The kitchen sink, the washing machine, the garden tap still get raw supply.',
      'Borewell-fed homes need iron removal upstream of everything else. Or everything else fails faster.',
    ],
    priceFromINR: 50000,
    configurations: [
      {
        name: '2K',
        subtitle: '2,000 LPH',
        description: '3\u20134 bathroom homes. Mid-rise apartment, compact villa.',
      },
      {
        name: '4K',
        subtitle: '4,000 LPH',
        description: '5\u20136 bathrooms, small villas with utility loads.',
      },
      {
        name: '6K',
        subtitle: '6,000 LPH',
        description: 'Large villas, duplexes, garden draw. Highest residential capacity.',
      },
    ],
    installContext: 'whole-house-inlet',
    related: ['bathroom-filter', 'drinking-water-solution'],
  },
  // Drinking water reads differently from BathSoft / HomeSoft on purpose:
  // those two are "how does it fit into the architecture" problems.
  // Drinking water is a chemistry-first problem solved at a single tap
  // (or a centralised plant). The page surfaces that on the template via
  // installContext === 'point-of-use': the "How we solve it" grid swaps
  // to TDS / Household / Plumbing, and "Where it goes" lists three
  // physical locations (DRINKING_PLACES) instead of the bathroom/whole-
  // house five.
  'drinking-water-solution': {
    slug: 'drinking-water-solution',
    navLabel: 'Drinking water systems',
    shortHeadline:
      'The one tap where chemistry beats every other concern. RO or UF + UV is a 10-minute test, not a sales decision.',
    problemBands: [
      // 01 · CHEMISTRY CALL
      'Drinking water is a chemistry call: TDS above 500 ppm calls for RO; below 200, UF + UV. Anything in between needs a test, not a guess.',
      // 02 · RE-MINERALISATION
      'Re-mineralisation is not optional on RO. Bare RO strips calcium and magnesium, tastes flat, and isn’t healthier.',
      // 03 · ECONOMICS
      'Bottled water for a family runs ₹12,000–18,000 a year. A kitchen system pays for itself within eighteen months.',
      // 04 · LOCATION
      'On the counter, under the sink, or centralised at the plant. The kitchen layout decides the answer.',
    ],
    priceFromINR: 15000,
    configurations: [
      {
        name: 'Kitchen RO',
        subtitle: 'TDS > 500 ppm · wall-mounted or under-sink',
        description: 'Reverse osmosis with re-mineralisation, dedicated chrome counter-top tap, 8–12 L storage. The right answer for borewell-fed cities and high-TDS municipal supply.',
      },
      {
        name: 'Kitchen UF + UV',
        subtitle: 'TDS < 200 ppm · wall-mounted',
        description: 'Ultrafiltration with UV. Natural minerals stay; pathogens go. Lower running cost than RO when TDS is already low.',
      },
      {
        name: 'Centralised',
        subtitle: '25 / 50 / 100 LPH · plant room',
        description: 'One plant, drinking-quality at every tap on a dedicated line. For villas, offices, schools, clinics. Sized at survey to expected daily draw.',
      },
    ],
    installContext: 'point-of-use',
    related: ['whole-house-water-filter', 'bathroom-filter'],
  },
  // Iron removal — a pre-treatment stage that also ships as a standalone
  // page for the iron-staining / iron-vs-softener search intent.
  'iron-filter': {
    slug: 'iron-filter',
    navLabel: 'Iron removal filter',
    shortHeadline:
      'Iron is the stain you can see and the taste you can’t ignore — and it has to come out before anything else does.',
    problemBands: [
      'Dissolved iron looks clear at the tap, then turns water yellow or orange the moment it meets air — staining basins, tiles, and white laundry.',
      'Iron fouls softening resin and clogs RO membranes. Left untreated upstream, it shortens the life of everything after it.',
      'Borewell-fed homes carry iron more often than the municipal record suggests. Treat it first, or rebuild the softener inside a year.',
      'An iron filter is a media bed, not a cartridge. Sized to the iron load and backwashed on cycle, it runs for years.',
    ],
    configurations: [
      {
        name: 'Single-point',
        subtitle: 'Bathroom or single line',
        description: 'One iron-removal vessel at the bathroom feed or a single line. Manual backwash.',
      },
      {
        name: 'Whole-house',
        subtitle: '2,000 — 4,000 LPH',
        description: 'Iron pre-treatment ahead of the HomeSoft train, so iron never reaches the softening resin. Automatic backwash on larger loads.',
      },
      {
        name: 'Heavy iron',
        subtitle: 'Iron above 3 ppm',
        description: 'Oxidation plus media for high-iron borewells. Sized at survey to the measured load.',
      },
    ],
    installContext: 'pretreatment-stage',
    related: ['whole-house-water-filter', 'water-softener'],
  },
  // Water softener — hardness removal. Standalone page for the
  // "does a softener remove iron" / scale-on-fittings search intent.
  'water-softener': {
    slug: 'water-softener',
    navLabel: 'Water softener',
    shortHeadline:
      'Hard water scales every fitting, geyser, and appliance it touches. A softener takes the hardness out at the source.',
    problemBands: [
      'Hardness is calcium and magnesium. It furs up geyser elements, blocks shower heads, clouds glassware, and leaves white scale on every fitting.',
      'A softener swaps that hardness for sodium on an ion-exchange resin — the standard, proven fix for scale.',
      'It does not remove iron. On borewell supply, iron has to be filtered out upstream first, or it fouls the resin.',
      'Resin is regenerated with salt on cycle. Sized to your draw and hardness, it runs for years with routine service.',
    ],
    configurations: [
      {
        name: 'Single-point',
        subtitle: 'Bathroom feed',
        description: 'Softens the bathroom feed where scale is the only issue. Compact vessel, manual or automatic.',
      },
      {
        name: 'Whole-house',
        subtitle: '2,000 — 6,000 LPH',
        description: 'Softens every tap from the inlet. Brine tank for automatic regeneration.',
      },
      {
        name: 'High hardness',
        subtitle: 'Hardness above 400 ppm',
        description: 'Larger resin volume and buffer for very hard supply. Sized at survey.',
      },
    ],
    installContext: 'specialised-media',
    related: ['whole-house-water-filter', 'iron-filter'],
  },
};

/**
 * Keyword-led SEO title + meta description per solution. Kept separate from
 * the on-page content (navLabel / shortHeadline) on purpose: titles and metas
 * are invisible to visitors and must carry the search query ("water softener",
 * "iron filter") that the brand-led nicknames (BathSoft / HomeSoft) don't. The
 * title template appends " | Uniwater" automatically.
 */
export const SOLUTION_SEO: Record<SolutionSlug, { title: string; description: string; anchor: string }> = {
  'bathroom-filter': {
    title: 'Bathroom Water Filter & Softener (BathSoft)',
    description:
      'BathSoft bathroom water filters remove hardness, iron, and chlorine at the shower feed — hidden in the ceiling, niche, or cabinet. Surveyed, installed, and serviced monthly across India & Nepal.',
    anchor: 'bathroom water filter',
  },
  'whole-house-water-filter': {
    title: 'Whole-House Water Softener & Filter (HomeSoft)',
    description:
      'HomeSoft whole-house water softeners and four-stage filtration — sediment, iron, carbon, softening — treat every tap from a single inlet. Surveyed, installed, and serviced monthly by Uniwater.',
    anchor: 'whole-house water filter',
  },
  'drinking-water-solution': {
    title: 'Drinking Water RO & UV Purifier Systems',
    description:
      'Kitchen RO and UF + UV drinking-water systems sized by a free TDS test — re-mineralised, under-sink or centralised. Engineered and serviced by Uniwater across India & Nepal.',
    anchor: 'drinking water system',
  },
  'iron-filter': {
    title: 'Iron Removal Filter for Borewell Water',
    description:
      'Iron-removal filters that clear yellow/orange staining and metallic taste from borewell water, fitted upstream of softening. Surveyed, installed, and serviced by Uniwater.',
    anchor: 'iron removal filter',
  },
  'water-softener': {
    title: 'Water Softener for Hard Water',
    description:
      'Water softeners that stop scale on geysers, fittings, and glassware by removing hardness at the source. Sized at survey; iron handled upstream. Installed and serviced by Uniwater.',
    anchor: 'water softener',
  },
};

// Helpers
export const SOLUTION_LIST = Object.values(SOLUTIONS);
// Three named product families a homeowner picks from. Iron /
// softening / sediment / activated-carbon are stages inside the
// HomeSoft train and inside BathSoft, surfaced on the whole-house
// "Inside the vessel" cutaway and the bathroom-filter media stack
// instead of as standalone catalogue entries.
export const RESIDENTIAL_SOLUTIONS: SolutionSlug[] = [
  'bathroom-filter',
  'whole-house-water-filter',
  'drinking-water-solution',
];

export function getSolution(slug: SolutionSlug): Solution {
  return SOLUTIONS[slug];
}

export function formatINR(n: number): string {
  // Indian numbering: 1,00,000 not 100,000
  return '\u20b9' + n.toLocaleString('en-IN');
}
