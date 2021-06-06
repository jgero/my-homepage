#!/usr/bin/env bash

COMMIT_HASH="$(git rev-parse --short HEAD)"

podman build \
	-t "my-webpage:${COMMIT_HASH}" \
	-t my-webpage:latest \
	-f build/package/prod.Containerfile \
	--ignorefile .containerignore \
	.

