FROM node:18-alpine as builder
WORKDIR /src/app
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /src/app
COPY --from=builder /src/app/.next ./.next
COPY --from=builder /src/app/public ./public
COPY --from=builder /src/app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]