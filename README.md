# FitGuide · 器械训练手册

一个纯前端、无后端的健身学习与训练打卡站点：结构化力量动作库、3D 解剖动作教学、训练计划打卡、自由运动记录以及浏览器端双视频动作对比。

**开箱即用 · 无构建步骤 · 解压后双击 `index.html` 即可运行。**

## 功能特性

- **今日训练**：精简易用的训练清单。支持 4 套经典计划（推拉腿 PPL / 新手全身 / 五分化 / 单部位专场）弹窗灵活切换，支持逐项打卡与当日进度追踪；提供自由运动打卡模式。
- **动作库（60 动作）**：全面覆盖胸、背、肩、手臂、臀腿、核心六大肌群的常见器械与自由重量动作。
- **3D 解剖动画演示**：内置 55 套动作的 3D 解剖教学视频与真人示范，支持双模式无缝切换。
- **我的健身房配置**：支持配置 22 种常见现场器械的具备状态，动作库与训练日自动联动过滤可练动作，支持为每个器械保存个人档位与配重备注。
- **打卡统计**：周 / 月 / 年多周期打卡日历，自动聚合计划动作与自由运动（同日去重），支持历史明细查看与修改。
- **动作对比**：基于 Google MediaPipe Tasks Vision 在浏览器 Worker 内进行本地骨骼关键点提取与动作幅度指标对比，支持自愿接入兼容 OpenAI 的视觉大模型生成指导（详见 [COMPARISON.md](COMPARISON.md)）。

## 运行方式

### 方式 A：本地服务（推荐）
```bash
node server.mjs        # 需要 Node.js 20+
# 打开 http://127.0.0.1:8766
```
动作对比功能由于 WASM SIMD 与 Module Worker 的安全策略限制，需要通过 HTTP 服务访问。

### 方式 B：直接打开文件
直接用浏览器双击打开 `index.html`（`file://` 协议），除动作对比外的全部教学、打卡、统计与设置功能完全可用。

## 隐私与存储

- 所有训练打卡记录、自由运动数据与器械设置均仅存储在当前浏览器的 `localStorage` 中。
- 无后端服务器、无云端同步、无用户追踪。清除浏览器缓存将清空打卡数据。
- 动作对比姿态检测完全在浏览器本地计算；配置大模型接口后，请求由浏览器直连用户指定的接口，不经过本站。

## 媒体素材与版权声明

动作库演示视频、封面图、3D 动画与器械参考图（位于 `assets/` 目录下）已随版本库分发，下载或克隆后即可离线完整使用。

> **免责声明**：本项目所引用之动作示范素材部分来源仅供个人健身学习与教学交流参考，版权归原作者所有（StrengthLog、Muscle & Strength 等）。**如有侵权，请联系 1016157168@qq.com 删除**。

## 自动化测试

项目包含纯 Node.js 测试与 Playwright 校验脚本（无额外 npm 依赖）：

```bash
# 运行单元测试（打卡统计、存储层原子写入、对比逻辑）
node --test tools/training-records.test.cjs tools/checkin-stats.test.cjs tools/comparison.test.mjs

# 静态服务缓存与传输层校验
node tools/verify-server-cache.cjs

# 健身房器械配置与 3D 教学核验
node tools/verify-gym-settings.cjs
node tools/verify-3d-feature.cjs
```

## License

代码以 [MIT](LICENSE) 许可发布。
- 示范媒体素材部分来源仅供学习交流，版权归原作者所有（StrengthLog、Muscle & Strength 等）；如有侵权，请联系 1016157168@qq.com 删除。
- 姿态检测引擎：[Google MediaPipe](https://developers.google.com/mediapipe)（Apache-2.0，位于 `vendor/mediapipe/`）。
