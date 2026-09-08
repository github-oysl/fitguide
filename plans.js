// 训练计划 + 本机打卡：计划数据与渲染逻辑。
// v2 打卡模型：每个动作存“勾选日期列表”（而非布尔值），
// 因此能判断“本日打卡”进度，也能按日期归档查看历史打卡。
// 数据只保存在浏览器 localStorage，不上传任何服务器（无后端、无云端存储）。
(function () {
  'use strict';
  const STORE_KEY = 'fitguide.checkin.v2';

  const PLANS = [
    {
      id: 'ppl',
      name: '推·拉·腿',
      tag: '推荐 · 每周 3–6 练',
      note: '三分化全身计划：推日（胸·肩·三头）、拉日（背·二头）、腿日（下肢）。练 3 休 1；体能允许后可以一周两轮。',
      days: [
        { id: 'push', label: '推 ①', part: '胸 · 肩 · 三头', tip: '先复合后孤立：坐姿推胸 → 绳索夹胸 → 推肩 → 侧平举 → 三头下压。', items: [
          ['machine-chest-press', '3 组 × 8–12', '90 秒'],
          ['cable-chest-fly', '3 组 × 10–15', '60 秒'],
          ['machine-shoulder-press', '3 组 × 8–12', '90 秒'],
          ['cable-lateral-raise', '3 组 × 12–15', '60 秒'],
          ['triceps-pushdown-with-rope', '3 组 × 10–15', '60 秒']
        ]},
        { id: 'pull', label: '拉 ②', part: '背 · 肩后束 · 二头', tip: '下拉找背阔肌收紧；划船先让肩胛后滑，再让手臂跟随。', items: [
          ['lat-pulldown-with-pronated-grip', '3 组 × 8–12', '90 秒'],
          ['cable-row-seated-narrow-grip', '3 组 × 8–12', '90 秒'],
          ['straight-arm-lat-pulldown', '3 组 × 10–12', '60 秒'],
          ['face-pull', '3 组 × 12–15', '60 秒'],
          ['cable-curl-with-bar', '3 组 × 10–12', '60 秒']
        ]},
        { id: 'legs', label: '腿 ③', part: '大腿 · 臀 · 小腿', tip: '腿举先试安全锁；膝盖不适先检查转轴与坐姿，不硬撑重量。', items: [
          ['leg-press', '3 组 × 10–15', '120 秒'],
          ['leg-extension-seated', '3 组 × 10–15', '90 秒'],
          ['leg-curl-seated', '3 组 × 10–15', '90 秒'],
          ['hip-abduction-machine', '3 组 × 12–15', '60 秒'],
          ['calf-raise-in-leg-press', '3 组 × 12–15', '60 秒']
        ]}
      ]
    },
    {
      id: 'beginner',
      name: '新手全身',
      tag: '每周 2–3 练 · 约 40 分钟',
      note: '全身两分化，适合刚开始的 4–6 周：A 日偏推与核心，B 日偏拉与腿，中间隔 1–2 天恢复。',
      days: [
        { id: 'a', label: '全身 A', part: '胸 · 肩 · 三头 · 核心', tip: '每个动作先做 1 组轻重量熟悉发力，再正式做 2–3 组。', items: [
          ['machine-chest-press', '3 组 × 10–12', '90 秒'],
          ['cable-lateral-raise', '3 组 × 12–15', '60 秒'],
          ['triceps-pushdown-with-rope', '3 组 × 10–15', '60 秒'],
          ['cable-crunch', '3 组 × 12–15', '45 秒'],
          ['pallof-press', '2 组 × 8–12／侧', '45 秒']
        ]},
        { id: 'b', label: '全身 B', part: '背 · 二头 · 臀腿', tip: '下拉和腿举先轻后重；动作变形或疼痛就停，先检查器械设置。', items: [
          ['lat-pulldown-with-pronated-grip', '3 组 × 10–12', '90 秒'],
          ['cable-row-seated-narrow-grip', '3 组 × 10–12', '90 秒'],
          ['cable-curl-with-rope', '3 组 × 10–12', '60 秒'],
          ['leg-press', '3 组 × 10–15', '120 秒'],
          ['leg-curl-seated', '3 组 × 10–15', '90 秒']
        ]}
      ]
    },
    {
      id: 'bro',
      name: '五分化增肌',
      tag: '每周 5 练 · 每天一个部位',
      note: '经典五分化：周一至周五依次练胸、背、肩、手臂＋核心、臀腿；覆盖动作库全部 24 个动作。',
      days: [
        { id: 'chest', label: '周一 · 胸', part: '胸大肌', tip: '先推后夹：推胸机 → 蝴蝶机 → 上斜绳索夹胸。', items: [
          ['machine-chest-press', '4 组 × 8–12', '90 秒'],
          ['machine-chest-fly', '3 组 × 10–15', '60 秒'],
          ['cable-chest-fly', '3 组 × 10–15', '60 秒'],
          ['cable-incline-chest-fly', '3 组 × 10–12', '60 秒']
        ]},
        { id: 'back', label: '周二 · 背', part: '背阔肌 · 中背', tip: '下拉与划船各安排一个，直臂下压收尾。', items: [
          ['lat-pulldown-with-pronated-grip', '4 组 × 8–12', '90 秒'],
          ['cable-row-seated-narrow-grip', '4 组 × 8–12', '90 秒'],
          ['straight-arm-lat-pulldown', '3 组 × 10–12', '60 秒'],
          ['seated-machine-row', '3 组 × 10–12', '90 秒']
        ]},
        { id: 'shoulders', label: '周三 · 肩', part: '前束 · 中束 · 后束', tip: '推肩 → 侧平举 → 后束（面拉、反向飞鸟）都照顾到。', items: [
          ['machine-shoulder-press', '4 组 × 8–12', '90 秒'],
          ['cable-lateral-raise', '3 组 × 12–15', '60 秒'],
          ['lateral-raise-machine', '3 组 × 12–15', '60 秒'],
          ['face-pull', '3 组 × 12–15', '60 秒'],
          ['reverse-cable-fly', '3 组 × 12–15', '60 秒']
        ]},
        { id: 'arms', label: '周四 · 手臂＋核心', part: '二头 · 三头 · 腹', tip: '弯举（直杆＋锤式）→ 下压 → 过顶臂屈伸 → 卷腹收尾。', items: [
          ['cable-curl-with-bar', '3 组 × 10–12', '60 秒'],
          ['cable-curl-with-rope', '3 组 × 10–12', '60 秒'],
          ['triceps-pushdown-with-rope', '3 组 × 10–15', '60 秒'],
          ['overhead-tricep-extension-lower-position', '3 组 × 10–12', '60 秒'],
          ['cable-crunch', '3 组 × 12–15', '45 秒']
        ]},
        { id: 'legs', label: '周五 · 臀腿', part: '大腿 · 臀 · 小腿', tip: '大重量日：腿举 → 腿屈伸 → 腿弯举 → 外展 → 提踵。', items: [
          ['leg-press', '4 组 × 10–15', '120 秒'],
          ['leg-extension-seated', '3 组 × 10–15', '90 秒'],
          ['leg-curl-seated', '3 组 × 10–15', '90 秒'],
          ['hip-abduction-machine', '3 组 × 12–15', '60 秒'],
          ['calf-raise-in-leg-press', '3 组 × 12–15', '60 秒']
        ]}
      ]
    },
    {
      id: 'single',
      name: '单部位专场',
      tag: '按部位 · 想练哪就练哪',
      note: '直接选今天想练的部位开练，适合加练或没有整轮计划时间的日子。',
      days: [
        { id: 'chest', label: '胸', part: '胸大肌', tip: '4 个动作都用上：先推、再夹，重量轻一点没关系。', items: [
          ['machine-chest-press', '3 组 × 10–12', '90 秒'],
          ['cable-chest-fly', '3 组 × 10–15', '60 秒'],
          ['cable-incline-chest-fly', '3 组 × 10–12', '60 秒'],
          ['machine-chest-fly', '3 组 × 10–15', '60 秒']
        ]},
        { id: 'back', label: '背', part: '背阔肌 · 中背', tip: '纵向（下拉）与横向（划船）各两个动作，覆盖全面。', items: [
          ['lat-pulldown-with-pronated-grip', '3 组 × 10–12', '90 秒'],
          ['straight-arm-lat-pulldown', '3 组 × 10–12', '60 秒'],
          ['cable-row-seated-narrow-grip', '3 组 × 10–12', '90 秒'],
          ['seated-machine-row', '3 组 × 10–12', '90 秒']
        ]},
        { id: 'shoulders', label: '肩', part: '前束 · 中束 · 后束', tip: '肩关节灵活，动作幅度以舒适为限，别耸肩。', items: [
          ['machine-shoulder-press', '3 组 × 8–12', '90 秒'],
          ['cable-lateral-raise', '3 组 × 12–15', '60 秒'],
          ['face-pull', '3 组 × 12–15', '60 秒'],
          ['reverse-cable-fly', '3 组 × 12–15', '60 秒']
        ]},
        { id: 'arms', label: '手臂', part: '二头 · 三头', tip: '弯举与下压交替，先做大重量复合动作。', items: [
          ['cable-curl-with-bar', '3 组 × 10–12', '60 秒'],
          ['triceps-pushdown-with-rope', '3 组 × 10–15', '60 秒'],
          ['cable-curl-with-rope', '3 组 × 10–12', '60 秒'],
          ['overhead-tricep-extension-lower-position', '3 组 × 10–12', '60 秒']
        ]},
        { id: 'legs', label: '臀腿', part: '大腿 · 臀 · 小腿', tip: '先腿举建立基础量，再屈伸、弯举、外展、提踵收尾。', items: [
          ['leg-press', '3 组 × 10–15', '120 秒'],
          ['leg-extension-seated', '3 组 × 10–15', '90 秒'],
          ['leg-curl-seated', '3 组 × 10–15', '90 秒'],
          ['hip-abduction-machine', '3 组 × 12–15', '60 秒'],
          ['calf-raise-in-leg-press', '3 组 × 12–15', '60 秒']
        ]},
        { id: 'core', label: '核心', part: '腹直肌 · 腹斜肌', tip: '动作不多，把注意力放在“肋骨向骨盆靠拢”的卷腹发力上。', items: [
          ['cable-crunch', '3 组 × 12–15', '45 秒'],
          ['pallof-press', '3 组 × 8–12／侧', '45 秒']
        ]}
      ]
    }
  ];

  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const byId = new Map((window.GYM_DATA || []).map(item => [item.id, item]));
  const WEEKDAYS = ['周日','周一','周二','周三','周四','周五','周六'];

  // 本地日期（YYYY-MM-DD），“本日”与历史归档都以此为准。
  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function formatDate(date) {
    const [y, m, d] = date.split('-');
    const weekday = WEEKDAYS[new Date(`${date}T00:00:00`).getDay()];
    const year = y === String(new Date().getFullYear()) ? '' : `${y}年`;
    return `${year}${Number(m)}月${Number(d)}日 · ${weekday}`;
  }

  // 打卡状态：{ plan, day, done: { [planId]: { [dayId]: { [exerciseId]: ['YYYY-MM-DD', ...] } } } }
  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw && typeof raw === 'object' && raw.plan && raw.day && raw.done) return raw;
    } catch (error) { /* 损坏数据则回到默认 */ }
    return { plan: PLANS[0].id, day: PLANS[0].days[0].id, done: {} };
  }
  const state = loadState();
  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (error) { /* 隐私模式等情况下静默 */ }
  }
  function currentPlan() { return PLANS.find(plan => plan.id === state.plan) || PLANS[0]; }
  function currentDay() { return currentPlan().days.find(day => day.id === state.day) || currentPlan().days[0]; }
  function doneMap() {
    const plan = currentPlan(), day = currentDay();
    state.done[plan.id] = state.done[plan.id] || {};
    state.done[plan.id][day.id] = state.done[plan.id][day.id] || {};
    return state.done[plan.id][day.id];
  }

  const planTabs = document.getElementById('plan-tabs');
  const dayTabs = document.getElementById('plan-days');
  const planNote = document.getElementById('plan-note');
  const planTip = document.getElementById('plan-tip');
  const planProgress = document.getElementById('plan-progress');
  const planBar = document.getElementById('plan-bar');
  const planItems = document.getElementById('plan-items');

  function renderPlanTabs() {
    planTabs.innerHTML = PLANS.map(plan =>
      `<button type="button" data-plan="${plan.id}" aria-pressed="${plan.id === state.plan}"><b>${escape(plan.name)}</b><small>${escape(plan.tag)}</small></button>`
    ).join('');
    planTabs.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => {
      state.plan = button.dataset.plan;
      const plan = currentPlan();
      state.day = plan.id === 'single' ? 'chest' : plan.days[0].id;
      saveState(); renderAll();
    }));
  }

  function renderDayTabs() {
    dayTabs.innerHTML = currentPlan().days.map(day =>
      `<button type="button" data-day="${day.id}" aria-pressed="${day.id === state.day}">${escape(day.label)}<small>${escape(day.part)}</small></button>`
    ).join('');
    dayTabs.querySelectorAll('[data-day]').forEach(button => button.addEventListener('click', () => {
      state.day = button.dataset.day; saveState(); renderAll();
    }));
  }

  function renderProgress() {
    const day = currentDay(), done = doneMap(), t = today();
    const total = day.items.length;
    // “本日打卡”= 该训练日动作列表中包含今天日期的个数
    const finished = day.items.filter(item => (done[item[0]] || []).includes(t)).length;
    const complete = total > 0 && finished === total ? ' ✅ 今日全部完成' : '';
    planProgress.textContent = `本日打卡 ${finished} / ${total}${complete}`;
    planBar.style.width = total ? `${(finished / total) * 100}%` : '0%';
  }

  function renderItems() {
    const day = currentDay(), done = doneMap(), t = today();
    planItems.innerHTML = day.items.map(([id, sets, rest]) => {
      const item = byId.get(id); if (!item) return '';
      const marked = (done[id] || []).includes(t);
      return `<li class="plan-item${marked ? ' is-done' : ''}">
        <button class="plan-check" type="button" data-check="${id}" aria-pressed="${marked}" aria-label="打卡：${escape(item.name)}">${marked ? '✓' : '○'}</button>
        <div class="plan-item-text"><b>${escape(item.name)}</b><span>${escape(item.primary)} · ${escape(sets)} · 休 ${escape(rest)}</span></div>
        <button class="detail-button plan-detail" type="button" data-detail="${id}">怎么练 ↗</button>
      </li>`;
    }).join('');
    planItems.querySelectorAll('[data-check]').forEach(button => button.addEventListener('click', () => {
      const done = doneMap(), id = button.dataset.check, t = today();
      // 点一下：把今天日期加入该动作的日期列表；再点一下：移除今天（撤销今天这一勾）
      const list = done[id] || (done[id] = []);
      const at = list.indexOf(t);
      if (at >= 0) list.splice(at, 1); else list.push(t);
      saveState(); renderAll();
    }));
    planItems.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => {
      if (window.GYM_UI && typeof window.GYM_UI.showDetail === 'function') {
        window.GYM_UI.showDetail(button.dataset.detail, button);
      }
    }));
  }

  // 历史打卡：把所有动作的日期列表按日期归档，倒序展示。
  function renderHistory() {
    const listEl = document.getElementById('plan-history-list');
    if (!listEl) return;
    const byDate = {};
    for (const [planId, days] of Object.entries(state.done)) {
      const plan = PLANS.find(plan => plan.id === planId);
      if (!plan) continue;
      for (const [dayId, exercises] of Object.entries(days)) {
        const day = plan.days.find(day => day.id === dayId);
        if (!day) continue;
        for (const [exId, dates] of Object.entries(exercises)) {
          const item = byId.get(exId); if (!item) continue;
          const spec = day.items.find(entry => entry[0] === exId);
          for (const date of dates || []) {
            (byDate[date] = byDate[date] || []).push({plan, day, item, spec});
          }
        }
      }
    }
    const dates = Object.keys(byDate).sort().reverse();
    if (!dates.length) {
      listEl.innerHTML = '<p class="hist-empty">还没有打卡记录。练完当天动作并打勾后，这里会按日期自动归档。</p>';
      return;
    }
    listEl.innerHTML = dates.map(date => {
      const entries = byDate[date];
      const blocks = new Map();
      entries.forEach(entry => {
        const key = `${entry.plan.id}::${entry.day.id}`;
        if (!blocks.has(key)) blocks.set(key, []);
        blocks.get(key).push(entry);
      });
      const blocksHtml = [...blocks.entries()].map(([, list]) => {
        const first = list[0];
        const total = first.day.items.length;
        const full = total > 0 && list.length >= total;
        const exercises = list.map(entry => `${escape(entry.item.name)}${entry.spec ? ` · ${escape(entry.spec[1])}` : ''}`).join('，');
        return `<div class="hist-block"><div class="hist-block-head"><b>${escape(first.plan.name)} · ${escape(first.day.label)} ${escape(first.day.part)}</b><span class="hist-note">${full ? '✅ 全部完成' : `已完成 ${list.length} / ${total}`}</span></div><p>${exercises}</p></div>`;
      }).join('');
      return `<div class="hist-date"><b>${escape(formatDate(date))}</b>${blocksHtml}</div>`;
    }).join('');
  }

  function renderAll() {
    const plan = currentPlan(), day = currentDay();
    planNote.textContent = plan.note;
    planTip.innerHTML = `<b>${escape(day.label)} · ${escape(day.part)}</b> ${escape(day.tip)}`;
    renderPlanTabs(); renderDayTabs(); renderProgress(); renderItems(); renderHistory();
  }

  document.getElementById('plan-reset').addEventListener('click', () => {
    // 重置本日：只移除“今天”这一勾，历史记录里往日的数据不受影响
    const done = doneMap(), t = today();
    Object.values(done).forEach(list => {
      const at = (list || []).indexOf(t);
      if (at >= 0) list.splice(at, 1);
    });
    saveState(); renderAll();
  });

  renderAll();
})();