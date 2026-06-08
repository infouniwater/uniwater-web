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
 * Fires a fresh GA4 page_view on every page mount + soft navigation.
 *
 * GoogleAnalytics inits gtag with `send_page_view: false`, so the auto
 * page_view that gtag normally fires on load is suppressed. We send
 * every page_view explicitly from here -- the useEffect runs on first
 * mount (initial hard load) AND on every pathname change (App Router
 * soft navigation), so every route lands exactly one page_view.
 *
 * IMPORTANT: gtag('config', ...) does NOT emit a page_view -- it only
 * updates config. The fire must use gtag('event', 'page_view', ...).
 * An earlier version of this file used config() and silently dropped
 * every hit, which is why Realtime showed zero users.
 *
 * Deliberately does NOT use useSearchParams -- that would force this
 * component into a Suspense boundary on the static-build path, and
 * Next would render fallback={null} into SSR. Query strings are read
 * from window.location at fire time instead.
 */
export function GoogleAnalyticsRouteTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // gtag.js loads via <Script strategy="afterInteractive">, so on the
    // very first mount it may not be defined yet. Poll briefly so we
    // don't drop the initial page_view; cap retries so a permanently
    // missing gtag (ad blocker) doesn't loop forever.
    let attempts = 0;
    const send = () => {
      if (typeof window.gtag !== 'function') {
        if (attempts++ < 20) setTimeout(send, 150);
        return;
      }
      const url = pathname + (window.location.search || '');
      window.gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
        send_to: measurementId,
      });
    };
    send();
  }, [pathname, measurementId]);

  return null;
}
