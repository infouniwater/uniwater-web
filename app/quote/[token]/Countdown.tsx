'use client';

import { useEffect, useState } from 'react';

/** Live countdown to the offer deadline. Renders D · H · M · S and flips to an
 *  "expired" note once the deadline passes. Client-only (uses a ticking timer). */
export function Countdown({ expiresAt }: { expiresAt: string }) {
  const target = new Date(expiresAt).getTime();
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const expired = diff <= 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  if (expired) {
    return (
      <p className="font-ui text-body text-offwhite/80">This offer has expired — talk to us for current pricing.</p>
    );
  }

  const cell = (val: number, label: string) => (
    <div className="flex flex-col items-center">
      <span className="font-numeric text-h1 leading-none tabular-nums text-offwhite">
        {String(val).padStart(2, '0')}
      </span>
      <span className="font-ui text-eyebrow uppercase tracking-[0.18em] text-soft mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-start gap-6 sm:gap-8" role="timer" aria-live="off">
      {cell(d, 'Days')}
      {cell(h, 'Hrs')}
      {cell(m, 'Min')}
      {cell(s, 'Sec')}
    </div>
  );
}
