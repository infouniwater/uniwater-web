import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface AsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: never;
}

interface AsLink extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> {
  href: string;
}

type ButtonProps = AsButton | AsLink;

const base =
  'inline-flex items-center justify-center font-ui font-medium tracking-[0.02em] transition-colors duration-200 ease-calm focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  // Navy bg, white label; hover → teal
  primary: 'bg-navy text-offwhite hover:bg-teal',
  // Transparent, navy label, hairline border; hover → tint bg
  secondary: 'border border-navy text-navy hover:bg-tint',
  // Text link, navy, underline on hover — inline use
  tertiary: 'text-navy underline-offset-4 hover:underline',
  // White-on-navy, used inside inverse-navy sections
  ghost: 'border border-offwhite text-offwhite hover:bg-offwhite hover:text-navy',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-sm',
  lg: 'h-[52px] px-8 text-[15px]',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'lg', className, children } = props;
  const classes = cn(base, variants[variant], variant !== 'tertiary' && sizes[size], className);

  if ('href' in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
