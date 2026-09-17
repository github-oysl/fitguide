// 校验 gym-settings.js 的具体器械实体、图片资源路径、动作映射及筛选联动。
// 运行：node tools/verify-gym-settings.cjs
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');

// 模拟浏览器环境与 localStorage
const storage = new Map();
const fakeLocalStorage = {
  getItem: k => storage.get(k) || null,
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: k => storage.delete(k),
  clear: () => storage.clear()
};

const fakeDocument = {
  getElementById: () => null,
  querySelectorAll: () => []
};

const fakeWindow = {
  localStorage: fakeLocalStorage,
  document: fakeDocument,
  addEventListener: () => {},
  GYM_DATA: []
};

const context = {
  window: fakeWindow,
  localStorage: fakeLocalStorage,
  document: fakeDocument,
  console
};

vm.createContext(context);

// 加载动作数据
for (const file of ['data.js', 'extra-data.js', 'activity-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context);
}

const exercises = context.window.GYM_DATA;
assert.equal(exercises.length, 60, 'GYM_DATA 应包含 60 个动作');

// 加载 gym-settings.js
vm.runInContext(fs.readFileSync(path.join(ROOT, 'gym-settings.js'), 'utf8'), context);
const gs = context.window.GYM_SETTINGS;
assert.ok(gs, 'GYM_SETTINGS 应成功挂载到 window');

// 加载 training.js
vm.runInContext(fs.readFileSync(path.join(ROOT, 'training.js'), 'utf8'), context);
const training = context.window.GYM_TRAINING;
assert.ok(training, 'GYM_TRAINING 应成功挂载到 window');

const checks = [];
const check = (name, fn) => checks.push([name, fn]);

check('具体器械实体清单完整，包含编号、规范名称与图片', () => {
  const list = gs.EQUIPMENT_LIST;
  assert.ok(Array.isArray(list) && list.length >= 14, '器械清单数量应不少于 14 台');
  for (const eq of list) {
    assert.ok(eq.id, '每个器械应有 id');
    assert.ok(eq.name, '每个器械应有中文名称');
    assert.ok(eq.image, '每个器械应有图片路径');
    assert.ok(eq.image.startsWith('assets/'), '器械图片应位于 assets/ 前缀路径');
  }
});

check('动作库 60 个动作均能映射到具体的器械实体', () => {
  for (const ex of exercises) {
    const equip = gs.getEquipmentForExercise(ex.id);
    assert.ok(equip, `动作 ${ex.id} (${ex.name}) 必须能找到关联的具体器械`);
    assert.ok(equip.name, `关联的器械必须有规范中文名: ${ex.id}`);
    assert.ok(equip.image, `关联的器械必须有对应图片: ${ex.id}`);
  }
});

check('默认初始配置基于拍照图片识别，并自带工位备注', () => {
  const cfg = gs.getConfig();
  assert.ok(cfg.name.includes('实拍'), '默认健身房名称应包含实拍标识');
  assert.ok(gs.getNote('lat-pulldown-with-pronated-grip').includes('实拍工位 E02'), '高位下拉应带实拍工位E02备注');
  assert.ok(gs.getNote('cable-row-seated-narrow-grip').includes('实拍工位 E01'), '低位划船应带实拍工位E01备注');
  assert.equal(cfg.equipment['lateral_raise_machine'], false, '照片未见固定侧平举机，默认应设为未配备');
  assert.equal(cfg.equipment['leg_press_machine'], true, '照片已识别腿举机，默认应配备');
  assert.equal(cfg.equipment['lat_pulldown'], true, '照片已识别高位下拉，默认应配备');
});

check('基于实拍识别默认配置下，动作库精确反映实拍场地可练状态', () => {
  const lateral = exercises.find(x => x.id === 'lateral-raise-machine');
  const latPulldown = exercises.find(x => x.id === 'lat-pulldown-with-pronated-grip');
  assert.equal(gs.canDo(lateral), false, '照片未识别侧平举机，故其动作默认不可练');
  assert.equal(gs.canDo(latPulldown), true, '照片已识别高位下拉，其动作默认可练');
  const doableCount = exercises.filter(x => gs.canDo(x)).length;
  assert.equal(doableCount, 59, '动作库 60 个动作中有 59 个在实拍健身房可练');
});

check('关闭某具体器械时，仅关联该器械的动作被过滤', () => {
  const cfg = gs.getConfig();
  // 临时关闭腿举机
  cfg.equipment['leg_press_machine'] = false;

  const legPress = exercises.find(x => x.id === 'leg-press');
  const calfRaise = exercises.find(x => x.id === 'calf-raise-in-leg-press');
  const latPulldown = exercises.find(x => x.id === 'lat-pulldown-with-pronated-grip');

  assert.equal(gs.canDo(legPress), false, '关闭腿举机后 leg-press 应不可练');
  assert.equal(gs.canDo(calfRaise), false, '关闭腿举机后 calf-raise-in-leg-press 应不可练');
  assert.equal(gs.canDo(latPulldown), true, '高位下拉不受腿举机影响，依然可练');

  // 恢复
  cfg.equipment['leg_press_machine'] = true;
  assert.equal(gs.canDo(legPress), true, '重新开启腿举机后 leg-press 恢复可练');
});

check('个性化备注 getNote / setNote 正常读写与清空', () => {
  // 验证已有实拍备注读取
  assert.ok(gs.getNote('machine-chest-press').includes('实拍工位 E21'));
  // 修改备注
  gs.setNote('machine-chest-press', '座椅 4 档，靠背前推');
  assert.equal(gs.getNote('machine-chest-press'), '座椅 4 档，靠背前推');
  // 清空备注
  gs.setNote('machine-chest-press', '  ');
  assert.equal(gs.getNote('machine-chest-press'), '');
});

check('向下兼容：旧格式 localStorage 数据能够平滑升级到具体器械', () => {
  // 模拟旧版的 5 类存储
  const oldStorage = {
    name: '天元健身测试',
    equipment: { machine: false, cable: true, pulldown: true, row: true, cardio: true },
    notes: { 'leg-press': '座椅 3 档' }
  };
  storage.set('fitguide.gym.v1', JSON.stringify(oldStorage));

  // 重新在隔离上下文中加载 gym-settings.js
  const isolatedCtx = {
    window: { localStorage: fakeLocalStorage, document: fakeDocument, addEventListener: () => {}, GYM_DATA: exercises },
    localStorage: fakeLocalStorage,
    document: fakeDocument,
    console
  };
  vm.createContext(isolatedCtx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'gym-settings.js'), 'utf8'), isolatedCtx);
  const upgradedGs = isolatedCtx.window.GYM_SETTINGS;

  assert.equal(upgradedGs.getName(), '天元健身测试');
  assert.equal(upgradedGs.getNote('leg-press'), '座椅 3 档');

  // 原先 machine: false，升级后固定器械类（如推胸机、腿举机）应自动为 false
  const chestPress = exercises.find(x => x.id === 'machine-chest-press');
  const fly = exercises.find(x => x.id === 'cable-chest-fly');
  assert.equal(upgradedGs.canDo(chestPress), false, '旧版 machine: false 应映射到具体固定器械');
  assert.equal(upgradedGs.canDo(fly), true, '旧版 cable: true 应保持龙门架绳索可练');
});

check('动作库各动作 availability 标注已全面升级，不含过期硬编码文字', () => {
  for (const ex of exercises) {
    assert.ok(ex.availability, `动作 ${ex.id} 必须有 availability 标注`);
    assert.ok(!ex.availability.includes('照片②'), `动作 ${ex.id} 不应再残留“照片②可见工位”`);
    assert.ok(!ex.availability.includes('照片①③'), `动作 ${ex.id} 不应再残留“照片①③可见工位”`);
    assert.ok(!ex.availability.includes('需其他固定器械'), `动作 ${ex.id} 不应再标注“需其他固定器械”`);
  }
});

check('动作库筛选器精确支持具体器械 ID 联动筛选', () => {
  // 筛选高位下拉工位 (E02)
  const pulldownRes = training.filterExercises(exercises, { category: 'all', muscle: 'all', equipment: 'lat_pulldown', query: '' });
  assert.equal(pulldownRes.length, 2);
  assert.ok(pulldownRes.some(x => x.id === 'lat-pulldown-with-pronated-grip'));

  // 筛选腿举机 (E09)
  const legPressRes = training.filterExercises(exercises, { category: 'all', muscle: 'all', equipment: 'leg_press_machine', query: '' });
  assert.equal(legPressRes.length, 2);
  assert.ok(legPressRes.some(x => x.id === 'leg-press'));
  assert.ok(legPressRes.some(x => x.id === 'calf-raise-in-leg-press'));

  // 筛选龙门架绳索 (E03)
  const cableRes = training.filterExercises(exercises, { category: 'all', muscle: 'all', equipment: 'cable_crossover', query: '' });
  assert.equal(cableRes.length, 16);

  // 向下兼容：旧版分类查询仍可工作
  const legacyAll = training.filterExercises(exercises, { category: 'all', muscle: 'all', equipment: 'all', query: '' });
  assert.equal(legacyAll.length, 60);
});

let passed = 0, failed = 0;
for (const [name, fn] of checks) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    failed++;
  }
}

console.log(`\n健身房具体器械设置校验：${passed} 通过 / ${failed} 失败`);
process.exit(failed ? 1 : 0);
