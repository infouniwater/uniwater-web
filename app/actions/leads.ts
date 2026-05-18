'use server';

import { redirect } from 'next/navigation';
import { createLead } from '@/lib/odoo';

/**
 * Server actions for the four marketing-site lead surfaces. Each maps the
 * form's FormData into the Odoo crm.lead shape and redirects to /thank-you
 * with a source tag for the post-submit messaging.
 *
 * Errors bubble up to app/error.tsx — the user sees the calm recovery
 * surface with a "Try again" button.
 */

function takeString(data: FormData, key: string): string | undefined {
  const v = data.get(key);
  if (typeof v !== 'string') return undefined;
  const trimmed = v.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function takeAll(data: FormData, key: string): string[] {
  return data
    .getAll(key)
    .filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    .map((v) => v.trim());
}

function joinDescription(parts: Array<string | undefined>): string {
  return parts.filter((p): p is string => Boolean(p)).join('\n\n');
}

export async function submitBookSurvey(formData: FormData): Promise<void> {
  const name = takeString(formData, 'name');
  const audience = takeString(formData, 'audience');
  const description = joinDescription([
    'Source: /book-survey',
    audience ? `Audience: ${audience}` : undefined,
    takeString(formData, 'propertyType') && `Property type: ${takeString(formData, 'propertyType')}`,
    takeString(formData, 'waterSource') && `Water source: ${takeString(formData, 'waterSource')}`,
    takeAll(formData, 'problems').length
      ? `Problems: ${takeAll(formData, 'problems').join(', ')}`
      : undefined,
    takeString(formData, 'notes') && `Notes: ${takeString(formData, 'notes')}`,
  ]);

  await createLead({
    name: `Book Survey — ${name ?? 'Unnamed lead'}`,
    contactName: name,
    email: takeString(formData, 'email'),
    phone: takeString(formData, 'mobile'),
    city: takeString(formData, 'city'),
    description,
  });

  redirect('/thank-you?source=book-survey');
}

export async function submitContact(formData: FormData): Promise<void> {
  const name = takeString(formData, 'name');
  const subject = takeString(formData, 'subject');
  const audience = takeString(formData, 'audience');
  const description = joinDescription([
    'Source: /contact',
    audience ? `Audience: ${audience}` : undefined,
    subject ? `Subject: ${subject}` : undefined,
    takeString(formData, 'message') && `Message: ${takeString(formData, 'message')}`,
  ]);

  await createLead({
    name: `Contact — ${subject ?? name ?? 'General enquiry'}`,
    contactName: name,
    email: takeString(formData, 'email'),
    phone: takeString(formData, 'mobile'),
    description,
  });

  redirect('/thank-you?source=contact');
}

export async function submitRFQ(formData: FormData): Promise<void> {
  const org = takeString(formData, 'org');
  const name = takeString(formData, 'name');
  const application = takeString(formData, 'application');
  const description = joinDescription([
    'Source: /industrial RFQ',
    org ? `Organisation: ${org}` : undefined,
    application ? `Application: ${application}` : undefined,
    takeString(formData, 'capacity') && `Capacity required: ${takeString(formData, 'capacity')}`,
    takeString(formData, 'timeline') && `Timeline: ${takeString(formData, 'timeline')}`,
    takeString(formData, 'notes') && `Notes: ${takeString(formData, 'notes')}`,
  ]);

  await createLead({
    name: `RFQ — ${org ?? name ?? 'Unnamed'} — ${application ?? 'application not specified'}`,
    contactName: name,
    email: takeString(formData, 'email'),
    phone: takeString(formData, 'mobile'),
    city: takeString(formData, 'location'),
    description,
  });

  redirect('/thank-you?source=industrial-rfq');
}

export async function submitWaterTestRequest(formData: FormData): Promise<void> {
  const mobile = takeString(formData, 'mobile');
  const city = takeString(formData, 'city');
  const sourcePath = takeString(formData, 'sourcePath');
  const description = joinDescription([
    'Source: exit-intent water-test capture',
    sourcePath ? `Triggered on: ${sourcePath}` : undefined,
    city ? `City: ${city}` : undefined,
    'Requested: free water-test report by WhatsApp.',
  ]);

  await createLead({
    name: `Water-test request — ${mobile ?? 'unknown mobile'}${city ? ` (${city})` : ''}`,
    phone: mobile,
    city,
    description,
  });

  // Bounce the visitor straight to WhatsApp with a pre-filled message.
  // The lead is already in Odoo by this point, so even if the visitor never
  // sends the WhatsApp message the engineer has the mobile to follow up.
  const waMsg = encodeURIComponent(
    "Hi UNIWATER — I'd like a free water-test report. (Sent from the home-page popup.)"
  );
  const phoneE164 = '919748745193';
  redirect(`https://wa.me/${phoneE164}?text=${waMsg}`);
}

export async function submitRemoteSurvey(formData: FormData): Promise<void> {
  const name = takeString(formData, 'name');
  const location = takeString(formData, 'location');
  const description = joinDescription([
    'Source: /remote-site-survey',
    takeString(formData, 'propertyType') && `Property type: ${takeString(formData, 'propertyType')}`,
    takeString(formData, 'bhk') && `BHK: ${takeString(formData, 'bhk')}`,
    takeString(formData, 'bathrooms') && `Bathrooms: ${takeString(formData, 'bathrooms')}`,
    takeString(formData, 'kitchens') && `Kitchens: ${takeString(formData, 'kitchens')}`,
    takeString(formData, 'source') && `Water source: ${takeString(formData, 'source')}`,
    takeAll(formData, 'symptoms').length
      ? `Symptoms: ${takeAll(formData, 'symptoms').join(', ')}`
      : undefined,
    takeString(formData, 'notes') && `Notes: ${takeString(formData, 'notes')}`,
    'Photos and water-test report to follow by email per the step-2 instructions.',
  ]);

  await createLead({
    name: `Remote site survey — ${name ?? 'Unnamed'} (${location ?? 'location pending'})`,
    contactName: name,
    email: takeString(formData, 'email'),
    phone: takeString(formData, 'mobile'),
    city: location,
    description,
  });

  redirect('/thank-you?source=remote-site-survey');
}
