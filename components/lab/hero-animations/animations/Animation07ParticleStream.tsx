// LAB PAGE — internal review only.
// 07 — Particle stream. 4s base loop with staggered delays so motion
// reads as continuous. Each particle falls 380px, fades at the ends.

import type { AnimationProps } from '../types';

const PARTICLES: { x: number; size: number; delay: number; opacity: number }[] = [
  { x:  60, size: 3,   delay: 0.0, opacity: 0.7 },
  { x: 120, size: 4,   delay: 1.6, opacity: 0.9 },
  { x: 150, size: 2.5, delay: 0.4, opacity: 0.6 },
  { x: 190, size: 5,   delay: 2.4, opacity: 0.95 },
  { x: 230, size: 3,   delay: 1.0, opacity: 0.75 },
  { x: 270, size: 4.5, delay: 3.0, opacity: 0.9 },
  { x: 310, size: 2.5, delay: 0.7, opacity: 0.55 },
  { x: 340, size: 3.5, delay: 2.0, opacity: 0.8 },
];

export function Animation07ParticleStream({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="a07-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0a566f" />
          <stop offset="100%" stopColor="#05455F" />
        </radialGradient>
      </defs>

      <rect width="400" height="600" fill="url(#a07-bg)" />

      {PARTICLES.map((p, i) => (
        <g
          key={i}
          className="lab-07-particle"
          style={{ animationDelay: `-${p.delay}s` }}
        >
          <circle
            cx={p.x}
            cy={100}
            r={p.size}
            fill="#87D0CD"
            opacity={p.opacity}
          />
        </g>
      ))}
    </svg>
  );
}
