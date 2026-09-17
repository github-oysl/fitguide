# Muscle & Strength 全量视频离线化与媒体扩展待办方案（Plan B）

> 关联说明：本项目已于 2026-09-17 完成 **方案 A（极速精简版）**，全站 1,219 个动作教程、1,195 张实拍封面大图、19 张解剖图及健身房当前已识别 60 个核心动作的 720p 视频已全量落盘（总计约 507 MB）。  
> 本文件为后续需要开展 **全站全量视频离线化（Plan B）** 的标准化执行待办指南。

---

## 一、 待办目标与资源规格评估

| 待办项目 | 资源数量 | 预估体积 | 耗时预估 (本机代理环境) | 优先级与触发场景 |
|---|---|---|---|---|
| **全站 720p 高清视频全量下载** | 1,219 部视频 (776 YouTube + 443 Vimeo) | 约 5.5 GB ～ 7.0 GB | 约 40 ～ 60 分钟 (4 线程) | **次要**：需完全脱网使用全站动作库时 |
| **全站 480p 紧凑格式压制** | 1,219 部视频 | 约 2.5 GB ～ 3.2 GB | ffmpeg 批处理约 20 分钟 | **可选**：节省磁盘空间或供移动端轻量加载 |
| **FitGuide 前端离线播放器集成** | 动作库详情与对比页 | 代码级接入 | 约 1～2 工时 | **后续演进**：前端动作详情弹窗增加离线视频播放 |

---

## 二、 Plan B 全量视频下载一键执行脚本

本仓库在 `tools/` 中提供配套的离线拉取工具脚本。后续如需启动 Plan B，可直接在终端运行以下命令：

```powershell
# 1. 确保本机代理正常运行（默认 127.0.0.1:2334）
# 2. 执行全站视频下载脚本（支持断点续传、智能重试与自动跳过已完成项）
python tools/download-all-ms-videos.py --workers 4 --quality 720p
```

### 脚本实现与容错机制
* **自动协议自适应**：
  * 对 YouTube 视频使用 `bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best`；
  * 对 Vimeo 无音轨动作切片自动使用 `bestvideo/best` 并带入 `Referer: https://www.muscleandstrength.com/`，防止防盗链拦截。
* **断点续传与缓存校验**：每个动作视频下载前检查目标路径与文件有效性（>50KB 即视为已就绪），意外中断随时重新执行即可秒级恢复。
* **存储路径规范**：统一输出至 `docs/muscleandstrength/media/videos/{slug}.mp4`，该目录已写入 `.gitignore`，不会污染版本控制。

---

## 三、 视频批量压制指南（可选优化）

若希望将全站视频体积压缩至 2.5 GB 以内以适应小容量设备，可使用本机 `ffmpeg` 进行批量无损/感知无损压制：

```powershell
# 批量将 720p 压制为 480p H.264 (CRF 23 + AAC 96k)
Get-ChildItem "docs/muscleandstrength/media/videos/*.mp4" | ForEach-Object {
    $out = "docs/muscleandstrength/media/videos_480p/$($_.Name)"
    if (!(Test-Path $out)) {
        ffmpeg -i $_.FullName -vf "scale=-2:480" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 96k $out
    }
}
```

---

## 四、 前端与动作对比体系接入建议

1. **资源访问白名单**：
   * 按照 `AGENTS.md` 规范，若需通过 `server.mjs` 服务本地视频，需将视频软链接或复制至 `assets/muscleandstrength/` 前缀下，并确保路径受静态服务支持。
2. **多层优雅降级**：
   * 优先播放本地素材：`assets/muscleandstrength/{id}.mp4`；
   * 本地缺失时自动回退至在线嵌入流：`data.video_url`（YouTube/Vimeo）；
   * 脱网无网络时回退至本地静态动作图：`media/images/covers/{id}.jpg`。

---

## 五、 定期增量更新机制

M&S 网站动作库如新增条目，可重新运行 `sitemap.xml` 增量探测：
```powershell
python -c "
import xml.etree.ElementTree as ET, requests
r = requests.get('https://www.muscleandstrength.com/sitemap.xml?page=1', proxies={'http':'http://127.0.0.1:2334','https':'http://127.0.0.1:2334'})
root = ET.fromstring(r.content)
print('当前线上动作链接数:', len([x.text for x in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc') if '/exercises/' in x.text]))
"
```
对比本地 `all_exercises.json` 的条目键，即可一键执行差量补充抓取。
