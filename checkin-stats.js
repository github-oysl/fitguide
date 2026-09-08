// Shared, local-calendar date math. No UTC conversion or fixed 24-hour arithmetic.
(function (scope) {
  'use strict';
  const pad = value => String(value).padStart(2, '0');
  function key(date) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; }
  function parse(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [y, m, d] = value.split('-').map(Number);
    const date = new Date(y, m - 1, d, 12);
    return key(date) === value ? date : null;
  }
  function addDays(date, amount) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount, 12); }
  function range(period, date) {
    let start, end;
    if (period === 'year') {
      start = new Date(date.getFullYear(), 0, 1, 12);
      end = new Date(date.getFullYear(), 11, 31, 12);
    } else if (period === 'month') {
      start = new Date(date.getFullYear(), date.getMonth(), 1, 12);
      end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 12);
    } else {
      start = addDays(date, -((date.getDay() + 6) % 7));
      end = addDays(start, 6);
    }
    return { start, end };
  }
  function shift(period, date, amount) {
    if (period === 'year') return new Date(date.getFullYear() + amount, 0, 1, 12);
    if (period === 'month') return new Date(date.getFullYear(), date.getMonth() + amount, 1, 12);
    return addDays(date, 7 * amount);
  }
  const isRecord = value => value && typeof value === 'object' && !Array.isArray(value);
  // Preserve the v2 schema; ignore malformed branches and invalid date values.
  function cleanDone(value) {
    const result = {};
    if (!isRecord(value)) return result;
    for (const [plan, days] of Object.entries(value)) {
      if (!isRecord(days) || ['__proto__', 'constructor', 'prototype'].includes(plan)) continue;
      result[plan] = {};
      for (const [day, exercises] of Object.entries(days)) {
        if (!isRecord(exercises) || ['__proto__', 'constructor', 'prototype'].includes(day)) continue;
        result[plan][day] = {};
        for (const [id, dates] of Object.entries(exercises)) {
          if (['__proto__', 'constructor', 'prototype'].includes(id)) continue;
          result[plan][day][id] = Array.isArray(dates) ? [...new Set(dates.filter(value => parse(value)))] : [];
        }
      }
    }
    return result;
  }
  function cleanActivities(value) {
    if (!Array.isArray(value)) return [];
    const seen = new Set();
    return value.filter(r => {
      if (!isRecord(r) || typeof r.id !== 'string' || !r.id || seen.has(r.id) || !parse(r.date) || typeof r.name !== 'string' || !r.name.trim() || r.name.length > 80) return false;
      if (r.note != null && (typeof r.note !== 'string' || r.note.length > 500)) return false;
      for (const [key, max, integer] of [['minutes',1440,false],['distance',1000,false],['sets',10000,true],['reps',100000,true]]) {
        const v = r[key];
        if (v != null && v !== '' && (!['number','string'].includes(typeof v) || !Number.isFinite(Number(v)) || Number(v) <= 0 || Number(v) > max || (integer && !Number.isInteger(Number(v))))) return false;
      }
      seen.add(r.id); return true;
    });
  }
  function aggregate(done, now = new Date(), allowedIds, activities = []) {
    const dates = new Map(), current = key(now);
    for (const days of Object.values(cleanDone(done))) {
      for (const exercises of Object.values(days)) {
        for (const [id, values] of Object.entries(exercises)) {
          if (allowedIds && !allowedIds.has(id)) continue;
          for (const date of values) {
            if (date > current) continue;
            if (!dates.has(date)) dates.set(date, new Set());
            dates.get(date).add(id);
          }
        }
      }
    }
    for (const r of cleanActivities(activities)) {
      if (r.date > current) continue;
      if (!dates.has(r.date)) dates.set(r.date, new Set());
      dates.get(r.date).add(`activity:${r.id}`);
    }
    return dates;
  }
  function summarize(dates, bounds) {
    const start = key(bounds.start), end = key(bounds.end);
    let days = 0, exercises = 0;
    for (const [date, ids] of dates) {
      if (date >= start && date <= end && ids.size) { days++; exercises += ids.size; }
    }
    return { days, exercises };
  }
  function longestStreak(dates, bounds) {
    const keys = [...dates.keys()].filter(date => dates.get(date).size && date >= key(bounds.start) && date <= key(bounds.end)).sort();
    let best = 0, run = 0, previous;
    for (const date of keys) {
      run = previous && key(addDays(parse(previous), 1)) === date ? run + 1 : 1;
      best = Math.max(best, run); previous = date;
    }
    return best;
  }
  const api = { key, parse, addDays, range, shift, cleanDone, cleanActivities, aggregate, summarize, longestStreak };
  scope.GYM_STATS = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
