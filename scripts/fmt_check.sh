#!/usr/bin/env bash

EXIT_CODE=0

which gofmt >/dev/null
if [ $? -ne 0 ]; then
    echo "gofmt not found."
    echo "Install 'gofmt' and ensure it is available in your PATH."
    echo
    EXIT_CODE=1
fi

# check go formatting
echo "==> gofmt..."
GOFMT_FILES=$(gofmt -l `find . -name '*.go' | grep -v vendor`)
if [[ -n ${GOFMT_FILES} ]]; then
    echo "==> following files need fixing:"
    echo "${GOFMT_FILES}"
    echo "==> [ERROR]"
    echo
    EXIT_CODE=1
else
    echo "==> [DONE]"
fi

# check webapp formatting
echo "==> prettier..."
PRETTIER_FILES=$(podman run \
	--rm \
	-v ${PWD}/web/src/:/app/src/:z \
	-v ${PWD}/web/static/:/app/static/:z \
	-v ${PWD}/web/rollup.config.js:/app/rollup.config.js:z \
	my-webpage/sapper:dev \
	node node_modules/prettier/bin-prettier.js --list-different './!(__sapper__)/**/*.{js,svelte,html,css}')
if [[ -n ${PRETTIER_FILES} ]]; then
    echo "==> following files need fixing:"
    echo "${PRETTIER_FILES}"
    echo "==> [ERROR]"
    echo
    EXIT_CODE=1
else
    echo "==> [DONE]"
fi

exit $EXIT_CODE

