# Assembles a narrated surgical film from the rendered 3D frames.
#   python3 tools/film/compose.py <film dir> <work dir> [segment ids...]
# Puts each frame on a dark backdrop, smooths the motion from the render
# rate to 24 fps (ffmpeg minterpolate), draws labels, step headings and
# subtitles crisply on top, cross-fades between steps, adds the title and
# closing cards and the narration, and writes <work dir>/film.mp4.
import json, os, re, subprocess, sys, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FILM, WORK = sys.argv[1], sys.argv[2]
S = WORK
W, H, FPS = 1280, 720, 24
cfg = json.load(open(f'{FILM}/shots.json'))
segs = json.load(open(f'{WORK}/segments.json'))
SRC_FPS, LEAD, TAIL = cfg['fps'], cfg['lead'], cfg['tail']
FONT = '/usr/share/fonts/opentype/inter/Inter-%s.otf'
f_label = ImageFont.truetype(FONT % 'Medium', 19)
f_sub = ImageFont.truetype(FONT % 'Medium', 27)
f_step = ImageFont.truetype(FONT % 'SemiBold', 15)
f_title = ImageFont.truetype(FONT % 'Bold', 34)
f_big = ImageFont.truetype(FONT % 'Bold', 64)
f_mid = ImageFont.truetype(FONT % 'Medium', 28)
f_small = ImageFont.truetype(FONT % 'Regular', 18)
ORANGE, WHITE, MUTED = (255, 138, 61), (245, 245, 245), (190, 198, 210)

def backdrop():
    y, x = np.mgrid[0:H, 0:W]
    r = np.sqrt(((x - W * 0.5) / W) ** 2 + ((y - H * 0.45) / H) ** 2)
    k = np.clip(r / 0.75, 0, 1)[..., None]
    c0, c1 = np.array([38, 46, 58]), np.array([10, 13, 18])
    return Image.fromarray((c0 * (1 - k) + c1 * k).astype(np.uint8), 'RGB')
BG = backdrop()

def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)

def sentences(text, start, dur):
    """Sentences of the narration with start and end times, by length."""
    parts = [p.strip() for p in re.split(r'(?<=[.!?])\s+', text) if p.strip()]
    total = sum(len(p) for p in parts)
    out, t = [], start
    for p in parts:
        d = dur * len(p) / total
        out.append((t, t + d, p))
        t += d
    return out

def wrap(d, text, font, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        trial = (cur + ' ' + w).strip()
        if d.textlength(trial, font=font) <= width: cur = trial
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def label_text(L):
    return L['name'] + ('  — at risk' if L['danger'] else '')

def place_labels(labels):
    """Put each label beside its point, on whichever side it fits, and move
    it down until its box clears the boxes already placed."""
    meas = ImageDraw.Draw(Image.new('RGB', (1, 1)))
    placed = []
    for L in sorted(labels, key=lambda l: l['y']):
        bw = meas.textlength(label_text(L), font=f_label) + 24
        right = L['x'] + 46 + bw < W - 16 or L['x'] - 46 - bw < 16
        bx = L['x'] + 46 if right else L['x'] - 46 - bw
        bx = min(max(16, bx), W - 16 - bw)
        ty = min(H - 180, max(110, L['y']))
        moved = True
        while moved:
            moved = False
            for P in placed:
                if bx < P['bx'] + P['bw'] + 8 and P['bx'] < bx + bw + 8 and abs(P['ty'] - ty) < 33.5:
                    ty = P['ty'] + 34
                    moved = True
        placed.append(dict(L, ty=ty, right=right, bx=bx, bw=bw))
    return placed

def draw_labels(im, labels, alpha):
    if alpha <= 0 or not labels: return
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    a = int(255 * alpha)
    for L in place_labels(labels):
        col = ORANGE if L['danger'] else WHITE
        name = label_text(L)
        tw = L['bw'] - 24
        bx = L['bx']
        by = L['ty'] - 15
        d.line([(L['x'], L['y']), (bx if L['right'] else bx + tw + 24, by + 15)], fill=col + (a,), width=2)
        d.ellipse((L['x'] - 5, L['y'] - 5, L['x'] + 5, L['y'] + 5), fill=col + (a,), outline=(0, 0, 0, a // 2))
        d.rounded_rectangle((bx, by, bx + tw + 24, by + 30), radius=15, fill=(14, 18, 24, int(a * 0.82)), outline=col + (int(a * 0.9),), width=2 if L['danger'] else 1)
        d.text((bx + 12, by + 4), name, font=f_label, fill=col + (a,))
    im.alpha_composite(layer)

def draw_chrome(im, seg, t, D):
    """Step heading (top left), subtitles (bottom), credit (bottom right)."""
    d = ImageDraw.Draw(im)
    a_in = ease((t - 0.2) / 0.6) * ease((D - t) / 0.4)
    if seg['step'] is not None and a_in > 0:
        a = int(255 * a_in)
        d.text((44, 34), f"STEP {seg['step'] + 1} OF {cfg['steps']}", font=f_step, fill=ORANGE + (a,))
        d.text((44, 54), seg['title'], font=f_title, fill=WHITE + (a,))
    for (s0, s1, text) in seg['subs']:
        if s0 - 0.1 <= t < s1 + 0.25:
            a = ease((t - s0 + 0.1) / 0.25) * ease((s1 + 0.25 - t) / 0.25)
            lines = wrap(d, text, f_sub, W - 260)[:3]
            lh = 36
            top = H - 40 - lh * len(lines)
            pad = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            pd = ImageDraw.Draw(pad)
            for i, line in enumerate(lines):
                tw = pd.textlength(line, font=f_sub)
                x = (W - tw) / 2
                pd.rounded_rectangle((x - 14, top + i * lh - 3, x + tw + 14, top + i * lh + lh - 3), radius=8, fill=(0, 0, 0, int(150 * a)))
                pd.text((x, top + i * lh), line, font=f_sub, fill=(255, 255, 255, int(255 * a)))
            im.alpha_composite(pad)
    d.text((W - 300, H - 28), 'Head & Neck Surgical Anatomy', font=f_small, fill=MUTED + (140,))

def title_card(im, t):
    a = ease((t - 0.3) / 1.0) * ease((7.5 - t) / 1.0)
    if a <= 0: return
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, 0, W, H), fill=(8, 10, 14, int(110 * a)))
    lines = wrap(d, cfg['title'], f_big, W - 200)
    for i, line in enumerate(lines):
        d.text((80, 250 - 76 * (len(lines) - 1) + 76 * i), line, font=f_big, fill=WHITE + (int(255 * a),))
    d.text((84, 335), cfg['subtitle'], font=f_mid, fill=ORANGE + (int(255 * a),))
    d.text((84, 380), 'Head & Neck Surgical Anatomy', font=f_small, fill=MUTED + (int(230 * a),))
    im.alpha_composite(layer)

def outro_card(im, t, D, names):
    a = ease((t - 0.2) / 0.8)
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, 0, W, H), fill=(8, 10, 14, int(170 * a)))
    d.text((80, 120), 'Structures at risk', font=f_big, fill=WHITE + (int(255 * a),))
    for i, n in enumerate(names):
        ai = ease((t - 1.0 - i * 1.1) / 0.5) * a
        d.ellipse((86, 238 + i * 54, 100, 252 + i * 54), fill=ORANGE + (int(255 * ai),))
        d.text((118, 228 + i * 54), n, font=f_mid, fill=WHITE + (int(255 * ai),))
    d.text((84, H - 110), 'For education only. Check every surgical detail against current atlases and senior guidance.',
           font=f_small, fill=MUTED + (int(230 * ease((t - 8) / 1.0)),))
    im.alpha_composite(layer)

def base_frames(seg):
    """3D frames on the backdrop, motion-interpolated from SRC_FPS to FPS."""
    src = f'{S}/frames/{seg["id"]}'
    tmp = f'{S}/tmp/{seg["id"]}'
    os.makedirs(tmp, exist_ok=True)
    files = sorted(f for f in os.listdir(src) if f.endswith('.png'))
    for f in files:
        out = f'{tmp}/{f}'
        if os.path.exists(out): continue
        fr = Image.open(f'{src}/{f}').convert('RGBA')
        im = BG.copy(); im.paste(fr, (0, 0), fr); im.save(out)
    n = int(round(seg['D'] * FPS))
    proc = subprocess.Popen(['ffmpeg', '-v', 'error', '-framerate', str(SRC_FPS), '-i', f'{tmp}/%05d.png',
                             '-vf', f'minterpolate=fps={FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,format=rgb24',
                             '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
    last = None
    for i in range(n):
        buf = proc.stdout.read(W * H * 3)
        if len(buf) == W * H * 3: last = Image.frombuffer('RGB', (W, H), buf)
        yield last
    proc.stdout.close(); proc.wait()

def labels_at(meta, t):
    """Label positions at time t, interpolated between the source frames."""
    if not meta: return []
    x = t * SRC_FPS
    i = int(min(len(meta) - 1, max(0, math.floor(x)))); j = min(len(meta) - 1, i + 1); k = x - i
    a, b = {L['id']: L for L in meta[i]}, {L['id']: L for L in meta[j]}
    out = []
    for id_, L in a.items():
        if id_ in b: out.append(dict(L, x=L['x'] + (b[id_]['x'] - L['x']) * k, y=L['y'] + (b[id_]['y'] - L['y']) * k))
    return out

def main(only):
    ids = only or [s['id'] for s in segs]
    os.makedirs(f'{S}/tmp', exist_ok=True)
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                            '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', f'{S}/video.mp4'], stdin=subprocess.PIPE)
    audio = []
    prev = None
    risk = cfg['risk']
    for seg in segs:
        if seg['id'] not in ids: continue
        seg['D'] = seg['dur'] + LEAD + TAIL
        seg['subs'] = sentences(seg['text'], LEAD, seg['dur'])
        n = int(round(seg['D'] * FPS))
        meta = json.load(open(f'{S}/frames/{seg["id"]}/labels.json')) if seg['id'] in cfg['shots'] else []
        frames = base_frames(seg) if seg['id'] in cfg['shots'] else None
        still = None
        if frames is None:  # the closing card sits on the last picture, softened
            still = (prev or BG).filter(ImageFilter.GaussianBlur(6))
        for i in range(n):
            t = i / FPS
            base = next(frames) if frames else still
            im = base.convert('RGBA')
            if prev is not None and i < 12:  # cross-fade from the previous segment
                im = Image.blend(prev.convert('RGBA'), im, ease(i / 12))
            if seg['id'] == 'intro': title_card(im, t)
            if seg['id'] == 'outro': outro_card(im, t, seg['D'], risk)
            else: draw_labels(im, labels_at(meta, t), ease((t - 2.4) / 0.6) * ease((seg['D'] - t) / 0.5) if seg['id'] != 'intro' else ease((t - 8.0) / 0.8) * ease((seg['D'] - t) / 0.5))
            draw_chrome(im, seg, t, seg['D'])
            enc.stdin.write(im.convert('RGB').tobytes())
            last = base
        prev = last
        audio.append((seg['id'], seg['D']))
        print('composed', seg['id'], n, flush=True)
    enc.stdin.close(); enc.wait()
    # Narration: each segment's speech after a short lead, padded to the segment length.
    parts = []
    for id_, D in audio:
        out = f'{S}/tmp/a_{id_}.wav'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{S}/audio/{id_}.wav', '-af', f'adelay={int(LEAD * 1000)}:all=1,apad', '-t', f'{D:.3f}', '-ar', '48000', '-ac', '1', out], check=True)
        parts.append(out)
    with open(f'{S}/tmp/alist.txt', 'w') as fh:
        fh.writelines(f"file '{p}'\n" for p in parts)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'{S}/tmp/alist.txt', '-c:a', 'pcm_s16le', f'{S}/tmp/narration.wav'], check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{S}/video.mp4', '-i', f'{S}/tmp/narration.wav', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k',
                    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-shortest', '-movflags', '+faststart', f'{S}/film.mp4'], check=True)
    print('film.mp4 written')

if __name__ == '__main__':
    main(sys.argv[3:])
