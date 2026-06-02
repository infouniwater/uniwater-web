import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Accordion using <details>/<summary> — zero JS, fully accessible,
 * respects prefers-reduced-motion automatically.
 */

interface AccordionItemProps {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
  inverse?: boolean;
}

export function AccordionItem({ question, children, defaultOpen = false, inverse = false }: AccordionItemProps) {
  return (
    <details
      className={cn('group border-b', inverse ? 'border-offwhite/15' : 'border-hairline')}
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className={cn('text-h3 font-medium pr-4', inverse ? 'text-offwhite' : 'text-navy')}>{question}</span>
        <span
          aria-hidden="true"
          className={cn('flex-shrink-0 transition-transform duration-250 ease-calm group-open:rotate-45', inverse ? 'text-soft' : 'text-teal')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className={cn('pb-6 pr-12 text-body leading-relaxed', inverse ? 'text-offwhite/80' : 'text-ink/85')}>
        {children}
      </div>
    </details>
  );
}

export function Accordion({ children, className, inverse = false }: { children: ReactNode; className?: string; inverse?: boolean }) {
  return <div className={cn('border-t', inverse ? 'border-offwhite/15' : 'border-hairline', className)}>{children}</div>;
}

/** Tech-spec row — flat list pattern, not nested accordion. */
export function TechSpecRow({ label, value, inverse = false }: { label: string; value: string; inverse?: boolean }) {
  return (
    <div className={cn('flex flex-col gap-1 md:flex-row md:gap-4 md:items-baseline py-4 border-b last:border-b-0', inverse ? 'border-offwhite/15' : 'border-hairline')}>
      <dt className={cn('text-caption md:w-1/3 uppercase tracking-wide text-eyebrow font-medium', inverse ? 'text-soft' : 'text-mute')}>
        {label}
      </dt>
      <dd className={cn('text-[16px] md:w-2/3', inverse ? 'text-offwhite' : 'text-ink')}>{value}</dd>
    </div>
  );
}
