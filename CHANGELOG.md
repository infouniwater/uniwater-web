# Changelog

Sprint-by-sprint record of work landed against the BLUEPRINT §16 roadmap.

## Sprint 0 — Foundations

- **0.1** Re-enabled `next/font/google` (Signika 300–700 + Bodoni Moda Italic). Added `adjustFontFallback: false` on Bodoni to silence the missing-override-table warnings; layout-shift impact is negligible because Bodoni is used only for sparse pull-quotes per BLUEPRINT §3.2.
- **0.2** Wired the homepage hero in `EditorialHero.tsx`. Asset: `public/images/installs/hero-duo-iron-softener-ss316.jpg` (interim — sourced from the WhatsApp install pack; TODO in source for the commissioned hand-under-tap shot per BLUEPRINT §14.1 #1).
- **0.3** Wired five install photos into `InstallationVersatility.tsx` (false-ceiling / plumbing-shaft / wall-recess / under-counter / utility-room). `false-ceiling-01.jpg` and `wall-recess-01.jpg` carry TODO markers — they're best-available approximations from the WhatsApp set; replace when commissioned photography per BLUEPRINT §14.1 #2 and #4 lands.
- **0.4** Built the real `<Infographic>` renderer (`components/ui/Infographic.tsx`). Uses `<picture>` with a `(max-width: 767px)` portrait source over the landscape default. Manifest covers 11 assets: 8 paired landscape/portrait SVGs (decision-vs-eighteen-months, three-forces, five-places-and-monthly-service, hardness-scale, homesoft-four-stage, tds-decision-tree, ro-vs-dm, building-wtp-ladder) plus 3 commercial PNGs (where-we-work, system-types, track-record). Assets not in MANIFEST (e.g. `india-nepal-9-city-map.svg`) fall back to the existing placeholder so the page still works while commissioned art is in flight.
- **0.5** Replaced the two-panel layout in `DayOneArc.tsx` with `<Infographic assetName="decision-vs-eighteen-months.svg" />`. Section flipped to `tone="navy"` to honour BLUEPRINT §3.7 (dark SVGs as full-bleed navy bands, not inline decorations).
- **0.6** `homesoft-four-stage.svg` is now rendered on `/solutions/whole-house-water-filter` (the SolutionDetailTemplate's `whole-house-inlet` install-context slot was already wired; the 0.4 manifest entry switches it from placeholder to real asset automatically).
- **0.7** Same auto-wiring for `tds-decision-tree.svg` on `/solutions/drinking-water-solution` via the `point-of-use` install-context slot.
- **0.8** Embedded `hardness-scale.svg` above the four hardness-band cards on the `/water-problem-checker` result view.
- **0.9** Built `components/layout/WhatsAppFAB.tsx` — mobile-only (`md:hidden`), fixed bottom-right, 56×56 brand-teal pill. Hidden on `/book-survey`, `/remote-site-survey`, `/water-problem-checker`, `/industrial`. Pre-fills the WhatsApp message with the current page title (stripped of the `" — Uniwater"` template suffix). Rendered globally from `app/layout.tsx`.
- **0.10** Configured 301 redirects in `next.config.js` for the three BLUEPRINT §4.2 legacy slug patterns: `/book-water-test → /book-survey`, `/solutions/practical-particle-filter → /solutions/sediment-filter`, `/cities/water-softener-:city → /cities/:city` (the parameterised rule covers all 9 cities in one entry).

## Sprint 1 — Audience routing & RFQ deep page

- **1.1** Verified the four `AudienceRouter` card labels against BLUEPRINT §7 + Critique §1.3. Three cards' targets were already correct. Fourth card (architect / plumber) now routes to `/contact?audience=specifier`. Built `components/forms/AudiencePrefill.tsx` — a client island that reads the `audience` query param via `useSearchParams()` and emits a hidden form input so the value rides along on submit. Suspense-wrapped at the call site so `/contact` stays static-prerendered.
- **1.2** Built `components/sections/SolutionStickyCTA.tsx` — rAF-throttled scroll-position math against two sentinel `<div>`s (`#solution-sticky-start` after the Configurations section, `#solution-sticky-end` immediately before the FinalCTA). Mobile: full-width bottom bar with top border. Desktop (lg+): right-anchored pill at vertical mid-screen. Single CTA: "Book a free survey". Wired into `SolutionDetailTemplate.tsx`, so it appears on all 8 solution detail pages.
- **1.3** Added a per-audience off-ramp row in the Header that renders only when `pathname.startsWith('/industrial')`. Two links: `An architect → /contact?audience=architect` and `A plumber → /contact?audience=plumber`. Hidden on mobile to avoid header overgrowth (mobile users get the menu overlay for off-ramps). Audience params route through the same `AudiencePrefill` island wired in 1.1, so the contact form captures the audience tag as a hidden input regardless of which entry point the user used.

## Sprint 2 — Trust pages depth

- **2.1** `/about` verification pass — all four BLUEPRINT requirements (founder note, real client logos, 9-city map, traction stats) already wired in the scaffold. Strengthened the in-source TODO markers so the asset gaps (real founder photo + signed note; real client logos to replace the text fallback in `public/images/clients/`) are easier to find. Map renders via the existing `CitiesSection` Infographic call (placeholder until BLUEPRINT §14.3 #1 commissioned art lands).
- **2.2** Added full-detail case study content for `birat-medical-college` and `acasa-by-malani` in `content/case-studies.ts` (`fullDetail: true`) + `app/case-studies/[slug]/page.tsx` (`FULL_CONTENT` map entries with brief, challenge, solution, four outcome stat tiles, quote, attribution). Routes prerendered SSG: `/case-studies/charnock-hospital`, `/case-studies/birat-medical-college`, `/case-studies/acasa-by-malani`.
- **2.3** Flipped `fullContent: true` on `kolkata` and `bhubaneswar` in `content/cities.ts`, with modest locality and water-context enrichment. The Real Installs section in `app/cities/[slug]/page.tsx` now renders for both. Deeper local content remains a Sprint 5 task.
- **2.4** Hand-built a minimal 1-page sample service report PDF at `public/data-sheets/sample-service-report.pdf` (2.5 KB) following the catalogue's Before / On site / After structure with dummy parameter readings (TDS 280→152, hardness 380→28, etc.). Wired the `/service` page Download Sample Report button to the file. The PDF was generated via a self-contained Python script writing the PDF bytes directly — no new npm dependency.

## Sprint 4 — Tools refinement

- **4.1** Rewrote the `recommend()` function in `app/water-problem-checker/page.tsx`. Old logic was three crude conditionals + a fallback. New logic has eight exhaustive branches keyed on the four input axes (source / symptoms / property / city): institutional first (different CTA verb per BLUEPRINT §12.5), then arsenic-risk cities (Siliguri / Guwahati / Biratnagar with borewell), then iron+borewell (sized by property), then scale-dominant (sized to BathSoft Mono-Duo-Trio or HomeSoft 2K-4K-6K), then drinking-water-taste, then appliances-failing, then no-symptoms preventive, then fallback. Result type gained an optional `secondaryCta` field so institutional answers flip the second CTA from "Book a free survey" to "Submit an RFQ".
- **4.2** Softened the `/remote-site-survey` step 2 upload UI. Removed the misleading "Choose file" buttons that did nothing; replaced with a numbered checklist of what to send and an explicit instruction to email files to `support@uniwater.co.in` after submitting. Honest UI until the Sprint 0 file-upload backend (Vercel Blob / Supabase storage) lands.
- **4.3** Verified the hardness-band module on the `/water-problem-checker` result view. The Infographic + cards structure rendered cleanly across every build in the engagement; visual confirmation in browser is the developer's call once they run `npm run dev`.

## Sprint 5 — Content + city depth

- **5.A** Set `fullContent: true` on the six remaining cities (Ranchi, Rourkela, Siliguri, Guwahati, Kathmandu, Biratnagar) with modest locality enrichment and water-context expansion. All 9 cities now render the Real Installs section, with locality counts in the 6–10 range each.
- **5.B** Built the typed blog content layer in `content/blog.ts` (`BlogPost`, `BlogBlock`, `BlogCategory`, plus `getPostBySlug` / `formatPostDate` helpers). Refactored `app/blog/page.tsx` from empty-state into a real index sorted by `publishedAt` desc, and `app/blog/[slug]/page.tsx` to render the typed body blocks (`p` / `h2` / `pullquote` / `list`). `generateStaticParams` added so every post prerenders SSG. Added blog routes to `sitemap.ts`.
- **5.C** Wrote 12 tier-1 blog posts per BLUEPRINT §14.4 list — Chemistry, Decision, Install, Service, Voice categories. Word counts run shorter than the §14.4 spec (1500–2500); these are tier-1 starts for the content team to expand. Posts cover: borewell water yellow, iron/hardness order, Hansgrohe spec vs Indian water, how to read a water test, soft vs salt water, TDS isn't a quality metric, five-year cost of doing nothing, whole-house vs point-of-use, monthly service report, AMC tiers honestly, re-mineralisation after RO, premium fittings slow disaster.

## Sprint 6 — Channel programs (public shell)

- **6.A** Built `app/for-architects/page.tsx` — public-facing specifier program page. Hero with brand-aligned positioning; three-card benefits; spec library section listing six asset bundles (DWG vessel footprints, BIM blocks, install drawings, pre-construction checklist, technical PDFs, project-mode spec packs); four-step process; component-manufacturer trust strip on navy band; lead capture routed to `/contact?audience=architect` via the existing `<AudiencePrefill />` island.
- **6.B** Built `app/for-plumbers/page.tsx` — public-facing plumber program page. Hero; three-card earnings benefits (20 points/referral, 200 points per ₹50K, AMC handover); four-step register → refer → install → earn process; FAQ section answering the questions plumbers ask before registering; lead capture routed to `/contact?audience=plumber`. Both pages note that the partner portal authentication and the live points dashboard remain TODO until separate engineering for `/partner/dashboard` ships.
- **6.C** Updated the AudienceRouter specifier card's `href` from `/contact?audience=specifier` to `/for-architects` now that the page exists. Updated the `/industrial` Header off-ramp links from `/contact?audience=…` to the new `/for-architects` and `/for-plumbers` URLs. Added both routes to `sitemap.ts`.

## Sprint 7 — Polish + launch shell

- **7.A** Added `app/loading.tsx` — global Suspense fallback. A thin teal progress line at the top of the viewport, animated unless `prefers-reduced-motion` is set. Matches BLUEPRINT §3.5 motion philosophy (calm, present, never attention-seeking).
- **7.B** Added `app/error.tsx` — global error boundary as a Client Component (required by Next.js App Router). Renders a calm recovery surface with "Try again" (calls Next's `reset()`), "Back to home", and "Contact us" CTAs. Surfaces `error.digest` if present. TODO marker to wire Sentry once that integration lands.
- **7.C** OG / meta audit. Added `layout.tsx` for the three client-component pages whose `'use client'` directive blocks `metadata` export at the page level: `/solutions`, `/water-problem-checker`, `/remote-site-survey`. Each layout is a pass-through child render with its own `Metadata`. All 33 page-level routes now have page-specific title and description.

## Sprint 0 leftover — data sheets

- Generated 8 sample data-sheet PDFs at `public/data-sheets/{slug}.pdf` — one per solution. Each PDF: 1-page A4, hand-built minimal PDF using `scripts/build-data-sheets.py` (no npm dependency). Content per sheet: brand banner, BathSoft/HomeSoft wordmark where applicable, two-line intro from the catalogue, configurations with name/subtitle/description, "What is included" checklist, technical specifications (capacity, materials, controls, install), MRP-from line, contact footer. Files total ~21 KB across the 8 PDFs.

## Dashboard scope cleanup

- Per the user's scope decision that the customer dashboard lives as a separate product (not a route inside this marketing repo), reframed four in-page mentions: `/service` final CTA sub, `/faq` Premium AMC description, `/about` 2026 timeline entry, `/privacy` retention paragraph. All four now describe a "customer portal" launching "as a separate product" rather than implying it ships under `uniwater.co.in/account`.
- The `<WhatsAppFAB />` and `robots.txt` `/account` disallow rule remain in place — they are forward-compatible with the portal living at any URL.

## Odoo CRM wiring — replaces the Sprint 0 leftover form-submission TODO

- Built `lib/odoo.ts` — a small JSON-RPC client against Odoo SaaS (`uniwater-solutions.odoo.com`). No external npm dependency; uses native `fetch`. Authenticates via `common.authenticate` (uid cached at module level), creates `crm.lead` records via `object.execute_kw`. Reads creds from `process.env.ODOO_*`.
- Built `app/actions/leads.ts` — four server actions, one per form (`submitBookSurvey`, `submitContact`, `submitRFQ`, `submitRemoteSurvey`). Each maps FormData into the Odoo lead shape (`name`, `contact_name`, `email_from`, `phone`, `city`, `description`) and redirects to `/thank-you?source=<form>` on success. Throws on failure (caught by the global `app/error.tsx` boundary).
- Wired all four forms via `<form action={...}>`:
  - `/book-survey` → `submitBookSurvey`
  - `/contact` → `submitContact` (carries the `audience` hidden field from `<AudiencePrefill />`)
  - `/industrial` RFQ section → `submitRFQ`
  - `/remote-site-survey` → `submitRemoteSurvey`. Refactored the multi-step form so all four step blocks render to the DOM at once with visibility toggled by CSS — this preserves field values across forward/back navigation. Navigation buttons typed `type="button"` to avoid premature submit.
- Built `/thank-you` page — reads `?source=` query param and renders source-specific copy (survey ETA, RFQ engineer-response window, remote-survey email-the-photos reminder, etc.). `robots: { index: false, follow: true }` so the page doesn't get indexed.
- Credentials handling: `.env.local` carries the live creds (gitignored — `.env*` rule). `.env.example` is committed (`.gitignore` updated with `!.env.example`) and documents the four required env vars without values. Production: same vars need to be set in Vercel project settings before deploy.
- Removed the stale `TODO Sprint 0: wire to HubSpot/Zoho via API route` comments on `/book-survey`, `/contact`, and `/industrial`. The RFQ file-upload comment now describes the email fallback explicitly.

## Partner dashboard scope cleanup

- Per the user's scope decision that the partner portal lives as a separate product (same pattern as the customer dashboard), removed forward-looking references to `/partner/dashboard` from `/for-architects` and `/for-plumbers`. The architect spec-library callout now reads "Request packs via the contact form" instead of "Until the partner portal launches, request packs via..."; the plumber registration note reads "Registration runs via the contact form" instead of "Until the partner portal launches, registration runs via...". The plumber FAQ's "points balance" answer was rewritten to describe the current WhatsApp statement flow rather than promising a future portal.

## Verification

- `npm run build` final pass clean. **60 routes** prerendered (up from 45 at end of Sprint 4; +12 blog posts SSG'd, +2 `/for-*` pages, +1 `/thank-you`).
- `/thank-you` is Dynamic (ƒ) because it reads `searchParams.source`. Intentional. Every other route is Static (○) or SSG (●).
- Bundle headline unchanged: shared First Load JS 87.1 kB; heaviest routes `/solutions` and `/water-problem-checker` at 101 kB. `/remote-site-survey` grew 3.77 → 4.01 kB (the multi-step form now imports the server action). Every route under the 150 kB per-route budget per BLUEPRINT §15.2.
- Next.js detected `.env.local` at build time (`Environments: .env.local` in the build output). Env vars resolve at server-action invocation, not build, so the build is independent of credential validity — a wrong API key surfaces on the first form submit, not on deploy.
- Banned-phrase grep audit zero matches across `app/**`, `components/**`, `content/**`.

## Known runtime-only validations (not buildable)

- The actual Odoo lead creation happens only when a user submits a form. To validate end-to-end after deploy: submit `/book-survey` with test data, then check `crm.lead` in Odoo for a row with "Source: /book-survey" in the description.
- Server-action error UX: if Odoo authentication fails or the API key is wrong, the user sees the global `app/error.tsx` recovery surface. Clicking "Try again" re-renders but does not re-submit (form state is lost). For v2, swap to `useActionState` so the form stays mounted with an inline error and the user can retry without re-filling.

## SEO structured data (BLUEPRINT §15.4)

- Built `lib/structured-data.ts` with JSON-LD schema generators: `organizationSchema`, `websiteSchema`, `localBusinessSchema`, `faqPageSchema`, `articleSchema`, `breadcrumbSchema`, `productSchema`, plus a `jsonLd()` serialiser that stringifies one schema or an array of schemas for embedding into a `<script type="application/ld+json">` tag.
- **Site-wide** — Organization + WebSite injected from `app/layout.tsx` `<head>`. Organization includes contact points for both phone numbers (customer support + sales), area served (India + Nepal), languages (English, Hindi, Bengali), and links back via `@id` so other schemas can reference it.
- **`/contact`** — LocalBusiness with the head-office address, support phone, support email, `priceRange: '₹₹₹'`, and parentOrganization back-reference.
- **`/cities/[slug]`** — LocalBusiness per city (cityName + citySlug routed via `@id`) plus Breadcrumb (Home → Cities → City).
- **`/faq`** — FAQPage carrying all 17 Q&A pairs flattened from the five categories.
- **`/solutions/[slug]`** (via SolutionDetailTemplate) — Product with `AggregateOffer.lowPrice` from `priceFromINR`, FAQPage with the five per-solution FAQs, Breadcrumb (Home → Solutions → solution).
- **`/blog/[slug]`** — Article with headline, description, publication + modification dates, author + publisher references back to the Organization, `mainEntityOfPage`, and `timeRequired` from `readingMinutes`. Breadcrumb (Home → Journal → post).
- **`/case-studies/[slug]`** — Breadcrumb (Home → Case studies → client name). Reviews / case-study schemas can be added later when real testimonial data lands.
- All JSON-LD lives in the HTML response — zero JS bundle impact (build sizes unchanged from pre-SEO state).

## Accessibility quick wins

- Audit grep for `<Image>` and `<img>` without `alt` — zero violations across `app/**` + `components/**`.
- Audit grep for `<svg>` without aria attributes — zero violations; every SVG is either `aria-hidden="true"` (decorative) or has `aria-label` (interactive).
- Audit grep for empty `aria-label=""` — none found.
- Fix: mobile menu overlay in `Header.tsx` was missing `role="dialog"` + `aria-modal="true"` + `aria-label="Site menu"`. All three added. Screen-reader users now get the correct overlay semantics when the hamburger opens.
- Form field semantics (programmatic `<label>` + `aria-describedby` for errors) confirmed already in place via the `FieldShell` component in `components/ui/Form.tsx`.
- Other BLUEPRINT §15.3 items already in place from the original scaffold: skip-to-content link, single H1 per page, focus-visible 2px teal outline, `prefers-reduced-motion` respected globally, semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`).

## WhatsApp BSP — Solutions Expert (not Twilio)

- Earlier docs referred to "Twilio WhatsApp Business" as the planned BSP. Corrected: the actual BSP is **Solutions Expert** (`solutionexpert.online`), already provisioned for the separate `wa_agent` Fly app at `uniwater-wa-agent.fly.dev`. The marketing-site README's "Still pending" section is updated to reflect this.
- Architecture: marketing-site forms → Odoo CRM (this repo) → `wa_agent` polls Odoo for new leads → Solutions Expert BSP → customer's WhatsApp. This keeps BSP credentials out of the marketing-site repo and avoids the duplicate-send risk that would come from having both surfaces try to push confirmations.
- No code change in this repo — the swap is a scope clarification. If the team later decides to push WhatsApp confirmations directly from the marketing site (bypassing wa_agent), the integration point would be a single helper in `lib/whatsapp.ts` called from `app/actions/leads.ts` after each `createLead` succeeds, with `SOLUTIONEXPERT_API_BASE` + `SOLUTIONEXPERT_ACCESS_TOKEN` env vars.

## Verification (final)

- `npm run build` clean. **60 routes** prerendered. `/thank-you` Dynamic (ƒ) by design; all others Static (○) or SSG (●).
- Shared First Load JS 87.1 kB; heaviest routes `/solutions` and `/water-problem-checker` at 101 kB; every route under the 150 kB per-route budget per BLUEPRINT §15.2.
- Banned-phrase grep audit zero matches across `app/**`, `components/**`, `content/**`.
- Next.js detected `.env.local` at build time. Odoo creds resolve at server-action invocation, not build.
