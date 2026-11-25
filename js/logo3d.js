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
    if (!window.THREE || !L) throw 0;
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
  L.mark.forEach(function (l) {
    if (!l.hole) markShape = new THREE.Shape(l.pts.map(toV));
  });
  L.mark.forEach(function (l) {
    if (l.hole && markShape) markShape.holes.push(new THREE.Path(l.pts.map(toV)));
  });

  var markGeo = new THREE.ExtrudeGeometry(markShape, {
    depth: 15, steps: 1, curveSegments: 1,
    bevelEnabled: true, bevelThickness: 2.6, bevelSize: 1.9, bevelOffset: -1.9, bevelSegments: 10
  });
  markGeo.translate(0, 0, -7.5);

  // wordmark: monoline capitals drawn from strokes, laid out inside the original text box
  var H = tb[3] - tb[1], T = 0.19;
  function seg(x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1, n = Math.hypot(dx, dy), nx = -dy / n * T / 2, ny = dx / n * T / 2;
    return [[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]];
  }
  function arc(ox, oy, r, a0, a1) {
    var o = [], i = [], n = 28, k;
    for (k = 0; k <= n; k++) {
      var a = a0 + (a1 - a0) * k / n, c = Math.cos(a), s = Math.sin(a);
      o.push([ox + (r + T / 2) * c, oy + (r + T / 2) * s]);
      i.unshift([ox + (r - T / 2) * c, oy + (r - T / 2) * s]);
    }
    return o.concat(i);
  }
  var h = T / 2;
  var LETTERS = {
    A: { a: 0.95, f: function (a) { return [seg(0.07, 0.03, a / 2, 0.98), seg(a - 0.07, 0.03, a / 2, 0.98), seg(a * 0.27, 0.3, a * 0.73, 0.3)]; } },
    L: { a: 0.62, f: function (a) { return [seg(h, 0, h, 1), seg(0, h, a, h)]; } },
    F: { a: 0.62, f: function (a) { return [seg(h, 0, h, 1), seg(0, 1 - h, a, 1 - h), seg(0, 0.53, a * 0.86, 0.53)]; } },
    I: { a: 0.2, f: function () { return [seg(h, 0, h, 1)]; } },
    N: { a: 0.8, f: function (a) { return [seg(h, 0, h, 1), seg(a - h, 0, a - h, 1), seg(h, 0.97, a - h, 0.03)]; } },
    C: { a: 0.86, f: function (a) { return [arc(a / 2, 0.5, 0.5 - h, 0.72, 2 * Math.PI - 0.72)]; } },
    R: { a: 0.74, f: function (a) {
      var bx = a - 0.27, r = 0.275 - h;
      return [seg(h, 0, h, 1), seg(0, 1 - h, bx, 1 - h), seg(0, 0.45 + h, bx, 0.45 + h),
              arc(bx, 0.725, r, -Math.PI / 2, Math.PI / 2), seg(a * 0.45, 0.46, a - 0.04, 0.02)];
    } },
    ' ': { a: 0.42, f: function () { return []; } }
  };
  var TEXT = 'ALFA AFRICANA', GAP = 0.16;
  var units = 0;
  TEXT.split('').forEach(function (ch, i) { units += LETTERS[ch].a + (i ? GAP : 0); });
  var kx = (tb[2] - tb[0]) / (units * H);               // horizontal fit to the original wordmark width
  var textShapes = [], ox = 0;
  TEXT.split('').forEach(function (ch, i) {
    var def = LETTERS[ch];
    if (i) ox += GAP;
    def.f(def.a).forEach(function (poly) {
      textShapes.push(new THREE.Shape(poly.map(function (p) {
        return new THREE.Vector2(tb[0] - cx + (ox + p[0]) * kx * H, (cy - tb[3]) + p[1] * H);
      })));
    });
    ox += def.a;
  });
  var textGeo = new THREE.ExtrudeGeometry(textShapes, {
    depth: 6, steps: 1, curveSegments: 1,
    bevelEnabled: true, bevelThickness: 0.7, bevelSize: 0.42, bevelOffset: -0.42, bevelSegments: 2
  });
  textGeo.translate(0, 0, -3);

  /* ---------- materials, scene ---------- */
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  function lin(hex) { return new THREE.Color(hex).convertSRGBToLinear(); }
  INK.convertSRGBToLinear();

  // glossy blue acrylic face, polished teal-chrome edges, satin metal lettering
  var faceMat = new THREE.MeshPhysicalMaterial({ color: lin(BLUE), metalness: 0.0, roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 0.62, transparent: true });
  var sideMat = new THREE.MeshStandardMaterial({ color: lin(TEAL), metalness: 0.95, roughness: 0.2, envMapIntensity: 1.4, transparent: true });
  var textMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.55, roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.1, envMapIntensity: 1.1, transparent: true });

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
  var key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(-260, 340, 520); scene.add(key);

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
    var sway = reduce ? -0.3 : 0.26 * Math.sin(t / 1400);
    cur.tx += ((reduce ? 0 : px) * 0.35 - cur.tx) * 0.06;
    cur.ty += ((reduce ? 0 : py) * 0.22 - cur.ty) * 0.06;

    if (cur.o < 0.01) { renderer.clear(); requestAnimationFrame(frame); return; }

    var scale = (cur.w / LOGO_W) * (0.72 + 0.28 * intro);
    rig.position.set(cur.x - vw / 2, vh / 2 - cur.y + (reduce ? 0 : Math.sin(t / 1100) * 5), 0);
    rig.scale.setScalar(scale);
    logo.rotation.set(0.1 + cur.ty + (reduce ? 0 : 0.05 * Math.sin(t / 1700)), spin + sway + cur.tx, 0);

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
