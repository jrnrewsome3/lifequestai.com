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

**Some content is sample content.** Instructor profiles, testimonials, the events calendar,
and the member dashboard are illustrative placeholders, and they're labeled as such on the
site. Replace them with real details before running paid traffic to the site.

**The photos are stock.** They're free-license images from [Unsplash](https://unsplash.com)
and fine to use commercially, but they're generic. Swapping in photos of your actual classes
and learners is the single biggest credibility upgrade available here.

---

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

### One thing it does not do yet

It **stores** submissions but doesn't **email** you when one arrives — you have to check.
Your DNS shows a Resend setup (`resend._domainkey`), so if you add a Resend API key as a
Worker secret, the Worker can email you on each submission. Ask and it's a small addition.

---

## License

Site content © LifeQuest AI. Photography is free-license imagery from Unsplash.
