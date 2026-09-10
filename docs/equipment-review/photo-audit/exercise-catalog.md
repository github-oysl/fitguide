# 实拍器械对应动作与扩展动作

配套：[器械证据](equipment-inventory.md) · [已核查来源](sources.md) · [AI 检索与审核提示词](ai-prompts.md)。

## 状态含义

- **基础对应**：照片证据支持器械类别与常规动作关系；仍需按原机说明确认设置。
- **条件扩展**：需要特定附件、模式或厂家许可；不能直接显示为“本健身房可练”。
- **待定**：器械身份或动作姿势尚不明确，仅作为研究任务。

本文件是动作研究与内容入库底稿，不是已经全部通过审核的专机教学手册。肌群列为通用解剖学检索目标；没有把每个动作的步骤、肌群侧重、训练剂量逐项完成外部核验。下表关键词是搜索词，不是已读来源。具体来源的支持范围见 S01–S15；完整动作教学须执行配套提示词中的检索和独立核验。

动作去重以“主要关节动作＋身体姿势＋阻力形式＋支撑方式”判断。不同握法通常是同动作变式；俯卧／坐姿弯举、坐姿／平卧推胸、胸托／无胸托划船需要分别保留。下面带 `new:` 的 ID 是建议的新数据 ID，尚未写入网页。

## 器械—动作映射

### E01 · 低位绳索划船工位

- 基础对应：**窄握坐姿划船** `cable-row-seated-narrow-grip`。研究肌群：背阔肌、菱形肌、中斜方肌；肘屈肌参与。
- 内容要点：确认低位出线、脚撑、长凳和握把；拉向躯干，区分肩胛运动与腰部大幅前后甩动；回程仍控制负重。
- 条件扩展：宽握坐姿绳索划船、单臂坐姿绳索划船；分别需要兼容长把／单手柄，且不扭转躯干来替代划船。
- 检索：`seated cable row close grip technique`、`single arm seated cable row`。不以站姿划船代替坐姿脚撑版本。

### E02 · 高位下拉工位

- 基础对应：**正握高位下拉** `lat-pulldown-with-pronated-grip`。研究肌群：背阔肌、大圆肌和肘屈肌等。
- 内容要点：大腿压垫固定、握把在身体前方下拉、控制回程；不能将大幅后仰划船或颈后下拉混作同一演示。
- 条件扩展：中立握下拉、反握下拉、单臂下拉，需匹配拉杆／握把和可用钢索行程；不承诺某握法“只练背宽”。
- 检索：`lat pulldown pronated grip`、`neutral grip lat pulldown`。挂片版本见 E14，结构参照 S11。

### E03 · 可调绳索站

以下全部以滑轮可调到所需高度、附件合格且数量充足、站位与行程足够为前提。照片只确认绳索站，**不能确认这一整张表已全部可做**。检索入口见 S15。

| 动作／现有 ID | 研究肌群或动作功能 | 必要设置／附件 | 重点核验 | 英文搜索词 |
|---|---|---|---|---|
| 站姿绳索夹胸 `cable-chest-fly` | 胸大肌、肩水平内收 | 双滑轮＋两个单手柄 | 肘角相对稳定，不混成推胸 | standing cable fly |
| 直臂下压 `straight-arm-lat-pulldown` | 背阔肌、肩伸展 | 高滑轮＋适合拉杆 | 不靠反复伸肘完成 | straight arm cable pulldown |
| 上斜绳索夹胸 `cable-incline-chest-fly` | 胸大肌锁骨部侧重 | 双低滑轮＋可靠可调凳＋两个手柄 | 凳角、摆位和钢索与凳腿干涉；不是站姿低到高夹胸 | incline bench cable fly |
| 单臂绳索侧平举 `cable-lateral-raise` | 三角肌中束、肩外展 | 低滑轮＋单手柄 | 肩胛自然运动、不甩身、不强迫倒水式内旋 | single arm cable lateral raise |
| 面拉 `face-pull` | 肩后束、肩胛后缩及外旋相关肌群 | 合适高度滑轮＋双头绳 | 区分拉脸和外旋阶段，不强迫极限外旋 | cable rope face pull |
| 绳索反向飞鸟 `reverse-cable-fly` | 三角肌后束、肩水平外展 | 双滑轮＋双手柄 | 不变成大幅屈肘划船；交叉钢索不摩擦身体 | reverse cable fly |
| 直杆绳索弯举 `cable-curl-with-bar` | 肘屈肌群 | 低滑轮＋短直杆 | 上臂和躯干稳定，腕位舒适 | straight bar cable curl |
| 绳索锤式弯举 `cable-curl-with-rope` | 肱肌、肱桡肌及肱二头肌 | 低滑轮＋双头绳 | 中立握，不写成完全隔离肱肌 | rope hammer curl |
| 绳索下压 `triceps-pushdown-with-rope` | 肱三头肌、伸肘 | 高滑轮＋双头绳 | 主要伸肘，不当成直臂下拉 | rope triceps pushdown |
| 低位绳索过顶臂屈伸 `overhead-tricep-extension-lower-position` | 肱三头肌 | 低滑轮＋绳把及足够行程 | 检索必须匹配低位出线版本，控制肋骨／腰椎代偿 | low pulley overhead rope triceps extension |
| 跪姿绳索卷腹 `cable-crunch` | 腹直肌、躯干屈曲 | 高滑轮＋绳把＋适宜跪地面 | 不靠下拉手臂或仅做髋铰链 | kneeling cable crunch |
| 抗旋转推 `pallof-press` | 抗躯干旋转 | 躯干高度滑轮＋手柄 | 阻力从侧面来，躯干不随手旋转 | standing cable Pallof press |

**其他适合研究的条件扩展动作**：

| 建议 ID | 动作 | 必要条件 | 关键词与容易混淆点 |
|---|---|---|---|
| `new:cable-standing-chest-press` | 站姿绳索推胸 | 双手柄或明确单臂版本 | standing cable chest press；有伸肘，区别于夹胸 |
| `new:cable-single-arm-row` | 站姿单臂绳索划船 | 单手柄、合适高度 | standing single arm cable row；不混用坐姿脚撑演示 |
| `new:cable-pull-through` | 绳索胯下拉 | 低滑轮、绳把、向前空间 | cable pull through；髋伸展，不能硬拉钢索撞裆 |
| `new:cable-hip-extension` | 绳索髋伸展／后踢 | 合格踝带、低滑轮、稳定扶持 | cable hip extension ankle strap；不借腰后仰 |
| `new:cable-hip-abduction` | 绳索髋外展 | 合格踝带、低滑轮 | standing cable hip abduction；不是侧屈躯干 |
| `new:cable-hip-adduction` | 绳索髋内收 | 合格踝带、低滑轮 | standing cable hip adduction；留出摆腿空间 |

白色挂带不是已经确认的踝带或双头绳；本批照片也没有足够证据确认上斜凳可用。因此以上配件需求必须作为字段保存。

### E04 · 卧式蹬腿机

- 基础对应：**卧式／水平腿举**，现有 `leg-press` 的独立机型变式，建议 `variantId: horizontal-selectorized`。
- 研究肌群：股四头肌、臀大肌及内收肌等。研究重点：原机是哪一部分移动、进入／退出、可调座位、骨盆与靠垫接触、可控屈膝范围。
- 不套用 45° 挂片机“先释放滑车安全锁”的具体步骤。研究词：`horizontal selectorized leg press moving seat`、`squat press machine manual`。
- 条件扩展：单腿版本、提踵均暂不放行；须原机明确允许。S01 仅作腿举结构参照，不是本机说明书。

### E05 · 楼梯机

- 基础对应：**楼梯机连续踏阶** `new:stair-climber`；功能为有氧踏阶，涉及下肢伸髋伸膝。
- 内容要点：先核查启停和速度控制，整脚可控落阶，扶手用于平衡而非长期悬挂身体。
- 条件扩展：同动作的快慢交替属于训练方式变式，不必新增动作 ID；侧身、倒走、跳阶不从照片推定适用。
- 检索：`stair climber manufacturer user manual proper use`。不能把标称楼层、热量或心率程序推定为准确实测。

### E06 · 下斜腹肌凳

- 基础对应：**下斜凳卷腹** `new:decline-bench-crunch`，研究腹直肌与躯干屈曲。
- 内容要点：腿部固定、骨盆位置、躯干卷起幅度；卷腹与全幅仰卧起坐的髋屈参与不同，视频不可混用。
- 条件扩展：下斜仰卧起坐另列变式并审核；不自动扩展为负重扭转或哑铃下斜卧推。
- 检索：`decline bench crunch versus sit up technique`。

### E07 · 罗马椅／背伸展凳

- 基础对应：**髋主导背伸展** `new:roman-chair-hip-extension`，研究臀大肌、腘绳肌和竖脊肌稳定作用。
- 内容要点：支撑垫与髋关节位置、脚部固定、髋铰链和躯干回到可控对齐位置；不以腰部大幅后折作为完成标准。
- 条件扩展：负重背伸展需确认器械承重和动作熟练；脊柱屈伸版本是不同教学意图，不能与髋主导说明混写。
- 检索：`Roman chair hip extension back extension hip hinge`；图片倾角需匹配，不能统一写固定 45°。

### E08 · 无胸托 T 杠划船

- 基础对应：**俯身 T 杠划船** `new:t-bar-row-unsupported`。研究背阔肌、中背、肘屈肌及躯干稳定。
- 内容要点：髋铰链、握把和站位、躯干稳定；不靠蹬腿或抬起整个上身甩动负重。
- 条件扩展：不同原装握把作为变式；不自动加 landmine press，因为未证实其转轴允许该方向。
- 检索：`unsupported T bar row plate loaded`；S08 明确区分有无身体支撑。

### E09 · 斜轨挂片腿举

- 基础对应：**斜轨腿举**，现有 `leg-press`，建议 `variantId: angled-plate-loaded`。
- 内容要点：原机挂片、安全释放和归位、整个脚掌稳定、下降时骨盆不被迫卷起；空车重量不从照片估算。
- 条件扩展：**腿举机提踵** `calf-raise-in-leg-press`，只有机型允许、脚掌支撑面积和防滑／限位足够才可加入；单腿腿举同样另核。
- 检索：`angled leg press manufacturer manual`、`leg press calf raise permitted`。S01；“允许提踵”目前未获证实。

### E10 · 哈克深蹲

- 基础对应：**哈克深蹲** `new:hack-squat`，研究股四头肌、臀大肌等。
- 内容要点：肩垫承托、背部与靠垫、脚踏平台、原机限位和挂回方法；不能把 E09 腿举示范配给本动作。
- 条件扩展：站距变化只是变式；反向哈克不列已支持功能。
- 检索：`linear hack squat machine setup safety stops`；结构来源 S02。

### E11 · 辅助引体／双杠机

- 基础对应：**辅助引体向上** `new:assisted-pull-up`（背阔肌、肘屈肌等）；**辅助双杠臂屈伸** `new:assisted-dip`（肱三头肌、胸大肌等）。
- 内容要点：先确认承托平台和进入顺序、把手选择、起止范围，再分别写两份教案。
- **重量语义**：经 S07 核查，配重辅助型数值增大通常代表辅助增加；不可沿用“加配重＝更难”的进阶逻辑，也不直接计算精确剩余体重。
- 条件扩展：不同原装握位为变式；无辅助自重模式要先确认平台可依法收起或锁定。
- 检索：`assisted chin dip machine user manual assistance weight`。

### E12 · 疑似坐姿臂屈伸机

- 待定候选：**器械坐姿臂屈伸／下压** `new:seated-dip-machine`。
- 若身份确认，研究肱三头肌、胸肌参与、向下伸肘、肩部舒适范围和靠背支撑。
- 检索：`plate loaded seated dip machine low handles`。必须先过器械身份审核，不根据本段让用户试坐试压以“验证”。

### E13 · 站姿胸托划船

- 基础对应候选：**胸托站姿杠杆划船** `new:chest-supported-standing-row`，待工作臂连接确认。
- 研究中背、背阔肌和肘屈肌；内容重点为胸垫位置、脚平台、原装握把和拉动轨迹。
- 与 `seated-machine-row` 身体支撑不同，保留独立变式；条件扩展是原装不同握位，不能改作腿举或弯举。
- 检索：`selectorized chest supported standing row`、`incline lever row`；S09/S12 仅证明胸托划船类别。

### E14 · 挂片下拉

- 基础对应：**挂片杠杆下拉** `new:plate-loaded-lat-pulldown`。
- 研究目标与 E02 相近，但身体支撑、固定握把与弧形轨迹不同；不能直接复制“握长杆拉到上胸”步骤。
- 条件扩展：单臂交替下拉只在双臂可独立工作且原机允许时采用。
- 检索：`plate loaded lever lat pulldown manual`；与 `high row` 对比，参见 S10/S11。

### E15 · 未定坐姿推举类

- 待定候选：坐姿推胸、坐姿推肩；仍需排除胸托拉类设备。
- 在照片名称与方向确认前，**不绑定** `machine-chest-press`、`machine-shoulder-press` 或 `seated-machine-row`。
- 检索先用可读品牌片段＋`plate loaded press`，再分别与 `chest press`、`shoulder press`、`row` 的接触点和动作图对照；S12。
- 无已放行扩展动作。

### E16 · 未定站姿多握位杠杆器

- 待定候选：站姿推胸／飞鸟类。当前没有可发布的动作对应。
- 检索：`standing plate loaded chest press multi grip`、`standing chest fly machine`；通过工作臂运动平面区分推与夹。
- 不把多个握把高度等同于多个独立功能；无已放行扩展动作。

### E17 · 杠铃架与凳

- 待定候选：根据实际凳面与承托高度再确定卧推／上斜卧推／坐姿推举。
- 检索：`Olympic bench press rack`、`Olympic seated shoulder press bench`。需要侧面全景，尤其横杠是否自由离架。
- 当前不分配具体动作 ID，不以此证明现场已有史密斯深蹲或史密斯卧推。

### E18 · 未定站姿杠杆器

- 待定候选：站姿杠杆拉类／耸肩类，具体功能未知。
- 检索：`plate loaded standing lever machine platform roller pad`，之后根据清晰铭牌收敛；不能仅凭“低握把”直接命名为硬拉机。
- 未确认上方滚垫的身体接触位置前，不编写动作步骤或扩展动作。

### E19 · 长臂把手式夹胸

- 基础对应：**器械夹胸** `machine-chest-fly`，建议 `variantId: long-arm-handle`；研究胸大肌和肩水平内收。
- 内容要点：座位和起始摆臂角度、手握长把、肘角相对稳定；不是前臂抵竖垫版本。
- 条件扩展：**器械反向飞鸟** `new:machine-reverse-fly`，仅在原机具备后束模式时；S05 证明双功能类别存在，尚不证明照片38的功能。
- 检索：`long arm pec fly machine setup`、`pec fly rear delt machine mode adjustment`。

### E20 · 分动坐姿划船

- 基础对应：**挂片分动坐姿划船** `new:plate-loaded-seated-row`。
- 研究背阔肌、中背、三角肌后束及肘屈肌；内容须按照片确认座位、脚撑、小支撑垫和原装握法。
- 当前网页 `seated-machine-row` 强调胸垫，只有核实本机对应支撑才能直接关联，不能只因都叫划船就共用完整媒体。
- 条件扩展：独立单臂划船，需确认单侧工作及坐姿稳定；握位变化作变式。
- 检索：`iso lateral rowing machine manual`；本机名称证据为照片39，勿以“练背”标签代替动作名称。

### E21 · 靠背挂片推举

- 待定候选：**上斜器械推胸** `new:plate-loaded-incline-chest-press`；也需排除推肩。
- 若确定上斜推胸，研究胸大肌锁骨部、前三角肌和肱三头肌；若确定肩推，则映射现有 `machine-shoulder-press` 的机型变式。
- 检索：`plate loaded incline press vs shoulder press`；S12。靠背角度本身不是判定标准，动作演示需匹配握把相对人体位置与运动方向。
- 单臂推举不自动加入扩展列表。

### E22 · 平卧挂片推胸

- 基础对应：**平卧器械推胸** `new:plate-loaded-lying-chest-press`。研究胸大肌、肱三头肌、前三角肌。
- 内容要点：躺卧方向、起始握把、肩部与卧垫接触、受控推回及结束方法；“调座椅让把手对齐胸部”不能原样移植。
- 条件扩展：仅考虑原机原装握位变式；不据左右两个摆臂推断可以单臂重负荷使用。
- 检索：`plate loaded lying chest press machine instruction`。

### E23 · 髋内外展机

- 基础对应：**坐姿髋外展** `hip-abduction-machine`（研究臀中肌、臀小肌、阔筋膜张肌等）；**坐姿髋内收** `new:hip-adduction-machine`（髋内收肌群）。
- 内容要点：分别写模式、抵垫位置、起始幅度、骨盆稳定和受控回程；不能靠膝关节扭转推动垫子。
- 条件扩展：无必要为身体前倾、后仰等网红变式单独建档；没有依据不写“只练臀上部”或“瘦大腿内侧”。
- 检索：`hip abduction adduction machine switching modes`；双功能类别核验 S06，实拍牌证据43。

### E24 · 俯卧腿弯举

- 基础对应：**俯卧腿弯举** `new:prone-leg-curl`。研究腘绳肌及腓肠肌的屈膝参与。
- 内容要点：趴卧支撑、膝关节与转轴、小腿后侧滚垫、屈膝时骨盆稳定；不将滚垫压在膝关节上。
- 条件扩展：单腿弯举需厂家允许与滚垫稳定，暂不作为默认动作。
- 检索：`prone leg curl setup pivot roller pad`；S03。不能复用现有坐姿弯举照片／视频。

### E25 · 腿屈伸／腿弯举族

- 基础对应：**腿屈伸** `leg-extension-seated`；**腿弯举模式**，A=照片48倾向坐姿，B=49/50具体姿势仍待核。
- 研究肌群：伸膝是股四头肌；屈膝主要是腘绳肌。不能把中文“股二头”当成仅练股二头肌的证明。
- 内容要点：两个模式分别核对工作臂起点、阻力方向、大腿固定、膝轴和滚垫接触面。模式切换只能在确认安全卸载后按原机说明操作，本稿不猜具体插销次序。
- B 未确认前，不能把 `leg-curl-seated` 的坐姿教学直接用于 B；A/B 也不能共用同一调节图。S04 的其他品牌坐姿双功能只作类别参照。
- 检索：`leg extension leg curl combination machine manual`，并带本机品牌／型号片段。

### E26 · 臀部训练器

- 基础对应：**器械髋伸展／后蹬** `new:machine-glute-extension`；研究臀大肌及髋伸肌群。
- 内容要点：先确认本机支撑腿、上身接触垫和工作滚垫的正确摆位，再描述髋伸展；不要通过腰部过伸制造幅度。
- 条件扩展：无已确认侧踢或髋外展功能；臀部牌不代表可做所有臀部动作。
- 检索：`glute extension machine kneeling roller pad`、`glute kickback machine manual`；S13 为另一种站姿结构，不能直接复制其人体摆位。

## 背景器材可补充的动作

均为条件研究候选；先核对 B01–B04 的可用器材和空间。

| 器材 | 候选动作／建议 ID | 研究重点 |
|---|---|---|
| 哑铃 B01 | 哑铃弯举 `new:dumbbell-curl`、锤式弯举 `new:dumbbell-hammer-curl` | 肘屈、握法和躯干稳定；负重档位未知 |
| 哑铃 B01 | 侧平举 `new:dumbbell-lateral-raise` | 肩外展与肩胛自然运动，不强迫倒水式手位 |
| 哑铃 B01 | 杯式深蹲 `new:goblet-squat`、哑铃罗马尼亚硬拉 `new:dumbbell-rdl` | 深蹲和髋铰链必须区分，不能只凭肌群命名 |
| 哑铃＋凳 B01/B02 | 哑铃卧推、单臂支撑划船 | 凳的稳定性、角度和承重待查，暂不默认上斜版可用 |
| 杠铃架 B03 | 杠铃深蹲、罗马尼亚硬拉、卧推 | 自由杠铃／导轨杠铃分开；明确安全架条件后再建条目 |
| 跑步机 B04 | 现有 `treadmill-walk-jog` | 启停和速度控制按本机；`treadmill-incline-walk` 另确认坡度能力 |

## 现有 24 个力量动作如何衔接

“可关联”仅表示可进入对应机型审核，不代表本次已更新 `availability` 或现有媒体已通过审查。

| 现有动作 ID | 实拍对应 | 本轮建议 |
|---|---|---|
| `cable-chest-fly` | E03 | 条件关联：两个单手柄与站位 |
| `leg-press` | E04、E09 | 拆分水平插销／斜轨挂片变式及操作说明 |
| `leg-extension-seated` | E25-A/B | 可关联伸膝模式，分实例核对设置 |
| `leg-curl-seated` | E25-A 倾向支持 | 核实模式；E25-B姿势未定；绝不能用 E24 俯卧图代替 |
| `machine-chest-press` | E15/E21 待定；E22 为平卧 | 现有名称是坐姿，不直接拿 E22 填充；先定子型 |
| `machine-chest-fly` | E19 | 用长臂把手版本，清理前臂垫式混写 |
| `lat-pulldown-with-pronated-grip` | E02 | 确认长杆握位；E14挂片版另建 |
| `cable-row-seated-narrow-grip` | E01 | 可关联，核对握把和锁扣 |
| `straight-arm-lat-pulldown` | E03 | 条件关联：高滑轮＋合适杆 |
| `seated-machine-row` | E20 | 先核实支撑垫；E13为站姿，不直接套用 |
| `cable-incline-chest-fly` | E03＋B02 | 尚未确认合格可调上斜凳 |
| `machine-shoulder-press` | E15/E21 需排查 | 本批尚未完成明确推肩子型认定，不能标“已确认” |
| `cable-lateral-raise` | E03 | 条件关联：低滑轮＋单手柄 |
| `lateral-raise-machine` | 无清晰对应 | 本批未确认专用上臂垫式侧平举机；不等于现场没有 |
| `face-pull` | E03 | 条件关联：合格双头绳及高度 |
| `reverse-cable-fly` | E03 | 条件关联：双侧握把与交叉行程 |
| `cable-curl-with-bar` | E03 | 条件关联：短直杆 |
| `cable-curl-with-rope` | E03 | 条件关联：双头绳 |
| `triceps-pushdown-with-rope` | E03 | 条件关联：双头绳及高滑轮 |
| `overhead-tricep-extension-lower-position` | E03 | 条件关联：低位出线与身体空间 |
| `cable-crunch` | E03 | 条件关联：绳把、跪姿空间 |
| `pallof-press` | E03 | 条件关联：中段高度与侧向站位 |
| `hip-abduction-machine` | E23 | 可关联外展模式，另增内收动作 |
| `calf-raise-in-leg-press` | E04/E09 | 暂不放行；照片不能证明机型允许提踵 |

## 后续新增优先级

1. 先研究照片与功能证据较强的新增：**俯卧腿弯举、哈克深蹲、髋内收、辅助引体、辅助双杠臂屈伸、T 杠划船、挂片下拉、平卧器械推胸、楼梯机**。
2. 再完成专机设置：胸托站姿划船、分动坐姿划船、臀部后蹬、罗马椅和腹肌凳。
3. 最后处理待定器械与附件扩展。不要为了凑数量给 E15–E18 编造动作。

每个动作的组数、次数、休息与进阶应由使用者目标、经验和实际负重能力决定；本次没有足够个人信息，不批量套用现有 `2–3组×10–15次`，AI 输出中无法研究确认时保持 `null`。
