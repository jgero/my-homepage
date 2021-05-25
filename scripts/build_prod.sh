#!/usr/bin/env bash

COMMIT_HASH="$(git rev-parse --short HEAD)"

podman build \
	-t "my-webpage:${COMMIT_HASH}"
	-f ../build/package/prod.Containerfile
	--ignorefile ../.containerignore
	../

