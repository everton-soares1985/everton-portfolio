// CONFIGURACOES: regressao visual focada da interface Signal / Build no Edge.
import {createRequire} from 'node:module';
import {mkdir,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4317';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();
page.setDefaultTimeout(12000);
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
const activitySnapshot=await readFile(new URL('../public/github-activity.json',import.meta.url),'utf8');
await page.route('https://github-contributions-api.jogruber.de/**',route=>route.fulfill({status:200,contentType:'application/json',body:activitySnapshot}));
await mkdir('artifacts/final-2026-09-15',{recursive:true});

async function open(route,{width=1440,theme='dark',lang='pt'}={}){
  await page.setViewportSize({width,height:900});
  await page.goto(`${base}/#${route}`,{waitUntil:'domcontentloaded'});
  await page.evaluate(({lang,theme})=>{localStorage.setItem('sig-lang',lang);localStorage.setItem('sig-theme',theme);},{lang,theme});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForSelector('.view.active');
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow ${width} ${route}`);
  assert.equal(await page.locator('.view.active h1').count(),1,`one visible h1 ${route}`);
}

try{
  for(const width of [1440,390,320]){
    for(const theme of ['dark','light']){
      for(const route of ['home','projects','project/focus','project/maintenance','project/hermes','education','library','about','contact']){
        await open(route,{width,theme,lang:width===320?'en':'pt'});
      }
    }
  }

  await open('library');
  assert.deepEqual(await page.locator('.view.active .edu-count').allTextContents(),['1','74','11']);
  assert.equal(await page.locator('.view.active .book').count(),86);
  assert.equal(await page.locator('.view.active .book-carousel').count(),3);
  const readGroup=page.locator('.view.active .edu-group[data-status="done"]');
  const carousel=readGroup.locator('.book-carousel');
  const before=await carousel.evaluate(element=>element.scrollLeft);
  await readGroup.locator('[data-carousel-next]').click();await page.waitForTimeout(500);
  const afterNext=await carousel.evaluate(element=>element.scrollLeft);
  assert.ok(afterNext>before,'carousel next button');
  await carousel.focus();await page.keyboard.press('ArrowLeft');await page.waitForTimeout(500);
  assert.ok(await carousel.evaluate((element,start)=>element.scrollLeft<start,afterNext),'carousel keyboard');

  await open('education');
  const google=page.locator('.view.active .course-details').filter({hasText:'Google IT Automation with Python'});
  await google.locator('summary').click();assert.equal(await google.getAttribute('open'),'');
  assert.equal(await google.locator('.course-modules li').count(),6);
  const ibm=page.locator('.view.active .course-details').filter({hasText:'IBM AI Developer Professional Certificate'});
  await ibm.locator('summary').click();assert.equal(await ibm.locator('.course-modules li').count(),10);
  assert.equal(await page.locator('.view.active .edu-group[data-status="done"] .course-details').count(),7);
  assert.equal(await page.locator('.view.active .edu-group[data-status="doing"] .course-details').count(),2);
  assert.equal(await page.locator('.view.active .edu-group[data-status="planned"] .course-details').count(),3);
  assert.equal(await page.locator('.view.active .course-details').count(),12);
  const make=page.locator('.view.active .course-details').filter({hasText:'AI Automation Explorer'});
  await make.locator('summary').click();
  assert.equal(await make.locator('a[href="https://www.credly.com/badges/f7e0e0bb-2d78-414c-9cbf-e13776702e32/"]').count(),1);
  const aws=page.locator('.view.active .course-details').filter({hasText:'AWS Generative AI and AI Agents with Amazon Bedrock'});
  await aws.locator('summary').click();
  assert.equal(await aws.locator('a[href="https://www.coursera.org/account/accomplishments/verify/1MO2XPYJ9BLW"]').count(),1);

  await open('project/focus');
  assert.equal(await page.locator('.view.active video source[src="/assets/focus-cockpit-demo.mp4"]').count(),1);
  const videoResponse=await page.request.head(`${base}/assets/focus-cockpit-demo.mp4`);
  assert.equal(videoResponse.status(),200);assert.equal(videoResponse.headers()['content-type'],'video/mp4');

  await open('project/maintenance');
  assert.equal(await page.locator('.view.active [data-deck-slide]').count(),11);
  assert.equal(await page.locator('.view.active .tech-stack span').count(),10);
  assert.equal(await page.locator('.view.active .tech-stack').getByText('RAG · TF-IDF',{exact:true}).count(),1);
  assert.equal(await page.locator('.view.active [data-deck-slide].active img').getAttribute('src'),'/assets/maintenance-01-cover.webp');
  await page.locator('.view.active [data-deck-next]').click();
  assert.equal(await page.locator('.view.active [data-deck-current]').textContent(),'02');
  await page.locator('.view.active [data-case-deck]').focus();await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('.view.active [data-deck-current]').textContent(),'03');
  await page.locator('.view.active [data-deck-dot="6"]').click();
  assert.equal(await page.locator('.view.active [data-deck-current]').textContent(),'07');
  await page.locator('.view.active [data-deck-slide].active button').click();
  assert.equal(await page.locator('#lightbox.open').count(),1);
  await page.locator('#lbClose').click();

  await open('projects');
  const maintenancePreview=page.locator('.view.active [data-project-slides]');
  assert.equal(await maintenancePreview.locator('[data-project-slide-next]').count(),1);
  assert.equal(await maintenancePreview.locator('[data-project-slide-prev]').count(),1);
  assert.equal(await maintenancePreview.locator('[data-project-slide-current]').textContent(),'01');
  await maintenancePreview.locator('[data-project-slide-next]').click();
  assert.equal(await maintenancePreview.locator('[data-project-slide-current]').textContent(),'02');
  assert.equal(await maintenancePreview.locator('[data-project-slide-img]').getAttribute('src'),'/assets/maintenance-02-problem.webp');
  const focusPreview=page.locator('.view.active [data-project-video]').filter({has:page.locator('source[src="/assets/focus-cockpit-demo.mp4"]')});
  await focusPreview.hover();
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-project-video]')].some(frame=>frame.querySelector('source[src="/assets/focus-cockpit-demo.mp4"]')&&frame.classList.contains('is-playing')));
  const publisherPreview=page.locator('.view.active [data-project-video]').filter({has:page.locator('source[src="/assets/github-project-publisher-demo.mp4"]')});
  await publisherPreview.hover();
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-project-video]')].some(frame=>frame.querySelector('source[src="/assets/github-project-publisher-demo.mp4"]')&&frame.classList.contains('is-playing')));

  await open('project/publisher');
  assert.equal(await page.locator('.view.active video source[src="/assets/github-project-publisher-demo.mp4"]').count(),1);
  assert.equal(await page.locator('.view.active .term-block').count(),1);
  const publisherVideoResponse=await page.request.head(`${base}/assets/github-project-publisher-demo.mp4`);
  assert.equal(publisherVideoResponse.status(),200);assert.equal(publisherVideoResponse.headers()['content-type'],'video/mp4');

  await open('project/hermes');
  assert.equal(await page.locator('.view.active video source[src="/assets/hermes-autonomous-builder-demo.mp4"]').count(),1);
  assert.match(await page.locator('.view.active .detail-summary').textContent(),/Arquitetura V0/);
  assert.match(await page.locator('.view.active .limit-note').textContent(),/runtime autônomo ainda não foi implementado/);
  const hermesVideoResponse=await page.request.head(`${base}/assets/hermes-autonomous-builder-demo.mp4`);
  assert.equal(hermesVideoResponse.status(),200);assert.equal(hermesVideoResponse.headers()['content-type'],'video/mp4');

  await open('contact');
  assert.equal(await page.locator('.contact-grid a').count(),10);
  assert.equal(await page.locator('a[href*="CryptoFrontier"],a[href*="instagram.com"]').count(),2);

  await open('about');
  assert.equal(await page.locator('.tl-item').count(),4);
  assert.equal(await page.getByText('Inspetor Técnico de Segurança Veicular Júnior').count(),0);
  await page.locator('.tl-toggle').first().click();assert.equal(await page.locator('.tl-item.open').count(),1);
  assert.equal(await page.locator('.timeline').evaluate(element=>getComputedStyle(element,'::after').animationName),'timelineSweep');
  await open('home');
  assert.equal(await page.locator('.signal-rail').evaluate(element=>getComputedStyle(element,'::after').animationName),'signalSweep');

  for(const [route,width] of [['home',1440],['projects',1440],['library',1440],['education',1440],['about',1440],['project/focus',1440],['project/maintenance',1440],['project/publisher',1440],['project/hermes',1440],['project/hermes',390],['project/maintenance',390],['library',390]]){
    await open(route,{width,theme:'dark'});
    await page.screenshot({path:`artifacts/final-2026-09-15/${width}-dark-${route.replace('/','-')}.png`,fullPage:true});
  }

  for(const [route,width] of [['home',1440],['library',1440],['library',390]]){
    await open(route,{width,theme:'light'});
    await page.screenshot({path:`artifacts/final-2026-09-15/${width}-light-${route.replace('/','-')}.png`,fullPage:true});
  }

  await open('education',{width:1440,theme:'light'});
  await page.locator('.view.active .course-details').filter({hasText:'Google IT Automation with Python'}).locator('summary').click();
  await page.screenshot({path:'artifacts/final-2026-09-15/1440-light-education-open.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS: responsive views, 86-book carousel, five-project editorial, Maintenance slide deck, local project videos, four-item timeline, and curated contact links.');
}finally{
  await browser.close();
}
