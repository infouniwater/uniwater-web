'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createLead } from '@/lib/odoo';
import { sendLeadNotification, type LeadFields } from '@/lib/email';
import { appendLeadToSheet } from '@/lib/sheets';
import { sendMetaLeadEvent, type MetaEventName } from '@/lib/meta-capi';

/**
 * Server actions for the five marketing-site lead surfaces.
 *
 * Each action fans out the submission to four sinks in parallel:
 *   1. Odoo CRM (crm.lead via JSON-RPC)             — primary, awaited
 *   2. Email notification to LEAD_NOTIFY_TO         — visibility
 *   3. Google Sheet tab via Apps Script             — backup + audit trail
 *   4. Meta Conversions API (Pixel server-side)     — ads attribution
 *
 * Promise.allSettled covers sinks 2-4 so a Resend/Sheets/Meta outage cannot
 * block the Odoo write or the /thank-you redirect. Failures are logged in
 * the sink modules. If Odoo fails the error bubbles to app/error.tsx (the
 * visitor sees the "Try again" surface) because Odoo is the system of
 * record.
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

/**
 * Read what we can about the visitor from the request headers. Used to
 * fill the Meta CAPI user_data with client_ip_address + client_user_agent
 * — both improve Meta's event matching against ad-click impressions.
 */
function getRequestSignals(): { ip?: string; userAgent?: string; referer?: string } {
  try {
    const h = headers();
    const userAgent = h.get('user-agent') ?? undefined;
    const referer = h.get('referer') ?? undefined;
    // Vercel sets x-forwarded-for; the first hop is the real client.
    const fwd = h.get('x-forwarded-for');
    const ip = fwd?.split(',')[0]?.trim() || h.get('x-real-ip') || undefined;
    return { ip, userAgent, referer };
  } catch {
    return {};
  }
}

/**
 * Fan-out: send the same lead to email + sheet + Meta alongside the Odoo
 * write. Odoo is awaited first because it's the system of record; if it
 * throws, none of the non-primary sinks fire and the user gets the error
 * page. The other three run via Promise.allSettled so any one of them can
 * fail without blocking the others or the redirect.
 */
async function fanOut(input: {
  odoo: Parameters<typeof createLead>[0];
  tab: string;
  formLabel: string;
  emailSubject: string;
  fields: LeadFields;
  meta: {
    eventName: MetaEventName;
    email?: string;
    phone?: string;
    name?: string;
    city?: string;
  };
}): Promise<void> {
  await createLead(input.odoo);

  const sig = getRequestSignals();
  await Promise.allSettled([
    sendLeadNotification({
      formLabel: input.formLabel,
      subject: input.emailSubject,
      fields: input.fields,
    }),
    appendLeadToSheet({
      tab: input.tab,
      fields: input.fields,
    }),
    sendMetaLeadEvent({
      eventName: input.meta.eventName,
      email: input.meta.email,
      phone: input.meta.phone,
      name: input.meta.name,
      city: input.meta.city,
      sourceUrl: sig.referer,
      clientIp: sig.ip,
      clientUserAgent: sig.userAgent,
    }),
  ]);
}

export async function submitBookSurvey(formData: FormData): Promise<void> {
  const name = takeString(formData, 'name');
  const audience = takeString(formData, 'audience');
  const propertyType = takeString(formData, 'propertyType');
  const waterSource = takeString(formData, 'waterSource');
  const problems = takeAll(formData, 'problems');
  const notes = takeString(formData, 'notes');
  const email = takeString(formData, 'email');
  const mobile = takeString(formData, 'mobile');
  const city = takeString(formData, 'city');

  const fields: LeadFields = {
    Name: name,
    Mobile: mobile,
    Email: email,
    City: city,
    Audience: audience,
    'Property type': propertyType,
    'Water source': waterSource,
    Problems: problems.length ? problems.join(', ') : undefined,
    Notes: notes,
  };

  const description = joinDescription([
    'Source: /book-survey',
    audience ? `Audience: ${audience}` : undefined,
    propertyType ? `Property type: ${propertyType}` : undefined,
    waterSource ? `Water source: ${waterSource}` : undefined,
    problems.length ? `Problems: ${problems.join(', ')}` : undefined,
    notes ? `Notes: ${notes}` : undefined,
  ]);

  await fanOut({
    odoo: {
      name: `Book Survey — ${name ?? 'Unnamed lead'}`,
      contactName: name,
      email,
      phone: mobile,
      city,
      description,
    },
    tab: 'book-survey',
    formLabel: 'Book a free survey',
    emailSubject: `New survey request — ${name ?? 'Unnamed'}${city ? ` (${city})` : ''}`,
    fields,
    meta: { eventName: 'Schedule', email, phone: mobile, name, city },
  });

  redirect('/thank-you?source=book-survey');
}

export async function submitContact(formData: FormData): Promise<void> {
  const name = takeString(formData, 'name');
  const subject = takeString(formData, 'subject');
  const audience = takeString(formData, 'audience');
  const message = takeString(formData, 'message');
  const email = takeString(formData, 'email');
  const mobile = takeString(formData, 'mobile');

  const fields: LeadFields = {
    Name: name,
    Mobile: mobile,
    Email: email,
    Audience: audience,
    Subject: subject,
    Message: message,
  };

  const description = joinDescription([
    'Source: /contact',
    audience ? `Audience: ${audience}` : undefined,
    subject ? `Subject: ${subject}` : undefined,
    message ? `Message: ${message}` : undefined,
  ]);

  await fanOut({
    odoo: {
      name: `Contact — ${subject ?? name ?? 'General enquiry'}`,
      contactName: name,
      email,
      phone: mobile,
      description,
    },
    tab: 'contact',
    formLabel: 'Contact form',
    emailSubject: `New contact — ${subject ?? name ?? 'General enquiry'}`,
    fields,
    meta: { eventName: 'Contact', email, phone: mobile, name },
  });

  redirect('/thank-you?source=contact');
}

export async function submitRFQ(formData: FormData): Promise<void> {
  const org = takeString(formData, 'org');
  const name = takeString(formData, 'name');
  const application = takeString(formData, 'application');
  const capacity = takeString(formData, 'capacity');
  const timeline = takeString(formData, 'timeline');
  const notes = takeString(formData, 'notes');
  const email = takeString(formData, 'email');
  const mobile = takeString(formData, 'mobile');
  const location = takeString(formData, 'location');

  const fields: LeadFields = {
    Organisation: org,
    'Contact name': name,
    Mobile: mobile,
    Email: email,
    Location: location,
    Application: application,
    Capacity: capacity,
    Timeline: timeline,
    Notes: notes,
  };

  const description = joinDescription([
    'Source: /industrial RFQ',
    org ? `Organisation: ${org}` : undefined,
    application ? `Application: ${application}` : undefined,
    capacity ? `Capacity required: ${capacity}` : undefined,
    timeline ? `Timeline: ${timeline}` : undefined,
    notes ? `Notes: ${notes}` : undefined,
  ]);

  await fanOut({
    odoo: {
      name: `RFQ — ${org ?? name ?? 'Unnamed'} — ${application ?? 'application not specified'}`,
      contactName: name,
      email,
      phone: mobile,
      city: location,
      description,
    },
    tab: 'industrial-rfq',
    formLabel: 'Industrial RFQ',
    emailSubject: `New RFQ — ${org ?? name ?? 'Unnamed'}${application ? ` · ${application}` : ''}`,
    fields,
    meta: { eventName: 'SubmitApplication', email, phone: mobile, name, city: location },
  });

  redirect('/thank-you?source=industrial-rfq');
}

export async function submitWaterTestRequest(formData: FormData): Promise<void> {
  const mobile = takeString(formData, 'mobile');
  const city = takeString(formData, 'city');
  const sourcePath = takeString(formData, 'sourcePath');

  const fields: LeadFields = {
    Mobile: mobile,
    City: city,
    'Triggered on': sourcePath,
    Request: 'Free water-test report via WhatsApp',
  };

  const description = joinDescription([
    'Source: exit-intent water-test capture',
    sourcePath ? `Triggered on: ${sourcePath}` : undefined,
    city ? `City: ${city}` : undefined,
    'Requested: free water-test report by WhatsApp.',
  ]);

  await fanOut({
    odoo: {
      name: `Water-test request — ${mobile ?? 'unknown mobile'}${city ? ` (${city})` : ''}`,
      phone: mobile,
      city,
      description,
    },
    tab: 'water-test',
    formLabel: 'Free water-test request',
    emailSubject: `Water-test request — ${mobile ?? 'unknown mobile'}${city ? ` (${city})` : ''}`,
    fields,
    meta: { eventName: 'Lead', phone: mobile, city },
  });

  // Bounce the visitor straight to WhatsApp with a pre-filled message.
  // The lead is already in Odoo by this point, so even if the visitor never
  // sends the WhatsApp message the engineer has the mobile to follow up.
  const waMsg = encodeURIComponent(
    "Hi Uniwater — I'd like a free water-test report. (Sent from the home-page popup.)"
  );
  const phoneE164 = '919748745193';
  redirect(`https://wa.me/${phoneE164}?text=${waMsg}`);
}

export async function submitRemoteSurvey(formData: FormData): Promise<void> {
  const name = takeString(formData, 'name');
  const location = takeString(formData, 'location');
  const propertyType = takeString(formData, 'propertyType');
  const bhk = takeString(formData, 'bhk');
  const bathrooms = takeString(formData, 'bathrooms');
  const kitchens = takeString(formData, 'kitchens');
  const source = takeString(formData, 'source');
  const symptoms = takeAll(formData, 'symptoms');
  const notes = takeString(formData, 'notes');
  const email = takeString(formData, 'email');
  const mobile = takeString(formData, 'mobile');

  const fields: LeadFields = {
    Name: name,
    Mobile: mobile,
    Email: email,
    Location: location,
    'Property type': propertyType,
    BHK: bhk,
    Bathrooms: bathrooms,
    Kitchens: kitchens,
    'Water source': source,
    Symptoms: symptoms.length ? symptoms.join(', ') : undefined,
    Notes: notes,
  };

  const description = joinDescription([
    'Source: /remote-site-survey',
    propertyType ? `Property type: ${propertyType}` : undefined,
    bhk ? `BHK: ${bhk}` : undefined,
    bathrooms ? `Bathrooms: ${bathrooms}` : undefined,
    kitchens ? `Kitchens: ${kitchens}` : undefined,
    source ? `Water source: ${source}` : undefined,
    symptoms.length ? `Symptoms: ${symptoms.join(', ')}` : undefined,
    notes ? `Notes: ${notes}` : undefined,
    'Photos and water-test report to follow by email per the step-2 instructions.',
  ]);

  await fanOut({
    odoo: {
      name: `Remote site survey — ${name ?? 'Unnamed'} (${location ?? 'location pending'})`,
      contactName: name,
      email,
      phone: mobile,
      city: location,
      description,
    },
    tab: 'remote-site-survey',
    formLabel: 'Remote site survey',
    emailSubject: `Remote site survey — ${name ?? 'Unnamed'}${location ? ` (${location})` : ''}`,
    fields,
    meta: { eventName: 'Schedule', email, phone: mobile, name, city: location },
  });

  redirect('/thank-you?source=remote-site-survey');
}
