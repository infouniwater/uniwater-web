// LAB PAGE — internal review only.
// 03 — Ambient ripples. 8 pre-positioned ripples, staggered delays,
// 3.2s base loop. Reads as "calm water surface".

import type { AnimationProps } from '../types';

const RIPPLES: { x: number; y: number; delay: number; r: number }[] = [
  { x: 90,  y: 110, delay:  0.0, r: 30 },
  { x: 290, y: 160, delay:  0.6, r: 40 },
  { x: 160, y: 240, delay:  1.4, r: 25 },
  { x: 320, y: 320, delay:  0.3, r: 35 },
  { x: 80,  y: 380, delay:  1.9, r: 30 },
  { x: 220, y: 420, delay:  2.4, r: 45 },
  { x: 130, y: 500, delay:  0.9, r: 30 },
  { x: 300, y: 530, delay:  2.0, r: 35 },
];

export function Animation03AmbientRipples({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="a03-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0a566f" />
          <stop offset="100%" stopColor="#05455F" />
        </radialGradient>
      </defs>

      <rect width="400" height="600" fill="url(#a03-bg)" />

      {RIPPLES.map((rip, i) => (
        <g
          key={i}
          className="lab-03-ripple"
          style={{ animationDelay: `-${rip.delay}s`, transformOrigin: `${rip.x}px ${rip.y}px` }}
        >
          <circle cx={rip.x} cy={rip.y} r={rip.r}      fill="none" stroke="#87D0CD" strokeWidth="1.4" />
          <circle cx={rip.x} cy={rip.y} r={rip.r * 0.55} fill="none" stroke="#87D0CD" strokeWidth="1"   opacity="0.55" />
        </g>
      ))}
    </svg>
  );
}
