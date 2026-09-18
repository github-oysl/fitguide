// 健身房设置：按具体器械划分、配置与个性化备注。
// 默认加载现场拍照图片中识别到的器械配置与工位备注，离线完全可用。
(function () {
  'use strict';
  const STORE_KEY = 'fitguide.gym.v1';
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  // ── 具体的器械实体清单（含下载实物封面、工位编号与规范名称） ─────────
  const EQUIPMENT_DEFINITIONS = [
    // 动作库核心器械（直接支撑动作库现役 28 个动作）
    {
      id: 'cable_crossover',
      code: 'E03',
      name: '双侧可调滑轮／龙门架 (E03)',
      shortName: '双侧可调龙门架',
      en: 'Cable Crossover Station',
      image: 'assets/equipment/cable_crossover.jpg',
      fallback: 'assets/cable-chest-fly.jpg',
      desc: '双侧独立配重与可调高低滑轮，支持夹胸、侧平举、面拉、弯举与下压',
      photoNote: '实拍照片 20、22 确认配备：双侧滑轮多档调高，配双头绳与单手柄。',
      exercises: [
        'cable-chest-fly', 'cable-incline-chest-fly', 'cable-lateral-raise',
        'face-pull', 'reverse-cable-fly', 'cable-curl-with-bar',
        'cable-curl-with-rope', 'triceps-pushdown-with-rope',
        'overhead-tricep-extension-lower-position', 'cable-crunch',
        'pallof-press', 'straight-arm-lat-pulldown', 'cable-hip-extension',
        'cable-pull-through', 'cable-single-arm-row', 'cable-standing-chest-press'
      ]
    },
    {
      id: 'lat_pulldown',
      code: 'E02',
      name: '高位下拉工位 (E02)',
      shortName: '高位下拉工位',
      en: 'Lat Pulldown Station',
      image: 'assets/equipment/lat_pulldown.jpg',
      fallback: 'assets/lat-pulldown-with-pronated-grip.jpg',
      desc: '头顶出线高滑轮、正握长杆与防抬腿固定压垫，专注背阔肌',
      photoNote: '实拍照片 19、20 确认配备：配重塔、红色坐垫与成对黑色大腿固定圆柱垫。',
      exercises: ['lat-pulldown-with-pronated-grip', 'plate-loaded-lat-pulldown']
    },
    {
      id: 'seated_cable_row',
      code: 'E01',
      name: '低位坐姿绳索划船工位 (E01)',
      shortName: '低位坐姿划船',
      en: 'Seated Cable Row Station',
      image: 'assets/equipment/seated_cable_row.jpg',
      fallback: 'assets/cable-row-seated-narrow-grip.jpg',
      desc: '长凳、金属脚撑与低位出线滑轮，标配 V 型握把，强化背部厚度',
      photoNote: '实拍照片 18、21 确认配备：低位钢索出口、长条坐凳与左右金属脚蹬踏板。',
      exercises: ['cable-row-seated-narrow-grip']
    },
    {
      id: 'chest_press_machine',
      code: 'E21',
      name: '坐姿推胸机 (E21)',
      shortName: '坐姿推胸机',
      en: 'Seated Chest Press Machine',
      image: 'assets/equipment/chest_press_machine.jpg',
      fallback: 'assets/machine-chest-press.jpg',
      desc: '固定水平推举运动轨迹，安全可控，适合大重量刺激胸大肌',
      photoNote: '实拍照片 41、46 确认配备：长倾斜靠背、胸肩握把与上置杠杆臂。',
      exercises: ['machine-chest-press', 'plate-loaded-incline-chest-press', 'plate-loaded-lying-chest-press']
    },
    {
      id: 'pec_fly_machine',
      code: 'E19',
      name: '蝴蝶机／长臂夹胸机 (E19)',
      shortName: '蝴蝶机夹胸',
      en: 'Pec Fly / Rear Delt Machine',
      image: 'assets/equipment/pec_fly_machine.jpg',
      fallback: 'assets/machine-chest-fly.jpg',
      desc: '双侧长摆臂弧形运动，顶峰强力挤压胸中缝与胸大肌',
      photoNote: '实拍照片 38 确认配备：顶部双摆臂、垂直长握把、靠背与可调座椅。',
      exercises: ['machine-chest-fly', 'machine-reverse-fly']
    },
    {
      id: 'shoulder_press_machine',
      code: 'E15',
      name: '坐姿推肩机 (E15)',
      shortName: '坐姿推肩机',
      en: 'Seated Shoulder Press Machine',
      image: 'assets/equipment/shoulder_press_machine.jpg',
      fallback: 'assets/machine-shoulder-press.jpg',
      desc: '固定向上推举轨迹与靠背承托，减少腰椎代偿，专注三角肌',
      photoNote: '实拍照片 33、34 确认配备：红色短靠垫、坐垫与上方推举工作臂。',
      exercises: ['machine-shoulder-press']
    },
    {
      id: 'seated_row_machine',
      code: 'E20',
      name: '胸垫式固定划船机 (E20)',
      shortName: '坐姿固定划船',
      en: 'Seated Machine Row',
      image: 'assets/equipment/seated_row_machine.jpg',
      fallback: 'assets/seated-machine-row.jpg',
      desc: '胸前独立支撑垫与分动握把，锁定躯干姿势，专注上背与背阔肌',
      photoNote: '实拍照片 39、40 确认配备：Iso-Lateral 分动式划船机，带前置胸垫与脚撑。',
      exercises: ['seated-machine-row', 'plate-loaded-seated-row']
    },
    {
      id: 'lateral_raise_machine',
      code: 'B06',
      name: '固定器械侧平举机',
      shortName: '固定侧平举机',
      en: 'Lateral Raise Machine',
      image: 'assets/equipment/lateral_raise_machine.jpg',
      fallback: 'assets/lateral-raise-machine.jpg',
      desc: '两侧上臂支撑垫顺手臂外展抬起，精准孤立三角肌中束',
      photoNote: '照片未见专机：实拍中未见此固定机型，现场建议使用龙门架单臂侧平举。',
      exercises: ['lateral-raise-machine']
    },
    {
      id: 'leg_press_machine',
      code: 'E09',
      name: '斜轨挂片腿举机／倒蹬机 (E09)',
      shortName: '斜轨腿举机',
      en: '45° Leg Press Machine',
      image: 'assets/equipment/leg_press_machine.jpg',
      fallback: 'assets/leg-press.jpg',
      desc: '45度斜向滑轨平台与安全止推手柄，支持蹬伸与小腿提踵',
      photoNote: '实拍照片 27 确认配备：斜导轨大脚踏板、倾斜靠背与挂片杠；照片 23 另有卧式蹬腿器。',
      exercises: ['leg-press', 'calf-raise-in-leg-press']
    },
    {
      id: 'leg_extension_machine',
      code: 'E25',
      name: '坐姿腿屈伸机 (E25)',
      shortName: '坐姿腿屈伸',
      en: 'Seated Leg Extension Machine',
      image: 'assets/equipment/leg_extension_machine.jpg',
      fallback: 'assets/leg-extension-seated.jpg',
      desc: '小腿前侧弧度滚垫与座位深度可调，精准收缩股四头肌',
      photoNote: '实拍照片 48、49 确认配备：LEG EXTENSION/LEG CURL 组合工位，支持坐姿伸膝。',
      exercises: ['leg-extension-seated']
    },
    {
      id: 'leg_curl_machine',
      code: 'E25',
      name: '坐姿腿弯举机 (E25)',
      shortName: '坐姿腿弯举',
      en: 'Seated Leg Curl Machine',
      image: 'assets/equipment/leg_curl_machine.jpg',
      fallback: 'assets/leg-curl-seated.jpg',
      desc: '大腿固定限位垫与脚后跟滚垫，专注屈膝收缩腘绳肌',
      photoNote: '实拍照片 48、50 确认配备：双功能滚垫腿弯举，贴合大腿下段勾腿发力。',
      exercises: ['leg-curl-seated']
    },
    {
      id: 'hip_abduction_machine',
      code: 'E23',
      name: '坐姿髋内收／外展机 (E23)',
      shortName: '髋内外展机',
      en: 'Hip Abduction / Adduction Machine',
      image: 'assets/equipment/hip_abduction_machine.jpg',
      fallback: 'assets/hip-abduction-machine.jpg',
      desc: '双向旋转腿垫，向外展练臀中肌，向内夹练大腿内收肌群',
      photoNote: '实拍照片 43、44 确认配备：Inner/Outer Thigh 二合一铭牌清晰，腿垫可旋转换向。',
      exercises: ['hip-abduction-machine', 'hip-adduction-machine', 'machine-glute-extension']
    },
    {
      id: 'treadmill',
      code: 'B04',
      name: '商用跑步机 (含坡度调节)',
      shortName: '商用跑步机',
      en: 'Motorized Treadmill',
      image: 'assets/equipment/treadmill.jpg',
      fallback: 'assets/equipment/treadmill.jpg',
      desc: '商用跑步机与有氧专区，建议配合「自由运动」打卡记录快走、慢跑或爬坡',
      photoNote: '实拍照片 43、49 背景确认配备：成排商用跑步机，支持速度与电动坡度控制。',
      exercises: []
    },
    {
      id: 'bodyweight_free',
      code: 'FREE',
      name: '垫上与自由体能区',
      shortName: '自由与垫上区',
      en: 'Mat & Free Movement Area',
      image: 'assets/equipment/bodyweight_free.jpg',
      fallback: 'assets/plank.jpg',
      desc: '专业防滑减震训练垫与开阔空地，适合自重核心与垫上训练',
      photoNote: '现场区域确认：拉伸与垫上活动区，平整防滑橡胶地面。',
      exercises: ['dead-bug', 'glute-bridge', 'plank']
    },

    // 健身房扩展实拍器械（来自 36 张实拍去重识别清单 E01~E26）
    {
      id: 'hack_squat',
      code: 'E10',
      name: '斜轨哈克深蹲机 (E10)',
      shortName: '哈克深蹲机',
      en: 'Linear Hack Squat',
      image: 'assets/equipment/hack_squat.jpg',
      fallback: 'assets/leg-press.jpg',
      desc: '双肩承托垫、倾斜导轨与下置大踏板，下肢深蹲大重量利器',
      photoNote: '实拍照片 28 确认配备：滑车配肩垫与背垫，脚踏平台在下端。',
      exercises: ['hack-squat'],
      isExtended: true
    },
    {
      id: 'assisted_chin_dip',
      code: 'E11',
      name: '辅助引体／双杠臂屈伸机 (E11)',
      shortName: '辅助引体臂屈伸机',
      en: 'Assisted Chin-up & Dip',
      image: 'assets/equipment/assisted_chin_dip.jpg',
      fallback: 'assets/lat-pulldown-with-pronated-grip.jpg',
      desc: '插销配重反向减负跪垫，帮助零基础掌握引体向上和臂屈伸',
      photoNote: '实拍照片 29 确认配备：Assist Chin/Dip 铭牌清晰，配顶部把手与跪垫。',
      exercises: ['assisted-pull-up', 'assisted-dip', 'seated-dip-machine'],
      isExtended: true
    },
    {
      id: 'decline_bench',
      code: 'E06',
      name: '下斜腹肌训练凳 (E06)',
      shortName: '下斜腹肌凳',
      en: 'Decline Abdominal Bench',
      image: 'assets/equipment/decline_bench.jpg',
      fallback: 'assets/decline-bench-crunch.jpg',
      desc: '腿部固定滚垫与下倾斜长凳面，加深躯干卷起阻力',
      photoNote: '实拍照片 24 确认配备：前景下斜靠垫与腿部圆柱固定垫。',
      exercises: ['decline-bench-crunch'],
      isExtended: true
    },
    {
      id: 'roman_chair',
      code: 'E07',
      name: '背伸展凳／罗马椅 (E07)',
      shortName: '罗马椅',
      en: 'Roman Chair / Back Extension',
      image: 'assets/equipment/roman_chair.jpg',
      fallback: 'assets/seated-machine-row.jpg',
      desc: '分体髋骨承托垫与脚踝固定横杆，强化竖脊肌与后侧动力链',
      photoNote: '实拍照片 25 确认配备：双分体髋垫与下端腿部固定挡板。',
      exercises: ['roman-chair-hip-extension', 'weighted-back-extension', 'reverse-hyper'],
      isExtended: true
    },
    {
      id: 't_bar_row',
      code: 'E08',
      name: '无胸托 T 杠划船器 (E08)',
      shortName: 'T 杠划船器',
      en: 'Unsupported T-Bar Row',
      image: 'assets/equipment/t_bar_row.jpg',
      fallback: 'assets/cable-row-seated-narrow-grip.jpg',
      desc: '地面固定转轴杠杆与多把位手柄，考验下背稳定性与背肌厚度',
      photoNote: '实拍照片 26 确认配备：低位固定轴、长杠杆与前端多把位抓握握把。',
      exercises: ['t-bar-row-unsupported'],
      isExtended: true
    },
    {
      id: 'prone_leg_curl',
      code: 'E24',
      name: '俯卧腿弯举机 (E24)',
      shortName: '俯卧腿弯举',
      en: 'Prone / Lying Leg Curl',
      image: 'assets/equipment/prone_leg_curl.jpg',
      fallback: 'assets/leg-curl-seated.jpg',
      desc: '微屈式趴卧软垫与脚踝滚垫，给腘绳肌带来全行程拉伸与收缩',
      photoNote: '实拍照片 45、47 确认配备：Prone Leg Curl 铭牌，俯卧长垫与后置弧形摆臂。',
      exercises: ['prone-leg-curl'],
      isExtended: true
    },
    {
      id: 'dumbbell_rack',
      code: 'B01',
      name: '哑铃架与可调训练凳 (B01/B02)',
      shortName: '哑铃区与训练凳',
      en: 'Dumbbell Set & Multi-Bench',
      image: 'assets/equipment/dumbbell_rack.jpg',
      fallback: 'assets/machine-chest-press.jpg',
      desc: '阶梯重量哑铃与多角度调节椅，支持卧推、推举、弯举与划船',
      photoNote: '实拍照片 20、21、44 背景确认配备：成排多规格哑铃与多张独立可调训练凳。',
      exercises: [
        'dumbbell-bench-press', 'dumbbell-one-arm-row', 'dumbbell-curl',
        'dumbbell-lateral-raise', 'dumbbell-hammer-curl', 'dumbbell-rdl', 'goblet-squat'
      ],
      isExtended: true
    },
    {
      id: 'barbell_rack',
      code: 'B03',
      name: '杠铃与深蹲架工位 (B03/E17)',
      shortName: '杠铃深蹲架',
      en: 'Barbell & Olympic Squat Rack',
      image: 'assets/equipment/barbell_rack.jpg',
      fallback: 'assets/leg-press.jpg',
      desc: '标准奥杆、胶垫杠铃片与安全护杠架，自由重量复合训练基石',
      photoNote: '实拍照片 36 确认配备：杠铃架、挂片横杆、护杠与卧推凳工位。',
      exercises: [
        'barbell-squat', 'barbell-bench-press', 'barbell-romanian-deadlift',
        'barbell-row', 'barbell-overhead-press'
      ],
      isExtended: true
    }
  ];

  // 建立 动作 ID -> 具体器械 ID 的快速映射
  const EXERCISE_TO_EQUIPMENT_ID = {};
  EQUIPMENT_DEFINITIONS.forEach(eq => {
    (eq.exercises || []).forEach(exId => {
      EXERCISE_TO_EQUIPMENT_ID[exId] = eq.id;
    });
  });

  // ── 默认配置：依据实拍照片内容预设器械与工位备注 ──────────────
  // 照片中已识别的 21 台器械默认全部配备；照片明确未见的器械（如固定侧平举机）默认未配备
  function defaultEquipmentFromPhotos() {
    const eq = {};
    EQUIPMENT_DEFINITIONS.forEach(item => {
      // 现场实拍照片未见固定侧平举专机，默认根据照片设为未配备，其他均默认已配备
      eq[item.id] = (item.id !== 'lateral_raise_machine');
    });
    return eq;
  }

  // 现场实拍工位细节提炼出的默认动作设置备注
  function defaultNotesFromPhotos() {
    return {
      'lat-pulldown-with-pronated-grip': '实拍工位 E02：成对圆柱大腿压垫与高位出线长杆；入座前调压垫贴实大腿，防止身体被拉起。',
      'cable-row-seated-narrow-grip': '实拍工位 E01：低位出线长凳、左右金属脚撑与 V 型握把；双脚踩实踏板，躯干微前倾启动。',
      'cable-chest-fly': '实拍工位 E03：双侧立柱可调滑轮；夹胸时滑轮置于肩部高度，前后弓步站立，微屈双肘。',
      'leg-press': '实拍工位 E09/E04：45°斜轨挂片与水平蹬腿机；先轻推解除手柄安全止推挡，骨盆全程紧贴靠垫。',
      'leg-extension-seated': '实拍工位 E25：坐姿小腿圆柱滚垫；膝关节旋转轴对齐机器轴心，背部贴实靠垫。',
      'leg-curl-seated': '实拍工位 E25：坐姿压腿垫压紧大腿下段，脚踝后方抵住滚垫，慢速勾腿发力。',
      'machine-chest-press': '实拍工位 E21：长靠垫坐姿推胸；握把调至中下胸位置，推起呼气，还原不让配重相撞。',
      'machine-chest-fly': '实拍工位 E19：长臂垂直握把蝴蝶机；调节座椅使握把中段与胸平行，专注胸中缝挤压。',
      'machine-shoulder-press': '实拍工位 E15：带角度靠背推肩机；握把下放至耳侧即推起，避免肩关节过度超伸。',
      'seated-machine-row': '实拍工位 E20：胸前独立承托垫；胸口贴垫微收下巴，双肘向后拉向躯干后侧。',
      'hip-abduction-machine': '实拍工位 E23：大腿外侧抵住旋转软垫；双手握稳两侧手柄，匀速外展至最大舒适范围。',
      'calf-raise-in-leg-press': '实拍工位 E09：前脚掌置于踏板下缘；安全限位挡调高，受控做踝关节跖屈。',
      'face-pull': '实拍工位 E03：滑轮调至面部高度并挂双头绳；大拇指朝后拉至耳侧，后收肩胛。',
      'straight-arm-lat-pulldown': '实拍工位 E03：高滑轮挂短直杆；双肘锁定微屈，手臂向下划弧压向大腿前侧。',
      'hack-squat': '实拍工位 E10：斜轨滑车与双肩托垫；调节肩垫高度，蹬腿解除安全钩，背臀贴实靠垫。',
      'assisted-pull-up': '实拍工位 E11：插销配重反向辅助跪垫；注意配重越大＝辅助越大＝越省力。',
      'assisted-dip': '实拍工位 E11：平行双杠与反向辅助跪托垫；配重越大越省力，下放至上臂与地面平行即推起。',
      'barbell-squat': '实拍工位 B03：标准深蹲架与奥林匹克杠铃杆；调整安全护杠至舒适下蹲深度，卡好锁扣。',
      'barbell-bench-press': '实拍工位 B03/E17：杠铃卧推架与训练凳；双脚踩实地面，肩胛后缩下沉，小臂垂直推起。',
      'dumbbell-bench-press': '实拍工位 B01/B02：成排多规格哑铃与独立可调平凳；大臂与躯干约 45° 平稳推起。',
      'prone-leg-curl': '实拍工位 E24：俯卧腿弯举机；骨盆牢靠贴紧软垫，脚后跟滚垫向上勾腿收缩。',
      'roman-chair-hip-extension': '实拍工位 E07：背伸展凳／罗马椅；髋骨前缘贴垫，以髋关节为轴折叠与伸展。',
      't-bar-row-unsupported': '实拍工位 E08：低位固定转轴与多把位握把；屈髋俯身背部平直，双肘向后拉向小腹。'
    };
  }

  function defaults() {
    return {
      name: '常去健身房（实拍工位识别）',
      equipment: defaultEquipmentFromPhotos(),
      notes: defaultNotesFromPhotos(),
      presetSource: 'photo_audit'
    };
  }

  // 加载并向下兼容旧数据
  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw && typeof raw === 'object') {
        const cfg = defaults();
        if (typeof raw.name === 'string' && raw.name.trim()) cfg.name = raw.name.trim();
        if (raw.equipment && typeof raw.equipment === 'object') {
          // 迁移旧版 5 大类 key（machine, cable, pulldown, row, cardio）
          const oldKeys = ['machine', 'cable', 'pulldown', 'row', 'cardio'];
          const hasOldFormatOnly = Object.keys(raw.equipment).some(k => oldKeys.includes(k)) &&
            !Object.keys(raw.equipment).some(k => EQUIPMENT_DEFINITIONS.some(eq => eq.id === k));

          if (hasOldFormatOnly) {
            EQUIPMENT_DEFINITIONS.forEach(eq => {
              if (['cable_crossover'].includes(eq.id)) cfg.equipment[eq.id] = raw.equipment.cable !== false;
              else if (['lat_pulldown'].includes(eq.id)) cfg.equipment[eq.id] = raw.equipment.pulldown !== false;
              else if (['seated_cable_row'].includes(eq.id)) cfg.equipment[eq.id] = raw.equipment.row !== false;
              else if (['treadmill', 'bodyweight_free'].includes(eq.id)) cfg.equipment[eq.id] = raw.equipment.cardio !== false;
              else cfg.equipment[eq.id] = raw.equipment.machine !== false;
            });
          } else {
            for (const k of Object.keys(cfg.equipment)) {
              if (typeof raw.equipment[k] === 'boolean') cfg.equipment[k] = raw.equipment[k];
            }
          }
        }
        if (raw.notes && typeof raw.notes === 'object') {
          // 保留用户已有备注，同时合并实拍初始备注
          for (const [id, n] of Object.entries(raw.notes)) {
            if (typeof n === 'string' && n.trim()) cfg.notes[id] = n.trim();
          }
        }
        return cfg;
      }
    } catch { /* 损坏则重置到实拍识别预设 */ }
    const def = defaults();
    // 首次进入自动写入实拍识别配置，确保开箱即用
    try { localStorage.setItem(STORE_KEY, JSON.stringify(def)); } catch {}
    return def;
  }

  const config = load();
  let committed = JSON.stringify(config), lastSaveSucceeded = true;

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(config));
      committed = JSON.stringify(config); lastSaveSucceeded = true;
      try { window.dispatchEvent(new CustomEvent('gym-settings-changed', { detail: config })); } catch {}
      return true;
    }
    catch { Object.assign(config, JSON.parse(committed)); lastSaveSucceeded = false; return false; }
  }

  // ── 供全局与动作库调用的公共 API ────────────────────────────
  window.GYM_SETTINGS = {
    getConfig: () => config,
    getName: () => config.name,
    hasEquipment: equipId => config.equipment[equipId] !== false,
    canDo(exerciseItem) {
      if (!exerciseItem) return true;
      const equipId = EXERCISE_TO_EQUIPMENT_ID[exerciseItem.id];
      if (equipId) return config.equipment[equipId] !== false;
      return !exerciseItem.equipment || config.equipment[exerciseItem.equipment] !== false;
    },
    getEquipmentForExercise(exerciseId) {
      const equipId = EXERCISE_TO_EQUIPMENT_ID[exerciseId];
      return EQUIPMENT_DEFINITIONS.find(eq => eq.id === equipId) || null;
    },
    getNote: id => config.notes[id] || '',
    setNote(id, note) {
      const t = (note || '').trim();
      if (t) config.notes[id] = t; else delete config.notes[id];
      return save();
    },
    EQUIPMENT_LIST: EQUIPMENT_DEFINITIONS,
    EXERCISE_MAP: EXERCISE_TO_EQUIPMENT_ID
  };

  // ── 统计信息计算 ──────────────────────────────────────────
  function getStats() {
    const activeItems = (window.GYM_DATA || []);
    const availableExercises = activeItems.filter(item => window.GYM_SETTINGS.canDo(item));
    const totalEquips = EQUIPMENT_DEFINITIONS.length;
    const selectedEquips = EQUIPMENT_DEFINITIONS.filter(eq => config.equipment[eq.id] !== false).length;
    return {
      totalEquips,
      selectedEquips,
      totalExercises: activeItems.length,
      availableExercisesCount: availableExercises.length
    };
  }

  let currentTab = 'all';

  // ── 渲染设置页面 ─────────────────────────────────────────
  function render() {
    const el = document.getElementById('settings-content');
    if (!el) return;

    const stats = getStats();
    const activeItems = (window.GYM_DATA || []);
    const exerciseMapById = {};
    activeItems.forEach(i => { exerciseMapById[i.id] = i; });

    // 过滤展示卡片
    const displayedEquipments = EQUIPMENT_DEFINITIONS.filter(eq => {
      if (currentTab === 'core') return !eq.isExtended;
      if (currentTab === 'extended') return !!eq.isExtended;
      return true;
    });

    el.innerHTML = `
      <section class="settings-block">
        <p class="settings-hint">选择这里有的器械，查找动作时就能只看适合自己的。</p>
        <label class="settings-field">
          健身房名称
          <input id="gym-name" type="text" value="${escape(config.name)}" placeholder="例如：常去健身房（实拍工位已识别）" maxlength="60">
        </label>
      </section>

      <section class="settings-block">
        <div class="equip-section-header">
          <div>
            <h2>这里有哪些器械</h2>
            <p class="settings-hint">已载入初始器械配置，可按实际情况调整。</p>
          </div>
          <div class="equip-stats-pill" aria-live="polite">
            已选 <b>${stats.selectedEquips}</b> / ${stats.totalEquips} 台器械 · 可练 <b>${stats.availableExercisesCount}</b> / ${stats.totalExercises} 个动作
          </div>
        </div>

        <div class="equip-toolbar">
          <div class="equip-tabs" role="group" aria-label="器械分类">
            <button type="button" aria-pressed="${currentTab === 'all'}" class="equip-tab${currentTab === 'all' ? ' is-active' : ''}" data-tab="all">全部器械 (${EQUIPMENT_DEFINITIONS.length})</button>
            <button type="button" aria-pressed="${currentTab === 'core'}" class="equip-tab${currentTab === 'core' ? ' is-active' : ''}" data-tab="core">常用器械 (${EQUIPMENT_DEFINITIONS.filter(eq => !eq.isExtended).length})</button>
            <button type="button" aria-pressed="${currentTab === 'extended'}" class="equip-tab${currentTab === 'extended' ? ' is-active' : ''}" data-tab="extended">其他器械 (${EQUIPMENT_DEFINITIONS.filter(eq => eq.isExtended).length})</button>
          </div>
          <div class="equip-quick-btns">
            <button type="button" id="btn-select-preset" class="btn-micro" title="恢复实拍照片识别的初始器械配置">恢复实拍识别</button>
            <button type="button" id="btn-select-all" class="btn-micro">全部勾选</button>
            <button type="button" id="btn-select-none" class="btn-micro">全不选</button>
          </div>
        </div>

        <div class="equip-grid" role="group" aria-label="具体器械配置">
          ${displayedEquipments.map(eq => {
            const isChecked = config.equipment[eq.id] !== false;
            const matchedExs = (eq.exercises || []).map(id => exerciseMapById[id]).filter(Boolean);
            const countText = matchedExs.length > 0
              ? `${matchedExs.length} 个动作`
              : (eq.isExtended ? '扩展实拍工位' : '暂无动作');

            return `
              <div class="equip-card${isChecked ? ' is-on' : ''}" data-id="${eq.id}">
                <input type="checkbox" id="equip-${eq.id}" aria-label="配备${escape(eq.name)}" data-equip="${eq.id}" ${isChecked ? 'checked' : ''}>
                <div class="equip-thumb-wrap">
                  <img src="${escape(eq.image)}" alt="${escape(eq.name)}" loading="lazy" class="equip-thumb" onerror="if(this.src!=='${escape(eq.fallback)}'){this.src='${escape(eq.fallback)}';}else{this.style.opacity='0.3';}">
                  <span class="equip-badge">${escape(eq.code)}</span>
                </div>
                <div class="equip-card-info">
                  <div class="equip-card-top">
                    <label class="equip-name" for="equip-${eq.id}">${escape(eq.name)}</label>
                    <span class="equip-status-tag">${isChecked ? '已配备' : '未配备'}</span>
                  </div>
                  <details class="equip-info"><summary>器械说明</summary><span class="equip-sub">${escape(eq.en)}</span>
                  <p class="equip-desc">${escape(eq.desc)}</p>
                  <div class="equip-photo-note"><small>实拍核对：${escape(eq.photoNote || '现场可见')}</small></div>
                  <div class="equip-card-footer">
                    <span class="equip-count-badge">${countText}</span>
                    ${matchedExs.length > 0 ? `<small class="equip-ex-preview">${escape(matchedExs.map(x => x.name).join('、'))}</small>` : ''}
                  </div></details>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="settings-block">
        <h2>器械与动作备注</h2>
        <p class="settings-hint">按器械展开，记录座椅档位、把手位置或自己的训练提示。</p>
        <div class="notes-list">
          ${EQUIPMENT_DEFINITIONS.map(eq => {
            const exs = (eq.exercises || []).map(id => exerciseMapById[id]).filter(Boolean);
            if (!exs.length) return '';
            const hasNotes = exs.some(i => config.notes[i.id]);
            return `
              <details class="notes-group">
                <summary>
                  <span class="notes-group-title">
                    <img src="${escape(eq.image)}" class="notes-mini-thumb" alt="" onerror="this.src='${escape(eq.fallback)}'">
                    <b>${escape(eq.name)}</b>
                  </span>
                  <small>${exs.length} 个动作${hasNotes ? ' · 已有备注' : ''}</small>
                </summary>
                <div class="notes-items">
                  ${exs.map(i => `
                    <div class="note-row">
                      <div class="note-row-label">
                        <span>${escape(i.name)}</span>
                        <small>${escape(i.attachment || '')}</small>
                      </div>
                      <textarea data-note-for="${i.id}" rows="1" maxlength="200" placeholder="添加个性化备注（如：座椅 4 档、把手低位、起重 25kg）…">${escape(config.notes[i.id] || '')}</textarea>
                    </div>
                  `).join('')}
                </div>
              </details>`;
          }).join('')}
        </div>
      </section>

      <section class="settings-block">
        <h2>数据管理与备份</h2>
        <p class="settings-hint">数据仅保存在当前浏览器本地。建议定期导出备份，防止清理浏览器缓存或更换设备时记录丢失。</p>
        <div class="settings-actions-row">
          <button type="button" id="backup-export" class="btn-primary">导出备份 (JSON)</button>
          <button type="button" id="backup-import" class="btn-soft">导入备份文件</button>
          <input type="file" id="backup-file-input" accept=".json,application/json" hidden>
          <button type="button" id="gym-reset-photos" class="btn-soft">恢复实拍预设</button>
          <button type="button" id="gym-clear" class="reset">清空配置</button>
        </div>
        <p id="gym-status" class="settings-status" role="status">当前配置已保存至浏览器（本地存储），支持离线使用</p>
      </section>`;

    // ── 绑定交互事件 ──────────────────────────────────────────
    document.getElementById('gym-name')?.addEventListener('input', e => {
      config.name = e.target.value.trim(); save(); flash();
    });

    // Tab 切换
    el.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTab = btn.dataset.tab;
        render();
      });
    });

    // 快捷全选/反选/实拍预设操作
    document.getElementById('btn-select-preset')?.addEventListener('click', () => {
      config.equipment = defaultEquipmentFromPhotos();
      save(); render(); flash('已恢复实拍识别的器械配置');
    });

    document.getElementById('btn-select-all')?.addEventListener('click', () => {
      EQUIPMENT_DEFINITIONS.forEach(eq => { config.equipment[eq.id] = true; });
      save(); render(); flash('已全部勾选');
    });

    document.getElementById('btn-select-none')?.addEventListener('click', () => {
      EQUIPMENT_DEFINITIONS.forEach(eq => { config.equipment[eq.id] = false; });
      save(); render(); flash('已全部取消勾选');
    });

    // 单个器械勾选切换
    el.querySelectorAll('[data-equip]').forEach(cb => cb.addEventListener('change', () => {
      const id = cb.dataset.equip;
      config.equipment[id] = cb.checked;
      const card = cb.closest('.equip-card');
      if (card) {
        card.classList.toggle('is-on', cb.checked);
        const tag = card.querySelector('.equip-status-tag');
        if (tag) tag.textContent = cb.checked ? '已配备' : '未配备';
      }
      if (!save()) { cb.checked = config.equipment[id] !== false; card?.classList.toggle('is-on', cb.checked); const tag = card?.querySelector('.equip-status-tag'); if (tag) tag.textContent = cb.checked ? '已配备' : '未配备'; }
      const stats = getStats();
      const pill = el.querySelector('.equip-stats-pill');
      if (pill) {
        pill.innerHTML = `已选 <b>${stats.selectedEquips}</b> / ${stats.totalEquips} 台器械 · 可练 <b>${stats.availableExercisesCount}</b> / ${stats.totalExercises} 个动作`;
      }
      flash();
    }));

    // 动作备注自增高与防抖保存
    el.querySelectorAll('[data-note-for]').forEach(ta => {
      let timer;
      ta.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const id = ta.dataset.noteFor;
          const n = ta.value.trim();
          if (n) config.notes[id] = n; else delete config.notes[id];
          save(); flash();
        }, 300);
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
      });
    });

    document.getElementById('gym-reset-photos')?.addEventListener('click', () => {
      if (!confirm('确定恢复实拍识别的默认器械配置与工位备注？')) return;
      Object.assign(config, defaults());
      save(); render(); flash('已完整恢复实拍识别初始预设');
    });

    document.getElementById('gym-clear')?.addEventListener('click', () => {
      if (!confirm('确定清空全部健身房数据？包括名称、器械选项和所有动作备注。')) return;
      config.name = '';
      EQUIPMENT_DEFINITIONS.forEach(eq => { config.equipment[eq.id] = false; });
      config.notes = {};
      save(); render(); flash('已清空全部数据');
    });

    document.getElementById('backup-export')?.addEventListener('click', () => {
      try {
        const backup = {
          version: 1,
          exportedAt: new Date().toISOString(),
          plans: JSON.parse(localStorage.getItem('fitguide.checkin.v2') || 'null'),
          activities: JSON.parse(localStorage.getItem('fitguide.activities.v1') || 'null'),
          gym: JSON.parse(localStorage.getItem('fitguide.gym.v1') || 'null'),
          gymNotes: JSON.parse(localStorage.getItem('fitguide.gym.notes.v1') || 'null')
        };
        const blob = new Blob([JSON.stringify(backup, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fitguide-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        flash('已成功导出备份文件');
      } catch (err) {
        flash('导出失败：' + err.message);
      }
    });

    const fileInput = document.getElementById('backup-file-input');
    document.getElementById('backup-import')?.addEventListener('click', () => {
      fileInput?.click();
    });
    fileInput?.addEventListener('change', event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          if (!data || typeof data !== 'object') throw new Error('无效的备份文件');
          if (data.plans) localStorage.setItem('fitguide.checkin.v2', JSON.stringify(data.plans));
          if (data.activities) localStorage.setItem('fitguide.activities.v1', JSON.stringify(data.activities));
          if (data.gym) localStorage.setItem('fitguide.gym.v1', JSON.stringify(data.gym));
          if (data.gymNotes) localStorage.setItem('fitguide.gym.notes.v1', JSON.stringify(data.gymNotes));
          config = load();
          window.dispatchEvent(new StorageEvent('storage', {key: null}));
          render();
          flash('备份导入成功，已恢复训练记录与器械配置！');
        } catch (err) {
          flash('导入失败：' + err.message);
        } finally {
          fileInput.value = '';
        }
      };
      reader.readAsText(file);
    });
  }

  function flash(msg) {
    const el = document.getElementById('gym-status');
    if (!el) return;
    if (!lastSaveSucceeded) { el.textContent = '保存失败，配置未更改，请允许浏览器本地存储后重试。'; return; }
    el.textContent = msg || '已保存';
    if (!msg) setTimeout(() => { if (el && lastSaveSucceeded) el.textContent = '当前配置已保存至浏览器（本地存储），支持离线使用'; }, 2000);
  }

  // 初始渲染
  render();

  // 跨标签页同步更新
  window.addEventListener('storage', e => {
    if (e.key !== STORE_KEY && e.key !== null) return;
    Object.assign(config, load()); committed = JSON.stringify(config);
    render();
    window.dispatchEvent(new CustomEvent('gym-settings-changed'));
  });
})();
