import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remote site survey',
  description:
    'For NRI buyers, out-of-city projects, and pre-construction enquiries. Tell us the property and symptoms. Remote design and quote within 48 hours.',
};

export default function RemoteSurveyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
