import type { Metadata } from 'next';
import { SolutionDetailTemplate } from '@/components/sections/SolutionDetailTemplate';
import { SOLUTIONS } from '@/content/solutions';

const solution = SOLUTIONS['drinking-water-solution'];

export const metadata: Metadata = {
  title: solution.navLabel,
  description: solution.shortHeadline,
};

export default function Page() {
  return <SolutionDetailTemplate solution={solution} />;
}
