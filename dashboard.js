(function () {
  'use strict';
  const stats = window.GYM_STATS;
  const byId = new Map(window.GYM_DATA.map(item => [item.id, item]));
  const weekdays = ['一', '二', '三', '四', '五', '六', '日'];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let done = {}, period = 'week', cursor = new Date(), selected = null;
  function setMode(mode) {
    for (const id of ['plans', 'free-activity']) document.getElementById(id).hidden = id !== mode;
    document.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
  }
  document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
    setMode(button.dataset.mode); history.replaceState(null, '', `#${button.dataset.mode}`);
  }));
  function navigate() {
    const hash = location.hash.slice(1);
    const view = ['stats', 'library'].includes(hash) ? hash : 'today';
    document.querySelectorAll('.view').forEach(el => { el.hidden = el.id !== `view-${view}`; });
    document.querySelectorAll('[data-view]').forEach(link => {
      if (link.dataset.view === view) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('video').forEach(video => video.pause());
    if (['plans', 'free-activity'].includes(hash)) { setMode(hash); const target = document.querySelector('.training-mode'); window.scrollTo({top:window.scrollY + target.getBoundingClientRect().top - 20, behavior:'instant'}); }
    if (!['plans', 'main', 'free-activity'].includes(hash)) window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.addEventListener('hashchange', navigate);
  navigate();

  function renderDay(date, dates, now, className = '') {
    const value = stats.key(date), count = dates.get(value)?.size || 0, future = value > stats.key(now);
    return `<button type="button" class="calendar-day ${className} ${count ? 'has-checkin' : ''} ${value === stats.key(now) ? 'is-today' : ''}" data-date="${value}" ${future ? 'disabled' : ''} aria-pressed="${selected === value}" aria-label="${value}，${future ? '尚未到来' : count ? `已完成 ${count} 项运动` : '无打卡'}"><span>${date.getDate()}</span><i aria-hidden="true">${count ? '✓' : ''}</i></button>`;
  }
  function renderSelection(dates) {
    const root = document.getElementById('selected-day');
    root.hidden = !selected;
    if (!selected) { root.innerHTML = ''; return; }
    const ids = [...(dates.get(selected) || [])];
    root.innerHTML = `<b>${escape(selected)} · ${ids.length ? `完成 ${ids.length} 项运动` : '没有打卡记录'}</b>${ids.length ? `<p>${ids.map(id => escape(byId.get(id)?.name || id)).join('、')}</p>` : '<p>休息也是训练的一部分。</p>'}`;
  }
  function render() {
    const activities = window.GYM_ACTIVITIES.list();
    for (const id of byId.keys()) if (id.startsWith('activity:')) byId.delete(id);
    for (const r of activities) byId.set(`activity:${r.id}`, {name:`自由运动：${window.GYM_ACTIVITIES.description(r)}`});
    const now = new Date(), dates = stats.aggregate(done, now, new Set(window.GYM_DATA.map(r => r.id)), activities);
    const currentKey = stats.key(now);
    document.getElementById('today-date').textContent = now.toLocaleDateString('zh-CN', {year:'numeric', month:'long', day:'numeric', weekday:'long'});
    const week = stats.range('week', now), weekCount = stats.summarize(dates, week).days;
    document.getElementById('week-total').textContent = weekCount;
    document.getElementById('week-strip').innerHTML = weekdays.map((label, index) => {
      const value = stats.key(stats.addDays(week.start, index)), checked = dates.has(value);
      return `<div class="week-day ${checked ? 'checked' : ''} ${value === currentKey ? 'today' : ''}"><span>${label}</span><b aria-label="${value} ${checked ? '已打卡' : '未打卡'}">${checked ? '✓' : stats.parse(value).getDate()}</b></div>`;
    }).join('');
    document.getElementById('week-caption').textContent = weekCount ? `本周已留下 ${weekCount} 天训练记录，按自己的节奏继续。` : '第一次打卡，就是一个好开始。';
    document.getElementById('stats-overview').innerHTML = [['week', '本周'], ['month', '本月'], ['year', '今年']].map(([type, label], index) => {
      const count = stats.summarize(dates, stats.range(type, now));
      return `<button type="button" class="overview-card" data-overview="${type}"><span>${label}打卡<span aria-hidden="true">↗</span></span><strong>${count.days}<small>天</small></strong><span class="overview-caption">${count.exercises} 次运动完成<span class="overview-index" aria-hidden="true">0${index + 1}</span></span></button>`;
    }).join('');
    document.querySelectorAll('[data-overview]').forEach(button => button.addEventListener('click', () => { period = button.dataset.overview; cursor = new Date(); selected = null; render(); }));
    document.querySelectorAll('[data-period]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.period === period)));
    const bounds = stats.range(period, cursor), counts = stats.summarize(dates, bounds);
    const shortDate = date => `${date.getMonth() + 1}月${date.getDate()}日`;
    const title = period === 'year' ? `${cursor.getFullYear()}年` : period === 'month' ? `${cursor.getFullYear()}年 ${cursor.getMonth() + 1}月` : `${bounds.start.getFullYear()}年 ${shortDate(bounds.start)} — ${bounds.end.getFullYear() !== bounds.start.getFullYear() ? `${bounds.end.getFullYear()}年 ` : ''}${shortDate(bounds.end)}`;
    document.getElementById('period-title').textContent = title;
    document.getElementById('period-next').disabled = stats.key(stats.range(period, stats.shift(period, cursor, 1)).start) > currentKey;
    const isCurrent = stats.key(bounds.start) === stats.key(stats.range(period, now).start);
    document.getElementById('period-current').textContent = {week:'回到本周', month:'回到本月', year:'回到今年'}[period];
    document.getElementById('period-current').disabled = isCurrent;
    document.getElementById('period-summary').innerHTML = `<div><b>${counts.days}</b><span>打卡天数</span></div><div><b>${counts.exercises}</b><span>运动完成次数</span></div><div><b>${stats.longestStreak(dates, bounds)}</b><span>周期内最长连续天数</span></div>`;
    const chart = document.getElementById('stats-chart');
    chart.className = `stats-chart ${period}-chart`;
    if (period === 'week') {
      chart.innerHTML = `<div class="calendar-labels">${weekdays.map(label => `<span>周${label}</span>`).join('')}</div><div class="calendar-grid">${weekdays.map((_, index) => renderDay(stats.addDays(bounds.start, index), dates, now)).join('')}</div>`;
    } else if (period === 'month') {
      const offset = (bounds.start.getDay() + 6) % 7;
      chart.innerHTML = `<div class="calendar-labels">${weekdays.map(label => `<span>${label}</span>`).join('')}</div><div class="calendar-grid">${'<span class="calendar-blank" aria-hidden="true"></span>'.repeat(offset)}${Array.from({length:bounds.end.getDate()}, (_, index) => renderDay(stats.addDays(bounds.start, index), dates, now)).join('')}</div>`;
    } else {
      chart.innerHTML = `<div class="year-bars">${Array.from({length:12}, (_, month) => {
        const monthDate = new Date(cursor.getFullYear(), month, 1, 12), monthRange = stats.range('month', monthDate), count = stats.summarize(dates, monthRange).days;
        const future = stats.key(monthDate) > currentKey;
        return `<button type="button" class="month-bar" data-month="${month}" ${future ? 'disabled' : ''} aria-label="${month + 1}月，${count} 天打卡，查看月历"><span class="bar-number">${count}</span><span class="bar-track"><i style="height:${count / monthRange.end.getDate() * 100}%"></i></span><span>${month + 1}月</span></button>`;
      }).join('')}</div>`;
    }
    document.getElementById('chart-caption').textContent = period === 'year' ? '柱高表示当月打卡天数占比 · 点击月份查看月历' : counts.days ? '绿色表示已打卡 · 点击日期查看当天运动' : '这段时间还没有打卡。记录运动后，这里会自动留下记录。';
    chart.querySelectorAll('[data-date]').forEach(button => button.addEventListener('click', () => { selected = button.dataset.date; render(); document.querySelector(`[data-date="${selected}"]`)?.focus({preventScroll:true}); }));
    chart.querySelectorAll('[data-month]').forEach(button => button.addEventListener('click', () => { cursor = new Date(cursor.getFullYear(), Number(button.dataset.month), 1, 12); period = 'month'; selected = null; render(); }));
    renderSelection(dates);
  }
  document.querySelectorAll('[data-period]').forEach(button => button.addEventListener('click', () => { period = button.dataset.period; cursor = new Date(); selected = null; render(); }));
  document.getElementById('period-prev').addEventListener('click', () => { cursor = stats.shift(period, cursor, -1); selected = null; render(); });
  document.getElementById('period-next').addEventListener('click', () => { cursor = stats.shift(period, cursor, 1); selected = null; render(); });
  document.getElementById('period-current').addEventListener('click', () => { cursor = new Date(); selected = null; render(); });
  window.GYM_DASHBOARD = { update(value) { done = value; render(); } };
  window.addEventListener('activitieschange', render);
})();
