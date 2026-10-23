// Cross-sections: cuts the region's 3D model with a plane and renders the cut
// surface as CT-style, T1 MRI-style or anatomy-coloured slices. The fills
// come from stencil capping (each mesh's back faces add to the stencil, its
// front faces subtract, and a cap is drawn wherever the count is non-zero).
// These are simulations from the model, not patient imaging. The "Real CT"
// and "Real MRI" modes show Visible Human scans instead (js/scans.js).

(function () {
  // Grey levels (0-1) per tissue. CT approximates a soft-tissue window with
  // contrast-filled vessels; T1 MRI has bright fat and dark flow voids.
  const STYLES = {
    ct: {
      background: 0x000000,
      body: 0x272727,
      kinds: { bone: 1, cartilage: 0.78, muscle: 0.53, gland: 0.5, duct: 0.36, artery: 1, vein: 0.86, nerve: 0.46, node: 0.5, space: 0.3 },
      ids: { thyroid: 0.7, parotid: 0.42, larynx: 0.8, auricle: 0.6 }
    },
    t1: {
      background: 0x000000,
      body: 0xd8d8d8,
      kinds: { bone: 0.55, cartilage: 0.22, muscle: 0.3, gland: 0.48, duct: 0.14, artery: 0.03, vein: 0.1, nerve: 0.36, node: 0.38, space: 0.72 },
      ids: { parotid: 0.7, thyroid: 0.42, larynx: 0.25, auricle: 0.3 }
    },
    anatomy: { background: 0x15130f, body: 0xe6c9a2 }
  };

  // Options in the style dropdown for each mode.
  const MODE_OPTIONS = {
    sim: [["ct", "CT (soft tissue, contrast)"], ["t1", "MRI T1"], ["anatomy", "Anatomy colours"]],
    ct: [["soft", "Soft-tissue window"], ["bone", "Bone window"]]
  };
  const NOTES = {
    sim: "Simulated from the 3D model, not patient imaging. Fat and skin aren't modelled; the body outline is estimated from the structures the slice cuts. Hover over a structure to name it; click or tap to select it.",
    ct: "Real CT of the Visible Human male (the body the 3D model was built from; post-mortem, no contrast). It is matched to the model slice by registering the model's skeleton to the CT (median bone error about 1.5 mm). Names and outlines come from the registered model, so treat them as approximate for soft tissue. Courtesy of the U.S. National Library of Medicine.",
    mri: "Real MRI of the Visible Human male (T1 and T2), scanned separately from the CT. It is matched to the CT by the body outline, and through the CT to the model, so the model slice follows the MRI slice and the names and outlines come from the model. Treat them as approximate (a few millimetres; more for soft tissue that shifted between scans). Courtesy of the U.S. National Library of Medicine."
  };

  // Small structures draw last so they sit on top of what they run through.
  // Spaces draw first, so their contents are capped on top of them.
  const ORDER = { space: 0, bone: 1, cartilage: 1, muscle: 2, gland: 3, node: 4, vein: 5, artery: 6, nerve: 7, duct: 8 };

  // Camera placement per plane, following radiology convention.
  // keep: the side of the plane that stays (the camera looks from the other side).
  const PLANES = {
    axial: { axis: 1, normal: [0, 1, 0], eye: [0, -1, 0], up: [0, 0, 1], marks: ["A", "P", "R", "L"] },
    coronal: { axis: 2, normal: [0, 0, -1], eye: [0, 0, 1], up: [0, 1, 0], marks: ["S", "I", "R", "L"] },
    sagittal: { axis: 0, normal: [-1, 0, 0], eye: [1, 0, 0], up: [0, 1, 0], marks: ["S", "I", "A", "P"] }
  };

  // The section renderer outputs linear colour, so values set here are the
  // values on screen (and pick IDs read back exactly). disp() converts a
  // design hex colour into that space.
  const disp = (hex) => new THREE.Color().setHex(hex).convertLinearToSRGB();
  const HIGHLIGHT = disp(0x3fb0e0);

  class Sections {
    constructor(viewer, el, opts) {
      this.viewer = viewer;
      this.el = el;
      this.onPick = opts.onPick || (() => {});
      this.canvas = el.querySelector("canvas.sim");
      this.realCanvas = el.querySelector("canvas.real");
      this.mode = "sim";
      this.scans = new window.ANATOMY.RealScans(this, this.realCanvas, opts.loadScript);
      this.tip = el.querySelector(".section-tip");
      this.planeName = "axial";
      this.style = "ct";
      this.level = 0.5;
      this.cut3d = false; // the 3D model stays whole; the slice is drawn on it as an outline
      this.showLabels = true;
      this.active = false;
      this.entries = [];

      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, stencil: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.localClippingEnabled = true;
      if ("outputColorSpace" in this.renderer) this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
      this.plane = new THREE.Plane();
      this.pickTarget = null;

      // Where the slice is, drawn in the main 3D view.
      this.indicator = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ color: 0x3fb0e0, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false })
      );
      this.indicator.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1)),
        new THREE.LineBasicMaterial({ color: 0x3fb0e0 })
      ));
      this.indicator.visible = false;
      viewer.scene.add(this.indicator);
      // The slice's outline on every structure it crosses: the cursor that
      // moves along the whole model as the level changes.
      this.contour = new THREE.LineSegments(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0x3fd0ff, depthTest: false, transparent: true, opacity: 0.95 })
      );
      this.contour.renderOrder = 999;
      this.contour.visible = false;
      viewer.scene.add(this.contour);
      this.marks = el.querySelector(".section-marks");
      viewer.renderer.localClippingEnabled = true;
      this.clip3d = new THREE.Plane();
      this.clipList = [this.clip3d]; // one array, so materials recompile only when cutting turns on or off

      this.bindUi();
      new ResizeObserver(() => this.resize()).observe(this.canvas.parentElement);
    }

    // ---------- setup ----------

    rebuild(model, regionId) {
      this.model = model;
      this.regionId = regionId;
      this.meshCentre = window.ANATOMY.meshes[regionId].header.centre;
      this.level = model.sectionLevel ?? 0.5;
      for (const e of this.entries) {
        this.scene.remove(e.back, e.front, e.cap);
        for (const m of [e.back, e.front, e.cap]) m.material.dispose();
        e.cap.geometry.dispose(); // back and front share the viewer's geometry, disposed there
      }
      this.entries = [];
      this.bounds = new THREE.Box3();
      const list = [];
      for (const [id, s] of this.viewer.structures) {
        const kind = (model.look[id] || {}).kind || "muscle";
        s.root.traverse((o) => {
          if (!o.isMesh) return;
          this.bounds.union(o.geometry.boundingBox);
          list.push({ id, kind, layer: s.layer, source: o });
        });
      }
      list.sort((a, b) => (ORDER[a.kind] ?? 2) - (ORDER[b.kind] ?? 2));
      const clip = [this.plane];
      list.forEach((e, i) => {
        const stencil = (side, op) => new THREE.MeshBasicMaterial({
          side, clippingPlanes: clip, colorWrite: false, depthWrite: false, depthTest: false,
          stencilWrite: true, stencilFunc: THREE.AlwaysStencilFunc,
          stencilFail: op, stencilZFail: op, stencilZPass: op
        });
        e.back = new THREE.Mesh(e.source.geometry, stencil(THREE.BackSide, THREE.IncrementWrapStencilOp));
        e.front = new THREE.Mesh(e.source.geometry, stencil(THREE.FrontSide, THREE.DecrementWrapStencilOp));
        e.cap = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({
          color: 0xffffff, depthTest: false, depthWrite: false,
          stencilWrite: true, stencilRef: 0, stencilFunc: THREE.NotEqualStencilFunc,
          stencilFail: THREE.ReplaceStencilOp, stencilZFail: THREE.ReplaceStencilOp, stencilZPass: THREE.ReplaceStencilOp
        }));
        e.back.renderOrder = e.front.renderOrder = i * 3 + 1;
        e.cap.renderOrder = i * 3 + 2;
        e.anatomyColor = e.source.material.color.clone().convertLinearToSRGB();
        const n = i + 1;
        e.pickColor = new THREE.Color().setRGB(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
        this.scene.add(e.back, e.front, e.cap);
        this.entries.push(e);
      });

      if (!this.body) {
        this.body = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ depthTest: false, depthWrite: false, side: THREE.DoubleSide }));
        this.body.renderOrder = 0;
        this.scene.add(this.body);
      }
      this.syncControls();
      this.update();
    }

    setActive(on) {
      this.active = on;
      this.apply3d();
      if (on) this.update();
    }

    bindUi() {
      this.el.querySelectorAll("[data-plane]").forEach((b) =>
        b.addEventListener("click", () => {
          if (b.disabled) return;
          this.planeName = b.dataset.plane;
          this.syncControls();
          this.update();
        })
      );
      this.el.querySelectorAll("[data-mode]").forEach((b) =>
        b.addEventListener("click", async () => {
          this.mode = b.dataset.mode;
          if (this.mode !== "sim") {
            this.syncControls();
            this.scans.message("Loading scans…");
            try {
              await this.scans.load();
            } catch (err) {
              // update() skips drawing until the scans arrive; clicking the button again retries.
              this.scans.message("Couldn't load the scans. Check that data/scans sits next to index.html.");
              return;
            }
          }
          if (this.mode === "mri" && this.planeName === "sagittal") this.planeName = "coronal";
          this.syncControls();
          this.apply3d();
          this.update();
        })
      );
      const style = this.el.querySelector("#section-style");
      style.addEventListener("change", () => {
        if (this.mode === "sim") this.style = style.value;
        else if (this.mode === "ct") this.scans.window = style.value;
        else this.scans.mriSeries[this.planeName] = style.value;
        this.update();
      });
      const level = this.el.querySelector("#section-level");
      level.addEventListener("input", () => {
        if (this.mode === "mri") this.scans.mriLevel[this.planeName] = level.value / 1000;
        else this.level = level.value / 1000;
        this.update();
      });
      const outlines = this.el.querySelector("#section-outlines");
      outlines.addEventListener("change", () => {
        this.scans.showOutlines = outlines.checked;
        this.update();
      });
      this.realCanvas.addEventListener("pointermove", (e) => this.hover(e, true));
      this.realCanvas.addEventListener("pointerleave", () => (this.tip.hidden = true));
      this.realCanvas.addEventListener("click", (e) => {
        const id = this.realPick(e);
        if (id) this.onPick(id);
      });
      const cut = this.el.querySelector("#section-cut");
      cut.addEventListener("change", () => {
        this.cut3d = cut.checked;
        this.apply3d();
      });
      const labels = this.el.querySelector("#section-labels");
      labels.addEventListener("change", () => {
        this.showLabels = labels.checked;
        this.renderMarks();
      });
      this.canvas.addEventListener("pointermove", (e) => this.hover(e));
      this.canvas.addEventListener("pointerleave", () => (this.tip.hidden = true));
      this.canvas.addEventListener("click", (e) => {
        const id = this.pick(e);
        if (id) this.onPick(id);
      });
    }

    resize() {
      const wrap = this.canvas.parentElement;
      const size = Math.max(160, Math.min(wrap.clientWidth, 520));
      this.renderer.setSize(size, size, false);
      this.canvas.style.width = this.canvas.style.height = size + "px";
      const dpr = Math.min(window.devicePixelRatio, 2);
      this.realCanvas.width = this.realCanvas.height = Math.round(size * dpr);
      this.realCanvas.style.width = this.realCanvas.style.height = size + "px";
      if (this.pickTarget) this.pickTarget.dispose();
      this.pickTarget = null;
      if (this.active && this.entries.length) this.update();
    }

    // ---------- slicing ----------

    update() {
      if (!this.entries.length || this.pending) return;
      this.pending = true;
      requestAnimationFrame(() => {
        this.pending = false;
        if (this.mode === "mri" && this.scans.m) this.followMri();
        this.placePlane();
        this.apply3d();
        this.outline();
        this.fit();
        if (this.mode !== "sim" && !this.scans.m) return; // scans still loading
        if (this.mode === "sim") this.draw();
        else if (this.mode === "ct") this.scans.drawCt();
        else this.scans.drawMri();
        this.chrome();
        this.renderMarks();
      });
    }

    // In MRI mode the slider picks the MRI slice; move the model slice to where
    // that slice crosses the model, if it does.
    followMri() {
      const c = this.scans.mriCentreApp();
      const axis = PLANES[this.planeName].axis;
      const lo = this.bounds.min.getComponent(axis), hi = this.bounds.max.getComponent(axis);
      const level = c ? (c.getComponent(axis) - lo) / (hi - lo) : -1;
      this.mriLinked = level >= 0 && level <= 1;
      if (this.mriLinked) this.level = level;
    }

    placePlane() {
      const p = PLANES[this.planeName];
      const b = this.bounds;
      const lo = b.min.getComponent(p.axis), hi = b.max.getComponent(p.axis);
      const value = lo + (hi - lo) * this.level;
      const normal = new THREE.Vector3(...p.normal);
      // Keep the side away from the camera: dot(normal, x) - value*sign >= 0.
      const sign = normal.getComponent(p.axis);
      this.plane.set(normal, -value * sign);
      this.value = value;

      const centre = b.getCenter(new THREE.Vector3());
      centre.setComponent(p.axis, value);
      const eye = new THREE.Vector3(...p.eye);
      const size = b.getSize(new THREE.Vector3());
      const span = Math.max(...[0, 1, 2].filter((i) => i !== p.axis).map((i) => size.getComponent(i))) * 0.55;
      Object.assign(this.camera, { left: -span, right: span, top: span, bottom: -span, near: 0.1, far: size.length() * 4 });
      this.camera.up.set(...p.up);
      this.camera.position.copy(centre).addScaledVector(eye, size.length() * 2);
      this.camera.lookAt(centre);
      this.camera.updateProjectionMatrix();
      this.camera.updateMatrixWorld();

      // Caps and the 3D indicator lie in the plane, facing the camera.
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), eye);
      for (const e of this.entries) {
        e.cap.position.copy(centre);
        e.cap.quaternion.copy(q);
        e.cap.scale.setScalar(span * 2.2);
      }
      this.indicator.position.copy(centre);
      this.indicator.quaternion.copy(q);
      this.indicator.scale.setScalar(span * 2);
      this.centre = centre;
      this.basis = {
        right: new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0),
        up: new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1)
      };
      const [loName, hiName] = { axial: ["Inferior", "Superior"], coronal: ["Posterior", "Anterior"], sagittal: ["Right", "Left"] }[this.planeName];
      this.el.querySelector(".level-lo").textContent = loName;
      this.el.querySelector(".level-hi").textContent = hiName;
      const [t, bo, l, r] = p.marks;
      this.el.querySelector(".ori-top").textContent = t;
      this.el.querySelector(".ori-bottom").textContent = bo;
      this.el.querySelector(".ori-left").textContent = l;
      this.el.querySelector(".ori-right").textContent = r;
    }

    apply3d() {
      this.viewer.invalidate();
      const linked = this.active && this.entries.length > 0 && (this.mode !== "mri" || !!this.mriLinked);
      const on = linked && this.cut3d;
      this.indicator.visible = linked;
      this.contour.visible = linked;
      this.indicator.material.opacity = on ? 0.12 : 0.07;
      // In 3D, keep the same half as the slice so the cut faces the camera side.
      this.clip3d.copy(this.plane);
      for (const s of this.viewer.structures.values()) {
        s.root.traverse((o) => {
          if (!o.isMesh) return;
          const want = on ? this.clipList : null;
          if (o.material.clippingPlanes !== want) {
            o.material.clippingPlanes = want;
            o.material.needsUpdate = true;
          }
        });
      }
    }

    // Approximate body outline: the convex hull of everything the plane cuts,
    // grown by 6 mm, filled as fat. Also records where each structure is cut.
    outline() {
      const n = this.plane.normal, c = this.plane.constant;
      const { right, up } = this.basis;
      const pts = [];
      const segs = [];
      this.cutCentres = new Map();
      const a = new THREE.Vector3(), b = new THREE.Vector3(), d = new THREE.Vector3(), p = new THREE.Vector3();
      for (const e of this.entries) {
        e.visible = !!this.viewer.layerVisible[e.layer] && !this.viewer.hidden.has(e.id);
        if (!e.visible) continue;
        const pos = e.source.geometry.attributes.position;
        const idx = e.source.geometry.index.array;
        let sx = 0, sy = 0, count = 0;
        e.cut = [];
        for (let i = 0; i < idx.length; i += 3) {
          const ia = idx[i], ib = idx[i + 1], ic = idx[i + 2];
          const da = n.x * pos.getX(ia) + n.y * pos.getY(ia) + n.z * pos.getZ(ia) + c;
          const db = n.x * pos.getX(ib) + n.y * pos.getY(ib) + n.z * pos.getZ(ib) + c;
          const dc = n.x * pos.getX(ic) + n.y * pos.getY(ic) + n.z * pos.getZ(ic) + c;
          if ((da > 0 && db > 0 && dc > 0) || (da < 0 && db < 0 && dc < 0)) continue;
          for (const [i1, d1, i2, d2] of [[ia, da, ib, db], [ib, db, ic, dc], [ic, dc, ia, da]]) {
            if ((d1 > 0) === (d2 > 0)) continue;
            a.fromBufferAttribute(pos, i1);
            b.fromBufferAttribute(pos, i2);
            p.copy(a).lerp(b, d1 / (d1 - d2));
            segs.push(p.x, p.y, p.z);
            p.sub(this.centre);
            const u = p.dot(right), v = p.dot(up);
            pts.push([u, v]);
            e.cut.push([u, v]);
            sx += u; sy += v; count++;
          }
        }
        if (count) {
          const prev = this.cutCentres.get(e.id);
          if (!prev || count > prev.count) this.cutCentres.set(e.id, { ...anchor(e.cut, sx / count, sy / count), count });
        }
      }
      const cg = this.contour.geometry;
      cg.setAttribute("position", new THREE.Float32BufferAttribute(segs.length % 6 ? segs.slice(0, segs.length - (segs.length % 6)) : segs, 3));
      cg.computeBoundingSphere();
      const hull = convexHull(pts);
      const geo = this.body.geometry;
      this.sliceBox = null;
      if (hull.length >= 3) {
        const us = hull.map((q) => q[0]), vs = hull.map((q) => q[1]);
        this.sliceBox = { minU: Math.min(...us), maxU: Math.max(...us), minV: Math.min(...vs), maxV: Math.max(...vs) };
      }
      if (hull.length < 3) {
        geo.setAttribute("position", new THREE.Float32BufferAttribute([], 3));
        return;
      }
      const cu = hull.reduce((s, q) => s + q[0], 0) / hull.length;
      const cv = hull.reduce((s, q) => s + q[1], 0) / hull.length;
      const toWorld = (u, v) => d.copy(this.centre).addScaledVector(right, u).addScaledVector(up, v).toArray();
      const verts = [];
      hull.forEach((q, i) => {
        const r = hull[(i + 1) % hull.length];
        const grow = (s) => {
          const du = s[0] - cu, dv = s[1] - cv, len = Math.hypot(du, dv) || 1;
          return [s[0] + (du / len) * 0.6, s[1] + (dv / len) * 0.6];
        };
        const [qu, qv] = grow(q), [ru, rv] = grow(r);
        verts.push(...toWorld(cu, cv), ...toWorld(qu, qv), ...toWorld(ru, rv));
      });
      geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
      geo.computeBoundingSphere();
    }

    // Frame the slice: centre on its outline and zoom to fit, then size the
    // 1 cm scale bar to match.
    fit() {
      const box = this.sliceBox;
      if (box) {
        const span = Math.max(box.maxU - box.minU, box.maxV - box.minV) * 0.5 * 1.15 + 0.5;
        const cu = (box.minU + box.maxU) / 2, cv = (box.minV + box.maxV) / 2;
        Object.assign(this.camera, { left: cu - span, right: cu + span, top: cv + span, bottom: cv - span });
        this.camera.updateProjectionMatrix();
      }
      const width = this.canvas.clientWidth || 1;
      const cmPx = width / (this.camera.right - this.camera.left);
      const bar = this.el.querySelector(".scale-bar");
      bar.style.width = cmPx + "px";
    }

    // ---------- labels ----------

    // Screen position (CSS px within the view) of a point on the slice.
    markPos(u, v) {
      if (this.mode === "ct") {
        const s = this.scans, view = s.view;
        if (!view) return null;
        const p = this.centre.clone().addScaledVector(this.basis.right, u).addScaledVector(this.basis.up, v);
        const [px, py] = s.toPixel(s.appToCt(p), view.plane.frame);
        const k = this.realCanvas.clientWidth / this.realCanvas.width;
        return [(px - view.sx) * view.kx * k, (py - view.sy) * view.ky * k];
      }
      if (this.mode === "mri") {
        const s = this.scans;
        const p = this.centre.clone().addScaledVector(this.basis.right, u).addScaledVector(this.basis.up, v);
        const [x, y] = s.mriScreen(s.appToCt(p));
        const k = this.realCanvas.clientWidth / this.realCanvas.width;
        return [x * k, y * k];
      }
      const c = this.camera, w = this.canvas.clientWidth;
      return [((u - c.left) / (c.right - c.left)) * w, ((c.top - v) / (c.top - c.bottom)) * w];
    }

    // Name the structures the slice cuts, placed so labels don't overlap.
    // Vessels and nerves first, then glands, muscles and bone; the selected
    // structure always gets a label.
    renderMarks() {
      const box = this.marks;
      box.innerHTML = "";
      if (!this.showLabels || (this.mode === "mri" && !this.mriLinked) || !this.cutCentres || !this.active) return;
      const W = (this.mode === "sim" ? this.canvas : this.realCanvas).clientWidth;
      const v = this.viewer;
      const rank = { space: -1, artery: 0, nerve: 0, vein: 1, gland: 2, duct: 2, muscle: 3, cartilage: 3, node: 4, bone: 4 };
      const kind = (id) => (this.model.look[id] || {}).kind || "muscle";
      const items = [...this.cutCentres]
        .map(([id, c]) => ({ id, c, sel: id === v.selectedId || v.focusIds.has(id) }))
        .sort((a, b) => b.sel - a.sel || (rank[kind(a.id)] ?? 3) - (rank[kind(b.id)] ?? 3) || b.c.count - a.c.count);
      const placed = [], dots = [];
      const max = W < 400 ? 12 : 20;
      const hit = (r) => placed.some((o) => r[0] < o[0] + o[2] && r[0] + r[2] > o[0] && r[1] < o[1] + o[3] && r[1] + r[3] > o[1])
        || dots.some(([x, y]) => x > r[0] - 3 && x < r[0] + r[2] + 3 && y > r[1] - 3 && y < r[1] + r[3] + 3);
      for (const it of items) {
        if (placed.length >= max) break;
        const pos = this.markPos(it.c.u, it.c.v);
        if (!pos) continue;
        const [x, y] = pos;
        if (x < 4 || y < 4 || x > W - 4 || y > W - 4) continue;
        const name = v.structures.get(it.id).name.replace(/ \(.*\)$/, "");
        const w = name.length * 5.9 + 2, h = 13;
        const spots = [[x + 6, y - h / 2], [x - 6 - w, y - h / 2], [x - w / 2, y - 7 - h], [x - w / 2, y + 7]];
        const spot = spots.find(([lx, ly]) => lx >= 2 && ly >= 14 && lx + w <= W - 2 && ly + h <= W - 18 && !hit([lx, ly, w, h]));
        if (!spot) continue;
        placed.push([spot[0], spot[1], w, h]);
        dots.push([x, y]);
        const dot = document.createElement("span");
        dot.className = "section-mark-dot";
        dot.style.transform = `translate(${x}px, ${y}px)`;
        const label = document.createElement("span");
        label.className = "section-mark" + (it.sel ? " selected" : "");
        label.textContent = name;
        label.style.transform = `translate(${spot[0]}px, ${spot[1]}px)`;
        box.append(dot, label);
      }
    }

    // ---------- drawing ----------

    colourFor(e) {
      const st = STYLES[this.style];
      let col;
      if (this.style === "anatomy") col = e.anatomyColor.clone();
      else {
        const g = st.ids[e.id] ?? st.kinds[e.kind] ?? 0.5;
        col = new THREE.Color().setRGB(g, g, g);
      }
      const v = this.viewer;
      if (e.id === v.selectedId || v.focusIds.has(e.id)) col.lerp(HIGHLIGHT, 0.55);
      return col;
    }

    draw(forPick = false) {
      if (!this.entries.length) return;
      const st = STYLES[this.style];
      for (const e of this.entries) {
        e.back.visible = e.front.visible = e.cap.visible = !!e.visible;
        e.cap.material.color.copy(forPick ? e.pickColor : this.colourFor(e));
      }
      this.body.material.color.copy(forPick ? new THREE.Color(0, 0, 0) : disp(st.body));
      this.renderer.setClearColor(forPick ? new THREE.Color(0, 0, 0) : disp(st.background), 1);
      this.renderer.render(this.scene, this.camera);
    }

    pick(ev) {
      const rect = this.canvas.getBoundingClientRect();
      return this.pickNdc(((ev.clientX - rect.left) / rect.width) * 2 - 1, 1 - ((ev.clientY - rect.top) / rect.height) * 2);
    }

    // Structure at a point given in the model slice's normalised coordinates.
    pickNdc(nx, ny) {
      if (!this.entries.length || Math.abs(nx) > 1 || Math.abs(ny) > 1) return null;
      const size = new THREE.Vector2();
      this.renderer.getDrawingBufferSize(size);
      if (!this.pickTarget || this.pickTarget.width !== size.x) {
        if (this.pickTarget) this.pickTarget.dispose();
        this.pickTarget = new THREE.WebGLRenderTarget(size.x, size.y, { stencilBuffer: true });
      }
      this.renderer.setRenderTarget(this.pickTarget);
      this.draw(true);
      const x = Math.min(size.x - 1, Math.floor(((nx + 1) / 2) * size.x));
      const y = Math.min(size.y - 1, Math.floor(((ny + 1) / 2) * size.y));
      const px = new Uint8Array(4);
      this.renderer.readRenderTargetPixels(this.pickTarget, x, y, 1, 1, px);
      this.renderer.setRenderTarget(null);
      if (this.mode === "sim") this.draw();
      const index = (px[0] << 16) | (px[1] << 8) | px[2];
      return index ? this.entries[index - 1].id : null;
    }

    realPick(ev) {
      return this.mode === "ct" ? this.scans.ctPick(ev) : this.mode === "mri" ? this.scans.mriPick(ev) : null;
    }

    hover(ev, real = false) {
      if (this.hoverPending) return;
      this.hoverPending = true;
      requestAnimationFrame(() => {
        this.hoverPending = false;
        const target = real ? this.realCanvas : this.canvas;
        const id = real ? this.realPick(ev) : this.pick(ev);
        if (!id) {
          this.tip.hidden = true;
          target.style.cursor = "";
          return;
        }
        const rect = target.getBoundingClientRect();
        this.tip.textContent = this.viewer.structures.get(id).name;
        this.tip.style.transform = `translate(${ev.clientX - rect.left + 12}px, ${ev.clientY - rect.top + 12}px)`;
        this.tip.hidden = false;
        target.style.cursor = "pointer";
      });
    }

    // Controls that depend on the mode: canvases, dropdown, slider, notes.
    syncControls() {
      const mode = this.mode, el = this.el;
      el.querySelectorAll("[data-mode]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.mode === mode)));
      el.querySelectorAll("[data-plane]").forEach((x) => {
        x.setAttribute("aria-pressed", String(x.dataset.plane === this.planeName));
        x.disabled = mode === "mri" && x.dataset.plane === "sagittal";
      });
      this.canvas.hidden = mode !== "sim";
      this.realCanvas.hidden = mode === "sim";
      const style = el.querySelector("#section-style");
      const options = mode === "mri" && this.scans.m
        ? this.scans.mriList(this.planeName).map((x) => [x.id, `MRI ${x.weighting}`])
        : MODE_OPTIONS[mode] || [];
      const current = mode === "sim" ? this.style : mode === "ct" ? this.scans.window : this.scans.mriSeries[this.planeName];
      style.innerHTML = options.map(([v, t]) => `<option value="${v}"${v === current ? " selected" : ""}>${t}</option>`).join("");
      el.querySelector("#section-level").value = Math.round((mode === "mri" ? this.scans.mriLevel[this.planeName] : this.level) * 1000);
      el.querySelector(".section-check-outlines").hidden = mode === "sim";
      el.querySelector(".section-note").textContent = NOTES[mode];
    }

    // Scale bar and slice caption after drawing.
    chrome() {
      const bar = this.el.querySelector(".scale-bar");
      const caption = this.el.querySelector(".section-caption");
      if (this.mode === "mri") {
        bar.style.width = (this.scans.mriCmCss || 0) + "px";
        caption.textContent = this.scans.mriLabel || "";
      } else {
        const view = this.mode === "ct" && this.scans.view;
        if (view) bar.style.width = (10 / this.scans.m.ct.mmPerPixel) * view.kx * (this.realCanvas.clientWidth / this.realCanvas.width) + "px";
        caption.textContent = this.mode === "ct" && this.scans.view
          ? `Real CT · slice ${this.scans.view.k + 1} of ${this.scans.view.plane.positions.length}`
          : "";
      }
    }
  }

  // Where to pin a structure's label: the centre of its cut for small cuts;
  // for larger ones (rings, U-shapes, both thyroid lobes) the cut point
  // nearest that centre, so the pin always lands on the structure.
  function anchor(cut, cu, cv) {
    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
    for (const [u, v] of cut) {
      minU = Math.min(minU, u); maxU = Math.max(maxU, u);
      minV = Math.min(minV, v); maxV = Math.max(maxV, v);
    }
    if (Math.max(maxU - minU, maxV - minV) < 1) return { u: cu, v: cv };
    let best = cut[0], bd = Infinity;
    for (const q of cut) {
      const d = (q[0] - cu) ** 2 + (q[1] - cv) ** 2;
      if (d < bd) { bd = d; best = q; }
    }
    return { u: best[0], v: best[1] };
  }

  // Andrew's monotone chain.
  function convexHull(points) {
    if (points.length < 3) return points;
    const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower = [], upper = [];
    for (const p of pts) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
      lower.push(p);
    }
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
      upper.push(p);
    }
    return lower.slice(0, -1).concat(upper.slice(0, -1));
  }

  window.ANATOMY.Sections = Sections;
})();
