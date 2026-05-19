import Script from 'next/script';

/**
 * Meta (Facebook/Instagram) browser pixel. Fires PageView on every route
 * change in Next.js's app router automatically — fbq() persists across
 * client navigations.
 *
 * Custom events (Lead, Schedule, etc.) are fired SERVER-SIDE via CAPI in
 * app/actions/leads.ts. Browser-side custom events aren't needed because
 * form submits route through server actions, not client-side fetch.
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
            fbq('track', 'PageView');
          `,
        }}
      />
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
