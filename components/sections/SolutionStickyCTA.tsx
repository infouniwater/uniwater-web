'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PRIMARY_PHONE, PRIMARY_PHONE_HREF } from '@/content/site';

/**
 * Persistent in-page CTA shown on solution detail pages between the
 * Configurations section and the FinalCTA section (BLUEPRINT §4 + Sprint 1.2).
 *
 * Activated by two sentinel <div>s placed by the SolutionDetailTemplate:
 *   #solution-sticky-start — anchor after the Configurations section
 *   #solution-sticky-end   — anchor immediately before the FinalCTA
 *
 * Mobile: full-width bottom bar. Desktop: right-anchored pill mid-screen.
 */
interface Props {
  /** Optional pre-filled href passed by the solution detail template so the
   *  destination /book-survey loads with the relevant problem already ticked. */
  bookSurveyHref?: string;
}

export function SolutionStickyCTA({ bookSurveyHref = '/book-survey' }: Props = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = document.getElementById('solution-sticky-start');
    const end = document.getElementById('solution-sticky-end');
    if (!start || !end) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const startTop = start.getBoundingClientRect().top;
      const endTop = end.getBoundingClientRect().top;
      const next = startTop < 80 && endTop > window.innerHeight - 80;
      setVisible((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        fixed z-30 animate-fade-in
        inset-x-0 bottom-0 bg-offwhite border-t border-hairline shadow-[0_-4px_12px_rgba(5,69,95,0.06)]
        lg:inset-x-auto lg:left-auto lg:right-6 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2
        lg:border lg:border-hairline lg:rounded-sm lg:shadow-[0_8px_24px_rgba(5,69,95,0.12)]
      "
    >
      <div className="px-6 py-3 lg:px-4 flex flex-col items-center gap-2 lg:gap-0">
        <Button href={bookSurveyHref} size="md" className="w-full lg:w-auto whitespace-nowrap">
          Book a free survey
        </Button>
        {/* Phone fallback shown below the button on mobile/tablet where typing is the friction.
            Hidden on lg+ to keep the desktop pill at its original tight footprint. */}
        <p className="lg:hidden text-caption text-mute leading-tight">
          Or call{' '}
          <a
            href={PRIMARY_PHONE_HREF}
            className="text-navy hover:text-teal transition-colors duration-200 ease-calm underline underline-offset-4 decoration-hairline"
          >
            {PRIMARY_PHONE}
          </a>
        </p>
      </div>
    </div>
  );
}
