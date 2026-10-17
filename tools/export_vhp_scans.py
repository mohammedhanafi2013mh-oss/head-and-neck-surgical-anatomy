"""Export Visible Human male CT and MRI as slice sprite sheets for the app.

Source: NLM Visible Human Project, via the NCI Imaging Data Commons
(collection nlm_visible_human_project, patient VHP-M), downloaded with
`pip install idc-index`. Used under the National Library of Medicine terms
and conditions (May 21, 2019); credit "Courtesy of the U.S. National
Library of Medicine".

Inputs (made by the steps in README "Real scans"):
  ct_volume.npz       CT resampled to a 0.75 mm grid in patient mm (LPS)
  registration.npz    rigid transform from Z-Anatomy world (mm) to CT mm
  MR series folders   DICOM from IDC

Usage: python tools/export_vhp_scans.py WORK_DIR MR_ROOT OUT_DIR
Writes OUT_DIR/*.jpg sprite sheets and OUT_DIR/vhp-scans.js (manifest).
"""

import glob
import json
import os
import sys

import numpy as np
import pydicom
from PIL import Image
from scipy import ndimage

WORK, MR_ROOT, OUT = sys.argv[1:4]
TILE = 400          # CT tile size in px (1 mm per px)
GRID = 5            # tiles per sprite row/column
STEP = 2.0          # mm between exported slices
QUALITY = 80
WINDOWS = {"soft": (40, 400), "bone": (400, 2000)}

v = np.load(os.path.join(WORK, "ct_volume.npz"))
vol, zs, o, sp = v["vol"], v["zs"], float(v["ox"]), float(v["sp"])
reg = np.load(os.path.join(WORK, "registration.npz"))
axis_mm = np.arange(-200, 200, 1.0)  # 1 mm output grid in x and y


def window(a, centre, width):
    return (np.clip((a - (centre - width / 2)) / width, 0, 1) * 255).astype(np.uint8)


def sample_axial(z):
    """CT axial image at height z (mm), resampled to 1 mm pixels."""
    k = np.interp(z, zs, np.arange(len(zs)))
    gx, gy = np.meshgrid(axis_mm, axis_mm)
    kk = np.full(gx.shape, k)
    return ndimage.map_coordinates(vol, [kk, (gy - o) / sp, (gx - o) / sp], order=1, cval=-1000)


def sample_coronal(y):
    """Rows = z from top (superior) down, columns = x (patient right to left)."""
    zz = np.arange(zs[-1], zs[-1] - TILE, -1.0)
    gx, gz = np.meshgrid(axis_mm, zz)
    k = np.interp(gz, zs, np.arange(len(zs)), left=-1, right=-1)
    return ndimage.map_coordinates(vol, [k, np.full(gx.shape, (y - o) / sp), (gx - o) / sp], order=1, cval=-1000), zz


def sample_sagittal(x):
    """Rows = z from top down, columns = y (anterior to posterior)."""
    zz = np.arange(zs[-1], zs[-1] - TILE, -1.0)
    gy, gz = np.meshgrid(axis_mm, zz)
    k = np.interp(gz, zs, np.arange(len(zs)), left=-1, right=-1)
    return ndimage.map_coordinates(vol, [k, (gy - o) / sp, np.full(gy.shape, (x - o) / sp)], order=1, cval=-1000), zz


def write_sprites(name, images, tile):
    """Pack images into GRID x GRID sprite sheets; return the file names."""
    files = []
    per = GRID * GRID
    for s in range(0, len(images), per):
        sheet = Image.new("L", (tile * GRID, tile * GRID))
        for n, im in enumerate(images[s:s + per]):
            sheet.paste(Image.fromarray(im).resize((tile, tile)), ((n % GRID) * tile, (n // GRID) * tile))
        fn = f"{name}-{s // per:02d}.jpg"
        sheet.save(os.path.join(OUT, fn), quality=QUALITY, optimize=True, progressive=True)
        files.append(fn)
    return files


manifest = {
    "credit": "Visible Human Project, courtesy of the U.S. National Library of Medicine (via the NCI Imaging Data Commons).",
    # Z-Anatomy world (mm, x = patient left, y = posterior, z = superior) -> CT patient mm (LPS).
    "registration": {"R": reg["R"].tolist(), "t": reg["t"].tolist()},
    "ct": {"tile": TILE, "grid": GRID, "mmPerPixel": 1.0, "planes": {}},
    "mri": {"grid": 8, "series": []},
}

top = float(zs[-1])
planes = {
    "axial": (np.arange(zs[0], zs[-1] + 0.01, STEP), lambda p: sample_axial(p), "z",
              {"u0": -200, "v0": -200, "uAxis": "x", "vAxis": "y"}),
    "coronal": (np.arange(-120, 120.01, STEP), lambda p: sample_coronal(p)[0], "y",
                {"u0": -200, "v0": top, "uAxis": "x", "vAxis": "-z"}),
    "sagittal": (np.arange(-100, 100.01, STEP), lambda p: sample_sagittal(p)[0], "x",
                 {"u0": -200, "v0": top, "uAxis": "y", "vAxis": "-z"}),
}
for plane, (positions, sampler, axis, frame) in planes.items():
    raw = [sampler(p) for p in positions]
    entry = {"axis": axis, "positions": [round(float(p), 2) for p in positions], "frame": frame, "files": {}}
    for wname, (c, w) in WINDOWS.items():
        entry["files"][wname] = write_sprites(f"ct-{plane}-{wname}", [window(a, c, w) for a in raw], TILE)
    manifest["ct"]["planes"][plane] = entry
    print(plane, len(positions), "slices")

# MRI: T1 and T2 (second echo) in axial and coronal planes, own coordinates.
MR_SETS = [
    ("t1_axial", "T1 AXIAL", "axial", "T1", None),
    ("t2_axial", "AXIAL T2", "axial", "T2", 102.0),
    ("t1_coronal", "T1 CORONAL", "coronal", "T1", None),
    ("t2_coronal", "T2 CORONAL NECK", "coronal", "T2", 102.0),
]
for sid, desc, plane, weight, echo in MR_SETS:
    d = next(x for x in glob.glob(os.path.join(MR_ROOT, "MR_*"))
             if pydicom.dcmread(os.path.join(x, os.listdir(x)[0]), stop_before_pixels=True).SeriesDescription == desc)
    dss = [pydicom.dcmread(os.path.join(d, f)) for f in os.listdir(d)]
    if echo:
        dss = [ds for ds in dss if abs(float(ds.EchoTime) - echo) < 1]
    key = (lambda ds: float(ds.ImagePositionPatient[2])) if plane == "axial" else (lambda ds: -float(ds.ImagePositionPatient[1]))
    dss.sort(key=key)
    arrs = [ds.pixel_array.astype(np.float32) for ds in dss]
    lo, hi = np.percentile(np.stack(arrs), [0.5, 99.7])
    imgs = [(np.clip((a - lo) / (hi - lo), 0, 1) * 255).astype(np.uint8) for a in arrs]
    tile = dss[0].Rows
    files = []
    per = 64
    for s in range(0, len(imgs), per):
        sheet = Image.new("L", (tile * 8, tile * 8))
        for n, im in enumerate(imgs[s:s + per]):
            sheet.paste(Image.fromarray(im), ((n % 8) * tile, (n // 8) * tile))
        fn = f"mr-{sid}-{s // per:02d}.jpg"
        sheet.save(os.path.join(OUT, fn), quality=85, optimize=True, progressive=True)
        files.append(fn)
    manifest["mri"]["series"].append({
        "id": sid, "plane": plane, "weighting": weight, "count": len(imgs), "tile": tile,
        "mmPerPixel": float(dss[0].PixelSpacing[0]), "thickness": float(dss[0].SliceThickness), "files": files,
    })
    print(sid, len(imgs), "slices")

with open(os.path.join(OUT, "vhp-scans.js"), "w") as f:
    f.write("// Generated by tools/export_vhp_scans.py. Visible Human Project data,\n")
    f.write("// courtesy of the U.S. National Library of Medicine. Do not edit by hand.\n")
    f.write("window.ANATOMY = window.ANATOMY || {};\nwindow.ANATOMY.scans = ")
    json.dump(manifest, f)
    f.write(";\n")
