'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { submitWaterTestRequest } from '@/app/actions/leads';

/**
 * Exit-intent water-test capture — Tier 3.10 of the §6.2 marketing benchmark.
 *
 * Behaviour, by design:
 *   - Desktop only. Cursor leaving the top of the viewport is the canonical
 *     "abandoning the tab" signal. Mobile has no equivalent gesture, and a
 *     popup mid-scroll on a phone is hostile.
 *   - Once per browser session (sessionStorage flag).
 *   - Armed only after 8 s on the page, to spare visitors who clicked away
 *     immediately by accident.
 *   - Suppressed on pages where the visitor is already mid-conversion
 *     (book-survey, contact, RFQ, thank-you, the water-problem checker).
 *   - Native <dialog> element — gets focus management, ESC-to-close, and
 *     backdrop click for free, with no focus-trap library required.
 *
 * The form submits to /actions/leads.ts which creates an Odoo lead and then
 * 303-redirects to wa.me with a pre-filled message. The lead is captured
 * regardless of whether the visitor ever sends the WhatsApp message.
 */

const SESSION_KEY = 'uw-exit-intent-shown-v1';
const ARM_DELAY_MS = 8_000;
const EXCLUDED_PATHS = new Set([
  '/book-survey',
  '/contact',
  '/remote-site-survey',
  '/industrial',
  '/thank-you',
  '/water-problem-checker',
]);

export function ExitIntentCapture() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);

  // Conditional mount — never render the <dialog> markup at all on pages
  // where the visitor is already mid-conversion. Saves ~2 KB of DOM per
  // page load on book-survey, contact, RFQ, etc., and avoids any race
  // where a stray .showModal() could fire during route transitions.
  const suppressed = EXCLUDED_PATHS.has(pathname ?? '/');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (shown) return;
    if (suppressed) return;
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;
    // Skip on coarse-pointer (touch) devices — no exit-intent gesture there.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let armed = false;
    let armTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    const onMouseOut = (e: MouseEvent) => {
      if (!armed) return;
      // Only when cursor leaves toward the top of the viewport.
      if (e.clientY > 8) return;
      if (e.relatedTarget) return;
      open();
    };

    const open = () => {
      cleanup();
      window.sessionStorage.setItem(SESSION_KEY, '1');
      setShown(true);
      dialogRef.current?.showModal();
    };

    const cleanup = () => {
      if (armTimer) {
        clearTimeout(armTimer);
        armTimer = null;
      }
      document.removeEventListener('mouseout', onMouseOut);
    };

    document.addEventListener('mouseout', onMouseOut);
    return cleanup;
  }, [pathname, shown, suppressed]);

  const close = () => {
    dialogRef.current?.close();
  };

  if (suppressed) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="exit-intent-heading"
      className="bg-transparent p-0 backdrop:bg-navy/70 backdrop:backdrop-blur-sm open:animate-fade-in"
    >
      <div className="relative w-[min(560px,calc(100vw-2rem))] bg-offwhite border border-hairline shadow-[0_24px_64px_rgba(5,69,95,0.18)] p-8 md:p-10 text-left">
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-mute hover:text-navy transition-colors duration-200 ease-calm"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="text-eyebrow font-medium uppercase tracking-wide text-teal mb-3">
          Before you go
        </p>
        <h2
          id="exit-intent-heading"
          className="text-h2-m md:text-h2 font-light text-navy leading-snug mb-4 [text-wrap:balance]"
        >
          A free water-test report &mdash; sent to your WhatsApp.
        </h2>
        <p className="text-mute text-body leading-relaxed mb-6">
          Tell us your mobile number. An engineer will WhatsApp you a sampler kit and a written analysis within 48 hours. No call back unless you ask for one.
        </p>

        <form action={submitWaterTestRequest} className="flex flex-col gap-4">
          <input type="hidden" name="sourcePath" value={pathname ?? ''} />
          <label className="flex flex-col gap-2">
            <span className="text-caption text-mute uppercase tracking-wide text-eyebrow font-medium">
              Mobile (with country code)
            </span>
            <input
              type="tel"
              name="mobile"
              required
              autoFocus
              placeholder="+91 98765 43210"
              pattern="[+0-9\s]{8,}"
              className="h-[52px] px-4 bg-offwhite text-ink text-body border border-hairline focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors duration-200 ease-calm placeholder:text-mute/60"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-caption text-mute uppercase tracking-wide text-eyebrow font-medium">
              City (optional)
            </span>
            <input
              type="text"
              name="city"
              placeholder="e.g. Kolkata"
              className="h-[52px] px-4 bg-offwhite text-ink text-body border border-hairline focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors duration-200 ease-calm placeholder:text-mute/60"
            />
          </label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 bg-navy text-offwhite text-body font-medium hover:bg-teal transition-colors duration-200 ease-calm"
            >
              Send me the report
            </button>
            <button
              type="button"
              onClick={close}
              className="text-caption text-mute hover:text-navy transition-colors duration-200 ease-calm underline underline-offset-4 decoration-hairline"
            >
              No thanks, I&rsquo;m just browsing
            </button>
          </div>
          <p className="text-caption text-mute/80 leading-snug mt-1">
            We use the number only to send your report. No spam, no automated calls.
          </p>
        </form>
      </div>
    </dialog>
  );
}
