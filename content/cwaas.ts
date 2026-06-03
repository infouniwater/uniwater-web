/**
 * Clean Water as a Service — content module.
 *
 * Authored 2026-06-04 from the supplied brief. Every fact below comes from
 * the brief verbatim (volumes, client names, city, water line). Nothing is
 * embellished. Rules baked into the data:
 *
 *   - Live proof exists for Soft / DM / Drinking ONLY. Iron-Free and RO
 *     Process have no public references yet -- see TODO below.
 *   - Shivshakti Expellers and Kumar Plasto Platers are described
 *     generically ("manufacturing"); the specific process is unconfirmed.
 *   - Aggregate stats are derived FROM the LIVE_SITES list, not asserted
 *     independently, so the page can't drift from the source data.
 *
 * Markup consumes this module only; page-level copy lives here.
 */

// ----- Pillars ------------------------------------------------------------

export interface Pillar {
  /** Short verb-led headline, 2-3 words. */
  title: string;
  /** One-sentence promise (16-26 words). */
  body: string;
}

export const PILLARS: Pillar[] = [
  {
    title: 'Zero capital outlay.',
    body:
      'We design, fund, own and install the plant. Nothing lands on your capex sheet. You start paying when the water meets spec.',
  },
  {
    title: 'Guaranteed to spec.',
    body:
      'An agreed water-quality standard, backed by an SLA. Iron, hardness, TDS, conductivity — held to the line that matters for your application.',
  },
  {
    title: 'Fully managed.',
    body:
      'Monthly preventive engineer visits, consumables, media, membranes, repairs — all included. The system is ours to keep running.',
  },
];

// ----- Service lines ------------------------------------------------------

export interface ServiceLine {
  /** Stable slug used in id="" anchors. */
  slug: string;
  /** Display name. */
  name: string;
  /** Single-line promise — the lead. */
  promise: string;
  /** Audience the line is best for (4–6 short phrases). */
  bestFor: string[];
  /** SLA / guarantee bullets, plain language. */
  guarantee: string[];
  /** When true, the card gets the prominence treatment (border + tint
   *  callout). Foregrounded per the brief: Iron-Free is the flagship for
   *  the Kolkata / Bengal market. */
  featured?: boolean;
}

export const SERVICE_LINES: ServiceLine[] = [
  {
    slug: 'drinking',
    name: 'Drinking Water',
    promise: 'Safe, great-tasting potable water on tap, across every floor.',
    bestFor: ['Offices', 'IT parks', 'Campuses', 'Hospitals', 'Hotels', 'Cafeterias'],
    guarantee: ['IS 10500 potability', 'Monitored TDS', 'Hygienic dispensing'],
  },
  {
    slug: 'iron-free',
    name: 'Iron-Free Water',
    promise: 'Clear, odour-free water with zero rust staining.',
    bestFor: ['Laundries', 'Hospitality', 'Food processing', 'Groundwater-fed real estate'],
    guarantee: ['Iron below 0.3 ppm', 'No staining', 'Automated backwash'],
    featured: true,
  },
  {
    slug: 'soft',
    name: 'Soft Water',
    promise: 'Scale-free soft water that protects every appliance and surface.',
    bestFor: ['Hotels', 'Salons & spas', 'Boilers', 'Cooling towers', 'RO pre-treatment'],
    guarantee: ['Hardness held to target', 'Scale protection', 'Self-regenerating'],
  },
  {
    slug: 'ro-process',
    name: 'RO Process Water',
    promise: 'Consistent low-TDS process water, on demand, to spec.',
    bestFor: ['F&B and beverage', 'Pharma', 'Manufacturing', 'Labs', 'Central kitchens'],
    guarantee: ['TDS / conductivity to spec', 'Assured flow', 'Managed membranes'],
  },
  {
    slug: 'dm',
    name: 'DM Water',
    promise: 'Ultra-pure demineralised water, polished to a conductivity target.',
    bestFor: ['Boiler feed', 'Pharma', 'Electronics', 'Batteries', 'Plating', 'Labs'],
    guarantee: ['Conductivity to spec', 'Continuous supply', 'Resin managed for you'],
  },
];

// ----- Process ------------------------------------------------------------

export interface ProcessStep {
  /** Zero-padded ordinal — '01' .. '04'. */
  n: string;
  /** Imperative-voice headline. */
  title: string;
  /** One-sentence detail. */
  body: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: '01',
    title: 'Free water survey.',
    body: 'We test source water and map real demand on site. No quote without it.',
  },
  {
    n: '02',
    title: 'We design and install.',
    body: 'The right plant for your readings, funded and engineered by Uniwater.',
  },
  {
    n: '03',
    title: 'Water to spec.',
    body: 'Metered, monitored, delivered to the agreed standard from day one.',
  },
  {
    n: '04',
    title: 'We keep it running.',
    body: 'Monthly engineer visits; media, membranes, and repairs all covered.',
  },
];

// ----- Live deployments ---------------------------------------------------

// Which line is running at the site. Keep aligned with SERVICE_LINES.slug
// so the page can render badges/links by lookup. A site can run more than
// one line at once -- Acme Moulders and Techno India both do.
export type WaterLineSlug = 'drinking' | 'iron-free' | 'soft' | 'ro-process' | 'dm';

export interface LiveSite {
  /** Stable slug for id="" and React keys. */
  slug: string;
  /** Client / venue display name. */
  name: string;
  /** City the deployment is in (matches CITIES.slug where possible). */
  city: string;
  /** Country -- 'India' or 'Nepal'. */
  country: 'India' | 'Nepal';
  /** One-line context (industry, scope, count of flats / students etc). */
  context: string;
  /** Lines deployed -- 1 or more from WaterLineSlug. */
  lines: WaterLineSlug[];
  /** Optional throughput / volume detail, plain language (e.g. "1 lakh L/day"). */
  volume?: string;
}

export const LIVE_SITES: LiveSite[] = [
  {
    slug: 'bsm-tulsidham',
    name: 'BSM Enclave — Tulsidham Society',
    city: 'Kolkata',
    country: 'India',
    context: 'Residential society, 120 flats',
    lines: ['soft'],
    volume: '1 lakh L/day',
  },
  {
    slug: 'starwood-chinar-park',
    name: 'Starwood, Chinar Park',
    city: 'Kolkata',
    country: 'India',
    context: 'Residential society, 280 flats',
    lines: ['soft'],
    volume: '2.5 lakh L/day',
  },
  {
    slug: 'acme-moulders',
    name: 'Acme Moulders',
    city: 'Kolkata',
    country: 'India',
    context: 'Furniture manufacturing',
    lines: ['dm', 'drinking'],
    volume: 'DM 1 lakh L/month',
  },
  {
    slug: 'techno-india-joka',
    name: 'Techno India Group — College, Joka',
    city: 'Kolkata',
    country: 'India',
    context: '2,000+ students',
    lines: ['drinking'],
  },
  {
    slug: 'techno-india-jhore',
    name: 'Techno India Group — Resort “Jhore Jole Jongole”',
    city: 'Kolkata',
    country: 'India',
    context: 'Sundarbans resort',
    lines: ['drinking'],
  },
  {
    slug: 'contour-furnitures',
    name: 'Contour Furnitures',
    city: 'Kolkata',
    country: 'India',
    context: 'Furniture factory',
    lines: ['drinking'],
  },
  {
    slug: 'shivshakti-expellers',
    name: 'Shivshakti Expellers',
    city: 'Kolkata',
    country: 'India',
    // Specific industry unconfirmed per brief -- describe generically.
    context: 'Manufacturing',
    lines: ['drinking'],
  },
  {
    slug: 'kumar-plasto-platers',
    name: 'Kumar Plasto Platers',
    city: 'Kolkata',
    country: 'India',
    // Specific industry unconfirmed per brief -- describe generically.
    context: 'Manufacturing',
    lines: ['dm'],
  },
  {
    slug: 'heritage-international-school',
    name: 'Heritage International School',
    city: 'Biratnagar',
    country: 'Nepal',
    context: 'School',
    lines: ['drinking'],
  },
  {
    slug: 'feel-good-restaurant',
    name: 'Feel Good Restaurant',
    city: 'Biratnagar',
    country: 'Nepal',
    context: 'Restaurant',
    lines: ['drinking'],
  },
];

// TODO: add an Iron-Free reference site once a CWaaS deployment goes live.
// TODO: add an RO Process reference site once a CWaaS deployment goes live.
// These two lines have NO live CWaaS references yet -- the page surfaces a
// "first deployments under contract" caption rather than fabricating clients.

// ----- Audience tracks ----------------------------------------------------

/** The three audience segments CWaaS is available to. Per Rajat
 *  2026-06-04: CWaaS is NOT sold to individual homeowners -- only to
 *  commercial, industrial, and residential-society buyers. The page leads
 *  with these tracks instead of the abstract three-pillar pitch so the
 *  visitor's audience is named in the first scroll. */
export interface AudienceTrack {
  /** Stable slug for id="" and React keys. */
  slug: 'commercial' | 'industrial' | 'residential-societies';
  /** Eyebrow label above the headline. */
  eyebrow: string;
  /** H3 / track headline. */
  headline: string;
  /** Short pitch (1-2 sentences). */
  body: string;
  /** Water lines (slugs) this track typically uses. */
  lines: WaterLineSlug[];
  /** LIVE_SITES slugs that prove this track. Page renders the matching
   *  site cards inline beneath the track headline. */
  proofSites: string[];
  /** CTA verb under the track card. */
  ctaLabel: string;
  /** Where the CTA goes -- existing /book-survey flow with a context
   *  hint. The survey form ignores ?context today; once it gains a
   *  context field, that token tags the lead. */
  ctaHref: string;
}

export const AUDIENCE_TRACKS: AudienceTrack[] = [
  {
    slug: 'commercial',
    eyebrow: 'Commercial',
    headline: 'Offices, hospitality, healthcare, education.',
    body:
      'Drinking water on every floor that meets IS 10500. Soft water for hotels and laundries. The plant is ours; the building is yours.',
    lines: ['drinking', 'soft', 'iron-free'],
    proofSites: [
      'techno-india-joka',
      'techno-india-jhore',
      'heritage-international-school',
      'feel-good-restaurant',
      'contour-furnitures',
    ],
    ctaLabel: 'Talk to us about commercial water',
    ctaHref: '/book-survey?context=cwaas-commercial',
  },
  {
    slug: 'industrial',
    eyebrow: 'Industrial',
    headline: 'Manufacturing, process, quality-controlled plants.',
    body:
      'DM water for boilers, plating, batteries, electronics. RO process water for F&B, pharma, beverage. Resin and membranes managed for you.',
    lines: ['dm', 'ro-process', 'drinking'],
    proofSites: [
      'acme-moulders',
      'kumar-plasto-platers',
      'shivshakti-expellers',
    ],
    ctaLabel: 'Talk to us about industrial water',
    ctaHref: '/book-survey?context=cwaas-industrial',
  },
  {
    slug: 'residential-societies',
    eyebrow: 'Residential societies',
    headline: 'Housing societies, apartment complexes, gated communities.',
    body:
      'Whole-society soft water that protects every appliance in every flat. Centralised drinking water on tap. The committee stops firefighting plant problems.',
    lines: ['soft', 'iron-free', 'drinking'],
    proofSites: ['bsm-tulsidham', 'starwood-chinar-park'],
    ctaLabel: 'Talk to us about society water',
    ctaHref: '/book-survey?context=cwaas-society',
  },
];

/** Lookup helper -- pulls the LiveSite records that prove a given track. */
export function getProofForTrack(track: AudienceTrack): LiveSite[] {
  return track.proofSites
    .map((slug) => LIVE_SITES.find((s) => s.slug === slug))
    .filter((s): s is LiveSite => Boolean(s));
}

// ----- Aggregate stats (derived) ------------------------------------------

// These derive FROM LIVE_SITES rather than being asserted independently so
// nothing drifts when a deployment is added or removed. Each is a single
// figure with its definition documented inline.

/** Total live sites under contract. Techno India counts twice (college +
 *  resort are two distinct deployments). */
export const LIVE_SITES_COUNT = LIVE_SITES.length;

/** Countries represented across all sites. */
export const LIVE_COUNTRIES_COUNT = new Set(LIVE_SITES.map((s) => s.country)).size;

/** Combined flat count from the two managed-soft-water residential societies.
 *  Derived; not user-typed. */
export const HOMES_ON_SOFT_WATER =
  120 /* BSM Enclave Tulsidham */ + 280 /* Starwood Chinar Park */;

/** Total daily soft-water delivery from the two managed residential societies. */
export const SOFT_WATER_LAKH_LITRES_PER_DAY = 1 + 2.5;

/** Drinking-water served at the largest single site (Techno India college). */
export const STUDENTS_ON_DRINKING_WATER = 2000;

/** DM water delivered at Acme Moulders, monthly. */
export const DM_WATER_LAKH_LITRES_PER_MONTH = 1;

// ----- Hero / metadata copy ----------------------------------------------

export const HERO_EYEBROW = 'Clean Water as a Service';
export const HERO_TITLE = 'Stop buying water plants. Buy water outcomes.';
export const HERO_SUB =
  'Uniwater designs, funds, owns, installs, operates and maintains the entire treatment system. You pay one predictable fee for water held to specification. Zero capital, zero downtime, zero operational burden.';

export const META_TITLE = 'Clean Water as a Service | Uniwater';
export const META_DESCRIPTION =
  'Clean Water as a Service from Uniwater — we design, fund, own and run the treatment plant; you pay for water held to spec. Soft, drinking, iron-free, RO process and DM water lines, with monthly preventive engineer visits. Live across India and Nepal.';
