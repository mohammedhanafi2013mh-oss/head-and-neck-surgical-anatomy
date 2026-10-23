// Content for the thyroid, parathyroids and central neck (level VI).
// Each structure id matches a mesh id in data/thyroid-meshes.js
// (structures without a mesh show a note in the app).

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.thyroid = {
  id: "thyroid",
  title: "Thyroid & central neck",
  subtitle: "Thyroid, parathyroids, laryngeal nerves and level VI, both sides",

  overview: {
    intro:
      "The thyroid has two lobes on either side of the larynx and upper trachea, joined by an isthmus across the second to fourth tracheal rings. It lies inside the pretracheal (visceral) fascia, under the strap muscles. Because that fascia and Berry's ligament tie it to the larynx, it moves up when the patient swallows. Thyroid surgery is mainly about three things beside the gland: the recurrent laryngeal nerves running up behind each lobe, the external branch of the superior laryngeal nerve near the upper pole, and the four small parathyroid glands on the back of the lobes. The central compartment (level VI) holds the nodes that drain the thyroid first.",
    boundaries: [
      { label: "Superior (level VI)", text: "Hyoid bone" },
      { label: "Inferior (level VI)", text: "Suprasternal notch. Below it, down to the brachiocephalic (innominate) artery, is level VII, the superior mediastinum" },
      { label: "Lateral", text: "Common carotid arteries" },
      { label: "Anterior", text: "Skin, platysma (absent in the midline), investing fascia and the strap muscles" },
      { label: "Posterior", text: "Prevertebral fascia over longus colli; the oesophagus and the tracheo-oesophageal grooves" }
    ],
    contents: [
      "Thyroid gland and the four parathyroids (usually)",
      "Recurrent laryngeal nerves in or near the tracheo-oesophageal grooves",
      "Superior, middle and inferior thyroid veins; superior and inferior thyroid arteries",
      "Prelaryngeal (Delphian), pretracheal and paratracheal nodes",
      "Larynx, trachea, oesophagus, and the upper thymus behind the sternum"
    ],
    keyPoints: [
      "The right recurrent laryngeal nerve hooks under the subclavian artery and runs obliquely up and in. The left hooks under the aortic arch and runs more vertically in the tracheo-oesophageal groove.",
      "Both nerves enter the larynx behind the cricothyroid joint, deep to the inferior constrictor. Just below that, beside Berry's ligament, is where they are most often injured.",
      "Ligate the superior thyroid vessels on the capsule of the upper pole, branch by branch, to protect the external branch of the superior laryngeal nerve.",
      "Superior parathyroids lie dorsal to the plane of the recurrent nerve, near the cricothyroid junction. Inferior parathyroids lie ventral to it, near the lower pole, and vary more in position.",
      "Both parathyroids on each side usually get their blood from the inferior thyroid artery. Tie its branches on the capsule, not the main trunk, to keep the glands alive."
    ],
    refs: ["gray", "randolph", "robbins2002", "carty2009"]
  },

  layers: [
    { id: "superficial", label: "Platysma", defaultOn: false },
    { id: "bone", label: "Larynx, trachea & bone", defaultOn: true },
    { id: "muscle", label: "Strap muscles & oesophagus", defaultOn: true },
    { id: "gland", label: "Thyroid & parathyroids", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: true },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "lymph", label: "Lymph nodes", defaultOn: true },
    { id: "context", label: "Surrounding", defaultOn: false }
  ],

  structures: [
    // ---------- glands ----------
    {
      id: "thyroid",
      name: "Thyroid gland",
      layer: "gland",
      summary:
        "Two lobes, each about 5 cm tall, joined by the isthmus across tracheal rings 2–4. It weighs about 15–25 g in an adult. The upper poles reach the oblique line of the thyroid cartilage; the lower poles reach the fifth or sixth tracheal ring. (The Z-Anatomy gland in the 3D model sits a little higher than this.)",
      relations: [
        "Anterior: sternothyroid and sternohyoid, with omohyoid laterally; sternocleidomastoid overlaps the lobes",
        "Medial: larynx and trachea; behind them the pharynx and oesophagus, with the recurrent laryngeal nerves in the grooves between",
        "Posterolateral: the carotid sheath (common carotid, internal jugular vein, vagus)",
        "Posterior surface: the parathyroids, the inferior thyroid artery and the end of the recurrent laryngeal nerve",
        "The upper pole sits under the upper end of sternothyroid, which stops a goitre from growing upwards; goitres grow down behind the sternum instead"
      ],
      supply: {
        "Arterial": "Superior thyroid artery (external carotid) to the upper pole; inferior thyroid artery (thyrocervical trunk) to the back of the lower lobe; sometimes a thyroid ima artery",
        "Venous": "Superior and middle thyroid veins to the internal jugular vein; inferior thyroid veins to the left brachiocephalic vein",
        "Lymphatic": "First to level VI (prelaryngeal, pretracheal and paratracheal nodes), then levels III and IV and the superior mediastinum (VII)"
      },
      surgical: [
        "Operate in the plane between the true capsule and the pretracheal fascia. Capsular dissection keeps the nerve and parathyroids, which lie outside the capsule, out of harm's way.",
        "Retrosternal goitres can nearly always be delivered through the neck, because their blood supply comes from the neck.",
        "A pyramidal lobe runs up from the isthmus, usually left of the midline. Remove it with a total thyroidectomy, or thyroid tissue left behind will show on scans and can regrow."
      ],
      danger: ["Recurrent laryngeal nerves", "External branches of the superior laryngeal nerves", "Parathyroids and their blood supply"],
      variations: [
        "Pyramidal lobe in about half of people, often attached to the hyoid by a fibrous or muscular band (levator glandulae thyroideae)",
        "Thyroid ima artery in a small minority (reported up to about 10%), from the brachiocephalic trunk or the arch, running up in front of the trachea",
        "Absent isthmus; thyroglossal duct remnants anywhere from the foramen caecum to the isthmus; lingual thyroid"
      ],
      refs: ["gray", "randolph", "scottbrown"]
    },
    {
      id: "parathyroid_superior",
      name: "Superior parathyroid glands",
      aka: "Parathyroid IV (from the fourth pharyngeal pouch)",
      layer: "gland",
      summary:
        "Yellow-tan glands, each about 5 mm long and 30–50 mg, on the back of the upper half of the lobe. They migrate only a short way, so their position is fairly constant.",
      relations: [
        "Usually about 1 cm above where the recurrent laryngeal nerve crosses the inferior thyroid artery",
        "Near the cricothyroid junction, at the level of the lower border of the cricoid",
        "Dorsal (deep) to the plane of the recurrent laryngeal nerve",
        "Often under the tubercle of Zuckerkandl or in fat behind the upper pole"
      ],
      supply: { "Arterial": "Usually a branch of the inferior thyroid artery; sometimes the superior thyroid artery or an anastomosis between them" },
      surgical: [
        "Look for them before ligating vessels on the back of the upper pole. Sweep each one off the capsule on its own blood supply.",
        "An enlarged superior gland (adenoma) can drop down behind the oesophagus into the posterior mediastinum (tracheo-oesophageal groove)."
      ],
      danger: [
        "Devascularising or removing parathyroids causes hypocalcaemia. If a gland turns dark or is removed by accident, confirm it is parathyroid on frozen section and autotransplant it in small pieces into sternocleidomastoid."
      ],
      variations: ["Most people have four glands; supernumerary glands are found in about one in eight and fewer than four in a few percent (Akerström 1984)"],
      refs: ["akerstrom", "randolph", "gray"]
    },
    {
      id: "parathyroid_inferior",
      name: "Inferior parathyroid glands",
      aka: "Parathyroid III (from the third pharyngeal pouch, with the thymus)",
      layer: "gland",
      summary:
        "They come down with the thymus from the third pouch, a longer journey, so their position varies more than the superior glands. Most lie near the lower pole of the lobe.",
      relations: [
        "Ventral (superficial) to the plane of the recurrent laryngeal nerve",
        "Usually on the back or side of the lower pole, below the inferior thyroid artery",
        "Otherwise in the thyrothymic ligament or the upper thymus; rarely high near the carotid bifurcation (undescended) or in the mediastinum"
      ],
      supply: { "Arterial": "Inferior thyroid artery" },
      surgical: [
        "In a central neck dissection the inferior glands are the ones most at risk, because the fat and nodes they lie in are being removed. Check the specimen for them before it leaves the field.",
        "A missing inferior gland in parathyroid surgery: look in the thyrothymic ligament and thymus first (cervical thymectomy)."
      ],
      danger: ["Removed or devascularised in central neck dissection, causing hypocalcaemia"],
      variations: ["Ectopic in the thymus, the anterior mediastinum, within the thyroid, or undescended near the carotid bifurcation"],
      refs: ["akerstrom", "randolph", "carty2009"]
    },
    {
      id: "thymus",
      name: "Thymus (upper poles)",
      layer: "gland",
      summary:
        "In adults mostly fat, lying behind the manubrium in front of the great vessels. Its upper horns reach into the lower neck, joined to the lower thyroid poles by the thyrothymic ligaments.",
      relations: ["Behind the sternohyoid and sternothyroid origins; in front of the left brachiocephalic vein"],
      supply: { "Venous": "Thymic veins drain into the left brachiocephalic vein" },
      surgical: ["Inferior parathyroids are often found here. Following the thyrothymic ligament leads into the thymus."],
      danger: ["The left brachiocephalic vein lies just behind it at the thoracic inlet"],
      variations: [],
      refs: ["gray", "randolph"]
    },
    {
      id: "berry_ligament",
      name: "Berry's ligament",
      aka: "Posterior suspensory ligament of the thyroid",
      layer: "gland",
      summary:
        "A dense band of the pretracheal fascia that ties the back of each lobe to the cricoid and the first two tracheal rings. It is what makes the gland move with swallowing.",
      relations: [
        "The recurrent laryngeal nerve runs right beside it, sometimes through it or under a small tongue of thyroid tissue, just before entering the larynx",
        "Small branches of the inferior thyroid artery and veins run in it"
      ],
      supply: {},
      surgical: [
        "This is the most dangerous point in a thyroidectomy. Bleeding here tempts blind clamping or diathermy right next to the nerve.",
        "Keep the nerve in view and divide the ligament with fine instruments under direct vision. Avoid energy devices close to the nerve; their heat spreads a few millimetres."
      ],
      danger: ["Recurrent laryngeal nerve: traction, heat or division at this point causes most nerve injuries"],
      variations: [],
      refs: ["randolph", "scottbrown"]
    },
    {
      id: "zuckerkandl",
      name: "Tubercle of Zuckerkandl",
      layer: "gland",
      summary:
        "A knob of thyroid tissue sticking back from the posterolateral edge of the lobe, at about the level of the cricoid. It is seen in most patients when looked for.",
      relations: [
        "The recurrent laryngeal nerve usually runs deep (medial) to it, so it points to the nerve (Pelizzo 1998)",
        "The superior parathyroid often lies just above or behind it"
      ],
      supply: {},
      surgical: [
        "Lift the tubercle forward and medially to find the nerve underneath it.",
        "A large tubercle left behind can account for regrowth or a persistent mass, so mobilise and remove it with the lobe in a total thyroidectomy."
      ],
      danger: ["The nerve can occasionally run lateral to or through it, so do not divide tissue under it blindly"],
      variations: [],
      refs: ["pelizzo", "randolph"]
    },

    // ---------- nerves ----------
    {
      id: "rln_right",
      name: "Right recurrent laryngeal nerve",
      layer: "nerve",
      course: [
        { key: "loop", label: "Under the subclavian artery", text: "Leaves the vagus in front of the right subclavian artery and hooks under it." },
        { key: "ita", label: "Crosses the inferior thyroid artery", text: "Near the lower lobe; in front of, behind or between the artery's branches." },
        { key: "entry", label: "Enters the larynx", text: "Behind the cricothyroid joint, under the inferior constrictor, beside Berry's ligament." }
      ],
      drawn: true,
      summary:
        "Leaves the vagus in front of the right subclavian artery, hooks under it, and climbs up and in behind the common carotid towards the tracheo-oesophageal groove. Its course in the lower neck is more oblique and lateral than the left nerve's.",
      relations: [
        "Lower neck: further from the trachea and more lateral than the left nerve, so it can be met crossing the field low down",
        "Crosses the inferior thyroid artery near the lower lobe: in front of it, behind it, or between its branches",
        "Passes deep to the tubercle of Zuckerkandl and beside Berry's ligament, then enters the larynx behind the cricothyroid joint, under the inferior constrictor"
      ],
      supply: {
        "Motor": "All intrinsic muscles of the larynx except cricothyroid; also the cricopharyngeus",
        "Sensory": "Larynx below the vocal folds, upper trachea and oesophagus"
      },
      surgical: [
        "Find it low, in Simon's triangle (common carotid laterally, oesophagus and trachea medially, inferior thyroid artery above), where it is easy to see, then follow it up to the larynx.",
        "It often divides before reaching the larynx; the anterior branch usually carries the motor fibres to the vocal fold. Keep all branches.",
        "Nerve monitoring: stimulate the vagus before and after resection to show the whole pathway works."
      ],
      danger: [
        "One side injured: hoarse, breathy voice and aspiration",
        "Both sides injured: vocal folds near the midline, stridor and airway obstruction that may need reintubation or tracheostomy. If the first side loses signal on monitoring, consider leaving the second side for another day."
      ],
      variations: [
        "Non-recurrent right inferior laryngeal nerve in about 0.5–1%: it leaves the vagus in the neck and goes straight to the larynx. It comes with an aberrant right subclavian artery (arteria lusoria) arising from the arch beyond the left subclavian, and can be predicted from the preoperative CT."
      ],
      refs: ["gray", "randolph", "toniato", "randolph2011"]
    },
    {
      id: "rln_left",
      name: "Left recurrent laryngeal nerve",
      layer: "nerve",
      course: [
        { key: "loop", label: "Under the aortic arch", text: "Hooks under the arch beside the ligamentum arteriosum, then climbs in the tracheo-oesophageal groove." },
        { key: "ita", label: "Crosses the inferior thyroid artery", text: "More often behind the artery on the left." },
        { key: "entry", label: "Enters the larynx", text: "Behind the left cricothyroid joint, beside Berry's ligament." }
      ],
      drawn: true,
      summary:
        "Leaves the vagus in the chest, hooks under the aortic arch beside the ligamentum arteriosum, and climbs almost vertically in the left tracheo-oesophageal groove.",
      relations: [
        "Closer to the trachea and deeper in the groove than the right nerve throughout the neck",
        "More often behind the inferior thyroid artery than in front of it",
        "Enters the larynx behind the left cricothyroid joint, beside Berry's ligament"
      ],
      supply: {
        "Motor": "All intrinsic muscles of the left larynx except cricothyroid",
        "Sensory": "Larynx below the vocal folds"
      },
      surgical: [
        "Its longer course in the chest means a lung, mediastinal or aortic cause should be looked for when a left vocal fold palsy is found before surgery.",
        "Paratracheal (level VI) node dissection on the left is done along the whole visible nerve, with the nerve kept in view."
      ],
      danger: ["Traction, heat or division, mostly at Berry's ligament; injury on both sides threatens the airway"],
      variations: ["A non-recurrent left nerve is very rare and only happens with a right-sided aortic arch and an aberrant left subclavian artery"],
      refs: ["gray", "randolph"]
    },
    {
      id: "non_recurrent",
      name: "Non-recurrent laryngeal nerve",
      layer: "nerve",
      summary:
        "A right inferior laryngeal nerve that leaves the vagus in the neck and runs straight across to the larynx instead of looping under the subclavian artery. It is found in about 0.5–1% of right sides.",
      relations: [
        "Runs roughly horizontally from the vagus, often close to the inferior thyroid artery, and can look like a vessel",
        "Comes with an aberrant right subclavian artery (arteria lusoria) from the left end of the arch, passing behind the oesophagus"
      ],
      supply: {},
      surgical: [
        "Suspect it if the CT shows an aberrant right subclavian artery, or if vagal stimulation below the level of the inferior thyroid artery gives no signal on monitoring while stimulation higher up does.",
        "Do not divide any band crossing from the carotid sheath to the larynx until it is shown not to be the nerve."
      ],
      danger: ["Easily mistaken for the inferior thyroid artery or a band of tissue and divided"],
      variations: [],
      refs: ["toniato", "randolph"]
    },
    {
      id: "sln",
      name: "Superior laryngeal nerve (and internal branch)",
      layer: "nerve",
      drawn: true,
      summary:
        "Leaves the vagus near the inferior (nodose) ganglion and runs down and forward behind the internal carotid. Near the greater horn of the hyoid it divides into the internal branch (sensory) and the external branch (motor to cricothyroid).",
      relations: [
        "The internal branch pierces the thyrohyoid membrane with the superior laryngeal artery",
        "It lies above the operative field of a routine thyroidectomy"
      ],
      supply: { "Sensory (internal branch)": "Larynx above the vocal folds, epiglottis and piriform fossa" },
      surgical: ["High dissection on the thyrohyoid membrane can injure the internal branch, causing loss of laryngeal sensation and aspiration."],
      danger: ["Internal branch injury: silent aspiration"],
      variations: [],
      refs: ["gray", "randolph"]
    },
    {
      id: "ebsln",
      name: "External branch of the superior laryngeal nerve",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "origin", label: "From the superior laryngeal nerve", text: "Down on the inferior constrictor." },
        { key: "sta", label: "Beside the superior thyroid artery", text: "Runs with or deep to it; in Cernea type 2 it crosses within 1 cm of the upper pole." },
        { key: "cricothyroid", label: "Enters cricothyroid", text: "Injury lowers the voice's pitch and power." }
      ],
      summary:
        "A thin motor nerve that runs down on the inferior constrictor, close to the superior thyroid artery, to supply cricothyroid. It crosses the artery at a variable height above the upper pole.",
      relations: [
        "Lies on the inferior constrictor, medial to the superior thyroid vessels, in the sternothyroid–laryngeal triangle (Joll's space)",
        "Cernea type 1: crosses the superior thyroid artery more than 1 cm above the upper pole",
        "Cernea type 2a: crosses less than 1 cm above the upper pole",
        "Cernea type 2b: crosses below the upper border of the pole, the most dangerous course; commoner with large goitres"
      ],
      supply: { "Motor": "Cricothyroid, which tilts the thyroid cartilage forward and tenses the vocal folds; some fibres to the inferior constrictor" },
      surgical: [
        "Develop the space between the upper pole and the cricothyroid muscle, and ligate the superior thyroid vessels low on the capsule, branch by branch, not as a mass high up.",
        "Visible in only some patients; nerve monitoring (a twitch of cricothyroid) helps find it."
      ],
      danger: [
        "Injury lowers vocal pitch range, causes voice fatigue and loss of projection; a problem for singers and professional voice users. It is often missed on laryngoscopy because the cords still move."
      ],
      variations: ["In a minority the nerve runs within the inferior constrictor fibres, where it cannot be seen"],
      refs: ["cernea", "randolph", "randolph2011"]
    },
    {
      id: "vagus",
      name: "Vagus nerves",
      aka: "Cranial nerve X",
      layer: "nerve",
      summary: "Run down in each carotid sheath, behind and between the common carotid artery and the internal jugular vein.",
      relations: [
        "Right: gives the recurrent laryngeal nerve as it crosses in front of the subclavian artery",
        "Left: enters the chest between the left common carotid and subclavian arteries and gives its recurrent nerve under the arch"
      ],
      supply: { "Motor": "Pharynx and larynx (via the superior and recurrent laryngeal nerves)" },
      surgical: [
        "Nerve monitoring: stimulate the vagus in the carotid sheath at the start (V1) and the end (V2) of each side. A good V2 signal predicts normal vocal fold movement."
      ],
      danger: ["Injury in the sheath paralyses the vocal fold and loses sensation of the larynx on that side"],
      variations: [],
      refs: ["randolph2011", "gray"]
    },

    // ---------- arteries ----------
    {
      id: "superior_thyroid_artery",
      name: "Superior thyroid artery",
      layer: "artery",
      drawn: true,
      course: [
        { key: "origin", label: "From the external carotid", text: "Its first branch, just above the bifurcation." },
        { key: "pole", label: "Upper pole", text: "The external branch of the superior laryngeal nerve is closest here: ligate the branches on the capsule." }
      ],
      summary:
        "Usually the first branch of the external carotid. It runs down and forward under the strap muscles to the upper pole, where it divides into anterior and posterior branches on the capsule.",
      relations: [
        "The external branch of the superior laryngeal nerve runs close beside it",
        "Gives the superior laryngeal artery, which goes through the thyrohyoid membrane with the internal laryngeal nerve",
        "The superior thyroid vein runs with it"
      ],
      supply: { "Supplies": "Upper pole and front of the gland; larynx; sternocleidomastoid and the strap muscles" },
      surgical: [
        "Ligate the branches on the capsule of the upper pole, after the pole has been drawn down and laterally, rather than the trunk higher up.",
        "Securely tie: a slipped upper pole tie retracts and bleeds behind the strap muscles."
      ],
      danger: ["External branch of the superior laryngeal nerve"],
      variations: ["Can arise from the carotid bifurcation or the common carotid"],
      refs: ["gray", "cernea", "randolph"]
    },
    {
      id: "ita",
      name: "Inferior thyroid arteries",
      aka: "With the thyrocervical trunks",
      layer: "artery",
      course: [
        { key: "trunk", label: "Thyrocervical trunk", text: "From the first part of the subclavian artery." },
        { key: "arch", label: "Arches medially behind the carotid sheath", text: "At C6, then down to the back of the lobe, crossing the recurrent laryngeal nerve. Ligate branches on the capsule, not the trunk laterally, to protect the nerve and the parathyroids." }
      ],
      summary:
        "From the thyrocervical trunk of the subclavian artery. Each runs up along scalenus anterior, turns medially behind the carotid sheath at about C6, and reaches the back of the lower lobe.",
      relations: [
        "The recurrent laryngeal nerve crosses it near the gland, in front, behind or between its branches",
        "The sympathetic trunk lies behind it; the middle cervical ganglion is often close by"
      ],
      supply: { "Supplies": "Lower and back of the lobe; both parathyroids on that side in most people; trachea and oesophagus" },
      surgical: [
        "Do not tie the trunk laterally. Ligate its branches on the capsule (capsular dissection) so that the parathyroid branches survive.",
        "Its crossing with the recurrent nerve is a classic place to look for the nerve."
      ],
      danger: ["Recurrent laryngeal nerve, which can lie between its branches", "Parathyroid blood supply"],
      variations: ["Absent on one side in a few percent, more often on the left"],
      refs: ["gray", "randolph"]
    },
    {
      id: "cca",
      name: "Carotid arteries",
      aka: "Common carotids with the brachiocephalic trunk, and the start of the internal and external carotids",
      layer: "artery",
      summary:
        "The common carotids are the lateral boundaries of level VI. They divide at about the upper border of the thyroid cartilage; the superior thyroid artery is usually the first branch of the external carotid. The right arises from the brachiocephalic trunk behind the right sternoclavicular joint; the left from the arch.",
      relations: ["In the carotid sheath with the internal jugular vein laterally and the vagus behind"],
      supply: {},
      surgical: ["Retract the carotid sheath laterally to open the paratracheal space for a central neck dissection."],
      danger: [
        "The brachiocephalic (innominate) artery can rise into the neck, especially in older patients; it is at risk at the lower end of a central dissection and in a low tracheostomy"
      ],
      variations: [],
      refs: ["gray", "robbins2008"]
    },
    {
      id: "subclavian_arteries",
      name: "Subclavian arteries and aortic arch",
      layer: "artery",
      summary:
        "The loops the recurrent laryngeal nerves hook under: the right subclavian on the right and the aortic arch on the left.",
      relations: ["Their thyrocervical trunks give the inferior thyroid arteries"],
      supply: {},
      surgical: ["An aberrant right subclavian artery on CT predicts a non-recurrent right laryngeal nerve."],
      danger: [],
      variations: ["Aberrant right subclavian artery (arteria lusoria) in about 0.5–1%"],
      refs: ["gray", "toniato"]
    },

    // ---------- veins ----------
    {
      id: "superior_thyroid_vein",
      name: "Superior thyroid veins",
      layer: "vein",
      summary: "Run with the superior thyroid artery from the upper pole to the internal jugular vein (often via the common facial vein).",
      relations: ["Ligated with the upper pole vessels"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "middle_thyroid_vein",
      name: "Middle thyroid vein",
      layer: "vein",
      drawn: true,
      course: [
        { key: "gland", label: "Lateral surface of the lobe", text: "Short and wide." },
        { key: "ijv", label: "Internal jugular vein", text: "Usually the first vessel divided when mobilising the lobe." }
      ],
      summary: "A short, wide vein with no artery beside it, running from the side of the lobe straight to the internal jugular vein.",
      relations: ["Crosses in front of the common carotid artery"],
      supply: {},
      surgical: [
        "Usually the first vessel divided. Tying it lets the lobe roll forward and medially, opening the space behind it to show the nerve and parathyroids.",
        "It tears easily under traction and can bleed briskly from the jugular end."
      ],
      danger: ["Avulsion from the internal jugular vein"],
      variations: ["Absent in a proportion of people; sometimes there are two or more"],
      refs: ["gray", "randolph"]
    },
    {
      id: "inferior_thyroid_veins",
      name: "Inferior thyroid veins",
      layer: "vein",
      drawn: true,
      summary: "A plexus from the isthmus and lower poles that runs down in front of the trachea to the left brachiocephalic vein.",
      relations: ["Lie in front of the trachea in the pretracheal fascia, below the isthmus"],
      supply: {},
      surgical: ["Ligate them at the lower pole. They bleed in a tracheostomy below the isthmus."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ijv",
      name: "Internal jugular veins",
      layer: "vein",
      summary: "Lateral to the common carotids in the carotid sheaths. They receive the superior and middle thyroid veins.",
      relations: [],
      supply: {},
      surgical: ["The middle thyroid vein enters them directly; control both ends before dividing it."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "brachiocephalic_veins",
      name: "Brachiocephalic veins",
      layer: "vein",
      summary: "Formed behind each sternoclavicular joint. The left crosses behind the manubrium and receives the inferior thyroid and thymic veins.",
      relations: [],
      supply: {},
      surgical: ["Can lie above the sternal notch in some patients; take care at the lower end of a central or retrosternal dissection."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ajv",
      name: "Anterior jugular veins",
      layer: "vein",
      summary: "Run down either side of the midline on the strap muscles and join just above the sternum in the jugular venous arch (in the suprasternal space of Burns).",
      relations: ["Under platysma (which is thin or absent here) and on the investing fascia"],
      supply: {},
      surgical: ["Keep them on the strap muscles when raising flaps; ligate any that cross the midline before opening it."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- muscles and viscera ----------
    {
      id: "sternohyoid",
      name: "Sternohyoid",
      layer: "muscle",
      summary: "The more superficial strap muscle, from the back of the manubrium and clavicle to the body of the hyoid.",
      relations: ["The two muscles meet in the midline raphe, the avascular line opened to reach the thyroid"],
      supply: { "Nerve": "Ansa cervicalis (C1–C3)" },
      surgical: ["Open the midline raphe between the sternohyoids from thyroid cartilage to sternal notch and retract them laterally."],
      danger: [],
      variations: [],
      refs: ["gray", "randolph"]
    },
    {
      id: "sternothyroid",
      name: "Sternothyroid",
      layer: "muscle",
      summary: "Deep to sternohyoid, from the manubrium to the oblique line of the thyroid cartilage. It lies directly on the thyroid lobe.",
      relations: ["Its upper insertion caps the upper pole; this is why goitres grow downwards"],
      supply: { "Nerve": "Ansa cervicalis, entering in its lower part" },
      surgical: [
        "Dividing its upper fibres helps expose a high upper pole.",
        "If the straps must be cut for a large goitre, divide them high, because the ansa enters them low."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "randolph"]
    },
    {
      id: "thyrohyoid",
      name: "Thyrohyoid",
      layer: "muscle",
      summary: "Continues sternothyroid upwards, from the oblique line of the thyroid cartilage to the hyoid.",
      relations: ["Covers the thyrohyoid membrane, where the internal laryngeal nerve and superior laryngeal artery enter"],
      supply: { "Nerve": "C1 fibres travelling with the hypoglossal nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "omohyoid",
      name: "Omohyoid (superior belly)",
      layer: "muscle",
      summary: "The most lateral strap muscle, crossing the carotid sheath at about the cricoid level.",
      relations: ["A landmark for the level III/IV boundary in the lateral neck"],
      supply: { "Nerve": "Ansa cervicalis" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "cricothyroid",
      name: "Cricothyroid",
      layer: "muscle",
      summary: "Straight and oblique parts from the front of the cricoid arch to the thyroid cartilage. It tilts the thyroid cartilage forward, lengthening and tensing the vocal folds.",
      relations: ["The upper pole of the thyroid lies against it; the external branch of the superior laryngeal nerve ends in it"],
      supply: { "Nerve": "External branch of the superior laryngeal nerve (the only intrinsic laryngeal muscle not supplied by the recurrent nerve)" },
      surgical: ["Open the avascular space between the upper pole and cricothyroid before ligating the upper pole vessels."],
      danger: ["Diathermy or ligatures on the muscle can injure the nerve endings"],
      variations: [],
      refs: ["gray", "cernea"]
    },
    {
      id: "constrictor",
      name: "Inferior pharyngeal constrictor",
      layer: "muscle",
      summary: "Thyropharyngeus and cricopharyngeus, wrapping the lower pharynx from the thyroid and cricoid cartilages.",
      relations: [
        "The external branch of the superior laryngeal nerve runs on (or in) its surface",
        "The recurrent laryngeal nerve passes under its lower border, behind the cricothyroid joint, to enter the larynx"
      ],
      supply: { "Nerve": "Pharyngeal plexus (vagus); recurrent laryngeal nerve to cricopharyngeus" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "oesophagus",
      name: "Oesophagus (cervical)",
      layer: "muscle",
      summary: "Starts at the lower border of the cricoid (C6) and lies behind the trachea, slightly to the left.",
      relations: ["The tracheo-oesophageal grooves on either side hold the recurrent laryngeal nerves and paratracheal nodes"],
      supply: { "Arterial": "Inferior thyroid arteries" },
      surgical: ["Because it lies slightly left, the left paratracheal space is narrower; take care not to injure it in a left central dissection."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- larynx, trachea, bone ----------
    {
      id: "larynx",
      name: "Larynx (thyroid and cricoid cartilages)",
      layer: "bone",
      summary: "The thyroid cartilage's laminae and oblique lines, the cricoid ring below, and the arytenoids and epiglottis inside.",
      relations: [
        "The cricothyroid joint, at the side of the cricoid, is where the recurrent nerve enters the larynx (just behind it)",
        "The lower border of the cricoid marks C6, the start of the trachea and oesophagus"
      ],
      supply: {},
      surgical: ["The cricothyroid joint is a reliable landmark for the end of the recurrent laryngeal nerve, even in revision surgery."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "trachea",
      name: "Trachea",
      layer: "bone",
      summary: "Starts at the lower border of the cricoid. The thyroid isthmus crosses rings 2–4.",
      relations: ["Berry's ligament attaches the lobes to the cricoid and first two rings"],
      supply: { "Arterial": "Inferior thyroid arteries" },
      surgical: [
        "Long-standing large goitres can soften the rings (tracheomalacia), though this is rare; check the airway after a large goitre is removed.",
        "Heat injury from energy devices on the tracheal wall can cause delayed perforation."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "randolph"]
    },
    {
      id: "hyoid",
      name: "Hyoid bone",
      layer: "bone",
      summary: "The upper boundary of level VI.",
      relations: ["The thyroglossal tract passes in front of, through or behind its body"],
      supply: {},
      surgical: ["Sistrunk's operation for a thyroglossal cyst removes the middle of the hyoid with the tract."],
      danger: [],
      variations: [],
      refs: ["gray", "robbins2002"]
    },
    {
      id: "sternum",
      name: "Manubrium",
      layer: "bone",
      summary: "The suprasternal notch is the lower boundary of level VI.",
      relations: [],
      supply: {},
      surgical: ["A sternotomy is rarely needed for a retrosternal goitre; consider it when the goitre reaches below the aortic arch or is in the posterior mediastinum."],
      danger: [],
      variations: [],
      refs: ["robbins2002", "randolph"]
    },
    {
      id: "clavicles",
      name: "Clavicles",
      layer: "bone",
      summary: "A Kocher incision is placed about two fingers' breadth above the clavicles and sternal notch, in a skin crease.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- lymph ----------
    {
      id: "nodes_vi",
      name: "Level VI nodes (central compartment)",
      aka: "Prelaryngeal, pretracheal, paratracheal and perithyroid",
      layer: "lymph",
      summary:
        "The first echelon for thyroid cancer. They include the prelaryngeal (Delphian) node over the cricothyroid membrane, the pretracheal nodes below the isthmus, and the paratracheal nodes along the recurrent laryngeal nerves.",
      relations: [
        "Boundaries: hyoid above, suprasternal notch below, common carotids laterally",
        "Paratracheal nodes lie around the recurrent nerve, in front of and behind it, especially on the right where the nerve runs more obliquely"
      ],
      supply: {},
      surgical: [
        "A therapeutic central neck dissection is done when nodes are involved; a prophylactic one is considered for some higher-risk cancers.",
        "Clear the fat and nodes from the carotid to the trachea and from the hyoid to the innominate artery, with the recurrent nerve kept in view and the inferior parathyroid saved (or autotransplanted).",
        "Unilateral or bilateral: a paratracheal dissection on one side plus the prelaryngeal and pretracheal nodes (ATA consensus, Carty 2009)."
      ],
      danger: ["Recurrent laryngeal nerve", "Inferior parathyroids and their blood supply", "Innominate artery and left brachiocephalic vein at the lower end"],
      variations: [],
      refs: ["robbins2002", "robbins2008", "carty2009"]
    },
    {
      id: "nodes_lateral",
      name: "Lower jugular nodes (levels III–IV)",
      layer: "lymph",
      summary: "The next echelon after level VI for thyroid cancer, along the lower internal jugular vein.",
      relations: [],
      supply: {},
      surgical: ["Involved lateral nodes are treated by a lateral neck dissection (usually levels II–V); see the Lateral neck module."],
      danger: [],
      variations: [],
      refs: ["robbins2002"]
    },

    // ---------- superficial and surrounding ----------
    {
      id: "platysma",
      name: "Platysma",
      layer: "superficial",
      summary: "Thin or absent in the midline. Thyroid flaps are raised in the plane deep to it, superficial to the anterior jugular veins.",
      relations: [],
      supply: { "Nerve": "Cervical branch of the facial nerve" },
      surgical: ["Raise flaps up to the thyroid cartilage notch and down to the sternal notch."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "scm",
      name: "Sternocleidomastoid",
      layer: "context",
      summary: "Overlaps the lateral part of the lobes and the carotid sheath.",
      relations: [],
      supply: { "Nerve": "Accessory nerve" },
      surgical: ["Parathyroid fragments are often autotransplanted into small pockets in this muscle."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "vertebrae",
      name: "Vertebrae C5–T1",
      layer: "context",
      summary: "The cricoid lies at C6; the isthmus at about C6–C7.",
      relations: ["The prevertebral fascia over longus colli is the floor of the central compartment"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  // Incisions drawn on the model at the surgery steps that name them (step.incision):
  // control points in app space, laid onto the outer surface along "axis" or "toward".
  incisions: [
    {"id": "kocher", "name": "Kocher (collar) incision", "note": "In a natural skin crease about two finger breadths (2–3 cm) above the sternal notch, 4–6 cm long (longer for large glands).", "points": [[-3.0, -4.16, 6.45], [-2.0, -4.3, 6.45], [-1.0, -4.38, 6.45], [0.0, -4.41, 6.45], [1.0, -4.38, 6.45], [2.0, -4.3, 6.45], [3.0, -4.16, 6.45]], "axis": [0.0, -2.2]}
  ],

  procedure: {
    title: "Total thyroidectomy",
    atRisk: [{"id": "rln_right", "why": "Enters the larynx behind the cricothyroid joint, near Berry's ligament: hoarse voice"}, {"id": "rln_left", "why": "Both nerves injured: stridor and airway obstruction"}, {"id": "non_recurrent", "why": "Right side, about 0.5%: runs straight from the vagus and is easily cut"}, {"id": "ebsln", "why": "Close to the superior thyroid vessels: weak high-pitched voice"}, {"id": "parathyroid_superior", "why": "Behind the upper pole: hypocalcaemia"}, {"id": "parathyroid_inferior", "why": "More variable, near the lower pole and thymus: hypocalcaemia"}],
    steps: [
      {
        title: "Position and incision", incision: "kocher",
        text: "Supine with the neck extended on a shoulder roll and the head on a ring. If nerve monitoring is used, check the tube electrodes sit at the vocal folds. Make a Kocher (collar) incision in or near a skin crease about two fingers' breadth above the sternal notch, usually 4–6 cm long.",
        show: ["superficial", "bone", "muscle", "gland"],
        focus: ["platysma", "sternum", "larynx"]
      },
      {
        title: "Subplatysmal flaps", incision: "kocher",
        text: "Divide platysma and raise flaps deep to it, superficial to the anterior jugular veins: up to the thyroid cartilage notch and down to the sternal notch.",
        show: ["superficial", "bone", "muscle", "gland", "vein"],
        focus: ["platysma", "ajv"]
      },
      {
        title: "Open the midline",
        text: "Open the avascular midline raphe between the sternohyoids from thyroid cartilage to sternal notch. Separate sternothyroid from the lobe and retract the strap muscles laterally. Divide the straps high only if the gland is very large.",
        show: ["bone", "muscle", "gland", "vein"],
        focus: ["sternohyoid", "sternothyroid", "thyroid"]
      },
      {
        title: "Middle thyroid vein and vagus",
        text: "Roll the lobe forward and medially. Ligate the middle thyroid vein to open the space between the lobe and the carotid sheath. With monitoring, stimulate the vagus in the sheath for a baseline signal (V1).",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve"],
        focus: ["middle_thyroid_vein", "ijv", "cca", "vagus"]
      },
      {
        title: "Upper pole",
        text: "Draw the upper pole down and laterally and open the space between it and cricothyroid. Look for the external branch of the superior laryngeal nerve on the inferior constrictor. Ligate the superior thyroid artery and vein branch by branch on the capsule, not as a mass high up.",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve"],
        focus: ["superior_thyroid_artery", "superior_thyroid_vein", "ebsln", "cricothyroid"]
      },
      {
        title: "Parathyroids",
        text: "Find the superior parathyroid near the cricothyroid junction, behind the upper lobe, and the inferior one near the lower pole. Sweep each off the capsule with its vessel. Divide branches of the inferior thyroid artery on the capsule, beyond the parathyroid branches.",
        show: ["bone", "muscle", "gland", "artery", "nerve"],
        focus: ["parathyroid_superior", "parathyroid_inferior", "ita"]
      },
      {
        title: "Recurrent laryngeal nerve",
        text: "Find the nerve low in Simon's triangle (common carotid, trachea and oesophagus, inferior thyroid artery), or where it crosses the artery, or under the tubercle of Zuckerkandl. Remember the right nerve runs obliquely and the left more vertically in the groove. Trace it up to the cricothyroid joint.",
        show: ["bone", "muscle", "gland", "artery", "nerve"],
        focus: ["rln_right", "rln_left", "ita", "oesophagus", "trachea"]
      },
      {
        title: "Berry's ligament",
        text: "With the nerve in view, divide Berry's ligament under direct vision with fine clips or ties. Avoid energy devices and blind clamping here; this is where most nerve injuries happen. Divide the inferior thyroid veins at the lower pole and lift the lobe off the trachea.",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve"],
        focus: ["rln_right", "rln_left", "larynx", "trachea", "inferior_thyroid_veins"]
      },
      {
        title: "Isthmus and the other side",
        text: "Divide the isthmus off the trachea, include any pyramidal lobe, and repeat on the other side. If monitoring lost the signal on the first side, consider stopping and doing the second side later, to avoid injury to both nerves.",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve"],
        focus: ["thyroid", "trachea"]
      },
      {
        title: "Check and close",
        text: "Stimulate the vagus at the end (V2). Look at the parathyroids: autotransplant any that are dark or were removed, after confirming the tissue. Valsalva to check haemostasis. Close the strap muscles loosely in the midline (so a haematoma can come forward), then platysma and skin.",
        show: ["bone", "muscle", "gland", "artery", "vein", "nerve", "lymph"],
        focus: ["vagus", "parathyroid_superior", "parathyroid_inferior", "sternohyoid"]
      }
    ],
    complications: [
      "Neck haematoma, usually in the first hours: it can obstruct the airway. Open the wound at the bedside (skin and strap muscles) to release it, then return to theatre",
      "Hypocalcaemia from parathyroid damage: temporary in a significant minority after total thyroidectomy, permanent in a few percent. Check calcium or PTH after surgery",
      "Recurrent laryngeal nerve palsy: one side gives a hoarse, breathy voice and aspiration; both sides can cause stridor needing reintubation or tracheostomy",
      "External branch of the superior laryngeal nerve injury: lower, tiring voice with loss of high pitch",
      "Hypothyroidism after total thyroidectomy (lifelong levothyroxine); wound infection; poor scar"
    ],
    refs: ["randolph", "scottbrown", "shah", "randolph2011"]
  },

  figures: [
    { id: "fig-thyroid", title: "Back of the thyroid: laryngeal nerves, arteries and parathyroids (posterior view)", svg: "thyroid" }
  ],

  quiz: [
    {
      q: "The right recurrent laryngeal nerve hooks around the:",
      options: ["Aortic arch", "Right subclavian artery", "Right common carotid artery", "Ligamentum arteriosum"],
      answer: 1,
      explain: "The right nerve hooks under the right subclavian artery; the left hooks under the aortic arch beside the ligamentum arteriosum. So the right nerve runs more obliquely in the neck."
    },
    {
      q: "A non-recurrent right laryngeal nerve should be suspected when the CT shows:",
      options: ["A right-sided aortic arch", "An aberrant right subclavian artery", "A retrosternal goitre", "A thyroid ima artery"],
      answer: 1,
      explain: "An aberrant right subclavian artery (arteria lusoria) from the arch beyond the left subclavian means there is nothing for the right nerve to hook around, so it runs straight from the vagus to the larynx."
    },
    {
      q: "In Cernea's classification, the external branch of the superior laryngeal nerve is most at risk in:",
      options: ["Type 1", "Type 2a", "Type 2b", "All types equally"],
      answer: 2,
      explain: "Type 2b crosses the superior thyroid artery below the upper border of the upper pole, right where vessels are ligated. It is commoner in large goitres."
    },
    {
      q: "Compared with the inferior parathyroids, the superior parathyroids usually lie:",
      options: [
        "Ventral to the recurrent laryngeal nerve, near the lower pole",
        "Dorsal to the recurrent laryngeal nerve, near the cricothyroid junction",
        "In the thymus",
        "In front of the isthmus"
      ],
      answer: 1,
      explain: "Superior glands (fourth pouch) migrate little and lie dorsal to the nerve near the cricothyroid junction. Inferior glands (third pouch, with the thymus) lie ventral to it and vary more."
    },
    {
      q: "Where is the recurrent laryngeal nerve most often injured in thyroidectomy?",
      options: ["Where it hooks under the artery", "At Berry's ligament, just below the larynx", "In Simon's triangle", "Where it crosses the middle thyroid vein"],
      answer: 1,
      explain: "Beside Berry's ligament the nerve is fixed and close to bleeding vessels, so traction, heat and clamping here cause most injuries."
    },
    {
      q: "After a total thyroidectomy a patient develops a tense, swelling neck and stridor. The first step is:",
      options: [
        "CT of the neck",
        "Open the wound at the bedside to release the haematoma",
        "Give intravenous calcium",
        "Nebulised adrenaline and observe"
      ],
      answer: 1,
      explain: "A haematoma under the strap muscles obstructs venous drainage and the airway. Open the skin and strap closure at once to release it, then secure the airway and return to theatre."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the neck and larynx.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Volume 1, thyroid and parathyroid chapters.",
    shah: "Shah JP, Patel SG, Singh B, Wong RJ. Jatin Shah's Head and Neck Surgery and Oncology. 5th ed. Elsevier; 2019. Thyroid and parathyroid chapters.",
    randolph: "Randolph GW, ed. Surgery of the Thyroid and Parathyroid Glands. 3rd ed. Elsevier; 2021.",
    cernea: "Cernea CR, Ferraz AR, Nishio S, Dutra A Jr, Hojaij FC, dos Santos LR. Surgical anatomy of the external branch of the superior laryngeal nerve. Head Neck. 1992;14(5):380–383.",
    akerstrom: "Akerström G, Malmaeus J, Bergström R. Surgical anatomy of human parathyroid glands. Surgery. 1984;95(1):14–21.",
    pelizzo: "Pelizzo MR, Toniato A, Gemo G. Zuckerkandl's tuberculum: an arrow pointing to the recurrent laryngeal nerve (constant anatomical landmark). J Am Coll Surg. 1998;187(3):333–336.",
    toniato: "Toniato A, Mazzarotto R, Piotto A, Bernante P, Pagetta C, Pelizzo MR. Identification of the nonrecurrent laryngeal nerve during thyroid surgery: 20-year experience. World J Surg. 2004;28(7):659–661.",
    randolph2011: "Randolph GW, Dralle H, et al. Electrophysiologic recurrent laryngeal nerve monitoring during thyroid and parathyroid surgery: international standards guideline statement. Laryngoscope. 2011;121(Suppl 1):S1–S16.",
    robbins2002: "Robbins KT, Clayman G, Levine PA, et al. Neck dissection classification update: revisions proposed by the American Head and Neck Society and the American Academy of Otolaryngology–Head and Neck Surgery. Arch Otolaryngol Head Neck Surg. 2002;128(7):751–758.",
    robbins2008: "Robbins KT, Shaha AR, Medina JE, et al. Consensus statement on the classification and terminology of neck dissection. Arch Otolaryngol Head Neck Surg. 2008;134(5):536–538.",
    carty2009: "Carty SE, Cooper DS, Doherty GM, et al. Consensus statement on the terminology and classification of central neck dissection for thyroid cancer. Thyroid. 2009;19(11):1153–1158."
  }
};
