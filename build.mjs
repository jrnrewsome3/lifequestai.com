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
import {fileURLToPath} from 'node:url';

import {SITE, url, absUrl} from './src/config.mjs';
import {page} from './src/lib/layout.mjs';
import {CLASSES} from './src/data/classes.mjs';
import {TRACKS} from './src/data/tracks.mjs';
import {LABS} from './src/data/labs.mjs';
import {POSTS} from './src/data/posts.mjs';
import {QUIZ} from './src/data/quiz.mjs';
import {photoUrl} from './src/data/photos.mjs';
import {postsSorted, readingTime, longDate} from './src/lib/components.mjs';

import {viewHome} from './src/pages/home.mjs';
import {viewClasses, viewClass} from './src/pages/catalog.mjs';
import {viewPaths, viewPath} from './src/pages/paths.mjs';
import {viewBlog, viewPost} from './src/pages/blog.mjs';
import {viewLabs, viewResources, viewAbout, viewNewsletter,
        viewAssessment, viewMember, viewContact, viewNotFound} from './src/pages/misc.mjs';

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

write('index.html', page({
  title: '', active: 'home', path: '/', ogImage: ogHome,
  description: SITE.description,
  body: viewHome()
}));

write('classes/index.html', page({
  title: 'Classes', active: 'classes', path: '/classes/', ogImage: ogHome,
  description: 'Ten practical AI classes that move in a deliberate order — from your first useful AI conversation to building a working AI agent. No coding required.',
  body: viewClasses()
}));

for (const c of CLASSES) {
  write(`classes/${c.slug}/index.html`, page({
    title: c.title, active: 'classes', path: `/classes/${c.slug}/`,
    ogImage: photoUrl(c.slug, 1200, 630),
    description: c.blurb,
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
  const c = CLASSES.find(x => x.id === p.classId);
  write(`blog/${p.slug}/index.html`, page({
    title: p.title, active: 'blog', path: `/blog/${p.slug}/`,
    ogImage: photoUrl(c.slug, 1200, 630),
    description: p.dek,
    articleMeta: p.date,
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

write('member/index.html', page({
  title: 'Member Preview', active: '', path: '/member/', ogImage: ogHome,
  description: 'A preview of the LifeQuest AI member experience: your journey stage, current class, recommended next step, and your growing toolkit.',
  body: viewMember()
}));

write('contact/index.html', page({
  title: 'Contact', active: '', path: '/contact/', ogImage: ogHome,
  description: 'Questions about classes, group enrollment, workshops for your organization, or partnerships.',
  body: viewContact()
}));

write('404.html', page({
  title: 'Page not found', active: '', path: '/404.html',
  description: 'That page could not be found.',
  body: viewNotFound()
}));

/* ---------- assets ---------- */
fs.copyFileSync(path.join(ROOT, 'src/styles.css'), path.join(OUT, 'styles.css'));
built.push('styles.css');

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
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

/* ---------- sitemap + robots ---------- */
const pageUrls = built
  .filter(f => f.endsWith('index.html'))
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
