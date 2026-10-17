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
    },
}

cfg = REGIONS[REGION]
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


DRAWN = {"phrenic": drawn_phrenic, "thoracic_duct": drawn_thoracic_duct,
         "great_auricular": drawn_great_auricular}


def curve_object(name, points, radius):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    sp = cu.splines.new("NURBS")
    sp.points.add(len(points) - 1)
    for p, v in zip(sp.points, points):
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


def clip(bm, z):
    gone = [f for f in bm.faces if all(v.co.z < z for v in f.verts)]
    bmesh.ops.delete(bm, geom=gone, context="FACES")
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context="VERTS")


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
        add(sid, name, *to_arrays(bm))
        bm.free()

if cfg.get("node_groups") or cfg.get("drawn"):
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
    add(sid, f"{sid} (drawn)", *to_arrays(bm))
    bm.free()

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

header = {"min": list(lo), "max": list(hi), "meshes": meshes,
          "credit": "Z-Anatomy (CC BY-SA 4.0), based on BodyParts3D (c) The Database Center for Life Science (CC BY-SA 2.1 JP)"}
with open(OUT, "w") as f:
    f.write("// Generated by tools/export_zanatomy.py from Z-Anatomy (CC BY-SA 4.0),\n")
    f.write("// based on BodyParts3D (CC BY-SA 2.1 JP). Do not edit by hand.\n")
    f.write("window.ANATOMY = window.ANATOMY || { regions: {} };\n")
    f.write("window.ANATOMY.meshes = window.ANATOMY.meshes || {};\n")
    f.write(f"window.ANATOMY.meshes.{REGION} = ")
    json.dump({"header": header, "data": base64.b64encode(bytes(blob)).decode()}, f)
    f.write(";\n")
print("bytes", len(blob), "verts", sum(m["vertexCount"] for m in meshes))
