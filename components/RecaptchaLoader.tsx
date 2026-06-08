import Script from 'next/script';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * Loads Google reCAPTCHA v3's client script once per page. Sibling to
 * MetaPixel and GoogleAnalytics in app/layout.tsx -- mounted alongside
 * those so every page has access to window.grecaptcha by the time a
 * <RecaptchaField /> inside any form needs it.
 *
 * Renders nothing if NEXT_PUBLIC_RECAPTCHA_SITE_KEY is unset, so local
 * dev (without keys) doesn't ship a broken script tag pointing at an
 * unconfigured site. The matching <RecaptchaField /> short-circuits in
 * the same way, and the server-side verify in lib/recaptcha-server.ts
 * fails-open when RECAPTCHA_SECRET_KEY is unset, so the entire chain
 * stays no-op until both keys land in the env.
 */
export function RecaptchaLoader() {
  if (!SITE_KEY) return null;
  return (
    <Script
      id="recaptcha-v3-loader"
      src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
      strategy="afterInteractive"
    />
  );
}
