# UNIWATER — Marketing Site

Next.js 14 marketing site for [Uniwater](https://uniwater.co.in), built to the spec in `BLUEPRINT.md` and informed by `STRATEGY.md` + `STRATEGY-CRITIQUE.md`.

Current state: **Sprints 0, 1, 2, 4, 5, 6, 7 of the BLUEPRINT §16 roadmap landed.** See [CHANGELOG.md](./CHANGELOG.md) for the task-by-task record. Sprint 3 (customer dashboard) is explicitly **out of scope for this repo** — it lives as a separate product per the team's scope decision.

The marketing surface is shippable. Forms now submit to **Odoo CRM** via JSON-RPC (see `lib/odoo.ts` + `app/actions/leads.ts`); WhatsApp confirmations are handled by the separate **wa_agent** Fly app (Solutions Expert BSP), which polls Odoo for new leads — that integration lives outside this repo on purpose. 12 tier-1 blog posts plus the architect and plumber program pages are in. The 11 catalogue infographic assets are wired through the real `<Infographic>` renderer. Homepage hero + the five-place install grid use real install photography from the WhatsApp pack (interim until commissioned photography per BLUEPRINT §14.1 lands).

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

To verify the production build:

```bash
npm run build
# 59 routes prerender — all Static (○) or SSG (●), zero Dynamic.
# Shared First Load JS ~87 kB, heaviest route ~101 kB, well under the 150 kB cap.
```

## Vercel deploy

Google Fonts are now wired natively via `next/font/google` (Sprint 0.1). No five-line edit needed before deploy. The build needs network access to fetch the Signika / Bodoni Moda font files at build time, which Vercel provides by default. If the first deploy fails with `NextFontError`, retry once.

---

## Project structure

```
app/                     Next.js App Router pages
  layout.tsx             Root layout with header / footer
  page.tsx               Homepage (13 sections)
  globals.css            Tailwind base + design tokens as CSS vars
  sitemap.ts             Generated sitemap.xml
  robots.ts              Generated robots.txt
  not-found.tsx          Custom 404
  solutions/             Solutions hub + 8 detail pages
  residential/           Audience-deep page (light mode)
  industrial/            Audience-deep page (dark mode), per Blueprint §9
  how-it-works/          Long-form 4-step
  why-uniwater/          Brand story + decision-tree comparison
  about/                 Founder placeholder + clients + traction
  service/               Before/On site/After + tiered AMC
  book-survey/           Primary residential form
  water-problem-checker/ 4-step quiz with hardness band result
  remote-site-survey/    4-step form for out-of-network buyers
  case-studies/          Index + dynamic [slug] (Charnock fully rendered)
  cities/                Index + dynamic [slug] (Bangalore fully rendered)
  blog/                  Index + dynamic [slug] template
  testimonials/, faq/, resources/, contact/, privacy/, terms/

components/
  layout/                Header (mega-menu + mobile), Footer
  sections/              Homepage and reusable section organisms
  ui/                    Atoms + molecules (Button, Typography, Photo, etc.)

content/
  site.ts                Brand, contact, clients, cities, stats, operational truths
  solutions.ts           Solution taxonomy mapped to BathSoft / HomeSoft families
  industrial.ts          B2B system types, capacity bands, technical edge
  service.ts             Before/On site/After protocol; tiered AMC
  education.ts           Hardness bands, TDS tree, four-stage, five-places
  case-studies.ts        Case study seed data
  cities.ts              City content (Bangalore is full; others are stubs)

lib/
  cn.ts                  Lean classnames merger

tailwind.config.ts       Design tokens per BLUEPRINT §3.1–3.5
```

---

## Design system

Colour tokens (per Blueprint §3.1):

| Token | Hex | Use |
|---|---|---|
| `--brand-navy` | `#05455F` | Primary surfaces, headings, dark CTAs |
| `--brand-teal` | `#1B9BB4` | Links, accents, hover states |
| `--brand-soft` | `#87D0CD` | Decorative, water-flow motion |
| `--brand-tint` | `#D5EEF1` | Section backgrounds, final-CTA |
| `--off-white` | `#FAFAF7` | **Default page background — dominant** ≥60% |
| `--subtle` | `#F4F1ED` | Alternating section background |
| `--ink` | `#1F1F1F` | Body text |
| `--mute` | `#555555` | Secondary text, captions |
| `--hairline` | `#E5E1DA` | Borders — warm, never cool grey |

**Critical rule:** in any residential viewport, navy + teal combined ≤25% of pixels. Off-white dominant ≥60%. B2B pages (`/industrial`) invert this pattern — navy-dominant — by design (Hansgrohe Pro pattern).

Typography: **Signika** (300 → 700, primary) + **Bodoni Moda Italic** (editorial accent, used sparingly). Both exposed as CSS variables for non-Tailwind contexts.

Motion: 200ms default, calm cubic-bezier easing, `prefers-reduced-motion` respected globally. Hero ken-burns animation; staggered fade-up on grids; native `<details>` for FAQ accordions (zero JS).

---

## Wiring status

Completed across Sprints 0 / 1 / 2 / 4 / 5 / 6 / 7 — see [CHANGELOG.md](./CHANGELOG.md) for the full task-by-task record.

- [x] **`next/font/google`** wired for Signika + Bodoni Moda Italic (Sprint 0.1)
- [x] **301 redirects** in `next.config.js` for legacy slugs (Sprint 0.10)
- [x] **Floating WhatsApp button** on mobile, hidden on form/B2B routes (Sprint 0.9)
- [x] **Real install photography (partial)** — homepage hero + 5-place install grid use the WhatsApp pack (Sprint 0.2 + 0.3)
- [x] **Real `<Infographic>` renderer** with `<picture>` + landscape/portrait sources (Sprint 0.4). 11 catalogue assets wired
- [x] **Five page-level infographic embeds** — Day-One arc, HomeSoft 4-stage, TDS tree, hardness scale, plus the placeholder 9-city map call
- [x] **8 solution data-sheet PDFs** + 1 sample service report PDF, all hand-built via `scripts/build-data-sheets.py`
- [x] **AudienceRouter + AudiencePrefill** — specifier card routes to `/for-architects`, audience tag carried via hidden form input (Sprint 1.1, 6.C)
- [x] **Sticky CTA** on solution detail pages, mobile bottom bar + desktop right rail (Sprint 1.2)
- [x] **B2B off-ramp** in Header on `/industrial` linking to `/for-architects` and `/for-plumbers` (Sprint 1.3, 6.C)
- [x] **`/about`** with strengthened TODO markers for founder + client logos (Sprint 2.1)
- [x] **3 case studies** with full content — Charnock, Birat, Acasa (Sprint 2.2)
- [x] **3 cities** with full content — Bangalore, Kolkata, Bhubaneswar (Sprint 2.3) — followed by **the other 6** in Sprint 5.A (Ranchi, Rourkela, Siliguri, Guwahati, Kathmandu, Biratnagar). All 9 cities now `fullContent: true`.
- [x] **Water-problem-checker `recommend()`** rewritten exhaustively over source / symptoms / property / city (Sprint 4.1)
- [x] **Remote-site-survey upload UI** softened to honest email-based submission (Sprint 4.2)
- [x] **Typed blog content layer** at `content/blog.ts` + 12 tier-1 posts SSG'd via `generateStaticParams` (Sprint 5.B + 5.C)
- [x] **`/for-architects` + `/for-plumbers`** public landing pages with lead capture via `/contact?audience=…` (Sprint 6.A + 6.B)
- [x] **Global `loading.tsx`** (thin teal progress line, reduced-motion-safe) and **global `error.tsx`** (client-component error boundary with reset) (Sprint 7.A + 7.B)
- [x] **OG / meta audit** — all 33 page-level routes carry page-specific title + description; client-component pages use sibling `layout.tsx` to own metadata (Sprint 7.C)
- [x] **Banned-phrase grep** — zero matches across `app/**`, `components/**`, `content/**`

Still pending — these need accounts, credentials, real assets, or business decisions that are not engineering work in this repo:

- [x] **Form submissions → CRM** — wired to **Odoo SaaS** (`uniwater-solutions.odoo.com`). Creds in `.env.local`; set the four `ODOO_*` env vars in Vercel before deploy.
- [ ] **WhatsApp confirmation flow** — uses **Solutions Expert** BSP (`solutionexpert.online`) via the separate **wa_agent** Fly app, not this repo. wa_agent polls Odoo for new leads and fires the WhatsApp confirmation. To validate end-to-end after deploy: submit a form, watch the lead land in Odoo, watch wa_agent's webhook trigger the WhatsApp send.
- [ ] **File upload backing** for `/remote-site-survey` (Vercel Blob or Supabase). Currently soft-routes to email per the step-2 instructions.
- [ ] **Commissioned hero photo** per BLUEPRINT §14.1 #1 — the hand-under-tap shot replacing the interim install photo
- [ ] **Real founder note + photo** for `/about` — the team supplies the interview + portrait
- [ ] **Real client logos** at `public/images/clients/` — currently a text fallback per BLUEPRINT §15.3
- [ ] **9-city map SVG** per BLUEPRINT §14.3 #1 (commissioned art)
- [ ] **Sanity CMS** for blog / cities / testimonials — content team adopts when ready; current TS content is the swap-source.
- [ ] **Social icons** in footer (URLs + svgs from brand team)
- [ ] **Lighthouse-CI in pipeline** (Sprint 7 polish — needs CI tokens)
- [ ] **Sentry / PostHog** wiring — needs accounts
- [ ] **Customer portal** (out of scope for this repo per scope decision — separate product)
- [ ] **`/partner/dashboard` (authenticated portal)** for the architect + plumber programs — Postgres + NextAuth + business decisions on points/rewards

---

## Deployment

**Recommended:** Vercel.

```bash
# From the project root
npx vercel
# Follow prompts; select Next.js framework
```

For preview deploys, `vercel` (preview). For production, `vercel --prod`.

**Performance budget** (Blueprint §15):

- Lighthouse Performance ≥ 90 (mobile)
- LCP < 2.5s
- CLS < 0.1
- Bundle size: First Load JS shared ~87 kB (achieved)

Lighthouse-CI in pipeline before launch (Sprint 7).

---

## Routes (59 total)

Static (`○`) and SSG (`●`) prerender. Zero Dynamic routes — `/blog/[slug]` flipped from ƒ to ● in Sprint 5.B once the typed posts gained `generateStaticParams`.

```
/                                       Editorial home (13 sections)
/solutions                              Hub (For-your-home / For-institutions tabs)
/solutions/{8 slugs}                    Detail template ×8
/residential                            Light-mode audience-deep
/industrial                             Dark-mode B2B page (Blueprint §9)
/how-it-works                           4-step longform
/why-uniwater                           Decision-tree comparison
/about                                  Founder + clients + traction
/service                                Before/On site/After + AMC tiers
/book-survey                            Residential form
/water-problem-checker                  4-step quiz (client-side state)
/remote-site-survey                     4-step out-of-network form
/case-studies                           Index
/case-studies/charnock-hospital         Full template (other slugs are 404)
/cities                                 Index
/cities/{9 slugs}                       City detail (Bangalore full, others stub)
/blog                                   Empty-state index with roadmap
/blog/[slug]                            Article template
/testimonials                           Placeholder reviews (Sprint 5 wires real)
/faq                                    Five-category accordion
/resources                              Hub linking tools, blog, FAQ
/contact                                Two phones, two emails, form
/privacy                                Placeholder policy
/terms                                  Placeholder terms
/sitemap.xml                            Generated
/robots.txt                             Generated
```

---

## Source-of-truth precedence

When refining content or design decisions, the precedence order in the briefs is:

1. **BLUEPRINT.md** — single source of truth for what gets built
2. **v1 redesign brief** — IA, nav, design tokens, page structure
3. **2026 catalogues** (Homeowner + Commercial) — voice, message, hardness bands, BathSoft/HomeSoft naming
4. **Master catalog + Company Profile + Brand Guideline** — facts, specs, named clients, mission
5. **v2 website brief** — opinions only, not mandatory

Where v1 conflicts with v2, v1 wins.

---

## Verbal discipline

Per Blueprint §12, three things to maintain across content updates:

**Approved phrases** (used verbatim, not paraphrased):
- "Wellness starts with clean water." (tagline)
- "Surveyed, engineered, installed, and serviced for the homes you don't get to redo." (hero supporting line)
- "Engineered, not bought off a shelf."
- "Hidden, not displayed."
- "Serviced monthly, not on complaint."
- "The discipline that decides year four."

**Banned phrases** (do not introduce, ever):
- "Best in class", "Industry-leading", "World-class"
- "Cutting-edge", "Revolutionary", "Game-changing"
- "Unleash", "Empower"
- Any sentence with three adjectives
- Any sentence with an exclamation mark

**CTA verb discipline:**
- Residential → "Book a free survey" (+ "Take the water-problem checker")
- Industrial → "Submit RFQ" (+ "Talk to an engineer")
- Channel / specifier → "Join the program" (+ "Download spec pack")
- Investor / press → no CTA (read-only)

Never share a form across audiences.

---

## License

Proprietary. © Uniwater Solutions Pvt Ltd.
