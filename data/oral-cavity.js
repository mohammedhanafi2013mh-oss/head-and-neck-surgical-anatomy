// Content for the oral cavity, floor of mouth, palate and fauces (both sides;
// courses traced on the right). Each structure id matches a mesh id in
// data/oral-cavity-meshes.js; the model shows the mouth open.
// "course" lists the waypoints of a traced structure; "incision" on a surgery
// step names an entry in "incisions" drawn on the model at that step.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.oral_cavity = {
  id: "oral_cavity",
  title: "Oral cavity",
  subtitle: "Tongue, floor of mouth, hard and soft palate, tonsillar pillars and tonsils, with the mouth open; nerves, ducts and vessels traced on the right",

  overview: {
    "intro": "The oral cavity runs from the lips to the junction of the hard and soft palate above and the circumvallate papillae of the tongue below, with the anterior tonsillar pillars at the sides. Behind it is the oropharynx. Its subsites matter because they behave differently: cancers of the oral tongue and floor of mouth spread to the neck early, those of the alveolar ridge and retromolar trigone invade bone early. The floor of the mouth is a small space packed with structures that must be found and kept in surgery: the lingual nerve, the submandibular duct, the hypoglossal nerve and the lingual vessels, arranged around hyoglossus. The model shows the mouth open, as you would see it: the tongue, the hard palate with its rugae, the soft palate and uvula, and the tonsils between the anterior and posterior pillars, with the palatal muscles and the auditory tubes above. Structures are shown on both sides, and the lingual nerve, hypoglossal nerve, submandibular duct and lingual artery can be traced on the right.",
    "boundaries": [
      {
        "label": "Front",
        "text": "The lips, from the vermilion border inwards"
      },
      {
        "label": "Roof",
        "text": "Hard palate; the junction with the soft palate is the back limit"
      },
      {
        "label": "Floor",
        "text": "Mylohyoid and the floor-of-mouth mucosa, with the oral tongue on top"
      },
      {
        "label": "Sides",
        "text": "The cheeks: buccal mucosa over buccinator"
      },
      {
        "label": "Back",
        "text": "Anterior tonsillar pillars (palatoglossal arches) and the circumvallate papillae: behind them is the oropharynx"
      }
    ],
    "contents": [
      "Subsites (AJCC): mucosal lip, buccal mucosa, upper and lower alveolar ridges, retromolar trigone, floor of mouth, hard palate, oral (anterior two-thirds) tongue",
      "Floor of mouth: sublingual glands, submandibular ducts, lingual nerves, hypoglossal nerves, lingual vessels, the deep parts of the submandibular glands",
      "Muscles: intrinsic tongue muscles, genioglossus, hyoglossus, styloglossus, palatoglossus, geniohyoid, mylohyoid",
      "Fauces (the gateway to the oropharynx): soft palate and uvula, palatoglossal and palatopharyngeal arches, palatine tonsils on the superior constrictor; levator and tensor veli palatini from the skull base and auditory tube",
      "Nerves: lingual (sensation; chorda tympani for taste), hypoglossal (motor), inferior alveolar and mental, greater palatine and nasopalatine",
      "Arteries: lingual, facial (submental, ascending palatine), greater palatine, inferior alveolar"
    ],
    "keyPoints": [
      "AJCC 8 adds depth of invasion to the T stage of oral cancer: T1 ≤2 cm and DOI ≤5 mm; T2 ≤2 cm with DOI 5–10 mm, or 2–4 cm with DOI ≤10 mm; T3 >4 cm or DOI >10 mm.",
      "Elective neck dissection improves survival in early (T1–T2, clinically N0) oral cancer (D'Cruz 2015); depth of invasion over about 3–4 mm is the usual trigger.",
      "Lateral tongue cancers can skip levels I–II and appear first in level III or IV, so the neck dissection for them usually covers levels I–III or I–IV.",
      "Aim for a 1 cm clinical margin: tissue shrinks after resection, and a clear histological margin is ≥5 mm (1–5 mm close, <1 mm involved).",
      "Around hyoglossus: the lingual nerve, submandibular duct and hypoglossal nerve are superficial (lateral); the lingual artery is deep (medial).",
      "The lingual nerve loops under the submandibular duct from lateral to medial near the second molar; find it before cutting near the duct.",
      "All palatal muscles are supplied by the vagus (pharyngeal plexus) except tensor veli palatini (V3); all tongue muscles by the hypoglossal nerve except palatoglossus (vagus).",
      "A ranula comes from the sublingual gland: excise the gland, not just the cyst."
    ],
    "refs": [
      "gray",
      "ajcc",
      "dcruz",
      "byers",
      "rcpath"
    ]
  },

  layers: [{"id": "muscle", "label": "Tongue & floor muscles", "defaultOn": true}, {"id": "pharynx", "label": "Soft palate, pillars & tonsils", "defaultOn": true}, {"id": "mucosa", "label": "Gingiva & hard palate", "defaultOn": true}, {"id": "gland", "label": "Glands", "defaultOn": true}, {"id": "duct", "label": "Salivary ducts", "defaultOn": true}, {"id": "nerve", "label": "Nerves", "defaultOn": true}, {"id": "artery", "label": "Arteries", "defaultOn": true}, {"id": "vein", "label": "Veins", "defaultOn": false}, {"id": "bone", "label": "Jaws, teeth & hyoid", "defaultOn": true}, {"id": "context", "label": "Lips & pterygoid", "defaultOn": false}, {"id": "pathology", "label": "Ranula", "defaultOn": false}],

  structures: [
    {
      id: "tongue",
      name: "Tongue",
      layer: "muscle",
      summary: "A muscular organ of intrinsic and extrinsic muscles. The oral (anterior two-thirds) tongue, in front of the circumvallate papillae, is part of the oral cavity; the base is oropharynx.",
      relations: ["A midline fibrous septum divides the two halves; few vessels cross it"],
      supply: {"Motor": "Hypoglossal nerve (all muscles except palatoglossus)", "General sensation": "Lingual nerve (V3), anterior two-thirds; glossopharyngeal, posterior third", "Taste": "Chorda tympani (VII), anterior two-thirds; glossopharyngeal, posterior third", "Blood": "Lingual artery (deep lingual branch)", "Lymph": "Tip to submental nodes (both sides); lateral tongue to submandibular and level II–III nodes, sometimes straight to level IV"},
      surgical: ["The lateral border is the commonest site of oral cancer.", "Depth of invasion (DOI), not thickness, sets the T stage (AJCC 8) and the risk of neck metastasis: elective neck dissection is usual once DOI exceeds about 3–4 mm.", "Small defects heal well by secondary intention; larger ones are reconstructed with a thin free flap (radial forearm) to keep the tongue mobile."],
      danger: [],
      variations: [],
      refs: ["gray", "ajcc", "dcruz", "byers"]
    },
    {
      id: "genioglossus",
      name: "Genioglossus",
      layer: "muscle",
      summary: "The fan-shaped extrinsic muscle that protrudes the tongue and keeps it forward off the airway.",
      relations: [],
      supply: {"Origin": "Superior genial tubercle (mental spine) of the mandible", "Insertion": "Whole length of the tongue and the body of the hyoid", "Action": "Protrudes the tongue; depresses its centre", "Nerve": "Hypoglossal nerve"},
      surgical: ["With a hypoglossal palsy the protruded tongue deviates towards the weak side, pushed by the healthy genioglossus.", "Its forward pull keeps the airway open; genioglossus advancement is one operation for obstructive sleep apnoea, and after an anterior segmental mandibulectomy losing its attachment can let the tongue fall back."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hyoglossus",
      name: "Hyoglossus",
      layer: "muscle",
      summary: "A flat quadrilateral muscle on the side of the tongue. It is the key landmark of the floor of mouth: important structures lie on each side of it.",
      relations: ["Lateral (superficial) to it, from above down: lingual nerve, submandibular duct and deep part of the gland, hypoglossal nerve with its veins", "Medial (deep) to it: lingual artery, glossopharyngeal nerve and stylohyoid ligament"],
      supply: {"Origin": "Greater horn and body of the hyoid", "Insertion": "Side of the tongue", "Action": "Depresses and retracts the tongue", "Nerve": "Hypoglossal nerve"},
      surgical: ["Because the lingual artery is deep to hyoglossus and the hypoglossal nerve superficial, the artery can be tied safely by splitting the muscle above the hyoid, below the nerve."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "geniohyoid",
      name: "Geniohyoid",
      layer: "muscle",
      summary: "A narrow muscle on the upper surface of mylohyoid, beside the midline.",
      relations: [],
      supply: {"Origin": "Inferior genial tubercle of the mandible", "Insertion": "Body of the hyoid", "Action": "Pulls the hyoid forward and up; helps open the jaw", "Nerve": "C1 fibres running with the hypoglossal nerve"},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "mylohyoid",
      name: "Mylohyoid",
      layer: "muscle",
      summary: "The muscular floor of the mouth, slung between the two halves of the mandible. It separates the sublingual space above from the submandibular space below.",
      relations: ["The submandibular gland wraps round its free posterior border, with a deep part above it and a superficial part below"],
      supply: {"Origin": "Mylohyoid line of the mandible", "Insertion": "Median raphe and the body of the hyoid", "Action": "Raises the floor of the mouth and the hyoid in swallowing", "Nerve": "Nerve to mylohyoid (inferior alveolar, V3)"},
      surgical: ["The mylohyoid line decides where dental infection spreads: roots above it (premolars, first molar) drain to the sublingual space, roots below it (second and third molars) to the submandibular space.", "A plunging ranula passes through a gap in mylohyoid or round its back edge into the neck."],
      danger: [],
      variations: [],
      refs: ["gray", "harrison"]
    },
    {
      id: "digastric_ant",
      name: "Anterior bellies of digastric",
      layer: "muscle",
      summary: "The two anterior bellies bound the submental triangle, which holds the level IA nodes.",
      relations: [],
      supply: {"Origin": "Digastric fossa of the mandible", "Insertion": "Intermediate tendon, slung to the hyoid", "Action": "Opens the jaw; raises the hyoid", "Nerve": "Nerve to mylohyoid"},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "soft_palate",
      name: "Soft palate and uvula",
      layer: "pharynx",
      summary: "The mobile back part of the palate, hanging down and back from the hard palate with the uvula in the middle of its free edge. At rest it leaves the nasopharynx open; in swallowing and speech levator veli palatini lifts it against the back wall of the pharynx. Its junction with the hard palate is the back of the oral cavity.",
      relations: [],
      supply: {"Muscles": "Levator veli palatini, palatoglossus, palatopharyngeus and musculus uvulae (vagus via the pharyngeal plexus); tensor veli palatini (V3)", "Blood": "Greater and lesser palatine, ascending palatine (facial) and ascending pharyngeal arteries"},
      surgical: ["Resecting the soft palate causes nasal regurgitation and hypernasal speech unless it is reconstructed or closed with an obturator."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "tonsils",
      name: "Palatine tonsils",
      layer: "pharynx",
      summary: "In the tonsillar fossa between the palatoglossal and palatopharyngeal arches, at the boundary between the oral cavity and the oropharynx.",
      relations: ["Between the anterior (palatoglossal) and posterior (palatopharyngeal) pillars", "Bed: superior constrictor; the glossopharyngeal nerve lies in its lower part", "The internal carotid artery is about 1.5–2.5 cm behind and lateral"],
      supply: {},
      surgical: ["Main blood supply: tonsillar branch of the facial artery; bleeding after tonsillectomy often comes from the external palatine (paratonsillar) vein.", "The tonsils are oropharynx, not oral cavity: their cancers are staged and treated with the oropharynx, often HPV-related."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sublingual",
      name: "Sublingual gland",
      layer: "gland",
      summary: "The smallest major salivary gland, lying in the sublingual fossa of the mandible above mylohyoid, under the floor-of-mouth mucosa.",
      relations: ["Opens by 8–20 small ducts (of Rivinus) on the sublingual fold; some join to form a duct (of Bartholin) into the submandibular duct", "Medial to it: the submandibular duct and lingual nerve, then genioglossus"],
      supply: {},
      surgical: ["A ranula is a mucus extravasation cyst from the sublingual gland. Removing the gland through the mouth cures it; marsupialisation alone often recurs.", "When excising the gland, find and keep the lingual nerve and the submandibular duct on its deep side."],
      danger: [],
      variations: [],
      refs: ["gray", "harrison"]
    },
    {
      id: "smg",
      name: "Submandibular glands",
      layer: "gland",
      summary: "Their deep parts reach above mylohyoid into the floor of the mouth, where the duct begins.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "wharton",
      name: "Submandibular duct",
      aka: "Wharton's duct",
      layer: "duct",
      summary: "Wharton's duct, about 5 cm long, runs forward in the floor of the mouth between the sublingual gland and genioglossus to the sublingual caruncle beside the frenulum.",
      course: [
        { key: "gland", label: "Leaves the deep part of the gland", text: "Above mylohyoid, on hyoglossus." },
        { key: "lingual", label: "Crossed by the lingual nerve", text: "The nerve loops under the duct from lateral to medial, near the second molar." },
        { key: "caruncle", label: "Sublingual caruncle", text: "Opens on the papilla beside the lingual frenulum." }
      ],
      relations: [],
      supply: {},
      surgical: ["About 80% of salivary stones form in the submandibular system. Stones in the front of the duct can be removed through the mouth by incising over the duct, finding the lingual nerve first further back.", "Floor-of-mouth resections divide the duct: re-site it (sialodochoplasty) or remove the gland to avoid obstruction."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "lingual_nerve",
      name: "Lingual nerve",
      layer: "nerve",
      summary: "The V3 branch that gives general sensation to the anterior two-thirds of the tongue and floor of the mouth; it carries chorda tympani fibres for taste and to the submandibular ganglion.",
      course: [
        { key: "itf", label: "Enters from the infratemporal fossa", text: "Between medial pterygoid and the ramus." },
        { key: "molar", label: "Beside the third molar", text: "Directly under the mucosa against the lingual cortex: the danger point in third molar surgery." },
        { key: "duct", label: "Loops under the duct", text: "From lateral, under, to medial of the submandibular duct; the submandibular ganglion hangs from it here." },
        { key: "tongue", label: "Into the tongue", text: "Breaks up into branches on the side of the tongue." }
      ],
      relations: [],
      supply: {},
      surgical: ["Injury causes numbness and loss of taste on the anterior tongue on that side and tongue biting.", "In floor-of-mouth surgery, find it behind and follow it forward before dividing anything near the duct."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hypoglossal",
      name: "Hypoglossal nerve",
      layer: "nerve",
      summary: "The motor nerve of the tongue. In the floor of the mouth it runs forward on hyoglossus below the duct and lingual nerve, then into genioglossus.",
      course: [
        { key: "angle", label: "Behind the angle of the mandible", text: "Turns forward after looping round the occipital artery (see the carotid triangle module)." },
        { key: "hyoglossus", label: "On hyoglossus", text: "Superficial to the muscle, with its accompanying veins, below the submandibular duct." },
        { key: "tongue", label: "Into the tongue muscles", text: "Supplies all tongue muscles except palatoglossus." }
      ],
      relations: [],
      supply: {},
      surgical: ["Palsy: the tongue deviates towards the weak side on protrusion, with wasting and fasciculation over weeks.", "Bilateral palsy is serious: the tongue cannot be moved or protruded, with severe speech and swallowing problems and airway risk."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "inferior_alveolar",
      name: "Inferior alveolar and mental nerves",
      layer: "nerve",
      summary: "The inferior alveolar nerve runs in the mandibular canal to the teeth and leaves the mental foramen, below the second premolar, as the mental nerve to the lower lip and chin.",
      relations: [],
      supply: {},
      surgical: ["Numbness of the lower lip and chin (numb chin) in a patient with oral cancer suggests invasion of the mandible along the canal.", "In the edentulous, atrophic mandible the canal lies close to the crest, so a tumour on the ridge reaches it early and a segmental rather than marginal mandibulectomy is often needed."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "nerve_mylohyoid",
      name: "Nerve to mylohyoid",
      layer: "nerve",
      summary: "Leaves the inferior alveolar nerve just before the mandibular foramen and runs in a groove to the underside of mylohyoid and the anterior belly of digastric.",
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
      summary: "From the external carotid at the tip of the greater horn of the hyoid, it loops up and passes deep to hyoglossus, then runs to the tip of the tongue as the deep lingual artery. Drawn for this app (right side).",
      course: [
        { key: "origin", label: "From the external carotid", text: "Opposite the tip of the greater horn of the hyoid, with a short upward loop." },
        { key: "hyoglossus", label: "Deep to hyoglossus", text: "Medial to the muscle, separated by it from the hypoglossal nerve." },
        { key: "tongue", label: "Deep lingual artery", text: "Forward to the tip, near the underside of the tongue; the sublingual artery goes to the floor of mouth." }
      ],
      relations: [],
      supply: {},
      surgical: ["Bleeding after a partial glossectomy usually comes from deep lingual branches and can threaten the airway.", "The lingual artery can be tied in the neck (Lesser's or Pirogoff's triangle) to control bleeding from the tongue."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "submental_artery",
      name: "Submental artery",
      layer: "artery",
      summary: "A branch of the facial artery that runs forward on the underside of mylohyoid. It supplies the submental island flap.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "palatine_artery",
      name: "Greater palatine artery",
      layer: "artery",
      summary: "From the descending palatine artery (maxillary), it emerges through the greater palatine foramen, opposite the second or third molar, and runs forward on the hard palate.",
      relations: [],
      supply: {},
      surgical: ["Palatal mucoperiosteal flaps are based on it; incisions on the palate are kept away from its line along the alveolus.", "Bleeding from the foramen is controlled by pressure or packing into the foramen."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "inferior_alveolar_artery",
      name: "Inferior alveolar artery",
      layer: "artery",
      summary: "Runs with the inferior alveolar nerve in the mandibular canal.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "lingual_vein",
      name: "Lingual veins",
      layer: "vein",
      summary: "Deep lingual (ranine) veins, visible under the tongue either side of the frenulum, and the veins with the hypoglossal nerve.",
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
      summary: "The lower jaw. Oral cancers reach it through the alveolar crest or the tooth sockets, then may spread along the inferior alveolar canal.",
      relations: [],
      supply: {},
      surgical: ["Marginal mandibulectomy (rim resection) keeps the lower border when the tumour abuts but has not invaded the medulla; segmental resection is needed when it has, and is reconstructed with a fibula free flap."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "maxilla",
      name: "Maxilla and palatine bones",
      layer: "bone",
      summary: "Form the hard palate and the upper alveolar ridge.",
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
      summary: "Attachment of hyoglossus, geniohyoid and mylohyoid; the tip of its greater horn marks the origin of the lingual artery.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "gingiva",
      name: "Gingiva",
      layer: "mucosa",
      summary: "The mucosa over the alveolar ridges. Cancers of the alveolar ridge lie directly on bone and invade it early.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "orbicularis_oris",
      name: "Orbicularis oris (lips)",
      layer: "context",
      summary: "The lips form the front of the oral cavity; the vermilion border is the line to align first in any lip repair.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "medial_pterygoid",
      name: "Medial pterygoid",
      layer: "context",
      summary: "Forms the lateral wall of the pterygomandibular space, where the inferior alveolar nerve is blocked. Tumour spread into it causes trismus and makes the tumour T4b.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "ajcc"]
    },
    {
      id: "styloglossus",
      name: "Styloglossus",
      layer: "muscle",
      summary: "From the tip of the styloid process and the stylomandibular ligament forwards into the side of the tongue, where it interlaces with hyoglossus. It pulls the tongue up and back.",
      relations: ["Enters the tongue through the gap between the superior and middle constrictors, with the glossopharyngeal nerve"],
      supply: {"Origin": "Styloid process and stylomandibular ligament", "Insertion": "Side of the tongue, with hyoglossus", "Action": "Pulls the tongue up and back", "Nerve": "Hypoglossal nerve"},
      surgical: ["The glossopharyngeal nerve runs on styloglossus into the lower tonsil bed, where tonsillectomy can bruise it (altered taste, referred ear pain)."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "hard_palate",
      name: "Hard palate",
      layer: "mucosa",
      summary: "The bony roof of the mouth (palatine processes of the maxillae in front, horizontal plates of the palatine bones behind) under a thick mucoperiosteum. The mucosa carries the incisive papilla over the incisive foramen, a median raphe, and transverse palatal rugae in front.",
      relations: ["Greater palatine foramen medial to the third molar: the greater palatine vessels and nerve run forwards in the mucoperiosteum about 1 cm from the gum margin", "Incisive foramen under the papilla, behind the central incisors: nasopalatine nerve and vessels"],
      supply: {"Sensation": "Greater palatine nerve; nasopalatine nerve behind the incisors (both V2)", "Blood": "Greater palatine artery", "Lymph": "Submandibular, retropharyngeal and upper deep cervical nodes"},
      surgical: ["Palatal flaps are raised as full-thickness mucoperiosteum based on the greater palatine artery.", "Minor salivary glands are densest at the back of the hard palate, the commonest site of minor salivary gland tumours (pleomorphic adenoma, adenoid cystic carcinoma).", "A resection that opens into the nose or sinus is closed with an obturator or a flap."],
      danger: [],
      variations: [],
      refs: ["gray", "shah"]
    },
    {
      id: "palatoglossus",
      name: "Palatoglossus (anterior pillar)",
      layer: "pharynx",
      summary: "Runs from the oral surface of the palatine aponeurosis down to the side of the tongue, raising the palatoglossal arch: the anterior tonsillar pillar, the boundary between the oral cavity and the oropharynx.",
      relations: ["In front of the palatine tonsil", "Meets the tongue at the junction of its oral and pharyngeal parts, just behind the circumvallate papillae"],
      supply: {"Origin": "Palatine aponeurosis (oral surface)", "Insertion": "Side of the tongue, with styloglossus and the transverse muscle", "Action": "Raises the back of the tongue and narrows the oropharyngeal isthmus", "Nerve": "Vagus via the pharyngeal plexus: the only tongue muscle not supplied by the hypoglossal nerve"},
      surgical: ["Tonsillectomy starts with a mucosal cut just inside the anterior pillar, leaving the pillar muscle intact.", "Cancers where the anterior pillar meets the retromolar trigone spread to the soft palate, tongue base and pterygomandibular raphe."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "palatopharyngeus",
      name: "Palatopharyngeus (posterior pillar)",
      layer: "pharynx",
      summary: "From the palatine aponeurosis down the side wall of the pharynx to the thyroid cartilage and pharyngeal wall. Its upper part raises the palatopharyngeal arch, the posterior tonsillar pillar.",
      relations: ["Behind the palatine tonsil; salpingopharyngeus joins it from above"],
      supply: {"Origin": "Palatine aponeurosis and posterior border of the hard palate", "Insertion": "Posterior border of the thyroid lamina and the pharyngeal wall", "Action": "Raises the pharynx and larynx in swallowing; draws the pillars together", "Nerve": "Vagus via the pharyngeal plexus"},
      surgical: ["Suturing the pillars together, as in uvulopalatopharyngoplasty, widens and stiffens the oropharyngeal airway."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "superior_constrictor",
      name: "Superior constrictor (tonsil bed)",
      layer: "pharynx",
      summary: "The upper pharyngeal constrictor, from the pterygoid hamulus, pterygomandibular raphe and mylohyoid line, curving back to the pharyngeal raphe. It forms the bed of the palatine tonsil.",
      relations: ["The tonsil capsule is separated from it by loose areolar tissue: the plane of tonsillectomy and the site of a quinsy", "The glossopharyngeal nerve and styloglossus pass below its lower edge into the tongue", "Lateral to it: the parapharyngeal space, with the internal carotid artery 1.5–2.5 cm away"],
      supply: {"Nerve": "Vagus via the pharyngeal plexus"},
      surgical: ["In tonsillectomy stay on the tonsil capsule: going through the constrictor risks the glossopharyngeal nerve and parapharyngeal vessels.", "A quinsy (peritonsillar abscess) collects between the capsule and the constrictor; it is drained through the soft palate above the upper pole, keeping the cut shallow."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "levator_veli",
      name: "Levator veli palatini",
      layer: "pharynx",
      summary: "From the petrous temporal bone and the cartilage of the auditory tube, down and forwards below the tube into the upper surface of the soft palate. It lifts the soft palate up and back to close off the nasopharynx.",
      relations: ["Passes over the upper edge of the superior constrictor, below the auditory tube"],
      supply: {"Origin": "Petrous temporal bone in front of the carotid canal, and the tubal cartilage", "Insertion": "Palatine aponeurosis, meeting its fellow in a sling", "Action": "Raises the soft palate (velopharyngeal closure)", "Nerve": "Vagus via the pharyngeal plexus"},
      surgical: ["In a cleft palate its fibres run forwards to the back of the hard palate instead of forming a sling; repair (intravelar veloplasty) turns them back into a sling."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "tensor_veli",
      name: "Tensor veli palatini",
      layer: "pharynx",
      summary: "A thin triangular muscle from the scaphoid fossa, the spine of the sphenoid and the side of the auditory tube. Its tendon turns medially round the pterygoid hamulus and spreads into the palatine aponeurosis. It tenses the soft palate and opens the auditory tube on swallowing and yawning.",
      relations: ["Lateral to the medial pterygoid plate and the auditory tube; medial pterygoid lies outside it"],
      supply: {"Origin": "Scaphoid fossa, spine of the sphenoid and the tubal cartilage", "Insertion": "Palatine aponeurosis, after hooking round the pterygoid hamulus", "Action": "Tenses the soft palate; opens the auditory tube", "Nerve": "Nerve to medial pterygoid (V3): the one palatal muscle not supplied by the vagus"},
      surgical: ["Poor tensor action on the tube in cleft palate is one reason these children get glue ear.", "Fracturing the hamulus during palate surgery slackens the tensor tendon; most surgeons avoid it."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "salpingopharyngeus",
      name: "Salpingopharyngeus",
      layer: "pharynx",
      summary: "From the lower end of the cartilage of the auditory tube down the side wall of the pharynx, blending with palatopharyngeus. It raises the salpingopharyngeal fold behind the tubal opening.",
      relations: [],
      supply: {"Action": "Raises the pharynx in swallowing", "Nerve": "Vagus via the pharyngeal plexus"},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "auditory_tube",
      name: "Auditory (Eustachian) tube",
      layer: "pharynx",
      summary: "Joins the middle ear to the nasopharynx, about 36 mm long: a bony third at the middle-ear end and a cartilaginous two-thirds (shown) that opens on the side wall of the nasopharynx behind the inferior turbinate, rimmed by the torus tubarius. It runs down, forwards and medially at about 45° in adults. It is closed at rest; tensor veli palatini opens it on swallowing to equalise middle-ear pressure and let the middle ear drain.",
      relations: ["Levator veli palatini runs below its cartilaginous part, tensor veli palatini lateral to it", "Behind the torus: the pharyngeal recess (fossa of Rosenmüller), the commonest site of nasopharyngeal carcinoma"],
      supply: {"Nerve": "Tympanic plexus (glossopharyngeal) and the pharyngeal branch of the pterygopalatine ganglion", "Blood": "Ascending pharyngeal and middle meningeal arteries, artery of the pterygoid canal"},
      surgical: ["A one-sided middle-ear effusion in an adult needs a look at the nasopharynx: a tumour may be blocking the tube.", "In children the tube is shorter and more horizontal, so infection spreads from the nasopharynx to the middle ear more easily."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "sublingual_ducts",
      name: "Sublingual ducts",
      layer: "duct",
      summary: "The sublingual gland drains through 8–20 small ducts (of Rivinus) opening along the sublingual fold. Some front lobules join into a larger duct (of Bartholin) that opens with, or into, the submandibular duct at the caruncle.",
      relations: [],
      supply: {},
      surgical: ["Damage to these ducts or the gland lets mucus leak into the tissues, which is how a ranula forms.", "With so many ducts, a ranula comes back after drainage or removal of the cyst alone unless the gland is removed."],
      danger: [],
      variations: [],
      refs: ["gray", "harrison"]
    },
    {
      id: "ranula",
      name: "Ranula (right)",
      layer: "pathology",
      summary: "A mucus extravasation pseudocyst from the sublingual gland: a soft, bluish swelling in the floor of mouth to one side of the frenulum. A plunging ranula passes behind the free edge of mylohyoid, or through a gap in it, into the submandibular space and shows as a soft swelling in the neck.",
      relations: ["Lies above mylohyoid, over the sublingual gland, lateral to the submandibular duct and lingual nerve", "Plunging part: below mylohyoid, beside the submandibular gland"],
      supply: {"Cause": "Mucus leaking from a damaged sublingual gland or duct; the wall is granulation tissue, not epithelium", "Imaging": "Thin-walled cyst, bright on T2 MRI; a tail into the sublingual space marks a plunging ranula", "Fluid": "Thick mucus, high in amylase and protein"},
      surgical: ["Removing the sublingual gland through the mouth and draining the cyst cures almost all ranulas, plunging ones included; marsupialisation or excision of the cyst alone often recurs (Zhao 2004).", "A neck incision is rarely needed for a plunging ranula once the gland is out."],
      danger: [],
      variations: [],
      refs: ["harrison", "zhao", "patel"]
    }
  ],

  // Incisions drawn on the model at the surgery steps that name them (step.incision):
  // control points in app space, laid onto the outer surface along "axis" or "toward".
  incisions: [
    {"id": "glossectomy", "name": "1 cm margin around the tumour", "note": "An ellipse along the lateral border, long axis front to back, 1 cm outside the palpable edge.", "points": [[-2.04, -2.45, 1.36], [-2.04, -2.25, 1.32], [-2.04, -2, 1.09], [-2.04, -1.74, 0.7], [-2.04, -1.52, 0.22], [-2.04, -1.35, -0.29], [-2.04, -1.28, -0.75], [-2.04, -1.3, -1.09], [-2.04, -1.42, -1.25], [-2.04, -1.62, -1.21], [-2.04, -1.87, -0.98], [-2.04, -2.13, -0.6], [-2.04, -2.35, -0.11], [-2.04, -2.52, 0.4], [-2.04, -2.59, 0.86], [-2.04, -2.57, 1.2]], "toward": [0.3, -1.94, 0.05], "onto": ["tongue"], "closed": true, "view": [-0.75, 1.3]},
    {"id": "ranula", "name": "Along the sublingual fold", "note": "Over the gland and lateral to the submandibular duct, from the canine back to the second molar.", "points": [[-1.86, -2.06, -0.48], [-1.8, -2.09, -0.39], [-1.57, -2.26, -0.11], [-1.38, -2.48, 0.19], [-1.21, -2.67, 0.43], [-0.88, -2.9, 0.72]], "toward": [-1.3, -6.5, 0.2], "onto": ["ranula", "sublingual"], "view": [-0.5, 1.85]}
  ],

  // Operations: a picker in the Surgery tab chooses between them.
  procedures: [
    {
      "short": "Partial glossectomy",
      "title": "Transoral partial glossectomy for a lateral tongue cancer",
      "atRisk": [{"id": "lingual_nerve", "why": "Runs into the side of the tongue from the floor of mouth: numbness and loss of taste"}, {"id": "hypoglossal", "why": "On hyoglossus in the floor of mouth: tongue weakness if the resection goes deep"}, {"id": "lingual_artery", "why": "Deep to hyoglossus: the main source of bleeding after glossectomy"}, {"id": "wharton", "why": "In the floor of mouth: a cut duct obstructs the submandibular gland"}],
      "steps": [
        {
          "title": "Assess and stage",
          "text": "Palpate the tumour to judge its depth and whether it reaches the floor of mouth or mandible. MRI (or CT) gives depth of invasion and bone involvement; image the neck. Plan an elective neck dissection when depth of invasion is over about 3–4 mm.",
          "show": [
            "muscle",
            "bone",
            "mucosa",
            "pharynx",
            "gland"
          ],
          "focus": [
            "tongue",
            "genioglossus",
            "mandible"
          ]
        },
        {
          "title": "Anaesthesia and access",
          "text": "Nasotracheal intubation keeps the mouth free. Open with a mouth gag or bite block; put a stout traction suture through the tip of the tongue and pull it out and to the opposite side.",
          "show": [
            "muscle",
            "bone",
            "mucosa",
            "pharynx",
            "context"
          ],
          "focus": [
            "tongue",
            "orbicularis_oris"
          ]
        },
        {
          "title": "Mark the margins",
          "text": "Feel the edge of the tumour and mark a 1 cm clinical margin around it with diathermy dots: an ellipse along the lateral border, long axis front to back, so the defect closes along the length of the tongue.",
          "show": [
            "muscle",
            "bone",
            "mucosa",
            "pharynx"
          ],
          "focus": [
            "tongue"
          ],
          "incision": "glossectomy"
        },
        {
          "title": "Mucosal incision",
          "text": "Cut along the marks with needle diathermy, keeping the tongue under tension. Stay on the outside of every dot.",
          "show": [
            "muscle",
            "bone",
            "mucosa",
            "pharynx"
          ],
          "focus": [
            "tongue"
          ],
          "incision": "glossectomy"
        },
        {
          "title": "Deep margin",
          "text": "Go down through the intrinsic muscle into genioglossus and hyoglossus, keeping 1 cm of tissue beyond the deepest palpable tumour, with a finger under the tongue to judge depth.",
          "show": [
            "muscle",
            "bone",
            "nerve"
          ],
          "focus": [
            "genioglossus",
            "hyoglossus",
            "tongue"
          ]
        },
        {
          "title": "Protect the floor of mouth",
          "text": "If the resection reaches the floor of mouth, find the lingual nerve behind and follow it forward, identify the submandibular duct (stent or re-site it) and keep the hypoglossal nerve on hyoglossus.",
          "show": [
            "muscle",
            "bone",
            "nerve",
            "gland",
            "duct"
          ],
          "focus": [
            "lingual_nerve",
            "wharton",
            "hypoglossal",
            "sublingual"
          ]
        },
        {
          "title": "Haemostasis",
          "text": "Control the deep lingual branches with bipolar diathermy or ties. A major bleed from the lingual artery can be controlled in the neck, where it lies deep to hyoglossus.",
          "show": [
            "muscle",
            "bone",
            "artery"
          ],
          "focus": [
            "lingual_artery",
            "hyoglossus"
          ]
        },
        {
          "title": "Orient and check the margins",
          "text": "Mark the specimen for orientation and send it with a diagram. Take frozen sections from the tumour bed or from the specimen surface; aim for at least 5 mm of clear tissue on histology.",
          "show": [
            "muscle",
            "bone"
          ],
          "focus": [
            "tongue"
          ]
        },
        {
          "title": "Close and treat the neck",
          "text": "Close small defects along the length of the tongue or leave them to heal by secondary intention; reconstruct larger ones with a radial forearm free flap. Do the neck dissection (levels I–III, often IV) at the same sitting when planned.",
          "show": [
            "muscle",
            "bone",
            "gland",
            "nerve"
          ],
          "focus": [
            "tongue",
            "smg",
            "mylohyoid"
          ]
        }
      ],
      "complications": [
        "Bleeding from deep lingual branches, with swelling that can obstruct the airway",
        "Lingual nerve injury: numbness and loss of taste on that side of the tongue",
        "Hypoglossal nerve injury: tongue weakness and deviation",
        "Submandibular duct obstruction: sialadenitis or a ranula",
        "Close or involved margins needing re-excision or postoperative radiotherapy",
        "Changes in speech and swallowing, worse with larger resections or tethering of the tongue"
      ],
      "refs": [
        "shah",
        "ajcc",
        "dcruz",
        "rcpath",
        "scottbrown"
      ]
    },
    {
    "short": "Ranula",
    "title": "Transoral excision of the sublingual gland for a ranula",
    "atRisk": [{"id": "lingual_nerve", "why": "Loops under the duct on the deep side of the gland: numbness of the tongue"}, {"id": "wharton", "why": "Medial to the gland: injury or narrowing swells the submandibular gland"}, {"id": "lingual_artery", "why": "Its sublingual branch supplies the gland: bleeding into the floor of mouth"}],
    "intro": "A ranula is mucus leaking from the sublingual gland, so the cure is to remove the gland. Step through the operation; switch on the Ranula layer at any time to see the swelling.",
    "steps": [
      {
        "title": "Simple or plunging?",
        "text": "A simple ranula is a soft, bluish swelling in the floor of mouth to one side of the frenulum. A plunging ranula also, or only, shows as a soft painless swelling in the upper neck. MRI or ultrasound shows a thin-walled cyst with a tail into the sublingual space; the fluid is thick mucus, rich in amylase.",
        "show": [
          "muscle",
          "pharynx",
          "mucosa",
          "gland",
          "duct",
          "bone",
          "pathology"
        ],
        "focus": [
          "ranula",
          "sublingual",
          "mylohyoid"
        ]
      },
      {
        "title": "Anaesthesia and exposure",
        "text": "Nasotracheal intubation; a mouth gag holds the mouth open. A traction suture through the tip of the tongue pulls it up and to the other side. Pass a lacrimal probe into the submandibular duct at the caruncle, so the duct can be felt and kept throughout.",
        "show": [
          "muscle",
          "pharynx",
          "mucosa",
          "gland",
          "duct",
          "bone",
          "pathology"
        ],
        "focus": [
          "wharton",
          "tongue",
          "ranula"
        ]
      },
      {
        "title": "Incision along the sublingual fold",
        "text": "Cut the mucosa over the gland along the sublingual fold, lateral to the duct, from the canine back to the second molar. The thin wall of the ranula often bursts at this stage: let the mucus out; the wall is granulation tissue, not epithelium, and need not be chased.",
        "show": [
          "muscle",
          "pharynx",
          "mucosa",
          "gland",
          "duct",
          "bone",
          "pathology"
        ],
        "focus": [
          "sublingual",
          "sublingual_ducts",
          "ranula"
        ],
        "incision": "ranula"
      },
      {
        "title": "Free the gland on its outer side",
        "text": "Dissect the lateral surface of the gland off the sublingual fossa of the mandible and free its upper border, keeping close to the gland.",
        "show": [
          "muscle",
          "pharynx",
          "mucosa",
          "gland",
          "duct",
          "bone"
        ],
        "focus": [
          "sublingual",
          "mandible",
          "mylohyoid"
        ]
      },
      {
        "title": "Find the duct and the lingual nerve",
        "text": "On the deep (medial) side of the gland run the submandibular duct and the lingual nerve, which loops under the duct from lateral to medial near the second molar. Find both before dividing anything; the probe in the duct helps.",
        "show": [
          "muscle",
          "gland",
          "duct",
          "nerve",
          "bone"
        ],
        "focus": [
          "wharton",
          "lingual_nerve",
          "sublingual"
        ]
      },
      {
        "title": "Divide the vessels and remove the gland",
        "text": "Coagulate the sublingual vessels (from the lingual artery and vein) at the back and deep side of the gland, and divide Bartholin's duct where it joins the submandibular duct. Lift the gland out whole.",
        "show": [
          "muscle",
          "gland",
          "duct",
          "nerve",
          "artery",
          "bone"
        ],
        "focus": [
          "sublingual",
          "sublingual_ducts",
          "wharton",
          "lingual_artery"
        ]
      },
      {
        "title": "Plunging ranula: empty it from above",
        "text": "The neck part is fed by the gland: once the gland is out, press on the neck to empty it through the gap behind or in mylohyoid into the mouth. A neck incision is rarely needed.",
        "show": [
          "muscle",
          "pharynx",
          "mucosa",
          "gland",
          "duct",
          "bone",
          "pathology",
          "nerve"
        ],
        "focus": [
          "ranula",
          "mylohyoid",
          "smg"
        ]
      },
      {
        "title": "Check and close",
        "text": "Milk the submandibular gland to see saliva flow from the duct, and check the lingual nerve. Stop any bleeding; close the mucosa loosely with absorbable sutures. A cut duct is repaired or opened into the floor of mouth further back.",
        "show": [
          "muscle",
          "pharynx",
          "mucosa",
          "gland",
          "duct",
          "nerve",
          "bone"
        ],
        "focus": [
          "wharton",
          "lingual_nerve"
        ]
      }
    ],
    "complications": [
      "Numbness or loss of taste on that side of the tongue from lingual nerve injury, usually temporary",
      "Injury to or narrowing of the submandibular duct: swelling of the submandibular gland with meals",
      "Bleeding into the floor of mouth, which can push the tongue up and back and threaten the airway",
      "Recurrence: about 1% after excision of the gland, more than half after marsupialisation or excision of the cyst alone (Zhao 2004)"
    ],
    "refs": [
      "harrison",
      "zhao",
      "patel",
      "gray"
    ]
  }
  ],

  figures: [{"id": "fig-oral", "title": "The open mouth from the front: oral cavity subsites and the margin marked around a lateral tongue cancer", "svg": "oralCavitySubsites"},
            {"id": "fig-fauces", "title": "The fauces: soft palate, uvula, tonsillar pillars and tonsils, and the muscles in each pillar", "svg": "faucesPillars"},
            {"id": "fig-ranula", "title": "Ranula in coronal section: simple (above mylohyoid) and plunging (into the neck)", "svg": "ranulaCoronal"}],

  quiz: [
    {
      "q": "Which tongue muscle is not supplied by the hypoglossal nerve?",
      "options": [
        "Genioglossus",
        "Hyoglossus",
        "Styloglossus",
        "Palatoglossus"
      ],
      "answer": 3,
      "explain": "Palatoglossus is supplied by the vagus through the pharyngeal plexus; all other tongue muscles by the hypoglossal nerve."
    },
    {
      "q": "Which structure passes deep (medial) to hyoglossus?",
      "options": [
        "Lingual nerve",
        "Submandibular duct",
        "Hypoglossal nerve",
        "Lingual artery"
      ],
      "answer": 3,
      "explain": "The lingual artery is deep to hyoglossus; the lingual nerve, duct and hypoglossal nerve are on its lateral surface."
    },
    {
      "q": "How does the lingual nerve relate to the submandibular duct?",
      "options": [
        "Runs above it all the way",
        "Loops under it from lateral to medial",
        "Runs below it all the way",
        "Crosses over it from medial to lateral"
      ],
      "answer": 1,
      "explain": "Near the second molar the nerve passes from lateral to the duct, under it, to its medial side."
    },
    {
      "q": "Under AJCC 8, an oral tongue cancer 3 cm across with a depth of invasion of 12 mm is:",
      "options": [
        "T1",
        "T2",
        "T3",
        "T4a"
      ],
      "answer": 2,
      "explain": "A depth of invasion over 10 mm makes it at least T3, whatever its size."
    },
    {
      "q": "Why do neck dissections for lateral tongue cancer often include level IV?",
      "options": [
        "The tongue drains only to level IV",
        "Skip metastases can appear in level IV without levels I–II",
        "Level IV is easier to dissect",
        "Level IV holds the submandibular gland"
      ],
      "answer": 1,
      "explain": "Byers found skip metastases to levels III–IV in about 16% of oral tongue cancers."
    },
    {
      "q": "The most reliable cure for a plunging ranula is:",
      "options": [
        "Aspiration",
        "Marsupialisation",
        "Excision of the sublingual gland",
        "Excision of the submandibular gland"
      ],
      "answer": 2,
      "explain": "The ranula comes from the sublingual gland; removing the gland through the mouth (and draining the cyst) prevents recurrence."
    },
    {
      "q": "Which muscle lies in the anterior tonsillar pillar?",
      "options": [
        "Palatopharyngeus",
        "Palatoglossus",
        "Salpingopharyngeus",
        "Superior constrictor"
      ],
      "answer": 1,
      "explain": "The anterior pillar is the palatoglossal arch; palatopharyngeus forms the posterior pillar, and the superior constrictor is the tonsil bed."
    },
    {
      "q": "Which muscle opens the auditory (Eustachian) tube on swallowing?",
      "options": [
        "Levator veli palatini",
        "Tensor veli palatini",
        "Salpingopharyngeus",
        "Palatoglossus"
      ],
      "answer": 1,
      "explain": "Tensor veli palatini, supplied by the mandibular nerve (V3), pulls the tube open; levator lifts the soft palate."
    },
    {
      "q": "Which nerve can be bruised in the lower tonsil bed during tonsillectomy?",
      "options": [
        "Hypoglossal",
        "Lingual",
        "Glossopharyngeal",
        "Vagus"
      ],
      "answer": 2,
      "explain": "The glossopharyngeal nerve runs on styloglossus just outside the superior constrictor in the lower tonsil bed: injury causes altered taste and ear pain."
    },
    {
      "q": "A ranula arises from:",
      "options": [
        "The submandibular gland",
        "The sublingual gland",
        "Minor salivary glands of the lip",
        "A branchial cleft remnant"
      ],
      "answer": 1,
      "explain": "It is mucus extravasated from the sublingual gland; its wall is granulation tissue, so removing the gland cures it."
    }
  ],

  references: {
    "gray": "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the oral cavity and tongue.",
    "ajcc": "Amin MB, Edge SB, Greene FL, et al., eds. AJCC Cancer Staging Manual. 8th ed. Springer; 2017. Lip and oral cavity.",
    "dcruz": "D'Cruz AK, Vaish R, Kapre N, et al. Elective versus therapeutic neck dissection in node-negative oral cancer. N Engl J Med. 2015;373(6):521–529.",
    "byers": "Byers RM, Weber RS, Andrews T, McGill D, Kare R, Wolf P. Frequency and therapeutic implications of \"skip metastases\" in the neck from squamous carcinoma of the oral tongue. Head Neck. 1997;19(1):14–19.",
    "rcpath": "Helliwell T, Woolgar J. Dataset for histopathology reporting of mucosal malignancies of the oral cavity. The Royal College of Pathologists; 2013.",
    "harrison": "Harrison JD. Modern management and pathophysiology of ranula: literature review. Head Neck. 2010;32(10):1310–1320.",
    "shah": "Shah JP, Patel SG, Singh B, Wong RJ. Jatin Shah's Head and Neck Surgery and Oncology. 5th ed. Elsevier; 2019. Oral cavity.",
    "scottbrown": "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Oral cavity tumours; the pharynx and tonsils.",
    "zhao": "Zhao YF, Jia Y, Chen XM, Zhang WF. Clinical review of 580 ranulas. Oral Surg Oral Med Oral Pathol Oral Radiol Endod. 2004;98(3):281–287.",
    "patel": "Patel MR, Deal AM, Shockley WW. Oral and plunging ranulas: what is the most effective treatment? Laryngoscope. 2009;119(8):1501–1509."
  }
};
