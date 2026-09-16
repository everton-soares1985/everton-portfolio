/** Static portfolio + isolated, bounded NDJSON demonstration API. Node 22+. */
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {validateInput,runPipeline} from './pipeline.mjs';

// CONFIGURACOES: credentials stay in process environment, never public assets.
const root=path.resolve(fileURLToPath(new URL('../public/',import.meta.url)));
const bounded=(value,fallback,min,max)=>{const n=Number(value);return Number.isInteger(n)&&n>=min&&n<=max?n:fallback;};
const port=bounded(process.env.PORT,4317,1,65535);
export const config={
  legacyDemo:process.env.ENABLE_LEGACY_AI_DEMO==='true',
  host:process.env.HOST||'127.0.0.1',port,
  origins:(process.env.PUBLIC_ORIGIN||`http://localhost:${port},http://127.0.0.1:${port}`).split(',').map(s=>s.trim()),
  baseUrl:process.env.OMNIROUTE_BASE_URL||'',apiKey:process.env.OMNIROUTE_API_KEY||'',model:process.env.OMNIROUTE_MODEL||'',
  aiTimeout:bounded(process.env.AI_TIMEOUT_MS,20000,1000,30000),
  concurrent:bounded(process.env.MAX_CONCURRENT_RUNS,2,1,10),perHour:bounded(process.env.RUNS_PER_HOUR,6,1,100),globalPerHour:bounded(process.env.GLOBAL_RUNS_PER_HOUR,30,1,1000),trustProxy:process.env.TRUST_PROXY==='true'
};
const log=(level,event,extra={})=>process.stdout.write(JSON.stringify({time:new Date().toISOString(),level,event,...extra})+'\n');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.pdf':'application/pdf','.ttf':'font/ttf'};

export function createLimiter(settings,now=Date.now){
  const visitors=new Map();let hourStart=now(),globalCount=0,active=0;
  return {acquire(key){const time=now();if(time-hourStart>=3600000){globalCount=0;hourStart=time;visitors.clear();}
    if(active>=settings.concurrent)return {ok:false,status:503};
    if(globalCount>=settings.globalPerHour||(visitors.get(key)||0)>=settings.perHour)return {ok:false,status:429};
    globalCount++;visitors.set(key,(visitors.get(key)||0)+1);active++;let released=false;
    return {ok:true,release(){if(!released){active--;released=true;}}};
  }};
}

export function createServer(settings=config){
 const limiter=createLimiter(settings);
 return http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self' https:; frame-src https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  const json=(code,obj)=>{res.writeHead(code,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(obj));};
  try{
   const url=new URL(req.url,'http://localhost');
   if(url.pathname.startsWith('/api/')){
    const origin=req.headers.origin;
    if(origin&&!settings.origins.includes(origin))return json(403,{error:'ORIGIN_NOT_ALLOWED'});
    if(origin){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');}
    if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Methods':'POST, GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type'});return res.end();}
    if(url.pathname==='/api/health'&&req.method==='GET')return json(200,{status:'ok',aiConfigured:Boolean(settings.legacyDemo&&settings.baseUrl&&settings.model)});
    if(url.pathname!=='/api/explore'||req.method!=='POST')return json(404,{error:'NOT_FOUND'});
    if(!settings.legacyDemo)return json(410,{error:'AI_DEMO_DISABLED'});
    if(!req.headers['content-type']?.startsWith('application/json'))return json(415,{error:'JSON_REQUIRED'});
    let input='',bytes=0;
    for await (const chunk of req){bytes+=chunk.length;if(bytes>1024){json(413,{error:'INPUT_TOO_LARGE'});req.resume();return;}input+=chunk.toString();}
    let body;try{body=validateInput(JSON.parse(input));}catch{return json(400,{error:'INVALID_INPUT'});}
    const address=settings.trustProxy ? req.headers['x-real-ip']||req.socket.remoteAddress : req.socket.remoteAddress;
    const key=createHash('sha256').update(String(address)).digest('hex');
    const permit=limiter.acquire(key);if(!permit.ok){res.setHeader('Retry-After','3600');return json(permit.status,{error:permit.status===429?'RATE_LIMITED':'BUSY'});}
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),35000);
    res.on('close',()=>controller.abort());
    res.writeHead(200,{'Content-Type':'application/x-ndjson; charset=utf-8','Cache-Control':'no-store','X-Accel-Buffering':'no'});res.flushHeaders();
    try{
      const catalog=JSON.parse(await readFile(path.join(root,'catalog.json'),'utf8'));
      const result=await runPipeline({catalog,...body,config:settings,signal:controller.signal,emit:e=>res.write(JSON.stringify(e)+'\n')});
      log('info','explore_complete',{goal:body.goal,mode:result.mode});
    }catch{if(!res.destroyed)res.write(JSON.stringify({type:'error',error:'RUN_FAILED'})+'\n');log('warn','explore_stopped');}
    finally{clearTimeout(timeout);permit.release();res.end();}return;
   }
   if(!['GET','HEAD'].includes(req.method))return json(405,{error:'METHOD_NOT_ALLOWED'});
   let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{return json(400,{error:'INVALID_PATH'});}
   const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
   if(!file.startsWith(root+path.sep)&&file!==path.join(root,'index.html'))return json(403,{error:'FORBIDDEN'});
   if(pathname.split(/[\\/]/).some(p=>p.startsWith('.')))return json(403,{error:'FORBIDDEN'});
   try{const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);}
   catch{return json(404,{error:'NOT_FOUND'});}
  }catch{if(!res.headersSent)json(500,{error:'INTERNAL_ERROR'});else res.end();log('error','request_failed');}
 });
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 const server=createServer();server.requestTimeout=15000;server.headersTimeout=10000;
 server.listen(config.port,config.host,()=>log('info','listening',{url:`http://${config.host}:${config.port}`,aiConfigured:Boolean(config.baseUrl&&config.model)}));
}
