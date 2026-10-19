// 3D model of the deep neck spaces. Bones, muscles, viscera and vessels come
// from Z-Anatomy (CC BY-SA 4.0, based on BodyParts3D); the fascial spaces
// are schematic volumes built from them by tools/export_zanatomy.py (hulls
// of what a space contains, or layers between structures). Coordinates are
// centimetres centred in the midline at the hyoid: +y = superior,
// +z = anterior, and the patient's left is +x.

window.ANATOMY = window.ANATOMY || { regions: {} };
window.ANATOMY.models = window.ANATOMY.models || {};

window.ANATOMY.models.deep_neck = {
  // Default view: from the front and right, slightly below.
  camera: { target: [0, 0.6, 0.2], radius: 46, theta: -0.75, phi: 1.7 },

  // [theta, phi] for the view buttons. "Lateral" shows the right side (-x).
  views: {
    lateral: [-Math.PI / 2, Math.PI / 2],
    inferior: [-0.3, 2.55],
    anterior: [0, 1.6]
  },

  // Starting axial level (0 = bottom of the model, 1 = top): the oropharynx.
  sectionLevel: 0.62,

  look: {
    mandible: { kind: "bone", opacity: 0.9 },
    skull_base: { kind: "bone" },
    hyoid: { kind: "bone" },
    larynx: { kind: "cartilage" },
    vertebrae: { kind: "bone" },
    investing_fascia: { kind: "cartilage", color: 0xd6d0e4, opacity: 0.18 },
    constrictors: { kind: "muscle", color: 0x8f3739 },
    longus: { kind: "muscle", color: 0x9a3c3c },
    pterygoids: { kind: "muscle", color: 0x943a3b },
    masseter: { kind: "muscle", color: 0xa13f3d },
    styloid_muscles: { kind: "muscle", color: 0x9c3a3c },
    digastric: { kind: "muscle" },
    mylohyoid: { kind: "muscle", color: 0x9a3c3c },
    scm: { kind: "muscle", color: 0xa4423f, opacity: 0.5 },
    pharynx: { kind: "muscle", color: 0xd99090, opacity: 0.8 },
    oesophagus_trachea: { kind: "cartilage", color: 0xd9b8a8 },
    tonsils: { kind: "gland", color: 0xd98a86 },
    parotid: { kind: "gland", color: 0xd9a46e },
    smg: { kind: "gland", color: 0xd8a06a },
    sublingual: { kind: "gland", color: 0xdcae7a },
    thyroid: { kind: "gland", color: 0xa8423a },
    carotids: { kind: "artery" },
    ijv: { kind: "vein" },
    vagus: { kind: "nerve" },
    rp_nodes: { kind: "node" },
    nodes_ii: { kind: "node" },
    // Spaces: one colour each, translucent.
    s_parapharyngeal: { kind: "space", color: 0xf2c14e, opacity: 0.42 },
    s_retropharyngeal: { kind: "space", color: 0x5fb3ff, opacity: 0.5 },
    s_danger: { kind: "space", color: 0xe0503c, opacity: 0.5 },
    s_prevertebral: { kind: "space", color: 0x9b7be0, opacity: 0.35 },
    s_carotid: { kind: "space", color: 0xe57fb0, opacity: 0.3 },
    s_visceral: { kind: "space", color: 0x6fcf97, opacity: 0.28 },
    s_masticator: { kind: "space", color: 0xf08a4b, opacity: 0.3 },
    s_parotid: { kind: "space", color: 0xf7d76b, opacity: 0.35 },
    s_submandibular: { kind: "space", color: 0x4fd1c5, opacity: 0.38 },
    s_sublingual: { kind: "space", color: 0x7fe0a0, opacity: 0.4 },
    s_submental: { kind: "space", color: 0x8fb4ff, opacity: 0.4 },
    s_peritonsillar: { kind: "space", color: 0xff9db0, opacity: 0.5 }
  },

  build(THREE, h) {
    return h.fromMeshes("deep_neck", this.look);
  }
};
