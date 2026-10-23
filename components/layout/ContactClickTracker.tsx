'use client';

import { useEffect } from 'react';

/**
 * GA4 contact_click for every WhatsApp, phone and email link on the site —
 * WhatsAppFAB, footer, contact page, error page, the LeadForm fallback,
 * anything added later. One delegated listener instead of an onClick per
 * link, so a new link is tracked without anyone remembering to wire it.
 *
 * Fires gtag('event', 'contact_click', { method, page }) with
 * method = 'whatsapp' | 'phone' | 'email'. Skipped for automated browsers
 * (navigator.webdriver), so headless traffic can't inflate the key event.
 * transport_type 'beacon' lets the hit survive the page handing off to the
 * dialler / mail app / WhatsApp.
 */
function methodFor(href: string): 'whatsapp' | 'phone' | 'email' | null {
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i.test(href)) return 'whatsapp';
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('mailto:')) return 'email';
  return null;
}

export function ContactClickTracker() {
  useEffect(() => {
    if (navigator.webdriver) return;

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const method = methodFor(link.getAttribute('href') ?? '');
      if (!method || typeof window.gtag !== 'function') return;
      window.gtag('event', 'contact_click', {
        method,
        page: window.location.pathname,
        transport_type: 'beacon',
      });
    };

    // Capture phase: still sees clicks whose handlers stop propagation.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
