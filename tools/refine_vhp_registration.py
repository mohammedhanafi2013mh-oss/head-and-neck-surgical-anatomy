"""Refine the model-to-CT registration locally for each region.

    python tools/refine_vhp_registration.py WORK_DIR data/scans/vhp-scans.js data/*-meshes.js

The global registration (tools/register_vhp_ct.py) fits the whole skeleton
from skull to clavicles at once, so any one region can be off by a few
millimetres. This starts from that fit and runs ICP again using only the
region's own bones (read from its data/<region>-meshes.js) against the CT
bone surface around them. The result is written into the scan manifest as
scans.regions[<region>] = {R, t, before, after}, with the median bone
distances (mm) before and after.
"""

import base64, json, re, sys
import numpy as np
from scipy import ndimage
from scipy.spatial import cKDTree

WORK, MANIFEST = sys.argv[1:3]
MESH_FILES = sys.argv[3:]
BONES = {"mandible", "temporal", "zygomatic", "atlas", "hyoid", "clavicle", "clavicles", "sternum",
         "first_rib", "vertebrae", "occipital", "sphenoid", "ethmoid", "frontal", "atlas_axis"}

ct = np.load(f"{WORK}/ct_volume.npz")
vol, zs, ox, oy, sp = ct["vol"], ct["zs"], float(ct["ox"]), float(ct["oy"]), float(ct["sp"])
bone = vol > 250
surf = bone & ~ndimage.binary_erosion(bone)
k, j, i = np.nonzero(surf)
ct_pts = np.c_[ox + i * sp, oy + j * sp, zs[k]]

reg = np.load(f"{WORK}/registration.npz")
R0, t0 = reg["R"], reg["t"]


def region_bones(path):
    text = open(path).read()
    found = re.search(r"window\.ANATOMY\.meshes\.(\w+) = ", text)
    name = found.group(1)
    obj = json.loads(text[found.end():].rsplit(";", 1)[0])
    h, data = obj["header"], base64.b64decode(obj["data"])
    lo, hi = np.array(h["min"]), np.array(h["max"])
    pts = []
    for m in h["meshes"]:
        if m["id"] not in BONES:
            continue
        q = np.frombuffer(data, np.int16, m["vertexCount"] * 3, m["positions"]).reshape(-1, 3)
        pts.append(lo + (q.astype(float) + 32768) / 65535 * (hi - lo))
    app = np.concatenate(pts)  # cm, region-centred, y up, z anterior
    c = np.array(h["centre"])
    world = np.c_[c[0] + app[:, 0] / 100, c[1] - app[:, 2] / 100, c[2] + app[:, 1] / 100] * 1000
    return name, world


def icp(src, tree, ref, R, t, its=40):
    for it in range(its):
        moved = src @ R.T + t
        dist, idx = tree.query(moved)
        thr = max(2.5, np.percentile(dist, 75)) if it > 4 else 15
        m = dist < thr
        A, B = moved[m], ref[idx[m]]
        ca, cb = A.mean(0), B.mean(0)
        U, S, Vt = np.linalg.svd((A - ca).T @ (B - cb))
        Ri = Vt.T @ U.T
        if np.linalg.det(Ri) < 0:
            Vt[-1] *= -1
            Ri = Vt.T @ U.T
        R, t = Ri @ R, Ri @ t + cb - Ri @ ca
    return R, t


text = open(MANIFEST).read()
prefix, body = text.split("window.ANATOMY.scans = ", 1)
scans = json.loads(body.rsplit(";", 1)[0])
scans.setdefault("regions", {})
for path in MESH_FILES:
    name, world = region_bones(path)
    moved0 = world @ R0.T + t0
    lo, hi = moved0.min(0) - 30, moved0.max(0) + 30
    near = ct_pts[np.all((ct_pts > lo) & (ct_pts < hi), axis=1)]
    tree = cKDTree(near)
    src = world[np.random.default_rng(0).choice(len(world), min(len(world), 20000), replace=False)]
    before = float(np.median(tree.query(src @ R0.T + t0)[0]))
    R, t = icp(src, tree, near, R0.copy(), t0.copy())
    after = float(np.median(tree.query(src @ R.T + t)[0]))
    shift = float(np.linalg.norm((world.mean(0) @ R.T + t) - (world.mean(0) @ R0.T + t0)))
    ang = float(np.degrees(np.arccos(np.clip((np.trace(R @ R0.T) - 1) / 2, -1, 1))))
    print(f"{name:14} bone pts {len(world):6}  median {before:.2f} -> {after:.2f} mm  (moved {shift:.1f} mm, {ang:.1f} deg)")
    # Keep the global fit if the local one is not clearly better.
    if after < before - 0.1:
        scans["regions"][name] = {"R": R.tolist(), "t": t.tolist(), "before": round(before, 2), "after": round(after, 2)}
    else:
        scans["regions"].pop(name, None)

with open(MANIFEST, "w") as f:
    f.write(prefix + "window.ANATOMY.scans = ")
    json.dump(scans, f)
    f.write(";\n")
