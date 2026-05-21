// LAB PAGE — internal review only.
// 01 — Single droplet + ripple. 6s loop.

import type { AnimationProps } from '../types';

export function Animation01Droplet({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="a01-glow" cx="50%" cy="65%" r="50%">
          <stop offset="0%" stopColor="#87D0CD" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#05455F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="a01-drop" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#87D0CD" />
          <stop offset="100%" stopColor="#1B9BB4" />
        </linearGradient>
      </defs>

      {/* Soft ambient glow at the impact point */}
      <rect width="400" height="600" fill="url(#a01-glow)" />

      {/* Ripple — concentric ring expanding from the impact point */}
      <g className="lab-01-ripple" style={{ transformOrigin: '200px 390px' }}>
        <circle cx="200" cy="390" r="40" fill="none" stroke="#87D0CD" strokeWidth="2" />
        <circle cx="200" cy="390" r="22" fill="none" stroke="#87D0CD" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Droplet — tear-drop shape, falls along the centre line */}
      <g className="lab-01-drop">
        <path
          d="M200 60 C 188 88, 178 108, 178 130 C 178 152, 188 168, 200 168 C 212 168, 222 152, 222 130 C 222 108, 212 88, 200 60 Z"
          fill="url(#a01-drop)"
        />
      </g>
    </svg>
  );
}
