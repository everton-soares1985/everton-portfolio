/** Local demonstration, calendar validation and disabled AI regression checks. */
// CONFIGURACOES: offline fixtures only; no provider calls.
import test from 'node:test';
import assert from 'node:assert/strict';
import {processRecords,SAMPLE,terminalTarget} from '../public/demonstration.js';
import {validActivity,resumeLinks} from '../public/studio.js';
import {createServer,config} from '../server/http.mjs';

test('sample validates, deduplicates, and sorts without mutating source',()=>{
  const result=processRecords(JSON.stringify(SAMPLE));
  assert.equal(result.input,5);assert.equal(result.valid,4);
  assert.equal(result.duplicates,1);assert.deepEqual(result.rejected,[5]);
  assert.deepEqual(result.output.map(r=>r.priority),[1,2,3]);
  assert.equal(SAMPLE[2].title,'  organizar documentos  ');
});
test('demo handles invalid JSON, schema, empty list and limits',()=>{
  for(const value of ['{','{}','null',JSON.stringify(Array(101).fill({})),'x'.repeat(12001)])assert.throws(()=>processRecords(value));
  assert.deepEqual(processRecords('[]').output,[]);
  assert.equal(processRecords('[null,{}, {"title":"a","area":"b","priority":4}]').rejected.length,3);
  assert.equal(processRecords('[{"title":"<script>","area":"b","priority":1}]').output[0].title,'<script>');
});
test('terminal only recognizes explicit local destinations',()=>{
  assert.equal(terminalTarget(' Projetos '),'projects');
  for(const value of ['rm -rf /','javascript:alert(1)','curl https://example.com','projects; demo'])assert.equal(terminalTarget(value),null);
});
test('activity schema rejects invalid color levels and markup',()=>{
  assert.ok(validActivity({contributions:[{date:'2026-09-01',count:3,level:2}]}));
  assert.ok(!validActivity({contributions:[{date:'<img>',count:3,level:2}]}));
  assert.ok(!validActivity({contributions:[{date:'2026-09-01',count:3,level:6}]}));
  assert.ok(!validActivity({contributions:[]}));
  assert.ok(resumeLinks('pt').includes('Everton-Soares-PT.pdf'));
  assert.ok(resumeLinks('en').includes('Everton-Soares-EN.pdf'));
});
test('default preview blocks old AI endpoint and serves genuine PDF downloads',async t=>{
  const server=createServer({...config,legacyDemo:false});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const base=`http://127.0.0.1:${server.address().port}`;
  assert.equal((await fetch(base+'/api/explore',{method:'POST'})).status,410);
  assert.equal((await (await fetch(base+'/api/health')).json()).aiConfigured,false);
  for(const lang of ['PT','EN']){
    const response=await fetch(`${base}/downloads/Everton-Soares-${lang}.pdf`);
    assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'application/pdf');
    assert.equal((await response.text()).slice(0,4),'%PDF');
  }
});
