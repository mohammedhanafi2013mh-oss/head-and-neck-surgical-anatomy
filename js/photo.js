// Path-traced "Render" of the current view (three-gpu-pathtracer, MIT):
// light is traced bouncing between the structures, so shadows are soft,
// crevices darken by themselves and wet surfaces reflect a studio of soft
// boxes. The image refines while it stays on screen; moving the model starts
// it again. The libraries load only the first time a render is asked for.

(function () {
  const LIBS = ["vendor/three-mesh-bvh.js", "vendor/three-gpu-pathtracer.js"];
  let loading = null;

  // three-gpu-pathtracer's browser build takes FullScreenQuad from the global
  // THREE (it lives in three's examples, not in three.min.js): the same
  // class, from three/examples/jsm/postprocessing/Pass.js. It also reads
  // the scene's background and environment rotations, added in three r162.
  function shimThree() {
    for (const k of ["backgroundRotation", "environmentRotation"]) {
      if (k in THREE.Scene.prototype || k in new THREE.Scene()) continue;
      Object.defineProperty(THREE.Scene.prototype, k, {
        get() { return this["_" + k] || (this["_" + k] = new THREE.Euler()); },
        set(v) { this["_" + k] = v; },
        configurable: true
      });
    }
    if (THREE.FullScreenQuad) return;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
    THREE.FullScreenQuad = class {
      constructor(material) { this._mesh = new THREE.Mesh(geometry, material); }
      dispose() {}
      render(renderer) { renderer.render(this._mesh, camera); }
      get material() { return this._mesh.material; }
      set material(m) { this._mesh.material = m; }
    };
  }

  function load() {
    if (loading) return loading;
    shimThree();
    loading = LIBS.reduce((p, src) => p.then(() => new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Could not load " + src));
      document.head.appendChild(s);
    })), Promise.resolve());
    return loading;
  }

  // A photographic studio as an environment, in the camera's frame so it turns
  // with the view: a large soft box above and to the left, a smaller fill on
  // the right, a rim light behind, dim warm walls and a floor bounce.
  function studio() {
    const tex = new ThreePathTracer.ProceduralEquirectTexture(256, 128);
    const d = new THREE.Vector3();
    const boxes = [
      [new THREE.Vector3(-0.45, 0.65, 0.6).normalize(), 0.8, new THREE.Color(7.5, 7.1, 6.6)],
      [new THREE.Vector3(0.75, 0.15, 0.6).normalize(), 0.88, new THREE.Color(1.6, 1.75, 1.95)],
      [new THREE.Vector3(0.2, 0.5, -0.85).normalize(), 0.9, new THREE.Color(2.6, 2.6, 2.7)]
    ];
    tex.generationCallback = (polar, uv, coord, color) => {
      d.setFromSpherical(polar);
      const up = d.y * 0.5 + 0.5;
      color.setRGB(0.16 + 0.12 * up, 0.15 + 0.11 * up, 0.14 + 0.1 * up); // dim walls, lighter above
      for (const [dir, cos, c] of boxes) {
        const k = d.dot(dir);
        if (k > cos) color.lerp(c, Math.min(1, (k - cos) / 0.04)); // soft-edged panel
      }
    };
    tex.update();
    return tex;
  }

  class Photo {
    constructor(viewer, onProgress) {
      this.viewer = viewer;
      this.onProgress = onProgress;
      this.restore = [];
    }

    async start() {
      await load();
      const v = this.viewer;
      // Only what is on screen: visible structures, without pins, labels or traces.
      const scene = new THREE.Scene();
      for (const s of v.structures.values()) {
        if (!s.root.visible) continue;
        const copy = s.root.clone(true);
        copy.traverse((o) => {
          if (!o.isMesh || !o.material) return;
          // Baked occlusion would darken twice: path tracing finds it by itself.
          if (o.material.vertexColors) {
            this.restore.push(o.material);
            o.material.vertexColors = false;
          }
        });
        scene.add(copy);
      }
      scene.environment = this.env = studio();
      this.scene = scene;

      const pt = new ThreePathTracer.WebGLPathTracer(v.renderer);
      pt.bounces = 6;
      pt.filterGlossyFactor = 0.5;
      pt.minSamples = 1;
      pt.renderDelay = 0;
      pt.fadeDuration = 300;
      pt.tiles.set(2, 2);
      pt.renderScale = Math.min(1, 1.5 / Math.max(1, window.devicePixelRatio)); // phones: fewer pixels, faster
      pt.setScene(scene, v.camera);
      this.pt = pt;
      this.lastView = "";
      v.labelLayer.hidden = true;
      v.renderHook = () => this.frame();
    }

    frame() {
      const v = this.viewer, pt = this.pt;
      const { radius, theta, phi } = v.spherical;
      const view = [radius, theta, phi, v.target.x, v.target.y, v.target.z, v.renderer.domElement.width].join();
      v.render(true); // places the camera; draws nothing
      if (view !== this.lastView) {
        this.lastView = view;
        this.scene.environmentRotation.copy(v.camera.rotation);
        pt.updateCamera();
        pt.updateEnvironment();
      }
      pt.renderSample();
      this.onProgress(Math.floor(pt.samples));
      if (this.saveAs) {
        const name = this.saveAs;
        this.saveAs = null;
        this.download(name);
      }
    }

    // Save the image as it stands, on the page's background colour.
    download(name) {
      const src = this.viewer.renderer.domElement;
      const c = document.createElement("canvas");
      c.width = src.width;
      c.height = src.height;
      const g = c.getContext("2d");
      g.fillStyle = getComputedStyle(this.viewer.container).backgroundColor || "#f4f1ec";
      if (g.fillStyle === "rgba(0, 0, 0, 0)") g.fillStyle = getComputedStyle(document.body).backgroundColor;
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(src, 0, 0);
      const a = document.createElement("a");
      a.href = c.toDataURL("image/png");
      a.download = name;
      a.click();
    }

    stop() {
      const v = this.viewer;
      v.renderHook = null;
      v.labelLayer.hidden = false;
      v.dirty = true;
      for (const m of this.restore) m.vertexColors = true;
      this.restore = [];
      try {
        this.pt && this.pt.dispose();
      } catch (e) {
        // A render stopped before its first sample has parts not yet made.
      }
      if (this.env) this.env.dispose();
      this.pt = this.scene = null;
    }
  }

  window.ANATOMY = window.ANATOMY || { regions: {} };
  window.ANATOMY.Photo = Photo;
})();
