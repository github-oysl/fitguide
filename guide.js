// 页面筛选、按需媒体播放、动作详情共用同一份动作数据。
(function () {
  'use strict';
  const {categories, muscles, filterExercises} = window.GYM_TRAINING;
  const priority = ['lat-pulldown-with-pronated-grip','cable-row-seated-narrow-grip','barbell-bench-press','barbell-squat','hack-squat','cable-chest-fly','machine-chest-press','leg-press','leg-extension-seated','cable-lateral-raise','triceps-pushdown-with-rope'];
  const items = [...window.GYM_DATA].sort((a,b) => (priority.indexOf(a.id)<0?99:priority.indexOf(a.id))-(priority.indexOf(b.id)<0?99:priority.indexOf(b.id)));
  // 页面文案里的动作数量一律取自动作库本身，不在 HTML 里写死，避免数据增删后文案失真。
  document.querySelectorAll('[data-exercise-count]').forEach(el => { el.textContent = String(items.length); });
  const state = {category:'all', muscle:'all', equipment:'all', query:'', gymOnly:false, limit:8};
  const root = document.getElementById('lessons');
  const dialog = document.getElementById('detail');
  const muscleSelect = document.getElementById('muscle');
  const gymOnlyCheckbox = document.getElementById('gym-only');
  let activeVideo = null;
  let lastTrigger = null;
  const escape = value => String(value).replace(/[&<>"']/g, char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function pauseAll() {
    document.querySelectorAll('video').forEach(video=>video.pause());
    activeVideo=null;
  }
  function releaseMedia(container) {
    container.querySelectorAll('video').forEach(video=>{
      video.pause(); video.removeAttribute('src'); video.load();
      if(activeVideo===video) activeVideo=null;
      observer?.unobserve(video);
    });
  }
  const observer = typeof IntersectionObserver==='undefined' ? null : new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(!entry.isIntersecting)entry.target.pause();});
  }, {threshold:0.05});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseAll();});
  window.addEventListener('pagehide',pauseAll);
  function mediaMarkup(item) {
    if (item.externalVideo) return `<div class="media external-media"><div class="external-poster"><span class="external-mark">CARDIO</span><b>${escape(item.name)}</b><small>示范视频／动作图</small></div><a class="play external-play" href="${escape(item.video)}" target="_blank" rel="noopener noreferrer" aria-label="打开${escape(item.name)}示范视频"><span>▶</span> 播放示范</a></div>`;
    return `<div class="media" data-media="${item.id}"><img src="assets/${item.id}.jpg" alt="${escape(item.name)}动作起始姿势" width="480" height="480" loading="lazy" decoding="async"><button class="play" type="button" aria-label="播放${escape(item.name)}本地动作演示"><span>▶</span> 播放动作</button></div>`;
  }
  function bindMedia(container) {
    container.querySelectorAll('[data-media]').forEach(media=>{
      media.querySelector('button').addEventListener('click',async()=>{
        pauseAll();
        const id=media.dataset.media;
        const video=document.createElement('video');
        video.controls=true; video.playsInline=true; video.preload='none'; video.muted=true; video.loop=true;
        video.poster=`assets/${id}.jpg`; video.setAttribute('aria-label','动作演示，可暂停或拖动进度');
        // 用户开始观看后持续循环；首屏仍不下载视频，切换动作时暂停前一个。
        video.src=`assets/${id}.mp4`;
        video.addEventListener('play',()=>{
          if(activeVideo&&activeVideo!==video)activeVideo.pause();
          activeVideo=video;
        });
        video.addEventListener('error',()=>{
          const item=items.find(item=>item.id===id);
          observer?.unobserve(video);
          media.innerHTML=`<div class="media-error"><p>演示暂时无法播放</p><a href="assets/${id}.mp4" download>下载视频后打开</a><a href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">查看原站图解 ↗</a><small>中文步骤仍可正常阅读。</small></div>`;
        });
        media.replaceChildren(video); observer?.observe(video);
        try { await video.play(); } catch (error) {
          // 浏览器限制播放时保留原生控制栏。
          if(error.name!=='AbortError')video.setAttribute('aria-label','请使用视频控制栏播放动作演示');
        }
      });
    });
  }
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
    document.getElementById('advanced-label').textContent=(state.equipment!=='all'||state.query.trim())?'器械与搜索 · 已设置筛选':'器械与搜索';
    if (gymOnlyCheckbox) gymOnlyCheckbox.checked = state.gymOnly;
  }
  function cardMarkup(item) {
    const equip = window.GYM_SETTINGS?.getEquipmentForExercise?.(item.id);
    const isEquipped = window.GYM_SETTINGS ? window.GYM_SETTINGS.canDo(item) : true;
    const equipTag = equip ? (equip.code ? `${equip.shortName} · ${equip.code}` : equip.shortName) : (item.equipmentLabel || (item.equipment==='machine'?'固定器械':item.equipment==='row'?'低位划船':item.equipment==='pulldown'?'高位下拉':'绳索器械'));
    const statusHtml = isEquipped
      ? `<span class="card-status-tag is-available" title="我的健身房已配备此器械工位">✓ 已配备</span>`
      : `<span class="card-status-tag is-missing" title="现场未配备该专机">未配备</span>`;

    return `<article class="exercise-card" data-id="${item.id}">${mediaMarkup(item)}<div class="card-body"><div class="card-meta"><span class="card-equip-badge" title="${escape(equip?.name || equipTag)}">${escape(equipTag)}</span>${statusHtml}</div><h3>${escape(item.name)}</h3><p class="primary">${escape(item.primary)}</p><p class="cue">${escape(item.cue)}</p><p class="attachment">${escape(item.attachment)}</p><div class="card-bottom"><span>${escape(item.sets)}</span><button class="detail-button" data-detail="${item.id}" type="button" aria-label="查看${escape(item.name)}的分步指导">怎么练 ↗</button></div></div></article>`;
  }
  function render() {
    releaseMedia(root);
    let results=filterExercises(items,state);
    if (state.gymOnly && window.GYM_SETTINGS) results = results.filter(item => window.GYM_SETTINGS.canDo(item));
    root.innerHTML=results.slice(0,state.limit).map(cardMarkup).join('');
    document.getElementById('result-count').textContent=`${results.length} 个动作`;
    document.getElementById('empty').hidden=results.length>0;
    const more=document.getElementById('more');more.hidden=state.limit>=results.length;
    more.textContent=`再看 ${Math.min(8,results.length-state.limit)} 个动作`;
    bindMedia(root);
    root.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>showDetail(button.dataset.detail,button)));
    syncControls();
  }
  function showDetail(id, trigger) {
    const item=items.find(item=>item.id===id);if(!item)return;
    pauseAll(); releaseMedia(document.getElementById('detail-content')); lastTrigger=trigger;
    const equip = window.GYM_SETTINGS?.getEquipmentForExercise(id);
    const headingEyebrow = equip ? `${equip.name} · ${item.attachment}` : item.attachment;
    document.getElementById('detail-content').innerHTML=`<div class="detail-heading"><p class="eyebrow">${escape(headingEyebrow)}</p><h2 id="detail-title">${escape(item.name)}</h2><p class="detail-cue">${escape(item.cue)}</p></div><div class="detail-grid"><div><div class="detail-media">${mediaMarkup(item)}</div><p class="media-note media-credit">循环演示 · 无配音 · 可随时暂停<br>${escape(item.demoNote || '动作轨迹示例，器械外观可能不同。')}${item.mediaCredit ? `<br>示范来源：${escape(item.mediaCredit)}` : ''}</p><h3 class="quick-title">训练前先看</h3><div class="muscle-panel"><div><b>主要训练</b><p>${escape(item.primary)}</p></div><div><b>辅助参与</b><p>${escape(item.secondary)}</p></div></div><div class="prescription"><span><b>${escape(item.sets)}</b>${item.practiceNote ? '练习记录' : '参考组次'}</span><span><b>${escape(item.rest)}</b>${item.practiceNote ? '恢复方式' : '组间休息'}</span></div><p class="media-note practice-guidance">${escape(item.practiceNote || '从轻重量、2 组开始。发力时呼气，回程控制速度；停止前保留约 2 次规范动作的余力。')}</p></div><div class="instructions"><h3>${escape(item.instructionTitle || '调节 → 发力 → 还原')}</h3><ol>${item.steps.map(step=>`<li>${escape(step)}</li>`).join('')}</ol><div class="mistake"><b>容易做错</b><p>${escape(item.mistake)}</p></div><div class="source-links"><a href="assets/${item.id}.mp4" download>↓ 下载动作演示</a><a href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">${item.mediaCredit ? '示范来源 · ' + escape(item.mediaCredit) : '图解原文'} ↗</a>${(item.references || []).map(ref => `<a href="${escape(ref.url)}" target="_blank" rel="noopener noreferrer">${escape(ref.label)} ↗</a>`).join('')}${item.video?`<a href="${escape(item.video)}" target="_blank" rel="noopener noreferrer">英文讲解视频 ↗</a><small>${escape(item.videoNote)}</small>`:''}</div></div></div>`;
    bindMedia(document.getElementById('detail-content'));
    if (item) {
      const compareButton = document.createElement('button');
      compareButton.type = 'button'; compareButton.className = 'compare-entry';
      compareButton.textContent = '对比我的动作 ↗';
      compareButton.addEventListener('click', async () => {
        pauseAll();
        if (location.protocol === 'file:') {
          compareButton.textContent = '视频对比需启动本地网页，详见使用说明';
          return;
        }
        compareButton.disabled = true;
        try { const {openComparison} = await import('./comparison/ui.mjs'); await openComparison(compareButton, item); }
        catch { compareButton.textContent = '加载失败，点击重试'; }
        finally { compareButton.disabled = false; }
      });
      document.querySelector('.detail-heading').append(compareButton);
    }
    // 健身房备注：显示用户自定义的器械设置备注，支持内联编辑
    if (window.GYM_SETTINGS) {
      const equip = window.GYM_SETTINGS.getEquipmentForExercise(id);
      const note = window.GYM_SETTINGS.getNote(id);
      const wrap = document.createElement('div');
      wrap.className = 'gym-note-wrap';
      function renderNote() {
        const current = window.GYM_SETTINGS.getNote(id);
        const equipLabel = equip ? `<span class="gym-note-equip-tag"><img src="${escape(equip.image)}" class="notes-mini-thumb" alt="" onerror="this.src='${escape(equip.fallback)}'">${escape(equip.name)}</span>` : '';
        wrap.innerHTML = `
          <div class="gym-note-header">
            <b>我的器械备注</b>
            ${equipLabel}
          </div>
          ${current ? `<p>${escape(current)}</p><button type="button" class="gym-note-add">编辑</button>` : `<button type="button" class="gym-note-add">+ 添加健身房备注</button>`}
        `;
      }
      renderNote();
      wrap.addEventListener('click', e => {
        if (!e.target.closest('.gym-note-add')) return;
        const current = window.GYM_SETTINGS.getNote(id);
        const equipLabel = equip ? `<span class="gym-note-equip-tag"><img src="${escape(equip.image)}" class="notes-mini-thumb" alt="" onerror="this.src='${escape(equip.fallback)}'">${escape(equip.name)}</span>` : '';
        wrap.innerHTML = `<div class="gym-note-header"><b>我的器械备注</b>${equipLabel}</div>`;
        const ta = Object.assign(document.createElement('textarea'), {
          value: current, maxLength: 200, rows: 2,
          placeholder: '座椅档位、插销孔位、起重重量…'
        });
        wrap.append(ta); ta.focus();
        ta.addEventListener('blur', () => {
          window.GYM_SETTINGS.setNote(id, ta.value);
          renderNote();
        });
        ta.addEventListener('keydown', ev => {
          if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); ta.blur(); }
        });
      });
      document.querySelector('.detail-heading').append(wrap);
    }
    if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
    // "怎么练"本身就是开始观看的操作，不要求再点击一次播放。
    document.getElementById('detail-content').querySelector('.play')?.click();
  }
  function reset() {
    Object.assign(state,{category:'all',muscle:'all',equipment:'all',query:'',gymOnly:false,limit:8});refreshMuscles();refreshEquipmentSelect();render();
  }
  document.getElementById('categories').innerHTML=Object.entries(categories).map(([id,label])=>`<button type="button" data-category="${id}" aria-pressed="${id==='all'}">${label}</button>`).join('');
  document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{
    state.category=button.dataset.category;state.muscle='all';state.limit=8;refreshMuscles();render();
  }));
  muscleSelect.addEventListener('change',()=>{state.muscle=muscleSelect.value;state.limit=8;render();});
  document.getElementById('equipment').addEventListener('change',event=>{state.equipment=event.target.value;state.limit=8;render();});
  document.getElementById('search').addEventListener('input',event=>{state.query=event.target.value;state.limit=8;render();});
  if (gymOnlyCheckbox) gymOnlyCheckbox.addEventListener('change',()=>{state.gymOnly=gymOnlyCheckbox.checked;state.limit=8;render();});
  document.getElementById('reset').addEventListener('click',reset);
  document.getElementById('empty-reset').addEventListener('click',reset);
  document.getElementById('more').addEventListener('click',()=>{state.limit+=8;render();});
  document.getElementById('close-detail').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{releaseMedia(dialog);lastTrigger?.focus();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
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
  // 供训练计划模块复用动作详情弹窗（保持单一播放/暂停入口）
  window.GYM_UI = { showDetail };
})();
