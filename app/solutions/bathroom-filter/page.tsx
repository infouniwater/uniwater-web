import type { Metadata } from 'next';
import { SolutionDetailTemplate } from '@/components/sections/SolutionDetailTemplate';
import { SOLUTIONS, SOLUTION_SEO } from '@/content/solutions';
import { buildMetadata, resolveOgImage } from '@/lib/seo';

const solution = SOLUTIONS['bathroom-filter'];

export const metadata: Metadata = buildMetadata({
  path: `/solutions/${solution.slug}`,
  title: SOLUTION_SEO[solution.slug].title,
  description: SOLUTION_SEO[solution.slug].description,
  image: resolveOgImage(solution.slug, 'solutions'),
});

/**
 * Bathroom filter solution page.
 *
 * 2026-06-03: the InstallationVersatility ("Five places we've put a
 * water system") embed was removed per Rajat — the SolutionDetail
 * template's section 6 ("Where it goes", headlined "Five places it
 * disappears.") already renders the same FIVE_PLACES data + photos,
 * and showing both made the page read as if the same idea had been
 * pasted in twice. InstallationVersatility still lives on the
 * homepage where it stands on its own.
 */
export default function Page() {
  return <SolutionDetailTemplate solution={solution} />;
}
