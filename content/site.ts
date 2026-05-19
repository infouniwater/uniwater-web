/**
 * Site-wide brand and operational constants.
 * Sources: BLUEPRINT.md §12.3 (approved phrases), Company Profile, both catalogues.
 */

export const SITE = {
  name: 'Uniwater',
  legalName: 'Uniwater Solutions Pvt Ltd',
  domain: 'uniwater.co.in',
  tagline: 'Wellness starts with clean water.',
  description:
    'Engineered home water — surveyed, installed, serviced monthly. For the homes you don\u2019t get to redo. 9 cities across India and Nepal.',
} as const;

export const CONTACT = {
  address: {
    line1: '316 Canal Street, Shribhumi',
    city: 'Kolkata',
    pin: '700048',
  },
  phones: ['+91 97487 45193', '+91 96632 45193'] as const,
  emails: {
    support: 'support@uniwater.co.in',
    marketing: 'marketing@uniwater.co.in',
  },
} as const;

/**
 * Company registration — rendered in the footer because Indian Pvt Ltd
 * companies must publish GSTIN and CIN on all customer-facing surfaces.
 *
 * GSTIN supplied. CIN is a PLACEHOLDER. To prevent it from rendering on
 * the live site with a fake value, the footer reads `LAUNCH_FLAGS.showCIN`
 * — flip to `true` once the real CIN from the MCA incorporation certificate
 * replaces the placeholder below.
 */
export const COMPANY_REGISTRATION = {
  GSTIN: '19AADCU6172B1ZD',
  // CIN: ASSUMED — placeholder shape. Replace with the actual CIN before
  // setting LAUNCH_FLAGS.showCIN = true.
  CIN: 'U41000WB2020PTC000000',
} as const;

/**
 * Social handles — placeholder URLs based on standard "@uniwater" pattern.
 * The actual handles need to be claimed and confirmed by marketing before
 * the footer renders them. Footer reads `LAUNCH_FLAGS.showSocial`.
 *
 * Grep "social: ASSUMED" to find these.
 */
// social: ASSUMED — placeholder URLs. Verify each handle is actually claimed
// (a real, controlled, posting account) before flipping LAUNCH_FLAGS.showSocial = true.
export const SOCIAL_HANDLES = {
  instagram: 'https://www.instagram.com/uniwater.in',
  linkedin: 'https://www.linkedin.com/company/uniwater-solutions',
  youtube: 'https://www.youtube.com/@uniwater',
  facebook: 'https://www.facebook.com/uniwater.in',
} as const;

export const SOCIAL_URLS = Object.values(SOCIAL_HANDLES);

/**
 * Launch gates — flip to `true` only after the corresponding data has been
 * verified. Everything here defaults to `false` so the site can soft-launch
 * to a staging URL without publishing placeholder data.
 */
export const LAUNCH_FLAGS = {
  /** Render CIN line in the footer. Flip to true once COMPANY_REGISTRATION.CIN holds the real MCA-filed number. */
  showCIN: false,
  /** Render social icon row in footer + emit SOCIAL_URLS in Org JSON-LD. Flip when handles are claimed. */
  showSocial: false,
} as const;

// Single source of truth for the primary phone and its derived hrefs.
// Use these everywhere instead of re-deriving from CONTACT.phones[0].
export const PRIMARY_PHONE = CONTACT.phones[0];
export const PRIMARY_PHONE_E164 = PRIMARY_PHONE.replace(/[^0-9]/g, ''); // "919748745193"
export const PRIMARY_PHONE_HREF = `tel:${PRIMARY_PHONE.replace(/\s/g, '')}`;
export const WHATSAPP_HREF = `https://wa.me/${PRIMARY_PHONE_E164}`;

// Per Strategy §1.2 and Blueprint §2 — these are FACT, used verbatim, never paraphrased.
export const NAMED_CLIENTS = [
  'Charnock Hospital',
  'Birat Medical College',
  'Path Bhavan',
  'Techno India University',
  'Shyam Steel',
  'Saburi Plywood',
  'GM Group',
  'Omacme',
  'Acasa by Malani Group',
  'Azurre Surfaces',
  'Waterworks',
  'Premier Wires',
  'Kreamz',
] as const;

export const CITIES = [
  { slug: 'kolkata', name: 'Kolkata', country: 'India' },
  { slug: 'bhubaneswar', name: 'Bhubaneswar', country: 'India' },
  { slug: 'ranchi', name: 'Ranchi', country: 'India' },
  { slug: 'rourkela', name: 'Rourkela', country: 'India' },
  { slug: 'siliguri', name: 'Siliguri', country: 'India' },
  { slug: 'guwahati', name: 'Guwahati', country: 'India' },
  { slug: 'noida', name: 'Noida', country: 'India' },
  { slug: 'kathmandu', name: 'Kathmandu', country: 'Nepal' },
  { slug: 'biratnagar', name: 'Biratnagar', country: 'Nepal' },
] as const;

/**
 * Pincode-serviceability zones. Each city has:
 *   - `core` — pincode prefixes (first 3 digits) where Uniwater has a
 *     local team and routine 48-hour survey response;
 *   - `nearby` — pincode prefixes within driving range of the local team
 *     where we can extend service with a 5-7 day survey window.
 *
 * Anything outside these prefixes is "remote" — the visitor is routed
 * to /remote-site-survey for the by-correspondence funnel.
 *
 * Indian pincodes are 6 digits; the first 3 identify the postal zone
 * which is roughly city + immediate surroundings. Nepal pincodes are
 * 5 digits; we match the first 2 ("44" for Kathmandu valley, "56" for
 * the eastern Terai including Biratnagar).
 *
 * Sources: India Post zone codes + Uniwater operational coverage.
 * Some "nearby" assignments are aspirational pre-launch — verify with
 * the local service team before launching the pincode UI.
 */
export interface PincodeZone {
  citySlug: string;
  cityName: string;
  country: 'India' | 'Nepal';
  /** First-3 (India) or first-2 (Nepal) digits of pincode that count as in-city. */
  core: string[];
  /** Prefixes within driving range. Survey within 5-7 days. */
  nearby: string[];
  /** Plain-language description of the nearby area for the UI. */
  nearbyLabel: string;
}

export const PINCODE_ZONES: PincodeZone[] = [
  {
    citySlug: 'noida', cityName: 'Noida', country: 'India',
    // 201 covers Noida, Greater Noida, and Ghaziabad — all within the local team's reach.
    core: ['201'],
    // Delhi (110), Faridabad (121), Gurgaon/Gurugram (122) — Delhi-NCR corridor.
    nearby: ['110', '121', '122'],
    nearbyLabel: 'Delhi, Gurugram, Faridabad, Ghaziabad corridor',
  },
  {
    citySlug: 'kolkata', cityName: 'Kolkata', country: 'India',
    core: ['700'],
    nearby: ['711', '712', '713', '741', '743'],
    nearbyLabel: 'Howrah, Hooghly, Nadia, North 24 Parganas',
  },
  {
    citySlug: 'bhubaneswar', cityName: 'Bhubaneswar', country: 'India',
    core: ['751'],
    nearby: ['752', '753', '754'],
    nearbyLabel: 'Khurda, Cuttack, Puri, Jajpur',
  },
  {
    citySlug: 'ranchi', cityName: 'Ranchi', country: 'India',
    core: ['834'],
    nearby: ['835', '829', '828', '825'],
    nearbyLabel: 'Khunti, Ramgarh, Bokaro, Dhanbad',
  },
  {
    citySlug: 'rourkela', cityName: 'Rourkela', country: 'India',
    core: ['769'],
    nearby: ['770', '768'],
    nearbyLabel: 'Sundergarh, Sambalpur, Jharsuguda',
  },
  {
    citySlug: 'siliguri', cityName: 'Siliguri', country: 'India',
    core: ['734'],
    nearby: ['735', '736', '733'],
    nearbyLabel: 'Jalpaiguri, Cooch Behar, North Dinajpur, Darjeeling',
  },
  {
    citySlug: 'guwahati', cityName: 'Guwahati', country: 'India',
    core: ['781'],
    nearby: ['782', '783', '784'],
    nearbyLabel: 'Kamrup Rural, Nalbari, Barpeta, Mangaldoi',
  },
  {
    citySlug: 'kathmandu', cityName: 'Kathmandu', country: 'Nepal',
    core: ['44'],
    nearby: ['45'],
    nearbyLabel: 'Bhaktapur, Lalitpur, Bharatpur',
  },
  {
    citySlug: 'biratnagar', cityName: 'Biratnagar', country: 'Nepal',
    core: ['56'],
    nearby: ['57'],
    nearbyLabel: 'Itahari, Dharan, Damak',
  },
];

/**
 * Match a pincode against our service zones.
 * Returns 'core' if the city has a local team, 'nearby' if within reach,
 * or null if remote-survey territory.
 */
export type PincodeMatch = {
  status: 'core' | 'nearby';
  zone: PincodeZone;
} | null;

export function matchPincode(raw: string): PincodeMatch {
  const cleaned = raw.replace(/\s+/g, '').trim();
  if (!cleaned) return null;
  for (const zone of PINCODE_ZONES) {
    const isIndia = zone.country === 'India';
    const len = isIndia ? 3 : 2;
    const prefix = cleaned.slice(0, len);
    if (zone.core.includes(prefix)) return { status: 'core', zone };
    if (zone.nearby.includes(prefix)) return { status: 'nearby', zone };
  }
  return null;
}

// Per Blueprint §2 — the five operational truths every page must answer at least one of.
export const OPERATIONAL_TRUTHS = [
  'We survey before we sell.',
  'We engineer, we don\u2019t retail.',
  'We hide what doesn\u2019t need to be seen.',
  'We come back every month.',
  'We have done this for real, at scale.',
] as const;

// Three claims — Blueprint §3.2 of Strategy.
export const THREE_CLAIMS = [
  {
    label: 'Engineered, not bought off a shelf.',
    body:
      'Every UNIWATER system starts from a survey of your actual water, pressure, usage, and space. Catalogue sizes are starting points, not the sale.',
  },
  {
    label: 'Hidden, not displayed.',
    body:
      'Equipment goes in false ceilings, plumbing shafts, behind cabinets, below counters, or outside windows \u2014 wherever it disappears.',
  },
  {
    label: 'Serviced monthly, not on complaint.',
    body:
      'An engineer visits every month for the life of the contract. Automation handles routine cycles; humans handle inspection, calibration, and the unexpected.',
  },
] as const;

// Component manufacturers — Blueprint §8, used in tech-spec accordions.
export const COMPONENT_MANUFACTURERS = [
  'Wilo',
  'Grundfos',
  'ResinTech',
  'Katalox',
  'Hydranautics',
  'Dow',
  'LG Chem',
  'Tulsion',
  'Ionex',
] as const;

// Stats — Blueprint §6 (Strategy doc verified facts).
export const STATS = {
  homesServiced: '200+',
  yearsOperating: '3+',
  citiesIndia: 7,
  citiesNepal: 2,
  citiesTotal: 9,
  founded: 2020,
  skus: 110,
  installations: '100+',
} as const;

/**
 * Surveys booked in the last 12 months. Rolling annual total — refresh
 * once a quarter from the Odoo CRM dashboard (drift of a few weeks is
 * fine, drift of a year is not). Per §6.2 marketing benchmark — Tier-2
 * social-proof anchor that doesn't decay between monthly updates the way
 * "surveys this month" would.
 */
export const SURVEYS_BOOKED_TRAILING_12M = 1200;

/**
 * Indicative entry price for systems, shown in the hero. Catalogue prices
 * vary by survey; this is the bathroom-filter (BathSoft Mono) starting band,
 * the most common residential entry point.
 */
export const SYSTEM_STARTS_FROM_INR = 14_000;

/**
 * Hero video path. Set to a `/videos/…` path once the 30-second hero film is
 * delivered; until then the hero falls back to the static photograph.
 */
export const HERO_VIDEO_SRC: string | null = null;

/**
 * Downloadable catalogues — served from /public/downloads as static PDFs.
 * No gating, no email capture: premium-brand positioning treats the
 * catalogue as a brochure, not a lead magnet.
 */
export interface CatalogueRef {
  /** Slug used in URLs and as a stable identifier. */
  slug: 'homeowner' | 'commercial';
  /** Display title on the download card. */
  title: string;
  /** One-line description shown beneath the title. */
  description: string;
  /** Path served from /public — direct HTTP link. */
  href: string;
  /** Indicative size for the download — set after upload. */
  sizeMB: number;
  /** Year label so visitors know they're getting the current edition. */
  edition: string;
}

export const CATALOGUES: CatalogueRef[] = [
  {
    slug: 'homeowner',
    title: 'Homeowner catalogue',
    description:
      'BathSoft bathroom filters, HomeSoft whole-house systems, drinking water. Sizing, materials, install patterns.',
    href: '/downloads/uniwater-homeowner-catalogue-2026.pdf',
    sizeMB: 18,
    edition: '2026 edition',
  },
  {
    slug: 'commercial',
    title: 'Commercial catalogue',
    description:
      'Industrial RO, DM plants, building WTPs from 8K to 50K LPH. Capacity ladders, BOM, technical edge.',
    href: '/downloads/uniwater-commercial-catalogue-2026.pdf',
    sizeMB: 7,
    edition: '2026 edition',
  },
];
