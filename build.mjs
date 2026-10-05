#!/usr/bin/env node
/* =====================================================================
   LifeQuest AI — static site builder

   Run:  npm run build
   Reads content from src/data/*, renders every page, and writes finished
   HTML into docs/ (which is what GitHub Pages serves).

   No dependencies. Node 18 or newer.
   ===================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import {buildWorkshop} from './src/lib/workshop.mjs';
import {fileURLToPath} from 'node:url';

import {SITE, url, absUrl} from './src/config.mjs';
import {page} from './src/lib/layout.mjs';
import {CLASSES, visibleClasses} from './src/data/classes.mjs';
import {TRACKS} from './src/data/tracks.mjs';
import {LABS} from './src/data/labs.mjs';
import {POSTS} from './src/data/posts.mjs';
import {QUIZ} from './src/data/quiz.mjs';
import {photoUrl} from './src/data/photos.mjs';
import {postsSorted, readingTime, longDate} from './src/lib/components.mjs';

import {trainingHome, audiencePage, joinPage, starterPage} from './src/pages/training.mjs';
import {GROUPS, PROMPTS} from './src/data/training.mjs';
import {viewHome} from './src/pages/home.mjs';
import {viewClasses, viewClass} from './src/pages/catalog.mjs';
import {viewPaths, viewPath} from './src/pages/paths.mjs';
import {viewBlog, viewPost} from './src/pages/blog.mjs';
import {viewLabs, viewResources, viewAbout, viewNewsletter,
        viewAssessment, viewMember, viewContact, viewNotFound} from './src/pages/misc.mjs';
import {viewPrivacy, viewTerms, viewAccessibility} from './src/pages/legal.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'docs');

/* ---------- tiny fs helpers ---------- */
function clean(dir){
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    if (entry === 'CNAME') continue;               // never delete a custom domain
    fs.rmSync(path.join(dir, entry), {recursive: true, force: true});
  }
}
function write(relPath, contents){
  const full = path.join(OUT, relPath);
  fs.mkdirSync(path.dirname(full), {recursive: true});
  fs.writeFileSync(full, contents);
  built.push(relPath);
}
const built = [];

/* ---------- pages ---------- */
clean(OUT);
fs.mkdirSync(OUT, {recursive: true});

const ogHome = photoUrl('hero', 1200, 630);

/* Structured data (JSON-LD) so search engines understand who we are. */
const ORG = {
  '@type': 'EducationalOrganization', '@id': absUrl('/') + '#org',
  name: SITE.name, url: absUrl('/'), description: SITE.description,
  logo: absUrl('/favicon.svg'), email: SITE.LEGAL.contactEmail,
  address: {'@type': 'PostalAddress', addressLocality: 'Tallahassee', addressRegion: 'FL', addressCountry: 'US'}
};
const ld = obj => ({'@context': 'https://schema.org', ...obj});

write('index.html', page({
  title: '', active: 'home', path: '/', ogImage: ogHome,
  jsonLd: ld({'@graph': [ORG, {'@type': 'WebSite', name: SITE.name, url: absUrl('/'), publisher: {'@id': ORG['@id']}}]}),
  description: SITE.description,
  training: true, body: viewHome()
}));

/* ---------- content checks: fail loudly if something points at a class that isn't shown ---------- */
const shown = new Set(visibleClasses().map(c => c.id));
const byIdAll = id => CLASSES.find(c => c.id === id);
const problems = [];
for (const t of TRACKS) for (const id of t.classIds) if (!shown.has(id)) problems.push(`track "${t.slug}" lists class ${id} (${byIdAll(id)?.status || 'missing'})`);
for (const c of visibleClasses()) {
  for (const id of (c.nextIds || [])) if (!byIdAll(id)) problems.push(`class ${c.num} nextIds points at missing class ${id}`);
  for (const id of (c.relatedIds || [])) if (!byIdAll(id)) problems.push(`class ${c.num} relatedIds points at missing class ${id}`);
  const sum = c.agenda.reduce((a, x) => a + x.minutes, 0); if (sum !== 120) problems.push(`class ${c.num} agenda adds up to ${sum}, not 120`);
}
for (const l of LABS) if (!byIdAll(l.classId)) problems.push(`lab "${l.slug}" points at missing class ${l.classId}`);
if (problems.length) { console.error('\n  Content problems:\n  - ' + problems.join('\n  - ') + '\n'); process.exit(1); }

write('classes/index.html', page({
  title: 'Classes', active: 'classes', path: '/classes/', ogImage: ogHome,
  description: 'Practical AI classes, each one live 2-hour session for up to 10 people, $99. Start with the basics and build toward automation and your first AI agent. No coding required.',
  body: viewClasses()
}));

for (const c of CLASSES) {
  if (c.status === 'hidden') {   // not offered: send the old address to the catalog
    fs.mkdirSync(path.join(OUT, 'classes', c.slug), {recursive: true});
    fs.writeFileSync(path.join(OUT, 'classes', c.slug, 'index.html'), `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${url('/classes/')}"><link rel="canonical" href="${absUrl('/classes/')}"><title>Redirecting…</title></head><body><p><a href="${url('/classes/')}">See all classes</a></p></body></html>\n`);
    continue;
  }
  if (c.status === 'retired') {   // page stays, says so, stays out of the sitemap
    const html = page({
      title: c.title, active: 'classes', path: `/classes/${c.slug}/`, ogImage: photoUrl(c.slug, 1200, 630), description: c.blurb,
      body: `<section class="sec"><div class="wrap-narrow center" style="padding-top:60px"><p class="eyebrow">No longer offered</p><h1 style="margin-bottom:18px">${c.title}</h1><p class="lede" style="margin-bottom:30px">We’re not running this class any more. ${(c.nextIds||[]).map(byIdAll).filter(n=>n&&shown.has(n.id)).length ? 'Here’s where that material lives now:' : 'Have a look at the current classes.'}</p><div class="btn-row" style="justify-content:center">${(c.nextIds||[]).map(byIdAll).filter(n=>n&&shown.has(n.id)).map(n=>`<a class="btn btn-ghost" href="${url('/classes/'+n.slug+'/')}">${n.title}</a>`).join('')}<a class="btn btn-primary" href="${url('/classes/')}">All classes</a></div></div></section>`
    }).replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n<meta name="viewport"');
    fs.mkdirSync(path.join(OUT, 'classes', c.slug), {recursive: true});
    fs.writeFileSync(path.join(OUT, 'classes', c.slug, 'index.html'), html);
    continue;
  }
  write(`classes/${c.slug}/index.html`, page({
    title: c.title, active: 'classes', path: `/classes/${c.slug}/`,
    ogImage: photoUrl(c.slug, 1200, 630),
    description: c.blurb,
    jsonLd: ld({'@type': 'Course', name: c.title, description: c.blurb, url: absUrl(`/classes/${c.slug}/`),
      provider: {'@type': 'Organization', name: SITE.name, url: absUrl('/')},
      educationalLevel: c.level, teaches: c.skills, inLanguage: 'en',
      offers: {'@type': 'Offer', price: '99', priceCurrency: 'USD', category: 'Live class, one 2-hour session'}}),
    body: viewClass(c.slug)
  }));
}

write('paths/index.html', page({
  title: 'Learning Paths', active: 'paths', path: '/paths/',
  ogImage: ogHome,
  description: 'Five guided learning paths — for yourself, your family, your career, your business, or your community. Each one sequences the classes and labs for you.',
  body: viewPaths()
}));

for (const t of TRACKS) {
  write(`paths/${t.slug}/index.html`, page({
    title: t.title, active: 'paths', path: `/paths/${t.slug}/`,
    ogImage: photoUrl(t.slug, 1200, 630),
    description: `${t.desc} ${t.outcome}`,
    body: viewPath(t.slug)
  }));
}

write('labs/index.html', page({
  title: 'AI Labs', active: 'labs', path: '/labs/', ogImage: ogHome,
  description: 'Hands-on labs that turn lessons into working solutions — a morning brief, a research assistant, an automation, an AI agent. You bring real work; you leave with something that runs.',
  body: viewLabs()
}));

/* ---------- blog ---------- */
write('blog/index.html', page({
  title: 'Blog', active: 'blog', path: '/blog/', ogImage: ogHome,
  description: 'Short, practical articles on using AI in real life and real work. Every post teaches something you can try the same day.',
  body: viewBlog()
}));

for (const p of POSTS) {
  const c = CLASSES.find(x => x.id === p.classId && (x.status === 'active' || x.status === 'coming')) || visibleClasses()[0];
  write(`blog/${p.slug}/index.html`, page({
    title: p.title, active: 'blog', path: `/blog/${p.slug}/`,
    ogImage: p.image ? absUrl(p.image) : photoUrl(c.slug, 1200, 630),
    description: p.dek,
    articleMeta: p.date,
    jsonLd: ld({'@type': 'BlogPosting', headline: p.title, description: p.dek, datePublished: p.date,
      url: absUrl(`/blog/${p.slug}/`), image: p.image ? absUrl(p.image) : photoUrl(c.slug, 1200, 630),
      author: {'@type': 'Organization', name: SITE.name, url: absUrl('/')},
      publisher: {'@type': 'Organization', name: SITE.name, logo: {'@type': 'ImageObject', url: absUrl('/favicon.svg')}}}),
    body: viewPost(p)
  }));
}

/* ---------- remaining pages ---------- */
write('resources/index.html', page({
  title: 'Resources', active: 'resources', path: '/resources/', ogImage: ogHome,
  description: 'Free guides, prompt templates, and straight answers about using AI — plus upcoming live workshops and community sessions.',
  body: viewResources()
}));

write('about/index.html', page({
  title: 'About', active: 'about', path: '/about/', ogImage: ogHome,
  description: 'LifeQuest AI teaches progression, not AI tricks: a route from your first useful conversation to systems that work on your behalf.',
  body: viewAbout()
}));

write('newsletter/index.html', page({
  title: 'Newsletter', active: 'newsletter', path: '/newsletter/', ogImage: ogHome,
  description: 'One practical AI idea a week, a short tutorial, and one challenge to try. Useful AI, no hype.',
  body: viewNewsletter()
}));

write('assessment/index.html', page({
  title: 'Find Your Starting Point', active: 'assessment', path: '/assessment/', ogImage: ogHome,
  description: 'Answer four questions and LifeQuest AI will recommend the learning path, first class, and first lab that match your goals.',
  body: viewAssessment()
}));

if (SITE.FLAGS.memberArea) write('member/index.html', page({
  title: 'Member Preview', active: '', path: '/member/', ogImage: ogHome,
  description: 'A preview of the LifeQuest AI member experience: your journey stage, current class, recommended next step, and your growing toolkit.',
  body: viewMember()
}));
/* While the member area is off, /member/ redirects to AI Training (kept out of the sitemap). */
if (!SITE.FLAGS.memberArea) {
  fs.mkdirSync(path.join(OUT, 'member'), {recursive: true});
  fs.writeFileSync(path.join(OUT, 'member/index.html'), `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${url('/ai-training/')}"><link rel="canonical" href="${absUrl('/ai-training/')}"><title>Redirecting…</title></head><body><p><a href="${url('/ai-training/')}">Continue to AI Training</a></p></body></html>\n`);
}

write('contact/index.html', page({
  title: 'Contact', active: '', path: '/contact/', ogImage: ogHome,
  description: 'Questions about classes, group enrollment, workshops for your organization, or partnerships.',
  body: viewContact()
}));

/* ---------- legal ---------- */
write('privacy/index.html', page({
  title: 'Privacy Policy', active: '', path: '/privacy/', ogImage: ogHome,
  description: 'What LifeQuest AI collects through its forms, how it is used and stored, and how to have it corrected or deleted.',
  body: viewPrivacy()
}));
write('terms/index.html', page({
  title: 'Terms of Use', active: '', path: '/terms/', ogImage: ogHome,
  description: 'Terms for using the LifeQuest AI website and enrolling in classes, including pricing, payment, cancellations, and refunds.',
  body: viewTerms()
}));
write('accessibility/index.html', page({
  title: 'Accessibility', active: '', path: '/accessibility/', ogImage: ogHome,
  description: 'LifeQuest AI accessibility statement: our WCAG 2.2 AA goal, what we have done, known limitations, and how to reach us.',
  body: viewAccessibility()
}));

write('404.html', page({
  title: 'Page not found', active: '', path: '/404.html',
  description: 'That page could not be found.',
  body: viewNotFound()
}));

/* ---------- Cohort training and free starter kit ---------- */
const trainingRoutes = [
  ['/ai-training/', 'Practical AI classes for your kind of work', 'Join a group of 10 people with similar work needs. A class is scheduled when 10 people ask for it; typically $99 per seat, confirmed before you pay.', trainingHome()],
  ...GROUPS.map(g => ['/ai-training/'+g.slug+'/', 'AI training for '+g.name, g.intro, audiencePage(g)]),
  ['/ai-training/join/', 'Join a class interest list', 'Tell us your field and goals. A class is scheduled when 10 people with similar needs ask for it.', joinPage()],
  ['/resources/ai-starter-kit/', '25 practical AI prompts and a worksheet', 'Free practice prompts for small businesses, insurance and accounting professionals, educators, and nonprofits. No signup required.', starterPage()]
];
for (const [route,title,description,body] of trainingRoutes) write(route.slice(1)+'index.html',page({title,description,body,path:route,active:'training',training:true,ogImage:ogHome}));
write('resources/ai-starter-kit/25-practice-prompts.txt', 'LIFEQUEST AI — 25 PRACTICE PROMPTS\n\nUse fictional, public, or approved non-sensitive material. Replace bracketed placeholders. Review facts, tone, privacy, and unsupported claims before use. These prompts do not provide professional advice.\n\n'+PROMPTS.map((p,i)=>`${i+1}. ${p[1]} (${p[0]})\n${p[2]}`).join('\n\n')+'\n\nExplore classes: https://lifequestai.com/ai-training/\n');
write('resources/ai-starter-kit/practice-worksheet.txt', fs.readFileSync(path.join(ROOT,'src/practice-worksheet.txt'),'utf8'));
for(const asset of ['training.css','training.js','training-form.mjs'])write(asset.replace('.mjs','.js'),fs.readFileSync(path.join(ROOT,'src',asset),'utf8'));

/* ---------- assets ---------- */
fs.copyFileSync(path.join(ROOT, 'src/styles.css'), path.join(OUT, 'styles.css'));
built.push('styles.css');

const blogOgSource = path.join(ROOT, 'src/blog-og');
if (fs.existsSync(blogOgSource)) {
  fs.cpSync(blogOgSource, path.join(OUT, 'blog-og'), {recursive: true});
}

/* app.js gets the data the browser needs injected at build time */
const clientData = {
  base: SITE.BASE_PATH,
  quiz: QUIZ,
  tracks: TRACKS.map(t => ({
    slug: t.slug, title: t.title, desc: t.desc, outcome: t.outcome,
    classIds: t.classIds, labSlugs: t.labSlugs
  })),
  classes: Object.fromEntries(CLASSES.map(c => [c.id, {
    num: c.num, title: c.title, slug: c.slug, blurb: c.blurb, levels: c.levels
  }])),
  labs: Object.fromEntries(LABS.map(l => [l.slug, {title: l.title, desc: l.desc}]))
};
const appSrc = fs.readFileSync(path.join(ROOT, 'src/app.js'), 'utf8')
  .replaceAll('__LQ_DATA__', JSON.stringify(clientData));
fs.writeFileSync(path.join(OUT, 'app.js'), appSrc);
built.push('app.js');

/* favicon — the brand mark, standalone */
fs.writeFileSync(path.join(OUT, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
<rect width="40" height="40" rx="9" fill="#1F6FB2"/>
<path d="M11 27.5V12.5" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>
<path d="M11 27.5h8.4" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>
<circle cx="26" cy="15.5" r="4.6" stroke="#fff" stroke-width="2.6" fill="none"/>
<path d="M29.4 19.2L32 22" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>
</svg>
`);
built.push('favicon.svg');

/* .nojekyll stops GitHub Pages from running Jekyll over our files */
fs.writeFileSync(path.join(OUT, '.nojekyll'), '\n');

/* Workshop source, matching PDFs, activities and family safety guidance. */
buildWorkshop(write);

/* ---------- sitemap + robots ---------- */
const pageUrls = built
  .filter(f => f.endsWith('.html') && f !== '404.html')
  .map(f => '/' + f.replace(/index\.html$/, ''))
  .map(p => (p === '/' ? '/' : p));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${pageUrls.map(p => `  <url><loc>${absUrl(p)}</loc></url>`).join('\n')}
</urlset>
`.replace('www.sitemap.org', 'www.sitemaps.org');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);

fs.writeFileSync(path.join(OUT, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${absUrl('/sitemap.xml')}\n`);

/* ---------- report ---------- */
const htmlCount = built.filter(f => f.endsWith('.html')).length;
console.log(`\n  LifeQuest AI — build complete`);
console.log(`  ${htmlCount} pages written to docs/`);
console.log(`  ${CLASSES.length} classes · ${TRACKS.length} paths · ${POSTS.length} posts · ${LABS.length} labs`);
console.log(`  base path: ${SITE.BASE_PATH}\n`);
