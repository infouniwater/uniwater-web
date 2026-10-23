import { NextResponse } from 'next/server';
import { checkCrm } from '@/lib/crm';

/**
 * Lead-pipeline health check, polled daily by
 * .github/workflows/lead-health.yml. Calls the CRM's intake health endpoint
 * with WEB_LEAD_TOKEN (no write), so a missing or rotated key, or a CRM
 * outage, is caught before a customer submits a form. Returns 503 on
 * failure, which fails the workflow and makes GitHub email the repo owner.
 * The response never includes credentials or the underlying error text.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await checkCrm();
    return NextResponse.json({ crm: 'ok' });
  } catch (err) {
    console.error('[health] CRM check failed:', err);
    return NextResponse.json({ crm: 'failing' }, { status: 503 });
  }
}
