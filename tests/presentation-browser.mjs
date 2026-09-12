// CONFIGURACOES: teste local, navegador Edge e artefatos de verificacao.
import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();
const errors=[];let aiRequests=0;
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(r.url().includes('/api/explore'))aiRequests++;});
await mkdir('artifacts/approved-design',{recursive:true});
try{
 await page.goto('http://127.0.0.1:4317/');
 await page.waitForSelector('.hero');
 for(const width of [1440,390,320]){
  await page.setViewportSize({width,height:900});
  for(const theme of ['dark','light']){
   await page.evaluate(t=>{document.documentElement.dataset.theme=t;localStorage.setItem('es-theme',t);},theme);
   for(const route of ['home','projects','project/focus','courses','library','about','terminal','videos']){
    await page.goto(`http://127.0.0.1:4317/#${route}`);
    await page.waitForSelector('main');
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow ${width} ${theme} ${route}`);
    assert.equal(await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0)),true,`image ${route}`);
    if(width!==320&&['home','about','terminal','projects'].includes(route))await page.screenshot({path:`artifacts/approved-design/${width}-${theme}-${route}.png`,fullPage:true});
   }
  }
 }
 await page.setViewportSize({width:1440,height:900});
 await page.goto('http://127.0.0.1:4317/#terminal');
 await page.locator('[data-command=projects]').click();
 await page.locator('#terminal-output a').filter({hasText:'Focus Cockpit'}).waitFor();
 const input=page.locator('#terminal-command');
 await input.fill('<img src=x onerror=alert(1)>');await input.press('Enter');
 assert.equal(await page.locator('#terminal-output img').count(),0);
 await input.press('ArrowUp');assert.equal(await input.inputValue(),'<img src=x onerror=alert(1)>');
 await input.fill('res');await input.press('Tab');assert.equal(await input.inputValue(),'resume');await input.press('Enter');
 const download=page.waitForEvent('download');await page.locator('#terminal-output a[download]').click();assert.match((await download).suggestedFilename(),/PT.pdf$/);
 await page.goto('http://127.0.0.1:4317/#about');await page.locator('.timeline summary').first().click();assert.equal(await page.locator('.timeline details[open]').count(),1);
 await page.locator('[data-lang=en]').click();assert.equal(await page.locator('html').getAttribute('lang'),'en');
 const enDownload=page.waitForEvent('download');await page.locator('main a[download]').click();assert.match((await enDownload).suggestedFilename(),/EN.pdf$/);
 await page.goto('http://127.0.0.1:4317/#library');await page.locator('#book-search').fill('Deep Work');assert.equal(await page.locator('#book-grid article').count(),1);await page.locator('[data-book]').click();assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);await page.locator('#close').click();
 await page.goto('http://127.0.0.1:4317/#home');await page.locator('#theme').click();assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(23, 23, 25)');await page.locator('#theme').click();assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(240, 231, 219)');
 await page.setViewportSize({width:390,height:844});await page.locator('#menu').click();await page.locator('#nav a[href="#projects"]').click();await page.locator('.grid').waitFor();
 assert.equal(aiRequests,0);assert.deepEqual(errors,[]);
 console.log('PASS: 48 responsive views, images, themes, terminal, history, autocomplete, XSS, PDFs PT/EN, timeline, books and mobile navigation. No AI requests.');
}finally{await browser.close();}
