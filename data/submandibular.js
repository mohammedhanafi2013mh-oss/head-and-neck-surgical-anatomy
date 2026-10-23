// Content for the submandibular region.
// Each structure id matches a mesh built in js/models/submandibular-model.js.
// Reference ids (e.g. "gray") point at entries in `references` below.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.submandibular = {
  id: "submandibular",
  title: "Submandibular region",
  subtitle: "Submandibular (digastric) triangle, level IB, both sides",

  overview: {
    intro:
      "The submandibular triangle sits below the body of the mandible. It is bounded by the two bellies of the digastric muscle and the lower border of the mandible. Its main content is the superficial part of the submandibular gland, which wraps around the free posterior border of mylohyoid. Three cranial nerve structures are at risk when the gland is removed: the marginal mandibular branch of the facial nerve, the lingual nerve and the hypoglossal nerve.",
    boundaries: [
      { label: "Anterior", text: "Anterior belly of digastric" },
      { label: "Posterior", text: "Posterior belly of digastric and stylohyoid" },
      { label: "Superior", text: "Lower border of the body of the mandible" },
      { label: "Roof (superficial)", text: "Skin, superficial fascia containing platysma and the cervical and marginal mandibular branches of the facial nerve, and the investing layer of deep cervical fascia, which splits to enclose the gland" },
      { label: "Floor (deep)", text: "Mylohyoid in front, hyoglossus behind, and a small part of the middle pharyngeal constrictor" }
    ],
    contents: [
      "Submandibular gland (superficial part) and the start of its duct",
      "Submandibular lymph nodes (level IB)",
      "Facial artery and its submental branch",
      "Facial vein",
      "Hypoglossal nerve, lying on hyoglossus",
      "Nerve to mylohyoid and the mylohyoid vessels",
      "Lingual nerve and the submandibular ganglion, deep to mylohyoid at the upper part of the field"
    ],
    keyPoints: [
      "The gland is folded around the posterior border of mylohyoid: a large superficial part below the muscle and a small deep part above it, continuous with each other.",
      "The marginal mandibular nerve runs deep to platysma but superficial to the investing fascia and to the facial vessels. Incise low and keep the dissection on the gland capsule.",
      "The lingual nerve makes a spiral around the duct: lateral to it behind, under it, then medial to it in front.",
      "The hypoglossal nerve lies lower and deeper, on hyoglossus, below the duct, with its accompanying veins (venae comitantes nervi hypoglossi)."
    ],
    refs: ["gray", "ellis", "robbins"]
  },

  // Layers group structures for the visibility toggles in the 3D viewer.
  layers: [
    { id: "superficial", label: "Platysma", defaultOn: false },
    { id: "bone", label: "Bone", defaultOn: true },
    { id: "muscle", label: "Muscles", defaultOn: true },
    { id: "gland", label: "Gland & duct", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: true },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "lymph", label: "Lymph nodes", defaultOn: true },
    { id: "context", label: "Surrounding", defaultOn: false }
  ],

  structures: [
    {
      id: "smg",
      name: "Submandibular gland",
      layer: "gland",
      summary:
        "A mixed (serous and mucous) salivary gland about the size of a walnut. It has a large superficial part in the submandibular triangle and a small deep part that curls round the posterior border of mylohyoid into the floor of the mouth.",
      relations: [
        "Superficial (inferior) surface: skin, platysma, cervical and marginal mandibular branches of the facial nerve, facial vein, and the submandibular lymph nodes",
        "Lateral surface: submandibular fossa on the inner surface of the mandible, medial pterygoid insertion, and the facial artery grooving its posterosuperior part",
        "Medial surface: mylohyoid in front, hyoglossus behind, with the lingual nerve, submandibular ganglion and hypoglossal nerve between the gland and hyoglossus",
        "Deep part: lies above mylohyoid, between mylohyoid laterally and hyoglossus/genioglossus medially, with the lingual nerve above and the hypoglossal nerve below"
      ],
      supply: {
        "Arterial": "Glandular branches of the facial and submental arteries",
        "Venous": "Facial and submental veins",
        "Lymphatic": "Submandibular nodes, then deep cervical nodes",
        "Parasympathetic (secretomotor)": "Superior salivatory nucleus, nervus intermedius, chorda tympani, lingual nerve, synapse in the submandibular ganglion, postganglionic fibres to the gland",
        "Sympathetic": "Superior cervical ganglion, via the plexus around the facial artery"
      },
      surgical: [
        "Excision is performed in the plane on the gland capsule, inside the investing fascia, so the marginal mandibular nerve is kept in the superficial flap.",
        "About 80–90% of salivary stones form in the submandibular gland or duct. Contributing factors are the long, upward course of the duct against gravity and the thicker, more alkaline, mucin-rich saliva."
      ],
      danger: [
        "Marginal mandibular nerve (superficial)",
        "Lingual nerve (deep, upper part of the field)",
        "Hypoglossal nerve (deep, lower part of the field)"
      ],
      variations: [
        "The size of the deep part varies. It may extend forward to touch the sublingual gland."
      ],
      refs: ["gray", "lustmann", "scottbrown"]
    },
    {
      id: "wharton",
      name: "Submandibular (Wharton's) duct",
      layer: "gland",
      summary:
        "About 5 cm long. It leaves the deep part of the gland and runs forward in the floor of the mouth, between mylohyoid and hyoglossus then genioglossus, to open at the sublingual papilla beside the frenulum of the tongue.",
      relations: [
        "Lingual nerve: lateral to the duct at first, then hooks beneath it, then passes medial to it into the tongue",
        "Hypoglossal nerve: below the duct on hyoglossus",
        "Sublingual gland: lateral to the duct in its anterior course"
      ],
      supply: {},
      surgical: [
        "During gland excision, ligate the duct as far forward as possible, especially for stone disease, so no stone is left in a duct stump.",
        "Stones in the anterior duct can often be removed through the mouth. Keep the incision directly over the stone, parallel to the duct, so the lingual nerve is not cut."
      ],
      danger: [
        "Lingual nerve, which crosses beneath the duct, typically level with the second and third molars"
      ],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "mmn",
      name: "Marginal mandibular nerve",
      aka: "Marginal mandibular branch of the facial nerve (CN VII)",
      layer: "nerve",
      course: [
        { key: "parotid", label: "Leaves the lower parotid", text: "Behind and below the angle of the mandible, deep to platysma." },
        { key: "vessels", label: "Crosses the facial vessels", text: "Superficial to the facial vein and artery at the antegonial notch, then up to the lower-lip depressors. Raise the fascia low (Hayes Martin) to protect it." }
      ],
      summary:
        "Leaves the lower pole of the parotid gland near the angle of the mandible and runs forward deep to platysma, superficial to the facial vessels. It supplies depressor anguli oris, depressor labii inferioris and mentalis.",
      relations: [
        "Deep to platysma and the superficial layer of the investing fascia",
        "Crosses superficial to the facial vein and facial artery at, or just below, the lower border of the mandible near the anterior border of masseter",
        "Behind the facial artery it may loop below the lower border of the mandible; in front of the facial artery it runs above it"
      ],
      supply: {
        "Motor": "Depressor anguli oris, depressor labii inferioris, mentalis (with contributions to the lower orbicularis oris)"
      },
      surgical: [
        "Dingman & Grabb (100 facial halves): behind the facial artery the nerve ran above the lower border of the mandible in 81% and below it, within 1 cm, in 19%. In front of the facial artery all branches ran above the lower border.",
        "Skin incision: in a natural crease, at least 3–4 cm (about two finger breadths) below the lower border of the mandible.",
        "Hayes Martin manoeuvre: divide and ligate the facial vein low over the gland and reflect it upward with the fascia. The nerve, which lies superficial to the vein, is lifted out of the field.",
        "With the patient lying down, head extended and turned, the nerve can sit lower than in the anatomical position."
      ],
      danger: [
        "Injury gives an asymmetric smile: the lower lip on the injured side cannot be pulled down and out.",
        "Temporary weakness after submandibular gland excision is fairly common in published series; permanent weakness is uncommon."
      ],
      variations: [
        "Usually one or two branches, sometimes three or more",
        "Some cadaver studies have found the nerve below the lower border of the mandible more often than Dingman & Grabb did. Do not rely on any fixed distance."
      ],
      refs: ["dingman", "ziarah", "martin", "preuss", "hald"]
    },
    {
      id: "lingual_nerve",
      name: "Lingual nerve",
      aka: "Branch of the mandibular division of the trigeminal nerve (CN V3)",
      layer: "nerve",
      course: [
        { key: "itf", label: "Enters from the infratemporal fossa", text: "Between the medial pterygoid and the ramus." },
        { key: "molar", label: "Beside the third molar", text: "Just under the mucosa on the lingual side of the mandible." },
        { key: "duct", label: "Loops under the duct", text: "Passes lateral to, then below and medial to, the submandibular duct; the ganglion hangs from it here. Divide the ganglion branches, not the nerve." },
        { key: "tongue", label: "To the tongue", text: "General sensation to the anterior two-thirds, with chorda tympani taste fibres." }
      ],
      summary:
        "Carries general sensation from the anterior two-thirds of the tongue and the floor of the mouth. It also carries chorda tympani fibres: taste from the anterior two-thirds of the tongue and preganglionic secretomotor fibres to the submandibular ganglion.",
      relations: [
        "Enters the region on the inner surface of the mandible, close to the lingual plate just below and behind the third molar",
        "Runs forward on hyoglossus, deep to mylohyoid, above the deep part of the gland",
        "Spirals around the submandibular duct: lateral, then below, then medial",
        "The submandibular ganglion hangs from its lower border on hyoglossus"
      ],
      supply: {
        "Sensory": "Anterior two-thirds of the tongue, floor of the mouth, lingual gingiva",
        "Via chorda tympani": "Taste from the anterior two-thirds of the tongue; preganglionic parasympathetic fibres to the submandibular ganglion"
      },
      surgical: [
        "With the gland pulled down and the posterior border of mylohyoid retracted forward, the lingual nerve appears as a 'V' pulled down by the ganglion. Clip and divide the ganglion branches close to the gland; leave the nerve intact.",
        "In the third molar region the nerve can lie at or above the lingual alveolar crest, so lingual flaps and retraction can injure it."
      ],
      danger: [
        "Injury causes numbness of the tongue on that side and loss of taste from its anterior part. Patients may bite their tongue and have trouble speaking."
      ],
      variations: [
        "Its height and distance from the lingual plate at the third molar vary considerably between patients"
      ],
      refs: ["gray", "kiesselbach", "scottbrown"]
    },
    {
      id: "sm_ganglion",
      name: "Submandibular ganglion",
      layer: "nerve",
      summary:
        "A small parasympathetic ganglion hanging from the lingual nerve by two short roots, lying on hyoglossus above the deep part of the submandibular gland.",
      relations: [
        "Suspended from the lower border of the lingual nerve",
        "Lies on hyoglossus, above the deep part of the gland"
      ],
      supply: {
        "Preganglionic fibres": "Superior salivatory nucleus, via chorda tympani and the lingual nerve",
        "Postganglionic fibres": "Submandibular gland directly; sublingual and anterior lingual glands by rejoining the lingual nerve"
      },
      surgical: [
        "Its branches to the gland are the tissue that is clipped and divided to free the gland from the lingual nerve. A vessel often runs with them."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hypoglossal",
      name: "Hypoglossal nerve",
      aka: "Cranial nerve XII",
      layer: "nerve",
      course: [
        { key: "canal", label: "From the skull base", text: "Through the hypoglossal canal." },
        { key: "tendon", label: "Below the digastric tendon", text: "On hyoglossus, deep to the gland, below the duct and lingual nerve, with the ranine veins." },
        { key: "tongue", label: "Into the tongue", text: "Supplies all its muscles except palatoglossus." }
      ],
      summary:
        "Motor nerve to all intrinsic muscles of the tongue and all extrinsic muscles except palatoglossus. In the submandibular triangle it runs forward on the lateral surface of hyoglossus.",
      relations: [
        "Curves forward across the external carotid artery and the loop of the lingual artery, below the posterior belly of digastric",
        "Runs on hyoglossus, deep to the digastric tendon, stylohyoid and the deep part of the gland, below the submandibular duct and the lingual nerve",
        "The lingual artery is separated from it by hyoglossus: the nerve is lateral to the muscle, the artery medial (deep) to it",
        "Accompanied by the venae comitantes nervi hypoglossi (sometimes called ranine veins)"
      ],
      supply: {
        "Motor": "Intrinsic tongue muscles; genioglossus, hyoglossus, styloglossus"
      },
      surgical: [
        "Keep the dissection on the gland capsule and do not go deep to the fascia over the digastric tendon and hyoglossus.",
        "Bleeding from its accompanying veins is a common reason to place clips or diathermy blindly near the nerve. Control it under direct vision."
      ],
      danger: [
        "Injury on one side makes the tongue deviate towards the injured side when protruded, and can affect speech and swallowing."
      ],
      variations: [
        "How low it crosses the carotid arteries varies, and so does how far it hangs into the submandibular triangle"
      ],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "nerve_mylohyoid",
      name: "Nerve to mylohyoid",
      aka: "Branch of the inferior alveolar nerve (CN V3)",
      layer: "nerve",
      summary:
        "Leaves the inferior alveolar nerve just before it enters the mandibular foramen. It runs in the mylohyoid groove and then on the superficial (inferior) surface of mylohyoid with the mylohyoid vessels.",
      relations: [
        "Lies on the inferior surface of mylohyoid, deep to the superficial part of the gland"
      ],
      supply: {
        "Motor": "Mylohyoid and the anterior belly of digastric"
      },
      surgical: [
        "The nerve and its accompanying vessels are divided when mylohyoid is cleared and retracted. This has no clinically important effect."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_artery",
      name: "Facial artery",
      layer: "artery",
      course: [
        { key: "origin", label: "From the external carotid", text: "Just above the lingual artery, deep to the posterior belly of digastric." },
        { key: "gland", label: "Grooves the back of the gland", text: "Ligate it here, and again at the mandible, in gland excision." },
        { key: "mandible", label: "Over the lower border of the mandible", text: "At the front of masseter, with the vein behind it; the marginal mandibular nerve crosses superficially." },
        { key: "face", label: "Into the face", text: "Tortuous, toward the angle of the mouth." }
      ],
      summary:
        "Arises from the external carotid artery just above the greater horn of the hyoid, often in a common trunk with the lingual artery (linguofacial trunk). It passes deep to the posterior belly of digastric and stylohyoid, grooves the posterior and upper part of the gland, then hooks round the lower border of the mandible at the anterior border of masseter onto the face.",
      relations: [
        "Deep to the posterior belly of digastric and stylohyoid near its origin",
        "Grooves the posterosuperior surface of the submandibular gland",
        "At the lower border of the mandible it lies just in front of the anterior border of masseter, with the facial vein behind it and the marginal mandibular nerve superficial to it"
      ],
      supply: {
        "Branches in the neck": "Ascending palatine, tonsillar, glandular branches to the submandibular gland, submental"
      },
      surgical: [
        "Usually ligated twice: proximally where it emerges deep to the posterior belly of digastric, and distally at the lower border of the mandible. It can sometimes be preserved by dissecting it off the gland.",
        "You can feel its pulse where it crosses the lower border of the mandible, just in front of masseter. This marks where the marginal mandibular nerve crosses."
      ],
      danger: [
        "If the proximal end slips its tie, it retracts deep to the digastric and bleeds heavily. Secure it with a transfixion stitch or a double tie."
      ],
      variations: [
        "Common origin with the lingual artery (linguofacial trunk) in a significant minority",
        "Its tortuosity varies; the loops allow for movement of the jaw and pharynx"
      ],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "submental_artery",
      name: "Submental artery",
      layer: "artery",
      summary:
        "The largest cervical branch of the facial artery. It arises as the facial artery leaves the gland and runs forward on the superficial surface of mylohyoid, below the mandible.",
      relations: [
        "On the inferior surface of mylohyoid, with the nerve to mylohyoid and the submental vein",
        "Supplies the surrounding muscles and skin, and the submental nodes"
      ],
      supply: {},
      surgical: [
        "It is the vascular pedicle of the submental island flap used in head and neck reconstruction."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "lingual_artery",
      name: "Lingual artery",
      layer: "artery",
      summary:
        "Arises from the external carotid opposite the tip of the greater horn of the hyoid. It forms an upward loop that the hypoglossal nerve crosses, then runs forward deep to hyoglossus.",
      relations: [
        "Deep (medial) to hyoglossus, while the hypoglossal nerve is superficial (lateral) to the muscle",
        "Runs along the upper border of the greater horn of the hyoid"
      ],
      supply: {
        "Branches": "Suprahyoid, dorsal lingual, sublingual, deep lingual (ranine) arteries"
      },
      surgical: [
        "Emergency control of bleeding from the tongue: it can be found in Lesser's triangle (hypoglossal nerve, posterior belly of digastric and anterior belly of digastric) by dividing hyoglossus."
      ],
      danger: [],
      variations: [
        "May share a common trunk with the facial artery"
      ],
      refs: ["gray"]
    },
    {
      id: "eca",
      name: "External carotid artery",
      layer: "artery",
      summary:
        "Shown for orientation at the back of the triangle. The lingual and facial arteries arise from its anterior surface near the hyoid.",
      relations: [
        "Crossed superficially by the hypoglossal nerve and by the posterior belly of digastric and stylohyoid"
      ],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_vein",
      name: "Facial vein",
      layer: "vein",
      summary:
        "Crosses the lower border of the mandible behind the facial artery and runs down and back on the superficial surface of the submandibular gland. It joins the anterior division of the retromandibular vein to form the common facial vein, which drains into the internal jugular vein.",
      relations: [
        "Superficial to the submandibular gland",
        "Deep to the marginal mandibular nerve, platysma and the investing fascia",
        "Posterior to the facial artery at the lower border of the mandible"
      ],
      supply: {},
      surgical: [
        "A key landmark: the marginal mandibular nerve lies superficial to it. Ligating it low and reflecting it upward (Hayes Martin manoeuvre) protects the nerve."
      ],
      danger: [],
      variations: [
        "Its point of union with the retromandibular vein, and where the common facial vein enters the internal jugular, both vary"
      ],
      refs: ["gray", "martin"]
    },
    {
      id: "ijv",
      name: "Internal jugular vein",
      layer: "vein",
      summary:
        "Shown for orientation, behind and lateral to the carotid arteries. It receives the common facial vein near the level of the hyoid.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "mylohyoid",
      name: "Mylohyoid",
      layer: "muscle",
      summary:
        "Forms the muscular floor of the mouth. It arises from the mylohyoid line of the mandible. Its posterior fibres insert into the body of the hyoid; the rest meet the opposite muscle in a midline raphe.",
      relations: [
        "Superficial (inferior) surface: anterior belly of digastric, superficial part of the gland, submental vessels, nerve to mylohyoid",
        "Deep (superior) surface: sublingual gland, deep part of the submandibular gland, duct, lingual and hypoglossal nerves, hyoglossus and genioglossus",
        "Its free posterior border is the fold around which the gland wraps"
      ],
      supply: {
        "Nerve": "Nerve to mylohyoid (CN V3)",
        "Action": "Raises the floor of the mouth and the tongue (swallowing); depresses the mandible when the hyoid is fixed"
      },
      surgical: [
        "Retracting the free posterior border forward is the key step that exposes the lingual nerve, ganglion and duct.",
        "Dental infection and the mylohyoid line: the root apices of the second and third molars usually lie below the line, so infection spreads into the submandibular space. Premolar and first molar apices usually lie above it, so infection spreads into the sublingual space. Spread to both spaces on both sides with a raised floor of mouth is Ludwig's angina."
      ],
      danger: [],
      variations: [
        "Gaps (dehiscences) in the muscle are common. A sublingual ranula can herniate through one into the neck as a 'plunging' ranula."
      ],
      refs: ["gray", "harrison", "scottbrown"]
    },
    {
      id: "hyoglossus",
      name: "Hyoglossus",
      layer: "muscle",
      summary:
        "A thin flat muscle running from the greater horn and body of the hyoid up into the side of the tongue. It is the key deep landmark of the region.",
      relations: [
        "Lateral (superficial) surface: lingual nerve, submandibular ganglion, deep part of the gland, duct, hypoglossal nerve and its veins (from above down)",
        "Medial (deep) surface: lingual artery, genioglossus, middle constrictor"
      ],
      supply: {
        "Nerve": "Hypoglossal nerve",
        "Action": "Depresses and retracts the tongue"
      },
      surgical: [
        "Structures superficial to hyoglossus are at risk during gland excision. The lingual artery is safe deep to it unless the muscle is divided."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "digastric_ant",
      name: "Digastric, anterior belly",
      layer: "muscle",
      summary:
        "Runs from the digastric fossa of the mandible to the intermediate tendon, which is held to the hyoid by a fibrous sling. It forms the anterior boundary of the submandibular triangle.",
      relations: [
        "Lies on the superficial surface of mylohyoid",
        "Separates the submandibular triangle (level IB) from the submental triangle (level IA)"
      ],
      supply: {
        "Nerve": "Nerve to mylohyoid (CN V3)"
      },
      surgical: [
        "The anterior limit of level IB in neck dissection. The contralateral anterior belly is the lateral limit of level IA."
      ],
      danger: [],
      variations: [
        "Accessory slips and crossing fibres are common"
      ],
      refs: ["gray", "robbins"]
    },
    {
      id: "digastric_post",
      name: "Digastric, posterior belly",
      layer: "muscle",
      summary:
        "Runs from the mastoid notch of the temporal bone to the intermediate tendon. It forms the posterior boundary of the triangle, with stylohyoid.",
      relations: [
        "Superficial to the external and internal carotid arteries, internal jugular vein and the hypoglossal, vagus and accessory nerves"
      ],
      supply: {
        "Nerve": "Facial nerve (CN VII)"
      },
      surgical: [
        "Called 'the resident's friend': staying superficial to it keeps you away from the great vessels and lower cranial nerves. The proximal facial artery is found just deep to its lower border."
      ],
      danger: [
        "Deep to it: internal jugular vein, carotid arteries, hypoglossal nerve"
      ],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "stylohyoid",
      name: "Stylohyoid",
      layer: "muscle",
      summary:
        "A slender muscle from the styloid process to the hyoid. Its insertion usually splits around the intermediate tendon of digastric.",
      relations: [
        "Runs along the upper border of the posterior belly of digastric"
      ],
      supply: {
        "Nerve": "Facial nerve (CN VII)"
      },
      surgical: [
        "The posterior limit of level IB in the AHNS/AAO-HNS neck dissection classification."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "robbins"]
    },
    {
      id: "platysma",
      name: "Platysma",
      layer: "superficial",
      summary:
        "A thin sheet of muscle in the superficial fascia of the neck, running from the fascia over the upper chest up to the lower border of the mandible and the lower face.",
      relations: [
        "The marginal mandibular and cervical branches of the facial nerve lie deep to it"
      ],
      supply: {
        "Nerve": "Cervical branch of the facial nerve"
      },
      surgical: [
        "Flaps are raised in the subplatysmal plane. The marginal mandibular nerve lies just deep to this plane, on the investing fascia."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "parotid",
      name: "Parotid gland",
      layer: "context",
      summary:
        "The largest salivary gland, wrapped around the ramus of the mandible in front of the ear. Its lower pole (tail) lies just behind and above the posterior belly of digastric.",
      relations: [
        "The facial nerve divides inside it; the marginal mandibular branch leaves its lower border near the angle of the mandible",
        "The retromandibular vein runs through it and divides near its lower pole"
      ],
      supply: {},
      surgical: [
        "The lower pole of the parotid marks where the marginal mandibular nerve comes out. In neck dissection the tail of the parotid is the upper limit of level II."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sublingual",
      name: "Sublingual gland",
      layer: "context",
      summary:
        "The smallest of the major salivary glands. It lies above mylohyoid, under the mucosa of the floor of the mouth, and drains through several small ducts.",
      relations: [
        "Lateral to the submandibular duct and the lingual nerve in the floor of the mouth"
      ],
      supply: {},
      surgical: [
        "A ranula arises from it. A plunging ranula passes through or behind mylohyoid into the submandibular region."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "harrison"]
    },
    {
      id: "retromandibular",
      name: "Retromandibular vein",
      layer: "vein",
      summary:
        "Formed in the parotid by the superficial temporal and maxillary veins. Its anterior division joins the facial vein to form the common facial vein.",
      relations: [
        "Runs through the parotid, deep to the facial nerve branches"
      ],
      supply: {},
      surgical: [
        "Following it up from the common facial vein leads to the lower pole of the parotid and the marginal mandibular nerve."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "masseter",
      name: "Masseter",
      layer: "context",
      summary:
        "Muscle of mastication covering the lateral surface of the ramus. Its anterior border is where the facial artery crosses the lower border of the mandible.",
      relations: [
        "The facial artery and vein cross the mandible just in front of its anterior border"
      ],
      supply: { "Nerve": "Masseteric nerve (CN V3)" },
      surgical: [
        "Feel the anterior border with the patient clenching their teeth. This locates the facial vessels and the marginal mandibular nerve crossing."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "medial_pterygoid",
      name: "Medial pterygoid",
      layer: "context",
      summary:
        "Muscle of mastication on the inner surface of the ramus. Its insertion near the angle lies against the lateral surface of the submandibular gland.",
      relations: [],
      supply: { "Nerve": "Nerve to medial pterygoid (CN V3)" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "genioglossus",
      name: "Genioglossus",
      layer: "context",
      summary:
        "The fan-shaped main muscle of the tongue, running from the genial tubercles into the tongue. Anteriorly the duct and lingual nerve lie lateral to it.",
      relations: [],
      supply: { "Nerve": "Hypoglossal nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "geniohyoid",
      name: "Geniohyoid",
      layer: "context",
      summary:
        "A narrow muscle running from the inferior genial tubercle to the hyoid, just above (deep to) mylohyoid beside the midline.",
      relations: [],
      supply: { "Nerve": "C1 fibres carried by the hypoglossal nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "scm",
      name: "Sternocleidomastoid",
      layer: "context",
      summary:
        "Shown for orientation. Its anterior border is the posterior limit of the anterior triangle of the neck.",
      relations: [],
      supply: { "Nerve": "Accessory nerve (CN XI)" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "temporal",
      name: "Temporal bone (mastoid & styloid)",
      layer: "bone",
      summary:
        "Shown for the origins of the posterior belly of digastric (mastoid notch) and stylohyoid (styloid process).",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "mandible",
      name: "Mandible",
      layer: "bone",
      summary:
        "Its lower border forms the upper boundary of the triangle. The submandibular fossa, below the mylohyoid line on its inner surface, holds the superficial part of the gland.",
      relations: [
        "Mylohyoid line on the inner surface: attachment of mylohyoid",
        "Digastric fossa near the midline on the lower border: attachment of the anterior belly of digastric"
      ],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hyoid",
      name: "Hyoid bone",
      layer: "bone",
      summary:
        "Lies at the level of C3. It anchors the intermediate tendon of digastric and gives attachment to mylohyoid, hyoglossus and stylohyoid.",
      relations: [
        "The greater horn is a palpable landmark for where the lingual and facial arteries arise"
      ],
      supply: {},
      surgical: [
        "The lower limit of level I. Levels II and III are divided at the level of the hyoid."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "robbins"]
    },
    {
      id: "nodes",
      name: "Submandibular & submental lymph nodes",
      aka: "Levels IB and IA",
      layer: "lymph",
      summary:
        "The submandibular nodes (level IB) lie around the gland and along the facial vessels, including the preglandular, prevascular and retrovascular groups near the lower border of the mandible. The submental nodes (level IA) lie between the two anterior bellies of digastric.",
      relations: [
        "Prevascular and retrovascular facial nodes lie right next to the marginal mandibular nerve where the facial vessels cross the mandible"
      ],
      supply: {
        "Drain": "Lips, cheek, nose, anterior tongue, floor of mouth, gums, teeth, submandibular gland; to the deep cervical nodes (levels II–III)"
      },
      surgical: [
        "Level IB is bounded by the anterior belly of digastric, stylohyoid and the body of the mandible (Robbins 2002). It is usually removed with the gland in neck dissection for oral cavity cancer.",
        "Clearing the prevascular and retrovascular nodes is the step most likely to injure the marginal mandibular nerve. Find the nerve before taking these nodes."
      ],
      danger: ["Marginal mandibular nerve, next to the perifacial nodes"],
      variations: [],
      refs: ["robbins", "som", "scottbrown"]
    }
  ],

  // Step-by-step transcervical submandibular gland excision.
  // `show` sets which layers are visible for the step; `focus` highlights structures.
  // Incisions drawn on the model at the surgery steps that name them (step.incision):
  // control points in app space, laid onto the outer surface along "axis" or "toward".
  incisions: [
    {"id": "submandibular", "name": "Skin-crease incision", "note": "At least 3–4 cm (two finger breadths) below the lower border of the mandible, so the marginal mandibular nerve stays above the flap.", "points": [[-1.45, -2.98, -2.48], [-1.44, -2.99, -1.68], [-1.02, -3.21, -0.88], [-0.59, -3.4, -0.08], [-0.14, -3.63, 0.72], [0.32, -3.9, 1.52]], "axis": [2.38, -5.35]}
  ],

  procedure: {
    title: "Submandibular gland excision (transcervical)",
    steps: [
      {
        title: "Position and incision", incision: "submandibular",
        text: "Supine, with the neck extended and the head turned to the opposite side. Mark a skin-crease incision at least 3–4 cm (about two finger breadths) below the lower border of the mandible, over the lower part of the gland.",
        show: ["superficial", "bone", "gland"],
        focus: ["platysma"]
      },
      {
        title: "Subplatysmal flap", incision: "submandibular",
        text: "Divide platysma along the line of the incision and raise the upper flap in the plane just deep to it. The marginal mandibular nerve lies just deep to this plane, on the investing fascia. Do not go deep to the fascia yet.",
        show: ["superficial", "bone", "gland", "nerve", "vein"],
        focus: ["platysma", "mmn"]
      },
      {
        title: "Protect the marginal mandibular nerve",
        text: "Incise the investing fascia over the lower part of the gland. Find the facial vein on the gland surface, ligate it low and reflect it upward with the fascia (Hayes Martin manoeuvre). The nerve, superficial to the vein, goes up with the flap.",
        show: ["bone", "gland", "nerve", "vein", "artery", "lymph"],
        focus: ["facial_vein", "mmn", "nodes"]
      },
      {
        title: "Distal facial artery",
        text: "At the upper border of the gland, where the facial artery hooks over the mandible, ligate and divide it, or dissect it off the gland if it is to be preserved. Keep the nerve in view.",
        show: ["bone", "gland", "nerve", "vein", "artery", "muscle"],
        focus: ["facial_artery", "submental_artery", "mmn"]
      },
      {
        title: "Mobilise the gland and expose mylohyoid",
        text: "Free the lower part of the gland from the digastric tendon. Free the gland forward off mylohyoid, dividing the nerve to mylohyoid and its vessels. Retract the free posterior border of mylohyoid forward with a right-angled retractor.",
        show: ["bone", "gland", "nerve", "artery", "muscle"],
        focus: ["mylohyoid", "digastric_ant", "nerve_mylohyoid"]
      },
      {
        title: "Lingual nerve and ganglion",
        text: "Pull the gland down and back. The lingual nerve appears as a 'V', pulled down by the submandibular ganglion. Clip and divide the ganglion branches close to the gland; preserve the nerve.",
        show: ["bone", "gland", "nerve", "muscle"],
        focus: ["lingual_nerve", "sm_ganglion", "wharton"]
      },
      {
        title: "Hypoglossal nerve",
        text: "The hypoglossal nerve lies lower, on hyoglossus, below the duct and deep to the digastric tendon, with its accompanying veins. Keep the dissection on the gland capsule and control venous bleeding under direct vision.",
        show: ["bone", "gland", "nerve", "muscle", "artery"],
        focus: ["hypoglossal", "hyoglossus", "lingual_artery"]
      },
      {
        title: "Duct and proximal facial artery",
        text: "Follow the duct forward, ligate it as far anterior as possible (especially for stones) and divide it. Ligate the proximal facial artery where it comes out from deep to the posterior belly of digastric, and remove the gland. Check bleeding, place a drain if needed and close in layers.",
        show: ["bone", "gland", "nerve", "muscle", "artery"],
        focus: ["wharton", "facial_artery", "digastric_post"]
      }
    ],
    complications: [
      "Marginal mandibular nerve weakness: temporary weakness is fairly common in published series; permanent weakness is uncommon",
      "Lingual nerve injury: numbness of the tongue on that side and loss of taste from its anterior part",
      "Hypoglossal nerve injury: tongue weakness, deviating towards the injured side",
      "Haematoma (watch for airway compromise), infection, scar problems, retained stone in a duct stump"
    ],
    refs: ["preuss", "hald", "martin", "scottbrown"]
  },

  figures: [
    { id: "fig-triangle", title: "Boundaries of the submandibular triangle (lateral view)", svg: "triangle" },
    { id: "fig-coronal", title: "Coronal section: the gland wraps around mylohyoid", svg: "coronal" }
  ],

  quiz: [
    {
      q: "During submandibular gland excision, the marginal mandibular nerve is best protected by:",
      options: [
        "Dissecting directly on the platysma's deep surface down to the gland capsule over its upper border",
        "Ligating the facial vein low and reflecting it upward with the investing fascia",
        "Identifying the nerve at the stylomastoid foramen first",
        "Making the incision along the lower border of the mandible"
      ],
      answer: 1,
      explain: "The nerve lies superficial to the facial vein, deep to platysma. Ligating the vein low and reflecting it upward (Hayes Martin manoeuvre) lifts the nerve out of the field."
    },
    {
      q: "The lingual nerve's relationship to the submandibular duct is:",
      options: [
        "Medial throughout",
        "Lateral throughout",
        "Lateral, then beneath, then medial (from back to front)",
        "Medial, then beneath, then lateral (from back to front)"
      ],
      answer: 2,
      explain: "The lingual nerve hooks under the duct from lateral to medial as both run forward in the floor of the mouth."
    },
    {
      q: "Which structure lies DEEP (medial) to hyoglossus?",
      options: ["Hypoglossal nerve", "Lingual nerve", "Submandibular duct", "Lingual artery"],
      answer: 3,
      explain: "The lingual artery runs deep to hyoglossus. The hypoglossal nerve, lingual nerve and duct lie on its lateral surface."
    },
    {
      q: "According to Dingman & Grabb, behind the facial artery the marginal mandibular nerve ran below the lower border of the mandible in about:",
      options: ["5%", "19%", "50%", "81%"],
      answer: 1,
      explain: "19% below the border (within 1 cm) and 81% above, behind the facial artery. In front of the facial artery all branches ran above the border."
    },
    {
      q: "The posterior boundary of level IB in the AHNS/AAO-HNS classification is:",
      options: ["Posterior belly of digastric", "Stylohyoid muscle", "Sternocleidomastoid", "Hyoglossus"],
      answer: 1,
      explain: "Robbins et al. (2002) define level IB as bounded by the anterior belly of digastric, the stylohyoid muscle and the body of the mandible."
    },
    {
      q: "An abscess from a mandibular second molar most often spreads first into the:",
      options: ["Sublingual space", "Submandibular space", "Parapharyngeal space", "Buccal space"],
      answer: 1,
      explain: "The second and third molar root apices usually lie below the mylohyoid line, so pus spreads into the submandibular space."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the neck and the oral cavity.",
    ellis: "Ellis H, Mahadevan V. Clinical Anatomy: Applied Anatomy for Students and Junior Doctors. 14th ed. Wiley-Blackwell; 2019.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Volume 3, salivary gland chapters.",
    dingman: "Dingman RO, Grabb WC. Surgical anatomy of the mandibular ramus of the facial nerve based on the dissection of 100 facial halves. Plast Reconstr Surg. 1962;29:266–272.",
    ziarah: "Ziarah HA, Atkinson ME. The surgical anatomy of the mandibular distribution of the facial nerve. Br J Oral Surg. 1981;19(3):159–170.",
    martin: "Martin H, Del Valle B, Ehrlich H, Cahan WG. Neck dissection. Cancer. 1951;4(3):441–499.",
    robbins: "Robbins KT, Clayman G, Levine PA, et al. Neck dissection classification update: revisions proposed by the American Head and Neck Society and the American Academy of Otolaryngology–Head and Neck Surgery. Arch Otolaryngol Head Neck Surg. 2002;128(7):751–758.",
    som: "Som PM, Curtin HD, Mancuso AA. An imaging-based classification for the cervical nodes designed as an adjunct to recent clinically based nodal classifications. Arch Otolaryngol Head Neck Surg. 1999;125(4):388–396.",
    preuss: "Preuss SF, Klussmann JP, Wittekindt C, Drebber U, Beutner D, Guntinas-Lichius O. Submandibular gland excision: 15 years of experience. J Oral Maxillofac Surg. 2007;65(5):953–957.",
    hald: "Hald J, Andreassen UK. Submandibular gland excision: short- and long-term complications. ORL J Otorhinolaryngol Relat Spec. 1994;56(2):87–91.",
    kiesselbach: "Kiesselbach JE, Chamberlain JG. Clinical and anatomic observations on the relationship of the lingual nerve to the mandibular third molar region. J Oral Maxillofac Surg. 1984;42(9):565–567.",
    lustmann: "Lustmann J, Regev E, Melamed Y. Sialolithiasis: a survey on 245 patients and a review of the literature. Int J Oral Maxillofac Surg. 1990;19(3):135–138.",
    harrison: "Harrison JD. Modern management and pathophysiology of ranula: literature review. Head Neck. 2010;32(10):1310–1320."
  }
};
