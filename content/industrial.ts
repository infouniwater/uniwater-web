/**
 * Industrial / B2B taxonomy.
 * Per Commercial Catalogue + Blueprint §9.
 */

export const SYSTEM_TYPES = [
  {
    code: 'RO',
    name: 'RO.',
    description: 'Reverse osmosis.',
    application:
      'Drinking water, process water, boiler make-up, beverage. Removes TDS, salts, organics.',
    capacityRange: '500 \u2014 50,000 LPH',
    components: [
      'Multi-grade filter',
      'Activated carbon filter',
      'Antiscalant dosing',
      'High-pressure pump',
      'RO membranes (TFC)',
    ],
  },
  {
    code: 'DM',
    name: 'DM.',
    description: 'Demineralization.',
    application:
      'Boiler feed, pharma, lab water, battery manufacturing. High-purity water below 1 \u00b5S/cm.',
    capacityRange: '100 \u2014 10,000 LPH',
    components: [
      'Strong acid cation (SAC) resin',
      'Strong base anion (SBA) resin',
      'Acid & alkali regeneration',
      'Conductivity meters',
      'Optional mixed-bed polisher',
    ],
  },
  {
    code: 'WTP',
    name: 'WTP.',
    description: 'Building water-treatment plant.',
    application:
      'Inlet treatment for whole sites. Removes turbidity, hardness, iron, chlorine. Protects everything downstream.',
    capacityRange: '5 \u2014 100 KLD',
    components: [
      'Sand filter (turbidity)',
      'Iron-removal filter',
      'Activated carbon filter',
      'Softener (ion exchange)',
      'UV / chlorination polish',
    ],
  },
] as const;

export const WHERE_WE_WORK = [
  {
    number: '01',
    title: 'Industries.',
    subtitle: 'Process water that meets spec.',
    body:
      'Manufacturing plants need water treated to the load and the discharge norms. RO for boiler make-up and cooling. DM for process. Hard limits on conductivity and silica.',
    typicalSites: ['F&B processing', 'Pharmaceutical plants', 'Textile and dyeing', 'Boilers, cooling towers'],
  },
  {
    number: '02',
    title: 'Institutions.',
    subtitle: 'Reliable supply, every day.',
    body:
      'Hotels and hospitals run on water that has to be there at 6 AM and at 11 PM. WTP plus drinking-water RO at point of use. Designed for peak occupancy, not the average.',
    typicalSites: ['Hotels and resorts', 'Hospitals, clinics', 'Schools, hostels', 'Office complexes'],
  },
  {
    number: '03',
    title: 'Communities.',
    subtitle: 'Treated at source, distributed clean.',
    body:
      'Gated complexes and townships treat water once, at the inlet. A single WTP that handles turbidity, hardness, iron. Every flat gets the same water.',
    typicalSites: ['Gated residential complexes', 'Townships, mid-rise', 'Cooperative housing', 'Plotted developments'],
  },
] as const;

export const CAPACITY_BANDS = [
  { capacity: '8K LPH', subtitle: 'Small complexes, mid-rise. Boutique hotels.' },
  { capacity: '12K LPH', subtitle: 'Mid-size societies, schools. Hospitals up to 100 beds.' },
  { capacity: '18K LPH', subtitle: 'Large complexes, hospitality. Mid-size institutions.' },
  { capacity: '24K LPH', subtitle: 'Large mixed-use, large hotels. Institutional campuses.' },
  { capacity: '30K LPH', subtitle: 'Industrial campuses, large gated communities. Multi-block developments.' },
] as const;

export const TECHNICAL_EDGE = [
  {
    title: 'Spec-grade components.',
    body:
      'FRP and SS vessels rated for the duty cycle. Pressure gauges and flow meters at every stage. RO membranes from Hydranautics, Dow, LG. Resins from Tulsion and Ionex.',
  },
  {
    title: 'Water analysis first.',
    body:
      'Every BOM follows from a feed-water analysis. TDS, hardness, iron, silica, conductivity, microbiological. The wrong sequence is worse than no sequence.',
  },
  {
    title: 'Operations from day one.',
    body:
      'AMC priced at handover. Same-day reports after every visit. 24-hour SLA on flagged faults. Year five, the system still meets spec.',
  },
  {
    title: 'Designed for the load.',
    body:
      'Sized for peak demand, not average. Storage between treatment and distribution. Bypass for service. Single-line diagram on every quote.',
  },
] as const;
