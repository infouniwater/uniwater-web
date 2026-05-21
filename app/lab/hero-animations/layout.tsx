import type { Metadata } from 'next';

// LAB PAGE — internal review only. Delete after hero animation direction is finalised.
// Created 2026-05-22 per Rajat's hero-animations-lab brief. Not linked from
// the production site; not in the sitemap; reachable only by direct URL.

export const metadata: Metadata = {
  title: 'Hero Animation Lab — internal review',
  description: 'Internal review page for evaluating hero animation candidates. Not public.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
