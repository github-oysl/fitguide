import {EXERCISE_ID,METRICS,analyzeFrames,compare} from './core.mjs';
import {extractPoses,openVideo,captureEvidence} from './video.mjs';
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const seconds=n=>`${n.toFixed(1)}s`;
let dialog,trigger,source,report,template,controller,guidanceController,generation=0,enabled=false,mode='user';
function shell(){
  dialog=document.createElement('dialog');dialog.id='comparison-dialog';dialog.setAttribute('aria-labelledby','comparison-title');
  dialog.innerHTML=`<div class="dialog-top"><span>动作对比 · 试用</span><button type="button" id="compare-close" aria-label="关闭动作对比">×</button></div>
  <div class="comparison-body"><p class="eyebrow">MOVE WITH INTENTION</p><h2 id="comparison-title">看看这一次，练得怎么样。</h2><p class="comparison-lede">直杆绳索弯举 · 侧面拍摄</p>
  <div class="capture-note"><b>让动作看得清</b><p>手机固定在身体侧面，肩、肘、腕、髋部完整入镜。只拍一个人，从手臂伸展开始，弯举后回到起点，录制 2–3 次。</p><small>1–30 秒 · 最大 50 MB · 视频在本地分析，不会自动上传</small></div>
  <div class="compare-upload"><label class="upload-button" for="compare-file">选择我的视频<input id="compare-file" type="file" accept="video/mp4,video/webm,video/quicktime"></label><span id="compare-file-name">支持浏览器可播放的 MP4 / WebM</span></div>
  <div id="compare-player-wrap" hidden><div class="playback-tabs" role="group" aria-label="切换回放"><button type="button" data-playback="user" aria-pressed="true">我的动作</button><button type="button" data-playback="reference" aria-pressed="false">参考动作</button></div><video id="compare-player" controls playsinline preload="metadata" aria-label="动作回放"></video></div>
  <div class="compare-actions"><button type="button" class="start-button" id="compare-analyze" disabled>开始分析</button><button type="button" class="text-link" id="compare-cancel" hidden>取消分析</button></div>
  <div class="analysis-status" role="status" aria-live="polite"><p id="compare-status">选择视频后开始。结果只表示与参考示例的差异。</p><progress id="compare-progress" max="100" value="0" hidden aria-label="视频分析进度"></progress></div>
  <section id="compare-results" hidden><div class="section-heading"><h3>动作对比</h3><span id="compare-reps"></span></div><p class="comparison-disclaimer">试验性对比：当前阈值用于展示与单个参考示例的差异，尚未经过人群验证，不代表动作合格或不合格。</p><div id="compare-metrics"></div><div id="compare-segments"></div><div class="basic-guidance"><b>基础提示 <small>来自代码规则</small></b><ul id="compare-basic-tips"></ul></div>
  <section class="model-guidance" aria-labelledby="guidance-title"><div class="section-heading"><h3 id="guidance-title">进一步指导</h3><span id="guidance-badge">大模型未接入</span></div><p id="guidance-status" role="status" aria-live="polite">当前使用本地对比和基础提示。</p><button type="button" class="start-button" id="guidance-generate" hidden>发送关键帧并生成指导</button><button type="button" class="text-link" id="guidance-cancel" hidden>取消生成</button><div id="guidance-content"></div></section></section></div>`;
  document.body.append(dialog);
  document.getElementById('compare-close').onclick=()=>dialog.close();
  dialog.addEventListener('close',cleanup);
  document.getElementById('compare-file').addEventListener('change',selectFile);
  document.getElementById('compare-analyze').onclick=startAnalysis;
  document.getElementById('compare-cancel').onclick=()=>controller?.abort();
  document.querySelectorAll('[data-playback]').forEach(button=>button.onclick=()=>setPlayback(button.dataset.playback));
  document.getElementById('guidance-generate').onclick=requestGuidance;
  document.getElementById('guidance-cancel').onclick=()=>guidanceController?.abort();
}
const el=id=>document.getElementById(id);
function stop(){controller?.abort();guidanceController?.abort();controller=null;guidanceController=null;generation++;}
function cleanup(){stop();const player=el('compare-player');player.pause();player.removeAttribute('src');player.load();if(source)URL.revokeObjectURL(source);source=null;report=null;trigger?.focus({preventScroll:true});}
function setPlayback(value,time=0){
  mode=value;const player=el('compare-player');player.pause();player.src=value==='reference'?'assets/cable-curl-with-bar.mp4':source;
  player.onloadedmetadata=()=>{player.currentTime=Math.min(time,Math.max(0,player.duration-.01));};
  document.querySelectorAll('[data-playback]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.playback===value)));
}
function clearReport(){report=null;el('compare-results').hidden=true;el('guidance-content').replaceChildren();el('guidance-cancel').hidden=true;el('guidance-generate').disabled=false;el('compare-progress').hidden=true;}
async function selectFile(){
  stop();const revision=generation;clearReport();
  const file=el('compare-file').files[0];
  const player=el('compare-player');player.pause();player.removeAttribute('src');player.load();if(source)URL.revokeObjectURL(source);source=null;
  el('compare-analyze').disabled=true;el('compare-cancel').hidden=true;el('compare-player-wrap').hidden=true;
  if(!file)return;
  el('compare-file-name').textContent=file.name;
  if(file.size>50*1024*1024){el('compare-status').textContent='文件超过 50 MB，请选择更短的视频。';return;}
  source=URL.createObjectURL(file);const currentSource=source;controller=new AbortController();
  try{
    const probe=await openVideo(currentSource,controller.signal);probe.removeAttribute('src');probe.load();
    if(revision!==generation)return;
    el('compare-player-wrap').hidden=false;setPlayback('user');el('compare-analyze').disabled=false;
    el('compare-status').textContent='视频已就绪。分析会在本机完成，期间可以随时取消。';
  }catch(error){if(revision===generation)el('compare-status').textContent=error.message;}
}
function renderReport(){
  el('compare-results').hidden=false;
  el('compare-reps').textContent=`${report.repCount} 次完整往返`;
  el('compare-metrics').innerHTML=report.metrics.map(m=>`<article class="metric-row"><div><b>${escape(m.label)}</b><small>我的动作 ${m.value} ${escape(m.unit)} · 参考 ${m.reference} ${escape(m.unit)}</small></div><span class="metric-status ${m.status}">${m.status==='similar'?'接近参考':'差异较大'}</span></article>`).join('');
  el('compare-segments').innerHTML=report.segments.map((s,i)=>`<button type="button" class="segment-button" data-segment="${i}"><span>第 ${i+1} 次 · ${seconds(s.start)}–${seconds(s.end)}</span><span>${s.differences.length?`${s.differences.length} 项差异`:'查看动作'} ↗</span></button>`).join('');
  el('compare-segments').querySelectorAll('[data-segment]').forEach(button=>button.onclick=()=>{setPlayback('user',report.segments[Number(button.dataset.segment)].start);el('compare-player').focus({preventScroll:true});dialog.scrollTop=el('compare-player-wrap').offsetTop-80;});
  const tips=report.metrics.filter(m=>m.status==='different').map(m=>METRICS.find(spec=>spec.id===m.id).tip);
  el('compare-basic-tips').innerHTML=(tips.length?tips:['这几个可见指标与示例较接近。可以继续观察动作回程是否平稳；这不代表其他细节都已被检查。']).map(t=>`<li>${escape(t)}</li>`).join('');
  resetGuidance();
}
function resetGuidance(){
  el('guidance-badge').textContent=enabled?'大模型指导':'大模型未接入';
  el('guidance-status').textContent=enabled?'点击后，将发送最多 6 张带时间的关键帧和对比报告给已配置的模型服务；不发送音频或完整视频。':'当前使用本地对比和基础提示。';
  el('guidance-generate').hidden=!enabled;el('guidance-content').replaceChildren();
}
async function startAnalysis(){
  if(!source)return;
  stop();const revision=generation;controller=new AbortController();clearReport();
  el('compare-player').pause();el('compare-analyze').disabled=true;el('compare-cancel').hidden=false;el('compare-progress').hidden=false;
  try{
    if(!template){const response=await fetch('comparison/curl-reference.json',{signal:controller.signal});if(!response.ok)throw new Error('参考模板无法加载，请检查本地文件。');template=await response.json();}
    const {frames,duration}=await extractPoses(source,{signal:controller.signal,onProgress:(percent,message)=>{if(revision===generation){el('compare-progress').value=percent;el('compare-status').textContent=`${message} ${percent}%`;}}});
    if(revision!==generation)return;
    report=compare(analyzeFrames(frames,duration),template);
    if(!report.quality.usable){el('compare-status').textContent=`无法判断：${report.quality.reason}`;report=null;return;}
    renderReport();el('compare-status').textContent=`分析完成 · 有效姿态覆盖 ${Math.round(report.quality.coverage*100)}% · 未上传视频`;
  }catch(error){if(revision===generation)el('compare-status').textContent=error.name==='AbortError'?'已取消分析，可以重新开始。':error.message;}
  finally{if(revision===generation){el('compare-analyze').disabled=!source;el('compare-analyze').textContent='重新分析';el('compare-cancel').hidden=true;el('compare-progress').hidden=true;}}
}
async function requestGuidance(){
  if(!report||!source||!enabled)return;
  const revision=generation;guidanceController=new AbortController();
  el('guidance-generate').disabled=true;el('guidance-cancel').hidden=false;el('guidance-content').replaceChildren();el('guidance-status').textContent='正在准备关键帧并生成指导…';
  const timeout=setTimeout(()=>guidanceController?.abort(new Error('timeout')),45000);
  try{
    const frames=await captureEvidence(source,report,{signal:guidanceController.signal});
    const response=await fetch('/api/guidance',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({report,frames}),signal:guidanceController.signal});
    const data=await response.json();
    if(revision!==generation)return;
    if(data.status==='not_connected'){enabled=false;resetGuidance();return;}
    if(!response.ok||data.status!=='completed')throw new Error(data.message||'指导生成失败，请重试。');
    renderGuidance(data.guidance);el('guidance-status').textContent='指导已生成 · 基于关键帧与代码报告';
  }catch(error){if(revision===generation)el('guidance-status').textContent=guidanceController.signal.aborted?(guidanceController.signal.reason?.message==='timeout'?'生成超时，可以重试。':'已取消生成。'):error.message;}
  finally{clearTimeout(timeout);if(revision===generation){el('guidance-generate').disabled=false;el('guidance-cancel').hidden=true;}}
}
function renderGuidance(data){
  const root=el('guidance-content');
  root.innerHTML=`<p>${escape(data.summary)}</p>${data.tips.map(t=>`<article class="guidance-tip"><button type="button" class="text-link" data-guidance-time="${Number(t.start)}">${seconds(t.start)}–${seconds(t.end)} ↗</button><p>${escape(t.observation)}</p><b>${escape(t.adjustment)}</b></article>`).join('')}${data.uncertainties.length?`<p class="guidance-uncertain">尚不能判断：${data.uncertainties.map(escape).join('；')}</p>`:''}${data.disagreements.map(d=>`<p class="guidance-uncertain">与代码判断不同（${escape(METRICS.find(m=>m.id===d.metricId)?.label||d.metricId)}）：${escape(d.reason)}</p>`).join('')}`;
  root.querySelectorAll('[data-guidance-time]').forEach(button=>button.onclick=()=>{setPlayback('user',Number(button.dataset.guidanceTime));dialog.scrollTop=el('compare-player-wrap').offsetTop-80;});
}
export async function openComparison(origin){
  if(!dialog)shell();trigger=origin;stop();clearReport();
  el('compare-file').value='';el('compare-file-name').textContent='支持浏览器可播放的 MP4 / WebM';el('compare-player-wrap').hidden=true;el('compare-analyze').disabled=true;el('compare-analyze').textContent='开始分析';el('compare-cancel').hidden=true;
  el('compare-status').textContent='选择视频后开始。结果只表示与参考示例的差异。';
  document.querySelectorAll('video').forEach(video=>video.pause());dialog.showModal();dialog.scrollTop=0;
  enabled=false;
  const revision=generation;
  try{const response=await fetch('guidance-status.json');if(response.ok){const config=await response.json();if(revision===generation){enabled=config.enabled===true;if(report)resetGuidance();}}}catch{/* Static/offline mode keeps guidance disconnected. */}
}
