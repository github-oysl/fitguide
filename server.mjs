import http from 'node:http';
import {stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.task':'application/octet-stream','.jpg':'image/jpeg','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8'};
const publicFiles=new Set(['index.html','style.css','data.js','extra-data.js','training.js','guide.js','plans.js','checkin-stats.js','dashboard.js','guidance-status.json','使用说明.txt']);
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
export function createApp(){
  return http.createServer(async(req,res)=>{
    try{
      const host=req.headers.host||'localhost';
      const url=new URL(req.url,`http://${host}`);
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
    }catch(error){if(res.destroyed)return;if(res.headersSent)return res.destroy();json(res,error.code==='ENOENT'?404:500,{status:'error',message:'请求未完成，请稍后重试。'});}
  });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const server=createApp();server.listen(Number(process.env.PORT)||8766,'127.0.0.1',()=>console.log(`Fitguide: http://127.0.0.1:${server.address().port} · 模型配置与调用均在浏览器中`));
}
