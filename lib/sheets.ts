/**
 * Google Sheets append via Apps Script Web App.
 *
 * Env var:
 *   GOOGLE_SHEETS_WEBAPP_URL — the /exec URL of a deployed Apps Script web app.
 *                              See docs/leads-pipeline-setup.md for the script
 *                              and deploy steps.
 *
 * Payload shape posted to the script:
 *   {
 *     tab: "book-survey" | "contact" | "industrial-rfq" | ...,
 *     timestamp: "2026-05-19T10:00:00.000Z",
 *     fields: { ... }                  // flat string map
 *   }
 *
 * The Apps Script writes header row on first hit per tab, then appends rows
 * matched by header name. New fields create new columns automatically.
 *
 * The Sheet is the backup copy of every lead (app/actions/leads.ts writes it
 * in parallel with Odoo), so this function THROWS on any failure — including
 * the env var being unset and the script answering HTTP 200 with
 * {"ok":false} — so the caller can tell whether the lead actually landed and
 * raise an alert when it did not.
 */

import type { LeadFields } from './email';

const TIMEOUT_MS = 7000;

export async function appendLeadToSheet(input: {
  tab: string;
  fields: LeadFields;
}): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!url) {
    throw new Error('Sheets: GOOGLE_SHEETS_WEBAPP_URL is not set');
  }

  const cleanFields: Record<string, string> = {};
  for (const [k, v] of Object.entries(input.fields)) {
    if (v !== undefined && v !== '') cleanFields[k] = String(v);
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({
      tab: input.tab,
      timestamp: new Date().toISOString(),
      fields: cleanFields,
    }),
  });
  const body = await res.text().catch(() => '');
  if (!res.ok) {
    throw new Error(`Sheets: Apps Script HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
  // The script reports its own errors as HTTP 200 + {"ok":false,"error":...}.
  if (!body.includes('"ok":true')) {
    throw new Error(`Sheets: Apps Script did not confirm the write: ${body.slice(0, 300)}`);
  }
}
