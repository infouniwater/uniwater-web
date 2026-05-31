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
 * Brand logo. Renders the official Horizontal PNG (droplet + Uniwater wordmark
 * + "WELLNESS STARTS WITH CLEAN WATER" tagline) from public/brand/.
 *
 * Why PNG and not SVG: the source SVG sets the tagline as live <text> with
 * Signika and explicit per-glyph x coordinates. When Signika isn't loaded in
 * the SVG's rendering context the browser substitutes a system font, the
 * fixed x coordinates stay put, and the spaces between words collapse to
 * almost nothing ("WELLNESSSTARTSWITHCLEANWATER"). PNG sidesteps the font
 * dependency entirely.
 *
 * Colour: `inverse` switches to the white horizontal variant for navy / dark
 * backgrounds. `showTagline` is a legacy prop kept for back-compat — it no
 * longer changes the rendered asset.
 */
export function Logo({ inverse = false, showTagline = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Uniwater home"
      className={cn('inline-block', className)}
    >
      <Image
        src={inverse ? '/brand/uniwater-horizontal-white.png' : '/brand/uniwater-horizontal-coloured.png'}
        alt="Uniwater — Wellness starts with clean water"
        width={2182}
        height={1080}
        priority={!showTagline}
        loading={showTagline ? 'lazy' : 'eager'}
        className="block w-auto h-16 md:h-20"
      />
    </Link>
  );
}
