import { cn } from '@/lib/cn';

/**
 * Short rule used as a list bullet. Replaces the em-dash glyph that used
 * to start list items (copy pass, Oct 2026: no em dashes anywhere in
 * user-facing text).
 *
 * Default placement is for a `flex gap-*` row: the bar sits at the
 * first line's mid-height. `inline` is for a plain <li> with no flex
 * wrapper, where the bar runs in the text like the old glyph did.
 */
export function ListBar({
  inline = false,
  tone = 'teal',
}: {
  inline?: boolean;
  tone?: 'teal' | 'soft';
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'h-[1.5px] w-3 shrink-0',
        tone === 'soft' ? 'bg-soft' : 'bg-teal',
        inline ? 'inline-block align-middle mr-3' : 'block mt-[0.72em]',
      )}
    />
  );
}
