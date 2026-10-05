import {I} from '../lib/icons.mjs';
import {url, SITE} from '../config.mjs';
import {esc, byId, bySlug, labBySlug, trackBySlug, levelClass, levelBadges,
        Photo, Figure, CourseCard, LabCard, PathCard, CtaBand, LadderStrip, PageHero,
        postsSorted, postBySlug, readingTime, longDate, PostCard, PostToClass,
        RelatedPosts, NewsletterInline} from '../lib/components.mjs';
import {CLASSES, TIERS, visibleClasses} from '../data/classes.mjs';
import {TRACKS} from '../data/tracks.mjs';
import {LABS} from '../data/labs.mjs';
import {POSTS} from '../data/posts.mjs';
import {RESOURCES, EVENTS, OUTCOMES, JOURNEY, METRICS, LADDER} from '../data/site.mjs';
import {photoUrl, photoAlt} from '../data/photos.mjs';

function viewClasses(){
  return PageHero('Classes','Every class is one live 2-hour session.',
    'Up to 10 people, online or in person, $99. Start with the basics, then take the next class when you’re ready. Each class is scheduled when 10 people ask for it.',
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
      <div id="results">${TIERS.map(t=>{const cs=visibleClasses().filter(c=>c.tier===t.key);return cs.length?`<section class="tier" data-tier="${t.key}"><div class="tier-head"><h2>${t.title}</h2><p>${t.desc}</p></div><div class="grid g3">${cs.map(CourseCard).join('')}</div></section>`:'';}).join('')}</div>
      <div id="catalog-empty" class="empty hide">
        <h3>No classes match those filters.</h3>
        <p class="muted" style="max-width:44ch;margin:0 auto 20px">Try a broader search term, or clear the level and track filters to see every class.</p>
        <button class="btn btn-ghost" id="clear-filters">Clear all filters</button>
      </div>
    </div></section>`
  + CtaBand();
}

function viewClass(slug){
  const c = bySlug(slug);
  if(!c) throw new Error('Unknown class slug: '+slug);
  const next = null;
  const labs = LABS.filter(l=>l.classId===c.id);
  const tracks = c.tracks.map(trackBySlug);
  return `
  <section class="detail-hero"><div class="wrap">
    <div class="crumbs"><a href="${url('/')}">Home</a> ${I('chev',13)} <a href="${url('/classes/')}">Classes</a> ${I('chev',13)} <span>${c.title}</span></div>
    <div class="detail-grid">
      <div>
        <div class="badges" style="margin-bottom:18px">${levelBadges(c)}</div>
        <p class="eyebrow">${TIERS.find(t=>t.key===c.tier).title} · Class ${c.num}${c.status==='coming'?' · In development':''}</p>
        <h1 style="font-size:clamp(2rem,3.6vw,2.9rem);margin-bottom:20px">${c.title}</h1>
        <p class="lede">${c.blurb}</p>
        <div class="meta" style="margin-top:22px;gap:10px 22px">
          <span>${I('clock',16)} One 2-hour session</span>
          <span>${I('user',16)} Up to 10 people</span>
          <span>${I('play',16)} Live · online or in person</span>
        </div>
      </div>
      <div class="sticky-card">
        <div class="card" id="enroll" style="border-radius:var(--r-xl);box-shadow:var(--shadow-lg);padding:var(--s5)">
          <dl style="margin:0 0 18px">
            <div class="spec"><dt>Level</dt><dd>${c.level}</dd></div>
            <div class="spec"><dt>Length</dt><dd>2 hours, one session</dd></div>
            <div class="spec"><dt>Price</dt><dd>$99</dd></div>
            <div class="spec"><dt>Format</dt><dd style="max-width:16ch">Live, up to 10 people, online or in person</dd></div>
            <div class="spec"><dt>Before class</dt><dd>About ${c.prep.minutes} min of prep</dd></div>
            <div class="spec"><dt>Tracks</dt><dd style="max-width:16ch">${tracks.map(t=>t.short).join(', ')}</dd></div>
          </dl>
          <a class="btn btn-primary" style="width:100%" href="${url('/ai-training/join/')}?topic=${encodeURIComponent(c.title)}">Ask for this class</a>
          <a class="btn btn-quiet btn-sm" style="width:100%;margin-top:8px;justify-content:center" href="${url('/assessment/')}">Not sure? Take the assessment</a>
          <div class="divider"></div>
          <p class="tiny muted" style="margin:0">Scheduled once 10 people ask for it. The date and format are confirmed before anyone pays.</p>
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
        <p class="small" style="margin-top:18px"><strong>Before you start:</strong> ${esc(c.prerequisites)}</p>
      </div>

      <div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">How the two hours run</h2>
        <ol class="session-list agenda">${c.agenda.map((a,i)=>`<li${/break/i.test(a.title)?' class="is-break"':''}><span class="session-num">${a.minutes}<small>min</small></span><div><h3>${esc(a.title)}</h3></div></li>`).join('')}</ol>
        <div class="good-to-know"><p class="eyebrow amber">Good to know</p><ul>${c.goodToKnow.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
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
        <h2 style="font-size:1.6rem;margin-bottom:16px">What you’ll do in class</h2>
        <ul class="check-list">${c.exercises.map(e=>`<li>${esc(e)}</li>`).join('')}</ul>
      </div>

      <div class="try-now">
        <p class="eyebrow">Try it now · free</p>
        <h2 style="font-size:1.5rem;margin-bottom:10px">${esc(c.tryNow.title)}</h2>
        <p>${esc(c.tryNow.intro)}</p>
        <pre id="try-${c.slug}">${esc(c.tryNow.prompt)}</pre>
        <div class="btn-row"><button class="btn btn-primary btn-sm" type="button" data-copy="try-${c.slug}">Copy the prompt</button><span class="tiny muted" data-copy-status role="status"></span></div>
        <p class="small" style="margin:16px 0 6px"><strong>Before you trust the answer, check:</strong></p>
        <ul class="check-list">${c.tryNow.checks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
      </div>

      <div class="grid g2" style="gap:24px">
        <div class="card"><h2 style="font-size:1.25rem;margin-bottom:12px">Before class <span class="muted small">· about ${c.prep.minutes} minutes</span></h2><ul class="check-list">${c.prep.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="card"><h2 style="font-size:1.25rem;margin-bottom:12px">What you leave with</h2><ul class="check-list">${c.leaveWith.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>

      ${labs.length?`<div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">Paired labs</h2>
        <div class="grid g2">${labs.map(LabCard).join('')}</div>
      </div>`:''}

      <div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">Expected outcomes</h2>
        <ul class="check-list">${c.outcomes.map(o=>`<li>${o}</li>`).join('')}</ul>
      </div>

      <div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">Questions about this class</h2>
        <div class="class-faq">${c.faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
      </div>

      ${(c.nextIds||[]).length?`<div>
        <h2 style="font-size:1.6rem;margin-bottom:16px">What’s next after this class</h2>
        <div class="grid g2">${c.nextIds.map(id=>byId(id)).filter(n=>n&&n.status!=='hidden'&&n.status!=='retired').map(n=>`<a class="card card-hover" href="${url('/classes/'+n.slug+'/')}"><p class="eyebrow">Class ${n.num}</p><h3 style="font-size:1.1rem">${esc(n.title)}</h3><p class="small" style="color:var(--ink-2)">${esc(n.blurb)}</p></a>`).join('')}</div>
      </div>`:''}
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
    <div class="grid g3">${c.relatedIds.map(id=>byId(id)).filter(n=>n&&(n.status==='active'||n.status==='coming')).map(CourseCard).join('')}</div>
  </div></section>
  ${CtaBand()}`;
}

export {viewClasses, viewClass};
