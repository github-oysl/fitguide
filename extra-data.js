// 扩展实拍器械动作（37 个），全面对齐 Muscle & Strength 720p 演示视频与实拍工位
(function () {
  const extendedExercises = [
  {
    "id": "assisted-dip",
    "name": "辅助双杠臂屈伸",
    "en": "ASSISTED DIP",
    "category": "arms",
    "muscles": [
      "triceps",
      "chest"
    ],
    "equipment": "machine",
    "attachment": "E11 辅助引体／双杠机＋双杠把手＋跪托垫",
    "availability": "辅助引体双杠机 (E11)",
    "source": "https://www.muscleandstrength.com/exercises/band-assisted-dip",
    "video": "https://www.muscleandstrength.com/exercises/band-assisted-dip",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌、肱三头肌",
    "secondary": "三角肌前束辅助",
    "steps": [
      "先在配重片选择好辅助重量（注意：数值越大辅助越省力）。",
      "双手握紧双杠把手，双膝平稳置于承托垫上，手臂伸直、肩胛下沉。",
      "屈肘缓慢受控下降，至上臂接近与地面平行即可，避免过度拉扯肩关节。",
      "掌根发力推压把手升起身体，顶端肘关节微屈不锁死。"
    ],
    "mistake": "配重数值越大越省力，进阶方向是逐步减小配重；避免下放过深或耸肩借力。",
    "cue": "双肘微向后，掌根发力推回不锁死。",
    "sets": "3–4 组 × 8–12 次（中等辅助）",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "assisted-pull-up",
    "name": "辅助引体向上",
    "en": "ASSISTED PULL-UP",
    "category": "back",
    "muscles": [
      "lats",
      "biceps"
    ],
    "equipment": "machine",
    "attachment": "E11 辅助引体双杠机＋引体把手＋跪托垫",
    "availability": "辅助引体双杠机 (E11)",
    "source": "https://www.muscleandstrength.com/exercises/band-assisted-pull-up-from-foot",
    "video": "https://www.muscleandstrength.com/exercises/band-assisted-pull-up-from-foot",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "背阔肌、大圆肌",
    "secondary": "肱二头肌、前臂屈肌、中斜方肌与核心辅助",
    "steps": [
      "选择适当辅助配重，双手正握宽把手，双膝跪在承托垫上自然下垂。",
      "沉肩挺胸，启动背阔肌，主动将双肘向身体两侧下拉。",
      "将身体拉起至下巴过杠或胸部接近把手高度，顶峰挤压背阔肌。",
      "缓慢控制身体下放还原至手臂伸展，不猛落，保持核心收紧。"
    ],
    "mistake": "不要靠身体蹬动弹震借力；配重越大越省力，能规范完成后逐步减小辅助。",
    "cue": "想象双肘向肋骨两侧下拉，胸口主动迎向横杆。",
    "sets": "3–4 组 × 8–12 次（中等辅助）",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "barbell-bench-press",
    "name": "杠铃卧推",
    "en": "BARBELL BENCH PRESS",
    "category": "chest",
    "muscles": [
      "chest",
      "triceps",
      "front-delt"
    ],
    "equipment": "barbell",
    "attachment": "B03/E17 奥林匹克杠铃＋卧推训练凳＋安全护杠",
    "availability": "杠铃卧推架 (B03/E17)",
    "source": "https://www.muscleandstrength.com/exercises/barbell-bench-press.html",
    "video": "https://www.muscleandstrength.com/exercises/barbell-bench-press.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌、肱三头肌",
    "secondary": "三角肌前束、胸小肌、前锯肌、核心稳定肌",
    "steps": [
      "平躺在卧推凳上，双脚踩实地面，肩胛后缩下沉，双眼正对杠铃杆。",
      "正握杠铃，握距略宽于肩，出架并将杠铃移至胸部上方稳定。",
      "吸气缓慢下放杠铃至下胸或胸骨中下段，双肘相对躯干约 45°–75°。",
      "呼气发力推起杠铃至胸部上方起始位置，顶峰肘关节微屈不锁死。"
    ],
    "mistake": "避免双肘过度外展（90°）导致肩关节撞击；臀部切勿抬离凳面。",
    "cue": "肩胛收紧贴凳，小臂垂直推起，杠铃微弧轨迹。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "barbell-overhead-press",
    "name": "杠铃站姿推举",
    "en": "BARBELL OVERHEAD PRESS",
    "category": "shoulders",
    "muscles": [
      "front-delt",
      "side-delt",
      "triceps"
    ],
    "equipment": "barbell",
    "attachment": "B03 杠铃架＋标准奥杆",
    "availability": "杠铃深蹲推举架 (B03)",
    "source": "https://www.muscleandstrength.com/exercises/military-press-behind-neck.html",
    "video": "https://www.muscleandstrength.com/exercises/military-press-behind-neck.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "三角肌（以前束为主）",
    "secondary": "肱三头肌、三角肌中束、斜方肌、肩袖、核心",
    "steps": [
      "将杠铃架设在接近胸骨高度，正握杠杆约肩宽，杠铃置于锁骨上胸前方。",
      "双脚约肩宽站稳，收紧腹部和臀大肌，微微后仰头部避让杠铃。",
      "呼气沿垂直轨迹推起杠铃，杠铃过头后躯干自然回位，顶峰双臂伸展。",
      "吸气缓慢控制杠铃下放回到锁骨起点，避免腰椎大幅后仰借力。"
    ],
    "mistake": "切勿大幅后仰腰椎借力代偿，核心全程收紧保持骨盆中立。",
    "cue": "收紧核心与臀部，垂直向上推过头顶。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "barbell-romanian-deadlift",
    "name": "杠铃罗马尼亚硬拉",
    "en": "BARBELL ROMANIAN DEADLIFT",
    "category": "legs",
    "muscles": [
      "hamstrings",
      "glute-max"
    ],
    "equipment": "barbell",
    "attachment": "B03 杠铃架＋奥杆＋胶垫杠铃片",
    "availability": "杠铃自由力量区 (B03)",
    "source": "https://www.muscleandstrength.com/exercises/barbell-sumo-romanian-deadlift",
    "video": "https://www.muscleandstrength.com/exercises/barbell-sumo-romanian-deadlift",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "腘绳肌、臀大肌 · 大腿后侧与臀部",
    "secondary": "竖脊肌、内收肌、斜方肌、前臂握力、背阔肌",
    "steps": [
      "双脚与髋同宽站立，双手正握杠铃略宽于双腿，自然站直收紧核心。",
      "膝关节微屈（约 15°）并全程固定角度，以髋为折叶向后推臀部。",
      "杠铃始终贴着大腿向下移动，至小腿中段并感受大腿后侧强烈牵拉。",
      "收紧臀肌和腘绳肌，向前顶髋伸直身体站起，恢复初始站姿。"
    ],
    "mistake": "避免做成深蹲（膝盖过度前屈）或弓背；杠铃始终紧贴身体移动。",
    "cue": "膝微屈固定，髋部后推，用后侧链拉回身体。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "barbell-row",
    "name": "杠铃俯身划船",
    "en": "BARBELL BENT-OVER ROW",
    "category": "back",
    "muscles": [
      "mid-back",
      "lats",
      "biceps"
    ],
    "equipment": "barbell",
    "attachment": "B03 杠铃架＋奥杆＋胶垫杠铃片",
    "availability": "杠铃自由力量区 (B03)",
    "source": "https://www.muscleandstrength.com/exercises/bent-over-barbell-row.html",
    "video": "https://www.muscleandstrength.com/exercises/bent-over-barbell-row.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "背阔肌、斜方肌、三角肌后束",
    "secondary": "肱二头肌、下背、前臂屈肌、肩袖",
    "steps": [
      "双脚与肩同宽站稳，双手正握杠铃略宽于腿外侧。",
      "屈膝屈髋俯身，躯干前倾约 45° 并保持脊柱中立平直。",
      "背部发力，双肘贴近身体向后向上提拉杠铃，触碰肚脐或下腹部。",
      "顶峰短暂停顿夹紧肩胛骨，再缓慢受控伸臂下放杠铃至起始位。"
    ],
    "mistake": "避免借助腿部蹬伸和腰部猛甩；腰背必须挺直锁定，切勿弓背。",
    "cue": "背部平直俯身，双肘向后向上划向肚脐。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "barbell-squat",
    "name": "杠铃深蹲",
    "en": "BARBELL BACK SQUAT",
    "category": "legs",
    "muscles": [
      "quads",
      "glute-max"
    ],
    "equipment": "barbell",
    "attachment": "B03 深蹲架＋奥杆＋杠铃锁扣",
    "availability": "杠铃深蹲架 (B03)",
    "source": "https://www.muscleandstrength.com/exercises/1-4-squat.html",
    "video": "https://www.muscleandstrength.com/exercises/1-4-squat.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "股四头肌 · 大腿前侧",
    "secondary": "臀大肌、内收肌、小腿、核心、上背与肩承托",
    "steps": [
      "将杠铃卡在上背斜方肌上，双手握稳杠杆，起架后后退一至两步站稳。",
      "双脚约与肩同宽，脚尖微向外展约 15°–30°，收紧核心并吸气。",
      "屈髋屈膝同时向下蹲，膝盖朝脚尖方向展开，下蹲至大腿与地面接近平行。",
      "全脚掌蹬地站起，呼气回到站立位置，顶端膝关节微屈不超伸。"
    ],
    "mistake": "避免膝盖内扣、脚跟离地或骨盆过早卷起（屁股眨眼）；先从空杆找准平衡。",
    "cue": "杠铃稳压上背，屈髋屈膝同时下蹲，膝盖追随脚尖。",
    "sets": "3–4 组 × 6–10 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-hip-extension",
    "name": "绳索髋伸展／后踢",
    "en": "CABLE HIP EXTENSION (KICKBACK)",
    "category": "legs",
    "muscles": [
      "glute-max",
      "hamstrings"
    ],
    "equipment": "cable",
    "attachment": "E03 龙门架低位滑轮＋脚踝绑带",
    "availability": "双侧可调滑轮 (E03)",
    "source": "https://www.muscleandstrength.com/exercises/cable-concentration-tricep-extension.html",
    "video": "https://www.muscleandstrength.com/exercises/cable-concentration-tricep-extension.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "臀大肌",
    "secondary": "腘绳肌、核心、臀中／小肌稳定骨盆",
    "steps": [
      "将绑带系在一侧脚踝并扣在低位滑轮，双手扶立柱保持身体平衡。",
      "躯干微前倾，支撑腿微屈，活动腿在身前轻微屈膝启动。",
      "收紧臀大肌，驱动脚后跟将腿向后上方伸展踢出，骨盆保持正对前方。",
      "在顶峰紧绷臀肌 1 秒，然后缓慢受控送回起始位置，换腿重复。"
    ],
    "mistake": "切勿靠腰椎大幅超伸拱腰来换取后踢幅度；必须孤立臀肌发力。",
    "cue": "躯干微前倾固定，脚跟带动腿向后上方蹬出。",
    "sets": "3 组 × 12–15 次／侧",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-pull-through",
    "name": "绳索胯下拉",
    "en": "CABLE PULL-THROUGH",
    "category": "legs",
    "muscles": [
      "glute-max",
      "hamstrings"
    ],
    "equipment": "cable",
    "attachment": "E03 龙门架低位滑轮＋双头绳索",
    "availability": "双侧可调滑轮 (E03)",
    "source": "https://www.muscleandstrength.com/exercises/bent-over-cable-rear-delt-fly",
    "video": "https://www.muscleandstrength.com/exercises/bent-over-cable-rear-delt-fly",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "臀大肌、腘绳肌",
    "secondary": "下背稳定、核心",
    "steps": [
      "将双头绳扣在最低位滑轮，背对机器跨立在绳索上方，双手握绳端。",
      "向前跨出一两步使绳索拉紧，双脚宽于肩，膝盖微屈。",
      "保持背部挺直，屈髋把臀部向后方滑轮推去，绳子顺势从胯下穿过。",
      "脚跟蹬地、强力向前顶髋，在完全站直的顶端强烈收缩臀大肌。"
    ],
    "mistake": "这是铰链动作而非深蹲；膝盖不要大幅向前屈曲，主要由髋关节折叠驱动。",
    "cue": "背对滑轮屈髋推臀，向前顶髋夹紧臀部。",
    "sets": "3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-single-arm-row",
    "name": "站姿单臂绳索划船",
    "en": "STANDING SINGLE-ARM CABLE ROW",
    "category": "back",
    "muscles": [
      "lats",
      "mid-back"
    ],
    "equipment": "cable",
    "attachment": "E03 龙门架中低位滑轮＋单手把手",
    "availability": "双侧可调滑轮 (E03)",
    "source": "https://www.muscleandstrength.com/exercises/one-arm-cable-lateral-raise.html",
    "video": "https://www.muscleandstrength.com/exercises/one-arm-cable-lateral-raise.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "背阔肌",
    "secondary": "肱二头肌、前臂屈肌、肩袖、中背",
    "steps": [
      "将滑轮调至胸腹高度，单手握把手，后退一步成前后弓步站立。",
      "躯干端正微前倾，手臂前伸使背阔肌充分拉伸展开。",
      "启动背肌，带动肘部向后向下贴着肋骨划动，将把手拉至躯干侧面。",
      "顶峰感受单侧背肌夹紧，再缓慢控制手臂前送伸展，换边进行。"
    ],
    "mistake": "避免靠身体旋转后甩借力；躯干保持稳定正对前方。",
    "cue": "躯干稳定不扭转，肘部沿肋骨向后拉。",
    "sets": "3 组 × 10–12 次／侧",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-standing-chest-press",
    "name": "站姿绳索推胸",
    "en": "CABLE STANDING CHEST PRESS",
    "category": "chest",
    "muscles": [
      "chest",
      "front-delt"
    ],
    "equipment": "cable",
    "attachment": "E03 龙门架胸高滑轮＋单手把手",
    "availability": "双侧可调滑轮 (E03)",
    "source": "https://www.muscleandstrength.com/exercises/cable-chest-press.html",
    "video": "https://www.muscleandstrength.com/exercises/cable-chest-press.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌 · 肩水平内收",
    "secondary": "三角肌前束、肱三头肌、核心",
    "steps": [
      "双侧滑轮调至胸部高度，双手握把手向前迈一步呈前后弓步站稳。",
      "躯干微前倾并收紧核心，双肘打开至身体两侧，大臂约 45°。",
      "呼气由胸大肌发力将双侧把手向前推出聚拢，顶端双臂自然伸直。",
      "吸气缓慢沿弧线回落，感受胸肌拉伸，动作全程保持肩膀下沉。"
    ],
    "mistake": "前后弓步必须稳固，核心保持收紧；不要被绳索拉扯后仰。",
    "cue": "前后弓步稳定，双手向前合推聚拢。",
    "sets": "3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "dead-bug",
    "name": "死虫式",
    "en": "DEAD BUG",
    "category": "core",
    "muscles": [
      "abs"
    ],
    "equipment": "free",
    "attachment": "垫上与自由区＋瑜伽垫",
    "availability": "垫上与自由区 (FREE)",
    "source": "https://www.muscleandstrength.com/exercises/dead-bug",
    "video": "https://www.muscleandstrength.com/exercises/dead-bug",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "腹横肌（深层核心），腹直肌、腹斜肌辅助",
    "secondary": "髋屈肌、臀肌、骨盆底与多裂肌等稳定肌参与",
    "steps": [
      "仰卧在垫子上，双臂垂直指向天花板，双腿屈膝 90° 呈桌面姿势。",
      "骨盆后倾，腹肌用力收缩将下背部完全贴紧地面，不留任何缝隙。",
      "保持下背贴地，缓慢将左臂向头顶伸直、同时将右腿向前下方伸展。",
      "受控收回至起始位置，换另一侧手脚（右臂＋左腿）交替进行。"
    ],
    "mistake": "当手腿下放时下背部若出现反弓离地，说明核心失稳，应先减小下放幅度。",
    "cue": "下背始终压死地面，对侧手脚对角线伸出。",
    "sets": "3 组 × 8–12 次／侧",
    "rest": "45–60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "decline-bench-crunch",
    "name": "下斜凳卷腹",
    "en": "DECLINE BENCH CRUNCH",
    "category": "core",
    "muscles": [
      "abs"
    ],
    "equipment": "bench",
    "attachment": "E06 下斜腹肌板＋脚部固定滚垫",
    "availability": "下斜腹肌凳 (E06)",
    "source": "https://www.muscleandstrength.com/exercises/decline-bench-cable-crunch.html",
    "video": "https://www.muscleandstrength.com/exercises/decline-bench-cable-crunch.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "腹直肌 · 躯干屈曲",
    "secondary": "腹外/腹内斜肌、腹横肌稳定参与；髋屈肌参与很小",
    "steps": [
      "坐上下斜凳，双脚牢固卡入顶端固定圆垫，仰卧躺平在斜板上。",
      "双手交叉置于胸前或轻触耳后（切勿抱头拉扯颈椎）。",
      "呼气收紧腹直肌，像卷地毯一样带动肩胛与上背部逐节卷起。",
      "达到顶峰收缩后，吸气极其缓慢地逐节贴回斜板，保持腹部持续张力。"
    ],
    "mistake": "不要双手抱头猛拉脖子，也不要完全坐直导致腹肌失去张力。",
    "cue": "双脚勾紧圆垫，腹部像卷地毯一样卷起。",
    "sets": "3 组 × 12–15 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "dumbbell-bench-press",
    "name": "哑铃卧推",
    "en": "DUMBBELL BENCH PRESS",
    "category": "chest",
    "muscles": [
      "chest",
      "triceps",
      "front-delt"
    ],
    "equipment": "dumbbell",
    "attachment": "B01 哑铃架＋B02 独立平凳",
    "availability": "哑铃架与训练凳 (B01/B02)",
    "source": "https://www.muscleandstrength.com/exercises/dumbbell-bench-press.html",
    "video": "https://www.muscleandstrength.com/exercises/dumbbell-bench-press.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌 · 主动发力",
    "secondary": "来源（NASM）列三角肌前束、胸小肌、前锯肌与核心稳定肌",
    "steps": [
      "坐在平凳边，双手持哑铃置于大腿上，顺势躺平并将哑铃带至胸口两侧。",
      "双脚平踩地面，肩胛骨后缩下沉贴凳，上臂与身体大约呈 45°–60°。",
      "呼气胸肌发力将哑铃垂直向上推起，顶端两哑铃靠近但避免相撞。",
      "吸气缓慢受控地下放哑铃至胸肌感到充分牵拉，下放深度与胸平齐。"
    ],
    "mistake": "避免大臂过度外展成 90° 损伤肩峰；下放不可过快失去肌肉控制。",
    "cue": "双脚踩实地面，大臂呈 45° 推起，顶点不撞击。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "dumbbell-curl",
    "name": "哑铃弯举",
    "en": "DUMBBELL CURL",
    "category": "arms",
    "muscles": [
      "biceps"
    ],
    "equipment": "dumbbell",
    "attachment": "B01 阶梯哑铃架＋同重哑铃",
    "availability": "哑铃区 (B01)",
    "source": "https://www.muscleandstrength.com/exercises/alternate-dumbbell-hammer-preacher-curl.html",
    "video": "https://www.muscleandstrength.com/exercises/alternate-dumbbell-hammer-preacher-curl.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "肱二头肌 · 主动发力",
    "secondary": "肱桡肌、前臂屈肌群；若动作失控还会涉及前三角肌与斜方肌",
    "steps": [
      "站立或坐姿，双手各持一只哑铃垂于身侧，掌心朝内（中立握）。",
      "大臂紧贴身体两侧保持不动，肘部弯曲将哑铃向上弯举。",
      "上举过程中手腕自然向外旋转，至顶峰时掌心朝上强烈挤压肱二头肌。",
      "受控缓慢下放哑铃至手臂自然伸直，避免身体前后摇晃借力。"
    ],
    "mistake": "切勿靠后仰甩动身体借力；手肘不要向前抬起代替小臂弯曲。",
    "cue": "大臂夹在身侧不动，掌心旋上将哑铃卷起。",
    "sets": "3 组 × 10–12 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "dumbbell-hammer-curl",
    "name": "哑铃锤式弯举",
    "en": "DUMBBELL HAMMER CURL",
    "category": "arms",
    "muscles": [
      "brachialis",
      "biceps"
    ],
    "equipment": "dumbbell",
    "attachment": "B01 阶梯哑铃架＋同重哑铃",
    "availability": "哑铃区 (B01)",
    "source": "https://www.muscleandstrength.com/exercises/alternate-dumbbell-hammer-preacher-curl.html",
    "video": "https://www.muscleandstrength.com/exercises/alternate-dumbbell-hammer-preacher-curl.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "来源以肘屈肌群为主：肱二头肌与位于其下的肱肌，中立握使肱肌参与高于常规弯举",
    "secondary": "来源一致强调中立握下肱桡肌与前臂屈肌群参与；握力稳定",
    "steps": [
      "双脚与肩同宽站稳，双手持哑铃自然下垂，掌心始终相对。",
      "保持大臂固定在身体两侧，双肘屈曲向上弯举哑铃。",
      "弯举至顶端，拇指朝上，专注感受肱肌与前臂外侧肌群的强力收缩。",
      "平稳受控下放哑铃至初始垂放位置，动作全程手腕保持中立不折腕。"
    ],
    "mistake": "手腕不要前后晃动；大臂始终钉在躯干侧方，不借肩部前抬。",
    "cue": "手心相对中立握，像敲锤子一样匀速上卷。",
    "sets": "3 组 × 10–12 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "dumbbell-lateral-raise",
    "name": "哑铃侧平举",
    "en": "DUMBBELL LATERAL RAISE",
    "category": "shoulders",
    "muscles": [
      "side-delt"
    ],
    "equipment": "dumbbell",
    "attachment": "B01 哑铃架＋轻重量哑铃",
    "availability": "哑铃区 (B01)",
    "source": "https://www.muscleandstrength.com/exercises/dumbbell-lateral-raise.html",
    "video": "https://www.muscleandstrength.com/exercises/dumbbell-lateral-raise.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "三角肌中束（外侧束） · 主动发力",
    "secondary": "来源列三角肌前束为次要；肩胛与斜方肌为稳定参与，不强迫倒水式手位",
    "steps": [
      "自然站立，双手各握一只轻重量哑铃置于大腿前方，双肘保留微屈。",
      "躯干微微前倾，肩膀下沉，避免斜方肌预先耸起。",
      "通过手肘带动上臂向两侧抬起，沿肩胛骨平面抬至上臂与地面大致水平。",
      "在顶端短暂停留，再缓慢平稳下放还原，全程保持肌肉张力。"
    ],
    "mistake": "不要使用过大重量导致耸肩代偿或后仰甩身；手臂不要完全锁死伸直。",
    "cue": "手肘微屈引路，沿肩胛骨平面向侧上方展开。",
    "sets": "3–4 组 × 12–15 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "dumbbell-one-arm-row",
    "name": "单臂哑铃划船",
    "en": "DUMBBELL ONE-ARM ROW",
    "category": "back",
    "muscles": [
      "lats",
      "mid-back",
      "biceps"
    ],
    "equipment": "dumbbell",
    "attachment": "B01 哑铃架＋B02 独立平凳",
    "availability": "哑铃区与训练凳 (B01/B02)",
    "source": "https://www.muscleandstrength.com/exercises/one-arm-dumbbell-row.html",
    "video": "https://www.muscleandstrength.com/exercises/one-arm-dumbbell-row.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "背阔肌 · 主动发力",
    "secondary": "来源列三角肌后束、肱二头肌、肱肌、前臂屈肌、竖脊肌与腹斜肌（抗旋转）等",
    "steps": [
      "单手单膝跪于平凳上支撑，背部平直中立，外侧手自然下垂握住哑铃。",
      "肩膀自然下沉，让肩胛骨带动背阔肌在起始位置得到充分延展。",
      "由背部发力，引导肘部沿着身体侧面向上向后划动，拉至腰际附近。",
      "顶峰收缩背肌 1 秒，然后缓慢控制哑铃下放至手臂伸直起始位。"
    ],
    "mistake": "避免躯干剧烈旋转借力；背部必须保持平直，切勿弓腰。",
    "cue": "支撑手撑稳，肘部向臀部方向贴身划动。",
    "sets": "3 组 × 8–12 次／侧",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "dumbbell-rdl",
    "name": "哑铃罗马尼亚硬拉",
    "en": "DUMBBELL ROMANIAN DEADLIFT",
    "category": "legs",
    "muscles": [
      "hamstrings",
      "glute-max"
    ],
    "equipment": "dumbbell",
    "attachment": "B01 阶梯哑铃架＋同重哑铃",
    "availability": "哑铃区 (B01)",
    "source": "https://www.muscleandstrength.com/exercises/barbell-sumo-romanian-deadlift",
    "video": "https://www.muscleandstrength.com/exercises/barbell-sumo-romanian-deadlift",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "臀大肌、腘绳肌与下背（竖脊肌） · 主动发力",
    "secondary": "内收肌群、斜方肌与前臂屈肌群辅助",
    "steps": [
      "双脚微内收约与髋同宽，双手各持一只哑铃垂于大腿前侧，挺胸收腹。",
      "膝盖保持微屈并在动作中固定角度，以髋关节为折轴将臀部向后推。",
      "哑铃紧贴着腿部表面向下滑动，至膝盖下方感受大腿后侧明显张力。",
      "脚跟压实地面，收缩臀肌强力向前顶髋，将身体恢复到直立站姿。"
    ],
    "mistake": "严禁弓背或低头盯地；哑铃不可脱离腿部悬空，否则下背负担倍增。",
    "cue": "膝角微屈固定，臀向后顶，哑铃贴腿下放。",
    "sets": "3–4 组 × 10–12 次",
    "rest": "90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "glute-bridge",
    "name": "臀桥",
    "en": "GLUTE BRIDGE",
    "category": "legs",
    "muscles": [
      "glute-max",
      "hamstrings"
    ],
    "equipment": "free",
    "attachment": "垫上与自由区＋瑜伽垫",
    "availability": "垫上与自由区 (FREE)",
    "source": "https://www.muscleandstrength.com/exercises/banded-glute-bridge",
    "video": "https://www.muscleandstrength.com/exercises/banded-glute-bridge",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "臀大肌，髋伸主导",
    "secondary": "腘绳肌、腹部核心、下背，内收肌辅助",
    "steps": [
      "仰卧在垫上，双膝弯曲约 90°，双脚与肩同宽踩地，双手自然放于身侧。",
      "腹肌微收固定骨盆，通过脚后跟向下蹬地发力。",
      "强力收紧臀大肌将髋部抬起，直至膝盖、髋关节与肩膀连成一条直线。",
      "在顶端停留 1–2 秒充分夹紧臀部，然后受控将臀部缓慢下落接近地面。"
    ],
    "mistake": "不要依靠过度拱起下背部（腰椎超伸）来抬高身体；发力点应集中于臀大肌。",
    "cue": "脚跟压地，收紧臀部顶起髋关节成一直线。",
    "sets": "3 组 × 15–20 次",
    "rest": "45–60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "goblet-squat",
    "name": "高脚杯深蹲",
    "en": "GOBLET SQUAT",
    "category": "legs",
    "muscles": [
      "quads",
      "glute-max"
    ],
    "equipment": "dumbbell",
    "attachment": "B01 哑铃架＋单只哑铃",
    "availability": "哑铃区 (B01)",
    "source": "https://www.muscleandstrength.com/exercises/dumbbell-goblet-box-squat",
    "video": "https://www.muscleandstrength.com/exercises/dumbbell-goblet-box-squat",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "股四头肌、臀大肌为主，另含内收肌群；前负荷使躯干更直立、膝屈更明显",
    "secondary": "来源列小腿、下背（竖脊肌）与核心为次要/稳定参与",
    "steps": [
      "双手像托酒杯一样端住哑铃一端，贴紧胸口中央，双肘朝下。",
      "双脚站立略宽于肩，脚尖微向外展约 20°–30°，挺胸收紧核心。",
      "屈髋屈膝平稳下蹲，双肘自然下沉并置于双膝内侧之间，大腿达水平。",
      "脚后跟与全脚掌均匀蹬地站直身体，回到站立初始位。"
    ],
    "mistake": "哑铃切勿离开胸口向前倾倒；保持胸部挺拔，避免弯腰驼背。",
    "cue": "双手托哑铃贴胸，手肘下落到双膝内侧。",
    "sets": "3 组 × 10–12 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "hack-squat",
    "name": "哈克深蹲",
    "en": "HACK SQUAT",
    "category": "legs",
    "muscles": [
      "quads",
      "glute-max"
    ],
    "equipment": "machine",
    "attachment": "E10 斜轨哈克深蹲机＋双肩垫＋大踏板",
    "availability": "斜轨哈克深蹲机 (E10)",
    "source": "https://www.muscleandstrength.com/exercises/hack-squat.html",
    "video": "https://www.muscleandstrength.com/exercises/hack-squat.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "股四头肌 · 大腿前侧",
    "secondary": "臀大肌、腘绳肌、内收肌群，小腿、核心与竖脊肌参与稳定",
    "steps": [
      "站上脚踏平台，双肩置于肩托垫下，背部和臀部完全贴实倾斜靠垫。",
      "双脚约肩宽踩稳踏板中上部，伸膝微蹬起滑车，扳动手柄解除安全卡位。",
      "屈膝缓慢顺着轨道下蹲至大腿接近与踏板平行，膝盖顺着脚尖方向展开。",
      "脚跟均匀发力蹬起滑车回到起点，膝盖微屈不锁死；完成时卡紧安全手柄。"
    ],
    "mistake": "整个过程背臀不可脱离靠垫；下蹲深度以脚跟不离台、腰背不卷曲为限。",
    "cue": "背部贴实倾斜靠垫，脚跟踩稳，沿滑轨平稳蹲起。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "hip-adduction-machine",
    "name": "坐姿髋内收",
    "en": "HIP ADDUCTION MACHINE",
    "category": "legs",
    "muscles": [
      "glute-med"
    ],
    "equipment": "machine",
    "attachment": "E23 髋内外展双向机＋旋转腿垫（内收模式）",
    "availability": "坐姿髋内外展机 (E23)",
    "source": "https://www.muscleandstrength.com/exercises/hip-adduction-machine.html",
    "video": "https://www.muscleandstrength.com/exercises/hip-adduction-machine.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "髋内收肌群 · 大腿内侧（大收肌、长收肌、短收肌、耻骨肌、股薄肌等）",
    "secondary": "髋与骨盆稳定肌群辅助",
    "steps": [
      "调节腿垫朝内锁定，坐在座椅上，将双腿置于两侧腿垫外侧。",
      "拉起调节把手将起始开角调至大腿内侧舒适牵拉的最大范围。",
      "双手握住身旁稳定把手，背部贴垫，内收大腿将腿垫向中间挤压合拢。",
      "在两垫相触时短暂停留，再缓慢控制阻力展开双腿回到起始位。"
    ],
    "mistake": "合拢时不要靠上身晃动前冲；回放时配重不要直接碰撞，保持内侧控制。",
    "cue": "大腿内侧用力，将两侧护垫匀速夹紧合拢。",
    "sets": "3 组 × 12–15 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "machine-glute-extension",
    "name": "器械髋伸展／后蹬",
    "en": "MACHINE GLUTE EXTENSION",
    "category": "legs",
    "muscles": [
      "glute-max",
      "hamstrings"
    ],
    "equipment": "machine",
    "attachment": "E26 臀部后蹬机＋脚踏滚垫／蹬板",
    "availability": "器械臀肌后蹬机 (E26)",
    "source": "https://www.muscleandstrength.com/exercises/standing-glute-kickback.html",
    "video": "https://www.muscleandstrength.com/exercises/standing-glute-kickback.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "臀大肌 · 臀部",
    "secondary": "腘绳肌辅助，臀中肌参与稳定",
    "steps": [
      "调节支撑胸垫或手柄，单腿跪于支撑垫或站稳，工作腿脚掌踏在蹬板上。",
      "收紧腹部核心保持骨盆朝向正前方，背部保持中立。",
      "由臀大肌主导发力，将脚踏向后上方平稳蹬出，直至腿部接近伸展。",
      "在顶端强烈夹紧臀大肌停留 1 秒，然后缓慢受控屈膝收回起点。"
    ],
    "mistake": "避免骨盆随腿部向外翻转或下背部过度反弓借力；集中于臀部收缩。",
    "cue": "单侧脚后跟后蹬，在顶峰用力挤压臀大肌。",
    "sets": "3 组 × 12–15 次／侧",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "machine-reverse-fly",
    "name": "器械反向飞鸟",
    "en": "MACHINE REVERSE FLY",
    "category": "shoulders",
    "muscles": [
      "rear-delt",
      "mid-back"
    ],
    "equipment": "machine",
    "attachment": "E19 蝴蝶机／反向飞鸟机＋垂直把手",
    "availability": "蝴蝶机／长臂夹胸机 (E19)",
    "source": "https://www.muscleandstrength.com/exercises/machine-reverse-fly",
    "video": "https://www.muscleandstrength.com/exercises/machine-reverse-fly",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "三角肌后束",
    "secondary": "中斜方肌、菱形肌、上背稳定肌",
    "steps": [
      "面向椅背反坐，调节座椅高度使双手握把手时上臂接近肩高。",
      "胸口稳贴在靠垫上，双手握紧垂直把手，手肘保留微屈并锁定。",
      "三角肌后束发力，将双臂沿水平弧线向两侧后方展开，直至上臂与躯干平齐。",
      "在顶峰短暂停顿感受肩后束收缩，随后缓慢受控回放至起始位置。"
    ],
    "mistake": "不要大幅耸肩或过度依赖夹拢肩胛骨代替肩后束展开；肘部保持微屈锁定。",
    "cue": "反向胸口贴垫，双肘微屈向身体两侧水平展臂。",
    "sets": "3 组 × 12–15 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "plank",
    "name": "平板支撑",
    "en": "PLANK",
    "category": "core",
    "muscles": [
      "abs",
      "obliques"
    ],
    "equipment": "free",
    "attachment": "垫上与自由区＋瑜伽垫",
    "availability": "垫上与自由区 (FREE)",
    "source": "https://www.muscleandstrength.com/exercises/hover.html",
    "video": "https://www.muscleandstrength.com/exercises/hover.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "核心肌群：腹直肌、腹斜肌、腹横肌",
    "secondary": "臀肌、腘绳肌、下背竖脊肌，肩袖与肩胛稳定肌辅助",
    "steps": [
      "俯卧在垫上，以双前臂撑地，肘关节位于肩膀正下方，屈肘 90°。",
      "双脚与髋同宽前脚掌撑地，双腿伸直离开地面。",
      "腹肌紧绷、臀大肌收缩，使头顶、后背、臀部和脚跟形成平直的平板。",
      "目视双手前方地面，保持自然呼吸，以身体不颤抖下塌的时长为准。"
    ],
    "mistake": "严禁塌腰（腰椎超伸下坠）或翘起臀部；一旦姿势变形立即停止休息。",
    "cue": "前臂撑地，头颈肩背臀踝保持在一条直线。",
    "sets": "3 组 × 30–60 秒保持",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "plate-loaded-incline-chest-press",
    "name": "挂片上斜推胸",
    "en": "PLATE-LOADED INCLINE CHEST PRESS",
    "category": "chest",
    "muscles": [
      "upper-chest",
      "chest"
    ],
    "equipment": "machine",
    "attachment": "E21 挂片上斜推胸机＋倾斜靠背＋分动把手",
    "availability": "坐姿推胸机 (E21)",
    "source": "https://www.muscleandstrength.com/exercises/incline-cable-chest-press",
    "video": "https://www.muscleandstrength.com/exercises/incline-cable-chest-press",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌锁骨部（上胸）为主，前三角肌参与",
    "secondary": "肱三头肌、前三角肌辅助",
    "steps": [
      "挂好适宜杠铃片，坐在上斜座椅上，背部和后脑贴紧靠背。",
      "握住推举把手，调整座椅使把手处于锁骨与上胸平齐的位置。",
      "呼气由上胸发力将握把向前上方平稳推出，推至手臂接近伸展。",
      "吸气受控让握把缓慢后移下降，至上胸获得充分拉伸感，配重不脱力相撞。"
    ],
    "mistake": "臀部切勿从坐垫滑脱造成腰部大幅镂空；推起时肩膀始终下沉。",
    "cue": "上背贴紧倾斜靠背，双手向前上方推出。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "plate-loaded-lat-pulldown",
    "name": "挂片杠杆高位下拉",
    "en": "PLATE-LOADED LEVER LAT PULLDOWN",
    "category": "back",
    "muscles": [
      "lats",
      "biceps"
    ],
    "equipment": "machine",
    "attachment": "E14 挂片杠杆高位下拉机＋大腿压垫",
    "availability": "高位下拉工位 (E02/E14)",
    "source": "https://www.muscleandstrength.com/exercises/cable-underhand-pull-down.html",
    "video": "https://www.muscleandstrength.com/exercises/cable-underhand-pull-down.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "背阔肌 · 主动发力",
    "secondary": "肱二头肌、肩后束、前臂屈肌、肩袖参与稳定",
    "steps": [
      "两侧挂载同等配重，调节大腿固定滚垫使其严密贴紧大腿上方。",
      "双手握住上方分动把手，坐入座位并将双腿牢牢卡入压垫下。",
      "挺胸微后倾躯干，背阔肌启动将把手向下拉至锁骨与上胸之间。",
      "在收紧位置停顿片刻，然后极为缓慢地顺应阻力伸臂还原。"
    ],
    "mistake": "不要大幅前后摇晃身体借力；下拉时双肘不要过度后旋。",
    "cue": "大腿紧卡压垫，肘尖向下沉，杆臂拉至锁骨。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "plate-loaded-lying-chest-press",
    "name": "平卧挂片推胸",
    "en": "PLATE-LOADED LYING CHEST PRESS",
    "category": "chest",
    "muscles": [
      "chest",
      "triceps"
    ],
    "equipment": "machine",
    "attachment": "E22 挂片平卧推胸机＋卧推长凳＋杠杆工作臂",
    "availability": "坐姿推胸机 (E21/E22)",
    "source": "https://www.muscleandstrength.com/exercises/hammer-strength-bench-press.html",
    "video": "https://www.muscleandstrength.com/exercises/hammer-strength-bench-press.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌（以中胸部为主）",
    "secondary": "肱三头肌、三角肌前束辅助",
    "steps": [
      "挂载目标杠铃片，仰卧在长凳上，肩胛骨后缩下沉贴实皮垫。",
      "双手握住推胸握把，小臂垂直于地面，推起把手脱离初始挂钩。",
      "呼气胸大肌向中聚拢发力推起工作臂，直至双臂接近完全伸直。",
      "吸气缓慢控制把手下落至胸大肌充分拉伸位置，平稳换向。"
    ],
    "mistake": "肩膀不要向前离开凳面耸起；保持手腕竖直不反折。",
    "cue": "平躺贴凳，掌根推压把手，胸大肌强力顶峰收缩。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "plate-loaded-seated-row",
    "name": "挂片分动坐姿划船",
    "en": "PLATE-LOADED ISO-LATERAL SEATED ROW",
    "category": "back",
    "muscles": [
      "mid-back",
      "lats"
    ],
    "equipment": "machine",
    "attachment": "E20 挂片分动划船机＋胸前独立托垫",
    "availability": "胸垫式固定划船机 (E20)",
    "source": "https://www.muscleandstrength.com/exercises/one-arm-cable-row.html",
    "video": "https://www.muscleandstrength.com/exercises/one-arm-cable-row.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "Hammer Strength 将目标定为背阔肌、斜方肌、菱形肌；另一来源以背阔肌、菱形肌、中斜方肌为主",
    "secondary": "肩后束、肱二头肌、前臂/握力；单侧或无明显支撑时核心参与抗旋转",
    "steps": [
      "挂好配重，调节坐垫使胸前托垫贴在胸骨中下段，脚踩前蹬板。",
      "双手握住分动把手，双肩自然前送使背部肌肉获得适度延展。",
      "背肌启动，引导手肘向身体后方划出弧线，将握把拉向身侧。",
      "顶峰肩胛骨完全靠拢收缩，再控制把手缓慢前送回到起始位置。"
    ],
    "mistake": "胸口不要在发力时离开前托垫；拉动过程中避免脖子前伸耸肩。",
    "cue": "胸口贴稳前托垫，双肘顺轨迹向后拉过躯干。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "prone-leg-curl",
    "name": "俯卧腿弯举",
    "en": "LYING LEG CURL",
    "category": "legs",
    "muscles": [
      "hamstrings"
    ],
    "equipment": "machine",
    "attachment": "E24 俯卧腿弯举机＋小腿后侧滚垫＋俯卧垫",
    "availability": "俯卧腿弯举机 (E24)",
    "source": "https://www.muscleandstrength.com/exercises/lying-cable-hamstring-curl.html",
    "video": "https://www.muscleandstrength.com/exercises/lying-cable-hamstring-curl.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "建议稿：腘绳肌群（股二头肌、半腱肌、半膜肌）· 大腿后侧，为屈膝主动肌",
    "secondary": "腓肠肌与小腿肌群参与屈膝辅助",
    "steps": [
      "俯卧在机器软垫上，膝盖刚过台面边缘，小腿滚垫调节在脚后跟上方。",
      "双手握紧前方稳定把手，收紧腹部保持骨盆紧贴在俯卧软垫上。",
      "腘绳肌发力将小腿向上弯曲勾起，直至接近臀部位置。",
      "在顶端挤压大腿后侧，再平缓受控下放滚垫至腿部伸展但配重不相撞。"
    ],
    "mistake": "严禁勾腿时骨盆抬起、腰椎大幅反弓代偿；保持骨盆牢靠压垫。",
    "cue": "骨盆压紧台面，脚跟向上勾向臀部。",
    "sets": "3 组 × 10–12 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "reverse-hyper",
    "name": "反向背伸展",
    "en": "REVERSE HYPER",
    "category": "legs",
    "muscles": [
      "glute-max",
      "hamstrings"
    ],
    "equipment": "machine",
    "attachment": "E07 背伸展凳／罗马椅＋双髋托垫",
    "availability": "背伸展凳／罗马椅 (E07)",
    "source": "https://www.muscleandstrength.com/exercises/reverse-hyperextension",
    "video": "https://www.muscleandstrength.com/exercises/reverse-hyperextension",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "臀大肌、腘绳肌",
    "secondary": "竖脊肌等长稳定、核心",
    "steps": [
      "俯卧在罗马椅上身托垫上，髋骨前缘贴垫，双手牢牢抱住前方支架。",
      "双腿自然向下垂直垂放，保持核心紧绷稳定上半身。",
      "收紧臀大肌与大腿后侧，将双腿向后上方抬起至与躯干连成直线。",
      "顶峰强烈挤压臀肌 1 秒，缓慢控制双腿下落回到起始垂放姿势。"
    ],
    "mistake": "动作由臀部后伸驱动，不可依靠双腿前后大幅荡秋千式甩动借力。",
    "cue": "上身固定抱凳，由臀部带起双腿向后上方抬起。",
    "sets": "3 组 × 12–15 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "roman-chair-hip-extension",
    "name": "罗马椅髋主导背伸展",
    "en": "ROMAN CHAIR HIP EXTENSION",
    "category": "legs",
    "muscles": [
      "glute-max",
      "hamstrings"
    ],
    "equipment": "machine",
    "attachment": "E07 罗马椅／背伸展凳＋脚踝固定垫",
    "availability": "背伸展凳／罗马椅 (E07)",
    "source": "https://www.muscleandstrength.com/exercises/back-of-the-head-lying-tricep-extension.html",
    "video": "https://www.muscleandstrength.com/exercises/back-of-the-head-lying-tricep-extension.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "臀大肌、腘绳肌主导髋伸展",
    "secondary": "竖脊肌稳定躯干，核心参与",
    "steps": [
      "双脚卡紧后方脚垫，调整髋部垫面高度使其刚好位于大腿上段、骨盆下方。",
      "双手交叉置于胸前，背部维持平直中立，以髋关节为轴向前向下俯身折叠。",
      "俯身至大腿后侧产生饱满牵拉感（约与腿呈 90°）。",
      "强力收缩臀大肌和腘绳肌将上半身拉回，直到身体成一条直线即可停止。"
    ],
    "mistake": "切勿在顶峰过度超伸腰椎（向后猛顶反弓）；身体与腿成平直直线即到位。",
    "cue": "髋关节沿垫折叠，以臀部收紧拉回躯干成直线。",
    "sets": "3 组 × 10–15 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "seated-dip-machine",
    "name": "坐姿臂屈伸／下压",
    "en": "SEATED DIP MACHINE",
    "category": "arms",
    "muscles": [
      "triceps",
      "chest"
    ],
    "equipment": "machine",
    "attachment": "E12 坐姿臂屈伸机＋两侧下压握把",
    "availability": "辅助引体双杠机 (E11/E12)",
    "source": "https://www.muscleandstrength.com/exercises/seated-dip-machine",
    "video": "https://www.muscleandstrength.com/exercises/seated-dip-machine",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "肱三头肌",
    "secondary": "胸大肌、三角肌前束",
    "steps": [
      "调整坐垫高度，背部挺直贴靠靠背，双手握住身体两侧的下推把手。",
      "肩膀下沉，大臂垂直贴于身体两侧，肘部弯曲约 90°。",
      "肱三头肌主导发力将握把向下强力压下，直至双臂接近完全伸直。",
      "在底部停顿 1 秒充分收缩手臂后侧，然后缓慢对抗阻力屈肘回升。"
    ],
    "mistake": "避免耸肩或前倾身体压在握把上借力；肘关节在底部切勿猛烈过伸锁死。",
    "cue": "双肘收于身侧，掌心垂直向下按压把手。",
    "sets": "3 组 × 10–12 次",
    "rest": "60 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "t-bar-row-unsupported",
    "name": "俯身 T 杠划船（无胸托）",
    "en": "UNSUPPORTED T-BAR ROW",
    "category": "back",
    "muscles": [
      "mid-back",
      "lats"
    ],
    "equipment": "machine",
    "attachment": "E08 无胸托 T 杠划船器＋多把位手柄",
    "availability": "无胸托 T 杠划船器 (E08)",
    "source": "https://www.muscleandstrength.com/exercises/banded-machine-t-bar-row",
    "video": "https://www.muscleandstrength.com/exercises/banded-machine-t-bar-row",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "背阔肌 · 强化背部厚度与等长核心稳定",
    "secondary": "菱形肌、中下斜方肌、肩后束、肱二头肌与前臂握力辅助",
    "steps": [
      "双脚跨立在脚踏板上与肩同宽，屈髋屈膝使躯干前倾约 45°，双手握紧手柄。",
      "双脚蹬实地面，核心紧绷，维持背部平直中立，杠铃片自然悬垂离地。",
      "背阔肌和菱形肌发力，双肘贴身向后上方提拉杠杆，直至手柄接近小腹。",
      "在顶端肩胛骨用力夹紧，随后控制阻力缓慢沿原轨迹放回起始位置。"
    ],
    "mistake": "全程脊柱必须保持平直，切勿因负重过大而弓背驼背损伤下背。",
    "cue": "屈髋俯身背部平直，双肘带动手柄提拉至腹部。",
    "sets": "3–4 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "weighted-back-extension",
    "name": "负重背伸展",
    "en": "WEIGHTED BACK EXTENSION",
    "category": "legs",
    "muscles": [
      "glute-max",
      "hamstrings"
    ],
    "equipment": "machine",
    "attachment": "E07 罗马椅＋小重量杠铃片／哑铃",
    "availability": "背伸展凳／罗马椅 (E07)",
    "source": "https://www.muscleandstrength.com/exercises/weighted-hyperextension",
    "video": "https://www.muscleandstrength.com/exercises/weighted-hyperextension",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "本页按 E07「髋主导背伸展」定位：臀大肌、腘绳肌主导髋伸展",
    "secondary": "腹肌、髋内收肌、后束三角肌、斜方肌稳定",
    "steps": [
      "双手抱住一块轻重量杠铃片紧贴胸口，双脚卡紧罗马椅脚垫，大腿贴垫。",
      "脊柱维持平直中立，以髋关节为中心向前下方俯身折叠至大腿后侧有拉伸感。",
      "收紧臀部和大腿后侧，将上半身平稳拉回，直到躯干与双腿成一条直线。",
      "在顶端短暂停留紧绷臀部，保持配重贴身，再缓慢受控俯身下放。"
    ],
    "mistake": "配重必须贴在胸前不可悬空；顶峰切勿过度后仰超伸腰椎。",
    "cue": "双手抱紧配重片于胸前，以髋折叠后收臀拉直。",
    "sets": "3 组 × 10–12 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  }
];
  window.GYM_DATA.push(...extendedExercises);

  // 3D 动画解剖教学映射：有 3D 资源的动作优先挂载 3D 演示路径与标记
  const GYM_3D_SET = new Set([
    'cable-chest-fly', 'cable-incline-chest-fly', 'cable-standing-chest-press',
    'machine-chest-fly', 'machine-chest-press', 'barbell-bench-press',
    'dumbbell-bench-press', 'plate-loaded-incline-chest-press', 'plate-loaded-lying-chest-press',
    'lat-pulldown-with-pronated-grip', 'plate-loaded-lat-pulldown', 'cable-row-seated-narrow-grip',
    'seated-machine-row', 'plate-loaded-seated-row', 'cable-single-arm-row',
    'assisted-pull-up', 'barbell-row', 'dumbbell-one-arm-row',
    't-bar-row-unsupported', 'straight-arm-lat-pulldown',
    'leg-press', 'leg-extension-seated', 'leg-curl-seated', 'prone-leg-curl',
    'barbell-squat', 'goblet-squat', 'barbell-romanian-deadlift', 'dumbbell-rdl',
    'glute-bridge', 'roman-chair-hip-extension', 'weighted-back-extension',
    'reverse-hyper', 'machine-glute-extension', 'hip-abduction-machine', 'cable-hip-extension',
    'barbell-overhead-press', 'machine-shoulder-press', 'dumbbell-lateral-raise',
    'machine-reverse-fly', 'face-pull', 'cable-lateral-raise', 'lateral-raise-machine', 'reverse-cable-fly',
    'cable-curl-with-bar', 'cable-curl-with-rope', 'dumbbell-curl', 'dumbbell-hammer-curl',
    'triceps-pushdown-with-rope', 'overhead-tricep-extension-lower-position',
    'assisted-dip', 'seated-dip-machine',
    'cable-crunch', 'decline-bench-crunch', 'plank', 'dead-bug'
  ]);
  for (const ex of window.GYM_DATA) {
    if (GYM_3D_SET.has(ex.id)) {
      ex.has3D = true;
      ex.video3D = `assets/3d/${ex.id}.mp4`;
      ex.cover3D = `assets/3d/${ex.id}.jpg`;
    }
  }
})();
