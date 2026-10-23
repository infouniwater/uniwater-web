'use client';

import type { ReactNode } from 'react';
import { useFormState } from 'react-dom';
import { PRIMARY_PHONE, PRIMARY_PHONE_HREF, WHATSAPP_HREF } from '@/content/site';
import type { LeadFormState } from '@/lib/lead-form-state';

/**
 * <form> for the lead server actions in app/actions/leads.ts.
 *
 * On success the action redirects to /thank-you (or WhatsApp). If the lead
 * could not be saved anywhere, the action returns { status: 'error' }
 * instead of throwing, so the visitor stays on the page with everything
 * they typed still in the fields, and sees a direct phone / WhatsApp
 * fallback under the form.
 */
interface Props {
  action: (state: LeadFormState, formData: FormData) => Promise<LeadFormState>;
  className?: string;
  children: ReactNode;
}

export function LeadForm({ action, className, children }: Props) {
  const [state, formAction] = useFormState<LeadFormState, FormData>(action, { status: 'idle' });

  return (
    <form action={formAction} className={className}>
      {children}
      {state.status === 'error' && (
        <div
          role="alert"
          className="col-span-full border border-error bg-offwhite p-4 text-body text-ink leading-relaxed"
        >
          <p className="font-medium text-error">Sorry, your message didn&rsquo;t go through.</p>
          <p className="mt-1">
            Your details are still in the form, so you can try again. Or reach us directly: call{' '}
            <a href={PRIMARY_PHONE_HREF} className="text-teal underline underline-offset-4 whitespace-nowrap">
              {PRIMARY_PHONE}
            </a>{' '}
            or{' '}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal underline underline-offset-4"
            >
              WhatsApp us
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
