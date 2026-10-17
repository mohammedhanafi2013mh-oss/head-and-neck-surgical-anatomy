# Head & Neck Surgical Anatomy

An interactive web app for learning the surgical anatomy of the head and neck. It has a 3D model you can rotate, structure-by-structure notes with surgical pearls and danger points, step-by-step operative walkthroughs, diagrams, a self-test quiz and references.

The first module is the **submandibular region** (submandibular triangle, level IB).

> For education only. Check every surgical detail against current atlases and senior guidance before using it in clinical practice.

## Run it

Open `index.html` in a modern browser. It works offline: there's no build step and no server, and Three.js is bundled in `vendor/`.

To try it on a phone, serve the folder (for example `python3 -m http.server`) and open it from the phone's browser on the same network.

## What's in the submandibular module

- **3D model**: real anatomical meshes of the right submandibular region from [Z-Anatomy](https://www.z-anatomy.com), with 29 selectable structures. They include the mandible with molars, hyoid, digastric, stylohyoid, mylohyoid, hyoglossus, the submandibular gland and duct, the facial, submental and external carotid arteries, the facial, retromandibular and internal jugular veins, the marginal mandibular, lingual, hypoglossal and mylohyoid nerves, level IA/IB nodes and platysma. A "Surrounding" layer adds the parotid, sublingual gland, masseter, medial pterygoid, genioglossus, geniohyoid and sternocleidomastoid.
  - Rendering uses environment lighting, film-style tone mapping and procedural surface detail: muscle fibres along each muscle's line of pull, gland lobules and bone grain.
  - Drag to rotate, scroll or pinch to zoom, shift-drag or right-drag to pan.
  - Tap a structure to open its notes. Toggle layers (bone, muscle, vessels, nerves…) and labels.
- **Structures**: for each one, a summary, relations, blood and nerve supply, surgical relevance, danger points, variations and references. The lingual artery and submandibular ganglion have notes but aren't in the 3D model, because Z-Anatomy doesn't include them.
- **Surgery**: an 8-step transcervical submandibular gland excision. Each step sets the model to the layers you would see at that point and highlights the key structures. Complications are listed at the end.
- **Figures**: original labelled diagrams of the triangle's boundaries and a coronal section.
- **Quiz**: six questions with explanations.
- **References**: textbooks and primary papers (Gray's, Scott-Brown's, Dingman & Grabb, Robbins 2002, and others).

## Project layout

```
index.html                     page shell
styles.css                     styles (light and dark mode)
data/submandibular.js          all text content for the region: structures, steps, quiz, references
data/submandibular-meshes.js   packed 3D meshes (generated; CC BY-SA, see below)
js/models/submandibular-model.js   decodes the meshes and sets each structure's tissue type
js/viewer.js                   Three.js viewer: camera controls, picking, labels, layers, materials
tools/export_zanatomy.py       exports meshes from the Z-Anatomy Blender file
js/figures.js                  inline SVG diagrams
js/app.js                      UI: tabs, cards, walkthrough, quiz
vendor/three.min.js            Three.js r159 (MIT)
```

## Adding a region

1. Copy `data/submandibular.js` to `data/<region>.js` and register it as `window.ANATOMY.regions.<region>`.
2. Copy `tools/export_zanatomy.py`, change the `STRUCTURES` map (app id → Z-Anatomy object names) and the centring object, and export to `data/<region>-meshes.js`.
3. Add `js/models/<region>-model.js` with the region's camera and tissue types (copy the submandibular one).
4. Add the `<script>` tags to `index.html`. The region then appears in the region picker.

### Regenerating the meshes

```
pip install bpy                      # Blender as a Python module (Python 3.13)
git clone https://github.com/Z-Anatomy/models-of-human-anatomy
unzip models-of-human-anatomy/Z-Anatomy.zip Z-Anatomy/Startup.blend
python tools/export_zanatomy.py Z-Anatomy/Startup.blend data/submandibular-meshes.js
```

## Licensing and credits

- **3D meshes** (`data/submandibular-meshes.js`): [Z-Anatomy](https://www.z-anatomy.com), CC BY-SA 4.0, based on BodyParts3D © The Database Center for Life Science, CC BY-SA 2.1 JP (Mitsuhashi N, et al. *Nucleic Acids Res.* 2009;37:D782–5). Anything derived from these meshes must keep the attribution and the same licence.
- **Three.js** (`vendor/`): MIT.
- **Text, diagrams and code**: original to this project.

Do not add images from copyrighted atlases (Netter, Grant's, modern Gray's, Rohen, surgical atlases). Cite them as references instead. Other open sources: Gray's Anatomy (1918) illustrations are public domain; for Wikimedia Commons and Radiopaedia, check each image's licence.

## Roadmap

- More regions: parotid and facial nerve, thyroid and parathyroids, larynx, neck dissection levels II–V, deep neck spaces, skull base
- Imaging correlation (CT/MRI slices)
- Installable app with offline caching; later, packaging for the app stores
