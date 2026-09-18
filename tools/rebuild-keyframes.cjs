// 按当前 assets/{id}.mp4 时长重生标准示范关键帧。
// 关键帧时刻超出新视频时长时必须跑这个；不依赖 Playwright。
// 用法：node tools/rebuild-keyframes.cjs
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PHASES = ['下放起点', '顶峰收缩', '回放终点'];
const RATIOS = [0.22, 0.5, 0.78];
const OUT_JSON = path.join(ROOT, 'comparison', 'reference-keyframes.json');
const KEY_DIR = path.join(ROOT, 'assets', 'keyframes');

function durationOf(file) {
  const text = execFileSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file],
    { encoding: 'utf8' }
  ).trim();
  const duration = Number(text);
  if (!Number.isFinite(duration) || duration <= 0) throw new Error(`无法读取时长: ${file}`);
  return duration;
}

function extractFrame(src, time, dest) {
  execFileSync(
    'ffmpeg',
    ['-y', '-ss', time.toFixed(3), '-i', src, '-frames:v', '1', '-q:v', '3', dest],
    { stdio: 'ignore' }
  );
}

const previous = fs.existsSync(OUT_JSON)
  ? JSON.parse(fs.readFileSync(OUT_JSON, 'utf8'))
  : {};
fs.mkdirSync(KEY_DIR, { recursive: true });

const videos = fs.readdirSync(path.join(ROOT, 'assets'))
  .filter((name) => name.endsWith('.mp4'))
  .map((name) => name.slice(0, -4));

let rebuilt = 0;
let kept = 0;
const manifest = {};

for (const id of videos.sort()) {
  const src = path.join(ROOT, 'assets', `${id}.mp4`);
  const duration = durationOf(src);
  const old = previous[id];
  const oldTimes = (old?.frames || []).map((frame) => frame.time);
  const stale = !oldTimes.length || oldTimes.some((time) => time > duration + 0.05);
  const times = stale
    ? RATIOS.map((ratio) => Math.round(Math.min(duration - 0.05, Math.max(0.05, duration * ratio)) * 10) / 10)
    : oldTimes;
  const frames = times.map((time, index) => {
    const file = `assets/keyframes/${id}-${index + 1}.jpg`;
    if (stale) extractFrame(src, time, path.join(ROOT, file));
    return { time, phase: PHASES[index] || null, src: file };
  });
  manifest[id] = { frames };
  if (stale) {
    rebuilt += 1;
    console.log(`${id} 重生 ${times.join(' / ')}s  (视频 ${duration.toFixed(2)}s)`);
  } else {
    kept += 1;
  }
}

fs.writeFileSync(OUT_JSON, JSON.stringify(manifest, null, 2) + '\n');
console.log(`完成：重生 ${rebuilt}，保留 ${kept}，合计 ${Object.keys(manifest).length} → comparison/reference-keyframes.json`);
