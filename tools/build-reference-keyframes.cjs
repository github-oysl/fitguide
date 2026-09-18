// 离线预生成各动作标准示范的关键帧（下放起点/顶峰收缩/回放终点三个相位），
// 供大模型指导请求作为视觉对照基准，避免运行时重复提取。
// 用法：先启动本地网页服务（默认 http://127.0.0.1:8766），再运行 node tools/build-reference-keyframes.cjs
const {chromium}=require('playwright');
const fs=require('node:fs');
const PHASES=['下放起点','顶峰收缩','回放终点'];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.QA_CHROMIUM,channel:process.env.QA_CHROMIUM?undefined:'chrome'});
 try {
  const page=await browser.newPage();
  page.on('console',m=>console.log('[page]',m.text().slice(0,200)));
  page.on('pageerror',e=>console.error(e));
  await page.goto(process.env.QA_URL || 'http://127.0.0.1:8766');
  // 只处理存在本地示范视频的动作
  const ids=await page.evaluate(async()=>{
    const ok=[];
    for(const {id} of (window.GYM_DATA||[])){
      try{if((await fetch(`assets/${id}.mp4`,{method:'HEAD'})).ok)ok.push(id);}catch{}
    }
    return ok;
  });
  console.log(`发现 ${ids.length} 个带本地示范视频的动作`);
  fs.mkdirSync('assets/keyframes',{recursive:true});
  const manifest={};
  for(const id of ids){
    const result=await page.evaluate(async(id)=>{
      // 截帧不走 captureEvidence/captureFrames 的 1–30 秒时长门禁：部分参考视频更长，
      // 离线生成只需能定位与截帧。
      const capture=async(src,times)=>{
        const video=document.createElement('video');video.muted=true;video.playsInline=true;video.preload='auto';video.src=src;
        await new Promise((resolve,reject)=>{video.onloadeddata=resolve;video.onerror=()=>reject(new Error('视频加载失败'));});
        const scale=Math.min(1,640/Math.max(video.videoWidth,video.videoHeight));
        const canvas=document.createElement('canvas');canvas.width=Math.round(video.videoWidth*scale);canvas.height=Math.round(video.videoHeight*scale);
        const context=canvas.getContext('2d'),frames=[];
        for(const time of times){
          video.currentTime=Math.min(Math.max(0,time),Math.max(0,video.duration-.01));
          await new Promise(resolve=>{video.addEventListener('seeked',resolve,{once:true});});
          context.drawImage(video,0,0,canvas.width,canvas.height);
          frames.push({time,dataUrl:canvas.toDataURL('image/jpeg',.75)});
        }
        video.removeAttribute('src');video.load();
        return frames;
      };
      let times=null;
      try {
        const {extractPoses}=await import('./comparison/video.mjs');
        const {frames,duration}=await extractPoses(`assets/${id}.mp4`,{onProgress:n=>{if(n%25===0)console.log(id,'pose',n);}});
        const {analyzeExercise}=await import('./comparison/exercises.mjs');
        const reps=analyzeExercise(frames,duration,id).reps||[];
        const rep=reps.length?reps[reps.length>1?1:0]:null;
        times=rep?[rep.start,rep.peak,rep.end].map(t=>Math.round(t*10)/10):[.2,.5,.8].map(r=>Math.round(duration*r*10)/10);
      } catch(error) {
        // 姿态分析失败时回退：仅读时长，按 20%/50%/80% 均匀采样
        console.warn(id,'姿态分析不可用，改为均匀采样',String(error).slice(0,120));
        const video=document.createElement('video');video.muted=true;video.preload='metadata';video.src=`assets/${id}.mp4`;
        await new Promise((resolve,reject)=>{video.onloadeddata=resolve;video.onerror=()=>reject(new Error('视频加载失败'));});
        times=[.2,.5,.8].map(r=>Math.round(video.duration*r*10)/10);
        video.removeAttribute('src');video.load();
      }
      const frames=await capture(`assets/${id}.mp4`,times);
      return {frames,times};
    },id);
    const entries=result.frames.map((frame,i)=>{
      const file=`assets/keyframes/${id}-${i+1}.jpg`;
      fs.writeFileSync(file,Buffer.from(frame.dataUrl.split(',')[1],'base64'));
      return {time:result.times[i],phase:PHASES[i]||null,src:file};
    });
    manifest[id]={frames:entries};
    console.log(id,'→',entries.map(e=>`${e.phase}@${e.time}s`).join(' '));
  }
  fs.writeFileSync('comparison/reference-keyframes.json',JSON.stringify(manifest,null,2)+'\n');
  console.log(`已生成 ${Object.keys(manifest).length} 个动作的标准关键帧 → comparison/reference-keyframes.json`);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
