import type { HTMLAttributes, ReactNode, ElementType } from 'react';
import { cn } from '@/lib/cn';

/**
 * Typography primitives. The font + size rules live HERE; pages should
 * use these components, not bare <h1>/<p> tags with ad-hoc classes.
 *
 * Font rules (Rajat 2026-06-04):
 *   - HEADINGS use ITC Avant Garde Gothic  (font-sans, applied
 *     explicitly on Display / Heading below).
 *   - BODY + UI default uses TT Fors        (the document body font;
 *     Body / Lede / Caption inherit it; Eyebrow uses font-ui which
 *     resolves to the same TT Fors variable).
 *   - NUMERIC uses Signika                  (font-numeric, used
 *     sparingly: StatTile values, hero stats, cost numbers).
 *   - EDITORIAL uses Bodoni Moda Italic     (font-editorial, used on
 *     EditorialAccent only -- pull-quotes, one or two per page).
 *
 * Size rules (per token, mobile / desktop):
 *   - text-display  48 / 72 px   page hero H1 only (one per page)
 *   - text-h1       36 / 48 px   alternative section H1 (softer than display)
 *   - text-h2       26 / 32 px   default section H2 -- most common
 *   - text-h3       22 px        card titles, sub-section heads
 *   - text-lede     21 px        first paragraph after H2 -- one per section
 *   - text-body     17 px        default paragraph
 *   - text-caption  14 px        photo credits, footnotes, table labels
 *   - text-eyebrow  12 px        uppercase label above headings
 */

/** Small uppercase label above section headings. Per §3.2 Eyebrow row.
 *  `inverse` swaps the teal accent to soft for dark/navy surfaces — same
 *  pattern the hero uses, so eyebrows in navy sections match the hero
 *  without ad-hoc `!text-soft` overrides. tracking-[0.18em] matches the
 *  hero's letterspacing so the rhythm is consistent. */
export function Eyebrow({
  children,
  className,
  as: As = 'p',
  inverse = false,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  inverse?: boolean;
}) {
  return (
    <As
      className={cn(
        // `font-ui` resolves to TT Fors (same as the body default after
        // the 2026-06-04 font-rules change). Kept here explicitly so
        // the intent ("UI workhorse, not heading") survives any future
        // change to the document default.
        'text-eyebrow font-ui font-medium uppercase tracking-[0.18em]',
        inverse ? 'text-soft' : 'text-teal',
        className
      )}
    >
      {children}
    </As>
  );
}

/** Hero display type — Avant Garde Book (400), 72/48.
 *  font-sans pulls Avant Garde from the design tokens (the body
 *  default is TT Fors after the 2026-06-04 font-rules change, so
 *  headings must opt-in to Avant Garde explicitly). */
export function Display({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        'font-sans text-display-m md:text-display font-normal text-navy [text-wrap:balance]',
        className
      )}
    >
      {children}
    </h1>
  );
}

interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'className'> {
  level: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  inverse?: boolean;  // for inverse-navy sections
}

// Catalogue-register typography: all heading levels at font-normal
// (400 = Avant Garde Book), matching the homeowner-catalogue tone.
// `font-sans` is applied explicitly so headings use Avant Garde even
// though the document body default is now TT Fors (2026-06-04 rules).
const headingClasses = {
  1: 'font-sans text-h1-m md:text-h1 font-normal',
  2: 'font-sans text-h2-m md:text-h2 font-normal',
  3: 'font-sans text-h3 font-normal',
};

export function Heading({ level, children, className, inverse = false, ...rest }: HeadingProps) {
  const Tag = (`h${level}` as 'h1' | 'h2' | 'h3');
  return (
    <Tag
      className={cn(
        headingClasses[level],
        inverse ? 'text-offwhite' : 'text-navy',
        '[text-wrap:balance]',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Opening paragraph — 21px, line-height 1.5. TT Fors (inherited from
 *  document body); one Lede per section, immediately after the H2/H3. */
export function Lede({
  children,
  className,
  inverse = false,
}: {
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <p
      className={cn(
        'text-lede font-light max-w-reading',
        inverse ? 'text-offwhite/85' : 'text-mute',
        className
      )}
    >
      {children}
    </p>
  );
}

/** Default body — 17px, line-height 1.6. TT Fors (inherited from
 *  document body). The most common paragraph type on the site. */
export function Body({
  children,
  className,
  inverse = false,
}: {
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <p
      className={cn(
        'text-body',
        inverse ? 'text-offwhite/80' : 'text-ink',
        className
      )}
    >
      {children}
    </p>
  );
}

/** 14px caption -- photo credits, footnotes, table labels, supporting
 *  small text. TT Fors (inherited from document body). */
export function Caption({
  children,
  className,
  inverse = false,
}: {
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <p
      className={cn(
        'text-caption',
        inverse ? 'text-offwhite/70' : 'text-mute',
        className
      )}
    >
      {children}
    </p>
  );
}

/** Bodoni Moda Italic — pull-quotes only, sparingly. */
export function EditorialAccent({
  children,
  className,
  inverse = false,
}: {
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <p
      className={cn(
        'font-editorial italic text-2xl md:text-3xl leading-snug max-w-reading',
        inverse ? 'text-soft' : 'text-navy',
        className
      )}
    >
      {children}
    </p>
  );
}
