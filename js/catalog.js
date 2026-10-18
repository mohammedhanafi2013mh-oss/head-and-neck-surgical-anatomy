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
  }
];
