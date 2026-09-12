# Everton Soares

Portfolio PT/EN com temas grafite/vermelhao e bege/violeta, projetos, formacao,
biblioteca, curriculos, trajetoria e terminal local. Preview ainda nao publicado.

## Rodar

Node.js 22+: `npm start`, http://127.0.0.1:4317. Sem build ou instalacao adicional.
`npm test` executa 13 testes offline de logica e HTTP, sem provedores reais.

A interface nao utiliza IA nem precisa de SSH, OmniRoute, Hermes ou VPS.
O endpoint antigo /api/explore responde 410 por padrao. A implementacao legada
foi preservada, mas so funciona com ENABLE_LEGACY_AI_DEMO=true explicitamente.
Nao habilitar essa opcao para esta versao. Nenhum arquivo env foi alterado.

## Mapa

- public/app.js: idioma, navegacao, filtros e dialogos do catalogo.
- public/studio.js: paginas de projetos, curriculos e calendario GitHub.
- public/presentation.js: inicio, Sobre, video e terminal deterministico.
- public/demonstration.js: logica legada, nao exibida nesta interface.
- public/style.css: estilos antigos preservados, nao carregados.
- public/studio.css: identidade visual e componentes da nova versao.
- public/catalog.json: fonte publica selecionada; nao sincroniza bancos privados.
- public/github-activity.json: snapshot real de reserva, com datas do periodo.
- public/downloads/: copias publicas dos PDFs existentes PT/EN.
- tests/studio.test.mjs: demonstracao, dados GitHub, PDFs e bloqueio de IA.
- tests/browser.mjs: smoke test com Edge/Playwright; PLAYWRIGHT_MODULE aponta
  para a instalacao disponivel. Suite em tests/presentation-browser.mjs.
  Capturas em artifacts/approved-design/, fora do Git.

## Comportamento

Projetos possuem enderecos #project/focus, #project/radar e demais IDs do catalogo.
As duas primeiras imagens sao capturas existentes com dados demonstrativos.
Projetos sem captura usam um fluxo conceitual identificado, nao interface falsa.
O video existente do Radar abre no YouTube; nao foram inventados novos videos.

O laboratorio JSON foi retirado da interface; #lab redireciona para videos.
O terminal tem pagina propria com saidas do catalogo, links, historico e
autocompletar. Nao executa shell, nao chama IA e nao acessa arquivos pessoais.
Sobre apresenta a foto e etapas expansiveis, separando emprego e projetos proprios.
Tema inicial escuro; a preferencia de tema fica salva no navegador.

GitHub: https://github-contributions-api.jogruber.de/v4/everton-soares1985?y=last
API publica intermediaria, sem token. Cache de seis horas no navegador; em falha,
exibe snapshot salvo e aviso. Nao promete refletir um commit imediatamente.
Cada celula tem data e contagem; no celular, inicia no trecho mais recente.

## Conteudo e direitos

Os PDFs foram copiados, sem alterar conteudo:
- PT: ASSISTENTE_PESSOAL/EMPREGOS_PORTFOLIO/01_KIT_ENVIO_RAPIDO/
  Curriculo_Everton_Soares_Dev_IA_Automacao.pdf
- EN: Agencia_Growth_Tech/career_documents/pdf/
  Everton_Soares_AI_Workflow_Automation_EN.pdf

Revisar curriculos antes da publicacao: os documentos existentes podem divergir
do catalogo mais recente (inclusive estado de cursos). Nenhuma nova conquista,
experiencia profissional, reflexao de livro ou resultado comercial foi inventado.

Cursos sem credencial publicada nao recebem selo de certificacao.
Biblioteca implementada em CSS, sem nova biblioteca pesada ou dependencia React.
Capas existentes podem corresponder a outra edicao; livros sem imagem usam titulo
e autor. Fontes Inter e Manrope hospedadas localmente, licencas OFL em assets/.
Icones Lucide e sua licenca existentes foram preservados.
Referencias visuais inspiraram organizacao, sem copiar codigo ou assets dos sites.

## Verificacao e rollback

13 testes unitarios/HTTP aprovados. Sete rotas em 320, 390 e 1440 px, claro/escuro,
biblioteca, detalhes de projetos, terminal, dados invalidos, escaping e downloads
dos dois PDFs verificados com Edge. Zero chamadas ao endpoint de IA e erros JS.

Backup seletivo: artifacts/backups/2026-09-12-visual. Nenhum arquivo original
de carreira foi movido ou apagado; nenhum commit/push ou servico VPS alterado.

## Publicacao

A pasta public/ pode ser hospedada estaticamente na HostGator. Consulte
deploy/README.md como referencia da infraestrutura anterior; a API Oracle nao
e mais necessaria para esta interface. Nao enviar env, backups ou arquivos server.
Dominio e SSL nao foram configurados/publicados nesta rodada.
