/* Interactive delivery partner app mockup on the Payout project page (sample data only). */
(function () {
  var root = document.getElementById('dp-screen');
  if (!root) return;
  var S = { screen: 'home', stack: [], tab: 'daily', del: 0, open: {}, txf: 'all', surgeOnly: false, wd: false, modal: false, pop: null, day: 19 };
  var RS = '₹';
  function r(n) { return RS + Math.round(n).toLocaleString('en-IN'); }
  function r2(n) { return RS + (Math.round(n * 100) / 100).toFixed(2); }
  var DS = [[34, 165], [38, 200], [40, 400]], WS = [[172, 300], [190, 350], [200, 700]];
  function slab(sl, n) { var got = 0, next = null; for (var i = 0; i < sl.length; i++) { if (n >= sl[i][0]) got = sl[i][1]; else if (!next) next = sl[i]; } return { got: got, next: next }; }
  function calc() {
    var x = S.del, orders = 32 + x, order = 865 + 25 * x, surge = 65 + 5 * x, today = order + surge;
    var d = slab(DS, orders), wk = 134 + orders, w = slab(WS, wk);
    var c = { orders: orders, pending: 8 - x, order: order, surge: surge, today: today, d: d, wkOrders: wk, w: w,
      wkOrder: 3184 + order, wkSurge: 235 + surge, wkEarn: 3419 + today, wkDaily: 530 + d.got };
    c.wPay = Math.max(0, w.got - c.wkDaily);
    c.dayTotal = today + d.got; c.wkInc = c.wkDaily + c.wPay; c.wkTotal = c.wkEarn + c.wkInc;
    c.cod = 22456 + 520 * x; c.collected = c.cod + 18346;
    c.avail = 480 + 3949 - 40 - 1860; c.balance = S.wd ? 0 : c.avail; c.wdTotal = 1860 + (S.wd ? c.avail : 0);
    return c;
  }
  var ICO = {
    back: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M15 9H3M8 4 3 9l5 5"/></svg>',
    chev: '<svg class="dp-chev" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m5 2 5 5-5 5"/></svg>',
    lock: '<svg width="9" height="10" viewBox="0 0 9 10" aria-hidden="true"><rect x="1" y="4.2" width="7" height="5.2" rx="1" fill="#555"/><path d="M2.6 4.2V3a1.9 1.9 0 0 1 3.8 0v1.2" fill="none" stroke="#555" stroke-width="1.1"/></svg>',
    gift: '<span class="dp-gift" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16"><rect x="2" y="6" width="12" height="8" rx="1.2" fill="#E5533D"/><rect x="1.2" y="4" width="13.6" height="3" rx="1" fill="#F0763F"/><rect x="7" y="4" width="2" height="10" fill="#FFD36B"/></svg></span>',
    info: '<span class="dp-dot" style="background:#3B82F6" aria-hidden="true">i</span>',
    box: '<svg width="58" height="46" viewBox="0 0 58 46" aria-hidden="true"><rect x="22" y="14" width="30" height="28" rx="2" fill="#F2B56B"/><rect x="34" y="14" width="6" height="12" fill="#D98E3A"/><rect x="6" y="24" width="20" height="18" rx="2" fill="#F7CF8E"/><rect x="13" y="24" width="5" height="8" fill="#D98E3A"/><rect x="10" y="4" width="16" height="20" rx="2" fill="#7FB4F0"/><path d="M13 9h10M13 13h10M13 17h6" stroke="#fff" stroke-width="1.6"/></svg>'
  };
  function head(title, right) { return '<div class="dp-head"><button class="dp-back" data-act="back" aria-label="Back">' + ICO.back + '</button><span class="dp-h1">' + title + '</span>' + (right || '') + '</div>'; }
  function line(k, v, cls) { return '<div class="dp-line"><span>' + k + '</span><span class="' + (cls || '') + '">' + v + '</span></div>'; }
  function track(sl, n, start) {
    var pos = [50, 72, 94], p = 0, prev = start || 0, pp = 0;
    for (var i = 0; i < sl.length; i++) { if (n >= sl[i][0]) { p = pos[i]; prev = sl[i][0]; pp = pos[i]; } else { p = Math.min(pp + (pos[i] - pp) * Math.max(0, n - prev) / (sl[i][0] - prev), pos[i] - 8); break; } }
    var h = '<div class="dp-track"><u class="dp-zero">0</u><div class="dp-rail"><span style="width:' + p.toFixed(1) + '%"></span></div><i class="dp-knob" style="left:' + p.toFixed(1) + '%"></i>';
    sl.forEach(function (s, i) { h += '<div class="dp-ms" style="left:' + pos[i] + '%"><b>' + r(s[1]) + '</b><em class="' + (n >= s[0] ? 'on' : '') + '">' + (n >= s[0] ? '✓' : ICO.lock) + '</em><u>' + s[0] + '</u></div>'; });
    return h + '</div>';
  }
  function banner(kind, html) { return '<div class="dp-inc dp-inc-' + kind + '">' + ICO.gift + '<span>' + html + '</span></div>'; }
  function incBanner(sl, st, n, weekly) {
    var g = '<b class="dp-gr">', what = weekly ? 'Weekly Incentive' : 'Incentive';
    if (!st.next) return banner('win', '<b>Congratulations!!!</b><br>You’ve achieved ' + r(st.got) + ' incentive');
    var left = st.next[0] - n;
    if (st.got) return banner('go', '<b>Great job!</b><br>You’ve unlocked ' + g + r(st.got) + ' incentive</b> so far complete <b>' + left + ' more deliveries</b> to unlock ' + g + r(st.next[1]) + ' incentive.</b>');
    return banner('go', weekly ? 'You’re <b>Just ' + left + ' trips</b> more to unlock the ' + g + 'Weekly Incentive of ' + r(st.next[1]) + '.</b>' : '<b>Only ' + left + ' Orders</b> away to unlock<br>' + g + r(st.next[1]) + ' Incentive !</b>');
  }
  function offerText(st, n, weekly) {
    if (!st.next) return 'All offers unlocked. You earned <b>extra ' + r(st.got) + '</b>!';
    return 'Deliver ' + (st.next[0] - n) + ' more orders ' + (weekly ? 'to get <b>extra ' : 'to unlock <b>Extra ') + r(st.next[1]) + (weekly ? '</b>' : '!</b>');
  }
  function acc(id, label, amount, inner, cls) {
    var o = !!S.open[id];
    return '<div class="dp-card dp-pad0"><button class="dp-rowbtn" data-act="acc" data-id="' + id + '" aria-expanded="' + o + '"><span>' + label + '</span><span class="dp-amt ' + (cls || '') + '">' + amount + ' <i class="dp-car' + (o ? ' up' : '') + '">' + ICO.chev + '</i></span></button>' + (o ? '<div class="dp-accin">' + inner + '</div>' : '') + '</div>';
  }
  function nav(label, go, extra) { return '<button class="dp-card dp-pad0 dp-rowbtn" data-go="' + go + '"' + (extra || '') + '><span>' + label + '</span>' + ICO.chev + '</button>'; }
  function sub(label, go) { return '<button class="dp-subbtn" data-go="' + go + '"><span>' + label + '</span>' + ICO.chev + '</button>'; }
  function toggle() { var d = S.tab === 'daily'; return '<div class="dp-tabs"><button data-act="tab" data-tab="daily" aria-pressed="' + d + '">Daily Report</button><button data-act="tab" data-tab="weekly" aria-pressed="' + !d + '">Weekly Report</button></div>'; }
  function picker(t, nav) {
    var p = nav ? '<button class="dp-ar" data-act="day" data-d="-1" aria-label="Previous day"' + (S.day <= 15 ? ' disabled' : '') + '>‹</button>' : '<span class="dp-ar">‹</span>';
    var n = nav ? '<button class="dp-ar" data-act="day" data-d="1" aria-label="Next day"' + (S.day >= 19 ? ' disabled' : '') + '>›</button>' : '<span class="dp-ar">›</span>';
    return '<div class="dp-pick">' + p + '<span class="dp-date">' + t + ' <small>▾</small></span>' + n + '</div>';
  }
  var PAST = { 15: [795, 60, 34, 165, 0], 16: [854, 70, 38, 200, 0], 17: [760, 50, 28, 0, 40], 18: [775, 55, 34, 165, 0] };
  function three(a, b, c) { return '<div class="dp-card dp-three"><div><b>' + a + '</b><span>Earnings/order</span></div><div><b>' + b + '</b><span>Orders</span></div><div><b>' + c + '</b><span>Total Earnings</span></div></div>'; }
  var V = {};
  function offerCard(id, title, sl, st, n, weekly) {
    return '<button class="dp-card dp-offer dp-tap" data-act="pop" data-id="' + id + '"><span class="dp-ct">' + title + ' ' + ICO.chev + '</span><span class="dp-small">' + offerText(st, n, weekly) + '</span>' + track(sl, n, 0) + '<span class="dp-small">Trip Completed: ' + n + '</span></button>';
  }
  function popup(c) {
    var w = S.pop === 'w', sl = w ? WS : DS;
    var items = [
      (w ? 'Counts every delivery from Monday to Sunday: ' : 'Counts today’s deliveries: ') + sl.map(function (s) { return s[0] + ' orders → ' + r(s[1]); }).join(', ') + '.',
      'Only the highest target you reach is paid, not the sum of all targets.',
      w ? 'Paid after recon is closed for the last delivery day of the week.' : 'Paid with the day’s payout, once today’s recon is closed.',
      'Daily and weekly offers run together, but only one is paid: whichever is higher for the week.',
      'If you miss a target, the Earnings page shows how many trips you missed it by.'
    ];
    return '<div class="dp-modal"><div class="dp-mcard dp-pop"><button class="dp-x" style="color:#555" data-act="closepop" aria-label="Close">✕</button><b>' + (w ? 'Weekly Offer' : 'Today’s Offer') + '</b><ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul><button class="dp-out" data-act="closepop" style="align-self:stretch">Okay, got it</button></div></div>';
  }
  V.home = function (c) {
    return '<div class="dp-top"><span class="dp-av" aria-hidden="true"></span><span class="dp-who"><b>Mahima Arora</b><small>Electric Vehicle</small></span><button class="dp-gullak" data-go="wallet">Gullak</button></div><div class="dp-body dp-white">' +
      '<button class="dp-card dp-tap" data-go="deliveries"><span class="dp-ct">My Deliveries ' + ICO.chev + '</span><span class="dp-split"><span><small>Pending Customers</small><b class="dp-num">' + c.pending + '</b><small class="dp-gr">Delayed Customers: ' + Math.min(2, c.pending) + '</small></span>' + ICO.box + '</span></button>' +
      '<div class="dp-surge"><span><b>' + RS + '5 Extra Per Order</b><small>Badshahpur | Citymall Orders</small></span><i>• LIVE</i></div>' +
      '<button class="dp-card dp-tap" data-go="earnings" data-tab="daily"><span class="dp-ct">Today’s Progress ' + ICO.chev + '</span><span class="dp-split"><span class="dp-black"><small>Today’s Earning</small><b>' + r(c.dayTotal) + '</b></span><span class="dp-wk"><small>Earnings this Week</small><b>' + r(c.wkTotal) + '</b></span></span></button>' +
      '<button class="dp-card dp-tap dp-recon" data-go="recon"><span><b>Recon</b><small class="dp-bl">● Pending</small></span><span class="dp-right"><small>To Deposit</small><b>' + r(c.cod) + '</b></span>' + ICO.chev + '</button>' +
      offerCard('d', 'Today’s Offer', DS, c.d, c.orders, false) + offerCard('w', 'Weekly Offer', WS, c.w, c.wkOrders, true) +
      '<div class="dp-ref">Refer a friend</div></div>' + (S.pop ? popup(c) : '');
  };
  var CUST = [['Sector 6', 'Customer 1', '1.2 Km', 'COD ' + RS + '2,354'], ['Sector 6', 'Customer 2', '1.6 Km', 'UPI ' + RS + '1,284'], ['Sector 7', 'Customer 3', '2.1 Km', 'CASH ' + RS + '1,364'], ['Sector 7', 'Customer 4', '2.4 Km', 'PREPAID ' + RS + '2,364']];
  V.deliveries = function (c) {
    var list = CUST.slice(0, Math.min(CUST.length, c.pending));
    return head('Delivery', '<span class="dp-map">View Map</span>') + '<div class="dp-body"><div class="dp-chips"><span class="dp-chip on">Pending<br><b>' + c.pending + '</b></span><span class="dp-chip">Delivered<br><b>' + c.orders + '</b></span><span class="dp-chip">Reschedule<br><b>1</b></span><span class="dp-chip">RTO<br><b>1</b></span></div>' +
      (list.length ? list.map(function (u) { return '<div class="dp-card dp-pad0"><div class="dp-strip"><span>' + u[0] + '</span><span>Earning will be<br><b>' + RS + '30</b></span></div><div class="dp-cust"><b>' + u[1] + '</b> <small>' + u[2] + '</small><span class="dp-addr">Block C, Lane 4, Badshahpur, Gurgaon</span><span class="dp-acts"><i style="background:#3B82F6" aria-hidden="true">☎</i><i style="background:#25B366" aria-hidden="true">✉</i></span><button class="dp-green" data-act="deliver">Mark delivered <em>' + u[3] + '</em></button></div></div>'; }).join('') : '<div class="dp-card">All of today’s orders are delivered.</div>') + '</div>';
  };
  V.done = function () {
    return '<div class="dp-done"><button class="dp-x" data-act="back" aria-label="Close">✕</button><span class="dp-tick">✓</span><b>Delivery Complete</b><div class="dp-card" style="width:100%"><span class="dp-cen"><small>Trip Earnings</small><b class="dp-gr dp-xl">' + RS + '30</b></span>' + line('Weight', '<b>12 kg</b>') + line('Surge', '<b>' + RS + '5</b>') + '</div></div>';
  };
  V.earnings = function (c) {
    var h = head('Earnings') + '<div class="dp-body">' + toggle();
    if (S.tab === 'daily' && S.day < 19) {
      var q = PAST[S.day], pe = q[0] + q[1], pt = pe + q[3];
      h += '<div class="dp-card dp-hero">' + picker(S.day + ' Sep 2025', true) + '<b class="dp-xxl">' + r(pt) + '</b><span class="dp-status"><span class="dp-dot" style="background:#25B366" aria-hidden="true">✓</span> Payout received on ' + (S.day + 1) + ' Sep</span></div>' +
        (q[3] ? banner('win', '<b>Congratulations!!!</b><br>You have received ' + r(q[3]) + ' Incentive !') : '<div class="dp-inc dp-inc-miss">' + ICO.gift + '<span>You missed <b class="dp-or">' + r(165) + ' incentive</b> by <b>just ' + (34 - q[2]) + ' trips</b>. Try harder next time!</span></div>') +
        three(r2(pt / q[2]), q[2], r(pt)) +
        acc('de', 'Earnings', r(pe), line('Order pay', r(q[0])) + line('Surge pay', r(q[1])) + sub('Trip History', 'trips')) +
        acc('di', 'Incentives', r(q[3]), q[3] ? line(slabAt(DS, q[3]) + ' Delivery Completed', r(q[3])) : line('No incentive unlocked', r(0))) +
        acc('dd', 'Deductions', '-' + r(q[4]), q[4] ? line('TDS deduction', r(q[4])) : line('No deductions', r(0)), 'dp-or');
    } else if (S.tab === 'daily') {
      h += '<div class="dp-card dp-hero">' + picker('19 Sep 2025', true) + '<b class="dp-xxl">' + r(c.dayTotal) + '</b><span class="dp-status">' + ICO.info + ' Recon Pending — Payout on Hold</span></div>' +
        incBanner(DS, c.d, c.orders) +
        '<div class="dp-card dp-cen"><small>To Receive the payout please complete Recon</small><button class="dp-out" data-go="recon">View Recon Details</button></div>' +
        three(r2(c.dayTotal / c.orders), c.orders, r(c.dayTotal)) +
        acc('de', 'Earnings', r(c.today), line('Order pay', r(c.order)) + line('Surge pay', r(c.surge)) + sub('Trip History', 'trips')) +
        acc('di', 'Incentives', r(c.d.got), c.d.got ? line(slabAt(DS, c.d.got) + ' Delivery Completed', r(c.d.got)) : line('No incentive unlocked yet', r(0))) +
        acc('dd', 'Deductions', '-' + r(0), line('No deductions today', r(0)), 'dp-or');
    } else {
      h += '<div class="dp-card dp-hero">' + picker('15 Sep - 21 Sep') + '<b class="dp-xxl">' + r(c.wkTotal) + '</b></div>' +
        incBanner(WS, c.w, c.wkOrders, true) + chart(c) +
        three(r2(c.wkTotal / c.wkOrders), c.wkOrders, r(c.wkTotal)) +
        acc('we', 'Earnings', r(c.wkEarn), line('Order pay', r(c.wkOrder)) + line('Surge pay', r(c.wkSurge)) + sub('Trip History', 'trips')) +
        acc('wi', 'Incentives', r(c.wkInc), line('Daily Incentive', r(c.wkDaily)) + line('Weekly Incentive' + (c.wPay ? ' <em class="dp-proc">Processing</em>' : ''), r(c.wPay)) + '<small>Only the higher of daily and weekly incentive is paid.' + (c.w.got && !c.wPay ? ' Weekly ' + r(c.w.got) + ' is unlocked, but daily incentives are higher.' : '') + '</small>' + sub('All Incentive History', 'incentive')) +
        '<button class="dp-card dp-pad0 dp-rowbtn" data-go="deductions"><span>Deductions</span><span class="dp-amt dp-or">-' + r(40) + ' ' + ICO.chev + '</span></button>';
    }
    return h + '<div class="dp-div">DELIVERY HISTORY</div>' + nav('Transaction History', 'tx') + '</div>';
  };
  function slabAt(sl, amt) { for (var i = 0; i < sl.length; i++) if (sl[i][1] === amt) return sl[i][0]; return ''; }
  function chart(c) {
    var v = [855, 924, 810, 830, c.today], L = ['M', 'T', 'W', 'T', 'F', 'S', 'S'], W = 266, H = 78, mx = 1300, pts = [];
    for (var i = 0; i < 7; i++) { var x = 19 + i * (W - 38) / 6, y = i < 5 ? H - 8 - (v[i] / mx) * (H - 22) : H - 8; pts.push([x, y]); }
    var p5 = pts.slice(0, 5), path = p5.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" role="img" aria-label="Line chart of earnings per day this week"><path d="' + path + ' L' + p5[4][0].toFixed(1) + ' ' + (H - 2) + ' L' + p5[0][0] + ' ' + (H - 2) + ' Z" fill="#E7EAEE"/><path d="' + path + '" fill="none" stroke="#2B2B2B" stroke-width="1.3"/>';
    pts.forEach(function (p, i) { svg += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.4" fill="#2B2B2B"/>' + (i < 5 ? '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] - 6).toFixed(1) + '" text-anchor="middle" font-size="7.5" fill="#444">' + RS + v[i] + '</text>' : ''); });
    svg += '</svg>';
    return '<div class="dp-card"><span class="dp-ct">Overview <em class="dp-wtag">Weekly</em></span><small style="margin-top:-6px">September</small>' + svg + '<div class="dp-days">' + L.map(function (l, i) { return '<span class="' + (i === 4 ? 'on' : '') + '"><small>' + l + '</small>' + (15 + i) + '</span>'; }).join('') + '</div></div>';
  }
  V.recon = function (c) {
    return head('Recon') + '<div class="dp-body dp-white"><div class="dp-card dp-grey">' + line('<b>Total Amount Collected</b>', '<b>' + r(c.collected) + '</b>') + line('COD Amount Collected', '<b>' + r(c.cod) + '</b>') + line('Online Amount Collected', '<b>' + r(18346) + '</b>') + '<hr>' + line('<b>Recon Status -</b>', '<b class="dp-bl">Pending</b>') + '</div>' +
      '<div class="dp-card dp-grey"><b>Order Summary</b><hr>' + line('Total Customers', '<b>42</b>') + line('Picked Customers', '<b>42</b>') + line('Delivered Customers', '<b>' + c.orders + '</b>') + line('OFD Customers', '<b>' + c.pending + '</b>') + line('Reschedule Customers', '<b>1</b>') + line('RTO Customers', '<b>1</b>') + line('Unattempted Customers', '<b>0</b>') + line('Customer Rating', '<b><span style="color:#F5A623">★</span> 4.5</b>') + '</div></div>';
  };
  V.wallet = function (c) {
    var proc = c.today, procInc = c.d.got + c.wPay;
    return head('Wallet') + '<div class="dp-body dp-white"><div class="dp-wallet"><small>Your Balance</small><b class="dp-xxl" style="color:#fff">' + RS + ' ' + Math.round(c.balance).toLocaleString('en-IN') + '</b><small style="color:#E6D48A">Previous Balance as of 14 September ' + r(480) + '</small><button class="dp-wbtn" data-go="withdraw"' + (c.balance ? '' : ' disabled') + '><span>Withdraw</span><span aria-hidden="true">→</span></button></div>' +
      '<small class="dp-cen" style="display:block">15 Sep - 21 Sep 2025</small>' +
      '<button class="dp-card dp-grey dp-rowbtn" data-go="earnings" data-tab="weekly"><span>Earnings</span><span class="dp-amt">' + r(c.wkEarn) + '<small class="dp-bl">+' + r(proc) + ' Processing</small></span>' + ICO.chev + '</button>' +
      '<button class="dp-card dp-grey dp-rowbtn" data-go="incentive"><span>Incentives</span><span class="dp-amt">' + r(c.wkInc) + (procInc ? '<small class="dp-bl">+' + r(procInc) + ' Processing</small>' : '') + '</span>' + ICO.chev + '</button>' +
      '<button class="dp-card dp-grey dp-rowbtn" data-go="deductions"><span>Deductions</span><span class="dp-amt dp-or">-' + r(40) + '</span>' + ICO.chev + '</button>' +
      '<button class="dp-card dp-grey dp-rowbtn" data-go="tx" data-txf="wd"><span>Withdrawals</span><span class="dp-amt dp-or">-' + r(c.wdTotal) + '</span>' + ICO.chev + '</button>' +
      '<div class="dp-div">MORE INFORMATION</div><div class="dp-split" style="gap:8px"><div class="dp-card dp-grey" style="flex:1"><b><span class="dp-dot" style="background:#25B366" aria-hidden="true">✓</span> ' + r(995) + '</b><b>Last Payout</b><small>18th Sep</small></div><button class="dp-card dp-grey dp-tap" style="flex:1" data-go="tx" data-txf="all"><span class="dp-ct"><b>Transaction<br>Statements</b>' + ICO.chev + '</span><small>15th - 21st Sep</small></button></div></div>';
  };
  V.withdraw = function (c) {
    return '<div class="dp-wd"><div class="dp-wdtop"><div class="dp-head" style="background:none;color:#fff;border:0"><button class="dp-back" style="color:#fff" data-act="back" aria-label="Back">' + ICO.back + '</button><span class="dp-h1">Withdraw</span></div><small>Your Balance</small><b class="dp-xxl" style="color:#fff">' + RS + ' ' + Math.round(c.avail).toLocaleString('en-IN') + '</b></div>' +
      '<div class="dp-sheet"><span class="dp-ct"><b>Payment Details</b> <em class="dp-fast">Fastest »</em></span>' + line('<small>UPI ID</small>', '<small>partner@okupi</small>') + '<div class="dp-field"><small>Amount</small><span>' + RS + ' ' + Math.round(c.avail).toLocaleString('en-IN') + '</span><u>ADD Full Amount</u></div><button class="dp-blue" data-act="proceed">Proceed</button></div>' +
      (S.modal ? '<div class="dp-modal"><div class="dp-mcard"><button class="dp-x" style="color:#555" data-act="closemodal" aria-label="Close">✕</button><span class="dp-tick" style="width:52px;height:52px;font-size:26px;background:#25B366;color:#fff">✓</span><b>Withdrawal Successful</b><b class="dp-xl">' + RS + ' ' + Math.round(c.avail).toLocaleString('en-IN') + '</b></div></div>' : '') + '</div>';
  };
  V.tx = function (c) {
    var T = [];
    if (S.wd) T.push(['19 September', 'wd', 'Withdrawal', '02:15 PM • 19 Sep', c.avail, 'Processing', 'Transaction ID: 1329008391']);
    T = T.concat([['19 September', 'dp', 'Daily payout (18 Sep)', '10:05 AM • 19 Sep', 995], ['18 September', 'wd', 'Withdrawal', '06:40 PM • 18 Sep', 1860, '', 'Transaction ID: 1329008234'], ['18 September', 'dp', 'Daily payout (17 Sep)', '10:02 AM • 18 Sep', 810], ['17 September', 'dp', 'Daily payout (16 Sep)', '09:58 AM • 17 Sep', 1124], ['16 September', 'dp', 'Daily payout (15 Sep)', '10:11 AM • 16 Sep', 1020]]);
    var F = [['all', 'All'], ['wp', 'Weekly'], ['wd', 'Withdrawal'], ['dp', 'Daily']], last = '';
    var list = T.filter(function (t) { return S.txf === 'all' || t[1] === S.txf; });
    return head('Transaction Statement', '<span class="dp-filter">Filter</span>') + '<div class="dp-body"><div class="dp-pills"><span class="dp-pill">15 Sep - 21 Sep ▾</span>' + F.map(function (f) { return '<button class="dp-pill" data-act="txf" data-txf="' + f[0] + '" aria-pressed="' + (S.txf === f[0]) + '">' + f[1] + '</button>'; }).join('') + '</div>' +
      (list.length ? list.map(function (t) { var sep = t[0] !== last ? '<small class="dp-sep">' + t[0] + '</small>' : ''; last = t[0];
        return sep + '<div class="dp-card dp-tx"><span><b>' + t[2] + '</b><small>' + t[3] + '</small>' + (t[6] ? '<small>' + t[6] + '</small>' : '') + '</span><span class="dp-amt ' + (t[5] === 'Processing' ? 'dp-bl' : 'dp-gr') + '"><b>' + r(t[4]) + '</b>' + (t[5] ? '<small>' + t[5] + '</small>' : '') + '</span></div>'; }).join('') : '<div class="dp-card"><small>No weekly payout in this week yet. It is paid after the week closes.</small></div>') + '</div>';
  };
  var TRIPS = [['Sakshi', 10, 5, 25], ['Rohit', 6, 0, 28], ['Anita', 14, 5, 31], ['Imran', 4, 0, 25], ['Pooja', 9, 5, 27]];
  V.trips = function () {
    var list = TRIPS.filter(function (t) { return !S.surgeOnly || t[2] > 0; });
    return head('Trip History', '<span class="dp-filter">Filter</span>') + '<div class="dp-body"><div class="dp-pills"><span class="dp-pill">19 Sep ▾</span><span class="dp-pill">Weight</span><button class="dp-pill dp-sw" data-act="surge" aria-pressed="' + S.surgeOnly + '">Surge <i></i></button></div>' +
      list.map(function (t) { return '<div class="dp-card dp-tx"><span><b>' + t[0] + ', Badshahpur</b><small>19 Sept 2025</small><small>Delivery Weight - ' + t[1] + ' kg</small><small>Surge - Rs ' + t[2] + '</small></span><span class="dp-amt dp-gr"><b>+ ' + r(t[3] + t[2]) + '</b></span></div>'; }).join('') + '</div>';
  };
  function ledger(color, title, total, rows) {
    return '<div class="dp-led" style="background:' + color + '"><div class="dp-head" style="background:none;color:#fff;border:0"><button class="dp-back" style="color:#fff" data-act="back" aria-label="Back">' + ICO.back + '</button><span class="dp-h1">' + title + '</span></div><div class="dp-card dp-hero" style="margin:4px 12px 0">' + picker('15 Sep - 21 Sep') + '<b class="dp-xxl">' + total + '</b></div><div class="dp-sheet" style="margin-top:14px;flex:1">' + rows + '</div></div>';
  }
  V.incentive = function (c) {
    var rows = '';
    if (c.wPay) rows += '<div class="dp-lrow"><span><b>' + slabAt(WS, c.w.got) + ' Weekly Deliveries Completed</b><small>Processing • 19 Sep</small></span><b class="dp-gr">' + r(c.wPay) + '</b></div>';
    if (c.d.got) rows += '<div class="dp-lrow"><span><b>' + slabAt(DS, c.d.got) + ' Delivery Completed</b><small>Processing • 19 Sep</small></span><b class="dp-gr">' + r(c.d.got) + '</b></div>';
    rows += [['34 Delivery Completed', '11:42PM • 18 Sep', 165], ['38 Delivery Completed', '11:51PM • 16 Sep', 200], ['34 Delivery Completed', '11:38PM • 15 Sep', 165]].map(function (x) { return '<div class="dp-lrow"><span><b>' + x[0] + '</b><small>' + x[1] + '</small></span><b class="dp-gr">' + r(x[2]) + '</b></div>'; }).join('');
    return ledger('#4DAA78', 'Incentive', r(c.wkInc), rows);
  };
  V.deductions = function () { return ledger('#EE8A3C', 'Deductions', '-' + r(40), '<div class="dp-lrow"><span><b>TDS deduction</b><small>6:39AM • 17 Sep</small></span><b class="dp-or">-' + r(40) + '</b></div>'); };
  var NOTES = {
    home: 'Tap Today’s Offer or Weekly Offer to see its rules. The banner area depends on the partner’s payout plan: a carousel when both Surge and Minimum Guarantee apply, a single banner when only one applies, and no banner when neither does. This partner has Surge only.',
    deliveries: 'Every order shows what the partner will earn before it is delivered.',
    done: 'Shown after each delivery, so the partner sees the trip earnings, weight and surge straight away.',
    'earnings-daily': 'The line under the amount has five states: recon pending, payout received, payout processing, Minimum Guarantee received, and Minimum Guarantee processing for a new partner. The incentive message has seven, from “only 2 orders away” to “congratulations”. This is the recon-pending state. Use the arrows beside the date to see earlier days, where the payout has been received.',
    'earnings-weekly': 'Mid-week there is no status line. Once the week closes it reads payout received, all payouts completed, or payout processing. The incentive message has four states. This is the mid-week state.',
    recon: 'Shows today only and updates in real time. There is no view of earlier days.',
    wallet: 'The balance is what can be withdrawn now. The breakdown covers the current week only, and each row opens its page with that week already selected.',
    withdraw: 'UPI and bank transfer follow the same flow. Other end states are insufficient funds, unsuccessful and pending.',
    tx: 'Withdrawals carry a transaction ID and can be processing, pending, failed or successful. The date filter uses the day a payout is for, not the day it was processed.',
    trips: 'Filters: date, a weight range and a surge toggle.'
  };
  function render() {
    root.innerHTML = V[S.screen](calc()); var b = root.querySelector('.dp-body'); if (b) b.scrollTop = 0;
    var n = document.getElementById('dp-note'); if (n) { var t = NOTES[S.screen === 'earnings' ? 'earnings-' + S.tab : S.screen]; n.hidden = !t; n.querySelector('p').textContent = t || ''; }
  }
  root.addEventListener('click', function (e) {
    var t = e.target.closest('[data-go],[data-act]'); if (!t || t.disabled) return;
    var go = t.getAttribute('data-go'), act = t.getAttribute('data-act');
    if (go) { S.pop = null; S.stack.push(S.screen); S.screen = go; if (t.dataset.tab) { S.tab = t.dataset.tab; S.day = 19; } if (t.dataset.txf) S.txf = t.dataset.txf; }
    else if (act === 'back') { S.modal = false; S.screen = S.stack.pop() || 'home'; }
    else if (act === 'tab') S.tab = t.dataset.tab;
    else if (act === 'acc') S.open[t.dataset.id] = !S.open[t.dataset.id];
    else if (act === 'txf') S.txf = t.dataset.txf;
    else if (act === 'surge') S.surgeOnly = !S.surgeOnly;
    else if (act === 'deliver') { if (S.del < 8) { S.del++; S.stack.push(S.screen); S.screen = 'done'; } }
    else if (act === 'proceed') S.modal = true;
    else if (act === 'pop') S.pop = t.dataset.id;
    else if (act === 'day') S.day = Math.max(15, Math.min(19, S.day + parseInt(t.dataset.d, 10)));
    else if (act === 'closepop') S.pop = null;
    else if (act === 'closemodal') { S.modal = false; S.wd = true; S.screen = S.stack.pop() || 'wallet'; }
    render();
  });
  render();
})();
