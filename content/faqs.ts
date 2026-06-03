/**
 * Page-local FAQ sets, keyed by city slug and by solution slug.
 *
 * These are deliberately page-specific — they do NOT duplicate the central
 * /faq content. City FAQs answer the iron-vs-hardness and borewell-safety
 * questions a Kolkata homeowner actually types; solution FAQs sit on the
 * iron-filter and water-softener pages.
 *
 * Answers are written in the existing site voice: plain, factual, no
 * marketing inflation. Plain text only (no HTML entities) — these strings
 * are also serialised into FAQPage JSON-LD.
 */

export interface Faq {
  q: string;
  a: string;
}

// Shared answers reused across the city set and both solution sets so the
// iron-vs-softener distinction reads identically wherever it appears.
const SOFTENER_REMOVES_IRON: Faq = {
  q: 'Does a water softener remove iron?',
  a: 'No. A softener targets hardness — it swaps calcium and magnesium for sodium on an ion-exchange resin. Iron is a different problem: dissolved iron fouls and coats softening resin, so it has to be taken out upstream by a dedicated iron-removal filter. On borewell-fed supply the correct sequence is iron pre-treatment first, softening second.',
};

const YELLOW_WATER: Faq = {
  q: 'Why does my water turn yellow / orange after standing?',
  a: 'That is dissolved iron oxidising. Water from a borewell can look clear at the tap, but once it sits and meets air the iron turns to rust and the water goes yellow or orange — the same stain you see on basins, tiles, and white laundry, often with a metallic taste. It is a treatable water-chemistry issue, removed by an iron filter sized to the iron load.',
};

const IRON_VS_SOFTENER: Faq = {
  q: 'Iron remover vs water softener — which do I need?',
  a: 'It depends on what your water actually carries, which is why we test before we size. Iron staining (yellow/orange marks, metallic taste) calls for an iron-removal filter. Scale on geysers, fittings, and glassware calls for a softener. Borewell-fed homes usually need both, in that order — iron filter first to protect the softener resin. The free survey test tells you which.',
};

const BOREWELL_SAFE: Faq = {
  q: 'Is borewell water in Salt Lake / New Town / Rajarhat safe?',
  a: 'These areas run largely on borewell augmentation, and borewell chemistry varies block to block. Iron and hardness are common and visible; some suburban boreholes also carry arsenic, which you cannot see or taste. That is exactly why a free on-site water test is part of every survey — we read your specific borehole before sizing anything, rather than assuming a city-wide number.',
};

const SERVICING: Faq = {
  q: 'How often does the system need servicing?',
  a: 'Year one of AMC is included with every install. Comprehensive tier is a monthly engineer visit; Standard tier is quarterly. Each visit covers parameter testing (hardness, iron, TDS, pH), backwash and regeneration checks, salt top-up where applicable, and a same-day written report. Iron filters and softeners are media-based, so periodic backwash verification is what keeps them performing.',
};

/** FAQs for /cities/[slug], keyed by city slug. Kolkata seeded. */
export const CITY_FAQS: Record<string, Faq[]> = {
  kolkata: [
    SOFTENER_REMOVES_IRON,
    YELLOW_WATER,
    IRON_VS_SOFTENER,
    BOREWELL_SAFE,
    SERVICING,
  ],
};

/** FAQs for /kolkata-iron-water pillar page. Verbatim from the Tier-1 SEO
 *  brief 2026-06-03 -- DO NOT rewrite without checking against the brief.
 *  These are also rendered into FAQPage JSON-LD on the pillar page, so a
 *  silent edit here changes the search-result rich result too. */
export const KOLKATA_IRON_PILLAR_FAQS: Faq[] = [
  {
    q: 'Does a water softener remove iron?',
    a: 'No. A softener removes hardness — the calcium and magnesium that cause scale. Iron needs a dedicated iron-removal filter that oxidises the iron and backwashes it out. Most Kolkata borewell homes need both, which is why we test before we specify.',
  },
  {
    q: 'Why does my water turn yellow or orange after it stands?',
    a: 'That’s dissolved iron. Straight from the tap the water can look clear, but once it meets air the iron oxidises and turns yellow-brown — the stain you see on basins, tiles, and laundry. It’s iron in the supply, not dirt in your tank.',
  },
  {
    q: 'How much does an iron filter cost in Kolkata?',
    a: 'It depends on your iron level, water use, and how the system fits your home — which is why we survey before we quote, instead of pricing from a catalogue. The survey is free, and you get a fixed price for your home.',
  },
  {
    q: 'Is borewell water in Salt Lake, New Town, or Rajarhat safe to use?',
    a: 'These areas sit on the borewell belt, where iron and hardness run higher than in central KMC-supplied Kolkata. Untreated, it stains fittings and clothes and scales appliances. A whole-house iron filter and softener, sized to your reading, fixes it at the source.',
  },
  {
    q: 'How often does an iron filter need servicing?',
    a: 'The media needs regular backwashing and gradually loses capacity — skipped maintenance is why cheap units fail within months. We visit every month to backwash, inspect the media, spot-test iron and hardness, and leave a written report.',
  },
];

/** FAQs for /solutions/[slug], keyed by solution slug. */
export const SOLUTION_FAQS: Record<string, Faq[]> = {
  'iron-filter': [
    YELLOW_WATER,
    SOFTENER_REMOVES_IRON,
    IRON_VS_SOFTENER,
    SERVICING,
  ],
  'water-softener': [
    SOFTENER_REMOVES_IRON,
    IRON_VS_SOFTENER,
    {
      q: 'Will a softener stop scale on my geyser and fittings?',
      a: 'Yes — that is exactly what it does. By removing the calcium and magnesium that cause hardness, a softener stops the scale that furs up geyser elements, blocks shower heads, and clouds glassware. It does not remove iron staining, taste, or odour; those need carbon or iron stages alongside it, sized at survey.',
    },
    SERVICING,
  ],
};
