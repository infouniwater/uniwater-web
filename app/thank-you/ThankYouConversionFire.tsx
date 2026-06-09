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
 * Nepal-WaaS additionally fires fbq('track', 'Lead') AND
 * fbq('track', 'Contact') here (browser pixel, on confirmed success
 * only). Lead is the high-intent form-only signal; Contact is fired too
 * because the ad campaign optimises for Contact, so both the WhatsApp-CTA
 * path and a successful form submit must feed it. The form-side onSubmit
 * fire was removed because it double-counted alongside the server-side
 * CAPI Lead event AND fired on every submit attempt regardless of whether
 * the action actually succeeded. The /thank-you redirect is the single
 * explicit success signal we have on the browser side; firing fbq here
 * keeps the browser pixel count honest and matches the gtag pattern in
 * this file. Other thank-you sources keep their existing pre-redirect
 * fbq behaviour (their own onSubmit handlers).
 *
 * Lead dedup: the server action mints an eventId, sends it to Meta CAPI
 * with the server-side Lead, and forwards it through the redirect URL
 * (?eventId=). We attach it to the browser Lead via fbq's { eventID }
 * option so Meta collapses the CAPI + browser Lead into one conversion.
 * Contact has no CAPI counterpart, so it's fired without an eventID.
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

export function ThankYouConversionFire({
  source,
  eventId,
}: {
  source?: string;
  eventId?: string;
}) {
  // Separate guards for the two trackers. They fire independently so a
  // blocked GA (gtag never loads) can't suppress the Meta conversion, and
  // vice-versa -- each fires exactly once.
  const gaFired = useRef(false);
  const fbqFired = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const value = source && VALUE_INR[source] ? VALUE_INR[source] : 0;
    // Only sources we've taken over from their form's onSubmit fire the
    // browser pixel here (currently nepal-waas).
    const wantsFbq = !!source && FBQ_LEAD_SOURCES.has(source);

    // gtag.js / fbevents.js may not be ready the instant this mounts
    // (Script afterInteractive timing), so poll briefly until each loads.
    // GA and the pixel are guarded + fired independently: a blocked GA
    // can't suppress the Meta conversion, and vice-versa, and each fires
    // exactly once.
    let attempts = 0;
    const fire = () => {
      // GA4 generate_lead.
      if (!gaFired.current && typeof window.gtag === 'function') {
        gaFired.current = true;
        window.gtag('event', 'generate_lead', {
          currency: 'INR',
          value,
          source: source ?? 'unknown',
        });
      }

      // Browser pixel Lead + Contact.
      if (wantsFbq && !fbqFired.current && typeof window.fbq === 'function') {
        fbqFired.current = true;
        try {
          // Lead -- high-intent form signal. eventID (when present) is the
          // shared dedup id from the server action so Meta merges this
          // browser Lead with the CAPI Lead into one conversion.
          window.fbq(
            'track',
            'Lead',
            { currency: 'INR', value, source },
            eventId ? { eventID: eventId } : undefined,
          );
          // Contact -- the campaign optimises for Contact, so a successful
          // form submit feeds it alongside the WhatsApp-CTA path. No CAPI
          // counterpart, so no eventID.
          window.fbq('track', 'Contact');
        } catch {
          /* silent */
        }
      }

      // Keep polling until both intended trackers have fired (or we give up).
      const gaDone = gaFired.current;
      const fbqDone = !wantsFbq || fbqFired.current;
      if ((!gaDone || !fbqDone) && attempts++ < 30) setTimeout(fire, 200);
    };

    fire();
  }, [source, eventId]);

  return null;
}
