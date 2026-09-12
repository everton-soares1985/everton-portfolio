# CONFIGURACOES: isolated API, no dependencies or credentials baked into image.
FROM node:22-alpine
WORKDIR /app
COPY --chown=node:node server ./server
COPY --chown=node:node public ./public
USER node
ENV HOST=127.0.0.1 PORT=4317
HEALTHCHECK --interval=30s --timeout=5s CMD node -e "fetch('http://127.0.0.1:4317/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "server/http.mjs"]
