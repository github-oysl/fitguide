export const EXERCISE_ID = 'cable-curl-with-bar';
export const VERSION = 'curl-side-v1';
const median = values => quantile(values, .5);
const quantile = (values, p) => { const sorted = [...values].sort((a,b) => a-b); return sorted[Math.floor((sorted.length-1)*p)]; };
const range = values => Math.max(...values) - Math.min(...values);
const round = value => Math.round(value * 100) / 100;
const visible = point => point && Number.isFinite(point.x) && Number.isFinite(point.y) && (point.visibility ?? 0) >= .6 && (point.presence ?? 1) >= .6;
function angle(a,b,c) {
  const u = [a.x-b.x,a.y-b.y], v = [c.x-b.x,c.y-b.y];
  const norm = Math.hypot(...u) * Math.hypot(...v);
  return norm > 0 ? Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/norm))) * 180 / Math.PI : NaN;
}
export function features(frames) {
  const sides = [[11,13,15,23],[12,14,16,24]];
  const scores = sides.map(ids => frames.filter(f => ids.every(i => visible(f.points?.[i]))).length);
  const ids = sides[scores[0] >= scores[1] ? 0 : 1];
  return frames.map(frame => {
    if (!ids.every(i => visible(frame.points?.[i]))) return null;
    const points = frame.points.map(p => ({...p,x:p.x*frame.width,y:p.y*frame.height}));
    const [shoulder,elbow,wrist,hip] = ids.map(i => points[i]);
    const torso = Math.hypot(shoulder.x-hip.x,shoulder.y-hip.y);
    if (torso < frame.height * .08) return null;
    const otherShoulder = points[ids[0] === 11 ? 12 : 11];
    const sideRatio = visible(otherShoulder) ? Math.abs(otherShoulder.x-shoulder.x)/torso : null;
    const result = {time:frame.time, elbow:angle(shoulder,elbow,wrist), torso:Math.atan2(shoulder.x-hip.x,hip.y-shoulder.y)*180/Math.PI, armX:(elbow.x-shoulder.x)/torso, armY:(elbow.y-shoulder.y)/torso, sideRatio};
    return Object.values(result).every(v => v === null || Number.isFinite(v)) ? result : null;
  });
}
export function segmentReps(samples) {
  const good = samples.filter(Boolean);
  if (good.length < 8) return [];
  const smoothed = good.map((s,i) => ({...s,elbow:median(good.slice(Math.max(0,i-1),i+2).map(x=>x.elbow))}));
  const low = quantile(smoothed.map(s=>s.elbow),.1), high = quantile(smoothed.map(s=>s.elbow),.9);
  if (high-low < 35) return [];
  const extended = low + (high-low)*.78, flexed = low + (high-low)*.25;
  const reps = [];
  let start = null, contracted = false;
  for (let i=0;i<smoothed.length;i++) {
    const s = smoothed[i];
    if (i && s.time-smoothed[i-1].time > .65) { start=null; contracted=false; }
    if (start === null) { if (s.elbow >= extended) start=i; continue; }
    if (!contracted && s.elbow >= smoothed[start].elbow) start=i;
    if (s.elbow <= flexed) contracted=true;
    if (contracted && s.elbow >= extended) {
      let end = i;
      for (let j=i+1;j<smoothed.length;j++) {
        if (smoothed[j].time-smoothed[j-1].time>.65 || smoothed[j].elbow<smoothed[end].elbow-6) break;
        if (smoothed[j].elbow>=smoothed[end].elbow) end=j;
      }
      const slice = smoothed.slice(start,end+1), duration=smoothed[end].time-slice[0].time;
      i=end;
      if (duration >= .8 && duration <= 15 && slice.length >= 5) {
        const bottom=slice.reduce((best,item,index)=>item.elbow<slice[best].elbow?index:best,0);
        reps.push({start:slice[0].time,peak:slice[bottom].time,end:smoothed[end].time, samples:slice,
          elbowRange:range(slice.map(x=>x.elbow)), armDrift:Math.hypot(range(slice.map(x=>x.armX)),range(slice.map(x=>x.armY))), torsoSway:range(slice.map(x=>x.torso))});
      }
      start=i; contracted=false;
    }
  }
  return reps;
}
function interpolate(samples, field, time) {
  const right=samples.findIndex(s=>s.time>=time);
  if (right<=0) return samples[right<0?samples.length-1:0][field];
  const a=samples[right-1],b=samples[right];
  return a[field]+(b[field]-a[field])*(time-a.time)/(b.time-a.time);
}
export function normalizeRep(rep) {
  return Array.from({length:21},(_,i)=>{
    const time=i<=10?rep.start+(rep.peak-rep.start)*i/10:rep.peak+(rep.end-rep.peak)*(i-10)/10;
    return {phase:i/20,elbow:round(interpolate(rep.samples,'elbow',time)),torso:round(interpolate(rep.samples,'torso',time))};
  });
}
export function analyzeFrames(frames, duration) {
  const samples=features(frames), good=samples.filter(Boolean), coverage=good.length/(frames.length||1);
  const viewSamples=good.filter(s=>s.sideRatio!==null), sideFraction=viewSamples.filter(s=>s.sideRatio<.65).length/(viewSamples.length||1);
  const reps=segmentReps(samples);
  let reason='';
  if (coverage<.75) reason='肩、肘、腕或髋部被遮挡。请固定手机，确保这些关节完整入镜。';
  else if (viewSamples.length<good.length*.5 || sideFraction<.75) reason='拍摄角度无法确认。请从身体侧面拍摄，避免正面或大幅斜拍。';
  else if (!reps.length) reason='没有识别到完整弯举。请从手臂伸展开始，弯举后回到起点，录制 2–3 次。';
  return {samples,reps,quality:{usable:!reason,coverage:round(coverage),reason},duration};
}
export function makeTemplate(analysis, source) {
  if (!analysis.quality.usable) throw new Error(analysis.quality.reason);
  const metrics=Object.fromEntries(['elbowRange','armDrift','torsoSway'].map(id=>[id,round(median(analysis.reps.map(r=>r[id])))]));
  return {exerciseId:EXERCISE_ID,version:VERSION,view:'side',source,sampleFps:5,referenceReps:analysis.reps.length,metrics,trajectory:normalizeRep(analysis.reps[0]),quality:analysis.quality};
}
export const METRICS = [
  {id:'elbowRange',label:'弯举幅度',unit:'°',tolerance:20,tip:'对照回放检查起点和收缩位置，在舒适、可控制的范围内完成动作。'},
  {id:'armDrift',label:'上臂位移',unit:'倍躯干长度',tolerance:.15,tip:'尝试让上臂留在身侧，观察肘部是否跟随手向前移动。'},
  {id:'torsoSway',label:'躯干晃动',unit:'°',tolerance:10,tip:'留意起身或后仰借力，下一组尝试减轻重量并保持躯干稳定。'}
];
export function compare(analysis, template) {
  if (template.version!==VERSION || template.exerciseId!==EXERCISE_ID) throw new Error('参考模板版本不匹配');
  const report={version:1,exerciseId:EXERCISE_ID,templateVersion:VERSION,duration:analysis.duration,quality:analysis.quality,repCount:analysis.reps.length,metrics:[],segments:[]};
  if (!analysis.quality.usable) return report;
  report.metrics=METRICS.map(metric=>{
    const value=round(median(analysis.reps.map(r=>r[metric.id]))), reference=template.metrics[metric.id];
    return {id:metric.id,label:metric.label,unit:metric.unit,value,reference,tolerance:metric.tolerance,status:Math.abs(value-reference)<=metric.tolerance?'similar':'different',confidence:analysis.quality.coverage};
  });
  report.segments=analysis.reps.map(rep=>({start:round(rep.start),peak:round(rep.peak),end:round(rep.end),differences:METRICS.filter(m=>Math.abs(rep[m.id]-template.metrics[m.id])>m.tolerance).map(m=>m.id),trajectory:normalizeRep(rep)}));
  return report;
}
