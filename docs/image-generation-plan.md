# 图片生成待办工作计划

入口：[自动流程](image-generation-workflow.md) · [模板](equipment-review/action-prompts/_TEMPLATE.md) · [提示词目录](equipment-review/action-prompts/README.md) · [本轮核对报告](image-generation-audit.md)

**当前指令：只执行全量提示词迁移、实拍证据核对、计划和校验更新；暂不生成图片。** 本计划不是定时任务，也不会自动恢复出图。

## 本轮完成情况

- [x] 61个动作全部迁移为v2，原高位下拉样例一并复核改写。
- [x] 逐张打开36张实拍，将可见事实、关键缺项与来源路径写入动作文件。
- [x] 拆分为65套配置，13套图示证据ready，52套blocked-evidence；静态、自重、有氧独立适配。
- [x] 每套列发力、空机、起始、结束、单一错误、肌群定位角色，并展开公共约束与图内短文。
- [x] 更新全量校验，不再放行旧版禁文字/正确01锚点规则。
- [ ] 补足阻塞项后更新具体约束与引用；当前缺项见报告。
- [ ] 用户恢复出图后，先验force，再生成其他角色；本轮没有执行。

## 后续顺序

1. 保持全量提示词已迁移状态；补证时更新动作、目录和本表，不把“已迁移”改写成“已生成”。
2. 优先补E02顶部与真实拉杆；E03逐附件/高度；E20小垫；E23/E25模式；其余未定机型和凳/自由杠。缺项未解时不调用其条件稿。
3. 用户恢复生成后，先从证据ready的E01、E19等不同轨迹动作验证模板。每个动作独立先出force，由代理验收，无需逐图请用户批准。
4. 首图通过硬性检查与至少8/10后，生成/复用其余角色。每张最多修正两次，首图和整套复检共用次数；E02旧计数不清零。
5. 全套通过才交付；正式页面接入、无视频路径与移动端显示另列任务。

## 逐动作队列

动作条目来自目录，网页归属与运行时数据比对。每行证据状态按其最受限配置汇总，具体变式见动作文件和_catalog.json；ready不代表已完成图像验收。

| 动作文件 | 网页归属 | 提示词迁移 | 配置数 | 证据状态 | 出图状态 |
|---|---|---|---|---|---|
| [assisted-dip](equipment-review/action-prompts/assisted-dip.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [assisted-pull-up](equipment-review/action-prompts/assisted-pull-up.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [barbell-bench-press](equipment-review/action-prompts/barbell-bench-press.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [barbell-overhead-press](equipment-review/action-prompts/barbell-overhead-press.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [barbell-romanian-deadlift](equipment-review/action-prompts/barbell-romanian-deadlift.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [barbell-row](equipment-review/action-prompts/barbell-row.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [barbell-squat](equipment-review/action-prompts/barbell-squat.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [cable-chest-fly](equipment-review/action-prompts/cable-chest-fly.md) | 现有数据：data.js | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [cable-crunch](equipment-review/action-prompts/cable-crunch.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [cable-curl-with-bar](equipment-review/action-prompts/cable-curl-with-bar.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [cable-curl-with-rope](equipment-review/action-prompts/cable-curl-with-rope.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [cable-hip-extension](equipment-review/action-prompts/cable-hip-extension.md) | 建议新增 | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [cable-incline-chest-fly](equipment-review/action-prompts/cable-incline-chest-fly.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [cable-lateral-raise](equipment-review/action-prompts/cable-lateral-raise.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [cable-pull-through](equipment-review/action-prompts/cable-pull-through.md) | 建议新增 | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [cable-row-seated-narrow-grip](equipment-review/action-prompts/cable-row-seated-narrow-grip.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [cable-single-arm-row](equipment-review/action-prompts/cable-single-arm-row.md) | 建议新增 | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [cable-standing-chest-press](equipment-review/action-prompts/cable-standing-chest-press.md) | 建议新增 | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [calf-raise-in-leg-press](equipment-review/action-prompts/calf-raise-in-leg-press.md) | 现有数据：extra-data.js | v2迁移完成 | 2 | blocked-evidence：2套 | 未生成；暂停生成 |
| [dead-bug](equipment-review/action-prompts/dead-bug.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [decline-bench-crunch](equipment-review/action-prompts/decline-bench-crunch.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [dumbbell-bench-press](equipment-review/action-prompts/dumbbell-bench-press.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [dumbbell-curl](equipment-review/action-prompts/dumbbell-curl.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [dumbbell-hammer-curl](equipment-review/action-prompts/dumbbell-hammer-curl.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [dumbbell-lateral-raise](equipment-review/action-prompts/dumbbell-lateral-raise.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [dumbbell-one-arm-row](equipment-review/action-prompts/dumbbell-one-arm-row.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [dumbbell-rdl](equipment-review/action-prompts/dumbbell-rdl.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [face-pull](equipment-review/action-prompts/face-pull.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [glute-bridge](equipment-review/action-prompts/glute-bridge.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [goblet-squat](equipment-review/action-prompts/goblet-squat.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [hack-squat](equipment-review/action-prompts/hack-squat.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [hip-abduction-machine](equipment-review/action-prompts/hip-abduction-machine.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [hip-adduction-machine](equipment-review/action-prompts/hip-adduction-machine.md) | 建议新增 | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [lat-pulldown-with-pronated-grip](equipment-review/action-prompts/lat-pulldown-with-pronated-grip.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | blocked-evidence：1套 | 历史样图待复核；暂停生成 |
| [lateral-raise-machine](equipment-review/action-prompts/lateral-raise-machine.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [leg-curl-seated](equipment-review/action-prompts/leg-curl-seated.md) | 现有数据：data.js | v2迁移完成 | 2 | blocked-evidence：2套 | 未生成；暂停生成 |
| [leg-extension-seated](equipment-review/action-prompts/leg-extension-seated.md) | 现有数据：data.js | v2迁移完成 | 2 | blocked-evidence：2套 | 未生成；暂停生成 |
| [leg-press](equipment-review/action-prompts/leg-press.md) | 现有数据：data.js | v2迁移完成 | 2 | blocked-evidence：1套；ready：1套 | 未生成；暂停生成 |
| [machine-chest-fly](equipment-review/action-prompts/machine-chest-fly.md) | 现有数据：data.js | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [machine-chest-press](equipment-review/action-prompts/machine-chest-press.md) | 现有数据：data.js | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [machine-glute-extension](equipment-review/action-prompts/machine-glute-extension.md) | 建议新增 | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [machine-reverse-fly](equipment-review/action-prompts/machine-reverse-fly.md) | 建议新增 | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [machine-shoulder-press](equipment-review/action-prompts/machine-shoulder-press.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [overhead-tricep-extension-lower-position](equipment-review/action-prompts/overhead-tricep-extension-lower-position.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [pallof-press](equipment-review/action-prompts/pallof-press.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [plank](equipment-review/action-prompts/plank.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [plate-loaded-incline-chest-press](equipment-review/action-prompts/plate-loaded-incline-chest-press.md) | 建议新增 | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [plate-loaded-lat-pulldown](equipment-review/action-prompts/plate-loaded-lat-pulldown.md) | 建议新增 | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [plate-loaded-lying-chest-press](equipment-review/action-prompts/plate-loaded-lying-chest-press.md) | 建议新增 | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [plate-loaded-seated-row](equipment-review/action-prompts/plate-loaded-seated-row.md) | 建议新增 | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [prone-leg-curl](equipment-review/action-prompts/prone-leg-curl.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [reverse-cable-fly](equipment-review/action-prompts/reverse-cable-fly.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [reverse-hyper](equipment-review/action-prompts/reverse-hyper.md) | 建议新增 | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [roman-chair-hip-extension](equipment-review/action-prompts/roman-chair-hip-extension.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [seated-dip-machine](equipment-review/action-prompts/seated-dip-machine.md) | 建议新增 | v2迁移完成 | 1 | blocked-evidence：1套 | 未生成；暂停生成 |
| [seated-machine-row](equipment-review/action-prompts/seated-machine-row.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [stair-climber](equipment-review/action-prompts/stair-climber.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [straight-arm-lat-pulldown](equipment-review/action-prompts/straight-arm-lat-pulldown.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [t-bar-row-unsupported](equipment-review/action-prompts/t-bar-row-unsupported.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |
| [triceps-pushdown-with-rope](equipment-review/action-prompts/triceps-pushdown-with-rope.md) | 现有数据：extra-data.js | v2迁移完成 | 1 | ready：1套 | 未生成；暂停生成 |
| [weighted-back-extension](equipment-review/action-prompts/weighted-back-extension.md) | 建议新增 | v2迁移完成 | 1 | ready | 未生成；暂停生成 |

## 校验与状态维护

运行 `node tools/verify-image-workflow.cjs` 和 `node tools/verify-action-prompts.cjs`，两入口执行同一套严格v2校验。回归测试运行 `node --test tools/image-workflow.test.cjs`。检查不依赖本地被忽略照片、系统日期或生图工具。

证据状态与图像状态必须分别更新，未看图不写评分。未来执行前记录实际输入路径、force版本、依赖与attempt；提交仅显式列当前文档和工具路径，实拍和含本机路径的运行记录留在本地。
