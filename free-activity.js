// 自由运动表单：负责输入和编辑，存储与统计变化统一交给训练记录模块。
(function () {
  'use strict';
  const S = window.GYM_STATS, store = window.GYM_RECORDS;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const form = document.getElementById('activity-form');
  const dialog = document.getElementById('activity-dialog');
  const field = name => form.elements.namedItem(name);
  const status = document.getElementById('activity-status');
  let records = [], editing = null, broken = false;
  // 打开底部弹层；编辑流传入 false 保留已填内容，只开合不重置。
  function openDialog(resetForm = true) {
    if (resetForm) reset();
    if (!dialog.open) dialog.showModal();
  }
  function load() {
    records = store.activities(); broken = !store.readable('activities');
    if (broken) status.textContent = '无法读取自由运动记录，请检查浏览器存储后刷新；原数据未覆盖。';
  }
  function save(record, remove = false) {
    if (broken) { status.textContent = '记录尚未成功读取，请刷新后重试。'; return false; }
    const saved = remove ? store.removeActivity(record.id) : store.saveActivity(record);
    if (!saved) { status.textContent = '保存失败，请允许浏览器本地存储后重试。填写内容已保留。'; return false; }
    records = store.activities(); return true;
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
  function changed() { render(); }
  document.querySelectorAll('[data-activity]').forEach(button => button.addEventListener('click', () => {
    field('name').value = button.dataset.activity; markPreset(); field('name').focus();
  }));
  document.getElementById('open-activity-dialog').addEventListener('click', () => openDialog());
  document.getElementById('close-activity-dialog').addEventListener('click', () => dialog.close());
  // 记录页「补记一次运动」等入口统一走代理打开弹层。
  document.addEventListener('click', event => {
    if (event.target.closest('[data-open-activity]')) openDialog();
  });
  // 弹层收起时若停留在编辑态，恢复为新建，避免下次打开残留旧记录。
  dialog.addEventListener('close', () => { if (editing) reset(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const date = field('date').value, name = field('name').value.trim();
    if (!name || !S.parse(date) || date > S.key(new Date())) { status.textContent = '请填写运动名称和不晚于今天的有效日期。'; return; }
    const r = {id: editing || (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`), date, name};
    for (const key of ['minutes','distance','sets','reps','note']) r[key] = field(key).value.trim();
    if (!S.cleanActivities([r]).length) { status.textContent = '请检查记录内容与数字范围。'; return; }
    if (!save(r)) return;
    if (!editing) window.GYM_GIFT?.checkin(date);
    reset(); changed(); status.textContent = '自由运动已保存到此浏览器，已计入打卡日历。';
  });
  document.getElementById('activity-cancel').addEventListener('click', reset);
  document.getElementById('view-stats').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    const id = button.dataset.edit || button.dataset.delete, record = records.find(r => r.id === id); if (!record) return;
    if (button.dataset.edit) {
      editing = id; document.getElementById('activity-optional').open = true;
      for (const key of ['name','date','minutes','distance','sets','reps','note']) field(key).value = record[key] || '';
      document.getElementById('activity-submit').textContent = '保存修改';
      document.getElementById('activity-cancel').hidden = false;
      openDialog(false); field('name').focus();
    } else if (save(record, true)) {
      if (editing === id) reset(); changed(); status.textContent = '该条自由运动记录已删除。';
    }
  });
  window.addEventListener('recordschange', event => { if (event.detail.kind === 'activities' && event.detail.external) { load(); reset(); changed(); } });
  let day = S.key(new Date());
  function refreshDay() { const now = S.key(new Date()); if (now !== day) { if (!editing && field('date').value === day) field('date').value = now; day = now; changed(); } }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshDay(); });
  setInterval(refreshDay, 30000);
  window.GYM_ACTIVITIES = { list: () => records, description };
  load(); reset(); render();
})();
