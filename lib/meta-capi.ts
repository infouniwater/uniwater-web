/**
 * Meta Conversions API (CAPI) — server-side event tracking that complements
 * the browser Pixel.
 *
 * Why server-side: iOS Safari, Chrome 3rd-party-cookie deprecation, and ad
 * blockers kill ~30-40% of browser-pixel events. CAPI sends the same event
 * directly from our server to Meta's Graph API with hashed PII for matching,
 * recovering attribution that the pixel alone misses.
 *
 * Env vars:
 *   NEXT_PUBLIC_META_PIXEL_ID  — 15-digit pixel ID (also used by the browser
 *                                pixel script in <MetaPixel/>)
 *   META_CAPI_ACCESS_TOKEN     — long-lived access token from Events Manager
 *                                → Conversions API → Generate Access Token
 *
 * If either is unset, every call is a silent no-op so local dev works
 * without Meta wiring. Failures are logged, never thrown — a Meta hiccup
 * must not block the Odoo lead write or the /thank-you redirect.
 *
 * PII hashing: Meta requires email/phone/name to be SHA-256 of the
 * normalised (lowercase, trimmed, digits-only for phone) value. The hash
 * is what we send; raw PII never leaves our server toward Meta.
 */

import { createHash } from 'crypto';

const GRAPH_VERSION = 'v18.0';
const ENDPOINT = `https://graph.facebook.com/${GRAPH_VERSION}`;

/** Meta-standard event names. See https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/standard-events. */
export type MetaEventName =
  | 'Lead'                  // someone expressed interest (most of our forms)
  | 'CompleteRegistration'  // signup-style action
  | 'Contact'               // contact form
  | 'Schedule'              // book-a-survey / appointment
  | 'SubmitApplication';    // RFQ / formal application

function sha256(s: string): string {
  return createHash('sha256').update(s).digest('hex');
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Cities Uniwater serves in Nepal. Used to infer country code for phone
 * normalisation and the hashed country field. Matched as substring against
 * the city field after lowercase-trim, so common variants (e.g. "Lalitpur,
 * Kathmandu Valley") still resolve correctly.
 */
const NEPAL_CITY_TOKENS = [
  'kathmandu',
  'biratnagar',
  'pokhara',
  'lalitpur',
  'bhaktapur',
  'patan',
];

function inferCountry(city?: string): 'in' | 'np' {
  if (!city) return 'in';
  const norm = city.trim().toLowerCase();
  return NEPAL_CITY_TOKENS.some((token) => norm.includes(token)) ? 'np' : 'in';
}

function normalizePhone(phone: string, country: 'in' | 'np' = 'in'): string {
  // Strip everything that isn't a digit; if the value is a bare 10-digit
  // mobile, prefix the country dial code (+91 India / +977 Nepal). Already
  // E.164-prefixed numbers pass through unchanged.
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return (country === 'np' ? '977' : '91') + digits;
  }
  return digits;
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * Send a single conversion event to Meta CAPI.
 *
 * @param input - lead fields collected from the form
 */
export async function sendMetaLeadEvent(input: {
  eventName: MetaEventName;
  /** Plain-text email — will be SHA-256 hashed before send. */
  email?: string;
  /** Plain-text phone — will be normalised + SHA-256 hashed before send. */
  phone?: string;
  /** Plain-text name — will be SHA-256 hashed before send. */
  name?: string;
  /** Plain-text city — will be SHA-256 hashed before send. */
  city?: string;
  /** URL the visitor was on when the event fired. Helps Meta attribution. */
  sourceUrl?: string;
  /** Client IP + UA if available (only for headed requests). */
  clientIp?: string;
  clientUserAgent?: string;
  /**
   * Optional deduplication ID. If the browser pixel ALSO fires the same
   * event with the same event_id, Meta will deduplicate so the conversion
   * counts once. For form-submit Lead events the browser doesn't fire a
   * matching event (the form is server-action submitted), so this is
   * usually omitted.
   */
  eventId?: string;
  /**
   * Optional value+currency for events that have a quote, e.g. an RFQ.
   * Skip for free-survey Leads.
   */
  value?: number;
  currency?: string;
}): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) {
    return;
  }

  // Country is inferred from the city field — Nepal customers (Kathmandu,
  // Biratnagar, etc.) get the 'np' hash + +977 phone prefix so Meta can
  // match them against its Nepal-side user data. Default is India.
  const country = inferCountry(input.city);

  const userData: Record<string, string | string[]> = {};
  if (input.email) userData.em = sha256(normalizeEmail(input.email));
  if (input.phone) userData.ph = sha256(normalizePhone(input.phone, country));
  if (input.name) {
    // Single-field name → use as both fn (first name) and a hashed full
    // name. Meta's matching is best-effort, more hashed signals = better.
    userData.fn = sha256(normalizeName(input.name.split(' ')[0]));
    const lastName = input.name.split(' ').slice(1).join(' ').trim();
    if (lastName) userData.ln = sha256(normalizeName(lastName));
  }
  if (input.city) userData.ct = sha256(normalizeName(input.city));
  userData.country = sha256(country);
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent;

  const event: Record<string, unknown> = {
    event_name: input.eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    user_data: userData,
  };
  if (input.sourceUrl) event.event_source_url = input.sourceUrl;
  if (input.eventId) event.event_id = input.eventId;
  if (typeof input.value === 'number') {
    event.custom_data = {
      value: input.value,
      currency: input.currency ?? 'INR',
    };
  }

  try {
    const url = `${ENDPOINT}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ data: [event] }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(`[meta-capi] ${res.status}: ${body.slice(0, 400)}`);
      return;
    }
    // Successful CAPI responses look like { events_received: 1, messages: [], fbtrace_id: '...' }
    // We don't need to inspect — logging only on failure.
  } catch (err) {
    console.error('[meta-capi] request failed:', err);
  }
}
