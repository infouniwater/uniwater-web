import Script from 'next/script';
import { MetaPixelRouteTracker } from './MetaPixelRouteTracker';

/**
 * Meta (Facebook/Instagram) browser pixel.
 *
 * PageView fires exactly once per page load + once per client-side route
 * change:
 *   - Initial load: the inline snippet below fires PageView, guarded by a
 *     `window` flag so that even if Next re-executes the inline
 *     afterInteractive script during hydration (a known cause of the
 *     duplicate "PageView fired twice" Pixel-Helper warning), the track
 *     call runs only once. The loader IIFE and fbq('init') are already
 *     idempotent (the `if(f.fbq)return` guard + fbq's internal init
 *     dedupe); only the bare fbq('track','PageView') needed guarding.
 *   - Soft navigations: fbq does NOT auto-track App-Router route changes,
 *     so <MetaPixelRouteTracker/> fires PageView on each subsequent
 *     pathname change (mirrors the GoogleAnalyticsRouteTracker pattern).
 *
 * Custom events (Lead, Contact, Schedule, etc.) are fired SERVER-SIDE via
 * CAPI in app/actions/leads.ts, and browser-side at the relevant CTAs /
 * the /thank-you success page. This component only owns PageView.
 *
 * Reads NEXT_PUBLIC_META_PIXEL_ID. Renders nothing if unset, so local dev
 * (without Meta wiring) shows no pixel.
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        // The Meta-provided snippet, with the Pixel ID parameterised. The
        // `n.callMethod` shim lets fbq() calls queue until fbevents.js loads.
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            if(!window._uwMetaPageViewSent){window._uwMetaPageViewSent=!0;fbq('track','PageView');}
          `,
        }}
      />
      {/* Soft-navigation PageView. The inline snippet only fires on the
          initial document load; fbq doesn't auto-track App-Router route
          changes, so this client component covers them. */}
      <MetaPixelRouteTracker />
      {/* No-script fallback so users with JS disabled still register PageView. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
