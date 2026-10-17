"""Write Z-Anatomy head and neck bone surface points (world mm) for CT registration.

Run with Blender's Python module (pip install bpy):
    python tools/export_model_bones.py /path/to/Z-Anatomy/Startup.blend model_bone_mm.npy
"""

import sys

import bpy
import numpy as np

BLEND, OUT = sys.argv[-2:]
BONES = ["Mandible", "Hyoid bone", "Atlas (C1)", "Axis (C2)", "Vertebra C3", "Vertebra C4", "Vertebra C5",
         "Vertebra C6", "Vertebra C7", "Clavicle.l", "Clavicle.r", "Manubrium of sternum", "Temporal bone.l",
         "Temporal bone.r", "Occipital bone", "Frontal bone", "Parietal bone.l", "Parietal bone.r", "Maxilla.l",
         "Maxilla.r", "Zygomatic bone.l", "Zygomatic bone.r", "Sphenoid bone"]

bpy.ops.wm.open_mainfile(filepath=BLEND)
pts = []
for name in BONES:
    o = bpy.data.objects[name]
    mw = np.array(o.matrix_world)
    v = np.array([vv.co[:] for vv in o.data.vertices])
    pts.append((np.c_[v, np.ones(len(v))] @ mw.T)[:, :3])
np.save(OUT, np.vstack(pts) * 1000.0)
