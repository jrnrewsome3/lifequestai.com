import {I} from '../lib/icons.mjs';
import {url} from '../config.mjs';
import {esc, byId, levelBadges, Photo, Figure, PageHero, CtaBand,
        postsSorted, readingTime, longDate, PostCard, PostToClass,
        RelatedPosts, NewsletterInline} from '../lib/components.mjs';
import {POSTS} from '../data/posts.mjs';

/* ======================= BLOG INDEX ======================= */
function viewBlog(){
  const posts = postsSorted();
  const cats = [...new Set(posts.map(p=>p.category))];
  const [lead, ...rest] = posts;

  return PageHero('The LifeQuest Blog','Learn Something Useful Today',
    'Short, practical articles on using AI in real life and real work. Every one teaches something you can try the same day — and points you to the class that goes deeper.')
  + `<section class="sec-tight"><div class="wrap">
      <p class="eyebrow" style="margin-bottom:18px">Latest</p>
      ${PostCard(lead, true)}
    </div></section>

    <section class="sec-tight" style="padding-top:0"><div class="wrap">
      <div class="toolbar">
        <div class="search-field">
          ${I('search',18)}
          <label class="sr" for="post-q">Search posts</label>
          <input id="post-q" type="search" placeholder="Search posts…" autocomplete="off">
        </div>
        <div class="filter-group" id="post-cats" role="group" aria-label="Filter by category">
          <button class="pill" data-cat="All topics" aria-pressed="true">All topics</button>
          ${cats.map(c=>`<button class="pill" data-cat="${esc(c)}" aria-pressed="false">${c}</button>`).join('')}
        </div>
      </div>
      <p class="result-count" id="post-count" role="status" style="margin-bottom:20px"></p>
      <div class="grid g3" id="post-results">
        ${rest.map(p=>PostCard(p)).join('')}
      </div>
      <div id="post-empty" class="empty hide">
        <h3>No posts match that.</h3>
        <p class="muted" style="max-width:44ch;margin:0 auto 20px">Try a different word, or clear the filters to see everything.</p>
        <button class="btn btn-ghost" id="post-clear">Clear filters</button>
      </div>
    </div></section>

    <section class="sec-tight"><div class="wrap">${NewsletterInline()}</div></section>`
  + CtaBand();
}

/* ======================= SINGLE POST ======================= */
function viewPost(post){
  const c = byId(post.classId);
  return `
  <article class="article">
    <header class="article-head"><div class="wrap-narrow">
      <div class="crumbs"><a href="${url('/')}">Home</a> ${I('chev',13)} <a href="${url('/blog/')}">Blog</a> ${I('chev',13)} <span>${post.category}</span></div>
      <p class="eyebrow">${post.category}</p>
      <h1>${post.title}</h1>
      <p class="lede">${post.dek}</p>
      <div class="byline">
        <div class="avatar">${I('user',18)}</div>
        <div>
          <div class="n">LifeQuest AI</div>
          <div class="r">${longDate(post.date)} · ${readingTime(post)}</div>
        </div>
      </div>
    </div></header>

    <div class="wrap">
      ${Figure(c.slug, '', '', 'banner')}
    </div>

    <div class="wrap-narrow article-body">
      ${post.body.trim()}
    </div>

    <div class="wrap-narrow">${NewsletterInline()}</div>

    <div class="wrap">${PostToClass(post)}</div>

    <section class="sec"><div class="wrap">
      <div class="sec-head"><p class="eyebrow teal">Keep reading</p><h2 style="font-size:1.7rem">More from the blog</h2></div>
      ${RelatedPosts(post)}
    </div></section>
  </article>`;
}

export {viewBlog, viewPost};
