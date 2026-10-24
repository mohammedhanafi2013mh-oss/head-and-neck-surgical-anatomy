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
import math
import os
import struct
import sys
from collections import defaultdict

import bpy  # must come before bmesh when using the bpy module
import bmesh
from mathutils import Matrix, Vector

BLEND, REGION, OUT = sys.argv[-3:]

LOWER_TEETH = ["Lower first molar tooth.r", "Lower second molar tooth.r",
               "Lower first molar tooth.l", "Lower second molar tooth.l"]
TEETH = [f"{jaw} {t}.{s}" for jaw in ("Upper", "Lower") for s in "rl"
         for t in ("medial incisor", "lateral incisor", "canine", "first premolar", "second premolar",
                   "first molar tooth", "second molar tooth")]


def BOTH(*names):
    """Right and left objects for each name."""
    return [f"{n}.{s}" for n in names for s in "rl"]

REGIONS = {
    "submandibular": {
        "mirror": True,  # show both sides (see "both sides" below)
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
        "courses": {
            "mmn": {"path": [("Facial nerve (VII).r", 0, 18)],
                    "points": {"parotid": "start", "vessels": "end"}},
            "lingual_nerve": {"path": [("Lingual nerve.r", 0)],
                              "points": {"itf": "start", "molar": ("closest", None, ["Mandible"], (1.525, 1.56)),
                                         "duct": ("nearest", "Submandibular duct.r"), "tongue": "end"}},
            "hypoglossal": {"path": [("Hypoglossal nerve (XII).r", 0)], "zmin": 1.50,
                            "points": {"canal": "start", "tendon": ("nearest", "Intermediate tendon of digastric muscle.r"),
                                       "tongue": "end"}},
            "facial_artery": {"path": [("Facial artery.r", 0)],
                              "points": {"origin": "start", "gland": ("nearest", "Submandibular gland.r"),
                                         "mandible": ("closest", None, ["Mandible"], (1.535, 1.56)), "face": "end"}},
        },
    },

    "lateral_neck": {
        "mirror": True,  # show both sides (see "both sides" below)
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
        "courses": {
            # Spline 0 to its branch point (14) inside sternocleidomastoid, then spline 2 to trapezius.
            "accessory": {"path": [("Accessory nerve (XI).l", 0, 0, 14), ("Accessory nerve (XI).l", 2)], "zmin": 1.365,
                          "points": {"foramen": ("last_in", ("Accessory nerve (XI).l", 0), ["Temporal bone.l", "Occipital bone"], 0.002),
                                     "ijv": ("nearest", "Internal jugular vein.l"),
                                     "scm": ("spline_point", "Accessory nerve (XI).l", 0, 14),
                                     "erb": ("nearest", "great_auricular"),
                                     "trapezius": ("first_in", ("Accessory nerve (XI).l", 2), ["Descending part of trapezius muscle.l"], 0.002)}},
            "ijv": {"path": [("Internal jugular vein.l", 0)],
                    "points": {"bulb": "start", "accessory": ("nearest", "Accessory nerve (XI).l"),
                               "facial": ("nearest_start", "Common facial vein.l"), "omohyoid": ("nearest", "Omohyoid muscle.l"),
                               "angle": "end"}},
            "vagus": {"path": [("Vagus nerve (X).l", 2)], "zmin": 1.36,
                      "points": {"foramen": "start", "sln": ("spline_start", "Vagus nerve (X).l", 1),
                                 "sheath": ("nearest", "Left common carotid artery"), "thorax": "end"}},
            "phrenic": {"path": [("phrenic", 0)],
                        "points": {"origin": "start", "tca": ("nearest", "Transverse cervical artery.l"), "thorax": "end"}},
            "thoracic_duct": {"path": [("thoracic_duct", 0)],
                              "points": {"ascent": "start", "arch": ("spline_point", "thoracic_duct", 0, 3), "angle": "end"}},
            "great_auricular": {"path": [("great_auricular", 0)],
                                "points": {"erb": "start", "scm": ("spline_point", "great_auricular", 0, 2), "lobule": "end"}},
        },
    },

    "parotid": {
        "mirror": True,  # show both sides (see "both sides" below)
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
            "eca": {"path": [("External carotid artery.r", 0)],
                    "points": {"digastric": ("nearest", "Posterior belly of digastric muscle.r"),
                               "enters": ("first_in", ("External carotid artery.r", 0), ["Parotid gland.r"], 0.002),
                               "facial_nerve": ("nearest", "Facial nerve (VII).r"), "division": "end"}},
            "sta": {"path": [("Superficial temporal artery.r", 0)],
                    "points": {"origin": "start", "transverse_facial": ("nearest_start", "Transverse facial artery.r"),
                               "zygoma": ("closest", None, ["Zygomatic bone.r", "Temporal bone.r"], (1.578, 1.60)),
                               "scalp": "end"}},
            "great_auricular": {"path": [("great_auricular", 0)],
                                "points": {"erb": "start", "scm": ("spline_point", "great_auricular", 0, 2), "lobule": "end"}},
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
            # Drawn paths: spline 0 is the right side, 1 the left.
            "superior_thyroid_artery": {"path": [("superior_thyroid_artery", 0)],
                                        "points": {"origin": "start", "pole": "end"}},
            "ebsln": {"path": [("ebsln", 0)],
                      "points": {"origin": "start", "sta": ("nearest", "superior_thyroid_artery"), "cricothyroid": "end"}},
            "ita": {"path": [("Thyrocervical trunk.r", 0), ("Inferior thyroid artery.r", 0)],
                    "points": {"trunk": "start", "arch": "end"}},
            "middle_thyroid_vein": {"path": [("middle_thyroid_vein", 0)],
                                    "points": {"gland": "start", "ijv": "end"}},
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
        "courses": {
            # Drawn paths: spline 0 is the right side, 1 the left.
            "sln": {"path": [("sln", 0)],
                    "points": {"vagus": "start", "division": ("spline_point", "sln", 0, 2), "membrane": "end"}},
            "ebsln": {"path": [("ebsln", 0)], "points": {"origin": "start", "cricothyroid": "end"}},
            "rln_right": {"path": [("rln_right", 0)], "zmin": 1.43,
                          "points": {"groove": "start", "entry": "end"}},
            "rln_left": {"path": [("rln_left", 0)], "zmin": 1.43,
                         "points": {"groove": "start", "entry": "end"}},
        },
    },
    "carotid": {
        "mirror": True,  # show both sides (see "both sides" below)
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
            "ica": {"path": [("Right common carotid artery", 0), ("Internal carotid artery.r", 0)], "zmin": 1.43, "zmax": 1.565,
                    "points": {"cca": "start", "bifurcation": ("spline_start", "Internal carotid artery.r", 0),
                               "sinus": ("spline_point", "Internal carotid artery.r", 0, 1),
                               "digastric": ("nearest", "Posterior belly of digastric muscle.r"), "skull": "end"}},
            "vagus": {"path": [("vagus", 0)],
                      "points": {"top": "start", "sln": ("nearest_start", "sln"), "sheath": "end"}},
            "hypoglossal": {"path": [("hypoglossal", 0)],
                            "points": {"between": "start",
                                       "eca": ("nearest", "External carotid artery.r"),
                                       "ansa": ("nearest_start", "ansa_cervicalis"), "hyoglossus": "end"}},
            "ansa_cervicalis": {"path": [("ansa_cervicalis", 0)],
                                "points": {"root": "start", "loop": "end"}},
            "accessory": {"path": [("Accessory nerve (XI).r", 0, 0, 14), ("Accessory nerve (XI).r", 2)], "zmin": 1.43,
                          "points": {"foramen": ("last_in", ("Accessory nerve (XI).r", 0), ["Temporal bone.r", "Occipital bone"], 0.002),
                                     "ijv": ("nearest", "ijv"), "posterior": "end"}},
            "sln": {"path": [("sln", 0)],
                    "points": {"vagus": "start", "ica": ("nearest", "Internal carotid artery.r"),
                               "division": ("spline_point", "sln", 0, 2), "membrane": "end"}},
            "ebsln": {"path": [("ebsln", 0)],
                      "points": {"origin": "start", "sta": ("nearest", "superior_thyroid_artery"), "cricothyroid": "end"}},
            "superior_thyroid_artery": {"path": [("superior_thyroid_artery", 0)],
                                        "points": {"origin": "start", "sla": ("nearest_start", "superior_laryngeal_artery"),
                                                   "pole": "end"}},
        },
        "drawn": {"ijv": 0.0055, "vagus": 0.0012, "hypoglossal": 0.0010, "facial_vein": 0.0022,
                  "lingual_artery": 0.0011, "ansa_cervicalis": 0.0006, "superior_thyroid_artery": 0.0012,
                  "superior_laryngeal_artery": 0.0007, "sln": 0.0009, "ebsln": 0.0007},
    },
    "skull_base": {
        "mirror": True,  # show both sides (see "both sides" below)
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
        "mirror": True,  # show both sides (see "both sides" below)
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
        "mirror": True,  # show both sides (see "both sides" below)
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
    "orbit": {
        "mirror": True,  # show both sides (see "both sides" below)
        # Right orbit, centred between the apex and the globe.
        "centre": (-0.026, -0.055, 1.597),
        "fill_clipped": True,
        "structures": {
            # ---- bone ----
            "frontal": ["Frontal bone"],
            "sphenoid": ["Sphenoid bone"],
            "ethmoid": ["Ethmoid bone"],
            "maxilla": ["Maxilla.r"],
            "zygomatic": ["Zygomatic bone.r"],
            "lacrimal_bone": ["Lacrimal bone.r", "Nasal bone.r"],
            # ---- eye and lids ----
            "globe": ["Sclera.r", "Cornea.r"],
            "inner_eye": ["Iris.r", "Lens.r", "Retina.r"],
            "tarsi": ["Superior tarsus.r", "Inferior tarsus.r"],
            "lockwood": ["Suspensory ligament of eyeball.r"],
            # ---- muscles ----
            "levator": ["Levator palpebrae superioris.r"],
            "superior_rectus": ["Superior rectus muscle.r"],
            "inferior_rectus": ["Inferior rectus muscle.r"],
            "medial_rectus": ["Medial rectus muscle.r"],
            "lateral_rectus": ["Lateral rectus muscle.r"],
            "superior_oblique": ["Superior oblique muscle.r", "Trochlea of superior oblique muscle.r"],
            "inferior_oblique": ["Inferior oblique muscle.r"],
            "annulus": ["Common tendinous ring.r"],
            # ---- lacrimal apparatus ----
            "lacrimal_gland": ["Lacrimal gland.r"],
            "lacrimal_drainage": ["Lacrimal canaliculus.r", "Ampulla of lacrimal canaliculus.r", "Lacrimal sac.r", "Nasolacrimal duct.r"],
            # ---- nerves ----
            "cn2": ["Optic nerve (II).r"],
            "cn3": ["Oculomotor nerve (III).r"],
            "cn4": ["Trochlear nerve (IV).r"],
            "cn6": ["Abducens nerve (VI).r"],
            "v1": ["Ophthalmic nerve.r"],
            "v2": ["Maxillary nerve.r"],
            # ---- arteries ----
            "ophthalmic_artery": ["Ophthalmic artery.r"],
            "ophthalmic_branches": [("Central retinal artery.r", [(0, 0)]), "Long posterior ciliary arteries.r", "Short posterior ciliary arteries.r"],
            "lacrimal_artery": ["Lacrimal artery.r"],
            "supraorbital_artery": ["Supra-orbital artery.r", "Supratrochlear artery.r"],
            "ethmoidal_arteries": ["Anterior ethmoidal artery.r", "Posterior ethmoidal artery.r"],
            "ica": ["Internal carotid artery.r"],
            # ---- veins ----
            "ophthalmic_veins": ["Superior ophthalmic vein.r", "Inferior ophthalmic vein.r"],
            "cavernous_sinus": ["Cavernous sinus.r"],
        },
        "curve_scale": {"cn2": 3.0, "cn3": 1.6, "cn4": 1.2, "cn6": 1.4, "v1": 1.6, "v2": 1.8, "ophthalmic_artery": 1.6,
                        "ophthalmic_branches": 0.7, "lacrimal_artery": 1.0, "supraorbital_artery": 1.0,
                        "ethmoidal_arteries": 1.0, "ophthalmic_veins": 2.2},
        "bones": {"frontal", "sphenoid", "ethmoid", "maxilla", "zygomatic", "lacrimal_bone"},
        "clip": {"Frontal bone": (0, 1.645), "Maxilla.r": (1.555, 9), "Sphenoid bone": (1.565, 9),
                 "Internal carotid artery.r": (1.585, 1.62), "Oculomotor nerve (III).r": (1.57, 9)},
        "side": "r",
        # Branches Z-Anatomy lacks. See drawn_nasociliary() and below.
        "drawn": {"nasociliary": 0.0007, "lacrimal_nerve": 0.0007, "ciliary_ganglion": 0.0013,
                  "ciliary_roots": 0.0005, "short_ciliary": 0.0004},
        "points": {
            "optic_canal": ("anchor", "Optic canal.j"),
            "superior_orbital_fissure": ("closest", ("Oculomotor nerve (III).r", 0), ["Sphenoid bone"], (1.58, 1.61), -0.020),
            "supraorbital_notch": ("anchor", "(Supra-orbital notch).j"),
            "trochlea": ("anchor", "Trochlear fovea.j"),
            "anterior_ethmoidal_foramen": ("spline_start", "Anterior ethmoidal artery.r", 0),
            "posterior_ethmoidal_foramen": ("spline_end", "Posterior ethmoidal artery.r", 0),
            "inferior_orbital_fissure": ("spline_point", "Maxillary nerve.r", 0, 7),
            "infraorbital_foramen": ("spline_start", "Maxillary nerve.r", 1),
        },
        "courses": {
            "cn2": {"path": [("Optic nerve (II).r", 0)],
                    "points": {"chiasm": "start", "canal": "@optic_canal", "globe": "end"}},
            "cn3": {"path": [("Oculomotor nerve (III).r", 0)], "zmin": 1.57,
                    "points": {"origin": "start", "sof": "@superior_orbital_fissure",
                               "inferior": ("spline_start", "Oculomotor nerve (III).r", 2),
                               "ciliary": ("nearest", "ciliary_ganglion"), "superior": "end"}},
            "cn4": {"path": [("Trochlear nerve (IV).r", 0)],
                    "points": {"origin": "start", "sof": "@superior_orbital_fissure", "muscle": "end"}},
            "cn6": {"path": [("Abducens nerve (VI).r", 0)],
                    "points": {"origin": "start", "sof": "@superior_orbital_fissure", "muscle": "end"}},
            "v1": {"path": [("Ophthalmic nerve.r", 0)],
                   "points": {"ganglion": "start", "sof": "@superior_orbital_fissure",
                              "notch": "@supraorbital_notch", "forehead": "end"}},
            "nasociliary": {"path": [("nasociliary", 0)],
                            "points": {"origin": "start", "optic": ("nearest", "Optic nerve (II).r"),
                                       "anterior_ethmoidal": "@anterior_ethmoidal_foramen", "infratrochlear": "end"}},
            "ophthalmic_artery": {"path": [("Ophthalmic artery.r", 0), ("Anterior ethmoidal artery.r", 0)],
                                  "points": {"origin": "start", "canal": "@optic_canal",
                                             "lacrimal": ("nearest_start", "Lacrimal artery.r"),
                                             "supraorbital": ("nearest_start", "Supra-orbital artery.r"),
                                             "ethmoidal": "@anterior_ethmoidal_foramen", "nose": "end"}},
        },
    },
    "sinonasal": {
        "mirror": True,  # show both sides (see "both sides" below)
        # Right nasal cavity and paranasal sinuses (the septum and frontal and sphenoid sinuses are midline).
        "centre": (-0.012, -0.062, 1.578),
        "fill_clipped": True,
        "structures": {
            # ---- bone ----
            "frontal": ["Frontal bone"],
            "ethmoid": ["Ethmoid bone"],
            "inferior_concha": ["Inferior nasal concha bone.r"],
            "maxilla": ["Maxilla.r"],
            "sphenoid": ["Sphenoid bone"],
            "vomer": ["Vomer"],
            "nasal_bones": ["Nasal bone.r", "Lacrimal bone.r"],
            "palatine": ["Palatine bone.r"],
            # ---- cartilage ----
            "septal_cartilage": ["Nasal septal cartilage"],
            "upper_lateral": ["Lateral process of nasal septal cartilage.r"],
            "alar": ["Major alar cartilage.r"],
            # ---- sinuses (air spaces) ----
            "frontal_sinus": ["Sinus of frontal bone"],
            "sphenoid_sinus": ["Sinus of sphenoid bone"],
            "anterior_ethmoid": ["Anterior cells of ethmoid bone.r"],
            "middle_ethmoid": ["Middle cells of ethmoid bone.r"],
            "posterior_ethmoid": ["Posterior cells of ethmoid bone.r"],
            # ---- soft tissue ----
            "nasal_mucosa": ["Mucosa of nasal cavity"],
            "nasopharynx": ["Nasopharynx"],
            "nasolacrimal": ["Lacrimal sac.r", "Nasolacrimal duct.r"],
            "orbit_contents": ["Sclera.r", "Medial rectus muscle.r"],
            "pituitary": ["Adenohypophysis", "Neurohypophysis"],
            # ---- nerves ----
            "cn1": ["Olfactory nerve (I).r"],
            "cn2": ["Optic nerve (II).r"],
            "v2": ["Maxillary nerve.r"],
            # ---- arteries ----
            "ethmoidal_arteries": ["Anterior ethmoidal artery.r", "Posterior ethmoidal artery.r",
                                   "Anterior septal branches of anterior ethmoidal artery.r",
                                   "Septal branches of posterior ethmoidal artery.r"],
            "sphenopalatine": ["Posterior lateral nasal branches of sphenopalatine artery..r",
                               "Posterior septal branches of sphenopalatine artery.r"],
            "greater_palatine": ["Greater palatine artery.r", "Descending palatine artery.r"],
            "ica": ["Internal carotid artery.r"],
        },
        "curve_scale": {"cn1": 1.2, "cn2": 3.0, "v2": 1.8, "ethmoidal_arteries": 1.0, "sphenopalatine": 1.1,
                        "greater_palatine": 1.1},
        "bones": {"frontal", "ethmoid", "inferior_concha", "maxilla", "sphenoid", "vomer", "nasal_bones", "palatine"},
        "clip": {"Frontal bone": (0, 1.645), "Sphenoid bone": (1.545, 1.62), "Internal carotid artery.r": (1.575, 1.61),
                 "Optic nerve (II).r": (0, 9), "Nasopharynx": (1.55, 9)},
        "side": "r",
        # Mucociliary drainage routes from each sinus to its opening (drawn).
        "drawn": {"frontal_drainage": 0.0006, "maxillary_drainage": 0.0006, "sphenoid_drainage": 0.0006},
        "points": {
            "frontal_recess": ("at", (-0.0090, -0.0760, 1.6000)),
            "maxillary_ostium": ("at", (-0.0145, -0.0570, 1.5750)),
            "sphenoid_ostium": ("at", (-0.0040, -0.0395, 1.5950)),
            "nasolacrimal_opening": ("at", (-0.0095, -0.0631, 1.5547)),
            "sphenopalatine_foramen": ("spline_start", "Posterior septal branches of sphenopalatine artery.r", 0),
            "anterior_ethmoidal_foramen": ("spline_start", "Anterior ethmoidal artery.r", 0),
            "cribriform_plate": ("closest", ("Olfactory nerve (I).r", 1), ["Ethmoid bone"], (1.59, 1.62)),
            "infraorbital_foramen": ("spline_start", "Maxillary nerve.r", 1),
        },
        "courses": {
            "frontal_drainage": {"path": [("frontal_drainage", 0)],
                                 "points": {"sinus": "start", "recess": "@frontal_recess", "meatus": "end"}},
            "maxillary_drainage": {"path": [("maxillary_drainage", 0)],
                                   "points": {"sinus": "start", "ostium": "@maxillary_ostium", "meatus": "end"}},
            "sphenoid_drainage": {"path": [("sphenoid_drainage", 0)],
                                  "points": {"sinus": "start", "ostium": "@sphenoid_ostium", "recess": "end"}},
            "ethmoidal_arteries": {"path": [("Anterior ethmoidal artery.r", 0)],
                                   "points": {"foramen": "start", "nose": "end"}},
        },
        "spaces": {
            # Z-Anatomy's maxilla is solid: the sinus is its body's interior, 1.5 mm in from the surface.
            "maxillary_sinus": {"type": "interior", "object": "Maxilla.r", "exclude": ["Mucosa of nasal cavity"],
                                "box": ((-0.044, -0.010), (-0.085, -0.042)), "levels": (1.546, 1.580, 0.002),
                                "clear": 0.0015},
        },
    },
    "face": {
        # Muscles of facial expression, both sides, with the facial nerve branches
        # and facial vessels; courses traced on the right.
        "centre": (0.0, -0.055, 1.575),
        "structures": {
            # ---- bone ----
            "skull": ["Frontal bone", "Parietal bone.r", "Parietal bone.l", "Occipital bone", "Temporal bone.r", "Temporal bone.l",
                      "Sphenoid bone"],
            "facial_skeleton": BOTH("Maxilla", "Zygomatic bone", "Nasal bone"),
            "mandible": ["Mandible"] + TEETH,
            "nasal_cartilages": BOTH("Major alar cartilage"),
            # ---- scalp and forehead ----
            "galea": BOTH("Epicranial aponeurosis"),
            "frontalis": BOTH("Frontalis muscle"),
            "occipitalis": BOTH("Occipitalis muscle"),
            "temporoparietalis": BOTH("Temporoparietalis muscle"),
            # ---- around the eye and nose ----
            "orbicularis_oculi": BOTH("Orbital part of orbicularis oculi", "Palpebral part of orbicularis oculi"),
            "corrugator": BOTH("Corrugator supercilii"),
            "procerus": BOTH("Procerus muscle"),
            "nasalis": BOTH("Nasalis muscle"),
            "depressor_septi": BOTH("Depressor septi nasi"),
            # ---- around the mouth ----
            "orbicularis_oris": BOTH("Orbicularis oris muscle"),
            "levator_labii": BOTH("Levator labii superioris"),
            "zygomaticus_minor": BOTH("Zygomaticus minor muscle"),
            "zygomaticus_major": BOTH("Zygomaticus major muscle"),
            "levator_anguli_oris": BOTH("Levator anguli oris"),
            "risorius": BOTH("Risorius muscle"),
            "depressor_anguli_oris": BOTH("Depressor anguli oris"),
            "depressor_labii": BOTH("Depressor labii inferioris"),
            "mentalis": BOTH("Mentalis muscle"),
            "platysma": BOTH("Platysma"),
            # ---- muscles of mastication and parotid (context) ----
            "masseter": BOTH("Superficial part of masseter", "Deep part of masseter"),
            "temporalis": BOTH("Temporalis muscle"),
            "parotid": BOTH("Parotid gland", "(Accessory parotid gland)"),
            "parotid_duct": BOTH("Parotid duct"),
            # ---- facial nerve (spline layout as in the parotid region) ----
            "facial_trunk": [("Facial nerve (VII).r", [(0, 12, 16)]), ("Facial nerve (VII).l", [(0, 12, 16)])],
            "temporal_branch": [("Facial nerve (VII).r", [(8, 0)]), ("Facial nerve (VII).l", [(8, 0)])],
            "zygomatic_branch": [("Facial nerve (VII).r", [(7, 0)]), ("Facial nerve (VII).l", [(7, 0)])],
            "buccal_branch": [("Facial nerve (VII).r", [(3, 0), (4, 0), (5, 0), (6, 0)]),
                              ("Facial nerve (VII).l", [(3, 0), (4, 0), (5, 0), (6, 0)])],
            "mmn": [("Facial nerve (VII).r", [(0, 15), (1, 0)]), ("Facial nerve (VII).l", [(0, 15), (1, 0)])],
            "cervical_branch": [("Facial nerve (VII).r", [(2, 0)]), ("Facial nerve (VII).l", [(2, 0)])],
            "posterior_auricular_nerve": [("Facial nerve (VII).r", [(9, 0)]), ("Facial nerve (VII).l", [(9, 0)])],
            "mental_nerve": BOTH("Mental nerve"),
            # ---- vessels ----
            "facial_artery": BOTH("Facial artery", "Angular artery"),
            "labial_arteries": BOTH("Superior labial artery", "Inferior labial artery"),
            "transverse_facial": BOTH("Transverse facial artery"),
            "supraorbital_arteries": BOTH("Supra-orbital artery", "Supratrochlear artery", "Frontal branch of superficial temporal artery"),
            "facial_vein": BOTH("Facial vein", "Angular vein"),
        },
        "curve_scale": {"temporal_branch": 1.8, "zygomatic_branch": 1.8, "buccal_branch": 1.8, "mmn": 1.8,
                        "cervical_branch": 1.8, "posterior_auricular_nerve": 1.6, "facial_trunk": 2.0, "mental_nerve": 1.6,
                        "facial_artery": 1.2, "labial_arteries": 1.3, "transverse_facial": 1.3, "supraorbital_arteries": 1.3,
                        "facial_vein": 1.1, "parotid_duct": 1.4},
        "bones": {"skull", "facial_skeleton", "mandible"},
        # Platysma reaches the chest; keep its face and upper neck.
        "clip": {"Platysma.r": (1.44, 9), "Platysma.l": (1.44, 9)},
        "courses": {
            "temporal_branch": {"path": [("Facial nerve (VII).r", 8)],
                                # Z-Anatomy's branch stops at the temple, short of frontalis.
                                "points": {"pes": "start", "arch": ("spline_point", "Facial nerve (VII).r", 8, 2),
                                           "temple": "end"}},
            "zygomatic_branch": {"path": [("Facial nerve (VII).r", 7)],
                                 "points": {"pes": "start", "zygomaticus": ("nearest", "Zygomaticus major muscle.r"),
                                            "orbicularis": ("nearest", "Orbital part of orbicularis oculi.r"), "end": "end"}},
            "buccal_branch": {"path": [("Facial nerve (VII).r", 3)],
                              "points": {"pes": "start", "duct": ("nearest", "Parotid duct.r"),
                                         "zygomaticus": ("nearest", "Zygomaticus major muscle.r"),
                                         "orbicularis": ("nearest", "Orbicularis oris muscle.r"), "end": "end"}},
            "mmn": {"path": [("Facial nerve (VII).r", 0, 15)],
                    "points": {"pes": "start", "vessels": "end"}},
            "cervical_branch": {"path": [("Facial nerve (VII).r", 2)],
                                "points": {"pes": "start", "platysma": "end"}},
            "facial_artery": {"path": [("Facial artery.r", 0), ("Angular artery.r", 0)],
                              "points": {"mandible": ("closest", None, ["Mandible"], (1.50, 1.535)),
                                         "inferior_labial": ("nearest_start", "Inferior labial artery.r"),
                                         "superior_labial": ("nearest_start", "Superior labial artery.r"),
                                         "angular": "end"}},
        },
    },

    "oral_cavity": {
        # Oral cavity, floor of mouth, palate and fauces, both sides; courses traced on the right.
        # The mouth is shown open; the tongue, soft palate, tonsils, pillars and palatal muscles
        # are sculpted for this app (see "oral cavity: sculpted soft tissues and the open jaw").
        "centre": (0.0, -0.045, 1.528),
        "landmarks": "thyroid",  # the drawn lingual artery uses the external carotid landmarks
        "sides": (-1,),
        "build": "oral",
        "open_jaw": {
            # Soft tissue between the jaw and these follows the jaw in proportion to how near it is.
            "fixed": {"A": ["Hyoid bone", "Epiglottis", "Sphenoid bone", "Temporal bone.r", "Temporal bone.l"]
                           + BOTH("Posterior belly of digastric muscle", "Stylohyoid muscle"),
                      "B": BOTH("Maxilla") + [n for n in TEETH if n.startswith("Upper")]},
            "move": {"rigid": ["Mandible", "LOWER_TEETH"], "gingiva": ["Gingiva"],
                     "B": BOTH("Orbicularis oris muscle"), "drop": ["Hyoid bone"],
                     "A": ["Ranula (sculpted)", "Sublingual ducts (sculpted)"]
                          + BOTH("Genioglossus muscle", "Hyoglossus muscle", "Geniohyoid muscle", "Mylohyoid muscle",
                                 "Anterior belly of digastric muscle", "Sublingual gland", "Submandibular gland",
                                 "Submandibular duct", "Lingual nerve", "Hypoglossal nerve (XII)", "Inferior alveolar nerve",
                                 "Mental nerve", "Nerve to mylohyoid muscle", "Submental artery", "Inferior alveolar artery",
                                 "Lingual vein", "Medial pterygoid muscle", "Styloglossus (sculpted)")},
            "drawn": {"lingual_artery": "A"},
            "tuck": BOTH("Genioglossus muscle", "Hyoglossus muscle", "Styloglossus (sculpted)"),
        },
        "structures": {
            # ---- bone, teeth and mucosa ----
            "mandible": ["Mandible"] + [n for n in TEETH if n.startswith("Lower")],
            "maxilla": BOTH("Maxilla", "Palatine bone") + [n for n in TEETH if n.startswith("Upper")],
            "hyoid": ["Hyoid bone"],
            "gingiva": ["Gingiva"],
            "hard_palate": ["Palatal mucosa (sculpted)"],
            # ---- tongue and floor of mouth ----
            "tongue": ["Tongue (sculpted)"],
            "genioglossus": BOTH("Genioglossus muscle"),
            "hyoglossus": BOTH("Hyoglossus muscle"),
            "styloglossus": BOTH("Styloglossus (sculpted)"),
            "geniohyoid": BOTH("Geniohyoid muscle"),
            "mylohyoid": BOTH("Mylohyoid muscle"),
            "digastric_ant": BOTH("Anterior belly of digastric muscle"),
            # ---- soft palate, fauces and pharynx ----
            "soft_palate": ["Soft palate (sculpted)", "Uvula (sculpted)"],
            "palatoglossus": BOTH("Palatoglossal arch (sculpted)"),
            "palatopharyngeus": BOTH("Palatopharyngeal arch (sculpted)", "Palatopharyngeus muscle"),
            "tonsils": BOTH("Palatine tonsil (sculpted)"),
            "superior_constrictor": BOTH("Superior pharyngeal constrictor"),
            "levator_veli": BOTH("Levator veli palatini (sculpted)"),
            "tensor_veli": BOTH("Tensor veli palatini (sculpted)"),
            "salpingopharyngeus": BOTH("Salpingopharyngeus (sculpted)"),
            "auditory_tube": BOTH("Auditory tube"),
            # ---- glands and ducts ----
            "sublingual": BOTH("Sublingual gland"),
            "sublingual_ducts": ["Sublingual ducts (sculpted)"],
            "smg": BOTH("Submandibular gland"),
            "wharton": BOTH("Submandibular duct"),
            "ranula": ["Ranula (sculpted)"],
            # ---- nerves ----
            "lingual_nerve": BOTH("Lingual nerve"),
            # XII from where it descends behind the mandible into the tongue.
            "hypoglossal": [("Hypoglossal nerve (XII).r", [(0, 15), (1, 0), (2, 0)]),
                            ("Hypoglossal nerve (XII).l", [(0, 15), (1, 0), (2, 0)])],
            "inferior_alveolar": BOTH("Inferior alveolar nerve", "Mental nerve"),
            "nerve_mylohyoid": BOTH("Nerve to mylohyoid muscle"),
            # ---- vessels ----
            "submental_artery": BOTH("Submental artery"),
            "palatine_artery": BOTH("Greater palatine artery", "Descending palatine artery"),
            "inferior_alveolar_artery": BOTH("Inferior alveolar artery"),
            "lingual_vein": BOTH("Lingual vein"),
            # ---- context ----
            "orbicularis_oris": BOTH("Orbicularis oris muscle"),
            "medial_pterygoid": BOTH("Medial pterygoid muscle"),
        },
        "curve_scale": {"lingual_nerve": 1.7, "hypoglossal": 1.6, "inferior_alveolar": 1.5, "nerve_mylohyoid": 1.5,
                        "submental_artery": 1.4, "palatine_artery": 1.4, "inferior_alveolar_artery": 1.3,
                        "lingual_vein": 1.2, "wharton": 1.5},
        "bones": {"mandible", "maxilla", "hyoid", "hard_palate"},
        "drawn": {"lingual_artery": 0.0012},
        "courses": {
            "lingual_nerve": {"path": [("Lingual nerve.r", 0)],
                              "points": {"itf": "start", "molar": ("closest", None, ["Mandible"], (1.50, 1.56)),
                                         "duct": ("nearest", "Submandibular duct.r"), "tongue": "end"}},
            "hypoglossal": {"path": [("Hypoglossal nerve (XII).r", 0, 15)],
                            "points": {"angle": "start", "hyoglossus": ("spline_point", "Hypoglossal nerve (XII).r", 0, 19), "tongue": "end"}},
            "wharton": {"path": [("Submandibular duct.r", 0)],
                        "points": {"gland": "start", "lingual": ("nearest", "Lingual nerve.r"), "caruncle": "end"}},
            "lingual_artery": {"path": [("lingual_artery", 0)],
                               "points": {"origin": "start", "hyoglossus": ("spline_point", "lingual_artery", 0, 3), "tongue": "end"}},
        },
    },

    "temporal_bone": {
        # The right ear and temporal bone: external, middle and inner ear, the
        # facial nerve through the bone, and the mastoid. One side only (ear
        # anatomy is taught one side at a time, and the parts are tiny).
        "centre": (-0.050, 0.008, 1.578),
        "build": "ear",
        "structures": {
            # ---- bone ----
            "temporal": ["Temporal bone.r"],
            # ---- external ear ----
            "auricle": ["Auricle (skin)"],
            "eac": ["External acoustic meatus (sculpted)"],
            "tympanic_membrane": ["Tympanic membrane.r"],
            # ---- middle ear and mastoid ----
            "malleus": ["Malleus.r"],
            "incus": ["Incus.r"],
            "stapes": ["Stapes.r"],
            "tensor_tympani": ["Tensor tympani (sculpted)"],
            "stapedius": ["Stapedius (sculpted)"],
            "antrum": ["Mastoid antrum (sculpted)"],
            "air_cells": ["Mastoid air cells (sculpted)"],
            "auditory_tube": ["Auditory tube.r"],
            # ---- inner ear ----
            "cochlea": ["Cochlea.r"],
            "labyrinth": ["Vestibule.r"],
            # ---- nerves ----
            # Facial nerve from the internal acoustic meatus to just past the stylomastoid foramen.
            "facial_nerve": [("Facial nerve (VII).r", [(0, 2, 17)])],
            "chorda": ["Chorda tympani.r"],
            "cn8": ["Vestibulocochlear nerve (VIII).r", "Cochlear nerve", "Vestibular nerve.r"],
            # ---- vessels ----
            "ica": ["Internal carotid artery.r"],
            "sigmoid": ["Sigmoid sinus.r"],
            "ijv": ["Internal jugular vein.r"],
            # ---- context ----
            "digastric_post": ["Posterior belly of digastric muscle.r"],
            "scm": ["Sternocleidomastoid muscle.r"],
        },
        "clip": {"Internal carotid artery.r": (1.548, 1.600), "Internal jugular vein.r": (1.545, 9.0),
                 "Sternocleidomastoid muscle.r": (1.540, 9.0), "Posterior belly of digastric muscle.r": (1.535, 9.0)},
        "curve_scale": {"facial_nerve": 0.9, "chorda": 0.6, "cn8": 0.9},
        "bones": {"temporal"},
        "points": {
            "internal_acoustic_meatus": ("first_in", ("Facial nerve (VII).r", 0), ["Temporal bone.r"], 0.0015),
            "stylomastoid_foramen": ("last_in", ("Facial nerve (VII).r", 0), ["Temporal bone.r"], 0.0015),
            "geniculate": ("spline_point", "Facial nerve (VII).r", 0, 7),
            # The rest are set by build_ear() from the ear's own landmarks.
        },
        "courses": {
            "facial_nerve": {"path": [("Facial nerve (VII).r", 0, 3, 16)],
                             "points": {"iam": "@internal_acoustic_meatus", "geniculate": "@geniculate",
                                        "tympanic": ("spline_point", "Facial nerve (VII).r", 0, 9),
                                        "genu": ("spline_point", "Facial nerve (VII).r", 0, 11),
                                        "smf": "@stylomastoid_foramen"}},
            "chorda": {"path": [("Chorda tympani.r", 0)],
                       "points": {"origin": "start", "tm": ("nearest", "Malleus.r"), "itf": "end"}},
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
            # ---- lower cranial nerves in the poststyloid (carotid) compartment ----
            # IX to its branch for the tongue (spline 0 to point 15, then spline 1); XI to its
            # branch point in sternocleidomastoid; XII only above its loop, which Z-Anatomy
            # places medial to the external carotid (the loop is redrawn in the carotid region).
            "glossopharyngeal": [("Glossopharyngeal nerve (IX).r", [(0, 0, 16), (1, 0)]),
                                 ("Glossopharyngeal nerve (IX).l", [(0, 0, 16), (1, 0)])],
            "accessory": [("Accessory nerve (XI).r", [(0, 0, 15)]), ("Accessory nerve (XI).l", [(0, 0, 15)])],
            "hypoglossal": [("Hypoglossal nerve (XII).r", [(0, 0, 15)]), ("Hypoglossal nerve (XII).l", [(0, 0, 15)])],
        },
        "curve_scale": {"carotids": 1.0, "glossopharyngeal": 1.6, "accessory": 1.6, "hypoglossal": 1.6},
        "bones": {"mandible", "skull_base", "hyoid", "larynx", "vertebrae"},
        "clip": {"Occipital bone": (0, 1.60), "Oesophagus": (1.40, 9), "Trachea": (1.40, 9),
                 "Left common carotid artery": (1.40, 9), "Right common carotid artery": (1.40, 9),
                 "Internal carotid artery.l": (0, 1.585), "Internal carotid artery.r": (0, 1.585),
                 "Superficial investing cervical fascia.l": (1.40, 9), "Superficial investing cervical fascia.r": (1.40, 9),
                 "Sternocleidomastoid muscle.l": (1.40, 9), "Sternocleidomastoid muscle.r": (1.40, 9),
                 "Longus colli muscle.l": (1.40, 9), "Longus colli muscle.r": (1.40, 9)},
        # The internal jugular veins and vagus nerves as redrawn in the carotid region (Z-Anatomy puts them medial to the carotids).
        # The sympathetic trunks and the routes of spread of infection (right side) are drawn for this app.
        "drawn": {"ijv": 0.0055, "vagus": 0.0012, "sympathetic": 0.0012,
                  "route_odontogenic": 0.0011, "route_tonsillar": 0.0011,
                  "route_retropharyngeal": 0.0011, "route_danger": 0.0011},
        # Courses on the right side; drawn paths with both sides have the right as spline 0.
        "courses": {
            "carotids": {"path": [("Right common carotid artery", 0), ("Internal carotid artery.r", 0)], "zmin": 1.40, "zmax": 1.585,
                         "points": {"cca": "start", "bifurcation": ("spline_start", "Internal carotid artery.r", 0),
                                    "tonsil": ("nearest", "Palatine tonsil.r"), "skull": "end"}},
            "ijv": {"path": [("ijv", 0)],
                    "points": {"top": "start", "nodes": ("nearest", "Jugulodigastric node.r"), "low": "end"}},
            "vagus": {"path": [("vagus", 0)], "points": {"top": "start", "low": "end"}},
            "glossopharyngeal": {"path": [("Glossopharyngeal nerve (IX).r", 0, 0, 15), ("Glossopharyngeal nerve (IX).r", 1)],
                                 "points": {"foramen": ("last_in", ("Glossopharyngeal nerve (IX).r", 0), ["Temporal bone.r", "Occipital bone"], 0.002),
                                            "stylopharyngeus": ("nearest", "Stylopharyngeus muscle.r"), "tongue": "end"}},
            "accessory": {"path": [("Accessory nerve (XI).r", 0, 0, 14)],
                          "points": {"foramen": ("last_in", ("Accessory nerve (XI).r", 0), ["Temporal bone.r", "Occipital bone"], 0.002),
                                     "atlas": ("nearest", "Atlas (C1)"), "scm": "end"}},
            "hypoglossal": {"path": [("Hypoglossal nerve (XII).r", 0, 0, 14)],
                            "points": {"canal": ("last_in", ("Hypoglossal nerve (XII).r", 0), ["Occipital bone"], 0.002), "low": "end"}},
            "sympathetic": {"path": [("sympathetic", 0)],
                            "points": {"top": "start", "scg": ("spline_point", "sympathetic", 0, 1),
                                       "mcg": ("spline_point", "sympathetic", 0, 9), "low": "end"}},
            "route_odontogenic": {"path": [("route_odontogenic", 0)],
                                  "points": {"molar": "start", "mylohyoid": ("spline_point", "route_odontogenic", 0, 1),
                                             "submandibular": ("spline_point", "route_odontogenic", 0, 2), "pps": "end"}},
            "route_tonsillar": {"path": [("route_tonsillar", 0)],
                                "points": {"tonsil": "start", "pps": ("spline_point", "route_tonsillar", 0, 1),
                                           "carotid": ("spline_point", "route_tonsillar", 0, 3), "mediastinum": "end"}},
            "route_retropharyngeal": {"path": [("route_retropharyngeal", 0)],
                                      "points": {"node": "start", "space": ("spline_point", "route_retropharyngeal", 0, 1),
                                                 "mediastinum": "end"}},
            "route_danger": {"path": [("route_danger", 0)],
                             "points": {"retro": "start", "alar": ("spline_point", "route_danger", 0, 1), "mediastinum": "end"}},
        },
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
        front = Vector((0.0, front.y, front.z))  # both folds start at the midline
        out.append([front + Vector((sx * 0.0011, 0.0012, 0)),
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
        front = Vector((0.0, front.y, front.z))
        back = Vector((top.x + sx * 0.0012, vp.y + 0.003, vp.z + 0.0052))
        out.append([front + Vector((sx * 0.0024, 0.0016, 0)),
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

# ---------- drawn nerves of the orbit ----------
# Placed from the right ophthalmic nerve as it enters the orbit (about (-17, -26, 1598) mm),
# the optic nerve, the ophthalmic and ethmoidal arteries, the lacrimal artery and gland,
# the lateral rectus and the inferior division of the oculomotor nerve.

CILIARY = [Vector((-0.0238, -0.0410, 1.5962)), Vector((-0.0241, -0.0421, 1.5959)), Vector((-0.0244, -0.0432, 1.5956))]


def drawn_nasociliary(L):
    """Nasociliary nerve: through the common tendinous ring, over the optic
    nerve from lateral to medial with the ophthalmic artery, along the medial
    wall to the anterior ethmoidal foramen and on as the infratrochlear nerve.
    Further splines: posterior ethmoidal, anterior ethmoidal and two long
    ciliary nerves."""
    main = [Vector((-0.0172, -0.0270, 1.5985)), Vector((-0.0195, -0.0340, 1.6000)), Vector((-0.0210, -0.0400, 1.6022)),
            Vector((-0.0185, -0.0460, 1.6018)), Vector((-0.0145, -0.0520, 1.6005)), Vector((-0.0138, -0.0600, 1.6008)),
            Vector((-0.0140, -0.0680, 1.6020)), Vector((-0.0148, -0.0750, 1.6040))]
    posterior_ethmoidal = [Vector((-0.0160, -0.0490, 1.6012)), Vector((-0.0125, -0.0465, 1.5985)), Vector((-0.0100, -0.0442, 1.5950))]
    anterior_ethmoidal = [Vector((-0.0140, -0.0545, 1.6003)), Vector((-0.0118, -0.0550, 1.5995)), Vector((-0.0095, -0.0555, 1.5985))]
    long_ciliary = [[Vector((-0.0205, -0.0425, 1.6020)), Vector((-0.0225, -0.0470, 1.5990)), Vector((-0.0245, -0.0505, 1.5965))],
                    [Vector((-0.0200, -0.0435, 1.6020)), Vector((-0.0210, -0.0480, 1.5975)), Vector((-0.0225, -0.0512, 1.5945))]]
    return [main, posterior_ethmoidal, anterior_ethmoidal] + long_ciliary


def drawn_lacrimal_nerve(L):
    """Lacrimal nerve: through the superior orbital fissure above the ring and
    forward along the upper border of the lateral rectus to the lacrimal gland."""
    return [Vector((-0.0185, -0.0280, 1.6005)), Vector((-0.0245, -0.0360, 1.6045)), Vector((-0.0310, -0.0440, 1.6060)),
            Vector((-0.0360, -0.0515, 1.6065)), Vector((-0.0392, -0.0575, 1.6072)), Vector((-0.0400, -0.0620, 1.6078))]


def drawn_ciliary_ganglion(L):
    """Ciliary ganglion: lateral to the optic nerve, about 1 cm in front of the apex."""
    return CILIARY


def drawn_ciliary_roots(L):
    """Sensory root from the nasociliary nerve and parasympathetic (motor) root
    from the nerve to inferior oblique."""
    return [[Vector((-0.0200, -0.0370, 1.6010)), Vector((-0.0222, -0.0395, 1.5985)), CILIARY[0]],
            [Vector((-0.0241, -0.0423, 1.5909)), Vector((-0.0242, -0.0425, 1.5935)), CILIARY[1]]]


def drawn_short_ciliary(L):
    """Short ciliary nerves from the ganglion to the back of the globe around the optic nerve."""
    g = CILIARY[2]
    return [[g, Vector((-0.0258, -0.0470, 1.5965)), Vector((-0.0272, -0.0505, 1.5968))],
            [g, Vector((-0.0252, -0.0475, 1.5940)), Vector((-0.0262, -0.0510, 1.5932))],
            [g, Vector((-0.0262, -0.0465, 1.5985)), Vector((-0.0280, -0.0500, 1.5995))]]


DRAWN.update({"nasociliary": drawn_nasociliary, "lacrimal_nerve": drawn_lacrimal_nerve,
              "ciliary_ganglion": drawn_ciliary_ganglion, "ciliary_roots": drawn_ciliary_roots,
              "short_ciliary": drawn_short_ciliary})

# ---------- drawn drainage routes of the paranasal sinuses ----------
# Schematic mucociliary routes, placed from the Z-Anatomy sinus volumes, the ethmoid
# (middle turbinate at about z 1.570-1.578), the maxillary sinus built from the maxilla
# and the sphenoid sinus's front wall (y -39.7 mm).

def drawn_frontal_drainage(L):
    """Frontal sinus → frontal recess → anterior middle meatus."""
    return [Vector((-0.0120, -0.0800, 1.6120)), Vector((-0.0095, -0.0775, 1.6040)), Vector((-0.0090, -0.0760, 1.6000)),
            Vector((-0.0095, -0.0730, 1.5930)), Vector((-0.0110, -0.0670, 1.5840)), Vector((-0.0118, -0.0610, 1.5770))]


def drawn_maxillary_drainage(L):
    """Mucus swept up the walls to the natural ostium high on the medial wall,
    through the ethmoid infundibulum and hiatus semilunaris to the middle meatus."""
    return [Vector((-0.0270, -0.0640, 1.5560)), Vector((-0.0230, -0.0610, 1.5660)), Vector((-0.0185, -0.0585, 1.5730)),
            Vector((-0.0145, -0.0570, 1.5750)), Vector((-0.0125, -0.0600, 1.5770)), Vector((-0.0118, -0.0640, 1.5745))]


def drawn_sphenoid_drainage(L):
    """Sphenoid sinus → ostium on its front wall → sphenoethmoidal recess."""
    return [Vector((-0.0070, -0.0300, 1.5920)), Vector((-0.0050, -0.0360, 1.5945)), Vector((-0.0040, -0.0395, 1.5950)),
            Vector((-0.0042, -0.0430, 1.5925)), Vector((-0.0045, -0.0465, 1.5880))]


# ---------- drawn paths for the deep neck: sympathetic trunks and routes of spread ----------

DN_CACHE = {}


def dn_verts(*names):
    out = []
    for n in names:
        if n not in DN_CACHE:
            o = D[n]
            me = o.evaluated_get(deps).to_mesh()
            DN_CACHE[n] = [o.matrix_world @ v.co for v in me.vertices]
        out += DN_CACHE[n]
    return out


def dn_slab(verts, z, half=0.0025):
    return [v for v in verts if abs(v.z - z) < half]


def drawn_sympathetic(L):
    """On the front of longus capitis and colli, behind the carotid sheath, from
    the superior cervical ganglion (C2-C3) down to the root of the neck."""
    out = []
    for sx in (-1, 1):
        s = "r" if sx < 0 else "l"
        lon = dn_verts("Longus capitis muscle." + s, "Longus colli muscle." + s)
        pts = []
        for k in range(15):
            z = 1.569 - 0.012 * k
            sl = dn_slab(lon, z)
            front = min(v.y for v in sl)
            strip = [v for v in sl if v.y < front + 0.003]
            x_in, x_out = min(abs(v.x) for v in strip), max(abs(v.x) for v in strip)
            pts.append(Vector((sx * (x_in + 0.7 * (x_out - x_in)), front - 0.0012, z)))
        out.append(pts)
    return out


def rp_mid(z):
    """Front-to-back position of the retropharyngeal/danger interface at height z (as in rp_rings)."""
    phar = dn_verts("Superior pharyngeal constrictor.l", "Superior pharyngeal constrictor.r",
                    "Middle pharyngeal constrictor.l", "Middle pharyngeal constrictor.r",
                    "Inferior pharyngeal constrictor.l", "Inferior pharyngeal constrictor.r",
                    "Nasopharynx", "Oropharynx", "Laryngopharynx", "Oesophagus")
    lon = dn_verts("Longus colli muscle.l", "Longus colli muscle.r", "Longus capitis muscle.l", "Longus capitis muscle.r")
    P = [v for v in dn_slab(phar, z) if abs(v.x) < 0.012]
    return (max(v.y for v in P) + min(v.y for v in dn_slab(lon, z))) / 2


def carotid_sheath(z):
    """Between the right carotid artery and the (redrawn) internal jugular vein at height z."""
    ijv = [Vector(p) for p in CAROTID_IJV]
    art = curve_points("Right common carotid artery", 0) + curve_points("Internal carotid artery.r", 0)[1:7]
    a = Vector((along_z(art, z, 0), along_z(art, z, 1), z))
    v = Vector((along_z(ijv, z, 0), along_z(ijv, z, 1), z))
    return (a + v) / 2 + Vector((0, 0.003, 0))  # the vagus lies behind, between them


def drawn_route_odontogenic(L):
    """From the roots of the lower second molar, which lie below the mylohyoid line,
    through the lingual cortex into the submandibular space, then back along the
    gland and styloglossus into the parapharyngeal space."""
    tooth = dn_verts("Lower second molar tooth.r")
    apex = min(tooth, key=lambda v: v.z)
    jaw = [v for v in dn_verts("Mandible") if abs(v.y - apex.y) < 0.003 and abs(v.z - apex.z) < 0.003 and v.x < 0]
    inner = max(v.x for v in jaw)  # lingual (medial) surface on the right
    gland = dn_verts("Submandibular gland.r")
    g = sum(gland, Vector()) / len(gland)
    return [apex + Vector((0.001, 0, 0.002)), Vector((inner + 0.0025, apex.y, apex.z - 0.002)),
            g + Vector((0.002, 0.007, -0.005)), Vector((-0.024, -0.020, 1.514)), Vector((-0.0235, -0.014, 1.526)),
            Vector((-0.0225, -0.017, 1.540))]


def drawn_route_tonsillar(L):
    """From the tonsil through the superior constrictor into the parapharyngeal
    space, back into the carotid space and down the carotid sheath."""
    tonsil = dn_verts("Palatine tonsil.r")
    t = sum(tonsil, Vector()) / len(tonsil)
    pts = [t, Vector((-0.026, -0.014, 1.548)), Vector((-0.032, -0.006, 1.537))]
    pts += [carotid_sheath(z) for z in (1.522, 1.500, 1.478, 1.456, 1.434, 1.412)]
    return pts


def drawn_route_retropharyngeal(L):
    """From a suppurating lateral retropharyngeal (Rouvière) node into the
    retropharyngeal space and down, in front of the alar fascia, to the
    superior mediastinum."""
    node = dn_verts("Retropharyngeal nodes.r")
    n = sum(node, Vector()) / len(node)
    return [n] + [Vector((-0.005, rp_mid(z) - 0.0016, z)) for z in (1.535, 1.515, 1.49, 1.465, 1.44, 1.415, 1.402)]


def drawn_route_danger(L):
    """Through the alar fascia from the retropharyngeal space into the danger
    space, which runs on to the diaphragm."""
    return [Vector((0.004, rp_mid(1.562) - 0.0016, 1.562))] + \
        [Vector((0.004, rp_mid(z) + 0.0015, z)) for z in (1.550, 1.525, 1.50, 1.475, 1.45, 1.425, 1.402)]


DRAWN.update({"sympathetic": drawn_sympathetic, "route_odontogenic": drawn_route_odontogenic,
              "route_tonsillar": drawn_route_tonsillar, "route_retropharyngeal": drawn_route_retropharyngeal,
              "route_danger": drawn_route_danger})

DRAWN.update({"frontal_drainage": drawn_frontal_drainage, "maxillary_drainage": drawn_maxillary_drainage,
              "sphenoid_drainage": drawn_sphenoid_drainage})





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


# ---------- oral cavity: sculpted soft tissues and the open jaw ----------
# Z-Anatomy's tongue is a coarse blob, its soft palate lies flat against the
# back of the pharynx and its tonsils sit at the level of the palate; it has no
# palatoglossus, levator or tensor veli palatini, salpingopharyngeus or
# styloglossus. These are modelled here from its landmarks (closed mouth), then
# the jaw is opened: the mandible and lower teeth turn about the condyles and
# glide forward, the hyoid comes down, and the soft tissues between the jaw and
# the fixed skull and hyoid follow in proportion to how near they are to the
# jaw. The tongue is then sculpted as it lies in the open mouth, and the
# tonsillar pillars are added between the fixed soft palate and the tongue.

def mesh_object(name, verts, faces, subsurf=0):
    """A mesh object from world-space vertices, faces wound outwards."""
    vol = sum(verts[f[0]].dot(verts[f[k]].cross(verts[f[k + 1]])) for f in faces for k in range(1, len(f) - 1))
    if vol < 0:
        faces = [list(reversed(f)) for f in faces]
    me = bpy.data.meshes.new(name)
    me.from_pydata([tuple(v) for v in verts], [], [list(f) for f in faces])
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    if subsurf:
        mod = obj.modifiers.new("smooth", "SUBSURF")
        mod.levels = mod.render_levels = subsurf
    return obj


def loft(rings, tip=None, end_cap=True, push=0.0):
    """Faces joining equal-length rings, closed by a fan to a tip point at the
    start and to the (pushed) centre of the last ring at the end."""
    n = len(rings[0])
    verts = [v for r in rings for v in r]
    faces = [[i * n + j, i * n + (j + 1) % n, (i + 1) * n + (j + 1) % n, (i + 1) * n + j]
             for i in range(len(rings) - 1) for j in range(n)]
    if tip is not None:
        verts.append(tip)
        faces += [[len(verts) - 1, (j + 1) % n, j] for j in range(n)]
    if end_cap:
        last = rings[-1]
        c = sum(last, Vector()) / n
        axis = (c - sum(rings[-2], Vector()) / n).normalized()
        verts.append(c + axis * push)
        base = (len(rings) - 1) * n
        faces += [[len(verts) - 1, base + j, base + (j + 1) % n] for j in range(n)]
    return verts, faces


def smooth_line(points, per=6):
    """Catmull-Rom through the points."""
    pts = [points[0]] + list(points) + [points[-1]]
    out = []
    for i in range(1, len(pts) - 2):
        p0, p1, p2, p3 = pts[i - 1:i + 3]
        for k in range(per):
            t = k / per
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
                              + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t))
    return out + [points[-1]]


def sweep(points, widths, thick, across=Vector((1, 0, 0)), n=12, per=5, caps=True):
    """A tube along a smooth line with an elliptical section: half-widths
    (widths) at right angles to 'across', half-thicknesses (thick) along it.
    Widths and thicknesses are given at the control points."""
    line = smooth_line(points, per)
    m = len(points) - 1

    def at(vals, k):
        f = k / per
        i = min(int(f), m - 1)
        return vals[i] + (vals[i + 1] - vals[i]) * (f - i)
    rings = []
    for k, p in enumerate(line):
        a, b = max(at(widths, k), 2e-5), max(at(thick, k), 2e-5)
        t = (line[min(k + 1, len(line) - 1)] - line[max(k - 1, 0)]).normalized()
        b_ax = (across - t * across.dot(t)).normalized()
        a_ax = t.cross(b_ax).normalized()
        rings.append([p + a_ax * (a * math.cos(2 * math.pi * j / n)) + b_ax * (b * math.sin(2 * math.pi * j / n))
                      for j in range(n)])
    if not caps:
        return loft(rings, None, False)
    tip = line[0] - (line[1] - line[0]).normalized() * min(widths[0], thick[0]) * 0.6
    return loft(rings, tip, True, min(widths[-1], thick[-1]) * 0.6)


def mirrored(verts, faces):
    return [Vector((-v.x, v.y, v.z)) for v in verts], [list(reversed(f)) for f in faces]


def both_sides(name, verts, faces, subsurf=0):
    """Right-side geometry as '<name>.r' and its mirror image as '<name>.l'."""
    mesh_object(name + ".r", verts, faces, subsurf)
    mesh_object(name + ".l", *mirrored(verts, faces), subsurf)


def eval_world(name):
    o = D[name]
    me = o.evaluated_get(deps).to_mesh()
    return [o.matrix_world @ v.co for v in me.vertices]


# Sagittal stations of the tongue as it lies in the open mouth (metres): dorsum
# point (y, z), ventral point (y, z), half-width. The tip rests behind the
# lower incisors, the borders below the lingual cusps of the lower teeth, the
# body on the floor of mouth above the (lowered) hyoid, and the base turns down
# behind the circumvallate papillae to the vallecula in front of the epiglottis.
TONGUE_TIP = (-0.0612, 1.4990)
TONGUE_STATIONS = [
    ((-0.0598, 1.5018), (-0.0592, 1.4962), 0.0088),
    ((-0.0568, 1.5052), (-0.0556, 1.4930), 0.0136),
    ((-0.0518, 1.5105), (-0.0505, 1.4905), 0.0158),
    ((-0.0458, 1.5160), (-0.0450, 1.4902), 0.0166),
    ((-0.0395, 1.5205), (-0.0398, 1.4975), 0.0166),
    ((-0.0330, 1.5232), (-0.0352, 1.4985), 0.0160),
    ((-0.0272, 1.5200), (-0.0318, 1.4990), 0.0148),
    ((-0.0243, 1.5120), (-0.0300, 1.4990), 0.0132),
    ((-0.0248, 1.5040), (-0.0285, 1.4990), 0.0105),
]
# Half of a tongue section from the dorsal midline round to the ventral
# midline: (fraction of half-width, fraction of half-height).
TONGUE_RING = [(0.30, 1.0), (0.66, 0.96), (0.91, 0.80), (1.0, 0.48), (0.95, 0.12), (0.74, -0.38), (0.47, -0.80), (0.24, -0.98)]


def build_tongue():
    rings = []
    for k, ((dy, dz), (vy, vz), a) in enumerate(TONGUE_STATIONS):
        d, v = Vector((0, dy, dz)), Vector((0, vy, vz))
        mid, up, h = (d + v) / 2, (d - v).normalized(), (d - v).length / 2
        a, h = a * 1.08, h * 1.06  # allow for the smoothing shrinking the cage
        groove = 0.93 if 1 <= k <= 5 else 1.0  # median sulcus of the oral tongue
        half = [(-x, u) for x, u in TONGUE_RING]
        prof = [(0, groove)] + half + [(0, -1.0)] + [(x, u) for x, u in reversed(TONGUE_RING)]
        rings.append([mid + Vector((x * a, 0, 0)) + up * (u * h) for x, u in prof])
    verts, faces = loft(rings, Vector((0, *TONGUE_TIP)), True, 0.002)
    mesh_object("Tongue (sculpted)", verts, faces, subsurf=2)


# Soft palate: from the back of the hard palate (and out to the pterygoid
# hamuli) down and back to a free edge arched up at the sides; the uvula hangs
# from the middle of the edge, about 7 mm in front of the back of the pharynx.
VELUM_MID = [Vector((0, -0.0420, 1.5508)), Vector((0, -0.0330, 1.5482)), Vector((0, -0.0255, 1.5420)),
             Vector((0, -0.0210, 1.5345))]


def velum_point(t, u, side):
    """Point on the soft palate: t along it (0 base, 1 free edge in the
    midline), u across (-1..1), side +1 nasal surface, -1 oral, 0 middle."""
    line = smooth_line(VELUM_MID, 8)
    tt = t * (1 - 0.5 * u * u)  # the free edge arches up laterally
    f = tt * (len(line) - 1)
    i = min(int(f), len(line) - 2)
    p = line[i].lerp(line[i + 1], f - i)
    tan = (line[i + 1] - line[i]).normalized()
    nrm = Vector((0, -tan.z, tan.y))  # up and back: the nasal side
    width = 0.0172 - 0.0030 * tt
    p = p + Vector((u * width, 0.0090 * u * u * (1 - tt), -0.0022 * u * u * tt))
    th = (0.0040 + 0.0055 * math.sin(math.pi * 0.85 * tt)) * (1 - 0.35 * u * u)
    return p + nrm * (side * th / 2)


def build_palate():
    nt, nu = 14, 16
    grid = {s: [[velum_point(i / nt, -1 + 2 * j / nu, s) for j in range(nu + 1)] for i in range(nt + 1)]
            for s in (1, -1)}
    verts, faces, idx = [], [], {}
    for s in (1, -1):
        for i in range(nt + 1):
            for j in range(nu + 1):
                idx[s, i, j] = len(verts)
                verts.append(grid[s][i][j])
    for i in range(nt):
        for j in range(nu):
            for s in (1, -1):
                q = [idx[s, i, j], idx[s, i + 1, j], idx[s, i + 1, j + 1], idx[s, i, j + 1]]
                faces.append(q if s == 1 else q[::-1])
    ring = [(0, j) for j in range(nu)] + [(i, nu) for i in range(nt)] + \
           [(nt, j) for j in range(nu, 0, -1)] + [(i, 0) for i in range(nt, 0, -1)]
    for (i0, j0), (i1, j1) in zip(ring, ring[1:] + ring[:1]):
        faces.append([idx[1, i0, j0], idx[1, i1, j1], idx[-1, i1, j1], idx[-1, i0, j0]])
    mesh_object("Soft palate (sculpted)", verts, faces, subsurf=1)
    base = velum_point(1, 0, 0)
    uv = [base + Vector((0, -0.0010, 0.0010)), base + Vector((0, 0.0012, -0.0040)),
          base + Vector((0, 0.0024, -0.0085)), base + Vector((0, 0.0030, -0.0118))]
    mesh_object("Uvula (sculpted)", *sweep(uv, [0.0028, 0.0024, 0.0027, 0.0021], [0.0028, 0.0024, 0.0027, 0.0021]))
    build_palatal_mucosa()


def build_palatal_mucosa():
    """Mucosa of the hard palate, laid on the bone inside the upper teeth, with
    the incisive papilla, the median raphe and the transverse palatal rugae."""
    from mathutils.bvhtree import BVHTree
    upper = [n for n in TEETH if n.startswith("Upper")]
    teeth = [v for n in upper for v in eval_world(n)]
    hw = {}
    for k in range(-84, -36):  # lingual half-width of the upper arch, by mm of y
        s = [abs(v.x) for v in teeth if abs(v.y - k / 1000) < 0.0015]
        hw[k] = min(s) if s else None
    ys = [k for k in hw if hw[k] is not None and hw[k] > 0.004]
    y0, y1 = min(ys) / 1000 + 0.0010, -0.0405
    def half(y):
        k = round(y * 1000)
        vals = [hw[j] for j in range(k - 3, k + 4) if hw.get(j)] or [0.017]
        return max(0.0025, sum(vals) / len(vals) - 0.0012)
    vs, fs = [], []
    for n in ("Maxilla.r", "Maxilla.l", "Palatine bone.r", "Palatine bone.l"):
        o = D[n]
        me = o.evaluated_get(deps).to_mesh()
        off = len(vs)
        vs += [o.matrix_world @ v.co for v in me.vertices]
        fs += [[off + i for i in p.vertices] for p in me.polygons]
    bvh = BVHTree.FromPolygons(vs, fs)
    ny, nx = 56, 30
    xy, zs = [], []
    for i in range(ny + 1):
        y = y0 + (y1 - y0) * i / ny
        w = half(y) * min(1.0, math.sqrt(max(0.0, (i + 0.4) / 5)))  # rounded front
        xy.append([(-w + 2 * w * j / nx, y) for j in range(nx + 1)])
        row = []
        for x, _ in xy[-1]:
            hit = bvh.ray_cast(Vector((x, y, 1.532)), Vector((0, 0, 1)), 0.04)[0]
            row.append(hit.z if hit and hit.z < 1.556 else None)  # skip hits on the pterygoid plates
        zs.append(row)
    for row in zs:  # fill misses from the nearest hit in the row
        good = [j for j, z in enumerate(row) if z is not None]
        for j in range(len(row)):
            if row[j] is None:
                row[j] = row[min(good, key=lambda g: abs(g - j))] if good else 1.548
    for size in (2, 1):  # smooth: median, then mean
        sm = []
        for i in range(ny + 1):
            r = []
            for j in range(nx + 1):
                win = [zs[a][b] for a in range(max(0, i - size), min(ny, i + size) + 1)
                       for b in range(max(0, j - size), min(nx, j + size) + 1)]
                r.append(sorted(win)[len(win) // 2] if size == 2 else sum(win) / len(win))
            sm.append(r)
        zs = sm
    top, bot = [], []
    for i in range(ny + 1):
        rt, rb = [], []
        for j in range(nx + 1):
            x, y = xy[i][j]
            z = zs[i][j]
            bump = 0.00030 * math.exp(-(x / 0.0010) ** 2) * (y < -0.046)  # median raphe
            bump += 0.0010 * math.exp(-((x / 0.0022) ** 2 + ((y - (y0 + 0.0028)) / 0.0024) ** 2))  # papilla
            for r in range(4):  # rugae: wavy ridges sweeping back from the raphe
                yr = y0 + 0.0060 + 0.0042 * r + 0.0016 * (abs(x) / 0.008) ** 1.5 + 0.0006 * math.sin(abs(x) * 900)
                fade = math.exp(-((abs(x) - 0.0060) / 0.0042) ** 2) * (abs(x) > 0.0012) * (1 - 0.18 * r)
                bump += 0.00075 * fade * math.exp(-((y - yr) / 0.0009) ** 2)
            rt.append(Vector((x, y, z + 0.0004)))
            rb.append(Vector((x, y, z - 0.0009 - bump)))
        top.append(rt)
        bot.append(rb)
    verts, faces, idx = [], [], {}
    for s, g in ((1, top), (-1, bot)):
        for i in range(ny + 1):
            for j in range(nx + 1):
                idx[s, i, j] = len(verts)
                verts.append(g[i][j])
    for i in range(ny):
        for j in range(nx):
            for s in (1, -1):
                q = [idx[s, i, j], idx[s, i + 1, j], idx[s, i + 1, j + 1], idx[s, i, j + 1]]
                faces.append(q if s == 1 else q[::-1])
    ring = [(0, j) for j in range(nx)] + [(i, nx) for i in range(ny)] + \
           [(ny, j) for j in range(nx, 0, -1)] + [(i, 0) for i in range(ny, 0, -1)]
    for (i0, j0), (i1, j1) in zip(ring, ring[1:] + ring[:1]):
        faces.append([idx[1, i0, j0], idx[1, i1, j1], idx[-1, i1, j1], idx[-1, i0, j0]])
    mesh_object("Palatal mucosa (sculpted)", verts, faces)


def ellipsoid(c, axes, n=24, m=14, wobble=None):
    """Ellipsoid at c with half-axes given as three vectors."""
    rings = []
    for i in range(1, m):
        th = math.pi * i / m
        ring = []
        for j in range(n):
            ph = 2 * math.pi * j / n
            d = (math.sin(th) * math.cos(ph), math.sin(th) * math.sin(ph), math.cos(th))
            s = 1 + (wobble(th, ph) if wobble else 0)
            ring.append(c + (axes[0] * d[0] + axes[1] * d[1] + axes[2] * d[2]) * s)
        rings.append(ring)
    return _close_ellipsoid(rings, c, axes)


def _close_ellipsoid(rings, c, axes):
    n = len(rings[0])
    verts = [v for r in rings for v in r] + [c + axes[2], c - axes[2]]
    top, bottom = len(verts) - 2, len(verts) - 1
    faces = [[i * n + j, i * n + (j + 1) % n, (i + 1) * n + (j + 1) % n, (i + 1) * n + j]
             for i in range(len(rings) - 1) for j in range(n)]
    faces += [[top, (j + 1) % n, j] for j in range(n)]
    last = (len(rings) - 1) * n
    faces += [[bottom, last + j, last + (j + 1) % n] for j in range(n)]
    return verts, faces


def build_pharynx_muscles():
    # Palatine tonsils, between the pillars against the superior constrictor.
    crypts = lambda th, ph: 0.035 * math.sin(5 * th) * math.sin(4 * ph) * (math.cos(ph) > 0)
    both_sides("Palatine tonsil (sculpted)", *ellipsoid(Vector((-0.0104, -0.0238, 1.5222)),
               (Vector((0.0040, 0, 0)), Vector((0, 0.0056, 0.0010)), Vector((0, -0.0012, 0.0088))), wobble=crypts))
    # Levator veli palatini: petrous apex, below the auditory tube, into the
    # upper surface of the soft palate.
    lev = [Vector((-0.0196, -0.0005, 1.5682)), Vector((-0.0150, -0.0115, 1.5645)), Vector((-0.0108, -0.0215, 1.5585)),
           Vector((-0.0068, -0.0300, 1.5525))]
    both_sides("Levator veli palatini (sculpted)", *sweep(lev, [0.0022, 0.0034, 0.0032, 0.0022], [0.0020, 0.0030, 0.0028, 0.0018]))
    # Tensor veli palatini: scaphoid fossa and auditory tube, straight down
    # outside the medial pterygoid plate; its tendon hooks round the hamulus
    # into the palatine aponeurosis.
    ten = [Vector((-0.0198, -0.0115, 1.5790)), Vector((-0.0186, -0.0195, 1.5700)), Vector((-0.0174, -0.0255, 1.5605)),
           Vector((-0.0164, -0.0288, 1.5540))]
    tv, tf = sweep(ten, [0.0036, 0.0030, 0.0018, 0.0007], [0.0010, 0.0010, 0.0008, 0.0006], across=Vector((1, 0.2, 0)).normalized())
    tendon = [Vector((-0.0164, -0.0288, 1.5540)), Vector((-0.0163, -0.0298, 1.5488)), Vector((-0.0130, -0.0305, 1.5478)),
              Vector((-0.0080, -0.0345, 1.5492)), Vector((-0.0030, -0.0372, 1.5498))]
    dv, df = sweep(tendon, [0.0006, 0.0006, 0.0008, 0.0016, 0.0022], [0.0005, 0.0005, 0.0005, 0.0004, 0.0004],
                   across=Vector((0, 0.3, 1)).normalized())
    both_sides("Tensor veli palatini (sculpted)", tv + dv, tf + [[k + len(tv) for k in f] for f in df])
    # Salpingopharyngeus: from the lower end of the tubal cartilage down the
    # side wall of the pharynx, into palatopharyngeus.
    sal = [Vector((-0.0102, -0.0110, 1.5745)), Vector((-0.0122, -0.0122, 1.5600)), Vector((-0.0133, -0.0135, 1.5450)),
           Vector((-0.0138, -0.0140, 1.5320))]
    both_sides("Salpingopharyngeus (sculpted)", *sweep(sal, [0.0012, 0.0015, 0.0013, 0.0004], [0.0009, 0.0010, 0.0008, 0.0003]))
    # Styloglossus: styloid process forwards into the side of the tongue,
    # interlacing with hyoglossus.
    sty = [Vector((-0.0385, -0.0010, 1.5505)), Vector((-0.0300, -0.0140, 1.5400)), Vector((-0.0225, -0.0270, 1.5300)),
           Vector((-0.0168, -0.0390, 1.5245)), Vector((-0.0152, -0.0520, 1.5225))]
    both_sides("Styloglossus (sculpted)", *sweep(sty, [0.0010, 0.0016, 0.0024, 0.0026, 0.0010], [0.0010, 0.0014, 0.0016, 0.0015, 0.0008]))


def build_sublingual():
    """Ducts of the sublingual gland (closed mouth): 8 short ducts of Rivinus up
    to the sublingual fold, and Bartholin's duct forward into the submandibular
    duct near the caruncle; and a right-sided ranula with a plunging part."""
    lines = []
    for s in "rl":
        gland = eval_world("Sublingual gland." + s)
        ys = [v.y for v in gland]
        lo, hi = min(ys), max(ys)
        for k in range(8):
            y = lo + (hi - lo) * (0.12 + 0.76 * k / 7)
            band = [v for v in gland if abs(v.y - y) < 0.0016]
            top = max(band, key=lambda v: v.z)
            sx = 1 if top.x > 0 else -1
            lines.append([top - Vector((0, 0, 0.0006)), top + Vector((-sx * 0.0008, 0, 0.0016)),
                          top + Vector((-sx * 0.0014, 0, 0.0030))])
        duct = spline_world("Submandibular duct." + s, 0)
        if duct[0].y < duct[-1].y:
            duct = duct[::-1]  # gland first, caruncle last
        join = dense(duct)[-12]
        front = min(gland, key=lambda v: v.y + abs(v.x) * 0.3)
        lines.append([front, front.lerp(join, 0.5) + Vector((0, 0, 0.0015)), join])
    obj = curve_object("Sublingual ducts (sculpted)", lines, 0.00035)
    # Ranula (right): a thin-walled bluish swelling in the floor of mouth over
    # the sublingual gland, and its plunging part behind the free edge of
    # mylohyoid into the submandibular space.
    c = Vector((-0.0095, -0.0625, 1.5100))  # front of the floor, beside the frenulum, under the tongue
    rv, rf = ellipsoid(c, (Vector((0.0060, 0, 0.0006)), Vector((0, 0.0092, -0.0008)), Vector((-0.0006, 0.0008, 0.0040))))
    neck = [c + Vector((-0.0030, 0.0070, -0.0010)), Vector((-0.0165, -0.0400, 1.5040)), Vector((-0.0195, -0.0405, 1.4985))]
    nv, nf = sweep(neck, [0.0030, 0.0028, 0.0032], [0.0026, 0.0024, 0.0030])
    pv, pf = ellipsoid(Vector((-0.0200, -0.0470, 1.4935)),
                       (Vector((0.0075, 0, 0.0015)), Vector((0, 0.0120, 0.0010)), Vector((0.0010, -0.0010, 0.0080))))
    verts, faces = rv, rf
    for v2, f2 in ((nv, nf), (pv, pf)):
        faces = faces + [[k + len(verts) for k in f] for f in f2]
        verts = verts + v2
    mesh_object("Ranula (sculpted)", verts, faces, subsurf=1)
    return obj


# ---------- the open jaw ----------

JAW_CENTRE = Vector((0, -0.0080, 1.5720))  # axis through the condylar heads
JAW = {"angle": math.radians(20), "slide": Vector((0, -0.0110, -0.0040))}  # turn, and glide forwards
HYOID_DROP = Vector((0, 0, -0.0060))  # the hyoid comes down as the mouth opens
JAW_TREES = {}


def kd(points):
    from mathutils.kdtree import KDTree
    t = KDTree(len(points))
    for k, p in enumerate(points):
        t.insert(p, k)
    t.balance()
    return t


def jaw_move(p, w):
    if w <= 0:
        return p.copy()
    r = Matrix.Rotation(JAW["angle"] * w, 3, "X")
    return JAW_CENTRE + r @ (p - JAW_CENTRE) + JAW["slide"] * w


def occlusal_z(y):
    return 1.5265 + 0.2386 * (y + 0.088)


def jaw_weight(p, mode):
    if mode == "rigid":
        return 1.0
    if mode == "gingiva":
        return 1.0 if p.z < occlusal_z(p.y) else 0.0
    dm = JAW_TREES["jaw"].find(p)[2]
    df = JAW_TREES[mode].find(p)[2]
    return df * df / (df * df + dm * dm + 1e-12)


def tuck(names, into, margin=0.0045):
    """Push vertices of muscles that end inside the tongue back under its surface."""
    from mathutils.bvhtree import BVHTree
    o = D[into]
    me = o.evaluated_get(deps).to_mesh()
    bvh = BVHTree.FromPolygons([o.matrix_world @ v.co for v in me.vertices], [list(f.vertices) for f in me.polygons])
    up, down = Vector((0, 0, 1)), Vector((0, 0, -1))
    for n in names:
        obj = D[n]
        mw, inv = obj.matrix_world, obj.matrix_world.inverted()
        for v in obj.data.vertices:
            p = mw @ v.co
            hit = bvh.ray_cast(p, up, 0.05)[0]
            if hit is None:
                hit = bvh.ray_cast(p, down, 0.02)[0]  # poking out through the dorsum
                if hit is None:
                    continue
            if hit.z - p.z < margin:
                v.co = inv @ Vector((p.x, p.y, hit.z - margin))
        obj.data.update()


def pose_points(points, mode):
    return [jaw_move(p, jaw_weight(p, mode)) for p in points]


def pose_object(obj, mode):
    mw, inv = obj.matrix_world, obj.matrix_world.inverted()
    if obj.type == "MESH":
        if obj.data.users > 1:
            obj.data = obj.data.copy()
        for v in obj.data.vertices:
            p = mw @ v.co
            v.co = inv @ (p + HYOID_DROP if mode == "drop" else jaw_move(p, jaw_weight(p, mode)))
        obj.data.update()
    else:
        if obj.data.users > 1:
            obj.data = obj.data.copy()
        for sp in obj.data.splines:
            for b in sp.bezier_points:
                p = mw @ b.co
                w = jaw_weight(p, mode)
                b.co, b.handle_left, b.handle_right = (inv @ jaw_move(mw @ q, w) for q in (b.co, b.handle_left, b.handle_right))
            for q in sp.points:
                p = mw @ q.co.xyz
                q.co = (*(inv @ jaw_move(p, jaw_weight(p, mode))), q.co.w)


def open_jaw(spec):
    lower = [n for n in TEETH if n.startswith("Lower")]
    JAW_TREES["jaw"] = kd([v for n in ["Mandible"] + lower for v in eval_world(n)][::2])
    for mode, names in spec["fixed"].items():
        JAW_TREES[mode] = kd([v for n in names for v in eval_world(n)][::2])
    for mode, names in spec["move"].items():
        for name in names:
            for n in (lower if name == "LOWER_TEETH" else [name]):
                pose_object(D[n], mode)
    deps.update()


def build_pillars():
    """Tonsillar pillars (after the jaw is open): palatoglossal arch from the
    oral surface of the soft palate beside the uvula, out along its free edge
    and down in front of the tonsil to the side of the tongue; palatopharyngeal
    arch from its back edge, down behind the tonsil on the pharyngeal wall."""
    end = Vector((-0.0163, -0.0335, 1.5160))  # side of the tongue
    front = [velum_point(0.93, -0.22, -1), velum_point(0.86, -0.50, -1), velum_point(0.76, -0.78, -1),
             Vector((-0.0158, -0.0305, 1.5265)), Vector((-0.0162, -0.0322, 1.5205)), end]
    both_sides("Palatoglossal arch (sculpted)",
               *sweep(front, [0.0016, 0.0022, 0.0026, 0.0028, 0.0026, 0.0020], [0.0012, 0.0013, 0.0014, 0.0014, 0.0013, 0.0010],
                      across=Vector((1, -0.25, 0)).normalized()))
    back = [velum_point(0.98, -0.20, 1), velum_point(0.92, -0.50, 1), velum_point(0.84, -0.80, 0),
            Vector((-0.0128, -0.0168, 1.5250)), Vector((-0.0133, -0.0150, 1.5140)), Vector((-0.0136, -0.0128, 1.5040)),
            Vector((-0.0137, -0.0112, 1.4960))]
    both_sides("Palatopharyngeal arch (sculpted)",
               *sweep(back, [0.0016, 0.0022, 0.0026, 0.0028, 0.0026, 0.0020, 0.0006], [0.0012, 0.0013, 0.0014, 0.0014, 0.0013, 0.0011, 0.0004],
                      across=Vector((1, 0.35, 0)).normalized()))


def under_tongue_tip(names, margin=0.0030):
    """Keep muscle that Z-Anatomy runs up behind the incisors below the
    underside of the tongue tip."""
    ventral = [(v[0], v[1]) for _, v, _ in TONGUE_STATIONS[:3]]
    def floor(y):
        if y <= ventral[0][0]:
            return ventral[0][1]
        for (y0, z0), (y1, z1) in zip(ventral, ventral[1:]):
            if y <= y1:
                return z0 + (z1 - z0) * (y - y0) / (y1 - y0)
        return ventral[-1][1]
    for n in names:
        obj = D[n]
        mw, inv = obj.matrix_world, obj.matrix_world.inverted()
        for v in obj.data.vertices:
            p = mw @ v.co
            # In front of the tip, stay below the floor of the mouth (about 1 cm under the tip).
            top = floor(p.y) - margin if p.y > ventral[0][0] else ventral[0][1] - 0.0100
            if p.y < ventral[-1][0] and p.z > top:
                v.co = inv @ Vector((p.x, p.y, top))
        obj.data.update()


def build_oral():
    build_palate()
    build_pharynx_muscles()
    build_sublingual()
    deps.update()
    open_jaw(cfg["open_jaw"])
    build_tongue()  # sculpted in the open position
    deps.update()
    under_tongue_tip(BOTH("Genioglossus muscle"))
    tuck(cfg["open_jaw"].get("tuck", []), "Tongue (sculpted)")
    build_pillars()
    deps.update()


BUILDERS = {"oral": build_oral}


# ---------- temporal bone: ear canal, mastoid cells, middle-ear muscles ----------
# Z-Anatomy has the ossicles, eardrum and labyrinth but not the ear canal, the
# mastoid antrum and air cells, or tensor tympani and stapedius. They are
# modelled here from its landmarks (right ear), as are the surgical landmarks
# pinned on the model.

def bvh_of(name):
    from mathutils.bvhtree import BVHTree
    o = D[name]
    me = o.evaluated_get(deps).to_mesh()
    return BVHTree.FromPolygons([o.matrix_world @ v.co for v in me.vertices], [list(p.vertices) for p in me.polygons])


def inside_mesh(bvh, p):
    """Inside a (possibly imperfect) closed surface: odd crossings along most of five rays."""
    votes = 0
    for d in (Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1)), Vector((-1, 0, 0)), Vector((0, -1, 0))):
        n, q = 0, p.copy()
        for _ in range(64):
            hit = bvh.ray_cast(q, d, 0.3)[0]
            if hit is None:
                break
            n, q = n + 1, hit + d * 1e-6
        votes += n % 2
    return votes >= 3


def radial_cell(c, R, planes, blockers, n=16, m=10):
    """A rounded polyhedral cell round c: rays from c, each stopped at R, at the
    first of the planes (unit normal, distance from c) and short of the first
    blocker surface it meets (bvh, margin); corners are then softened.
    Returns verts, faces and the mean radius."""
    sv, faces = ellipsoid(c, (Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1))), n=n, m=m)
    dirs = [(v - c).normalized() for v in sv]
    radii = []
    for u in dirs:
        t = R
        for nrm, d in planes:
            k = u.dot(nrm)
            if k > 1e-6:
                t = min(t, d / k)
        for bvh, margin in blockers:
            hit = bvh.ray_cast(c, u, t + margin)[0]
            if hit is not None:
                t = min(t, (hit - c).length - margin)
        radii.append(max(t, 0.00015))
    nb = defaultdict(set)
    for f in faces:
        for a in f:
            nb[a].update(f)
    for _ in range(1):
        radii = [min(radii[i], sum(radii[j] for j in nb[i]) / len(nb[i])) for i in range(len(radii))]
    return [c + u * t for u, t in zip(dirs, radii)], faces, sum(radii) / len(radii)


# Skin patches of the right auricle in Z-Anatomy (front, rim and back), joined
# into one watertight ear by build_auricle().
AURICLE_PATCHES = ["Helix.r", "Antihelix.r", "Crura of antihelix.r", "Tragus.r", "Antitragus.r", "Lobule of auricle.r",
                   "Concha of auricle.r", "Cavity of concha.r", "Cymba conchae.r", "Scapha.r", "Triangular fossa.r",
                   "Fossa antihelica.r", "Intertragic incisure.r", "Anterior notch of auricle.r", "Apex of auricle.r",
                   "Auricular tubercle.r", "Eminentia conchae.r", "Eminentia fossae triangularis.r", "Eminentia scaphae.r",
                   "Posterior auricular groove.r"]


def build_auricle(cutter):
    """One skin surface for the auricle: the patches welded, thickened,
    voxel-remeshed to fill the seams and smoothed, with the opening of the ear
    canal cut through the concha by the cutter object."""
    verts, faces = [], []
    for n in AURICLE_PATCHES:
        o = D[n]
        me = o.evaluated_get(deps).to_mesh()
        faces += [[k + len(verts) for k in p.vertices] for p in me.polygons]
        verts += [o.matrix_world @ v.co for v in me.vertices]
    obj = mesh_object("Auricle (skin)", verts, faces)
    for kind, opts in (("WELD", {"merge_threshold": 0.0004}),
                       ("SOLIDIFY", {"thickness": 0.0014, "offset": 0.0}),
                       ("REMESH", {"mode": "VOXEL", "voxel_size": 0.00032, "adaptivity": 0.0}),
                       ("CORRECTIVE_SMOOTH", {"factor": 0.6, "iterations": 12, "smooth_type": "SIMPLE", "use_only_smooth": True}),
                       ("BOOLEAN", {"operation": "DIFFERENCE", "object": cutter, "solver": "EXACT"}),
                       ("DECIMATE", {"ratio": 0.13})):
        mod = obj.modifiers.new(kind.lower(), kind)
        for k, v in opts.items():
            setattr(mod, k, v)
    cutter.hide_render = True
    deps.update()
    return obj


def build_ear():
    import random
    tm = eval_world("Tympanic membrane.r")
    c = sum(tm, Vector()) / len(tm)
    concha = eval_world("Cavity of concha.r")
    cc = sum(concha, Vector()) / len(concha)
    # Ear canal: from its opening in the concha, a gentle S through the
    # cartilaginous and bony parts (narrowest at the isthmus) to the rim of the
    # eardrum, slightly flared at the entrance. Open at both ends.
    canal = [cc + Vector((-0.0010, 0, 0)), cc + Vector((0.0015, 0, 0)), Vector((-0.0600, 0.0043, 1.5752)),
             Vector((-0.0545, 0.0040, 1.5770)), Vector((c.x - 0.0008, c.y, c.z - 0.0003))]
    widths, thick = [0.0044, 0.0036, 0.0033, 0.0029, 0.0040], [0.0050, 0.0042, 0.0038, 0.0032, 0.0046]
    # The canal's own tube, closed and run out through the side of the ear, cuts its opening.
    build_auricle(mesh_object("Ear canal cutter", *sweep([canal[0] + Vector((-0.006, 0, 0))] + canal[:3], [widths[0]] + widths[:3],
                                                         [thick[0]] + thick[:3], across=Vector((0, 0, 1)), n=18)))
    mesh_object("External acoustic meatus (sculpted)", *sweep(canal, widths, thick,
                                                               across=Vector((0, 0, 1)), n=18, caps=False), subsurf=1)
    # Mastoid antrum and air cells: one honeycomb of rounded polyhedral cells
    # packed through the solid mastoid, separated by thin bony septa and kept
    # inside the cortex and clear of the sigmoid sinus, facial nerve,
    # labyrinth and ear canal. The antrum is its largest cell, lateral to the
    # lateral semicircular canal and joined to the attic by the aditus.
    ves = eval_world("Vestibule.r")
    lscc = min(ves, key=lambda v: v.x)  # prominence of the lateral semicircular canal
    antrum = lscc + Vector((-0.0052, 0.0035, 0.0022))
    attic = Vector((-0.0470, 0.0063, 1.5856))
    bone_verts = eval_world("Temporal bone.r")
    bone = bvh_of("Temporal bone.r")
    blockers = [(bone, 0.0005)] + [(bvh_of(n), m) for n, m in (
        ("Sigmoid sinus.r", 0.0006), ("Facial nerve (VII).r", 0.0007), ("Vestibule.r", 0.0007), ("Cochlea.r", 0.0007),
        ("Incus.r", 0.0008), ("Malleus.r", 0.0008), ("External acoustic meatus (sculpted)", 0.0006))]
    sigmoid = bvh_of("Sigmoid sinus.r")
    lumen = smooth_line(canal, 8)
    rnd = random.Random(11)
    seeds = [(antrum, 0.0030)]
    for _ in range(30000):
        if len(seeds) >= 150:
            break
        p = Vector((rnd.uniform(-0.068, -0.040), rnd.uniform(0.006, 0.042), rnd.uniform(1.556, 1.596)))
        r = rnd.uniform(0.0010, 0.0021) * (1.25 if p.z < 1.570 else 1.0)  # larger cells towards the tip
        if any((p - q).length < 0.85 * (r + rq) for q, rq in seeds):
            continue
        if not inside_mesh(bone, p) or bone.find_nearest(p)[3] < 0.0008:
            continue
        if min((p - q).length for q in lumen) < 0.0055:
            continue  # in or beside the ear canal
        if inside_mesh(sigmoid, p) or any(b.find_nearest(p)[3] < m + 0.0004 for b, m in blockers[1:]):
            continue
        seeds.append((p, r))
    cells = []
    for i, (p, r) in enumerate(seeds):
        planes = []
        for j, (q, rq) in enumerate(seeds):
            d = (q - p).length
            if j == i or d > 2.6 * (r + rq):
                continue
            planes.append(((q - p) / d, (d * d + r * r - rq * rq) / (2 * d) - 0.00009))
        cv, cf, mean = radial_cell(p, r * 2.1, planes, blockers)
        if mean < 0.0005:
            continue
        cells.append((cv, cf))
    print("air cells", len(cells) - 1, "of", len(seeds) - 1, "seeds")
    av, af = cells[0]
    dv, df = sweep([attic, attic.lerp(antrum, 0.5) + Vector((0, 0, 0.0006)), antrum], [0.0016, 0.0015, 0.0018], [0.0012, 0.0012, 0.0016])
    mesh_object("Mastoid antrum (sculpted)", av + dv, af + [[k + len(av) for k in f] for f in df], subsurf=1)
    verts, faces = [], []
    for cv, cf in cells[1:]:
        faces += [[k + len(verts) for k in f] for f in cf]
        verts += cv
    mesh_object("Mastoid air cells (sculpted)", verts, faces)
    # Tensor tympani: in its semicanal above the auditory tube; its tendon turns
    # round the cochleariform process to the neck of the malleus.
    cochleariform = Vector((-0.0441, 0.0006, 1.5826))
    tv, tf = sweep([Vector((-0.0300, -0.0085, 1.5842)), Vector((-0.0370, -0.0040, 1.5836)), cochleariform],
                   [0.0010, 0.0011, 0.0005], [0.0009, 0.0010, 0.0005])
    nv, nf = sweep([cochleariform, Vector((-0.0462, 0.0022, 1.5822)), Vector((-0.0476, 0.0033, 1.5818))], [0.0003] * 3, [0.0003] * 3)
    mesh_object("Tensor tympani (sculpted)", tv + nv, tf + [[k + len(tv) for k in f] for f in nf])
    # Stapedius: in the pyramidal eminence and a canal beside the descending
    # facial nerve; its tendon runs forwards to the neck of the stapes.
    eminence = Vector((-0.0451, 0.0086, 1.5794))
    sv, sf = sweep([Vector((-0.0457, 0.0099, 1.5715)), Vector((-0.0455, 0.0094, 1.5755)), eminence],
                   [0.0006, 0.0008, 0.0005], [0.0006, 0.0007, 0.0004])
    st = eval_world("Stapes.r")
    head = min(st, key=lambda v: v.x)
    nv, nf = sweep([eminence, eminence.lerp(head, 0.5), head], [0.00025] * 3, [0.00025] * 3)
    mesh_object("Stapedius (sculpted)", sv + nv, sf + [[k + len(sv) for k in f] for f in nf])
    # Surgical landmarks pinned on the model.
    lateral = lambda y, z: bone.ray_cast(Vector((-0.10, y, z)), Vector((1, 0, 0)), 0.08)[0]
    pts = {
        "spine_of_henle": lateral(0.0092, 1.5812) or Vector((-0.0595, 0.0092, 1.5812)),
        "suprameatal_triangle": lateral(0.0150, 1.5870) or Vector((-0.0630, 0.0150, 1.5870)),
        "mastoid_tip": min([v for v in bone_verts if v.y > 0.012], key=lambda v: v.z),
        "lscc": lscc,
        "tegmen": antrum + Vector((0, 0, 0.0040)),
        "oval_window": max(st, key=lambda v: v.x),
        "round_window": max(st, key=lambda v: v.x) + Vector((0.0004, 0.0016, -0.0028)),
        "fossa_incudis": max(eval_world("Incus.r"), key=lambda v: v.y),
        "cochleariform": cochleariform,
    }
    for k, v in pts.items():
        cfg["points"][k] = ("at", tuple(v))
    deps.update()


BUILDERS["ear"] = build_ear


# ---------- export ----------

parts = []


def add(sid, name, verts, tris):
    parts.append((sid, name, verts, tris))
    print(f"{sid:20} {name:48} {len(verts):6} verts {len(tris):6} tris")


if cfg.get("build"):
    BUILDERS[cfg["build"]]()

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
    if sid in cfg.get("open_jaw", {}).get("drawn", {}):
        pose_object(obj, cfg["open_jaw"]["drawn"][sid])
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
    elif spec["type"] == "interior":
        # Air space inside a solid bone model: each level's interior points (with clearance), hulled and lofted.
        t, (xr, yr), rings = bone_bvh(spec["object"]), spec["box"], []
        excl = [bone_bvh(n) for n in spec.get("exclude", [])]
        for z in frange(*spec["levels"]):
            pts = []
            for i in range(int((xr[1] - xr[0]) / 0.001) + 1):
                for j in range(int((yr[1] - yr[0]) / 0.001) + 1):
                    p = Vector((xr[0] + i * 0.001, yr[0] + j * 0.001, z))
                    if inside_bone(p, t) and t.find_nearest(p)[3] >= spec["clear"] and not any(inside_bone(p, e) for e in excl):
                        pts.append(p)
            if len(pts) >= 6:
                poly = hull2d([(p.x, p.y) for p in pts])
                if len(poly) >= 3:
                    rings.append([(x, y, z) for x, y in resample(poly, 28, 0.0)])
        pieces.append(loft(rings))
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


# ---------- both sides ----------
# Regions built on one side ("mirror": True) get a mirror image of every
# one-sided part across the midline (app x -> -x, winding flipped), under the
# same structure id, so selecting a structure highlights both sides. Parts that
# cross the midline (mandible, septum, sphenoid) and parts whose structure is
# already exported on the other side are left alone. Courses and pins stay on
# the traced side.

MIRROR_OF = {}  # index of a mirrored part -> index of its source part
if cfg.get("mirror"):
    mid = (TO_APP @ Vector((0.0, 0.0, 0.0))).x  # the body's midline (Blender x = 0) in app x
    tol = 0.15  # cm: parts reaching this far across the midline count as midline
    spans = [(sid, min(v.x for v in verts) - mid, max(v.x for v in verts) - mid) for sid, _, verts, _ in parts]
    for i, (sid, name, verts, tris) in enumerate(list(parts)):
        _, lo_x, hi_x = spans[i]
        if lo_x < -tol and hi_x > tol:
            continue
        right = hi_x <= tol
        if any(s == sid and (lx > -tol if right else hx < tol) for s, lx, hx in spans):
            continue  # this structure already has a part on the other side
        MIRROR_OF[len(parts)] = i
        parts.append((sid, name + " (mirrored)", [Vector((2 * mid - v.x, v.y, v.z)) for v in verts],
                      [[a, c, b] for a, b, c in tris]))
    print("mirrored", len(MIRROR_OF), "parts about app x", round(mid, 3))

lo = Vector((min(v[i] for p in parts for v in p[2]) for i in range(3)))
hi = Vector((max(v[i] for p in parts for v in p[2]) for i in range(3)))
span = hi - lo

# ---------- baked ambient occlusion ----------
# Per-vertex visibility (0 = fully enclosed, 255 = open sky), from rays cast over
# the hemisphere around each vertex against every opaque mesh of the region.
# The app darkens the surface colour by it, so folds, crevices and places where
# structures touch read as depth. Translucent shells (fascial spaces and the
# region's "ao_ignore" list) don't occlude. Both sides of each surface are
# tried and the more open one kept, so meshes with inverted winding still work.

def translucent_ids():
    """Structures the region's model draws see-through (opacity < 0.6), read
    from js/models/<region>-model.js; they cast no occlusion."""
    import re
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "js", "models",
                        REGION.replace("_", "-") + "-model.js")
    if not os.path.exists(path):
        return set()
    text = open(path).read()
    found = {m.group(1) for m in re.finditer(r"(\w+): \{[^}]*opacity: ([0-9.]+)", text) if float(m.group(2)) < 0.6}
    print("ao ignores", sorted(found))
    return found


def bake_ao(parts, radius=1.2, rays=14):
    import numpy as np
    from mathutils.bvhtree import BVHTree
    skip = set(cfg.get("spaces", {})) | translucent_ids()
    allv, allf = [], []
    for sid, _, verts, tris in parts:
        if sid in skip:
            continue
        base = len(allv)
        allv += [tuple(v) for v in verts]
        allf += [(a + base, b + base, c + base) for a, b, c in tris]
    tree = BVHTree.FromPolygons(allv, allf)
    # Stratified cosine-weighted directions in a local frame (z = normal).
    golden = np.pi * (3 - np.sqrt(5))
    k = np.arange(rays) + 0.5
    r = np.sqrt(k / rays)
    local = np.stack([r * np.cos(k * golden), r * np.sin(k * golden), np.sqrt(1 - r * r)], 1)
    out = []
    for idx, (sid, _, verts, tris) in enumerate(parts):
        if idx in MIRROR_OF:
            out.append(None)  # filled from the source part below
            continue
        V = np.array([tuple(v) for v in verts], dtype=np.float64)
        F = np.array(tris, dtype=np.int64)
        N = np.zeros_like(V)
        fn = np.cross(V[F[:, 1]] - V[F[:, 0]], V[F[:, 2]] - V[F[:, 0]])
        for j in range(3):
            np.add.at(N, F[:, j], fn)
        N /= np.maximum(np.linalg.norm(N, axis=1, keepdims=True), 1e-12)
        vis = np.empty(len(V))
        for i, (p, n) in enumerate(zip(V, N)):
            t = np.array([0.0, 1.0, 0.0]) if abs(n[0]) > 0.9 else np.array([1.0, 0.0, 0.0])
            t = np.cross(n, t)
            t /= np.linalg.norm(t)
            b = np.cross(n, t)
            best = 0.0
            for side in (1.0, -1.0):
                dirs = local[:, :1] * t + local[:, 1:2] * b + local[:, 2:] * (n * side)
                origin = Vector(p + n * side * 0.004)
                open_ = 0.0
                for d in dirs:
                    hit = tree.ray_cast(origin, Vector(d), radius)
                    open_ += 1.0 if hit[0] is None else hit[3] / radius
                best = max(best, open_ / rays)
                if best > 0.97:
                    break
            vis[i] = best
        out.append(np.clip(np.round(vis * 255), 0, 255).astype(np.uint8).tobytes())
        print(f"ao {sid:20} mean {vis.mean():.2f}")
    for idx, src in MIRROR_OF.items():
        out[idx] = out[src]  # same vertex order, so the mirror shares the bake
    return out


AO = bake_ao(parts) if not os.environ.get("NO_AO") else None

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
    if AO:
        entry["ao"] = len(blob)
        blob += AO[len(meshes)]
        while len(blob) % 4:
            blob += b"\0"
    meshes.append(entry)


# ---------- named points and courses (traced structures) ----------

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
    if kind == "at":
        return Vector(spec[1])
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
    POINTS[key] = course_point(spec, None) if spec[0] in ("anchor", "at") else course_point(spec, [])
for sid, c in cfg.get("courses", {}).items():
    path = []
    for piece in c["path"]:
        name, i = piece[:2]
        # Optional first and last (inclusive) point indices take part of a spline.
        pts = spline_world(name, i)[piece[2] if len(piece) > 2 else 0:piece[3] + 1 if len(piece) > 3 else None]
        if path and (pts[0] - path[-1]).length > (pts[-1] - path[-1]).length:
            pts = pts[::-1]  # join each piece end to end
        path += pts[1:] if path and (pts[0] - path[-1]).length < 1e-4 else pts
    if "zmin" in c:
        path = [p for p in path if p.z >= c["zmin"]]
    if "zmax" in c:
        path = [p for p in path if p.z <= c["zmax"]]
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
