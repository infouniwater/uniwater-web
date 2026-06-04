import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water-problem checker',
  description:
    '60-second quiz. Tell us what you’ve noticed; get a sized solution, hardness band, and the next step. No contact details until the result.',
  openGraph: {
    images: [{ url: '/og/og-water-problem-checker.jpg', width: 1200, height: 630, alt: '' }],
  },
  twitter: {
    images: ['/og/og-water-problem-checker.jpg'],
  },
};

export default function CheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
