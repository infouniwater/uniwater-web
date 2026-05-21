import Image from 'next/image';
import { Display, Lede } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { HeroFiltration } from '@/components/sections/HeroFiltration';
import { SYSTEM_STARTS_FROM_INR, HERO_VIDEO_SRC } from '@/content/site';

/**
 * Editorial home hero — restructured 2026-05-21 per homepage-restructure
 * brief (Rajat). Earlier version led with operational language
 * ("We engineer your water — and we maintain it.") and packed four
 * sentences of body copy + an inline pull-quote into the hero.
 *
 * Current shape:
 *   - H1 promotes the wellness tagline (already in <meta> + footer)
 *   - H2 names the audience ("homes you don't get to redo")
 *   - Single sentence collapses what we do + service rhythm
 *   - Two CTAs unchanged (book survey / water check)
 *   - Italic price anchor below CTAs
 *   - Pull-quote removed from the hero — moved to sit above FinalCTA
 *     on the homepage
 *
 * Tertiary phone + WhatsApp CTAs intentionally absent; phone/WhatsApp
 * live in the header + footer + WhatsAppFAB, so the hero stays focused.
 */

const HERO_IMAGE = {
  // TODO: Replace hero image. Brief: either (a) before/after split of
  // scaled tap or stained marble grout vs. clean, or (b) wide
  // finished-bathroom shot with small inset showing the hidden install.
  // The current image is the marble-bathroom hero that has been bumped
  // to its second appearance on the page — card 02 of the "five places"
  // showcase on /solutions/bathroom-filter. Placeholder kept for layout.
  src: '/images/photography/bathroom-filter-hero.jpg',
  alt:
    'Placeholder hero image — to be replaced. Currently shows a Uniwater BathSoft installation in a marble luxury bathroom.',
};

export function EditorialHero() {
  const formattedStarts = new Intl.NumberFormat('en-IN').format(SYSTEM_STARTS_FROM_INR);

  return (
    <section className="relative bg-offwhite border-b border-hairline overflow-hidden">
      {/* Hero filtration narrative — Before/Arrow/After diptych anchored to
          the bottom whitespace band only. Communicates the brand promise
          ("we turn dirty water into clean water") explicitly via labels
          + motion contrast (dirty jitters, clean pulses). Never overlaps
          headline text or hero image — confined to the bottom band. */}
      <HeroFiltration />
      <div className="container-uw relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-96px)] py-14 sm:py-20 md:py-24 lg:py-0">
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

      {/* Scroll-down indicator — only on desktop where the hero is full-height. */}
      <div className="hidden lg:flex justify-center pb-6">
        <a
          href="#trust-strip"
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
