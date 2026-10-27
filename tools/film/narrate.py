# Narration for a surgical film: speaks each segment of <film dir>/script.json
# with the Kokoro-82M voice (Apache-2.0) and writes <work dir>/audio/<id>.wav
# and <work dir>/segments.json (the script with each segment's duration).
#   python3 tools/film/narrate.py <film dir> <work dir>
# Needs: pip install kokoro-onnx soundfile; KOKORO_DIR holding kokoro-q8.onnx
# (the joined parts of npm "kokoro-q8-shards") and voices.npz (the voices of
# npm "kokoro-local-runtime", one array per voice).
import json, os, sys, soundfile as sf
from kokoro_onnx import Kokoro

FILM, WORK = sys.argv[1], sys.argv[2]
K = os.environ['KOKORO_DIR']
cfg = json.load(open(f'{FILM}/shots.json'))
k = Kokoro(f'{K}/kokoro-q8.onnx', f'{K}/voices.npz')
os.makedirs(f'{WORK}/audio', exist_ok=True)
segs = json.load(open(f'{FILM}/script.json'))
for s in segs:
    samples, sr = k.create(s['text'], voice=cfg.get('voice', 'af_heart'), speed=cfg.get('speed', 0.92), lang=cfg.get('lang', 'en-us'))
    sf.write(f'{WORK}/audio/{s["id"]}.wav', samples, sr)
    s['dur'] = round(len(samples) / sr, 2)
    print(s['id'], s['dur'], flush=True)
json.dump(segs, open(f'{WORK}/segments.json', 'w'), indent=1)
