function waitEvent(target, event, signal, action) {
  return new Promise((resolve,reject)=>{
    const cleanup=()=>{clearTimeout(timer);target.removeEventListener(event,success);target.removeEventListener('error',failure);signal?.removeEventListener('abort',abort);};
    const success=()=>{cleanup();resolve();};
    const failure=()=>{cleanup();reject(new Error('无法读取视频，请使用浏览器支持的 MP4 或 WebM 文件。'));};
    const abort=()=>{cleanup();reject(new DOMException('已取消','AbortError'));};
    const timer=setTimeout(failure,15000);
    target.addEventListener(event,success,{once:true});target.addEventListener('error',failure,{once:true});signal?.addEventListener('abort',abort,{once:true});
    if(signal?.aborted) abort(); else action?.();
  });
}
export async function openVideo(source, signal) {
  const video=document.createElement('video');video.muted=true;video.playsInline=true;video.preload='auto';
  try {
    await waitEvent(video,'loadeddata',signal,()=>{video.src=source;video.load();});
    if(!Number.isFinite(video.duration)||video.duration<1||video.duration>30.1) throw new Error('请选择 1–30 秒的视频，包含 2–3 次完整动作。');
    return video;
  } catch(error) { video.removeAttribute('src');video.load();throw error; }
}
export async function seek(video,time,signal) {
  signal?.throwIfAborted();
  const target=Math.min(Math.max(0,time),Math.max(0,video.duration-.01));
  if(Math.abs(video.currentTime-target)<.001 && video.readyState>=2) return;
  await waitEvent(video,'seeked',signal,()=>{video.currentTime=target;});
  if(Math.abs(video.currentTime-target)>.15) throw new Error('视频无法定位到指定时间，请重新选择文件或使用支持分段读取的网页服务。');
}
export async function extractPoses(source,{signal,onProgress=()=>{}}={}) {
  if(location.protocol==='file:') throw new Error('视频分析需要通过本地网页服务打开。请按使用说明启动网页后重试。');
  const video=await openVideo(source,signal);
  const worker=new Worker(new URL('./pose-worker.mjs',import.meta.url),{type:'module'});
  let nextId=0;
  const pending=new Map();
  const fail=error=>{for(const job of pending.values()){clearTimeout(job.timer);job.reject(error);}pending.clear();};
  const abort=()=>{worker.terminate();fail(new DOMException('已取消','AbortError'));};
  signal?.addEventListener('abort',abort,{once:true});
  worker.onerror=()=>fail(new Error('姿态模型加载失败，请检查本地模型文件和浏览器兼容性。'));
  worker.onmessage=({data})=>{const job=pending.get(data.id);if(!job)return;clearTimeout(job.timer);pending.delete(data.id);data.error?job.reject(new Error(data.error)):job.resolve(data);};
  const send=(message,transfer=[])=>new Promise((resolve,reject)=>{
    if(signal?.aborted){reject(new DOMException('已取消','AbortError'));return;}
    const id=++nextId,timer=setTimeout(()=>{pending.delete(id);reject(new Error('分析超时，请缩短视频后重试。'));},60000);
    pending.set(id,{resolve,reject,timer});worker.postMessage({...message,id},transfer);
  });
  try {
    onProgress(0,'正在加载本地姿态模型…');
    await send({type:'init'});
    const width=Math.round(video.videoWidth*Math.min(1,640/Math.max(video.videoWidth,video.videoHeight))),height=Math.round(video.videoHeight*Math.min(1,640/Math.max(video.videoWidth,video.videoHeight)));
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
    const context=canvas.getContext('2d');
    const frames=[],count=Math.floor((video.duration-.01)*5)+1;
    for(let i=0;i<count;i++) {
      signal?.throwIfAborted();
      const time=i/5;await seek(video,time,signal);context.drawImage(video,0,0,width,height);
      const bitmap=await createImageBitmap(canvas);
      const result=await send({type:'frame',bitmap,time},[bitmap]);
      frames.push({time,width,height,points:result.points,people:result.people});
      onProgress(Math.round((i+1)/count*100),'正在分析动作…');
    }
    return {frames,duration:video.duration};
  } finally {signal?.removeEventListener('abort',abort);worker.terminate();fail(new DOMException('已结束','AbortError'));video.removeAttribute('src');video.load();}
}
export async function captureEvidence(source,report,{signal}={}) {
  const video=await openVideo(source,signal);
  try {
    const candidate=[...report.segments.filter(s=>s.differences.length),...report.segments];
    const times=[...new Set(candidate.flatMap(s=>[s.start,s.peak,s.end]).map(t=>Math.round(t*10)/10))].slice(0,6).sort((a,b)=>a-b);
    const scale=Math.min(1,640/Math.max(video.videoWidth,video.videoHeight));
    const canvas=document.createElement('canvas');canvas.width=Math.round(video.videoWidth*scale);canvas.height=Math.round(video.videoHeight*scale);
    const context=canvas.getContext('2d'),frames=[];
    for(const time of times){await seek(video,time,signal);context.drawImage(video,0,0,canvas.width,canvas.height);frames.push({time,dataUrl:canvas.toDataURL('image/jpeg',.75)});}
    return frames;
  } finally {video.removeAttribute('src');video.load();}
}
