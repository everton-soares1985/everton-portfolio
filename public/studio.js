// CONFIGURACOES: fontes publicas, PDFs existentes e cache de seis horas.
const GITHUB_URL='https://github-contributions-api.jogruber.de/v4/everton-soares1985?y=last';
const CACHE_KEY='es-github-v1', CACHE_TTL=6*60*60*1000;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const i=name=>`<i data-lucide="${name}" aria-hidden="true"></i>`;
const tr=(lang,pt,en)=>lang==='pt'?pt:en;
const ext=(url,label)=>`<a class="text-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}${i('arrow-up-right')}</a>`;
const words=(value,lang)=>esc(value?.[lang]??value);
export function resumeLinks(lang,compact=false) {
  return `<a class="${compact?'icon-button resume-nav':'button primary'}" href="/downloads/Everton-Soares-${lang.toUpperCase()}.pdf" download title="${tr(lang,'Baixar currículo','Download resume')} · ${lang.toUpperCase()}" aria-label="${tr(lang,'Baixar currículo','Download resume')} · ${lang.toUpperCase()}">${i('download')}${compact?'':tr(lang,'Baixar currículo','Download resume')}</a>`;
}

function projectPreview(p,lang,withVideo=false) {
  if(withVideo&&p.localVideo) return `<div class="project-video" data-hover-video><video muted loop playsinline preload="metadata" poster="${esc(p.image)}" aria-label="${esc(p.name)} · ${tr(lang,'demonstração do projeto','project demonstration')}"><source src="${esc(p.localVideo)}" type="video/mp4"></video><span class="video-hint">${i('play')}${tr(lang,'Passe o mouse para assistir','Hover to watch')}</span></div>`;
  if(p.image) return `<img class="project-media" src="${esc(p.image)}" alt="${esc(p.name)} · ${tr(lang,'captura da aplicação','application screenshot')}" width="800" height="480" loading="lazy">`;
  if(p.id==='maintenance') return `<div class="architecture-art rag-art"><span class="architecture-caption">${tr(lang,'Arquitetura demonstrativa','Demonstration architecture')}</span><div class="rag-flow"><span>${tr(lang,'Manuais PDF','PDF manuals')}</span>${i('arrow-right')}<span>Embeddings<br>Vector DB</span>${i('arrow-right')}<span>FastAPI<br>RAG Query</span></div><div class="rag-code"><span>Python</span><span>RAG</span><span>FastAPI</span><span>Vector Search</span></div></div>`;
  if(p.id==='publisher') return `<div class="architecture-art terminal-art"><div class="terminal-art-bar"><span></span><span></span><span></span><small>publisher / audit</small></div><code><b>$</b> publisher check ./project<br><em>✓</em> repository structure<br><em>✓</em> documentation<br><em>✓</em> sensitive-file checks<br><strong>READY FOR HUMAN REVIEW</strong></code></div>`;
  const diagram=p.id==='maintenance'?['files','search','message-square-text']:['folder-git-2','list-checks','file-check-2'];
  return `<div class="architecture-art"><span class="architecture-caption">${tr(lang,'Fluxo conceitual','Conceptual flow')}</span><div class="architecture-steps">${diagram.map((name,index)=>`<div class="architecture-step"><span class="architecture-node">${i(name)}</span><small>${esc(p.flow?.[lang]?.[index]||'')}</small></div>${index<2?i('arrow-right'):''}`).join('')}</div></div>`;
}

export function projectVisual(p,state,labels) {
  const lang=state.lang,t=labels[lang];
  return `<article class="project-card project-${esc(p.id)}"><a class="project-preview" href="#project/${p.id}" aria-label="${t.details}: ${esc(p.name)}">${projectPreview(p,lang,true)}<span class="preview-open">${i('arrow-up-right')}</span></a><div class="project-copy"><div class="project-meta"><span>${t[p.category]}</span><span>${tr(lang,'Projeto independente','Independent project')}</span></div><h3><a href="#project/${p.id}">${esc(p.name)}</a></h3><p>${words(p.summary,lang)}</p><div class="tags">${p.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div><div class="card-bottom"><a class="text-link" href="#project/${p.id}">${tr(lang,'Estudo de caso','Case study')}${i('arrow-right')}</a>${p.localVideo?`<a class="text-link" href="#videos">${i('play')}${tr(lang,'Demo','Demo')}</a>`:ext(p.url,`<span class="sr-only">GitHub ${esc(p.name)}</span>${i('github')}`)}</div></div></article>`;
}

export function featuredProject(p,state,labels,index) {
  const lang=state.lang,t=labels[lang];
  const caption=p.localVideo?tr(lang,'Demonstração do projeto · reprodução no hover','Project demonstration · plays on hover'):p.image?tr(lang,'Interface real do projeto','Actual project interface'):tr(lang,'Arquitetura do projeto','Project architecture');
  return `<article class="featured-case"><div class="feature-media"><a class="project-preview" href="#project/${p.id}" aria-label="${t.details}: ${esc(p.name)}">${projectPreview(p,lang,true)}<span class="preview-open">${i('arrow-up-right')}</span></a><span class="feature-caption">${caption}</span></div><div class="feature-copy"><div class="project-meta"><span>0${index+1} / ${t[p.category]}</span><span>${tr(lang,'Projeto independente','Independent project')}</span></div><h3><a href="#project/${p.id}">${esc(p.name)}</a></h3><p class="feature-summary">${words(p.summary,lang)}</p><dl class="case-breakdown"><div><dt>${tr(lang,'Problema','Problem')}</dt><dd>${words(p.problem,lang)}</dd></div><div><dt>${tr(lang,'Entrega','Delivery')}</dt><dd>${esc(p.delivery?.[lang]?.[0]||'')}</dd></div></dl><div class="tags">${p.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div><div class="case-actions"><a class="button primary" href="#project/${p.id}">${tr(lang,'Conhecer o projeto','Explore the project')}${i('arrow-up-right')}</a>${ext(p.url,`${i('github')}GitHub`)}${p.localVideo?`<a class="text-link" href="#videos">${i('play')}${tr(lang,'Ver em ação','Watch it work')}</a>`:''}</div></div></article>`;
}

export function projectDetail(p,state,labels) {
  const lang=state.lang,t=labels[lang];
  if(!p) return `<div class="page-header"><span class="eyebrow">404</span><h1>${tr(lang,'Projeto não encontrado','Project not found')}</h1><a class="button" href="#projects">${i('arrow-left')}${t.projects}</a></div>`;
  const tabs=[['overview',tr(lang,'Visão geral','Overview')],['technical',tr(lang,'Como funciona','How it works')],...(p.image||p.localVideo?[['media',tr(lang,'Imagens e demo','Images & demo')]]:[])];
  const gallery=p.gallery||[{image:p.image,label:{pt:p.name,en:p.name}}];
  return `<div class="project-detail">
    <a class="text-link back-link" href="#projects">${i('arrow-left')}${t.projects}</a>
    <header class="page-header"><span class="eyebrow">${t[p.category]} / ${tr(lang,'Projeto independente','Independent project')}</span><h1>${esc(p.name)}<span class="accent">.</span></h1><p>${words(p.summary,lang)}</p><div class="actions">${ext(p.url,`${i('github')}${t.source}`)}${p.localVideo?`<a class="button primary" href="#videos">${i('play')}${t.video}</a>`:''}</div></header>
    <div class="case-tabs" role="tablist" aria-label="${tr(lang,'Detalhes do projeto','Project details')}">${tabs.map(([key,label],index)=>`<button role="tab" id="tab-${key}" data-case-tab aria-controls="panel-${key}" aria-selected="${index===0}" tabindex="${index===0?0:-1}">${label}</button>`).join('')}</div>
    <section class="case-panel" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" tabindex="0">
      <div class="case-overview"><div class="case-preview">${projectPreview(p,lang)}${p.mediaNote?`<p class="media-note">${words(p.mediaNote,lang)}</p>`:''}</div><div class="case-overview-copy"><span class="eyebrow">01 / ${tr(lang,'Contexto','Context')}</span><h2>${t.problem}</h2><p>${words(p.problem,lang)}</p><h2>${tr(lang,'O que entreguei','What I delivered')}</h2><ul class="delivery-list">${(p.delivery?.[lang]||[]).map(v=>`<li>${i('check')}${esc(v)}</li>`).join('')}</ul></div></div>
      <div class="case-boundary"><span>${i('info')}${t.limits}</span><p>${words(p.limit,lang)}</p></div>
    </section>
    <section class="case-panel" id="panel-technical" role="tabpanel" aria-labelledby="tab-technical" tabindex="0" hidden>
      <div class="technical-layout"><div><span class="eyebrow">02 / ${tr(lang,'Construção','Building')}</span><h2>${t.approach}</h2><p>${words(p.approach,lang)}</p><ol class="technical-steps">${(p.architecture?.[lang]||[]).map(v=>`<li>${esc(v)}</li>`).join('')}</ol>${ext(p.url,tr(lang,'Consultar o código e a documentação','Read the code and documentation'))}</div><aside><span class="eyebrow">${tr(lang,'Tecnologias','Technologies')}</span><div class="tags">${p.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div><div class="system-flow">${(p.flow?.[lang]||[]).map((v,index)=>`<div><span>0${index+1}</span>${esc(v)}</div>`).join('')}</div></aside></div>
    </section>
    ${p.image||p.localVideo?`<section class="case-panel" id="panel-media" role="tabpanel" aria-labelledby="tab-media" tabindex="0" hidden>${p.localVideo?`<video class="case-video" controls playsinline preload="metadata" poster="${esc(p.image)}"><source src="${esc(p.localVideo)}" type="video/mp4"></video>`:''}${p.image?`<figure class="case-gallery"><img id="gallery-image" src="${esc(p.image)}" alt="${esc(p.name)}"><figcaption>${words(p.mediaNote,lang)}</figcaption></figure><div class="gallery-controls" role="group" aria-label="${tr(lang,'Capturas da aplicação','Application screenshots')}">${gallery.map((v,index)=>`<button data-gallery-src="${esc(v.image)}" data-gallery-alt="${esc(p.name+' / '+v.label[lang])}" aria-pressed="${index===0}">${esc(v.label[lang])}</button>`).join('')}</div>`:''}</section>`:''}
    <div class="case-next"><a class="text-link" href="#projects">${i('arrow-left')}${tr(lang,'Outros projetos','More projects')}</a><a class="text-link" href="#contact">${tr(lang,'Conversar sobre uma oportunidade','Discuss an opportunity')}${i('arrow-up-right')}</a></div>
  </div>`;
}

export function validActivity(data) {
  return Array.isArray(data?.contributions)&&data.contributions.length>0&&data.contributions.length<=400&&
    data.contributions.every(d=>/^\d{4}-\d{2}-\d{2}$/.test(d.date)&&Number.isInteger(d.count)&&d.count>=0&&Number.isInteger(d.level)&&d.level>=0&&d.level<=4);
}

async function mountActivity(lang) {
  const target=document.querySelector('#github-calendar');if(!target)return;
  let data, mode='live';
  try {
    let cache;try{cache=JSON.parse(localStorage.getItem(CACHE_KEY));}catch{}
    if(cache&&Date.now()-cache.time<CACHE_TTL&&validActivity(cache.data)){data=cache.data;mode='cache';}
    else {
      const response=await fetch(GITHUB_URL,{signal:AbortSignal.timeout(7000)});
      if(!response.ok)throw new Error('GITHUB');
      data=await response.json();if(!validActivity(data))throw new Error('SCHEMA');
      try{localStorage.setItem(CACHE_KEY,JSON.stringify({time:Date.now(),data}));}catch{}
    }
  } catch {
    try {const response=await fetch('/github-activity.json');data=await response.json();if(!validActivity(data))throw new Error('SCHEMA');mode='snapshot';}
    catch {target.textContent=tr(lang,'Atividade indisponível. Consulte meu perfil no GitHub.','Activity unavailable. Visit my GitHub profile.');return;}
  }
  if(!target.isConnected)return;
  const days=data.contributions, first=new Date(`${days[0].date}T12:00:00Z`).getUTCDay();
  const total=days.reduce((sum,d)=>sum+d.count,0);
  const countLabel=tr(lang,'contribuições no período','contributions in this period');
  target.innerHTML=`<div class="activity-summary"><strong>${total} <span>${countLabel}</span></strong><span>${esc(days[0].date)} — ${esc(days.at(-1).date)}</span></div><div class="calendar-scroll" tabindex="0" role="region" aria-label="${tr(lang,'Calendário de contribuições GitHub','GitHub contribution calendar')}"><div class="calendar-grid">${Array.from({length:first},()=>'<span class="contribution blank"></span>').join('')}${days.map(d=>`<span class="contribution level-${d.level}" title="${esc(d.date)}: ${d.count} ${tr(lang,'contribuições','contributions')}" aria-label="${esc(d.date)}: ${d.count}"></span>`).join('')}</div></div><div class="calendar-footer"><span>${mode==='snapshot'?tr(lang,'Cópia salva · atualização indisponível','Saved snapshot · refresh unavailable'):tr(lang,'Dados públicos · atualização periódica','Public data · periodic refresh')}</span><div class="calendar-legend">${tr(lang,'Menos','Less')}${[0,1,2,3,4].map(n=>`<span class="contribution level-${n}"></span>`).join('')}${tr(lang,'Mais','More')}</div></div>`;
  const viewport=target.querySelector('.calendar-scroll');
  if(viewport&&viewport.scrollWidth>viewport.clientWidth)viewport.scrollLeft=viewport.scrollWidth;
}

function mountHoverVideos() {
  document.querySelectorAll('[data-hover-video]').forEach(target=>{
    const video=target.querySelector('video');
    if(!video)return;
    const start=()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;video.play().then(()=>target.classList.add('is-playing')).catch(()=>{});};
    const stop=()=>{video.pause();target.classList.remove('is-playing');};
    target.closest('a')?.addEventListener('mouseenter',start);
    target.closest('a')?.addEventListener('mouseleave',stop);
    target.closest('a')?.addEventListener('focus',start);
    target.closest('a')?.addEventListener('blur',stop);
  });
}

export function mountStudio(lang) { void mountActivity(lang); mountHoverVideos(); }
