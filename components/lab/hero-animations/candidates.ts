// LAB PAGE — internal review only. The single source of truth for the
// 10 animation candidates rendered on /lab/hero-animations.

import type { AnimationCandidate } from './types';
import { Animation01Droplet } from './animations/Animation01Droplet';
import { Animation02DirtyToClean } from './animations/Animation02DirtyToClean';
import { Animation03AmbientRipples } from './animations/Animation03AmbientRipples';
import { Animation04Fill } from './animations/Animation04Fill';
import { Animation05Condensation } from './animations/Animation05Condensation';
import { Animation06Pour } from './animations/Animation06Pour';
import { Animation07ParticleStream } from './animations/Animation07ParticleStream';
import { Animation08WaveShimmer } from './animations/Animation08WaveShimmer';
import { Animation09TwoAct } from './animations/Animation09TwoAct';
import { Animation10EngineeredLine } from './animations/Animation10EngineeredLine';

export const CANDIDATES: ReadonlyArray<AnimationCandidate> = [
  {
    id: '01',
    number: '01',
    label: 'Single droplet + ripple',
    notes:
      'One drop, one ripple, then quiet. The most restrained reading — closer to a logo than an animation.',
    loopSeconds: 6,
    Visual: Animation01Droplet,
  },
  {
    id: '02',
    number: '02',
    label: 'Dirty-to-clean column',
    notes:
      'A boundary line travels down a vertical column, separating murky water above from clear water below. Literal "we clean your water".',
    loopSeconds: 10,
    Visual: Animation02DirtyToClean,
  },
  {
    id: '03',
    number: '03',
    label: 'Ambient ripples',
    notes:
      'Eight ripples expand at staggered intervals across a calm surface. Reads as "still water" rather than as a story.',
    loopSeconds: 3.2,
    Visual: Animation03AmbientRipples,
  },
  {
    id: '04',
    number: '04',
    label: 'The fill',
    notes:
      'A tapered glass fills with clear water, holds, drains. Direct, almost diagrammatic — the engineering register.',
    loopSeconds: 7,
    Visual: Animation04Fill,
  },
  {
    id: '05',
    number: '05',
    label: 'Condensation + drip',
    notes:
      'Beads form on a chilled glass over ten seconds, one coalesces, and runs down. The wellness register — closer to a spa than a plant room.',
    loopSeconds: 14,
    Visual: Animation05Condensation,
  },
  {
    id: '06',
    number: '06',
    label: 'Pour into a glass',
    notes:
      'A stream pours from above into a glass, with a small splash ring at the meniscus. The most everyday reading.',
    loopSeconds: 6,
    Visual: Animation06Pour,
  },
  {
    id: '07',
    number: '07',
    label: 'Particle stream',
    notes:
      'Continuous fall of small particles across the panel. Closer to abstract texture than narrative; cheapest to render.',
    loopSeconds: null,
    Visual: Animation07ParticleStream,
  },
  {
    id: '08',
    number: '08',
    label: 'Wave / shimmer surface',
    notes:
      'A still water surface with a single shimmer band sweeping across it. The calmest of all ten.',
    loopSeconds: 10,
    Visual: Animation08WaveShimmer,
  },
  {
    id: '09',
    number: '09',
    label: 'Two-act loop (drop → glass)',
    notes:
      'Act one — a drop falls, ripples spread. Act two — a glass appears and fills. The problem-and-solution storyboard in one loop.',
    loopSeconds: 12,
    Visual: Animation09TwoAct,
  },
  {
    id: '10',
    number: '10',
    label: 'Engineered line draw',
    notes:
      'A draftsman draws a filter cartridge one line at a time; after the line completes a glass of clean water fades in. The "we are the engineers" reading.',
    loopSeconds: 11,
    Visual: Animation10EngineeredLine,
  },
] as const;
