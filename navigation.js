// 页面导航模块：统一 hash、训练模式、历史返回与切页焦点，不依赖统计实现。
(function () {
  'use strict';
  let activeView = null;
  function navigate() {
    const hash = location.hash.slice(1);
    const view = ['stats', 'library', 'settings'].includes(hash) ? hash : 'today';
    const mode = hash === 'free-activity' ? 'free-activity' : 'plans';
    for (const el of document.querySelectorAll('.view')) el.hidden = el.id !== `view-${view}`;
    for (const link of document.querySelectorAll('[data-view]')) {
      if (link.dataset.view === view) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    for (const id of ['plans', 'free-activity']) document.getElementById(id).hidden = id !== mode;
    for (const button of document.querySelectorAll('[data-mode]')) button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
    document.getElementById('today-title').textContent = mode === 'plans' ? '今日训练' : '自由运动';
    document.querySelector('#view-today .lede').textContent = mode === 'plans' ? '练完一项，勾选一项。' : '按自己的节奏，记下今天的运动。';
    document.querySelectorAll('video').forEach(video => video.pause());
    document.getElementById('plan-picker').close();
    const changed = activeView !== view;
    activeView = view;
    if (changed) window.scrollTo({top: 0, behavior: 'instant'});
    window.dispatchEvent(new CustomEvent('viewchange', {detail: {view, mode}}));
  }
  document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
    location.hash = button.dataset.mode;
  }));
  window.addEventListener('hashchange', navigate);
  navigate();
})();
