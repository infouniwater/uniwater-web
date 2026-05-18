import type { HTMLAttributes, ReactNode, ElementType } from 'react';
import { cn } from '@/lib/cn';

/** Small uppercase label above section headings. Per §3.2 Eyebrow row. */
export function Eyebrow({
  children,
  className,
  as: As = 'p',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <As
      className={cn(
        'text-eyebrow font-medium uppercase text-teal',
        className
      )}
    >
      {children}
    </As>
  );
}

/** Hero display type — Signika Light → SemiBold, 72/48. */
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
        'text-display-m md:text-display font-light text-navy [text-wrap:balance]',
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

const headingClasses = {
  1: 'text-h1-m md:text-h1 font-semibold',
  2: 'text-h2-m md:text-h2 font-semibold',
  3: 'text-h3 font-semibold',
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

/** Opening paragraph — Signika Light 21px, line-height 1.5. */
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

/** Default body — 17px, line-height 1.6. */
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

/** 14px caption / photo cred. */
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
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-editorial italic text-2xl md:text-3xl text-navy leading-snug max-w-reading',
        className
      )}
    >
      {children}
    </p>
  );
}
