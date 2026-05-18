import type { Metadata } from 'next';
import { SolutionDetailTemplate } from '@/components/sections/SolutionDetailTemplate';
import { SOLUTIONS } from '@/content/solutions';

const solution = SOLUTIONS['bathroom-filter'];

export const metadata: Metadata = {
  title: solution.navLabel,
  description: solution.shortHeadline,
  openGraph: { images: ['/og/og-bathroom-filter.svg'] },
  twitter: { images: ['/og/og-bathroom-filter.svg'] },
};

export default function Page() {
  return <SolutionDetailTemplate solution={solution} />;
}
