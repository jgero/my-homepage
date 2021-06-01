#!/usr/bin/env bash

podman run \
	--rm \
	--tty \
	--name my-webpage-dev-sapper \
	-v ${PWD}/web/src/:/app/src/:z \
	-v ${PWD}/web/static/:/app/static/:z \
	-v ${PWD}/web/rollup.config.js:/app/rollup.config.js:z \
	-p 3000:3000 \
	-p 10000:10000 \
	my-webpage/sapper:dev

