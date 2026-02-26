// ============================================================
// Regret Your Sins — Visualization Engine
// ============================================================

// --- HiDPI Canvas Setup ---
function setupHiDPI(canvas) {
  var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  var rect = canvas.getBoundingClientRect();
  var w = Math.floor(rect.width * dpr);
  var h = Math.floor(rect.height * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  var ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

// --- Colors ---
var COL = {
  sin: '#D62828',
  cos: '#4DA6FF',
  t: '#F67E00',
  a: '#2A9C8E',
  phi: '#694B93',
  grid: 'rgba(255,255,255,0.10)',
  axis: 'rgba(255,255,255,0.38)',
  text: 'rgba(255,255,255,0.80)',
  bg2: 'rgba(0,0,0,0.25)'
};

var MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

function label(ctx, text, x, y, color) {
  ctx.save();
  ctx.fillStyle = color || COL.text;
  ctx.font = '12px ' + MONO;
  ctx.fillText(text, x, y);
  ctx.restore();
}

// ============================================================
// Section 1: Circle -> Waves -> Spiral
// ============================================================

var theta = 1.1;
var circleAnim = null;

function drawCircleScene() {
  var canvas = document.getElementById('circleCanvas');
  if (!canvas) return;
  var ctx = setupHiDPI(canvas);
  var w = canvas.getBoundingClientRect().width;
  var h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  var cx = w * 0.5, cy = h * 0.52;
  var r = Math.min(w, h) * 0.30;

  // axes
  ctx.strokeStyle = COL.axis; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

  // circle
  ctx.strokeStyle = 'rgba(255,255,255,0.60)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

  var px = cx + r * Math.cos(theta);
  var py = cy - r * Math.sin(theta);

  // cos projection
  ctx.strokeStyle = COL.cos; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(px, py); ctx.stroke();

  // sin projection
  ctx.strokeStyle = COL.sin; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py); ctx.stroke();

  // radius
  ctx.strokeStyle = COL.a; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();

  // point
  ctx.fillStyle = 'rgba(255,255,255,0.96)';
  ctx.beginPath(); ctx.arc(px, py, 5.5, 0, Math.PI * 2); ctx.fill();

  // angle arc
  ctx.strokeStyle = COL.t; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.35, 0, -theta, true); ctx.stroke();

  label(ctx, 't', cx + r * 0.18, cy - r * 0.10, COL.t);
  label(ctx, 'cos(t)', cx + r * 0.30, py - 8, COL.cos);
  label(ctx, 'sin(t)', px + 10, cy - r * 0.25, COL.sin);

  // readout
  ctx.fillStyle = COL.bg2; ctx.strokeStyle = 'rgba(255,255,255,0.14)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(16, 14, 220, 74, 12); ctx.fill(); ctx.stroke();
  ctx.font = '12px ' + MONO;
  ctx.fillStyle = COL.text; ctx.fillText('t = ' + theta.toFixed(3), 28, 36);
  ctx.fillStyle = COL.cos; ctx.fillText('cos(t) = ' + Math.cos(theta).toFixed(3), 28, 56);
  ctx.fillStyle = COL.sin; ctx.fillText('sin(t) = ' + Math.sin(theta).toFixed(3), 28, 76);
}

function drawWaveScene() {
  var canvas = document.getElementById('waveCanvas');
  if (!canvas) return;
  var ctx = setupHiDPI(canvas);
  var w = canvas.getBoundingClientRect().width;
  var h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  var pad = 42;
  var x0 = pad, y0 = h * 0.5, x1 = w - pad;
  var amp = Math.min(h * 0.34, 140);
  var tMax = Math.PI * 4;
  var toX = function(t) { return x0 + (t / tMax) * (x1 - x0); };
  var toY = function(v) { return y0 - v * amp; };

  // axes
  ctx.strokeStyle = COL.axis; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x0, pad); ctx.lineTo(x0, h - pad); ctx.stroke();

  function curve(fn, color) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2.8; ctx.beginPath();
    for (var i = 0; i <= 900; i++) {
      var t = (i / 900) * tMax;
      var x = toX(t), y = toY(fn(t));
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.restore();
  }
  curve(Math.sin, COL.sin);
  curve(Math.cos, COL.cos);

  // current t marker
  var tNow = ((theta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  var xNow = toX(tNow);
  ctx.strokeStyle = COL.t; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(xNow, pad); ctx.lineTo(xNow, h - pad); ctx.stroke();

  ctx.fillStyle = COL.sin;
  ctx.beginPath(); ctx.arc(xNow, toY(Math.sin(tNow)), 5.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = COL.cos;
  ctx.beginPath(); ctx.arc(xNow, toY(Math.cos(tNow)), 5.5, 0, Math.PI * 2); ctx.fill();

  label(ctx, 't', x1 - 14, y0 + 18, COL.t);
  label(ctx, '+1', x0 - 24, y0 - amp + 4, 'rgba(255,255,255,0.6)');
  label(ctx, '-1', x0 - 26, y0 + amp + 4, 'rgba(255,255,255,0.6)');

  // legend
  ctx.fillStyle = COL.bg2; ctx.strokeStyle = 'rgba(255,255,255,0.14)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(16, 14, 200, 54, 12); ctx.fill(); ctx.stroke();
  ctx.font = '12px ' + MONO;
  ctx.fillStyle = COL.sin; ctx.fillText('sin(t)', 28, 36);
  ctx.fillStyle = COL.cos; ctx.fillText('cos(t)', 100, 36);
  ctx.fillStyle = COL.text; ctx.fillText('circle angle -> time axis', 28, 54);
}

function drawSpiralScene() {
  var canvas = document.getElementById('spiralCanvas');
  if (!canvas) return;
  var ctx = setupHiDPI(canvas);
  var w = canvas.getBoundingClientRect().width;
  var h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  var cx = w * 0.5, cy = h * 0.5;
  var maxR = Math.min(w, h) * 0.42;
  var tMax = Math.PI * 10;
  var k = maxR / tMax;
  var r0 = 6;

  ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(255,255,255,0.60)';
  ctx.beginPath();
  for (var i = 0; i <= 2400; i++) {
    var t = (i / 2400) * tMax;
    var rr = r0 + k * t;
    var x = cx + rr * Math.cos(t), y = cy - rr * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // marker at current theta
  var rrNow = r0 + k * theta;
  var xNow = cx + rrNow * Math.cos(theta);
  var yNow = cy - rrNow * Math.sin(theta);
  ctx.fillStyle = 'rgba(255,255,255,0.96)';
  ctx.beginPath(); ctx.arc(xNow, yNow, 6, 0, Math.PI * 2); ctx.fill();

  label(ctx, 'spiral: (r0 + k*t) * (cos t, sin t)', 18, 28, 'rgba(255,255,255,0.72)');
}

function renderTrig() {
  drawCircleScene();
  drawWaveScene();
  drawSpiralScene();
}

function startCircleAnim() {
  if (circleAnim) return;
  var last = performance.now();
  function tick(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    theta = (theta + dt * 1.6) % (Math.PI * 10);
    renderTrig();
    circleAnim = requestAnimationFrame(tick);
  }
  circleAnim = requestAnimationFrame(tick);
}

// ============================================================
// Section 2: CFR Regret Matching for Rock-Paper-Scissors
// ============================================================

var PAYOFF = [
  [ 0, -1, +1],
  [+1,  0, -1],
  [-1, +1,  0]
];

function mulberry32(seed) {
  var a = seed >>> 0;
  return function() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sampleFromProbs(p, rng) {
  var r = rng(), cum = 0;
  for (var i = 0; i < p.length; i++) {
    cum += p[i];
    if (r <= cum) return i;
  }
  return p.length - 1;
}

function RegretMatcher() {
  this.regret = [0, 0, 0];
  this.strategy = [1/3, 1/3, 1/3];
  this.strategySum = [0, 0, 0];
}

RegretMatcher.prototype.getStrategy = function() {
  var pos = this.regret.map(function(r) { return Math.max(r, 0); });
  var s = pos[0] + pos[1] + pos[2];
  this.strategy = s > 1e-12 ? pos.map(function(v) { return v / s; }) : [1/3, 1/3, 1/3];
  return this.strategy;
};

RegretMatcher.prototype.accumulateStrategy = function() {
  for (var i = 0; i < 3; i++) this.strategySum[i] += this.strategy[i];
};

RegretMatcher.prototype.getAverageStrategy = function() {
  var s = this.strategySum[0] + this.strategySum[1] + this.strategySum[2];
  return s > 1e-12 ? this.strategySum.map(function(v) { return v / s; }) : [1/3, 1/3, 1/3];
};

RegretMatcher.prototype.updateRegrets = function(oppAction) {
  var uMix = 0;
  for (var a = 0; a < 3; a++) uMix += this.strategy[a] * PAYOFF[a][oppAction];
  for (var a = 0; a < 3; a++) this.regret[a] += (PAYOFF[a][oppAction] - uMix);
};

function runCFR(totalIters, seed) {
  var rng = mulberry32(seed);
  var p1 = new RegretMatcher();
  var p2 = new RegretMatcher();
  var piHist = [], avgHist = [];

  for (var t = 1; t <= totalIters; t++) {
    var s1 = p1.getStrategy();
    p1.accumulateStrategy();
    var avg1 = p1.getAverageStrategy();
    var s2 = p2.getStrategy();
    p2.accumulateStrategy();

    var a1 = sampleFromProbs(s1, rng);
    var a2 = sampleFromProbs(s2, rng);

    p1.updateRegrets(a2);
    p2.updateRegrets(a1);

    piHist.push([s1[0], s1[1], s1[2]]);
    avgHist.push([avg1[0], avg1[1], avg1[2]]);
  }
  return { p1: p1, piHist: piHist, avgHist: avgHist };
}

function drawLineChart(canvas, series, n) {
  var ctx = setupHiDPI(canvas);
  var w = canvas.getBoundingClientRect().width;
  var h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  var padL = 56, padR = 20, padT = 28, padB = 44;
  var x0 = padL, y0 = h - padB, x1 = w - padR, y1 = padT;

  ctx.strokeStyle = COL.axis; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.stroke();

  var toX = function(i) { return x0 + (i / (n - 1)) * (x1 - x0); };
  var toY = function(v) { return y0 - v * (y0 - y1); };

  // y ticks
  ctx.font = '14px ' + MONO; ctx.fillStyle = 'rgba(255,255,255,0.85)';
  [0, 1/3, 2/3, 1].forEach(function(v) {
    var yy = toY(v);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(v.toFixed(2), 8, yy + 5);
  });

  // lines
  series.forEach(function(s) {
    ctx.save(); ctx.strokeStyle = s.color; ctx.lineWidth = 3; ctx.beginPath();
    for (var i = 0; i < n; i++) {
      var x = toX(i), y = toY(s.data[i]);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.restore();
  });

  // endpoints
  series.forEach(function(s) {
    var x = toX(n - 1), y = toY(s.data[n - 1]);
    ctx.fillStyle = s.color;
    ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
    ctx.font = 'bold 15px ' + MONO;
    ctx.fillText(s.label, x - 22, y - 12);
  });

  label(ctx, 'iterations (t)', x1 - 100, y0 + 28, COL.t);
}

// --- Live CFR animation state ---
var CFR_MAX = 2000;
var CFR_PER_FRAME = 3; // iterations per animation frame
var CFR_PAUSE_MS = 3000; // pause at end before restarting

var cfrState = null;
var cfrP1 = null, cfrP2 = null, cfrRng = null;
var cfrAnim = null;

function resetCFRState() {
  cfrRng = mulberry32(7);
  cfrP1 = new RegretMatcher();
  cfrP2 = new RegretMatcher();
  cfrState = { p1: cfrP1, piHist: [], avgHist: [] };
}

function stepCFR(count) {
  for (var k = 0; k < count; k++) {
    if (cfrState.piHist.length >= CFR_MAX) return;

    var s1 = cfrP1.getStrategy();
    cfrP1.accumulateStrategy();
    var avg1 = cfrP1.getAverageStrategy();
    var s2 = cfrP2.getStrategy();
    cfrP2.accumulateStrategy();

    var a1 = sampleFromProbs(s1, cfrRng);
    var a2 = sampleFromProbs(s2, cfrRng);

    cfrP1.updateRegrets(a2);
    cfrP2.updateRegrets(a1);

    cfrState.piHist.push([s1[0], s1[1], s1[2]]);
    cfrState.avgHist.push([avg1[0], avg1[1], avg1[2]]);
  }
}

function drawCFRCharts() {
  var n = cfrState.piHist.length;
  if (n < 2) return;

  // Draw line charts scaled to CFR_MAX so the x-axis doesn't jump
  function makeSeriesSlice(hist) {
    return [
      { label: 'R', color: COL.sin, data: hist.map(function(v) { return v[0]; }) },
      { label: 'P', color: COL.cos, data: hist.map(function(v) { return v[1]; }) },
      { label: 'S', color: COL.a, data: hist.map(function(v) { return v[2]; }) }
    ];
  }

  var piC = document.getElementById('piCanvas');
  var avgC = document.getElementById('avgCanvas');
  if (piC) drawLineChart(piC, makeSeriesSlice(cfrState.piHist), n);
  if (avgC) drawLineChart(avgC, makeSeriesSlice(cfrState.avgHist), n);

  // Live stats table
  var body = document.getElementById('statsBody');
  if (body) {
    var piLast = cfrState.piHist[n - 1];
    var avgLast = cfrState.avgHist[n - 1];
    var reg = cfrP1.regret;
    var fmt = function(x) { return (Math.round(x * 1000) / 1000).toFixed(3); };
    var rows = [
      { a: 'Rock', c: COL.sin, pi: piLast[0], avg: avgLast[0], r: reg[0] },
      { a: 'Paper', c: COL.cos, pi: piLast[1], avg: avgLast[1], r: reg[1] },
      { a: 'Scissors', c: COL.a, pi: piLast[2], avg: avgLast[2], r: reg[2] }
    ];
    body.innerHTML = rows.map(function(row) {
      return '<tr><td style="color:' + row.c + '">' + row.a + '</td>'
        + '<td>' + fmt(row.pi) + '</td>'
        + '<td>' + fmt(row.avg) + '</td>'
        + '<td>' + fmt(row.r) + '</td></tr>';
    }).join('');
  }
}

function startCFRAnimation() {
  resetCFRState();
  var paused = false;

  function tick() {
    if (paused) return;

    if (cfrState.piHist.length >= CFR_MAX) {
      // Pause, then restart
      paused = true;
      setTimeout(function() {
        resetCFRState();
        paused = false;
        cfrAnim = requestAnimationFrame(tick);
      }, CFR_PAUSE_MS);
      return;
    }

    stepCFR(CFR_PER_FRAME);
    drawCFRCharts();
    renderCrosses();
    renderSimplex();
    cfrAnim = requestAnimationFrame(tick);
  }

  cfrAnim = requestAnimationFrame(tick);
}

// ============================================================
// Section 3: Three Crosses — R, P, S Average Policy Graphs
// ============================================================
// Proper Cartesian graph. X = probability ("justice"). Y = learning
// time, going UP from origin at bottom-left. Vertical reference line
// at x = 1/3 ("righteousness"). Horizontal reference line where the
// policy converges to 1/3. The intersection is the cross. The
// sinusoidal average policy trajectory draws the shape.

function drawCrossGraph(canvasId, policyData, opts) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var ctx = setupHiDPI(canvas);
  var w = canvas.getBoundingClientRect().width;
  var h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  var n = policyData.length;
  var padL = 44, padR = 14, padT = 36, padB = 40;
  var plotW = w - padL - padR;
  var plotH = h - padT - padB;

  // Origin at bottom-left of plot area
  var ox = padL, oy = padT + plotH;

  // X axis centered on 1/3: find the max deviation from 1/3 in the data
  var maxDev = 0.01;
  for (var i = 0; i < n; i++) {
    var dev = Math.abs(policyData[i] - 1/3);
    if (dev > maxDev) maxDev = dev;
  }
  maxDev = maxDev * 1.15; // slight padding
  var xMin = 1/3 - maxDev;
  var xMax = 1/3 + maxDev;
  // X maps [xMin, xMax] -> [ox, ox+plotW], centered on 1/3
  var toX = function(p) {
    return ox + ((p - xMin) / (xMax - xMin)) * plotW;
  };
  // Y maps iteration [0,n-1] -> [oy, padT] (0 at bottom, n-1 at top)
  var toY = function(i) { return oy - (i / (n - 1)) * plotH; };

  // --- Grid lines ---
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1;
  // Vertical grid: symmetric around 1/3
  var gridStep = maxDev / 2;
  [1/3 - maxDev, 1/3 - gridStep, 1/3, 1/3 + gridStep, 1/3 + maxDev].forEach(function(p) {
    var x = toX(p);
    ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, oy); ctx.stroke();
  });
  // Horizontal grid: 5 evenly spaced time ticks
  for (var g = 0; g <= 4; g++) {
    var yy = toY(g * (n - 1) / 4);
    ctx.beginPath(); ctx.moveTo(ox, yy); ctx.lineTo(ox + plotW, yy); ctx.stroke();
  }
  ctx.restore();

  // --- Axes (four borders, faint) ---
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(ox, padT, plotW, plotH);
  ctx.restore();

  // --- THE CROSS ---
  var eqX = toX(1 / 3);
  // Crossbar (justice) at 70% up the chart — forms the horizontal beam
  var crossbarY = toY(Math.floor(n * 0.70));

  // Righteousness: vertical beam at x = 1/3
  ctx.save();
  ctx.strokeStyle = COL.t;
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(eqX, padT); ctx.lineTo(eqX, oy); ctx.stroke();
  ctx.restore();

  // Justice: horizontal beam at 70% learning time
  ctx.save();
  ctx.strokeStyle = COL.t;
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(ox, crossbarY); ctx.lineTo(ox + plotW, crossbarY); ctx.stroke();
  ctx.restore();

  // --- Fill area between trajectory and 1/3 line ---
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = opts.color;
  ctx.beginPath();
  ctx.moveTo(eqX, toY(0));
  for (var i = 0; i < n; i++) ctx.lineTo(toX(policyData[i]), toY(i));
  ctx.lineTo(eqX, toY(n - 1));
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // --- Policy trajectory ---
  ctx.save();
  ctx.strokeStyle = opts.color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (var i = 0; i < n; i++) {
    var x = toX(policyData[i]);
    var y = toY(i);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // --- Tick labels on the cross lines ---
  ctx.save();
  ctx.font = '11px ' + MONO;

  // 1/3 tick at top of the plumb line (label is in axis labels below)
  ctx.fillStyle = COL.t;
  ctx.textAlign = 'center';
  ctx.font = '10px ' + MONO;
  ctx.fillText('1/3', eqX, padT - 3);

  // X range ticks at the crossbar height
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '10px ' + MONO;
  ctx.fillText(xMin.toFixed(2), toX(xMin), crossbarY - 6);
  ctx.fillText(xMax.toFixed(2), toX(xMax), crossbarY - 6);

  // Y axis ticks
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillText('0', ox - 6, toY(0) + 3);
  ctx.fillText('' + (n - 1), ox - 6, toY(n - 1) + 3);

  ctx.restore();

  // --- Axis labels on the cross ---
  ctx.save();

  // "justice" label on the crossbar, right end
  ctx.font = 'bold 12px ' + MONO;
  ctx.fillStyle = COL.t;
  ctx.textAlign = 'right';
  ctx.fillText('justice', ox + plotW + 2, crossbarY + 16);

  // "righteousness" label on the vertical beam, top
  ctx.textAlign = 'center';
  ctx.fillText('righteousness', eqX, padT - 14);

  // "learning time" on Y axis (rotated)
  ctx.font = '11px ' + MONO;
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.translate(10, padT + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText('learning time', 0, 0);

  ctx.restore();

  // --- Action label ---
  ctx.save();
  ctx.font = 'bold 14px ' + MONO;
  ctx.fillStyle = opts.color;
  ctx.textAlign = 'left';
  ctx.fillText(opts.label, ox + 6, padT + 18);
  ctx.restore();
}

function renderCrosses() {
  if (!cfrState) return;

  drawCrossGraph('crossLeft', cfrState.avgHist.map(function(v) { return v[0]; }), {
    color: COL.sin, label: 'Rock'
  });

  drawCrossGraph('crossCenter', cfrState.avgHist.map(function(v) { return v[1]; }), {
    color: COL.cos, label: 'Paper'
  });

  drawCrossGraph('crossRight', cfrState.avgHist.map(function(v) { return v[2]; }), {
    color: COL.a, label: 'Scissors'
  });
}

// ============================================================
// Section 4: Regret Spiral — Policy in the Simplex
// ============================================================

// Project barycentric coords (p0,p1,p2) onto 2D equilateral triangle
function baryToXY(p, cx, cy, scale) {
  // Vertices: top=R, bottom-left=P, bottom-right=S
  var sqrt3 = Math.sqrt(3);
  var x = cx + scale * (p[2] - p[1]) * sqrt3 / 2;
  var y = cy - scale * (p[0] - 0.5 * (p[1] + p[2]));
  return { x: x, y: y };
}

function drawSimplexTriangle(ctx, cx, cy, scale) {
  var verts = [
    baryToXY([1, 0, 0], cx, cy, scale),
    baryToXY([0, 1, 0], cx, cy, scale),
    baryToXY([0, 0, 1], cx, cy, scale)
  ];

  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(verts[0].x, verts[0].y);
  ctx.lineTo(verts[1].x, verts[1].y);
  ctx.lineTo(verts[2].x, verts[2].y);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // vertex labels
  ctx.font = 'bold 14px ' + MONO;
  ctx.fillStyle = COL.sin; ctx.fillText('R', verts[0].x - 6, verts[0].y - 12);
  ctx.fillStyle = COL.cos; ctx.fillText('P', verts[1].x - 18, verts[1].y + 18);
  ctx.fillStyle = COL.a;   ctx.fillText('S', verts[2].x + 6, verts[2].y + 18);

  // Nash equilibrium marker
  var nash = baryToXY([1/3, 1/3, 1/3], cx, cy, scale);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(nash.x, nash.y, 8, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.beginPath(); ctx.arc(nash.x, nash.y, 8, 0, Math.PI * 2); ctx.fill();
  label(ctx, '1/3', nash.x + 12, nash.y + 4, 'rgba(255,255,255,0.6)');
}

function drawSimplexTrajectory(canvasId, trajectory, title) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var ctx = setupHiDPI(canvas);
  var w = canvas.getBoundingClientRect().width;
  var h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  var cx = w / 2, cy = h / 2 + 10;
  var scale = Math.min(w, h) * 0.38;

  drawSimplexTriangle(ctx, cx, cy, scale);

  // draw trajectory with fading trail
  var n = trajectory.length;
  ctx.lineWidth = 2;
  for (var i = 1; i < n; i++) {
    var alpha = 0.05 + 0.65 * (i / n);
    var p0 = baryToXY(trajectory[i - 1], cx, cy, scale);
    var p1 = baryToXY(trajectory[i], cx, cy, scale);

    // color by dominant action
    var dom = trajectory[i];
    var maxIdx = dom[0] >= dom[1] && dom[0] >= dom[2] ? 0 : (dom[1] >= dom[2] ? 1 : 2);
    var colors = [COL.sin, COL.cos, COL.a];

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = colors[maxIdx];
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
    ctx.restore();
  }

  // endpoint
  if (n > 0) {
    var end = baryToXY(trajectory[n - 1], cx, cy, scale);
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(end.x, end.y, 5, 0, Math.PI * 2); ctx.fill();
  }

  label(ctx, title, 16, 22, COL.text);
}

function renderSimplex() {
  if (!cfrState) return;
  drawSimplexTrajectory('spiralPolicyCanvas', cfrState.piHist, 'instantaneous policy');
  drawSimplexTrajectory('spiralAvgCanvas', cfrState.avgHist, 'average policy');
}

// ============================================================
// Initialization
// ============================================================

function initAll() {
  startCFRAnimation();
  startCircleAnim();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
