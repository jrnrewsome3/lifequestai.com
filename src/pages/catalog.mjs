import {I} from '../lib/icons.mjs';
import {url, SITE} from '../config.mjs';
import {esc, byId, bySlug, labBySlug, trackBySlug, levelClass, levelBadges,
        Photo, Figure, CourseCard, LabCard, PathCard, CtaBand, LadderStrip, PageHero,
        postsSorted, postBySlug, readingTime, longDate, PostCard, PostToClass,
        RelatedPosts, NewsletterInline} from '../lib/components.mjs';
import {CLASSES} from '../data/classes.mjs';
import {TRACKS} from '../data/tracks.mjs';
import {LABS} from '../data/labs.mjs';
import {POSTS} from '../data/posts.mjs';
import {RESOURCES, EVENTS, NEWSLETTER_ISSUES, TESTIMONIALS, OUTCOMES, JOURNEY, METRICS, LADDER} from '../data/site.mjs';
import {photoUrl, photoAlt} from '../data/photos.mjs';

function viewClasses(){
  return PageHero('Launch Catalog','Classes',
    'Ten classes that move in a deliberate order — from your first useful AI conversation to a working agent. Search, or filter by level and learning track.',
    `<div style="margin-top:28px">${LadderStrip()}</div>`)
  + `<section class="sec-tight"><div class="wrap">
      <div class="toolbar">
        <div class="search-field">
          ${I('search',18)}
          <label class="sr" for="q">Search classes</label>
          <input id="q" type="search" placeholder="Search classes, skills, or topics…" autocomplete="off">
        </div>
        <div class="filter-group" id="lvl" role="group" aria-label="Filter by level">
          ${['All levels','Beginner','Intermediate','Advanced'].map((l,i)=>`<button class="pill" data-lvl="${l}" aria-pressed="${i===0}">${l}</button>`).join('')}
        </div>
        <div style="flex:0 0 auto;min-width:190px">
          <label class="sr" for="track">Filter by learning track</label>
          <select id="track"><option value="">All learning tracks</option>${TRACKS.map(t=>`<option value="${t.slug}">${t.title}</option>`).join('')}</select>
        </div>
      </div>
      <p class="result-count" id="count" role="status" style="margin-bottom:20px"></p>
      <div class="grid g3" id="results">${CLASSES.map(CourseCard).join('')}</div>
      <div id="catalog-empty" class="empty hide">
        <h3>No classes match those filters.</h3>
        <p class="muted" style="max-width:44ch;margin:0 auto 20px">Try a broader search term, or clear the level and track filters to see all ten classes.</p>
        <button class="btn btn-ghost" id="clear-filters">Clear all filters</button>
      </div>
    </div></section>`
  + CtaBand();
}

function viewClass(slug){
  const c = bySlug(slug);
  if(!c) throw new Error('Unknown class slug: '+slug);
  const next = c.nextId ? byId(c.nextId) : null;
  const labs = LABS.filter(l=>l.classId===c.id);
  const tracks = c.tracks.map(trackBySlug);
  return `
  <section class="detail-hero"><div class="wrap">
    <div class="crumbs"><a href="${url('/')}">Home</a> ${I('chev',13)} <a href="${url('/classes/')}">Classes</a> ${I('chev',13)} <span>${c.title}</span></div>
    <div class="detail-grid">
      <div>
        <div class="badges" style="margin-bottom:18px">${levelBadges(c)}</div>
        <p class="eyebrow">Class ${c.num}</p>
        <h1 style="font-size:clamp(2rem,3.6vw,2.9rem);margin-bottom:20px">${c.title}</h1>
        <p class="lede">${c.blurb}</p>
        <div class="meta" style="margin-top:22px;gap:10px 22px">
          <span>${I('clock',16)} ${c.duration}</span>
          <span>${I('book',16)} ${c.lessons} lessons</span>
          <span>${I('play',16)} ${c.format}</span>
        </div>
      </div>
      <div class="sticky-card">
        <div class="card" id="enroll" style="border-radius:var(--r-xl);box-shadow:var(--shadow-lg);padding:var(--s5)">
          <dl style="margin:0 0 18px">
            <div class="spec"><dt>Level</dt><dd>${c.level}</dd></div>
            <div class="spec"><dt>Duration</dt><dd>${c.duration}</dd></div>
            <div class="spec"><dt>Lessons</dt><dd>${c.lessons} lessons</dd></div>
            <div class="spec"><dt>Format</dt><dd style="max-width:16ch">${c.format}</dd></div>
            <div class="spec"><dt>Tracks</dt><dd style="max-width:16ch">${tracks.map(t=>t.short).join(', ')}</dd></div>
          </dl>
          <a class="btn btn-primary" style="width:100%" href="${url('/newsletter/')}">Enroll in this class</a>
          <a class="btn btn-quiet btn-sm" style="width:100%;margin-top:8px;justify-content:center" href="${url('/assessment/')}">Not sure? Take the assessment</a>
          <div class="divider"></div>
          <p class="tiny muted" style="margin:0">Enrollment opens with each new cohort. Join the list and you’ll hear first.</p>
        </div>
      </div>
    </div>
  </div></section>

  <section class="sec-tight" style="padding-bottom:0"><div class="wrap">
    ${Figure(c.slug, c.num+' — '+c.title, c.level+' · '+c.duration+' · '+c.format, 'banner')}
  </div></section>

  <section class="sec-tight"><div class="wrap"><div class="detail-grid">
    <div class="stack" style="gap:var(--s7)">
      <div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">Course overview</h2>
        <p class="lede">${c.overview}</p>
        ${c.notice?`<div class="notice" style="margin-top:22px"><strong>Important:</strong> ${c.notice}</div>`:''}
      </div>

      <div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">Who this is for</h2>
        <ul class="check-list">${c.audience.map(a=>`<li>${a}</li>`).join('')}</ul>
      </div>

      <div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">What you’ll learn</h2>
        <div class="grid g2" style="gap:0 32px">
          <ul class="check-list">${c.learn.slice(0,Math.ceil(c.learn.length/2)).map(l=>`<li>${l}</li>`).join('')}</ul>
          <ul class="check-list">${c.learn.slice(Math.ceil(c.learn.length/2)).map(l=>`<li>${l}</li>`).join('')}</ul>
        </div>
      </div>

      <div>
        <div class="row-between" style="margin-bottom:18px">
          <h2 style="font-size:1.6rem">Curriculum</h2>
          <span class="small muted">${c.modules.length} modules · ${c.lessons} lessons</span>
        </div>
        <div class="acc" id="acc">
          ${c.modules.map((m,i)=>`<div class="acc-item">
            <button class="acc-btn" aria-expanded="${i===0}" aria-controls="p${i}">
              <span class="acc-idx">${String(i+1).padStart(2,'0')}</span>
              <span>${m.title}</span>
              <span class="chev">${I('chev',18)}</span>
            </button>
            <div class="acc-panel ${i===0?'open':''}" id="p${i}">
              <ul>${m.lessons.map(l=>`<li>${l}</li>`).join('')}</ul>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">Hands-on exercises</h2>
        <div class="grid" style="gap:12px">
          ${c.exercises.map((e,i)=>`<div class="card" style="flex-direction:row;gap:16px;align-items:flex-start;padding:18px 20px">
            <div class="card-icon amber" style="margin:0;width:36px;height:36px;border-radius:10px">${I('flask',18)}</div>
            <div><div style="font-family:var(--sans);font-weight:600">${e}</div></div>
          </div>`).join('')}
        </div>
      </div>

      ${labs.length?`<div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">Paired labs</h2>
        <div class="grid g2">${labs.map(LabCard).join('')}</div>
      </div>`:''}

      <div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">Expected outcomes</h2>
        <ul class="check-list">${c.outcomes.map(o=>`<li>${o}</li>`).join('')}</ul>
      </div>
    </div>

    <div class="stack" style="gap:var(--s5)">
      <div class="card">
        <h4 style="font-size:.75rem;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-bottom:16px">Tools used</h4>
        <div>${c.tools.map(t=>`<span class="tool-chip">${I('grid',15)} ${t}</span>`).join('')}</div>
      </div>
      <div class="card">
        <h4 style="font-size:.75rem;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-bottom:16px">Skills you build</h4>
        <div class="skills" style="margin:0">${c.skills.map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
      </div>
      <div class="card">
        <h4 style="font-size:.75rem;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-bottom:16px">Instructor</h4>
        <div class="mini" style="border:0;padding:0">
          <div class="avatar">${I('user',18)}</div>
          <div><div class="t">${c.instructor.name}</div><div class="s">${c.instructor.role}</div></div>
        </div>
        <p class="small muted" style="margin:14px 0 0">${c.instructor.bio}</p>
      </div>
      ${next?`<div class="card" style="background:linear-gradient(160deg,#F4FAFE,#FFFFFF)">
        <h4 style="font-size:.75rem;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">Recommended next</h4>
        <div class="badges" style="margin-bottom:10px">${levelBadges(next)}</div>
        <h3 style="font-size:1.1rem;margin-bottom:8px">${next.num} — ${next.title}</h3>
        <p class="small" style="color:var(--ink-2)">${next.blurb}</p>
        <div class="card-foot"><a class="btn btn-ghost btn-sm" href="${url('/classes/'+next.slug+'/')}">View next class <span class="arrow">${I('arrow',16)}</span></a></div>
      </div>`:`<div class="card" style="background:linear-gradient(160deg,#FBF6EA,#FFFFFF)">
        <h4 style="font-size:.75rem;letter-spacing:.13em;text-transform:uppercase;color:var(--amber);margin-bottom:12px">Top of the ladder</h4>
        <p class="small" style="color:var(--ink-2);margin:0">This is the LifeQuest capstone. From here, learners move into ongoing build sessions and community projects.</p>
      </div>`}
    </div>
  </div></div></section>

  <section class="sec tint"><div class="wrap">
    <div class="sec-head"><h2 style="font-size:1.8rem">Related classes</h2></div>
    <div class="grid g3">${c.relatedIds.map(id=>CourseCard(byId(id))).join('')}</div>
  </div></section>
  ${CtaBand()}`;
}

export {viewClasses, viewClass};
