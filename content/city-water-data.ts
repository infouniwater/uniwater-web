/**
 * Per-locality water-quality dataset, keyed by city slug.
 *
 * Rendered by <CityWaterTable> on each /cities/[slug] page. The component
 * renders ONLY localities that have data — a city with an empty array shows
 * no table at all (no empty shell).
 *
 * IMPORTANT — data honesty:
 *   EVERY row is `verified: false` — these are INDICATIVE ranges, not
 *   address-level survey figures. Kolkata bands come from Uniwater field
 *   experience; the other eight cities are seeded from published regional
 *   groundwater studies (CGWB / peer-reviewed water-quality papers), cited in
 *   a comment above each city's block. Groundwater varies borehole to
 *   borehole, so the table is a "what to expect" guide — the number that
 *   sizes a system is the one taken on site. The rendered note says exactly
 *   this, and no row claims to be a confirmed Uniwater measurement.
 *
 *   For borewell-fed localities the dominant issue foregrounds IRON staining
 *   (yellow/orange stains, metallic taste) — the lived, visible problem — not
 *   arsenic, which is a testing matter handled at survey.
 *
 *   TODO(Rajat): replace any city's indicative block with real on-site survey
 *   figures as they accumulate, and flip those rows to `verified: true`.
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

// Bhubaneswar — indicative, verified:false. Published studies report total
// hardness ~311–450+ mg/L, TDS often >1000 mg/L in pockets, and Fe 0.028–1.6
// mg/L (locally >0.3). Source: "Groundwater Quality, Hydrogeochemical
// Characteristics and Health Risk, Bhubaneswar City" (2023) + Odisha WQI studies.
const BHUBANESWAR: LocalityWaterData[] = [
  { area: 'Patia', hardnessPpm: [200, 400], ironPpm: [0.4, 1.6], tdsPpm: [400, 1000], dominantIssue: 'Borewell iron staining and hardness scale; TDS runs high in pockets.', typicalSystem: 'Iron pre-treatment, then HomeSoft softening; kitchen RO on a TDS test.', verified: false },
  { area: 'Chandrasekharpur', hardnessPpm: [200, 400], ironPpm: [0.3, 1.2], tdsPpm: [400, 900], dominantIssue: 'Hardness scale with localised iron on borewell-fed supply.', typicalSystem: 'HomeSoft softening with iron pre-treatment where a borehole feeds in.', verified: false },
  { area: 'Jaydev Vihar', hardnessPpm: [200, 450], ironPpm: [0.2, 1.0], tdsPpm: [400, 1100], dominantIssue: 'Hard, sometimes brackish supply; scale on fittings and geysers.', typicalSystem: 'HomeSoft softening; kitchen RO where TDS is high.', verified: false },
  { area: 'Old Town', hardnessPpm: [180, 350], ironPpm: [0.2, 0.8], tdsPpm: [300, 700], dominantIssue: 'Moderate hardness; occasional iron on older boreholes.', typicalSystem: 'HomeSoft softening; iron stage only where the borehole needs it.', verified: false },
];

// Ranchi — indicative, verified:false. Studies of Ranchi township report TDS
// >500 mg/L in ~55% of samples, with hardness and iron above BIS limits at
// places. Source: "Hydrochemical Characteristic & Quality Assessment of
// Groundwater, Ranchi Township" (CWE Journal) + Ranchi health-risk study (Elsevier).
const RANCHI: LocalityWaterData[] = [
  { area: 'Lalpur', hardnessPpm: [150, 320], ironPpm: [0.4, 2.0], tdsPpm: [350, 700], dominantIssue: 'Borewell iron staining (yellow/orange) with moderate hardness.', typicalSystem: 'Iron removal filter ahead of HomeSoft softening.', verified: false },
  { area: 'Doranda', hardnessPpm: [150, 300], ironPpm: [0.3, 1.5], tdsPpm: [300, 650], dominantIssue: 'Iron on borewell-fed stretches; hardness scale on fittings.', typicalSystem: 'Iron pre-treatment, then softening; sized at survey.', verified: false },
  { area: 'Kanke Road', hardnessPpm: [140, 300], ironPpm: [0.3, 1.5], tdsPpm: [300, 650], dominantIssue: 'Moderate hardness with localised iron.', typicalSystem: 'HomeSoft softening with an iron stage where the borehole needs it.', verified: false },
  { area: 'Morabadi', hardnessPpm: [140, 280], ironPpm: [0.3, 1.2], tdsPpm: [300, 600], dominantIssue: 'Mixed supply; iron where boreholes feed in.', typicalSystem: 'HomeSoft softening; iron pre-treatment on borewell supply.', verified: false },
];

// Rourkela — indicative, verified:false. Steel-city study reports TDS 90–488
// mg/L (REC campus low, Lal Tanki high) and Fe up to ~1.79 mg/L. Source:
// "Water Quality Analysis of the Steel City, Rourkela" (AJWR / SciEP, 2018).
const ROURKELA: LocalityWaterData[] = [
  { area: 'Civil Township', hardnessPpm: [120, 260], ironPpm: [0.3, 1.2], tdsPpm: [150, 420], dominantIssue: 'Moderate hardness; iron in some boreholes.', typicalSystem: 'HomeSoft softening; iron stage where the borehole needs it.', verified: false },
  { area: 'Udit Nagar', hardnessPpm: [150, 300], ironPpm: [0.5, 1.8], tdsPpm: [200, 490], dominantIssue: 'Borewell iron staining with moderate hardness and TDS.', typicalSystem: 'Iron pre-treatment, then softening.', verified: false },
  { area: 'Koel Nagar', hardnessPpm: [120, 260], ironPpm: [0.3, 1.2], tdsPpm: [150, 420], dominantIssue: 'Industrial-influenced groundwater; TDS and iron vary block to block.', typicalSystem: 'Test before sizing; softening with an iron stage as needed.', verified: false },
  { area: 'Chhend Colony', hardnessPpm: [120, 250], ironPpm: [0.3, 1.0], tdsPpm: [150, 400], dominantIssue: 'Moderate hardness; localised iron.', typicalSystem: 'HomeSoft softening; iron stage where required.', verified: false },
];

// Siliguri — indicative, verified:false. No city-specific published study was
// found; ranges reflect the sub-Himalayan / Terai-margin belt — moderate
// hardness, iron in some boreholes, arsenic risk in suburban borewells (West
// Bengal groundwater record). Treat as a placeholder until surveyed on site.
const SILIGURI: LocalityWaterData[] = [
  { area: 'Pradhan Nagar', hardnessPpm: [80, 200], ironPpm: [0.3, 1.2], tdsPpm: [120, 350], dominantIssue: 'Moderate hardness; iron in some boreholes; arsenic risk in suburban supply.', typicalSystem: 'Whole-house softening + iron stage where needed; free arsenic test at survey.', verified: false },
  { area: 'Sevoke Road', hardnessPpm: [80, 200], ironPpm: [0.3, 1.2], tdsPpm: [120, 350], dominantIssue: 'Mostly stable chemistry; localised iron staining.', typicalSystem: 'HomeSoft softening; drinking-water UF + UV at the kitchen.', verified: false },
  { area: 'Matigara', hardnessPpm: [90, 220], ironPpm: [0.4, 1.5], tdsPpm: [150, 400], dominantIssue: 'Borewell iron; arsenic risk in some suburban boreholes.', typicalSystem: 'Iron pre-treatment, then softening; arsenic confirmed by test before sizing.', verified: false },
];

// Guwahati — indicative, verified:false. Studies of Greater Guwahati report
// iron well above the 0.3 mg/L limit (an "inky" taste) and high total hardness.
// Source: "Integrated groundwater quality analysis, Guwahati City" (Springer,
// Environmental Earth Sciences, 2022) + NIH Greater Guwahati trace-element report.
const GUWAHATI: LocalityWaterData[] = [
  { area: 'Beltola', hardnessPpm: [200, 420], ironPpm: [1.0, 5.0], tdsPpm: [200, 600], dominantIssue: 'High borewell iron — yellow/orange staining and a metallic, inky taste.', typicalSystem: 'Iron pre-treatment is the default first stage, then HomeSoft softening.', verified: false },
  { area: 'Six Mile', hardnessPpm: [200, 450], ironPpm: [1.5, 5.0], tdsPpm: [200, 600], dominantIssue: 'Iron loads commonly above 1.5 ppm; staining and taste throughout.', typicalSystem: 'Sequenced iron removal → softening → carbon; the iron stage is essential.', verified: false },
  { area: 'Zoo Road', hardnessPpm: [180, 400], ironPpm: [1.0, 4.0], tdsPpm: [200, 550], dominantIssue: 'Borewell iron staining with high hardness.', typicalSystem: 'Iron filter ahead of softening; sized to the measured iron load.', verified: false },
  { area: 'Dispur', hardnessPpm: [180, 400], ironPpm: [1.0, 4.0], tdsPpm: [200, 550], dominantIssue: 'Iron and hardness; metallic taste on standing.', typicalSystem: 'Iron pre-treatment, then HomeSoft; kitchen RO on a TDS test.', verified: false },
];

// Noida (Gautam Buddh Nagar) — indicative, verified:false. CGWB / WQI studies
// report total hardness commonly 300–600 mg/L (up to ~921 in pockets), geogenic
// iron elevated across most samples (up to ~4.75 mg/L), and TDS frequently
// 500–2000 mg/L. Source: "Hydrogeochemical assessment, Greater Noida" (Springer
// Applied Water Science, 2018) + Greater Noida WQI studies (Taylor & Francis).
const NOIDA: LocalityWaterData[] = [
  { area: 'Sector 62', hardnessPpm: [300, 650], ironPpm: [0.3, 2.0], tdsPpm: [500, 1500], dominantIssue: 'High hardness scale on every fitting; iron on borewell-augmented supply.', typicalSystem: 'HomeSoft softening with iron pre-treatment; kitchen RO on high TDS.', verified: false },
  { area: 'Sector 137', hardnessPpm: [300, 700], ironPpm: [0.3, 2.0], tdsPpm: [600, 2000], dominantIssue: 'Very hard, high-TDS borewell supply with iron.', typicalSystem: 'Iron pre-treatment, softening, and RO at the drinking tap.', verified: false },
  { area: 'Greater Noida West', hardnessPpm: [350, 700], ironPpm: [0.5, 2.5], tdsPpm: [600, 2000], dominantIssue: 'Hardness and iron on borewell supply; scale and staining together.', typicalSystem: 'Iron filter ahead of HomeSoft; RO at the kitchen.', verified: false },
  { area: 'Sector 50', hardnessPpm: [300, 600], ironPpm: [0.3, 1.5], tdsPpm: [500, 1200], dominantIssue: 'High hardness; iron where the borewell is in the mix.', typicalSystem: 'HomeSoft softening; iron stage and RO sized at survey.', verified: false },
];

// Kathmandu valley — indicative, verified:false. Studies report hardness ~45–280
// mg/L (moderate, mostly within NDWQS), iron 0.15–7.5 mg/L (frequently above the
// 0.3 mg/L limit), and elevated ammonia in urban zones. Source: "Groundwater
// quality evaluation (WQI), Kathmandu Valley" (Taylor & Francis, 2023) + IWA
// WASH-Dev, Bagmati basin.
const KATHMANDU: LocalityWaterData[] = [
  { area: 'Lalitpur', hardnessPpm: [60, 280], ironPpm: [0.3, 3.0], tdsPpm: [150, 500], dominantIssue: 'Iron above the aesthetic limit (staining, taste); hardness moderate.', typicalSystem: 'Iron removal where needed; kitchen RO or UF + UV on a TDS test.', verified: false },
  { area: 'Bhaktapur', hardnessPpm: [60, 260], ironPpm: [0.3, 3.0], tdsPpm: [150, 500], dominantIssue: 'Iron and ammonia in urban boreholes; hardness moderate.', typicalSystem: 'Iron pre-treatment + drinking-water RO at the kitchen.', verified: false },
  { area: 'Maharajgunj', hardnessPpm: [50, 250], ironPpm: [0.3, 2.5], tdsPpm: [150, 450], dominantIssue: 'Localised iron staining; hardness within limit.', typicalSystem: 'HomeSoft softening with an iron stage; kitchen RO or UF + UV.', verified: false },
  { area: 'Patan', hardnessPpm: [60, 280], ironPpm: [0.3, 3.0], tdsPpm: [150, 500], dominantIssue: 'Iron and aesthetic issues; hardness generally within limit.', typicalSystem: 'Iron removal + drinking-water system sized by a TDS test.', verified: false },
];

// Biratnagar (Morang) — indicative, verified:false. A Morang-district study
// reports iron 0.45–3.67 mg/L and arsenic up to ~0.17 mg/L in some wards;
// arsenic is a recognised Terai groundwater risk. Source: "Groundwater Quality
// in Biratnagar of Morang District" (Granthaalayah) + Terai arsenic overviews.
const BIRATNAGAR: LocalityWaterData[] = [
  { area: 'Main Road', hardnessPpm: [120, 300], ironPpm: [0.5, 3.5], tdsPpm: [200, 600], dominantIssue: 'Borewell iron staining; arsenic risk in some wards (not visible — tested).', typicalSystem: 'Iron pre-treatment, then softening; arsenic-specific RO stage if a test confirms it.', verified: false },
  { area: 'Hospital Chowk', hardnessPpm: [120, 300], ironPpm: [0.5, 3.0], tdsPpm: [200, 600], dominantIssue: 'Iron and metallic taste; arsenic risk near the southern belt.', typicalSystem: 'Iron removal + a free water test for arsenic before sizing.', verified: false },
  { area: 'Rangeli Road', hardnessPpm: [120, 320], ironPpm: [0.6, 3.7], tdsPpm: [200, 650], dominantIssue: 'Higher iron loads; arsenic risk in adjacent boreholes.', typicalSystem: 'Iron pre-treatment, softening, and arsenic-specific RO where confirmed.', verified: false },
];

/**
 * City-water data keyed by city slug. Every city now carries indicative
 * (verified:false) ranges — Kolkata from Uniwater field experience, the rest
 * from published regional studies (sources in the comment above each block).
 */
export const CITY_WATER_DATA: Record<string, LocalityWaterData[]> = {
  kolkata: KOLKATA,
  bhubaneswar: BHUBANESWAR,
  ranchi: RANCHI,
  rourkela: ROURKELA,
  siliguri: SILIGURI,
  guwahati: GUWAHATI,
  noida: NOIDA,
  kathmandu: KATHMANDU,
  biratnagar: BIRATNAGAR,
};

/** ppm range → display string, e.g. "120–220 ppm". Collapses equal bounds. */
export function formatPpmRange([min, max]: [number, number]): string {
  const body = min === max ? `${min}` : `${min}–${max}`;
  return `${body} ppm`;
}
