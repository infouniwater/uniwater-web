/**
 * Feature-image mapping for blog posts. Lives outside the content data so the
 * BlogPost shape stays clean (slug, title, body…) and editorial work can
 * progress without art being locked in.
 *
 * Each slug maps to an existing photograph in /public chosen to match the
 * piece's subject matter. When a real, commissioned feature image arrives,
 * replace the entry here — no call-site changes needed.
 */

const PHOTO = '/images/photography';

export interface BlogFeatureImage {
  src: string;
  alt: string;
}

const FEATURE_BY_SLUG: Record<string, BlogFeatureImage> = {
  'borewell-water-yellow': {
    src: `${PHOTO}/scaling-on-taps.jpg`,
    alt: 'Iron and scale residue on a chrome bathroom tap, the visible mark of untreated borewell water',
  },
  'iron-hardness-order': {
    src: `${PHOTO}/scaling-inside-geyser.jpg`,
    alt: 'Heavy white scale on a geyser heating element, left by hardness and iron treated in the wrong order',
  },
  'hansgrohe-spec-vs-indian-water': {
    src: `${PHOTO}/bathroom-filter-floor-mounted.jpg`,
    alt: 'A chrome tap in a finished bathroom, the kind of fitting that needs the water spec checked before the install',
  },
  'how-to-read-a-water-test': {
    src: `${PHOTO}/service-testing-water.jpg`,
    alt: 'Uniwater engineer drawing a water sample at the kitchen tap during the on-site test',
  },
  'soft-water-vs-salt-water': {
    src: `${PHOTO}/bathroom-filter-under-basin.jpg`,
    alt: 'A finished bathroom vanity. Soft water changes how a shower feels on skin and hair',
  },
  'tds-isnt-a-quality-metric': {
    src: `${PHOTO}/service-testing-water.jpg`,
    alt: 'A water analysis in progress. TDS is one number on a much longer test report',
  },
  'five-year-cost-of-doing-nothing': {
    src: `${PHOTO}/geyser-scaling.jpg`,
    alt: 'Cumulative scale damage inside a geyser after years on untreated hard water',
  },
  'whole-house-vs-point-of-use': {
    src: `${PHOTO}/whole-house-hero.jpg`,
    alt: 'A HomeSoft whole-house system installed inside a finished home, vessels integrated into the corner',
  },
  'inside-your-monthly-service-report': {
    src: `${PHOTO}/service-checkups.jpg`,
    alt: 'Uniwater engineer reviewing the monthly service checklist at a customer system',
  },
  'amc-tiers-honestly': {
    src: `${PHOTO}/service-installing.jpg`,
    alt: 'A Uniwater engineer at work. The same team looks after the system for the life of the contract',
  },
  'remineralisation-after-ro': {
    src: `${PHOTO}/drinking-water-home.jpg`,
    alt: 'A glass of re-mineralised Uniwater drinking water on a marble kitchen counter',
  },
  'premium-fittings-slow-disaster': {
    src: `${PHOTO}/bathroom-filter-hero.jpg`,
    alt: 'A marble bathroom with brass and chrome fittings, the kind that ages badly when the water isn’t treated',
  },
  'can-hard-water-cause-hair-fall': {
    src: `${PHOTO}/hairfall.jpg`,
    alt: 'Wet hair after a shower. Hard, iron-rich water shows up here first, as roughness and breakage',
  },
  'best-water-treatment-company-kolkata': {
    src: `${PHOTO}/residential-complex.jpg`,
    alt: 'A residential apartment complex in Kolkata, the kind of building one inlet water plant can serve',
  },
};

const FALLBACK: BlogFeatureImage = {
  src: `${PHOTO}/service-testing-water.jpg`,
  alt: 'Uniwater engineer at a customer home during the on-site water test',
};

export function featureImageFor(slug: string): BlogFeatureImage {
  return FEATURE_BY_SLUG[slug] ?? FALLBACK;
}
