'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires GA4 generate_lead on the /thank-you page after a successful
 * form submission redirect. Living here (not in the form's onSubmit)
 * is deliberate: when the form posts via Server Action and the action
 * calls redirect(), the page unloads BEFORE gtag.js can flush its
 * /g/collect beacon, and the event is silently dropped. The redirect
 * URL carries ?source=<form-slug>, so by the time this component
 * mounts the navigation has completed, gtag is loaded, and the hit
 * lands cleanly.
 *
 * Nepal-WaaS additionally fires fbq('track', 'Lead') here (browser
 * pixel, on confirmed success only). The form-side onSubmit fire was
 * removed because it double-counted alongside the server-side CAPI
 * Lead event AND fired on every submit attempt regardless of whether
 * the action actually succeeded. The /thank-you redirect is the
 * single explicit success signal we have on the browser side; firing
 * fbq here keeps the browser pixel count honest and matches the
 * gtag pattern in this file. Other thank-you sources keep their
 * existing pre-redirect fbq behaviour (their own onSubmit handlers).
 *
 * value INR is per-form to match META_VALUE_* on the CAPI side
 * (app/actions/leads.ts). GA4 sums these into total lead value for
 * cost-per-lead and ROAS reporting once 'generate_lead' is marked as
 * a Key Event in the GA admin.
 */
const VALUE_INR: Record<string, number> = {
  'nepal-waas': 200000,
  'industrial-rfq': 200000,
  'book-survey': 25000,
  'remote-site-survey': 25000,
  contact: 10000,
};

// Sources whose browser-side fbq('Lead') is owned by this component
// (rather than by the originating form's onSubmit). Nepal-WaaS is the
// only one for now -- adding to this set is a deliberate decision, not
// a default.
const FBQ_LEAD_SOURCES: ReadonlySet<string> = new Set(['nepal-waas']);

export function ThankYouConversionFire({ source }: { source?: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (typeof window === 'undefined') return;

    let attempts = 0;
    const fire = () => {
      if (typeof window.gtag !== 'function') {
        if (attempts++ < 30) setTimeout(fire, 200);
        return;
      }
      fired.current = true;
      const value = source && VALUE_INR[source] ? VALUE_INR[source] : 0;
      window.gtag('event', 'generate_lead', {
        currency: 'INR',
        value,
        source: source ?? 'unknown',
      });

      // Browser pixel: fire only for sources we've taken over from
      // their form's onSubmit (currently nepal-waas). fbq is best-
      // effort -- a missing pixel just silently skips this; the
      // server-side CAPI Lead event continues to fire from the action.
      if (source && FBQ_LEAD_SOURCES.has(source) && typeof window.fbq === 'function') {
        try {
          window.fbq('track', 'Lead', {
            currency: 'INR',
            value,
            source,
          });
        } catch {
          /* silent */
        }
      }
    };

    fire();
  }, [source]);

  return null;
}
