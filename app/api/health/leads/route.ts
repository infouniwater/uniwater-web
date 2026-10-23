import { NextResponse } from 'next/server';
import { checkOdooAuth } from '@/lib/odoo';

/**
 * Lead-pipeline health check, polled daily by
 * .github/workflows/lead-health.yml. Authenticates against Odoo (no write)
 * so an expired or revoked API key is caught before a customer submits a
 * form. Returns 503 on failure, which fails the workflow and makes GitHub
 * email the repo owner. The response never includes credentials or the
 * underlying error text.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await checkOdooAuth();
    return NextResponse.json({ odoo: 'ok' });
  } catch (err) {
    console.error('[health] Odoo check failed:', err);
    return NextResponse.json({ odoo: 'failing' }, { status: 503 });
  }
}
