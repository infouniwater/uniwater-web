import type { Metadata } from 'next';
import { SolutionDetailTemplate } from '@/components/sections/SolutionDetailTemplate';
import { SOLUTIONS } from '@/content/solutions';

const solution = SOLUTIONS['whole-house-water-filter'];

export const metadata: Metadata = {
  title: solution.navLabel,
  description: solution.shortHeadline,
  openGraph: { images: ['/og/og-whole-house.svg'] },
  twitter: { images: ['/og/og-whole-house.svg'] },
};

export default function Page() {
  return <SolutionDetailTemplate solution={solution} />;
}
