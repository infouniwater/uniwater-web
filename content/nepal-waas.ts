/**
 * Drinking Water as a Service (DWaaS) + DM Water as a Service.
 *
 * Content for the Uniwater Nepal ad-campaign landing at
 * /nepal/water-as-a-service. Authored 2026-06-05 from Rajat's brief;
 * prices, plans, regions, and contact details are committed copy --
 * do NOT reword without checking the brief.
 *
 * The reference file at _reference/water-as-a-service.page.tsx was NOT
 * present when this page was built; sections marked DRAFT below carry
 * placeholder copy and need to be replaced verbatim from the reference:
 *   - BENEFIT_BLOCKS (6 items)
 *   - HOW_IT_WORKS (4 steps)
 *   - WHY_UNIWATER (8 points)
 *   - TERMS_NOTE
 */

// ----- Region targeting --------------------------------------------------

export const REGIONS = ['Itahari', 'Biratnagar', 'Dharan', 'Damak'] as const;
export const PROVINCE = 'Koshi Province, Nepal';
export const TAGLINE = 'Wellness starts with clean water.';

// ----- Contact ------------------------------------------------------------

/** Primary WhatsApp number for this campaign. Uses the existing sitewide
 *  WhatsApp (PRIMARY_PHONE_E164) but spelled out here so the ad page
 *  doesn't break if PRIMARY_PHONE changes (the ad URL is paid traffic). */
export const NEPAL_WHATSAPP_E164 = '919748745193';

/** Displayed call lines on the page. The +91 line is reinstated FOR THIS
 *  CAMPAIGN PAGE ONLY -- it was removed from the sitewide contact module
 *  earlier (CONTACT.phones in content/site.ts) but the brief explicitly
 *  lists both numbers for the Nepal ad. Flagged for Rajat to confirm. */
export const NEPAL_CALL_LINES = ['+977-9819391754', '+91-9663245193'] as const;

// ----- Service tabs -------------------------------------------------------

export type ServiceSlug = 'drinking' | 'dm';

export const SERVICE_LABEL: Record<ServiceSlug, string> = {
  drinking: 'Drinking Water as a Service',
  dm: 'DM Water as a Service',
};

// ----- DWaaS plans (committed copy -- do not reword) ---------------------

export interface DWaaSPlan {
  /** Stable slug used in id + WhatsApp message + Pixel events. */
  slug: 'A' | 'B' | 'C' | 'D' | 'E';
  /** Monthly volume, displayed as "1,500 L/mo" etc. */
  monthlyLitres: number;
  /** Typical daily jar count (display range). */
  jarsPerDay: string;
  /** Per-litre rate in NPR. */
  ratePerLitre: number;
  /** Minimum monthly bill in NPR. */
  minBill: number;
  /** Refundable security deposit in NPR. */
  deposit: number;
  /** Card-highlight flag. Set to true ONLY for plan C per brief. */
  popular?: boolean;
}

export const DWAAS_PLANS: DWaaSPlan[] = [
  { slug: 'A', monthlyLitres: 1_500,  jarsPerDay: '2–3 jars/day',   ratePerLitre: 3,    minBill: 3_500,  deposit: 20_000 },
  { slug: 'B', monthlyLitres: 2_500,  jarsPerDay: '4–5 jars/day',   ratePerLitre: 2.5,  minBill: 4_500,  deposit: 25_000 },
  { slug: 'C', monthlyLitres: 4_000,  jarsPerDay: '6–7 jars/day',   ratePerLitre: 2,    minBill: 5_500,  deposit: 35_000, popular: true },
  { slug: 'D', monthlyLitres: 6_000,  jarsPerDay: '~10 jars/day',   ratePerLitre: 1.6,  minBill: 7_500,  deposit: 45_000 },
  { slug: 'E', monthlyLitres: 10_000, jarsPerDay: '15–20 jars/day', ratePerLitre: 1.5,  minBill: 10_000, deposit: 60_000 },
];

// ----- DM Water (no public price) ----------------------------------------

export const DM_PRICING_LINE =
  'Pricing on request — your per-litre rate depends on feed-water TDS and target spec.';

// ----- Stats strip (committed copy) --------------------------------------

export const STATS_STRIP = [
  { value: '5',         label: 'plans' },
  { value: 'Rs 1.5',    label: 'starting / L' },
  { value: '24×7',      label: 'service' },
  { value: '0',         label: 'equipment cost' },
] as const;

export const MODEL_LINE = 'zero equipment cost + refundable security deposit';

// ----- Hero --------------------------------------------------------------

export const HERO_EYEBROW = 'For East Nepal — Itahari · Biratnagar · Dharan · Damak';
export const HERO_TITLE = 'Drinking water on tap. Charged by the litre.';
export const HERO_SUB =
  'Zero equipment cost. Refundable security deposit. We install the plant, deliver the water, and keep it running. From Rs 1.5 per litre.';

// ----- DRAFT content (needs reference file) ------------------------------

// DRAFT — replace verbatim from _reference/water-as-a-service.page.tsx
export const BENEFIT_BLOCKS: Array<{ title: string; body: string }> = [
  {
    title: 'No equipment to buy.',
    body: 'We install and own the plant on your premises. You pay only for the water it delivers.',
  },
  {
    title: 'Refundable deposit, not capex.',
    body: 'The security deposit comes back when the contract ends. Nothing lands on your balance sheet.',
  },
  {
    title: 'Engineered for the load.',
    body: 'Sized at survey to your daily draw, peak hour, and TDS reading. Not a generic kit.',
  },
  {
    title: 'Monthly preventive visit.',
    body: 'A named engineer visits monthly to backwash, inspect media, spot-test parameters, and leave a written report.',
  },
  {
    title: '24×7 fault response.',
    body: 'If the water stops, we respond. Service team based locally; no waiting for a contractor.',
  },
  {
    title: 'Predictable monthly bill.',
    body: 'One invoice per month against metered consumption — minimum bill clarified upfront. No surprise media-change charges.',
  },
];

// DRAFT — replace verbatim from _reference/water-as-a-service.page.tsx
export interface ProcessStep {
  n: string;
  title: string;
  body: string;
}
export const HOW_IT_WORKS: ProcessStep[] = [
  {
    n: '01',
    title: 'Free site survey.',
    body: 'We visit your premises, test the source water, and map your daily demand.',
  },
  {
    n: '02',
    title: 'Plan and deposit.',
    body: 'Pick the volume tier that fits, pay the refundable security deposit, and sign the service contract.',
  },
  {
    n: '03',
    title: 'We install and commission.',
    body: 'Plant goes in within agreed timeline. Plumbing, electricals, and dispensing handled by Uniwater.',
  },
  {
    n: '04',
    title: 'Water flows. We run it.',
    body: 'Monthly engineer visits, media management, and 24×7 fault response. You pay against the meter.',
  },
];

// DRAFT — replace verbatim from _reference/water-as-a-service.page.tsx
export const WHY_UNIWATER: string[] = [
  'Local Nepal team — Biratnagar and Itahari coverage on the same day, Dharan and Damak next-day.',
  'Already running across India and Nepal — schools, restaurants, factories, residential societies.',
  'Refundable security deposit, not a sale — the plant is ours; you subscribe to the water.',
  'No surprise charges — media, membranes, pumps, repairs included in the service contract.',
  'Named engineer for your site — same person every visit, not a rotating queue.',
  'Same-day written report after every visit, archived for compliance audits.',
  'Drinking water meets IS 10500 / NDWQS; DM water held to your conductivity target.',
  'Cancel anytime after 12 months, deposit returned in full.',
];

// DRAFT — replace verbatim from _reference/water-as-a-service.page.tsx
export const TERMS_NOTE = `Prices in NPR, excluding applicable taxes. Minimum monthly bill applies when monthly consumption is below the plan allowance. Security deposit refundable on contract close, subject to plant being returned in working condition. Monthly bill = max(consumption × rate, minimum bill). DM water pricing is quoted per site after feed-water analysis. Service available in Itahari, Biratnagar, Dharan, and Damak; other locations on request.`;

// ----- WhatsApp deeplink helpers -----------------------------------------

/** Build the WhatsApp wa.me URL with a per-plan prefilled message.
 *  The message identifies the plan and includes a placeholder for the
 *  caller's location so the sales engineer has it in the first reply. */
export function whatsappHrefForPlan(plan: DWaaSPlan): string {
  const text = encodeURIComponent(
    `Hi Uniwater — I'm interested in DWaaS Plan ${plan.slug} (${plan.monthlyLitres.toLocaleString('en-IN')} L/mo, Rs ${plan.ratePerLitre}/L). Please share details. Location: `,
  );
  return `https://wa.me/${NEPAL_WHATSAPP_E164}?text=${text}`;
}

/** WhatsApp deeplink for the DM water enquire-only CTA. */
export const WHATSAPP_HREF_DM = `https://wa.me/${NEPAL_WHATSAPP_E164}?text=${encodeURIComponent(
  `Hi Uniwater — I'd like to enquire about DM Water as a Service. My target spec / TDS is: `,
)}`;

/** Generic WhatsApp deeplink (header, sticky CTA, hero secondary). */
export const WHATSAPP_HREF_GENERIC = `https://wa.me/${NEPAL_WHATSAPP_E164}?text=${encodeURIComponent(
  `Hi Uniwater — I'm interested in Clean Water as a Service for my business. Service needed: `,
)}`;

// ----- Form use-case dropdown options ------------------------------------

export const USE_CASE_OPTIONS = [
  { value: 'office',       label: 'Office / coworking' },
  { value: 'restaurant',   label: 'Restaurant / cafe' },
  { value: 'hotel',        label: 'Hotel / guesthouse' },
  { value: 'hospital',     label: 'Hospital / clinic' },
  { value: 'education',    label: 'School / college' },
  { value: 'manufacturing',label: 'Factory / manufacturing' },
  { value: 'society',      label: 'Residential society / apartment complex' },
  { value: 'other',        label: 'Other (specify in notes)' },
] as const;

// ----- Metadata ----------------------------------------------------------

export const META_TITLE = 'Drinking Water as a Service — Itahari · Biratnagar · Dharan · Damak | Uniwater Nepal';
export const META_DESCRIPTION =
  'Subscribe to drinking water from Uniwater Nepal. Zero equipment cost, refundable security deposit, monthly engineer visits, 24×7 service. From Rs 1.5/L. Plans A to E for offices, restaurants, hotels, schools, hospitals, and factories across East Nepal.';
