// Schematic 3D model of the right submandibular region, built from primitives.
// Coordinates are roughly in centimetres: +x = lateral (right), +y = superior,
// +z = anterior, x = 0 is the midline. Not to scale; relations are what matter.
// To use real anatomy later, replace an entry's `objects` with meshes loaded
// from a .glb (e.g. Z-Anatomy / BodyParts3D, CC BY-SA) and keep the same ids.

window.ANATOMY = window.ANATOMY || { regions: {} };
window.ANATOMY.models = window.ANATOMY.models || {};

window.ANATOMY.models.submandibular = {
  // Default view: from the right, slightly in front of and below the jaw.
  camera: { target: [2.2, -0.8, 2.2], radius: 22, theta: 1.4, phi: 2.0 },

  build(THREE, h) {
    const C = {
      bone: 0xeae0c8,
      muscle: 0xb5524a,
      muscleDeep: 0x9a4a48,
      tendon: 0xf2ede4,
      gland: 0xe2a86b,
      duct: 0xf4e3a6,
      artery: 0xd62f2f,
      vein: 0x3c5fb8,
      nerve: 0xf2d43c,
      node: 0x6fb36a,
      platysma: 0xd98b7a
    };
    const M = {
      bone: h.material(C.bone, { roughness: 0.8 }),
      muscle: h.material(C.muscle),
      muscleDeep: h.material(C.muscleDeep),
      sheet: h.material(C.muscle, { opacity: 0.82, doubleSided: true }),
      sheetDeep: h.material(C.muscleDeep, { opacity: 0.9, doubleSided: true }),
      tendon: h.material(C.tendon, { roughness: 0.4 }),
      gland: h.material(C.gland, { roughness: 0.75 }),
      duct: h.material(C.duct),
      artery: h.material(C.artery, { roughness: 0.4 }),
      vein: h.material(C.vein, { roughness: 0.4 }),
      nerve: h.material(C.nerve, { roughness: 0.35 }),
      node: h.material(C.node),
      platysma: h.material(C.platysma, { opacity: 0.28, doubleSided: true })
    };
    const mirror = (pts) => pts.map(([x, y, z]) => [-x, y, z]);

    // Lower border of the right hemimandible, from the symphysis to the angle.
    const lowerBorder = [
      [0, 0, 7.0],
      [1.5, 0, 6.6],
      [3.0, 0, 5.2],
      [4.0, 0.15, 3.3],
      [4.45, 0.35, 1.2],
      [4.6, 0.6, 0.0]
    ];
    const bodyPath = [...mirror(lowerBorder).reverse(), ...lowerBorder.slice(1)];

    const out = [];

    // ---------- bone ----------
    const mandible = [
      h.plate(bodyPath, [0, 1, 0], 3.0, 0.75, M.bone),
      h.plate([[4.6, 0.6, -0.1], [4.75, 3.5, -0.4], [4.85, 6.0, -0.6]], [0, 0, 1], 2.8, 0.7, M.bone),
      h.plate([[-4.6, 0.6, -0.1], [-4.75, 3.5, -0.4], [-4.85, 6.0, -0.6]], [0, 0, 1], 2.8, 0.7, M.bone),
      h.ellipsoid([4.85, 6.4, -0.4], [0.5, 0.45, 0.8], M.bone),
      h.ellipsoid([-4.85, 6.4, -0.4], [0.5, 0.45, 0.8], M.bone)
    ];
    out.push({ id: "mandible", label: [4.4, 3.2, 3.6], objects: mandible });

    const hyoidBody = [[-1.3, -3.4, 3.7], [0, -3.5, 4.15], [1.3, -3.4, 3.7]];
    const hyoidHorn = [[1.2, -3.4, 3.75], [1.7, -3.3, 2.6], [2.05, -3.1, 1.3]];
    out.push({
      id: "hyoid",
      label: [0.3, -3.6, 4.2],
      objects: [
        h.tube(hyoidBody, 0.32, M.bone),
        h.tube(hyoidHorn, [0.26, 0.18], M.bone),
        h.tube(mirror(hyoidHorn), [0.26, 0.18], M.bone)
      ]
    });

    // ---------- muscles ----------
    // Mylohyoid: from the mylohyoid line (inner mandible) to the midline raphe
    // and hyoid. Its free posterior border runs from the back of the line to
    // the hyoid body. Bulges down (inferiorly) like a sling.
    const mylohyoidLine = [
      [3.75, 2.1, 2.2],
      [3.35, 1.7, 3.6],
      [2.6, 1.25, 5.0],
      [1.35, 0.85, 6.15],
      [0.0, 0.7, 6.5]
    ];
    const raphe = [
      [0.85, -3.25, 3.85],
      [0.3, -2.4, 4.6],
      [0.05, -1.4, 5.4],
      [0.0, -0.3, 6.1],
      [0.0, 0.5, 6.45]
    ];
    out.push({
      id: "mylohyoid",
      label: [1.6, -0.6, 5.4],
      objects: [h.sheet(mylohyoidLine, raphe, M.sheet, { bulge: [0.25, -0.7, 0.1] })]
    });

    // Hyoglossus: from the greater horn up into the side of the tongue.
    out.push({
      id: "hyoglossus",
      label: [1.2, -1.2, 2.2],
      objects: [
        h.sheet(
          [[0.9, -3.15, 3.65], [1.4, -3.05, 2.7], [1.85, -2.9, 1.6]],
          [[0.75, 0.9, 4.0], [1.05, 1.0, 2.9], [1.35, 1.1, 1.9]],
          M.sheetDeep,
          { nu: 8, nv: 10 }
        )
      ]
    });

    const tendonPt = [1.45, -3.05, 3.2];
    out.push({
      id: "digastric_ant",
      label: [1.1, -1.9, 5.3],
      objects: [
        h.tube([[0.75, -0.05, 6.55], [1.05, -1.6, 5.2], [1.35, -2.75, 3.75], tendonPt], [0.42, 0.24], M.muscle),
        h.tube([tendonPt, [1.55, -3.1, 2.6]], 0.17, M.tendon)
      ]
    });
    out.push({
      id: "digastric_post",
      label: [3.4, 0.6, -1.6],
      objects: [h.tube([[1.55, -3.1, 2.6], [2.3, -2.5, 1.1], [3.4, -0.2, -0.9], [4.2, 2.8, -2.4], [4.4, 4.4, -3.0]], [0.24, 0.5], M.muscle)]
    });
    out.push({
      id: "stylohyoid",
      label: [3.0, 2.6, -1.2],
      objects: [h.tube([[1.75, -2.75, 2.75], [2.4, -1.6, 1.3], [3.0, 0.9, -0.2], [3.5, 3.9, -1.2]], [0.14, 0.2], M.muscleDeep)]
    });

    // ---------- gland & duct ----------
    out.push({
      id: "smg",
      label: [3.6, -2.2, 2.3],
      objects: [
        h.ellipsoid([3.0, -1.35, 2.45], [1.1, 1.15, 1.75], M.gland, [0.15, 0, -0.35]),
        h.ellipsoid([2.05, 0.15, 3.25], [0.55, 0.45, 0.95], M.gland, [0.3, 0.35, 0]),
        h.tube([[2.6, -0.7, 2.75], [2.2, -0.05, 3.1]], 0.42, M.gland)
      ]
    });
    const duct = [[1.9, 0.35, 3.85], [1.45, 0.75, 4.6], [1.0, 1.1, 5.35], [0.35, 1.5, 6.4]];
    out.push({
      id: "wharton",
      label: [0.9, 1.5, 5.6],
      objects: [h.tube(duct, 0.12, M.duct)]
    });

    // ---------- arteries ----------
    const ecaPath = [[2.0, -6.0, -0.6], [2.1, -3.0, -0.45], [2.35, 0.5, -0.8], [3.0, 3.5, -1.2], [3.6, 6.0, -1.3]];
    out.push({ id: "eca", label: [2.1, -5.2, -0.6], objects: [h.tube(ecaPath, [0.32, 0.24], M.artery)] });

    // Facial artery: deep to digastric/stylohyoid, grooving the back of the
    // gland, then hooking round the lower border of the mandible onto the face.
    const facialArtery = [
      [2.12, -2.55, -0.4],
      [2.3, -1.6, 0.5],
      [2.35, -0.1, 1.3],
      [3.1, 0.55, 2.0],
      [3.9, 0.1, 2.75],
      [4.4, -0.2, 3.25],
      [4.7, 0.6, 3.45],
      [4.6, 2.2, 3.9],
      [4.2, 4.0, 4.6]
    ];
    out.push({ id: "facial_artery", label: [4.75, 1.6, 3.6], objects: [h.tube(facialArtery, [0.17, 0.12], M.artery)] });
    out.push({
      id: "submental_artery",
      label: [2.6, -0.7, 5.3],
      objects: [h.tube([[3.85, 0.0, 2.75], [3.4, -0.45, 3.9], [2.6, -0.5, 5.0], [1.5, -0.35, 6.0], [0.6, -0.2, 6.5]], [0.09, 0.06], M.artery)]
    });
    out.push({
      id: "lingual_artery",
      label: [0.6, -2.5, 3.2],
      objects: [h.tube([[2.1, -3.25, -0.42], [1.7, -2.6, 0.6], [1.15, -2.9, 1.8], [0.75, -2.4, 3.2], [0.5, -1.2, 4.6], [0.35, 0.2, 5.6]], [0.15, 0.1], M.artery)]
    });

    // ---------- veins ----------
    out.push({ id: "ijv", label: [3.0, -5.6, -1.9], objects: [h.tube([[2.95, -7.0, -1.7], [2.9, -2.0, -1.8], [3.0, 2.0, -2.0], [3.4, 5.5, -2.1]], 0.48, M.vein)] });
    out.push({
      id: "facial_vein",
      label: [4.35, -1.6, 2.0],
      objects: [
        h.tube(
          [[4.55, 4.0, 5.0], [4.75, 1.6, 4.0], [4.65, 0.1, 3.3], [4.25, -1.2, 2.5], [3.95, -2.5, 1.2], [3.5, -3.4, 0.0], [3.05, -3.7, -1.3]],
          [0.15, 0.22],
          M.vein
        )
      ]
    });

    // ---------- nerves ----------
    // Marginal mandibular: superficial to the facial vessels, deep to platysma.
    out.push({
      id: "mmn",
      label: [5.2, -0.9, 1.4],
      objects: [h.tube([[4.95, 0.6, -0.5], [5.15, -0.55, 0.9], [5.05, -0.55, 2.3], [4.98, 0.0, 3.3], [4.8, 0.85, 4.2], [4.05, 1.5, 5.4]], 0.065, M.nerve)]
    });

    // Lingual nerve: comes down inside the ramus, runs lateral to the duct,
    // hooks under it and passes medial to it into the tongue.
    const lingual = [
      [3.55, 4.6, 0.7],
      [2.95, 2.6, 1.9],
      [2.35, 1.35, 3.0],
      [1.9, 0.75, 3.95],
      [1.45, 0.42, 4.65],
      [0.95, 0.75, 5.1],
      [0.75, 1.5, 5.35],
      [0.6, 2.3, 5.6]
    ];
    out.push({ id: "lingual_nerve", label: [2.9, 2.7, 1.9], objects: [h.tube(lingual, 0.1, M.nerve)] });
    out.push({
      id: "sm_ganglion",
      label: [2.2, 0.75, 3.3],
      objects: [
        h.ellipsoid([2.15, 0.82, 3.25], [0.16, 0.16, 0.2], M.nerve),
        h.tube([[2.15, 0.9, 3.2], [2.3, 1.25, 3.05]], 0.035, M.nerve),
        h.tube([[2.15, 0.9, 3.33], [2.2, 1.2, 3.35]], 0.035, M.nerve),
        h.tube([[2.12, 0.7, 3.25], [2.05, 0.5, 3.25]], 0.035, M.nerve)
      ]
    });

    // Hypoglossal: crosses the ECA, runs forward on hyoglossus below the duct.
    out.push({
      id: "hypoglossal",
      label: [1.9, -2.2, 1.5],
      objects: [
        h.tube([[2.9, 2.0, -2.2], [2.5, -1.2, -0.9], [2.35, -2.25, 0.4], [1.85, -2.3, 1.8], [1.45, -1.7, 3.0], [1.05, -0.8, 4.0], [0.65, 0.1, 4.8]], 0.1, M.nerve),
        h.tube([[2.3, -2.5, 0.6], [1.8, -2.55, 1.9], [1.4, -1.95, 3.0]], 0.05, M.vein)
      ]
    });

    out.push({
      id: "nerve_mylohyoid",
      label: [3.2, 0.9, 3.4],
      objects: [h.tube([[4.1, 3.6, 0.4], [3.85, 1.9, 1.9], [3.15, 0.75, 3.4], [2.2, 0.0, 4.6], [1.3, -0.5, 5.6]], 0.045, M.nerve)]
    });

    // ---------- lymph nodes ----------
    const nodes = [
      [4.75, -0.35, 3.75],
      [4.6, -0.55, 2.85],
      [4.05, -2.6, 1.55],
      [4.15, -2.2, 3.4],
      [0.55, -1.25, 5.85],
      [-0.5, -1.4, 5.7]
    ].map((p, i) => h.ellipsoid(p, [0.24, 0.2, 0.3].map((r) => r * (i % 2 ? 0.85 : 1)), M.node));
    out.push({ id: "nodes", label: [4.8, -0.6, 3.3], objects: nodes });

    // ---------- platysma ----------
    const outward = (pts, d, dy) =>
      pts.map(([x, y, z]) => {
        const len = Math.hypot(x, z - 1.2) || 1;
        return [x + (x / len) * d, y + dy, z + ((z - 1.2) / len) * d];
      });
    const platysmaTop = outward([[0, 0, 7], [1.5, 0, 6.6], [3.0, 0, 5.2], [4.0, 0, 3.3], [4.45, 0, 1.2], [4.6, 0, -0.6]], 1.05, 1.6);
    const platysmaBottom = outward([[0, 0, 6.2], [1.5, 0, 5.9], [3.0, 0, 4.6], [3.8, 0, 3.0], [4.2, 0, 1.1], [4.3, 0, -0.8]], 1.2, -6.0);
    out.push({
      id: "platysma",
      label: [5.9, -3.6, 1.6],
      objects: [h.sheet(platysmaTop, platysmaBottom, M.platysma, { nu: 30, nv: 16 })]
    });

    return out;
  }
};
