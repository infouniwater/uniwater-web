// LAB PAGE — internal review only. Delete with the rest of /lab/hero-animations
// once the hero animation direction is finalised.

import type { ComponentType } from 'react';

export interface AnimationProps {
  /** When true the SVG renders a static still frame (used for prefers-reduced-motion). */
  reducedMotion: boolean;
}

export interface AnimationCandidate {
  /** Stable id used for anchor URLs (#anim-01) and React keys. */
  id: string;
  /** Display number in the lab UI (01..10). */
  number: string;
  /** One-sentence descriptor shown above the hero block. */
  label: string;
  /** Two-line note shown below the controls. */
  notes: string;
  /** Loop length in seconds, shown in the readout. Null for continuous/non-looping. */
  loopSeconds: number | null;
  /** SVG/visual component that renders into the visual panel slot. */
  Visual: ComponentType<AnimationProps>;
}
