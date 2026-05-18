/**
 * Conditional className merger. Lean — no clsx dependency.
 */
export function cn(...inputs: Array<string | undefined | null | false>): string {
  return inputs.filter(Boolean).join(' ');
}
