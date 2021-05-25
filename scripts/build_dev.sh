#!/usr/bin/env bash

podman build \
	-t my-webpage/sapper:dev \
	-f ${PWD}/build/package/dev.Containerfile \
	${PWD}/web

