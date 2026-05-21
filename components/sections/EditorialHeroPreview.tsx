import Image from 'next/image';
import { Display, Lede } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SYSTEM_STARTS_FROM_INR, HERO_VIDEO_SRC } from '@/content/site';

/**
 * Preview-only hero — proposed rewrite per the homepage-restructure brief
 * (2026-05-21, Rajat). Lives on /home-preview alongside the live hero on /,
 * so Rajat can compare the two without affecting production traffic.
 *
 * Differences vs. the live EditorialHero:
 *   - H1 promotes the wellness tagline ("Wellness starts with clean water.")
 *   - New H2 names the audience ("homes you don't get to redo")
 *   - Body collapses four prior sentences into one
 *   - Price anchor moved to an italic line below the CTAs
 *   - Inline composite pull-quote removed (will live above FinalCTA on the
 *     proposed homepage; rendered there in /home-preview/page.tsx)
 *   - Hero image kept as placeholder with a TODO comment marking the
 *     replacement brief from the spec
 *
 * Do not import this component from app/page.tsx. It's only for the
 * preview route until the restructure is approved.
 */

const HERO_IMAGE = {
  // TODO: Replace hero image. Brief from the homepage-restructure spec:
  // either (a) before/after split of scaled tap or stained marble grout
  // vs. clean, or (b) wide finished-bathroom shot with small inset showing
  // the hidden install. The current image is the marble-bathroom hero
  // that would be bumped to card 02 of the "five places" showcase on
  // /solutions/bathroom-filter once the restructure ships.
  src: '/images/photography/bathroom-filter-hero.jpg',
  alt:
    'Placeholder hero image — to be replaced. Currently shows a Uniwater BathSoft installation in a marble luxury bathroom.',
};

export function EditorialHeroPreview() {
  const formattedStarts = new Intl.NumberFormat('en-IN').format(SYSTEM_STARTS_FROM_INR);

  return (
    <section className="bg-offwhite border-b border-hairline">
      <div className="container-uw">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-96px)] py-6 lg:py-0">
          {/* Text panel */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Display>Wellness starts with clean water.</Display>
            <h2 className="text-h2-m md:text-h2 font-light text-navy/85 leading-snug [text-wrap:balance]">
              Engineered, installed, and serviced &mdash; for the homes you don&rsquo;t get to redo.
            </h2>
            <Lede className="text-mute">
              Bathroom filters, whole-house systems, drinking water &mdash; surveyed before we quote, serviced every month after.
            </Lede>

            {/* Primary + secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
              <Button href="/book-survey" size="lg">
                Book a free survey
              </Button>
              <Button href="/water-problem-checker" variant="tertiary">
                Take the 60-second water check
                <svg className="ml-2" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>

            {/* Italic price anchor below the CTAs */}
            <p className="font-editorial italic text-mute text-caption mt-1">
              Surveys are free. Bathroom filters from ₹{formattedStarts}.
            </p>
          </div>

          {/* Visual — see HERO_IMAGE comment above for the replacement brief. */}
          <div className="lg:col-span-6 lg:py-12">
            <div className="relative w-full overflow-hidden aspect-[4/3] lg:aspect-[56/75]">
              {HERO_VIDEO_SRC ? (
                <video
                  src={HERO_VIDEO_SRC}
                  poster={HERO_IMAGE.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={HERO_IMAGE.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover animate-ken-burns"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-down indicator — only on desktop. Points at the preview-page
          trust-strip anchor (different from the live hero's #how-it-works
          target because section ordering differs in the proposed restructure). */}
      <div className="hidden lg:flex justify-center pb-6">
        <a
          href="#preview-trust-strip"
          aria-label="Scroll to track record"
          className="text-mute hover:text-teal transition-colors duration-200 ease-calm"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
