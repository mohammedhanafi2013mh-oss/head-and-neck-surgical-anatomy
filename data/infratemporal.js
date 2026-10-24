// Content for the infratemporal fossa (right side). Each structure id matches
// a mesh id in data/infratemporal-meshes.js; foramina and landmarks have no
// mesh and are shown as pins ("pin" names a point in the mesh header).
// "course" lists the waypoints of a traced nerve or vessel; each key matches a
// point in header.courses[id]. "drawn: true" marks paths drawn for this app.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.infratemporal = {
  id: "infratemporal",
  title: "Infratemporal fossa",
  subtitle: "Space deep to the ramus: pterygoid muscles, mandibular nerve, maxillary artery and pterygoid plexus (both sides; courses traced on the right)",

  overview: {
    intro:
      "The infratemporal fossa is the space under the skull base, deep to the ramus of the mandible and behind the maxilla. It holds the lateral and medial pterygoid muscles, the mandibular nerve (V3) and its branches, the chorda tympani, the otic ganglion, the first two parts of the maxillary artery and the pterygoid venous plexus. It opens into the temporal fossa above, the pterygopalatine fossa in front and the parapharyngeal space below. Dental anaesthesia, third molar surgery, TMJ surgery, tumours of the skull base and the spread of infection all depend on its anatomy. The lateral pterygoid is the key landmark: almost everything in the fossa is named by its relation to that muscle. Turn on the Masseter, temporalis & parotid layer to see what covers the fossa. Select a nerve or the maxillary artery and press 'Trace the course' to follow it.",
    boundaries: [
      { label: "Lateral", text: "Ramus and coronoid process of the mandible" },
      { label: "Medial", text: "Lateral pterygoid plate; behind it the tensor and levator veli palatini and the superior constrictor (the parapharyngeal space)" },
      { label: "Anterior", text: "Infratemporal (posterior) surface of the maxilla, up to the inferior orbital fissure" },
      { label: "Posterior", text: "Condylar process and TMJ, styloid process and the carotid sheath" },
      { label: "Roof", text: "Infratemporal surface of the greater wing of the sphenoid, pierced by foramina ovale and spinosum, and a small part of the temporal bone; it opens into the temporal fossa deep to the zygomatic arch" },
      { label: "Floor", text: "None: open where medial pterygoid inserts at the angle, and continuous with the parapharyngeal space and the neck" }
    ],
    contents: [
      "Lateral pterygoid (two heads), medial pterygoid, and the lower part and tendon of temporalis",
      "Mandibular nerve (V3) with its anterior and posterior divisions: masseteric, deep temporal, buccal, auriculotemporal, lingual and inferior alveolar nerves, nerve to medial pterygoid and nerve to mylohyoid",
      "Chorda tympani joining the lingual nerve; otic ganglion just below foramen ovale",
      "Maxillary artery, first (mandibular) and second (pterygoid) parts, and their branches including the middle meningeal and inferior alveolar arteries",
      "Pterygoid venous plexus draining to the maxillary vein",
      "Posterior superior alveolar nerve and vessels on the maxillary tuberosity",
      "Sphenomandibular ligament"
    ],
    keyPoints: [
      "Openings: foramen ovale (V3, accessory meningeal artery, lesser petrosal nerve, emissary veins) and foramen spinosum (middle meningeal artery, nervus spinosus) in the roof; the pterygomaxillary fissure to the pterygopalatine fossa; the inferior orbital fissure to the orbit; the mandibular foramen on the ramus; the petrotympanic fissure for the chorda tympani.",
      "Around the lateral pterygoid: the buccal nerve passes between its two heads; the deep temporal and masseteric nerves emerge above it; the lingual and inferior alveolar nerves emerge below it; the maxillary artery usually runs superficial to the lower head.",
      "Maxillary artery in three parts, named by the lateral pterygoid: 1st (mandibular) part behind it, 2nd (pterygoid) part on it, 3rd (pterygopalatine) part in front of it in the pterygopalatine fossa.",
      "The middle meningeal artery passes between the two roots of the auriculotemporal nerve before entering foramen spinosum.",
      "The inferior alveolar nerve and vessels pass between the sphenomandibular ligament and the ramus to the mandibular foramen; the maxillary artery passes between the ligament and the neck of the mandible.",
      "The pterygoid plexus connects with the cavernous sinus through foramen ovale and the inferior ophthalmic vein, so infection here can reach the cavernous sinus."
    ],
    refs: ["gray", "rhoton", "shah"]
  },

  // Guided dissection: layers from superficial to deep ("keep" stays on throughout).
  dissection: {"keep": ["bone"], "order": ["superficial", "muscle", "joint", "vein", "artery", "nerve", "context", "spaces", "foramina"]},

  layers: [
    { id: "bone", label: "Bone", defaultOn: true },
    { id: "foramina", label: "Foramina & landmarks (pins)", defaultOn: true },
    { id: "joint", label: "TMJ & ligaments", defaultOn: true },
    { id: "muscle", label: "Pterygoids", defaultOn: true },
    { id: "superficial", label: "Masseter, temporalis & parotid", defaultOn: false },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: true },
    { id: "spaces", label: "Fossa outline", defaultOn: false },
    { id: "context", label: "Pharynx & styloid muscles", defaultOn: false }
  ],

  structures: [
    // ---------- nerves ----------
    {
      id: "v3_trunk",
      name: "Mandibular nerve (V3)",
      layer: "nerve",
      summary: "The largest division of the trigeminal nerve and its only motor part. The sensory root from the trigeminal ganglion and the motor root join just below foramen ovale to form a short trunk, which lies on tensor veli palatini with the otic ganglion on its medial side. After a few millimetres it splits into a small, mainly motor anterior division and a larger, mainly sensory posterior division.",
      course: [
        { key: "ovale", label: "Foramen ovale", text: "Leaves the middle cranial fossa with the motor root, accessory meningeal artery and lesser petrosal nerve." },
        { key: "otic", label: "Otic ganglion", text: "On the medial side of the trunk. The trunk gives the meningeal branch (nervus spinosus, back through foramen spinosum) and the nerve to medial pterygoid." },
        { key: "anterior", label: "Anterior division", text: "Masseteric, deep temporal and lateral pterygoid nerves (motor) and the buccal nerve (sensory)." },
        { key: "lingual", label: "Lingual nerve", text: "Leaves the posterior division and runs forward and down, deep to lateral pterygoid." },
        { key: "mylohyoid", label: "Nerve to mylohyoid", text: "Leaves the inferior alveolar nerve just before the mandibular foramen and runs in the mylohyoid groove." },
        { key: "mandibular_foramen", label: "Mandibular foramen", text: "The inferior alveolar nerve enters the canal behind the lingula; it supplies the lower teeth." },
        { key: "mental", label: "Mental foramen", text: "The mental nerve leaves below the second premolar to supply the lower lip and chin." }
      ],
      relations: [
        "Lateral: upper head of lateral pterygoid",
        "Medial: tensor veli palatini and the otic ganglion, then the Eustachian tube",
        "Behind: middle meningeal artery entering foramen spinosum"
      ],
      supply: {
        "Motor": "Muscles of mastication (masseter, temporalis, both pterygoids), mylohyoid, anterior belly of digastric, tensor veli palatini, tensor tympani",
        "Sensory": "Lower face, lower lip and chin, temple, auricle in part, lower teeth and gums, anterior two-thirds of the tongue (general sensation), floor of mouth, dura of the middle fossa"
      },
      surgical: [
        "In infratemporal fossa approaches V3 is followed up to foramen ovale and divided if needed; the result is numbness of the lower face and tongue and weak chewing on that side.",
        "Perineural spread of tumour (especially adenoid cystic carcinoma) along V3 widens foramen ovale and can reach the cavernous sinus.",
        "Trigeminal neuralgia in the V3 territory can be treated by percutaneous procedures through foramen ovale (Härtel's route)."
      ],
      danger: ["Foramen ovale drilling: the Eustachian tube and the petrous carotid lie just behind and medial"],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "v3_anterior",
      name: "Anterior division of V3",
      layer: "nerve",
      summary: "The small division. It is mostly motor and passes forward deep to the upper head of lateral pterygoid. It gives the masseteric nerve, the deep temporal nerves and the nerve to lateral pterygoid, and one sensory branch, the buccal nerve.",
      relations: ["Lies deep to the upper head of lateral pterygoid, below the infratemporal surface of the greater wing"],
      supply: { "Motor": "Masseter, temporalis, lateral pterygoid", "Sensory": "Through the buccal nerve: skin of the cheek and the buccal gingiva of the lower molars" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "v3_posterior",
      name: "Posterior division of V3",
      layer: "nerve",
      summary: "The larger division. It is mostly sensory and gives the auriculotemporal, lingual and inferior alveolar nerves. Its only motor fibres leave in the nerve to mylohyoid.",
      relations: ["Descends deep to lateral pterygoid; the middle meningeal artery passes between the two roots of its auriculotemporal branch"],
      supply: { "Sensory": "Auricle and temple, tongue and floor of mouth, lower teeth, lower lip and chin", "Motor": "Mylohyoid and anterior belly of digastric" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ian",
      name: "Inferior alveolar nerve",
      layer: "nerve",
      summary: "The largest branch of V3. It comes out at the lower border of lateral pterygoid and runs down on medial pterygoid, behind the lingual nerve. It passes between the sphenomandibular ligament and the ramus to the mandibular foramen. It runs in the mandibular canal under the tooth roots and ends as the mental and incisive nerves.",
      relations: [
        "Accompanied by the inferior alveolar artery and vein, which lie behind it",
        "At the mandibular foramen: the lingula and sphenomandibular ligament medially, the ramus laterally",
        "In the canal: close to the roots of the third molar"
      ],
      supply: { "Sensory": "Lower teeth (incisive branch for the anterior teeth); lower lip, chin and anterior labial gingiva (mental)", "Motor": "Through the nerve to mylohyoid: mylohyoid and anterior belly of digastric" },
      surgical: [
        "Inferior alveolar nerve block: the needle enters the pterygomandibular space lateral to the pterygomandibular raphe, about 1 cm above the occlusal plane, with the syringe over the opposite premolars, and is advanced until bone is felt near the lingula. The lingual nerve, just in front, is usually anaesthetised as well.",
        "Too deep or too far back, the needle enters the parotid and blocks the facial nerve (temporary facial palsy).",
        "Third molar removal, implants and sagittal split osteotomy can damage the nerve in its canal: numb lower lip and chin."
      ],
      danger: ["Lower third molar roots close to the canal (darkening of the root or loss of the canal's white line on a panoramic film)"],
      variations: ["Bifid mandibular canals; a retromolar canal with an accessory branch"],
      refs: ["gray", "malamed", "pogrel"]
    },
    {
      id: "lingual_nerve",
      name: "Lingual nerve",
      layer: "nerve",
      summary: "Leaves the posterior division and runs down deep to lateral pterygoid, where the chorda tympani joins it from behind. It then runs between medial pterygoid and the ramus, in front of the inferior alveolar nerve. It lies against the lingual cortex of the mandible just below and behind the third molar, covered only by mucosa. It then crosses the submandibular duct to reach the tongue.",
      course: [
        { key: "origin", label: "Posterior division of V3", text: "Below foramen ovale, deep to lateral pterygoid." },
        { key: "chorda", label: "Chorda tympani joins", text: "About 2 cm below the skull base; it adds taste fibres from the anterior tongue and preganglionic secretomotor fibres for the submandibular ganglion." },
        { key: "molar", label: "Lower third molar", text: "On the lingual plate of the mandible, often above the mylohyoid line, under mucosa only." },
        { key: "tongue", label: "Tongue", text: "Hooks under the submandibular duct from lateral to medial and enters the side of the tongue; the submandibular ganglion hangs from it." }
      ],
      relations: ["Between medial pterygoid and the ramus in the pterygomandibular space, in front of the inferior alveolar nerve"],
      supply: { "Sensory": "Anterior two-thirds of the tongue, floor of mouth, lingual gingiva", "Taste (from the chorda)": "Anterior two-thirds of the tongue", "Secretomotor (from the chorda)": "Submandibular and sublingual glands through the submandibular ganglion" },
      surgical: [
        "Most at risk in lower third molar surgery: lingual flaps and distolingual bone removal should be avoided or done with protection.",
        "Inferior alveolar nerve blocks sometimes cause lasting lingual nerve numbness, probably from direct needle injury."
      ],
      danger: ["Distolingual to the lower third molar", "Where it crosses the submandibular duct (submandibular gland excision)"],
      variations: ["In a minority it lies at or above the alveolar crest behind the third molar"],
      refs: ["gray", "pogrel"]
    },
    {
      id: "buccal_nerve",
      name: "Buccal nerve (long buccal)",
      layer: "nerve",
      summary: "The only sensory branch of the anterior division. It passes forward between the two heads of lateral pterygoid, then down under or through the lower part of temporalis. It reaches the outer surface of buccinator and pierces it to supply the mucosa.",
      course: [
        { key: "division", label: "Anterior division", text: "Leaves V3 below foramen ovale." },
        { key: "heads", label: "Between the heads of lateral pterygoid", text: "The classic landmark of the fossa." },
        { key: "cheek", label: "Cheek", text: "On buccinator; supplies the cheek skin and mucosa and the buccal gingiva of the lower molars." }
      ],
      relations: ["Runs with the buccal artery"],
      supply: { "Sensory": "Skin and mucosa of the cheek, buccal gingiva of the lower molars" },
      surgical: ["Not the motor nerve to buccinator (that is the facial nerve). It needs its own injection (long buccal block) for extractions of lower molars."],
      danger: [],
      variations: [],
      refs: ["gray", "malamed"]
    },
    {
      id: "auriculotemporal",
      name: "Auriculotemporal nerve",
      layer: "nerve",
      drawn: true,
      summary: "Leaves the posterior division as two roots that encircle the middle meningeal artery and then join. It runs back deep to lateral pterygoid and passes medial and then posterior to the neck of the mandible, through the upper parotid. It turns up over the root of the zygoma behind the superficial temporal vessels. Drawn for this app (Z-Anatomy has no model of it).",
      course: [
        { key: "origin", label: "Posterior division of V3", text: "Two roots, just below foramen ovale." },
        { key: "mma", label: "Around the middle meningeal artery", text: "The roots split round the artery and join behind it." },
        { key: "tmj", label: "Behind the TMJ", text: "Medial and then posterior to the neck of the mandible, giving branches to the joint, then into the parotid." },
        { key: "temple", label: "Temple", text: "Over the root of the zygoma behind the superficial temporal artery; supplies the front of the auricle, the external acoustic meatus, the tympanic membrane and the temple." }
      ],
      relations: ["Carries postganglionic parasympathetic fibres from the otic ganglion to the parotid"],
      supply: { "Sensory": "TMJ, front of the auricle, external acoustic meatus, outer tympanic membrane, temple", "Secretomotor (hitch-hiking)": "Parotid gland, from IX through the lesser petrosal nerve and otic ganglion" },
      surgical: [
        "After parotidectomy, cut secretomotor fibres can regrow into the sweat glands of the skin: gustatory sweating (Frey syndrome).",
        "Can be compressed or irritated near the TMJ: referred ear and temple pain. It is a target for nerve decompression in some migraine surgery."
      ],
      danger: ["TMJ surgery and preauricular incisions"],
      variations: ["Sometimes more than two roots"],
      refs: ["gray", "frey"]
    },
    {
      id: "chorda",
      name: "Chorda tympani",
      layer: "nerve",
      summary: "A branch of the facial nerve that crosses the middle ear and leaves through the petrotympanic fissure. It runs down and forward medial to the spine of the sphenoid and deep to lateral pterygoid, and joins the back of the lingual nerve.",
      course: [
        { key: "fissure", label: "Petrotympanic fissure", text: "Leaves the middle ear medial to the spine of the sphenoid (canal of Huguier)." },
        { key: "lingual", label: "Joins the lingual nerve", text: "From behind, about 2 cm below the skull base." }
      ],
      relations: [],
      supply: { "Taste": "Anterior two-thirds of the tongue", "Secretomotor (preganglionic)": "Submandibular and sublingual glands through the submandibular ganglion" },
      surgical: ["Injured in middle ear surgery (altered taste); a lesion above where it branches from VII adds taste loss to facial palsy."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "nerve_mylohyoid",
      name: "Nerve to mylohyoid",
      layer: "nerve",
      summary: "The only motor branch of the posterior division. It leaves the inferior alveolar nerve just before the mandibular foramen, pierces the sphenomandibular ligament and runs in the mylohyoid groove on the inner surface of the mandible.",
      relations: ["Runs with the mylohyoid branch of the inferior alveolar artery"],
      supply: { "Motor": "Mylohyoid and anterior belly of digastric" },
      surgical: ["Can carry sensory fibres to the lower incisors, which explains some incomplete inferior alveolar blocks."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "masseteric_nerve",
      name: "Masseteric nerve",
      layer: "nerve",
      drawn: true,
      summary: "From the anterior division, it runs laterally above the lateral pterygoid and passes through the mandibular notch, behind the tendon of temporalis, with the masseteric artery. It enters the deep surface of masseter and gives a twig to the TMJ. Drawn for this app.",
      relations: ["Crosses the mandibular notch between the coronoid and condylar processes"],
      supply: { "Motor": "Masseter", "Sensory": "TMJ" },
      surgical: ["A donor nerve for facial reanimation (masseteric–facial nerve transfer); found deep to masseter, about 1 cm below the zygomatic arch and 3 cm in front of the tragus."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "deep_temporal_nerves",
      name: "Deep temporal nerves",
      layer: "nerve",
      drawn: true,
      summary: "Usually two (anterior and posterior), from the anterior division. They pass above the upper head of lateral pterygoid and turn up into the deep surface of temporalis, with the deep temporal arteries. The anterior nerve often leaves with the buccal nerve. Drawn for this app.",
      relations: [],
      supply: { "Motor": "Temporalis" },
      surgical: ["Preserved when temporalis is used as a muscle flap (temporalis transfer for facial reanimation, or to fill skull base defects)."],
      danger: [],
      variations: ["A third, intermediate deep temporal nerve is common"],
      refs: ["gray"]
    },
    {
      id: "nerve_medial_pterygoid",
      name: "Nerve to medial pterygoid",
      layer: "nerve",
      drawn: true,
      summary: "From the main trunk of V3, it passes through or beside the otic ganglion without synapsing and enters the deep surface of medial pterygoid. Small branches supply tensor veli palatini and tensor tympani. Drawn for this app.",
      relations: ["Medial to the trunk, beside the otic ganglion"],
      supply: { "Motor": "Medial pterygoid, tensor veli palatini, tensor tympani" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "otic_ganglion",
      name: "Otic ganglion",
      layer: "nerve",
      drawn: true,
      summary: "The parasympathetic ganglion for the parotid. It lies just below foramen ovale, medial to the trunk of V3 and lateral to tensor veli palatini. Preganglionic fibres come from IX via the tympanic plexus and lesser petrosal nerve; postganglionic fibres reach the parotid in the auriculotemporal nerve. Shown as a small swelling drawn for this app.",
      relations: ["Behind it: the middle meningeal artery; medially: tensor veli palatini and the Eustachian tube"],
      supply: { "Parasympathetic": "Parotid secretion" },
      surgical: ["Tympanic neurectomy (Jacobson's nerve) interrupts the preganglionic supply; it has been used for Frey syndrome and sialorrhoea."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "v2",
      name: "Maxillary nerve (V2)",
      layer: "nerve",
      summary: "Leaves foramen rotundum into the pterygopalatine fossa, in front of the infratemporal fossa. Its posterior superior alveolar branches come out through the pterygomaxillary fissure onto the maxillary tuberosity. The nerve continues through the inferior orbital fissure as the infraorbital nerve.",
      relations: ["The pterygomaxillary fissure joins the two fossae; the third part of the maxillary artery runs in front of V2 in the pterygopalatine fossa"],
      supply: { "Sensory": "Midface, upper teeth, palate, nasal cavity, maxillary sinus" },
      surgical: ["Posterior superior alveolar block: needle up, back and in behind the tuberosity; too deep risks a haematoma from the pterygoid plexus."],
      danger: [],
      variations: [],
      refs: ["gray", "malamed"]
    },
    {
      id: "facial_nerve",
      name: "Facial nerve (VII)",
      layer: "context",
      summary: "Leaves the skull at the stylomastoid foramen, at the back of the fossa, and enters the parotid lateral to the styloid process, external carotid and retromandibular vein. It is not in the infratemporal fossa but must be found and protected in every lateral approach to it.",
      relations: ["Trunk between the mastoid and the styloid process; the posterior belly of digastric and the tympanomastoid suture lead to it"],
      supply: { "Motor": "Muscles of facial expression" },
      surgical: [
        "In the Fisch infratemporal approaches the nerve is lifted out of its canal and moved forward (anterior rerouting), which often leaves some weakness.",
        "The frontal branch crosses the zygomatic arch on the deep surface of the temporoparietal (superficial temporal) fascia. It is protected by incising the superficial layer of the deep temporal fascia above the arch and dissecting under it and subperiosteally over the arch."
      ],
      danger: ["Frontal branch over the zygomatic arch"],
      variations: [],
      refs: ["gray", "fisch"]
    },

    // ---------- arteries ----------
    {
      id: "maxillary_artery",
      name: "Maxillary artery",
      layer: "artery",
      summary: "The larger terminal branch of the external carotid. It arises behind the neck of the mandible inside the parotid and runs forward between the neck and the sphenomandibular ligament. It crosses the lower head of lateral pterygoid and passes through the pterygomaxillary fissure into the pterygopalatine fossa. It is divided into three parts by its relation to lateral pterygoid.",
      course: [
        { key: "origin", label: "Origin (1st, mandibular part)", text: "Behind the neck of the mandible in the parotid; deep auricular and anterior tympanic branches leave here." },
        { key: "iaa", label: "Inferior alveolar artery", text: "Down with the nerve to the mandibular foramen; gives the mylohyoid branch." },
        { key: "mma", label: "Middle meningeal artery", text: "Up between the roots of the auriculotemporal nerve to foramen spinosum." },
        { key: "accessory", label: "Accessory meningeal artery", text: "Up through foramen ovale; mainly supplies pterygoids and tensor veli palatini." },
        { key: "deep_temporal", label: "2nd (pterygoid) part", text: "On the lower head of lateral pterygoid: deep temporal, pterygoid and masseteric branches." },
        { key: "buccal", label: "Buccal and anterior deep temporal (2nd part)", text: "The buccal artery runs with the buccal nerve. Just beyond, as the artery enters the fissure, the posterior superior alveolar artery (3rd part) runs down onto the maxillary tuberosity." },
        { key: "ppf", label: "Pterygomaxillary fissure (3rd part)", text: "Into the pterygopalatine fossa: infraorbital, descending palatine, artery of the pterygoid canal, pharyngeal and sphenopalatine branches." }
      ],
      relations: [
        "1st part: between the neck of the mandible (laterally) and the sphenomandibular ligament (medially), above the inferior alveolar nerve",
        "2nd part: superficial to the lower head of lateral pterygoid in most people, deep to it in the rest; the buccal nerve is nearby",
        "Surrounded by the pterygoid venous plexus"
      ],
      supply: { "Territory": "Deep face, jaws and teeth, muscles of mastication, nasal cavity and palate, dura of the middle fossa, middle ear" },
      surgical: [
        "Severe posterior epistaxis is controlled by endoscopic sphenopalatine artery ligation, or embolisation of the maxillary artery; the transantral ligation used before is now rarely needed.",
        "In infratemporal fossa and condylar surgery the artery runs right behind the condylar neck and must be controlled early.",
        "Le Fort I osteotomy: the descending palatine artery is protected at the back of the maxilla."
      ],
      danger: ["Medial to the neck of the mandible in condylar fracture surgery and condylectomy", "Pterygomaxillary disjunction"],
      variations: ["Deep to the lower head of lateral pterygoid in about a third of people of European origin (much less often, about one in ten, in East Asian populations), and then sometimes looping between the branches of V3"],
      refs: ["gray", "shah", "scottbrown"]
    },
    {
      id: "mma",
      name: "Middle meningeal artery",
      layer: "artery",
      summary: "From the first part of the maxillary artery, it rises deep to lateral pterygoid and passes between the two roots of the auriculotemporal nerve. It enters the middle cranial fossa through foramen spinosum, then runs between the dura and the bone, grooving the skull.",
      course: [
        { key: "maxillary", label: "Origin", text: "First part of the maxillary artery, deep to the neck of the mandible." },
        { key: "auriculotemporal", label: "Between the auriculotemporal roots", text: "The nerve's two roots encircle the artery." },
        { key: "spinosum", label: "Foramen spinosum", text: "Into the middle fossa; its frontal branch runs under the pterion." }
      ],
      relations: ["Behind V3 at the skull base, in front of the spine of the sphenoid"],
      supply: { "Territory": "Dura and skull of the middle fossa and much of the convexity; petrous branch to the facial nerve in its canal" },
      surgical: [
        "Tearing of its frontal branch under a pterion fracture causes an extradural haematoma.",
        "Embolised for chronic subdural haematoma and some skull base tumours; coagulated and divided at foramen spinosum in subtemporal approaches."
      ],
      danger: ["Foramen spinosum when drilling the middle fossa floor"],
      variations: ["Can arise from the ophthalmic artery, or supply the ophthalmic territory through a meningo-ophthalmic artery: embolisation risks blindness"],
      refs: ["gray", "rhoton"]
    },
    {
      id: "accessory_meningeal",
      name: "Accessory meningeal artery",
      layer: "artery",
      summary: "A small branch from the first part of the maxillary artery or the middle meningeal artery. Despite its name, most of its blood goes to the pterygoid muscles, tensor veli palatini and the Eustachian tube. A small part enters through foramen ovale to the trigeminal ganglion and dura.",
      relations: ["Rises beside V3 to foramen ovale"],
      supply: { "Territory": "Pterygoids, tensor veli palatini, Eustachian tube, trigeminal ganglion" },
      surgical: ["A feeder of juvenile nasopharyngeal angiofibroma and skull base tumours."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "iaa",
      name: "Inferior alveolar artery",
      layer: "artery",
      summary: "From the first part of the maxillary artery, it runs down behind the inferior alveolar nerve to the mandibular foramen and through the mandibular canal. Its mylohyoid branch runs in the mylohyoid groove and its mental branch leaves at the mental foramen.",
      relations: ["Between the sphenomandibular ligament and the ramus, behind the nerve"],
      supply: { "Territory": "Mandible, lower teeth, chin" },
      surgical: ["A positive aspiration during an inferior alveolar block means the needle is in this artery or its vein."],
      danger: [],
      variations: [],
      refs: ["gray", "malamed"]
    },
    {
      id: "deep_temporal_arteries",
      name: "Deep temporal arteries",
      layer: "artery",
      summary: "Anterior and posterior branches from the second part of the maxillary artery. They rise between temporalis and the bone of the temporal fossa with the deep temporal nerves.",
      relations: [],
      supply: { "Territory": "Temporalis, bone of the temporal fossa" },
      surgical: ["The main supply of the temporalis muscle flap, which is kept on them when it is turned down into the fossa or orbit."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "buccal_artery",
      name: "Buccal artery",
      layer: "artery",
      summary: "From the second part, it runs forward and down with the buccal nerve to the outer surface of buccinator.",
      relations: ["With the buccal nerve"],
      supply: { "Territory": "Buccinator, cheek skin and mucosa" },
      surgical: ["The pedicle of the posteriorly based buccinator myomucosal flap used in palate and oral reconstruction (the FAMM flap runs on the facial artery instead)."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "psa",
      name: "Posterior superior alveolar artery",
      layer: "artery",
      summary: "Leaves the maxillary artery just before it enters the pterygomaxillary fissure and runs down onto the maxillary tuberosity with the nerves of the same name. Its branches enter the alveolar canals.",
      relations: ["On the maxillary tuberosity, next to the pterygoid plexus"],
      supply: { "Territory": "Upper molars and premolars, maxillary sinus lining, gingiva" },
      surgical: ["Can bleed in sinus lift procedures and posterior maxillary surgery."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "descending_palatine",
      name: "Descending and greater palatine arteries",
      layer: "artery",
      summary: "From the third part in the pterygopalatine fossa, the descending palatine artery runs down the greater palatine canal. It leaves through the greater palatine foramen as the greater palatine artery and runs forward on the hard palate.",
      relations: ["At the back of the maxilla, beside the pterygoid plates"],
      supply: { "Territory": "Hard and soft palate, palatal gingiva" },
      surgical: ["Protected in Le Fort I osteotomy and maxillary resections; the pedicle of palatal flaps."],
      danger: ["Pterygomaxillary disjunction"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sphenopalatine",
      name: "Sphenopalatine artery branches",
      layer: "artery",
      summary: "The end of the maxillary artery. It passes through the sphenopalatine foramen into the nose and divides into posterior lateral nasal and posterior septal branches.",
      relations: ["The foramen lies behind the middle turbinate, marked by the crista ethmoidalis"],
      supply: { "Territory": "Lateral nasal wall and septum" },
      surgical: [
        "The main source of posterior epistaxis; endoscopic ligation at the sphenopalatine foramen.",
        "The posterior septal branch supplies the nasoseptal flap used to close skull base defects."
      ],
      danger: [],
      variations: ["Often divides before the foramen, so more than one branch must be clipped"],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "pterygoid_canal_artery",
      name: "Artery of the pterygoid canal",
      layer: "artery",
      summary: "A small branch of the third part that runs back through the pterygoid (Vidian) canal with the Vidian nerve, towards the Eustachian tube and pharynx.",
      relations: [],
      supply: { "Territory": "Upper pharynx, Eustachian tube, tympanic cavity" },
      surgical: ["The Vidian canal leads to the petrous carotid at foramen lacerum in endoscopic approaches."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "eca",
      name: "External carotid artery",
      layer: "artery",
      summary: "Rises through the parotid behind the ramus and divides behind the neck of the mandible into the superficial temporal and maxillary arteries.",
      relations: ["Lateral to the styloid process and its muscles, which separate it from the internal carotid"],
      supply: {},
      surgical: ["Ligated in the neck for uncontrollable bleeding from its branches; the many anastomoses across the midline limit the effect."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sta",
      name: "Superficial temporal artery",
      layer: "artery",
      summary: "The smaller terminal branch of the external carotid. It rises out of the parotid in front of the tragus, with the auriculotemporal nerve behind it, and divides into frontal and parietal branches.",
      relations: ["Its pulse is felt in front of the tragus"],
      supply: { "Territory": "Scalp of the temple, parotid, TMJ" },
      surgical: ["Biopsy in giant cell arteritis; the pedicle of temporoparietal fascia flaps. Kept in the scalp flap of preauricular approaches."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "transverse_facial",
      name: "Transverse facial artery",
      layer: "artery",
      summary: "From the superficial temporal artery in the parotid, it runs forward across masseter between the zygomatic arch and the parotid duct.",
      relations: ["With the upper buccal branches of the facial nerve"],
      supply: { "Territory": "Parotid, masseter, cheek skin" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ica",
      name: "Internal carotid artery",
      layer: "artery",
      summary: "Rises behind the infratemporal fossa in the carotid sheath, medial to the styloid process, to enter the carotid canal just behind and medial to the spine of the sphenoid.",
      relations: ["Posterior boundary of the fossa; the Eustachian tube runs in front of the petrous carotid"],
      supply: {},
      surgical: ["In lateral skull base surgery it is controlled in the neck first and then followed up to the carotid canal; drilling medial to foramen ovale and spinosum reaches its petrous segment."],
      danger: ["Medial to the spine of the sphenoid and the styloid process"],
      variations: [],
      refs: ["gray", "fisch"]
    },

    // ---------- veins ----------
    {
      id: "maxillary_vein",
      name: "Maxillary vein and pterygoid plexus",
      layer: "vein",
      summary: "The pterygoid venous plexus is a network around and between the pterygoid muscles that collects blood from the territory of the maxillary artery. It drains through a short maxillary vein behind the neck of the mandible, which joins the superficial temporal vein to form the retromandibular vein. Z-Anatomy models only the maxillary vein, not the plexus.",
      relations: [
        "Connects with the cavernous sinus (emissary veins through foramen ovale and the sphenoidal emissary foramen), the inferior ophthalmic vein, and the facial vein through the deep facial vein"
      ],
      supply: {},
      surgical: [
        "The source of the haematoma after a posterior superior alveolar block, and of troublesome bleeding in infratemporal fossa surgery (packing, bipolar and haemostatic agents).",
        "Infection from the teeth or deep face can spread through it to the cavernous sinus."
      ],
      danger: ["Blind dissection around lateral pterygoid"],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "retromandibular",
      name: "Retromandibular vein",
      layer: "vein",
      summary: "Formed in the parotid by the superficial temporal and maxillary veins, behind the neck of the mandible. It runs down deep to the facial nerve branches and splits into anterior and posterior divisions.",
      relations: ["Deep to the facial nerve, superficial to the external carotid"],
      supply: {},
      surgical: ["A landmark for the marginal mandibular and cervical branches of the facial nerve in parotidectomy and in the retromandibular approach to the condyle."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ijv",
      name: "Internal jugular vein",
      layer: "vein",
      summary: "Leaves the jugular foramen behind the infratemporal fossa, lateral to the internal carotid and the last four cranial nerves.",
      relations: [],
      supply: {},
      surgical: ["Controlled in the neck at the start of lateral skull base approaches."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- muscles ----------
    {
      id: "lpt_superior",
      name: "Lateral pterygoid, upper head",
      layer: "muscle",
      summary: "From the infratemporal surface and crest of the greater wing of the sphenoid. It runs back to the pterygoid fovea on the condylar neck, and some fibres reach the capsule and disc of the TMJ.",
      relations: ["The deep temporal and masseteric nerves come out above it; the buccal nerve between it and the lower head"],
      supply: { "Nerve": "Nerve to lateral pterygoid (anterior division of V3)", "Blood": "Pterygoid branches of the maxillary artery" },
      surgical: ["Its attachment to the disc is involved in anterior disc displacement of the TMJ."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "lpt_inferior",
      name: "Lateral pterygoid, lower head",
      layer: "muscle",
      summary: "From the lateral surface of the lateral pterygoid plate, running back to the pterygoid fovea of the condylar neck. Both heads pull the condyle and disc forward onto the articular eminence. This opens the mouth, pushes the jaw forward and, acting on one side, moves it to the other side.",
      relations: ["The maxillary artery usually crosses its lateral surface; the lingual and inferior alveolar nerves come out at its lower border"],
      supply: { "Nerve": "Nerve to lateral pterygoid (anterior division of V3)", "Blood": "Pterygoid branches of the maxillary artery" },
      surgical: [
        "The main muscle that opens the mouth. In a condylar neck fracture it pulls the condyle forward and medially.",
        "Divided or retracted in infratemporal fossa approaches to reach V3 and the skull base."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "medial_pterygoid",
      name: "Medial pterygoid",
      layer: "muscle",
      summary: "The deep head comes from the medial surface of the lateral pterygoid plate; the small superficial head from the maxillary tuberosity and the palatine bone. It runs down, back and out to the inner surface of the angle of the mandible, forming a sling with masseter. It closes and protrudes the jaw.",
      relations: ["The lingual and inferior alveolar nerves lie on its lateral surface (the pterygomandibular space between it and the ramus)", "Medially: the parapharyngeal space and tensor veli palatini"],
      supply: { "Nerve": "Nerve to medial pterygoid (main trunk of V3)", "Blood": "Pterygoid branches of the maxillary artery, facial artery" },
      surgical: ["Infection or haematoma in or beside it (pterygomandibular space) causes marked trismus."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "temporalis",
      name: "Temporalis",
      layer: "superficial",
      summary: "Fan-shaped, from the floor of the temporal fossa and the deep temporal fascia. It narrows under the zygomatic arch to insert on the coronoid process and the front of the ramus. It closes the jaw, and its back fibres pull it back.",
      relations: ["Deep temporal nerves and arteries on its deep surface; its tendon lies in front of the masseteric nerve in the mandibular notch"],
      supply: { "Nerve": "Deep temporal nerves (V3)", "Blood": "Deep temporal arteries; middle temporal branch of the superficial temporal artery" },
      surgical: ["Turned down as a flap to fill infratemporal and orbital defects or for facial reanimation; reflected downwards (with or without the coronoid) to expose the fossa."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "masseter",
      name: "Masseter",
      layer: "superficial",
      summary: "Superficial and deep parts from the zygomatic arch insert on the outer surface of the ramus and angle. It covers the infratemporal fossa from the side and closes the jaw.",
      relations: ["The masseteric nerve and vessels reach its deep surface through the mandibular notch; the parotid overlaps its back border"],
      supply: { "Nerve": "Masseteric nerve (V3)", "Blood": "Masseteric branch of the maxillary artery, transverse facial and facial arteries" },
      surgical: ["Masseteric space infection causes trismus and swelling over the angle; masseter hypertrophy can be treated with botulinum toxin."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "parotid",
      name: "Parotid gland (deep part)",
      layer: "superficial",
      summary: "Wraps round the back of the ramus. Its deep part reaches medially towards the styloid process and the parapharyngeal space, and the external carotid, retromandibular vein, facial nerve and the start of the maxillary and superficial temporal arteries run through it.",
      relations: ["The auriculotemporal nerve and superficial temporal vessels leave its upper border"],
      supply: { "Secretomotor": "IX via the otic ganglion and auriculotemporal nerve" },
      surgical: ["Deep lobe tumours grow through the stylomandibular tunnel into the parapharyngeal space (dumbbell tumours)."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "superior_constrictor",
      name: "Superior constrictor",
      layer: "context",
      summary: "The upper pharyngeal constrictor, attached to the medial pterygoid plate, the hamulus and the pterygomandibular raphe. It lies medial to the fossa beyond the parapharyngeal space.",
      relations: [],
      supply: { "Nerve": "Pharyngeal plexus (X)" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "digastric_post",
      name: "Posterior belly of digastric",
      layer: "context",
      summary: "From the mastoid notch down and forward to the hyoid. In the neck it is the 'resident's friend', with the external and internal carotids, the internal jugular vein and the last cranial nerves deep to it.",
      relations: ["The facial nerve trunk lies just above its attachment, at the same depth"],
      supply: { "Nerve": "Facial nerve" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "styloid_muscles",
      name: "Styloid process muscles and stylohyoid ligament",
      layer: "context",
      summary: "Stylohyoid, stylopharyngeus and the stylohyoid ligament run down from the styloid process. With the styloid itself they separate the external carotid (lateral) from the internal carotid (medial).",
      relations: [],
      supply: { "Nerve": "Stylohyoid: facial nerve; stylopharyngeus: glossopharyngeal nerve" },
      surgical: ["A long or calcified styloid process (Eagle syndrome) causes throat or carotid pain."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- joint and ligaments ----------
    {
      id: "tmj_capsule",
      name: "TMJ capsule and lateral ligament",
      layer: "joint",
      summary: "The temporomandibular joint is a synovial joint between the condyle and the mandibular fossa and articular eminence. Its loose capsule is reinforced laterally by the lateral (temporomandibular) ligament, from the zygomatic tubercle to the back of the condylar neck, which stops the condyle moving back.",
      relations: ["Behind: the auriculotemporal nerve and superficial temporal vessels; medially: the maxillary artery and middle meningeal artery"],
      supply: { "Nerve": "Auriculotemporal and masseteric nerves", "Blood": "Superficial temporal and maxillary arteries" },
      surgical: ["Preauricular and endaural approaches to the joint protect the frontal branch of VII by dissecting under the superficial layer of the deep temporal fascia and subperiosteally over the arch."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "tmj_disc",
      name: "TMJ articular disc",
      layer: "joint",
      summary: "A fibrous disc that divides the joint into an upper compartment (gliding, translation) and a lower compartment (hinge, rotation). It is attached to the condyle at its sides, and in front to the upper head of lateral pterygoid.",
      relations: [],
      supply: {},
      surgical: ["Anterior disc displacement causes clicking and locking; arthrocentesis, arthroscopy or disc repositioning may be used."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sphenomandibular",
      name: "Sphenomandibular ligament",
      layer: "joint",
      summary: "From the spine of the sphenoid down to the lingula of the mandible; a remnant of Meckel's cartilage. The inferior alveolar nerve and vessels pass between it and the ramus; the maxillary artery between it and the neck of the mandible.",
      relations: ["Pierced by the nerve to mylohyoid; the lingual nerve lies medial to it"],
      supply: {},
      surgical: ["Its lower end at the lingula is the target region of the inferior alveolar block."],
      danger: [],
      variations: [],
      refs: ["gray", "malamed"]
    },
    {
      id: "stylomandibular",
      name: "Stylomandibular ligament",
      layer: "joint",
      summary: "A thickening of the deep cervical fascia from the styloid process to the angle of the mandible. It separates the parotid from the submandibular gland.",
      relations: ["Forms the lower border of the stylomandibular tunnel through which deep lobe parotid tumours reach the parapharyngeal space"],
      supply: {},
      surgical: ["Divided to widen the tunnel when removing parapharyngeal tumours from the neck."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "pterygospinous",
      name: "Pterygospinous ligament",
      layer: "joint",
      summary: "A band from the back of the lateral pterygoid plate to the spine of the sphenoid, sometimes ossified (forming the pterygospinous foramen of Civinini).",
      relations: ["Branches of V3 pass under or through it"],
      supply: {},
      surgical: ["When ossified it can block a needle aimed at foramen ovale, or trap the lingual nerve."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- bone ----------
    {
      id: "mandible",
      name: "Mandible (ramus, condyle, coronoid)",
      layer: "bone",
      summary: "The ramus forms the lateral wall of the fossa. Its condylar process articulates at the TMJ and its coronoid process takes temporalis. The mandibular foramen, guarded by the lingula, lies in the middle of its inner surface.",
      relations: ["The mandibular notch lets the masseteric nerve and vessels through"],
      supply: {},
      surgical: ["Divided (mandibulotomy or ramus osteotomy) or the condyle removed to open the fossa widely."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "maxilla",
      name: "Maxilla and palatine bone",
      layer: "bone",
      summary: "The infratemporal surface of the maxilla, ending at the maxillary tuberosity, is the front wall of the fossa. The pterygomaxillary fissure lies between it and the pterygoid process.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sphenoid",
      name: "Sphenoid bone",
      layer: "bone",
      summary: "The greater wing forms the roof of the fossa, with foramina ovale and spinosum and the spine of the sphenoid. The lateral pterygoid plate forms the medial wall.",
      relations: [],
      supply: {},
      surgical: ["The infratemporal crest marks the boundary between the temporal and infratemporal fossae."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "temporal",
      name: "Temporal bone",
      layer: "bone",
      summary: "Its squamous part forms the mandibular fossa and articular eminence; behind the fossa lie the tympanic plate, the styloid process and the stylomastoid foramen.",
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
      summary: "The arch bridges over the gap between the temporal and infratemporal fossae and gives origin to masseter.",
      relations: [],
      supply: {},
      surgical: ["Osteotomised and reflected in lateral approaches to the fossa, then plated back."],
      danger: ["The frontal branch of VII crosses it"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "parietal",
      name: "Parietal bone (lower part)",
      layer: "bone",
      summary: "The lower part forms the back of the temporal fossa, where temporalis attaches.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "s_itf",
      name: "Infratemporal fossa (outline)",
      layer: "spaces",
      drawn: true,
      summary: "A translucent volume around the pterygoid muscles and the sphenomandibular ligament, showing where the fossa lies. It is drawn for this app; the real fossa has no walls at the front of the pterygoids or below.",
      relations: ["Continuous with the masticator space of radiology, which also includes masseter and temporalis"],
      supply: {},
      surgical: ["On CT and MRI, tumours here widen the fat planes around the pterygoids; perineural spread is followed up V3 to foramen ovale."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },

    // ---------- foramina and landmarks (pins) ----------
    {
      id: "f_ovale",
      name: "Foramen ovale",
      layer: "foramina",
      pin: "foramen_ovale",
      summary: "In the greater wing of the sphenoid, at the root of the lateral pterygoid plate.",
      relations: ["Transmits: V3 with the motor root, accessory meningeal artery, lesser petrosal nerve, emissary veins (pterygoid plexus to cavernous sinus)"],
      supply: {},
      surgical: ["Percutaneous rhizotomy or balloon compression for trigeminal neuralgia; needle in from the cheek (Härtel)."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "f_spinosum",
      name: "Foramen spinosum",
      layer: "foramina",
      pin: "foramen_spinosum",
      summary: "Behind and lateral to foramen ovale, in front of the spine of the sphenoid.",
      relations: ["Transmits: middle meningeal artery and vein, meningeal branch of V3 (nervus spinosus)"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_spine",
      name: "Spine of the sphenoid",
      layer: "foramina",
      pin: "spine_of_sphenoid",
      summary: "A downward spur behind foramen spinosum, for the sphenomandibular ligament.",
      relations: ["The chorda tympani runs on its medial side; the internal carotid enters the carotid canal just behind and medial to it"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_lpp",
      name: "Lateral pterygoid plate",
      layer: "foramina",
      pin: "lateral_pterygoid_plate",
      summary: "The medial wall of the fossa: the lower head of lateral pterygoid arises from its outer surface and the deep head of medial pterygoid from its inner surface.",
      relations: [],
      supply: {},
      surgical: ["Foramen ovale lies at the top of its back edge, a guide for needles and drills."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_mandibular",
      name: "Mandibular foramen and lingula",
      layer: "foramina",
      pin: "mandibular_foramen",
      summary: "Opening of the mandibular canal in the middle of the inner surface of the ramus, guarded in front by the lingula.",
      relations: ["Transmits: inferior alveolar nerve and vessels"],
      supply: {},
      surgical: ["Usually level with the occlusal plane in adults, lower in children: the guide for the inferior alveolar block."],
      danger: [],
      variations: [],
      refs: ["gray", "malamed"]
    },
    {
      id: "f_notch",
      name: "Mandibular notch",
      layer: "foramina",
      pin: "mandibular_notch",
      summary: "The notch between the coronoid and condylar processes.",
      relations: ["Transmits: masseteric nerve and vessels"],
      supply: {},
      surgical: ["The route for extraoral (sigmoid notch) blocks of V3 and the maxillary nerve."],
      danger: [],
      variations: [],
      refs: ["gray", "malamed"]
    },
    {
      id: "f_ptm",
      name: "Pterygomaxillary fissure",
      layer: "foramina",
      pin: "pterygomaxillary_fissure",
      summary: "The vertical gap between the maxilla and the lateral pterygoid plate that leads into the pterygopalatine fossa.",
      relations: ["Transmits: third part of the maxillary artery (inwards), posterior superior alveolar nerves and vessels (outwards)"],
      supply: {},
      surgical: ["Separated in Le Fort I osteotomy (pterygomaxillary disjunction), with the descending palatine artery just in front."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_stylomastoid",
      name: "Stylomastoid foramen",
      layer: "foramina",
      pin: "stylomastoid_foramen",
      summary: "Between the styloid and mastoid processes, at the back of the fossa.",
      relations: ["Transmits: facial nerve, stylomastoid artery"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_mental",
      name: "Mental foramen",
      layer: "foramina",
      pin: "mental_foramen",
      landmark: false, // on the body of the mandible; pinned on V3's course instead
      summary: "Below the second premolar, halfway between the alveolar margin and the lower border.",
      relations: ["Transmits: mental nerve and vessels"],
      supply: {},
      surgical: ["Mental nerve block; protected in genioplasty and lower vestibular incisions."],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  // Incisions drawn on the model at the surgery steps that name them (step.incision):
  // control points in app space, laid onto the outer surface along "axis" or "toward".
  incisions: [
    {"id": "hemicoronal", "name": "Hemicoronal incision with preauricular extension", "note": "Behind the hairline from the midline to above the ear, then down in the preauricular crease to the lobule.", "points": [[3.6, 13.85, -0.19], [0.6, 12.55, -0.39], [-1.9, 9.55, -1.19], [-3.2, 6.18, -1.0], [-3.2, 3.18, -0.61], [-3.23, 1.28, -0.61], [-2.2, -1.91, -1.31]], "toward": [3.6, 2.68, -1.19]}
  ],

  procedure: {
    title: "Lateral (preauricular–subtemporal) approach to the infratemporal fossa",
    atRisk: [{"id": "facial_nerve", "why": "The frontal branch crosses the arch in the incision: brow droop"}, {"id": "ica", "why": "Deep and medial, behind the styloid: catastrophic bleeding or stroke"}, {"id": "maxillary_artery", "why": "Runs through the field between the pterygoids: brisk bleeding"}, {"id": "maxillary_vein", "why": "The pterygoid plexus bleeds heavily and is hard to control"}, {"id": "v3_trunk", "why": "At foramen ovale: numbness of the jaw and tongue, weak chewing"}, {"id": "lingual_nerve", "why": "On medial pterygoid: numbness and loss of taste on the tongue"}],
    steps: [
      {
        title: "Plan, position and incision", incision: "hemicoronal",
        text: "For tumours of the fossa and lateral skull base. Supine, head turned away, facial nerve monitoring, lumbar drain if dura may be opened. A hemicoronal incision carried down in front of the ear and into an upper neck crease.",
        show: ["bone", "superficial", "artery"],
        focus: ["temporalis", "zygomatic", "parotid", "sta"]
      },
      {
        title: "Scalp flap and frontal branch", incision: "hemicoronal",
        text: "Raise the flap above the zygomatic arch deep to the superficial layer of deep temporal fascia (or under both layers), so that the frontal branch of VII stays in the flap. Keep the superficial temporal artery in the flap if possible.",
        show: ["bone", "superficial", "artery", "context"],
        focus: ["zygomatic", "facial_nerve", "sta"]
      },
      {
        title: "Neck and great vessels",
        text: "In the neck, find the internal jugular vein, internal and external carotid arteries and the last four cranial nerves and place slings on the vessels before the fossa is entered.",
        show: ["bone", "artery", "vein", "context"],
        focus: ["ica", "eca", "ijv", "digastric_post"]
      },
      {
        title: "Facial nerve and parotid",
        text: "Find the facial nerve trunk at the stylomastoid foramen (tragal pointer, posterior belly of digastric, tympanomastoid suture). Elevate the parotid with the nerve, or do a superficial parotidectomy, so the branches are protected for the rest of the operation.",
        show: ["bone", "superficial", "context", "foramina"],
        focus: ["facial_nerve", "parotid", "digastric_post", "f_stylomastoid"]
      },
      {
        title: "Zygomatic arch and temporalis",
        text: "Osteotomise the zygomatic arch (with the masseter left on it) and turn temporalis down off the temporal fossa on its deep temporal vessels. The coronoid can be divided to swing the muscle out of the way.",
        show: ["bone", "superficial", "artery", "nerve"],
        focus: ["zygomatic", "temporalis", "masseter", "deep_temporal_arteries"]
      },
      {
        title: "Condyle and ramus",
        text: "Open the TMJ and dislocate the condyle downwards, or resect the condyle or divide the ramus for more room. The maxillary artery lies just medial to the condylar neck at this point.",
        show: ["bone", "joint", "muscle", "artery"],
        focus: ["mandible", "tmj_capsule", "tmj_disc", "maxillary_artery"]
      },
      {
        title: "Maxillary artery and pterygoid plexus",
        text: "Find the maxillary artery crossing lateral pterygoid and ligate it early (or rely on preoperative embolisation). Bleeding from the pterygoid plexus is controlled with bipolar cautery, packing and haemostatic agents. Divide lateral pterygoid from the condyle.",
        show: ["bone", "muscle", "artery", "vein", "nerve"],
        focus: ["maxillary_artery", "maxillary_vein", "lpt_inferior", "lpt_superior"]
      },
      {
        title: "V3, middle meningeal artery and the skull base",
        text: "Follow V3 up to foramen ovale and the middle meningeal artery to foramen spinosum; coagulate and divide the artery, and V3 if the tumour requires. Drill the floor of the middle fossa as needed. The Eustachian tube lies medially and the petrous carotid behind and medial to the spine of the sphenoid.",
        show: ["bone", "foramina", "nerve", "artery"],
        focus: ["v3_trunk", "mma", "ica", "f_ovale", "f_spinosum"]
      },
      {
        title: "Tumour removal",
        text: "Remove the tumour with margins appropriate to its type, sending frozen sections of V3 for tumours that spread along nerves.",
        show: ["bone", "muscle", "nerve", "artery", "spaces"],
        focus: ["s_itf", "v3_trunk", "lingual_nerve", "ian"]
      },
      {
        title: "Reconstruction and closure",
        text: "Repair the dura watertight if it was opened. Fill the dead space with the temporalis flap (or a free flap for large resections), plate the zygomatic arch back and close over a drain.",
        show: ["bone", "superficial", "joint"],
        focus: ["temporalis", "zygomatic", "mandible"]
      }
    ],
    complications: [
      "Frontal branch palsy, or wider facial weakness after nerve rerouting",
      "Numbness of the lower face, lip and tongue after V3 division; weak chewing on that side",
      "Trismus and malocclusion after condylar or ramus surgery",
      "Bleeding from the pterygoid plexus or maxillary artery; carotid injury",
      "CSF leak and meningitis if the dura was opened",
      "Conductive hearing loss and middle ear effusion from Eustachian tube division",
      "Temporal hollowing; Frey syndrome; first bite syndrome (pain with the first bite of each meal after loss of parotid sympathetic supply)"
    ],
    refs: ["sekhar", "fisch", "shah", "scottbrown"]
  },

  figures: [
    { id: "fig-itf-lateral", title: "Right infratemporal fossa from the side, ramus and zygomatic arch removed", svg: "infratemporalFossa" },
    { id: "fig-itf-maxillary", title: "The three parts of the maxillary artery and their branches", svg: "maxillaryArtery" }
  ],

  quiz: [
    {
      q: "Which nerve passes between the two heads of lateral pterygoid?",
      options: ["Lingual nerve", "Buccal nerve", "Masseteric nerve", "Auriculotemporal nerve"],
      answer: 1,
      explain: "The buccal nerve, the only sensory branch of the anterior division, passes between the two heads. Masseteric and deep temporal nerves come out above the muscle; lingual and inferior alveolar below it."
    },
    {
      q: "The middle meningeal artery passes between the two roots of which nerve before entering foramen spinosum?",
      options: ["Lingual nerve", "Inferior alveolar nerve", "Auriculotemporal nerve", "Chorda tympani"],
      answer: 2,
      explain: "The two roots of the auriculotemporal nerve encircle the middle meningeal artery just below foramen spinosum."
    },
    {
      q: "Which nerve lies under the mucosa on the lingual side of the lower third molar?",
      options: ["Inferior alveolar nerve", "Lingual nerve", "Nerve to mylohyoid", "Buccal nerve"],
      answer: 1,
      explain: "The lingual nerve lies against the lingual plate distal to the third molar, sometimes at the level of the crest, and is at risk in third molar surgery."
    },
    {
      q: "Postganglionic parasympathetic fibres reach the parotid in which nerve?",
      options: ["Great auricular nerve", "Facial nerve", "Auriculotemporal nerve", "Lesser petrosal nerve"],
      answer: 2,
      explain: "Preganglionic fibres from IX reach the otic ganglion in the lesser petrosal nerve; postganglionic fibres travel in the auriculotemporal nerve. Their regrowth into sweat glands after parotidectomy causes Frey syndrome."
    },
    {
      q: "The inferior alveolar nerve reaches the mandibular foramen passing between the ramus and which structure?",
      options: ["Stylomandibular ligament", "Sphenomandibular ligament", "Pterygomandibular raphe", "Lateral temporomandibular ligament"],
      answer: 1,
      explain: "It passes between the sphenomandibular ligament and the ramus; the maxillary artery passes between the ligament and the neck of the mandible."
    },
    {
      q: "Which muscle of mastication opens the mouth?",
      options: ["Masseter", "Temporalis", "Medial pterygoid", "Lateral pterygoid"],
      answer: 3,
      explain: "Lateral pterygoid pulls the condyle and disc forward onto the eminence; the suprahyoid muscles help. The other three close the jaw."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the infratemporal and pterygopalatine fossae and the temporomandibular joint.",
    rhoton: "Rhoton AL Jr. Cranial Anatomy and Surgical Approaches. Lippincott Williams & Wilkins; 2003.",
    fisch: "Fisch U. Infratemporal fossa approach to tumours of the temporal bone and base of the skull. J Laryngol Otol. 1978;92(11):949–967.",
    sekhar: "Sekhar LN, Schramm VL Jr, Jones NF. Subtemporal-preauricular infratemporal fossa approach to large lateral and posterior cranial base neoplasms. J Neurosurg. 1987;67(4):488–499.",
    malamed: "Malamed SF. Handbook of Local Anesthesia. 7th ed. Elsevier; 2019. Chapters on mandibular and maxillary nerve blocks.",
    pogrel: "Pogrel MA, Thamby S. Permanent nerve involvement resulting from inferior alveolar nerve blocks. J Am Dent Assoc. 2000;131(7):901–907.",
    frey: "Frey L. Le syndrome du nerf auriculo-temporal. Rev Neurol (Paris). 1923;2:97–104.",
    shah: "Shah JP, Patel SG, Singh B, Wong RJ. Jatin Shah's Head and Neck Surgery and Oncology. 5th ed. Elsevier; 2019. Chapter on the skull base and infratemporal fossa.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Lateral skull base and epistaxis chapters."
  }
};
