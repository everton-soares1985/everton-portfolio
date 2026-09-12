# HostGator + Oracle

## 1. Site estatico

No painel HostGator, confirme que o dominio registrado e `growthtech.solutions` e crie `everton.growthtech.solutions` com diretorio proprio e SSL. Envie **somente o conteudo de `public/`** para esse diretorio. Nunca envie a raiz do projeto ou `.env`. A navegacao usa hashes, sem regras de rewrite.

Sem API, o portfolio e a consulta local funcionam. Teste ambos os idiomas, temas e links. Certificado, DNS e acesso ao painel ainda precisam ser confirmados; nao foram alterados nesta entrega.

## 2. API opcional na Oracle

Use diretorio exclusivo, por exemplo `/opt/everton-portfolio`, sem alterar o container OmniRoute. Envie Dockerfile, compose.yaml, server/ e public/. Crie `.env` privado no servidor com:

```dotenv
PUBLIC_ORIGIN=https://everton.growthtech.solutions
OMNIROUTE_BASE_URL=http://127.0.0.1:20128/v1
OMNIROUTE_MODEL=Site/Portfolio
OMNIROUTE_API_KEY=CHAVE_SOMENTE_NO_SERVIDOR
AI_TIMEOUT_MS=20000
MAX_CONCURRENT_RUNS=2
RUNS_PER_HOUR=6
GLOBAL_RUNS_PER_HOUR=30
TRUST_PROXY=true
```

Substitua os placeholders antes de iniciar. Se o OmniRoute nao exigir autenticacao local, deixe a chave vazia. O usuario selecionou o combo `Site/Portfolio`; confirme disponibilidade, custos e rotas internas antes da exposicao publica. `network_mode: host` permite acessar o OmniRoute que esta vinculado ao loopback. A API tambem fica em loopback; nao abra as portas 4317 ou 20128 para a internet.

Execute `docker compose up -d --build`. Confira `curl http://127.0.0.1:4317/api/health` e logs. `aiConfigured` so confirma configuracao, nao conectividade nem custo do provedor.

## 3. HTTPS da API

Sugestao de hostname: `api.everton.growthtech.solutions`, pendente de criacao. Aponte para a VPS, configure SSL e use o proxy abaixo **dentro de um servidor HTTPS ja configurado**. Nao substitua configuracoes existentes. Exponha apenas HTTPS e acesso administrativo necessario; restrinja o proxy a API.

```nginx
location /api/ {
    client_max_body_size 1k;
    proxy_pass http://127.0.0.1:4317;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_read_timeout 45s;
}
location / { return 404; }
```

`TRUST_PROXY=true` pressupoe que apenas um proxy confiavel acessa a API e sobrescreve X-Real-IP. Se houver CDN, configure os IPs confiaveis no proxy; nao confie cegamente em cabecalhos do visitante. Adicione protecao de taxa no proxy/CDN antes de divulgar amplamente.

Finalmente, ajuste `public/config.js` para exportar `API_ORIGIN = 'https://api.everton.growthtech.solutions'` e envie o arquivo atualizado ao HostGator. Verifique uma execucao real, cancelamento e fallback com provedor desligado.

## Rollback

Para pausar somente esta API: `docker compose stop portfolio-api` no diretorio exclusivo. Volte `API_ORIGIN` a string vazia para consulta local. Preserve arquivos e `.env`; nao remova volumes, containers ou configuracoes dos outros projetos.
