// Content for the pterygopalatine fossa (right side). Each structure id matches
// a mesh id in data/pterygopalatine-meshes.js; openings have no mesh and are
// shown as pins ("pin" names a point in the mesh header). "course" lists the
// waypoints of a traced nerve or vessel; each key matches a point in
// header.courses[id]. "drawn: true" marks paths drawn for this app.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.pterygopalatine = {
  id: "pterygopalatine",
  title: "Pterygopalatine fossa",
  subtitle: "Small space behind the maxilla: maxillary nerve, pterygopalatine ganglion and the end of the maxillary artery (both sides; courses traced on the right)",

  overview: {
    intro:
      "The pterygopalatine fossa is a small, inverted-pyramid space between the back of the maxilla and the pterygoid process, just below the apex of the orbit. It is a crossroads: seven openings connect it to the middle cranial fossa, the foramen lacerum, the nasopharynx, the nasal cavity, the infratemporal fossa, the orbit and the mouth. It holds the maxillary nerve (V2), the pterygopalatine ganglion with the nerve of the pterygoid canal, and the third part of the maxillary artery with its branches. Tumours (juvenile angiofibroma, perineural spread along V2) and posterior epistaxis are the commonest clinical reasons to know it, and endoscopic surgery now reaches it through the nose. Turn on the Foramina layer to see every opening, select a nerve and press 'Trace the course'. Use the Medial view to look from the nasal side.",
    boundaries: [
      { label: "Anterior", text: "Posterior surface of the maxilla (maxillary tuberosity)" },
      { label: "Posterior", text: "Pterygoid process and the front of the greater wing of the sphenoid, with foramen rotundum and the pterygoid canal" },
      { label: "Medial", text: "Perpendicular plate of the palatine bone, with the sphenopalatine foramen at its top" },
      { label: "Lateral", text: "Open through the pterygomaxillary fissure into the infratemporal fossa" },
      { label: "Roof", text: "Body of the sphenoid and orbital process of the palatine bone; opens forwards into the orbit through the inferior orbital fissure" },
      { label: "Floor", text: "Narrows into the greater palatine canal, which leads to the hard palate" }
    ],
    contents: [
      "Maxillary nerve (V2) and its branches: zygomatic, infraorbital, posterior superior alveolar and the ganglionic branches",
      "Pterygopalatine ganglion and its branches: greater and lesser palatine, nasopalatine, posterior superior nasal, pharyngeal and orbital",
      "Nerve of the pterygoid canal (Vidian nerve): greater petrosal plus deep petrosal",
      "Third (pterygopalatine) part of the maxillary artery: posterior superior alveolar, infraorbital, descending palatine, artery of the pterygoid canal, pharyngeal and sphenopalatine branches",
      "Veins draining to the pterygoid plexus, and fat"
    ],
    keyPoints: [
      "Seven openings: foramen rotundum (V2, from the middle cranial fossa); pterygoid canal (Vidian nerve and artery, from foramen lacerum); palatovaginal canal (pharyngeal nerve and artery, to the nasopharynx); sphenopalatine foramen (sphenopalatine artery, nasopalatine and posterior superior nasal nerves, to the nose); pterygomaxillary fissure (maxillary artery in, posterior superior alveolar nerves out, to the infratemporal fossa); inferior orbital fissure (infraorbital and zygomatic nerves, infraorbital vessels, inferior ophthalmic vein, to the orbit); greater palatine canal (greater and lesser palatine nerves and vessels, to the palate).",
      "Arteries lie in front, nerves behind: from the nose the fat and the maxillary artery branches are met first, V2 and the Vidian nerve deeper.",
      "The ganglion is the parasympathetic relay for the lacrimal gland and the glands of the nose, palate and pharynx. Sensory fibres of V2 pass through it without synapsing.",
      "The Vidian canal leads straight back to the anterior genu of the petrous internal carotid at foramen lacerum, a key landmark in endoscopic skull base surgery.",
      "Foramen rotundum lies above and lateral to the pterygoid canal."
    ],
    refs: ["gray", "rhoton", "scottbrown"]
  },

  // Guided dissection: layers from superficial to deep ("keep" stays on throughout).
  dissection: {"keep": ["bone"], "order": ["context", "artery", "nerve", "foramina"]},

  layers: [
    { id: "bone", label: "Bone", defaultOn: true },
    { id: "foramina", label: "Openings (pins)", defaultOn: true },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "context", label: "Nasal lining, pterygoids & Eustachian tube", defaultOn: false }
  ],

  structures: [
    // ---------- nerves ----------
    {
      id: "v2",
      name: "Maxillary nerve (V2)",
      layer: "nerve",
      summary: "The middle division of the trigeminal nerve, purely sensory. It leaves the trigeminal ganglion, runs in the lateral wall of the cavernous sinus and passes through foramen rotundum into the top of the fossa. It crosses the fossa, gives the zygomatic, posterior superior alveolar and ganglionic branches, and passes through the inferior orbital fissure as the infraorbital nerve. This runs in the floor of the orbit (infraorbital groove and canal) and comes out on the face at the infraorbital foramen.",
      course: [
        { key: "ganglion", label: "Trigeminal ganglion", text: "In Meckel's cave; V2 runs forward in the lower lateral wall of the cavernous sinus." },
        { key: "rotundum", label: "Foramen rotundum", text: "Into the upper back part of the fossa, above and lateral to the pterygoid canal." },
        { key: "ppg", label: "Ganglionic branches", text: "Two short roots to the pterygopalatine ganglion; most of their fibres pass through to the nose, palate and pharynx." },
        { key: "iof", label: "Inferior orbital fissure", text: "Leaves the fossa forwards into the orbit as the infraorbital nerve, giving the zygomatic nerve." },
        { key: "foramen", label: "Infraorbital foramen", text: "About 7 mm below the orbital rim, in line with the pupil; divides into palpebral, nasal and labial branches." },
        { key: "face", label: "Upper lip and cheek", text: "Skin of the lower eyelid, side of the nose, cheek and upper lip." }
      ],
      relations: ["In the fossa it lies highest and furthest back, with the ganglion hanging below it", "The third part of the maxillary artery lies in front of it"],
      supply: { "Sensory": "Midface skin, upper teeth and gums, maxillary sinus, nasal cavity, palate, nasopharynx, dura of the middle fossa" },
      surgical: [
        "Perineural spread of tumour (adenoid cystic carcinoma, squamous carcinoma of the face) along V2 widens foramen rotundum and fills the fossa fat on MRI.",
        "The infraorbital nerve is injured in fractures of the orbital floor and zygoma: numb cheek and upper lip.",
        "Maxillary nerve block through the greater palatine canal or the sigmoid notch anaesthetises the whole hemimaxilla."
      ],
      danger: ["Foramen rotundum and the top of the fossa in transpterygoid approaches"],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "ppg",
      name: "Pterygopalatine ganglion",
      layer: "nerve",
      drawn: true,
      summary: "The largest parasympathetic ganglion of the head, hanging from V2 by its ganglionic branches in front of the pterygoid canal. Preganglionic fibres arrive in the Vidian nerve and synapse here. Postganglionic fibres go to the lacrimal gland and to the mucous glands of the nose, sinuses, palate and nasopharynx. Sympathetic and sensory fibres pass through without synapsing. Drawn for this app as a small swelling.",
      relations: ["Above: V2; behind: the anterior opening of the pterygoid canal; medial: the sphenopalatine foramen"],
      supply: { "Parasympathetic": "Lacrimal gland (via the zygomatic nerve and a communicating branch to the lacrimal nerve); nasal, palatal and pharyngeal glands" },
      surgical: [
        "Sphenopalatine (pterygopalatine) ganglion block, transnasally or through the fossa, is used for cluster headache and some facial pain.",
        "Injury to the ganglion or its parasympathetic supply causes a dry eye and dry nose on that side."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ganglionic_branches",
      name: "Ganglionic branches of V2",
      layer: "nerve",
      drawn: true,
      summary: "Usually two short roots from V2 to the ganglion. They carry mostly sensory fibres, which pass through the ganglion into the palatine, nasal and pharyngeal branches. Drawn for this app.",
      relations: [],
      supply: { "Sensory": "Through the ganglion's branches to the nose, palate and nasopharynx" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "vidian",
      name: "Nerve of the pterygoid canal (Vidian nerve)",
      layer: "nerve",
      drawn: true,
      summary: "Formed at foramen lacerum by the greater petrosal nerve (preganglionic parasympathetic, from the facial nerve) and the deep petrosal nerve (postganglionic sympathetic, from the internal carotid plexus). It runs forward through the pterygoid canal in the sphenoid to the ganglion. Drawn for this app.",
      course: [
        { key: "lacerum", label: "Foramen lacerum", text: "The greater petrosal nerve joins the deep petrosal nerve on the cartilage over foramen lacerum, beside the internal carotid." },
        { key: "canal", label: "Pterygoid canal", text: "Runs forward through the root of the pterygoid process, below and medial to foramen rotundum; the artery of the pterygoid canal goes with it." },
        { key: "ganglion", label: "Pterygopalatine ganglion", text: "The parasympathetic fibres synapse here; the sympathetic fibres pass through." }
      ],
      relations: ["The canal lies in the floor of the sphenoid sinus, where it can be seen from inside the sinus"],
      supply: { "Parasympathetic": "Lacrimal and nasal glands (via the ganglion)", "Sympathetic": "Blood vessels of the nose and palate" },
      surgical: [
        "Vidian neurectomy was used for intractable watery rhinitis; it causes a dry eye.",
        "In endoscopic transpterygoid approaches the canal is drilled from below and lateral; followed back, it leads to the anterior genu of the petrous internal carotid. Drilling stays on the lower and medial side of the canal to protect the artery."
      ],
      danger: ["The petrous internal carotid at the back end of the canal"],
      variations: [],
      refs: ["gray", "kassam"]
    },
    {
      id: "greater_palatine_n",
      name: "Greater and lesser palatine nerves",
      layer: "nerve",
      drawn: true,
      summary: "Branches of the ganglion (mostly V2 sensory fibres) that run down the greater palatine canal. The greater palatine nerve leaves through the greater palatine foramen, medial to the third molar, and runs forward on the hard palate. The lesser palatine nerves leave through the lesser palatine foramina to the soft palate and tonsil. Drawn for this app.",
      course: [
        { key: "ganglion", label: "Pterygopalatine ganglion", text: "Down the greater palatine canal with the descending palatine artery." },
        { key: "foramen", label: "Greater palatine foramen", text: "Palatal to the second or third upper molar, about 1 cm from the gingival margin." },
        { key: "palate", label: "Hard palate", text: "Forward in a groove beside the alveolar ridge towards the canine, meeting the nasopalatine nerve." }
      ],
      relations: ["Runs with the greater palatine artery, which lies on its outer side"],
      supply: { "Sensory": "Hard palate mucosa and palatal gingiva back from the canine (greater); soft palate and tonsil (lesser)", "Secretomotor": "Palatal glands" },
      surgical: [
        "Greater palatine block at the foramen; a needle passed up the canal reaches the fossa for a maxillary nerve block.",
        "The greater palatine artery and nerve are the pedicle of palatal flaps and are protected when taking palatal grafts."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "nasopalatine",
      name: "Nasopalatine nerve",
      layer: "nerve",
      drawn: true,
      summary: "Leaves the ganglion through the sphenopalatine foramen, crosses the roof of the nasal cavity to the septum and runs down and forward on the vomer to the incisive canal. It ends on the front of the hard palate behind the upper incisors. Drawn for this app.",
      course: [
        { key: "ganglion", label: "Pterygopalatine ganglion", text: "Medially, with the sphenopalatine artery." },
        { key: "spf", label: "Sphenopalatine foramen", text: "Into the back of the nasal cavity above the middle turbinate tail." },
        { key: "incisive", label: "Incisive canal", text: "Down the septum to the incisive papilla behind the central incisors." }
      ],
      relations: ["Runs with the posterior septal branch of the sphenopalatine artery"],
      supply: { "Sensory": "Nasal septum, anterior hard palate behind the incisors" },
      surgical: ["Nasopalatine block at the incisive papilla; the nerve is cut when a nasoseptal flap is raised."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "psa_nerve",
      name: "Posterior superior alveolar nerves",
      layer: "nerve",
      drawn: true,
      summary: "Two or three branches of V2 that leave the fossa through the pterygomaxillary fissure and run down on the maxillary tuberosity. They enter small foramina in the bone to reach the upper molars and the lining of the maxillary sinus; one branch supplies the buccal gingiva. Drawn for this app.",
      relations: ["Next to the posterior superior alveolar artery and the pterygoid plexus"],
      supply: { "Sensory": "Upper molars (except often the mesiobuccal root of the first), buccal gingiva, maxillary sinus" },
      surgical: ["Posterior superior alveolar block behind the tuberosity; too deep a needle can cause a haematoma from the pterygoid plexus."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "zygomatic_nerve",
      name: "Zygomatic nerve",
      layer: "nerve",
      drawn: true,
      summary: "Leaves V2 in the fossa and enters the orbit through the inferior orbital fissure. On the lateral wall of the orbit it divides into zygomaticotemporal and zygomaticofacial nerves, and gives a communicating branch to the lacrimal nerve. This carries the postganglionic secretomotor fibres to the lacrimal gland. Drawn for this app.",
      relations: [],
      supply: { "Sensory": "Skin of the temple and the prominence of the cheek", "Secretomotor (carried)": "Lacrimal gland" },
      surgical: [],
      danger: [],
      variations: ["The lacrimal fibres sometimes reach the gland directly"],
      refs: ["gray"]
    },
    {
      id: "pharyngeal_nerve",
      name: "Pharyngeal nerve",
      layer: "nerve",
      drawn: true,
      summary: "A small branch of the ganglion that runs back through the palatovaginal (pharyngeal) canal to the mucosa of the nasopharynx behind the Eustachian tube opening. Drawn for this app.",
      relations: ["Runs with the pharyngeal branch of the maxillary artery"],
      supply: { "Sensory": "Nasopharynx" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "trigeminal",
      name: "Trigeminal nerve (sensory root to the ganglion)",
      layer: "nerve",
      summary: "The part of the trigeminal nerve from which V2 arises, as modelled in Z-Anatomy, shown for orientation.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- arteries ----------
    {
      id: "maxillary_artery",
      name: "Maxillary artery",
      layer: "artery",
      summary: "Crosses the infratemporal fossa and enters the pterygopalatine fossa through the pterygomaxillary fissure as its third part. There it lies in front of the nerves, often looped, and divides into its terminal branches.",
      relations: ["In front of V2 and the ganglion, embedded in fat"],
      supply: { "Territory": "Through its third part: upper teeth, maxillary sinus, palate, nasal cavity, nasopharynx" },
      surgical: [
        "Endoscopic or transantral ligation of its third part, or embolisation, controls severe posterior epistaxis.",
        "Main feeder of juvenile nasopharyngeal angiofibroma; it is embolised before surgery."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "infraorbital_artery",
      name: "Infraorbital artery",
      layer: "artery",
      summary: "From the third part as it enters the fossa. It passes through the inferior orbital fissure with the infraorbital nerve, along the floor of the orbit, and out of the infraorbital foramen.",
      course: [
        { key: "origin", label: "Maxillary artery", text: "From the external carotid behind the neck of the mandible, across the infratemporal fossa." },
        { key: "ptm", label: "Pterygomaxillary fissure", text: "Enters the fossa as the third part and gives the infraorbital artery." },
        { key: "foramen", label: "Infraorbital foramen", text: "Through the floor of the orbit with the nerve, out onto the face." }
      ],
      relations: ["With the infraorbital nerve"],
      supply: { "Territory": "Lower eyelid, cheek, upper lip; anterior superior alveolar branches to the front teeth" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "psa",
      name: "Posterior superior alveolar artery",
      layer: "artery",
      summary: "Given off as the maxillary artery enters the fissure. It runs down onto the maxillary tuberosity with the nerves of the same name.",
      relations: [],
      supply: { "Territory": "Upper molars and premolars, maxillary sinus lining, gingiva" },
      surgical: ["Can bleed in sinus lift procedures through the lateral wall of the maxilla."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "descending_palatine",
      name: "Descending and greater palatine arteries",
      layer: "artery",
      summary: "The descending palatine artery runs down the greater palatine canal and divides into the greater palatine artery, forward on the hard palate to the incisive canal, and the lesser palatine arteries to the soft palate.",
      relations: ["Lateral to the greater palatine nerve"],
      supply: { "Territory": "Hard and soft palate, palatal gingiva, tonsil" },
      surgical: ["Protected in Le Fort I osteotomy at the back of the maxilla; the pedicle of palatal flaps."],
      danger: ["Pterygomaxillary disjunction"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sphenopalatine",
      name: "Sphenopalatine artery branches",
      layer: "artery",
      summary: "The end of the maxillary artery. It passes through the sphenopalatine foramen into the back of the nose and divides into posterior lateral nasal branches (to the turbinates and lateral wall) and the posterior septal branch, which runs down the septum to anastomose with the greater palatine artery in the incisive canal.",
      relations: ["The foramen lies just behind the crista ethmoidalis, at the back of the middle meatus above the tail of the middle turbinate"],
      supply: { "Territory": "Lateral nasal wall and septum" },
      surgical: [
        "The main source of posterior epistaxis. Endoscopic ligation: raise a mucosal flap behind the maxillary antrostomy, find the crista ethmoidalis and clip the artery and all its branches just behind it.",
        "The posterior septal branch is the pedicle of the nasoseptal (Hadad–Bassagasteguy) flap."
      ],
      danger: [],
      variations: ["Divides before the foramen in many people, so two or more branches emerge"],
      refs: ["gray", "snyderman"]
    },
    {
      id: "pterygoid_canal_artery",
      name: "Artery of the pterygoid canal",
      layer: "artery",
      summary: "A small branch of the third part (or of the internal carotid) that runs back through the pterygoid canal with the Vidian nerve to the upper pharynx and Eustachian tube. Z-Anatomy draws a vessel by this name running medially from the fossa towards the sphenopalatine foramen, so its course in the model is not reliable.",
      relations: ["With the Vidian nerve in the pterygoid canal"],
      supply: { "Territory": "Upper pharynx, Eustachian tube, tympanic cavity" },
      surgical: ["Bleeds when the Vidian canal is drilled; a guide back to the petrous carotid."],
      danger: [],
      variations: [],
      refs: ["gray", "kassam"]
    },
    {
      id: "ica",
      name: "Internal carotid artery (petrous and lacerum segments)",
      layer: "context",
      summary: "Behind the fossa: the petrous carotid turns up over foramen lacerum, where the Vidian nerve begins.",
      relations: ["The Vidian canal points straight at its anterior genu"],
      supply: {},
      surgical: ["Endoscopic approaches through the fossa to the petrous apex and infratemporal fossa identify the artery by following the Vidian canal back."],
      danger: ["Foramen lacerum and the anterior genu of the petrous segment"],
      variations: [],
      refs: ["kassam", "rhoton"]
    },

    // ---------- context ----------
    {
      id: "nasal_mucosa",
      name: "Nasal cavity lining",
      layer: "context",
      summary: "The mucosa of the nasal cavity, shown translucent. The sphenopalatine foramen opens into the back of the middle meatus, under it.",
      relations: [],
      supply: { "Nerve": "Nasopalatine, posterior superior nasal and anterior ethmoidal nerves", "Blood": "Sphenopalatine, anterior and posterior ethmoidal, greater palatine and superior labial arteries" },
      surgical: ["Most bleeding from the back of the nose comes from sphenopalatine branches; most from the front from Kiesselbach's plexus on the septum."],
      danger: [],
      variations: [],
      refs: ["scottbrown"]
    },
    {
      id: "auditory_tube",
      name: "Eustachian (auditory) tube",
      layer: "context",
      summary: "Runs from the middle ear down, forward and medially to the nasopharynx, behind and below the fossa.",
      relations: ["Medial to the infratemporal fossa and behind the pterygoid process"],
      supply: {},
      surgical: ["Juvenile angiofibroma and nasopharyngeal carcinoma block it: a glue ear on one side in an adult needs the postnasal space examined."],
      danger: [],
      variations: [],
      refs: ["scottbrown"]
    },
    {
      id: "pterygoids",
      name: "Pterygoid muscles",
      layer: "context",
      summary: "The lateral and medial pterygoids arise from the pterygoid plates just behind the fossa and lie in the infratemporal fossa.",
      relations: [],
      supply: { "Nerve": "Mandibular nerve (V3)" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- bone ----------
    {
      id: "maxilla",
      name: "Maxilla",
      layer: "bone",
      summary: "Its posterior (infratemporal) surface, ending below at the maxillary tuberosity, is the front wall of the fossa. Behind its thin posterior wall lies the maxillary sinus.",
      relations: [],
      supply: {},
      surgical: ["Removing the posterior wall of the maxillary sinus endoscopically opens the fossa from the front. A juvenile angiofibroma bows this wall forward (Holman–Miller sign)."],
      danger: [],
      variations: [],
      refs: ["gray", "holman"]
    },
    {
      id: "palatine",
      name: "Palatine bone",
      layer: "bone",
      summary: "Its perpendicular plate forms the medial wall of the fossa. Its orbital and sphenoidal processes frame the sphenopalatine notch, which the sphenoid closes into the sphenopalatine foramen. Its pyramidal process fills the gap between the pterygoid plates below.",
      relations: [],
      supply: {},
      surgical: ["The crista ethmoidalis on its perpendicular plate marks the sphenopalatine foramen just behind it."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "sphenoid",
      name: "Sphenoid bone",
      layer: "bone",
      summary: "Forms the back wall and part of the roof: foramen rotundum and the pterygoid canal open into the fossa, with the pterygoid process below.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "vomer",
      name: "Vomer",
      layer: "bone",
      summary: "The back of the nasal septum, on which the nasopalatine nerve and posterior septal artery run.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ethmoid_conchae",
      name: "Ethmoid and inferior concha",
      layer: "bone",
      summary: "The lateral nasal wall and turbinates, in front of the sphenopalatine foramen.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "zygomatic",
      name: "Zygomatic bone",
      layer: "bone",
      summary: "Forms the lateral wall of the orbit, where the zygomatic nerve divides.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- openings (pins) ----------
    {
      id: "f_rotundum",
      name: "Foramen rotundum",
      layer: "foramina",
      pin: "foramen_rotundum",
      summary: "From the middle cranial fossa into the upper back part of the fossa.",
      relations: ["Transmits: maxillary nerve (V2)"],
      supply: {},
      surgical: ["Widened by perineural tumour spread along V2."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_pterygoid_canal",
      name: "Pterygoid (Vidian) canal",
      layer: "foramina",
      pin: "pterygoid_canal",
      summary: "From foramen lacerum through the root of the pterygoid process, below and medial to foramen rotundum.",
      relations: ["Transmits: nerve and artery of the pterygoid canal"],
      supply: {},
      surgical: ["Landmark to the petrous carotid in endoscopic skull base surgery."],
      danger: [],
      variations: [],
      refs: ["gray", "kassam"]
    },
    {
      id: "f_ptm",
      name: "Pterygomaxillary fissure",
      layer: "foramina",
      pin: "pterygomaxillary_fissure",
      summary: "The lateral side of the fossa, between the maxilla and the lateral pterygoid plate, opening into the infratemporal fossa.",
      relations: ["Transmits: maxillary artery (in), posterior superior alveolar nerves and vessels (out)"],
      supply: {},
      surgical: ["Juvenile angiofibroma spreads through it into the infratemporal fossa."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_spf",
      name: "Sphenopalatine foramen",
      layer: "foramina",
      pin: "sphenopalatine_foramen",
      summary: "At the top of the medial wall, opening into the back of the nose behind the crista ethmoidalis.",
      relations: ["Transmits: sphenopalatine artery, nasopalatine and posterior superior nasal nerves"],
      supply: {},
      surgical: ["Site of endoscopic sphenopalatine artery ligation; juvenile angiofibroma arises close to it."],
      danger: [],
      variations: [],
      refs: ["gray", "snyderman"]
    },
    {
      id: "f_iof",
      name: "Inferior orbital fissure",
      layer: "foramina",
      pin: "inferior_orbital_fissure",
      summary: "The front of the roof of the fossa opens into the orbit through the inferior orbital fissure (pin on V2 where it passes).",
      relations: ["Transmits: infraorbital and zygomatic nerves, infraorbital vessels, inferior ophthalmic vein, orbital branches of the ganglion"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_gpf",
      name: "Greater palatine canal and foramen",
      layer: "foramina",
      pin: "greater_palatine_foramen",
      summary: "The fossa narrows downwards into the greater palatine canal, which opens on the hard palate.",
      relations: ["Transmits: greater and lesser palatine nerves, descending palatine artery"],
      supply: {},
      surgical: ["Route for a maxillary nerve block from the mouth (needle up the canal about 2.5–3 cm)."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_incisive",
      name: "Incisive canal",
      layer: "foramina",
      pin: "incisive_canal",
      summary: "In the front of the hard palate behind the central incisors.",
      relations: ["Transmits: nasopalatine nerve, end of the greater palatine and posterior septal arteries"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_infraorbital",
      name: "Infraorbital foramen",
      layer: "foramina",
      pin: "infraorbital_foramen",
      landmark: false, // on the face, away from the fossa; pinned on V2's course instead
      summary: "On the face below the orbital rim, in line with the pupil.",
      relations: ["Transmits: infraorbital nerve and vessels"],
      supply: {},
      surgical: ["Infraorbital nerve block."],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  procedure: {
    title: "Endoscopic transnasal approach to the pterygopalatine fossa (with sphenopalatine artery ligation)",
    atRisk: [{"id": "maxillary_artery", "why": "Fills the front of the fossa: brisk bleeding"}, {"id": "v2", "why": "At foramen rotundum: cheek numbness"}, {"id": "vidian", "why": "Cutting it gives a dry eye"}, {"id": "greater_palatine_n", "why": "Runs down the greater palatine canal: palatal numbness"}, {"id": "ica", "why": "Behind the vidian canal at foramen lacerum: follow the canal no further than its lower half"}],
    steps: [
      {
        title: "Preparation",
        text: "General anaesthesia, head up, decongest the nose. A 0° endoscope with image guidance; embolisation first for vascular tumours.",
        show: ["bone", "context"],
        focus: ["nasal_mucosa", "ethmoid_conchae", "maxilla"]
      },
      {
        title: "Middle meatus and maxillary antrostomy",
        text: "Medialise the middle turbinate, remove the uncinate process and open a wide maxillary antrostomy back to the posterior wall of the sinus.",
        show: ["bone", "context"],
        focus: ["ethmoid_conchae", "maxilla", "nasal_mucosa"]
      },
      {
        title: "Find the sphenopalatine artery",
        text: "Raise a mucoperiosteal flap from the lateral nasal wall behind the antrostomy. The crista ethmoidalis of the palatine bone marks the sphenopalatine foramen just behind it, where the artery comes out.",
        show: ["bone", "artery", "foramina", "context"],
        focus: ["palatine", "sphenopalatine", "f_spf"]
      },
      {
        title: "Ligate the artery",
        text: "Clip or coagulate the sphenopalatine artery and every branch, as it often divides before the foramen. For epistaxis the operation ends here.",
        show: ["bone", "artery", "foramina"],
        focus: ["sphenopalatine", "maxillary_artery", "f_spf"]
      },
      {
        title: "Open the fossa",
        text: "Take down the thin posterior wall of the maxillary sinus and widen the sphenopalatine foramen to expose the periosteum of the fossa.",
        show: ["bone", "artery", "nerve"],
        focus: ["maxilla", "palatine", "maxillary_artery"]
      },
      {
        title: "Arteries in front",
        text: "Open the periosteum. Fat and the looped third part of the maxillary artery with its branches lie in front; clip them and sweep them aside.",
        show: ["bone", "artery", "nerve"],
        focus: ["maxillary_artery", "infraorbital_artery", "descending_palatine", "psa"]
      },
      {
        title: "Nerves behind",
        text: "Deeper lie the ganglion and V2 coming from foramen rotundum above and laterally. The greater palatine nerve descends into its canal and the infraorbital nerve leaves forwards to the orbit.",
        show: ["bone", "nerve", "foramina"],
        focus: ["v2", "ppg", "greater_palatine_n", "f_rotundum"]
      },
      {
        title: "Vidian canal and the carotid",
        text: "For a transpterygoid approach, find the Vidian nerve in its canal below and medial to rotundum. Drill on the lower and medial side of the canal and follow it back to the anterior genu of the petrous carotid at foramen lacerum.",
        show: ["bone", "nerve", "foramina", "context"],
        focus: ["vidian", "f_pterygoid_canal", "ica"]
      },
      {
        title: "Closure and aftercare",
        text: "Reconstruct any dural defect, usually with a nasoseptal flap. Saline rinses, review for crusting and check eye dryness and facial sensation.",
        show: ["bone", "context", "artery"],
        focus: ["nasal_mucosa", "sphenopalatine"]
      }
    ],
    complications: [
      "Bleeding from the maxillary artery or its branches; carotid injury in transpterygoid work",
      "Numbness of the cheek, upper lip and teeth (V2, infraorbital) or palate (palatine nerves)",
      "Dry eye after Vidian nerve or ganglion injury",
      "CSF leak if the skull base is opened",
      "Orbital injury through the inferior orbital fissure",
      "Crusting, synechiae and sinusitis"
    ],
    refs: ["snyderman", "kassam", "scottbrown"]
  },

  figures: [
    { id: "fig-ppf-openings", title: "The seven openings of the pterygopalatine fossa and what passes through them", svg: "pterygopalatineFossa" }
  ],

  quiz: [
    {
      q: "Which structure passes through foramen rotundum?",
      options: ["Mandibular nerve", "Maxillary nerve", "Nerve of the pterygoid canal", "Middle meningeal artery"],
      answer: 1,
      explain: "V2 enters the fossa through foramen rotundum; V3 uses foramen ovale and the middle meningeal artery foramen spinosum."
    },
    {
      q: "The nerve of the pterygoid canal is formed by the greater petrosal nerve and which other nerve?",
      options: ["Lesser petrosal nerve", "Deep petrosal nerve", "Chorda tympani", "Nasociliary nerve"],
      answer: 1,
      explain: "The deep petrosal nerve brings sympathetic fibres from the internal carotid plexus; the greater petrosal brings preganglionic parasympathetic fibres from VII."
    },
    {
      q: "Postganglionic secretomotor fibres from the pterygopalatine ganglion reach the lacrimal gland mainly through:",
      options: ["The ophthalmic nerve directly", "The zygomatic nerve and a communicating branch to the lacrimal nerve", "The greater petrosal nerve", "The infraorbital nerve"],
      answer: 1,
      explain: "They travel with the zygomatic nerve into the orbit and join the lacrimal nerve through a communicating branch."
    },
    {
      q: "Which landmark guides endoscopic ligation of the sphenopalatine artery?",
      options: ["Uncinate process", "Crista ethmoidalis", "Agger nasi", "Basal lamella"],
      answer: 1,
      explain: "The crista ethmoidalis on the perpendicular plate of the palatine bone lies just in front of the sphenopalatine foramen."
    },
    {
      q: "Anterior bowing of the posterior wall of the maxillary sinus on CT (Holman–Miller sign) suggests:",
      options: ["Antrochoanal polyp", "Juvenile nasopharyngeal angiofibroma", "Fungal sinusitis", "Mucocele of the sphenoid"],
      answer: 1,
      explain: "A juvenile angiofibroma arising near the sphenopalatine foramen expands the pterygopalatine fossa and pushes the back wall of the maxilla forwards."
    },
    {
      q: "Through which opening does the pterygopalatine fossa communicate with the oral cavity?",
      options: ["Palatovaginal canal", "Sphenopalatine foramen", "Greater palatine canal", "Pterygomaxillary fissure"],
      answer: 2,
      explain: "The greater palatine canal runs down to the greater and lesser palatine foramina on the palate."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the pterygopalatine fossa, nose and palate.",
    rhoton: "Rhoton AL Jr. Cranial Anatomy and Surgical Approaches. Lippincott Williams & Wilkins; 2003.",
    kassam: "Kassam AB, Vescan AD, Carrau RL, et al. Expanded endonasal approach: vidian canal as a landmark to the petrous internal carotid artery. J Neurosurg. 2008;108(1):177–183.",
    snyderman: "Snyderman CH, Goldman SA, Carrau RL, Ferguson BJ, Grandis JR. Endoscopic sphenopalatine artery ligation is an effective method of treatment for posterior epistaxis. Am J Rhinol. 1999;13(2):137–140.",
    holman: "Holman CB, Miller WE. Juvenile nasopharyngeal fibroma: roentgenologic characteristics. Am J Roentgenol Radium Ther Nucl Med. 1965;94:292–298.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Chapters on epistaxis, juvenile angiofibroma and endoscopic skull base surgery."
  }
};
