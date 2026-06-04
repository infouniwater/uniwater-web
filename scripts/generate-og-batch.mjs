/**
 * Batch-generate OG preview cards (1200x630) for every page that
 * still falls through to the generic /og/og-home.png. One Sharp
 * composite per entry: source photo as background, navy gradient
 * scrim, SVG overlay with eyebrow + headline + sub + URL.
 *
 * Reuses the same visual language as /og/og-nepal-waas.jpg which
 * Rajat already approved 2026-06-05.
 *
 * Run once with: node scripts/generate-og-batch.mjs
 * Idempotent -- overwrites existing outputs.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';

const ROOT = 'C:/Users/user/uniwater-web/uniwater/public';

// Style constants -- match og-nepal-waas
const W = 1200;
const H = 630;
const NAVY = '4,69,95';
const SOFT = '#87D0CD';
const OFFWHITE = '#FAFAF7';

/** XML-escape text content for use inside <text> nodes. */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildOverlaySvg({ eyebrow, h1, h2, sub, url }) {
  // The font-family list intentionally falls back to system fonts
  // because the OG renderer doesn't have access to our local font
  // files (Avant Garde et al). Arial is a reasonable visual match
  // across platforms for a centred, sans-serif card.
  return `
<svg width='${W}' height='${H}' xmlns='http://www.w3.org/2000/svg'>
  <defs>
    <linearGradient id='g' x1='0%' y1='0%' x2='0%' y2='100%'>
      <stop offset='0%' stop-color='rgba(${NAVY},0.85)'/>
      <stop offset='50%' stop-color='rgba(${NAVY},0.55)'/>
      <stop offset='100%' stop-color='rgba(${NAVY},0.30)'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <text x='60' y='130' font-family='Avant Garde, Arial, sans-serif' font-size='28' fill='${SOFT}' font-weight='600' letter-spacing='4'>${esc(eyebrow)}</text>
  <text x='60' y='250' font-family='Avant Garde, Arial, sans-serif' font-size='76' fill='${OFFWHITE}' font-weight='400'>${esc(h1)}</text>
  <text x='60' y='340' font-family='Avant Garde, Arial, sans-serif' font-size='76' fill='${OFFWHITE}' font-weight='400'>${esc(h2)}</text>
  <line x1='60' y1='400' x2='200' y2='400' stroke='${SOFT}' stroke-width='3'/>
  <text x='60' y='465' font-family='Avant Garde, Arial, sans-serif' font-size='30' fill='${OFFWHITE}' opacity='0.92'>${esc(sub)}</text>
  <text x='60' y='580' font-family='Avant Garde, Arial, sans-serif' font-size='22' fill='${SOFT}' font-weight='600' letter-spacing='2'>${esc(url)}</text>
</svg>
`;
}

// Page -> OG card config. Each entry produces /public/og/og-<dst>.jpg.
// h1 + h2 are two display lines; keep each under ~22 chars so they
// don't wrap on the 1200px canvas.
const CARDS = [
  // ---- High priority: flagship and landing pages ---------------------
  {
    dst: 'home',
    src: 'images/hero/terrace-desktop.jpg',
    eyebrow: 'UNIWATER',
    h1: 'Engineered home water,',
    h2: 'serviced monthly.',
    sub: 'BathSoft. HomeSoft. Drinking water. Nine cities.',
    url: 'uniwater.co.in',
  },
  {
    dst: 'clean-water-as-a-service',
    src: 'images/photography/whole-house-utility-area.jpg',
    eyebrow: 'CLEAN WATER AS A SERVICE',
    h1: 'Stop buying plants.',
    h2: 'Buy water outcomes.',
    sub: 'Zero capex. Guaranteed to spec. Monthly engineer.',
    url: 'uniwater.co.in/clean-water-as-a-service',
  },
  {
    dst: 'industrial',
    src: 'images/hero/industrial-desktop.jpg',
    eyebrow: 'INDUSTRIAL & INSTITUTIONAL',
    h1: 'Water that holds up',
    h2: 'at scale.',
    sub: '8,000 to 50,000 LPH. Subscribe or specify and buy.',
    url: 'uniwater.co.in/industrial',
  },
  {
    dst: 'residential',
    src: 'images/photography/whole-house-hero.jpg',
    eyebrow: 'FOR YOUR HOME',
    h1: 'Water systems',
    h2: 'for premium homes.',
    sub: 'Surveyed before sold. Serviced monthly.',
    url: 'uniwater.co.in/residential',
  },
  {
    dst: 'kolkata-iron-water',
    src: 'images/photography/scaling-on-taps.jpg',
    eyebrow: 'KOLKATA · IRON IN YOUR WATER',
    h1: 'Yellow stains.',
    h2: 'Metallic taste. Removed.',
    sub: 'Salt Lake, New Town, Rajarhat — fixed at the source.',
    url: 'uniwater.co.in/kolkata-iron-water',
  },
  {
    dst: 'solutions',
    src: 'images/photography/whole-house-hero.jpg',
    eyebrow: 'SOLUTIONS',
    h1: 'Three engineered',
    h2: 'families of systems.',
    sub: 'BathSoft · HomeSoft · Drinking water.',
    url: 'uniwater.co.in/solutions',
  },
  {
    dst: 'iron-filter',
    src: 'images/photography/wtp-terrace.jpg',
    eyebrow: 'IRON REMOVAL FILTER',
    h1: 'The stain you see.',
    h2: 'Removed at the inlet.',
    sub: 'Iron upstream of softening — the right order.',
    url: 'uniwater.co.in/solutions/iron-filter',
  },
  {
    dst: 'water-softener',
    src: 'images/installs/hero-duo-iron-softener-ss316.jpg',
    eyebrow: 'WATER SOFTENER',
    h1: 'The single biggest',
    h2: 'fix for hard water.',
    sub: 'Stops scale on geysers, fittings, appliances.',
    url: 'uniwater.co.in/solutions/water-softener',
  },
  {
    dst: 'drinking-water-solution',
    src: 'images/photography/drinking-water-home.jpg',
    eyebrow: 'DRINKING WATER SYSTEMS',
    h1: 'The one tap where',
    h2: 'chemistry beats all.',
    sub: 'RO or UF + UV. A 10-minute TDS test decides.',
    url: 'uniwater.co.in/solutions/drinking-water-solution',
  },
  {
    dst: 'cities',
    src: 'images/photography/residential-complex.jpg',
    eyebrow: 'WHERE WE WORK',
    h1: 'Nine cities.',
    h2: 'Own teams.',
    sub: 'Kolkata · Bhubaneswar · Noida · Kathmandu + 5.',
    url: 'uniwater.co.in/cities',
  },
  {
    dst: 'blog',
    src: 'images/photography/service-checkups.jpg',
    eyebrow: 'UNIWATER JOURNAL',
    h1: 'Water chemistry.',
    h2: 'In plain language.',
    sub: 'What’s in your water, what to do about it.',
    url: 'uniwater.co.in/blog',
  },
  {
    dst: 'case-studies',
    src: 'images/photography/commercial-ro-warehouse.jpg',
    eyebrow: 'CASE STUDIES',
    h1: 'What we’ve put in.',
    h2: 'Where it runs.',
    sub: 'Hospitals · hotels · factories · societies.',
    url: 'uniwater.co.in/case-studies',
  },
  {
    dst: 'building-or-renovating',
    src: 'images/photography/whole-house-luxury-villa.jpg',
    eyebrow: 'BUILDING OR RENOVATING',
    h1: 'Specify the water',
    h2: 'before the tile.',
    sub: 'Survey at draft drawings. Plumbing routes around it.',
    url: 'uniwater.co.in/building-or-renovating',
  },
  {
    dst: 'water-problem-checker',
    src: 'images/photography/service-testing-water.jpg',
    eyebrow: 'WATER TEST AT HOME',
    h1: 'A 10-minute test.',
    h2: 'No commitment.',
    sub: 'TDS, hardness, iron, pH, free chlorine — at your tap.',
    url: 'uniwater.co.in/water-problem-checker',
  },
  {
    dst: 'book-survey',
    src: 'images/photography/service-checkups.jpg',
    eyebrow: 'BOOK A FREE SURVEY',
    h1: 'An engineer visits.',
    h2: 'Tests your water.',
    sub: '48-hour response across nine cities.',
    url: 'uniwater.co.in/book-survey',
  },
  {
    dst: 'remote-site-survey',
    src: 'images/photography/service-installing.jpg',
    eyebrow: 'REMOTE SITE SURVEY',
    h1: 'A video survey for',
    h2: 'sites we can’t visit.',
    sub: 'Same engineer, same spec. Just video-led.',
    url: 'uniwater.co.in/remote-site-survey',
  },
  {
    dst: 'for-plumbers',
    src: 'images/installs/utility-room-01.jpg',
    eyebrow: 'FOR PLUMBERS',
    h1: 'A trade partner',
    h2: 'who finishes the work.',
    sub: 'Lead routing. Install pay. Spec-grade components.',
    url: 'uniwater.co.in/for-plumbers',
  },
  {
    dst: 'for-trade',
    src: 'images/installs/hero-duo-iron-softener-ss316.jpg',
    eyebrow: 'FOR THE TRADE',
    h1: 'Three lanes.',
    h2: 'Dealer · Designer · Installer.',
    sub: 'Trade pricing. Install support. Lead routing.',
    url: 'uniwater.co.in/for-trade',
  },
  {
    dst: 'why-uniwater',
    src: 'images/photography/service-testing-pressure.jpg',
    eyebrow: 'WHY UNIWATER',
    h1: 'Surveyed before sold.',
    h2: 'Serviced after.',
    sub: 'Engineered, not bought off a shelf.',
    url: 'uniwater.co.in/why-uniwater',
  },
  {
    dst: 'testimonials',
    src: 'images/photography/whole-house-luxury-villa.jpg',
    eyebrow: 'TESTIMONIALS',
    h1: 'What customers say.',
    h2: 'Named. On the record.',
    sub: 'Drawn from published case studies.',
    url: 'uniwater.co.in/testimonials',
  },
  {
    dst: 'faq',
    src: 'images/photography/service-checkups.jpg',
    eyebrow: 'FREQUENTLY ASKED',
    h1: 'Survey. Install.',
    h2: 'Service. Warranty.',
    sub: 'The answers before you book.',
    url: 'uniwater.co.in/faq',
  },
  {
    dst: 'contact',
    src: 'images/photography/service-checkups.jpg',
    eyebrow: 'CONTACT',
    h1: 'Engineered home',
    h2: 'water. Just a call away.',
    sub: 'Nine cities across India and Nepal.',
    url: 'uniwater.co.in/contact',
  },
  {
    dst: 'resources',
    src: 'images/photography/commercial-ro-studio.jpg',
    eyebrow: 'RESOURCES',
    h1: 'Catalogues. Articles.',
    h2: 'Sample reports.',
    sub: 'Everything to make a confident decision.',
    url: 'uniwater.co.in/resources',
  },
];

let totalIn = 0;
let totalOut = 0;
let made = 0;

for (const card of CARDS) {
  const srcPath = `${ROOT}/${card.src}`;
  const dstPath = `${ROOT}/og/og-${card.dst}.jpg`;
  const overlay = buildOverlaySvg(card);
  try {
    await sharp(srcPath)
      .resize({ width: W, height: H, fit: 'cover', position: 'centre' })
      .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
      .jpeg({ quality: 87, mozjpeg: true })
      .toFile(dstPath);
    const inStat = await fs.stat(srcPath);
    const outStat = await fs.stat(dstPath);
    totalIn += inStat.size;
    totalOut += outStat.size;
    made++;
    console.log(`  og-${card.dst}.jpg  (${(outStat.size / 1024).toFixed(0)} KB)`);
  } catch (err) {
    console.error(`  FAIL og-${card.dst}: ${err.message}`);
  }
}

console.log(`\nGenerated ${made} OG cards. Total output: ${(totalOut / 1024).toFixed(0)} KB`);
