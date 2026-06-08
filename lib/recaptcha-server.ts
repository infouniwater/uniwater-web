/**
 * Server-side reCAPTCHA v3 verification.
 *
 * Used in app/actions/leads.ts (and ExitIntentCapture's server action) to
 * verify the token the browser submits with each form. v3 is score-based:
 * 0.0 = definitely a bot, 1.0 = definitely a human. We accept anything
 * above RECAPTCHA_MIN_SCORE (default 0.5).
 *
 * Behavior matrix:
 *   - secret key missing  -> success (fail-open). Lets the code ship
 *                            and run locally before the user adds the
 *                            env vars; once keys are set, gating
 *                            activates without further code changes.
 *   - token missing       -> failure (no recaptcha_token in FormData).
 *   - Google returns 500  -> success (fail-open). Don't block real
 *                            leads on a Google outage; bot mitigation
 *                            is best-effort, not absolute.
 *   - action mismatch     -> failure. Token was harvested from another
 *                            site/action.
 *   - score below min     -> failure. Likely a bot.
 *
 * The caller decides what to do on failure -- the convention used in
 * leads.ts is to redirect to /thank-you regardless, so bots never get
 * a "you were rejected" signal back. The submission is just silently
 * dropped (no Odoo write, no CAPI event, no email notification).
 */

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export interface VerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  reason?: string;
}

export async function verifyRecaptcha(
  token: string | undefined | null,
  expectedAction: string,
): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) return { success: true, reason: 'not-configured' };
  if (!token) return { success: false, reason: 'no-token' };

  let data: {
    success: boolean;
    score: number;
    action: string;
    challenge_ts?: string;
    hostname?: string;
    'error-codes'?: string[];
  };

  try {
    const resp = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }).toString(),
      // Short timeout so a slow Google response doesn't stall the
      // form submission's user-perceived latency.
      signal: AbortSignal.timeout(4000),
    });
    data = await resp.json();
  } catch (err) {
    console.error('[recaptcha] verify network error', err);
    // Fail-open on network errors so a Google outage doesn't tank
    // real leads. The miss rate is acceptable -- bot mitigation only
    // needs to be statistically effective, not 100%.
    return { success: true, reason: 'verify-network-error' };
  }

  if (!data.success) {
    return {
      success: false,
      reason: `google-failed:${(data['error-codes'] ?? []).join(',')}`,
    };
  }

  if (data.action !== expectedAction) {
    return {
      success: false,
      action: data.action,
      score: data.score,
      reason: 'action-mismatch',
    };
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5');
  if (data.score < minScore) {
    return {
      success: false,
      action: data.action,
      score: data.score,
      reason: 'low-score',
    };
  }

  return { success: true, action: data.action, score: data.score };
}
