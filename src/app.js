/* =====================================================================
   LifeQuest AI — client-side behaviour
   Pages are real HTML; this file only adds interactivity.
   The data placeholder below is filled in by the build script.
   ===================================================================== */
(function () {
  'use strict';

  var LQ = __LQ_DATA__;
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
