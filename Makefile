fmt_check:
	podman build \
		-f "build/ci/actions/format-check/Dockerfile" \
		-t "my-webpage-format-check:dev" \
		build/ci/actions/format-check
	podman run \
		--rm \
		--workdir /app \
		-v "$(PWD):/app:z" \
		my-webpage-format-check:dev

build:
	bash scripts/build_prod.sh

start: build
	podman play kube build/package/my-webpage-prod.yml

build_dev:
	bash scripts/build_dev.sh

dev: build_dev
	bash scripts/start_dev.sh

stop:
	bash scripts/stop.sh

clean:
	bash scripts/clean.sh

.PHONY: fmt_check build start build_dev dev stop clean

