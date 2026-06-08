'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires a fresh GA4 page_view on every client-side route change.
 *
 * App Router does NOT auto-fire page_view on soft navigation, so we
 * suppress the auto event in GoogleAnalytics (`send_page_view: false`)
 * and re-issue config on every pathname change here.
 *
 * Deliberately does NOT use useSearchParams — that would force this
 * component into a Suspense boundary on the static-build path, and
 * Next would render fallback={null} into SSR (the bug we just fixed).
 * Query strings are read from window.location at fire time instead.
 */
export function GoogleAnalyticsRouteTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    const url = pathname + (window.location.search || '');
    window.gtag('config', measurementId, { page_path: url });
  }, [pathname, measurementId]);

  return null;
}
