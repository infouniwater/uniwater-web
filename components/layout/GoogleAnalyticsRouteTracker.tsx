'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires a fresh GA4 page_view on every client-side route change
 * (SPA soft navigation). The initial hard-load page_view is sent
 * automatically by gtag's own auto-tracking -- we do NOT suppress
 * it, because relying on this Client component for the first hit
 * is fragile (Script strategy timing, ad blockers that load the
 * page but break gtag, hydration errors). Letting gtag self-fire
 * means even if this component never mounts, every hard navigation
 * still records a page_view.
 *
 * We skip the first useEffect run so the initial mount doesn't
 * double-count alongside gtag's auto fire. From the second pathname
 * change onward (i.e. real soft navigations), we send an explicit
 * page_view via gtag('event', ...).
 *
 * Deliberately does NOT use useSearchParams -- that would force a
 * Suspense boundary on the static-build path, and Next would render
 * fallback={null} into SSR. Query strings are read from
 * window.location at fire time instead.
 */
export function GoogleAnalyticsRouteTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    const url = pathname + (window.location.search || '');
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
      send_to: measurementId,
    });
  }, [pathname, measurementId]);

  return null;
}
