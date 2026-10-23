// Content for the carotid triangle, right side. Each structure id matches a
// mesh id in data/carotid-meshes.js (structures without a mesh show a note).

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.carotid = {
  id: "carotid",
  title: "Carotid triangle",
  subtitle: "Carotid bifurcation, jugular vein and the nerves around them, both sides (courses traced on the right)",

  overview: {
    intro:
      "The carotid triangle is the part of the anterior triangle of the neck above the omohyoid. It holds the carotid bifurcation and the start of the external carotid branches, the internal jugular vein and its tributaries, and the vagus, hypoglossal and accessory nerves with the ansa cervicalis. It is the field for carotid endarterectomy, carotid body tumour excision, and the upper part of a neck dissection. The vessels here are easy to feel and reach, but cranial nerves cross the field close to them.",
    boundaries: [
      { label: "Superior", text: "Posterior belly of digastric (with stylohyoid)" },
      { label: "Anteroinferior", text: "Superior belly of omohyoid" },
      { label: "Posterior", text: "Anterior border of sternocleidomastoid" },
      { label: "Roof", text: "Skin, platysma and the investing layer of deep cervical fascia" },
      { label: "Floor", text: "Thyrohyoid, hyoglossus, and the middle and inferior constrictors" }
    ],
    contents: [
      "Common carotid bifurcation, internal carotid (no branches in the neck) and external carotid with its first branches: superior thyroid, lingual, facial, occipital, ascending pharyngeal",
      "Internal jugular vein with the common facial, lingual and superior thyroid veins",
      "Vagus nerve in the carotid sheath; superior laryngeal nerve deep to the carotids",
      "Hypoglossal nerve crossing the carotids; ansa cervicalis on the sheath",
      "Accessory nerve in the upper corner; sympathetic trunk behind the sheath",
      "Deep cervical (level II and III) lymph nodes, including the jugulodigastric node"
    ],
    keyPoints: [
      "The bifurcation is usually at the upper border of the thyroid cartilage (C3–C4) but its height varies.",
      "The external carotid is usually anteromedial to the internal carotid at its origin and is the only one with branches in the neck. Identify it by its branches before ligating.",
      "The common facial vein crosses the bifurcation superficially; dividing it opens the field.",
      "The hypoglossal nerve crosses the internal and external carotids superficially, often 1–3 cm above the bifurcation, tethered by the sternocleidomastoid branch of the occipital artery.",
      "The vagus lies behind, between the common carotid and the jugular vein. The superior laryngeal nerve runs deep to both carotids."
    ],
    refs: ["gray", "shah", "rutherford"]
  },

  layers: [
    { id: "superficial", label: "Platysma", defaultOn: false },
    { id: "membrane", label: "Triangle boundaries", defaultOn: true },
    { id: "bone", label: "Bone & larynx", defaultOn: true },
    { id: "muscle", label: "Muscles", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: true },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "lymph", label: "Lymph nodes", defaultOn: true },
    { id: "context", label: "Glands & spine", defaultOn: false }
  ],

  structures: [
    {
      id: "triangle",
      name: "Carotid triangle",
      layer: "membrane",
      summary: "A translucent marker of the triangle from Z-Anatomy, between the posterior belly of digastric, the superior belly of omohyoid and the anterior border of sternocleidomastoid.",
      relations: ["Above it is the submandibular triangle; below the omohyoid, the muscular triangle; behind sternocleidomastoid, the posterior triangle"],
      supply: {},
      surgical: ["An incision along the anterior border of sternocleidomastoid opens straight into it."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- arteries ----------
    {
      id: "cca",
      name: "Common carotid artery",
      layer: "artery",
      summary: "The right one arises from the brachiocephalic trunk behind the sternoclavicular joint and runs up in the carotid sheath, without branches, to divide at about the upper border of the thyroid cartilage.",
      relations: [
        "In the sheath: internal jugular vein lateral, vagus behind between the two",
        "Behind the sheath: the sympathetic trunk on the prevertebral fascia",
        "The ansa cervicalis lies on the front of the sheath"
      ],
      supply: {},
      surgical: [
        "It can be felt against the transverse process of C6 (carotid tubercle).",
        "In endarterectomy it is clamped below the plaque; the arteriotomy starts on it and runs up into the internal carotid."
      ],
      danger: ["Vagus nerve behind it, sometimes in front, when the sheath is opened"],
      variations: ["Bifurcation height varies widely; a high bifurcation makes distal exposure harder"],
      refs: ["gray", "rutherford"]
    },
    {
      id: "ica",
      name: "Internal carotid artery",
      layer: "artery",
      course: [
        { key: "cca", label: "Common carotid artery", text: "No branches in the neck." },
        { key: "bifurcation", label: "Bifurcation", text: "Usually at the upper border of the thyroid cartilage (C3–C4); the internal carotid lies posterolateral." },
        { key: "sinus", label: "Carotid sinus", text: "The dilated origin; baroreceptors supplied by the carotid sinus nerve of IX. Handling it can cause bradycardia." },
        { key: "digastric", label: "Deep to the posterior belly of digastric", text: "Keep the dissection below the digastric, or divide it for higher exposure." },
        { key: "skull", label: "To the carotid canal", text: "No branches in the neck: a branch identifies the external carotid." }
      ],
      summary: "Usually posterolateral to the external carotid at its origin. It has no branches in the neck and runs up to the carotid canal, deep to the posterior belly of digastric and the styloid muscles.",
      relations: [
        "Its first part is dilated as the carotid sinus",
        "The hypoglossal and (higher) glossopharyngeal nerves cross it superficially; the superior laryngeal nerve passes deep to it",
        "The internal jugular vein lies lateral to it"
      ],
      supply: { "Supplies": "Brain (with the vertebral arteries) and the eye" },
      surgical: [
        "Most carotid atheroma is at the bifurcation and the first 1–2 cm of the internal carotid.",
        "For a high plaque, more exposure comes from dividing the posterior belly of digastric, dividing the occipital artery to free XII, removing the styloid, or subluxing the mandible."
      ],
      danger: ["Emboli from plaque handling cause stroke: clamp it first and handle the bifurcation as little as possible before clamping"],
      variations: ["Coiling or kinking (common in older people); rarely medial to the external carotid at its origin"],
      refs: ["gray", "rutherford", "nascet"]
    },
    {
      id: "eca",
      name: "External carotid artery",
      layer: "artery",
      course: [
        { key: "origin", label: "Carotid bifurcation", text: "Usually anteromedial to the internal carotid at its origin." },
        { key: "sta", label: "Superior thyroid artery", text: "Usually the first branch, from the front, curving down to the thyroid. The ascending pharyngeal artery arises from the medial side near here (not pinned: the source model starts it higher)." },
        { key: "lingual", label: "Lingual artery", text: "Opposite the tip of the greater horn of the hyoid; loops up, crossed by XII." },
        { key: "facial", label: "Facial artery", text: "Above the lingual (often a shared linguofacial trunk), deep to digastric and stylohyoid." },
        { key: "occipital", label: "Occipital artery", text: "From the back, along the lower border of the posterior belly of digastric; XII hooks round it." },
        { key: "parotid", label: "Into the parotid", text: "Gives the posterior auricular artery and divides in the gland into the maxillary and superficial temporal arteries." }
      ],
      summary: "Usually anteromedial to the internal carotid at its origin. It gives the superior thyroid, lingual and facial arteries in front, the ascending pharyngeal from its medial side, and the occipital and posterior auricular behind, then enters the parotid.",
      relations: ["The hypoglossal nerve crosses it superficially; the superior laryngeal nerve and its external branch pass deep to it"],
      supply: { "Supplies": "Neck, face, scalp, tongue, pharynx and dura (middle meningeal)" },
      surgical: [
        "Before tying a carotid branch in an emergency, confirm it is the external carotid by seeing at least two branches.",
        "It can be ligated with little consequence because of rich anastomoses across the midline, but this rarely stops bleeding from its distal branches for long."
      ],
      danger: ["Mistaking the internal for the external carotid"],
      variations: ["A linguofacial trunk (lingual and facial arteries arising together) is common"],
      refs: ["gray", "shah"]
    },
    {
      id: "superior_thyroid_artery",
      name: "Superior thyroid artery",
      layer: "artery",
      drawn: true,
      course: [
        { key: "origin", label: "First branch of the external carotid", text: "Just above the bifurcation." },
        { key: "sla", label: "Superior laryngeal artery", text: "Runs medially with the internal laryngeal nerve to the thyrohyoid membrane." },
        { key: "pole", label: "Upper pole of the thyroid", text: "Ligate on the gland capsule to spare the external branch of the superior laryngeal nerve." }
      ],
      summary: "Usually the first branch of the external carotid, curving down to the upper pole of the thyroid with the external branch of the superior laryngeal nerve close by.",
      relations: ["Gives the superior laryngeal artery and the sternocleidomastoid artery"],
      supply: {},
      surgical: ["Controlled with a sling or clamp during endarterectomy, since it can back-bleed into the arteriotomy."],
      danger: ["External branch of the superior laryngeal nerve"],
      variations: ["Can arise from the bifurcation or the common carotid"],
      refs: ["gray"]
    },
    {
      id: "superior_laryngeal_artery",
      name: "Superior laryngeal artery",
      layer: "artery",
      drawn: true,
      summary: "Branch of the superior thyroid artery that pierces the thyrohyoid membrane with the internal laryngeal nerve.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "lingual_artery",
      name: "Lingual artery",
      layer: "artery",
      drawn: true,
      summary: "Arises from the external carotid opposite the tip of the greater horn of the hyoid, makes a short upward loop, then runs forward deep to hyoglossus.",
      relations: [
        "The hypoglossal nerve crosses its loop superficially and then runs on the outer surface of hyoglossus, above the artery",
        "Hyoglossus separates the artery (deep) from the nerve and submandibular duct (superficial)"
      ],
      supply: { "Supplies": "Tongue, floor of mouth, sublingual gland, tonsillar bed" },
      surgical: ["Can be ligated in the carotid triangle (or in Lesser's triangle) to control severe tongue bleeding."],
      danger: [],
      variations: ["Often shares a linguofacial trunk with the facial artery"],
      refs: ["gray", "shah"]
    },
    {
      id: "facial_artery",
      name: "Facial artery",
      layer: "artery",
      summary: "Arises above the lingual, runs up deep to the posterior belly of digastric and stylohyoid, grooves the submandibular gland, then hooks round the mandible in front of masseter.",
      relations: [],
      supply: {},
      surgical: ["See the Submandibular module for its relation to the gland and the marginal mandibular nerve."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "occipital_artery",
      name: "Occipital artery",
      layer: "artery",
      summary: "Arises from the back of the external carotid opposite the facial artery and runs back along the lower border of the posterior belly of digastric.",
      relations: [
        "The hypoglossal nerve hooks round it near its origin",
        "Its sternocleidomastoid branch loops over the hypoglossal nerve and tethers it"
      ],
      supply: {},
      surgical: ["Dividing the sternocleidomastoid branch (and its vein) lets the hypoglossal nerve be lifted out of the way for high carotid exposure."],
      danger: ["Hypoglossal nerve"],
      variations: [],
      refs: ["gray", "rutherford"]
    },
    {
      id: "ascending_pharyngeal",
      name: "Ascending pharyngeal artery",
      layer: "artery",
      summary: "A small branch from the medial side of the external carotid near its origin, running up on the pharynx between the internal carotid and the pharyngeal wall.",
      relations: [],
      supply: { "Supplies": "Pharynx, soft palate, prevertebral muscles, middle ear and dura" },
      surgical: ["A common feeding vessel of carotid body and jugular paragangliomas."],
      danger: [],
      variations: ["May arise from the bifurcation or internal carotid"],
      refs: ["gray", "shamblin"]
    },
    {
      id: "carotid_sinus",
      name: "Carotid sinus",
      layer: "artery",
      summary: "The dilated first part of the internal carotid at the bifurcation. Baroreceptors in its wall report blood pressure through the carotid sinus nerve (of Hering, a branch of IX) to the brainstem.",
      relations: ["At the bifurcation, deep to the common facial vein"],
      supply: { "Nerve": "Carotid sinus nerve (glossopharyngeal), with vagal contributions" },
      surgical: [
        "Handling it can cause sudden bradycardia and hypotension. Stop, and infiltrate local anaesthetic around the bifurcation if it recurs.",
        "After endarterectomy, blood pressure can swing for a day or two while the reflex resets."
      ],
      danger: ["Reflex bradycardia and hypotension"],
      variations: [],
      refs: ["gray", "rutherford"]
    },
    {
      id: "carotid_body",
      name: "Carotid body",
      layer: "artery",
      summary: "A small chemoreceptor (a few millimetres) in the adventitia on the back of the bifurcation. It senses oxygen, carbon dioxide and pH.",
      relations: ["Supplied by small branches from the bifurcation or external carotid; innervated by the carotid sinus nerve"],
      supply: {},
      surgical: [
        "A carotid body tumour (paraganglioma) splays the internal and external carotids apart (the 'lyre sign' on angiography).",
        "Shamblin groups: I small and easily separated; II partly surrounding the vessels; III encasing them. Higher groups carry more risk of vessel and cranial nerve injury."
      ],
      danger: ["Cranial nerves X and XII and the internal carotid during tumour excision"],
      variations: ["More common in people living at high altitude; can be familial and bilateral"],
      refs: ["shamblin", "shah"]
    },

    // ---------- veins ----------
    {
      id: "ijv",
      name: "Internal jugular vein",
      layer: "vein",
      drawn: "redrawn",
      summary: "Lateral to the internal and common carotids in the carotid sheath, often overlapping the artery from the side. It is wide and thin-walled.",
      relations: [
        "Receives the common facial, lingual and superior thyroid veins in the triangle",
        "The accessory nerve crosses it high up, usually superficially, sometimes deep",
        "The jugulodigastric node lies on it just below the posterior belly of digastric"
      ],
      supply: {},
      surgical: ["Retract it laterally to expose the carotids. A tear is controlled with pressure, then repaired; ligation of one side is well tolerated."],
      danger: ["Air embolism if opened with the head up"],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "facial_vein",
      name: "Facial and common facial veins",
      layer: "vein",
      drawn: "redrawn",
      summary: "The facial vein joins the anterior division of the retromandibular vein to form the common facial vein, which crosses superficial to the carotid bifurcation to drain into the internal jugular vein.",
      relations: ["Lies directly over the bifurcation, often with the lingual vein joining it"],
      supply: {},
      surgical: ["Usually the first vessel ligated in carotid surgery; the bifurcation lies just beneath it."],
      danger: [],
      variations: ["Several separate veins instead of one trunk"],
      refs: ["gray", "rutherford"]
    },
    {
      id: "lingual_vein",
      name: "Lingual vein",
      layer: "vein",
      summary: "Drains the tongue into the common facial or internal jugular vein; one vena comitans runs with the hypoglossal nerve.",
      relations: [],
      supply: {},
      surgical: ["Veins accompanying the hypoglossal nerve bleed easily; control them with fine bipolar diathermy away from the nerve."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "superior_thyroid_vein",
      name: "Superior thyroid vein",
      layer: "vein",
      summary: "Runs with the superior thyroid artery into the internal jugular or common facial vein.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "retromandibular",
      name: "Retromandibular vein",
      layer: "vein",
      summary: "Leaves the lower pole of the parotid and divides; its anterior division joins the facial vein.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ejv",
      name: "External jugular vein",
      layer: "vein",
      summary: "Crosses sternocleidomastoid superficially, under platysma, outside the triangle.",
      relations: ["The great auricular nerve runs parallel and posterior to it"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- nerves ----------
    {
      id: "vagus",
      name: "Vagus nerve",
      aka: "Cranial nerve X",
      layer: "nerve",
      drawn: "redrawn",
      course: [
        { key: "top", label: "Below the skull base", text: "Behind the internal carotid artery and the internal jugular vein." },
        { key: "sln", label: "Superior laryngeal nerve", text: "Leaves the vagus high, from the inferior ganglion." },
        { key: "sheath", label: "Down the carotid sheath", text: "Posterior, between the artery and the vein; check it before clamping the sheath." }
      ],
      summary: "Runs down inside the carotid sheath, behind and between the carotid artery and the internal jugular vein.",
      relations: [
        "Gives the superior laryngeal nerve high in the neck, which passes deep to the carotids",
        "The carotid branches of the vagus join the sinus nerve at the bifurcation"
      ],
      supply: { "Motor": "Pharynx and larynx", "Sensory": "Larynx, pharynx and viscera", "Parasympathetic": "Heart, lungs, gut" },
      surgical: ["Open the sheath on the front of the artery and keep the vagus in view. A clamp across it, or traction, gives hoarseness from loss of its recurrent laryngeal fibres."],
      danger: ["Lies in front of the artery in a small minority"],
      variations: [],
      refs: ["gray", "rutherford"]
    },
    {
      id: "hypoglossal",
      name: "Hypoglossal nerve",
      aka: "Cranial nerve XII",
      layer: "nerve",
      drawn: "redrawn",
      course: [
        { key: "between", label: "Between the internal carotid and the jugular", text: "Descends from the skull base, deep to the posterior belly of digastric." },
        { key: "eca", label: "Hooks round the occipital artery and crosses the carotids", text: "Superficially, 1–2 cm above the bifurcation, just below the digastric. The sternocleidomastoid branch of the occipital artery tethers the nerve here; divide it to free XII." },
        { key: "ansa", label: "Gives off the superior root", text: "The superior root of the ansa (C1 fibres) leaves the nerve and runs down on the carotid sheath." },
        { key: "hyoglossus", label: "To hyoglossus", text: "Forward above the greater horn of the hyoid, toward the tongue." }
      ],
      summary: "Comes down between the internal carotid and the jugular vein, hooks round the occipital artery, crosses superficial to the internal and external carotids and the lingual artery loop, and runs forward above the hyoid onto hyoglossus.",
      relations: [
        "Tethered by the sternocleidomastoid branch of the occipital artery and its vein",
        "Gives the superior root of the ansa cervicalis as it crosses the carotids",
        "In the floor of the submandibular triangle it lies on hyoglossus below the submandibular duct"
      ],
      supply: { "Motor": "All muscles of the tongue except palatoglossus" },
      surgical: [
        "Look for it before dividing anything above the bifurcation. Dividing the sternocleidomastoid artery and vein lets it be lifted up; dividing the superior root of the ansa lets it move further.",
        "In the 3D model the loop round the carotids was redrawn because Z-Anatomy's nerve passes medial to the external carotid here."
      ],
      danger: ["Injury: the tongue deviates to the injured side on protrusion, with poor speech and swallowing. Injury on both sides can obstruct the airway."],
      variations: ["Crossing height varies, from just above the bifurcation to 3–4 cm higher"],
      refs: ["gray", "rutherford"]
    },
    {
      id: "ansa_cervicalis",
      name: "Ansa cervicalis",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "root", label: "Superior root", text: "Leaves the hypoglossal nerve as it curves forward round the occipital artery and across the carotids." },
        { key: "loop", label: "The loop on the sheath", text: "Joins the inferior root (C2–C3) low on the carotid sheath; twigs supply the strap muscles." }
      ],
      summary: "A nerve loop on the carotid sheath. The superior root (C1 fibres travelling with XII) runs down on the front of the sheath; the inferior root (C2–C3) curves round the lateral side of the jugular vein. They join low on the sheath.",
      relations: ["Branches from the loop supply sternohyoid, sternothyroid and the inferior belly of omohyoid; the superior root supplies the superior belly of omohyoid"],
      supply: { "Motor": "Infrahyoid (strap) muscles, except thyrohyoid (C1 via XII)" },
      surgical: [
        "The superior root lying on the carotid sheath leads up to the hypoglossal nerve; dividing it is harmless and frees XII.",
        "The ansa is a donor nerve for reinnervating a paralysed vocal fold."
      ],
      danger: [],
      variations: ["The loop may lie inside the carotid sheath or deep to the vein"],
      refs: ["gray", "rutherford"]
    },
    {
      id: "sln",
      name: "Superior laryngeal nerve",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "vagus", label: "Leaves the vagus", text: "From the inferior ganglion, high in the neck." },
        { key: "ica", label: "Deep to the internal carotid", text: "Runs down and forward medial to both carotid arteries." },
        { key: "division", label: "Divides", text: "Into the internal branch (sensory) and the external branch (to cricothyroid)." },
        { key: "membrane", label: "Pierces the thyrohyoid membrane", text: "The internal branch, with the superior laryngeal artery." }
      ],
      summary: "Leaves the vagus high in the neck and passes deep (medial) to both the internal and external carotids, dividing into the internal branch (to the thyrohyoid membrane) and the external branch.",
      relations: [],
      supply: { "Sensory (internal branch)": "Larynx above the vocal folds" },
      surgical: ["Not seen in a routine endarterectomy, but a clamp placed too high on the internal carotid or deep traction can injure it."],
      danger: ["Voice fatigue and aspiration after injury"],
      variations: [],
      refs: ["gray", "rutherford"]
    },
    {
      id: "ebsln",
      name: "External branch of the superior laryngeal nerve",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "origin", label: "From the superior laryngeal nerve", text: "Runs down on the inferior constrictor." },
        { key: "sta", label: "With the superior thyroid artery", text: "Deep to the artery; close to it near the upper pole." },
        { key: "cricothyroid", label: "Enters cricothyroid", text: "Injury lowers the voice's pitch and power." }
      ],
      summary: "Runs down deep to the superior thyroid artery to cricothyroid.",
      relations: [],
      supply: { "Motor": "Cricothyroid" },
      surgical: ["At risk when the superior thyroid artery is clamped or tied close to its origin."],
      danger: [],
      variations: [],
      refs: ["cernea"]
    },
    {
      id: "glossopharyngeal",
      name: "Glossopharyngeal nerve",
      aka: "Cranial nerve IX",
      layer: "nerve",
      summary: "Crosses the internal carotid superficially high up, near the styloid, above the hypoglossal nerve, then passes forward with stylopharyngeus.",
      relations: ["Gives the carotid sinus nerve, which runs down on the internal carotid to the bifurcation"],
      supply: { "Motor": "Stylopharyngeus", "Sensory": "Posterior tongue, pharynx, carotid sinus and body" },
      surgical: ["Only exposed in very high carotid dissections; injury causes troublesome dysphagia."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "accessory",
      name: "Accessory nerve",
      aka: "Cranial nerve XI",
      layer: "nerve",
      course: [
        { key: "foramen", label: "Jugular foramen", text: "Leaves the skull with IX and X." },
        { key: "ijv", label: "Crosses the internal jugular vein", text: "At C1, usually superficial to it, then enters the deep surface of sternocleidomastoid." },
        { key: "posterior", label: "Toward the posterior triangle", text: "Through or under sternocleidomastoid, then across the posterior triangle to trapezius." }
      ],
      summary: "Crosses the internal jugular vein high in the neck, usually superficially (in this model, deep to it), and enters the deep surface of sternocleidomastoid.",
      relations: [],
      supply: { "Motor": "Sternocleidomastoid and trapezius" },
      surgical: ["At the top of the incision, avoid deep retraction against sternocleidomastoid near the mastoid."],
      danger: [],
      variations: ["Passes deep to the internal jugular vein in a minority"],
      refs: ["gray", "shah"]
    },
    {
      id: "sympathetic",
      name: "Cervical sympathetic trunk",
      layer: "nerve",
      summary: "Lies behind the carotid sheath on the prevertebral fascia, with the large superior cervical ganglion at C2–C3.",
      relations: [],
      supply: {},
      surgical: ["Dissection behind the carotid, as for large carotid body tumours, can injure it and cause Horner's syndrome."],
      danger: ["Horner's syndrome"],
      variations: [],
      refs: ["gray"]
    },

    // ---------- muscles ----------
    {
      id: "scm",
      name: "Sternocleidomastoid",
      layer: "muscle",
      summary: "Its anterior border is the posterior boundary of the triangle and the line of the endarterectomy incision.",
      relations: ["Supplied by the sternocleidomastoid branches of the superior thyroid and occipital arteries"],
      supply: { "Nerve": "Accessory nerve" },
      surgical: ["Retract it laterally after dividing the investing fascia along its anterior border."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "digastric",
      name: "Digastric (posterior belly)",
      layer: "muscle",
      summary: "The upper boundary of the triangle. The hypoglossal nerve, external carotid and facial artery pass deep to it.",
      relations: ["The occipital artery runs back along its lower border"],
      supply: { "Nerve": "Facial nerve (posterior belly)" },
      surgical: ["Dividing it improves exposure of the distal internal carotid."],
      danger: ["Above it: the facial nerve trunk, internal jugular vein and cranial nerves IX–XII at the skull base"],
      variations: [],
      refs: ["gray", "rutherford"]
    },
    {
      id: "stylohyoid",
      name: "Stylohyoid",
      layer: "muscle",
      summary: "Runs with the posterior belly of digastric along the upper boundary.",
      relations: [],
      supply: { "Nerve": "Facial nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "omohyoid",
      name: "Omohyoid (superior belly)",
      layer: "muscle",
      summary: "The anteroinferior boundary of the triangle; it crosses the carotid sheath at about the level of the cricoid.",
      relations: [],
      supply: { "Nerve": "Ansa cervicalis" },
      surgical: ["Can be divided to reach the common carotid lower down."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sternohyoid",
      name: "Sternohyoid",
      layer: "muscle",
      summary: "Medial to the omohyoid, below the triangle.",
      relations: [],
      supply: { "Nerve": "Ansa cervicalis" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "thyrohyoid",
      name: "Thyrohyoid",
      layer: "muscle",
      summary: "Part of the floor of the triangle.",
      relations: [],
      supply: { "Nerve": "C1 fibres via the hypoglossal nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hyoglossus",
      name: "Hyoglossus",
      layer: "muscle",
      summary: "Part of the floor of the triangle above the hyoid. The hypoglossal nerve runs on its outer surface; the lingual artery runs deep to it.",
      relations: [],
      supply: { "Nerve": "Hypoglossal nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "mylohyoid",
      name: "Mylohyoid",
      layer: "muscle",
      summary: "Floor of the mouth, in front of the triangle (submandibular region).",
      relations: [],
      supply: { "Nerve": "Nerve to mylohyoid (V3)" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "constrictors",
      name: "Middle and inferior constrictors",
      layer: "muscle",
      summary: "The deep floor of the triangle. The superior laryngeal nerve and the ascending pharyngeal artery lie on them.",
      relations: [],
      supply: { "Nerve": "Pharyngeal plexus" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "platysma",
      name: "Platysma",
      layer: "superficial",
      summary: "Part of the roof; divided in line with the incision.",
      relations: [],
      supply: { "Nerve": "Cervical branch of the facial nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- bone and context ----------
    {
      id: "mandible",
      name: "Mandible",
      layer: "bone",
      summary: "Its angle lies just above the upper end of the triangle.",
      relations: [],
      supply: {},
      surgical: ["Curving the upper end of the incision back towards the mastoid keeps it away from the marginal mandibular nerve."],
      danger: ["Marginal mandibular nerve below the angle"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "temporal",
      name: "Temporal bone (mastoid and styloid)",
      layer: "bone",
      summary: "The mastoid gives origin to the posterior belly of digastric; the styloid lies deep to it, lateral to the internal carotid.",
      relations: [],
      supply: {},
      surgical: ["Removing the styloid process improves exposure of the internal carotid near the skull base."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hyoid",
      name: "Hyoid bone",
      layer: "bone",
      summary: "The tip of its greater horn is a landmark for the lingual artery origin and the hypoglossal nerve.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "larynx",
      name: "Thyroid and cricoid cartilages",
      layer: "bone",
      summary: "The upper border of the thyroid cartilage marks the usual level of the carotid bifurcation.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "vertebrae",
      name: "Vertebrae C3–C5",
      layer: "context",
      summary: "The sympathetic trunk and longus colli lie in front of them, behind the carotid sheath.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "smg",
      name: "Submandibular gland",
      layer: "context",
      summary: "Overlaps the upper front corner of the triangle from the submandibular triangle.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "parotid",
      name: "Parotid gland (tail)",
      layer: "context",
      summary: "Its tail lies over the upper end of sternocleidomastoid, near the top of the incision.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "thyroid",
      name: "Thyroid gland",
      layer: "context",
      summary: "Its upper pole lies below and medial to the triangle.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- lymph ----------
    {
      id: "nodes_ii",
      name: "Level II nodes",
      aka: "Including the jugulodigastric node",
      layer: "lymph",
      summary: "Upper deep cervical nodes along the internal jugular vein from the skull base to the level of the hyoid. The jugulodigastric node lies where the posterior belly of digastric crosses the vein.",
      relations: [],
      supply: {},
      surgical: ["The jugulodigastric node drains the tonsil and is often the first node enlarged in tonsillar and oropharyngeal cancer."],
      danger: ["Accessory nerve in level IIB"],
      variations: [],
      refs: ["robbins2002", "shah"]
    },
    {
      id: "nodes_iii",
      name: "Level III nodes",
      layer: "lymph",
      summary: "Middle deep cervical nodes along the vein from the hyoid down to the cricoid.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["robbins2002"]
    }
  ],

  // Incisions drawn on the model at the surgery steps that name them (step.incision):
  // control points in app space, laid onto the outer surface along "axis" or "toward".
  incisions: [
    {"id": "carotid", "name": "Incision along sternocleidomastoid", "note": "Along its anterior border, centred on the bifurcation (marked on duplex or CT); a transverse skin-crease incision is an alternative for a low bifurcation.", "points": [[-1.63, 3.11, 0.15], [-0.79, 1.11, 1.24], [-0.18, -0.89, 2.21], [-0.15, -2.89, 2.75], [0.83, -4.89, 3.35], [1.33, -6.39, 3.86]], "axis": [3.0, -1.6]}
  ],

  procedure: {
    title: "Carotid endarterectomy",
    atRisk: [{"id": "hypoglossal", "why": "Crosses the top of the exposure: tongue weakness and deviation"}, {"id": "vagus", "why": "In the sheath behind the arteries: hoarseness (recurrent laryngeal fibres)"}, {"id": "sln", "why": "Behind the internal and external carotids: weak, tiring voice"}, {"id": "glossopharyngeal", "why": "At risk with high exposure: difficult swallowing"}, {"id": "carotid_sinus", "why": "Handling it slows the heart and drops the blood pressure"}, {"id": "ica", "why": "Clamp gently and flush before closing: plaque or air can embolise to the brain"}],
    steps: [
      {
        title: "Position and incision", incision: "carotid",
        text: "Supine, neck extended and turned slightly away. General or local anaesthesia (similar outcomes in the GALA trial; local lets the surgeon check the awake patient while clamped). Incise along the anterior border of sternocleidomastoid, centred on the bifurcation, curving the upper end back towards the mastoid.",
        show: ["superficial", "bone", "muscle", "membrane"],
        focus: ["scm", "platysma", "mandible", "triangle"]
      },
      {
        title: "Open the investing fascia",
        text: "Divide platysma and the investing fascia along sternocleidomastoid and retract the muscle laterally. Avoid the great auricular nerve at the top and the marginal mandibular nerve near the angle.",
        show: ["bone", "muscle", "vein", "membrane"],
        focus: ["scm", "ejv", "parotid"]
      },
      {
        title: "Common facial vein",
        text: "Find the internal jugular vein. Ligate and divide the common facial vein, which crosses the bifurcation, and retract the jugular vein laterally.",
        show: ["bone", "muscle", "artery", "vein"],
        focus: ["facial_vein", "ijv"]
      },
      {
        title: "Open the sheath",
        text: "Open the carotid sheath on the front of the common carotid. Follow the superior root of the ansa cervicalis up to the hypoglossal nerve; it can be divided. Keep the vagus, behind between artery and vein, in view.",
        show: ["bone", "muscle", "artery", "vein", "nerve"],
        focus: ["cca", "ansa_cervicalis", "vagus"]
      },
      {
        title: "Expose the bifurcation",
        text: "Dissect the common, internal and external carotids and the superior thyroid artery with minimal handling of the bifurcation. If the heart slows, stop and infiltrate local anaesthetic round the carotid sinus. Pass slings round each vessel.",
        show: ["bone", "muscle", "artery", "nerve"],
        focus: ["cca", "ica", "eca", "superior_thyroid_artery"]
      },
      {
        title: "Hypoglossal nerve and distal control",
        text: "Find the hypoglossal nerve crossing the carotids. Divide the sternocleidomastoid artery and vein that tether it so it can be lifted. Expose the internal carotid well beyond the end of the plaque, where it feels soft.",
        show: ["bone", "muscle", "artery", "vein", "nerve"],
        focus: ["hypoglossal", "occipital_artery", "ica", "digastric"]
      },
      {
        title: "Heparin and clamps",
        text: "Give systemic heparin. Clamp the internal carotid first, so debris cannot be flushed up to the brain, then the common carotid, then the external carotid and superior thyroid artery.",
        show: ["bone", "artery", "nerve"],
        focus: ["ica", "cca", "eca", "superior_thyroid_artery"]
      },
      {
        title: "Arteriotomy and shunt",
        text: "Open the front of the common carotid and carry the incision through the bulb into the internal carotid beyond the plaque. Insert a shunt routinely, or selectively by awake testing, stump pressure or monitoring.",
        show: ["bone", "artery", "nerve"],
        focus: ["cca", "ica"]
      },
      {
        title: "Endarterectomy",
        text: "Develop the plane in the media and lift the plaque out. Divide it cleanly at the common carotid and evert it out of the external carotid. The distal end in the internal carotid must feather off smoothly; tack down any loose edge so a flap cannot lift. Remove every loose fragment.",
        show: ["bone", "artery", "nerve"],
        focus: ["ica", "eca", "cca"]
      },
      {
        title: "Patch, flush and close",
        text: "Close with a patch, which reduces restenosis. Before the last sutures, back-bleed and flush. Release the external carotid first, then the common carotid, so any debris goes into the external carotid, and the internal carotid last. Check haemostasis and close in layers.",
        show: ["bone", "muscle", "artery", "vein", "nerve"],
        focus: ["eca", "cca", "ica", "hypoglossal", "vagus"]
      }
    ],
    complications: [
      "Stroke, from emboli during dissection or clamping, thrombosis at the site, or hyperperfusion. Guidelines expect perioperative stroke or death under about 6% for symptomatic and 3% for asymptomatic patients",
      "Nerve injury in a few percent, mostly temporary: cranial nerve branches (hypoglossal, vagus/recurrent laryngeal, marginal mandibular, superior laryngeal) and the great auricular nerve (cervical plexus)",
      "Neck haematoma, which can obstruct the airway; release it and return to theatre",
      "Hyperperfusion syndrome: headache, seizures or intracerebral haemorrhage after a tight stenosis is opened; control blood pressure",
      "Blood pressure instability from carotid sinus dysfunction; myocardial infarction",
      "Restenosis, patch infection or false aneurysm"
    ],
    refs: ["rutherford", "nascet", "ecst", "rothwell", "gala", "esvs"]
  },

  figures: [
    { id: "fig-carotid", title: "The right carotid triangle: boundaries and contents (lateral view)", svg: "carotidTriangle" }
  ],

  quiz: [
    {
      q: "Which vessel in the carotid triangle has no branches in the neck?",
      options: ["External carotid artery", "Internal carotid artery", "Superior thyroid artery", "Common facial vein"],
      answer: 1,
      explain: "The internal carotid gives no branches in the neck. Seeing branches is how the external carotid is confirmed before ligation."
    },
    {
      q: "Which vein usually has to be divided to expose the carotid bifurcation?",
      options: ["External jugular vein", "Common facial vein", "Anterior jugular vein", "Middle thyroid vein"],
      answer: 1,
      explain: "The common facial vein crosses the bifurcation superficially on its way to the internal jugular vein."
    },
    {
      q: "In carotid endarterectomy, the vessel clamped first is the:",
      options: ["Common carotid", "External carotid", "Internal carotid", "Superior thyroid"],
      answer: 2,
      explain: "Clamping the internal carotid first prevents debris loosened by clamping from passing up to the brain. It is released last."
    },
    {
      q: "After a carotid endarterectomy, the tongue deviates to the operated side on protrusion. Which nerve was injured?",
      options: ["Lingual nerve", "Glossopharyngeal nerve", "Hypoglossal nerve", "Marginal mandibular nerve"],
      answer: 2,
      explain: "The intact genioglossus on the other side pushes the tongue towards the weak side."
    },
    {
      q: "The superior laryngeal nerve passes which way relative to the carotid arteries?",
      options: ["Superficial to both", "Deep (medial) to both", "Between the internal and external carotids", "Lateral to the jugular vein"],
      answer: 1,
      explain: "It runs from the vagus deep to the internal and external carotids towards the larynx."
    },
    {
      q: "A neck mass splays the internal and external carotid arteries apart on imaging. The most likely diagnosis is:",
      options: ["Branchial cyst", "Carotid body tumour (paraganglioma)", "Jugulodigastric lymph node", "Pharyngeal pouch"],
      answer: 1,
      explain: "Carotid body tumours grow in the bifurcation and push the vessels apart (the lyre sign); Shamblin's groups describe how far they encase them."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapter on the neck.",
    shah: "Shah JP, Patel SG, Singh B, Wong RJ. Jatin Shah's Head and Neck Surgery and Oncology. 5th ed. Elsevier; 2019. Neck chapter.",
    rutherford: "Sidawy AN, Perler BA, eds. Rutherford's Vascular Surgery and Endovascular Therapy. 9th ed. Elsevier; 2019. Carotid endarterectomy chapter.",
    nascet: "North American Symptomatic Carotid Endarterectomy Trial Collaborators. Beneficial effect of carotid endarterectomy in symptomatic patients with high-grade carotid stenosis. N Engl J Med. 1991;325(7):445–453.",
    ecst: "European Carotid Surgery Trialists' Collaborative Group. Randomised trial of endarterectomy for recently symptomatic carotid stenosis: final results of the MRC European Carotid Surgery Trial (ECST). Lancet. 1998;351(9113):1379–1387.",
    rothwell: "Rothwell PM, Eliasziw M, Gutnikov SA, Warlow CP, Barnett HJ. Endarterectomy for symptomatic carotid stenosis in relation to clinical subgroups and timing of surgery. Lancet. 2004;363(9413):915–924.",
    gala: "GALA Trial Collaborative Group. General anaesthesia versus local anaesthesia for carotid surgery (GALA): a multicentre, randomised controlled trial. Lancet. 2008;372(9656):2132–2142.",
    esvs: "Naylor R, Rantner B, Ancetti S, et al. European Society for Vascular Surgery (ESVS) 2023 clinical practice guidelines on the management of atherosclerotic carotid and vertebral artery disease. Eur J Vasc Endovasc Surg. 2023;65(1):7–111.",
    shamblin: "Shamblin WR, ReMine WH, Sheps SG, Harrison EG Jr. Carotid body tumor (chemodectoma). Clinicopathologic analysis of ninety cases. Am J Surg. 1971;122(6):732–739.",
    cernea: "Cernea CR, Ferraz AR, Nishio S, Dutra A Jr, Hojaij FC, dos Santos LR. Surgical anatomy of the external branch of the superior laryngeal nerve. Head Neck. 1992;14(5):380–383.",
    robbins2002: "Robbins KT, Clayman G, Levine PA, et al. Neck dissection classification update: revisions proposed by the American Head and Neck Society and the American Academy of Otolaryngology–Head and Neck Surgery. Arch Otolaryngol Head Neck Surg. 2002;128(7):751–758."
  }
};
