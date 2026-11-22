/*
 * site.js: page behaviour. You should not need to edit this file to change content.
 *  1. Router and case-study viewer
 *  2. Top bar: the name slides in once the big heading scrolls away
 *  3. Journey: the vertical line ends exactly at the last stop
 */

/* 1. Router and case-study viewer -------------------------------------------------- */
(function () {
  var views = document.querySelectorAll('[data-view]');
  var first = true, lastDeck = null, deckReset = null;
  var DECKS = window.SITE_DECKS || {}, DECK_ORDER = window.SITE_DECK_ORDER || [];
  DECKS.deck = DECKS[DECK_ORDER[0]];
  function route() {
    var h = (location.hash || '').replace('#', '');
    var isPage = /^[a-z0-9-]+$/.test(h) && h !== 'home' && h !== 'deck' && !!document.querySelector('[data-view="' + h + '"]');
    var name = isPage ? h : DECKS[h] ? 'deck' : 'home';
    var changed = false, shown = null;
    if (name === 'deck') {
      var isNew = lastDeck !== h; if (isNew) changed = true;
      lastDeck = h;
      var dk = DECKS[h];
      document.querySelectorAll('[data-deck-name]').forEach(function (e) { e.textContent = dk.name; });
      var kind = dk.kind || 'case study';
      document.querySelector('[data-deck-kind]').textContent = kind;
      document.querySelector('[data-deck-kind-label]').textContent = kind === 'teardown' ? 'Product teardown' : 'Case study';
      document.querySelector('[data-deck-sub]').textContent = dk.sub;
      document.querySelector('[data-deck-sol]').textContent = dk.sol;
      document.querySelector('[data-deck-more]').innerHTML = DECK_ORDER.filter(function (k) { return DECKS[k] !== dk; }).map(function (k) {
        return '<a href="#' + k + '" style="text-decoration: none; display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 4px 32px; padding: 18px 0; border-bottom: 1px solid #DDD2C4"><span style="font-family: \'Newsreader\', Georgia, serif; font-size: 24px; line-height: 1.25">' + DECKS[k].name + ' ' + (DECKS[k].kind || 'case study') + '</span><span style="font-size: 14px; color: #6A625B">' + (DECKS[k].kind === 'teardown' ? 'Teardown' : 'Case study') + '</span></a>';
      }).join('');
      if (isNew && deckReset) deckReset(h, dk);
    } else lastDeck = null;
    views.forEach(function (v) {
      var show = v.getAttribute('data-view') === name;
      if (v.hidden === show) changed = true;
      v.hidden = !show;
      if (show) shown = v;
    });
    if (changed && !first && shown) {
      shown.classList.remove('page-in');
      void shown.offsetWidth;
      shown.classList.add('page-in');
    }
    first = false;
    if (name === 'home' && h && h !== 'top') {
      var el = document.getElementById(h);
      if (el) { el.scrollIntoView({ behavior: changed ? 'instant' : 'smooth' }); return; }
    }
    if (changed) window.scrollTo({ top: 0, behavior: 'instant' });
    else if (h === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  var total = 0, cur = 1, deckKey = '';
  var thumbs = document.getElementById('deck-thumbs'), stage = document.getElementById('deck-stage');
  function src(n) { return 'assets/slides/' + deckKey + '-' + (n < 10 ? '0' : '') + n + '.jpg'; }
  function paint() {
    document.querySelectorAll('[data-cur]').forEach(function (e) { e.textContent = total ? cur : 0; });
    document.querySelectorAll('[data-total]').forEach(function (e) { e.textContent = total; });
    stage.innerHTML = total ? '<img src="' + src(cur) + '" alt="Slide ' + cur + ' of ' + total + '" style="display: block; width: 100%; height: 100%; object-fit: contain; background: #fff">' : '<span style="font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #6A625B; padding: 20px">[Slides to come]</span>';
    thumbs.querySelectorAll('button').forEach(function (b, i) {
      b.style.outline = (i + 1 === cur) ? '2px solid var(--accent)' : '1px solid #DDD2C4';
    });
  }
  function build() {
    thumbs.innerHTML = '';
    for (var i = 1; i <= total; i++) (function (n) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'thumb';
      b.setAttribute('aria-label', 'Go to slide ' + n);
      b.style.cssText = 'aspect-ratio: 16 / 9; background: #E9DFD2; border: 0; border-radius: 0; padding: 0; overflow: hidden';
      b.innerHTML = '<img src="' + src(n) + '" alt="" loading="lazy" style="display: block; width: 100%; height: 100%; object-fit: cover">';
      b.addEventListener('click', function () { cur = n; paint(); });
      thumbs.appendChild(b);
    })(i);
  }
  document.getElementById('deck-prev').addEventListener('click', function () { if (total) { cur = cur > 1 ? cur - 1 : total; paint(); } });
  document.getElementById('deck-next').addEventListener('click', function () { if (total) { cur = cur < total ? cur + 1 : 1; paint(); } });
  deckReset = function (h, dk) { deckKey = Object.keys(DECKS).filter(function (k) { return k !== 'deck' && DECKS[k] === dk; })[0] || 'amazon'; total = dk.n; cur = 1; build(); paint(); };
  /* Full-screen slide viewer: tap or click the slide to open; arrows, Escape and the close button work inside it. */
  var fs = document.getElementById('deck-fs'), fsImg = document.getElementById('deck-fs-img');
  function fsOpen() { if (!total || !fs) return; fsPaint(); fs.hidden = false; document.body.classList.add('fs-open'); fs.focus(); }
  function fsClose() { if (!fs || fs.hidden) return; fs.hidden = true; document.body.classList.remove('fs-open'); }
  function fsPaint() { if (!fs || !fsImg) return; fsImg.src = src(cur); fsImg.alt = 'Slide ' + cur + ' of ' + total; }
  if (fs) {
    stage.addEventListener('click', function (e) { if (e.target.closest('img')) fsOpen(); });
    document.getElementById('deck-fs-close').addEventListener('click', fsClose);
    document.getElementById('deck-fs-prev').addEventListener('click', function () { if (total) { cur = cur > 1 ? cur - 1 : total; paint(); fsPaint(); } });
    document.getElementById('deck-fs-next').addEventListener('click', function () { if (total) { cur = cur < total ? cur + 1 : 1; paint(); fsPaint(); } });
    document.addEventListener('keydown', function (e) {
      if (fs.hidden) return;
      if (e.key === 'Escape') fsClose();
      else if (e.key === 'ArrowLeft') document.getElementById('deck-fs-prev').click();
      else if (e.key === 'ArrowRight') document.getElementById('deck-fs-next').click();
    });
    window.addEventListener('hashchange', fsClose);
  }
  document.querySelectorAll('[data-noop]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
  window.addEventListener('hashchange', route);
  route();
})();

/* 2. Top bar ----------------------------------------------------------------------- */
(function () {
  var bar = document.getElementById('topbar'), name = document.getElementById('hero-name');
  if (!bar || !name) return;
  function upd() { var r = name.getBoundingClientRect(); bar.classList.toggle('scrolled', r.bottom < 56 && r.height > 0); }
  window.addEventListener('scroll', upd, { passive: true }); window.addEventListener('hashchange', function () { setTimeout(upd, 60); }); upd();
})();

/* 3. Journey line ------------------------------------------------------------------ */
(function () {
  var track = document.getElementById('jtrack'); if (!track) return;
  function fit() {
    var dots = track.querySelectorAll('.jdot'); if (!dots.length || !track.offsetHeight) return;
    var last = dots[dots.length - 1], y = 0, e = last;
    while (e && e !== track) { y += e.offsetTop; e = e.offsetParent; }
    var bottom = track.offsetHeight - (y + last.offsetHeight / 2);
    track.querySelectorAll('.jline').forEach(function (l) { l.style.bottom = bottom + 'px'; });
  }
  fit(); window.addEventListener('resize', fit); window.addEventListener('load', fit); window.addEventListener('hashchange', function () { setTimeout(fit, 80); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();

/* 4. Mobile menu (phones only; the button is hidden by CSS on wider screens) ------- */
(function () {
  var bar = document.getElementById('topbar'), btn = document.getElementById('nav-menu-btn'), links = document.getElementById('nav-links');
  if (!bar || !btn || !links) return;
  function set(open) {
    bar.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { set(!bar.classList.contains('menu-open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('click', function (e) { if (bar.classList.contains('menu-open') && !bar.contains(e.target)) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  window.addEventListener('hashchange', function () { set(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 640) set(false); });
})();
