'use client';

import { useUtmCapture, appendUtmToWhatsAppHref } from './useUtmCapture';
import { trackWhatsAppContact } from './pixel';

/**
 * Two-CTA primitive matching the hero's visual grammar: a rounded
 * pill (primary, WhatsApp deeplink) sitting beside a text-link with
 * arrow (secondary, scroll-to-form). Used in three places on the
 * Nepal landing:
 *   - Hero      (theme="on-navy")
 *   - DM card   (theme="on-light")
 *   - Sticky    (theme="on-light", layout="row")
 *
 * Theme toggles the colour treatment so the same component reads
 * cleanly on a navy background AND on the offwhite/tint backgrounds
 * the rest of the page uses.
 *
 * Layout has two modes:
 *   - "stack" -- flex-col on mobile, flex-row on sm+ (the hero
 *                default; gives each CTA breathing room).
 *   - "row"   -- always horizontal (sticky bar; keeps the bar at
 *                one button-height tall on mobile so it doesn't
 *                eat the viewport).
 *
 * The whatsappHref is UTM-tagged automatically -- the hook reads
 * captured campaign tokens from sessionStorage and appends a
 * " (src: ...)" suffix to the prefilled wa.me text so the chat
 * thread carries attribution.
 */

interface HeroCTAsProps {
  /** Raw wa.me href; UTM source tag is appended automatically. */
  whatsappHref: string;
  /** Anchor or path for the secondary action (typically "#lead-form"). */
  secondaryHref: string;
  /** Defaults to "Chat on WhatsApp". */
  primaryLabel?: string;
  /** Defaults to "Or request a callback". */
  secondaryLabel?: string;
  /** "on-navy" = light pill on dark bg (hero). "on-light" = teal pill
   *  on light bg (DM card, sticky bar). */
  theme: 'on-navy' | 'on-light';
  /** "stack" = flex-col -> sm:flex-row (hero default). "row" = always
   *  horizontal (sticky bar). */
  layout?: 'stack' | 'row';
  /** Attribution merged into the Meta `Contact` + GA `contact` events
   *  fired on the primary (WhatsApp) click -- e.g. { source: 'hero' }.
   *  The primary CTA is always a wa.me deeplink, so this component fires
   *  Contact itself via the shared trackWhatsAppContact util; call-sites
   *  only supply where the click came from. */
  contactPayload?: Record<string, unknown>;
}

export function HeroCTAs({
  whatsappHref,
  secondaryHref,
  primaryLabel = 'Chat on WhatsApp',
  secondaryLabel = 'Or request a callback',
  theme,
  layout = 'stack',
  contactPayload,
}: HeroCTAsProps) {
  const utms = useUtmCapture();
  const taggedHref = appendUtmToWhatsAppHref(whatsappHref, utms);
  const isDark = theme === 'on-navy';

  const layoutCls =
    layout === 'stack'
      ? 'flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7'
      : 'flex flex-row items-center gap-3';

  const primaryCls = isDark
    ? 'bg-offwhite text-navy hover:bg-soft'
    : 'bg-teal text-offwhite hover:bg-navy';

  const secondaryTextCls = isDark
    ? 'text-offwhite/85 hover:text-offwhite'
    : 'text-mute hover:text-navy';

  const secondaryUnderlineCls = isDark
    ? 'border-offwhite/30 group-hover:border-offwhite/60'
    : 'border-mute/40 group-hover:border-navy/60';

  // Sticky-bar mode tightens the pill horizontal padding so two CTAs
  // fit on a 360px viewport without truncation.
  const pillPaddingCls =
    layout === 'row'
      ? 'px-4 py-3'
      : 'px-6 sm:px-7 py-3.5';

  return (
    <div className={`${layoutCls} max-w-full`}>
      <a
        href={taggedHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppContact(contactPayload)}
        className={`inline-flex items-center gap-2 self-start sm:self-center whitespace-nowrap font-ui font-medium text-[15px] tracking-[0.02em] rounded-full transition-colors duration-200 ease-calm ${pillPaddingCls} ${primaryCls}`}
      >
        {primaryLabel}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
        </svg>
      </a>
      <a
        href={secondaryHref}
        className={`group inline-flex self-start sm:self-center text-[15px] transition-colors duration-200 ease-calm max-w-full ${secondaryTextCls}`}
      >
        <span className={`inline-flex items-center gap-1.5 border-b pb-1 transition-colors duration-200 ease-calm ${secondaryUnderlineCls}`}>
          {secondaryLabel}
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </div>
  );
}
