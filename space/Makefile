.PHONY: dev build_dev run_dev prod build_prod run_prod

dev: build_dev run_dev
prod: build_prod run_prod

build_dev:
	docker build \
		-t my-webpage/space:dev \
		-f ./container/dev.Dockerfile \
		.

run_dev:
	docker run \
		--rm \
		--tty \
		-v $(PWD)/src/:/app/src/ \
		-v $(PWD)/static/:/app/static/ \
		-v $(PWD)/rollup.config.js:/app/rollup.config.js \
		-p 3000:3000 \
		-p 10000:10000 \
		my-webpage/space:dev

build_prod:
	docker build \
		-t my-webpage/space:latest \
		-f ./container/prod.Dockerfile \
		.

run_prod:
	docker run \
		--rm \
		--tty \
		-p 3000:3000 \
		my-webpage/space:latest
