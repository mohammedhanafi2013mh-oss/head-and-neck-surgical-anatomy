# Head & Neck Surgical Anatomy

An interactive web app for learning the surgical anatomy of the head and neck. It has a 3D model you can rotate, structure-by-structure notes with surgical pearls and danger points, step-by-step operative walkthroughs, diagrams, a self-test quiz and references.

The first module is the **submandibular region** (submandibular triangle, level IB).

> For education only. The 3D model is a simplified schematic, not a scan-derived model. Check every surgical detail against current atlases and senior guidance before using it in clinical practice.

## Run it

Open `index.html` in a modern browser. It works offline: there's no build step and no server, and Three.js is bundled in `vendor/`.

To try it on a phone, serve the folder (for example `python3 -m http.server`) and open it from the phone's browser on the same network.

## What's in the submandibular module

- **3D model**: the right submandibular region with 22 structures (mandible, hyoid, digastric, stylohyoid, mylohyoid, hyoglossus, gland and duct, external carotid, facial, submental and lingual arteries, facial and internal jugular veins, marginal mandibular, lingual, hypoglossal and mylohyoid nerves, submandibular ganglion, level IA/IB nodes, platysma).
  - Drag to rotate, scroll or pinch to zoom, shift-drag or right-drag to pan.
  - Tap a structure to open its notes. Toggle layers (bone, muscle, vessels, nerves…) and labels.
- **Structures**: for each one, a summary, relations, blood and nerve supply, surgical relevance, danger points, variations and references.
- **Surgery**: an 8-step transcervical submandibular gland excision. Each step sets the model to the layers you would see at that point and highlights the key structures. Complications are listed at the end.
- **Figures**: original labelled diagrams of the triangle's boundaries and a coronal section.
- **Quiz**: six questions with explanations.
- **References**: textbooks and primary papers (Gray's, Scott-Brown's, Dingman & Grabb, Robbins 2002, and others).

## Project layout

```
index.html                     page shell
styles.css                     styles (light and dark mode)
data/submandibular.js          all text content for the region: structures, steps, quiz, references
js/models/submandibular-model.js   3D geometry for the region (structure ids match the data file)
js/viewer.js                   Three.js viewer: camera controls, picking, labels, layers, highlighting
js/figures.js                  inline SVG diagrams
js/app.js                      UI: tabs, cards, walkthrough, quiz
vendor/three.min.js            Three.js r159 (MIT)
```

## Adding a region

1. Copy `data/submandibular.js` to `data/<region>.js` and register it as `window.ANATOMY.regions.<region>`.
2. Add `js/models/<region>-model.js` with a `build(THREE, helpers)` function that returns one entry per structure id: `{ id, label: [x, y, z], objects: [meshes] }`.
3. Add both `<script>` tags to `index.html`. The region then appears in the region picker.

## Images and 3D models: licensing

Everything in this repository is original work, apart from Three.js (MIT). Do not add images from copyrighted atlases (Netter, Grant's, modern Gray's, Rohen, surgical atlases). Cite them as references instead.

Openly licensed sources that could replace the schematic 3D geometry later:

- **Z-Anatomy** and **BodyParts3D**: full human models with named structures (CC BY-SA, attribution required). Convert them to `.glb` in Blender, load them with Three.js's GLTFLoader and keep the same structure ids.
- **Gray's Anatomy (1918)** illustrations: public domain.
- **Wikimedia Commons** and **Radiopaedia**: check the license of each image.

## Roadmap

- More regions: parotid and facial nerve, thyroid and parathyroids, larynx, neck dissection levels II–V, deep neck spaces, skull base
- Real anatomical meshes (Z-Anatomy / BodyParts3D)
- Imaging correlation (CT/MRI slices)
- Installable app with offline caching; later, packaging for the app stores
