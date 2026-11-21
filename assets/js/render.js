/*
 * render.js: builds the parts of the home page that come from content.js.
 * Edit content.js for text; edit this file only to change how those parts look.
 */
(function () {
  var S = window.SITE || {};
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function attr(s) { return esc(s).replace(/"/g, '&quot;'); }
  function fill(id, htmlText, where) { var el = document.getElementById(id); if (el) { if (where) el.insertAdjacentHTML(where, htmlText); else el.innerHTML = htmlText; } }

  /* Skills (About) */
  var DOT = '<span aria-hidden="true" style="color: var(--accent); padding: 0 6px 0 10px">·</span>';
  fill('about-grid', (S.skills || []).map(function (row) {
    return '<div class="reveal"><span style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #6A625B">' + esc(row.label) + '</span></div>\n' +
      '<div class="reveal" style="flex: 3 1 560px; min-width: 0"><div style="max-width: 860px; font-size: 16px; line-height: 1.8; color: #17191C">' +
      row.items.map(function (it, i) { return '<span style="white-space: nowrap">' + esc(it) + (i < row.items.length - 1 ? DOT : '') + '</span>'; }).join(' ') +
      '</div></div>\n';
  }).join(''), 'beforeend');

  /* Case studies and teardowns: cards + data for the viewer */
  var decks = {}, order = [];
  (S.caseStudies || []).forEach(function (c) {
    decks[c.id] = { name: c.name, kind: c.kind || 'case study', n: c.slides, sub: c.problem, sol: c.solution };
    order.push(c.id);
  });
  window.SITE_DECKS = decks; window.SITE_DECK_ORDER = order;
  fill('case-study-cards', '\n' + (S.caseStudies || []).map(function (c) {
    var teardown = c.kind === 'teardown';
    return '<a href="#' + attr(c.id) + '" class="proj card reveal">\n' +
      '<span class="card-img" style="aspect-ratio: 16 / 9; padding: 0"><img src="assets/slides/' + attr(c.id) + '-01.jpg" alt="Cover slide of the ' + attr(c.name) + (teardown ? ' teardown' : ' case study') + '" style="display: block; width: 100%; height: 100%; object-fit: cover"></span>\n' +
      '<span class="card-body" style="padding: 18px 20px 20px; gap: 8px">\n' +
      '<span style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #6A625B">' + (teardown ? 'Teardown' : 'Case study') + '</span>\n' +
      '<span class="proj-title" style="font-family: \'Newsreader\', Georgia, serif; font-size: 24px; line-height: 1.2">' + esc(c.name) + '</span>\n' +
      '<span style="font-size: 14px; line-height: 1.5; color: #3A3E44; text-wrap: pretty">' + esc(c.cardLine) + '</span>\n' +
      '</span>\n</a>\n';
  }).join(''));

  /* Journey */
  var J = S.journey || [];
  fill('jtrack', J.map(function (stop, i) {
    var last = i === J.length - 1;
    var sub = (stop.items && stop.items.length) ? '<div style="display: flex; flex-direction: column; margin-top: 16px; border-top: 1px solid #D3C5B3">\n' + stop.items.map(function (it) {
      return '<div class="reveal" style="display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 2px 24px; padding: 14px 0; border-bottom: 1px solid #D3C5B3">\n' +
        '<span style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 17px; font-weight: 500">' + esc(it.title) + '</span><span style="font-size: 15px; color: #6A625B">' + esc(it.text) + '</span></span>\n' +
        '<span style="font-size: 14px; color: #6A625B">' + esc(it.years) + '</span>\n</div>\n';
    }).join('') + '</div>\n' : '';
    return '<div class="reveal" style="display: grid; grid-template-columns: clamp(72px, 8vw, 96px) minmax(0, 1fr); column-gap: 48px' + (last ? '' : '; padding-bottom: 52px') + '">\n' +
      '<span style="font-size: 14px; text-align: right; padding-top: 5px; color: #6A625B">' + esc(stop.years) + '</span>\n' +
      '<div style="position: relative; display: flex; flex-direction: column; gap: 6px">\n' +
      '<span aria-hidden="true" style="position: absolute; left: -31px; top: 8px; width: 15px; height: 15px; border-radius: 50%; background: var(--accent)" class="jdot"></span>\n' +
      '<h3 style="margin: 0; font-family: \'Newsreader\', Georgia, serif; font-size: 26px; line-height: 1.2; font-weight: 400">' + esc(stop.title) + '</h3>\n' +
      '<p style="margin: 0; max-width: 620px; color: #3A3E44">' + esc(stop.text) + '</p>\n' + sub + '</div>\n</div>\n\n';
  }).join(''), 'beforeend');

  /* Hobbies */
  var ICONS = {
      "chess": "<path d=\"M9 21h6M8 21c0-3 1.5-4 1.5-7h5c0 3 1.5 4 1.5 7M9.5 14 8 10.5h8L14.5 14M10 10.5c-1.2-1-1.5-2.3-1.5-3.2a3.5 3.5 0 0 1 7 0c0 .9-.3 2.2-1.5 3.2\"/>",
      "mafia": "<path d=\"M3 13h18M6 13l1.5-7h9L18 13M5 13c0 0 .5 2 3.5 2S12 13 12 13s.5 2 3.5 2S19 13 19 13M9 18.5c1 .8 2 1 3 1s2-.2 3-1\"/>",
      "painting": "<path d=\"M12 3a9 9 0 1 0 0 18c1.3 0 2-.8 2-1.8 0-1.4-1-1.6-1-2.7 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4c0-4.400-4-8-9-8z\"/><circle cx=\"7.5\" cy=\"12\" r=\"1\"/><circle cx=\"9.5\" cy=\"8\" r=\"1\"/><circle cx=\"14\" cy=\"7\" r=\"1\"/>",
      "photography": "<path d=\"M4 8h3l1.5-2h7L17 8h3v11H4z\"/><circle cx=\"12\" cy=\"13.2\" r=\"3.3\"/>",
      "gym": "<path d=\"M3 12h18M6 8v8M18 8v8M3.5 10v4M20.5 10v4\"/>",
      "pickleball": "<circle cx=\"10\" cy=\"9.5\" r=\"6\"/><path d=\"m14.3 13.800 5.2 5.2\"/><circle cx=\"8\" cy=\"8\" r=\".6\"/><circle cx=\"11.5\" cy=\"7.5\" r=\".6\"/><circle cx=\"9.5\" cy=\"11.5\" r=\".6\"/><circle cx=\"12.5\" cy=\"10.5\" r=\".6\"/>",
      "dot": "<circle cx=\"12\" cy=\"12\" r=\"3\"/>"
  };
  fill('hobby-row', '\n' + (S.hobbies || []).map(function (hb) {
    return '<span class="hobby"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[hb.icon] || ICONS.dot) + '</svg>' + esc(hb.name) + '</span>\n';
  }).join(''));

  /* Photo collage */
  var inset = S.photoInset;
  fill('photo-collage', '\n' + (S.photos || []).map(function (p, i) {
    return '<div><img src="assets/photos/' + attr(p.file) + '" alt="' + attr(p.alt) + '" loading="lazy">' +
      (i === 0 && inset ? '<img class="inset" src="assets/photos/' + attr(inset.file) + '" alt="' + attr(inset.alt) + '" loading="lazy">' : '') + '</div>\n';
  }).join(''));
})();
