FROM node:26-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server/src/ ./server/src/
COPY shared/ ./shared/

USER node
CMD ["node", "server/src/index.ts"]