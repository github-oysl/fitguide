// 页面筛选、按需媒体播放、动作详情共用同一份动作数据。
(function () {
  'use strict';
  const {categories, muscles, filterExercises} = window.GYM_TRAINING;
  const priority = ['lat-pulldown-with-pronated-grip','cable-row-seated-narrow-grip','barbell-bench-press','barbell-squat','hack-squat','cable-chest-fly','machine-chest-press','leg-press','leg-extension-seated','cable-lateral-raise','triceps-pushdown-with-rope'];
  const items = [...window.GYM_DATA].sort((a,b) => (priority.indexOf(a.id)<0?99:priority.indexOf(a.id))-(priority.indexOf(b.id)<0?99:priority.indexOf(b.id)));
  // 页面文案里的动作数量一律取自动作库本身，不在 HTML 里写死，避免数据增删后文案失真。
  document.querySelectorAll('[data-exercise-count]').forEach(el => { el.textContent = String(items.length); });
  const state = {category:'all', muscle:'all', equipment:'all', query:'', gymOnly:false, only3D:false, limit:8};
  const root = document.getElementById('lessons');
  const muscleSelect = document.getElementById('muscle');
  const gymOnlyCheckbox = document.getElementById('gym-only');
  const filter3dCheckbox = document.getElementById('filter-3d');
  const escape = value => String(value).replace(/[&<>"']/g, char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function refreshMuscles() {
    muscleSelect.innerHTML='<option value="all">全部主要肌肉</option>' + Object.entries(muscles)
      .filter(([,value])=>state.category==='all'||value[1]===state.category)
      .map(([id,value])=>`<option value="${id}">${value[0]}</option>`).join('');
    muscleSelect.value=state.muscle;
  }
  function refreshEquipmentSelect() {
    const equipSelect = document.getElementById('equipment');
    if (!equipSelect || !window.GYM_SETTINGS) return;
    const list = window.GYM_SETTINGS.EQUIPMENT_LIST.filter(eq => (eq.exercises || []).length > 0);
    const current = state.equipment;
    equipSelect.innerHTML = '<option value="all">全部器械</option>' + list.map(eq => {
      const isEquipped = window.GYM_SETTINGS.hasEquipment(eq.id);
      const suffix = isEquipped ? '' : '（未配备）';
      return `<option value="${eq.id}">${escape(eq.name)}${suffix}</option>`;
    }).join('');
    equipSelect.value = current;
  }
  function syncControls() {
    document.querySelectorAll('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===state.category)));
    muscleSelect.value=state.muscle;
    const equipSelect = document.getElementById('equipment');
    if (equipSelect) equipSelect.value=state.equipment;
    document.getElementById('search').value=state.query;
    const count = [state.equipment !== 'all', state.muscle !== 'all', state.gymOnly, state.only3D].filter(Boolean).length;
    document.getElementById('advanced-label').textContent = count ? `更多筛选 · ${count} 项` : '更多筛选';
    document.getElementById('reset').hidden = !count && !state.query && state.category === 'all';
    if (gymOnlyCheckbox) gymOnlyCheckbox.checked = state.gymOnly;
    if (filter3dCheckbox) filter3dCheckbox.checked = state.only3D;
  }
  function cardMarkup(item) {
    const equip = window.GYM_SETTINGS?.getEquipmentForExercise(item.id);
    const available = window.GYM_SETTINGS?.canDo(item) !== false;
    const poster = item.has3D ? (item.cover3D || 'assets/3d/' + item.id + '.jpg') : 'assets/' + item.id + '.jpg';
    const fallback = 'assets/' + item.id + '.jpg';
    const picture = item.externalVideo ? '<span class="external-poster"><b>' + escape(item.name) + '</b><small>示范视频与分步指导</small></span>' : '<img src="' + escape(poster) + '" data-fallback="' + escape(fallback) + '" alt="' + escape(item.name) + '动作演示" width="480" height="480" loading="lazy">';
    return '<article class="exercise-card" data-id="' + item.id + '"><button type="button" class="media card-open" data-detail="' + item.id + '" aria-label="查看' + escape(item.name) + '的分步指导">' + picture + (item.has3D ? '<span class="media-badge-3d">3D 演示</span>' : '') + '<span class="card-open-hint">查看动作 ↗</span></button><div class="card-body"><h3>' + escape(item.name) + '</h3><p class="primary">' + escape(item.primary) + '</p><div class="card-bottom"><span>' + escape(equip?.shortName || item.equipmentLabel || '动作教学') + '</span>' + (available ? '' : '<span class="card-status-tag is-missing">未配备</span>') + '</div></div></article>';
  }
  function render() {
    const results=filterExercises(items,state);
    root.innerHTML=results.slice(0,state.limit).map(cardMarkup).join('');
    document.getElementById('result-count').textContent=`${results.length} 个动作`;
    document.getElementById('empty').hidden=results.length>0;
    const more=document.getElementById('more');more.hidden=state.limit>=results.length;
    more.textContent=`再看 ${Math.min(8,results.length-state.limit)} 个动作`;
    root.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>window.GYM_UI.showDetail(button.dataset.detail,button)));
    root.querySelectorAll("img[data-fallback]").forEach(img => img.addEventListener("error", () => { if (img.dataset.fallback) { const next = img.dataset.fallback; delete img.dataset.fallback; img.src = next; } }, {once: true}));
    syncControls();
  }
  function reset() {
    Object.assign(state,{category:'all',muscle:'all',equipment:'all',query:'',gymOnly:false,only3D:false,limit:8});refreshMuscles();refreshEquipmentSelect();render();
  }
  document.getElementById('categories').innerHTML=Object.entries(categories).map(([id,label])=>`<button type="button" data-category="${id}" aria-pressed="${id==='all'}">${label}</button>`).join('');
  document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{
    state.category=button.dataset.category;state.muscle='all';state.limit=8;refreshMuscles();render();
  }));
  muscleSelect.addEventListener('change',()=>{state.muscle=muscleSelect.value;state.limit=8;render();});
  document.getElementById('equipment').addEventListener('change',event=>{state.equipment=event.target.value;state.limit=8;render();});
  document.getElementById('search').addEventListener('input',event=>{state.query=event.target.value;state.limit=8;render();});
  if (gymOnlyCheckbox) gymOnlyCheckbox.addEventListener('change',()=>{state.gymOnly=gymOnlyCheckbox.checked;state.limit=8;render();});
  if (filter3dCheckbox) filter3dCheckbox.addEventListener('change',()=>{state.only3D=filter3dCheckbox.checked;state.limit=8;render();});
  document.getElementById('reset').addEventListener('click',reset);
  document.getElementById('empty-reset').addEventListener('click',reset);
  document.getElementById('more').addEventListener('click',()=>{state.limit+=8;render();});
  refreshMuscles();refreshEquipmentSelect();render();
  window.addEventListener('gym-settings-changed', () => {
    refreshEquipmentSelect();
    render();
  });
  window.addEventListener('hashchange', () => {
    if (location.hash === '#library') {
      refreshEquipmentSelect();
      render();
    }
  });
})();
