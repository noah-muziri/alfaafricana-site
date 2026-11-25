/* Topographic contour lines: a smooth made-up terrain, contoured with marching squares,
   drawn once to an image and used as a fixed backdrop on every section. */
(function () {
  var W = 1600, H = 1000, STEP = 10;
  var cols = W / STEP + 1, rows = H / STEP + 1;

  function terrain(x, y) {
    return Math.sin(x * 0.0046 + 1.7 * Math.sin(y * 0.0031))
      + Math.sin(y * 0.0052 + 1.4 * Math.cos(x * 0.0037))
      + 0.7 * Math.sin((x * 0.0021 + y * 0.0027) * 2.1 + 1.3)
      + 0.4 * Math.sin(x * 0.0089 - y * 0.0061);
  }

  var f = new Float32Array(cols * rows);
  for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) f[j * cols + i] = terrain(i * STEP, j * STEP);

  function render(stroke, width) {
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var g = c.getContext('2d');
    g.strokeStyle = stroke; g.lineWidth = width; g.lineCap = 'round';
    for (var lv = -3; lv <= 3; lv += 0.27) {
      g.beginPath();
      for (var y = 0; y < rows - 1; y++) {
        for (var x = 0; x < cols - 1; x++) {
          var a = f[y * cols + x], b = f[y * cols + x + 1], cc = f[(y + 1) * cols + x + 1], d = f[(y + 1) * cols + x];
          var k = (a > lv ? 1 : 0) | (b > lv ? 2 : 0) | (cc > lv ? 4 : 0) | (d > lv ? 8 : 0);
          if (k === 0 || k === 15) continue;
          var px = x * STEP, py = y * STEP;
          var t = { x: px + STEP * (lv - a) / (b - a), y: py };
          var r = { x: px + STEP, y: py + STEP * (lv - b) / (cc - b) };
          var bo = { x: px + STEP * (lv - d) / (cc - d), y: py + STEP };
          var l = { x: px, y: py + STEP * (lv - a) / (d - a) };
          var segs = {
            1: [[l, t]], 2: [[t, r]], 3: [[l, r]], 4: [[r, bo]], 6: [[t, bo]], 7: [[l, bo]], 8: [[l, bo]], 9: [[t, bo]],
            11: [[bo, r]], 12: [[l, r]], 13: [[t, r]], 14: [[l, t]], 5: [[l, t], [bo, r]], 10: [[t, r], [l, bo]]
          }[k];
          for (var s = 0; s < segs.length; s++) {
            g.moveTo(segs[s][0].x, segs[s][0].y); g.lineTo(segs[s][1].x, segs[s][1].y);
          }
        }
      }
      g.stroke();
    }
    return 'url(' + c.toDataURL('image/png') + ')';
  }

  var root = document.documentElement.style;
  root.setProperty('--topo-light', render('rgba(10, 16, 32, 0.10)', 1.5));
  root.setProperty('--topo-dark', render('rgba(255, 255, 255, 0.075)', 1.5));
})();
