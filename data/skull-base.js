// Content for the skull base. Each structure id matches a mesh id in
// data/skull-base-meshes.js; foramina have no mesh and are shown as pins
// ("pin" names a point in the mesh header). "course" lists the waypoints of a
// traced nerve or vessel; each key matches a point in header.courses[id].

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.skull_base = {
  id: "skull_base",
  title: "Skull base",
  subtitle: "Cranial fossae, foramina, cranial nerves I–XII and the vessels that cross the skull base (both sides; courses traced on the right)",

  overview: {
    intro:
      "The skull base is the floor of the cranial cavity: the frontal, ethmoid, sphenoid, temporal and occipital bones. It is stepped into three fossae. Every cranial nerve and the major vessels of the brain pass through it, each through its own foramen or canal. Learning the skull base means following each nerve and vessel from its origin, through its foramen, to its branches. Select a cranial nerve or vessel and press 'Trace the course' to follow it on the model; the Foramina layer pins every opening.",
    boundaries: [
      { label: "Anterior cranial fossa", text: "Orbital plates of the frontal bone, cribriform plate of the ethmoid, lesser wings and planum of the sphenoid; ends at the lesser wings and the limbus" },
      { label: "Middle cranial fossa", text: "Body and greater wings of the sphenoid (sella turcica in the middle) and the squamous and petrous temporal bones; ends at the petrous ridges and dorsum sellae" },
      { label: "Posterior cranial fossa", text: "Clivus, the posterior surface of the petrous bones and the occipital bone around foramen magnum; roofed by the tentorium cerebelli" },
      { label: "External surface", text: "Faces the orbits, nose, nasopharynx, infratemporal fossa and upper neck" }
    ],
    contents: [
      "Foramina and canals: cribriform plate, optic canal, superior orbital fissure, foramina rotundum, ovale, spinosum and lacerum, carotid canal, internal acoustic meatus, jugular foramen, hypoglossal canal, foramen magnum, stylomastoid foramen",
      "Cranial nerves I–XII, from the brainstem and forebrain to their exits",
      "Internal carotid and vertebral arteries, the basilar artery and the circle of Willis; middle meningeal artery",
      "Cavernous sinus, petrosal and sigmoid sinuses and the jugular bulb",
      "Pituitary gland in the sella, optic chiasm above it"
    ],
    keyPoints: [
      "Anterior fossa: I. Middle fossa: II (optic canal), III, IV, V1 and VI (superior orbital fissure), V2 (rotundum), V3 (ovale), middle meningeal artery (spinosum). Posterior fossa: VII and VIII (internal acoustic meatus), IX, X, XI (jugular foramen), XII (hypoglossal canal), the spinal root of XI and the vertebral arteries (foramen magnum).",
      "The cavernous sinus holds III, IV, V1 and V2 in its lateral wall, and VI and the internal carotid inside it.",
      "VI has a long intracranial course (the longest subarachnoid course), climbing the clivus and bending over the petrous apex, which is why it is so often affected by raised pressure.",
      "The internal carotid has cervical, petrous, lacerum, cavernous, clinoid, ophthalmic and communicating segments (Bouthillier). It runs alongside the sphenoid sinus, where it can be injured in endonasal surgery.",
      "The facial nerve enters the internal acoustic meatus in its anterosuperior part and leaves the skull at the stylomastoid foramen."
    ],
    refs: ["gray", "rhoton", "bouthillier"]
  },

  layers: [
    { id: "bone", label: "Skull base", defaultOn: true },
    { id: "foramina", label: "Foramina (pins)", defaultOn: true },
    { id: "brain", label: "Brainstem, chiasm & pituitary", defaultOn: true },
    { id: "nerve", label: "Cranial nerves", defaultOn: true },
    { id: "artery", label: "Arteries", defaultOn: true },
    { id: "vein", label: "Veins & dural sinuses", defaultOn: true },
    { id: "deep", label: "Tentorium", defaultOn: false },
    { id: "context", label: "Face, mandible & C1–C2", defaultOn: false }
  ],

  structures: [
    // ---------- cranial nerves ----------
    {
      id: "cn1",
      name: "Olfactory nerve (I)",
      layer: "nerve",
      summary: "Bundles of olfactory filaments from the roof of the nose pass through the cribriform plate to the olfactory bulb, which lies in the olfactory groove beside the crista galli.",
      course: [
        { key: "bulb", label: "Olfactory bulb", text: "On the cribriform plate, under the frontal lobe; the olfactory tract runs back from it." },
        { key: "cribriform", label: "Cribriform plate", text: "Twenty or so bundles of filaments cross the plate from the olfactory mucosa high in the nasal cavity." }
      ],
      relations: ["The anterior ethmoidal artery crosses the cribriform plate laterally, a weak point in endoscopic sinus surgery"],
      supply: { "Sensory": "Smell" },
      surgical: [
        "Anterior skull base fractures can tear the filaments (anosmia) and the dura (CSF rhinorrhoea).",
        "The lateral lamella of the cribriform plate is the thinnest bone of the skull base; it is at risk in ethmoidectomy (Keros classification of olfactory fossa depth)."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "cn2",
      name: "Optic nerve (II)",
      layer: "nerve",
      summary: "Runs from the back of the eye through the optic canal to the optic chiasm above the sella. In the canal it is fixed to the bone and wrapped in dura, with the ophthalmic artery beneath it.",
      course: [
        { key: "chiasm", label: "Optic chiasm", text: "Nasal fibres cross here; the chiasm sits above the diaphragma sellae and the pituitary." },
        { key: "canal", label: "Optic canal", text: "Between the two roots of the lesser wing; the ophthalmic artery runs below the nerve." },
        { key: "orbit", label: "Eyeball", text: "Through the orbit inside the cone of extraocular muscles to the back of the globe." }
      ],
      relations: ["The optic canal bulges into the lateral wall of the sphenoid sinus; the lateral opticocarotid recess lies between it and the carotid"],
      supply: { "Sensory": "Vision" },
      surgical: [
        "A pituitary tumour growing up presses on the chiasm from below: bitemporal hemianopia.",
        "In some patients the bone over the optic nerve in the sphenoid (or an Onodi cell) is very thin or absent."
      ],
      danger: ["Optic canal decompression and sphenoid surgery near the optic prominence"],
      variations: ["Onodi (sphenoethmoidal) cells carry the optic nerve in the posterior ethmoid"],
      refs: ["gray", "rhoton"]
    },
    {
      id: "optic_chiasm",
      name: "Optic chiasm and tracts",
      layer: "brain",
      summary: "Where the optic nerves meet and the nasal half of each retina's fibres cross. The optic tracts run back around the cerebral peduncles.",
      relations: ["Above the diaphragma sellae and pituitary; in front of the infundibulum; the internal carotids lie on either side"],
      supply: {},
      surgical: ["A 'prefixed' or 'postfixed' chiasm changes how much room there is above the sella for transcranial approaches."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "cn3",
      name: "Oculomotor nerve (III)",
      layer: "nerve",
      summary: "Leaves the midbrain in the interpeduncular fossa, passes between the posterior cerebral and superior cerebellar arteries, runs in the roof and lateral wall of the cavernous sinus, and enters the orbit through the superior orbital fissure.",
      course: [
        { key: "origin", label: "Midbrain", text: "Interpeduncular fossa; the nerve passes between the posterior cerebral and superior cerebellar arteries, next to the posterior communicating artery." },
        { key: "cavernous", label: "Cavernous sinus", text: "Highest nerve in the lateral wall." },
        { key: "sof", label: "Superior orbital fissure", text: "Enters inside the common tendinous ring as superior and inferior divisions." },
        { key: "orbit", label: "Orbit", text: "Levator palpebrae, superior, medial and inferior recti, inferior oblique; parasympathetic fibres to the ciliary ganglion (pupil and accommodation)." }
      ],
      relations: [],
      supply: { "Motor": "Most extraocular muscles and levator palpebrae", "Parasympathetic": "Sphincter pupillae and ciliary muscle" },
      surgical: [
        "A posterior communicating artery aneurysm compresses the nerve: a 'surgical third' with a dilated pupil, because the pupillary fibres lie on the outside.",
        "Uncal herniation stretches the nerve over the tentorial edge."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "cn4",
      name: "Trochlear nerve (IV)",
      layer: "nerve",
      summary: "The thinnest cranial nerve and the only one to leave the back of the brainstem, below the inferior colliculus. It winds round the midbrain, under the tentorial edge, through the lateral wall of the cavernous sinus and the superior orbital fissure.",
      course: [
        { key: "origin", label: "Back of the midbrain", text: "Below the inferior colliculus; the fibres have crossed, so each nerve supplies the opposite superior oblique." },
        { key: "cavernous", label: "Cavernous sinus", text: "Lateral wall, below III." },
        { key: "sof", label: "Superior orbital fissure", text: "Outside the tendinous ring, above it." },
        { key: "orbit", label: "Superior oblique", text: "Enters the muscle's upper surface." }
      ],
      relations: ["Runs along the free edge of the tentorium, where it can be cut when the tentorium is opened"],
      supply: { "Motor": "Superior oblique" },
      surgical: ["Its long, thin course makes it vulnerable in head injury; patients tilt the head away from the affected side to avoid double vision."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "cn5",
      name: "Trigeminal nerve (V)",
      layer: "nerve",
      summary: "Leaves the side of the pons as a large sensory root and a small motor root, which cross the petrous apex into Meckel's cave. The trigeminal ganglion there gives the ophthalmic (V1), maxillary (V2) and mandibular (V3) divisions.",
      course: [
        { key: "origin", label: "Pons", text: "Mid-lateral pons, crossing the cerebellopontine cistern." },
        { key: "ganglion", label: "Trigeminal ganglion", text: "In Meckel's cave, a dural pouch over the petrous apex, just behind the cavernous sinus." },
        { key: "ovale", label: "Foramen ovale (V3)", text: "The mandibular division, joined by the motor root, leaves the skull here." }
      ],
      relations: ["The superior cerebellar artery can loop onto the root near the pons (neurovascular compression)"],
      supply: { "Sensory": "Face, scalp to the vertex, eye, nose, mouth, teeth and the anterior two-thirds of the tongue (general sensation)", "Motor": "Muscles of mastication, mylohyoid, anterior belly of digastric, tensor tympani, tensor veli palatini" },
      surgical: ["Trigeminal neuralgia: microvascular decompression of the root entry zone, or percutaneous procedures through foramen ovale."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "v1",
      name: "Ophthalmic nerve (V1)",
      layer: "nerve",
      summary: "Runs forward in the lateral wall of the cavernous sinus and divides into the lacrimal, frontal and nasociliary nerves, which enter the orbit through the superior orbital fissure.",
      course: [
        { key: "ganglion", label: "Trigeminal ganglion", text: "Upper division of the ganglion." },
        { key: "cavernous", label: "Cavernous sinus", text: "Lateral wall, below IV." },
        { key: "sof", label: "Superior orbital fissure", text: "Divides into lacrimal and frontal (outside the ring) and nasociliary (inside the ring) nerves." },
        { key: "orbit", label: "Orbit and forehead", text: "Cornea (corneal reflex), forehead, upper eyelid, dorsum of the nose; anterior ethmoidal nerve to the nose." }
      ],
      relations: [],
      supply: { "Sensory": "Eye, forehead, scalp, upper eyelid, nasal cavity roof and nasal dorsum" },
      surgical: ["Herpes zoster on the tip of the nose (Hutchinson's sign, nasociliary nerve) warns of eye involvement."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "v2",
      name: "Maxillary nerve (V2)",
      layer: "nerve",
      summary: "Runs in the lowest part of the cavernous sinus wall, leaves through foramen rotundum into the pterygopalatine fossa, and continues as the infraorbital nerve.",
      course: [
        { key: "ganglion", label: "Trigeminal ganglion", text: "Middle division." },
        { key: "rotundum", label: "Foramen rotundum", text: "In the greater wing, below the superior orbital fissure; it opens into the pterygopalatine fossa." },
        { key: "ppf", label: "Pterygopalatine fossa", text: "Branches to the pterygopalatine ganglion (nasal and palatine nerves), the zygomatic nerve and posterior superior alveolar nerves." },
        { key: "infraorbital", label: "Infraorbital nerve", text: "Through the inferior orbital fissure, along the orbital floor, to the infraorbital foramen: cheek, lower eyelid, side of the nose, upper lip." }
      ],
      relations: ["The vidian (pterygoid) canal lies below and medial to foramen rotundum in the sphenoid floor"],
      supply: { "Sensory": "Midface, upper teeth, palate, nasal cavity, maxillary sinus" },
      surgical: ["Orbital floor fractures can numb the cheek and upper lip through infraorbital nerve injury."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "v3",
      name: "Mandibular nerve (V3)",
      aka: "With the lingual and inferior alveolar nerves",
      layer: "nerve",
      summary: "Leaves through foramen ovale into the infratemporal fossa, joined by the motor root. Its anterior division is mainly motor (masticatory muscles, buccal nerve); the posterior division gives the auriculotemporal, lingual and inferior alveolar nerves.",
      course: [
        { key: "ovale", label: "Foramen ovale", text: "Into the infratemporal fossa, deep to lateral pterygoid; the otic ganglion lies on its medial side." },
        { key: "lingual", label: "Lingual nerve", text: "Leaves the posterior division; the chorda tympani joins it, bringing taste and secretomotor fibres." },
        { key: "mandibular_foramen", label: "Mandibular foramen", text: "The inferior alveolar nerve enters the mandible at the lingula, after giving the nerve to mylohyoid." },
        { key: "mental", label: "Mental foramen", text: "The mental nerve leaves below the second premolar: lower lip and chin." }
      ],
      relations: ["The middle meningeal artery passes up between the two roots of the auriculotemporal nerve"],
      supply: { "Sensory": "Lower face, lower teeth, tongue (general), temple, ear", "Motor": "Masseter, temporalis, pterygoids, mylohyoid, anterior belly of digastric, tensor tympani, tensor veli palatini" },
      surgical: ["An inferior alveolar nerve block is placed above the lingula on the medial ramus."],
      danger: ["Lingual nerve in third molar surgery and submandibular gland excision"],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "cn6",
      name: "Abducens nerve (VI)",
      layer: "nerve",
      summary: "Leaves the pontomedullary junction near the midline, climbs the clivus, bends sharply over the petrous apex in Dorello's canal, and runs inside the cavernous sinus beside the internal carotid to the superior orbital fissure.",
      course: [
        { key: "origin", label: "Pontomedullary junction", text: "Close to the midline, above the pyramid." },
        { key: "dorello", label: "Dorello's canal", text: "Under the petrosphenoidal (Gruber's) ligament at the petrous apex, where the nerve is fixed and bends sharply." },
        { key: "cavernous", label: "Cavernous sinus", text: "Inside the sinus, lateral to the internal carotid, not in its wall." },
        { key: "sof", label: "Superior orbital fissure", text: "Inside the common tendinous ring." },
        { key: "orbit", label: "Lateral rectus", text: "Abducts the eye." }
      ],
      relations: [],
      supply: { "Motor": "Lateral rectus" },
      surgical: [
        "Raised intracranial pressure stretches it over the petrous apex: a 'false localising' sixth nerve palsy.",
        "Petrous apicitis gives Gradenigo's syndrome: VI palsy, deep facial (V1) pain and otorrhoea.",
        "At risk in clival and cavernous sinus surgery."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "cn7",
      name: "Facial nerve (VII)",
      layer: "nerve",
      summary: "Leaves the pontomedullary junction with the nervus intermedius, crosses the cerebellopontine angle with VIII, and enters the internal acoustic meatus. It runs through the temporal bone in the facial canal (labyrinthine, tympanic and mastoid segments) and leaves through the stylomastoid foramen.",
      course: [
        { key: "origin", label: "Cerebellopontine angle", text: "Pontomedullary junction, in front of VIII." },
        { key: "iam", label: "Internal acoustic meatus", text: "Anterosuperior quadrant: above the transverse crest, in front of Bill's bar (which separates it from the superior vestibular nerve)." },
        { key: "chorda", label: "Chorda tympani", text: "Leaves the mastoid segment, crosses the middle ear and joins the lingual nerve (taste, submandibular and sublingual glands)." },
        { key: "stylomastoid", label: "Stylomastoid foramen", text: "Between the styloid and mastoid processes, where the trunk is found in parotidectomy." },
        { key: "face", label: "Facial muscles", text: "Through the parotid to the muscles of facial expression (see the Parotid module)." }
      ],
      relations: [
        "Geniculate ganglion at the genu, giving the greater petrosal nerve (lacrimation)",
        "Nerve to stapedius from the mastoid segment"
      ],
      supply: { "Motor": "Muscles of facial expression, stapedius, posterior belly of digastric, stylohyoid", "Taste": "Anterior two-thirds of the tongue (chorda tympani)", "Parasympathetic": "Lacrimal, nasal, submandibular and sublingual glands" },
      surgical: [
        "The level of a lesion can be worked out from which functions are lost: lacrimation (above the geniculate), stapedius reflex, then taste.",
        "In vestibular schwannoma surgery the nerve is stretched over the front of the tumour."
      ],
      danger: ["The tympanic segment can be dehiscent over the oval window in middle ear surgery"],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "chorda",
      name: "Chorda tympani",
      layer: "nerve",
      summary: "Branch of the facial nerve that crosses the middle ear between the malleus and incus and leaves through the petrotympanic fissure to join the lingual nerve.",
      relations: [],
      supply: { "Taste": "Anterior two-thirds of the tongue", "Parasympathetic": "Submandibular and sublingual glands (via the submandibular ganglion)" },
      surgical: ["Stretched or cut in middle ear surgery, causing a metallic taste."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "cn8",
      name: "Vestibulocochlear nerve (VIII)",
      layer: "nerve",
      summary: "Leaves the pontomedullary junction behind VII and enters the internal acoustic meatus, where it splits into the cochlear nerve and the superior and inferior vestibular nerves.",
      course: [
        { key: "origin", label: "Cerebellopontine angle", text: "Behind and lateral to VII." },
        { key: "iam", label: "Internal acoustic meatus", text: "Cochlear nerve anteroinferiorly; superior and inferior vestibular nerves posteriorly." }
      ],
      relations: ["The anterior inferior cerebellar artery loops into the cerebellopontine angle near VII and VIII"],
      supply: { "Sensory": "Hearing and balance" },
      surgical: ["Vestibular schwannomas arise from the vestibular nerves in the meatus and grow into the cerebellopontine angle."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "cn9",
      name: "Glossopharyngeal nerve (IX)",
      layer: "nerve",
      summary: "Rootlets leave the upper medulla behind the olive. The nerve leaves through the anteromedial (nervous) part of the jugular foramen, in front of X and XI, then runs down between the internal carotid and jugular vein to stylopharyngeus and the tongue base.",
      course: [
        { key: "origin", label: "Medulla", text: "Postolivary sulcus, uppermost of the rootlets." },
        { key: "jugular", label: "Jugular foramen", text: "In its own dural sheath in front of X; superior and inferior ganglia; gives the tympanic (Jacobson's) nerve." },
        { key: "neck", label: "Upper neck", text: "Between the internal carotid and internal jugular vein, then with stylopharyngeus to the pharynx and tongue base." }
      ],
      relations: [],
      supply: { "Sensory": "Posterior third of the tongue (taste and general), pharynx, middle ear, carotid sinus and body", "Motor": "Stylopharyngeus", "Parasympathetic": "Parotid (via the lesser petrosal nerve and otic ganglion)" },
      surgical: ["Glomus jugulare tumours and jugular foramen schwannomas affect IX–XI together."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "cn10",
      name: "Vagus nerve (X)",
      layer: "nerve",
      summary: "Rootlets leave the medulla below IX. It leaves through the jugular foramen with IX and XI, where its superior ganglion lies, and the inferior (nodose) ganglion lies just below.",
      course: [
        { key: "origin", label: "Medulla", text: "Postolivary sulcus, below IX." },
        { key: "jugular", label: "Jugular foramen", text: "Vascular part, behind IX, with XI; the auricular branch (Arnold's) leaves here." },
        { key: "neck", label: "Carotid sheath", text: "Down the neck between the carotid and jugular vein." }
      ],
      relations: [],
      supply: { "Motor": "Pharynx, soft palate (except tensor veli palatini) and larynx", "Sensory": "Larynx, pharynx, ear canal (Arnold's nerve), thoracic and abdominal viscera", "Parasympathetic": "Heart, lungs, gut" },
      surgical: ["A jugular foramen lesion (Vernet's syndrome) combines hoarseness and swallowing problems with weakness of sternocleidomastoid and trapezius."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "cn11",
      name: "Accessory nerve (XI)",
      layer: "nerve",
      summary: "Its spinal root rises from the upper cervical cord, enters the skull through foramen magnum, joins the cranial rootlets and leaves through the jugular foramen.",
      course: [
        { key: "origin", label: "Medulla and cervical cord", text: "Cranial rootlets below X; spinal rootlets from C1 to about C5." },
        { key: "magnum", label: "Foramen magnum", text: "The spinal root climbs into the skull behind the vertebral artery." },
        { key: "jugular", label: "Jugular foramen", text: "Leaves with X through the vascular part, behind IX; the cranial fibres join the vagus." },
        { key: "neck", label: "Neck", text: "Crosses the internal jugular vein to sternocleidomastoid and across the posterior triangle to trapezius." }
      ],
      relations: [],
      supply: { "Motor": "Sternocleidomastoid and trapezius" },
      surgical: ["See the Lateral neck module for its course in level II and the posterior triangle."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "cn12",
      name: "Hypoglossal nerve (XII)",
      layer: "nerve",
      summary: "Rootlets leave the medulla between the pyramid and olive and unite in the hypoglossal canal above the occipital condyle.",
      course: [
        { key: "origin", label: "Medulla", text: "Preolivary sulcus, between pyramid and olive." },
        { key: "canal", label: "Hypoglossal canal", text: "Above the occipital condyle, medial to the jugular foramen." },
        { key: "neck", label: "Upper neck", text: "Down between the internal carotid and jugular vein, then forward across the carotids to the tongue (see the Carotid triangle module)." }
      ],
      relations: [],
      supply: { "Motor": "Tongue muscles except palatoglossus" },
      surgical: ["Condylar and craniovertebral junction approaches put the canal at risk."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },

    // ---------- brain ----------
    {
      id: "brainstem",
      name: "Brainstem",
      aka: "Midbrain, pons and medulla",
      layer: "brain",
      summary: "Lies on the clivus. Cranial nerves III and IV leave the midbrain, V the pons, VI–VIII the pontomedullary junction, and IX–XII the medulla.",
      relations: ["The basilar artery runs up its front; the vertebral arteries join at the lower pons"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "pituitary",
      name: "Pituitary gland",
      aka: "Adenohypophysis and neurohypophysis",
      layer: "brain",
      summary: "Sits in the sella turcica (hypophyseal fossa) of the sphenoid body, covered by the diaphragma sellae and connected to the hypothalamus by the infundibulum.",
      relations: [
        "Above: diaphragma sellae and the optic chiasm",
        "On each side: the cavernous sinus with the internal carotid and VI",
        "Below and in front: the sphenoid sinus, the route for transsphenoidal surgery"
      ],
      supply: {},
      surgical: ["Most pituitary adenomas are removed through the nose and sphenoid sinus (see Surgery)."],
      danger: ["Intercavernous sinuses in the dura over the gland bleed when the dura is opened"],
      variations: [],
      refs: ["gray", "cappabianca"]
    },

    // ---------- arteries ----------
    {
      id: "ica",
      name: "Internal carotid artery",
      layer: "artery",
      summary: "Enters the carotid canal in the petrous bone, turns forward and medially, crosses above foramen lacerum, then runs up and forward through the cavernous sinus (the carotid siphon) and leaves it medial to the anterior clinoid to divide below the brain.",
      course: [
        { key: "neck", label: "Cervical segment (C1)", text: "No branches in the neck." },
        { key: "canal", label: "Carotid canal (C2, petrous)", text: "Turns forward and medially in the petrous bone, in front of the cochlea; caroticotympanic branches." },
        { key: "lacerum", label: "Lacerum segment (C3)", text: "Passes above, not through, foramen lacerum, then turns up." },
        { key: "cavernous", label: "Cavernous segment (C4)", text: "With VI alongside; meningohypophyseal and inferolateral trunks. It bulges into the lateral wall of the sphenoid sinus." },
        { key: "ophthalmic", label: "Ophthalmic artery (C6)", text: "Leaves through the distal dural ring and gives the ophthalmic artery, which enters the optic canal below the optic nerve." },
        { key: "terminal", label: "Termination (C7)", text: "Gives the posterior communicating and anterior choroidal arteries, then divides into the anterior and middle cerebral arteries." }
      ],
      relations: ["Segments (Bouthillier): C1 cervical, C2 petrous, C3 lacerum, C4 cavernous, C5 clinoid, C6 ophthalmic, C7 communicating"],
      supply: { "Supplies": "Most of the cerebral hemisphere and the eye" },
      surgical: [
        "In endonasal surgery the carotid prominence in the sphenoid sinus can have thin or absent bone (dehiscent in a minority). Sinus septations often run to it, so remove them without twisting.",
        "Carotid injury is managed with packing, then angiography."
      ],
      danger: ["Sphenoid sinus septa inserting on the carotid prominence"],
      variations: ["An aberrant carotid can run through the middle ear and look like a red mass behind the drum"],
      refs: ["bouthillier", "rhoton", "gray"]
    },
    {
      id: "vertebral",
      name: "Vertebral arteries",
      layer: "artery",
      summary: "Leave the foramen transversarium of the atlas, run on its posterior arch, pierce the dura and enter the skull through foramen magnum, then join at the lower pons to form the basilar artery.",
      course: [
        { key: "atlas", label: "Atlas (V3 segment)", text: "Out of the foramen transversarium of C1 and round its lateral mass in the groove on the posterior arch." },
        { key: "magnum", label: "Foramen magnum (V4)", text: "Through the dura into the skull; gives the posterior inferior cerebellar artery." },
        { key: "basilar", label: "Basilar artery", text: "Joins the other vertebral artery at the pontomedullary junction." }
      ],
      relations: [],
      supply: { "Supplies": "Brainstem, cerebellum, occipital lobes (via the basilar and posterior cerebral arteries)" },
      surgical: ["At risk in far-lateral approaches and C1 lateral mass screws."],
      danger: [],
      variations: ["One vertebral artery is often dominant; one may end in the posterior inferior cerebellar artery"],
      refs: ["gray", "rhoton"]
    },
    {
      id: "basilar",
      name: "Basilar artery",
      layer: "artery",
      summary: "Runs up the front of the pons on the clivus and divides into the two posterior cerebral arteries.",
      course: [
        { key: "formed", label: "Formed", text: "At the pontomedullary junction from both vertebral arteries." },
        { key: "aica", label: "Anterior inferior cerebellar artery", text: "To the cerebellopontine angle, near VII and VIII." },
        { key: "sca", label: "Superior cerebellar artery", text: "Below III." },
        { key: "top", label: "Basilar tip", text: "Divides into the posterior cerebral arteries; III passes between them and the superior cerebellar arteries." }
      ],
      relations: ["VI arises beside its lower end"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "pca",
      name: "Posterior cerebral and posterior communicating arteries",
      layer: "artery",
      summary: "The posterior cerebral artery curves round the midbrain from the basilar tip; the posterior communicating artery joins it to the internal carotid, closing the circle of Willis.",
      relations: ["III runs between the posterior cerebral and superior cerebellar arteries and beside the posterior communicating artery"],
      supply: {},
      surgical: [],
      danger: [],
      variations: ["A fetal posterior cerebral artery fills mainly from the internal carotid"],
      refs: ["gray"]
    },
    {
      id: "cerebellar_arteries",
      name: "Cerebellar arteries",
      aka: "Superior, anterior inferior and posterior inferior",
      layer: "artery",
      summary: "The superior and anterior inferior cerebellar arteries come from the basilar; the posterior inferior from the vertebral.",
      relations: ["Loops of these arteries can compress V, VII or IX at the brainstem (neurovascular compression syndromes)"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "anterior_circulation",
      name: "Middle and anterior cerebral arteries",
      layer: "artery",
      summary: "The terminal branches of the internal carotid, running laterally into the Sylvian fissure and medially above the optic chiasm.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ophthalmic_artery",
      name: "Ophthalmic artery",
      layer: "artery",
      summary: "First intradural branch of the internal carotid; enters the orbit through the optic canal below the optic nerve.",
      relations: [],
      supply: { "Supplies": "Eye (central retinal artery), orbit, ethmoid air cells and forehead" },
      surgical: ["Its anterior and posterior ethmoidal branches cross the ethmoid roof and are tied in severe epistaxis."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "middle_meningeal",
      name: "Middle meningeal artery",
      layer: "artery",
      summary: "Branch of the maxillary artery in the infratemporal fossa that enters the skull through foramen spinosum and runs in the extradural space.",
      course: [
        { key: "maxillary", label: "From the maxillary artery", text: "First part of the maxillary artery, deep to the neck of the mandible, between the roots of the auriculotemporal nerve." },
        { key: "spinosum", label: "Foramen spinosum", text: "Behind and lateral to foramen ovale." },
        { key: "end", label: "Extradural course", text: "Divides into anterior and posterior branches; the anterior branch runs under the pterion." }
      ],
      relations: [],
      supply: { "Supplies": "Dura and inner table of the skull" },
      surgical: ["A fracture at the pterion tears the anterior branch: extradural haematoma."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "maxillary_artery",
      name: "Maxillary artery",
      layer: "artery",
      summary: "Terminal branch of the external carotid, running forward through the infratemporal fossa to the pterygopalatine fossa, where it ends as the sphenopalatine artery.",
      relations: [],
      supply: { "Supplies": "Deep face, teeth, nose (sphenopalatine), palate, dura (middle meningeal)" },
      surgical: ["Endoscopic sphenopalatine artery ligation for posterior epistaxis."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- veins and sinuses ----------
    {
      id: "cavernous_sinus",
      name: "Cavernous sinus",
      layer: "vein",
      summary: "A venous channel on each side of the sella, from the superior orbital fissure to the petrous apex. III, IV, V1 and V2 run in its lateral wall; the internal carotid and VI run through it.",
      relations: [
        "Drains the ophthalmic veins and sphenoparietal sinus; empties into the superior and inferior petrosal sinuses",
        "Connected to the other side by intercavernous sinuses round the pituitary"
      ],
      supply: {},
      surgical: [
        "Infection from the face or sphenoid can spread to it (cavernous sinus thrombosis): proptosis, ophthalmoplegia (VI first), V1 sensory loss.",
        "A carotid–cavernous fistula causes pulsating proptosis and chemosis."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "sigmoid_sinus",
      name: "Transverse and sigmoid sinuses",
      layer: "vein",
      summary: "The transverse sinus runs from the confluence of sinuses along the tentorium; the sigmoid sinus curves down behind the mastoid to the jugular bulb in the jugular foramen.",
      course: [
        { key: "confluence", label: "Confluence of sinuses", text: "At the internal occipital protuberance." },
        { key: "sigmoid", label: "Sigmoid sinus", text: "Turns down behind the mastoid antrum, in an S-shaped groove." },
        { key: "jugular", label: "Jugular bulb", text: "In the posterolateral (vascular) part of the jugular foramen, becoming the internal jugular vein." },
        { key: "neck", label: "Internal jugular vein", text: "Down the neck in the carotid sheath." }
      ],
      relations: ["Z-Anatomy places the jugular bulb about 2 cm lateral to where its lower cranial nerves leave the skull; in life both pass through the same foramen, nerves in front and medially"],
      supply: {},
      surgical: ["Exposed in mastoidectomy and translabyrinthine and retrosigmoid approaches; infection can cause sigmoid sinus thrombosis."],
      danger: [],
      variations: ["A high jugular bulb can reach the middle ear floor"],
      refs: ["gray", "fisch"]
    },
    {
      id: "petrosal_sinuses",
      name: "Superior and inferior petrosal sinuses",
      layer: "vein",
      summary: "Drain the cavernous sinus backwards: the superior along the petrous ridge to the transverse–sigmoid junction, the inferior along the petroclival fissure to the jugular bulb.",
      relations: [],
      supply: {},
      surgical: ["Inferior petrosal sinus sampling localises ACTH-secreting pituitary tumours."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ijv",
      name: "Internal jugular vein (upper end)",
      layer: "vein",
      summary: "Begins at the jugular bulb and runs down the neck lateral to the carotid.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "tentorium",
      name: "Tentorium cerebelli",
      layer: "deep",
      summary: "A tent of dura between the cerebrum and cerebellum, attached to the petrous ridges and the grooves for the transverse sinuses. Its free edge encircles the midbrain.",
      relations: ["IV runs along its free edge; III passes beside it into the cavernous sinus roof"],
      supply: {},
      surgical: ["Herniation of the uncus over its free edge compresses III and the midbrain."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- bones ----------
    {
      id: "sphenoid",
      name: "Sphenoid bone",
      layer: "bone",
      summary: "The keystone of the skull base: a body containing the sphenoid sinus and the sella turcica, lesser wings (optic canals), greater wings (rotundum, ovale, spinosum) and pterygoid processes.",
      relations: ["The superior orbital fissure lies between the lesser and greater wings"],
      supply: {},
      surgical: ["Its sinus is the route to the pituitary; pneumatisation (sellar, presellar or conchal) decides how easy the approach is."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "temporal",
      name: "Temporal bones",
      layer: "bone",
      summary: "Their petrous parts separate the middle and posterior fossae and contain the inner ear, the facial canal and the carotid canal; the mastoid and styloid processes lie below.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "occipital",
      name: "Occipital bone",
      layer: "bone",
      summary: "Surrounds foramen magnum; its basilar part forms the lower clivus and its condyles articulate with the atlas. The hypoglossal canals pass above the condyles.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "ethmoid",
      name: "Ethmoid bone",
      layer: "bone",
      summary: "The cribriform plate and crista galli in the anterior fossa floor; the ethmoid air cells and the upper nasal septum below.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "frontal",
      name: "Frontal bone (orbital plates)",
      layer: "bone",
      summary: "Its orbital plates form most of the anterior cranial fossa floor and the orbital roofs. The vault above has been removed in the model.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "atlas_axis",
      name: "Atlas and axis (C1–C2)",
      layer: "context",
      summary: "The craniovertebral junction below foramen magnum.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "facial_skeleton",
      name: "Facial skeleton",
      aka: "Maxillae, palatine bones, vomer, zygomatic and nasal bones",
      layer: "context",
      summary: "Hangs from the front of the skull base. The vomer and palatine bones meet the sphenoid body at the back of the nose, on the endonasal route to the sella.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "mandible",
      name: "Mandible",
      layer: "context",
      summary: "Its condyles sit in the mandibular fossae of the temporal bones, just in front of the external acoustic meatus.",
      relations: [],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },

    // ---------- foramina (pins) ----------
    {
      id: "f_cribriform",
      name: "Cribriform plate",
      layer: "foramina",
      pin: "cribriform_plate",
      summary: "Perforated plate of the ethmoid in the anterior fossa floor.",
      relations: ["Transmits: olfactory nerve filaments (I); anterior ethmoidal nerve and vessels pass at its edge"],
      supply: {},
      surgical: ["Site of CSF leak after trauma or ethmoid surgery."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_optic",
      name: "Optic canal",
      layer: "foramina",
      pin: "optic_canal",
      summary: "Between the roots of the lesser wing of the sphenoid.",
      relations: ["Transmits: optic nerve (II) with its meninges, ophthalmic artery"],
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
      summary: "Cleft between the lesser and greater wings of the sphenoid, divided by the common tendinous ring.",
      relations: [
        "Inside the ring: superior and inferior divisions of III, nasociliary nerve (V1), VI",
        "Outside the ring: IV, frontal and lacrimal nerves (V1), superior ophthalmic vein"
      ],
      supply: {},
      surgical: ["Superior orbital fissure syndrome: ophthalmoplegia, ptosis and V1 sensory loss; with optic nerve involvement it is the orbital apex syndrome."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_rotundum",
      name: "Foramen rotundum",
      layer: "foramina",
      pin: "foramen_rotundum",
      summary: "In the greater wing of the sphenoid, opening forward into the pterygopalatine fossa.",
      relations: ["Transmits: maxillary nerve (V2)"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_vidian",
      name: "Pterygoid (vidian) canal",
      layer: "foramina",
      pin: "pterygoid_canal",
      summary: "Runs forward through the base of the pterygoid process from foramen lacerum to the pterygopalatine fossa.",
      relations: ["Transmits: nerve of the pterygoid canal (greater and deep petrosal nerves) and its artery"],
      supply: {},
      surgical: ["Followed backwards in endoscopic surgery, it leads to the anterior genu of the petrous carotid."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "f_ovale",
      name: "Foramen ovale",
      layer: "foramina",
      pin: "foramen_ovale",
      summary: "In the greater wing, lateral to foramen lacerum.",
      relations: ["Transmits: mandibular nerve (V3) and motor root of V, accessory meningeal artery, lesser petrosal nerve (often), emissary veins"],
      supply: {},
      surgical: ["Percutaneous treatments for trigeminal neuralgia are placed through it."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_spinosum",
      name: "Foramen spinosum",
      layer: "foramina",
      pin: "foramen_spinosum",
      summary: "Behind and lateral to foramen ovale, near the spine of the sphenoid.",
      relations: ["Transmits: middle meningeal artery and vein, meningeal branch of V3 (nervus spinosus)"],
      supply: {},
      surgical: ["A landmark in middle fossa approaches; the artery is coagulated and divided here to lift the dura."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "f_lacerum",
      name: "Foramen lacerum",
      layer: "foramina",
      pin: "foramen_lacerum",
      summary: "A gap between the petrous apex, sphenoid body and basiocciput, closed by cartilage in life.",
      relations: ["Nothing passes all the way through it except small vessels; the internal carotid crosses above it, and the greater petrosal nerve joins the deep petrosal nerve over it"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_carotid",
      name: "Carotid canal",
      layer: "foramina",
      pin: "carotid_canal",
      summary: "Opens on the underside of the petrous bone in front of the jugular foramen and runs forward and medially to the petrous apex.",
      relations: ["Transmits: internal carotid artery with its sympathetic plexus and venous plexus"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_iam",
      name: "Internal acoustic meatus",
      layer: "foramina",
      pin: "internal_acoustic_meatus",
      summary: "On the posterior surface of the petrous bone, divided at its fundus by the transverse (falciform) crest and Bill's bar.",
      relations: [
        "Transmits: facial nerve (anterosuperior) with nervus intermedius, cochlear nerve (anteroinferior), superior and inferior vestibular nerves (posterior), labyrinthine artery",
        "Memory aid: 'seven up, Coke down'"
      ],
      supply: {},
      surgical: ["Widened by vestibular schwannomas."],
      danger: [],
      variations: [],
      refs: ["gray", "rhoton"]
    },
    {
      id: "f_jugular",
      name: "Jugular foramen",
      layer: "foramina",
      pin: "jugular_foramen",
      summary: "Between the petrous temporal and occipital bones. Its anteromedial (nervous) part holds IX with the inferior petrosal sinus; its posterolateral (vascular) part holds the jugular bulb with X and XI (pin at the nerves' exit).",
      relations: ["Transmits: inferior petrosal sinus, IX, X, XI, the jugular bulb (start of the internal jugular vein), meningeal branches of the ascending pharyngeal and occipital arteries"],
      supply: {},
      surgical: [
        "Jugular foramen (Vernet's) syndrome: IX, X and XI palsies. With XII also involved it is Collet–Sicard syndrome; with XII and the cervical sympathetic chain (Horner's), Villaret's syndrome.",
        "Glomus jugulare tumours (paragangliomas) arise here; the Fisch infratemporal fossa type A approach exposes it."
      ],
      danger: [],
      variations: [],
      refs: ["gray", "fisch"]
    },
    {
      id: "f_hypoglossal",
      name: "Hypoglossal canal",
      layer: "foramina",
      pin: "hypoglossal_canal",
      summary: "Above the occipital condyle, medial to the jugular foramen.",
      relations: ["Transmits: hypoglossal nerve (XII), a meningeal branch of the ascending pharyngeal artery, a venous plexus"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_condylar",
      name: "Condylar canal",
      layer: "foramina",
      pin: "condylar_canal",
      summary: "Behind the occipital condyle (often absent on one side).",
      relations: ["Transmits: an emissary vein from the sigmoid sinus"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_magnum",
      name: "Foramen magnum",
      layer: "foramina",
      pin: "foramen_magnum",
      summary: "The largest foramen, in the occipital bone.",
      relations: ["Transmits: medulla becoming the spinal cord, vertebral arteries, spinal roots of XI, anterior and posterior spinal arteries, the tectorial membrane and the apical and alar ligaments"],
      supply: {},
      surgical: ["Raised pressure can push the cerebellar tonsils down through it (coning)."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_stylomastoid",
      name: "Stylomastoid foramen",
      layer: "foramina",
      pin: "stylomastoid_foramen",
      summary: "Between the styloid and mastoid processes on the underside of the temporal bone.",
      relations: ["Transmits: facial nerve (VII), stylomastoid artery"],
      supply: {},
      surgical: ["In young children the mastoid is undeveloped and the foramen is close to the surface, so the nerve is at risk from a standard postauricular incision."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_mental",
      name: "Mental foramen",
      layer: "foramina",
      pin: "mental_foramen",
      landmark: false, // on the mandible, outside the skull base; pinned on V3's course instead
      summary: "On the outer mandible below the second premolar (shown with the mandible layer for V3's course).",
      relations: ["Transmits: mental nerve and vessels"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray"]
    }
  ],

  procedure: {
    title: "Endoscopic endonasal transsphenoidal approach to the pituitary",
    atRisk: [{"id": "ica", "why": "Lateral to the sella in the cavernous sinus: catastrophic bleeding"}, {"id": "cavernous_sinus", "why": "Lateral limit of the exposure: venous bleeding and cranial nerve palsies"}, {"id": "optic_chiasm", "why": "Above the sella: visual field loss"}, {"id": "cn2", "why": "In the optico-carotid region of the sphenoid"}, {"id": "cn6", "why": "The most medial nerve in the cavernous sinus: double vision"}],
    steps: [
      {
        title: "Position and preparation",
        text: "Supine, head slightly extended and turned towards the surgeon, with image guidance registered. Decongest the nose. A 0° endoscope is used, often by two surgeons working through both nostrils.",
        show: ["bone", "brain", "artery", "context"],
        focus: ["facial_skeleton", "sphenoid", "pituitary"]
      },
      {
        title: "Nasal phase",
        text: "Lateralise the middle turbinates. Find the sphenoid ostium in the sphenoethmoidal recess, medial to the superior turbinate and about 1.5 cm above the choana. If a CSF leak is expected, raise a nasoseptal flap on the posterior septal artery and park it in the nasopharynx.",
        show: ["bone", "context", "artery"],
        focus: ["facial_skeleton", "sphenoid", "maxillary_artery"]
      },
      {
        title: "Sphenoidotomy",
        text: "Remove the posterior septum and the sphenoid rostrum and join the two ostia into a wide sphenoidotomy.",
        show: ["bone", "context", "brain"],
        focus: ["sphenoid", "facial_skeleton"]
      },
      {
        title: "Sphenoid sinus landmarks",
        text: "Take down the intersinus septa carefully, as they often insert on the carotid prominence. Identify the sella in the middle, the planum above, the clival recess below, the carotid prominences laterally, and the optic prominences with the lateral opticocarotid recess between optic nerve and carotid.",
        show: ["bone", "brain", "artery", "nerve"],
        focus: ["sphenoid", "ica", "cn2", "pituitary"]
      },
      {
        title: "Open the sellar floor",
        text: "Thin and remove the bone of the sellar floor from carotid to carotid, using navigation and a micro-Doppler to stay medial to the arteries.",
        show: ["bone", "brain", "artery", "vein"],
        focus: ["ica", "cavernous_sinus", "pituitary"]
      },
      {
        title: "Open the dura",
        text: "Open the dura in a cross or a rectangle, avoiding the superior and inferior intercavernous sinuses. The cavernous sinus, with the carotid and VI inside it, lies on each side.",
        show: ["bone", "brain", "artery", "vein", "nerve"],
        focus: ["cavernous_sinus", "cn6", "pituitary"]
      },
      {
        title: "Remove the tumour",
        text: "Remove the adenoma with curettes and suction, inferiorly and laterally first and the suprasellar part last, so the diaphragma does not drop early and hide tumour. Preserve the normal gland, usually pushed up and back.",
        show: ["brain", "artery", "nerve", "vein"],
        focus: ["pituitary", "optic_chiasm", "cn2"]
      },
      {
        title: "Check for a leak and reconstruct",
        text: "Look for CSF with a Valsalva. A small leak is repaired with fat or fascia; a large one with a multilayer repair covered by the nasoseptal flap.",
        show: ["bone", "brain", "context"],
        focus: ["sphenoid", "pituitary"]
      },
      {
        title: "After surgery",
        text: "Watch fluid balance and sodium for diabetes insipidus or SIADH, give steroid cover until the adrenal axis is checked, and test vision.",
        show: ["bone", "brain", "nerve"],
        focus: ["pituitary", "optic_chiasm"]
      }
    ],
    complications: [
      "CSF leak and meningitis",
      "Internal carotid injury, which can be fatal; pack, control blood pressure, then angiography (pseudoaneurysm can appear later)",
      "Visual deterioration from chiasm or optic nerve injury or haematoma",
      "Diabetes insipidus, SIADH and hypopituitarism",
      "Epistaxis from the sphenopalatine or posterior septal arteries; crusting, synechiae and reduced smell",
      "Ophthalmoplegia (III, IV, VI) after cavernous sinus work"
    ],
    refs: ["cappabianca", "hadad", "rhoton", "scottbrown"]
  },

  figures: [
    { id: "fig-skull-base", title: "Internal skull base: foramina and what passes through them (right side labelled)", svg: "skullBase" }
  ],

  quiz: [
    {
      q: "Which structure passes through foramen ovale?",
      options: ["Maxillary nerve (V2)", "Mandibular nerve (V3)", "Middle meningeal artery", "Facial nerve"],
      answer: 1,
      explain: "V3 with the motor root of V leaves through foramen ovale; V2 uses foramen rotundum and the middle meningeal artery foramen spinosum."
    },
    {
      q: "Which cranial nerve leaves the back of the brainstem?",
      options: ["Oculomotor (III)", "Trochlear (IV)", "Abducens (VI)", "Facial (VII)"],
      answer: 1,
      explain: "IV leaves the dorsal midbrain below the inferior colliculus, after crossing, and winds round to the front."
    },
    {
      q: "Which nerve runs inside the cavernous sinus, beside the internal carotid, rather than in its wall?",
      options: ["III", "IV", "V1", "VI"],
      answer: 3,
      explain: "VI runs in the sinus next to the carotid, so it is often the first nerve affected by cavernous sinus disease."
    },
    {
      q: "In the internal acoustic meatus, the facial nerve lies:",
      options: ["Anteroinferiorly", "Anterosuperiorly", "Posterosuperiorly", "Posteroinferiorly"],
      answer: 1,
      explain: "'Seven up, Coke down': VII anterosuperior, cochlear nerve anteroinferior; the vestibular nerves are posterior, with Bill's bar separating VII from the superior vestibular nerve."
    },
    {
      q: "A lesion of the jugular foramen (Vernet's syndrome) affects:",
      options: ["IX, X and XI", "VII and VIII", "X, XI and XII", "V, VI and VII"],
      answer: 0,
      explain: "IX, X and XI all leave through the jugular foramen; XII uses the hypoglossal canal."
    },
    {
      q: "Raised intracranial pressure most often causes a palsy of which nerve, as a 'false localising' sign?",
      options: ["III", "IV", "VI", "VII"],
      answer: 2,
      explain: "VI has a long intracranial course and is stretched where it bends over the petrous apex in Dorello's canal."
    }
  ],

  references: {
    gray: "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Chapters on the skull, cranial nerves and intracranial vessels.",
    rhoton: "Rhoton AL Jr. Cranial Anatomy and Surgical Approaches. Lippincott Williams & Wilkins; 2003.",
    bouthillier: "Bouthillier A, van Loveren HR, Keller JT. Segments of the internal carotid artery: a new classification. Neurosurgery. 1996;38(3):425–433.",
    cappabianca: "Cappabianca P, Cavallo LM, de Divitiis E. Endoscopic endonasal transsphenoidal surgery. Neurosurgery. 2004;55(4):933–940.",
    hadad: "Hadad G, Bassagasteguy L, Carrau RL, et al. A novel reconstructive technique after endoscopic expanded endonasal approaches: vascular pedicle nasoseptal flap. Laryngoscope. 2006;116(10):1882–1886.",
    fisch: "Fisch U. Infratemporal fossa approach to tumours of the temporal bone and base of the skull. J Laryngol Otol. 1978;92(11):949–967.",
    scottbrown: "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Skull base chapters."
  }
};
