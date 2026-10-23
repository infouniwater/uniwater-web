'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Browser-side conversion fires on /thank-you.
 *
 * GA4 generate_lead is NOT fired here any more. reCAPTCHA-blocked bots are
 * redirected to /thank-you too (so they get no signal that they were
 * blocked), which made most of the browser-fired generate_lead count bots.
 * It is now sent server-side by app/actions/leads.ts (lib/ga-mp.ts), only for
 * a lead that was actually saved.
 *
 * Nepal-WaaS fires fbq('track', 'Lead') AND fbq('track', 'Contact') here
 * (browser pixel, on the success redirect only). Lead is the high-intent
 * form-only signal; Contact is fired too because the ad campaign optimises
 * for Contact, so both the WhatsApp-CTA path and a successful form submit
 * must feed it. The /thank-you redirect is the single explicit success
 * signal we have on the browser side.
 *
 * Lead dedup: the server action mints an eventId, sends it to Meta CAPI
 * with the server-side Lead, and forwards it through the redirect URL
 * (?eventId=). We attach it to the browser Lead via fbq's { eventID }
 * option so Meta collapses the CAPI + browser Lead into one conversion.
 * Contact has no CAPI counterpart, so it's fired without an eventID.
 */
const VALUE_INR: Record<string, number> = {
  'nepal-waas': 200000,
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
  const fbqFired = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!source || !FBQ_LEAD_SOURCES.has(source)) return;
    const value = VALUE_INR[source] ?? 0;

    // fbevents.js may not be ready the instant this mounts (Script
    // afterInteractive timing), so poll briefly until it loads.
    let attempts = 0;
    const fire = () => {
      if (!fbqFired.current && typeof window.fbq === 'function') {
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
      if (!fbqFired.current && attempts++ < 30) setTimeout(fire, 200);
    };

    fire();
  }, [source, eventId]);

  return null;
}
