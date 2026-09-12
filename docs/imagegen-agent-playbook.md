# 出图子代理执行手册（2026-09-12 修订）

解决 20260912 批次实测的问题：子代理在长会话里 Read 原图，图进历史后每轮重传（单批次实测放大 50–170 倍，全程约 3.4 GB）。核心原则：

> **长会话禁止 Read 图片。看图用短命、只返回文字的子代理。生成与看图必须分离。**

## 硬性规则

0. **网络（2026-09-13 更新）**：代理由用户在系统级启用，所有 `local-image-gen` 调用**直接执行，不要设置任何代理环境变量**（不要 HTTPS_PROXY/HTTP_PROXY/NO_PROXY）。
1. **生成代理（gen）全程禁止 Read 任何 png/jpg**。它只跑 CLI、写文件、读文字。它的上下文里只允许出现：提示词文本、CLI 的 JSON 输出、验收代理返回的 JSON 结论。
2. **验收代理（review）短命**：缩图 → 一轮并行 Read → 返回 JSON → 立即结束。禁止第二轮再看（除了 390px 文字复检那一次，见模板）。禁止读原尺寸 PNG。
3. **缩后再读**：`sips -Z 768 -s format jpeg -s formatOptions 70 <原图> --out /tmp/qa-<role>.jpg`（细节与姿势验收）；`sips -Z 390 ... /tmp/qa-<role>-390.jpg`（口令文字可读性验收）。**禁止 Read `output/` 原图与 `/tmp/lig/preview.png`**。
4. **一个动作一个生成代理**，动作完成即结束，不在同一会话接下一个动作。
5. 生成代理可自带并行：同一套互不依赖的 CLI 调用（如 force 与 equipment）放一轮里并行执行；**验收代理读多张图必须同一轮并行 Read**。
6. **父代理只读文字**：manifest.json、audit.md、验收 JSON。禁止父代理 Read 图片抽检。
7. 文字/尺寸/格式先用脚本筛（`sips -g pixelWidth`、OCR 可选），视觉验收只走人形体/姿势/器械/构图。
8. 每角色最多 3 次生成（attempt 0/1/2）；force 是锚点，force 未通过验收前不生成其余带人物的角色。

## 模板 A：生成代理（每个动作一个）

```
你在 /Users/oysl/code/fitguide 为动作 {ACTION_ID} 生成教学图。全程禁止 Read 任何 png/jpg 图片——验收由父代理另派短命验收代理负责，你只根据父代理转发的验收 JSON 做修正。**禁止自己启动任何子代理。**网络已由系统级代理处理，直接调用 CLI，禁止设置任何代理环境变量。

## 当前轮次任务（父代理会明确告知做哪一轮）
- 轮次1：从 docs/equipment-review/action-prompts/{ACTION_ID}.md 的 ready 配置提取全部角色卡 ```text 块，逐字写入 /tmp/lig/{ACTION_ID}-<role>.txt；并行生成 force-attempt-0 与 equipment-attempt-0（equipment 无人；若提示词引用实拍照片加 -i 健身房器械图片/<对应文件>）。
- 轮次2（父代理告知 force 已通过并给出选定图路径后）：用 -i <force 选定图> 并行生成 start/end/error-01/error-02/muscles（grok 参考图 ≤3 张；若该动作已有 codex 生成的合格人物图，继续用 grok + 该 force 参考图保持风格接近）。
- 修正轮（父代理转发某角色 fail 的验收 JSON 后）：分析 hard_fails/deductions，只针对问题改对应 /tmp/lig/{ACTION_ID}-<role>.txt（保留正确部分），生成该角色下一个 attempt；每角色最多 0/1/2 共 3 次，已用尽则跳过并在报告标注 failed-limit。

## CLI 格式
local-image-gen -p /tmp/lig/{ACTION_ID}-<role>.txt --provider grok --model grok-imagine-image-2.0 --aspect-ratio 1:1 --resolution 2k --quality medium [-i 参考图] -o output/imagegen/20260912-codex-1/{ACTION_ID}/<role>-attempt-<N>.png
（每次调用间隔 sleep 3；grok 路由实测 2048×2048 精确 1:1、中文口令逐字正确。codex 禁用：上游忽略 --size 输出随机比例。）

## 每轮结束
- 更新该动作的 manifest.json（参照 output/imagegen/20260912-codex-1/plank/manifest.json 字段；generation_tool "local-image-gen grok-imagine-image-2.0"；run_id "20260912-codex-1"）与 audit.md（本轮 attempt 记录）；
- 返回纯文字报告：本轮生成的角色/attempt 路径、当前各角色状态。**不要贴图、不要自行验收、不要起子代理。**

## 约束
- 禁止 Read 图片；禁止自行启动验收子代理；禁止 git 操作；禁止改 docs/ 提示词文件、计划表、catalog；禁止设置代理环境变量。
- CLI 报错无图返回：同请求重试一次；再失败标 technical-error。连续 429 停止并报告。
```

## 编排循环（父代理执行，全部只经手文字）

每个动作：
1. 起生成代理做轮次1 → 返回 attempt 路径；
2. 起验收代理（模板 B）评 force+equipment → 取 JSON；
3. force 通过 → 唤醒生成代理做轮次2；force 失败 → 唤醒生成代理做修正轮（预算内）→ 回到 2；
4. 起验收代理评其余角色 → 取 JSON；
5. fail 角色唤醒生成代理修正（每角色 ≤3 次）→ 回到 4；全部通过或达上限 → 定稿，动作结束。
6. 父代理只经手文字报告与 JSON，永不 Read 图片。同时进行的生成代理 ≤3 个。

## 模板 B：验收代理（短命，只返回 JSON）

```
你是图片验收代理。对下列 attempt 图做视觉验收。规则：
1. 每张图先缩图：sips -Z 768 -s format jpeg -s formatOptions 70 '<原图>' --out /tmp/qa-<序号>.jpg；再 sips -Z 390 同样生成 -390.jpg。
2. **同一轮里并行 Read 全部 768 jpg**（人形体/姿势/器械/构图验收）；然后**同一轮里并行 Read 全部 390 jpg**（口令文字缩小后可读性验收）。除这两轮外不要再读任何图；禁止读原 PNG。
3. 硬性否决（任一命中即 fail）：器械机型/朝向/座位/附件/接触错误；关节/握法与动作相反；多余或缺失肢体；肢体穿模；关节反曲；明显比例失调/左右失真；面部畸形；支撑悬空；错误姿势不明显；箭头反向；图中教学文字错字；正确阶段几乎相同；关键部位被裁。
4. 通过硬否决后五项各 0–2 分（器械对应/姿势正确/教学清楚/构图/一致性），≥8 通过。
5. 只返回如下 JSON，不要其他文字：
{"verdicts": {"<role>": {"attempt": N, "file": "<路径>", "pass": true/false, "score": 8.5, "hard_fails": ["..."], "deductions": ["..."]}}, "notes": "整套一致性观察（限文字）"}

待验收图片（role=路径）：
{ROLE_FILE_MAP}
```

## 父代理（编排者）守则

- 只读 manifest/audit/验收 JSON 文字；**永不 Read 图片**，包括"抽检"。
- 同时运行的生成代理 ≤3 个（每个不同动作）。
- 收到生成代理报告后，把验收/入库状态记进计划表（Phase 2 统一更新 docs）。
