import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'plain' | 'subtle' | 'tint' | 'inverse' | 'navy';
type Padding = 'tight' | 'default' | 'loose';

/** Image-with-scrim background. `stem` resolves to the standard
 *  /images/hero/{stem}-{mobile,tablet,desktop}.jpg art-directed set
 *  (3:4 portrait mobile, 4:3 landscape tablet, 5:3 landscape desktop).
 *  Only applied when the section tone is dark; ignored otherwise. */
interface SectionImage {
  stem: string;
  /** Alt text. Defaults to "" (decorative) since these images are
   *  texture beneath the section's primary content. */
  alt?: string;
}

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  tone?: Tone;
  padding?: Padding;
  bleed?: boolean;       // full-bleed background, content still constrained
  /** Optional image-with-scrim background. Only renders on dark tones
   *  (navy / inverse). The section becomes `relative overflow-hidden`
   *  so the absolute image + scrim layers stay inside. */
  image?: SectionImage;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const tones: Record<Tone, string> = {
  plain: 'bg-offwhite text-ink',
  subtle: 'bg-subtle text-ink',
  tint: 'bg-tint text-navy',
  // Inverse-navy used sparingly per §3.7 — 1-2 per page max
  inverse: 'bg-navy text-offwhite',
  // Navy band specifically for embedded dark infographics — same visual but semantic
  navy: 'bg-navy text-offwhite',
};

const paddings: Record<Padding, string> = {
  tight: 'section-tight',
  default: 'section',
  loose: 'section-loose',
};

const isDarkTone = (t: Tone): boolean => t === 'navy' || t === 'inverse';

export function Section({
  tone = 'plain',
  padding = 'default',
  bleed: _bleed,
  image,
  children,
  className,
  contentClassName,
  ...rest
}: SectionProps) {
  const showImage = image && isDarkTone(tone);

  if (showImage) {
    return (
      <section
        className={cn('relative overflow-hidden', tones[tone], paddings[padding], className)}
        {...rest}
      >
        {/* Image background — same art-directed pattern the heroes use. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet={`/images/hero/${image!.stem}-desktop.jpg`} />
          <source media="(min-width: 768px)" srcSet={`/images/hero/${image!.stem}-tablet.jpg`} />
          <img
            src={`/images/hero/${image!.stem}-mobile.jpg`}
            alt={image!.alt ?? ''}
            aria-hidden={image!.alt ? undefined : 'true'}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </picture>
        {/* Heavy scrim — the section's data needs to stay legible; the
            image is a texture, not a focal point. ~0.9 opacity navy
            across the whole surface. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.96) 100%)',
          }}
          aria-hidden="true"
        />
        <div className={cn('relative container-uw', contentClassName)}>{children}</div>
      </section>
    );
  }

  return (
    <section className={cn(tones[tone], paddings[padding], className)} {...rest}>
      <div className={cn('container-uw', contentClassName)}>{children}</div>
    </section>
  );
}
