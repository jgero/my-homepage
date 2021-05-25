#!/usr/bin/env bash

EXIT_CODE=0

which gofmt >/dev/null
if [ $? -ne 0 ]; then
    echo "gofmt not found."
    echo "Install 'gofmt' and ensure it is available in your PATH."
    echo
    EXIT_CODE=1
fi

# Check gofmt
echo "==> Checking that code complies with gofmt requirements..."
gofmt_files=$(gofmt -l `find . -name '*.go' | grep -v vendor`)
if [[ -n ${gofmt_files} ]]; then
    echo "    gofmt needs running on the following files:"
    echo "    ${gofmt_files}"
    echo
    EXIT_CODE=1
else
    echo "==> [DONE]"
fi

exit $EXIT_CODE
