import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'plain' | 'subtle' | 'tint' | 'inverse' | 'navy';
type Padding = 'tight' | 'default' | 'loose';

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  tone?: Tone;
  padding?: Padding;
  bleed?: boolean;       // full-bleed background, content still constrained
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

export function Section({
  tone = 'plain',
  padding = 'default',
  bleed: _bleed,
  children,
  className,
  contentClassName,
  ...rest
}: SectionProps) {
  return (
    <section className={cn(tones[tone], paddings[padding], className)} {...rest}>
      <div className={cn('container-uw', contentClassName)}>{children}</div>
    </section>
  );
}
