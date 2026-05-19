/**
 * City content. All nine cities render fully; Noida is the newest addition.
 * Sprint 5 builds out remaining 8 cities with real locality data.
 */

import type { CITIES } from '@/content/site';

type CitySlug = (typeof CITIES)[number]['slug'];

export interface CityContent {
  slug: string;
  name: string;
  country: 'India' | 'Nepal';
  lede: string;
  waterContext: string;
  localities: string[];
  localTeam: string;
  fullContent?: boolean;
}

export const CITY_CONTENT: Record<string, CityContent> = {
  noida: {
    slug: 'noida',
    name: 'Noida',
    country: 'India',
    lede:
      'Hard water across NCR \u2014 typical hardness 350\u2013600 ppm; iron, taste, and chlorine show up across Sectors 50, 62, 137. Softening first; pre-treatment where the borewell is involved.',
    waterContext:
      'Noida runs on a mix of Yamuna/Ganga canal water (treated municipal) and borewell augmentation. Hardness is the consistent issue \u2014 the calcium-magnesium load is high enough to leave scale on every premium fitting within twelve months. Borewell-fed sectors carry iron on top of the hardness. The Delhi-NCR water-source mix shifts by sector and by season; test before sizing.',
    localities: [
      'Sector 18',
      'Sector 50',
      'Sector 62',
      'Sector 78',
      'Sector 93',
      'Sector 100',
      'Sector 137',
      'Greater Noida West',
      'Jaypee Greens',
      'Mahagun Mywoods',
    ],
    localTeam: 'Our newest city. The Noida engineering team is being assembled \u2014 surveys are running on a 5\u20137 day window from Delhi-NCR until the local base in Sector 62 is fully staffed.',
    fullContent: true,
  },
  kolkata: {
    slug: 'kolkata',
    name: 'Kolkata',
    country: 'India',
    lede: 'Our home city. Treated municipal in central Kolkata; borewell augmentation common across the EM Bypass suburbs.',
    waterContext: 'Salt Lake, Rajarhat, and New Town run on a mix of municipal and borewell. Arsenic risk in some suburban borewells \u2014 testing matters. Central Kolkata is largely treated supply; hardness moderate, iron usually low.',
    localities: ['Ballygunge', 'Alipore', 'Park Street', 'Salt Lake', 'New Town', 'Rajarhat', 'Lake Town', 'Tollygunge', 'Behala', 'Hindustan Park'],
    localTeam: 'Head office in Shribhumi, Kolkata. Survey response within 24 hours across the city; engineer team based locally, not subcontracted.',
    fullContent: true,
  },
  bhubaneswar: {
    slug: 'bhubaneswar',
    name: 'Bhubaneswar',
    country: 'India',
    lede: 'Mixed municipal and borewell supply; moderate hardness; iron present in some eastern and northern corridors.',
    waterContext: 'Patia, Chandrasekharpur, and Jaydev Vihar each have distinct profiles. Test before sizing — borewell chemistry varies block to block, and the iron load runs higher than the municipal record suggests in many residential boreholes.',
    localities: ['Patia', 'Chandrasekharpur', 'Jaydev Vihar', 'Saheed Nagar', 'Nayapalli', 'Khandagiri', 'Old Town'],
    localTeam: 'Bhubaneswar service team. 48-hour survey response across the city; engineer team based locally.',
    fullContent: true,
  },
  ranchi: {
    slug: 'ranchi',
    name: 'Ranchi',
    country: 'India',
    lede: 'Mixed sources across the older centre and the newer south/east corridors. Borewell-heavy, iron a recurring feature.',
    waterContext: 'Iron is commonly present in residential borewells across Ranchi. Pre-treatment ahead of softening is the standard sequence \u2014 treating tap-by-tap exhausts softening resin in months. Municipal supply in the older centre is largely treated but variable in pressure.',
    localities: ['Lalpur', 'Kanke Road', 'Doranda', 'Ratu Road', 'Morabadi', 'Harmu', 'Hinoo'],
    localTeam: 'Ranchi service team. 48-hour survey response across the city.',
    fullContent: true,
  },
  rourkela: {
    slug: 'rourkela',
    name: 'Rourkela',
    country: 'India',
    lede: 'Steel-city with mixed supply across planned sectors and older townships. TDS varies block to block.',
    waterContext: 'Industrial-influenced groundwater in some areas means TDS and metal loading can be higher than the municipal record suggests. Always test before sizing \u2014 Sector 1 chemistry is not the same as Civil Township chemistry.',
    localities: ['Civil Township', 'Sector 1\u201320', 'Koel Nagar', 'Udit Nagar', 'Basanti Colony', 'Chhend Colony'],
    localTeam: 'Rourkela service team. 48-hour survey response across the city.',
    fullContent: true,
  },
  siliguri: {
    slug: 'siliguri',
    name: 'Siliguri',
    country: 'India',
    lede: 'Gateway to the North-East. Mixed supply, moderate hardness, low iron, arsenic risk in some suburban borewells.',
    waterContext: 'Mostly stable chemistry across the central belt; emphasis on whole-house softening and drinking-water UF + UV. Arsenic risk in some suburban boreholes means a free water test is part of the survey, not an extra.',
    localities: ['Hill Cart Road', 'Sevoke Road', 'Salbari', 'Pradhan Nagar', 'Champasari', 'Matigara'],
    localTeam: 'Siliguri service team. 48-hour survey response across the city.',
    fullContent: true,
  },
  guwahati: {
    slug: 'guwahati',
    name: 'Guwahati',
    country: 'India',
    lede: 'High iron in many residential borewells. Pre-treatment is the default starting point, not an optional upgrade.',
    waterContext: 'Iron loads above 1.5 ppm are common in residential borewells across Guwahati. Sequenced treatment \u2014 iron pre-treatment, then softening, then carbon \u2014 is essential. Skipping the pre-treatment stage means rebuilding the softener inside a year.',
    localities: ['Lalmati', 'Beltola', 'Six Mile', 'Zoo Road', 'Khanapara', 'GS Road', 'Dispur'],
    localTeam: 'Guwahati service team. 48-hour survey response across the city.',
    fullContent: true,
  },
  kathmandu: {
    slug: 'kathmandu',
    name: 'Kathmandu',
    country: 'Nepal',
    lede: 'Mixed jar, municipal, and borewell supply. Drinking-water RO at the kitchen pays back inside two years.',
    waterContext: 'Lalitpur, Bhaktapur, and the Kathmandu core each run on distinct municipal profiles. Borewell augmentation is common at most premium addresses. Hardness moderate to high; iron present in some blocks. A free 10-minute test at survey decides RO vs UF + UV at the kitchen tap.',
    localities: ['Lalitpur', 'Bhaktapur', 'Naxal', 'Baluwatar', 'Patan', 'Boudha', 'Maharajgunj'],
    localTeam: 'Kathmandu service team. 72-hour survey response across the valley.',
    fullContent: true,
  },
  biratnagar: {
    slug: 'biratnagar',
    name: 'Biratnagar',
    country: 'Nepal',
    lede: 'Industrial corridor of eastern Nepal \u2014 borewell-heavy, iron recurring, arsenic risk in the southern belt.',
    waterContext: 'Iron pre-treatment ahead of softening is the default residential sequence. Arsenic risk in some boreholes adjacent to the Indian border \u2014 confirm with a free survey test before sizing.',
    localities: ['Main Road', 'Hospital Chowk', 'Tinpaini', 'Mahendra Chowk', 'Janpath', 'Rangeli Road'],
    localTeam: 'Biratnagar service team. 72-hour survey response across the city.',
    fullContent: true,
  },
};
