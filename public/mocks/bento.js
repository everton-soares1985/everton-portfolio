const modalData = {
  focus: {
    title: 'Focus Cockpit',
    category: 'Aplicação Desktop Local-First',
    problem: 'Informações e próximos passos espalhados entre dezenas de abas, ferramentas em nuvem e arquivos soltos, com risco de vazamento de dados.',
    approach: 'Construído em Tauri com backend em Rust e frontend em React, utilizando banco de dados SQLite local. Todo o processamento ocorre no próprio computador do usuário.',
    limits: 'Projeto de produtividade pessoal desenhado com foco em zero telemetria externa.',
    link: 'https://github.com/everton-soares1985/focus-cockpit'
  },
  maintenance: {
    title: 'Prescriptive Maintenance Platform',
    category: 'IA Aplicada & Engenharia de Conhecimento',
    problem: 'Consultar manuais densos de manutenção e procedimentos técnicos de forma ágil sem que o modelo invente passos ou procedimentos perigosos.',
    approach: 'Implementação de RAG com chunking semântico de manuais técnicos, busca vetorial e validação por citações exatas das fontes.',
    limits: 'Ambiente demonstrativo. Sistemas industriais requerem validação formal e inspeção presencial de engenheiro responsável.',
    link: 'https://github.com/everton-soares1985/prescriptive-maintenance-platform'
  }
};

window.openModal = function(key) {
  const data = modalData[key];
  if (!data) return;
  document.getElementById('modal-content').innerHTML = `
    <div style="font-size: 11px; font-family: var(--font-mono); color: var(--accent); text-transform: uppercase; margin-bottom: 8px;">${data.category}</div>
    <h2 style="font-size: 26px; color: #fff; margin-bottom: 16px;">${data.title}</h2>
    <div style="margin-bottom: 14px;"><strong style="color: #cbd5e1; font-size: 13px;">O Problema:</strong><p style="color: var(--muted); font-size: 14px; margin-top: 4px;">${data.problem}</p></div>
    <div style="margin-bottom: 14px;"><strong style="color: #cbd5e1; font-size: 13px;">Como foi Construído:</strong><p style="color: var(--muted); font-size: 14px; margin-top: 4px;">${data.approach}</p></div>
    <div style="margin-bottom: 20px;"><strong style="color: #cbd5e1; font-size: 13px;">Limites & Contexto:</strong><p style="color: var(--muted); font-size: 14px; margin-top: 4px;">${data.limits}</p></div>
    <a href="${data.link}" target="_blank" class="btn-primary" style="display: inline-block;">Ver Repositório no GitHub ↗</a>
  `;
  document.getElementById('project-modal').classList.add('active');
};

window.closeModal = function(e) {
  if (e.target.id === 'project-modal') window.closeModalDirect();
};

window.closeModalDirect = function() {
  document.getElementById('project-modal').classList.remove('active');
};
