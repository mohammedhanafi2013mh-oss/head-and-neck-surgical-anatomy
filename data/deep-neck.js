// Content for the deep neck spaces. Each structure id matches a mesh id in
// data/deep-neck-meshes.js. The spaces (ids starting "s_") are schematic
// volumes built for this app; fascial layers without a mesh have notes only.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.deep_neck = {
  id: "deep_neck",
  title: "Deep neck spaces",
  subtitle: "Layers of deep cervical fascia and the spaces between them, both sides",

  overview: {
    intro:
      "The deep cervical fascia has three layers: investing, pretracheal (visceral) and prevertebral. Between and within them lie potential spaces, normally filled with loose fat. These spaces decide where infection and tumour can spread. Infection that reaches the retropharyngeal, danger or prevertebral spaces can track down into the chest. In the 3D model each space is a coloured, translucent volume, built for this app from the structures it contains or lies between. The CT / MRI tab shows them in cross-section, which is how they are usually seen in practice.",
    boundaries: [
      { label: "Investing layer", text: "Surrounds the neck under platysma; splits around sternocleidomastoid, trapezius, and the submandibular and parotid glands. Attached to the mandible, zygomatic arch, mastoid and superior nuchal line above, and the manubrium, clavicles and scapula below" },
      { label: "Pretracheal (visceral) layer", text: "A muscular part around the strap muscles and a visceral part around the thyroid, larynx, trachea, pharynx and oesophagus. Its back part over the constrictors is the buccopharyngeal fascia. It runs from the skull base and hyoid into the superior mediastinum" },
      { label: "Prevertebral layer", text: "In front of the prevertebral muscles and over the scalenes (the floor of the posterior triangle). Its front lamina, the alar fascia, runs from the skull base to about T2" },
      { label: "Carotid sheath", text: "Formed from all three layers around the carotid artery, internal jugular vein and vagus" }
    ],
    contents: [
      "Suprahyoid spaces: parapharyngeal, masticator, parotid, peritonsillar, submandibular, sublingual, submental",
      "Spaces along the whole neck: retropharyngeal, danger, prevertebral, carotid",
      "Infrahyoid space: visceral (pretracheal)",
      "Retropharyngeal (Rouvière) and deep cervical lymph nodes"
    ],
    keyPoints: [
      "The parapharyngeal space is the crossroads: it connects with the retropharyngeal, carotid, masticator, parotid, peritonsillar and submandibular spaces.",
      "The danger space lies between the alar and prevertebral fascia and runs from the skull base to the diaphragm. Infection here reaches the posterior mediastinum.",
      "Retropharyngeal abscess is mainly a disease of children under about five, from suppuration of the lateral retropharyngeal (Rouvière) nodes, which regress later.",
      "The mylohyoid line decides odontogenic spread: roots of the lower second and third molars lie below it (submandibular space), premolar and first molar roots above it (sublingual space).",
      "Secure the airway first in Ludwig's angina and in any deep neck infection with trismus, drooling or stridor."
    ],
    refs: ["grodinsky", "harnsberger", "vieira", "gray"]
  },

  layers: [
    { id: "spaces", label: "Spaces", defaultOn: true },
    { id: "fascia", label: "Investing fascia", defaultOn: false },
    { id: "bone", label: "Bone & cartilage", defaultOn: true },
    { id: "gland", label: "Glands & viscera", defaultOn: true },
    { id: "muscle", label: "Muscles", defaultOn: false },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: true },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "route", label: "Routes of spread", defaultOn: true },
    { id: "lymph", label: "Lymph nodes", defaultOn: true }
  ],

  structures: [
    // ---------- spaces ----------
    {
      id: "s_parapharyngeal",
      name: "Parapharyngeal space",
      aka: "Lateral pharyngeal space; prestyloid compartment shown",
      layer: "spaces",
      drawn: true,
      summary:
        "An inverted pyramid on each side of the pharynx, with its base at the skull base and its apex at the greater horn of the hyoid. The styloid process and the tensor-vascular-styloid fascia divide it into a prestyloid compartment (shown) and a poststyloid compartment, which radiologists call the carotid space.",
      relations: [
        "Medial: buccopharyngeal fascia over the superior constrictor and tensor veli palatini",
        "Lateral: medial pterygoid, the mandibular ramus and the deep lobe of the parotid",
        "Anterior: pterygomandibular raphe; posterior: prevertebral fascia, with the carotid space posterolaterally",
        "Contains (prestyloid): fat, branches of the maxillary artery and V3, minor salivary rests; the deep lobe of the parotid bulges into it",
        "Communicates with: retropharyngeal, carotid, masticator, parotid, peritonsillar and submandibular spaces"
      ],
      supply: {},
      surgical: [
        "Infection comes from the tonsils, pharynx, lower molars or parotid. Signs: trismus (medial pterygoid irritation), medial bulging of the tonsil and lateral pharyngeal wall, and swelling at the angle of the jaw.",
        "Drain it transcervically, deep to the posterior belly of digastric along the medial pterygoid towards the styloid (see Surgery). Intraoral drainage is reserved for collections bulging medially.",
        "Prestyloid tumours are mostly salivary (pleomorphic adenoma of the deep lobe) and push the internal carotid backwards; poststyloid tumours (paraganglioma, schwannoma) push it forwards."
      ],
      danger: ["Spread to the carotid space (carotid erosion, jugular thrombosis) and to the retropharyngeal and danger spaces"],
      variations: [],
      refs: ["grodinsky", "harnsberger", "vieira", "scottbrown"]
    },
    {
      id: "s_retropharyngeal",
      name: "Retropharyngeal space",
      layer: "spaces",
      drawn: true,
      summary:
        "A potential space behind the pharynx and oesophagus, between the buccopharyngeal (visceral) fascia in front and the alar fascia behind. It runs from the skull base to about T1–T2, where the alar and visceral fascia fuse. A midline raphe divides it into two halves.",
      relations: [
        "Laterally: the carotid sheaths",
        "Contains: fat and the retropharyngeal lymph nodes (lateral nodes of Rouvière high up, near the skull base)",
        "Communicates with: the parapharyngeal space laterally; the superior mediastinum below"
      ],
      supply: {},
      surgical: [
        "Retropharyngeal abscess mainly affects children under about five, from suppurating Rouvière nodes after an upper respiratory infection. Signs: neck stiffness and reluctance to extend, torticollis, fever, drooling, muffled voice; widened prevertebral soft tissue on lateral X-ray.",
        "In adults it follows trauma, foreign bodies or instrumentation.",
        "The midline raphe makes the abscess bulge to one side. Small collections may settle with antibiotics; larger ones are drained transorally or transcervically."
      ],
      danger: ["Rupture into the airway; spread to the mediastinum"],
      variations: [],
      refs: ["grodinsky", "vieira", "scottbrown"]
    },
    {
      id: "s_danger",
      name: "Danger space",
      layer: "spaces",
      drawn: true,
      summary:
        "Between the alar fascia in front and the prevertebral fascia proper behind. It runs from the skull base to the diaphragm (the model is cut off at the root of the neck), with only loose areolar tissue to stop spread.",
      relations: ["Lies directly behind the retropharyngeal space and in front of the prevertebral space"],
      supply: {},
      surgical: [
        "Infection breaking through from the retropharyngeal or parapharyngeal spaces can fall straight into the posterior mediastinum: descending necrotising mediastinitis.",
        "This needs mediastinal as well as cervical drainage; the Estrera criteria define it on clinical and CT findings."
      ],
      danger: ["Descending necrotising mediastinitis, empyema and pericardial effusion"],
      variations: [],
      refs: ["grodinsky", "estrera", "vieira"]
    },
    {
      id: "s_prevertebral",
      name: "Prevertebral space",
      layer: "spaces",
      drawn: true,
      summary: "Behind the prevertebral fascia, in front of the vertebral bodies. It contains the longus colli and longus capitis and runs from the skull base to the coccyx.",
      relations: ["Laterally it continues over the scalenes and the brachial plexus roots as the floor of the posterior triangle"],
      supply: {},
      surgical: [
        "Infection usually comes from the spine: discitis, vertebral osteomyelitis, tuberculosis (Pott's disease), or after anterior cervical spine surgery.",
        "A collection here lifts the posterior pharyngeal wall in the midline and can track down to the psoas."
      ],
      danger: ["Spinal cord compression and instability from the underlying osteomyelitis"],
      variations: [],
      refs: ["grodinsky", "vieira"]
    },
    {
      id: "s_carotid",
      name: "Carotid space",
      aka: "Poststyloid parapharyngeal space and the carotid sheath",
      layer: "spaces",
      drawn: true,
      summary: "The carotid sheath and its contents, from the skull base (jugular foramen and carotid canal) to the aortic arch.",
      relations: [
        "Contains: internal or common carotid artery, internal jugular vein, vagus nerve; above the hyoid also IX, XI and XII; the sympathetic trunk lies just behind it; deep cervical nodes lie along it",
        "Communicates with: the parapharyngeal space above; it runs into the mediastinum below"
      ],
      supply: {},
      surgical: [
        "Lemierre syndrome: septic thrombophlebitis of the internal jugular vein after pharyngitis, classically with Fusobacterium necrophorum, with septic emboli to the lungs.",
        "Carotid erosion in deep neck infection may announce itself with small 'herald' bleeds from the mouth or ear.",
        "Tumours: paraganglioma (carotid body, vagal), vagal schwannoma, nodal metastases."
      ],
      danger: ["Carotid blowout; internal jugular thrombosis"],
      variations: [],
      refs: ["lemierre", "harnsberger", "vieira"]
    },
    {
      id: "s_visceral",
      name: "Visceral space",
      aka: "Pretracheal space",
      layer: "spaces",
      drawn: true,
      summary: "Inside the visceral layer of the pretracheal fascia: the larynx, trachea, hypopharynx, oesophagus, thyroid and parathyroids, from the hyoid into the superior mediastinum.",
      relations: [
        "Contains also: the recurrent laryngeal nerves and level VI nodes",
        "In front of the trachea it continues down to the fibrous pericardium (anterior mediastinum)"
      ],
      supply: {},
      surgical: ["Infection follows oesophageal perforation (foreign bodies, endoscopy), thyroiditis or anterior neck trauma, and can spread to the anterior mediastinum."],
      danger: [],
      variations: [],
      refs: ["grodinsky", "vieira"]
    },
    {
      id: "s_masticator",
      name: "Masticator space",
      layer: "spaces",
      drawn: true,
      summary: "Formed where the investing fascia splits around the mandibular ramus. It holds masseter, the pterygoids and the lower temporalis (the space extends up into the temporal fossa).",
      relations: [
        "Contains also: the ramus and body of the mandible behind the molars, the inferior alveolar nerve and vessels, and branches of the maxillary artery",
        "Communicates with: the parapharyngeal space medially and the buccal space in front"
      ],
      supply: {},
      surgical: [
        "Infection usually comes from the lower third molar. Trismus is the main sign, and swelling may be hard to see from outside.",
        "Tumours here (sarcoma, lymphoma) and perineural spread along V3 through foramen ovale should be looked for on imaging."
      ],
      danger: [],
      variations: [],
      refs: ["harnsberger", "vieira"]
    },
    {
      id: "s_parotid",
      name: "Parotid space",
      layer: "spaces",
      drawn: true,
      summary: "The investing fascia around the parotid gland, containing the gland, the facial nerve, the retromandibular vein, the external carotid and intraparotid nodes.",
      relations: ["The fascia is thin on the deep surface, so the space communicates with the parapharyngeal space"],
      supply: {},
      surgical: ["Parotid abscess (often in dehydrated elderly patients with poor oral hygiene) is tense and painful because the fascia is tight; drainage is through a parotidectomy-type incision with radial openings that avoid the facial nerve."],
      danger: ["Facial nerve branches during drainage"],
      variations: [],
      refs: ["harnsberger", "scottbrown"]
    },
    {
      id: "s_submandibular",
      name: "Submandibular space",
      layer: "spaces",
      drawn: true,
      summary: "Below the mylohyoid, between it and the investing fascia, from the hyoid to the lower border of the mandible. It holds the superficial part of the submandibular gland, its nodes and the facial vessels.",
      relations: ["Communicates with: the sublingual space around the free back edge of mylohyoid (with the deep part of the gland and its duct), the submental space in front and the parapharyngeal space behind"],
      supply: {},
      surgical: [
        "Infection from the lower second and third molars, whose roots lie below the mylohyoid line.",
        "Drained through an incision two finger breadths below the mandible, raising the flap deep to platysma to protect the marginal mandibular nerve."
      ],
      danger: ["Marginal mandibular nerve"],
      variations: [],
      refs: ["vieira", "gray"]
    },
    {
      id: "s_sublingual",
      name: "Sublingual space",
      layer: "spaces",
      drawn: true,
      summary: "Above the mylohyoid, below the floor-of-mouth mucosa, lateral to genioglossus and geniohyoid. It holds the sublingual gland, the deep part of the submandibular gland and its duct, the lingual nerve and artery, and the hypoglossal nerve.",
      relations: ["The two sides connect in front of genioglossus; the space connects with the submandibular space behind the mylohyoid"],
      supply: {},
      surgical: [
        "Infection from premolar and first molar roots (above the mylohyoid line); it raises the floor of the mouth and pushes the tongue up and back.",
        "A plunging ranula passes from here through or behind the mylohyoid into the neck."
      ],
      danger: ["Airway obstruction as the tongue is pushed up and back"],
      variations: [],
      refs: ["vieira", "gray"]
    },
    {
      id: "s_submental",
      name: "Submental space",
      layer: "spaces",
      drawn: true,
      summary: "A midline space between the anterior bellies of digastric, below the mylohyoid and above the investing fascia, containing the submental nodes.",
      relations: [],
      supply: {},
      surgical: [
        "Ludwig's angina is a rapidly spreading cellulitis of the submental and both submandibular and sublingual spaces, usually from the lower molars. The floor of the mouth becomes woody and the tongue rises.",
        "Management: secure the airway first (awake fibreoptic intubation or tracheostomy under local anaesthesia), then intravenous antibiotics and decompression of all the spaces involved."
      ],
      danger: ["Sudden airway obstruction in Ludwig's angina"],
      variations: [],
      refs: ["vieira", "scottbrown"]
    },
    {
      id: "s_peritonsillar",
      name: "Peritonsillar space",
      layer: "spaces",
      drawn: true,
      summary: "Between the tonsillar capsule and the superior constrictor, bounded by the anterior and posterior pillars.",
      relations: ["Lateral to it, through the constrictor, lies the parapharyngeal space; the internal carotid lies about 2–2.5 cm posterolateral to the tonsil"],
      supply: {},
      surgical: [
        "Quinsy (peritonsillar abscess): severe sore throat, trismus, 'hot potato' voice, drooling, the uvula pushed to the other side and a bulging soft palate above the tonsil.",
        "Needle aspiration or incision at the point of maximum bulge, usually above the upper pole; keep the needle tip shallow and pointing medially to stay clear of the carotid."
      ],
      danger: ["Internal carotid artery posterolateral to the tonsil; spread to the parapharyngeal space"],
      variations: [],
      refs: ["scottbrown", "vieira"]
    },

    // ---------- fascia (notes only, apart from the investing layer) ----------
    {
      id: "investing_fascia",
      name: "Investing layer of deep cervical fascia",
      layer: "fascia",
      summary: "The outer layer, under platysma, encircling the neck. It splits to enclose sternocleidomastoid and trapezius, and the submandibular and parotid glands.",
      relations: ["Above the manubrium it splits into two layers around the jugular venous arch (suprasternal space of Burns)"],
      supply: {},
      surgical: ["Forms the roof of the submandibular and submental spaces and the capsule of the parotid space."],
      danger: [],
      variations: [],
      refs: ["gray", "grodinsky"]
    },
    {
      id: "f_buccopharyngeal",
      name: "Buccopharyngeal fascia",
      layer: "fascia",
      summary: "The back part of the visceral layer, covering the constrictors and buccinator. It is the front wall of the retropharyngeal space.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "grodinsky"]
    },
    {
      id: "f_alar",
      name: "Alar fascia",
      layer: "fascia",
      summary: "A thin front lamina of the prevertebral layer, between the carotid sheaths, from the skull base to about T2, where it fuses with the visceral fascia. It separates the retropharyngeal space in front from the danger space behind.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["grodinsky"]
    },
    {
      id: "f_prevertebral",
      name: "Prevertebral fascia",
      layer: "fascia",
      summary: "Covers the prevertebral muscles and scalenes. The brachial plexus roots and the phrenic nerve lie deep to it; the cervical sympathetic trunk lies on or within it.",
      relations: [],
      supply: {},
      surgical: ["In neck dissection it is the floor that is preserved to protect the phrenic nerve and brachial plexus."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_posterior_cervical",
      name: "Posterior cervical space",
      layer: "fascia",
      summary: "The fat of the posterior triangle between the investing and prevertebral layers, containing the accessory nerve and the level V nodes.",
      relations: [],
      supply: {},
      surgical: ["Most masses here are nodes (metastases, lymphoma, tuberculosis) or lymphatic malformations."],
      danger: ["Accessory nerve"],
      variations: [],
      refs: ["harnsberger"]
    },
    {
      id: "f_buccal",
      name: "Buccal space",
      layer: "fascia",
      summary: "Between buccinator and the skin, in front of masseter, containing the buccal fat pad, the parotid duct and the facial vessels.",
      relations: [],
      supply: {},
      surgical: ["Infection from the upper molars swells the cheek with little trismus."],
      danger: [],
      variations: [],
      refs: ["vieira"]
    },

    // ---------- contents and landmarks ----------
    { id: "pharynx", name: "Pharynx and soft palate", layer: "gland", summary: "The nasopharynx, oropharynx and laryngopharynx, with the soft palate.", relations: ["The retropharyngeal space lies behind it, the parapharyngeal spaces at its sides"], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "oesophagus_trachea", name: "Oesophagus and trachea", layer: "gland", summary: "In the visceral space; the retropharyngeal space lies behind the oesophagus.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "tonsils", name: "Palatine tonsils", layer: "gland", summary: "In the tonsillar fossae, with the peritonsillar space around each capsule.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "parotid", name: "Parotid glands", layer: "gland", summary: "In the parotid spaces.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "smg", name: "Submandibular glands", layer: "gland", summary: "Mostly in the submandibular spaces, wrapping round the back edge of mylohyoid into the sublingual space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "sublingual", name: "Sublingual glands", layer: "gland", summary: "In the sublingual spaces.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "thyroid", name: "Thyroid gland", layer: "gland", summary: "In the visceral space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "carotids", name: "Carotid arteries", layer: "artery", course: [
      { key: "cca", label: "Common carotid artery", text: "In the carotid space, with the internal jugular vein lateral and the vagus behind." },
      { key: "bifurcation", label: "Bifurcation", text: "Usually at the upper border of the thyroid cartilage." },
      { key: "tonsil", label: "Behind the tonsil", text: "The internal carotid lies about 1.5–2.5 cm posterolateral to the tonsil, closer when tortuous. Incise a quinsy superficially and medially, never deep and lateral." },
      { key: "skull", label: "Carotid canal", text: "Passes up through the poststyloid compartment with the internal jugular vein and nerves IX–XII." }
    ], summary: "Common, internal and external carotids; the internal and common carotids lie in the carotid space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "ijv", name: "Internal jugular veins", layer: "vein", drawn: "redrawn", course: [
      { key: "top", label: "Jugular foramen", text: "In the poststyloid compartment, behind the internal carotid." },
      { key: "nodes", label: "Jugulodigastric node", text: "Level II nodes lie along the vein." },
      { key: "low", label: "Down the carotid sheath", text: "Septic thrombophlebitis spreading from the parapharyngeal space here is Lemierre syndrome." }
    ], summary: "In the carotid spaces, lateral to the carotids.", relations: [], supply: {}, surgical: ["Thrombosis in Lemierre syndrome."], danger: [], variations: [], refs: ["gray", "lemierre"] },
    { id: "vagus", name: "Vagus nerves", layer: "nerve", drawn: "redrawn", course: [
      { key: "top", label: "Below the jugular foramen", text: "Behind the internal carotid artery." },
      { key: "low", label: "Down the carotid sheath", text: "Posterior, between the artery and the vein." }
    ], summary: "In the carotid spaces, behind and between artery and vein.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    {
      id: "glossopharyngeal",
      name: "Glossopharyngeal nerve",
      aka: "Cranial nerve IX",
      layer: "nerve",
      summary: "Leaves the jugular foramen in front of the vagus, runs down in the poststyloid compartment and curves forward round stylopharyngeus, between the internal and external carotids, to the tongue base and tonsil bed.",
      course: [
        { key: "foramen", label: "Jugular foramen", text: "Through its anterior (nervous) part, in front of X and XI." },
        { key: "stylopharyngeus", label: "Round stylopharyngeus", text: "Supplies the muscle, then passes between the internal and external carotid arteries." },
        { key: "tongue", label: "Tongue base and tonsil bed", text: "Through the gap between the superior and middle constrictors." }
      ],
      relations: [],
      supply: {},
      surgical: ["Lies just deep to the tonsil bed: injury in tonsillectomy causes loss of taste on the posterior tongue and referred otalgia.", "With X, XI and XII it is at risk in poststyloid parapharyngeal tumour surgery (paraganglioma, schwannoma)."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "accessory",
      name: "Accessory nerve",
      aka: "Cranial nerve XI",
      layer: "nerve",
      summary: "Leaves the jugular foramen with IX and X and runs back, usually lateral to the internal jugular vein, over the transverse process of the atlas to sternocleidomastoid.",
      course: [
        { key: "foramen", label: "Jugular foramen", text: "Behind the vagus." },
        { key: "atlas", label: "Over the transverse process of C1", text: "A palpable landmark for the nerve; it usually crosses lateral to the internal jugular vein here." },
        { key: "scm", label: "Into sternocleidomastoid", text: "Through or under the muscle, then on to trapezius (see the lateral neck module)." }
      ],
      relations: [],
      supply: {},
      surgical: ["Can be stretched or divided in high level II dissection and transcervical approaches to the parapharyngeal space."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "hypoglossal",
      name: "Hypoglossal nerve",
      aka: "Cranial nerve XII",
      layer: "nerve",
      summary: "Leaves the hypoglossal canal medial to the vessels, spirals laterally behind the vagus and descends between the internal carotid and internal jugular vein. Its loop round the occipital artery is shown in the carotid triangle module.",
      course: [
        { key: "canal", label: "Hypoglossal canal", text: "Medial to the internal jugular vein and the internal carotid." },
        { key: "low", label: "Between the internal carotid and the jugular", text: "Descends in the poststyloid compartment towards the angle of the mandible." }
      ],
      relations: [],
      supply: {},
      surgical: ["Injury causes ipsilateral tongue weakness and atrophy, with dysarthria and swallowing difficulty when combined with IX and X palsies."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "sympathetic",
      name: "Cervical sympathetic trunk",
      layer: "nerve",
      drawn: true,
      summary: "Runs on longus capitis and longus colli, embedded in the prevertebral fascia, behind the carotid sheath.",
      course: [
        { key: "top", label: "Below the skull base", text: "Its fibres leave the superior cervical ganglion along the internal carotid artery." },
        { key: "scg", label: "Superior cervical ganglion", text: "At C2–C3, behind the internal carotid: a fusiform swelling 2–3 cm long, easily mistaken for a lymph node." },
        { key: "mcg", label: "Middle cervical ganglion", text: "At C6, near the inferior thyroid artery (inconstant)." },
        { key: "low", label: "To the cervicothoracic ganglion", text: "The inferior cervical ganglion fuses with T1 as the stellate ganglion at the root of the neck." }
      ],
      relations: [],
      supply: {},
      surgical: ["Damage gives Horner syndrome (ptosis, miosis, anhidrosis). Warn patients before excising poststyloid parapharyngeal tumours.", "First-bite syndrome (sharp parotid pain at the first bite of each meal) follows loss of the sympathetic supply to the parotid after parapharyngeal space surgery."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "route_odontogenic",
      name: "Odontogenic spread",
      aka: "Lower molar to submandibular and parapharyngeal spaces",
      layer: "route",
      drawn: true,
      summary: "The commonest source of deep neck infection in adults. The roots of the lower second and third molars lie below the mylohyoid line, so their abscesses break through the thin lingual cortex into the submandibular space, and from there back into the parapharyngeal space.",
      course: [
        { key: "molar", label: "Lower second and third molars", text: "Their root apices lie below the mylohyoid line." },
        { key: "mylohyoid", label: "Through the lingual cortex", text: "Below the mylohyoid line, pus enters the submandibular space; above it (premolars, first molar), the sublingual space." },
        { key: "submandibular", label: "Submandibular space", text: "Bilateral submandibular, sublingual and submental cellulitis is Ludwig's angina: the airway is at risk." },
        { key: "pps", label: "Parapharyngeal space", text: "Along styloglossus behind mylohyoid, then on to the carotid and retropharyngeal spaces." }
      ],
      relations: [],
      supply: {},
      surgical: ["Secure the airway before drainage; drain the spaces involved and remove the source tooth."],
      danger: [],
      variations: [],
      refs: ["vieira", "scottbrown"]
    },
    {
      id: "route_tonsillar",
      name: "Tonsillar spread",
      aka: "Peritonsillar to parapharyngeal and carotid spaces",
      layer: "route",
      drawn: true,
      summary: "A peritonsillar abscess can break through the superior constrictor into the parapharyngeal space, then reach the carotid space and track down the carotid sheath into the mediastinum.",
      course: [
        { key: "tonsil", label: "Peritonsillar space", text: "Quinsy: pus between the tonsil capsule and the superior constrictor." },
        { key: "pps", label: "Through the constrictor", text: "Into the parapharyngeal space: trismus (medial pterygoid) and medial bulging of the lateral pharyngeal wall." },
        { key: "carotid", label: "Carotid space", text: "Internal jugular thrombophlebitis (Lemierre syndrome) or erosion of the carotid, often heralded by a small 'herald' bleed." },
        { key: "mediastinum", label: "Down the carotid sheath", text: "The 'Lincoln highway' to the superior mediastinum." }
      ],
      relations: [],
      supply: {},
      surgical: ["CT with contrast for any quinsy with trismus out of proportion, neck swelling or failure to settle after drainage."],
      danger: [],
      variations: [],
      refs: ["vieira", "lemierre", "grodinsky"]
    },
    {
      id: "route_retropharyngeal",
      name: "Retropharyngeal spread",
      aka: "Rouvière node to the mediastinum",
      layer: "route",
      drawn: true,
      summary: "In young children, suppurating lateral retropharyngeal (Rouvière) nodes form a retropharyngeal abscess, which can spread down in front of the alar fascia to the upper mediastinum.",
      course: [
        { key: "node", label: "Lateral retropharyngeal node", text: "Drains the nasopharynx, adenoids, sinuses and middle ear; suppurates mostly under the age of 5." },
        { key: "space", label: "Retropharyngeal space", text: "Between the buccopharyngeal fascia in front and the alar fascia behind; a midline raphe keeps early collections to one side." },
        { key: "mediastinum", label: "To the upper mediastinum", text: "The space ends where the alar fascia fuses with the visceral fascia, at about T1–T2." }
      ],
      relations: [],
      supply: {},
      surgical: ["Lateral neck radiograph: prevertebral soft tissue wider than about 7 mm at C2 suggests a collection.", "Small collections in children may settle on antibiotics; larger ones are drained transorally (supine, head down) or transcervically."],
      danger: [],
      variations: [],
      refs: ["vieira", "grodinsky", "scottbrown"]
    },
    {
      id: "route_danger",
      name: "Danger space spread",
      aka: "Retropharyngeal to danger space and mediastinum",
      layer: "route",
      drawn: true,
      summary: "Infection breaching the alar fascia enters the danger space, which has no barrier from the skull base to the diaphragm, and can cause descending necrotising mediastinitis.",
      course: [
        { key: "retro", label: "Retropharyngeal space", text: "The usual source." },
        { key: "alar", label: "Through the alar fascia", text: "Into the danger space, between the alar and prevertebral layers." },
        { key: "mediastinum", label: "Towards the diaphragm", text: "Descending necrotising mediastinitis: CT of the chest is needed, and mediastinal drainage when the collection extends below the carina." }
      ],
      relations: [],
      supply: {},
      surgical: ["Mortality from descending necrotising mediastinitis remains high; early CT of the neck and chest and aggressive drainage improve survival."],
      danger: [],
      variations: [],
      refs: ["estrera", "grodinsky", "vieira"]
    },
    { id: "rp_nodes", name: "Retropharyngeal nodes", aka: "Lateral nodes of Rouvière", layer: "lymph", summary: "In the retropharyngeal space near the skull base, lateral to the longus capitis.", relations: [], supply: {}, surgical: ["Prominent in children; their suppuration causes retropharyngeal abscess. A route of metastasis from nasopharyngeal, oropharyngeal and hypopharyngeal cancer."], danger: [], variations: [], refs: ["gray", "vieira"] },
    { id: "nodes_ii", name: "Level II nodes", layer: "lymph", summary: "Upper deep cervical nodes along the carotid space, including the jugulodigastric node.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "constrictors", name: "Pharyngeal constrictors", layer: "muscle", summary: "Covered behind by the buccopharyngeal fascia; the medial wall of the parapharyngeal space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "longus", name: "Longus colli and longus capitis", layer: "muscle", summary: "In the prevertebral space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "pterygoids", name: "Pterygoid muscles", layer: "muscle", summary: "In the masticator space; medial pterygoid forms the lateral wall of the parapharyngeal space.", relations: [], supply: {}, surgical: ["Irritation of medial pterygoid causes the trismus of parapharyngeal and masticator infections."], danger: [], variations: [], refs: ["gray"] },
    { id: "masseter", name: "Masseter", layer: "muscle", summary: "In the masticator space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "styloid_muscles", name: "Stylopharyngeus and stylohyoid", layer: "muscle", summary: "With the styloid process, they mark the line between the prestyloid and poststyloid (carotid) compartments.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "digastric", name: "Digastric", layer: "muscle", summary: "The anterior bellies bound the submental space; the posterior belly is the guide to the parapharyngeal space in transcervical drainage.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "mylohyoid", name: "Mylohyoid", layer: "muscle", summary: "Separates the sublingual space (above) from the submandibular space (below).", relations: [], supply: {}, surgical: ["The mylohyoid line on the inner mandible decides which space a molar infection enters."], danger: [], variations: [], refs: ["gray"] },
    { id: "scm", name: "Sternocleidomastoid", layer: "muscle", summary: "Enclosed by the investing layer; its anterior border is the guide to the carotid space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "mandible", name: "Mandible", layer: "bone", summary: "Its ramus lies in the masticator space; the mylohyoid line runs along its inner surface.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "skull_base", name: "Skull base", layer: "bone", summary: "The upper attachment of the fascial layers and the roof of the parapharyngeal, retropharyngeal and danger spaces.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "hyoid", name: "Hyoid bone", layer: "bone", summary: "Divides suprahyoid from infrahyoid spaces; the apex of the parapharyngeal space is at its greater horn.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "larynx", name: "Larynx", layer: "bone", summary: "In the visceral space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] },
    { id: "vertebrae", name: "Cervical vertebrae", layer: "bone", summary: "Behind the prevertebral space.", relations: [], supply: {}, surgical: [], danger: [], variations: [], refs: ["gray"] }
  ],

  // Incisions drawn on the model at the surgery steps that name them (step.incision):
  // control points in app space, laid onto the outer surface along "axis" or "toward".
  incisions: [
    {"id": "transcervical", "name": "Transcervical incision", "note": "Two to three finger breadths below the angle and body of the mandible, in a skin crease.", "points": [[-3.84, -1.94, 0.47], [-3.82, -1.95, 1.27], [-3.41, -2.17, 2.07], [-2.98, -2.37, 2.87], [-2.52, -2.6, 3.67], [-2.06, -2.86, 4.47]], "axis": [0.0, -2.4]}
  ],

  procedure: {
    title: "Transcervical drainage of a parapharyngeal and submandibular abscess",
    atRisk: [{"id": "carotids", "why": "Run through the carotid space next to the abscess: erosion and bleeding"}, {"id": "ijv", "why": "Thrombosis from spreading infection (Lemierre syndrome)"}, {"id": "vagus", "why": "In the carotid sheath: hoarseness and aspiration"}, {"id": "hypoglossal", "why": "Crosses the carotids below the posterior belly of digastric"}, {"id": "glossopharyngeal", "why": "Near the styloid muscles in the parapharyngeal space"}],
    steps: [
      {
        title: "Airway first",
        text: "Assess for trismus, drooling, stridor and floor-of-mouth swelling. Secure the airway before anything else, by awake fibreoptic intubation or, if anatomy is distorted, tracheostomy under local anaesthesia.",
        show: ["spaces", "bone", "gland"],
        focus: ["s_submandibular", "s_sublingual", "s_parapharyngeal", "pharynx"]
      },
      {
        title: "Define the collection",
        text: "Contrast CT shows which spaces are involved, whether there is a rim-enhancing abscess or only phlegmon, gas, and the relation to the carotid and jugular vein. Look specifically for extension into the retropharyngeal or danger space and the mediastinum.",
        show: ["spaces", "bone", "gland", "artery", "vein"],
        focus: ["s_parapharyngeal", "s_carotid", "s_retropharyngeal", "s_danger"]
      },
      {
        title: "Incision", incision: "transcervical",
        text: "A horizontal incision two to three finger breadths below the angle and body of the mandible, in a skin crease. Raise flaps deep to platysma; protect the marginal mandibular nerve.",
        show: ["fascia", "bone", "gland"],
        focus: ["investing_fascia", "mandible", "smg"]
      },
      {
        title: "Submandibular space",
        text: "Open the investing fascia and enter the submandibular space around the gland. Drain any collection and send pus for culture.",
        show: ["spaces", "bone", "gland", "muscle"],
        focus: ["s_submandibular", "smg", "mylohyoid", "digastric"]
      },
      {
        title: "Into the parapharyngeal space",
        text: "Find the anterior border of sternocleidomastoid and the carotid sheath. Follow the posterior belly of digastric up to the styloid, then dissect bluntly with a finger medially and upwards, deep to digastric and stylohyoid, along the medial surface of medial pterygoid, to open the parapharyngeal space.",
        show: ["spaces", "bone", "muscle", "artery", "vein"],
        focus: ["s_parapharyngeal", "digastric", "styloid_muscles", "pterygoids", "s_carotid"]
      },
      {
        title: "Retropharyngeal extension",
        text: "If the collection reaches behind the pharynx, continue medial to the carotid sheath, between the sheath and the constrictors, into the retropharyngeal space. Mediastinal extension needs thoracic drainage as well.",
        show: ["spaces", "bone", "muscle", "artery", "vein", "nerve"],
        focus: ["s_retropharyngeal", "s_danger", "constrictors", "s_carotid"]
      },
      {
        title: "Irrigate and drain",
        text: "Break down loculations, irrigate thoroughly, and leave drains in each space opened. Close loosely or leave the wound partly open.",
        show: ["spaces", "bone", "gland"],
        focus: ["s_parapharyngeal", "s_submandibular"]
      },
      {
        title: "After surgery",
        text: "Continue intravenous antibiotics covering streptococci and anaerobes, adjusted to cultures. Repeat imaging if fever or swelling persists, and watch for mediastinitis, jugular thrombosis and carotid bleeding.",
        show: ["spaces", "bone", "artery", "vein"],
        focus: ["s_carotid", "s_danger"]
      }
    ],
    complications: [
      "Airway obstruction before or during treatment",
      "Descending necrotising mediastinitis through the danger or retropharyngeal space",
      "Internal jugular thrombosis (Lemierre syndrome) and septic emboli",
      "Carotid erosion and haemorrhage",
      "Recurrence or a missed loculated collection; cranial nerve palsies (IX–XII, sympathetic chain)"
    ],
    refs: ["vieira", "scottbrown", "estrera"]
  },

  figures: [
    { id: "fig-spaces-axial", title: "Axial section at the oropharynx: the suprahyoid spaces", svg: "neckSpacesAxial" },
    { id: "fig-spaces-sagittal", title: "Midline sagittal view: retropharyngeal, danger and prevertebral spaces and how far each extends", svg: "neckSpacesSagittal" }
  ],

  quiz: [
    {
      q: "Which space extends from the skull base to the diaphragm?",
      options: ["Retropharyngeal space", "Danger space", "Visceral space", "Carotid space"],
      answer: 1,
      explain: "The danger space lies between the alar and prevertebral fascia and reaches the diaphragm; the retropharyngeal space stops at about T1–T2."
    },
    {
      q: "Retropharyngeal abscess is most common in young children because:",
      options: [
        "Their alar fascia is absent",
        "The retropharyngeal (Rouvière) lymph nodes are prominent and later regress",
        "Their tonsils lie in the retropharyngeal space",
        "Their prevertebral fascia is incomplete"
      ],
      answer: 1,
      explain: "The lateral retropharyngeal nodes drain the nose, sinuses and pharynx and suppurate after infections; they regress by about five years."
    },
    {
      q: "An infection from the roots of a lower third molar usually enters the:",
      options: ["Sublingual space", "Submandibular space", "Buccal space", "Peritonsillar space"],
      answer: 1,
      explain: "Second and third molar roots lie below the mylohyoid line, so infection enters the submandibular space; premolar and first molar roots lie above it (sublingual)."
    },
    {
      q: "Trismus in a parapharyngeal space infection is caused mainly by irritation of:",
      options: ["Masseter", "Medial pterygoid", "Temporalis", "Superior constrictor"],
      answer: 1,
      explain: "Medial pterygoid forms the lateral wall of the parapharyngeal space."
    },
    {
      q: "Ludwig's angina involves:",
      options: [
        "One parapharyngeal space",
        "Both submandibular and sublingual spaces and the submental space",
        "The retropharyngeal space",
        "The masticator space"
      ],
      answer: 1,
      explain: "It is a spreading cellulitis of the floor of the mouth and neck on both sides; airway management comes first."
    },
    {
      q: "Lemierre syndrome is septic thrombophlebitis of the:",
      options: ["Facial vein", "Internal jugular vein", "Cavernous sinus", "Retromandibular vein"],
      answer: 1,
      explain: "It follows pharyngitis, classically with Fusobacterium necrophorum, and seeds septic emboli to the lungs."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapter on the neck (cervical fascia).",
    grodinsky: "Grodinsky M, Holyoke EA. The fasciae and fascial spaces of the head, neck and adjacent regions. Am J Anat. 1938;63(3):367–408.",
    harnsberger: "Harnsberger HR, Osborn AG. Differential diagnosis of head and neck lesions based on their space of origin. 1. The suprahyoid part of the neck. AJR Am J Roentgenol. 1991;157(1):147–154.",
    vieira: "Vieira F, Allen SM, Stocks RM, Thompson JW. Deep neck infection. Otolaryngol Clin North Am. 2008;41(3):459–483.",
    lemierre: "Lemierre A. On certain septicaemias due to anaerobic organisms. Lancet. 1936;227(5874):701–703.",
    estrera: "Estrera AS, Landay MJ, Grisham JM, Sinn DP, Platt MR. Descending necrotizing mediastinitis. Surg Gynecol Obstet. 1983;157(6):545–552.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Chapters on deep neck space infection and the parapharyngeal space.",
    shah: "Shah JP, Patel SG, Singh B, Wong RJ. Jatin Shah's Head and Neck Surgery and Oncology. 5th ed. Elsevier; 2019."
  }
};
