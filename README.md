# LifeQuest AI — website

The LifeQuest AI website: practical AI education for life, work, business, and community.

Static site. No frameworks, no dependencies to install, nothing to break. Content lives in
plain data files; a small build script turns them into finished web pages.

**Live site:** https://lifequestai.com

---

## The 60-second version

| I want to… | Do this |
| --- | --- |
| Add a blog post | Edit `src/data/posts.mjs`, run `npm run build`, commit |
| Add or edit a class | Edit `src/data/classes.mjs`, run `npm run build`, commit |
| Change wording on a page | Edit the matching file in `src/pages/`, run `npm run build`, commit |
| Change colors or fonts | Edit the top of `src/styles.css`, run `npm run build`, commit |
| Preview before publishing | `npm run serve` then open http://localhost:8080/ |

**The one rule: always run `npm run build` before you commit.** The `docs/` folder is what the
public actually sees, so if you skip the build your change won't appear on the site.

---

## How to work on this

You need [Node.js](https://nodejs.org) version 18 or newer. Nothing else — there is no
`npm install` step because this project has zero dependencies.

```bash
npm run build     # rebuild the site into docs/
npm run serve     # rebuild, then preview at localhost:8080
```

`npm run serve` keeps running until you stop it with `Ctrl+C`.

---

## Adding a blog post

1. Open `src/data/posts.mjs`
2. Copy an existing post block and paste it **at the top** of the list (newest first)
3. Change these fields:

| Field | What it does |
| --- | --- |
| `slug` | The web address: `/blog/your-slug/`. Lowercase, dashes, no spaces |
| `title` | The headline |
| `dek` | One-sentence summary. Shows on cards and in Google results |
| `category` | Groups posts on the blog page. Match an existing spelling to reuse it |
| `date` | `YYYY-MM-DD` |
| `classId` | Which class this post should sell (1–10). This drives the CTA at the bottom |
| `body` | The article, in simple HTML |

4. Run `npm run build`, then commit and push.

Writing the `body`: use `<p>` for paragraphs, `<h2>` for section headings, `<ul><li>` for
bullets, `<blockquote>` for a pull quote, and `<strong>` for emphasis. Reading time is
calculated automatically. You do not need to touch any other file — the post appears on the
blog index, the home page, related-post lists, and the sitemap on its own.

**Why `classId` matters:** every post ends with a block that says "this post explained the
idea, the class builds the skill" and links to that class. That's how the blog turns readers
into students, so pick the class the post naturally leads toward.

---

## Project layout

```
src/
  config.mjs          Site name, description, and BASE_PATH (see "Moving to your own domain")
  styles.css          All styling. Design tokens (colors, spacing, fonts) are at the top
  app.js              Browser behaviour: menu, filters, accordion, forms, assessment
  data/
    posts.mjs         Blog posts            <- edit this to blog
    classes.mjs       The 10 classes        <- edit this to change curriculum
    tracks.mjs        The 5 learning paths
    labs.mjs          The 10 AI Labs
    site.mjs          Resources, events, testimonials, outcomes, metrics
    quiz.mjs          Assessment questions and scoring
    photos.mjs        Photo assignments (free-license Unsplash images)
  lib/
    layout.mjs        Page shell: <head> tags, header, mobile menu, footer
    components.mjs    Reusable pieces: cards, badges, banners, CTA blocks
    icons.mjs         Inline SVG icons
  pages/              One file per page type — the actual page content
build.mjs             The build script: reads src/, writes docs/
docs/                 GENERATED. Never edit by hand — the build overwrites it
```

Anything in `docs/` is output. Edit `src/`, run the build, and `docs/` regenerates.

---

## Hosting

The site is served by **GitHub Pages** straight from the `docs/` folder on `main` — no CI, no
build server, nothing to debug. The finished HTML is committed, and Pages just serves it.

To turn it on (one time only):

1. Go to **Settings → Pages** in this repository
2. Under **Source**, choose **Deploy from a branch**
3. Branch: **main**, Folder: **/docs**
4. Click **Save**

The site goes live about a minute later, and every later push to `main` updates it.

*Optional upgrade:* if you'd rather have GitHub run the build for you (so you never have to
remember `npm run build`), you can add a Pages workflow under `.github/workflows/` and switch
the Pages source to **GitHub Actions**. Not required — the setup above works as-is.

### The custom domain

The site is served at **lifequestai.com**. Two things make that work:

- `docs/CNAME` contains the domain name. This is how GitHub Pages knows to claim it.
  The build script never deletes this file.
- `BASE_PATH` in `src/config.mjs` is `'/'`, so every internal link points at the domain root.

DNS lives at **Cloudflare**: four `A` records on the apex pointing at GitHub's Pages IPs, and a
`CNAME` on `www` pointing at `jrnrewsome3.github.io`. Those records must stay **DNS only**
(grey cloud, not proxied) — Cloudflare's proxy in front of GitHub Pages breaks certificate
issuance and can cause redirect loops.

If you ever move the site somewhere else, change `BASE_PATH`, update `docs/CNAME`, and rebuild.

---

## Known limitations

**The course catalog is a roadmap.** `/classes/` describes the classes we plan to teach and
says so; none has a date until 10 people ask for it. Sample testimonials, instructor
placeholders, and fictional newsletter issues were removed in October 2026. The member
dashboard and resource library are hidden behind feature flags until they're real.

**Fonts and photos load from Google Fonts and Unsplash.** Self-hosting them (download into
the repo, point `layout.mjs` and `photos.mjs` at local files) is the next cleanup.

**The photos are stock.** They're free-license images from [Unsplash](https://unsplash.com)
and fine to use commercially, but they're generic. Swapping in photos of your actual classes
and learners is the single biggest credibility upgrade available here.

---

## How classes work (the model, as of October 2026)

- **Every class is one live 2-hour session**, up to 10 people, online (Zoom/Teams) or in person in Tallahassee. **$99 per class.** Never multi-session.
- **Three tiers** on the Classes page: Start here (01, 02), Build on it (03–07, 11), Advanced (08–10). Each class lists prerequisites, a "Before class" prep checklist with a time estimate, a free "Try it now" prompt, two or three "Good to know" facts, and "What's next".
- **Labs** are follow-on 2-hour build sessions, also $99, each tied to the class it follows.
- **The AI Training funnel** (`/ai-training/`) sends every group to **Class 01, taught with that group's examples**. Each group page shows its own "After your first class" path (`path` in `src/data/training.mjs`).

## Adding, changing, and retiring classes (the content playbook)

All class content is in **`src/data/classes.mjs`**; the comment at the top explains every field. Labs are in `labs.mjs`, learning paths in `tracks.mjs`, the AI Training groups in `training.mjs`.

**Add a class**
1. Copy an existing entry in `classes.mjs`. Give it the next `id`, a two-digit `num`, a unique `slug`, and a `title`.
2. Write the fields. `agenda` must add up to 120 minutes and include a break. `prep.items` is what people do before class. `tryNow` uses fictional sample data only.
3. Set `status:'coming'` while the facilitator guide is being written (the page shows an "In development" badge). Switch to `'active'` when you're ready to run it.
4. Add its `id` to the right learning paths in `tracks.mjs`, and to other classes' `nextIds` where it fits. Optionally add a photo key in `photos.mjs` (otherwise the hero photo is used).
5. `npm run build`. The build **fails on purpose** if a track, lab, post, `nextIds`, or `relatedIds` points at a class that isn't shown, or if an agenda doesn't add up to 120.
6. Write the facilitator guide (private, not in this repo) in the same shape as the others.

**Change a class**: edit the entry, rebuild, push. Page sections update themselves.

**Retire a class**
- `status:'retired'`: the page stays up with a "No longer offered" note pointing at its `nextIds`, and drops out of the catalog, paths, and sitemap. Use this when people may have the link.
- `status:'hidden'`: the page is replaced by a redirect to `/classes/`. Use this when nobody has the link yet.
- Either way, remove its `id` from `tracks.mjs` and from other classes' `nextIds`/`relatedIds` (the build tells you where). Blog posts that pointed at it fall back automatically.

**Add a lab**: add an entry to `labs.mjs` with the `classId` it follows, a `slug`, title, description, deliverable, and tools. Add its `slug` to a track's `labSlugs` if it belongs on a path. Duration is always `'2 hours'`.

**Add a learning group** (AI Training): add an entry to `GROUPS` in `training.mjs` with examples, a sample task, a `photo` key, and a `path` of class ids. The join form's group list updates itself; also add the label to `GROUP_LABELS` in `src/training-form.mjs`.

## Running classes: interest lists, confirmed dates, and Stripe

There is no fixed launch month. A class is scheduled when **10 people ask for the same
class** (`LAUNCH.minimum` in `src/data/training.mjs`). Every class is **$99** (`LAUNCH.typicalPrice`),
one 2-hour session.

When a group reaches 10 and you've picked a date:

1. In Stripe, create a **Payment Link** for that class and price (Products → Payment Links).
2. In `src/data/training.mjs`, find the group and fill in its `session`:
   ```js
   session:{status:'confirmed', date:'Tuesday, November 10, 2026 · 6:00–8:00 PM ET',
            format:'Live online (Zoom)', price:'$99', paymentLink:'https://buy.stripe.com/...'}
   ```
3. `npm run build`, commit, push. That group's page now shows an **Enroll** button.
4. When it fills, set `status:'full'`. After the class, set it back to `'forming'` and clear the fields.

The Enroll button only appears when `status` is `'confirmed'` **and** `paymentLink` is set.

## Legal pages and site settings

- **Privacy Policy, Terms, Accessibility** live at `/privacy/`, `/terms/`, `/accessibility/`
  (source: `src/pages/legal.mjs`). Business name, location, contact email, and effective date
  come from `SITE.LEGAL` in `src/config.mjs`. **Update these pages whenever you add a form,
  a new tool that receives visitor data, or change the refund policy** — and bump the date.
- **Feature flags** (`SITE.FLAGS` in `src/config.mjs`) keep unfinished sections hidden:
  `memberArea` (the `/member/` dashboard preview) and `resourceLibrary` (the guides grid on
  `/resources/`). Turn one on only when the thing behind it is real.
- **Analytics**: paste a Cloudflare Web Analytics site token into `SITE.ANALYTICS_TOKEN` and
  rebuild. It's cookieless, so no consent banner is needed. The privacy page updates itself.
- **Structured data** (JSON-LD for the organization, each class, and each blog post) is
  generated in `build.mjs`.

## Security headers, HTTPS, and spam protection

The domain runs through Cloudflare's proxy (orange cloud) in front of GitHub Pages, with
SSL mode **Full (strict)** and **Always Use HTTPS** on. A Cloudflare **Response Header
Transform Rule** ("LifeQuest security headers") adds HSTS, Content-Security-Policy,
X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.

**If you add a new outside service** (an embedded video, a new script, images from another
host), add its domain to the Content-Security-Policy in that rule or the browser will block it.
The policy allows inline scripts because the workshop pages use small inline theme scripts.

**Turnstile** (Cloudflare's invisible bot check) protects all three forms. The public site key
is `SITE.TURNSTILE_SITEKEY` in `src/config.mjs`; the secret is the Worker secret
`TURNSTILE_SECRET`. To switch it off, delete that Worker secret first, then clear the site key.

## Forms and submissions

The newsletter and contact forms post to a small **Cloudflare Worker in your own Cloudflare
account** — no third-party form service, no monthly fee, and you own the data.

- Worker source: `worker/worker.js` in this repo
- Deployed as: `lifequest-forms` (endpoint `https://lifequest-forms.jrnewsome.workers.dev`)
- Storage: the `lifequest-forms` **D1** database, table `submissions`
- The endpoint URL lives in `src/config.mjs` as `FORMS_ENDPOINT`

### Reading your submissions

Two ways:

1. **Download a CSV** — open this in a browser (replace `YOUR_KEY` with the export key):
   `https://lifequest-forms.jrnewsome.workers.dev/export?key=YOUR_KEY`
   Add `&kind=newsletter` or `&kind=contact` to filter.
2. **In the Cloudflare dashboard** — Workers & Pages → D1 → `lifequest-forms` → Console, then run:
   `SELECT * FROM submissions ORDER BY id DESC;`

`/count?key=YOUR_KEY` returns how many of each kind you have.

The export key is stored as a secret on the Worker (Cloudflare dashboard → Workers & Pages →
`lifequest-forms` → Settings → Variables). Treat it like a password — anyone with it can
download your subscriber list. To rotate it, change the secret in the dashboard.

### What the Worker protects against

- **Spam bots** — a hidden honeypot field. Bots fill it, real people can't see it. Those
  submissions are silently discarded.
- **Double submissions** — the same email to the same form inside two minutes is ignored.
- **Other sites posting to it** — CORS only allows `lifequestai.com` and `www.lifequestai.com`.

### Email notifications

Every new submission is emailed to **roger@lifequestai.com**, with Reply-To set to the
person who submitted, so you can answer straight from your inbox. This uses Resend
(the `lifequestai.com` domain is verified there).

- Turned on by the Worker secret **`RESEND_API_KEY`** (Cloudflare → Workers & Pages →
  `lifequest-forms` → Settings → Variables and Secrets). Without it, submissions are still
  saved; they just aren't emailed.
- Optional plain-text variables: `NOTIFY_TO` (change the inbox) and `NOTIFY_FROM`
  (default `LifeQuest AI Forms <forms@lifequestai.com>`).
- Saving never depends on the email. If Resend is down, the row is still in D1.

---

## License

Site content © LifeQuest AI. Photography is free-license imagery from Unsplash.
