/* Scroll-driven 3D Alfa Africana logo.
   The blue mark is the real logo outline (traced into js/logo-path.js), extruded; the wordmark is
   rebuilt from strokes. One fixed canvas; the logo flies between the page's [data-stage] boxes. */
(function () {
  var stages = Array.prototype.slice.call(document.querySelectorAll('[data-stage]'));
  var canvas = document.getElementById('logo3d');
  var L = window.ALFA_LOGO;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fallback() {
    canvas.style.display = 'none';
    stages.forEach(function (s) {
      var img = new Image();
      img.src = 'images/alfa-logo.png';
      img.alt = '';
      img.className = 'fallback';
      s.appendChild(img);
    });
  }

  var renderer;
  try {
    if (!window.THREE || !L || !window.ALFA_FONT) throw 0;
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) { return fallback(); }

  var BLUE = 0x2d9bcd, TEAL = 0x4fd2c2, INK = new THREE.Color(0x1b2430), WHITE = new THREE.Color(0xffffff);

  /* ---------- geometry ---------- */
  var tb = L.textBox;                                   // wordmark box in logo pixels
  var markMinY = Math.min.apply(null, L.mark.reduce(function (a, l) { return a.concat(l.pts.map(function (p) { return p[1]; })); }, []));
  var cx = L.w / 2, cy = (markMinY + tb[3]) / 2;
  var LOGO_W = tb[2] - tb[0];

  function toV(p) { return new THREE.Vector2(p[0] - cx, cy - p[1]); }

  var markShape = null;
  /* The traced outline of the mark came out faceted and wobbly, so the outer edge is redrawn from a sparse,
     hand-placed set of points (read off the traced logo, in 1/14-unit steps) and smoothed with Chaikin corner cutting. */
  var MARK_PX = [[92,270],[100,220],[130,170],[185,115],[250,80],[320,48],[390,35],[500,36],[570,52],[640,90],[700,118],
    [760,85],[830,55],[915,35],[1020,36],[1080,55],[1160,95],[1250,150],[1300,240],[1308,370],[1280,440],[1230,490],[1170,520],
    [1145,548],[1190,585],[1250,630],[1290,672],[1295,730],[1250,772],[1185,774],[1100,712],[1020,655],[940,595],[880,545],
    [862,520],[880,475],[935,445],[1010,428],[1100,395],[1140,330],[1135,290],[1100,225],[1030,190],[890,188],[830,225],
    [795,270],[790,690],[770,740],[740,760],[665,758],[625,735],[560,745],[500,757],[390,762],[315,748],[250,715],[185,678],
    [130,610],[100,560],[92,525],[90,400]];
  function chaikin(pts, rounds) {
    for (var r = 0; r < rounds; r++) {
      var out = [];
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i], q = pts[(i + 1) % pts.length];
        out.push([p[0] * 0.75 + q[0] * 0.25, p[1] * 0.75 + q[1] * 0.25], [p[0] * 0.25 + q[0] * 0.75, p[1] * 0.25 + q[1] * 0.75]);
      }
      pts = out;
    }
    return pts;
  }
  markShape = new THREE.Shape(chaikin(MARK_PX.map(function (p) { return [p[0] / 14 + 40, p[1] / 14 - 2]; }), 4).map(toV));
  // the traced counter of the "a" came out lopsided (a sloping top edge); redraw it as a clean rounded rectangle on the same bounds
  function cleanHole(pts) {
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    pts.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
    var r = Math.min(x1 - x0, y1 - y0) * 0.38, out = [], n = 24, c = [[x1 - r, y0 + r, -90], [x1 - r, y1 - r, 0], [x0 + r, y1 - r, 90], [x0 + r, y0 + r, 180]];
    c.forEach(function (q) { for (var i = 0; i <= n; i++) { var a = (q[2] + 90 * i / n) * Math.PI / 180; out.push([q[0] + r * Math.cos(a), q[1] + r * Math.sin(a)]); } });
    return out;
  }
  L.mark.forEach(function (l) {
    if (l.hole && markShape) markShape.holes.push(new THREE.Path(cleanHole(l.pts).map(toV)));
  });

  var markGeo = new THREE.ExtrudeGeometry(markShape, {
    depth: 15, steps: 1, curveSegments: 1,
    bevelEnabled: true, bevelThickness: 0.9, bevelSize: 0.4, bevelOffset: -0.4, bevelSegments: 3
  });
  markGeo.translate(0, 0, -7.5);

  // wordmark: real Montserrat Medium outlines, widely tracked like the Alfa Royal lettering, fitted to the original text box
  var F = window.ALFA_FONT, CAP = F.cap, TEXT = 'ALFA AFRICANA';
  var TRACK = 0.3, SPACE = 0.42;                          // in cap-heights
  var KERN = { FA: -0.05, 'A ': -0.05, ' A': -0.05, LF: 0, AF: 0 };
  function advOf(ch) { return ch === ' ' ? SPACE : F.glyphs[ch].adv / CAP; }
  function gapAt(i) { return i ? TRACK + (KERN[TEXT[i - 1] + TEXT[i]] || 0) : 0; }
  var units = 0;
  TEXT.split('').forEach(function (ch, i) { units += advOf(ch) + gapAt(i); });
  var capPx = (tb[2] - tb[0]) / units;                     // cap height in logo pixels
  var baseY = (tb[1] + tb[3]) / 2 + capPx / 2;            // vertically centred in the original text box
  function area(c) { var s = 0; for (var i = 0; i < c.length; i++) { var p = c[i], q = c[(i + 1) % c.length]; s += p[0] * q[1] - q[0] * p[1]; } return s / 2; }
  var textShapes = [], ox = 0;
  TEXT.split('').forEach(function (ch, i) {
    ox += gapAt(i);
    if (ch !== ' ') {
      var cs = F.glyphs[ch].contours.slice().sort(function (a, b) { return Math.abs(area(b)) - Math.abs(area(a)); });
      var toP = function (p) { return new THREE.Vector2(tb[0] - cx + (ox + p[0] / CAP) * capPx, cy - (baseY - p[1] / CAP * capPx)); };
      var shape = new THREE.Shape(cs[0].map(toP));
      for (var k = 1; k < cs.length; k++) shape.holes.push(new THREE.Path(cs[k].map(toP)));
      textShapes.push(shape);
    }
    ox += advOf(ch);
  });
  var textGeo = new THREE.ExtrudeGeometry(textShapes, {
    depth: 6, steps: 1, curveSegments: 1,
    bevelEnabled: true, bevelThickness: 0.35, bevelSize: 0.2, bevelOffset: -0.2, bevelSegments: 2
  });
  textGeo.translate(0, 0, -3);

  /* ---------- materials, scene ---------- */
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  function lin(hex) { return new THREE.Color(hex).convertSRGBToLinear(); }
  INK.convertSRGBToLinear();

  // matte powder-coated finish: soft blue face, teal edges, flat lettering
  var faceMat = new THREE.MeshPhysicalMaterial({ color: lin(BLUE), metalness: 0.0, roughness: 0.88, clearcoat: 0, envMapIntensity: 0.42, transparent: true });
  var sideMat = new THREE.MeshStandardMaterial({ color: lin(0x2fb3a6), metalness: 0.05, roughness: 0.82, envMapIntensity: 0.5, transparent: true });
  var textMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.0, roughness: 0.85, clearcoat: 0, envMapIntensity: 0.55, transparent: true });

  // procedural photo-studio: a dark room with soft boxes, baked into a reflection map
  var envScene = new THREE.Scene();
  envScene.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x2b343d, side: THREE.BackSide })));
  function softbox(w, h, x, y, z, r, g, b) {
    var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(r, g, b), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m);
  }
  softbox(20, 7, 0, 18, 8, 9, 9, 9);          // key light overhead
  softbox(6, 22, -18, 3, 8, 5, 5.6, 6.5);     // left strip
  softbox(6, 22, 18, 0, 6, 3.2, 5, 6);        // right strip (cool)
  softbox(14, 6, 0, -10, 14, 1.6, 2, 2.2);    // floor bounce
  softbox(9, 9, 2, 3, 19, 3.5, 3.5, 3.6);     // front fill, gives the sweeping highlight
  softbox(14, 8, 0, 6, -18, 1.5, 4.5, 6);     // blue rim from behind
  var pmrem = new THREE.PMREMGenerator(renderer);
  var envMap = pmrem.fromScene(envScene, 0.03).texture;
  pmrem.dispose();
  var mark = new THREE.Mesh(markGeo, [faceMat, sideMat]);
  var word = new THREE.Mesh(textGeo, textMat);
  var logo = new THREE.Group();
  logo.add(mark, word);
  var rig = new THREE.Group();
  rig.add(logo);

  var scene = new THREE.Scene();
  scene.add(rig);
  scene.environment = envMap;
  var key = new THREE.DirectionalLight(0xffffff, 0.95); key.position.set(-260, 340, 520); scene.add(key);

  // soft contact shadow under the floating logo
  var sc = document.createElement('canvas'); sc.width = sc.height = 128;
  var sg = sc.getContext('2d'), grad = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(10,25,40,.55)'); grad.addColorStop(0.55, 'rgba(10,25,40,.18)'); grad.addColorStop(1, 'rgba(10,25,40,0)');
  sg.fillStyle = grad; sg.fillRect(0, 0, 128, 128);
  var shadowMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false });
  var shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMat);
  shadow.renderOrder = -1;
  scene.add(shadow);

  var FOV = 26;
  var camera = new THREE.PerspectiveCamera(FOV, 1, 10, 6000);
  var vw = 0, vh = 0;
  function resize() {
    vw = window.innerWidth; vh = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(vw, vh, false);
    camera.aspect = vw / vh;
    camera.position.z = (vh / 2) / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  var px = 0, py = 0;
  window.addEventListener('pointermove', function (e) {
    px = (e.clientX / window.innerWidth) * 2 - 1;
    py = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  /* ---------- per-frame: follow the stages, spin with scroll ---------- */
  var smooth = function (t) { return t * t * (3 - 2 * t); };
  var cur = { x: 0, y: 0, w: 300, o: 0, dark: 0, rot: 0, tx: 0, ty: 0 };
  var themes = stages.map(function (s) { var sec = s.closest('[data-theme]'); return sec && sec.dataset.theme === 'dark' ? 1 : 0; });
  var t0 = performance.now(), last = t0, first = true;

  function frame(now) {
    var t = now - t0, sw = 0, X = 0, Y = 0, W = 0, D = 0;
    stages.forEach(function (s, i) {
      var r = s.getBoundingClientRect();
      if (r.bottom < -vh || r.top > 2 * vh || !r.width) return;
      var mid = r.top + r.height / 2;
      var w = smooth(Math.max(0, 1 - Math.abs(mid - vh / 2) / (vh * 0.58)));
      sw += w; X += w * (r.left + r.width / 2); Y += w * mid;
      W += w * Math.min(r.width * 0.82, r.height * 2.0); D += w * themes[i];
    });
    var target = sw > 0.002 ? { x: X / sw, y: Y / sw, w: W / sw, o: Math.min(1, sw * 1.6), dark: D / sw } : null;

    // frame-rate independent easing, so slow devices fade out as quickly as fast ones
    var dt = Math.min(120, now - last); last = now;
    var ease = function (rate) { return 1 - Math.pow(1 - rate, dt / 16.67); };
    var k = first ? 1 : ease(0.2);
    if (target) {
      if (cur.o < 0.01) { cur.x = target.x; cur.y = target.y; cur.w = target.w; }
      cur.x += (target.x - cur.x) * k; cur.y += (target.y - cur.y) * k; cur.w += (target.w - cur.w) * k;
      cur.dark += (target.dark - cur.dark) * ease(0.15);
    }
    cur.o += ((target ? target.o : 0) - cur.o) * (target ? ease(0.18) : ease(0.35));
    first = false;

    var intro = reduce ? 1 : 1 - Math.pow(1 - Math.min(1, t / 1700), 3);
    var a = reduce ? 0 : window.scrollY * 0.0026 + (1 - intro) * Math.PI * 1.6;
    var spin = a - 0.72 * Math.sin(a);                  // lingers face-on, then whips round
    var sway = reduce ? -0.3 : 0.12 * Math.sin(t / 1400);
    cur.tx += ((reduce ? 0 : px) * 0.35 - cur.tx) * 0.06;
    cur.ty += ((reduce ? 0 : py) * 0.22 - cur.ty) * 0.06;

    if (cur.o < 0.01) { renderer.clear(); requestAnimationFrame(frame); return; }

    var scale = (cur.w / LOGO_W) * (0.72 + 0.28 * intro);
    rig.position.set(cur.x - vw / 2, vh / 2 - cur.y + (reduce ? 0 : Math.sin(t / 1100) * 5), 0);
    rig.scale.setScalar(scale);
    logo.rotation.set(0.02 + cur.ty + (reduce ? 0 : 0.02 * Math.sin(t / 1700)), spin + sway + cur.tx, 0);

    textMat.color.copy(INK).lerp(WHITE, cur.dark);
    faceMat.opacity = sideMat.opacity = textMat.opacity = cur.o;
    var solid = cur.o > 0.995;
    faceMat.transparent = sideMat.transparent = textMat.transparent = !solid;

    var lh = scale * (LOGO_W / 2.47);                  // approximate logo height in px
    shadow.position.set(rig.position.x, rig.position.y - lh * 0.72, -60);
    shadow.scale.set(scale * LOGO_W * 0.95, lh * 0.22, 1);
    shadowMat.opacity = cur.o * 0.9 * (1 - cur.dark);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
