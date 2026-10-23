// Usability tests: drives the built web app (dist/web) in headless Chromium the
// way a user would (desktop, phone and offline) and writes tests/report/
// (report.html, results.json and screenshots).
//   npm run build:web && node tests/usability.mjs [--quick]
// Exit code 1 if any check fails.

import { createServer } from "node:http";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "playwright";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WEB = join(ROOT, "dist", "web");
const OUT = join(ROOT, "tests", "report");
const QUICK = process.argv.includes("--quick");
mkdirSync(OUT, { recursive: true });

// ---------- static server for dist/web ----------
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".webmanifest": "application/manifest+json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = normalize(join(WEB, path));
  try {
    if (!file.startsWith(WEB) || !statSync(file).isFile()) throw new Error();
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

// ---------- harness ----------
const results = [];
const shots = [];
const GL = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
const browser = await chromium.launch({ args: GL });

async function check(area, name, fn) {
  const t0 = Date.now();
  try {
    const detail = await fn();
    results.push({ area, name, ok: true, ms: Date.now() - t0, detail: detail || "" });
    console.log(`  ✓ ${area} · ${name}${detail ? ` (${detail})` : ""}`);
  } catch (e) {
    results.push({ area, name, ok: false, ms: Date.now() - t0, detail: String(e.message || e).split("\n")[0] });
    console.log(`  ✗ ${area} · ${name}: ${e.message}`);
  }
}
const expect = (cond, msg) => { if (!cond) throw new Error(msg); };
async function shot(page, file, caption) {
  // Software WebGL is slow; give the frame time to render.
  await page.screenshot({ path: join(OUT, file), timeout: 150000 });
  shots.push({ file, caption });
}
async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 860 }, ...opts });
  const page = await ctx.newPage();
  page.errors = [];
  page.on("pageerror", (e) => page.errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && !/favicon|404/.test(m.text()) && page.errors.push(m.text()));
  return { ctx, page };
}
// Region meshes load as script tags and hold back the page's load event, so
// navigation waits only for the DOM; ready() then waits for the app itself.
const NAV = { waitUntil: "domcontentloaded", timeout: 90000 };
const ready = (page) => page.waitForFunction(() => document.querySelector("#viewer-loading").hidden && window.ANATOMY?.viewer?.structures.size > 0, null, { timeout: 60000 });
const state = (page) => page.evaluate(() => ({ hash: location.hash, region: document.querySelector("#region-select").value,
  h2: document.querySelector("#panel-body h2")?.textContent || "", structures: window.ANATOMY.viewer.structures.size }));

// ---------- desktop ----------
console.log(`Testing ${BASE}`);
const { ctx, page } = await newPage();

await check("First visit", "App opens on a region within 15 s", async () => {
  const t0 = Date.now();
  await page.goto(BASE, NAV);
  await ready(page);
  const ms = Date.now() - t0;
  expect(ms < 15000, `took ${ms} ms`);
  return `${(ms / 1000).toFixed(1)} s, ${(await state(page)).structures} structures`;
});
await check("First visit", "A dismissible tip points new users to the guide", async () => {
  expect(await page.isVisible("#first-tip"), "tip not shown");
  await shot(page, "01-first-visit.png", "First visit: model, layers, tabs and the one-time tip");
  await page.click("[data-tip-close]");
  expect(!(await page.isVisible("#first-tip")), "tip did not close");
  await page.reload(NAV);
  await ready(page);
  expect(!(await page.isVisible("#first-tip")), "tip came back after dismissing");
});

const regions = await page.$$eval("#region-select option:not([disabled])", (o) => o.map((x) => x.value));
// Shared CI machines render 3D in software and vary a lot in speed (the deep neck
// took 10 s locally and 10-31 s on GitHub runners), so CI gets a wider budget.
const REGION_BUDGET = process.env.CI ? 60000 : 30000;
await check("Regions", `All ${regions.length} regions load, each under ${REGION_BUDGET / 1000} s`, async () => {
  const times = [];
  for (const r of QUICK ? regions.slice(0, 3) : regions) {
    const t0 = Date.now();
    await page.selectOption("#region-select", r);
    await page.waitForFunction((id) => location.hash.startsWith("#" + id) && document.querySelector("#viewer-loading").hidden, r, { timeout: 60000 });
    const n = await page.evaluate(() => window.ANATOMY.viewer.structures.size);
    expect(n > 10, `${r}: only ${n} structures`);
    times.push([r, Date.now() - t0]);
  }
  const slow = times.filter(([, ms]) => ms > REGION_BUDGET);
  expect(!slow.length, `slow: ${slow.map(([r, ms]) => `${r} ${ms} ms`).join(", ")}`);
  return `slowest ${Math.max(...times.map(([, ms]) => ms)) / 1000} s`;
});

await page.selectOption("#region-select", "parotid");
await ready(page);
await check("Tabs", "Every tab shows content", async () => {
  const tabs = await page.$$eval("[data-tab]", (b) => b.map((x) => x.dataset.tab));
  for (const t of tabs) {
    await page.click(`[data-tab="${t}"]`);
    const len = await page.evaluate(() => document.querySelector("#panel-body").innerText.trim().length);
    expect(len > 80, `${t} tab nearly empty`);
  }
  return tabs.join(", ");
});

await check("Structures", "Opening a structure shows its notes and updates the address", async () => {
  await page.click('[data-tab="structures"]');
  await page.fill("[data-search]", "facial nerve");
  await page.click('.structure-list [data-select="facial_trunk"]');
  const s = await state(page);
  expect(/facial/i.test(s.h2), `heading ${s.h2}`);
  expect(s.hash === "#parotid/facial_trunk", `hash ${s.hash}`);
  return s.hash;
});
await check("Structures", "A shared link opens the same structure", async () => {
  const { ctx: c2, page: p2 } = await newPage();
  await p2.goto(BASE + "#thyroid/rln_right", NAV);
  await ready(p2);
  await p2.waitForSelector("#panel-body h2");
  const s = await state(p2);
  await c2.close();
  expect(s.region === "thyroid" && /recurrent/i.test(s.h2), `${s.region} / ${s.h2}`);
  return s.h2;
});

await check("Tracing", "Trace a course: the tracer reaches every waypoint", async () => {
  await page.click("[data-back]");
  await page.fill("[data-search]", ""); // the quick list shows when the list isn't filtered
  await page.click('.trace-quick [data-select="facial_trunk"]');
  await page.waitForFunction(() => {
    const li = document.querySelectorAll(".course-list li");
    return li.length && document.querySelectorAll(".course-list li.reached").length === li.length;
  }, null, { timeout: 30000 });
  const n = await page.$$eval(".course-list li", (l) => l.length);
  await shot(page, "02-trace.png", "Tracing the facial nerve: pins appear as the tracer passes each branch");
  return `${n} waypoints`;
});

await check("3D model", "Double-click hides a structure; Show hidden restores it", async () => {
  await page.click('[data-tab="overview"]');
  await page.click('[data-view="lateral"]');
  await page.waitForTimeout(800);
  const box = await page.locator("#viewer canvas").first().boundingBox();
  let hid = null;
  for (const [fx, fy] of [[0.5, 0.5], [0.45, 0.55], [0.55, 0.45], [0.4, 0.4], [0.6, 0.6]]) {
    await page.mouse.dblclick(box.x + box.width * fx, box.y + box.height * fy);
    await page.waitForTimeout(400);
    hid = await page.evaluate(() => [...window.ANATOMY.viewer.hidden][0] || null);
    if (hid) break;
  }
  expect(hid, "nothing hidden");
  expect(await page.isVisible("#show-hidden"), "Show hidden button missing");
  await page.click("#show-hidden");
  expect(await page.evaluate(() => window.ANATOMY.viewer.hidden.size === 0), "not restored");
  return `hid ${hid}`;
});
await check("3D model", "Layer chips turn layers off and on", async () => {
  const chip = page.locator("#layer-toggles .chip").nth(1);
  await chip.click();
  expect((await chip.getAttribute("aria-pressed")) === "false", "chip did not switch off");
  await chip.click();
  expect((await chip.getAttribute("aria-pressed")) === "true", "chip did not switch back on");
});
await check("3D model", "View buttons and the labels menu respond", async () => {
  for (const v of ["inferior", "anterior", "reset"]) await page.click(`[data-view="${v}"]`);
  await page.selectOption("#labels-mode", "all");
  const all = await page.$$eval(".label", (l) => l.filter((x) => x.offsetParent).length);
  await page.selectOption("#labels-mode", "off");
  const off = await page.$$eval(".label", (l) => l.filter((x) => x.offsetParent).length);
  await page.selectOption("#labels-mode", "some");
  expect(all > off, `labels all=${all} off=${off}`);
  return `${all} labels with "All", ${off} with "No labels"`;
});

await check("Search", "'/' searches every region and opens the result", async () => {
  await page.keyboard.press("/");
  await page.waitForSelector("#search-dialog[open]");
  await page.fill("#search-all", "recurrent laryngeal");
  await page.waitForSelector("[data-hit]");
  const hits = await page.$$eval("[data-hit] .hit-region", (h) => [...new Set(h.map((x) => x.textContent))]);
  expect(hits.length >= 2, `found in ${hits.join(", ")}`);
  await shot(page, "03-search.png", `Search across all ${regions.length} regions`);
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.querySelector("#viewer-loading").hidden && /\/rln/.test(location.hash), null, { timeout: 60000 });
  const s = await state(page);
  return `found in ${hits.length} regions → opened ${s.hash}`;
});
await check("Search", "Esc closes the search", async () => {
  await page.keyboard.press("/");
  await page.waitForSelector("#search-dialog[open]");
  await page.keyboard.press("Escape");
  expect(!(await page.isVisible("#search-dialog")), "still open");
});

await check("Surgery", "Walkthrough steps forward and back", async () => {
  await page.click('[data-tab="surgery"]');
  const first = await page.textContent(".step-card h4");
  await page.click('[data-step="1"]');
  const second = await page.textContent(".step-card h4");
  await page.click('[data-step="-1"]');
  expect(first !== second && (await page.textContent(".step-card h4")) === first, "steps did not change");
  return `"${first}" → "${second}"`;
});
await check("Surgery", "The incision is drawn on the model at the incision step, and cleared after", async () => {
  // The walkthrough is on the thyroid (opened from the search): steps 1–2 draw the Kocher incision.
  const at = () => page.evaluate(() => [window.ANATOMY.viewer.incisionGroup.children.length, document.querySelector(".incision-note")?.textContent || ""]);
  const first = await at();
  expect(first[0] > 0 && /incision/i.test(first[1]), `step 1: ${first}`);
  for (let i = 0; i < 2; i++) await page.click('[data-step="1"]');
  const later = await at();
  expect(later[0] === 0 && !later[1], `step 3 still shows ${later}`);
  for (let i = 0; i < 2; i++) await page.click('[data-step="-1"]');
  return first[1].split(" · ")[0];
});
await check("Surgery", "A region with several operations offers a picker, and each draws its own incision", async () => {
  // The oral cavity has a partial glossectomy and a ranula excision; then back to the thyroid.
  const go = async (id) => {
    await page.selectOption("#region-select", id);
    await page.waitForFunction((r) => location.hash.startsWith("#" + r) && document.querySelector("#viewer-loading").hidden, id, { timeout: 60000 });
  };
  await go("oral_cavity");
  await page.click('[data-tab="surgery"]');
  const names = await page.$$eval("[data-proc]", (b) => b.map((x) => x.textContent));
  expect(names.length >= 2, `operations: ${names}`);
  await page.click('[data-proc="1"]');
  for (let i = 0; i < 2; i++) await page.click('[data-step="1"]');
  const note = await page.evaluate(() => [window.ANATOMY.viewer.incisionGroup.children.length, document.querySelector(".incision-note")?.textContent || ""]);
  expect(note[0] > 0 && note[1], `ranula step 3: ${note}`);
  await go("thyroid");
  return `${names.join(" / ")}: ${note[1].split(" · ")[0]}`;
});
await check("CT / MRI", "Slices follow the slider; real CT loads", async () => {
  await page.click('[data-tab="sections"]');
  await page.waitForTimeout(1000);
  await page.fill("#section-level", "300");
  await page.dispatchEvent("#section-level", "input");
  await page.click('[data-mode="ct"]');
  await page.waitForFunction(() => !document.querySelector(".section-view canvas.real").hidden, null, { timeout: 30000 });
  await page.waitForTimeout(1500);
  await shot(page, "04-ct.png", "CT / MRI tab: the real Visible Human CT at the slice level");
  await page.click('[data-mode="sim"]');
});
await check("Quiz", "Answering a question gives feedback", async () => {
  await page.click('[data-tab="quiz"]');
  await page.click('[data-quiz="0:0"]');
  const marked = await page.$$eval(".quiz-opt.correct, .quiz-opt.wrong", (b) => b.length);
  expect(marked > 0, "no feedback");
});
await check("Guide", "'?' opens the quick guide with offline status", async () => {
  await page.click('[data-tab="overview"]');
  await page.keyboard.press("?");
  await page.waitForSelector("#help-dialog[open]");
  await page.waitForFunction(() => document.querySelector("#install-status").textContent.length > 10);
  await shot(page, "05-guide.png", "Quick guide with install and offline options");
  await page.keyboard.press("Escape");
  return await page.textContent("#install-status");
});
await check("Theme", "Theme button cycles automatic → light → dark and is remembered", async () => {
  const seen = [];
  for (let i = 0; i < 3; i++) {
    await page.click("#theme-toggle");
    seen.push(await page.evaluate(() => document.documentElement.dataset.theme || "auto"));
  }
  expect(seen.join() === "light,dark,auto", seen.join());
  await page.click("#theme-toggle");
  await page.click("#theme-toggle"); // dark
  await page.reload(NAV);
  await ready(page);
  const t = await page.evaluate(() => document.documentElement.dataset.theme);
  expect(t === "dark", `after reload: ${t}`);
  await shot(page, "06-dark.png", "Dark theme");
  await page.click("#theme-toggle");
  return seen.join(" → ");
});
await check("Accessibility", "Every button and control has an accessible name", async () => {
  const unnamed = await page.$$eval("button, select, input", (els) => els.filter((e) => e.offsetParent || e.closest("dialog"))
    .filter((e) => !(e.getAttribute("aria-label") || e.textContent.trim() || e.labels?.length || e.title || e.placeholder))
    .map((e) => e.outerHTML.slice(0, 60)));
  expect(!unnamed.length, unnamed.join(" | "));
});
await check("Accessibility", "Keyboard alone reaches the search button and tabs", async () => {
  await page.evaluate(() => document.activeElement.blur());
  await page.keyboard.press("Tab");
  const seen = new Set();
  for (let i = 0; i < 40; i++) {
    seen.add(await page.evaluate(() => document.activeElement.id || document.activeElement.dataset?.tab || document.activeElement.tagName));
    await page.keyboard.press("Tab");
  }
  expect(seen.has("search-open") && seen.has("overview"), [...seen].join(","));
});
await check("Stability", "No script errors during the desktop session", async () => {
  expect(!page.errors.length, page.errors.slice(0, 3).join(" | "));
});
await ctx.close();

// ---------- phone ----------
const phone = await newPage({ ...devices["iPhone 13"], browserName: undefined, defaultBrowserType: undefined });
await check("Phone", "Fits the screen with no sideways scrolling", async () => {
  await phone.page.goto(BASE + "#submandibular", NAV);
  await ready(phone.page);
  // Compare with the device's screen width: an overflowing page widens innerWidth itself.
  const screenW = phone.page.viewportSize().width;
  const w = [await phone.page.evaluate(() => Math.max(document.documentElement.scrollWidth, innerWidth)), screenW];
  expect(w[0] <= w[1] + 1, `page ${w[0]} px wide on a ${w[1]} px screen`);
  const offscreen = await phone.page.$$eval(".app-header button, .app-header select", (els) => els.filter((e) => e.getBoundingClientRect().right > screen.width + 1).map((e) => e.id));
  expect(!offscreen.length, `controls off-screen: ${offscreen.join(", ")}`);
  await shot(phone.page, "07-phone.png", "Phone (iPhone 13 size)");
  return `${w[1]} px`;
});
await check("Phone", "Tapping a structure in the list opens it; tabs are reachable", async () => {
  await phone.page.tap('[data-tab="structures"]');
  await phone.page.tap('.structure-list [data-select="smg"]');
  await phone.page.waitForSelector("#panel-body h2");
  const h = await phone.page.textContent("#panel-body h2");
  expect(/submandibular/i.test(h), h);
  await phone.page.tap('[data-tab="refs"]');
  return h;
});
await check("Phone", "Search works on a touch screen", async () => {
  await phone.page.tap("#search-open");
  await phone.page.fill("#search-all", "lingual nerve");
  await phone.page.waitForSelector("[data-hit]");
  await phone.page.tap("[data-hit]");
  await phone.page.waitForFunction(() => /lingual/.test(location.hash), null, { timeout: 60000 });
});
await check("Phone", "No script errors on the phone", async () => {
  expect(!phone.page.errors.length, phone.page.errors.slice(0, 3).join(" | "));
});
await phone.ctx.close();

// ---------- offline (installed web app) ----------
if (!QUICK) {
  const off = await newPage();
  await check("Offline", "The guide downloads every region for offline use", async () => {
    await off.page.goto(BASE, NAV);
    await ready(off.page);
    await off.page.waitForFunction(() => navigator.serviceWorker?.controller || navigator.serviceWorker?.ready, null, { timeout: 20000 });
    await off.page.reload(NAV);
    await ready(off.page);
    await off.page.click("#help-open");
    await off.page.waitForSelector("#offline-btn:not([hidden])", { timeout: 20000 });
    const t0 = Date.now();
    await off.page.click("#offline-btn");
    await off.page.waitForFunction(() => /Everything is downloaded/.test(document.querySelector("#install-status").textContent), null, { timeout: 180000 });
    await off.page.keyboard.press("Escape");
    return `${((Date.now() - t0) / 1000).toFixed(1)} s locally`;
  });
  await check("Offline", "With no network the app still opens every region", async () => {
    await off.ctx.setOffline(true);
    await off.page.reload(NAV);
    await ready(off.page);
    for (const r of ["skull_base", "orbit", "deep_neck"]) {
      await off.page.selectOption("#region-select", r);
      await off.page.waitForFunction((id) => location.hash.startsWith("#" + id) && document.querySelector("#viewer-loading").hidden, r, { timeout: 60000 });
    }
    await off.page.click('[data-tab="sections"]');
    await off.page.click('[data-mode="ct"]');
    await off.page.waitForFunction(() => !document.querySelector(".section-view canvas.real").hidden, null, { timeout: 30000 });
    return "skull base, orbit, deep neck and real CT, offline";
  });
  await off.ctx.close();
}

await browser.close();
server.close();

// ---------- report ----------
const passed = results.filter((r) => r.ok).length;
writeFileSync(join(OUT, "results.json"), JSON.stringify({ date: new Date().toISOString(), passed, total: results.length, results, shots }, null, 2));
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
writeFileSync(join(OUT, "report.html"), `<!doctype html><meta charset="utf-8"><title>Usability report</title>
<style>body{font:15px system-ui;margin:24px;max-width:1100px}td,th{padding:6px 10px;border-bottom:1px solid #ddd;text-align:left;vertical-align:top}
.ok{color:#2e7d4f}.bad{color:#b3261e}img{max-width:100%;border:1px solid #ccc;border-radius:8px}figure{margin:18px 0}</style>
<h1>Usability report</h1><p>${passed} of ${results.length} checks passed · ${new Date().toUTCString()}</p>
<table><tr><th></th><th>Area</th><th>Check</th><th>Result</th><th>Time</th></tr>
${results.map((r) => `<tr><td class="${r.ok ? "ok" : "bad"}">${r.ok ? "✓" : "✗"}</td><td>${esc(r.area)}</td><td>${esc(r.name)}</td><td>${esc(r.detail)}</td><td>${(r.ms / 1000).toFixed(1)} s</td></tr>`).join("")}
</table>${shots.map((s) => `<figure><img src="${s.file}" alt=""><figcaption>${esc(s.caption)}</figcaption></figure>`).join("")}`);
console.log(`\n${passed}/${results.length} checks passed. Report: tests/report/report.html`);
process.exit(passed === results.length ? 0 : 1);
