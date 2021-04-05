# use complete node 10 image
FROM docker.io/node:10

# using local argument to specify target
ARG TARGET=main

# only copy these 2 files before installing the node_modules so it will only
# repeat that step if the package files change
WORKDIR /app/$TARGET
COPY $TARGET/package.json package.json
COPY $TARGET/package-lock.json package-lock.json
RUN ["npm", "install"]

# run in dev mode when starting the container
CMD ["npm", "run", "dev"]
