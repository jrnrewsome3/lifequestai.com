/* =====================================================================
   SITE CONFIG — the one file to edit when the address changes.
   =====================================================================

   BASE_PATH controls every internal link on the site.

   • Hosting on GitHub Pages inside a repo?  BASE_PATH = '/lifequestai.com/'
     (your site lives at jrnrewsome3.github.io/lifequestai.com/)

   • Moved to your own domain (lifequestai.com)?  BASE_PATH = '/'
     Then also create a file named CNAME in the docs folder containing
     just your domain name, and run: npm run build

   Nothing else in the project needs to change.
   ===================================================================== */

export const SITE = {
  name: 'LifeQuest AI',
  tagline: 'Practical AI for Real Life',
  description:
    'LifeQuest AI helps everyday people, professionals, families, entrepreneurs, nonprofits, and small businesses confidently use artificial intelligence through practical classes, guided learning paths, and hands-on labs.',

  // ---- change this one line when you move to your own domain ----
  BASE_PATH: '/lifequestai.com/',

  // Used for absolute URLs in sitemap + social share tags.
  origin: 'https://jrnrewsome3.github.io',

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
