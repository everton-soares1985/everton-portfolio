# Everton Soares Portfolio

Portfolio pessoal PT/EN para apresentar projetos de automacao, IA aplicada e
engenharia de software. A interface ativa usa a identidade Signal / Build, com
modo escuro grafite e modo claro bege, acentos azuis e violetas.

## Executar

Requer Node.js 22 ou superior. Nao ha etapa de build nem instalacao adicional.

```powershell
npm start
```

Preview local: `http://127.0.0.1:4317/`

```powershell
npm test
```

A suite executa 22 testes offline de logica, HTTP e navegador. Ela valida as
rotas principais em 320, 390 e 1440 px, os dois temas, PT/EN, carrosseis,
curriculos de cursos, videos, contribuicoes GitHub e contatos.

## Estrutura ativa

- `public/index.html`: estrutura do shell, navegacao e contatos publicos.
- `public/app.js`: conteudo, rotas, idioma, projetos, cursos e biblioteca.
- `public/signal.css`: identidade visual, responsividade e animacoes.
- `public/library.json`: snapshot publico e sanitizado dos 86 livros do Focus Cockpit.
- `public/catalog.json`: catalogo publico de projetos e links.
- `public/github-activity.json`: snapshot de reserva das contribuicoes GitHub.
- `public/assets/focus-cockpit-demo.mp4`: demonstracao final do Focus Cockpit.
- `public/assets/global-builder-radar-demo.mp4`: demonstracao do Global Builder Radar.
- `public/assets/github-project-publisher-demo.mp4`: demonstracao montada do GitHub Project Publisher.
- `public/assets/hermes-autonomous-builder-demo.mp4`: visualizacao da arquitetura V0 do Hermes.
- `public/downloads/`: curriculos publicos PT/EN.
- `tests/presentation-browser.mjs`: regressao visual e funcional da interface ativa.

Os arquivos `studio.js`, `studio.css`, `presentation.js` e outros shells legados
continuam preservados, mas nao sao carregados pela pagina principal.

## Recursos

- Pagina inicial limpa, com navegacao por rotas hash.
- Projetos alternados, previews em video no hover e detalhes com video e galeria.
- Focus Cockpit com o video final e capturas reais do produto.
- GitHub Project Publisher com video demonstrativo e terminal tecnico preservado.
- Hermes Autonomous Builder como case documental de arquitetura agentic, com limites explicitados.
- Biblioteca em tres carrosseis: 1 lendo, 74 concluidos e 11 planejados.
- Cursos agrupados por estado; cada curso pode expandir seus modulos e credencial.
- Linhas de fluxo com brilho continuo e alternativa sem movimento.
- Sobre com retrato e trajetoria expansivel.
- Calendario GitHub atualizado por API publica, com snapshot local de reserva.
- Curriculos PT/EN para download.

O portfolio nao usa IA em tempo real e nao depende de VPS, SSH, OmniRoute ou
Hermes. O endpoint legado `/api/explore` permanece desabilitado por padrao.

## Dados e privacidade

`public/library.json` contem somente titulo, autor, status e referencias publicas
de capa quando existentes. IDs internos, caminhos locais, notas e outros campos
privados do Focus Cockpit nao foram publicados.

O conteudo de cursos foi consolidado a partir de `CURRIUCLO.txt`. Cursos sem link
de credencial nao exibem um link inventado. Resultados comerciais, formacao,
experiencia profissional e funcionalidades de produto nao devem ser apresentados
sem fonte verificavel.

O curriculo ingles publico corresponde a `Everton_De_Oliveira_Soares_Resume.pdf`,
fornecido em 15 de setembro de 2026. A copia anterior foi preservada somente no
backup local fora da publicacao.

## Verificacao

As capturas da ultima auditoria ficam em `artifacts/final-2026-09-15/`, incluindo
desktop e mobile nos modos escuro e claro e um curso com curriculo expandido.
O deploy estatico e validado separadamente antes da publicacao no dominio.

## Publicacao

A pasta `public/` pode ser hospedada estaticamente. Consulte `deploy/README.md`
para o historico da infraestrutura. Segredos, `.env`, backups, bancos locais e
arquivos de servidor nao devem ser publicados.
