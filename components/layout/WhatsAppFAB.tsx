'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PRIMARY_PHONE_E164 } from '@/content/site';

/**
 * Mobile-only floating WhatsApp button (BLUEPRINT §3.14 + Critique §1.29).
 *
 * Hidden on the form / B2B audience pages where the primary CTA is a survey or
 * RFQ, not a WhatsApp chat. Pre-fills the message with the current page title
 * stripped of the " — Uniwater" template suffix.
 */

// Hide on routes whose primary CTA is a structured form (BLUEPRINT §12.5 CTA verb discipline).
// /nepal/water-as-a-service renders its own per-page sticky WhatsApp CTA
// (campaign-tagged messages, browser-side Pixel events), so the global FAB
// is hidden there to avoid a double-CTA stack at the bottom of the page.
const HIDDEN_PATHS = [
  '/book-survey',
  '/remote-site-survey',
  '/water-problem-checker',
  '/industrial',
  '/nepal/water-as-a-service',
];

export function WhatsAppFAB() {
  const pathname = usePathname();
  const [pageLabel, setPageLabel] = useState('this page');

  useEffect(() => {
    const title = document.title.replace(/\s*[—-]\s*Uniwater\s*$/, '').trim();
    setPageLabel(title || 'this page');
  }, [pathname]);

  const inFormOrB2BFlow = HIDDEN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
  // Solution detail pages render their own SolutionStickyCTA in the bottom-right.
  // Hide the FAB there to avoid collision, but keep it on the /solutions index.
  const inSolutionDetail = pathname.startsWith('/solutions/');
  if (inFormOrB2BFlow || inSolutionDetail) return null;

  const message = `Hi Uniwater, I have a question about ${pageLabel}`;
  const href = `https://wa.me/${PRIMARY_PHONE_E164}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Uniwater on WhatsApp"
      className="md:hidden fixed bottom-4 right-4 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-teal text-offwhite shadow-[0_4px_12px_rgba(5,69,95,0.25)] hover:bg-navy transition-colors duration-200 ease-calm focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
      </svg>
    </a>
  );
}
