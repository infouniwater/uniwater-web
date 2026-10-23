/**
 * GA4 Measurement Protocol — generate_lead, sent from the server.
 *
 * Env vars:
 *   GA4_API_SECRET                 — GA Admin → Data streams → (web stream) →
 *                                    Measurement Protocol API secrets.
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID  — optional; defaults to G-9ZSTP2BXMR
 *                                    (components/layout/GoogleAnalytics.tsx).
 *
 * Fired from app/actions/leads.ts only for a lead that was actually saved.
 * It used to be fired by the browser on /thank-you, which reCAPTCHA-blocked
 * bots are also redirected to, so most of the old generate_lead count was
 * bots. The visitor's own _ga / _ga_<id> cookies tie the event to their
 * session, so it carries their source / medium in GA. Never throws.
 */

const DEFAULT_GA_ID = 'G-9ZSTP2BXMR';
const ENDPOINT = 'https://www.google-analytics.com/mp/collect';

export interface GaCookies {
  /** Value of the `_ga` cookie, e.g. "GA1.1.123456789.1700000000". */
  ga?: string;
  /** Value of the `_ga_<container>` session cookie. */
  gaSession?: string;
}

export function measurementId(): string {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_ID;
}

/** "GA1.1.123456789.1700000000" -> "123456789.1700000000". */
function clientIdFrom(ga?: string): string | undefined {
  const parts = (ga ?? '').split('.');
  return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : undefined;
}

/** GS1.1.<session>.… or GS2.1.s<session>$o… -> the session id. */
function sessionIdFrom(gaSession?: string): string | undefined {
  const v = gaSession ?? '';
  const gs2 = v.match(/^GS2\.\d+\.s(\d+)/);
  if (gs2) return gs2[1];
  const parts = v.split('.');
  return v.startsWith('GS1.') && parts.length >= 3 ? parts[2] : undefined;
}

export async function sendGenerateLead(input: {
  form: string;
  value?: number;
  cookies: GaCookies;
  /** Route the hit to GA DebugView (used for TEST - IGNORE submissions). */
  debug?: boolean;
}): Promise<void> {
  const secret = process.env.GA4_API_SECRET;
  if (!secret) return;

  // No _ga cookie (GA blocked, or cookies cleared): still count the lead,
  // under a one-off client id.
  const clientId =
    clientIdFrom(input.cookies.ga) ??
    `${Math.floor(Math.random() * 2_147_483_647)}.${Math.floor(Date.now() / 1000)}`;
  const sessionId = sessionIdFrom(input.cookies.gaSession);

  const params: Record<string, string | number> = {
    form: input.form,
    currency: 'INR',
    value: input.value ?? 0,
    engagement_time_msec: 1,
  };
  if (sessionId) params.session_id = sessionId;
  if (input.debug) params.debug_mode = 1;

  const url = `${ENDPOINT}?measurement_id=${encodeURIComponent(measurementId())}&api_secret=${encodeURIComponent(secret)}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
      body: JSON.stringify({ client_id: clientId, events: [{ name: 'generate_lead', params }] }),
    });
    if (!res.ok) console.error(`[ga-mp] HTTP ${res.status}`);
  } catch (err) {
    console.error('[ga-mp] generate_lead failed:', err);
  }
}
