'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Google Analytics 4 (GA4) loader + page-view tracker.
 *
 * The Measurement ID is public by design -- it ships in the gtag.js
 * URL that every browser fetches, so hardcoding it here is the
 * canonical pattern. NEXT_PUBLIC_GA_MEASUREMENT_ID overrides the
 * default if Rajat ever wires a different GA property.
 *
 * Why a custom page-view tracker:
 *   Next.js App Router does NOT fire a fresh PageView on client-side
 *   navigations (the gtag config only fires once at mount). So we
 *   suppress the auto page_view at init (`send_page_view: false`) and
 *   manually send one on every pathname / search-params change. This
 *   is the official Next.js + GA4 pattern.
 *
 * Wrapped in a Client Component because we need usePathname() +
 * useSearchParams(). The layout.tsx that mounts this wraps it in
 * <Suspense> so the parent stays a Server Component.
 */

// Active GA4 stream: "Landing Page" (Stream ID 3843302977), wired
// 2026-06-08. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in the Vercel project
// env to point at a different property.
const DEFAULT_GA_ID = 'G-9ZSTP2BXMR';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!id || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    window.gtag('config', id, { page_path: url });
  }, [id, pathname, searchParams]);

  if (!id) return null;

  return (
    <>
      <Script
        id="ga4-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}', { send_page_view: false });
          `,
        }}
      />
    </>
  );
}
