const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = 'D:/BaiduNetdiskDownload/61、3D动画健身教学零基础动作教学';
const TARGET_DIR = path.join(ROOT, 'assets', '3d');

if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`源目录不存在: ${SOURCE_DIR}`);
  process.exit(1);
}

fs.mkdirSync(TARGET_DIR, { recursive: true });

// 精准映射清单：FitGuide 动作 ID -> 3D 动画文件名
const MAPPING = {
  // 胸部 (Chest)
  'cable-chest-fly': '绳索夹胸.mp4',
  'cable-incline-chest-fly': '夹胸训练不同动作.mp4',
  'cable-standing-chest-press': '绳索夹胸.mp4',
  'machine-chest-fly': '坐姿夹胸.mp4',
  'machine-chest-press': '胸部动作合集.mp4',
  'barbell-bench-press': '杠铃卧推.mp4',
  'dumbbell-bench-press': '哑铃推胸.mp4',
  'plate-loaded-incline-chest-press': '史密斯训练合集.mp4',
  'plate-loaded-lying-chest-press': '杠铃卧推.mp4',

  // 背部 (Back)
  'lat-pulldown-with-pronated-grip': '高位下拉.mp4',
  'plate-loaded-lat-pulldown': '高位下拉.mp4',
  'cable-row-seated-narrow-grip': '坐姿划船.mp4',
  'seated-machine-row': '坐姿划船.mp4',
  'plate-loaded-seated-row': '坐姿划船.mp4',
  'cable-single-arm-row': '龙门架划船.mp4',
  'assisted-pull-up': '引体向上.mp4',
  'barbell-row': '划船握姿合集.mp4',
  'dumbbell-one-arm-row': '哑铃俯身划船.mp4',
  't-bar-row-unsupported': 'T杆划船.mp4',
  'straight-arm-lat-pulldown': '背阔肌训练组合.mp4',

  // 腿部 (Legs)
  'leg-press': '腿举.mp4',
  'leg-extension-seated': '坐姿腿屈伸.mp4',
  'leg-curl-seated': '股二头肌弯举.mp4',
  'prone-leg-curl': '股二头肌弯举.mp4',
  'barbell-squat': '杠铃深蹲.mp4',
  'goblet-squat': '哑铃深蹲.mp4',
  'barbell-romanian-deadlift': '罗马尼亚硬拉.mp4',
  'dumbbell-rdl': '罗马尼亚硬拉.mp4',
  'glute-bridge': '杠铃臀推.mp4',
  'roman-chair-hip-extension': '山羊挺背.mp4',
  'weighted-back-extension': '山羊挺背.mp4',
  'reverse-hyper': '山羊挺背.mp4',
  'machine-glute-extension': '臀部合集.mp4',
  'hip-abduction-machine': '臀部合集.mp4',
  'cable-hip-extension': 'T杆腿部训练.mp4',

  // 肩部 (Shoulders)
  'barbell-overhead-press': '杠铃推肩.mp4',
  'machine-shoulder-press': '史密斯推肩.mp4',
  'dumbbell-lateral-raise': '三角肌训练组合.mp4',
  'machine-reverse-fly': '三角肌训练组合.mp4',
  'face-pull': '绳索面拉.mp4',
  'cable-lateral-raise': '肩部训练组合.mp4',
  'lateral-raise-machine': '三角肌训练组合.mp4',
  'reverse-cable-fly': '哑铃飞鸟.mp4',

  // 手臂 (Arms)
  'cable-curl-with-bar': '绳索二头弯举.mp4',
  'cable-curl-with-rope': '绳索二头弯举.mp4',
  'dumbbell-curl': '站姿二头弯举.mp4',
  'dumbbell-hammer-curl': '二头弯举.mp4',
  'triceps-pushdown-with-rope': '绳索三头下压.mp4',
  'overhead-tricep-extension-lower-position': '绳索臂屈伸.mp4',
  'assisted-dip': '双杠臂屈伸.mp4',
  'seated-dip-machine': '徒手臂屈伸.mp4',

  // 核心 (Core)
  'cable-crunch': '绳索卷腹.mp4',
  'decline-bench-crunch': '仰卧卷腹.mp4',
  'plank': '平板支撑.mp4',
  'dead-bug': '腹肌版训练.mp4'
};

const manifest = {};
let copiedCount = 0;
let posterCount = 0;

for (const [gymId, sourceFile] of Object.entries(MAPPING)) {
  const srcPath = path.join(SOURCE_DIR, sourceFile);
  if (!fs.existsSync(srcPath)) {
    console.warn(`[跳过] 源文件不存在: ${sourceFile}`);
    continue;
  }

  const targetVideo = path.join(TARGET_DIR, `${gymId}.mp4`);
  const targetCover = path.join(TARGET_DIR, `${gymId}.jpg`);

  // 1. 拷贝视频文件（若尚未存在或尺寸不一致）
  let needsCopy = true;
  if (fs.existsSync(targetVideo)) {
    const srcStat = fs.statSync(srcPath);
    const tgtStat = fs.statSync(targetVideo);
    if (srcStat.size === tgtStat.size) needsCopy = false;
  }

  if (needsCopy) {
    fs.copyFileSync(srcPath, targetVideo);
    console.log(`[拷贝] ${gymId}.mp4 <- ${sourceFile}`);
    copiedCount++;
  }

  // 2. 提取代表帧作为 3D 封面图（第 3 秒或第 5 秒）
  if (!fs.existsSync(targetCover)) {
    try {
      execSync(`ffmpeg -ss 00:00:03 -i "${targetVideo}" -frames:v 1 -update 1 -q:v 2 "${targetCover}" -y`, { stdio: 'ignore' });
      posterCount++;
      console.log(`[封面] 提取 ${gymId}.jpg 成功`);
    } catch (err) {
      console.error(`[封面] 提取失败: ${gymId}`, err.message);
    }
  }

  manifest[gymId] = {
    gymId,
    source: sourceFile,
    video: `assets/3d/${gymId}.mp4`,
    cover: `assets/3d/${gymId}.jpg`
  };
}

const manifestFile = path.join(TARGET_DIR, 'manifest.json');
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2), 'utf8');

console.log(`\n3D 素材同步完成:`);
console.log(`- 动作覆盖数: ${Object.keys(manifest).length} 个`);
console.log(`- 新拷贝视频: ${copiedCount} 部`);
console.log(`- 新提取封面: ${posterCount} 张`);
console.log(`- Manifest 路径: ${manifestFile}`);
