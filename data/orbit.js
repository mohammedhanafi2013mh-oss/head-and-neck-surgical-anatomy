// Content for the orbit (right side). Each structure id matches a mesh id in
// data/orbit-meshes.js; foramina have no mesh and are shown as pins ("pin"
// names a point in the mesh header). "course" lists the waypoints of a traced
// nerve or vessel; each key matches a point in header.courses[id].
// "drawn: true" marks paths drawn for this app.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.orbit = {
  id: "orbit",
  title: "Orbit",
  subtitle: "Bony orbit, globe, extraocular muscles, orbital apex, nerves and vessels (right side)",

  overview: {
    intro:
      "The orbit is a four-sided bony pyramid of about 30 mL. Its apex points back and medially to the optic canal and superior orbital fissure. It holds the globe, the six extraocular muscles and levator, the optic nerve, nerves III, IV, VI and the branches of V1, the ophthalmic artery and veins, the ciliary ganglion and the lacrimal gland, all packed in fat. The orbit borders the anterior cranial fossa above, the ethmoid and maxillary sinuses medially and below, and the middle cranial fossa behind. Orbital cellulitis, blowout fractures, retrobulbar haemorrhage, endoscopic sinus surgery and orbital decompression all depend on its anatomy. Use 'From above' for the classic dissection view, turn bone off to see the apex, and trace the nerves through the superior orbital fissure.",
    boundaries: [
      { label: "Roof", text: "Orbital plate of the frontal bone and lesser wing of the sphenoid; the anterior cranial fossa lies above" },
      { label: "Lateral wall", text: "Zygomatic bone and greater wing of the sphenoid; the thickest wall" },
      { label: "Floor", text: "Orbital surface of the maxilla, with the zygomatic and palatine bones; the infraorbital groove and canal run through it, and it is thinnest just medial to them" },
      { label: "Medial wall", text: "Frontal process of the maxilla, lacrimal bone, lamina papyracea of the ethmoid and body of the sphenoid; the thinnest wall" },
      { label: "Apex", text: "Optic canal (lesser wing) and superior orbital fissure (between the lesser and greater wings)" },
      { label: "Front", text: "The orbital septum, from the rim to the tarsal plates, separates the eyelids from the orbit proper" }
    ],
    contents: [
      "Globe, held by Tenon's capsule and the suspensory (Lockwood's) ligament",
      "Extraocular muscles: four recti and levator from the apex, superior oblique from the sphenoid via the trochlea, inferior oblique from the anterior floor",
      "Nerves: optic (II), oculomotor (III), trochlear (IV), abducens (VI), ophthalmic (V1: lacrimal, frontal, nasociliary), and the zygomatic and infraorbital nerves (V2) in the lateral wall and floor",
      "Ciliary ganglion and short ciliary nerves",
      "Ophthalmic artery and its branches; superior and inferior ophthalmic veins",
      "Lacrimal gland, and the lacrimal sac in its fossa at the front of the medial wall"
    ],
    keyPoints: [
      "Superior orbital fissure: inside the common tendinous ring pass the superior and inferior divisions of III, the nasociliary nerve and VI; above it pass the lacrimal and frontal nerves, IV and the superior ophthalmic vein. ('Live Frankly To See Absolutely No Insult': lacrimal, frontal, trochlear, superior division, abducens, nasociliary, inferior division.)",
      "Optic canal: the optic nerve with its meninges and the ophthalmic artery below it.",
      "24–12–6: from the anterior lacrimal crest along the medial wall, the anterior ethmoidal foramen is about 24 mm back, the posterior ethmoidal 12 mm further, and the optic canal 6 mm beyond that.",
      "Muscle actions (primary position): SR elevates, adducts, intorts; IR depresses, adducts, extorts; SO intorts, depresses, abducts; IO extorts, elevates, abducts. Clinically the obliques are tested in adduction (SO: looking down and in).",
      "Innervation: LR6 SO4, the rest III. Levator is also partly sympathetic (Müller's muscle), so Horner's causes a mild ptosis and III palsy a complete one.",
      "Orbital veins have no valves and drain to the cavernous sinus and pterygoid plexus: infection of the face and orbit can spread backwards."
    ],
    refs: ["gray", "rhoton", "rontal"]
  },

  layers: [
    { id: "bone", label: "Bone", defaultOn: true },
    { id: "foramina", label: "Foramina (pins)", defaultOn: true },
    { id: "globe", label: "Globe & lids", defaultOn: true },
    { id: "muscle", label: "Extraocular muscles", defaultOn: true },
    { id: "nerve", label: "Nerves", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins", defaultOn: false },
    { id: "gland", label: "Lacrimal apparatus", defaultOn: true },
    { id: "context", label: "Carotid & cavernous sinus", defaultOn: false }
  ],

  structures: [
    // ---------- nerves ----------
    {
      id: "cn2",
      name: "Optic nerve (II)",
      layer: "nerve",
      summary: "About 4–5 cm long, from the back of the globe to the chiasm. Its orbital part (about 25 mm) is longer than the distance it spans, so it runs in a gentle S that lets the eye move and come forward. It is wrapped in dura, arachnoid and pia, with CSF around it, and the central retinal artery enters it about 1 cm behind the globe. In the optic canal it is fixed to the bone.",
      course: [
        { key: "chiasm", label: "Optic chiasm", text: "Above the sella; the nasal fibres cross." },
        { key: "canal", label: "Optic canal", text: "About 10 mm long, in the lesser wing, with the ophthalmic artery below and lateral; the sphenoid sinus or an Onodi cell lies medial." },
        { key: "globe", label: "Back of the globe", text: "Enters just medial to the posterior pole, surrounded by the short ciliary nerves and arteries." }
      ],
      relations: ["Inside the cone of the recti; the ophthalmic artery and nasociliary nerve cross over it from lateral to medial; the ciliary ganglion lies on its lateral side"],
      supply: { "Sensory": "Vision; afferent limb of the pupillary light reflex" },
      surgical: [
        "Indirect traumatic optic neuropathy happens in the canal, where the nerve is fixed.",
        "The nerve sheath is continuous with the subarachnoid space: raised intracranial pressure causes papilloedema; sheath fenestration relieves it.",
        "Optic canal decompression and posterior ethmoid surgery near an Onodi cell put it at risk."
      ],
      danger: ["Posterior ethmoid and sphenoid surgery; posterior part of floor fracture repair"],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "cn3",
      name: "Oculomotor nerve (III)",
      layer: "nerve",
      summary: "Runs forward in the lateral wall of the cavernous sinus and divides into superior and inferior divisions, which enter the orbit through the superior orbital fissure inside the common tendinous ring. The superior division supplies superior rectus and levator. The inferior division supplies medial and inferior rectus and inferior oblique. Its branch to inferior oblique carries the parasympathetic root of the ciliary ganglion.",
      course: [
        { key: "origin", label: "Cavernous sinus", text: "In the upper lateral wall; it divides at the front of the sinus." },
        { key: "sof", label: "Superior orbital fissure", text: "Both divisions pass inside the ring, with the nasociliary nerve between them and VI below and lateral." },
        { key: "inferior", label: "Inferior division", text: "To medial rectus, inferior rectus and inferior oblique." },
        { key: "ciliary", label: "Ciliary ganglion", text: "The nerve to inferior oblique sends the parasympathetic (motor) root to the ganglion." },
        { key: "superior", label: "Superior division", text: "Up on the lateral side of the optic nerve into superior rectus and through it to levator." }
      ],
      relations: [],
      supply: { "Motor": "Levator, superior, medial and inferior recti, inferior oblique", "Parasympathetic": "Sphincter pupillae and ciliary muscle via the ciliary ganglion" },
      surgical: [
        "A complete palsy leaves the eye 'down and out' with ptosis and a dilated pupil; a superior division lesion causes ptosis and weak elevation only.",
        "Compressive lesions (posterior communicating aneurysm) involve the pupil early, because the pupillary fibres lie on the outside of the nerve."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "cn4",
      name: "Trochlear nerve (IV)",
      layer: "nerve",
      summary: "Crosses over III in the lateral wall of the cavernous sinus and enters the orbit through the superior orbital fissure above the ring. It runs medially over levator to enter the upper surface of superior oblique.",
      course: [
        { key: "origin", label: "Cavernous sinus", text: "In the lateral wall, below III at first, then crossing above it." },
        { key: "sof", label: "Superior orbital fissure", text: "Above the common tendinous ring, medial to the frontal nerve." },
        { key: "muscle", label: "Superior oblique", text: "Enters its orbital (upper) surface." }
      ],
      relations: ["Outside the muscle cone: a retrobulbar injection, which goes inside the cone, often leaves IV working"],
      supply: { "Motor": "Superior oblique" },
      surgical: ["Palsy causes vertical diplopia worse looking down and in (reading, stairs), and a head tilt away from the affected side."],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "cn6",
      name: "Abducens nerve (VI)",
      layer: "nerve",
      summary: "Runs inside the cavernous sinus beside the carotid, enters the orbit through the superior orbital fissure inside the ring (the lowest and most lateral nerve there) and enters the medial (inner) surface of lateral rectus.",
      course: [
        { key: "origin", label: "Cavernous sinus", text: "Free in the sinus, lateral to the internal carotid." },
        { key: "sof", label: "Superior orbital fissure", text: "Inside the ring, below and lateral to the other nerves." },
        { key: "muscle", label: "Lateral rectus", text: "Enters its inner surface." }
      ],
      relations: [],
      supply: { "Motor": "Lateral rectus" },
      surgical: ["Palsy causes horizontal diplopia worse looking to the affected side; a false localising sign of raised intracranial pressure."],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "v1",
      name: "Ophthalmic nerve (V1) and frontal nerve",
      layer: "nerve",
      summary: "V1 runs in the lateral wall of the cavernous sinus and divides into lacrimal, frontal and nasociliary nerves at the fissure. The model shows its main line as the frontal nerve, which runs forward between levator and the roof. It divides into the supraorbital nerve, leaving through the supraorbital notch to the forehead and scalp, and the supratrochlear nerve, leaving medially above the trochlea.",
      course: [
        { key: "ganglion", label: "Trigeminal ganglion", text: "Through the lateral wall of the cavernous sinus, the lowest of III, IV and V1 at first." },
        { key: "sof", label: "Superior orbital fissure", text: "The frontal and lacrimal nerves pass above the ring; the nasociliary passes inside it." },
        { key: "notch", label: "Supraorbital notch", text: "The supraorbital nerve leaves the orbit at the junction of the medial third and lateral two-thirds of the rim." },
        { key: "forehead", label: "Forehead and scalp", text: "Supplies the upper eyelid, forehead and scalp back to the vertex." }
      ],
      relations: ["The frontal nerve lies on levator, directly under the periorbita of the roof"],
      supply: { "Sensory": "Cornea and conjunctiva, upper eyelid, forehead, scalp to the vertex, dorsum and tip of the nose, frontal and ethmoid sinuses" },
      surgical: ["Supraorbital and supratrochlear nerve blocks at the rim for forehead surgery; injured in brow and coronal incisions."],
      danger: [],
      variations: ["A supraorbital foramen instead of a notch in about a quarter of people"],
      refs: ["gray"]
    },
    {
      id: "nasociliary",
      name: "Nasociliary nerve",
      layer: "nerve",
      drawn: true,
      summary: "The sensory nerve of the eye itself. It enters the orbit inside the ring, between the two divisions of III, and crosses over the optic nerve from lateral to medial with the ophthalmic artery. It gives the sensory root of the ciliary ganglion, two or three long ciliary nerves and the posterior ethmoidal nerve. It then leaves the orbit through the anterior ethmoidal foramen as the anterior ethmoidal nerve, and its last branch, the infratrochlear nerve, continues forward below the trochlea. Drawn for this app.",
      course: [
        { key: "origin", label: "Superior orbital fissure", text: "Inside the common tendinous ring." },
        { key: "optic", label: "Over the optic nerve", text: "Crosses from lateral to medial, giving the ciliary ganglion's sensory root and the long ciliary nerves (cornea, iris, and sympathetic fibres to dilator pupillae)." },
        { key: "anterior_ethmoidal", label: "Anterior ethmoidal foramen", text: "Through the medial wall into the anterior cranial fossa and then the nose; its external nasal branch supplies the tip of the nose." },
        { key: "infratrochlear", label: "Infratrochlear nerve", text: "Forward under the trochlea to the medial canthus and the side of the nose." }
      ],
      relations: ["Runs with the ophthalmic artery across the optic nerve and then along the medial wall above medial rectus"],
      supply: { "Sensory": "Cornea (corneal reflex), iris, ciliary body, ethmoid and sphenoid sinuses, nasal cavity, tip of the nose, medial canthus" },
      surgical: [
        "Herpes zoster on the tip of the nose (Hutchinson's sign) means nasociliary involvement and a high risk of eye involvement.",
        "The anterior ethmoidal artery and nerve are landmarks in endoscopic frontal sinus surgery and are ligated in external or endoscopic approaches for epistaxis."
      ],
      danger: ["Anterior ethmoidal foramen in sinus surgery"],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "lacrimal_nerve",
      name: "Lacrimal nerve",
      layer: "nerve",
      drawn: true,
      summary: "The smallest branch of V1. It passes through the lateral part of the superior orbital fissure above the ring and runs forward along the upper border of lateral rectus, with the lacrimal artery, to the lacrimal gland and the lateral upper eyelid. It receives the postganglionic secretomotor fibres for the gland from the zygomatic nerve. Drawn for this app.",
      relations: ["Outside the muscle cone, above lateral rectus"],
      supply: { "Sensory": "Lacrimal gland, lateral conjunctiva and upper eyelid", "Secretomotor (carried)": "Lacrimal gland (from the pterygopalatine ganglion via the zygomatic nerve)" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ciliary_ganglion",
      name: "Ciliary ganglion",
      layer: "nerve",
      drawn: true,
      summary: "A small parasympathetic ganglion between the optic nerve and lateral rectus, about 1 cm in front of the apex. Preganglionic fibres from the Edinger–Westphal nucleus come in the nerve to inferior oblique and synapse here. Sensory fibres from the nasociliary nerve and sympathetic fibres pass through without synapsing. Drawn for this app as a small swelling.",
      relations: ["Lateral to the optic nerve and the ophthalmic artery, medial to lateral rectus"],
      supply: { "Parasympathetic": "Sphincter pupillae (constriction) and ciliary muscle (accommodation)" },
      surgical: [
        "Adie's tonic pupil is a lesion of the ganglion or short ciliary nerves: a large pupil that reacts slowly, better to near than to light.",
        "A retrobulbar block reaches the ganglion inside the cone, giving a dilated pupil and an anaesthetic, still eye."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "ciliary_roots",
      name: "Roots of the ciliary ganglion",
      layer: "nerve",
      drawn: true,
      summary: "A sensory root from the nasociliary nerve and a parasympathetic (motor) root from the nerve to inferior oblique; sympathetic fibres from the internal carotid plexus join as a third root or with the others. Drawn for this app.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "short_ciliary",
      name: "Short ciliary nerves",
      layer: "nerve",
      drawn: true,
      summary: "Six to ten fine nerves from the ganglion to the back of the globe around the optic nerve. They carry the postganglionic parasympathetic fibres, sensory fibres from the globe and sympathetic fibres. Drawn for this app (three shown).",
      relations: ["With the short posterior ciliary arteries"],
      supply: { "Parasympathetic": "Sphincter pupillae, ciliary muscle", "Sensory": "Globe, including the cornea" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "v2",
      name: "Maxillary nerve (V2) and infraorbital nerve",
      layer: "nerve",
      summary: "V2 crosses the pterygopalatine fossa and enters the orbit through the inferior orbital fissure as the infraorbital nerve. It runs forward in the floor (infraorbital groove, then canal) and comes out on the face at the infraorbital foramen.",
      relations: ["In the floor of the orbit, which is thinnest just medial to it"],
      supply: { "Sensory": "Lower eyelid, cheek, side of the nose, upper lip, upper front teeth" },
      surgical: ["Numbness of the cheek after an orbital floor or zygomatic fracture means the canal is involved. The nerve is protected when the floor is repaired."],
      danger: ["Floor fracture repair"],
      variations: [],
      refs: ["gray"]
    },

    // ---------- muscles ----------
    {
      id: "levator",
      name: "Levator palpebrae superioris",
      layer: "muscle",
      summary: "From the lesser wing above the optic canal, forward above superior rectus to a broad aponeurosis that inserts into the front of the upper tarsus and the skin of the lid (forming the lid crease). Müller's smooth muscle on its deep surface adds about 2 mm of lift under sympathetic control.",
      relations: ["Its aponeurosis divides the lacrimal gland into orbital and palpebral lobes", "The frontal nerve lies on it"],
      supply: { "Nerve": "Superior division of III; Müller's muscle: sympathetic", "Blood": "Ophthalmic artery muscular branches" },
      surgical: ["Age-related ptosis is usually a disinserted or stretched aponeurosis, repaired by advancing it onto the tarsus."],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "superior_rectus",
      name: "Superior rectus",
      layer: "muscle",
      summary: "From the upper part of the common tendinous ring, forward and laterally (about 23° to the visual axis) to the sclera about 7.7 mm behind the limbus. In primary position it elevates, adducts and intorts; it is a pure elevator when the eye is abducted 23°.",
      relations: ["Levator lies above it; the superior division of III enters its lower surface"],
      supply: { "Nerve": "Superior division of III" },
      surgical: ["Its tendon is joined to levator: large superior rectus recessions can change the lid position."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "inferior_rectus",
      name: "Inferior rectus",
      layer: "muscle",
      summary: "From the lower part of the ring to the sclera about 6.5 mm behind the limbus. It depresses, adducts and extorts, and is a pure depressor in 23° of abduction. It lies on the orbital floor.",
      relations: ["Lies directly on the floor and is linked to the lower lid retractors and Lockwood's ligament"],
      supply: { "Nerve": "Inferior division of III" },
      surgical: [
        "Trapped in a floor fracture ('white-eyed blowout' in children): restricted upgaze, pain, nausea and bradycardia from the oculocardiac reflex. It needs urgent release.",
        "Enlarged in thyroid eye disease, often the first muscle affected, with restricted elevation."
      ],
      danger: ["Floor fractures"],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "medial_rectus",
      name: "Medial rectus",
      layer: "muscle",
      summary: "From the medial part of the ring to the sclera about 5.5 mm behind the limbus, the closest insertion. A pure adductor. It lies against the lamina papyracea.",
      relations: ["Separated from the ethmoid sinuses only by the paper-thin lamina papyracea and the periorbita"],
      supply: { "Nerve": "Inferior division of III" },
      surgical: ["Injured through the lamina papyracea in endoscopic sinus surgery (shaver injury), causing a serious motility problem."],
      danger: ["Lamina papyracea in ethmoidectomy"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "lateral_rectus",
      name: "Lateral rectus",
      layer: "muscle",
      summary: "From two heads on the ring, bridging the superior orbital fissure, to the sclera about 6.9 mm behind the limbus. A pure abductor.",
      relations: ["VI enters its inner surface; the lacrimal nerve and artery run along its upper border"],
      supply: { "Nerve": "Abducens (VI)" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "superior_oblique",
      name: "Superior oblique and trochlea",
      layer: "muscle",
      summary: "From the body of the sphenoid above and medial to the optic canal, forward along the upper medial wall to a tendon that passes through the trochlea, a fibrocartilage pulley on the frontal bone. The tendon turns back and laterally under superior rectus to insert behind the equator. It intorts, depresses and abducts, and depresses best when the eye is adducted.",
      relations: ["IV enters its upper surface; the trochlea lies about 5 mm behind the rim at the superomedial angle"],
      supply: { "Nerve": "Trochlear (IV)" },
      surgical: [
        "The trochlea is lifted with the periosteum, not cut, in medial and frontal sinus approaches; injury causes diplopia.",
        "Brown syndrome: restricted elevation in adduction from a tight tendon or trochlea."
      ],
      danger: ["Superomedial orbital rim in frontal sinus and Lynch incisions"],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "inferior_oblique",
      name: "Inferior oblique",
      layer: "muscle",
      summary: "The only extraocular muscle that does not arise at the apex. It comes from the orbital floor just lateral to the nasolacrimal canal, passes back and laterally under inferior rectus and inserts behind the equator on the lateral side. It extorts, elevates and abducts, and elevates best when the eye is adducted.",
      relations: ["Divides the inferior orbit into front and back compartments at the floor; the nerve to it carries the ciliary ganglion's parasympathetic root"],
      supply: { "Nerve": "Inferior division of III" },
      surgical: ["Its origin is met at the anteromedial floor in transconjunctival approaches; it is lifted with the periosteum, or detached and reattached."],
      danger: ["Anteromedial floor in fracture repair and lower lid approaches"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "annulus",
      name: "Common tendinous ring (annulus of Zinn)",
      layer: "muscle",
      summary: "A fibrous ring around the optic canal and the medial part of the superior orbital fissure, from which the four recti arise. It divides the fissure into a part inside the muscle cone and a part outside it.",
      relations: [
        "Inside: optic nerve and ophthalmic artery (through the canal); superior and inferior divisions of III, nasociliary nerve, VI (through the fissure)",
        "Above, outside: lacrimal and frontal nerves, IV, superior ophthalmic vein"
      ],
      supply: {},
      surgical: ["Superior orbital fissure syndrome (III, IV, V1, VI) becomes orbital apex syndrome when the optic nerve is also involved."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },

    // ---------- globe and lids ----------
    {
      id: "globe",
      name: "Globe (sclera and cornea)",
      layer: "globe",
      summary: "About 24 mm across. The tough sclera is continuous with the clear cornea at the limbus and with the dural sheath of the optic nerve behind. It sits in the front of the orbit, protected by the rim, and is wrapped in Tenon's capsule, through which the muscle tendons pass.",
      relations: ["The vortex veins leave it behind the equator; the ciliary arteries and nerves enter around the optic nerve"],
      supply: { "Sensory": "Long and short ciliary nerves (V1)", "Blood": "Ciliary arteries, central retinal artery" },
      surgical: ["A sub-Tenon's block places anaesthetic in the space between Tenon's capsule and the sclera."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "inner_eye",
      name: "Iris, lens and retina",
      layer: "globe",
      summary: "Inner structures of the globe shown for orientation: the iris with its sphincter (parasympathetic) and dilator (sympathetic) muscles, the lens, and the retina lining the back of the eye.",
      relations: [],
      supply: { "Nerve": "Sphincter pupillae and ciliary muscle: short ciliary nerves (III parasympathetic); dilator pupillae: sympathetic via the long ciliary nerves" },
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "tarsi",
      name: "Tarsal plates",
      layer: "globe",
      summary: "Dense fibrous plates that stiffen the eyelids: about 10 mm high in the upper lid and 4 mm in the lower. They are held to the orbital rim by the medial and lateral canthal tendons, and the orbital septum attaches to them.",
      relations: ["Levator aponeurosis inserts on the upper tarsus; the lower lid retractors on the lower"],
      supply: {},
      surgical: [
        "Lateral canthotomy and inferior cantholysis cut the lateral canthal tendon to release the orbit in retrobulbar haemorrhage. It should be done within about 90 minutes of visual loss.",
        "The tarsal plates are the strength layer repaired in full-thickness lid lacerations."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "lockwood",
      name: "Suspensory (Lockwood's) ligament",
      layer: "globe",
      summary: "A hammock of fascia below the globe, formed from the sheaths of inferior rectus and inferior oblique and attached to the medial and lateral orbital walls. It holds the globe up when the floor is lost.",
      relations: [],
      supply: {},
      surgical: ["Why a maxillectomy that removes the floor but preserves Lockwood's ligament can leave the eye at the right height."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- lacrimal ----------
    {
      id: "lacrimal_gland",
      name: "Lacrimal gland",
      layer: "gland",
      summary: "In the lacrimal fossa of the frontal bone at the superolateral corner of the orbit. The levator aponeurosis divides it into a larger orbital lobe and a smaller palpebral lobe, and its ducts open into the upper lateral fornix through the palpebral lobe.",
      relations: ["The lacrimal nerve and artery enter it from behind"],
      supply: { "Secretomotor": "Superior salivatory nucleus → nervus intermedius → greater petrosal → Vidian nerve → pterygopalatine ganglion → zygomatic and lacrimal nerves", "Blood": "Lacrimal artery" },
      surgical: [
        "Removing the palpebral lobe cuts all the ducts, so it is avoided in lid surgery.",
        "Pleomorphic adenoma of the gland is removed whole with its capsule through a lateral orbitotomy, without biopsy, to avoid recurrence."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "lacrimal_drainage",
      name: "Lacrimal drainage system",
      layer: "gland",
      summary: "Tears drain through the upper and lower puncta into the canaliculi, usually a common canaliculus, and the lacrimal sac in its fossa between the anterior and posterior lacrimal crests. They continue down the nasolacrimal duct to the inferior meatus under the inferior turbinate, where the valve of Hasner sits.",
      relations: ["The sac lies behind the medial canthal tendon, in front of the medial orbital wall; the middle meatus and the front of the middle turbinate lie medial to it"],
      supply: {},
      surgical: [
        "Dacryocystorhinostomy (external or endoscopic) opens the sac into the middle meatus for a blocked nasolacrimal duct.",
        "The duct is at risk when the maxillary antrostomy is widened forwards in sinus surgery."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },

    // ---------- arteries ----------
    {
      id: "ophthalmic_artery",
      name: "Ophthalmic artery",
      layer: "artery",
      summary: "The first intradural branch of the internal carotid, just as it leaves the cavernous sinus. It enters the orbit through the optic canal below and lateral to the optic nerve, crosses over the nerve (usually) from lateral to medial with the nasociliary nerve, and runs forward along the medial wall. It ends as the supratrochlear and dorsal nasal arteries.",
      course: [
        { key: "origin", label: "Internal carotid", text: "From its supraclinoid part, medial to the anterior clinoid process." },
        { key: "canal", label: "Optic canal", text: "Below and lateral to the optic nerve, inside its dural sheath." },
        { key: "lacrimal", label: "Lacrimal artery", text: "Along the upper border of lateral rectus to the gland and lateral lids; also the central retinal and ciliary arteries near here." },
        { key: "supraorbital", label: "Supraorbital artery", text: "Up and forward with the supraorbital nerve." },
        { key: "ethmoidal", label: "Anterior ethmoidal foramen", text: "The anterior ethmoidal artery leaves the orbit to the anterior cranial fossa and nose; the posterior ethmoidal leaves just behind." },
        { key: "nose", label: "Nasal cavity", text: "Supplies the upper septum and lateral wall." }
      ],
      relations: ["Crosses the optic nerve with the nasociliary nerve; the central retinal artery enters the nerve from below"],
      supply: { "Territory": "Retina (central retinal), choroid and iris (ciliary), extraocular muscles, lacrimal gland, eyelids, forehead, ethmoid sinuses and upper nasal cavity" },
      surgical: [
        "Central retinal artery occlusion causes sudden painless loss of vision with a cherry-red spot.",
        "Its branches anastomose with the external carotid around the eye (angular, supraorbital, middle meningeal), which matters for embolisation and filler injections."
      ],
      danger: [],
      variations: ["Passes under rather than over the optic nerve in about 15%; can arise from the middle meningeal artery"],
      refs: ["gray", "rhoton"]
    },
    {
      id: "ophthalmic_branches",
      name: "Central retinal and ciliary arteries",
      layer: "artery",
      summary: "The central retinal artery enters the optic nerve about 1 cm behind the globe and runs in it to supply the inner retina. The short posterior ciliary arteries supply the choroid and optic disc. The two long posterior ciliary arteries run forward to the iris and ciliary body.",
      relations: [],
      supply: { "Territory": "Retina, choroid, optic nerve head, iris and ciliary body" },
      surgical: ["Giant cell arteritis blocks the short posterior ciliary arteries: anterior ischaemic optic neuropathy and sudden blindness."],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "lacrimal_artery",
      name: "Lacrimal artery",
      layer: "artery",
      summary: "Runs forward along the upper border of lateral rectus with the lacrimal nerve to the lacrimal gland and the lateral eyelids. A recurrent meningeal branch often joins the middle meningeal artery through the superior orbital fissure.",
      relations: [],
      supply: { "Territory": "Lacrimal gland, lateral lids and conjunctiva" },
      surgical: ["The meningo-lacrimal anastomosis is why embolising the middle meningeal artery can threaten the eye."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "supraorbital_artery",
      name: "Supraorbital and supratrochlear arteries",
      layer: "artery",
      summary: "The supraorbital artery runs forward under the roof with the supraorbital nerve and leaves through the notch; the supratrochlear artery, a terminal branch, leaves medially with the supratrochlear nerve.",
      relations: [],
      supply: { "Territory": "Forehead and scalp" },
      surgical: [
        "The supratrochlear artery is the pedicle of the paramedian forehead flap for nasal reconstruction.",
        "Filler injected into them can pass back to the ophthalmic artery and cause blindness."
      ],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ethmoidal_arteries",
      name: "Anterior and posterior ethmoidal arteries",
      layer: "artery",
      summary: "Leave the ophthalmic artery along the medial wall and pass through the anterior and posterior ethmoidal foramina in the frontoethmoidal suture, at the level of the cribriform plate. They supply the ethmoid sinuses, the dura of the anterior fossa and the upper nasal cavity.",
      relations: ["24–12–6: about 24 mm and 36 mm behind the anterior lacrimal crest; the optic canal about 6 mm behind the posterior one"],
      supply: { "Territory": "Ethmoid sinuses, upper septum and lateral nasal wall, anterior fossa dura" },
      surgical: [
        "Ligated through a medial canthal (Lynch) incision or endoscopically for epistaxis that sphenopalatine ligation does not control.",
        "Cut in sinus surgery, a retracted anterior ethmoidal artery can bleed into the orbit: an orbital haematoma that may need canthotomy."
      ],
      danger: ["The skull base just above them in ethmoidectomy"],
      variations: ["The anterior ethmoidal artery hangs below the skull base in a mesentery in some people"],
      refs: ["gray", "rontal", "scottbrown"]
    },
    {
      id: "ica",
      name: "Internal carotid artery (cavernous and clinoid parts)",
      layer: "context",
      summary: "Behind the orbit, in the cavernous sinus, giving the ophthalmic artery as it leaves the sinus.",
      relations: ["VI runs beside it in the sinus"],
      supply: {},
      surgical: ["A carotid–cavernous fistula arterialises the superior ophthalmic vein: pulsating proptosis, chemosis and a bruit."],
      danger: [],
      variations: [],
      refs: ["rhoton"]
    },

    // ---------- veins ----------
    {
      id: "ophthalmic_veins",
      name: "Superior and inferior ophthalmic veins",
      layer: "vein",
      summary: "Valveless. The superior ophthalmic vein starts at the medial canthus from the angular vein, runs back under superior rectus and leaves through the superior orbital fissure above the ring to the cavernous sinus. The inferior ophthalmic vein runs on the floor and drains to the superior vein or, through the inferior orbital fissure, to the pterygoid plexus.",
      relations: [],
      supply: {},
      surgical: [
        "Spread of infection from the face (the 'danger triangle') and orbit to the cavernous sinus: cavernous sinus thrombosis.",
        "The superior ophthalmic vein is used for transvenous embolisation of carotid–cavernous fistulas, and is enlarged on imaging when one is present."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "kanski"]
    },
    {
      id: "cavernous_sinus",
      name: "Cavernous sinus",
      layer: "context",
      summary: "Behind the apex, beside the sella. III, IV, V1 and V2 run in its lateral wall and VI and the internal carotid inside it; the ophthalmic veins drain into it.",
      relations: [],
      supply: {},
      surgical: ["Cavernous sinus thrombosis: proptosis, ophthalmoplegia and V1 numbness, which can spread to the other side through the intercavernous sinuses."],
      danger: [],
      variations: [],
      refs: ["rhoton"]
    },

    // ---------- bone ----------
    {
      id: "frontal",
      name: "Frontal bone (orbital plate and rim)",
      layer: "bone",
      summary: "Forms most of the roof and the upper rim, with the supraorbital notch, the lacrimal fossa laterally and the trochlear fovea medially. The roof is thin; the frontal sinus lies in front and above medially.",
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
      summary: "The lesser wing (with the optic canal) forms the back of the roof; the greater wing forms the back of the lateral wall; the fissure between them is the superior orbital fissure. The body forms the back of the medial wall.",
      relations: [],
      supply: {},
      surgical: ["Greater wing meningiomas thicken the lateral wall and push the eye forward."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ethmoid",
      name: "Ethmoid bone (lamina papyracea)",
      layer: "bone",
      summary: "The lamina papyracea forms most of the medial wall, paper-thin, between the orbit and the ethmoid air cells. The ethmoidal foramina lie along its upper border at the frontoethmoidal suture.",
      relations: [],
      supply: {},
      surgical: [
        "Ethmoid sinusitis spreads to the orbit through it (subperiosteal abscess, orbital cellulitis), graded by Chandler.",
        "Removed in endoscopic medial orbital decompression for thyroid eye disease."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "maxilla",
      name: "Maxilla (orbital floor)",
      layer: "bone",
      summary: "Its orbital surface forms most of the floor and the medial part of the lower rim. The floor slopes up as it goes back and is thinnest medial to the infraorbital groove; the maxillary sinus lies below.",
      relations: [],
      supply: {},
      surgical: ["The usual site of a blowout fracture. Repairs must find the intact posterior ledge, about 35–40 mm behind the rim, before the optic canal."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "zygomatic",
      name: "Zygomatic bone",
      layer: "bone",
      summary: "Forms the front of the lateral wall, the lateral rim and part of the floor. Whitnall's tubercle on its inner rim takes the lateral canthal tendon.",
      relations: [],
      supply: {},
      surgical: ["Displaced zygomatic fractures change orbital volume and the position of the lateral canthus."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "lacrimal_bone",
      name: "Lacrimal and nasal bones",
      layer: "bone",
      summary: "The lacrimal bone forms the back of the lacrimal fossa, with the posterior lacrimal crest; the frontal process of the maxilla carries the anterior lacrimal crest.",
      relations: [],
      supply: {},
      surgical: ["Removed (with part of the frontal process) to open the sac in dacryocystorhinostomy."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- foramina (pins) ----------
    {
      id: "f_optic",
      name: "Optic canal",
      layer: "foramina",
      pin: "optic_canal",
      summary: "In the lesser wing, between its two roots, at the apex.",
      relations: ["Transmits: optic nerve with its meninges, ophthalmic artery"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_sof",
      name: "Superior orbital fissure",
      layer: "foramina",
      pin: "superior_orbital_fissure",
      summary: "Between the lesser and greater wings of the sphenoid, divided by the common tendinous ring.",
      relations: ["Transmits: lacrimal, frontal and trochlear nerves and the superior ophthalmic vein (above the ring); superior and inferior divisions of III, nasociliary nerve and VI (inside the ring)"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "f_iof",
      name: "Inferior orbital fissure",
      layer: "foramina",
      pin: "inferior_orbital_fissure",
      summary: "Between the greater wing and the floor, opening to the pterygopalatine and infratemporal fossae (pin on V2 where it passes).",
      relations: ["Transmits: infraorbital and zygomatic nerves, infraorbital vessels, a branch of the inferior ophthalmic vein to the pterygoid plexus"],
      supply: {},
      surgical: ["The back limit of dissection along the lateral floor in fracture repair."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_aef",
      name: "Anterior ethmoidal foramen",
      layer: "foramina",
      pin: "anterior_ethmoidal_foramen",
      summary: "In the frontoethmoidal suture about 24 mm behind the anterior lacrimal crest.",
      relations: ["Transmits: anterior ethmoidal artery and nerve"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["rontal"]
    },
    {
      id: "f_pef",
      name: "Posterior ethmoidal foramen",
      layer: "foramina",
      pin: "posterior_ethmoidal_foramen",
      summary: "About 12 mm behind the anterior foramen and about 6 mm in front of the optic canal.",
      relations: ["Transmits: posterior ethmoidal artery and nerve"],
      supply: {},
      surgical: ["The last landmark before the optic canal in medial wall dissection."],
      danger: [],
      variations: [],
      refs: ["rontal"]
    },
    {
      id: "f_supraorbital",
      name: "Supraorbital notch",
      layer: "foramina",
      pin: "supraorbital_notch",
      summary: "On the upper rim at the junction of its medial third and lateral two-thirds.",
      relations: ["Transmits: supraorbital nerve and vessels"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_trochlea",
      name: "Trochlear fovea",
      layer: "foramina",
      pin: "trochlea",
      summary: "A small pit on the frontal bone at the superomedial angle for the cartilage pulley of superior oblique.",
      relations: [],
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
      landmark: false, // on the face below the rim
      summary: "On the maxilla about 7 mm below the rim, in line with the pupil.",
      relations: ["Transmits: infraorbital nerve and vessels"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  procedure: {
    title: "Orbital floor fracture repair through a transconjunctival approach",
    steps: [
      {
        title: "Decide and prepare",
        text: "Repair entrapment urgently (especially a 'white-eyed' blowout in a child); repair large defects or early enophthalmos electively. Check vision and pupils, protect the cornea and do a forced duction test.",
        show: ["bone", "globe", "muscle"],
        focus: ["maxilla", "inferior_rectus", "globe"]
      },
      {
        title: "Transconjunctival incision",
        text: "Incise the conjunctiva of the lower fornix below the tarsus. Dissect in front of the orbital septum (preseptal) down to the rim; add a lateral canthotomy and inferior cantholysis for more room.",
        show: ["bone", "globe", "muscle"],
        focus: ["tarsi", "globe", "zygomatic"]
      },
      {
        title: "Open the periosteum at the rim",
        text: "Incise the periosteum on the front of the lower rim, just below the arcus marginalis, and raise it over the rim to keep the septum intact.",
        show: ["bone", "globe"],
        focus: ["maxilla", "zygomatic"]
      },
      {
        title: "Subperiosteal dissection of the floor",
        text: "Lift the periorbita off the floor. Medially the inferior oblique origin is lifted with it. Keep the infraorbital nerve in its groove and canal in view.",
        show: ["bone", "muscle", "nerve"],
        focus: ["inferior_oblique", "v2", "maxilla"]
      },
      {
        title: "Free the herniated tissue",
        text: "Gently pull the herniated fat and inferior rectus back out of the maxillary sinus, all round the edges of the defect.",
        show: ["bone", "muscle", "globe"],
        focus: ["inferior_rectus", "lockwood", "maxilla"]
      },
      {
        title: "Find the posterior ledge",
        text: "Follow the floor back to stable bone at the back of the defect, usually 35–40 mm from the rim. Stay below the inferior orbital fissure laterally. Medially, the 24–12–6 rule places the optic canal about 42 mm behind the anterior lacrimal crest.",
        show: ["bone", "foramina", "nerve"],
        focus: ["f_iof", "f_pef", "f_optic", "cn2"]
      },
      {
        title: "Place the implant",
        text: "Shape titanium mesh, porous polyethylene or a patient-specific implant to rest on the posterior ledge and restore the floor's upward slope. It must not trap the nerve or press on the inferior orbital fissure.",
        show: ["bone", "nerve", "muscle"],
        focus: ["maxilla", "v2", "inferior_rectus"]
      },
      {
        title: "Check and close",
        text: "Repeat the forced duction test and check the pupil. Close the periosteum, repair the canthus if it was cut, and close the conjunctiva loosely.",
        show: ["bone", "globe", "muscle"],
        focus: ["globe", "tarsi", "inferior_rectus"]
      },
      {
        title: "After surgery",
        text: "Check vision regularly for the first hours: retrobulbar haemorrhage needs immediate canthotomy and cantholysis. No nose blowing for several weeks.",
        show: ["bone", "globe", "artery"],
        focus: ["tarsi", "ophthalmic_artery", "cn2"]
      }
    ],
    complications: [
      "Retrobulbar haemorrhage and loss of vision",
      "Persistent diplopia and enophthalmos",
      "Infraorbital nerve numbness",
      "Lower lid malposition (ectropion or entropion), especially after subciliary incisions",
      "Implant malposition, infection or extrusion",
      "Epiphora from injury to the lacrimal drainage system"
    ],
    refs: ["tessier", "kanski", "rontal"]
  },

  figures: [
    { id: "fig-orbit-apex", title: "Right orbital apex seen from the front: the common tendinous ring and what passes through the superior orbital fissure and optic canal", svg: "orbitApex" }
  ],

  quiz: [
    {
      q: "Which nerve passes through the superior orbital fissure outside (above) the common tendinous ring?",
      options: ["Nasociliary nerve", "Abducens nerve", "Trochlear nerve", "Inferior division of III"],
      answer: 2,
      explain: "Lacrimal, frontal and trochlear nerves (and the superior ophthalmic vein) pass above the ring; III, nasociliary and VI pass inside it."
    },
    {
      q: "The parasympathetic root of the ciliary ganglion comes from:",
      options: ["The nasociliary nerve", "The nerve to inferior oblique", "The greater petrosal nerve", "The internal carotid plexus"],
      answer: 1,
      explain: "Preganglionic fibres from the Edinger–Westphal nucleus travel in III and leave in the nerve to inferior oblique."
    },
    {
      q: "Which structure passes through the optic canal with the optic nerve?",
      options: ["Superior ophthalmic vein", "Ophthalmic artery", "Nasociliary nerve", "Central retinal vein"],
      answer: 1,
      explain: "The ophthalmic artery runs below and lateral to the nerve in the canal; the veins and other nerves use the superior orbital fissure."
    },
    {
      q: "Following the medial wall back from the anterior lacrimal crest, roughly how far is the optic canal?",
      options: ["About 24 mm", "About 30 mm", "About 42 mm", "About 60 mm"],
      answer: 2,
      explain: "24 mm to the anterior ethmoidal foramen, 12 mm more to the posterior ethmoidal foramen, then 6 mm to the optic canal."
    },
    {
      q: "Herpes zoster vesicles on the tip of the nose (Hutchinson's sign) mean involvement of which nerve?",
      options: ["Infraorbital", "Supratrochlear", "Nasociliary", "Lacrimal"],
      answer: 2,
      explain: "The external nasal branch of the anterior ethmoidal (nasociliary) nerve supplies the tip of the nose; the nasociliary also supplies the eye."
    },
    {
      q: "A patient with a trochlear palsy has most trouble when looking:",
      options: ["Up and out", "Down and in", "Straight up", "Out to the affected side"],
      answer: 1,
      explain: "Superior oblique depresses the eye best in adduction, so diplopia is worst looking down and in, as when reading or going downstairs."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the orbit and eye.",
    rhoton: "Rhoton AL Jr. Cranial Anatomy and Surgical Approaches. Lippincott Williams & Wilkins; 2003. The orbit.",
    rontal: "Rontal E, Rontal M, Guilford FT. Surgical anatomy of the orbit. Ann Otol Rhinol Laryngol. 1979;88(3 Pt 1):382–386.",
    tessier: "Tessier P. The conjunctival approach to the orbital floor and maxilla in congenital malformation and trauma. J Maxillofac Surg. 1973;1(1):3–8.",
    kanski: "Bowling B. Kanski's Clinical Ophthalmology: A Systematic Approach. 8th ed. Elsevier; 2016.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Chapters on the orbit, epistaxis and lacrimal surgery."
  }
};
