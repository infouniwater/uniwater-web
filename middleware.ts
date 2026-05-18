import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const res = NextResponse.next();

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
