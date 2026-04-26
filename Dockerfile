FROM node:22-slim

# Встановлюємо pnpm та системні залежності
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Копіюємо конфіги
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/

# Встановлюємо залежності з ігноруванням скриптів для швидкості
RUN pnpm install --frozen-lockfile

# Копіюємо весь код
COPY . .

# ВАЖЛИВО: Даємо права на виконання бінарникам
RUN chmod -R +x /app/node_modules/.bin

EXPOSE 5173 3000

CMD ["pnpm", "dev"]