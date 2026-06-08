'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';
import { TextField, TextArea, SelectField } from '@/components/ui/Form';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { submitNepalWaaS } from '@/app/actions/leads';
import { RecaptchaField } from '@/components/forms/RecaptchaField';
import {
  DWAAS_PLANS,
  DM_PRICING_LINE,
  REGIONS,
  SERVICE_LABEL,
  USE_CASE_OPTIONS,
  WHATSAPP_HREF_DM,
  WHATSAPP_HREF_GENERIC,
  type DWaaSPlan,
  type ServiceSlug,
} from '@/content/nepal-waas';

/**
 * Client island for the Nepal WaaS landing page.
 *
 * Owns: the service tab (drinking / dm), plan selection, the lead form,
 * WhatsApp deeplinks, and Meta Pixel browser-side event firing. The page
 * shell, hero, copy blocks, and SEO are Server Component (parent page.tsx).
 *
 * Pre-selection: ?service=drinking|dm sets the initial tab. ?plan=A..E
 * (optional) pre-selects a plan so a Meta ad link can deep-link straight
 * to a specific tier.
 *
 * Pixel events fired browser-side (in addition to the server-side CAPI
 * event from submitNepalWaaS):
 *   - fbq('track', 'Contact')  on every WhatsApp-CTA click
 *   - fbq('track', 'Lead')     on form submit (pre-server-call)
 * Meta de-dupes via event_id; CAPI side is the source of truth.
 */

// Type-declaration for the Meta fbq global. Strictly optional -- the
// helper bails silently if fbq isn't present (local dev without
// NEXT_PUBLIC_META_PIXEL_ID set, or first paint before fbevents.js loads).
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function pixelTrack(event: 'Contact' | 'Lead', payload?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    window.fbq('track', event, payload);
  } catch {
    /* silent -- pixel failures must never block the conversion path */
  }
}

// GA4 event firing -- mirrors pixelTrack so the same conversion sites
// report into both Meta and Google. Standard GA4 event names where one
// exists (generate_lead, select_item); 'contact' is a custom event GA4
// will just record under "All events" until marked as a Key Event in
// the GA UI. Campaign attribution is handled by GA via the landing-
// page UTMs on the session, so we don't pass utm_* in the event params.
function gaTrack(event: 'generate_lead' | 'contact' | 'select_item', payload?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', event, payload);
  } catch {
    /* silent */
  }
}

interface Props {
  initialService?: ServiceSlug;
  initialPlan?: DWaaSPlan['slug'];
}

export function WaterAsAServiceClient({ initialService, initialPlan }: Props) {
  // Read URL params client-side too, so deep links via Meta ads work even
  // when the server-side parsing missed them (e.g. hash-routed traffic).
  const params = useSearchParams();
  const paramService = params.get('service');
  const paramPlan = params.get('plan');

  const startingService: ServiceSlug =
    paramService === 'dm' || paramService === 'drinking'
      ? paramService
      : initialService ?? 'drinking';

  const startingPlan =
    paramPlan && ['A', 'B', 'C', 'D', 'E'].includes(paramPlan)
      ? (paramPlan as DWaaSPlan['slug'])
      : initialPlan;

  const [service, setService] = useState<ServiceSlug>(startingService);
  const [selectedPlan, setSelectedPlan] = useState<DWaaSPlan['slug'] | undefined>(startingPlan);

  // Keep state in sync if the user navigates back/forward with query
  // changes (Meta ads sometimes add UTM via client-side rewrites).
  useEffect(() => {
    if (paramService === 'dm' || paramService === 'drinking') {
      setService(paramService);
    }
  }, [paramService]);

  // Sync selectedPlan from the URL too. The above-the-fold plans table
  // (CompactPlansTable, rendered server-side in page.tsx) sets plan via
  // a soft navigation to ?plan=<slug>#lead-form -- without this effect
  // the form's hidden plan input would stay frozen at whatever the
  // initial mount saw, and tapping a second plan would silently submit
  // the first one.
  useEffect(() => {
    if (paramPlan && ['A', 'B', 'C', 'D', 'E'].includes(paramPlan)) {
      setSelectedPlan(paramPlan as DWaaSPlan['slug']);
    }
  }, [paramPlan]);

  return (
    <>
      {/* Service tabs */}
      <section className="border-b border-hairline bg-offwhite">
        <div className="container-uw">
          <div role="tablist" aria-label="Service" className="flex gap-8 overflow-x-auto">
            {(['drinking', 'dm'] as const).map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={service === s}
                onClick={() => setService(s)}
                className={`py-5 text-[15px] font-ui font-medium whitespace-nowrap border-b-2 -mb-px transition-colors duration-200 ease-calm ${
                  service === s
                    ? 'border-teal text-navy'
                    : 'border-transparent text-mute hover:text-navy'
                }`}
              >
                {SERVICE_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DM Water -- shown only when the visitor switches the service
          tab. Drinking plans live above the fold in CompactPlansTable
          (app/nepal/water-as-a-service/CompactPlansTable.tsx); when the
          tab is on drinking, this branch renders nothing and the lead
          form follows directly under the service tabs. The previous
          desktop-table + mobile-cards duplicate render lived here too;
          it's been removed in favor of the single above-fold table. */}
      {service === 'dm' && (
        <section id="dm-water" className="bg-subtle">
          <div className="container-uw section">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <Eyebrow className="mb-4">DM Water as a Service</Eyebrow>
                <Heading level={2} className="mb-4">Ultra-pure DM water, held to your spec.</Heading>
                <Body className="text-mute mb-4">
                  Demineralised water for boiler feed, plating, batteries, pharma,
                  electronics, and labs. We size the plant to your feed-water TDS
                  and target conductivity, install on a service contract, and
                  manage the resin for you.
                </Body>
                <Body className="text-navy font-medium italic mt-6">{DM_PRICING_LINE}</Body>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-offwhite border-2 border-teal p-6 md:p-8 flex flex-col gap-4">
                  <Eyebrow className="text-teal">Enquire</Eyebrow>
                  <h3 className="font-sans text-h2-m font-light text-navy [text-wrap:balance]">
                    Pricing is per-site. Tell us your target spec.
                  </h3>
                  <Body className="text-mute">
                    Feed-water TDS, daily volume, application &mdash; and we&rsquo;ll
                    come back with a contract and a price within one business day.
                  </Body>
                  <a
                    href={WHATSAPP_HREF_DM}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      pixelTrack('Contact', { content_name: 'DM Water', source: 'dm-card' });
                      gaTrack('contact', { method: 'whatsapp', source: 'dm-card', content_name: 'DM Water' });
                    }}
                    className="mt-2 inline-flex items-center gap-2 self-start bg-navy text-offwhite font-ui font-medium text-[15px] tracking-[0.02em] rounded-full px-6 py-3 transition-colors duration-200 ease-calm hover:bg-teal"
                  >
                    Enquire on WhatsApp
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Lead form */}
      <section id="lead-form" className="bg-offwhite">
        <div className="container-uw section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Eyebrow>Get a callback</Eyebrow>
              <Heading level={2}>One business day to an engineer.</Heading>
              <Body className="text-mute mt-2">
                Drop your details and we&rsquo;ll call you back from{' '}
                <span className="text-navy font-medium">Biratnagar</span> or{' '}
                <span className="text-navy font-medium">Itahari</span> within
                one business day. Prefer WhatsApp? Tap any plan above to start
                a chat with the tier pre-tagged.
              </Body>
              <ul className="mt-6 flex flex-col gap-3">
                <li className="flex gap-3 text-caption text-mute">
                  <span className="text-teal">—</span>
                  <span>Same-day callback in Itahari and Biratnagar.</span>
                </li>
                <li className="flex gap-3 text-caption text-mute">
                  <span className="text-teal">—</span>
                  <span>Site survey within five working days.</span>
                </li>
                <li className="flex gap-3 text-caption text-mute">
                  <span className="text-teal">—</span>
                  <span>Plant commissioned within agreed timeline.</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <form
                action={submitNepalWaaS}
                onSubmit={() =>
                  pixelTrack('Lead', {
                    content_name: SERVICE_LABEL[service],
                    plan: selectedPlan,
                    source: 'meta-ads-east-nepal',
                  })
                  // NOTE: GA4 generate_lead is fired from /thank-you (see
                  // app/thank-you/ThankYouConversionFire.tsx). Firing here
                  // is unreliable because the Server Action redirect
                  // unloads the page before gtag.js can flush /g/collect.
                  // Meta's fbq uses sendBeacon and survives unload, so
                  // pixelTrack stays.
                }
                className="bg-subtle border border-hairline p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Service + plan come from the live tab + selected-plan
                    state; both echoed as hidden fields so the visitor
                    doesn't have to re-pick. */}
                <input type="hidden" name="service" value={service} />
                <input type="hidden" name="plan" value={selectedPlan ?? ''} />
                <RecaptchaField action="nepal_waas" />

                <TextField label="Your name" name="name" required placeholder="Full name" />
                <TextField label="Business / venue" name="business" required placeholder="Company, hotel, restaurant…" />
                <SelectField
                  label="City"
                  name="city"
                  required
                  placeholder="Pick your city"
                  options={[
                    ...REGIONS.map((r) => ({ value: r, label: r })),
                    { value: 'Other', label: 'Other (East Nepal)' },
                  ]}
                />
                <TextField label="Mobile / WhatsApp" name="phone" type="tel" required placeholder="+977 or +91" />

                <SelectField
                  label="Use case"
                  name="useCase"
                  required
                  placeholder="Pick the closest match"
                  options={USE_CASE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                  className="md:col-span-2"
                />
                <TextArea
                  label="Notes (optional)"
                  name="notes"
                  className="md:col-span-2"
                  rows={3}
                  placeholder="Daily volume, target TDS / spec, site readiness, anything else worth knowing."
                />

                <div className="md:col-span-2 flex flex-col gap-2">
                  <div className="text-caption text-mute">
                    Submitting selects: <span className="font-medium text-navy">{SERVICE_LABEL[service]}</span>
                    {selectedPlan && service === 'drinking' && (
                      <> · Plan <span className="font-medium text-navy">{selectedPlan}</span></>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <SubmitButton>Get a callback</SubmitButton>
                    <Caption className="text-mute">
                      Or tap any{' '}
                      <a
                        href={WHATSAPP_HREF_GENERIC}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          pixelTrack('Contact', { source: 'form-area-link', service });
                          gaTrack('contact', { method: 'whatsapp', source: 'form-area-link', service });
                        }}
                        className="text-teal underline underline-offset-4"
                      >
                        WhatsApp link
                      </a>{' '}
                      to skip the form.
                    </Caption>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile WhatsApp CTA -- visible only on smaller screens.
          Sits above the iOS home indicator with safe-area padding. */}
      <Link
        href={WHATSAPP_HREF_GENERIC}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          pixelTrack('Contact', { source: 'sticky-mobile-cta' });
          gaTrack('contact', { method: 'whatsapp', source: 'sticky-mobile-cta' });
        }}
        className="md:hidden fixed inset-x-3 bottom-3 z-40 flex items-center justify-center gap-2 bg-teal text-offwhite font-ui font-medium text-[15px] rounded-full py-3.5 shadow-[0_8px_24px_rgba(5,69,95,0.25)]"
        style={{ paddingBottom: 'calc(0.875rem + env(safe-area-inset-bottom, 0px))' }}
        aria-label="Chat with Uniwater on WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
        </svg>
        <span>Chat on WhatsApp</span>
      </Link>
    </>
  );
}
