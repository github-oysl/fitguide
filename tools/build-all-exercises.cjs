const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const matchedPath = path.join(ROOT, 'docs', 'muscleandstrength', 'gym_matched.json');
const matched = JSON.parse(fs.readFileSync(matchedPath, 'utf8'));

// Existing 24 exercises in data.js & extra-data.js
const existing24Ids = new Set([
  'cable-chest-fly', 'leg-press', 'leg-extension-seated', 'leg-curl-seated',
  'machine-chest-press', 'machine-chest-fly', 'lat-pulldown-with-pronated-grip',
  'cable-row-seated-narrow-grip', 'straight-arm-lat-pulldown', 'seated-machine-row',
  'cable-incline-chest-fly', 'machine-shoulder-press', 'cable-lateral-raise',
  'lateral-raise-machine', 'face-pull', 'reverse-cable-fly', 'cable-curl-with-bar',
  'cable-curl-with-rope', 'triceps-pushdown-with-rope',
  'overhead-tricep-extension-lower-position', 'cable-crunch', 'pallof-press',
  'hip-abduction-machine', 'calf-raise-in-leg-press'
]);

function cleanText(t) {
  if (!t) return '';
  return t.replace(/（[^）]*建议稿[^）]*）/g, '')
          .replace(/（无现有文案.*?）/g, '')
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .trim();
}

function parsePromptFile(promptFileName) {
  const filePath = path.join(ROOT, 'docs', 'equipment-review', 'action-prompts', promptFileName);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');

  const res = {
    primary: '',
    secondary: '',
    setup: '',
    stepsStr: '',
    mistake: '',
    sets: '',
    cue: '',
    captions: []
  };

  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('|') && !line.includes('---|---') && !line.includes('核对项')) {
      const cols = line.split('|').map(s => s.trim()).filter(Boolean);
      if (cols.length >= 2) {
        const k = cols[0];
        const v = cleanText(cols[1]);
        const desc = cols.length >= 4 ? cleanText(cols[3]) : '';
        if (k === '主要肌群') res.primary = v || desc;
        if (k === '次要肌群') res.secondary = v || desc;
        if (k === '器械设置') res.setup = v || desc;
        if (k === '动作步骤') res.stepsStr = v || desc;
        if (k === '常见错误') res.mistake = v || desc;
        if (k === '训练剂量') res.sets = v || desc;
      }
    }
  }

  const sec12Match = content.match(/### 1\.2 建议修正或补充\s*([\s\S]*?)(?=### 1\.3|## 二|$)/);
  if (sec12Match) {
    const s12 = sec12Match[1];
    const pMatch = s12.match(/主要肌群[：:]([^\n]+)/);
    if (pMatch && !res.primary) res.primary = cleanText(pMatch[1]);
    const secMatch = s12.match(/次要肌群[：:]([^\n]+)/);
    if (secMatch && !res.secondary) res.secondary = cleanText(secMatch[1]);
    const setMatch = s12.match(/器械设置[：:]([^\n]+)/);
    if (setMatch) res.setup = cleanText(setMatch[1]);
    const stepMatch = s12.match(/动作步骤[：:]([^\n]+)/);
    if (stepMatch) res.stepsStr = cleanText(stepMatch[1]);
    const misMatch = s12.match(/常见错误[：:]([^\n]+)/);
    if (misMatch) res.mistake = cleanText(misMatch[1]);
    const doseMatch = s12.match(/训练剂量[：:]([^\n]+)/);
    if (doseMatch) res.sets = cleanText(doseMatch[1]);
  }

  const captions = [...content.matchAll(/页面配文：([^\n]+)/g)].map(m => cleanText(m[1]));
  res.captions = captions;

  return res;
}

// 逐个动作的精确元数据配置（涵盖部位、目标肌群、口诀、步骤与错误精校）
const METADATA_37 = {
  'assisted-dip': {
    category: 'arms',
    muscles: ['triceps', 'chest'],
    equipment: 'machine',
    attachment: 'E11 辅助引体／双杠机＋双杠把手＋跪托垫',
    availability: '辅助引体双杠机 (E11)',
    cue: '双肘微向后，掌根发力推回不锁死。',
    steps: [
      '先在配重片选择好辅助重量（注意：数值越大辅助越省力）。',
      '双手握紧双杠把手，双膝平稳置于承托垫上，手臂伸直、肩胛下沉。',
      '屈肘缓慢受控下降，至上臂接近与地面平行即可，避免过度拉扯肩关节。',
      '掌根发力推压把手升起身体，顶端肘关节微屈不锁死。'
    ],
    mistake: '配重数值越大越省力，进阶方向是逐步减小配重；避免下放过深或耸肩借力。',
    sets: '3–4 组 × 8–12 次（中等辅助）',
    rest: '60–90 秒'
  },
  'assisted-pull-up': {
    category: 'back',
    muscles: ['lats', 'biceps'],
    equipment: 'machine',
    attachment: 'E11 辅助引体双杠机＋引体把手＋跪托垫',
    availability: '辅助引体双杠机 (E11)',
    cue: '想象双肘向肋骨两侧下拉，胸口主动迎向横杆。',
    steps: [
      '选择适当辅助配重，双手正握宽把手，双膝跪在承托垫上自然下垂。',
      '沉肩挺胸，启动背阔肌，主动将双肘向身体两侧下拉。',
      '将身体拉起至下巴过杠或胸部接近把手高度，顶峰挤压背阔肌。',
      '缓慢控制身体下放还原至手臂伸展，不猛落，保持核心收紧。'
    ],
    mistake: '不要靠身体蹬动弹震借力；配重越大越省力，能规范完成后逐步减小辅助。',
    sets: '3–4 组 × 8–12 次（中等辅助）',
    rest: '90–120 秒'
  },
  'barbell-bench-press': {
    category: 'chest',
    muscles: ['chest', 'triceps', 'front-delt'],
    equipment: 'barbell',
    attachment: 'B03/E17 奥林匹克杠铃＋卧推训练凳＋安全护杠',
    availability: '杠铃卧推架 (B03/E17)',
    cue: '肩胛收紧贴凳，小臂垂直推起，杠铃微弧轨迹。',
    steps: [
      '平躺在卧推凳上，双脚踩实地面，肩胛后缩下沉，双眼正对杠铃杆。',
      '正握杠铃，握距略宽于肩，出架并将杠铃移至胸部上方稳定。',
      '吸气缓慢下放杠铃至下胸或胸骨中下段，双肘相对躯干约 45°–75°。',
      '呼气发力推起杠铃至胸部上方起始位置，顶峰肘关节微屈不锁死。'
    ],
    mistake: '避免双肘过度外展（90°）导致肩关节撞击；臀部切勿抬离凳面。',
    sets: '3–4 组 × 8–12 次',
    rest: '90–120 秒'
  },
  'barbell-overhead-press': {
    category: 'shoulders',
    muscles: ['front-delt', 'side-delt', 'triceps'],
    equipment: 'barbell',
    attachment: 'B03 杠铃架＋标准奥杆',
    availability: '杠铃深蹲推举架 (B03)',
    cue: '收紧核心与臀部，垂直向上推过头顶。',
    steps: [
      '将杠铃架设在接近胸骨高度，正握杠杆约肩宽，杠铃置于锁骨上胸前方。',
      '双脚约肩宽站稳，收紧腹部和臀大肌，微微后仰头部避让杠铃。',
      '呼气沿垂直轨迹推起杠铃，杠铃过头后躯干自然回位，顶峰双臂伸展。',
      '吸气缓慢控制杠铃下放回到锁骨起点，避免腰椎大幅后仰借力。'
    ],
    mistake: '切勿大幅后仰腰椎借力代偿，核心全程收紧保持骨盆中立。',
    sets: '3–4 组 × 8–12 次',
    rest: '90–120 秒'
  },
  'barbell-romanian-deadlift': {
    category: 'legs',
    muscles: ['hamstrings', 'glute-max'],
    equipment: 'barbell',
    attachment: 'B03 杠铃架＋奥杆＋胶垫杠铃片',
    availability: '杠铃自由力量区 (B03)',
    cue: '膝微屈固定，髋部后推，用后侧链拉回身体。',
    steps: [
      '双脚与髋同宽站立，双手正握杠铃略宽于双腿，自然站直收紧核心。',
      '膝关节微屈（约 15°）并全程固定角度，以髋为折叶向后推臀部。',
      '杠铃始终贴着大腿向下移动，至小腿中段并感受大腿后侧强烈牵拉。',
      '收紧臀肌和腘绳肌，向前顶髋伸直身体站起，恢复初始站姿。'
    ],
    mistake: '避免做成深蹲（膝盖过度前屈）或弓背；杠铃始终紧贴身体移动。',
    sets: '3–4 组 × 8–12 次',
    rest: '90–120 秒'
  },
  'barbell-row': {
    category: 'back',
    muscles: ['mid-back', 'lats', 'biceps'],
    equipment: 'barbell',
    attachment: 'B03 杠铃架＋奥杆＋胶垫杠铃片',
    availability: '杠铃自由力量区 (B03)',
    cue: '背部平直俯身，双肘向后向上划向肚脐。',
    steps: [
      '双脚与肩同宽站稳，双手正握杠铃略宽于腿外侧。',
      '屈膝屈髋俯身，躯干前倾约 45° 并保持脊柱中立平直。',
      '背部发力，双肘贴近身体向后向上提拉杠铃，触碰肚脐或下腹部。',
      '顶峰短暂停顿夹紧肩胛骨，再缓慢受控伸臂下放杠铃至起始位。'
    ],
    mistake: '避免借助腿部蹬伸和腰部猛甩；腰背必须挺直锁定，切勿弓背。',
    sets: '3–4 组 × 8–12 次',
    rest: '90–120 秒'
  },
  'barbell-squat': {
    category: 'legs',
    muscles: ['quads', 'glute-max'],
    equipment: 'barbell',
    attachment: 'B03 深蹲架＋奥杆＋杠铃锁扣',
    availability: '杠铃深蹲架 (B03)',
    cue: '杠铃稳压上背，屈髋屈膝同时下蹲，膝盖追随脚尖。',
    steps: [
      '将杠铃卡在上背斜方肌上，双手握稳杠杆，起架后后退一至两步站稳。',
      '双脚约与肩同宽，脚尖微向外展约 15°–30°，收紧核心并吸气。',
      '屈髋屈膝同时向下蹲，膝盖朝脚尖方向展开，下蹲至大腿与地面接近平行。',
      '全脚掌蹬地站起，呼气回到站立位置，顶端膝关节微屈不超伸。'
    ],
    mistake: '避免膝盖内扣、脚跟离地或骨盆过早卷起（屁股眨眼）；先从空杆找准平衡。',
    sets: '3–4 组 × 6–10 次',
    rest: '90–120 秒'
  },
  'cable-hip-extension': {
    category: 'legs',
    muscles: ['glute-max', 'hamstrings'],
    equipment: 'cable',
    attachment: 'E03 龙门架低位滑轮＋脚踝绑带',
    availability: '双侧可调滑轮 (E03)',
    cue: '躯干微前倾固定，脚跟带动腿向后上方蹬出。',
    steps: [
      '将绑带系在一侧脚踝并扣在低位滑轮，双手扶立柱保持身体平衡。',
      '躯干微前倾，支撑腿微屈，活动腿在身前轻微屈膝启动。',
      '收紧臀大肌，驱动脚后跟将腿向后上方伸展踢出，骨盆保持正对前方。',
      '在顶峰紧绷臀肌 1 秒，然后缓慢受控送回起始位置，换腿重复。'
    ],
    mistake: '切勿靠腰椎大幅超伸拱腰来换取后踢幅度；必须孤立臀肌发力。',
    sets: '3 组 × 12–15 次／侧',
    rest: '60–90 秒'
  },
  'cable-pull-through': {
    category: 'legs',
    muscles: ['glute-max', 'hamstrings'],
    equipment: 'cable',
    attachment: 'E03 龙门架低位滑轮＋双头绳索',
    availability: '双侧可调滑轮 (E03)',
    cue: '背对滑轮屈髋推臀，向前顶髋夹紧臀部。',
    steps: [
      '将双头绳扣在最低位滑轮，背对机器跨立在绳索上方，双手握绳端。',
      '向前跨出一两步使绳索拉紧，双脚宽于肩，膝盖微屈。',
      '保持背部挺直，屈髋把臀部向后方滑轮推去，绳子顺势从胯下穿过。',
      '脚跟蹬地、强力向前顶髋，在完全站直的顶端强烈收缩臀大肌。'
    ],
    mistake: '这是铰链动作而非深蹲；膝盖不要大幅向前屈曲，主要由髋关节折叠驱动。',
    sets: '3 组 × 10–15 次',
    rest: '60–90 秒'
  },
  'cable-single-arm-row': {
    category: 'back',
    muscles: ['lats', 'mid-back'],
    equipment: 'cable',
    attachment: 'E03 龙门架中低位滑轮＋单手把手',
    availability: '双侧可调滑轮 (E03)',
    cue: '躯干稳定不扭转，肘部沿肋骨向后拉。',
    steps: [
      '将滑轮调至胸腹高度，单手握把手，后退一步成前后弓步站立。',
      '躯干端正微前倾，手臂前伸使背阔肌充分拉伸展开。',
      '启动背肌，带动肘部向后向下贴着肋骨划动，将把手拉至躯干侧面。',
      '顶峰感受单侧背肌夹紧，再缓慢控制手臂前送伸展，换边进行。'
    ],
    mistake: '避免靠身体旋转后甩借力；躯干保持稳定正对前方。',
    sets: '3 组 × 10–12 次／侧',
    rest: '60–90 秒'
  },
  'cable-standing-chest-press': {
    category: 'chest',
    muscles: ['chest', 'front-delt'],
    equipment: 'cable',
    attachment: 'E03 龙门架胸高滑轮＋单手把手',
    availability: '双侧可调滑轮 (E03)',
    cue: '前后弓步稳定，双手向前合推聚拢。',
    steps: [
      '双侧滑轮调至胸部高度，双手握把手向前迈一步呈前后弓步站稳。',
      '躯干微前倾并收紧核心，双肘打开至身体两侧，大臂约 45°。',
      '呼气由胸大肌发力将双侧把手向前推出聚拢，顶端双臂自然伸直。',
      '吸气缓慢沿弧线回落，感受胸肌拉伸，动作全程保持肩膀下沉。'
    ],
    mistake: '前后弓步必须稳固，核心保持收紧；不要被绳索拉扯后仰。',
    sets: '3 组 × 10–15 次',
    rest: '60–90 秒'
  },
  'dead-bug': {
    category: 'core',
    muscles: ['abs'],
    equipment: 'free',
    attachment: '垫上与自由区＋瑜伽垫',
    availability: '垫上与自由区 (FREE)',
    cue: '下背始终压死地面，对侧手脚对角线伸出。',
    steps: [
      '仰卧在垫子上，双臂垂直指向天花板，双腿屈膝 90° 呈桌面姿势。',
      '骨盆后倾，腹肌用力收缩将下背部完全贴紧地面，不留任何缝隙。',
      '保持下背贴地，缓慢将左臂向头顶伸直、同时将右腿向前下方伸展。',
      '受控收回至起始位置，换另一侧手脚（右臂＋左腿）交替进行。'
    ],
    mistake: '当手腿下放时下背部若出现反弓离地，说明核心失稳，应先减小下放幅度。',
    sets: '3 组 × 8–12 次／侧',
    rest: '45–60 秒'
  },
  'decline-bench-crunch': {
    category: 'core',
    muscles: ['abs'],
    equipment: 'bench',
    attachment: 'E06 下斜腹肌板＋脚部固定滚垫',
    availability: '下斜腹肌凳 (E06)',
    cue: '双脚勾紧圆垫，腹部像卷地毯一样卷起。',
    steps: [
      '坐上下斜凳，双脚牢固卡入顶端固定圆垫，仰卧躺平在斜板上。',
      '双手交叉置于胸前或轻触耳后（切勿抱头拉扯颈椎）。',
      '呼气收紧腹直肌，像卷地毯一样带动肩胛与上背部逐节卷起。',
      '达到顶峰收缩后，吸气极其缓慢地逐节贴回斜板，保持腹部持续张力。'
    ],
    mistake: '不要双手抱头猛拉脖子，也不要完全坐直导致腹肌失去张力。',
    sets: '3 组 × 12–15 次',
    rest: '60 秒'
  },
  'dumbbell-bench-press': {
    category: 'chest',
    muscles: ['chest', 'triceps', 'front-delt'],
    equipment: 'dumbbell',
    attachment: 'B01 哑铃架＋B02 独立平凳',
    availability: '哑铃架与训练凳 (B01/B02)',
    cue: '双脚踩实地面，大臂呈 45° 推起，顶点不撞击。',
    steps: [
      '坐在平凳边，双手持哑铃置于大腿上，顺势躺平并将哑铃带至胸口两侧。',
      '双脚平踩地面，肩胛骨后缩下沉贴凳，上臂与身体大约呈 45°–60°。',
      '呼气胸肌发力将哑铃垂直向上推起，顶端两哑铃靠近但避免相撞。',
      '吸气缓慢受控地下放哑铃至胸肌感到充分牵拉，下放深度与胸平齐。'
    ],
    mistake: '避免大臂过度外展成 90° 损伤肩峰；下放不可过快失去肌肉控制。',
    sets: '3–4 组 × 8–12 次',
    rest: '90–120 秒'
  },
  'dumbbell-curl': {
    category: 'arms',
    muscles: ['biceps'],
    equipment: 'dumbbell',
    attachment: 'B01 阶梯哑铃架＋同重哑铃',
    availability: '哑铃区 (B01)',
    cue: '大臂夹在身侧不动，掌心旋上将哑铃卷起。',
    steps: [
      '站立或坐姿，双手各持一只哑铃垂于身侧，掌心朝内（中立握）。',
      '大臂紧贴身体两侧保持不动，肘部弯曲将哑铃向上弯举。',
      '上举过程中手腕自然向外旋转，至顶峰时掌心朝上强烈挤压肱二头肌。',
      '受控缓慢下放哑铃至手臂自然伸直，避免身体前后摇晃借力。'
    ],
    mistake: '切勿靠后仰甩动身体借力；手肘不要向前抬起代替小臂弯曲。',
    sets: '3 组 × 10–12 次',
    rest: '60 秒'
  },
  'dumbbell-hammer-curl': {
    category: 'arms',
    muscles: ['brachialis', 'biceps'],
    equipment: 'dumbbell',
    attachment: 'B01 阶梯哑铃架＋同重哑铃',
    availability: '哑铃区 (B01)',
    cue: '手心相对中立握，像敲锤子一样匀速上卷。',
    steps: [
      '双脚与肩同宽站稳，双手持哑铃自然下垂，掌心始终相对。',
      '保持大臂固定在身体两侧，双肘屈曲向上弯举哑铃。',
      '弯举至顶端，拇指朝上，专注感受肱肌与前臂外侧肌群的强力收缩。',
      '平稳受控下放哑铃至初始垂放位置，动作全程手腕保持中立不折腕。'
    ],
    mistake: '手腕不要前后晃动；大臂始终钉在躯干侧方，不借肩部前抬。',
    sets: '3 组 × 10–12 次',
    rest: '60 秒'
  },
  'dumbbell-lateral-raise': {
    category: 'shoulders',
    muscles: ['side-delt'],
    equipment: 'dumbbell',
    attachment: 'B01 哑铃架＋轻重量哑铃',
    availability: '哑铃区 (B01)',
    cue: '手肘微屈引路，沿肩胛骨平面向侧上方展开。',
    steps: [
      '自然站立，双手各握一只轻重量哑铃置于大腿前方，双肘保留微屈。',
      '躯干微微前倾，肩膀下沉，避免斜方肌预先耸起。',
      '通过手肘带动上臂向两侧抬起，沿肩胛骨平面抬至上臂与地面大致水平。',
      '在顶端短暂停留，再缓慢平稳下放还原，全程保持肌肉张力。'
    ],
    mistake: '不要使用过大重量导致耸肩代偿或后仰甩身；手臂不要完全锁死伸直。',
    sets: '3–4 组 × 12–15 次',
    rest: '60 秒'
  },
  'dumbbell-one-arm-row': {
    category: 'back',
    muscles: ['lats', 'mid-back', 'biceps'],
    equipment: 'dumbbell',
    attachment: 'B01 哑铃架＋B02 独立平凳',
    availability: '哑铃区与训练凳 (B01/B02)',
    cue: '支撑手撑稳，肘部向臀部方向贴身划动。',
    steps: [
      '单手单膝跪于平凳上支撑，背部平直中立，外侧手自然下垂握住哑铃。',
      '肩膀自然下沉，让肩胛骨带动背阔肌在起始位置得到充分延展。',
      '由背部发力，引导肘部沿着身体侧面向上向后划动，拉至腰际附近。',
      '顶峰收缩背肌 1 秒，然后缓慢控制哑铃下放至手臂伸直起始位。'
    ],
    mistake: '避免躯干剧烈旋转借力；背部必须保持平直，切勿弓腰。',
    sets: '3 组 × 8–12 次／侧',
    rest: '60–90 秒'
  },
  'dumbbell-rdl': {
    category: 'legs',
    muscles: ['hamstrings', 'glute-max'],
    equipment: 'dumbbell',
    attachment: 'B01 阶梯哑铃架＋同重哑铃',
    availability: '哑铃区 (B01)',
    cue: '膝角微屈固定，臀向后顶，哑铃贴腿下放。',
    steps: [
      '双脚微内收约与髋同宽，双手各持一只哑铃垂于大腿前侧，挺胸收腹。',
      '膝盖保持微屈并在动作中固定角度，以髋关节为折轴将臀部向后推。',
      '哑铃紧贴着腿部表面向下滑动，至膝盖下方感受大腿后侧明显张力。',
      '脚跟压实地面，收缩臀肌强力向前顶髋，将身体恢复到直立站姿。'
    ],
    mistake: '严禁弓背或低头盯地；哑铃不可脱离腿部悬空，否则下背负担倍增。',
    sets: '3–4 组 × 10–12 次',
    rest: '90 秒'
  },
  'glute-bridge': {
    category: 'legs',
    muscles: ['glute-max', 'hamstrings'],
    equipment: 'free',
    attachment: '垫上与自由区＋瑜伽垫',
    availability: '垫上与自由区 (FREE)',
    cue: '脚跟压地，收紧臀部顶起髋关节成一直线。',
    steps: [
      '仰卧在垫上，双膝弯曲约 90°，双脚与肩同宽踩地，双手自然放于身侧。',
      '腹肌微收固定骨盆，通过脚后跟向下蹬地发力。',
      '强力收紧臀大肌将髋部抬起，直至膝盖、髋关节与肩膀连成一条直线。',
      '在顶端停留 1–2 秒充分夹紧臀部，然后受控将臀部缓慢下落接近地面。'
    ],
    mistake: '不要依靠过度拱起下背部（腰椎超伸）来抬高身体；发力点应集中于臀大肌。',
    sets: '3 组 × 15–20 次',
    rest: '45–60 秒'
  },
  'goblet-squat': {
    category: 'legs',
    muscles: ['quads', 'glute-max'],
    equipment: 'dumbbell',
    attachment: 'B01 哑铃架＋单只哑铃',
    availability: '哑铃区 (B01)',
    cue: '双手托哑铃贴胸，手肘下落到双膝内侧。',
    steps: [
      '双手像托酒杯一样端住哑铃一端，贴紧胸口中央，双肘朝下。',
      '双脚站立略宽于肩，脚尖微向外展约 20°–30°，挺胸收紧核心。',
      '屈髋屈膝平稳下蹲，双肘自然下沉并置于双膝内侧之间，大腿达水平。',
      '脚后跟与全脚掌均匀蹬地站直身体，回到站立初始位。'
    ],
    mistake: '哑铃切勿离开胸口向前倾倒；保持胸部挺拔，避免弯腰驼背。',
    sets: '3 组 × 10–12 次',
    rest: '60–90 秒'
  },
  'hack-squat': {
    category: 'legs',
    muscles: ['quads', 'glute-max'],
    equipment: 'machine',
    attachment: 'E10 斜轨哈克深蹲机＋双肩垫＋大踏板',
    availability: '斜轨哈克深蹲机 (E10)',
    cue: '背部贴实倾斜靠垫，脚跟踩稳，沿滑轨平稳蹲起。',
    steps: [
      '站上脚踏平台，双肩置于肩托垫下，背部和臀部完全贴实倾斜靠垫。',
      '双脚约肩宽踩稳踏板中上部，伸膝微蹬起滑车，扳动手柄解除安全卡位。',
      '屈膝缓慢顺着轨道下蹲至大腿接近与踏板平行，膝盖顺着脚尖方向展开。',
      '脚跟均匀发力蹬起滑车回到起点，膝盖微屈不锁死；完成时卡紧安全手柄。'
    ],
    mistake: '整个过程背臀不可脱离靠垫；下蹲深度以脚跟不离台、腰背不卷曲为限。',
    sets: '3–4 组 × 8–12 次',
    rest: '90–120 秒'
  },
  'hip-adduction-machine': {
    category: 'legs',
    muscles: ['glute-med'],
    equipment: 'machine',
    attachment: 'E23 髋内外展双向机＋旋转腿垫（内收模式）',
    availability: '坐姿髋内外展机 (E23)',
    cue: '大腿内侧用力，将两侧护垫匀速夹紧合拢。',
    steps: [
      '调节腿垫朝内锁定，坐在座椅上，将双腿置于两侧腿垫外侧。',
      '拉起调节把手将起始开角调至大腿内侧舒适牵拉的最大范围。',
      '双手握住身旁稳定把手，背部贴垫，内收大腿将腿垫向中间挤压合拢。',
      '在两垫相触时短暂停留，再缓慢控制阻力展开双腿回到起始位。'
    ],
    mistake: '合拢时不要靠上身晃动前冲；回放时配重不要直接碰撞，保持内侧控制。',
    sets: '3 组 × 12–15 次',
    rest: '60 秒'
  },
  'machine-glute-extension': {
    category: 'legs',
    muscles: ['glute-max', 'hamstrings'],
    equipment: 'machine',
    attachment: 'E26 臀部后蹬机＋脚踏滚垫／蹬板',
    availability: '器械臀肌后蹬机 (E26)',
    cue: '单侧脚后跟后蹬，在顶峰用力挤压臀大肌。',
    steps: [
      '调节支撑胸垫或手柄，单腿跪于支撑垫或站稳，工作腿脚掌踏在蹬板上。',
      '收紧腹部核心保持骨盆朝向正前方，背部保持中立。',
      '由臀大肌主导发力，将脚踏向后上方平稳蹬出，直至腿部接近伸展。',
      '在顶端强烈夹紧臀大肌停留 1 秒，然后缓慢受控屈膝收回起点。'
    ],
    mistake: '避免骨盆随腿部向外翻转或下背部过度反弓借力；集中于臀部收缩。',
    sets: '3 组 × 12–15 次／侧',
    rest: '60 秒'
  },
  'machine-reverse-fly': {
    category: 'shoulders',
    muscles: ['rear-delt', 'mid-back'],
    equipment: 'machine',
    attachment: 'E19 蝴蝶机／反向飞鸟机＋垂直把手',
    availability: '蝴蝶机／长臂夹胸机 (E19)',
    cue: '反向胸口贴垫，双肘微屈向身体两侧水平展臂。',
    steps: [
      '面向椅背反坐，调节座椅高度使双手握把手时上臂接近肩高。',
      '胸口稳贴在靠垫上，双手握紧垂直把手，手肘保留微屈并锁定。',
      '三角肌后束发力，将双臂沿水平弧线向两侧后方展开，直至上臂与躯干平齐。',
      '在顶峰短暂停顿感受肩后束收缩，随后缓慢受控回放至起始位置。'
    ],
    mistake: '不要大幅耸肩或过度依赖夹拢肩胛骨代替肩后束展开；肘部保持微屈锁定。',
    sets: '3 组 × 12–15 次',
    rest: '60 秒'
  },
  'plank': {
    category: 'core',
    muscles: ['abs', 'obliques'],
    equipment: 'free',
    attachment: '垫上与自由区＋瑜伽垫',
    availability: '垫上与自由区 (FREE)',
    cue: '前臂撑地，头颈肩背臀踝保持在一条直线。',
    steps: [
      '俯卧在垫上，以双前臂撑地，肘关节位于肩膀正下方，屈肘 90°。',
      '双脚与髋同宽前脚掌撑地，双腿伸直离开地面。',
      '腹肌紧绷、臀大肌收缩，使头顶、后背、臀部和脚跟形成平直的平板。',
      '目视双手前方地面，保持自然呼吸，以身体不颤抖下塌的时长为准。'
    ],
    mistake: '严禁塌腰（腰椎超伸下坠）或翘起臀部；一旦姿势变形立即停止休息。',
    sets: '3 组 × 30–60 秒保持',
    rest: '60 秒'
  },
  'plate-loaded-incline-chest-press': {
    category: 'chest',
    muscles: ['upper-chest', 'chest'],
    equipment: 'machine',
    attachment: 'E21 挂片上斜推胸机＋倾斜靠背＋分动把手',
    availability: '坐姿推胸机 (E21)',
    cue: '上背贴紧倾斜靠背，双手向前上方推出。',
    steps: [
      '挂好适宜杠铃片，坐在上斜座椅上，背部和后脑贴紧靠背。',
      '握住推举把手，调整座椅使把手处于锁骨与上胸平齐的位置。',
      '呼气由上胸发力将握把向前上方平稳推出，推至手臂接近伸展。',
      '吸气受控让握把缓慢后移下降，至上胸获得充分拉伸感，配重不脱力相撞。'
    ],
    mistake: '臀部切勿从坐垫滑脱造成腰部大幅镂空；推起时肩膀始终下沉。',
    sets: '3–4 组 × 8–12 次',
    rest: '90 秒'
  },
  'plate-loaded-lat-pulldown': {
    category: 'back',
    muscles: ['lats', 'biceps'],
    equipment: 'machine',
    attachment: 'E14 挂片杠杆高位下拉机＋大腿压垫',
    availability: '高位下拉工位 (E02/E14)',
    cue: '大腿紧卡压垫，肘尖向下沉，杆臂拉至锁骨。',
    steps: [
      '两侧挂载同等配重，调节大腿固定滚垫使其严密贴紧大腿上方。',
      '双手握住上方分动把手，坐入座位并将双腿牢牢卡入压垫下。',
      '挺胸微后倾躯干，背阔肌启动将把手向下拉至锁骨与上胸之间。',
      '在收紧位置停顿片刻，然后极为缓慢地顺应阻力伸臂还原。'
    ],
    mistake: '不要大幅前后摇晃身体借力；下拉时双肘不要过度后旋。',
    sets: '3–4 组 × 8–12 次',
    rest: '90 秒'
  },
  'plate-loaded-lying-chest-press': {
    category: 'chest',
    muscles: ['chest', 'triceps'],
    equipment: 'machine',
    attachment: 'E22 挂片平卧推胸机＋卧推长凳＋杠杆工作臂',
    availability: '坐姿推胸机 (E21/E22)',
    cue: '平躺贴凳，掌根推压把手，胸大肌强力顶峰收缩。',
    steps: [
      '挂载目标杠铃片，仰卧在长凳上，肩胛骨后缩下沉贴实皮垫。',
      '双手握住推胸握把，小臂垂直于地面，推起把手脱离初始挂钩。',
      '呼气胸大肌向中聚拢发力推起工作臂，直至双臂接近完全伸直。',
      '吸气缓慢控制把手下落至胸大肌充分拉伸位置，平稳换向。'
    ],
    mistake: '肩膀不要向前离开凳面耸起；保持手腕竖直不反折。',
    sets: '3–4 组 × 8–12 次',
    rest: '90 秒'
  },
  'plate-loaded-seated-row': {
    category: 'back',
    muscles: ['mid-back', 'lats'],
    equipment: 'machine',
    attachment: 'E20 挂片分动划船机＋胸前独立托垫',
    availability: '胸垫式固定划船机 (E20)',
    cue: '胸口贴稳前托垫，双肘顺轨迹向后拉过躯干。',
    steps: [
      '挂好配重，调节坐垫使胸前托垫贴在胸骨中下段，脚踩前蹬板。',
      '双手握住分动把手，双肩自然前送使背部肌肉获得适度延展。',
      '背肌启动，引导手肘向身体后方划出弧线，将握把拉向身侧。',
      '顶峰肩胛骨完全靠拢收缩，再控制把手缓慢前送回到起始位置。'
    ],
    mistake: '胸口不要在发力时离开前托垫；拉动过程中避免脖子前伸耸肩。',
    sets: '3–4 组 × 8–12 次',
    rest: '90 秒'
  },
  'prone-leg-curl': {
    category: 'legs',
    muscles: ['hamstrings'],
    equipment: 'machine',
    attachment: 'E24 俯卧腿弯举机＋小腿后侧滚垫＋俯卧垫',
    availability: '俯卧腿弯举机 (E24)',
    cue: '骨盆压紧台面，脚跟向上勾向臀部。',
    steps: [
      '俯卧在机器软垫上，膝盖刚过台面边缘，小腿滚垫调节在脚后跟上方。',
      '双手握紧前方稳定把手，收紧腹部保持骨盆紧贴在俯卧软垫上。',
      '腘绳肌发力将小腿向上弯曲勾起，直至接近臀部位置。',
      '在顶端挤压大腿后侧，再平缓受控下放滚垫至腿部伸展但配重不相撞。'
    ],
    mistake: '严禁勾腿时骨盆抬起、腰椎大幅反弓代偿；保持骨盆牢靠压垫。',
    sets: '3 组 × 10–12 次',
    rest: '60–90 秒'
  },
  'reverse-hyper': {
    category: 'legs',
    muscles: ['glute-max', 'hamstrings'],
    equipment: 'machine',
    attachment: 'E07 背伸展凳／罗马椅＋双髋托垫',
    availability: '背伸展凳／罗马椅 (E07)',
    cue: '上身固定抱凳，由臀部带起双腿向后上方抬起。',
    steps: [
      '俯卧在罗马椅上身托垫上，髋骨前缘贴垫，双手牢牢抱住前方支架。',
      '双腿自然向下垂直垂放，保持核心紧绷稳定上半身。',
      '收紧臀大肌与大腿后侧，将双腿向后上方抬起至与躯干连成直线。',
      '顶峰强烈挤压臀肌 1 秒，缓慢控制双腿下落回到起始垂放姿势。'
    ],
    mistake: '动作由臀部后伸驱动，不可依靠双腿前后大幅荡秋千式甩动借力。',
    sets: '3 组 × 12–15 次',
    rest: '60 秒'
  },
  'roman-chair-hip-extension': {
    category: 'legs',
    muscles: ['glute-max', 'hamstrings'],
    equipment: 'machine',
    attachment: 'E07 罗马椅／背伸展凳＋脚踝固定垫',
    availability: '背伸展凳／罗马椅 (E07)',
    cue: '髋关节沿垫折叠，以臀部收紧拉回躯干成直线。',
    steps: [
      '双脚卡紧后方脚垫，调整髋部垫面高度使其刚好位于大腿上段、骨盆下方。',
      '双手交叉置于胸前，背部维持平直中立，以髋关节为轴向前向下俯身折叠。',
      '俯身至大腿后侧产生饱满牵拉感（约与腿呈 90°）。',
      '强力收缩臀大肌和腘绳肌将上半身拉回，直到身体成一条直线即可停止。'
    ],
    mistake: '切勿在顶峰过度超伸腰椎（向后猛顶反弓）；身体与腿成平直直线即到位。',
    sets: '3 组 × 10–15 次',
    rest: '60 秒'
  },
  'seated-dip-machine': {
    category: 'arms',
    muscles: ['triceps', 'chest'],
    equipment: 'machine',
    attachment: 'E12 坐姿臂屈伸机＋两侧下压握把',
    availability: '辅助引体双杠机 (E11/E12)',
    cue: '双肘收于身侧，掌心垂直向下按压把手。',
    steps: [
      '调整坐垫高度，背部挺直贴靠靠背，双手握住身体两侧的下推把手。',
      '肩膀下沉，大臂垂直贴于身体两侧，肘部弯曲约 90°。',
      '肱三头肌主导发力将握把向下强力压下，直至双臂接近完全伸直。',
      '在底部停顿 1 秒充分收缩手臂后侧，然后缓慢对抗阻力屈肘回升。'
    ],
    mistake: '避免耸肩或前倾身体压在握把上借力；肘关节在底部切勿猛烈过伸锁死。',
    sets: '3 组 × 10–12 次',
    rest: '60 秒'
  },
  'stair-climber': {
    category: 'cardio',
    muscles: ['quads', 'glute-max', 'calves'],
    equipment: 'cardio',
    attachment: 'E05 循环旋转台阶楼梯机＋安全扶手',
    availability: '商用跑步机与楼梯机 (B04/E05)',
    cue: '整脚踩满台阶，身体直立，双腿均匀踏步。',
    steps: [
      '双手轻扶扶手站上最下层台阶，确认控制面板急停键位置，以低速启动。',
      '保持躯干直立、目视前方，双手仅用于维持平衡，不要向下压撑借力。',
      '整只脚掌踩满台阶中段，由臀腿发力向下蹬踏并顺势抬起对侧腿。',
      '持续稳定踩踏 15–30 分钟，结束前逐步降速至完全停止后再行离机。'
    ],
    mistake: '严禁身体前倾趴在扶手上倚靠承重，也不要只用脚尖踩边缘碎步增加膝关节负担。',
    sets: '持续 15–30 分钟有氧',
    rest: '慢走平复呼吸',
    externalVideo: false,
    localDemo: false,
    equipmentLabel: '楼梯机',
    demoNote: '旋转台阶楼梯机持续踏步训练；整脚踩满台阶，双手仅轻搭扶手维持平衡。',
    practiceNote: '先从低速开始适应台阶节奏。保持躯干直立，扶手仅起保护平衡作用；感到疲劳时先降低步速。',
    mediaCredit: 'FitGuide',
    instructionTitle: '准备 → 踏阶 → 收尾'
  },
  't-bar-row-unsupported': {
    category: 'back',
    muscles: ['mid-back', 'lats'],
    equipment: 'machine',
    attachment: 'E08 无胸托 T 杠划船器＋多把位手柄',
    availability: '无胸托 T 杠划船器 (E08)',
    cue: '屈髋俯身背部平直，双肘带动手柄提拉至腹部。',
    steps: [
      '双脚跨立在脚踏板上与肩同宽，屈髋屈膝使躯干前倾约 45°，双手握紧手柄。',
      '双脚蹬实地面，核心紧绷，维持背部平直中立，杠铃片自然悬垂离地。',
      '背阔肌和菱形肌发力，双肘贴身向后上方提拉杠杆，直至手柄接近小腹。',
      '在顶端肩胛骨用力夹紧，随后控制阻力缓慢沿原轨迹放回起始位置。'
    ],
    mistake: '全程脊柱必须保持平直，切勿因负重过大而弓背驼背损伤下背。',
    sets: '3–4 组 × 8–12 次',
    rest: '90–120 秒'
  },
  'weighted-back-extension': {
    category: 'legs',
    muscles: ['glute-max', 'hamstrings'],
    equipment: 'machine',
    attachment: 'E07 罗马椅＋小重量杠铃片／哑铃',
    availability: '背伸展凳／罗马椅 (E07)',
    cue: '双手抱紧配重片于胸前，以髋折叠后收臀拉直。',
    steps: [
      '双手抱住一块轻重量杠铃片紧贴胸口，双脚卡紧罗马椅脚垫，大腿贴垫。',
      '脊柱维持平直中立，以髋关节为中心向前下方俯身折叠至大腿后侧有拉伸感。',
      '收紧臀部和大腿后侧，将上半身平稳拉回，直到躯干与双腿成一条直线。',
      '在顶端短暂停留紧绷臀部，保持配重贴身，再缓慢受控俯身下放。'
    ],
    mistake: '配重必须贴在胸前不可悬空；顶峰切勿过度后仰超伸腰椎。',
    sets: '3 组 × 10–12 次',
    rest: '60–90 秒'
  }
};

// 提取当前 24 个动作
const vm = require('node:vm');
const currentCtx = { window: { GYM_DATA: [] } };
vm.createContext(currentCtx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'), currentCtx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'extra-data.js'), 'utf8'), currentCtx);
const current24 = currentCtx.window.GYM_DATA;

// 更新 24 个核心动作的 M&S 信息
const updated24 = current24.map(item => {
  const match = matched.find(m => m.gym_id === item.id);
  const msUrl = match?.matched_ms_exercise?.url || item.video || item.source;
  return {
    ...item,
    source: msUrl,
    video: msUrl,
    videoNote: 'Muscle & Strength 动作讲解页，需要联网。',
    mediaCredit: 'Muscle & Strength',
    demoNote: 'Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。',
    localDemo: true
  };
});

// 构建 37 个新增动作
const new37Exercises = [];
const new37Matched = matched.filter(m => !existing24Ids.has(m.gym_id));

for (const m of new37Matched) {
  const meta = METADATA_37[m.gym_id];
  if (!meta) {
    console.error('Missing metadata for:', m.gym_id);
    continue;
  }
  const promptData = parsePromptFile(m.prompt_file);
  const msUrl = m.matched_ms_exercise?.url || `https://www.muscleandstrength.com/exercises/${m.gym_id}`;

  let primary = meta.primary || promptData?.primary || '目标肌群收缩';
  let secondary = meta.secondary || promptData?.secondary || '协同与稳定肌群辅助';
  if (primary.includes('来源一致以') || primary.includes('权威来源')) {
    primary = primary.replace(/^(权威)?来源(一致)?以/, '').replace(/为主动肌.*$/, ' · 主动发力').trim();
  }
  if (secondary.includes('来源另列') || secondary.includes('建议稿：')) {
    secondary = secondary.replace(/^(来源另列|建议稿：)/, '').trim();
  }

  const exObj = {
    id: m.gym_id,
    name: m.chinese_name,
    en: m.english_name,
    category: meta.category,
    muscles: meta.muscles,
    equipment: meta.equipment,
    attachment: meta.attachment,
    availability: meta.availability,
    source: msUrl,
    video: msUrl,
    videoNote: meta.videoNote !== undefined ? meta.videoNote : 'Muscle & Strength 动作讲解页，需要联网。',
    primary,
    secondary,
    steps: meta.steps,
    mistake: meta.mistake,
    cue: meta.cue,
    sets: meta.sets,
    rest: meta.rest,
    localDemo: meta.localDemo !== undefined ? meta.localDemo : true,
    mediaCredit: meta.mediaCredit || 'Muscle & Strength',
    demoNote: meta.demoNote || 'Muscle & Strength 720p 动作循环示范；现场器械外观与握把可能略有差异。'
  };

  if (meta.externalVideo !== undefined) exObj.externalVideo = meta.externalVideo;
  if (meta.equipmentLabel) exObj.equipmentLabel = meta.equipmentLabel;
  if (meta.practiceNote) exObj.practiceNote = meta.practiceNote;
  if (meta.instructionTitle) exObj.instructionTitle = meta.instructionTitle;

  new37Exercises.push(exObj);
}

// 写入 data.js (24 个核心动作)
const dataJsContent = `// 动作资料、主要肌肉与器械条件独立维护，供页面和离线版共用。
// 基础 24 个力量与器械动作（已对齐 Muscle & Strength 720p 演示与教程）
window.GYM_DATA = ${JSON.stringify(updated24, null, 2)};
`;
fs.writeFileSync(path.join(ROOT, 'data.js'), dataJsContent, 'utf8');
console.log('Successfully wrote 24 core exercises to data.js');

// 写入 extra-data.js (37 个扩展动作)
const extraJsContent = `// 扩展实拍器械动作（37 个），全面对齐 Muscle & Strength 720p 演示视频与实拍工位
(function () {
  const extendedExercises = ${JSON.stringify(new37Exercises, null, 2)};
  window.GYM_DATA.push(...extendedExercises);
})();
`;
fs.writeFileSync(path.join(ROOT, 'extra-data.js'), extraJsContent, 'utf8');
console.log('Successfully wrote 37 extended exercises to extra-data.js');

