'use client';

import { useEffect } from 'react';
import { getAttribution, sourceLabel } from '@/lib/attribution';

/**
 * Records where the visitor came from (lib/attribution.ts) and makes
 * WhatsApp enquiries traceable.
 *
 * Most enquiries arrive on WhatsApp, where nothing told the team which
 * page or source the person came from. On a click on any wa.me link this
 * fills in the prefilled message: an empty one gets the page the visitor
 * is on, and a visitor who came from an AI assistant or a search engine
 * gets a short "(via ChatGPT)" suffix. Messages that already carry a tag,
 * like the Nepal page's "(src: …)", are left alone.
 *
 * One delegated listener, so links added later are covered too.
 */
const WA_LINK = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i;

function pageLabel(): string {
  return document.title.replace(/\s*[|—-]\s*Uniwater\s*$/, '').trim();
}

export function AttributionCapture() {
  useEffect(() => {
    getAttribution();

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      const href = link?.getAttribute('href') ?? '';
      if (!link || !WA_LINK.test(href)) return;
      try {
        const url = new URL(href);
        let text = url.searchParams.get('text') ?? '';
        if (/\((src|via)[: ]/.test(text)) return;

        const before = text;
        if (!text) {
          const page = pageLabel();
          text = page
            ? `Hi Uniwater, I was reading your page on ${page} and have a question.`
            : 'Hi Uniwater, I have a question.';
        }
        const label = sourceLabel(getAttribution());
        if (label) text += ` (via ${label})`;
        if (text === before) return;

        url.searchParams.set('text', text);
        // URLSearchParams writes spaces as "+"; wa.me wants %20.
        link.setAttribute('href', url.toString().replace(/\+/g, '%20'));
      } catch {
        /* leave the link as it was */
      }
    };

    // Capture phase, so the href is rewritten before the browser follows it.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
