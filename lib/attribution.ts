/**
 * Where a visitor came from, kept in the browser so a lead can carry it.
 *
 * GA4 knows the source of a session but a lead in the CRM did not: the
 * forms only recorded the page they were submitted from. This stores the
 * last known outside source (a UTM tag or an external referrer, e.g.
 * chatgpt.com), the page the visitor landed on, and when. A later visit
 * with no source ("direct") keeps the earlier one, the same rule GA4 uses.
 *
 * No personal data: a source name, a path and a timestamp, in
 * localStorage, dropped after 30 days. Every storage call is guarded, so
 * a private window or blocked storage only means the lead has no source.
 */

export interface Attribution {
  /** utm_source, else the referring host, else "direct". */
  source: string;
  medium: string;
  campaign: string;
  /** Path of the first page of that visit, without the query string. */
  landing: string;
  /** Full referring host ("" for direct or internal). */
  referrer: string;
  /** Epoch ms when this was captured. */
  at: number;
}

const KEY = 'uw_attribution';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const OWN_HOSTS = /(^|\.)uniwater\.(co\.in|in)$/i;

let cached: Attribution | null | undefined;

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed || typeof parsed.at !== 'number' || Date.now() - parsed.at > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function externalReferrerHost(): string {
  try {
    if (!document.referrer) return '';
    const host = new URL(document.referrer).hostname.replace(/^www\./, '');
    return host === window.location.hostname.replace(/^www\./, '') || OWN_HOSTS.test(host) ? '' : host;
  } catch {
    return '';
  }
}

/**
 * Reads this page load's source and returns the attribution to use.
 * Safe to call from several components: the work happens once per load.
 */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  if (cached !== undefined) return cached;

  const stored = readStored();
  const search = new URLSearchParams(window.location.search);
  const utmSource = (search.get('utm_source') ?? '').trim();
  const referrer = externalReferrerHost();

  const current: Attribution = {
    source: (utmSource || referrer || 'direct').slice(0, 100),
    medium: (search.get('utm_medium') ?? '').trim().slice(0, 100),
    campaign: (search.get('utm_campaign') ?? '').trim().slice(0, 100),
    landing: window.location.pathname.slice(0, 200),
    referrer: referrer.slice(0, 100),
    at: Date.now(),
  };

  // A visit with a real source replaces what we had. A direct visit only
  // counts when there is nothing stored.
  const next = current.source !== 'direct' || !stored ? current : stored;
  if (next === current) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(current));
    } catch {
      /* storage blocked or full */
    }
  }
  cached = next;
  return next;
}

const FRIENDLY: Array<[RegExp, string]> = [
  [/chatgpt|openai/i, 'ChatGPT'],
  [/perplexity/i, 'Perplexity'],
  [/copilot/i, 'Copilot'],
  [/gemini|bard/i, 'Gemini'],
  [/claude/i, 'Claude'],
  [/google/i, 'Google'],
  [/bing/i, 'Bing'],
];

/**
 * A short name for the source, for the prefilled WhatsApp message. Only
 * AI assistants and search engines get one; ad campaigns and social
 * referrers return "" so the visitor's message stays clean.
 */
export function sourceLabel(a: Attribution | null): string {
  if (!a) return '';
  for (const [pattern, label] of FRIENDLY) if (pattern.test(a.source)) return label;
  return '';
}
