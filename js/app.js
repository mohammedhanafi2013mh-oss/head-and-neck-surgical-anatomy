// UI wiring: tabs, structure cards, surgical walkthrough, figures, quiz, references.

(function () {
  const { regions, models, figures, catalog, Viewer, Sections } = window.ANATOMY;

  const LAYER_COLORS = {
    superficial: "#d98b7a",
    bone: "#d9cca9",
    muscle: "#b5524a",
    gland: "#e2a86b",
    artery: "#d62f2f",
    vein: "#3c5fb8",
    nerve: "#e6c21f",
    lymph: "#6fb36a",
    context: "#b9a48f",
    foramina: "#e8c14a",
    spaces: "#5fb3ff",
    fascia: "#b8b0d6",
    brain: "#c9a0b8",
    membrane: "#a79fcf",
    deep: "#7e9bb8",
    joint: "#9fb7c9",
    globe: "#d8d2c4",
    sinus: "#7fc4f0",
    duct: "#2fb7a0",
    cartilage: "#c9d6e0",
    mucosa: "#e0a4a0",
    pharynx: "#c96f7a",
    external: "#e0a48e",
    middle: "#c08a5a",
    inner: "#8fb7d8",
    pathology: "#86aee6",
    route: "#ff6a2a"
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  const state = {
    region: null,
    tab: "overview",
    selected: null,
    proc: 0, // which operation, when a region has several (region.procedures)
    step: 0,
    showRisk: true, // tint the operation's structures at risk on the model
    riskOpen: true, // the list of structures at risk is expanded
    relFocus: new Set(), // related structures shown with the open structure
    relFor: null,
    quiz: {},
    quizMode: "questions", // "questions" | "find" (tap it on the model) | "name" (name the highlighted one)
    q3: null,
    dissect: null, // guided dissection in the Structures tab: { stage, ask: { id, answered, picked } }
    search: ""
  };

  try { state.showRisk = localStorage.getItem("showRisk") !== "0"; } catch (e) {}

  const viewer = new Viewer($("#viewer"), {
    onSelect: (id) => {
      // In the model quizzes a tap is an answer (Find it), or is ignored so the
      // highlighted structure stays (Name it).
      if (state.tab === "quiz" && state.quizMode !== "questions" && state.q3) {
        if (state.quizMode === "find" && !state.q3.answered && id) answerQuiz3d(id);
        else viewer.select(state.selected, false);
        return;
      }
      // Guided dissection: a tap answers the "find it" check at this layer.
      const ask = state.tab === "structures" && !state.selected && state.dissect && state.dissect.ask;
      if (ask && !ask.answered && id) {
        ask.answered = true;
        ask.picked = id;
        viewer.frameStructure(ask.id);
        render();
        return;
      }
      state.selected = id;
      if (id && state.tab !== "surgery" && state.tab !== "sections") {
        state.tab = "structures";
      }
      render();
    }
  });
  viewer.onLayerForced = () => renderLayerToggles();
  window.ANATOMY.viewer = viewer;

  // Cross-sections live in one persistent element, moved in and out of the
  // CT / MRI tab so its WebGL canvas survives re-renders.
  const sectionsUi = $("#sections-ui");
  const sections = new Sections(viewer, sectionsUi, {
    loadScript: (src) => (loaded.has(src) ? Promise.resolve() : loadScript(src).then(() => loaded.add(src))),
    onPick: (id) => {
      state.selected = id;
      viewer.select(id, false);
      showSectionSelection();
    }
  });
  // "Show hidden" appears once a structure has been hidden by double-clicking it.
  const showHiddenBtn = $("#show-hidden");
  viewer.onHiddenChange = (n) => {
    showHiddenBtn.hidden = n === 0;
    showHiddenBtn.textContent = `Show hidden (${n})`;
  };
  showHiddenBtn.addEventListener("click", () => viewer.showHidden());
  viewer.onRefresh = () => {
    syncLandmarks();
    if (sections.active) sections.update();
  };
  window.ANATOMY.sections = sections;

  function showSectionSelection() {
    const el = $("#section-selected");
    const s = state.selected && state.region.structures.find((x) => x.id === state.selected);
    el.innerHTML = s ? `Selected: <strong>${esc(s.name)}</strong> · <button type="button" data-notes>View notes</button>` : "";
    const btn = $("[data-notes]", el);
    if (btn) btn.addEventListener("click", () => {
      state.tab = "structures";
      sections.setActive(false);
      render();
    });
  }

  // ---------- region ----------
  const select = $("#region-select");
  for (const r of catalog) {
    const opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = r.title;
    select.appendChild(opt);
  }
  const soon = document.createElement("option");
  soon.disabled = true;
  soon.textContent = "More regions coming…";
  select.appendChild(soon);
  select.addEventListener("change", () => loadRegion(select.value));

  // Each region's content, meshes and model load on first use, as plain
  // script tags so the app still works from file://.
  const loaded = new Set();
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.onload = resolve;
      el.onerror = () => reject(new Error(`Couldn't load ${src}`));
      document.body.appendChild(el);
    });
  }

  // Bumped on every request, so a slow load that finishes after a later one is dropped.
  let loadSeq = 0;
  async function loadRegion(id, structureId) {
    stopPhoto();
    const seq = ++loadSeq;
    const entry = catalog.find((r) => r.id === id) || catalog[0];
    select.value = entry.id;
    const loading = $("#viewer-loading");
    loading.textContent = `Loading ${entry.title}…`;
    loading.hidden = false;
    try {
      for (const src of entry.scripts) {
        if (!loaded.has(src)) {
          await loadScript(src);
          loaded.add(src);
          if (seq !== loadSeq) return;
        }
      }
    } catch (err) {
      if (seq !== loadSeq) return;
      loading.textContent = `${err.message}. Check that the data folder sits next to index.html.`;
      return;
    }
    loading.hidden = true;
    state.region = regions[entry.id];
    state.regionId = entry.id;
    state.model = models[entry.id];
    landmarksShown = null;
    state.selected = null;
    state.proc = 0;
    state.step = 0;
    shownIncisions = ""; // viewer.load() clears the drawn incisions
    state.quiz = {};
    state.q3 = null;
    state.dissect = null;
    state.relFocus = new Set();
    state.search = "";
    if (state.tab === "surgery") state.tab = "overview";
    $("#region-subtitle").textContent = `${state.region.title} · ${state.region.subtitle}`;
    if (structureId && state.region.structures.some((s) => s.id === structureId)) {
      state.selected = structureId;
      state.tab = "structures";
    }
    viewer.load(state.region, state.model);
    sections.rebuild(state.model, entry.id);
    sections.setActive(state.tab === "sections");
    renderLayerToggles();
    renderViewButtons();
    render();
    showFirstTip();
  }

  // The address bar points to the region and, in Structures, the open structure
  // (#parotid/facial_trunk), so a link opens the same view.
  function syncHash() {
    const h = "#" + state.regionId + (state.tab === "structures" && state.selected ? "/" + state.selected : "");
    if (location.hash !== h) history.replaceState(null, "", h);
  }
  const parseHash = () => location.hash.slice(1).split("/");
  window.addEventListener("hashchange", () => {
    const [rid, sid] = parseHash();
    if (rid && rid !== state.regionId) loadRegion(rid, sid);
    else if (sid && state.region && state.region.structures.some((s) => s.id === sid)) openStructure(sid);
  });
  function openStructure(id) {
    if (state.tab === "surgery") exitWalkthrough();
    state.selected = id;
    state.tab = "structures";
    state.search = "";
    sections.setActive(false);
    render();
  }

  // ---------- courses and foramina ----------

  // Mesh header data for the current region: traced courses and named points.
  const header = () => window.ANATOMY.meshes[state.regionId].header;

  // A structure's course: its path and the waypoints its notes describe.
  function courseFor(s) {
    const c = s && s.course && (header().courses || {})[s.id];
    if (!c) return null;
    const steps = s.course.filter((x) => c.points[x.key]).map((x) => ({ ...x, p: c.points[x.key] }));
    return { path: c.path, steps };
  }

  const pinFor = (s) => s && s.pin && (header().points || {})[s.pin];
  const short = (name) => name.replace(/ \(.*\)$/, "");

  // Pins for every foramen while the "Foramina" layer is on.
  let landmarksShown = null;
  function syncLandmarks() {
    if (!state.region) return;
    const on = !!viewer.layerVisible.foramina;
    if (on === landmarksShown) return;
    landmarksShown = on;
    viewer.setLandmarks(on ? state.region.structures.filter((s) => pinFor(s) && s.landmark !== false).map((s) => ({ p: pinFor(s), label: short(s.name) })) : []);
  }

  // Show the selected structure's course (or its pin) on the model.
  let shownCourse = null;
  function syncCourse() {
    const s = state.tab === "structures" && state.selected && state.region.structures.find((x) => x.id === state.selected);
    const course = courseFor(s);
    if (course) {
      const fresh = shownCourse !== s.id;
      viewer.showCourse(course.path, course.steps.map((x) => ({ p: x.p, label: x.label })));
      if (fresh) viewer.frameCourse();
    }
    else if (pinFor(s)) {
      viewer.showCourse(null, [{ p: pinFor(s), label: short(s.name) }]);
      if (shownCourse !== s.id) viewer.flyTo(pinFor(s), 10);
    } else viewer.clearCourse();
    shownCourse = course || pinFor(s) ? s.id : null;
  }

  // ---------- viewer controls ----------

  // A region can rename a view button (e.g. "From above" for the larynx).
  function renderViewButtons() {
    const names = { lateral: "Lateral", inferior: "Inferior", anterior: "Anterior" };
    document.querySelectorAll("[data-view]").forEach((b) => {
      const v = b.dataset.view;
      if (names[v]) b.textContent = (state.model.viewLabels || {})[v] || names[v];
    });
    // An optional surgeon's-eye view (otoscope, endoscope, laryngoscope), lit from the eye.
    const special = document.querySelector('[data-view="special"]');
    special.hidden = !state.model.views.special;
    special.textContent = (state.model.viewLabels || {}).special || "";
  }
  // Phones: show or hide the layer chips.
  $("#layers-toggle").addEventListener("click", (e) => {
    const bar = e.currentTarget.parentElement;
    const open = bar.classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
    e.currentTarget.textContent = open ? "Layers ▴" : "Layers ▾";
  });

  function renderLayerToggles() {
    const box = $("#layer-toggles");
    box.innerHTML = "";
    for (const l of state.region.layers) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.setAttribute("aria-pressed", String(!!viewer.layerVisible[l.id]));
      b.innerHTML = `<span class="dot" style="background:${LAYER_COLORS[l.id]}"></span>${esc(l.label)}`;
      b.addEventListener("click", () => {
        viewer.setLayer(l.id, !viewer.layerVisible[l.id]);
        renderLayerToggles();
      });
      box.appendChild(b);
    }
  }

  document.querySelectorAll("[data-view]").forEach((b) =>
    b.addEventListener("click", () => {
      const v = b.dataset.view;
      if (!state.model) return;
      viewer.leaveScope();
      if (v === "reset") viewer.resetView();
      else if (v === "special") viewer.enterScope(state.model.views.special);
      else viewer.setView(...state.model.views[v]); // [theta, phi, radius?, target?]
      renderLayerToggles();
    })
  );
  // Render: a path-traced, physically based image of the current view (photo.js).
  let photo = null;
  const photoBar = $("#photo-bar"), photoStatus = $("#photo-status");
  function stopPhoto() {
    if (!photo) return;
    photo.stop();
    photo = null;
    photoBar.hidden = true;
    $("#photo-btn").setAttribute("aria-pressed", "false");
  }
  $("#photo-btn").addEventListener("click", async () => {
    if (photo) return stopPhoto();
    photoStatus.textContent = "Preparing the render…";
    photoBar.hidden = false;
    $("#photo-btn").setAttribute("aria-pressed", "true");
    const p = new window.ANATOMY.Photo(viewer, (n) => {
      photoStatus.textContent = n < 2 ? "Rendering…" : `${n} samples · sharpens as it runs`;
    });
    photo = p;
    try {
      await p.start();
    } catch (e) {
      console.warn(e);
      if (photo === p) stopPhoto();
      photoBar.hidden = false;
      photoStatus.textContent = "Rendering isn't supported on this device.";
      setTimeout(() => { if (!photo) photoBar.hidden = true; }, 4000);
    }
  });
  $("#photo-close").addEventListener("click", stopPhoto);
  $("#photo-save").addEventListener("click", () => {
    if (photo) photo.saveAs = `${state.region.id}-render.png`;
  });

  // Labels on the 3D model: off, some (pins and the selected structure) or all. Remembered per browser.
  const labelsMode = $("#labels-mode");
  try {
    const saved = localStorage.getItem("labelMode");
    if (["off", "some", "all"].includes(saved)) labelsMode.value = saved;
  } catch (e) {}
  const applyLabelMode = () => {
    viewer.labelMode = labelsMode.value;
    viewer.dirty = true;
    viewer.refresh();
  };
  labelsMode.addEventListener("change", () => {
    try { localStorage.setItem("labelMode", labelsMode.value); } catch (e) {}
    applyLabelMode();
  });
  applyLabelMode();

  // ---------- tabs ----------
  document.querySelectorAll("[data-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      const leavingSurgery = state.tab === "surgery" && b.dataset.tab !== "surgery";
      if (state.dissect && b.dataset.tab !== "structures") exitDissection();
      state.tab = b.dataset.tab;
      if (b.dataset.tab === "structures") state.selected = state.selected || null;
      if (leavingSurgery) exitWalkthrough();
      sections.setActive(state.tab === "sections");
      render();
    })
  );

  function render() {
    if (!state.region) return;
    if (state.tab === "structures" && state.selected) rememberViewed(state.regionId, state.selected);
    if (state.relFor !== state.selected) {
      state.relFocus = new Set(); // related structures belong to the structure they were opened from
      state.relFor = state.selected;
    }
    document.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === state.tab)));
    const body = $("#panel-body");
    const r = state.region;
    const views = { overview, structures, surgery, sections: sectionsTab, figures: figuresTab, quiz, refs };
    if (body.contains(sectionsUi)) {
      sectionsUi.hidden = true;
      document.body.appendChild(sectionsUi);
    }
    body.innerHTML = views[state.tab](r);
    if (state.tab === "sections") {
      $("#section-slot").appendChild(sectionsUi);
      sectionsUi.hidden = false;
      showSectionSelection();
      sections.resize();
    }
    wire(body);
    const dissectAsk = state.tab === "structures" && !state.selected && state.dissect && state.dissect.ask;
    viewer.hideNames = (state.tab === "quiz" && state.quizMode !== "questions") || !!(dissectAsk && !dissectAsk.answered);
    if (state.tab === "surgery") applyStep();
    else if (state.tab === "structures" && state.dissect && !state.selected) applyDissection();
    else {
      const rel = state.tab === "structures" && state.selected ? [...state.relFocus] : [];
      if (rel.length || viewer.focusIds.size) viewer.setFocus(rel);
      viewer.select(state.selected, false);
    }
    syncCourse();
    syncHash();
  }

  // ---------- views ----------
  function overview(r) {
    const o = r.overview;
    return `
      <h2>${esc(r.title)}</h2>
      <p class="aka">${esc(r.subtitle)}</p>
      <p>${esc(o.intro)}</p>
      <h3>Boundaries</h3>
      <dl class="def-list">${o.boundaries.map((b) => `<dt>${esc(b.label)}</dt><dd>${esc(b.text)}</dd>`).join("")}</dl>
      <h3>Contents</h3>
      <ul>${o.contents.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
      <div class="callout pearl"><div class="callout-title">Key surgical points</div>
        <ul>${o.keyPoints.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
      ${refChips(o.refs)}
      ${provenance(`${r.title} › Overview`, r.id, r)}`;
  }

  function structures(r) {
    if (state.selected) return structureCard(r.structures.find((s) => s.id === state.selected));
    if (state.dissect) return dissection(r);
    const q = state.search.toLowerCase();
    const groups = r.layers
      .map((l) => ({
        l,
        items: r.structures.filter((s) => s.layer === l.id && (!q || (s.name + " " + (s.aka || "")).toLowerCase().includes(q)))
      }))
      .filter((g) => g.items.length);
    // Nerves and vessels with a traced course, for one-tap tracing.
    const traced = q ? [] : r.structures.filter((s) => courseFor(s));
    return `
      <input class="search" type="search" placeholder="Search structures…" value="${esc(state.search)}" data-search>
      ${(() => {
        const mine = q ? [] : store.get("bookmarks").filter((b) => b.region === r.id).map((b) => r.structures.find((s) => s.id === b.id)).filter(Boolean);
        return mine.length ? `<div class="structure-group"><h3>★ Your bookmarks</h3><div class="focus-list">${mine
          .map((s) => `<button data-select="${s.id}">${esc(short(s.name))}</button>`).join("")}</div></div>` : "";
      })()}
      ${!q && r.dissection ? `<div class="structure-group dissect-start"><button type="button" data-dissect-start>▶ Dissect layer by layer</button>
        <span class="muted small">Peel the region from superficial to deep, with a quick check at each layer.</span></div>` : ""}
      ${traced.length ? `<div class="structure-group trace-quick"><h3>Trace a course</h3>
        <p class="muted small">Nerves and vessels of surgical importance: tap one to follow its path and branches on the model.</p>
        <div class="focus-list">${traced
          .map((s) => `<button data-select="${s.id}" data-autotrace><span class="dot" style="background:${LAYER_COLORS[s.layer]}"></span>${esc(short(s.name))}</button>`)
          .join("")}</div></div>` : ""}
      ${groups
        .map(
          (g) => `<div class="structure-group"><h3>${esc(g.l.label)}</h3><ul class="structure-list">
            ${g.items
              .map((s) => `<li><button data-select="${s.id}"><span class="dot" style="background:${LAYER_COLORS[s.layer]}"></span>${esc(s.name)}</button></li>`)
              .join("")}
          </ul></div>`
        )
        .join("") || `<p class="muted">No matches.</p>`}`;
  }

  // ---------- bookmarks and recently viewed (kept on this device) ----------
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const isBookmarked = (region, id) => store.get("bookmarks").some((b) => b.region === region && b.id === id);
  function toggleBookmark(region, id) {
    const list = store.get("bookmarks");
    const i = list.findIndex((b) => b.region === region && b.id === id);
    if (i >= 0) list.splice(i, 1);
    else list.unshift({ region, id });
    store.set("bookmarks", list);
  }
  function rememberViewed(region, id) {
    const list = store.get("recent").filter((b) => !(b.region === region && b.id === id));
    list.unshift({ region, id });
    store.set("recent", list.slice(0, 12));
  }

  // ---------- content provenance ----------
  // Every structure, overview and operation ends with its review status and a
  // link that opens a pre-filled GitHub issue naming exactly where the error is.
  const REPO = "https://github.com/mohammedhanafi2013mh-oss/head-and-neck-surgical-anatomy";
  const SITE = "https://mohammedhanafi2013mh-oss.github.io/head-and-neck-surgical-anatomy/";
  function reportUrl(where, hash) {
    const body = [
      `**Where:** ${where}`,
      `**Link:** ${SITE}${hash ? "#" + hash : ""}`,
      "",
      "**What is wrong:**",
      "",
      "",
      "**Suggested correction, with a source (textbook, paper or guideline):**",
      ""
    ].join("\n");
    return `${REPO}/issues/new?title=${encodeURIComponent("Content: " + where)}&body=${encodeURIComponent(body)}`;
  }
  // region.review / structure.review / procedure.review: { by, date } once a specialist has checked it.
  function reviewNote(...items) {
    const rev = items.find((x) => x && x.review)?.review;
    return rev
      ? `Reviewed by ${esc(rev.by)}${rev.date ? `, ${esc(rev.date)}` : ""}`
      : "Not yet reviewed by a specialist: check against the references before teaching from it";
  }
  function provenance(where, hash, ...items) {
    return `<div class="content-meta"><span>${reviewNote(...items)}</span>
      <a class="report-link" href="${esc(reportUrl(where, hash))}" target="_blank" rel="noopener">⚑ Report an error</a></div>`;
  }

  // ---------- links between structures ----------
  // Names of the region's structures found in a structure's notes become
  // buttons: tapping one shows it on the model together with the open structure.
  let linkCache = null;
  function linker() {
    const r = state.region;
    if (linkCache && linkCache.region === r) return linkCache;
    const map = new Map();
    const add = (phrase, id) => {
      const k = phrase.trim().toLowerCase();
      if (k.length >= 4 && !map.has(k)) map.set(k, id);
    };
    for (const s of r.structures) {
      const forms = [s.name, short(s.name), s.name.replace(/\s*\([^)]*\)/g, ""), ...(s.aka || "").split(/[,;]/)];
      for (const f of forms) {
        if (!f || !f.trim()) continue;
        add(f, s.id);
        if (/ies$/i.test(f)) add(f.replace(/ies$/i, "y"), s.id); // arteries -> artery
        else if (/[^s]s$/i.test(f)) add(f.slice(0, -1), s.id); // glands -> gland
      }
    }
    const phrases = [...map.keys()].sort((a, b) => b.length - a.length);
    const re = new RegExp(`\\b(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "gi");
    linkCache = { region: r, map, re, mentions: null };
    return linkCache;
  }

  // Text with the names of other structures turned into buttons; ids found go into `found`.
  function linkify(text, selfId, found) {
    const { map, re } = linker();
    let out = "", last = 0;
    for (const m of String(text).matchAll(re)) {
      const id = map.get(m[0].toLowerCase());
      if (!id || id === selfId) continue;
      out += esc(text.slice(last, m.index)) + `<button type="button" class="rel-link" data-rel="${id}">${esc(m[0])}</button>`;
      last = m.index + m[0].length;
      found && found.add(id);
    }
    return out + esc(String(text).slice(last));
  }

  const noteTexts = (s) => [s.summary || "", ...(s.relations || []), ...Object.values(s.supply || {}), ...(s.surgical || []), ...(s.danger || []), ...(s.variations || [])];

  // Structures whose notes mention each structure.
  function mentionsOf(id) {
    const L = linker();
    if (!L.mentions) {
      L.mentions = new Map();
      for (const s of state.region.structures) {
        const found = new Set();
        for (const x of noteTexts(s)) linkify(x, s.id, found);
        for (const t of found) {
          if (!L.mentions.has(t)) L.mentions.set(t, new Set());
          L.mentions.get(t).add(s.id);
        }
      }
    }
    return L.mentions.get(id) || new Set();
  }

  function structureCard(s) {
    const found = new Set();
    const link = (x) => linkify(x, s.id, found);
    const list = (items) => `<ul>${items.map((i) => `<li>${link(i)}</li>`).join("")}</ul>`;
    const supply = Object.entries(s.supply || {});
    return `
      <button class="back" data-back>← All structures</button>
      <div class="card-head"><h2>${esc(s.name)}</h2><button type="button" class="bookmark" data-bookmark aria-pressed="${isBookmarked(state.regionId, s.id)}"
        title="Bookmarks are kept on this device">${isBookmarked(state.regionId, s.id) ? "★ Saved" : "☆ Save"}</button></div>
      ${s.aka ? `<p class="aka">${esc(s.aka)}</p>` : ""}
      ${viewer.structures.has(s.id) ? "" : pinFor(s) ? `<p class="aka">Shown as a pin on the 3D model.</p>` : `<p class="aka">Not shown in the 3D model yet.</p>`}
      ${s.drawn === "redrawn" ? `<p class="aka">Z-Anatomy's model places this structure inaccurately here, so its path in this region was redrawn for this app in its usual position.</p>`
        : s.drawn ? `<p class="aka">Z-Anatomy has no model of this structure. Its 3D path was drawn for this app from the surrounding anatomy.</p>` : ""}
      <p>${link(s.summary || "")}</p>
      ${courseHtml(courseFor(s))}
      ${s.relations?.length ? `<h3>Relations</h3>${list(s.relations)}` : ""}
      ${supply.length ? `<h3>Supply & function</h3><dl class="def-list">${supply.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${link(v)}</dd>`).join("")}</dl>` : ""}
      ${s.surgical?.length ? `<div class="callout pearl"><div class="callout-title">Surgical relevance</div>${list(s.surgical)}</div>` : ""}
      ${s.danger?.length ? `<div class="callout danger"><div class="callout-title">Danger points</div>${list(s.danger)}</div>` : ""}
      ${s.variations?.length ? `<h3>Variations</h3>${list(s.variations)}` : ""}
      ${relatedHtml(s, found)}
      ${refChips(s.refs)}
      ${provenance(`${state.region.title} › ${s.name}`, `${state.regionId}/${s.id}`, s, state.region)}`;
  }

  // Structures named in these notes, and those whose notes name this one.
  function relatedHtml(s, found) {
    const ids = [...new Set([...found, ...mentionsOf(s.id)])].filter((id) => id !== s.id);
    if (!ids.length) return "";
    const byId = Object.fromEntries(state.region.structures.map((x) => [x.id, x]));
    const inModel = ids.filter((id) => viewer.structures.has(id));
    return `<div class="related"><h3>Related structures</h3>
      <p class="muted small">Tap a name here or in the notes to see it on the model with ${esc(short(s.name))}; › opens its notes.</p>
      <div class="rel-items">${ids
        .map((id) => `<span class="rel-item"><button type="button" class="rel-toggle" data-rel="${id}" aria-pressed="${state.relFocus.has(id)}"${viewer.structures.has(id) ? "" : " disabled title=\"Not in the 3D model\""}><span class="dot" style="background:${LAYER_COLORS[byId[id].layer]}"></span>${esc(short(byId[id].name))}</button><button type="button" class="rel-open" data-select="${id}" aria-label="Open ${esc(short(byId[id].name))}">›</button></span>`)
        .join("")}</div>
      ${inModel.length > 1 ? `<div class="rel-actions"><button type="button" data-rel-all>Show all on the model</button>${state.relFocus.size ? `<button type="button" data-rel-clear>Clear</button>` : ""}</div>` : ""}
    </div>`;
  }

  // ---------- guided dissection ----------
  // Stage i shows the "keep" layers and every layer from order[i] down, with
  // order[i] (the one now on top) highlighted; Next removes it.
  function dissectStages(r) {
    const d = r.dissection;
    return d.order
      .map((id) => ({ layer: r.layers.find((l) => l.id === id), items: r.structures.filter((s) => s.layer === id) }))
      .filter((x) => x.layer && x.items.length);
  }

  function newAsk(stage) {
    const pool = stage.items.filter((s) => viewer.structures.has(s.id) && !viewer.hidden.has(s.id));
    return pool.length ? { id: pool[Math.floor(Math.random() * pool.length)].id, answered: false, picked: null } : null;
  }

  function dissection(r) {
    const stages = dissectStages(r);
    const k = Math.min(state.dissect.stage, stages.length - 1);
    const st = stages[k];
    const ask = state.dissect.ask;
    const byId = Object.fromEntries(r.structures.map((s) => [s.id, s]));
    let check = "";
    if (ask) {
      const name = esc(short(byId[ask.id].name));
      check = !ask.answered
        ? `<div class="q3-card dissect-check"><p class="q3-prompt" data-target="${ask.id}">Quick check: tap the <strong>${name}</strong> on the model</p>
            <div class="q3-actions"><button type="button" data-dissect-reveal>Show me</button></div></div>`
        : `<div class="q3-feedback ${ask.picked === ask.id ? "correct" : "wrong"}"><p><strong>${ask.picked === ask.id ? "✓ Correct" : ask.picked ? "✗ Not quite" : "Here it is"}</strong>${
            ask.picked && ask.picked !== ask.id && byId[ask.picked] ? `: that was ${esc(short(byId[ask.picked].name))}` : ""}. Highlighted: <strong>${name}</strong>.</p></div>`;
    }
    return `
      <button class="back" data-dissect-exit>← All structures</button>
      <h2>Dissect: ${esc(r.title)}</h2>
      <p class="muted">From superficial to deep. The highlighted layer is the one on top; Next lifts it away to show what lies beneath. Tap a name to read about it.</p>
      <div class="steps-nav">
        <span class="count">Layer ${k + 1} of ${stages.length}</span>
        <button data-dissect-step="-1" ${k === 0 ? "disabled" : ""}>← Prev</button>
        <button data-dissect-step="1" ${k === stages.length - 1 ? "disabled" : ""}>Next →</button>
      </div>
      <div class="step-card">
        <h4><span class="dot" style="background:${LAYER_COLORS[st.layer.id]}"></span> ${esc(st.layer.label)}</h4>
        <div class="focus-list">${st.items.map((s) => `<button data-select="${s.id}">${esc(short(s.name))}</button>`).join("")}</div>
        ${check}
      </div>
      <div class="step-dots">${stages.map((_, i) => `<span class="${i <= k ? "on" : ""}"></span>`).join("")}</div>`;
  }

  function applyDissection() {
    const r = state.region, stages = dissectStages(r);
    const k = Math.min(state.dissect.stage, stages.length - 1);
    const shown = [...r.dissection.keep, ...stages.slice(k).map((x) => x.layer.id)];
    viewer.setLayers(shown);
    viewer.setFocus(stages[k].items.map((s) => s.id));
    const ask = state.dissect.ask;
    viewer.select(ask && ask.answered ? ask.id : null, false);
    renderLayerToggles();
  }

  function exitDissection() {
    state.dissect = null;
    viewer.setFocus([]);
    viewer.setLayers(state.region.layers.filter((l) => l.defaultOn).map((l) => l.id));
    renderLayerToggles();
  }

  function courseHtml(course) {
    if (!course) return "";
    return `<div class="course"><div class="course-head"><h3>Course</h3><button type="button" class="trace-btn" data-trace>▶ Trace the course</button></div>
      <ol class="course-list">${course.steps
        .map((x, i) => `<li data-step-i="${i}"><button type="button" data-pin="${i}">${esc(x.label)}</button>${x.text ? ` <span>${esc(x.text)}</span>` : ""}</li>`)
        .join("")}</ol>
      <p class="muted small">Pins mark each point on the model; the line shows the path, drawn through bone so it can be followed.</p></div>`;
  }

  // A region has one operation (region.procedure) or a choice of several (region.procedures).
  const procedureOf = (r) => (r.procedures ? r.procedures[state.proc] || r.procedures[0] : r.procedure);

  function surgery(r) {
    const p = procedureOf(r);
    const st = p.steps[state.step];
    const names = Object.fromEntries(r.structures.map((s) => [s.id, s.name]));
    const picker = r.procedures && r.procedures.length > 1
      ? `<div class="proc-pick">${r.procedures
          .map((q, i) => `<button type="button" data-proc="${i}" aria-pressed="${i === state.proc}">${esc(q.short || q.title)}</button>`)
          .join("")}</div>`
      : "";
    return `
      ${picker}
      <h2>${esc(p.title)}</h2>
      <p class="muted">${esc(p.intro || "Step through the operation. The model shows the layers you would see at each stage and highlights the key structures.")}</p>
      <div class="steps-nav">
        <span class="count">Step ${state.step + 1} of ${p.steps.length}</span>
        <button data-step="-1" ${state.step === 0 ? "disabled" : ""}>← Prev</button>
        <button data-step="1" ${state.step === p.steps.length - 1 ? "disabled" : ""}>Next →</button>
      </div>
      ${riskHtml(p, names)}
      <div class="step-card">
        <h4>${esc(st.title)}</h4>
        <p>${esc(st.text)}</p>
        <div class="focus-list">${st.focus.map((id) => `<button data-select="${id}"${riskIds(p).includes(id) ? ` class="risk" title="At risk in this operation"` : ""}>${riskIds(p).includes(id) ? "⚠ " : ""}${esc(names[id])}</button>`).join("")}</div>
        ${stepIncisions(st).map((i) => `<p class="incision-note"><span class="swatch" aria-hidden="true"></span><span><strong>${esc(i.name)}</strong>${i.note ? ` · ${esc(i.note)}` : ""}</span></p>`).join("")}
      </div>
      <div class="step-dots">${p.steps.map((_, i) => `<span class="${i <= state.step ? "on" : ""}"></span>`).join("")}</div>
      <h3>${esc(p.complicationsTitle || "Complications")}</h3>
      <div class="callout danger"><ul>${p.complications.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
      ${refChips(p.refs)}
      ${provenance(`${r.title} › ${p.title}, step ${state.step + 1}: ${st.title}`, r.id, p, r)}`;
  }

  const riskIds = (p) => (p.atRisk || []).map((a) => a.id);

  // The operation's structures at risk, each with what injury to it causes.
  function riskHtml(p, names) {
    if (!p.atRisk?.length) return "";
    return `<details class="risk-box"${state.riskOpen ? " open" : ""}><summary>⚠ Structures at risk (${p.atRisk.length})</summary>
      <label class="risk-toggle"><input type="checkbox" data-risk-toggle${state.showRisk ? " checked" : ""}> Highlight them on the model (orange)</label>
      <ul class="risk-list">${p.atRisk
        .map((a) => `<li><button type="button" data-select="${a.id}">${esc(short(names[a.id] || a.id))}</button><span>${esc(a.why)}</span></li>`)
        .join("")}</ul></details>`;
  }

  function sectionsTab() {
    return `
      <h2>Cross-sections</h2>
      <p class="muted">Slice the 3D model at any level and compare it with how the anatomy looks on CT and MRI.</p>
      <div id="section-slot"></div>`;
  }

  function figuresTab(r) {
    return r.figures
      .map((f) => `<figure>${figures[f.svg]}<figcaption>${esc(f.title)}. Original schematic, not to scale.</figcaption></figure>`)
      .join("");
  }

  function quiz(r) {
    const modes = [["questions", "Questions"], ["find", "Find it on the model"], ["name", "Name it"]];
    const picker = `<div class="proc-pick quiz-modes">${modes
      .map(([m, label]) => `<button type="button" data-qmode="${m}" aria-pressed="${state.quizMode === m}">${label}</button>`)
      .join("")}</div>`;
    return picker + (state.quizMode === "questions" ? quizQuestions(r) : quiz3d(r));
  }

  // ---------- quizzes on the model ----------
  // Progress is kept in this browser: per region and structure, [right, seen, last answer right].
  const PROGRESS_KEY = "quiz3d";
  function progress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
  }
  function record(id, ok) {
    const all = progress();
    const mine = (all[state.regionId] = all[state.regionId] || {});
    const [right = 0, seen = 0] = mine[id] || [];
    mine[id] = [right + (ok ? 1 : 0), seen + 1, ok ? 1 : 0];
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(all)); } catch (e) {}
  }
  // Structures in the 3D model that can be asked about.
  const quizPool = () => state.region.structures.filter((s) => viewer.structures.has(s.id) && s.layer !== "route" && !viewer.hidden.has(s.id));
  const known = (rec) => rec && rec[0] >= 2 && rec[2] === 1;

  // Next structure: unseen and missed ones come up more often; not one of the last few.
  function nextQuiz3d() {
    const pool = quizPool();
    if (!pool.length) return (state.q3 = null);
    const mine = progress()[state.regionId] || {};
    const prev = state.q3 || { correct: 0, total: 0, recent: [] };
    const recent = prev.recent || [];
    const weight = (s) => {
      const rec = mine[s.id];
      if (!rec) return 3;
      return 1 + 4 * (1 - rec[0] / rec[1]) + (rec[2] ? 0 : 2) + (known(rec) ? -0.6 : 0);
    };
    const cands = pool.filter((s) => !recent.includes(s.id));
    const list = cands.length ? cands : pool;
    let x = Math.random() * list.reduce((a, s) => a + weight(s), 0);
    const target = list.find((s) => (x -= weight(s)) <= 0) || list[list.length - 1];
    // Name it: three other structures, from the same layer where possible.
    const others = pool.filter((s) => s.id !== target.id);
    const same = others.filter((s) => s.layer === target.layer).sort(() => Math.random() - 0.5);
    const rest = others.filter((s) => s.layer !== target.layer).sort(() => Math.random() - 0.5);
    const options = [target, ...same.concat(rest).slice(0, 3)].sort(() => Math.random() - 0.5).map((s) => s.id);
    state.q3 = { target: target.id, options, answered: false, picked: null, correct: prev.correct, total: prev.total, recent: [target.id, ...recent].slice(0, 4) };
    if (!viewer.layerVisible[target.layer]) {
      viewer.setLayer(target.layer, true);
      renderLayerToggles();
    }
    state.selected = state.quizMode === "name" ? target.id : null;
    if (state.quizMode === "name") viewer.frameStructure(target.id);
  }

  function answerQuiz3d(id) {
    const q = state.q3;
    q.answered = true;
    q.picked = id;
    const ok = id === q.target;
    q.total += 1;
    if (ok) q.correct += 1;
    record(q.target, ok);
    state.selected = q.target;
    if (!ok || state.quizMode === "find") viewer.frameStructure(q.target);
    render();
  }

  function quiz3d(r) {
    if (!state.q3 || !viewer.structures.has(state.q3.target)) nextQuiz3d();
    const q = state.q3;
    if (!q) return `<p class="muted">This region has no structures in the 3D model to ask about.</p>`;
    // Name it shows the answer's structure highlighted; Find it only once answered.
    state.selected = state.quizMode === "name" || q.answered ? q.target : null;
    const byId = Object.fromEntries(r.structures.map((s) => [s.id, s]));
    const t = byId[q.target];
    const mine = progress()[state.regionId] || {};
    const pool = quizPool();
    const nKnown = pool.filter((s) => known(mine[s.id])).length;
    const ok = q.answered && q.picked === q.target;
    const intro = state.quizMode === "find"
      ? `<p class="muted">Tap the structure on the 3D model. Labels and hover names are off while you play; rotate and zoom as usual.</p>`
      : `<p class="muted">Which structure is highlighted on the 3D model? Labels are off while you play.</p>`;
    const prompt = state.quizMode === "find"
      ? `<p class="q3-prompt" data-target="${q.target}">Find the <strong>${esc(short(t.name))}</strong></p>`
      : `<p class="q3-prompt" data-target="${q.target}">Name the highlighted structure</p>
         <div class="q3-options">${q.options
           .map((id) => {
             const cls = q.answered ? (id === q.target ? " correct" : id === q.picked ? " wrong" : "") : "";
             return `<button type="button" class="quiz-opt${cls}" data-q3-opt="${id}"${q.answered ? " disabled" : ""}>${esc(short(byId[id].name))}</button>`;
           })
           .join("")}</div>`;
    const feedback = !q.answered ? (state.quizMode === "find"
      ? `<div class="q3-actions"><button type="button" data-q3-reveal>Show me</button><button type="button" data-q3-skip>Skip</button></div>` : "")
      : `<div class="q3-feedback ${ok ? "correct" : "wrong"}">
          <p><strong>${ok ? "✓ Correct" : q.picked ? "✗ Not quite" : "Here it is"}</strong>${!ok && q.picked && byId[q.picked]
            ? `: you chose ${esc(short(byId[q.picked].name))}` : ""}. Highlighted on the model: <strong>${esc(short(t.name))}</strong>.</p>
          ${t.summary ? `<p>${esc(t.summary)}</p>` : ""}
          <div class="q3-actions"><button type="button" data-q3-next>Next →</button><button type="button" data-select="${t.id}">Open its notes</button></div>
        </div>`;
    return `
      <h2>${state.quizMode === "find" ? "Find it on the model" : "Name it"}</h2>
      ${intro}
      <div class="q3-card">${prompt}${feedback}</div>
      <p class="muted small q3-score">This session: ${q.correct} / ${q.total} · Known in this region: ${nKnown} of ${pool.length} structures (right twice, and last time). Progress is saved on this device.</p>
      ${nKnown || Object.keys(mine).length ? `<button type="button" class="quiz-opt" data-q3-reset>Reset progress for this region</button>` : ""}`;
  }

  function quizQuestions(r) {
    const answered = Object.keys(state.quiz).length;
    const correct = r.quiz.filter((q, i) => state.quiz[i] === q.answer).length;
    return `
      <h2>Self-test</h2>
      <p class="muted">${answered ? `<span class="score">${correct} / ${answered} correct</span>` : `${r.quiz.length} questions`}</p>
      ${r.quiz
        .map((q, i) => {
          const picked = state.quiz[i];
          const done = picked !== undefined;
          return `<div class="quiz-q"><p>${i + 1}. ${esc(q.q)}</p>
            ${q.options
              .map((o, j) => {
                let cls = "";
                if (done && j === q.answer) cls = "correct";
                else if (done && j === picked) cls = "wrong";
                return `<button class="quiz-opt ${cls}" data-quiz="${i}:${j}" ${done ? "disabled" : ""}>${esc(o)}</button>`;
              })
              .join("")}
            ${done ? `<p class="quiz-explain">${esc(q.explain)}</p>` : ""}</div>`;
        })
        .join("")}
      ${answered ? `<button class="quiz-opt" data-quiz-reset>Reset quiz</button>` : ""}`;
  }

  function refs(r) {
    return `
      <h2>References</h2>
      <ol class="refs-list">${Object.entries(r.references).map(([id, t]) => `<li id="ref-${id}">${esc(t)}</li>`).join("")}</ol>
      <p class="note">Percentages and anatomical figures are quoted from these sources. Check them against the original papers before teaching or publishing. The 3D model and diagrams are original schematics made for this app.</p>`;
  }

  function refChips(ids = []) {
    if (!ids.length) return "";
    const keys = Object.keys(state.region.references);
    return `<div class="ref-chips">${ids
      .map((id) => {
        const t = state.region.references[id];
        const short = t.split(".")[0].split(",")[0].replace(/ et al$/, "");
        return `<button class="ref-chip" data-ref="${id}" title="${esc(t)}">[${keys.indexOf(id) + 1}] ${esc(short)}</button>`;
      })
      .join("")}</div>`;
  }

  // ---------- events inside the panel ----------
  function wire(body) {
    body.querySelectorAll("[data-select]").forEach((b) =>
      b.addEventListener("click", () => {
        state.selected = b.dataset.select;
        state.autoTrace = "autotrace" in b.dataset;
        if (state.tab === "surgery") {
          viewer.select(state.selected, false);
          return;
        }
        state.tab = "structures";
        render();
      })
    );
    const course = state.tab === "structures" && courseFor(state.region.structures.find((x) => x.id === state.selected));
    const trace = $("[data-trace]", body);
    if (trace && course) trace.addEventListener("click", () => {
      body.querySelectorAll("[data-step-i]").forEach((li) => li.classList.remove("reached"));
      viewer.trace((i) => {
        const li = body.querySelector(`[data-step-i="${i}"]`);
        if (li) li.classList.add("reached");
      });
    });
    // Picked from the "Trace a course" list: start the tracer straight away.
    if (state.autoTrace) {
      state.autoTrace = false;
      // After render() has shown the course on the model.
      if (trace && course) setTimeout(() => trace.isConnected && trace.click(), 0);
    }
    body.querySelectorAll("[data-pin]").forEach((b) =>
      b.addEventListener("click", () => {
        if (course) viewer.flyTo(course.steps[Number(b.dataset.pin)].p, 9);
      })
    );
    const back = $("[data-back]", body);
    if (back) back.addEventListener("click", () => {
      state.selected = null;
      render();
    });
    const search = $("[data-search]", body);
    if (search) {
      search.addEventListener("input", () => {
        state.search = search.value;
        const pos = search.selectionStart;
        render();
        const s = $("[data-search]");
        s.focus();
        s.setSelectionRange(pos, pos);
      });
    }
    body.querySelectorAll("[data-proc]").forEach((b) =>
      b.addEventListener("click", () => {
        state.proc = Number(b.dataset.proc);
        state.step = 0;
        state.selected = null;
        render();
      })
    );
    body.querySelectorAll("[data-step]").forEach((b) =>
      b.addEventListener("click", () => {
        state.step += Number(b.dataset.step);
        state.selected = null;
        render();
      })
    );
    body.querySelectorAll("[data-rel]").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.dataset.rel;
        if (state.relFocus.has(id)) state.relFocus.delete(id);
        else {
          state.relFocus.add(id);
          const s = viewer.structures.get(id);
          if (s && !viewer.layerVisible[s.layer]) {
            viewer.setLayer(s.layer, true);
            renderLayerToggles();
          }
        }
        render();
      })
    );
    const relAll = $("[data-rel-all]", body);
    if (relAll) relAll.addEventListener("click", () => {
      body.querySelectorAll(".rel-toggle:not([disabled])").forEach((b) => state.relFocus.add(b.dataset.rel));
      for (const id of state.relFocus) {
        const s = viewer.structures.get(id);
        if (s) viewer.layerVisible[s.layer] = true;
      }
      renderLayerToggles();
      render();
    });
    const relClear = $("[data-rel-clear]", body);
    if (relClear) relClear.addEventListener("click", () => {
      state.relFocus.clear();
      render();
    });
    const riskBox = $(".risk-box", body);
    if (riskBox) riskBox.addEventListener("toggle", () => (state.riskOpen = riskBox.open));
    const riskToggle = $("[data-risk-toggle]", body);
    if (riskToggle) riskToggle.addEventListener("change", () => {
      state.showRisk = riskToggle.checked;
      try { localStorage.setItem("showRisk", state.showRisk ? "1" : "0"); } catch (e) {}
      applyStep();
    });
    const bm = $("[data-bookmark]", body);
    if (bm) bm.addEventListener("click", () => {
      toggleBookmark(state.regionId, state.selected);
      render();
    });
    const dStart = $("[data-dissect-start]", body);
    if (dStart) dStart.addEventListener("click", () => {
      state.dissect = { stage: 0, ask: newAsk(dissectStages(state.region)[0]) };
      render();
    });
    const dExit = $("[data-dissect-exit]", body);
    if (dExit) dExit.addEventListener("click", () => {
      exitDissection();
      render();
    });
    body.querySelectorAll("[data-dissect-step]").forEach((b) =>
      b.addEventListener("click", () => {
        const stages = dissectStages(state.region);
        state.dissect.stage = Math.max(0, Math.min(stages.length - 1, state.dissect.stage + Number(b.dataset.dissectStep)));
        state.dissect.ask = newAsk(stages[state.dissect.stage]);
        render();
      })
    );
    const dReveal = $("[data-dissect-reveal]", body);
    if (dReveal) dReveal.addEventListener("click", () => {
      state.dissect.ask.answered = true;
      viewer.frameStructure(state.dissect.ask.id);
      render();
    });
    body.querySelectorAll("[data-qmode]").forEach((b) =>
      b.addEventListener("click", () => {
        state.quizMode = b.dataset.qmode;
        if (state.quizMode !== "questions") nextQuiz3d();
        else state.selected = null;
        render();
      })
    );
    body.querySelectorAll("[data-q3-opt]").forEach((b) => b.addEventListener("click", () => answerQuiz3d(b.dataset.q3Opt)));
    const reveal = $("[data-q3-reveal]", body);
    if (reveal) reveal.addEventListener("click", () => answerQuiz3d(null));
    const skip = $("[data-q3-skip]", body);
    if (skip) skip.addEventListener("click", () => {
      nextQuiz3d();
      render();
    });
    const next = $("[data-q3-next]", body);
    if (next) next.addEventListener("click", () => {
      nextQuiz3d();
      render();
    });
    const q3reset = $("[data-q3-reset]", body);
    if (q3reset) q3reset.addEventListener("click", () => {
      const all = progress();
      delete all[state.regionId];
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(all)); } catch (e) {}
      render();
    });
    body.querySelectorAll("[data-quiz]").forEach((b) =>
      b.addEventListener("click", () => {
        const [i, j] = b.dataset.quiz.split(":").map(Number);
        state.quiz[i] = j;
        render();
      })
    );
    const reset = $("[data-quiz-reset]", body);
    if (reset) reset.addEventListener("click", () => {
      state.quiz = {};
      render();
    });
    body.querySelectorAll("[data-ref]").forEach((b) =>
      b.addEventListener("click", () => {
        if (state.tab === "surgery") exitWalkthrough();
        state.tab = "refs";
        sections.setActive(false);
        render();
        const li = document.getElementById("ref-" + b.dataset.ref);
        li.scrollIntoView({ block: "center" });
        li.classList.add("flash");
      })
    );
  }

  // ---------- surgical walkthrough ↔ viewer ----------
  // The incisions a step draws on the model (region.incisions, named by step.incision).
  const stepIncisions = (st) => {
    const ids = [].concat(st.incision || []);
    return (state.region.incisions || []).filter((i) => ids.includes(i.id));
  };

  let shownIncisions = "";
  function applyStep() {
    const p = procedureOf(state.region);
    const st = p.steps[state.step];
    viewer.setLayers(st.show);
    viewer.setDanger(state.showRisk ? riskIds(p) : []);
    viewer.setFocus(st.focus);
    viewer.setDrill(st.drill);
    viewer.select(state.selected, false);
    // Redraw (and re-frame) only when the step's incisions change.
    const inc = stepIncisions(st);
    const key = inc.map((i) => i.id).join();
    if (key !== shownIncisions) {
      shownIncisions = key;
      viewer.showIncisions(inc);
    }
    renderLayerToggles();
  }

  function exitWalkthrough() {
    shownIncisions = "";
    viewer.showIncisions([]);
    viewer.setDanger([]);
    viewer.setFocus([]);
    viewer.setDrill([]);
    viewer.setLayers(state.region.layers.filter((l) => l.defaultOn).map((l) => l.id));
    renderLayerToggles();
  }

  // ---------- search across every region ----------
  // The first search loads each region's notes (not its meshes) to build the index.
  const searchDialog = $("#search-dialog");
  const searchInput = $("#search-all");
  const searchResults = $("#search-results");
  let searchIndex = null, hits = [], active = 0;
  async function buildIndex() {
    if (searchIndex) return searchIndex;
    searchResults.innerHTML = `<li class="muted">Loading the index…</li>`;
    for (const entry of catalog) {
      const src = entry.scripts[0];
      if (!loaded.has(src)) {
        await loadScript(src);
        loaded.add(src);
      }
    }
    searchIndex = catalog.flatMap((entry) =>
      regions[entry.id].structures.map((s) => ({
        region: entry.id, regionTitle: entry.title, id: s.id, name: s.name, aka: s.aka || "", layer: s.layer,
        traced: !!s.course, text: (s.name + " " + (s.aka || "")).toLowerCase()
      }))
    );
    return searchIndex;
  }
  function runSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (!searchIndex) return;
    if (!q) {
      // Bookmarks and recently viewed structures, from every region.
      const find = (b) => searchIndex.find((x) => x.region === b.region && x.id === b.id);
      const marks = store.get("bookmarks").map(find).filter(Boolean);
      const recent = store.get("recent").map(find).filter(Boolean).filter((x) => !marks.includes(x)).slice(0, 8);
      hits = [...marks, ...recent];
      active = 0;
      const row = (x, i) => `<li role="option" id="hit-${i}" aria-selected="${i === active}" data-hit="${i}">
          <span class="dot" style="background:${LAYER_COLORS[x.layer] || "#999"}"></span>
          <span class="hit-name">${esc(x.name)}</span><span class="hit-region muted">${esc(x.regionTitle)}</span></li>`;
      searchResults.innerHTML = `<li class="muted">Type to search ${searchIndex.length} structures in ${catalog.length} regions.</li>` +
        (marks.length ? `<li class="search-head">★ Bookmarks</li>` + marks.map((x, i) => row(x, i)).join("") : "") +
        (recent.length ? `<li class="search-head">Recently viewed</li>` + recent.map((x, i) => row(x, marks.length + i)).join("") : "");
      searchInput.setAttribute("aria-activedescendant", hits.length ? "hit-0" : "");
      return;
    }
    const words = q.split(/\s+/);
    const score = (x) => (x.name.toLowerCase().startsWith(q) ? 0 : x.name.toLowerCase().includes(q) ? 1 : 2) + (x.region === state.regionId ? -0.5 : 0);
    hits = searchIndex.filter((x) => words.every((w) => x.text.includes(w) || x.regionTitle.toLowerCase().includes(w)))
      .sort((a, b) => score(a) - score(b) || a.name.localeCompare(b.name)).slice(0, 50);
    active = 0;
    searchResults.innerHTML = hits.length
      ? hits.map((x, i) => `<li role="option" id="hit-${i}" aria-selected="${i === active}" data-hit="${i}">
          <span class="dot" style="background:${LAYER_COLORS[x.layer] || "#999"}"></span>
          <span class="hit-name">${esc(x.name)}${x.traced ? ` <span class="hit-tag">trace</span>` : ""}</span>
          <span class="hit-region muted">${esc(x.regionTitle)}</span></li>`).join("")
      : `<li class="muted">No matches.</li>`;
    searchInput.setAttribute("aria-activedescendant", hits.length ? "hit-0" : "");
  }
  function moveActive(d) {
    if (!hits.length) return;
    active = (active + d + hits.length) % hits.length;
    searchResults.querySelectorAll("[data-hit]").forEach((li, i) => li.setAttribute("aria-selected", String(i === active)));
    const li = $(`#hit-${active}`, searchResults);
    li.scrollIntoView({ block: "nearest" });
    searchInput.setAttribute("aria-activedescendant", li.id);
  }
  function openHit(i) {
    const x = hits[i];
    if (!x) return;
    searchDialog.close();
    if (x.region === state.regionId) openStructure(x.id);
    else {
      if (state.tab === "surgery") state.tab = "overview";
      loadRegion(x.region, x.id);
    }
  }
  async function openSearch() {
    if (searchDialog.open) return;
    searchDialog.showModal();
    searchInput.value = ""; // start afresh, showing bookmarks and recently viewed
    searchInput.focus();
    await buildIndex();
    runSearch();
  }
  $("#search-open").addEventListener("click", openSearch);
  searchInput.addEventListener("input", runSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); }
    else if (e.key === "Enter") { e.preventDefault(); openHit(active); }
    // A search field clears itself on Esc; here Esc closes the search instead.
    else if (e.key === "Escape") { e.preventDefault(); searchDialog.close(); }
  });
  searchResults.addEventListener("click", (e) => {
    const li = e.target.closest("[data-hit]");
    if (li) openHit(Number(li.dataset.hit));
  });

  // Keyboard: "/" or Ctrl/Cmd-K searches, "?" opens the guide (not while typing).
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName);
    if (((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) && !searchDialog.open) {
      e.preventDefault();
      openSearch();
    } else if (e.key === "?" && !typing && !helpDialog.open) {
      e.preventDefault();
      openHelp();
    }
  });

  // ---------- theme ----------
  const THEMES = ["auto", "light", "dark"];
  const themeBtn = $("#theme-toggle");
  function applyTheme(t) {
    if (t === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
    const label = `Theme: ${t === "auto" ? "automatic" : t}`;
    themeBtn.setAttribute("aria-label", label);
    themeBtn.title = label;
    themeBtn.dataset.mode = t;
  }
  let theme = "auto";
  try { theme = THEMES.includes(localStorage.getItem("theme")) ? localStorage.getItem("theme") : "auto"; } catch (e) {}
  applyTheme(theme);
  themeBtn.addEventListener("click", () => {
    theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    try { localStorage.setItem("theme", theme); } catch (e) {}
    applyTheme(theme);
  });

  // ---------- quick guide, install and offline ----------
  const helpDialog = $("#help-dialog");
  const isStandalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const isNativeShell = !!(window.Capacitor || /Electron/.test(navigator.userAgent));
  const canCache = "serviceWorker" in navigator && "caches" in window && /^https?:$/.test(location.protocol) && !isNativeShell;
  let installPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installPrompt = e;
    $("#install-btn").hidden = false;
  });
  $("#install-btn").addEventListener("click", async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    $("#install-btn").hidden = true;
  });

  // Files of the whole app, listed at build time (tools/build_web.mjs); absent when run from the source folder.
  async function precacheList() {
    try {
      const r = await fetch("precache.json", { cache: "no-store" });
      return r.ok ? r.json() : null;
    } catch (e) {
      return null;
    }
  }
  async function offlineStatus() {
    const status = $("#install-status");
    if (isNativeShell || location.protocol === "file:") {
      status.textContent = "This copy runs from files on your device, so everything already works offline.";
      return;
    }
    if (!canCache) {
      status.textContent = "This browser can't store the app for offline use.";
      return;
    }
    const list = await precacheList();
    if (!list || !navigator.serviceWorker.controller) {
      // Not served as the installable app (or its offline worker isn't running yet).
      status.textContent = "For offline use, install the app from its web address or from the project's Releases page.";
      return;
    }
    const cache = await caches.open(list.cache);
    const have = (await Promise.all(list.files.map((f) => cache.match(f)))).filter(Boolean).length;
    status.textContent = have >= list.files.length
      ? "Everything is downloaded: the app works offline."
      : `Regions you open are kept for offline use (${have} of ${list.files.length} files so far, ${Math.round(list.bytes / 1e6)} MB in total).`;
    $("#offline-btn").hidden = have >= list.files.length;
  }
  $("#offline-btn").addEventListener("click", async () => {
    const list = await precacheList();
    if (!list) return;
    const btn = $("#offline-btn"), bar = $("#offline-progress");
    btn.disabled = true;
    bar.hidden = false;
    bar.max = list.files.length;
    const cache = await caches.open(list.cache);
    let done = 0, failed = 0;
    for (const f of list.files) {
      try {
        if (!(await cache.match(f))) await cache.add(f);
      } catch (e) {
        failed++;
      }
      bar.value = ++done;
    }
    bar.hidden = true;
    btn.disabled = false;
    if (failed) $("#install-status").textContent = `${failed} files couldn't be downloaded. Check the connection and try again.`;
    else offlineStatus();
  });
  function openHelp() {
    hideFirstTip(true);
    $("#ios-hint").hidden = !(/iPhone|iPad|iPod/.test(navigator.userAgent) && !isStandalone());
    offlineStatus();
    helpDialog.showModal();
  }
  $("#help-open").addEventListener("click", openHelp);
  // Dialogs close on a click outside their box.
  for (const d of [searchDialog, helpDialog]) {
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
  }

  // A one-time, non-blocking tip pointing new users to the guide.
  const firstTip = $("#first-tip");
  function showFirstTip() {
    let seen = true;
    try { seen = !!localStorage.getItem("guideSeen"); } catch (e) {}
    firstTip.hidden = seen;
  }
  function hideFirstTip(remember) {
    firstTip.hidden = true;
    if (remember) try { localStorage.setItem("guideSeen", "1"); } catch (e) {}
  }
  $("[data-tip-guide]", firstTip).addEventListener("click", openHelp);
  $("[data-tip-close]", firstTip).addEventListener("click", () => hideFirstTip(true));

  if (canCache) navigator.serviceWorker.register("sw.js").catch(() => {});

  loadRegion(...parseHash());
})();
