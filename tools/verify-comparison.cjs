const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const {createApp}=await import('../server.mjs');const app=createApp();await new Promise(r=>app.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:process.env.QA_CHROMIUM,channel:process.env.QA_CHROMIUM?undefined:'chrome'});
 const output=process.env.QA_ARTIFACTS||'test-artifacts';fs.mkdirSync(output,{recursive:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();
  const errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1'))external.push(r.url());});
  await page.goto(`http://127.0.0.1:${app.address().port}`);
  await page.locator('[data-view="library"]').click();await page.locator('[data-category="arms"]').click();
  await page.locator('[data-detail="cable-curl-with-bar"]').click();
  await page.locator('.compare-entry').click();
  await page.locator('#comparison-dialog').waitFor({state:'visible'});
  await page.screenshot({path:path.join(output,'comparison-upload-mobile.png')});
  await page.locator('#compare-file').setInputFiles('assets/cable-curl-with-bar.mp4');
  await page.waitForFunction(()=>!document.getElementById('compare-analyze').disabled);
  await page.locator('#compare-analyze').click();
  await page.waitForFunction(()=>!document.getElementById('compare-results').hidden,{},{timeout:90000});
  assert.match(await page.locator('#compare-reps').innerText(),/1 次/);
  assert.equal(await page.locator('.metric-status.similar').count(),3);
  assert.equal(await page.locator('#guidance-badge').innerText(),'大模型未接入');
  assert.equal(await page.locator('#guidance-generate').isVisible(),false);
  assert.equal(await page.locator('#comparison-dialog').evaluate(el=>el.scrollWidth>el.clientWidth),false);
  await page.locator('#comparison-dialog').evaluate(el=>el.scrollTop=el.scrollHeight);
  await page.screenshot({path:path.join(output,'comparison-result-mobile.png')});
  await page.locator('[data-segment="0"]').click();
  await page.waitForFunction(()=>document.getElementById('compare-player').currentTime>.1);
  await page.locator('[data-playback="reference"]').click();
  assert.match(await page.locator('#compare-player').getAttribute('src'),/assets/);
  // A static clip must not receive a fabricated result.
  await page.locator('#compare-file').setInputFiles('test-artifacts/static-curl.mp4');
  await page.waitForFunction(()=>!document.getElementById('compare-analyze').disabled);
  await page.locator('#compare-analyze').click();
  await page.waitForFunction(()=>document.getElementById('compare-status').textContent.includes('无法判断'),{},{timeout:90000});
  assert.equal(await page.locator('#compare-results').isVisible(),false);
  // Real cancellation and restart; closing frees the local blob URL.
  await page.locator('#compare-file').setInputFiles('assets/cable-curl-with-bar.mp4');
  await page.waitForFunction(()=>!document.getElementById('compare-analyze').disabled);
  await page.locator('#compare-analyze').click();await page.locator('#compare-cancel').click();
  await page.waitForFunction(()=>document.getElementById('compare-status').textContent.includes('已取消'));
  await page.locator('#compare-close').click();
  await page.waitForFunction(()=>!document.getElementById('compare-player').getAttribute('src'));
  assert.equal(await page.locator('#detail').isVisible(),true);
  assert.deepEqual(external,[]);assert.deepEqual(errors,[]);
  // Mock transport is isolated to this browser test; no model is contacted.
  await page.evaluate(()=>localStorage.setItem('fitguide.model.v1',JSON.stringify({enabled:true,baseUrl:'https://model.example/v1',apiKey:'local-test-key',model:'test-vision'})));
  let calls=0;
  await page.route('https://model.example/v1/chat/completions',async route=>{
   calls++;const request=route.request().postDataJSON();const images=request.messages[1].content.filter(x=>x.type==='image_url');assert.ok(images.length>=3&&images.length<=6);assert.equal(route.request().headers().authorization,'Bearer local-test-key');
   if(calls===1) return route.fulfill({status:502,json:{status:'error',message:'测试：模型服务暂不可用'}});
   return route.fulfill({json:{choices:[{finish_reason:'stop',message:{content:JSON.stringify({summary:'测试返回：动作与示例较接近。',tips:[{start:.4,end:1.2,metricId:'armDrift',observation:'观察到轻微上臂移动。',adjustment:'试着保持上臂稳定。'}],uncertainties:['关键帧不能反映全部回程。'],disagreements:[]})}}]}});
  });
  await page.locator('.compare-entry').click();
  await page.locator('#comparison-dialog').waitFor({state:'visible'});
  await page.locator('#compare-file').setInputFiles('assets/cable-curl-with-bar.mp4');
  await page.waitForFunction(()=>!document.getElementById('compare-analyze').disabled);await page.locator('#compare-analyze').click();
  await page.waitForFunction(()=>!document.getElementById('compare-results').hidden,{},{timeout:90000});
  await page.locator('#guidance-generate').click();await page.waitForFunction(()=>document.getElementById('guidance-status').textContent.includes('请求失败'));
  assert.equal(await page.locator('#guidance-generate').isEnabled(),true);
  await page.locator('#guidance-generate').click();await page.locator('.guidance-tip').waitFor();assert.equal(calls,2);
  await page.locator('[data-guidance-time]').click();
  await page.waitForFunction(()=>document.getElementById('compare-player').currentTime>=.39);
  await page.setViewportSize({width:1440,height:1100});
  await page.locator('#comparison-dialog').evaluate(el=>el.scrollTop=el.scrollHeight);
  await page.screenshot({path:path.join(output,'comparison-guidance-desktop-test.png')});
  assert.deepEqual(errors,[]);
  console.log('PASS: real local pose extraction; three reference metrics; static-video rejection; cancel/restart; timestamp playback; local media cleanup; disconnected model sends nothing; mocked model error/retry/success; mobile layout; no external requests or page errors.');
 }finally{await browser.close();app.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

