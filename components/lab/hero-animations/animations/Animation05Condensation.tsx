// LAB PAGE — internal review only.
// 05 — Condensation + drip. 14s loop. A glass surface gradually beads up
// with condensation, then a single droplet rolls and falls.

import type { AnimationProps } from '../types';

const BEADS: { x: number; y: number; r: number; delay: number }[] = [
  { x: 140, y: 180, r: 3,   delay: 0    },
  { x: 175, y: 210, r: 2,   delay: 0.5  },
  { x: 220, y: 195, r: 4,   delay: 1.0  },
  { x: 260, y: 235, r: 2.5, delay: 0.2  },
  { x: 155, y: 270, r: 3.5, delay: 0.8  },
  { x: 210, y: 290, r: 2,   delay: 1.4  },
  { x: 250, y: 320, r: 3,   delay: 0.6  },
  { x: 180, y: 340, r: 2.5, delay: 1.2  },
  { x: 230, y: 380, r: 3,   delay: 0.4  },
  { x: 165, y: 410, r: 2,   delay: 1.0  },
];

export function Animation05Condensation({ reducedMotion: _ }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="a05-glass" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#87D0CD" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1B9BB4" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Tall rounded glass shape */}
      <rect x="120" y="140" width="160" height="380" rx="14" fill="url(#a05-glass)" stroke="#87D0CD" strokeOpacity="0.45" strokeWidth="2" />

      {/* Beads of condensation — opacity pulse, staggered */}
      <g className="lab-05-condensation">
        {BEADS.map((b, i) => (
          <circle
            key={i}
            cx={b.x}
            cy={b.y}
            r={b.r}
            fill="#FAFAF7"
            opacity="0.85"
            style={{ animationDelay: `-${b.delay}s` }}
          />
        ))}
      </g>

      {/* The drip — coalesces, then rolls down */}
      <g className="lab-05-drip" style={{ transformOrigin: '195px 360px' }}>
        <ellipse cx="195" cy="360" rx="5" ry="7" fill="#FAFAF7" opacity="0.95" />
      </g>
    </svg>
  );
}
