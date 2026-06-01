import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow, Display, Heading, Lede, Body, Caption } from '@/components/ui/Typography';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { BLOG_POSTS, formatPostDate } from '@/content/blog';
import { featureImageFor } from '@/lib/blog-images';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Long-form writing on water chemistry, premium home engineering, and the practice of running a water system over the long term.',
};

export default function JournalIndex() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <section className="relative w-full bg-navy text-offwhite overflow-hidden h-[420px] md:h-[500px] lg:h-[calc(100vh-240px)] lg:min-h-[440px] border-b border-offwhite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/under-counter-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/hero/under-counter-tablet.jpg" />
          <img src="/images/hero/under-counter-mobile.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
        </picture>
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(4,69,95,0.85) 0%, rgba(4,69,95,0.55) 35%, rgba(4,69,95,0.0) 65%)' }} aria-hidden="true" />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(4,69,95,0.85) 0%, rgba(4,69,95,0.55) 35%, rgba(4,69,95,0.0) 60%)' }} aria-hidden="true" />
        <div className="relative h-full container-uw flex items-end lg:items-center">
          <div className="w-full lg:max-w-[760px] pb-10 lg:pb-0 flex flex-col gap-5">
            <p className="text-eyebrow font-ui font-medium uppercase tracking-[0.18em] text-soft">Journal</p>
            <h1 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-medium leading-[1.15] max-w-[22ch] [text-wrap:balance]">The writing.</h1>
            <p className="text-[15px] leading-relaxed text-offwhite/80 max-w-xl">
              Long-form notes on water chemistry, premium home engineering, and the practice of running a water system over the long term. Twelve tier-1 articles to start; editorial expansion runs in parallel with the build-out.
            </p>
          </div>
        </div>
      </section>

      <Section padding="default">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post) => {
            const feature = featureImageFor(post.slug);
            return (
            <article key={post.slug} className="flex flex-col gap-4">
              <Link
                href={`/blog/${post.slug}`}
                className="relative w-full overflow-hidden border border-hairline group"
                style={{ aspectRatio: '16 / 10' }}
              >
                <Image
                  src={feature.src}
                  alt={feature.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 ease-calm group-hover:scale-[1.02]"
                />
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-eyebrow font-medium uppercase text-teal">{post.category}</span>
                <span className="text-mute">&middot;</span>
                <Caption className="text-mute">{formatPostDate(post.publishedAt)}</Caption>
                <span className="text-mute">&middot;</span>
                <Caption className="text-mute">{post.readingMinutes} min read</Caption>
              </div>
              <Heading level={3} className="leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-navy hover:text-teal transition-colors duration-200 ease-calm"
                >
                  {post.title}
                </Link>
              </Heading>
              <Body className="text-mute">{post.description}</Body>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 inline-flex items-center gap-2 text-teal text-caption font-medium"
              >
                <span>Read</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </article>
            );
          })}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
