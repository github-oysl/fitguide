const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.QA_CHROMIUM||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
 try {
  const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(process.env.QA_URL||'http://127.0.0.1:8765/?fresh=1#library');
  await p.locator('.exercise-card').last().waitFor();
  for(const id of ['treadmill-walk-jog','treadmill-incline-walk','jump-rope-basic','home-crunch']){
   const card=p.locator(`.exercise-card[data-id="${id}"]`);
   assert.ok(await card.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0));
   await card.locator('.play').click();
   await p.waitForFunction(id=>document.querySelector(`[data-id="${id}"] video`)?.currentTime>0,id);
   await card.locator('.detail-button').click();
   await p.waitForFunction(()=>document.querySelector('#detail video')?.currentTime>0);
   assert.ok(await card.locator('video').evaluate(v=>v.paused));
   assert.ok(!(await p.locator('#detail').innerText()).includes('从轻重量'));
   assert.ok((await p.locator('#detail .source-links').innerText()).includes('FitnessProgramer'));
   assert.equal((await p.request.get(new URL(await p.locator('#detail a[download]').getAttribute('href'),p.url()).href)).status(),200);
   await p.locator('#close-detail').click();
   await p.waitForFunction(()=>!document.querySelector('#detail video[src]'));
  }
  fs.mkdirSync('test-artifacts',{recursive:true});
  await p.locator('#lessons').screenshot({path:'test-artifacts/cardio-desktop.png'});
  await p.locator('[data-category="cardio"]').click();
  assert.equal(await p.locator('.exercise-card').count(),3);
  await p.setViewportSize({width:390,height:844});
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.locator('.exercise-card').first().screenshot({path:'test-artifacts/cardio-mobile.png'});
  await p.locator('#lessons .detail-button').first().click();
  assert.ok(await p.locator('#detail').evaluate(e=>e.scrollWidth<=e.clientWidth));
  await p.locator('#close-detail').click();
  await p.locator('[data-category="core"]').click();
  assert.equal(await p.locator('[data-id="home-crunch"]').count(),1);
  assert.deepEqual(errors,[]);
  console.log('PASS: four local demos, pause/close, downloads and sources, cardio/core filters, desktop/mobile layout; no page errors.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});


