'use client';

import { useEffect, useState } from 'react';

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
}

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
] as const satisfies ReadonlyArray<keyof UtmParams>;

const STORAGE_KEY = 'uniwater_nepal_utm';

const EMPTY: UtmParams = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
  fbclid: '',
};

function readUrl(): UtmParams | null {
  if (typeof window === 'undefined') return null;
  const search = new URLSearchParams(window.location.search);
  const out: UtmParams = { ...EMPTY };
  let hasAny = false;
  for (const k of UTM_KEYS) {
    const v = search.get(k);
    if (v) {
      out[k] = v;
      hasAny = true;
    }
  }
  return hasAny ? out : null;
}

function readStorage(): UtmParams | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UtmParams>;
    return { ...EMPTY, ...parsed };
  } catch {
    return null;
  }
}

function writeStorage(p: UtmParams): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* quota-exceeded / disabled storage -- silent */
  }
}

/**
 * Captures UTM + fbclid parameters from the URL on first mount and
 * persists them in sessionStorage so they survive in-page navigation
 * (the CompactPlansTable's ?plan= soft-nav clears the original
 * query but the storage copy stays). Subsequent mounts read the
 * stored copy if the URL has nothing fresh.
 *
 * Returns an always-defined UtmParams shape so callers can read
 * `utm_campaign` without null-guarding -- unknown values are empty
 * strings, which the form / WhatsApp suffix logic treats as "skip".
 */
export function useUtmCapture(): UtmParams {
  const [utms, setUtms] = useState<UtmParams>(EMPTY);

  useEffect(() => {
    const fromUrl = readUrl();
    if (fromUrl) {
      writeStorage(fromUrl);
      setUtms(fromUrl);
      return;
    }
    const fromStorage = readStorage();
    if (fromStorage) setUtms(fromStorage);
  }, []);

  return utms;
}

/**
 * Picks the most useful single token to advertise inside a WhatsApp
 * prefill suffix. Campaign first (typically the most legible), then
 * source, then fbclid as a last resort. Returns "" if nothing useful
 * is captured -- callers should skip the suffix in that case.
 */
export function utmSourceTag(p: UtmParams): string {
  return p.utm_campaign || p.utm_source || (p.fbclid ? 'meta-click' : '');
}

/**
 * Appends a compact " (src: X)" tag to an existing wa.me URL's
 * prefilled text, preserving the original message verbatim. The URL
 * shape is wa.me/<phone>?text=<encoded>; we decode the text, append
 * the suffix, re-encode, and put it back. If the URL doesn't match
 * the wa.me?text= shape, returns it unchanged.
 */
export function appendUtmToWhatsAppHref(href: string, p: UtmParams): string {
  const tag = utmSourceTag(p);
  if (!tag) return href;
  try {
    const url = new URL(href);
    const text = url.searchParams.get('text');
    if (!text) return href;
    url.searchParams.set('text', `${text} (src: ${tag})`);
    return url.toString();
  } catch {
    return href;
  }
}
