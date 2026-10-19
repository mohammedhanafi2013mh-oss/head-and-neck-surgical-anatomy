"""Export a region's meshes from the Z-Anatomy Blender file.

Run with Blender's Python module (pip install bpy):

    python tools/export_zanatomy.py /path/to/Z-Anatomy/Startup.blend submandibular data/submandibular-meshes.js
    python tools/export_zanatomy.py /path/to/Z-Anatomy/Startup.blend lateral_neck data/lateral-neck-meshes.js

Z-Anatomy (https://github.com/Z-Anatomy/models-of-human-anatomy) is licensed
CC BY-SA 4.0 and builds on BodyParts3D (CC BY-SA 2.1 JP). The exported meshes
inherit that licence.

Output is a script that sets window.ANATOMY.meshes[<region>] to
{ header, data }, where data is base64 of quantized int16 positions and
uint16/uint32 triangle indices for each mesh. Loading it as a <script> keeps
the app working from file:// without fetch().

Blender coordinates are metres, Z up, front = -Y; the patient's left is +X.
"""

import base64
import json
import struct
import sys
from collections import defaultdict

import bpy  # must come before bmesh when using the bpy module
import bmesh
from mathutils import Matrix, Vector

BLEND, REGION, OUT = sys.argv[-3:]

LOWER_TEETH = ["Lower first molar tooth.r", "Lower second molar tooth.r",
               "Lower first molar tooth.l", "Lower second molar tooth.l"]

REGIONS = {
    "submandibular": {
        "centre_object": "Submandibular gland.r",
        # app structure id -> Blender object names
        "structures": {
            "mandible": ["Mandible"] + LOWER_TEETH,
            "hyoid": ["Hyoid bone"],
            "temporal": ["Temporal bone.r"],
            "digastric_ant": ["Anterior belly of digastric muscle.r", "Anterior belly of digastric muscle.l"],
            "digastric_post": ["Posterior belly of digastric muscle.r", "Intermediate tendon of digastric muscle.r"],
            "stylohyoid": ["Stylohyoid muscle.r"],
            "mylohyoid": ["Mylohyoid muscle.r", "Mylohyoid muscle.l"],
            "hyoglossus": ["Hyoglossus muscle.r"],
            "genioglossus": ["Genioglossus muscle.r"],
            "geniohyoid": ["Geniohyoid muscle.r"],
            "masseter": ["Superficial part of masseter.r", "Deep part of masseter.r"],
            "medial_pterygoid": ["Medial pterygoid muscle.r"],
            "scm": ["Sternocleidomastoid muscle.r"],
            "platysma": ["Platysma.r"],
            "smg": ["Submandibular gland.r"],
            "sublingual": ["Sublingual gland.r"],
            "parotid": ["Parotid gland.r"],
            "wharton": ["Submandibular duct.r"],
            "facial_artery": ["Facial artery.r"],
            "submental_artery": ["Submental artery.r"],
            "eca": ["External carotid artery.r"],
            "facial_vein": ["Facial vein.r", "Common facial vein.r"],
            "retromandibular": ["Retromandibular vein.r", "Anterior division of retromandibular vein.r"],
            "ijv": ["Internal jugular vein.r"],
            "lingual_nerve": ["Lingual nerve.r"],
            "hypoglossal": ["Hypoglossal nerve (XII).r"],
            "nerve_mylohyoid": ["Nerve to mylohyoid muscle.r"],
            "mmn": ["Facial nerve (VII).r"],
            "nodes": ["Submandibular nodes.r", "Submental nodes.r"],
        },
        # Z-Anatomy draws vessels and nerves as curves with per-point radii.
        # Thicken the thin ones a little so they read at atlas scale.
        "curve_scale": {"lingual_nerve": 1.6, "hypoglossal": 1.4, "mmn": 1.8, "nerve_mylohyoid": 1.6,
                        "submental_artery": 1.4, "wharton": 1.4},
        "bones": {"mandible", "hyoid", "temporal"},
        # Marginal mandibular branch only: the end of facial nerve spline 0
        # from the cervicofacial division (point 18) onward, plus its twig
        # (spline 1). Found by checking the spline paths against the
        # mandible's lower border.
        "spline_parts": {"Facial nerve (VII).r": [(0, 18), (1, 0)]},
    },

    "lateral_neck": {
        # Near the carotid bifurcation on the left.
        "centre": (0.035, 0.010, 1.470),
        "structures": {
            "mandible": ["Mandible"] + LOWER_TEETH,
            "hyoid": ["Hyoid bone"],
            "larynx": ["Thyroid cartilage", "Cricoid cartilage"],
            "clavicle": ["Clavicle.l"],
            "sternum": ["Manubrium of sternum"],
            "first_rib": ["First rib.l"],
            "vertebrae": ["Atlas (C1)", "Axis (C2)", "Vertebra C3", "Vertebra C4", "Vertebra C5",
                          "Vertebra C6", "Vertebra C7"],
            "temporal": ["Temporal bone.l"],
            "scm": ["Sternocleidomastoid muscle.l"],
            "omohyoid": ["Omohyoid muscle.l"],
            "strap": ["Sternohyoid muscle.l", "Sternothyroid muscle.l", "Thyrohyoid muscle.l"],
            "digastric": ["Posterior belly of digastric muscle.l", "Intermediate tendon of digastric muscle.l",
                          "Anterior belly of digastric muscle.l"],
            "stylohyoid": ["Stylohyoid muscle.l"],
            "mylohyoid": ["Mylohyoid muscle.l"],
            "scalenus_anterior": ["Scalenus anterior muscle.l"],
            "scalenes": ["Scalenus medius muscle.l", "Scalenus posterior muscle.l"],
            "levator_scapulae": ["Levator scapulae.l"],
            "splenius": ["Splenius capitis muscle.l"],
            "trapezius": ["Descending part of trapezius muscle.l"],
            "platysma": ["Platysma.l"],
            "smg": ["Submandibular gland.l"],
            "parotid": ["Parotid gland.l"],
            "thyroid": ["Thyroid gland"],
            "cca": ["Left common carotid artery"],
            "ica": ["Internal carotid artery.l"],
            "eca": ["External carotid artery.l"],
            "facial_artery": ["Facial artery.l"],
            "occipital_artery": ["Occipital artery.l"],
            "thyrocervical": ["Thyrocervical trunk.l", "Transverse cervical artery.l", "Suprascapular artery.l",
                              "Inferior thyroid artery.l"],
            "subclavian_artery": ["Left subclavian artery"],
            "vertebral_artery": ["Vertebral artery.l"],
            "ijv": ["Internal jugular vein.l"],
            "ejv": ["External jugular vein.l"],
            "ajv": ["Anterior jugular vein.l"],
            "facial_vein": ["Facial vein.l", "Common facial vein.l"],
            "subclavian_vein": ["Left subclavian vein"],
            "vagus": ["Vagus nerve (X).l"],
            "accessory": ["Accessory nerve (XI).l"],
            "hypoglossal": ["Hypoglossal nerve (XII).l"],
            "sympathetic": ["Sympathetic trunk.l", "Ganglia of sympathetic trunk.l"],
            "brachial_plexus": ["Roots of brachial plexus.l", "Superior trunk of brachial plexus.l",
                                "Middle trunk of brachial plexus.l", "Inferior trunk of brachial plexus.l"],
            "mmn": ["Facial nerve (VII).l"],
        },
        "curve_scale": {"vagus": 1.5, "accessory": 1.8, "hypoglossal": 1.4, "mmn": 1.8,
                        "brachial_plexus": 1.3, "sympathetic": 1.3, "occipital_artery": 1.2,
                        "thyrocervical": 1.3},
        "bones": {"mandible", "hyoid", "larynx", "clavicle", "sternum", "first_rib", "vertebrae", "temporal"},
        "spline_parts": {"Facial nerve (VII).l": [(0, 18), (1, 0)]},
        # Drop geometry below this height (metres) so long muscles and nerves
        # stop near the clavicle.
        "clip_below": {"Descending part of trapezius muscle.l": 1.360, "Accessory nerve (XI).l": 1.365,
                       "Vagus nerve (X).l": 1.355, "Levator scapulae.l": 1.375,
                       "Sympathetic trunk.l": 1.360, "Ganglia of sympathetic trunk.l": 1.360},
        # Lymph node groups, split into single nodes and assigned to a level
        # by position (see neck_level).
        "node_groups": ["Submental nodes.l", "Submandibular nodes.l", "Lateral superior jugular node.l",
                        "Jugulodigastric node.l", "Anterior inferior jugular nodes.l",
                        "Inferior deep lateral cervical nodes.l", "Supraclavicular nodes.l",
                        "Paratracheal cervical nodes", "Pretracheal nodes.l", "Thyroid nodes.l",
                        "Superficial lateral cervical nodes.l"],
        # Structures Z-Anatomy lacks, drawn as paths on its anatomy.
        "drawn": {"phrenic": 0.0014, "great_auricular": 0.0011, "thoracic_duct": 0.0013},
    },

    "parotid": {
        "centre_object": "Parotid gland.r",
        "structures": {
            "mandible": ["Mandible"] + LOWER_TEETH,
            "temporal": ["Temporal bone.r"],
            "zygomatic": ["Zygomatic bone.r"],
            "atlas": ["Atlas (C1)"],
            "auricle": ["Helix.r", "Tragus.r", "Antitragus.r", "Lobule of auricle.r", "Concha of auricle.r"],
            "masseter": ["Superficial part of masseter.r", "Deep part of masseter.r"],
            "temporalis": ["Temporalis muscle.r"],
            "pterygoids": ["Medial pterygoid muscle.r", "Inferior head of lateral pterygoid muscle.r",
                           "Superior head of lateral pterygoid muscle.r"],
            "scm": ["Sternocleidomastoid muscle.r"],
            "digastric_post": ["Posterior belly of digastric muscle.r"],
            "stylohyoid": ["Stylohyoid muscle.r", "Stylohyoid ligament.r"],
            "stylopharyngeus": ["Stylopharyngeus muscle.r"],
            "facial_muscles": ["Zygomaticus major muscle.r", "Risorius muscle.r", "Depressor anguli oris.r",
                               "Orbicularis oris muscle.r", "Frontalis muscle.r"],
            "platysma": ["Platysma.r"],
            "parotid": ["Parotid gland.r", "(Accessory parotid gland).r"],
            "parotid_duct": ["Parotid duct.r"],
            "smg": ["Submandibular gland.r"],
            "eca": ["External carotid artery.r"],
            "ica": ["Internal carotid artery.r"],
            "sta": ["Superficial temporal artery.r", "Frontal branch of superficial temporal artery.r"],
            "transverse_facial": ["Transverse facial artery.r"],
            "maxillary_artery": ["Maxillary artery.r"],
            "occipital_artery": ["Occipital artery.r"],
            "facial_artery": ["Facial artery.r"],
            "retromandibular": ["Retromandibular vein.r", "Anterior division of retromandibular vein.r",
                                "Posterior division of retromandibular vein.r", "Superficial temporal veins.r",
                                "Maxillary veins.r"],
            "ejv": ["External jugular vein.r", "Posterior auricular vein.r"],
            "ijv": ["Internal jugular vein.r"],
            "facial_vein": ["Facial vein.r", "Common facial vein.r"],
            # Facial nerve split into trunk and branches: (spline, first point, end).
            # Spline 0 runs from the brainstem; the posterior auricular branch
            # (spline 9) leaves it at point 12, just below the stylomastoid
            # foramen, and the upper division (spline 3) at point 15 (pes anserinus).
            "facial_trunk": [("Facial nerve (VII).r", [(0, 12, 16)])],
            "temporal_branch": [("Facial nerve (VII).r", [(8, 0)])],
            "zygomatic_branch": [("Facial nerve (VII).r", [(7, 0)])],
            "buccal_branch": [("Facial nerve (VII).r", [(3, 0), (4, 0), (5, 0), (6, 0)])],
            "mmn": [("Facial nerve (VII).r", [(0, 15), (1, 0)])],
            "cervical_branch": [("Facial nerve (VII).r", [(2, 0)])],
            "posterior_auricular_nerve": [("Facial nerve (VII).r", [(9, 0)])],
            "glossopharyngeal": ["Glossopharyngeal nerve (IX).r"],
            "vagus": ["Vagus nerve (X).r"],
            "accessory": ["Accessory nerve (XI).r"],
            "hypoglossal": ["Hypoglossal nerve (XII).r"],
            "parotid_nodes": ["Intraglandular parotid nodes.r", "Superficial parotid nodes.r",
                              "Pre-auricular nodes.r", "Infra-auricular nodes.r"],
        },
        "curve_scale": {"facial_trunk": 2.2, "temporal_branch": 1.8, "zygomatic_branch": 1.8,
                        "buccal_branch": 1.8, "mmn": 1.8, "cervical_branch": 1.8,
                        "posterior_auricular_nerve": 1.8, "parotid_duct": 1.4, "glossopharyngeal": 1.4,
                        "vagus": 1.4, "accessory": 1.6, "hypoglossal": 1.4, "sta": 1.2,
                        "transverse_facial": 1.3},
        "bones": {"mandible", "temporal", "zygomatic", "atlas"},
        "clip_below": {"Vagus nerve (X).r": 1.475, "Accessory nerve (XI).r": 1.470,
                       "Internal jugular vein.r": 1.470, "Sternocleidomastoid muscle.r": 1.465,
                       "Platysma.r": 1.470, "External jugular vein.r": 1.470},
        "side": "r",
        "drawn": {"great_auricular": 0.0011},
        "courses": {
            "facial_trunk": {"path": [("Facial nerve (VII).r", 0, 12)],
                             "points": {"stylomastoid": ("last_in", ("Facial nerve (VII).r", 0), ["Temporal bone.r"], 0.0015),
                                        "posterior_auricular": ("spline_start", "Facial nerve (VII).r", 9),
                                        "pes": ("spline_point", "Facial nerve (VII).r", 0, 15),
                                        "temporal": ("spline_start", "Facial nerve (VII).r", 8),
                                        "zygomatic": ("spline_start", "Facial nerve (VII).r", 7),
                                        "buccal": ("spline_start", "Facial nerve (VII).r", 3),
                                        "cervical": ("spline_start", "Facial nerve (VII).r", 2),
                                        "mmn": "end"}},
        },
    },

    "thyroid": {
        # Midline, at the level of the thyroid gland.
        "centre": (0.0, -0.010, 1.470),
        "landmarks": "thyroid",
        "structures": {
            "hyoid": ["Hyoid bone"],
            "larynx": ["Thyroid cartilage", "Cricoid cartilage", "Arytenoid cartilage.l", "Arytenoid cartilage.r", "Epiglottis"],
            "trachea": ["Trachea"],
            "sternum": ["Manubrium of sternum"],
            "clavicles": ["Clavicle.l", "Clavicle.r"],
            "vertebrae": ["Vertebra C5", "Vertebra C6", "Vertebra C7", "Vertebra T1"],
            "thyroid": ["Thyroid gland"],
            "parathyroid_superior": ["Superior parathyroid gland.l", "Superior parathyroid gland.r"],
            "parathyroid_inferior": ["Inferior parathyroid gland.l", "Inferior parathyroid gland.r"],
            "thymus": ["Left lobe of thymus", "Right lobe of thymus"],
            "sternohyoid": ["Sternohyoid muscle.l", "Sternohyoid muscle.r"],
            "sternothyroid": ["Sternothyroid muscle.l", "Sternothyroid muscle.r"],
            "thyrohyoid": ["Thyrohyoid muscle.l", "Thyrohyoid muscle.r"],
            "omohyoid": ["Omohyoid muscle.l", "Omohyoid muscle.r"],
            "scm": ["Sternocleidomastoid muscle.l", "Sternocleidomastoid muscle.r"],
            "cricothyroid": ["Straight part of cricothyroid muscle.l", "Straight part of cricothyroid muscle.r",
                             "Oblique part of cricothyroid muscle.l", "Oblique part of cricothyroid muscle.r"],
            "constrictor": ["Inferior pharyngeal constrictor.l", "Inferior pharyngeal constrictor.r"],
            "oesophagus": ["Oesophagus"],
            "platysma": ["Platysma.l", "Platysma.r"],
            "cca": ["Left common carotid artery", "Right common carotid artery", "Brachiocephalic trunk",
                    "External carotid artery.l", "External carotid artery.r",
                    "Internal carotid artery.l", "Internal carotid artery.r"],
            "ita": ["Inferior thyroid artery.l", "Inferior thyroid artery.r", "Thyrocervical trunk.l", "Thyrocervical trunk.r"],
            "subclavian_arteries": ["Left subclavian artery", "Right subclavian artery", "Aortic arch"],
            "ijv": ["Internal jugular vein.l", "Internal jugular vein.r"],
            "brachiocephalic_veins": ["Left brachiocephalic vein", "Right brachiocephalic vein"],
            "ajv": ["Anterior jugular vein.l", "Anterior jugular vein.r"],
            "superior_thyroid_vein": ["Superior thyroid vein.l", "Superior thyroid vein.r"],
            "vagus": ["Vagus nerve (X).l", "Vagus nerve (X).r"],
            "nodes_vi": ["Pretracheal nodes.l", "Pretracheal nodes.r", "Paratracheal cervical nodes",
                         "Thyroid nodes.l", "Thyroid nodes.r"],
            "nodes_lateral": ["Anterior inferior jugular nodes.l", "Anterior inferior jugular nodes.r",
                              "Inferior deep lateral cervical nodes.l", "Inferior deep lateral cervical nodes.r"],
        },
        "curve_scale": {"vagus": 1.6, "ita": 1.4, "superior_thyroid_vein": 1.4, "cca": 1.0},
        "bones": {"hyoid", "larynx", "trachea", "sternum", "clavicles", "vertebrae"},
        # (below, above) heights in metres; geometry outside is dropped.
        "clip": {"Trachea": (1.355, 9), "Oesophagus": (1.355, 9), "Vagus nerve (X).l": (1.345, 1.52),
                 "Vagus nerve (X).r": (1.345, 1.52), "Left lobe of thymus": (1.345, 9), "Right lobe of thymus": (1.345, 9),
                 "Sternocleidomastoid muscle.l": (0, 1.52), "Sternocleidomastoid muscle.r": (0, 1.52),
                 "Internal jugular vein.l": (0, 1.52), "Internal jugular vein.r": (0, 1.52),
                 "Platysma.l": (1.37, 1.52), "Platysma.r": (1.37, 1.52),
                 "Omohyoid muscle.l": (0, 1.52), "Omohyoid muscle.r": (0, 1.52),
                 "Left subclavian artery": (0, 9), "Clavicle.l": (0, 9),
                 "External carotid artery.l": (0, 1.535), "External carotid artery.r": (0, 1.535),
                 "Internal carotid artery.l": (0, 1.535), "Internal carotid artery.r": (0, 1.535)},
        # Structures Z-Anatomy lacks, drawn as paths on its anatomy.
        "drawn": {"rln_right": 0.0012, "rln_left": 0.0012, "sln": 0.0010, "ebsln": 0.0008,
                  "superior_thyroid_artery": 0.0013, "middle_thyroid_vein": 0.0013, "inferior_thyroid_veins": 0.0013},
        "courses": {
            "rln_right": {"path": [("rln_right", 0)],
                          "points": {"loop": "start", "ita": ("nearest", "Inferior thyroid artery.r"), "entry": "end"}},
            "rln_left": {"path": [("rln_left", 0)],
                         "points": {"loop": "start", "ita": ("nearest", "Inferior thyroid artery.l"), "entry": "end"}},
        },
    },
    "larynx": {
        # Midline, at the glottis.
        "centre": (0.0, -0.015, 1.478),
        "landmarks": "thyroid",
        "structures": {
            "hyoid": ["Hyoid bone"],
            "thyroid_cartilage": ["Thyroid cartilage"],
            "cricoid": ["Cricoid cartilage"],
            "arytenoids": ["Arytenoid cartilage.l", "Arytenoid cartilage.r", "Corniculate cartilage.l", "Corniculate cartilage.r"],
            "epiglottis": ["Epiglottis"],
            "trachea": ["Trachea"],
            "thyrohyoid_membrane": ["Median thyrohyoid ligament", "Lateral thyrohyoid ligament.l", "Lateral thyrohyoid ligament.r"],
            "cricothyroid_membrane": ["Median cricothyroid ligament"],
            "quadrangular_membrane": ["Quadrangular membrane.l", "Quadrangular membrane.r"],
            "pca": ["Posterior crico-arytenoid muscle.l", "Posterior crico-arytenoid muscle.r"],
            "lca": ["Lateral crico-arytenoid muscle.l", "Lateral crico-arytenoid muscle.r"],
            "interarytenoid": ["Transverse arytenoid muscle", "Ary-epiglottic part of oblique arytenoid muscle.l",
                               "Ary-epiglottic part of oblique arytenoid muscle.r"],
            "thyroarytenoid": ["External part of thyro-arytenoid muscle.l", "External part of thyro-arytenoid muscle.r",
                               "Thyro-epiglottic part of thyro-arytenoid muscle.l", "Thyro-epiglottic part of thyro-arytenoid muscle.r"],
            "cricothyroid": ["Straight part of cricothyroid muscle.l", "Straight part of cricothyroid muscle.r",
                             "Oblique part of cricothyroid muscle.l", "Oblique part of cricothyroid muscle.r"],
            "thyrohyoid": ["Thyrohyoid muscle.l", "Thyrohyoid muscle.r"],
            "sternothyroid": ["Sternothyroid muscle.l", "Sternothyroid muscle.r"],
            "sternohyoid": ["Sternohyoid muscle.l", "Sternohyoid muscle.r"],
            "omohyoid": ["Omohyoid muscle.l", "Omohyoid muscle.r"],
            "constrictors": ["Inferior pharyngeal constrictor.l", "Inferior pharyngeal constrictor.r",
                             "Middle pharyngeal constrictor.l", "Middle pharyngeal constrictor.r"],
            "laryngopharynx": ["Laryngopharynx"],
            "tongue": ["Tongue"],
            "thyroid": ["Thyroid gland"],
            "vertebrae": ["Vertebra C3", "Vertebra C4", "Vertebra C5", "Vertebra C6"],
            "cca": ["Left common carotid artery", "Right common carotid artery",
                    "External carotid artery.l", "External carotid artery.r",
                    "Internal carotid artery.l", "Internal carotid artery.r"],
            "ita": ["Inferior thyroid artery.l", "Inferior thyroid artery.r"],
            "ijv": ["Internal jugular vein.l", "Internal jugular vein.r"],
            "superior_thyroid_vein": ["Superior thyroid vein.l", "Superior thyroid vein.r"],
            "vagus": ["Vagus nerve (X).l", "Vagus nerve (X).r"],
        },
        "curve_scale": {"vagus": 1.6, "ita": 1.4, "superior_thyroid_vein": 1.4, "cca": 1.0},
        "bones": {"hyoid", "thyroid_cartilage", "cricoid", "arytenoids", "epiglottis", "trachea", "vertebrae"},
        # (below, above) heights in metres; geometry outside is dropped.
        # Drawn paths are clipped by their app id.
        "clip": {"Trachea": (1.425, 9), "Left common carotid artery": (1.43, 9), "Right common carotid artery": (1.43, 9),
                 "External carotid artery.l": (0, 1.535), "External carotid artery.r": (0, 1.535),
                 "Internal carotid artery.l": (0, 1.535), "Internal carotid artery.r": (0, 1.535),
                 "Internal jugular vein.l": (1.43, 1.535), "Internal jugular vein.r": (1.43, 1.535),
                 "Vagus nerve (X).l": (1.43, 1.545), "Vagus nerve (X).r": (1.43, 1.545),
                 "Sternohyoid muscle.l": (1.43, 9), "Sternohyoid muscle.r": (1.43, 9),
                 "Sternothyroid muscle.l": (1.43, 9), "Sternothyroid muscle.r": (1.43, 9),
                 "Omohyoid muscle.l": (1.43, 9), "Omohyoid muscle.r": (1.43, 9),
                 "rln_right": (1.43, 9), "rln_left": (1.43, 9)},
        "drawn": {"vocal_folds": 0.0017, "vestibular_folds": 0.0014,
                  "rln_right": 0.0010, "rln_left": 0.0010, "sln": 0.0009, "ebsln": 0.0007,
                  "superior_thyroid_artery": 0.0012, "superior_laryngeal_artery": 0.0007},
    },
    "carotid": {
        # Right carotid bifurcation.
        "centre": (-0.030, -0.004, 1.505),
        "landmarks": "thyroid",
        "sides": (-1,),
        "structures": {
            "mandible": ["Mandible"],
            "temporal": ["Temporal bone.r"],
            "hyoid": ["Hyoid bone"],
            "larynx": ["Thyroid cartilage", "Cricoid cartilage"],
            "vertebrae": ["Vertebra C3", "Vertebra C4", "Vertebra C5"],
            "scm": ["Sternocleidomastoid muscle.r"],
            "digastric": ["Posterior belly of digastric muscle.r", "Intermediate tendon of digastric muscle.r",
                          "Anterior belly of digastric muscle.r"],
            "stylohyoid": ["Stylohyoid muscle.r"],
            "omohyoid": ["Omohyoid muscle.r"],
            "sternohyoid": ["Sternohyoid muscle.r"],
            "thyrohyoid": ["Thyrohyoid muscle.r"],
            "hyoglossus": ["Hyoglossus muscle.r"],
            "mylohyoid": ["Mylohyoid muscle.r"],
            "constrictors": ["Inferior pharyngeal constrictor.r", "Middle pharyngeal constrictor.r"],
            "platysma": ["Platysma.r"],
            "smg": ["Submandibular gland.r"],
            "parotid": ["Parotid gland.r"],
            "thyroid": ["Thyroid gland"],
            "triangle": ["Carotid triangle.r"],
            "cca": ["Right common carotid artery"],
            "ica": ["Internal carotid artery.r"],
            "eca": ["External carotid artery.r"],
            "facial_artery": ["Facial artery.r"],
            "occipital_artery": [("Occipital artery.r", [(0, 0)])],
            "ascending_pharyngeal": ["Ascending pharyngeal artery.r"],
            "facial_vein": ["Facial vein.r"],
            "lingual_vein": ["Lingual vein.r"],
            "superior_thyroid_vein": ["Superior thyroid vein.r"],
            "retromandibular": ["Retromandibular vein.r"],
            "ejv": ["External jugular vein.r"],
            # Z-Anatomy's loop of XII passes medial to the external carotid; keep its
            # intracranial and tongue parts and redraw the loop (see drawn_hypoglossal).
            "hypoglossal": [("Hypoglossal nerve (XII).r", [(0, 0, 14), (0, 17), (1, 0), (2, 0), (3, 0), (4, 0),
                                                            (5, 0), (6, 0), (7, 0)])],
            "accessory": [("Accessory nerve (XI).r", [(0, 0), (1, 0), (2, 0)])],
            "glossopharyngeal": ["Glossopharyngeal nerve (IX).r"],
            "sympathetic": ["Sympathetic trunk.r"],
            "nodes_ii": ["Jugulodigastric node.r", "Lateral superior jugular node.r"],
            "nodes_iii": ["Anterior inferior jugular nodes.r"],
        },
        "curve_scale": {"vagus": 1.6, "hypoglossal": 1.6, "accessory": 1.6, "glossopharyngeal": 1.6, "sympathetic": 1.5,
                        "lingual_vein": 1.4, "superior_thyroid_vein": 1.4, "facial_vein": 1.2, "ascending_pharyngeal": 1.4},
        "bones": {"mandible", "temporal", "hyoid", "larynx", "vertebrae"},
        # (below, above) heights in metres; geometry outside is dropped.
        "clip": {"Right common carotid artery": (1.43, 9), "Internal carotid artery.r": (0, 1.565),
                 "Sympathetic trunk.r": (1.43, 1.56), "Glossopharyngeal nerve (IX).r": (1.50, 9),
                 "Accessory nerve (XI).r": (1.43, 9), "Sternocleidomastoid muscle.r": (1.42, 9),
                 "Omohyoid muscle.r": (1.43, 9), "Sternohyoid muscle.r": (1.43, 9), "External jugular vein.r": (1.43, 9),
                 "Platysma.r": (1.43, 9), "Anterior inferior jugular nodes.r": (1.445, 9),
                 "Hypoglossal nerve (XII).r": (0, 1.575)},
        # Z-Anatomy puts the right internal jugular vein and vagus medial to the
        # carotids at the bifurcation; they are redrawn in their usual places.
        "courses": {
            "eca": {"path": [("External carotid artery.r", 0)],
                    "points": {"origin": "start", "sta": ("nearest_start", "superior_thyroid_artery"),
                               "lingual": ("nearest_start", "lingual_artery"), "facial": ("nearest_start", "Facial artery.r"),
                               "occipital": ("nearest_start", "Occipital artery.r"), "parotid": "end"}},
        },
        "drawn": {"ijv": 0.0055, "vagus": 0.0012, "hypoglossal": 0.0010, "facial_vein": 0.0022,
                  "lingual_artery": 0.0011, "ansa_cervicalis": 0.0006, "superior_thyroid_artery": 0.0012,
                  "superior_laryngeal_artery": 0.0007, "sln": 0.0009, "ebsln": 0.0007},
    },
    "skull_base": {
        # Midline, at the level of the petrous temporal bones.
        "centre": (0.0, -0.005, 1.575),
        "fill_clipped": True,  # close meshes cut by "clip", so cross-sections cap them correctly
        "structures": {
            # ---- bone (both sides) ----
            "occipital": ["Occipital bone"],
            "sphenoid": ["Sphenoid bone"],
            "temporal": ["Temporal bone.l", "Temporal bone.r"],
            "ethmoid": ["Ethmoid bone"],
            "frontal": ["Frontal bone"],
            "atlas_axis": ["Atlas (C1)", "Axis (C2)"],
            "facial_skeleton": ["Maxilla.l", "Maxilla.r", "Palatine bone.l", "Palatine bone.r", "Vomer",
                                "Zygomatic bone.l", "Zygomatic bone.r", "Nasal bone.l", "Nasal bone.r"],
            "mandible": ["Mandible"],
            # ---- brain and dura ----
            "brainstem": ["Medulla oblongata.l", "Medulla oblongata.r", "Pons.l", "Pons.r", "Midbrain.l", "Midbrain.r"],
            "optic_chiasm": ["Optic chiasm.l", "Optic chiasm.r", "Optic tract.l", "Optic tract.r"],
            "pituitary": ["Adenohypophysis", "Neurohypophysis"],
            "tentorium": ["Tentorium cerebelli.l", "Tentorium cerebelli.r"],
            # ---- cranial nerves (right) ----
            "cn1": ["Olfactory nerve (I).r"],
            "cn2": ["Optic nerve (II).r"],
            "cn3": ["Oculomotor nerve (III).r"],
            "cn4": ["Trochlear nerve (IV).r"],
            "cn5": ["Trigeminal nerve (V).r"],
            "v1": ["Ophthalmic nerve.r"],
            "v2": ["Maxillary nerve.r"],
            "v3": ["Anterior division of mandibular nerve.r", "Posterior division of mandibular nerve.r",
                   "Inferior alveolar nerve.r", "Lingual nerve.r"],
            "cn6": ["Abducens nerve (VI).r"],
            "cn7": ["Facial nerve (VII).r"],
            "chorda": ["Chorda tympani.r"],
            "cn8": ["Vestibulocochlear nerve (VIII).r"],
            "cn9": ["Glossopharyngeal nerve (IX).r"],
            "cn10": [("Vagus nerve (X).r", [(2, 0)])],
            "cn11": ["Accessory nerve (XI).r"],
            "cn12": ["Hypoglossal nerve (XII).r"],
            # ---- arteries ----
            "ica": ["Internal carotid artery.r"],
            "vertebral": ["Vertebral artery.r", "Vertebral artery.l"],
            "basilar": ["Basilar artery"],
            "pca": ["Posterior cerebral artery.r", "Posterior communicating artery.r"],
            "cerebellar_arteries": ["Superior cerebellar artery.r", "Anterior inferior cerebellar artery.r",
                                    "Posterior inferior cerebellar artery.r"],
            "anterior_circulation": ["Middle cerebral artery (M1-segment).r", "Anterior cerebral artery.r"],
            "ophthalmic_artery": ["Ophthalmic artery.r"],
            "middle_meningeal": ["Middle meningeal artery.r"],
            "maxillary_artery": ["Maxillary artery.r"],
            # ---- veins and dural sinuses ----
            "cavernous_sinus": ["Cavernous sinus.r"],
            "sigmoid_sinus": ["Transverse sinus.r", "Sigmoid sinus.r"],
            "petrosal_sinuses": ["Superior petrosal sinus.r", "Inferior petrosal sinus.r"],
            "ijv": ["Internal jugular vein.r"],
        },
        "curve_scale": {"cn1": 1.2, "cn2": 3.0, "cn3": 1.8, "cn4": 1.4, "cn5": 3.2, "v1": 1.8, "v2": 2.0, "v3": 1.8,
                        "cn6": 1.5, "cn7": 1.8, "chorda": 1.3, "cn8": 2.6, "cn9": 1.5, "cn10": 1.8, "cn11": 1.5,
                        "cn12": 1.6, "ophthalmic_artery": 1.3, "middle_meningeal": 1.5, "cerebellar_arteries": 1.2,
                        "pca": 1.2, "petrosal_sinuses": 1.4},
        "bones": {"occipital", "sphenoid", "temporal", "ethmoid", "frontal", "atlas_axis", "facial_skeleton", "mandible"},
        # (below, above) heights in metres; geometry outside is dropped.
        "clip": {"Occipital bone": (0, 1.602), "Frontal bone": (0, 1.622),
                 "Internal carotid artery.r": (1.50, 9), "Vertebral artery.r": (1.50, 9), "Vertebral artery.l": (1.50, 9),
                 "Glossopharyngeal nerve (IX).r": (1.50, 9), "Vagus nerve (X).r": (1.50, 9),
                 "Accessory nerve (XI).r": (1.50, 9), "Hypoglossal nerve (XII).r": (1.50, 9),
                 "Internal jugular vein.r": (1.50, 9), "Posterior cerebral artery.r": (0, 1.62)},
        # Named points (right side): foramina from Z-Anatomy's label anchors, or
        # where a nerve or vessel passes through bone. See course_point().
        "points": {
            "foramen_magnum": ("anchor", "Foramen magnum.j"),
            "foramen_ovale": ("anchor", "Foramen ovale.j"),
            "foramen_rotundum": ("anchor", "Foramen rotundum.j"),
            "foramen_spinosum": ("anchor", "Foramen spinosum.j"),
            "hypoglossal_canal": ("anchor", "Hypoglossal canal.j"),
            "optic_canal": ("anchor", "Optic canal.j"),
            "condylar_canal": ("anchor", "Condylar canal.j"),
            "pterygoid_canal": ("anchor", "Pterygoid canal.j"),
            "mental_foramen": ("anchor", "Mental foramen.j"),
            "jugular_foramen": ("closest", ("Vagus nerve (X).r", 2), ["Occipital bone", "Temporal bone.r"], (1.545, 1.575)),
            "carotid_canal": ("first_in", ("Internal carotid artery.r", 0), ["Temporal bone.r"], 0.0015),
            "foramen_lacerum": ("last_in", ("Internal carotid artery.r", 0), ["Temporal bone.r"], 0.0015),
            "internal_acoustic_meatus": ("first_in", ("Facial nerve (VII).r", 0), ["Temporal bone.r"], 0.0015),
            "stylomastoid_foramen": ("last_in", ("Facial nerve (VII).r", 0), ["Temporal bone.r"], 0.0015),
            "superior_orbital_fissure": ("closest", ("Oculomotor nerve (III).r", 0), ["Sphenoid bone"], (1.58, 1.61), -0.040),
            "cribriform_plate": ("closest", ("Olfactory nerve (I).r", 1), ["Ethmoid bone"], (1.59, 1.62)),
        },
        # Course of each traced structure: its main path (objects and splines,
        # joined end to end) and the waypoints the app pins along it.
        "courses": {
            "cn1": {"path": [("Olfactory nerve (I).r", 1)], "points": {"bulb": "start", "cribriform": "@cribriform_plate"}},
            "cn2": {"path": [("Optic nerve (II).r", 0)], "points": {"chiasm": "start", "canal": "@optic_canal", "orbit": "end"}},
            "cn3": {"path": [("Oculomotor nerve (III).r", 0)],
                    "points": {"origin": "start", "cavernous": ("nearest", "Cavernous sinus.r"), "sof": "@superior_orbital_fissure", "orbit": "end"}},
            "cn4": {"path": [("Trochlear nerve (IV).r", 0)],
                    "points": {"origin": "start", "cavernous": ("nearest", "Cavernous sinus.r"), "sof": "@superior_orbital_fissure", "orbit": "end"}},
            "cn5": {"path": [("Trigeminal nerve (V).r", 0), ("Trigeminal nerve (V).r", 1)],
                    "points": {"origin": "start", "ganglion": ("spline_end", "Trigeminal nerve (V).r", 0), "ovale": "@foramen_ovale"}},
            "v1": {"path": [("Ophthalmic nerve.r", 0)],
                   "points": {"ganglion": "start", "cavernous": ("nearest", "Cavernous sinus.r"), "sof": "@superior_orbital_fissure", "orbit": "end"}},
            "v2": {"path": [("Maxillary nerve.r", 0)],
                   "points": {"ganglion": "start", "rotundum": "@foramen_rotundum", "ppf": ("spline_start", "Maxillary nerve.r", 1), "infraorbital": "end"}},
            "v3": {"path": [("Trigeminal nerve (V).r", 1), ("Posterior division of mandibular nerve.r", 0),
                            ("Inferior alveolar nerve.r", 0), ("Inferior alveolar nerve.r", 1)],
                   "points": {"ovale": "@foramen_ovale", "lingual": ("spline_start", "Lingual nerve.r", 0),
                              "mandibular_foramen": ("first_in", None, ["Mandible"], 0.002), "mental": "@mental_foramen"}},
            "cn6": {"path": [("Abducens nerve (VI).r", 0)],
                    "points": {"origin": "start", "dorello": ("closest", None, ["Temporal bone.r", "Sphenoid bone"], (1.585, 1.600)),
                               "cavernous": ("nearest", "Cavernous sinus.r"), "sof": "@superior_orbital_fissure", "orbit": "end"}},
            "cn7": {"path": [("Facial nerve (VII).r", 0)],
                    "points": {"origin": "start", "iam": "@internal_acoustic_meatus", "chorda": ("nearest_start", "Chorda tympani.r"),
                               "stylomastoid": "@stylomastoid_foramen", "face": "end"}},
            "cn8": {"path": [("Vestibulocochlear nerve (VIII).r", 0)], "points": {"origin": "start", "iam": "end"}},
            "cn9": {"path": [("Glossopharyngeal nerve (IX).r", 0)], "zmin": 1.50,
                    "points": {"origin": "start", "jugular": "@jugular_foramen", "neck": "end"}},
            "cn10": {"path": [("Vagus nerve (X).r", 2)], "zmin": 1.50,
                     "points": {"origin": "start", "jugular": "@jugular_foramen", "neck": "end"}},
            "cn11": {"path": [("Accessory nerve (XI).r", 0)], "zmin": 1.50,
                     "points": {"origin": "start", "magnum": "@foramen_magnum", "jugular": "@jugular_foramen", "neck": "end"}},
            "cn12": {"path": [("Hypoglossal nerve (XII).r", 0)], "zmin": 1.50,
                     "points": {"origin": "start", "canal": "@hypoglossal_canal", "neck": "end"}},
            "ica": {"path": [("Internal carotid artery.r", 0)], "zmin": 1.50,
                    "points": {"neck": "start", "canal": "@carotid_canal", "lacerum": "@foramen_lacerum",
                               "cavernous": ("nearest", "Cavernous sinus.r"), "ophthalmic": ("nearest_start", "Ophthalmic artery.r"), "terminal": "end"}},
            "vertebral": {"path": [("Vertebral artery.r", 0)], "zmin": 1.50,
                          "points": {"atlas": ("closest", None, ["Atlas (C1)"], (1.50, 1.56)), "magnum": "@foramen_magnum", "basilar": "end"}},
            "basilar": {"path": [("Basilar artery", 0)],
                        "points": {"formed": "start", "aica": ("nearest_start", "Anterior inferior cerebellar artery.r"),
                                   "sca": ("nearest_start", "Superior cerebellar artery.r"), "top": "end"}},
            "middle_meningeal": {"path": [("Maxillary artery.r", 0), ("Middle meningeal artery.r", 0)],
                                 "points": {"maxillary": ("nearest_start", "Middle meningeal artery.r"), "spinosum": "@foramen_spinosum", "end": "end"}},
            "sigmoid_sinus": {"path": [("Transverse sinus.r", 0), ("Sigmoid sinus.r", 0), ("Internal jugular vein.r", 0)], "zmin": 1.50,
                              "points": {"confluence": "start", "sigmoid": ("spline_start", "Sigmoid sinus.r", 0),
                                         "jugular": ("spline_end", "Sigmoid sinus.r", 0), "neck": "end"}},
        },
    },
    "infratemporal": {
        # Right infratemporal fossa, between the ramus and the lateral pterygoid plate.
        "centre": (-0.036, -0.020, 1.570),
        "fill_clipped": True,
        "structures": {
            # ---- bone ----
            "mandible": ["Mandible"] + LOWER_TEETH,
            "maxilla": ["Maxilla.r", "Palatine bone.r", "Upper first molar tooth.r", "Upper second molar tooth.r"],
            "zygomatic": ["Zygomatic bone.r"],
            "sphenoid": ["Sphenoid bone"],
            "temporal": ["Temporal bone.r"],
            "parietal": ["Parietal bone.r"],
            # ---- temporomandibular joint and ligaments ----
            # Z-Anatomy's lateral ligament is mislabelled: its ".l" object is on the right.
            "tmj_capsule": ["Articular capsule of temporomandibular joint.r", "Lateral temporomandibular ligament.l"],
            "tmj_disc": ["Articular disc of temporomandibular joint.r"],
            "sphenomandibular": ["Sphenomandibular ligament.r"],
            "stylomandibular": ["Stylomandibular ligament.r"],
            "pterygospinous": ["Pterygospinous ligament.r"],
            # ---- muscles ----
            "temporalis": ["Temporalis muscle.r"],
            "masseter": ["Superficial part of masseter.r", "Deep part of masseter.r"],
            "lpt_superior": ["Superior head of lateral pterygoid muscle.r"],
            "lpt_inferior": ["Inferior head of lateral pterygoid muscle.r"],
            "medial_pterygoid": ["Medial pterygoid muscle.r"],
            "superior_constrictor": ["Superior pharyngeal constrictor.r"],
            "digastric_post": ["Posterior belly of digastric muscle.r"],
            "styloid_muscles": ["Stylohyoid muscle.r", "Stylohyoid ligament.r", "Stylopharyngeus muscle.r"],
            "parotid": ["Parotid gland.r"],
            # ---- nerves ----
            "v3_trunk": [("Trigeminal nerve (V).r", [(1, 0)])],
            "v3_anterior": ["Anterior division of mandibular nerve.r"],
            "v3_posterior": ["Posterior division of mandibular nerve.r"],
            "ian": ["Inferior alveolar nerve.r"],
            "lingual_nerve": ["Lingual nerve.r"],
            "buccal_nerve": ["Buccal nerve.r"],
            "chorda": ["Chorda tympani.r"],
            "nerve_mylohyoid": ["Nerve to mylohyoid muscle.r"],
            "v2": ["Maxillary nerve.r"],
            "facial_nerve": ["Facial nerve (VII).r"],
            # ---- arteries ----
            "eca": ["External carotid artery.r"],
            "maxillary_artery": ["Maxillary artery.r"],
            "mma": ["Middle meningeal artery.r"],
            "accessory_meningeal": ["Accessory branch of middle meningeal artery.r"],
            "iaa": ["Inferior alveolar artery.r", "Mylohyoid branch of inferior alveolar artery.r",
                    "Mental branch of inferior alveolar artery.r"],
            "deep_temporal_arteries": ["Anterior deep temporal artery.r", "Posterior deep temporal artery.r"],
            "buccal_artery": ["Buccal artery.r"],
            "psa": ["Posterior superior alveolar artery.r"],
            "descending_palatine": ["Descending palatine artery.r", "Greater palatine artery.r"],
            "sphenopalatine": ["Posterior lateral nasal branches of sphenopalatine artery..r",
                               "Posterior septal branches of sphenopalatine artery.r"],
            "pterygoid_canal_artery": ["Artery of pterygoid canal.r"],
            "sta": ["Superficial temporal artery.r", "Frontal branch of superficial temporal artery.r"],
            "transverse_facial": ["Transverse facial artery.r"],
            "ica": ["Internal carotid artery.r"],
            # ---- veins ----
            "maxillary_vein": ["Maxillary veins.r"],
            "retromandibular": ["Retromandibular vein.r", "Anterior division of retromandibular vein.r",
                                "Posterior division of retromandibular vein.r", "Superficial temporal veins.r"],
            "ijv": ["Internal jugular vein.r"],
        },
        "curve_scale": {"v3_trunk": 2.6, "v3_anterior": 2.0, "v3_posterior": 2.2, "ian": 1.8, "lingual_nerve": 1.8,
                        "buccal_nerve": 1.5, "chorda": 1.2, "nerve_mylohyoid": 1.2, "v2": 1.8, "facial_nerve": 1.6,
                        "maxillary_artery": 2.0, "mma": 1.6, "accessory_meningeal": 1.1, "iaa": 1.3,
                        "deep_temporal_arteries": 1.2, "buccal_artery": 1.1, "psa": 1.1, "descending_palatine": 1.2,
                        "sphenopalatine": 1.0, "pterygoid_canal_artery": 1.0, "sta": 1.4, "transverse_facial": 1.1,
                        "maxillary_vein": 2.2, "retromandibular": 1.6},
        "bones": {"mandible", "maxilla", "zygomatic", "sphenoid", "temporal", "parietal"},
        "clip": {"Parietal bone.r": (0, 1.665), "Superficial temporal artery.r": (0, 1.665),
                 "Superficial temporal veins.r": (0, 1.665), "Frontal branch of superficial temporal artery.r": (0, 1.665),
                 "Internal carotid artery.r": (1.50, 1.585), "Internal jugular vein.r": (1.50, 9),
                 "External carotid artery.r": (1.50, 9), "Superior pharyngeal constrictor.r": (1.52, 9),
                 "Stylopharyngeus muscle.r": (1.51, 9), "Stylohyoid muscle.r": (1.51, 9)},
        "side": "r",
        # Mandibular nerve branches Z-Anatomy lacks. See drawn_auriculotemporal() and below.
        "drawn": {"auriculotemporal": 0.0009, "masseteric_nerve": 0.0008, "deep_temporal_nerves": 0.0008,
                  "nerve_medial_pterygoid": 0.0007, "otic_ganglion": 0.0018},
        "points": {
            "foramen_ovale": ("anchor", "Foramen ovale.j"),
            "foramen_spinosum": ("anchor", "Foramen spinosum.j"),
            "mental_foramen": ("anchor", "Mental foramen.j"),
            "lateral_pterygoid_plate": ("anchor", "Lateral pterygoid plate.j"),
            "spine_of_sphenoid": ("anchor", "Spine of sphenoid bone.j"),
            "mandibular_foramen": ("first_in", ("Inferior alveolar nerve.r", 0), ["Mandible"], 0.002),
            "mandibular_notch": ("closest", ("masseteric_nerve", 0), ["Mandible"], (1.553, 1.570)),
            "pterygomaxillary_fissure": ("spline_end", "Maxillary artery.r", 0),
            "stylomastoid_foramen": ("last_in", ("Facial nerve (VII).r", 0), ["Temporal bone.r"], 0.0015),
        },
        "courses": {
            "maxillary_artery": {"path": [("Maxillary artery.r", 0)],
                                 "points": {"origin": "start", "iaa": ("nearest_start", "Inferior alveolar artery.r"),
                                            "mma": ("nearest_start", "Middle meningeal artery.r"),
                                            "accessory": ("nearest_start", "Accessory branch of middle meningeal artery.r"),
                                            "deep_temporal": ("nearest_start", "Posterior deep temporal artery.r"),
                                            "buccal": ("nearest_start", "Buccal artery.r"), "ppf": "end"}},
            "mma": {"path": [("Maxillary artery.r", 0), ("Middle meningeal artery.r", 0)],
                    "points": {"maxillary": ("nearest_start", "Middle meningeal artery.r"),
                               "auriculotemporal": ("nearest", "auriculotemporal"), "spinosum": "@foramen_spinosum"}},
            "v3_trunk": {"path": [("Trigeminal nerve (V).r", 1), ("Posterior division of mandibular nerve.r", 0),
                                  ("Inferior alveolar nerve.r", 0), ("Inferior alveolar nerve.r", 1)],
                         "points": {"ovale": "@foramen_ovale", "otic": ("nearest", "otic_ganglion"),
                                    "anterior": ("spline_end", "Anterior division of mandibular nerve.r", 0),
                                    "lingual": ("spline_start", "Lingual nerve.r", 0),
                                    "mylohyoid": ("spline_start", "Nerve to mylohyoid muscle.r", 0),
                                    "mandibular_foramen": "@mandibular_foramen", "mental": "@mental_foramen"}},
            "lingual_nerve": {"path": [("Lingual nerve.r", 0)],
                              "points": {"origin": "start", "chorda": ("nearest", "Chorda tympani.r"),
                                         "molar": ("closest", None, ["Mandible"], (1.522, 1.545)), "tongue": "end"}},
            "buccal_nerve": {"path": [("Anterior division of mandibular nerve.r", 0), ("Buccal nerve.r", 0)],
                             "points": {"division": "start", "heads": ("nearest", "Inferior head of lateral pterygoid muscle.r"),
                                        "cheek": "end"}},
            "auriculotemporal": {"path": [("auriculotemporal", 0), ("auriculotemporal", 2)],
                                 "points": {"origin": "start", "mma": ("nearest", "Middle meningeal artery.r"),
                                            "tmj": ("nearest", "Articular capsule of temporomandibular joint.r"),
                                            "temple": "end"}},
            "chorda": {"path": [("Chorda tympani.r", 0)], "points": {"fissure": "start", "lingual": "end"}},
        },
        "spaces": {
            # The fossa itself: a hull around the pterygoids and the maxillary artery.
            "s_itf": {"type": "hull", "objects": ["Medial pterygoid muscle.r", "Inferior head of lateral pterygoid muscle.r",
                                                   "Superior head of lateral pterygoid muscle.r", "Sphenomandibular ligament.r"],
                      "inflate": 0.0015},
        },
    },
    "pterygopalatine": {
        # Right pterygopalatine fossa, between the pterygoid process and the back of the maxilla.
        "centre": (-0.016, -0.036, 1.572),
        "fill_clipped": True,
        "structures": {
            # ---- bone ----
            "maxilla": ["Maxilla.r", "Upper first molar tooth.r", "Upper second molar tooth.r"],
            "palatine": ["Palatine bone.r"],
            "sphenoid": ["Sphenoid bone"],
            "vomer": ["Vomer"],
            "ethmoid_conchae": ["Ethmoid bone", "Inferior nasal concha bone.r"],
            "zygomatic": ["Zygomatic bone.r"],
            # ---- soft tissue ----
            "nasal_mucosa": ["Mucosa of nasal cavity"],
            "auditory_tube": ["Auditory tube.r"],
            "pterygoids": ["Medial pterygoid muscle.r", "Inferior head of lateral pterygoid muscle.r",
                           "Superior head of lateral pterygoid muscle.r"],
            # ---- nerves ----
            "trigeminal": [("Trigeminal nerve (V).r", [(1, 0)])],
            "v2": ["Maxillary nerve.r"],
            # ---- arteries ----
            "maxillary_artery": ["Maxillary artery.r"],
            "infraorbital_artery": ["Infra-orbital artery.r"],
            "psa": ["Posterior superior alveolar artery.r"],
            "descending_palatine": ["Descending palatine artery.r", "Greater palatine artery.r"],
            "sphenopalatine": ["Posterior lateral nasal branches of sphenopalatine artery..r",
                               "Posterior septal branches of sphenopalatine artery.r"],
            "pterygoid_canal_artery": ["Artery of pterygoid canal.r"],
            "ica": ["Internal carotid artery.r"],
        },
        "curve_scale": {"trigeminal": 2.4, "v2": 2.2, "maxillary_artery": 2.0, "infraorbital_artery": 1.3, "psa": 1.2,
                        "descending_palatine": 1.3, "sphenopalatine": 1.1, "pterygoid_canal_artery": 1.1},
        "bones": {"maxilla", "palatine", "sphenoid", "vomer", "ethmoid_conchae", "zygomatic"},
        "clip": {"Sphenoid bone": (1.53, 1.61), "Internal carotid artery.r": (1.56, 1.60),
                 "Maxilla.r": (1.53, 9), "Medial pterygoid muscle.r": (1.545, 9)},
        "side": "r",
        # Nerves Z-Anatomy lacks. See drawn_ppg() and below.
        "drawn": {"ppg": 0.0018, "ganglionic_branches": 0.0006, "vidian": 0.0008, "greater_palatine_n": 0.0008,
                  "nasopalatine": 0.0007, "psa_nerve": 0.0007, "zygomatic_nerve": 0.0007, "pharyngeal_nerve": 0.0006},
        "points": {
            "foramen_rotundum": ("anchor", "Foramen rotundum.j"),
            "pterygoid_canal": ("anchor", "Pterygoid canal.j"),
            "pterygomaxillary_fissure": ("spline_end", "Maxillary artery.r", 0),
            "sphenopalatine_foramen": ("spline_start", "Posterior septal branches of sphenopalatine artery.r", 0),
            "greater_palatine_foramen": ("spline_start", "Descending palatine artery.r", 0),
            "incisive_canal": ("spline_end", "Posterior septal branches of sphenopalatine artery.r", 0),
            "inferior_orbital_fissure": ("spline_point", "Maxillary nerve.r", 0, 7),
            "infraorbital_foramen": ("spline_start", "Maxillary nerve.r", 1),
        },
        "courses": {
            "v2": {"path": [("Maxillary nerve.r", 0)],
                   "points": {"ganglion": "start", "rotundum": "@foramen_rotundum", "ppg": ("nearest", "ppg"),
                              "iof": "@inferior_orbital_fissure", "foramen": "@infraorbital_foramen", "face": "end"}},
            "vidian": {"path": [("vidian", 0)],
                       "points": {"lacerum": "start", "canal": "@pterygoid_canal", "ganglion": "end"}},
            "greater_palatine_n": {"path": [("greater_palatine_n", 0)],
                                   "points": {"ganglion": "start", "foramen": "@greater_palatine_foramen", "palate": "end"}},
            "nasopalatine": {"path": [("nasopalatine", 0)],
                             "points": {"ganglion": "start", "spf": "@sphenopalatine_foramen", "incisive": "end"}},
            "infraorbital_artery": {"path": [("Maxillary artery.r", 0), ("Infra-orbital artery.r", 0)],
                                    "points": {"origin": "start", "ptm": "@pterygomaxillary_fissure", "foramen": "end"}},
        },
    },
    "deep_neck": {
        # Midline, at the level of the hyoid and angle of the mandible.
        "centre": (0.0, -0.012, 1.50),
        "fill_clipped": True,
        "structures": {
            # ---- bone and cartilage ----
            "mandible": ["Mandible"],
            "skull_base": ["Sphenoid bone", "Temporal bone.l", "Temporal bone.r", "Occipital bone"],
            "hyoid": ["Hyoid bone"],
            "larynx": ["Thyroid cartilage", "Cricoid cartilage", "Epiglottis"],
            "vertebrae": ["Atlas (C1)", "Axis (C2)", "Vertebra C3", "Vertebra C4", "Vertebra C5", "Vertebra C6", "Vertebra C7"],
            # ---- fascia ----
            "investing_fascia": ["Superficial investing cervical fascia.l", "Superficial investing cervical fascia.r"],
            # ---- muscles ----
            "constrictors": ["Superior pharyngeal constrictor.l", "Superior pharyngeal constrictor.r",
                             "Middle pharyngeal constrictor.l", "Middle pharyngeal constrictor.r",
                             "Inferior pharyngeal constrictor.l", "Inferior pharyngeal constrictor.r"],
            "longus": ["Longus colli muscle.l", "Longus colli muscle.r", "Longus capitis muscle.l", "Longus capitis muscle.r"],
            "pterygoids": ["Medial pterygoid muscle.l", "Medial pterygoid muscle.r",
                           "Inferior head of lateral pterygoid muscle.l", "Inferior head of lateral pterygoid muscle.r",
                           "Superior head of lateral pterygoid muscle.l", "Superior head of lateral pterygoid muscle.r"],
            "masseter": ["Superficial part of masseter.l", "Superficial part of masseter.r", "Deep part of masseter.l", "Deep part of masseter.r"],
            "styloid_muscles": ["Stylopharyngeus muscle.l", "Stylopharyngeus muscle.r", "Stylohyoid muscle.l", "Stylohyoid muscle.r"],
            "digastric": ["Posterior belly of digastric muscle.l", "Posterior belly of digastric muscle.r",
                          "Anterior belly of digastric muscle.l", "Anterior belly of digastric muscle.r",
                          "Intermediate tendon of digastric muscle.l", "Intermediate tendon of digastric muscle.r"],
            "mylohyoid": ["Mylohyoid muscle.l", "Mylohyoid muscle.r"],
            "scm": ["Sternocleidomastoid muscle.l", "Sternocleidomastoid muscle.r"],
            # ---- viscera and glands ----
            "pharynx": ["Nasopharynx", "Oropharynx", "Laryngopharynx", "Soft palate"],
            "oesophagus_trachea": ["Oesophagus", "Trachea"],
            "tonsils": ["Palatine tonsil.l", "Palatine tonsil.r"],
            "parotid": ["Parotid gland.l", "Parotid gland.r"],
            "smg": ["Submandibular gland.l", "Submandibular gland.r"],
            "sublingual": ["Sublingual gland.l", "Sublingual gland.r"],
            "thyroid": ["Thyroid gland"],
            # ---- vessels and nodes ----
            "carotids": ["Left common carotid artery", "Right common carotid artery", "Internal carotid artery.l",
                         "Internal carotid artery.r", "External carotid artery.l", "External carotid artery.r"],
            "rp_nodes": ["Retropharyngeal nodes.l", "Retropharyngeal nodes.r"],
            "nodes_ii": ["Jugulodigastric node.l", "Jugulodigastric node.r", "Lateral superior jugular node.l", "Lateral superior jugular node.r"],
        },
        "curve_scale": {"carotids": 1.0},
        "bones": {"mandible", "skull_base", "hyoid", "larynx", "vertebrae"},
        "clip": {"Occipital bone": (0, 1.60), "Oesophagus": (1.40, 9), "Trachea": (1.40, 9),
                 "Left common carotid artery": (1.40, 9), "Right common carotid artery": (1.40, 9),
                 "Internal carotid artery.l": (0, 1.585), "Internal carotid artery.r": (0, 1.585),
                 "Superficial investing cervical fascia.l": (1.40, 9), "Superficial investing cervical fascia.r": (1.40, 9),
                 "Sternocleidomastoid muscle.l": (1.40, 9), "Sternocleidomastoid muscle.r": (1.40, 9),
                 "Longus colli muscle.l": (1.40, 9), "Longus colli muscle.r": (1.40, 9)},
        # The internal jugular veins and vagus nerves as redrawn in the carotid region (Z-Anatomy puts them medial to the carotids).
        "drawn": {"ijv": 0.0055, "vagus": 0.0012},
        # Fascial spaces (both sides unless noted). See build_space().
        "spaces": {
            "s_parapharyngeal": {"type": "pps"},
            "s_retropharyngeal": {"type": "rp", "part": "retro"},
            "s_danger": {"type": "rp", "part": "danger"},
            "s_prevertebral": {"type": "loft", "objects": ["Longus colli muscle.l", "Longus colli muscle.r",
                                                            "Longus capitis muscle.l", "Longus capitis muscle.r"],
                               "levels": (1.40, 1.566, 0.006), "margin": 0.0012},
            "s_carotid": {"type": "loft", "objects": ["Internal carotid artery.r", "Right common carotid artery", "ijv", "vagus"],
                          "side": -1, "mirror": True, "levels": (1.40, 1.572, 0.006), "margin": 0.002},
            "s_visceral": {"type": "loft", "objects": ["Thyroid cartilage", "Cricoid cartilage", "Trachea", "Oesophagus",
                                                        "Thyroid gland", "Inferior pharyngeal constrictor.l", "Inferior pharyngeal constrictor.r"],
                           "levels": (1.40, 1.496, 0.006), "margin": 0.0015},
            "s_masticator": {"type": "hull", "objects": ["Superficial part of masseter.r", "Deep part of masseter.r", "Medial pterygoid muscle.r",
                                                          "Inferior head of lateral pterygoid muscle.r", "Superior head of lateral pterygoid muscle.r"],
                             "inflate": 0.0015, "mirror": True},
            "s_parotid": {"type": "hull", "objects": ["Parotid gland.r", "Retromandibular vein.r"], "inflate": 0.002, "mirror": True},
            "s_submandibular": {"type": "hull", "objects": ["Submandibular gland.r", "Submandibular nodes.r",
                                                             "Intermediate tendon of digastric muscle.r"], "inflate": 0.002, "mirror": True},
            "s_sublingual": {"type": "hull", "objects": ["Sublingual gland.r", "Submandibular duct.r"], "inflate": 0.002, "mirror": True},
            "s_submental": {"type": "hull", "objects": ["Anterior belly of digastric muscle.r", "Anterior belly of digastric muscle.l"],
                            "inflate": 0.001},
            "s_peritonsillar": {"type": "hull", "objects": ["Palatine tonsil.r"], "inflate": 0.002, "mirror": True},
        },
    },
}

cfg = REGIONS[REGION]
SIDES = cfg.get("sides", (-1, 1))  # which sides the drawn thyroid-region paths cover
bpy.ops.wm.open_mainfile(filepath=BLEND)
deps = bpy.context.evaluated_depsgraph_get()
D = bpy.data.objects

# Blender (Z-up, front = -Y, metres) -> app (Y-up, front = +Z, centimetres).
if "centre_object" in cfg:
    o = D[cfg["centre_object"]]
    centre = o.matrix_world @ (sum((Vector(c) for c in o.bound_box), Vector()) / 8)
else:
    centre = Vector(cfg["centre"])
AXES = Matrix(((1, 0, 0, 0), (0, 0, 1, 0), (0, -1, 0, 0), (0, 0, 0, 1)))
TO_APP = AXES @ Matrix.Scale(100, 4) @ Matrix.Translation(-centre)


# ---------- geometry access ----------

def world_verts(name):
    o = D[name]
    return [o.matrix_world @ v.co for v in o.data.vertices]


def curve_points(name, spline):
    o = D[name]
    return [o.matrix_world @ p.co for p in o.data.splines[spline].bezier_points]


def along_z(points, z, axis):
    """Interpolate a coordinate of a polyline at height z (clamped at the ends)."""
    pts = sorted(points, key=lambda p: p.z)
    if z <= pts[0].z:
        return pts[0][axis]
    for a, b in zip(pts, pts[1:]):
        if a.z <= z <= b.z:
            t = (z - a.z) / ((b.z - a.z) or 1)
            return a[axis] + (b[axis] - a[axis]) * t
    return pts[-1][axis]


def slice_of(verts, z, half=0.003):
    return [v for v in verts if abs(v.z - z) < half]


# ---------- landmarks for the lateral neck ----------

class NeckLandmarks:
    def __init__(self, side="l"):
        self.side = 1 if side == "l" else -1  # +x is the patient's left
        sfx = "." + side
        self.hyoid = min(v.z for v in world_verts("Hyoid bone"))            # lower border of hyoid
        self.cricoid = min(v.z for v in world_verts("Cricoid cartilage"))   # lower border of cricoid
        self.notch = max(v.z for v in world_verts("Manubrium of sternum"))  # suprasternal notch
        self.gland_back = max(v.y for v in world_verts("Submandibular gland" + sfx))
        self.scm = world_verts("Sternocleidomastoid muscle" + sfx)
        self.cca = curve_points("Left common carotid artery" if side == "l" else "Right common carotid artery", 0)
        self.accessory = curve_points("Accessory nerve (XI)" + sfx, 2)  # trunk crossing the posterior triangle
        self.ijv = curve_points("Internal jugular vein" + sfx, 0)
        self.scalenus = world_verts("Scalenus anterior muscle" + sfx)
        self.anterior_belly = world_verts("Anterior belly of digastric muscle" + sfx)

    def scm_back(self, z):
        """y of the posterior border of sternocleidomastoid at height z."""
        s = slice_of(self.scm, z) or slice_of(self.scm, z, 0.008)
        return max(v.y for v in s)

    def cca_x(self, z):
        return along_z(self.cca, z, 0)

    def accessory_y(self, z):
        return along_z(self.accessory, z, 1)

    def ijv_distance(self, c):
        """Distance from c to the internal jugular vein in the horizontal plane."""
        x, y = along_z(self.ijv, c.z, 0), along_z(self.ijv, c.z, 1)
        return ((c.x - x) ** 2 + (c.y - y) ** 2) ** 0.5

    def digastric_x(self, y):
        """x of the anterior belly of digastric at depth y."""
        near = [v.x for v in self.anterior_belly if abs(v.y - y) < 0.005]
        return sum(near) / len(near) if near else 0.012


def neck_level(c, L):
    """Neck dissection level for a node centred at c (AHNS/AAO-HNS, Robbins 2002/2008).

    The jugular chain (levels II-IV) is taken as nodes within 1.5 cm of the
    internal jugular vein; level V as nodes further out, behind
    sternocleidomastoid and lateral to the vein; level VI as nodes medial to
    the common carotid artery.
    """
    jugular = L.ijv_distance(c) < 0.015
    posterior = not jugular and c.y > L.scm_back(c.z) and c.x > along_z(L.ijv, c.z, 0)
    if c.z > L.hyoid:
        if c.y < L.gland_back:  # in front of the back of the submandibular gland (stylohyoid)
            return "nodes_ia" if c.x < L.digastric_x(c.y) else "nodes_ib"
        if posterior:
            return "nodes_va"
        return "nodes_iia" if c.y < L.accessory_y(c.z) else "nodes_iib"
    if c.z < L.notch - 0.005:
        return None  # below the neck
    if abs(c.x) < L.cca_x(c.z) - 0.005:
        return "nodes_vi"
    if posterior:
        return "nodes_va" if c.z > L.cricoid else "nodes_vb"
    return "nodes_iii" if c.z > L.cricoid else "nodes_iv"


# ---------- drawn paths for structures Z-Anatomy lacks ----------

def drawn_phrenic(L):
    """Down the front of scalenus anterior, lateral border above to medial border below."""
    zs = [max(v.z for v in L.scalenus) - 0.004 - i * 0.0012 for i in range(7)]
    pts = []
    for i, z in enumerate(zs):
        s = slice_of(L.scalenus, z)
        front = min(v.y for v in s)
        strip = [v for v in s if v.y < front + 0.003]
        x0, x1 = min(v.x for v in strip), max(v.x for v in strip)
        t = i / (len(zs) - 1)
        x = x0 + (x1 - x0) * (0.75 - 0.55 * t)
        pts.append(Vector((x, front - 0.0015, z)))
    last = pts[-1]
    pts += [last + Vector((-0.003, -0.002, -0.015)), last + Vector((-0.005, -0.001, -0.03))]
    return pts


def drawn_thoracic_duct(L):
    """Arches up behind the carotid sheath, in front of scalenus anterior,
    and down into the junction of the internal jugular and subclavian veins."""
    angle = min(L.ijv, key=lambda p: p.z)  # left venous angle
    z_apex = angle.z + 0.020
    s = [v for v in L.scalenus if abs(v.z - z_apex) < 0.004 and abs(v.x - 0.031) < 0.004]
    sa_front = min(v.y for v in s) if s else -0.006
    return [
        Vector((0.009, 0.008, angle.z - 0.035)),
        Vector((0.012, 0.010, angle.z - 0.007)),
        Vector((L.cca_x(angle.z + 0.014) + 0.001, 0.009, angle.z + 0.014)),
        Vector((0.031, sa_front - 0.004, z_apex)),
        Vector((0.029, (sa_front - 0.004 + angle.y) / 2, angle.z + 0.008)),
        angle.copy(),
    ]


def drawn_great_auricular(L):
    """From Erb's point (1 cm below where the accessory nerve crosses the
    posterior border of sternocleidomastoid) up across the muscle towards
    the ear lobe."""
    sx = L.side
    z_cross = next(p.z for p in sorted(L.accessory, key=lambda p: -p.z) if p.y > L.scm_back(p.z))
    z0 = z_cross - 0.010
    s = slice_of(L.scm, z0)
    erb = max(s, key=lambda v: v.y)
    pts = [erb + Vector((0.002 * sx, 0.002, 0))]
    for t in (0.2, 0.45, 0.7, 1.0):
        z = z0 + (1.555 - z0) * t
        y = erb.y + (0.012 - erb.y) * t
        near = [v for v in L.scm if abs(v.z - z) < 0.006 and abs(v.y - y) < 0.006]
        x = sx * max(sx * v.x for v in near) if near else pts[-1].x
        pts.append(Vector((x + 0.0015 * sx, y, z)))
    return pts



# ---------- landmarks and drawn paths for the thyroid region ----------

class ThyroidLandmarks:
    def __init__(self):
        self.trachea = world_verts("Trachea")
        self.cartilage = world_verts("Thyroid cartilage")
        thyroid = D["Thyroid gland"]
        me = thyroid.evaluated_get(deps).to_mesh()  # includes the mirrored left lobe
        self.gland = [thyroid.matrix_world @ v.co for v in me.vertices]
        self.ijv = {s: curve_points("Internal jugular vein." + s, 0) for s in "lr"}
        self.eca = {s: curve_points("External carotid artery." + s, 0) for s in "lr"}
        self.vagus = {s: curve_points("Vagus nerve (X)." + s, 2) for s in "lr"}
        self.bcv = curve_points("Left brachiocephalic vein", 0)
        self.cricothyroid = {s: world_verts("Straight part of cricothyroid muscle." + s) for s in "lr"}

    def groove(self, z, sx):
        """Tracheo-oesophageal groove: posterolateral corner of the trachea at height z."""
        sl = slice_of(self.trachea, z, 0.002) or slice_of(self.trachea, z, 0.006)
        half = max(abs(v.x) for v in sl)
        back = max(v.y for v in sl)
        front = min(v.y for v in sl)
        return Vector((sx * half * 0.9, back - (back - front) * 0.18, z))

    def cricothyroid_joint(self, sx):
        """Tip of the inferior horn of the thyroid cartilage on one side."""
        mid_y = sum(v.y for v in self.cartilage) / len(self.cartilage)
        side = [v for v in self.cartilage if sx * v.x > 0.6 * max(abs(w.x) for w in self.cartilage) and v.y > mid_y]
        return min(side, key=lambda v: v.z)

    def arytenoid(self, sx):
        return world_verts("Arytenoid cartilage." + ("l" if sx > 0 else "r"))

    def thyroid_angle(self, z):
        """Inner surface of the thyroid cartilage in the midline at height z."""
        mid = [v for v in self.cartilage if abs(v.x) < 0.0015 and abs(v.z - z) < 0.0012]
        return max(mid, key=lambda v: v.y)

    def upper_pole(self, sx):
        return max((v for v in self.gland if sx * v.x > 0.005), key=lambda v: v.z)

    def lower_pole(self, sx):
        return min((v for v in self.gland if sx * v.x > 0.004), key=lambda v: v.z)


def side_vec(sx, x, y, z):
    return Vector((sx * x, y, z))


def drawn_rln(L, sx):
    """Recurrent laryngeal nerve: hooks under the right subclavian artery (right)
    or the aortic arch (left), then climbs the tracheo-oesophageal groove and
    enters the larynx just behind the cricothyroid joint."""
    entry = L.cricothyroid_joint(sx) + Vector((0, 0.003, 0.002))
    if sx < 0:  # right: oblique course from the subclavian loop
        start = side_vec(sx, 0.020, 0.000, 1.413)
        pts = [start, side_vec(sx, 0.023, 0.005, 1.405), side_vec(sx, 0.019, 0.009, 1.410)]
        zs = [1.420, 1.430, 1.440, 1.450]
    else:  # left: under the arch, then nearly vertical in the groove
        start = side_vec(sx, 0.016, -0.001, 1.372)
        pts = [start, side_vec(sx, 0.016, 0.006, 1.360), side_vec(sx, 0.012, 0.012, 1.368)]
        zs = [1.380, 1.395, 1.410, 1.425, 1.440, 1.450]
    pts += [L.groove(z, sx) for z in zs]
    pts.append(entry)
    return pts


def drawn_rln_right(L):
    return drawn_rln(L, -1)


def drawn_rln_left(L):
    return drawn_rln(L, 1)


def drawn_sln(L):
    """Superior laryngeal nerve from the vagus to its division near the greater
    horn of the hyoid, and the internal branch to the thyrohyoid membrane."""
    out = []
    for sx in SIDES:
        start = min(L.vagus["l" if sx > 0 else "r"], key=lambda p: abs(p.z - 1.535))
        out.append([start, side_vec(sx, 0.027, 0.004, 1.520), side_vec(sx, 0.026, 0.002, 1.506),
                    side_vec(sx, 0.022, -0.006, 1.499), side_vec(sx, 0.018, -0.012, 1.495)])
    return out


def drawn_ebsln(L):
    """External branch: down on the inferior constrictor, deep to the superior
    thyroid artery, to cricothyroid."""
    out = []
    for sx in SIDES:
        ct = L.cricothyroid["l" if sx > 0 else "r"]
        target = sum(ct, Vector()) / len(ct)
        out.append([side_vec(sx, 0.026, 0.002, 1.506), side_vec(sx, 0.022, -0.002, 1.490),
                    side_vec(sx, 0.017, -0.005, 1.478), target + Vector((sx * 0.002, 0.001, 0.002))])
    return out


def drawn_superior_thyroid_artery(L):
    """First branch of the external carotid, down and forward to the upper pole."""
    out = []
    for sx in SIDES:
        eca = L.eca["l" if sx > 0 else "r"]
        origin = min(eca, key=lambda p: p.z) + Vector((0, -0.001, 0.003))
        pole = L.upper_pole(sx)
        out.append([origin, origin + Vector((sx * -0.002, -0.006, 0.002)),
                    (origin + pole) / 2 + Vector((0, -0.006, 0.004)), pole + Vector((0, -0.002, 0.001))])
    return out


def drawn_middle_thyroid_vein(L):
    """From the lateral surface of each lobe straight out to the internal jugular vein."""
    out = []
    for sx in SIDES:
        z = 1.470
        lateral = max((v for v in slice_of(L.gland, z, 0.003)), key=lambda v: sx * v.x)
        ijv = L.ijv["l" if sx > 0 else "r"]
        target = Vector((along_z(ijv, z, 0), along_z(ijv, z, 1), z))
        out.append([lateral, (lateral + target) / 2 + Vector((0, -0.002, -0.002)), target])
    return out


def drawn_inferior_thyroid_veins(L):
    """From each lower pole down in front of the trachea to the left brachiocephalic vein."""
    out = []
    target = min(L.bcv, key=lambda p: abs(p.x))
    for sx in SIDES:
        pole = L.lower_pole(sx)
        out.append([pole, pole + Vector((sx * -0.003, -0.004, -0.015)),
                    Vector((sx * 0.004, target.y + 0.002, 1.405)), target + Vector((sx * 0.003, 0.002, 0.002))])
    return out


def drawn_vocal_folds(L):
    """Vocal folds: from the inner angle of the thyroid cartilage (anterior
    commissure) to the vocal process of each arytenoid. The tube's centre sits
    lateral to the free edge so the edges, not the centres, meet in front."""
    out = []
    for sx in SIDES:
        ary = L.arytenoid(sx)
        vp = min(ary, key=lambda v: v.y)  # vocal process: most anterior point
        front = L.thyroid_angle(vp.z - 0.0016)
        out.append([front + Vector((sx * 0.0018, 0.0012, 0)),
                    (front + vp) / 2 + Vector((sx * 0.0030, 0, 0)),
                    vp + Vector((sx * 0.0014, 0.0012, 0.0002)),
                    vp + Vector((sx * 0.0016, 0.0030, 0.0004))])
    return out


def drawn_vestibular_folds(L):
    """Vestibular (false) folds: above and lateral to the vocal folds, from the
    thyroid angle just below the epiglottic attachment to the front of each
    arytenoid, with the ventricle between the two folds."""
    out = []
    for sx in SIDES:
        ary = L.arytenoid(sx)
        vp = min(ary, key=lambda v: v.y)
        top = max(ary, key=lambda v: v.z)
        front = L.thyroid_angle(vp.z + 0.0030)
        back = Vector((top.x + sx * 0.0012, vp.y + 0.003, vp.z + 0.0052))
        out.append([front + Vector((sx * 0.0030, 0.0016, 0)),
                    (front + back) / 2 + Vector((sx * 0.0050, 0, 0.0004)),
                    back])
    return out


def drawn_superior_laryngeal_artery(L):
    """Branch of the superior thyroid artery that runs medially with the
    internal laryngeal nerve and pierces the thyrohyoid membrane."""
    out = []
    for sx in SIDES:
        eca = L.eca["l" if sx > 0 else "r"]
        origin = min(eca, key=lambda p: p.z) + Vector((sx * -0.002, -0.006, 0.0005))
        out.append([origin, side_vec(sx, 0.026, -0.009, 1.4915), side_vec(sx, 0.021, -0.0125, 1.4925),
                    side_vec(sx, 0.017, -0.0135, 1.4925)])
    return out


# Carotid sheath at the right bifurcation, redrawn (Blender metres): the
# internal jugular vein lateral to the carotids, the vagus behind, between them.
CAROTID_IJV = [(-0.0368, 0.0087, 1.5701), (-0.0361, 0.0063, 1.5577), (-0.0390, 0.0030, 1.542), (-0.0415, -0.0005, 1.525),
               (-0.0420, -0.0025, 1.505), (-0.0410, -0.0045, 1.488), (-0.0380, -0.0080, 1.468), (-0.0330, -0.0130, 1.449),
               (-0.0280, -0.0165, 1.432)]
CAROTID_VAGUS = [(-0.0273, 0.0080, 1.570), (-0.0300, 0.0060, 1.556), (-0.0330, 0.0050, 1.545), (-0.0350, 0.0030, 1.525),
                 (-0.0355, 0.0020, 1.505), (-0.0340, 0.0015, 1.488), (-0.0310, 0.0010, 1.468), (-0.0280, -0.0040, 1.450),
                 (-0.0240, -0.0080, 1.435)]


def mirror_x(points):
    return [Vector((-p.x, p.y, p.z)) for p in points]


def drawn_ijv(L):
    right = [Vector(p) for p in CAROTID_IJV]
    return [right, mirror_x(right)] if 1 in SIDES else right


def drawn_vagus(L):
    right = [Vector(p) for p in CAROTID_VAGUS]
    return [right, mirror_x(right)] if 1 in SIDES else right


def drawn_hypoglossal(L):
    """Loop of XII: down between the internal carotid and the vein, hooking
    under the occipital artery, then forward superficial to the external
    carotid, rejoining Z-Anatomy's nerve on its way to hyoglossus."""
    pts = [Vector((-0.0259, 0.0014, 1.5601)), Vector((-0.0310, 0.0030, 1.557)), Vector((-0.0380, -0.0010, 1.552)),
           Vector((-0.0410, -0.0010, 1.5485)), Vector((-0.0410, -0.0060, 1.546)), Vector((-0.0380, -0.0120, 1.542)),
           Vector((-0.0340, -0.0140, 1.539)), Vector((-0.0273, -0.0134, 1.5379))]
    # Keep the loop behind and then medial to the ramus, and clear of the styloid and occipital bone.
    return push_clear(pts, [None, P_IN, P_IN, P_BACK, P_BACK, P_IN, P_IN, None],
                      bones=["Mandible", "Temporal bone.r", "Occipital bone"])


def drawn_facial_vein(L):
    """Common facial vein: from the facial and lingual veins across the front
    of the carotid bifurcation to the internal jugular vein."""
    return [Vector((-0.0332, -0.0096, 1.5291)), Vector((-0.0314, -0.0085, 1.527)), Vector((-0.0360, -0.0095, 1.523)),
            Vector((-0.0405, -0.0055, 1.519))]


def drawn_lingual_artery(L):
    """From the external carotid opposite the tip of the greater horn of the
    hyoid: a short upward loop, then forward above the horn and deep to
    hyoglossus (medial to it, below the hypoglossal nerve)."""
    eca = L.eca["r"]
    z0 = 1.505
    origin = Vector((along_z(eca, z0, 0), along_z(eca, z0, 1), z0))
    return [origin, origin + Vector((0.003, -0.003, 0.004)), Vector((-0.025, -0.009, 1.5085)),
            Vector((-0.016, -0.022, 1.5065)), Vector((-0.010, -0.034, 1.5065)), Vector((-0.008, -0.048, 1.5105))]


def drawn_ansa_cervicalis(L):
    """Superior root leaving the hypoglossal nerve and running down on the
    front of the carotid sheath; inferior root (C2-C3) passing lateral to the
    internal jugular vein; the loop low on the sheath; twigs to the strap muscles."""
    cca = curve_points("Right common carotid artery", 0)
    front = lambda z, dy=-0.0045: Vector((along_z(cca, z, 0), along_z(cca, z, 1) + dy, z))
    loop = front(1.457, -0.006)
    superior = [Vector((-0.0448, -0.0040, 1.5475)), Vector((-0.0400, -0.0085, 1.535)), Vector((-0.0360, -0.0080, 1.520)),
                Vector((-0.0330, -0.0070, 1.505)), front(1.480), front(1.466), loop]
    inferior = [Vector((-0.043, 0.010, 1.505)), Vector((-0.0385, 0.000, 1.488)), Vector((-0.036, -0.008, 1.472)),
                Vector((-0.031, -0.0115, 1.461)), loop]
    twigs = [[loop, loop + Vector((0.004, -0.006, 0.002)), Vector((-0.019, -0.022, 1.462))],
             [loop, loop + Vector((0.002, -0.004, -0.004)), Vector((-0.017, -0.024, 1.446))],
             [front(1.470, -0.006), Vector((-0.030, -0.020, 1.472)), Vector((-0.034, -0.024, 1.474))]]
    return [superior, inferior] + twigs


DRAWN = {"phrenic": drawn_phrenic, "thoracic_duct": drawn_thoracic_duct,
         "great_auricular": drawn_great_auricular,
         "rln_right": drawn_rln_right, "rln_left": drawn_rln_left, "sln": drawn_sln, "ebsln": drawn_ebsln,
         "superior_thyroid_artery": drawn_superior_thyroid_artery,
         "middle_thyroid_vein": drawn_middle_thyroid_vein, "inferior_thyroid_veins": drawn_inferior_thyroid_veins,
         "vocal_folds": drawn_vocal_folds, "vestibular_folds": drawn_vestibular_folds,
         "superior_laryngeal_artery": drawn_superior_laryngeal_artery,
         "lingual_artery": drawn_lingual_artery, "ansa_cervicalis": drawn_ansa_cervicalis,
         "ijv": drawn_ijv, "vagus": drawn_vagus, "hypoglossal": drawn_hypoglossal, "facial_vein": drawn_facial_vein}


# ---------- drawn mandibular nerve branches (infratemporal region) ----------
# Hand-placed from the right mandibular nerve (division point (-22.9, -15.0, 1576.8) mm),
# the middle meningeal artery, the neck of the mandible and the mandibular notch,
# then pushed clear of the bone surfaces (push_clear) so no path runs through bone.

ITF_BONES = ["Mandible", "Sphenoid bone", "Temporal bone.r", "Maxilla.r", "Zygomatic bone.r", "Parietal bone.r"]
BVH_CACHE = {}


def bone_bvh(name):
    from mathutils.bvhtree import BVHTree
    if name not in BVH_CACHE:
        o = D[name]
        me = o.evaluated_get(deps).to_mesh()
        BVH_CACHE[name] = BVHTree.FromPolygons([o.matrix_world @ v.co for v in me.vertices],
                                               [tuple(f.vertices) for f in me.polygons])
    return BVH_CACHE[name]


def inside_bone(p, tree):
    """Ray parity test: an odd number of crossings means p is inside the closed mesh."""
    d, o, n = Vector((0.31, 0.83, 0.47)).normalized(), p.copy(), 0
    for _ in range(64):
        hit = tree.ray_cast(o, d)[0]
        if hit is None:
            break
        n, o = n + 1, hit + d * 1e-5
    return n % 2 == 1


def push_clear(line, dirs, gap=0.0016, step=0.00025, spacing=0.0006, bones=None):
    """Resample the polyline every ~1 mm and move each sample along its
    direction until it lies outside every bone with at least `gap` clearance.
    dirs: one (dx, dy, dz) per input point, or None to keep it fixed; samples
    take the direction of the point that ends their segment."""
    pts, ds = [Vector(line[0])], [dirs[0]]
    for a, b, d in zip(line, line[1:], dirs[1:]):
        a, b = Vector(a), Vector(b)
        n = max(1, int((b - a).length / spacing))
        pts += [a.lerp(b, k / n) for k in range(1, n + 1)]
        ds += [d] * n
    out = []
    for p, d in zip(pts, ds):
        if d is not None:
            d = Vector(d).normalized()
            for _ in range(200):
                ok = True
                for name in bones or ITF_BONES:
                    t = bone_bvh(name)
                    near = t.find_nearest(p)
                    if inside_bone(p, t) or (near[0] is not None and near[3] < gap):
                        ok = False
                        break
                if ok:
                    break
                p = p + d * step
        out.append(p)
    return out[:-1:2] + out[-1:]  # every other sample (~1.2 mm) keeps the tube light


P_DOWN, P_OUT, P_BACK, P_IN = (0, 0, -1), (-1, 0, 0), (0, 1, 0), (1, 0, 0)  # push_clear directions


def drawn_auriculotemporal(L):
    """Two roots from the posterior division encircling the middle meningeal
    artery, then back behind the neck of the mandible and up through the
    parotid with the superficial temporal vessels, outside the temporal bone."""
    o = Vector((-0.0249, -0.0156, 1.5721))
    join = Vector((-0.0350, -0.0075, 1.5740))
    upper = push_clear([o, Vector((-0.0280, -0.0120, 1.5790)), Vector((-0.0320, -0.0090, 1.5800)), join],
                       [None, P_DOWN, P_DOWN, P_DOWN])
    lower = push_clear([o, Vector((-0.0290, -0.0115, 1.5700)), Vector((-0.0330, -0.0085, 1.5705)), join],
                       [None, P_DOWN, P_DOWN, P_DOWN])
    join = (upper[-1] + lower[-1]) / 2
    upper[-1] = lower[-1] = join
    trunk = push_clear([join, Vector((-0.0400, -0.0020, 1.5640)), Vector((-0.0470, 0.0015, 1.5620)),
                        Vector((-0.0560, 0.0030, 1.5660)), Vector((-0.0640, 0.0000, 1.5850)),
                        Vector((-0.0680, 0.0000, 1.6050)), Vector((-0.0700, 0.0010, 1.6250))],
                       [None, P_DOWN, P_DOWN, P_OUT, P_OUT, P_OUT, P_OUT])
    return [upper, lower, trunk]


def drawn_masseteric_nerve(L):
    """Above the lateral pterygoid and through the mandibular notch, behind
    the tendon of temporalis, into the deep surface of masseter."""
    pts = [Vector((-0.0245, -0.0165, 1.5750)), Vector((-0.0320, -0.0220, 1.5780)), Vector((-0.0400, -0.0280, 1.5720)),
           Vector((-0.0440, -0.0300, 1.5610)), Vector((-0.0480, -0.0310, 1.5520)), Vector((-0.0500, -0.0330, 1.5400))]
    return push_clear(pts, [None, P_DOWN, P_DOWN, P_DOWN, P_OUT, P_OUT])


def drawn_deep_temporal_nerves(L):
    """Anterior and posterior deep temporal nerves: over the upper head of
    lateral pterygoid, round the infratemporal crest and up on the bone of
    the temporal fossa, deep to temporalis."""
    posterior = [Vector((-0.0250, -0.0170, 1.5750)), Vector((-0.0330, -0.0220, 1.5790)), Vector((-0.0440, -0.0230, 1.5800)),
                 Vector((-0.0520, -0.0240, 1.5950)), Vector((-0.0570, -0.0250, 1.6150))]
    anterior = [Vector((-0.0270, -0.0195, 1.5700)), Vector((-0.0340, -0.0300, 1.5780)), Vector((-0.0440, -0.0370, 1.5820)),
                Vector((-0.0500, -0.0400, 1.6000)), Vector((-0.0520, -0.0420, 1.6150))]
    dirs = [None, P_DOWN, P_DOWN, P_OUT, P_OUT]
    return [push_clear(posterior, dirs), push_clear(anterior, dirs)]


def drawn_nerve_medial_pterygoid(L):
    """From the main trunk, past the otic ganglion, into medial pterygoid."""
    return [Vector((-0.0230, -0.0145, 1.5750)), Vector((-0.0220, -0.0170, 1.5680)), Vector((-0.0220, -0.0220, 1.5620)),
            Vector((-0.0240, -0.0260, 1.5550))]


def drawn_otic_ganglion(L):
    """A small swelling medial to the main trunk just below foramen ovale."""
    return [Vector((-0.0206, -0.0130, 1.5745)), Vector((-0.0205, -0.0143, 1.5740)), Vector((-0.0204, -0.0155, 1.5735))]


DRAWN.update({"auriculotemporal": drawn_auriculotemporal, "masseteric_nerve": drawn_masseteric_nerve,
              "deep_temporal_nerves": drawn_deep_temporal_nerves, "nerve_medial_pterygoid": drawn_nerve_medial_pterygoid,
              "otic_ganglion": drawn_otic_ganglion})

# ---------- drawn nerves of the pterygopalatine fossa ----------
# Placed from the right maxillary nerve (foramen rotundum at about (-16.7, -25.5, 1591.5) mm),
# the anterior opening of the pterygoid canal (-14.6, -21.2, 1582.4), the descending
# palatine and greater palatine arteries and the posterior septal artery. Nerves that
# run in bony canals (Vidian, palatine, pharyngeal) are left in them; the others are
# pushed clear of the bone with push_clear().

PPF_BONES = ["Maxilla.r", "Palatine bone.r", "Sphenoid bone", "Vomer", "Zygomatic bone.r"]
PPG = [Vector((-0.0164, -0.0262, 1.5806)), Vector((-0.0165, -0.0275, 1.5800)), Vector((-0.0166, -0.0288, 1.5793))]


def drawn_ppg(L):
    """The pterygopalatine ganglion, hanging below V2 in front of the pterygoid canal."""
    return PPG


def drawn_ganglionic_branches(L):
    """Two short roots from V2 down to the ganglion (mostly sensory fibres passing through)."""
    return [[Vector((-0.0181, -0.0262, 1.5882)), Vector((-0.0172, -0.0264, 1.5845)), PPG[0]],
            [Vector((-0.0186, -0.0290, 1.5868)), Vector((-0.0176, -0.0291, 1.5830)), PPG[2]]]


def drawn_vidian(L):
    """Nerve of the pterygoid canal: greater and deep petrosal nerves joined at
    foramen lacerum, forward through the canal to the ganglion."""
    return [Vector((-0.0158, -0.0040, 1.5760)), Vector((-0.0153, -0.0120, 1.5790)), Vector((-0.0146, -0.0212, 1.5824)),
            Vector((-0.0156, -0.0245, 1.5815)), PPG[0]]


def drawn_greater_palatine_n(L):
    """Greater palatine nerve down the greater palatine canal to the hard palate,
    and the lesser palatine nerve to the soft palate (second spline)."""
    canal = [PPG[2], Vector((-0.0166, -0.0350, 1.5730)), Vector((-0.0164, -0.0410, 1.5665)),
             Vector((-0.0161, -0.0435, 1.5600)), Vector((-0.0152, -0.0456, 1.5550))]
    palate = [Vector((-0.0150, -0.0510, 1.5500)), Vector((-0.0138, -0.0580, 1.5482)), Vector((-0.0118, -0.0640, 1.5476)),
              Vector((-0.0083, -0.0705, 1.5468)), Vector((-0.0048, -0.0750, 1.5452))]
    lesser = [Vector((-0.0161, -0.0435, 1.5600)), Vector((-0.0150, -0.0425, 1.5530)), Vector((-0.0128, -0.0400, 1.5495)),
              Vector((-0.0105, -0.0380, 1.5480))]
    return [canal + palate, lesser]


def drawn_nasopalatine(L):
    """Through the sphenopalatine foramen, across the roof of the nose to the
    septum, then down and forward on the septum to the incisive canal."""
    pts = [PPG[1], Vector((-0.0125, -0.0330, 1.5760)), Vector((-0.0095, -0.0385, 1.5725)), Vector((-0.0050, -0.0420, 1.5710)),
           Vector((-0.0035, -0.0480, 1.5650)), Vector((-0.0037, -0.0610, 1.5615)), Vector((-0.0037, -0.0705, 1.5600)),
           Vector((-0.0032, -0.0770, 1.5560)), Vector((-0.0025, -0.0790, 1.5450))]
    return push_clear(pts, [None, None, None, P_OUT, P_OUT, P_OUT, P_OUT, P_OUT, None], gap=0.0008, bones=["Vomer"])


def drawn_psa_nerve(L):
    """Posterior superior alveolar nerves: from V2 out through the pterygomaxillary
    fissure and down onto the maxillary tuberosity."""
    pts = [Vector((-0.0200, -0.0360, 1.5832)), Vector((-0.0255, -0.0400, 1.5770)), Vector((-0.0290, -0.0430, 1.5680)),
           Vector((-0.0285, -0.0450, 1.5600))]
    return push_clear(pts, [None, P_BACK, P_OUT, P_OUT], bones=PPF_BONES)


def drawn_zygomatic_nerve(L):
    """From V2 through the inferior orbital fissure onto the lateral wall of the orbit."""
    pts = [Vector((-0.0215, -0.0425, 1.5795)), Vector((-0.0262, -0.0465, 1.5800)), Vector((-0.0315, -0.0520, 1.5810)),
           Vector((-0.0355, -0.0580, 1.5830))]
    return push_clear(pts, [None, P_IN, P_IN, P_IN], bones=["Zygomatic bone.r", "Maxilla.r"])


def drawn_pharyngeal_nerve(L):
    """From the ganglion back through the palatovaginal canal to the roof of the nasopharynx."""
    return [PPG[0], Vector((-0.0125, -0.0235, 1.5770)), Vector((-0.0085, -0.0200, 1.5730)), Vector((-0.0055, -0.0160, 1.5700))]


DRAWN.update({"ppg": drawn_ppg, "ganglionic_branches": drawn_ganglionic_branches, "vidian": drawn_vidian,
              "greater_palatine_n": drawn_greater_palatine_n, "nasopalatine": drawn_nasopalatine,
              "psa_nerve": drawn_psa_nerve, "zygomatic_nerve": drawn_zygomatic_nerve,
              "pharyngeal_nerve": drawn_pharyngeal_nerve})



def curve_object(name, points, radius):
    """A tube along one polyline, or several (a list of polylines)."""
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    lines = points if points and not isinstance(points[0], Vector) else [points]
    for line in lines:
        sp = cu.splines.new("NURBS")
        sp.points.add(len(line) - 1)
        for p, v in zip(sp.points, line):
            p.co = (v.x, v.y, v.z, 1)
        sp.order_u = 3
        sp.use_endpoint_u = True
    cu.bevel_depth = radius
    obj = bpy.data.objects.new(name, cu)
    bpy.context.scene.collection.objects.link(obj)
    return obj


# ---------- mesh conversion ----------

def trimmed_curve(obj, parts):
    """Copy of obj's curve data keeping only the given (spline, first[, end]) pieces."""
    src = obj.data
    cu = src.copy()
    cu.splines.clear()
    for part in parts:
        si, first, end = (tuple(part) + (None,))[:3]
        pts = src.splines[si].bezier_points[first:end]
        sp = cu.splines.new("BEZIER")
        sp.bezier_points.add(len(pts) - 1)
        for dst, p in zip(sp.bezier_points, pts):
            dst.co, dst.handle_left, dst.handle_right = p.co, p.handle_left, p.handle_right
            dst.handle_left_type, dst.handle_right_type = p.handle_left_type, p.handle_right_type
            dst.radius = p.radius
    return cu


def world_bmesh(obj, sid, scale=1.0, parts=None):
    """Evaluated mesh of obj as a triangulated bmesh in world coordinates."""
    if obj.type == "CURVE":
        cu = obj.data
        parts = parts or cfg.get("spline_parts", {}).get(obj.name)
        if parts:
            source = obj
            cu = trimmed_curve(obj, parts)
            obj = bpy.data.objects.new(obj.name + " (part)", cu)
            obj.matrix_world = source.matrix_world.copy()
            bpy.context.scene.collection.objects.link(obj)
        cu.bevel_depth *= scale
        cu.bevel_resolution = 3
        cu.resolution_u = 10
        cu.use_fill_caps = True
        deps.update()
    elif sid not in cfg["bones"] and len(obj.data.vertices) < 1200 and not any(m.type == "SUBSURF" for m in obj.modifiers):
        # Smooth coarse soft-tissue meshes (glands, small muscles, nodes).
        mod = obj.modifiers.new("smooth", "SUBSURF")
        mod.levels = 1
        deps.update()
    me = bpy.data.meshes.new_from_object(obj.evaluated_get(deps))
    bm = bmesh.new()
    bm.from_mesh(me)
    bpy.data.meshes.remove(me)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
    bmesh.ops.triangulate(bm, faces=bm.faces)
    bm.transform(obj.matrix_world)
    return bm


def clip(bm, z, top=9.0):
    gone = [f for f in bm.faces if all(v.co.z < z for v in f.verts) or all(v.co.z > top for v in f.verts)]
    bmesh.ops.delete(bm, geom=gone, context="FACES")
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context="VERTS")
    if cfg.get("fill_clipped"):
        # Close the cut so the mesh stays watertight for cross-section capping.
        made = bmesh.ops.holes_fill(bm, edges=[e for e in bm.edges if e.is_boundary], sides=0)
        bmesh.ops.triangulate(bm, faces=made["faces"])


def to_arrays(bm):
    bm.verts.index_update()
    verts = [TO_APP @ v.co for v in bm.verts]
    tris = [[v.index for v in f.verts] for f in bm.faces]
    return verts, tris


def islands(bm):
    """Connected groups of faces, as lists of faces."""
    seen, out = set(), []
    for f in bm.faces:
        if f.index in seen:
            continue
        stack, group = [f], []
        seen.add(f.index)
        while stack:
            g = stack.pop()
            group.append(g)
            for e in g.edges:
                for h in e.link_faces:
                    if h.index not in seen:
                        seen.add(h.index)
                        stack.append(h)
        out.append(group)
    return out


def merge(faces_list):
    """Vertices and triangles (app coords) for a set of faces from one bmesh."""
    index, verts, tris = {}, [], []
    for faces in faces_list:
        for f in faces:
            tri = []
            for v in f.verts:
                if v not in index:
                    index[v] = len(verts)
                    verts.append(TO_APP @ v.co)
                tri.append(index[v])
            tris.append(tri)
    return verts, tris


# ---------- export ----------

parts = []


def add(sid, name, verts, tris):
    parts.append((sid, name, verts, tris))
    print(f"{sid:20} {name:48} {len(verts):6} verts {len(tris):6} tris")


for sid, names in cfg["structures"].items():
    for entry in names:
        name, pieces = entry if isinstance(entry, tuple) else (entry, None)
        obj = D.get(name)
        if obj is None:
            print("missing", name)
            continue
        bm = world_bmesh(obj, sid, cfg["curve_scale"].get(sid, 1.0), pieces)
        if name in cfg.get("clip_below", {}):
            clip(bm, cfg["clip_below"][name])
        if name in cfg.get("clip", {}):
            clip(bm, *cfg["clip"][name])
        add(sid, name, *to_arrays(bm))
        bm.free()

if cfg.get("landmarks") == "thyroid":
    L = ThyroidLandmarks()
    if REGION == "carotid":
        L.vagus["r"] = [Vector(p) for p in CAROTID_VAGUS]
elif cfg.get("node_groups") or cfg.get("drawn"):
    L = NeckLandmarks(cfg.get("side", "l"))

if cfg.get("node_groups"):
    by_level = defaultdict(list)
    for name in cfg["node_groups"]:
        bm = world_bmesh(D[name], "nodes")
        bm.faces.index_update()
        for faces in islands(bm):
            vs = {v for f in faces for v in f.verts}
            c = sum((v.co for v in vs), Vector()) / len(vs)
            level = neck_level(c, L)
            if level:
                by_level[level].append((name, faces))
        for level, items in sorted(by_level.items()):
            mine = [faces for n, faces in items if n == name]
            if mine:
                add(level, f"{name} ({len(mine)} nodes)", *merge(mine))
        bm.free()
    print({k: len(v) for k, v in sorted(by_level.items())})

for sid, radius in cfg.get("drawn", {}).items():
    obj = curve_object(sid, DRAWN[sid](L), radius)
    bm = world_bmesh(obj, sid)
    if sid in cfg.get("clip", {}):
        clip(bm, *cfg["clip"][sid])
    add(sid, f"{sid} (drawn)", *to_arrays(bm))
    bm.free()


# ---------- fascial spaces (schematic volumes) ----------

EVAL_CACHE = {}


def eval_verts(name):
    if name not in EVAL_CACHE:
        o = D[name]
        me = o.evaluated_get(deps).to_mesh()
        EVAL_CACHE[name] = [o.matrix_world @ v.co for v in me.vertices]
    return EVAL_CACHE[name]


def slab(names, z, half=0.0025, side=None):
    return [v for n in names for v in eval_verts(n) if abs(v.z - z) < half and (side is None or v.x * side > 0)]


def hull2d(points):
    pts = sorted(set((round(p[0], 5), round(p[1], 5)) for p in points))
    if len(pts) < 3:
        return pts
    cross = lambda o, a, b: (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lower, upper = [], []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]


def resample(poly, n=24, grow=0.0):
    """A closed polygon resampled to n points evenly by arc length, pushed out from its centre by grow."""
    cx = sum(p[0] for p in poly) / len(poly)
    cy = sum(p[1] for p in poly) / len(poly)
    if grow:
        poly = [(cx + (x - cx) * (1 + grow / max(1e-6, ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5)),
                 cy + (y - cy) * (1 + grow / max(1e-6, ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5))) for x, y in poly]
    segs = list(zip(poly, poly[1:] + poly[:1]))
    lens = [((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5 for a, b in segs]
    total = sum(lens) or 1
    out, k, acc = [], 0, 0.0
    for i in range(n):
        t = total * i / n
        while acc + lens[k] < t and k < len(lens) - 1:
            acc += lens[k]
            k += 1
        (ax, ay), (bx, by) = segs[k]
        f = (t - acc) / (lens[k] or 1)
        out.append((ax + (bx - ax) * f, ay + (by - ay) * f))
    # start each ring at its most anterior point so neighbouring rings line up
    start = min(range(n), key=lambda i: out[i][1])
    return out[start:] + out[:start]


def loft(rings):
    """Closed tube through rings of (x, y, z) tuples, all the same length, capped at both ends."""
    bm = bmesh.new()
    vs = [[bm.verts.new(p) for p in ring] for ring in rings]
    n = len(rings[0])
    for a, b in zip(vs, vs[1:]):
        for i in range(n):
            bm.faces.new((a[i], a[(i + 1) % n], b[(i + 1) % n], b[i]))
    bm.faces.new(vs[0][::-1])
    bm.faces.new(vs[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def hull3d(points, inflate):
    bm = bmesh.new()
    for p in points:
        bm.verts.new(p)
    res = bmesh.ops.convex_hull(bm, input=bm.verts)
    loose = {g for g in res["geom_interior"] + res["geom_unused"] if isinstance(g, bmesh.types.BMVert)}
    bmesh.ops.delete(bm, geom=list(loose), context="VERTS")
    c = sum((v.co for v in bm.verts), Vector()) / len(bm.verts)
    for v in bm.verts:
        d = v.co - c
        v.co = c + d * (1 + inflate / max(d.length, 1e-6))
    return bm


def frange(lo, hi, step):
    out, z = [], lo
    while z <= hi + 1e-9:
        out.append(round(z, 5))
        z += step
    return out


# Parapharyngeal (prestyloid) space, right side: corners (x, y in mm) at each
# height, from the skull base to the apex at the greater horn of the hyoid.
# Medial: pharyngobasilar fascia and constrictor; lateral: medial pterygoid and
# the deep lobe of the parotid; anterior: pterygomandibular raphe; posterior:
# the styloid diaphragm in front of the carotid space.
PPS_CORNERS = [
    (1.578, [(-10, -27), (-16, -26), (-26, -10), (-14, -8)]),
    (1.566, [(-11, -29), (-16.5, -28), (-28, -9), (-15, -7)]),
    (1.554, [(-12.5, -31), (-18.5, -30), (-30, -8), (-17, -6)]),
    (1.542, [(-14, -30), (-22, -29), (-31, -9), (-19, -6.5)]),
    (1.530, [(-16, -25), (-27, -22), (-31, -10), (-21, -7)]),
    (1.519, [(-18, -18), (-25, -17), (-28.5, -9), (-21, -7.5)]),
    (1.511, [(-20.5, -11), (-24.5, -10.5), (-26, -6.5), (-21.5, -5.5)]),
]


def pps_rings(side):
    rings = []
    for z, corners in PPS_CORNERS:
        poly = [(side * -x / 1000, y / 1000) for x, y in corners]
        rings.append([(x, y, z) for x, y in resample(poly if side < 0 else poly[::-1], 24)])
    return rings


def rp_rings(part):
    """Retropharyngeal and danger spaces: thin layers where the back of the
    pharynx and oesophagus meets the prevertebral muscles (in life the
    retropharyngeal space lies in front of the alar fascia, the danger space
    behind it), reaching laterally to the carotid sheaths."""
    phar = ["Superior pharyngeal constrictor.l", "Superior pharyngeal constrictor.r", "Middle pharyngeal constrictor.l",
            "Middle pharyngeal constrictor.r", "Inferior pharyngeal constrictor.l", "Inferior pharyngeal constrictor.r",
            "Nasopharynx", "Oropharynx", "Laryngopharynx", "Oesophagus"]
    lon = ["Longus colli muscle.l", "Longus colli muscle.r", "Longus capitis muscle.l", "Longus capitis muscle.r"]
    rings, last = [], None
    for z in frange(1.40, 1.575, 0.005):
        P = [v for v in slab(phar, z) if abs(v.x) < 0.012]
        Lg = slab(lon, z)
        if P and Lg:
            yi = (max(v.y for v in P) + min(v.y for v in Lg)) / 2
            I = slab(["Internal carotid artery.r", "Right common carotid artery"], z, 0.003)
            w = min(0.022, max(0.012, (min(-v.x for v in I) - 0.007) if I else 0.02))
            last = (yi, w)
        if last is None:
            continue
        yi, w = last
        y0, y1 = (yi - 0.0032, yi) if part == "retro" else (yi + 0.0004, yi + 0.0026)
        poly = [(-w, y0), (w, y0), (w, y1), (-w, y1)]
        rings.append([(x, y, z) for x, y in resample(poly, 28)])
    return rings


def build_space(sid, spec):
    """Mesh object(s) for a fascial space (marked as drawn in the app)."""
    pieces = []
    if spec["type"] == "hull":
        pts = [v for n in spec["objects"] for v in eval_verts(n)]
        pieces.append(hull3d(pts, spec["inflate"]))
        if spec.get("mirror"):
            pieces.append(hull3d(mirror_x(pts), spec["inflate"]))
    elif spec["type"] == "loft":
        side = spec.get("side")
        rings = []
        for z in frange(*spec["levels"]):
            pts = slab(spec["objects"], z, 0.003, side)
            if len(pts) >= 3:
                poly = hull2d([(p.x, p.y) for p in pts])
                if len(poly) >= 3:
                    rings.append([(x, y, z) for x, y in resample(poly, 28, spec["margin"])])
        pieces.append(loft(rings))
        if spec.get("mirror"):
            pieces.append(loft([[(-x, y, z) for x, y, z in ring[::-1]] for ring in rings]))
    elif spec["type"] == "pps":
        pieces += [loft(pps_rings(-1)), loft(pps_rings(1))]
    elif spec["type"] == "rp":
        pieces.append(loft(rp_rings(spec["part"])))
    for k, bm in enumerate(pieces):
        me = bpy.data.meshes.new(f"{sid}.{k}")
        bm.to_mesh(me)
        bm.free()
        obj = bpy.data.objects.new(f"{sid}.{k}", me)
        bpy.context.scene.collection.objects.link(obj)
        out = world_bmesh(obj, sid)
        add(sid, f"{sid} (drawn) {k}", *to_arrays(out))
        out.free()


for sid, spec in cfg.get("spaces", {}).items():
    build_space(sid, spec)

lo = Vector((min(v[i] for p in parts for v in p[2]) for i in range(3)))
hi = Vector((max(v[i] for p in parts for v in p[2]) for i in range(3)))
span = hi - lo

blob = bytearray()
meshes = []
for sid, name, verts, tris in parts:
    entry = {"id": sid, "name": name, "vertexCount": len(verts), "indexCount": len(tris) * 3}
    entry["positions"] = len(blob)
    for v in verts:
        q = [round((v[i] - lo[i]) / span[i] * 65535) - 32768 for i in range(3)]
        blob += struct.pack("<3h", *q)
    while len(blob) % 4:
        blob += b"\0"
    big = len(verts) > 65535
    entry["indexType"] = "u32" if big else "u16"
    entry["indices"] = len(blob)
    fmt = "<3I" if big else "<3H"
    for t in tris:
        blob += struct.pack(fmt, *t)
    while len(blob) % 4:
        blob += b"\0"
    meshes.append(entry)


# ---------- named points and courses (traced structures) ----------

def spline_world(name, i):
    o = D[name]
    sp = o.data.splines[i]
    pts = sp.bezier_points or sp.points
    return [o.matrix_world @ (p.co.xyz if len(p.co) == 4 else p.co) for p in pts]


def dense(points, step=0.0008):
    """Resample a polyline every ~0.8 mm."""
    out = []
    for a, b in zip(points, points[1:]):
        n = max(1, int((b - a).length / step))
        out += [a.lerp(b, k / n) for k in range(n)]
    return out + points[-1:]


BONE_CACHE = {}


def bone_tree(names):
    from mathutils.kdtree import KDTree
    key = tuple(names)
    if key not in BONE_CACHE:
        verts = []
        for n in names:
            o = D[n]
            me = o.evaluated_get(deps).to_mesh()
            verts += [o.matrix_world @ v.co for v in me.vertices]
        tree = KDTree(len(verts))
        for k, v in enumerate(verts):
            tree.insert(v, k)
        tree.balance()
        BONE_CACHE[key] = tree
    return BONE_CACHE[key]


POINTS = {}


def course_point(spec, path):
    """Resolve a waypoint spec to a Blender world point (metres)."""
    if spec == "start":
        return path[0]
    if spec == "end":
        return path[-1]
    if isinstance(spec, str) and spec.startswith("@"):
        return POINTS[spec[1:]]
    kind = spec[0]
    if kind == "anchor":
        o = D[spec[1]]
        me = o.evaluated_get(deps).to_mesh()
        p = o.matrix_world @ me.vertices[1].co  # the hooked vertex sits on the bone
        return Vector((-abs(p.x), p.y, p.z))  # this region's nerves and vessels are right-sided
    if kind == "spline_point":
        return spline_world(spec[1], spec[2])[spec[3]]
    if kind in ("spline_start", "spline_end"):
        pts = spline_world(spec[1], spec[2])
        return pts[0] if kind == "spline_start" else pts[-1]
    if kind in ("nearest", "nearest_start"):
        o = D[spec[1]]
        if kind == "nearest_start":
            # The branch's origin: whichever end of its first spline is nearer the path.
            ends = spline_world(spec[1], 0)
            line = dense(path)
            target = [min((ends[0], ends[-1]), key=lambda e: min((p - e).length for p in line))]
        else:
            me = o.evaluated_get(deps).to_mesh()
            target = [o.matrix_world @ v.co for v in me.vertices]
        return min(dense(path), key=lambda p: min((p - t).length for t in target[::7] or target))
    line = dense(path if spec[1] is None else spline_world(*spec[1]))
    tree = bone_tree(spec[2])
    dist = [tree.find(p)[2] for p in line]
    if kind == "closest":
        lo, hi = spec[3]
        ymax = spec[4] if len(spec) > 4 else 9
        cand = [k for k, p in enumerate(line) if lo <= p.z <= hi and p.y <= ymax] or range(len(line))
        return line[min(cand, key=lambda k: dist[k])]
    inside = [k for k, d in enumerate(dist) if d < spec[3]]
    if not inside:
        return line[min(range(len(line)), key=lambda k: dist[k])]
    return line[inside[0] if kind == "first_in" else inside[-1]]


def app_point(p):
    q = TO_APP @ p
    return [round(q.x, 3), round(q.y, 3), round(q.z, 3)]


courses = {}
for key, spec in cfg.get("points", {}).items():
    POINTS[key] = course_point(spec, None) if spec[0] == "anchor" else course_point(spec, [])
for sid, c in cfg.get("courses", {}).items():
    path = []
    for piece in c["path"]:
        name, i = piece[:2]
        pts = spline_world(name, i)[piece[2] if len(piece) > 2 else 0:]
        if path and (pts[0] - path[-1]).length > (pts[-1] - path[-1]).length:
            pts = pts[::-1]  # join each piece end to end
        path += pts[1:] if path and (pts[0] - path[-1]).length < 1e-4 else pts
    if "zmin" in c:
        path = [p for p in path if p.z >= c["zmin"]]
    courses[sid] = {"path": [app_point(p) for p in path],
                    "points": {k: app_point(course_point(v, path)) for k, v in c["points"].items()}}
    print("course", sid, len(path), "points", list(courses[sid]["points"]))
points_out = {k: app_point(v) for k, v in POINTS.items()}

header = {"min": list(lo), "max": list(hi), "meshes": meshes,
          # Blender world position (metres) of the app origin, for matching to scans.
          "centre": [round(c, 6) for c in centre],
          "credit": "Z-Anatomy (CC BY-SA 4.0), based on BodyParts3D (c) The Database Center for Life Science (CC BY-SA 2.1 JP)"}
if courses:
    header["courses"] = courses
if points_out:
    header["points"] = points_out
with open(OUT, "w") as f:
    f.write("// Generated by tools/export_zanatomy.py from Z-Anatomy (CC BY-SA 4.0),\n")
    f.write("// based on BodyParts3D (CC BY-SA 2.1 JP). Do not edit by hand.\n")
    f.write("window.ANATOMY = window.ANATOMY || { regions: {} };\n")
    f.write("window.ANATOMY.meshes = window.ANATOMY.meshes || {};\n")
    f.write(f"window.ANATOMY.meshes.{REGION} = ")
    json.dump({"header": header, "data": base64.b64encode(bytes(blob)).decode()}, f)
    f.write(";\n")
print("bytes", len(blob), "verts", sum(m["vertexCount"] for m in meshes))
