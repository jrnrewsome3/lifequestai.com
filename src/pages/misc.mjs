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
import {QUIZ} from '../data/quiz.mjs';
import {NewsletterSection, DashboardPreview} from './shared.mjs';

function viewLabs(){
  return PageHero('AI Labs','Learn By Building',
    'LifeQuest AI Labs turn lessons into working solutions. Every lab is scoped to a single sitting, uses your own real work as the assignment, and ends with something that actually runs.')
  + `<section class="sec-tight"><div class="wrap">
      <div class="grid g3" style="margin-bottom:48px">
        ${[['target','Your real work','No toy exercises. You bring the actual task, document, or process you have been avoiding.'],
           ['check','Something finished','Every lab ends with a deliverable you keep using — not a certificate.'],
           ['shield','Guardrails included','Approval steps and privacy practice are built into the labs, not bolted on later.']]
          .map(([ic,t,d])=>`<article class="card"><div class="card-icon ${ic==='shield'?'teal':ic==='check'?'amber':''}">${I(ic,22)}</div><h3>${t}</h3><p>${d}</p></article>`).join('')}
      </div>
      <div class="grid g2">${LABS.map(LabCard).join('')}</div>
    </div></section>`
  + CtaBand();
}

function viewResources(){
  const iconFor = t => t==='Guide'?'book':t==='Template'?'file':t==='Article'?'message':'target';
  return PageHero('Resources','Guides, Templates & Straight Answers',
    'Free material you can use before, during, or instead of a class. Updated as the tools change — because they change constantly.')
  + `<section class="sec-tight"><div class="wrap">
      <div class="grid g3">
        ${RESOURCES.map(r=>`<article class="card card-hover">
          <div class="card-icon ${r.type==='Template'?'amber':r.type==='Guide'?'':'teal'}">${I(iconFor(r.type),22)}</div>
          <div class="badges" style="margin-bottom:12px"><span class="skill-tag">${r.type}</span></div>
          <h3>${r.title}</h3><p style="font-size:.95rem">${r.desc}</p>
          <div class="card-foot row-between"><span class="tiny muted">${r.meta}</span>
          <a class="btn btn-quiet btn-sm" href="${url('/newsletter/')}">Get it ${I('arrow',15)}</a></div>
        </article>`).join('')}
      </div>
    </div></section>
    <section class="sec tint"><div class="wrap">
      <div class="sec-head"><p class="eyebrow">Live & Community</p><h2 style="font-size:1.9rem">Upcoming Sessions</h2>
      <p class="lede">Workshops, office hours, and community sessions. Dates below are a sample schedule — the live calendar is published to the newsletter first.</p></div>
      <div class="stack" style="gap:12px">
        ${EVENTS.map(e=>`<div class="card" style="flex-direction:row;gap:24px;align-items:center;padding:20px 24px">
          <div style="flex:none;text-align:center;min-width:64px">
            <div class="tiny muted" style="font-family:var(--sans);font-weight:700;letter-spacing:.1em">${e.day.toUpperCase()}</div>
            <div style="font-family:var(--sans);font-weight:800;font-size:1.05rem">${e.date}</div>
          </div>
          <div style="width:1px;align-self:stretch;background:var(--line-soft)"></div>
          <div style="flex:1">
            <div class="badges" style="margin-bottom:8px"><span class="skill-tag">${e.kind}</span><span class="skill-tag">${e.time}</span></div>
            <h3 style="font-size:1.08rem;margin-bottom:5px">${e.title}</h3>
            <p class="small muted" style="margin:0">${e.desc}</p>
          </div>
          <a class="btn btn-ghost btn-sm" href="${url('/newsletter/')}" style="flex:none">Save my seat</a>
        </div>`).join('')}
      </div>
    </div></section>`
  + CtaBand();
}

function viewAbout(){
  return PageHero('About LifeQuest AI','We Teach Progression, Not AI Tricks',
    'Most AI education is a pile of tips. Tips do not compound. LifeQuest AI is built as a system: a route from your first useful conversation to software that works on your behalf — with each stage earning the next.')
  + `<section class="sec"><div class="wrap">
    <div class="grid g2" style="gap:clamp(32px,5vw,64px);align-items:start">
      <div>
        <h2 style="font-size:1.9rem;margin-bottom:20px">Our mission</h2>
        <p class="lede">To help everyday people, professionals, families, entrepreneurs, nonprofits, and small businesses confidently use artificial intelligence to improve their lives and work — without needing to become engineers.</p>
        <p class="lede" style="margin-top:18px">We believe the gap is not intelligence or interest. It is sequence. People are handed a blank chat box and a hundred YouTube videos, and no path between them. LifeQuest AI is that path.</p>
      </div>
      <div class="card" style="border-radius:var(--r-xl);box-shadow:var(--shadow-md);padding:clamp(24px,3vw,32px)">
        <p class="eyebrow" style="margin-bottom:18px">How LifeQuest learning works</p>
        ${JOURNEY.map((j,i)=>`<div class="step"><div class="step-dot">${i+1}</div>
          <div class="step-body"><h4>${j.k}</h4><p>${j.d}</p></div></div>`).join('')}
      </div>
    </div>
  </div></section>

  <section class="sec tint"><div class="wrap">
    <div class="sec-head"><h2 style="font-size:1.9rem">What we believe</h2></div>
    <div class="grid g3">
      ${[['message','Plain language always','If a lesson needs jargon to sound credible, the lesson is not good enough. We explain AI through outcomes, not architecture.'],
         ['target','Your work is the curriculum','Assignments use your actual email, your actual spreadsheet, your actual process. Practice on real things transfers; practice on toy things does not.'],
         ['shield','Honest about limits','AI gets things confidently wrong, and some decisions must stay human. We teach verification and guardrails from the first class.'],
         ['trend','Progression over novelty','Every class hands off to the next. You should always know what you just earned the right to learn.'],
         ['user','Nobody starts behind','A grandparent, a director of operations, and a fifteen-year-old can all find their entry point here.'],
         ['zap','Capability, not completion','A finished class means nothing if nothing changed. We measure what you can do a month later.']]
        .map(([ic,t,d],i)=>`<article class="card"><div class="card-icon ${i%3===1?'teal':i%3===2?'amber':''}">${I(ic,22)}</div><h3>${t}</h3><p style="font-size:.95rem">${d}</p></article>`).join('')}
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-head"><p class="eyebrow amber">The ladder</p><h2 style="font-size:1.9rem">From literacy to agency</h2>
    <p class="lede">This is the whole idea in one line. A visitor should be able to see exactly where they are and what comes next.</p></div>
    <div class="card" style="padding:clamp(22px,3vw,32px)">${LadderStrip()}</div>
    <div class="grid g3" style="margin-top:32px">
      ${[['Where most people are','AI literacy and occasional assistance. Useful, but manual — every result requires you to be present.'],
         ['Where LifeQuest gets you','Workflows and automation. Work happens whether or not you are sitting at your desk.'],
         ['Where the capstone leads','Agents with tools, memory, guardrails, and human approval on anything consequential.']]
        .map(([t,d])=>`<article class="card"><h3 style="font-size:1.05rem">${t}</h3><p style="font-size:.95rem">${d}</p></article>`).join('')}
    </div>
  </div></section>
  ${NewsletterSection()}
  ${CtaBand()}`;
}

function viewNewsletter(){
  return PageHero('Newsletter','Stay Ahead Without Chasing AI News',
    'The AI landscape changes weekly and almost none of it matters to your Tuesday. We read the noise and send you the part that is actually useful — plus one challenge to try.')
  + NewsletterSection()
  + `<section class="sec tint"><div class="wrap">
      <div class="sec-head center"><h2 style="font-size:1.8rem">What’s in every issue</h2></div>
      <div class="grid g4">
        ${[['sparkle','One practical idea','Something you can use the same day, explained in a paragraph.'],
           ['grid','Tool watch','What actually changed in the major tools — and whether you should care.'],
           ['book','A short tutorial','A single technique, worked end to end.'],
           ['flask','This week’s challenge','One small assignment that builds real capability.']]
          .map(([ic,t,d],i)=>`<article class="card"><div class="card-icon ${i===1?'teal':i===3?'amber':''}">${I(ic,20)}</div><h3 style="font-size:1.02rem">${t}</h3><p style="font-size:.93rem">${d}</p></article>`).join('')}
      </div>
    </div></section>`;
}

function viewAssessment(){
  return PageHero('Connect','Find Your AI Starting Point',
    'Everyone enters the AI journey at a different level. Answer four questions and LifeQuest AI will recommend the learning path, first class, and first lab that best match your goals.')
  + `<section class="sec-tight"><div class="wrap-narrow">
      <div class="quiz" id="quiz">
        <div class="quiz-prog" id="quiz-prog" aria-hidden="true">${QUIZ.map((_,i)=>`<i class="${i===0?'on':''}"></i>`).join('')}</div>
        <div id="quiz-body" aria-live="polite"></div>
        <div class="quiz-nav">
          <button class="btn btn-ghost" id="quiz-back">Back</button>
          <button class="btn btn-primary" id="quiz-next">Continue</button>
        </div>
      </div>
      <div id="quiz-result" class="hide"></div>
      <p class="tiny muted center" style="margin-top:22px">No account required. Your answers stay in your browser — nothing is stored or sent anywhere.</p>
    </div></section>`;
}

function viewMember(){
  return PageHero('Member Experience','Inside LifeQuest AI',
    'A visual preview of the member experience. Authentication is not implemented in this prototype — the data below is illustrative.',
    '<div style="margin-top:20px"><span class="sample-note">Visual prototype — sample data</span></div>')
  + `<section class="sec-tight"><div class="wrap">${DashboardPreview()}</div></section>`
  + `<section class="sec tint"><div class="wrap">
      <div class="sec-head"><h2 style="font-size:1.8rem">What members get</h2></div>
      <div class="grid g4">
        ${[['trend','Progress that means something','Your stage in Connect → Learn → Apply → Elevate, not a percentage bar on a video.'],
           ['file','A growing toolkit','Every prompt, template, and workflow you build stays in one place.'],
           ['calendar','Live sessions','Workshops, office hours, and build sessions with other learners.'],
           ['target','Guided next steps','One clear recommendation at a time, based on what you just finished.']]
          .map(([ic,t,d],i)=>`<article class="card"><div class="card-icon ${i%3===1?'teal':i%3===2?'amber':''}">${I(ic,20)}</div><h3 style="font-size:1.02rem">${t}</h3><p style="font-size:.93rem">${d}</p></article>`).join('')}
      </div>
    </div></section>`
  + CtaBand();
}

function viewContact(){
  return PageHero('Contact','Talk to LifeQuest AI',
    'Questions about classes, group enrollment, workshops for your organization, or partnerships. Send a note and we’ll get back to you.')
  + `<section class="sec-tight"><div class="wrap"><div class="grid g2" style="gap:clamp(28px,5vw,56px);align-items:start">
      <div class="form-card">
        <form id="ct-form" novalidate action="${SITE.FORMS_ENDPOINT}/contact" method="post">
          <input type="text" name="company" id="ct-company" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
          <input type="hidden" name="page" value="/contact/">
          <div class="field" id="c-name"><label for="ct-name">Name</label>
            <input id="ct-name" type="text" placeholder="Your name"><p class="err">Please enter your name.</p></div>
          <div class="field" id="c-email"><label for="ct-email">Email</label>
            <input id="ct-email" type="email" placeholder="you@example.com"><p class="err">Please enter a valid email address.</p></div>
          <div class="field"><label for="ct-topic">What can we help with?</label>
            <select id="ct-topic"><option>Individual classes</option><option>Family learning</option>
            <option>Team or workplace training</option><option>Nonprofit or community program</option>
            <option>Speaking or workshops</option><option>Something else</option></select></div>
          <div class="field" id="c-msg"><label for="ct-msg">Message</label>
            <textarea id="ct-msg" rows="5" placeholder="Tell us a little about what you’re trying to accomplish."></textarea>
            <p class="err">Please add a short message.</p></div>
          <button class="btn btn-primary btn-lg" style="width:100%" type="submit" id="ct-submit">Send message</button>
          <p class="err" id="ct-error" style="text-align:center;margin-top:12px"></p>
        </form>
        <div class="success hide" id="ct-success" role="status">
          <div class="card-icon teal" style="margin:0;width:38px;height:38px;border-radius:11px;flex:none">${I('check',20)}</div>
          <div><h4>Message received.</h4><p>Thanks — we typically reply within two business days.</p></div>
        </div>
      </div>
      <div class="stack">
        ${[['user','Individuals & families','Start with the assessment — it takes ninety seconds and gives you a real plan.','Find my starting point',url('/assessment/')],
           ['briefcase','Teams & workplaces','Group enrollment, cohort scheduling, and workplace-specific curriculum.','See the work path',url('/paths/work/')],
           ['heart','Nonprofits & community groups','Discounted cohorts and community program design for mission-driven organizations.','See the nonprofit path',url('/paths/nonprofits/')]]
          .map(([ic,t,d,cta,href],i)=>`<div class="card"><div class="card-icon ${i===1?'teal':i===2?'amber':''}">${I(ic,22)}</div>
            <h3 style="font-size:1.08rem">${t}</h3><p style="font-size:.95rem">${d}</p>
            <div class="card-foot"><a class="btn btn-quiet btn-sm" href="${href}">${cta} ${I('arrow',15)}</a></div></div>`).join('')}
        <div class="card" style="background:#F7FAFD">
          <h4 style="font-size:.75rem;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">Policies</h4>
          <p class="small muted" style="margin:0">Privacy Policy, Terms of Service, and Accessibility Statement placeholders live here. Final legal copy will be added before launch.</p>
        </div>
      </div>
    </div></div></section>`;
}

function viewNotFound(){
  return `<section class="sec"><div class="wrap-narrow center" style="padding-top:60px">
    <p class="eyebrow">404</p>
    <h1 style="margin-bottom:18px">We couldn’t find that page.</h1>
    <p class="lede" style="margin-bottom:30px">The link may be out of date. Try the class catalog or start with the assessment.</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn-primary" href="${url('/classes/')}">Explore Classes</a>
      <a class="btn btn-ghost" href="${url('/')}">Back home</a>
    </div>
  </div></section>`;
}

export {viewLabs, viewResources, viewAbout, viewNewsletter, viewAssessment, viewMember, viewContact, viewNotFound};
