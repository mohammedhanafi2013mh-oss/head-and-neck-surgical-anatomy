// Content for the temporal bone and ear (right ear). Each structure id matches
// a mesh id in data/temporal-bone-meshes.js, except the surgical landmarks
// (layer "foramina"), which are pins ("pin" names a point in the mesh header).
// "course" lists the waypoints of a traced structure; "incision" on a surgery
// step names an entry in "incisions" drawn on the model at that step.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.regions.temporal_bone = {
  id: "temporal_bone",
  title: "Temporal bone & ear",
  subtitle: "External, middle and inner ear, the facial nerve through the temporal bone and the mastoid (right ear)",

  overview: {
    "intro": "The temporal bone houses the organs of hearing and balance and is crossed by the facial nerve, the internal carotid artery and the sigmoid sinus, all within millimetres of each other. Sound passes down the ear canal to the eardrum, is carried across the middle ear by the malleus, incus and stapes to the oval window, and moves the fluid of the cochlea. Middle-ear and mastoid surgery is navigated by a handful of landmarks: MacEwen's triangle on the surface, then the antrum, the lateral semicircular canal and the short process of the incus, which lead to the facial nerve. The model shows the right ear with the bone translucent; the facial nerve and chorda tympani can be traced.",
    "boundaries": [
      {
        "label": "Middle ear roof",
        "text": "Tegmen tympani: middle cranial fossa and temporal lobe above"
      },
      {
        "label": "Floor",
        "text": "Jugular bulb"
      },
      {
        "label": "Anterior wall",
        "text": "Internal carotid artery, auditory tube and tensor tympani"
      },
      {
        "label": "Posterior wall",
        "text": "Aditus to the antrum, pyramidal eminence (stapedius), facial nerve"
      },
      {
        "label": "Medial wall",
        "text": "Promontory (basal turn of the cochlea), oval and round windows, tympanic facial nerve, lateral semicircular canal above"
      },
      {
        "label": "Lateral wall",
        "text": "Tympanic membrane and the bony attic wall (scutum)"
      }
    ],
    "contents": [
      "Ossicles: malleus, incus and stapes, with tensor tympani and stapedius",
      "Facial nerve: meatal, labyrinthine, tympanic and mastoid segments; greater petrosal nerve, nerve to stapedius, chorda tympani",
      "Inner ear: cochlea, vestibule and three semicircular canals; vestibulocochlear nerve",
      "Mastoid: antrum and air cells; tegmen above, sigmoid sinus behind",
      "Vessels: petrous internal carotid artery, sigmoid sinus and jugular bulb"
    ],
    "keyPoints": [
      "The antrum lies 12–15 mm deep to MacEwen's triangle in adults, but only millimetres deep at birth.",
      "The lateral semicircular canal and the short process of the incus are the keys to finding the facial nerve in the mastoid.",
      "The tympanic segment of the facial nerve is often dehiscent above the oval window.",
      "Facial palsy topognosis: dry eye (geniculate), hyperacusis (nerve to stapedius), taste loss (chorda).",
      "Never biopsy a vascular mass behind the eardrum before imaging: it may be an aberrant carotid artery, a high jugular bulb or a paraganglioma.",
      "One-sided sensorineural hearing loss or tinnitus needs an MRI of the internal acoustic meatus."
    ],
    "refs": [
      "gray",
      "proctor",
      "sanna",
      "scottbrown"
    ]
  },

  // Guided dissection: layers from superficial to deep ("keep" stays on throughout).
  dissection: {"keep": ["bone"], "order": ["external", "context", "middle", "vein", "artery", "inner", "nerve", "foramina"]},

  layers: [{"id": "bone", "label": "Temporal bone", "defaultOn": true}, {"id": "external", "label": "External ear", "defaultOn": true}, {"id": "middle", "label": "Middle ear & mastoid", "defaultOn": true}, {"id": "inner", "label": "Inner ear", "defaultOn": true}, {"id": "nerve", "label": "Nerves", "defaultOn": true}, {"id": "artery", "label": "Carotid", "defaultOn": true}, {"id": "vein", "label": "Sigmoid sinus & jugular", "defaultOn": true}, {"id": "context", "label": "Mastoid muscles", "defaultOn": false}, {"id": "foramina", "label": "Surgical landmarks", "defaultOn": false}],

  structures: [
    {
      id: "temporal",
      name: "Temporal bone",
      layer: "bone",
      summary: "Holds the organs of hearing and balance and carries the facial nerve, the internal carotid artery and the sigmoid sinus. Its parts: the squamous part (side of the skull), the mastoid part behind the ear canal, the petrous part (the dense pyramid holding the inner ear, pointing forwards and medially), the tympanic plate forming most of the bony ear canal, and the styloid process.",
      relations: ["Above: the middle cranial fossa and temporal lobe, separated from the middle ear and mastoid by the thin tegmen", "Behind the mastoid: the sigmoid sinus and the posterior cranial fossa (cerebellum)", "Below: the jugular bulb and the internal carotid artery in the carotid canal"],
      supply: {"Ossification": "Squamous and tympanic parts in membrane; petrous and mastoid in cartilage", "Muscles on it": "Sternocleidomastoid, splenius capitis and longissimus capitis on the mastoid; posterior belly of digastric from the mastoid notch"},
      surgical: ["The mastoid process is small at birth and grows with the pull of sternocleidomastoid: in infants the facial nerve leaves the skull close to the surface and a postauricular incision must be placed higher and more posterior.", "Longitudinal fractures (along the petrous ridge) tear the eardrum and disrupt the ossicles; transverse fractures cross the labyrinth and cause deafness and vertigo, and more often facial palsy."],
      danger: [],
      variations: [],
      refs: ["gray", "proctor", "scottbrown"]
    },
    {
      id: "auricle",
      name: "Auricle (pinna)",
      layer: "external",
      summary: "Elastic cartilage covered with tightly bound skin, except the lobule (fat and fibrous tissue). Named parts: helix, antihelix and its crura, scaphoid and triangular fossae, concha (cymba and cavum), tragus, antitragus and lobule. It funnels sound into the ear canal and helps tell front from back.",
      relations: ["The concha leads into the ear canal; the tragus overlaps its opening in front"],
      supply: {"Sensation": "Great auricular nerve (C2–C3, back and lower front), auriculotemporal nerve (V3, upper front and tragus), lesser occipital nerve, auricular branch of the vagus (Arnold's nerve, concha and canal)", "Blood": "Posterior auricular and superficial temporal arteries", "Lymph": "Parotid, mastoid and upper deep cervical nodes"},
      surgical: ["The cartilage relies on its perichondrium for nutrition: a haematoma under it must be drained and compressed, or the cartilage dies and the ear becomes a 'cauliflower ear'.", "Infection of the cartilage (perichondritis), often Pseudomonas after piercing high in the ear, needs early anti-pseudomonal treatment."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "eac",
      name: "External acoustic meatus (ear canal)",
      layer: "external",
      summary: "About 2.5 cm long, S-shaped: the outer third is cartilage (with hairs and ceruminous glands), the inner two-thirds bone, narrowing at the isthmus near the bony–cartilaginous junction. Pulling the auricle up and back straightens it for examination in adults. Sculpted for this app.",
      relations: ["Ends at the tympanic membrane, which sits obliquely, so the floor and front wall are longer than the roof and back wall", "In front: the temporomandibular joint (jaw movement can be felt through the canal); behind: the mastoid air cells; above: the middle cranial fossa"],
      supply: {"Sensation": "Auriculotemporal nerve (front and roof), auricular branch of the vagus (back and floor: the cough reflex when cleaning the canal), facial nerve fibres (a small posterior area: Hitselberger's sign)"},
      surgical: ["Malignant (necrotising) otitis externa spreads from the canal floor through the fissures of Santorini to the skull base and facial nerve; suspect it in diabetic or immunocompromised patients with pain out of proportion to the findings.", "The canal skin over bone is thin and bleeds easily: instruments should rest on the cartilaginous part."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "tympanic_membrane",
      name: "Tympanic membrane",
      layer: "external",
      summary: "An oval, cone-shaped membrane about 9 × 8 mm and 0.1 mm thick, set obliquely at the end of the canal. The handle of the malleus is attached to its inner surface, ending at the umbo; light reflects as a cone anteroinferiorly. The large lower pars tensa has three layers; the small upper pars flaccida, above the lateral process of the malleus, lacks the middle fibrous layer.",
      relations: ["Medial: the middle ear, with the long process of the incus and the chorda tympani visible behind the upper part of the handle"],
      supply: {"Sensation": "Outer surface: auriculotemporal nerve and the auricular branch of the vagus; inner surface: glossopharyngeal nerve (tympanic plexus)", "Function": "With the ossicles, matches air to the fluid of the inner ear: its larger area and the ossicular lever give about 25–30 dB of gain"},
      surgical: ["Myringotomy and grommet insertion are made in the anteroinferior quadrant, away from the ossicles and the round window niche.", "A retraction pocket or perforation in the pars flaccida (attic) or the posterosuperior pars tensa is the typical site of acquired cholesteatoma."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown", "sanna"]
    },
    {
      id: "malleus",
      name: "Malleus",
      layer: "middle",
      summary: "The outermost and largest ossicle. Its handle (manubrium) is set in the eardrum; its head lies in the attic (epitympanum) and articulates with the body of the incus.",
      relations: ["Tensor tympani inserts on its neck", "The chorda tympani crosses medial to its neck"],
      supply: {"Ligaments": "Superior, lateral and anterior mallear ligaments suspend it in the attic"},
      surgical: ["Fixation of the malleus head in the attic causes a conductive hearing loss that can mimic otosclerosis."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "incus",
      name: "Incus",
      layer: "middle",
      summary: "The middle ossicle. Its body articulates with the malleus head in the attic; the short process points backwards into the fossa incudis at the entrance to the antrum; the long process descends parallel to the malleus handle and ends in the lenticular process, which joins the stapes head.",
      relations: ["The short process in the fossa incudis is a key landmark in mastoidectomy: the facial nerve's second genu lies just medial and inferior to it", "The chorda tympani runs lateral to the long process"],
      supply: {"Blood": "The tip of the long process has a poor blood supply"},
      surgical: ["The long process is the commonest site of ossicular erosion in chronic otitis media, breaking the chain at the incudostapedial joint.", "Touching the incus with a spinning burr during mastoidectomy transmits drill energy straight to the cochlea: sensorineural hearing loss."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna", "fisch"]
    },
    {
      id: "stapes",
      name: "Stapes",
      layer: "middle",
      summary: "The smallest bone in the body. Its head joins the lenticular process of the incus; two crura run medially to the footplate, which is held in the oval window by the annular ligament and moves the fluid of the vestibule.",
      relations: ["The stapedius tendon inserts on its neck", "The tympanic segment of the facial nerve runs just above the oval window, often without a bony cover"],
      supply: {},
      surgical: ["In otosclerosis new bone fixes the footplate in the oval window; stapedotomy replaces the stapes superstructure with a piston through a small hole in the footplate.", "A mobile footplate pushed into the vestibule, or a fistula, causes vertigo and sensorineural loss."],
      danger: [],
      variations: [],
      refs: ["gray", "fisch", "scottbrown"]
    },
    {
      id: "tensor_tympani",
      name: "Tensor tympani",
      layer: "middle",
      summary: "Lies in a bony semicanal above the auditory tube. Its tendon turns laterally around the cochleariform process and inserts on the neck of the malleus, pulling the eardrum inwards. Sculpted for this app.",
      relations: ["The cochleariform process marks the level of the tympanic facial nerve, which lies just above and behind it"],
      supply: {"Nerve": "Nerve to medial pterygoid (V3), through the otic ganglion"},
      surgical: ["The cochleariform process is a dependable landmark for the facial nerve when the anatomy is distorted by disease."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "stapedius",
      name: "Stapedius",
      layer: "middle",
      summary: "The smallest skeletal muscle. It lies in a canal beside the descending facial nerve; its tendon leaves the pyramidal eminence on the back wall of the middle ear and inserts on the neck of the stapes, damping loud sounds (the acoustic reflex). Sculpted for this app.",
      relations: ["Pyramidal eminence: just below the second genu of the facial nerve"],
      supply: {"Nerve": "Nerve to stapedius, from the mastoid segment of the facial nerve"},
      surgical: ["A facial nerve lesion above the nerve to stapedius abolishes the acoustic reflex and causes hyperacusis: a clue to the level of the lesion."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "antrum",
      name: "Mastoid antrum",
      layer: "middle",
      summary: "The largest, constant air cell of the mastoid, joined to the attic by the aditus. It is adult-sized at birth but lies only about 2 mm deep then, and 12–15 mm deep to the suprameatal (MacEwen's) triangle in adults. Sculpted for this app.",
      relations: ["Roof: the tegmen and the middle cranial fossa", "Medial wall: the lateral semicircular canal, with the facial nerve below it", "Anterior: the aditus and attic, with the short process of the incus"],
      supply: {},
      surgical: ["Opening the antrum is the first goal of a cortical mastoidectomy: drill at MacEwen's triangle, parallel to the ear canal and below the temporal line.", "Körner's septum (the petrosquamous plate) can be mistaken for the medial wall of the antrum; the true antrum lies deeper, medial to it."],
      danger: [],
      variations: [],
      refs: ["gray", "proctor", "sanna"]
    },
    {
      id: "air_cells",
      name: "Mastoid air cells",
      layer: "middle",
      summary: "Air spaces lined with mucosa, opening from the antrum through the mastoid process; pneumatisation varies from extensive to sclerotic. Shown schematically.",
      relations: ["Cells can extend to the tip, around the sigmoid sinus, along the zygomatic root and into the petrous apex"],
      supply: {},
      surgical: ["Acute mastoiditis: infection breaks down the cell walls (coalescent mastoiditis) and can spread to a subperiosteal abscess behind the ear, to the neck (Bezold's abscess, through the tip), or inside the skull (extradural abscess, sigmoid sinus thrombosis, meningitis, brain abscess).", "A sclerotic, poorly pneumatised mastoid with a low tegmen and forward sigmoid sinus is typical of chronic ear disease and makes the operation harder."],
      danger: [],
      variations: [],
      refs: ["scottbrown", "sanna"]
    },
    {
      id: "auditory_tube",
      name: "Auditory (Eustachian) tube",
      layer: "middle",
      summary: "Joins the front of the middle ear (protympanum) to the nasopharynx, about 36 mm long. The bony third is at the ear end, the cartilaginous two-thirds at the nasopharynx. It ventilates and drains the middle ear and is opened by tensor veli palatini on swallowing.",
      relations: ["The internal carotid artery lies medial to its bony part"],
      supply: {},
      surgical: ["Tubal dysfunction is the root of most middle-ear disease: effusion, retraction and cholesteatoma.", "A one-sided effusion in an adult needs a look at the nasopharynx to rule out a tumour."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "cochlea",
      name: "Cochlea",
      layer: "inner",
      summary: "A bony spiral of about two and a half turns around the modiolus, holding the cochlear duct and the organ of Corti. Its basal turn bulges into the middle ear as the promontory; the round window, closed by a membrane, opens from the scala tympani below and behind the oval window.",
      relations: ["Anterior and medial: the internal carotid artery in the carotid canal", "The cochlear nerve leaves through the modiolus into the internal acoustic meatus"],
      supply: {"Function": "Frequency map: high frequencies at the base, low at the apex", "Blood": "Labyrinthine artery, an end artery, usually from the anterior inferior cerebellar artery"},
      surgical: ["Cochlear implant electrodes are passed into the scala tympani through the round window or a cochleostomy just in front of it, reached by a posterior tympanotomy.", "Sudden sensorineural hearing loss is an emergency: start treatment (steroids) early and image the internal acoustic meatus to exclude a vestibular schwannoma."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "labyrinth",
      name: "Vestibule and semicircular canals",
      layer: "inner",
      summary: "The vestibule (holding the utricle and saccule, for linear acceleration and gravity) and the three semicircular canals (lateral, superior and posterior, for head rotation), set at right angles to each other. The lateral canal bulges into the medial wall of the antrum and aditus.",
      relations: ["Lateral semicircular canal: the main landmark in mastoid surgery; the facial nerve runs just below and in front of it", "Superior canal: under the floor of the middle cranial fossa (arcuate eminence)"],
      supply: {"Nerve": "Superior and inferior vestibular nerves"},
      surgical: ["Cholesteatoma can erode the lateral canal (a fistula): pressure on the ear then causes vertigo (positive fistula test).", "Opening a canal with the drill can cause total sensorineural loss and vertigo; covering it at once with bone wax or fascia limits the damage."],
      danger: [],
      variations: ["Superior canal dehiscence: missing bone over the superior canal gives sound- or pressure-induced vertigo and autophony."],
      refs: ["gray", "sanna", "scottbrown"]
    },
    {
      id: "facial_nerve",
      name: "Facial nerve (VII) in the temporal bone",
      layer: "nerve",
      course: [{"key": "iam", "label": "Internal acoustic meatus", "text": "Enters with VIII, in the anterosuperior part of the meatus."}, {"key": "geniculate", "label": "Geniculate ganglion (first genu)", "text": "After the narrow labyrinthine segment; the greater petrosal nerve leaves here."}, {"key": "tympanic", "label": "Tympanic segment", "text": "Along the medial wall of the middle ear, above the oval window; often dehiscent."}, {"key": "genu", "label": "Second genu", "text": "Below the lateral semicircular canal, medial to the short process of the incus."}, {"key": "smf", "label": "Stylomastoid foramen", "text": "After the mastoid segment, which gives the nerve to stapedius and the chorda tympani."}],
      summary: "Enters the internal acoustic meatus with VIII, then runs through the facial (fallopian) canal: the labyrinthine segment (3–5 mm, the narrowest part) to the geniculate ganglion, where it turns sharply back (first genu); the tympanic segment (about 10 mm) along the medial wall of the middle ear above the oval window; the second genu beside the lateral canal; and the mastoid segment (about 13 mm) straight down to the stylomastoid foramen.",
      relations: ["In the meatus: anterosuperior, above the cochlear nerve and in front of the superior vestibular nerve, separated from it by Bill's bar", "Tympanic segment: above the oval window and stapes, below the lateral semicircular canal", "Mastoid segment: medial to the posterior canal wall; the chorda tympani leaves it about 5 mm above the foramen"],
      supply: {"Branches in the bone": "Greater petrosal nerve (lacrimation) from the geniculate ganglion, nerve to stapedius, chorda tympani (taste to the front of the tongue; secretomotor to the submandibular and sublingual glands)", "Motor": "Muscles of facial expression, posterior belly of digastric, stylohyoid"},
      surgical: ["Topognosis: dry eye means a lesion at or above the geniculate ganglion; hyperacusis, above the nerve to stapedius; loss of taste, above the chorda.", "Find it in the mastoid from the lateral semicircular canal, the short process of the incus and the digastric ridge, which points to the stylomastoid foramen; use a diamond burr and copious irrigation near it."],
      danger: ["The tympanic segment is often dehiscent (no bony cover) above the oval window, in up to about half of temporal bones.", "In children under about two the nerve leaves the stylomastoid foramen just under the skin: place postauricular incisions higher."],
      variations: [],
      refs: ["gray", "proctor", "fisch", "sanna"]
    },
    {
      id: "chorda",
      name: "Chorda tympani",
      layer: "nerve",
      course: [{"key": "origin", "label": "Leaves the mastoid facial nerve", "text": "About 5 mm above the stylomastoid foramen."}, {"key": "tm", "label": "Across the middle ear", "text": "Under the eardrum, between the long process of the incus and the neck of the malleus."}, {"key": "itf", "label": "To the lingual nerve", "text": "Through the petrotympanic fissure into the infratemporal fossa."}],
      summary: "Leaves the mastoid segment of the facial nerve, enters the middle ear through the back wall, crosses it under the mucosa of the eardrum (lateral to the long process of the incus, medial to the neck of the malleus), and leaves through the petrotympanic fissure to join the lingual nerve.",
      relations: ["With the facial nerve it bounds the facial recess (posterior tympanotomy), the route from the mastoid into the middle ear"],
      supply: {"Carries": "Taste from the front two-thirds of the tongue; parasympathetic fibres to the submandibular ganglion (submandibular and sublingual glands)"},
      surgical: ["Stretched or cut in middle-ear surgery, it causes a metallic taste on that side, usually transient.", "The facial recess is opened between it and the facial nerve for cochlear implants and access to the posterior middle ear."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "cn8",
      name: "Vestibulocochlear nerve (VIII)",
      layer: "nerve",
      summary: "Runs with the facial nerve from the brainstem at the cerebellopontine angle into the internal acoustic meatus, then divides: the cochlear nerve to the modiolus, and the superior and inferior vestibular nerves to the vestibule and canals.",
      relations: ["In the lateral meatus: facial nerve anterosuperior, cochlear nerve anteroinferior, superior and inferior vestibular nerves behind ('seven up, Coke down')"],
      supply: {},
      surgical: ["Vestibular schwannoma arises from the vestibular nerves in the meatus: one-sided or asymmetric sensorineural loss or tinnitus calls for an MRI of the internal acoustic meatus."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "ica",
      name: "Internal carotid artery (petrous part)",
      layer: "artery",
      summary: "Enters the carotid canal under the petrous bone, runs up, then forwards and medially in front of the cochlea and medial to the auditory tube, to the foramen lacerum.",
      relations: ["Separated from the middle ear and cochlea by thin bone, which can be missing"],
      supply: {},
      surgical: ["A pulsatile red mass behind the eardrum may be an aberrant carotid artery: never biopsy a vascular-looking middle-ear mass before imaging."],
      danger: [],
      variations: [],
      refs: ["gray", "scottbrown"]
    },
    {
      id: "sigmoid",
      name: "Sigmoid sinus",
      layer: "vein",
      summary: "Continues the transverse sinus in an S-shaped groove on the inner surface of the mastoid, to the jugular bulb.",
      relations: ["Forms the back of Trautmann's triangle with the superior petrosal sinus above and the labyrinth in front", "Mastoid emissary vein runs from it to the outside"],
      supply: {},
      surgical: ["Its blue line is the posterior limit of a cortical mastoidectomy; a forward-placed sinus narrows the access.", "Mastoiditis can cause sigmoid sinus thrombosis: swinging fever, headache, and spread to the jugular vein."],
      danger: ["Tearing it causes heavy bleeding and air embolism: press with a pack or haemostatic agent, never pack the lumen blindly."],
      variations: [],
      refs: ["gray", "sanna", "scottbrown"]
    },
    {
      id: "ijv",
      name: "Jugular bulb and internal jugular vein",
      layer: "vein",
      summary: "The sigmoid sinus ends in the jugular bulb in the jugular foramen, below the floor of the middle ear, and continues as the internal jugular vein.",
      relations: ["Floor of the middle ear (hypotympanum) above it"],
      supply: {},
      surgical: ["A high-riding or dehiscent jugular bulb can reach the middle ear: a blue mass behind the eardrum; myringotomy there causes severe bleeding."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "digastric_post",
      name: "Posterior belly of digastric",
      layer: "context",
      summary: "Arises from the mastoid notch on the medial side of the mastoid process; its groove shows inside the mastoid as the digastric ridge.",
      relations: ["The digastric ridge leads forwards to the stylomastoid foramen"],
      supply: {"Nerve": "Facial nerve"},
      surgical: ["Follow the digastric ridge forwards to find the facial nerve at the stylomastoid foramen."],
      danger: [],
      variations: [],
      refs: ["gray", "proctor"]
    },
    {
      id: "scm",
      name: "Sternocleidomastoid (upper end)",
      layer: "context",
      summary: "Inserts on the lateral surface of the mastoid process and the superior nuchal line.",
      relations: [],
      supply: {"Nerve": "Accessory nerve"},
      surgical: ["Bezold's abscess: pus from the mastoid tip tracks deep to the muscle into the neck."],
      danger: [],
      variations: [],
      refs: ["gray"]
    },
    {
      id: "f_iam",
      name: "Internal acoustic meatus",
      layer: "foramina",
      pin: "internal_acoustic_meatus",
      summary: "Opening in the posterior face of the petrous bone.",
      relations: ["Transmits: facial nerve, vestibulocochlear nerve, labyrinthine vessels"],
      supply: {},
      surgical: ["Approached through the middle fossa (hearing-preserving) or translabyrinthine route for vestibular schwannoma."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_smf",
      name: "Stylomastoid foramen",
      layer: "foramina",
      pin: "stylomastoid_foramen",
      summary: "Between the styloid and mastoid processes.",
      relations: ["Transmits: facial nerve, stylomastoid artery"],
      supply: {},
      surgical: ["In infants it lies just under the skin behind the ear."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_geniculate",
      name: "Geniculate ganglion",
      layer: "foramina",
      pin: "geniculate",
      summary: "Sensory ganglion at the first genu of the facial nerve.",
      relations: ["Greater petrosal nerve leaves it forwards"],
      supply: {},
      surgical: ["Herpes zoster here causes Ramsay Hunt syndrome: facial palsy with vesicles in the ear."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_henle",
      name: "Spine of Henle (suprameatal spine)",
      layer: "foramina",
      pin: "spine_of_henle",
      summary: "Small spine at the posterosuperior margin of the bony ear canal opening.",
      relations: ["The antrum lies about 1.5 cm deep to the area just behind it"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_macewen",
      name: "Suprameatal (MacEwen's) triangle",
      layer: "foramina",
      pin: "suprameatal_triangle",
      summary: "Area behind and above the canal opening, bounded by the temporal line above, the posterosuperior canal wall in front, and a tangent from the back of the canal.",
      relations: ["Surface marking of the mastoid antrum (in the concha, the cymba conchae overlies it)"],
      supply: {},
      surgical: ["Start drilling here in a cortical mastoidectomy."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_mastoid_tip",
      name: "Mastoid tip",
      layer: "foramina",
      pin: "mastoid_tip",
      summary: "Lower end of the mastoid process.",
      relations: ["Sternocleidomastoid outside, digastric notch on its medial side"],
      supply: {},
      surgical: ["Pus breaking through the medial tip makes a Bezold's abscess in the neck."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_lscc",
      name: "Lateral semicircular canal prominence",
      layer: "foramina",
      pin: "lscc",
      summary: "Smooth, compact bone bulging into the medial wall of the antrum and aditus.",
      relations: ["The facial nerve runs just below and in front of it"],
      supply: {},
      surgical: ["The single most useful landmark in mastoid surgery."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_tegmen",
      name: "Tegmen (roof of the antrum and middle ear)",
      layer: "foramina",
      pin: "tegmen",
      summary: "Thin plate of bone separating the middle ear and mastoid from the middle cranial fossa dura.",
      relations: ["Above: the temporal lobe"],
      supply: {},
      surgical: ["A low tegmen limits drilling; breaching it risks a CSF leak or brain herniation."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_oval",
      name: "Oval window",
      layer: "foramina",
      pin: "oval_window",
      summary: "Opening into the vestibule, closed by the stapes footplate.",
      relations: ["Facial nerve just above it"],
      supply: {},
      surgical: [],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_round",
      name: "Round window",
      layer: "foramina",
      pin: "round_window",
      summary: "Opening of the scala tympani in a niche below and behind the promontory, closed by the secondary tympanic membrane.",
      relations: [],
      supply: {},
      surgical: ["Route for cochlear implant electrodes."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_fossa_incudis",
      name: "Fossa incudis",
      layer: "foramina",
      pin: "fossa_incudis",
      summary: "Recess in the back of the attic holding the short process of the incus.",
      relations: ["The facial nerve's second genu lies just medial and inferior"],
      supply: {},
      surgical: ["Upper limit of the facial recess in a posterior tympanotomy."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    },
    {
      id: "f_cochleariform",
      name: "Cochleariform process",
      layer: "foramina",
      pin: "cochleariform",
      summary: "Hook of bone on the medial wall around which the tensor tympani tendon turns.",
      relations: ["The tympanic facial nerve lies just above and behind it"],
      supply: {},
      surgical: ["A landmark for the facial nerve in revision surgery."],
      danger: [],
      variations: [],
      refs: ["gray", "sanna"]
    }
  ],

  // Incisions drawn on the model at the surgery steps that name them (step.incision):
  // control points in app space, laid onto the outer surface along "toward".
  incisions: [
    {"id": "postauricular", "name": "Postauricular incision", "note": "About 1 cm behind the auricular crease, from the top of the auricle to the mastoid tip.", "points": [[-1.6, 2.4, -1.5], [-1.75, 1.4, -2.1], [-1.7, 0.1, -2.4], [-1.4, -1.2, -2.3], [-0.9, -2.2, -1.9]], "toward": [1.5, 0.0, -0.7], "onto": ["temporal"], "view": [-2.2, 1.5]}
  ],

  procedure: {
    "title": "Cortical mastoidectomy (canal wall up)",
    "intro": "Step through the operation on a right ear. The model shows the layers you would see at each stage and highlights the landmarks; the structures at risk are tinted orange.",
    "atRisk": [
      {
        "id": "facial_nerve",
        "why": "Mastoid segment medial to the posterior canal wall: facial palsy"
      },
      {
        "id": "labyrinth",
        "why": "Drilling into the lateral semicircular canal: vertigo and sensorineural loss"
      },
      {
        "id": "sigmoid",
        "why": "Posterior limit: bleeding and air embolism if torn"
      },
      {
        "id": "incus",
        "why": "A burr touching it transmits energy to the cochlea: sensorineural loss"
      },
      {
        "id": "chorda",
        "why": "In the facial recess: altered taste"
      },
      {
        "id": "f_tegmen",
        "why": "Roof: dura, CSF leak"
      }
    ],
    "steps": [
      {
        "title": "Indications and imaging",
        "text": "Acute mastoiditis not settling on antibiotics, or chronic otitis media with cholesteatoma. CT of the temporal bones shows the extent of disease and pneumatisation, a low tegmen, a forward sigmoid sinus, a fistula of the lateral canal and dehiscence of the facial canal.",
        "show": [
          "bone",
          "external",
          "middle",
          "inner",
          "nerve",
          "vein"
        ],
        "focus": [
          "antrum",
          "air_cells",
          "temporal"
        ]
      },
      {
        "title": "Position and incision",
        "text": "Supine, head turned away, facial nerve monitoring. A postauricular incision about 1 cm behind the crease, from the top of the auricle down to the mastoid tip (higher and more posterior in small children).",
        "show": [
          "bone",
          "external"
        ],
        "focus": [
          "auricle",
          "temporal"
        ],
        "incision": "postauricular"
      },
      {
        "title": "Expose the cortex",
        "text": "Raise a musculoperiosteal flap and push the auricle forwards. Identify the spine of Henle, the suprameatal (MacEwen's) triangle, the temporal line and the mastoid tip.",
        "show": [
          "bone",
          "external",
          "foramina"
        ],
        "focus": [
          "f_henle",
          "f_macewen",
          "f_mastoid_tip",
          "temporal"
        ]
      },
      {
        "title": "Drill: saucerise the mastoid",
        "text": "With a large cutting burr and suction-irrigation, drill at MacEwen's triangle along the temporal line (the level of the tegmen) and parallel to the posterior canal wall, keeping the cavity wide and shallow-sided rather than a deep hole.",
        "show": [
          "bone",
          "middle",
          "foramina"
        ],
        "focus": [
          "air_cells",
          "f_macewen"
        ]
      },
      {
        "title": "Tegmen and sigmoid sinus",
        "text": "Thin the bone over the middle fossa dura above and the sigmoid sinus behind; the sinodural angle lies between them. These define the upper and posterior limits.",
        "show": [
          "bone",
          "middle",
          "vein",
          "foramina"
        ],
        "focus": [
          "sigmoid",
          "f_tegmen"
        ]
      },
      {
        "title": "Open the antrum",
        "text": "About 1.5 cm deep, beneath MacEwen's triangle, the antrum opens; Körner's septum can masquerade as its medial wall. Pus, granulation tissue or cholesteatoma is removed.",
        "show": [
          "bone",
          "middle",
          "inner",
          "foramina"
        ],
        "focus": [
          "antrum",
          "f_lscc"
        ]
      },
      {
        "title": "Lateral canal and incus",
        "text": "On the medial wall of the antrum find the smooth, hard bulge of the lateral semicircular canal, and in front of it, through the aditus, the short process of the incus in the fossa incudis. Do not touch the incus with the burr.",
        "show": [
          "bone",
          "middle",
          "inner",
          "nerve",
          "foramina"
        ],
        "focus": [
          "labyrinth",
          "incus",
          "f_fossa_incudis"
        ]
      },
      {
        "title": "Find the facial nerve",
        "text": "The second genu lies below the lateral canal and medial to the short process of the incus; the mastoid segment runs down medial to the posterior canal wall to the stylomastoid foramen, at the front of the digastric ridge. Thin the bone with a diamond burr and copious irrigation; open the facial recess between nerve and chorda if access to the middle ear is needed.",
        "show": [
          "bone",
          "middle",
          "inner",
          "nerve",
          "context",
          "foramina"
        ],
        "focus": [
          "facial_nerve",
          "chorda",
          "digastric_post",
          "f_smf"
        ]
      },
      {
        "title": "Close and after care",
        "text": "Check the facial nerve before waking, close in layers and apply a mastoid dressing. Test facial movement on recovery, and hearing and balance afterwards.",
        "show": [
          "bone",
          "external",
          "middle",
          "nerve"
        ],
        "focus": [
          "facial_nerve",
          "auricle"
        ]
      }
    ],
    "complications": [
      "Facial palsy: immediate complete palsy needs re-exploration; delayed palsy usually recovers with steroids",
      "Sensorineural hearing loss, tinnitus and vertigo from drill trauma to the ossicles or a lateral canal fistula",
      "CSF leak or brain herniation through a breached tegmen",
      "Bleeding from the sigmoid sinus or an emissary vein; air embolism",
      "Altered taste from chorda tympani injury",
      "Wound infection, haematoma, perichondritis of the auricle; residual or recurrent cholesteatoma (second-look surgery or MRI follow-up)"
    ],
    "refs": [
      "sanna",
      "glasscock",
      "fisch",
      "scottbrown"
    ]
  },

  figures: [{"id": "fig-mastoid", "title": "A right cortical mastoidectomy: the landmarks that lead to the facial nerve", "svg": "mastoidCavity"},
            {"id": "fig-middle-ear", "title": "The middle ear opened like a box: its six walls", "svg": "middleEarBox"}],

  quiz: [
    {
      "q": "Which surface landmark overlies the mastoid antrum?",
      "options": [
        "Spine of Henle",
        "Suprameatal (MacEwen's) triangle",
        "Mastoid tip",
        "Asterion"
      ],
      "answer": 1,
      "explain": "The antrum lies 12–15 mm deep to the suprameatal triangle, just behind and above the spine of Henle."
    },
    {
      "q": "Which segment of the facial nerve is narrowest?",
      "options": [
        "Meatal",
        "Labyrinthine",
        "Tympanic",
        "Mastoid"
      ],
      "answer": 1,
      "explain": "The labyrinthine segment (with the meatal foramen) is the narrowest part of the canal, where swelling in Bell's palsy is thought to compress the nerve."
    },
    {
      "q": "Where is the facial canal most often dehiscent?",
      "options": [
        "Labyrinthine segment",
        "Above the oval window (tympanic segment)",
        "At the stylomastoid foramen",
        "In the internal acoustic meatus"
      ],
      "answer": 1,
      "explain": "The tympanic segment above the oval window often lacks a bony cover, so the nerve can lie exposed during middle-ear surgery."
    },
    {
      "q": "In the mastoid, which landmarks lead to the second genu of the facial nerve?",
      "options": [
        "Sigmoid sinus and tegmen",
        "Lateral semicircular canal and short process of the incus",
        "Spine of Henle and temporal line",
        "Round window and promontory"
      ],
      "answer": 1,
      "explain": "The second genu lies below the lateral canal and medial to the short process of the incus; the digastric ridge then leads to the stylomastoid foramen."
    },
    {
      "q": "A patient with facial palsy has a normal acoustic reflex but has lost taste on the front of the tongue. Where is the lesion?",
      "options": [
        "Internal acoustic meatus",
        "Geniculate ganglion",
        "Between the nerve to stapedius and the chorda tympani",
        "Below the stylomastoid foramen"
      ],
      "answer": 2,
      "explain": "Taste is lost (above the chorda) but the stapedius still works (below its nerve), so the lesion lies between the two branches in the mastoid segment."
    },
    {
      "q": "The facial recess (posterior tympanotomy) lies between:",
      "options": [
        "Facial nerve and chorda tympani",
        "Sigmoid sinus and tegmen",
        "Malleus and incus",
        "Cochlea and carotid artery"
      ],
      "answer": 0,
      "explain": "It is opened between the facial nerve and the chorda tympani, below the fossa incudis, to reach the middle ear from the mastoid (cochlear implants, cholesteatoma)."
    },
    {
      "q": "Which muscle is supplied by the mandibular nerve (V3)?",
      "options": [
        "Stapedius",
        "Tensor tympani",
        "Posterior belly of digastric",
        "Stylohyoid"
      ],
      "answer": 1,
      "explain": "Tensor tympani is supplied by V3 (nerve to medial pterygoid); stapedius, the posterior belly of digastric and stylohyoid by the facial nerve."
    }
  ],

  references: {
    "gray": "Standring S, ed. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. The ear.",
    "proctor": "Proctor B. Surgical Anatomy of the Ear and Temporal Bone. Thieme; 1989.",
    "sanna": "Sanna M, Sunose H, Mancini F, Russo A, Taibah A, Falcioni M. Middle Ear and Mastoid Microsurgery. 2nd ed. Thieme; 2012.",
    "glasscock": "Gulya AJ, Minor LB, Poe DS, eds. Glasscock-Shambaugh Surgery of the Ear. 6th ed. People's Medical Publishing House; 2010.",
    "fisch": "Fisch U, May J, Linder T. Tympanoplasty, Mastoidectomy, and Stapes Surgery. 2nd ed. Thieme; 2008.",
    "scottbrown": "Watkinson JC, Clarke RW, eds. Scott-Brown's Otorhinolaryngology Head & Neck Surgery. 8th ed. CRC Press; 2018. Volume 2: otology."
  }
};
