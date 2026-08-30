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
 *
 * 2026-08-30 restructure — site-survey critical fix (Zone A / Finding 1).
 * The old flat 4-card grid gave the CWaaS subscribe-vs-specify choice
 * and the homeowner intents equal weight, and buried "subscribe" one
 * click into /industrial. Restructured into two doors:
 *   - "For your home" groups the two homeowner cards that used to float
 *     as separate tiles (water-problem-checker, building-or-renovating).
 *   - "For your building or business" now shows Subscribe and Own
 *     directly as two buttons, instead of one card pointing at
 *     /industrial — the actual choice is visible here, not a click
 *     downstream. The "10 live sites, 2 countries" proof line (from the
 *     site survey's TrustStripe recommendation) lives on the Subscribe
 *     button itself rather than the sitewide trust stripe, since it's
 *     only relevant to a visitor already considering that path.
 *   - The trade/install audience isn't a customer decision, so it drops
 *     from a competing fourth tile to a strip beneath the two doors.
 *
 * CWAAS_BRAND_NAME is a placeholder. Trademark clearance on "Uniwater
 * Prabhav" is still open (site-survey to-do, "Prabhav brand launch").
 * Swap the constant once cleared — nothing else here should need to
 * change.
 */

// TODO(prabhav-clearance): swap to 'Prabhav by Uniwater' once trademark
// clearance on "Uniwater Prabhav" is confirmed. Do not hardcode the name
// elsewhere in this file — read it from here.
const CWAAS_BRAND_NAME = 'Clean Water as a Service';

const HOME_AUDIENCES = [
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
];

const TRADE_AUDIENCE = {
  label: 'I specify or install water systems — dealer, architect, plumber.',
  cta: 'See the trade programme',
  href: '/for-trade',
};

function ArrowIcon({ stroke = 'currentColor' }: { stroke?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-200 ease-calm group-hover:translate-x-1 self-center shrink-0"
      aria-hidden="true"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
          <h2 className="font-sans text-h1-m md:text-h1 font-normal leading-[1.1] [text-wrap:balance]">
            Pick the sentence that sounds like you.
          </h2>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4 md:gap-5 items-stretch">
            {/* For your home */}
            <div className="flex flex-col gap-4 p-6 md:p-7 bg-offwhite/5 border border-offwhite/15">
              <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
                For your home
              </p>
              <div className="flex flex-col gap-3 flex-grow">
                {HOME_AUDIENCES.map((audience) => (
                  <Link
                    key={audience.label}
                    href={audience.href}
                    className="group flex flex-col gap-3 p-5 bg-navy/30 border border-offwhite/15 backdrop-blur-[2px] transition-all duration-200 ease-calm hover:bg-navy/60 hover:border-offwhite/35"
                  >
                    <h3 className="font-sans text-body sm:text-[16px] font-normal text-offwhite leading-snug [text-wrap:balance]">
                      {audience.label}
                    </h3>
                    <p className="text-caption text-offwhite/70 leading-snug">
                      {audience.body}
                    </p>
                    <div className="flex items-baseline gap-2 text-soft text-caption font-ui font-medium pt-3 border-t border-offwhite/15">
                      <span>{audience.cta}</span>
                      <ArrowIcon />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* For your building or business */}
            <div className="flex flex-col gap-4 p-6 md:p-7 bg-offwhite/5 border border-offwhite/15">
              <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">
                For your building or business
              </p>
              <p className="text-caption text-offwhite/70 leading-snug -mt-1">
                Engineered water at scale, for societies, hotels, hospitals, and factories.
              </p>
              <div className="flex flex-col gap-3 mt-auto pt-2">
                <Link
                  href="/clean-water-as-a-service"
                  className="group flex items-center justify-between gap-4 p-5 bg-teal transition-transform duration-200 ease-calm hover:translate-x-0.5"
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-ui font-semibold text-body text-navy">
                      Subscribe — {CWAAS_BRAND_NAME}
                    </span>
                    <span className="text-caption text-navy/75">
                      Zero capex, guaranteed to grade · 10 live sites, 2 countries
                    </span>
                  </span>
                  <ArrowIcon stroke="#05455F" />
                </Link>
                <Link
                  href="/industrial"
                  className="group flex items-center justify-between gap-4 p-5 border border-offwhite/35 transition-transform duration-200 ease-calm hover:translate-x-0.5"
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-ui font-semibold text-body text-offwhite">
                      Own it — specify &amp; buy
                    </span>
                    <span className="text-caption text-offwhite/75">
                      Buy the plant, take an AMC
                    </span>
                  </span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Trade / partner strip — not a customer decision, so it
              doesn't compete with the two doors above as an equal tile. */}
          <Link
            href={TRADE_AUDIENCE.href}
            className="group flex items-center justify-between gap-4 flex-wrap p-5 bg-offwhite/[0.03] border border-offwhite/10 transition-colors duration-200 ease-calm hover:bg-offwhite/[0.06]"
          >
            <span className="text-caption text-offwhite/75">{TRADE_AUDIENCE.label}</span>
            <span className="flex items-baseline gap-2 text-soft text-caption font-ui font-medium">
              {TRADE_AUDIENCE.cta}
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
