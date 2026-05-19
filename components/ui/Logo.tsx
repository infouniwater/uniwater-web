import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

interface LogoProps {
  /** Use the white logo variants for navy / dark backgrounds. */
  inverse?: boolean;
  /** Footer / hero size — renders the horizontal logo larger. Default size is
   *  the navbar-appropriate height. */
  showTagline?: boolean;
  className?: string;
}

/**
 * Brand logo. Renders the official Horizontal SVG (droplet + UNIWATER wordmark
 * + "WELLNESS STARTS WITH CLEAN WATER" tagline) from public/brand/.
 *
 * Sizes:
 *   - Default (header): h-16 mobile, h-20 desktop
 *   - showTagline (footer / hero): h-16 mobile, h-20 desktop
 *
 * Colour: `inverse` switches to the white horizontal variant for navy / dark
 * backgrounds.
 *
 * The `showTagline` prop name is kept for backwards compatibility with the
 * existing call sites; semantically it now means "larger size".
 */
export function Logo({ inverse = false, showTagline = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Uniwater home"
      className={cn('inline-block', className)}
    >
      <Image
        src={inverse ? '/brand/uniwater-horizontal-white.svg' : '/brand/uniwater-horizontal-coloured.svg'}
        alt="Uniwater — Wellness starts with clean water"
        width={2182}
        height={1080}
        priority={!showTagline}
        loading={showTagline ? 'lazy' : 'eager'}
        className={cn(
          'block w-auto',
          showTagline ? 'h-16 md:h-20' : 'h-16 md:h-20',
        )}
      />
    </Link>
  );
}
