#!/usr/bin/env node
/**
 * og-svg-to-png.mjs — rasterise the OG card SVGs in /public/og to PNG.
 *
 * Why: Facebook, LinkedIn, WhatsApp, and X do NOT render SVG og:image files —
 * they need a raster format (PNG/JPG). The brand OG cards ship as 1200x630
 * SVGs, so we rasterise the SAME approved artwork to PNG (no new design) and
 * point og:image at the PNG (see lib/seo.ts, which now prefers .png).
 *
 * Idempotent. Re-run whenever an og-*.svg changes. Single process, uses the
 * already-installed `sharp`.
 *
 *   node scripts/og-svg-to-png.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OG_DIR = path.join(process.cwd(), 'public', 'og');
const W = 1200;
const H = 630;

const svgs = fs.readdirSync(OG_DIR).filter((f) => f.toLowerCase().endsWith('.svg'));
if (svgs.length === 0) {
  console.log('No .svg files in', OG_DIR);
  process.exit(0);
}

let count = 0;
for (const svg of svgs) {
  const src = path.join(OG_DIR, svg);
  const out = path.join(OG_DIR, svg.replace(/\.svg$/i, '.png'));
  // density 144 → crisp rasterisation, then lock to exact 1200x630.
  const buf = await sharp(src, { density: 144 }).resize(W, H, { fit: 'fill' }).png().toBuffer();
  fs.writeFileSync(out, buf);
  count++;
  console.log(`✓ ${svg} → ${path.basename(out)} (${buf.length} bytes)`);
}
console.log(`\nRasterised ${count} OG card(s) to PNG at ${W}x${H}.`);
