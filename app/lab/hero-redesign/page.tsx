import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { EditorialHero } from '@/components/sections/EditorialHero';

export const metadata: Metadata = {
  title: 'Hero redesign — lab',
  robots: { index: false, follow: false },
};

const HERO_IMAGE = {
  src: '/images/photography/whole-house-luxury-villa.jpg',
  alt: 'Three branded Uniwater whole-house vessels installed on a luxury villa terrace, with garden plantings and city skyline behind.',
};

// Crossfade rotation for Variant E. Order matches the brand's own
// "bathroom · whole-house · drinking water" narrative.
const ROTATING_SLIDES = [
  {
    src: '/images/photography/whole-house-luxury-villa.jpg',
    alt: 'Three branded Uniwater whole-house vessels on a luxury villa terrace.',
  },
  {
    src: '/images/photography/bathroom-filter-hero.jpg',
    alt: 'A bathroom filter recessed in a marble shower niche behind a brass freestanding bath.',
  },
  {
    src: '/images/photography/drinking-water-home-2.jpg',
    alt: 'Treated drinking water pouring from a chrome kitchen tap into a glass, family in soft focus behind.',
  },
];

function Label({ tag, title, summary }: { tag: string; title: string; summary: string }) {
  return (
    <div className="bg-navy text-offwhite">
      <div className="container-uw py-8 flex flex-col gap-2">
        <div className="text-eyebrow font-ui font-medium uppercase text-soft">{tag}</div>
        <h2 className="text-h2-m md:text-h2 font-normal">{title}</h2>
        <p className="text-caption text-offwhite/75 max-w-2xl">{summary}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Variant D — Full-bleed image with overlay text
 *
 * Image fills the section edge-to-edge. A bottom-up navy gradient
 * scrim carries the text without darkening the vessels above it.
 * On lg+ the image gets nudged so the vessels sit right-of-center,
 * leaving room for the text to breathe on the left half.
 *
 * Editorial register: short H1, one primary CTA with a benefit
 * label, one micro-trust line under the button. Wellness tagline
 * lives as a tiny uppercase eyebrow above the H1.
 * ────────────────────────────────────────────────────────────── */
function VariantD() {
  return (
    <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[640px] md:h-[720px] lg:h-[calc(100vh-96px)] lg:min-h-[640px]">
      {/* Image */}
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center lg:object-[70%_center] animate-ken-burns"
      />

      {/* Scrim — stronger from the bottom on mobile, blended from
          the left on desktop so the text-side stays readable while
          the vessels-side keeps its colour. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(4,69,95,0.85) 0%, rgba(4,69,95,0.55) 35%, rgba(4,69,95,0.0) 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(to right, rgba(4,69,95,0.85) 0%, rgba(4,69,95,0.55) 35%, rgba(4,69,95,0.0) 60%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative h-full container-uw flex items-end lg:items-center">
        <div className="w-full lg:max-w-[640px] pb-10 lg:pb-0 flex flex-col gap-5">
          <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
            Wellness starts with clean water
          </p>
          <h1 className="text-display-m md:text-display font-normal leading-[1.05] [text-wrap:balance]">
            Engineered, installed, and serviced &mdash; for the homes you don&rsquo;t get to redo.
          </h1>

          <div className="mt-2 flex flex-col gap-3">
            <div>
              <Link
                href="/book-survey"
                className="inline-flex items-center justify-center h-[52px] px-7 bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] transition-colors duration-200 ease-calm hover:bg-soft hover:text-navy"
              >
                Book a free survey &mdash; engineer visits in 48&nbsp;hrs
                <svg className="ml-2" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <p className="text-caption text-offwhite/80">
              No obligation &middot; ~30&nbsp;minutes on site &middot; Survey report mailed within 48&nbsp;hrs
            </p>
          </div>

          <a
            href="/water-problem-checker"
            className="text-caption text-offwhite/85 underline underline-offset-4 decoration-offwhite/40 hover:text-soft mt-1 w-fit"
          >
            Or take the 60-second water check &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Variant E — Same overlay as D, but the background rotates
 * between three install contexts (whole-house, bathroom, drinking
 * water). 24s cycle, ~6.8s per slide, 1.2s crossfade. Slide 1
 * has `priority` so LCP is unaffected; slides 2 & 3 are eager
 * loads that finish before they need to display.
 * `motion-safe:` on the animation utility means
 * prefers-reduced-motion users see only slide 1.
 * ────────────────────────────────────────────────────────────── */
function VariantE() {
  return (
    <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[640px] md:h-[720px] lg:h-[calc(100vh-96px)] lg:min-h-[640px]">
      {/* Rotating slides */}
      <div
        className="absolute inset-0 motion-safe:animate-hero-fade-1"
        style={{ opacity: 1, willChange: 'opacity' }}
        aria-hidden="true"
      >
        <Image
          src={ROTATING_SLIDES[0].src}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center lg:object-[70%_center]"
        />
      </div>
      <div
        className="absolute inset-0 motion-safe:animate-hero-fade-2"
        style={{ opacity: 0, willChange: 'opacity' }}
        aria-hidden="true"
      >
        <Image
          src={ROTATING_SLIDES[1].src}
          alt=""
          fill
          quality={88}
          sizes="100vw"
          loading="eager"
          className="object-cover object-center lg:object-[60%_center]"
        />
      </div>
      <div
        className="absolute inset-0 motion-safe:animate-hero-fade-3"
        style={{ opacity: 0, willChange: 'opacity' }}
        aria-hidden="true"
      >
        <Image
          src={ROTATING_SLIDES[2].src}
          alt=""
          fill
          quality={88}
          sizes="100vw"
          loading="eager"
          className="object-cover object-center lg:object-[55%_center]"
        />
      </div>

      {/* Scrim — same on every slide so the text contrast doesn't flicker. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(4,69,95,0.85) 0%, rgba(4,69,95,0.55) 35%, rgba(4,69,95,0.0) 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(to right, rgba(4,69,95,0.85) 0%, rgba(4,69,95,0.55) 35%, rgba(4,69,95,0.0) 60%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative h-full container-uw flex items-end lg:items-center">
        <div className="w-full lg:max-w-[640px] pb-10 lg:pb-0 flex flex-col gap-5">
          <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
            Wellness starts with clean water
          </p>
          <h1 className="text-display-m md:text-display font-normal leading-[1.05] [text-wrap:balance]">
            Engineered, installed, and serviced &mdash; for the homes you don&rsquo;t get to redo.
          </h1>

          <div className="mt-2 flex flex-col gap-3">
            <div>
              <Link
                href="/book-survey"
                className="inline-flex items-center justify-center h-[52px] px-7 bg-offwhite text-navy font-ui font-medium text-[15px] tracking-[0.02em] transition-colors duration-200 ease-calm hover:bg-soft hover:text-navy"
              >
                Book a free survey &mdash; engineer visits in 48&nbsp;hrs
                <svg className="ml-2" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <p className="text-caption text-offwhite/80">
              No obligation &middot; ~30&nbsp;minutes on site &middot; Survey report mailed within 48&nbsp;hrs
            </p>
          </div>

          <a
            href="/water-problem-checker"
            className="text-caption text-offwhite/85 underline underline-offset-4 decoration-offwhite/40 hover:text-soft mt-1 w-fit"
          >
            Or take the 60-second water check &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HeroRedesignLab() {
  return (
    <>
      <div className="bg-navy text-offwhite border-b border-offwhite/15">
        <div className="container-uw py-10">
          <p className="text-eyebrow font-ui font-medium uppercase text-soft mb-3">Lab &mdash; not indexed</p>
          <h1 className="text-h2-m md:text-h2 font-normal mb-3">Homepage hero &mdash; redesign demo</h1>
          <p className="text-caption text-offwhite/75 max-w-2xl">
            Current hero first, then the proposed full-bleed image-with-overlay variant. Check on phone and desktop both &mdash; mobile is where the difference is starkest because the image and text share the same fold instead of stacking.
          </p>
        </div>
      </div>

      <Label
        tag="Variant 0 — Current (live on /)"
        title="Split layout: image on one side, text on the other."
        summary="On mobile this stacks and pushes the CTA below the fold. Four text blocks compete for attention."
      />
      <EditorialHero />

      <Label
        tag="Variant D — Full-bleed image with overlay text"
        title="Image edge-to-edge. Text floats on a bottom-up navy scrim."
        summary="One H1, one primary CTA with a benefit label (Book a free survey — engineer visits in 48 hrs), one micro-trust line (No obligation · ~30 min on site · Report in 48 hrs). Wellness tagline as a tiny eyebrow above the H1. Secondary water-check action drops to a text link. Image gets a slow Ken-Burns push so it feels alive without becoming a carousel."
      />
      <VariantD />

      <Label
        tag="Variant E — Same overlay, rotating background"
        title="Three install contexts crossfade behind fixed text and CTA."
        summary="Whole-house → bathroom → drinking water, 24-second cycle, ~6.8s per slide with 1.2s crossfades. Text and CTA never move. Scrim stays identical across slides so the contrast doesn't flicker. Respects prefers-reduced-motion: anyone who's asked the OS for less motion sees only the first image, no rotation."
      />
      <VariantE />
    </>
  );
}
