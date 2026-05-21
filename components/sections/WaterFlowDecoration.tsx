/**
 * Hero water-flow decoration — two layers:
 *
 *   1. DROPLETS — ~11 absolute-positioned teardrop SVGs scattered across
 *      the hero with four animation types (fall / float / drift / ripple),
 *      each at a different size + opacity + delay. Visible in every
 *      viewport. Designed to read as a misting / drizzling water
 *      environment without competing with the hero text.
 *
 *   2. BOTTOM WAVES — three sinusoidal lines drifting horizontally at
 *      different speeds. Same as the original implementation; opacity
 *      bumped so they read more clearly alongside the droplets.
 *
 * All animations are pure CSS keyframes (see globals.css), respect
 * prefers-reduced-motion via the site-wide global rule, and the entire
 * decoration is aria-hidden + pointer-events-none so it never interferes
 * with content or interaction.
 *
 * The component renders inside its parent's positioning context — the
 * parent must be `relative overflow-hidden`.
 */

/** Classic teardrop SVG — currentColor fill so positional classes can
 *  set the colour via Tailwind utilities like `text-teal/60`. */
function Droplet({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 32"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 0 Q 4 14, 4 22 Q 4 30, 12 30 Q 20 30, 20 22 Q 20 14, 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Ripple — a single circle outline that expands + fades via the
 *  droplet-ripple keyframe. Multiple Ripples positioned across the hero
 *  read like splash points. */
function Ripple({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function WaterFlowDecoration() {
  return (
    <>
      {/* Droplets — scattered across the full hero. inset-0 fills the
          parent; overflow-hidden clips animations that would otherwise
          escape. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Falling droplets — vertical streams at different x-positions.
            Sizes vary to give depth. */}
        <Droplet className="absolute top-0 left-[12%] w-3 text-teal/60 animate-droplet-fall-1" />
        <Droplet className="absolute top-0 left-[35%] w-2 text-soft/70 animate-droplet-fall-2" />
        <Droplet className="absolute top-0 left-[78%] w-3 text-teal/55 animate-droplet-fall-3" />
        <Droplet className="absolute top-0 left-[58%] w-2 text-soft/60 animate-droplet-fall-4" />

        {/* Floating droplets — hover in place with a gentle bob. */}
        <Droplet className="absolute top-[22%] left-[8%] w-4 text-soft/55 animate-droplet-float-1" />
        <Droplet className="absolute top-[42%] left-[88%] w-3 text-teal/50 animate-droplet-float-2" />
        <Droplet className="absolute top-[62%] left-[20%] w-3 text-soft/55 animate-droplet-float-3" />

        {/* Drifting droplets — slow diagonal wandering, longer cycles. */}
        <Droplet className="absolute top-[30%] left-[48%] w-5 text-teal/40 animate-droplet-drift-1" />
        <Droplet className="absolute top-[68%] left-[70%] w-4 text-soft/45 animate-droplet-drift-2" />

        {/* Ripple emanations — concentric circles that expand + fade. */}
        <Ripple className="absolute top-[50%] left-[28%] w-10 h-10 text-teal/50 animate-droplet-ripple-1" />
        <Ripple className="absolute top-[35%] left-[82%] w-8 h-8 text-soft/60 animate-droplet-ripple-2" />
      </div>

      {/* Bottom waves — kept from prior version, opacity bumped 50% so they
          read alongside the droplet layer instead of disappearing under it. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden pointer-events-none"
      >
        <svg
          viewBox="0 0 1500 200"
          preserveAspectRatio="none"
          className="absolute left-0 bottom-0 w-[125%] h-full text-teal"
        >
          <path
            d="M 0 100 Q 75 60, 150 100 T 300 100 T 450 100 T 600 100 T 750 100 T 900 100 T 1050 100 T 1200 100 T 1350 100 T 1500 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity="0.28"
            className="animate-water-flow-1"
          />
          <path
            d="M 0 130 Q 60 100, 120 130 T 240 130 T 360 130 T 480 130 T 600 130 T 720 130 T 840 130 T 960 130 T 1080 130 T 1200 130 T 1320 130 T 1440 130"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.22"
            className="animate-water-flow-2"
          />
          <path
            d="M 0 165 Q 100 135, 200 165 T 400 165 T 600 165 T 800 165 T 1000 165 T 1200 165 T 1400 165"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.18"
            className="animate-water-flow-3"
          />
        </svg>
      </div>
    </>
  );
}
