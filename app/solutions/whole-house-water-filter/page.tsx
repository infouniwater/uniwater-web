import type { Metadata } from 'next';
import { SolutionDetailTemplate } from '@/components/sections/SolutionDetailTemplate';
import { SOLUTIONS, SOLUTION_SEO } from '@/content/solutions';
import { buildMetadata, resolveOgImage } from '@/lib/seo';

const solution = SOLUTIONS['whole-house-water-filter'];

export const metadata: Metadata = buildMetadata({
  path: `/solutions/${solution.slug}`,
  title: SOLUTION_SEO[solution.slug].title,
  description: SOLUTION_SEO[solution.slug].description,
  image: resolveOgImage(solution.slug, 'solutions'),
});

export default function Page() {
  return <SolutionDetailTemplate solution={solution} />;
}
