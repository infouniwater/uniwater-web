'use client';

/**
 * Shared browser-side conversion tracking for the Nepal WaaS landing page.
 *
 * One module so every WhatsApp CTA on the page (hero, DM card, sticky
 * mobile bar, form-area link) fires the SAME Meta `Contact` + GA4
 * `contact` pair through one code path -- no per-call-site copies that
 * can drift. The browser pixel base code (fbq) and gtag.js are loaded
 * globally in app/layout.tsx; this module only fires events, never
 * re-inits the pixel.
 *
 * Both fns are best-effort: if fbq / gtag isn't on the window (local dev
 * without Meta/GA wiring, an ad blocker, or first paint before the loader
 * script runs) they silently no-op so a tracking failure can never block
 * the conversion path the visitor came for.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a Meta standard event. Silently skips if fbq isn't present. */
export function metaTrack(event: string, payload?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    window.fbq('track', event, payload);
  } catch {
    /* silent -- pixel failures must never block the conversion path */
  }
}

/** Fire a GA4 event. Silently skips if gtag isn't present. */
export function gaTrack(event: string, payload?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', event, payload);
  } catch {
    /* silent */
  }
}

// Double-fire guard. A single visitor click should produce exactly one
// Contact. This catches the cases that would otherwise double-count: a
// strict-mode/duplicated handler, or two CTAs tapped in the same gesture
// window. Two genuinely-separate Contact intents within 500ms are the
// same conversion to Meta anyway, so collapsing them is the right call.
let lastContactFiredAt = 0;

/**
 * Fire `Contact` for a WhatsApp CTA click -- Meta `Contact` + GA4
 * `contact` (method: whatsapp) together. Called from every wa.me CTA on
 * the page via one shared path so the campaign's Contact optimisation is
 * fed consistently. Guarded against double-firing on a single click.
 *
 * `payload` carries call-site attribution (e.g. { source: 'hero' }); it
 * is merged into both the Meta and GA event params.
 */
export function trackWhatsAppContact(payload?: Record<string, unknown>): void {
  const now = Date.now();
  if (now - lastContactFiredAt < 500) return;
  lastContactFiredAt = now;

  metaTrack('Contact', payload);
  gaTrack('contact', { method: 'whatsapp', ...payload });
}
