// Renders the 3D frames of a surgical film from the running app.
//   node tools/film/render.js <film dir> <work dir> [segment ids...]
// The film dir holds shots.json (region, camera per segment, layers set
// aside); the work dir holds segments.json from narrate.py and receives
// frames/<segment>/NNNNN.png with labels.json (screen positions of the
// labelled structures in each frame). Serve the app first, e.g.
// python3 -m http.server 8765; set APP_URL to use another address.
// PREVIEW=1 renders one frame per segment, just after the camera move.
const fs = require('fs');
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const [FILM, WORK, ...ARGS] = process.argv.slice(2);
const cfg = JSON.parse(fs.readFileSync(FILM + '/shots.json')), segs = JSON.parse(fs.readFileSync(WORK + '/segments.json'));
const APP = process.env.APP_URL || 'http://localhost:8765/index.html';
const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const lerpCam = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k, a[3].map((v, i) => v + (b[3][i] - v) * k)];
// Camera of segment index n at time t (seconds), and its end camera.
function plan() {
  const out = []; let prevEnd = cfg.start;
  for (const s of segs) {
    const shot = cfg.shots[s.id]; if (!shot) { out.push(null); continue; }
    const D = s.dur + cfg.lead + cfg.tail, move = shot.move || cfg.move;
    const after = shot.end || [shot.to[0] + cfg.drift * (D - move), shot.to[1], shot.to[2], shot.to[3]];
    const from = prevEnd;
    const cam = (t) => t < move ? lerpCam(from, shot.to, ease(Math.min(1, t / move))) : lerpCam(shot.to, after, shot.end ? ease((t - move) / Math.max(0.01, D - move)) : (t - move) / Math.max(0.01, D - move));
    out.push({ D, cam, shot }); prevEnd = after;
  }
  return out;
}
(async () => {
  const want = ARGS.length ? ARGS : segs.filter((s) => cfg.shots[s.id]).map((s) => s.id), P = plan();
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  p.on('pageerror', (e) => console.log('PAGEERR', e.message));
  await p.addInitScript(() => { try { localStorage.setItem('guideSeen', '1'); localStorage.setItem('labelMode', 'off'); localStorage.setItem('showRisk', '1'); } catch (e) {} });
  await p.goto(APP + '#' + cfg.region, { waitUntil: 'domcontentloaded' });
  await p.waitForFunction(() => document.querySelector('#viewer-loading').hidden && window.ANATOMY?.viewer?.structures.size > 0, null, { timeout: 90000 });
  await p.addStyleTag({ content: `.viewer-wrap { position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 9999; border-radius: 0 !important; border: 0 !important; } .viewer-toolbar, .viewer-controls, .viewer-hint, .credit, .labels, .photo-bar { display: none !important; }` });
  await p.waitForTimeout(1500);
  let curStep = -1;
  for (const id of want) {
    const n = segs.findIndex((s) => s.id === id), seg = segs[n], pl = P[n];
    if (seg.step !== null && seg.step !== undefined) {
      if (curStep < 0) { await p.$eval('[data-tab="surgery"]', (e) => e.click()); curStep = 0; await p.waitForTimeout(800); }
      while (curStep < seg.step) { await p.$eval('[data-step="1"]', (e) => e.click()); curStep++; await p.waitForTimeout(300); }
    }
    // Layers retracted in this shot are set aside; extra structures can stay highlighted.
    await p.evaluate(([hide, add]) => {
      const v = window.ANATOMY.viewer; v.showHidden(); for (const id of hide) v.hide(id);
      if (add.length) v.setFocus([...v.focusIds, ...add]);
    }, [pl.shot.hide || [], pl.shot.addFocus || []]);
    await p.waitForTimeout(1200);
    const labelIds = pl.shot.labels || null;
    const dir = `${WORK}/${process.env.PREVIEW ? 'preview' : 'frames'}/${id}`; fs.mkdirSync(dir, { recursive: true });
    const N = Math.round(pl.D * cfg.fps), meta = [];
    for (const i of process.env.PREVIEW ? [Math.min(N - 1, Math.round((pl.shot.move || cfg.move) * cfg.fps) + 3)] : [...Array(N).keys()]) {
      const c = pl.cam(i / cfg.fps);
      const r = await p.evaluate(([c, labelIds]) => {
        const v = window.ANATOMY.viewer; v.stopFly && v.stopFly();
        Object.assign(v.spherical, { theta: c[0], phi: c[1], radius: c[2] }); v.target.set(...c[3]);
        v.render();
        const w = v.renderer.domElement.width, h = v.renderer.domElement.height, labels = [];
        const ids = labelIds || [...v.focusIds];
        for (const id of ids) {
          const s = v.structures.get(id); if (!s || !s.root.visible) continue;
          const q = s.anchor.clone().project(v.camera); if (q.z > 1 || Math.abs(q.x) > 1 || Math.abs(q.y) > 1) continue;
          labels.push({ id, name: s.name, x: (q.x + 1) / 2 * w, y: (1 - q.y) / 2 * h, danger: v.dangerIds.has(id) });
        }
        return { png: v.renderer.domElement.toDataURL('image/png'), labels };
      }, [c, labelIds]);
      fs.writeFileSync(`${dir}/${String(i).padStart(5, '0')}.png`, Buffer.from(r.png.split(',')[1], 'base64'));
      meta.push(r.labels);
      if (i % 30 === 0) console.log(id, i, '/', N, new Date().toISOString().slice(11, 19));
    }
    fs.writeFileSync(`${dir}/labels.json`, JSON.stringify(meta));
    console.log('done', id, N);
  }
  await b.close();
})();
