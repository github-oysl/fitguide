// 健身房设置：器械配置、名称与每个动作的个性化备注。
// 数据仅保存在浏览器 localStorage，不上传任何服务器。
(function () {
  'use strict';
  const STORE_KEY = 'fitguide.gym.v1';
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  const EQUIPMENT_TYPES = {
    machine:  { name: '固定器械',      desc: '推胸机、蝴蝶机、推肩、腿举、腿屈伸等' },
    cable:    { name: '绳索 / 龙门架', desc: '可调滑轮、龙门架及各类绳索附件' },
    pulldown: { name: '高位下拉',      desc: '含长杆与大腿压垫的下拉工位' },
    row:      { name: '低位划船',      desc: '含踏板与 V 把手的划船工位' },
    cardio:   { name: '有氧 / 自重',   desc: '跑步机、跳绳、居家自重训练' }
  };

  function defaults() {
    return {
      name: '',
      equipment: { machine: true, cable: true, pulldown: true, row: true, cardio: true },
      notes: {}
    };
  }

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw && typeof raw === 'object') {
        const cfg = defaults();
        if (typeof raw.name === 'string') cfg.name = raw.name;
        if (raw.equipment && typeof raw.equipment === 'object')
          for (const k of Object.keys(cfg.equipment))
            if (typeof raw.equipment[k] === 'boolean') cfg.equipment[k] = raw.equipment[k];
        if (raw.notes && typeof raw.notes === 'object')
          for (const [id, n] of Object.entries(raw.notes))
            if (typeof n === 'string' && n.trim()) cfg.notes[id] = n.trim();
        return cfg;
      }
    } catch { /* 损坏则回到默认 */ }
    return defaults();
  }

  const config = load();

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(config)); return true; }
    catch { return false; }
  }

  // ── 供其他模块使用的公共 API ──────────────────────────────
  window.GYM_SETTINGS = {
    getConfig:  () => config,
    getName:    () => config.name,
    hasEquipment: type => config.equipment[type] !== false,
    canDo:      item => !item?.equipment || config.equipment[item.equipment] !== false,
    getNote:    id => config.notes[id] || '',
    setNote(id, note) {
      const t = (note || '').trim();
      if (t) config.notes[id] = t; else delete config.notes[id];
      save();
    },
    EQUIPMENT_TYPES
  };

  // ── 统计每种器械关联的动作数 ──────────────────────────────
  function countByType() {
    const c = {};
    for (const k of Object.keys(EQUIPMENT_TYPES)) c[k] = 0;
    (window.GYM_DATA || []).forEach(i => { if (c[i.equipment] !== undefined) c[i.equipment]++; });
    return c;
  }

  // ── 渲染设置页面 ─────────────────────────────────────────
  function render() {
    const el = document.getElementById('settings-content');
    if (!el) return;
    const counts = countByType();
    const items = window.GYM_DATA || [];
    const grouped = {};
    items.forEach(i => (grouped[i.equipment] = grouped[i.equipment] || []).push(i));

    el.innerHTML = `
      <section class="settings-block">
        <p class="eyebrow">MY GYM</p>
        <h2>我的健身房</h2>
        <p class="settings-hint">记住你常去的健身房和它的器械配置。</p>
        <label class="settings-field">
          健身房名称
          <input id="gym-name" type="text" value="${escape(config.name)}" placeholder="例如：天元健身" maxlength="60">
        </label>
      </section>

      <section class="settings-block">
        <p class="eyebrow">EQUIPMENT</p>
        <h2>器械配置</h2>
        <p class="settings-hint">标记你的健身房有哪些器械。在动作库中可以勾选「只看我的健身房」快速筛选。</p>
        <div class="equip-grid" role="group" aria-label="器械配置">
          ${Object.entries(EQUIPMENT_TYPES).map(([k, info]) => `
            <label class="equip-card${config.equipment[k] ? ' is-on' : ''}">
              <input type="checkbox" data-equip="${k}" ${config.equipment[k] ? 'checked' : ''}>
              <b>${escape(info.name)}</b>
              <small>${escape(info.desc)}</small>
              <span class="equip-count">${counts[k] || 0} 个动作</span>
            </label>
          `).join('')}
        </div>
      </section>

      <section class="settings-block">
        <p class="eyebrow">NOTES</p>
        <h2>器械备注</h2>
        <p class="settings-hint">记录座椅档位、配重起点等个性化提示，查看动作详情时会显示。</p>
        <div class="notes-list">
          ${Object.entries(EQUIPMENT_TYPES).map(([type, info]) => {
            const exs = grouped[type] || [];
            if (!exs.length) return '';
            const hasNotes = exs.some(i => config.notes[i.id]);
            return `
              <details class="notes-group"${hasNotes ? ' open' : ''}>
                <summary>${escape(info.name)}<small>${exs.length} 个动作${hasNotes ? ' · 有备注' : ''}</small></summary>
                <div class="notes-items">
                  ${exs.map(i => `
                    <div class="note-row">
                      <span>${escape(i.name)}</span>
                      <textarea data-note-for="${i.id}" rows="1" maxlength="200" placeholder="添加备注…">${escape(config.notes[i.id] || '')}</textarea>
                    </div>
                  `).join('')}
                </div>
              </details>`;
          }).join('')}
        </div>
      </section>

      <section class="settings-block">
        <p class="eyebrow">DATA</p>
        <h2>数据管理</h2>
        <div class="settings-actions-row">
          <button type="button" id="gym-reset" class="btn-soft">重置为默认</button>
          <button type="button" id="gym-clear" class="reset">清空全部</button>
        </div>
        <p id="gym-status" class="settings-status" role="status">设置自动保存在此浏览器</p>
      </section>`;

    // ── 绑定事件 ───────────────────────────────────────────
    document.getElementById('gym-name').addEventListener('input', e => {
      config.name = e.target.value.trim(); save(); flash();
    });

    el.querySelectorAll('[data-equip]').forEach(cb => cb.addEventListener('change', () => {
      config.equipment[cb.dataset.equip] = cb.checked;
      cb.closest('.equip-card').classList.toggle('is-on', cb.checked);
      save(); flash();
    }));

    el.querySelectorAll('[data-note-for]').forEach(ta => {
      let timer;
      ta.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const id = ta.dataset.noteFor;
          const n = ta.value.trim();
          if (n) config.notes[id] = n; else delete config.notes[id];
          save(); flash();
        }, 400);
        // 自动增高
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
      });
    });

    document.getElementById('gym-reset')?.addEventListener('click', () => {
      if (!confirm('重置器械配置为默认值？已记录的备注不会被清除。')) return;
      Object.assign(config.equipment, defaults().equipment);
      config.name = '';
      save(); render(); flash('已重置为默认配置');
    });

    document.getElementById('gym-clear')?.addEventListener('click', () => {
      if (!confirm('清空全部健身房数据？包括名称、器械配置和所有备注。')) return;
      Object.assign(config, defaults());
      save(); render(); flash('已清空全部数据');
    });
  }

  function flash(msg) {
    const el = document.getElementById('gym-status');
    if (!el) return;
    el.textContent = msg || '已保存';
    if (!msg) setTimeout(() => { if (el) el.textContent = '设置自动保存在此浏览器'; }, 2000);
  }

  // 初始渲染
  render();

  // 跨标签页同步
  window.addEventListener('storage', e => {
    if (e.key !== STORE_KEY && e.key !== null) return;
    Object.assign(config, load()); render();
  });
})();
