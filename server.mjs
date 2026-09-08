import http from 'node:http';
import {stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {generateGuidance,readConfig,GuidanceError} from './server/guidance.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.task':'application/octet-stream','.jpg':'image/jpeg','.mp4':'video/mp4','.zip':'application/zip','.txt':'text/plain; charset=utf-8'};
const publicFiles=new Set(['index.html','style.css','data.js','extra-data.js','training.js','guide.js','plans.js','checkin-stats.js','dashboard.js','guidance-status.json','gym-guide-offline.zip','使用说明.txt']);
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
export function createApp({config=readConfig(),fetchImpl}={}){
  let busy=false;
  return http.createServer(async(req,res)=>{
    try{
      // Local companion server; only same-origin requests can initiate paid calls.
      const host=req.headers.host||'';
      if(!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host))return json(res,403,{error:'Host not allowed'});
      const url=new URL(req.url,`http://${host}`);
      if(url.pathname==='/guidance-status.json'&&req.method==='GET')return json(res,200,{enabled:config.enabled});
      if(url.pathname==='/api/guidance'&&req.method==='POST'){
        if(req.headers.origin!==`http://${host}`)return json(res,403,{status:'error',message:'仅允许本网页发起指导请求。'});
        if(!config.enabled)return json(res,200,{status:'not_connected'});
        if(!req.headers['content-type']?.startsWith('application/json'))return json(res,415,{status:'error',message:'需要 JSON 请求。'});
        if(busy)return json(res,429,{status:'error',message:'已有指导正在生成，请稍后重试。'});
        busy=true;
        const controller=new AbortController();
        const cancel=()=>{if(!res.writableEnded)controller.abort();};
        req.on('aborted',cancel);res.on('close',cancel);
        try{
          let size=0,parts=[];
          for await(const chunk of req){size+=chunk.length;if(size>4500000)throw new GuidanceError('too_large','请求内容过大。',413);parts.push(chunk);}
          let input;try{input=JSON.parse(Buffer.concat(parts).toString());}catch{throw new GuidanceError('invalid_input','请求格式不正确。',400);}
          const result=await generateGuidance(input,{config,signal:controller.signal,fetchImpl});
          if(!res.destroyed)json(res,200,result);
        }finally{busy=false;req.off('aborted',cancel);res.off('close',cancel);}
        return;
      }
      if(!['GET','HEAD'].includes(req.method))return json(res,405,{error:'Method not allowed'});
      let name;try{name=decodeURIComponent(url.pathname).replace(/^\//,'')||'index.html';}catch{return json(res,400,{error:'Bad path'});}
      if(name.includes('\\')||name.split('/').some(s=>s==='..'||s.startsWith('.'))||(!publicFiles.has(name)&&!['assets/','comparison/','vendor/'].some(prefix=>name.startsWith(prefix))))return json(res,404,{error:'Not found'});
      const file=path.resolve(root,name);
      if(!file.startsWith(root+path.sep))return json(res,404,{error:'Not found'});
      const info=await stat(file);if(!info.isFile())return json(res,404,{error:'Not found'});
      const headers={'Content-Type':MIME[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes','X-Content-Type-Options':'nosniff'};
      let start=0,end=info.size-1,status=200;
      if(req.headers.range){const m=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);if(!m)return json(res,416,{error:'Invalid range'});start=Number(m[1]);end=m[2]?Number(m[2]):end;if(start>end||end>=info.size)return json(res,416,{error:'Invalid range'});status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;}
      headers['Content-Length']=end-start+1;
      res.writeHead(status,headers);if(req.method==='HEAD')return res.end();
      const stream=createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
    }catch(error){if(res.destroyed)return;if(res.headersSent)return res.destroy();if(error instanceof GuidanceError)json(res,error.status,{status:'error',code:error.code,message:error.message});else json(res,error.code==='ENOENT'?404:500,{status:'error',message:'请求未完成，请稍后重试。'});}
  });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const server=createApp();server.listen(Number(process.env.PORT)||8766,'127.0.0.1',()=>console.log(`Fitguide: http://127.0.0.1:${server.address().port} · 模型指导默认关闭`));
}
