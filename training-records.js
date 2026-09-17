// 训练记录模块：保留旧存储格式，集中验证、原子提交、跨标签同步和按日期聚合。
(function () {
  'use strict';
  const S = window.GYM_STATS;
  const keys = {plans: 'fitguide.checkin.v2', activities: 'fitguide.activities.v1'};
  const copy = value => JSON.parse(JSON.stringify(value));
  let plans, activities, broken = {};
  function load(kind) {
    try {
      const raw = JSON.parse(localStorage.getItem(keys[kind]) || 'null');
      if (kind === 'plans') {
        if (raw !== null && (!raw || typeof raw !== 'object' || !raw.plan || !raw.day || !raw.done)) throw new Error('记录格式错误');
        plans = raw ? {plan: raw.plan, day: raw.day, done: S.cleanDone(raw.done)} : {plan: 'ppl', day: 'push', done: {}};
      } else {
        if (raw !== null && !Array.isArray(raw)) throw new Error('记录格式错误');
        activities = S.cleanActivities(raw || []);
      }
      broken[kind] = false;
    } catch {
      broken[kind] = true;
      if (kind === 'plans') plans = {plan: 'ppl', day: 'push', done: {}};
      else activities = [];
    }
  }
  function notify(kind, external = false) {
    window.dispatchEvent(new CustomEvent('recordschange', {detail: {kind, external}}));
  }
  function commit(kind, next) {
    // 写入成功后才公布新快照；失败时所有调用者继续读取旧记录。
    if (broken[kind]) return false;
    next = copy(next);
    try { localStorage.setItem(keys[kind], JSON.stringify(next)); }
    catch { return false; }
    if (kind === 'plans') plans = next; else activities = next;
    notify(kind);
    return true;
  }
  function changePlans(change) {
    const next = copy(plans);
    change(next);
    return commit('plans', next);
  }
  function dayMap(next, plan, day) {
    next.done[plan] ||= {};
    return next.done[plan][day] ||= {};
  }
  function snapshot(now = new Date()) {
    const records = copy(activities);
    const dates = S.aggregate(plans.done, now, new Set(window.GYM_DATA.map(item => item.id)), records);
    return {activities: records, dates};
  }
  window.GYM_RECORDS = {
    planState: () => copy(plans),
    activities: () => copy(activities),
    readable: kind => !broken[kind],
    snapshot,
    selectPlan(plan, day) { return changePlans(next => { next.plan = plan; next.day = day; }); },
    toggle(plan, day, id, date) {
      return changePlans(next => {
        const done = dayMap(next, plan, day), dates = done[id] ||= [];
        const at = dates.indexOf(date);
        if (at < 0) dates.push(date); else dates.splice(at, 1);
      });
    },
    resetDay(plan, day, date) {
      return changePlans(next => {
        const done = dayMap(next, plan, day);
        for (const id of Object.keys(done)) done[id] = done[id].filter(value => value !== date);
      });
    },
    saveActivity(record) {
      const valid = S.cleanActivities([record]);
      if (!valid.length) return false;
      const next = activities.some(item => item.id === record.id)
        ? activities.map(item => item.id === record.id ? valid[0] : item)
        : [...activities, valid[0]];
      return commit('activities', next);
    },
    removeActivity(id) { return commit('activities', activities.filter(item => item.id !== id)); }
  };
  window.addEventListener('storage', event => {
    for (const kind of Object.keys(keys)) {
      if (event.key === keys[kind] || event.key === null) { load(kind); notify(kind, true); }
    }
  });
  load('plans'); load('activities');
})();
