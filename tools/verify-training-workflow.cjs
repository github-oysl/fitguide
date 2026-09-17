// 验证训练改版的关键旅程；使用独立上下文和固定日期，不改用户浏览器记录。
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.QA_CHROMIUM ? {executablePath:process.env.QA_CHROMIUM} : {})});
  const context = await browser.newContext({viewport:{width:390,height:844}});
  const page = await context.newPage(); const errors=[];
  await context.route('**/teachers-day.*', route => route.fulfill({contentType:route.request().url().endsWith('.css')?'text/css':'application/javascript',body:route.request().url().endsWith('.css')?'':'window.GYM_GIFT={checkin(){}};'}));
  page.on('pageerror', error=>errors.push(error.message));
  await page.clock.install({time:new Date('2026-09-08T12:00:00Z')});
  const url=process.env.QA_URL || 'http://127.0.0.1:8765';
  const checks=[];
  async function check(name, fn) { await fn(); checks.push(name); console.log('  ✓ '+name); }
  const view=async name=>{await page.locator(`[data-view="${name}"]`).click();await page.locator('#view-'+name).waitFor({state:'visible'});};
  const failWrites=async enabled=>page.evaluate(enabled=>{
    window.originalWrite ||= Storage.prototype.setItem;
    Storage.prototype.setItem=enabled?function(){throw new Error('测试存储写入失败');}:window.originalWrite;
  },enabled);
  try {
    await page.goto(url);
    await check('手机首屏可操作，取消计划选择不改变训练',async()=>{
      assert.ok(await page.locator('.plan-item').first().evaluate(el=>el.getBoundingClientRect().bottom<document.querySelector('.app-nav').getBoundingClientRect().top));
      const name=await page.locator('#today-plan-name').innerText();
      await page.click('#change-plan'); await page.click('[data-plan="beginner"]'); await page.click('#close-plan-picker');
      assert.equal(await page.locator('#today-plan-name').innerText(),name);
      await page.click('#change-plan'); await page.click('[data-plan="beginner"]'); await page.click('[data-day="b"]'); await page.click('#confirm-plan');
      assert.match(await page.locator('#today-plan-name').innerText(),/新手全身.*全身 B/);
      await page.reload(); assert.match(await page.locator('#today-plan-name').innerText(),/新手全身.*全身 B/);
    });
    await check('重置和更换计划写入失败时，进度与存储保持一致',async()=>{
      await page.locator('[data-check]').first().click();
      const before=await page.evaluate(()=>localStorage.getItem('fitguide.checkin.v2'));
      await failWrites(true); await page.click('#plan-reset');
      assert.equal(await page.locator('[data-check]').first().getAttribute('aria-pressed'),'true');
      assert.equal(await page.evaluate(()=>localStorage.getItem('fitguide.checkin.v2')),before);
      assert.match(await page.locator('#save-status').innerText(),/无法保存/);
      await page.click('#change-plan'); await page.click('[data-plan="ppl"]'); await page.click('#confirm-plan');
      assert.equal(await page.locator('#plan-picker').isVisible(),true);
      assert.match(await page.locator('#plan-picker-status').innerText(),/无法保存/);
      await page.click('#close-plan-picker'); await failWrites(false);
      await page.click('#plan-reset'); assert.equal(await page.locator('[data-check]').first().getAttribute('aria-pressed'),'false');
    });
    await check('自由运动 hash 能刷新恢复，浏览器返回也保持模式一致',async()=>{
      await page.click('[data-mode="free-activity"]'); await page.locator('#free-activity').waitFor();
      await page.reload(); assert.equal(await page.locator('#free-activity').isVisible(),true);
      await view('library'); await page.goBack(); await page.locator('#free-activity').waitFor();
      assert.equal(await page.locator('[data-mode="free-activity"]').getAttribute('aria-pressed'),'true');
    });
    await check('搜索直接可用，教学弹窗切换媒体并正确回焦',async()=>{
      await view('library'); assert.equal(await page.locator('#search').isVisible(),true);
      await page.fill('#search','正握高位下拉'); await page.locator('#lessons [data-detail]').first().click();
      await page.locator('#detail').waitFor();
      assert.equal(await page.locator('#detail video').count(),1);
      await page.click('[data-switch-mode="real"]');
      assert.equal(await page.locator('[data-switch-mode="real"]').getAttribute('aria-pressed'),'true');
      assert.equal(await page.locator('#detail video').count(),1);
      await page.click('#close-detail');
      assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-detail')),true);
      assert.equal(await page.locator('#detail video[src]').count(),0);
    });
    await check('器械备注保存失败保留草稿，成功后跨入口可读取',async()=>{
      await page.locator('#lessons [data-detail]').first().click();
      await page.click('.detail-tools > summary'); await page.click('.gym-note-add');
      await page.fill('.gym-note-wrap textarea','座椅 4 档'); await failWrites(true);
      await page.getByRole('button',{name:'保存备注',exact:true}).click();
      assert.equal(await page.locator('.gym-note-wrap textarea').inputValue(),'座椅 4 档');
      assert.match(await page.locator('.gym-note-wrap [role="status"]').innerText(),/保存失败/);
      await failWrites(false); await page.getByRole('button',{name:'保存备注',exact:true}).click();
      assert.match(await page.locator('.gym-note-wrap').innerText(),/座椅 4 档/);
      await page.click('#close-detail');
      assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-detail')),true);
    });
    await check('设置修改失败会回退，成功后筛选立即生效',async()=>{
      await view('settings'); const toggle=page.locator('[data-equip="lat_pulldown"]');
      assert.equal(await toggle.isChecked(),true);
      await failWrites(true); await toggle.click(); assert.equal(await toggle.isChecked(),true);
      assert.match(await page.locator('#gym-status').innerText(),/保存失败/);
      await failWrites(false); await toggle.uncheck(); await view('library');
      await page.click('#advanced-label'); await page.check('#gym-only');
      assert.equal(await page.locator('#empty').isVisible(),true);
    });
    assert.deepEqual(errors,[]);
    console.log(`训练旅程校验：${checks.length} 通过，无脚本错误。`);
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
