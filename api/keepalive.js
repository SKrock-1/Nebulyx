import { timingSafeEqual } from 'node:crypto';

const BREVO_REPORT_URL = 'https://api.brevo.com/v3/smtp/statistics/aggregatedReport?days=1';

function authorized(header, secret) {
  if (!secret || typeof header !== 'string') return false;
  const given = Buffer.from(header);
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export default async function handler(req, res) {
  if (!authorized(req.headers.authorization, process.env.CRON_SECRET)) {
    return res.status(401).json({ ok: false });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return res.status(503).json({ ok: false, reason: 'missing key' });

  try {
    const response = await fetch(BREVO_REPORT_URL, {
      headers: { 'api-key': apiKey, Accept: 'application/json' },
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error(`Brevo keepalive failed: ${response.status} ${detail.slice(0, 300)}`);
      return res.status(502).json({ ok: false, status: response.status });
    }
    return res.status(200).json({ ok: true });
  } catch {
    console.error('Brevo keepalive failed: network error');
    return res.status(502).json({ ok: false });
  }
}
