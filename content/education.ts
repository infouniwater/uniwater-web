/**
 * Educational modules drawn directly from the 2026 Homeowner Catalogue.
 * Per Blueprint §16 Sprint 0 — embed in /water-problem-checker result and as teaching blocks.
 */

export const HARDNESS_BANDS = [
  {
    band: 'Soft',
    range: 'under 60 ppm',
    sources: 'Rainwater. Coastal supply. Some surface water.',
    consequence: 'Minerals negligible. Scale isn\u2019t a problem.',
  },
  {
    band: 'Moderately hard',
    range: '60\u2013120 ppm',
    sources: 'Treated municipal supply. Surface-water-fed lines.',
    consequence: 'Mild scale forms over time. Visible in geysers and kettles.',
  },
  {
    band: 'Hard',
    range: '120\u2013180 ppm',
    sources: 'Mixed supply. Some borewell, some municipal.',
    consequence: 'Scale forms steadily. Soap doesn\u2019t lather. Skin feels it.',
  },
  {
    band: 'Very hard',
    range: 'over 180 ppm',
    sources: 'Borewells. Untreated ground sources.',
    consequence: 'Heavy scale. Iron often present. Appliances fail early.',
  },
] as const;

export const TDS_DECISION_TREE = [
  {
    range: 'below 200 ppm',
    answer: 'UF + UV',
    description: 'Ultrafiltration with UV. Natural minerals stay. Pathogens go.',
    source: 'Treated municipal supply. Surface-water-fed lines.',
  },
  {
    range: '200\u2013500 ppm',
    answer: 'Test & consult',
    description: 'Borderline range. Hardness, iron, and use case decide RO vs UF.',
    source: 'A water test takes ten minutes and answers the question.',
  },
  {
    range: 'above 500 ppm',
    answer: 'RO',
    description: 'Reverse osmosis with post-RO mineral correction. Re-mineralised. Doesn\u2019t taste flat.',
    source: 'Borewells. Untreated ground sources.',
  },
] as const;

export const THREE_FORCES = [
  {
    reason: '01',
    title: 'It\u2019s chemistry.',
    body: '200\u20131500 ppm TDS. 60\u2013400 ppm hardness. Iron from borewells.',
  },
  {
    reason: '02',
    title: 'It\u2019s the people who use it.',
    body: 'Hard water dries skin, dulls hair, stains kurtas.',
  },
  {
    reason: '03',
    title: 'It\u2019s everything water touches.',
    body: 'Geysers lose efficiency. Washing machines fail early. CP fittings dull. Glass hazes.',
  },
] as const;

export const FIVE_PLACES = [
  {
    location: 'False ceiling',
    description: 'Above the bathroom, hidden in service void.',
  },
  {
    location: 'Hidden niche',
    description: 'Recessed behind tile or shower glass \u2014 part of the bathroom, not on it.',
  },
  {
    location: 'Wall cabinet',
    description: 'In a service cabinet flush with the wall, behind a finish door.',
  },
  {
    location: 'Under-counter',
    description: 'In the vanity cabinet, beside the trap.',
  },
  {
    location: 'Utility room',
    description: 'For whole-house systems \u2014 plant area or garden corner.',
  },
] as const;

// Five places a whole-house (HomeSoft) system commonly goes. Drives the
// "Where it goes" section on /solutions/whole-house-water-filter. The
// system itself is the same; these are the install contexts.
export const HOMESOFT_PLACES = [
  {
    location: 'Utility room',
    description: 'Indoor controlled environment. Service access on day one.',
  },
  {
    location: 'Balcony',
    description: 'Behind a service door or cabinet. Apartment installs where there is no utility area.',
  },
  {
    location: 'Terrace',
    description: 'Gravity-feed from the OHT. Weather hood + drain provisioned at survey.',
  },
  {
    location: 'Basement',
    description: 'Villa plant rooms. Full four-stage train + sump-pit backwash routing.',
  },
  {
    location: 'Custom cabinet',
    description: 'Joinery-grade enclosure designed with the architect — the plant fits the house.',
  },
] as const;

// Three physical locations a drinking-water system (kitchen RO / UF+UV /
// centralised) commonly goes. Drives the "Where it goes" section on
// /solutions/drinking-water-solution. Drinking water has its own logic:
// unlike bathroom (5 hidden places) or whole-house (5 plant-room
// locations), a drinking-water system lives at the kitchen tap or at a
// centralised plant — three is the real count, not five.
export const DRINKING_PLACES = [
  {
    location: 'Wall-mounted, kitchen counter',
    description: 'Beside the kitchen sink, on the wall above the platform. Visible by design — the dedicated tap sits next to the sink mixer.',
  },
  {
    location: 'Under the sink',
    description: 'Hidden inside the sink cabinet, plumbed to a dedicated counter-top tap. The choice for finished kitchens where joinery rules the look.',
  },
  {
    location: 'Centralised plant room',
    description: 'For villas, offices, schools, clinics. One plant, drinking-quality at every tap on a dedicated line. 25 / 50 / 100 LPH.',
  },
] as const;

export const HOMESOFT_STAGES = [
  {
    stage: '01',
    name: 'Sediment',
    body: 'Removes particulate. Protects everything downstream.',
  },
  {
    stage: '02',
    name: 'Iron',
    body: 'Oxidation and media filtration. Critical for borewell-fed homes.',
  },
  {
    stage: '03',
    name: 'Carbon',
    body: 'Removes residual chlorine and the summer chemical taste.',
  },
  {
    stage: '04',
    name: 'Softening',
    body: 'Ion exchange removes calcium and magnesium. The decisive stage.',
  },
] as const;

export const FOUR_STEPS = [
  {
    n: '01',
    title: 'Survey.',
    body:
      'An engineer visits, tests the water, and maps plumbing, pressure, and space — no quote until this is done.',
  },
  {
    n: '02',
    title: 'Design.',
    body:
      'Your system is configured from a library of 100+ engineered options \u2014 the right capacity, the right media, the right vessel grade for your water and your home.',
  },
  {
    n: '03',
    title: 'Install.',
    body:
      'Equipment goes in false ceilings, plumbing shafts, behind cabinets, under counters, or outside windows \u2014 wherever it disappears.',
  },
  {
    n: '04',
    title: 'Service.',
    body:
      'An engineer visits monthly to inspect, clean, and verify the system is working \u2014 not just when something breaks.',
  },
] as const;
