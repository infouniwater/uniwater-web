/**
 * Photo registry — maps `assetRef` identifiers from the <Photo> component to
 * real images already present in /public. Lets us render real photography
 * everywhere a Blueprint-spec photo slot lives, falling back to the labelled
 * placeholder only when nothing relevant has been shot or sourced yet.
 *
 * Patterns first, exact matches second. Order matters within PATTERN_RULES —
 * more specific rules (e.g. `city-*-install-N`) must come before broader ones
 * (e.g. `*-install-N`).
 *
 * When real, slot-specific photography lands, prefer either:
 *   - replacing the assetRef-keyed entry below, or
 *   - passing imgSrc/imgAlt directly at the call site (which short-circuits
 *     this lookup entirely).
 */

const PHOTO = '/images/photography';
const INSTALLS = '/images/installs';

export interface PhotoAsset {
  src: string;
  alt: string;
}

const INSTALL_CYCLE: PhotoAsset[] = [
  { src: `${INSTALLS}/false-ceiling-01.jpg`, alt: 'Uniwater system installed in a false ceiling void' },
  { src: `${INSTALLS}/plumbing-shaft-01.jpg`, alt: 'Uniwater system installed inside the plumbing shaft' },
  { src: `${INSTALLS}/under-counter-01.jpg`, alt: 'Uniwater unit installed under the counter' },
  { src: `${INSTALLS}/utility-room-01.jpg`, alt: 'Uniwater system in the utility room' },
  { src: `${INSTALLS}/wall-recess-01.jpg`, alt: 'Uniwater system in a wall recess' },
  { src: `${INSTALLS}/hero-duo-iron-softener-ss316.jpg`, alt: 'Uniwater iron filter and softener duo in SS316 stainless steel vessels' },
  { src: `${PHOTO}/whole-house-luxury-villa.jpg`, alt: 'Uniwater whole-house system installed at a luxury villa' },
  { src: `${PHOTO}/whole-house-utility-area.jpg`, alt: 'Uniwater whole-house system in the utility area' },
];

const SOLUTION_INSTALL_CYCLE: PhotoAsset[] = [
  { src: `${PHOTO}/bathroom-filter-ceiling-installation.jpg`, alt: 'Bathroom filter installed in the false ceiling' },
  { src: `${PHOTO}/bathroom-filter-wall-cabinet.jpg`, alt: 'Bathroom filter inside a wall cabinet' },
  { src: `${PHOTO}/bathroom-filter-floor-mounted.jpg`, alt: 'Bathroom filter floor-mounted in a finished bathroom corner' },
  { src: `${PHOTO}/bathroom-filter-under-basin.jpg`, alt: 'Bathroom filter installed under the vanity counter' },
  { src: `${PHOTO}/whole-house-utility-area.jpg`, alt: 'Whole-house system in the utility area' },
];

/** Representative photo for each solution slug — used by hub cards, residential
 *  page cards, and the related-solutions cards on each solution detail page.
 *  Each entry must point at a DIFFERENT photo: hub / residential grids render
 *  all three side-by-side, so identical photos would visibly repeat. The four
 *  legacy entries (iron / softener / sediment / carbon) were dropped on
 *  2026-06-03 along with the standalone pages. */
const SOLUTION_PHOTO: Record<string, PhotoAsset> = {
  'bathroom-filter': {
    src: `${PHOTO}/bathroom-filter-hero.jpg`,
    alt: 'BathSoft bathroom filter installed in a marble luxury bathroom',
  },
  'whole-house-water-filter': {
    src: `${PHOTO}/whole-house-hero.jpg`,
    alt: 'HomeSoft whole-house water filter installed in a finished home',
  },
  'drinking-water-solution': {
    src: `${PHOTO}/drinking-water-home.jpg`,
    alt: 'Glass of Uniwater drinking water at the kitchen counter',
  },
};

const FALLBACK_SOLUTION_PHOTO: PhotoAsset = {
  src: `${PHOTO}/whole-house-hero.jpg`,
  alt: 'A Uniwater system installed in a finished home',
};

/** Per-case-study card photo for the /case-studies index grid. Each entry
 *  must be DISTINCT — all six cards render on one page, and the previous
 *  behaviour (every card falling back to hero-duo-iron-softener-ss316.jpg
 *  because of the generic case-[slug]$ rule) made the grid read as the
 *  same photograph six times. Kept in sync with the STUDY_PHOTO map in
 *  /testimonials so both pages show the same image per case study. */
const CASE_STUDY_PHOTO: Record<string, PhotoAsset> = {
  'charnock-hospital': {
    src: `${PHOTO}/commercial-ro-rooftop-enclosure.jpg`,
    alt: 'Uniwater commercial RO plant in a rooftop enclosure at a hospital',
  },
  'birat-medical-college': {
    src: `${PHOTO}/commercial-ro-industrial-shed.jpg`,
    alt: 'Uniwater commercial RO and softening plant at a teaching hospital',
  },
  'shyam-steel': {
    src: `${PHOTO}/commercial-ro-warehouse.jpg`,
    alt: 'Uniwater commercial RO plant inside a manufacturing warehouse',
  },
  'saburi-plywood': {
    src: `${INSTALLS}/hero-duo-iron-softener-ss316.jpg`,
    alt: 'Uniwater iron filter and softener duo in SS316 vessels at a manufacturing site',
  },
  'acasa-by-malani': {
    src: `${PHOTO}/whole-house-luxury-villa.jpg`,
    alt: 'Uniwater whole-house plant against a finished joinery wall at a luxury residence',
  },
  'gm-group': {
    src: `${PHOTO}/wtp-basement.jpg`,
    alt: 'Uniwater water-treatment plant in the basement plant room at a manufacturing facility',
  },
};

const EXACT_MAP: Record<string, PhotoAsset> = {
  'tool-checker': {
    src: `${PHOTO}/service-testing-water.jpg`,
    alt: 'Uniwater engineer testing water parameters at the kitchen tap',
  },
  'tool-remote': {
    src: `${PHOTO}/service-checkups.jpg`,
    alt: 'Uniwater engineer reviewing a service checklist at the system',
  },
  'for-plumbers-hero': {
    src: `${INSTALLS}/utility-room-01.jpg`,
    alt: 'Uniwater system installed in a customer utility room — the kind of finish trade partners help deliver',
  },
  'for-architects-hero': {
    src: `${PHOTO}/bathroom-filter-ceiling-installation.jpg`,
    alt: 'Bathroom filter integrated into a false ceiling — the kind of architectural integration Uniwater delivers',
  },
  'residential-hero': {
    src: `${PHOTO}/whole-house-luxury-villa.jpg`,
    alt: 'A premium Indian villa with a Uniwater whole-house system installed',
  },
  'book-survey-aside': {
    src: `${PHOTO}/service-testing-water.jpg`,
    alt: 'Uniwater engineer at a customer home, taking a water sample at the kitchen tap',
  },
  'founder-portrait': {
    src: `${PHOTO}/service-installing.jpg`,
    alt: 'A Uniwater engineer at work — the team that owns the system end to end',
  },
  'team-office': {
    src: `${PHOTO}/service-checkups.jpg`,
    alt: 'The Uniwater service team on a monthly check-up visit',
  },
};

interface PatternRule {
  test: RegExp;
  resolve: (match: RegExpMatchArray) => PhotoAsset;
}

const pick = <T,>(arr: T[], i: number): T => arr[(i - 1 + arr.length * 10000) % arr.length];

const PATTERN_RULES: PatternRule[] = [
  // How-it-works stages — survey/design/install/service
  {
    test: /^how-stage-01-/,
    resolve: () => ({ src: `${PHOTO}/service-testing-water.jpg`, alt: 'Uniwater engineer taking a water sample on the first survey visit' }),
  },
  {
    test: /^how-stage-02-/,
    resolve: () => ({ src: `${PHOTO}/service-checkups.jpg`, alt: 'Uniwater engineer reviewing the system design on a clipboard' }),
  },
  {
    test: /^how-stage-03-/,
    resolve: () => ({ src: `${PHOTO}/service-installing.jpg`, alt: 'Uniwater engineer installing a system at a customer home' }),
  },
  {
    test: /^how-stage-04-/,
    resolve: () => ({ src: `${PHOTO}/service-testing-pressure.jpg`, alt: 'Uniwater engineer checking pressure during the monthly service visit' }),
  },

  // City pages — specific suffixes before generic ones
  {
    test: /^city-[a-z0-9-]+-install-(\d+)$/,
    resolve: (m) => pick(INSTALL_CYCLE, parseInt(m[1], 10)),
  },
  {
    test: /^city-[a-z0-9-]+-team$/,
    resolve: () => ({ src: `${PHOTO}/service-checkups.jpg`, alt: 'The Uniwater local service team at a monthly visit' }),
  },
  {
    test: /^city-[a-z0-9-]+-hero$/,
    resolve: () => ({ src: `${PHOTO}/residential-complex.jpg`, alt: 'A premium residential context — the kind of homes Uniwater serves in this city' }),
  },

  // Case studies — install numbered photos, hero, then index card (most generic)
  {
    test: /^case-[a-z0-9-]+-hero$/,
    resolve: () => ({ src: `${PHOTO}/commercial-ro-industrial-shed.jpg`, alt: 'A Uniwater commercial RO and softening plant — representative install' }),
  },
  {
    test: /^case-[a-z0-9-]+-(\d+)$/,
    resolve: (m) => pick(INSTALL_CYCLE, parseInt(m[1], 10)),
  },
  {
    // case-<slug> for the /case-studies index grid. Look up in
    // CASE_STUDY_PHOTO so each card renders a distinct photo;
    // fall back to the generic representative install only when the
    // slug is unknown (e.g. a new case study just landed and the
    // map hasn't been updated yet).
    test: /^case-([a-z0-9-]+)$/,
    resolve: (m) =>
      CASE_STUDY_PHOTO[m[1]] ?? {
        src: `${INSTALLS}/hero-duo-iron-softener-ss316.jpg`,
        alt: 'A representative Uniwater commercial install',
      },
  },

  // Residential page — real installs gallery
  {
    test: /^real-install-(\d+)$/,
    resolve: (m) => pick(INSTALL_CYCLE, parseInt(m[1], 10)),
  },

  // Solution detail template — hero fallback (most solutions have explicit hero photos already)
  {
    test: /^solution-([a-z0-9-]+)-hero$/,
    resolve: (m) => SOLUTION_PHOTO[m[1]] ?? FALLBACK_SOLUTION_PHOTO,
  },

  // Related-solutions cards on solution detail pages
  {
    test: /^solution-([a-z0-9-]+)-related$/,
    resolve: (m) => SOLUTION_PHOTO[m[1]] ?? FALLBACK_SOLUTION_PHOTO,
  },

  // Solutions index ("hub") cards
  {
    test: /^hub-([a-z0-9-]+)$/,
    resolve: (m) => SOLUTION_PHOTO[m[1]] ?? FALLBACK_SOLUTION_PHOTO,
  },

  // Residential page — solution cards
  {
    test: /^residential-([a-z0-9-]+)$/,
    resolve: (m) => SOLUTION_PHOTO[m[1]] ?? FALLBACK_SOLUTION_PHOTO,
  },

  // Solution detail template — real installs (slug-real-install-N)
  {
    test: /^[a-z0-9-]+-real-install-(\d+)$/,
    resolve: (m) => pick(INSTALL_CYCLE, parseInt(m[1], 10)),
  },

  // Solution detail template — "where it goes" install cards (slug-install-N)
  {
    test: /^[a-z0-9-]+-install-(\d+)$/,
    resolve: (m) => pick(SOLUTION_INSTALL_CYCLE, parseInt(m[1], 10)),
  },
];

export function resolvePhoto(assetRef?: string): PhotoAsset | null {
  if (!assetRef) return null;
  if (EXACT_MAP[assetRef]) return EXACT_MAP[assetRef];
  for (const rule of PATTERN_RULES) {
    const m = assetRef.match(rule.test);
    if (m) return rule.resolve(m);
  }
  return null;
}
