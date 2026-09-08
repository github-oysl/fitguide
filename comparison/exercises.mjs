import {segmentReps,normalizeRep} from './core.mjs';
const groups={
 knee:['leg-press','leg-extension-seated','leg-curl-seated'],
 shoulder:['straight-arm-lat-pulldown','cable-lateral-raise','lateral-raise-machine'],
 spread:['cable-chest-fly','machine-chest-fly','cable-incline-chest-fly','reverse-cable-fly'],
 hip:['cable-crunch'],abduction:['hip-abduction-machine'],ankle:['calf-raise-in-leg-press']
};
export function profileFor(id){
 const kind=Object.keys(groups).find(k=>groups[k].includes(id))||'elbow';
 const front=['spread','abduction'].includes(kind)||['cable-lateral-raise','lateral-raise-machine'].includes(id);
 return {kind,view:front?'正面（与示范一致）':'与示范相同的角度',label:({knee:'膝关节幅度',shoulder:'上臂抬起幅度',spread:'双臂开合幅度',hip:'躯干与大腿夹角幅度',abduction:'双腿开合幅度',ankle:'踝关节幅度',elbow:'肘关节幅度'})[kind]};
}
const visible=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&(p.visibility??0)>=.6&&(p.presence??1)>=.6;
const angle=(a,b,c)=>{const x=[a.x-b.x,a.y-b.y],y=[c.x-b.x,c.y-b.y];return Math.acos(Math.max(-1,Math.min(1,(x[0]*y[0]+x[1]*y[1])/(Math.hypot(...x)*Math.hypot(...y)))))*180/Math.PI;};
const median=a=>[...a].sort((a,b)=>a-b)[Math.floor(a.length/2)];
export function analyzeExercise(frames,duration,id){
 const profile=profileFor(id);
 const indices=side=>{const [s,e,w,h,k,a,f]=side;return profile.kind==='knee'?[h,k,a]:profile.kind==='shoulder'?[h,s,e]:profile.kind==='hip'?[s,h,k]:profile.kind==='ankle'?[k,a,f]:[s,e,w];};
 const sides=[[11,13,15,23,25,27,31],[12,14,16,24,26,28,32]];
 const required=side=>[...new Set([...indices(side),side[0],side[3],...(profile.kind==='spread'?[15,16]:profile.kind==='abduction'?[25,26,24]:[])])];
 const side=sides.sort((a,b)=>frames.filter(f=>required(b).every(i=>visible(f.points?.[i]))).length-frames.filter(f=>required(a).every(i=>visible(f.points?.[i]))).length)[0];
 const samples=frames.map(frame=>{
  if(frame.people>1||!required(side).every(i=>visible(frame.points?.[i])))return null;
  const p=frame.points.map(p=>({...p,x:p.x*frame.width,y:p.y*frame.height}));
  const s=p[side[0]],h=p[side[3]],torso=Math.hypot(s.x-h.x,s.y-h.y);
  if(torso<frame.height*.08)return null;
  let motion=angle(...indices(side).map(i=>p[i]));
  if(profile.kind==='spread')motion=Math.hypot(p[15].x-p[16].x,p[15].y-p[16].y)/torso*45;
  if(profile.kind==='abduction')motion=angle(p[25],{x:(p[23].x+p[24].x)/2,y:(p[23].y+p[24].y)/2},p[26]);
  const other=p[side[0]===11?12:11];
  const ratio=visible(other)?Math.abs(other.x-s.x)/torso:null;
  if(ratio===null)return null;
  const sample={time:frame.time,elbow:motion,torso:Math.atan2(s.x-h.x,h.y-s.y)*180/Math.PI,armX:0,armY:0,viewRatio:ratio};
  return Object.values(sample).every(Number.isFinite)?sample:null;
 });
 const good=samples.filter(Boolean),coverage=good.length/(frames.length||1);
 // Scale only cycle detection, then restore measured amplitudes and trajectories.
 const scale=profile.kind==='ankle'?4:2;
 const cycles=sign=>segmentReps(samples.map(s=>s&&({...s,elbow:sign*s.elbow*scale})));
 const options=[cycles(1),cycles(-1)];const reps=options[0].length>=options[1].length?options[0]:options[1];
 for(const rep of reps){rep.samples=good.filter(s=>s.time>=rep.start&&s.time<=rep.end);rep.elbowRange/=scale;rep.armDrift=rep.end-rep.start;}
 let reason=coverage<.75?`可见关节或拍摄角度不符合要求。请从${profile.view}拍摄，完整露出全身，保持单人入镜。`:!reps.length?'未识别到完整往返，请录制 2–3 次完整动作，保持镜头固定。':'';
 return {samples,reps,duration,quality:{usable:!reason,coverage,reason},exerciseId:id,viewRatio:good.length?median(good.map(s=>s.viewRatio)):null};
}
export function compareExercise(analysis,reference,id){
 const profile=profileFor(id);
 const specs=[{id:'elbowRange',label:profile.label,unit:profile.kind==='spread'?'投影单位':'°',tolerance:20},{id:'armDrift',label:'每次动作时长',unit:'秒',tolerance:1},{id:'torsoSway',label:'躯干角度变化',unit:'°',tolerance:10}];
 const report={version:1,exerciseId:id,templateVersion:'exercise-projection-v1',duration:analysis.duration,quality:analysis.quality,repCount:analysis.reps.length,metrics:[],segments:[]};
 if(!analysis.quality.usable)return report;
 if(Math.abs(analysis.viewRatio-reference.viewRatio)>.3)throw new Error('拍摄角度与参考示范差异较大，请调整机位后重拍，或使用双视频人工对照。');
 if(!reference.quality.usable)throw new Error('此示范视频未通过姿态质量检查，请使用参考回放人工对照；暂不生成数值结论。');
 report.metrics=specs.map(m=>{const value=median(analysis.reps.map(r=>r[m.id])),ref=median(reference.reps.map(r=>r[m.id]));return {...m,value:+value.toFixed(2),reference:+ref.toFixed(2),confidence:analysis.quality.coverage,status:Math.abs(value-ref)<=m.tolerance?'similar':'different'};});
 report.segments=analysis.reps.map(r=>({start:r.start,peak:r.peak,end:r.end,trajectory:normalizeRep(r),differences:report.metrics.filter(m=>Math.abs(r[m.id]-m.reference)>m.tolerance).map(m=>m.id)}));
 return report;
}
