import Script from 'next/script';
import { GoogleAnalyticsRouteTracker } from './GoogleAnalyticsRouteTracker';

/**
 * Google Analytics 4 (GA4) loader.
 *
 * Server Component on purpose — mirrors the MetaPixel shape so the
 * <Script> tags land in the static HTML at build time. The earlier
 * Client + Suspense wrapper meant the tags were never emitted into
 * SSR output (fallback={null} rendered instead), so gtag never loaded
 * on first paint and Realtime never saw a hit. Route-change page_view
 * tracking lives in the sibling Client component below.
 *
 * Active GA4 stream (wired 2026-06-08):
 *   Name:           "Home Page"
 *   URL:            https://uniwater.co.in
 *   Stream ID:      3843302977
 *   Measurement ID: G-9ZSTP2BXMR
 *
 * The Measurement ID is public by design (it ships in every gtag.js
 * URL), so the default is hardcoded. NEXT_PUBLIC_GA_MEASUREMENT_ID
 * overrides if Rajat ever wires a different property.
 */
const DEFAULT_GA_ID = 'G-9ZSTP2BXMR';

export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_ID;
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
      <GoogleAnalyticsRouteTracker measurementId={id} />
    </>
  );
}
