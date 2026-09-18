// 教师节限定惊喜（本地私有，不入库）。
// 由 surprise.js 按文件名约定自动加载：仅在 2026-09-10 当天首次打卡时弹出。
// 预览：在首页 URL 加 ?surprise-preview=2026-09-10（不消耗正式惊喜）。
window.GYM_SURPRISE.register('2026-09-10', {
  title: '今天的你，值得被偏爱。',
  revisitLabel: '九月十日 · 我的专属菜单 ↗',
  cssUrl: 'surprises/teachers-day-2026.css',
  render(root) {
    root.innerHTML = `
      <div class="gift-paper">
        <div class="gift-dedication"><span class="gift-flower" aria-hidden="true">✳</span><p>九月十日 · 教师节限定</p><span class="gift-edition">一人专属<br>无限偏爱</span></div>
        <p class="gift-pretitle">TO 珊 / 我最喜欢的老师，和未来的太太</p>
        <h2 id="gift-title">今天的你，<br>值得被<span>偏爱。</span></h2>
        <p class="gift-intro">打卡收到。现在，把“要努力”先放一放。<br>这一页，没有待办，只有我想给你的喜欢。</p>
        <div class="gift-menu-heading"><span>今日偏爱菜单</span><small>不数热量，只数开心 · 点开尝尝</small></div>
        <div class="gift-menu" role="group" aria-label="选择一道心意">
          <button type="button" data-course="hug" aria-pressed="false"><span class="gift-course">01 / 开胃</span><span class="gift-dish">一个长长的拥抱<small>卸下今天的小疲惫</small></span><span class="gift-price">不限量 ↗</span></button>
          <button type="button" data-course="adventure" aria-pressed="false"><span class="gift-course">02 / 主菜</span><span class="gift-dish">一场随心的小冒险<small>下一站，由你的好奇心决定</small></span><span class="gift-price">陪你 ↗</span></button>
          <button type="button" data-course="letter" aria-pressed="false"><span class="gift-course">03 / 甜点</span><span class="gift-dish">一份明目张胆的偏爱<small>有些话，想认真说给你听</small></span><span class="gift-price">独享 ↗</span></button>
        </div>
        <div class="gift-note" aria-live="polite" aria-atomic="true"><span id="gift-note-label">主理人留给你的话</span><p id="gift-note-text">你把耐心和光亮分给了那么多人。<br>今天，也让我把温柔留给你。</p></div>
        <div class="gift-signature"><p>珊，教师节快乐。</p><span>一直在你身边的，<b>你的凌哥</b></span></div>
        <button type="button" class="gift-keep">收下这份偏爱 <span>♡</span></button>
        <p class="gift-footnote">不用完成更多训练，也值得被好好爱着。</p>
      </div>`;
    const notes = {
      hug:['拥抱，已为你预留','今天可以暂时不做那个照顾所有人的大人。累了就靠过来，开心就讲给我听；不想说话，也可以只是抱一会儿。'],
      adventure:['好奇心，不用请假','想走没走过的路，想尝没尝过的味道，或者临时改变所有计划，都很好。愿我们一起，把平常的日子过成有趣的小冒险。'],
      letter:['这份偏爱，长期有效','珊，你是我想共度一生的伴侣，也是我人生旅途中的老师。在一年又一年的相处里，我们慢慢学会理解彼此，也一起成长为更好的自己。谢谢你，让我更懂得如何去爱，也让未来有了我最期待的模样。往后的每一年，我都想牵着你的手，一起学习，一起长大。教师节快乐。——你的凌哥']
    };
    const dialog = root.closest('dialog');
    root.querySelectorAll('[data-course]').forEach(button => button.addEventListener('click', () => {
      root.querySelectorAll('[data-course]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      const [label, text] = notes[button.dataset.course];
      root.querySelector('#gift-note-label').textContent = label;
      root.querySelector('#gift-note-text').textContent = text;
      const note = root.querySelector('.gift-note');
      dialog.scrollTo({top: dialog.scrollTop + note.getBoundingClientRect().top - dialog.getBoundingClientRect().top - 80, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }));
    // 「收下这份偏爱」与壳的关闭按钮同效。
    root.querySelector('.gift-keep').addEventListener('click', () => window.GYM_SURPRISE.close());
  },
});
