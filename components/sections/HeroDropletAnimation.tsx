'use client';

/**
 * HeroDropletAnimation — slim three-drop waterfall. Three water
 * droplets, each on its own copy of the SVG stage, fall down random
 * paths and splash at the same fixed pool height. The drops are
 * staggered by 1/3 of the cycle so at any moment one drop is wandering
 * down, the next is splashing, and the third is in its rest beat. Each
 * drop picks a fresh random path every cycle (never the same path
 * twice in a row, per drop).
 *
 * Per-drop behaviour (preserved from the original sandbox):
 *   - 3-phase loop: wander 3.4s → splash 0.8s → rest 0.75s (4.95s total)
 *   - 5 paths to choose from, picked round-robin without immediate
 *     repeats (each drop tracks its own last index)
 *   - All paths converge on the same fixed pool (LAND_X, LAND_Y) so
 *     every drop ends at the same height even though it starts/wanders
 *     from a different one of the five entry points
 *   - Easing `te = t*t` — accelerate INTO impact (do not change to
 *     smoothstep; the brake-before-splash reading was rejected)
 *   - Teardrop rotates to its direction of travel
 *   - Splash: two flat ripples + 6–7 parabolic particles, re-randomised
 *     every cycle per drop
 *
 * Why three SVG sub-stages rather than one shared one:
 *   - Each drop carries its own pool/pool2/particles group so the
 *     ripples don't fight for the same DOM nodes. Overlapping ripples
 *     at the shared landing point read as staggered concentric rings.
 *
 * Stage geometry (80 × 440 portrait):
 *   - viewBox scaled 1:4 from the 320×440 sandbox; paths' lateral
 *     spread, curve shape, and identity preserved
 *   - preserveAspectRatio "xMidYMid meet" so the slim portrait
 *     letterboxes cleanly inside whatever real pixel width the strip
 *     container resolves to at any breakpoint
 *
 * Production wrapping:
 *   - IntersectionObserver pauses the RAF loop when the hero scrolls
 *     offscreen; resumes (with timing reset) on the next intersection.
 *     A "hasIntersected" flag avoids a startup race where IO could fire
 *     isIntersecting=false before the first RAF tick
 *   - prefers-reduced-motion → single static frame (drop 1 poised
 *     above the pool, drops 2 & 3 hidden), no RAF
 *   - useEffect owns RAF + observer + media-query listener with full
 *     teardown so unmount + StrictMode double-invoke are safe
 *   - Refs are stable; React never re-renders the SVG, animation
 *     drives the DOM directly via setAttribute
 *   - Decorative: aria-hidden, pointer-events-none
 */

import { useEffect, useRef } from 'react';

const SVGNS = 'http://www.w3.org/2000/svg';
const VB_W   = 80;
const VB_H   = 440;
// LAND_X is the viewBox's true horizontal centre (80 / 2). Pool +
// splash + drops all converge here so the action stays centred in the
// strip whatever its aspect, and pool ripples have equal headroom on
// both sides before clipping.
const LAND_X = 40;
// LAND_Y at 428: pool centre sits at LAND_Y + 4 = 432, and the splash
// ripple's outer edge (ry peak ≈ 7) reaches y ≈ 439 — within the
// 440-unit viewBox by ~1 unit. Path starts at y 5–20 push the entry
// point right up to the top of the stage; the drop is fading in
// (opacity < 0.5) during its first ~270 ms anyway, so any tail bleed
// above y = 0 is invisible. Net journey covers ~98 % of viewBox height.
const LAND_Y = 428;

type Pt = { x: number; y: number };

// Paths kept inside x ∈ [25, 55] so every drop stays fully visible
// under "xMidYMid slice" on the narrowest mobile strip. The slice on a
// 64×600 strip clips ~16 viewBox units off each side, and a max-scale
// drop rotated to a 30° angle of travel has a bounding-box half-width
// of ~5.4 viewBox units. So path waypoints sit at least 5 units inside
// the slice-visible window (16.5–63.5), which keeps even the start of
// path 1/2/4/5 from showing half-clipped before fade-in completes.
const PATHS: ReadonlyArray<ReadonlyArray<Pt>> = [
  [{ x: 25, y: 10 }, { x: 27, y: 145 }, { x: 32, y: 285 }, { x: LAND_X, y: LAND_Y }], // left edge
  [{ x: 55, y: 15 }, { x: 52, y: 160 }, { x: 46, y: 295 }, { x: LAND_X, y: LAND_Y }], // right edge
  [{ x: 40, y:  5 }, { x: 40, y: 150 }, { x: 40, y: 290 }, { x: LAND_X, y: LAND_Y }], // centre
  [{ x: 27, y: 20 }, { x: 38, y: 140 }, { x: 50, y: 270 }, { x: LAND_X, y: LAND_Y }], // L→R diagonal
  [{ x: 53, y: 20 }, { x: 42, y: 145 }, { x: 33, y: 280 }, { x: LAND_X, y: LAND_Y }], // R→L diagonal
];

const PARTICLE_SPREAD_MIN = 10;
const PARTICLE_SPREAD_VAR = 8;
const PARTICLE_PEAK_MIN   = 22;
const PARTICLE_PEAK_VAR   = 16;
const PARTICLE_R_MIN      = 1.0;
const PARTICLE_R_VAR      = 0.8;
const POOL_RX_PEAK  = 22;
const POOL2_RX_PEAK = 15;

// Drop scale: small bump from the original 0.7–1.2 so the drop reads
// as a droplet, not a dot, in the 128 px strip while keeping the
// sandbox proportions.
const DROP_SCALE_MIN = 0.8;
const DROP_SCALE_VAR = 0.5;

const REDUCED_DROP_OFFSET = 50;
const REDUCED_DROP_SCALE  = 1.25;
const REDUCED_POOL_RX     = 20;
const REDUCED_POOL_RY     = 6;

const T_WANDER = 3400;
const T_SPLASH = 800;
const T_REST   = 750;
const TOTAL    = T_WANDER + T_SPLASH + T_REST;

// Three drops staggered evenly across the cycle. Phase offsets are in
// ms — drop i is `i * (TOTAL / NUM_DROPS)` ahead of drop 0, so at any
// moment one is wandering, one is splashing, one is resting.
const NUM_DROPS = 3;
const PHASE_STAGGER = TOTAL / NUM_DROPS;

// One colour per drop, picked from the Uniwater logo (the three
// distinct hex families that appear in
// public/brand/uniwater-horizontal-coloured.svg, deduped). Each drop's
// teardrop, splash particles, and both ripple rings all share its
// colour — the two rings are visually differentiated by opacity, not
// hue.
const DROP_COLORS: ReadonlyArray<string> = [
  '#04455F', // logo navy   — high contrast on cream
  '#179bb4', // logo teal   — mid contrast
  '#87d1ce', // logo soft   — softer, reads as the third voice
];

function bezier(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function posOn(wp: ReadonlyArray<Pt>, te: number): Pt {
  const seg = te * (wp.length - 1);
  let i = Math.floor(seg);
  if (i >= wp.length - 1) i = wp.length - 2;
  const lt = seg - i;
  const a = wp[i];
  const b = wp[i + 1];
  const ap = i > 0 ? wp[i - 1] : a;
  const bp = i + 2 < wp.length ? wp[i + 2] : b;
  const c1x = a.x + (b.x - ap.x) / 6;
  const c1y = a.y + (b.y - ap.y) / 6;
  const c2x = b.x - (bp.x - a.x) / 6;
  const c2y = b.y - (bp.y - a.y) / 6;
  return { x: bezier(lt, a.x, c1x, c2x, b.x), y: bezier(lt, a.y, c1y, c2y, b.y) };
}

// Classic two-curve teardrop from the sandbox. The asymmetry between
// the top apex (-h) and the bottom apex (+h * 0.6) is what makes this
// read as a drop rather than as a leaf or oval — the long pointed
// taper on top vs. the short, full taper on the bottom.
function dropPathLocal(s: number) {
  const w = 5 * s;
  const h = 8 * s;
  return `M0,${-h} C${w},${-h * 0.35} ${w * 0.8},${h * 0.5} 0,${h * 0.6} C${-w * 0.8},${h * 0.5} ${-w},${-h * 0.35} 0,${-h} Z`;
}

type Particle = {
  el: SVGCircleElement;
  ang: number;
  peak: number;
  spread: number;
  r: number;
  delay: number;
};

export function HeroDropletAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Per-drop refs — three of each, populated via callback ref so the
  // .map below stays simple. Arrays are stable across renders.
  const dropGRefs  = useRef<(SVGGElement | null)[]>([null, null, null]);
  const dropRefs   = useRef<(SVGPathElement | null)[]>([null, null, null]);
  const poolRefs   = useRef<(SVGEllipseElement | null)[]>([null, null, null]);
  const pool2Refs  = useRef<(SVGEllipseElement | null)[]>([null, null, null]);
  const partsGRefs = useRef<(SVGGElement | null)[]>([null, null, null]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Verify every per-drop ref is populated before we touch the DOM.
    type DropNodes = {
      group:  SVGGElement;
      drop:   SVGPathElement;
      pool:   SVGEllipseElement;
      pool2:  SVGEllipseElement;
      partsG: SVGGElement;
    };
    const nodes: DropNodes[] = [];
    for (let i = 0; i < NUM_DROPS; i++) {
      const group  = dropGRefs.current[i];
      const drop   = dropRefs.current[i];
      const pool   = poolRefs.current[i];
      const pool2  = pool2Refs.current[i];
      const partsG = partsGRefs.current[i];
      if (!group || !drop || !pool || !pool2 || !partsG) return;
      nodes.push({ group, drop, pool, pool2, partsG });
    }

    const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

    type DropInstance = DropNodes & {
      color: string;
      phaseOffset: number;
      lastCycle: number;
      lastPathIdx: number;
      curPath: ReadonlyArray<Pt>;
      particles: Particle[];
    };

    const drops: DropInstance[] = nodes.map((n, i) => ({
      ...n,
      color:       DROP_COLORS[i] ?? DROP_COLORS[0],
      phaseOffset: i * PHASE_STAGGER,
      lastCycle:   -1,
      lastPathIdx: -1,
      curPath:     PATHS[0],
      particles:   [],
    }));

    let raf: number | null = null;
    let start: number | null = null;

    function buildParticles(d: DropInstance) {
      d.partsG.innerHTML = '';
      d.particles = [];
      const n = 6 + Math.floor(Math.random() * 2); // 6 or 7
      for (let i = 0; i < n; i++) {
        const c = document.createElementNS(SVGNS, 'circle') as SVGCircleElement;
        c.setAttribute('fill', d.color);
        d.partsG.appendChild(c);
        const dir = i / (n - 1) - 0.5;
        d.particles.push({
          el: c,
          ang: dir * (0.7 + Math.random() * 0.5),
          peak:   PARTICLE_PEAK_MIN   + Math.random() * PARTICLE_PEAK_VAR,
          spread: PARTICLE_SPREAD_MIN + Math.random() * PARTICLE_SPREAD_VAR,
          r:      PARTICLE_R_MIN      + Math.random() * PARTICLE_R_VAR,
          delay: Math.random() * 0.12,
        });
      }
    }

    function pickPath(d: DropInstance) {
      let idx: number;
      do {
        idx = Math.floor(Math.random() * PATHS.length);
      } while (idx === d.lastPathIdx && PATHS.length > 1);
      d.lastPathIdx = idx;
      d.curPath = PATHS[idx];
    }

    function clearStage() {
      for (const d of drops) {
        d.group.setAttribute('opacity', '0');
        d.pool.setAttribute('opacity', '0');
        d.pool2.setAttribute('opacity', '0');
        d.partsG.innerHTML = '';
        d.particles = [];
      }
    }

    function renderReducedFrame() {
      // Static still: only drop 0 visible, poised above its pool.
      // Drops 1 and 2 hidden so the still doesn't read as three drops
      // stacked at the same coordinates.
      const head = drops[0];
      head.drop.setAttribute('d', dropPathLocal(REDUCED_DROP_SCALE));
      head.group.setAttribute('transform', `translate(${LAND_X},${LAND_Y - REDUCED_DROP_OFFSET})`);
      head.group.setAttribute('opacity', '1');
      head.pool.setAttribute('rx', String(REDUCED_POOL_RX));
      head.pool.setAttribute('ry', String(REDUCED_POOL_RY));
      head.pool.setAttribute('opacity', '0.4');
      head.pool2.setAttribute('opacity', '0');
      head.partsG.innerHTML = '';
      for (let i = 1; i < drops.length; i++) {
        const d = drops[i];
        d.group.setAttribute('opacity', '0');
        d.pool.setAttribute('opacity', '0');
        d.pool2.setAttribute('opacity', '0');
        d.partsG.innerHTML = '';
      }
    }

    function renderDrop(d: DropInstance, el: number) {
      if (el < T_WANDER) {
        const t = el / T_WANDER;
        const te = t * t; // ACCELERATE INTO IMPACT — do not change to smoothstep
        const pos   = posOn(d.curPath, te);
        const ahead = posOn(d.curPath, Math.min(te + 0.02, 1));
        const ang = (Math.atan2(ahead.y - pos.y, ahead.x - pos.x) * 180) / Math.PI - 90;
        const scale = DROP_SCALE_MIN + DROP_SCALE_VAR * t;
        d.drop.setAttribute('d', dropPathLocal(scale));
        d.group.setAttribute(
          'transform',
          `translate(${pos.x.toFixed(1)},${pos.y.toFixed(1)}) rotate(${ang.toFixed(1)})`,
        );
        d.group.setAttribute('opacity', t < 0.08 ? (t / 0.08).toFixed(2) : '1');
        d.pool.setAttribute('opacity', '0');
        d.pool2.setAttribute('opacity', '0');
        for (let p = 0; p < d.particles.length; p++) d.particles[p].el.setAttribute('opacity', '0');
      } else if (el < T_WANDER + T_SPLASH) {
        const st = (el - T_WANDER) / T_SPLASH;
        d.group.setAttribute('opacity', '0');
        const pr = st * POOL_RX_PEAK;
        d.pool.setAttribute('rx', pr.toFixed(1));
        d.pool.setAttribute('ry', (pr * 0.32).toFixed(1));
        d.pool.setAttribute('opacity', (0.75 * (1 - st)).toFixed(2));
        const pr2 = st * POOL2_RX_PEAK;
        d.pool2.setAttribute('rx', pr2.toFixed(1));
        d.pool2.setAttribute('ry', (pr2 * 0.32).toFixed(1));
        d.pool2.setAttribute('opacity', (0.55 * (1 - st)).toFixed(2));
        for (let k = 0; k < d.particles.length; k++) {
          const pt = d.particles[k];
          const lst = (st - pt.delay) / (1 - pt.delay);
          if (lst <= 0) {
            pt.el.setAttribute('opacity', '0');
            continue;
          }
          const arc = Math.sin(lst * Math.PI);
          const cx = LAND_X + pt.ang * pt.spread * 1.4 * lst;
          const cy = LAND_Y - arc * pt.peak;
          pt.el.setAttribute('cx', cx.toFixed(1));
          pt.el.setAttribute('cy', cy.toFixed(1));
          pt.el.setAttribute('r', (pt.r * (0.6 + 0.4 * arc)).toFixed(2));
          pt.el.setAttribute('opacity', (0.85 * (1 - lst * 0.7)).toFixed(2));
        }
      } else {
        d.group.setAttribute('opacity', '0');
        d.pool.setAttribute('opacity', '0');
        d.pool2.setAttribute('opacity', '0');
        for (let q = 0; q < d.particles.length; q++) d.particles[q].el.setAttribute('opacity', '0');
      }
    }

    function frame(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const totalElapsed = elapsed + d.phaseOffset;
        const cycle = Math.floor(totalElapsed / TOTAL);
        const el = totalElapsed % TOTAL;
        if (cycle !== d.lastCycle) {
          buildParticles(d);
          pickPath(d);
          d.lastCycle = cycle;
        }
        renderDrop(d, el);
      }

      raf = requestAnimationFrame(frame);
    }

    function startLoop() {
      if (raf !== null || reducedMQ.matches) return;
      start = null;
      for (const d of drops) {
        d.lastCycle = -1;
        buildParticles(d);
        pickPath(d);
      }
      raf = requestAnimationFrame(frame);
    }

    function stopLoop() {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    function applyReducedMode() {
      stopLoop();
      if (reducedMQ.matches) {
        renderReducedFrame();
      } else {
        clearStage();
      }
    }

    if (reducedMQ.matches) {
      renderReducedFrame();
    } else {
      clearStage();
      startLoop();
    }

    const onReducedChange = () => applyReducedMode();
    reducedMQ.addEventListener('change', onReducedChange);

    let hasIntersected = false;
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (reducedMQ.matches) continue;
            if (entry.isIntersecting) {
              hasIntersected = true;
              startLoop();
            } else if (hasIntersected) {
              stopLoop();
              clearStage();
            }
          }
        },
        { threshold: 0.1 },
      );
      io.observe(container);
    }

    return () => {
      stopLoop();
      if (io) io.disconnect();
      reducedMQ.removeEventListener('change', onReducedChange);
    };
  }, []);

  // Initial SSR state: one drop poised above one faint pool. The other
  // two drops render at opacity 0 (invisible) so SSR doesn't show
  // three drops stacked at the landing point. The first useEffect tick
  // overwrites all three with either the live loop or the reduced
  // still-frame.
  const initialDropPath = dropPathLocal(REDUCED_DROP_SCALE);
  const dropIndices = [0, 1, 2] as const;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        /* "slice" lets the SVG fill the strip's full height (and width)
           by scaling the viewBox up until both axes meet-or-exceed the
           container, then clipping the overflow. Path waypoints are
           kept within x ∈ [20, 60] so the narrowest mobile strip — which
           clips ~16 viewBox units off each side — still shows every
           drop's entry. Trade-off vs "meet": no vertical letterboxing,
           drops cover the full strip height. */
        preserveAspectRatio="xMidYMid slice"
        className="block w-full h-full"
      >
        {dropIndices.map((i) => {
          const color = DROP_COLORS[i] ?? DROP_COLORS[0];
          return (
            <g key={i}>
              <ellipse
                ref={(el) => { poolRefs.current[i] = el; }}
                cx={LAND_X}
                cy={LAND_Y + 4}
                rx={i === 0 ? REDUCED_POOL_RX : 0}
                ry={i === 0 ? REDUCED_POOL_RY : 0}
                fill="none"
                stroke={color}
                strokeWidth={0.9}
                opacity={i === 0 ? 0.4 : 0}
              />
              <ellipse
                ref={(el) => { pool2Refs.current[i] = el; }}
                cx={LAND_X}
                cy={LAND_Y + 4}
                rx={0}
                ry={0}
                fill="none"
                stroke={color}
                strokeWidth={0.7}
                opacity={0}
              />
              <g
                ref={(el) => { dropGRefs.current[i] = el; }}
                transform={`translate(${LAND_X},${LAND_Y - REDUCED_DROP_OFFSET})`}
                opacity={i === 0 ? 1 : 0}
              >
                <path
                  ref={(el) => { dropRefs.current[i] = el; }}
                  d={initialDropPath}
                  fill={color}
                />
              </g>
              <g ref={(el) => { partsGRefs.current[i] = el; }} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
