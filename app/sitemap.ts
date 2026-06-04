import type { MetadataRoute } from 'next';
import { SOLUTION_LIST } from '@/content/solutions';
import { CITIES } from '@/content/site';
import { CASE_STUDIES } from '@/content/case-studies';
import { BLOG_POSTS } from '@/content/blog';

const BASE = 'https://uniwater.co.in';

// Stable content-revision date for routes we don't track per-page.
//
// `lastmod` is now Google's primary signal for scheduling re-crawls of
// already-discovered URLs — the unauthenticated sitemap "ping" endpoint was
// deprecated in 2023 (https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping).
// Previously this file stamped `new Date()` on every route, so each deploy
// told Google "every page changed just now," which dilutes the signal and
// reads as noise. A stable date that reflects the last real content revision
// is the correct behaviour. Bump this when site content is materially
// updated; per-post dates (blog) override it below.
const CONTENT_REVISION = '2026-06-03';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_REVISION;

  const staticRoutes = [
    '/',
    '/solutions',
    '/residential',
    '/industrial',
    '/clean-water-as-a-service',
    '/nepal/water-as-a-service',
    '/how-it-works',
    '/why-uniwater',
    '/service',
    '/about',
    '/book-survey',
    '/water-problem-checker',
    '/remote-site-survey',
    '/case-studies',
    '/cities',
    '/blog',
    '/testimonials',
    '/faq',
    '/contact',
    '/resources',
    '/for-trade',
    '/for-architects',
    '/for-plumbers',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    // / = 1.0 (highest); /clean-water-as-a-service = 0.9 (flagship
    // commercial offering, same priority as solution detail pages);
    // every other static page = 0.8.
    priority: path === '/' ? 1 : path === '/clean-water-as-a-service' ? 0.9 : 0.8,
  }));

  const solutionRoutes = SOLUTION_LIST.map((s) => ({
    url: `${BASE}/solutions/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const cityRoutes = CITIES.map((c) => ({
    url: `${BASE}/cities/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const caseRoutes = CASE_STUDIES.filter((c) => c.fullDetail).map((c) => ({
    url: `${BASE}/case-studies/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...solutionRoutes, ...cityRoutes, ...caseRoutes, ...blogRoutes];
}
