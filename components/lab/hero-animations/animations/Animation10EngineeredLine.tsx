// LAB PAGE — internal review only.
// 10 — Engineered line draw. 11s loop. An architect's drawing of a
// filter cartridge is drawn one line at a time via stroke-dashoffset,
// then a glass with clean water fades in next to it.

import type { AnimationProps } from '../types';

export function Animation10EngineeredLine({ reducedMotion }: AnimationProps) {
  // In reduced-motion mode the parent applies .lab-static which kills
  // the dashoffset animation — but the initial style is dashoffset: 800
  // (line invisible). For the still frame we want the fully-drawn shape,
  // so override the inline style in that case.
  const lineStyle: React.CSSProperties = reducedMotion
    ? { strokeDasharray: 'none', strokeDashoffset: 0 }
    : {};
  const glassStyle: React.CSSProperties = reducedMotion ? { opacity: 1 } : {};

  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="a10-water" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#D5EEF1" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1B9BB4" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Engineered cartridge — single path the line-draw animation works on */}
      <path
        className="lab-10-line"
        style={lineStyle}
        d="M110 130 L 200 130 L 200 110 L 240 110 L 240 130 L 280 130 L 280 470 L 240 470 L 240 490 L 200 490 L 200 470 L 110 470 Z M 130 170 L 260 170 M 130 210 L 260 210 M 130 250 L 260 250 M 130 290 L 260 290 M 130 330 L 260 330 M 130 370 L 260 370 M 130 410 L 260 410 M 130 450 L 260 450"
        fill="none"
        stroke="#87D0CD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Annotation marks — fixed (don't animate) */}
      <g stroke="#87D0CD" strokeOpacity="0.4" strokeWidth="1" fill="none">
        <line x1="80" y1="130" x2="100" y2="130" />
        <line x1="80" y1="470" x2="100" y2="470" />
        <line x1="80" y1="130" x2="80"  y2="470" />
      </g>

      {/* Glass + clean water that fades in after the line is drawn */}
      <g className="lab-10-glass" style={glassStyle}>
        <path d="M310 360 L 360 360 L 354 510 L 316 510 Z" fill="url(#a10-water)" opacity="0.85" />
        <path
          d="M310 360 L 360 360 L 354 510 L 316 510 Z"
          fill="none"
          stroke="#87D0CD"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
