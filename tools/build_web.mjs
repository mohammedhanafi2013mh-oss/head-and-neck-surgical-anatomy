// Copies the web app into dist/web for hosting (GitHub Pages) and for the
// Android (Capacitor) and desktop (Electron) apps, and lists every file in
// precache.json so the guide can download everything for offline use.
//   node tools/build_web.mjs [outDir]

import { cpSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = process.argv[2] || join(root, "dist", "web");
const ENTRIES = ["index.html", "privacy.html", "styles.css", "manifest.webmanifest", "sw.js", "icons", "js", "vendor", "data"];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const e of ENTRIES) cpSync(join(root, e), join(out, e), { recursive: true });
writeFileSync(join(out, ".nojekyll"), "");

const files = [];
let bytes = 0;
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else {
      const rel = relative(out, p).split(sep).join("/");
      if (rel === "sw.js" || rel.startsWith(".") || rel === "icons/icon.svg" || rel === "icons/icon-1024.png") continue;
      files.push(rel);
      bytes += st.size;
    }
  }
})(out);
files.sort();
writeFileSync(join(out, "precache.json"), JSON.stringify({ cache: "hn-anatomy", bytes, files }));
console.log(`dist: ${out} (${files.length} files, ${(bytes / 1e6).toFixed(1)} MB)`);
