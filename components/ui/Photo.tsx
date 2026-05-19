import Image from 'next/image';
import { cn } from '@/lib/cn';
import { resolvePhoto } from '@/lib/photo-registry';

/**
 * Photo slot — renders a real image whenever one is available, falling back
 * to a labelled placeholder that documents the photographic brief.
 *
 * Resolution order:
 *   1. `imgSrc` prop supplied at the call site → render <Image> with that file.
 *   2. `assetRef` resolves in `lib/photo-registry` → render <Image> with the
 *      registered file (lets us swap photography from a single map without
 *      touching call sites).
 *   3. Neither resolves → render the placeholder with `description` so the
 *      team can see the aspect ratio, brief, and ref for that slot.
 *
 * When real, slot-specific photography lands, prefer either:
 *   - replacing the registry entry for the assetRef, or
 *   - passing imgSrc/imgAlt at the call site.
 */

type Aspect =
  | 'square'      // 1:1
  | 'four-five'   // 4:5 (mobile hero, sticky aside)
  | 'three-four'  // 3:4 (5-places grid)
  | 'five-six'    // 5:6 (solution hero)
  | 'sixteen-nine'// 16:9 (solution cards, installs)
  | 'sixteen-ten' // 16:10 (case-study cards)
  | 'four-three'  // 4:3 (portraits)
  | 'hero-desktop';// 56:75 desktop hero

/**
 * Tailwind class equivalents of each aspect — used so the aspect can vary
 * by breakpoint via `sm:`/`lg:` variants, which inline `style` can't do.
 * Pre-declared so JIT can extract them at build time.
 */
const aspectClass: Record<Aspect, string> = {
  'square':         'aspect-[1/1]',
  'four-five':      'aspect-[4/5]',
  'three-four':     'aspect-[3/4]',
  'five-six':       'aspect-[5/6]',
  'sixteen-nine':   'aspect-[16/9]',
  'sixteen-ten':    'aspect-[16/10]',
  'four-three':     'aspect-[4/3]',
  'hero-desktop':   'aspect-[56/75]',
};

const aspectClassSmUp: Record<Aspect, string> = {
  'square':         'sm:aspect-[1/1]',
  'four-five':      'sm:aspect-[4/5]',
  'three-four':     'sm:aspect-[3/4]',
  'five-six':       'sm:aspect-[5/6]',
  'sixteen-nine':   'sm:aspect-[16/9]',
  'sixteen-ten':    'sm:aspect-[16/10]',
  'four-three':     'sm:aspect-[4/3]',
  'hero-desktop':   'sm:aspect-[56/75]',
};

interface PhotoProps {
  /** Photographic brief for this slot — used as alt text when real photo lands. */
  description: string;
  /** Blueprint §14.1 asset reference if applicable (e.g. "hero-01"). */
  assetRef?: string;
  /** Direct image path — short-circuits the registry lookup. */
  imgSrc?: string;
  /** Alt text override for the direct image path. Defaults to description. */
  imgAlt?: string;
  aspect?: Aspect;
  /**
   * Optional aspect override for sub-`sm:` (≤640px) viewports. When set,
   * the photo uses this aspect on mobile and the regular `aspect` from `sm:`
   * upward. Use this to render portrait heroes as landscape on phones so
   * they don't take ~500px of vertical scroll.
   */
  mobileAspect?: Aspect;
  /** Use 'dark' on inverse-navy sections so the placeholder reads against navy. */
  scheme?: 'light' | 'dark';
  className?: string;
  rounded?: boolean;
}

export function Photo({
  description,
  assetRef,
  imgSrc,
  imgAlt,
  aspect = 'sixteen-nine',
  mobileAspect,
  scheme = 'light',
  className,
  rounded = false,
}: PhotoProps) {
  const resolved = imgSrc
    ? { src: imgSrc, alt: imgAlt ?? description }
    : resolvePhoto(assetRef);

  const aspectClasses = mobileAspect
    ? cn(aspectClass[mobileAspect], aspectClassSmUp[aspect])
    : aspectClass[aspect];

  if (resolved) {
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden border border-hairline',
          aspectClasses,
          rounded && 'rounded-sm',
          className
        )}
      >
        <Image
          src={resolved.src}
          alt={resolved.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const isDark = scheme === 'dark';
  return (
    <div
      role="img"
      aria-label={description}
      className={cn(
        'relative w-full overflow-hidden flex items-center justify-center',
        aspectClasses,
        isDark
          ? 'bg-navy/40 border border-offwhite/15'
          : 'bg-subtle border border-hairline',
        rounded && 'rounded-sm',
        className
      )}
    >
      {/* Cross-hatch lines to read clearly as a placeholder, never as decoration. */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke={isDark ? '#FAFAF7' : '#05455F'} strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke={isDark ? '#FAFAF7' : '#05455F'} strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="relative z-10 px-6 py-4 text-center max-w-[80%]">
        <p
          className={cn(
            'text-eyebrow font-medium uppercase mb-2',
            isDark ? 'text-soft' : 'text-teal'
          )}
        >
          Photo placeholder
        </p>
        <p
          className={cn(
            'text-caption leading-snug',
            isDark ? 'text-offwhite/80' : 'text-mute'
          )}
        >
          {description}
        </p>
        {assetRef && (
          <p
            className={cn(
              'mt-2 text-[11px] font-mono',
              isDark ? 'text-offwhite/50' : 'text-mute/60'
            )}
          >
            ref: {assetRef}
          </p>
        )}
      </div>
    </div>
  );
}
