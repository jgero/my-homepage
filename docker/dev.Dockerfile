# use complete node 10 image
FROM node:10

# using local argument to specify target
ARG TARGET=main

# first copy the component lib so the build does not fail
WORKDIR /app/component-lib
COPY component-lib/package.json package.json

# only copy these 2 files before installing the node_modules so it will only
# repeat that step if the package files change
WORKDIR /app/$TARGET
COPY $TARGET/package.json package.json
COPY $TARGET/package-lock.json package-lock.json
RUN ["npm", "install"]

# run in dev mode when starting the container
CMD ["npm", "run", "dev"]
