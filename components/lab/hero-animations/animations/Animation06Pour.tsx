// LAB PAGE — internal review only.
// 06 — Pour into a glass. 6s loop. A stream pours from above, a glass
// fills, small splashes at the meniscus.

import type { AnimationProps } from '../types';

export function Animation06Pour({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="a06-stream" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#87D0CD" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1B9BB4" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="a06-water" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#D5EEF1" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1B9BB4" stopOpacity="0.85" />
        </linearGradient>
        <clipPath id="a06-glass-shape">
          <path d="M140 270 L 260 270 L 250 530 L 150 530 Z" />
        </clipPath>
      </defs>

      {/* Stream — scaleY animation grows it downward */}
      <g className="lab-06-stream">
        <rect x="195" y="40" width="10" height="230" rx="5" fill="url(#a06-stream)" />
      </g>

      {/* Glass — outline only */}
      <path
        d="M140 270 L 260 270 L 250 530 L 150 530 Z"
        fill="none"
        stroke="#87D0CD"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Water inside the glass — scales from the bottom */}
      <g clipPath="url(#a06-glass-shape)">
        <g className="lab-06-fill">
          <rect x="140" y="270" width="120" height="260" fill="url(#a06-water)" />
        </g>
      </g>

      {/* Splash ring at the impact point on the meniscus */}
      <g className="lab-06-splash" style={{ transformOrigin: '200px 270px' }}>
        <circle cx="200" cy="270" r="14" fill="none" stroke="#87D0CD" strokeWidth="1.5" />
        <circle cx="200" cy="270" r="8" fill="none" stroke="#87D0CD" strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
}
