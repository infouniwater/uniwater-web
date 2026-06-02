#!/usr/bin/env node
/**
 * verify-seo.mjs — Tier-1 SEO/GEO smoke test.
 *
 * Fetches every city + solution route and checks the server-rendered HTML for:
 *   1. <link rel="canonical">      present AND === the route's own URL
 *   2. <meta property="og:url">    present AND === the route's own URL (never the homepage)
 *   3. a <script type="application/ld+json"> containing the expected @type
 *      (LocalBusiness for cities, Service for solutions, FAQPage where FAQs exist)
 *
 * Usage:
 *   node scripts/verify-seo.mjs                      # defaults to https://uniwater.co.in
 *   node scripts/verify-seo.mjs http://localhost:3000
 *
 * No dependencies. Node 18+ (global fetch). Exits non-zero if any check fails.
 * JSON-LD is server-rendered, so a fetch + parse is sufficient — no browser.
 */

const BASE = (process.argv[2] || 'https://uniwater.co.in').replace(/\/+$/, '');

const CITIES = [
  'kolkata', 'bhubaneswar', 'ranchi', 'rourkela', 'siliguri',
  'guwahati', 'noida', 'kathmandu', 'biratnagar',
];

// Real solution pages (standalone routes). sediment-filter and
// activated-carbon-filter are intentionally 301'd to whole-house, so they
// are listed as expected redirects, not tested as pages.
const SOLUTIONS = [
  'bathroom-filter', 'whole-house-water-filter', 'drinking-water-solution',
  'iron-filter', 'water-softener',
];
const EXPECTED_REDIRECTS = ['sediment-filter', 'activated-carbon-filter'];

// Cities that are expected to carry an inline FAQ (FAQPage JSON-LD). Only
// Kolkata is seeded today; other cities legitimately render no FAQ block.
const CITY_FAQ_EXPECTED = new Set(['kolkata']);

const norm = (u) => u.replace(/\/+$/, '');

function findCanonical(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!m) return null;
  const href = m[0].match(/href=["']([^"']+)["']/i);
  return href ? href[1] : null;
}

function findOgUrl(html) {
  // property and content can appear in either order.
  const tags = html.match(/<meta[^>]+>/gi) || [];
  for (const tag of tags) {
    if (/property=["']og:url["']/i.test(tag)) {
      const c = tag.match(/content=["']([^"']+)["']/i);
      if (c) return c[1];
    }
  }
  return null;
}

function findJsonLdTypes(html) {
  const types = new Set();
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let parsed;
    try {
      parsed = JSON.parse(m[1].trim());
    } catch {
      continue; // malformed block — skip, will surface as a missing @type
    }
    collectTypes(parsed, types);
  }
  return types;
}

function collectTypes(node, out) {
  if (Array.isArray(node)) {
    for (const n of node) collectTypes(n, out);
    return;
  }
  if (node && typeof node === 'object') {
    const t = node['@type'];
    if (typeof t === 'string') out.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && out.add(x));
    for (const k of Object.keys(node)) collectTypes(node[k], out); // nested @graph, mainEntity, etc.
  }
}

async function checkRoute(path, { expectType, expectFaq }) {
  const url = `${BASE}${path}`;
  const checks = [];
  let ok = true;

  let res;
  try {
    res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'uniwater-seo-verifier' } });
  } catch (e) {
    return { path, ok: false, lines: [`  ✗ fetch failed: ${e.message}`] };
  }

  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location') || '(none)';
    return { path, ok: false, lines: [`  ✗ ${res.status} redirect → ${loc} (expected a real page)`] };
  }
  if (res.status !== 200) {
    return { path, ok: false, lines: [`  ✗ HTTP ${res.status}`] };
  }

  const html = await res.text();

  // 1. canonical
  const canonical = findCanonical(html);
  if (canonical && norm(canonical) === norm(url)) {
    checks.push(`  ✓ canonical = ${canonical}`);
  } else {
    ok = false;
    checks.push(`  ✗ canonical = ${canonical ?? '(missing)'} (expected ${url})`);
  }

  // 2. og:url
  const ogUrl = findOgUrl(html);
  if (ogUrl && norm(ogUrl) === norm(url)) {
    checks.push(`  ✓ og:url = ${ogUrl}`);
  } else {
    ok = false;
    const homeNote = ogUrl && norm(ogUrl) === norm(BASE) ? ' [homepage identity!]' : '';
    checks.push(`  ✗ og:url = ${ogUrl ?? '(missing)'}${homeNote} (expected ${url})`);
  }

  // 3. JSON-LD @types
  const types = findJsonLdTypes(html);
  if (types.has(expectType)) {
    checks.push(`  ✓ JSON-LD has ${expectType}`);
  } else {
    ok = false;
    checks.push(`  ✗ JSON-LD missing ${expectType} (found: ${[...types].join(', ') || 'none'})`);
  }
  if (expectFaq) {
    if (types.has('FAQPage')) {
      checks.push(`  ✓ JSON-LD has FAQPage`);
    } else {
      ok = false;
      checks.push(`  ✗ JSON-LD missing FAQPage`);
    }
  }

  return { path, ok, lines: checks };
}

async function checkExpectedRedirect(path) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'uniwater-seo-verifier' } });
    if (res.status >= 300 && res.status < 400) {
      return { path, ok: true, lines: [`  ↪ ${res.status} → ${res.headers.get('location') || ''} (expected redirect)`] };
    }
    return { path, ok: true, lines: [`  • HTTP ${res.status} (expected a redirect, but not failing the run)`] };
  } catch (e) {
    return { path, ok: true, lines: [`  • fetch failed: ${e.message} (informational)`] };
  }
}

async function main() {
  console.log(`\nSEO/GEO verification against ${BASE}\n${'='.repeat(56)}`);
  const results = [];

  for (const slug of CITIES) {
    const r = await checkRoute(`/cities/${slug}`, {
      expectType: 'LocalBusiness',
      expectFaq: CITY_FAQ_EXPECTED.has(slug),
    });
    results.push(r);
    console.log(`\n${r.ok ? 'PASS' : 'FAIL'}  /cities/${slug}`);
    r.lines.forEach((l) => console.log(l));
  }

  for (const slug of SOLUTIONS) {
    const r = await checkRoute(`/solutions/${slug}`, { expectType: 'Service', expectFaq: true });
    results.push(r);
    console.log(`\n${r.ok ? 'PASS' : 'FAIL'}  /solutions/${slug}`);
    r.lines.forEach((l) => console.log(l));
  }

  for (const slug of EXPECTED_REDIRECTS) {
    const r = await checkExpectedRedirect(`/solutions/${slug}`);
    console.log(`\nINFO  /solutions/${slug}`);
    r.lines.forEach((l) => console.log(l));
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${'='.repeat(56)}`);
  console.log(`${results.length - failed.length}/${results.length} routes passed.`);
  if (failed.length) {
    console.log(`FAILED: ${failed.map((r) => r.path).join(', ')}`);
    process.exit(1);
  }
  console.log('All checks passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
