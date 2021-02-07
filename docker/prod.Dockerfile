# using global argument to specify target
# has to be redeclared in the stages
ARG TARGET=main

# This stage builds the sapper application.
FROM docker.io/node:10 AS app-builder
ARG TARGET
WORKDIR /app
COPY $TARGET .
RUN npm install --no-audit --unsafe-perm
RUN npm run build

# This stage installs the runtime dependencies.
FROM docker.io/node:10 AS runtime-builder
ARG TARGET
WORKDIR /app
COPY $TARGET/package.json $TARGET/package-lock.json ./
RUN npm ci --production --unsafe-perm

# This stage only needs the compiled sapper application and the runtime dependencies.
FROM docker.io/node:10-alpine
ARG TARGET
COPY --from=app-builder /app/__sapper__ ./__sapper__
COPY --from=app-builder /app/static ./static
COPY --from=runtime-builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "__sapper__/build"]
