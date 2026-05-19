# Leads pipeline — Resend email + Google Sheets

Every form submission on uniwater.co.in fans out to three places, in parallel:

1. **Odoo CRM** — `crm.lead` record (system of record, primary)
2. **Email** — notification to `LEAD_NOTIFY_TO` via Resend
3. **Google Sheet** — one tab per form via an Apps Script web app

Odoo is awaited first. Email and Sheets writes run in `Promise.allSettled`, so a transient failure in either can't block the lead landing in Odoo or the visitor reaching `/thank-you`. Failures log to the Vercel function logs.

This document is the setup runbook for the two non-Odoo sinks.

---

## 1. Resend (email notifications)

### One-time signup

1. Go to https://resend.com and sign up with `info.uniwater@gmail.com`.
2. Free tier ceiling is 100 emails/day, 3000/month — plenty for lead notifications.
3. Create an API key: **API Keys → Create API Key**. Copy it (`re_xxx...`).

### Domain verification (do this within the first week)

Until the domain is verified, Resend will only let you send from the sandbox address `onboarding@resend.dev`. That works, but it lands more often in spam.

1. **Domains → Add Domain → `uniwater.co.in`**
2. Resend gives you three DNS records (SPF, DKIM, DMARC). Add them in your domain registrar's DNS panel.
3. Wait ~10 minutes, then click **Verify**.
4. Once verified, update `RESEND_FROM` in Vercel to `UNIWATER Leads <leads@uniwater.co.in>`.

### Local .env.local

```
RESEND_API_KEY=re_your_actual_key_here
RESEND_FROM=UNIWATER Leads <onboarding@resend.dev>
LEAD_NOTIFY_TO=buzz.uniwater@gmail.com
```

### Vercel env vars

In the Vercel dashboard → **Settings → Environment Variables**, add the same three keys to **Production, Preview, Development**.

### What the email looks like

The subject is form-specific (e.g. "New survey request — Ananya Roy (Salt Lake)"). Body is a clean two-column table of all submitted fields. Plain-text fallback included.

### Multiple recipients

`LEAD_NOTIFY_TO` accepts a comma-separated list:

```
LEAD_NOTIFY_TO=buzz.uniwater@gmail.com, sales@uniwater.co.in
```

---

## 2. Google Sheets (audit trail / backup)

### Step 1 — Create the sheet

1. Create a new Google Sheet in the `info.uniwater@gmail.com` Drive.
2. Name it something like **UNIWATER — Marketing site leads**.
3. Leave Sheet1 empty for now. Tabs will be created automatically by the script (one per form: `book-survey`, `contact`, `industrial-rfq`, `water-test`, `remote-site-survey`).

### Step 2 — Paste the Apps Script

1. From the sheet, open **Extensions → Apps Script**.
2. Replace the placeholder `Code.gs` with the script below.
3. Click **Save** (disk icon).

```javascript
/**
 * UNIWATER — lead intake webhook.
 *
 * Expects POST JSON of the shape:
 *   { tab: "book-survey", timestamp: "ISO-8601", fields: { ... } }
 *
 * Behavior:
 *   - Creates the tab if it doesn't exist.
 *   - Writes header row on first hit (Timestamp first, then field names).
 *   - On subsequent hits, maps fields to existing header columns.
 *   - If a submission has a new field not yet in headers, appends a new column.
 *
 * Header row stays stable for the life of the tab — never reordered.
 */
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var tabName = String(payload.tab || 'unknown');
    var fields = payload.fields || {};
    var timestamp = payload.timestamp || new Date().toISOString();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }

    var lastCol = sheet.getLastColumn();
    var headers = lastCol > 0
      ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String)
      : [];

    if (headers.length === 0) {
      headers = ['Timestamp'].concat(Object.keys(fields));
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    } else {
      var newKeys = Object.keys(fields).filter(function (k) {
        return headers.indexOf(k) === -1;
      });
      if (newKeys.length > 0) {
        var startCol = headers.length + 1;
        sheet.getRange(1, startCol, 1, newKeys.length).setValues([newKeys]);
        sheet.getRange(1, startCol, 1, newKeys.length).setFontWeight('bold');
        headers = headers.concat(newKeys);
      }
    }

    var row = headers.map(function (h) {
      if (h === 'Timestamp') return timestamp;
      return fields[h] !== undefined ? fields[h] : '';
    });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('UNIWATER lead webhook — POST only.');
}
```

### Step 3 — Deploy as web app

1. **Deploy → New deployment**.
2. Type: **Web app**.
3. Description: `UNIWATER lead intake v1`.
4. Execute as: **Me** (`info.uniwater@gmail.com`).
5. Who has access: **Anyone**.
   - This is intentional: the marketing site needs to POST without auth. Anyone with the URL can append rows, but they cannot read the sheet.
   - Treat the URL as a secret. Rotate by redeploying as a **New deployment** if it ever leaks (old URL stops working).
6. Click **Deploy**. The first time, Google asks you to authorize — accept the scopes (it needs Sheets read/write).
7. Copy the **Web app URL** (ends in `/exec`).

### Step 4 — Configure env

Paste the URL into both `.env.local` and Vercel:

```
GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycb.../exec
```

### Step 5 — Smoke test

```bash
curl -X POST $GOOGLE_SHEETS_WEBAPP_URL \
  -H "Content-Type: application/json" \
  -d '{"tab":"test","timestamp":"2026-05-19T10:00:00Z","fields":{"Name":"smoke test","Mobile":"9999999999"}}'
```

Open the sheet — a `test` tab should appear with a header row and one row. Delete the tab when done.

### Updating the script later

If you edit the Apps Script:
- **Deploy → Manage deployments → Edit (pencil)**
- Version: **New version**
- Click **Deploy**.

The URL stays the same. Do **not** click "New deployment" for edits — that creates a *new* URL and rotates the secret.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| No email arrives | `RESEND_API_KEY` not set in Vercel | Add it under Settings → Env Variables → Production |
| Email arrives but in spam | Using sandbox sender (`onboarding@resend.dev`) | Verify `uniwater.co.in` in Resend, switch `RESEND_FROM` |
| Resend 403 | API key revoked or for wrong account | Generate a new key |
| Sheet row not appearing | Web app URL wrong, or deployment is old | Redeploy from Apps Script, copy new URL |
| Sheet shows `Authorization required` HTML in logs | Deployment access set to "Only myself" | Change to "Anyone" and redeploy |
| New column shows up unexpectedly | Form code added a new field — works as designed | Add a header label in the sheet manually if you want it earlier in the column order; the script will keep writing to whichever column already has that header name |

## Disabling a sink

To temporarily stop a sink without removing the code, unset the env var:
- Email off: remove `RESEND_API_KEY` from Vercel
- Sheet off: remove `GOOGLE_SHEETS_WEBAPP_URL` from Vercel

Both modules are designed to no-op silently when their env var is missing. Odoo is the system of record and cannot be disabled this way (and shouldn't be).
