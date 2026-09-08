const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.QA_CHROMIUM});
 try {
  const page=await browser.newPage();
  page.on('console',m=>console.log(m.type(),m.text().slice(0,350)));
  page.on('pageerror',e=>console.error(e));
  await page.goto(process.env.QA_URL || 'http://127.0.0.1:8766');
  const result=await page.evaluate(async()=>{
    const {extractPoses}=await import('./comparison/video.mjs');
    const core=await import('./comparison/core.mjs');
    const {frames,duration}=await extractPoses('assets/cable-curl-with-bar.mp4',{onProgress:(n)=>{if(n%25===0)console.log('pose',n);}});
    const analysis=core.analyzeFrames(frames,duration);
    return {frames,analysis,template:analysis.quality.usable?core.makeTemplate(analysis,'assets/cable-curl-with-bar.mp4'):null};
  });
  fs.mkdirSync('test-artifacts',{recursive:true});
  fs.writeFileSync('test-artifacts/reference-analysis.json',JSON.stringify(result,null,2));
  console.log(JSON.stringify({quality:result.analysis.quality,reps:result.analysis.reps.map(r=>({start:r.start,peak:r.peak,end:r.end,rom:r.elbowRange})),template:result.template},null,2));
  if(!result.template)throw new Error('Reference failed quality gate');
  fs.writeFileSync('comparison/curl-reference.json',JSON.stringify(result.template,null,2)+'\n');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
