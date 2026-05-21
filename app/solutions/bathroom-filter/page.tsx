import type { Metadata } from 'next';
import { SolutionDetailTemplate } from '@/components/sections/SolutionDetailTemplate';
import { InstallationVersatility } from '@/components/sections/InstallationVersatility';
import { SOLUTIONS } from '@/content/solutions';

const solution = SOLUTIONS['bathroom-filter'];

export const metadata: Metadata = {
  title: solution.navLabel,
  description: solution.shortHeadline,
  openGraph: { images: ['/og/og-bathroom-filter.svg'] },
  twitter: { images: ['/og/og-bathroom-filter.svg'] },
};

/**
 * Bathroom filter solution page.
 *
 * "Five places we've put a system" (InstallationVersatility) was migrated
 * here from the homepage on 2026-05-21 as part of the homepage-restructure
 * brief. It renders just above the final CTA via the template's
 * slotBeforeFinalCTA prop — that keeps the existing template intact for
 * the other six solution pages while giving this one the install showcase
 * exactly where Rajat wanted it.
 */
export default function Page() {
  return (
    <SolutionDetailTemplate
      solution={solution}
      slotBeforeFinalCTA={<InstallationVersatility />}
    />
  );
}
