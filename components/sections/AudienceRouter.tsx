import Link from 'next/link';

/**
 * Audience Router — per Critique §1.3 + Blueprint §7.
 *
 * Above-fold 30-second answer to "is this for me?" Cards are mindset-led,
 * not product-led: the visitor picks the sentence that matches their
 * current state, and we send them to the page that closes that state.
 *
 * 2026-06-02 redesign: lifted out of the flat offwhite Section into the
 * hero's image-with-scrim register. Same vocabulary (luxury photography
 * behind a navy gradient, soft eyebrow, light-weight heading) so the
 * decision moment shares the hero's editorial gravity rather than
 * reading as a plain card list.
 */

const AUDIENCES = [
  {
    label: 'Something is wrong with my water.',
    body:
      'Yellow stains. Scale on the geyser. Marble going orange. We test the chemistry first.',
    cta: 'Find what fits',
    href: '/water-problem-checker',
  },
  {
    // Re-pointed 2026-06-03: this card used to send the homeowner to
    // /for-architects (trade portal -- DWG/BIM/submittal-grade PDFs)
    // which spoke past the visitor. /building-or-renovating is the
    // homeowner-facing landing for the same intent; it links back to
    // /for-architects for the architect's side.
    label: 'I’m building or renovating.',
    body:
      'Specify the water before the tile goes down. Survey at draft drawings; the plumbing routes around the system.',
    cta: 'Plan the system',
    href: '/building-or-renovating',
  },
  {
    // Re-pointed 2026-06-04 to /clean-water-as-a-service. The institutional
    // visitor's first impression is now the subscription frame (Uniwater
    // owns + runs the plant; you pay for water held to spec) rather than
    // the capex/RFQ frame; the existing /industrial flow is still one
    // click away from there.
    label: 'I run a building, hotel, or factory.',
    body:
      'Buy water outcomes, not water plants. We own and run the plant; you pay for water held to spec.',
    cta: 'See Clean Water as a Service',
    href: '/clean-water-as-a-service',
  },
  {
    label: 'I specify or install water systems.',
    body:
      'Three lanes — dealer, designer, installer. Trade pricing, install support, lead routing.',
    cta: 'See the trade programme',
    href: '/for-trade',
  },
];

export function AudienceRouter() {
  return (
    <section className="relative w-full bg-navy text-offwhite overflow-hidden border-y border-offwhite/10">
      {/* Background image — a quiet luxury bathroom from the hero set,
          chosen so the decision moment feels personal (your home) without
          competing with the hero's terrace LCP slide. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/images/hero/bathroom-desktop.jpg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero/bathroom-tablet.jpg"
        />
        <img
          src="/images/hero/bathroom-mobile.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </picture>

      {/* Scrim — heavier than the hero's because the cards need a
          legible canvas. Bottom-up on mobile, top-down on desktop so
          the heading block sits on the darker side. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.78) 45%, rgba(4,69,95,0.55) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(to bottom, rgba(4,69,95,0.78) 0%, rgba(4,69,95,0.88) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative container-uw py-16 md:py-24 lg:py-32">
        <div className="flex flex-col gap-4 mb-10 md:mb-14 max-w-3xl">
          <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
            Where would you like to start?
          </p>
          <h2 className="text-h1-m md:text-h1 font-normal leading-[1.1] [text-wrap:balance]">
            Pick the sentence that sounds like you.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {AUDIENCES.map((audience) => (
            <Link
              key={audience.label}
              href={audience.href}
              className="group flex flex-col gap-4 p-6 md:p-7 bg-navy/30 border border-offwhite/15 backdrop-blur-[2px] transition-all duration-200 ease-calm hover:bg-navy/60 hover:border-offwhite/35"
            >
              <h3 className="text-body sm:text-[18px] font-normal text-offwhite leading-snug [text-wrap:balance]">
                {audience.label}
              </h3>
              <p className="text-caption text-offwhite/70 leading-snug flex-grow">
                {audience.body}
              </p>
              <div className="flex items-baseline gap-2 text-soft text-caption font-ui font-medium mt-2 pt-4 border-t border-offwhite/15">
                <span>{audience.cta}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-200 ease-calm group-hover:translate-x-1 self-center"
                  aria-hidden="true"
                >
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
