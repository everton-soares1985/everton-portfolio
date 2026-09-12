// CONFIGURACOES: preferencia local; nenhum dado pessoal e persistido.
try { const theme = localStorage.getItem('es-theme'); document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark'; } catch { document.documentElement.dataset.theme = 'dark'; }
