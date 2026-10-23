// Content for the face: the muscles of facial expression (both sides), the
// facial nerve branches that supply them and the facial vessels. Each structure
// id matches a mesh id in data/face-meshes.js, except buccinator, which
// Z-Anatomy does not model. "course" lists the waypoints of a traced structure;
// each key matches a point in header.courses[id] (traced on the right).

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.face = {
  id: "face",
  title: "Face & facial muscles",
  subtitle: "Muscles of facial expression and the facial nerve branches that supply them, both sides (branches traced on the right)",

  overview: {
    "intro": "The muscles of facial expression lie in the subcutaneous tissue and move the skin rather than joints. They develop from the second pharyngeal arch, so they are all supplied by the facial nerve. Its five branches (temporal, zygomatic, buccal, marginal mandibular and cervical) fan out from the front of the parotid in a plane deep to the superficial musculoaponeurotic system (SMAS) and reach most muscles from their deep surface. Facial surgery and the assessment of facial palsy both depend on knowing which branch supplies which muscle and where each branch is at risk. In the model the muscles are on both sides, the facial nerve branches are yellow, and the branches and the facial artery can be traced on the right.",
    "boundaries": [
      {
        "label": "Layer 1: skin",
        "text": "Thickest on the forehead and chin, thinnest on the eyelids"
      },
      {
        "label": "Layer 2: subcutaneous fat",
        "text": "In separate superficial fat compartments divided by fibrous septa and the retaining ligaments"
      },
      {
        "label": "Layer 3: SMAS and facial muscles",
        "text": "The superficial musculoaponeurotic system, continuous with platysma below, the temporoparietal fascia and the galea above; it holds the superficial facial muscles"
      },
      {
        "label": "Layer 4: spaces and retaining ligaments",
        "text": "Soft-tissue spaces (prezygomatic, premasseter) and ligaments (zygomatic, masseteric, mandibular) that run from bone to skin; the facial nerve branches cross into the superficial layers next to the ligaments"
      },
      {
        "label": "Layer 5: deep fascia and periosteum",
        "text": "Parotidomasseteric and deep temporal fascia, periosteum; the facial nerve lies just deep to or within this level over masseter"
      }
    ],
    "contents": [
      "Around the eye: orbicularis oculi, corrugator supercilii, procerus; frontalis above",
      "Around the nose: nasalis, depressor septi nasi",
      "Upper lip and smile: levator labii superioris, zygomaticus minor and major, levator anguli oris, risorius",
      "Lower lip: depressor anguli oris, depressor labii inferioris, mentalis; platysma below",
      "Mouth and cheek: orbicularis oris, buccinator (not in the model)",
      "Nerve: facial nerve branches (motor); trigeminal branches give sensation (supraorbital, infraorbital, mental)",
      "Vessels: facial artery and vein, labial arteries, transverse facial and forehead vessels"
    ],
    "keyPoints": [
      "Most facial muscles are supplied on their deep surface; the three deepest (buccinator, levator anguli oris and mentalis) on their superficial surface. Dissection superficial to the muscles is therefore safe.",
      "The facial nerve branches run deep to the SMAS, so facelift and parotid flaps raised in the right plane carry no risk to them until the branches become superficial near the retaining ligaments.",
      "The zygomatic and buccal branches interconnect in most people; the temporal and marginal mandibular branches rarely do, so their injuries are the ones that last.",
      "Forehead sparing points to an upper motor neurone (central) lesion; a lower motor neurone palsy affects the whole side.",
      "Seckel's danger zones: great auricular nerve (zone 1), temporal branch over the arch (2), marginal mandibular branch at the facial vessels (3), zygomatic and buccal branches over the cheek (4), supraorbital and supratrochlear (5), infraorbital (6) and mental (7) nerves.",
      "House–Brackmann grades facial nerve function from I (normal) to VI (no movement); complete eye closure with effort is the line between grades III and IV."
    ],
    "refs": [
      "gray",
      "mitz",
      "freilinger",
      "seckel",
      "house"
    ]
  },

  layers: [{"id": "muscle", "label": "Facial muscles", "defaultOn": true}, {"id": "nerve", "label": "Nerves", "defaultOn": true}, {"id": "artery", "label": "Arteries", "defaultOn": true}, {"id": "vein", "label": "Veins", "defaultOn": false}, {"id": "gland", "label": "Parotid & duct", "defaultOn": true}, {"id": "bone", "label": "Skull & jaw", "defaultOn": true}, {"id": "cartilage", "label": "Nasal cartilages", "defaultOn": true}, {"id": "fascia", "label": "Scalp aponeurosis", "defaultOn": false}, {"id": "context", "label": "Chewing muscles", "defaultOn": false}],

  structures: [
    {
      id: "frontalis",
      name: "Frontalis",
      aka: "Frontal belly of occipitofrontalis",
      layer: "muscle",
      summary: "The frontal belly of occipitofrontalis. It raises the eyebrows and wrinkles the forehead, and is the only elevator of the brow.",
      relations: ["The temporal branch reaches its deep surface along its lateral edge, about 1.5–2 cm above the lateral eyebrow", "Supraorbital and supratrochlear nerves and vessels run up through and over it from the orbital rim"],
      supply: {"Origin": "Epicranial aponeurosis (galea), with no bony attachment", "Insertion": "Skin of the eyebrow, blending with procerus, corrugator and orbicularis oculi", "Action": "Raises the eyebrows; horizontal forehead lines", "Nerve": "Temporal (frontal) branch of the facial nerve"},
      surgical: ["Brow ptosis and a flat forehead on one side are the sign of temporal branch injury, which seldom recovers.", "Upper motor neurone (central) facial palsy spares the forehead because each side of frontalis gets input from both hemispheres; a lower motor neurone palsy (Bell's) does not.", "Botulinum toxin to frontalis is kept 1.5–2 cm above the brow to avoid brow ptosis."],
      danger: [],
      variations: [],
      refs: ["gray", "pitanguy"]
    },
    {
      id: "occipitalis",
      name: "Occipitalis",
      aka: "Occipital belly of occipitofrontalis",
      layer: "muscle",
      summary: "The occipital belly of occipitofrontalis, joined to frontalis by the epicranial aponeurosis. It draws the scalp backwards.",
      relations: [],
      supply: {"Origin": "Lateral two-thirds of the superior nuchal line and the mastoid", "Insertion": "Epicranial aponeurosis", "Action": "Pulls the scalp back; anchors the galea for frontalis", "Nerve": "Posterior auricular branch of the facial nerve"},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "temporoparietalis",
      name: "Temporoparietalis",
      layer: "muscle",
      summary: "A thin, variable sheet above the ear in the temporoparietal fascia, between frontalis and the auricular muscles.",
      relations: ["Lies in the temporoparietal (superficial temporal) fascia, the layer that carries the superficial temporal vessels and, near the arch, the temporal branch"],
      supply: {"Origin": "Temporoparietal fascia above the ear", "Insertion": "Lateral border of the epicranial aponeurosis", "Action": "Tightens the scalp; draws it back", "Nerve": "Temporal branch of the facial nerve"},
      surgical: ["The temporoparietal fascia flap, on the superficial temporal vessels, is a thin, well-vascularised flap for ear and orbital reconstruction.", "Above the zygomatic arch, dissect deep to the temporoparietal fascia (on the deep temporal fascia) to keep the temporal branch safely in the flap."],
      danger: [],
      variations: [],
      refs: ["gray", "seckel"]
    },
    {
      id: "galea",
      name: "Epicranial aponeurosis",
      aka: "Galea aponeurotica",
      layer: "fascia",
      summary: "The galea aponeurotica: the tendon sheet of occipitofrontalis, the third layer of the scalp.",
      relations: ["Scalp layers (SCALP): Skin, Connective tissue (with the vessels), Aponeurosis, Loose areolar tissue, Pericranium", "Continuous with the SMAS of the face and the temporoparietal fascia"],
      supply: {},
      surgical: ["Gaping scalp wounds mean the galea is divided; close it as a separate layer.", "The loose areolar layer beneath it is the plane of scalp flaps and of subgaleal haematoma; emissary veins here let infection reach the dural sinuses."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "orbicularis_oculi",
      name: "Orbicularis oculi",
      layer: "muscle",
      summary: "The sphincter of the eyelids: an orbital part for forceful closure, a palpebral part for blinking and a small lacrimal part that helps tears drain.",
      relations: ["Branches reach it from its lateral and deep side, so a lateral blepharoplasty or lateral canthal incision stays superficial to the muscle laterally"],
      supply: {"Origin": "Medial orbital margin, frontal process of the maxilla and medial palpebral ligament (lacrimal part: posterior lacrimal crest)", "Insertion": "Lateral palpebral raphe and the skin around the orbit", "Action": "Closes the eye (palpebral part gently, orbital part tightly); pumps tears into the lacrimal sac", "Nerve": "Temporal (upper) and zygomatic (lower) branches of the facial nerve"},
      surgical: ["Incomplete eye closure (lagophthalmos) is the most urgent problem in facial palsy: protect the cornea with lubricants and taping, then upper lid loading (gold or platinum weight) or tarsorrhaphy.", "Bell's phenomenon (the eye rolls up on attempted closure) protects the cornea; its absence raises the risk of exposure keratopathy.", "Complete eye closure with effort separates House–Brackmann grade III from grade IV."],
      danger: [],
      variations: [],
      refs: ["gray", "house"]
    },
    {
      id: "corrugator",
      name: "Corrugator supercilii",
      layer: "muscle",
      summary: "A small muscle under frontalis that pulls the eyebrows down and together, making the vertical frown lines.",
      relations: ["The supratrochlear nerve and branches of the supraorbital nerve pass through or beside it"],
      supply: {"Origin": "Medial end of the superciliary arch", "Insertion": "Skin of the middle of the eyebrow", "Action": "Draws the brows medially and down; vertical glabellar lines", "Nerve": "Temporal branch (with zygomatic branches) of the facial nerve"},
      surgical: ["A main target for botulinum toxin in the glabella and for resection in brow lifts and migraine surgery, where the supratrochlear nerve must be kept."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "procerus",
      name: "Procerus",
      layer: "muscle",
      summary: "A small muscle over the nasal bones that pulls the skin between the brows down, making horizontal lines over the bridge of the nose.",
      relations: [],
      supply: {"Origin": "Fascia over the nasal bone and upper lateral cartilage", "Insertion": "Skin of the glabella", "Action": "Draws the medial brow down; transverse lines at the root of the nose", "Nerve": "Facial nerve (temporal and buccal branches; variable)"},
      surgical: ["Treated with corrugator for glabellar lines; the glabella is a high-risk area for filler embolism into the supratrochlear and dorsal nasal arteries."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "nasalis",
      name: "Nasalis",
      layer: "muscle",
      summary: "Two parts on the nose: a transverse part that compresses the nostril and an alar part that flares it.",
      relations: [],
      supply: {"Origin": "Maxilla above the incisors and canine", "Insertion": "Aponeurosis over the nasal dorsum (transverse part) and the alar cartilage (alar part)", "Action": "Compresses or flares the nostril", "Nerve": "Buccal branch of the facial nerve"},
      surgical: ["Weak alar flaring in facial palsy can add to nasal obstruction through collapse of the external valve on the paralysed side."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "depressor_septi",
      name: "Depressor septi nasi",
      layer: "muscle",
      summary: "A small muscle from the maxilla to the columella that pulls the nasal tip down, most visibly on smiling.",
      relations: [],
      supply: {"Origin": "Incisive fossa of the maxilla", "Insertion": "Columella and the medial crura of the alar cartilages", "Action": "Pulls the tip down and shortens the upper lip on smiling", "Nerve": "Buccal branch of the facial nerve"},
      surgical: ["Dividing or transposing it in rhinoplasty corrects a tip that drops when the patient smiles."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "nasal_cartilages",
      name: "Alar cartilages",
      layer: "cartilage",
      summary: "The major alar (lower lateral) cartilages shape the nasal tip and nostrils and anchor the nasal muscles.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "orbicularis_oris",
      name: "Orbicularis oris",
      layer: "muscle",
      summary: "The sphincter of the mouth, made of fibres from the other lip muscles and its own fibres around the lips, meeting at the modiolus at each corner.",
      relations: ["The labial arteries run deep to it, between the muscle and the mucosa, near the level of the vermilion border"],
      supply: {"Origin": "Modiolus, the incisive fossae of the maxilla and mandible and the other lip muscles", "Insertion": "Skin and mucosa of the lips", "Action": "Closes and purses the lips; speech, eating, whistling", "Nerve": "Buccal and marginal mandibular branches of the facial nerve"},
      surgical: ["In lip repair, line up the vermilion border first and restore the muscle as a continuous layer, or the lip notches and leaks.", "The Karapandzic flap keeps the nerves and vessels of the remaining orbicularis to give a sensate, moving lip; the Abbe flap carries the labial artery across from the other lip."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "levator_labii",
      name: "Levator labii superioris",
      layer: "muscle",
      summary: "Raises and everts the upper lip, from the infraorbital margin above the infraorbital foramen.",
      relations: ["The infraorbital nerve and vessels emerge from the foramen between it (superficial) and levator anguli oris (deep)"],
      supply: {"Origin": "Infraorbital margin of the maxilla, above the infraorbital foramen", "Insertion": "Muscle and skin of the upper lip", "Action": "Raises and everts the upper lip; deepens the nasolabial fold", "Nerve": "Zygomatic and buccal branches of the facial nerve"},
      surgical: [],
      danger: [],
      variations: ["Its medial slip to the ala and lip (levator labii superioris alaeque nasi) is a separate muscle that this model does not show."],
      refs: ["gray"]
    },
    {
      id: "zygomaticus_minor",
      name: "Zygomaticus minor",
      layer: "muscle",
      summary: "Raises the upper lip lateral to levator labii superioris.",
      relations: [],
      supply: {"Origin": "Zygomatic bone, behind the zygomaticomaxillary suture", "Insertion": "Upper lip, lateral to levator labii superioris", "Action": "Raises the upper lip; shows the upper teeth", "Nerve": "Zygomatic and buccal branches of the facial nerve"},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "zygomaticus_major",
      name: "Zygomaticus major",
      layer: "muscle",
      summary: "The main smile muscle, from the cheekbone to the corner of the mouth.",
      relations: ["Its nerve enters the deep surface near the origin, so dissection on its superficial surface is safe", "The facial artery and vein pass deep to it"],
      supply: {"Origin": "Zygomatic bone, in front of the zygomaticotemporal suture", "Insertion": "Modiolus at the angle of the mouth", "Action": "Draws the angle of the mouth up and laterally (smiling)", "Nerve": "Zygomatic and buccal branches, entering its deep surface"},
      surgical: ["Smile reanimation aims to reproduce its line of pull: a free gracilis transfer (on the nerve to masseter or a cross-face nerve graft) or a temporalis lengthening myoplasty.", "A rule from Freilinger: the deepest facial muscles (buccinator, levator anguli oris, mentalis) are supplied on their superficial surface; all the others, including zygomaticus major, on their deep surface."],
      danger: [],
      variations: [],
      refs: ["gray", "freilinger", "zuker"]
    },
    {
      id: "levator_anguli_oris",
      name: "Levator anguli oris",
      layer: "muscle",
      summary: "Raises the corner of the mouth; one of the deepest facial muscles.",
      relations: ["The infraorbital neurovascular bundle lies on its superficial surface, under levator labii superioris"],
      supply: {"Origin": "Canine fossa of the maxilla, below the infraorbital foramen", "Insertion": "Modiolus", "Action": "Raises the angle of the mouth", "Nerve": "Zygomatic and buccal branches, entering its superficial surface"},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "freilinger"]
    },
    {
      id: "risorius",
      name: "Risorius",
      layer: "muscle",
      summary: "A thin, inconstant muscle that draws the corner of the mouth sideways.",
      relations: [],
      supply: {"Origin": "Parotid and masseteric fascia", "Insertion": "Modiolus", "Action": "Retracts the angle of the mouth laterally (grimace)", "Nerve": "Buccal branch of the facial nerve"},
      surgical: [],
      danger: [],
      variations: ["Absent or rudimentary in a substantial minority of people."],
      refs: ["gray"]
    },
    {
      id: "depressor_anguli_oris",
      name: "Depressor anguli oris",
      layer: "muscle",
      summary: "Pulls the corner of the mouth down; supplied by the marginal mandibular branch.",
      relations: [],
      supply: {"Origin": "Oblique line of the mandible", "Insertion": "Modiolus", "Action": "Depresses the angle of the mouth (sadness)", "Nerve": "Marginal mandibular branch of the facial nerve"},
      surgical: ["Marginal mandibular branch injury gives an asymmetric smile and crying face: the corner on that side cannot be pulled down.", "Congenital absence or weakness on one side causes 'asymmetric crying facies' in infants."],
      danger: [],
      variations: [],
      refs: ["gray", "dingman"]
    },
    {
      id: "depressor_labii",
      name: "Depressor labii inferioris",
      layer: "muscle",
      summary: "Pulls the lower lip down and out, showing the lower teeth.",
      relations: [],
      supply: {"Origin": "Oblique line of the mandible, deep and medial to depressor anguli oris", "Insertion": "Skin and mucosa of the lower lip", "Action": "Depresses and everts the lower lip", "Nerve": "Marginal mandibular branch of the facial nerve"},
      surgical: ["The main sign of marginal mandibular palsy is that the lower lip on that side cannot be pulled down to show the teeth.", "Botulinum toxin to the opposite depressor labii inferioris can balance the lower lip after a permanent marginal mandibular palsy."],
      danger: [],
      variations: [],
      refs: ["gray", "dingman"]
    },
    {
      id: "mentalis",
      name: "Mentalis",
      layer: "muscle",
      summary: "Raises and protrudes the lower lip and wrinkles the chin (pouting); the only elevator of the lower lip.",
      relations: [],
      supply: {"Origin": "Incisive fossa of the mandible", "Insertion": "Skin of the chin", "Action": "Raises and protrudes the lower lip; wrinkles the chin", "Nerve": "Marginal mandibular branch, entering its superficial surface"},
      surgical: ["After genioplasty or a lower vestibular incision, resuspend mentalis, or the chin soft tissue sags ('witch's chin') and the lower teeth show.", "An intact mentalis tells a true marginal mandibular palsy from 'pseudo-paralysis' due to cervical branch (platysma) injury, which recovers."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "platysma",
      name: "Platysma",
      layer: "muscle",
      summary: "A thin sheet from the upper chest over the neck to the mandible and the corner of the mouth; it helps depress the lower lip and jaw.",
      relations: ["The marginal mandibular branch lies deep to platysma but superficial to the facial vessels"],
      supply: {"Origin": "Fascia over the upper pectoralis major and deltoid", "Insertion": "Lower border of the mandible, the modiolus and the lower lip", "Action": "Tenses the neck skin; helps pull the lower lip and mouth corner down", "Nerve": "Cervical branch of the facial nerve"},
      surgical: ["Neck dissection flaps are raised deep to platysma (subplatysmal), carrying the marginal mandibular branch up with the flap.", "Cervical branch injury weakens the lower lip on that side for a while (pseudo-paralysis), but mentalis still works."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "masseter",
      name: "Masseter",
      layer: "context",
      summary: "The superficial muscle of chewing over the ramus. Its nerve (from V3) is a strong motor donor for facial reanimation.",
      relations: ["The parotid duct runs across its surface and turns in at its anterior border", "The buccal branches cross it with the duct"],
      supply: {},
      surgical: ["Nerve-to-masseter transfer gives powerful, fast reinnervation of a free gracilis or of the facial nerve; patients learn to smile by biting at first.", "The nerve is found about 1 cm below the zygomatic arch and 3 cm in front of the tragus, deep within the muscle (Zuker's point)."],
      danger: [],
      variations: [],
      refs: ["gray", "zuker"]
    },
    {
      id: "temporalis",
      name: "Temporalis",
      layer: "context",
      summary: "A muscle of chewing that fills the temporal fossa. Moving its insertion (lengthening temporalis myoplasty) is a one-stage smile reanimation.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "parotid",
      name: "Parotid gland",
      layer: "gland",
      summary: "The facial nerve divides inside the parotid, so its branches fan out from the front border of the gland to the facial muscles.",
      relations: [],
      supply: {},
      surgical: ["See the parotid module for the trunk landmarks (tragal pointer, posterior belly of digastric, tympanomastoid suture)."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "parotid_duct",
      name: "Parotid duct",
      aka: "Stensen's duct",
      layer: "gland",
      summary: "Stensen's duct crosses masseter about 1 cm below the zygomatic arch, then pierces buccinator to open opposite the upper second molar.",
      relations: ["Surface marking: the middle third of a line from the lower border of the tragus to the midpoint between the nasal ala and the upper vermilion border", "A buccal branch of the facial nerve runs with it"],
      supply: {},
      surgical: ["A cheek laceration along this line can divide both the duct and the buccal branch: check saliva flow from the papilla and the patient's smile before closing."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_trunk",
      name: "Facial nerve trunk",
      layer: "nerve",
      summary: "Leaves the stylomastoid foramen and enters the parotid, where it divides at the pes anserinus into an upper (temporofacial) and a lower (cervicofacial) division.",
      relations: ["Branching patterns vary widely (Davis types I–VI); the zygomatic and buccal branches usually interconnect, the temporal and marginal mandibular branches rarely do"],
      supply: {},
      surgical: ["Because the middle branches interconnect, injuries there often recover; the temporal and marginal mandibular branches have little cross-supply, so their injuries tend to be permanent."],
      danger: [],
      variations: [],
      refs: ["gray", "davis"]
    },
    {
      id: "temporal_branch",
      name: "Temporal (frontal) branch",
      aka: "Frontal branch",
      layer: "nerve",
      summary: "Crosses the zygomatic arch to supply frontalis, the upper orbicularis oculi and corrugator. It is the branch most at risk in temporal and brow surgery.",
      course: [
        { key: "pes", label: "Leaves the upper division", text: "At the front of the parotid, below the zygomatic arch." },
        { key: "arch", label: "Crosses the zygomatic arch", text: "Usually as 2–4 rami over its middle third, on the periosteum, under the SMAS and temporoparietal fascia." },
        { key: "temple", label: "Through the temple", text: "In or just under the temporoparietal fascia, along Pitanguy's line to frontalis about 1.5 cm above the lateral eyebrow. Z-Anatomy's branch stops in the temple." }
      ],
      relations: ["Pitanguy's line: from 0.5 cm below the tragus to 1.5 cm above the lateral end of the eyebrow"],
      supply: {},
      surgical: ["Above the arch, dissect deep to the temporoparietal fascia (on the deep temporal fascia, or under its superficial layer) so the nerve stays protected in the flap.", "Injury leaves a drooping brow and no forehead lines on that side; it rarely recovers."],
      danger: ["Seckel's danger zone 2: where the branch crosses the zygomatic arch, under thin tissue."],
      variations: [],
      refs: ["pitanguy", "seckel"]
    },
    {
      id: "zygomatic_branch",
      name: "Zygomatic branch",
      layer: "nerve",
      summary: "Runs forward across the cheekbone to the lower orbicularis oculi and the zygomaticus and lip elevators. It is vital for eye closure.",
      course: [
        { key: "pes", label: "Leaves the upper division", text: "At the front border of the parotid." },
        { key: "zygomaticus", label: "Under zygomaticus major", text: "Reaches the elevators of the lip from their deep surface." },
        { key: "orbicularis", label: "To the lower orbicularis oculi", text: "Enters from the lateral and deep side; essential for closing the eye." },
        { key: "end", label: "Lateral to the eye", text: "Its terminal twigs." }
      ],
      relations: [],
      supply: {},
      surgical: ["Joins the buccal branch in most people, so partial injuries often recover.", "Selective neurectomy or chemodenervation targets its twigs in synkinesis."],
      danger: [],
      variations: [],
      refs: ["davis", "seckel"]
    },
    {
      id: "buccal_branch",
      name: "Buccal branch",
      layer: "nerve",
      summary: "Runs forward with the parotid duct to the cheek and upper lip muscles, buccinator and orbicularis oris.",
      course: [
        { key: "pes", label: "Leaves the parotid", text: "Several rami from both divisions." },
        { key: "duct", label: "With the parotid duct", text: "Across masseter, close to the duct." },
        { key: "zygomaticus", label: "Under zygomaticus major", text: "To the elevators of the upper lip." },
        { key: "orbicularis", label: "To orbicularis oris", text: "And to buccinator, which it supplies from the superficial surface." },
        { key: "end", label: "Upper lip and nose", text: "Terminal twigs to nasalis and the upper lip." }
      ],
      relations: [],
      supply: {},
      surgical: ["The buccal branch of the facial nerve is motor; the buccal nerve of V3 is sensory to the cheek mucosa. Do not confuse them.", "Cheek lacerations in front of the anterior border of masseter usually do not need nerve repair: the branches are small and interconnected."],
      danger: [],
      variations: [],
      refs: ["davis", "seckel"]
    },
    {
      id: "mmn",
      name: "Marginal mandibular branch",
      aka: "Mandibular branch",
      layer: "nerve",
      summary: "Runs along or below the lower border of the mandible, under platysma and over the facial vessels, to the lower lip depressors and mentalis.",
      course: [
        { key: "pes", label: "Leaves the lower division", text: "At the lower pole of the parotid, behind the angle of the mandible." },
        { key: "vessels", label: "At the lower border of the mandible", text: "Crosses superficial to the facial vein and artery at the front of masseter, then turns up to the lower lip muscles." }
      ],
      relations: ["Dingman and Grabb: behind the facial artery it ran above the lower border of the mandible in 81% of sides and up to 1 cm below it in 19%; in front of the artery it was always above the border", "It hangs lower with the neck extended and with age"],
      supply: {},
      surgical: ["In submandibular and neck surgery, incise 3–4 cm below the mandible and raise the fascia over the gland, or tie the facial vein low and reflect it up (Hayes Martin), to carry the nerve out of harm's way.", "Injury makes the lower lip unable to depress on that side; recovery is poor because it has few connections with other branches."],
      danger: ["Seckel's danger zone 3: where it crosses the facial vessels at the front of masseter."],
      variations: [],
      refs: ["dingman", "seckel"]
    },
    {
      id: "cervical_branch",
      name: "Cervical branch",
      layer: "nerve",
      summary: "Leaves the lower pole of the parotid and runs down under platysma to supply it.",
      course: [
        { key: "pes", label: "Leaves the lower division", text: "At the lower pole of the parotid." },
        { key: "platysma", label: "Into platysma", text: "On its deep surface in the upper neck." }
      ],
      relations: [],
      supply: {},
      surgical: ["Injury causes a temporary lower lip weakness (pseudo-paralysis) that can mimic marginal mandibular palsy; mentalis still works."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "posterior_auricular_nerve",
      name: "Posterior auricular nerve",
      layer: "nerve",
      summary: "The first extracranial branch: leaves the trunk just below the stylomastoid foramen to supply occipitalis and the auricular muscles.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "mental_nerve",
      name: "Mental nerve",
      layer: "nerve",
      summary: "The sensory end of the inferior alveolar nerve (V3), leaving the mental foramen below the second premolar to supply the lower lip and chin.",
      relations: ["The mental foramen lies below the second premolar (or between the premolars), midway up the body of the mandible in adults"],
      supply: {},
      surgical: ["At risk in genioplasty, lower vestibular incisions and mandibular fracture repair; injury numbs the lower lip, which patients notice when drinking."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_artery",
      name: "Facial artery",
      layer: "artery",
      summary: "Crosses the mandible at the front of masseter, then winds tortuously to the corner of the mouth and up beside the nose to end as the angular artery at the medial canthus.",
      course: [
        { key: "mandible", label: "Over the lower border of the mandible", text: "At the front edge of masseter, where its pulse can be felt; the vein lies behind it." },
        { key: "inferior_labial", label: "Inferior labial artery", text: "Runs into the lower lip deep to orbicularis oris." },
        { key: "superior_labial", label: "Superior labial artery", text: "Runs into the upper lip; the two labial arteries join across the midline." },
        { key: "angular", label: "Angular artery", text: "Ends at the medial canthus, joining the dorsal nasal branch of the ophthalmic artery." }
      ],
      relations: ["Deep to platysma, risorius and zygomaticus major; superficial to buccinator and levator anguli oris"],
      supply: {},
      surgical: ["The facial artery musculomucosal (FAMM) flap and the nasolabial flap are based on it.", "Filler injected into the nasolabial fold, nasal sidewall or glabella can embolise backwards through the angular and dorsal nasal arteries into the ophthalmic artery and cause blindness."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "labial_arteries",
      name: "Superior and inferior labial arteries",
      layer: "artery",
      summary: "Branches of the facial artery that ring the mouth deep to orbicularis oris, between the muscle and the mucosa.",
      relations: [],
      supply: {},
      surgical: ["The Abbe (lip switch) flap is carried on the labial artery of the opposite lip.", "Pressing both sides of a lip wound controls bleeding from the labial arteries."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "transverse_facial",
      name: "Transverse facial artery",
      layer: "artery",
      summary: "A branch of the superficial temporal artery that runs forward across masseter just above the parotid duct.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "supraorbital_arteries",
      name: "Supraorbital, supratrochlear and frontal branch arteries",
      layer: "artery",
      summary: "The vessels of the forehead: supraorbital and supratrochlear from the ophthalmic (internal carotid), and the frontal branch of the superficial temporal (external carotid).",
      relations: [],
      supply: {},
      surgical: ["The paramedian forehead flap is based on the supratrochlear artery, which runs about 1.7–2.2 cm from the midline at the brow.", "Glabellar filler injections risk embolism through these vessels into the ophthalmic artery."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_vein",
      name: "Facial vein",
      layer: "vein",
      summary: "Runs behind the facial artery in a straighter line, from the angular vein at the medial canthus to the common facial vein below the mandible.",
      relations: [],
      supply: {},
      surgical: ["Its connections to the cavernous sinus, through the ophthalmic veins and the deep facial vein to the pterygoid plexus, explain the 'danger triangle' of the face: infection there can spread to the cavernous sinus."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "skull",
      name: "Skull vault and temporal bones",
      layer: "bone",
      summary: "Frontal, parietal, temporal, occipital and sphenoid bones, for orientation.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_skeleton",
      name: "Maxilla, zygomatic and nasal bones",
      layer: "bone",
      summary: "The bones that most facial muscles arise from: the zygomatic bone for the zygomatic muscles, the maxilla for the lip elevators and nasalis.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "mandible",
      name: "Mandible and teeth",
      layer: "bone",
      summary: "Origin of the lower lip depressors and mentalis; the mental foramen lies below the second premolar.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "buccinator",
      name: "Buccinator",
      layer: "muscle",
      summary: "The muscle of the cheek, from the pterygomandibular raphe and the alveolar processes opposite the molars into the corner of the mouth. Not shown in the 3D model (Z-Anatomy has no buccinator).",
      relations: ["Pierced by the parotid duct opposite the upper second molar", "The buccal nerve of V3 (sensory) passes through it to the mucosa"],
      supply: {"Origin": "Pterygomandibular raphe and the outer alveolar processes of the maxilla and mandible opposite the molars", "Insertion": "Modiolus and orbicularis oris", "Action": "Keeps the cheek against the teeth during chewing; blowing", "Nerve": "Buccal branch of the facial nerve, entering its superficial surface"},
      surgical: ["Weakness lets food collect in the cheek after facial palsy.", "The buccinator myomucosal flap (on the buccal or facial artery) is used for palate and floor-of-mouth repair."],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  procedure: {
    "title": "Bedside facial nerve examination and House–Brackmann grading",
    "atRisk": [{"id": "temporal_branch", "why": "Crosses the zygomatic arch under thin tissue: brow droop if cut in facial or temporal surgery"}, {"id": "mmn", "why": "Can loop below the mandible: lower-lip asymmetry if cut in neck surgery"}, {"id": "zygomatic_branch", "why": "Supplies orbicularis oculi: eye closure and corneal protection"}, {"id": "facial_trunk", "why": "Leaves the stylomastoid foramen: every branch is lost if the trunk is cut"}],
    "intro": "Step through the examination. Each step lights up the muscles being tested and the branch that supplies them.",
    "complicationsTitle": "Pitfalls",
    "steps": [
      {
        "title": "Look at rest",
        "text": "Compare the two sides at rest: brow height, palpebral fissure width, nasolabial fold, and the corner of the mouth. A flat nasolabial fold and a lower mouth corner suggest weakness on that side.",
        "show": [
          "muscle",
          "bone",
          "cartilage"
        ],
        "focus": [
          "orbicularis_oculi",
          "zygomaticus_major",
          "orbicularis_oris"
        ]
      },
      {
        "title": "Raise the eyebrows",
        "text": "Frontalis, temporal branch. If the forehead moves on both sides but the lower face is weak, the lesion is central (upper motor neurone).",
        "show": [
          "muscle",
          "nerve",
          "bone"
        ],
        "focus": [
          "frontalis",
          "temporal_branch"
        ]
      },
      {
        "title": "Close the eyes tightly",
        "text": "Orbicularis oculi, temporal and zygomatic branches. Note whether the eye closes completely, with or without effort, and whether Bell's phenomenon is seen.",
        "show": [
          "muscle",
          "nerve",
          "bone"
        ],
        "focus": [
          "orbicularis_oculi",
          "zygomatic_branch",
          "temporal_branch"
        ]
      },
      {
        "title": "Frown and wrinkle the nose",
        "text": "Corrugator and procerus (temporal branch), nasalis (buccal branch).",
        "show": [
          "muscle",
          "nerve",
          "bone",
          "cartilage"
        ],
        "focus": [
          "corrugator",
          "procerus",
          "nasalis"
        ]
      },
      {
        "title": "Smile and show the teeth",
        "text": "Zygomaticus major and minor, levator labii superioris, levator anguli oris and risorius: zygomatic and buccal branches.",
        "show": [
          "muscle",
          "nerve",
          "bone"
        ],
        "focus": [
          "zygomaticus_major",
          "levator_labii",
          "levator_anguli_oris",
          "buccal_branch"
        ]
      },
      {
        "title": "Puff out the cheeks and whistle",
        "text": "Orbicularis oris and buccinator: buccal and marginal mandibular branches. Air escaping from one corner shows weakness.",
        "show": [
          "muscle",
          "nerve",
          "bone"
        ],
        "focus": [
          "orbicularis_oris",
          "buccal_branch",
          "mmn"
        ]
      },
      {
        "title": "Show the lower teeth",
        "text": "Depressor labii inferioris and depressor anguli oris: marginal mandibular branch. Ask the patient to pout too: mentalis works in cervical branch 'pseudo-paralysis' but not in true marginal mandibular palsy.",
        "show": [
          "muscle",
          "nerve",
          "bone"
        ],
        "focus": [
          "depressor_labii",
          "depressor_anguli_oris",
          "mentalis",
          "mmn"
        ]
      },
      {
        "title": "Tense the neck",
        "text": "Platysma: cervical branch. Pull the corners of the mouth down hard to make the neck bands stand out.",
        "show": [
          "muscle",
          "nerve",
          "bone"
        ],
        "focus": [
          "platysma",
          "cervical_branch"
        ]
      },
      {
        "title": "Grade it",
        "text": "House–Brackmann: I normal; II slight weakness, complete eye closure with minimal effort; III obvious but not disfiguring asymmetry, complete eye closure with effort; IV obvious, disfiguring weakness, incomplete eye closure, no forehead movement; V only barely perceptible movement; VI no movement. Record synkinesis, and protect the eye if closure is incomplete.",
        "show": [
          "muscle",
          "nerve",
          "bone",
          "gland"
        ],
        "focus": [
          "facial_trunk",
          "orbicularis_oculi",
          "frontalis"
        ]
      }
    ],
    "complications": [
      "Grading only the worst region: House–Brackmann is a global grade, so record each region too (or use the Sunnybrook or eFACE scale) when following recovery.",
      "Missing incomplete eye closure: check corneal exposure and Bell's phenomenon and start eye protection the same day.",
      "Calling a cervical branch injury a marginal mandibular palsy: test mentalis.",
      "Mistaking synkinesis (eye closing on smiling) for recovery in the wrong branch; it follows aberrant regeneration after severe injury.",
      "Forgetting the other nerves: hearing, taste (chorda tympani) and lacrimation help localise the lesion along the nerve's course."
    ],
    "refs": [
      "house",
      "seckel",
      "scottbrown"
    ]
  },

  figures: [{"id": "fig-facial-nerve", "title": "Right face from the side: facial nerve branches and the muscles they supply, with Pitanguy's line and the parotid duct", "svg": "facialNerveMuscles"}],

  quiz: [
    {
      "q": "Which branch of the facial nerve supplies frontalis?",
      "options": [
        "Zygomatic",
        "Temporal (frontal)",
        "Buccal",
        "Posterior auricular"
      ],
      "answer": 1,
      "explain": "The temporal branch crosses the zygomatic arch to frontalis, the upper orbicularis oculi and corrugator."
    },
    {
      "q": "A patient cannot pull the right lower lip down after a submandibular gland excision but can pout normally. Which nerve is injured?",
      "options": [
        "Cervical branch",
        "Marginal mandibular branch",
        "Mental nerve",
        "Buccal branch"
      ],
      "answer": 1,
      "explain": "Depressor labii inferioris is supplied by the marginal mandibular branch. Pouting uses mentalis, which can be spared by a partial injury; a cervical branch injury causes a milder, temporary weakness with mentalis intact."
    },
    {
      "q": "Which muscle is supplied on its superficial surface?",
      "options": [
        "Zygomaticus major",
        "Orbicularis oculi",
        "Levator anguli oris",
        "Frontalis"
      ],
      "answer": 2,
      "explain": "The deepest facial muscles (buccinator, levator anguli oris and mentalis) are supplied on their superficial surface; the others on their deep surface."
    },
    {
      "q": "Pitanguy's line runs from:",
      "options": [
        "The tragus to the corner of the mouth",
        "0.5 cm below the tragus to 1.5 cm above the lateral eyebrow",
        "The angle of the mandible to the chin",
        "The mastoid to the lateral canthus"
      ],
      "answer": 1,
      "explain": "It marks the course of the temporal branch across the arch and temple."
    },
    {
      "q": "What separates House–Brackmann grade III from grade IV?",
      "options": [
        "Forehead movement",
        "Complete eye closure with effort",
        "Synkinesis",
        "Asymmetry at rest"
      ],
      "answer": 1,
      "explain": "In grade III the eye still closes completely with effort; in grade IV it does not."
    },
    {
      "q": "Filler embolism causing blindness after a nasolabial fold injection travels through which artery?",
      "options": [
        "Transverse facial",
        "Angular, into the ophthalmic",
        "Inferior labial",
        "Superficial temporal"
      ],
      "answer": 1,
      "explain": "The angular artery joins the dorsal nasal branch of the ophthalmic artery at the medial canthus, so pressure can push filler back into the ophthalmic and central retinal arteries."
    }
  ],

  references: {
    "gray": "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the face and scalp.",
    "pitanguy": "Pitanguy I, Ramos AS. The frontal branch of the facial nerve: the importance of its variations in face lifting. Plast Reconstr Surg. 1966;38(4):352–356.",
    "dingman": "Dingman RO, Grabb WC. Surgical anatomy of the mandibular ramus of the facial nerve based on the dissection of 100 facial halves. Plast Reconstr Surg Transplant Bull. 1962;29:266–272.",
    "davis": "Davis RA, Anson BJ, Budinger JM, Kurth LR. Surgical anatomy of the facial nerve and parotid gland based upon a study of 350 cervicofacial halves. Surg Gynecol Obstet. 1956;102(4):385–412.",
    "freilinger": "Freilinger G, Gruber H, Happak W, Pechmann U. Surgical anatomy of the mimic muscle system and the facial nerve: importance for reconstructive and aesthetic surgery. Plast Reconstr Surg. 1987;80(5):686–690.",
    "mitz": "Mitz V, Peyronie M. The superficial musculo-aponeurotic system (SMAS) in the parotid and cheek area. Plast Reconstr Surg. 1976;58(1):80–88.",
    "seckel": "Seckel BR. Facial Danger Zones: Avoiding Nerve Injury in Facial Plastic Surgery. 2nd ed. Thieme; 2010.",
    "house": "House JW, Brackmann DE. Facial nerve grading system. Otolaryngol Head Neck Surg. 1985;93(2):146–147.",
    "zuker": "Zuker RM, Goldberg CS, Manktelow RT. Facial animation in children with Möbius syndrome after segmental gracilis muscle transplant. Plast Reconstr Surg. 2000;106(1):1–8.",
    "scottbrown": "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Facial nerve chapters."
  }
};
