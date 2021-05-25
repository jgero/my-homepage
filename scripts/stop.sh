#!/usr/bin/env bash

# try to stop running dev pod
RUNNING_DEV_POD_COUNT=$(podman pod ls | grep " my-webpage-dev " | wc -l)

if [ "$RUNNING_DEV_POD_COUNT" -gt 0 ]; then
	echo "==> stopping and dev pod"
	podman pod stop my-webpage-dev
	echo "==> [DONE]"
fi

exit 0

