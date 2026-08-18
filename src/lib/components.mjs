/* Reusable HTML building blocks. */

import {I, MARK} from './icons.mjs';
import {url} from '../config.mjs';
import {CLASSES} from '../data/classes.mjs';
import {TRACKS} from '../data/tracks.mjs';
import {LABS} from '../data/labs.mjs';
import {LADDER} from '../data/site.mjs';
import {POSTS} from '../data/posts.mjs';
import {photoUrl, photoAlt} from '../data/photos.mjs';

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const byId = id => CLASSES.find(c=>c.id===id);
const bySlug = s => CLASSES.find(c=>c.slug===s);
const labBySlug = s => LABS.find(l=>l.slug===s);
const trackBySlug = s => TRACKS.find(t=>t.slug===s);
const levelClass = lv => lv==='Beginner' ? 'b-beginner' : lv==='Intermediate' ? 'b-intermediate' : 'b-advanced';

function levelBadges(c){
  let h = c.levels.map(lv=>`<span class="badge ${levelClass(lv)}"><span class="badge-dot"></span>${lv}</span>`).join('');
  if(c.lab) h += '<span class="badge b-lab">Hands-on Lab</span>';
  return h;
}


function Photo(key,w,h,cls){
  const url = photoUrl(key,w,h);
  if(!url) return '';
  return `<span class="media ${cls||'media-16-10'}">
    <img src="${url}" alt="${photoAlt(key)}" loading="lazy" decoding="async" width="${w}" height="${h}">
  </span>`;
}

function Figure(key,caption,sub,cls){
  const url = photoUrl(key, 1600, 900);
  if(!url) return '';
  return `<figure class="figure ${cls||''}">
    <img src="${url}" alt="${photoAlt(key)}" loading="lazy" decoding="async">
    ${caption?`<figcaption>${caption}${sub?`<span class="sub">${sub}</span>`:''}</figcaption>`:''}
  </figure>`;
}

function CourseCard(c){
  const hay = (c.title+' '+c.blurb+' '+c.skills.join(' ')+' '+c.level+' '+
               c.tools.join(' ')+' '+c.learn.join(' ')).toLowerCase().replace(/["<>]/g,'');
  return `<article class="course-card" data-levels="${c.levels.join('|')}" data-tracks="${c.tracks.join('|')}" data-search="${hay}">
    <a href="${url('/classes/'+c.slug+'/')}" aria-hidden="true" tabindex="-1">${Photo(c.slug,800,500)}</a>
    <div class="course-body">
    <div class="course-top">
      <span class="course-num">${c.num}</span>
      <div class="badges">${levelBadges(c)}</div>
    </div>
    <h3><a href="${url('/classes/'+c.slug+'/')}" style="color:inherit">${c.title}</a></h3>
    <p>${c.blurb}</p>
    <div class="meta">
      <span>${I('clock',15)} ${c.duration}</span>
      <span>${I('book',15)} ${c.lessons} lessons</span>
    </div>
    <div class="meta" style="margin-top:8px"><span>${I('play',15)} ${c.format}</span></div>
    <div class="skills">${c.skills.map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
    <div class="card-foot btn-row">
      <a class="btn btn-ghost btn-sm" href="${url('/classes/'+c.slug+'/')}">View Class</a>
      <a class="btn btn-primary btn-sm" href="${url('/classes/'+c.slug+'/')}#enroll">Enroll</a>
    </div>
    </div>
  </article>`;
}

function LabCard(l){
  const c = byId(l.classId);
  return `<article class="lab-card">
    <div class="row-between" style="gap:10px">
      <span class="badge ${levelClass(l.level)}"><span class="badge-dot"></span>${l.level}</span>
      <span class="tiny muted">${l.duration}</span>
    </div>
    <h3 style="font-size:1.08rem">${l.title}</h3>
    <p style="font-size:.93rem;color:var(--ink-2);margin:0">${l.desc}</p>
    <div class="divider" style="margin:6px 0"></div>
    <p class="small" style="margin:0"><strong style="font-family:var(--sans);font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">You leave with</strong><br>${l.deliverable}</p>
    <div class="skills" style="margin-top:4px">${l.tools.map(t=>`<span class="skill-tag">${t}</span>`).join('')}</div>
    <div class="card-foot"><a class="btn btn-quiet btn-sm" href="${url('/classes/'+c.slug+'/')}">Paired with ${c.num} — ${c.title} <span class="arrow">${I('arrow',16)}</span></a></div>
  </article>`;
}

function PathCard(t){
  return `<article class="path-card">
    <a href="${url('/paths/'+t.slug+'/')}" aria-hidden="true" tabindex="-1">${Photo(t.slug,800,450,'media-16-9')}</a>
    <div class="path-body">
      <div class="card-icon ${t.slug==='families'||t.slug==='nonprofits'?'teal':''}">${I(t.icon,22)}</div>
      <h3>${t.title}</h3>
      <p style="color:var(--ink-2);font-size:.95rem">${t.desc}</p>
      <div class="divider"></div>
      <div class="meta"><span>${I('book',15)} ${t.classIds.length} classes</span><span>${I('flask',15)} ${t.labSlugs.length} labs</span></div>
      <div class="card-foot"><a class="btn btn-quiet btn-sm" href="${url('/paths/'+t.slug+'/')}">View this path <span class="arrow">${I('arrow',16)}</span></a></div>
    </div>
  </article>`;
}

function CtaBand(){
  return `<section class="sec"><div class="wrap"><div class="cta-band">
    <h2>Your Next Level Starts Here.</h2>
    <p>You don’t need to become an AI expert overnight. You need a starting point, a practical roadmap, and opportunities to put what you learn into action.</p>
    <div class="btn-row">
      <a class="btn btn-primary btn-lg" href="${url('/assessment/')}">Start Learning</a>
      <a class="btn btn-ghost btn-lg" href="${url('/classes/')}">Explore Classes</a>
    </div>
  </div></div></section>`;
}

function LadderStrip(){
  return `<div class="ladder">${LADDER.map((l,i)=>(i?`<i>${I('arrow',14)}</i>`:'')+`<span class="rung">${l}</span>`).join('')}</div>`;
}

function PageHero(eyebrow,title,lede,extra){
  return `<section class="page-hero"><div class="wrap">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <p class="lede">${lede}</p>
    ${extra||''}
  </div></section>`;
}


/* ---------- blog ---------- */
const postsSorted = () => POSTS.slice().sort((a,b)=> b.date.localeCompare(a.date));
const postBySlug = s => POSTS.find(p=>p.slug===s);

function readingTime(post){
  const words = post.body.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words/220)) + ' min read';
}

function longDate(iso){
  const [y,m,d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y,m-1,d)).toLocaleDateString('en-US',
    {month:'long', day:'numeric', year:'numeric', timeZone:'UTC'});
}

function PostCard(p, featured){
  const c = byId(p.classId);
  return `<article class="post-card${featured?' featured':''}" data-cat="${p.category}" data-search="${esc((p.title+' '+p.dek+' '+p.category).toLowerCase())}">
    <a class="post-card-link" href="${url('/blog/'+p.slug+'/')}">
      ${Photo(c.slug, featured?1000:800, featured?560:500, 'media-16-9')}
    </a>
    <div class="post-body">
      <div class="post-meta">
        <span class="cat">${p.category}</span>
        <span>${longDate(p.date)}</span>
        <span>${readingTime(p)}</span>
      </div>
      <h3><a href="${url('/blog/'+p.slug+'/')}">${p.title}</a></h3>
      <p>${p.dek}</p>
      <div class="card-foot">
        <a class="btn btn-quiet btn-sm" href="${url('/blog/'+p.slug+'/')}">Read the post <span class="arrow">${I('arrow',16)}</span></a>
      </div>
    </div>
  </article>`;
}

/** The conversion block: every post points at the class it teaches toward. */
function PostToClass(p){
  const c = byId(p.classId);
  return `<aside class="convert">
    <div class="convert-in">
      <p class="eyebrow amber" style="margin-bottom:12px">Take it further</p>
      <h2 style="font-size:clamp(1.4rem,2.4vw,1.85rem);margin-bottom:14px">This post explained the idea. The class builds the skill.</h2>
      <p class="lede" style="margin-bottom:26px">${c.blurb}</p>
      <div class="convert-card">
        <div style="flex:1">
          <div class="badges" style="margin-bottom:10px">${levelBadges(c)}</div>
          <h3 style="font-size:1.16rem;margin-bottom:8px">${c.num} — ${c.title}</h3>
          <div class="meta"><span>${I('clock',15)} ${c.duration}</span><span>${I('book',15)} ${c.lessons} lessons</span></div>
        </div>
        <div class="btn-row" style="flex:none">
          <a class="btn btn-primary" href="${url('/classes/'+c.slug+'/')}">View the class</a>
        </div>
      </div>
      <p class="small muted" style="margin:18px 0 0">Not sure where you'd start? <a href="${url('/assessment/')}">Take the 90-second assessment</a> and we'll recommend a path.</p>
    </div>
  </aside>`;
}

function RelatedPosts(p){
  const others = postsSorted().filter(x=>x.slug!==p.slug);
  const same = others.filter(x=>x.category===p.category);
  const pick = (same.concat(others.filter(x=>x.category!==p.category))).slice(0,3);
  return `<div class="grid g3">${pick.map(x=>PostCard(x)).join('')}</div>`;
}

function NewsletterInline(){
  return `<aside class="inline-nl">
    <div>
      <h3 style="font-size:1.14rem;margin-bottom:6px">One practical AI idea, once a week.</h3>
      <p class="small muted" style="margin:0">Plus a short tutorial and one challenge to try. No hype.</p>
    </div>
    <a class="btn btn-primary" href="${url('/newsletter/')}" style="flex:none">Join the newsletter</a>
  </aside>`;
}

export {
  esc, byId, bySlug, labBySlug, trackBySlug, levelClass, levelBadges,
  Photo, Figure, CourseCard, LabCard, PathCard, CtaBand, LadderStrip, PageHero,
  postsSorted, postBySlug, readingTime, longDate, PostCard, PostToClass,
  RelatedPosts, NewsletterInline
};
