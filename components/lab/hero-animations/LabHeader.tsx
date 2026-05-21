'use client';

// LAB PAGE — internal review only. Sticky strip at the top of the page.

import type { AnimationCandidate } from './types';

interface LabHeaderProps {
  candidates: ReadonlyArray<AnimationCandidate>;
  globalPaused: boolean;
  forceReducedMotion: boolean;
  systemReducedMotion: boolean;
  onToggleGlobalPause: () => void;
  onToggleForceReducedMotion: () => void;
}

export function LabHeader({
  candidates,
  globalPaused,
  forceReducedMotion,
  systemReducedMotion,
  onToggleGlobalPause,
  onToggleForceReducedMotion,
}: LabHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-navy text-offwhite border-b border-navy/40 shadow-sm">
      <div className="container-uw py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
          <span className="text-eyebrow uppercase tracking-wider text-soft">
            Uniwater Hero Animation Lab
          </span>
          <span className="text-caption text-offwhite/65 hidden md:inline">
            internal review &mdash; not public
          </span>
        </div>

        {/* Anchor dots — 10 numbered jump links */}
        <nav aria-label="Animation candidates" className="flex flex-wrap items-center gap-1.5 md:ml-auto">
          {candidates.map((c) => (
            <a
              key={c.id}
              href={`#anim-${c.id}`}
              title={`${c.number} — ${c.label}`}
              className="h-7 w-7 inline-flex items-center justify-center text-[11px] font-mono border border-offwhite/30 text-offwhite/80 hover:border-soft hover:text-soft hover:bg-navy/40 transition-colors"
            >
              {c.number}
            </a>
          ))}
        </nav>

        {/* Global controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onToggleGlobalPause}
            className="h-7 px-3 text-caption font-medium border border-offwhite/40 text-offwhite hover:bg-offwhite hover:text-navy transition-colors"
          >
            {globalPaused ? 'Play all' : 'Pause all'}
          </button>
          <button
            type="button"
            onClick={onToggleForceReducedMotion}
            disabled={systemReducedMotion}
            title={
              systemReducedMotion
                ? 'OS already reports prefers-reduced-motion: reduce'
                : 'Force prefers-reduced-motion for testing'
            }
            className={`h-7 px-3 text-caption font-medium border transition-colors disabled:opacity-50 disabled:pointer-events-none ${
              forceReducedMotion
                ? 'bg-soft text-navy border-soft'
                : 'border-offwhite/40 text-offwhite hover:bg-offwhite hover:text-navy'
            }`}
          >
            Reduced motion: {forceReducedMotion || systemReducedMotion ? 'on' : 'off'}
          </button>
        </div>
      </div>
    </header>
  );
}
