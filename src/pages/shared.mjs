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

function NewsletterSection(){
  return `<section class="sec"><div class="wrap">
    <div class="grid g2" style="gap:clamp(28px,5vw,60px);align-items:center">
      <div>
        <p class="eyebrow amber">Newsletter</p>
        <h2>Stay Ahead Without Chasing AI News</h2>
        <p class="lede">Get practical AI ideas, new tools, class announcements, tutorials, and one useful AI challenge delivered to your inbox.</p>
        <div class="stack" style="gap:12px;margin-top:26px">
          ${NEWSLETTER_ISSUES.map(n=>`<div class="mini">
            <div class="mini-ic">${I('mail',17)}</div>
            <div><div class="t">${n.title}</div><div class="s">${n.no} — ${n.teaser}</div></div>
          </div>`).join('')}
        </div>
        <p class="tiny muted" style="margin-top:16px">Sample past issues shown for this prototype.</p>
      </div>
      <div class="form-card">
        <form id="nl-form" novalidate>
          <h3 style="margin-bottom:8px">Join the newsletter</h3>
          <p class="small muted" style="margin-bottom:24px">One email a week. Useful AI, no hype.</p>
          <div class="field" id="f-name">
            <label for="nl-name">First name</label>
            <input id="nl-name" type="text" autocomplete="given-name" placeholder="Your first name">
            <p class="err">Please enter your first name.</p>
          </div>
          <div class="field" id="f-email">
            <label for="nl-email">Email address</label>
            <input id="nl-email" type="email" autocomplete="email" placeholder="you@example.com">
            <p class="err">Please enter a valid email address.</p>
          </div>
          <div class="field">
            <label for="nl-interest">I’m most interested in <span class="muted" style="font-weight:400">(optional)</span></label>
            <select id="nl-interest">
              <option value="">Choose one…</option>
              <option>AI for Personal Life</option><option>AI for Families</option>
              <option>AI for Work</option><option>AI for Small Business</option>
              <option>AI for Nonprofits</option><option>AI Automation &amp; Agents</option>
            </select>
          </div>
          <button class="btn btn-primary btn-lg" style="width:100%;margin-top:8px" type="submit">Join the LifeQuest AI Newsletter</button>
          <p class="hint" style="text-align:center;margin-top:14px">Useful AI. No hype. Unsubscribe anytime.</p>
          <p class="tiny muted" style="text-align:center;margin-top:10px">We use your email only to send the newsletter and class announcements. We never sell or share it. Prototype form — nothing is submitted.</p>
        </form>
        <div class="success hide" id="nl-success" role="status">
          <div class="card-icon teal" style="margin:0;width:38px;height:38px;border-radius:11px;flex:none">${I('check',20)}</div>
          <div><h4>You’re on the list.</h4>
          <p>Check your inbox for a confirmation and your first practical AI challenge. In this prototype no email is actually sent.</p></div>
        </div>
      </div>
    </div>
  </div></section>`;
}

function DashboardPreview(){
  const cur = byId(4), nxt = byId(8);
  return `<div class="dash">
    <div class="dash-bar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span class="tiny muted" style="margin-left:10px;font-family:var(--sans);font-weight:600">LifeQuest AI — Member Dashboard (prototype)</span>
    </div>
    <div class="dash-body">
      <div class="stack">
        <div>
          <p class="eyebrow" style="margin-bottom:6px">Welcome back</p>
          <h3 style="font-size:1.5rem">Good afternoon, sample member.</h3>
          <p class="small muted" style="margin:6px 0 0">You’re three lessons from finishing your current class.</p>
        </div>
        <div class="panel">
          <h4>Continue learning</h4>
          <div class="badges" style="margin-bottom:10px">${levelBadges(cur)}</div>
          <h3 style="font-size:1.12rem">${cur.num} — ${cur.title}</h3>
          <div class="bar"><i style="width:68%"></i></div>
          <div class="row-between"><span class="tiny muted">Lesson 8 of 12 · 68% complete</span>
          <a class="btn btn-quiet btn-sm" href="${url('/classes/'+cur.slug+'/')}">Resume ${I('arrow',15)}</a></div>
        </div>
        <div class="panel">
          <h4>My AI journey</h4>
          <p class="small" style="margin:0;color:var(--ink-2)">You are in the <strong>Apply</strong> stage — using AI on real work every week.</p>
          <div class="stage-track">
            <span class="stage done">Connect</span><span class="stage done">Learn</span>
            <span class="stage now">Apply</span><span class="stage">Elevate</span>
          </div>
        </div>
        <div class="panel">
          <h4>Recommended next</h4>
          <div class="mini" style="border:0;padding:0">
            <div class="mini-ic">${I('sparkle',17)}</div>
            <div><div class="t">${nxt.num} — ${nxt.title}</div>
            <div class="s">Because you finished the productivity workflows and asked about monitoring.</div></div>
          </div>
          <div style="margin-top:14px"><a class="btn btn-ghost btn-sm" href="${url('/classes/'+nxt.slug+'/')}">Preview class</a></div>
        </div>
      </div>
      <div class="stack">
        <div class="panel">
          <h4>My toolkit</h4>
          <div class="mini"><div class="mini-ic">${I('file',17)}</div><div><div class="t">14 saved prompts</div><div class="s">Email triage, meeting prep, research briefs</div></div></div>
          <div class="mini"><div class="mini-ic">${I('grid',17)}</div><div><div class="t">4 connected tools</div><div class="s">ChatGPT, Claude, Outlook, Zapier</div></div></div>
          <div class="mini"><div class="mini-ic">${I('flask',17)}</div><div><div class="t">2 labs completed</div><div class="s">Morning Brief · Meeting Prep Assistant</div></div></div>
          <div class="mini"><div class="mini-ic">${I('zap',17)}</div><div><div class="t">1 automation live</div><div class="s">Weekly report draft — runs Fridays 7am</div></div></div>
        </div>
        <div class="panel">
          <h4>Upcoming sessions</h4>
          ${EVENTS.slice(0,3).map(e=>`<div class="mini">
            <div class="mini-ic">${I('calendar',17)}</div>
            <div><div class="t">${e.title}</div><div class="s">${e.day} ${e.date} · ${e.time}</div></div>
          </div>`).join('')}
          <div style="margin-top:12px"><a class="btn btn-quiet btn-sm" href="${url('/resources/')}">All sessions ${I('arrow',15)}</a></div>
        </div>
      </div>
    </div>
  </div>`;
}

export {NewsletterSection, DashboardPreview};
