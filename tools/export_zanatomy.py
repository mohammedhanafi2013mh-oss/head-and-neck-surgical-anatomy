"""Export the submandibular region from the Z-Anatomy Blender file.

Run with Blender's Python module (pip install bpy):

    python tools/export_zanatomy.py /path/to/Z-Anatomy/Startup.blend data/submandibular-meshes.js

Z-Anatomy (https://github.com/Z-Anatomy/models-of-human-anatomy) is licensed
CC BY-SA 4.0 and builds on BodyParts3D (CC BY-SA 2.1 JP). The exported meshes
inherit that licence.

Output is a script that sets window.ANATOMY.meshes.submandibular to
{ header, data }, where data is base64 of quantized int16 positions and
uint16/uint32 triangle indices for each mesh. Loading it as a <script> keeps
the app working from file:// without fetch().
"""

import base64
import json
import struct
import sys

import bpy  # must come before bmesh when using the bpy module
import bmesh
from mathutils import Matrix, Vector

SRC, OUT = sys.argv[-2], sys.argv[-1]

# app structure id -> list of Blender object names (right side unless noted).
STRUCTURES = {
    "mandible": ["Mandible", "Lower first molar tooth.r", "Lower second molar tooth.r",
                 "Lower first molar tooth.l", "Lower second molar tooth.l"],
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
}

# Z-Anatomy draws vessels and nerves as curves with per-point radii. Thicken
# the thin ones a little so they read at atlas scale.
CURVE_SCALE = {"lingual_nerve": 1.6, "hypoglossal": 1.4, "mmn": 1.8, "nerve_mylohyoid": 1.6,
               "submental_artery": 1.4, "wharton": 1.4}

BONES = {"mandible", "hyoid", "temporal"}

# Marginal mandibular branch only: the end of facial nerve spline 0 from the
# cervicofacial division (point 18) onward, plus its twig (spline 1).
# Found by inspecting the spline paths against the mandible's lower border.
SPLINE_PARTS = {"Facial nerve (VII).r": [(0, 18), (1, 0)]}

bpy.ops.wm.open_mainfile(filepath=SRC)
deps = bpy.context.evaluated_depsgraph_get()

# Blender (Z-up, front = -Y, metres) -> app (Y-up, front = +Z, centimetres),
# centred on the submandibular gland.
gland = bpy.data.objects["Submandibular gland.r"]
centre = gland.matrix_world @ (sum((Vector(c) for c in gland.bound_box), Vector()) / 8)
AXES = Matrix(((1, 0, 0, 0), (0, 0, 1, 0), (0, -1, 0, 0), (0, 0, 0, 1)))
TO_APP = AXES @ Matrix.Scale(100, 4) @ Matrix.Translation(-centre)


def trimmed_curve(obj, parts):
    """Copy of obj's curve data keeping only the given (spline, first point) tails."""
    src = obj.data
    cu = src.copy()
    cu.splines.clear()
    for si, first in parts:
        pts = src.splines[si].bezier_points[first:]
        sp = cu.splines.new("BEZIER")
        sp.bezier_points.add(len(pts) - 1)
        for dst, p in zip(sp.bezier_points, pts):
            dst.co, dst.handle_left, dst.handle_right = p.co, p.handle_left, p.handle_right
            dst.handle_left_type, dst.handle_right_type = p.handle_left_type, p.handle_right_type
            dst.radius = p.radius
    return cu


def mesh_from(obj, sid):
    if obj.type == "CURVE":
        cu = obj.data
        if obj.name in SPLINE_PARTS:
            cu = trimmed_curve(obj, SPLINE_PARTS[obj.name])
            obj = bpy.data.objects.new(obj.name + " (part)", cu)
            obj.matrix_world = bpy.data.objects[obj.name[:-7]].matrix_world.copy()
            bpy.context.scene.collection.objects.link(obj)
        cu.bevel_depth *= CURVE_SCALE.get(sid, 1.0)
        cu.bevel_resolution = 3
        cu.resolution_u = 10
        cu.use_fill_caps = True
        deps.update()
    elif sid not in BONES and len(obj.data.vertices) < 1200 and not any(m.type == "SUBSURF" for m in obj.modifiers):
        # Smooth coarse soft-tissue meshes (gland, small muscles, nodes).
        mod = obj.modifiers.new("smooth", "SUBSURF")
        mod.levels = 1
        deps.update()
    ev = obj.evaluated_get(deps)
    me = bpy.data.meshes.new_from_object(ev)
    bm = bmesh.new()
    bm.from_mesh(me)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
    bmesh.ops.triangulate(bm, faces=bm.faces)
    bm.transform(TO_APP @ obj.matrix_world)
    verts = [v.co.copy() for v in bm.verts]
    tris = [[v.index for v in f.verts] for f in bm.faces]
    bm.free()
    bpy.data.meshes.remove(me)
    return verts, tris


parts = []
for sid, names in STRUCTURES.items():
    for name in names:
        obj = bpy.data.objects.get(name)
        if obj is None:
            print("missing", name)
            continue
        verts, tris = mesh_from(obj, sid)
        parts.append((sid, name, verts, tris))
        print(f"{sid:18} {name:45} {len(verts):6} verts {len(tris):6} tris")

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
    f.write("window.ANATOMY.meshes.submandibular = ")
    json.dump({"header": header, "data": base64.b64encode(bytes(blob)).decode()}, f)
    f.write(";\n")
print("bytes", len(blob), "verts", sum(m["vertexCount"] for m in meshes))
