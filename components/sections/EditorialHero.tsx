import Image from 'next/image';
import { Display, Lede, Caption } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SYSTEM_STARTS_FROM_INR, HERO_VIDEO_SRC } from '@/content/site';

const FALLBACK_IMAGE = {
  src: '/images/photography/bathroom-filter-hero.jpg',
  alt:
    'Uniwater BathSoft installed in a marble luxury bathroom — two stainless cylinders recessed in a backlit wall niche behind the glass shower partition, brass freestanding bathtub in the foreground',
};

/**
 * Editorial home hero — per Blueprint §6.2 + §6.2 marketing benchmark.
 *
 * Carries:
 *   - Display headline + lede + categories line
 *   - Pricing anchor ("A bathroom filter starts at ₹14,000.")
 *   - Two CTAs: Book a free survey + Take the 60-second water check
 *   - Editorial pull-quote (residential — Acasa by Malani)
 *   - Video-or-image render: when HERO_VIDEO_SRC is set, the right column
 *     swaps from <Image> to <video> with the photograph as poster.
 *
 * Tertiary phone + WhatsApp CTAs intentionally removed; phone/WhatsApp live
 * in the header + footer + WhatsAppFAB, so the hero stays focused.
 */
export function EditorialHero() {
  const formattedStarts = new Intl.NumberFormat('en-IN').format(SYSTEM_STARTS_FROM_INR);

  return (
    <section className="bg-offwhite border-b border-hairline">
      <div className="container-uw">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-96px)] py-6 lg:py-0">
          {/* Text panel — first on mobile (was second, which pushed value
              copy below the fold on phones), still left on desktop. */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            <Display>We engineer your water &mdash; and we maintain it.</Display>
            <Lede className="text-mute">
              Surveyed before quoted. Engineered before installed. Serviced every month for the life of the contract.
            </Lede>
            <p className="font-editorial italic text-mute text-lede leading-snug">
              Bathroom filters. Whole-house systems. Drinking water at the kitchen tap.
            </p>

            {/* Pricing anchor */}
            <p className="text-caption text-mute">
              <span className="text-navy font-medium">Surveys are free.</span>{' '}
              A bathroom filter starts at <span className="text-navy font-medium">₹{formattedStarts}</span>.
            </p>

            {/* Primary + secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-1">
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

            {/* Homeowner pull-quote — attribution clearly marked as composite
                until the post-install review-collection flow produces a verified
                named-customer quote we can publish in its place. */}
            <figure className="mt-4 pl-5 border-l-2 border-teal/40 max-w-xl">
              <blockquote className="font-editorial italic text-navy text-lede leading-snug">
                &ldquo;Three years in, the geyser still feels new and the marble grout hasn&rsquo;t taken a stain. The engineer comes back every month and tells us what the water did. That&rsquo;s not normal.&rdquo;
              </blockquote>
              <Caption className="text-mute mt-3">
                &mdash; Composite, based on residential install-handover feedback
              </Caption>
            </figure>
          </div>

          {/* Visual — desktop only. On mobile the image at any aspect produced
              an orphan strip between the text panel and the next section (per
              user feedback 2026-05-19). The text panel + pull-quote carry the
              hero on phones; the image returns at lg:+ where it has the column
              width to read as editorial photography rather than a thin band. */}
          <div className="hidden lg:block lg:col-span-6 lg:py-12">
            <div
              className="relative w-full overflow-hidden lg:aspect-[56/75]"
            >
              {HERO_VIDEO_SRC ? (
                <video
                  src={HERO_VIDEO_SRC}
                  poster={FALLBACK_IMAGE.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={FALLBACK_IMAGE.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={FALLBACK_IMAGE.src}
                  alt={FALLBACK_IMAGE.alt}
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
          href="#how-it-works"
          aria-label="Scroll to what we do"
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
