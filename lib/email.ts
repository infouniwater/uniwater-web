/**
 * Resend transactional email — lead notifications to buzz.uniwater@gmail.com.
 *
 * Env vars:
 *   RESEND_API_KEY   — secret API key from resend.com (re_xxx...)
 *   RESEND_FROM      — verified sender, e.g. "Uniwater Leads <leads@uniwater.co.in>"
 *                      until the domain is verified, use the Resend sandbox
 *                      sender: "onboarding@resend.dev"
 *   LEAD_NOTIFY_TO   — recipient(s), comma-separated. Defaults to
 *                      buzz.uniwater@gmail.com if unset.
 *
 * Email is one of the three places a lead is saved (with Odoo and the
 * Sheet — see app/actions/leads.ts), so sendLeadNotification THROWS on any
 * failure, including RESEND_API_KEY being unset. The caller decides whether
 * the lead still landed somewhere else and alerts on the failure.
 *
 * sendAlertEmail is the failure-alert channel: it never throws, because an
 * alert that cannot be delivered must not affect the visitor.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export interface LeadFields {
  [key: string]: string | undefined;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderHtml(formLabel: string, fields: LeadFields): string {
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:8px 14px 8px 0;color:#6b6b6b;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td>
          <td style="padding:8px 0;color:#1a1a1a;font-size:14px;">${escapeHtml(String(v))}</td>
        </tr>`,
    )
    .join('');

  return `
<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e3;padding:32px;">
    <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#0d7c79;font-weight:500;">New lead</div>
    <h1 style="margin:8px 0 24px;font-size:22px;font-weight:600;color:#0f2540;">${escapeHtml(formLabel)}</h1>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e5e3;font-size:12px;color:#9a9a9a;">
      uniwater.co.in &middot; auto-generated from form submission
    </div>
  </div>
</body></html>`.trim();
}

function renderText(formLabel: string, fields: LeadFields): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${v}`);
  return `New lead — ${formLabel}\n\n${lines.join('\n')}\n\n--\nuniwater.co.in`;
}

const TIMEOUT_MS = 7000;

async function sendViaResend(input: { subject: string; html: string; text: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Email: RESEND_API_KEY is not set');
  }

  const from = process.env.RESEND_FROM ?? 'Uniwater Leads <onboarding@resend.dev>';
  const toRaw = process.env.LEAD_NOTIFY_TO ?? 'buzz.uniwater@gmail.com';
  const to = toRaw.split(',').map((s) => s.trim()).filter(Boolean);

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({ from, to, subject: input.subject, html: input.html, text: input.text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Email: Resend HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
}

export async function sendLeadNotification(input: {
  formLabel: string;
  subject: string;
  fields: LeadFields;
}): Promise<void> {
  await sendViaResend({
    subject: input.subject,
    html: renderHtml(input.formLabel, input.fields),
    text: renderText(input.formLabel, input.fields),
  });
}

/**
 * Same-day alert when part of the lead pipeline fails. Includes the lead's
 * details so the team can call the customer straight from the alert.
 */
export async function sendAlertEmail(input: {
  subject: string;
  fields: LeadFields;
}): Promise<void> {
  try {
    await sendViaResend({
      subject: input.subject,
      html: renderHtml('Website form problem', input.fields),
      text: renderText('Website form problem', input.fields),
    });
  } catch (err) {
    console.error('[alert] could not send alert email:', err);
  }
}
