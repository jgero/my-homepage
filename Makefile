fmt_check:
	bash scripts/fmt_check.sh

build_container:
	bash scripts/build_prod.sh

.PHONY: fmt_check build_container

