'use client';

// LAB PAGE — internal review only. Delete the whole `/lab/hero-animations`
// directory (this file, layout.tsx, and the LAB PAGE block in globals.css,
// and `components/lab/hero-animations/`) once the hero animation
// direction is finalised and the candidates here have been selected
// from or rejected.
//
// What this page is: a vertical stack of 10 hero blocks, each
// reproducing the production EditorialHero layout but rendering a
// different CSS animation candidate into the visual panel. Per-block
// controls (pause / restart / loop readout) and global controls
// (pause-all, force reduced-motion) sit in a sticky header strip.
//
// Constraints honoured:
//   - No new dependencies. All animation is pure CSS keyframes (defined
//     in globals.css) plus a CSS variable for pause/play; restart is via
//     React `key` remount.
//   - prefers-reduced-motion: respected via both the existing
//     site-wide rule in globals.css AND a `lab-static` helper class
//     that hard-disables animations on the lab wrapper.
//   - Offscreen pause: IntersectionObserver on each HeroBlock pauses
//     its animations when scrolled fully out of view.
//   - Not indexed: layout.tsx sets robots noindex/nofollow.

import { useEffect, useState } from 'react';
import { HeroBlock } from '@/components/lab/hero-animations/HeroBlock';
import { LabHeader } from '@/components/lab/hero-animations/LabHeader';
import { CANDIDATES } from '@/components/lab/hero-animations/candidates';

export default function HeroAnimationsLabPage() {
  const [globalPaused, setGlobalPaused] = useState(false);
  const [forceReducedMotion, setForceReducedMotion] = useState(false);
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSystemReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <main>
      <LabHeader
        candidates={CANDIDATES}
        globalPaused={globalPaused}
        forceReducedMotion={forceReducedMotion}
        systemReducedMotion={systemReducedMotion}
        onToggleGlobalPause={() => setGlobalPaused((p) => !p)}
        onToggleForceReducedMotion={() => setForceReducedMotion((p) => !p)}
      />

      {/* Brief — visible to reviewers above the first hero. */}
      <section className="bg-subtle border-b border-hairline">
        <div className="container-uw py-10 max-w-3xl">
          <p className="text-eyebrow uppercase text-teal font-medium mb-3">Brief</p>
          <h1 className="text-h2-m md:text-h2 font-semibold text-navy mb-4 [text-wrap:balance]">
            Ten hero animation candidates, side-by-side.
          </h1>
          <p className="text-body text-mute mb-3">
            Each block below is the production homepage hero with one
            animation candidate dropped into the right-hand visual
            panel. Same headline, same H2, same lede, same CTAs &mdash;
            the only thing that varies is the motion.
          </p>
          <p className="text-body text-mute mb-3">
            Scroll through them in one sitting. Use the number dots at
            the top to jump. Each block has its own pause / restart;
            the strip has pause-all and a force-reduced-motion toggle
            for QA.
          </p>
          <p className="text-caption text-mute italic">
            This page is not linked from the site. Delete after we pick
            a direction (or pick none).
          </p>
        </div>
      </section>

      {CANDIDATES.map((candidate) => (
        <HeroBlock
          key={candidate.id}
          candidate={candidate}
          globalPaused={globalPaused}
          forceReducedMotion={forceReducedMotion}
          systemReducedMotion={systemReducedMotion}
        />
      ))}

      <footer className="bg-navy text-offwhite/70 py-10">
        <div className="container-uw max-w-3xl">
          <p className="text-caption">
            Hero Animation Lab &mdash; internal review only. To remove
            this page: delete <code className="text-soft">app/lab/hero-animations/</code>,
            delete <code className="text-soft">components/lab/hero-animations/</code>,
            and remove the <code className="text-soft">LAB PAGE</code>{' '}
            block from <code className="text-soft">app/globals.css</code>.
          </p>
        </div>
      </footer>
    </main>
  );
}
