// 校验 3D 动作素材完整性、数据挂载与筛选联动
// 运行：node tools/verify-3d-feature.cjs
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');

// 1. 验证 manifest 与磁盘文件
const manifestPath = path.join(ROOT, 'assets', '3d', 'manifest.json');
assert.ok(fs.existsSync(manifestPath), 'assets/3d/manifest.json 必须存在');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const manifestKeys = Object.keys(manifest);
assert.equal(manifestKeys.length, 55, 'manifest 应映射 55 个动作');

for (const [id, meta] of Object.entries(manifest)) {
  const mp4Path = path.join(ROOT, meta.video);
  const jpgPath = path.join(ROOT, meta.cover);
  assert.ok(fs.existsSync(mp4Path), `3D 视频文件必须存在: ${meta.video}`);
  assert.ok(fs.statSync(mp4Path).size > 100000, `3D 视频文件大小异常: ${meta.video}`);
  assert.ok(fs.existsSync(jpgPath), `3D 封面图文件必须存在: ${meta.cover}`);
  assert.ok(fs.statSync(jpgPath).size > 1000, `3D 封面图大小异常: ${meta.cover}`);
}

// 2. 验证运行期数据注入
const context = {
  window: { GYM_DATA: [] },
  console
};
vm.createContext(context);
for (const file of ['data.js', 'extra-data.js', 'training.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context);
}

const exercises = context.window.GYM_DATA;
assert.equal(exercises.length, 60, '动作库应包含 60 个动作');

const exercisesWith3D = exercises.filter(ex => ex.has3D);
assert.equal(exercisesWith3D.length, 55, '应有 55 个动作标记了 has3D');

for (const ex of exercisesWith3D) {
  assert.ok(ex.video3D && ex.video3D.startsWith('assets/3d/'), `${ex.id} 的 video3D 路径应在 assets/3d/ 下`);
  assert.ok(ex.cover3D && ex.cover3D.startsWith('assets/3d/'), `${ex.id} 的 cover3D 路径应在 assets/3d/ 下`);
}

const exercisesWithout3D = exercises.filter(ex => !ex.has3D);
assert.equal(exercisesWithout3D.length, 5, '应有 5 个动作为纯实拍/无 3D');

// 3. 验证筛选器 training.js 支持 only3D
const training = context.window.GYM_TRAINING;
const allFiltered = training.filterExercises(exercises, { category: 'all', muscle: 'all', equipment: 'all', query: '', only3D: false });
assert.equal(allFiltered.length, 60, '关闭 3D 筛选时应返回全量 60 个动作');

const only3DFiltered = training.filterExercises(exercises, { category: 'all', muscle: 'all', equipment: 'all', query: '', only3D: true });
assert.equal(only3DFiltered.length, 55, '开启 3D 筛选时应返回 55 个 3D 动作');

// 验证分类组合筛选
const back3DFiltered = training.filterExercises(exercises, { category: 'back', muscle: 'all', equipment: 'all', query: '', only3D: true });
assert.ok(back3DFiltered.length > 0 && back3DFiltered.every(ex => ex.has3D), '部位与 3D 组合筛选正常');

// 4. 验证 HTML 与 CSS 中的类名完整性
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('id="filter-3d"'), 'index.html 应包含 #filter-3d 复选框');
assert.ok(indexHtml.includes('class="tag-3d-filter"'), 'index.html 应包含 .tag-3d-filter');
assert.ok(indexHtml.includes('class="filter-checkboxes"'), 'index.html 应包含 .filter-checkboxes 容器');

const styleCss = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
assert.ok(styleCss.includes('.tag-3d-filter'), 'style.css 应包含 .tag-3d-filter 样式');
assert.ok(styleCss.includes('.card-3d-badge'), 'style.css 应包含 .card-3d-badge 样式');
assert.ok(styleCss.includes('.media-badge-3d'), 'style.css 应包含 .media-badge-3d 样式');
assert.ok(styleCss.includes('.video-mode-switcher'), 'style.css 应包含 .video-mode-switcher 样式');
assert.ok(styleCss.includes('.mode-btn'), 'style.css 应包含 .mode-btn 样式');

console.log('  ✓ 3D 素材文件完整性与尺寸核验通过 (55 个 MP4 + 55 个 JPG)');
console.log('  ✓ 运行期数据注入核验通过 (55 个动作已挂载 has3D, video3D, cover3D)');
console.log('  ✓ 筛选器 training.js 对 only3D 状态支持与部位交叉筛选通过');
console.log('  ✓ index.html 元素与 style.css 关键样式类核验通过');
console.log('\n3D 动作教学功能全流程校验：全部通过！');
