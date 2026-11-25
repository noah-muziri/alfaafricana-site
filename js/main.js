(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  $('#year').textContent = new Date().getFullYear();

  /* ---------- full-screen menu ---------- */
  var menuBtn = $('.menubtn'), overlay = $('#overlay'), menu = $('#menu');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- current section in the menu ---------- */
  var links = {};
  $$('a', menu).concat($$('.nav__links a')).forEach(function (a) { var k = a.getAttribute('href').slice(1); (links[k] = links[k] || []).push(a); });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].forEach(function (a) { a.classList.toggle('active', k === en.target.id); }); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- count-up numbers ---------- */
  $$('.counter__num').forEach(function (el) {
    var to = +el.dataset.to;
    if (reduce || !('IntersectionObserver' in window)) return;
    el.textContent = '0';
    var cio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cio.disconnect();
      var start = performance.now(), dur = 2200;
      (function tick(now) {
        var p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    }, { threshold: 0.6 });
    cio.observe(el);
  });

  /* ---------- catalogue: vertical scroll drives a sideways journey (desktop) ---------- */
  var journey = $('.journey'), track = $('#track');
  var bar = journey && $('.journey__bar i', journey);
  var dist = 0;
  function journeyLayout() {
    if (!journey) return;
    if (window.innerWidth <= 900) { journey.style.height = ''; track.style.transform = ''; dist = 0; return; }
    dist = Math.max(0, track.scrollWidth - window.innerWidth);
    journey.style.height = (dist + window.innerHeight) + 'px';
    journeyUpdate();
  }
  function journeyUpdate() {
    if (!journey || !dist) return;
    var p = Math.min(1, Math.max(0, -journey.getBoundingClientRect().top / dist));
    track.style.transform = 'translate3d(' + (-p * dist) + 'px,0,0)';
    bar.style.transform = 'scaleX(' + p + ')';
  }
  journeyLayout();
  window.addEventListener('load', journeyLayout);
  window.addEventListener('resize', journeyLayout);

  /* ---------- cards tilt toward the pointer ---------- */
  if (!reduce) {
    $$('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--rx', (((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(1) + 'deg');
        card.style.setProperty('--ry', ((0.5 - (e.clientY - r.top) / r.height) * 12).toFixed(1) + 'deg');
      });
      card.addEventListener('pointerleave', function () { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
  }

  /* ---------- one rAF loop for everything scroll-linked ---------- */
  var fx = $$('.grid-fx'), drift = $$('[data-speed]'), mq = $('#marquee'), dock = $('#dock'), contact = $('#contact');
  var darkSections = $$('main > section[data-theme="dark"], .footer');
  var mouse = null, lastY = window.scrollY, mqX = 0, mqHalf = 0, queued = false;

  function measureMarquee() { if (mq) mqHalf = mq.scrollWidth / 2; }
  measureMarquee();
  window.addEventListener('resize', measureMarquee);
  window.addEventListener('load', measureMarquee);

  function tick() {
    queued = false;
    var y = window.scrollY, vy = y - lastY; lastY = y;

    journeyUpdate();

    // is the top bar sitting over a dark section?
    var overDark = darkSections.some(function (el) { var r = el.getBoundingClientRect(); return r.top < 40 && r.bottom > 40; });
    root.classList.toggle('on-dark', overDark || root.classList.contains('menu-open'));

    // corner card gets out of the way at the contact form
    if (dock && contact) { var cr = contact.getBoundingClientRect(); dock.classList.toggle('hide', cr.top < window.innerHeight * 0.6); }

    // spotlight grid follows the pointer, even while scrolling
    if (mouse) fx.forEach(function (el) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (mouse.x - r.left) + 'px'); el.style.setProperty('--my', (mouse.y - r.top) + 'px');
    });

    // photos drift at slightly different speeds
    if (!reduce) drift.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      var off = (r.top + r.height / 2 - window.innerHeight / 2) * parseFloat(el.dataset.speed);
      el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
    });

    // marquee: drifts on its own, surges with scroll and follows its direction
    if (mq && !reduce) {
      mqX -= 0.7 + Math.max(-40, Math.min(40, vy)) * 0.5;
      if (mqHalf) { if (mqX <= -mqHalf) mqX += mqHalf; if (mqX > 0) mqX -= mqHalf; }
      mq.style.transform = 'translate3d(' + mqX.toFixed(1) + 'px,0,0)';
    }
    requestAnimationFrame(tick);
  }
  window.addEventListener('pointermove', function (e) { mouse = { x: e.clientX, y: e.clientY }; }, { passive: true });
  requestAnimationFrame(tick);

  /* ---------- contact form (the current site's form has no handler) ----------
     Opens the visitor's email app addressed to the company. */
  var form = $('#contact-form'), note = $('.subscribe__note', form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { note.textContent = window.ALFA_T('Please enter your name and a valid email.'); form.reportValidity(); return; }
    var d = new FormData(form);
    var subject = encodeURIComponent('Enquiry from ' + d.get('first') + ' ' + d.get('last'));
    var body = encodeURIComponent(d.get('first') + ' ' + d.get('last') + '\n' + d.get('email'));
    window.location.href = 'mailto:info@alfaafricana.com?subject=' + subject + '&body=' + body;
    note.textContent = window.ALFA_T('Opening your email app…');
  });
})();
