import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'What we install, from a single bathroom filter to a 30,000 LPH building plant. Surveyed before we quote, hidden in the building and serviced monthly. Homes and businesses.',
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
