// Content for the parotid region and the extracranial facial nerve.
// Each structure id matches a mesh id in data/parotid-meshes.js
// (structures without a mesh show a note in the app).

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.parotid = {
  id: "parotid",
  title: "Parotid & facial nerve",
  subtitle: "Parotid region and extracranial facial nerve, right side",

  overview: {
    intro:
      "The parotid is the largest salivary gland. It wraps round the ramus of the mandible in front of the ear and reaches deep towards the parapharyngeal space. The facial nerve enters it from behind, divides inside it, and fans out to the muscles of facial expression. Surgeons describe a superficial and a deep 'lobe' on either side of the nerve, but the gland is one structure. About 80% of the gland lies superficial to the nerve. Most parotid surgery means finding the facial nerve trunk first and then following its branches.",
    boundaries: [
      { label: "Superior", text: "Zygomatic arch and the external acoustic meatus" },
      { label: "Posterior", text: "Mastoid process and the anterior border of sternocleidomastoid" },
      { label: "Anterior", text: "Over masseter (the accessory parotid and duct extend further forward)" },
      { label: "Inferior", text: "The tail, between the angle of the mandible and sternocleidomastoid, above the posterior belly of digastric" },
      { label: "Deep", text: "Styloid process and its muscles, posterior belly of digastric, and the parapharyngeal space with the internal carotid artery, internal jugular vein and cranial nerves IX–XII" }
    ],
    contents: [
      "Facial nerve and its branches (most superficial)",
      "Retromandibular vein (intermediate)",
      "External carotid artery dividing into the maxillary and superficial temporal arteries (deepest)",
      "Intraglandular and superficial parotid lymph nodes",
      "Auriculotemporal nerve at the upper pole, with the superficial temporal vessels"
    ],
    keyPoints: [
      "From superficial to deep inside the gland: facial nerve, then retromandibular vein, then external carotid artery.",
      "Find the trunk before dividing any gland tissue over it. The landmarks are the tragal pointer, the posterior belly of digastric, the tympanomastoid suture and the styloid process.",
      "The trunk divides at the pes anserinus into an upper (temporofacial) and a lower (cervicofacial) division, which give five groups of branches: temporal, zygomatic, buccal, marginal mandibular and cervical.",
      "The temporal and marginal mandibular branches have the fewest cross-connections, so injury to them is least likely to recover."
    ],
    refs: ["gray", "scottbrown", "davis"]
  },

  layers: [
    { id: "superficial", label: "Platysma", defaultOn: false },
    { id: "bone", label: "Bone & ear", defaultOn: true },
    { id: "muscle", label: "Muscles", defaultOn: true },
    { id: "gland", label: "Gland & duct", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: true },
    { id: "nerve", label: "Facial nerve", defaultOn: true },
    { id: "deep", label: "Parapharyngeal", defaultOn: false },
    { id: "lymph", label: "Lymph nodes", defaultOn: true },
    { id: "context", label: "Face & deep muscles", defaultOn: false }
  ],

  structures: [
    // ---------- gland ----------
    {
      id: "parotid",
      name: "Parotid gland",
      layer: "gland",
      summary:
        "A serous salivary gland enclosed in a capsule from the investing layer of deep cervical fascia. It wraps round the posterior border of the ramus, with an accessory lobe often lying on masseter above the duct.",
      relations: [
        "Superficial: skin, superficial fascia, the great auricular nerve and the superficial parotid nodes",
        "Anteromedial: masseter, the ramus of the mandible and medial pterygoid",
        "Posteromedial: mastoid, sternocleidomastoid, the posterior belly of digastric and the styloid process with its muscles",
        "The deep part can pass through the stylomandibular tunnel into the parapharyngeal space"
      ],
      supply: {
        "Arterial": "Branches of the external carotid within the gland, mainly the transverse facial artery",
        "Venous": "Retromandibular vein",
        "Lymphatic": "Parotid nodes, then upper deep cervical nodes (level II)",
        "Parasympathetic (secretomotor)": "Inferior salivatory nucleus, glossopharyngeal nerve, tympanic nerve (Jacobson's), lesser petrosal nerve, otic ganglion, auriculotemporal nerve",
        "Sensory": "Auriculotemporal nerve (gland); great auricular nerve (capsule and overlying skin)"
      },
      surgical: [
        "About 80% of salivary gland tumours arise in the parotid and most are benign. Pleomorphic adenoma is the commonest.",
        "Pleomorphic adenomas have an incomplete capsule with finger-like extensions. Enucleation or capsule rupture leads to multifocal recurrence, so excise with a cuff of normal tissue.",
        "Deep lobe tumours can grow through the stylomandibular tunnel into the parapharyngeal space as 'dumbbell' tumours."
      ],
      danger: ["Facial nerve and all its branches"],
      variations: ["An accessory parotid gland along the duct on masseter is common"],
      refs: ["gray", "scottbrown", "shah"]
    },
    {
      id: "parotid_duct",
      name: "Parotid (Stensen's) duct",
      layer: "gland",
      summary:
        "About 5 cm long. It runs forward across masseter about a finger's breadth below the zygomatic arch, turns round the anterior border of masseter, pierces buccinator and opens opposite the upper second molar.",
      relations: [
        "Surface marking: the middle third of a line from the tragus to the midpoint between the ala of the nose and the upper lip",
        "Buccal branches of the facial nerve run alongside it; the transverse facial artery runs just above it"
      ],
      supply: {},
      surgical: [
        "A deep cheek laceration on this line may cut the duct and a buccal branch together. Check by cannulating the papilla; repair the duct over a stent to avoid a sialocele or fistula.",
        "Following a buccal branch along the duct is one way to find the nerve retrogradely."
      ],
      danger: ["Buccal branches of the facial nerve"],
      variations: [],
      refs: ["gray", "scottbrown"]
    },

    // ---------- facial nerve ----------
    {
      id: "facial_trunk",
      name: "Facial nerve trunk",
      aka: "Cranial nerve VII, from the stylomastoid foramen to the pes anserinus",
      layer: "nerve",
      course: [
        { key: "stylomastoid", label: "Stylomastoid foramen", text: "Leaves the skull between the styloid and mastoid processes." },
        { key: "posterior_auricular", label: "Posterior auricular nerve", text: "First extracranial branch, to the auricular muscles and occipitalis; branches to digastric and stylohyoid follow." },
        { key: "pes", label: "Pes anserinus", text: "Divides in the gland into the upper (temporofacial) and lower (cervicofacial) divisions." },
        { key: "temporal", label: "Temporal branch", text: "Over the zygomatic arch to frontalis (Pitanguy's line)." },
        { key: "zygomatic", label: "Zygomatic branch", text: "To orbicularis oculi: eye closure." },
        { key: "buccal", label: "Buccal branches", text: "Along the parotid duct to the cheek and upper lip; richly interconnected." },
        { key: "cervical", label: "Cervical branch", text: "Down to platysma." },
        { key: "mmn", label: "Marginal mandibular branch", text: "Along the lower border of the mandible to the lower lip depressors." }
      ],
      summary:
        "Leaves the skull through the stylomastoid foramen between the mastoid and styloid processes. It gives the posterior auricular, digastric and stylohyoid branches, then runs forward and slightly down into the gland, where it divides at the pes anserinus.",
      relations: [
        "About 1 cm deep and anterior-inferior to the tip of the tragal cartilage (the tragal pointer)",
        "At the same depth as the posterior belly of digastric, just above its upper border where it meets the mastoid",
        "Roughly 6–8 mm deep to where the tympanomastoid suture drops off",
        "Lateral (superficial) to the styloid process: go deep to the styloid and you have gone too far"
      ],
      supply: {
        "Motor": "Muscles of facial expression, posterior belly of digastric, stylohyoid, stapedius (inside the temporal bone)"
      },
      surgical: [
        "Find the trunk before dividing gland tissue over it. Use at least two landmarks to confirm, and a nerve stimulator or monitoring where available.",
        "If the trunk cannot be found safely (bulky tumour, revision surgery), find a peripheral branch and follow it back: the marginal mandibular branch where it crosses the facial vessels, a buccal branch along the duct, or the temporal branch over the arch. A mastoidectomy approach is the last resort."
      ],
      danger: [
        "Trunk injury paralyses the whole of that side of the face: brow, eye closure, smile and lower lip.",
        "Loss of eye closure puts the cornea at risk. Protect the eye early after any facial nerve injury."
      ],
      variations: ["The trunk is shallower in children, because the mastoid is small; take extra care with the incision and flap"],
      refs: ["gray", "scottbrown", "shah"]
    },
    {
      id: "temporal_branch",
      name: "Temporal (frontal) branch",
      layer: "nerve",
      summary: "Leaves the upper pole of the gland and crosses the zygomatic arch to supply frontalis, the upper orbicularis oculi and the auricular muscles.",
      relations: [
        "Crosses the arch in the superficial temporal fascia (temporoparietal fascia), below the superficial temporal artery's frontal branch",
        "Pitanguy's line: from 0.5 cm below the tragus to 1.5 cm above the lateral end of the eyebrow"
      ],
      supply: { "Motor": "Frontalis, upper orbicularis oculi, corrugator, anterior and superior auricular muscles" },
      surgical: ["Over the zygomatic arch, stay deep to the superficial temporal fascia (on the deep temporal fascia) or in the subcutaneous plane to avoid it."],
      danger: ["Injury gives a drooping brow that cannot be raised; few cross-connections, so recovery is less likely"],
      variations: ["Usually two to four rami cross the arch"],
      refs: ["pitanguy", "davis", "gray"]
    },
    {
      id: "zygomatic_branch",
      name: "Zygomatic branch",
      layer: "nerve",
      summary: "Runs forward across the zygoma to orbicularis oculi. The most important branch functionally, because it closes the eye.",
      relations: ["Above the parotid duct, close to the transverse facial artery"],
      supply: { "Motor": "Orbicularis oculi (especially the lower part), zygomaticus" },
      surgical: ["Rich interconnections with the buccal branches, so partial injuries often recover."],
      danger: ["Loss of eye closure (lagophthalmos) and exposure keratitis"],
      variations: [],
      refs: ["gray", "davis"]
    },
    {
      id: "buccal_branch",
      name: "Buccal branches (with the upper division)",
      layer: "nerve",
      summary: "Several branches run forward with the parotid duct to buccinator, the upper lip muscles and orbicularis oris. In this model the stem of the upper (temporofacial) division is included with them.",
      relations: ["Run alongside the parotid duct across masseter"],
      supply: { "Motor": "Buccinator, zygomaticus, levator labii, upper orbicularis oris, nasal muscles" },
      surgical: ["Many cross-connections, so isolated buccal branch injuries usually recover well."],
      danger: ["Weak cheek and upper lip: food collects in the vestibule"],
      variations: [],
      refs: ["gray", "davis"]
    },
    {
      id: "mmn",
      name: "Marginal mandibular branch (with the lower division)",
      layer: "nerve",
      summary: "Leaves the lower pole of the gland and runs forward along the lower border of the mandible, superficial to the facial vessels, to the lower lip depressors. In this model the stem of the lower (cervicofacial) division is included.",
      relations: [
        "Crosses superficial to the retromandibular vein in the lower gland",
        "Crosses superficial to the facial artery and vein at the anterior border of masseter"
      ],
      supply: { "Motor": "Depressor anguli oris, depressor labii inferioris, mentalis" },
      surgical: ["Following the lower division along the retromandibular vein is a reliable way down to this branch."],
      danger: ["Injury gives an asymmetric smile (the lower lip cannot be pulled down); few cross-connections"],
      variations: ["Dingman & Grabb found it above the lower border of the mandible behind the facial artery in 81% and up to 1 cm below it in 19%"],
      refs: ["dingman", "davis", "gray"]
    },
    {
      id: "cervical_branch",
      name: "Cervical branch",
      layer: "nerve",
      summary: "Leaves the lower pole and runs down into the neck deep to platysma, which it supplies.",
      relations: [],
      supply: { "Motor": "Platysma" },
      surgical: ["Often sacrificed when the lower pole is removed; the effect is small."],
      danger: ["Weak platysma can make the lower lip look weaker when smiling ('pseudo-marginal mandibular palsy')"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "posterior_auricular_nerve",
      name: "Posterior auricular branch",
      layer: "nerve",
      summary: "The first branch after the stylomastoid foramen. It runs up behind the ear to occipitalis and the posterior auricular muscles.",
      relations: [],
      supply: { "Motor": "Occipitalis, posterior and superior auricular muscles" },
      surgical: ["A small nerve running up from the trunk region behind the ear; it can lead you down to the trunk."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "great_auricular",
      name: "Great auricular nerve",
      aka: "C2, C3",
      layer: "nerve",
      drawn: true,
      summary: "Runs up across sternocleidomastoid to the ear lobe and the skin over the parotid. Its anterior branch enters the parotid fascia; its posterior branch goes to the back of the ear lobe.",
      relations: ["Parallel to and behind the external jugular vein, deep to platysma"],
      supply: { "Sensory": "Ear lobe, skin over the parotid and angle of the mandible" },
      surgical: [
        "Found on sternocleidomastoid when the posterior skin flap is raised. Keeping the posterior branch reduces ear lobe numbness.",
        "A good nerve graft source if the facial nerve has to be repaired."
      ],
      danger: ["Division numbs the ear lobe; neuroma is possible"],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "auriculotemporal",
      name: "Auriculotemporal nerve",
      aka: "Branch of the mandibular nerve (CN V3)",
      layer: "nerve",
      summary: "Runs behind the neck of the mandible and up with the superficial temporal vessels in front of the ear. It carries postganglionic parasympathetic fibres from the otic ganglion to the parotid.",
      relations: ["Emerges from the upper pole of the parotid behind the superficial temporal vessels"],
      supply: { "Sensory": "Skin of the temple, front of the ear and external acoustic meatus", "Secretomotor": "Parotid, via fibres from the otic ganglion" },
      surgical: [
        "Frey syndrome (gustatory sweating): after parotidectomy, cut secretomotor fibres can regrow into the sweat glands of the overlying skin, so the cheek sweats and flushes with eating. Thicker skin flaps, SMAS plication or a fat or fascial graft between gland bed and skin reduce it."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "frey", "scottbrown"]
    },

    // ---------- vessels ----------
    {
      id: "retromandibular",
      name: "Retromandibular vein",
      aka: "With the superficial temporal and maxillary veins",
      layer: "vein",
      summary: "Formed in the upper gland by the superficial temporal and maxillary veins. It runs down through the gland deep to the facial nerve, then divides: the anterior division joins the facial vein and the posterior joins the posterior auricular vein to form the external jugular.",
      relations: ["Deep to the facial nerve branches, superficial to the external carotid artery"],
      supply: {},
      surgical: ["The facial nerve's lower division and marginal mandibular branch cross superficial to it in the lower gland. Finding the vein shows you the plane of the nerve."],
      danger: ["Brisk bleeding if torn while dissecting the nerve; ligate it under direct vision"],
      variations: ["The facial nerve occasionally passes deep to it"],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "eca",
      name: "External carotid artery",
      layer: "artery",
      summary: "Enters the deep part of the gland and divides behind the neck of the mandible into the maxillary and superficial temporal arteries.",
      relations: ["The deepest of the three main structures in the gland"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sta",
      name: "Superficial temporal artery",
      layer: "artery",
      summary: "Leaves the upper pole of the gland, crosses the root of the zygoma in front of the ear and divides into frontal and parietal branches.",
      relations: ["The auriculotemporal nerve lies just behind it; the temporal branch of the facial nerve lies in front and deep"],
      supply: {},
      surgical: ["Its pulse just in front of the tragus is a landmark. Temporal artery biopsy (for giant cell arteritis) is done on its frontal branch."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "transverse_facial",
      name: "Transverse facial artery",
      layer: "artery",
      summary: "A branch of the superficial temporal artery running forward across masseter between the zygomatic arch and the parotid duct.",
      relations: ["Runs with the zygomatic and upper buccal branches of the facial nerve"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "maxillary_artery",
      name: "Maxillary artery",
      layer: "artery",
      summary: "The larger terminal branch of the external carotid. It runs forward deep to the neck of the mandible into the infratemporal fossa.",
      relations: [],
      supply: {},
      surgical: ["Bleeding from it when removing deep lobe tumours is hard to control. Ligate it under direct vision."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "occipital_artery",
      name: "Occipital artery",
      layer: "artery",
      summary: "Runs back along the lower border of the posterior belly of digastric, deep to the mastoid.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_artery",
      name: "Facial artery",
      layer: "artery",
      summary: "Crosses the lower border of the mandible at the anterior border of masseter, where the marginal mandibular branch crosses superficial to it.",
      relations: [],
      supply: {},
      surgical: ["A landmark for finding the marginal mandibular branch retrogradely."],
      danger: [],
      variations: [],
      refs: ["gray", "dingman"]
    },
    {
      id: "facial_vein",
      name: "Facial vein",
      layer: "vein",
      summary: "Joins the anterior division of the retromandibular vein below the angle of the mandible.",
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
      aka: "With the posterior auricular vein",
      layer: "vein",
      summary: "Formed below the gland by the posterior division of the retromandibular vein and the posterior auricular vein. It runs down across sternocleidomastoid.",
      relations: ["The great auricular nerve runs parallel to it, just behind"],
      supply: {},
      surgical: ["Seen when raising the posterior flap; a guide to the great auricular nerve."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ica",
      name: "Internal carotid artery",
      layer: "deep",
      summary: "In the parapharyngeal space, deep to the styloid process and its muscles.",
      relations: ["Separated from the deep lobe of the parotid by the styloid process and its muscles"],
      supply: {},
      surgical: ["Deep lobe and parapharyngeal tumours can displace or encase it; prestyloid tumours (mostly salivary) push it backwards, poststyloid tumours (nerve sheath, paraganglioma) push it forwards."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "ijv",
      name: "Internal jugular vein",
      layer: "deep",
      summary: "In the poststyloid parapharyngeal space, behind the internal carotid artery, with cranial nerves IX–XII.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "glossopharyngeal",
      name: "Glossopharyngeal nerve",
      aka: "Cranial nerve IX",
      layer: "deep",
      summary: "Leaves the jugular foramen and curves forward round stylopharyngeus. Its tympanic branch starts the secretomotor pathway to the parotid.",
      relations: [],
      supply: {},
      surgical: [],
      danger: ["Injury in parapharyngeal surgery affects swallowing and pharyngeal sensation"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "vagus",
      name: "Vagus nerve",
      aka: "Cranial nerve X",
      layer: "deep",
      summary: "Descends in the poststyloid parapharyngeal space between the internal carotid artery and internal jugular vein.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "accessory",
      name: "Accessory nerve",
      aka: "Cranial nerve XI",
      layer: "deep",
      summary: "Crosses the internal jugular vein just below the skull base, near the transverse process of the atlas, on its way to sternocleidomastoid.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hypoglossal",
      name: "Hypoglossal nerve",
      aka: "Cranial nerve XII",
      layer: "deep",
      summary: "Descends between the internal carotid artery and internal jugular vein, then curves forward below the posterior belly of digastric.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- muscles ----------
    {
      id: "masseter",
      name: "Masseter",
      layer: "muscle",
      summary: "Covers the ramus. The anterior part of the parotid and the accessory gland lie on it, and the duct crosses it.",
      relations: [],
      supply: { "Nerve": "Masseteric nerve (CN V3)" },
      surgical: ["The plane on its fascia is the floor of a superficial parotidectomy anteriorly; the branches lie just superficial to the fascia."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "scm",
      name: "Sternocleidomastoid",
      layer: "muscle",
      summary: "The gland's tail overlaps its anterior border below the mastoid.",
      relations: ["The great auricular nerve and external jugular vein run on its surface"],
      supply: { "Nerve": "Accessory nerve" },
      surgical: ["Separating the gland from its anterior border is an early step in finding the trunk."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "digastric_post",
      name: "Posterior belly of digastric",
      layer: "muscle",
      summary: "Arises from the mastoid notch. The facial nerve trunk lies at the same depth, just above its upper border near its origin.",
      relations: [],
      supply: { "Nerve": "Facial nerve" },
      surgical: ["Follow its upper border back towards the mastoid. The trunk lies just above it at the same depth."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "stylohyoid",
      name: "Stylohyoid and stylohyoid ligament",
      layer: "muscle",
      summary: "From the styloid process. The facial nerve trunk lies lateral to the base of the styloid.",
      relations: [],
      supply: { "Nerve": "Facial nerve" },
      surgical: ["Feeling the styloid process is a landmark: the trunk lies superficial (lateral) to it."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "platysma",
      name: "Platysma",
      layer: "superficial",
      summary: "Continues up as the SMAS over the parotid.",
      relations: [],
      supply: { "Nerve": "Cervical branch of the facial nerve" },
      surgical: ["The skin flap in parotidectomy is raised superficial to the parotid fascia, in or just deep to the subcutaneous fat."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "temporalis",
      name: "Temporalis",
      layer: "context",
      summary: "Inserts on the coronoid process deep to the zygomatic arch.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "pterygoids",
      name: "Pterygoid muscles",
      layer: "context",
      summary: "Medial and lateral pterygoids, medial to the ramus. The deep lobe of the parotid lies against medial pterygoid.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "stylopharyngeus",
      name: "Stylopharyngeus",
      layer: "context",
      summary: "From the styloid process to the pharynx. The glossopharyngeal nerve curves round it.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_muscles",
      name: "Muscles of facial expression",
      aka: "Frontalis, zygomaticus major, risorius, orbicularis oris, depressor anguli oris",
      layer: "context",
      summary: "Shown so you can follow each branch to its target muscles.",
      relations: [],
      supply: { "Nerve": "Facial nerve branches" },
      surgical: ["Test each group before and after surgery: raise eyebrows (temporal), close eyes tightly (zygomatic), puff cheeks and smile (buccal), show lower teeth (marginal mandibular)."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- glands, nodes, bones ----------
    {
      id: "smg",
      name: "Submandibular gland",
      layer: "gland",
      summary: "Shown for orientation below the angle of the mandible. A fascial band (the stylomandibular ligament) separates it from the parotid tail.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "parotid_nodes",
      name: "Parotid lymph nodes",
      aka: "Pre-auricular, infra-auricular, superficial and intraglandular",
      layer: "lymph",
      summary: "Nodes on and inside the gland. They drain the scalp, ear, forehead, eyelids and cheek, then into level II.",
      relations: [],
      supply: {},
      surgical: ["Metastatic cutaneous squamous cell carcinoma and melanoma of the scalp and face often spread here first; treatment is parotidectomy, usually with neck dissection."],
      danger: [],
      variations: [],
      refs: ["shah", "scottbrown"]
    },
    {
      id: "auricle",
      name: "Ear (auricle) and tragus",
      layer: "bone",
      summary: "The tragal cartilage points to the facial nerve trunk.",
      relations: ["The trunk lies about 1 cm deep and anterior-inferior to the tip of the tragal pointer"],
      supply: {},
      surgical: ["Dissect along the cartilage of the external meatus down to the pointer; the trunk lies beyond it, deep and slightly forward."],
      danger: [],
      variations: [],
      refs: ["scottbrown"]
    },
    {
      id: "temporal",
      name: "Temporal bone (mastoid and styloid)",
      layer: "bone",
      summary: "The stylomastoid foramen lies between the mastoid and styloid processes, behind the tympanic plate. The tympanomastoid suture runs down towards it.",
      relations: ["The trunk lies about 6–8 mm deep to the drop-off of the tympanomastoid suture"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "mandible",
      name: "Mandible (ramus)",
      layer: "bone",
      summary: "The gland wraps round the posterior border of the ramus.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "zygomatic",
      name: "Zygomatic bone and arch",
      layer: "bone",
      summary: "The upper limit of the gland. The temporal branch crosses the arch.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "atlas",
      name: "Atlas (C1)",
      layer: "context",
      summary: "Its transverse process can be felt between the mastoid tip and the angle of the mandible. The accessory nerve crosses the internal jugular vein near it.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  procedure: {
    title: "Superficial parotidectomy",
    steps: [
      {
        title: "Position and incision",
        text: "Supine, head turned away. Leave the eye and the corner of the mouth visible under a clear drape so facial movement can be seen, and avoid long-acting muscle relaxants if the nerve will be monitored. Use a modified Blair incision (in front of the ear, round the lobule and down into a neck crease) or a facelift incision.",
        show: ["superficial", "bone", "muscle", "gland"],
        focus: ["auricle", "parotid", "platysma"]
      },
      {
        title: "Skin flap",
        text: "Raise the anterior flap superficial to the parotid fascia, as far forward as the anterior border of the gland. Going further forward risks the branches, which leave the gland anteriorly and become superficial.",
        show: ["superficial", "bone", "muscle", "gland", "nerve"],
        focus: ["parotid", "masseter", "buccal_branch", "zygomatic_branch"]
      },
      {
        title: "Free the posterior gland",
        text: "Find the great auricular nerve and external jugular vein on sternocleidomastoid; keep the posterior branch of the nerve if possible. Separate the tail of the gland from the anterior border of sternocleidomastoid and the mastoid.",
        show: ["bone", "muscle", "gland", "vein", "nerve"],
        focus: ["great_auricular", "ejv", "scm"]
      },
      {
        title: "Along the ear canal",
        text: "Dissect the gland forward off the cartilage of the external acoustic meatus down to the tragal pointer, and expose the upper border of the posterior belly of digastric.",
        show: ["bone", "muscle", "gland", "nerve"],
        focus: ["auricle", "digastric_post", "temporal"]
      },
      {
        title: "Find the trunk",
        text: "Spread gently in the triangle between the tragal pointer, the mastoid and the posterior belly of digastric. The trunk lies about 1 cm deep and anterior-inferior to the pointer, at the depth of the digastric, about 6–8 mm deep to the tympanomastoid suture, and lateral to the styloid. Confirm with a stimulator before dividing anything over it.",
        show: ["bone", "muscle", "gland", "nerve"],
        focus: ["facial_trunk", "posterior_auricular_nerve", "digastric_post", "stylohyoid", "auricle"]
      },
      {
        title: "Pes anserinus and divisions",
        text: "Follow the trunk forward to where it divides. Tunnel with a fine haemostat along each division and divide the gland tissue over it, lifting the superficial gland off the nerve.",
        show: ["bone", "muscle", "gland", "nerve"],
        focus: ["facial_trunk", "buccal_branch", "mmn"]
      },
      {
        title: "Lower division and the retromandibular vein",
        text: "In the lower gland the lower division and marginal mandibular branch cross superficial to the retromandibular vein. Keep the nerve in view, and ligate the vein or its branches if they bleed.",
        show: ["bone", "muscle", "gland", "vein", "nerve"],
        focus: ["mmn", "cervical_branch", "retromandibular"]
      },
      {
        title: "Branches to the anterior border",
        text: "Follow the temporal, zygomatic and buccal branches to the anterior border of the gland. Ligate the parotid duct. Remove the superficial gland with the tumour and a cuff of normal tissue, without breaching a pleomorphic adenoma's capsule.",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve"],
        focus: ["temporal_branch", "zygomatic_branch", "buccal_branch", "parotid_duct", "transverse_facial"]
      },
      {
        title: "Check and close",
        text: "Stimulate the trunk to confirm every branch works. Check haemostasis and place a drain. Consider SMAS plication or a fat or fascial graft to reduce Frey syndrome and the contour defect, then close in layers.",
        show: ["bone", "muscle", "gland", "nerve"],
        focus: ["facial_trunk", "temporal_branch", "zygomatic_branch", "buccal_branch", "mmn", "cervical_branch"]
      }
    ],
    complications: [
      "Facial weakness: temporary weakness of one or more branches is common, especially the marginal mandibular; permanent weakness is uncommon after surgery for benign tumours",
      "Frey syndrome (gustatory sweating and flushing)",
      "Numbness of the ear lobe from great auricular nerve division",
      "Sialocele or salivary fistula; haematoma; infection",
      "First bite syndrome (sharp pain with the first bites of a meal), mainly after deep lobe or parapharyngeal surgery",
      "Contour defect; tumour recurrence after capsule rupture of a pleomorphic adenoma"
    ],
    refs: ["scottbrown", "shah", "frey"]
  },

  figures: [
    { id: "fig-facial", title: "Facial nerve trunk landmarks and branches (right lateral view)", svg: "facial" }
  ],

  quiz: [
    {
      q: "Relative to the tip of the tragal pointer, the facial nerve trunk lies about:",
      options: [
        "1 cm deep and anterior-inferior",
        "1 cm deep and posterior-superior",
        "3 cm deep and directly medial",
        "Just under the skin"
      ],
      answer: 0,
      explain: "The trunk lies roughly 1 cm deep and anterior-inferior to the pointer. Confirm it with a second landmark."
    },
    {
      q: "Inside the parotid, which order is correct from superficial to deep?",
      options: [
        "External carotid artery, retromandibular vein, facial nerve",
        "Facial nerve, retromandibular vein, external carotid artery",
        "Retromandibular vein, facial nerve, external carotid artery",
        "Facial nerve, external carotid artery, retromandibular vein"
      ],
      answer: 1,
      explain: "Nerve, then vein, then artery from superficial to deep."
    },
    {
      q: "Pitanguy's line marks the course of which branch?",
      options: ["Zygomatic", "Buccal", "Temporal (frontal)", "Marginal mandibular"],
      answer: 2,
      explain: "From 0.5 cm below the tragus to 1.5 cm above the lateral end of the eyebrow, crossing the zygomatic arch."
    },
    {
      q: "Frey syndrome after parotidectomy is caused by:",
      options: [
        "Injury to the great auricular nerve",
        "Regrowth of cut parasympathetic secretomotor fibres into the sweat glands of the skin",
        "A salivary fistula",
        "Injury to the marginal mandibular branch"
      ],
      answer: 1,
      explain: "Cut secretomotor fibres from the auriculotemporal nerve regrow into the sympathetic sweat glands of the overlying skin, so eating triggers sweating and flushing."
    },
    {
      q: "The parotid duct opens into the mouth opposite the:",
      options: ["Lower first molar", "Upper second molar", "Upper canine", "Lower second premolar"],
      answer: 1,
      explain: "It pierces buccinator and opens on a papilla opposite the upper second molar."
    },
    {
      q: "Which branch injury is least likely to recover because of few cross-connections?",
      options: ["Buccal", "Zygomatic", "Marginal mandibular", "Upper buccal"],
      answer: 2,
      explain: "The marginal mandibular and temporal branches have few connections with neighbouring branches; the buccal and zygomatic branches interconnect richly."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the face and the parotid region.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Volume 3, salivary gland chapters.",
    shah: "Shah JP, Patel SG, Singh B, Wong RJ. Jatin Shah's Head and Neck Surgery and Oncology. 5th ed. Elsevier; 2019. Salivary glands chapter.",
    davis: "Davis RA, Anson BJ, Budinger JM, Kurth LR. Surgical anatomy of the facial nerve and parotid gland based upon a study of 350 cervicofacial halves. Surg Gynecol Obstet. 1956;102(4):385–412.",
    pitanguy: "Pitanguy I, Ramos AS. The frontal branch of the facial nerve: the importance of its variations in face lifting. Plast Reconstr Surg. 1966;38(4):352–356.",
    dingman: "Dingman RO, Grabb WC. Surgical anatomy of the mandibular ramus of the facial nerve based on the dissection of 100 facial halves. Plast Reconstr Surg. 1962;29:266–272.",
    frey: "Frey L. Le syndrome du nerf auriculo-temporal. Rev Neurol (Paris). 1923;2:97–104."
  }
};
