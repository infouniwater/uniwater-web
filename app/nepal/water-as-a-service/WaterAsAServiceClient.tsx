'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eyebrow, Heading, Body, Caption } from '@/components/ui/Typography';
import { TextField, TextArea, SelectField } from '@/components/ui/Form';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { submitNepalWaaS } from '@/app/actions/leads';
import { RecaptchaField } from '@/components/forms/RecaptchaField';
import {
  DM_PRICING_LINE,
  REGIONS,
  SERVICE_LABEL,
  USE_CASE_OPTIONS,
  WHATSAPP_HREF_DM,
  WHATSAPP_HREF_GENERIC,
  type DWaaSPlan,
  type ServiceSlug,
} from '@/content/nepal-waas';
import { useUtmCapture, appendUtmToWhatsAppHref } from './useUtmCapture';
import { HeroCTAs } from './HeroCTAs';

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
 *   - fbq('track', 'Lead')     on SUCCESSFUL submission only -- fired
 *                              from /thank-you's ThankYouConversionFire
 *                              when ?source=nepal-waas. The previous
 *                              pre-click fire in this form's onSubmit
 *                              was removed because it double-counted
 *                              alongside the server-side CAPI event and
 *                              fired even when the visitor abandoned
 *                              mid-submit. Meta de-dupes by event_id;
 *                              CAPI side stays the source of truth.
 *
 * UTM capture: useUtmCapture (./useUtmCapture.ts) reads utm_source /
 * medium / campaign / content / term and fbclid from the URL on mount,
 * persists to sessionStorage so they survive an in-page soft nav, and
 * exposes the values for two purposes:
 *   1. Hidden form fields piggy-backing the lead-form submit -- they
 *      land in the server action and from there in Odoo / Sheets / the
 *      Meta CAPI Lead event for ad attribution.
 *   2. WhatsApp prefill suffix -- " (src: <campaign>)" appended to the
 *      message so the inbound chat carries the source in the first
 *      visible line of the conversation.
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

  // UTM + fbclid capture. Lazy reads + writes happen inside the hook;
  // we just need the values for the hidden inputs + WhatsApp suffix.
  const utms = useUtmCapture();
  const whatsappGenericTagged = appendUtmToWhatsAppHref(WHATSAPP_HREF_GENERIC, utms);
  const whatsappDmTagged = appendUtmToWhatsAppHref(WHATSAPP_HREF_DM, utms);

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
                  <div className="mt-2">
                    {/* Same two-CTA grammar as the hero -- primary
                        WhatsApp pill + secondary scroll-to-form. The
                        WHATSAPP_HREF_DM is passed raw; HeroCTAs adds
                        the UTM-source suffix client-side. */}
                    <HeroCTAs
                      theme="on-light"
                      whatsappHref={WHATSAPP_HREF_DM}
                      secondaryHref="#lead-form"
                      primaryLabel="Enquire on WhatsApp"
                      onPrimaryClick={() => {
                        pixelTrack('Contact', { content_name: 'DM Water', source: 'dm-card' });
                        gaTrack('contact', { method: 'whatsapp', source: 'dm-card', content_name: 'DM Water' });
                      }}
                    />
                  </div>
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
                className="bg-subtle border border-hairline p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Service + plan come from the live tab + selected-plan
                    state; both echoed as hidden fields so the visitor
                    doesn't have to re-pick. */}
                <input type="hidden" name="service" value={service} />
                <input type="hidden" name="plan" value={selectedPlan ?? ''} />

                {/* UTM + fbclid hidden fields. Captured by useUtmCapture
                    on first mount (URL) or restored from sessionStorage
                    on subsequent in-page navigations. Server action
                    forwards them to Odoo + Sheets + Meta CAPI so each
                    lead carries its ad attribution. */}
                <input type="hidden" name="utm_source" value={utms.utm_source} />
                <input type="hidden" name="utm_medium" value={utms.utm_medium} />
                <input type="hidden" name="utm_campaign" value={utms.utm_campaign} />
                <input type="hidden" name="utm_content" value={utms.utm_content} />
                <input type="hidden" name="utm_term" value={utms.utm_term} />
                <input type="hidden" name="fbclid" value={utms.fbclid} />

                <RecaptchaField action="nepal_waas" />

                <TextField label="Your name" name="name" required placeholder="Full name" />
                {/* Business / venue is OPTIONAL -- many ad clickers are
                    individuals or unsure of a label at this stage; the
                    sales engineer collects this on the callback. */}
                <TextField label="Business / venue" name="business" placeholder="Company, hotel, restaurant…" />
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

                {/* Use case is OPTIONAL -- if the visitor doesn't pick,
                    the callback will figure it out from notes / the
                    conversation. Forcing it earlier just added friction. */}
                <SelectField
                  label="Use case"
                  name="useCase"
                  placeholder="Pick the closest match (optional)"
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
                        href={whatsappGenericTagged}
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

      {/* (Sticky mobile CTA bar lives in page.tsx now -- the new
          dual-button StickyMobileCTABar component supersedes the old
          single-WhatsApp pill that lived here.) */}
    </>
  );
}
