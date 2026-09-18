# 动作视频映射说明

机器可读源：[`assets/media-map.json`](../assets/media-map.json)。重构时只读该文件，不要再扫目录猜 3D 是否可用。

更新日期：2026-09-18

## 怎么用

```text
exercises[id].real.status
  trimmed | replaced  → 用 real.path / real.cover（约 9 秒循环）
  needs_source        → 真人整片仍是错动作，不要当标准示范

exercises[id].d3.status
  ok | variant        → 用 d3.path / d3.cover，可开 3D 开关
  unbound             → 不要挂 3D（合集里切不出对应动作）
```

variant 表示器械或体位是近亲（例如辅助引体用了无辅助引体），可以播，但文案要标明差异。

## 数量

- 动作 60 个
- 真人已裁切/换源 54 个
- 真人仍缺正确源 6 个
- 3D 已绑定 38 个
- 3D 未绑定 22 个

## 状态一览

| ID | 名称 | 真人 | 秒 | 3D | 秒 | 说明 |
|---|---|---|---:|---|---:|---|
| `assisted-dip` | 辅助双杠臂屈伸 | trimmed | 8.98 | variant | 8.0 | 3D：徒手双杠，非辅助机 |
| `assisted-pull-up` | 辅助引体向上 | trimmed | 8.98 | variant | 8.0 | 3D：无辅助引体，非辅助机 |
| `barbell-bench-press` | 杠铃卧推 | trimmed | 9.01 | ok | 8.0 |  |
| `barbell-overhead-press` | 杠铃站姿推举 | trimmed | 8.98 | ok | 8.0 |  |
| `barbell-romanian-deadlift` | 杠铃罗马尼亚硬拉 | replaced | 9.01 | unbound | - | 真人：换源；已换 YouTube 源；3D：罗马尼亚硬拉.mp4 实际是哑铃 RDL |
| `barbell-row` | 杠铃俯身划船 | trimmed | 8.98 | ok | 8.0 | 3D：合集第二项杠铃俯身划船 |
| `barbell-squat` | 杠铃深蹲 | trimmed | 9.01 | ok | 7.5 |  |
| `cable-chest-fly` | 站姿绳索夹胸 | trimmed | 9.01 | ok | 7.0 | 3D：4x12 循环段 |
| `cable-crunch` | 跪姿绳索卷腹 | trimmed | 9.01 | ok | 8.0 |  |
| `cable-curl-with-bar` | 直杆绳索弯举 | trimmed | 9.01 | ok | 8.0 | 3D：直杆段 |
| `cable-curl-with-rope` | 绳索锤式弯举 | trimmed | 9.01 | ok | 8.0 | 3D：绳附件段 |
| `cable-hip-extension` | 绳索髋伸展／后踢 | needs_source | 45.3 | unbound | - | 真人：原片是跪姿绳索三头臂屈伸；3D：T杆腿部训练.mp4 是 T 杆深蹲 |
| `cable-incline-chest-fly` | 上斜绳索夹胸 | replaced | 8.98 | ok | 6.5 | 真人：原片与站姿夹胸相同；已换 YouTube 源；3D：上胸/低到高夹胸 |
| `cable-lateral-raise` | 单臂绳索侧平举 | trimmed | 9.01 | ok | 10.0 | 3D：单臂绳索侧平举 |
| `cable-pull-through` | 绳索胯下拉 | needs_source | 34.78 | unbound | - | 真人：匹配记录指向后束飞鸟，整片不可当作胯下拉；3D：无对应 3D 源 |
| `cable-row-seated-narrow-grip` | 窄握坐姿划船 | trimmed | 9.01 | ok | 10.0 | 3D：窄握/对握坐姿划船 |
| `cable-single-arm-row` | 站姿单臂绳索划船 | needs_source | 29.88 | variant | 6.0 | 真人：原片是单臂侧平举；3D：坐姿单手划船，非站姿 |
| `cable-standing-chest-press` | 站姿绳索推胸 | trimmed | 8.98 | unbound | - | 3D：绳索夹胸.mp4 不是推胸 |
| `calf-raise-in-leg-press` | 腿举机提踵 | trimmed | 8.98 | unbound | - | 3D：无对应 3D 源 |
| `dead-bug` | 死虫式 | trimmed | 8.98 | unbound | - | 3D：腹肌版训练.mp4 是下斜仰卧起坐 |
| `decline-bench-crunch` | 下斜凳卷腹 | trimmed | 8.97 | ok | 7.0 | 3D：下斜仰卧起坐 |
| `dumbbell-bench-press` | 哑铃卧推 | trimmed | 8.98 | ok | 7.0 |  |
| `dumbbell-curl` | 哑铃弯举 | trimmed | 9.01 | ok | 8.0 | 真人：源片是牧师凳弯举，不是站姿弯举 |
| `dumbbell-hammer-curl` | 哑铃锤式弯举 | trimmed | 9.01 | unbound | - | 3D：二头弯举.mp4 是牧师凳弯举 |
| `dumbbell-lateral-raise` | 哑铃侧平举 | trimmed | 9.01 | ok | 12.0 | 3D：哑铃侧平举正确循环 |
| `dumbbell-one-arm-row` | 单臂哑铃划船 | trimmed | 9.01 | ok | 7.0 |  |
| `dumbbell-rdl` | 哑铃罗马尼亚硬拉 | needs_source | 46.49 | ok | 12.0 | 真人：原片与杠铃 RDL 相同；3D：该源其实是哑铃 RDL |
| `face-pull` | 绳索面拉 | trimmed | 8.98 | ok | 8.0 |  |
| `glute-bridge` | 臀桥 | trimmed | 9.01 | variant | 8.0 | 3D：杠铃臀推靠凳，非地板臀桥 |
| `goblet-squat` | 高脚杯深蹲 | trimmed | 8.97 | ok | 7.5 |  |
| `hack-squat` | 哈克深蹲 | trimmed | 8.98 | unbound | - | 3D：无对应 3D 源 |
| `hip-abduction-machine` | 坐姿髋外展 | trimmed | 8.97 | ok | 7.5 | 3D：坐姿髋外展机收尾段 |
| `hip-adduction-machine` | 坐姿髋内收 | trimmed | 9.01 | unbound | - | 3D：无对应 3D 源 |
| `lat-pulldown-with-pronated-grip` | 正握高位下拉 | trimmed | 8.97 | ok | 14.0 | 3D：正确下拉循环 |
| `lateral-raise-machine` | 固定器械侧平举 | trimmed | 9.01 | unbound | - | 3D：合集中无固定侧平举机 |
| `leg-curl-seated` | 坐姿腿弯举 | trimmed | 8.98 | unbound | - | 3D：股二头肌弯举.mp4 是俯卧 |
| `leg-extension-seated` | 坐姿腿屈伸 | trimmed | 8.98 | ok | 7.5 |  |
| `leg-press` | 腿举机 | trimmed | 9.01 | ok | 7.0 |  |
| `machine-chest-fly` | 蝴蝶机夹胸 | trimmed | 9.01 | ok | 7.5 |  |
| `machine-chest-press` | 坐姿推胸机 | needs_source | 34.53 | unbound | - | 真人：原片是平卧挂片推胸；3D：胸部动作合集无坐姿推胸机 |
| `machine-glute-extension` | 器械髋伸展／后蹬 | trimmed | 9.01 | unbound | - | 3D：臀部合集无后蹬机 |
| `machine-reverse-fly` | 器械反向飞鸟 | trimmed | 8.98 | ok | 9.0 | 3D：蝴蝶机反向飞鸟 |
| `machine-shoulder-press` | 坐姿推肩机 | trimmed | 9.01 | ok | 7.5 | 3D：坐姿器械推肩，优于史密斯源 |
| `overhead-tricep-extension-lower-position` | 低位绳索过顶臂屈伸 | trimmed | 8.97 | ok | 8.0 |  |
| `pallof-press` | Pallof 抗旋转推 | trimmed | 9.01 | unbound | - | 3D：无对应 3D 源 |
| `plank` | 平板支撑 | trimmed | 9.01 | ok | 8.0 |  |
| `plate-loaded-incline-chest-press` | 挂片上斜推胸 | trimmed | 8.98 | unbound | - | 3D：史密斯训练合集不是挂片上斜推 |
| `plate-loaded-lat-pulldown` | 挂片杠杆高位下拉 | trimmed | 8.97 | unbound | - | 3D：高位下拉.mp4 是绳索下拉 |
| `plate-loaded-lying-chest-press` | 平卧挂片推胸 | trimmed | 8.98 | unbound | - | 3D：杠铃卧推.mp4 不是挂片机 |
| `plate-loaded-seated-row` | 挂片分动坐姿划船 | needs_source | 42.42 | unbound | - | 真人：原片与窄握绳索划船相同；3D：坐姿划船.mp4 是绳索划船 |
| `prone-leg-curl` | 俯卧腿弯举 | trimmed | 8.97 | ok | 10.5 | 3D：整段是俯卧弯举 |
| `reverse-cable-fly` | 绳索反向飞鸟 | trimmed | 8.97 | unbound | - | 3D：哑铃飞鸟.mp4 不是绳索 |
| `reverse-hyper` | 反向背伸展 | trimmed | 9.01 | unbound | - | 3D：山羊挺背不是反向背伸机 |
| `roman-chair-hip-extension` | 罗马椅髋主导背伸展 | trimmed | 9.01 | ok | 6.0 | 3D：罗马椅正确髋伸 |
| `seated-dip-machine` | 坐姿臂屈伸／下压 | trimmed | 9.01 | unbound | - | 3D：徒手臂屈伸是凳上臂屈伸 |
| `seated-machine-row` | 坐姿固定划船 | trimmed | 8.98 | unbound | - | 3D：坐姿划船.mp4 是绳索不是固定胸托机 |
| `straight-arm-lat-pulldown` | 直臂下压 | trimmed | 8.98 | ok | 8.5 | 3D：直臂下压 |
| `t-bar-row-unsupported` | 俯身 T 杠划船（无胸托） | replaced | 9.01 | ok | 7.0 | 真人：原片是胸托划船机；已换 YouTube 源；3D：无胸托正确循环 |
| `triceps-pushdown-with-rope` | 绳索下压 | trimmed | 9.01 | ok | 8.0 |  |
| `weighted-back-extension` | 负重背伸展 | trimmed | 9.01 | variant | 5.5 | 3D：罗马椅无配重画面 |

## 仍缺正确真人源

这 6 个动作的 `assets/{id}.mp4` **没有覆盖**（避免把错动作裁短后看起来像完成了）：

- `cable-hip-extension` 绳索髋伸展／后踢 — 原片是跪姿绳索三头臂屈伸
- `cable-pull-through` 绳索胯下拉 — 匹配记录指向后束飞鸟，整片不可当作胯下拉
- `cable-single-arm-row` 站姿单臂绳索划船 — 原片是单臂侧平举
- `dumbbell-rdl` 哑铃罗马尼亚硬拉 — 原片与杠铃 RDL 相同
- `machine-chest-press` 坐姿推胸机 — 原片是平卧挂片推胸
- `plate-loaded-seated-row` 挂片分动坐姿划船 — 原片与窄握绳索划船相同

## 3D 未绑定

磁盘上可能还留着旧合集文件，**新代码不要读**。以本表 `unbound` 为准。

- `barbell-romanian-deadlift` 杠铃罗马尼亚硬拉 — 罗马尼亚硬拉.mp4 实际是哑铃 RDL
- `cable-hip-extension` 绳索髋伸展／后踢 — T杆腿部训练.mp4 是 T 杆深蹲
- `cable-pull-through` 绳索胯下拉 — 无对应 3D 源
- `cable-standing-chest-press` 站姿绳索推胸 — 绳索夹胸.mp4 不是推胸
- `calf-raise-in-leg-press` 腿举机提踵 — 无对应 3D 源
- `dead-bug` 死虫式 — 腹肌版训练.mp4 是下斜仰卧起坐
- `dumbbell-hammer-curl` 哑铃锤式弯举 — 二头弯举.mp4 是牧师凳弯举
- `hack-squat` 哈克深蹲 — 无对应 3D 源
- `hip-adduction-machine` 坐姿髋内收 — 无对应 3D 源
- `lateral-raise-machine` 固定器械侧平举 — 合集中无固定侧平举机
- `leg-curl-seated` 坐姿腿弯举 — 股二头肌弯举.mp4 是俯卧
- `machine-chest-press` 坐姿推胸机 — 胸部动作合集无坐姿推胸机
- `machine-glute-extension` 器械髋伸展／后蹬 — 臀部合集无后蹬机
- `pallof-press` Pallof 抗旋转推 — 无对应 3D 源
- `plate-loaded-incline-chest-press` 挂片上斜推胸 — 史密斯训练合集不是挂片上斜推
- `plate-loaded-lat-pulldown` 挂片杠杆高位下拉 — 高位下拉.mp4 是绳索下拉
- `plate-loaded-lying-chest-press` 平卧挂片推胸 — 杠铃卧推.mp4 不是挂片机
- `plate-loaded-seated-row` 挂片分动坐姿划船 — 坐姿划船.mp4 是绳索划船
- `reverse-cable-fly` 绳索反向飞鸟 — 哑铃飞鸟.mp4 不是绳索
- `reverse-hyper` 反向背伸展 — 山羊挺背不是反向背伸机
- `seated-dip-machine` 坐姿臂屈伸／下压 — 徒手臂屈伸是凳上臂屈伸
- `seated-machine-row` 坐姿固定划船 — 坐姿划船.mp4 是绳索不是固定胸托机

## 处理脚本

```bash
python tools/process-exercise-media.py analyze
python tools/build-media-cuts.py
python tools/process-exercise-media.py apply
python tools/process-exercise-media.py map
```

