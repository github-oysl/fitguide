import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
data = json.loads((root / "assets" / "media-map.json").read_text(encoding="utf-8"))
lines = []
c = data["counts"]
lines += [
    "# 动作视频映射说明",
    "",
    "机器可读源：[`assets/media-map.json`](../assets/media-map.json)。重构时只读该文件，不要再扫目录猜 3D 是否可用。",
    "",
    f"更新日期：{data['updatedAt']}",
    "",
    "## 怎么用",
    "",
    "```text",
    "exercises[id].real.status",
    "  trimmed | replaced  → 用 real.path / real.cover（约 9 秒循环）",
    "  needs_source        → 真人整片仍是错动作，不要当标准示范",
    "",
    "exercises[id].d3.status",
    "  ok | variant        → 用 d3.path / d3.cover，可开 3D 开关",
    "  unbound             → 不要挂 3D（合集里切不出对应动作）",
    "```",
    "",
    "variant 表示器械或体位是近亲（例如辅助引体用了无辅助引体），可以播，但文案要标明差异。",
    "",
    "## 数量",
    "",
    f"- 动作 {c['exercises']} 个",
    f"- 真人已裁切/换源 {c['realTrimmed']} 个",
    f"- 真人仍缺正确源 {c['realNeedsSource']} 个",
    f"- 3D 已绑定 {c['d3Bound']} 个",
    f"- 3D 未绑定 {c['d3Unbound']} 个",
    "",
    "## 状态一览",
    "",
    "| ID | 名称 | 真人 | 秒 | 3D | 秒 | 说明 |",
    "|---|---|---|---:|---|---:|---|",
]
for eid, item in data["exercises"].items():
    real = item["real"]
    d3 = item["d3"]
    real_s = real.get("status", "")
    d3_s = d3.get("status", "")
    real_d = real.get("duration") if real.get("duration") is not None else "-"
    d3_d = d3.get("duration") if d3.get("duration") is not None else "-"
    notes = []
    if real.get("note"):
        notes.append("真人：" + real["note"])
    if real_s == "replaced":
        notes.append("已换 YouTube 源")
    if d3.get("note"):
        notes.append("3D：" + d3["note"])
    if d3.get("reason"):
        notes.append("3D：" + d3["reason"])
    note = "；".join(notes)
    lines.append(
        f"| `{eid}` | {item['name']} | {real_s} | {real_d} | {d3_s} | {d3_d} | {note} |"
    )
lines += [
    "",
    "## 仍缺正确真人源",
    "",
    "这 6 个动作的 `assets/{id}.mp4` **没有覆盖**（避免把错动作裁短后看起来像完成了）：",
    "",
]
for eid, item in data["exercises"].items():
    if item["real"].get("status") == "needs_source":
        lines.append(f"- `{eid}` {item['name']} — {item['real'].get('note','')}")
lines += [
    "",
    "## 3D 未绑定",
    "",
    "磁盘上可能还留着旧合集文件，**新代码不要读**。以本表 `unbound` 为准。",
    "",
]
for eid, item in data["exercises"].items():
    if item["d3"].get("status") == "unbound":
        lines.append(f"- `{eid}` {item['name']} — {item['d3'].get('reason','')}")
lines += [
    "",
    "## 处理脚本",
    "",
    "```bash",
    "python tools/process-exercise-media.py analyze",
    "python tools/build-media-cuts.py",
    "python tools/process-exercise-media.py apply",
    "python tools/process-exercise-media.py map",
    "```",
    "",
]
text = "\n".join(lines) + "\n"
dest = root / "docs" / "media-map.md"
dest.write_text(text, encoding="utf-8")
print("WROTE", dest, "lines", text.count("\n"))
