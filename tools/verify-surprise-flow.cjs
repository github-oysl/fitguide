// 校验惊喜系统（surprise.js）的核心流程：
//   A. ?surprise-preview= 预览：强制弹出、带预览徽标、不消耗 seen 状态。
//   B. 当天首次打卡触发：弹出一次、写入 seen、重访入口出现；再次打卡不重复弹。
//   C. 无惊喜文件 / 日期不符的注册：静默失败，无弹窗、无脚本错误。
// fixture 通过 route fulfill 注入，不依赖 gitignored 的 surprises/ 目录与系统日期。
// 运行：PORT=8765 node server.mjs 后执行 node tools/verify-surprise-flow.cjs
const assert = require('node:assert/strict');
const {chromium} = require('playwright');

const URL_BASE = process.env.QA_URL || 'http://127.0.0.1:8765';
const DATE = '2026-09-10';
const SEEN_KEY = `fitguide.surprise.seen.${DATE}`;
// 注册调用里必须出现与 URL 一致的日期，否则 loader 会拒绝（防路径注入的第一道闸）。
const FIXTURE = `window.GYM_SURPRISE.register('${DATE}', {
  title: '测试惊喜',
  revisitLabel: '重访测试惊喜 ↗',
  render(root) { root.innerHTML = '<p class="fixture-surprise">专属测试内容</p>'; },
});`;

(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.QA_CHROMIUM ? {executablePath:process.env.QA_CHROMIUM} : {})});
  const context = await browser.newContext({viewport:{width:390,height:844}});
  const checks = [];
  const check = (name, fn) => checks.push([name, fn]);
  let passed = 0, failed = 0;
  async function run(name, fn) {
    try { await fn(); console.log(`  ✓ ${name}`); passed++; }
    catch (error) { console.error(`  ✗ ${name}\n    ${error.message}`); failed++; }
  }

  check('预览模式强制弹窗、带徽标、不消耗 seen', async () => {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.clock.install({time:new Date(`${DATE}T12:00:00Z`)});
    await page.route(`**/surprises/${DATE}.js`, route => route.fulfill({contentType:'application/javascript', body:FIXTURE}));
    await page.goto(`${URL_BASE}/?surprise-preview=${DATE}`);
    await page.locator('#surprise-dialog').waitFor({state:'visible'});
    assert.match(await page.locator('#surprise-dialog-title').innerText(), /测试惊喜/);
    assert.match(await page.locator('.surprise-body').innerText(), /专属测试内容/);
    assert.match(await page.locator('.surprise-preview-label').innerText(), /不会消耗/);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), SEEN_KEY), null, '预览不得写 seen');
    assert.equal(await page.locator('.surprise-revisit').isVisible(), true, '预览也应给出重访入口');
    assert.deepEqual(errors, []);
    await page.close();
  });

  check('当天首次打卡触发一次，seen 落盘，重访可再打开', async () => {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.clock.install({time:new Date(`${DATE}T12:00:00Z`)});
    await page.route(`**/surprises/${DATE}.js`, route => route.fulfill({contentType:'application/javascript', body:FIXTURE}));
    await page.goto(URL_BASE);
    // 页面加载时不弹（还没打卡），也没有重访入口。
    assert.equal(await page.locator('#surprise-dialog').isVisible(), false);
    assert.equal(await page.locator('.surprise-revisit').count(), 0);
    // 打卡：通过自由运动提交触发 GYM_GIFT.checkin(今天)。
    await page.locator('#open-activity-dialog').click();
    await page.locator('[data-activity="跳绳"]').click();
    await page.locator('#activity-submit').click();
    await page.locator('#surprise-dialog').waitFor({state:'visible'});
    assert.equal(await page.locator('.surprise-preview-label').count(), 0, '正式触发不带预览徽标');
    assert.equal(await page.evaluate(key => localStorage.getItem(key), SEEN_KEY), 'opened');
    // 关闭后再打卡一次：惊喜不重复弹出，但重访入口保持可用。
    await page.locator('.surprise-close').click();
    await page.locator('#close-activity-dialog').click();
    await page.locator('#open-activity-dialog').click();
    await page.locator('[data-activity="跑步机爬坡"]').click();
    await page.locator('#activity-submit').click();
    await page.waitForTimeout(200);
    assert.equal(await page.locator('#surprise-dialog').isVisible(), false, 'seen 之后不得重复弹出');
    assert.equal(await page.locator('.surprise-revisit').isVisible(), true);
    await page.locator('#close-activity-dialog').click();
    await page.locator('.surprise-revisit').click();
    assert.equal(await page.locator('#surprise-dialog').isVisible(), true, '重访入口可再次打开');
    assert.deepEqual(errors, []);
    await page.close();
  });

  check('无惊喜文件与日期不符的注册都静默失败', async () => {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    // 惊喜文件不存在：onerror 路径，不应产生未捕获错误。
    await page.route('**/surprises/*.js', route => route.fulfill({status:404, contentType:'application/javascript', body:'not found'}));
    await page.goto(URL_BASE);
    await page.waitForTimeout(300);
    assert.equal(await page.locator('#surprise-dialog').count(), 0);
    assert.equal(await page.locator('.surprise-revisit').count(), 0);
    // 文件存在但注册别的日期：必须被 loader 拒绝。
    await page.unrouteAll();
    await page.route(`**/surprises/${DATE}.js`, route => route.fulfill({contentType:'application/javascript', body:`window.GYM_SURPRISE.register('2026-09-11', { title:'错日期', render(root){ root.innerHTML='<p>不应显示</p>'; } });`}));
    await page.reload();
    await page.waitForTimeout(300);
    assert.equal(await page.locator('#surprise-dialog').count(), 0, '非当日注册不得弹出');
    assert.deepEqual(errors, []);
    await page.close();
  });

  for (const [name, fn] of checks) await run(name, fn);
  await browser.close();
  console.log(`\n惊喜流程校验：${passed} 通过 / ${failed} 失败`);
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
