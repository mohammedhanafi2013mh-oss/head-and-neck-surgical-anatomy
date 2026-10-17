// A small Three.js viewer: orbit/zoom/pan, click-to-select, hover labels,
// layer visibility and highlighting. Region models register builder functions
// on window.ANATOMY.models and get the geometry helpers below.

(function () {
  const V3 = (p) => new THREE.Vector3(p[0], p[1], p[2]);

  // ---------- geometry helpers ----------
  const helpers = {
    V3,

    material(color, opts = {}) {
      return new THREE.MeshStandardMaterial({
        color,
        roughness: opts.roughness ?? 0.55,
        metalness: 0,
        transparent: opts.opacity !== undefined && opts.opacity < 1,
        opacity: opts.opacity ?? 1,
        side: opts.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
        depthWrite: opts.opacity === undefined || opts.opacity >= 1
      });
    },

    // Smooth tube through points; radius may be a number or [start, end].
    tube(points, radius, material, segments = 64) {
      const curve = new THREE.CatmullRomCurve3(points.map(V3), false, "centripetal");
      const r0 = Array.isArray(radius) ? radius[0] : radius;
      const r1 = Array.isArray(radius) ? radius[1] : radius;
      const geo = new THREE.TubeGeometry(curve, segments, 1, 12, false);
      if (r0 !== 1 || r1 !== 1) taperTube(geo, curve, segments, r0, r1);
      const group = new THREE.Group();
      group.add(new THREE.Mesh(geo, material));
      // Round the ends.
      for (const [t, r] of [[0, r0], [1, r1]]) {
        const cap = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), material);
        cap.position.copy(curve.getPoint(t));
        group.add(cap);
      }
      group.userData.curve = curve;
      return group;
    },

    // Surface between two polylines (same direction), with optional bulge
    // along a fixed direction that peaks halfway between the edges.
    sheet(edgeA, edgeB, material, opts = {}) {
      const a = new THREE.CatmullRomCurve3(edgeA.map(V3));
      const b = new THREE.CatmullRomCurve3(edgeB.map(V3));
      const nu = opts.nu ?? 24, nv = opts.nv ?? 12;
      const bulge = opts.bulge ? V3(opts.bulge) : null;
      const pos = [];
      const idx = [];
      for (let i = 0; i <= nu; i++) {
        const pa = a.getPoint(i / nu), pb = b.getPoint(i / nu);
        for (let j = 0; j <= nv; j++) {
          const t = j / nv;
          const p = pa.clone().lerp(pb, t);
          if (bulge) p.addScaledVector(bulge, Math.sin(Math.PI * t) * Math.sin(Math.PI * (0.15 + 0.7 * i / nu)));
          pos.push(p.x, p.y, p.z);
        }
      }
      for (let i = 0; i < nu; i++) {
        for (let j = 0; j < nv; j++) {
          const k = i * (nv + 1) + j;
          idx.push(k, k + nv + 1, k + 1, k + 1, k + nv + 1, k + nv + 2);
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      geo.setIndex(idx);
      geo.computeVertexNormals();
      return new THREE.Mesh(geo, material);
    },

    ellipsoid(center, radii, material, rotation = [0, 0, 0]) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), material);
      m.position.copy(V3(center));
      m.scale.set(radii[0], radii[1], radii[2]);
      m.rotation.set(rotation[0], rotation[1], rotation[2]);
      return m;
    },

    // Sweep a rectangle along a polyline. The rectangle spans `height` along
    // `up` and `thickness` across (tangent x up), centred on the path.
    plate(points, up, height, thickness, material, samples = 80) {
      const curve = new THREE.CatmullRomCurve3(points.map(V3));
      const upV = V3(up).normalize();
      const pos = [];
      const idx = [];
      for (let i = 0; i <= samples; i++) {
        const p = curve.getPoint(i / samples);
        const tan = curve.getTangent(i / samples);
        const side = new THREE.Vector3().crossVectors(tan, upV).normalize().multiplyScalar(thickness / 2);
        const h = typeof height === "function" ? height(i / samples) : height;
        const top = upV.clone().multiplyScalar(h);
        const c = [
          p.clone().add(side),
          p.clone().sub(side),
          p.clone().sub(side).add(top),
          p.clone().add(side).add(top)
        ];
        for (const v of c) pos.push(v.x, v.y, v.z);
      }
      for (let i = 0; i < samples; i++) {
        for (let f = 0; f < 4; f++) {
          const a = i * 4 + f, b = i * 4 + ((f + 1) % 4);
          const c = a + 4, d = b + 4;
          idx.push(a, c, b, b, c, d);
        }
      }
      // End caps.
      const last = samples * 4;
      idx.push(0, 1, 2, 0, 2, 3, last, last + 2, last + 1, last, last + 3, last + 2);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      geo.setIndex(idx);
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, material);
      material.side = THREE.DoubleSide;
      return mesh;
    }
  };

  function taperTube(geo, curve, segments, r0, r1) {
    const pos = geo.attributes.position;
    const radial = 13; // radialSegments + 1
    const v = new THREE.Vector3();
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const c = curve.getPointAt(t);
      const r = r0 + (r1 - r0) * t;
      for (let j = 0; j < radial; j++) {
        const k = i * radial + j;
        v.fromBufferAttribute(pos, k).sub(c).multiplyScalar(r).add(c);
        pos.setXYZ(k, v.x, v.y, v.z);
      }
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }

  // ---------- viewer ----------
  class Viewer {
    constructor(container, opts) {
      this.container = container;
      this.onSelect = opts.onSelect || (() => {});
      this.structures = new Map(); // id -> { root, layer, label, name }
      this.layerVisible = {};
      this.focusIds = new Set();
      this.selectedId = null;
      this.showAllLabels = false;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(this.renderer.domElement);

      this.labelLayer = document.createElement("div");
      this.labelLayer.className = "labels";
      container.appendChild(this.labelLayer);

      // Three.js r155+ uses physical light units; older builds need ~1/π the intensity.
      const L = Number(THREE.REVISION) >= 155 ? 1 : 1 / Math.PI;
      this.scene.add(new THREE.HemisphereLight(0xffffff, 0x6b5a50, 1.1 * L));
      const key = new THREE.DirectionalLight(0xffffff, 1.6 * L);
      key.position.set(10, 8, 12);
      this.scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.5 * L);
      fill.position.set(-8, -4, -6);
      this.scene.add(fill);

      this.target = new THREE.Vector3();
      this.spherical = { radius: 24, theta: 1.0, phi: 1.75 };
      this.home = null;

      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();
      this.bindControls();

      new ResizeObserver(() => this.resize()).observe(container);
      this.resize();
      const loop = () => {
        this.render();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    load(region, model) {
      for (const s of this.structures.values()) this.scene.remove(s.root);
      this.structures.clear();
      const meta = Object.fromEntries(region.structures.map((s) => [s.id, s]));
      const built = model.build(THREE, helpers);
      for (const item of built) {
        const info = meta[item.id];
        if (!info) continue;
        const root = new THREE.Group();
        for (const obj of item.objects) root.add(obj);
        root.traverse((o) => {
          if (o.isMesh) {
            o.userData.id = item.id;
            o.userData.baseOpacity = o.material.opacity;
            o.userData.baseTransparent = o.material.transparent;
            o.material = o.material.clone();
          }
        });
        this.scene.add(root);
        const label = document.createElement("button");
        label.className = "label";
        label.textContent = info.name;
        label.addEventListener("click", () => this.select(item.id, true));
        this.labelLayer.appendChild(label);
        this.structures.set(item.id, {
          root,
          layer: info.layer,
          name: info.name,
          label,
          anchor: V3(item.label)
        });
      }
      for (const l of region.layers) this.layerVisible[l.id] = l.defaultOn;
      this.home = model.camera;
      this.resetView();
      this.refresh();
    }

    setLayer(id, on) {
      this.layerVisible[id] = on;
      this.refresh();
    }

    setLayers(ids) {
      for (const k of Object.keys(this.layerVisible)) this.layerVisible[k] = ids.includes(k);
      this.refresh();
    }

    setFocus(ids) {
      this.focusIds = new Set(ids || []);
      this.refresh();
    }

    select(id, notify) {
      this.selectedId = id;
      if (id) {
        const s = this.structures.get(id);
        if (s && !this.layerVisible[s.layer]) {
          this.layerVisible[s.layer] = true;
          this.onLayerForced && this.onLayerForced(s.layer);
        }
      }
      this.refresh();
      if (notify) this.onSelect(id);
    }

    refresh() {
      const dimOthers = this.focusIds.size > 0 || this.selectedId;
      for (const [id, s] of this.structures) {
        s.root.visible = !!this.layerVisible[s.layer];
        const highlighted = id === this.selectedId || this.focusIds.has(id);
        s.root.traverse((o) => {
          if (!o.isMesh) return;
          const m = o.material;
          m.emissive.setHex(highlighted ? 0x3a3a10 : 0x000000);
          let opacity = o.userData.baseOpacity;
          if (dimOthers && !highlighted && s.layer !== "bone") opacity = Math.min(opacity, 0.35);
          if (dimOthers && !highlighted && s.layer === "bone") opacity = Math.min(opacity, 0.6);
          m.opacity = opacity;
          m.transparent = opacity < 1;
          m.depthWrite = opacity >= 1;
        });
        s.label.classList.toggle("is-hidden", !s.root.visible || !(this.showAllLabels || highlighted));
        s.label.classList.toggle("is-active", highlighted);
      }
    }

    resetView() {
      const h = this.home || { target: [0, 0, 0], radius: 24, theta: 1, phi: 1.7 };
      this.target.copy(V3(h.target));
      Object.assign(this.spherical, { radius: h.radius, theta: h.theta, phi: h.phi });
    }

    setView(theta, phi) {
      this.spherical.theta = theta;
      this.spherical.phi = phi;
    }

    resize() {
      const w = this.container.clientWidth, h = this.container.clientHeight;
      if (!w || !h) return;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }

    render() {
      const { radius, theta, phi } = this.spherical;
      this.camera.position.set(
        this.target.x + radius * Math.sin(phi) * Math.sin(theta),
        this.target.y + radius * Math.cos(phi),
        this.target.z + radius * Math.sin(phi) * Math.cos(theta)
      );
      this.camera.lookAt(this.target);
      this.renderer.render(this.scene, this.camera);
      this.positionLabels();
    }

    positionLabels() {
      const w = this.container.clientWidth, h = this.container.clientHeight;
      const v = new THREE.Vector3();
      for (const s of this.structures.values()) {
        if (s.label.classList.contains("is-hidden")) continue;
        v.copy(s.anchor).project(this.camera);
        const behind = v.z > 1;
        s.label.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, -100%)`;
        s.label.style.opacity = behind ? 0 : "";
      }
    }

    pick(clientX, clientY) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const meshes = [];
      for (const s of this.structures.values()) if (s.root.visible) s.root.traverse((o) => o.isMesh && meshes.push(o));
      const hits = this.raycaster.intersectObjects(meshes, false);
      // Prefer small structures (nerves, vessels) over sheets they sit on:
      // take the first hit unless a nearby second hit is a non-sheet.
      for (const hit of hits) {
        const id = hit.object.userData.id;
        const s = this.structures.get(id);
        if (s.layer === "superficial" && hits.length > 1) continue;
        return id;
      }
      return null;
    }

    bindControls() {
      const el = this.renderer.domElement;
      el.style.touchAction = "none";
      const pointers = new Map();
      let mode = null, last = null, downAt = null, pinchStart = 0, radiusStart = 0;

      el.addEventListener("pointerdown", (e) => {
        el.setPointerCapture(e.pointerId);
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        downAt = { x: e.clientX, y: e.clientY, t: performance.now() };
        if (pointers.size === 2) {
          const [a, b] = [...pointers.values()];
          pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
          radiusStart = this.spherical.radius;
          mode = "pinch";
        } else {
          mode = e.button === 2 || e.shiftKey ? "pan" : "rotate";
        }
        last = { x: e.clientX, y: e.clientY };
      });

      el.addEventListener("pointermove", (e) => {
        if (!pointers.has(e.pointerId)) {
          this.hover(e);
          return;
        }
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (mode === "pinch" && pointers.size === 2) {
          const [a, b] = [...pointers.values()];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          this.spherical.radius = clamp(radiusStart * (pinchStart / d), 6, 60);
          return;
        }
        const dx = e.clientX - last.x, dy = e.clientY - last.y;
        last = { x: e.clientX, y: e.clientY };
        if (mode === "rotate") {
          this.spherical.theta -= dx * 0.008;
          this.spherical.phi = clamp(this.spherical.phi - dy * 0.008, 0.1, Math.PI - 0.1);
        } else if (mode === "pan") {
          const scale = this.spherical.radius * 0.0015;
          const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix, 0);
          const up = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix, 1);
          this.target.addScaledVector(right, -dx * scale).addScaledVector(up, dy * scale);
        }
      });

      const end = (e) => {
        pointers.delete(e.pointerId);
        if (downAt && pointers.size === 0) {
          const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
          if (moved < 6 && performance.now() - downAt.t < 500) {
            this.select(this.pick(e.clientX, e.clientY), true);
          }
        }
        if (pointers.size === 0) mode = null;
        downAt = null;
      };
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
      el.addEventListener("contextmenu", (e) => e.preventDefault());
      el.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          this.spherical.radius = clamp(this.spherical.radius * Math.exp(e.deltaY * 0.001), 6, 60);
        },
        { passive: false }
      );

      this.tooltip = document.createElement("div");
      this.tooltip.className = "tooltip";
      this.container.appendChild(this.tooltip);
      el.addEventListener("pointerleave", () => (this.tooltip.style.opacity = 0));
    }

    hover(e) {
      if (e.pointerType !== "mouse") return;
      const id = this.pick(e.clientX, e.clientY);
      const rect = this.container.getBoundingClientRect();
      if (id) {
        this.tooltip.textContent = this.structures.get(id).name;
        this.tooltip.style.transform = `translate(${e.clientX - rect.left + 14}px, ${e.clientY - rect.top + 14}px)`;
        this.tooltip.style.opacity = 1;
        this.renderer.domElement.style.cursor = "pointer";
      } else {
        this.tooltip.style.opacity = 0;
        this.renderer.domElement.style.cursor = "";
      }
    }
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  window.ANATOMY = window.ANATOMY || { regions: {} };
  window.ANATOMY.models = window.ANATOMY.models || {};
  window.ANATOMY.Viewer = Viewer;
})();
