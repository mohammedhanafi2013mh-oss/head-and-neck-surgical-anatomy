// Regions in the app. Each region's scripts load the first time it is opened.
// `group` and `blurb` place and describe the region on the home screen.

window.ANATOMY = window.ANATOMY || {};
window.ANATOMY.regions = window.ANATOMY.regions || {};
window.ANATOMY.catalog = [
  {
    id: "submandibular",
    group: "face",
    blurb: "Digastric triangle, the gland and the three nerves around it",
    title: "Submandibular region",
    scripts: ["data/submandibular.js", "data/submandibular-meshes.js", "js/models/submandibular-model.js"]
  },
  {
    id: "face",
    group: "face",
    blurb: "Muscles of expression, facial nerve branches and danger zones",
    title: "Face & facial muscles",
    scripts: ["data/face.js", "data/face-meshes.js", "js/models/face-model.js"]
  },
  {
    id: "oral_cavity",
    group: "face",
    blurb: "Tongue, floor of mouth, palate and tonsils, with the mouth open",
    title: "Oral cavity",
    scripts: ["data/oral-cavity.js", "data/oral-cavity-meshes.js", "js/models/oral-cavity-model.js"]
  },
  {
    id: "parotid",
    group: "face",
    blurb: "The gland and the facial nerve running through it",
    title: "Parotid & facial nerve",
    scripts: ["data/parotid.js", "data/parotid-meshes.js", "js/models/parotid-model.js"]
  },
  {
    id: "lateral_neck",
    group: "neck",
    blurb: "Neck dissection levels I–VI and the accessory nerve",
    title: "Lateral neck",
    scripts: ["data/lateral-neck.js", "data/lateral-neck-meshes.js", "js/models/lateral-neck-model.js"]
  },
  {
    id: "thyroid",
    group: "neck",
    blurb: "Thyroid, parathyroids and the laryngeal nerves",
    title: "Thyroid & central neck",
    scripts: ["data/thyroid.js", "data/thyroid-meshes.js", "js/models/thyroid-model.js"]
  },
  {
    id: "larynx",
    group: "neck",
    blurb: "Cartilages, folds, muscles, nerves and spaces",
    title: "Larynx",
    scripts: ["data/larynx.js", "data/larynx-meshes.js", "js/models/larynx-model.js"]
  },
  {
    id: "carotid",
    group: "neck",
    blurb: "The bifurcation, jugular vein and cranial nerves IX–XII",
    title: "Carotid triangle",
    scripts: ["data/carotid.js", "data/carotid-meshes.js", "js/models/carotid-model.js"]
  },
  {
    id: "temporal_bone",
    group: "ear",
    blurb: "Ear canal to cochlea, the facial nerve and the mastoid",
    title: "Temporal bone & ear",
    scripts: ["data/temporal-bone.js", "data/temporal-bone-meshes.js", "js/models/temporal-bone-model.js"]
  },
  {
    id: "skull_base",
    group: "deep",
    blurb: "Fossae, foramina and all twelve cranial nerves",
    title: "Skull base",
    scripts: ["data/skull-base.js", "data/skull-base-meshes.js", "js/models/skull-base-model.js"]
  },
  {
    id: "deep_neck",
    group: "deep",
    blurb: "Fascial layers and twelve spaces, with routes of spread",
    title: "Deep neck spaces",
    scripts: ["data/deep-neck.js", "data/deep-neck-meshes.js", "js/models/deep-neck-model.js"]
  },
  {
    id: "infratemporal",
    group: "deep",
    blurb: "Pterygoids, V3 and the maxillary artery",
    title: "Infratemporal fossa",
    scripts: ["data/infratemporal.js", "data/infratemporal-meshes.js", "js/models/infratemporal-model.js"]
  },
  {
    id: "pterygopalatine",
    group: "deep",
    blurb: "Seven openings, V2 and the ganglion",
    title: "Pterygopalatine fossa",
    scripts: ["data/pterygopalatine.js", "data/pterygopalatine-meshes.js", "js/models/pterygopalatine-model.js"]
  },
  {
    id: "orbit",
    group: "ear",
    blurb: "Globe, muscles, apex, nerves II–VI and the lacrimal system",
    title: "Orbit",
    scripts: ["data/orbit.js", "data/orbit-meshes.js", "js/models/orbit-model.js"]
  },
  {
    id: "sinonasal",
    group: "ear",
    blurb: "Lateral nasal wall, the four sinuses and their drainage",
    title: "Nose & paranasal sinuses",
    scripts: ["data/sinonasal.js", "data/sinonasal-meshes.js", "js/models/sinonasal-model.js"]
  }
];

// Home screen sections, in order.
window.ANATOMY.groups = [
  { id: "face", title: "Face, mouth & salivary glands" },
  { id: "neck", title: "Neck" },
  { id: "ear", title: "Ear, nose & orbit" },
  { id: "deep", title: "Skull base & deep spaces" }
];
