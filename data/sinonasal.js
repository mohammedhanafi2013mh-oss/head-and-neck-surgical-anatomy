// Content for the nasal cavity and paranasal sinuses (right side; septum and
// frontal and sphenoid sinuses midline). Each structure id matches a mesh id in
// data/sinonasal-meshes.js; openings have no mesh and are shown as pins ("pin"
// names a point in the mesh header). "course" lists the waypoints of a traced
// route; each key matches a point in header.courses[id]. "drawn: true" marks
// geometry built for this app.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.sinonasal = {
  id: "sinonasal",
  title: "Nose & paranasal sinuses",
  subtitle: "Nasal cavity, lateral wall, ostiomeatal unit and the frontal, ethmoid, maxillary and sphenoid sinuses (right side)",

  overview: {
    intro:
      "The nasal cavity runs from the nostrils to the choanae, divided by the septum. Its lateral wall carries the three conchae (turbinates) and the meatuses beneath them, into which the paranasal sinuses drain. The sinuses are air spaces in the frontal, ethmoid, maxillary and sphenoid bones, lined by ciliated mucosa that sweeps mucus towards each natural ostium. The frontal, maxillary and anterior ethmoid sinuses all drain through one narrow area of the middle meatus, the ostiomeatal unit, so small blockages there cause disease in several sinuses at once. Endoscopic sinus surgery works next to the orbit, the skull base, the optic nerve and the carotid. In the model, the sinuses are coloured air spaces. The maxillary sinus is built for this app (Z-Anatomy's maxilla is solid), and the teal lines are the drainage routes: press 'Trace the course' on a drainage route to follow it.",
    boundaries: [
      { label: "Roof", text: "Nasal bones and frontal spine in front, the cribriform plate of the ethmoid in the middle, the body of the sphenoid behind" },
      { label: "Floor", text: "Hard palate: palatine process of the maxilla and horizontal plate of the palatine bone" },
      { label: "Medial wall", text: "Septum: septal (quadrangular) cartilage in front, perpendicular plate of the ethmoid above and behind, vomer below and behind" },
      { label: "Lateral wall", text: "Maxilla, lacrimal bone, ethmoid (superior and middle conchae, uncinate process), inferior concha, perpendicular plate of the palatine bone and medial pterygoid plate" },
      { label: "Front and back", text: "The nostrils and vestibule in front; the choanae open into the nasopharynx behind" }
    ],
    contents: [
      "Inferior meatus: opening of the nasolacrimal duct",
      "Middle meatus: frontal sinus (via the frontal recess), maxillary sinus and anterior ethmoid cells, through the ostiomeatal unit (uncinate process, ethmoid infundibulum, hiatus semilunaris, ethmoid bulla)",
      "Superior meatus: posterior ethmoid cells",
      "Sphenoethmoidal recess: sphenoid sinus",
      "Olfactory mucosa high in the roof, under the cribriform plate",
      "Arteries: anterior and posterior ethmoidal (ophthalmic, internal carotid), sphenopalatine and greater palatine (maxillary, external carotid), superior labial (facial)"
    ],
    keyPoints: [
      "The basal (ground) lamella of the middle turbinate separates the anterior ethmoid cells (draining to the middle meatus) from the posterior cells (draining to the superior meatus).",
      "The maxillary ostium is high on the medial wall, so the sinus drains by mucociliary clearance, not gravity; an accessory ostium can make mucus recirculate.",
      "Keros: the depth of the olfactory fossa (height of the lateral lamella of the cribriform plate) is type I 1–3 mm, II 4–7 mm, III 8–16 mm. The deeper it is, the thinner and more exposed the lateral lamella, the commonest site of CSF leak in sinus surgery.",
      "Lateral wall of the sphenoid sinus: carotid prominence below and optic nerve above, with the opticocarotid recess between; the bone is thin or absent in some people.",
      "Before surgery check the CT for the 'CLOSE' points: Cribriform plate (Keros), Lamina papyracea, Onodi cell, Sphenoid (carotid and optic nerve), Ethmoidal artery (anterior).",
      "Little's area (Kiesselbach's plexus) on the front of the septum is where four arteries meet and where most nosebleeds start; posterior bleeds come from sphenopalatine branches."
    ],
    refs: ["gray", "lund", "stammberger"]
  },

  layers: [
    { id: "bone", label: "Bone", defaultOn: true },
    { id: "sinus", label: "Sinuses", defaultOn: true },
    { id: "foramina", label: "Openings (pins)", defaultOn: true },
    { id: "duct", label: "Drainage routes", defaultOn: true },
    { id: "cartilage", label: "Nasal cartilages", defaultOn: true },
    { id: "mucosa", label: "Nasal lining", defaultOn: false },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "context", label: "Orbit, carotid & pituitary", defaultOn: false }
  ],

  structures: [
    // ---------- sinuses ----------
    {
      id: "maxillary_sinus",
      name: "Maxillary sinus",
      layer: "sinus",
      drawn: true,
      summary: "The largest sinus (about 15 mL in adults), a pyramid in the body of the maxilla with its base at the lateral nasal wall and its apex in the zygomatic process. Its roof is the orbital floor, carrying the infraorbital nerve. Its floor dips below the nasal floor over the roots of the upper premolars and molars. Its back wall faces the pterygopalatine and infratemporal fossae. Built for this app from the inside of Z-Anatomy's solid maxilla, so its size and shape are approximate.",
      relations: [
        "Roof: orbit and infraorbital nerve; floor: tooth roots; posterior wall: pterygopalatine fossa; medial wall: middle and inferior meatuses",
        "The natural ostium opens high on the medial wall into the ethmoid infundibulum"
      ],
      supply: { "Nerve": "Infraorbital and superior alveolar nerves (V2)", "Blood": "Infraorbital, posterior superior alveolar and greater palatine arteries", "Drainage": "Middle meatus via the infundibulum and hiatus semilunaris" },
      surgical: [
        "Odontogenic sinusitis and oroantral fistula after extraction of an upper molar.",
        "Middle meatal antrostomy enlarges the natural ostium backwards and downwards. Enlarging it forwards risks the nasolacrimal duct; making a second opening that misses the natural ostium leads to recirculation.",
        "Haller (infraorbital ethmoid) cells along the orbital floor can narrow the infundibulum."
      ],
      danger: ["Orbital floor (roof of the sinus)", "Nasolacrimal duct in front of the ostium"],
      variations: ["Septa within the sinus; hypoplasia; accessory ostia in the posterior fontanelle"],
      refs: ["gray", "stammberger"]
    },
    {
      id: "frontal_sinus",
      name: "Frontal sinus",
      layer: "sinus",
      summary: "Paired, usually unequal, spaces between the outer and inner tables of the frontal bone above the orbits, separated by a septum. Absent at birth, they grow from about age 2 into adolescence and are absent in a few percent of people. Each drains down through the frontal recess, a passage bounded by the agger nasi and other anterior ethmoid cells, into the front of the middle meatus.",
      relations: ["Anterior table under the forehead; posterior table against the dura of the anterior cranial fossa; floor over the orbit"],
      supply: { "Nerve": "Supraorbital (V1)", "Blood": "Supraorbital and anterior ethmoidal arteries", "Drainage": "Frontal recess to the middle meatus" },
      surgical: [
        "Pott's puffy tumour (osteomyelitis of the anterior table) and spread through the posterior table to the dura and brain.",
        "Endoscopic frontal sinus surgery (Draf I–III) opens the recess; the cells around it are classified by the IFAC system.",
        "Fractures of the posterior table or the recess may need obliteration or cranialisation."
      ],
      danger: ["Posterior table and skull base", "Anterior ethmoidal artery at the back of the recess"],
      variations: ["Absent or tiny on one or both sides"],
      refs: ["gray", "wormald"]
    },
    {
      id: "anterior_ethmoid",
      name: "Anterior ethmoid cells",
      layer: "sinus",
      summary: "The front group of the ethmoid air cells (Z-Anatomy's 'anterior cells'), including the agger nasi cell in front of the middle turbinate attachment and the ethmoid bulla. They drain into the middle meatus through the ostiomeatal unit.",
      relations: ["Lamina papyracea laterally; fovea ethmoidalis and anterior ethmoidal artery above; frontal recess in front"],
      supply: { "Nerve": "Anterior ethmoidal (V1) and V2 branches", "Drainage": "Middle meatus" },
      surgical: ["The ethmoid bulla is the first landmark opened after the uncinate in anterior ethmoidectomy."],
      danger: ["Lamina papyracea", "Anterior ethmoidal artery and the lateral lamella"],
      variations: ["Agger nasi cells are present in most people and are a key to frontal recess anatomy"],
      refs: ["gray", "lund"]
    },
    {
      id: "middle_ethmoid",
      name: "Middle ethmoid cells",
      layer: "sinus",
      summary: "Z-Anatomy's 'middle cells', the cells around and above the ethmoid bulla. Anatomical terminology lists a middle group; in surgery these count as part of the anterior ethmoid, in front of the basal lamella, draining to the middle meatus.",
      relations: [],
      supply: { "Drainage": "Middle meatus" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["lund"]
    },
    {
      id: "posterior_ethmoid",
      name: "Posterior ethmoid cells",
      layer: "sinus",
      summary: "The cells behind the basal lamella of the middle turbinate, draining into the superior meatus. The most posterior cell may extend above or lateral to the sphenoid sinus as an Onodi (sphenoethmoidal) cell.",
      relations: ["Sphenoid sinus behind; optic nerve may lie in the wall of an Onodi cell"],
      supply: { "Nerve": "Posterior ethmoidal (V1) and V2 branches", "Drainage": "Superior meatus" },
      surgical: ["An Onodi cell carries the optic nerve (and sometimes the carotid) in its wall: mistaking it for the sphenoid sinus is a classic cause of optic nerve injury."],
      danger: ["Optic nerve in an Onodi cell", "Posterior ethmoidal artery near the skull base"],
      variations: ["Onodi cells in up to about a quarter of people on CT"],
      refs: ["gray", "stammberger"]
    },
    {
      id: "sphenoid_sinus",
      name: "Sphenoid sinus",
      layer: "sinus",
      summary: "In the body of the sphenoid behind the nasal cavity, usually divided by an asymmetric septum. Its ostium opens on the front wall into the sphenoethmoidal recess, medial to the superior turbinate and about 1.5 cm above the choana. The pituitary in the sella lies above and behind it, and the cavernous sinuses lie on each side.",
      relations: [
        "Lateral wall: internal carotid (below), optic nerve (above), opticocarotid recess between; V2 and the Vidian canal lower down",
        "Roof: sella turcica and pituitary; planum sphenoidale in front"
      ],
      supply: { "Nerve": "Posterior ethmoidal (V1) and V2 branches", "Blood": "Posterior ethmoidal and sphenopalatine arteries", "Drainage": "Sphenoethmoidal recess" },
      surgical: [
        "The route to the pituitary in endoscopic transsphenoidal surgery.",
        "The intersinus septum often inserts onto the carotid prominence; twisting it off can tear the artery.",
        "Sphenoidotomy is made medially and low through the natural ostium, away from the lateral wall."
      ],
      danger: ["Internal carotid and optic nerve in the lateral wall, sometimes with no bony cover"],
      variations: ["Sellar, presellar or conchal pneumatisation; lateral recesses into the greater wing"],
      refs: ["gray", "rhoton"]
    },

    // ---------- drainage routes ----------
    {
      id: "maxillary_drainage",
      name: "Maxillary sinus drainage",
      layer: "duct",
      drawn: true,
      summary: "Cilia sweep mucus in a star-shaped pattern up the walls to the natural ostium, then through the ethmoid infundibulum and out of the hiatus semilunaris into the middle meatus. Drawn for this app.",
      course: [
        { key: "sinus", label: "Maxillary sinus", text: "Mucus is moved up the walls against gravity." },
        { key: "ostium", label: "Natural ostium", text: "High on the medial wall, hidden behind the uncinate process." },
        { key: "meatus", label: "Middle meatus", text: "Through the infundibulum and hiatus semilunaris, then back over the inferior turbinate to the nasopharynx." }
      ],
      relations: [],
      supply: {},
      surgical: ["Any narrowing of the infundibulum (uncinate, Haller cell, mucosal swelling) obstructs the maxillary, frontal and anterior ethmoid sinuses together."],
      danger: [],
      variations: [],
      refs: ["stammberger"]
    },
    {
      id: "frontal_drainage",
      name: "Frontal sinus drainage",
      layer: "duct",
      drawn: true,
      summary: "Mucus circulates up the medial wall, across the roof and down the lateral wall of the frontal sinus to its ostium in the floor. From there it runs down the frontal recess to the front of the middle meatus, often medial to the uncinate process. Drawn for this app.",
      course: [
        { key: "sinus", label: "Frontal sinus", text: "Mucus leaves through the ostium in the medial floor." },
        { key: "recess", label: "Frontal recess", text: "An hourglass-shaped passage shaped by the agger nasi and the cells around it." },
        { key: "meatus", label: "Middle meatus", text: "Into the front of the middle meatus or the infundibulum, depending on where the uncinate attaches." }
      ],
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["wormald"]
    },
    {
      id: "sphenoid_drainage",
      name: "Sphenoid sinus drainage",
      layer: "duct",
      drawn: true,
      summary: "From the sphenoid sinus through its ostium on the front wall into the sphenoethmoidal recess, then down behind the superior and middle turbinates to the nasopharynx. Drawn for this app.",
      course: [
        { key: "sinus", label: "Sphenoid sinus", text: "Mucus leaves through the ostium high on the front wall." },
        { key: "ostium", label: "Sphenoid ostium", text: "Medial to the superior turbinate, about 1.5 cm above the choana." },
        { key: "recess", label: "Sphenoethmoidal recess", text: "Behind the superior turbinate, then down to the nasopharynx." }
      ],
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["stammberger"]
    },
    {
      id: "nasolacrimal",
      name: "Lacrimal sac and nasolacrimal duct",
      layer: "duct",
      summary: "The sac sits in its fossa at the front of the medial orbital wall. The duct runs down in a bony canal in the maxilla and opens into the inferior meatus under the inferior turbinate, about 1 cm behind its front end, through the valve of Hasner.",
      relations: ["In front of the maxillary ostium and the uncinate process"],
      supply: {},
      surgical: ["Endoscopic dacryocystorhinostomy opens the sac into the middle meatus just in front of the middle turbinate attachment."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },

    // ---------- bone ----------
    {
      id: "ethmoid",
      name: "Ethmoid bone (conchae, cribriform plate, lamina papyracea)",
      layer: "bone",
      summary: "A light, box-shaped bone between the orbits. Its cribriform plate forms the roof of the nose. The perpendicular plate forms the upper septum, and the labyrinths on each side hold the ethmoid cells. The superior and middle conchae hang from their medial surfaces, the uncinate process is on the lateral nasal wall, and the lamina papyracea forms the medial orbital wall.",
      relations: [
        "Middle turbinate: attached in front to the lateral wall (agger nasi), in the middle by the basal lamella, and behind to the perpendicular plate of the palatine bone",
        "Roof (fovea ethmoidalis) is part of the frontal bone, joined to the cribriform plate by the thin lateral lamella"
      ],
      supply: {},
      surgical: [
        "The middle turbinate is preserved and medialised in sinus surgery; its attachment to the skull base is fragile.",
        "Paradoxical curvature or a pneumatised middle turbinate (concha bullosa) can narrow the middle meatus."
      ],
      danger: ["Lateral lamella of the cribriform plate", "Lamina papyracea"],
      variations: ["Concha bullosa; paradoxical middle turbinate"],
      refs: ["gray", "keros"]
    },
    {
      id: "inferior_concha",
      name: "Inferior concha (turbinate)",
      layer: "bone",
      summary: "A separate bone on the lateral wall over the inferior meatus. With its thick, erectile mucosa it does most of the warming, humidifying and resistance work of the nose.",
      relations: ["The nasolacrimal duct opens under its front third"],
      supply: {},
      surgical: ["Turbinate reduction for obstruction keeps the mucosa and avoids over-resection (empty nose syndrome)."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "maxilla",
      name: "Maxilla",
      layer: "bone",
      summary: "Forms most of the lateral nasal wall, the floor of the nose (palatine process) and the floor of the orbit, and contains the maxillary sinus. Z-Anatomy models it as solid bone.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "frontal",
      name: "Frontal bone",
      layer: "bone",
      summary: "Contains the frontal sinuses and forms the roof of the ethmoid labyrinth (fovea ethmoidalis) and the nasal spine above the nasal bones.",
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
      summary: "Its body contains the sphenoid sinus; its rostrum joins the septum, and its pterygoid plates form the back of the lateral nasal wall.",
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
      summary: "The lower back part of the bony septum, between the sphenoid rostrum and the hard palate; its free back edge divides the two choanae.",
      relations: [],
      supply: {},
      surgical: ["The posterior septal artery runs on it: the pedicle of the nasoseptal flap."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "nasal_bones",
      name: "Nasal and lacrimal bones",
      layer: "bone",
      summary: "The nasal bones form the bony bridge of the nose; the upper lateral cartilages are tucked under their lower edges. The lacrimal bone lies behind the frontal process of the maxilla in the medial orbital wall.",
      relations: [],
      supply: {},
      surgical: ["Nasal fractures are reduced within about two weeks, once swelling settles; a septal haematoma must be drained at once to save the cartilage."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "palatine",
      name: "Palatine bone",
      layer: "bone",
      summary: "Its horizontal plate forms the back of the hard palate and its perpendicular plate the back of the lateral nasal wall, with the crista ethmoidalis marking the sphenopalatine foramen.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- cartilage ----------
    {
      id: "septal_cartilage",
      name: "Septal (quadrangular) cartilage",
      layer: "cartilage",
      summary: "The front of the septum, between the perpendicular plate, vomer and maxillary crest. It supports the nasal dorsum and tip. Its blood supply comes from the overlying mucoperichondrium.",
      relations: [],
      supply: { "Blood": "Mucoperichondrium (anterior ethmoidal, sphenopalatine, greater palatine, superior labial)" },
      surgical: [
        "Septoplasty keeps an L-shaped strut of at least about 1 cm along the dorsum and caudal edge to support the nose.",
        "An undrained septal haematoma or abscess destroys the cartilage: saddle nose."
      ],
      danger: [],
      variations: [],
      refs: ["scottbrown"]
    },
    {
      id: "upper_lateral",
      name: "Upper lateral cartilages",
      layer: "cartilage",
      summary: "Triangular cartilages continuous with the septum above, under the nasal bones. Their lower edge with the septum forms the internal nasal valve, the narrowest part of the airway.",
      relations: [],
      supply: {},
      surgical: ["Spreader grafts widen a collapsed internal valve."],
      danger: [],
      variations: [],
      refs: ["scottbrown"]
    },
    {
      id: "alar",
      name: "Lower lateral (major alar) cartilages",
      layer: "cartilage",
      summary: "Each has medial and lateral crura and shapes the tip and nostril. They support the external nasal valve.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["scottbrown"]
    },

    // ---------- soft tissue ----------
    {
      id: "nasal_mucosa",
      name: "Nasal lining",
      layer: "mucosa",
      summary: "Respiratory (ciliated) mucosa over most of the cavity, with erectile venous tissue over the turbinates and septum; olfactory mucosa high in the roof.",
      relations: [],
      supply: { "Nerve": "Anterior ethmoidal (V1); nasopalatine, posterior superior nasal and greater palatine (V2)", "Blood": "Anterior and posterior ethmoidal, sphenopalatine, greater palatine, superior labial" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "nasopharynx",
      name: "Nasopharynx",
      layer: "mucosa",
      summary: "Behind the choanae, with the Eustachian tube openings on its side walls, the fossa of Rosenmüller behind them and the adenoid on its roof.",
      relations: [],
      supply: {},
      surgical: ["Nasopharyngeal carcinoma starts in the fossa of Rosenmüller: a one-sided glue ear in an adult needs the postnasal space examined."],
      danger: [],
      variations: [],
      refs: ["scottbrown"]
    },
    {
      id: "orbit_contents",
      name: "Globe and medial rectus",
      layer: "context",
      summary: "The orbit lies lateral to the ethmoid, behind the paper-thin lamina papyracea; the medial rectus lies directly against it.",
      relations: [],
      supply: {},
      surgical: [
        "Breach of the lamina papyracea shows orbital fat in the field; stop and avoid suction there. Medial rectus injury causes permanent diplopia.",
        "Orbital complications of sinusitis spread through the lamina papyracea (Chandler stages)."
      ],
      danger: ["Lamina papyracea in ethmoidectomy"],
      variations: [],
      refs: ["chandler"]
    },
    {
      id: "pituitary",
      name: "Pituitary gland",
      layer: "context",
      summary: "In the sella turcica above and behind the sphenoid sinus, reached through it in transsphenoidal surgery.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["rhoton"]
    },

    // ---------- nerves ----------
    {
      id: "cn1",
      name: "Olfactory nerve (I)",
      layer: "nerve",
      summary: "About 20 bundles of olfactory filaments from the mucosa in the roof of the nose, on the upper septum and superior turbinate, pass through the cribriform plate to the olfactory bulb.",
      relations: [],
      supply: { "Sensory": "Smell" },
      surgical: ["Smell can be lost after surgery high on the septum or the superior turbinate, and after anterior skull base fractures (often with a CSF leak)."],
      danger: ["Cribriform plate"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "cn2",
      name: "Optic nerve (II)",
      layer: "nerve",
      summary: "Runs in the optic canal along the upper lateral wall of the sphenoid sinus, or in the wall of an Onodi cell.",
      relations: ["The opticocarotid recess lies between it and the carotid prominence"],
      supply: { "Sensory": "Vision" },
      surgical: [],
      danger: ["Lateral wall of the sphenoid sinus; Onodi cell"],
      variations: ["Bony covering absent in a minority"],
      refs: ["rhoton"]
    },
    {
      id: "v2",
      name: "Maxillary nerve (V2) and infraorbital nerve",
      layer: "nerve",
      summary: "V2 crosses the pterygopalatine fossa behind the maxillary sinus; the infraorbital nerve runs in the roof of the sinus (the orbital floor).",
      relations: [],
      supply: { "Sensory": "Midface, upper teeth, maxillary sinus, much of the nasal cavity" },
      surgical: ["Can hang into the sinus on a bony ridge or with no bone over it; it is at risk in surgery on the sinus roof."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- arteries ----------
    {
      id: "ethmoidal_arteries",
      name: "Anterior and posterior ethmoidal arteries",
      layer: "artery",
      summary: "Branches of the ophthalmic artery that cross the roof of the ethmoid from the orbit to the anterior cranial fossa and nose. The anterior artery crosses just behind the frontal recess, often in a bony canal and sometimes hanging below the skull base. Their septal branches supply the upper septum and Little's area.",
      course: [
        { key: "foramen", label: "Anterior ethmoidal foramen", text: "From the orbit across the ethmoid roof, here at its weakest." },
        { key: "nose", label: "Upper septum and lateral wall", text: "After a short course in the anterior cranial fossa it enters the nose beside the crista galli." }
      ],
      relations: [],
      supply: { "Territory": "Ethmoid and frontal sinuses, upper septum and lateral wall, Little's area" },
      surgical: [
        "Cut during surgery, the anterior artery can retract into the orbit: an orbital haematoma that needs canthotomy and cantholysis.",
        "Ligated (endoscopically or through a medial canthal incision) for bleeding from the upper nose."
      ],
      danger: ["Ethmoid roof behind the frontal recess"],
      variations: ["Below the skull base in a bony mesentery in about a third of people"],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "sphenopalatine",
      name: "Sphenopalatine artery branches",
      layer: "artery",
      summary: "Enter the back of the nose through the sphenopalatine foramen. The posterior lateral nasal branches supply the turbinates; the posterior septal branch runs across the face of the sphenoid and down the septum.",
      relations: [],
      supply: { "Territory": "Lateral wall and septum (most of the nose)" },
      surgical: ["Posterior epistaxis; endoscopic ligation behind the crista ethmoidalis. The septal branch is the pedicle of the nasoseptal flap, so sphenoidotomy keeps below and lateral to it when the flap may be needed."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "greater_palatine",
      name: "Descending and greater palatine arteries",
      layer: "artery",
      summary: "Run down the greater palatine canal and forward on the palate; the end of the greater palatine artery passes up through the incisive canal to Little's area.",
      relations: [],
      supply: { "Territory": "Palate and the front of the septal floor" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ica",
      name: "Internal carotid artery",
      layer: "context",
      summary: "Raises the carotid prominence on the lateral wall of the sphenoid sinus as it runs through the cavernous sinus.",
      relations: [],
      supply: {},
      surgical: ["Injury in sphenoid surgery is the most feared complication: pack, control blood pressure and get angiography."],
      danger: ["Lateral wall of the sphenoid sinus; intersinus septum"],
      variations: ["Bony cover thin or absent in a minority"],
      refs: ["rhoton"]
    },

    // ---------- openings (pins) ----------
    {
      id: "f_maxillary_ostium",
      name: "Maxillary ostium",
      layer: "foramina",
      pin: "maxillary_ostium",
      summary: "The natural ostium, high on the medial wall of the sinus, opening into the ethmoid infundibulum behind the uncinate process (position approximate).",
      relations: [],
      supply: {},
      surgical: ["Found by removing the uncinate; usually not visible without doing so."],
      danger: [],
      variations: [],
      refs: ["stammberger"]
    },
    {
      id: "f_frontal_recess",
      name: "Frontal recess",
      layer: "foramina",
      pin: "frontal_recess",
      summary: "The drainage passage of the frontal sinus at the top of the anterior ethmoid (position approximate).",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["wormald"]
    },
    {
      id: "f_sphenoid_ostium",
      name: "Sphenoid ostium",
      layer: "foramina",
      pin: "sphenoid_ostium",
      summary: "On the front wall of the sphenoid sinus in the sphenoethmoidal recess (position approximate).",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["stammberger"]
    },
    {
      id: "f_nasolacrimal",
      name: "Opening of the nasolacrimal duct",
      layer: "foramina",
      pin: "nasolacrimal_opening",
      summary: "In the inferior meatus under the front of the inferior turbinate (the lower end of Z-Anatomy's duct).",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_spf",
      name: "Sphenopalatine foramen",
      layer: "foramina",
      pin: "sphenopalatine_foramen",
      summary: "At the back of the middle meatus behind the crista ethmoidalis.",
      relations: ["Transmits: sphenopalatine artery, nasopalatine and posterior superior nasal nerves"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_cribriform",
      name: "Cribriform plate",
      layer: "foramina",
      pin: "cribriform_plate",
      summary: "The perforated roof of the nose, transmitting the olfactory filaments.",
      relations: [],
      supply: {},
      surgical: ["Its lateral lamella is the thinnest bone of the skull base (Keros)."],
      danger: [],
      variations: [],
      refs: ["keros"]
    },
    {
      id: "f_aef",
      name: "Anterior ethmoidal foramen",
      layer: "foramina",
      pin: "anterior_ethmoidal_foramen",
      summary: "Where the anterior ethmoidal artery leaves the orbit to cross the ethmoid roof.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  procedure: {
    title: "Functional endoscopic sinus surgery (FESS)",
    steps: [
      {
        title: "Plan from the CT",
        text: "Review the CT for the CLOSE points (cribriform plate and Keros type, lamina papyracea, Onodi cell, sphenoid with carotid and optic nerve, anterior ethmoidal artery). Decongest the nose and register image guidance.",
        show: ["bone", "sinus", "foramina", "nerve", "artery"],
        focus: ["f_cribriform", "posterior_ethmoid", "sphenoid_sinus", "ethmoidal_arteries"]
      },
      {
        title: "Middle meatus",
        text: "Gently medialise the middle turbinate to see the uncinate process and the ethmoid bulla behind it.",
        show: ["bone", "sinus", "mucosa"],
        focus: ["ethmoid", "anterior_ethmoid", "nasal_mucosa"]
      },
      {
        title: "Uncinectomy",
        text: "Incise and remove the uncinate process to open the ethmoid infundibulum.",
        show: ["bone", "sinus", "duct"],
        focus: ["ethmoid", "maxillary_drainage", "nasolacrimal"]
      },
      {
        title: "Maxillary antrostomy",
        text: "Find the natural ostium and enlarge it backwards and downwards into the posterior fontanelle, staying behind the nasolacrimal duct and below the orbital floor.",
        show: ["bone", "sinus", "duct", "foramina"],
        focus: ["maxillary_sinus", "f_maxillary_ostium", "nasolacrimal"]
      },
      {
        title: "Anterior ethmoidectomy",
        text: "Open the ethmoid bulla and the anterior cells, keeping the lamina papyracea in view laterally.",
        show: ["bone", "sinus", "context"],
        focus: ["anterior_ethmoid", "middle_ethmoid", "orbit_contents"]
      },
      {
        title: "Basal lamella and posterior ethmoid",
        text: "Go through the basal lamella of the middle turbinate low and medially into the posterior ethmoid; look for an Onodi cell.",
        show: ["bone", "sinus", "nerve"],
        focus: ["posterior_ethmoid", "cn2"]
      },
      {
        title: "Sphenoidotomy",
        text: "Open the sphenoid through its natural ostium in the sphenoethmoidal recess, enlarging it medially and downwards. Inside, identify the carotid and optic prominences and do not twist the intersinus septum.",
        show: ["bone", "sinus", "context", "foramina", "nerve"],
        focus: ["sphenoid_sinus", "f_sphenoid_ostium", "ica", "cn2"]
      },
      {
        title: "Skull base, back to front",
        text: "With the sphenoid roof as the reference, clear the cells off the skull base working forwards, until the anterior ethmoidal artery is seen crossing the roof.",
        show: ["bone", "sinus", "artery", "foramina"],
        focus: ["ethmoid", "ethmoidal_arteries", "f_aef"]
      },
      {
        title: "Frontal recess",
        text: "If needed, open the frontal recess (Draf I or IIa) by clearing the agger nasi and cells around it, using angled scopes, and keeping the mucosa in the recess intact.",
        show: ["bone", "sinus", "duct", "foramina"],
        focus: ["frontal_sinus", "frontal_drainage", "f_frontal_recess"]
      }
    ],
    complications: [
      "CSF leak through the lateral lamella or fovea ethmoidalis; meningitis",
      "Orbital injury: fat exposure, medial rectus injury, orbital haematoma (anterior ethmoidal artery)",
      "Optic nerve or carotid injury in the sphenoid or an Onodi cell",
      "Nasolacrimal duct injury and epiphora",
      "Bleeding; adhesions between the middle turbinate and the lateral wall; stenosis of the frontal recess",
      "Reduced smell"
    ],
    refs: ["stammberger", "keros", "wormald", "scottbrown"]
  },

  figures: [
    { id: "fig-omu", title: "Coronal section through the right ostiomeatal unit, seen from the front as on CT", svg: "ostiomeatalUnit" }
  ],

  quiz: [
    {
      q: "Which sinus drains into the sphenoethmoidal recess?",
      options: ["Frontal", "Maxillary", "Posterior ethmoid", "Sphenoid"],
      answer: 3,
      explain: "The sphenoid drains into the sphenoethmoidal recess; the posterior ethmoid cells drain into the superior meatus; the frontal, maxillary and anterior ethmoid sinuses drain into the middle meatus."
    },
    {
      q: "The nasolacrimal duct opens into the:",
      options: ["Middle meatus", "Inferior meatus", "Superior meatus", "Sphenoethmoidal recess"],
      answer: 1,
      explain: "Under the front of the inferior turbinate, through the valve of Hasner."
    },
    {
      q: "The Keros classification describes:",
      options: ["Frontal sinus cells", "Depth of the olfactory fossa", "Pneumatisation of the sphenoid", "Position of the anterior ethmoidal artery"],
      answer: 1,
      explain: "It grades the height of the lateral lamella of the cribriform plate: the deeper the olfactory fossa, the greater the risk of CSF leak."
    },
    {
      q: "Why does an Onodi cell matter in sinus surgery?",
      options: ["It contains the nasolacrimal duct", "The optic nerve can run in its wall", "It blocks the maxillary ostium", "It holds the anterior ethmoidal artery"],
      answer: 1,
      explain: "A posterior ethmoid cell above or lateral to the sphenoid can carry the optic nerve (and sometimes the carotid) in its wall."
    },
    {
      q: "Where is the natural ostium of the maxillary sinus?",
      options: ["Low on the medial wall in the inferior meatus", "High on the medial wall, into the ethmoid infundibulum", "In the floor over the molars", "In the posterior wall"],
      answer: 1,
      explain: "High on the medial wall behind the uncinate process, so the sinus depends on mucociliary clearance to drain."
    },
    {
      q: "Which structure separates the anterior from the posterior ethmoid cells?",
      options: ["Uncinate process", "Ethmoid bulla", "Basal lamella of the middle turbinate", "Agger nasi"],
      answer: 2,
      explain: "The basal (ground) lamella: cells in front drain to the middle meatus, cells behind to the superior meatus."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the nose, nasal cavity and paranasal sinuses.",
    lund: "Lund VJ, Stammberger H, Fokkens WJ, et al. European position paper on the anatomical terminology of the internal nose and paranasal sinuses. Rhinol Suppl. 2014;(24):1–34.",
    stammberger: "Stammberger H. Functional Endoscopic Sinus Surgery: The Messerklinger Technique. BC Decker; 1991.",
    keros: "Keros P. Über die praktische Bedeutung der Niveauunterschiede der Lamina cribrosa des Ethmoids. Z Laryngol Rhinol Otol. 1962;41:809–813.",
    wormald: "Wormald PJ, Hoseman W, Callejas C, et al. The International Frontal Sinus Anatomy Classification (IFAC) and Classification of the Extent of Endoscopic Frontal Sinus Surgery (EFSS). Int Forum Allergy Rhinol. 2016;6(7):677–696.",
    chandler: "Chandler JR, Langenbrunner DJ, Stevens ER. The pathogenesis of orbital complications in acute sinusitis. Laryngoscope. 1970;80(9):1414–1428.",
    rhoton: "Rhoton AL Jr. Cranial Anatomy and Surgical Approaches. Lippincott Williams & Wilkins; 2003.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Rhinology chapters."
  }
};
