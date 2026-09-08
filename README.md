# FitGuide · 器械训练手册

一个纯前端的健身学习站点：按部位筛选的动作库、训练计划与打卡统计，以及浏览器端的双视频动作对比（本地姿态分析）。

## 功能

- **今日训练** — 4 套按部位划分的训练计划（推拉腿 / 新手全身 / 五分化 / 单部位专场），逐动作勾选打卡；也支持自由运动记录。
- **打卡统计** — 周 / 月 / 年打卡日历、连续天数与历史明细。
- **动作库** — 28 个动作（24 个器械动作 + 4 个有氧/居家动作），中文分步指导、要点与常见错误。
- **动作对比** — 上传自己的训练视频与示范并排对比；姿态提取与指标计算在浏览器 Worker 中本地完成，可自愿接入 OpenAI 兼容接口生成中文指导（详见 [COMPARISON.md](COMPARISON.md)）。

## 运行

```bash
node server.mjs        # 需要 Node.js 20+
# 打开 http://127.0.0.1:8766
```

或部署到任何支持静态文件与 Range 请求（视频分段读取）的静态托管。

- 动作对比功能需要 HTTP 页面（WASM / Module Worker 限制）。
- 直接用浏览器打开 `index.html` 时，除对比外的功能均可用。

## 关于媒体素材（重要）

**出于版权原因，本仓库不包含 `assets/` 下的图片与视频文件**（动作演示与封面）。

如需完整体验，请按以下清单自行获取素材，放入 `assets/` 并保持文件名一致：

| 素材 | 来源 | 清单 |
|---|---|---|
| 力量动作图片/视频 | StrengthLog | `assets/sources.json` |
| 有氧与居家动作 | FitnessProgramer | `assets/cardio-sources.json` |
| 英文讲解视频（外链） | Muscle & Strength | 动作数据内 `video` 字段 |

缺少素材时页面功能可用，但动作卡片无图、本地演示无法播放。仓库内的 `gym-*.jpg`（健身房工位参考照片）同理需自行准备。

## 隐私

- 打卡记录、自由运动记录、模型接口配置均只保存在当前浏览器的 localStorage，不上传任何服务器。
- 动作对比默认不调用任何大模型；接入后请求由浏览器直接发往用户配置的接口，不经过本站。

## License

代码以 [MIT](LICENSE) 许可发布。

`assets/` 下的媒体素材版权归原作者所有，**不随本仓库分发、也不在 MIT 许可覆盖范围内**，请勿再分发。

## 致谢

- [StrengthLog](https://www.strengthlog.com/) · [FitnessProgramer](https://fitnessprogramer.com/) · [Muscle & Strength](https://www.muscleandstrength.com/) — 动作示范与讲解
- [Google MediaPipe](https://developers.google.com/mediapipe)（Apache-2.0，见 `vendor/mediapipe/`）— 浏览器端姿态识别
