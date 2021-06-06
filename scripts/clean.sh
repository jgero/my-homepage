#!/usr/bin/env bash

# try to stop running dev pod
RUNNING_DEV_POD_COUNT=$(podman pod ls | grep " my-webpage-dev " | wc -l)

if [ "$RUNNING_DEV_POD_COUNT" -gt 0 ]; then
	echo "==> stopping and removing dev pod"
	podman pod stop my-webpage-dev && podman pod rm my-webpage-dev
	echo "==> [DONE]"
fi

# delete webpage dev images
WEBPAGE_DEV_IMAGE_COUNT=$(podman image ls | grep "my-webpage.*dev" | wc -l)

if [ "$WEBPAGE_DEV_IMAGE_COUNT" -gt 0 ]; then
	echo "==> deleting dev images"
	podman image ls \
		| grep "my-webpage.*dev" \
		| tr -s ' ' \
		| cut -d ' ' -f 3 \
		| xargs -I [] podman image rm []
	echo "==> [DONE]"
fi

exit 0

