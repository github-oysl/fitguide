// 校验前端渲染优化：勾选打卡不再重建列表与统计面板，并给出真实耗时对比。
// 用 file:// 直接打开 index.html，与应用「离线可用」的实际使用方式一致。
// 依赖 playwright：npm i playwright && npx playwright install chromium
// 运行：node tools/verify-frontend-render.cjs
const assert = require('node:assert/strict');
const path = require('node:path');
const {pathToFileURL} = require('node:url');

function loadPlaywright() {
  const roots = [process.env.PLAYWRIGHT_ROOT, path.join(__dirname, '..'), process.cwd()].filter(Boolean);
  for (const root of roots) {
    try { return require(require.resolve('playwright', {paths: [root]})); } catch { /* 试下一个候选位置 */ }
  }
  throw new Error('未找到 playwright，请先执行 npm i playwright && npx playwright install chromium');
}

const ROOT = path.resolve(__dirname, '..');
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;

// 把关键容器的 innerHTML 写入次数记下来：这正是「全量重建」的度量。
const INSTRUMENT = () => {
  window.__rebuilds = {tabs: 0, items: 0, chart: 0, hist: 0, week: 0, overview: 0};
  const proto = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  for (const [sel, key] of [['#plan-tabs', 'tabs'], ['#plan-items', 'items'], ['#stats-chart', 'chart'], ['#plan-history-list', 'hist'], ['#week-strip', 'week'], ['#stats-overview', 'overview']]) {
    const el = document.querySelector(sel);
    if (!el) continue;
    Object.defineProperty(el, 'innerHTML', {
      configurable: true,
      get() { return proto.get.call(this); },
      set(value) { window.__rebuilds[key]++; proto.set.call(this, value); }
    });
  }
  return window.__rebuilds;
};

(async () => {
  const {chromium} = loadPlaywright();
  const browser = await chromium.launch({args: ['--no-proxy-server', '--allow-file-access-from-files']});
  const page = await browser.newPage({viewport: {width: 1280, height: 900}});
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });

  const checks = [];
  const check = (name, fn) => checks.push([name, fn]);

  // 每个用例即时输出，避免中途卡住时看不到进度。
  let passed = 0, failed = 0;
  async function run(name, fn) {
    try { await fn(); console.log(`  ✓ ${name}`); passed++; }
    catch (error) { console.error(`  ✗ ${name}\n    ${error.message}`); failed++; }
  }

  // 兜底：任何环节卡死都不要静默退出。
  const guard = setTimeout(() => { console.error('\n超时：用例执行超过 120 秒'); process.exit(2); }, 120000);
  guard.unref?.();

  await page.goto(PAGE);
  await page.evaluate(() => localStorage.clear());
  await page.reload({waitUntil: 'load'});

  // hashchange 是异步派发的：切视图后必须等视图真正显示，不能立刻断言。
  const gotoView = async view => {
    await page.click(`[data-view="${view}"]`);
    await page.waitForFunction(name => !document.getElementById(`view-${name}`).hidden, view);
  };
  const openAdvancedFilters = async () => {
    if (!(await page.isVisible('#reset'))) await page.click('#advanced-label');
    await page.waitForSelector('#reset', {state: 'visible'});
  };

  await run('页面加载无脚本错误', async () => {
    assert.deepEqual(errors, []);
  });

  await run('首屏三个视图的可见性与导航一致', async () => {
    assert.equal(await page.isVisible('#view-today'), true);
    assert.equal(await page.isVisible('#view-stats'), false);
    assert.equal(await page.isVisible('#view-library'), false);
  });

  await run('首屏未渲染隐藏的统计面板', async () => {
    // 统计视图默认 hidden，不应在首屏做日历/年柱的构建工作。
    assert.equal(await page.evaluate(() => document.getElementById('stats-chart').innerHTML.trim()), '');
    assert.equal(await page.evaluate(() => document.getElementById('plan-history-list').innerHTML.trim()), '');
  });

  await run('动作库只渲染首批 8 张卡片，继续加载后追加', async () => {
    await gotoView('library');
    assert.equal(await page.locator('#lessons .exercise-card').count(), 8);
    await page.click('#more');
    assert.equal(await page.locator('#lessons .exercise-card').count(), 16);
  });

  await run('筛选可切换且结果计数同步', async () => {
    await openAdvancedFilters();
    await page.click('#reset');
    await page.click('[data-category="chest"]');
    const count = await page.locator('#lessons .exercise-card').count();
    assert.ok(count > 0 && count <= 8, `卡片数 ${count}`);
    assert.match(await page.textContent('#result-count'), /个动作/);
    await page.click('#reset');
  });

  await gotoView('today');

  await run('勾选打卡只更新自身，不重建标签/列表/统计面板', async () => {
    await page.evaluate(INSTRUMENT);
    await page.locator('[data-check]').first().click();
    const after = await page.evaluate(() => window.__rebuilds);
    // 打卡项自身就地更新；周足迹要跟着变；标签、动作列表、日历、历史都不该重建。
    assert.equal(after.tabs, 0, `plan-tabs 被重建 ${after.tabs} 次`);
    assert.equal(after.items, 0, `plan-items 被重建 ${after.items} 次`);
    assert.equal(after.chart, 0, `stats-chart 被重建 ${after.chart} 次`);
    assert.equal(after.hist, 0, `plan-history-list 被重建 ${after.hist} 次`);
    assert.equal(after.overview, 0, `stats-overview 被重建 ${after.overview} 次`);
    assert.equal(after.week, 1, `week-strip 应更新 1 次，实际 ${after.week} 次`);
  });

  await run('勾选后按钮状态、进度与今日页脚同步', async () => {
    const button = page.locator('[data-check]').first();
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
    assert.equal((await button.textContent()).trim(), '✓');
    assert.equal(await button.locator('xpath=..').getAttribute('class'), 'plan-item is-done');
    assert.match(await page.textContent('#plan-progress'), /本日打卡 1 \/ \d+/);
    assert.equal((await page.textContent('#week-total')).trim(), '1');
  });

  await run('再点一次可撤销今天这一勾', async () => {
    const button = page.locator('[data-check]').first();
    await button.click();
    assert.equal(await button.getAttribute('aria-pressed'), 'false');
    assert.equal(await button.locator('xpath=..').getAttribute('class'), 'plan-item');
    assert.match(await page.textContent('#plan-progress'), /本日打卡 0 \/ \d+/);
    await button.click();
  });

  await run('切到统计视图时补渲染日历与历史明细', async () => {
    await gotoView('stats');
    assert.equal(await page.isVisible('#view-stats'), true);
    assert.ok((await page.evaluate(() => document.getElementById('stats-chart').innerHTML.length)) > 0);
    const history = await page.textContent('#plan-history-list');
    assert.ok(history.includes('完成'), `历史明细应含完成情况，实际：${history.slice(0, 60)}`);
  });

  await run('统计面板的周期切换与日期选择仍然可用（事件委托）', async () => {
    await page.click('[data-period="month"]');
    assert.equal(await page.getAttribute('[data-period="month"]', 'aria-pressed'), 'true');
    assert.match(await page.textContent('#period-title'), /月/);
    await page.click('[data-period="year"]');
    assert.equal(await page.locator('#stats-chart .month-bar').count(), 12);
    // 点年视图里的月份应下钻到该月月历（第 1 根柱子是一月，今天不在其中）。
    await page.click('#stats-chart .month-bar:nth-child(1)');
    assert.equal(await page.getAttribute('[data-period="month"]', 'aria-pressed'), 'true');
    assert.match(await page.textContent('#period-title'), /1月/);
    // 回到本月，今天必然落在月历里。
    await page.click('#period-current');
    const today = await page.evaluate(() => document.querySelector('[data-date].is-today')?.dataset.date);
    assert.ok(today, '应能找到今天的日期格');
    await page.click(`[data-date="${today}"]`);
    assert.ok((await page.textContent('#selected-day')).includes('完成 1 项运动'));
    await page.click('[data-period="week"]');
  });

  await run('概览卡片可点且不会重复叠加监听器', async () => {
    await page.click('[data-overview="month"]');
    assert.match(await page.textContent('#period-title'), /月/);
    await page.click('[data-overview="year"]');
    await page.click('[data-overview="week"]');
    assert.match(await page.textContent('#period-title'), /—/);
  });

  await run('自由运动打卡仍能更新统计', async () => {
    await gotoView('today');
    await page.click('[data-mode="free-activity"]');
    await page.fill('#activity-form input[name="name"]', '测试·户外快走');
    await page.fill('#activity-form input[name="date"]', await page.evaluate(() => new Date().toLocaleDateString('sv-SE')));
    await page.click('#activity-submit');
    await gotoView('stats');
    assert.ok((await page.textContent('#activity-records')).includes('测试·户外快走'));
    // 切回「跟着计划练」，避免自由运动模式把计划面板留在 hidden 状态。
    await gotoView('today');
    await page.click('[data-mode="plans"]');
  });

  await run('动作详情弹窗可打开并带分步指导', async () => {
    await gotoView('library');
    await page.locator('#lessons [data-detail]').first().click();
    assert.equal(await page.isVisible('#detail'), true);
    assert.ok((await page.textContent('#detail-content')).includes('容易做错'));
    await page.click('#close-detail');
  });

  await run('训练日切换会整体重建（该重建时要重建）', async () => {
    await gotoView('today');
    await page.evaluate(INSTRUMENT);
    await page.locator('#plan-days [data-day]').nth(1).click();
    const after = await page.evaluate(() => window.__rebuilds);
    assert.equal(after.tabs, 1, '切换训练日应重建训练日标签');
    assert.equal(after.items, 1, '切换训练日应重建动作列表');
  });

  // 交互耗时采样：连续点击打卡按钮，取平均每次同步开销。
  const clickCost = await page.evaluate(() => {
    const btn = document.querySelector('[data-check]');
    const runs = 80;
    const t0 = performance.now();
    for (let i = 0; i < runs; i++) btn.click();
    return (performance.now() - t0) / runs;
  });

  const dom = await page.evaluate(() => ({
    nodes: document.getElementsByTagName('*').length,
    scripts: document.querySelectorAll('script[src]').length,
    stylesheets: document.querySelectorAll('link[rel=stylesheet]').length
  }));

  clearTimeout(guard);
  console.log(`\n渲染校验：${passed} 通过 / ${failed} 失败`);
  console.log(`性能采样：每次打卡同步开销约 ${clickCost.toFixed(2)} ms · DOM 节点 ${dom.nodes} 个 · 首屏 script ${dom.scripts} 个 / stylesheet ${dom.stylesheets} 个`);
  if (errors.length) console.error(`页面错误：\n  ${errors.join('\n  ')}`);
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
