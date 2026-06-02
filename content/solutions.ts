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

export type SolutionSlug =
  | 'bathroom-filter'
  | 'whole-house-water-filter'
  | 'drinking-water-solution'
  | 'iron-filter'
  | 'water-softener'
  | 'sediment-filter'
  | 'activated-carbon-filter';

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
    navLabel: 'Bathroom filters',
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
    // / Duo \u20b924k / Trio \u20b942k), which is more honest than a single
    // hero anchor and matches the other six solutions (iron, softener,
    // sediment, carbon, whole-house, drinking-water) which never had
    // a single anchor.
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
    related: ['whole-house-water-filter', 'iron-filter', 'water-softener'],
  },
  'whole-house-water-filter': {
    slug: 'whole-house-water-filter',
    navLabel: 'Whole-house filtration',
    wordmark: 'HomeSoft',
    shortHeadline:
      'One softened, filtered supply for the whole house. Every shower, every sink, every appliance.',
    problemBands: [
      'Treating water tap-by-tap means six service contracts. Treating at the inlet means one.',
      'Geysers, washing machines, dishwashers fail early on hard or iron-bearing water.',
      'Bathroom filters help the bathroom. The kitchen sink, the washing machine, the garden tap still get raw supply.',
      'Borewell-fed homes need iron removal upstream of everything else. Or everything else fails faster.',
    ],
    priceFromINR: 100000,
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
    related: ['iron-filter', 'water-softener', 'bathroom-filter'],
  },
  'drinking-water-solution': {
    slug: 'drinking-water-solution',
    navLabel: 'Drinking water systems',
    shortHeadline:
      'The kitchen is the one tap where chemistry matters more than feel. The shower can forgive imperfect water. The kitchen cannot.',
    problemBands: [
      'Bottled water bills run \u20b912,000\u201318,000 a year. A kitchen system pays for itself in eighteen months.',
      'RO when TDS runs high. UF with UV when it runs low. Same kitchen, different chemistry, different answer.',
      'Wall-mounted, under-sink, or centralised. The plumbing decides where it goes.',
      'Re-mineralisation matters. RO water that strips magnesium and calcium tastes flat and isn\u2019t healthier.',
    ],
    priceFromINR: 15000,
    configurations: [
      {
        name: 'Kitchen RO',
        subtitle: 'Wall-mounted or under-sink',
        description: 'For TDS above 500 ppm. Re-mineralised post-RO so the water doesn’t taste flat.',
      },
      {
        name: 'Kitchen Non-RO (UF + UV)',
        subtitle: 'Wall-mounted',
        description: 'For TDS below 200 ppm. Natural minerals stay; pathogens go.',
      },
      {
        name: 'Centralised 25 / 50 / 100 LPH',
        subtitle: 'Plant room',
        description: 'For villas, offices, schools, clinics. Drinking-quality at scale.',
      },
    ],
    installContext: 'point-of-use',
    related: ['whole-house-water-filter', 'sediment-filter', 'activated-carbon-filter'],
  },
  'iron-filter': {
    slug: 'iron-filter',
    navLabel: 'Iron filter',
    shortHeadline:
      'Borewell-fed homes have it. Old galvanised mains have it. Orange grout. Faint stains under the WC rim.',
    problemBands: [
      'Iron stains tile grout, marble, sanitaryware. Orange ring at the base of the vanity is the giveaway.',
      'Iron destroys downstream resin. A softener after iron exposure clogs within months, not years.',
      'Iron in drinking water has a metallic taste even at low concentrations. Tea and coffee suffer first.',
      'Borewell water is the usual source, but old galvanised municipal pipes can deliver it too.',
    ],
    // priceFromINR intentionally omitted \u2014 this product ships at two
    // residential tiers (bathroom from ~\u20b914k, whole-house from ~\u20b91L)
    // and a single "From \u20b914,000" anchor in the hero misleads visitors
    // who arrived looking for whole-house. Per-tier costs are quoted
    // after the free survey. Industrial / building-scale iron removal
    // is sized at /industrial, not here.
    configurations: [
      {
        name: 'Per-bathroom',
        subtitle: 'Single feed, ceiling / niche / shaft',
        description: 'For when one or two bathrooms are affected. Iron-removal media at the bathroom feed only.',
      },
      {
        name: 'Whole-house inlet',
        subtitle: '2K / 4K / 6K LPH',
        description: 'Treats every tap from a single point. The right answer for most borewell-fed homes \u2014 and the right place for iron removal in the HomeSoft train: stage one, upstream of softening and carbon.',
      },
    ],
    installContext: 'pretreatment-stage',
    related: ['water-softener', 'whole-house-water-filter', 'sediment-filter'],
  },
  'water-softener': {
    slug: 'water-softener',
    navLabel: 'Water softener',
    shortHeadline:
      'The single biggest improvement to a home\u2019s water. The unglamorous workhorse. The one most homes don\u2019t have.',
    // Problem bands tightened 2026-06-02 -- single sentences,
    // 15-25 words each. Scannable in under 5 seconds per card.
    problemBands: [
      'Calcium and magnesium swapped for sodium by ion-exchange. The single biggest lever for everything downstream.',
      'Geyser elements scale. Heating coil burns out \u2014 replaced under warranty once, paid for the second time.',
      'Washing machines and dishwashers fail on the coil, not the motor. Hard water shortens both.',
      'Salt top-up rolled into the AMC. A few rupees a day to keep the rest of the house alive.',
    ],
    // priceFromINR intentionally omitted — multi-tier (see iron-filter
    // note above). Per-tier prices are quoted after the free survey.
    configurations: [
      {
        name: 'Per-bathroom',
        subtitle: 'Single feed, ceiling / niche / cabinet',
        description: 'Local softening at the bathroom feed. Manual or automatic brine regeneration.',
      },
      {
        name: 'Whole-house inlet',
        subtitle: '2K / 4K / 6K LPH',
        description: 'Soft water to every tap — the kitchen, the washing machine, the garden tap. Brine regeneration on a schedule; salt top-up rolled into the AMC.',
      },
    ],
    installContext: 'specialised-media',
    related: ['iron-filter', 'whole-house-water-filter', 'bathroom-filter'],
  },
  'sediment-filter': {
    slug: 'sediment-filter',
    navLabel: 'Sediment filter',
    shortHeadline:
      'The chained pre-treatment. Protects every system downstream. The cheapest filter, doing the most invisible work.',
    problemBands: [
      'Sand, silt, particulate from upstream pipes scratches valves and tears membranes.',
      'Visible particles in water are usually a sign that something is wrong further upstream too.',
      'A sediment filter buys downstream systems years of life. Without it, RO membranes fail in months.',
      'Borewell water and old municipal lines both deliver particulate. Worst in monsoon.',
    ],
    // priceFromINR intentionally omitted — multi-tier (see iron-filter
    // note above). Per-tier prices are quoted after the free survey.
    configurations: [
      {
        name: 'Per-bathroom',
        subtitle: 'Single feed',
        description: 'Pre-treatment for a single feed. Spun-polypropylene cartridge in a stainless housing, replaced on a quarterly cadence.',
      },
      {
        name: 'Whole-house inlet',
        subtitle: '2K / 4K / 6K LPH',
        description: 'Stage one upstream of every other media filter on the line — iron, softening, carbon, RO. Without it, downstream media fails years early.',
      },
    ],
    installContext: 'pretreatment-stage',
    related: ['iron-filter', 'water-softener', 'whole-house-water-filter', 'drinking-water-solution'],
  },
  'activated-carbon-filter': {
    slug: 'activated-carbon-filter',
    navLabel: 'Activated carbon filter',
    shortHeadline:
      'Chlorine, odour, taste. The summer-chemical-smell stage. Approachable, not chemistry-textbook.',
    problemBands: [
      'Municipal supplies are chlorinated. The residual taste and smell carries through to chai and drinking water.',
      'Chlorine ages CP fittings, gaskets, rubber seals. Slowly, but it adds up.',
      'Activated carbon adsorbs organics, removes the chemical taste, leaves minerals untouched.',
      'Often paired with UV — carbon for taste, UV for pathogens.',
    ],
    // priceFromINR intentionally omitted — multi-tier (see iron-filter
    // note above). Per-tier prices are quoted after the free survey.
    configurations: [
      {
        name: 'Per-bathroom',
        subtitle: 'Single feed',
        description: 'Coconut-shell activated carbon at the bathroom feed. Removes chlorine taste and the residual chemical smell from the shower.',
      },
      {
        name: 'Whole-house inlet',
        subtitle: '2K / 4K / 6K LPH',
        description: 'Sits after sediment + iron + softening on the HomeSoft train. Polishes the supply before it reaches kitchen RO / UF or downstream taps.',
      },
    ],
    installContext: 'pretreatment-stage',
    related: ['drinking-water-solution', 'sediment-filter', 'whole-house-water-filter'],
  },
};

// Helpers
export const SOLUTION_LIST = Object.values(SOLUTIONS);
// Aligned with /residential page's RESIDENTIAL_SLUGS — the five "named"
// product families a homeowner would pick from. Sediment + carbon are
// stages within HomeSoft's four-stage train (pre-treatment), not
// standalone residential products, so they live in the catalogue but
// not in this curated list.
export const RESIDENTIAL_SOLUTIONS: SolutionSlug[] = [
  'bathroom-filter',
  'whole-house-water-filter',
  'drinking-water-solution',
  'iron-filter',
  'water-softener',
];

export function getSolution(slug: SolutionSlug): Solution {
  return SOLUTIONS[slug];
}

export function formatINR(n: number): string {
  // Indian numbering: 1,00,000 not 100,000
  return '\u20b9' + n.toLocaleString('en-IN');
}
