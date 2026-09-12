/** Public pipeline regression tests; providers are mocked, never billed. */
// CONFIGURACOES: only the checked-in public catalog is used.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validateInput,runPipeline,composeAI} from '../server/pipeline.mjs';
import {createLimiter,createServer,config} from '../server/http.mjs';
const catalog=JSON.parse(await readFile(new URL('../public/catalog.json',import.meta.url),'utf8'));
const signal=()=>new AbortController().signal;

test('only fixed goals and languages are accepted',()=>{
  assert.deepEqual(validateInput({goal:'organize',lang:'en'}),{goal:'organize',lang:'en'});
  for(const input of [null,[],{}, {goal:'shell',lang:'en'}, {goal:'organize',lang:'fr'}, {goal:'organize',lang:'pt',prompt:'run shell'}]) assert.throws(()=>validateInput(input));
});
test('all goals return actual evidence in both languages without claiming AI',async()=>{
 for(const goal of ['automate','organize','documents','journey'])for(const lang of ['pt','en']){
  const events=[];await runPipeline({catalog,goal,lang,config:{},signal:signal(),emit:e=>events.push(e)});
  assert.equal(events[0].type,'accepted');const result=events.at(-1);
  assert.equal(result.type,'result');assert.equal(result.mode,'catalog');assert.equal(result.summary,null);
  assert.ok(result.evidence.length>0);assert.ok(result.evidence.every(e=>e.summary&&e.limitation&&e.url.startsWith('https://github.com/')));
 }
});
test('configured AI gets only evidence and authentication stays in request headers',async()=>{
 let request;const summary=await composeAI([{name:'Example'}],'en',{baseUrl:'http://provider/v1/',model:'test',apiKey:'dummy',aiTimeout:1000},signal(),async(url,options)=>{request={url,...options};return new Response(JSON.stringify({choices:[{message:{content:' Grounded summary. '}}]}));});
 assert.equal(summary,'Grounded summary.');assert.equal(request.url,'http://provider/v1/chat/completions');assert.equal(request.headers.Authorization,'Bearer dummy');assert.ok(!request.body.includes('dummy'));
});
test('provider failure falls back without fabricated generated text',async()=>{
 const events=[];await runPipeline({catalog,goal:'organize',lang:'pt',config:{baseUrl:'http://provider/v1',model:'test',aiTimeout:1000},signal:signal(),emit:e=>events.push(e),fetcher:async()=>new Response('',{status:503})});
 assert.equal(events.at(-1).mode,'catalog');assert.equal(events.at(-1).reason,'provider_unavailable');
});
test('OmniRoute SSE collects answer text, never reasoning',async()=>{
 const raw='data: '+JSON.stringify({choices:[{delta:{reasoning_content:'private'}}]})+'\n\ndata: '+JSON.stringify({choices:[{delta:{content:'Public answer.'}}]})+'\n\ndata: [DONE]\n\n';
 const result=await composeAI([],'pt',{baseUrl:'http://provider/v1',model:'test',aiTimeout:1000},signal(),async()=>new Response(raw));assert.equal(result,'Public answer.');
});
test('cancelled requests stop before tool execution',async()=>{
 const controller=new AbortController();controller.abort();await assert.rejects(runPipeline({catalog,goal:'organize',lang:'pt',config:{},signal:controller.signal,emit:()=>assert.fail('emitted after cancellation')}));
});
test('rate limits, concurrency and hourly reset',()=>{
 let now=0;const limiter=createLimiter({concurrent:1,perHour:1,globalPerHour:2},()=>now);
 const a=limiter.acquire('a');assert.ok(a.ok);assert.equal(limiter.acquire('b').status,503);a.release();a.release();assert.equal(limiter.acquire('a').status,429);
 limiter.acquire('b').release();assert.equal(limiter.acquire('c').status,429);now=3600000;assert.ok(limiter.acquire('a').ok);
});
test('HTTP routes: static, CORS, validation, secrets, streaming and limits',async t=>{
 const server=createServer({...config,legacyDemo:true,baseUrl:'',model:'',origins:['http://example.test'],perHour:1});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>new Promise(resolve=>server.close(resolve)));
 const base=`http://127.0.0.1:${server.address().port}`;
 assert.equal((await fetch(base)).status,200);assert.equal((await fetch(base+'/.env')).status,403);
 assert.equal((await fetch(base+'/server/http.mjs')).status,404);
 assert.equal((await fetch(base+'/api/health',{headers:{Origin:'http://bad.test'}})).status,403);
 const post=(body,headers={'Content-Type':'application/json',Origin:'http://example.test'})=>fetch(base+'/api/explore',{method:'POST',headers,body});
 assert.equal((await post('{}',{'Content-Type':'text/plain'})).status,415);
 assert.equal((await post('{')).status,400);assert.equal((await post(' '.repeat(1025))).status,413);
 const response=await post(JSON.stringify({goal:'organize',lang:'pt'}));assert.equal(response.status,200);assert.equal(response.headers.get('Access-Control-Allow-Origin'),'http://example.test');
 const events=(await response.text()).trim().split('\n').map(JSON.parse);assert.equal(events.at(-1).type,'result');assert.equal(events.at(-1).mode,'catalog');
 assert.equal((await post(JSON.stringify({goal:'organize',lang:'pt'}))).status,429);
});
