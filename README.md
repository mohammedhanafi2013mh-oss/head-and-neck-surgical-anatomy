# Head & Neck Surgical Anatomy

An interactive web app for learning the surgical anatomy of the head and neck. It has a 3D model you can rotate, structure-by-structure notes with surgical pearls and danger points, step-by-step operative walkthroughs, diagrams, a self-test quiz and references.

Modules so far:

- **Submandibular region** (submandibular triangle, level IB), right side
- **Parotid & facial nerve** (parotid region and extracranial facial nerve), right side
- **Lateral neck** (neck dissection levels I–VI), left side
- **Thyroid & central neck** (thyroid, parathyroids, laryngeal nerves, level VI), both sides
- **Larynx** (cartilages, folds, intrinsic muscles, nerves and spaces)
- **Carotid triangle** (carotid bifurcation, jugular vein, cranial nerves IX–XII and the ansa), right side
- **Skull base** (cranial fossae, foramina, cranial nerves I–XII, the carotid and vertebrobasilar arteries and dural sinuses)

Selected nerves and vessels can be **traced**: open one in Structures and press "Trace the course". A tracer runs along it from its origin, through its foramina, to its branches, pinning each point on the model. The path is drawn through bone so it can be followed. Traced courses:
- **Skull base:** all twelve cranial nerves and V1–V3, the internal carotid, vertebral, basilar and middle meningeal arteries, and the transverse–sigmoid sinus.
- **Parotid:** the facial nerve.
- **Carotid triangle:** the external carotid and its branches.
- **Thyroid:** both recurrent laryngeal nerves.

Every module has a **CT / MRI** tab that slices the 3D model at any level (see below).

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

## What's in the lateral neck module

- **3D model**: the left neck from Z-Anatomy. It includes the carotid sheath (common, internal and external carotid, internal jugular vein, vagus), the accessory, hypoglossal and marginal mandibular nerves, the brachial plexus, the sympathetic trunk, sternocleidomastoid, omohyoid, the strap muscles, digastric, the scalenes and the thyroid. The external jugular, subclavian, thyrocervical and vertebral vessels are there too, with bones from the mandible to the clavicle. A "Posterior & deep" layer adds trapezius, levator scapulae, splenius, the vertebrae and the first rib.
  - **Nodes coloured by level** (IA, IB, IIA, III, IV, VA, VB, VI). `tools/export_zanatomy.py` assigns each node to a level from its position against real landmarks: the hyoid and cricoid, sternocleidomastoid's posterior border, the common carotid, the internal jugular vein and the accessory nerve. Z-Anatomy has no level IIB nodes and no accessory-chain nodes, so level V is shown by its superficial lateral cervical nodes; the notes say so.
  - **Drawn structures**: Z-Anatomy lacks the phrenic nerve, great auricular nerve and thoracic duct. The exporter draws them as paths on its anatomy: the phrenic nerve down the front of scalenus anterior, the great auricular nerve from Erb's point across sternocleidomastoid, and the thoracic duct arching behind the carotid sheath into the left venous angle. Their notes are marked as drawn.
- **Structures**: notes for every level and structure, including the ansa cervicalis (notes only).
- **Surgery**: a 9-step modified radical neck dissection (levels I–V), from incision to closure, with complications.
- **Figures**: an original diagram of levels I–VI in the same colours as the 3D nodes.
- **Quiz**: six questions. **References**: Robbins 2002 and 2008, Som 1999, Crile 1906, Bocca 1967, Nahum 1961, Gray's, Scott-Brown's and Shah.

## What's in the parotid module

- **3D model**: the right parotid region from Z-Anatomy. The facial nerve is split into the trunk (from the stylomastoid foramen to the pes anserinus) and the temporal, zygomatic, buccal, marginal mandibular, cervical and posterior auricular branches, each selectable. It also has the parotid gland and accessory lobe, the parotid duct, the retromandibular vein, the external carotid, superficial temporal, transverse facial and maxillary arteries, masseter, sternocleidomastoid, the posterior belly of digastric, the styloid muscles, the ear and tragus, and the parotid nodes. The great auricular nerve is drawn for this app. Layers add the parapharyngeal structures (internal carotid, internal jugular, IX–XII) and the facial and deep muscles.
- **Structures**: notes on every structure, with trunk landmarks (tragal pointer, posterior belly of digastric, tympanomastoid suture, styloid), Pitanguy's line, Frey syndrome and the auriculotemporal nerve (notes only).
- **Surgery**: a 9-step superficial parotidectomy. **Figures**: an original diagram of the trunk landmarks and branches. **Quiz**: six questions.

## What's in the thyroid module

- **3D model**: both sides of the central neck from Z-Anatomy. It has the thyroid gland, superior and inferior parathyroids, thymus, larynx (thyroid and cricoid cartilages, arytenoids, epiglottis), trachea and oesophagus. Also the strap muscles, cricothyroid and the inferior constrictor, and the carotid arteries up to the bifurcation. The rest: inferior thyroid arteries and thyrocervical trunks, subclavian arteries and aortic arch, the jugular, brachiocephalic and superior thyroid veins, the vagus nerves, and level VI and lower jugular nodes. "Surrounding" adds sternocleidomastoid and C5–T1.
  - **Drawn structures**: Z-Anatomy has no recurrent or superior laryngeal nerves, superior thyroid artery, or middle and inferior thyroid veins. The exporter draws them on its anatomy:
    - the right recurrent nerve hooks under the subclavian artery and runs obliquely; the left hooks under the arch and climbs vertically in the tracheo-oesophageal groove; both enter the larynx behind the cricothyroid joint
    - the external branch of the superior laryngeal nerve runs to cricothyroid
    - the superior thyroid artery runs from the external carotid to the upper pole
  - The Z-Anatomy gland sits a little higher on the larynx than in most people; the notes say so.
- **Structures**: notes on every structure. Berry's ligament, the tubercle of Zuckerkandl and the non-recurrent laryngeal nerve have notes only. Topics covered: Cernea's external-branch types, parathyroid embryology and position (Akerström), and Simon's triangle.
- **Surgery**: a 10-step total thyroidectomy with nerve monitoring, and its complications, including bedside haematoma release.
- **Figures**: an original posterior-view diagram of the nerves, arteries, parathyroids and Berry's ligament. **Quiz**: six questions.
- **References**: Randolph's textbook, Cernea 1992, Akerström 1984, Pelizzo 1998, Toniato 2004, the international monitoring guideline (Randolph 2011), the ATA central neck dissection consensus (Carty 2009), Robbins 2002 and 2008, Gray's, Scott-Brown's and Shah.

## What's in the larynx module

- **3D model** from Z-Anatomy:
  - Cartilages: thyroid, cricoid, arytenoids with corniculates, the perforated epiglottis, hyoid and upper trachea.
  - Membranes: thyrohyoid, cricothyroid and quadrangular.
  - Intrinsic muscles, each selectable: posterior and lateral cricoarytenoid, interarytenoid, thyroarytenoid and cricothyroid.
  - Optional layers add the strap muscles and constrictors, and the laryngopharynx, tongue base, thyroid and C3–C6.
  - Also the carotids, inferior thyroid arteries, jugular and superior thyroid veins, and the vagus nerves.
  - The "From above" view button looks down into the larynx as at laryngoscopy. A region model can rename its view buttons with `viewLabels`.
- **Drawn structures**: Z-Anatomy has no vocal or vestibular folds, so the exporter draws them. The vocal folds run from the inner thyroid angle to each arytenoid's vocal process, and the vestibular folds sit above them with the ventricle between. It also draws the superior laryngeal nerve and its branches, the ends of the recurrent laryngeal nerves, and the superior thyroid and superior laryngeal arteries.
- **Structures**: notes on every structure. The conus elasticus, pre-epiglottic and paraglottic spaces, and lymphatic drainage by subsite have notes only. Topics include the vocal fold layers (Hirano), muscle actions and nerve supply, and emergency front-of-neck access through the cricothyroid membrane.
- **Surgery**: a 10-step total laryngectomy, including primary tracheo-oesophageal puncture, and its complications.
- **Figures**: original diagrams of the larynx seen at laryngoscopy and a coronal section of the subsites. **Quiz**: six questions.
- **References**: Gray's, Scott-Brown's, Shah, Hirano 1974, Tucker & Smith 1962, Difficult Airway Society 2015, the European Laryngological Society cordectomy classification (Remacle 2000), Singer & Blom 1980, Paydarfar 2006, Cernea 1992 and AJCC 8th edition.

## What's in the carotid triangle module

- **3D model**: the right carotid triangle from Z-Anatomy, with a translucent marker of the triangle itself. It includes:
  - the common, internal and external carotids, with the facial, occipital and ascending pharyngeal arteries
  - the facial, lingual, superior thyroid, retromandibular and external jugular veins
  - the hypoglossal, accessory and glossopharyngeal nerves and the sympathetic trunk
  - sternocleidomastoid, digastric, stylohyoid, the strap muscles, hyoglossus, mylohyoid and the constrictors
  - the mandible, temporal bone, hyoid and larynx, and level II and III nodes; the glands and spine are an optional layer
- **Drawn structures**: Z-Anatomy has no lingual artery, ansa cervicalis, superior thyroid or superior laryngeal artery, or superior laryngeal nerve, so the exporter draws them.
- **Redrawn structures**: at the right bifurcation Z-Anatomy places the internal jugular vein and vagus medial to the carotids, and the loop of the hypoglossal nerve medial to the external carotid. The exporter redraws these segments in their usual positions: the vein lateral, the vagus behind between artery and vein, and XII crossing superficial to both carotids under the occipital artery. The common facial vein is redrawn too. The notes for these structures say they were redrawn.
- **Structures**: notes on every structure. The carotid sinus and carotid body have notes only, including Shamblin's groups for carotid body tumours.
- **Surgery**: a 10-step carotid endarterectomy, from incision to the clamp and release order and patch closure, with complications.
- **Figures**: an original diagram of the triangle's boundaries and contents. **Quiz**: six questions.
- **References**: NASCET 1991, ECST 1998, Rothwell 2004, GALA 2008, ESVS 2023, Shamblin 1971, Rutherford's, Gray's and Shah.

## What's in the skull base module

- **3D model** from Z-Anatomy:
  - Bones of both sides, with the vault removed: occipital, sphenoid, temporal, ethmoid and the orbital plates of the frontal bone. Optional layers add the facial skeleton, mandible, C1–C2 and the tentorium.
  - The brainstem, optic chiasm and tracts, and the pituitary.
  - Right-sided nerves: cranial nerves I–XII with V1–V3, the lingual, inferior alveolar and chorda tympani nerves.
  - Right-sided arteries: the internal carotid and vertebral arteries, the basilar artery, the posterior, middle and anterior cerebral arteries and the cerebellar arteries, and the ophthalmic, middle meningeal and maxillary arteries.
  - Right-sided veins: the cavernous, petrosal, transverse and sigmoid sinuses and the jugular bulb.
  - "From above" and "From below" views; from above, anterior is at the top.
- **Foramina layer**: pins on every foramen and canal. Where Z-Anatomy has a label anchor (foramen magnum, ovale, rotundum, spinosum, optic, hypoglossal, condylar and pterygoid canals) its point is used. The rest are found where the nerve or vessel passing through them meets the bone:
  - jugular foramen and cribriform plate: the nearest point to the bone
  - carotid canal and internal acoustic meatus: the first point inside the bone
  - foramen lacerum and stylomastoid foramen: the last point inside the bone
  - superior orbital fissure: the nearest point to the sphenoid
- **Structures**: notes on every structure and foramen, with what passes through each. Every nerve and the main vessels have a course with origin, foramina and branches.
- **Surgery**: a 9-step endoscopic endonasal transsphenoidal approach to the pituitary, with complications.
- **Figures**: an original diagram of the internal skull base with the foramina and their contents. **Quiz**: six questions.
- **References**: Rhoton, Bouthillier 1996, Cappabianca 2004, Hadad 2006, Fisch 1978, Gray's and Scott-Brown's.

## CT / MRI cross-sections

The CT / MRI tab (`js/sections.js`) cuts the current region's 3D model with an axial, coronal or sagittal plane:

- The cut surface of every structure is filled by stencil capping and shaded as **CT** (soft-tissue window, contrast-filled vessels), **T1 MRI** (bright fat, dark flow voids) or **anatomy colours**.
- Orientation follows radiology convention: axial viewed from the feet with the patient's right on the image left; R/L/A/P/S/I markers and a 1 cm scale bar are shown.
- Structures on the slice are labelled, with vessels and nerves first. Hover names any structure; clicking selects it in the 3D view.
- The 3D model stays whole, and the slice is drawn on it as a moving outline (the cursor). Ticking "Cut away the 3D model" removes everything above the slice instead.
- These are **simulations from the model, not patient imaging**. Fat and skin aren't modelled; the body outline is estimated from the structures the slice cuts (convex hull grown by 6 mm).

### Real CT and MRI (Visible Human)

The same tab has **Real CT** and **Real MRI** modes showing scans of the Visible Human male from the U.S. National Library of Medicine. This is the body BodyParts3D, and so Z-Anatomy, was built from.

- **Real CT** (post-mortem, no contrast; axial, plus coronal and sagittal reconstructions; soft-tissue and bone windows) is **matched to the model slice**:
  - **Global fit:** `tools/register_vhp_ct.py` registers the model's skeleton to the CT skeleton by ICP: median bone surface distance 1.5 mm, 90th percentile 5.9 mm, 3° rotation.
  - **Per-region refinement:** `tools/refine_vhp_registration.py` re-fits each region on its own bones and keeps the result where it is clearly better. Thyroid: 2.9 → 1.7 mm. Larynx: 1.4 → 1.1 mm. The other regions were already about 1 mm.
  - **Display:** the app picks the CT slice at the model slice's level and shows the whole body cross-section, framed from boxes recorded by `tools/add_ct_body_boxes.py`.
  - **Labels, hover and outlines** come from the registered model, so treat them as approximate for soft tissue.
- **Real MRI** (T1 and T2, axial and coronal) is a separate scan that isn't registered to the model; browse it with the slider.
- Data: NCI Imaging Data Commons collection `nlm_visible_human_project` (patient VHP-M), used under the National Library of Medicine terms and conditions (May 21, 2019). Credit: *Courtesy of the U.S. National Library of Medicine.*

To regenerate `data/scans/`:

```
pip install idc-index pydicom scipy pillow
# 1. Download VHP-M from the Imaging Data Commons with idc-index: the 844-slice CT series
#    and the MR series "T1 AXIAL", "AXIAL T2", "T1 CORONAL", "T2 CORONAL NECK" (into MR_ROOT/MR_<uid>/).
python tools/export_model_bones.py Z-Anatomy/Startup.blend model_bone_mm.npy      # needs bpy
python tools/register_vhp_ct.py CT_SERIES_DIR model_bone_mm.npy WORK_DIR
python tools/export_vhp_scans.py WORK_DIR MR_ROOT data/scans
python tools/add_ct_body_boxes.py data/scans
python tools/refine_vhp_registration.py WORK_DIR data/scans/vhp-scans.js data/*-meshes.js
```

## Project layout

```
index.html                     page shell
styles.css                     styles (light and dark mode)
js/catalog.js                  list of regions and the scripts each one loads on first use
data/<region>.js               all text content for a region: structures, steps, quiz, references
data/<region>-meshes.js        packed 3D meshes (generated; CC BY-SA, see below)
js/models/<region>-model.js    camera, view angles and tissue type per structure
js/viewer.js                   Three.js viewer: mesh decoding, camera controls, picking, labels, layers, materials
js/sections.js                 CT / MRI-style cross-sections through the 3D model
js/scans.js                    real Visible Human CT (registered to the model) and MRI
data/scans/                    CT and MRI slice sprite sheets and manifest (generated)
tools/export_vhp_scans.py      exports the Visible Human scans for the app
tools/export_zanatomy.py       exports each region's meshes from the Z-Anatomy Blender file
js/figures.js                  inline SVG diagrams
js/app.js                      UI: tabs, cards, walkthrough, quiz
vendor/three.min.js            Three.js r159 (MIT)
```

## Adding a region

1. Copy `data/submandibular.js` to `data/<region>.js` and register it as `window.ANATOMY.regions.<region>`.
2. Add an entry to `REGIONS` in `tools/export_zanatomy.py` (app id → Z-Anatomy object names, centre, curve thickness, clipping) and export to `data/<region>-meshes.js`.
3. Add `js/models/<region>-model.js` with the region's camera, view angles and tissue types (copy an existing one).
4. Add the region and its three scripts to `js/catalog.js`. It then appears in the region picker, and `index.html#<region>` opens it directly.

### Regenerating the meshes

```
pip install bpy                      # Blender as a Python module (Python 3.13)
git clone https://github.com/Z-Anatomy/models-of-human-anatomy
unzip models-of-human-anatomy/Z-Anatomy.zip Z-Anatomy/Startup.blend
python tools/export_zanatomy.py Z-Anatomy/Startup.blend submandibular data/submandibular-meshes.js
python tools/export_zanatomy.py Z-Anatomy/Startup.blend parotid data/parotid-meshes.js
python tools/export_zanatomy.py Z-Anatomy/Startup.blend lateral_neck data/lateral-neck-meshes.js
python tools/export_zanatomy.py Z-Anatomy/Startup.blend thyroid data/thyroid-meshes.js
python tools/export_zanatomy.py Z-Anatomy/Startup.blend larynx data/larynx-meshes.js
python tools/export_zanatomy.py Z-Anatomy/Startup.blend carotid data/carotid-meshes.js
python tools/export_zanatomy.py Z-Anatomy/Startup.blend skull_base data/skull-base-meshes.js
```

## Licensing and credits

- **3D meshes** (`data/*-meshes.js`): [Z-Anatomy](https://www.z-anatomy.com), CC BY-SA 4.0, based on BodyParts3D © The Database Center for Life Science, CC BY-SA 2.1 JP (Mitsuhashi N, et al. *Nucleic Acids Res.* 2009;37:D782–5). Anything derived from these meshes must keep the attribution and the same licence.
- **CT and MRI** (`data/scans/`): Visible Human Project, courtesy of the U.S. National Library of Medicine (National Library of Medicine terms and conditions, May 21, 2019), obtained through the NCI Imaging Data Commons.
- **Three.js** (`vendor/`): MIT.
- **Text, diagrams and code**: original to this project.

Do not add images from copyrighted atlases (Netter, Grant's, modern Gray's, Rohen, surgical atlases). Cite them as references instead. Other open sources: Gray's Anatomy (1918) illustrations are public domain; for Wikimedia Commons and Radiopaedia, check each image's licence.

## Roadmap

- More regions: posterior triangle, deep neck spaces, infratemporal fossa, temporal bone
- Contrast-enhanced, openly licensed clinical CT/MRI alongside the Visible Human scans
- Installable app with offline caching; later, packaging for the app stores
