/**
 * Return value of the lead server actions in app/actions/leads.ts, consumed
 * by components/forms/LeadForm.tsx. Success never returns — the action
 * redirects — so the only states the form sees are idle and error.
 */
export type LeadFormState = { status: 'idle' } | { status: 'error' };
