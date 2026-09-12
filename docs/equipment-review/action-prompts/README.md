# 动作教学图提示词索引

当前61个动作均已迁移v2，共65套独立配置。**本轮仅修订提示词与核对证据，暂停图片生成。**

[自动流程](../../image-generation-workflow.md) · [模板](_TEMPLATE.md) · [工作计划](../../image-generation-plan.md) · [实拍复核报告](../../image-generation-audit.md) · [机器可读目录](_catalog.json)

每个动作保留历史教学来源，并新增实拍约束、逐配置角色、阶段事实、图内指导和验收点。blocked-evidence条件稿也已迁移，但不能提交模型；ready是图示证据状态，不是图片合格状态。动作目录包含建议新增，不能用目录条数修改网页动作数。

| 动作 | 数据归属 | 配置 / 证据 |
|---|---|---|
| [assisted-dip](assisted-dip.md) | 建议新增 | standard：blocked-evidence |
| [assisted-pull-up](assisted-pull-up.md) | 建议新增 | standard：blocked-evidence |
| [barbell-bench-press](barbell-bench-press.md) | 建议新增 | standard：blocked-evidence |
| [barbell-overhead-press](barbell-overhead-press.md) | 建议新增 | standard：blocked-evidence |
| [barbell-romanian-deadlift](barbell-romanian-deadlift.md) | 建议新增 | standard：blocked-evidence |
| [barbell-row](barbell-row.md) | 建议新增 | standard：blocked-evidence |
| [barbell-squat](barbell-squat.md) | 建议新增 | standard：blocked-evidence |
| [cable-chest-fly](cable-chest-fly.md) | data.js | standard：blocked-evidence |
| [cable-crunch](cable-crunch.md) | extra-data.js | standard：blocked-evidence |
| [cable-curl-with-bar](cable-curl-with-bar.md) | extra-data.js | standard：blocked-evidence |
| [cable-curl-with-rope](cable-curl-with-rope.md) | extra-data.js | standard：blocked-evidence |
| [cable-hip-extension](cable-hip-extension.md) | 建议新增 | standard：blocked-evidence |
| [cable-incline-chest-fly](cable-incline-chest-fly.md) | extra-data.js | standard：blocked-evidence |
| [cable-lateral-raise](cable-lateral-raise.md) | extra-data.js | standard：blocked-evidence |
| [cable-pull-through](cable-pull-through.md) | 建议新增 | standard：blocked-evidence |
| [cable-row-seated-narrow-grip](cable-row-seated-narrow-grip.md) | extra-data.js | standard：ready |
| [cable-single-arm-row](cable-single-arm-row.md) | 建议新增 | standard：blocked-evidence |
| [cable-standing-chest-press](cable-standing-chest-press.md) | 建议新增 | standard：blocked-evidence |
| [calf-raise-in-leg-press](calf-raise-in-leg-press.md) | extra-data.js | angled-permission-pending：blocked-evidence；horizontal-permission-pending：blocked-evidence |
| [dead-bug](dead-bug.md) | 建议新增 | standard：ready |
| [decline-bench-crunch](decline-bench-crunch.md) | 建议新增 | standard：blocked-evidence |
| [dumbbell-bench-press](dumbbell-bench-press.md) | 建议新增 | standard：blocked-evidence |
| [dumbbell-curl](dumbbell-curl.md) | 建议新增 | standard：ready |
| [dumbbell-hammer-curl](dumbbell-hammer-curl.md) | 建议新增 | standard：ready |
| [dumbbell-lateral-raise](dumbbell-lateral-raise.md) | 建议新增 | standard：ready |
| [dumbbell-one-arm-row](dumbbell-one-arm-row.md) | 建议新增 | standard：blocked-evidence |
| [dumbbell-rdl](dumbbell-rdl.md) | 建议新增 | standard：ready |
| [face-pull](face-pull.md) | extra-data.js | standard：blocked-evidence |
| [glute-bridge](glute-bridge.md) | 建议新增 | standard：ready |
| [goblet-squat](goblet-squat.md) | 建议新增 | standard：ready |
| [hack-squat](hack-squat.md) | 建议新增 | standard：blocked-evidence |
| [hip-abduction-machine](hip-abduction-machine.md) | extra-data.js | abduction-mode：blocked-evidence |
| [hip-adduction-machine](hip-adduction-machine.md) | 建议新增 | adduction-mode：blocked-evidence |
| [lat-pulldown-with-pronated-grip](lat-pulldown-with-pronated-grip.md) | extra-data.js | standard：blocked-evidence |
| [lateral-raise-machine](lateral-raise-machine.md) | extra-data.js | standard：blocked-evidence |
| [leg-curl-seated](leg-curl-seated.md) | data.js | a-seated-curl：blocked-evidence；b-seated-curl：blocked-evidence |
| [leg-extension-seated](leg-extension-seated.md) | data.js | a-extension：blocked-evidence；b-extension：blocked-evidence |
| [leg-press](leg-press.md) | data.js | angled-plate-loaded：blocked-evidence；horizontal-selectorized：blocked-evidence |
| [machine-chest-fly](machine-chest-fly.md) | data.js | standard：ready |
| [machine-chest-press](machine-chest-press.md) | data.js | standard：blocked-evidence |
| [machine-glute-extension](machine-glute-extension.md) | 建议新增 | standard：blocked-evidence |
| [machine-reverse-fly](machine-reverse-fly.md) | 建议新增 | standard：blocked-evidence |
| [machine-shoulder-press](machine-shoulder-press.md) | extra-data.js | standard：blocked-evidence |
| [overhead-tricep-extension-lower-position](overhead-tricep-extension-lower-position.md) | extra-data.js | standard：blocked-evidence |
| [pallof-press](pallof-press.md) | extra-data.js | standard：blocked-evidence |
| [plank](plank.md) | 建议新增 | standard：ready |
| [plate-loaded-incline-chest-press](plate-loaded-incline-chest-press.md) | 建议新增 | standard：blocked-evidence |
| [plate-loaded-lat-pulldown](plate-loaded-lat-pulldown.md) | 建议新增 | standard：blocked-evidence |
| [plate-loaded-lying-chest-press](plate-loaded-lying-chest-press.md) | 建议新增 | standard：blocked-evidence |
| [plate-loaded-seated-row](plate-loaded-seated-row.md) | 建议新增 | standard：blocked-evidence |
| [prone-leg-curl](prone-leg-curl.md) | 建议新增 | standard：ready |
| [reverse-cable-fly](reverse-cable-fly.md) | extra-data.js | standard：blocked-evidence |
| [reverse-hyper](reverse-hyper.md) | 建议新增 | standard：blocked-evidence |
| [roman-chair-hip-extension](roman-chair-hip-extension.md) | 建议新增 | standard：ready |
| [seated-dip-machine](seated-dip-machine.md) | 建议新增 | standard：blocked-evidence |
| [seated-machine-row](seated-machine-row.md) | extra-data.js | standard：blocked-evidence |
| [stair-climber](stair-climber.md) | 建议新增 | standard：blocked-evidence |
| [straight-arm-lat-pulldown](straight-arm-lat-pulldown.md) | extra-data.js | standard：blocked-evidence |
| [t-bar-row-unsupported](t-bar-row-unsupported.md) | 建议新增 | standard：ready |
| [triceps-pushdown-with-rope](triceps-pushdown-with-rope.md) | extra-data.js | standard：blocked-evidence |
| [weighted-back-extension](weighted-back-extension.md) | 建议新增 | standard：blocked-evidence |

修改任何动作后同步_catalog.json与工作计划，运行 `node tools/verify-image-workflow.cjs`。校验不需要本地实拍，但实际执行必须先检查每张来源存在并打开核对。
