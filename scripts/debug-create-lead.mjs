// One-off diagnostic: load .env.local, then call createLead() with a test payload.
// Run with: node scripts/debug-create-lead.mjs
// Prints the new lead ID on success, or the actual exception on failure.

import { readFileSync } from 'node:fs';

const envPath = new URL('../.env.local', import.meta.url);
const envText = readFileSync(envPath, 'utf8');
for (const line of envText.split('\n')) {
  const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
  if (m && !line.trimStart().startsWith('#')) {
    process.env[m[1]] = m[2];
  }
}

async function jsonRpc(service, method, args) {
  const url = process.env.ODOO_URL.replace(/\/$/, '') + '/jsonrpc';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params: { service, method, args } }),
  });
  if (!res.ok) throw new Error(`Odoo HTTP ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(`Odoo: ${data.error.data?.message || data.error.message}`);
  return data.result;
}

const uid = await jsonRpc('common', 'authenticate', [
  process.env.ODOO_DB,
  process.env.ODOO_USERNAME,
  process.env.ODOO_API_KEY,
  {},
]);
console.log('Authenticated. uid =', uid);

const leadId = await jsonRpc('object', 'execute_kw', [
  process.env.ODOO_DB,
  uid,
  process.env.ODOO_API_KEY,
  'crm.lead',
  'create',
  [{
    name: 'DEBUG — Book Survey test ' + new Date().toISOString(),
    type: 'lead',
    contact_name: 'Debug Tester',
    email_from: 'debug@example.com',
    phone: '+91 99999 00000',
    city: 'Kolkata',
    description: 'Triggered by scripts/debug-create-lead.mjs to reproduce the /book-survey error.',
  }],
]);
console.log('Lead created. id =', leadId);
