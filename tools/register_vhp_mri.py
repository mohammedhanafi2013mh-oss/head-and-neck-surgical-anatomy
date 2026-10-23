"""Register the Visible Human MRI to the CT, so MRI slices can be labelled from the model.

    python tools/register_vhp_mri.py WORK_DIR MR_ROOT data/scans/vhp-scans.js

The MRI was taken in other sessions and positions than the CT, and each MR
series has its own frame of reference. The axial series (T1 and T2, same
slices) and the coronal series (T1 and T2) are each fitted with a rigid
transform from MR patient mm to CT patient mm, by matching the body outline:
the fraction of sample points whose inside/outside state disagrees between
the MR body mask and the CT body mask (air below -400 HU) is minimised, first
over a grid of translations, then with Powell over rotation and translation.
The outline gives a sharp optimum where mutual information on these
post-mortem scans does not. Only the head and neck are used (the chest and
shoulders lie differently).

Writes into each MRI series in the manifest:
  geometry      origin (mm) of the first slice's top-left pixel, the step
                between slices, the row and column directions, mm per pixel
  registration  R, t: CT = R @ MR + t, and the outline disagreement
The app maps model -> CT -> MR with the CT registration and this one.
"""

import glob, json, os, sys
import numpy as np
import pydicom
from scipy import ndimage, optimize
from scipy.spatial.transform import Rotation

WORK, MR_ROOT, MANIFEST = sys.argv[1:4]
SETS = {"t1_axial": "T1 AXIAL", "t2_axial": "AXIAL T2", "t1_coronal": "T1 CORONAL", "t2_coronal": "T2 CORONAL NECK"}
ECHO = {"t2_axial": 102.0, "t2_coronal": 102.0}  # second echo, as exported
FIT = {"t1_axial": ("t1_axial", "t2_axial", -100.0), "t1_coronal": ("t1_coronal", "t2_coronal", -60.0)}


def series(sid):
    """Slices in the app's order (as tools/export_vhp_scans.py sorts them) and their geometry."""
    for d in glob.glob(os.path.join(MR_ROOT, "MR_*")):
        f0 = os.path.join(d, os.listdir(d)[0])
        if pydicom.dcmread(f0, stop_before_pixels=True, force=True).SeriesDescription == SETS[sid]:
            break
    dss = [pydicom.dcmread(os.path.join(d, f), force=True) for f in os.listdir(d)]
    if sid in ECHO:
        dss = [ds for ds in dss if abs(float(ds.EchoTime) - ECHO[sid]) < 1]
    axial = "axial" in sid
    dss.sort(key=(lambda ds: float(ds.ImagePositionPatient[2])) if axial else (lambda ds: -float(ds.ImagePositionPatient[1])))
    arr = np.stack([ds.pixel_array.astype(np.float32) for ds in dss])
    ipp = np.array([[float(x) for x in ds.ImagePositionPatient] for ds in dss])
    iop = np.array([float(x) for x in dss[0].ImageOrientationPatient])
    return arr, ipp, iop[:3], iop[3:], float(dss[0].PixelSpacing[0])


ct = np.load(os.path.join(WORK, "ct_volume.npz"))
vol, zs, ox, oy, sp = ct["vol"], ct["zs"], float(ct["ox"]), float(ct["oy"]), float(ct["sp"])
body = np.stack([ndimage.binary_fill_holes(b) for b in vol > -400]).astype(np.float32)


def ct_inside(q):
    k = (q[:, 2] - zs[0]) / (zs[1] - zs[0]); j = (q[:, 1] - oy) / sp; i = (q[:, 0] - ox) / sp
    return ndimage.map_coordinates(body, [k, j, i], order=1, cval=0)


def fit(sid, zmin):
    a, ipp, r, c, s = series(sid)
    a = a / np.percentile(a, 99.5)
    n, H, W = a.shape
    jj, ii = np.mgrid[0:H:2, 0:W:2]
    P, L = [], []
    for k in range(n):
        m = ndimage.binary_fill_holes(ndimage.binary_opening(a[k] > 0.12, iterations=2))
        if m.sum() < 400:
            continue  # noise-only slices outside the body
        P.append(ipp[k] + np.outer(ii.ravel() * s, r) + np.outer(jj.ravel() * s, c))
        L.append(m[jj, ii].ravel().astype(np.float32))
    P, L = np.concatenate(P), np.concatenate(L)
    P, L = P[P[:, 2] > zmin], L[P[:, 2] > zmin]
    cen = P.mean(0)

    def move(x, pts):
        return (pts - cen) @ Rotation.from_euler("xyz", x[:3], degrees=True).as_matrix().T + cen + x[3:]

    rng = np.random.default_rng(0)
    small = rng.choice(len(P), 40000, replace=False)
    big = rng.choice(len(P), min(len(P), 150000), replace=False)
    err = lambda x, idx: float(np.mean(np.abs(ct_inside(move(x, P[idx])) - L[idx])))
    grid = sorted((err(np.r_[0, 0, 0, tx, ty, tz], small), tx, ty, tz)
                  for tz in range(-420, -40, 6) for ty in range(-60, 61, 10) for tx in (-10, 0, 10))
    best = None
    for _, tx, ty, tz in grid[:3]:
        x = optimize.minimize(lambda x: err(x, big), np.r_[0, 0, 0, tx, ty, tz], method="Powell",
                              options={"xtol": 0.05, "ftol": 1e-6, "maxfev": 3000}).x
        e = err(x, big)
        if best is None or e < best[0]:
            best = (e, x)
    e, x = best
    R = Rotation.from_euler("xyz", x[:3], degrees=True).as_matrix()
    t = cen + x[3:] - R @ cen
    print(f"{sid}: outline disagreement {e:.3f}, rotation {np.round(x[:3], 2)} deg, t {np.round(t, 1)} mm")
    return R, t, e


text = open(MANIFEST).read()
prefix, body_json = text.split("window.ANATOMY.scans = ", 1)
scans = json.loads(body_json.rsplit(";", 1)[0])
by_id = {s["id"]: s for s in scans["mri"]["series"]}
for key, (sid1, sid2, zmin) in FIT.items():
    R, t, e = fit(sid1, zmin)
    for sid in (sid1, sid2):
        _, ipp, r, c, s = series(sid)
        steps = np.diff(ipp, axis=0)
        assert np.allclose(steps, steps.mean(0), atol=0.05), f"{sid}: uneven slice spacing"
        by_id[sid]["geometry"] = {"origin": ipp[0].round(3).tolist(), "step": steps.mean(0).round(4).tolist(),
                                  "row": r.tolist(), "col": c.tolist(), "mmPerPixel": s}
        by_id[sid]["registration"] = {"R": R.round(6).tolist(), "t": t.round(3).tolist(), "outline": round(e, 4)}

with open(MANIFEST, "w") as f:
    f.write(prefix + "window.ANATOMY.scans = ")
    json.dump(scans, f)
    f.write(";\n")
