// 本地惊喜系统 loader：按日期从 surprises/<YYYY-MM-DD>.js 动态加载惊喜内容。
// 约定：
//   - 不硬编码任何日期或内容； surprises/ 目录被 gitignore，属本地私有。
//   - file:// 下 fetch/XHR 不可用，因此用 <script> 注入探测文件存在性（onload=有，onerror=无）。
//   - 惊喜文件只需调用 window.GYM_SURPRISE.register(date, def)，壳（弹窗、焦点、seen）由本文件负责。
(function () {
  'use strict';
  const S = window.GYM_STATS;
  const SEEN_PREFIX = 'fitguide.surprise.seen.';
  const params = new URLSearchParams(location.search);
  const previewParam = params.get('surprise-preview');
  // 预览参数必须是合法日期：它会被拼进脚本路径，先校验防止注入任意文件名。
  const preview = !!previewParam && !!S.parse(previewParam);
  const date = preview ? previewParam : S.key(new Date());
  const memory = new Set(); // 本 tab 内已点亮的日期（localStorage 失败时的兜底）
  let def = null;           // 当日已注册的惊喜定义
  let dialog = null, revisit = null, returnFocus = null;

  function seen(d) {
    try { return memory.has(d) || localStorage.getItem(SEEN_PREFIX + d) === 'opened'; }
    catch { return memory.has(d); }
  }
  function markSeen(d) {
    memory.add(d);
    try { localStorage.setItem(SEEN_PREFIX + d, 'opened'); }
    catch { /* 打卡本身已保存成功；本 tab 内仍会弹出一次。 */ }
  }

  // —— 弹窗壳：标题栏 + 内容区，视觉约定复用其它 dialog ——
  function ensureShell() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.id = 'surprise-dialog';
    dialog.setAttribute('aria-labelledby', 'surprise-dialog-title');
    dialog.innerHTML = '<div class="dialog-top"><span id="surprise-dialog-title"></span>' +
      '<button type="button" class="surprise-close" aria-label="关闭惊喜">✕</button></div>' +
      '<div class="surprise-body"></div>';
    document.body.append(dialog);
    dialog.querySelector('.surprise-close').addEventListener('click', () => close());
    dialog.addEventListener('close', () => {
      document.body.classList.remove('surprise-is-open');
      dialog.querySelectorAll('video').forEach(video => video.pause());
      def?.onClose?.(dialog);
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    });
    return dialog;
  }

  function open() {
    if (!def || (dialog && dialog.open)) return;
    returnFocus = document.activeElement;
    const shell = ensureShell();
    document.getElementById('surprise-dialog-title').textContent = def.title || '今日惊喜';
    const body = shell.querySelector('.surprise-body');
    body.innerHTML = '';
    def.render(body, { date, preview });
    if (preview) {
      const badge = document.createElement('p');
      badge.className = 'surprise-preview-label';
      badge.textContent = `惊喜预览 · 不会消耗 ${date} 的正式惊喜`;
      body.prepend(badge);
    }
    def.onOpen?.(shell);
    // 惊喜是全屏焦点，先停掉页面里可能正在播放的动作视频。
    document.querySelectorAll('video').forEach(video => video.pause());
    shell.showModal();
    shell.scrollTop = 0;
    document.body.classList.add('surprise-is-open');
  }
  function close() { if (dialog) dialog.close(); }

  // —— 重访入口：插在「今天」页概览卡之后，已看过的惊喜随时可回来看 ——
  function reveal() {
    if (!revisit) {
      revisit = document.createElement('button');
      revisit.type = 'button';
      revisit.className = 'surprise-revisit';
      revisit.textContent = (def && def.revisitLabel) || '今天的专属惊喜 ↗';
      revisit.addEventListener('click', open);
      const anchor = document.querySelector('#view-today .hub-overview') || document.querySelector('#view-today .page-heading');
      if (anchor) anchor.after(revisit);
    }
    revisit.hidden = false;
  }

  // —— 注册协议：surprises/<date>.js 文件内唯一需要调用的 API ——
  function register(d, definition) {
    if (d !== date || def || !definition || typeof definition.render !== 'function') return false;
    def = definition;
    if (definition.cssUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = definition.cssUrl;
      document.head.append(link);
    }
    if (preview) { reveal(); open(); }
    else if (seen(d)) reveal();
    return true;
  }

  // —— 打卡钩子：plans.js / free-activity.js 通过 GYM_GIFT.checkin(date) 触发 ——
  function checkin(d) {
    if (preview || d !== date || !def || seen(d)) return;
    markSeen(d);
    reveal();
    open();
  }

  // 跨 tab：另一个标签页打开过惊喜，这里点亮重访入口。
  window.addEventListener('storage', event => {
    if (event.key && event.key.startsWith(SEEN_PREFIX) && event.newValue === 'opened' && def) reveal();
  });

  // —— 探测当日惊喜文件是否存在：加载成功即由文件内 register() 接管 ——
  const probe = document.createElement('script');
  probe.src = `surprises/${encodeURIComponent(date)}.js`;
  probe.addEventListener('load', () => probe.remove());
  probe.addEventListener('error', () => probe.remove());
  document.head.append(probe);

  const api = { register, checkin, has: seen, open, close, date, preview };
  window.GYM_SURPRISE = api;
  // 兼容名：打卡调用点沿用 GYM_GIFT，两者指向同一实例。
  window.GYM_GIFT = api;
})();
