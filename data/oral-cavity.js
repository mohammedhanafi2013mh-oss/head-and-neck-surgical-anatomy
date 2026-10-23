// Content for the oral cavity and floor of mouth (both sides; courses traced on
// the right). Each structure id matches a mesh id in data/oral-cavity-meshes.js,
// except styloglossus and palatoglossus, which Z-Anatomy does not model.
// "course" lists the waypoints of a traced structure; "incision" on a surgery
// step names an entry in "incisions" drawn on the model at that step.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.oral_cavity = {
  id: "oral_cavity",
  title: "Oral cavity",
  subtitle: "Tongue, floor of mouth, palate and the nerves, ducts and vessels around hyoglossus, both sides (traced on the right)",

  overview: {
    "intro": "The oral cavity runs from the lips to the junction of the hard and soft palate above and the circumvallate papillae of the tongue below, with the anterior tonsillar pillars at the sides. Behind it is the oropharynx. Its subsites matter because they behave differently: cancers of the oral tongue and floor of mouth spread to the neck early, those of the alveolar ridge and retromolar trigone invade bone early. The floor of the mouth is a small space packed with structures that must be found and kept in surgery: the lingual nerve, the submandibular duct, the hypoglossal nerve and the lingual vessels, arranged around hyoglossus. In the model, structures are shown on both sides, and the lingual nerve, hypoglossal nerve, submandibular duct and lingual artery can be traced on the right.",
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
      "Nerves: lingual (sensation; chorda tympani for taste), hypoglossal (motor), inferior alveolar and mental, greater palatine and nasopalatine",
      "Arteries: lingual, facial (submental, ascending palatine), greater palatine, inferior alveolar"
    ],
    "keyPoints": [
      "AJCC 8 adds depth of invasion to the T stage of oral cancer: T1 ≤2 cm and DOI ≤5 mm; T2 ≤2 cm with DOI 5–10 mm, or 2–4 cm with DOI ≤10 mm; T3 >4 cm or DOI >10 mm.",
      "Elective neck dissection improves survival in early (T1–T2, clinically N0) oral cancer (D'Cruz 2015); depth of invasion over about 3–4 mm is the usual trigger.",
      "Lateral tongue cancers can skip levels I–II and appear first in level III or IV, so the neck dissection for them usually covers levels I–III or I–IV.",
      "Aim for a 1 cm clinical margin: tissue shrinks after resection, and a clear histological margin is ≥5 mm (1–5 mm close, <1 mm involved).",
      "Around hyoglossus: the lingual nerve, submandibular duct and hypoglossal nerve are superficial (lateral); the lingual artery is deep (medial).",
      "The lingual nerve loops under the submandibular duct from lateral to medial near the second molar; find it before cutting near the duct."
    ],
    "refs": [
      "gray",
      "ajcc",
      "dcruz",
      "byers",
      "rcpath"
    ]
  },

  layers: [{"id": "muscle", "label": "Tongue & floor muscles", "defaultOn": true}, {"id": "mucosa", "label": "Gingiva & palate", "defaultOn": true}, {"id": "gland", "label": "Glands", "defaultOn": true}, {"id": "duct", "label": "Submandibular duct", "defaultOn": true}, {"id": "nerve", "label": "Nerves", "defaultOn": true}, {"id": "artery", "label": "Arteries", "defaultOn": true}, {"id": "vein", "label": "Veins", "defaultOn": false}, {"id": "bone", "label": "Jaws, teeth & hyoid", "defaultOn": true}, {"id": "context", "label": "Lips & pterygoid", "defaultOn": false}],

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
      layer: "mucosa",
      summary: "The mobile back part of the palate. It closes off the nasopharynx in swallowing and speech; its junction with the hard palate is the back of the oral cavity.",
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
      layer: "gland",
      summary: "In the tonsillar fossa between the palatoglossal and palatopharyngeal arches, at the boundary between the oral cavity and the oropharynx.",
      relations: ["Bed: superior constrictor; the glossopharyngeal nerve lies in its lower part", "The internal carotid artery is about 1.5–2.5 cm behind and lateral"],
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
      name: "Styloglossus and palatoglossus",
      layer: "muscle",
      summary: "Styloglossus (from the styloid process; hypoglossal) pulls the tongue up and back; palatoglossus (from the soft palate; vagus) raises the back of the tongue and forms the anterior tonsillar pillar. Not shown in the 3D model (Z-Anatomy has neither).",
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
    {"id": "glossectomy", "name": "1 cm margin around the tumour", "note": "An ellipse along the lateral border, long axis front to back, 1 cm outside the palpable edge.", "points": [[-1.68, -0.03, -0.66], [-1.68, 0.32, -0.54], [-1.68, 0.61, -0.19], [-1.68, 0.8, 0.33], [-1.68, 0.87, 0.94], [-1.68, 0.8, 1.55], [-1.68, 0.61, 2.07], [-1.68, 0.32, 2.42], [-1.68, -0.03, 2.54], [-1.68, -0.37, 2.42], [-1.68, -0.66, 2.07], [-1.68, -0.86, 1.55], [-1.68, -0.93, 0.94], [-1.68, -0.86, 0.33], [-1.68, -0.66, -0.19], [-1.68, -0.37, -0.54]], "toward": [0.0, -0.23, 0.94], "onto": ["tongue"], "closed": true, "view": [-0.45, 1.05]}
  ],

  procedure: {
    "title": "Transoral partial glossectomy for a lateral tongue cancer",
    "steps": [
      {
        "title": "Assess and stage",
        "text": "Palpate the tumour to judge its depth and whether it reaches the floor of mouth or mandible. MRI (or CT) gives depth of invasion and bone involvement; image the neck. Plan an elective neck dissection when depth of invasion is over about 3–4 mm.",
        "show": [
          "muscle",
          "bone",
          "mucosa",
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
          "mucosa"
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
          "mucosa"
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

  figures: [{"id": "fig-oral", "title": "The open mouth from the front: oral cavity subsites and the margin marked around a lateral tongue cancer", "svg": "oralCavitySubsites"}],

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
    "scottbrown": "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Oral cavity tumours."
  }
};
