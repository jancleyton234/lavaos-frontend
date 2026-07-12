# Otimização do Next.js via Standalone Mode
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Gera a build estática/server otimizada
RUN npm run build

# -------------------------
# Imagem de Produção
# -------------------------
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copia os arquivos gerados no modo "standalone" para reduzir em 80% o tamanho da imagem
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

# Executa o server customizado do Next.js
CMD ["node", "server.js"]
