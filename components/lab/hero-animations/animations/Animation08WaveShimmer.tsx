// LAB PAGE — internal review only.
// 08 — Wave / shimmer. 10s loop. A horizontal water surface with a
// shimmer band sweeping across it.

import type { AnimationProps } from '../types';

export function Animation08WaveShimmer({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="a08-surface" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1B9BB4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#05455F" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="a08-shimmer" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FAFAF7" stopOpacity="0" />
          <stop offset="50%" stopColor="#FAFAF7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FAFAF7" stopOpacity="0" />
        </linearGradient>
        <clipPath id="a08-water-clip">
          <rect x="0" y="280" width="400" height="320" />
        </clipPath>
      </defs>

      {/* Water body */}
      <rect x="0" y="280" width="400" height="320" fill="url(#a08-surface)" />

      {/* Wave outline at the surface */}
      <path
        d="M0 290 Q 100 270, 200 290 T 400 290"
        stroke="#87D0CD"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        fill="none"
      />
      <path
        d="M0 310 Q 100 295, 200 310 T 400 310"
        stroke="#87D0CD"
        strokeWidth="1"
        strokeOpacity="0.35"
        fill="none"
      />

      {/* Shimmer band — sweeps across the surface */}
      <g clipPath="url(#a08-water-clip)">
        <g className="lab-08-shimmer">
          <rect x="0" y="280" width="180" height="50" fill="url(#a08-shimmer)" transform="skewX(-20)" />
        </g>
      </g>
    </svg>
  );
}
