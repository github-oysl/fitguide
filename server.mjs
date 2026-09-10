import http from 'node:http';
import {stat,open} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {gzipSync, brotliCompressSync, constants as zlibConstants} from 'node:zlib';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.task':'application/octet-stream','.jpg':'image/jpeg','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8'};
const publicFiles=new Set(['index.html','style.css','data.js','extra-data.js','activity-data.js','training.js','guide.js','plans.js','checkin-stats.js','dashboard.js','teachers-day.js','teachers-day.css','free-activity.js','guidance-status.json','使用说明.txt']);
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};

// 只有文本类资源值得压缩：图片、视频本身已是压缩格式，再压只会白费 CPU。
const COMPRESSIBLE=new Set(['.html','.js','.mjs','.css','.json','.txt']);
// 低于此体积压缩收益不抵开销，直接原样返回。
const COMPRESS_MIN_BYTES=1024;
// 媒体体积大、改动少，给一段时间强缓存；文本每次用 ETag 校验，命中返回无正文的 304。
const CACHE_TEXT='no-cache';
const CACHE_MEDIA='public, max-age=604800';
// 压缩结果按「文件 + mtime + 编码」缓存，避免同一份文件反复压缩。
const compressCache=new Map();
const COMPRESS_CACHE_MAX=64;

// 按 Accept-Encoding 挑一种编码：br 优先于 gzip，q=0 视为拒绝。
function pickEncoding(header){
  if(!header)return null;
  const parts=String(header).toLowerCase().split(',').map(part=>{
    const [token,...params]=part.trim().split(';');
    const q=params.map(p=>p.trim()).find(p=>p.startsWith('q='));
    return {token:token.trim(),q:q===undefined?1:Number(q.slice(2))||0};
  });
  const quality=token=>parts.find(part=>part.token===token)?.q??0;
  if(quality('br')>0)return 'br';
  if(quality('gzip')>0)return 'gzip';
  return null;
}

function compress(buffer,encoding,cacheKey){
  const cached=compressCache.get(cacheKey);
  if(cached)return cached;
  const body=encoding==='br'
    ? brotliCompressSync(buffer,{params:{[zlibConstants.BROTLI_PARAM_QUALITY]:5}})
    : gzipSync(buffer,{level:6});
  if(compressCache.size>=COMPRESS_CACHE_MAX)compressCache.clear();
  compressCache.set(cacheKey,body);
  return body;
}

// 弱 ETag：体积 + 毫秒级修改时间，文件改了就必然变化。
function makeEtag(info){return `W/"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`;}

function isFresh(req,etag,info){
  const inm=req.headers['if-none-match'];
  if(inm!==undefined){
    // 一个请求可能带多个 ETag，任意命中即可复用客户端缓存。
    return String(inm).split(',').some(tag=>tag.trim()===etag||tag.trim()==='*');
  }
  const ims=req.headers['if-modified-since'];
  if(ims){
    const since=Date.parse(ims);
    // HTTP 日期只精确到秒，比较前把 mtime 截断到秒。
    if(!Number.isNaN(since))return Math.floor(info.mtimeMs/1000)*1000<=since;
  }
  return false;
}

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
      const ext=path.extname(file);
      const isText=COMPRESSIBLE.has(ext);
      const etag=makeEtag(info);
      const headers={
        'Content-Type':MIME[ext]||'application/octet-stream',
        'Accept-Ranges':'bytes',
        'X-Content-Type-Options':'nosniff',
        'Cache-Control':isText?CACHE_TEXT:CACHE_MEDIA,
        'ETag':etag,
        'Last-Modified':info.mtime.toUTCString()
      };
      // 条件请求：客户端缓存仍有效时只回 304，不传正文。
      if(isFresh(req,etag,info)){res.writeHead(304,headers);return res.end();}

      let start=0,end=info.size-1,status=200;
      if(req.headers.range){const m=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);if(!m)return json(res,416,{error:'Invalid range'});start=Number(m[1]);end=m[2]?Number(m[2]):end;if(start>end||end>=info.size)return json(res,416,{error:'Invalid range'});status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;}

      // 只在整份返回、体积够大、且客户端接受时才压缩；Range 响应必须保持字节语义。
      const encoding=status===200&&isText&&info.size>=COMPRESS_MIN_BYTES?pickEncoding(req.headers['accept-encoding']):null;
      if(encoding){
        const handle=await open(file,'r');
        let raw;
        try{raw=await handle.readFile();}finally{await handle.close();}
        const body=compress(raw,encoding,`${file}:${info.mtimeMs}:${encoding}`);
        headers['Content-Encoding']=encoding;
        headers['Vary']='Accept-Encoding';
        headers['Content-Length']=body.length;
        res.writeHead(status,headers);
        return req.method==='HEAD'?res.end():res.end(body);
      }

      headers['Content-Length']=end-start+1;
      if(encoding===null&&status===200&&isText)headers['Vary']='Accept-Encoding';
      res.writeHead(status,headers);if(req.method==='HEAD')return res.end();
      const stream=createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
    }catch(error){if(res.destroyed)return;if(res.headersSent)return res.destroy();json(res,error.code==='ENOENT'?404:500,{status:'error',message:'请求未完成，请稍后重试。'});}
  });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const server=createApp();server.listen(Number(process.env.PORT)||8766,'127.0.0.1',()=>console.log(`Fitguide: http://127.0.0.1:${server.address().port} · 模型配置与调用均在浏览器中`));
}
