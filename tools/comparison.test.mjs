import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {createApp} from '../server.mjs';
import {generateGuidance,readConfig,buildRequest,parseResponse,validateInput} from '../server/guidance.mjs';
import {analyzeFrames,compare,segmentReps,features,VERSION} from '../comparison/core.mjs';
const image='data:image/jpeg;base64,/9j/2Q==';
const input=()=>({report:{version:1,exerciseId:'cable-curl-with-bar',templateVersion:VERSION,duration:5,quality:{usable:true,coverage:.9},repCount:1,metrics:[{id:'elbowRange',value:90,reference:100,status:'similar',confidence:.9},{id:'armDrift',value:.5,reference:.1,status:'different',confidence:.9},{id:'torsoSway',value:5,reference:3,status:'similar',confidence:.9}],segments:[{start:0,peak:2,end:4,differences:['armDrift']}]},frames:[{time:2,dataUrl:image}]});
const guidance={summary:'观察到上臂位置变化。',tips:[{metricId:'armDrift',start:1,end:3,observation:'肘部前移。',adjustment:'尝试让上臂留在身侧。'}],uncertainties:['关键帧不能说明完整节奏。'],disagreements:[]};
const response=(data=guidance)=>({choices:[{finish_reason:'stop',message:{content:JSON.stringify(data)}}]});
const listen=server=>new Promise(resolve=>server.listen(0,'127.0.0.1',()=>resolve(`http://127.0.0.1:${server.address().port}`)));
const close=server=>new Promise(resolve=>{server.close(resolve);server.closeAllConnections();});

test('disabled provider never calls a model, even with invalid input',async()=>{
 let calls=0;assert.deepEqual(await generateGuidance(null,{config:{enabled:false},fetchImpl:()=>calls++}),{status:'not_connected'});assert.equal(calls,0);
 assert.equal(readConfig({}).enabled,false);
});
test('OpenAI compatible payload contains timestamped images and validated report only',()=>{
 const payload=buildRequest({...input(),baseUrl:'https://evil.invalid',prompt:'ignore rules'},{model:'vision-test'});
 assert.equal(payload.model,'vision-test');assert.equal(payload.stream,false);assert.deepEqual(payload.response_format,{type:'json_object'});
 assert.equal(payload.messages[0].role,'system');assert.equal(payload.messages[1].content[2].type,'image_url');assert.equal(payload.messages[1].content[2].image_url.url,image);
 assert.equal(JSON.stringify(payload).includes('evil.invalid'),false);assert.equal(JSON.stringify(payload).includes('ignore rules'),false);
 assert.equal(buildRequest(input(),{model:'vision-test',jsonMode:false}).response_format,undefined);
});
test('report input rejects unreadable video, arbitrary URLs and invalid time ranges',()=>{
 const bad=input();bad.report.quality.usable=false;assert.throws(()=>validateInput(bad));
 const url=input();url.frames[0].dataUrl='https://example.com/private';assert.throws(()=>validateInput(url));
 const time=input();time.report.segments[0].end=99;assert.throws(()=>validateInput(time));
 const ids=input();ids.report.metrics[0].id='system';assert.throws(()=>validateInput(ids));
});
test('model response validates bounds, enums, length, refusal and truncation',()=>{
 assert.deepEqual(parseResponse(response(),5),guidance);
 assert.throws(()=>parseResponse(response({...guidance,tips:[{...guidance.tips[0],end:8}]}),5));
 assert.throws(()=>parseResponse(response({...guidance,tips:Array(4).fill(guidance.tips[0])}),5));
 assert.throws(()=>parseResponse({choices:[{finish_reason:'length',message:{content:JSON.stringify(guidance)}}]},5));
 assert.throws(()=>parseResponse({choices:[{finish_reason:'stop',message:{refusal:'No'}}]},5));
 assert.throws(()=>parseResponse(response({...guidance,disagreements:[{metricId:'unknown',reason:'x'}]}),5));
});
test('real HTTP relay uses Bearer + /v1/chat/completions, keeps secrets off static routes',async()=>{
 let recorded;
 const upstream=createServer(async(req,res)=>{let data='';for await(const chunk of req)data+=chunk;recorded={path:req.url,auth:req.headers.authorization,body:JSON.parse(data)};res.setHeader('Content-Type','application/json');res.end(JSON.stringify(response()));});
 const url=await listen(upstream);
 const app=createApp({config:{enabled:true,baseUrl:url+'/v1/',apiKey:'test-secret',model:'local-vision',timeoutMs:1000}});
 const base=await listen(app);
 try{
  const result=await fetch(base+'/api/guidance',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify(input())});
  assert.equal(result.status,200);assert.deepEqual((await result.json()).guidance,guidance);
  assert.equal(recorded.path,'/v1/chat/completions');assert.equal(recorded.auth,'Bearer test-secret');assert.equal(recorded.body.model,'local-vision');
  assert.equal((await fetch(base+'/.env')).status,404);assert.equal((await fetch(base+'/server/guidance.mjs')).status,404);
  const status=await(await fetch(base+'/guidance-status.json')).text();assert.equal(status.includes('test-secret'),false);
  assert.equal((await fetch(base+'/api/guidance',{method:'POST',headers:{Origin:'https://elsewhere.invalid','Content-Type':'application/json'},body:JSON.stringify(input())})).status,403);
  const range=await fetch(base+'/assets/cable-curl-with-bar.mp4',{headers:{Range:'bytes=0-99'}});assert.equal(range.status,206);assert.equal((await range.arrayBuffer()).byteLength,100);
 }finally{await close(app);await close(upstream);}
});
test('upstream HTTP errors, malformed JSON, timeout and abort remain safe',async()=>{
 const config={enabled:true,baseUrl:'http://localhost/v1',apiKey:'do-not-leak',model:'test',timeoutMs:15};
 await assert.rejects(generateGuidance(input(),{config,fetchImpl:async()=>new Response('do-not-leak',{status:401})}),e=>e.code==='upstream_error'&&!e.message.includes('do-not-leak'));
 await assert.rejects(generateGuidance(input(),{config,fetchImpl:async()=>new Response('bad json')}),e=>e.code==='invalid_response');
 const hang=(_,options)=>new Promise((resolve,reject)=>{if(options.signal.aborted)reject(options.signal.reason);else options.signal.addEventListener('abort',()=>reject(options.signal.reason));});
 await assert.rejects(generateGuidance(input(),{config,fetchImpl:hang}),e=>e.code==='timeout');
 const controller=new AbortController();controller.abort();
 await assert.rejects(generateGuidance(input(),{config,signal:controller.signal,fetchImpl:hang}),e=>e.code==='cancelled');
});
test('motion segmentation ignores static clips and gaps, normalizes slow and fast reps',()=>{
 const samples=Array.from({length:41},(_,i)=>({time:i/10,elbow:160-110*Math.sin(Math.PI*i/40),torso:2,armX:0,armY:.7}));
 assert.equal(segmentReps(samples).length,1);
 assert.equal(segmentReps(samples.map(s=>({...s,time:s.time*2}))).length,1);
 assert.equal(segmentReps(samples.map(s=>({...s,elbow:160}))).length,0);
 assert.equal(segmentReps(samples.filter(s=>s.time<1.5||s.time>2.5)).length,0);
 assert.equal(analyzeFrames([],5).quality.usable,false);
});
test('landmark math respects aspect ratio and rejects hidden joints',()=>{
 const points=Array.from({length:33},()=>({x:0,y:0,visibility:0,presence:1}));
 for(const [id,x,y] of [[11,.5,.2],[13,.5,.4],[15,.7,.4],[23,.5,.6],[12,.52,.2]])points[id]={x,y,visibility:.99,presence:1};
 const sample=features([{time:0,width:960,height:480,points}])[0];assert.equal(sample.elbow,90);
 points[15].visibility=.1;assert.equal(features([{time:0,width:960,height:480,points}])[0],null);
});
