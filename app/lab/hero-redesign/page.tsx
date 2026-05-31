import Image from 'next/image';
import type { Metadata } from 'next';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { HeroDropletAnimation } from '@/components/sections/HeroDropletAnimation';
import { Display, Lede } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SYSTEM_STARTS_FROM_INR } from '@/content/site';

export const metadata: Metadata = {
  title: 'Hero redesign — lab',
  robots: { index: false, follow: false },
};

const HERO_IMAGE = {
  src: '/images/photography/whole-house-luxury-villa.jpg',
  alt: 'Three branded Uniwater whole-house vessels installed on a luxury villa terrace, with garden plantings and city skyline behind.',
};

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
 * Variant A — Operational lead, single CTA, no wellness H1
 * ────────────────────────────────────────────────────────────── */
function VariantA() {
  const formattedStarts = new Intl.NumberFormat('en-IN').format(SYSTEM_STARTS_FROM_INR);
  return (
    <section className="bg-offwhite border-b border-hairline">
      <div className="container-uw">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-96px)] py-8 sm:py-12 md:py-24 lg:py-0">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="flex gap-4 sm:gap-6 lg:gap-8">
              <div className="flex-1 min-w-0 flex flex-col gap-6">
                <Display>Engineered, installed, and serviced &mdash; for the homes you don&rsquo;t get to redo.</Display>
                <Lede className="text-mute">
                  Bathroom filters, whole-house systems, drinking water &mdash; surveyed before we quote, serviced every month after.
                </Lede>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                  <Button href="/book-survey" size="lg">Book a free survey</Button>
                  <a href="/water-problem-checker" className="text-caption text-teal underline underline-offset-4 hover:text-navy">
                    Or take the 60-second water check &rarr;
                  </a>
                </div>
                <p className="font-editorial italic text-mute text-caption mt-1">
                  Surveys are free. Bathroom filters from &#8377;{formattedStarts}.
                </p>
              </div>
              <div className="relative w-16 sm:w-20 lg:w-24 shrink-0 self-stretch pointer-events-none overflow-hidden z-10">
                <HeroDropletAnimation />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 -mx-6 md:-mx-12 lg:mx-0 -mt-8 sm:-mt-12 md:-mt-24 lg:mt-0">
            <div className="relative w-full overflow-hidden aspect-[16/9] lg:aspect-[56/75]">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Variant B — Operational lead + tiny wellness eyebrow above
 * (keeps the brand line at the top without competing with the H1)
 * ────────────────────────────────────────────────────────────── */
function VariantB() {
  const formattedStarts = new Intl.NumberFormat('en-IN').format(SYSTEM_STARTS_FROM_INR);
  return (
    <section className="bg-offwhite border-b border-hairline">
      <div className="container-uw">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-96px)] py-8 sm:py-12 md:py-24 lg:py-0">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="flex gap-4 sm:gap-6 lg:gap-8">
              <div className="flex-1 min-w-0 flex flex-col gap-6">
                <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-teal">
                  Wellness starts with clean water
                </p>
                <Display>Engineered, installed, and serviced &mdash; for the homes you don&rsquo;t get to redo.</Display>
                <Lede className="text-mute">
                  Bathroom filters, whole-house systems, drinking water &mdash; surveyed before we quote, serviced every month after.
                </Lede>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                  <Button href="/book-survey" size="lg">Book a free survey</Button>
                  <a href="/water-problem-checker" className="text-caption text-teal underline underline-offset-4 hover:text-navy">
                    Or take the 60-second water check &rarr;
                  </a>
                </div>
                <p className="font-editorial italic text-mute text-caption mt-1">
                  Surveys are free. Bathroom filters from &#8377;{formattedStarts}.
                </p>
              </div>
              <div className="relative w-16 sm:w-20 lg:w-24 shrink-0 self-stretch pointer-events-none overflow-hidden z-10">
                <HeroDropletAnimation />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 -mx-6 md:-mx-12 lg:mx-0 -mt-8 sm:-mt-12 md:-mt-24 lg:mt-0">
            <div className="relative w-full overflow-hidden aspect-[16/9] lg:aspect-[56/75]">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Variant C — Operational lead + trust strip under the CTA
 * (drops the lede, leans on three trust ticks instead)
 * ────────────────────────────────────────────────────────────── */
function VariantC() {
  const formattedStarts = new Intl.NumberFormat('en-IN').format(SYSTEM_STARTS_FROM_INR);
  return (
    <section className="bg-offwhite border-b border-hairline">
      <div className="container-uw">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center lg:min-h-[calc(100vh-96px)] py-8 sm:py-12 md:py-24 lg:py-0">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="flex gap-4 sm:gap-6 lg:gap-8">
              <div className="flex-1 min-w-0 flex flex-col gap-6">
                <Display>Engineered, installed, and serviced &mdash; for the homes you don&rsquo;t get to redo.</Display>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
                  <Button href="/book-survey" size="lg">Book a free survey</Button>
                  <p className="font-editorial italic text-mute text-caption">
                    Free survey. Bathroom filters from &#8377;{formattedStarts}.
                  </p>
                </div>
                <ul className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-6 text-caption text-mute">
                  <li className="flex items-center gap-2">
                    <Tick /> Engineered by us, not bolted on
                  </li>
                  <li className="flex items-center gap-2">
                    <Tick /> Monthly service, in person
                  </li>
                  <li className="flex items-center gap-2">
                    <Tick /> 9 cities across India &amp; Nepal
                  </li>
                </ul>
                <a href="/water-problem-checker" className="text-caption text-teal underline underline-offset-4 hover:text-navy mt-2">
                  Or take the 60-second water check &rarr;
                </a>
              </div>
              <div className="relative w-16 sm:w-20 lg:w-24 shrink-0 self-stretch pointer-events-none overflow-hidden z-10">
                <HeroDropletAnimation />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 -mx-6 md:-mx-12 lg:mx-0 -mt-8 sm:-mt-12 md:-mt-24 lg:mt-0">
            <div className="relative w-full overflow-hidden aspect-[16/9] lg:aspect-[56/75]">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-teal shrink-0">
      <path d="M3 7.5L6 10.5L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroRedesignLab() {
  return (
    <>
      <div className="bg-navy text-offwhite border-b border-offwhite/15">
        <div className="container-uw py-10">
          <p className="text-eyebrow font-ui font-medium uppercase text-soft mb-3">Lab &mdash; not indexed</p>
          <h1 className="text-h2-m md:text-h2 font-normal mb-3">Homepage hero — three redesigns</h1>
          <p className="text-caption text-offwhite/75 max-w-2xl">
            Current hero first, then three variants stacked below. Same image, same droplet, same image-above-text mobile order. Only the text composition + CTA structure change. Compare on mobile and desktop both.
          </p>
        </div>
      </div>

      <Label
        tag="Variant 0 — Current (live on /)"
        title="Wellness H1 + operational H2 + lede + two CTAs"
        summary="Four text blocks compete for the fold. On mobile the CTAs sit below it. The wellness H1 is also already in the tagline and footer, so it doubles up."
      />
      <EditorialHero />

      <Label
        tag="Variant A — Operational lead"
        title="Operational line becomes the H1. Wellness drops out."
        summary="Three text blocks instead of four: H1, lede, CTA. The wellness line returns lower on the page (e.g. above FinalCTA) so the brand register is preserved without competing with conversion. Secondary CTA demoted to a text link so there's one primary action."
      />
      <VariantA />

      <Label
        tag="Variant B — Operational lead + wellness eyebrow"
        title="Same as A, but keeps 'Wellness starts with clean water' as a tiny eyebrow above the H1."
        summary="Gentlest change. The brand register stays at the top of the page, but as a small uppercase eyebrow rather than as a competing display headline. CTA structure same as A."
      />
      <VariantB />

      <Label
        tag="Variant C — Trust strip"
        title="Drop the lede, replace with three trust ticks under the CTA."
        summary="Most aggressive. H1 + CTA + 3 trust signals + price. The lede sentence ('Bathroom filters, whole-house, drinking water...') moves into the catalogue section below. Best for conversion; loses the most narrative."
      />
      <VariantC />
    </>
  );
}
