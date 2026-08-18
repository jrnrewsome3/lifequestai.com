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

function viewPaths(){
  return PageHero('Learning Paths','Choose Your Path',
    'Instead of forcing everyone through the same curriculum, LifeQuest AI sequences classes and labs around your situation. Pick a track and you get an ordered plan — not a catalog.')
  + `<section class="sec-tight"><div class="wrap"><div class="grid g3">${TRACKS.map(PathCard).join('')}</div></div></section>`
  + `<section class="sec tint"><div class="wrap">
      <div class="sec-head center"><h2 style="font-size:1.9rem">Every path climbs the same ladder</h2>
      <p class="lede">Different starting points, same progression — literacy through agency.</p></div>
      <div class="center">${LadderStrip()}</div>
    </div></section>`
  + CtaBand();
}

function viewPath(slug){
  const t = trackBySlug(slug);
  if(!t) throw new Error('Unknown path slug: '+slug);
  const classes = t.classIds.map(byId);
  const labs = t.labSlugs.map(labBySlug);
  return `
  <section class="page-hero"><div class="wrap">
    <div class="crumbs"><a href="${url('/')}">Home</a> ${I('chev',13)} <a href="${url('/paths/')}">Learning Paths</a> ${I('chev',13)} <span>${t.title}</span></div>
    <p class="eyebrow">Learning Path</p>
    <h1>${t.title}</h1>
    <p class="lede">${t.desc}</p>
    <div class="meta" style="margin-top:22px;gap:10px 22px">
      <span>${I('user',16)} ${t.forWho}</span>
    </div>
    <div class="meta" style="margin-top:8px;gap:10px 22px">
      <span>${I('book',16)} ${classes.length} classes</span>
      <span>${I('flask',16)} ${labs.length} labs</span>
      <span>${I('clock',16)} ${t.duration}</span>
    </div>
    <div class="btn-row" style="margin-top:26px">
      <a class="btn btn-primary" href="${url('/classes/'+classes[0].slug+'/')}">Start with ${classes[0].num} — ${classes[0].title}</a>
      <a class="btn btn-ghost" href="${url('/assessment/')}">Compare with my assessment</a>
    </div>
  </div></section>

  <section class="sec-tight" style="padding-bottom:0"><div class="wrap">
    ${Figure(t.slug, t.title, t.forWho, 'banner')}
  </div></section>

  <section class="sec-tight"><div class="wrap">
    <div class="card" style="border-left:3px solid var(--teal);border-radius:var(--r-md);margin-bottom:44px">
      <p class="eyebrow teal" style="margin-bottom:10px">What you finish with</p>
      <p style="margin:0;font-size:1.05rem;color:var(--ink)">${t.outcome}</p>
    </div>
    <div class="sec-head" style="margin-bottom:28px"><h2 style="font-size:1.8rem">The sequence</h2>
    <p class="lede">Take them in this order. Each one assumes what the last one taught.</p></div>
    <div class="stack" style="gap:16px">
      ${classes.map((c,i)=>`<div class="card" style="flex-direction:row;gap:24px;align-items:flex-start;padding:24px">
        <div style="flex:none;text-align:center">
          <div class="step-dot" style="margin:0 auto">${i+1}</div>
        </div>
        <div style="flex:1">
          <div class="badges" style="margin-bottom:10px">${levelBadges(c)}</div>
          <h3 style="margin-bottom:8px">${c.num} — ${c.title}</h3>
          <p style="color:var(--ink-2);font-size:.95rem;margin-bottom:14px">${c.blurb}</p>
          <div class="meta"><span>${I('clock',15)} ${c.duration}</span><span>${I('book',15)} ${c.lessons} lessons</span></div>
        </div>
        <div style="flex:none;align-self:center"><a class="btn btn-ghost btn-sm" href="${url('/classes/'+c.slug+'/')}">View class</a></div>
      </div>`).join('')}
    </div>
  </div></section>

  <section class="sec tint"><div class="wrap">
    <div class="sec-head"><p class="eyebrow amber">Apply</p><h2 style="font-size:1.8rem">Labs in this path</h2>
    <p class="lede">Each lab pairs with a class above and produces something you keep.</p></div>
    <div class="grid g3">${labs.map(LabCard).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-head"><h2 style="font-size:1.8rem">Other paths</h2></div>
    <div class="grid g4">${TRACKS.filter(x=>x.slug!==t.slug).map(PathCard).join('')}</div>
  </div></section>
  ${CtaBand()}`;
}

export {viewPaths, viewPath};
