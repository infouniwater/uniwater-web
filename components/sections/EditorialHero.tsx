import Link from 'next/link';

/**
 * Editorial home hero — 2026-06-02 redesign per Rajat.
 *
 * Full-bleed image background with overlay text. Six install
 * contexts crossfade behind the fixed text — terrace → utility
 * room → luxury bathroom → under-counter → plant room → industrial —
 * 36-second cycle, ~4.8 s solid + 1.2 s crossfade per slide, looping.
 *
 * Each slide is art-directed: a dedicated crop is shipped for
 * mobile (3:4 portrait), tablet (4:3 landscape), and desktop
 * (5:3 landscape), wired through a <picture> element so the
 * browser only fetches the one that matches its viewport. The
 * source PNGs come pre-scrimmed with a navy tint so the overlay
 * text reads at sufficient contrast without an additional CSS
 * gradient on top.
 *
 * The slide-1 <img> is fetchPriority="high" + loading="eager"
 * because it carries the LCP element. Slides 2-6 are loading="eager"
 * too — they need to be warm by the time their crossfade fires
 * (~6 s into the page), and since the <picture> sources are
 * media-gated, only the variant matching the user's viewport
 * actually downloads.
 *
 * Animation utilities use the `motion-safe:` modifier; users who
 * have asked the OS for less motion see only slide 1 (its inline
 * opacity:1 stays put when no animation runs).
 */

interface Slide {
  /** Filename stem under public/images/hero/. Variants resolve to
   *  <stem>-mobile.jpg, <stem>-tablet.jpg, <stem>-desktop.jpg. */
  stem: string;
  /** Single alt sentence for the slide. Used on the LCP slide only;
   *  decorative slides are aria-hidden so the rotation doesn't
   *  fight screen-reader focus. */
  alt: string;
  /** Tailwind animation utility for this slot — paired keyframe in
   *  tailwind.config.ts. The N maps to the slot index (1..6). */
  anim:
    | 'motion-safe:animate-hero-rot-1'
    | 'motion-safe:animate-hero-rot-2'
    | 'motion-safe:animate-hero-rot-3'
    | 'motion-safe:animate-hero-rot-4'
    | 'motion-safe:animate-hero-rot-5'
    | 'motion-safe:animate-hero-rot-6';
}

/** Slot 1 is the LCP slide. Order tells the brand range from
 *  residential luxury exterior → in-home installs → industrial
 *  scale, so the rotation reads as "everywhere we do this". */
const SLIDES: Slide[] = [
  {
    stem: 'terrace',
    alt: 'Three branded Uniwater whole-house vessels installed on a residential terrace with hydrangeas and a privacy garden behind.',
    anim: 'motion-safe:animate-hero-rot-1',
  },
  {
    stem: 'utility',
    alt: 'A Uniwater duo installed in a finished home utility corner beside a window with a potted fig tree.',
    anim: 'motion-safe:animate-hero-rot-2',
  },
  {
    stem: 'bathroom',
    alt: 'A bathroom drinking-water filter installed beside a luxury freestanding tub overlooking a tropical garden.',
    anim: 'motion-safe:animate-hero-rot-3',
  },
  {
    stem: 'under-counter',
    alt: 'A compact Uniwater filter installed under the vanity counter behind a dark-wood cabinet door.',
    anim: 'motion-safe:animate-hero-rot-4',
  },
  {
    stem: 'plant-room',
    alt: 'A trio of Uniwater commercial vessels installed in a building plant room with steel piping and concrete walls.',
    anim: 'motion-safe:animate-hero-rot-5',
  },
  {
    stem: 'industrial',
    alt: 'A Uniwater commercial RO and softening plant installed on a factory warehouse floor with control panel and instrumentation.',
    anim: 'motion-safe:animate-hero-rot-6',
  },
];

export function EditorialHero() {
  return (
    <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[520px] md:h-[720px] lg:h-[calc(100vh-96px)] lg:min-h-[640px]">
      {SLIDES.map((slide, i) => {
        const isLcp = i === 0;
        return (
          <div
            key={slide.stem}
            className={`absolute inset-0 ${slide.anim}`}
            style={{ opacity: isLcp ? 1 : 0, willChange: 'opacity' }}
            // Decorative for slides 2-6; slide 1 carries the alt
            // text via its <img> for the LCP path.
            aria-hidden={isLcp ? undefined : 'true'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={`/images/hero/${slide.stem}-desktop.jpg`}
              />
              <source
                media="(min-width: 768px)"
                srcSet={`/images/hero/${slide.stem}-tablet.jpg`}
              />
              <img
                src={`/images/hero/${slide.stem}-mobile.jpg`}
                alt={isLcp ? slide.alt : ''}
                className="absolute inset-0 w-full h-full object-cover object-center"
                fetchPriority={isLcp ? 'high' : 'low'}
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        );
      })}

      {/* Soft reinforcement scrim — the source images already carry
          their own navy tint, so this layer is light. Bottom-up on
          mobile (text sits at the bottom); left-to-right on desktop
          (text sits at the left). Both stop at ~60% so the right /
          top side of the image keeps its colour. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(4,69,95,0.55) 0%, rgba(4,69,95,0.25) 40%, rgba(4,69,95,0.0) 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(to right, rgba(4,69,95,0.65) 0%, rgba(4,69,95,0.30) 35%, rgba(4,69,95,0.0) 60%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative h-full container-uw flex items-end lg:items-center">
        <div className="w-full lg:max-w-[640px] pb-10 lg:pb-0 flex flex-col gap-5">
          <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
            Wellness starts with clean water
          </p>
          <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[19ch] [text-wrap:balance]">
            Integrated water systems &mdash; for the home you only build once.
          </h1>
          <div className="text-[15px] leading-relaxed text-offwhite/80 flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline">
            <span>Matched to your water chemistry</span>
            <span aria-hidden="true" className="hidden sm:inline text-offwhite/40 mx-2">&middot;</span>
            <span>Fitted to your architecture</span>
            <span aria-hidden="true" className="hidden sm:inline text-offwhite/40 mx-2">&middot;</span>
            <span>Serviced every month</span>
          </div>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:flex-wrap gap-5 sm:gap-7">
            <Link
              href="/book-survey"
              className="inline-flex items-center gap-2 whitespace-nowrap bg-navy text-offwhite font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-7 py-3.5 transition-colors duration-200 ease-calm hover:bg-teal"
            >
              Book a free survey
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              href="/water-problem-checker"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] text-offwhite/75 hover:text-offwhite border-b border-offwhite/30 hover:border-offwhite/60 pb-1 transition-colors duration-200 ease-calm"
            >
              Take the 60-second water check
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
