// 动作资料、主要肌肉与器械条件独立维护，供页面和离线版共用。
// 基础 24 个力量与器械动作（已对齐 Muscle & Strength 720p 演示与教程）
window.GYM_DATA = [
  {
    "id": "cable-chest-fly",
    "name": "站姿绳索夹胸",
    "en": "STANDING CABLE FLY",
    "category": "chest",
    "muscles": [
      "chest"
    ],
    "equipment": "cable",
    "attachment": "双侧高位滑轮＋单手把手",
    "availability": "双侧可调滑轮 (E03)",
    "source": "https://www.muscleandstrength.com/exercises/cable-crossovers-(mid-chest).html",
    "video": "https://www.muscleandstrength.com/exercises/cable-crossovers-(mid-chest).html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌 · 双臂向胸前合拢",
    "secondary": "三角肌前束、喙肱肌与肩部稳定肌群辅助",
    "steps": [
      "双侧装单手把手，滑轮设在肩部附近或略高，按器械结构调整；选轻重量试做。",
      "握紧把手向前跨一步，前后站姿，躯干略前倾，双肘保持轻微弯曲。",
      "像抱住一棵树一样，将双臂向胸前合拢；肩膀下沉，不用身体前冲。",
      "沿原轨迹缓慢打开，回到肩部舒适的位置；不要让手臂过度拉向身后。"
    ],
    "mistake": "避免变成屈伸肘的推胸，也不要用躯干摆动拉起配重。",
    "cue": "胸前像抱树一样合拢。",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "leg-press",
    "name": "腿举机",
    "en": "LEG PRESS",
    "category": "legs",
    "muscles": [
      "quads",
      "glute-max"
    ],
    "equipment": "machine",
    "attachment": "腿举机＋安全限位",
    "availability": "斜轨挂片腿举机 (E09)",
    "source": "https://www.muscleandstrength.com/exercises/45-degree-leg-press.html",
    "video": "https://www.muscleandstrength.com/exercises/45-degree-leg-press.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "股四头肌、臀大肌 · 蹬腿伸髋",
    "secondary": "内收肌、小腿辅助",
    "steps": [
      "调好靠背，臀部和背部贴住靠垫；双脚放在踏板上，约与肩同宽。",
      "先熟悉安全锁的释放与归位方法。轻推踏板，再按该机型说明解除限位。",
      "屈膝缓慢下放，膝盖朝向脚尖；在骨盆将要卷起或腰背离垫前停止。",
      "用整个脚掌蹬回，保持膝关节受控、不猛顶到过伸；结束时先锁好安全挡。"
    ],
    "mistake": "不要为了蹲得更深而抬起臀部，也不要用手推膝盖帮助完成动作。",
    "cue": "脚掌蹬踏板，臀部始终贴垫。",
    "sets": "2–3 组 × 10–15 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "leg-extension-seated",
    "name": "坐姿腿屈伸",
    "en": "LEG EXTENSION",
    "category": "legs",
    "muscles": [
      "quads"
    ],
    "equipment": "machine",
    "attachment": "腿屈伸机＋小腿滚垫",
    "availability": "坐姿腿屈伸机 (E25)",
    "source": "https://www.muscleandstrength.com/exercises/leg-extension.html",
    "video": "https://www.muscleandstrength.com/exercises/leg-extension.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "股四头肌 · 大腿前侧",
    "secondary": "躯干稳定肌群辅助，无明显次要动力肌",
    "steps": [
      "调整靠背，让膝关节与机器转轴对齐；大腿贴在坐垫上。",
      "小腿滚垫放在脚踝上方，握住两侧把手，使臀部保持稳定。",
      "收缩大腿前侧，缓慢抬起小腿至舒适的伸膝位置，不突然甩腿。",
      "控制小腿下降到起始位置，保持臀部贴垫，配重片不撞击。"
    ],
    "mistake": "滚垫不要直接压在脚背上；若膝盖不舒服，停止并检查转轴与座椅设置。",
    "cue": "大腿不动，小腿向前伸。",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "leg-curl-seated",
    "name": "坐姿腿弯举",
    "en": "SEATED LEG CURL",
    "category": "legs",
    "muscles": [
      "hamstrings"
    ],
    "equipment": "machine",
    "attachment": "坐姿腿弯举机＋压腿垫",
    "availability": "坐姿腿弯举机 (E25)",
    "source": "https://www.muscleandstrength.com/exercises/seated-leg-curl",
    "video": "https://www.muscleandstrength.com/exercises/seated-leg-curl",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "腘绳肌 · 大腿后侧",
    "secondary": "腓肠肌等屈膝肌群辅助",
    "steps": [
      "调整靠背，使膝盖与机器转轴对齐；背部靠稳，脚踝后方放在滚垫上。",
      "将大腿固定垫压在膝盖上方的大腿处，确保大腿不会被抬起。",
      "向下、向后弯曲膝盖，将滚垫拉向座椅下方，保持髋部稳定。",
      "缓慢伸回小腿至舒适位置，不突然放松或让重量拉扯膝盖。"
    ],
    "mistake": "这是坐姿版本；俯卧腿弯举的身体位置与垫子设置不同，不要混用。",
    "cue": "把脚跟向座椅下方卷。",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "machine-chest-press",
    "name": "坐姿推胸机",
    "en": "MACHINE CHEST PRESS",
    "category": "chest",
    "muscles": [
      "chest"
    ],
    "equipment": "machine",
    "attachment": "坐姿推胸机",
    "availability": "坐姿推胸机 (E21)",
    "source": "https://www.muscleandstrength.com/exercises/hammer-strength-bench-press.html",
    "video": "https://www.muscleandstrength.com/exercises/hammer-strength-bench-press.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌",
    "secondary": "肱三头肌、三角肌前束辅助",
    "steps": [
      "调整座椅，使把手位于胸部附近、低于肩部；双脚踏实地面。",
      "臀部和上背靠稳，握住把手，手腕与前臂大致成直线。",
      "呼气向前推，保持肩膀下沉，上背不离开靠垫；肘部自然伸展。",
      "吸气缓慢回到起点，在肩部舒适范围内完成动作，不让重量拉肩向后。"
    ],
    "mistake": "避免耸肩、手腕向后折或用腰部过度反弓完成推举。",
    "cue": "把手向前走，肩膀不耸起。",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "machine-chest-fly",
    "name": "蝴蝶机夹胸",
    "en": "PEC DECK / MACHINE CHEST FLY",
    "category": "chest",
    "muscles": [
      "chest"
    ],
    "equipment": "machine",
    "attachment": "蝴蝶机／夹胸机",
    "availability": "蝴蝶机夹胸 (E19)",
    "source": "https://www.muscleandstrength.com/exercises/pec-dec.html",
    "video": "https://www.muscleandstrength.com/exercises/pec-dec.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "primary": "胸大肌 · 双臂水平合拢",
    "secondary": "三角肌前束、喙肱肌与肩部稳定肌群辅助",
    "steps": [
      "调整座椅，使把手或肘垫在胸部附近；设置舒适的起始角度。",
      "背部靠稳，握把手或将前臂贴肘垫；保持肩膀下沉，肘部轻微弯曲。",
      "呼气将双臂向胸前合拢，不用头部前探或背部离垫来借力。",
      "缓慢向两侧打开，在肩部舒适的范围内停止，再做下一次。"
    ],
    "mistake": "不要把起始角度设得过大。夹胸不能单独练出“胸肌中缝”，外观也受个体结构影响。",
    "cue": "合拢双臂，保持肘部角度。",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "lat-pulldown-with-pronated-grip",
    "name": "正握高位下拉",
    "en": "LAT PULLDOWN WITH PRONATED GRIP",
    "category": "back",
    "muscles": [
      "lats"
    ],
    "equipment": "pulldown",
    "attachment": "高位下拉工位＋长杆＋大腿压垫",
    "availability": "高位下拉工位 (E02)",
    "primary": "背阔肌 · 腋下到背部外侧",
    "secondary": "肱二头肌、肱肌与中下斜方肌辅助",
    "cue": "想象肘部向肋骨两侧下沉。",
    "steps": [
      "坐稳并将大腿压垫调到贴合大腿，双脚着地；正握长杆，略宽于肩。",
      "躯干小幅后倾并保持不变，胸口自然抬起，避免塌腰。",
      "把肘部向下拉，长杆向上胸靠近；肩部舒适即可，不强行碰胸。",
      "缓慢伸回手臂，肩胛随手臂自然上移，不突然被配重拉起。"
    ],
    "mistake": "不要拉到颈后，也不要大幅后仰把下拉做成划船；握得更宽不等于背练得更宽。",
    "source": "https://www.muscleandstrength.com/exercises/overhand-close-grip-lat-pull-down.html",
    "sets": "2–3 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/overhand-close-grip-lat-pull-down.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-row-seated-narrow-grip",
    "name": "窄握坐姿划船",
    "en": "CABLE ROW SEATED NARROW GRIP",
    "category": "back",
    "muscles": [
      "lats",
      "mid-back"
    ],
    "equipment": "row",
    "attachment": "低位划船工位＋V 把手＋踏板",
    "availability": "低位划船工位 (E01)",
    "primary": "背阔肌、菱形肌与中斜方肌 · 中背",
    "secondary": "肱二头肌、肩后束辅助",
    "cue": "肘部沿身体向后，拉向肚脐附近。",
    "steps": [
      "坐上长凳，双脚踩踏板，膝盖微屈；扣好 V 把手，轻重量试拉。",
      "保持背部自然伸直，允许肩胛向前滑动，避免腰背弓成一团。",
      "将把手拉向下腹，双肘靠近身体并向后走，肩膀不耸起。",
      "缓慢送回把手，先伸肘再让肩胛自然前移，不借腿蹬或甩腰。"
    ],
    "mistake": "后仰幅度过大、用腰甩动和耸肩会改变受力；不要把配重甩起来。",
    "source": "https://www.muscleandstrength.com/exercises/one-arm-cable-row.html",
    "sets": "2–3 组 × 8–12 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/one-arm-cable-row.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "straight-arm-lat-pulldown",
    "name": "直臂下压",
    "en": "STRAIGHT ARM LAT PULLDOWN",
    "category": "back",
    "muscles": [
      "lats"
    ],
    "equipment": "cable",
    "attachment": "高位滑轮＋直杆",
    "availability": "高位滑轮＋直杆 (E03)",
    "primary": "背阔肌 · 肩关节伸展",
    "secondary": "肱三头肌长头、核心辅助稳定",
    "cue": "腋下向内收，手臂画弧到大腿。",
    "steps": [
      "将直杆扣在高位滑轮，面对配重站立并后退少许。",
      "髋部微屈、躯干前倾，肘部轻微弯曲并保持角度。",
      "用上臂向下向后带动直杆，拉到大腿前方，不把动作做成屈伸肘。",
      "缓慢抬回手臂，腹部保持收紧，不用挺腰换取幅度。"
    ],
    "mistake": "直臂指肘角基本稳定，不是用力锁死肘；若手臂来回弯曲，先减重。",
    "source": "https://www.muscleandstrength.com/exercises/straight-arm-lat-pull-down.html",
    "sets": "2–3 组 × 10–15 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/straight-arm-lat-pull-down.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "seated-machine-row",
    "name": "坐姿固定划船",
    "en": "SEATED MACHINE ROW",
    "category": "back",
    "muscles": [
      "mid-back",
      "lats"
    ],
    "equipment": "machine",
    "attachment": "带胸垫的固定划船机",
    "availability": "胸垫式固定划船机 (E20)",
    "primary": "菱形肌、中斜方肌与背阔肌",
    "secondary": "肩后束、肱二头肌辅助",
    "cue": "胸垫撑住身体，肩胛向后滑。",
    "steps": [
      "调座椅及胸垫，使把手在上腹至下胸附近，脚掌踩稳。",
      "胸口贴垫但保持正常呼吸；握住把手，肩膀放松下沉。",
      "肘部向后拉到舒适位置，不为了多拉一点而离开胸垫。",
      "缓慢伸回双臂，让肩胛自然向前移动，维持躯干稳定。"
    ],
    "mistake": "器械把手宽度和肘部路线会影响侧重；不要用脖子前伸来代偿。",
    "source": "https://www.muscleandstrength.com/exercises/banded-machine-t-bar-row",
    "sets": "2–3 组 × 10–15 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/banded-machine-t-bar-row",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-incline-chest-fly",
    "name": "上斜绳索夹胸",
    "en": "CABLE INCLINE CHEST FLY",
    "category": "chest",
    "muscles": [
      "upper-chest"
    ],
    "equipment": "cable",
    "attachment": "双侧低位滑轮＋约 30–45° 上斜凳＋单手把手",
    "availability": "低位滑轮＋上斜凳 (E03)",
    "primary": "胸大肌锁骨部 · 上胸侧重",
    "secondary": "三角肌前束与肩部稳定肌群辅助",
    "cue": "沿弧线把双手合到胸口上方。",
    "steps": [
      "将稳定的上斜凳放在两侧低位滑轮之间，凳面约 30–45°。",
      "握住把手躺稳，脚掌落地，上背贴凳，双肘保留轻微弯曲。",
      "双臂沿宽弧线向胸口上方合拢，保持肘角，不用推举方式完成。",
      "慢慢向两边打开，肩部有舒适牵拉即止，不让双臂落得过低。"
    ],
    "mistake": "照片里可见长凳，但不能确认可调上斜；必须使用稳固且可调的上斜凳。上胸侧重不等于完全隔离。",
    "source": "https://www.muscleandstrength.com/exercises/cable-crossovers-(mid-chest).html",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/cable-crossovers-(mid-chest).html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "machine-shoulder-press",
    "name": "坐姿推肩机",
    "en": "MACHINE SHOULDER PRESS",
    "category": "shoulders",
    "muscles": [
      "front-delt",
      "side-delt"
    ],
    "equipment": "machine",
    "attachment": "推肩机＋靠背",
    "availability": "坐姿推肩机 (E15)",
    "primary": "三角肌前束、中束 · 肩部",
    "secondary": "肱三头肌辅助",
    "cue": "把手向上推，肋骨不要向前翻。",
    "steps": [
      "调座椅，使把手在耳朵到肩部附近；脚踏稳，臀部靠垫。",
      "选择手腕舒服的握法，前臂大致顺着器械受力方向。",
      "向上推到舒适伸展位置，不猛顶关节，保持腹部收紧。",
      "控制下降回到起点，背部不离垫，不强迫肩部下放过深。"
    ],
    "mistake": "如果需要大幅拱腰才能推起，重量或座椅设置不合适。",
    "source": "https://www.muscleandstrength.com/exercises/machine-shoulder-press",
    "sets": "2–3 组 × 8–12 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/machine-shoulder-press",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-lateral-raise",
    "name": "单臂绳索侧平举",
    "en": "CABLE LATERAL RAISE",
    "category": "shoulders",
    "muscles": [
      "side-delt"
    ],
    "equipment": "cable",
    "attachment": "低位滑轮＋单手把手",
    "availability": "低位滑轮＋单把手 (E03)",
    "primary": "三角肌中束 · 肩外侧",
    "secondary": "斜方肌、肩袖辅助稳定",
    "cue": "肘部带着上臂向外展开。",
    "steps": [
      "侧身站在滑轮旁，用远离机器的一侧手握住低位把手。",
      "躯干站稳，肘部微屈，另一只手可轻扶固定立柱。",
      "把手向侧面抬起，上臂接近肩高或舒适高度即止，避免耸肩。",
      "缓慢放回身体前侧，完成一侧后再换边。"
    ],
    "mistake": "用很轻的重量开始，不侧甩身体，也不强迫手腕内旋成“倒水”姿势。",
    "source": "https://www.muscleandstrength.com/exercises/one-arm-cable-lateral-raise.html",
    "sets": "2–3 组 × 12–15 次／侧",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/one-arm-cable-lateral-raise.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "lateral-raise-machine",
    "name": "固定器械侧平举",
    "en": "LATERAL RAISE MACHINE",
    "category": "shoulders",
    "muscles": [
      "side-delt"
    ],
    "equipment": "machine",
    "attachment": "侧平举机＋上臂支撑垫",
    "availability": "固定侧平举机 (现场未见专机)",
    "primary": "三角肌中束 · 肩外侧",
    "secondary": "肩袖、斜方肌辅助",
    "cue": "用上臂顶开支撑垫。",
    "steps": [
      "调整座椅，使器械支撑垫贴在肘部附近的上臂外侧。",
      "握把手、坐稳，肩膀下沉，保持头颈自然。",
      "向两边抬起上臂，接近肩高或舒适位置即止。",
      "慢慢收回，配重仍受控，不弹震垫子。"
    ],
    "mistake": "不要抬肩代替抬上臂；如果垫子压迫关节，重新调座位。",
    "source": "https://www.muscleandstrength.com/exercises/machine-lateral-raise.html",
    "sets": "2–3 组 × 12–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/machine-lateral-raise.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "face-pull",
    "name": "绳索面拉",
    "en": "FACE PULL",
    "category": "shoulders",
    "muscles": [
      "rear-delt",
      "mid-back"
    ],
    "equipment": "cable",
    "attachment": "高位滑轮＋双头绳索",
    "availability": "高位滑轮＋双头绳 (E03)",
    "primary": "三角肌后束、菱形肌、中斜方肌",
    "secondary": "肩部外旋肌群辅助",
    "cue": "绳端向脸两侧分开，不撞向鼻子。",
    "steps": [
      "把双头绳扣在面部附近或略高的滑轮上，后退至绳索拉紧。",
      "站稳并收腹，双手握绳，肩膀不要耸起。",
      "把绳子拉向额头附近，肘部向两边打开，绳端分向脸两侧。",
      "短暂停顿后缓慢伸回双臂，躯干不后倒。"
    ],
    "mistake": "用轻重量控制动作；不要追求过度外旋，或把面拉做成腰部后仰拉重物。",
    "source": "https://www.muscleandstrength.com/exercises/banded-face-pull",
    "sets": "2–3 组 × 12–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/banded-face-pull",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "reverse-cable-fly",
    "name": "绳索反向飞鸟",
    "en": "REVERSE CABLE FLY",
    "category": "shoulders",
    "muscles": [
      "rear-delt"
    ],
    "equipment": "cable",
    "attachment": "双侧高位滑轮＋两个把手",
    "availability": "双侧滑轮＋双手柄 (E03)",
    "primary": "三角肌后束 · 肩后侧",
    "secondary": "菱形肌、中斜方肌辅助",
    "cue": "展开双臂，像把身体前的绳子拉开。",
    "steps": [
      "双侧滑轮调在肩部附近或略高，左手握右侧把手、右手握左侧把手。",
      "站在中间，胸部自然抬起，肘部轻微弯曲。",
      "双臂向两边略向后打开，手臂接近躯干平面时停止。",
      "保持肘角，慢慢将手送回身体前方，不让肩膀向前塌。"
    ],
    "mistake": "不要靠大幅夹背或屈肘把它变成划船；确认绳索不会摩擦身体。",
    "source": "https://www.muscleandstrength.com/exercises/one-arm-cable-reverse-fly.html",
    "sets": "2–3 组 × 12–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/one-arm-cable-reverse-fly.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-curl-with-bar",
    "name": "直杆绳索弯举",
    "en": "CABLE CURL WITH BAR",
    "category": "arms",
    "muscles": [
      "biceps"
    ],
    "equipment": "cable",
    "attachment": "低位滑轮＋短直杆／曲杆",
    "availability": "低位滑轮＋短直杆 (E03)",
    "primary": "肱二头肌 · 上臂前侧",
    "secondary": "肱肌、肱桡肌辅助",
    "cue": "上臂留在身侧，只弯曲肘部。",
    "steps": [
      "短杆扣在低位滑轮，面对机器，掌心朝上握杆。",
      "双脚站稳，肘部放在身侧，手腕保持自然直线。",
      "弯肘将杆向上卷，避免肩部前抬或身体后仰。",
      "缓慢放下，手臂接近伸直即回到起点，不甩配重。"
    ],
    "mistake": "如果直杆让手腕不舒服，换曲杆或单手把手；不要折腕代替弯肘。",
    "source": "https://www.muscleandstrength.com/exercises/cable-tricep-extension-with-v-bar.html",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/cable-tricep-extension-with-v-bar.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-curl-with-rope",
    "name": "绳索锤式弯举",
    "en": "CABLE CURL WITH ROPE",
    "category": "arms",
    "muscles": [
      "biceps",
      "brachialis"
    ],
    "equipment": "cable",
    "attachment": "低位滑轮＋双头绳索",
    "availability": "低位滑轮＋双头绳 (E03)",
    "primary": "肱肌、肱桡肌与肱二头肌",
    "secondary": "前臂握力肌群辅助",
    "cue": "拇指朝上，把绳端卷向肩前。",
    "steps": [
      "把双头绳索扣在低位，双手相对握住绳端。",
      "站稳，肘部保持在身侧，不用肩带动绳子。",
      "保持中立握法弯肘上举，手腕不要向内或向后折。",
      "控制放下至手臂接近伸直，配重始终平稳。"
    ],
    "mistake": "锤式与掌心朝上的弯举侧重不同，但不会把肱二头肌完全排除。",
    "source": "https://www.muscleandstrength.com/exercises/rope-cable-curl.html",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/rope-cable-curl.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "triceps-pushdown-with-rope",
    "name": "绳索下压",
    "en": "TRICEPS PUSHDOWN WITH ROPE",
    "category": "arms",
    "muscles": [
      "triceps"
    ],
    "equipment": "cable",
    "attachment": "高位滑轮＋双头绳索",
    "availability": "高位滑轮＋双头绳 (E03)",
    "primary": "肱三头肌 · 上臂后侧",
    "secondary": "肩部与核心稳定肌群辅助",
    "cue": "肘部钉在身侧，小臂向下展开。",
    "steps": [
      "绳索扣在高位，面对机器后退半步，双脚站稳。",
      "将上臂收在身体两侧，肘部弯曲，肩膀保持下沉。",
      "伸直肘部向下压，末端自然分开绳端，不猛顶关节。",
      "控制绳子回升，只让小臂转动，上臂位置基本不变。"
    ],
    "mistake": "不要把肩膀向前推、整个身体压在绳子上，也不要做成直臂背部下压。",
    "source": "https://www.strengthlog.com/triceps-pushdown-with-rope/",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.strengthlog.com/triceps-pushdown-with-rope/",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "overhead-tricep-extension-lower-position",
    "name": "低位绳索过顶臂屈伸",
    "en": "OVERHEAD TRICEP EXTENSION LOWER POSITION",
    "category": "arms",
    "muscles": [
      "triceps-long"
    ],
    "equipment": "cable",
    "attachment": "低位滑轮＋双头绳索",
    "availability": "低位滑轮＋双头绳 (E03)",
    "primary": "肱三头肌 · 长头在拉长位置参与",
    "secondary": "肩部与核心稳定肌群辅助",
    "cue": "上臂在耳侧，小臂从脑后伸出去。",
    "steps": [
      "将绳索扣在低位，轻重量握好后转身背向滑轮。",
      "前后站姿略前倾，上臂位于耳朵两侧，绳索在脑后。",
      "伸肘将绳端向上前方推出，保持肋骨收住，不拱腰。",
      "慢慢弯肘回到脑后，肩部舒适即可，不强行追求深度。"
    ],
    "mistake": "先用轻重量练习进入和退出姿势；肩部无法舒适举过头时，改用下压。",
    "source": "https://www.muscleandstrength.com/exercises/standing-low-pulley-overhead-tricep-extension-(rope-extension).html",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/standing-low-pulley-overhead-tricep-extension-(rope-extension).html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "cable-crunch",
    "name": "跪姿绳索卷腹",
    "en": "CABLE CRUNCH",
    "category": "core",
    "muscles": [
      "abs"
    ],
    "equipment": "cable",
    "attachment": "高位滑轮＋双头绳索＋跪垫",
    "availability": "高位滑轮＋双头绳 (E03)",
    "primary": "腹直肌 · 躯干屈曲",
    "secondary": "腹斜肌与深层核心辅助",
    "cue": "让胸骨靠近骨盆，不只是屁股坐下去。",
    "steps": [
      "绳索扣在高位，面向机器跪下，绳端放在头部两侧。",
      "保持髋部大致位置不变，手臂只负责握住绳子。",
      "收缩腹部让躯干弯曲，肋骨向骨盆靠近，缓慢呼气。",
      "控制展开躯干，不拉扯脖子，也不突然被配重拉起。"
    ],
    "mistake": "如果只是屈髋鞠躬或臀部前后摆动，先减重并缩小幅度。",
    "source": "https://www.muscleandstrength.com/exercises/cable-crunch.html",
    "sets": "2–3 组 × 10–15 次",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/cable-crunch.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "pallof-press",
    "name": "Pallof 抗旋转推",
    "en": "PALLOF PRESS",
    "category": "core",
    "muscles": [
      "obliques"
    ],
    "equipment": "cable",
    "attachment": "胸高滑轮＋单手把手（双手握）",
    "availability": "中位滑轮＋单把手 (E03)",
    "primary": "腹斜肌、深层核心 · 抵抗旋转",
    "secondary": "臀部与肩部帮助稳定",
    "cue": "双手向前，胸口始终朝正前方。",
    "steps": [
      "侧身面对滑轮，把手调到胸高，双手握把放在胸前。",
      "向侧面移开一点产生张力，双脚约髋宽、膝盖微屈。",
      "将双手向前推出，躯干不跟着绳索转动，保持正常呼吸。",
      "停留约 1–2 秒后收回胸前，完成后转向另一侧练习。"
    ],
    "mistake": "重量以能保持身体朝向为准；这是抗旋转动作，不是扭腰甩把手。",
    "source": "https://www.muscleandstrength.com/exercises/pallof-press",
    "sets": "2–3 组 × 8–12 次／侧",
    "rest": "60–90 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/pallof-press",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "hip-abduction-machine",
    "name": "坐姿髋外展",
    "en": "HIP ABDUCTION MACHINE",
    "category": "legs",
    "muscles": [
      "glute-med"
    ],
    "equipment": "machine",
    "attachment": "髋外展机＋大腿外侧垫",
    "availability": "坐姿髋内外展机 (E23)",
    "primary": "臀中肌、臀小肌 · 臀部外侧",
    "secondary": "臀大肌上部、阔筋膜张肌辅助",
    "cue": "让大腿向两边打开，骨盆保持稳。",
    "steps": [
      "坐稳，将双腿放在外展机支撑垫内侧，脚踩稳脚踏。",
      "设置舒适的起始角度，背部靠垫，握住两侧把手。",
      "将双腿向两边打开，骨盆不左右摆，幅度以髋部舒适为限。",
      "缓慢收回双腿，不让配重直接落下撞击。"
    ],
    "mistake": "外展是向外打开，内收是向内合拢；不要把两种机器和目标肌肉混淆。",
    "source": "https://www.muscleandstrength.com/exercises/hip-abduction-machine.html",
    "sets": "2–3 组 × 12–15 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/hip-abduction-machine.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  },
  {
    "id": "calf-raise-in-leg-press",
    "name": "腿举机提踵",
    "en": "CALF RAISE IN LEG PRESS",
    "category": "legs",
    "muscles": [
      "calves"
    ],
    "equipment": "machine",
    "attachment": "允许提踵的腿举机＋安全限位",
    "availability": "斜轨腿举机提踵 (E09)",
    "primary": "腓肠肌、比目鱼肌 · 小腿后侧",
    "secondary": "足部稳定肌群辅助",
    "cue": "膝盖位置不变，通过脚踝提起脚跟。",
    "steps": [
      "先请现场教练确认踏板和限位适合提踵；不适用时换专用提踵机。",
      "前脚掌稳固放在踏板下缘，脚跟可自由移动；双腿伸展但膝盖不过伸。",
      "通过脚踝向前推踏板、抬起脚跟，感受小腿收缩。",
      "缓慢让脚跟回落至舒适牵拉位置，全程避免脚掌打滑。"
    ],
    "mistake": "不要用屈伸膝盖代替脚踝运动。脚掌必须有足够接触面积，不能只用脚趾勾边。",
    "source": "https://www.muscleandstrength.com/exercises/45-degress-calf-press.html",
    "sets": "2–3 组 × 12–15 次",
    "rest": "90–120 秒",
    "localDemo": true,
    "video": "https://www.muscleandstrength.com/exercises/45-degress-calf-press.html",
    "videoNote": "Muscle & Strength 动作讲解页，需要联网。",
    "mediaCredit": "Muscle & Strength",
    "demoNote": "Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。"
  }
];
