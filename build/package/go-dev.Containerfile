# use go image
FROM docker.io/golang:1.16.4

WORKDIR /app

COPY go.mod go.mod
COPY cmd cmd

# build the server
RUN go build -o /out/webserver cmd/webserver/webserver.go

# run the server on start
CMD ["/out/webserver"]

