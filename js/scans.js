// Real CT and MRI of the Visible Human male (U.S. National Library of
// Medicine), the same body the 3D models were built from.
//
// CT: matched to the model through a rigid registration of the model's bones
// to the CT skeleton (tools/export_vhp_scans.py). The real slice is chosen
// and framed to match the current model slice; outlines and hover names come
// from the registered model.
// MRI: browsed on its own (separate scan, not registered to the model).

(function () {
  const OUTLINE = "#3fb0e0";

  class RealScans {
    constructor(sections, canvas, loadScript) {
      this.s = sections;
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.loadScript = loadScript;
      this.images = new Map();
      this.window = "soft";
      this.showOutlines = false;
      this.mriSeries = { axial: "t2_axial", coronal: "t2_coronal" };
      this.mriLevel = { axial: 0.1, coronal: 0.75 };
      this.ready = null;
    }

    load() {
      if (!this.ready) this.ready = this.loadScript("data/scans/vhp-scans.js").then(() => (this.m = window.ANATOMY.scans));
      return this.ready;
    }

    image(file) {
      let img = this.images.get(file);
      if (!img) {
        img = new Image();
        img.onload = () => this.s.update();
        img.src = "data/scans/" + file;
        this.images.set(file, img);
      }
      return img.complete && img.naturalWidth ? img : null;
    }

    // ---------- coordinates ----------

    // The region's own refined registration if there is one, else the global fit.
    reg() {
      return (this.m.regions || {})[this.s.regionId] || this.m.registration;
    }

    // App space (cm, region-centred, y up, z anterior) <-> Z-Anatomy world
    // (mm, x left, y posterior, z superior) <-> CT patient space (mm, LPS).

    appToCt(p) {
      const c = this.s.meshCentre;
      const w = [(p.x / 100 + c[0]) * 1000, (c[1] - p.z / 100) * 1000, (c[2] + p.y / 100) * 1000];
      const { R, t } = this.reg();
      return [0, 1, 2].map((i) => R[i][0] * w[0] + R[i][1] * w[1] + R[i][2] * w[2] + t[i]);
    }

    ctToApp(q) {
      const { R, t } = this.reg();
      const d = [q[0] - t[0], q[1] - t[1], q[2] - t[2]];
      const w = [0, 1, 2].map((i) => R[0][i] * d[0] + R[1][i] * d[1] + R[2][i] * d[2]); // R transposed
      const c = this.s.meshCentre;
      return new THREE.Vector3((w[0] / 1000 - c[0]) * 100, (w[2] / 1000 - c[2]) * 100, -(w[1] / 1000 - c[1]) * 100);
    }

    // CT mm -> pixel in the plane's 1 mm images, and back.
    toPixel(q, frame) {
      const pick = (axis) => ({ x: q[0], y: q[1], "-z": -q[2] })[axis];
      const sign = (axis) => (axis === "-z" ? -1 : 1);
      return [pick(frame.uAxis) - frame.u0, pick(frame.vAxis) - sign(frame.vAxis) * frame.v0];
    }

    fromPixel(px, py, plane, position) {
      const f = plane.frame;
      const q = { x: null, y: null, z: null };
      const set = (axis, value, origin) => {
        if (axis === "-z") q.z = origin - value;
        else q[axis] = value + origin;
      };
      set(f.uAxis, px, f.u0);
      set(f.vAxis, py, f.v0);
      q[plane.axis] = position;
      return [q.x, q.y, q.z];
    }

    // ---------- CT ----------

    // The CT slice nearest the model slice, framed on the body.
    ctView() {
      const s = this.s, plane = this.m.ct.planes[s.planeName];
      const q = this.appToCt(s.centre);
      const value = { x: q[0], y: q[1], z: q[2] }[plane.axis];
      let k = 0;
      plane.positions.forEach((p, i) => {
        if (Math.abs(p - value) < Math.abs(plane.positions[k] - value)) k = i;
      });
      const outside = Math.abs(plane.positions[k] - value) > 3;
      // Frame the whole body on this slice (box recorded by
      // tools/add_ct_body_boxes.py), square and with a margin, so the complete
      // cross-section is always in view. The tiles are already in radiological
      // orientation, so screen axes follow tile axes.
      const { tile } = this.m.ct;
      const b = (plane.body && plane.body[k]) || [0, 0, tile, tile];
      const size = Math.min(tile, Math.max(b[2] - b[0], b[3] - b[1]) * 1.12 + 8);
      const cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2;
      const sx = cx - size / 2, sy = cy - size / 2;
      const W = this.canvas.width;
      return { plane, k, outside, sx, sy, kx: W / size, ky: W / size };
    }

    drawCt() {
      const ctx = this.ctx, W = this.canvas.width, H = this.canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      const v = this.ctView();
      if (v.outside) return this.message("This level is outside the scanned range");
      const { tile, grid } = this.m.ct, per = grid * grid;
      const img = this.image(v.plane.files[this.window][Math.floor(v.k / per)]);
      if (!img) return this.message("Loading scan…");
      const n = v.k % per;
      ctx.save();
      ctx.setTransform(v.kx, 0, 0, v.ky, -v.sx * v.kx, -v.sy * v.ky);
      ctx.beginPath();
      ctx.rect(0, 0, tile, tile);
      ctx.clip();
      ctx.drawImage(img, (n % grid) * tile, Math.floor(n / grid) * tile, tile, tile, 0, 0, tile, tile);
      ctx.restore();
      this.drawOutlines(v);
      this.view = v;
    }

    // Cut outlines from the registered model, projected onto the real slice.
    drawOutlines(v) {
      const s = this.s, ctx = this.ctx, viewer = s.viewer;
      const { right, up } = s.basis;
      const p = new THREE.Vector3();
      for (const e of s.entries) {
        if (!e.visible || !e.cut || !e.cut.length) continue;
        const highlighted = e.id === viewer.selectedId || viewer.focusIds.has(e.id);
        if (!highlighted && !this.showOutlines) continue;
        ctx.fillStyle = highlighted ? OUTLINE : "#" + e.anatomyColor.getHexString();
        ctx.globalAlpha = highlighted ? 1 : 0.55;
        const step = Math.max(1, Math.floor(e.cut.length / 1500));
        for (let i = 0; i < e.cut.length; i += step) {
          const [u, vv] = e.cut[i];
          p.copy(s.centre).addScaledVector(right, u).addScaledVector(up, vv);
          const [px, py] = this.toPixel(this.appToCt(p), v.plane.frame);
          ctx.fillRect((px - v.sx) * v.kx - 1.5, (py - v.sy) * v.ky - 1.5, 3, 3);
        }
      }
      ctx.globalAlpha = 1;
    }

    // Structure under a point of the real CT, via the registered model.
    ctPick(ev) {
      const v = this.view;
      if (!v) return null;
      const r = this.canvas.getBoundingClientRect();
      const cx = ((ev.clientX - r.left) / r.width) * this.canvas.width;
      const cy = ((ev.clientY - r.top) / r.height) * this.canvas.height;
      const q = this.fromPixel(v.sx + cx / v.kx, v.sy + cy / v.ky, v.plane, v.plane.positions[v.k]);
      const ndc = this.ctToApp(q).project(this.s.camera);
      return this.s.pickNdc(ndc.x, ndc.y);
    }

    // ---------- MRI ----------

    mriList(plane) {
      return this.m.mri.series.filter((x) => x.plane === plane);
    }

    drawMri() {
      const s = this.s, ctx = this.ctx, W = this.canvas.width, H = this.canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      const series = this.m.mri.series.find((x) => x.id === this.mriSeries[s.planeName]);
      if (!series) return this.message("No MRI in this plane");
      const k = Math.round(this.mriLevel[s.planeName] * (series.count - 1));
      const per = this.m.mri.grid * this.m.mri.grid;
      const img = this.image(series.files[Math.floor(k / per)]);
      if (!img) return this.message("Loading scan…");
      const n = k % per, g = this.m.mri.grid, T = series.tile;
      ctx.drawImage(img, (n % g) * T, Math.floor(n / g) * T, T, T, 0, 0, W, H);
      this.mriCmCss = (10 / series.mmPerPixel) * (this.canvas.clientWidth / T);
      this.mriLabel = `Slice ${k + 1} of ${series.count} · ${series.thickness} mm`;
    }

    message(text) {
      const ctx = this.ctx;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#9a9a9a";
      ctx.font = `${Math.round(this.canvas.width / 28)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
      this.view = null;
    }
  }

  window.ANATOMY.RealScans = RealScans;
})();
