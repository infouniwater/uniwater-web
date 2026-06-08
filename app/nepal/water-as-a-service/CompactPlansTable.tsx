import Link from 'next/link';
import { Caption, Eyebrow, Heading } from '@/components/ui/Typography';
import { DWAAS_PLANS } from '@/content/nepal-waas';

/**
 * Compact single-table plan grid that lives directly under the hero.
 *
 * Why above-the-fold: ad traffic asks "what does it cost?" as soon as
 * the hero lands. Burying the plans below trust signals and the form
 * meant most visitors never reached them; the 0/27 conversion run
 * suggested they bounced at the trust band. Moving plans up so the
 * price answer arrives before the doubt does.
 *
 * Why a Server Component: the table is pure data render -- DWAAS_PLANS
 * is static, plan selection happens via the URL (?plan=<slug>) which
 * the existing page already passes to WaterAsAServiceClient as
 * initialPlan. No client state needed at this layer; the row's Link
 * does a soft navigation and the lead form below picks the plan up.
 *
 * Single rendering at all widths: 12-col grid on tablet+, stacked
 * two-line layout on mobile. Same "one row per plan" mental model,
 * same visual treatment, no parallel desktop-table / mobile-cards
 * split. The popular tier gets a tint background; everything else
 * stays offwhite.
 */
export function CompactPlansTable() {
  return (
    <section id="plans" className="bg-offwhite border-b border-hairline">
      <div className="container-uw section-tight">
        <div className="mb-6 max-w-2xl flex flex-col gap-3">
          <Eyebrow>Pick your plan</Eyebrow>
          <Heading level={2}>Five tiers. From NPR 1.5 per litre.</Heading>
          <Caption className="text-mute">
            More volume, lower rate. Refundable deposit, not capex. Tap a plan
            and we&rsquo;ll pre-fill the callback form below.
          </Caption>
        </div>

        <div className="border border-hairline overflow-hidden">
          {/* Desktop / tablet column header */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-subtle border-b border-hairline text-eyebrow font-ui font-medium uppercase tracking-wide text-mute">
            <div className="col-span-1">Plan</div>
            <div className="col-span-3">Best for</div>
            <div className="col-span-2">Consumption</div>
            <div className="col-span-1">NPR / L</div>
            <div className="col-span-2">Min bill</div>
            <div className="col-span-1">Deposit</div>
            <div className="col-span-2"></div>
          </div>

          {DWAAS_PLANS.map((plan) => {
            const popularCls = plan.popular
              ? 'bg-tint/30 hover:bg-tint/50'
              : 'bg-offwhite hover:bg-subtle/60';
            const ctaCls = plan.popular
              ? 'bg-teal text-offwhite hover:bg-navy'
              : 'bg-navy text-offwhite hover:bg-teal';
            const planHref = `/nepal/water-as-a-service?plan=${plan.slug}#lead-form`;
            const planAria = `Select Plan ${plan.slug} -- ${plan.monthlyLitres.toLocaleString('en-IN')} litres per month at NPR ${plan.ratePerLitre} per litre`;

            return (
              <div
                key={plan.slug}
                className={`border-b border-hairline last:border-b-0 transition-colors ${popularCls}`}
              >
                {/* Tablet / desktop: one horizontal row per plan, 12-col grid.
                    The whole row is a single <Link> so clicking anywhere
                    selects the plan -- no nested expand/collapse here. */}
                <Link
                  href={planHref}
                  scroll
                  aria-label={planAria}
                  className="hidden md:grid grid-cols-12 gap-3 px-5 py-4 items-center"
                >
                  <div className="col-span-1 flex items-center gap-1.5">
                    <span className="font-numeric text-h3 font-medium text-navy">{plan.slug}</span>
                    {plan.popular && (
                      <span
                        className="text-[10px] font-ui font-semibold uppercase tracking-wide text-teal"
                        aria-label="Most chosen"
                        title="Most chosen"
                      >
                        ★
                      </span>
                    )}
                  </div>
                  <div className="col-span-3 min-w-0">
                    <Caption className="text-mute leading-snug">{plan.tagline}</Caption>
                  </div>
                  <div className="col-span-2 font-numeric text-body text-navy">
                    {plan.monthlyLitres.toLocaleString('en-IN')} L
                    <span className="text-mute text-caption ml-1 font-sans">({plan.jarsPerDay})</span>
                  </div>
                  <div className="col-span-1 font-numeric text-body text-navy">
                    {plan.ratePerLitre}
                  </div>
                  <div className="col-span-2 font-numeric text-body text-ink">
                    Rs {plan.minBill.toLocaleString('en-IN')}
                  </div>
                  <div className="col-span-1 font-numeric text-body text-ink">
                    Rs {plan.deposit.toLocaleString('en-IN')}
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`inline-flex items-center gap-1.5 font-ui font-medium text-caption rounded-full px-4 py-2 transition-colors ${ctaCls}`}>
                      Select
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>

                {/* Mobile: card layout.
                    Header  : "A)  For 1,500 L consumption" + Popular pill
                    Price   : "Price is NPR 2.25 per litre"
                    CTA     : full-width Select Plan button (the primary
                              conversion action; always visible).
                    Details : native <details><summary> for "View more" --
                              server-rendered, no client state, summary is
                              outside the <Link> so tapping it expands
                              instead of navigating. */}
                <div className="md:hidden p-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-numeric text-h2-m font-medium text-navy leading-none">
                        {plan.slug})
                      </span>
                      <span className="font-sans text-body text-navy">
                        For {plan.monthlyLitres.toLocaleString('en-IN')} L consumption
                      </span>
                      {plan.popular && (
                        <span className="text-[10px] font-ui font-semibold uppercase tracking-wide text-teal">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="font-sans text-body text-navy">
                      Price is <span className="font-numeric font-medium">NPR {plan.ratePerLitre}</span> per litre
                    </div>
                  </div>

                  <Link
                    href={planHref}
                    scroll
                    aria-label={planAria}
                    className={`inline-flex items-center justify-center gap-2 font-ui font-medium text-[15px] rounded-full px-5 py-3 transition-colors ${ctaCls}`}
                  >
                    Select Plan {plan.slug}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  <details className="group">
                    <summary className="list-none cursor-pointer text-caption text-teal font-medium inline-flex items-center gap-1.5 select-none">
                      <svg
                        className="transition-transform group-open:rotate-90"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="group-open:hidden">View more details</span>
                      <span className="hidden group-open:inline">Hide details</span>
                    </summary>
                    <div className="mt-3 pt-3 border-t border-hairline flex flex-col gap-2 text-caption">
                      <div className="flex justify-between gap-3">
                        <span className="text-mute">Minimum billing</span>
                        <span className="font-numeric text-navy font-medium">Rs {plan.minBill.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-mute">Security deposit</span>
                        <span className="font-numeric text-navy font-medium">Rs {plan.deposit.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-mute">Typical use</span>
                        <span className="text-navy">{plan.jarsPerDay}</span>
                      </div>
                      <p className="text-mute italic mt-1 leading-snug">{plan.tagline}</p>
                      <p className="text-mute mt-1 leading-snug">
                        Refundable deposit on cancellation. Monthly bill =
                        max(consumption &times; rate, minimum bill).
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-caption text-mute mt-4 italic">
          Prices in NPR, excluding taxes. Monthly bill = max(consumption &times; rate, minimum bill).
          Deposit refunded in full when the contract ends. Need DM (industrial) water? Scroll to the form &mdash; switch the service tab.
        </p>
      </div>
    </section>
  );
}
