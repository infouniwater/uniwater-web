'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
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
    };

    fire();
  }, [source]);

  return null;
}
