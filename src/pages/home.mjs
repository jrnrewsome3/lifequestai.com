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
  <section class="hero"><div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Practical AI for Real Life</p>
      <h1>Learn AI. Apply It.<br><span class="grad">Change What’s Possible.</span></h1>
      <p class="lede">LifeQuest AI helps people move from AI curiosity to real-world capability through practical classes, guided learning paths, hands-on labs, and tools they can immediately use at home, at work, and in their communities.</p>
      <div class="btn-row" style="margin-top:28px">
        <a class="btn btn-primary btn-lg" href="${url('/classes/')}">Explore Classes</a>
        <a class="btn btn-ghost btn-lg" href="${url('/assessment/')}">Find Your AI Starting Point</a>
      </div>
      <div class="trust">
        <span>No coding required</span><span>Practical lessons</span><span>Hands-on labs</span><span>Learn at your pace</span>
      </div>
    </div>
    <div class="prog reveal">
      <div class="prog-head">
        <div><p class="tiny" style="margin:0">The LifeQuest Model</p></div>
        <span class="tiny muted">4 stages</span>
      </div>
      ${JOURNEY.map((j,i)=>`<div class="step">
        <div class="step-dot">${i+1}</div>
        <div class="step-body"><h4>${j.k}</h4><p>${j.d}</p></div>
      </div>`).join('')}
      <div class="prog-foot">${I('sparkle',17)} Every class and lab moves you one stage forward.</div>
    </div>
  </div></section>

  <section class="sec-tight" style="padding-top:0"><div class="wrap">
    ${Figure('hero','Learning together, in plain language.','LifeQuest AI classes and labs are built around real people doing real work — not demos.')}
    <p class="credit">Photography via <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a></p>
  </div></section>

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

  <section class="sec tint"><div class="wrap">
    <div class="row-between sec-head" style="margin-bottom:40px;max-width:none;align-items:flex-end">
      <div style="max-width:62ch">
        <p class="eyebrow">Launch Catalog</p>
        <h2>Ten Classes. One Clear Path.</h2>
        <p class="lede">Start wherever you are. Each class hands off to the next, so nothing ever feels like a leap.</p>
      </div>
      <a class="btn btn-ghost" href="${url('/classes/')}">All classes & filters <span class="arrow">${I('arrow',17)}</span></a>
    </div>
    <div class="grid g3">${CLASSES.slice(0,6).map(CourseCard).join('')}</div>
    <div class="center" style="margin-top:36px"><a class="btn btn-primary" href="${url('/classes/')}">See All 10 Classes</a></div>
  </div></section>

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

  <section class="sec tint"><div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Member Experience</p>
      <h2>A Home For Your Progress</h2>
      <p class="lede">A preview of the LifeQuest AI member experience — your journey stage, current class, recommended next step, and the toolkit you build as you go.</p>
      <div style="margin-top:14px"><span class="sample-note">Visual prototype — sample data</span></div>
    </div>
    ${DashboardPreview()}
    <div class="center" style="margin-top:28px"><a class="btn btn-ghost" href="${url('/member/')}">Open the full member preview <span class="arrow">${I('arrow',17)}</span></a></div>
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

  <section class="sec tint"><div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">Learner Voices</p>
      <h2>What Progress Sounds Like</h2>
      <p class="lede">These are illustrative personas created for this prototype, not real customer endorsements.</p>
    </div>
    <div class="grid g3">
      ${TESTIMONIALS.map(t=>`<div class="quote">
        <span class="sample-note" style="align-self:flex-start;margin-bottom:18px">Sample persona</span>
        <blockquote>“${t.quote}”</blockquote>
        <div class="who"><div class="avatar">${t.initials}</div>
          <div><div class="n">${t.name}</div><div class="r">${t.role}</div></div></div>
      </div>`).join('')}
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
