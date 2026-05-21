// LAB PAGE — internal review only.
// 02 — Dirty-to-clean column. 10s loop. A boundary line travels down a
// vertical column of water, separating a murky top from a clear bottom.

import type { AnimationProps } from '../types';

export function Animation02DirtyToClean({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="a02-dirty" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#3a3526" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5a4f33" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="a02-clean" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#D5EEF1" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#87D0CD" stopOpacity="0.65" />
        </linearGradient>
        <clipPath id="a02-column">
          <rect x="140" y="60" width="120" height="480" rx="60" />
        </clipPath>
      </defs>

      {/* Outer column outline */}
      <rect x="140" y="60" width="120" height="480" rx="60" fill="none" stroke="#87D0CD" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* Dirty top half (always full) */}
      <g clipPath="url(#a02-column)">
        <rect x="140" y="60" width="120" height="480" fill="url(#a02-dirty)" />

        {/* Reservoir of clean water rising from the bottom */}
        <g className="lab-02-reservoir">
          <rect x="140" y="60" width="120" height="480" fill="url(#a02-clean)" />
        </g>

        {/* Boundary line travelling top → bottom */}
        <g className="lab-02-boundary">
          <line x1="140" y1="300" x2="260" y2="300" stroke="#FAFAF7" strokeWidth="2" strokeOpacity="0.9" />
          <line x1="140" y1="304" x2="260" y2="304" stroke="#87D0CD" strokeWidth="1" strokeOpacity="0.5" />
        </g>
      </g>

      {/* Label hint marks — engineered look */}
      <g stroke="#87D0CD" strokeOpacity="0.4" strokeWidth="1" fill="none">
        <line x1="100" y1="150" x2="130" y2="150" />
        <line x1="100" y1="300" x2="130" y2="300" />
        <line x1="100" y1="450" x2="130" y2="450" />
      </g>
    </svg>
  );
}
