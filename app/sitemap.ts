import type { MetadataRoute } from 'next';
import { SOLUTION_LIST } from '@/content/solutions';
import { CITIES } from '@/content/site';
import { CASE_STUDIES } from '@/content/case-studies';
import { BLOG_POSTS } from '@/content/blog';

const BASE = 'https://uniwater.co.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    '/',
    '/solutions',
    '/residential',
    '/industrial',
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
    priority: path === '/' ? 1 : 0.8,
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
