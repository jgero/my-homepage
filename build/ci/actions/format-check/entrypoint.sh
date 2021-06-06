#!/usr/bin/env bash

EXIT_CODE=0
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

return EXIT_CODE

