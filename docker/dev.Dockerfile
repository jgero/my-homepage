# use complete node 10 image
FROM node:10
WORKDIR /app

# only copy these 2 files before installing the node_modules so it will only
# repeat that step if the package files change
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN ["npm", "install"]

# run in dev mode when starting the container
CMD ["npm", "run", "dev"]