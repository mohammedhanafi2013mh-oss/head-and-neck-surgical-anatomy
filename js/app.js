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
    deep: "#7e9bb8"
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  const state = {
    region: null,
    tab: "overview",
    selected: null,
    step: 0,
    quiz: {},
    search: ""
  };

  const viewer = new Viewer($("#viewer"), {
    onSelect: (id) => {
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

  async function loadRegion(id) {
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
        }
      }
    } catch (err) {
      loading.textContent = `${err.message}. Check that the data folder sits next to index.html.`;
      return;
    }
    loading.hidden = true;
    state.region = regions[entry.id];
    state.regionId = entry.id;
    state.model = models[entry.id];
    landmarksShown = null;
    state.selected = null;
    state.step = 0;
    state.quiz = {};
    state.search = "";
    if (state.tab === "surgery") state.tab = "overview";
    $("#region-subtitle").textContent = `${state.region.title} · ${state.region.subtitle}`;
    history.replaceState(null, "", "#" + entry.id);
    viewer.load(state.region, state.model);
    sections.rebuild(state.model, entry.id);
    sections.setActive(state.tab === "sections");
    renderLayerToggles();
    renderViewButtons();
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
      viewer.flyTo(pinFor(s), 10);
    } else viewer.clearCourse();
    shownCourse = course ? s.id : null;
  }

  // ---------- viewer controls ----------

  // A region can rename a view button (e.g. "From above" for the larynx).
  function renderViewButtons() {
    const names = { lateral: "Lateral", inferior: "Inferior", anterior: "Anterior" };
    document.querySelectorAll("[data-view]").forEach((b) => {
      const v = b.dataset.view;
      if (names[v]) b.textContent = (state.model.viewLabels || {})[v] || names[v];
    });
  }
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
      if (v === "reset") viewer.resetView();
      else viewer.setView(...state.model.views[v]);
    })
  );
  const labelsBtn = $("#labels-toggle");
  labelsBtn.addEventListener("click", () => {
    viewer.showAllLabels = !viewer.showAllLabels;
    labelsBtn.setAttribute("aria-pressed", String(viewer.showAllLabels));
    viewer.refresh();
  });

  // ---------- tabs ----------
  document.querySelectorAll("[data-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      const leavingSurgery = state.tab === "surgery" && b.dataset.tab !== "surgery";
      state.tab = b.dataset.tab;
      if (b.dataset.tab === "structures") state.selected = state.selected || null;
      if (leavingSurgery) exitWalkthrough();
      sections.setActive(state.tab === "sections");
      render();
    })
  );

  function render() {
    if (!state.region) return;
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
    if (state.tab === "surgery") applyStep();
    else viewer.select(state.selected, false);
    syncCourse();
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
      ${refChips(o.refs)}`;
  }

  function structures(r) {
    if (state.selected) return structureCard(r.structures.find((s) => s.id === state.selected));
    const q = state.search.toLowerCase();
    const groups = r.layers
      .map((l) => ({
        l,
        items: r.structures.filter((s) => s.layer === l.id && (!q || (s.name + " " + (s.aka || "")).toLowerCase().includes(q)))
      }))
      .filter((g) => g.items.length);
    return `
      <input class="search" type="search" placeholder="Search structures…" value="${esc(state.search)}" data-search>
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

  function structureCard(s) {
    const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    const supply = Object.entries(s.supply || {});
    return `
      <button class="back" data-back>← All structures</button>
      <h2>${esc(s.name)}</h2>
      ${s.aka ? `<p class="aka">${esc(s.aka)}</p>` : ""}
      ${viewer.structures.has(s.id) ? "" : pinFor(s) ? `<p class="aka">Shown as a pin on the 3D model.</p>` : `<p class="aka">Not shown in the 3D model yet.</p>`}
      ${s.drawn === "redrawn" ? `<p class="aka">Z-Anatomy's model places this structure inaccurately here, so its path in this region was redrawn for this app in its usual position.</p>`
        : s.drawn ? `<p class="aka">Z-Anatomy has no model of this structure. Its 3D path was drawn for this app from the surrounding anatomy.</p>` : ""}
      <p>${esc(s.summary)}</p>
      ${courseHtml(courseFor(s))}
      ${s.relations?.length ? `<h3>Relations</h3>${list(s.relations)}` : ""}
      ${supply.length ? `<h3>Supply & function</h3><dl class="def-list">${supply.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}
      ${s.surgical?.length ? `<div class="callout pearl"><div class="callout-title">Surgical relevance</div>${list(s.surgical)}</div>` : ""}
      ${s.danger?.length ? `<div class="callout danger"><div class="callout-title">Danger points</div>${list(s.danger)}</div>` : ""}
      ${s.variations?.length ? `<h3>Variations</h3>${list(s.variations)}` : ""}
      ${refChips(s.refs)}`;
  }

  function courseHtml(course) {
    if (!course) return "";
    return `<div class="course"><div class="course-head"><h3>Course</h3><button type="button" class="trace-btn" data-trace>▶ Trace the course</button></div>
      <ol class="course-list">${course.steps
        .map((x, i) => `<li data-step-i="${i}"><button type="button" data-pin="${i}">${esc(x.label)}</button>${x.text ? ` <span>${esc(x.text)}</span>` : ""}</li>`)
        .join("")}</ol>
      <p class="muted small">Pins mark each point on the model; the line shows the path, drawn through bone so it can be followed.</p></div>`;
  }

  function surgery(r) {
    const p = r.procedure;
    const st = p.steps[state.step];
    const names = Object.fromEntries(r.structures.map((s) => [s.id, s.name]));
    return `
      <h2>${esc(p.title)}</h2>
      <p class="muted">Step through the operation. The model shows the layers you would see at each stage and highlights the key structures.</p>
      <div class="steps-nav">
        <span class="count">Step ${state.step + 1} of ${p.steps.length}</span>
        <button data-step="-1" ${state.step === 0 ? "disabled" : ""}>← Prev</button>
        <button data-step="1" ${state.step === p.steps.length - 1 ? "disabled" : ""}>Next →</button>
      </div>
      <div class="step-card">
        <h4>${esc(st.title)}</h4>
        <p>${esc(st.text)}</p>
        <div class="focus-list">${st.focus.map((id) => `<button data-select="${id}">${esc(names[id])}</button>`).join("")}</div>
      </div>
      <div class="step-dots">${p.steps.map((_, i) => `<span class="${i <= state.step ? "on" : ""}"></span>`).join("")}</div>
      <h3>Complications</h3>
      <div class="callout danger"><ul>${p.complications.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
      ${refChips(p.refs)}`;
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
    body.querySelectorAll("[data-step]").forEach((b) =>
      b.addEventListener("click", () => {
        state.step += Number(b.dataset.step);
        state.selected = null;
        render();
      })
    );
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
        state.tab = "refs";
        render();
        const li = document.getElementById("ref-" + b.dataset.ref);
        li.scrollIntoView({ block: "center" });
        li.classList.add("flash");
      })
    );
  }

  // ---------- surgical walkthrough ↔ viewer ----------
  function applyStep() {
    const st = state.region.procedure.steps[state.step];
    viewer.setLayers(st.show);
    viewer.setFocus(st.focus);
    viewer.select(state.selected, false);
    renderLayerToggles();
  }

  function exitWalkthrough() {
    viewer.setFocus([]);
    viewer.setLayers(state.region.layers.filter((l) => l.defaultOn).map((l) => l.id));
    renderLayerToggles();
  }

  loadRegion(location.hash.slice(1));
})();
