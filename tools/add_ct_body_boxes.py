"""Record the body's bounding box on every CT slice, for framing in the app.

    python tools/add_ct_body_boxes.py data/scans

Reads the soft-tissue sprite sheets written by tools/export_vhp_scans.py and
adds scans.ct.planes[<plane>].body = [[x0, y0, x1, y1], ...] (tile pixels,
one box per slice) to data/scans/vhp-scans.js. The app frames the real CT on
this box so the whole cross-section of the body is always in view. (Reading
pixels in the browser instead would fail when the app is opened from file://.)
"""

import json, os, sys
import numpy as np
from PIL import Image

DIR = sys.argv[1]
path = os.path.join(DIR, "vhp-scans.js")
text = open(path).read()
prefix, body = text.split("window.ANATOMY.scans = ", 1)
scans = json.loads(body.rsplit(";", 1)[0])
ct = scans["ct"]
T, G = ct["tile"], ct["grid"]

for name, plane in ct["planes"].items():
    boxes = []
    for k in range(len(plane["positions"])):
        sheet = np.asarray(Image.open(os.path.join(DIR, plane["files"]["soft"][k // (G * G)])).convert("L"))
        n = k % (G * G)
        tile = sheet[(n // G) * T:(n // G + 1) * T, (n % G) * T:(n % G + 1) * T]
        mask = tile > 25
        cols = np.nonzero(mask.sum(0) > 4)[0]
        rows = np.nonzero(mask.sum(1) > 4)[0]
        boxes.append([int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1] if len(cols) and len(rows) else None)
    plane["body"] = boxes
    widths = [b[2] - b[0] for b in boxes if b]
    print(name, len(boxes), "slices, body width (px) median", int(np.median(widths)))

with open(path, "w") as f:
    f.write(prefix + "window.ANATOMY.scans = ")
    json.dump(scans, f)
    f.write(";\n")
