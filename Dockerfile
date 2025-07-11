FROM node:18-alpine AS builder
# Устанавливаем рабочую директорию
WORKDIR /passgen

# 1. Копируем только файлы зависимостей
COPY package.json package-lock.json* ./

# 2. Устанавливаем зависимости (с заморозкой lock-файла)
RUN npm ci --include=dev

# 3. Копируем ВЕСЬ проект (включая /src/app)
COPY . .

# 4. Собираем проект
RUN npm run build

# Финальный образ
FROM node:18-alpine AS runner
WORKDIR /passgen

ENV NODE_ENV production
ENV PORT 3000

# Копируем только необходимое из builder-стадии
COPY --from=builder /passgen/package.json .
COPY --from=builder /passgen/package-lock.json .
COPY --from=builder /passgen/node_modules ./node_modules
COPY --from=builder /passgen/.next ./.next
COPY --from=builder /passgen/public ./public

EXPOSE 3000
CMD ["npm", "start"]
