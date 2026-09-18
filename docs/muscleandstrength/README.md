# Muscle & Strength 动作库资源与教程全量镜像

本目录包含从 [Muscle & Strength](https://www.muscleandstrength.com/exercises) 全量抓取的动作资源、视频教程、动作解析与要领，以及与当前健身房实测器械和动作系统的完整映射。

## 数据集概览

- **总动作教程条目**：`1219` 篇完整图文与视频指南
- **视频覆盖率**：`100%`（全量配有专业 YouTube / 嵌入式演示视频）
- **详细动作步骤覆盖**：`1218 / 1219`
- **专业发力 Tips 覆盖**：`1151 / 1219`
- **健身房已识别动作匹配**：`61` 个本地工位/动作均已建立专属对照与 Markdown 教程


## 本地媒体资源现状（方案 A 已就绪）

* **高清动作封面原图**：`1,195` 张（保存在 `media/images/covers/`，总计约 81.1 MB）
* **肌肉解剖示意图**：`19` 张（保存在 `media/images/anatomy/`，总计约 0.8 MB）
* **健身房识别动作 720p 视频**：`60` 部（保存在 `media/videos/`，总计约 424.8 MB）
* **全量视频归档待办方案**：详见 [PLAN_B_TODO.md](PLAN_B_TODO.md)（含全站 1,219 视频全量下载脚本与压制指南）

## 目录结构

```text
docs/muscleandstrength/
├── README.md                 # 总体索引、器械对照表与使用说明（本文件）
├── all_exercises.json        # 全站 1,219 个动作的完整结构化主数据库
├── gym_matched.json          # 健身房现有 60+ 动作/器械与 M&S 教程的精确映射库
├── exercises/                # 1,219 个独立动作的 JSON 原始结构档案（每动作一档）
├── by_equipment/             # 按器械分类的子数据库（Cable, Machine, Dumbbell 等）
├── by_muscle/                # 按目标肌群分类的子数据库（Chest, Back, Quads 等）
└── tutorials/                # 健身房动作专属图文 Markdown 教程库（中英双语、带步骤与发力口令）
```

## 器械分类资源统计

| 器械大类 | 包含动作数 | 对应本地 JSON 文件 |
|---|---|---|
| **Dumbbell** | 230 | [`by_equipment/dumbbell.json`](by_equipment/dumbbell.json) |
| **Bodyweight** | 206 | [`by_equipment/bodyweight.json`](by_equipment/bodyweight.json) |
| **Barbell** | 185 | [`by_equipment/barbell.json`](by_equipment/barbell.json) |
| **Cable** | 134 | [`by_equipment/cable.json`](by_equipment/cable.json) |
| **Machine** | 105 | [`by_equipment/machine.json`](by_equipment/machine.json) |
| **Kettle Bells** | 73 | [`by_equipment/kettle_bells.json`](by_equipment/kettle_bells.json) |
| **Bands** | 49 | [`by_equipment/bands.json`](by_equipment/bands.json) |
| **Exercise Ball** | 27 | [`by_equipment/exercise_ball.json`](by_equipment/exercise_ball.json) |
| **Other** | 27 | [`by_equipment/other.json`](by_equipment/other.json) |
| **Medicine Ball** | 23 | [`by_equipment/medicine_ball.json`](by_equipment/medicine_ball.json) |
| **Rope** | 16 | [`by_equipment/rope.json`](by_equipment/rope.json) |
| **Sled** | 15 | [`by_equipment/sled.json`](by_equipment/sled.json) |
| **Foam Roll** | 14 | [`by_equipment/foam_roll.json`](by_equipment/foam_roll.json) |
| **EZ Bar** | 14 | [`by_equipment/ez_bar.json`](by_equipment/ez_bar.json) |
| **Landmine** | 13 | [`by_equipment/landmine.json`](by_equipment/landmine.json) |
| **Box** | 12 | [`by_equipment/box.json`](by_equipment/box.json) |
| **Jump Rope** | 11 | [`by_equipment/jump_rope.json`](by_equipment/jump_rope.json) |
| **Lacrosse Ball** | 11 | [`by_equipment/lacrosse_ball.json`](by_equipment/lacrosse_ball.json) |
| **Trap Bar** | 11 | [`by_equipment/trap_bar.json`](by_equipment/trap_bar.json) |
| **Chains** | 9 | [`by_equipment/chains.json`](by_equipment/chains.json) |
| **Tiger Tail** | 8 | [`by_equipment/tiger_tail.json`](by_equipment/tiger_tail.json) |
| **Bench** | 7 | [`by_equipment/bench.json`](by_equipment/bench.json) |
| **Rings** | 7 | [`by_equipment/rings.json`](by_equipment/rings.json) |
| **Valslide** | 6 | [`by_equipment/valslide.json`](by_equipment/valslide.json) |
| **Hip Thruster** | 3 | [`by_equipment/hip_thruster.json`](by_equipment/hip_thruster.json) |
| **Fat Bar** | 1 | [`by_equipment/fat_bar.json`](by_equipment/fat_bar.json) |
| **Safety Bar** | 1 | [`by_equipment/safety_bar.json`](by_equipment/safety_bar.json) |
| **Tire** | 1 | [`by_equipment/tire.json`](by_equipment/tire.json) |


## 目标肌群分类资源统计

| 肌群分类 | 包含动作数 | 对应本地 JSON 文件 |
|---|---|---|
| **Quads** | 190 | [`by_muscle/quads.json`](by_muscle/quads.json) |
| **Shoulders** | 176 | [`by_muscle/shoulders.json`](by_muscle/shoulders.json) |
| **Chest** | 131 | [`by_muscle/chest.json`](by_muscle/chest.json) |
| **Abs** | 116 | [`by_muscle/abs.json`](by_muscle/abs.json) |
| **Triceps** | 106 | [`by_muscle/triceps.json`](by_muscle/triceps.json) |
| **Biceps** | 77 | [`by_muscle/biceps.json`](by_muscle/biceps.json) |
| **Hamstrings** | 74 | [`by_muscle/hamstrings.json`](by_muscle/hamstrings.json) |
| **Calves** | 62 | [`by_muscle/calves.json`](by_muscle/calves.json) |
| **Upper Back** | 60 | [`by_muscle/upper_back.json`](by_muscle/upper_back.json) |
| **Lats** | 56 | [`by_muscle/lats.json`](by_muscle/lats.json) |
| **Forearms** | 55 | [`by_muscle/forearms.json`](by_muscle/forearms.json) |
| **Glutes** | 43 | [`by_muscle/glutes.json`](by_muscle/glutes.json) |
| **Traps** | 30 | [`by_muscle/traps.json`](by_muscle/traps.json) |
| **Obliques** | 16 | [`by_muscle/obliques.json`](by_muscle/obliques.json) |
| **Hip Flexors** | 8 | [`by_muscle/hip_flexors.json`](by_muscle/hip_flexors.json) |
| **Adductors** | 7 | [`by_muscle/adductors.json`](by_muscle/adductors.json) |
| **Lower Back** | 5 | [`by_muscle/lower_back.json`](by_muscle/lower_back.json) |
| **Abductors** | 2 | [`by_muscle/abductors.json`](by_muscle/abductors.json) |
| **Other** | 1 | [`by_muscle/other.json`](by_muscle/other.json) |
| **IT Band** | 1 | [`by_muscle/it_band.json`](by_muscle/it_band.json) |
| **Neck** | 1 | [`by_muscle/neck.json`](by_muscle/neck.json) |
| **Palmar Fascia** | 1 | [`by_muscle/palmar_fascia.json`](by_muscle/palmar_fascia.json) |
| **Plantar Fascia** | 1 | [`by_muscle/plantar_fascia.json`](by_muscle/plantar_fascia.json) |


## 健身房已识别器械与动作对照表

| 健身房动作 ID | 中文名称 | 英文名称 | 对应器械/工位 | 匹配 M&S 教程 | 视频链接 | Markdown 教程 |
|---|---|---|---|---|---|---|
| `assisted-dip` | 辅助双杠臂屈伸 | ASSISTED DIP | E11 辅助引体／双杠臂屈伸机（配重表示辅助，照片 | [Band Assisted Dip](https://www.muscleandstrength.com/exercises/band-assisted-dip) | [视频](https://www.youtube.com/watch?v=qWkMkD6260g) | [`assisted-dip.md`](tutorials/assisted-dip.md) |
| `assisted-pull-up` | 辅助引体向上 | ASSISTED PULL-UP | E11 辅助引体／双杠臂屈伸机（配重表示辅助，照片 | [Resistance Band Assisted Pull Up (From Foot)](https://www.muscleandstrength.com/exercises/band-assisted-pull-up-from-foot) | [视频](https://www.youtube.com/watch?v=JJp7A277PWw) | [`assisted-pull-up.md`](tutorials/assisted-pull-up.md) |
| `barbell-bench-press` | 杠铃卧推 | BARBELL BENCH PRESS | B03 杠铃、杠铃片与深蹲架区域（照片 36 背景 | [Barbell Bench Press](https://www.muscleandstrength.com/exercises/barbell-bench-press.html) | [视频](https://www.youtube.com/watch?v=tuwHzzPdaGc) | [`barbell-bench-press.md`](tutorials/barbell-bench-press.md) |
| `barbell-overhead-press` | 杠铃站姿推举 | BARBELL OVERHEAD PRESS | B03 杠铃、杠铃片与深蹲架区域（照片 36 背景 | [Military Press Behind Neck](https://www.muscleandstrength.com/exercises/military-press-behind-neck.html) | [视频](https://www.youtube.com/watch?v=Ud80UFJ_zxs) | [`barbell-overhead-press.md`](tutorials/barbell-overhead-press.md) |
| `barbell-romanian-deadlift` | 杠铃罗马尼亚硬拉 | BARBELL ROMANIAN DEADLIFT | B03 杠铃、杠铃片与深蹲架区域（照片 36 背景 | [Barbell Sumo Romanian Deadlift](https://www.muscleandstrength.com/exercises/barbell-sumo-romanian-deadlift) | [视频](https://www.youtube.com/watch?v=1J_wFYwv2Dg) | [`barbell-romanian-deadlift.md`](tutorials/barbell-romanian-deadlift.md) |
| `barbell-row` | 杠铃俯身划船 | BARBELL BENT-OVER ROW | B03 杠铃、杠铃片与深蹲架区域（照片 36 背景 | [Bent Over Row](https://www.muscleandstrength.com/exercises/bent-over-barbell-row.html) | [视频](https://www.youtube.com/watch?v=paCfxhgW6bI) | [`barbell-row.md`](tutorials/barbell-row.md) |
| `barbell-squat` | 杠铃深蹲 | BARBELL BACK SQUAT | B03 杠铃、杠铃片与深蹲架区域（照片 36 背景 | [Barbell Quarter Squat](https://www.muscleandstrength.com/exercises/1-4-squat.html) | - | [`barbell-squat.md`](tutorials/barbell-squat.md) |
| `cable-chest-fly` | 站姿绳索夹胸 | STANDING CABLE FLY | E03 可调绳索站（照片 20、22；双滑轮＋两个 | [Standing Cable Fly](https://www.muscleandstrength.com/exercises/cable-crossovers-(mid-chest).html) | [视频](https://www.youtube.com/watch?v=OPYrUGZL8nU) | [`cable-chest-fly.md`](tutorials/cable-chest-fly.md) |
| `cable-crunch` | 跪姿绳索卷腹 | CABLE CRUNCH (KNEELING) | E03 可调绳索站（照片 20、22；高位滑轮＋双 | [Cable Crunch](https://www.muscleandstrength.com/exercises/cable-crunch.html) | - | [`cable-crunch.md`](tutorials/cable-crunch.md) |
| `cable-curl-with-bar` | 直杆绳索弯举 | CABLE CURL WITH BAR | E03 可调绳索站（照片 20、22；低位滑轮＋短 | [Cable Curl](https://www.muscleandstrength.com/exercises/cable-curl.html) | - | [`cable-curl-with-bar.md`](tutorials/cable-curl-with-bar.md) |
| `cable-curl-with-rope` | 绳索锤式弯举 | CABLE HAMMER CURL (ROPE) | E03 可调绳索站（照片 20、22；低滑轮＋双头 | [Cable Curl (Rope Extension)](https://www.muscleandstrength.com/exercises/rope-cable-curl.html) | - | [`cable-curl-with-rope.md`](tutorials/cable-curl-with-rope.md) |
| `cable-hip-extension` | 绳索髋伸展／后踢 | CABLE HIP EXTENSION (KICKBACK) | E03 双侧可调滑轮／绳索训练站（照片 20、22 | [Cable Concentration Tricep Extension](https://www.muscleandstrength.com/exercises/cable-concentration-tricep-extension.html) | - | [`cable-hip-extension.md`](tutorials/cable-hip-extension.md) |
| `cable-incline-chest-fly` | 上斜绳索夹胸 | CABLE INCLINE CHEST FLY | E03 可调绳索站＋B02 独立训练凳（照片 20 | [Standing Cable Fly](https://www.muscleandstrength.com/exercises/cable-crossovers-(mid-chest).html) | [视频](https://www.youtube.com/watch?v=OPYrUGZL8nU) | [`cable-incline-chest-fly.md`](tutorials/cable-incline-chest-fly.md) |
| `cable-lateral-raise` | 单臂绳索侧平举 | CABLE LATERAL RAISE | E03 可调绳索站（照片 20、22；低滑轮＋单手 | [Single Arm Cable Lateral Raise (Crossbody)](https://www.muscleandstrength.com/exercises/one-arm-cable-lateral-raise.html) | [视频](https://www.youtube.com/watch?v=Fv-eAW1uKDI) | [`cable-lateral-raise.md`](tutorials/cable-lateral-raise.md) |
| `cable-pull-through` | 绳索胯下拉 | CABLE PULL-THROUGH | E03 双侧可调滑轮／绳索训练站（照片 20、22 | [Bent Over Low Pulley Rear Delt Fly](https://www.muscleandstrength.com/exercises/bent-over-cable-rear-delt-fly) | [视频](https://www.youtube.com/watch?v=Baavi8rJWBI) | [`cable-pull-through.md`](tutorials/cable-pull-through.md) |
| `cable-row-seated-narrow-grip` | 窄握坐姿划船 | CABLE CLOSE GRIP SEATED ROW | E01 低位坐姿绳索划船工位（照片 18、21；V | [One-Arm Seated Cable Row](https://www.muscleandstrength.com/exercises/one-arm-cable-row.html) | - | [`cable-row-seated-narrow-grip.md`](tutorials/cable-row-seated-narrow-grip.md) |
| `cable-single-arm-row` | 站姿单臂绳索划船 | STANDING SINGLE-ARM CABLE ROW | E03 双侧可调滑轮／绳索训练站（照片 20、22 | [Single Arm Cable Lateral Raise (Crossbody)](https://www.muscleandstrength.com/exercises/one-arm-cable-lateral-raise.html) | [视频](https://www.youtube.com/watch?v=Fv-eAW1uKDI) | [`cable-single-arm-row.md`](tutorials/cable-single-arm-row.md) |
| `cable-standing-chest-press` | 站姿绳索推胸 | CABLE STANDING CHEST PRESS | E03 双侧可调滑轮／绳索训练站（照片 20、22 | [Cable Chest Press](https://www.muscleandstrength.com/exercises/cable-chest-press.html) | [视频](https://www.youtube.com/watch?v=n4CEULDvATA) | [`cable-standing-chest-press.md`](tutorials/cable-standing-chest-press.md) |
| `calf-raise-in-leg-press` | 腿举机提踵 | CALF RAISE IN LEG PRESS | E04 插销配重式卧式／水平蹬腿机（照片 23）、 | [45 Degree Leg Press Calf Raise](https://www.muscleandstrength.com/exercises/45-degress-calf-press.html) | [视频](https://www.youtube.com/watch?v=RcKQbiL-ZOc) | [`calf-raise-in-leg-press.md`](tutorials/calf-raise-in-leg-press.md) |
| `dead-bug` | 死虫式 | DEAD BUG | 无器械（瑜伽垫） | [Dead Bug](https://www.muscleandstrength.com/exercises/dead-bug) | [视频](https://www.youtube.com/watch?v=eEhoSeBFoBk) | [`dead-bug.md`](tutorials/dead-bug.md) |
| `decline-bench-crunch` | 下斜凳卷腹 | DECLINE BENCH CRUNCH | E06 下斜腹肌训练凳（照片 24） | [Decline Bench Cable Crunch](https://www.muscleandstrength.com/exercises/decline-bench-cable-crunch.html) | - | [`decline-bench-crunch.md`](tutorials/decline-bench-crunch.md) |
| `dumbbell-bench-press` | 哑铃卧推 | DUMBBELL BENCH PRESS | B01 哑铃架＋B02 独立训练凳（背景器材，见  | [Dumbbell Bench Press](https://www.muscleandstrength.com/exercises/dumbbell-bench-press.html) | [视频](https://www.youtube.com/watch?v=dGqI0Z5ul4k) | [`dumbbell-bench-press.md`](tutorials/dumbbell-bench-press.md) |
| `dumbbell-curl` | 哑铃弯举 | DUMBBELL CURL | B01 哑铃架（背景器材，见 photo-audi | [Standing Dumbbell Curl](https://www.muscleandstrength.com/exercises/standing-dumbbell-curl.html) | - | [`dumbbell-curl.md`](tutorials/dumbbell-curl.md) |
| `dumbbell-hammer-curl` | 哑铃锤式弯举 | DUMBBELL HAMMER CURL | B01 哑铃架（背景器材，见 photo-audi | [Alternating Dumbbell Hammer Preacher Curl](https://www.muscleandstrength.com/exercises/alternate-dumbbell-hammer-preacher-curl.html) | - | [`dumbbell-hammer-curl.md`](tutorials/dumbbell-hammer-curl.md) |
| `dumbbell-lateral-raise` | 哑铃侧平举 | DUMBBELL LATERAL RAISE | B01 哑铃架（背景器材，见 photo-audi | [Dumbbell Lateral Raise](https://www.muscleandstrength.com/exercises/dumbbell-lateral-raise.html) | - | [`dumbbell-lateral-raise.md`](tutorials/dumbbell-lateral-raise.md) |
| `dumbbell-one-arm-row` | 单臂哑铃划船 | DUMBBELL ONE-ARM ROW | B01 哑铃架＋B02 独立训练凳（背景器材，见  | [One Arm Dumbbell Row](https://www.muscleandstrength.com/exercises/one-arm-dumbbell-row.html) | [视频](https://www.youtube.com/watch?v=YZgVEy6cmaY) | [`dumbbell-one-arm-row.md`](tutorials/dumbbell-one-arm-row.md) |
| `dumbbell-rdl` | 哑铃罗马尼亚硬拉 | DUMBBELL ROMANIAN DEADLIFT | B01 哑铃架（背景器材，见 photo-audi | [Barbell Sumo Romanian Deadlift](https://www.muscleandstrength.com/exercises/barbell-sumo-romanian-deadlift) | [视频](https://www.youtube.com/watch?v=1J_wFYwv2Dg) | [`dumbbell-rdl.md`](tutorials/dumbbell-rdl.md) |
| `face-pull` | 绳索面拉 | FACE PULL | E03 可调绳索站（照片 20、22；面部高度滑轮 | [Standing Banded Face Pull](https://www.muscleandstrength.com/exercises/banded-face-pull) | [视频](https://www.youtube.com/watch?v=qhg8vNYUgsE) | [`face-pull.md`](tutorials/face-pull.md) |
| `glute-bridge` | 臀桥 | GLUTE BRIDGE | 无器械（瑜伽垫） | [Banded Glute Bridge](https://www.muscleandstrength.com/exercises/banded-glute-bridge) | [视频](https://www.youtube.com/watch?v=7ehXSzO2Buw) | [`glute-bridge.md`](tutorials/glute-bridge.md) |
| `goblet-squat` | 高脚杯深蹲 | GOBLET SQUAT | B01 哑铃架（背景器材，见 photo-audi | [Dumbbell Goblet Box Squat](https://www.muscleandstrength.com/exercises/dumbbell-goblet-box-squat) | [视频](https://www.youtube.com/watch?v=zixPVQTuUAA) | [`goblet-squat.md`](tutorials/goblet-squat.md) |
| `hack-squat` | 哈克深蹲 | HACK SQUAT | E10 斜轨哈克深蹲机（照片 28） | [Machine Hack Squat](https://www.muscleandstrength.com/exercises/hack-squat.html) | [视频](https://www.youtube.com/watch?v=63tboDKQksc) | [`hack-squat.md`](tutorials/hack-squat.md) |
| `hip-abduction-machine` | 坐姿髋外展 | HIP ABDUCTION MACHINE | E23 髋内收／外展二合一机（外展模式；照片 43 | [Hip Abduction Machine](https://www.muscleandstrength.com/exercises/hip-abduction-machine.html) | [视频](https://www.youtube.com/watch?v=7pbZA7ncuq8) | [`hip-abduction-machine.md`](tutorials/hip-abduction-machine.md) |
| `hip-adduction-machine` | 坐姿髋内收 | HIP ADDUCTION MACHINE | E23 髋内收／外展二合一机（内收模式；照片 43 | [Hip Adduction Machine](https://www.muscleandstrength.com/exercises/hip-adduction-machine.html) | [视频](https://www.youtube.com/watch?v=Oj7IN952fSg) | [`hip-adduction-machine.md`](tutorials/hip-adduction-machine.md) |
| `lat-pulldown-with-pronated-grip` | 正握高位下拉 | LAT PULLDOWN (PRONATED GRIP) |  | [Overhand Close Grip Lateral Pulldown](https://www.muscleandstrength.com/exercises/overhand-close-grip-lat-pull-down.html) | - | [`lat-pulldown-with-pronated-grip.md`](tutorials/lat-pulldown-with-pronated-grip.md) |
| `lateral-raise-machine` | 固定器械侧平举 | LATERAL RAISE MACHINE | 本批无清晰对应 → 现按通用上臂垫式侧平举机示意（ | [Lateral Raise Machine](https://www.muscleandstrength.com/exercises/machine-lateral-raise.html) | - | [`lateral-raise-machine.md`](tutorials/lateral-raise-machine.md) |
| `leg-curl-seated` | 坐姿腿弯举 | SEATED LEG CURL | E25 腿屈伸／腿弯举双功能器械族（屈膝模式；E2 | [Seated Leg Curl](https://www.muscleandstrength.com/exercises/seated-leg-curl) | [视频](https://www.youtube.com/watch?v=3BWiLFc8Dbg) | [`leg-curl-seated.md`](tutorials/leg-curl-seated.md) |
| `leg-extension-seated` | 坐姿腿屈伸 | LEG EXTENSION | E25 腿屈伸／腿弯举双功能器械族（伸膝模式；E2 | [Leg Extension](https://www.muscleandstrength.com/exercises/leg-extension.html) | [视频](https://www.youtube.com/watch?v=0fl1RRgJ83I) | [`leg-extension-seated.md`](tutorials/leg-extension-seated.md) |
| `leg-press` | 腿举机 | LEG PRESS | E09 斜轨挂片腿举（照片 27）；E04 插销配 | [Leg Press](https://www.muscleandstrength.com/exercises/45-degree-leg-press.html) | [视频](https://www.youtube.com/watch?v=sEM_zo9w2ss) | [`leg-press.md`](tutorials/leg-press.md) |
| `machine-chest-fly` | 器械夹胸（长臂把手） | MACHINE CHEST FLY (LONG-ARM HANDLE) | E19 长臂把手式夹胸机（照片 38） | [Pec Deck](https://www.muscleandstrength.com/exercises/pec-dec.html) | - | [`machine-chest-fly.md`](tutorials/machine-chest-fly.md) |
| `machine-chest-press` | 坐姿推胸机 | MACHINE CHEST PRESS | E21/E22 待定 → 现按通用插销配重式坐姿推 | [Hammer Strength Bench Press](https://www.muscleandstrength.com/exercises/hammer-strength-bench-press.html) | [视频](https://www.youtube.com/watch?v=dMQdd40Y3FQ) | [`machine-chest-press.md`](tutorials/machine-chest-press.md) |
| `machine-glute-extension` | 器械髋伸展／后蹬 | MACHINE GLUTE EXTENSION | E26 臀部髋伸展／后蹬训练器（照片 51–53） | [Standing Glute Kickback Machine](https://www.muscleandstrength.com/exercises/standing-glute-kickback.html) | - | [`machine-glute-extension.md`](tutorials/machine-glute-extension.md) |
| `machine-reverse-fly` | 器械反向飞鸟 | MACHINE REVERSE FLY | E19 长臂把手式夹胸机（照片 38；顶部双摆臂、 | [Machine Reverse Fly](https://www.muscleandstrength.com/exercises/machine-reverse-fly) | [视频](https://www.youtube.com/watch?v=_hbHNJtkB8s) | [`machine-reverse-fly.md`](tutorials/machine-reverse-fly.md) |
| `machine-shoulder-press` | 坐姿推肩机 | MACHINE SHOULDER PRESS | E15/E21 待定 → 现按通用插销配重式坐姿推 | [Machine Shoulder Press](https://www.muscleandstrength.com/exercises/machine-shoulder-press) | [视频](https://www.youtube.com/watch?v=fj_VAk1jfZ8) | [`machine-shoulder-press.md`](tutorials/machine-shoulder-press.md) |
| `overhead-tricep-extension-lower-position` | 低位绳索过顶臂屈伸 | OVERHEAD TRICEPS EXTENSION (LOWER POSITION) | E03 可调绳索站（照片 20、22；低位滑轮＋双 | [Standing Low Pulley Overhead Tricep Extension (Rope Extension)](https://www.muscleandstrength.com/exercises/standing-low-pulley-overhead-tricep-extension-(rope-extension).html) | - | [`overhead-tricep-extension-lower-position.md`](tutorials/overhead-tricep-extension-lower-position.md) |
| `pallof-press` | Pallof 抗旋转推 | PALLOF PRESS | E03 可调绳索站（照片 20、22；胸高滑轮＋单 | [Pallof Press](https://www.muscleandstrength.com/exercises/pallof-press) | [视频](https://www.youtube.com/watch?v=SFJprbDnaS0) | [`pallof-press.md`](tutorials/pallof-press.md) |
| `plank` | 平板支撑 | PLANK | 无器械（瑜伽垫） | [Plank](https://www.muscleandstrength.com/exercises/hover.html) | - | [`plank.md`](tutorials/plank.md) |
| `plate-loaded-incline-chest-press` | 挂片上斜推胸 | PLATE-LOADED INCLINE CHEST PRESS | E21 挂片靠背推举机（照片 41／46；长倾斜靠 | [Incline Cable Chest Press](https://www.muscleandstrength.com/exercises/incline-cable-chest-press) | [视频](https://www.youtube.com/watch?v=Z8qjy7FAMuE) | [`plate-loaded-incline-chest-press.md`](tutorials/plate-loaded-incline-chest-press.md) |
| `plate-loaded-lat-pulldown` | 挂片杠杆高位下拉 | PLATE-LOADED LEVER LAT PULLDOWN | E14 挂片杠杆高位下拉机（照片 32） | [Lateral Pulldown Bicep Curl](https://www.muscleandstrength.com/exercises/cable-underhand-pull-down.html) | - | [`plate-loaded-lat-pulldown.md`](tutorials/plate-loaded-lat-pulldown.md) |
| `plate-loaded-lying-chest-press` | 平卧挂片推胸 | PLATE-LOADED LYING CHEST PRESS | E22 挂片平卧推胸机（照片 42） | [Hammer Strength Bench Press](https://www.muscleandstrength.com/exercises/hammer-strength-bench-press.html) | [视频](https://www.youtube.com/watch?v=dMQdd40Y3FQ) | [`plate-loaded-lying-chest-press.md`](tutorials/plate-loaded-lying-chest-press.md) |
| `plate-loaded-seated-row` | 挂片分动坐姿划船 | PLATE-LOADED ISO-LATERAL SEATED ROW | E20 挂片分动式坐姿划船机（照片 39 铭牌 I | [One-Arm Seated Cable Row](https://www.muscleandstrength.com/exercises/one-arm-cable-row.html) | - | [`plate-loaded-seated-row.md`](tutorials/plate-loaded-seated-row.md) |
| `prone-leg-curl` | 俯卧腿弯举 | LYING LEG CURL | E24 俯卧腿弯举机（照片 45 全景、47 铭牌 | [Lying Cable Leg Curl](https://www.muscleandstrength.com/exercises/lying-cable-hamstring-curl.html) | - | [`prone-leg-curl.md`](tutorials/prone-leg-curl.md) |
| `reverse-cable-fly` | 绳索反向飞鸟 | REVERSE CABLE FLY | E03 可调绳索站（照片 20、22；双滑轮＋两个 | [One-Arm Bent-Over Cable Reverse Fly](https://www.muscleandstrength.com/exercises/one-arm-cable-reverse-fly.html) | - | [`reverse-cable-fly.md`](tutorials/reverse-cable-fly.md) |
| `reverse-hyper` | 反向背伸展 | REVERSE HYPER | E07 背伸展凳／罗马椅（照片 25）；是否支持反 | [Reverse Hyperextension](https://www.muscleandstrength.com/exercises/reverse-hyperextension) | [视频](https://www.youtube.com/watch?v=qcHF-uATSY8) | [`reverse-hyper.md`](tutorials/reverse-hyper.md) |
| `roman-chair-hip-extension` | 罗马椅髋主导背伸展 | ROMAN CHAIR HIP EXTENSION | E07 背伸展凳／罗马椅（照片 25） | [45 Degree Lying Tricep Extension](https://www.muscleandstrength.com/exercises/back-of-the-head-lying-tricep-extension.html) | - | [`roman-chair-hip-extension.md`](tutorials/roman-chair-hip-extension.md) |
| `seated-dip-machine` | 坐姿臂屈伸／下压 | SEATED DIP MACHINE | E12 挂片坐姿下压器（照片 30；长靠背与坐垫、 | 暂无直接匹配 | - | [`seated-dip-machine.md`](tutorials/seated-dip-machine.md) |
| `seated-machine-row` | 坐姿固定划船 | SEATED MACHINE ROW | E20 挂片分动式坐姿划船机（照片 39、40；前 | [Banded Machine T-Bar Row](https://www.muscleandstrength.com/exercises/banded-machine-t-bar-row) | [视频](https://www.youtube.com/watch?v=pF5E966XrfA) | [`seated-machine-row.md`](tutorials/seated-machine-row.md) |
| `stair-climber` | 楼梯机连续踏阶 | STAIR CLIMBER (REVOLVING STAIRCASE) | E05 循环台阶式楼梯机（照片 24） | 暂无直接匹配 | - | [`stair-climber.md`](tutorials/stair-climber.md) |
| `straight-arm-lat-pulldown` | 直臂下压 | STRAIGHT-ARM LAT PULLDOWN | E03 可调绳索站（照片 20、22；高滑轮＋直杆 | [Straight Arm Lat Pull Down](https://www.muscleandstrength.com/exercises/straight-arm-lat-pull-down.html) | [视频](https://www.youtube.com/watch?v=gDtXrJWPdlY) | [`straight-arm-lat-pulldown.md`](tutorials/straight-arm-lat-pulldown.md) |
| `t-bar-row-unsupported` | 俯身 T 杠划船（无胸托） | UNSUPPORTED T-BAR ROW | E08 无胸托 T 杠划船器（照片 26；低位固定 | [Banded Machine T-Bar Row](https://www.muscleandstrength.com/exercises/banded-machine-t-bar-row) | [视频](https://www.youtube.com/watch?v=pF5E966XrfA) | [`t-bar-row-unsupported.md`](tutorials/t-bar-row-unsupported.md) |
| `triceps-pushdown-with-rope` | 绳索下压 | TRICEPS PUSHDOWN WITH ROPE | E03 可调绳索站（照片 20、22；高位滑轮＋双 | 暂无直接匹配 | - | [`triceps-pushdown-with-rope.md`](tutorials/triceps-pushdown-with-rope.md) |
| `weighted-back-extension` | 负重背伸展 | WEIGHTED BACK EXTENSION | E07 背伸展凳／罗马椅（照片 25） | [Weighted Hyperextension](https://www.muscleandstrength.com/exercises/weighted-hyperextension) | [视频](https://www.youtube.com/watch?v=hWfS8WGBboM) | [`weighted-back-extension.md`](tutorials/weighted-back-extension.md) |

## 使用与后续开发说明

1. **无感扩展**：抓取的文件均保存在 `docs/muscleandstrength/` 下，完全遵循项目规范，未修改现有业务代码与 `server.mjs`。
2. **离线与在线兼容**：每个动作包含全量元数据（步骤、发力要点、肌群、YouTube 视频 ID 与网页链接），既可在本地离线查阅 Markdown，也可作为动作对比、提示词生成、动作库扩展的权威外部依据。