import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Heading, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

/**
 * Residential hero-object — gives a first-time homeowner one tangible system
 * to grasp before the SKU range (BathSoft / HomeSoft / drinking) underneath.
 *
 * Framed honestly to the residential model: one engineered system, surveyed
 * and installed, then serviced every month — NOT a "subscription" product
 * (that's the separate B2B Clean-Water-as-a-Service offering). Survey-first
 * positioning is kept; no prices invented.
 */
export function HomeSystemHero() {
  return (
    <Section padding="default" tone="subtle">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <Eyebrow>One system, not a catalogue</Eyebrow>
          <Heading level={2}>One engineered system, hidden in your home and serviced every month.</Heading>
          <Body className="text-mute">
            Surveyed first, then matched to your water chemistry and your architecture — and
            maintained every month by the engineers who designed it. No two homes get the same box.
          </Body>
          <div className="mt-2">
            <Button href="/book-survey">Book a free survey</Button>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative w-full overflow-hidden border border-hairline aspect-[16/10] lg:aspect-[4/3]">
            <Image
              src="/images/photography/bathroom-filter-floor-mounted.jpg"
              alt="A floor-mounted Uniwater bathroom water filter installed in a finished bathroom"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
