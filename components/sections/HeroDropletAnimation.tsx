'use client';

/**
 * HeroDropletAnimation — a single water droplet wanders down one of five
 * gentle paths through the hero's right-side whitespace, splashes at a
 * fixed pool, rests, then repeats. Approved in sandbox; this file
 * productionises the reference RAF script verbatim.
 *
 * Behaviour (must not drift):
 *   - 3-phase loop: wander 3.4s → splash 0.8s → rest 0.75s (4.95s total)
 *   - 5 pre-shaped paths (left edge / right edge / centre / two soft
 *     diagonals); pick a different one each cycle
 *   - All paths converge on the same fixed pool (landX, landY)
 *   - Easing is `te = t*t` — accelerate INTO impact. Do not change to
 *     smoothstep; the brake-before-splash reading was specifically
 *     rejected during review
 *   - Teardrop rotates to its direction of travel (look-ahead sample
 *     +0.02, atan2 then -90°)
 *   - Splash: two flat ripples (ry ≈ 0.32 × rx) + 6–7 parabolic
 *     particles re-randomised every cycle
 *
 * Production additions on top of the reference:
 *   - IntersectionObserver gates the RAF loop (≥10% visible runs, fully
 *     out cancels and resets timing)
 *   - prefers-reduced-motion → single static frame, no RAF
 *   - The RAF/RAF-cleanup/observer live inside one useEffect with
 *     proper teardown so unmount + StrictMode double-invoke are safe
 *   - SVG element refs are stable; React never re-renders the SVG,
 *     animation drives the DOM directly via setAttribute
 *   - Decorative (aria-hidden, pointer-events-none)
 */

import { useEffect, useRef } from 'react';

const SVGNS = 'http://www.w3.org/2000/svg';
const LAND_X = 200;
const LAND_Y = 388;

type Pt = { x: number; y: number };

// Five gentle entry paths, every one ending at the fixed pool.
const PATHS: ReadonlyArray<ReadonlyArray<Pt>> = [
  [{ x: 70,  y: 50  }, { x: 95,  y: 150 }, { x: 140, y: 255 }, { x: LAND_X, y: LAND_Y }], // left edge
  [{ x: 265, y: 55  }, { x: 250, y: 160 }, { x: 225, y: 270 }, { x: LAND_X, y: LAND_Y }], // right edge
  [{ x: 160, y: 45  }, { x: 180, y: 150 }, { x: 190, y: 260 }, { x: LAND_X, y: LAND_Y }], // centre
  [{ x: 90,  y: 60  }, { x: 155, y: 130 }, { x: 235, y: 235 }, { x: LAND_X, y: LAND_Y }], // L→R diagonal
  [{ x: 255, y: 60  }, { x: 185, y: 140 }, { x: 120, y: 250 }, { x: LAND_X, y: LAND_Y }], // R→L diagonal
];

const T_WANDER = 3400;
const T_SPLASH = 800;
const T_REST   = 750;
const TOTAL    = T_WANDER + T_SPLASH + T_REST;

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

function dropPathLocal(s: number) {
  const w = 5 * s;
  const h = 8 * s;
  return `M0,${-h} C${w},${-h * 0.35} ${w * 0.8},${h * 0.5} 0,${h * 0.6} C${-w * 0.8},${h * 0.5} ${-w},${-h * 0.35} 0,${-h} Z`;
}

export function HeroDropletAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropGRef     = useRef<SVGGElement>(null);
  const dropRef      = useRef<SVGPathElement>(null);
  const poolRef      = useRef<SVGEllipseElement>(null);
  const pool2Ref     = useRef<SVGEllipseElement>(null);
  const partsGRef    = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const dropG     = dropGRef.current;
    const drop      = dropRef.current;
    const pool      = poolRef.current;
    const pool2     = pool2Ref.current;
    const partsG    = partsGRef.current;
    if (!container || !dropG || !drop || !pool || !pool2 || !partsG) return;

    const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

    type Particle = {
      el: SVGCircleElement;
      ang: number;
      peak: number;
      spread: number;
      r: number;
      delay: number;
    };

    let particles: Particle[] = [];
    let lastPathIdx = -1;
    let curPath: ReadonlyArray<Pt> = PATHS[0];
    let raf: number | null = null;
    let start: number | null = null;
    let lastCycle = -1;

    function buildParticles() {
      partsG!.innerHTML = '';
      particles = [];
      const n = 6 + Math.floor(Math.random() * 2); // 6 or 7
      for (let i = 0; i < n; i++) {
        const c = document.createElementNS(SVGNS, 'circle') as SVGCircleElement;
        c.setAttribute('fill', '#3f8a86');
        partsG!.appendChild(c);
        const dir = i / (n - 1) - 0.5;
        particles.push({
          el: c,
          ang: dir * (0.7 + Math.random() * 0.5),
          peak: 30 + Math.random() * 26,
          spread: 30 + Math.random() * 30,
          r: 1.8 + Math.random() * 1.6,
          delay: Math.random() * 0.12,
        });
      }
    }

    function pickPath() {
      let idx: number;
      do {
        idx = Math.floor(Math.random() * PATHS.length);
      } while (idx === lastPathIdx && PATHS.length > 1);
      lastPathIdx = idx;
      curPath = PATHS[idx];
    }

    function clearStage() {
      dropG!.setAttribute('opacity', '0');
      pool!.setAttribute('opacity', '0');
      pool2!.setAttribute('opacity', '0');
      partsG!.innerHTML = '';
      particles = [];
    }

    function renderReducedFrame() {
      drop!.setAttribute('d', dropPathLocal(1.3));
      dropG!.setAttribute('transform', `translate(${LAND_X},${LAND_Y - 58})`);
      dropG!.setAttribute('opacity', '1');
      pool!.setAttribute('rx', '42');
      pool!.setAttribute('ry', '13');
      pool!.setAttribute('opacity', '0.4');
      pool2!.setAttribute('opacity', '0');
      partsG!.innerHTML = '';
    }

    function frame(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const cycle = Math.floor(elapsed / TOTAL);
      const el = elapsed % TOTAL;

      if (cycle !== lastCycle) {
        buildParticles();
        pickPath();
        lastCycle = cycle;
      }

      if (el < T_WANDER) {
        const t = el / T_WANDER;
        const te = t * t; // ACCELERATE INTO IMPACT — do not change to smoothstep
        const pos   = posOn(curPath, te);
        const ahead = posOn(curPath, Math.min(te + 0.02, 1));
        const ang = (Math.atan2(ahead.y - pos.y, ahead.x - pos.x) * 180) / Math.PI - 90;
        const scale = 0.8 + 0.55 * t;
        drop!.setAttribute('d', dropPathLocal(scale));
        dropG!.setAttribute(
          'transform',
          `translate(${pos.x.toFixed(1)},${pos.y.toFixed(1)}) rotate(${ang.toFixed(1)})`,
        );
        dropG!.setAttribute('opacity', t < 0.08 ? (t / 0.08).toFixed(2) : '1');
        pool!.setAttribute('opacity', '0');
        pool2!.setAttribute('opacity', '0');
        for (let p = 0; p < particles.length; p++) particles[p].el.setAttribute('opacity', '0');
      } else if (el < T_WANDER + T_SPLASH) {
        const st = (el - T_WANDER) / T_SPLASH;
        dropG!.setAttribute('opacity', '0');
        const pr = st * 48;
        pool!.setAttribute('rx', pr.toFixed(1));
        pool!.setAttribute('ry', (pr * 0.32).toFixed(1));
        pool!.setAttribute('opacity', (0.75 * (1 - st)).toFixed(2));
        const pr2 = st * 32;
        pool2!.setAttribute('rx', pr2.toFixed(1));
        pool2!.setAttribute('ry', (pr2 * 0.32).toFixed(1));
        pool2!.setAttribute('opacity', (0.55 * (1 - st)).toFixed(2));
        for (let k = 0; k < particles.length; k++) {
          const pt = particles[k];
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
        // Rest beat — empty stage before the next cycle.
        dropG!.setAttribute('opacity', '0');
        pool!.setAttribute('opacity', '0');
        pool2!.setAttribute('opacity', '0');
        for (let q = 0; q < particles.length; q++) particles[q].el.setAttribute('opacity', '0');
      }

      raf = requestAnimationFrame(frame);
    }

    function startLoop() {
      if (raf !== null || reducedMQ.matches) return;
      // Reset on resume so timing recomputes cleanly rather than jumping.
      start = null;
      lastCycle = -1;
      buildParticles();
      pickPath();
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
        // IO will start the loop if we're visible.
      }
    }

    // Initial paint
    if (reducedMQ.matches) {
      renderReducedFrame();
    } else {
      clearStage();
    }

    const onReducedChange = () => applyReducedMode();
    reducedMQ.addEventListener('change', onReducedChange);

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (reducedMQ.matches) continue;
            if (entry.isIntersecting) {
              startLoop();
            } else {
              stopLoop();
              clearStage();
            }
          }
        },
        { threshold: 0.1 },
      );
      io.observe(container);
    } else if (!reducedMQ.matches) {
      // No IO support — run unconditionally.
      startLoop();
    }

    return () => {
      stopLoop();
      if (io) io.disconnect();
      reducedMQ.removeEventListener('change', onReducedChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 320 440"
        preserveAspectRatio="xMidYMid slice"
        className="block w-full h-full"
      >
        <ellipse
          ref={poolRef}
          cx={LAND_X}
          cy={392}
          rx={0}
          ry={0}
          fill="none"
          stroke="#3f8a86"
          strokeWidth={1.5}
          opacity={0}
        />
        <ellipse
          ref={pool2Ref}
          cx={LAND_X}
          cy={392}
          rx={0}
          ry={0}
          fill="none"
          stroke="#7bb6b0"
          strokeWidth={1}
          opacity={0}
        />
        <g ref={dropGRef} opacity={0}>
          <path ref={dropRef} d="M0,0" fill="#2f7d78" />
        </g>
        <g ref={partsGRef} />
      </svg>
    </div>
  );
}
