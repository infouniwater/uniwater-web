import Link from 'next/link';
import type { ReactNode } from 'react';
import { Photo } from '@/components/ui/Photo';
import { Heading, Body, Caption } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';

/** Generic card — for content blocks. Hairline border, hover lift. */
export function Card({
  children,
  className,
  inverse = false,
}: {
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <div
      className={cn(
        'p-8 transition-all duration-200 ease-calm',
        inverse
          ? 'border border-offwhite/20 bg-navy/40'
          : 'border border-hairline bg-offwhite',
        className
      )}
    >
      {children}
    </div>
  );
}

/** Solution card — hero image, title, two-line body, arrow link.
 *  Renders a real <img> when imgSrc is provided; otherwise falls back to the
 *  Photo placeholder using photoDescription as the brief.
 *  h-full lets the card stretch to row height under grid alignment. */
export function SolutionCard({
  href,
  title,
  description,
  photoDescription,
  photoRef,
  imgSrc,
  imgAlt,
}: {
  href: string;
  title: string;
  description: string;
  photoDescription: string;
  photoRef?: string;
  imgSrc?: string;
  imgAlt?: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-offwhite border border-hairline transition-all duration-200 ease-calm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(5,69,95,0.08)] h-full"
    >
      {imgSrc ? (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={imgAlt ?? photoDescription}
            className="block w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <Photo
          description={photoDescription}
          assetRef={photoRef}
          aspect="sixteen-nine"
        />
      )}
      <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-2 sm:gap-3">
        <Heading level={3} className="text-body sm:text-h3 leading-snug">{title}</Heading>
        <Body className="text-caption sm:text-body text-mute leading-snug sm:leading-normal">{description}</Body>
        <div className="mt-1 sm:mt-2 flex items-center gap-2 text-teal text-caption font-medium">
          <span>Read more</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/** Configuration card — Mono/Duo/Trio etc. Used in solution detail pages. */
export function ConfigurationCard({
  name,
  subtitle,
  description,
  recommended = false,
  inverse = false,
}: {
  name: string;
  subtitle: string;
  description: string;
  recommended?: boolean;
  inverse?: boolean;
}) {
  return (
    <div
      className={cn(
        'p-8 flex flex-col gap-3 transition-all duration-200 ease-calm',
        inverse
          ? recommended
            ? 'border-2 border-soft bg-navy/40'
            : 'border border-offwhite/15 bg-navy/30'
          : recommended
            ? 'border-2 border-navy bg-tint/30'
            : 'border border-hairline bg-offwhite'
      )}
    >
      {recommended && (
        <div className={cn('text-eyebrow font-ui font-medium uppercase tracking-[0.18em] -mb-1', inverse ? 'text-soft' : 'text-teal')}>
          Most chosen
        </div>
      )}
      <div className="flex items-baseline gap-3 flex-wrap">
        <h3 className={cn('text-h2-m md:text-h2 font-normal', inverse ? 'text-offwhite' : 'text-navy')}>{name}</h3>
        <Caption inverse={inverse}>{subtitle}</Caption>
      </div>
      <Body inverse={inverse} className={inverse ? 'text-offwhite/80' : 'text-mute'}>{description}</Body>
    </div>
  );
}

/** Stat tile — large number + label. Per §6.2. */
export function StatTile({
  value,
  label,
  inverse = false,
}: {
  value: string;
  label: string;
  inverse?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'text-[56px] md:text-[64px] font-light leading-none',
          inverse ? 'text-soft' : 'text-teal'
        )}
      >
        {value}
      </div>
      <div className={cn('h-px w-12', inverse ? 'bg-offwhite/30' : 'bg-hairline')} />
      <Caption inverse={inverse} className="uppercase tracking-wide text-eyebrow font-medium">
        {label}
      </Caption>
    </div>
  );
}

/** Process step — numbered card for the 4-step process.
 *  When iconSrc is supplied, renders icon-led layout: STEP NN eyebrow above
 *  a large engineer icon. Without it, falls back to the original big-number
 *  layout. */
export function ProcessStep({
  n,
  title,
  body,
  iconSrc,
  iconAlt,
  inverse = false,
}: {
  n: string;
  title: string;
  body: string;
  iconSrc?: string;
  iconAlt?: string;
  inverse?: boolean;
}) {
  // Card text scale aligned with the homepage reference (Solutions /
  // InstallationVersatility): h3 `text-body sm:text-h3 font-semibold`,
  // body `text-caption text-mute leading-snug`. ProcessStep uses raw
  // classes (not Heading / Body components) so the override is local
  // to this card without affecting Heading/Body's defaults sitewide.
  if (iconSrc) {
    return (
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            'text-eyebrow font-medium uppercase tracking-[0.18em]',
            inverse ? 'text-soft' : 'text-teal',
          )}
        >
          Step {n}
        </div>
        <div className={cn('w-14 h-14', inverse ? 'text-soft' : 'text-teal')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt={iconAlt ?? ''}
            width={56}
            height={56}
            className="block w-full h-full"
            loading="lazy"
            decoding="async"
          />
        </div>
        <h3
          className={cn(
            'text-body sm:text-h3 font-normal leading-snug [text-wrap:balance]',
            inverse ? 'text-offwhite' : 'text-navy',
          )}
        >
          {title}
        </h3>
        <p className={cn('text-caption leading-snug', inverse ? 'text-offwhite/80' : 'text-mute')}>
          {body}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          'text-[56px] md:text-[64px] font-light leading-none',
          inverse ? 'text-soft' : 'text-teal'
        )}
      >
        {n}
      </div>
      <h3
        className={cn(
          'text-body sm:text-h3 font-normal leading-snug [text-wrap:balance]',
          inverse ? 'text-offwhite' : 'text-navy',
        )}
      >
        {title}
      </h3>
      <p className={cn('text-caption leading-snug', inverse ? 'text-offwhite/80' : 'text-mute')}>
        {body}
      </p>
    </div>
  );
}
