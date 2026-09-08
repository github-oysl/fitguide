const { test } = require('node:test');
const assert = require('node:assert/strict');
const S = require('../checkin-stats.js');

test('week starts Monday and crosses year boundaries', () => {
  const bounds = S.range('week', S.parse('2027-01-01'));
  assert.equal(S.key(bounds.start), '2026-12-28');
  assert.equal(S.key(bounds.end), '2027-01-03');
  assert.equal(S.key(S.range('week', S.parse('2027-01-03')).start), '2026-12-28');
});
test('leap months and month navigation never overflow', () => {
  assert.equal(S.key(S.range('month', S.parse('2024-02-15')).end), '2024-02-29');
  assert.equal(S.key(S.range('month', S.parse('2025-02-15')).end), '2025-02-28');
  assert.equal(S.key(S.shift('month', S.parse('2026-01-31'), 1)), '2026-02-01');
  assert.equal(S.key(S.shift('month', S.parse('2026-12-31'), 1)), '2027-01-01');
});
test('calendar addition remains correct through daylight saving changes', () => {
  assert.equal(S.key(S.addDays(S.parse('2026-03-08'), 1)), '2026-03-09');
  assert.equal(S.key(S.addDays(S.parse('2026-11-01'), 1)), '2026-11-02');
});
test('all plans aggregate by unique exercise and unique local date', () => {
  const done = {ppl:{push:{a:['2026-09-07','2026-09-07','2026-09-08'],b:['2026-09-08']}},single:{chest:{a:['2026-09-08'],b:['2026-08-31']}}};
  const dates = S.aggregate(done, S.parse('2026-09-08'));
  assert.deepEqual(S.summarize(dates, S.range('week', S.parse('2026-09-08'))), {days:2,exercises:3});
  assert.deepEqual(S.summarize(dates, S.range('year', S.parse('2026-09-08'))), {days:3,exercises:4});
  assert.equal(S.longestStreak(dates, S.range('year', S.parse('2026-09-08'))), 2);
  assert.equal(S.aggregate(done, S.parse('2026-09-08'), new Set(['a'])).get('2026-09-08').size, 1);
});
test('invalid data and future checkins do not inflate statistics', () => {
  const dates = S.aggregate({p:{d:{a:['2026-02-30',null,3,'invalid','2026-09-09','2026-09-08'],b:true},bad:null},broken:[]}, S.parse('2026-09-08'));
  assert.equal(dates.size, 1);
  assert.deepEqual([...dates.get('2026-09-08')], ['a']);
  assert.deepEqual(S.cleanDone(null), {});
});
test('empty and withdrawn checkins report zero', () => {
  const dates = S.aggregate({p:{d:{a:[]}}});
  assert.deepEqual(S.summarize(dates, S.range('year', new Date())), {days:0,exercises:0});
  assert.equal(S.longestStreak(dates, S.range('year', new Date())), 0);
});
