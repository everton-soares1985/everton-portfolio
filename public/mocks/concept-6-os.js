/* ===== clock ===== */
function tick() {
  const d = new Date();
  document.getElementById('clock').textContent =
    d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }) + '  ' +
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
tick();
setInterval(tick, 15000);

/* ===== window manager ===== */
let zTop = 100;
const wins = ['win-about', 'win-projects', 'win-books', 'win-terminal'];

function focusWin(id) {
  wins.forEach(w => document.getElementById(w).classList.remove('active'));
  const el = document.getElementById(id);
  el.classList.add('active');
  el.style.zIndex = ++zTop;
}
function toggleWin(id) {
  const el = document.getElementById(id);
  if (el.classList.contains('hidden-win')) {
    el.classList.remove('hidden-win');
    setDock(id, true);
  }
  focusWin(id);
}
function closeWin(id) {
  document.getElementById(id).classList.add('hidden-win');
  setDock(id, false);
}
function setDock(id, running) {
  const btn = document.querySelector('.dock-item[data-win="' + id + '"]');
  if (btn) btn.classList.toggle('running', running);
}

/* open/close via data attributes */
document.querySelectorAll('[data-win]').forEach(el => {
  el.addEventListener('click', () => toggleWin(el.dataset.win));
});
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
    closeWin(el.dataset.close);
  });
});

/* drag */
wins.forEach(id => {
  const el = document.getElementById(id);
  const bar = el.querySelector('.titlebar');
  el.addEventListener('mousedown', () => focusWin(id));
  let sx, sy, ox, oy, dragging = false;
  bar.addEventListener('mousedown', e => {
    if (e.target.classList.contains('light')) return;
    dragging = true; sx = e.clientX; sy = e.clientY;
    const r = el.getBoundingClientRect(); ox = r.left; oy = r.top;
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    el.style.left = (ox + e.clientX - sx) + 'px';
    el.style.top = Math.max(38, oy + e.clientY - sy) + 'px';
  });
  window.addEventListener('mouseup', () => { dragging = false; });
});
focusWin('win-projects');

/* ===== projects data ===== */
const projects = [
  { id: 'focus', name: 'Focus Cockpit', kind: 'Software', img: '../assets/focus.png',
    desc: 'Prioridades, projetos e aprendizado em um espaço pessoal de trabalho. Aplicação desktop local-first.',
    tags: ['Tauri', 'React', 'SQLite'], url: 'https://github.com/everton-soares1985/focus-cockpit' },
  { id: 'radar', name: 'Global Builder Radar', kind: 'Automação', img: '../assets/radar.png',
    desc: 'Organização e análise de oportunidades para construir software. Pipeline + interface de consulta.',
    tags: ['Python', 'APIs', 'Pipeline'], url: 'https://github.com/everton-soares1985/global-builder-opportunity-radar' },
  { id: 'maintenance', name: 'Prescriptive Maintenance', kind: 'IA', art: 'RAG',
    desc: 'Exploração de IA aplicada ao conhecimento de manutenção. Recuperação de informação e consulta contextualizada.',
    tags: ['Python', 'RAG', 'FastAPI'], url: 'https://github.com/everton-soares1985/prescriptive-maintenance-platform' },
  { id: 'publisher', name: 'GitHub Project Publisher', kind: 'Automação', art: 'GIT',
    desc: 'Preparação e revisão de repositórios para publicação organizada, com verificações e governança.',
    tags: ['Python', 'Git', 'Governance'], url: 'https://github.com/everton-soares1985/github-project-publisher' }
];

const grid = document.getElementById('finder-grid');
projects.forEach(p => {
  const el = document.createElement('div');
  el.className = 'f-item';
  el.innerHTML =
    '<div class="thumb">' + (p.img ? '<img src="' + p.img + '" alt="' + p.name + '">' : p.art) + '</div>' +
    '<b>' + p.name + '</b>' +
    '<span class="kind">' + p.kind + '</span>';
  el.addEventListener('click', () => {
    const d = document.getElementById('f-detail');
    d.classList.add('show');
    d.innerHTML =
      '<h3>' + p.name + '</h3>' +
      '<p>' + p.desc + '</p>' +
      '<div class="tags">' + p.tags.map(t => '<span>' + t + '</span>').join('') + '</div>' +
      '<a href="' + p.url + '">Abrir repositório no GitHub →</a>';
    d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  grid.appendChild(el);
});

/* ===== books data ===== */
const books = [
  { title: 'AI Agents in Depth', author: 'Bojie Li', status: 'reading', label: 'Lendo' },
  { title: 'Deep Work', author: 'Cal Newport', status: 'read', label: 'Lido', cover: '../assets/book-deep-work.jpg' },
  { title: 'Antifrágil', author: 'Nassim N. Taleb', status: 'read', label: 'Lido', cover: '../assets/book-antifragile.jpg' },
  { title: 'Dar e Receber', author: 'Adam Grant', status: 'read', label: 'Lido', cover: '../assets/book-give-take.jpg' },
  { title: 'Steve Jobs', author: 'Walter Isaacson', status: 'read', label: 'Lido', cover: '../assets/book-steve-jobs.jpg' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', status: 'planned', label: 'Planejado' },
  { title: 'Atomic Habits', author: 'James Clear', status: 'planned', label: 'Planejado' }
];
const bb = document.getElementById('books-body');
books.forEach(b => {
  const row = document.createElement('div');
  row.className = 'bk-row';
  row.innerHTML =
    '<div class="bk-cover">' + (b.cover ? '<img src="' + b.cover + '" alt="' + b.title + '">' : b.title) + '</div>' +
    '<div><b>' + b.title + '</b><span>' + b.author + '</span></div>' +
    '<span class="bk-status ' + b.status + '">' + b.label + '</span>';
  bb.appendChild(row);
});

/* ===== terminal ===== */
const cmds = {
  help: () => 'Comandos: <span class="warn">about projects courses books resume video contact clear</span>',
  about: () => '<span class="acc">Everton Soares</span> — IA aplicada, automação e software.\nDa manutenção aeronáutica à construção de software. São Paulo, Brasil.',
  projects: () => projects.map((p, i) => ' <span class="acc">' + (i + 1) + '.</span> ' + p.name + ' <span class="ok">[' + p.tags.join(', ') + ']</span>').join('\n'),
  courses: () => '<span class="ok">[✓]</span> Google IT Automation with Python\n<span class="ok">[✓]</span> Configuration Management and the Cloud\n<span class="ok">[✓]</span> Troubleshooting and Debugging\n<span class="ok">[✓]</span> Introduction to Selenium\n<span class="warn">[~]</span> IBM AI Developer Professional Certificate\n<span class="warn">[~]</span> Make\n[ ] Multi AI Agent Systems with crewAI\n[ ] AI Agents in LangGraph',
  books: () => books.map(b => ' ' + (b.status === 'read' ? '<span class="ok">✓</span>' : b.status === 'reading' ? '<span class="warn">~</span>' : ' ') + ' ' + b.title + ' — ' + b.author).join('\n'),
  resume: () => { window.open('../downloads/Everton-Soares-PT.pdf', '_blank'); return 'Abrindo currículo PDF...'; },
  video: () => { window.open('https://www.youtube.com/@GrowthTech.Solutions', '_blank'); return 'Abrindo YouTube...'; },
  contact: () => 'GitHub   → <span class="acc">github.com/everton-soares1985</span>\nLinkedIn → <span class="acc">everton-de-oliveira-soares-857630146</span>\nYouTube  → <span class="acc">@GrowthTech.Solutions</span>',
  clear: () => { document.getElementById('t-out').innerHTML = ''; return null; }
};

const tIn = document.getElementById('t-input');
tIn.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const raw = tIn.value.trim().toLowerCase();
  tIn.value = '';
  if (!raw) return;
  const out = document.getElementById('t-out');
  out.innerHTML += '<span class="t-prompt">everton:~ $</span> ' + raw + '\n';
  const fn = cmds[raw];
  const res = fn ? fn() : '<span class="warn">comando não encontrado:</span> ' + raw + ' — tente <span class="warn">help</span>';
  if (res) out.innerHTML += res + '\n\n';
  document.getElementById('term-body').scrollTop = 1e9;
});
document.getElementById('win-terminal').addEventListener('mousedown', e => {
  if (!e.target.closest('.titlebar')) setTimeout(() => tIn.focus(), 0);
});
