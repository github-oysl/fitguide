# 根据分析结果 + 合集时间轴，生成裁切表。
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ANALYZE = ROOT / "test-artifacts" / "media-process" / "analyze.json"
CUTS = ROOT / "test-artifacts" / "media-process" / "cuts.json"
SRC_3D = Path(r"D:\BaiduNetdiskDownload\61、3D动画健身教学零基础动作教学")
MS = ROOT / "docs" / "muscleandstrength" / "media" / "videos"
DL = ROOT / "test-artifacts" / "media-process" / "dl"

# 真人整片动作不对，不能用原片裁切冒充完成
WRONG_REAL = {
    "cable-single-arm-row": "原片是单臂侧平举",
    "cable-hip-extension": "原片是跪姿绳索三头臂屈伸",
    "t-bar-row-unsupported": "原片是胸托划船机",
    "cable-incline-chest-fly": "原片与站姿夹胸相同",
    "dumbbell-rdl": "原片与杠铃 RDL 相同",
    "machine-chest-press": "原片是平卧挂片推胸",
    "cable-pull-through": "匹配记录指向后束飞鸟，整片不可当作胯下拉",
    "plate-loaded-seated-row": "原片与窄握绳索划船相同",
}

# 下载替换后的真人源（文件名=youtube id）
REAL_DL = {
    "barbell-romanian-deadlift": "-m45n1_x32E",
    "t-bar-row-unsupported": "gJSov9rHIf0",
    "cable-incline-chest-fly": "8YjdqeIXPUQ",
}

# 3D：只切能对上的段。切不出则 unbound。
D3_CUTS = {
    "assisted-dip": ("双杠臂屈伸.mp4", 8.0, 16.0, "variant", "徒手双杠，非辅助机"),
    "assisted-pull-up": ("引体向上.mp4", 8.0, 16.0, "variant", "无辅助引体，非辅助机"),
    "barbell-bench-press": ("杠铃卧推.mp4", 8.0, 16.0, "ok", ""),
    "barbell-overhead-press": ("杠铃推肩.mp4", 8.0, 16.0, "ok", ""),
    "barbell-row": ("背部训练合集.mp4", 28.0, 36.0, "ok", "合集第二项杠铃俯身划船"),
    "barbell-squat": ("杠铃深蹲.mp4", 19.0, 26.5, "ok", ""),
    "cable-chest-fly": ("绳索夹胸.mp4", 20.0, 27.0, "ok", "4x12 循环段"),
    "cable-crunch": ("绳索卷腹.mp4", 12.0, 20.0, "ok", ""),
    "cable-curl-with-bar": ("绳索二头弯举.mp4", 6.0, 14.0, "ok", "直杆段"),
    "cable-curl-with-rope": ("绳索二头弯举.mp4", 24.0, 32.0, "ok", "绳附件段"),
    "cable-incline-chest-fly": ("夹胸训练不同动作.mp4", 30.0, 36.5, "ok", "上胸/低到高夹胸"),
    "cable-lateral-raise": ("三角肌训练组合.mp4", 36.0, 46.0, "ok", "单臂绳索侧平举"),
    "cable-row-seated-narrow-grip": ("坐姿划船.mp4", 10.0, 20.0, "ok", "窄握/对握坐姿划船"),
    "cable-single-arm-row": ("划船握姿合集.mp4", 6.0, 12.0, "variant", "坐姿单手划船，非站姿"),
    "decline-bench-crunch": ("腹肌版训练.mp4", 18.0, 25.0, "ok", "下斜仰卧起坐"),
    "dumbbell-bench-press": ("哑铃推胸.mp4", 12.0, 19.0, "ok", ""),
    "dumbbell-curl": ("站姿二头弯举.mp4", 10.0, 18.0, "ok", ""),
    "dumbbell-lateral-raise": ("三角肌训练组合.mp4", 22.0, 34.0, "ok", "哑铃侧平举正确循环"),
    "dumbbell-one-arm-row": ("哑铃俯身划船.mp4", 11.0, 18.0, "ok", ""),
    "dumbbell-rdl": ("罗马尼亚硬拉.mp4", 28.0, 40.0, "ok", "该源其实是哑铃 RDL"),
    "face-pull": ("绳索面拉.mp4", 8.0, 16.0, "ok", ""),
    "glute-bridge": ("杠铃臀推.mp4", 12.0, 20.0, "variant", "杠铃臀推靠凳，非地板臀桥"),
    "goblet-squat": ("哑铃深蹲.mp4", 6.5, 14.0, "ok", ""),
    "hip-abduction-machine": ("臀部合集.mp4", 44.0, 51.5, "ok", "坐姿髋外展机收尾段"),
    "lat-pulldown-with-pronated-grip": ("高位下拉.mp4", 10.0, 24.0, "ok", "正确下拉循环"),
    "leg-extension-seated": ("坐姿腿屈伸.mp4", 21.0, 28.5, "ok", ""),
    "leg-press": ("腿举.mp4", 18.5, 25.5, "ok", ""),
    "machine-chest-fly": ("坐姿夹胸.mp4", 17.0, 24.5, "ok", ""),
    "machine-reverse-fly": ("三角肌训练组合.mp4", 4.0, 13.0, "ok", "蝴蝶机反向飞鸟"),
    "machine-shoulder-press": ("三角肌训练组合.mp4", 14.0, 21.5, "ok", "坐姿器械推肩，优于史密斯源"),
    "overhead-tricep-extension-lower-position": ("绳索臂屈伸.mp4", 8.0, 16.0, "ok", ""),
    "plank": ("平板支撑.mp4", 14.0, 22.0, "ok", ""),
    "prone-leg-curl": ("股二头肌弯举.mp4", 20.0, 30.5, "ok", "整段是俯卧弯举"),
    "roman-chair-hip-extension": ("山羊挺背.mp4", 12.0, 18.0, "ok", "罗马椅正确髋伸"),
    "straight-arm-lat-pulldown": ("背阔肌训练组合.mp4", 40.0, 48.5, "ok", "直臂下压"),
    "t-bar-row-unsupported": ("T杆划船.mp4", 26.0, 33.0, "ok", "无胸托正确循环"),
    "triceps-pushdown-with-rope": ("绳索三头下压.mp4", 8.0, 16.0, "ok", ""),
    "weighted-back-extension": ("山羊挺背.mp4", 22.0, 27.5, "variant", "罗马椅无配重画面"),
}

D3_UNBOUND = {
    "barbell-romanian-deadlift": "罗马尼亚硬拉.mp4 实际是哑铃 RDL",
    "cable-hip-extension": "T杆腿部训练.mp4 是 T 杆深蹲",
    "cable-standing-chest-press": "绳索夹胸.mp4 不是推胸",
    "dead-bug": "腹肌版训练.mp4 是下斜仰卧起坐",
    "dumbbell-hammer-curl": "二头弯举.mp4 是牧师凳弯举",
    "lateral-raise-machine": "合集中无固定侧平举机",
    "leg-curl-seated": "股二头肌弯举.mp4 是俯卧",
    "machine-chest-press": "胸部动作合集无坐姿推胸机",
    "machine-glute-extension": "臀部合集无后蹬机",
    "plate-loaded-incline-chest-press": "史密斯训练合集不是挂片上斜推",
    "plate-loaded-lat-pulldown": "高位下拉.mp4 是绳索下拉",
    "plate-loaded-lying-chest-press": "杠铃卧推.mp4 不是挂片机",
    "plate-loaded-seated-row": "坐姿划船.mp4 是绳索划船",
    "reverse-cable-fly": "哑铃飞鸟.mp4 不是绳索",
    "reverse-hyper": "山羊挺背不是反向背伸机",
    "seated-dip-machine": "徒手臂屈伸是凳上臂屈伸",
    "seated-machine-row": "坐姿划船.mp4 是绳索不是固定胸托机",
    "cable-pull-through": "无对应 3D 源",
    "calf-raise-in-leg-press": "无对应 3D 源",
    "hack-squat": "无对应 3D 源",
    "hip-adduction-machine": "无对应 3D 源",
    "pallof-press": "无对应 3D 源",
}


def later_window(dur: float) -> list[float]:
    if dur <= 0:
        return [0, 0]
    # M&S 讲解片：片头标题约 5s，片尾常有走位/淡出 3–4s。取中后段循环。
    title_skip = 6.0 if dur > 18 else 2.0
    fade_skip = 4.2 if dur > 22 else 1.6
    keep = 9.0
    end = max(title_skip + 6.0, dur - fade_skip)
    start = max(title_skip, end - keep)
    if end - start < 6 and dur > 8:
        start = max(title_skip, dur * 0.45)
        end = min(dur - fade_skip, start + keep)
    return [round(start, 2), round(min(end, dur - 0.2), 2)]


def find_dl(youtube_id: str) -> Path | None:
    if not DL.exists():
        return None
    for p in DL.iterdir():
        if p.suffix.lower() not in {".mp4", ".mkv", ".webm"}:
            continue
        if p.stem == youtube_id or p.stem.replace("_", "-") == youtube_id:
            return p
    # youtube id 以 - 开头时文件名也带 -
    dashed = DL / f"{youtube_id}.mp4"
    return dashed if dashed.exists() else None


def main():
    analyze = json.loads(ANALYZE.read_text(encoding="utf-8"))
    cuts = {"real": {}, "d3": {}}
    for eid, rec in analyze["real"].items():
        src = rec["src"]
        dur = rec["duration"]
        if eid in REAL_DL:
            dl = find_dl(REAL_DL[eid])
            if dl:
                import subprocess

                r = subprocess.run(
                    ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(dl)],
                    capture_output=True,
                    text=True,
                )
                dl_dur = float((r.stdout or "40").strip() or 40)
                cuts["real"][eid] = {
                    "src": str(dl).replace("\\", "/"),
                    "trim": later_window(dl_dur),
                    "status": "replaced",
                    "reason": WRONG_REAL.get(eid, "换源"),
                    "youtube": REAL_DL[eid],
                    "sourceDuration": round(dl_dur, 2),
                }
                continue
        if eid in WRONG_REAL:
            cuts["real"][eid] = {
                "src": src,
                "skip": True,
                "status": "needs_source",
                "reason": WRONG_REAL[eid],
            }
            continue
        cuts["real"][eid] = {
            "src": src,
            "trim": later_window(dur),
            "status": "trimmed",
            "sourceDuration": dur,
        }
    for eid, spec in D3_CUTS.items():
        src_name, a, b, status, note = spec
        cuts["d3"][eid] = {
            "src": str(SRC_3D / src_name),
            "sourceFile": src_name,
            "trim": [a, b],
            "status": status,
            "note": note,
        }
    for eid, reason in D3_UNBOUND.items():
        cuts["d3"][eid] = {
            "skip": True,
            "status": "unbound",
            "reason": reason,
        }
    CUTS.write_text(json.dumps(cuts, ensure_ascii=False, indent=2), encoding="utf-8")
    n_real = sum(1 for v in cuts["real"].values() if not v.get("skip"))
    n_3d = sum(1 for v in cuts["d3"].values() if not v.get("skip"))
    print(f"cuts real={n_real} 3d={n_3d} unbound3d={len(D3_UNBOUND)} needs_real={len(WRONG_REAL)}")
    print("WROTE", CUTS)


if __name__ == "__main__":
    main()
