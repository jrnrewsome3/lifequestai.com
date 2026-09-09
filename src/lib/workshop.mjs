import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {url, absUrl} from '../config.mjs';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../workshop');
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const hash = value => createHash('sha256').update(value).digest('hex');

export function buildWorkshop(write) {
  const raw = fs.readFileSync(path.join(dir, 'toolkit.json'));
  const toolkit = JSON.parse(raw);
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'downloads/manifest.json')));
  if (hash(raw) !== manifest.sourceSha256) throw new Error('Workshop PDFs are stale. Run scripts/build-workshop-pdf.py before building.');
  for (const [name, digest] of Object.entries(manifest.files)) {
    const pdf = fs.readFileSync(path.join(dir, 'downloads', name));
    if (hash(pdf) !== digest) throw new Error(`Workshop PDF checksum mismatch: ${name}`);
    write(`workshop/downloads/${name}`, pdf);
  }
  const family = fs.readFileSync(path.join(dir, 'family-safety.html'), 'utf8');
  const blocks = page => page.blocks.map(b => [
    b.heading ? `<h3>${esc(b.heading)}</h3>` : '',
    b.text ? `<p>${esc(b.text)}</p>` : '',
    b.items ? `<ul>${b.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '',
    b.field ? `<div class="worksheet-field"><strong>${esc(b.field)}</strong><span class="worksheet-lines" aria-hidden="true">${'<span></span>'.repeat(b.lines)}</span></div>` : '',
    b.check ? `<p class="worksheet-check"><span aria-hidden="true">&#9633; </span>${esc(b.check)}</p>` : '',
    b.note ? `<p class="source-note">${esc(b.note)}</p>` : '',
    b.link ? `<p><a href="${esc(b.link)}">${esc(b.linkLabel)}</a></p>` : ''
  ].join('')).join('');
  const handouts = `<main id="main-content"><div class="lesson-header"><div class="container">
    <p class="section-label">Use AI confidently. Protect yourself and your family.</p>
    <h1>My Everyday AI Toolkit</h1>
    <p class="lead">Five practical activities, a family safety fridge card, and facilitator notes. Download a clean, large-print PDF with room to write instead of printing the screen.</p>
    <p><a class="btn btn-primary btn-lg" href="downloads/my-everyday-ai-toolkit.pdf">Download the complete toolkit (PDF, 7 pages)</a></p>
    <p class="source-note">Print on U.S. Letter at Actual Size, or use Fit for A4. The worksheets are for writing on paper; this page does not collect your answers or family code word.</p>
  </div></div><section><div class="container">
    <nav class="toolkit-index" aria-label="Toolkit pages">${toolkit.pages.map(p=>`<a href="#${p.id}">${esc(p.title)}</a>`).join('')}</nav>
    ${toolkit.pages.map(p=>`<article class="toolkit-sheet" id="${p.id}"><p class="section-label">${esc(p.label)}</p><h2>${esc(p.title)}</h2><p>${esc(p.intro)}</p><p><a class="btn btn-outline" href="downloads/${p.file}">Download this page (PDF)</a></p>${blocks(p)}</article>`).join('')}
  </div></section></main>`;
  for (const file of ['index.html','handouts.html','safety.html','style.css',
    ...Array.from({length:5},(_,i)=>`lessons/lesson-${i+1}.html`)]) {
    let content = fs.readFileSync(path.join(dir,file),'utf8');
    const downloads = file.startsWith('lessons/') ? '../downloads/' : 'downloads/';
    if (file.endsWith('.html')) {
      content = content.replace('__TOOLKIT_CONTENT__',handouts)
        .replace('__FAMILY_SAFETY__',family.replaceAll('__DOWNLOADS__',downloads));
      const match = file.match(/lesson-(\d)\.html/);
      if (match) {
        const p = toolkit.pages[Number(match[1])-1];
        content = content.replace('</main>',`<section class="lesson-activity" aria-labelledby="activity-heading"><p class="section-label">Make it yours</p><h2 id="activity-heading">${esc(p.title)}</h2><p>${esc(p.activity)}</p><p><a class="btn btn-primary" href="${downloads}${p.file}">Download your activity (PDF)</a></p><p><a href="../handouts.html#${p.id}">Read the worksheet online</a></p></section></main>`);
      }
      const route = '/workshop/' + (file === 'index.html' ? '' : file);
      content = content.replace('</head>',`  <link rel="canonical" href="${absUrl(route)}">\n</head>`)
        .replaceAll('__LIFEQUEST_HOME__',url('/'));
    }
    write(`workshop/${file}`,content);
  }
}
