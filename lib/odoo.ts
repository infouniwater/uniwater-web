/**
 * Tiny Odoo JSON-RPC client. No external dependency — uses native fetch.
 *
 * Reads credentials from environment:
 *   ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY
 *
 * Cache: the authenticated uid is cached at module level so subsequent
 * calls within a single warm function instance skip the auth round-trip.
 * Cold starts pay one extra auth call (~150ms).
 *
 * See c:/Users/user/uniwater-web/CREDENTIALS.txt for the live API key as of
 * 2026-05-11; that file is gitignored and does not ship with the repo.
 */

type JsonRpcArgs = unknown[];

interface JsonRpcResponse<T> {
  jsonrpc: '2.0';
  id?: number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: { name?: string; debug?: string; message?: string };
  };
}

function env(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `Missing required env var ${name}. Set it in .env.local for local dev or in the Vercel project env for production.`,
    );
  }
  return v;
}

async function jsonRpc<T>(service: string, method: string, args: JsonRpcArgs): Promise<T> {
  const url = env('ODOO_URL').replace(/\/$/, '') + '/jsonrpc';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    // A slow Odoo must not hang the form; the lead is also written to the
    // Sheet and email in parallel (app/actions/leads.ts).
    signal: AbortSignal.timeout(7000),
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: { service, method, args },
    }),
  });
  if (!res.ok) {
    throw new Error(`Odoo HTTP ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as JsonRpcResponse<T>;
  if (data.error) {
    const msg = data.error.data?.message || data.error.message || 'Unknown Odoo error';
    throw new Error(`Odoo: ${msg}`);
  }
  if (data.result === undefined) {
    throw new Error('Odoo: empty result');
  }
  return data.result;
}

let cachedUid: number | null = null;

async function authenticate(): Promise<number> {
  if (cachedUid !== null) return cachedUid;
  cachedUid = await authenticateFresh();
  return cachedUid;
}

async function authenticateFresh(): Promise<number> {
  const uid = await jsonRpc<number | false>('common', 'authenticate', [
    env('ODOO_DB'),
    env('ODOO_USERNAME'),
    env('ODOO_API_KEY'),
    {},
  ]);
  if (!uid || typeof uid !== 'number') {
    throw new Error(
      'Odoo authentication failed. The API key has most likely expired or been revoked — generate a new one in Odoo (Preferences → Account Security → New API Key) and update ODOO_API_KEY in Vercel.',
    );
  }
  return uid;
}

/**
 * Health check for app/api/health/leads: authenticates without the uid
 * cache, so an expired or revoked API key is caught even on a warm
 * instance. Throws on failure.
 */
export async function checkOdooAuth(): Promise<void> {
  await authenticateFresh();
}

/**
 * Create a CRM lead in Odoo. Returns the new lead's id.
 *
 * Field mapping follows Odoo's `crm.lead` model. Fields not used here
 * (source_id, medium_id, campaign_id, tag_ids, user_id, team_id) can be
 * added later if attribution / routing rules need them.
 */
export async function createLead(input: {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  city?: string;
  description?: string;
}): Promise<number> {
  const uid = await authenticate();

  const fields: Record<string, unknown> = {
    name: input.name,
    type: 'lead',
  };
  if (input.contactName) fields.contact_name = input.contactName;
  if (input.email) fields.email_from = input.email;
  if (input.phone) fields.phone = input.phone;
  if (input.city) fields.city = input.city;
  if (input.description) fields.description = input.description;

  const id = await jsonRpc<number>('object', 'execute_kw', [
    env('ODOO_DB'),
    uid,
    env('ODOO_API_KEY'),
    'crm.lead',
    'create',
    [fields],
  ]);
  return id;
}
