/* =====================================================================
   SITE CONFIG — the one file to edit when the address changes.
   =====================================================================

   BASE_PATH controls every internal link on the site.

   • Live on your own domain (current setup): BASE_PATH = '/'
     The file docs/CNAME holds the domain name. The build never deletes it.

   • Hosting inside a GitHub repo path instead? BASE_PATH = '/repo-name/'
     (the site would then live at jrnrewsome3.github.io/repo-name/)

   Nothing else in the project needs to change.
   ===================================================================== */

export const SITE = {
  name: 'LifeQuest AI',
  tagline: 'Practical AI for Real Life',
  description:
    'LifeQuest AI helps everyday people, professionals, families, entrepreneurs, nonprofits, and small businesses confidently use artificial intelligence through practical classes, guided learning paths, and hands-on labs.',

  // ---- change this one line when you move to your own domain ----
  BASE_PATH: '/',

  // Used for absolute URLs in sitemap + social share tags.
  origin: 'https://lifequestai.com',

  // Where the newsletter + contact forms send submissions.
  // This is a Cloudflare Worker in your own account, storing rows in the
  // "lifequest-forms" D1 database. See worker/worker.js in this repo.
  FORMS_ENDPOINT: 'https://lifequest-forms.jrnewsome.workers.dev',

  author: 'LifeQuest AI',
  year: new Date().getFullYear()
};

/** Build an internal link that works no matter where the site is hosted. */
export function url(path = '/') {
  const base = SITE.BASE_PATH.replace(/\/+$/, '');
  if (path === '/' || path === '') return base + '/';
  return base + '/' + String(path).replace(/^\/+/, '');
}

/** Absolute URL, for sitemap and Open Graph tags. */
export function absUrl(path = '/') {
  return SITE.origin.replace(/\/+$/, '') + url(path);
}
