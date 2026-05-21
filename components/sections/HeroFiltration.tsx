/**
 * Hero filtration narrative — Before / → / After diptych in the bottom
 * whitespace band of the hero.
 *
 * Tells the Uniwater brand story visually: dirty water enters, the
 * system transforms it, clean water emerges. Each of the three elements
 * has its own motion to reinforce the metaphor:
 *
 *   - DIRTY  (muddy yellow, jitters nervously)  — turbidity, impurity
 *   - ARROW  (teal, slides L→R smoothly)        — the transformation
 *   - CLEAN  (brand teal, pulses calmly)        — purity, presence
 *
 * Tiny "Before" / "After" eyebrow labels under each splash make the
 * meaning explicit — no decoder ring needed.
 *
 * Lives ONLY in the bottom whitespace below the hero's centered text +
 * image. inset-x-0 bottom-0 + a capped band height means it never
 * encroaches on the headline area. aria-hidden so screen readers skip
 * the decoration; the brand-promise text is already carried by the
 * headline above.
 */

function DirtySplash({ className }: { className: string }) {
  // Asymmetric splash with floating "particle" dots — visually reads as
  // unsettled / contaminated water.
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden="true">
      {/* Wobbly baseline */}
      <path
        d="M 8 50 Q 28 60, 50 50 T 92 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
      />
      {/* Asymmetric splash arc */}
      <path
        d="M 20 50 Q 32 14, 50 28 T 82 50"
        fill="currentColor"
        opacity="0.45"
      />
      {/* Suspended particles */}
      <circle cx="25" cy="24" r="2.5" fill="currentColor" />
      <circle cx="60" cy="14" r="3.5" fill="currentColor" />
      <circle cx="42" cy="32" r="2" fill="currentColor" />
      <circle cx="76" cy="34" r="2.5" fill="currentColor" />
      <circle cx="34" cy="42" r="1.8" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function CleanSplash({ className }: { className: string }) {
  // Symmetric, smooth, central column of clean water rising — reads as
  // engineered / refined.
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden="true">
      {/* Smooth baseline ripple */}
      <ellipse cx="50" cy="52" rx="36" ry="3.5" fill="currentColor" opacity="0.25" />
      {/* Central teardrop column */}
      <path
        d="M 50 8 Q 42 26, 42 42 Q 42 50, 50 50 Q 58 50, 58 42 Q 58 26, 50 8 Z"
        fill="currentColor"
      />
      {/* Small symmetric companion drops */}
      <circle cx="30" cy="36" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="70" cy="33" r="2.7" fill="currentColor" opacity="0.7" />
      {/* Subtle highlight on the central column */}
      <ellipse
        cx="47"
        cy="34"
        rx="1.5"
        ry="6"
        fill="white"
        opacity="0.35"
      />
    </svg>
  );
}

function FlowArrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 80 24" className={className} aria-hidden="true">
      <path
        d="M 4 12 L 70 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 60 5 L 72 12 L 60 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroFiltration() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-36 sm:h-44 md:h-52 lg:h-56 overflow-hidden pointer-events-none"
    >
      <div className="container-uw h-full flex items-end justify-center pb-6 sm:pb-8">
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14 lg:gap-20">
          {/* BEFORE — dirty water, jittery motion. Muddy yellow #a88336
              chosen to read as turbid groundwater / iron-stained water
              against the offwhite hero background. */}
          <div className="flex flex-col items-center gap-2">
            <DirtySplash className="w-16 sm:w-20 md:w-24 lg:w-28 h-10 sm:h-12 md:h-14 lg:h-16 text-[#a88336] animate-dirty-jitter" />
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
              Before
            </span>
          </div>

          {/* FLOW — arrow slides L→R on a 2.6s cycle. The transformation. */}
          <FlowArrow className="w-12 sm:w-16 md:w-20 lg:w-24 text-teal/55 animate-flow-slide" />

          {/* AFTER — clean water, pulsing calmly. Brand teal. */}
          <div className="flex flex-col items-center gap-2">
            <CleanSplash className="w-16 sm:w-20 md:w-24 lg:w-28 h-10 sm:h-12 md:h-14 lg:h-16 text-teal animate-clean-pulse" />
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
              After
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
