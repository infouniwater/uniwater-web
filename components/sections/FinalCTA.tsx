import Link from 'next/link';
import { CONTACT } from '@/content/site';

interface FinalCTAProps {
  headline?: string;
  sub?: string;
  primaryCTA?: { label: string; href: string };
  /** Use for B2B pages — secondary CTA verb changes per Blueprint §12.5 */
  audience?: 'residential' | 'industrial';
}

/**
 * Final CTA — bookend to the hero. Same image-with-scrim canvas, same
 * editorial typography register, same pill primary + text-link secondary
 * pattern. The page opens and closes in the same brand voice instead of
 * fading into a generic conversion strip.
 *
 * The terrace shot is shared with the hero's slide 1 on purpose: the
 * page opens with "engineered for the home you only build once" on the
 * terrace, and closes on the same terrace — a visual rhyme.
 */
export function FinalCTA({
  headline = 'Ready when you are.',
  sub = 'Tell us about your home. We’ll come to you.',
  primaryCTA,
  audience = 'residential',
}: FinalCTAProps) {
  const defaultCTA =
    audience === 'industrial'
      ? { label: 'Submit an RFQ', href: '/industrial#rfq' }
      : { label: 'Book a free survey', href: '/book-survey' };
  const cta = primaryCTA || defaultCTA;
  const eyebrow = audience === 'industrial' ? 'Engineering brief' : 'Your next step';

  return (
    <section className="relative w-full bg-navy text-offwhite overflow-hidden border-t border-offwhite/10">
      {/* Background image — terrace shot, same family as the hero's
          LCP slide so the page opens and closes on the same canvas. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture>
        <source media="(min-width: 1024px)" srcSet="/images/hero/terrace-desktop.jpg" />
        <source media="(min-width: 768px)" srcSet="/images/hero/terrace-tablet.jpg" />
        <img
          src="/images/hero/terrace-mobile.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,69,95,0.78) 0%, rgba(4,69,95,0.90) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative container-uw py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl flex flex-col gap-5">
          <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
            {eyebrow}
          </p>
          <h2 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.1] max-w-[22ch] [text-wrap:balance]">
            {headline}
          </h2>
          <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl mt-1">
            {sub}
          </p>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline gap-5 sm:gap-7">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 whitespace-nowrap bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-soft"
            >
              {cta.label}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <a
              href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}
              className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] text-offwhite/75 hover:text-offwhite transition-colors duration-200 ease-calm"
            >
              <span className="border-b border-offwhite/30 group-hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm">
                Or call {CONTACT.phones[0]}
              </span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M5.5 4.5C5.5 4.5 7 4 8 4C8.5 4 9 4.5 9 5L9.5 7.5C9.5 8 9.5 8.5 9 9L7.5 10.5C8.5 13 11 15.5 13.5 16.5L15 15C15.5 14.5 16 14.5 16.5 14.5L19 15C19.5 15 20 15.5 20 16C20 17 19.5 18.5 19.5 18.5C19 19.5 18 20 17 20C10.5 20 4 13.5 4 7C4 6 4.5 5 5.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
