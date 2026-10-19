// A small Three.js viewer: orbit/zoom/pan, click-to-select, hover labels,
// layer visibility and highlighting. Region models register builder functions
// on window.ANATOMY.models and get the material helpers below.

(function () {
  const V3 = (p) => new THREE.Vector3(p[0], p[1], p[2]);

  // Material recipes per tissue type: wet, slightly glossy soft tissue,
  // matte bone, glossy vessels.
  const TISSUE = {
    bone: { color: 0xd8c9a5, roughness: 0.7, clearcoat: 0.08 },
    muscle: { color: 0xa63c3c, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.35, sheen: 0.6, sheenColor: 0xff9a8f },
    gland: { color: 0xd8a06a, roughness: 0.55, clearcoat: 0.25, clearcoatRoughness: 0.5, sheen: 0.4, sheenColor: 0xffd6a8 },
    duct: { color: 0xf1e2b0, roughness: 0.35, clearcoat: 0.5 },
    artery: { color: 0xc4201f, roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.2 },
    vein: { color: 0x2d4a9e, roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.2 },
    nerve: { color: 0xf0d064, roughness: 0.4, clearcoat: 0.4, sheen: 0.5, sheenColor: 0xfff2c0 },
    node: { color: 0x86ad6a, roughness: 0.5, clearcoat: 0.3 },
    cartilage: { color: 0xe7c3b4, roughness: 0.45, clearcoat: 0.3, sheen: 0.4, sheenColor: 0xffe2d6 },
    // Fascial spaces: translucent volumes around their contents.
    space: { color: 0x7fb8e6, roughness: 0.85, clearcoat: 0 }
  };

  const helpers = {
    V3,

    tissue(kind, opts = {}) {
      const t = TISSUE[kind] || TISSUE.muscle;
      const opacity = opts.opacity ?? 1;
      const m = new THREE.MeshPhysicalMaterial({
        color: opts.color ?? t.color,
        roughness: t.roughness,
        metalness: 0,
        clearcoat: t.clearcoat || 0,
        clearcoatRoughness: t.clearcoatRoughness ?? 0.3,
        transparent: opacity < 1,
        opacity,
        depthWrite: opacity >= 1,
        side: THREE.DoubleSide
      });
      // Sheen takes a number from r133; older builds lack sheenColor.
      if (t.sheen && "sheenColor" in m) {
        m.sheen = t.sheen;
        m.sheenColor.setHex(t.sheenColor);
        m.sheenRoughness = 0.6;
      }
      if (SURFACE[kind]) addSurfaceDetail(m, kind);
      return m;
    },

    // Point muscle fibres along the mesh's longest axis (first principal
    // component of its vertices), which follows the muscle's line of pull.
    setFiberDirection(mesh) {
      const pos = mesh.geometry.attributes.position;
      const mean = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) mean.x += pos.getX(i), mean.y += pos.getY(i), mean.z += pos.getZ(i);
      mean.divideScalar(pos.count);
      const c = [0, 0, 0, 0, 0, 0]; // xx xy xz yy yz zz
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i) - mean.x, y = pos.getY(i) - mean.y, z = pos.getZ(i) - mean.z;
        c[0] += x * x; c[1] += x * y; c[2] += x * z; c[3] += y * y; c[4] += y * z; c[5] += z * z;
      }
      let v = new THREE.Vector3(1, 1, 1).normalize();
      for (let k = 0; k < 30; k++) {
        v = new THREE.Vector3(
          c[0] * v.x + c[1] * v.y + c[2] * v.z,
          c[1] * v.x + c[3] * v.y + c[4] * v.z,
          c[2] * v.x + c[4] * v.y + c[5] * v.z
        ).normalize();
      }
      mesh.material.userData.fiber.copy(v);
    },

    // Decode a region's packed meshes (from tools/export_zanatomy.py) into
    // one entry per structure id, shaded by the model's `look` table.
    fromMeshes(key, look) {
      const { header, data } = window.ANATOMY.meshes[key];
      const bin = Uint8Array.from(atob(data), (c) => c.charCodeAt(0)).buffer;
      const lo = header.min, hi = header.max;
      const scale = [0, 1, 2].map((i) => (hi[i] - lo[i]) / 65535);
      const byId = new Map();
      for (const m of header.meshes) {
        const q = new Int16Array(bin, m.positions, m.vertexCount * 3);
        const pos = new Float32Array(q.length);
        for (let i = 0; i < q.length; i++) {
          const axis = i % 3;
          pos[i] = (q[i] + 32768) * scale[axis] + lo[axis];
        }
        const Index = m.indexType === "u32" ? Uint32Array : Uint16Array;
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setIndex(new THREE.BufferAttribute(new Index(bin, m.indices, m.indexCount), 1));
        geo.computeVertexNormals();
        geo.computeBoundingBox();
        const style = look[m.id] || { kind: "muscle" };
        const mesh = new THREE.Mesh(geo, helpers.tissue(style.kind, style));
        if (style.kind === "muscle") helpers.setFiberDirection(mesh);
        if (!byId.has(m.id)) byId.set(m.id, []);
        byId.get(m.id).push(mesh);
      }
      return [...byId].map(([id, objects]) => ({ id, label: helpers.labelPoint(objects[0]), objects }));
    },

    // A vertex near the middle of the mesh, so labels sit on the structure
    // even for long curved vessels and nerves.
    labelPoint(mesh) {
      const centre = mesh.geometry.boundingBox.getCenter(new THREE.Vector3());
      const pos = mesh.geometry.attributes.position;
      const v = new THREE.Vector3();
      let best = 0, bestD = Infinity;
      for (let i = 0; i < pos.count; i += 3) {
        const d = v.fromBufferAttribute(pos, i).distanceToSquared(centre);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      v.fromBufferAttribute(pos, best);
      return [v.x, v.y, v.z];
    }
  };

  // Procedural surface relief, added to the standard shader as bump mapping
  // from a height field in object space (centimetres): fibre bundles on
  // muscle, lobules on glands, fine grain on bone.
  const SURFACE = {
    muscle: { strength: 0.012, height: "fibers(p)" },
    gland: { strength: 0.03, height: "lobules(p)" },
    bone: { strength: 0.01, height: "vnoise(p * 7.0) * 0.6 + vnoise(p * 19.0) * 0.4" },
    node: { strength: 0.01, height: "vnoise(p * 9.0)" }
  };

  const NOISE_GLSL = `
    varying vec3 vObjPos;
    uniform vec3 uFiber;
    uniform float uBump;
    float hash3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
    float vnoise(vec3 p) {
      vec3 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x), mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
        mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x), mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y),
        f.z);
    }
    // Long thin streaks: high frequency across the fibre, low along it.
    float fibers(vec3 p) {
      float along = dot(p, uFiber);
      vec3 across = p - along * uFiber;
      return vnoise(across * 9.0 + uFiber * along * 0.6) * 0.7 + vnoise(across * 22.0 + uFiber * along * 1.5) * 0.3;
    }
    // Rounded lobules with a little fine texture.
    float lobules(vec3 p) {
      float n = vnoise(p * 4.5);
      return smoothstep(0.25, 0.75, n) * 0.8 + vnoise(p * 14.0) * 0.2;
    }
    vec3 bumpNormal(vec3 surfPos, vec3 surfNorm, float h) {
      vec3 sx = dFdx(surfPos), sy = dFdy(surfPos);
      vec3 r1 = cross(sy, surfNorm), r2 = cross(surfNorm, sx);
      float det = dot(sx, r1);
      vec3 grad = sign(det) * (dFdx(h) * r1 + dFdy(h) * r2);
      return normalize(abs(det) * surfNorm - grad);
    }
  `;

  function addSurfaceDetail(material, kind) {
    const spec = SURFACE[kind];
    material.userData.fiber = new THREE.Vector3(0, 1, 0);
    material.customProgramCacheKey = () => "tissue-" + kind;
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uFiber = { value: material.userData.fiber };
      shader.uniforms.uBump = { value: spec.strength };
      shader.vertexShader = "varying vec3 vObjPos;\n" + shader.vertexShader.replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\n  vObjPos = position;"
      );
      shader.fragmentShader = NOISE_GLSL + shader.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
        {
          vec3 p = vObjPos;
          normal = bumpNormal(-vViewPosition, normal, uBump * (${spec.height}));
        }`
      );
    };
  }

  // A soft studio for image-based lighting: dim walls with a few bright
  // panels, prefiltered into an environment map.
  function studio() {
    const s = new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({ color: 0x4d4844, side: THREE.BackSide })));
    const panel = (x, y, z, w, h, k) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k), side: THREE.DoubleSide }));
      m.position.set(x, y, z);
      m.lookAt(0, 0, 0);
      s.add(m);
    };
    panel(0, 9.5, 0, 12, 12, 5);
    panel(-9.5, 3, 4, 6, 8, 3.5);
    panel(9, 2, -5, 5, 8, 2);
    panel(0, -3, 9.5, 8, 4, 1.2);
    return s;
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
      this.labelMode = "some"; // "off" | "some" (pins and the selected structure) | "all"

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      if ("outputColorSpace" in this.renderer) this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      else this.renderer.outputEncoding = THREE.sRGBEncoding;
      const pmrem = new THREE.PMREMGenerator(this.renderer);
      this.scene.environment = pmrem.fromScene(studio(), 0.04).texture;
      container.appendChild(this.renderer.domElement);

      this.labelLayer = document.createElement("div");
      this.labelLayer.className = "labels";
      container.appendChild(this.labelLayer);

      // Three.js r155+ uses physical light units; older builds need ~1/π the intensity.
      const L = Number(THREE.REVISION) >= 155 ? 1 : 1 / Math.PI;
      this.scene.add(new THREE.HemisphereLight(0xffffff, 0x6b5a50, 0.35 * L));
      const key = new THREE.DirectionalLight(0xfff4e8, 1.5 * L);
      key.position.set(-10, 8, 12);
      this.scene.add(key);
      const fill = new THREE.DirectionalLight(0xe8eeff, 0.4 * L);
      fill.position.set(8, -4, -6);
      this.scene.add(fill);

      this.target = new THREE.Vector3();
      this.spherical = { radius: 24, theta: 1.0, phi: 1.75 };
      this.home = null;

      // Course tracing: pins at named points (foramina, origins, branches),
      // a path line and a tracer that runs along it. Drawn over everything so
      // a nerve can be followed through bone.
      this.landmarks = this.makePinGroup();
      this.coursePins = this.makePinGroup();
      this.trail = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: 0x3fd0ff, depthTest: false, transparent: true, opacity: 0.9 }));
      this.trail.renderOrder = 1001;
      this.trail.visible = false;
      this.tracer = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), new THREE.MeshBasicMaterial({ color: 0x3fd0ff, depthTest: false }));
      this.tracer.renderOrder = 1002;
      this.tracer.visible = false;
      this.scene.add(this.trail, this.tracer);

      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();
      this.bindControls();

      new ResizeObserver(() => this.resize()).observe(container);
      this.resize();
      // Draw only when something changed: the camera (compared each frame)
      // or anything that calls invalidate(). Saves battery on phones.
      this.dirty = true;
      let lastView = "";
      const loop = () => {
        const { radius, theta, phi } = this.spherical;
        const view = [radius, theta, phi, this.target.x, this.target.y, this.target.z].join();
        if (this.dirty || view !== lastView) {
          this.dirty = false;
          lastView = view;
          this.render();
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    load(region, model) {
      this.clearCourse();
      this.setPins(this.landmarks, []);
      for (const s of this.structures.values()) {
        this.scene.remove(s.root);
        s.label.remove();
        s.root.traverse((o) => {
          if (o.isMesh) {
            o.geometry.dispose();
            o.material.dispose();
          }
        });
      }
      this.structures.clear();
      this.layerVisible = {};
      this.focusIds = new Set();
      this.selectedId = null;
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

    invalidate() {
      this.dirty = true;
    }

    refresh() {
      this.dirty = true;
      const dimOthers = this.focusIds.size > 0 || this.selectedId;
      for (const [id, s] of this.structures) {
        s.root.visible = !!this.layerVisible[s.layer];
        const highlighted = id === this.selectedId || this.focusIds.has(id);
        s.root.traverse((o) => {
          if (!o.isMesh) return;
          const m = o.material;
          if (highlighted) m.emissive.copy(m.color).multiplyScalar(0.35);
          else m.emissive.setHex(0x000000);
          let opacity = o.userData.baseOpacity;
          if (dimOthers && !highlighted && s.layer !== "bone") opacity = Math.min(opacity, 0.2);
          if (dimOthers && !highlighted && s.layer === "bone") opacity = Math.min(opacity, 0.4);
          m.opacity = opacity;
          m.transparent = opacity < 1;
          m.depthWrite = opacity >= 1;
        });
        s.label.classList.toggle("is-hidden", !s.root.visible || this.labelMode === "off" || (this.labelMode === "some" && !highlighted));
        s.label.classList.toggle("is-active", highlighted);
      }
      if (this.onRefresh) this.onRefresh();
    }

    resetView() {
      this.stopFly();
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
      this.dirty = true;
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
      for (const g of [this.landmarks, this.coursePins]) {
        for (const pin of g.pins) {
          v.copy(pin.mesh.position).project(this.camera);
          const show = pin.mesh.visible && g.group.visible && v.z <= 1 && this.labelMode !== "off";
          pin.label.style.display = show ? "" : "none";
          if (show) pin.label.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(8px, -50%)`;
        }
      }
      for (const s of this.structures.values()) {
        if (s.label.classList.contains("is-hidden")) continue;
        v.copy(s.anchor).project(this.camera);
        const behind = v.z > 1;
        s.label.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, -100%)`;
        s.label.style.opacity = behind ? 0 : "";
      }
    }

    // ---------- course tracing ----------

    makePinGroup() {
      const group = new THREE.Group();
      group.renderOrder = 1000;
      this.scene.add(group);
      return { group, pins: [] };
    }

    // pins: [{ p: [x, y, z], label, kind }]; kind "foramen" pins are smaller and paler.
    setPins(g, pins) {
      for (const pin of g.pins) {
        g.group.remove(pin.mesh);
        pin.mesh.geometry.dispose();
        pin.mesh.material.dispose();
        pin.label.remove();
      }
      g.pins = pins.map((q) => {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(q.kind === "foramen" ? 0.11 : 0.14, 16, 12),
          new THREE.MeshBasicMaterial({ color: q.kind === "foramen" ? 0xffe08a : 0xffc23d, depthTest: false })
        );
        mesh.renderOrder = 1000;
        mesh.position.set(...q.p);
        g.group.add(mesh);
        const label = document.createElement("span");
        label.className = "pin-label" + (q.kind === "foramen" ? " is-foramen" : "");
        label.textContent = q.label;
        this.labelLayer.appendChild(label);
        return { mesh, label, p: mesh.position };
      });
      this.dirty = true;
    }

    setLandmarks(pins) {
      this.setPins(this.landmarks, pins.map((q) => ({ ...q, kind: "foramen" })));
    }

    // Show a structure's course: the whole path as a line and every waypoint pinned.
    showCourse(path, pins) {
      this.stopTrace();
      this.setPins(this.coursePins, pins);
      this.curve = path && path.length > 1 ? new THREE.CatmullRomCurve3(path.map((q) => new THREE.Vector3(...q))) : null;
      if (this.curve) {
        // A thin tube along the path; its index buffer runs along the path,
        // so drawing a prefix of it draws the path up to the tracer.
        this.trailSegments = Math.max(60, Math.round(this.curve.getLength() * 20));
        this.trail.geometry.dispose();
        this.trail.geometry = new THREE.TubeGeometry(this.curve, this.trailSegments, 0.05, 6, false);
        this.trailCount = this.trail.geometry.index.count;
        this.trail.geometry.setDrawRange(0, this.trailCount);
        this.trail.material.opacity = 0.55;
        // Where along the path each pin sits, for revealing them during a trace.
        const samples = this.curve.getSpacedPoints(200);
        for (const pin of this.coursePins.pins) {
          let best = 0, bd = Infinity;
          samples.forEach((q, i) => { const d = q.distanceToSquared(pin.p); if (d < bd) { bd = d; best = i; } });
          pin.t = best / 200;
        }
      }
      this.trail.visible = !!this.curve;
      // Foramen pins would crowd the course's own pins; hide them meanwhile.
      this.landmarks.group.visible = !this.curve && pins.length < 2;
      this.dirty = true;
    }

    // Move the camera so the whole course is in view.
    frameCourse() {
      if (!this.curve) return;
      const box = new THREE.Box3().setFromPoints(this.curve.getSpacedPoints(50));
      const size = box.getSize(new THREE.Vector3()).length();
      this.flyTo(box.getCenter(new THREE.Vector3()).toArray(), Math.max(10, size * 2.4));
    }

    clearCourse() {
      this.stopTrace();
      this.setPins(this.coursePins, []);
      this.curve = null;
      this.trail.visible = false;
      this.landmarks.group.visible = true;
      this.dirty = true;
    }

    // Run a tracer along the course from its start, drawing the path and
    // revealing each pin as it is reached.
    trace(onPin) {
      if (!this.curve) return;
      this.stopTrace();
      const length = this.curve.getLength();
      const duration = Math.min(8000, Math.max(3000, length * 450));
      const start = performance.now();
      const reached = new Set();
      for (const pin of this.coursePins.pins) pin.mesh.visible = false;
      this.tracer.visible = true;
      this.trail.material.opacity = 0.95;
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        this.tracer.position.copy(this.curve.getPointAt(t));
        this.trail.geometry.setDrawRange(0, Math.round(t * this.trailSegments) * 36);
        this.coursePins.pins.forEach((pin, i) => {
          if (!reached.has(i) && pin.t <= t + 0.005) {
            reached.add(i);
            pin.mesh.visible = true;
            if (onPin) onPin(i);
          }
        });
        this.dirty = true;
        if (t < 1) this.traceFrame = requestAnimationFrame(step);
        else this.traceFrame = null;
      };
      this.traceFrame = requestAnimationFrame(step);
    }

    stopTrace() {
      if (this.traceFrame) cancelAnimationFrame(this.traceFrame);
      this.traceFrame = null;
      this.tracer.visible = false;
      for (const pin of this.coursePins.pins) pin.mesh.visible = true;
      if (this.curve) {
        this.trail.geometry.setDrawRange(0, this.trailCount);
        this.trail.material.opacity = 0.55;
      }
      this.dirty = true;
    }

    // Glide the camera's target to a point and close in on it.
    flyTo(p, radius) {
      this.stopFly();
      const from = this.target.clone(), to = new THREE.Vector3(...p);
      const r0 = this.spherical.radius, r1 = radius || Math.min(r0, 12);
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / 600), e = t * t * (3 - 2 * t);
        this.target.lerpVectors(from, to, e);
        this.spherical.radius = r0 + (r1 - r0) * e;
        this.flyFrame = t < 1 ? requestAnimationFrame(step) : null;
      };
      this.flyFrame = requestAnimationFrame(step);
    }

    // Cancel a camera glide (a new one, a region change or the user grabbing the view).
    stopFly() {
      if (this.flyFrame) cancelAnimationFrame(this.flyFrame);
      this.flyFrame = null;
    }

    pick(clientX, clientY) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const meshes = [];
      for (const s of this.structures.values()) if (s.root.visible) s.root.traverse((o) => o.isMesh && meshes.push(o));
      // Ignore hits on geometry cut away by the section's clipping planes.
      const hits = this.raycaster.intersectObjects(meshes, false).filter((h) =>
        !(h.object.material.clippingPlanes || []).some((pl) => pl.distanceToPoint(h.point) < 0));
      // Prefer small structures (nerves, vessels) over the translucent sheets and
      // spaces around them: skip one when something solid lies just behind it.
      const sheet = (h) => ["spaces", "fascia"].includes(this.structures.get(h.object.userData.id).layer) ||
        h.object.userData.baseOpacity < 0.5;
      for (let i = 0; i < hits.length; i++) {
        if (sheet(hits[i]) && hits.slice(i + 1).some((h) => !sheet(h) && h.distance - hits[i].distance < 4)) continue;
        return hits[i].object.userData.id;
      }
      return null;
    }

    bindControls() {
      const el = this.renderer.domElement;
      el.style.touchAction = "none";
      const pointers = new Map();
      let mode = null, last = null, downAt = null, pinchStart = 0, radiusStart = 0;

      el.addEventListener("pointerdown", (e) => {
        this.stopFly();
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
