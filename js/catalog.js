// Regions in the app. Each region's scripts load the first time it is opened.

window.ANATOMY = window.ANATOMY || {};
window.ANATOMY.regions = window.ANATOMY.regions || {};
window.ANATOMY.catalog = [
  {
    id: "submandibular",
    title: "Submandibular region",
    scripts: ["data/submandibular.js", "data/submandibular-meshes.js", "js/models/submandibular-model.js"]
  },
  {
    id: "face",
    title: "Face & facial muscles",
    scripts: ["data/face.js", "data/face-meshes.js", "js/models/face-model.js"]
  },
  {
    id: "oral_cavity",
    title: "Oral cavity",
    scripts: ["data/oral-cavity.js", "data/oral-cavity-meshes.js", "js/models/oral-cavity-model.js"]
  },
  {
    id: "parotid",
    title: "Parotid & facial nerve",
    scripts: ["data/parotid.js", "data/parotid-meshes.js", "js/models/parotid-model.js"]
  },
  {
    id: "lateral_neck",
    title: "Lateral neck",
    scripts: ["data/lateral-neck.js", "data/lateral-neck-meshes.js", "js/models/lateral-neck-model.js"]
  },
  {
    id: "thyroid",
    title: "Thyroid & central neck",
    scripts: ["data/thyroid.js", "data/thyroid-meshes.js", "js/models/thyroid-model.js"]
  },
  {
    id: "larynx",
    title: "Larynx",
    scripts: ["data/larynx.js", "data/larynx-meshes.js", "js/models/larynx-model.js"]
  },
  {
    id: "carotid",
    title: "Carotid triangle",
    scripts: ["data/carotid.js", "data/carotid-meshes.js", "js/models/carotid-model.js"]
  },
  {
    id: "skull_base",
    title: "Skull base",
    scripts: ["data/skull-base.js", "data/skull-base-meshes.js", "js/models/skull-base-model.js"]
  },
  {
    id: "deep_neck",
    title: "Deep neck spaces",
    scripts: ["data/deep-neck.js", "data/deep-neck-meshes.js", "js/models/deep-neck-model.js"]
  },
  {
    id: "infratemporal",
    title: "Infratemporal fossa",
    scripts: ["data/infratemporal.js", "data/infratemporal-meshes.js", "js/models/infratemporal-model.js"]
  },
  {
    id: "pterygopalatine",
    title: "Pterygopalatine fossa",
    scripts: ["data/pterygopalatine.js", "data/pterygopalatine-meshes.js", "js/models/pterygopalatine-model.js"]
  },
  {
    id: "orbit",
    title: "Orbit",
    scripts: ["data/orbit.js", "data/orbit-meshes.js", "js/models/orbit-model.js"]
  },
  {
    id: "sinonasal",
    title: "Nose & paranasal sinuses",
    scripts: ["data/sinonasal.js", "data/sinonasal-meshes.js", "js/models/sinonasal-model.js"]
  }
];
