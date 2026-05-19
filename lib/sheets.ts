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
 * If GOOGLE_SHEETS_WEBAPP_URL is not set, the function is a no-op so local
 * dev works without configuration. Errors are logged, never thrown — a
 * Sheets outage must not block /thank-you.
 */

import type { LeadFields } from './email';

export async function appendLeadToSheet(input: {
  tab: string;
  fields: LeadFields;
}): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!url) {
    return;
  }

  const cleanFields: Record<string, string> = {};
  for (const [k, v] of Object.entries(input.fields)) {
    if (v !== undefined && v !== '') cleanFields[k] = String(v);
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        tab: input.tab,
        timestamp: new Date().toISOString(),
        fields: cleanFields,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(`[sheets] Apps Script ${res.status}: ${body.slice(0, 300)}`);
    }
  } catch (err) {
    console.error('[sheets] Apps Script request failed:', err);
  }
}
