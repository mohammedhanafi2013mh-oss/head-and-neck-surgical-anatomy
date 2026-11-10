// Renders the home screen's picture of each region from the running app:
// icons/regions/<id>.webp, the region's default view on a transparent ground.
//   node tools/region_thumbs.js [region ids...]
// Serve the app first, e.g. python3 -m http.server 8765; set APP_URL to use another address.
const fs = require('fs');
const path = require('path');
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const APP = process.env.APP_URL || 'http://localhost:8765/index.html';
const OUT = path.join(__dirname, '..', 'icons', 'regions');
(async () => {
  global.window = { ANATOMY: {} };
  require('../js/catalog.js');
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : window.ANATOMY.catalog.map((r) => r.id);
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 720, height: 480 } });
  p.on('pageerror', (e) => console.log('PAGEERR', e.message));
  await p.addInitScript(() => { try { localStorage.setItem('guideSeen', '1'); localStorage.setItem('labelMode', 'off'); } catch (e) {} });
  for (const id of ids) {
    await p.goto('about:blank');
    await p.goto(APP + '#' + id, { waitUntil: 'domcontentloaded' });
    await p.waitForFunction(() => document.querySelector('#viewer-loading').hidden && window.ANATOMY?.viewer?.structures.size > 0, null, { timeout: 90000 });
    await p.addStyleTag({ content: `.viewer-wrap { position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 9999; border-radius: 0 !important; border: 0 !important; } .viewer-toolbar, .viewer-controls, .viewer-hint, .viewer-badge, .labels, .photo-bar { display: none !important; }` });
    await p.waitForTimeout(1500);
    const url = await p.evaluate(() => {
      const v = window.ANATOMY.viewer; v.stopFly && v.stopFly();
      v.spherical.radius *= 0.86; // a little closer than the working view
      v.render();
      return v.renderer.domElement.toDataURL('image/webp', 0.86);
    });
    fs.writeFileSync(path.join(OUT, id + '.webp'), Buffer.from(url.split(',')[1], 'base64'));
    console.log(id, Math.round(fs.statSync(path.join(OUT, id + '.webp')).size / 1024) + ' KB');
  }
  await b.close();
})();
