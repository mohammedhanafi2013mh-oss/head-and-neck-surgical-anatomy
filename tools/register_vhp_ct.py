"""Resample the Visible Human male CT and register the Z-Anatomy skeleton to it.

    python tools/register_vhp_ct.py CT_SERIES_DIR model_bone_mm.npy WORK_DIR

CT_SERIES_DIR is the 844-slice VHP-M CT series from the Imaging Data Commons
(nlm_visible_human_project). Writes WORK_DIR/ct_volume.npz (CT on a 0.75 mm
grid in patient mm) and WORK_DIR/registration.npz (rigid transform from
Z-Anatomy world mm to CT mm, found by ICP on bone surfaces).
"""

import os, sys, numpy as np, pydicom
from scipy import ndimage
from scipy.spatial import cKDTree

d, MODEL, WORK = sys.argv[1:4]
items = []
for f in os.listdir(d):
    ds = pydicom.dcmread(os.path.join(d, f), stop_before_pixels=True)
    z = float(ds.ImagePositionPatient[2])
    if z >= -420:
        items.append((z, f))
items.sort()
# The series mixes fields of view (0.94, 0.78 and 0.53 mm pixels with
# different origins), so resample every slice onto one grid in patient mm.
SP = 0.75
grid = np.arange(-200, 200, SP)
gx, gy = np.meshgrid(grid, grid)  # gx: patient x (columns), gy: patient y (rows)
zs = np.array([z for z, _ in items])
vol = np.empty((len(items), len(grid), len(grid)), np.int16)
for n, (_, f) in enumerate(items):
    ds = pydicom.dcmread(os.path.join(d, f))
    a = ds.pixel_array.astype(np.float32) * float(ds.RescaleSlope) + float(ds.RescaleIntercept)
    ox, oy, sp = float(ds.ImagePositionPatient[0]), float(ds.ImagePositionPatient[1]), float(ds.PixelSpacing[0])
    vol[n] = ndimage.map_coordinates(a, [(gy - oy) / sp, (gx - ox) / sp], order=1, cval=-1000).astype(np.int16)
ox = oy = float(grid[0]); sp = SP
print('volume', vol.shape, 'z', zs[0], zs[-1], 'spacing', sp, 'origin', ox, oy)
np.savez_compressed(os.path.join(WORK, 'ct_volume.npz'), vol=vol, zs=zs, ox=ox, oy=oy, sp=sp)

# CT bone surface points (mm, patient LPS)
bone = vol > 250
surf = bone & ~ndimage.binary_erosion(bone)
k, j, i = np.nonzero(surf)
ct = np.c_[ox + i * sp, oy + j * sp, zs[k]]
ct = ct[np.random.default_rng(0).choice(len(ct), min(len(ct), 400000), replace=False)]
tree = cKDTree(ct)

model = np.load(MODEL)
# Initial guess: align the vertex (top of skull) and the left-right / front-back centres.
vertex_ct = zs[np.nonzero(bone.reshape(len(zs), -1).any(1))[0].max()]
t0 = np.array([np.median(ct[:, 0]) - np.median(model[:, 0]),
               np.median(ct[ct[:, 2] > vertex_ct - 150][:, 1]) - np.median(model[model[:, 2] > model[:, 2].max() - 150][:, 1]),
               vertex_ct - model[:, 2].max()])
print('vertex ct', vertex_ct, 'model', model[:, 2].max(), 't0', t0.round(1))
src = model[model[:, 2] > model[:, 2].max() - 330]  # skull to clavicles
src = src[np.random.default_rng(1).choice(len(src), min(len(src), 30000), replace=False)]

R = np.eye(3); t = t0.copy()
for it in range(60):
    moved = src @ R.T + t
    dist, idx = tree.query(moved)
    thr = max(4.0, np.percentile(dist, 80)) if it > 5 else 30
    m = dist < thr
    A, B = moved[m], ct[idx[m]]
    ca, cb = A.mean(0), B.mean(0)
    H = (A - ca).T @ (B - cb)
    U, S, Vt = np.linalg.svd(H)
    Ri = Vt.T @ U.T
    if np.linalg.det(Ri) < 0:
        Vt[-1] *= -1; Ri = Vt.T @ U.T
    ti = cb - Ri @ ca
    R = Ri @ R; t = Ri @ t + ti
    if it % 10 == 0 or it == 59:
        print(it, 'median dist', round(float(np.median(dist)), 2), 'inliers', int(m.sum()))
moved = model @ R.T + t
dist, _ = tree.query(moved[moved[:, 2] > -400])
print('final median dist (mm)', round(float(np.median(dist)), 2), 'p90', round(float(np.percentile(dist, 90)), 2))
ang = np.degrees(np.arccos(np.clip((np.trace(R) - 1) / 2, -1, 1)))
print('rotation deg', round(float(ang), 2), 't', t.round(1))
np.savez(os.path.join(WORK, 'registration.npz'), R=R, t=t)
