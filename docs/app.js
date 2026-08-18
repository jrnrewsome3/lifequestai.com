/* =====================================================================
   LifeQuest AI — client-side behaviour
   Pages are real HTML; this file only adds interactivity.
   The data placeholder below is filled in by the build script.
   ===================================================================== */
(function () {
  'use strict';

  var LQ = {"base":"/","quiz":[{"q":"How often do you currently use AI?","k":"freq","opts":[{"t":"Never — I’m just getting curious","v":{"me":1,"families":1},"lvl":0},{"t":"Occasionally, for simple questions","v":{"me":2,"work":1},"lvl":1},{"t":"Most weeks, for real work","v":{"work":2,"small-business":1},"lvl":2},{"t":"Daily — I’m ready to automate","v":{"work":2,"small-business":2},"lvl":3}]},{"q":"Where would AI help you most?","k":"where","multi":true,"opts":[{"t":"My personal life and productivity","v":{"me":3}},{"t":"My family and household","v":{"families":3}},{"t":"My career and workplace","v":{"work":3}},{"t":"My business or side venture","v":{"small-business":3}},{"t":"A nonprofit or community organization","v":{"nonprofits":3}}]},{"q":"Which tools do you already use?","k":"tools","multi":true,"opts":[{"t":"ChatGPT, Claude, or Gemini","v":{},"lvl":1},{"t":"Microsoft 365 or Google Workspace","v":{"work":1},"lvl":1},{"t":"A CRM, spreadsheets, or a database","v":{"small-business":1},"lvl":2},{"t":"Zapier, Make, or other automation tools","v":{"small-business":1,"work":1},"lvl":3},{"t":"None of these yet","v":{"families":1},"lvl":0}]},{"q":"What would you most like AI to help you accomplish?","k":"goal","opts":[{"t":"Understand AI well enough to start using it","v":{"me":1,"families":1},"lvl":0},{"t":"Get time back on everyday tasks","v":{"me":2,"work":1},"lvl":1},{"t":"Run my household or family life more smoothly","v":{"families":3},"lvl":0},{"t":"Make my organization measurably more effective","v":{"small-business":2,"nonprofits":2},"lvl":2},{"t":"Build automations and AI assistants that work for me","v":{"work":2,"small-business":2},"lvl":3}]}],"tracks":[{"slug":"me","title":"AI for Me","desc":"Personal productivity, learning, organization, and everyday life.","outcome":"A personal AI assistant, a reusable prompt library, and a daily brief that runs itself.","classIds":[1,2,3,4],"labSlugs":["morning-brief","research-assistant","knowledge-library"]},{"slug":"families","title":"AI for Families","desc":"Digital literacy and practical AI for households and multiple generations.","outcome":"A family planning assistant, safer AI habits across generations, and shared household workflows.","classIds":[1,2,5,6],"labSlugs":["family-planning","spending-analysis","knowledge-library"]},{"slug":"work","title":"AI for Work","desc":"Productivity, communication, research, Microsoft 365, and workplace automation.","outcome":"A meeting-prep assistant, one live automation, and a Chief of Staff blueprint for your role.","classIds":[2,4,8,9],"labSlugs":["meeting-prep","office-automation","chief-of-staff"]},{"slug":"small-business","title":"AI for Small Business","desc":"Marketing, operations, customer service, automation, and decision support.","outcome":"A prioritized AI opportunity map, two automated workflows, and your first working agent.","classIds":[2,7,9,10],"labSlugs":["newsletter-workflow","office-automation","first-agent"]},{"slug":"nonprofits","title":"AI for Nonprofits & Communities","desc":"AI adoption, communications, fundraising support, program development, and community impact.","outcome":"A communications workflow, a grant-research assistant, and a shared organizational knowledge library.","classIds":[1,2,7,9],"labSlugs":["newsletter-workflow","research-assistant","knowledge-library"]}],"classes":{"1":{"num":"01","title":"AI Made Simple","slug":"ai-made-simple","blurb":"Understand ChatGPT, Claude, Gemini, Copilot, and today’s major AI tools without technical jargon.","levels":["Beginner"]},"2":{"num":"02","title":"Prompting for Real Life","slug":"prompting-for-real-life","blurb":"Learn how to communicate effectively with AI — context, roles, examples, refinement, and reusable templates.","levels":["Beginner"]},"3":{"num":"03","title":"Your AI Personal Assistant","slug":"your-ai-personal-assistant","blurb":"Turn AI into a genuine assistant for planning, writing, research, organization, learning, and decisions.","levels":["Beginner","Intermediate"]},"4":{"num":"04","title":"AI for Everyday Productivity","slug":"ai-for-everyday-productivity","blurb":"Use AI to handle everyday work faster: email, meetings, research, documents, summaries, planning, and presentations.","levels":["Beginner","Intermediate"]},"5":{"num":"05","title":"AI for Your Family & Personal Life","slug":"ai-for-family-and-personal-life","blurb":"Practical, safe ways families use AI — meal planning, travel, education, schedules, major purchases, and household projects.","levels":["Beginner"]},"6":{"num":"06","title":"AI for Financial Empowerment","slug":"ai-for-financial-empowerment","blurb":"Use AI to understand your financial life — budgeting, spending analysis, savings goals, documents, and scenario planning.","levels":["Beginner","Intermediate"]},"7":{"num":"07","title":"AI for Small Business & Nonprofits","slug":"ai-for-small-business-and-nonprofits","blurb":"Use AI as a practical operating tool across marketing, communication, proposals, research, SOPs, and operations.","levels":["Intermediate"]},"8":{"num":"08","title":"Build Your AI Chief of Staff","slug":"build-your-ai-chief-of-staff","blurb":"Build an AI-powered executive assistant system that monitors, prepares, briefs, and follows up.","levels":["Intermediate"]},"9":{"num":"09","title":"AI Automation Lab","slug":"ai-automation-lab","blurb":"Move beyond prompting into AI-powered workflows: triggers, actions, connected apps, and human-in-the-loop approval.","levels":["Intermediate","Advanced"]},"10":{"num":"10","title":"Build Your First AI Agent","slug":"build-your-first-ai-agent","blurb":"Introduce agentic AI — tools, memory, instructions, data, actions, guardrails, and approvals — and ship a working agent.","levels":["Advanced"]}},"labs":{"morning-brief":{"title":"Build Your AI Morning Brief","desc":"Assemble a single daily brief that pulls together your calendar, priorities, and the two or three things you actually need to know before 9am."},"research-assistant":{"title":"Create a Personal Research Assistant","desc":"Configure an assistant that researches a topic properly — gathering, comparing, citing, and summarizing into a one-page brief you can act on."},"spending-analysis":{"title":"Analyze Your Monthly Spending","desc":"Turn one month of anonymized transactions into a clear picture: categories, patterns, recurring costs, and three findings worth acting on."},"meeting-prep":{"title":"Build a Meeting Preparation Assistant","desc":"Create an assistant that prepares you before every meeting: who is attending, what happened last time, what is outstanding, and what you should ask."},"newsletter-workflow":{"title":"Create an AI Newsletter Workflow","desc":"Build the full pipeline for a recurring newsletter — source gathering, drafting, review, and scheduling — with a human approval step before anything sends."},"family-planning":{"title":"Build a Family Planning Assistant","desc":"Set up a shared assistant for meals, schedules, activities, and household logistics that the whole family can actually use."},"office-automation":{"title":"Automate a Repetitive Office Task","desc":"Pick one genuinely tedious recurring task, map it, and automate it end to end — including error handling and a notification when something goes wrong."},"chief-of-staff":{"title":"Build an AI Chief of Staff","desc":"Stand up three modules of a Chief of Staff system — monitoring, preparation, and a daily briefing — and run them for a week."},"knowledge-library":{"title":"Create a Knowledge Library","desc":"Turn scattered documents, notes, and institutional knowledge into a searchable library your AI tools can reason over."},"first-agent":{"title":"Build Your First AI Agent","desc":"Design and ship an agent with real tools, real data, real guardrails, and a human approval checkpoint on anything consequential."}}};
  var u = function (p) { return LQ.base.replace(/\/+$/, '') + '/' + String(p).replace(/^\/+/, ''); };

  /* ---------------- mobile drawer ---------------- */
  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('scrim');
  var burger = document.getElementById('burger');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    scrim.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (burger) burger.setAttribute('aria-expanded', 'true');
    var first = drawer.querySelector('nav a');
    if (first) first.focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    scrim.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) burger.addEventListener('click', openDrawer);
  if (scrim) scrim.addEventListener('click', closeDrawer);
  var dClose = document.getElementById('drawer-close');
  if (dClose) dClose.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  /* ---------------- sticky header shadow ---------------- */
  var header = document.getElementById('header');
  function onScroll() { if (header) header.classList.toggle('stuck', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- curriculum accordion ---------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.acc-btn'), function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.classList.toggle('open', !open);
    });
  });

  /* ---------------- class catalog: search + filters ---------------- */
  (function () {
    var wrap = document.getElementById('results');
    if (!wrap) return;
    var q = document.getElementById('q');
    var trackSel = document.getElementById('track');
    var lvlWrap = document.getElementById('lvl');
    var count = document.getElementById('count');
    var empty = document.getElementById('catalog-empty');
    var cards = Array.prototype.slice.call(wrap.querySelectorAll('.course-card'));
    var level = 'All levels';

    function draw() {
      var term = (q.value || '').trim().toLowerCase();
      var tr = trackSel.value;
      var shown = 0;
      cards.forEach(function (card) {
        var okLvl = level === 'All levels' || card.dataset.levels.split('|').indexOf(level) > -1;
        var okTr = !tr || card.dataset.tracks.split('|').indexOf(tr) > -1;
        var okQ = !term || card.dataset.search.indexOf(term) > -1;
        var show = okLvl && okTr && okQ;
        card.classList.toggle('hide', !show);
        if (show) shown++;
      });
      if (empty) empty.classList.toggle('hide', shown > 0);
      var bits = [];
      if (level !== 'All levels') bits.push(level);
      if (tr) {
        var t = LQ.tracks.filter(function (x) { return x.slug === tr; })[0];
        if (t) bits.push(t.title);
      }
      count.textContent = 'Showing ' + shown + ' of ' + cards.length + ' classes' +
        (bits.length ? ' · ' + bits.join(' · ') : '');
    }

    q.addEventListener('input', draw);
    trackSel.addEventListener('change', draw);
    Array.prototype.forEach.call(lvlWrap.querySelectorAll('.pill'), function (p) {
      p.addEventListener('click', function () {
        level = p.dataset.lvl;
        Array.prototype.forEach.call(lvlWrap.querySelectorAll('.pill'), function (x) {
          x.setAttribute('aria-pressed', String(x === p));
        });
        draw();
      });
    });
    var clear = document.getElementById('clear-filters');
    if (clear) clear.addEventListener('click', function () {
      q.value = ''; trackSel.value = ''; level = 'All levels';
      Array.prototype.forEach.call(lvlWrap.querySelectorAll('.pill'), function (x) {
        x.setAttribute('aria-pressed', String(x.dataset.lvl === 'All levels'));
      });
      draw();
    });
    draw();
  })();

  /* ---------------- blog: search + category filters ---------------- */
  (function () {
    var wrap = document.getElementById('post-results');
    if (!wrap) return;
    var q = document.getElementById('post-q');
    var catWrap = document.getElementById('post-cats');
    var count = document.getElementById('post-count');
    var empty = document.getElementById('post-empty');
    var cards = Array.prototype.slice.call(wrap.querySelectorAll('.post-card'));
    var cat = 'All topics';

    function draw() {
      var term = (q.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var okC = cat === 'All topics' || card.dataset.cat === cat;
        var okQ = !term || card.dataset.search.indexOf(term) > -1;
        var show = okC && okQ;
        card.classList.toggle('hide', !show);
        if (show) shown++;
      });
      if (empty) empty.classList.toggle('hide', shown > 0);
      count.textContent = 'Showing ' + shown + ' of ' + cards.length + ' more posts' +
        (cat !== 'All topics' ? ' · ' + cat : '');
    }
    q.addEventListener('input', draw);
    Array.prototype.forEach.call(catWrap.querySelectorAll('.pill'), function (p) {
      p.addEventListener('click', function () {
        cat = p.dataset.cat;
        Array.prototype.forEach.call(catWrap.querySelectorAll('.pill'), function (x) {
          x.setAttribute('aria-pressed', String(x === p));
        });
        draw();
      });
    });
    var clear = document.getElementById('post-clear');
    if (clear) clear.addEventListener('click', function () {
      q.value = ''; cat = 'All topics';
      Array.prototype.forEach.call(catWrap.querySelectorAll('.pill'), function (x) {
        x.setAttribute('aria-pressed', String(x.dataset.cat === 'All topics'));
      });
      draw();
    });
    draw();
  })();

  /* ---------------- forms ---------------- */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()); }

  /**
   * Submit a form to the LifeQuest forms endpoint.
   * Shows the success panel on success; shows a real error (and keeps the
   * user's typing) if the network or the server fails. Never fakes success.
   */
  function wireForm(opts) {
    var form = document.getElementById(opts.formId);
    if (!form) return;
    var btn = document.getElementById(opts.submitId);
    var errBox = document.getElementById(opts.errorId);
    var successBox = document.getElementById(opts.successId);
    var originalLabel = btn ? btn.textContent : '';

    function showError(msg) {
      if (!errBox) return;
      errBox.textContent = msg;
      errBox.style.display = 'block';
    }
    function clearError() {
      if (!errBox) return;
      errBox.textContent = '';
      errBox.style.display = 'none';
    }

    // clear field-level errors as the user types
    opts.fields.forEach(function (f) {
      var el = document.getElementById(f.input);
      if (!el) return;
      el.addEventListener('input', function () {
        var wrap = document.getElementById(f.wrap);
        if (wrap) wrap.classList.remove('invalid');
        clearError();
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      // client-side validation first
      var firstBad = null;
      var ok = true;
      opts.fields.forEach(function (f) {
        var el = document.getElementById(f.input);
        var wrap = document.getElementById(f.wrap);
        if (!el || !wrap) return;
        var v = el.value;
        var bad = f.type === 'email' ? !validEmail(v)
                : f.type === 'text-min' ? v.trim().length < 5
                : !v.trim();
        wrap.classList.toggle('invalid', bad);
        if (bad) { ok = false; if (!firstBad) firstBad = el; }
      });
      if (!ok) { if (firstBad) firstBad.focus(); return; }

      if (btn) { btn.disabled = true; btn.textContent = opts.sendingLabel; }

      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts.payload())
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            return { status: res.status, data: data };
          });
        })
        .then(function (r) {
          if (r.status === 200 && r.data && r.data.ok) {
            form.classList.add('hide');
            if (successBox) successBox.classList.remove('hide');
            return;
          }
          if (r.status === 422 && r.data && r.data.errors) {
            // server disagreed with a field — mark it
            opts.fields.forEach(function (f) {
              var wrap = document.getElementById(f.wrap);
              if (wrap && r.data.errors[f.name]) wrap.classList.add('invalid');
            });
            showError('Please check the highlighted fields.');
          } else {
            showError('Something went wrong sending that. Please try again, or email us directly.');
          }
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        })
        .catch(function () {
          showError('We could not reach the server. Check your connection and try again.');
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        });
    });
  }

  var val = function (id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  };

  wireForm({
    formId: 'nl-form', submitId: 'nl-submit', errorId: 'nl-error', successId: 'nl-success',
    sendingLabel: 'Joining…',
    fields: [
      { input: 'nl-name', wrap: 'f-name', name: 'name', type: 'required' },
      { input: 'nl-email', wrap: 'f-email', name: 'email', type: 'email' }
    ],
    payload: function () {
      return {
        name: val('nl-name'), email: val('nl-email'),
        interest: val('nl-interest'), company: val('nl-company'),
        page: location.pathname
      };
    }
  });

  wireForm({
    formId: 'ct-form', submitId: 'ct-submit', errorId: 'ct-error', successId: 'ct-success',
    sendingLabel: 'Sending…',
    fields: [
      { input: 'ct-name', wrap: 'c-name', name: 'name', type: 'required' },
      { input: 'ct-email', wrap: 'c-email', name: 'email', type: 'email' },
      { input: 'ct-msg', wrap: 'c-msg', name: 'message', type: 'text-min' }
    ],
    payload: function () {
      return {
        name: val('ct-name'), email: val('ct-email'),
        topic: val('ct-topic'), message: val('ct-msg'),
        company: val('ct-company'), page: location.pathname
      };
    }
  });

  /* ---------------- assessment ---------------- */
  (function () {
    var body = document.getElementById('quiz-body');
    if (!body) return;
    var QUIZ = LQ.quiz;
    var idx = 0, answers = {};

    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

    function badge(lv) {
      var cls = lv === 'Beginner' ? 'b-beginner' : lv === 'Intermediate' ? 'b-intermediate' : 'b-advanced';
      return '<span class="badge ' + cls + '"><span class="badge-dot"></span>' + lv + '</span>';
    }

    function draw() {
      var step = QUIZ[idx];
      var sel = answers[step.k];
      body.innerHTML =
        '<p class="eyebrow" style="margin-bottom:10px">Question ' + (idx + 1) + ' of ' + QUIZ.length + '</p>' +
        '<h2 style="font-size:1.55rem;margin-bottom:6px">' + esc(step.q) + '</h2>' +
        '<p class="small muted">' + (step.multi ? 'Select all that apply.' : 'Choose the closest match.') + '</p>' +
        '<div class="opts">' + step.opts.map(function (o, i) {
          var on = step.multi ? (Array.isArray(sel) && sel.indexOf(i) > -1) : sel === i;
          return '<button class="opt" type="button" data-i="' + i + '" aria-pressed="' + on + '">' +
                 '<span class="box"></span><span>' + esc(o.t) + '</span></button>';
        }).join('') + '</div>' +
        '<p class="err quiz-warn hide" style="display:block">Please choose an answer to continue.</p>';

      var warn = body.querySelector('.quiz-warn');
      Array.prototype.forEach.call(body.querySelectorAll('.opt'), function (btn) {
        btn.addEventListener('click', function () {
          var i = Number(btn.dataset.i);
          if (step.multi) {
            var arr = Array.isArray(answers[step.k]) ? answers[step.k].slice() : [];
            var at = arr.indexOf(i);
            if (at > -1) arr.splice(at, 1); else arr.push(i);
            answers[step.k] = arr;
            btn.setAttribute('aria-pressed', String(arr.indexOf(i) > -1));
          } else {
            answers[step.k] = i;
            Array.prototype.forEach.call(body.querySelectorAll('.opt'), function (x) {
              x.setAttribute('aria-pressed', String(x === btn));
            });
          }
          warn.classList.add('hide');
        });
      });

      Array.prototype.forEach.call(document.querySelectorAll('#quiz-prog i'), function (el, i) {
        el.classList.toggle('on', i <= idx);
      });
      document.getElementById('quiz-back').style.visibility = idx === 0 ? 'hidden' : 'visible';
      document.getElementById('quiz-next').textContent =
        idx === QUIZ.length - 1 ? 'See my starting point' : 'Continue';
    }

    function finish() {
      var scores = {}, lvlSum = 0, lvlN = 0;
      QUIZ.forEach(function (step) {
        var a = answers[step.k];
        var picks = Array.isArray(a) ? a : (a === undefined ? [] : [a]);
        picks.forEach(function (i) {
          var o = step.opts[i];
          Object.keys(o.v || {}).forEach(function (k) { scores[k] = (scores[k] || 0) + o.v[k]; });
          if (typeof o.lvl === 'number') { lvlSum += o.lvl; lvlN++; }
        });
      });
      var avg = lvlN ? lvlSum / lvlN : 0;
      var stage = avg < 0.9 ? 0 : avg < 1.8 ? 1 : avg < 2.6 ? 2 : 3;

      var ranked = LQ.tracks.slice().sort(function (a, b) {
        return (scores[b.slug] || 0) - (scores[a.slug] || 0);
      });
      var best = ranked[0], second = ranked[1];
      var pool = best.classIds.map(function (id) { return LQ.classes[id]; });
      var stageIdx = stage <= 1 ? 0 : stage === 2 ? 1 : 2;
      var startClass = stageIdx === 0 ? pool[0]
        : stageIdx === 1 ? (pool[1] || pool[0])
        : (pool[pool.length - 2] || pool[0]);
      var lab = LQ.labs[best.labSlugs[Math.min(stageIdx, best.labSlugs.length - 1)]];
      var stageName = ['Connect', 'Learn', 'Apply'][stageIdx];
      var why = stageIdx === 0 ? 'building a confident foundation before anything technical'
        : stageIdx === 1 ? 'past the basics and ready to build real workflows'
        : 'ready to move quickly toward automation and agents';

      var html =
      '<div class="quiz">' +
        '<div class="row-between" style="margin-bottom:26px">' +
          '<div><p class="eyebrow teal" style="margin-bottom:6px">Your result</p>' +
          '<h2 style="font-size:1.7rem">Start here: ' + best.title + '</h2></div>' +
          '<span class="badge b-intermediate"><span class="badge-dot"></span>Stage: ' + stageName + '</span>' +
        '</div>' +
        '<p class="lede">' + best.desc + ' Based on your answers, we would start you at the <strong>' +
          stageName + '</strong> stage — ' + why + '.</p>' +
        '<div class="divider" style="margin:28px 0"></div>' +
        '<p class="eyebrow" style="margin-bottom:16px">Your recommended sequence</p>' +
        '<div class="stack" style="gap:14px">' +
          '<div class="card" style="border-left:3px solid var(--blue)">' +
            '<div class="tiny muted" style="font-family:var(--sans);font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">Start with this class</div>' +
            '<div class="badges" style="margin-bottom:10px">' + startClass.levels.map(badge).join('') + '</div>' +
            '<h3 style="font-size:1.12rem;margin-bottom:6px">' + startClass.num + ' — ' + startClass.title + '</h3>' +
            '<p class="small" style="color:var(--ink-2);margin-bottom:12px">' + startClass.blurb + '</p>' +
            '<a class="btn btn-ghost btn-sm" href="' + u('/classes/' + startClass.slug + '/') + '">View class</a>' +
          '</div>' +
          '<div class="card" style="border-left:3px solid var(--amber)">' +
            '<div class="tiny muted" style="font-family:var(--sans);font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">Then build this</div>' +
            '<h3 style="font-size:1.12rem;margin-bottom:6px">' + lab.title + '</h3>' +
            '<p class="small" style="color:var(--ink-2);margin-bottom:12px">' + lab.desc + '</p>' +
            '<a class="btn btn-ghost btn-sm" href="' + u('/labs/') + '">View labs</a>' +
          '</div>' +
          '<div class="card" style="border-left:3px solid var(--teal)">' +
            '<div class="tiny muted" style="font-family:var(--sans);font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">Your full path</div>' +
            '<h3 style="font-size:1.12rem;margin-bottom:6px">' + best.title + '</h3>' +
            '<p class="small" style="color:var(--ink-2);margin-bottom:12px">' + best.classIds.length +
              ' classes and ' + best.labSlugs.length + ' labs, in order. ' + best.outcome + '</p>' +
            '<a class="btn btn-primary btn-sm" href="' + u('/paths/' + best.slug + '/') + '">Open my learning path</a>' +
          '</div>' +
        '</div>' +
        '<div class="divider" style="margin:28px 0"></div>' +
        '<div class="row-between">' +
          '<p class="small muted" style="margin:0">Also a strong fit: <a href="' + u('/paths/' + second.slug + '/') + '">' + second.title + '</a></p>' +
          '<button class="btn btn-quiet btn-sm" type="button" id="quiz-restart">Retake the assessment</button>' +
        '</div>' +
      '</div>';

      document.getElementById('quiz').classList.add('hide');
      var out = document.getElementById('quiz-result');
      out.classList.remove('hide');
      out.innerHTML = html;
      out.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('quiz-restart').addEventListener('click', function () {
        out.classList.add('hide'); out.innerHTML = '';
        document.getElementById('quiz').classList.remove('hide');
        idx = 0; answers = {}; draw();
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    document.getElementById('quiz-next').addEventListener('click', function () {
      var step = QUIZ[idx];
      var picked = answers[step.k];
      if (picked === undefined || (Array.isArray(picked) && !picked.length)) {
        body.querySelector('.quiz-warn').classList.remove('hide');
        return;
      }
      if (idx < QUIZ.length - 1) { idx++; draw(); } else finish();
    });
    document.getElementById('quiz-back').addEventListener('click', function () {
      if (idx > 0) { idx--; draw(); }
    });
    draw();
  })();

  /* ---------------- scroll reveal ---------------- */
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(els, function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(els, function (e) { io.observe(e); });
  })();
})();
