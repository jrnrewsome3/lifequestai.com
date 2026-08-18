/* =====================================================================
   LifeQuest AI — form handler (Cloudflare Worker + D1)

   Receives newsletter and contact submissions from lifequestai.com and
   stores them in the "lifequest-forms" D1 database.

   Endpoints
     POST /newsletter   { name, email, interest, page }
     POST /contact      { name, email, topic, message, page }
     GET  /export?key=EXPORT_KEY[&kind=newsletter|contact]   -> CSV download
     GET  /count?key=EXPORT_KEY                              -> JSON counts
     GET  /health                                            -> ok

   Bindings: DB (D1), EXPORT_KEY (secret)
   ===================================================================== */

const ALLOWED_ORIGINS = [
  'https://lifequestai.com',
  'https://www.lifequestai.com',
  'http://localhost:8080'
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.indexOf(origin) > -1 ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders(origin))
  });
}

const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());
const clean = (v, max) => String(v == null ? '' : v).trim().slice(0, max || 500);

async function readBody(request) {
  const type = request.headers.get('content-type') || '';
  if (type.indexOf('application/json') > -1) return await request.json();
  const form = await request.formData();
  const out = {};
  for (const [k, v] of form.entries()) out[k] = v;
  return out;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (path === '/health') return json({ ok: true }, 200, origin);

    /* ---------------- export (owner only) ---------------- */
    if (path === '/export' || path === '/count') {
      if (url.searchParams.get('key') !== env.EXPORT_KEY) {
        return json({ error: 'Unauthorized' }, 401, origin);
      }
      if (path === '/count') {
        const r = await env.DB.prepare(
          'SELECT kind, COUNT(*) AS n FROM submissions GROUP BY kind'
        ).all();
        return json({ counts: r.results }, 200, origin);
      }
      const kind = url.searchParams.get('kind');
      const stmt = kind
        ? env.DB.prepare('SELECT * FROM submissions WHERE kind = ? ORDER BY id DESC').bind(kind)
        : env.DB.prepare('SELECT * FROM submissions ORDER BY id DESC');
      const rows = (await stmt.all()).results || [];
      const cols = ['id','kind','name','email','interest','topic','message','page','created_at'];
      const esc = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
      const csv = [cols.join(',')]
        .concat(rows.map((r) => cols.map((c) => esc(r[c])).join(',')))
        .join('\n');
      return new Response(csv, {
        status: 200,
        headers: Object.assign({
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="lifequest-submissions.csv"'
        }, corsHeaders(origin))
      });
    }

    /* ---------------- submissions ---------------- */
    if (request.method !== 'POST') return json({ error: 'Not found' }, 404, origin);

    let kind = null;
    if (path === '/newsletter') kind = 'newsletter';
    else if (path === '/contact') kind = 'contact';
    else return json({ error: 'Not found' }, 404, origin);

    let body;
    try {
      body = await readBody(request);
    } catch (e) {
      return json({ error: 'Could not read that submission.' }, 400, origin);
    }

    // honeypot: real people never fill this hidden field
    if (clean(body.company, 100)) return json({ ok: true }, 200, origin);

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const errors = {};

    if (!name) errors.name = 'Name is required.';
    if (!validEmail(email)) errors.email = 'A valid email address is required.';

    let topic = null, message = null, interest = null;
    if (kind === 'contact') {
      topic = clean(body.topic, 120);
      message = clean(body.message, 5000);
      if (message.length < 5) errors.message = 'Please add a short message.';
    } else {
      interest = clean(body.interest, 120) || null;
    }

    if (Object.keys(errors).length) return json({ ok: false, errors }, 422, origin);

    // simple duplicate guard: same kind + email within the last 2 minutes
    const dup = await env.DB.prepare(
      "SELECT id FROM submissions WHERE kind = ? AND email = ? AND created_at > datetime('now','-2 minutes') LIMIT 1"
    ).bind(kind, email).first();
    if (dup) return json({ ok: true, duplicate: true }, 200, origin);

    try {
      await env.DB.prepare(
        'INSERT INTO submissions (kind, name, email, interest, topic, message, page) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(kind, name, email, interest, topic, message, clean(body.page, 300) || null).run();
    } catch (e) {
      return json({ ok: false, error: 'Could not save that. Please try again.' }, 500, origin);
    }

    return json({ ok: true }, 200, origin);
  }
};
