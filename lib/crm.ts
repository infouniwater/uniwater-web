/**
 * Uniwater CRM (crm.uniwater.in) — the system the team works leads in.
 *
 * Env vars:
 *   WEB_LEAD_TOKEN    — the CRM's WEB_LEAD_TOKEN. A key that can only hand
 *                       over a lead; never the CRM operator token.
 *   CRM_WEB_LEAD_URL  — optional override of the intake endpoint.
 *
 * POSTs to /intake/web-lead (wa_agent: app/services/web_lead_intake.py),
 * which puts a new number in New Leads in Pipeline as an UNCONFIRMED
 * website lead, appends the enquiry to a known contact's notes, and treats
 * a repeated lead_id as a duplicate (so a retry is safe).
 *
 * Until WEB_LEAD_TOKEN is set the CRM is skipped (isCrmConfigured() is
 * false) rather than failed, so the site can ship before the CRM does;
 * /api/health/leads reports it as failing meanwhile. Once configured, any
 * failure THROWS so app/actions/leads.ts can alert on it.
 */

const DEFAULT_URL = 'https://crm.uniwater.in/intake/web-lead';
const TIMEOUT_MS = 7000;

export interface CrmLead {
  leadId: string;
  form: string;
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  company?: string;
  /** Website property type (apartment, independent-house, …); the CRM maps it to a client type. */
  propertyType?: string;
  /** RFQ application (boiler-feed, …). */
  application?: string;
  /** Everything else the visitor told us, as one block of text. */
  message?: string;
  page?: string;
}

function endpoint(): string {
  return (process.env.CRM_WEB_LEAD_URL || DEFAULT_URL).replace(/\/$/, '');
}

export function isCrmConfigured(): boolean {
  return Boolean(process.env.WEB_LEAD_TOKEN);
}

export async function sendLeadToCrm(lead: CrmLead): Promise<void> {
  const token = process.env.WEB_LEAD_TOKEN;
  if (!token) throw new Error('CRM: WEB_LEAD_TOKEN is not set');

  const res = await fetch(endpoint(), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    cache: 'no-store',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({
      lead_id: lead.leadId,
      form: lead.form,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      city: lead.city,
      company: lead.company,
      property_type: lead.propertyType,
      application: lead.application,
      message: lead.message,
      page: lead.page,
    }),
  });
  const body = await res.text().catch(() => '');
  if (!res.ok) {
    throw new Error(`CRM: HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
  // The intake answers 200 with {"ok": false, "error": …} when it refuses a lead.
  if (!body.includes('"ok":true') && !body.includes('"ok": true')) {
    throw new Error(`CRM: lead not accepted: ${body.slice(0, 300)}`);
  }
}

/** For /api/health/leads: the key works and the CRM is up. Throws on failure. */
export async function checkCrm(): Promise<void> {
  const token = process.env.WEB_LEAD_TOKEN;
  if (!token) throw new Error('CRM: WEB_LEAD_TOKEN is not set');
  const res = await fetch(`${endpoint()}/health`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`CRM: health HTTP ${res.status}`);
}
