import type { Metadata } from 'next';
import { SolutionDetailTemplate } from '@/components/sections/SolutionDetailTemplate';
import { SOLUTIONS } from '@/content/solutions';
import { buildMetadata, resolveOgImage } from '@/lib/seo';

const solution = SOLUTIONS['water-softener'];

export const metadata: Metadata = buildMetadata({
  path: `/solutions/${solution.slug}`,
  title: solution.navLabel,
  description: solution.shortHeadline,
  image: resolveOgImage(solution.slug, 'solutions'),
});

export default function Page() {
  return <SolutionDetailTemplate solution={solution} />;
}
