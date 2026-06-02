/**
 * Per-locality water-quality dataset, keyed by city slug.
 *
 * Rendered by <CityWaterTable> on each /cities/[slug] page. The component
 * renders ONLY localities that have data — a city with an empty array shows
 * no table at all (no empty shell).
 *
 * IMPORTANT — data honesty:
 *   Only Kolkata is seeded, and every Kolkata row is marked `verified: false`
 *   with INDICATIVE ranges. These are not authoritative survey figures; they
 *   are illustrative bands consistent with the city water-context copy
 *   (central Kolkata = treated municipal, EM-Bypass / Salt Lake suburbs =
 *   borewell augmentation). The other eight cities are deliberately stubbed
 *   as empty arrays until real survey figures land.
 *
 *   For borewell-fed localities the dominant issue foregrounds IRON staining
 *   (yellow/orange stains, metallic taste) — the lived, visible problem — not
 *   arsenic, which is a testing matter handled at survey.
 */

export interface LocalityWaterData {
  /** Locality name — must match a name already listed in content/cities.ts. */
  area: string;
  /** Total hardness as CaCO3, ppm — [min, max]. */
  hardnessPpm: [number, number];
  /** Dissolved iron, ppm — [min, max]. */
  ironPpm: [number, number];
  /** Total dissolved solids, ppm — [min, max]. */
  tdsPpm: [number, number];
  /** The lived, visible problem this locality reports most. */
  dominantIssue: string;
  /** The system Uniwater most often specifies here. */
  typicalSystem: string;
  /** False until replaced with figures confirmed by on-site survey. */
  verified: boolean;
}

// TODO(Rajat): replace with real survey figures. All Kolkata values below are
// INDICATIVE bands only (verified: false) — do not cite as authoritative.
const KOLKATA: LocalityWaterData[] = [
  {
    area: 'Ballygunge',
    hardnessPpm: [120, 220],
    ironPpm: [0.1, 0.3],
    tdsPpm: [180, 350],
    dominantIssue: 'Scale on fittings and geyser elements; moderate hardness on treated supply.',
    typicalSystem: 'BathSoft at the bathroom feed; HomeSoft where the whole house is in scope.',
    verified: false,
  },
  {
    area: 'Alipore',
    hardnessPpm: [120, 220],
    ironPpm: [0.1, 0.3],
    tdsPpm: [180, 340],
    dominantIssue: 'Hardness scale on premium fittings; taste and chlorine residual at the kitchen.',
    typicalSystem: 'HomeSoft for the house; kitchen UF + UV or RO decided by a TDS test.',
    verified: false,
  },
  {
    area: 'Park Street',
    hardnessPpm: [110, 200],
    ironPpm: [0.1, 0.2],
    tdsPpm: [170, 320],
    dominantIssue: 'Largely treated municipal — moderate hardness, low iron, chlorine taste.',
    typicalSystem: 'BathSoft for the bathroom; drinking-water UF + UV at the kitchen tap.',
    verified: false,
  },
  {
    area: 'Salt Lake',
    hardnessPpm: [250, 450],
    ironPpm: [0.8, 2.5],
    tdsPpm: [350, 650],
    dominantIssue: 'Yellow/orange iron staining on basins and tiles; metallic taste from borewell augmentation.',
    typicalSystem: 'Iron pre-treatment upstream, then HomeSoft softening — iron removed before it reaches the resin.',
    verified: false,
  },
  {
    area: 'New Town',
    hardnessPpm: [250, 450],
    ironPpm: [1.0, 3.0],
    tdsPpm: [350, 700],
    dominantIssue: 'Iron staining and metallic taste on borewell-fed supply; scale on top of it.',
    typicalSystem: 'Iron filter ahead of a HomeSoft four-stage train; kitchen RO where TDS runs high.',
    verified: false,
  },
  {
    area: 'Rajarhat',
    hardnessPpm: [250, 480],
    ironPpm: [1.0, 3.0],
    tdsPpm: [380, 720],
    dominantIssue: 'Borewell iron staining (yellow/orange) and metallic taste; hardness compounds it.',
    typicalSystem: 'Iron pre-treatment, then softening; RO at the drinking tap on a TDS call.',
    verified: false,
  },
  {
    area: 'Lake Town',
    hardnessPpm: [200, 380],
    ironPpm: [0.5, 1.8],
    tdsPpm: [300, 560],
    dominantIssue: 'Mixed supply — iron staining where borewell augments municipal; hardness throughout.',
    typicalSystem: 'HomeSoft with iron pre-treatment when the borewell is in the mix.',
    verified: false,
  },
  {
    area: 'Tollygunge',
    hardnessPpm: [150, 280],
    ironPpm: [0.2, 0.6],
    tdsPpm: [220, 420],
    dominantIssue: 'Moderate hardness scale; occasional iron where older boreholes feed in.',
    typicalSystem: 'HomeSoft softening; iron pre-treatment only where a borehole is present.',
    verified: false,
  },
  {
    area: 'Behala',
    hardnessPpm: [180, 350],
    ironPpm: [0.4, 1.5],
    tdsPpm: [260, 500],
    dominantIssue: 'Iron staining on borewell-fed stretches; hardness scale on fittings.',
    typicalSystem: 'Iron filter then HomeSoft; sized at survey to the borehole chemistry.',
    verified: false,
  },
  {
    area: 'Hindustan Park',
    hardnessPpm: [120, 220],
    ironPpm: [0.1, 0.3],
    tdsPpm: [180, 340],
    dominantIssue: 'Treated municipal — moderate hardness, low iron, chlorine taste at the tap.',
    typicalSystem: 'BathSoft at the bathroom; drinking-water UF + UV at the kitchen.',
    verified: false,
  },
];

/**
 * City-water data keyed by city slug. Empty arrays are intentional — those
 * cities render no table until real figures are surveyed in.
 */
export const CITY_WATER_DATA: Record<string, LocalityWaterData[]> = {
  kolkata: KOLKATA,
  bhubaneswar: [],
  ranchi: [],
  rourkela: [],
  siliguri: [],
  guwahati: [],
  noida: [],
  kathmandu: [],
  biratnagar: [],
};

/** ppm range → display string, e.g. "120–220 ppm". Collapses equal bounds. */
export function formatPpmRange([min, max]: [number, number]): string {
  const body = min === max ? `${min}` : `${min}–${max}`;
  return `${body} ppm`;
}
