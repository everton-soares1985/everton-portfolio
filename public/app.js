"use strict";
/* ================= DATA ================= */
const MAINTENANCE_SLIDES=[
{img:"/assets/maintenance-01-cover.webp",pt:"Visão geral",en:"Overview",ptNote:"IA industrial com barreiras de segurança e recomendações rastreáveis.",enNote:"Industrial AI with safety barriers and traceable recommendations."},
{img:"/assets/maintenance-02-problem.webp",pt:"Problema e solução",en:"Problem and solution",ptNote:"Eventos de vibração entram em um fluxo que combina padrões históricos e documentação aprovada.",enNote:"Vibration events enter a workflow that combines historical patterns with approved documentation."},
{img:"/assets/maintenance-03-workflow.webp",pt:"Fluxo de diagnóstico",en:"Diagnostic workflow",ptNote:"Similaridade, limiar de confiança, recuperação documental e recomendação com fontes.",enNote:"Similarity, confidence threshold, document retrieval and a source-backed recommendation."},
{img:"/assets/maintenance-04-input.png",pt:"Entrada real do sistema",en:"Real system input",ptNote:"O operador envia um evento com 23 variáveis do sensor e uma pergunta técnica.",enNote:"The operator submits an event with 23 sensor variables and a technical question."},
{img:"/assets/maintenance-05-inference.png",pt:"Hipótese e confiança",en:"Hypothesis and confidence",ptNote:"O histórico gera a hipótese antes da chamada ao modelo de linguagem.",enNote:"Historical data produces the hypothesis before any language-model call."},
{img:"/assets/maintenance-06-similar.png",pt:"Casos semelhantes",en:"Similar cases",ptNote:"Distâncias, escores e distribuição temporal permanecem visíveis para revisão.",enNote:"Distances, scores and time distribution remain visible for review."},
{img:"/assets/maintenance-07-evidence.png",pt:"Recomendação rastreável",en:"Traceable recommendation",ptNote:"A resposta usa apenas trechos recuperados e exige validação profissional.",enNote:"The response uses retrieved excerpts only and requires professional validation."},
{img:"/assets/maintenance-08-architecture.webp",pt:"Arquitetura em três camadas",en:"Three-layer architecture",ptNote:"Reconhecimento de padrões, recuperação documental e geração controlada.",enNote:"Pattern recognition, document retrieval and controlled generation."},
{img:"/assets/maintenance-09-stack.webp",pt:"Tecnologias utilizadas",en:"Technology stack",ptNote:"Python, FastAPI, Streamlit, SQLite WAL, scikit-learn, RAG com TF-IDF e execução via Docker Compose.",enNote:"Python, FastAPI, Streamlit, SQLite WAL, scikit-learn, TF-IDF RAG and Docker Compose."},
{img:"/assets/maintenance-09-metrics.webp",pt:"Métricas do protótipo",en:"Prototype metrics",ptNote:"166.796 eventos carregados, 90,3% de acurácia nos casos aceitos e limiar mínimo de 60%.",enNote:"166,796 loaded events, 90.3% accuracy on accepted cases and a 60% minimum threshold."},
{img:"/assets/maintenance-10-safety.webp",pt:"Barreiras de segurança",en:"Safety barriers",ptNote:"Casos ambíguos são bloqueados; fontes inválidas acionam fallback determinístico.",enNote:"Ambiguous cases are blocked; invalid sources trigger a deterministic fallback."}
];
const PROJECTS=[
{id:"radar",name:"Global Builder Radar",tags:["Python","APIs","Pipeline"],url:"https://github.com/everton-soares1985/global-builder-opportunity-radar",image:"/assets/radar.png",video:"/assets/global-builder-radar-demo.mp4"},
{id:"focus",name:"Focus Cockpit",tags:["Tauri","React","SQLite"],url:"https://github.com/everton-soares1985/focus-cockpit",image:"/assets/focus.png",video:"/assets/focus-cockpit-demo.mp4",
 gallery:[{img:"/assets/focus.png",pt:"Foco",en:"Focus"},{img:"/assets/focus-projects.png",pt:"Projetos",en:"Projects"},{img:"/assets/focus-courses.png",pt:"Cursos",en:"Courses"}]},
{id:"maintenance",name:"Prescriptive Maintenance",tags:["Python","RAG","FastAPI"],tech:["Python 3.12","FastAPI","Streamlit","SQLite WAL","NumPy","scikit-learn","RAG · TF-IDF","OpenRouter / Ollama","Docker Compose","OpenAPI"],url:"https://github.com/everton-soares1985/prescriptive-maintenance-platform",image:"/assets/maintenance-01-cover.webp",slides:MAINTENANCE_SLIDES,accent:"violet"},
{id:"publisher",name:"GitHub Project Publisher",tags:["Python","Git","Governance"],url:"https://github.com/everton-soares1985/github-project-publisher",image:"/assets/github-project-publisher-poster.png",video:"/assets/github-project-publisher-demo.mp4"},
{id:"hermes",name:"Hermes Autonomous Builder",tags:["Agentic AI","Orchestration","Governance"],url:"https://github.com/everton-soares1985/hermes-autonomous-builder",image:"/assets/hermes-autonomous-builder-poster.webp",video:"/assets/hermes-autonomous-builder-demo.mp4",accent:"violet"}];

const COURSES=[
{title:"IBM AI Developer Professional Certificate",issuer:"IBM / Coursera",status:"done",cred:"https://coursera.org/share/2b28ae0dfd0d0fdab4bc089f1b8e40aa",tags:["AI","Python","Software"],modules:["Introduction to Software Engineering","Introduction to Artificial Intelligence (AI)","Generative AI: Introduction and Applications","Generative AI: Prompt Engineering Basics","Introduction to HTML, CSS, & JavaScript","Python for Data Science, AI & Development","Developing AI Applications with Python and Flask","Building Generative AI-Powered Applications with Python","Generative AI: Elevate your Software Development Career","Software Developer Career Guide and Interview Preparation"]},
{title:"Google IT Automation with Python",issuer:"Google / Coursera",status:"done",cred:"https://www.coursera.org/account/accomplishments/specialization/BPLDXASSJLHP",credId:"BPLDXASSJLHP",tags:["Python","Automation","Git"],modules:["Crash Course on Python","Using Python to Interact with the Operating System","Introduction to Git and GitHub","Troubleshooting and Debugging Techniques","Configuration Management and the Cloud","Automating Real-World Tasks with Python"]},
{title:"Blockchain Deep Dive",issuer:"Binance Academy",status:"done",cred:"https://www.binance.com/en/academy/courses/certificate/c212cdb9c9c581302e714aadc36754cc07b207018f9bd36b99faff54d7bd1ea2",tags:["Blockchain","Web3"]},
{title:"Introduction to Selenium",issuer:"Simplilearn SkillUp",status:"done",tags:["Automation","Testing"]},
{title:"AI Automation Explorer",issuer:"Make",status:"done",cred:"https://www.credly.com/badges/f7e0e0bb-2d78-414c-9cbf-e13776702e32/",tags:["Automation","Make"]},
{title:"Information Technology Fundamentals",issuer:"IBM",status:"done",cred:"https://www.credly.com/badges/1c6da203-cd2f-43e9-b131-d8cf13027ded",tags:["IT","Networking","Support"]},
{title:"AWS Generative AI and AI Agents with Amazon Bedrock",issuer:"AWS / Coursera",status:"done",cred:"https://www.coursera.org/account/accomplishments/verify/1MO2XPYJ9BLW",tags:["AWS","Generative AI","Agents"],modules:["Getting Started with AWS Generative AI for Developers","Generative AI Applications with Amazon Bedrock","Amazon Bedrock Customization, Optimization & Automation"]},
{title:"IBM RAG and Agentic AI Professional Certificate",issuer:"IBM / Coursera",status:"doing",tags:["RAG","Agents","MCP"],modules:["Develop Generative AI Applications: Get Started","Build RAG Applications: Get Started","Vector Databases for RAG: An Introduction","Advanced RAG with Vector Databases and Retrievers","Build Multimodal Generative AI Applications","Fundamentals of Building AI Agents","Agentic AI with LangChain and LangGraph","Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI","Build AI Agents using MCP","RAG and Agentic AI Capstone Project"]},
{title:"Building AI Agents and Agentic Workflows Specialization",issuer:"Coursera",status:"doing",tags:["Agents","LangGraph"],modules:["Fundamentals of Building AI Agents","Agentic AI with LangChain and LangGraph","Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI"]},
{title:"Managing AI Systems: Development, Deployment, and Governance Specialization",issuer:"Board Infinity",status:"planned",tags:["AI","Governance","MLOps"],modules:["AI Risk and Compliance: Audit and Governance Foundations","AI Systems Design: RAG Pipelines and LLM Architecture","MLOps and LLMOps: Deploying and Scaling AI in Production"]},
{title:"AI Security Specialization",issuer:"Coursera",status:"planned",tags:["AI Security","Governance"],modules:["Generative AI for Security Fundamentals","Generative AI and LLM Security","Securing AI Systems"]},
{title:"DevOps and AI on AWS Specialization",issuer:"AWS / Coursera",status:"planned",tags:["AWS","DevOps","AIOps"],modules:["DevOps and AI on AWS: Upgrading Apps with Generative AI","DevOps and AI on AWS: CI/CD for Generative AI Applications","DevOps and AI on AWS: AIOps"]}];

const FALLBACK_BOOKS=[
{title:"AI Agents in Depth",author:"Bojie Li",edition:"v1.2",status:"reading"},
{title:"Deep Work",author:"Cal Newport",status:"read",cover:"assets/book-deep-work.jpg",ref:"https://openlibrary.org/works/OL17713267W"},
{title:"Antifrágil",author:"Nassim Nicholas Taleb",status:"read",cover:"assets/book-antifragile.jpg",ref:"https://openlibrary.org/works/OL16726829W"},
{title:"Inteligência Emocional",author:"Daniel Goleman",status:"read"},
{title:"Dar e Receber",author:"Adam Grant",status:"read",cover:"assets/book-give-take.jpg",ref:"https://openlibrary.org/works/OL17312332W"},
{title:"Steve Jobs",author:"Walter Isaacson",status:"read",cover:"assets/book-steve-jobs.jpg",ref:"https://openlibrary.org/works/OL16085155W"},
{title:"Outliers",author:"Malcolm Gladwell",status:"read"},
{title:"Sapiens",author:"Yuval Noah Harari",status:"planned"},
{title:"Em Busca de Sentido",author:"Viktor E. Frankl",status:"planned"},
{title:"Atomic Habits",author:"James Clear",status:"planned"}];
let BOOKS=FALLBACK_BOOKS;

/* ================= I18N ================= */
const I18N={
pt:{
"skip":"Pular para o conteúdo","nav.home":"Início","nav.projects":"Projetos","nav.about":"Sobre","nav.education":"Formação","nav.library":"Biblioteca","nav.contact":"Contato",
"hero.status":"Disponível para posições em IA, automação e software · Remoto / São Paulo","hero.role":"Automação especializada · IA aplicada · Desenvolvimento de software",
"hero.bio":"Desenvolvo ferramentas em Python, agentes e aplicações local-first que transformam operações fragmentadas em fluxos claros, testáveis e operáveis.",
"hero.cta.projects":"Ver projetos","hero.cta.resume":"Currículo","hero.meta2":"Produtos próprios · código público · demonstrações reais",
"hero.proof":"As interfaces aqui são demonstrações visuais. O código-fonte, a documentação e os repositórios completos estão no GitHub.","hero.proofLink":"Ver GitHub",
"hero.featured":"Projeto em destaque — Global Builder Radar","hero.badge":"demo silenciosa · clique para abrir","hero.radarAria":"Global Builder Radar — abrir projeto",
"rail.title":"Do problema ao sistema","rail.hint":"cinco projetos · automação com evidência · clique para abrir",
"rail.radar":"Coleta, normaliza, deduplica e prioriza oportunidades para revisão humana.",
"rail.focus":"Concentra prioridades, projetos e aprendizado em um desktop local-first.",
"rail.maintenance":"Combina similaridade histórica, RAG documental e barreiras de segurança.",
"rail.publisher":"Transforma qualidade e segurança de repositórios em verificações reproduzíveis.",
"rail.hermes":"Separa arquitetura, implementação e revisão antes de permitir DONE.",
"gh.title":"Atividade pública no GitHub","gh.sub":"Contribuições do último ano, atualizadas por uma API pública do GitHub.",
"gh.less":"menos","gh.more":"mais","gh.live":"ao vivo","gh.cache":"cache local","gh.snap":"snapshot local","gh.loading":"carregando…",
"gh.total":"contribuições no último ano","gh.fail":"Não foi possível carregar dados de contribuição.",
"projects.kicker":"Projetos selecionados","projects.title":"Sistemas que transformam trabalho complexo em fluxo verificável",
"projects.sub":"Cinco projetos públicos que mostram como penso e construo: aplicações desktop, pipelines de dados, RAG, governança de repositórios e arquitetura de agentes.",
"projects.open":"Abrir projeto","projects.github":"GitHub",
"pd.back":"projetos","pd.problem":"Problema","pd.approach":"Abordagem","pd.delivery":"Entrega","pd.arch":"Arquitetura","pd.tech":"Tecnologias utilizadas","pd.limit":"Limites","pd.media":"Mídia","pd.demo":"Demonstração em vídeo","pd.gallery":"Galeria","pd.flow":"Fluxo","pd.slides":"Case visual","pd.slidePrev":"Slide anterior","pd.slideNext":"Próximo slide","pd.slideExpand":"Ampliar slide",
"pd.radar.summary":"Pipeline que coleta, normaliza, deduplica e prioriza oportunidades para transformar pesquisa dispersa em decisões revisáveis.",
"pd.radar.problem":"Oportunidades relevantes chegam por fontes incompatíveis, com duplicatas, ruído e pouco contexto para decidir o que merece atenção.",
"pd.radar.approach":"Modelei coletores por fonte, normalização, deduplicação e ranking determinístico por perfil, encerrando o fluxo em um dashboard de revisão.",
"pd.radar.limit":"Os sinais precisam de avaliação humana. O projeto não garante demanda ou retorno financeiro.",
"pd.radar.delivery":["Oportunidades de fontes diferentes em uma lista organizada.","Filtros e classificação determinística para revisão humana.","Visões separadas para projetos freelance e empregos."],
"pd.radar.arch":["Coletores por fonte e normalização de registros.","Deduplicação e classificação por regras de perfil.","Persistência em SQLite e dashboard para consulta."],
"pd.radar.flow":["Fontes","Normalização","Revisão"],
"pd.radar.note":"Captura do dashboard do projeto. Demonstração em vídeo disponível neste portfólio.",
"pd.focus.summary":"Aplicação desktop local-first que reúne prioridades, projetos, aprendizado, credenciais e atalhos de arquivos em um único cockpit pessoal.",
"pd.focus.problem":"Prioridades e próximos passos se perdem quando planejamento, cursos, credenciais e arquivos vivem em ferramentas diferentes.",
"pd.focus.approach":"Construí uma aplicação desktop privada por design, com dados em SQLite, áreas operacionais conectadas e acesso explícito apenas aos arquivos selecionados pelo usuário.",
"pd.focus.limit":"Projeto pessoal. Não representa uma implantação empresarial ou resultados de clientes.",
"pd.focus.delivery":["Aplicação desktop com dados locais em SQLite.","Áreas para prioridades, projetos, cursos e documentos.","Backup e restauração com verificações de integridade."],
"pd.focus.arch":["Interface React e TypeScript.","Repositórios tipados e esquema SQLite com migrações.","Comandos nativos restritos em Tauri/Rust para arquivos e backups."],
"pd.focus.flow":["Interface","Dados locais","Ações nativas"],
  "pd.focus.note":"Demonstração em vídeo e capturas reais da aplicação. A interface do aplicativo está em português.",
"pd.maintenance.summary":"Plataforma local que transforma eventos de vibração em hipóteses, evidências e recomendações rastreáveis.",
"pd.maintenance.problem":"Eventos industriais têm muitas variáveis e uma resposta generativa sem barreiras pode omitir incerteza ou citar procedimentos sem sustentação.",
"pd.maintenance.approach":"O protótipo compara 23 variáveis com 166.796 eventos históricos, aplica um limiar determinístico de confiança e recupera somente trechos de documentos técnicos aprovados antes de redigir a resposta.",
"pd.maintenance.limit":"Protótipo demonstrativo criado para um processo seletivo da FIESC. Não foi implantado em ambiente industrial e não substitui manuais, inspeções ou profissionais habilitados.",
"pd.maintenance.delivery":["Dashboard Streamlit funcional com evento editável e consulta técnica.","Hipótese por similaridade, confiança e casos históricos visíveis.","Recomendação com documento, página, trecho de origem e fallback determinístico."],
"pd.maintenance.arch":["FastAPI e contratos OpenAPI para entrada e saída.","SQLite WAL, vizinhos mais próximos e recuperação TF-IDF sobre PDFs.","OpenRouter ou Ollama opcionais, com validação de fontes antes da resposta."],
"pd.maintenance.techDetail":"O RAG documental recupera e ranqueia trechos dos PDFs com TF-IDF. Separadamente, NumPy e scikit-learn comparam as 23 variáveis do evento aos casos históricos; a LLM é opcional e só redige após essas etapas.",
"pd.maintenance.flow":["23 variáveis do sensor","Similaridade + confiança","Documentos aprovados","Recomendação validada"],
"pd.publisher.summary":"CLI de governança que audita repositórios, sinaliza riscos de publicação e converte qualidade em um checklist verificável.",
"pd.publisher.problem":"Publicar projetos exige documentação coerente, higiene Git e proteção contra credenciais ou arquivos privados esquecidos.",
"pd.publisher.approach":"Uma CLI de auditoria e verificações antes da publicação. Os comandos audit e check apenas leem o repositório; não publicam nem corrigem arquivos automaticamente.",
"pd.publisher.limit":"A revisão humana continua necessária antes de publicar qualquer repositório.",
"pd.publisher.delivery":["Auditoria local de documentação e organização do repositório.","Verificações de arquivos sensíveis e possíveis credenciais.","Relatório de prontidão para revisão antes da publicação."],
"pd.publisher.arch":["CLI em Python para audit e check.","Verificações determinísticas de arquivos e estado Git.","Saída no terminal e exportação opcional de relatório JSON."],
"pd.publisher.flow":["Repositório","Verificações","Relatório"],
"pd.publisher.audit":"Auditoria determinística — verificações levam à revisão humana",
"pd.publisher.note":"Demonstração visual em inglês montada a partir dos dois clipes H3 aprovados.",
"pd.hermes.summary":"Arquitetura V0 para um builder autônomo de software que separa planejamento, implementação e revisão e só conclui trabalho com evidência reproduzível.",
"pd.hermes.problem":"Agentes de código podem confundir uma resposta plausível com trabalho concluído, executar fora do escopo ou aprovar a própria implementação.",
"pd.hermes.approach":"Projetei um fluxo sequencial com Architect, Coder e Reviewer isolados. O Hermes controla estados; o OmniRoute escolhe rotas dentro de cada papel; gates determinísticos verificam SHA, testes, diff, critérios e independência antes de DONE.",
"pd.hermes.limit":"V0 documental: contratos, schemas e plano de validação estão publicados, mas o runtime autônomo ainda não foi implementado nem validado em produção.",
"pd.hermes.delivery":["Arquitetura e máquina de estados com papéis e limites explícitos.","Contratos JSON para handoffs e veredictos de revisão.","Plano de segurança, recuperação, quotas e evidências antes de DONE."],
"pd.hermes.arch":["Hermes como orquestrador exclusivo das transições de estado.","OmniRoute restrito à seleção de rota dentro do papel ativo.","Revisor independente vinculado ao mesmo Git SHA testado."],
"pd.hermes.flow":["Meta autorizada","Architect","Coder + testes","Reviewer independente","DONE com evidências"],
"pd.hermes.note":"Visualização em vídeo da arquitetura V0. O repositório publicado contém a especificação e os contratos, não um runtime autônomo.",
"about.kicker":"Sobre","about.title":"Experiência operacional virou engenharia de sistemas","about.photo":"São Paulo, Brasil · passe o cursor para cor",
"about.intro":"Minha trajetória passa por formação técnica, mercados financeiros, marketing de performance, comunidades Web3 e automação. Em todas essas áreas, o padrão foi o mesmo: entender o processo, reduzir trabalho repetitivo e criar mecanismos para decidir com mais clareza. Hoje aplico essa experiência na construção de software, agentes e produtos de IA.",
"about.honesty.h":"O que você pode verificar:","about.honesty.b":"código público, decisões de arquitetura, demonstrações reais e limites documentados. Os projetos são independentes e mostram capacidade de transformar problemas ambíguos em sistemas operáveis.",
"about.timeline":"Linha do tempo",
"tl.1.t":"Formação técnica em Manutenção de Aeronaves","tl.1.w":"base técnica","tl.1.b":"Formação técnica que ensinou disciplina de processos, leitura de manuais e respeito absoluto por procedimentos de segurança — mentalidade que levo para o software.",
"tl.2.t":"Trabalho independente em mercados financeiros","tl.2.w":"desde 2018","tl.2.b":"Atuação independente em mercados financeiros, onde desenvolvi rotinas de análise, automação de tarefas e gestão de risco por conta própria.",
"tl.3.t":"Operações digitais, Web3 e conteúdo","tl.3.w":"2021–2024","tl.3.b":"Trabalhei com campanhas digitais, comunidades Web3, sites, automações de e-mail e produção do canal Crypto Frontier — experiência prática conectando tecnologia, comunicação e operação.",
"tl.4.t":"Produtos próprios em automação, IA e software","tl.4.w":"agora","tl.4.b":"Construo ferramentas em Python, aplicações local-first, pipelines de dados e arquiteturas agentic, com código, documentação e demonstrações publicados para avaliação.",
"edu.kicker":"Base técnica em evolução","edu.title":"Certificações aplicadas a projetos reais",
"edu.sub":"Uso cursos e certificações para aprofundar fundamentos e, em seguida, transformo o aprendizado em código, arquitetura e demonstrações públicas.",
"edu.done":"Concluídos","edu.doing":"Em andamento","edu.planned":"Planejados","edu.cred":"Ver credencial",
"lib.kicker":"Biblioteca","lib.title":"Leitura como parte do método","lib.sub":"Minha biblioteca conecta engenharia, comportamento, estratégia e tomada de decisão — referências que influenciam como projeto sistemas e trabalho.",
"lib.reading":"Lendo agora","lib.read":"Lidos","lib.planned":"Planejados","lib.ref":"referência",
"contact.kicker":"Contato","contact.title":"Vamos construir algo útil",
"contact.sub":"Estou aberto a posições e projetos em automação com IA, sistemas agentic, Python e produtos internos. GitHub e demos mostram como trabalho; os portfólios legados registram minha experiência anterior em marketing, Web3 e mercados.",
"contact.primary":"Canais profissionais","contact.secondary":"Histórico e conteúdo","contact.resumeEn":"Currículo (EN)","contact.resumePt":"Currículo (PT)",
"contact.mkt":"Marketing e Web3","contact.fin":"Mercados e finanças",
"term.kicker":"Rota alternativa","term.title":"Terminal","term.sub":"Navegue pelo portfólio como uma interface de linha de comando. Os comandos são locais, determinísticos e não executam ações externas — digite help.",
"footer.terminal":"terminal","lb.close":"Fechar"
},
en:{
"skip":"Skip to content","nav.home":"Home","nav.projects":"Projects","nav.about":"About","nav.education":"Education","nav.library":"Library","nav.contact":"Contact",
"hero.status":"Open to AI, automation and software roles · Remote / São Paulo","hero.role":"Specialized Automation · Applied AI · Software Development",
"hero.bio":"I build Python tools, agents and local-first applications that turn fragmented operations into clear, testable and operable workflows.",
"hero.cta.projects":"View projects","hero.cta.resume":"Resume","hero.meta2":"Independent products · public code · real demos",
"hero.proof":"The interfaces shown here are visual demonstrations. Full source code, documentation and repositories are available on GitHub.","hero.proofLink":"View GitHub",
"hero.featured":"Featured project — Global Builder Radar","hero.badge":"silent demo · click to open","hero.radarAria":"Global Builder Radar — open project",
"rail.title":"From problem to system","rail.hint":"five projects · automation with evidence · click to open",
"rail.radar":"Collects, normalizes, deduplicates and ranks opportunities for human review.",
"rail.focus":"Brings priorities, projects and learning into a local-first desktop workspace.",
"rail.maintenance":"Combines historical similarity, document RAG and safety barriers.",
"rail.publisher":"Turns repository quality and security into reproducible checks.",
"rail.hermes":"Separates architecture, implementation and review before allowing DONE.",
"gh.title":"Public GitHub activity","gh.sub":"Contributions from the last year, updated through a public GitHub API.",
"gh.less":"less","gh.more":"more","gh.live":"live","gh.cache":"local cache","gh.snap":"local snapshot","gh.loading":"loading…",
"gh.total":"contributions in the last year","gh.fail":"Could not load contribution data.",
"projects.kicker":"Selected projects","projects.title":"Systems that turn complex work into verifiable flow",
"projects.sub":"Five public projects that show how I think and build: desktop applications, data pipelines, RAG, repository governance and agent architecture.",
"projects.open":"Open project","projects.github":"GitHub",
"pd.back":"projects","pd.problem":"Problem","pd.approach":"Approach","pd.delivery":"Delivery","pd.arch":"Architecture","pd.tech":"Technology stack","pd.limit":"Limitations","pd.media":"Media","pd.demo":"Video demo","pd.gallery":"Gallery","pd.flow":"Flow","pd.slides":"Visual case study","pd.slidePrev":"Previous slide","pd.slideNext":"Next slide","pd.slideExpand":"Expand slide",
"pd.radar.summary":"A pipeline that collects, normalizes, deduplicates and ranks opportunities, turning scattered research into reviewable decisions.",
"pd.radar.problem":"Relevant opportunities arrive through incompatible sources, with duplicates, noise and little context for deciding what deserves attention.",
"pd.radar.approach":"I designed source-specific collectors, normalization, deduplication and deterministic profile ranking, ending in a review dashboard.",
"pd.radar.limit":"Signals require human assessment. The project does not guarantee demand or financial returns.",
"pd.radar.delivery":["Opportunities from different sources in one organized list.","Deterministic filtering and ranking for human review.","Separate views for freelance projects and employment."],
"pd.radar.arch":["Source-specific collectors and record normalization.","Deduplication and ranking with profile rules.","SQLite persistence and a review dashboard."],
"pd.radar.flow":["Sources","Normalization","Review"],
"pd.radar.note":"Screenshot of the project dashboard. A video demonstration is available in this portfolio.",
"pd.focus.summary":"A local-first desktop application that brings priorities, projects, learning, credentials and file shortcuts into one personal cockpit.",
"pd.focus.problem":"Priorities and next actions get lost when planning, courses, credentials and files live across separate tools.",
"pd.focus.approach":"I built a private-by-design desktop application with SQLite storage, connected operational views and explicit access only to files selected by the user.",
"pd.focus.limit":"Personal project. It does not represent an enterprise deployment or client results.",
"pd.focus.delivery":["Desktop application with local SQLite storage.","Views for priorities, projects, courses and documents.","Backup and restore with integrity checks."],
"pd.focus.arch":["React and TypeScript interface.","Typed repositories and a SQLite schema with migrations.","Restricted Tauri/Rust native commands for files and backups."],
"pd.focus.flow":["Interface","Local data","Native actions"],
  "pd.focus.note":"Video demonstration and actual application screenshots. The application interface is in Portuguese.",
"pd.maintenance.summary":"A local platform that turns vibration events into hypotheses, evidence and traceable recommendations.",
"pd.maintenance.problem":"Industrial events contain many variables, and unconstrained generation can hide uncertainty or cite procedures without supporting evidence.",
"pd.maintenance.approach":"The prototype compares 23 variables against 166,796 historical events, applies a deterministic confidence threshold and retrieves approved technical excerpts before drafting a response.",
"pd.maintenance.limit":"Demonstration prototype built for a FIESC hiring process. It was not deployed in an industrial environment and does not replace manuals, inspections or qualified professionals.",
"pd.maintenance.delivery":["Working Streamlit dashboard with editable events and technical queries.","Similarity-based hypothesis, confidence and inspectable historical cases.","Recommendation with document, page, source excerpt and deterministic fallback."],
"pd.maintenance.arch":["FastAPI and OpenAPI contracts for input and output.","SQLite WAL, nearest-neighbor similarity and TF-IDF retrieval over PDFs.","Optional OpenRouter or Ollama with source validation before returning a response."],
"pd.maintenance.techDetail":"Document RAG retrieves and ranks PDF excerpts with TF-IDF. Separately, NumPy and scikit-learn compare the event's 23 variables with historical cases; the LLM is optional and only drafts after those stages.",
"pd.maintenance.flow":["23 sensor variables","Similarity + confidence","Approved documents","Validated recommendation"],
"pd.publisher.summary":"A governance CLI that audits repositories, flags publication risks and turns quality into a verifiable checklist.",
"pd.publisher.problem":"Publishing projects requires coherent documentation, Git hygiene and protection against forgotten credentials or private files.",
"pd.publisher.approach":"A CLI for auditing and checking before publication. The audit and check commands only read the repository; they do not publish or automatically fix files.",
"pd.publisher.limit":"Human review is still required before publishing any repository.",
"pd.publisher.delivery":["Local audit of repository documentation and organization.","Checks for sensitive files and potential credentials.","Readiness report for review before publication."],
"pd.publisher.arch":["Python CLI with audit and check commands.","Deterministic checks of files and Git state.","Terminal output and optional JSON report export."],
"pd.publisher.flow":["Repository","Checks","Report"],
"pd.publisher.audit":"Deterministic audit — checks lead to human review",
"pd.publisher.note":"English visual demonstration assembled from the two approved H3 clips.",
"pd.hermes.summary":"A V0 architecture for an autonomous software builder that separates planning, implementation and review, and only completes work with reproducible evidence.",
"pd.hermes.problem":"Coding agents can mistake a plausible response for completed work, operate beyond scope or approve their own implementation.",
"pd.hermes.approach":"I designed a sequential flow with isolated Architect, Coder and Reviewer roles. Hermes owns state transitions; OmniRoute selects routes within each role; deterministic gates verify SHA, tests, diff, criteria and independence before DONE.",
"pd.hermes.limit":"Documentation V0: contracts, schemas and the validation plan are published, but the autonomous runtime has not yet been implemented or validated in production.",
"pd.hermes.delivery":["Architecture and state machine with explicit roles and boundaries.","JSON contracts for handoffs and review verdicts.","Security, recovery, quota and evidence plan before DONE."],
"pd.hermes.arch":["Hermes as the sole orchestrator of state transitions.","OmniRoute restricted to route selection within the active role.","Independent reviewer bound to the same tested Git SHA."],
"pd.hermes.flow":["Authorized goal","Architect","Coder + tests","Independent reviewer","Evidence-backed DONE"],
"pd.hermes.note":"Video visualization of the V0 architecture. The published repository contains the specification and contracts, not an autonomous runtime.",
"about.kicker":"About","about.title":"Operational experience became systems engineering","about.photo":"São Paulo, Brazil · hover for color",
"about.intro":"My path spans technical training, financial markets, performance marketing, Web3 communities and automation. Across those fields, the pattern has remained the same: understand the process, reduce repetitive work and create mechanisms for clearer decisions. Today I apply that experience to software, agents and AI products.",
"about.honesty.h":"What you can verify:","about.honesty.b":"public code, architecture decisions, real demonstrations and documented limitations. These independent projects show how I turn ambiguous problems into operable systems.",
"about.timeline":"Timeline",
"tl.1.t":"Technical training in Aircraft Maintenance","tl.1.w":"technical foundation","tl.1.b":"Technical training that taught process discipline, manual reading and absolute respect for safety procedures — a mindset I carry into software.",
"tl.2.t":"Independent work in financial markets","tl.2.w":"since 2018","tl.2.b":"Independent work in financial markets, where I developed analysis routines, task automation and self-directed risk management.",
"tl.3.t":"Digital operations, Web3 and content","tl.3.w":"2021–2024","tl.3.b":"I worked with digital campaigns, Web3 communities, websites, email automation and the Crypto Frontier channel — practical experience connecting technology, communication and operations.",
"tl.4.t":"Independent products in automation, AI and software","tl.4.w":"now","tl.4.b":"I build Python tools, local-first applications, data pipelines and agentic architectures, publishing code, documentation and demonstrations for review.",
"edu.kicker":"An evolving technical foundation","edu.title":"Certifications applied to real projects",
"edu.sub":"I use courses and certifications to deepen fundamentals, then turn that learning into code, architecture and public demonstrations.",
"edu.done":"Completed","edu.doing":"In progress","edu.planned":"Planned","edu.cred":"View credential",
"lib.kicker":"Library","lib.title":"Reading as part of the method","lib.sub":"My library connects engineering, behavior, strategy and decision-making — references that shape how I design systems and work.",
"lib.reading":"Reading now","lib.read":"Read","lib.planned":"Planned","lib.ref":"reference",
"contact.kicker":"Contact","contact.title":"Let's build something useful",
"contact.sub":"I am open to roles and projects in AI automation, agentic systems, Python and internal products. GitHub and demos show how I work; the legacy portfolios document my earlier experience in marketing, Web3 and markets.",
"contact.primary":"Professional channels","contact.secondary":"Background and content","contact.resumeEn":"Resume (EN)","contact.resumePt":"Resume (PT)",
"contact.mkt":"Marketing and Web3","contact.fin":"Markets and finance",
"term.kicker":"Alternate route","term.title":"Terminal","term.sub":"Navigate the portfolio through a command-line interface. Commands are local, deterministic and perform no external actions — type help.",
"footer.terminal":"terminal","lb.close":"Close"
}};

/* ================= STATE ================= */
let LANG=localStorage.getItem("sig-lang")||"pt";
const t=k=>{const v=I18N[LANG][k];return v!==undefined?v:k};
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= THEME ================= */
const themeBtn=document.getElementById("themeToggle");
function setTheme(th){document.documentElement.dataset.theme=th;localStorage.setItem("sig-theme",th);
  document.getElementById("themeIcon").setAttribute("data-lucide",th==="dark"?"sun-medium":"moon");
  if(window.lucide)lucide.createIcons();}
setTheme(localStorage.getItem("sig-theme")||"dark");
themeBtn.addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));

/* ================= LANG ================= */
function applyLang(){
  document.documentElement.lang=LANG==="pt"?"pt-BR":"en";
  document.getElementById("langToggle").textContent=LANG==="pt"?"EN":"PT";
  document.querySelectorAll("[data-i18n]").forEach(el=>{const v=t(el.dataset.i18n);if(typeof v==="string")el.textContent=v});
  document.querySelectorAll("[data-i18n-aria]").forEach(el=>{const v=t(el.dataset.i18nAria);if(typeof v==="string")el.setAttribute("aria-label",v)});
  document.getElementById("resumeBtn").href=LANG==="pt"?"/downloads/Everton-Soares-PT.pdf":"/downloads/Everton-Soares-EN.pdf";
  const ghTotal=document.getElementById("ghTotal");
  if(ghTotal?.dataset.total)ghTotal.textContent=ghTotal.dataset.total+" "+t("gh.total");
  renderProjects();renderTimeline();renderEducation();renderLibrary();
  if(currentProject)renderProjectDetail(currentProject);
  if(window.lucide)lucide.createIcons();
}
document.getElementById("langToggle").addEventListener("click",()=>{LANG=LANG==="pt"?"en":"pt";localStorage.setItem("sig-lang",LANG);applyLang()});

/* ================= ROUTER ================= */
const ROUTES=["home","projects","about","education","library","contact","terminal"];
let currentProject=null;
function route(){
  const hash=location.hash.replace(/^#\/?/,"")||"home";
  const parts=hash.split("/");
  let view=parts[0];
  if(view==="project"&&parts[1]&&PROJECTS.some(p=>p.id===parts[1])){currentProject=parts[1];view="project"}
  else if(view==="project"){view="projects";currentProject=null;history.replaceState(null,"","#projects")}
  else if(!ROUTES.includes(view)){view="home";currentProject=null}
  else currentProject=null;
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.dataset.view===view));
  document.querySelectorAll(".main-nav a").forEach(a=>{
    const r=a.dataset.route;
    if(r===view||(view==="project"&&r==="projects"))a.setAttribute("aria-current","page");
    else a.removeAttribute("aria-current");
  });
  if(view==="project")renderProjectDetail(currentProject);
  if(view==="terminal")setTimeout(()=>document.getElementById("termInput").focus(),60);
  document.getElementById("mainNav").classList.remove("open");
  window.scrollTo({top:0,behavior:"auto"});
  if(window.lucide)lucide.createIcons();
}
window.addEventListener("hashchange",route);
document.getElementById("navToggle").addEventListener("click",e=>{
  const nav=document.getElementById("mainNav");const open=nav.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded",open);
});

/* ================= SIGNAL RAIL ================= */
(function(){
  const items=[...document.querySelectorAll(".rail-item")];
  const pulse=document.getElementById("railPulse");
  let idx=0,timer=null;
  function activate(i){
    idx=i;
    items.forEach((it,j)=>it.classList.toggle("active",j===i));
    if(!reduced)pulse.dataset.step=String(i);
  }
  function start(){if(reduced)return;timer=setInterval(()=>activate((idx+1)%items.length),2600)}
  function stop(){clearInterval(timer)}
  const rail=document.getElementById("signalRail");
  rail.addEventListener("pointerenter",stop);
  rail.addEventListener("pointerleave",start);
  rail.addEventListener("focusin",stop);
  rail.addEventListener("focusout",start);
  activate(0);start();
})();

/* ================= RADAR HOVER VIDEO ================= */
(function(){
  const frame=document.getElementById("radarMedia");
  const video=document.getElementById("radarVideo");
  const canHover=window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if(canHover&&!reduced){
    frame.addEventListener("mouseenter",()=>{frame.classList.add("is-playing");video.play().catch(()=>{})});
    frame.addEventListener("mouseleave",()=>{video.pause();frame.classList.remove("is-playing")});
  }
  frame.addEventListener("click",()=>location.hash="#project/radar");
  frame.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();location.hash="#project/radar"}});
})();

/* ================= PROJECTS LIST ================= */
function projectMedia(p){
  if(!p.image)return `<div class="proj-media"><div class="proj-placeholder">$ evidence → validation → human review</div></div>`;
  if(p.slides){
    const first=p.slides[0];
    return `<div class="proj-media project-slide-preview" data-project-slides>
      <a class="project-slide-link" href="#project/${p.id}" aria-label="${p.name}">
        <img src="${first.img}" alt="${LANG==="pt"?first.pt:first.en}" loading="lazy" data-project-slide-img>
      </a>
      <button class="project-slide-nav project-slide-prev" type="button" data-project-slide-prev aria-label="${t("pd.slidePrev")}"><i data-lucide="chevron-left"></i></button>
      <button class="project-slide-nav project-slide-next" type="button" data-project-slide-next aria-label="${t("pd.slideNext")}"><i data-lucide="chevron-right"></i></button>
      <span class="project-slide-title" data-project-slide-title>${LANG==="pt"?first.pt:first.en}</span>
      <span class="project-slide-hint" aria-live="polite"><i data-lucide="gallery-horizontal-end"></i><span data-project-slide-current>01</span> / ${String(p.slides.length).padStart(2,"0")}</span>
    </div>`;
  }
  return `<a class="proj-media" href="#project/${p.id}" aria-label="${p.name}" ${p.video?"data-project-video":""}>
    <img src="${p.image}" alt="${p.name}" loading="lazy">${p.video?`<video muted loop playsinline preload="metadata" poster="${p.image}" aria-hidden="true"><source src="${p.video}" type="video/mp4"></video><span class="project-video-hint"><i data-lucide="play"></i>${LANG==="pt"?"Passe o mouse":"Hover to play"}</span>`:""}
  </a>`;
}
function renderProjects(){
  const el=document.getElementById("projectsList");
  el.innerHTML=PROJECTS.map((p,i)=>`
    <article class="proj-row ${i%2?"flip":""}">
      ${projectMedia(p)}
      <div class="proj-body">
        <div class="tag-row">${p.tags.map(x=>`<span class="tag">${x}</span>`).join("")}</div>
        <h3>${p.name}</h3>
        <p>${t("pd."+p.id+".summary")}</p>
        <div class="row-actions">
          <a class="btn btn-primary btn-sm" href="#project/${p.id}"><i data-lucide="arrow-right"></i>${t("projects.open")}</a>
          <a class="btn btn-ghost btn-sm" href="${p.url}" target="_blank" rel="noopener"><i data-lucide="github"></i>${t("projects.github")}</a>
        </div>
      </div>
    </article>`).join("");
  mountProjectVideos();
  mountProjectSlidePreviews();
}

function mountProjectVideos(){
  if(reduced||!window.matchMedia("(hover:hover) and (pointer:fine)").matches)return;
  document.querySelectorAll("[data-project-video]").forEach(frame=>{
    const video=frame.querySelector("video");if(!video)return;
    frame.addEventListener("mouseenter",()=>video.play().then(()=>frame.classList.add("is-playing")).catch(()=>{}));
    frame.addEventListener("mouseleave",()=>{video.pause();frame.classList.remove("is-playing")});
    frame.addEventListener("focus",()=>video.play().then(()=>frame.classList.add("is-playing")).catch(()=>{}));
    frame.addEventListener("blur",()=>{video.pause();frame.classList.remove("is-playing")});
  });
}

function mountProjectSlidePreviews(){
  document.querySelectorAll("[data-project-slides]").forEach(preview=>{
    const project=PROJECTS.find(p=>p.slides&&p.image===preview.querySelector("[data-project-slide-img]")?.getAttribute("src"));
    if(!project)return;
    const image=preview.querySelector("[data-project-slide-img]");
    const title=preview.querySelector("[data-project-slide-title]");
    const current=preview.querySelector("[data-project-slide-current]");
    let index=0;
    const show=next=>{
      index=(next+project.slides.length)%project.slides.length;
      const slide=project.slides[index];
      image.src=slide.img;image.alt=LANG==="pt"?slide.pt:slide.en;
      title.textContent=LANG==="pt"?slide.pt:slide.en;
      current.textContent=String(index+1).padStart(2,"0");
    };
    preview.querySelector("[data-project-slide-prev]").addEventListener("click",()=>show(index-1));
    preview.querySelector("[data-project-slide-next]").addEventListener("click",()=>show(index+1));
  });
}

/* ================= PROJECT DETAIL ================= */
function flowDiagram(flow,accent){
  return `<div class="flow-diagram" role="list" aria-label="${t("pd.flow")}">`+
    flow.map((f,i)=>{
      const cls=i===flow.length-1?(accent==="violet"?"violet":"accent"):"";
      return (i?`<span class="flow-arrow" aria-hidden="true">→</span>`:"")+
        `<div class="flow-node ${cls}" role="listitem">${f}<small>${String(i+1).padStart(2,"0")}</small></div>`;
    }).join("")+`</div>`;
}
let galleryData=[];
function renderCaseDeck(slides){
  galleryData=slides.map(s=>({img:s.img,label:LANG==="pt"?s.pt:s.en}));
  return `<div class="case-deck" data-case-deck tabindex="0" role="region" aria-roledescription="carousel" aria-label="${t("pd.slides")}">
    <div class="deck-stage">
      ${slides.map((s,i)=>`<figure class="deck-slide ${i===0?"active":""}" data-deck-slide data-title="${LANG==="pt"?s.pt:s.en}" data-note="${LANG==="pt"?s.ptNote:s.enNote}" aria-hidden="${i===0?"false":"true"}">
        <button type="button" data-lb="${i}" aria-label="${t("pd.slideExpand")}: ${LANG==="pt"?s.pt:s.en}">
          <img src="${s.img}" alt="${LANG==="pt"?s.pt:s.en}" ${i===0?'loading="eager"':'loading="lazy"'}>
        </button>
      </figure>`).join("")}
      <button class="deck-nav deck-prev" type="button" data-deck-prev aria-label="${t("pd.slidePrev")}" title="${t("pd.slidePrev")}"><i data-lucide="chevron-left"></i></button>
      <button class="deck-nav deck-next" type="button" data-deck-next aria-label="${t("pd.slideNext")}" title="${t("pd.slideNext")}"><i data-lucide="chevron-right"></i></button>
      <span class="deck-counter"><span data-deck-current>01</span> / ${String(slides.length).padStart(2,"0")}</span>
    </div>
    <div class="deck-meta">
      <div><strong data-deck-title>${LANG==="pt"?slides[0].pt:slides[0].en}</strong><p data-deck-note>${LANG==="pt"?slides[0].ptNote:slides[0].enNote}</p></div>
      <div class="deck-dots">${slides.map((s,i)=>`<button type="button" data-deck-dot="${i}" aria-label="${String(i+1).padStart(2,"0")} — ${LANG==="pt"?s.pt:s.en}" aria-current="${i===0?"true":"false"}"></button>`).join("")}</div>
    </div>
  </div>`;
}
function mountCaseDeck(){
  const deck=document.querySelector("[data-case-deck]");if(!deck)return;
  const slides=[...deck.querySelectorAll("[data-deck-slide]")];
  const dots=[...deck.querySelectorAll("[data-deck-dot]")];
  const current=deck.querySelector("[data-deck-current]");
  const title=deck.querySelector("[data-deck-title]");
  const note=deck.querySelector("[data-deck-note]");
  let index=0,startX=null;
  function show(next){
    index=(next+slides.length)%slides.length;
    slides.forEach((slide,i)=>{const active=i===index;slide.classList.toggle("active",active);slide.setAttribute("aria-hidden",String(!active))});
    dots.forEach((dot,i)=>dot.setAttribute("aria-current",String(i===index)));
    current.textContent=String(index+1).padStart(2,"0");
    title.textContent=slides[index].dataset.title;
    note.textContent=slides[index].dataset.note;
  }
  deck.querySelector("[data-deck-prev]").addEventListener("click",()=>show(index-1));
  deck.querySelector("[data-deck-next]").addEventListener("click",()=>show(index+1));
  dots.forEach(dot=>dot.addEventListener("click",()=>show(+dot.dataset.deckDot)));
  deck.addEventListener("keydown",event=>{if(event.key==="ArrowLeft"){event.preventDefault();show(index-1)}if(event.key==="ArrowRight"){event.preventDefault();show(index+1)}});
  deck.addEventListener("pointerdown",event=>{startX=event.clientX});
  deck.addEventListener("pointerup",event=>{if(startX===null)return;const delta=event.clientX-startX;startX=null;if(Math.abs(delta)>60)show(index+(delta<0?1:-1))});
}
function renderProjectDetail(id){
  const p=PROJECTS.find(x=>x.id===id);if(!p)return;
  const accent=p.accent||"blue";
  galleryData=[];
  let media="";
  if(p.slides){
    media=`<div class="fact-block"><h3>${t("pd.slides")}</h3>${renderCaseDeck(p.slides)}
      <div class="limit-note">${t("pd."+id+".limit")}</div></div>`;
  }
  if(p.video){
    media=`<div class="fact-block"><h3>${t("pd.demo")}</h3>
      <video class="video-detail" controls preload="metadata" poster="${p.image}">
        <source src="${p.video}" type="video/mp4">
      </video>
      <p class="mt-2 detail-note">${t("pd."+id+".note")}</p></div>`;
  }
  if(p.gallery){
    galleryData=p.gallery.map(g=>({img:g.img,label:LANG==="pt"?g.pt:g.en}));
    media+=`<div class="fact-block"><h3>${t("pd.gallery")}</h3>
      <div class="gallery">${p.gallery.map((g,i)=>`
        <figure><button data-lb="${i}" aria-label="${LANG==="pt"?g.pt:g.en} — ampliar">
          <img src="${g.img}" alt="Focus Cockpit — ${LANG==="pt"?g.pt:g.en}" loading="lazy"></button>
          <figcaption><span>${LANG==="pt"?g.pt:g.en}</span><span>0${i+1}</span></figcaption>
        </figure>`).join("")}</div>
      <p class="detail-note">${t("pd."+id+".note")}</p></div>`;
  }else if(!p.video&&!p.slides&&id==="maintenance"){
    media=`<div class="fact-block"><h3>${t("pd.flow")}</h3>${flowDiagram(t("pd."+id+".flow"),"violet")}
      <div class="limit-note">${t("pd."+id+".limit")}</div></div>`;
  }
  if(id==="publisher"){
    media+=`<div class="fact-block"><h3>${t("pd.publisher.audit")}</h3>
    <div class="term-block"><div class="term-bar"><span class="tdot"></span><span class="tdot"></span><span class="tdot"></span><span class="term-label">publisher audit</span></div>
      <div class="term-body">
<span class="c-dim">$</span> publisher audit ./my-project
<span class="c-ok">✓</span> README.md <span class="c-dim">present, 3 sections</span>
<span class="c-ok">✓</span> LICENSE <span class="c-dim">MIT</span>
<span class="c-ok">✓</span> .gitignore <span class="c-dim">covers .env, *.key</span>
<span class="c-ok">✓</span> secrets scan <span class="c-dim">0 potential credentials</span>
<span class="c-warn">!</span> docs/ <span class="c-dim">architecture section incomplete</span>
<span class="c-acc">→</span> readiness report written <span class="c-dim">(report.json)</span>
<span class="c-acc">→</span> <span class="text-ink">${LANG==="pt"?"revisão humana necessária antes de publicar":"human review required before publishing"}</span>
      </div></div></div>`;
  }
  document.getElementById("projectDetail").innerHTML=`
    <nav class="crumb" aria-label="Breadcrumb">
      <a href="#projects">← ${t("pd.back")}</a><span aria-hidden="true">/</span><span>${p.name}</span>
    </nav>
    <div class="detail-head">
      <div>
        <span class="kicker ${accent==="violet"?"violet":""}">${p.tags.join(" · ")}</span>
        <h1>${p.name}</h1>
        <p class="detail-summary">${t("pd."+id+".summary")}</p>
      </div>
      <a class="btn btn-ghost" href="${p.url}" target="_blank" rel="noopener"><i data-lucide="github"></i>GitHub</a>
    </div>
    ${media}
    ${p.tech?`<section class="fact-block tech-block" aria-labelledby="project-tech-title">
      <div class="tech-head"><h3 id="project-tech-title">${t("pd.tech")}</h3><p>${t("pd."+id+".techDetail")}</p></div>
      <div class="tech-stack">${p.tech.map(x=>`<span>${x}</span>`).join("")}</div>
    </section>`:""}
    <div class="detail-grid">
      <div>
        <div class="fact-block"><h3>${t("pd.problem")}</h3><p>${t("pd."+id+".problem")}</p></div>
        <div class="fact-block"><h3>${t("pd.approach")}</h3><p>${t("pd."+id+".approach")}</p></div>
        ${id!=="maintenance"&&id!=="publisher"?`<div class="fact-block"><h3>${t("pd.flow")}</h3>${flowDiagram(t("pd."+id+".flow"),accent)}</div>`:""}
      </div>
      <div>
        <div class="fact-block"><h3>${t("pd.delivery")}</h3><ul>${t("pd."+id+".delivery").map(x=>`<li>${x}</li>`).join("")}</ul></div>
        <div class="fact-block"><h3>${t("pd.arch")}</h3><ul>${t("pd."+id+".arch").map(x=>`<li>${x}</li>`).join("")}</ul></div>
        ${id!=="maintenance"?`<div class="limit-note">${t("pd."+id+".limit")}</div>`:""}
      </div>
    </div>`;
  document.querySelectorAll("[data-lb]").forEach(b=>b.addEventListener("click",()=>openLightbox(+b.dataset.lb)));
  mountCaseDeck();
  if(window.lucide)lucide.createIcons();
}

/* ================= LIGHTBOX ================= */
let lbIdx=0;
const lb=document.getElementById("lightbox");
function openLightbox(i){lbIdx=i;updateLb();lb.classList.add("open");document.getElementById("lbClose").focus()}
function updateLb(){const d=galleryData[lbIdx];document.getElementById("lightboxImg").src=d.img;
  document.getElementById("lightboxImg").alt=d.label;document.getElementById("lightboxCap").textContent=d.label+" — "+(lbIdx+1)+"/"+galleryData.length}
function closeLb(){lb.classList.remove("open")}
document.getElementById("lbClose").addEventListener("click",closeLb);
document.getElementById("lbPrev").addEventListener("click",()=>{lbIdx=(lbIdx-1+galleryData.length)%galleryData.length;updateLb()});
document.getElementById("lbNext").addEventListener("click",()=>{lbIdx=(lbIdx+1)%galleryData.length;updateLb()});
lb.addEventListener("click",e=>{if(e.target===lb)closeLb()});
document.addEventListener("keydown",e=>{
  if(!lb.classList.contains("open"))return;
  if(e.key==="Escape"){closeLb();return}
  if(e.key==="ArrowLeft")document.getElementById("lbPrev").click();
  if(e.key==="ArrowRight")document.getElementById("lbNext").click();
  if(e.key==="Tab"){
    const focusables=[...lb.querySelectorAll("button")];
    const first=focusables[0],last=focusables[focusables.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
});

/* ================= GITHUB ACTIVITY ================= */
async function loadActivity(){
  const status=document.getElementById("ghStatus"),txt=document.getElementById("ghStatusText");
  const KEY="sig-gh-activity",TTL=6*3600*1000;
  function setState(s){status.className="gh-status "+s;txt.textContent=t("gh."+s)}
  function render(data){
    const cal=document.getElementById("ghCal");cal.innerHTML="";
    const days=data.contributions||[];
    days.forEach(d=>{
      const c=document.createElement("span");c.className="gh-cell l"+(d.level||0);
      c.title=d.date+": "+d.count;cal.appendChild(c);
    });
    const total=days.reduce((a,b)=>a+(b.count||0),0);
    const totalEl=document.getElementById("ghTotal");
    totalEl.dataset.total=String(total);
    totalEl.textContent=total+" "+t("gh.total");
  }
  setState("loading");
  try{
    const cached=JSON.parse(localStorage.getItem(KEY)||"null");
    if(cached&&Date.now()-cached.ts<TTL){render(cached.data);setState("cache");return}
  }catch(e){}
  try{
    const r=await fetch("https://github-contributions-api.jogruber.de/v4/everton-soares1985?y=last");
    if(!r.ok)throw 0;
    const data=await r.json();
    localStorage.setItem(KEY,JSON.stringify({ts:Date.now(),data}));
    render(data);setState("live");
  }catch(e){
    try{
      const r2=await fetch("/github-activity.json");
      if(!r2.ok)throw 0;
      render(await r2.json());setState("snap");
    }catch(e2){
      document.getElementById("ghCal").innerHTML="";
      const totalEl=document.getElementById("ghTotal");
      delete totalEl.dataset.total;
      totalEl.textContent=t("gh.fail");
      status.className="gh-status";txt.textContent="—";
    }
  }
}

/* ================= TIMELINE ================= */
function renderTimeline(){
  const el=document.getElementById("timeline");
  el.innerHTML=[1,2,3,4].map(n=>`
    <div class="tl-item" data-tl="${n}">
      <button class="tl-toggle" aria-expanded="false">
        <span>${t("tl."+n+".t")}</span>
        <span class="tl-when">${t("tl."+n+".w")}</span>
      <i data-lucide="chevron-down" class="chev"></i>
      </button>
      <div class="tl-body"><p>${t("tl."+n+".b")}</p></div>
    </div>`).join("");
  el.querySelectorAll(".tl-toggle").forEach(btn=>btn.addEventListener("click",()=>{
    const item=btn.parentElement,open=item.classList.toggle("open");
    btn.setAttribute("aria-expanded",open);
  }));
  if(window.lucide)lucide.createIcons();
}

/* ================= EDUCATION ================= */
function renderEducation(){
  const groups=[["done","edu.done"],["doing","edu.doing"],["planned","edu.planned"]];
  document.getElementById("eduGroups").innerHTML=groups.map(([s,label])=>{
    const list=COURSES.filter(c=>c.status===s);
    return `<div class="edu-group" data-status="${s}">
      <div class="edu-group-head"><span>${t(label)}</span><span class="edu-count">${list.length}</span><span class="bar"></span></div>
      <ul class="course-list">${list.map(c=>`
        <li class="course-item">
          <details class="course-details">
            <summary>
              <span class="ci-main"><span class="ci-title">${c.title}</span><span class="ci-issuer">${c.issuer}</span></span>
              <span class="tag-row flush">${c.tags.map(x=>`<span class="tag">${x}</span>`).join("")}</span>
              <span class="course-expand"><span>${LANG==="pt"?"Ver grade":"View syllabus"}</span><i data-lucide="chevron-down"></i></span>
            </summary>
            <div class="course-panel">
              ${c.modules?.length?`<ol class="course-modules">${c.modules.map((module,index)=>`<li><span>${String(index+1).padStart(2,"0")}</span>${module}</li>`).join("")}</ol>`:`<p>${LANG==="pt"?"Curso individual — não possui grade agrupada neste portfólio.":"Individual course — no grouped syllabus is listed in this portfolio."}</p>`}
              ${c.cred?`<a class="cred-link" href="${c.cred}" target="_blank" rel="noopener"><i data-lucide="badge-check"></i>${t("edu.cred")}${c.credId?` · ${c.credId}`:""}</a>`:""}
            </div>
          </details>
        </li>`).join("")}</ul>
    </div>`}).join("");
  if(window.lucide)lucide.createIcons();
}

/* ================= LIBRARY ================= */
function renderLibrary(){
  const groups=[["reading","lib.reading"],["read","lib.read"],["planned","lib.planned"]];
  document.getElementById("libGroups").innerHTML=groups.map(([s,label])=>{
    const list=BOOKS.filter(b=>b.status===s);
    return `<div class="edu-group" data-status="${s==="read"?"done":s==="reading"?"doing":"planned"}">
      <div class="edu-group-head"><span>${t(label)}</span><span class="edu-count">${list.length}</span><span class="bar"></span><span class="carousel-controls"><button type="button" data-carousel-prev aria-label="${LANG==="pt"?"Livros anteriores":"Previous books"}"><i data-lucide="chevron-left"></i></button><button type="button" data-carousel-next aria-label="${LANG==="pt"?"Próximos livros":"Next books"}"><i data-lucide="chevron-right"></i></button></span></div>
      <div class="book-carousel" tabindex="0" role="region" aria-label="${t(label)}"><div class="book-grid">${list.map((b,index)=>`
        <div class="book" data-tone="${index%6}">
          <div class="book-cover">${b.cover?`<img src="/${b.cover}" alt="${b.title}" loading="lazy">`:`<span class="spine-title">${b.title}</span>`}</div>
          <div class="book-info">
            <div class="b-title">${b.title}${b.edition?" · "+b.edition:""}</div>
            <div class="b-author">${b.author||(LANG==="pt"?"Autor não registrado":"Author not recorded")}</div>
            ${b.ref?`<a href="${b.ref}" target="_blank" rel="noopener">↗ ${t("lib.ref")}</a>`:""}
          </div>
        </div>`).join("")}</div></div>
    </div>`}).join("");
  mountBookCarousels();
  if(window.lucide)lucide.createIcons();
}

function mountBookCarousels(){
  document.querySelectorAll(".edu-group:has(.book-carousel)").forEach(group=>{
    const viewport=group.querySelector(".book-carousel");
    const move=direction=>viewport.scrollBy({left:direction*Math.max(260,viewport.clientWidth*.78),behavior:reduced?"auto":"smooth"});
    group.querySelector("[data-carousel-prev]").addEventListener("click",()=>move(-1));
    group.querySelector("[data-carousel-next]").addEventListener("click",()=>move(1));
    viewport.addEventListener("keydown",event=>{if(event.key==="ArrowLeft"){event.preventDefault();move(-1)}if(event.key==="ArrowRight"){event.preventDefault();move(1)}});
    let dragging=false,startX=0,startScroll=0;
    viewport.addEventListener("pointerdown",event=>{dragging=true;startX=event.clientX;startScroll=viewport.scrollLeft;viewport.setPointerCapture(event.pointerId);viewport.classList.add("dragging")});
    viewport.addEventListener("pointermove",event=>{if(dragging)viewport.scrollLeft=startScroll-(event.clientX-startX)});
    const stop=()=>{dragging=false;viewport.classList.remove("dragging")};
    viewport.addEventListener("pointerup",stop);viewport.addEventListener("pointercancel",stop);
  });
}

async function loadLibrarySnapshot(){
  try{
    const response=await fetch("/library.json");
    if(!response.ok)throw new Error("library snapshot unavailable");
    const data=await response.json();
    if(!Array.isArray(data.books)||!data.books.length)throw new Error("invalid library snapshot");
    BOOKS=data.books;
  }catch(error){console.warn("Using curated library fallback.",error)}
}

/* ================= TERMINAL ================= */
(function(){
  const screen=document.getElementById("termScreen");
  const form=document.getElementById("termForm");
  const input=document.getElementById("termInput");
  const history=[];let hIdx=-1;let booted=false;
  function out(html){const d=document.createElement("div");d.className="t-out";d.innerHTML=html;screen.appendChild(d);screen.scrollTop=screen.scrollHeight}
  function cmd(c){const d=document.createElement("div");d.className="t-cmd";d.textContent=c;screen.appendChild(d)}
  const CMDS={
    help:()=>out((LANG==="pt"?"Comandos disponíveis:":"Available commands:")+"\n  projects · about · education · library · contact · home\n  whoami · ls · clear · exit"),
    whoami:()=>out("Everton Soares — "+(LANG==="pt"?"engenharia de automação com IA · São Paulo":"AI automation engineering · São Paulo")),
    ls:()=>out("radar/  focus/  maintenance/  publisher/  hermes/  resume-pt.pdf  resume-en.pdf"),
    projects:()=>{out(LANG==="pt"?"abrindo projetos…":"opening projects…");location.hash="#projects"},
    about:()=>{location.hash="#about"},education:()=>{location.hash="#education"},
    library:()=>{location.hash="#library"},contact:()=>{location.hash="#contact"},home:()=>{location.hash="#home"},
    clear:()=>{screen.innerHTML=""},
    exit:()=>{location.hash="#home"}
  };
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const raw=input.value.trim();if(!raw)return;
    cmd(raw);history.unshift(raw);hIdx=-1;input.value="";
    const c=raw.toLowerCase();
    if(CMDS[c])CMDS[c]();
    else out((LANG==="pt"?"comando desconhecido: ":"unknown command: ")+c+" — "+(LANG==="pt"?"digite":"type")+" help");
  });
  input.addEventListener("keydown",e=>{
    if(e.key==="ArrowUp"){e.preventDefault();if(hIdx<history.length-1){hIdx++;input.value=history[hIdx]}}
    if(e.key==="ArrowDown"){e.preventDefault();if(hIdx>0){hIdx--;input.value=history[hIdx]}else{hIdx=-1;input.value=""}}
  });
  window.__termBoot=()=>{if(booted)return;booted=true;
    out("SIGNAL/BUILD terminal v1.0 — readonly, deterministic.\n"+(LANG==="pt"?"Digite":"Type")+" help.\n")};
})();

/* ================= BOOT ================= */
await loadLibrarySnapshot();
applyLang();
route();
loadActivity();
const _route=route;
window.addEventListener("hashchange",()=>{if((location.hash||"").includes("terminal"))window.__termBoot()});
if((location.hash||"").includes("terminal"))window.__termBoot();
