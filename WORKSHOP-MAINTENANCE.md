# Updating the older adult workshop

The workshop is part of LifeQuest AI at `/workshop/`.

Edit `src/workshop/index.html` for the workshop home, `src/workshop/lessons/lesson-1.html` through `lesson-5.html` for lessons, `src/workshop/handouts.html` for take-home material, `src/workshop/safety.html` for the safety guide, and `src/workshop/style.css` for its design. Inline JavaScript controls the menu, theme toggle, and print buttons. These are static files; no package installation or API key is needed.

Run `npm run build`. It regenerates `docs/workshop/` with the rest of the site and adds workshop pages to the sitemap. Do not edit `docs/` directly. The build resolves `__LIFEQUEST_HOME__` in workshop footers and inserts canonical URLs.

The Resources feature card lives in `src/pages/misc.mjs`. The main site's footer link lives in `src/lib/layout.mjs`.

Preview with `npm run serve`, then visit `/workshop/` and `/resources/`. Check the changed lesson, previous/next links, handouts anchors, phone menu, and relevant print behavior. Obtain Roger's approval for publication before committing/pushing the reviewed source and generated output. Verify the live pages after GitHub Pages finishes deploying.

## Toolkit and PDF updates

`src/workshop/toolkit.json` is the shared content source for the web worksheets, lesson activities, and PDFs. `src/workshop/family-safety.html` is the shared guidance shown on lesson 3 and the Safety Tips page. The workshop renderer is `src/lib/workshop.mjs`.

After changing toolkit content, run `python3 scripts/build-workshop-pdf.py` in a Python environment with `reportlab` and `pypdf`, then `npm run build`. The generator creates the seven-page booklet and seven single-page PDFs in `output/pdf/` and copies release assets into `src/workshop/downloads/`. Inspect rendered PDF pages before publication. Commit the generator, content, source PDFs and manifest, and generated `docs/` together. Ordinary builds need only Node; they copy the prepared PDFs. The build fails when toolkit content or PDFs do not match the manifest, preventing stale downloads.

If adding a sixth lesson or another page, update the workshop file list in `src/lib/workshop.mjs`, lesson navigation, and the home/handout links together.

Publication was authorized by Roger in this task on September 9, 2026, including the balanced toolkit, PDFs, and family code word guidance. Future publication requests still follow the normal approval workflow.

Imported September 9, 2026 from the public static site at https://ai-literacy-site.vercel.app/. The source content was preserved, with LifeQuest branding and navigation added. No backend, private source history, or Vercel account settings were recovered or needed for the observed static functionality.
