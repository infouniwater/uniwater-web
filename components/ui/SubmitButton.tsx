'use client';

import { useFormStatus } from 'react-dom';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost';
type Size = 'md' | 'lg';

interface Props {
  children: ReactNode;
  /** Label shown while the action is in flight. Defaults to a quiet "Submitting..." */
  pendingLabel?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const base =
  'inline-flex items-center justify-center gap-3 font-medium tracking-[0.02em] transition-colors duration-200 ease-calm focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-offwhite hover:bg-teal',
  ghost: 'border border-offwhite text-offwhite hover:bg-offwhite hover:text-navy',
};

// min-w- prevents button shrink when the label swaps to "Submitting…".
const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-sm min-w-[160px]',
  lg: 'h-[52px] px-8 text-[15px] min-w-[200px]',
};

/**
 * Submit button that surfaces server-action pending state.
 *
 * Replaces `<Button type="submit">` inside `<form action={serverAction}>`.
 * Disables itself while the action is in flight and shows a quiet pending
 * label with a small spinner. Reduced-motion preferences are respected via
 * the global utility-layer rule in globals.css.
 */
export function SubmitButton({
  children,
  pendingLabel = 'Submitting…',
  variant = 'primary',
  size = 'lg',
  className,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {pending && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="animate-spin"
        >
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.25" />
          <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      <span>{pending ? pendingLabel : children}</span>
    </button>
  );
}
