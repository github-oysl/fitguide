# 动作视频资源处理：只改 assets 媒体与映射，不改应用代码。
# 用法：
#   python tools/process-exercise-media.py analyze
#   python tools/process-exercise-media.py contact
#   python tools/process-exercise-media.py apply
from __future__ import annotations

import hashlib
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
ASSETS_3D = ASSETS / "3d"
MS_VIDEOS = ROOT / "docs" / "muscleandstrength" / "media" / "videos"
SRC_3D = Path(r"D:\BaiduNetdiskDownload\61、3D动画健身教学零基础动作教学")
OUT_DIR = ROOT / "test-artifacts" / "media-process"
CUTS_PATH = OUT_DIR / "cuts.json"
ANALYZE_PATH = OUT_DIR / "analyze.json"
MAP_PATH = ROOT / "assets" / "media-map.json"
MANIFEST_PATH = ASSETS_3D / "manifest.json"

EXERCISES = [
    ("assisted-dip", "辅助双杠臂屈伸"),
    ("assisted-pull-up", "辅助引体向上"),
    ("barbell-bench-press", "杠铃卧推"),
    ("barbell-overhead-press", "杠铃站姿推举"),
    ("barbell-romanian-deadlift", "杠铃罗马尼亚硬拉"),
    ("barbell-row", "杠铃俯身划船"),
    ("barbell-squat", "杠铃深蹲"),
    ("cable-chest-fly", "站姿绳索夹胸"),
    ("cable-crunch", "跪姿绳索卷腹"),
    ("cable-curl-with-bar", "直杆绳索弯举"),
    ("cable-curl-with-rope", "绳索锤式弯举"),
    ("cable-hip-extension", "绳索髋伸展／后踢"),
    ("cable-incline-chest-fly", "上斜绳索夹胸"),
    ("cable-lateral-raise", "单臂绳索侧平举"),
    ("cable-pull-through", "绳索胯下拉"),
    ("cable-row-seated-narrow-grip", "窄握坐姿划船"),
    ("cable-single-arm-row", "站姿单臂绳索划船"),
    ("cable-standing-chest-press", "站姿绳索推胸"),
    ("calf-raise-in-leg-press", "腿举机提踵"),
    ("dead-bug", "死虫式"),
    ("decline-bench-crunch", "下斜凳卷腹"),
    ("dumbbell-bench-press", "哑铃卧推"),
    ("dumbbell-curl", "哑铃弯举"),
    ("dumbbell-hammer-curl", "哑铃锤式弯举"),
    ("dumbbell-lateral-raise", "哑铃侧平举"),
    ("dumbbell-one-arm-row", "单臂哑铃划船"),
    ("dumbbell-rdl", "哑铃罗马尼亚硬拉"),
    ("face-pull", "绳索面拉"),
    ("glute-bridge", "臀桥"),
    ("goblet-squat", "高脚杯深蹲"),
    ("hack-squat", "哈克深蹲"),
    ("hip-abduction-machine", "坐姿髋外展"),
    ("hip-adduction-machine", "坐姿髋内收"),
    ("lat-pulldown-with-pronated-grip", "正握高位下拉"),
    ("lateral-raise-machine", "固定器械侧平举"),
    ("leg-curl-seated", "坐姿腿弯举"),
    ("leg-extension-seated", "坐姿腿屈伸"),
    ("leg-press", "腿举机"),
    ("machine-chest-fly", "蝴蝶机夹胸"),
    ("machine-chest-press", "坐姿推胸机"),
    ("machine-glute-extension", "器械髋伸展／后蹬"),
    ("machine-reverse-fly", "器械反向飞鸟"),
    ("machine-shoulder-press", "坐姿推肩机"),
    ("overhead-tricep-extension-lower-position", "低位绳索过顶臂屈伸"),
    ("pallof-press", "Pallof 抗旋转推"),
    ("plank", "平板支撑"),
    ("plate-loaded-incline-chest-press", "挂片上斜推胸"),
    ("plate-loaded-lat-pulldown", "挂片杠杆高位下拉"),
    ("plate-loaded-lying-chest-press", "平卧挂片推胸"),
    ("plate-loaded-seated-row", "挂片分动坐姿划船"),
    ("prone-leg-curl", "俯卧腿弯举"),
    ("reverse-cable-fly", "绳索反向飞鸟"),
    ("reverse-hyper", "反向背伸展"),
    ("roman-chair-hip-extension", "罗马椅髋主导背伸展"),
    ("seated-dip-machine", "坐姿臂屈伸／下压"),
    ("seated-machine-row", "坐姿固定划船"),
    ("straight-arm-lat-pulldown", "直臂下压"),
    ("t-bar-row-unsupported", "俯身 T 杠划船（无胸托）"),
    ("triceps-pushdown-with-rope", "绳索下压"),
    ("weighted-back-extension", "负重背伸展"),
]

# 当前 3D 源文件（manifest）
CURRENT_3D_SOURCE = {
    "assisted-dip": "双杠臂屈伸.mp4",
    "assisted-pull-up": "引体向上.mp4",
    "barbell-bench-press": "杠铃卧推.mp4",
    "barbell-overhead-press": "杠铃推肩.mp4",
    "barbell-romanian-deadlift": "罗马尼亚硬拉.mp4",
    "barbell-row": "划船握姿合集.mp4",
    "barbell-squat": "杠铃深蹲.mp4",
    "cable-chest-fly": "绳索夹胸.mp4",
    "cable-crunch": "绳索卷腹.mp4",
    "cable-curl-with-bar": "绳索二头弯举.mp4",
    "cable-curl-with-rope": "绳索二头弯举.mp4",
    "cable-hip-extension": "T杆腿部训练.mp4",
    "cable-incline-chest-fly": "夹胸训练不同动作.mp4",
    "cable-lateral-raise": "肩部训练组合.mp4",
    "cable-row-seated-narrow-grip": "坐姿划船.mp4",
    "cable-single-arm-row": "龙门架划船.mp4",
    "cable-standing-chest-press": "绳索夹胸.mp4",
    "dead-bug": "腹肌版训练.mp4",
    "decline-bench-crunch": "仰卧卷腹.mp4",
    "dumbbell-bench-press": "哑铃推胸.mp4",
    "dumbbell-curl": "站姿二头弯举.mp4",
    "dumbbell-hammer-curl": "二头弯举.mp4",
    "dumbbell-lateral-raise": "三角肌训练组合.mp4",
    "dumbbell-one-arm-row": "哑铃俯身划船.mp4",
    "dumbbell-rdl": "罗马尼亚硬拉.mp4",
    "face-pull": "绳索面拉.mp4",
    "glute-bridge": "杠铃臀推.mp4",
    "goblet-squat": "哑铃深蹲.mp4",
    "hip-abduction-machine": "臀部合集.mp4",
    "lat-pulldown-with-pronated-grip": "高位下拉.mp4",
    "lateral-raise-machine": "三角肌训练组合.mp4",
    "leg-curl-seated": "股二头肌弯举.mp4",
    "leg-extension-seated": "坐姿腿屈伸.mp4",
    "leg-press": "腿举.mp4",
    "machine-chest-fly": "坐姿夹胸.mp4",
    "machine-chest-press": "胸部动作合集.mp4",
    "machine-glute-extension": "臀部合集.mp4",
    "machine-reverse-fly": "三角肌训练组合.mp4",
    "machine-shoulder-press": "史密斯推肩.mp4",
    "overhead-tricep-extension-lower-position": "绳索臂屈伸.mp4",
    "plank": "平板支撑.mp4",
    "plate-loaded-incline-chest-press": "史密斯训练合集.mp4",
    "plate-loaded-lat-pulldown": "高位下拉.mp4",
    "plate-loaded-lying-chest-press": "杠铃卧推.mp4",
    "plate-loaded-seated-row": "坐姿划船.mp4",
    "prone-leg-curl": "股二头肌弯举.mp4",
    "reverse-cable-fly": "哑铃飞鸟.mp4",
    "reverse-hyper": "山羊挺背.mp4",
    "roman-chair-hip-extension": "山羊挺背.mp4",
    "seated-dip-machine": "徒手臂屈伸.mp4",
    "seated-machine-row": "坐姿划船.mp4",
    "straight-arm-lat-pulldown": "背阔肌训练组合.mp4",
    "t-bar-row-unsupported": "T杆划船.mp4",
    "triceps-pushdown-with-rope": "绳索三头下压.mp4",
    "weighted-back-extension": "山羊挺背.mp4",
}

# 需要从 YouTube 换源的真人视频（当前整片动作不对或变体不对）
REAL_REPLACEMENTS = {
    "barbell-romanian-deadlift": {
        "youtube": "-m45n1_x32E",
        "title": "Romanian Deadlift (AKA RDL)",
        "reason": "原片是 sumo RDL / 与哑铃 RDL 共用",
    },
    "t-bar-row-unsupported": {
        "youtube": "gJSov9rHIf0",
        "title": "T-Bar Row",
        "reason": "原片是胸托划船机",
    },
    "cable-incline-chest-fly": {
        "youtube": "8YjdqeIXPUQ",
        "title": "Standing Low to High Cable Fly",
        "reason": "原片与站姿夹胸共用",
    },
    "machine-chest-press": {
        "youtube": "dMQdd40Y3FQ",
        "title": "Hammer Strength Bench Press",
        "reason": "原片与平卧挂片推胸共用；坐姿推胸机无独立片，先用挂片推胸近亲并在映射标明",
        "variant": True,
    },
}


def run(cmd, **kwargs):
    return subprocess.run(cmd, check=False, **kwargs)


def probe_duration(path: Path) -> float:
    r = run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True,
        text=True,
    )
    try:
        return float((r.stdout or "0").strip())
    except ValueError:
        return 0.0


def sha12(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()[:12]


def decode_thumbs(path: Path, fps: float = 4.0, width: int = 160, height: int = 90):
    dur = probe_duration(path)
    if dur <= 0:
        return dur, np.zeros((0, height, width, 3), dtype=np.uint8)
    n = max(1, int(dur * fps) + 1)
    r = run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-i",
            str(path),
            "-vf",
            f"fps={fps},scale={width}:{height}:force_original_aspect_ratio=decrease,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2",
            "-f",
            "rawvideo",
            "-pix_fmt",
            "rgb24",
            "pipe:1",
        ],
        capture_output=True,
    )
    raw = r.stdout or b""
    frame_size = width * height * 3
    usable = (len(raw) // frame_size) * frame_size
    frames = np.frombuffer(raw[:usable], dtype=np.uint8)
    if frames.size == 0:
        return dur, np.zeros((0, height, width, 3), dtype=np.uint8)
    frames = frames.reshape((-1, height, width, 3))
    return dur, frames


def is_title_card(frame: np.ndarray) -> bool:
    mean = frame.mean(axis=(0, 1))
    r, g, b = (float(x) for x in mean)
    std = float(frame.std())
    # M&S 蓝底标题卡
    if b > 70 and b > r * 1.25 and b > g * 1.15 and std < 55:
        return True
    # 近纯色
    if std < 18:
        return True
    return False


def motion_series(frames: np.ndarray) -> np.ndarray:
    if len(frames) < 2:
        return np.zeros(len(frames))
    diffs = np.abs(frames[1:].astype(np.int16) - frames[:-1].astype(np.int16)).mean(axis=(1, 2, 3))
    return np.concatenate([[0], diffs])


def pick_real_window(dur: float, frames: np.ndarray, fps: float) -> tuple[float, float, str]:
    if dur <= 0 or len(frames) == 0:
        return 0.0, dur, "empty"
    title_flags = [is_title_card(f) for f in frames]
    title_end_idx = 0
    while title_end_idx < len(title_flags) and title_flags[title_end_idx]:
        title_end_idx += 1
    # 标题卡后还可能有 0.5s 过渡
    start_idx = min(len(frames) - 1, title_end_idx + 1)
    motion = motion_series(frames)
    # 目标 8–10 秒；片太短就尽量去掉标题
    target = 9.0 if dur >= 16 else max(6.0, dur - start_idx / fps)
    target = min(target, 12.0, max(1.0, dur - start_idx / fps))
    win = max(1, int(target * fps))
    usable = motion[start_idx:]
    if len(usable) <= win:
        a = start_idx / fps
        b = dur
        if b - a < 4 and dur > 6:
            a = max(0, dur - 8)
        return round(a, 2), round(min(dur, b), 2), "remainder"
    scores = np.convolve(usable, np.ones(win) / win, mode="valid")
    best = int(np.argmax(scores))
    a = (start_idx + best) / fps
    b = min(dur, a + target)
    # 避开片尾 0.4s
    if dur - b < 0.4 and b - a > 6:
        b = max(a + 6, dur - 0.4)
    return round(a, 2), round(b, 2), "motion-window"


def pick_3d_window(dur: float, frames: np.ndarray, fps: float) -> tuple[float, float, str]:
    if dur <= 0 or len(frames) == 0:
        return 0.0, dur, "empty"
    motion = motion_series(frames)
    # 片头营销字通常 0–4s，片尾 1–2s
    head_skip = min(3.5, dur * 0.12)
    tail_skip = min(1.8, dur * 0.08)
    start_idx = int(head_skip * fps)
    end_idx = max(start_idx + 1, int((dur - tail_skip) * fps))
    usable = motion[start_idx:end_idx]
    target = 6.5 if dur >= 12 else max(4.0, dur - head_skip - tail_skip)
    target = min(8.0, target)
    win = max(1, int(target * fps))
    if len(usable) <= win:
        a = head_skip
        b = max(a + 4, dur - tail_skip)
        return round(a, 2), round(min(dur, b), 2), "remainder"
    scores = np.convolve(usable, np.ones(win) / win, mode="valid")
    best = int(np.argmax(scores))
    a = head_skip + best / fps
    b = min(dur - tail_skip, a + target)
    if b - a < 4:
        b = min(dur, a + 4)
    return round(a, 2), round(b, 2), "motion-window"


def analyze():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    report = {"real": {}, "d3": {}}
    for eid, name in EXERCISES:
        src = MS_VIDEOS / f"{eid}.mp4"
        if not src.exists():
            src = ASSETS / f"{eid}.mp4"
        dur, frames = decode_thumbs(src, fps=4)
        a, b, how = pick_real_window(dur, frames, 4)
        report["real"][eid] = {
            "name": name,
            "src": str(src.relative_to(ROOT)).replace("\\", "/"),
            "duration": round(dur, 2),
            "trim": [a, b],
            "keep": round(b - a, 2),
            "method": how,
            "hash": sha12(src) if src.exists() else None,
        }
        print(f"real {eid:40s} {dur:6.1f}s -> {a:5.1f}-{b:5.1f} ({b-a:4.1f}s) {how}")
    for eid, src_name in CURRENT_3D_SOURCE.items():
        src = SRC_3D / src_name
        if not src.exists():
            src = ASSETS_3D / f"{eid}.mp4"
        dur, frames = decode_thumbs(src, fps=4)
        a, b, how = pick_3d_window(dur, frames, 4)
        report["d3"][eid] = {
            "sourceFile": src_name,
            "src": str(src),
            "duration": round(dur, 2),
            "autoTrim": [a, b],
            "keep": round(b - a, 2),
            "method": how,
        }
        print(f"3d   {eid:40s} {dur:6.1f}s auto {a:5.1f}-{b:5.1f} <- {src_name}")
    ANALYZE_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("WROTE", ANALYZE_PATH)


def contact_sheet(path: Path, dest: Path, every: float = 2.0):
    dur = probe_duration(path)
    times = [round(t, 1) for t in np.arange(0, max(0.1, dur - 0.2), every)]
    if not times:
        return
    thumbs = []
    tmp = dest.parent / "_tmp.jpg"
    for t in times:
        run(
            ["ffmpeg", "-y", "-ss", str(t), "-i", str(path), "-frames:v", "1", "-q:v", "6", str(tmp)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        if tmp.exists():
            im = Image.open(tmp).convert("RGB")
            im.thumbnail((240, 426))
            canvas = Image.new("RGB", (240, 460), (20, 20, 20))
            canvas.paste(im, ((240 - im.width) // 2, 24))
            draw = ImageDraw.Draw(canvas)
            draw.text((8, 4), f"{t:.1f}s", fill=(255, 220, 80))
            thumbs.append(canvas)
    if not thumbs:
        return
    cols = min(8, len(thumbs))
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 240, rows * 460), (10, 10, 10))
    for i, im in enumerate(thumbs):
        sheet.paste(im, ((i % cols) * 240, (i // cols) * 460))
    dest.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(dest, quality=80)
    print("sheet", dest.name, f"{dur:.1f}s", len(thumbs), "frames")


def contact():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    sheets = OUT_DIR / "sheets"
    sheets.mkdir(exist_ok=True)
    names = sorted({*CURRENT_3D_SOURCE.values(), "背部训练合集.mp4", "髋关节灵活性.mp4"})
    for name in names:
        src = SRC_3D / name
        if src.exists():
            contact_sheet(src, sheets / (name.replace(".mp4", ".jpg")))


def ffmpeg_cut(src: Path, dest: Path, start: float, end: float):
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(".tmp.mp4")
    length = max(0.5, end - start)
    r = run(
        [
            "ffmpeg",
            "-y",
            "-ss",
            f"{start:.3f}",
            "-i",
            str(src),
            "-t",
            f"{length:.3f}",
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "fast",
            "-crf",
            "23",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(tmp),
        ],
        capture_output=True,
        text=True,
    )
    if r.returncode != 0 or not tmp.exists() or tmp.stat().st_size < 1000:
        print("CUT FAIL", src.name, r.stderr[-400:] if r.stderr else "")
        if tmp.exists():
            tmp.unlink()
        return False
    try:
        tmp.replace(dest)
    except PermissionError:
        import shutil
        import time

        for _ in range(5):
            try:
                shutil.copyfile(tmp, dest)
                tmp.unlink(missing_ok=True)
                break
            except PermissionError:
                time.sleep(0.4)
        else:
            print("CUT LOCKED", dest)
            return False
    return True


def extract_cover(video: Path, cover: Path, at: float | None = None):
    dur = probe_duration(video)
    ss = 0.4 if at is None else min(max(0.1, at), max(0.1, dur - 0.1))
    if at is None:
        ss = min(max(0.3, dur * 0.35), max(0.3, dur - 0.2))
    run(
        ["ffmpeg", "-y", "-ss", f"{ss:.2f}", "-i", str(video), "-frames:v", "1", "-q:v", "3", str(cover)],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def apply(only: str | None = None):
    cuts = json.loads(CUTS_PATH.read_text(encoding="utf-8"))
    n_real = n_3d = 0
    if only in (None, "real"):
        for eid, spec in cuts.get("real", {}).items():
            if spec.get("skip"):
                continue
            src = ROOT / spec["src"] if not Path(spec["src"]).is_absolute() else Path(spec["src"])
            if not src.exists():
                print("missing real src", eid, src)
                continue
            dest = ASSETS / f"{eid}.mp4"
            ok = ffmpeg_cut(src, dest, spec["trim"][0], spec["trim"][1])
            if ok:
                extract_cover(dest, ASSETS / f"{eid}.jpg")
                n_real += 1
                print("real cut", eid, spec["trim"])
    if only in (None, "3d"):
      for eid, spec in cuts.get("d3", {}).items():
        if spec.get("skip") or spec.get("status") == "unbound":
            continue
        src = Path(spec["src"])
        if not src.exists():
            alt = SRC_3D / spec.get("sourceFile", "")
            src = alt if alt.exists() else ASSETS_3D / f"{eid}.mp4"
        dest = ASSETS_3D / f"{eid}.mp4"
        ok = ffmpeg_cut(src, dest, spec["trim"][0], spec["trim"][1])
        if ok:
            extract_cover(dest, ASSETS_3D / f"{eid}.jpg")
            n_3d += 1
            print("3d cut", eid, spec["trim"])
    print(f"applied real={n_real} 3d={n_3d}")
    write_map(cuts)


def write_map(cuts: dict):
    names = {eid: name for eid, name in EXERCISES}
    exercises = {}
    for eid, name in EXERCISES:
        real_spec = cuts.get("real", {}).get(eid, {})
        d3_spec = cuts.get("d3", {}).get(eid, {})
        real_path = ASSETS / f"{eid}.mp4"
        d3_path = ASSETS_3D / f"{eid}.mp4"
        real_status = real_spec.get("status", "kept")
        if real_path.exists() and not real_spec.get("skip"):
            real_entry = {
                "path": f"assets/{eid}.mp4",
                "cover": f"assets/{eid}.jpg",
                "status": real_status,
                "duration": round(probe_duration(real_path), 2),
                "trim": real_spec.get("trim"),
                "source": real_spec.get("src"),
            }
            if real_spec.get("reason"):
                real_entry["note"] = real_spec["reason"]
            if real_spec.get("youtube"):
                real_entry["youtube"] = real_spec["youtube"]
        else:
            real_entry = {
                "path": f"assets/{eid}.mp4",
                "cover": f"assets/{eid}.jpg",
                "status": real_spec.get("status", "needs_source"),
                "duration": round(probe_duration(real_path), 2) if real_path.exists() else None,
                "note": real_spec.get("reason", "未裁切"),
            }
        if d3_spec.get("status") in {"ok", "variant"} and d3_path.exists() and not d3_spec.get("skip"):
            d3_entry = {
                "path": f"assets/3d/{eid}.mp4",
                "cover": f"assets/3d/{eid}.jpg",
                "status": d3_spec.get("status"),
                "duration": round(probe_duration(d3_path), 2),
                "sourceFile": d3_spec.get("sourceFile"),
                "trim": d3_spec.get("trim"),
            }
            if d3_spec.get("note"):
                d3_entry["note"] = d3_spec["note"]
        else:
            d3_entry = {
                "status": "unbound",
                "reason": d3_spec.get("reason") or d3_spec.get("note") or "无对应 3D 正确段",
            }
        exercises[eid] = {"id": eid, "name": name, "real": real_entry, "d3": d3_entry}

    payload = {
        "version": 1,
        "updatedAt": "2026-09-18",
        "target": {
            "realLoop": "6–12 秒无声循环，去掉标题卡与口播",
            "d3Loop": "4–8 秒正确 3D 循环；合集中切不出则 unbound",
        },
        "counts": {
            "exercises": len(exercises),
            "realTrimmed": sum(1 for e in exercises.values() if e["real"].get("status") in {"trimmed", "replaced"}),
            "d3Bound": sum(1 for e in exercises.values() if e["d3"].get("status") in {"ok", "variant"}),
            "d3Unbound": sum(1 for e in exercises.values() if e["d3"].get("status") == "unbound"),
            "realNeedsSource": sum(1 for e in exercises.values() if e["real"].get("status") == "needs_source"),
        },
        "exercises": exercises,
    }
    MAP_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("WROTE", MAP_PATH)

    manifest = {}
    for eid, item in exercises.items():
        if eid not in CURRENT_3D_SOURCE:
            continue
        d3 = item["d3"]
        entry = {
            "gymId": eid,
            "source": d3.get("sourceFile") or CURRENT_3D_SOURCE.get(eid),
            "status": d3.get("status", "unbound"),
        }
        video = ASSETS_3D / f"{eid}.mp4"
        cover = ASSETS_3D / f"{eid}.jpg"
        if video.exists():
            entry["video"] = f"assets/3d/{eid}.mp4"
        if cover.exists():
            entry["cover"] = f"assets/3d/{eid}.jpg"
        if d3.get("trim"):
            entry["trim"] = d3["trim"]
        if d3.get("reason"):
            entry["reason"] = d3["reason"]
        if d3.get("note"):
            entry["note"] = d3["note"]
        manifest[eid] = entry
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("WROTE", MANIFEST_PATH, "entries", len(manifest))


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "analyze"
    if cmd == "analyze":
        analyze()
    elif cmd == "contact":
        contact()
    elif cmd == "apply":
        apply()
    elif cmd == "apply-real":
        apply(only="real")
    elif cmd == "apply-3d":
        apply(only="3d")
    elif cmd == "map":
        cuts = json.loads(CUTS_PATH.read_text(encoding="utf-8"))
        write_map(cuts)
    else:
        raise SystemExit(f"unknown command {cmd}")
