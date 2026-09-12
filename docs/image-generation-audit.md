# 全量提示词迁移与实拍复核记录（2026-09-12）

本轮范围为现有提示词目录全部61个动作，拆为65套配置。只执行提示词迁移、现有证据核对和文档校验；未调用图片生成、未复核历史样图、未增加attempt。所有36张原始照片均通过本地图片查看工具逐张打开；以下只记录可见事实，没有测量机械角度、额定承重或认证附件。

## 结果与范围

- 61/61动作已迁移v2；65套配置中13套为ready，52套为blocked-evidence。ready只代表本轮图示设计无关键证据缺项，不是原机安全认证或图片验收。
- 其中24个动作ID确实存在于网页数据，37个仍为建议新增。网页另有跑步、坡度走、跳绳、居家卷腹4个ID不在此次既有提示词目录，未冒充已覆盖。
- 保留全部历史教学结论、来源URL与访问日期，并注明未逐个重新访问；新写的图内短文与阶段事实以各文件三节为准。
- 两个腿举配置、两个提踵条件配置、E25-A/B伸膝和屈膝分别建档；不能跨模式复用空机。
- E02原试运行记录不变，未重新看生成图、不作新的视觉评分。

## 实拍逐张记录

路径均为仓库相对路径；不把被忽略照片添加到公开仓库。公共校验使用已有photo-manifest.json核对路径与编号，不要求原照片存在。

| 照片 | 来源路径 | 本轮实际观察及限制 |
|---|---|---|
| 18 | `健身房器械图片/微信图片_20260909201822_18_32.jpg` | E01侧景：红长凳、双脚撑、低位钢索和V把；塔侧红竖垫不作为胸托。 |
| 19 | `健身房器械图片/微信图片_20260909201823_19_32.jpg` | E02近景：红短座、黑双圆柱大腿垫、金属立柱与配重塔；塔顶和拉杆不入镜。 |
| 20 | `健身房器械图片/微信图片_20260909201824_20_32.jpg` | 组合架侧景：右侧E02短座和腿垫；白长环带、悬挂单柄；不证明与22同机。 |
| 21 | `健身房器械图片/微信图片_20260909201824_21_32.jpg` | E01较完整正景：顶部框架、低位出线、V把和双脚撑；地面蓝黑双头绳未接滑轮；背景银圆头哑铃；顶部弯杆属于另一出线侧。 |
| 22 | `健身房器械图片/微信图片_20260909201825_22_32.jpg` | E03双塔：调高轨道、配重、双出线与中央站位；悬挂附件不证明每个所需连接配置。 |
| 23 | `健身房器械图片/微信图片_20260909201826_23_32.jpg` | E04铭牌Squat Press与局部红垫、左踏板；全机被裁，移动部件未明。 |
| 24 | `健身房器械图片/微信图片_20260909201827_24_32.jpg` | 后排循环楼梯机、台阶扶手控制台；前景红垫腹肌凳，凳低端与脚部固定不全。 |
| 25 | `健身房器械图片/微信图片_20260909201827_25_32.jpg` | E07正面双红髋垫、下端腿垫和脚撑，黑色固定架；没有负重传动。 |
| 26 | `健身房器械图片/微信图片_20260909201828_26_32.jpg` | E08长杠杆、后端转轴、站台、多握把和挂片轴；背景E07侧景，不能合成胸托T杠。 |
| 27 | `健身房器械图片/微信图片_20260909201829_27_32.jpg` | E09大踏板与双斜导轨、红靠垫、挂片轴；限位锁和侧面不充分。 |
| 28 | `健身房器械图片/微信图片_20260909201830_28_32.jpg` | E10背垫肩垫同滑车，下端固定脚台；不能用E09移动踏板解释。 |
| 29 | `健身房器械图片/微信图片_20260909201831_29_32.jpg` | E11铭牌Assist Chin/Dip、顶部和侧把、配重；平台承托被遮挡。 |
| 30 | `健身房器械图片/微信图片_20260909201831_30_32.jpg` | E12红座靠垫、低把和挂片架；没有可读动作名称，不能正式认定下压。 |
| 31 | `健身房器械图片/微信图片_20260909201832_31_32.jpg` | E13斜胸垫、站台和多握把；不是E20坐姿工位，无本轮对应动作文件。 |
| 32 | `健身房器械图片/微信图片_20260909201833_32_32.jpg` | E14挂片杠杆、红座与腿压垫、原握把及侧连杆；远侧握位和完整连接待核。 |
| 33 | `健身房器械图片/微信图片_20260909201834_33_32.jpg` | E15侧面挂片臂、红座与低清示意牌；子型不能据小图定案。 |
| 34 | `健身房器械图片/微信图片_20260909201834_34_32.jpg` | E15另一视角红靠垫、座和工作把；仍缺清晰运动平面。 |
| 35 | `健身房器械图片/微信图片_20260909201835_35_32.jpg` | E16站台、红竖垫、多层横握位；用途不明，不增动作。 |
| 36 | `健身房器械图片/微信图片_20260909201836_36_32.jpg` | E17前景承托架、银杠与红分段凳，后景多种架；自由杠/导轨和凳型不能混用。 |
| 37 | `健身房器械图片/微信图片_20260909201837_37_32.jpg` | E18站台、低位握把及上方滚垫；接触部位不明，不增动作。 |
| 38 | `健身房器械图片/微信图片_20260909201837_38_32.jpg` | E19红座靠背、顶部双轴和长臂把手、配重；没有前臂竖垫，未证明后束模式。 |
| 39 | `健身房器械图片/微信图片_20260909201838_39_32.jpg` | E20铭牌Iso-Lateral Rowing与局部站撑；功能名明确但人体接触图不完整。 |
| 40 | `健身房器械图片/微信图片_20260909201839_40_32.jpg` | E20整机斜景：红座、大脚撑、小黑垫和双挂片工作臂；小垫接触部位未明。 |
| 41 | `健身房器械图片/微信图片_20260909201840_41_32.jpg` | E21红斜靠背、短座和两侧挂片臂；倾角不能独立证明上斜推胸。 |
| 42 | `健身房器械图片/微信图片_20260909201840_42_32.jpg` | E22红水平卧垫、两侧工作把和挂片臂；缺侧景、头脚方向和起始握位证据。 |
| 43 | `健身房器械图片/微信图片_20260909201841_43_32.jpg` | E23铭牌Inner/Outer Thigh；只证明双功能类别。 |
| 44 | `健身房器械图片/微信图片_20260909201842_44_32.jpg` | E23双腿垫、脚撑、红座靠背与双模式结构；未验证调节路径；背景哑铃区补器材线索。 |
| 45 | `健身房器械图片/微信图片_20260909201843_45_32.jpg` | E24红俯卧垫、黑小腿滚垫、侧盘与工作臂；支撑方向可见。 |
| 46 | `健身房器械图片/微信图片_20260909201843_46_32.jpg` | E21正景补双握把、红座和靠背，不把左右臂静态位置当轨迹证明。 |
| 47 | `健身房器械图片/微信图片_20260909201844_47_32.jpg` | E24牌Prone Leg Curl，卧垫、膝侧盘和握把补充；支持俯卧而不是坐姿。 |
| 48 | `健身房器械图片/微信图片_20260909201845_48_32.jpg` | E25-A红近直立靠背、上下黑垫和侧盘；模式起点与垫接触面仍要分别补证。 |
| 49 | `健身房器械图片/微信图片_20260909201845_49_32.jpg` | E25-B红斜靠背和座、滚垫与调节盘；不能当成48同一实例。 |
| 50 | `健身房器械图片/微信图片_20260909201846_50_32.jpg` | E25-B牌Leg Extension/Leg Curl与小示意；未清楚证明屈膝姿势。 |
| 51 | `健身房器械图片/微信图片_20260909201847_51_32.jpg` | E26前方红上身垫、近端小红垫、黑滚垫及侧盘；人体接触尚不明确。 |
| 52 | `健身房器械图片/微信图片_20260909201848_52_32.jpg` | E26牌Gluteus training和低清侧卧/俯撑式示意；不能直接放行通用站姿后踢。 |
| 53 | `健身房器械图片/微信图片_20260909201848_53_32.jpg` | E26反向斜景补红小垫、黑滚垫和支架；仍未把工作腿与支撑腿对应到接触面。 |

## 可进入后续首图阶段的配置

当前仍暂停生成。以下项目无本轮关键图示缺口：

- [cable-row-seated-narrow-grip](equipment-review/action-prompts/cable-row-seated-narrow-grip.md) / standard。
- [dead-bug](equipment-review/action-prompts/dead-bug.md) / standard。
- [dumbbell-curl](equipment-review/action-prompts/dumbbell-curl.md) / standard。
- [dumbbell-hammer-curl](equipment-review/action-prompts/dumbbell-hammer-curl.md) / standard。
- [dumbbell-lateral-raise](equipment-review/action-prompts/dumbbell-lateral-raise.md) / standard。
- [dumbbell-rdl](equipment-review/action-prompts/dumbbell-rdl.md) / standard。
- [glute-bridge](equipment-review/action-prompts/glute-bridge.md) / standard。
- [goblet-squat](equipment-review/action-prompts/goblet-squat.md) / standard。
- [machine-chest-fly](equipment-review/action-prompts/machine-chest-fly.md) / standard。
- [plank](equipment-review/action-prompts/plank.md) / standard。
- [prone-leg-curl](equipment-review/action-prompts/prone-leg-curl.md) / standard。
- [roman-chair-hip-extension](equipment-review/action-prompts/roman-chair-hip-extension.md) / standard。
- [t-bar-row-unsupported](equipment-review/action-prompts/t-bar-row-unsupported.md) / standard。

## 补证队列

按缺项处理，不把类别置信度当成摆位确认。没有取得任何本机确切型号手册；旧档案中的其他品牌说明只保留为类别参照。

| 动作 / 变式 | 具体缺项 |
|---|---|
| [assisted-dip](equipment-review/action-prompts/assisted-dip.md) / standard | 承托为跪式还是站式、平台机械连接和进入顺序未明 |
| [assisted-pull-up](equipment-review/action-prompts/assisted-pull-up.md) / standard | 承托为跪式还是站式、平台机械连接和进入顺序未明 |
| [barbell-bench-press](equipment-review/action-prompts/barbell-bench-press.md) / standard | 实际使用的自由杠、配套保护架、站位空间和凳型待核；目标自由杠身份、凳型、承托与安全杠高度、全景待核；平凳、原支脚与承重缺证据；不得使用下斜腹肌凳替代 |
| [barbell-overhead-press](equipment-review/action-prompts/barbell-overhead-press.md) / standard | 实际使用的自由杠、配套保护架、站位空间和凳型待核 |
| [barbell-romanian-deadlift](equipment-review/action-prompts/barbell-romanian-deadlift.md) / standard | 实际使用的自由杠、配套保护架、站位空间和凳型待核 |
| [barbell-row](equipment-review/action-prompts/barbell-row.md) / standard | 实际使用的自由杠、配套保护架、站位空间和凳型待核 |
| [barbell-squat](equipment-review/action-prompts/barbell-squat.md) / standard | 实际使用的自由杠、配套保护架、站位空间和凳型待核 |
| [cable-chest-fly](equipment-review/action-prompts/cable-chest-fly.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [cable-crunch](equipment-review/action-prompts/cable-crunch.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [cable-curl-with-bar](equipment-review/action-prompts/cable-curl-with-bar.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [cable-curl-with-rope](equipment-review/action-prompts/cable-curl-with-rope.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [cable-hip-extension](equipment-review/action-prompts/cable-hip-extension.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据；右踝带及锁扣实拍缺失；旧稿固定“接近髋高”不作为终点要求 |
| [cable-incline-chest-fly](equipment-review/action-prompts/cable-incline-chest-fly.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据；独立稳定平凳/上斜凳、调节锁定和承重缺证据；B02独立上斜凳、稳定锁定和侧面角度未确认 |
| [cable-lateral-raise](equipment-review/action-prompts/cable-lateral-raise.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [cable-pull-through](equipment-review/action-prompts/cable-pull-through.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [cable-single-arm-row](equipment-review/action-prompts/cable-single-arm-row.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [cable-standing-chest-press](equipment-review/action-prompts/cable-standing-chest-press.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [calf-raise-in-leg-press](equipment-review/action-prompts/calf-raise-in-leg-press.md) / angled-permission-pending | 安全挡、释放与挂回方法、完整侧景未确认；不写精确45度；未获原机允许提踵证据 |
| [calf-raise-in-leg-press](equipment-review/action-prompts/calf-raise-in-leg-press.md) / horizontal-permission-pending | 整机侧景、移动部件、进出方式与限位未确认；未获原机允许提踵证据 |
| [decline-bench-crunch](equipment-review/action-prompts/decline-bench-crunch.md) / standard | 腿部具体勾靠位置、完整低端垫及支脚被裁；不可认作上斜卧推凳 |
| [dumbbell-bench-press](equipment-review/action-prompts/dumbbell-bench-press.md) / standard | 哑铃公斤数不可读；不写负重数值，画面不补品牌标记；独立稳定平凳/上斜凳、调节锁定和承重缺证据；平凳、原支脚与承重缺证据；不得使用下斜腹肌凳替代 |
| [dumbbell-one-arm-row](equipment-review/action-prompts/dumbbell-one-arm-row.md) / standard | 哑铃公斤数不可读；不写负重数值，画面不补品牌标记；独立稳定平凳/上斜凳、调节锁定和承重缺证据；合格平凳与支撑面未确认 |
| [face-pull](equipment-review/action-prompts/face-pull.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [hack-squat](equipment-review/action-prompts/hack-squat.md) / standard | 安全限位、挂回位置与进入方式缺近景 |
| [hip-abduction-machine](equipment-review/action-prompts/hip-abduction-machine.md) / abduction-mode | 外展/内收模式的垫朝向和原机调节路径未确认；不能只翻转人物膝盖 |
| [hip-adduction-machine](equipment-review/action-prompts/hip-adduction-machine.md) / adduction-mode | 外展/内收模式的垫朝向和原机调节路径未确认；不能只翻转人物膝盖 |
| [lat-pulldown-with-pronated-grip](equipment-review/action-prompts/lat-pulldown-with-pronated-grip.md) / standard | 目标塔顶滑轮至真实长杆的连续路径、实际握杆与握位仍未证实 |
| [lateral-raise-machine](equipment-review/action-prompts/lateral-raise-machine.md) / standard | 需要专用侧平举机整机、铭牌、接触垫及工作方向证据；无现场专用侧平举机照片；equipment是待补证角色，不是not-applicable |
| [leg-curl-seated](equipment-review/action-prompts/leg-curl-seated.md) / a-seated-curl | 伸膝与坐姿屈膝的原机调节、上固定垫位置、完整侧景缺证据 |
| [leg-curl-seated](equipment-review/action-prompts/leg-curl-seated.md) / b-seated-curl | B实例屈膝究竟坐姿还是其他摆位、伸膝模式和支撑关系待核；B实例屈膝姿势未定，不允许直接套入A的坐姿教学 |
| [leg-extension-seated](equipment-review/action-prompts/leg-extension-seated.md) / a-extension | 伸膝与坐姿屈膝的原机调节、上固定垫位置、完整侧景缺证据 |
| [leg-extension-seated](equipment-review/action-prompts/leg-extension-seated.md) / b-extension | B实例屈膝究竟坐姿还是其他摆位、伸膝模式和支撑关系待核；B实例伸膝配置未核实 |
| [leg-press](equipment-review/action-prompts/leg-press.md) / angled-plate-loaded | 安全挡、释放与挂回方法、完整侧景未确认；不写精确45度 |
| [leg-press](equipment-review/action-prompts/leg-press.md) / horizontal-selectorized | 整机侧景、移动部件、进出方式与限位未确认 |
| [machine-chest-press](equipment-review/action-prompts/machine-chest-press.md) / standard | 清晰动作铭牌、握把运动平面和坐向缺证据；不得指定为推胸或推肩成品；上斜推胸与推肩子型待铭牌/原机动作图确认；E15/E21只是候选，未确认前不选定任一为正式机型 |
| [machine-glute-extension](equipment-review/action-prompts/machine-glute-extension.md) / standard | 工作腿与支撑腿的接触面、跪/站摆位、完整原机动作图待核 |
| [machine-reverse-fly](equipment-review/action-prompts/machine-reverse-fly.md) / standard | 起始档位编号和精确型号未知；基础长把夹胸可按可见结构设计，后束模式未被证实；照片38未证明后束模式，不能借夹胸的ready状态放行 |
| [machine-shoulder-press](equipment-review/action-prompts/machine-shoulder-press.md) / standard | 清晰动作铭牌、握把运动平面和坐向缺证据；不得指定为推胸或推肩成品；上斜推胸与推肩子型待铭牌/原机动作图确认 |
| [overhead-tricep-extension-lower-position](equipment-review/action-prompts/overhead-tricep-extension-lower-position.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [pallof-press](equipment-review/action-prompts/pallof-press.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [plate-loaded-incline-chest-press](equipment-review/action-prompts/plate-loaded-incline-chest-press.md) / standard | 上斜推胸与推肩子型待铭牌/原机动作图确认 |
| [plate-loaded-lat-pulldown](equipment-review/action-prompts/plate-loaded-lat-pulldown.md) / standard | 远侧握位、完整工作臂连接与坐向示意仍缺清晰证据 |
| [plate-loaded-lying-chest-press](equipment-review/action-prompts/plate-loaded-lying-chest-press.md) / standard | 完整侧景、躺卧头脚方向、起始握位和结束归位缺证据 |
| [plate-loaded-seated-row](equipment-review/action-prompts/plate-loaded-seated-row.md) / standard | 小黑垫究竟接触胸/腹何处、坐姿距离和全行程待原机示意补证；分动不代表已放行单臂版本 |
| [reverse-cable-fly](equipment-review/action-prompts/reverse-cable-fly.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [reverse-hyper](equipment-review/action-prompts/reverse-hyper.md) / standard | 倾角和承重未实测；基础自重姿势可据两视角定位，不写固定45度或允许额外负重；E07原机是否允许反向摆位及承重未知，禁止由基础背伸展推定 |
| [seated-dip-machine](equipment-review/action-prompts/seated-dip-machine.md) / standard | 坐姿下压身份、原装握把、工作方向和人体支撑未确认 |
| [seated-machine-row](equipment-review/action-prompts/seated-machine-row.md) / standard | 小黑垫究竟接触胸/腹何处、坐姿距离和全行程待原机示意补证；现有网页胸托描述只有在本机小黑垫用途被证实后才可关联 |
| [stair-climber](equipment-review/action-prompts/stair-climber.md) / standard | 该实例控制台、启停/急停、踏阶深度和回卷边界缺近景 |
| [straight-arm-lat-pulldown](equipment-review/action-prompts/straight-arm-lat-pulldown.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [triceps-pushdown-with-rope](equipment-review/action-prompts/triceps-pushdown-with-rope.md) / standard | 20/22物理实例关系未定；需目标22实例在所需高度的附件连接及完整行程证据 |
| [weighted-back-extension](equipment-review/action-prompts/weighted-back-extension.md) / standard | 倾角和承重未实测；基础自重姿势可据两视角定位，不写固定45度或允许额外负重；原凳额外承重及目标负重实拍未核，不从基础自重ready继承放行 |

## 本轮新增通用定位依据

以下三页在2026-09-12实际打开，支持主肌边界、深浅层关系与一般关节功能，不能用于识别现场机型或证明激活率排序：

- [OpenStax 11.5 肩带与上肢肌肉](https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs)：肩、背、胸和肘屈伸肌的定位。
- [OpenStax 11.6 骨盆与下肢肌肉](https://openstax.org/books/anatomy-and-physiology-2e/pages/11-6-appendicular-muscles-of-the-pelvic-girdle-and-lower-limbs)：臀、大腿和小腿肌群的定位。
- [OpenStax 11.4 腹壁肌肉](https://openstax.org/books/anatomy-and-physiology-2e/pages/11-4-axial-muscles-of-the-abdominal-wall-and-thorax)：腹直肌、腹斜肌、腹横肌的表层/深层关系。

## 验收口径

校验检查目录覆盖、动作ID与数据源、变式及工位键、照片编号与路径、角色完整性、图内指导与页面文案、占位符、旧规则、阶段完全重复和状态一致性。脚本不能判定语义上几乎相同的姿势、来源真实性或图像质量，仍需逐动作阅读和未来逐图验收。
