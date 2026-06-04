/**
 * Per-page metadata helpers — self-referencing canonical + Open Graph.
 *
 * Background: the root layout (app/layout.tsx) sets `metadataBase` and a
 * homepage-level openGraph block. Without per-page overrides, every city
 * and solution sub-page inherits the homepage's og:title / og:description /
 * og:url / og:image — so each one broadcasts the homepage identity to
 * crawlers and social scrapers. `buildMetadata` produces the page-specific
 * override: a self-referencing canonical, an og:url that points at the page
 * itself, and matching twitter-card fields.
 *
 * Paths passed in are root-relative ("/cities/kolkata"); Next resolves them
 * against `metadataBase` automatically, so callers never hard-code the
 * origin.
 */

import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { SITE } from '@/content/site';

const OG_DIR = path.join(process.cwd(), 'public', 'og');

// A few og files predate the slug convention (e.g. og-whole-house.svg for
// the whole-house-water-filter slug). Map those slugs to their file stem so
// the convention-based lookup still finds them. Anything not listed resolves
// purely by `og-{slug}`.
const OG_SLUG_ALIASES: Record<string, string> = {
  'whole-house-water-filter': 'whole-house',
};

/**
 * Resolve an og:image by convention, checking the filesystem so that simply
 * dropping a file into /public/og wires it up — no code change needed.
 *
 * PNG is preferred over SVG: Facebook, LinkedIn, WhatsApp, and X do not
 * render SVG og:image files. The brand cards ship as SVG and are rasterised
 * to PNG by scripts/og-svg-to-png.mjs; this resolver points at the PNG.
 *
 * Lookup order (2026-06-05: .jpg added FIRST in each tier because the
 * batch-generated OG cards are JPG @ q87 -- smaller than the legacy
 * hand-designed PNG/SVG cards and easier to refresh from photos):
 *   1. /og/og-{slug}.{jpg,png,svg}        (per-page image)
 *   2. /og/og-{category}.{jpg,png,svg}    (category default — og-cities / og-solutions)
 *   3. /og/og-home.{jpg,png}              (sitewide fallback)
 */
export function resolveOgImage(slug: string, category: 'cities' | 'solutions'): string {
  const stem = OG_SLUG_ALIASES[slug] ?? slug;
  const candidates = [
    `og-${stem}.jpg`,
    `og-${stem}.png`,
    `og-${stem}.svg`,
    `og-${category}.jpg`,
    `og-${category}.png`,
    `og-${category}.svg`,
    'og-home.jpg',
    'og-home.png',
  ];
  for (const file of candidates) {
    try {
      if (fs.existsSync(path.join(OG_DIR, file))) return `/og/${file}`;
    } catch {
      // fs unavailable (shouldn't happen at build) — fall through to default.
    }
  }
  return '/og/og-home.png';
}

/**
 * Build a page-specific Metadata fragment with a self-referencing canonical
 * and Open Graph / Twitter cards that point at the page's own URL.
 */
export function buildMetadata(opts: {
  /** Root-relative path, e.g. "/cities/kolkata". */
  path: string;
  title: string;
  description: string;
  /** Root-relative og:image path. */
  image: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.path,
      siteName: SITE.name,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: opts.image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [opts.image],
    },
  };
}
