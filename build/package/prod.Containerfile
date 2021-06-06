# build the go server
FROM docker.io/golang:1.16.4 AS go-builder
WORKDIR /app
COPY go.mod go.mod
COPY cmd cmd
RUN CGO_ENABLED=0  GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /out/webserver cmd/webserver/webserver.go

# build and export the sapper app
FROM docker.io/node:14 AS sapper-builder
WORKDIR /app
COPY web .
RUN npm ci
RUN npm run export

# use minimal image as final stage
FROM scratch
# FROM docker.io/golang:1.16.4
COPY --from=go-builder /out/webserver /app/webserver
COPY --from=sapper-builder /app/__sapper__/export /app/web/__sapper__/export
ENTRYPOINT ["/app/webserver"]
