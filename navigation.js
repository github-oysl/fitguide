// 页面导航模块：统一 hash、视图切换、历史返回与切页焦点，不依赖统计实现。
(function () {
  'use strict';
  let activeView = null;
  function navigate() {
    const hash = location.hash.slice(1);
    const view = ['stats', 'library', 'settings'].includes(hash) ? hash : 'today';
    for (const el of document.querySelectorAll('.view')) el.hidden = el.id !== `view-${view}`;
    for (const link of document.querySelectorAll('[data-view]')) {
      if (link.dataset.view === view) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    document.querySelectorAll('video').forEach(video => video.pause());
    document.getElementById('plan-picker').close();
    // 自由运动弹层不跨视图残留：切页时一并收起。
    document.getElementById('activity-dialog').close();
    const changed = activeView !== view;
    activeView = view;
    if (changed) window.scrollTo({top: 0, behavior: 'instant'});
    window.dispatchEvent(new CustomEvent('viewchange', {detail: {view}}));
  }
  window.addEventListener('hashchange', navigate);
  navigate();
})();
