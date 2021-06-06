#!/usr/bin/env bash

podman build \
	-t my-webpage/sapper:dev \
	-f ${PWD}/build/package/sapper-dev.Containerfile \
	${PWD}/web

podman build \
	-t my-webpage/go:dev \
	-f ${PWD}/build/package/go-dev.Containerfile \
	--ignorefile .containerignore \
	.

