/* The page shell: <head> tags, header, mobile drawer, footer. */

import {I, MARK} from './icons.mjs';
import {SITE, url, absUrl} from '../config.mjs';

const mark = id => MARK.replaceAll('lqg', id);

const NAV = [
  {label:'Home',           href:'/',           key:'home'},
  {label:'AI Training',    href:'/ai-training/', key:'training'},
  {label:'Learning Paths', href:'/paths/',     key:'paths'},
  {label:'AI Labs',        href:'/labs/',      key:'labs'},
  {label:'Blog',           href:'/blog/',      key:'blog'},
  {label:'Resources',      href:'/resources/', key:'resources'},
  {label:'About',          href:'/about/',     key:'about'}
];

function Header(active){
  const links = NAV.map(n =>
    `<a href="${url(n.href)}"${n.key===active ? ' class="active" aria-current="page"' : ''}>${n.label}</a>`
  ).join('');
  return `<header class="header" id="header"><div class="wrap header-in">
    <a class="brand" href="${url('/')}">${mark('lq-header')}<span>LifeQuest<em> AI</em></span></a>
    <nav class="nav" aria-label="Primary">${links}</nav>
    <div class="header-cta">
      <a class="btn btn-ghost btn-sm" href="${url('/ai-training/')}">Explore Classes</a>
      <a class="btn btn-primary btn-sm" href="${url('/ai-training/')}">Find Your AI Class</a>
      <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${I('menu',22)}</button>
    </div>
  </div></header>`;
}

function Drawer(active){
  const links = NAV.map(n =>
    `<a href="${url(n.href)}"${n.key===active ? ' class="active"' : ''}>${n.label}</a>`
  ).join('');
  return `<aside class="drawer" id="drawer" aria-label="Menu" aria-hidden="true">
    <div class="drawer-top">
      <a class="brand" href="${url('/')}">${mark('lq-drawer')}<span>LifeQuest<em> AI</em></span></a>
      <button class="icon-btn" id="drawer-close" aria-label="Close menu">${I('x',20)}</button>
    </div>
    <nav aria-label="Mobile">${links}
      <a href="${url('/assessment/')}"${active==='assessment'?' class="active"':''}>Find My Starting Point</a>
      <a href="${url('/newsletter/')}"${active==='newsletter'?' class="active"':''}>Newsletter</a>
      ${SITE.FLAGS.memberArea ? `<a href="${url('/member/')}">Member Preview</a>` : ''}
      <a href="${url('/contact/')}">Contact</a>
    </nav>
    <div class="divider"></div>
    <div class="stack" style="gap:10px">
      <a class="btn btn-primary" href="${url('/ai-training/')}">Find Your AI Class</a>
      <a class="btn btn-ghost" href="${url('/ai-training/')}">Explore Classes</a>
    </div>
  </aside>`;
}

function Footer(){
  const col = (h, items) =>
    `<div><h4>${h}</h4><div class="foot-links">${
      items.map(i=>`<a href="${url(i[1])}">${i[0]}</a>`).join('')
    }</div></div>`;
  return `<footer class="footer"><div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="${url('/')}" style="margin-bottom:16px">${mark('lq-footer')}<span>LifeQuest<em> AI</em></span></a>
        <p style="max-width:34ch;font-size:.94rem;color:#B9C6D4">Practical AI education for life, work, business, and community.</p>
        <div class="socials" style="margin-top:20px">
          <a href="${url('/newsletter/')}" aria-label="Newsletter">${I('mail',18)}</a>
          <a href="${url('/blog/')}" aria-label="Blog">${I('book',18)}</a>
          <a href="${url('/resources/')}" aria-label="Sessions">${I('calendar',18)}</a>
        </div>
      </div>
      ${col('Learn',[['Class Interest Lists','/ai-training/'],['Course Outlines','/classes/'],['Learning Paths','/paths/'],['AI Labs','/labs/'],['Resources','/resources/'],['Older Adult Workshop','/workshop/'],['AI Assessment','/assessment/']])}
      ${col('LifeQuest',[['About','/about/'],['Our Mission','/about/'],['Blog','/blog/'],['Newsletter','/newsletter/'],['Contact','/contact/']])}
      ${col('More',[['Free Starter Kit','/resources/ai-starter-kit/'],['Articles','/blog/'],['Privacy Policy','/privacy/'],['Terms','/terms/'],['Accessibility','/accessibility/']].concat(SITE.FLAGS.memberArea?[['Member Preview','/member/']]:[]))}
    </div>
    <div class="foot-bottom">
      <span class="tagline">Connect. Learn. Apply. Elevate.</span>
      <nav aria-label="Legal">
        <a href="${url('/privacy/')}">Privacy Policy</a><a href="${url('/terms/')}">Terms</a><a href="${url('/accessibility/')}">Accessibility</a><a href="${url('/contact/')}">Contact</a>
      </nav>
    </div>
    <p class="tiny" style="margin:22px 0 0;color:#7E8E9F;max-width:82ch">© ${SITE.year} ${SITE.name}. Classes are scheduled when 10 people ask for the same class — typically $99 per seat, with the date and final price confirmed before anyone pays. Course outlines describe our planned curriculum and are refined with each group. Photography is free-license imagery from <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" style="color:#9FB0C0;text-decoration:underline">Unsplash</a>.</p>
  </div></footer>`;
}

/**
 * Render a complete HTML page.
 * @param {object} o
 *  title, description, body, active (nav key), path (for canonical/OG),
 *  ogImage (absolute URL), articleMeta (optional published date)
 */
export function page(o){
  const title = o.title ? `${o.title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const desc = (o.description || SITE.description).replace(/"/g,'&quot;');
  const canonical = absUrl(o.path || '/');
  const og = o.ogImage || '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${o.articleMeta ? 'article' : 'website'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
${og ? `<meta property="og:image" content="${og}">` : ''}
<meta name="twitter:card" content="${og ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
${og ? `<meta name="twitter:image" content="${og}">` : ''}
${o.articleMeta ? `<meta property="article:published_time" content="${o.articleMeta}">` : ''}
<meta name="theme-color" content="#FCFBF8">
<link rel="icon" href="${url('/favicon.svg')}" type="image/svg+xml">
${o.jsonLd ? `<script type="application/ld+json">${JSON.stringify(o.jsonLd).replace(/</g,'\\u003c')}</script>` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${url('/styles.css')}">
${SITE.TURNSTILE_SITEKEY ? '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>' : ''}
${o.training ? `<link rel="stylesheet" href="${url('/training.css')}">` : ''}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${Header(o.active)}
<div class="scrim" id="scrim"></div>
${Drawer(o.active)}
<main id="main">
${o.body}
</main>
${Footer()}
<script src="${url('/app.js')}" defer></script>
${o.training ? `<script type="module" src="${url('/training.js')}"></script>` : ''}
${SITE.ANALYTICS_TOKEN ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${SITE.ANALYTICS_TOKEN}"}'></script>` : ''}
</body>
</html>
`;
}
