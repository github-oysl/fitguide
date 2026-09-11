# 图片生成待办工作计划

入口：[自动流程](image-generation-workflow.md) · [模板](equipment-review/action-prompts/_TEMPLATE.md) · [样例](equipment-review/action-prompts/lat-pulldown-with-pronated-grip.md) · [注意事项](image-generation-notes.md)

本次完成通用规则、模板和一个动作样例；没有批量迁移其他动作。下表由当前提示词索引逐条建立，实际动作数量以目录为准。迁移、证据、出图三个状态独立；“可直接教学”是旧内容适配结论，不能替代图片证据检查。

## 已完成的基础工作

- [x] 明确发力首图 → 代理校验 → 同组出图 → 整套校验 → 最多两轮针对性修正。
- [x] 明确器械图、起始、发力、结束、单一错误图与主要肌群图的独立角色。
- [x] 更新通用模板和高位下拉完整样例，保留图内动作指导。
- [x] 固化失败案例、分项评分、关键证据门槛与中断恢复规则。
- [x] 建立逐动作迁移队列；提供文档结构与队列覆盖校验命令。

## 下一批执行顺序与完成条件

1. **P0：E02 试运行复核。** 从照片19/20及可用资料查找塔顶路径、真实长杆/握位证据。关键未知则 blocked-evidence；有证据后复核现有首图及全部依赖，不沿用笼统8分评分。完成标志：原图与各项判断关联、正式合格/失败状态明确。
2. **P1：E19 夹胸、E01 窄握划船。** 打开照片38、18/21，写真实座位/靠垫/脚撑/握把约束。先迁移两个提示词，再各自完整跑一套并复盘模板是否适配不同运动轨迹。E19 不移植前臂垫蝴蝶机结构。
3. **P2：E03 绳索族。** 区分照片20/22的物理实例，逐个核验附件、滑轮高度、站/跪/坐位；同工位空机复用，不同附件配置登记。条件未满足的跳过，不能批量套入同一附件。
4. **P3：其他固定/挂片器械。** 按档案分组；E04/E09腿举拆变式，E11辅助平台、E23/E25切换模式分别核验，未定器械进入证据待办。
5. **P4：自由重量、自重、有氧特殊模板。** 自由重量仍需器材/场地证据；自重的空机记not-applicable；平板支撑等静态动作改为进入/保持/退出；楼梯机按周期/启停建教学阶段，禁止套用拉伸收缩模板。
6. **收口：全部提示词迁移后才启动更大批次。** 每完成一行记录版本与运行位置。全部正式素材到位后，另做详情页接入、无视频路径、390px与桌面浏览器校验、文件加载检查。

本计划不是未来定时任务；下次执行按队列续做。当前证据不充分不向用户逐图询问，先自动查已有资料，仍缺失则集中交付缺项并处理其他可执行行。

## 逐动作队列

“待核”包含查主/补照片、身份、模式、附件、支撑和机械连接；表中器械编号到照片的映射以 [器械档案](equipment-review/photo-audit/equipment-inventory.md) 为准。将“待核”改为ready必须写具体证据，不能仅删掉标记。

| 动作文件 | 器械/工位 | 优先级 | 提示词迁移 | 证据状态 | 出图状态 |
|---|---|---|---|---|---|
| [lat-pulldown-with-pronated-grip](equipment-review/action-prompts/lat-pulldown-with-pronated-grip.md) | E02 | P0 | v2样例完成 | 塔顶/附件待补证 | 本地试运行；正式待复核 |
| [cable-row-seated-narrow-grip](equipment-review/action-prompts/cable-row-seated-narrow-grip.md) | E01 | P1 | 待迁移 | 待核：可直接教学 | 未生成 |
| [seated-machine-row](equipment-review/action-prompts/seated-machine-row.md) | E20 | P3 | 待迁移 | 待核：条件适用（胸托待核） | 未生成 |
| [plate-loaded-lat-pulldown](equipment-review/action-prompts/plate-loaded-lat-pulldown.md) | E14 | P3 | 待迁移 | 待核：条件适用 | 未生成 |
| [plate-loaded-seated-row](equipment-review/action-prompts/plate-loaded-seated-row.md) | E20 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [t-bar-row-unsupported](equipment-review/action-prompts/t-bar-row-unsupported.md) | E08 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [cable-chest-fly](equipment-review/action-prompts/cable-chest-fly.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [cable-incline-chest-fly](equipment-review/action-prompts/cable-incline-chest-fly.md) | E03＋可调凳 | P2 | 待迁移 | 待核：条件适用（凳待确认） | 未生成 |
| [straight-arm-lat-pulldown](equipment-review/action-prompts/straight-arm-lat-pulldown.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [reverse-cable-fly](equipment-review/action-prompts/reverse-cable-fly.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [cable-lateral-raise](equipment-review/action-prompts/cable-lateral-raise.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [face-pull](equipment-review/action-prompts/face-pull.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [cable-curl-with-bar](equipment-review/action-prompts/cable-curl-with-bar.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [cable-curl-with-rope](equipment-review/action-prompts/cable-curl-with-rope.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [triceps-pushdown-with-rope](equipment-review/action-prompts/triceps-pushdown-with-rope.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [overhead-tricep-extension-lower-position](equipment-review/action-prompts/overhead-tricep-extension-lower-position.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [cable-crunch](equipment-review/action-prompts/cable-crunch.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [pallof-press](equipment-review/action-prompts/pallof-press.md) | E03 | P2 | 待迁移 | 待核：条件适用 | 未生成 |
| [machine-chest-press](equipment-review/action-prompts/machine-chest-press.md) | E21/E22 待定 | P3 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [machine-shoulder-press](equipment-review/action-prompts/machine-shoulder-press.md) | E15/E21 待定 | P3 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [machine-chest-fly](equipment-review/action-prompts/machine-chest-fly.md) | E19 | P1 | 待迁移 | 待核：可直接教学 | 未生成 |
| [plate-loaded-lying-chest-press](equipment-review/action-prompts/plate-loaded-lying-chest-press.md) | E22 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [lateral-raise-machine](equipment-review/action-prompts/lateral-raise-machine.md) | 无清晰对应 | P3 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [assisted-pull-up](equipment-review/action-prompts/assisted-pull-up.md) | E11 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [assisted-dip](equipment-review/action-prompts/assisted-dip.md) | E11 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [leg-press](equipment-review/action-prompts/leg-press.md) | E04 / E09 | P3 | 待迁移 | 待核：条件适用（两机型须分开） | 未生成 |
| [leg-extension-seated](equipment-review/action-prompts/leg-extension-seated.md) | E25 | P3 | 待迁移 | 待核：条件适用 | 未生成 |
| [leg-curl-seated](equipment-review/action-prompts/leg-curl-seated.md) | E25 | P3 | 待迁移 | 待核：条件适用（B 实例待核） | 未生成 |
| [prone-leg-curl](equipment-review/action-prompts/prone-leg-curl.md) | E24 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [hack-squat](equipment-review/action-prompts/hack-squat.md) | E10 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [hip-abduction-machine](equipment-review/action-prompts/hip-abduction-machine.md) | E23 | P3 | 待迁移 | 待核：可直接教学 | 未生成 |
| [hip-adduction-machine](equipment-review/action-prompts/hip-adduction-machine.md) | E23 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [machine-glute-extension](equipment-review/action-prompts/machine-glute-extension.md) | E26 | P3 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [stair-climber](equipment-review/action-prompts/stair-climber.md) | E05 | P4 | 待迁移 | 待核：建议新增 | 未生成 |
| [decline-bench-crunch](equipment-review/action-prompts/decline-bench-crunch.md) | E06 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [roman-chair-hip-extension](equipment-review/action-prompts/roman-chair-hip-extension.md) | E07 | P3 | 待迁移 | 待核：建议新增 | 未生成 |
| [calf-raise-in-leg-press](equipment-review/action-prompts/calf-raise-in-leg-press.md) | E04 / E09 | P3 | 待迁移 | blocked-evidence：待器械确认（不出图） | 阻塞，暂不出图 |
| [plate-loaded-incline-chest-press](equipment-review/action-prompts/plate-loaded-incline-chest-press.md) | E21 | P3 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [machine-reverse-fly](equipment-review/action-prompts/machine-reverse-fly.md) | E19 | P3 | 待迁移 | 待核：条件适用（需后束模式） | 未生成 |
| [seated-dip-machine](equipment-review/action-prompts/seated-dip-machine.md) | E12 | P3 | 待迁移 | blocked-evidence：待器械确认（不出图） | 阻塞，暂不出图 |
| [cable-standing-chest-press](equipment-review/action-prompts/cable-standing-chest-press.md) | E03 | P2 | 待迁移 | 待核：条件适用（需手柄） | 未生成 |
| [cable-single-arm-row](equipment-review/action-prompts/cable-single-arm-row.md) | E03 | P2 | 待迁移 | 待核：条件适用（需单手柄） | 未生成 |
| [cable-pull-through](equipment-review/action-prompts/cable-pull-through.md) | E03 | P2 | 待迁移 | 待核：条件适用（需绳把） | 未生成 |
| [cable-hip-extension](equipment-review/action-prompts/cable-hip-extension.md) | E03 | P2 | 待迁移 | 待核：条件适用（需合格踝带） | 未生成 |
| [weighted-back-extension](equipment-review/action-prompts/weighted-back-extension.md) | E07 | P3 | 待迁移 | 待核：条件适用 | 未生成 |
| [reverse-hyper](equipment-review/action-prompts/reverse-hyper.md) | E07 | P3 | 待迁移 | 待核：条件适用 | 未生成 |
| [dumbbell-curl](equipment-review/action-prompts/dumbbell-curl.md) | B01 | P4 | 待迁移 | 待核：可直接教学 | 未生成 |
| [dumbbell-hammer-curl](equipment-review/action-prompts/dumbbell-hammer-curl.md) | B01 | P4 | 待迁移 | 待核：可直接教学 | 未生成 |
| [dumbbell-lateral-raise](equipment-review/action-prompts/dumbbell-lateral-raise.md) | B01 | P4 | 待迁移 | 待核：可直接教学 | 未生成 |
| [goblet-squat](equipment-review/action-prompts/goblet-squat.md) | B01 | P4 | 待迁移 | 待核：可直接教学 | 未生成 |
| [dumbbell-rdl](equipment-review/action-prompts/dumbbell-rdl.md) | B01 | P4 | 待迁移 | 待核：可直接教学 | 未生成 |
| [dumbbell-bench-press](equipment-review/action-prompts/dumbbell-bench-press.md) | B01+B02 | P4 | 待迁移 | 待核：条件适用（需稳定凳） | 未生成 |
| [dumbbell-one-arm-row](equipment-review/action-prompts/dumbbell-one-arm-row.md) | B01+B02 | P4 | 待迁移 | 待核：条件适用（需稳定凳） | 未生成 |
| [barbell-squat](equipment-review/action-prompts/barbell-squat.md) | B03 | P4 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [barbell-romanian-deadlift](equipment-review/action-prompts/barbell-romanian-deadlift.md) | B03 | P4 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [barbell-bench-press](equipment-review/action-prompts/barbell-bench-press.md) | B03+E17 | P4 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [barbell-overhead-press](equipment-review/action-prompts/barbell-overhead-press.md) | B03 | P4 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [barbell-row](equipment-review/action-prompts/barbell-row.md) | B03 | P4 | 待迁移 | blocked-evidence：待现场核对（通用机型示意） | 阻塞，暂不出图 |
| [plank](equipment-review/action-prompts/plank.md) | 无器械 | P4 | 待迁移 | 待核：可直接教学 | 未生成 |
| [dead-bug](equipment-review/action-prompts/dead-bug.md) | 无器械 | P4 | 待迁移 | 待核：可直接教学 | 未生成 |
| [glute-bridge](equipment-review/action-prompts/glute-bridge.md) | 无器械 | P4 | 待迁移 | 待核：可直接教学 | 未生成 |

## 每行执行清单

- [ ] 读取动作、器械、照片并记录可见事实与缺项。
- [ ] 改写为v2，逐字展开每张实际提示词，更新来源与元数据。
- [ ] 发力首图通过硬性检查与至少8分，再生成/复用其余角色。
- [ ] 整套检查，失败图最多修正两次并复检；保留attempt和锚点依赖。
- [ ] 保存图片与运行manifest，更新本行状态及相对运行目录；未完成必需角色不标complete。
- [ ] 正式网页接入另列任务，现有提示词条数不能直接写入网页动作数。

## 执行前的仓库校验

运行 `node tools/verify-image-workflow.cjs`。脚本检查v2结构、代码块与角色、文档链接和本表是否覆盖当前动作目录；旧稿输出“待迁移”，不冒充符合新流程。旧的 `verify-action-prompts.cjs` 若在本地存在，其“禁文字/正确01锚点”规则不适用于v2。

运行前检查git status；提交只暂存当前任务涉及的路径。实拍原图和本机运行记录保留本地，缺失本地媒体不应导致文档校验失败。
