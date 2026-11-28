/* Hero extras: custom cursor (mouse devices only) and drag-to-scroll product strip */
(function () {
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine) {
    var c = document.createElement('div');
    c.className = 'cursor';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    var x = -100, y = -100, cx = x, cy = y;
    window.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; c.classList.add('on'); }, { passive: true });
    document.addEventListener('mouseleave', function () { c.classList.remove('on'); });
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest && e.target.closest('a,button,input,textarea');
      c.classList.toggle('big', !!t);
      c.classList.toggle('view', !!(e.target.closest && e.target.closest('.pn:not(.is-active) a')));
    });
    (function loop() { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; c.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'; requestAnimationFrame(loop); })();
  }
  document.querySelectorAll('[data-strip]').forEach(function (b) {
    b.addEventListener('click', function () {
      var st = document.querySelector('.supply'), li = st.querySelector('li');
      st.scrollBy({ left: +b.dataset.strip * (li.offsetWidth + 18), behavior: 'smooth' });
    });
  });
  var strip = document.querySelector('.supply');
  if (strip && fine) {
    var down = false, sx = 0, sl = 0, moved = 0;
    strip.addEventListener('mousedown', function (e) { down = true; moved = 0; sx = e.pageX; sl = strip.scrollLeft; strip.classList.add('drag'); });
    window.addEventListener('mouseup', function () { down = false; strip.classList.remove('drag'); });
    window.addEventListener('mousemove', function (e) { if (!down) return; moved = Math.abs(e.pageX - sx); strip.scrollLeft = sl - (e.pageX - sx); });
    strip.addEventListener('click', function (e) { if (moved > 6) e.preventDefault(); }, true);
    strip.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }
})();

/* Product panels: hover, focus or tap opens one; a second tap follows the link */
(function () {
  var ps = document.querySelectorAll('.panels .pn');
  if (!ps.length) return;
  function open(p) { ps.forEach(function (x) { x.classList.toggle('is-active', x === p); }); }
  ps.forEach(function (p) {
    var a = p.querySelector('a');
    p.addEventListener('mouseenter', function () { if (window.matchMedia('(hover:hover)').matches) open(p); });
    a.addEventListener('focus', function () { open(p); });
    a.addEventListener('click', function (e) { if (!p.classList.contains('is-active')) { e.preventDefault(); open(p); } });
  });
})();
