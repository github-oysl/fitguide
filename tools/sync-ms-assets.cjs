const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const matchedPath = path.join(ROOT, 'docs', 'muscleandstrength', 'gym_matched.json');
const matched = JSON.parse(fs.readFileSync(matchedPath, 'utf8'));

let copiedVids = 0;
let copiedCovers = 0;

for (const m of matched) {
  const targetVid = path.join(ROOT, 'assets', `${m.gym_id}.mp4`);
  const targetCov = path.join(ROOT, 'assets', `${m.gym_id}.jpg`);

  if (m.local_video) {
    const srcVid = path.join(ROOT, 'docs', 'muscleandstrength', m.local_video);
    if (fs.existsSync(srcVid)) {
      fs.copyFileSync(srcVid, targetVid);
      copiedVids++;
    }
  }

  let coverDone = false;
  if (m.local_cover_image) {
    const srcCov = path.join(ROOT, 'docs', 'muscleandstrength', m.local_cover_image);
    if (fs.existsSync(srcCov)) {
      fs.copyFileSync(srcCov, targetCov);
      coverDone = true;
      copiedCovers++;
    }
  }

  if (!coverDone) {
    if (fs.existsSync(targetVid)) {
      try {
        execSync(`ffmpeg -ss 00:00:01 -i "${targetVid}" -frames:v 1 -update 1 -q:v 2 "${targetCov}" -y`, { stdio: 'ignore' });
        coverDone = true;
        copiedCovers++;
        console.log(`[ffmpeg] 提取封面成功: ${m.gym_id}`);
      } catch (err) {
        console.error(`[ffmpeg] 提取封面失败: ${m.gym_id}`, err.message);
      }
    } else if (m.gym_id === 'stair-climber') {
      const fallbackSrc = path.join(ROOT, 'assets', 'equipment', 'treadmill.jpg');
      if (fs.existsSync(fallbackSrc)) {
        fs.copyFileSync(fallbackSrc, targetCov);
        coverDone = true;
        copiedCovers++;
        console.log('[fallback] 使用跑步机替代封面: stair-climber');
      }
    }
  }
}

console.log(`\n媒体资源同步完成：视频 ${copiedVids} / 60，封面 ${copiedCovers} / 61`);
