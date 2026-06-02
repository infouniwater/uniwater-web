/**
 * Editorial cross-link maps for journey work in Phase B.
 *
 * Two relationships:
 *   - BLOG_TO_SOLUTION — each blog post points to the single most relevant
 *     solution detail page. Used to render a small action panel below the
 *     article: "looking for the system this article describes?"
 *   - SOLUTION_TO_BLOGS — each solution detail page lists 2–3 articles that
 *     give the editorial / decision context. Used to render a "Related
 *     reading" block below the solution detail's Related Solutions section.
 *
 * Solution slugs are tightly typed via SolutionSlug; blog slugs are looser
 * (BLOG_POSTS is declared as BlogPost[], not as const). A bad blog slug here
 * will silently render no link rather than throw — render code guards for it.
 */

import { BLOG_POSTS } from '@/content/blog';
import type { BlogPost } from '@/content/blog';
import { SOLUTIONS } from '@/content/solutions';
import type { SolutionSlug } from '@/content/solutions';

type BlogSlug = (typeof BLOG_POSTS)[number]['slug'];

export const BLOG_TO_SOLUTION: Partial<Record<BlogSlug, SolutionSlug>> = {
  // Iron / softening / sediment / carbon all point to HomeSoft — the
  // standalone pages were merged on 2026-06-03 because those four media
  // live as stages on the same train, not as separate products.
  'borewell-water-yellow': 'whole-house-water-filter',
  'iron-hardness-order': 'whole-house-water-filter',
  'hansgrohe-spec-vs-indian-water': 'whole-house-water-filter',
  'how-to-read-a-water-test': 'whole-house-water-filter',
  'soft-water-vs-salt-water': 'whole-house-water-filter',
  'tds-isnt-a-quality-metric': 'drinking-water-solution',
  'five-year-cost-of-doing-nothing': 'whole-house-water-filter',
  'whole-house-vs-point-of-use': 'whole-house-water-filter',
  'remineralisation-after-ro': 'drinking-water-solution',
  'premium-fittings-slow-disaster': 'whole-house-water-filter',
  // 'inside-your-monthly-service-report' and 'amc-tiers-honestly' are service
  // pieces — no single solution maps. Left unmapped; the cross-link panel
  // will skip if the post is not in this map.
};

export const SOLUTION_TO_BLOGS: Record<SolutionSlug, BlogSlug[]> = {
  'bathroom-filter': [
    'hansgrohe-spec-vs-indian-water',
    'premium-fittings-slow-disaster',
    'soft-water-vs-salt-water',
  ],
  'whole-house-water-filter': [
    'iron-hardness-order',
    'whole-house-vs-point-of-use',
    'five-year-cost-of-doing-nothing',
  ],
  'drinking-water-solution': [
    'tds-isnt-a-quality-metric',
    'remineralisation-after-ro',
    'how-to-read-a-water-test',
  ],
  'iron-filter': [
    'borewell-water-yellow',
    'iron-hardness-order',
    'how-to-read-a-water-test',
  ],
  'water-softener': [
    'soft-water-vs-salt-water',
    'iron-hardness-order',
    'premium-fittings-slow-disaster',
  ],
};

export function getSolutionForBlog(slug: string) {
  const target = BLOG_TO_SOLUTION[slug as BlogSlug];
  return target ? SOLUTIONS[target] : undefined;
}

export function getBlogsForSolution(slug: SolutionSlug): BlogPost[] {
  const slugs = SOLUTION_TO_BLOGS[slug] ?? [];
  return slugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p));
}

// Problem-token used by the /book-survey URL pre-fill. Keep these tokens in
// sync with the checkbox values rendered on /book-survey: any token that
// doesn't match a checkbox label is silently ignored.
export type ProblemToken = 'iron' | 'hardness' | 'drinking' | 'scale' | 'multiple' | 'construction';

export const SOLUTION_TO_PROBLEM: Record<SolutionSlug, ProblemToken> = {
  'bathroom-filter': 'hardness',
  'whole-house-water-filter': 'multiple',
  'drinking-water-solution': 'drinking',
  'iron-filter': 'iron',
  'water-softener': 'scale',
};

export const PROBLEM_LABEL: Record<ProblemToken, string> = {
  iron: 'Orange staining / iron',
  hardness: 'Hair, skin, hardness',
  drinking: 'Drinking water taste',
  scale: 'Scale on fittings, geyser',
  multiple: 'Multiple problems',
  construction: 'Building from scratch',
};

export function bookSurveyHrefForSolution(slug: SolutionSlug): string {
  return `/book-survey?problem=${SOLUTION_TO_PROBLEM[slug]}`;
}
