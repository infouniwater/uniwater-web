'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Meta `PageView` on every client-side route change (SPA soft
 * navigation). The initial hard-load PageView is fired by the inline
 * snippet in <MetaPixel/> -- we skip the first effect run here so the two
 * don't double-count on the same load.
 *
 * Unlike GA4's gtag, fbq does NOT auto-track App-Router navigations, so
 * without this component every soft navigation after the first would
 * record zero PageViews. From the second pathname onward we fire an
 * explicit fbq('track','PageView').
 *
 * Deliberately mirrors GoogleAnalyticsRouteTracker: usePathname (not
 * useSearchParams, which would force a Suspense boundary and render
 * fallback={null} into the static-build SSR output), first-run skip, and
 * a best-effort fbq guard.
 */
export function MetaPixelRouteTracker() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    window.fbq('track', 'PageView');
  }, [pathname]);

  return null;
}
