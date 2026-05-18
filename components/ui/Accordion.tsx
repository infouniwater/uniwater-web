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
}

export function AccordionItem({ question, children, defaultOpen = false }: AccordionItemProps) {
  return (
    <details
      className="group border-b border-hairline"
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="text-h3 font-medium text-navy pr-4">{question}</span>
        <span
          aria-hidden="true"
          className="flex-shrink-0 transition-transform duration-250 ease-calm group-open:rotate-45 text-teal"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="pb-6 pr-12 text-body text-ink/85 leading-relaxed">
        {children}
      </div>
    </details>
  );
}

export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('border-t border-hairline', className)}>{children}</div>;
}

/** Tech-spec row — flat list pattern, not nested accordion. */
export function TechSpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:gap-4 md:items-baseline py-4 border-b border-hairline last:border-b-0">
      <dt className="text-caption text-mute md:w-1/3 uppercase tracking-wide text-eyebrow font-medium">
        {label}
      </dt>
      <dd className="text-[16px] text-ink md:w-2/3">{value}</dd>
    </div>
  );
}
