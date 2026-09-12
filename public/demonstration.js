// CONFIGURACOES: demonstracao local com dados de exemplo, sem rede ou IA.
export const SAMPLE = [
  {title:'Organizar documentos', area:'operacao', priority:2},
  {title:'Revisar um repositorio', area:'software', priority:1},
  {title:'  organizar documentos  ', area:'operacao', priority:2},
  {title:'Preparar demonstracao', area:'software', priority:3},
  {title:'', area:'operacao', priority:1}
];

export function processRecords(input) {
  if (typeof input !== 'string' || input.length > 12000) throw new Error('SIZE');
  const rows = JSON.parse(input);
  if (!Array.isArray(rows) || rows.length > 100) throw new Error('ARRAY');
  const valid = [], rejected = [];
  rows.forEach((row, index) => {
    if (!row || typeof row.title !== 'string' || !row.title.trim() || row.title.length > 160 ||
      typeof row.area !== 'string' || !row.area.trim() || row.area.length > 60 ||
      !Number.isInteger(row.priority) || row.priority < 1 || row.priority > 3) {
      rejected.push(index + 1); return;
    }
    valid.push({title:row.title.trim().replace(/\s+/g,' '), area:row.area.trim(), priority:row.priority});
  });
  const seen = new Set();
  const unique = valid.filter(row => {
    const key = JSON.stringify([row.title.toLocaleLowerCase('pt-BR'),row.area.toLocaleLowerCase('pt-BR')]);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
  return {input:rows.length, valid:valid.length, duplicates:valid.length-unique.length,
    rejected, output:unique.sort((a,b)=>a.priority-b.priority)};
}

export function terminalTarget(command) {
  const normalized = command.trim().toLowerCase();
  const routes = {projetos:'projects',projects:'projects',livros:'library',books:'library',
    cursos:'courses',courses:'courses',sobre:'about',about:'about',demo:'lab',home:'home'};
  return routes[normalized] || null;
}
