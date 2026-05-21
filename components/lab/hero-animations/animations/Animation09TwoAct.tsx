// LAB PAGE — internal review only.
// 09 — Two-act loop. 12s total: droplet falls + ripple in act one,
// then a glass appears + fills in act two. Tries to compress the
// brand story (problem → solution) into a single loop.

import type { AnimationProps } from '../types';

export function Animation09TwoAct({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="a09-glow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#87D0CD" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#05455F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="a09-drop" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#87D0CD" />
          <stop offset="100%" stopColor="#1B9BB4" />
        </linearGradient>
        <linearGradient id="a09-water" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#D5EEF1" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1B9BB4" stopOpacity="0.9" />
        </linearGradient>
        <clipPath id="a09-glass-shape">
          <path d="M140 230 L 260 230 L 250 510 L 150 510 Z" />
        </clipPath>
      </defs>

      <rect width="400" height="600" fill="url(#a09-glow)" />

      {/* Act 1 — Droplet + ripple */}
      <g className="lab-09-ripple" style={{ transformOrigin: '200px 340px' }}>
        <circle cx="200" cy="340" r="40" fill="none" stroke="#87D0CD" strokeWidth="2" />
        <circle cx="200" cy="340" r="22" fill="none" stroke="#87D0CD" strokeWidth="1" opacity="0.6" />
      </g>
      <g className="lab-09-drop">
        <path
          d="M200 40 C 188 68, 178 88, 178 110 C 178 132, 188 148, 200 148 C 212 148, 222 132, 222 110 C 222 88, 212 68, 200 40 Z"
          fill="url(#a09-drop)"
        />
      </g>

      {/* Act 2 — Glass + fill */}
      <g className="lab-09-glass">
        <path
          d="M140 230 L 260 230 L 250 510 L 150 510 Z"
          fill="none"
          stroke="#87D0CD"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <g clipPath="url(#a09-glass-shape)">
        <g className="lab-09-fill">
          <rect x="140" y="230" width="120" height="280" fill="url(#a09-water)" />
        </g>
      </g>
    </svg>
  );
}
