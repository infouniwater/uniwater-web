// LAB PAGE — internal review only.
// 04 — The fill. 7s loop. A glass-shaped vessel fills with clear water,
// holds, then drains. Visual metaphor for "engineered home water".

import type { AnimationProps } from '../types';

export function Animation04Fill({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="a04-water" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#D5EEF1" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1B9BB4" stopOpacity="0.85" />
        </linearGradient>
        <clipPath id="a04-glass-shape">
          {/* Tapered glass: top wider than the base. */}
          <path d="M125 130 L 275 130 L 260 510 L 140 510 Z" />
        </clipPath>
      </defs>

      {/* Water — clipped to the glass interior, scales from bottom. */}
      <g clipPath="url(#a04-glass-shape)">
        <g className="lab-04-fill">
          <rect x="125" y="130" width="150" height="380" fill="url(#a04-water)" />
          {/* Subtle meniscus line at the top of the fill */}
          <rect x="125" y="125" width="150" height="6" fill="#D5EEF1" opacity="0.6" />
        </g>
      </g>

      {/* Glass outline */}
      <path
        d="M125 130 L 275 130 L 260 510 L 140 510 Z"
        fill="none"
        stroke="#87D0CD"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Highlight on the side of the glass */}
      <path
        d="M140 145 L 135 495"
        stroke="#FAFAF7"
        strokeOpacity="0.18"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
