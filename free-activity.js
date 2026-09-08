// Free sessions have their own storage; strength-plan completion stays independent.
(function () {
  'use strict';
  const KEY = 'fitguide.activities.v1', S = window.GYM_STATS;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const form = document.getElementById('activity-form');
  const field = name => form.elements.namedItem(name);
  const status = document.getElementById('activity-status');
  let records = [], editing = null, broken = false;
  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (!Array.isArray(raw)) throw new Error('Invalid records');
      records = S.cleanActivities(raw); broken = false;
    } catch { records = []; broken = true; status.textContent = '无法读取自由运动记录，请检查浏览器存储后刷新；原数据未覆盖。'; }
  }
  function save(next) {
    if (broken) { status.textContent = '记录尚未成功读取，请刷新后重试。'; return false; }
    try { localStorage.setItem(KEY, JSON.stringify(next)); records = next; return true; }
    catch { status.textContent = '保存失败，请允许浏览器本地存储后重试。填写内容已保留。'; return false; }
  }
  function description(r) {
    return [r.name, r.minutes && `${r.minutes} 分钟`, r.distance && `${r.distance} 公里`, r.sets && `${r.sets} 组`, r.reps && `${r.reps} 次`, r.note].filter(Boolean).join(' · ');
  }
  function markPreset() {
    document.querySelectorAll('[data-activity]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.activity === field('name').value && !!field('name').value)));
  }
  field('name').addEventListener('input', markPreset);
  function reset() {
    form.reset(); document.getElementById('activity-optional').open = false; editing = null; field('date').value = S.key(new Date());
    document.getElementById('activity-submit').textContent = '完成并打卡';
    document.getElementById('activity-cancel').hidden = true; markPreset();
  }
  function render() {
    const today = S.key(new Date()); field('date').max = today;
    document.getElementById('activity-today').textContent = `今日已记录 ${records.filter(r => r.date === today).length} 次自由运动`;
    document.getElementById('activity-records').innerHTML = records.length ? [...records].sort((a,b) => b.date.localeCompare(a.date)).map(r =>
      `<li><div><small>${esc(r.date)} · 自由运动</small><p>${esc(description(r))}</p></div><div class="activity-record-actions"><button type="button" data-edit="${esc(r.id)}">编辑</button><button type="button" data-delete="${esc(r.id)}" aria-label="删除 ${esc(r.name)} ${esc(r.date)}">删除</button></div></li>`).join('') : '<li>还没有自由运动记录。从今天的一小段运动开始。</li>';
  }
  function changed() { render(); window.dispatchEvent(new Event('activitieschange')); }
  document.querySelectorAll('[data-activity]').forEach(button => button.addEventListener('click', () => {
    field('name').value = button.dataset.activity; markPreset(); field('name').focus();
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const date = field('date').value, name = field('name').value.trim();
    if (!name || !S.parse(date) || date > S.key(new Date())) { status.textContent = '请填写运动名称和不晚于今天的有效日期。'; return; }
    const r = {id: editing || (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`), date, name};
    for (const key of ['minutes','distance','sets','reps','note']) r[key] = field(key).value.trim();
    if (!S.cleanActivities([r]).length) { status.textContent = '请检查记录内容与数字范围。'; return; }
    const next = editing ? records.map(old => old.id === editing ? r : old) : [...records, r];
    if (!save(next)) return;
    if (!editing) window.GYM_GIFT.checkin(date);
    reset(); changed(); status.textContent = '自由运动已保存到此浏览器，已计入打卡日历。';
  });
  document.getElementById('activity-cancel').addEventListener('click', reset);
  document.getElementById('activity-records').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    const id = button.dataset.edit || button.dataset.delete, record = records.find(r => r.id === id); if (!record) return;
    if (button.dataset.edit) {
      editing = id; document.getElementById('activity-optional').open = true;
      for (const key of ['name','date','minutes','distance','sets','reps','note']) field(key).value = record[key] || '';
      document.getElementById('activity-submit').textContent = '保存修改';
      document.getElementById('activity-cancel').hidden = false;
      location.hash = 'free-activity'; field('name').focus();
    } else if (save(records.filter(r => r.id !== id))) {
      if (editing === id) reset(); changed(); status.textContent = '该条自由运动记录已删除。';
    }
  });
  window.addEventListener('storage', event => { if (event.key === KEY || event.key === null) { load(); reset(); changed(); } });
  let day = S.key(new Date());
  function refreshDay() { const now = S.key(new Date()); if (now !== day) { if (!editing && field('date').value === day) field('date').value = now; day = now; changed(); } }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshDay(); });
  setInterval(refreshDay, 30000);
  window.GYM_ACTIVITIES = { list: () => records, description };
  load(); reset(); render();
})();
