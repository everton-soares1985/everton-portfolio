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

export function projectVisual(p,state,labels) {
  const lang=state.lang,t=labels[lang];
  const diagram=p.id==='maintenance'?['files','search','message-square-text']:['folder-git-2','shield-check','git-pull-request'];
  return `<article class="project-card project-${esc(p.id)}"><a class="project-preview" href="#project/${p.id}" aria-label="${t.details}: ${esc(p.name)}">${p.image?`<img class="project-media" src="${esc(p.image)}" alt="${esc(p.name)} · ${tr(lang,'captura da aplicação','application screenshot')}" width="800" height="476" loading="lazy">`:`<div class="architecture-art">${diagram.map((name,index)=>`${index?'<span class="flow-line"></span>':''}<span class="architecture-node">${i(name)}</span>`).join('')}<span class="architecture-caption">${tr(lang,'Fluxo conceitual','Conceptual flow')}</span></div>`}<span class="preview-open">${i('arrow-up-right')}</span></a><div class="project-copy"><div class="project-meta"><span>${t[p.category]}</span><span>${tr(lang,'Projeto pessoal','Personal project')}</span></div><h3><a href="#project/${p.id}">${esc(p.name)}</a></h3><p>${words(p.summary,lang)}</p><div class="tags">${p.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div><div class="card-bottom"><a class="text-link" href="#project/${p.id}">${tr(lang,'Explorar projeto','Explore project')}${i('arrow-right')}</a>${ext(p.url,`<span class="sr-only">GitHub ${esc(p.name)}</span>${i('github')}`)}</div></div></article>`;
}

export function projectDetail(p,state,labels) {
  const lang=state.lang,t=labels[lang];
  if(!p)return `<div class="page-header"><h1>${tr(lang,'Projeto não encontrado','Project not found')}</h1><a href="#projects">${t.projects}</a></div>`;
  return `<div class="project-detail"><a class="text-link back-link" href="#projects">${i('arrow-left')}${t.projects}</a><header class="page-header"><div class="eyebrow">${t[p.category]} / ${tr(lang,'Projeto pessoal','Personal project')}</div><h1>${esc(p.name)}</h1><p>${words(p.summary,lang)}</p><div class="actions">${ext(p.url,`${i('github')}${t.source}`)}${p.video?ext(p.video,`${i('play')}${t.video}`):''}</div></header>${p.image?`<figure class="case-image"><img src="${esc(p.image)}" alt="${esc(p.name)}" width="1264" height="760"><figcaption>${tr(lang,'Captura da aplicação com dados de demonstração.','Application screenshot with demonstration data.')}</figcaption></figure>`:''}<div class="case-body"><div>${[['problem',p.problem],['approach',p.approach],['limits',p.limit]].map(([key,value],index)=>`<section><span class="eyebrow">0${index+1}</span><h2>${t[key]}</h2><p>${words(value,lang)}</p></section>`).join('')}</div><aside><h3>${tr(lang,'Tecnologias','Technologies')}</h3><div class="tags">${p.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div><h3>${tr(lang,'Evidências','Evidence')}</h3>${ext(p.url,'GitHub')}${p.video?ext(p.video,t.video):''}<p>${tr(lang,'Código, contexto e limites do projeto.','Project code, context and limitations.')}</p></aside></div></div>`;
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

export function mountStudio(lang) { void mountActivity(lang); }
