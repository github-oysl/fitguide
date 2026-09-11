# 动作教学图提示词索引

生成、迁移或恢复图片任务时，先读 [通用流程](../../image-generation-workflow.md)。当前规范为v2：**发力图先生成并由代理验收，再生成其余图片，全套复检，失败图最多修正两次**。

- [通用模板](_TEMPLATE.md) · [完整样例](lat-pulldown-with-pronated-grip.md)
- [素材规格](../../image-generation-prompts.md) · [注意事项](../../image-generation-notes.md) · [逐动作工作计划](../../image-generation-plan.md)
- [器械与照片对应](../photo-audit/equipment-inventory.md) · [动作映射](../photo-audit/exercise-catalog.md)

仅声明“提示词版本：2”的文件已迁移。其他动作可能仍是旧海报式或无图内指导版本，作为核对底稿使用，先迁移再出图。下表“关键图/错误图”的勾选仅代表旧稿存在，不代表生成或验收完成；现行状态以工作计划为准。动作数量以目录枚举，网页数量以运行时数据为准。

## 动作清单

| 动作 ID | 中文名 | 实拍器械 | 适配状态 | 核对结论 | 关键图 | 错误图 |
|---|---|---|---|---|---|---|
| `lat-pulldown-with-pronated-grip` | 正握高位下拉 | E02 | 可直接教学 | ⚠️ 补次要肌群与错误 | ✅ | ✅ |
| `cable-row-seated-narrow-grip` | 窄握坐姿划船 | E01 | 可直接教学 | ✅ 正确，补次要肌群 | ✅ | ✅ |
| `seated-machine-row` | 坐姿固定划船 | E20 | 条件适用（胸托待核） | ❓ 支撑垫身份待确认 | ✅ | ✅ |
| `plate-loaded-lat-pulldown` | 挂片杠杆高位下拉 | E14 | 条件适用 | ❓ 轨迹/握法待铭牌确认 | ✅ | ✅ |
| `plate-loaded-seated-row` | 挂片分动坐姿划船 | E20 | 建议新增 | ❓ 支撑垫待现场核对 | ✅ | ✅ |
| `t-bar-row-unsupported` | 俯身 T 杠划船（无胸托） | E08 | 建议新增 | ✅ 方向正确 | ✅ | ✅ |
| `cable-chest-fly` | 站姿绳索夹胸 | E03 | 条件适用 | ⚠️ 补次要肌群与错误 | ✅ | ✅ |
| `cable-incline-chest-fly` | 上斜绳索夹胸 | E03＋可调凳 | 条件适用（凳待确认） | ❓ 凳具与角度 | ✅ | ✅ |
| `straight-arm-lat-pulldown` | 直臂下压 | E03 | 条件适用 | ✅ 补次要肌群 | ✅ | ✅ |
| `reverse-cable-fly` | 绳索反向飞鸟 | E03 | 条件适用 | ✅ 补肩袖/错误 | ✅ | ✅ |
| `cable-lateral-raise` | 单臂绳索侧平举 | E03 | 条件适用 | ✅ 补错误项 | ✅ | ✅ |
| `face-pull` | 绳索面拉 | E03 | 条件适用 | ⚠️ 外旋肌群定位 + 错误 | ✅ | ✅ |
| `cable-curl-with-bar` | 直杆绳索弯举 | E03 | 条件适用 | ✅ 补前臂/错误 | ✅ | ✅ |
| `cable-curl-with-rope` | 绳索锤式弯举 | E03 | 条件适用 | ✅ 补顶端分开绳端 | ✅ | ✅ |
| `triceps-pushdown-with-rope` | 绳索下压 | E03 | 条件适用 | ✅ 补错误项 | ✅ | ✅ |
| `overhead-tricep-extension-lower-position` | 低位绳索过顶臂屈伸 | E03 | 条件适用 | ✅ 补错误项 | ✅ | ✅ |
| `cable-crunch` | 跪姿绳索卷腹 | E03 | 条件适用 | ✅ 补错误项 | ✅ | ✅ |
| `pallof-press` | Pallof 抗旋转推 | E03 | 条件适用 | ✅ 补错误项 | ✅ | ✅ |
| `machine-chest-press` | 坐姿推胸机 | E21/E22 待定 | 待现场核对（通用机型示意） | ❓ 子型未定 | 通用 | 通用 |
| `machine-shoulder-press` | 坐姿推肩机 | E15/E21 待定 | 待现场核对（通用机型示意） | ❓ 子型未定 | 通用 | 通用 |
| `machine-chest-fly` | 器械夹胸（长臂把手） | E19 | 可直接教学 | ⚠️ 删「前臂垫」混写、删喙肱肌 | ✅ | ✅ |
| `plate-loaded-lying-chest-press` | 平卧挂片推胸 | E22 | 建议新增 | ❓ 进入/退出与握位待核 | ✅ | ✅ |
| `lateral-raise-machine` | 固定器械侧平举 | 无清晰对应 | 待现场核对（通用机型示意） | ❓ 本批无对应机型 | 通用 | 通用 |
| `assisted-pull-up` | 辅助引体向上 | E11 | 建议新增 | ✅ 配重＝辅助，越大越易 | ✅ | ✅ |
| `assisted-dip` | 辅助双杠臂屈伸 | E11 | 建议新增 | ✅ 配重＝辅助 | ✅ | ✅ |
| `leg-press` | 腿举机 | E04 / E09 | 条件适用（两机型须分开） | ⚠️ 拆水平/斜轨变式 | ✅（按 E09） | ✅（按 E09） |
| `leg-extension-seated` | 坐姿腿屈伸 | E25 | 条件适用 | ✅ 补错误项 | ✅ | ✅ |
| `leg-curl-seated` | 坐姿腿弯举 | E25 | 条件适用（B 实例待核） | ✅ 补错误项，勿混俯卧 | ✅ | ✅ |
| `prone-leg-curl` | 俯卧腿弯举 | E24 | 建议新增 | ✅ 建议新增数据 | ✅ | ✅ |
| `hack-squat` | 哈克深蹲 | E10 | 建议新增 | ✅ 限位按原机核对 | ✅ | ✅ |
| `hip-abduction-machine` | 坐姿髋外展 | E23 | 可直接教学 | ⚠️ 次要肌群修正 | ✅ | ✅ |
| `hip-adduction-machine` | 坐姿髋内收 | E23 | 建议新增 | ✅ 与髋外展分列 | ✅ | ✅ |
| `machine-glute-extension` | 器械髋伸展/后蹬 | E26 | 待现场核对（通用机型示意） | ❓ 摆位未确认 | 通用 | 通用 |
| `stair-climber` | 楼梯机连续踏阶 | E05 | 建议新增 | ⚠️ 补剂量与启停设置 | ✅ | ✅ |
| `decline-bench-crunch` | 下斜凳卷腹 | E06 | 建议新增 | ⚠️ 区分卷腹/仰卧起坐 | ✅ | ✅ |
| `roman-chair-hip-extension` | 罗马椅髋主导背伸展 | E07 | 建议新增 | ⚠️ 按实际倾角描述 | ✅ | ✅ |
| `calf-raise-in-leg-press` | 腿举机提踵 | E04 / E09 | 待器械确认（**不出图**） | ❓ 机型是否允许提踵未证实 | — | — |

### 第二批 · 新增与补充（本批多为「建议新增」，尚无网页数据）

| 动作 ID | 中文名 | 实拍器械 | 适配状态 | 核对结论 | 关键图 | 错误图 |
|---|---|---|---|---|---|---|
| `plate-loaded-incline-chest-press` | 挂片上斜推胸 | E21 | 待现场核对（通用机型示意） | ❓ 须先排除推肩 | 通用 | 通用 |
| `machine-reverse-fly` | 器械反向飞鸟 | E19 | 条件适用（需后束模式） | ❓ 模式待核 | ✅ | ✅ |
| `seated-dip-machine` | 坐姿臂屈伸/下压 | E12 | 待器械确认（**不出图**） | ❓ 身份仅中概率 | — | — |
| `cable-standing-chest-press` | 站姿绳索推胸 | E03 | 条件适用（需手柄） | ❓ 附件待核 | ✅ | ✅ |
| `cable-single-arm-row` | 站姿单臂绳索划船 | E03 | 条件适用（需单手柄） | ❓ 附件待核 | ✅ | ✅ |
| `cable-pull-through` | 绳索胯下拉 | E03 | 条件适用（需绳把） | ❓ 附件待核 | ✅ | ✅ |
| `cable-hip-extension` | 绳索髋伸展/后踢 | E03 | 条件适用（需合格踝带） | ❓ 踝带未确认 | ✅ | ✅ |
| `weighted-back-extension` | 负重背伸展 | E07 | 条件适用 | ⚠️ 肌群定位与髋主导统一 | ✅ | ✅ |
| `reverse-hyper` | 反向背伸展 | E07 | 条件适用 | ❓ 摆位/承重待核 | ✅ | ✅ |
| `dumbbell-curl` | 哑铃弯举 | B01 | 可直接教学 | ✅ 档位现场自选 | ✅ | ✅ |
| `dumbbell-hammer-curl` | 哑铃锤式弯举 | B01 | 可直接教学 | ✅ 档位现场自选 | ✅ | ✅ |
| `dumbbell-lateral-raise` | 哑铃侧平举 | B01 | 可直接教学 | ✅ 宁轻勿重 | ✅ | ✅ |
| `goblet-squat` | 高脚杯深蹲 | B01 | 可直接教学 | ✅ | ✅ | ✅ |
| `dumbbell-rdl` | 哑铃罗马尼亚硬拉 | B01 | 可直接教学 | ✅ 髋铰链，非深蹲 | ✅ | ✅ |
| `dumbbell-bench-press` | 哑铃卧推 | B01+B02 | 条件适用（需稳定凳） | ❓ 凳面/承重待核 | ✅ | ✅ |
| `dumbbell-one-arm-row` | 单臂哑铃划船 | B01+B02 | 条件适用（需稳定凳） | ❓ 凳稳定待核 | ✅ | ✅ |
| `barbell-squat` | 杠铃深蹲 | B03 | 待现场核对（通用机型示意） | ❓ 自由杠/导轨待核 | 通用 | 通用 |
| `barbell-romanian-deadlift` | 杠铃罗马尼亚硬拉 | B03 | 待现场核对（通用机型示意） | ❓ | 通用 | 通用 |
| `barbell-bench-press` | 杠铃卧推 | B03+E17 | 待现场核对（通用机型示意） | ❓ 架型/保护杠待核 | 通用 | 通用 |
| `barbell-overhead-press` | 杠铃站姿推举 | B03 | 待现场核对（通用机型示意） | ❓ 净空/安全架待核 | 通用 | 通用 |
| `barbell-row` | 杠铃俯身划船 | B03 | 待现场核对（通用机型示意） | ❓ | 通用 | 通用 |
| `plank` | 平板支撑 | 无器械 | 可直接教学 | ✅ | ✅ | ✅ |
| `dead-bug` | 死虫式 | 无器械 | 可直接教学 | ✅ | ✅ | ✅ |
| `glute-bridge` | 臀桥 | 无器械 | 可直接教学 | ✅ | ✅ | ✅ |

## 证据与使用规则

表中的“通用机型示意”“可直接教学”“条件适用”为原内容盘点状态，不构成现场出图放行。关键器械身份、附件、模式或支撑未知时按通用流程标记blocked-evidence；通用概念草稿不能作为本馆机型图片交付。

- E04/E09 提踵与 E12 下压：保留暂不出图；先核对原机允许用途。
- E13/E15/E16/E18/E21 等不明确用途/子型：先补证，不由动作名反推机型。
- E17/B03 架与凳、E19 后束模式、E23/E25切换、E26摆位：分别验证。
- E03附件、B01哑铃及B02凳：逐个动作确认需要的配置。
- E02参考照片19＋20；E14挂片下拉不可混用。
- 无器械/静态/有氧动作按模板适配，不能捏造空机或重复阶段。

运行 `node tools/verify-image-workflow.cjs` 检查迁移状态与队列覆盖。详细步骤和完成条件统一见通用流程，图内箭头、短标签及口令按素材规格保留。
