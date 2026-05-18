'use client';

import { useSearchParams } from 'next/navigation';

/**
 * Reads the `audience` query param (e.g. /contact?audience=specifier) and emits
 * a hidden form input so the value rides along on submit. Used by the
 * AudienceRouter "architect / plumber" card per BLUEPRINT §4.1 + Sprint 1.1
 * until /for-architects and /for-plumbers ship in Sprint 6.
 *
 * Wrap in <Suspense> at the call site — useSearchParams forces dynamic
 * rendering otherwise.
 */
export function AudiencePrefill() {
  const params = useSearchParams();
  const audience = params.get('audience');
  if (!audience) return null;
  return <input type="hidden" name="audience" value={audience} />;
}
