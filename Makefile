fmt_check:
	bash scripts/fmt_check.sh

build:
	bash scripts/build_prod.sh

start: build
	podman play kube build/package/my-webpage-prod.yml

build_dev:
	bash scripts/build_dev.sh

dev: build_dev
	podman play kube build/package/my-webpage-dev.yml

stop:
	bash scripts/stop.sh

clean:
	bash scripts/clean.sh

.PHONY: fmt_check build start build_dev dev stop clean

