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
 * If RESEND_API_KEY is not set, this function is a no-op. That lets the
 * form pipeline run in local dev without an email account configured.
 *
 * Failures are swallowed (logged only) so a Resend hiccup never blocks the
 * redirect to /thank-you. The lead is already in Odoo by then anyway.
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

export async function sendLeadNotification(input: {
  formLabel: string;
  subject: string;
  fields: LeadFields;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Skip silently in environments without email configured.
    return;
  }

  const from = process.env.RESEND_FROM ?? 'Uniwater Leads <onboarding@resend.dev>';
  const toRaw = process.env.LEAD_NOTIFY_TO ?? 'buzz.uniwater@gmail.com';
  const to = toRaw.split(',').map((s) => s.trim()).filter(Boolean);

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: input.subject,
        html: renderHtml(input.formLabel, input.fields),
        text: renderText(input.formLabel, input.fields),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(`[email] Resend ${res.status}: ${body.slice(0, 300)}`);
    }
  } catch (err) {
    console.error('[email] Resend request failed:', err);
  }
}
