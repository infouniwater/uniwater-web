'use client';

import { useEffect, useState } from 'react';
import { matchPincode } from '@/content/site';
import type { PincodeMatch } from '@/content/site';

/**
 * Sticky pincode-serviceability check. Mount on /, /residential, /industrial.
 *
 * UX:
 *   - Empty state: single input + "Check serviceability" button.
 *   - Match in core city: green-tinted confirmation, links to /book-survey
 *     pre-filled with the matched city.
 *   - Match in nearby area: amber-tinted "we extend to this area" with a
 *     5–7 day survey window; same CTA.
 *   - No match: routes the visitor to /remote-site-survey with a
 *     friendly framing.
 *
 * Session storage caches the last positive match so a returning visitor
 * doesn't have to re-enter their pincode within the same session.
 */

const SESSION_KEY = 'uw-pincode-match-v1';

interface PincodeCheckProps {
  /** Section tone — 'navy' for inverse contexts (industrial hero),
   *  'light' for default offwhite sections. */
  tone?: 'light' | 'navy';
  /** Override the destination URL pattern for the CTA. */
  bookSurveyHref?: string;
}

export function PincodeCheck({ tone = 'light', bookSurveyHref = '/book-survey' }: PincodeCheckProps) {
  const [value, setValue] = useState('');
  const [match, setMatch] = useState<PincodeMatch>(null);
  const [checked, setChecked] = useState(false);

  // Restore the last positive match for the session.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cached = window.sessionStorage.getItem(SESSION_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { value: string; match: PincodeMatch };
        if (parsed.value && parsed.match) {
          setValue(parsed.value);
          setMatch(parsed.match);
          setChecked(true);
        }
      } catch {
        // ignore malformed cache
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = matchPincode(value);
    setMatch(result);
    setChecked(true);
    if (typeof window !== 'undefined' && result) {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ value, match: result }));
    }
  };

  const reset = () => {
    setValue('');
    setMatch(null);
    setChecked(false);
    if (typeof window !== 'undefined') window.sessionStorage.removeItem(SESSION_KEY);
  };

  const isDark = tone === 'navy';
  const labelClass = isDark ? 'text-soft' : 'text-teal';
  const inputClass = isDark
    ? 'bg-navy/40 border-offwhite/20 text-offwhite placeholder:text-offwhite/40 focus:border-soft focus:ring-soft/20'
    : 'bg-offwhite border-hairline text-ink placeholder:text-mute/60 focus:border-teal focus:ring-teal/20';
  const buttonClass = isDark
    ? 'bg-offwhite text-navy hover:bg-soft hover:text-navy'
    : 'bg-navy text-offwhite hover:bg-teal';

  return (
    <div
      className={`w-full ${isDark ? 'bg-navy/40 border border-offwhite/15' : 'bg-tint/30 border border-hairline'} p-6 md:p-7`}
      role="region"
      aria-labelledby="pincode-check-label"
    >
      {!checked && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label id="pincode-check-label" className={`text-eyebrow font-medium uppercase tracking-wide ${labelClass}`}>
            Check if we service your area
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{5,6}"
              maxLength={6}
              required
              autoComplete="postal-code"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="6-digit pincode (5-digit for Nepal)"
              className={`flex-1 h-[52px] px-4 border text-body focus:outline-none focus:ring-2 transition-colors duration-200 ease-calm ${inputClass}`}
              aria-label="Pincode"
            />
            <button
              type="submit"
              className={`inline-flex items-center justify-center px-6 py-3 font-medium text-body transition-colors duration-200 ease-calm ${buttonClass}`}
            >
              Check
            </button>
          </div>
        </form>
      )}

      {checked && match && match.status === 'core' && (
        <div className="flex flex-col gap-3">
          <div className={`text-eyebrow font-medium uppercase tracking-wide ${labelClass}`}>
            ✓ Yes — we service {match.zone.cityName}
          </div>
          <p className={`text-body ${isDark ? 'text-offwhite/90' : 'text-navy'}`}>
            We have a local engineering team in {match.zone.cityName}. We&rsquo;ll be at your address within 48 hours of booking a free survey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <a
              href={`${bookSurveyHref}?city=${encodeURIComponent(match.zone.cityName)}`}
              className={`inline-flex items-center justify-center px-6 py-3 font-medium text-body transition-colors duration-200 ease-calm ${buttonClass}`}
            >
              Book a free survey
            </a>
            <button
              type="button"
              onClick={reset}
              className={`text-caption underline underline-offset-4 self-center ${isDark ? 'text-offwhite/70 hover:text-soft' : 'text-mute hover:text-navy'} transition-colors`}
            >
              Check a different pincode
            </button>
          </div>
        </div>
      )}

      {checked && match && match.status === 'nearby' && (
        <div className="flex flex-col gap-3">
          <div className={`text-eyebrow font-medium uppercase tracking-wide ${labelClass}`}>
            ↗ We extend to your area from {match.zone.cityName}
          </div>
          <p className={`text-body ${isDark ? 'text-offwhite/90' : 'text-navy'}`}>
            Your pincode sits within the {match.zone.nearbyLabel} corridor. We send the {match.zone.cityName} team out here on request — survey within 5–7 working days instead of 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <a
              href={`${bookSurveyHref}?city=${encodeURIComponent(match.zone.cityName)}`}
              className={`inline-flex items-center justify-center px-6 py-3 font-medium text-body transition-colors duration-200 ease-calm ${buttonClass}`}
            >
              Book a free survey
            </a>
            <button
              type="button"
              onClick={reset}
              className={`text-caption underline underline-offset-4 self-center ${isDark ? 'text-offwhite/70 hover:text-soft' : 'text-mute hover:text-navy'} transition-colors`}
            >
              Check a different pincode
            </button>
          </div>
        </div>
      )}

      {checked && !match && (
        <div className="flex flex-col gap-3">
          <div className={`text-eyebrow font-medium uppercase tracking-wide ${labelClass}`}>
            We don&rsquo;t have a local team at your pincode — yet.
          </div>
          <p className={`text-body ${isDark ? 'text-offwhite/90' : 'text-navy'}`}>
            We currently service 9 cities directly: Kolkata, Bhubaneswar, Ranchi, Rourkela, Siliguri, Guwahati, Noida, Kathmandu, Biratnagar &mdash; and the surrounding corridors. For everywhere else, our <span className="font-medium">Remote Site Survey</span> covers system design and quote by correspondence; install is then routed through trade-partner installers we&rsquo;ve qualified.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <a
              href="/remote-site-survey"
              className={`inline-flex items-center justify-center px-6 py-3 font-medium text-body transition-colors duration-200 ease-calm ${buttonClass}`}
            >
              Start a remote survey
            </a>
            <button
              type="button"
              onClick={reset}
              className={`text-caption underline underline-offset-4 self-center ${isDark ? 'text-offwhite/70 hover:text-soft' : 'text-mute hover:text-navy'} transition-colors`}
            >
              Check a different pincode
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
