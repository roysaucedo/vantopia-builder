// netlify/functions/vantopia-submit.js
export async function handler(event) {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
      const payload = JSON.parse(event.body || '{}');
      const url = process.env.VANTOPIA_WEBHOOK_URL; // set in Netlify env
      if (!url) return { statusCode: 500, body: 'Missing VANTOPIA_WEBHOOK_URL' };
  
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      const text = await r.text();
      return {
        statusCode: r.status,
        headers: { 'content-type': 'application/json' },
        body: text || JSON.stringify({ ok: r.ok })
      };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
    }
  }
  