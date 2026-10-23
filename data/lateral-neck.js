// Content for the lateral neck and neck dissection levels.
// Each structure id matches a mesh id in data/lateral-neck-meshes.js
// (structures without a mesh show a note in the app).

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.lateral_neck = {
  id: "lateral_neck",
  title: "Lateral neck",
  subtitle: "Neck dissection levels I–VI, both sides (described on the left)",

  overview: {
    intro:
      "The lateral neck holds the cervical lymph nodes that drain the upper aerodigestive tract, packed around the carotid sheath and through the posterior triangle. Neck dissection removes these nodes level by level while protecting the nerves and vessels that run through them. This module shows the left side, so it includes the thoracic duct. The nodes in the model are coloured by level.",
    boundaries: [
      { label: "Level I", text: "Above the hyoid, below the mandible: IA between the anterior bellies of digastric, IB between the anterior and posterior bellies (stylohyoid)" },
      { label: "Level II", text: "Skull base to the lower border of the hyoid, from stylohyoid to the posterior border of sternocleidomastoid. The accessory nerve divides IIA (in front) from IIB (behind)" },
      { label: "Level III", text: "Hyoid to the lower border of the cricoid, from the lateral border of sternohyoid to the posterior border of sternocleidomastoid" },
      { label: "Level IV", text: "Cricoid to the clavicle, with the same front and back limits as level III" },
      { label: "Level V", text: "Posterior triangle: behind sternocleidomastoid, in front of trapezius, above the clavicle. The plane of the lower border of the cricoid divides VA (above) from VB (below)" },
      { label: "Level VI", text: "Central compartment: hyoid to the suprasternal notch, between the common carotid arteries" }
    ],
    contents: [
      "Carotid sheath: common, internal and external carotid arteries, internal jugular vein, vagus nerve",
      "Accessory nerve crossing level II and the posterior triangle to trapezius",
      "Hypoglossal nerve high in level II; marginal mandibular nerve in level I",
      "Floor of the posterior triangle: splenius, levator scapulae and the scalenes under the prevertebral fascia, with the phrenic nerve and brachial plexus",
      "Transverse cervical and suprascapular vessels, external jugular vein, great auricular nerve",
      "Thoracic duct (left) entering the junction of the internal jugular and subclavian veins"
    ],
    keyPoints: [
      "Stay superficial to the prevertebral fascia in the floor of the posterior triangle. The phrenic nerve and brachial plexus lie deep to it.",
      "The accessory nerve leaves the posterior border of sternocleidomastoid about 1 cm above Erb's point, where the great auricular nerve winds round it.",
      "On the left, the thoracic duct arches up to 3–4 cm above the clavicle before draining into the venous angle. Ligate tissue there rather than relying on diathermy.",
      "Selective neck dissections remove only the levels at risk for the primary site, for example levels I–III for oral cavity cancer and II–IV for laryngeal cancer."
    ],
    refs: ["robbins2002", "robbins2008", "som1999", "scottbrown"]
  },

  layers: [
    { id: "superficial", label: "Platysma", defaultOn: false },
    { id: "bone", label: "Bone", defaultOn: true },
    { id: "muscle", label: "Muscles", defaultOn: true },
    { id: "gland", label: "Glands", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: true },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "lymph", label: "Nodes by level", defaultOn: true },
    { id: "context", label: "Posterior & deep", defaultOn: false }
  ],

  structures: [
    // ---------- node levels ----------
    {
      id: "nodes_ia",
      name: "Level IA (submental)",
      layer: "lymph",
      summary: "Nodes in the submental triangle, between the anterior bellies of the two digastric muscles, above the hyoid.",
      relations: ["Boundaries: anterior bellies of digastric (lateral), hyoid (inferior), symphysis of the mandible (superior)"],
      supply: { "Drain": "Lower lip, chin, floor of mouth, tip of tongue, lower incisors" },
      surgical: ["Removed in a level I dissection. Often bilateral risk for midline lip and floor-of-mouth tumours."],
      danger: [],
      variations: [],
      refs: ["robbins2002", "som1999"]
    },
    {
      id: "nodes_ib",
      name: "Level IB (submandibular)",
      layer: "lymph",
      summary: "Nodes around the submandibular gland and along the facial vessels, between the anterior belly of digastric and stylohyoid.",
      relations: ["Prevascular and retrovascular facial nodes lie next to the marginal mandibular nerve at the lower border of the mandible"],
      supply: { "Drain": "Oral cavity, anterior nasal cavity, lips, cheek, submandibular gland" },
      surgical: [
        "Removed with the submandibular gland. Find and protect the marginal mandibular nerve before clearing the perifacial nodes.",
        "In this model, few of Z-Anatomy's submandibular nodes sit in the IB position; most lie close to the midline and are coloured as IA."
      ],
      danger: ["Marginal mandibular nerve"],
      variations: [],
      refs: ["robbins2002", "dingman"]
    },
    {
      id: "nodes_iia",
      name: "Level IIA (upper jugular, in front of XI)",
      layer: "lymph",
      summary: "Upper jugular nodes in front of the accessory nerve, including the jugulodigastric node where the posterior belly of digastric crosses the internal jugular vein.",
      relations: [
        "Boundaries: skull base (superior), lower border of hyoid (inferior), stylohyoid (anterior), the vertical plane of the accessory nerve (posterior)",
        "The hypoglossal nerve crosses the carotid arteries at the top of this level"
      ],
      supply: { "Drain": "Oral cavity, nasal cavity, nasopharynx, oropharynx, hypopharynx, larynx, parotid" },
      surgical: ["Included in almost every neck dissection. The jugulodigastric node is the commonest site of nodal metastasis from oropharyngeal and oral cancer."],
      danger: ["Accessory nerve", "Hypoglossal nerve", "Internal jugular vein"],
      variations: [],
      refs: ["robbins2002", "som1999", "scottbrown"]
    },
    {
      id: "nodes_iib",
      name: "Level IIB (submuscular recess)",
      layer: "lymph",
      summary: "Nodes behind the accessory nerve, in the recess under the upper sternocleidomastoid towards the skull base.",
      relations: ["Bounded by the accessory nerve (anterior), the posterior border of sternocleidomastoid (posterior) and the skull base (superior)"],
      supply: {},
      surgical: [
        "Dissecting IIB means retracting and handling the accessory nerve, which raises the risk of shoulder dysfunction. Some surgeons leave IIB out of selective dissections when the risk of metastasis there is low.",
        "Z-Anatomy has no nodes in this position, so the level has no 3D nodes."
      ],
      danger: ["Accessory nerve"],
      variations: [],
      refs: ["robbins2008", "scottbrown"]
    },
    {
      id: "nodes_iii",
      name: "Level III (middle jugular)",
      layer: "lymph",
      summary: "Middle jugular nodes, between the hyoid and the lower border of the cricoid.",
      relations: [
        "Boundaries: lower border of hyoid (superior), lower border of cricoid (inferior), lateral border of sternohyoid (anterior), posterior border of sternocleidomastoid (posterior)",
        "The superior belly of omohyoid crosses the carotid sheath here (a surgical, not radiological, landmark)"
      ],
      supply: { "Drain": "Oral cavity, oropharynx, hypopharynx, larynx" },
      surgical: ["The common facial vein usually enters the internal jugular vein at the top of this level and is ligated during dissection."],
      danger: ["Vagus nerve, inside the carotid sheath", "Ansa cervicalis on the sheath"],
      variations: [],
      refs: ["robbins2002", "som1999"]
    },
    {
      id: "nodes_iv",
      name: "Level IV (lower jugular)",
      layer: "lymph",
      summary: "Lower jugular nodes, from the cricoid down to the clavicle.",
      relations: ["Boundaries: lower border of cricoid (superior), clavicle (inferior), lateral border of sternohyoid (anterior), posterior border of sternocleidomastoid (posterior)"],
      supply: { "Drain": "Hypopharynx, larynx, cervical oesophagus, thyroid" },
      surgical: [
        "On the left, the thoracic duct runs through the bottom of this level. Clamp and tie the lymphatic tissue at the venous angle, then check for chyle with a Valsalva manoeuvre before closing.",
        "Z-Anatomy's supraclavicular and inferior deep lateral cervical nodes lie beside the internal jugular vein here, so they are coloured as level IV."
      ],
      danger: ["Thoracic duct (left)", "Phrenic nerve, deep to the prevertebral fascia", "Vagus nerve"],
      variations: [],
      refs: ["robbins2002", "shah", "scottbrown"]
    },
    {
      id: "nodes_va",
      name: "Level VA (upper posterior triangle)",
      layer: "lymph",
      summary: "Posterior triangle nodes above the level of the lower border of the cricoid, mainly along the accessory nerve.",
      relations: ["Boundaries: posterior border of sternocleidomastoid (anterior), anterior border of trapezius (posterior), apex of the posterior triangle (superior), plane of the lower border of cricoid (inferior)"],
      supply: { "Drain": "Nasopharynx, oropharynx, posterior scalp and neck" },
      surgical: [
        "The accessory nerve runs through this level to trapezius. Find it before clearing the nodes.",
        "Z-Anatomy has no accessory-chain nodes. The nodes coloured here are its superficial lateral cervical nodes over the posterior triangle."
      ],
      danger: ["Accessory nerve"],
      variations: [],
      refs: ["robbins2002", "som1999"]
    },
    {
      id: "nodes_vb",
      name: "Level VB (lower posterior triangle)",
      layer: "lymph",
      summary: "Posterior triangle nodes below the cricoid, including the transverse cervical and supraclavicular nodes.",
      relations: ["Boundaries: plane of the lower border of cricoid (superior), clavicle (inferior), sternocleidomastoid (anterior), trapezius (posterior)"],
      supply: { "Drain": "Nasopharynx, thyroid, and (on the left, Virchow's node) the abdomen and thorax via the thoracic duct" },
      surgical: ["The transverse cervical vessels and the inferior belly of omohyoid cross this level. Brachial plexus trunks lie deep to the prevertebral fascia beneath it."],
      danger: ["Brachial plexus", "Phrenic nerve", "Transverse cervical vessels"],
      variations: [],
      refs: ["robbins2002", "som1999"]
    },
    {
      id: "nodes_vi",
      name: "Level VI (central compartment)",
      layer: "lymph",
      summary: "Pretracheal, paratracheal, precricoid (Delphian) and perithyroid nodes, between the carotid arteries from the hyoid to the suprasternal notch.",
      relations: ["The recurrent laryngeal nerves run through the paratracheal nodes"],
      supply: { "Drain": "Thyroid, glottic and subglottic larynx, piriform sinus apex, cervical oesophagus" },
      surgical: ["Central neck dissection for thyroid cancer clears this level. Identify and protect the recurrent laryngeal nerves and parathyroid glands."],
      danger: ["Recurrent laryngeal nerves", "Parathyroid glands"],
      variations: [],
      refs: ["robbins2008", "scottbrown"]
    },

    // ---------- nerves ----------
    {
      id: "accessory",
      name: "Accessory nerve",
      aka: "Cranial nerve XI (spinal part)",
      layer: "nerve",
      course: [
        { key: "foramen", label: "Jugular foramen", text: "Leaves the skull with IX and X, in front of the internal jugular vein." },
        { key: "ijv", label: "Crosses the internal jugular vein", text: "At the transverse process of C1, usually superficial to the vein (deep to it in roughly a quarter). This is the level IIa/IIb boundary." },
        { key: "scm", label: "Deep surface of sternocleidomastoid", text: "Supplies the muscle as it passes through or under it." },
        { key: "erb", label: "Posterior border of sternocleidomastoid", text: "Emerges about 1 cm above Erb's point, where the great auricular nerve winds round the muscle." },
        { key: "trapezius", label: "Under the anterior border of trapezius", text: "Crosses the posterior triangle on levator scapulae, very superficially, to reach trapezius 3–5 cm above the clavicle." }
      ],
      summary: "Leaves the jugular foramen, crosses the internal jugular vein high in level II, enters and supplies sternocleidomastoid, then crosses the posterior triangle on levator scapulae to reach trapezius.",
      relations: [
        "Usually passes superficial (lateral) to the internal jugular vein, but deep to it in a significant minority",
        "Leaves the posterior border of sternocleidomastoid about 1 cm above Erb's point, where the great auricular nerve winds round the muscle",
        "Crosses the posterior triangle superficially, in the fascial roof, then passes under the anterior border of trapezius about 3–5 cm above the clavicle"
      ],
      supply: { "Motor": "Sternocleidomastoid and trapezius (with C3–C4 contributions to trapezius)" },
      surgical: [
        "Find it early in level II by following the posterior belly of digastric back to the internal jugular vein, or in the posterior triangle above Erb's point.",
        "Gentle handling matters: even an intact nerve that has been stretched or devascularised can give shoulder weakness."
      ],
      danger: [
        "Injury gives shoulder syndrome: pain, drooping and winging of the scapula, and weak abduction above 90°.",
        "In the posterior triangle it is easy to mistake for a sensory branch of the cervical plexus; stimulate before dividing anything in its path."
      ],
      variations: ["Its relation to the internal jugular vein, and whether it divides before entering sternocleidomastoid, both vary"],
      refs: ["gray", "scottbrown", "nahum"]
    },
    {
      id: "vagus",
      name: "Vagus nerve",
      aka: "Cranial nerve X",
      layer: "nerve",
      course: [
        { key: "foramen", label: "Jugular foramen", text: "Inferior (nodose) ganglion just below the skull base." },
        { key: "sln", label: "Superior laryngeal nerve", text: "Arises from the inferior ganglion and runs down and forward deep to both carotids." },
        { key: "sheath", label: "In the carotid sheath", text: "Posterior, in the groove between the carotid artery and the internal jugular vein." },
        { key: "thorax", label: "Enters the thorax", text: "Between the left common carotid and subclavian arteries; the left recurrent nerve leaves it under the aortic arch." }
      ],
      summary: "Runs down inside the carotid sheath, in the groove behind and between the internal jugular vein and the carotid arteries.",
      relations: ["Posterior, between the internal jugular vein (lateral) and the internal and common carotid arteries (medial)"],
      supply: { "Branches in the neck": "Pharyngeal branch, superior laryngeal nerve, cardiac branches; the left recurrent laryngeal nerve arises in the thorax" },
      surgical: ["Identify it before ligating the internal jugular vein in a radical neck dissection, and keep it out of the ligature."],
      danger: ["Injury gives vocal fold paralysis (hoarseness, aspiration) and, high in the neck, pharyngeal and laryngeal sensory loss"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hypoglossal",
      name: "Hypoglossal nerve",
      aka: "Cranial nerve XII",
      layer: "nerve",
      summary: "Curves forward across the internal and external carotid arteries just below the posterior belly of digastric, at the top of level II.",
      relations: ["Crosses superficial to both carotids and the loop of the lingual artery; the descending hypoglossal (superior root of ansa cervicalis) leaves it here"],
      supply: { "Motor": "Muscles of the tongue except palatoglossus" },
      surgical: ["Often guarded by a sternocleidomastoid branch of the occipital artery and a plexus of veins (the 'ranine' veins). Control bleeding here under direct vision."],
      danger: ["Injury makes the tongue deviate to the injured side on protrusion"],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "phrenic",
      name: "Phrenic nerve",
      aka: "C3, C4, C5",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "origin", label: "C3–C5, lateral border of scalenus anterior", text: "Mainly C4, at the upper lateral border of the muscle." },
        { key: "tca", label: "Under the transverse cervical and suprascapular arteries", text: "Runs obliquely down and medially on scalenus anterior, deep to the prevertebral fascia." },
        { key: "thorax", label: "Enters the thorax", text: "In front of the subclavian artery and behind the subclavian vein, at the muscle's medial border." }
      ],
      summary: "Runs down the front of scalenus anterior, from its lateral border above to its medial border below, deep to the prevertebral fascia.",
      relations: [
        "Deep to the prevertebral fascia, the transverse cervical and suprascapular arteries, and (on the left) the thoracic duct",
        "Enters the thorax between the subclavian artery and vein"
      ],
      supply: { "Motor": "Diaphragm (its only motor supply)", "Sensory": "Mediastinal pleura, pericardium, central diaphragm" },
      surgical: ["The prevertebral fascia is the floor of a neck dissection. Divide cervical plexus branches lateral to where the phrenic nerve takes its C3–C5 roots, and keep the fascia intact over the nerve."],
      danger: ["Injury paralyses the diaphragm on that side (raised hemidiaphragm, breathlessness, worse with poor lung function)"],
      variations: ["An accessory phrenic nerve (often from the nerve to subclavius) is common"],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "brachial_plexus",
      name: "Brachial plexus (roots and trunks)",
      layer: "nerve",
      summary: "Roots C5–T1 emerge between scalenus anterior and scalenus medius and form the trunks in the lower posterior triangle.",
      relations: ["Deep to the prevertebral fascia, behind the third part of the subclavian artery"],
      supply: {},
      surgical: ["Stay above the prevertebral fascia when clearing level VB. The upper trunk is the most exposed."],
      danger: ["Upper trunk injury: Erb's palsy pattern (weak shoulder abduction and elbow flexion)"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sympathetic",
      name: "Cervical sympathetic trunk",
      layer: "nerve",
      summary: "Runs on longus colli and longus capitis behind the carotid sheath, with the superior, middle and inferior (cervicothoracic) cervical ganglia.",
      relations: ["Deep to the carotid sheath, superficial to the prevertebral muscles, embedded in or just behind the prevertebral fascia"],
      supply: {},
      surgical: ["Not normally exposed in a neck dissection. Dissecting behind the carotid sheath can injure it."],
      danger: ["Injury gives Horner's syndrome: ptosis, miosis and anhidrosis on that side"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "mmn",
      name: "Marginal mandibular nerve",
      aka: "Branch of the facial nerve (CN VII)",
      layer: "nerve",
      summary: "Runs forward deep to platysma along the lower border of the mandible, superficial to the facial vessels.",
      relations: ["See the submandibular region for detail"],
      supply: { "Motor": "Depressor anguli oris, depressor labii inferioris, mentalis" },
      surgical: ["Raise the upper flap deep to platysma and protect the nerve before clearing level IB (Hayes Martin manoeuvre)."],
      danger: ["Injury gives an asymmetric smile"],
      variations: [],
      refs: ["dingman", "martin"]
    },
    {
      id: "great_auricular",
      name: "Great auricular nerve",
      aka: "C2, C3 (cervical plexus)",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "erb", label: "Erb's point", text: "Winds round the posterior border of sternocleidomastoid from C2–C3." },
        { key: "scm", label: "Over sternocleidomastoid", text: "Climbs on the muscle with the external jugular vein, deep to platysma." },
        { key: "lobule", label: "To the ear lobe", text: "Supplies the lobule, the skin over the parotid and the angle of the mandible." }
      ],
      summary: "Winds round the posterior border of sternocleidomastoid at Erb's point and runs up across the muscle towards the ear lobe, parallel to and behind the external jugular vein.",
      relations: ["Superficial to sternocleidomastoid, deep to platysma"],
      supply: { "Sensory": "Skin over the parotid, angle of the mandible and ear lobe" },
      surgical: [
        "A landmark for the accessory nerve, which emerges about 1 cm above it.",
        "Preserve it where the oncology allows; it is also a useful nerve graft donor."
      ],
      danger: ["Division numbs the ear lobe"],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "ansa",
      name: "Ansa cervicalis",
      aka: "C1–C3",
      layer: "nerve",
      summary: "A loop on or in the front of the carotid sheath. The superior root leaves the hypoglossal nerve; the inferior root comes from C2–C3.",
      relations: ["Supplies the infrahyoid strap muscles except thyrohyoid"],
      supply: {},
      surgical: ["Usually divided in a comprehensive neck dissection without functional loss; can be used for reinnervation of the recurrent laryngeal nerve."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- vessels ----------
    {
      id: "ijv",
      name: "Internal jugular vein",
      layer: "vein",
      course: [
        { key: "bulb", label: "Jugular bulb", text: "Leaves the jugular foramen as the sigmoid sinus continues; the accessory nerve, IX and X lie close in front." },
        { key: "accessory", label: "Crossed by the accessory nerve", text: "At C1, the high-risk point for XI in level II dissection." },
        { key: "facial", label: "Common facial vein", text: "Its main anterior tributary, at the carotid bifurcation; divide it to open the carotid sheath." },
        { key: "omohyoid", label: "Crossed by omohyoid", text: "The intermediate tendon divides level III from IV, at about the cricoid." },
        { key: "angle", label: "Venous angle", text: "Joins the subclavian vein behind the sternoclavicular joint; on the left the thoracic duct enters here." }
      ],
      summary: "The lateral component of the carotid sheath, running from the jugular foramen to join the subclavian vein behind the sternoclavicular joint.",
      relations: ["Lateral to the carotid arteries, with the vagus behind and between them; the deep cervical nodes (levels II–IV) cluster round it"],
      supply: { "Tributaries in the neck": "Common facial, lingual, pharyngeal, superior and middle thyroid veins" },
      surgical: [
        "Removed in a radical neck dissection; preserved (type II/III modified radical) whenever possible.",
        "Ligating both internal jugular veins at one operation risks facial and cerebral oedema; stage bilateral sacrifice if it is unavoidable."
      ],
      danger: ["Air embolism if opened low in the neck with the patient head-up"],
      variations: [],
      refs: ["gray", "robbins2008"]
    },
    {
      id: "cca",
      name: "Common carotid artery",
      layer: "artery",
      summary: "The medial component of the carotid sheath. On the left it arises from the aortic arch. It divides into internal and external carotids at about the upper border of the thyroid cartilage.",
      relations: ["The medial limit of levels III and IV, and the lateral limit of level VI"],
      supply: {},
      surgical: ["Preserved in all standard neck dissections. In an irradiated neck, cover it with healthy tissue (for example a pectoralis major flap) if exposed, to reduce the risk of carotid blowout."],
      danger: ["Pressure on the carotid sinus at the bifurcation can cause bradycardia and hypotension"],
      variations: ["The bifurcation level varies between C2 and C5"],
      refs: ["gray"]
    },
    {
      id: "ica",
      name: "Internal carotid artery",
      layer: "artery",
      summary: "Ascends from the bifurcation to the carotid canal with no branches in the neck.",
      relations: ["Lies behind and lateral to the external carotid at first"],
      supply: {},
      surgical: ["No branches in the neck distinguishes it from the external carotid."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "eca",
      name: "External carotid artery",
      layer: "artery",
      summary: "Gives the superior thyroid, lingual, facial, occipital, ascending pharyngeal and posterior auricular arteries in the neck.",
      relations: ["Crossed by the hypoglossal nerve and the posterior belly of digastric"],
      supply: {},
      surgical: ["Can be ligated above the superior thyroid artery to control bleeding in its territory."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_artery",
      name: "Facial artery",
      layer: "artery",
      summary: "Arises from the external carotid and passes deep to the posterior belly of digastric towards the submandibular gland.",
      relations: [],
      supply: {},
      surgical: ["Ligated at the origin and at the lower border of the mandible when level IB is cleared with the gland."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "occipital_artery",
      name: "Occipital artery",
      layer: "artery",
      summary: "Runs back along the lower border of the posterior belly of digastric. Its sternocleidomastoid branch loops over the hypoglossal nerve.",
      relations: [],
      supply: {},
      surgical: ["Its sternocleidomastoid branch is a landmark and a common source of bleeding near the hypoglossal nerve in level II."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "thyrocervical",
      name: "Thyrocervical trunk and branches",
      layer: "artery",
      summary: "From the first part of the subclavian artery: inferior thyroid, transverse cervical and suprascapular arteries.",
      relations: ["The transverse cervical and suprascapular arteries cross the front of scalenus anterior and the phrenic nerve, then run through the lower posterior triangle"],
      supply: {},
      surgical: ["The transverse cervical vessels mark the lower part of level V. Leaving them on the prevertebral fascia keeps the dissection above the phrenic nerve."],
      danger: [],
      variations: ["The transverse cervical artery often arises separately or from a common trunk with the dorsal scapular artery"],
      refs: ["gray"]
    },
    {
      id: "subclavian_artery",
      name: "Subclavian artery",
      layer: "artery",
      summary: "Arches over the pleura behind scalenus anterior, which divides it into three parts.",
      relations: ["The phrenic nerve crosses in front of its first part (behind the subclavian vein)"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "vertebral_artery",
      name: "Vertebral artery",
      layer: "artery",
      summary: "First branch of the subclavian artery, ascending to enter the foramen transversarium of C6.",
      relations: ["Lies deep, in the angle between longus colli and scalenus anterior; the thoracic duct arches in front of it on the left"],
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
      summary: "Runs down across sternocleidomastoid, deep to platysma, and pierces the deep fascia above the clavicle to join the subclavian vein.",
      relations: ["The great auricular nerve runs parallel to it, just behind"],
      supply: {},
      surgical: ["Often divided when raising flaps; preserve it if it may be needed for a free-flap venous anastomosis."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ajv",
      name: "Anterior jugular vein",
      layer: "vein",
      summary: "Runs down near the midline and turns laterally deep to sternocleidomastoid to join the external jugular vein.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_vein",
      name: "Facial and common facial veins",
      layer: "vein",
      summary: "The common facial vein drains into the internal jugular vein at about the level of the hyoid.",
      relations: [],
      supply: {},
      surgical: ["Ligated when peeling the specimen off the internal jugular vein; its junction is a good place to start the dissection of the sheath."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "subclavian_vein",
      name: "Subclavian vein",
      layer: "vein",
      summary: "Joins the internal jugular vein behind the medial end of the clavicle (the venous angle) to form the brachiocephalic vein.",
      relations: ["Lies in front of scalenus anterior, separated from the subclavian artery by the muscle"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "thoracic_duct",
      name: "Thoracic duct",
      layer: "lymph",
      drawn: true,
      course: [
        { key: "ascent", label: "Rises from the thorax", text: "On the left of the oesophagus." },
        { key: "arch", label: "Arches at C7", text: "Behind the carotid sheath, in front of the vertebral artery, scalenus anterior and phrenic nerve." },
        { key: "angle", label: "Left venous angle", text: "Drains into the junction of the internal jugular and subclavian veins; a chyle leak follows injury in left level IV." }
      ],
      summary: "Ascends from the thorax on the left, arches laterally at about C7 behind the carotid sheath and in front of the vertebral artery, scalenus anterior and phrenic nerve, then empties into the left venous angle.",
      relations: [
        "The arch can rise 3–4 cm above the clavicle",
        "Behind the carotid sheath; in front of the vertebral artery, sympathetic trunk, phrenic nerve and scalenus anterior"
      ],
      supply: {},
      surgical: [
        "Ligate the lymphatic tissue at the bottom of level IV on the left instead of cauterising it. Ask the anaesthetist for a Valsalva manoeuvre and look for clear or milky fluid before closing.",
        "On the right, a smaller right lymphatic duct drains at the right venous angle."
      ],
      danger: [
        "Chyle leak after neck dissection is reported in roughly 1–3% of cases, mostly on the left: milky drain fluid once feeding starts. Most settle with a low-fat or medium-chain triglyceride diet and pressure; high-output leaks may need re-exploration."
      ],
      variations: ["It may end as several channels, or drain into the internal jugular, subclavian or external jugular vein"],
      refs: ["gray", "shah", "scottbrown"]
    },

    // ---------- muscles ----------
    {
      id: "scm",
      name: "Sternocleidomastoid",
      layer: "muscle",
      summary: "Runs from the mastoid process to the manubrium and medial clavicle. It covers levels II–IV and divides the anterior and posterior triangles.",
      relations: ["The accessory nerve enters its deep surface in the upper third; the great auricular and transverse cervical nerves wind round its posterior border at Erb's point"],
      supply: { "Nerve": "Accessory nerve (CN XI), with C2–C3 sensory fibres" },
      surgical: ["Removed in a radical neck dissection. In a modified radical dissection, its fascia is unwrapped from front to back so the muscle can be retracted to expose the levels beneath."],
      danger: [],
      variations: [],
      refs: ["gray", "robbins2008"]
    },
    {
      id: "omohyoid",
      name: "Omohyoid",
      layer: "muscle",
      summary: "Two bellies joined by an intermediate tendon held to the clavicle by a fascial sling. The superior belly crosses the carotid sheath; the inferior belly crosses the lower posterior triangle.",
      relations: ["The superior belly crosses the internal jugular vein near the level of the cricoid"],
      supply: { "Nerve": "Ansa cervicalis" },
      surgical: ["A practical surgical marker: where it crosses the internal jugular vein is roughly the level III–IV boundary, and the inferior belly lies just above the brachial plexus and transverse cervical vessels."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "strap",
      name: "Strap muscles",
      aka: "Sternohyoid, sternothyroid, thyrohyoid",
      layer: "muscle",
      summary: "Infrahyoid muscles in front of the larynx and thyroid. The lateral border of sternohyoid is the anterior limit of levels III and IV.",
      relations: [],
      supply: { "Nerve": "Ansa cervicalis (thyrohyoid: C1 via the hypoglossal nerve)" },
      surgical: ["Retracted or divided high to expose the thyroid in a central neck dissection."],
      danger: [],
      variations: [],
      refs: ["gray", "robbins2002"]
    },
    {
      id: "digastric",
      name: "Digastric",
      layer: "muscle",
      summary: "The posterior belly runs from the mastoid notch to the intermediate tendon at the hyoid; the anterior belly runs on to the mandible.",
      relations: ["The posterior belly lies superficial to the carotids, internal jugular vein and the hypoglossal, vagus and accessory nerves"],
      supply: { "Nerve": "Posterior belly: facial nerve. Anterior belly: nerve to mylohyoid" },
      surgical: ["The 'resident's friend'. Its lower border marks the top of a level II dissection; retracting it upward shows the accessory nerve crossing the internal jugular vein."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "stylohyoid",
      name: "Stylohyoid",
      layer: "muscle",
      summary: "Runs along the posterior belly of digastric from the styloid process to the hyoid. It is the boundary between levels IB and II.",
      relations: [],
      supply: { "Nerve": "Facial nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["robbins2002"]
    },
    {
      id: "mylohyoid",
      name: "Mylohyoid",
      layer: "muscle",
      summary: "Floor of the mouth. Retracting its free posterior border exposes the lingual nerve when level IB is cleared with the gland.",
      relations: [],
      supply: { "Nerve": "Nerve to mylohyoid" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "scalenus_anterior",
      name: "Scalenus anterior",
      layer: "muscle",
      summary: "Runs from the anterior tubercles of C3–C6 to the scalene tubercle of the first rib. The key landmark in the floor of the lower neck.",
      relations: [
        "The phrenic nerve runs down its front, deep to the prevertebral fascia",
        "The subclavian vein lies in front of it and the subclavian artery and brachial plexus behind"
      ],
      supply: { "Nerve": "Ventral rami C4–C6" },
      surgical: ["Keeping the fascia on its surface intact protects the phrenic nerve."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "scalenes",
      name: "Scalenus medius and posterior",
      layer: "context",
      summary: "Part of the floor of the posterior triangle. The brachial plexus emerges between scalenus anterior and medius.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "levator_scapulae",
      name: "Levator scapulae",
      layer: "context",
      summary: "Part of the floor of the posterior triangle. The accessory nerve crosses its surface on the way to trapezius.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "splenius",
      name: "Splenius capitis",
      layer: "context",
      summary: "Forms the upper floor of the posterior triangle.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "trapezius",
      name: "Trapezius (upper part)",
      layer: "context",
      summary: "Its anterior border is the posterior limit of level V.",
      relations: ["The accessory nerve passes under its anterior border about 3–5 cm above the clavicle"],
      supply: { "Nerve": "Accessory nerve, with C3–C4" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "robbins2002"]
    },
    {
      id: "platysma",
      name: "Platysma",
      layer: "superficial",
      summary: "Neck flaps are raised in the plane just deep to platysma.",
      relations: [],
      supply: { "Nerve": "Cervical branch of the facial nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- glands ----------
    {
      id: "smg",
      name: "Submandibular gland",
      layer: "gland",
      summary: "Removed with the level IB nodes in a comprehensive neck dissection.",
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
      layer: "gland",
      summary: "The tail of the parotid marks the upper limit of level II behind the angle of the mandible.",
      relations: [],
      supply: {},
      surgical: ["Its lower pole is where the marginal mandibular and cervical branches of the facial nerve emerge."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "thyroid",
      name: "Thyroid gland",
      layer: "gland",
      summary: "In the central compartment (level VI), wrapped round the trachea below the cricoid.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- bones ----------
    {
      id: "mandible",
      name: "Mandible",
      layer: "bone",
      summary: "Its lower border is the upper limit of level I.",
      relations: [],
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
      summary: "Its lower border separates levels II and III, and is the upper limit of level VI.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["robbins2002", "som1999"]
    },
    {
      id: "larynx",
      name: "Thyroid and cricoid cartilages",
      layer: "bone",
      summary: "The lower border of the cricoid separates levels III and IV, and VA and VB.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["robbins2002", "som1999"]
    },
    {
      id: "clavicle",
      name: "Clavicle",
      layer: "bone",
      summary: "The lower limit of levels IV and VB.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["robbins2002"]
    },
    {
      id: "sternum",
      name: "Manubrium",
      layer: "bone",
      summary: "The suprasternal notch is the lower limit of level VI.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["robbins2002"]
    },
    {
      id: "first_rib",
      name: "First rib",
      layer: "context",
      summary: "Shown for orientation. Scalenus anterior inserts on its scalene tubercle.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "vertebrae",
      name: "Cervical vertebrae C1–C7",
      layer: "context",
      summary: "Shown for orientation.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "temporal",
      name: "Temporal bone (mastoid)",
      layer: "context",
      summary: "Origin of sternocleidomastoid and the posterior belly of digastric.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  procedure: {
    title: "Modified radical neck dissection (levels I–V)",
    steps: [
      {
        title: "Position and incision",
        text: "Supine with a shoulder roll, neck extended and head turned to the opposite side. Use a skin-crease incision (for example an apron, or a transverse incision with a vertical limb) that gives access from the mandible to the clavicle and from the midline to trapezius, and keeps flap corners away from the carotid.",
        show: ["superficial", "bone", "muscle"],
        focus: ["platysma", "scm", "clavicle", "trapezius"]
      },
      {
        title: "Subplatysmal flaps",
        text: "Raise flaps just deep to platysma: up to the lower border of the mandible, down to the clavicle, back to the anterior border of trapezius and forward to the midline. Keep the external jugular vein and great auricular nerve on sternocleidomastoid. Protect the marginal mandibular nerve in the upper flap.",
        show: ["superficial", "bone", "muscle", "vein", "nerve"],
        focus: ["platysma", "ejv", "great_auricular", "mmn"]
      },
      {
        title: "Level I",
        text: "Clear the submental triangle, then the submandibular triangle with the gland. Protect the marginal mandibular nerve, ligate the facial vessels, and identify the lingual and hypoglossal nerves deep to mylohyoid.",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve", "lymph"],
        focus: ["nodes_ia", "nodes_ib", "smg", "digastric", "mmn", "facial_artery"]
      },
      {
        title: "Unwrap sternocleidomastoid",
        text: "Incise the fascia along the anterior border of sternocleidomastoid and peel it off the muscle from front to back, as far as its posterior border, keeping it attached to the specimen. Retract the muscle to expose the carotid sheath and levels II–IV.",
        show: ["bone", "muscle", "gland", "vein", "nerve", "lymph"],
        focus: ["scm", "great_auricular", "ejv"]
      },
      {
        title: "Accessory nerve and level II",
        text: "Retract the posterior belly of digastric upward and find the accessory nerve crossing the internal jugular vein. Follow it to sternocleidomastoid. Dissect level IIB from under the nerve and pass it beneath the nerve to join level IIA. The hypoglossal nerve marks the upper limit, crossing the carotids.",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve", "lymph"],
        focus: ["accessory", "nodes_iia", "nodes_iib", "digastric", "ijv", "hypoglossal"]
      },
      {
        title: "Posterior triangle (level V)",
        text: "Find the accessory nerve about 1 cm above Erb's point at the posterior border of sternocleidomastoid and follow it to trapezius. Clear level V from the anterior border of trapezius forward, staying on the prevertebral fascia over splenius, levator scapulae and the scalenes. Divide cervical plexus branches superficial and lateral to the phrenic nerve.",
        show: ["bone", "muscle", "artery", "vein", "nerve", "lymph", "context"],
        focus: ["nodes_va", "nodes_vb", "accessory", "trapezius", "levator_scapulae", "omohyoid"]
      },
      {
        title: "Floor of the neck",
        text: "Sweep the specimen forward over scalenus anterior. The phrenic nerve runs down its front and the brachial plexus emerges behind it, both deep to the prevertebral fascia. Leave the transverse cervical vessels on the fascia where possible.",
        show: ["bone", "muscle", "artery", "vein", "nerve", "context"],
        focus: ["phrenic", "scalenus_anterior", "brachial_plexus", "thyrocervical"]
      },
      {
        title: "Level IV and the thoracic duct",
        text: "Divide the lower part of the specimen above the clavicle between clamps and tie it. On the left, the thoracic duct arches into the junction of the internal jugular and subclavian veins here. Ligate rather than cauterise, and check for chyle with a Valsalva manoeuvre.",
        show: ["bone", "muscle", "artery", "vein", "nerve", "lymph"],
        focus: ["thoracic_duct", "nodes_iv", "ijv", "subclavian_vein", "omohyoid"]
      },
      {
        title: "Carotid sheath, levels III–II",
        text: "Work upward, peeling the specimen off the internal jugular vein and ligating its tributaries, including the common facial vein. Keep the vagus nerve, common carotid artery and hypoglossal nerve in view. Deliver the specimen in continuity, check haemostasis and chyle, place suction drains and close in layers.",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve", "lymph"],
        focus: ["ijv", "cca", "vagus", "hypoglossal", "nodes_iii", "facial_vein"]
      }
    ],
    complications: [
      "Shoulder dysfunction from accessory nerve injury or traction: pain, drooping, scapular winging and weak abduction",
      "Chyle leak (mostly left-sided)",
      "Marginal mandibular, hypoglossal, vagus or phrenic nerve injury; Horner's syndrome from the sympathetic trunk",
      "Numbness of the ear lobe and neck skin from cervical plexus division",
      "Haematoma, seroma, wound infection; flap necrosis or carotid exposure, especially after radiotherapy",
      "Facial and cerebral oedema after bilateral internal jugular vein ligation"
    ],
    refs: ["robbins2008", "crile", "bocca", "nahum", "shah", "scottbrown"]
  },

  figures: [
    { id: "fig-levels", title: "Neck dissection levels (left lateral view)", svg: "levels" }
  ],

  quiz: [
    {
      q: "Which structure divides level IIA from level IIB?",
      options: ["Posterior belly of digastric", "Internal jugular vein", "Accessory nerve", "Hypoglossal nerve"],
      answer: 2,
      explain: "Level IIA lies in front of the vertical plane of the accessory nerve, and IIB behind it."
    },
    {
      q: "The boundary between levels III and IV is:",
      options: ["The hyoid bone", "The lower border of the cricoid cartilage", "The omohyoid tendon", "The clavicle"],
      answer: 1,
      explain: "Robbins (2002) uses the lower border of the cricoid. Omohyoid crossing the internal jugular vein is a practical surgical marker for roughly the same level."
    },
    {
      q: "Where does the accessory nerve leave the posterior border of sternocleidomastoid?",
      options: [
        "About 1 cm above Erb's point",
        "At the level of the clavicle",
        "At the mastoid tip",
        "About 3 cm below Erb's point"
      ],
      answer: 0,
      explain: "It leaves about 1 cm above the point where the great auricular nerve winds round the posterior border (Erb's point)."
    },
    {
      q: "Milky drain fluid on day 2 after a left neck dissection most likely means injury to the:",
      options: ["Internal jugular vein", "Thoracic duct", "Parotid duct", "Vagus nerve"],
      answer: 1,
      explain: "Chyle leak comes from the thoracic duct or its tributaries at the left venous angle, and typically appears once enteral feeding starts."
    },
    {
      q: "The phrenic nerve in the neck lies:",
      options: [
        "On scalenus medius, superficial to the investing fascia",
        "On scalenus anterior, deep to the prevertebral fascia",
        "Inside the carotid sheath",
        "On levator scapulae with the accessory nerve"
      ],
      answer: 1,
      explain: "It runs down the front of scalenus anterior, deep to the prevertebral fascia, which is why the fascia is kept intact as the floor of the dissection."
    },
    {
      q: "A modified radical neck dissection differs from a radical neck dissection by:",
      options: [
        "Removing fewer node levels",
        "Preserving one or more of the accessory nerve, internal jugular vein and sternocleidomastoid",
        "Adding level VI",
        "Removing the submandibular gland"
      ],
      answer: 1,
      explain: "Both remove levels I–V. The modified radical dissection preserves one or more of the three non-lymphatic structures (Robbins 2002/2008)."
    }
  ],

  references: {
    robbins2002: "Robbins KT, Clayman G, Levine PA, et al. Neck dissection classification update: revisions proposed by the American Head and Neck Society and the American Academy of Otolaryngology–Head and Neck Surgery. Arch Otolaryngol Head Neck Surg. 2002;128(7):751–758.",
    robbins2008: "Robbins KT, Shaha AR, Medina JE, et al. Consensus statement on the classification and terminology of neck dissection. Arch Otolaryngol Head Neck Surg. 2008;134(5):536–538.",
    som1999: "Som PM, Curtin HD, Mancuso AA. An imaging-based classification for the cervical nodes designed as an adjunct to recent clinically based nodal classifications. Arch Otolaryngol Head Neck Surg. 1999;125(4):388–396.",
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the neck.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Volume 3, neck dissection chapters.",
    shah: "Shah JP, Patel SG, Singh B, Wong RJ. Jatin Shah's Head and Neck Surgery and Oncology. 5th ed. Elsevier; 2019. Cervical lymph nodes chapter.",
    crile: "Crile G. Excision of cancer of the head and neck, with special reference to the plan of dissection based on one hundred and thirty-two operations. JAMA. 1906;47(22):1780–1786.",
    bocca: "Bocca E, Pignataro O. A conservation technique in radical neck dissection. Ann Otol Rhinol Laryngol. 1967;76(5):975–987.",
    nahum: "Nahum AM, Mullally W, Marmor L. A syndrome resulting from radical neck dissection. Arch Otolaryngol. 1961;74:424–428.",
    dingman: "Dingman RO, Grabb WC. Surgical anatomy of the mandibular ramus of the facial nerve based on the dissection of 100 facial halves. Plast Reconstr Surg. 1962;29:266–272.",
    martin: "Martin H, Del Valle B, Ehrlich H, Cahan WG. Neck dissection. Cancer. 1951;4(3):441–499."
  }
};
