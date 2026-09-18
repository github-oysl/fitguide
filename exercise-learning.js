// 动作学习模块：统一教学内容、媒体生命周期和器械备注，供训练与动作库复用。
(function () {
  'use strict';
  const items = window.GYM_DATA;
  const dialog = document.getElementById('detail');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let activeVideo = null, lastTrigger = null, lastId = null;
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
  function mediaMarkup(item, mode = 'auto') {
    if (item.externalVideo) return `<div class="media external-media"><div class="external-poster"><span class="external-mark">CARDIO</span><b>${escape(item.name)}</b><small>示范视频／动作图</small></div><a class="play external-play" href="${escape(item.video)}" target="_blank" rel="noopener noreferrer" aria-label="打开${escape(item.name)}示范视频"><span>▶</span> 播放示范</a></div>`;
    const has3D = !!item.has3D;
    const is3D = has3D && mode !== 'real';
    const poster = is3D ? (item.cover3D || `assets/3d/${item.id}.jpg`) : `assets/${item.id}.jpg`;
    const badge3d = has3D ? `<span class="media-badge-3d" title="包含 3D 动画解剖演示">✦ 3D</span>` : '';
    const btnText = is3D ? '播放 3D 演示' : '播放动作';
    return `<div class="media" data-media="${item.id}" data-mode="${is3D ? '3d' : 'real'}"><img src="${poster}" alt="${escape(item.name)}动作起始姿势" width="480" height="480" loading="lazy" decoding="async">${badge3d}<button class="play" type="button" aria-label="播放${escape(item.name)}${is3D ? ' 3D' : ''}动作演示"><span>▶</span> ${btnText}</button></div>`;
  }
  function bindMedia(container) {
    container.querySelectorAll('[data-media]').forEach(media=>{
      media.querySelector('button').addEventListener('click',async()=>{
        pauseAll();
        const id=media.dataset.media;
        const item=items.find(item=>item.id===id);
        const mode = media.dataset.mode || (item?.has3D ? '3d' : 'real');
        const is3D = mode === '3d' && item?.has3D;
        const video=document.createElement('video');
        video.controls=true; video.playsInline=true; video.preload='none'; video.muted=true; video.loop=true;
        video.poster=is3D ? (item.cover3D || `assets/3d/${id}.jpg`) : `assets/${id}.jpg`;
        video.setAttribute('aria-label', is3D ? '3D解剖动作演示，可暂停或拖动进度' : '动作演示，可暂停或拖动进度');
        // 用户开始观看后持续循环；优先使用 3D 解剖演示视频
        video.src=is3D ? (item.video3D || `assets/3d/${id}.mp4`) : `assets/${id}.mp4`;
        video.addEventListener('play',()=>{
          if(activeVideo&&activeVideo!==video)activeVideo.pause();
          activeVideo=video;
        });
        video.addEventListener('error',()=>{
          const item=items.find(item=>item.id===id);
          observer?.unobserve(video);
          media.innerHTML=`<div class="media-error"><p>演示暂时无法播放</p><a href="${video.src}" download>下载视频后打开</a><a href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">查看原站图解 ↗</a><small>中文步骤仍可正常阅读。</small></div>`;
        });
        media.replaceChildren(video); observer?.observe(video);
        try { await video.play(); } catch (error) {
          // 浏览器限制播放时保留原生控制栏。
          if(error.name!=='AbortError')video.setAttribute('aria-label','请使用视频控制栏播放动作演示');
        }
      });
    });
  }
  function showDetail(id, trigger) {
    const item=items.find(item=>item.id===id);if(!item)return;
    pauseAll(); releaseMedia(document.getElementById('detail-content')); lastTrigger=trigger; lastId=id;
    const equip = window.GYM_SETTINGS?.getEquipmentForExercise(id);
    const headingEyebrow = equip ? `${equip.name} · ${item.attachment}` : item.attachment;
    const switcherHtml = item.has3D ? `
      <div class="video-mode-switcher" role="group" aria-label="演示视频切换">
        <button type="button" class="mode-btn active" data-switch-mode="3d" aria-pressed="true">3D 动画</button>
        <button type="button" class="mode-btn" data-switch-mode="real" aria-pressed="false">真人演示</button>
      </div>` : '';
    const downloadLinks = item.has3D
      ? `<a href="${item.video3D}" download>↓ 下载 3D动画教学</a><a href="assets/${item.id}.mp4" download>↓ 下载真人动作演示</a>`
      : `<a href="assets/${item.id}.mp4" download>↓ 下载动作演示</a>`;

    document.getElementById('detail-content').innerHTML=`<div class="detail-heading"><p class="eyebrow">${escape(headingEyebrow)}</p><h2 id="detail-title">${escape(item.name)}</h2><p class="detail-cue">${escape(item.cue)}</p></div><div class="detail-grid"><div>${switcherHtml}<div class="detail-media">${mediaMarkup(item, '3d')}</div><p class="media-note media-credit">循环演示 · 无配音 · 可随时暂停<br>${escape(item.demoNote || '动作轨迹示例，器械外观可能不同。')}${item.mediaCredit ? `<br>示范来源：${escape(item.mediaCredit)}` : ''}</p><details class="detail-extra"><summary>训练肌肉</summary><div class="muscle-panel"><div><b>主要训练</b><p>${escape(item.primary)}</p></div><div><b>辅助参与</b><p>${escape(item.secondary)}</p></div></div></details><div class="prescription"><span><b>${escape(item.sets)}</b>${item.practiceNote ? '练习记录' : '参考组次'}</span><span><b>${escape(item.rest)}</b>${item.practiceNote ? '恢复方式' : '组间休息'}</span></div><p class="media-note practice-guidance">${escape(item.practiceNote || '从轻重量、2 组开始。发力时呼气，回程控制速度；停止前保留约 2 次规范动作的余力。')}</p></div><div class="instructions"><h3>${escape(item.instructionTitle || '调节 → 发力 → 还原')}</h3><ol>${item.steps.map(step=>`<li>${escape(step)}</li>`).join('')}</ol><div class="mistake"><b>容易做错</b><p>${escape(item.mistake)}</p></div><details class="detail-extra"><summary>来源与下载</summary><div class="source-links">${downloadLinks}<a href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">${item.mediaCredit ? '示范来源 · ' + escape(item.mediaCredit) : '图解原文'} ↗</a>${(item.references || []).map(ref => `<a href="${escape(ref.url)}" target="_blank" rel="noopener noreferrer">${escape(ref.label)} ↗</a>`).join('')}${item.video?`<a href="${escape(item.video)}" target="_blank" rel="noopener noreferrer">英文讲解视频 ↗</a><small>${escape(item.videoNote)}</small>`:''}</div></details><details class="detail-extra detail-tools"><summary>器械备注</summary></details></div></div>`;
    bindMedia(document.getElementById('detail-content'));

    if (item.has3D) {
      document.querySelectorAll('#detail-content [data-switch-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetMode = btn.dataset.switchMode;
          document.querySelectorAll('#detail-content [data-switch-mode]').forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
          const detailMedia = document.querySelector('#detail-content .detail-media');
          if (!detailMedia) return;
          releaseMedia(detailMedia);
          detailMedia.innerHTML = mediaMarkup(item, targetMode);
          bindMedia(detailMedia);
          detailMedia.querySelector('.play')?.click();
        });
      });
    }

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
      // 对比是主要操作，直接放在组次指导之后，不藏进折叠区。
      document.getElementById('detail-content').querySelector('.practice-guidance').after(compareButton);
    }
    // 健身房备注：显示用户自定义的器械设置备注，支持内联编辑
    if (window.GYM_SETTINGS) {
      const equip = window.GYM_SETTINGS.getEquipmentForExercise(id);
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
        const actions = document.createElement('div'); actions.className = 'note-edit-actions';
        const saveButton = Object.assign(document.createElement('button'), {type: 'button', className: 'btn-soft', textContent: '保存备注'});
        const cancelButton = Object.assign(document.createElement('button'), {type: 'button', className: 'text-link', textContent: '取消'});
        const status = document.createElement('p'); status.setAttribute('role', 'status');
        actions.append(saveButton, cancelButton); wrap.append(actions, status);
        saveButton.addEventListener('click', () => {
          if (!window.GYM_SETTINGS.setNote(id, ta.value)) { status.textContent = '保存失败，草稿已保留，请重试。'; return; }
          renderNote(); wrap.querySelector('button')?.focus();
        });
        cancelButton.addEventListener('click', () => { renderNote(); wrap.querySelector('button')?.focus(); });
      });
      document.querySelector('.detail-tools').append(wrap);
    }
    if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
    // "怎么练"本身就是开始观看的操作，不要求再点击一次播放。
    document.getElementById('detail-content').querySelector('.play')?.click();
  }
  document.getElementById('close-detail').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close', () => {
    releaseMedia(dialog);
    const target = lastTrigger?.isConnected ? lastTrigger : [...document.querySelectorAll('[data-detail]')].find(button => button.dataset.detail === lastId && button.getClientRects().length);
    target?.focus({preventScroll: true});
  });
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  window.GYM_UI = {showDetail};
  window.addEventListener('viewchange', () => { if (dialog.open) dialog.close(); pauseAll(); });
})();
