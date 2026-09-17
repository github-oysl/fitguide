// 验证训练记录的对外行为：失败原子性、旧记录兼容、日期去重和跨标签同步。
const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const S = require('../checkin-stats.js');
const source = fs.readFileSync(path.join(__dirname, '../training-records.js'), 'utf8');
function setup(seed = {}) {
  const data = new Map(Object.entries(seed)), listeners = new Map(), changes = [];
  let fail = false;
  const window = {GYM_STATS: S, GYM_DATA: [{id:'press'}], addEventListener(name, fn) { listeners.set(name, fn); }, dispatchEvent(event) { changes.push(event.detail); }};
  const context = {window, localStorage: {getItem: key => data.get(key) ?? null, setItem(key, value) { if (fail) throw new Error('quota'); data.set(key, value); }}, CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } }};
  vm.runInNewContext(source, context);
  return {store: window.GYM_RECORDS, data, changes, fail(value) { fail = value; }, sync(key) { listeners.get('storage')({key}); }};
}
const key = 'fitguide.checkin.v2';
const seed = {[key]:JSON.stringify({plan:'ppl',day:'push',done:{ppl:{push:{press:['2026-09-07','2026-09-08']}}}})};
test('重置失败不改变快照、磁盘或通知；成功只清除当天', () => {
  const x = setup(seed); const original = JSON.stringify(x.store.planState());
  x.fail(true);
  assert.equal(x.store.resetDay('ppl','push','2026-09-08'), false);
  assert.equal(JSON.stringify(x.store.planState()), original);
  assert.equal(x.data.get(key), seed[key]); assert.equal(x.changes.length, 0);
  x.fail(false); assert.equal(x.store.resetDay('ppl','push','2026-09-08'), true);
  assert.equal(JSON.stringify(x.store.planState().done.ppl.push.press), '["2026-09-07"]');
  assert.equal(x.changes.length, 1);
});
test('选计划和打卡都先持久化，读取快照不能改写内部状态', () => {
  const x = setup(seed); x.fail(true);
  assert.equal(x.store.selectPlan('beginner','a'), false);
  assert.equal(x.store.toggle('ppl','push','press','2026-09-08'), false);
  const copy = x.store.planState(); copy.done.ppl.push.press.length = 0;
  assert.equal(x.store.planState().done.ppl.push.press.length, 2);
});
test('自由记录与计划按日期汇总，修改和删除即时反映', () => {
  const x = setup(seed);
  assert.equal(x.store.saveActivity({id:'a',name:'散步',date:'2026-09-08',minutes:20}), true);
  let view = x.store.snapshot(new Date('2026-09-08T12:00:00'));
  assert.equal(view.dates.get('2026-09-08').size, 2);
  assert.equal(x.store.saveActivity({id:'a',name:'散步',date:'2026-09-07'}), true);
  assert.equal(x.store.activities().length, 1);
  x.fail(true); assert.equal(x.store.removeActivity('a'), false);
  assert.equal(x.store.activities().length, 1);
  x.fail(false); assert.equal(x.store.removeActivity('a'), true);
  assert.equal(x.store.snapshot(new Date('2026-09-08T12:00:00')).dates.get('2026-09-08').size, 1);
});
test('损坏数据不会被覆盖，外部修复后恢复提交', () => {
  const x = setup({[key]:'{invalid'});
  assert.equal(x.store.readable('plans'), false);
  assert.equal(x.store.toggle('ppl','push','press','2026-09-08'), false);
  assert.equal(x.data.get(key), '{invalid');
  x.data.set(key, seed[key]); x.sync(key);
  assert.equal(x.store.readable('plans'), true);
  assert.equal(x.store.planState().done.ppl.push.press.length, 2);
  assert.equal(x.changes[0].external, true);
});
