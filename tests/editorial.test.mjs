// CONFIGURACOES: regressao offline de conteudo e superficie publica.
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {createServer, config} from '../server/http.mjs';
const catalog=JSON.parse(await readFile(new URL('../public/catalog.json',import.meta.url),'utf8'));

test('positioning is bilingual, points to GitHub evidence and omits short vehicle-inspection work',async()=>{
  const [html,app,presentation]=await Promise.all([
    readFile(new URL('../public/index.html',import.meta.url),'utf8'),
    readFile(new URL('../public/app.js',import.meta.url),'utf8'),
    readFile(new URL('../public/presentation.js',import.meta.url),'utf8')
  ]);
  assert.match(app,/Automação especializada · IA aplicada · Desenvolvimento de software/);
  assert.match(app,/Specialized Automation · Applied AI · Software Development/);
  assert.match(html,/hero\.proof/);
  assert.match(html,/github\.com\/everton-soares1985/);
  for(const content of [html,app,presentation])assert.doesNotMatch(content,/Atl[aâ]ntida|Inspe[cç][aã]o [Tt]écnica [Vv]eicular|Vehicle Safety Technical Inspector/i);
});

test('every case study has bilingual delivery, architecture and honest context',()=>{
  for(const p of catalog.projects){
    assert.ok(p.url.startsWith('https://github.com/everton-soares1985/'));
    for(const lang of ['pt','en']){
      for(const field of ['summary','problem','approach','limit'])assert.ok(p[field][lang].length>15);
      for(const field of ['delivery','architecture','flow']){
        assert.equal(p[field][lang].length,3);
        assert.ok(p[field][lang].every(v=>typeof v==='string'&&v.length>2));
      }
    }
  }
  assert.match(catalog.projects.find(p=>p.id==='publisher').approach.pt,/apenas leem/);
  assert.ok(catalog.courses.filter(c=>c.status==='planned').length>0);
});

test('case screenshots refer only to existing public assets',async()=>{
  for(const p of catalog.projects){
    for(const path of [p.image,...(p.gallery||[]).map(v=>v.image)].filter(Boolean)){
      assert.ok(path.startsWith('/assets/'));
      const image=await readFile(new URL('../public'+path,import.meta.url));
      if(path.endsWith('.webp'))assert.equal(image.subarray(8,12).toString(),'WEBP');
      else assert.equal(image.subarray(1,4).toString(),'PNG');
    }
  }
});

test('Hermes is presented as a documented architecture with local media',async()=>{
  const hermes=catalog.projects.find(p=>p.id==='hermes');
  assert.equal(hermes.url,'https://github.com/everton-soares1985/hermes-autonomous-builder');
  assert.match(hermes.limit.pt,/V0 documental/);
  assert.match(hermes.limit.en,/Documentation V0/);
  const video=await readFile(new URL('../public'+hermes.localVideo,import.meta.url));
  const poster=await readFile(new URL('../public'+hermes.image,import.meta.url));
  assert.ok(video.length>10_000_000);
  assert.equal(video.subarray(4,8).toString(),'ftyp');
  assert.equal(poster.subarray(8,12).toString(),'WEBP');
});

test('Prescriptive Maintenance visual case uses eleven optimized local slides and exposes its stack',async()=>{
  const names=[
    'maintenance-01-cover.webp','maintenance-02-problem.webp','maintenance-03-workflow.webp',
    'maintenance-04-input.png','maintenance-05-inference.png','maintenance-06-similar.png',
    'maintenance-07-evidence.png','maintenance-08-architecture.webp','maintenance-09-stack.webp','maintenance-09-metrics.webp',
    'maintenance-10-safety.webp'
  ];
  for(const name of names){
    const asset=await readFile(new URL('../public/assets/'+name,import.meta.url));
    assert.ok(asset.length>50_000,name);
    if(name.endsWith('.webp'))assert.equal(asset.subarray(8,12).toString(),'WEBP');
    else assert.equal(asset.subarray(1,4).toString(),'PNG');
  }
  const app=await readFile(new URL('../public/app.js',import.meta.url),'utf8');
  assert.match(app,/const MAINTENANCE_SLIDES=\[/);
  assert.match(app,/data-case-deck/);
  assert.match(app,/RAG · TF-IDF/);
  assert.match(app,/tech-stack/);
  assert.doesNotMatch(app,/PDF Manuals → Embeddings \/ Vector DB → FastAPI \+ RAG Query/);
});

test('the approved Radar video is a local public MP4',async()=>{
  const radar=catalog.projects.find(p=>p.id==='radar');
  assert.equal(radar.localVideo,'/assets/global-builder-radar-demo.mp4');
  const video=await readFile(new URL('../public'+radar.localVideo,import.meta.url));
  assert.ok(video.length>1_000_000);
  assert.equal(video.subarray(4,8).toString(),'ftyp');
});

test('the assembled Publisher video and poster are local public assets',async()=>{
  const publisher=catalog.projects.find(p=>p.id==='publisher');
  assert.equal(publisher.localVideo,'/assets/github-project-publisher-demo.mp4');
  assert.equal(publisher.image,'/assets/github-project-publisher-poster.png');
  const video=await readFile(new URL('../public'+publisher.localVideo,import.meta.url));
  assert.ok(video.length>3_000_000);
  assert.equal(video.subarray(4,8).toString(),'ftyp');
});

test('the public resumes are the approved replacements',async()=>{
  const english=await readFile(new URL('../public/downloads/Everton-Soares-EN.pdf',import.meta.url));
  const portuguese=await readFile(new URL('../public/downloads/Everton-Soares-PT.pdf',import.meta.url));
  assert.equal(createHash('sha256').update(english).digest('hex'),'c7052dc8846313a68659b9644b4b81a7c97745f960900a1d9f4b3711ef26d7e3');
  assert.equal(createHash('sha256').update(portuguese).digest('hex'),'83f3e879816df5844c74e0fd630cb7d3d975b27add3886e9171ca7c58e8b9335');
});

test('Executive mock is self-hosted and contains no inline code or external fonts',async()=>{
  const html=await readFile(new URL('../public/mocks/concept-2-executive.html',import.meta.url),'utf8');
  assert.doesNotMatch(html,/<style|\sstyle=|\sonclick=|fonts\.googleapis|fonts\.gstatic/);
  assert.match(html,/href="\/mocks\/executive.css"/);
  assert.doesNotMatch(html,/Sistemas construídos para não quebrar|homologação ANAC|Especialista no desenvolvimento/);
});

test('server permits only the privacy-enhanced video frame and keeps AI disabled',async()=>{
  const server=createServer({...config,legacyDemo:false,host:'127.0.0.1'});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try{
    const base=`http://127.0.0.1:${server.address().port}`;
    const response=await fetch(base);
    assert.match(response.headers.get('content-security-policy'),/frame-src https:\/\/www.youtube-nocookie.com;/);
    assert.doesNotMatch(response.headers.get('content-security-policy'),/unsafe-inline/);
    assert.equal((await fetch(base+'/api/health').then(r=>r.json())).aiConfigured,false);
    assert.equal((await fetch(base+'/api/explore',{method:'POST'})).status,410);
    const video=await fetch(base+'/assets/global-builder-radar-demo.mp4',{method:'HEAD'});
    assert.equal(video.status,200);
    assert.equal(video.headers.get('content-type'),'video/mp4');
  }finally{await new Promise(resolve=>server.close(resolve));}
});
