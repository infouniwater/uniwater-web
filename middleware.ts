import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

/**
 * Edge middleware — runs on every request before it hits a route handler.
 *
 * Currently does two things:
 *
 *  1. Emits a per-route canonical via the HTTP `Link: <…>; rel="canonical"`
 *     header. Google reads this and uses it for canonical-URL resolution
 *     identically to a `<link rel="canonical">` element in the page head.
 *     Doing it here means every route gets the correct canonical without
 *     touching each page's `generateMetadata` — and avoids the trap where
 *     a static `alternates.canonical: '/'` in the root layout makes every
 *     child route claim to be a duplicate of the home page.
 *
 *  2. Exposes the request pathname to server components via an
 *     `x-pathname` header. Any server component can read
 *     `headers().get('x-pathname')` for the current URL path — useful if we
 *     ever need to render a canonical `<link>` in the head as well.
 *
 * The matcher excludes Next internals, asset files, and the API route
 * patterns so we don't add a header to image, font, or static-asset
 * responses.
 */

const SITE_ORIGIN = 'https://uniwater.co.in';

/**
 * AI assistants' fetchers. GPTBot / ClaudeBot / PerplexityBot crawl for
 * training and indexing; OAI-SearchBot builds ChatGPT's search index; the
 * "-User" agents fetch a page live because a person just asked a question
 * the assistant is answering with it. That last group is the nearest thing
 * to "which pages does ChatGPT read out to customers".
 */
const AI_AGENTS =
  /GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-User|Claude-SearchBot|PerplexityBot|Perplexity-User/i;

/**
 * Appends one row per AI fetch to the 'ai-crawlers' tab of the leads Sheet
 * (same Apps Script as lib/sheets.ts). Vercel keeps request logs for
 * minutes, so without this there is no record of what the assistants read.
 * Runs after the response is sent and never throws.
 */
async function logAiFetch(agent: string, path: string, userAgent: string): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        tab: 'ai-crawlers',
        timestamp: new Date().toISOString(),
        fields: { Agent: agent, Path: path, 'User agent': userAgent.slice(0, 300) },
      }),
    });
  } catch {
    /* a missed log row must never affect the page */
  }
}

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname, searchParams } = req.nextUrl;
  const res = NextResponse.next();

  const userAgent = req.headers.get('user-agent') ?? '';
  const aiAgent = userAgent.match(AI_AGENTS)?.[0];
  if (aiAgent && process.env.VERCEL_ENV === 'production') {
    event.waitUntil(logAiFetch(aiAgent, pathname, userAgent));
  }

  // Canonical URL — strip query params, trailing slash (except root).
  let canonicalPath = pathname || '/';
  if (canonicalPath !== '/' && canonicalPath.endsWith('/')) {
    canonicalPath = canonicalPath.slice(0, -1);
  }
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
  res.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);

  // Make pathname available to server components if they want to render
  // the canonical in the head as a redundant signal.
  res.headers.set('x-pathname', pathname);

  // Mark search-parameter responses as noindex — query strings on marketing
  // routes are usually tracking parameters (UTM, audience, problem) and
  // shouldn't generate separate index entries.
  if ([...searchParams.keys()].some((k) => !['source'].includes(k))) {
    res.headers.set('X-Robots-Tag', 'noindex, follow');
  }

  return res;
}

export const config = {
  matcher: [
    // Run on all routes EXCEPT:
    //   - Next internals (_next/...)
    //   - public asset extensions (.png, .svg, .jpg, .ico, .webp, .avif, .pdf, .xml, .txt)
    //   - the api route prefix if we add one later
    '/((?!_next|api|.*\\.(?:png|svg|jpg|jpeg|webp|avif|ico|pdf|xml|txt|gif|woff2?)$).*)',
  ],
};
