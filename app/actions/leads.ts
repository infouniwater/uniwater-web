'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { randomUUID } from 'crypto';
import { createLead } from '@/lib/odoo';
import { sendLeadNotification, type LeadFields } from '@/lib/email';
import { appendLeadToSheet } from '@/lib/sheets';
import { sendMetaLeadEvent, type MetaEventName } from '@/lib/meta-capi';
import { verifyRecaptcha } from '@/lib/recaptcha-server';

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

/**
 * reCAPTCHA v3 gate for every form action.
 *
 * Reads the recaptcha_token field <RecaptchaField /> injects on the
 * client and verifies it against Google's siteverify. If the token is
 * missing or scores below the threshold, the visitor is silently
 * redirected to /thank-you (so bots get no signal that they were
 * blocked) and the rest of the action -- Odoo write, email,
 * Sheets append, Meta CAPI event -- is short-circuited via the
 * redirect's thrown signal. Real users (score >= 0.5) pass straight
 * through. If RECAPTCHA_SECRET_KEY is unset (local dev), the verifier
 * fails-open and submission proceeds normally.
 */
async function gateRecaptcha(
  formData: FormData,
  recaptchaAction: string,
  thankYouSource: string,
): Promise<void> {
  const token = formData.get('recaptcha_token');
  const tokenStr = typeof token === 'string' ? token : undefined;
  const result = await verifyRecaptcha(tokenStr, recaptchaAction);
  if (!result.success) {
    console.warn(
      `[recaptcha] ${recaptchaAction} blocked: ${result.reason}` +
        (result.score !== undefined ? ` (score: ${result.score})` : ''),
    );
    redirect(`/thank-you?source=${thankYouSource}`);
  }
}

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
 * Per-form indicative conversion values sent to Meta CAPI. These are
 * SIGNALS to the ad optimiser, not pricing commitments — Meta uses them
 * to bid more aggressively for high-value lead types vs. low-value ones.
 *
 * Values mirror what's configured on the matching Custom Conversion in
 * Meta Events Manager (set by Rajat 2026-05-20) so reports are
 * consistent whether or not the event arrived with an explicit value.
 */
const META_VALUE_BOOK_SURVEY = 100_000;   // residential survey converts to mid-size install
const META_VALUE_REMOTE_SURVEY = 100_000; // similar residential, just remote-managed
const META_VALUE_INDUSTRIAL_RFQ = 400_000; // commercial scale — highest value
const META_VALUE_CONTACT = 14_000;        // entry-tier interest, generic
const META_VALUE_WATER_TEST = 25_000;
const META_VALUE_NEPAL_WAAS = 200_000;    // Nepal DWaaS/DM-as-a-Service — ad-driven, commercial scale

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
    /** Indicative INR value for this lead — drives Meta value-based bid
     * optimisation. Pick one of META_VALUE_* constants per form. */
    value?: number;
    /** Shared dedup id. When the browser pixel ALSO fires this event with
     * the same id (e.g. the Nepal Lead re-fired on /thank-you), Meta
     * collapses the CAPI + browser events into one conversion. */
    eventId?: string;
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
      value: input.meta.value,
      currency: 'INR',
      eventId: input.meta.eventId,
      sourceUrl: sig.referer,
      clientIp: sig.ip,
      clientUserAgent: sig.userAgent,
    }),
  ]);
}

export async function submitBookSurvey(formData: FormData): Promise<void> {
  await gateRecaptcha(formData, 'book_survey', 'book-survey');
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
    meta: { eventName: 'Schedule', email, phone: mobile, name, city, value: META_VALUE_BOOK_SURVEY },
  });

  redirect('/thank-you?source=book-survey');
}

export async function submitContact(formData: FormData): Promise<void> {
  await gateRecaptcha(formData, 'contact', 'contact');
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
    meta: { eventName: 'Contact', email, phone: mobile, name, value: META_VALUE_CONTACT },
  });

  redirect('/thank-you?source=contact');
}

/**
 * Nepal Water-as-a-Service ad-campaign form (East Nepal).
 *
 * Lands at /nepal/water-as-a-service. Submissions tag the Odoo lead with
 * source: "meta-ads-east-nepal" so the sales pipeline can route them to the
 * Biratnagar/Itahari team, and the Meta CAPI event fires with
 * value=META_VALUE_NEPAL_WAAS so the ad-optimiser bids harder for the
 * commercial-scale lead.
 *
 * Form fields:
 *   - name, business, city (East Nepal regions or 'Other')
 *   - service (drinking | dm)         -- driven by ?service= query param
 *   - plan (A..E | empty if DM)        -- only for drinking; DM is enquiry-only
 *   - phone, useCase, notes
 *
 * Browser-side pixel events on this page complement the CAPI Lead below:
 *   - Contact on each WhatsApp CTA click (./pixel trackWhatsAppContact)
 *   - Lead + Contact on the /thank-you success page after this redirect
 *     (ThankYouConversionFire, ?source=nepal-waas)
 * The browser Lead reuses the eventId generated here (passed via the
 * redirect URL) so Meta de-dupes it against this CAPI Lead into one
 * conversion. The Contact events have no CAPI counterpart, so they need
 * no dedup id.
 */
export async function submitNepalWaaS(formData: FormData): Promise<void> {
  await gateRecaptcha(formData, 'nepal_waas', 'nepal-waas');
  const name = takeString(formData, 'name');
  const business = takeString(formData, 'business');
  const city = takeString(formData, 'city');
  const service = takeString(formData, 'service');   // 'drinking' | 'dm'
  const plan = takeString(formData, 'plan');         // A..E or undefined
  const phone = takeString(formData, 'phone');
  const useCase = takeString(formData, 'useCase');
  const notes = takeString(formData, 'notes');

  // UTM + fbclid attribution. The hidden inputs are written client-side
  // by useUtmCapture (Nepal page Client Component) from
  // window.location.search on first mount and persisted in
  // sessionStorage so they survive an in-page soft nav. Forwarding them
  // into Odoo, Sheets, email and the Meta CAPI custom_data lets every
  // downstream system attribute the lead to a specific ad campaign.
  const utmSource = takeString(formData, 'utm_source');
  const utmMedium = takeString(formData, 'utm_medium');
  const utmCampaign = takeString(formData, 'utm_campaign');
  const utmContent = takeString(formData, 'utm_content');
  const utmTerm = takeString(formData, 'utm_term');
  const fbclid = takeString(formData, 'fbclid');

  // Shared dedup id for the Lead conversion. The same id is sent to Meta
  // CAPI (below) AND carried through the /thank-you redirect so the
  // browser pixel re-fires Lead with it -- Meta then de-dupes the
  // server + browser Lead into a single conversion.
  const eventId = randomUUID();

  const serviceLabel =
    service === 'dm' ? 'DM Water as a Service' : 'Drinking Water as a Service';

  const fields: LeadFields = {
    Name: name,
    Business: business,
    Mobile: phone,
    City: city,
    Service: serviceLabel,
    Plan: plan,
    'Use case': useCase,
    Notes: notes,
    Source: 'meta-ads-east-nepal',
    'UTM source': utmSource,
    'UTM medium': utmMedium,
    'UTM campaign': utmCampaign,
    'UTM content': utmContent,
    'UTM term': utmTerm,
    fbclid,
  };

  const description = joinDescription([
    'Source: meta-ads-east-nepal — /nepal/water-as-a-service',
    business ? `Business: ${business}` : undefined,
    `Service: ${serviceLabel}`,
    plan ? `Plan: ${plan}` : undefined,
    useCase ? `Use case: ${useCase}` : undefined,
    notes ? `Notes: ${notes}` : undefined,
    utmCampaign || utmSource ? `UTM: ${[utmSource, utmMedium, utmCampaign, utmContent, utmTerm].filter(Boolean).join(' / ')}` : undefined,
    fbclid ? `fbclid: ${fbclid}` : undefined,
  ]);

  await fanOut({
    odoo: {
      name: `Nepal WaaS — ${business ?? name ?? 'unnamed'}${plan ? ` (Plan ${plan})` : ''}`,
      contactName: name,
      phone,
      city,
      description,
    },
    tab: 'nepal-waas',
    formLabel: 'Nepal Water-as-a-Service (meta-ads-east-nepal)',
    emailSubject: `Nepal WaaS lead — ${business ?? name ?? 'unnamed'}${city ? ` (${city})` : ''}`,
    fields,
    // Meta CAPI shape doesn't currently carry UTM custom_data; Meta
    // attributes campaign on its own side via the ad-click fbp/fbc
    // cookies, so this is acceptable for now. The full UTM set still
    // lands in Odoo / Sheets / email via `fields` above.
    meta: { eventName: 'Lead', phone, name, city, value: META_VALUE_NEPAL_WAAS, eventId },
  });

  redirect(`/thank-you?source=nepal-waas&eventId=${eventId}`);
}

export async function submitRFQ(formData: FormData): Promise<void> {
  await gateRecaptcha(formData, 'rfq', 'industrial-rfq');
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
    meta: { eventName: 'SubmitApplication', email, phone: mobile, name, city: location, value: META_VALUE_INDUSTRIAL_RFQ },
  });

  redirect('/thank-you?source=industrial-rfq');
}

export async function submitWaterTestRequest(formData: FormData): Promise<void> {
  await gateRecaptcha(formData, 'water_test', 'water-test');
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
    meta: { eventName: 'Lead', phone: mobile, city, value: META_VALUE_WATER_TEST },
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
  await gateRecaptcha(formData, 'remote_survey', 'remote-site-survey');
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
    meta: { eventName: 'Schedule', email, phone: mobile, name, city: location, value: META_VALUE_REMOTE_SURVEY },
  });

  redirect('/thank-you?source=remote-site-survey');
}
