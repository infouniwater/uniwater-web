import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'What we install. From a single bathroom to a 30,000 LPH building plant — surveyed before sold, hidden after, serviced monthly. Residential + B2B.',
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
