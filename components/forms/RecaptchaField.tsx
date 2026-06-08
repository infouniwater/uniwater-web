'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Renders a single hidden <input name="recaptcha_token"> inside the form
 * and keeps it populated with a fresh reCAPTCHA v3 token.
 *
 * Lifecycle:
 *   1. Component mounts. useEffect kicks off a polling loop that waits
 *      for window.grecaptcha to be defined (loaded by
 *      <RecaptchaLoader /> in app/layout.tsx).
 *   2. Once available, grecaptcha.execute(siteKey, {action}) returns a
 *      token tied to the action label. The token is written to the
 *      hidden input.
 *   3. v3 tokens expire after 2 minutes. We refresh every 90 seconds
 *      so the input always has a valid token by the time the user
 *      submits, however long they linger on the form.
 *
 * If NEXT_PUBLIC_RECAPTCHA_SITE_KEY is unset (local dev, or before the
 * user adds the env vars in Vercel), the effect short-circuits and the
 * input stays empty. The server-side verify in lib/recaptcha-server.ts
 * is also gated on RECAPTCHA_SECRET_KEY, so the empty token is accepted
 * (fail-open) until both keys are configured.
 *
 * `action` identifies the form for reCAPTCHA analytics + server-side
 * action-mismatch detection. Pick a stable, alphanumeric string per
 * form (e.g. "nepal_waas", "book_survey"). The server action must
 * pass the SAME string to verifyRecaptcha().
 */
interface Props {
  action: string;
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function RecaptchaField({ action }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!SITE_KEY || typeof window === 'undefined') return;

    let cancelled = false;
    let attempts = 0;

    const refresh = () => {
      if (cancelled) return;

      if (!window.grecaptcha?.execute) {
        // Script not loaded yet -- retry up to ~30s, then give up.
        // After give-up the hidden input stays empty; server side will
        // reject with reason 'no-token', and the silent /thank-you
        // redirect protects against a bot probing for state.
        if (attempts++ < 60) setTimeout(refresh, 500);
        return;
      }

      window.grecaptcha.ready(() => {
        window
          .grecaptcha!.execute(SITE_KEY!, { action })
          .then((token) => {
            if (cancelled) return;
            if (inputRef.current) inputRef.current.value = token;
          })
          .catch(() => {
            /* silent -- next 90s refresh will retry */
          });
      });
    };

    refresh();
    const interval = setInterval(refresh, 90_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [action]);

  return <input ref={inputRef} type="hidden" name="recaptcha_token" defaultValue="" />;
}
