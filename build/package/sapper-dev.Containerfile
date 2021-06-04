# use complete node 14 image
FROM docker.io/node:14

# only copy these 2 files before installing the node_modules so it will only
# repeat that step if the package files change
WORKDIR /app
COPY package.json package.json
COPY .prettierrc.yaml .prettierrc.yaml
COPY package-lock.json package-lock.json
RUN ["npm", "install"]

# run in dev mode when starting the container
CMD ["npm", "run", "dev"]
