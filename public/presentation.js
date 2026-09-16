// CONFIGURACOES: apresentacao publica e terminal deterministico, sem chamadas de IA.
import {featuredProject} from './studio.js';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tr=(l,p,e)=>l==='pt'?p:e;
const icon=n=>`<i data-lucide="${n}" aria-hidden="true"></i>`;

export function newHome(c,s,labels) {
  const l=s.lang,t=labels[l],profile=c.profile;
  const selected=['radar','focus','maintenance','publisher'].map(id=>c.projects.find(p=>p.id===id));
  const learning=c.courses.filter(v=>v.credential||v.status==='doing').slice(0,3);
  const book=c.books.find(b=>b.status==='reading');
  return `
  <section class="hero">
    <div class="hero-top"><span class="hero-kicker">${tr(l,'Portfólio de software / São Paulo, Brasil','Software portfolio / São Paulo, Brazil')}</span><span class="available">${t.available}</span></div>
    <div class="hero-content"><h1>Everton Soares<span>.</span></h1><p class="hero-role">${t.role}</p><p class="hero-lead">${tr(l,'Construo ferramentas em Python, automação e IA aplicada para transformar trabalho disperso em sistemas claros, verificáveis e úteis.','I build tools with Python, automation and applied AI to turn scattered work into clear, verifiable and useful systems.')}</p><div class="hero-actions"><a class="button primary" href="#projects">${tr(l,'Ver projetos','View projects')}${icon('arrow-down-right')}</a><a class="button secondary" href="/downloads/Everton-Soares-${l.toUpperCase()}.pdf" download>${icon('download')}${tr(l,'Baixar currículo','Download resume')}</a><a class="icon-link" href="${profile.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">${icon('github')}</a><a class="icon-link" href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">${icon('linkedin')}</a></div></div>
    <div class="hero-foundation" aria-label="${tr(l,'Áreas de atuação','Areas of work')}"><span><small>01</small>Python systems</span><span><small>02</small>Applied AI</span><span><small>03</small>Automation</span><span><small>04</small>Local-first</span></div>
  </section>
  <section class="section work-section"><div class="section-heading"><div><span class="eyebrow">01 / ${tr(l,'Trabalho selecionado','Selected work')}</span><h2>${tr(l,'Sistemas em funcionamento','Systems in action')}<span>.</span></h2></div><a class="text-link" href="#projects">${tr(l,'Todos os projetos','All projects')}${icon('arrow-up-right')}</a></div><div class="featured-projects">${selected.map((p,index)=>featuredProject(p,s,labels,index)).join('')}</div></section>
  <section class="section learning-section"><div class="section-heading"><div><span class="eyebrow">02 / ${t.courses}</span><h2>${tr(l,'Formação aplicada','Applied learning')}<span>.</span></h2></div><a class="text-link" href="#courses">${t.viewCourses}${icon('arrow-up-right')}</a></div><div class="education-preview">${learning.map(v=>`<a href="${v.credential||'#courses'}" ${v.credential?'target="_blank" rel="noopener noreferrer"':''}>${icon(v.credential?'badge-check':'book-open')}<div><small>${esc(v.issuer)}</small><h3>${esc(v.title)}</h3><span class="status">${v.status==='done'?tr(l,'Concluído','Completed'):t.doing}</span></div>${icon('arrow-up-right')}</a>`).join('')}</div></section>
  <section class="section github-section"><div class="section-heading"><div><span class="eyebrow">03 / GitHub</span><h2>${tr(l,'Construção contínua','Continuous building')}<span>.</span></h2></div><a class="text-link" href="${profile.github}" target="_blank" rel="noopener noreferrer">${tr(l,'Ver perfil','View profile')}${icon('arrow-up-right')}</a></div><p class="section-intro">${tr(l,'O calendário abaixo consulta a atividade pública do GitHub e se atualiza periodicamente.','The calendar below reads public GitHub activity and refreshes periodically.')}</p><div id="github-calendar" aria-live="polite">${tr(l,'Carregando contribuições…','Loading contributions…')}</div></section>
  <section class="section reading-section"><div class="section-heading"><div><span class="eyebrow">04 / ${tr(l,'Além do código','Beyond code')}</span><h2>${tr(l,'Biblioteca pessoal','Personal library')}<span>.</span></h2></div><a class="text-link" href="#library">${t.viewLibrary}${icon('arrow-up-right')}</a></div><div class="shelf-preview"><div class="reading-note"><span class="status">${t.reading}</span><h3>${esc(book?.title)}</h3><p class="book-author">${esc(book?.author)}</p><p>${t.libraryIntro}</p></div><div class="shelf-books">${c.books.filter(b=>b.cover).slice(0,4).map(b=>`<button data-book="${c.books.indexOf(b)}" aria-haspopup="dialog" title="${esc(b.title)}"><img src="/${esc(b.cover.replace(/^\//,''))}" alt="${esc(b.title)}" width="140" height="210" loading="lazy"></button>`).join('')}</div></div></section>
  <section class="contact-band"><span class="eyebrow">${tr(l,'Um próximo projeto. Uma nova oportunidade.','A next project. A new opportunity.')}</span><h2>${tr(l,'Vamos construir algo útil?','Let’s build something useful.')}</h2><div class="actions"><a class="button primary" href="#contact">${tr(l,'Entrar em contato','Get in touch')}${icon('arrow-up-right')}</a><a class="text-link" href="#about">${tr(l,'Conhecer minha trajetória','Explore my background')}${icon('arrow-right')}</a><a class="text-link terminal-link" href="#terminal">${icon('terminal')}Terminal</a></div></section>`;
}

export function aboutView(l){const entries=[
['01',tr(l,'Base técnica','Technical foundation'),tr(l,'Manutenção aeronáutica','Aircraft maintenance'),tr(l,'Formação técnica em Mecânica de Aeronaves. Investigar falhas, trabalhar com procedimentos e compreender o funcionamento dos sistemas faz parte da minha base.','Technical training in aircraft maintenance. Investigating failures, working with procedures and understanding systems are part of my foundation.')],
['02','2018+',tr(l,'Atuação independente','Independent work'),tr(l,'Experiência independente em mercados financeiros. Um capítulo anterior à construção dos meus projetos de software.','Independent experience in financial markets. A chapter preceding my personal software projects.')],
['03',tr(l,'2021 — 2024','2021 — 2024'),tr(l,'Operações digitais, Web3 e conteúdo','Digital operations, Web3 and content'),tr(l,'Campanhas digitais, comunidades Web3, sites, automações de e-mail e produção do canal Crypto Frontier.','Digital campaigns, Web3 communities, websites, email automation and production for the Crypto Frontier channel.')],
['04',tr(l,'Projetos próprios / agora','Personal projects / now'),tr(l,'Automação, IA e software','Automation, AI and software'),tr(l,'Construção de ferramentas próprias como Focus Cockpit e Global Builder Radar. Formação contínua em Python, integrações e inteligência artificial. São projetos independentes, não experiência contratada em desenvolvimento.','Building personal tools such as Focus Cockpit and Global Builder Radar. Ongoing learning in Python, integrations and artificial intelligence. These are independent projects, not employed software development experience.')]
];return `<header class="page-header"><span class="eyebrow">${tr(l,'Sobre / Everton Soares','About / Everton Soares')}</span><h1>${tr(l,'Uma trajetória em construção.','A journey in progress.')}</h1></header><section class="about-intro"><img class="about-photo" src="/assets/everton.jpg" alt="Everton Soares"><div><h2>${tr(l,'Entender como funciona. Depois, construir.','Understand how it works. Then build.')}</h2><p>${tr(l,'Venho de uma formação técnica e de experiências fora da indústria de software. Hoje aplico essa curiosidade à automação, à inteligência artificial e a ferramentas que resolvem problemas do meu próprio trabalho.','My background is technical, with experience outside the software industry. Today I apply that curiosity to automation, artificial intelligence and tools that solve problems in my own work.')}</p><a class="button" href="/downloads/Everton-Soares-${l.toUpperCase()}.pdf" download>${icon('download')}${tr(l,'Currículo completo','Full resume')}</a></div></section><section class="section timeline"><h2>${tr(l,'Meu caminho','My path')}</h2>${entries.map(([n,date,title,body])=>`<details><summary><span class="timeline-number">${n}</span><span><small>${date}</small><strong>${title}</strong></span>${icon('plus')}</summary><p>${body}</p></details>`).join('')}</section>`;}

export function videoView(c,l) {
  const p=c.projects.find(p=>p.localVideo);
  return `<header class="page-header"><span class="eyebrow">${tr(l,'Em ação','In action')}</span><h1>${tr(l,'Do código à prática.','From code to practice.')}</h1><p>${tr(l,'Uma demonstração visual curta do Global Builder Radar.','A short visual demonstration of Global Builder Radar.')}</p></header><div class="video-player"><video controls playsinline preload="metadata" poster="${esc(p.image)}"><source src="${esc(p.localVideo)}" type="video/mp4"></video></div><div class="video-caption"><div><h2>Global Builder Radar</h2><p>${tr(l,'Vídeo em inglês · 28 segundos · sem áudio.','English video · 28 seconds · silent.')}</p></div><a class="text-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${icon('github')}GitHub${icon('arrow-up-right')}</a><a class="text-link" href="#project/radar">${tr(l,'Estudo de caso','Case study')}${icon('arrow-right')}</a></div>`;
}

export function contactView(c,l) {
  const rows=[
    ['linkedin','LinkedIn',tr(l,'Oportunidades de trabalho e contato profissional','Job opportunities and professional contact'),c.profile.linkedin],
    ['briefcase-business','Upwork',tr(l,'Projetos freelance e contratos','Freelance projects and contracts'),c.profile.upwork],
    ['github','GitHub',tr(l,'Código e documentação dos projetos','Project code and documentation'),c.profile.github],
    ['youtube','GrowthTech Solutions',tr(l,'Demonstrações de automação e software','Automation and software demonstrations'),c.profile.youtube],
    ['layout-template','Portfólio de Marketing',tr(l,'Projetos e experiência em marketing','Marketing projects and experience'),c.profile.marketingPortfolio],
    ['chart-no-axes-combined','Portfólio de Finanças',tr(l,'Trajetória e conteúdo sobre mercados','Background and content about markets'),c.profile.financePortfolio],
    ['link','Linktree',tr(l,'Outros links públicos','Other public links'),c.profile.linktree]
  ];
  return `<header class="page-header"><span class="eyebrow">${tr(l,'Contato e presença digital','Contact and digital presence')}</span><h1>${tr(l,'Vamos conversar.','Let’s talk.')}</h1><p>${tr(l,'Estou aberto a oportunidades em automação, Python e IA aplicada. LinkedIn e Upwork são os canais principais; os demais links mostram outras partes da minha trajetória.','I am open to opportunities in automation, Python and applied AI. LinkedIn and Upwork are the primary channels; the remaining links show other parts of my background.')}</p></header><div class="contact-list">${rows.map(([ic,name,desc,url],index)=>`<a class="${index<4?'contact-primary':''}" href="${url}" target="_blank" rel="noopener noreferrer">${icon(ic)}<div><h2>${name}</h2><p>${desc}</p></div>${icon('arrow-up-right')}</a>`).join('')}</div><section class="resume-section"><div><span class="eyebrow">${tr(l,'Currículo','Resume')}</span><h2>${tr(l,'Minha trajetória, em PDF.','My background, in PDF.')}</h2></div><div class="actions"><a class="button primary" href="/downloads/Everton-Soares-PT.pdf" download>${icon('download')}Português</a><a class="button secondary" href="/downloads/Everton-Soares-EN.pdf" download>${icon('download')}English</a></div></section>`;
}

export function mountPresentation(l) {
  const tabs=[...document.querySelectorAll('[data-case-tab]')];
  const activate=button=>{
    tabs.forEach(tab=>{
      const active=tab===button;
      tab.setAttribute('aria-selected',String(active));
      tab.tabIndex=active?0:-1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden=!active;
    });
  };
  tabs.forEach((button,index)=>{
    button.onclick=()=>activate(button);
    button.onkeydown=e=>{
      let next;
      if(e.key==='ArrowRight')next=(index+1)%tabs.length;
      if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
      if(e.key==='Home')next=0;
      if(e.key==='End')next=tabs.length-1;
      if(next!==undefined){e.preventDefault();activate(tabs[next]);tabs[next].focus();}
    };
  });
  document.querySelectorAll('[data-gallery-src]').forEach(button=>button.onclick=()=>{
    const image=document.querySelector('#gallery-image');
    image.src=button.dataset.gallerySrc;image.alt=button.dataset.galleryAlt;
    document.querySelectorAll('[data-gallery-src]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  });
}

export function terminalView(l){return `<header class="terminal-heading"><a href="#home">${icon('arrow-left')}${tr(l,'Voltar ao portfólio','Back to portfolio')}</a><span>LOCAL / NO AI</span></header><section class="terminal-surface"><div class="terminal-bar"><span>everton@portfolio: ~</span>${icon('terminal')}</div><h1 class="terminal-banner">EVERTON<br>SOARES<span>_</span></h1><p class="terminal-subtitle">${tr(l,'Automação · IA aplicada · Software','Automation · Applied AI · Software')}</p><div class="terminal-shortcuts">${['help','projects','about','courses','books','resume'].map(cmd=>`<button data-command="${cmd}">${cmd}</button>`).join('')}</div><div id="terminal-output" role="log" aria-live="polite"></div><form id="terminal-form"><label for="terminal-command">everton:~ $</label><input id="terminal-command" aria-label="${tr(l,'Comando','Command')}" autocomplete="off" spellcheck="false" maxlength="100"><button class="icon-button" aria-label="${tr(l,'Executar','Run')}" title="${tr(l,'Executar','Run')}">${icon('corner-down-left')}</button></form></section>`;}

export function mountTerminal(c,l){const form=document.querySelector('#terminal-form');if(!form)return;const input=document.querySelector('#terminal-command'),out=document.querySelector('#terminal-output'),history=[];let cursor=0;const commands=['help','projects','about','courses','books','resume','video','clear','exit'];
const execute=raw=>{const cmd=raw.trim().toLowerCase();if(!cmd)return;history.push(raw);cursor=history.length;input.value='';if(cmd==='clear'){out.replaceChildren();return;}if(cmd==='exit'){location.hash='home';return;}const block=document.createElement('section'),prompt=document.createElement('p');prompt.textContent=`everton:~ $ ${raw}`;prompt.className='terminal-prompt';block.append(prompt);const link=(text,href,download=false)=>{const a=document.createElement('a');a.textContent=text;a.href=href;if(download)a.download='';block.append(a);};const line=text=>{const p=document.createElement('p');p.textContent=text;block.append(p);};
if(cmd==='help')line(commands.join(' · '));
else if(cmd==='projects')c.projects.forEach(p=>link(p.name,`#project/${p.id}`));
else if(cmd==='courses'){c.courses.forEach(v=>line(`${v.status==='done'?'[✓]':v.status==='doing'?'[~]':'[ ]'} ${v.title}`));link(tr(l,'Abrir formação','Open education'),'#courses');}
else if(cmd==='books'){c.books.forEach(b=>line(`${b.title} / ${b.author}`));link(tr(l,'Abrir biblioteca','Open library'),'#library');}
else if(cmd==='about'){line(tr(l,'Everton Soares. Formação técnica, projetos próprios em automação e IA.','Everton Soares. Technical background, personal automation and AI projects.'));link(tr(l,'Ver trajetória','View journey'),'#about');}
else if(cmd==='resume')link(tr(l,'Baixar currículo PDF','Download resume PDF'),`/downloads/Everton-Soares-${l.toUpperCase()}.pdf`,true);
else if(cmd==='video')link('Global Builder Radar','#videos');
else line(tr(l,'Comando não encontrado. Digite help.','Command not found. Type help.'));
out.append(block);while(out.children.length>30)out.firstElementChild.remove();out.scrollTop=out.scrollHeight;};
form.onsubmit=e=>{e.preventDefault();execute(input.value);};document.querySelectorAll('[data-command]').forEach(b=>b.onclick=()=>{execute(b.dataset.command);input.focus();});input.onkeydown=e=>{if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();cursor=Math.max(0,Math.min(history.length,cursor+(e.key==='ArrowUp'?-1:1)));input.value=history[cursor]||'';}if(e.key==='Tab'){const found=commands.filter(c=>c.startsWith(input.value.trim().toLowerCase()));if(found.length===1){e.preventDefault();input.value=found[0];}}};}
