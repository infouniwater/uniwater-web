/**
 * Decorative water-flow waves for the hero section.
 *
 * Three sinusoidal wave paths drifting horizontally at different speeds
 * (22s / 18s / 28s) and opacities (0.18 / 0.14 / 0.10). The SVG is
 * preserveAspectRatio="none" + sized at 125% so the translation never
 * exposes the right edge. Each path covers 5+ wave cycles so the
 * translate-to-period loop is visually seamless.
 *
 * The component renders inside its parent's positioning context — the
 * parent must be `relative`. Absolute-positions to the bottom edge of
 * the parent and is pointer-events-none + aria-hidden so it never
 * intercepts cursor or screen-reader attention.
 *
 * Animation respects `prefers-reduced-motion` via the global rule in
 * app/globals.css that collapses all animations to ~0ms when set.
 */
export function WaterFlowDecoration() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden pointer-events-none"
    >
      <svg
        viewBox="0 0 1500 200"
        preserveAspectRatio="none"
        className="absolute left-0 bottom-0 w-[125%] h-full text-teal"
      >
        {/* Top wave — strongest opacity, slowest visual drift */}
        <path
          d="M 0 100 Q 75 60, 150 100 T 300 100 T 450 100 T 600 100 T 750 100 T 900 100 T 1050 100 T 1200 100 T 1350 100 T 1500 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.18"
          className="animate-water-flow-1"
        />
        {/* Mid wave — slightly tighter period (240px), opposite-feeling drift speed */}
        <path
          d="M 0 130 Q 60 100, 120 130 T 240 130 T 360 130 T 480 130 T 600 130 T 720 130 T 840 130 T 960 130 T 1080 130 T 1200 130 T 1320 130 T 1440 130"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.14"
          className="animate-water-flow-2"
        />
        {/* Bottom wave — broadest period (400px), faintest, slowest perceived */}
        <path
          d="M 0 165 Q 100 135, 200 165 T 400 165 T 600 165 T 800 165 T 1000 165 T 1200 165 T 1400 165"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.10"
          className="animate-water-flow-3"
        />
      </svg>
    </div>
  );
}
