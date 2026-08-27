import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption, EditorialAccent } from '@/components/ui/Typography';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { BLOG_POSTS, formatPostDate, getPostBySlug } from '@/content/blog';
import { getSolutionForBlog } from '@/content/cross-links';
import { articleSchema, breadcrumbSchema, jsonLd } from '@/lib/structured-data';
import { featureImageFor } from '@/lib/blog-images';
import { buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

// Per-post OG image overrides — only set where a dedicated SVG-008 card
// exists (rasterised to PNG for social-scraper compatibility).
const BLOG_OG_OVERRIDES: Record<string, string> = {
  'borewell-water-yellow': '/og/og-blog-iron.png',
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Journal' };
  return buildMetadata({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    // Per-post override wins; otherwise fall through to the dedicated
    // /og/og-blog.jpg journal card built 2026-06-05 (was og-home.png).
    image: BLOG_OG_OVERRIDES[post.slug] ?? '/og/og-blog.jpg',
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            articleSchema(post),
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Journal', url: '/blog' },
              { name: post.title, url: `/blog/${post.slug}` },
            ]),
          ]),
        }}
      />
      <div className="bg-offwhite border-b border-hairline">
        <div className="container-uw pt-4 pb-3 max-w-4xl">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Journal', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>
      </div>

      {/* Hero — image-with-scrim editorial register. */}
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[460px] md:h-[560px] lg:h-[calc(100vh-220px)] lg:min-h-[500px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/under-counter-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/under-counter-tablet.jpg" />
          <img src="/images/hero/under-counter-mobile.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.95) 0%, rgba(4,69,95,0.78) 40%, rgba(4,69,95,0.30) 80%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.92) 0%, rgba(4,69,95,0.72) 45%, rgba(4,69,95,0.25) 75%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center max-w-4xl">
          <div className="w-full pb-10 lg:pb-0 flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline gap-2 text-offwhite/70">
              <span className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">{post.category}</span>
              <span className="text-offwhite/40">&middot;</span>
              <span className="text-caption">{formatPostDate(post.publishedAt)}</span>
              <span className="text-offwhite/40">&middot;</span>
              <span className="text-caption">{post.readingMinutes} min read</span>
            </div>
            <h1 className="font-sans text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.1] max-w-[24ch] [text-wrap:balance]">
              {post.title}
            </h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">{post.lede}</p>
          </div>
        </div>
      </section>

      <Section padding="tight">
        <figure className="max-w-4xl mx-auto">
          <div className="relative w-full overflow-hidden border border-hairline" style={{ aspectRatio: '16 / 9' }}>
            {(() => {
              const feature = featureImageFor(post.slug);
              return (
                <Image
                  src={feature.src}
                  alt={feature.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="object-cover"
                />
              );
            })()}
          </div>
        </figure>
      </Section>

      <Section padding="default">
        <article className="max-w-reading mx-auto flex flex-col gap-6">
          {post.body.map((block, i) => {
            if (block.type === 'p') {
              return (
                <Body key={i} className="text-mute">
                  {block.text}
                </Body>
              );
            }
            if (block.type === 'h2') {
              return (
                <Heading key={i} level={2} className="mt-6">
                  {block.text}
                </Heading>
              );
            }
            if (block.type === 'pullquote') {
              return (
                <EditorialAccent key={i} className="my-6">
                  {block.text}
                </EditorialAccent>
              );
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className="flex flex-col gap-2 list-none pl-0">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-body text-mute flex gap-3">
                      <span className="text-teal flex-shrink-0">&mdash;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </article>
      </Section>

      {/* "Preferred Sources" opt-in (Google, launched Aug 2026) — lets a
          reader who found this useful flag uniwater.co.in as a source they
          want to see more of in Top Stories / Discover / AI Overviews.
          Deeplink per Google's own spec (no script, no CSP change needed):
          https://developers.google.com/search/docs/appearance/preferred-sources
          Eligibility is domain-level, so this links the whole site, not
          just this post. */}
      <Section padding="tight">
        <div className="max-w-reading mx-auto flex items-center justify-between gap-4 flex-wrap">
          <Caption className="text-mute">Found this useful?</Caption>
          <a
            href="https://www.google.com/preferences/source?q=uniwater.co.in"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-teal text-caption font-medium whitespace-nowrap hover:text-navy transition-colors duration-200 ease-calm"
          >
            <span>Add Uniwater as a preferred source on Google</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </Section>

      {/* Blog → relevant solution bridge. Skips silently for posts with no clean mapping. */}
      {(() => {
        const target = getSolutionForBlog(post.slug);
        if (!target) return null;
        return (
          <Section padding="tight">
            <div className="max-w-reading mx-auto border border-hairline bg-offwhite p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <div className="text-eyebrow font-medium uppercase text-teal mb-3">
                  The system this article describes
                </div>
                <h3 className="font-sans text-h3 font-semibold text-navy mb-2">{target.navLabel}</h3>
                <Caption className="text-mute">{target.shortHeadline}</Caption>
              </div>
              <Link
                href={`/solutions/${target.slug}`}
                className="inline-flex items-center gap-2 text-teal text-caption font-medium whitespace-nowrap"
              >
                <span>See the solution</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </Section>
        );
      })()}

      {/* Pillar bridge -- the two iron-relevant journal posts get an
          inbound link to /kolkata-iron-water. The pillar is the long-form
          Kolkata-specific deep dive that subsumes both posts; from the
          reader's perspective, this is the natural next step after the
          short journal piece. */}
      {(post.slug === 'borewell-water-yellow' || post.slug === 'iron-hardness-order' || post.slug === 'best-water-treatment-company-kolkata') && (
        <Section padding="tight">
          <div className="max-w-reading mx-auto border border-teal/30 bg-tint/30 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <div className="text-eyebrow font-medium uppercase text-teal mb-3">
                Pillar guide
              </div>
              <h3 className="font-sans text-h3 font-semibold text-navy mb-2">
                Iron in Kolkata water — stains, causes, and removal.
              </h3>
              <Caption className="text-mute">
                Locality table, three-stage removal explainer, and the iron-vs-softener FAQs in one place.
              </Caption>
            </div>
            <Link
              href="/kolkata-iron-water"
              className="inline-flex items-center gap-2 text-teal text-caption font-medium whitespace-nowrap"
            >
              <span>Read the pillar</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Section>
      )}

      <FinalCTA />
    </>
  );
}
