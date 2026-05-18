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
      <section className="bg-offwhite border-b border-hairline">
        <div className="container-uw py-16 md:py-24 max-w-4xl">
          <Eyebrow className="mb-4">Journal</Eyebrow>
          <Display>The writing.</Display>
          <Lede className="text-mute mt-6">
            Long-form notes on water chemistry, premium home engineering, and the practice of running a water system over the long term. Twelve tier-1 articles to start; editorial expansion runs in parallel with the build-out.
          </Lede>
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
