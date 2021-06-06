#!/usr/bin/env bash

# try to stop running pod
RUNNING_POD_COUNT=$(podman pod ls | grep " my-webpage-dev " | wc -l)

if [ "$RUNNING_POD_COUNT" -gt 0 ]; then
	echo "==> stopping pod"
	podman pod stop my-webpage-dev
	echo "==> [DONE]"
fi

exit 0

