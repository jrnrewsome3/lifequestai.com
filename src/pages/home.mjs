import {homeLaunch} from './training.mjs';
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
import {NewsletterSection, DashboardPreview} from './shared.mjs';

function viewHome(){
  return `
  ${homeLaunch()}

  <section class="sec tint"><div class="wrap">
    <div class="sec-head">
      <p class="eyebrow teal">Outcomes First</p>
      <h2>Don’t Just Learn AI. Put It to Work.</h2>
      <p class="lede">Every class is built backwards from something you want to be able to do — not from a list of features.</p>
    </div>
    <div class="grid g3">
      ${OUTCOMES.map(o=>`<article class="card card-hover">
        <div class="card-icon ${o.tone}">${I(o.icon,22)}</div>
        <h3>${o.title}</h3><p>${o.desc}</p>
      </article>`).join('')}
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">The Progression</p>
      <h2>Your AI Journey</h2>
      <p class="lede">LifeQuest AI does not teach random AI tricks. It teaches progression — a route from your first useful conversation to systems that work on your behalf.</p>
    </div>
    <div class="journey">
      ${JOURNEY.map((j,i)=>`<div class="jcard">
        <div class="jnum">STAGE ${String(i+1).padStart(2,'0')}</div>
        <h3>${j.k}</h3><p>${j.d}</p>
        <ul>${j.pts.map(p=>`<li>${p}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
    <div style="margin-top:36px;padding:24px;background:#fff;border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:var(--shadow-sm)">
      <p class="eyebrow amber" style="margin-bottom:14px">Where this takes you</p>
      ${LadderStrip()}
    </div>
    <div class="btn-row" style="margin-top:28px">
      <a class="btn btn-ghost" href="${url('/about/')}">See How LifeQuest Learning Works <span class="arrow">${I('arrow',17)}</span></a>
    </div>
  </div></section>

  <section class="sec tint"><div class="wrap"><div class="sec-head"><p class="eyebrow">October 2026 · Groups forming</p><h2>Learn with people who understand your work.</h2><p class="lede">Small businesses and solopreneurs. Insurance and accounting professionals. Educators. Nonprofits. Tell us where you fit and what you want to accomplish.</p></div><a class="btn btn-primary" href="${url('/ai-training/#groups')}">Find my learning group</a></div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-head">
      <p class="eyebrow teal">Learning Paths</p>
      <h2>Choose Your Path</h2>
      <p class="lede">Nobody should be forced through the same curriculum. Pick the track that matches your life, and we sequence the classes and labs for you.</p>
    </div>
    <div class="grid g3">${TRACKS.map(PathCard).join('')}</div>
  </div></section>

  <section class="sec tint"><div class="wrap">
    <div class="row-between sec-head" style="margin-bottom:40px;max-width:none;align-items:flex-end">
      <div style="max-width:62ch">
        <p class="eyebrow amber">AI Labs</p>
        <h2>Learn By Building</h2>
        <p class="lede">Labs turn lessons into working solutions. You bring your own real problem; you leave with something that runs.</p>
      </div>
      <a class="btn btn-ghost" href="${url('/labs/')}">Explore AI Labs <span class="arrow">${I('arrow',17)}</span></a>
    </div>
    <div class="grid g3">${LABS.slice(0,6).map(LabCard).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="grid g2" style="gap:clamp(28px,5vw,64px);align-items:center">
      <div>
        <p class="eyebrow">Connect</p>
        <h2>Not Sure Where to Start?</h2>
        <p class="lede">Everyone enters the AI journey at a different level. Take a short assessment and LifeQuest AI will recommend the classes, labs, and learning path that best match your goals.</p>
        <ul class="check-list" style="margin:24px 0">
          <li>Four questions, about ninety seconds</li>
          <li>A recommended path, first class, and first lab</li>
          <li>No account required to see your result</li>
        </ul>
        <a class="btn btn-primary btn-lg" href="${url('/assessment/')}">Find My Starting Point</a>
      </div>
      <div class="card" style="padding:clamp(24px,3vw,32px);box-shadow:var(--shadow-lg);border-radius:var(--r-xl)">
        <p class="eyebrow teal" style="margin-bottom:18px">Sample questions</p>
        <div class="stack" style="gap:14px">
          ${['How often do you currently use AI today?','Where would AI help you most — personal life, family, career, business, or community?','Which tools are you already using?','What would you most like AI to help you accomplish?']
            .map((q,i)=>`<div class="mini" style="border:0;padding:0">
              <div class="mini-ic">${i+1}</div>
              <div><div class="t">${q}</div></div></div>`).join('')}
        </div>
        <div class="divider"></div>
        <p class="small muted" style="margin:0">Your answers map to one of five learning paths and a recommended starting class and lab.</p>
      </div>
    </div>
  </div></section>



  <section class="sec"><div class="wrap">
    <div class="sec-head">
      <p class="eyebrow teal">Our Definition of Success</p>
      <h2>Measure Progress By What You Can Do</h2>
      <p class="lede">The goal isn’t finishing classes. Completion is easy and means very little. We measure whether you built practical AI capability you still use a month later.</p>
    </div>
    <div class="grid g4" style="background:#fff;border:1px solid var(--line);border-radius:var(--r-xl);box-shadow:var(--shadow-sm);gap:0;overflow:hidden">
      ${METRICS.map(m=>`<div class="metric metric-cell">
        <div class="num">${m.num}</div><h4>${m.label}</h4><p>${m.desc}</p></div>`).join('')}
    </div>
  </div></section>




  <section class="sec"><div class="wrap">
    <div class="row-between sec-head" style="margin-bottom:40px;max-width:none;align-items:flex-end">
      <div style="max-width:62ch">
        <p class="eyebrow">From the blog</p>
        <h2>Learn Something Useful Today</h2>
        <p class="lede">Short, practical articles you can act on before lunch. Each one points to the class that goes deeper.</p>
      </div>
      <a class="btn btn-ghost" href="${url('/blog/')}">All posts <span class="arrow">${I('arrow',17)}</span></a>
    </div>
    <div class="grid g3">${postsSorted().slice(0,3).map(p=>PostCard(p)).join('')}</div>
  </div></section>

  ${NewsletterSection()}
  ${CtaBand()}`;
}

export {viewHome};
