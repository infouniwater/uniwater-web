'use client';

// LAB PAGE — internal review only. Delete with the rest of /lab/hero-animations
// once the hero animation direction is finalised.
//
// Wrapper that reproduces the production hero layout from
// `components/sections/EditorialHero.tsx` (same headline, H2, lede, CTAs,
// and price anchor) and renders an animation candidate inside the
// right-hand visual panel instead of the marble-bathroom photo. The
// production hero is rendered VERBATIM here — if the live hero copy
// changes, mirror those edits to this file so the lab reflects what
// reviewers will actually see.

import { useEffect, useRef, useState } from 'react';
import { Display, Lede } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SYSTEM_STARTS_FROM_INR } from '@/content/site';
import type { AnimationCandidate } from './types';
import { Controls } from './Controls';

interface HeroBlockProps {
  candidate: AnimationCandidate;
  /** Site-wide pause from the sticky header strip. */
  globalPaused: boolean;
  /** Force `prefers-reduced-motion` regardless of OS setting. */
  forceReducedMotion: boolean;
  /** True if the OS reports prefers-reduced-motion: reduce. */
  systemReducedMotion: boolean;
}

export function HeroBlock({
  candidate,
  globalPaused,
  forceReducedMotion,
  systemReducedMotion,
}: HeroBlockProps) {
  const formattedStarts = new Intl.NumberFormat('en-IN').format(SYSTEM_STARTS_FROM_INR);

  const [blockPaused, setBlockPaused] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [inView, setInView] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);

  // Viewport-aware pause — when the block scrolls fully out of view we
  // pause its animations to keep the CPU off candidates the reviewer
  // isn't actually looking at. Threshold 0 = "any pixel onscreen counts".
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reducedMotion = forceReducedMotion || systemReducedMotion;
  const effectivePaused = blockPaused || globalPaused || !inView;

  // CSS variable read by `.lab-anim` rule in globals.css — pauses every
  // descendant animation at once.
  const animWrapperStyle = {
    ['--lab-play-state' as string]: effectivePaused ? 'paused' : 'running',
  } as React.CSSProperties;

  const { Visual } = candidate;

  return (
    <section
      ref={sectionRef}
      id={`anim-${candidate.id}`}
      className="bg-offwhite border-b border-hairline scroll-mt-24"
    >
      <div className="container-uw">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-128px)] py-14 sm:py-20 md:py-24 lg:py-0">
          {/* Text panel — copied verbatim from EditorialHero. */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Display>Wellness starts with clean water.</Display>
            <h2 className="text-h2-m md:text-h2 font-light text-navy/85 leading-snug [text-wrap:balance]">
              Engineered, installed, and serviced &mdash; for the homes you don&rsquo;t get to redo.
            </h2>
            <Lede className="text-mute">
              Bathroom filters, whole-house systems, drinking water &mdash; surveyed before we quote, serviced every month after.
            </Lede>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
              <Button href="/book-survey" size="lg">
                Book a free survey
              </Button>
              <Button href="/water-problem-checker" variant="tertiary">
                Take the 60-second water check
                <svg className="ml-2" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>

            <p className="font-editorial italic text-mute text-caption mt-1">
              Surveys are free. Bathroom filters from ₹{formattedStarts}.
            </p>

            <Controls
              number={candidate.number}
              label={candidate.label}
              notes={candidate.notes}
              loopSeconds={candidate.loopSeconds}
              paused={blockPaused || globalPaused}
              inView={inView}
              reducedMotion={reducedMotion}
              onTogglePause={() => setBlockPaused((p) => !p)}
              onRestart={() => setRestartKey((k) => k + 1)}
            />
          </div>

          {/* Visual panel — same aspect + offset as the prod hero, but
              instead of the marble-bathroom image we mount the
              animation candidate here. `key={restartKey}` forces a
              remount so CSS animations restart from frame 0. */}
          <div className="lg:col-span-6 lg:py-12">
            <div
              className={`relative w-full overflow-hidden aspect-[4/3] lg:aspect-[56/75] bg-navy ${reducedMotion ? 'lab-static' : 'lab-anim'}`}
              style={animWrapperStyle}
              aria-hidden="true"
            >
              <Visual key={restartKey} reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
