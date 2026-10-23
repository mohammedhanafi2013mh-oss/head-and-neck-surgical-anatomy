// Content for the larynx. Each structure id matches a mesh id in
// data/larynx-meshes.js (structures without a mesh show a note in the app).

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.larynx = {
  id: "larynx",
  title: "Larynx",
  subtitle: "Cartilages, folds, muscles, nerves and spaces of the larynx",

  overview: {
    intro:
      "The larynx guards the airway, makes the voice and closes during swallowing and coughing. It is a framework of cartilages (thyroid, cricoid, the paired arytenoids, and the epiglottis) joined by membranes and moved by small muscles. It hangs from the hyoid (C3) and sits in front of the laryngopharynx, from about C3 to C6. Surgeons divide it into three subsites: supraglottis, glottis and subglottis. The subsites differ in embryology, lymphatic drainage and how cancer spreads in them. That, and the deep spaces between the mucosa and the cartilage, decide which operation is possible.",
    boundaries: [
      { label: "Supraglottis", text: "Epiglottis, aryepiglottic folds, arytenoids, vestibular (false) folds and ventricles, down to the apex of the ventricle" },
      { label: "Glottis", text: "The vocal folds, with the anterior and posterior commissures, to a horizontal plane about 1 cm below the apex of the ventricle (AJCC)" },
      { label: "Subglottis", text: "From there to the lower border of the cricoid" },
      { label: "Anterior", text: "Strap muscles, the thyroid isthmus over the upper trachea, and the pre-epiglottic space behind the hyoid and thyrohyoid membrane" },
      { label: "Posterior", text: "The laryngopharynx: piriform fossae on either side, the postcricoid region behind the cricoid" }
    ],
    contents: [
      "Cartilages: thyroid, cricoid, arytenoids (with corniculates), epiglottis",
      "Membranes: thyrohyoid, quadrangular, conus elasticus and the cricothyroid membrane",
      "Vocal and vestibular folds, with the ventricle between them",
      "Intrinsic muscles: posterior and lateral cricoarytenoid, interarytenoid, thyroarytenoid, cricothyroid",
      "Superior and recurrent laryngeal nerves; superior and inferior laryngeal vessels",
      "Pre-epiglottic and paraglottic spaces"
    ],
    keyPoints: [
      "The posterior cricoarytenoid is the only muscle that opens the glottis.",
      "The recurrent laryngeal nerve supplies every intrinsic muscle except cricothyroid, which is supplied by the external branch of the superior laryngeal nerve.",
      "Sensation above the vocal folds comes through the internal laryngeal nerve; below them, through the recurrent nerve.",
      "The glottis has almost no lymphatics, so early glottic cancer rarely spreads to nodes. The supraglottis drains richly to both sides of the neck.",
      "The cricothyroid membrane, between the thyroid and cricoid cartilages in the midline, is the site for emergency front-of-neck access."
    ],
    refs: ["gray", "scottbrown", "shah"]
  },

  layers: [
    { id: "bone", label: "Cartilages & hyoid", defaultOn: true },
    { id: "membrane", label: "Folds & membranes", defaultOn: true },
    { id: "muscle", label: "Intrinsic muscles", defaultOn: true },
    { id: "deep", label: "Strap & constrictor muscles", defaultOn: false },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: true },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "context", label: "Pharynx, tongue, thyroid & spine", defaultOn: false }
  ],

  structures: [
    // ---------- cartilages ----------
    {
      id: "thyroid_cartilage",
      name: "Thyroid cartilage",
      layer: "bone",
      summary:
        "Two laminae joined in front at an angle of about 90° in men and 120° in women, making the laryngeal prominence (Adam's apple). Superior and inferior horns project from the back of each lamina.",
      relations: [
        "Oblique line on each lamina: attachment of sternothyroid, thyrohyoid and the inferior constrictor",
        "Inner surface of the angle: attachment of the vocal folds (anterior commissure), the vestibular folds above them and the epiglottic petiole above that",
        "Inferior horns articulate with the sides of the cricoid (cricothyroid joints); the recurrent laryngeal nerve enters just behind them",
        "Superior horns are tied to the tips of the greater horns of the hyoid by the lateral thyrohyoid ligaments"
      ],
      supply: {},
      surgical: [
        "The vocal folds attach to the inner angle roughly halfway between the thyroid notch and the lower border. This guides the cut in an open partial laryngectomy and the site of a thyroplasty window.",
        "Hyaline cartilage ossifies patchily with age. On CT, irregular ossification can mimic or hide tumour invasion; invasion through the outer cortex makes a tumour T4a."
      ],
      danger: ["At the anterior commissure the vocal ligament inserts straight into cartilage with little perichondrium, so tumour here reaches the cartilage early"],
      variations: ["Foramina in the laminae for vessels; the angle is more acute and prominent in men"],
      refs: ["gray", "ajcc", "shah"]
    },
    {
      id: "cricoid",
      name: "Cricoid cartilage",
      layer: "bone",
      summary:
        "The only complete ring in the airway, shaped like a signet ring: a narrow arch in front and a tall lamina behind. Its lower border is at C6, where the trachea and oesophagus begin.",
      relations: [
        "The arytenoids sit on the sloping upper border of the lamina (cricoarytenoid joints)",
        "The inferior horns of the thyroid cartilage articulate with its sides",
        "Posterior cricoarytenoid muscles cover the back of the lamina; the postcricoid pharynx lies behind them"
      ],
      supply: {},
      surgical: [
        "In children the subglottis at the cricoid is the narrowest part of the airway; a complete ring cannot stretch, so oedema or an oversized tube here easily obstructs it.",
        "Removing or damaging the cricoid destabilises the airway. Keep it in conservation surgery (e.g. supracricoid laryngectomy) and avoid a high tracheostomy that erodes it."
      ],
      danger: ["Subglottic stenosis after prolonged intubation or a high tracheostomy"],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "arytenoids",
      name: "Arytenoid cartilages",
      aka: "With the corniculate cartilages on their apices",
      layer: "bone",
      summary:
        "Small pyramids on the cricoid lamina. Each has a vocal process pointing forward (vocal ligament) and a muscular process pointing sideways (posterior and lateral cricoarytenoids).",
      relations: [
        "Cricoarytenoid joint: the arytenoid rocks, glides and rotates on the cricoid, swinging the vocal process in and out",
        "The interarytenoid muscle joins the two arytenoids behind",
        "The aryepiglottic folds run from their apices to the sides of the epiglottis"
      ],
      supply: {},
      surgical: [
        "Arytenoid dislocation (usually after intubation) and cricoarytenoid joint fixation (rheumatoid arthritis, previous radiotherapy) mimic vocal fold palsy. Laryngeal EMG or palpation of the joint under anaesthesia tells them apart.",
        "Arytenoidectomy or posterior cordotomy enlarges the posterior glottis for bilateral vocal fold palsy."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "epiglottis",
      name: "Epiglottis",
      layer: "bone",
      summary:
        "A leaf of elastic cartilage behind the tongue base and hyoid. Its stalk (petiole) is tied to the thyroid angle by the thyroepiglottic ligament, and its front surface to the hyoid by the hyoepiglottic ligament.",
      relations: [
        "Valleculae: the pits between the tongue base and the front of the epiglottis",
        "Pre-epiglottic space in front of its lower part, behind the hyoid and thyrohyoid membrane",
        "The cartilage is perforated by small pits for mucous glands (seen as holes in the 3D model)"
      ],
      supply: {},
      surgical: [
        "Tumours of the laryngeal surface of the epiglottis reach the pre-epiglottic space through these perforations, which is why supraglottic cancers often spread there.",
        "In direct laryngoscopy a curved blade sits in the vallecula and lifts the epiglottis indirectly by tensing the hyoepiglottic ligament."
      ],
      danger: ["Acute epiglottitis (supraglottitis) can obstruct the airway quickly; avoid upsetting the patient and secure the airway in theatre"],
      variations: ["Omega-shaped (curled) epiglottis in laryngomalacia"],
      refs: ["gray", "scottbrown", "tucker"]
    },
    {
      id: "hyoid",
      name: "Hyoid bone",
      layer: "bone",
      summary: "The larynx hangs from it (C3) by the thyrohyoid membrane. It anchors the tongue, the suprahyoid and infrahyoid muscles and the middle constrictor.",
      relations: ["The pre-epiglottic space lies behind it and the thyrohyoid membrane"],
      supply: {},
      surgical: ["Usually removed with the larynx in a total laryngectomy, which takes the pre-epiglottic space en bloc; the hypoglossal nerves and lingual arteries run just above and lateral to the greater horns."],
      danger: ["Hypoglossal nerves and lingual arteries above the greater horns"],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "trachea",
      name: "Trachea (upper rings)",
      layer: "bone",
      summary: "Continues the airway from the lower border of the cricoid, with the thyroid isthmus over rings 2–4.",
      relations: ["The cricotracheal ligament joins it to the cricoid"],
      supply: {},
      surgical: ["After laryngectomy the cut trachea is sewn to the skin as a permanent end stoma; the airway and food passage are then completely separate."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- membranes and folds ----------
    {
      id: "thyrohyoid_membrane",
      name: "Thyrohyoid membrane",
      aka: "With the median and lateral thyrohyoid ligaments",
      layer: "membrane",
      summary: "Joins the upper border of the thyroid cartilage to the back of the hyoid. It is thickened in the midline and at its free posterior edges (lateral thyrohyoid ligaments).",
      relations: [
        "Pierced on each side by the internal laryngeal nerve and the superior laryngeal artery and vein",
        "The pre-epiglottic space lies behind its middle part",
        "The lateral ligaments often contain a small triticeous cartilage, which can look like a swallowed bone on X-ray"
      ],
      supply: {},
      surgical: ["Where the internal laryngeal nerve pierces the membrane, just below the greater horn of the hyoid, it can be blocked with local anaesthetic for awake laryngeal procedures."],
      danger: ["Internal laryngeal nerve and superior laryngeal vessels"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "cricothyroid_membrane",
      name: "Cricothyroid membrane",
      aka: "Median cricothyroid ligament",
      layer: "membrane",
      summary:
        "The thick midline front of the conus elasticus, between the lower border of the thyroid cartilage and the arch of the cricoid. In adults it is roughly 1 cm high and a little wider.",
      relations: [
        "Felt as a dip just below the laryngeal prominence",
        "Small cricothyroid arteries cross its upper part; the cricothyroid muscles lie on either side"
      ],
      supply: {},
      surgical: [
        "Emergency front-of-neck access in a can't-intubate, can't-oxygenate situation: scalpel, bougie, tube (Difficult Airway Society 2015). Find the membrane with the laryngeal handshake; if it can't be felt, make a vertical midline skin incision first.",
        "Make the transverse stab in the lower half of the membrane, away from the cricothyroid arteries, and turn the blade so the bougie can pass down the trachea.",
        "In young children the membrane is tiny and the larynx high and soft; needle techniques or a surgical tracheostomy are preferred."
      ],
      danger: ["A cut that goes too high reaches the vocal folds; too deep, the back of the cricoid and the oesophagus"],
      variations: [],
      refs: ["das2015", "gray"]
    },
    {
      id: "quadrangular_membrane",
      name: "Quadrangular membrane",
      layer: "membrane",
      summary:
        "A thin sheet on each side from the edge of the epiglottis to the arytenoid. Its upper free edge is the aryepiglottic fold; its lower free edge is the vestibular ligament inside the vestibular fold.",
      relations: [
        "Separates the supraglottic mucosa from the paraglottic space",
        "The piriform fossa lies lateral to it, outside the larynx"
      ],
      supply: {},
      surgical: ["A weak barrier: supraglottic tumours pass through it into the paraglottic space and down to the glottis (transglottic spread)."],
      danger: [],
      variations: [],
      refs: ["gray", "tucker"]
    },
    {
      id: "conus_elasticus",
      name: "Conus elasticus",
      aka: "Cricovocal membrane",
      layer: "membrane",
      summary:
        "A cone of elastic tissue from the upper border of the cricoid up to the vocal processes and the thyroid angle. Its thickened free upper edge is the vocal ligament; its thick midline front is the cricothyroid membrane.",
      relations: ["Lies medial to the paraglottic space and the thyroarytenoid; forms the wall of the subglottis"],
      supply: {},
      surgical: ["Tumours spreading down from the glottis into the subglottis tend to follow it; once they breach it they spread through the cricothyroid space to the outside of the larynx."],
      danger: [],
      variations: [],
      refs: ["gray", "tucker"]
    },
    {
      id: "vocal_folds",
      name: "Vocal folds",
      aka: "True vocal cords",
      layer: "membrane",
      drawn: true,
      summary:
        "Run from the inner angle of the thyroid cartilage to the vocal processes of the arytenoids. The gap between them is the rima glottidis. The front three-fifths is membranous (it vibrates); the back two-fifths is the cartilaginous part over the vocal processes.",
      relations: [
        "Layers from the surface inwards (Hirano): non-keratinised squamous epithelium; superficial lamina propria (Reinke's space); intermediate and deep lamina propria (the vocal ligament); vocalis muscle",
        "The epithelium and Reinke's space form a loose 'cover' that ripples over the stiffer 'body' of ligament and muscle",
        "The ventricle (of Morgagni) separates them from the vestibular folds above"
      ],
      supply: {
        "Motor": "Recurrent laryngeal nerve (all intrinsic muscles moving the folds except cricothyroid)",
        "Sensory": "Internal laryngeal nerve above the free edge; recurrent laryngeal nerve below",
        "Lymphatic": "Almost none in the membranous fold"
      },
      surgical: [
        "Phonosurgery keeps to the superficial lamina propria: cut only the epithelium and lift lesions out of Reinke's space so the cover still vibrates.",
        "Early glottic cancer causes hoarseness early and rarely spreads to nodes, so it is often cured by radiotherapy or endoscopic cordectomy.",
        "Vocal fold nodules form at the junction of the front and middle thirds, the midpoint of the membranous fold, where impact is greatest."
      ],
      danger: ["Scarring of the superficial lamina propria stiffens the cover and gives a permanently breathy, rough voice"],
      variations: ["Length roughly 1.5–2 cm in men and less in women; Reinke's oedema (smokers) swells the superficial lamina propria"],
      refs: ["hirano", "gray", "scottbrown"]
    },
    {
      id: "vestibular_folds",
      name: "Vestibular folds",
      aka: "False vocal cords",
      layer: "membrane",
      drawn: true,
      summary: "Soft folds above and lateral to the vocal folds, each over a vestibular ligament (the lower edge of the quadrangular membrane). They do not vibrate in normal voice.",
      relations: [
        "The ventricle and its upward pouch, the saccule, lie between them and the vocal folds",
        "The paraglottic space lies lateral to them"
      ],
      supply: { "Sensory": "Internal laryngeal nerve" },
      surgical: [
        "They close tightly during effort and swallowing. 'Ventricular phonation' (using them to speak) gives a harsh, low voice.",
        "A laryngocoele is a dilated saccule that may bulge internally into the fold or externally through the thyrohyoid membrane."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },

    // ---------- spaces and subsites (notes only) ----------
    {
      id: "preepiglottic_space",
      name: "Pre-epiglottic space",
      layer: "membrane",
      summary: "A fat-filled space in front of the epiglottis, behind the hyoid and thyrohyoid membrane, closed above by the hyoepiglottic ligament.",
      relations: ["Opens laterally into the paraglottic spaces"],
      supply: {},
      surgical: [
        "Supraglottic cancers reach it through the perforations in the epiglottic cartilage. Invasion makes the tumour at least T3, and it must be removed with the hyoid and the space in surgery.",
        "Well seen on MRI as replacement of the bright fat"
      ],
      danger: [],
      variations: [],
      refs: ["tucker", "ajcc", "shah"]
    },
    {
      id: "paraglottic_space",
      name: "Paraglottic space",
      layer: "membrane",
      summary:
        "A space on each side between the thyroid cartilage outside and the quadrangular membrane, ventricle and conus elasticus inside. It holds fat and the thyroarytenoid muscle and connects the supraglottis, glottis and subglottis.",
      relations: ["Continuous in front with the pre-epiglottic space; laterally reaches the piriform fossa wall"],
      supply: {},
      surgical: [
        "Tumour here can spread up and down the larynx under intact mucosa (transglottic cancer) and fix the vocal fold. Invasion makes a tumour T3.",
        "It explains why mucosal size underestimates some cancers, and why endoscopic resection must follow the deep extent seen on imaging."
      ],
      danger: [],
      variations: [],
      refs: ["tucker", "ajcc", "shah"]
    },
    {
      id: "laryngeal_lymphatics",
      name: "Lymphatic drainage by subsite",
      layer: "membrane",
      summary: "Drainage follows embryology. The supraglottis (from the buccopharyngeal primordium) drains richly to both sides; the glottis and subglottis (from the tracheobronchial primordium) drain sparsely and more to one side.",
      relations: [
        "Supraglottis: with the superior laryngeal vessels through the thyrohyoid membrane to levels II and III, often both sides",
        "Glottis: almost no lymphatics in the membranous folds",
        "Subglottis: through the cricothyroid membrane to the prelaryngeal (Delphian) node, and to pretracheal, paratracheal (level VI) and level IV nodes"
      ],
      supply: {},
      surgical: [
        "Supraglottic cancers have a high rate of hidden nodal spread, so both sides of the neck are usually treated.",
        "A Delphian node involved by laryngeal cancer is a poor sign."
      ],
      danger: [],
      variations: [],
      refs: ["scottbrown", "shah"]
    },

    // ---------- intrinsic muscles ----------
    {
      id: "pca",
      name: "Posterior cricoarytenoid",
      layer: "muscle",
      summary: "From the back of the cricoid lamina to the muscular process of the arytenoid. It rotates the arytenoid so the vocal process swings outward: the only muscle that opens (abducts) the glottis.",
      relations: ["Lies on the back of the cricoid, under the postcricoid mucosa of the pharynx"],
      supply: { "Nerve": "Recurrent laryngeal nerve (posterior branch)" },
      surgical: [
        "Loss of both posterior cricoarytenoids (bilateral recurrent nerve palsy) leaves the folds near the midline. The voice may be good but the airway is narrow, with stridor on effort.",
        "Treatment widens the posterior glottis (cordotomy, arytenoidectomy, suture lateralisation) or bypasses it (tracheostomy); reinnervation is an option in selected patients."
      ],
      danger: ["Bilateral palsy threatens the airway"],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "lca",
      name: "Lateral cricoarytenoid",
      layer: "muscle",
      summary: "From the upper border of the cricoid arch to the muscular process. It rotates the arytenoid so the vocal process swings in, closing (adducting) the membranous glottis.",
      relations: ["Lies inside the thyroid lamina, below the thyroarytenoid"],
      supply: { "Nerve": "Recurrent laryngeal nerve" },
      surgical: ["Arytenoid adduction surgery imitates its pull for large posterior gaps in unilateral palsy."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "interarytenoid",
      name: "Interarytenoid (transverse and oblique arytenoid)",
      layer: "muscle",
      summary:
        "The unpaired transverse fibres join the backs of the two arytenoids; the oblique fibres cross in an X and continue into the aryepiglottic folds. Together they close the posterior glottis and tighten the laryngeal inlet like a sphincter.",
      relations: ["Lies behind the arytenoids, under the mucosa of the posterior commissure"],
      supply: { "Nerve": "Recurrent laryngeal nerves of both sides (the transverse part is often described as receiving fibres from the internal laryngeal nerve too)" },
      surgical: ["Posterior glottic stenosis (scar across the interarytenoid area, often after intubation) fixes both folds near the midline and mimics bilateral palsy."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "thyroarytenoid",
      name: "Thyroarytenoid",
      aka: "External part, with thyroepiglottic fibres; the internal part is vocalis",
      layer: "muscle",
      summary:
        "From the inner angle of the thyroid cartilage back to the arytenoid, lateral to the vocal fold. It shortens and thickens the folds and helps close the glottis. Its medial fibres next to the vocal ligament are vocalis, which fine-tunes tension. Some fibres run up into the aryepiglottic fold and epiglottis.",
      relations: ["Fills much of the paraglottic space; covered medially by the conus elasticus and vocal ligament"],
      supply: { "Nerve": "Recurrent laryngeal nerve" },
      surgical: [
        "A transmuscular cordectomy removes part of it; a total cordectomy removes it down to the thyroid perichondrium (European Laryngological Society classification).",
        "Botulinum toxin into this muscle treats adductor spasmodic dysphonia."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "remacle", "scottbrown"]
    },
    {
      id: "cricothyroid",
      name: "Cricothyroid",
      layer: "muscle",
      summary:
        "On the outside of the larynx, from the cricoid arch to the lower border and inferior horn of the thyroid cartilage, in straight and oblique parts. It tilts the thyroid cartilage forward on the cricoid, lengthening and tensing the vocal folds to raise pitch.",
      relations: ["Lies either side of the cricothyroid membrane; the upper pole of the thyroid gland rests against it"],
      supply: { "Nerve": "External branch of the superior laryngeal nerve (the only intrinsic muscle not supplied by the recurrent nerve)" },
      surgical: ["Cricothyroid approximation (sewing the cartilages together) raises vocal pitch, for example in voice feminisation."],
      danger: ["External branch injury in thyroid surgery: lower, tiring voice with loss of the high range"],
      variations: [],
      refs: ["gray", "cernea"]
    },

    // ---------- extrinsic muscles ----------
    {
      id: "thyrohyoid",
      name: "Thyrohyoid",
      layer: "deep",
      summary: "From the oblique line of the thyroid cartilage to the hyoid. It raises the larynx towards the hyoid or depresses the hyoid.",
      relations: ["Covers the thyrohyoid membrane and the internal laryngeal nerve where it enters"],
      supply: { "Nerve": "C1 fibres travelling with the hypoglossal nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sternothyroid",
      name: "Sternothyroid",
      layer: "deep",
      summary: "From the manubrium to the oblique line; pulls the larynx down.",
      relations: [],
      supply: { "Nerve": "Ansa cervicalis" },
      surgical: ["Divided low in a total laryngectomy; a superiorly based strap flap can reinforce the pharyngeal closure."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "sternohyoid",
      name: "Sternohyoid",
      layer: "deep",
      summary: "From the manubrium to the hyoid, superficial to sternothyroid.",
      relations: [],
      supply: { "Nerve": "Ansa cervicalis" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "omohyoid",
      name: "Omohyoid (superior belly)",
      layer: "deep",
      summary: "Runs up to the hyoid lateral to sternohyoid.",
      relations: [],
      supply: { "Nerve": "Ansa cervicalis" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "constrictors",
      name: "Inferior and middle constrictors",
      layer: "deep",
      summary: "The inferior constrictor arises from the oblique line of the thyroid cartilage (thyropharyngeus) and the side of the cricoid (cricopharyngeus); the middle constrictor from the hyoid.",
      relations: [
        "The recurrent laryngeal nerve enters the larynx under the lower border of the inferior constrictor",
        "Cricopharyngeus forms the upper oesophageal sphincter; Killian's dehiscence lies above it, the site of pharyngeal pouches"
      ],
      supply: { "Nerve": "Pharyngeal plexus (vagus); recurrent laryngeal nerve to cricopharyngeus" },
      surgical: [
        "In a total laryngectomy the inferior constrictor is cut along the back of the thyroid lamina to free the larynx, and closed again over the pharyngeal repair.",
        "Cricopharyngeal myotomy (or pharyngeal plexus neurectomy) at laryngectomy reduces spasm that would otherwise stop tracheo-oesophageal voice."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "shah", "singer"]
    },

    // ---------- vessels ----------
    {
      id: "superior_laryngeal_artery",
      name: "Superior laryngeal artery",
      layer: "artery",
      drawn: true,
      summary: "A branch of the superior thyroid artery. It runs medially with the internal laryngeal nerve and pierces the thyrohyoid membrane to supply the supraglottis.",
      relations: ["Lies below or beside the internal laryngeal nerve as they pass through the membrane together"],
      supply: {},
      surgical: ["Ligated as part of the superior laryngeal pedicle in a total or supraglottic laryngectomy; in a supraglottic laryngectomy the internal laryngeal nerve is kept if possible to protect swallowing."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "superior_thyroid_artery",
      name: "Superior thyroid artery",
      layer: "artery",
      drawn: true,
      summary: "First branch of the external carotid, running down to the upper pole of the thyroid. It gives the superior laryngeal artery and a small cricothyroid branch.",
      relations: ["The external branch of the superior laryngeal nerve runs close beside it"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ita",
      name: "Inferior thyroid arteries",
      layer: "artery",
      summary: "From the thyrocervical trunk. Each gives an inferior laryngeal artery that enters the larynx with the recurrent laryngeal nerve behind the cricothyroid joint.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "cca",
      name: "Carotid arteries",
      layer: "artery",
      summary: "The common carotids divide at about the upper border of the thyroid cartilage (C3–C4) into the internal and external carotids.",
      relations: ["The larynx lies medial to them, with the strap muscles in front"],
      supply: {},
      surgical: ["After laryngectomy with neck dissection and radiotherapy, carotid exposure from a pharyngeal fistula risks carotid rupture ('blowout')."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "ijv",
      name: "Internal jugular veins",
      layer: "vein",
      summary: "Lateral to the carotids; they receive the superior thyroid veins, which bring blood from the superior laryngeal veins.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "superior_thyroid_vein",
      name: "Superior thyroid veins",
      layer: "vein",
      summary: "Drain the upper thyroid and, through the superior laryngeal veins, the supraglottis to the internal jugular vein.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- nerves ----------
    {
      id: "sln",
      name: "Superior laryngeal nerve and internal branch",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "vagus", label: "Leaves the vagus", text: "From the inferior ganglion." },
        { key: "division", label: "Divides", text: "Near the greater horn of the hyoid, into the internal and external branches." },
        { key: "membrane", label: "Pierces the thyrohyoid membrane", text: "The internal branch, with the superior laryngeal artery, to supply the mucosa above the vocal folds." }
      ],
      summary:
        "Leaves the vagus high in the neck and divides near the greater horn of the hyoid. The internal branch pierces the thyrohyoid membrane and supplies sensation to the larynx above the vocal folds, the epiglottis and the piriform fossa.",
      relations: [
        "The internal branch runs just under the mucosa of the piriform fossa, where it can be numbed by topical anaesthetic",
        "Galen's anastomosis joins it to the recurrent nerve behind the larynx"
      ],
      supply: { "Sensory": "Supraglottis, upper surface of the vocal folds, epiglottis, piriform fossa; the afferent limb of the cough and closure reflexes" },
      surgical: [
        "Loss of the internal branch removes the protective reflexes, so food and saliva are aspirated silently.",
        "Keep it when possible in a supraglottic laryngectomy; otherwise swallowing recovers slowly."
      ],
      danger: ["Silent aspiration after injury"],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "ebsln",
      name: "External branch of the superior laryngeal nerve",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "origin", label: "From the superior laryngeal nerve", text: "Down on the inferior constrictor, deep to the superior thyroid artery." },
        { key: "cricothyroid", label: "Enters cricothyroid", text: "The only intrinsic muscle it supplies; it tenses the vocal folds." }
      ],
      summary: "A thin motor branch that runs down on the inferior constrictor, close to the superior thyroid artery, to cricothyroid.",
      relations: ["Its crossing with the superior thyroid artery varies (Cernea types 1, 2a and 2b)"],
      supply: { "Motor": "Cricothyroid" },
      surgical: ["See the Thyroid module for how to protect it at the upper pole."],
      danger: ["Injury lowers vocal pitch range and endurance"],
      variations: [],
      refs: ["cernea", "gray"]
    },
    {
      id: "rln_right",
      name: "Right recurrent laryngeal nerve (end)",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "groove", label: "Tracheo-oesophageal groove", text: "Climbs beside the trachea." },
        { key: "entry", label: "Enters the larynx", text: "Behind the cricothyroid joint, under the inferior constrictor; supplies all intrinsic muscles except cricothyroid." }
      ],
      summary: "Enters the larynx behind the right cricothyroid joint, under the lower border of the inferior constrictor, and divides into branches to the intrinsic muscles.",
      relations: ["The posterior branch supplies the posterior cricoarytenoid and interarytenoid; the anterior branch supplies the lateral cricoarytenoid and thyroarytenoid"],
      supply: { "Motor": "All intrinsic muscles except cricothyroid", "Sensory": "Below the vocal folds" },
      surgical: ["Selective reinnervation for bilateral palsy uses this branching: for example phrenic nerve to the abductor branch and ansa cervicalis to the adductors."],
      danger: ["Palsy on one side: hoarse, breathy voice and aspiration. Both sides: airway obstruction"],
      variations: ["Non-recurrent on the right in about 0.5–1%, with an aberrant right subclavian artery"],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "rln_left",
      name: "Left recurrent laryngeal nerve (end)",
      layer: "nerve",
      drawn: true,
      course: [
        { key: "groove", label: "Tracheo-oesophageal groove", text: "Climbs beside the trachea." },
        { key: "entry", label: "Enters the larynx", text: "Behind the cricothyroid joint, under the inferior constrictor." }
      ],
      summary: "Climbs in the left tracheo-oesophageal groove and enters the larynx behind the left cricothyroid joint.",
      relations: ["Its long course round the aortic arch explains why left vocal fold palsy can be the first sign of a chest cancer"],
      supply: { "Motor": "All intrinsic muscles except cricothyroid on the left" },
      surgical: ["A newly found left vocal fold palsy needs imaging from the skull base to the aortic arch."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "vagus",
      name: "Vagus nerves",
      aka: "Cranial nerve X",
      layer: "nerve",
      summary: "Run down in the carotid sheaths and give the superior and recurrent laryngeal nerves.",
      relations: [],
      supply: {},
      surgical: ["A high vagal lesion (above the superior laryngeal nerve) paralyses the vocal fold and removes sensation, so aspiration is worse than with a recurrent nerve palsy alone."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- context ----------
    {
      id: "laryngopharynx",
      name: "Laryngopharynx (hypopharynx)",
      layer: "context",
      summary: "The part of the pharynx behind the larynx, from the hyoid to the lower border of the cricoid. Its subsites are the piriform fossae, the postcricoid region and the posterior pharyngeal wall.",
      relations: [
        "Piriform fossae: gutters lateral to the aryepiglottic folds, inside the thyroid laminae, where food is channelled around the closed larynx",
        "The internal laryngeal nerve lies under the mucosa of each piriform fossa"
      ],
      supply: {},
      surgical: [
        "Hypopharyngeal cancers present late, spread under the mucosa and to nodes early, and often need laryngopharyngectomy.",
        "In a laryngectomy the pharynx is entered on the side away from the tumour so the tumour can be seen before it is cut around."
      ],
      danger: ["Fish bones lodge in the piriform fossae and valleculae"],
      variations: [],
      refs: ["scottbrown", "shah"]
    },
    {
      id: "tongue",
      name: "Tongue base",
      layer: "context",
      summary: "In front of the epiglottis, separated from it by the valleculae.",
      relations: [],
      supply: {},
      surgical: ["Tumours of the vallecula and tongue base can extend into the pre-epiglottic space."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "thyroid",
      name: "Thyroid gland",
      layer: "context",
      summary: "Its lobes lie against the sides of the thyroid and cricoid cartilages; the isthmus crosses the upper trachea.",
      relations: [],
      supply: {},
      surgical: ["In a total laryngectomy the lobe on the tumour side is often removed with the larynx (subglottic or transglottic spread); the other is kept with its blood supply to protect the parathyroids."],
      danger: [],
      variations: [],
      refs: ["shah"]
    },
    {
      id: "vertebrae",
      name: "Vertebrae C3–C6",
      layer: "context",
      summary: "Levels: hyoid C3, thyroid cartilage C4–C5, lower border of the cricoid C6. The larynx sits higher in infants.",
      relations: [],
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
    {"id": "apron", "name": "Apron (U) incision", "note": "From high on each side down the front of sternocleidomastoid and across about two finger breadths above the sternal notch; the stoma is made in its lower flap.", "points": [[-4.44, 6.7, -1.33], [-3.6, 3.7, 0.14], [-3.15, 0.7, 1.38], [-1.98, -2.71, 2.4], [-3.0, -4.31, 5.95], [-1.2, -4.81, 5.95], [0.0, -4.91, 5.95], [1.2, -4.81, 5.95], [3.0, -4.31, 5.95], [1.98, -2.71, 2.4], [3.15, 0.7, 1.38], [3.6, 3.7, 0.14], [4.44, 6.7, -1.33]], "axis": [0.0, -2.7], "lay": false}
  ],

  procedure: {
    title: "Total laryngectomy",
    steps: [
      {
        title: "Airway and incision", incision: "apron",
        text: "If the tumour is obstructing, the airway may need an awake tracheostomy first. Use an apron (U-shaped) incision from mastoid to mastoid region down to about two fingers above the sternal notch, or a separate stoma incision. Plan where the stoma will be.",
        show: ["bone", "membrane", "artery", "vein"],
        focus: ["thyroid_cartilage", "cricoid", "trachea"]
      },
      {
        title: "Flaps and strap muscles", incision: "apron",
        text: "Raise subplatysmal flaps up past the hyoid and down to the clavicles. Do the neck dissections now if indicated. Divide sternohyoid, sternothyroid and omohyoid low, keeping them on the specimen.",
        show: ["bone", "membrane", "deep", "artery", "vein"],
        focus: ["sternohyoid", "sternothyroid", "omohyoid"]
      },
      {
        title: "Thyroid gland",
        text: "Divide the thyroid isthmus. Remove the lobe on the tumour side with the larynx if there is subglottic or transglottic spread. Free the other lobe off the larynx, keeping its blood supply and parathyroids.",
        show: ["bone", "membrane", "artery", "vein", "nerve", "context"],
        focus: ["thyroid", "superior_thyroid_artery", "ita"]
      },
      {
        title: "Above the hyoid",
        text: "Cut the suprahyoid muscles off the hyoid, staying on the bone. The hypoglossal nerves and lingual arteries lie just above and lateral to the greater horns. Find and ligate the superior laryngeal pedicles (superior laryngeal artery, vein and internal laryngeal nerve) where they pierce the thyrohyoid membrane.",
        show: ["bone", "membrane", "artery", "vein", "nerve"],
        focus: ["hyoid", "thyrohyoid_membrane", "superior_laryngeal_artery", "sln"]
      },
      {
        title: "Free the back of the larynx",
        text: "Rotate the larynx and cut the inferior constrictor along the back edge of the thyroid lamina. Strip the piriform fossa mucosa off the inside of the lamina on the side away from the tumour, to keep as much pharyngeal mucosa as possible.",
        show: ["bone", "membrane", "deep", "nerve"],
        focus: ["constrictors", "thyroid_cartilage"]
      },
      {
        title: "Divide the trachea",
        text: "Cut the trachea below the tumour, bevelled so the back wall is longer, and pass a sterile tube into the distal trachea for ventilation. Separate the back of the trachea and cricoid from the oesophagus.",
        show: ["bone", "membrane", "muscle", "nerve", "context"],
        focus: ["trachea", "cricoid", "rln_right", "rln_left"]
      },
      {
        title: "Enter the pharynx",
        text: "Enter the pharynx where the tumour is not: through the vallecula above the epiglottis for a glottic or subglottic tumour, or through the opposite piriform fossa. Look at the tumour, then cut around the larynx with clear mucosal margins, ending at the postcricoid region.",
        show: ["bone", "membrane", "muscle", "context"],
        focus: ["epiglottis", "laryngopharynx", "tongue"]
      },
      {
        title: "Voice restoration",
        text: "Make a primary tracheo-oesophageal puncture through the back wall of the trachea into the oesophagus for a voice prosthesis (Singer and Blom). Do a cricopharyngeal myotomy or pharyngeal plexus neurectomy to stop spasm blocking the prosthesis voice.",
        show: ["bone", "deep", "context"],
        focus: ["trachea", "constrictors"]
      },
      {
        title: "Pharyngeal closure",
        text: "Close the pharynx without tension, in a T or straight line, with inverting sutures in the mucosa and a second layer of constrictor. Use a pectoralis major or free flap if there is too little mucosa or the neck has had radiotherapy.",
        show: ["deep", "context"],
        focus: ["constrictors", "laryngopharynx"]
      },
      {
        title: "Stoma and closure",
        text: "Sew the trachea to the skin to make a wide end stoma, and close the flaps over drains. After this operation the patient breathes only through the neck, loses nasal smell and speaks with a prosthesis, oesophageal voice or an electrolarynx.",
        show: ["bone", "membrane", "artery", "vein"],
        focus: ["trachea"]
      }
    ],
    complications: [
      "Pharyngocutaneous fistula, most often after previous radiotherapy or chemoradiotherapy; treat with drainage, nutrition and time, or a flap",
      "Haematoma, wound infection and flap necrosis",
      "Carotid rupture in an irradiated neck exposed by a fistula",
      "Hypothyroidism and hypocalcaemia after thyroid and parathyroid removal or devascularisation",
      "Stomal stenosis; pharyngeal stricture causing dysphagia",
      "Voice prosthesis problems: leakage, enlargement of the puncture, failure to produce voice"
    ],
    refs: ["shah", "scottbrown", "singer", "paydarfar"]
  },

  figures: [
    { id: "fig-laryngoscopy", title: "The larynx seen from above, as at direct laryngoscopy from the head end (patient's right on the right)", svg: "laryngoscopy" },
    { id: "fig-larynx-coronal", title: "Coronal section: subsites, folds and paraglottic space", svg: "larynxCoronal" }
  ],

  quiz: [
    {
      q: "Which muscle opens (abducts) the vocal folds?",
      options: ["Lateral cricoarytenoid", "Posterior cricoarytenoid", "Cricothyroid", "Transverse arytenoid"],
      answer: 1,
      explain: "The posterior cricoarytenoid swings the vocal process outward. It is the only abductor, which is why bilateral recurrent nerve palsy threatens the airway."
    },
    {
      q: "Cricothyroid is supplied by:",
      options: ["The recurrent laryngeal nerve", "The internal laryngeal nerve", "The external branch of the superior laryngeal nerve", "The ansa cervicalis"],
      answer: 2,
      explain: "It is the only intrinsic laryngeal muscle not supplied by the recurrent nerve."
    },
    {
      q: "Early glottic cancer rarely spreads to neck nodes because:",
      options: [
        "It is usually an adenocarcinoma",
        "The vocal folds have very few lymphatics",
        "The thyroid cartilage blocks spread",
        "It drains only to the opposite side"
      ],
      answer: 1,
      explain: "The membranous vocal folds have almost no lymphatics. The supraglottis, in contrast, drains richly to both sides of the neck."
    },
    {
      q: "The internal laryngeal nerve enters the larynx by piercing the:",
      options: ["Cricothyroid membrane", "Thyrohyoid membrane", "Quadrangular membrane", "Conus elasticus"],
      answer: 1,
      explain: "It pierces the thyrohyoid membrane with the superior laryngeal artery, just below the greater horn of the hyoid."
    },
    {
      q: "In emergency front-of-neck access (scalpel cricothyroidotomy), the incision goes through the:",
      options: [
        "Thyrohyoid membrane, above the thyroid cartilage",
        "Cricothyroid membrane, between the thyroid and cricoid cartilages",
        "Second and third tracheal rings",
        "Thyroid isthmus"
      ],
      answer: 1,
      explain: "The cricothyroid membrane is shallow, easy to feel and relatively avascular. Cut in its lower half to avoid the cricothyroid arteries."
    },
    {
      q: "Supraglottic tumours reach the pre-epiglottic space mainly through:",
      options: [
        "The cricothyroid membrane",
        "Small perforations in the epiglottic cartilage",
        "The ventricle",
        "The cricoarytenoid joint"
      ],
      answer: 1,
      explain: "The epiglottic cartilage is pitted with holes for mucous glands, which let tumour pass forward into the pre-epiglottic fat."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapter on the larynx.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Larynx and voice chapters.",
    shah: "Shah JP, Patel SG, Singh B, Wong RJ. Jatin Shah's Head and Neck Surgery and Oncology. 5th ed. Elsevier; 2019. Larynx and trachea chapter.",
    hirano: "Hirano M. Morphological structure of the vocal cord as a vibrator and its variations. Folia Phoniatr (Basel). 1974;26(2):89–94.",
    tucker: "Tucker GF Jr, Smith HR Jr. A histological demonstration of the development of laryngeal connective tissue compartments. Trans Am Acad Ophthalmol Otolaryngol. 1962;66:308–318.",
    das2015: "Frerk C, Mitchell VS, McNarry AF, et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. Br J Anaesth. 2015;115(6):827–848.",
    remacle: "Remacle M, Eckel HE, Antonelli A, et al. Endoscopic cordectomy: a proposal for a classification by the Working Committee, European Laryngological Society. Eur Arch Otorhinolaryngol. 2000;257(4):227–231.",
    singer: "Singer MI, Blom ED. An endoscopic technique for restoration of voice after laryngectomy. Ann Otol Rhinol Laryngol. 1980;89(6 Pt 1):529–533.",
    paydarfar: "Paydarfar JA, Birkmeyer NJ. Complications in head and neck surgery: a meta-analysis of postlaryngectomy pharyngocutaneous fistula. Arch Otolaryngol Head Neck Surg. 2006;132(1):67–72.",
    cernea: "Cernea CR, Ferraz AR, Nishio S, Dutra A Jr, Hojaij FC, dos Santos LR. Surgical anatomy of the external branch of the superior laryngeal nerve. Head Neck. 1992;14(5):380–383.",
    ajcc: "Amin MB, Edge SB, Greene FL, et al., eds. AJCC Cancer Staging Manual. 8th ed. Springer; 2017. Larynx chapter."
  }
};
